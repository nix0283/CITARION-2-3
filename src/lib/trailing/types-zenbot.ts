/**
 * Zenbot-style Trailing Stop Types
 * 
 * Re-exported for backward compatibility with existing code.
 * Ported from Zenbot (https://github.com/DeviaVir/zenbot)
 */

// ==================== ZENBOT TYPES ====================

export interface ZenbotTrailingStopConfig {
  /** Activate trailing when profit reaches X% */
  profitStopEnablePct: number;
  /** Distance from peak for trailing stop (%) */
  profitStopPct: number;
  
  /** Entry price */
  entryPrice: number;
  /** Position direction */
  direction: "LONG" | "SHORT";
  
  /** Position start time */
  startTime: Date;
  
  // Internal state
  /** Is trailing activated */
  activated: boolean;
  /** High-water mark (max/min price) */
  highWaterMark: number;
  /** Current stop loss */
  currentStopLoss: number | null;
}

export interface ZenbotTrailingStopResult {
  /** Should activate trailing */
  shouldActivate: boolean;
  /** Should close position */
  shouldClose: boolean;
  /** New stop loss price */
  newStopLoss: number | null;
  /** Reason for action */
  reason: string;
  /** Current profit percentage */
  profitPercent: number;
  /** High water mark */
  highWaterMark: number;
}
