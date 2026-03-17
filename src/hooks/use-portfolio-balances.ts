/**
 * usePortfolioBalances Hook
 * 
 * Production-ready React hook for fetching and managing portfolio balances
 * from multiple exchanges with real-time updates and caching.
 * 
 * Features:
 * - Automatic data fetching on mount
 * - Configurable refresh intervals
 * - Manual refresh capability
 * - Optimistic caching
 * - Error handling with retry
 * - TypeScript type safety
 * 
 * @author CITARION Team
 * @version 1.0.0
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ==================== TYPES ====================

export interface AssetBalance {
  symbol: string;
  name: string;
  total: number;
  available: number;
  inOrder: number;
  inPosition: number;
  priceUSDT: number;
  valueUSDT: number;
  change24h: number;
  isDemo?: boolean;
}

export interface ExchangeBalance {
  exchange: string;
  exchangeName: string;
  accountType: "DEMO" | "REAL";
  marketType: "spot" | "futures";
  isTestnet: boolean;
  totalBalanceUSDT: number;
  availableUSDT: number;
  inOrderUSDT: number;
  inPositionUSDT: number;
  unrealizedPnl: number;
  todayPnl: number;
  todayPnlPercent: number;
  assets: AssetBalance[];
  lastSync: Date;
  apiStatus: "connected" | "error" | "rate_limited" | "readonly";
  error?: string;
}

export interface PortfolioSummary {
  totalBalanceUSDT: number;
  totalAvailableUSDT: number;
  totalInPosition: number;
  totalUnrealizedPnl: number;
  connectedExchanges: number;
  errorExchanges: number;
  totalExchanges: number;
}

export interface PortfolioBalancesResponse {
  success: boolean;
  balances: ExchangeBalance[];
  summary: PortfolioSummary;
  cached?: boolean;
  timestamp: string;
  error?: string;
}

export interface UsePortfolioBalancesOptions {
  /** Auto-fetch on mount (default: true) */
  enabled?: boolean;
  /** Refresh interval in milliseconds (default: 60000 = 1 minute) */
  refreshInterval?: number;
  /** Filter by specific exchanges */
  exchanges?: string[];
  /** Filter by account type */
  accountType?: "DEMO" | "REAL";
  /** Callback when balances are updated */
  onUpdate?: (data: PortfolioBalancesResponse) => void;
  /** Callback on error */
  onError?: (error: Error) => void;
}

export interface UsePortfolioBalancesReturn {
  /** Portfolio balances by exchange */
  balances: ExchangeBalance[];
  /** Aggregated portfolio summary */
  summary: PortfolioSummary | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Is data from cache */
  isCached: boolean;
  /** Last update timestamp */
  lastUpdated: Date | null;
  /** Manual refresh function */
  refresh: () => Promise<void>;
  /** Force refresh (bypass cache) */
  forceRefresh: () => Promise<void>;
  /** Refresh specific exchanges */
  refreshExchanges: (exchanges: string[]) => Promise<void>;
  /** Is currently refreshing */
  isRefreshing: boolean;
  /** Connected exchanges count */
  connectedCount: number;
  /** Error exchanges count */
  errorCount: number;
  /** Total balance in USDT */
  totalBalance: number;
  /** Total unrealized PnL */
  totalPnL: number;
  /** Get balance for specific exchange */
  getExchangeBalance: (exchange: string) => ExchangeBalance | undefined;
  /** Get all assets across exchanges */
  getAllAssets: () => AssetBalance[];
  /** Get aggregated asset holdings */
  getAggregatedAssets: () => Map<string, { total: number; valueUSDT: number }>;
}

// ==================== CONSTANTS ====================

const QUERY_KEY = "portfolio-balances";
const DEFAULT_REFRESH_INTERVAL = 60_000; // 1 minute
const STALE_TIME = 30_000; // 30 seconds

// ==================== HELPER FUNCTIONS ====================

async function fetchBalances(
  force: boolean = false,
  exchanges?: string[],
  accountType?: "DEMO" | "REAL"
): Promise<PortfolioBalancesResponse> {
  const params = new URLSearchParams();
  if (force) params.set("force", "true");
  if (exchanges?.length) params.set("exchanges", exchanges.join(","));
  if (accountType) params.set("accountType", accountType);
  
  const url = `/api/portfolio/balances${params.toString() ? `?${params}` : ""}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch balances: ${response.status}`);
  }
  
  return response.json();
}

async function refreshBalances(exchanges?: string[]): Promise<PortfolioBalancesResponse> {
  const response = await fetch("/api/portfolio/balances", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ exchanges }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to refresh balances: ${response.status}`);
  }
  
  return response.json();
}

// ==================== MAIN HOOK ====================

export function usePortfolioBalances(
  options: UsePortfolioBalancesOptions = {}
): UsePortfolioBalancesReturn {
  const {
    enabled = true,
    refreshInterval = DEFAULT_REFRESH_INTERVAL,
    exchanges,
    accountType,
    onUpdate,
    onError,
  } = options;
  
  const queryClient = useQueryClient();
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Query for fetching balances
  const {
    data,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEY, { exchanges, accountType }],
    queryFn: () => fetchBalances(false, exchanges, accountType),
    enabled,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
  
  // Mutation for force refresh
  const refreshMutation = useMutation({
    mutationFn: (force: boolean) => fetchBalances(force, exchanges, accountType),
    onSuccess: (newData) => {
      queryClient.setQueryData([QUERY_KEY, { exchanges, accountType }], newData);
      onUpdate?.(newData);
    },
    onError: (err: Error) => {
      onError?.(err);
    },
  });
  
  // Mutation for refreshing specific exchanges
  const refreshExchangesMutation = useMutation({
    mutationFn: (exchangeList: string[]) => refreshBalances(exchangeList),
    onSuccess: (newData) => {
      queryClient.setQueryData([QUERY_KEY, { exchanges, accountType }], newData);
      onUpdate?.(newData);
    },
    onError: (err: Error) => {
      onError?.(err);
    },
  });
  
  // Auto-refresh interval
  useEffect(() => {
    if (!enabled || refreshInterval <= 0) return;
    
    refreshIntervalRef.current = setInterval(() => {
      refetch();
    }, refreshInterval);
    
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [enabled, refreshInterval, refetch]);
  
  // Callbacks
  const refresh = useCallback(async () => {
    await refetch();
  }, [refetch]);
  
  const forceRefresh = useCallback(async () => {
    await refreshMutation.mutateAsync(true);
  }, [refreshMutation]);
  
  const refreshExchangesCallback = useCallback(async (exchangeList: string[]) => {
    await refreshExchangesMutation.mutateAsync(exchangeList);
  }, [refreshExchangesMutation]);
  
  // Computed values
  const balances = data?.balances ?? [];
  const summary = data?.summary ?? null;
  const isCached = data?.cached ?? false;
  const lastUpdated = data?.timestamp ? new Date(data.timestamp) : null;
  const connectedCount = summary?.connectedExchanges ?? 0;
  const errorCount = summary?.errorExchanges ?? 0;
  const totalBalance = summary?.totalBalanceUSDT ?? 0;
  const totalPnL = summary?.totalUnrealizedPnl ?? 0;
  
  // Helper functions
  const getExchangeBalance = useCallback(
    (exchange: string): ExchangeBalance | undefined => {
      return balances.find((b) => b.exchange === exchange);
    },
    [balances]
  );
  
  const getAllAssets = useCallback((): AssetBalance[] => {
    return balances.flatMap((b) => b.assets);
  }, [balances]);
  
  const getAggregatedAssets = useCallback((): Map<string, { total: number; valueUSDT: number }> => {
    const aggregated = new Map<string, { total: number; valueUSDT: number }>();
    
    for (const balance of balances) {
      for (const asset of balance.assets) {
        const existing = aggregated.get(asset.symbol);
        if (existing) {
          existing.total += asset.total;
          existing.valueUSDT += asset.valueUSDT;
        } else {
          aggregated.set(asset.symbol, {
            total: asset.total,
            valueUSDT: asset.valueUSDT,
          });
        }
      }
    }
    
    return aggregated;
  }, [balances]);
  
  return {
    balances,
    summary,
    isLoading,
    error: error as Error | null,
    isCached,
    lastUpdated,
    refresh,
    forceRefresh,
    refreshExchanges: refreshExchangesCallback,
    isRefreshing: isFetching || refreshMutation.isPending || refreshExchangesMutation.isPending,
    connectedCount,
    errorCount,
    totalBalance,
    totalPnL,
    getExchangeBalance,
    getAllAssets,
    getAggregatedAssets,
  };
}

// ==================== SPECIALIZED HOOKS ====================

/**
 * Hook for single exchange balance
 */
export function useExchangeBalance(
  exchange: string,
  options?: Omit<UsePortfolioBalancesOptions, "exchanges">
): {
  balance: ExchangeBalance | undefined;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
} {
  const { balances, isLoading, error, refresh } = usePortfolioBalances({
    ...options,
    exchanges: [exchange],
  });
  
  return {
    balance: balances.find((b) => b.exchange === exchange),
    isLoading,
    error,
    refresh,
  };
}

/**
 * Hook for aggregated portfolio metrics
 */
export function usePortfolioMetrics(): {
  totalBalance: number;
  totalPnL: number;
  totalAssets: number;
  winRate: number;
  isLoading: boolean;
} {
  const { summary, getAllAssets, isLoading } = usePortfolioBalances();
  
  const assets = getAllAssets();
  
  return {
    totalBalance: summary?.totalBalanceUSDT ?? 0,
    totalPnL: summary?.totalUnrealizedPnl ?? 0,
    totalAssets: assets.length,
    winRate: 0, // Would need trade history
    isLoading,
  };
}

/**
 * Hook for demo vs real balance comparison
 */
export function useBalanceComparison(): {
  demoBalance: number;
  realBalance: number;
  totalBalance: number;
  demoPercent: number;
  isLoading: boolean;
} {
  const { balances, isLoading } = usePortfolioBalances();
  
  const demoBalance = balances
    .filter((b) => b.accountType === "DEMO")
    .reduce((sum, b) => sum + b.totalBalanceUSDT, 0);
  
  const realBalance = balances
    .filter((b) => b.accountType === "REAL")
    .reduce((sum, b) => sum + b.totalBalanceUSDT, 0);
  
  const totalBalance = demoBalance + realBalance;
  
  return {
    demoBalance,
    realBalance,
    totalBalance,
    demoPercent: totalBalance > 0 ? (demoBalance / totalBalance) * 100 : 0,
    isLoading,
  };
}

// ==================== EXPORT DEFAULT ====================

export default usePortfolioBalances;
