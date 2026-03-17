/**
 * Demo Trade API Endpoint
 * 
 * Public endpoint for demo trading from chat bot
 * No authentication required - uses default demo user
 * 
 * Trading modes:
 * - DEMO: Virtual trading with simulated positions
 * - No real exchange connection required
 * 
 * Uses PriceService for real-time prices from:
 * - WebSocket cache
 * - Database cache
 * - Exchange REST API fallback
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getDefaultUser } from "@/lib/auth-utils";
import { priceService } from "@/lib/price/price-service";

interface DemoTradeRequest {
  symbol: string;
  direction: "LONG" | "SHORT";
  action?: "BUY" | "SELL" | "CLOSE";
  entryPrices?: number[];
  takeProfits?: { price: number; percentage: number }[];
  stopLoss?: number;
  leverage?: number;
  marketType?: "SPOT" | "FUTURES";
  amount?: number;
  exchangeId?: string;
}

// Removed static DEMO_PRICES - now using PriceService for real-time prices

export async function POST(request: NextRequest) {
  try {
    const body: DemoTradeRequest = await request.json();
    const {
      symbol,
      direction,
      entryPrices = [],
      takeProfits = [],
      stopLoss,
      leverage = 10,
      marketType = "FUTURES",
      amount = 100,
      exchangeId = "binance",
    } = body;

    // Validate required fields
    if (!symbol) {
      return NextResponse.json(
        { success: false, error: "Symbol is required" },
        { status: 400 }
      );
    }

    if (!direction || !["LONG", "SHORT"].includes(direction)) {
      return NextResponse.json(
        { success: false, error: "Direction must be LONG or SHORT" },
        { status: 400 }
      );
    }

    // Get or create default demo user
    const user = await getDefaultUser();

    // Get or create demo account
    let account = await db.account.findFirst({
      where: {
        userId: user.id,
        accountType: "DEMO",
        exchangeId,
      },
    });

    if (!account) {
      account = await db.account.create({
        data: {
          userId: user.id,
          accountType: "DEMO",
          exchangeId,
          exchangeType: "futures",
          exchangeName: `${exchangeId.toUpperCase()} Demo`,
          virtualBalance: JSON.stringify({ USDT: 10000 }),
          isActive: true,
        },
      });
    }

    // Get current price from PriceService (real-time from WebSocket/DB/API)
    const currentPrice = entryPrices[0] || await priceService.getPrice(symbol, exchangeId);
    const tradeAmount = amount || 100;
    const tradeLeverage = marketType === "SPOT" ? 1 : leverage;
    const quantity = (tradeAmount * tradeLeverage) / currentPrice;
    const fee = tradeAmount * tradeLeverage * 0.0004;

    // Check balance
    const balanceData = account.virtualBalance ? JSON.parse(account.virtualBalance) : { USDT: 10000 };
    const usdtBalance = balanceData.USDT || 0;

    if (usdtBalance < tradeAmount + fee) {
      return NextResponse.json(
        { success: false, error: `Insufficient balance. Available: ${usdtBalance.toFixed(2)} USDT` },
        { status: 400 }
      );
    }

    // Deduct margin and fee
    balanceData.USDT = usdtBalance - tradeAmount - fee;
    await db.account.update({
      where: { id: account.id },
      data: { virtualBalance: JSON.stringify(balanceData) },
    });

    // Calculate liquidation price
    let liquidationPrice: number;
    if (direction === "LONG") {
      liquidationPrice = currentPrice * (1 - (1 / tradeLeverage) + 0.005);
    } else {
      liquidationPrice = currentPrice * (1 + (1 / tradeLeverage) - 0.005);
    }

    // Create position
    const position = await db.position.create({
      data: {
        accountId: account.id,
        symbol: symbol.toUpperCase(),
        direction,
        status: "OPEN",
        source: "CHAT",
        totalAmount: quantity,
        filledAmount: quantity,
        avgEntryPrice: currentPrice,
        currentPrice,
        leverage: tradeLeverage,
        stopLoss: stopLoss || null,
        takeProfit: takeProfits[0]?.price || null,
        unrealizedPnl: 0,
        realizedPnl: 0,
        isDemo: true,
      },
    });

    // Get next signal ID
    const counter = await db.signalIdCounter.upsert({
      where: { id: "signal_counter" },
      update: { lastId: { increment: 1 } },
      create: { id: "signal_counter", lastId: 1 },
    });

    // Create signal record
    await db.signal.create({
      data: {
        signalId: counter.lastId,
        source: "CHAT_BOT",
        sourceMessage: `${symbol} ${direction}`,
        symbol: symbol.toUpperCase(),
        direction,
        action: direction === "LONG" ? "BUY" : "SELL",
        marketType,
        entryPrices: JSON.stringify(entryPrices.length > 0 ? entryPrices : [currentPrice]),
        takeProfits: JSON.stringify(takeProfits),
        stopLoss,
        leverage: tradeLeverage,
        status: "ACTIVE",
        positionId: position.id,
        processedAt: new Date(),
      },
    });

    const directionEmoji = direction === "LONG" ? "🟢" : "🔴";
    const marketEmoji = marketType === "SPOT" ? "💱" : "⚡";

    return NextResponse.json({
      success: true,
      message: `${directionEmoji} **#${counter.lastId} ${symbol}** ${direction}\n${marketEmoji} Market: ${marketType}\n\n📍 Entry: $${currentPrice.toLocaleString()}\n⚡ Leverage: ${tradeLeverage}x\n💰 Margin: $${tradeAmount.toFixed(2)}\n📊 Quantity: ${quantity.toFixed(6)}\n\n✅ Position opened successfully!`,
      position: {
        id: position.id,
        symbol: position.symbol,
        direction: position.direction,
        totalAmount: position.totalAmount,
        avgEntryPrice: position.avgEntryPrice,
        currentPrice: position.currentPrice,
        leverage: position.leverage,
        stopLoss: position.stopLoss,
        takeProfit: position.takeProfit,
        liquidationPrice,
        margin: tradeAmount,
      },
      balance: balanceData,
      isDemo: true,
      exchangeId,
    });
  } catch (error) {
    console.error("[DemoTrade] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to fetch demo positions
 * Updates position prices with real-time data before returning
 */
export async function GET() {
  try {
    const user = await getDefaultUser();

    const positions = await db.position.findMany({
      where: {
        status: { in: ['OPEN', 'ACTIVE'] },
        isDemo: true,
        account: { userId: user.id },
      },
      orderBy: { createdAt: "desc" },
      include: {
        account: {
          select: {
            exchangeId: true,
            exchangeName: true,
          },
        },
      },
    });

    // Update positions with real-time prices
    const updatedPositions = await Promise.all(
      positions.map(async (position) => {
        try {
          // Get current price from price service
          const currentPrice = await priceService.getPrice(
            position.symbol,
            position.account?.exchangeId || 'binance'
          );

          // Calculate unrealized PnL
          const isLong = position.direction === "LONG";
          const priceChange = isLong
            ? (currentPrice - position.avgEntryPrice) / position.avgEntryPrice
            : (position.avgEntryPrice - currentPrice) / position.avgEntryPrice;
          const unrealizedPnl = position.totalAmount * position.avgEntryPrice * priceChange * position.leverage;

          // Update position in database with new price and PnL
          await db.position.update({
            where: { id: position.id },
            data: {
              currentPrice,
              unrealizedPnl,
              highestPrice: position.highestPrice
                ? Math.max(position.highestPrice, currentPrice)
                : currentPrice,
              lowestPrice: position.lowestPrice
                ? Math.min(position.lowestPrice, currentPrice)
                : currentPrice,
            },
          });

          return {
            ...position,
            currentPrice,
            unrealizedPnl,
          };
        } catch (error) {
          console.error(`[DemoTrade] Error updating price for ${position.symbol}:`, error);
          // Return position without update if price fetch fails
          return position;
        }
      })
    );

    // Get demo balance
    const account = await db.account.findFirst({
      where: { userId: user.id, accountType: "DEMO" },
    });

    const balance = account?.virtualBalance
      ? JSON.parse(account.virtualBalance)
      : { USDT: 10000 };

    return NextResponse.json({
      success: true,
      positions: updatedPositions,
      count: updatedPositions.length,
      balance,
      isDemo: true,
    });
  } catch (error) {
    console.error("[DemoTrade] GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch positions" },
      { status: 500 }
    );
  }
}
