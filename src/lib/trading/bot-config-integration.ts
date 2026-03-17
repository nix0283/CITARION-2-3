/**
 * Bot Config Integration Service
 * 
 * Интегрирует настройки BotConfig с Unified Trading Engine.
 * Обеспечивает Cornix-совместимую обработку сигналов.
 * 
 * Features:
 * - Trailing Stop (5 types)
 * - Take Profit Grace
 * - First Entry as Market
 * - Entry Strategies (DCA, Weighted, etc.)
 * - TP Strategies (9 types)
 * - Signal Filtering
 */

import { db } from "@/lib/db";
import { 
  TrailingStopConfig,
  TrailingState,
  processTrailingStop,
  createDefaultTrailingConfig,
  createDefaultTrailingState,
} from "./trailing-stop";
import {
  TakeProfitGraceConfig,
  TPOrder,
  createTPOrder,
  executeTPGraceRetry,
} from "./take-profit-grace";
import {
  FirstEntryAsMarketConfig,
  FirstEntryOrder,
  createFirstEntryOrder,
  calculateEffectiveEntryPrice,
  shouldActivateFirstEntry,
} from "./first-entry-as-market";

// ==================== TYPES ====================

export interface BotConfigSettings {
  id: string;
  name: string;
  isActive: boolean;
  
  // Trade Amount
  tradeAmount: number;
  amountType: "FIXED" | "PERCENTAGE";
  amountOverride: boolean;
  
  // First Entry as Market
  firstEntryAsMarketEnabled: boolean;
  firstEntryAsMarketCap: number;
  firstEntryAsMarketActivate: "ENTRY_PRICE_REACHED" | "IMMEDIATELY";
  
  // Trailing
  trailingEnabled: boolean;
  trailingType: string;
  trailingTriggerType: string;
  trailingTriggerValue: number | null;
  trailingPercent: number | null;
  
  // Entry Strategy
  entryStrategy: string;
  entryWeights: number[] | null;
  entryZoneTargets: number;
  
  // DCA
  dcaFirstEntryPercent: number | null;
  dcaAmountScale: number;
  dcaPriceDiff: number;
  dcaPriceScale: number;
  dcaMaxPriceDiff: number;
  
  // TP Strategy
  tpStrategy: string;
  tpTargetCount: number;
  tpCustomRatios: number[] | null;
  
  // TP Grace
  tpGraceEnabled: boolean;
  tpGraceMaxCap: number;
  
  // Stop Loss
  defaultStopLoss: number | null;
  slTimeout: number;
  slTimeoutUnit: string;
  slOrderType: string;
  
  // Margin
  leverage: number;
  leverageOverride: boolean;
  hedgeMode: boolean;
  marginMode: string;
  
  // Filters
  maxOpenTrades: number;
  minTradeInterval: number;
  allowedSymbols: string[] | null;
  blacklistedSymbols: string[] | null;
  
  // Signal
  ignoreSignalsWithoutSL: boolean;
  ignoreSignalsWithoutTP: boolean;
  minRiskRewardRatio: number | null;
}

export interface SignalProcessingResult {
  shouldExecute: boolean;
  reason: string;
  adjustedEntry?: number;
  trailingConfig?: TrailingStopConfig;
  tpGraceConfig?: TakeProfitGraceConfig;
  firstEntryConfig?: FirstEntryAsMarketConfig;
}

export interface EntryWeights {
  weights: number[];
  totalWeight: number;
}

// ==================== MAIN FUNCTIONS ====================

/**
 * Получить активную конфигурацию бота
 */
export async function getActiveBotConfig(userId: string): Promise<BotConfigSettings | null> {
  try {
    const config = await db.botConfig.findFirst({
      where: {
        userId,
        isActive: true,
      },
      orderBy: { updatedAt: "desc" },
    });
    
    if (!config) return null;
    
    return mapDbConfigToSettings(config);
  } catch (error) {
    console.error("[BotConfigIntegration] Error fetching config:", error);
    return null;
  }
}

/**
 * Получить конфигурацию бота по ID
 */
export async function getBotConfigById(configId: string): Promise<BotConfigSettings | null> {
  try {
    const config = await db.botConfig.findUnique({
      where: { id: configId },
    });
    
    if (!config) return null;
    
    return mapDbConfigToSettings(config);
  } catch (error) {
    console.error("[BotConfigIntegration] Error fetching config by ID:", error);
    return null;
  }
}

/**
 * Обработать сигнал с учётом настроек бота
 */
export function processSignalWithConfig(
  signal: {
    symbol: string;
    direction: "LONG" | "SHORT";
    entryPrices: number[];
    takeProfits: Array<{ price: number; percentage: number }>;
    stopLoss?: number;
    leverage?: number;
  },
  config: BotConfigSettings,
  currentPrice: number
): SignalProcessingResult {
  const result: SignalProcessingResult = {
    shouldExecute: true,
    reason: "Signal approved",
  };
  
  // 1. Проверка символа
  if (config.allowedSymbols && config.allowedSymbols.length > 0) {
    if (!config.allowedSymbols.includes(signal.symbol)) {
      return {
        shouldExecute: false,
        reason: `Symbol ${signal.symbol} not in allowed list`,
      };
    }
  }
  
  if (config.blacklistedSymbols && config.blacklistedSymbols.length > 0) {
    if (config.blacklistedSymbols.includes(signal.symbol)) {
      return {
        shouldExecute: false,
        reason: `Symbol ${signal.symbol} is blacklisted`,
      };
    }
  }
  
  // 2. Проверка SL/TP
  if (config.ignoreSignalsWithoutSL && !signal.stopLoss) {
    return {
      shouldExecute: false,
      reason: "Signal has no Stop Loss",
    };
  }
  
  if (config.ignoreSignalsWithoutTP && signal.takeProfits.length === 0) {
    return {
      shouldExecute: false,
      reason: "Signal has no Take Profit",
    };
  }
  
  // 3. Проверка R:R ratio
  if (config.minRiskRewardRatio && signal.entryPrices.length > 0 && signal.stopLoss && signal.takeProfits.length > 0) {
    const entry = signal.entryPrices[0];
    const tp = signal.takeProfits[0].price;
    const sl = signal.stopLoss;
    
    const risk = Math.abs(entry - sl);
    const reward = Math.abs(tp - entry);
    const rr = reward / risk;
    
    if (rr < config.minRiskRewardRatio) {
      return {
        shouldExecute: false,
        reason: `R:R ratio ${rr.toFixed(2)} below minimum ${config.minRiskRewardRatio}`,
      };
    }
  }
  
  // 4. First Entry as Market
  if (config.firstEntryAsMarketEnabled && signal.entryPrices.length > 0) {
    result.firstEntryConfig = {
      enabled: true,
      maxCapPercent: config.firstEntryAsMarketCap,
      activateMode: config.firstEntryAsMarketActivate,
    };
    
    result.adjustedEntry = calculateEffectiveEntryPrice(
      signal.entryPrices[0],
      currentPrice,
      signal.direction,
      result.firstEntryConfig
    );
  }
  
  // 5. Trailing Stop Configuration
  if (config.trailingEnabled) {
    result.trailingConfig = {
      enabled: true,
      type: config.trailingType as TrailingStopConfig["type"],
      triggerType: config.trailingTriggerType as TrailingStopConfig["triggerType"],
      triggerValue: config.trailingTriggerValue ?? 1,
      trailingPercent: config.trailingPercent ?? undefined,
    };
  }
  
  // 6. TP Grace Configuration
  if (config.tpGraceEnabled) {
    result.tpGraceConfig = {
      enabled: true,
      maxCapPercent: config.tpGraceMaxCap,
    };
  }
  
  return result;
}

/**
 * Рассчитать веса входа на основе стратегии
 */
export function calculateEntryWeights(
  config: BotConfigSettings,
  entryCount: number
): EntryWeights {
  const strategy = config.entryStrategy;
  
  // Если указаны кастомные веса
  if (strategy === "CUSTOM_RATIOS" && config.entryWeights && config.entryWeights.length > 0) {
    const weights = config.entryWeights.slice(0, entryCount);
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    return { weights, totalWeight };
  }
  
  // DCA стратегия
  if (strategy === "DCA") {
    const weights: number[] = [];
    let currentWeight = config.dcaFirstEntryPercent ?? (100 / entryCount);
    
    for (let i = 0; i < entryCount; i++) {
      if (i === 0 && config.dcaFirstEntryPercent) {
        weights.push(config.dcaFirstEntryPercent);
      } else {
        weights.push(currentWeight);
        currentWeight *= config.dcaAmountScale;
      }
    }
    
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    return { weights, totalWeight };
  }
  
  // Экспоненциально убывающая
  if (strategy === "DECREASING_EXP") {
    const weights: number[] = [];
    let remaining = 100;
    
    for (let i = 0; i < entryCount; i++) {
      const w = i < entryCount - 1 ? remaining / 2 : remaining;
      weights.push(w);
      remaining -= w;
    }
    
    return { weights, totalWeight: 100 };
  }
  
  // Экспоненциально возрастающая
  if (strategy === "INCREASING_EXP") {
    const rawWeights: number[] = [];
    let sum = 0;
    
    for (let i = 0; i < entryCount; i++) {
      const w = Math.pow(2, i);
      rawWeights.push(w);
      sum += w;
    }
    
    const weights = rawWeights.map(w => (w / sum) * 100);
    return { weights, totalWeight: 100 };
  }
  
  // По умолчанию - равномерное распределение
  const weight = 100 / entryCount;
  const weights = Array(entryCount).fill(weight);
  return { weights, totalWeight: 100 };
}

/**
 * Рассчитать веса TP на основе стратегии
 */
export function calculateTPWeights(
  config: BotConfigSettings,
  tpCount: number
): number[] {
  const strategy = config.tpStrategy;
  
  // Кастомные веса
  if (strategy === "CUSTOM_RATIOS" && config.tpCustomRatios && config.tpCustomRatios.length > 0) {
    const weights = config.tpCustomRatios.slice(0, tpCount);
    const sum = weights.reduce((a, b) => a + b, 0);
    if (sum !== 100) {
      // Нормализация к 100%
      return weights.map(w => (w / sum) * 100);
    }
    return weights;
  }
  
  // Одна цель
  if (strategy === "ONE_TARGET") {
    return [100];
  }
  
  // Две цели
  if (strategy === "TWO_TARGETS") {
    return [50, 50];
  }
  
  // Три цели
  if (strategy === "THREE_TARGETS") {
    return [33.33, 33.33, 33.34];
  }
  
  // 50% на первом
  if (strategy === "FIFTY_ON_FIRST") {
    const rest = tpCount > 1 ? 50 / (tpCount - 1) : 0;
    return [50, ...Array(tpCount - 1).fill(rest)];
  }
  
  // Убывающая экспонента
  if (strategy === "DECREASING_EXP") {
    const weights: number[] = [];
    let remaining = 100;
    
    for (let i = 0; i < tpCount; i++) {
      const w = i < tpCount - 1 ? remaining / 2 : remaining;
      weights.push(w);
      remaining -= w;
    }
    
    return weights;
  }
  
  // Возрастающая экспонента
  if (strategy === "INCREASING_EXP") {
    const rawWeights: number[] = [];
    let sum = 0;
    
    for (let i = 0; i < tpCount; i++) {
      const w = Math.pow(2, i);
      rawWeights.push(w);
      sum += w;
    }
    
    return rawWeights.map(w => (w / sum) * 100);
  }
  
  // Пропустить первый
  if (strategy === "SKIP_FIRST") {
    const rest = tpCount > 1 ? 100 / (tpCount - 1) : 100;
    return [0, ...Array(tpCount - 1).fill(rest)];
  }
  
  // По умолчанию - равномерно
  return Array(tpCount).fill(100 / tpCount);
}

/**
 * Получить leverage с учётом настроек
 */
export function getEffectiveLeverage(
  signalLeverage: number | undefined,
  config: BotConfigSettings
): number {
  if (config.leverageOverride) {
    return config.leverage;
  }
  return signalLeverage ?? config.leverage;
}

/**
 * Получить размер позиции с учётом настроек
 */
export function getEffectiveTradeAmount(
  signalAmount: number | undefined,
  config: BotConfigSettings,
  availableBalance: number
): number {
  if (config.amountOverride) {
    if (config.amountType === "PERCENTAGE") {
      return (config.tradeAmount / 100) * availableBalance;
    }
    return config.tradeAmount;
  }
  
  if (signalAmount) {
    return signalAmount;
  }
  
  if (config.amountType === "PERCENTAGE") {
    return (config.tradeAmount / 100) * availableBalance;
  }
  return config.tradeAmount;
}

// ==================== HELPER FUNCTIONS ====================

function mapDbConfigToSettings(dbConfig: any): BotConfigSettings {
  return {
    id: dbConfig.id,
    name: dbConfig.name,
    isActive: dbConfig.isActive,
    
    tradeAmount: dbConfig.tradeAmount,
    amountType: dbConfig.amountType,
    amountOverride: dbConfig.amountOverride,
    
    firstEntryAsMarketEnabled: dbConfig.firstEntryAsMarketEnabled,
    firstEntryAsMarketCap: dbConfig.firstEntryAsMarketCap,
    firstEntryAsMarketActivate: dbConfig.firstEntryAsMarketActivate,
    
    trailingEnabled: dbConfig.trailingEnabled,
    trailingType: dbConfig.trailingType,
    trailingTriggerType: dbConfig.trailingTriggerType,
    trailingTriggerValue: dbConfig.trailingTriggerValue,
    trailingPercent: dbConfig.trailingStopPercent,
    
    entryStrategy: dbConfig.entryStrategy,
    entryWeights: dbConfig.entryWeights ? JSON.parse(dbConfig.entryWeights) : null,
    entryZoneTargets: dbConfig.entryZoneTargets,
    
    dcaFirstEntryPercent: dbConfig.dcaFirstEntryPercent,
    dcaAmountScale: dbConfig.dcaAmountScale,
    dcaPriceDiff: dbConfig.dcaPriceDiff,
    dcaPriceScale: dbConfig.dcaPriceScale,
    dcaMaxPriceDiff: dbConfig.dcaMaxPriceDiff,
    
    tpStrategy: dbConfig.tpStrategy,
    tpTargetCount: dbConfig.tpTargetCount,
    tpCustomRatios: dbConfig.tpCustomRatios ? JSON.parse(dbConfig.tpCustomRatios) : null,
    
    tpGraceEnabled: dbConfig.tpGraceEnabled,
    tpGraceMaxCap: dbConfig.tpGraceMaxCap,
    
    defaultStopLoss: dbConfig.defaultStopLoss,
    slTimeout: dbConfig.slTimeout,
    slTimeoutUnit: dbConfig.slTimeoutUnit,
    slOrderType: dbConfig.slOrderType,
    
    leverage: dbConfig.leverage,
    leverageOverride: dbConfig.leverageOverride,
    hedgeMode: dbConfig.hedgeMode,
    marginMode: dbConfig.marginMode,
    
    maxOpenTrades: dbConfig.maxOpenTrades,
    minTradeInterval: dbConfig.minTradeInterval,
    allowedSymbols: dbConfig.allowedSymbols ? JSON.parse(dbConfig.allowedSymbols) : null,
    blacklistedSymbols: dbConfig.blacklistedSymbols ? JSON.parse(dbConfig.blacklistedSymbols) : null,
    
    ignoreSignalsWithoutSL: dbConfig.ignoreSignalsWithoutSL,
    ignoreSignalsWithoutTP: dbConfig.ignoreSignalsWithoutTP,
    minRiskRewardRatio: dbConfig.minRiskRewardRatio,
  };
}

// ==================== EXPORTS ====================

export default {
  getActiveBotConfig,
  getBotConfigById,
  processSignalWithConfig,
  calculateEntryWeights,
  calculateTPWeights,
  getEffectiveLeverage,
  getEffectiveTradeAmount,
};
