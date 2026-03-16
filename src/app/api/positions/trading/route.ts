/**
 * Trading Positions API
 * 
 * Fetches open positions for the trading page based on mode and market type
 * Supports real-time updates via polling
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { withAuth, AuthContext } from "@/lib/auth-utils";

type TradingMode = "LIVE" | "DEMO" | "PAPER";
type MarketType = "futures" | "spot" | "inverse";

interface TradingPosition {
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
  
  // Account info
  accountId: string;
  exchangeId: string;
  exchangeName: string;
  isDemo: boolean;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

async function handleGet(request: NextRequest, context: AuthContext) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode") as TradingMode | null;
    const marketType = searchParams.get("marketType") as MarketType | null;
    const accountId = searchParams.get("accountId");
    
    if (!mode) {
      return NextResponse.json(
        { error: "Missing required parameter: mode" },
        { status: 400 }
      );
    }
    
    // Build position query
    const whereClause: {
      status: string;
      account?: {
        userId: string;
        exchangeType?: MarketType;
        id?: string;
        accountType?: string;
        isTestnet?: boolean;
      };
      isDemo?: boolean;
    } = {
      status: "OPEN",
    };
    
    // Filter by mode
    switch (mode) {
      case "LIVE":
        whereClause.isDemo = false;
        whereClause.account = {
          userId: context.userId,
          isTestnet: false,
          accountType: "REAL",
        };
        break;
      case "DEMO":
        whereClause.isDemo = true;
        whereClause.account = {
          userId: context.userId,
          accountType: "DEMO",
        };
        break;
      case "PAPER":
        // Paper trading positions are stored with a special marker
        whereClause.isDemo = true;
        whereClause.account = {
          userId: context.userId,
        };
        break;
    }
    
    // Filter by market type
    if (marketType && whereClause.account) {
      whereClause.account.exchangeType = marketType;
    }
    
    // Filter by specific account
    if (accountId && whereClause.account) {
      whereClause.account.id = accountId;
    }
    
    // Fetch positions
    const positions = await db.position.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        account: {
          select: {
            exchangeId: true,
            exchangeName: true,
            exchangeType: true,
            accountType: true,
            isTestnet: true,
          },
        },
      },
    });
    
    // Transform positions
    const tradingPositions: TradingPosition[] = positions.map((pos) => ({
      id: pos.id,
      symbol: pos.symbol,
      direction: pos.direction as "LONG" | "SHORT",
      status: pos.status,
      totalAmount: pos.totalAmount,
      filledAmount: pos.filledAmount,
      avgEntryPrice: pos.avgEntryPrice,
      currentPrice: pos.currentPrice,
      leverage: pos.leverage,
      stopLoss: pos.stopLoss,
      takeProfit: pos.takeProfit,
      trailingStop: pos.trailingStop,
      trailingActivated: pos.trailingActivated,
      unrealizedPnl: pos.unrealizedPnl,
      realizedPnl: pos.realizedPnl,
      accountId: pos.accountId,
      exchangeId: pos.account?.exchangeId || "unknown",
      exchangeName: pos.account?.exchangeName || "Unknown",
      isDemo: pos.isDemo,
      createdAt: pos.createdAt.toISOString(),
      updatedAt: pos.updatedAt.toISOString(),
    }));
    
    return NextResponse.json({
      positions: tradingPositions,
      count: tradingPositions.length,
    });
  } catch (error) {
    console.error("Failed to fetch trading positions:", error);
    return NextResponse.json(
      { error: "Failed to fetch positions" },
      { status: 500 }
    );
  }
}

export const GET = withAuth(handleGet);
