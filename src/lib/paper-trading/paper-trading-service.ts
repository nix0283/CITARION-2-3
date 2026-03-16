/**
 * Paper Trading Service
 * 
 * Production-ready service for managing virtual trading accounts.
 * Handles order execution simulation, position management, and balance tracking.
 */

import { db } from "@/lib/db";

// ==================== TYPES ====================

export interface PaperBalance {
  [currency: string]: number;
}

export interface CreateOrderRequest {
  paperAccountId: string;
  symbol: string;
  side: "BUY" | "SELL";
  direction?: "LONG" | "SHORT";
  orderType: "MARKET" | "LIMIT" | "STOP_MARKET" | "STOP_LIMIT" | "TAKE_PROFIT";
  quantity: number;
  price?: number;
  stopPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  leverage?: number;
  reduceOnly?: boolean;
  timeInForce?: "GTC" | "IOC" | "FOK" | "GTX";
}

export interface PaperOrderResult {
  success: boolean;
  order?: {
    id: string;
    clientOrderId: string;
    symbol: string;
    side: string;
    direction?: string;
    orderType: string;
    price?: number;
    quantity: number;
    status: string;
    filledQty: number;
    avgFillPrice?: number;
    fee: number;
    createdAt: Date;
  };
  position?: {
    id: string;
    symbol: string;
    direction: string;
    quantity: number;
    entryPrice: number;
    leverage: number;
    margin: number;
    unrealizedPnl: number;
  };
  error?: string;
}

export interface ClosePositionRequest {
  paperAccountId: string;
  positionId: string;
  quantity?: number; // Partial close
  price?: number; // Limit price (if not market)
}

// ==================== PAPER TRADING SERVICE ====================

class PaperTradingService {
  private priceCache: Map<string, number> = new Map();
  private feeRates = {
    taker: 0.0004, // 0.04%
    maker: 0.0002, // 0.02%
  };

  /**
   * Update price cache for order execution
   */
  updatePrice(symbol: string, price: number): void {
    this.priceCache.set(symbol, price);
  }

  /**
   * Get current price from cache or fetch
   */
  async getCurrentPrice(symbol: string): Promise<number> {
    // Check cache first
    const cached = this.priceCache.get(symbol);
    if (cached) return cached;

    // Fetch from price API
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL || ""}/api/prices?symbols=${symbol}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.prices && data.prices[symbol]) {
          this.priceCache.set(symbol, data.prices[symbol]);
          return data.prices[symbol];
        }
      }
    } catch (error) {
      console.error("[PaperTrading] Failed to fetch price:", error);
    }

    // Fallback to a default price (should not happen in production)
    console.warn(`[PaperTrading] Using fallback price for ${symbol}`);
    return 0;
  }

  /**
   * Get paper account with balances
   */
  async getAccount(accountId: string) {
    const account = await db.paperAccount.findUnique({
      where: { accountId },
      include: {
        paperPositions: {
          where: { status: "OPEN" },
          orderBy: { openedAt: "desc" },
        },
        paperOrders: {
          where: { status: { in: ["PENDING", "NEW", "PARTIALLY_FILLED"] } },
          orderBy: { createdAt: "desc" },
          take: 50,
        },
      },
    });

    if (!account) return null;

    const balances = JSON.parse(account.currentBalances) as PaperBalance;
    const totalEquityUsd = await this.calculateEquityUsd(balances, account.paperPositions);

    return {
      ...account,
      balances,
      totalEquityUsd,
      openPositionsCount: account.paperPositions.length,
      pendingOrdersCount: account.paperOrders.length,
    };
  }

  /**
   * Calculate total equity in USD
   */
  private async calculateEquityUsd(
    balances: PaperBalance,
    positions: Array<{ symbol: string; direction: string; quantity: number; unrealizedPnl: number }>
  ): Promise<number> {
    let total = 0;

    // Add balance values
    for (const [currency, amount] of Object.entries(balances)) {
      if (currency === "USD" || currency === "USDT" || currency === "USDC") {
        total += amount;
      } else if (currency === "BTC") {
        const btcPrice = await this.getCurrentPrice("BTCUSDT");
        total += amount * btcPrice;
      } else if (currency === "ETH") {
        const ethPrice = await this.getCurrentPrice("ETHUSDT");
        total += amount * ethPrice;
      }
    }

    // Add unrealized PnL from positions
    for (const position of positions) {
      total += position.unrealizedPnl;
    }

    return total;
  }

  /**
   * Create and execute a paper order
   */
  async createOrder(request: CreateOrderRequest): Promise<PaperOrderResult> {
    // Get account
    const paperAccount = await db.paperAccount.findUnique({
      where: { id: request.paperAccountId },
    });

    if (!paperAccount) {
      return { success: false, error: "Paper account not found" };
    }

    // Get current price
    const currentPrice = await this.getCurrentPrice(request.symbol);
    if (currentPrice <= 0) {
      return { success: false, error: "Unable to get current price" };
    }

    // Determine execution price
    let executionPrice: number | null = null;
    let isMaker = false;

    if (request.orderType === "MARKET") {
      // Market orders execute immediately with slippage
      const slippage = paperAccount.slippagePercent || 0.0005;
      const slippageMultiplier = request.side === "BUY" ? 1 + slippage : 1 - slippage;
      executionPrice = currentPrice * slippageMultiplier;
    } else if (request.orderType === "LIMIT") {
      // Limit orders need price check
      if (!request.price) {
        return { success: false, error: "Limit order requires price" };
      }
      // Check if limit price is achievable
      const canFill = request.side === "BUY"
        ? request.price >= currentPrice
        : request.price <= currentPrice;
      if (canFill) {
        executionPrice = request.price;
        isMaker = true;
      }
    } else if (request.orderType === "STOP_MARKET" || request.orderType === "STOP_LIMIT") {
      // Stop orders - check if stop price is triggered
      if (!request.stopPrice) {
        return { success: false, error: "Stop order requires stopPrice" };
      }
      const isTriggered = request.side === "BUY"
        ? currentPrice >= request.stopPrice
        : currentPrice <= request.stopPrice;
      if (isTriggered) {
        if (request.orderType === "STOP_MARKET") {
          const slippage = paperAccount.slippagePercent || 0.0005;
          const slippageMultiplier = request.side === "BUY" ? 1 + slippage : 1 - slippage;
          executionPrice = currentPrice * slippageMultiplier;
        } else {
          executionPrice = request.price || request.stopPrice;
        }
      }
    } else if (request.orderType === "TAKE_PROFIT") {
      // TP orders - check if triggered
      if (!request.stopPrice) {
        return { success: false, error: "Take profit order requires stopPrice" };
      }
      const isTriggered = request.side === "SELL"
        ? currentPrice >= request.stopPrice
        : currentPrice <= request.stopPrice;
      if (isTriggered) {
        const slippage = paperAccount.slippagePercent || 0.0005;
        const slippageMultiplier = request.side === "SELL" ? 1 - slippage : 1 + slippage;
        executionPrice = currentPrice * slippageMultiplier;
      }
    }

    // Generate client order ID
    const clientOrderId = `paper_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // If order can be executed immediately
    if (executionPrice !== null) {
      return this.executeOrder(
        paperAccount,
        { ...request, price: executionPrice },
        clientOrderId,
        executionPrice,
        isMaker,
        currentPrice
      );
    }

    // Otherwise, create pending order
    const order = await db.paperOrder.create({
      data: {
        paperAccountId: paperAccount.id,
        clientOrderId,
        symbol: request.symbol,
        marketType: "FUTURES",
        side: request.side,
        direction: request.direction,
        orderType: request.orderType,
        price: request.price,
        quantity: request.quantity,
        stopPrice: request.stopPrice,
        status: "PENDING",
        stopLoss: request.stopLoss,
        takeProfit: request.takeProfit,
        reduceOnly: request.reduceOnly || false,
        timeInForce: request.timeInForce || "GTC",
      },
    });

    return {
      success: true,
      order: {
        id: order.id,
        clientOrderId: order.clientOrderId,
        symbol: order.symbol,
        side: order.side,
        direction: order.direction || undefined,
        orderType: order.orderType,
        price: order.price || undefined,
        quantity: order.quantity,
        status: order.status,
        filledQty: order.filledQty,
        avgFillPrice: order.avgFillPrice || undefined,
        fee: order.fee,
        createdAt: order.createdAt,
      },
    };
  }

  /**
   * Execute a paper order (internal)
   */
  private async executeOrder(
    paperAccount: {
      id: string;
      accountId: string;
      currentBalances: string;
      takerFeeRate: number;
      makerFeeRate: number;
      leverage: number;
      marginMode: string;
      maxLeverage: number;
    },
    request: CreateOrderRequest,
    clientOrderId: string,
    executionPrice: number,
    isMaker: boolean,
    currentPrice: number
  ): Promise<PaperOrderResult> {
    const balances = JSON.parse(paperAccount.currentBalances) as PaperBalance;

    // Calculate order value and fees
    const orderValue = request.quantity * executionPrice;
    const feeRate = isMaker ? paperAccount.makerFeeRate : paperAccount.takerFeeRate;
    const fee = orderValue * feeRate;

    // Determine direction for futures
    const direction = request.direction || (request.side === "BUY" ? "LONG" : "SHORT");
    const leverage = Math.min(request.leverage || paperAccount.leverage, paperAccount.maxLeverage);
    const margin = orderValue / leverage;

    // Get the main balance currency
    const mainCurrency = paperAccount.currentBalances
      ? Object.keys(balances)[0] || "USDT"
      : "USDT";

    // Check if reducing or closing existing position
    const existingPosition = await db.paperPosition.findFirst({
      where: {
        paperAccountId: paperAccount.id,
        symbol: request.symbol,
        status: "OPEN",
        direction: direction === "LONG" ? "SHORT" : "LONG", // Opposite direction
      },
    });

    // If reduceOnly and no position to reduce
    if (request.reduceOnly && !existingPosition) {
      return { success: false, error: "ReduceOnly order but no position to reduce" };
    }

    // Handle position closing
    if (existingPosition) {
      return this.closePositionWithOrder(
        paperAccount,
        existingPosition,
        request,
        clientOrderId,
        executionPrice,
        fee,
        feeRate,
        balances,
        mainCurrency
      );
    }

    // Check sufficient balance for opening new position
    const availableBalance = balances[mainCurrency] || 0;
    if (availableBalance < margin + fee) {
      return { success: false, error: "Insufficient balance" };
    }

    // Deduct margin and fee from balance
    balances[mainCurrency] = availableBalance - margin - fee;

    // Create order and position in transaction
    const result = await db.$transaction(async (tx) => {
      // Create order
      const order = await tx.paperOrder.create({
        data: {
          paperAccountId: paperAccount.id,
          clientOrderId,
          symbol: request.symbol,
          marketType: "FUTURES",
          side: request.side,
          direction,
          orderType: request.orderType,
          price: request.price || executionPrice,
          quantity: request.quantity,
          status: "FILLED",
          filledQty: request.quantity,
          avgFillPrice: executionPrice,
          fee,
          feeAsset: mainCurrency,
          quoteQty: orderValue,
          stopLoss: request.stopLoss,
          takeProfit: request.takeProfit,
          filledAt: new Date(),
        },
      });

      // Create position
      const position = await tx.paperPosition.create({
        data: {
          paperAccountId: paperAccount.id,
          symbol: request.symbol,
          marketType: "FUTURES",
          direction,
          status: "OPEN",
          quantity: request.quantity,
          entryPrice: executionPrice,
          leverage,
          marginMode: paperAccount.marginMode,
          margin,
          currentPrice,
          unrealizedPnl: 0,
          unrealizedPnlPercent: 0,
          stopLoss: request.stopLoss,
          takeProfit: request.takeProfit,
          highestPrice: direction === "LONG" ? executionPrice : undefined,
          lowestPrice: direction === "SHORT" ? executionPrice : undefined,
        },
      });

      // Link order to position
      await tx.paperOrder.update({
        where: { id: order.id },
        data: { positionId: position.id },
      });

      // Update account balance
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
          unrealizedPnl: 0,
          changeReason: "ORDER_FILLED",
          changeDetails: JSON.stringify({
            orderId: order.id,
            side: order.side,
            symbol: order.symbol,
            quantity: order.quantity,
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

    return {
      success: true,
      order: {
        id: result.order.id,
        clientOrderId: result.order.clientOrderId,
        symbol: result.order.symbol,
        side: result.order.side,
        direction: result.order.direction || undefined,
        orderType: result.order.orderType,
        price: result.order.price || undefined,
        quantity: result.order.quantity,
        status: result.order.status,
        filledQty: result.order.filledQty,
        avgFillPrice: result.order.avgFillPrice || undefined,
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
        unrealizedPnl: result.position.unrealizedPnl,
      },
    };
  }

  /**
   * Close position with order
   */
  private async closePositionWithOrder(
    paperAccount: {
      id: string;
      accountId: string;
      currentBalances: string;
      takerFeeRate: number;
      makerFeeRate: number;
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
    request: CreateOrderRequest,
    clientOrderId: string,
    executionPrice: number,
    fee: number,
    feeRate: number,
    balances: PaperBalance,
    mainCurrency: string
  ): Promise<PaperOrderResult> {
    // Calculate realized PnL
    const closeQuantity = Math.min(request.quantity, existingPosition.quantity);
    const pnlPerUnit = existingPosition.direction === "LONG"
      ? executionPrice - existingPosition.entryPrice
      : existingPosition.entryPrice - executionPrice;
    const realizedPnl = pnlPerUnit * closeQuantity - fee;
    const realizedPnlPercent = (realizedPnl / existingPosition.margin) * 100;

    // Return margin + PnL to balance
    const returnedMargin = (closeQuantity / existingPosition.quantity) * existingPosition.margin;
    balances[mainCurrency] = (balances[mainCurrency] || 0) + returnedMargin + realizedPnl;

    const isFullClose = closeQuantity >= existingPosition.quantity;

    const result = await db.$transaction(async (tx) => {
      // Create closing order
      const order = await tx.paperOrder.create({
        data: {
          paperAccountId: paperAccount.id,
          clientOrderId,
          symbol: request.symbol,
          marketType: "FUTURES",
          side: request.side,
          direction: request.direction,
          orderType: request.orderType,
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
            closeReason: request.orderType === "TAKE_PROFIT" ? "TP" :
              request.orderType === "STOP_MARKET" ? "SL" : "MANUAL",
            realizedPnl,
            realizedPnlPercent,
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
              parseFloat(String(balances[mainCurrency] || 0)),
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

    return {
      success: true,
      order: {
        id: result.order.id,
        clientOrderId: result.order.clientOrderId,
        symbol: result.order.symbol,
        side: result.order.side,
        direction: result.order.direction || undefined,
        orderType: result.order.orderType,
        price: result.order.price || undefined,
        quantity: result.order.quantity,
        status: result.order.status,
        filledQty: result.order.filledQty,
        avgFillPrice: result.order.avgFillPrice || undefined,
        fee: result.order.fee,
        createdAt: result.order.createdAt,
      },
    };
  }

  /**
   * Close a position directly
   */
  async closePosition(request: ClosePositionRequest): Promise<PaperOrderResult> {
    const paperAccount = await db.paperAccount.findUnique({
      where: { id: request.paperAccountId },
    });

    if (!paperAccount) {
      return { success: false, error: "Paper account not found" };
    }

    const position = await db.paperPosition.findFirst({
      where: {
        id: request.positionId,
        paperAccountId: paperAccount.id,
        status: "OPEN",
      },
    });

    if (!position) {
      return { success: false, error: "Position not found" };
    }

    const currentPrice = await this.getCurrentPrice(position.symbol);
    if (currentPrice <= 0) {
      return { success: false, error: "Unable to get current price" };
    }

    const executionPrice = request.price || currentPrice;
    const closeQuantity = request.quantity || position.quantity;

    return this.createOrder({
      paperAccountId: paperAccount.id,
      symbol: position.symbol,
      side: position.direction === "LONG" ? "SELL" : "BUY",
      direction: position.direction === "LONG" ? "SHORT" : "LONG",
      orderType: request.price ? "LIMIT" : "MARKET",
      quantity: closeQuantity,
      price: request.price,
      reduceOnly: true,
    });
  }

  /**
   * Cancel pending order
   */
  async cancelOrder(orderId: string): Promise<{ success: boolean; error?: string }> {
    const order = await db.paperOrder.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return { success: false, error: "Order not found" };
    }

    if (order.status !== "PENDING" && order.status !== "NEW") {
      return { success: false, error: "Order cannot be cancelled" };
    }

    await db.paperOrder.update({
      where: { id: orderId },
      data: {
        status: "CANCELLED",
        cancelledAt: new Date(),
      },
    });

    return { success: true };
  }

  /**
   * Update position prices (called periodically)
   */
  async updatePositionPrices(paperAccountId: string): Promise<void> {
    const positions = await db.paperPosition.findMany({
      where: {
        paperAccountId,
        status: "OPEN",
      },
    });

    for (const position of positions) {
      const currentPrice = await this.getCurrentPrice(position.symbol);
      if (currentPrice <= 0) continue;

      // Calculate unrealized PnL
      const pnlPerUnit = position.direction === "LONG"
        ? currentPrice - position.entryPrice
        : position.entryPrice - currentPrice;
      const unrealizedPnl = pnlPerUnit * position.quantity;
      const unrealizedPnlPercent = (unrealizedPnl / position.margin) * 100;

      // Update highest/lowest price for trailing stop
      let highestPrice = position.highestPrice;
      let lowestPrice = position.lowestPrice;

      if (position.direction === "LONG" && currentPrice > (highestPrice || 0)) {
        highestPrice = currentPrice;
      }
      if (position.direction === "SHORT" && currentPrice < (lowestPrice || Infinity)) {
        lowestPrice = currentPrice;
      }

      // Check for liquidation
      const liquidationPrice = position.entryPrice * (
        position.direction === "LONG"
          ? (1 - 0.9 / position.leverage)
          : (1 + 0.9 / position.leverage)
      );

      const isLiquidated = position.direction === "LONG"
        ? currentPrice <= liquidationPrice
        : currentPrice >= liquidationPrice;

      if (isLiquidated) {
        // Handle liquidation
        await this.handleLiquidation(position, liquidationPrice);
        continue;
      }

      // Check stop loss
      if (position.stopLoss) {
        const isSLHit = position.direction === "LONG"
          ? currentPrice <= position.stopLoss
          : currentPrice >= position.stopLoss;
        if (isSLHit) {
          await this.closePosition({
            paperAccountId,
            positionId: position.id,
            price: position.stopLoss,
          });
          continue;
        }
      }

      // Check take profit
      if (position.takeProfit) {
        const isTPHit = position.direction === "LONG"
          ? currentPrice >= position.takeProfit
          : currentPrice <= position.takeProfit;
        if (isTPHit) {
          await this.closePosition({
            paperAccountId,
            positionId: position.id,
            price: position.takeProfit,
          });
          continue;
        }
      }

      // Update position
      await db.paperPosition.update({
        where: { id: position.id },
        data: {
          currentPrice,
          unrealizedPnl,
          unrealizedPnlPercent,
          highestPrice,
          lowestPrice,
        },
      });
    }
  }

  /**
   * Handle position liquidation
   */
  private async handleLiquidation(
    position: { id: string; paperAccountId: string; margin: number },
    liquidationPrice: number
  ): Promise<void> {
    const paperAccount = await db.paperAccount.findUnique({
      where: { id: position.paperAccountId },
    });

    if (!paperAccount) return;

    const balances = JSON.parse(paperAccount.currentBalances) as PaperBalance;
    const mainCurrency = Object.keys(balances)[0] || "USDT";

    // Remove the margin (already lost)
    // PnL = -margin (total loss)
    const loss = -position.margin;

    await db.$transaction(async (tx) => {
      await tx.paperPosition.update({
        where: { id: position.id },
        data: {
          status: "CLOSED",
          quantity: 0,
          closePrice: liquidationPrice,
          closeReason: "LIQUIDATION",
          realizedPnl: loss,
          realizedPnlPercent: -100,
          closedAt: new Date(),
        },
      });

      await tx.paperAccount.update({
        where: { id: position.paperAccountId },
        data: {
          totalTrades: { increment: 1 },
          losingTrades: { increment: 1 },
          totalPnL: { increment: loss },
          totalRealizedPnL: { increment: loss },
          maxDrawdown: {
            set: Math.max(
              loss,
              (await tx.paperAccount.findUnique({
                where: { id: position.paperAccountId },
                select: { maxDrawdown: true },
              }))?.maxDrawdown || 0
            ),
          },
        },
      });

      await tx.paperBalanceHistory.create({
        data: {
          paperAccountId: position.paperAccountId,
          balances: JSON.stringify(balances),
          realizedPnl: loss,
          dailyPnL: loss,
          changeReason: "LIQUIDATION",
          changeDetails: JSON.stringify({
            positionId: position.id,
            liquidationPrice,
            loss,
          }),
          positionId: position.id,
        },
      });
    });
  }

  /**
   * Get account analytics/metrics
   */
  async getAnalytics(accountId: string) {
    const account = await db.paperAccount.findUnique({
      where: { accountId },
      include: {
        paperPositions: {
          where: { status: "CLOSED" },
          orderBy: { closedAt: "desc" },
          take: 100,
        },
        paperOrders: {
          where: { status: "FILLED" },
          orderBy: { filledAt: "desc" },
          take: 100,
        },
        balanceHistory: {
          orderBy: { timestamp: "desc" },
          take: 500,
        },
      },
    });

    if (!account) return null;

    // Calculate metrics
    const trades = account.paperPositions;
    const wins = trades.filter(t => (t.realizedPnl || 0) > 0);
    const losses = trades.filter(t => (t.realizedPnl || 0) <= 0);

    const totalPnL = trades.reduce((sum, t) => sum + (t.realizedPnl || 0), 0);
    const avgPnL = trades.length > 0 ? totalPnL / trades.length : 0;
    const avgWin = wins.length > 0 ? wins.reduce((sum, t) => sum + (t.realizedPnl || 0), 0) / wins.length : 0;
    const avgLoss = losses.length > 0 ? Math.abs(losses.reduce((sum, t) => sum + (t.realizedPnl || 0), 0) / losses.length) : 0;

    const profitFactor = avgLoss > 0 ? avgWin / avgLoss : avgWin > 0 ? Infinity : 0;
    const winRate = trades.length > 0 ? (wins.length / trades.length) * 100 : 0;

    // Calculate Sharpe-like ratio from balance history
    const balanceChanges = account.balanceHistory
      .map((h, i, arr) => {
        if (i === arr.length - 1) return null;
        const prevBalance = JSON.parse(arr[i + 1].balances);
        const currBalance = JSON.parse(h.balances);
        const prevTotal = Object.values(prevBalance).reduce((a: number, b) => a + (b as number), 0);
        const currTotal = Object.values(currBalance).reduce((a: number, b) => a + (b as number), 0);
        return prevTotal > 0 ? (currTotal - prevTotal) / prevTotal : 0;
      })
      .filter((v): v is number => v !== null);

    const avgReturn = balanceChanges.length > 0
      ? balanceChanges.reduce((a, b) => a + b, 0) / balanceChanges.length
      : 0;
    const stdReturn = balanceChanges.length > 1
      ? Math.sqrt(balanceChanges.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / (balanceChanges.length - 1))
      : 0;
    const sharpeRatio = stdReturn > 0 ? (avgReturn / stdReturn) * Math.sqrt(365) : 0;

    return {
      totalTrades: account.totalTrades,
      winningTrades: account.winningTrades,
      losingTrades: account.losingTrades,
      winRate,
      totalPnL: account.totalPnL,
      totalRealizedPnL: account.totalRealizedPnL,
      totalFees: account.totalFees,
      avgPnL,
      avgWin,
      avgLoss,
      profitFactor,
      maxDrawdown: account.maxDrawdown,
      peakBalance: account.peakBalance,
      sharpeRatio,
      recentTrades: trades.slice(0, 20).map(t => ({
        id: t.id,
        symbol: t.symbol,
        direction: t.direction,
        entryPrice: t.entryPrice,
        closePrice: t.closePrice,
        realizedPnl: t.realizedPnl,
        realizedPnlPercent: t.realizedPnlPercent,
        closedAt: t.closedAt,
        closeReason: t.closeReason,
      })),
      equityCurve: account.balanceHistory.slice(0, 100).map(h => ({
        timestamp: h.timestamp,
        equity: h.equityUsd,
        realizedPnl: h.realizedPnl,
        dailyPnL: h.dailyPnL,
      })),
    };
  }

  /**
   * Get trade history for journal
   */
  async getTradeHistory(accountId: string, options?: {
    limit?: number;
    offset?: number;
    symbol?: string;
  }) {
    const where: Record<string, unknown> = {
      paperAccount: { accountId },
      status: "CLOSED",
    };

    if (options?.symbol) {
      where.symbol = options.symbol;
    }

    const positions = await db.paperPosition.findMany({
      where,
      orderBy: { closedAt: "desc" },
      take: options?.limit || 50,
      skip: options?.offset || 0,
      include: {
        orders: {
          where: { status: "FILLED" },
          orderBy: { filledAt: "asc" },
        },
      },
    });

    const total = await db.paperPosition.count({ where });

    return {
      trades: positions.map(p => ({
        id: p.id,
        symbol: p.symbol,
        direction: p.direction,
        quantity: p.quantity,
        entryPrice: p.entryPrice,
        closePrice: p.closePrice,
        leverage: p.leverage,
        margin: p.margin,
        realizedPnl: p.realizedPnl,
        realizedPnlPercent: p.realizedPnlPercent,
        totalFees: p.totalFees,
        stopLoss: p.stopLoss,
        takeProfit: p.takeProfit,
        closeReason: p.closeReason,
        openedAt: p.openedAt,
        closedAt: p.closedAt,
        duration: p.closedAt && p.openedAt
          ? Math.floor((p.closedAt.getTime() - p.openedAt.getTime()) / 60000)
          : null,
        orders: p.orders.map(o => ({
          id: o.id,
          side: o.side,
          orderType: o.orderType,
          price: o.avgFillPrice,
          quantity: o.filledQty,
          fee: o.fee,
          filledAt: o.filledAt,
        })),
      })),
      total,
    };
  }

  /**
   * Reset paper account
   */
  async resetAccount(accountId: string, newBalance?: {
    currency: string;
    amount: number;
  }): Promise<{ success: boolean; error?: string }> {
    const account = await db.paperAccount.findUnique({
      where: { accountId },
    });

    if (!account) {
      return { success: false, error: "Account not found" };
    }

    const balance = newBalance || {
      currency: account.initialBalanceCurrency,
      amount: account.initialBalanceAmount,
    };

    await db.$transaction(async (tx) => {
      // Close all open positions
      await tx.paperPosition.updateMany({
        where: { paperAccountId: account.id, status: "OPEN" },
        data: {
          status: "CLOSED",
          closeReason: "ACCOUNT_RESET",
          closedAt: new Date(),
        },
      });

      // Cancel all pending orders
      await tx.paperOrder.updateMany({
        where: { paperAccountId: account.id, status: "PENDING" },
        data: { status: "CANCELLED", cancelledAt: new Date() },
      });

      // Reset account
      await tx.paperAccount.update({
        where: { id: account.id },
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
          paperAccountId: account.id,
          balances: JSON.stringify({ [balance.currency]: balance.amount }),
          equityUsd: balance.amount,
          changeReason: "ACCOUNT_RESET",
          changeDetails: JSON.stringify({ newBalance: balance }),
        },
      });
    });

    return { success: true };
  }
}

// Export singleton instance
export const paperTradingService = new PaperTradingService();
