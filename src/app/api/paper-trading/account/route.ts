import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/paper-trading/account
 * Get paper trading account details
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountId");

    if (!accountId) {
      return NextResponse.json(
        { success: false, error: "Account ID is required" },
        { status: 400 }
      );
    }

    // Get the Account first to find the PaperAccount
    const account = await db.account.findUnique({
      where: { id: accountId },
      include: { 
        paperAccount: {
          include: {
            paperPositions: {
              where: { status: "OPEN" },
              orderBy: { openedAt: "desc" },
            },
            paperOrders: {
              where: { status: { in: ["PENDING", "NEW"] } },
              orderBy: { createdAt: "desc" },
              take: 20,
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
    const balances = JSON.parse(paperAccount.currentBalances || "{}");
    
    // Calculate total equity
    let totalEquity = 0;
    for (const [, amount] of Object.entries(balances)) {
      totalEquity += amount as number;
    }
    
    // Add unrealized PnL from open positions
    const unrealizedPnl = paperAccount.paperPositions.reduce(
      (sum, p) => sum + (p.unrealizedPnl || 0),
      0
    );
    totalEquity += unrealizedPnl;

    // Calculate win rate
    const winRate = paperAccount.totalTrades > 0
      ? (paperAccount.winningTrades / paperAccount.totalTrades) * 100
      : 0;

    return NextResponse.json({
      success: true,
      account: {
        id: account.id,
        exchangeId: account.exchangeId,
        exchangeName: account.exchangeName,
        exchangeType: account.exchangeType,
        paperAccountId: paperAccount.id,
        initialBalance: paperAccount.initialBalanceAmount,
        initialCurrency: paperAccount.initialBalanceCurrency,
        currentBalances: balances,
        totalEquity,
        unrealizedPnl,
        leverage: paperAccount.leverage,
        marginMode: paperAccount.marginMode,
        takerFeeRate: paperAccount.takerFeeRate,
        makerFeeRate: paperAccount.makerFeeRate,
        slippagePercent: paperAccount.slippagePercent,
        maxLeverage: paperAccount.maxLeverage,
        maxOpenPositions: paperAccount.maxOpenPositions,
        totalTrades: paperAccount.totalTrades,
        winningTrades: paperAccount.winningTrades,
        losingTrades: paperAccount.losingTrades,
        winRate,
        totalPnL: paperAccount.totalPnL,
        totalFees: paperAccount.totalFees,
        totalRealizedPnL: paperAccount.totalRealizedPnL,
        peakBalance: paperAccount.peakBalance,
        maxDrawdown: paperAccount.maxDrawdown,
        openPositionsCount: paperAccount.paperPositions.length,
        pendingOrdersCount: paperAccount.paperOrders.length,
        positions: paperAccount.paperPositions.map(p => ({
          id: p.id,
          symbol: p.symbol,
          direction: p.direction,
          quantity: p.quantity,
          entryPrice: p.entryPrice,
          currentPrice: p.currentPrice,
          leverage: p.leverage,
          margin: p.margin,
          unrealizedPnl: p.unrealizedPnl,
          unrealizedPnlPercent: p.unrealizedPnlPercent,
          stopLoss: p.stopLoss,
          takeProfit: p.takeProfit,
          liquidationPrice: p.liquidationPrice,
          openedAt: p.openedAt,
        })),
        pendingOrders: paperAccount.paperOrders.map(o => ({
          id: o.id,
          clientOrderId: o.clientOrderId,
          symbol: o.symbol,
          side: o.side,
          direction: o.direction,
          orderType: o.orderType,
          price: o.price,
          quantity: o.quantity,
          stopPrice: o.stopPrice,
          status: o.status,
          createdAt: o.createdAt,
        })),
        createdAt: paperAccount.createdAt,
        updatedAt: paperAccount.updatedAt,
      },
    });
  } catch (error) {
    console.error("[PaperTrading] Get account error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get account" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/paper-trading/account
 * Reset paper trading account
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accountId, action, newBalance } = body;

    if (!accountId) {
      return NextResponse.json(
        { success: false, error: "Account ID is required" },
        { status: 400 }
      );
    }

    if (action === "reset") {
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

      const balance = newBalance || {
        currency: account.paperAccount.initialBalanceCurrency,
        amount: account.paperAccount.initialBalanceAmount,
      };

      await db.$transaction(async (tx) => {
        // Close all open positions
        await tx.paperPosition.updateMany({
          where: { paperAccountId: account.paperAccount!.id, status: "OPEN" },
          data: {
            status: "CLOSED",
            closeReason: "ACCOUNT_RESET",
            closedAt: new Date(),
          },
        });

        // Cancel all pending orders
        await tx.paperOrder.updateMany({
          where: { paperAccountId: account.paperAccount!.id, status: "PENDING" },
          data: { status: "CANCELLED", cancelledAt: new Date() },
        });

        // Reset account
        await tx.paperAccount.update({
          where: { id: account.paperAccount!.id },
          data: {
            currentBalances: JSON.stringify({ [balance.currency]: balance.amount }),
            totalTrades: 0,
            winningTrades: 0,
            losingTrades: 0,
            totalPnL: 0,
            totalFees: 0,
            totalRealizedPnL: 0,
            peakBalance: balance.amount,
            maxDrawdown: 0,
            isReset: true,
            resetAt: new Date(),
          },
        });

        // Record balance history
        await tx.paperBalanceHistory.create({
          data: {
            paperAccountId: account.paperAccount!.id,
            balances: JSON.stringify({ [balance.currency]: balance.amount }),
            equityUsd: balance.amount,
            changeReason: "ACCOUNT_RESET",
            changeDetails: JSON.stringify({ newBalance: balance }),
          },
        });
      });

      return NextResponse.json({
        success: true,
        message: "Account reset successfully",
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("[PaperTrading] Reset account error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to reset account" },
      { status: 500 }
    );
  }
}
