import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { priceService } from "@/lib/price/price-service";

/**
 * GET /api/paper-trading/positions
 * Get paper trading positions
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountId");
    const status = searchParams.get("status") || "OPEN";
    const symbol = searchParams.get("symbol");
    const limit = parseInt(searchParams.get("limit") || "50");
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
      status,
    };

    if (symbol) {
      where.symbol = symbol;
    }

    const positions = await db.paperPosition.findMany({
      where,
      orderBy: { openedAt: "desc" },
      take: limit,
      skip: offset,
    });

    const total = await db.paperPosition.count({ where });

    return NextResponse.json({
      success: true,
      positions: positions.map(p => ({
        id: p.id,
        symbol: p.symbol,
        marketType: p.marketType,
        direction: p.direction,
        status: p.status,
        quantity: p.quantity,
        entryPrice: p.entryPrice,
        leverage: p.leverage,
        marginMode: p.marginMode,
        margin: p.margin,
        currentPrice: p.currentPrice,
        unrealizedPnl: p.unrealizedPnl,
        unrealizedPnlPercent: p.unrealizedPnlPercent,
        liquidationPrice: p.liquidationPrice,
        stopLoss: p.stopLoss,
        takeProfit: p.takeProfit,
        trailingStop: p.trailingStop ? JSON.parse(p.trailingStop) : null,
        trailingActive: p.trailingActive,
        highestPrice: p.highestPrice,
        lowestPrice: p.lowestPrice,
        totalFundingPaid: p.totalFundingPaid,
        totalFundingReceived: p.totalFundingReceived,
        lastFundingTime: p.lastFundingTime,
        realizedPnl: p.realizedPnl,
        realizedPnlPercent: p.realizedPnlPercent,
        totalFees: p.totalFees,
        closePrice: p.closePrice,
        closeReason: p.closeReason,
        openedAt: p.openedAt,
        closedAt: p.closedAt,
      })),
      total,
    });
  } catch (error) {
    console.error("[PaperTrading] Get positions error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get positions" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/paper-trading/positions
 * Close a position manually
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accountId, positionId, closePercentage = 100 } = body;

    if (!accountId || !positionId) {
      return NextResponse.json(
        { success: false, error: "Account ID and Position ID are required" },
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

    const paperAccount = account.paperAccount;

    // Get the position
    const position = await db.paperPosition.findUnique({
      where: { id: positionId },
    });

    if (!position || position.paperAccountId !== paperAccount.id) {
      return NextResponse.json(
        { success: false, error: "Position not found" },
        { status: 404 }
      );
    }

    if (position.status !== "OPEN") {
      return NextResponse.json(
        { success: false, error: "Position is not open" },
        { status: 400 }
      );
    }

    // Get current price using the price service
    let currentPrice = 0;
    try {
      currentPrice = await priceService.getPrice(position.symbol, account.exchangeName?.toLowerCase() || "binance");
    } catch (e) {
      console.error("[PaperTrading] Failed to fetch price:", e);
    }

    if (currentPrice <= 0) {
      return NextResponse.json(
        { success: false, error: "Unable to get current price" },
        { status: 400 }
      );
    }

    // Calculate close quantity
    const closeQuantity = position.quantity * (closePercentage / 100);
    const slippage = paperAccount.slippagePercent || 0.0005;
    const slippageMultiplier = position.direction === "LONG" ? 1 - slippage : 1 + slippage;
    const executionPrice = currentPrice * slippageMultiplier;

    // Calculate PnL
    const pnlPerUnit = position.direction === "LONG"
      ? executionPrice - position.entryPrice
      : position.entryPrice - executionPrice;
    const orderValue = closeQuantity * executionPrice;
    const fee = orderValue * paperAccount.takerFeeRate;
    const realizedPnl = pnlPerUnit * closeQuantity - fee;
    const realizedPnlPercent = position.margin > 0
      ? (realizedPnl / (position.margin * closePercentage / 100)) * 100
      : 0;

    // Get balances
    const balances = JSON.parse(paperAccount.currentBalances || "{}");
    const mainCurrency = Object.keys(balances)[0] || "USDT";

    // Return margin + PnL to balance
    const returnedMargin = (closeQuantity / position.quantity) * position.margin;
    balances[mainCurrency] = (balances[mainCurrency] || 0) + returnedMargin + realizedPnl;

    const isFullClose = closePercentage >= 100;
    const clientOrderId = `paper_close_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const result = await db.$transaction(async (tx) => {
      // Create closing order
      const order = await tx.paperOrder.create({
        data: {
          paperAccountId: paperAccount.id,
          clientOrderId,
          symbol: position.symbol,
          marketType: position.marketType,
          side: position.direction === "LONG" ? "SELL" : "BUY",
          direction: position.direction,
          orderType: "MARKET",
          price: executionPrice,
          quantity: closeQuantity,
          status: "FILLED",
          filledQty: closeQuantity,
          avgFillPrice: executionPrice,
          fee,
          feeAsset: mainCurrency,
          quoteQty: orderValue,
          positionId: position.id,
          reduceOnly: true,
          closePosition: isFullClose,
          filledAt: new Date(),
        },
      });

      if (isFullClose) {
        // Close position fully
        await tx.paperPosition.update({
          where: { id: position.id },
          data: {
            status: "CLOSED",
            quantity: 0,
            closePrice: executionPrice,
            closeReason: "MANUAL",
            realizedPnl: { increment: realizedPnl },
            realizedPnlPercent: { increment: realizedPnlPercent },
            totalFees: { increment: fee },
            closedAt: new Date(),
          },
        });
      } else {
        // Partial close
        const newQuantity = position.quantity - closeQuantity;
        const newMargin = (newQuantity / position.quantity) * position.margin;
        await tx.paperPosition.update({
          where: { id: position.id },
          data: {
            quantity: newQuantity,
            margin: newMargin,
            realizedPnl: { increment: realizedPnl },
            realizedPnlPercent: { increment: realizedPnlPercent },
            totalFees: { increment: fee },
          },
        });
      }

      // Update account
      const isWin = realizedPnl > 0;
      await tx.paperAccount.update({
        where: { id: paperAccount.id },
        data: {
          currentBalances: JSON.stringify(balances),
          totalTrades: { increment: 1 },
          winningTrades: isWin ? { increment: 1 } : undefined,
          losingTrades: !isWin ? { increment: 1 } : undefined,
          totalPnL: { increment: realizedPnl },
          totalRealizedPnL: { increment: realizedPnl },
          totalFees: { increment: fee },
        },
      });

      // Record balance history
      await tx.paperBalanceHistory.create({
        data: {
          paperAccountId: paperAccount.id,
          balances: JSON.stringify(balances),
          equityUsd: Object.values(balances).reduce((a: number, b) => a + (b as number), 0),
          realizedPnl,
          dailyPnL: realizedPnl,
          changeReason: "POSITION_CLOSED",
          changeDetails: JSON.stringify({
            orderId: order.id,
            positionId: position.id,
            closeQuantity,
            closePercentage,
            executionPrice,
            realizedPnl,
            realizedPnlPercent,
          }),
          orderId: order.id,
          positionId: position.id,
        },
      });

      return { order, realizedPnl, isFullClose };
    });

    return NextResponse.json({
      success: true,
      order: {
        id: result.order.id,
        clientOrderId: result.order.clientOrderId,
        symbol: result.order.symbol,
        side: result.order.side,
        orderType: result.order.orderType,
        price: result.order.price,
        quantity: result.order.quantity,
        status: result.order.status,
        fee: result.order.fee,
      },
      position: {
        id: position.id,
        closed: result.isFullClose,
        closePercentage,
        realizedPnl,
        realizedPnlPercent,
      },
    });
  } catch (error) {
    console.error("[PaperTrading] Close position error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to close position" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/paper-trading/positions
 * Update position (SL, TP, trailing stop)
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { positionId, stopLoss, takeProfit, trailingStop } = body;

    if (!positionId) {
      return NextResponse.json(
        { success: false, error: "Position ID is required" },
        { status: 400 }
      );
    }

    const position = await db.paperPosition.findUnique({
      where: { id: positionId, status: "OPEN" },
    });

    if (!position) {
      return NextResponse.json(
        { success: false, error: "Position not found" },
        { status: 404 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (stopLoss !== undefined) updateData.stopLoss = stopLoss;
    if (takeProfit !== undefined) updateData.takeProfit = takeProfit;
    if (trailingStop !== undefined) {
      updateData.trailingStop = JSON.stringify(trailingStop);
      updateData.trailingActive = trailingStop.enabled;
    }

    await db.paperPosition.update({
      where: { id: positionId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Position updated",
    });
  } catch (error) {
    console.error("[PaperTrading] Update position error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update position" },
      { status: 500 }
    );
  }
}
