/**
 * Create Paper Trading Account API
 * 
 * Creates a new paper trading account for manual trading
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getDefaultUser } from "@/lib/auth-utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { exchangeId = "binance", marketType = "futures", initialBalance = 10000 } = body;

    // Get default user
    const user = await getDefaultUser();

    // Check if account already exists (any type)
    const existingAccount = await db.account.findUnique({
      where: {
        userId_exchangeId_exchangeType: {
          userId: user.id,
          exchangeId,
          exchangeType: marketType,
        },
      },
      include: { paperAccount: true },
    });

    // If paper account exists, return it
    if (existingAccount?.paperAccount) {
      let balance = initialBalance;
      try {
        const balances = JSON.parse(existingAccount.paperAccount.currentBalances || "{}");
        balance = balances.USDT || initialBalance;
      } catch {}

      return NextResponse.json({
        success: true,
        account: {
          id: existingAccount.id,
          exchangeId: existingAccount.exchangeId,
          exchangeName: existingAccount.exchangeName,
          balance,
          currency: "USDT",
          accountType: "PAPER",
        },
        message: "Paper account already exists",
      });
    }

    // If account exists but without paperAccount, create paperAccount for it
    if (existingAccount) {
      const paperAccount = await db.paperAccount.create({
        data: {
          accountId: existingAccount.id,
          initialBalanceCurrency: "USDT",
          initialBalanceAmount: initialBalance,
          currentBalances: JSON.stringify({ USDT: initialBalance }),
          leverage: 10,
          marginMode: "ISOLATED",
          hedgeMode: true,
          takerFeeRate: 0.0004,
          makerFeeRate: 0.0002,
          slippagePercent: 0.0005,
          maxOpenPositions: 10,
          maxLeverage: 125,
          totalTrades: 0,
          winningTrades: 0,
          losingTrades: 0,
          totalPnL: 0,
          totalFees: 0,
          totalRealizedPnL: 0,
          peakBalance: initialBalance,
          maxDrawdown: 0,
        },
      });

      return NextResponse.json({
        success: true,
        account: {
          id: existingAccount.id,
          exchangeId: existingAccount.exchangeId,
          exchangeName: existingAccount.exchangeName,
          balance: initialBalance,
          currency: "USDT",
          accountType: "PAPER",
        },
      });
    }

    // Create new account with paper trading
    const account = await db.account.create({
      data: {
        userId: user.id,
        exchangeId,
        exchangeName: exchangeId.charAt(0).toUpperCase() + exchangeId.slice(1),
        exchangeType: marketType,
        accountType: "DEMO",
        isActive: true,
        isTestnet: false,
        hedgeMode: true,
        virtualBalance: JSON.stringify({ USDT: initialBalance }),
        paperAccount: {
          create: {
            initialBalanceCurrency: "USDT",
            initialBalanceAmount: initialBalance,
            currentBalances: JSON.stringify({ USDT: initialBalance }),
            leverage: 10,
            marginMode: "ISOLATED",
            hedgeMode: true,
            takerFeeRate: 0.0004,
            makerFeeRate: 0.0002,
            slippagePercent: 0.0005,
            maxOpenPositions: 10,
            maxLeverage: 125,
            totalTrades: 0,
            winningTrades: 0,
            losingTrades: 0,
            totalPnL: 0,
            totalFees: 0,
            totalRealizedPnL: 0,
            peakBalance: initialBalance,
            maxDrawdown: 0,
          },
        },
      },
      include: { paperAccount: true },
    });

    return NextResponse.json({
      success: true,
      account: {
        id: account.id,
        exchangeId: account.exchangeId,
        exchangeName: account.exchangeName,
        balance: initialBalance,
        currency: "USDT",
        accountType: "PAPER",
      },
    });
  } catch (error) {
    console.error("[CreatePaperAccount] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create paper account" },
      { status: 500 }
    );
  }
}
