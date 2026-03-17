import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/paper-trading/orders
 * Get paper trading orders
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountId");
    const status = searchParams.get("status");
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
    };

    if (status) {
      where.status = status;
    }

    if (symbol) {
      where.symbol = symbol;
    }

    const orders = await db.paperOrder.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });

    const total = await db.paperOrder.count({ where });

    return NextResponse.json({
      success: true,
      orders: orders.map(o => ({
        id: o.id,
        clientOrderId: o.clientOrderId,
        exchangeOrderId: o.exchangeOrderId,
        symbol: o.symbol,
        marketType: o.marketType,
        side: o.side,
        direction: o.direction,
        orderType: o.orderType,
        price: o.price,
        quantity: o.quantity,
        stopPrice: o.stopPrice,
        status: o.status,
        filledQty: o.filledQty,
        avgFillPrice: o.avgFillPrice,
        fee: o.fee,
        feeAsset: o.feeAsset,
        quoteQty: o.quoteQty,
        stopLoss: o.stopLoss,
        takeProfit: o.takeProfit,
        reduceOnly: o.reduceOnly,
        closePosition: o.closePosition,
        timeInForce: o.timeInForce,
        positionId: o.positionId,
        rejectReason: o.rejectReason,
        createdAt: o.createdAt,
        triggeredAt: o.triggeredAt,
        filledAt: o.filledAt,
        cancelledAt: o.cancelledAt,
        expiredAt: o.expiredAt,
      })),
      total,
    });
  } catch (error) {
    console.error("[PaperTrading] Get orders error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get orders" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/paper-trading/orders
 * Create a new paper order (market/limit/stop/tp)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      accountId,
      symbol,
      side,
      direction,
      orderType,
      quantity,
      price,
      stopPrice,
      stopLoss,
      takeProfit,
      leverage,
      reduceOnly,
      timeInForce,
    } = body;

    if (!accountId || !symbol || !side || !orderType || !quantity) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
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
              where: { status: "OPEN" },
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

    // Get current price from price API
    let currentPrice = 0;
    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const priceResponse = await fetch(
        `${baseUrl}/api/prices?symbols=${symbol}`
      );
      if (priceResponse.ok) {
        const priceData = await priceResponse.json();
        currentPrice = priceData.prices?.[symbol]?.price || 0;
      }
    } catch (e) {
      console.error("[PaperTrading] Failed to fetch price:", e);
    }

    if (currentPrice <= 0) {
      return NextResponse.json(
        { success: false, error: "Unable to get current price" },
        { status: 400 }
      );
    }

    // Generate client order ID
    const clientOrderId = `paper_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Determine execution
    let shouldExecute = false;
    let executionPrice = 0;
    let isMaker = false;

    const slippage = paperAccount.slippagePercent || 0.0005;

    if (orderType === "MARKET") {
      shouldExecute = true;
      const slippageMultiplier = side === "BUY" ? 1 + slippage : 1 - slippage;
      executionPrice = currentPrice * slippageMultiplier;
    } else if (orderType === "LIMIT") {
      if (price) {
        const canFill = side === "BUY"
          ? price >= currentPrice
          : price <= currentPrice;
        if (canFill) {
          shouldExecute = true;
          executionPrice = price;
          isMaker = true;
        }
      }
    } else if (orderType === "STOP_MARKET") {
      if (stopPrice) {
        const isTriggered = side === "BUY"
          ? currentPrice >= stopPrice
          : currentPrice <= stopPrice;
        if (isTriggered) {
          shouldExecute = true;
          const slippageMultiplier = side === "BUY" ? 1 + slippage : 1 - slippage;
          executionPrice = currentPrice * slippageMultiplier;
        }
      }
    } else if (orderType === "TAKE_PROFIT") {
      if (stopPrice) {
        const isTriggered = side === "SELL"
          ? currentPrice >= stopPrice
          : currentPrice <= stopPrice;
        if (isTriggered) {
          shouldExecute = true;
          const slippageMultiplier = side === "SELL" ? 1 - slippage : 1 + slippage;
          executionPrice = currentPrice * slippageMultiplier;
        }
      }
    }

    const orderDirection = direction || (side === "BUY" ? "LONG" : "SHORT");
    const orderLeverage = Math.min(leverage || paperAccount.leverage, paperAccount.maxLeverage);

    // If should execute immediately
    if (shouldExecute) {
      const balances = JSON.parse(paperAccount.currentBalances || "{}");
      const orderValue = quantity * executionPrice;
      const feeRate = isMaker ? paperAccount.makerFeeRate : paperAccount.takerFeeRate;
      const fee = orderValue * feeRate;
      const margin = orderValue / orderLeverage;

      // Check for position to close (opposite direction)
      const existingPosition = paperAccount.paperPositions.find(
        p => p.symbol === symbol && p.direction !== orderDirection
      );

      if (existingPosition) {
        // Close position
        return await handleClosePosition(
          paperAccount,
          existingPosition,
          symbol,
          side,
          quantity,
          executionPrice,
          fee,
          clientOrderId,
          balances
        );
      }

      // Check if reduceOnly but no position
      if (reduceOnly) {
        return NextResponse.json(
          { success: false, error: "ReduceOnly order but no position to reduce" },
          { status: 400 }
        );
      }

      // Check balance for opening new position
      const mainCurrency = Object.keys(balances)[0] || "USDT";
      const availableBalance = balances[mainCurrency] || 0;

      if (availableBalance < margin + fee) {
        return NextResponse.json(
          { success: false, error: "Insufficient balance" },
          { status: 400 }
        );
      }

      // Deduct margin and fee
      balances[mainCurrency] = availableBalance - margin - fee;

      // Calculate liquidation price
      const liquidationPrice = calculateLiquidationPrice(executionPrice, orderDirection, orderLeverage);

      // Create order, position, and update balance in transaction
      const result = await db.$transaction(async (tx) => {
        // Create order
        const order = await tx.paperOrder.create({
          data: {
            paperAccountId: paperAccount.id,
            clientOrderId,
            symbol,
            marketType: "FUTURES",
            side,
            direction: orderDirection,
            orderType,
            price: executionPrice,
            quantity,
            status: "FILLED",
            filledQty: quantity,
            avgFillPrice: executionPrice,
            fee,
            feeAsset: mainCurrency,
            quoteQty: orderValue,
            stopLoss,
            takeProfit,
            reduceOnly: reduceOnly || false,
            closePosition: false,
            timeInForce: timeInForce || "GTC",
            filledAt: new Date(),
          },
        });

        // Create position
        const position = await tx.paperPosition.create({
          data: {
            paperAccountId: paperAccount.id,
            symbol,
            marketType: "FUTURES",
            direction: orderDirection,
            status: "OPEN",
            quantity,
            entryPrice: executionPrice,
            leverage: orderLeverage,
            marginMode: paperAccount.marginMode,
            margin,
            currentPrice,
            unrealizedPnl: 0,
            unrealizedPnlPercent: 0,
            stopLoss,
            takeProfit,
            liquidationPrice,
            highestPrice: orderDirection === "LONG" ? executionPrice : null,
            lowestPrice: orderDirection === "SHORT" ? executionPrice : null,
          },
        });

        // Link order to position
        await tx.paperOrder.update({
          where: { id: order.id },
          data: { positionId: position.id },
        });

        // Update account
        await tx.paperAccount.update({
          where: { id: paperAccount.id },
          data: {
            currentBalances: JSON.stringify(balances),
            totalTrades: { increment: 1 },
            totalFees: { increment: fee },
          },
        });

        // Record balance history
        await tx.paperBalanceHistory.create({
          data: {
            paperAccountId: paperAccount.id,
            balances: JSON.stringify(balances),
            equityUsd: Object.values(balances).reduce((a: number, b) => a + (b as number), 0),
            unrealizedPnl: 0,
            changeReason: "ORDER_FILLED",
            changeDetails: JSON.stringify({
              orderId: order.id,
              positionId: position.id,
              symbol,
              side,
              quantity,
              price: executionPrice,
              margin,
              fee,
            }),
            orderId: order.id,
            positionId: position.id,
          },
        });

        return { order, position };
      });

      return NextResponse.json({
        success: true,
        order: {
          id: result.order.id,
          clientOrderId: result.order.clientOrderId,
          symbol: result.order.symbol,
          side: result.order.side,
          direction: result.order.direction,
          orderType: result.order.orderType,
          price: result.order.price,
          quantity: result.order.quantity,
          status: result.order.status,
          filledQty: result.order.filledQty,
          avgFillPrice: result.order.avgFillPrice,
          fee: result.order.fee,
          createdAt: result.order.createdAt,
        },
        position: {
          id: result.position.id,
          symbol: result.position.symbol,
          direction: result.position.direction,
          quantity: result.position.quantity,
          entryPrice: result.position.entryPrice,
          leverage: result.position.leverage,
          margin: result.position.margin,
          stopLoss: result.position.stopLoss,
          takeProfit: result.position.takeProfit,
          liquidationPrice: result.position.liquidationPrice,
        },
      });
    }

    // Create pending order
    const order = await db.paperOrder.create({
      data: {
        paperAccountId: paperAccount.id,
        clientOrderId,
        symbol,
        marketType: "FUTURES",
        side,
        direction: orderDirection,
        orderType,
        price: price || null,
        quantity,
        stopPrice,
        status: "PENDING",
        stopLoss,
        takeProfit,
        reduceOnly: reduceOnly || false,
        closePosition: false,
        timeInForce: timeInForce || "GTC",
      },
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        clientOrderId: order.clientOrderId,
        symbol: order.symbol,
        side: order.side,
        direction: order.direction,
        orderType: order.orderType,
        price: order.price,
        quantity: order.quantity,
        stopPrice: order.stopPrice,
        status: order.status,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error("[PaperTrading] Create order error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/paper-trading/orders
 * Cancel a pending order
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Order ID is required" },
        { status: 400 }
      );
    }

    const order = await db.paperOrder.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    if (order.status !== "PENDING" && order.status !== "NEW") {
      return NextResponse.json(
        { success: false, error: "Order cannot be cancelled" },
        { status: 400 }
      );
    }

    await db.paperOrder.update({
      where: { id: orderId },
      data: {
        status: "CANCELLED",
        cancelledAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Order cancelled",
    });
  } catch (error) {
    console.error("[PaperTrading] Cancel order error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to cancel order" },
      { status: 500 }
    );
  }
}

// Helper function to handle position closing
async function handleClosePosition(
  paperAccount: { 
    id: string; 
    currentBalances: string; 
    paperPositions: Array<{ 
      id: string; 
      symbol: string; 
      direction: string; 
      quantity: number; 
      entryPrice: number; 
      leverage: number; 
      margin: number; 
      unrealizedPnl: number;
    }>; 
  },
  existingPosition: { 
    id: string; 
    symbol: string; 
    direction: string; 
    quantity: number; 
    entryPrice: number; 
    leverage: number; 
    margin: number; 
    unrealizedPnl: number;
  },
  symbol: string,
  side: string,
  quantity: number,
  executionPrice: number,
  fee: number,
  clientOrderId: string,
  balances: Record<string, number>
) {
  const closeQuantity = Math.min(quantity, existingPosition.quantity);
  
  // Calculate realized PnL
  const pnlPerUnit = existingPosition.direction === "LONG"
    ? executionPrice - existingPosition.entryPrice
    : existingPosition.entryPrice - executionPrice;
  const realizedPnl = pnlPerUnit * closeQuantity - fee;
  const realizedPnlPercent = existingPosition.margin > 0 
    ? (realizedPnl / existingPosition.margin) * 100 
    : 0;

  // Return margin + PnL to balance
  const returnedMargin = (closeQuantity / existingPosition.quantity) * existingPosition.margin;
  const mainCurrency = Object.keys(balances)[0] || "USDT";
  balances[mainCurrency] = (balances[mainCurrency] || 0) + returnedMargin + realizedPnl;

  const isFullClose = closeQuantity >= existingPosition.quantity;

  const result = await db.$transaction(async (tx) => {
    // Create closing order
    const order = await tx.paperOrder.create({
      data: {
        paperAccountId: paperAccount.id,
        clientOrderId,
        symbol,
        marketType: "FUTURES",
        side,
        direction: existingPosition.direction === "LONG" ? "SHORT" : "LONG",
        orderType: "MARKET",
        price: executionPrice,
        quantity: closeQuantity,
        status: "FILLED",
        filledQty: closeQuantity,
        avgFillPrice: executionPrice,
        fee,
        feeAsset: mainCurrency,
        quoteQty: closeQuantity * executionPrice,
        positionId: existingPosition.id,
        reduceOnly: true,
        closePosition: isFullClose,
        filledAt: new Date(),
      },
    });

    if (isFullClose) {
      // Close position fully
      await tx.paperPosition.update({
        where: { id: existingPosition.id },
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
      const newQuantity = existingPosition.quantity - closeQuantity;
      const newMargin = (newQuantity / existingPosition.quantity) * existingPosition.margin;
      await tx.paperPosition.update({
        where: { id: existingPosition.id },
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
        peakBalance: {
          set: Math.max(
            balances[mainCurrency] || 0,
            (await tx.paperAccount.findUnique({
              where: { id: paperAccount.id },
              select: { peakBalance: true },
            }))?.peakBalance || 0
          ),
        },
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
          positionId: existingPosition.id,
          closeQuantity,
          executionPrice,
          realizedPnl,
          realizedPnlPercent,
        }),
        orderId: order.id,
        positionId: existingPosition.id,
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
      filledQty: result.order.filledQty,
      avgFillPrice: result.order.avgFillPrice,
      fee: result.order.fee,
      createdAt: result.order.createdAt,
    },
    position: {
      id: existingPosition.id,
      closed: result.isFullClose,
      realizedPnl,
      realizedPnlPercent,
    },
  });
}

// Helper to calculate liquidation price
function calculateLiquidationPrice(
  entryPrice: number,
  direction: string,
  leverage: number
): number {
  // Liquidation at 90% margin loss
  const liquidationPercent = 90 / leverage;
  return direction === "LONG"
    ? entryPrice * (1 - liquidationPercent / 100)
    : entryPrice * (1 + liquidationPercent / 100);
}
