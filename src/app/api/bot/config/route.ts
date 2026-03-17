import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getDefaultUserId } from "@/lib/default-user";

// Default bot config (Cornix-style with full feature set)
const DEFAULT_BOT_CONFIG = {
  name: "Default Bot",
  description: "Default trading bot configuration",
  isActive: false,
  
  // Exchange settings
  exchangeId: "binance",
  exchangeType: "futures",
  
  // Trade amount
  tradeAmount: 100,
  amountType: "FIXED",
  amountOverride: false,
  
  // Leverage
  leverage: 10,
  leverageOverride: false,
  
  // Entry strategy
  entryStrategy: "EVENLY_DIVIDED",
  entryZoneTargets: 1,
  
  // Take-profit
  tpStrategy: "ONE_TARGET",
  tpTargetCount: 1,
  
  // Stop-loss
  defaultStopLoss: 5,
  slTimeout: 0,
  slTimeoutUnit: "SECONDS",
  slOrderType: "MARKET",
  
  // Trailing Stop
  trailingEnabled: false,
  trailingType: "BREAKEVEN",
  
  // Margin
  hedgeMode: false,
  marginMode: "ISOLATED",
  
  // Filters
  maxOpenTrades: 5,
  minTradeInterval: 5,
  
  // Notifications
  notifyOnEntry: true,
  notifyOnExit: true,
  notifyOnSL: true,
  notifyOnTP: true,
  notifyOnError: true,
  notifyOnNewSignal: true,
  
  // ========== CORNIX-COMPATIBLE EXTENDED FEATURES ==========
  
  // Direction Filter
  directionFilter: "BOTH",
  
  // Trailing Entry
  trailingEntryEnabled: false,
  trailingEntryPercent: 1,
  trailingEntryActivateDist: 0.5,
  trailingEntryOnlyIfNotInGrp: false,
  
  // Trailing Take-Profit
  trailingTPEnabled: false,
  trailingTPPercent: 1,
  trailingTPActivateAfterTP: 1,
  trailingTPOnlyIfNotInGrp: false,
  
  // Moving Take-Profit
  movingTPEnabled: false,
  movingTPBaseline: "AVERAGE_ENTRIES",
  movingTPOnlyIfNotInGrp: false,
  
  // Limit Price Reduction
  limitPriceReductionEnabled: false,
  limitPriceReductionPercent: 0.1,
  
  // Operation Hours
  operationHoursEnabled: false,
  operationHoursStart: 0,
  operationHoursEnd: 24,
  operationHoursDays: "[1,2,3,4,5,6,7]",
  
  // Signal Behavior
  onSignalCancel: "CLOSE",
  onSignalEdit: "UPDATE",
  onlyUseIfNotDef: false,
};

// GET - Fetch bot configuration
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const configId = searchParams.get("id");
    const accountId = searchParams.get("accountId");

    // If specific config ID provided
    if (configId) {
      const config = await db.botConfig.findUnique({
        where: { id: configId }
      });

      if (!config) {
        return NextResponse.json(
          { error: "Config not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        config,
      });
    }

    // Get all configs for account
    if (accountId) {
      const configs = await db.botConfig.findMany({
        where: { accountId },
        orderBy: { createdAt: "desc" }
      });

      return NextResponse.json({
        success: true,
        configs,
        count: configs.length,
      });
    }

    // Get all configs (for demo)
    const configs = await db.botConfig.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    // If no configs exist, return default
    if (configs.length === 0) {
      return NextResponse.json({
        success: true,
        config: DEFAULT_BOT_CONFIG,
        isDefault: true,
      });
    }

    return NextResponse.json({
      success: true,
      configs,
      count: configs.length,
    });

  } catch (error) {
    console.error("Get bot config error:", error);
    return NextResponse.json({
      success: true,
      config: DEFAULT_BOT_CONFIG,
      isDefault: true,
      error: "Database error, returning default config",
    });
  }
}

// POST - Create or update bot configuration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id,
      name = "Trading Bot",
      description,
      isActive = false,
      exchangeId = "binance",
      exchangeType = "futures",
      tradeAmount = 100,
      amountType = "FIXED",
      amountOverride = false,
      leverage = 10,
      leverageOverride = false,
      entryStrategy = "EVENLY_DIVIDED",
      entryZoneTargets = 1,
      tpStrategy = "ONE_TARGET",
      tpTargetCount = 1,
      defaultStopLoss,
      slTimeout = 0,
      slTimeoutUnit = "SECONDS",
      slOrderType = "MARKET",
      trailingEnabled = false,
      trailingType = "BREAKEVEN",
      trailingValue,
      trailingTriggerType,
      trailingTriggerValue,
      trailingStopPercent,
      hedgeMode = false,
      marginMode = "ISOLATED",
      maxOpenTrades = 5,
      minTradeInterval = 5,
      allowedSymbols,
      blacklistedSymbols,
      notifyOnEntry = true,
      notifyOnExit = true,
      notifyOnSL = true,
      notifyOnTP = true,
      notifyOnError = true,
      notifyOnNewSignal = true,
      accountId,
      // ========== CORNIX-COMPATIBLE EXTENDED FEATURES ==========
      directionFilter = "BOTH",
      trailingEntryEnabled = false,
      trailingEntryPercent = 1,
      trailingEntryActivateDist = 0.5,
      trailingEntryOnlyIfNotInGrp = false,
      trailingTPEnabled = false,
      trailingTPPercent = 1,
      trailingTPActivateAfterTP = 1,
      trailingTPOnlyIfNotInGrp = false,
      movingTPEnabled = false,
      movingTPBaseline = "AVERAGE_ENTRIES",
      movingTPOnlyIfNotInGrp = false,
      limitPriceReductionEnabled = false,
      limitPriceReductionPercent = 0.1,
      operationHoursEnabled = false,
      operationHoursStart = 0,
      operationHoursEnd = 24,
      operationHoursDays,
      onSignalCancel = "CLOSE",
      onSignalEdit = "UPDATE",
      onlyUseIfNotDef = false,
    } = body;

    // Prepare data with all fields
    const configData = {
      name,
      description,
      isActive,
      exchangeId,
      exchangeType,
      tradeAmount,
      amountType,
      amountOverride,
      leverage,
      leverageOverride,
      entryStrategy,
      entryZoneTargets,
      tpStrategy,
      tpTargetCount,
      defaultStopLoss,
      slTimeout,
      slTimeoutUnit,
      slOrderType,
      trailingEnabled,
      trailingType,
      trailingValue,
      trailingTriggerType,
      trailingTriggerValue,
      trailingStopPercent,
      hedgeMode,
      marginMode,
      maxOpenTrades,
      minTradeInterval,
      allowedSymbols: allowedSymbols ? JSON.stringify(allowedSymbols) : null,
      blacklistedSymbols: blacklistedSymbols ? JSON.stringify(blacklistedSymbols) : null,
      notifyOnEntry,
      notifyOnExit,
      notifyOnSL,
      notifyOnTP,
      notifyOnError,
      notifyOnNewSignal,
      // Cornix extended features
      directionFilter,
      trailingEntryEnabled,
      trailingEntryPercent,
      trailingEntryActivateDist,
      trailingEntryOnlyIfNotInGrp,
      trailingTPEnabled,
      trailingTPPercent,
      trailingTPActivateAfterTP,
      trailingTPOnlyIfNotInGrp,
      movingTPEnabled,
      movingTPBaseline,
      movingTPOnlyIfNotInGrp,
      limitPriceReductionEnabled,
      limitPriceReductionPercent,
      operationHoursEnabled,
      operationHoursStart,
      operationHoursEnd,
      operationHoursDays: operationHoursDays ? JSON.stringify(operationHoursDays) : "[1,2,3,4,5,6,7]",
      onSignalCancel,
      onSignalEdit,
      onlyUseIfNotDef,
    };

    let config;

    if (id) {
      // Update existing config
      config = await db.botConfig.update({
        where: { id },
        data: configData
      });
    } else {
      // Create new config
      const userId = await getDefaultUserId();
      config = await db.botConfig.create({
        data: {
          userId,
          ...configData,
          accountId,
        }
      });
    }

    // Log the action
    await db.systemLog.create({
      data: {
        level: "INFO",
        category: "SYSTEM",
        message: `Bot config ${id ? 'updated' : 'created'}: ${name}`,
        details: JSON.stringify({ configId: config.id, isActive })
      }
    });

    return NextResponse.json({
      success: true,
      config,
      message: id 
        ? `Конфигурация "${name}" обновлена`
        : `Конфигурация "${name}" создана`,
    });

  } catch (error) {
    console.error("Save bot config error:", error);
    return NextResponse.json(
      { error: "Failed to save config", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// DELETE - Remove bot configuration
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Config ID is required" },
        { status: 400 }
      );
    }

    await db.botConfig.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: "Configuration deleted",
    });

  } catch (error) {
    console.error("Delete bot config error:", error);
    return NextResponse.json(
      { error: "Failed to delete config" },
      { status: 500 }
    );
  }
}
