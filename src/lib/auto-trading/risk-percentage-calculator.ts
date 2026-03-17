/**
 * Risk Percentage Position Size Calculator
 * 
 * Cornix-compatible implementation for calculating position size
 * based on risk percentage of portfolio.
 * 
 * Formula:
 * Position Size = (Risk % × Portfolio Size) / Trade's Potential Loss %
 * 
 * @example
 * // 1% risk from $10,000 portfolio with 5% stop loss
 * const result = calculateRiskPositionSize({
 *   riskPercent: 1,
 *   portfolioSize: 10000,
 *   entryPrice: 50000,
 *   stopLossPrice: 47500, // 5% below entry
 *   leverage: 10
 * });
 * // Result: Position of $2,000 (margin $200 with 10x leverage)
 */

export interface RiskCalculationParams {
  /** Risk percentage (0.1-100%) */
  riskPercent: number;
  /** Total portfolio size in USDT */
  portfolioSize: number;
  /** Entry price of the asset */
  entryPrice: number;
  /** Stop loss price */
  stopLossPrice: number;
  /** Leverage multiplier (default: 1) */
  leverage?: number;
  /** Direction of the trade */
  direction: "LONG" | "SHORT";
  /** Exchange fee percentage (default: 0.04% for futures taker) */
  feePercent?: number;
}

export interface RiskCalculationResult {
  /** Position size in USDT */
  positionSizeUSDT: number;
  /** Position size in asset units */
  positionSizeAsset: number;
  /** Required margin in USDT */
  marginRequired: number;
  /** Potential loss in USDT if SL hit */
  potentialLossUSDT: number;
  /** Potential loss percentage */
  potentialLossPercent: number;
  /** Risk amount in USDT */
  riskAmountUSDT: number;
  /** Effective risk percentage of portfolio */
  effectiveRiskPercent: number;
  /** Whether calculation is valid */
  isValid: boolean;
  /** Validation errors if any */
  errors: string[];
}

/**
 * Calculate position size based on risk percentage
 * 
 * This implements Cornix's Risk Percentage formula for position sizing.
 */
export function calculateRiskPositionSize(
  params: RiskCalculationParams
): RiskCalculationResult {
  const errors: string[] = [];
  
  const {
    riskPercent,
    portfolioSize,
    entryPrice,
    stopLossPrice,
    leverage = 1,
    direction,
    feePercent = 0.04,
  } = params;

  // Validation
  if (riskPercent <= 0 || riskPercent > 100) {
    errors.push("Risk percentage must be between 0.1% and 100%");
  }
  
  if (portfolioSize <= 0) {
    errors.push("Portfolio size must be positive");
  }
  
  if (entryPrice <= 0) {
    errors.push("Entry price must be positive");
  }
  
  if (stopLossPrice <= 0) {
    errors.push("Stop loss price must be positive");
  }

  // Calculate potential loss percentage
  let potentialLossPercent: number;
  
  if (direction === "LONG") {
    // For LONG, SL should be below entry
    if (stopLossPrice >= entryPrice) {
      errors.push("For LONG positions, stop loss should be below entry price");
    }
    potentialLossPercent = ((entryPrice - stopLossPrice) / entryPrice) * 100;
  } else {
    // For SHORT, SL should be above entry
    if (stopLossPrice <= entryPrice) {
      errors.push("For SHORT positions, stop loss should be above entry price");
    }
    potentialLossPercent = ((stopLossPrice - entryPrice) / entryPrice) * 100;
  }

  // Add fee impact to potential loss
  const totalLossPercent = potentialLossPercent + feePercent;

  // Calculate risk amount in USDT
  const riskAmountUSDT = (riskPercent / 100) * portfolioSize;

  // Calculate position size using Cornix formula
  // Position Size = (Risk % × Portfolio) / Trade Loss %
  let positionSizeUSDT = 0;
  
  if (totalLossPercent > 0) {
    positionSizeUSDT = riskAmountUSDT / (totalLossPercent / 100);
  }

  // Apply leverage to get margin requirement
  const marginRequired = positionSizeUSDT / leverage;
  
  // Calculate position size in asset units
  const positionSizeAsset = positionSizeUSDT / entryPrice;
  
  // Calculate potential loss in USDT
  const potentialLossUSDT = positionSizeUSDT * (totalLossPercent / 100);

  // Check if margin exceeds portfolio
  if (marginRequired > portfolioSize) {
    errors.push(`Required margin ($${marginRequired.toFixed(2)}) exceeds portfolio size ($${portfolioSize.toFixed(2)})`);
  }

  // Calculate effective risk percentage
  const effectiveRiskPercent = (potentialLossUSDT / portfolioSize) * 100;

  return {
    positionSizeUSDT,
    positionSizeAsset,
    marginRequired,
    potentialLossUSDT,
    potentialLossPercent: totalLossPercent,
    riskAmountUSDT,
    effectiveRiskPercent,
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate stop loss price from percentage
 */
export function calculateStopLossPrice(
  entryPrice: number,
  stopLossPercent: number,
  direction: "LONG" | "SHORT"
): number {
  if (direction === "LONG") {
    return entryPrice * (1 - stopLossPercent / 100);
  } else {
    return entryPrice * (1 + stopLossPercent / 100);
  }
}

/**
 * Calculate risk percentage from position size
 * (Reverse calculation)
 */
export function calculateRiskFromPosition(
  positionSizeUSDT: number,
  portfolioSize: number,
  entryPrice: number,
  stopLossPrice: number,
  direction: "LONG" | "SHORT"
): number {
  let potentialLossPercent: number;
  
  if (direction === "LONG") {
    potentialLossPercent = ((entryPrice - stopLossPrice) / entryPrice) * 100;
  } else {
    potentialLossPercent = ((stopLossPrice - entryPrice) / entryPrice) * 100;
  }

  const potentialLossUSDT = positionSizeUSDT * (potentialLossPercent / 100);
  return (potentialLossUSDT / portfolioSize) * 100;
}

/**
 * Validate risk percentage configuration
 */
export function validateRiskPercentageConfig(
  config: {
    riskPercentageValue: number;
    riskPercentagePortfolioSize: number;
    defaultStopLoss: number | null;
  }
): { isValid: boolean; warnings: string[]; errors: string[] } {
  const warnings: string[] = [];
  const errors: string[] = [];

  // Check if stop loss is configured
  if (!config.defaultStopLoss || config.defaultStopLoss <= 0) {
    errors.push("Stop Loss must be configured for Risk Percentage mode");
  }

  // Check risk percentage range
  if (config.riskPercentageValue <= 0) {
    errors.push("Risk percentage must be greater than 0");
  }
  if (config.riskPercentageValue > 10) {
    warnings.push("Risk percentage above 10% is considered high risk");
  }
  if (config.riskPercentageValue > 25) {
    errors.push("Risk percentage above 25% is not recommended");
  }

  // Check portfolio size
  if (config.riskPercentagePortfolioSize <= 0) {
    errors.push("Portfolio size must be positive");
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors,
  };
}

/**
 * Format risk calculation result for display
 */
export function formatRiskResult(result: RiskCalculationResult): string {
  if (!result.isValid) {
    return `Invalid: ${result.errors.join(", ")}`;
  }

  return [
    `Position: $${result.positionSizeUSDT.toFixed(2)}`,
    `Margin: $${result.marginRequired.toFixed(2)}`,
    `Max Loss: $${result.potentialLossUSDT.toFixed(2)} (${result.potentialLossPercent.toFixed(2)}%)`,
    `Risk: ${result.effectiveRiskPercent.toFixed(2)}% of portfolio`,
  ].join(" | ");
}
