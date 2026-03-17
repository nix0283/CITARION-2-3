/**
 * Advanced Risk Management Service
 * Cornix-compatible implementation of 7 additional features
 * 
 * 1. Stop Loss Leverage Adjustment - Reduce leverage when SL is hit
 * 2. Simultaneous Trades Per Symbol - Limit concurrent trades per pair
 * 3. Min Symbol Price Filter - Filter low-priced assets
 * 4. Min Symbol 24H Volume Filter - Filter low-volume assets
 * 5. Max Concurrent Amount - Total exposure limit
 * 6. Auto-Cancel Trade Timeout - Cancel unfilled orders
 * 7. Alternative USD Pairs - Fallback stablecoin pair matching
 */

import type { Signal } from "@prisma/client";
import { db } from "@/lib/db";

// ==================== TYPES ====================

export interface AdvancedRiskConfig {
  // Stop Loss Leverage Adjustment
  slLeverageAdjustEnabled: boolean;
  slLeverageAdjustPercent: number;
  slLeverageAdjustMin: number;
  
  // Simultaneous Trades Per Symbol
  maxTradesPerSymbol: number;
  
  // Symbol Price/Volume Filters
  minSymbolPrice?: number;
  minSymbolVolume?: number;
  
  // Max Concurrent Amount
  maxConcurrentAmount?: number;
  
  // Auto-Cancel Timeout
  autoCancelTimeout: number;
  autoCancelTimeoutUnit: "SECONDS" | "MINUTES" | "HOURS";
  
  // Alternative USD Pairs
  alternativeUsdPairs: string[];
  useAlternativePairs: boolean;
}

export interface RiskCheckResult {
  passed: boolean;
  reason?: string;
  filterName: string;
  metadata?: Record<string, unknown>;
}

export interface LeverageAdjustResult {
  originalLeverage: number;
  newLeverage: number;
  adjusted: boolean;
  reason: string;
}

export interface SymbolPairAlternative {
  originalSymbol: string;
  alternativeSymbol: string;
  found: boolean;
}

// ==================== CONSTANTS ====================

export const USD_STABLECOINS = ["USDT", "USDC", "BUSD", "USD", "DAI", "TUSD"];

// ==================== CORE FUNCTIONS ====================

/**
 * 1. Stop Loss Leverage Adjustment
 * Reduces leverage when stop loss is hit to protect remaining capital
 * 
 * Cornix logic:
 * - When SL triggers, check if leverage reduction is enabled
 * - Calculate new leverage based on adjustment percentage
 * - Ensure minimum leverage is respected
 */
export function calculateLeverageAdjustment(
  currentLeverage: number,
  config: {
    slLeverageAdjustEnabled: boolean;
    slLeverageAdjustPercent: number;
    slLeverageAdjustMin: number;
  }
): LeverageAdjustResult {
  if (!config.slLeverageAdjustEnabled) {
    return {
      originalLeverage: currentLeverage,
      newLeverage: currentLeverage,
      adjusted: false,
      reason: "Leverage adjustment not enabled"
    };
  }

  const adjustmentFactor = config.slLeverageAdjustPercent / 100;
  const newLeverage = Math.max(
    Math.floor(currentLeverage * (1 - adjustmentFactor)),
    config.slLeverageAdjustMin
  );

  return {
    originalLeverage: currentLeverage,
    newLeverage,
    adjusted: newLeverage !== currentLeverage,
    reason: newLeverage !== currentLeverage 
      ? `Leverage reduced from ${currentLeverage}x to ${newLeverage}x (${config.slLeverageAdjustPercent}% reduction)`
      : "No adjustment needed"
  };
}

/**
 * 2. Check Simultaneous Trades Per Symbol
 * Validates that opening a new position won't exceed the per-symbol limit
 */
export async function checkSimultaneousTradesPerSymbol(
  symbol: string,
  userId: string,
  maxTradesPerSymbol: number
): Promise<RiskCheckResult> {
  if (maxTradesPerSymbol <= 0) {
    return {
      passed: true,
      reason: "No limit configured",
      filterName: "simultaneousTradesPerSymbol"
    };
  }

  // Count open positions for this symbol across all user's accounts
  const openPositions = await db.position.count({
    where: {
      symbol,
      status: "OPEN",
      account: {
        userId
      }
    }
  });

  if (openPositions >= maxTradesPerSymbol) {
    return {
      passed: false,
      reason: `Already ${openPositions} open positions for ${symbol} (max: ${maxTradesPerSymbol})`,
      filterName: "simultaneousTradesPerSymbol",
      metadata: { openPositions, maxAllowed: maxTradesPerSymbol }
    };
  }

  return {
    passed: true,
    reason: `OK: ${openPositions}/${maxTradesPerSymbol} positions for ${symbol}`,
    filterName: "simultaneousTradesPerSymbol",
    metadata: { openPositions, maxAllowed: maxTradesPerSymbol }
  };
}

/**
 * 3. Check Min Symbol Price
 * Filters out low-priced assets to avoid liquidity issues
 */
export async function checkMinSymbolPrice(
  symbol: string,
  minPrice: number
): Promise<RiskCheckResult> {
  // Get current price from cache
  const marketPrice = await db.marketPrice.findUnique({
    where: { symbol }
  });

  if (!marketPrice?.price) {
    // Cannot determine price, allow trade (fail-open)
    return {
      passed: true,
      reason: "Price data unavailable, allowing trade",
      filterName: "minSymbolPrice"
    };
  }

  const price = marketPrice.price;

  if (price < minPrice) {
    return {
      passed: false,
      reason: `Symbol price $${price.toFixed(4)} below minimum $${minPrice}`,
      filterName: "minSymbolPrice",
      metadata: { price, minPrice }
    };
  }

  return {
    passed: true,
    reason: `Price $${price.toFixed(4)} meets minimum $${minPrice}`,
    filterName: "minSymbolPrice",
    metadata: { price, minPrice }
  };
}

/**
 * 4. Check Min Symbol 24H Volume
 * Filters out low-volume assets to avoid slippage
 */
export async function checkMinSymbolVolume(
  symbol: string,
  minVolume: number
): Promise<RiskCheckResult> {
  // Get 24h volume from cache
  const marketPrice = await db.marketPrice.findUnique({
    where: { symbol }
  });

  if (!marketPrice?.volume24h) {
    // Cannot determine volume, allow trade (fail-open)
    return {
      passed: true,
      reason: "Volume data unavailable, allowing trade",
      filterName: "minSymbolVolume"
    };
  }

  const volume = marketPrice.volume24h;

  if (volume < minVolume) {
    return {
      passed: false,
      reason: `24h volume $${(volume / 1e6).toFixed(2)}M below minimum $${(minVolume / 1e6).toFixed(2)}M`,
      filterName: "minSymbolVolume",
      metadata: { volume, minVolume }
    };
  }

  return {
    passed: true,
    reason: `Volume $${(volume / 1e6).toFixed(2)}M meets minimum $${(minVolume / 1e6).toFixed(2)}M`,
    filterName: "minSymbolVolume",
    metadata: { volume, minVolume }
  };
}

/**
 * 5. Check Max Concurrent Amount
 * Validates total exposure doesn't exceed configured limit
 */
export async function checkMaxConcurrentAmount(
  userId: string,
  tradeAmount: number,
  maxAmount: number
): Promise<RiskCheckResult> {
  // Calculate current total exposure across all positions
  const openPositions = await db.position.findMany({
    where: {
      status: "OPEN",
      account: {
        userId
      }
    },
    select: {
      totalAmount: true,
      avgEntryPrice: true,
      leverage: true
    }
  });

  let currentExposure = 0;
  for (const pos of openPositions) {
    // Position value = amount * price (notional value)
    currentExposure += pos.totalAmount * pos.avgEntryPrice;
  }

  const newTotalExposure = currentExposure + tradeAmount;

  if (newTotalExposure > maxAmount) {
    return {
      passed: false,
      reason: `Total exposure $${newTotalExposure.toFixed(2)} USDT would exceed limit $${maxAmount} USDT`,
      filterName: "maxConcurrentAmount",
      metadata: { 
        currentExposure: currentExposure.toFixed(2),
        tradeAmount: tradeAmount.toFixed(2),
        maxAmount: maxAmount.toFixed(2)
      }
    };
  }

  return {
    passed: true,
    reason: `Total exposure $${newTotalExposure.toFixed(2)} USDT within limit $${maxAmount} USDT`,
    filterName: "maxConcurrentAmount",
    metadata: { 
      currentExposure: currentExposure.toFixed(2),
      newExposure: newTotalExposure.toFixed(2),
      maxAmount: maxAmount.toFixed(2)
    }
  };
}

/**
 * 6. Calculate Auto-Cancel Timeout
 * Returns the timestamp when an order should be cancelled if not filled
 * 
 * @param createdAt - When the order was created
 * @param timeout - Timeout value
 * @param unit - Timeout unit (SECONDS, MINUTES, HOURS)
 * @returns Date when order should be cancelled, or null if disabled
 */
export function calculateAutoCancelTime(
  createdAt: Date,
  timeout: number,
  unit: "SECONDS" | "MINUTES" | "HOURS"
): Date | null {
  if (timeout <= 0) {
    return null;
  }

  const multipliers: Record<string, number> = {
    SECONDS: 1,
    MINUTES: 60,
    HOURS: 3600
  };

  const timeoutMs = timeout * multipliers[unit] * 1000;
  return new Date(createdAt.getTime() + timeoutMs);
}

/**
 * 7. Find Alternative USD Pair
 * Tries to find an alternative stablecoin pair if primary not available
 * 
 * @param baseAsset - Base asset (e.g., "BTC")
 * @param availablePairs - List of available trading pairs on exchange
 * @param alternativeQuoteAssets - Preferred alternative stablecoins in order
 */
export function findAlternativeUsdPair(
  baseAsset: string,
  availablePairs: string[],
  alternativeQuoteAssets: string[]
): SymbolPairAlternative {
  // Build the original symbol (USDT is primary)
  const originalSymbol = `${baseAsset}USDT`;
  
  // Check if original is available
  if (availablePairs.includes(originalSymbol)) {
    return {
      originalSymbol,
      alternativeSymbol: originalSymbol,
      found: true
    };
  }

  // Try alternative stablecoins in order of preference
  for (const quoteAsset of alternativeQuoteAssets) {
    const altSymbol = `${baseAsset}${quoteAsset}`;
    if (availablePairs.includes(altSymbol)) {
      return {
        originalSymbol,
        alternativeSymbol: altSymbol,
        found: true
      };
    }
  }

  // No alternative found
  return {
    originalSymbol,
    alternativeSymbol: originalSymbol,
    found: false
  };
}

/**
 * Comprehensive Risk Check - Runs all applicable checks
 */
export async function performComprehensiveRiskCheck(
  signal: Signal,
  userId: string,
  config: AdvancedRiskConfig,
  availablePairs?: string[]
): Promise<{
  passed: boolean;
  checks: RiskCheckResult[];
  leverageAdjustment?: LeverageAdjustResult;
  alternativePair?: SymbolPairAlternative;
}> {
  const checks: RiskCheckResult[] = [];
  let passed = true;
  let leverageAdjustment: LeverageAdjustResult | undefined;
  let alternativePair: SymbolPairAlternative | undefined;

  // Parse symbol to get base asset (remove quote asset suffix)
  const baseAsset = signal.symbol.replace(/USDT|USDC|BUSD|USD|DAI|TUSD$/i, "");

  // 1. Check Simultaneous Trades Per Symbol
  const tradesCheck = await checkSimultaneousTradesPerSymbol(
    signal.symbol,
    userId,
    config.maxTradesPerSymbol
  );
  checks.push(tradesCheck);
  if (!tradesCheck.passed) passed = false;

  // 2. Check Min Symbol Price
  if (config.minSymbolPrice) {
    const priceCheck = await checkMinSymbolPrice(
      signal.symbol,
      config.minSymbolPrice
    );
    checks.push(priceCheck);
    if (!priceCheck.passed) passed = false;
  }

  // 3. Check Min Symbol Volume
  if (config.minSymbolVolume) {
    const volumeCheck = await checkMinSymbolVolume(
      signal.symbol,
      config.minSymbolVolume
    );
    checks.push(volumeCheck);
    if (!volumeCheck.passed) passed = false;
  }

  // 4. Check Max Concurrent Amount (if we have trade amount from signal)
  const parsedEntries = signal.entryPrices ? JSON.parse(signal.entryPrices) : [];
  const entryPrice = parsedEntries.length > 0 ? parsedEntries[0] : 0;
  const tradeAmount = signal.amountPerTrade || 0;
  
  if (config.maxConcurrentAmount && tradeAmount > 0 && entryPrice > 0) {
    const notionalValue = tradeAmount * entryPrice;
    const amountCheck = await checkMaxConcurrentAmount(
      userId,
      notionalValue,
      config.maxConcurrentAmount
    );
    checks.push(amountCheck);
    if (!amountCheck.passed) passed = false;
  }

  // 5. Find Alternative USD Pair if enabled
  if (config.useAlternativePairs && availablePairs && availablePairs.length > 0) {
    alternativePair = findAlternativeUsdPair(
      baseAsset,
      availablePairs,
      config.alternativeUsdPairs
    );
    if (!alternativePair.found) {
      checks.push({
        passed: false,
        reason: "No alternative USD pair available",
        filterName: "alternativeUsdPair"
      });
      passed = false;
    }
  }

  // 6. Calculate leverage adjustment if SL exists (pre-calculate for later use)
  if (config.slLeverageAdjustEnabled && signal.leverage > 1) {
    leverageAdjustment = calculateLeverageAdjustment(signal.leverage, config);
  }

  return {
    passed,
    checks,
    leverageAdjustment,
    alternativePair
  };
}

/**
 * Get Advanced Risk Config from BotConfig
 * Extracts and parses all advanced risk management settings
 */
export function getAdvancedRiskConfig(botConfig: {
  slLeverageAdjustEnabled: boolean;
  slLeverageAdjustPercent: number;
  slLeverageAdjustMin: number;
  maxTradesPerSymbol: number;
  minSymbolPrice: number | null;
  minSymbolVolume: number | null;
  maxConcurrentAmount: number | null;
  autoCancelTimeout: number;
  autoCancelTimeoutUnit: string;
  alternativeUsdPairs: string;
  useAlternativePairs: boolean;
}): AdvancedRiskConfig {
  return {
    slLeverageAdjustEnabled: botConfig.slLeverageAdjustEnabled,
    slLeverageAdjustPercent: botConfig.slLeverageAdjustPercent,
    slLeverageAdjustMin: botConfig.slLeverageAdjustMin,
    maxTradesPerSymbol: botConfig.maxTradesPerSymbol,
    minSymbolPrice: botConfig.minSymbolPrice ?? undefined,
    minSymbolVolume: botConfig.minSymbolVolume ?? undefined,
    maxConcurrentAmount: botConfig.maxConcurrentAmount ?? undefined,
    autoCancelTimeout: botConfig.autoCancelTimeout,
    autoCancelTimeoutUnit: botConfig.autoCancelTimeoutUnit as "SECONDS" | "MINUTES" | "HOURS",
    alternativeUsdPairs: JSON.parse(botConfig.alternativeUsdPairs || "[]"),
    useAlternativePairs: botConfig.useAlternativePairs
  };
}

// Named exports for better tree-shaking
const advancedRiskManagement = {
  calculateLeverageAdjustment,
  checkSimultaneousTradesPerSymbol,
  checkMinSymbolPrice,
  checkMinSymbolVolume,
  checkMaxConcurrentAmount,
  calculateAutoCancelTime,
  findAlternativeUsdPair,
  performComprehensiveRiskCheck,
  getAdvancedRiskConfig,
  USD_STABLECOINS
};

export default advancedRiskManagement;
