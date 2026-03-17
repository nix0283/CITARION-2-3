/**
 * Account by Type API
 * 
 * Fetches accounts filtered by trading mode and market type
 * Used by the Trading page to determine account selection
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { withAuth, AuthContext, getDefaultUser } from "@/lib/auth-utils";

type TradingMode = "LIVE" | "DEMO" | "PAPER";
type MarketType = "futures" | "spot" | "inverse";

interface AccountResponse {
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
  
  // Computed balance
  balance?: number;
  currency?: string;
}

async function handleGet(request: NextRequest, context: AuthContext) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode") as TradingMode | null;
    const marketType = searchParams.get("marketType") as MarketType | null;
    
    if (!mode || !marketType) {
      return NextResponse.json(
        { error: "Missing required parameters: mode, marketType" },
        { status: 400 }
      );
    }
    
    // Use authenticated user or fallback to default
    const userId = context?.userId || (await getDefaultUser()).id;
    
    // Map mode to account type
    let accountType: "REAL" | "DEMO" | undefined;
    let isTestnet: boolean | undefined;
    
    switch (mode) {
      case "LIVE":
        accountType = "REAL";
        isTestnet = false;
        break;
      case "DEMO":
        accountType = "DEMO";
        isTestnet = false;
        break;
      case "PAPER":
        // PAPER accounts are stored as DEMO with special marker
        accountType = "DEMO";
        break;
    }
    
    // Build query
    const whereClause: {
      userId: string;
      exchangeType: MarketType;
      accountType?: "REAL" | "DEMO";
      isTestnet?: boolean;
      isActive: boolean;
    } = {
      userId,
      exchangeType: marketType,
      isActive: true,
    };
    
    if (accountType) {
      whereClause.accountType = accountType;
    }
    
    if (isTestnet !== undefined) {
      whereClause.isTestnet = isTestnet;
    }
    
    // For PAPER mode, we look for paper trading accounts
    // These are stored in the PaperAccount table (linked to Account)
    // Note: PAPER accounts have exchangeType with "-paper-" suffix (e.g., "futures-paper-xyz123")
    if (mode === "PAPER") {
      // Get PAPER accounts from PaperAccount table
      // We search by exchangeType starting with the marketType (e.g., "futures-paper-*" for futures)
      const paperAccounts = await db.paperAccount.findMany({
        where: {
          account: {
            userId,
            exchangeType: { startsWith: marketType },
          },
        },
        include: {
          account: true,
        },
      });
      
      const accounts: AccountResponse[] = paperAccounts.map((pa) => {
        // Parse balance from currentBalances JSON
        let balance = pa.initialBalanceAmount || 10000;
        let currency = pa.initialBalanceCurrency || "USDT";
        
        if (pa.currentBalances) {
          try {
            const balances = JSON.parse(pa.currentBalances);
            const currencies = Object.keys(balances);
            if (currencies.length > 0) {
              currency = pa.initialBalanceCurrency || currencies[0];
              balance = balances[currency] || pa.initialBalanceAmount || 10000;
            }
          } catch {
            // Use defaults if parsing fails
          }
        }
        
        return {
          id: pa.accountId, // Use the actual account ID for trading operations
          exchangeId: pa.account?.exchangeId || "binance",
          exchangeName: pa.account?.exchangeName || pa.account?.exchangeId || "Binance",
          exchangeType: marketType,
          accountType: "PAPER",
          virtualBalance: pa.currentBalances,
          isActive: true,
          isTestnet: false,
          hedgeMode: pa.hedgeMode || false,
          lastSyncAt: null,
          balance,
          currency,
        };
      });
      
      return NextResponse.json({ accounts });
    }
    
    // For LIVE and DEMO modes, fetch from Account table
    const dbAccounts = await db.account.findMany({
      where: whereClause,
      orderBy: { createdAt: "asc" },
    });
    
    const accounts: AccountResponse[] = dbAccounts.map((acc) => {
      // Parse balance from virtualBalance JSON
      let balance = 0;
      let currency = "USDT";
      
      if (acc.virtualBalance) {
        try {
          const balances = JSON.parse(acc.virtualBalance);
          const currencies = Object.keys(balances);
          if (currencies.length > 0) {
            currency = currencies[0];
            balance = balances[currency] || 0;
          }
        } catch {
          // Ignore parse errors
        }
      }
      
      return {
        id: acc.id,
        exchangeId: acc.exchangeId,
        exchangeName: acc.exchangeName,
        exchangeType: acc.exchangeType as MarketType,
        accountType: acc.accountType as "REAL" | "DEMO",
        virtualBalance: acc.virtualBalance,
        isActive: acc.isActive,
        isTestnet: acc.isTestnet,
        hedgeMode: acc.hedgeMode,
        lastSyncAt: acc.lastSyncAt?.toISOString() || null,
        balance,
        currency,
      };
    });
    
    return NextResponse.json({ accounts });
  } catch (error) {
    console.error("Failed to fetch accounts by type:", error);
    return NextResponse.json(
      { error: "Failed to fetch accounts" },
      { status: 500 }
    );
  }
}

// Export without auth for demo mode compatibility
export async function GET(request: NextRequest) {
  // Fallback to default user for demo mode
  const defaultUser = await getDefaultUser();
  return handleGet(request, {
    userId: defaultUser.id,
    authType: "session",
  });
}
