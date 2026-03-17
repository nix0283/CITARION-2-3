"use client";

/**
 * Hook for Unified Trading Engine API
 * Used by Trading UI terminal
 */

import { useState, useEffect, useCallback, useRef } from "react";

// Types
export type TradingMode = "LIVE" | "DEMO" | "PAPER";
export type MarketType = "FUTURES" | "SPOT";
export type Direction = "LONG" | "SHORT";
export type OrderType = "MARKET" | "LIMIT" | "STOP_LIMIT";

export interface TradingAccount {
  id: string;
  exchangeId: string;
  exchangeName: string;
  accountType: "LIVE" | "DEMO" | "PAPER";
  balance: number;
  currency: string;
}

export interface Position {
  id: string;
  accountId: string;
  symbol: string;
  direction: Direction;
  status: string;
  totalAmount: number;
  filledAmount: number;
  avgEntryPrice: number;
  currentPrice: number | null;
  leverage: number;
  marginMode: "isolated" | "cross";
  stopLoss: number | null;
  takeProfit: number | null;
  unrealizedPnl: number;
  realizedPnl: number;
  trailingStop: any;
  trailingActivated: boolean;
  openedAt: Date;
  isDemo: boolean;
}

export interface OpenPositionParams {
  symbol: string;
  direction: Direction;
  amount: number;
  leverage?: number;
  orderType?: OrderType;
  entryPrice?: number;
  triggerPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  trailingStop?: any;
}

export interface OpenPositionResult {
  success: boolean;
  tradeId?: string;
  positionId?: string;
  symbol?: string;
  direction?: Direction;
  quantity?: number;
  entryPrice?: number;
  error?: string;
  errorCode?: string;
}

// Exchange display names and colors
export const EXCHANGE_DISPLAY_NAMES: Record<string, string> = {
  binance: "Binance",
  bybit: "Bybit",
  okx: "OKX",
  bitget: "Bitget",
  bingx: "BingX",
  kucoin: "KuCoin",
  gate: "Gate.io",
  mexc: "MEXC",
  huobi: "Huobi",
  coinbase: "Coinbase",
  hyperliquid: "Hyperliquid",
  bitmex: "BitMEX",
  blofin: "Blofin",
  aster: "Aster",
};

export const EXCHANGE_BADGE_COLORS: Record<string, string> = {
  binance: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  bybit: "bg-orange-500/10 text-orange-600 border-orange-500/30",
  okx: "bg-slate-500/10 text-slate-600 border-slate-500/30",
  bitget: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  bingx: "bg-cyan-500/10 text-cyan-600 border-cyan-500/30",
  kucoin: "bg-green-500/10 text-green-600 border-green-500/30",
  gate: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  mexc: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  huobi: "bg-sky-500/10 text-sky-600 border-sky-500/30",
  coinbase: "bg-indigo-500/10 text-indigo-600 border-indigo-500/30",
  hyperliquid: "bg-rose-500/10 text-rose-600 border-rose-500/30",
  bitmex: "bg-red-500/10 text-red-600 border-red-500/30",
  blofin: "bg-violet-500/10 text-violet-600 border-violet-500/30",
  aster: "bg-amber-500/10 text-amber-600 border-amber-500/30",
};

export function getExchangeDisplayName(exchangeId: string): string {
  return EXCHANGE_DISPLAY_NAMES[exchangeId] || exchangeId.toUpperCase();
}

export function getExchangeBadgeColor(exchangeId: string): string {
  return EXCHANGE_BADGE_COLORS[exchangeId] || "bg-gray-500/10 text-gray-600 border-gray-500/30";
}

/**
 * Fetch accounts for a specific mode
 */
export function useTradingAccounts(mode: TradingMode, marketType: MarketType) {
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<TradingAccount | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `/api/account/by-type?mode=${mode}&marketType=${marketType.toLowerCase()}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch accounts");
      }
      
      const data = await response.json();
      
      // Map API response to TradingAccount format
      const fetchedAccounts: TradingAccount[] = (data.accounts || []).map((acc: any) => ({
        id: acc.id,
        exchangeId: acc.exchangeId,
        exchangeName: acc.exchangeName || acc.exchangeId,
        accountType: acc.accountType === "REAL" ? "LIVE" : acc.accountType,
        balance: acc.balance || 0,
        currency: acc.currency || "USDT",
      }));
      
      setAccounts(fetchedAccounts);
      
      // Auto-select first account if only one exists
      if (fetchedAccounts.length === 1 && !selectedAccount) {
        setSelectedAccount(fetchedAccounts[0]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [mode, marketType, selectedAccount]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  // Clear selected account when mode/marketType changes
  useEffect(() => {
    setSelectedAccount(null);
  }, [mode, marketType]);

  return {
    accounts,
    selectedAccount,
    setSelectedAccount,
    isLoading,
    error,
    refetch: fetchAccounts,
    hasMultipleAccounts: accounts.length > 1,
    hasNoAccount: accounts.length === 0,
  };
}

/**
 * Fetch and manage positions using Unified Trading Engine
 */
export function useUnifiedPositions(
  mode: TradingMode,
  accountId?: string | null,
  options?: { autoRefresh?: boolean; refreshInterval?: number }
) {
  const { autoRefresh = true, refreshInterval = 5000 } = options || {};
  
  const [positions, setPositions] = useState<Position[]>([]);
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
      const params = new URLSearchParams();
      params.append("mode", mode);
      if (accountId) {
        params.append("accountId", accountId);
      }
      
      const response = await fetch(`/api/trading/unified/positions?${params}`);
      
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
  }, [mode, accountId]);

  const closePosition = useCallback(async (positionId: string, reason: string = "MANUAL"): Promise<boolean> => {
    try {
      const response = await fetch("/api/trading/unified/close", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          positionId,
          reason,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to close position");
      }
      
      await fetchPositions();
      return true;
    } catch (err) {
      console.error("Failed to close position:", err);
      return false;
    }
  }, [fetchPositions]);

  const updatePosition = useCallback(async (
    positionId: string,
    updates: { stopLoss?: number; takeProfit?: number; trailingStop?: any }
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

  // Cleanup
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
 * Open position using Unified Trading Engine
 */
export async function openUnifiedPosition(
  params: OpenPositionParams,
  config: {
    mode: TradingMode;
    accountId: string;
    exchangeId: string;
    marketType: MarketType;
  }
): Promise<OpenPositionResult> {
  try {
    const response = await fetch("/api/trading/unified", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        signal: {
          symbol: params.symbol,
          direction: params.direction,
          entryPrices: params.entryPrice ? [params.entryPrice] : [],
          leverage: params.leverage || 10,
          marginMode: "isolated" as const,
          marketType: config.marketType,
          stopLoss: params.stopLoss,
          takeProfits: params.takeProfit ? [{ price: params.takeProfit, percentage: 100 }] : [],
          trailingConfig: params.trailingStop,
        },
        config: {
          mode: config.mode,
          exchangeId: config.exchangeId,
          marketType: config.marketType,
          accountId: config.accountId,
          defaultLeverage: params.leverage || 10,
          defaultAmountPercent: 2, // Default 2% of balance
        },
        source: "MANUAL",
        entryOrderType: params.orderType || "MARKET",
        triggerPrice: params.triggerPrice,
      }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      errorCode: "NETWORK_ERROR",
    };
  }
}
