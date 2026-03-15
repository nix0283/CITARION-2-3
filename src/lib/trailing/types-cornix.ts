/**
 * Cornix-compatible Trailing Stop Types
 * 
 * Re-exported for backward compatibility with existing code.
 */

// ==================== CORNIX TYPES ====================

export type CornixTrailingType = 
  | "BREAKEVEN" 
  | "MOVING_TARGET" 
  | "MOVING_2_TARGET" 
  | "PERCENT_BELOW_TRIGGERS" 
  | "PERCENT_BELOW_HIGHEST";

export type CornixTrailingTriggerType = "TARGET_REACHED" | "PERCENT_ABOVE_ENTRY";

export type CornixTrailingStatus = "INACTIVE" | "TRIGGERED" | "ACTIVE" | "STOPPED";

export interface CornixTrailingStopConfig {
  enabled: boolean;
  type: CornixTrailingType;
  triggerType: CornixTrailingTriggerType;
  triggerValue?: number;
  trailingPercent?: number;
  onlyIfNotDefinedByGroup?: boolean;
}

export interface CornixTrailingStopState {
  id: string;
  positionId: string;
  type: CornixTrailingType;
  status: CornixTrailingStatus;
  originalSL: number;
  currentSL: number;
  avgEntryPrice: number;
  highestPrice: number;
  lowestPrice: number;
  triggerTargetIndex: number;
  lastTPPrice: number | null;
  last2TPPrice: number | null;
  trailingDistance: number;
  createdAt: Date;
  activatedAt: Date | null;
  lastUpdatedAt: Date | null;
}

export interface CornixTrailingStopResult {
  updated: boolean;
  newStopLoss: number | null;
  reason: string;
  details: {
    type: CornixTrailingType;
    status: CornixTrailingStatus;
    highestPrice: number;
    lowestPrice: number;
    trailingDistance: number;
  };
}
