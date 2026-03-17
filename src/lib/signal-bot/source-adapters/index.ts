/**
 * Signal Adapters
 * Production-ready adapters for different signal sources
 */

import { EventEmitter } from "events";
import type { ISignalAdapter, ParsedSignal, SignalSource } from "../types";

// ==================== TELEGRAM ADAPTER ====================

export class TelegramSignalAdapter extends EventEmitter implements ISignalAdapter {
  readonly type: SignalSource = "TELEGRAM";
  private running: boolean = false;
  private chatIds: string[];
  private keywords: string[];

  constructor(config: { chatIds: string[]; keywords: string[] }) {
    super();
    this.chatIds = config.chatIds;
    this.keywords = config.keywords;
  }

  async start(): Promise<void> {
    this.running = true;
    console.log("[TelegramAdapter] Started monitoring chats:", this.chatIds);
    
    // Note: Actual Telegram integration happens via mini-services/telegram-service
    // This adapter is a placeholder that receives signals from that service
  }

  async stop(): Promise<void> {
    this.running = false;
    console.log("[TelegramAdapter] Stopped");
  }

  isRunning(): boolean {
    return this.running;
  }

  /**
   * Called by Telegram service when a new message is received
   */
  handleMessage(chatId: string, messageId: string, text: string): void {
    if (!this.running) return;
    if (this.chatIds.length > 0 && !this.chatIds.includes(chatId)) return;
    
    // Check if message contains signal keywords
    const hasKeyword = this.keywords.length === 0 || 
      this.keywords.some(kw => text.toLowerCase().includes(kw.toLowerCase()));
    
    if (!hasKeyword) return;

    const signal: ParsedSignal = {
      symbol: "",
      baseAsset: "",
      quoteAsset: "",
      direction: "LONG",
      marketType: "FUTURES",
      signalType: "REGULAR",
      entryPrices: [],
      takeProfits: [],
      source: "TELEGRAM",
      sourceChatId: chatId,
      sourceMessageId: messageId,
      rawMessage: text,
      receivedAt: new Date(),
      confidence: 0.5,
      parsedBy: "telegram-adapter"
    };

    this.emit("signal", signal);
  }

  onSignal(callback: (signal: ParsedSignal) => Promise<void>): void {
    this.on("signal", callback);
  }
}

// ==================== TRADINGVIEW ADAPTER ====================

export class TradingViewSignalAdapter extends EventEmitter implements ISignalAdapter {
  readonly type: SignalSource = "TRADINGVIEW";
  private running: boolean = false;
  private secret?: string;

  constructor(config: { secret?: string }) {
    super();
    this.secret = config.secret;
  }

  async start(): Promise<void> {
    this.running = true;
    console.log("[TradingViewAdapter] Started listening for webhooks");
  }

  async stop(): Promise<void> {
    this.running = false;
    console.log("[TradingViewAdapter] Stopped");
  }

  isRunning(): boolean {
    return this.running;
  }

  /**
   * Verify webhook signature
   */
  verifySignature(payload: string, signature: string): boolean {
    if (!this.secret) return true;
    // In production, use HMAC verification
    return signature === this.secret;
  }

  /**
   * Process TradingView webhook payload
   */
  handleWebhook(payload: Record<string, unknown>, signature?: string): void {
    if (!this.running) return;

    // Verify signature if provided
    if (signature && !this.verifySignature(JSON.stringify(payload), signature)) {
      console.warn("[TradingViewAdapter] Invalid signature");
      return;
    }

    // Convert TradingView alert to signal format
    const direction = String(payload.action || payload.side || "BUY").toUpperCase();
    
    const signal: ParsedSignal = {
      symbol: String(payload.symbol || payload.ticker || ""),
      baseAsset: "",
      quoteAsset: "",
      direction: (direction === "SELL" ? "SHORT" : "LONG") as "LONG" | "SHORT",
      marketType: "FUTURES",
      signalType: "REGULAR",
      entryPrices: payload.price ? [Number(payload.price)] : [],
      takeProfits: payload.take_profit ? [{ price: Number(payload.take_profit), percentage: 100 }] : [],
      stopLoss: payload.stop_loss ? Number(payload.stop_loss) : undefined,
      leverage: payload.leverage ? Number(payload.leverage) : undefined,
      source: "TRADINGVIEW",
      rawMessage: JSON.stringify(payload),
      receivedAt: new Date(),
      confidence: 0.9,
      parsedBy: "tradingview-adapter"
    };

    // Extract base/quote from symbol
    if (signal.symbol) {
      const match = signal.symbol.match(/^([A-Z]+)(USDT|USD|BUSD|BTC|ETH)$/);
      if (match) {
        signal.baseAsset = match[1];
        signal.quoteAsset = match[2];
      }
    }

    this.emit("signal", signal);
  }

  onSignal(callback: (signal: ParsedSignal) => Promise<void>): void {
    this.on("signal", callback);
  }
}

// ==================== CHAT ADAPTER ====================

export class ChatSignalAdapter extends EventEmitter implements ISignalAdapter {
  readonly type: SignalSource = "CHAT";
  private running: boolean = false;
  private roomIds: string[];

  constructor(config: { roomIds: string[] }) {
    super();
    this.roomIds = config.roomIds;
  }

  async start(): Promise<void> {
    this.running = true;
    console.log("[ChatAdapter] Started monitoring rooms:", this.roomIds);
    
    // Note: Actual chat integration happens via mini-services/chat-service
    // This adapter is a placeholder that receives signals from that service
  }

  async stop(): Promise<void> {
    this.running = false;
    console.log("[ChatAdapter] Stopped");
  }

  isRunning(): boolean {
    return this.running;
  }

  /**
   * Called by Chat service when a new signal message is received
   */
  handleMessage(roomId: string, userId: string, message: string): void {
    if (!this.running) return;
    if (this.roomIds.length > 0 && !this.roomIds.includes(roomId)) return;

    const signal: ParsedSignal = {
      symbol: "",
      baseAsset: "",
      quoteAsset: "",
      direction: "LONG",
      marketType: "FUTURES",
      signalType: "REGULAR",
      entryPrices: [],
      takeProfits: [],
      source: "CHAT",
      sourceChatId: roomId,
      sourceMessageId: userId,
      rawMessage: message,
      receivedAt: new Date(),
      confidence: 0.7,
      parsedBy: "chat-adapter"
    };

    this.emit("signal", signal);
  }

  onSignal(callback: (signal: ParsedSignal) => Promise<void>): void {
    this.on("signal", callback);
  }
}

// ==================== FACTORY ====================

export function createAdapter(
  type: SignalSource,
  config: Record<string, unknown>
): ISignalAdapter {
  switch (type) {
    case "TELEGRAM":
      return new TelegramSignalAdapter({
        chatIds: (config.chatIds as string[]) || [],
        keywords: (config.keywords as string[]) || []
      });
    case "TRADINGVIEW":
      return new TradingViewSignalAdapter({
        secret: config.secret as string | undefined
      });
    case "CHAT":
      return new ChatSignalAdapter({
        roomIds: (config.roomIds as string[]) || []
      });
    default:
      throw new Error(`Unknown adapter type: ${type}`);
  }
}

export default {
  TelegramSignalAdapter,
  TradingViewSignalAdapter,
  ChatSignalAdapter,
  createAdapter
};
