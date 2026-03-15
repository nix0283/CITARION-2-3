import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/paper-trading/analytics
 * Get paper trading performance analytics
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountId");
    const period = searchParams.get("period") || "all"; // day, week, month, all

    if (!accountId) {
      return NextResponse.json(
        { success: false, error: "Account ID is required" },
        { status: 400 }
      );
    }

    // Get the paper account
    const account = await db.account.findUnique({
      where: { id: accountId },
      include: { 
        paperAccount: {
          include: {
            paperPositions: {
              where: { status: "CLOSED" },
              orderBy: { closedAt: "desc" },
              take: 200,
            },
            balanceHistory: {
              orderBy: { timestamp: "desc" },
              take: 500,
            },
          },
        },
      },
    });

    if (!account || !account.paperAccount) {
      return NextResponse.json(
        { success: false, error: "Paper account not found" },
        { status: 404 }
      );
    }

    const paperAccount = account.paperAccount;

    // Filter by period
    const now = new Date();
    let startDate: Date | null = null;
    
    switch (period) {
      case "day":
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
    }

    // Filter trades by period
    const trades = startDate
      ? paperAccount.paperPositions.filter(t => t.closedAt && t.closedAt >= startDate)
      : paperAccount.paperPositions;

    // Calculate metrics
    const wins = trades.filter(t => (t.realizedPnl || 0) > 0);
    const losses = trades.filter(t => (t.realizedPnl || 0) <= 0);
    const breakevens = trades.filter(t => (t.realizedPnl || 0) === 0);

    const totalPnL = trades.reduce((sum, t) => sum + (t.realizedPnl || 0), 0);
    const totalFees = trades.reduce((sum, t) => sum + (t.totalFees || 0), 0);
    const avgPnL = trades.length > 0 ? totalPnL / trades.length : 0;
    const avgWin = wins.length > 0 
      ? wins.reduce((sum, t) => sum + (t.realizedPnl || 0), 0) / wins.length 
      : 0;
    const avgLoss = losses.length > 0 
      ? Math.abs(losses.reduce((sum, t) => sum + (t.realizedPnl || 0), 0) / losses.length) 
      : 0;

    const grossProfit = wins.reduce((sum, t) => sum + (t.realizedPnl || 0), 0);
    const grossLoss = Math.abs(losses.reduce((sum, t) => sum + (t.realizedPnl || 0), 0));
    const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? Infinity : 0;
    const winRate = trades.length > 0 ? (wins.length / trades.length) * 100 : 0;
    const riskRewardRatio = avgLoss > 0 ? avgWin / avgLoss : avgWin > 0 ? Infinity : 0;

    // Calculate streaks
    let maxWinStreak = 0;
    let maxLossStreak = 0;
    let currentStreak = 0;
    let currentType: "WIN" | "LOSS" | "NONE" = "NONE";

    const sortedTrades = [...trades].sort((a, b) => 
      (a.closedAt?.getTime() || 0) - (b.closedAt?.getTime() || 0)
    );

    for (const trade of sortedTrades) {
      const isWin = (trade.realizedPnl || 0) > 0;
      if (isWin) {
        if (currentType === "WIN") {
          currentStreak++;
        } else {
          currentType = "WIN";
          currentStreak = 1;
        }
        maxWinStreak = Math.max(maxWinStreak, currentStreak);
      } else {
        if (currentType === "LOSS") {
          currentStreak++;
        } else {
          currentType = "LOSS";
          currentStreak = 1;
        }
        maxLossStreak = Math.max(maxLossStreak, currentStreak);
      }
    }

    // Calculate average durations
    const durations = trades
      .filter(t => t.openedAt && t.closedAt)
      .map(t => (t.closedAt!.getTime() - t.openedAt.getTime()) / 60000);
    
    const avgDuration = durations.length > 0
      ? durations.reduce((a, b) => a + b, 0) / durations.length
      : 0;

    const winDurations = trades
      .filter(t => (t.realizedPnl || 0) > 0 && t.openedAt && t.closedAt)
      .map(t => (t.closedAt!.getTime() - t.openedAt.getTime()) / 60000);
    
    const avgWinDuration = winDurations.length > 0
      ? winDurations.reduce((a, b) => a + b, 0) / winDurations.length
      : 0;

    const lossDurations = trades
      .filter(t => (t.realizedPnl || 0) <= 0 && t.openedAt && t.closedAt)
      .map(t => (t.closedAt!.getTime() - t.openedAt.getTime()) / 60000);
    
    const avgLossDuration = lossDurations.length > 0
      ? lossDurations.reduce((a, b) => a + b, 0) / lossDurations.length
      : 0;

    // Calculate Sharpe-like ratio from balance history
    const balanceHistory = paperAccount.balanceHistory;
    const returns: number[] = [];
    
    for (let i = 1; i < balanceHistory.length; i++) {
      const prev = balanceHistory[i - 1];
      const curr = balanceHistory[i];
      
      const prevEquity = prev.equityUsd || 
        Object.values(JSON.parse(prev.balances || "{}")).reduce((a: number, b) => a + (b as number), 0);
      const currEquity = curr.equityUsd ||
        Object.values(JSON.parse(curr.balances || "{}")).reduce((a: number, b) => a + (b as number), 0);
      
      if (prevEquity > 0) {
        returns.push((currEquity - prevEquity) / prevEquity);
      }
    }

    const avgReturn = returns.length > 0
      ? returns.reduce((a, b) => a + b, 0) / returns.length
      : 0;
    const stdReturn = returns.length > 1
      ? Math.sqrt(returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / (returns.length - 1))
      : 0;
    const sharpeRatio = stdReturn > 0 ? (avgReturn / stdReturn) * Math.sqrt(365) : 0;

    // Build equity curve
    const equityCurve = balanceHistory.slice(0, 100).map(h => ({
      timestamp: h.timestamp,
      equity: h.equityUsd || Object.values(JSON.parse(h.balances || "{}")).reduce((a: number, b) => a + (b as number), 0),
      realizedPnl: h.realizedPnl || 0,
      dailyPnL: h.dailyPnL || 0,
    }));

    // Symbol breakdown
    const symbolStats: Record<string, { trades: number; wins: number; pnl: number }> = {};
    for (const trade of trades) {
      if (!symbolStats[trade.symbol]) {
        symbolStats[trade.symbol] = { trades: 0, wins: 0, pnl: 0 };
      }
      symbolStats[trade.symbol].trades++;
      if ((trade.realizedPnl || 0) > 0) symbolStats[trade.symbol].wins++;
      symbolStats[trade.symbol].pnl += trade.realizedPnl || 0;
    }

    const symbolBreakdown = Object.entries(symbolStats)
      .map(([symbol, stats]) => ({
        symbol,
        trades: stats.trades,
        wins: stats.wins,
        winRate: (stats.wins / stats.trades) * 100,
        pnl: stats.pnl,
        avgPnl: stats.pnl / stats.trades,
      }))
      .sort((a, b) => b.pnl - a.pnl);

    // Direction breakdown
    const longTrades = trades.filter(t => t.direction === "LONG");
    const shortTrades = trades.filter(t => t.direction === "SHORT");

    return NextResponse.json({
      success: true,
      analytics: {
        // Basic stats
        totalTrades: trades.length,
        winningTrades: wins.length,
        losingTrades: losses.length,
        breakevenTrades: breakevens.length,
        winRate,
        
        // PnL
        totalPnL,
        totalFees,
        netPnL: totalPnL - totalFees,
        avgPnL,
        avgWin,
        avgLoss,
        maxWin: wins.length > 0 ? Math.max(...wins.map(t => t.realizedPnl || 0)) : 0,
        maxLoss: losses.length > 0 ? Math.min(...losses.map(t => t.realizedPnl || 0)) : 0,
        
        // Ratios
        profitFactor,
        riskRewardRatio,
        sharpeRatio,
        
        // Drawdown
        maxDrawdown: paperAccount.maxDrawdown,
        maxDrawdownPercent: paperAccount.peakBalance > 0
          ? (paperAccount.maxDrawdown / paperAccount.peakBalance) * 100
          : 0,
        
        // Streaks
        maxWinStreak,
        maxLossStreak,
        currentStreak: currentStreak > 0 
          ? { type: currentType, count: currentStreak }
          : { type: "NONE" as const, count: 0 },
        
        // Time
        avgDurationMinutes: avgDuration,
        avgWinDurationMinutes: avgWinDuration,
        avgLossDurationMinutes: avgLossDuration,
        
        // Direction breakdown
        longStats: {
          trades: longTrades.length,
          wins: longTrades.filter(t => (t.realizedPnl || 0) > 0).length,
          pnl: longTrades.reduce((sum, t) => sum + (t.realizedPnl || 0), 0),
        },
        shortStats: {
          trades: shortTrades.length,
          wins: shortTrades.filter(t => (t.realizedPnl || 0) > 0).length,
          pnl: shortTrades.reduce((sum, t) => sum + (t.realizedPnl || 0), 0),
        },
        
        // Symbol breakdown
        symbolBreakdown,
        
        // Equity curve
        equityCurve,
        
        // Recent trades
        recentTrades: trades.slice(0, 20).map(t => ({
          id: t.id,
          symbol: t.symbol,
          direction: t.direction,
          entryPrice: t.entryPrice,
          closePrice: t.closePrice,
          quantity: t.quantity,
          leverage: t.leverage,
          realizedPnl: t.realizedPnl,
          realizedPnlPercent: t.realizedPnlPercent,
          closeReason: t.closeReason,
          openedAt: t.openedAt,
          closedAt: t.closedAt,
          durationMinutes: t.openedAt && t.closedAt
            ? Math.floor((t.closedAt.getTime() - t.openedAt.getTime()) / 60000)
            : null,
        })),
        
        // Account info
        account: {
          initialBalance: paperAccount.initialBalanceAmount,
          initialCurrency: paperAccount.initialBalanceCurrency,
          peakBalance: paperAccount.peakBalance,
          currentBalance: JSON.parse(paperAccount.currentBalances || "{}"),
        },
      },
    });
  } catch (error) {
    console.error("[PaperTrading] Get analytics error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get analytics" },
      { status: 500 }
    );
  }
}
