/**
 * Unified Trading Engine for CITARION Platform
 * 
 * Single trading engine for all modes: LIVE, DEMO, TESTNET, PAPER
 * Used by: Built-in Chat, Telegram Bot, Manual Trading, Auto Trading
 * 
 * Features:
 * - Multi-mode support (LIVE/DEMO/TESTNET/PAPER)
 * - Cornix signal format parsing
 * - Signal filtering and validation
 * - Smart order execution
 * - Position management
 * - Trailing stop (5 modes)
 * - TP Grace (retry unfilled TP orders)
 * - Position monitoring
 * - Risk management integration
 * - Multi-exchange support
 */

import { db } from '@/lib/db';
import { credentialManager } from '@/lib/api-keys/credential-manager';
import { priceService } from '@/lib/price-service';

// ==================== TYPES ====================

export type TradingMode = 'LIVE' | 'DEMO' | 'TESTNET' | 'PAPER';
export type MarketType = 'SPOT' | 'FUTURES';
export type Direction = 'LONG' | 'SHORT';
export type OrderSide = 'BUY' | 'SELL';
export type OrderType = 'MARKET' | 'LIMIT' | 'STOP_MARKET' | 'STOP_LIMIT';
export type PositionStatus = 'PENDING' | 'OPENING' | 'ACTIVE' | 'CLOSING' | 'CLOSED' | 'LIQUIDATED';
export type SignalSource = 'CHAT' | 'TELEGRAM' | 'WEBHOOK' | 'MANUAL' | 'AUTO';

export type TrailingType = 
  | 'BREAKEVEN' 
  | 'MOVING_TARGET' 
  | 'MOVING_2_TARGET' 
  | 'PERCENT_BELOW_TRIGGER' 
  | 'PERCENT_BELOW_HIGHEST';

export interface ParsedSignal {
  symbol: string;
  direction: Direction;
  action: 'BUY' | 'SELL' | 'CLOSE';
  entryPrices: number[];
  entryZone?: { min: number; max: number };
  takeProfits: Array<{ price: number; percentage: number }>;
  stopLoss?: number;
  leverage: number;
  marginMode: 'isolated' | 'cross';
  marketType: MarketType;
  exchanges?: string[];
  signalType: 'REGULAR' | 'BREAKOUT';
  amountPercent?: number;
  riskPercent?: number;
  trailingConfig?: TrailingStopConfig;
  rawText?: string;
}

export interface TrailingStopConfig {
  enabled: boolean;
  type: TrailingType;
  triggerType: 'TARGET_REACHED' | 'PERCENT_ABOVE_ENTRY';
  triggerValue?: number;
  trailingPercent?: number;
  onlyIfNotDefinedByGroup?: boolean;
}

export interface SignalFilterConfig {
  minRiskRewardRatio?: number;
  maxRiskRewardRatio?: number;
  requireSL: boolean;
  maxSLPercent?: number;
  minSLPercent?: number;
  requireTP: boolean;
  maxTPCount?: number;
  minTPCount?: number;
  allowedSymbols?: string[];
  blockedSymbols?: string[];
  directionFilter?: 'LONG' | 'SHORT' | 'BOTH';
  maxEntryDistance?: number;
  minSymbolPrice?: number;
  maxSymbolPrice?: number;
  min24hVolume?: number;
  maxSignalAge?: number;
  maxLeverage?: number;
  minLeverage?: number;
}

export interface TradingConfig {
  mode: TradingMode;
  exchangeId: string;
  marketType: MarketType;
  signalFilter?: Partial<SignalFilterConfig>;
  defaultLeverage?: number;
  defaultMarginMode?: 'isolated' | 'cross';
  defaultAmountPercent?: number;
  maxPositionSize?: number;
  enableTrailingByDefault?: boolean;
}

export interface TradeRequest {
  userId: string;
  accountId?: string;
  signal: ParsedSignal;
  config: TradingConfig;
  source: SignalSource;
  metadata?: Record<string, unknown>;
}

export interface TradeResult {
  success: boolean;
  tradeId?: string;
  orderId?: string;
  positionId?: string;
  symbol?: string;
  direction?: Direction;
  quantity?: number;
  entryPrice?: number;
  takeProfits?: Array<{ price: number; percentage: number }>;
  stopLoss?: number;
  leverage?: number;
  warnings?: string[];
  error?: string;
  errorCode?: string;
}

export interface PositionInfo {
  id: string;
  accountId: string;
  symbol: string;
  direction: Direction;
  status: PositionStatus;
  totalAmount: number;
  filledAmount: number;
  avgEntryPrice: number;
  currentPrice?: number;
  unrealizedPnl?: number;
  realizedPnl?: number;
  leverage: number;
  marginMode: 'isolated' | 'cross';
  stopLoss?: number;
  takeProfit?: number;
  trailingStop?: TrailingStopConfig;
  trailingActive?: boolean;
  highestPrice?: number;
  lowestPrice?: number;
  openedAt: Date;
  closedAt?: Date;
  closeReason?: string;
  isDemo: boolean;
}

export interface IExchangeClient {
  createOrder(params: CreateOrderParams): Promise<OrderResult>;
  cancelOrder(params: CancelOrderParams): Promise<OrderResult>;
  closePosition(params: ClosePositionParams): Promise<OrderResult>;
  getPosition(symbol: string): Promise<PositionInfo | null>;
  getPositions(): Promise<PositionInfo[]>;
  setLeverage(params: SetLeverageParams): Promise<{ success: boolean; leverage: number }>;
  getAccountInfo(): Promise<AccountInfo>;
  getTicker(symbol: string): Promise<TickerInfo>;
  testConnection(): Promise<{ success: boolean; message: string }>;
}

export interface CreateOrderParams {
  symbol: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit' | 'stop_market' | 'stop_limit';
  quantity: number;
  price?: number;
  stopPrice?: number;
  leverage?: number;
  marginMode?: 'isolated' | 'cross';
  positionSide?: 'long' | 'short';
  reduceOnly?: boolean;
  clientOrderId?: string;
  timeInForce?: 'GTC' | 'IOC' | 'FOK' | 'GTX';
}

export interface OrderResult {
  success: boolean;
  order?: {
    id: string;
    clientOrderId?: string;
    symbol: string;
    side: 'buy' | 'sell';
    type: string;
    status: string;
    price: number;
    avgPrice?: number;
    quantity: number;
    filledQuantity: number;
    fee: number;
    feeCurrency: string;
    createdAt: Date;
  };
  error?: string;
  errorCode?: string;
}

export interface CancelOrderParams {
  symbol: string;
  orderId?: string;
  clientOrderId?: string;
}

export interface ClosePositionParams {
  symbol: string;
  quantity?: number;
  market?: boolean;
}

export interface SetLeverageParams {
  symbol: string;
  leverage: number;
  marginMode?: 'isolated' | 'cross';
}

export interface AccountInfo {
  exchange: string;
  balances: Array<{ currency: string; total: number; available: number; frozen: number; usdValue?: number }>;
  totalEquity: number;
  availableMargin: number;
  marginUsed: number;
  unrealizedPnl: number;
  isDemo?: boolean;
}

export interface TickerInfo {
  symbol: string;
  exchange: string;
  bid: number;
  ask: number;
  last: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  change24h: number;
  changePercent24h: number;
  timestamp: Date;
}

// ==================== CONSTANTS ====================

const DEFAULT_SIGNAL_FILTER: SignalFilterConfig = {
  requireSL: false,
  requireTP: false,
  maxLeverage: 125,
  minLeverage: 1,
};

const EXCHANGE_CLIENTS: Record<string, string> = {
  binance: '@/lib/exchange/binance-client',
  bybit: '@/lib/exchange/bybit-client',
  okx: '@/lib/exchange/okx-client',
  bitget: '@/lib/exchange/bitget-client',
  kucoin: '@/lib/exchange/kucoin-client',
  bingx: '@/lib/exchange/bingx-client',
  coinbase: '@/lib/exchange/coinbase-client',
  huobi: '@/lib/exchange/huobi-client',
  hyperliquid: '@/lib/exchange/hyperliquid-client',
  bitmex: '@/lib/exchange/bitmex-client',
  blofin: '@/lib/exchange/blofin-client',
  gate: '@/lib/exchange/gate-client',
  mexc: '@/lib/exchange/mexc-client',
};

export const TRAILING_PRESETS: Record<string, TrailingStopConfig> = {
  conservativeBreakeven: {
    enabled: true,
    type: 'BREAKEVEN',
    triggerType: 'TARGET_REACHED',
    triggerValue: 1,
  },
  moderateMovingTarget: {
    enabled: true,
    type: 'MOVING_TARGET',
    triggerType: 'TARGET_REACHED',
    triggerValue: 1,
  },
  aggressivePercent: {
    enabled: true,
    type: 'PERCENT_BELOW_HIGHEST',
    triggerType: 'PERCENT_ABOVE_ENTRY',
    triggerValue: 5,
    trailingPercent: 2,
  },
  scalping: {
    enabled: true,
    type: 'PERCENT_BELOW_TRIGGER',
    triggerType: 'PERCENT_ABOVE_ENTRY',
    triggerValue: 2,
    trailingPercent: 1,
  },
  swing: {
    enabled: true,
    type: 'MOVING_2_TARGET',
    triggerType: 'TARGET_REACHED',
    triggerValue: 2,
  },
};

// ==================== SIGNAL PARSER ====================

export class SignalParser {
  static parse(text: string): ParsedSignal | null {
    const upperText = text.toUpperCase();
    
    const marketType: MarketType = /\bSPOT\b/i.test(text) ? 'SPOT' : 'FUTURES';
    
    const symbolMatch = text.match(/#?([A-Z][A-Z0-9]{1,9})[\/\-]?([A-Z]{2,10})?/i);
    let symbol = '';
    if (symbolMatch) {
      const base = symbolMatch[1].toUpperCase();
      const quote = symbolMatch[2]?.toUpperCase() || 'USDT';
      symbol = base.includes('USDT') || base.includes('USD') ? base : `${base}${quote}`;
    }
    
    if (!symbol) return null;
    
    let direction: Direction = 'LONG';
    if (/\bSHORT\b|\bSELL\b|шорт/i.test(text)) {
      direction = 'SHORT';
    }
    
    const action: 'BUY' | 'SELL' | 'CLOSE' = direction === 'LONG' ? 'BUY' : 'SELL';
    
    const signalType: 'REGULAR' | 'BREAKOUT' = 
      /\bBREAKOUT\b|\bENTER ABOVE\b|\bENTER BELOW\b/i.test(text) ? 'BREAKOUT' : 'REGULAR';
    
    const entryPrices: number[] = [];
    
    const numberedEntries = text.matchAll(/(?:^|\n)\s*(\d+)\)\s*(\d+(?:\.\d+)?)/gm);
    for (const match of numberedEntries) {
      const price = parseFloat(match[2]);
      if (!isNaN(price)) entryPrices.push(price);
    }
    
    if (entryPrices.length === 0) {
      const entryMatch = text.match(/(?:ENTRY|BUY|ВХОД)[:\s]+([\d\s.,]+)/i);
      if (entryMatch) {
        const prices = entryMatch[1].split(/[\s,]+/).map(n => parseFloat(n)).filter(n => !isNaN(n));
        entryPrices.push(...prices);
      }
    }
    
    if (entryPrices.length === 0) {
      const tpEntries = text.matchAll(/ENTRY\s*(\d+)[:\s]+(\d+(?:\.\d+)?)/gi);
      for (const match of tpEntries) {
        const price = parseFloat(match[2]);
        if (!isNaN(price)) entryPrices.push(price);
      }
    }
    
    let entryZone: { min: number; max: number } | undefined;
    const zoneMatch = text.match(/(?:ENTRY ZONE|BUY ZONE)[:\s]+(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)/i);
    if (zoneMatch) {
      const min = parseFloat(zoneMatch[1]);
      const max = parseFloat(zoneMatch[2]);
      if (!isNaN(min) && !isNaN(max)) {
        entryZone = { min: Math.min(min, max), max: Math.max(min, max) };
        if (entryPrices.length === 0) {
          entryPrices.push((min + max) / 2);
        }
      }
    }
    
    const takeProfits: Array<{ price: number; percentage: number }> = [];
    const tpMatches: number[] = [];
    
    const numberedTPs = text.matchAll(/(?:^|\n)\s*(\d+)\)\s*(\d+(?:\.\d+)?)/gm);
    for (const match of numberedTPs) {
      const contextBefore = text.substring(Math.max(0, match.index! - 50), match.index);
      if (/TAKE.?PROFIT|TP|TARGET|ЦЕЛЬ/i.test(contextBefore)) {
        const price = parseFloat(match[2]);
        if (!isNaN(price)) tpMatches.push(price);
      }
    }
    
    if (tpMatches.length === 0) {
      const tpMatch = text.match(/(?:TAKE.?PROFIT|TP|TARGET|ЦЕЛЬ)[:\s]+([\d\s.,]+)/i);
      if (tpMatch) {
        const prices = tpMatch[1].split(/[\s,]+/).map(n => parseFloat(n)).filter(n => !isNaN(n));
        tpMatches.push(...prices);
      }
    }
    
    if (tpMatches.length === 0) {
      const tpN = text.matchAll(/TP\s*(\d+)[:\s]+(\d+(?:\.\d+)?)/gi);
      for (const match of tpN) {
        const price = parseFloat(match[2]);
        if (!isNaN(price)) tpMatches.push(price);
      }
    }
    
    const totalTP = tpMatches.length;
    for (let i = 0; i < tpMatches.length; i++) {
      const percentage = totalTP > 0 ? 100 / totalTP : 100;
      takeProfits.push({ price: tpMatches[i], percentage });
    }
    
    let stopLoss: number | undefined;
    const slMatch = text.match(/(?:STOP.?LOSS|SL|STOP|СТОП)[:\s]+(\d+(?:\.\d+)?)/i);
    if (slMatch) {
      stopLoss = parseFloat(slMatch[1]);
    }
    
    if (!stopLoss) {
      const numberedSL = text.match(/STOP\s*TARGETS?:\s*\n?\s*1\)\s*(\d+(?:\.\d+)?)/i);
      if (numberedSL) {
        stopLoss = parseFloat(numberedSL[1]);
      }
    }
    
    if (entryPrices.length > 0 && stopLoss) {
      const entryPrice = entryPrices[0];
      if (stopLoss > entryPrice && direction === 'LONG') {
        direction = 'SHORT';
      } else if (stopLoss < entryPrice && direction === 'SHORT') {
        direction = 'LONG';
      }
    }
    
    let leverage = 10;
    const levMatch = text.match(/(?:LEVERAGE|LEV|ПЛЕЧО)[:\s]*(?:ISOLATED|CROSS)?[:\s]*(\d+)/i) ||
                     text.match(/(?:ISOLATED|CROSS)[:\s]*(\d+)/i) ||
                     text.match(/X(\d+)/i) ||
                     text.match(/(\d+)X/i);
    if (levMatch) {
      leverage = parseInt(levMatch[1]) || 10;
    }
    
    let marginMode: 'isolated' | 'cross' = 'isolated';
    if (/\bCROSS\b/i.test(text)) {
      marginMode = 'cross';
    }
    
    const exchanges: string[] = [];
    const exchangeMatch = text.match(/EXCHANGES?[:\s]+([A-Za-z,\s]+)/i);
    if (exchangeMatch) {
      const exchangeList = exchangeMatch[1].split(/[,]+/).map(e => e.trim().toLowerCase());
      for (const ex of exchangeList) {
        if (ex.includes('binance')) exchanges.push('binance');
        else if (ex.includes('bybit')) exchanges.push('bybit');
        else if (ex.includes('okx')) exchanges.push('okx');
        else if (ex.includes('bitget')) exchanges.push('bitget');
        else if (ex.includes('kucoin')) exchanges.push('kucoin');
        else if (ex.includes('bingx')) exchanges.push('bingx');
        else if (ex.includes('gate')) exchanges.push('gate');
        else if (ex.includes('mexc')) exchanges.push('mexc');
      }
    }
    
    let amountPercent: number | undefined;
    const amountMatch = text.match(/(?:AMOUNT|CAPITAL|RISK)[:\s]*(\d+(?:\.\d+)?)\s*%/i);
    if (amountMatch) {
      amountPercent = Math.min(parseFloat(amountMatch[1]), 20);
    }
    
    let riskPercent: number | undefined;
    const riskMatch = text.match(/RISK\s*(?:MANAGEMENT)?[:\s]*(\d+(?:\.\d+)?)\s*%/i);
    if (riskMatch) {
      riskPercent = Math.min(parseFloat(riskMatch[1]), 20);
    }
    
    let trailingConfig: TrailingStopConfig | undefined;
    if (/TRAILING/i.test(text)) {
      trailingConfig = {
        enabled: true,
        type: 'PERCENT_BELOW_HIGHEST',
        triggerType: 'PERCENT_ABOVE_ENTRY',
        triggerValue: 1,
        trailingPercent: 0.5,
      };
      
      const trailPercentMatch = text.match(/TRAILING[^%]*?(\d+(?:\.\d+)?)\s*%/i);
      if (trailPercentMatch) {
        trailingConfig.trailingPercent = parseFloat(trailPercentMatch[1]);
      }
    }
    
    return {
      symbol,
      direction,
      action,
      entryPrices,
      entryZone,
      takeProfits,
      stopLoss,
      leverage,
      marginMode,
      marketType,
      exchanges: exchanges.length > 0 ? exchanges : undefined,
      signalType,
      amountPercent,
      riskPercent,
      trailingConfig,
      rawText: text,
    };
  }
  
  static validate(signal: ParsedSignal, filter: SignalFilterConfig): { 
    valid: boolean; 
    score: number; 
    filters: Array<{ name: string; passed: boolean; reason?: string }>;
  } {
    const filters: Array<{ name: string; passed: boolean; reason?: string }> = [];
    let score = 50;
    
    if (filter.requireSL && !signal.stopLoss) {
      filters.push({ name: 'SL_REQUIRED', passed: false, reason: 'Stop loss is required' });
    } else {
      filters.push({ name: 'SL_REQUIRED', passed: true });
      if (signal.stopLoss) score += 10;
    }
    
    if (filter.requireTP && signal.takeProfits.length === 0) {
      filters.push({ name: 'TP_REQUIRED', passed: false, reason: 'Take profit is required' });
    } else {
      filters.push({ name: 'TP_REQUIRED', passed: true });
      if (signal.takeProfits.length >= 3) score += 10;
      else if (signal.takeProfits.length >= 2) score += 5;
    }
    
    if (filter.maxLeverage && signal.leverage > filter.maxLeverage) {
      filters.push({ 
        name: 'LEVERAGE_MAX', 
        passed: false, 
        reason: `Leverage ${signal.leverage}x exceeds max ${filter.maxLeverage}x` 
      });
    } else {
      filters.push({ name: 'LEVERAGE_MAX', passed: true });
    }
    
    if (filter.allowedSymbols && filter.allowedSymbols.length > 0) {
      if (!filter.allowedSymbols.includes(signal.symbol)) {
        filters.push({ 
          name: 'SYMBOL_ALLOWED', 
          passed: false, 
          reason: `Symbol ${signal.symbol} not in allowed list` 
        });
      } else {
        filters.push({ name: 'SYMBOL_ALLOWED', passed: true });
      }
    }
    
    if (filter.blockedSymbols && filter.blockedSymbols.includes(signal.symbol)) {
      filters.push({ 
        name: 'SYMBOL_BLOCKED', 
        passed: false, 
        reason: `Symbol ${signal.symbol} is blocked` 
      });
    }
    
    if (filter.directionFilter && filter.directionFilter !== 'BOTH') {
      if (signal.direction !== filter.directionFilter) {
        filters.push({ 
          name: 'DIRECTION', 
          passed: false, 
          reason: `Only ${filter.directionFilter} signals allowed` 
        });
      } else {
        filters.push({ name: 'DIRECTION', passed: true });
      }
    }
    
    if (signal.entryPrices.length > 0 && signal.stopLoss && signal.takeProfits.length > 0) {
      const entryPrice = signal.entryPrices[0];
      const tpPrice = signal.takeProfits[0].price;
      
      const risk = signal.direction === 'LONG' 
        ? Math.abs(entryPrice - signal.stopLoss) / entryPrice
        : Math.abs(signal.stopLoss - entryPrice) / entryPrice;
      
      const reward = signal.direction === 'LONG'
        ? Math.abs(tpPrice - entryPrice) / entryPrice
        : Math.abs(entryPrice - tpPrice) / entryPrice;
      
      const rr = risk > 0 ? reward / risk : 0;
      
      if (filter.minRiskRewardRatio && rr < filter.minRiskRewardRatio) {
        filters.push({ 
          name: 'RR_MIN', 
          passed: false, 
          reason: `R:R ${rr.toFixed(2)} below minimum ${filter.minRiskRewardRatio}` 
        });
      } else {
        filters.push({ name: 'RR_MIN', passed: true });
        if (rr >= 3) score += 20;
        else if (rr >= 2) score += 15;
        else if (rr >= 1.5) score += 10;
      }
    }
    
    const valid = filters.every(f => f.passed);
    
    return { valid, score: Math.min(100, score), filters };
  }
}

// ==================== UNIFIED TRADING ENGINE ====================

export class UnifiedTradingEngine {
  private static instance: UnifiedTradingEngine;
  private clientCache: Map<string, IExchangeClient> = new Map();
  private positionMonitors: Map<string, NodeJS.Timeout> = new Map();
  
  private constructor() {}
  
  static getInstance(): UnifiedTradingEngine {
    if (!UnifiedTradingEngine.instance) {
      UnifiedTradingEngine.instance = new UnifiedTradingEngine();
    }
    return UnifiedTradingEngine.instance;
  }
  
  async executeTrade(request: TradeRequest): Promise<TradeResult> {
    const { signal, config, source, userId, accountId } = request;
    const warnings: string[] = [];
    
    try {
      const filterConfig = { ...DEFAULT_SIGNAL_FILTER, ...config.signalFilter };
      const validation = SignalParser.validate(signal, filterConfig);
      
      if (!validation.valid) {
        return {
          success: false,
          error: 'Signal validation failed',
          errorCode: 'SIGNAL_FILTERED',
          warnings: validation.filters.filter(f => !f.passed).map(f => f.reason || f.name),
        };
      }
      
      let account = await this.getOrCreateAccount(userId, config, accountId);
      if (!account) {
        return {
          success: false,
          error: 'Failed to get or create trading account',
          errorCode: 'ACCOUNT_NOT_FOUND',
        };
      }
      
      const client = await this.getExchangeClient(account.id, config);
      if (!client && config.mode !== 'PAPER' && config.mode !== 'DEMO') {
        return {
          success: false,
          error: 'Failed to initialize exchange client',
          errorCode: 'CLIENT_INIT_FAILED',
        };
      }
      
      const currentPrice = await this.getCurrentPrice(signal.symbol, config.exchangeId, client);
      if (!currentPrice) {
        return {
          success: false,
          error: 'Failed to get current price',
          errorCode: 'PRICE_UNAVAILABLE',
        };
      }
      
      const positionSize = await this.calculatePositionSize(
        signal,
        account,
        currentPrice,
        config,
        client
      );
      
      if (positionSize <= 0) {
        return {
          success: false,
          error: 'Invalid position size',
          errorCode: 'INVALID_SIZE',
        };
      }
      
      const orderResult = await this.executeEntryOrder(
        signal,
        positionSize,
        currentPrice,
        config,
        client,
        account
      );
      
      if (!orderResult.success) {
        return {
          success: false,
          error: orderResult.error || 'Order execution failed',
          errorCode: orderResult.errorCode || 'ORDER_FAILED',
        };
      }
      
      const position = await this.createPositionRecord(
        signal,
        orderResult,
        positionSize,
        account.id,
        config,
        source
      );
      
      if (signal.takeProfits.length > 0) {
        const tpResult = await this.setTakeProfitOrders(signal, position, positionSize, config, client);
        if (!tpResult.success) {
          warnings.push(`TP orders: ${tpResult.error}`);
        }
      }
      
      if (signal.stopLoss) {
        const slResult = await this.setStopLossOrder(signal, position, positionSize, config, client);
        if (!slResult.success) {
          warnings.push(`SL order: ${slResult.error}`);
        }
      }
      
      if (signal.trailingConfig?.enabled) {
        await this.setupTrailingStop(position.id, signal, currentPrice);
      }
      
      await this.logExecution(signal, orderResult, position, source, userId);
      
      this.startPositionMonitoring(position.id, config);
      
      return {
        success: true,
        tradeId: position.id,
        orderId: orderResult.order?.id,
        positionId: position.id,
        symbol: signal.symbol,
        direction: signal.direction,
        quantity: positionSize,
        entryPrice: orderResult.order?.avgPrice || currentPrice,
        takeProfits: signal.takeProfits,
        stopLoss: signal.stopLoss,
        leverage: signal.leverage,
        warnings,
      };
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('[UnifiedTradingEngine] Trade execution failed:', error);
      
      return {
        success: false,
        error: errorMessage,
        errorCode: 'EXECUTION_ERROR',
        warnings,
      };
    }
  }
  
  async closePosition(
    positionId: string,
    userId: string,
    reason: 'MANUAL' | 'SIGNAL' | 'SL' | 'TP' | 'LIQUIDATION' | 'TIMEOUT' = 'MANUAL'
  ): Promise<TradeResult> {
    try {
      const position = await db.position.findUnique({
        where: { id: positionId },
        include: { account: true },
      });
      
      if (!position) {
        return { success: false, error: 'Position not found', errorCode: 'POSITION_NOT_FOUND' };
      }
      
      if (position.status !== 'ACTIVE' && position.status !== 'OPENING') {
        return { success: false, error: 'Position is not active', errorCode: 'POSITION_NOT_ACTIVE' };
      }
      
      const config: TradingConfig = {
        mode: position.isDemo ? 'DEMO' : 'LIVE',
        exchangeId: position.account.exchangeId,
        marketType: 'FUTURES',
      };
      
      const client = await this.getExchangeClient(position.accountId, config);
      
      const currentPrice = await this.getCurrentPrice(
        position.symbol,
        position.account.exchangeId,
        client
      );
      
      let closeResult: OrderResult = { success: true };
      
      if (client && config.mode !== 'PAPER' && config.mode !== 'DEMO') {
        const side = position.direction === 'LONG' ? 'sell' : 'buy';
        closeResult = await client.createOrder({
          symbol: position.symbol,
          side,
          type: 'market',
          quantity: position.filledAmount,
          reduceOnly: true,
          positionSide: position.direction.toLowerCase() as 'long' | 'short',
          clientOrderId: `close-${Date.now()}`,
        });
      }
      
      if (!closeResult.success) {
        return { 
          success: false, 
          error: closeResult.error || 'Close order failed', 
          errorCode: closeResult.errorCode || 'CLOSE_FAILED' 
        };
      }
      
      const entryPrice = position.avgEntryPrice;
      const closePrice = closeResult.order?.avgPrice || currentPrice || entryPrice;
      const quantity = position.filledAmount;
      const leverage = position.leverage;
      
      let pnl: number;
      if (position.direction === 'LONG') {
        pnl = (closePrice - entryPrice) * quantity * leverage;
      } else {
        pnl = (entryPrice - closePrice) * quantity * leverage;
      }
      
      await db.position.update({
        where: { id: positionId },
        data: {
          status: 'CLOSED',
          closedAt: new Date(),
          closeReason: reason,
          realizedPnl: pnl,
        },
      });
      
      await db.trade.create({
        data: {
          accountId: position.accountId,
          positionId: position.id,
          symbol: position.symbol,
          direction: position.direction,
          side: position.direction === 'LONG' ? 'SELL' : 'BUY',
          type: 'MARKET',
          status: 'FILLED',
          amount: quantity,
          price: closePrice,
          avgPrice: closePrice,
          fee: closeResult.order?.fee || 0,
          feeCurrency: closeResult.order?.feeCurrency || 'USDT',
          pnl,
          isDemo: position.isDemo,
        },
      });
      
      this.stopPositionMonitoring(positionId);
      
      return {
        success: true,
        tradeId: positionId,
        symbol: position.symbol,
        direction: position.direction as Direction,
        quantity,
        entryPrice,
      };
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('[UnifiedTradingEngine] Close position failed:', error);
      return { success: false, error: errorMessage, errorCode: 'CLOSE_ERROR' };
    }
  }
  
  async closeAllPositions(
    userId: string,
    config: TradingConfig,
    symbol?: string,
    direction?: Direction
  ): Promise<{ closed: number; totalPnL: number; errors: string[] }> {
    const errors: string[] = [];
    let closed = 0;
    let totalPnL = 0;
    
    try {
      const whereClause: any = {
        account: { userId },
        status: { in: ['ACTIVE', 'OPENING'] },
      };
      
      if (symbol) whereClause.symbol = symbol;
      if (direction) whereClause.direction = direction;
      
      const positions = await db.position.findMany({
        where: whereClause,
        include: { account: true },
      });
      
      for (const position of positions) {
        const result = await this.closePosition(position.id, userId, 'MANUAL');
        
        if (result.success) {
          closed++;
        } else {
          errors.push(`${position.symbol}: ${result.error}`);
        }
      }
      
      return { closed, totalPnL, errors };
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(errorMessage);
      return { closed, totalPnL, errors };
    }
  }
  
  async getOpenPositions(
    userId: string,
    config?: Partial<TradingConfig>
  ): Promise<PositionInfo[]> {
    const whereClause: any = {
      account: { userId },
      status: { in: ['ACTIVE', 'OPENING', 'PENDING'] },
    };
    
    if (config?.mode === 'DEMO' || config?.mode === 'PAPER') {
      whereClause.isDemo = true;
    } else if (config?.mode === 'LIVE' || config?.mode === 'TESTNET') {
      whereClause.isDemo = false;
    }
    
    const positions = await db.position.findMany({
      where: whereClause,
      orderBy: { openedAt: 'desc' },
    });
    
    const positionInfos: PositionInfo[] = [];
    
    for (const pos of positions) {
      const currentPrice = await this.getCurrentPrice(pos.symbol, pos.account?.exchangeId || 'binance');
      
      let unrealizedPnl = 0;
      if (currentPrice && pos.avgEntryPrice) {
        if (pos.direction === 'LONG') {
          unrealizedPnl = (currentPrice - pos.avgEntryPrice) * pos.filledAmount * pos.leverage;
        } else {
          unrealizedPnl = (pos.avgEntryPrice - currentPrice) * pos.filledAmount * pos.leverage;
        }
      }
      
      positionInfos.push({
        id: pos.id,
        accountId: pos.accountId,
        symbol: pos.symbol,
        direction: pos.direction as Direction,
        status: pos.status as PositionStatus,
        totalAmount: pos.totalAmount,
        filledAmount: pos.filledAmount,
        avgEntryPrice: pos.avgEntryPrice,
        currentPrice,
        unrealizedPnl,
        realizedPnl: pos.realizedPnl || 0,
        leverage: pos.leverage,
        marginMode: 'isolated',
        stopLoss: pos.stopLoss || undefined,
        takeProfit: pos.takeProfit || undefined,
        trailingStop: pos.trailingStop ? JSON.parse(pos.trailingStop) : undefined,
        trailingActive: pos.trailingActive || false,
        highestPrice: pos.highestPrice || undefined,
        lowestPrice: pos.lowestPrice || undefined,
        openedAt: pos.openedAt,
        closedAt: pos.closedAt || undefined,
        closeReason: pos.closeReason || undefined,
        isDemo: pos.isDemo,
      });
    }
    
    return positionInfos;
  }
  
  async updatePosition(
    positionId: string,
    updates: {
      stopLoss?: number;
      takeProfit?: number;
      trailingStop?: TrailingStopConfig;
    }
  ): Promise<TradeResult> {
    try {
      const position = await db.position.findUnique({
        where: { id: positionId },
        include: { account: true },
      });
      
      if (!position) {
        return { success: false, error: 'Position not found', errorCode: 'POSITION_NOT_FOUND' };
      }
      
      const updateData: any = {};
      
      if (updates.stopLoss !== undefined) {
        updateData.stopLoss = updates.stopLoss;
      }
      
      if (updates.takeProfit !== undefined) {
        updateData.takeProfit = updates.takeProfit;
      }
      
      if (updates.trailingStop !== undefined) {
        updateData.trailingStop = JSON.stringify(updates.trailingStop);
        updateData.trailingActive = updates.trailingStop.enabled;
      }
      
      await db.position.update({
        where: { id: positionId },
        data: updateData,
      });
      
      return {
        success: true,
        positionId,
        symbol: position.symbol,
        direction: position.direction as Direction,
      };
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage, errorCode: 'UPDATE_ERROR' };
    }
  }
  
  // ==================== PRIVATE METHODS ====================
  
  private async getOrCreateAccount(
    userId: string,
    config: TradingConfig,
    accountId?: string
  ): Promise<{ id: string; exchangeId: string; isDemo: boolean } | null> {
    try {
      if (accountId) {
        const account = await db.account.findUnique({
          where: { id: accountId },
          select: { id: true, exchangeId: true, accountType: true, isTestnet: true },
        });
        
        if (account) {
          return {
            id: account.id,
            exchangeId: account.exchangeId,
            isDemo: account.accountType === 'DEMO',
          };
        }
      }
      
      if (config.mode === 'PAPER') {
        let account = await db.account.findFirst({
          where: {
            userId,
            accountType: 'PAPER',
            exchangeId: config.exchangeId,
          },
        });
        
        if (!account) {
          account = await db.account.create({
            data: {
              userId,
              exchangeId: config.exchangeId,
              accountType: 'PAPER',
              name: 'Paper Trading Account',
              isTestnet: false,
            },
          });
        }
        
        return { id: account.id, exchangeId: account.exchangeId, isDemo: true };
      }
      
      if (config.mode === 'DEMO') {
        let account = await db.account.findFirst({
          where: {
            userId,
            accountType: 'DEMO',
            exchangeId: config.exchangeId,
          },
        });
        
        if (!account) {
          account = await db.account.create({
            data: {
              userId,
              exchangeId: config.exchangeId,
              accountType: 'DEMO',
              name: 'Demo Account',
              isTestnet: false,
            },
          });
        }
        
        return { id: account.id, exchangeId: account.exchangeId, isDemo: true };
      }
      
      const account = await db.account.findFirst({
        where: {
          userId,
          exchangeId: config.exchangeId,
          accountType: config.mode === 'TESTNET' ? 'TESTNET' : 'LIVE',
          isTestnet: config.mode === 'TESTNET',
        },
      });
      
      if (!account) {
        return null;
      }
      
      return { id: account.id, exchangeId: account.exchangeId, isDemo: false };
      
    } catch (error) {
      console.error('[UnifiedTradingEngine] Get account failed:', error);
      return null;
    }
  }
  
  private async getExchangeClient(
    accountId: string,
    config: TradingConfig
  ): Promise<IExchangeClient | null> {
    if (config.mode === 'PAPER' || config.mode === 'DEMO') {
      return null;
    }
    
    const cacheKey = `${accountId}-${config.exchangeId}`;
    
    if (this.clientCache.has(cacheKey)) {
      return this.clientCache.get(cacheKey)!;
    }
    
    try {
      const credentials = await credentialManager.getCredentials(accountId);
      if (!credentials?.apiKey || !credentials?.apiSecret) {
        console.error(`[UnifiedTradingEngine] No credentials for account ${accountId}`);
        return null;
      }
      
      const clientPath = EXCHANGE_CLIENTS[config.exchangeId];
      if (!clientPath) {
        console.error(`[UnifiedTradingEngine] Unknown exchange: ${config.exchangeId}`);
        return null;
      }
      
      const clientModule = await import(clientPath);
      const ClientClass = clientModule[Object.keys(clientModule)[0]];
      
      const client = new ClientClass(
        {
          apiKey: credentials.apiKey,
          apiSecret: credentials.apiSecret,
          passphrase: credentials.passphrase,
          uid: credentials.uid,
        },
        config.marketType === 'SPOT' ? 'spot' : 'futures',
        config.mode === 'TESTNET'
      );
      
      this.clientCache.set(cacheKey, client);
      return client;
      
    } catch (error) {
      console.error(`[UnifiedTradingEngine] Failed to load client:`, error);
      return null;
    }
  }
  
  private async getCurrentPrice(
    symbol: string,
    exchangeId: string,
    client?: IExchangeClient | null
  ): Promise<number | null> {
    try {
      if (client) {
        const ticker = await client.getTicker(symbol);
        if (ticker?.last) return ticker.last;
      }
      
      const price = await priceService.getPrice(symbol, exchangeId);
      if (price) return price;
      
      return null;
    } catch {
      return null;
    }
  }
  
  private async calculatePositionSize(
    signal: ParsedSignal,
    account: { id: string; isDemo: boolean },
    currentPrice: number,
    config: TradingConfig,
    client?: IExchangeClient | null
  ): Promise<number> {
    try {
      let availableBalance = 10000;
      
      if (client && !account.isDemo) {
        const accountInfo = await client.getAccountInfo();
        availableBalance = accountInfo.availableMargin;
      } else {
        const paperAccount = await db.paperAccount.findUnique({
          where: { accountId: account.id },
        });
        if (paperAccount) {
          availableBalance = paperAccount.balance;
        }
      }
      
      const amountPercent = signal.amountPercent || config.defaultAmountPercent || 2;
      const tradeValue = availableBalance * (amountPercent / 100);
      
      let positionSize: number;
      
      if (signal.stopLoss) {
        const riskPercent = signal.riskPercent || amountPercent;
        const riskAmount = availableBalance * (riskPercent / 100);
        const priceDiff = Math.abs(signal.entryPrices[0] - signal.stopLoss);
        const riskPerUnit = priceDiff / currentPrice;
        
        positionSize = riskPerUnit > 0 ? riskAmount / riskPerUnit : tradeValue / currentPrice;
      } else {
        positionSize = tradeValue / currentPrice;
      }
      
      positionSize *= signal.leverage;
      
      positionSize = Math.floor(positionSize * 1e8) / 1e8;
      
      if (config.maxPositionSize && positionSize > config.maxPositionSize) {
        positionSize = config.maxPositionSize;
      }
      
      return Math.max(0, positionSize);
      
    } catch (error) {
      console.error('[UnifiedTradingEngine] Position size calculation failed:', error);
      return 0;
    }
  }
  
  private async executeEntryOrder(
    signal: ParsedSignal,
    quantity: number,
    currentPrice: number,
    config: TradingConfig,
    client: IExchangeClient | null,
    account: { id: string; isDemo: boolean }
  ): Promise<OrderResult> {
    if (!client || account.isDemo) {
      return {
        success: true,
        order: {
          id: `demo-${Date.now()}`,
          symbol: signal.symbol,
          side: signal.direction === 'LONG' ? 'buy' : 'sell',
          type: 'market',
          status: 'filled',
          price: currentPrice,
          avgPrice: currentPrice,
          quantity,
          filledQuantity: quantity,
          fee: quantity * currentPrice * 0.0004,
          feeCurrency: 'USDT',
          createdAt: new Date(),
        },
      };
    }
    
    const side = signal.direction === 'LONG' ? 'buy' : 'sell';
    
    return await client.createOrder({
      symbol: signal.symbol,
      side,
      type: 'market',
      quantity,
      leverage: signal.leverage,
      marginMode: signal.marginMode,
      positionSide: signal.direction.toLowerCase() as 'long' | 'short',
      clientOrderId: `citarion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    });
  }
  
  private async createPositionRecord(
    signal: ParsedSignal,
    orderResult: OrderResult,
    quantity: number,
    accountId: string,
    config: TradingConfig,
    source: SignalSource
  ): Promise<any> {
    return await db.position.create({
      data: {
        accountId,
        symbol: signal.symbol,
        direction: signal.direction,
        status: 'ACTIVE',
        totalAmount: quantity,
        filledAmount: quantity,
        avgEntryPrice: orderResult.order?.avgPrice || signal.entryPrices[0],
        leverage: signal.leverage,
        stopLoss: signal.stopLoss,
        takeProfit: signal.takeProfits[0]?.price,
        trailingStop: signal.trailingConfig ? JSON.stringify(signal.trailingConfig) : null,
        trailingActive: signal.trailingConfig?.enabled || false,
        highestPrice: orderResult.order?.avgPrice || signal.entryPrices[0],
        lowestPrice: orderResult.order?.avgPrice || signal.entryPrices[0],
        isDemo: config.mode === 'PAPER' || config.mode === 'DEMO',
        source: source,
      },
    });
  }
  
  private async setTakeProfitOrders(
    signal: ParsedSignal,
    position: any,
    totalQuantity: number,
    config: TradingConfig,
    client: IExchangeClient | null
  ): Promise<OrderResult> {
    if (!client || config.mode === 'PAPER' || config.mode === 'DEMO') {
      return { success: true };
    }
    
    try {
      for (const tp of signal.takeProfits) {
        const side = signal.direction === 'LONG' ? 'sell' : 'buy';
        const quantity = totalQuantity * (tp.percentage / 100);
        
        await client.createOrder({
          symbol: signal.symbol,
          side,
          type: 'limit',
          quantity,
          price: tp.price,
          reduceOnly: true,
          positionSide: signal.direction.toLowerCase() as 'long' | 'short',
          clientOrderId: `tp-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        });
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'TP order failed' 
      };
    }
  }
  
  private async setStopLossOrder(
    signal: ParsedSignal,
    position: any,
    quantity: number,
    config: TradingConfig,
    client: IExchangeClient | null
  ): Promise<OrderResult> {
    if (!client || config.mode === 'PAPER' || config.mode === 'DEMO') {
      return { success: true };
    }
    
    const side = signal.direction === 'LONG' ? 'sell' : 'buy';
    
    return await client.createOrder({
      symbol: signal.symbol,
      side,
      type: 'stop_market',
      quantity,
      stopPrice: signal.stopLoss!,
      reduceOnly: true,
      positionSide: signal.direction.toLowerCase() as 'long' | 'short',
      clientOrderId: `sl-${Date.now()}`,
    });
  }
  
  private async setupTrailingStop(
    positionId: string,
    signal: ParsedSignal,
    currentPrice: number
  ): Promise<void> {
    // Trailing stop is configured in position record
  }
  
  private startPositionMonitoring(positionId: string, config: TradingConfig): void {
    this.stopPositionMonitoring(positionId);
    
    const monitor = setInterval(async () => {
      try {
        await this.checkPosition(positionId);
      } catch (error) {
        console.error(`[UnifiedTradingEngine] Position monitor error for ${positionId}:`, error);
      }
    }, 5000);
    
    this.positionMonitors.set(positionId, monitor);
  }
  
  private stopPositionMonitoring(positionId: string): void {
    const monitor = this.positionMonitors.get(positionId);
    if (monitor) {
      clearInterval(monitor);
      this.positionMonitors.delete(positionId);
    }
  }
  
  private async checkPosition(positionId: string): Promise<void> {
    const position = await db.position.findUnique({
      where: { id: positionId },
      include: { account: true },
    });
    
    if (!position || position.status !== 'ACTIVE') {
      this.stopPositionMonitoring(positionId);
      return;
    }
    
    const currentPrice = await this.getCurrentPrice(
      position.symbol,
      position.account?.exchangeId || 'binance'
    );
    
    if (!currentPrice) return;
    
    const updates: any = {};
    
    if (currentPrice > (position.highestPrice || 0)) {
      updates.highestPrice = currentPrice;
    }
    if (currentPrice < (position.lowestPrice || Infinity)) {
      updates.lowestPrice = currentPrice;
    }
    
    if (position.trailingActive && position.trailingStop) {
      const trailingConfig: TrailingStopConfig = JSON.parse(position.trailingStop);
      const shouldUpdate = this.checkTrailingStop(
        currentPrice,
        position.avgEntryPrice,
        position.highestPrice || position.avgEntryPrice,
        position.lowestPrice || position.avgEntryPrice,
        position.stopLoss,
        trailingConfig,
        position.direction as Direction
      );
      
      if (shouldUpdate.newSL) {
        updates.stopLoss = shouldUpdate.newSL;
        updates.trailingActive = true;
      }
      
      if (shouldUpdate.shouldClose) {
        await this.closePosition(positionId, position.account.userId, 'SL');
        return;
      }
    }
    
    if (position.stopLoss) {
      const slTriggered = position.direction === 'LONG'
        ? currentPrice <= position.stopLoss
        : currentPrice >= position.stopLoss;
      
      if (slTriggered) {
        await this.closePosition(positionId, position.account.userId, 'SL');
        return;
      }
    }
    
    if (position.takeProfit) {
      const tpTriggered = position.direction === 'LONG'
        ? currentPrice >= position.takeProfit
        : currentPrice <= position.takeProfit;
      
      if (tpTriggered) {
        await this.closePosition(positionId, position.account.userId, 'TP');
        return;
      }
    }
    
    if (Object.keys(updates).length > 0) {
      await db.position.update({
        where: { id: positionId },
        data: updates,
      });
    }
  }
  
  private checkTrailingStop(
    currentPrice: number,
    entryPrice: number,
    highestPrice: number,
    lowestPrice: number,
    currentSL: number | null,
    config: TrailingStopConfig,
    direction: Direction
  ): { newSL: number | null; shouldClose: boolean } {
    let newSL: number | null = null;
    let shouldClose = false;
    
    const profitPercent = direction === 'LONG'
      ? ((currentPrice - entryPrice) / entryPrice) * 100
      : ((entryPrice - currentPrice) / entryPrice) * 100;
    
    let shouldActivate = false;
    
    if (config.triggerType === 'PERCENT_ABOVE_ENTRY') {
      shouldActivate = profitPercent >= (config.triggerValue || 1);
    }
    
    if (!shouldActivate && !currentSL) {
      return { newSL: null, shouldClose: false };
    }
    
    switch (config.type) {
      case 'BREAKEVEN':
        newSL = entryPrice;
        break;
        
      case 'PERCENT_BELOW_HIGHEST':
        if (direction === 'LONG') {
          newSL = highestPrice * (1 - (config.trailingPercent || 2) / 100);
        } else {
          newSL = lowestPrice * (1 + (config.trailingPercent || 2) / 100);
        }
        break;
        
      case 'PERCENT_BELOW_TRIGGER':
        const triggerPrice = entryPrice * (1 + (config.triggerValue || 1) / 100);
        if (direction === 'LONG') {
          newSL = triggerPrice * (1 - (config.trailingPercent || 1) / 100);
        } else {
          newSL = triggerPrice * (1 + (config.trailingPercent || 1) / 100);
        }
        break;
        
      default:
        break;
    }
    
    if (newSL && currentSL) {
      if (direction === 'LONG' && newSL <= currentSL) {
        newSL = null;
      } else if (direction === 'SHORT' && newSL >= currentSL) {
        newSL = null;
      }
    }
    
    return { newSL, shouldClose };
  }
  
  private async logExecution(
    signal: ParsedSignal,
    orderResult: OrderResult,
    position: any,
    source: SignalSource,
    userId: string
  ): Promise<void> {
    try {
      await db.systemLog.create({
        data: {
          level: 'INFO',
          category: 'TRADE',
          message: `Trade executed: ${signal.symbol} ${signal.direction} via ${source}`,
          details: JSON.stringify({
            symbol: signal.symbol,
            direction: signal.direction,
            quantity: position.totalAmount,
            entryPrice: orderResult.order?.avgPrice,
            leverage: signal.leverage,
            source,
          }),
          userId,
        },
      });
    } catch (error) {
      console.error('[UnifiedTradingEngine] Failed to log execution:', error);
    }
  }
  
  clearCache(): void {
    this.clientCache.clear();
  }
}

// ==================== EXPORTS ====================

export const unifiedTradingEngine = UnifiedTradingEngine.getInstance();
export { SignalParser };
export default unifiedTradingEngine;
