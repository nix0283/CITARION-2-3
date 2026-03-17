/**
 * Signal Bot Engine - Production Ready
 */

import { EventEmitter } from "events";
import { db } from "@/lib/db";
import {
  type ParsedSignal,
  type SignalExecutionResult,
  type TypedSignalBotConfig,
  type SignalBotState,
  type ISignalAdapter,
  type SignalSource,
  toTypedConfig
} from "./types";
import { parseSignal as parseSignalBase } from "@/lib/signal-parser";

interface ExtendedParsedSignal {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  direction: "LONG" | "SHORT";
  marketType: "SPOT" | "FUTURES";
  signalType: "REGULAR" | "BREAKOUT";
  entryPrices: number[];
  takeProfits: Array<{ price: number; percentage: number }>;
  stopLoss?: number;
  leverage?: number;
  leverageType?: "ISOLATED" | "CROSS";
  rawMessage: string;
  source: SignalSource;
  sourceChatId?: string;
  sourceMessageId?: string;
  receivedAt: Date;
  confidence: number;
  parsedBy: string;
}

export class SignalBotEngine extends EventEmitter {
  private id: string;
  private config: TypedSignalBotConfig;
  private state: SignalBotState;
  private adapters: Map<SignalSource, ISignalAdapter> = new Map();
  private running: boolean = false;

  constructor(config: TypedSignalBotConfig) {
    super();
    this.id = config.id;
    this.config = config;
    this.state = {
      id: config.id,
      configId: config.id,
      status: "STOPPED",
      signalsReceived: 0,
      signalsExecuted: 0,
      signalsFiltered: 0,
      signalsFailed: 0,
      activeAdapters: [],
      errors: []
    };
  }

  async start(): Promise<void> {
    if (this.running) return;
    
    this.state.status = "STARTING";

    if (this.config.telegram.enabled) this.state.activeAdapters.push("TELEGRAM");
    if (this.config.tradingView.enabled) this.state.activeAdapters.push("TRADINGVIEW");
    if (this.config.chat.enabled) this.state.activeAdapters.push("CHAT");

    this.running = true;
    this.state.status = "RUNNING";
    this.state.startedAt = new Date();
    
    this.emit("bot_started", { botId: this.id });
    console.log(`[SignalBot ${this.id}] Started`);
  }

  async stop(): Promise<void> {
    if (!this.running) return;

    this.state.status = "STOPPING";
    
    for (const [, adapter] of this.adapters) {
      if (adapter.isRunning()) await adapter.stop();
    }
    
    this.adapters.clear();
    this.state.activeAdapters = [];
    this.running = false;
    this.state.status = "STOPPED";
    this.state.stoppedAt = new Date();
    
    this.emit("bot_stopped", { botId: this.id });
  }

  async processSignal(
    rawMessage: string, 
    source: SignalSource, 
    metadata?: { chatId?: string; messageId?: string }
  ): Promise<SignalExecutionResult> {
    const signalId = `sig-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    this.state.signalsReceived++;
    this.state.lastSignalAt = new Date();

    try {
      const parsed = parseSignalBase(rawMessage);
      
      if (!parsed) {
        return this.handleError(signalId, rawMessage, source, metadata, "Failed to parse signal");
      }

      const extendedSignal: ExtendedParsedSignal = {
        ...parsed,
        rawMessage,
        source,
        sourceChatId: metadata?.chatId,
        sourceMessageId: metadata?.messageId,
        receivedAt: new Date(),
        parsedBy: "engine"
      };

      // Create record
      const record = await db.signalRecord.create({
        data: {
          signalBotId: this.id,
          source,
          sourceChatId: metadata?.chatId ?? null,
          sourceMessageId: metadata?.messageId ?? null,
          rawMessage,
          parsedSignal: JSON.stringify(extendedSignal),
          status: "PROCESSING",
          receivedAt: new Date()
        }
      });

      // Filter
      const filterResult = this.filterSignal(extendedSignal);
      
      if (!filterResult.passed) {
        await db.signalRecord.update({
          where: { id: record.id },
          data: { 
            status: "FILTERED", 
            filterReason: filterResult.reasons.join("; "),
            processedAt: new Date()
          }
        });
        this.state.signalsFiltered++;
        
        return { success: false, signalId, recordId: record.id, filterReasons: filterResult.reasons };
      }

      // Execute
      const result = await this.executeSignal(extendedSignal, record.id);
      
      if (result.success) {
        this.state.signalsExecuted++;
      } else {
        this.state.signalsFailed++;
      }

      return result;

    } catch (error) {
      this.state.signalsFailed++;
      const errorMsg = error instanceof Error ? error.message : String(error);
      return { success: false, signalId, error: errorMsg };
    }
  }

  private filterSignal(signal: ExtendedParsedSignal): { passed: boolean; reasons: string[] } {
    const reasons: string[] = [];

    if (this.config.allowedSymbols.length > 0 && !this.config.allowedSymbols.includes(signal.symbol)) {
      reasons.push(`Symbol ${signal.symbol} not allowed`);
    }

    if (this.config.blockedSymbols.includes(signal.symbol)) {
      reasons.push(`Symbol ${signal.symbol} is blocked`);
    }

    if (this.config.directionFilter !== "BOTH" && signal.direction !== this.config.directionFilter) {
      reasons.push(`Direction ${signal.direction} not allowed`);
    }

    if (this.config.requireSL && !signal.stopLoss) {
      reasons.push("Stop Loss required");
    }

    if (this.config.requireTP && signal.takeProfits.length === 0) {
      reasons.push("Take Profit required");
    }

    return { passed: reasons.length === 0, reasons };
  }

  private async executeSignal(signal: ExtendedParsedSignal, recordId: string): Promise<SignalExecutionResult> {
    try {
      const counter = await db.signalIdCounter.upsert({
        where: { id: "signal_counter" },
        create: { id: "signal_counter", lastId: 1 },
        update: { lastId: { increment: 1 } }
      });

      const dbSignal = await db.signal.create({
        data: {
          userId: this.config.userId,
          signalId: counter.lastId,
          source: signal.source,
          sourceChannel: signal.sourceChatId ?? null,
          sourceMessage: signal.rawMessage,
          symbol: signal.symbol,
          direction: signal.direction,
          action: "BUY",
          marketType: signal.marketType,
          entryPrices: JSON.stringify(signal.entryPrices),
          takeProfits: JSON.stringify(signal.takeProfits),
          stopLoss: signal.stopLoss ?? null,
          leverage: signal.leverage ?? this.config.leverage.default,
          status: "PENDING"
        }
      });

      await db.signalRecord.update({
        where: { id: recordId },
        data: { status: "EXECUTED", executedAt: new Date(), positionId: dbSignal.id, processedAt: new Date() }
      });

      await db.signalBotConfig.update({
        where: { id: this.id },
        data: { lastSignalAt: new Date() }
      });

      return { success: true, signalId: dbSignal.id, recordId, positionId: dbSignal.id, executedAt: new Date() };

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      
      await db.signalRecord.update({
        where: { id: recordId },
        data: { status: "FAILED", errorMessage: errorMsg, processedAt: new Date() }
      });

      return { success: false, signalId: "", recordId, error: errorMsg };
    }
  }

  private handleError(
    signalId: string,
    rawMessage: string,
    source: SignalSource,
    metadata: { chatId?: string; messageId?: string } | undefined,
    error: string
  ): SignalExecutionResult {
    return { success: false, signalId, error };
  }

  registerAdapter(source: SignalSource, adapter: ISignalAdapter): void {
    this.adapters.set(source, adapter);
    adapter.onSignal(async (sig) => {
      await this.processSignal(sig.rawMessage, sig.source, {
        chatId: sig.sourceChatId,
        messageId: sig.sourceMessageId
      });
    });
  }

  getId(): string { return this.id; }
  getState(): SignalBotState { return { ...this.state }; }
  getConfig(): TypedSignalBotConfig { return { ...this.config }; }
  isRunning(): boolean { return this.running; }
}

export async function createSignalBotEngine(configId: string): Promise<SignalBotEngine | null> {
  const config = await db.signalBotConfig.findUnique({ where: { id: configId } });
  if (!config) return null;
  return new SignalBotEngine(toTypedConfig(config));
}

export default SignalBotEngine;
