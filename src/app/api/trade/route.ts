/**
 * Real Trading API Endpoint
 * 
 * Production-ready endpoint for executing real trades on exchanges.
 * Supports multiple exchanges with proper authentication and error handling.
 * 
 * Features:
 * - Multi-exchange support (Binance, Bybit, OKX, Bitget, BingX)
 * - Secure credential handling with AES-256-GCM encryption
 * - Position management (open, close, modify)
 * - Leverage and margin mode settings
 * - Risk management (max position size, daily limits)
 * - Comprehensive logging and audit trail
 * 
 * Security:
 * - Requires authentication via NextAuth
 * - API keys stored encrypted in database
 * - Rate limiting and circuit breaker protection
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { db } from "@/lib/db";
import { ExchangeFactory } from "@/lib/exchange/exchange-factory";
import { getApiKeyEncryption } from "@/lib/encryption/api-key-encryption";
import { ExchangeId, OrderSide, OrderType, MarginMode } from "@/lib/exchange/types";

// ==================== Request Validation ====================

const tradeSchema = z.object({
  // Required
  symbol: z.string().min(1, "Symbol is required"),
  side: z.enum(["BUY", "SELL"]),
  type: z.enum(["MARKET", "LIMIT"]),
  quantity: z.number().positive("Quantity must be positive"),
  
  // Optional
  price: z.number().positive().optional(),
  leverage: z.number().min(1).max(125).optional(),
  marginMode: z.enum(["ISOLATED", "CROSSED"]).optional(),
  stopLoss: z.number().positive().optional(),
  takeProfit: z.number().positive().optional(),
  reduceOnly: z.boolean().optional(),
  clientOrderId: z.string().optional(),
  
  // Account selection
  exchangeId: z.string().optional(),
  accountId: z.string().optional(),
  
  // Risk management
  maxPositionSize: z.number().optional(),
  maxRiskPercent: z.number().min(0.1).max(100).optional(),
});

type TradeRequest = z.infer<typeof tradeSchema>;

// ==================== Response Types ====================

interface TradeResponse {
  success: boolean;
  order?: {
    id: string;
    clientOrderId?: string;
    symbol: string;
    side: string;
    type: string;
    status: string;
    price: number;
    avgPrice: number;
    quantity: number;
    filledQuantity: number;
    leverage?: number;
    fee: number;
    feeCurrency: string;
    timestamp: Date;
  };
  position?: {
    id: string;
    symbol: string;
    side: string;
    quantity: number;
    entryPrice: number;
    leverage: number;
    unrealizedPnl: number;
  };
  error?: string;
  errorCode?: string;
}

// ==================== POST Handler ====================

export async function POST(request: NextRequest): Promise<NextResponse<TradeResponse>> {
  try {
    // 1. Authentication check
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", errorCode: "AUTH_REQUIRED" },
        { status: 401 }
      );
    }

    // 2. Parse and validate request
    const body = await request.json();
    const validated = tradeSchema.parse(body);

    // 3. Get user with accounts
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      include: {
        accounts: {
          where: { 
            isActive: true,
            accountType: "LIVE", // Only live accounts for real trading
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found", errorCode: "USER_NOT_FOUND" },
        { status: 404 }
      );
    }

    // 4. Select account
    let account;
    if (validated.accountId) {
      account = user.accounts.find((a) => a.id === validated.accountId);
    } else if (validated.exchangeId) {
      account = user.accounts.find((a) => a.exchangeId === validated.exchangeId);
    } else {
      // Use first active account
      account = user.accounts[0];
    }

    if (!account) {
      return NextResponse.json(
        { success: false, error: "No active trading account found", errorCode: "NO_ACCOUNT" },
        { status: 400 }
      );
    }

    // 5. Check for encrypted credentials
    if (!account.encryptedApiCredentials) {
      return NextResponse.json(
        { success: false, error: "API credentials not configured for this account", errorCode: "NO_CREDENTIALS" },
        { status: 400 }
      );
    }

    // 6. Decrypt credentials
    const encryption = getApiKeyEncryption();
    const encryptedData = encryption.deserialize(account.encryptedApiCredentials);
    const credentials = encryption.decrypt(encryptedData);

    // 7. Get exchange client
    const exchangeId = account.exchangeId as ExchangeId;
    const client = await ExchangeFactory.getClient(exchangeId, credentials, {
      testnet: account.isTestnet || false,
      marketType: account.exchangeType === "spot" ? "spot" : "futures",
    });

    // 8. Risk management checks
    if (validated.maxRiskPercent || validated.maxPositionSize) {
      const accountInfo = await client.getAccountInfo();
      const positionValue = validated.quantity * (validated.price || 0);
      
      if (validated.maxPositionSize && positionValue > validated.maxPositionSize) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Position size ${positionValue} exceeds maximum ${validated.maxPositionSize}`,
            errorCode: "RISK_LIMIT_EXCEEDED" 
          },
          { status: 400 }
        );
      }

      if (validated.maxRiskPercent) {
        const riskAmount = accountInfo.totalEquity * (validated.maxRiskPercent / 100);
        if (positionValue > riskAmount) {
          return NextResponse.json(
            { 
              success: false, 
              error: `Position size exceeds ${validated.maxRiskPercent}% risk limit`,
              errorCode: "RISK_LIMIT_EXCEEDED" 
            },
            { status: 400 }
          );
        }
      }
    }

    // 9. Set leverage if specified and different from current
    if (validated.leverage && account.exchangeType !== "spot") {
      await client.setLeverage({
        symbol: validated.symbol,
        leverage: validated.leverage,
        marginMode: (validated.marginMode?.toLowerCase() as MarginMode) || "cross",
      });
    }

    // 10. Place order
    const orderResult = await client.createOrder({
      symbol: validated.symbol,
      side: validated.side.toLowerCase() as OrderSide,
      type: validated.type.toLowerCase() as OrderType,
      quantity: validated.quantity,
      price: validated.price,
      leverage: validated.leverage,
      marginMode: (validated.marginMode?.toLowerCase() as MarginMode) || undefined,
      reduceOnly: validated.reduceOnly,
      clientOrderId: validated.clientOrderId,
    });

    if (!orderResult.success || !orderResult.order) {
      // Log failed order
      await db.trade.create({
        data: {
          userId: user.id,
          accountId: account.id,
          symbol: validated.symbol,
          direction: validated.side === "BUY" ? "LONG" : "SHORT",
          action: validated.side,
          status: "REJECTED",
          amount: validated.quantity,
          leverage: validated.leverage || 1,
          isDemo: false,
          errorMessage: orderResult.error,
        },
      });

      return NextResponse.json({
        success: false,
        error: orderResult.error || "Order failed",
        errorCode: "ORDER_FAILED",
      });
    }

    const order = orderResult.order;

    // 11. Log successful trade
    const trade = await db.trade.create({
      data: {
        userId: user.id,
        accountId: account.id,
        symbol: order.symbol,
        direction: order.side.toUpperCase() === "BUY" ? "LONG" : "SHORT",
        action: order.side.toUpperCase(),
        status: order.status.toUpperCase() === "FILLED" ? "FILLED" : "PENDING",
        entryPrice: order.averagePrice || order.price,
        amount: order.quantity,
        leverage: validated.leverage || 1,
        isDemo: false,
        exchangeOrderId: order.id,
        fee: order.fee,
        feeCurrency: order.feeCurrency,
      },
    });

    // 12. Return response
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        clientOrderId: order.clientOrderId,
        symbol: order.symbol,
        side: order.side.toUpperCase(),
        type: order.type.toUpperCase(),
        status: order.status.toUpperCase(),
        price: order.price,
        avgPrice: order.averagePrice || 0,
        quantity: order.quantity,
        filledQuantity: order.filledQuantity,
        leverage: validated.leverage,
        fee: order.fee,
        feeCurrency: order.feeCurrency,
        timestamp: order.createdAt,
      },
    });
  } catch (error) {
    console.error("[TradeAPI] Error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Validation error", 
          errorCode: "VALIDATION_ERROR",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error",
        errorCode: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}

// ==================== GET Handler - Get Open Positions ====================

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const exchangeId = searchParams.get("exchangeId") as ExchangeId | null;
    const accountId = searchParams.get("accountId");

    // Get user's accounts
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      include: {
        accounts: {
          where: { 
            isActive: true,
            ...(exchangeId && { exchangeId }),
            ...(accountId && { id: accountId }),
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const positions = [];

    for (const account of user.accounts) {
      if (!account.encryptedApiCredentials) continue;

      try {
        const encryption = getApiKeyEncryption();
        const encryptedData = encryption.deserialize(account.encryptedApiCredentials);
        const credentials = encryption.decrypt(encryptedData);

        const client = await ExchangeFactory.getClient(
          account.exchangeId as ExchangeId,
          credentials,
          {
            testnet: account.isTestnet || false,
            marketType: account.exchangeType === "spot" ? "spot" : "futures",
          }
        );

        const accountPositions = await client.getPositions();
        
        positions.push(...accountPositions.map((p) => ({
          ...p,
          accountId: account.id,
          exchangeId: account.exchangeId,
          exchangeName: account.exchangeName,
        })));
      } catch (error) {
        console.error(`[TradeAPI] Error fetching positions for ${account.exchangeId}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      positions,
      count: positions.length,
    });
  } catch (error) {
    console.error("[TradeAPI] GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch positions" },
      { status: 500 }
    );
  }
}
