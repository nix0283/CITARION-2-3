/**
 * Trailing Take-Profit Service
 * Cornix-compatible trailing TP after targets reached
 * 
 * Features:
 * - Trailing % distance after TP activation
 * - Automatic leverage adjustment (divides % by leverage)
 * - Merges with existing trailing TP orders when new TP is reached
 */

import type { Position } from "@prisma/client";

export type TrailingTPStatus = "INACTIVE" | "ACTIVE" | "COMPLETED";

export interface TrailingTPConfig {
  enabled: boolean;
  trailPercent: number; // Trail TP by this % behind price
  activateAfterTP: number; // Activate after Nth TP filled
  onlyIfNotDefinedByGroup: boolean;
  leverage?: number; // Trade leverage for adjustment
}

export interface TrailingTPState {
  id: string;
  positionId: string;
  status: TrailingTPStatus;
  originalTP: number;
  currentTP: number;
  highestPrice: number;
  lowestPrice: number;
  trailPercent: number;
  effectiveTrailPercent: number; // After leverage adjustment
  direction: "LONG" | "SHORT";
  filledTPCount: number;
  mergedAmount: number; // Amount from merged TP orders
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Calculate effective trailing percent with leverage adjustment
 * Cornix: "For automated trades with leverage, the bot will automatically 
 * divide the trailing percentage by the trade's leverage"
 */
export function calculateEffectiveTrailPercent(
  trailPercent: number,
  leverage: number = 1
): number {
  if (leverage <= 1) return trailPercent;
  return trailPercent / leverage;
}

/**
 * Calculate trailing TP price
 */
export function calculateTrailingTPPrice(
  highestPrice: number,
  trailPercent: number,
  direction: "LONG" | "SHORT",
  leverage?: number
): number {
  // Apply leverage adjustment
  const effectivePercent = calculateEffectiveTrailPercent(trailPercent, leverage);
  
  if (direction === "LONG") {
    // For LONG, TP trails BELOW highest price
    return highestPrice * (1 - effectivePercent / 100);
  } else {
    // For SHORT, TP trails ABOVE lowest price
    return highestPrice * (1 + effectivePercent / 100);
  }
}

/**
 * Check if trailing TP should activate
 */
export function shouldActivateTrailingTP(
  filledTPCount: number,
  activateAfterTP: number,
  currentStatus: TrailingTPStatus
): boolean {
  if (currentStatus !== "INACTIVE") return false;
  return filledTPCount >= activateAfterTP;
}

/**
 * Process trailing TP update
 * Returns new state and whether TP order should be updated
 */
export function processTrailingTP(
  state: TrailingTPState,
  currentPrice: number,
  filledTPCount: number,
  config: TrailingTPConfig
): { state: TrailingTPState; shouldUpdateTP: boolean; newTP?: number } {
  // Update price tracking
  const newState = {
    ...state,
    highestPrice: Math.max(state.highestPrice, currentPrice),
    lowestPrice: Math.min(state.lowestPrice, currentPrice),
    filledTPCount,
    updatedAt: new Date()
  };
  
  // Check activation
  if (shouldActivateTrailingTP(filledTPCount, config.activateAfterTP, newState.status)) {
    newState.status = "ACTIVE";
    // Store effective trail percent
    newState.effectiveTrailPercent = calculateEffectiveTrailPercent(
      config.trailPercent,
      config.leverage
    );
  }
  
  if (newState.status !== "ACTIVE") {
    return { state: newState, shouldUpdateTP: false };
  }
  
  // Calculate new TP
  const referencePrice = newState.direction === "LONG" 
    ? newState.highestPrice 
    : newState.lowestPrice;
    
  const newTP = calculateTrailingTPPrice(
    referencePrice,
    config.trailPercent,
    newState.direction,
    config.leverage
  );
  
  // Check if new TP is better (tighter)
  const isBetter = newState.direction === "LONG"
    ? newTP > newState.currentTP
    : newTP < newState.currentTP;
  
  if (isBetter) {
    return {
      state: { ...newState, currentTP: newTP },
      shouldUpdateTP: true,
      newTP
    };
  }
  
  return { state: newState, shouldUpdateTP: false };
}

/**
 * Merge new TP amount with existing trailing TP order
 * Cornix: "When new TP is reached while trailing TP is active, 
 * merge the amount instead of creating new order"
 */
export function mergeTrailingTPAmount(
  currentState: TrailingTPState,
  newAmount: number
): TrailingTPState {
  return {
    ...currentState,
    mergedAmount: currentState.mergedAmount + newAmount,
    updatedAt: new Date()
  };
}

/**
 * Initialize trailing TP state for a position
 */
export function initializeTrailingTPState(
  positionId: string,
  direction: "LONG" | "SHORT",
  initialTP: number,
  config: TrailingTPConfig
): TrailingTPState {
  const effectivePercent = calculateEffectiveTrailPercent(
    config.trailPercent,
    config.leverage
  );
  
  return {
    id: `trailing-tp-${positionId}`,
    positionId,
    status: "INACTIVE",
    originalTP: initialTP,
    currentTP: initialTP,
    highestPrice: 0,
    lowestPrice: Infinity,
    trailPercent: config.trailPercent,
    effectiveTrailPercent: effectivePercent,
    direction,
    filledTPCount: 0,
    mergedAmount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

/**
 * Check if price triggers trailing TP sell
 */
export function checkTrailingTPTrigger(
  currentPrice: number,
  trailingTPPrice: number,
  direction: "LONG" | "SHORT"
): boolean {
  if (direction === "LONG") {
    // For LONG, sell when price drops to or below trailing TP
    return currentPrice <= trailingTPPrice;
  } else {
    // For SHORT, buy back when price rises to or above trailing TP
    return currentPrice >= trailingTPPrice;
  }
}

export default {
  calculateEffectiveTrailPercent,
  calculateTrailingTPPrice,
  shouldActivateTrailingTP,
  processTrailingTP,
  mergeTrailingTPAmount,
  initializeTrailingTPState,
  checkTrailingTPTrigger
};
