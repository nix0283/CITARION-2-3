/**
 * Signal Bot Types
 * Production-ready TypeScript definitions for Signal Bot Engine
 */

import type { SignalBotConfig, SignalRecord } from "@prisma/client";

// ==================== SIGNAL SOURCE TYPES ====================

export type SignalSource = "TELEGRAM" | "TRADINGVIEW" | "CHAT" | "MANUAL" | "WEBHOOK";

export type SignalStatus = 
  | "PENDING" 
  | "PROCESSING" 
  | "EXECUTED" 
  | "FILTERED" 
  | "FAILED" 
  | "CANCELLED"
  | "PARTIAL";

export type Direction = "LONG" | "SHORT";

export type MarketType = "SPOT" | "FUTURES";

export type SignalType = "REGULAR" | "BREAKOUT";

// ==================== PARSED SIGNAL ====================

export interface ParsedSignal {
  // Identification
  id?: string;
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  direction: Direction;
  marketType: MarketType;
  signalType: SignalType;
  
  // Entry
  entryPrices: number[];
  entryZone?: { min: number; max: number };
  entryWeights?: number[];
  isMarketEntry?: boolean;
  isBreakout?: boolean;
  breakoutTrigger?: number;
  
  // Exit
  takeProfits: Array<{ price: number; percentage: number }>;
  stopLoss?: number;
  
  // Risk
  leverage?: number;
  leverageType?: "ISOLATED" | "CROSS";
  amountPerTrade?: number;
  riskPercentage?: number;
  
  // Source metadata
  source: SignalSource;
  sourceChatId?: string;
  sourceMessageId?: string;
  rawMessage: string;
  
  // Timing
  receivedAt: Date;
  expiresAt?: Date;
  
  // Confidence
  confidence: number;
  parsedBy: string;
  
  // Additional fields for adapter compatibility
  action?: "BUY" | "SELL" | "CLOSE";
}

// ==================== SIGNAL FILTER RESULT ====================

export interface SignalFilterResult {
  passed: boolean;
  signal: ParsedSignal;
  filters: Array<{
    name: string;
    passed: boolean;
    reason?: string;
  }>;
  score: number;
}

// ==================== SIGNAL EXECUTION RESULT ====================

export interface SignalExecutionResult {
  success: boolean;
  signalId: string;
  recordId?: string;
  positionId?: string;
  tradeIds?: string[];
  error?: string;
  executedAt?: Date;
  filterReasons?: string[];
}

// ==================== SIGNAL BOT CONFIG (Typed) ====================

export interface TypedSignalBotConfig {
  id: string;
  userId: string;
  accountId?: string;
  name: string;
  description?: string;
  isActive: boolean;
  
  // Signal Sources
  telegram: {
    enabled: boolean;
    chatIds: string[];
    keywords: string[];
  };
  tradingView: {
    enabled: boolean;
    secret?: string;
  };
  chat: {
    enabled: boolean;
    roomIds: string[];
  };
  
  // Filtering
  allowedSymbols: string[];
  blockedSymbols: string[];
  directionFilter: "LONG" | "SHORT" | "BOTH";
  minRiskReward?: number;
  maxRiskPercent: number;
  requireSL: boolean;
  requireTP: boolean;
  maxEntryDistance?: number;
  
  // Execution
  positionSize: {
    type: "FIXED" | "PERCENT" | "RISK_BASED";
    value: number;
  };
  leverage: {
    max: number;
    default: number;
    mode: "ISOLATED" | "CROSS";
  };
  defaultSLPercent?: number;
  defaultTPPercent?: number;
  tpStrategy: string;
  
  // Risk Management
  maxOpenTrades: number;
  maxTradesPerSymbol: number;
  maxConcurrentAmount?: number;
  minSymbolPrice?: number;
  minSymbolVolume?: number;
  autoCancelTimeout: number;
  slLeverageAdjust: {
    enabled: boolean;
    percent: number;
  };
  
  // Timing
  operationHours: {
    enabled: boolean;
    start: number;
    end: number;
    days: number[];
  };
  cooldownBetweenTrades: number;
  
  // Notifications
  notifications: {
    onSignal: boolean;
    onEntry: boolean;
    onExit: boolean;
    onError: boolean;
  };
}

// ==================== SIGNAL ADAPTER INTERFACE ====================

export interface ISignalAdapter {
  type: SignalSource;
  start(): Promise<void>;
  stop(): Promise<void>;
  onSignal(callback: (signal: ParsedSignal) => Promise<void>): void;
  isRunning(): boolean;
}

// ==================== SIGNAL QUEUE ITEM ====================

export interface SignalQueueItem {
  id: string;
  signal: ParsedSignal;
  botConfigId: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  addedAt: Date;
  attempts: number;
  maxAttempts: number;
  lastError?: string;
  status: SignalStatus;
}

// ==================== SIGNAL BOT EVENT ====================

export type SignalBotEventType = 
  | "signal_received"
  | "signal_parsed"
  | "signal_filtered"
  | "signal_executing"
  | "signal_executed"
  | "signal_failed"
  | "bot_started"
  | "bot_stopped"
  | "error";

export interface SignalBotEvent {
  type: SignalBotEventType;
  botId: string;
  timestamp: Date;
  data: Record<string, unknown>;
  error?: Error;
}

// ==================== SIGNAL BOT STATE ====================

export interface SignalBotState {
  id: string;
  configId: string;
  status: "STOPPED" | "STARTING" | "RUNNING" | "STOPPING" | "ERROR";
  startedAt?: Date;
  stoppedAt?: Date;
  lastSignalAt?: Date;
  signalsReceived: number;
  signalsExecuted: number;
  signalsFiltered: number;
  signalsFailed: number;
  activeAdapters: SignalSource[];
  errors: Array<{ timestamp: Date; message: string }>;
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Convert Prisma SignalBotConfig to typed config
 */
export function toTypedConfig(config: SignalBotConfig): TypedSignalBotConfig {
  return {
    id: config.id,
    userId: config.userId,
    accountId: config.accountId ?? undefined,
    name: config.name,
    description: config.description ?? undefined,
    isActive: config.isActive,
    
    telegram: {
      enabled: config.telegramEnabled,
      chatIds: JSON.parse(config.telegramChatIds || "[]"),
      keywords: JSON.parse(config.telegramKeywords || "[]")
    },
    tradingView: {
      enabled: config.tradingViewEnabled,
      secret: config.tradingViewSecret ?? undefined
    },
    chat: {
      enabled: config.chatEnabled,
      roomIds: JSON.parse(config.chatRoomIds || "[]")
    },
    
    allowedSymbols: config.allowedSymbols ? JSON.parse(config.allowedSymbols) : [],
    blockedSymbols: JSON.parse(config.blockedSymbols || "[]"),
    directionFilter: config.directionFilter as "LONG" | "SHORT" | "BOTH",
    minRiskReward: config.minRiskReward ?? undefined,
    maxRiskPercent: config.maxRiskPercent,
    requireSL: config.requireSL,
    requireTP: config.requireTP,
    maxEntryDistance: config.maxEntryDistance ?? undefined,
    
    positionSize: {
      type: config.positionSizeType as "FIXED" | "PERCENT" | "RISK_BASED",
      value: config.positionSizeValue
    },
    leverage: {
      max: config.maxLeverage,
      default: config.defaultLeverage,
      mode: config.leverageMode as "ISOLATED" | "CROSS"
    },
    defaultSLPercent: config.defaultSLPercent ?? undefined,
    defaultTPPercent: config.defaultTPPercent ?? undefined,
    tpStrategy: config.tpStrategy,
    
    maxOpenTrades: config.maxOpenTrades,
    maxTradesPerSymbol: config.maxTradesPerSymbol,
    maxConcurrentAmount: config.maxConcurrentAmount ?? undefined,
    minSymbolPrice: config.minSymbolPrice ?? undefined,
    minSymbolVolume: config.minSymbolVolume ?? undefined,
    autoCancelTimeout: config.autoCancelTimeout,
    slLeverageAdjust: {
      enabled: config.slLeverageAdjustEnabled,
      percent: config.slLeverageAdjustPercent
    },
    
    operationHours: {
      enabled: config.operationHoursEnabled,
      start: config.operationHoursStart,
      end: config.operationHoursEnd,
      days: JSON.parse(config.operationHoursDays || "[1,2,3,4,5,6,7]")
    },
    cooldownBetweenTrades: config.cooldownBetweenTrades,
    
    notifications: {
      onSignal: config.notifyOnSignal,
      onEntry: config.notifyOnEntry,
      onExit: config.notifyOnExit,
      onError: config.notifyOnError
    }
  };
}

/**
 * Create SignalRecord from parsed signal
 */
export function createSignalRecordData(
  signal: ParsedSignal,
  botConfigId: string,
  status: SignalStatus = "PENDING"
): Omit<SignalRecord, "id" | "signalBot"> {
  return {
    signalBotId: botConfigId,
    source: signal.source,
    sourceChatId: signal.sourceChatId ?? null,
    sourceMessageId: signal.sourceMessageId ?? null,
    rawMessage: signal.rawMessage,
    parsedSignal: JSON.stringify(signal),
    status,
    filterReason: null,
    errorMessage: null,
    executedAt: null,
    positionId: null,
    tradeIds: null,
    pnl: null,
    pnlPercent: null,
    processedAt: null,
    receivedAt: signal.receivedAt
  } as Omit<SignalRecord, "id" | "signalBot">;
}
