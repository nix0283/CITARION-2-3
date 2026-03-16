"use client";

import { useState, useEffect, useCallback } from "react";

export type TradingMode = "LIVE" | "DEMO" | "PAPER";
export type MarketType = "futures" | "spot" | "inverse";

export interface TradingAccount {
  id: string;
  exchangeId: string;
  exchangeName: string;
  exchangeType: MarketType;
  accountType: "REAL" | "DEMO" | "PAPER";
  virtualBalance: string | null;
  isActive: boolean;
  isTestnet: boolean;
  hedgeMode: boolean;
  lastSyncAt: string | null;
  
  // Computed
  balance?: number;
  currency?: string;
}

interface UseAccountsOptions {
  mode: TradingMode;
  marketType: MarketType;
  autoFetch?: boolean;
}

interface UseAccountsReturn {
  accounts: TradingAccount[];
  selectedAccount: TradingAccount | null;
  setSelectedAccount: (account: TradingAccount | null) => void;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  hasMultipleAccounts: boolean;
  hasNoAccount: boolean;
}

/**
 * Hook to fetch and manage trading accounts based on mode and market type
 */
export function useAccounts(options: UseAccountsOptions): UseAccountsReturn {
  const { mode, marketType, autoFetch = true } = options;
  
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<TradingAccount | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchAccounts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `/api/account/by-type?mode=${mode}&marketType=${marketType}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch accounts");
      }
      
      const data = await response.json();
      const fetchedAccounts: TradingAccount[] = data.accounts || [];
      
      setAccounts(fetchedAccounts);
      
      // Auto-select account logic
      if (fetchedAccounts.length === 1) {
        // Auto-select single account
        setSelectedAccount(fetchedAccounts[0]);
      } else if (fetchedAccounts.length > 1) {
        // Select first account or keep existing selection if valid
        if (!selectedAccount || !fetchedAccounts.find(a => a.id === selectedAccount.id)) {
          setSelectedAccount(fetchedAccounts[0]);
        }
      } else {
        // No accounts
        setSelectedAccount(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      setAccounts([]);
      setSelectedAccount(null);
    } finally {
      setIsLoading(false);
    }
  }, [mode, marketType, selectedAccount]);
  
  useEffect(() => {
    if (autoFetch) {
      fetchAccounts();
    }
  }, [mode, marketType, autoFetch, fetchAccounts]);
  
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
 * Get exchange display name
 */
export function getExchangeDisplayName(exchangeId: string): string {
  const names: Record<string, string> = {
    binance: "Binance",
    bybit: "Bybit",
    okx: "OKX",
    bitget: "Bitget",
    bingx: "BingX",
  };
  return names[exchangeId] || exchangeId;
}

/**
 * Get exchange badge color
 */
export function getExchangeBadgeColor(exchangeId: string): string {
  const colors: Record<string, string> = {
    binance: "bg-[#F0B90B]/10 text-[#F0B90B] border-[#F0B90B]/30",
    bybit: "bg-[#F7A600]/10 text-[#F7A600] border-[#F7A600]/30",
    okx: "bg-[#000000]/10 text-white border-white/30",
    bitget: "bg-[#00D084]/10 text-[#00D084] border-[#00D084]/30",
    bingx: "bg-[#0066FF]/10 text-[#0066FF] border-[#0066FF]/30",
  };
  return colors[exchangeId] || "bg-gray-500/10 text-gray-400 border-gray-500/30";
}
