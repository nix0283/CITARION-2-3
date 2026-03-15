/**
 * Unified Trailing Stop Module
 * 
 * Consolidates all trailing stop implementations into a single module:
 * - Cornix-compatible (5 types)
 * - Zenbot-style (high-water mark)
 * - Simple (percent/fixed/breakeven)
 * 
 * This module serves as the single source of truth for trailing stop logic.
 * 
 * @author CITARION Team
 * @version 3.0.0
 */

import { db } from "@/lib/db";

// ==================== TYPES ====================

/**
 * All supported trailing stop types
 */
export type TrailingType =
  | "BREAKEVEN"
  | "MOVING_TARGET"
  | "MOVING_2_TARGET"
  | "PERCENT_BELOW_TRIGGERS"
  | "PERCENT_BELOW_HIGHEST"
  | "PERCENT"
  | "FIXED"
  | "ZENBOT_HIGH_WATER";

/**
 * Trigger types for trailing activation
 */
export type TrailingTriggerType = 
  | "TARGET_REACHED" 
  | "PERCENT_ABOVE_ENTRY"
  | "PROFIT_THRESHOLD"
  | "IMMEDIATE";

/**
 * Direction for position
 */
export type PositionDirection = "LONG" | "SHORT";

/**
 * Status of trailing stop
 */
export type TrailingStatus = 
  | "INACTIVE" 
  | "TRIGGERED" 
  | "ACTIVE" 
  | "STOPPED"
  | "DISABLED";

/**
 * Unified configuration for all trailing types
 */
export interface UnifiedTrailingConfig {
  enabled: boolean;
  type: TrailingType;
  triggerType: TrailingTriggerType;
  
  // For Cornix types
  triggerValue?: number;
  trailingPercent?: number;
  triggerTargetIndex?: number;
  
  // For Zenbot type
  profitStopEnablePct?: number;
  profitStopPct?: number;
  
  // For simple types
  value?: number;
  
  // General
  onlyIfNotDefinedByGroup?: boolean;
}

/**
 * State tracking for trailing stop
 */
export interface TrailingState {
  id: string;
  positionId: string;
  type: TrailingType;
  status: TrailingStatus;
  
  // Prices
  originalSL: number;
  currentSL: number;
  avgEntryPrice: number;
  highestPrice: number;
  lowestPrice: number;
  
  // For target-based types
  triggerTargetIndex: number;
  lastTPPrice: number | null;
  last2TPPrice: number | null;
  
  // Distance tracking
  trailingDistance: number;
  
  // Timestamps
  createdAt: Date;
  activatedAt: Date | null;
  lastUpdatedAt: Date | null;
}

/**
 * Result of trailing stop check
 */
export interface TrailingCheckResult {
  updated: boolean;
  shouldClose: boolean;
  newStopLoss: number | null;
  reason: string;
  details: {
    type: TrailingType;
    status: TrailingStatus;
    highestPrice: number;
    lowestPrice: number;
    trailingDistance: number;
    profitPercent: number;
  };
}

/**
 * Position data needed for trailing calculations
 */
export interface TrailingPositionData {
  id: string;
  symbol: string;
  direction: PositionDirection;
  avgEntryPrice: number;
  currentPrice: number;
  stopLoss: number | null;
  takeProfit: number | null;
  takeProfits?: Array<{ price: number; percentage: number }>;
  highestPrice: number | null;
  lowestPrice: number | null;
  leverage: number;
  trailingStop: string | null;
  trailingActivated: boolean;
}

// ==================== UNIFIED TRAILING STOP CLASS ====================

/**
 * Unified Trailing Stop Manager
 * 
 * Handles all trailing stop types with a single interface
 */
export class UnifiedTrailingStop {
  private config: UnifiedTrailingConfig;
  private state: TrailingState;

  constructor(config: UnifiedTrailingConfig, initialState?: Partial<TrailingState>) {
    this.config = config;
    this.state = {
      id: initialState?.id || crypto.randomUUID(),
      positionId: initialState?.positionId || "",
      type: config.type,
      status: config.enabled ? "INACTIVE" : "DISABLED",
      originalSL: initialState?.originalSL || 0,
      currentSL: initialState?.currentSL || 0,
      avgEntryPrice: initialState?.avgEntryPrice || 0,
      highestPrice: initialState?.highestPrice || 0,
      lowestPrice: initialState?.lowestPrice || Infinity,
      triggerTargetIndex: 0,
      lastTPPrice: initialState?.lastTPPrice || null,
      last2TPPrice: initialState?.last2TPPrice || null,
      trailingDistance: 0,
      createdAt: new Date(),
      activatedAt: null,
      lastUpdatedAt: null,
    };
  }

  /**
   * Check and update trailing stop based on current price
   */
  check(position: TrailingPositionData, reachedTargets: number[] = []): TrailingCheckResult {
    if (!this.config.enabled) {
      return this.createResult(false, false, null, "Trailing stop disabled");
    }

    // Update high/low watermarks
    this.updateWatermarks(position);

    // Check if should activate
    if (this.state.status === "INACTIVE") {
      const activated = this.checkActivation(position, reachedTargets);
      if (!activated) {
        return this.createResult(false, false, null, "Waiting for activation trigger");
      }
      this.state.status = "ACTIVE";
      this.state.activatedAt = new Date();
    }

    // Calculate new stop loss based on type
    const result = this.calculateStopLoss(position, reachedTargets);

    // Check if should close position
    if (result.shouldClose) {
      this.state.status = "STOPPED";
    }

    this.state.lastUpdatedAt = new Date();

    return result;
  }

  /**
   * Update high/low watermarks
   */
  private updateWatermarks(position: TrailingPositionData): void {
    if (position.direction === "LONG") {
      if (position.currentPrice > this.state.highestPrice) {
        this.state.highestPrice = position.currentPrice;
      }
    } else {
      if (position.currentPrice < this.state.lowestPrice || this.state.lowestPrice === 0) {
        this.state.lowestPrice = position.currentPrice;
      }
      if (this.state.lowestPrice === Infinity) {
        this.state.lowestPrice = position.currentPrice;
      }
    }
  }

  /**
   * Check if trailing should activate
   */
  private checkActivation(position: TrailingPositionData, reachedTargets: number[]): boolean {
    switch (this.config.triggerType) {
      case "IMMEDIATE":
        return true;

      case "TARGET_REACHED":
        return reachedTargets.length >= (this.config.triggerTargetIndex || 1);

      case "PERCENT_ABOVE_ENTRY":
        const profitPercent = this.calculateProfitPercent(position);
        return profitPercent >= (this.config.triggerValue || 0);

      case "PROFIT_THRESHOLD":
        const profit = this.calculateProfitPercent(position);
        return profit >= (this.config.profitStopEnablePct || 0);

      default:
        return false;
    }
  }

  /**
   * Calculate new stop loss based on trailing type
   */
  private calculateStopLoss(
    position: TrailingPositionData,
    reachedTargets: number[]
  ): TrailingCheckResult {
    let newSL: number | null = null;
    let reason = "";
    let shouldClose = false;

    switch (this.config.type) {
      case "BREAKEVEN":
        newSL = this.calculateBreakeven(position);
        reason = "Moved SL to breakeven";
        break;

      case "MOVING_TARGET":
        newSL = this.calculateMovingTarget(position, reachedTargets, 1);
        reason = "SL following 1 target distance";
        break;

      case "MOVING_2_TARGET":
        newSL = this.calculateMovingTarget(position, reachedTargets, 2);
        reason = "SL following 2 target distance";
        break;

      case "PERCENT_BELOW_TRIGGERS":
        newSL = this.calculatePercentBelowTriggers(position);
        reason = `SL at ${this.config.trailingPercent}% below trigger`;
        break;

      case "PERCENT_BELOW_HIGHEST":
        newSL = this.calculatePercentBelowHighest(position);
        reason = `SL at ${this.config.trailingPercent}% below highest`;
        break;

      case "PERCENT":
        newSL = this.calculatePercentTrailing(position);
        reason = `SL trailing at ${this.config.value}%`;
        break;

      case "FIXED":
        newSL = this.calculateFixedTrailing(position);
        reason = `SL trailing at fixed distance ${this.config.value}`;
        break;

      case "ZENBOT_HIGH_WATER":
        const zenbotResult = this.calculateZenbotTrailing(position);
        newSL = zenbotResult.newSL;
        shouldClose = zenbotResult.shouldClose;
        reason = zenbotResult.reason;
        break;

      default:
        reason = "Unknown trailing type";
    }

    // Validate new SL
    if (newSL !== null) {
      // For LONG, SL should be below current price
      // For SHORT, SL should be above current price
      if (position.direction === "LONG" && newSL >= position.currentPrice) {
        shouldClose = true;
        reason = "Price crossed below trailing stop";
      } else if (position.direction === "SHORT" && newSL <= position.currentPrice) {
        shouldClose = true;
        reason = "Price crossed above trailing stop";
      }

      // Only update if new SL is more favorable
      if (!shouldClose && this.isMoreFavorable(position.direction, newSL, this.state.currentSL)) {
        this.state.currentSL = newSL;
        this.state.trailingDistance = Math.abs(position.currentPrice - newSL);
        return this.createResult(true, false, newSL, reason);
      }
    }

    return this.createResult(false, shouldClose, null, reason);
  }

  /**
   * Calculate breakeven stop loss
   */
  private calculateBreakeven(position: TrailingPositionData): number {
    return position.avgEntryPrice;
  }

  /**
   * Calculate moving target trailing
   */
  private calculateMovingTarget(
    position: TrailingPositionData,
    reachedTargets: number[],
    targetDistance: number
  ): number | null {
    if (!position.takeProfits || position.takeProfits.length === 0) {
      return null;
    }

    const lastTargetIndex = reachedTargets.length - 1;
    const targetToFollow = lastTargetIndex - targetDistance + 1;

    if (targetToFollow < 0 || targetToFollow >= position.takeProfits.length) {
      return null;
    }

    return position.takeProfits[targetToFollow].price;
  }

  /**
   * Calculate percent below triggers
   */
  private calculatePercentBelowTriggers(position: TrailingPositionData): number {
    const triggerPrice = this.state.highestPrice || position.avgEntryPrice;
    const percent = this.config.trailingPercent || 2;
    
    if (position.direction === "LONG") {
      return triggerPrice * (1 - percent / 100);
    } else {
      return triggerPrice * (1 + percent / 100);
    }
  }

  /**
   * Calculate percent below highest
   */
  private calculatePercentBelowHighest(position: TrailingPositionData): number {
    const highest = this.state.highestPrice || position.currentPrice;
    const percent = this.config.trailingPercent || 2;
    
    if (position.direction === "LONG") {
      return highest * (1 - percent / 100);
    } else {
      const lowest = this.state.lowestPrice || position.currentPrice;
      return lowest * (1 + percent / 100);
    }
  }

  /**
   * Calculate simple percent trailing
   */
  private calculatePercentTrailing(position: TrailingPositionData): number {
    const percent = this.config.value || 2;
    
    if (position.direction === "LONG") {
      return this.state.highestPrice * (1 - percent / 100);
    } else {
      return this.state.lowestPrice * (1 + percent / 100);
    }
  }

  /**
   * Calculate fixed distance trailing
   */
  private calculateFixedTrailing(position: TrailingPositionData): number {
    const distance = this.config.value || 100;
    
    if (position.direction === "LONG") {
      return this.state.highestPrice - distance;
    } else {
      return this.state.lowestPrice + distance;
    }
  }

  /**
   * Calculate Zenbot-style high-water mark trailing
   */
  private calculateZenbotTrailing(
    position: TrailingPositionData
  ): { newSL: number | null; shouldClose: boolean; reason: string } {
    const enablePct = this.config.profitStopEnablePct || 1;
    const stopPct = this.config.profitStopPct || 1;
    
    const profitPercent = this.calculateProfitPercent(position);
    
    // Check if should activate
    if (profitPercent < enablePct) {
      return { newSL: null, shouldClose: false, reason: "Profit below enable threshold" };
    }
    
    // Calculate stop based on high-water mark
    let newSL: number;
    if (position.direction === "LONG") {
      newSL = this.state.highestPrice * (1 - stopPct / 100);
    } else {
      newSL = this.state.lowestPrice * (1 + stopPct / 100);
    }
    
    // Check if price crossed stop
    const shouldClose = 
      (position.direction === "LONG" && position.currentPrice <= newSL) ||
      (position.direction === "SHORT" && position.currentPrice >= newSL);
    
    return {
      newSL,
      shouldClose,
      reason: shouldClose ? "Zenbot trailing stop triggered" : "Zenbot high-water mark trailing",
    };
  }

  /**
   * Calculate profit percentage
   */
  private calculateProfitPercent(position: TrailingPositionData): number {
    const diff = position.currentPrice - position.avgEntryPrice;
    return (diff / position.avgEntryPrice) * 100 * (position.direction === "LONG" ? 1 : -1);
  }

  /**
   * Check if new SL is more favorable than current
   */
  private isMoreFavorable(direction: PositionDirection, newSL: number, currentSL: number): boolean {
    if (currentSL === 0) return true;
    
    if (direction === "LONG") {
      return newSL > currentSL;
    } else {
      return newSL < currentSL;
    }
  }

  /**
   * Create standardized result
   */
  private createResult(
    updated: boolean,
    shouldClose: boolean,
    newStopLoss: number | null,
    reason: string
  ): TrailingCheckResult {
    const profitPercent = this.calculateProfitPercent({
      currentPrice: this.state.highestPrice || 0,
      avgEntryPrice: this.state.avgEntryPrice,
      direction: this.state.type.includes("SHORT") ? "SHORT" : "LONG",
    } as TrailingPositionData);

    return {
      updated,
      shouldClose,
      newStopLoss,
      reason,
      details: {
        type: this.config.type,
        status: this.state.status,
        highestPrice: this.state.highestPrice,
        lowestPrice: this.state.lowestPrice,
        trailingDistance: this.state.trailingDistance,
        profitPercent,
      },
    };
  }

  /**
   * Get current state
   */
  getState(): TrailingState {
    return { ...this.state };
  }

  /**
   * Get config
   */
  getConfig(): UnifiedTrailingConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<UnifiedTrailingConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

// ==================== FACTORY FUNCTIONS ====================

/**
 * Create trailing stop from Cornix config
 */
export function createFromCornixConfig(config: {
  enabled: boolean;
  type: string;
  triggerType: string;
  triggerValue?: number;
  trailingPercent?: number;
}): UnifiedTrailingStop {
  return new UnifiedTrailingStop({
    enabled: config.enabled,
    type: config.type as TrailingType,
    triggerType: config.triggerType as TrailingTriggerType,
    triggerValue: config.triggerValue,
    trailingPercent: config.trailingPercent,
  });
}

/**
 * Create trailing stop from Zenbot config
 */
export function createFromZenbotConfig(config: {
  profit_stop_enable_pct: number;
  profit_stop_pct: number;
}): UnifiedTrailingStop {
  return new UnifiedTrailingStop({
    enabled: true,
    type: "ZENBOT_HIGH_WATER",
    triggerType: "PROFIT_THRESHOLD",
    profitStopEnablePct: config.profit_stop_enable_pct,
    profitStopPct: config.profit_stop_pct,
  });
}

/**
 * Create simple trailing stop
 */
export function createSimpleTrailing(
  type: "PERCENT" | "FIXED" | "BREAKEVEN",
  value: number
): UnifiedTrailingStop {
  return new UnifiedTrailingStop({
    enabled: true,
    type: type === "BREAKEVEN" ? "BREAKEVEN" : type,
    triggerType: "IMMEDIATE",
    value,
  });
}

// ==================== DATABASE HELPERS ====================

/**
 * Load trailing config from database
 */
export async function loadTrailingConfig(positionId: string): Promise<UnifiedTrailingConfig | null> {
  try {
    const position = await db.position.findUnique({
      where: { id: positionId },
      select: { trailingStop: true },
    });

    if (!position?.trailingStop) return null;

    return JSON.parse(position.trailingStop) as UnifiedTrailingConfig;
  } catch {
    return null;
  }
}

/**
 * Save trailing state to database
 */
export async function saveTrailingState(
  positionId: string,
  state: TrailingState
): Promise<void> {
  try {
    await db.position.update({
      where: { id: positionId },
      data: {
        trailingStop: JSON.stringify(state),
        trailingActivated: state.status === "ACTIVE",
        highestPrice: state.highestPrice,
        lowestPrice: state.lowestPrice,
      },
    });
  } catch (error) {
    console.error("[TrailingStop] Failed to save state:", error);
  }
}

// ==================== RE-EXPORTS FOR BACKWARD COMPATIBILITY ====================

// Export types that were in other modules
export type {
  TrailingType as CornixTrailingType,
  TrailingTriggerType as CornixTrailingTriggerType,
  TrailingStatus as CornixTrailingStatus,
  TrailingStopConfig as CornixTrailingStopConfig,
  TrailingStopState as CornixTrailingStopState,
} from "./types-cornix";

export type {
  TrailingStopConfig as ZenbotTrailingStopConfig,
  TrailingStopResult as ZenbotTrailingStopResult,
} from "./types-zenbot";

// Default export
export default UnifiedTrailingStop;
