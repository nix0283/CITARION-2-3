import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  performComprehensiveRiskCheck,
  calculateLeverageAdjustment,
  checkSimultaneousTradesPerSymbol,
  checkMinSymbolPrice,
  checkMinSymbolVolume,
  checkMaxConcurrentAmount,
  calculateAutoCancelTime,
  findAlternativeUsdPair,
  getAdvancedRiskConfig,
  USD_STABLECOINS
} from "@/lib/auto-trading/advanced-risk-management";

/**
 * POST /api/auto-trading/risk-check
 * Perform comprehensive risk checks before trade execution
 * 
 * Request body:
 * - signalId: string (required)
 * - botConfigId: string (required) 
 * - userId: string (required)
 * - availablePairs: string[] (optional, for alternative pair matching)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      signalId,
      botConfigId,
      userId,
      availablePairs
    } = body;

    // Validate required fields
    if (!signalId || !botConfigId || !userId) {
      return NextResponse.json(
        { success: false, error: "signalId, botConfigId, and userId are required" },
        { status: 400 }
      );
    }

    // Get signal and bot config in parallel
    const [signal, botConfig] = await Promise.all([
      db.signal.findUnique({ where: { id: signalId } }),
      db.botConfig.findUnique({ where: { id: botConfigId } })
    ]);

    if (!signal) {
      return NextResponse.json(
        { success: false, error: "Signal not found" },
        { status: 404 }
      );
    }

    if (!botConfig) {
      return NextResponse.json(
        { success: false, error: "BotConfig not found" },
        { status: 404 }
      );
    }

    // Get advanced risk config
    const riskConfig = getAdvancedRiskConfig(botConfig);

    // Perform comprehensive risk check
    const result = await performComprehensiveRiskCheck(
      signal,
      userId,
      riskConfig,
      availablePairs
    );

    // Calculate auto-cancel time if applicable
    let autoCancelAt: Date | null = null;
    if (riskConfig.autoCancelTimeout > 0) {
      autoCancelAt = calculateAutoCancelTime(
        new Date(),
        riskConfig.autoCancelTimeout,
        riskConfig.autoCancelTimeoutUnit
      );
    }

    return NextResponse.json({
      success: true,
      riskCheck: {
        passed: result.passed,
        checks: result.checks,
        leverageAdjustment: result.leverageAdjustment,
        alternativePair: result.alternativePair,
        autoCancelAt: autoCancelAt ? autoCancelAt.toISOString() : null
      }
    });

  } catch (error) {
    console.error("Risk check API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/auto-trading/risk-check
 * Check specific risk criteria or get config summary
 * 
 * Query params:
 * - action: string (simultaneous-trades | min-price | min-volume | concurrent-amount | leverage-adjust | alternative-pair)
 * - userId: string (required)
 * - botConfigId: string (required)
 * - symbol: string (for symbol-specific checks)
 * - amount: number (for concurrent amount check)
 * - leverage: number (for leverage adjust)
 * - baseAsset: string (for alternative pair)
 * - availablePairs: string (JSON array, for alternative pair)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const symbol = searchParams.get("symbol");
    const userId = searchParams.get("userId");
    const botConfigId = searchParams.get("botConfigId");

    if (!userId || !botConfigId) {
      return NextResponse.json(
        { success: false, error: "userId and botConfigId are required" },
        { status: 400 }
      );
    }

    // Get bot config
    const botConfig = await db.botConfig.findUnique({
      where: { id: botConfigId }
    });

    if (!botConfig) {
      return NextResponse.json(
        { success: false, error: "BotConfig not found" },
        { status: 404 }
      );
    }

    const riskConfig = getAdvancedRiskConfig(botConfig);

    switch (action) {
      case "simultaneous-trades": {
        if (!symbol) {
          return NextResponse.json(
            { success: false, error: "symbol is required for simultaneous-trades check" },
            { status: 400 }
          );
        }
        const result = await checkSimultaneousTradesPerSymbol(
          symbol,
          userId,
          riskConfig.maxTradesPerSymbol
        );
        return NextResponse.json({ success: true, result });
      }

      case "min-price": {
        if (!symbol) {
          return NextResponse.json(
            { success: false, error: "symbol is required for min-price check" },
            { status: 400 }
          );
        }
        if (!riskConfig.minSymbolPrice) {
          return NextResponse.json({
            success: true,
            result: { passed: true, reason: "No minimum price configured", filterName: "minSymbolPrice" }
          });
        }
        const result = await checkMinSymbolPrice(symbol, riskConfig.minSymbolPrice);
        return NextResponse.json({ success: true, result });
      }

      case "min-volume": {
        if (!symbol) {
          return NextResponse.json(
            { success: false, error: "symbol is required for min-volume check" },
            { status: 400 }
          );
        }
        if (!riskConfig.minSymbolVolume) {
          return NextResponse.json({
            success: true,
            result: { passed: true, reason: "No minimum volume configured", filterName: "minSymbolVolume" }
          });
        }
        const result = await checkMinSymbolVolume(symbol, riskConfig.minSymbolVolume);
        return NextResponse.json({ success: true, result });
      }

      case "concurrent-amount": {
        const amountStr = searchParams.get("amount");
        if (!amountStr) {
          return NextResponse.json(
            { success: false, error: "amount is required for concurrent-amount check" },
            { status: 400 }
          );
        }
        const tradeAmount = parseFloat(amountStr);
        if (isNaN(tradeAmount)) {
          return NextResponse.json(
            { success: false, error: "Invalid amount value" },
            { status: 400 }
          );
        }
        if (!riskConfig.maxConcurrentAmount) {
          return NextResponse.json({
            success: true,
            result: { passed: true, reason: "No max concurrent amount configured", filterName: "maxConcurrentAmount" }
          });
        }
        const result = await checkMaxConcurrentAmount(userId, tradeAmount, riskConfig.maxConcurrentAmount);
        return NextResponse.json({ success: true, result });
      }

      case "leverage-adjust": {
        const leverageStr = searchParams.get("leverage");
        if (!leverageStr) {
          return NextResponse.json(
            { success: false, error: "leverage is required for leverage-adjust check" },
            { status: 400 }
          );
        }
        const currentLeverage = parseInt(leverageStr, 10);
        if (isNaN(currentLeverage)) {
          return NextResponse.json(
            { success: false, error: "Invalid leverage value" },
            { status: 400 }
          );
        }
        const result = calculateLeverageAdjustment(currentLeverage, riskConfig);
        return NextResponse.json({ success: true, result });
      }

      case "alternative-pair": {
        const baseAsset = searchParams.get("baseAsset");
        const pairsStr = searchParams.get("availablePairs");
        
        if (!baseAsset) {
          return NextResponse.json(
            { success: false, error: "baseAsset is required for alternative-pair check" },
            { status: 400 }
          );
        }
        
        let availablePairs: string[] = [];
        try {
          availablePairs = pairsStr ? JSON.parse(pairsStr) : [];
        } catch {
          return NextResponse.json(
            { success: false, error: "Invalid availablePairs JSON" },
            { status: 400 }
          );
        }
        
        const result = findAlternativeUsdPair(
          baseAsset,
          availablePairs,
          riskConfig.alternativeUsdPairs.length > 0 ? riskConfig.alternativeUsdPairs : USD_STABLECOINS.slice()
        );
        return NextResponse.json({ success: true, result });
      }

      case "auto-cancel": {
        const createdAtStr = searchParams.get("createdAt");
        let createdAt = new Date();
        if (createdAtStr) {
          createdAt = new Date(createdAtStr);
          if (isNaN(createdAt.getTime())) {
            return NextResponse.json(
              { success: false, error: "Invalid createdAt date" },
              { status: 400 }
            );
          }
        }
        
        const cancelAt = calculateAutoCancelTime(
          createdAt,
          riskConfig.autoCancelTimeout,
          riskConfig.autoCancelTimeoutUnit
        );
        
        return NextResponse.json({
          success: true,
          result: {
            cancelAt: cancelAt ? cancelAt.toISOString() : null,
            timeout: riskConfig.autoCancelTimeout,
            unit: riskConfig.autoCancelTimeoutUnit
          }
        });
      }

      default:
        // Return config summary
        return NextResponse.json({
          success: true,
          config: {
            maxTradesPerSymbol: riskConfig.maxTradesPerSymbol,
            minSymbolPrice: riskConfig.minSymbolPrice,
            minSymbolVolume: riskConfig.minSymbolVolume,
            maxConcurrentAmount: riskConfig.maxConcurrentAmount,
            autoCancelTimeout: riskConfig.autoCancelTimeout,
            autoCancelTimeoutUnit: riskConfig.autoCancelTimeoutUnit,
            slLeverageAdjustEnabled: riskConfig.slLeverageAdjustEnabled,
            slLeverageAdjustPercent: riskConfig.slLeverageAdjustPercent,
            slLeverageAdjustMin: riskConfig.slLeverageAdjustMin,
            useAlternativePairs: riskConfig.useAlternativePairs,
            alternativeUsdPairs: riskConfig.alternativeUsdPairs
          }
        });
    }

  } catch (error) {
    console.error("Risk check GET API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
