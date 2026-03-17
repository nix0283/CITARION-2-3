"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { TradingMode, MarketType } from "./use-accounts";

export interface TradingPosition {
  id: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  status: string;
  
  // Position details
  totalAmount: number;
  filledAmount: number;
  avgEntryPrice: number;
  currentPrice: number | null;
  leverage: number;
  
  // Risk management
  stopLoss: number | null;
  takeProfit: number | null;
  trailingStop: string | null;
  trailingActivated: boolean;
  
  // PnL
  unrealizedPnl: number;
  realizedPnl: number;
  
  // Liquidation
  liquidationPrice?: number | null;
  
  // Account info
  accountId: string;
  exchangeId: string;
  exchangeName: string;
  isDemo: boolean;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  
  // Computed fields
  unrealizedPnlPercent?: number;
  margin?: number;
}

interface UsePositionsOptions {
  mode: TradingMode;
  marketType: MarketType;
  accountId?: string | null;
  autoRefresh?: boolean;
  refreshInterval?: number; // ms
}

interface UsePositionsReturn {
  positions: TradingPosition[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
  closePosition: (positionId: string, quantity?: number) => Promise<boolean>;
  updatePosition: (positionId: string, updates: { stopLoss?: number; takeProfit?: number }) => Promise<boolean>;
}

/**
 * Hook to fetch and manage trading positions with real-time polling
 */
export function usePositions(options: UsePositionsOptions): UsePositionsReturn {
  const {
    mode,
    marketType,
    accountId,
    autoRefresh = true,
    refreshInterval = 5000,
  } = options;
  
  const [positions, setPositions] = useState<TradingPosition[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);
  
  const fetchPositions = useCallback(async () => {
    if (!isMountedRef.current) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        mode,
        marketType,
      });
      
      if (accountId) {
        params.append("accountId", accountId);
      }
      
      const response = await fetch(`/api/positions/trading?${params}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch positions");
      }
      
      const data = await response.json();
      
      if (isMountedRef.current) {
        setPositions(data.positions || []);
        setLastUpdated(new Date());
      }
    } catch (err) {
      if (isMountedRef.current) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [mode, marketType, accountId]);
  
  const closePosition = useCallback(async (positionId: string, quantity?: number): Promise<boolean> => {
    try {
      const response = await fetch("/api/trade/close", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          positionId,
          closeReason: "MANUAL",
          quantity,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to close position");
      }
      
      // Refetch positions after closing
      await fetchPositions();
      return true;
    } catch (err) {
      console.error("Failed to close position:", err);
      return false;
    }
  }, [fetchPositions]);
  
  const updatePosition = useCallback(async (
    positionId: string,
    updates: { stopLoss?: number; takeProfit?: number }
  ): Promise<boolean> => {
    try {
      const response = await fetch("/api/trading/unified/positions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          positionId,
          ...updates,
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update position");
      }
      
      // Refetch positions after update
      await fetchPositions();
      return true;
    } catch (err) {
      console.error("Failed to update position:", err);
      return false;
    }
  }, [fetchPositions]);
  
  // Initial fetch
  useEffect(() => {
    fetchPositions();
  }, [fetchPositions]);
  
  // Auto refresh with polling
  useEffect(() => {
    if (!autoRefresh) return;
    
    intervalRef.current = setInterval(fetchPositions, refreshInterval);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRefresh, refreshInterval, fetchPositions]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return {
    positions,
    isLoading,
    error,
    refetch: fetchPositions,
    lastUpdated,
    closePosition,
    updatePosition,
  };
}

/**
 * Calculate liquidation price
 */
export function calculateLiquidationPrice(
  entryPrice: number,
  leverage: number,
  direction: "LONG" | "SHORT",
  maintenanceMarginRate: number = 0.004
): number {
  const dir = direction === "LONG" ? 1 : -1;
  const liqPrice = entryPrice * (1 - dir / leverage + dir * maintenanceMarginRate);
  return Math.max(0, liqPrice);
}

/**
 * Calculate unrealized PnL
 */
export function calculateUnrealizedPnl(
  entryPrice: number,
  currentPrice: number,
  quantity: number,
  direction: "LONG" | "SHORT",
  leverage: number
): number {
  const dir = direction === "LONG" ? 1 : -1;
  return dir * (currentPrice - entryPrice) * quantity * leverage;
}

/**
 * Format PnL with color class
 */
export function getPnlColorClass(pnl: number): string {
  if (pnl > 0) return "text-[#0ECB81]";
  if (pnl < 0) return "text-[#F6465D]";
  return "text-muted-foreground";
}

/**
 * Format PnL percent
 */
export function formatPnlPercent(percent: number): string {
  const sign = percent >= 0 ? "+" : "";
  return `${sign}${percent.toFixed(2)}%`;
}
