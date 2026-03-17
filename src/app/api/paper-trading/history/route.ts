import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/paper-trading/history
 * Get paper trading history (trade journal)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountId");
    const symbol = searchParams.get("symbol");
    const direction = searchParams.get("direction");
    const result = searchParams.get("result"); // win, loss, breakeven
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");

    if (!accountId) {
      return NextResponse.json(
        { success: false, error: "Account ID is required" },
        { status: 400 }
      );
    }

    // Get the paper account
    const account = await db.account.findUnique({
      where: { id: accountId },
      include: { paperAccount: true },
    });

    if (!account || !account.paperAccount) {
      return NextResponse.json(
        { success: false, error: "Paper account not found" },
        { status: 404 }
      );
    }

    // Build where clause
    const where: Record<string, unknown> = {
      paperAccountId: account.paperAccount.id,
      status: "CLOSED",
    };

    if (symbol) where.symbol = symbol;
    if (direction) where.direction = direction;

    if (startDate || endDate) {
      const closedAt: Record<string, Date> = {};
      if (startDate) closedAt.gte = new Date(startDate);
      if (endDate) closedAt.lte = new Date(endDate);
      where.closedAt = closedAt;
    }

    // Get trades
    const trades = await db.paperPosition.findMany({
      where,
      orderBy: { closedAt: "desc" },
      take: limit,
      skip: offset,
      include: {
        orders: {
          where: { status: "FILLED" },
          orderBy: { filledAt: "asc" },
        },
      },
    });

    const total = await db.paperPosition.count({ where });

    // Filter by result if needed
    let filteredTrades = trades;
    if (result) {
      filteredTrades = trades.filter(t => {
        const pnl = t.realizedPnl || 0;
        if (result === "win") return pnl > 0;
        if (result === "loss") return pnl < 0;
        if (result === "breakeven") return pnl === 0;
        return true;
      });
    }

    // Calculate summary stats
    const stats = {
      totalTrades: total,
      totalPnL: 0,
      totalFees: 0,
      winningTrades: 0,
      losingTrades: 0,
      avgPnL: 0,
      avgWin: 0,
      avgLoss: 0,
      maxWin: 0,
      maxLoss: 0,
      bestTrade: null as { symbol: string; pnl: number } | null,
      worstTrade: null as { symbol: string; pnl: number } | null,
    };

    const allTrades = await db.paperPosition.findMany({
      where,
      select: {
        symbol: true,
        realizedPnl: true,
        totalFees: true,
      },
    });

    for (const trade of allTrades) {
      const pnl = trade.realizedPnl || 0;
      stats.totalPnL += pnl;
      stats.totalFees += trade.totalFees || 0;

      if (pnl > 0) {
        stats.winningTrades++;
        if (pnl > stats.maxWin) {
          stats.maxWin = pnl;
          stats.bestTrade = { symbol: trade.symbol, pnl };
        }
      } else if (pnl < 0) {
        stats.losingTrades++;
        if (pnl < stats.maxLoss) {
          stats.maxLoss = pnl;
          stats.worstTrade = { symbol: trade.symbol, pnl };
        }
      }
    }

    stats.avgPnL = total > 0 ? stats.totalPnL / total : 0;
    stats.avgWin = stats.winningTrades > 0 
      ? allTrades.filter(t => (t.realizedPnl || 0) > 0).reduce((s, t) => s + (t.realizedPnl || 0), 0) / stats.winningTrades
      : 0;
    stats.avgLoss = stats.losingTrades > 0
      ? Math.abs(allTrades.filter(t => (t.realizedPnl || 0) < 0).reduce((s, t) => s + (t.realizedPnl || 0), 0)) / stats.losingTrades
      : 0;

    return NextResponse.json({
      success: true,
      trades: filteredTrades.map(t => ({
        id: t.id,
        symbol: t.symbol,
        direction: t.direction,
        quantity: t.quantity,
        entryPrice: t.entryPrice,
        closePrice: t.closePrice,
        leverage: t.leverage,
        margin: t.margin,
        realizedPnl: t.realizedPnl,
        realizedPnlPercent: t.realizedPnlPercent,
        totalFees: t.totalFees,
        stopLoss: t.stopLoss,
        takeProfit: t.takeProfit,
        closeReason: t.closeReason,
        openedAt: t.openedAt,
        closedAt: t.closedAt,
        durationMinutes: t.openedAt && t.closedAt
          ? Math.floor((t.closedAt.getTime() - t.openedAt.getTime()) / 60000)
          : null,
        isWinner: (t.realizedPnl || 0) > 0,
        orders: t.orders.map(o => ({
          id: o.id,
          side: o.side,
          orderType: o.orderType,
          price: o.avgFillPrice,
          quantity: o.filledQty,
          fee: o.fee,
          filledAt: o.filledAt,
        })),
      })),
      stats,
      pagination: {
        total,
        limit,
        offset,
        hasMore: total > offset + limit,
      },
    });
  } catch (error) {
    console.error("[PaperTrading] Get history error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get trade history" },
      { status: 500 }
    );
  }
}
