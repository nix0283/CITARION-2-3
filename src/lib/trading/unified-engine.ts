/**
 * Unified Trading Engine for CITARION Platform
 * 
 * Single engine with SEPARATE MODE HANDLERS: LIVE, DEMO, PAPER
 * Used by: Built-in Chat, Telegram Bot, Manual Trading, Auto Trading
 * 
 * Architecture v4 - Mode-Specific Handlers:
 * 
 * ┌─────────────────────────────────────────────────────────────┐
 * │                    UnifiedTradingEngine                     │
 * ├─────────────────────────────────────────────────────────────┤
 * │  executeTrade(request)                                      │
 * │      │                                                      │
 * │      ├── mode === 'LIVE'  ──► LiveTradeHandler             │
 * │      │                         - Real exchange API calls    │
 * │      │                         - Real balance checks        │
 * │      │                         - Real order execution       │
 * │      │                                                      │
 * │      ├── mode === 'DEMO'  ──► DemoTradeHandler             │
 * │      │                         - Virtual balance            │
 * │      │                         - Slippage (0.05%)           │
 * │      │                         - Fees (maker/taker)         │
 * │      │                         - Basic liquidation          │
 * │      │                                                      │
 * │      └── mode === 'PAPER' ──► PaperTradeHandler            │
 * │                                  - Virtual balance          │
 * │                                  - Full simulation          │
 * │                                  - Funding rate (8h)        │
 * │                                  - Equity curve             │
 * │                                  - Sharpe/Sortino metrics   │
 * │                                  - Advanced liquidation     │
 * └─────────────────────────────────────────────────────────────┘
 * 
 * Features:
 * - Multi-mode support (LIVE/DEMO/PAPER)
 * - Cornix signal format parsing
 * - Signal filtering and validation
 * - Smart order execution
 * - Position management
 * - Trailing stop (5 modes)
 * - TP Grace (retry unfilled TP orders)
 * - Position monitoring
 * - Risk management integration
 * - Multi-exchange support
 * 
 * Note: TESTNET mode has been merged into DEMO mode.
 */

import { db } from '@/lib/db';
import { credentialManager } from '@/lib/api-keys/credential-manager';
import { cachedPriceService } from '@/lib/price-service';
import { 
  TradingError, 
  BalanceError, 
  OrderError, 
  withTimeout, 
  withRetry,
  isRateLimitError 
} from './trading-errors';

// ==================== TYPES ====================

export type TradingMode = 'LIVE' | 'DEMO' | 'PAPER';
export type MarketType = 'SPOT' | 'FUTURES';
export type Direction = 'LONG' | 'SHORT';
export type OrderSide = 'BUY' | 'SELL';
export type OrderType = 'MARKET' | 'LIMIT' | 'STOP_MARKET' | 'STOP_LIMIT';
export type PositionStatus = 'PENDING' | 'OPENING' | 'ACTIVE' | 'CLOSING' | 'CLOSED' | 'LIQUIDATED';
export type SignalSource = 'CHAT' | 'TELEGRAM' | 'WEBHOOK' | 'MANUAL' | 'AUTO';

// ==================== MODE-SPECIFIC CONFIG TYPES ====================

/**
 * LIVE Mode Configuration
 * Real trading with actual exchange API
 */
export interface LiveModeConfig {
  /** Require confirmation before execution */
  requireConfirmation: boolean;
  /** Maximum position size in USDT */
  maxPositionSize: number;
  /** Enable real-time balance sync */
  syncBalance: boolean;
  /** Order timeout in ms */
  orderTimeout: number;
}

/**
 * DEMO Mode Configuration  
 * Basic simulation with slippage and fees
 */
export interface DemoModeConfig {
  /** Initial virtual balance */
  initialBalance: number;
  /** Slippage percent for market orders */
  slippagePercent: number;
  /** Maker fee percent */
  makerFeePercent: number;
  /** Taker fee percent */
  takerFeePercent: number;
  /** Enable basic liquidation */
  enableLiquidation: boolean;
  /** Maintenance margin percent */
  maintenanceMarginPercent: number;
}

/**
 * PAPER Mode Configuration
 * Full simulation with metrics and equity tracking
 */
export interface PaperModeConfig {
  /** Initial virtual balance */
  initialBalance: number;
  /** Slippage percent for market orders */
  slippagePercent: number;
  /** Maker fee percent */
  makerFeePercent: number;
  /** Taker fee percent */
  takerFeePercent: number;
  /** Enable funding rate simulation */
  enableFunding: boolean;
  /** Funding interval in ms (default: 8 hours) */
  fundingIntervalMs: number;
  /** Base funding rate */
  baseFundingRate: number;
  /** Maintenance margin for liquidation */
  maintenanceMarginPercent: number;
  /** Enable equity curve tracking */
  trackEquityCurve: boolean;
  /** Equity recording interval in ms */
  equityRecordInterval: number;
  /** Enable advanced metrics calculation */
  calculateMetrics: boolean;
}

/** @deprecated Use mode-specific configs instead */
export interface SimulationConfig {
  slippagePercent: number;
  makerFeePercent: number;
  takerFeePercent: number;
  enableFunding: boolean;
  fundingIntervalMs: number;
  baseFundingRate: number;
  maintenanceMarginPercent: number;
}

export interface EquityPoint {
  timestamp: Date;
  balance: number;
  equity: number;
  unrealizedPnl: number;
  realizedPnl: number;
  drawdown: number;
  drawdownPercent: number;
  openPositions: number;
}

export interface PerformanceMetrics {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  totalPnl: number;
  totalPnlPercent: number;
  avgWin: number;
  avgLoss: number;
  profitFactor: number;
  sharpeRatio: number;
  sortinoRatio: number;
  maxDrawdown: number;
  maxDrawdownPercent: number;
  avgDrawdown: number;
  timeInDrawdown: number;
  maxWinStreak: number;
  maxLossStreak: number;
  avgTradeDuration: number; // minutes
}

export interface VirtualBalance {
  currency: string;
  total: number;
  available: number;
  frozen: number;
}

export interface PendingOrder {
  id: string;
  symbol: string;
  direction: Direction;
  type: 'LIMIT' | 'STOP_LIMIT';
  price: number;
  triggerPrice?: number;
  quantity: number;
  leverage: number;
  stopLoss?: number;
  takeProfit?: number;
  createdAt: Date;
  expiresAt?: Date;
}

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
  // Entry order type for manual trading
  entryOrderType?: OrderType;
  triggerPrice?: number;
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
  // Entry order options
  entryOrderType?: OrderType;
  triggerPrice?: number;
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
  trailingActivated?: boolean;
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
  
  // ==================== v3: SIMULATION PROPERTIES ====================
  
  /** Virtual balances for DEMO/PAPER mode */
  private virtualBalances: Map<string, VirtualBalance> = new Map();
  
  /** Equity curve tracking */
  private equityCurves: Map<string, EquityPoint[]> = new Map();
  
  /** Pending limit orders for matching */
  private pendingOrders: Map<string, PendingOrder[]> = new Map();
  
  /** Last funding settlement time per symbol */
  private lastFundingTime: Map<string, Date> = new Map();
  
  /** Peak equity for drawdown calculation */
  private peakEquity: Map<string, number> = new Map();
  
  /** Trade history for metrics */
  private tradeHistory: Map<string, Array<{ pnl: number; timestamp: Date; duration: number }>> = new Map();
  
  /** Default simulation config */
  private readonly DEFAULT_SIMULATION_CONFIG: SimulationConfig = {
    slippagePercent: 0.05,        // 0.05% typical slippage
    makerFeePercent: 0.02,        // 0.02% maker fee (Binance futures)
    takerFeePercent: 0.04,        // 0.04% taker fee (Binance futures)
    enableFunding: true,
    fundingIntervalMs: 8 * 60 * 60 * 1000, // 8 hours
    baseFundingRate: 0.01,        // 0.01% per 8h
    maintenanceMarginPercent: 0.5, // 0.5% maintenance margin
  };
  
  private constructor() {
    // Initialize virtual balances for common currencies
    this.initializeVirtualBalances();
  }
  
  /**
   * Initialize virtual balances with default starting capital
   */
  private initializeVirtualBalances(): void {
    const defaultBalance: VirtualBalance = {
      currency: 'USDT',
      total: 10000,
      available: 10000,
      frozen: 0,
    };
    // Will be set per account when needed
  }
  
  static getInstance(): UnifiedTradingEngine {
    if (!UnifiedTradingEngine.instance) {
      UnifiedTradingEngine.instance = new UnifiedTradingEngine();
    }
    return UnifiedTradingEngine.instance;
  }
  
  async executeTrade(request: TradeRequest): Promise<TradeResult> {
    const { signal, config, source, userId, accountId, entryOrderType, triggerPrice } = request;
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
        account,
        entryOrderType || 'MARKET',
        triggerPrice
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
      
      if (position.status !== 'OPEN' && position.status !== 'ACTIVE' && position.status !== 'OPENING') {
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
          userId: position.account.userId,
          accountId: position.accountId,
          positionId: position.id,
          symbol: position.symbol,
          direction: position.direction,
          status: 'CLOSED',
          entryPrice: position.avgEntryPrice,
          entryTime: position.createdAt,
          amount: quantity,
          leverage: position.leverage,
          exitPrice: closePrice,
          exitTime: new Date(),
          closeReason: reason,
          stopLoss: position.stopLoss,
          takeProfits: position.takeProfit ? JSON.stringify([{ price: position.takeProfit, percentage: 100 }]) : null,
          pnl,
          pnlPercent: entryPrice > 0 ? (pnl / (entryPrice * quantity)) * 100 : 0,
          fee: closeResult.order?.fee || 0,
          signalSource: position.source,
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
        status: { in: ['OPEN', 'ACTIVE', 'OPENING'] },
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
      status: { in: ['OPEN', 'ACTIVE', 'OPENING', 'PENDING'] },
    };
    
    if (config?.mode === 'DEMO' || config?.mode === 'PAPER') {
      whereClause.isDemo = true;
    } else if (config?.mode === 'LIVE') {
      whereClause.isDemo = false;
    }
    
    const positions = await db.position.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
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
        trailingActivated: pos.trailingActivated || false,
        highestPrice: pos.highestPrice || undefined,
        lowestPrice: pos.lowestPrice || undefined,
        openedAt: pos.createdAt,
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
        updateData.trailingActivated = updates.trailingStop.enabled;
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
          accountType: 'LIVE',
          isTestnet: false,
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
        false // TESTNET merged into DEMO - always use production
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
      
      const priceData = await cachedPriceService.getPrice(symbol, exchangeId);
      // cachedPriceService.getPrice returns CachedPrice object { symbol, exchange, price, bidPrice, askPrice, timestamp }
      if (priceData && typeof priceData.price === 'number' && !isNaN(priceData.price)) {
        return priceData.price;
      }
      
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
    // Validate currentPrice FIRST
    if (!currentPrice || isNaN(currentPrice) || currentPrice <= 0) {
      throw new TradingError(
        `Invalid current price: ${currentPrice}`,
        'INVALID_PRICE',
        false,
        400,
        { symbol: signal.symbol, currentPrice }
      );
    }

    // Get available balance - NO DEFAULT FALLBACK
    let availableBalance: number;
    
    if (client && !account.isDemo) {
      // LIVE mode - fetch real balance with timeout
      try {
        const accountInfo = await withTimeout(
          Promise.resolve(client.getAccountInfo()),
          10000,
          'getAccountInfo'
        );
        availableBalance = accountInfo.availableMargin;
      } catch (error) {
        throw new BalanceError(
          `Failed to fetch account balance for LIVE trading`,
          'BALANCE_FETCH_FAILED',
          { 
            accountId: account.id, 
            originalError: error instanceof Error ? error.message : String(error) 
          }
        );
      }
    } else {
      // DEMO/PAPER mode - get from paper account
      const paperAccount = await db.paperAccount.findUnique({
        where: { accountId: account.id },
      });
      if (!paperAccount) {
        throw new BalanceError(
          `Paper account not found: ${account.id}`,
          'BALANCE_FETCH_FAILED',
          { accountId: account.id }
        );
      }
      availableBalance = paperAccount.balance;
    }

    // Validate availableBalance - THROW ERROR instead of fallback
    if (isNaN(availableBalance) || availableBalance <= 0) {
      throw new BalanceError(
        `Invalid or zero balance: ${availableBalance}. Cannot calculate position size.`,
        'INSUFFICIENT_BALANCE',
        false,
        { accountId: account.id, availableBalance }
      );
    }
    
    const amountPercent = signal.amountPercent || config.defaultAmountPercent || 2;
    const tradeValue = availableBalance * (amountPercent / 100);
    
    let positionSize: number;
    
    if (signal.stopLoss && signal.entryPrices.length > 0) {
      const riskPercent = signal.riskPercent || amountPercent;
      const riskAmount = availableBalance * (riskPercent / 100);
      const entryPrice = signal.entryPrices[0] || currentPrice;
      const priceDiff = Math.abs(entryPrice - signal.stopLoss);
      const riskPerUnit = priceDiff / currentPrice;
      
      positionSize = riskPerUnit > 0 ? riskAmount / riskPerUnit : tradeValue / currentPrice;
    } else {
      positionSize = tradeValue / currentPrice;
    }
    
    // Apply leverage
    const leverage = signal.leverage && !isNaN(signal.leverage) ? signal.leverage : 1;
    positionSize *= leverage;
    
    // Round to 8 decimal places
    positionSize = Math.floor(positionSize * 1e8) / 1e8;
    
    // Ensure non-negative
    if (isNaN(positionSize) || positionSize < 0) {
      positionSize = 0;
    }
    
    // Apply max position size limit
    if (config.maxPositionSize && positionSize > config.maxPositionSize) {
      positionSize = config.maxPositionSize;
    }
    
    return Math.max(0, positionSize);
  }
  
  private async executeEntryOrder(
    signal: ParsedSignal,
    quantity: number,
    currentPrice: number,
    config: TradingConfig,
    client: IExchangeClient | null,
    account: { id: string; isDemo: boolean },
    orderType: OrderType = 'MARKET',
    triggerPrice?: number
  ): Promise<OrderResult> {
    const side = signal.direction === 'LONG' ? 'buy' : 'sell';
    const entryPrice = signal.entryPrices[0] || currentPrice;
    
    // For PAPER/DEMO mode - simulate order execution with realistic conditions
    if (!client || account.isDemo) {
      return this.executeSimulatedOrder(
        signal,
        quantity,
        currentPrice,
        account.id,
        orderType,
        entryPrice,
        triggerPrice
      );
    }
    
    // Live trading - send order to exchange
    const clientOrderId = `citarion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Handle different order types
    switch (orderType) {
      case 'LIMIT':
        return await client.createOrder({
          symbol: signal.symbol,
          side,
          type: 'limit',
          quantity,
          price: entryPrice,
          leverage: signal.leverage,
          marginMode: signal.marginMode,
          positionSide: signal.direction.toLowerCase() as 'long' | 'short',
          clientOrderId,
          timeInForce: 'GTC',
        });
        
      case 'STOP_LIMIT':
        return await client.createOrder({
          symbol: signal.symbol,
          side,
          type: 'stop_limit',
          quantity,
          price: entryPrice,
          stopPrice: triggerPrice || entryPrice,
          leverage: signal.leverage,
          marginMode: signal.marginMode,
          positionSide: signal.direction.toLowerCase() as 'long' | 'short',
          clientOrderId,
          timeInForce: 'GTC',
        });
        
      case 'STOP_MARKET':
        return await client.createOrder({
          symbol: signal.symbol,
          side,
          type: 'stop_market',
          quantity,
          stopPrice: triggerPrice || entryPrice,
          leverage: signal.leverage,
          marginMode: signal.marginMode,
          positionSide: signal.direction.toLowerCase() as 'long' | 'short',
          clientOrderId,
        });
        
      case 'MARKET':
      default:
        return await client.createOrder({
          symbol: signal.symbol,
          side,
          type: 'market',
          quantity,
          leverage: signal.leverage,
          marginMode: signal.marginMode,
          positionSide: signal.direction.toLowerCase() as 'long' | 'short',
          clientOrderId,
        });
    }
  }
  
  private async createPositionRecord(
    signal: ParsedSignal,
    orderResult: OrderResult,
    quantity: number,
    accountId: string,
    config: TradingConfig,
    source: SignalSource
  ): Promise<any> {
    // Validate and sanitize all numeric values to prevent NaN in database
    const safeQuantity = isNaN(quantity) || quantity <= 0 ? 0 : quantity;
    const entryPrice = orderResult.order?.avgPrice || signal.entryPrices[0] || 0;
    const safeEntryPrice = isNaN(entryPrice) ? 0 : entryPrice;
    const safeLeverage = isNaN(signal.leverage) || signal.leverage < 1 ? 1 : signal.leverage;
    const safeStopLoss = signal.stopLoss && !isNaN(signal.stopLoss) ? signal.stopLoss : null;
    const safeTakeProfit = signal.takeProfits[0]?.price && !isNaN(signal.takeProfits[0].price) 
      ? signal.takeProfits[0].price 
      : null;

    if (safeQuantity <= 0) {
      throw new Error(`Invalid position size: ${quantity}. Cannot create position record.`);
    }

    if (safeEntryPrice <= 0) {
      throw new Error(`Invalid entry price: ${entryPrice}. Cannot create position record.`);
    }

    return await db.position.create({
      data: {
        accountId,
        symbol: signal.symbol,
        direction: signal.direction,
        status: 'OPEN',
        totalAmount: safeQuantity,
        filledAmount: safeQuantity,
        avgEntryPrice: safeEntryPrice,
        leverage: safeLeverage,
        stopLoss: safeStopLoss,
        takeProfit: safeTakeProfit,
        trailingStop: signal.trailingConfig ? JSON.stringify(signal.trailingConfig) : null,
        trailingActivated: signal.trailingConfig?.enabled || false,
        highestPrice: safeEntryPrice,
        lowestPrice: safeEntryPrice,
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
    
    if (!position || (position.status !== 'OPEN' && position.status !== 'ACTIVE')) {
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
    
    if (position.trailingActivated && position.trailingStop) {
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
        updates.trailingActivated = true;
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
  
  // ==================== v3: SIMULATION METHODS ====================
  
  /**
   * Execute simulated order with slippage, fees, and realistic conditions
   */
  private async executeSimulatedOrder(
    signal: ParsedSignal,
    quantity: number,
    currentPrice: number,
    accountId: string,
    orderType: OrderType,
    entryPrice: number,
    triggerPrice?: number
  ): Promise<OrderResult> {
    const side = signal.direction === 'LONG' ? 'buy' : 'sell';
    const simConfig = this.DEFAULT_SIMULATION_CONFIG;
    
    // For limit/stop-limit orders, create pending order for matching
    if (orderType === 'LIMIT' || orderType === 'STOP_LIMIT') {
      const pendingOrder: PendingOrder = {
        id: `pending-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        symbol: signal.symbol,
        direction: signal.direction,
        type: orderType,
        price: entryPrice,
        triggerPrice,
        quantity,
        leverage: signal.leverage,
        stopLoss: signal.stopLoss,
        takeProfit: signal.takeProfits[0]?.price,
        createdAt: new Date(),
      };
      
      if (!this.pendingOrders.has(accountId)) {
        this.pendingOrders.set(accountId, []);
      }
      this.pendingOrders.get(accountId)!.push(pendingOrder);
      
      return {
        success: true,
        order: {
          id: pendingOrder.id,
          symbol: signal.symbol,
          side: side as 'buy' | 'sell',
          type: orderType.toLowerCase(),
          status: 'new',
          price: entryPrice,
          avgPrice: entryPrice,
          quantity,
          filledQuantity: 0,
          fee: 0,
          feeCurrency: 'USDT',
          createdAt: new Date(),
        },
      };
    }
    
    // Market order - execute immediately with slippage
    const executedPrice = this.applySlippage(currentPrice, signal.direction, simConfig.slippagePercent);
    const positionValue = quantity * executedPrice;
    const fee = this.calculateFee(positionValue, 'taker', simConfig);
    
    // Check and deduct from virtual balance
    const balance = this.getInternalVirtualBalance(accountId);
    const marginRequired = positionValue / signal.leverage;
    
    if (balance.available < marginRequired + fee) {
      return {
        success: false,
        error: `Insufficient balance. Required: ${(marginRequired + fee).toFixed(2)} USDT, Available: ${balance.available.toFixed(2)} USDT`,
        errorCode: 'INSUFFICIENT_BALANCE',
      };
    }
    
    // Update virtual balance
    this.updateVirtualBalance(accountId, -(marginRequired + fee));
    
    // Record equity point
    await this.updateEquityCurve(accountId, executedPrice);
    
    return {
      success: true,
      order: {
        id: `sim-${Date.now()}`,
        symbol: signal.symbol,
        side: side as 'buy' | 'sell',
        type: 'market',
        status: 'filled',
        price: executedPrice,
        avgPrice: executedPrice,
        quantity,
        filledQuantity: quantity,
        fee,
        feeCurrency: 'USDT',
        createdAt: new Date(),
      },
    };
  }
  
  /**
   * Apply slippage to execution price
   * For LONG (buy): price goes up
   * For SHORT (sell): price goes down
   */
  private applySlippage(
    price: number,
    direction: Direction,
    slippagePercent: number
  ): number {
    const slippageFactor = direction === 'LONG' 
      ? 1 + (slippagePercent / 100)
      : 1 - (slippagePercent / 100);
    return price * slippageFactor;
  }
  
  /**
   * Calculate trading fee based on order type
   */
  private calculateFee(
    positionValue: number,
    orderType: 'maker' | 'taker',
    config: SimulationConfig
  ): number {
    const feePercent = orderType === 'maker' 
      ? config.makerFeePercent 
      : config.takerFeePercent;
    return positionValue * (feePercent / 100);
  }
  
  /**
   * Check if position should be liquidated
   */
  private checkLiquidation(
    entryPrice: number,
    currentPrice: number,
    leverage: number,
    direction: Direction,
    maintenanceMarginPercent: number
  ): { isLiquidated: boolean; liquidationPrice: number } {
    // Liquidation price = Entry * (1 - 1/leverage + maintenance_margin)
    // For LONG: liquidate when price drops to liquidation price
    // For SHORT: liquidate when price rises to liquidation price
    const liquidationPrice = direction === 'LONG'
      ? entryPrice * (1 - (1 / leverage) + (maintenanceMarginPercent / 100))
      : entryPrice * (1 + (1 / leverage) - (maintenanceMarginPercent / 100));
    
    const isLiquidated = direction === 'LONG'
      ? currentPrice <= liquidationPrice
      : currentPrice >= liquidationPrice;
    
    return { isLiquidated, liquidationPrice };
  }
  
  /**
   * Settle funding rate for open positions
   * Called every 8 hours (00:00, 08:00, 16:00 UTC)
   */
  private async settleFunding(
    accountId: string,
    symbol: string,
    positionValue: number,
    direction: Direction,
    config: SimulationConfig
  ): Promise<number> {
    if (!config.enableFunding) return 0;
    
    const key = `${accountId}:${symbol}`;
    const now = new Date();
    const lastFunding = this.lastFundingTime.get(key);
    
    // Check if funding interval has passed
    if (lastFunding && (now.getTime() - lastFunding.getTime()) < config.fundingIntervalMs) {
      return 0;
    }
    
    // Simulate funding rate with random variation
    const fundingRate = config.baseFundingRate * (0.5 + Math.random()); // 0.005% - 0.015%
    
    // Funding payment: LONG pays if rate > 0, SHORT receives
    // This simulates real futures funding mechanism
    const fundingPayment = direction === 'LONG'
      ? -positionValue * (fundingRate / 100)
      : positionValue * (fundingRate / 100);
    
    // Update last funding time
    this.lastFundingTime.set(key, now);
    
    // Update virtual balance
    this.updateVirtualBalance(accountId, fundingPayment);
    
    console.log(`[Simulation] Funding settled for ${symbol}: ${direction} rate=${fundingRate.toFixed(4)}% payment=${fundingPayment.toFixed(2)} USDT`);
    
    return fundingPayment;
  }
  
  /**
   * Update equity curve with current position state
   */
  private async updateEquityCurve(
    accountId: string,
    currentPrice?: number
  ): Promise<void> {
    // MAX_EQUITY_POINTS - prevents memory leak
    const MAX_EQUITY_POINTS = 10000; // ~10k points max per account
    
    try {
      // Get account state
      const balance = this.getInternalVirtualBalance(accountId);
      
      // Get open positions for this account
      const positions = await db.position.findMany({
        where: { 
          accountId,
          status: { in: ['OPEN', 'ACTIVE'] },
          isDemo: true,
        },
      });
      
      let unrealizedPnl = 0;
      for (const pos of positions) {
        if (currentPrice && pos.symbol) {
          const pnl = pos.direction === 'LONG'
            ? (currentPrice - pos.avgEntryPrice) * pos.filledAmount * pos.leverage
            : (pos.avgEntryPrice - currentPrice) * pos.filledAmount * pos.leverage;
          unrealizedPnl += pnl;
        }
      }
      
      const equity = balance.total + unrealizedPnl;
      
      // Update peak equity
      const currentPeak = this.peakEquity.get(accountId) || balance.total;
      const newPeak = Math.max(currentPeak, equity);
      this.peakEquity.set(accountId, newPeak);
      
      // Calculate drawdown
      const drawdown = newPeak - equity;
      const drawdownPercent = newPeak > 0 ? (drawdown / newPeak) * 100 : 0;
      
      // Get realized PnL from trade history
      const trades = this.tradeHistory.get(accountId) || [];
      const realizedPnl = trades.reduce((sum, t) => sum + t.pnl, 0);
      
      const point: EquityPoint = {
        timestamp: new Date(),
        balance: balance.total,
        equity,
        unrealizedPnl,
        realizedPnl,
        drawdown,
        drawdownPercent,
        openPositions: positions.length,
      };
      
      // Add to equity curve with SIZE LIMIT to prevent memory leak
      if (!this.equityCurves.has(accountId)) {
        this.equityCurves.set(accountId, []);
      }
      
      const curve = this.equityCurves.get(accountId)!;
      curve.push(point);
      
      // MEMORY LEAK FIX: Trim old points if exceeds max
      if (curve.length > MAX_EQUITY_POINTS) {
        // Keep the last MAX_EQUITY_POINTS
        curve.splice(0, curve.length - MAX_EQUITY_POINTS);
      }
      
    } catch (error) {
      console.error('[Simulation] Failed to update equity curve:', error);
    }
  }
  
  /**
   * Calculate performance metrics from trade history
   */
  private calculatePerformanceMetrics(accountId: string): PerformanceMetrics {
    const trades = this.tradeHistory.get(accountId) || [];
    const equityCurve = this.equityCurves.get(accountId) || [];
    
    const wins = trades.filter(t => t.pnl > 0);
    const losses = trades.filter(t => t.pnl <= 0);
    
    const totalPnl = trades.reduce((sum, t) => sum + t.pnl, 0);
    const grossProfit = wins.reduce((sum, t) => sum + t.pnl, 0);
    const grossLoss = Math.abs(losses.reduce((sum, t) => sum + t.pnl, 0));
    
    // Win rate
    const winRate = trades.length > 0 ? (wins.length / trades.length) * 100 : 0;
    
    // Profit factor
    const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? Infinity : 0;
    
    // Sharpe Ratio calculation
    const returns: number[] = [];
    for (let i = 1; i < equityCurve.length; i++) {
      const prevEquity = equityCurve[i - 1].equity;
      const currEquity = equityCurve[i].equity;
      if (prevEquity > 0) {
        returns.push((currEquity - prevEquity) / prevEquity);
      }
    }
    
    const avgReturn = returns.length > 0 
      ? returns.reduce((a, b) => a + b, 0) / returns.length 
      : 0;
    const stdReturn = returns.length > 1
      ? Math.sqrt(returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / (returns.length - 1))
      : 0;
    
    // Annualized Sharpe (assuming daily returns, 252 trading days)
    const sharpeRatio = stdReturn > 0 
      ? (avgReturn / stdReturn) * Math.sqrt(252) 
      : 0;
    
    // Sortino Ratio (only negative returns for denominator)
    const negativeReturns = returns.filter(r => r < 0);
    const downsideDeviation = negativeReturns.length > 1
      ? Math.sqrt(negativeReturns.reduce((sum, r) => sum + Math.pow(r, 2), 0) / negativeReturns.length)
      : 0;
    const sortinoRatio = downsideDeviation > 0
      ? (avgReturn / downsideDeviation) * Math.sqrt(252)
      : 0;
    
    // Drawdown metrics
    const drawdowns = equityCurve.map(p => p.drawdownPercent);
    const maxDrawdownPercent = drawdowns.length > 0 ? Math.max(...drawdowns) : 0;
    const avgDrawdown = drawdowns.length > 0
      ? drawdowns.reduce((a, b) => a + b, 0) / drawdowns.length
      : 0;
    
    // Max drawdown in absolute terms
    const maxDrawdown = Math.max(...equityCurve.map(p => p.drawdown), 0);
    
    // Time in drawdown
    const inDrawdown = equityCurve.filter(p => p.drawdownPercent > 0).length;
    const timeInDrawdown = equityCurve.length > 0 
      ? (inDrawdown / equityCurve.length) * 100 
      : 0;
    
    // Streaks
    let maxWinStreak = 0;
    let maxLossStreak = 0;
    let currentWinStreak = 0;
    let currentLossStreak = 0;
    
    for (const trade of trades) {
      if (trade.pnl > 0) {
        currentWinStreak++;
        currentLossStreak = 0;
        maxWinStreak = Math.max(maxWinStreak, currentWinStreak);
      } else {
        currentLossStreak++;
        currentWinStreak = 0;
        maxLossStreak = Math.max(maxLossStreak, currentLossStreak);
      }
    }
    
    // Average trade duration
    const avgTradeDuration = trades.length > 0
      ? trades.reduce((sum, t) => sum + t.duration, 0) / trades.length
      : 0;
    
    // Total PnL percent (from initial balance)
    const initialBalance = 10000; // Default
    const totalPnlPercent = (totalPnl / initialBalance) * 100;
    
    return {
      totalTrades: trades.length,
      winningTrades: wins.length,
      losingTrades: losses.length,
      winRate,
      totalPnl,
      totalPnlPercent,
      avgWin: wins.length > 0 ? grossProfit / wins.length : 0,
      avgLoss: losses.length > 0 ? grossLoss / losses.length : 0,
      profitFactor,
      sharpeRatio,
      sortinoRatio,
      maxDrawdown,
      maxDrawdownPercent,
      avgDrawdown,
      timeInDrawdown,
      maxWinStreak,
      maxLossStreak,
      avgTradeDuration,
    };
  }
  
  /**
   * Match pending limit orders against current price
   */
  async matchPendingOrders(accountId: string, prices: Record<string, number>): Promise<number> {
    const orders = this.pendingOrders.get(accountId) || [];
    let matchedCount = 0;
    
    for (let i = orders.length - 1; i >= 0; i--) {
      const order = orders[i];
      const currentPrice = prices[order.symbol];
      
      if (!currentPrice) continue;
      
      let shouldMatch = false;
      
      // Check if limit price is reached
      if (order.type === 'LIMIT') {
        if (order.direction === 'LONG' && currentPrice <= order.price) {
          shouldMatch = true;
        } else if (order.direction === 'SHORT' && currentPrice >= order.price) {
          shouldMatch = true;
        }
      }
      
      // Check stop-limit trigger
      if (order.type === 'STOP_LIMIT' && order.triggerPrice) {
        if (order.direction === 'LONG' && currentPrice >= order.triggerPrice) {
          // Stop triggered, now check limit price
          if (currentPrice <= order.price) {
            shouldMatch = true;
          }
        } else if (order.direction === 'SHORT' && currentPrice <= order.triggerPrice) {
          if (currentPrice >= order.price) {
            shouldMatch = true;
          }
        }
      }
      
      if (shouldMatch) {
        // Execute the order
        const executedPrice = this.applySlippage(
          order.price,
          order.direction,
          this.DEFAULT_SIMULATION_CONFIG.slippagePercent
        );
        
        const positionValue = order.quantity * executedPrice;
        const fee = this.calculateFee(positionValue, 'maker', this.DEFAULT_SIMULATION_CONFIG);
        
        // Update balance
        const marginRequired = positionValue / order.leverage;
        this.updateVirtualBalance(accountId, -(marginRequired + fee));
        
        // Create position in DB
        await db.position.create({
          data: {
            accountId,
            symbol: order.symbol,
            direction: order.direction,
            status: 'OPEN',
            totalAmount: order.quantity,
            filledAmount: order.quantity,
            avgEntryPrice: executedPrice,
            leverage: order.leverage,
            stopLoss: order.stopLoss || null,
            takeProfit: order.takeProfit || null,
            isDemo: true,
            source: 'MANUAL',
          },
        });
        
        // Remove from pending
        orders.splice(i, 1);
        matchedCount++;
        
        console.log(`[Simulation] Limit order matched: ${order.symbol} ${order.direction} @ ${executedPrice}`);
      }
    }
    
    return matchedCount;
  }
  
  /**
   * Get internal virtual balance from cache
   */
  private getInternalVirtualBalance(accountId: string): VirtualBalance {
    let balance = this.virtualBalances.get(accountId);
    
    if (!balance) {
      // Initialize with default balance
      balance = {
        currency: 'USDT',
        total: 10000,
        available: 10000,
        frozen: 0,
      };
      this.virtualBalances.set(accountId, balance);
    }
    
    return balance;
  }
  
  /**
   * Update virtual balance
   */
  private updateVirtualBalance(accountId: string, delta: number): void {
    const balance = this.getInternalVirtualBalance(accountId);
    balance.total += delta;
    balance.available += delta;
    
    // Ensure non-negative
    if (balance.total < 0) balance.total = 0;
    if (balance.available < 0) balance.available = 0;
    
    this.virtualBalances.set(accountId, balance);
  }
  
  /**
   * Get equity curve for account
   */
  getEquityCurve(accountId: string): EquityPoint[] {
    return this.equityCurves.get(accountId) || [];
  }
  
  /**
   * Get performance metrics for account
   */
  getPerformanceMetrics(accountId: string): PerformanceMetrics {
    return this.calculatePerformanceMetrics(accountId);
  }
  
  /**
   * Get virtual balance (public method)
   */
  getAccountBalance(accountId: string): VirtualBalance {
    return this.getInternalVirtualBalance(accountId);
  }
  
  /**
   * Set initial balance for simulation
   */
  setInitialBalance(accountId: string, amount: number): void {
    this.virtualBalances.set(accountId, {
      currency: 'USDT',
      total: amount,
      available: amount,
      frozen: 0,
    });
    this.peakEquity.set(accountId, amount);
  }
  
  /**
   * Record trade for metrics calculation
   */
  recordTrade(accountId: string, pnl: number, durationMinutes: number): void {
    if (!this.tradeHistory.has(accountId)) {
      this.tradeHistory.set(accountId, []);
    }
    this.tradeHistory.get(accountId)!.push({
      pnl,
      timestamp: new Date(),
      duration: durationMinutes,
    });
  }
  
  /**
   * Get simulation config
   */
  getSimulationConfig(): SimulationConfig {
    return { ...this.DEFAULT_SIMULATION_CONFIG };
  }
  
  /**
   * Update simulation config
   */
  updateSimulationConfig(updates: Partial<SimulationConfig>): void {
    Object.assign(this.DEFAULT_SIMULATION_CONFIG, updates);
  }
  
  /**
   * Process price update for simulation (matching, funding, liquidation)
   */
  async processPriceUpdate(
    accountId: string,
    symbol: string,
    price: number
  ): Promise<{
    matchedOrders: number;
    fundingPayment: number;
    liquidations: string[];
  }> {
    const result = {
      matchedOrders: 0,
      fundingPayment: 0,
      liquidations: [] as string[],
    };
    
    // Match pending orders
    result.matchedOrders = await this.matchPendingOrders(accountId, { [symbol]: price });
    
    // Check funding
    const positions = await db.position.findMany({
      where: { accountId, symbol, status: 'OPEN', isDemo: true },
    });
    
    for (const pos of positions) {
      const positionValue = pos.filledAmount * price;
      result.fundingPayment += await this.settleFunding(
        accountId,
        symbol,
        positionValue,
        pos.direction as Direction,
        this.DEFAULT_SIMULATION_CONFIG
      );
      
      // Check liquidation
      const { isLiquidated, liquidationPrice } = this.checkLiquidation(
        pos.avgEntryPrice,
        price,
        pos.leverage,
        pos.direction as Direction,
        this.DEFAULT_SIMULATION_CONFIG.maintenanceMarginPercent
      );
      
      if (isLiquidated) {
        // Close position at liquidation price
        await db.position.update({
          where: { id: pos.id },
          data: {
            status: 'LIQUIDATED',
            closedAt: new Date(),
            closeReason: 'LIQUIDATION',
            realizedPnl: -pos.avgEntryPrice * pos.filledAmount / pos.leverage, // Loss of margin
          },
        });
        
        result.liquidations.push(pos.id);
        
        console.warn(`[Simulation] Position liquidated: ${symbol} ${pos.direction} @ ${liquidationPrice.toFixed(2)}`);
      }
    }
    
    // Update equity curve
    await this.updateEquityCurve(accountId, price);
    
    return result;
  }
  
  // ==================== MODE HANDLER ACCESS ====================
  
  /**
   * Get mode-specific handler
   */
  getModeHandler(mode: TradingMode): LiveTradeHandler | DemoTradeHandler | PaperTradeHandler {
    return getModeHandler(mode);
  }
  
  /**
   * Get LIVE handler for configuration
   */
  getLiveHandler(): LiveTradeHandler {
    return liveHandler;
  }
  
  /**
   * Get DEMO handler for configuration
   */
  getDemoHandler(): DemoTradeHandler {
    return demoHandler;
  }
  
  /**
   * Get PAPER handler for configuration and metrics
   */
  getPaperHandler(): PaperTradeHandler {
    return paperHandler;
  }
  
  /**
   * Configure LIVE mode
   */
  configureLiveMode(config: Partial<LiveModeConfig>): void {
    liveHandler.updateConfig(config);
  }
  
  /**
   * Configure DEMO mode
   */
  configureDemoMode(config: Partial<DemoModeConfig>): void {
    demoHandler.updateConfig(config);
  }
  
  /**
   * Configure PAPER mode
   */
  configurePaperMode(config: Partial<PaperModeConfig>): void {
    paperHandler.updateConfig(config);
  }
  
  /**
   * Get PAPER mode equity curve
   */
  getPaperEquityCurve(accountId: string): EquityPoint[] {
    return paperHandler.getEquityCurve(accountId);
  }
  
  /**
   * Get PAPER mode performance metrics
   */
  getPaperPerformanceMetrics(accountId: string): PerformanceMetrics {
    return paperHandler.getPerformanceMetrics(accountId);
  }
  
  /**
   * Set initial balance for DEMO/PAPER mode
   */
  setVirtualBalance(accountId: string, amount: number, mode: 'DEMO' | 'PAPER' = 'PAPER'): void {
    if (mode === 'DEMO') {
      demoHandler.setInitialBalance(accountId, amount);
    } else {
      paperHandler.setInitialBalance(accountId, amount);
    }
  }
  
  /**
   * Get virtual balance for DEMO/PAPER mode
   */
  getVirtualBalance(accountId: string, mode: 'DEMO' | 'PAPER' = 'PAPER'): VirtualBalance {
    if (mode === 'DEMO') {
      return demoHandler.getBalance(accountId);
    }
    return paperHandler.getBalance(accountId);
  }
  
  clearCache(): void {
    this.clientCache.clear();
  }
}

// ==================== MODE-SPECIFIC HANDLERS ====================

/**
 * LIVE Mode Handler
 * Real trading with actual exchange API
 * 
 * CRITICAL: Uses timeout and retry for production safety
 */
class LiveTradeHandler {
  private config: LiveModeConfig = {
    requireConfirmation: true,
    maxPositionSize: 100000, // $100k max
    syncBalance: true,
    orderTimeout: 30000, // 30 seconds
  };

  async execute(
    signal: ParsedSignal,
    quantity: number,
    currentPrice: number,
    client: IExchangeClient,
    account: { id: string; exchangeId: string }
  ): Promise<OrderResult> {
    const side = signal.direction === 'LONG' ? 'buy' : 'sell';
    const clientOrderId = `citarion-live-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    console.log(`[LIVE] Executing ${signal.direction} ${quantity} ${signal.symbol} @ ~${currentPrice}`);

    try {
      // CRITICAL: Wrap order execution with timeout
      const result = await withRetry(
        async () => {
          return await withTimeout(
            Promise.resolve(client.createOrder({
              symbol: signal.symbol,
              side,
              type: 'market',
              quantity,
              leverage: signal.leverage,
              marginMode: signal.marginMode,
              positionSide: signal.direction.toLowerCase() as 'long' | 'short',
              clientOrderId,
            })),
            this.config.orderTimeout,
            `LIVE order ${signal.symbol}`
          );
        },
        {
          maxRetries: 2,
          baseDelayMs: 1000,
          retryableErrors: ['TIMEOUT', 'EXCHANGE_UNREACHABLE', 'ORDER_TIMEOUT'],
        },
        `LIVE order ${signal.symbol}`
      );

      if (result.success) {
        console.log(`[LIVE] Order filled: ${result.order?.id} @ ${result.order?.avgPrice}`);
      } else {
        console.error(`[LIVE] Order failed: ${result.error}`);
      }

      return result;
    } catch (error) {
      // Classify error properly
      if (error instanceof TimeoutError) {
        throw new OrderError(
          `Order timeout after ${this.config.orderTimeout}ms`,
          'ORDER_TIMEOUT',
          true, // Recoverable - can retry
          { symbol: signal.symbol, timeout: this.config.orderTimeout }
        );
      }
      
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      console.error(`[LIVE] Execution error:`, errorMsg);
      
      // Check for rate limiting
      if (isRateLimitError(error)) {
        throw new ExchangeError(
          'Exchange rate limited - please wait',
          'EXCHANGE_RATE_LIMITED',
          { symbol: signal.symbol }
        );
      }
      
      return { success: false, error: errorMsg, errorCode: 'LIVE_EXECUTION_ERROR' };
    }
  }

  async closePosition(
    position: any,
    client: IExchangeClient
  ): Promise<OrderResult> {
    const side = position.direction === 'LONG' ? 'sell' : 'buy';

    // CRITICAL: Wrap close order with timeout and retry
    return await withRetry(
      async () => {
        return await withTimeout(
          Promise.resolve(client.createOrder({
            symbol: position.symbol,
            side,
            type: 'market',
            quantity: position.filledAmount,
            reduceOnly: true,
            positionSide: position.direction.toLowerCase(),
            clientOrderId: `close-live-${Date.now()}`,
          })),
          this.config.orderTimeout,
          `Close position ${position.symbol}`
        );
      },
      { maxRetries: 2 },
      `Close position ${position.symbol}`
    );
  }

  updateConfig(updates: Partial<LiveModeConfig>): void {
    Object.assign(this.config, updates);
  }

  getConfig(): LiveModeConfig {
    return { ...this.config };
  }
}

/**
 * DEMO Mode Handler
 * Basic simulation with slippage and fees
 * Suitable for: Quick testing, learning, strategy validation
 */
class DemoTradeHandler {
  private config: DemoModeConfig = {
    initialBalance: 10000,
    slippagePercent: 0.05,
    makerFeePercent: 0.02,
    takerFeePercent: 0.04,
    enableLiquidation: true,
    maintenanceMarginPercent: 0.5,
  };

  private virtualBalances: Map<string, VirtualBalance> = new Map();
  private pendingOrders: Map<string, PendingOrder[]> = new Map();

  async execute(
    signal: ParsedSignal,
    quantity: number,
    currentPrice: number,
    accountId: string
  ): Promise<OrderResult> {
    const side = signal.direction === 'LONG' ? 'buy' : 'sell';

    // Apply slippage
    const slippageFactor = signal.direction === 'LONG' 
      ? 1 + (this.config.slippagePercent / 100)
      : 1 - (this.config.slippagePercent / 100);
    const executedPrice = currentPrice * slippageFactor;

    // Calculate costs
    const positionValue = quantity * executedPrice;
    const fee = positionValue * (this.config.takerFeePercent / 100);
    const marginRequired = positionValue / signal.leverage;

    // Check balance
    const balance = this.getBalance(accountId);
    if (balance.available < marginRequired + fee) {
      return {
        success: false,
        error: `Insufficient balance. Required: ${(marginRequired + fee).toFixed(2)}, Available: ${balance.available.toFixed(2)}`,
        errorCode: 'INSUFFICIENT_BALANCE',
      };
    }

    // Deduct from balance
    this.updateBalance(accountId, -(marginRequired + fee));

    console.log(`[DEMO] Executed ${signal.direction} ${quantity} ${signal.symbol} @ ${executedPrice.toFixed(2)} (slippage: ${this.config.slippagePercent}%)`);

    return {
      success: true,
      order: {
        id: `demo-${Date.now()}`,
        symbol: signal.symbol,
        side: side as 'buy' | 'sell',
        type: 'market',
        status: 'filled',
        price: currentPrice,
        avgPrice: executedPrice,
        quantity,
        filledQuantity: quantity,
        fee,
        feeCurrency: 'USDT',
        createdAt: new Date(),
      },
    };
  }

  async closePosition(
    position: any,
    currentPrice: number
  ): Promise<OrderResult> {
    const side = position.direction === 'LONG' ? 'sell' : 'buy';

    // Calculate PnL
    const pnl = position.direction === 'LONG'
      ? (currentPrice - position.avgEntryPrice) * position.filledAmount
      : (position.avgEntryPrice - currentPrice) * position.filledAmount;

    // Apply closing fee
    const closeFee = position.filledAmount * currentPrice * (this.config.takerFeePercent / 100);
    const netPnl = pnl - closeFee;

    // Return margin + PnL
    const margin = position.avgEntryPrice * position.filledAmount / position.leverage;
    this.updateBalance(position.accountId, margin + netPnl);

    console.log(`[DEMO] Closed position ${position.symbol} PnL: ${netPnl.toFixed(2)} USDT`);

    return {
      success: true,
      order: {
        id: `demo-close-${Date.now()}`,
        symbol: position.symbol,
        side: side as 'buy' | 'sell',
        type: 'market',
        status: 'filled',
        price: currentPrice,
        avgPrice: currentPrice,
        quantity: position.filledAmount,
        filledQuantity: position.filledAmount,
        fee: closeFee,
        feeCurrency: 'USDT',
        createdAt: new Date(),
      },
    };
  }

  checkLiquidation(
    entryPrice: number,
    currentPrice: number,
    leverage: number,
    direction: Direction
  ): { isLiquidated: boolean; liquidationPrice: number } {
    if (!this.config.enableLiquidation) {
      return { isLiquidated: false, liquidationPrice: 0 };
    }

    const liquidationPrice = direction === 'LONG'
      ? entryPrice * (1 - (1 / leverage) + (this.config.maintenanceMarginPercent / 100))
      : entryPrice * (1 + (1 / leverage) - (this.config.maintenanceMarginPercent / 100));

    const isLiquidated = direction === 'LONG'
      ? currentPrice <= liquidationPrice
      : currentPrice >= liquidationPrice;

    return { isLiquidated, liquidationPrice };
  }

  getBalance(accountId: string): VirtualBalance {
    let balance = this.virtualBalances.get(accountId);
    if (!balance) {
      balance = {
        currency: 'USDT',
        total: this.config.initialBalance,
        available: this.config.initialBalance,
        frozen: 0,
      };
      this.virtualBalances.set(accountId, balance);
    }
    return balance;
  }

  updateBalance(accountId: string, delta: number): void {
    const balance = this.getBalance(accountId);
    balance.total += delta;
    balance.available += delta;
    balance.total = Math.max(0, balance.total);
    balance.available = Math.max(0, balance.available);
    this.virtualBalances.set(accountId, balance);
  }

  setInitialBalance(accountId: string, amount: number): void {
    this.virtualBalances.set(accountId, {
      currency: 'USDT',
      total: amount,
      available: amount,
      frozen: 0,
    });
  }

  updateConfig(updates: Partial<DemoModeConfig>): void {
    Object.assign(this.config, updates);
  }

  getConfig(): DemoModeConfig {
    return { ...this.config };
  }
}

/**
 * PAPER Mode Handler
 * Full simulation with metrics, equity tracking, and funding
 * Suitable for: Serious backtesting, strategy development, performance analysis
 */
class PaperTradeHandler {
  private config: PaperModeConfig = {
    initialBalance: 10000,
    slippagePercent: 0.05,
    makerFeePercent: 0.02,
    takerFeePercent: 0.04,
    enableFunding: true,
    fundingIntervalMs: 8 * 60 * 60 * 1000, // 8 hours
    baseFundingRate: 0.01,
    maintenanceMarginPercent: 0.5,
    trackEquityCurve: true,
    equityRecordInterval: 60000, // 1 minute
    calculateMetrics: true,
  };

  private virtualBalances: Map<string, VirtualBalance> = new Map();
  private pendingOrders: Map<string, PendingOrder[]> = new Map();
  private equityCurves: Map<string, EquityPoint[]> = new Map();
  private lastFundingTime: Map<string, Date> = new Map();
  private peakEquity: Map<string, number> = new Map();
  private tradeHistory: Map<string, Array<{ pnl: number; timestamp: Date; duration: number }>> = new Map();

  async execute(
    signal: ParsedSignal,
    quantity: number,
    currentPrice: number,
    accountId: string
  ): Promise<OrderResult> {
    const side = signal.direction === 'LONG' ? 'buy' : 'sell';

    // Apply slippage
    const slippageFactor = signal.direction === 'LONG' 
      ? 1 + (this.config.slippagePercent / 100)
      : 1 - (this.config.slippagePercent / 100);
    const executedPrice = currentPrice * slippageFactor;

    // Calculate costs
    const positionValue = quantity * executedPrice;
    const fee = positionValue * (this.config.takerFeePercent / 100);
    const marginRequired = positionValue / signal.leverage;

    // Check balance
    const balance = this.getBalance(accountId);
    if (balance.available < marginRequired + fee) {
      return {
        success: false,
        error: `Insufficient balance. Required: ${(marginRequired + fee).toFixed(2)}, Available: ${balance.available.toFixed(2)}`,
        errorCode: 'INSUFFICIENT_BALANCE',
      };
    }

    // Deduct from balance
    this.updateBalance(accountId, -(marginRequired + fee));

    // Record equity point
    if (this.config.trackEquityCurve) {
      await this.recordEquityPoint(accountId, executedPrice);
    }

    console.log(`[PAPER] Executed ${signal.direction} ${quantity} ${signal.symbol} @ ${executedPrice.toFixed(2)}`);

    return {
      success: true,
      order: {
        id: `paper-${Date.now()}`,
        symbol: signal.symbol,
        side: side as 'buy' | 'sell',
        type: 'market',
        status: 'filled',
        price: currentPrice,
        avgPrice: executedPrice,
        quantity,
        filledQuantity: quantity,
        fee,
        feeCurrency: 'USDT',
        createdAt: new Date(),
      },
    };
  }

  async closePosition(
    position: any,
    currentPrice: number,
    accountId: string
  ): Promise<OrderResult> {
    const side = position.direction === 'LONG' ? 'sell' : 'buy';

    // Calculate PnL
    const pnl = position.direction === 'LONG'
      ? (currentPrice - position.avgEntryPrice) * position.filledAmount
      : (position.avgEntryPrice - currentPrice) * position.filledAmount;

    // Apply closing fee
    const closeFee = position.filledAmount * currentPrice * (this.config.takerFeePercent / 100);
    const netPnl = pnl - closeFee;

    // Return margin + PnL
    const margin = position.avgEntryPrice * position.filledAmount / position.leverage;
    this.updateBalance(accountId, margin + netPnl);

    // Record trade for metrics
    const duration = position.openedAt 
      ? (Date.now() - new Date(position.openedAt).getTime()) / 60000 
      : 0;
    this.recordTrade(accountId, netPnl, duration);

    // Record equity point
    if (this.config.trackEquityCurve) {
      await this.recordEquityPoint(accountId, currentPrice);
    }

    console.log(`[PAPER] Closed position ${position.symbol} PnL: ${netPnl.toFixed(2)} USDT (duration: ${duration.toFixed(0)} min)`);

    return {
      success: true,
      order: {
        id: `paper-close-${Date.now()}`,
        symbol: position.symbol,
        side: side as 'buy' | 'sell',
        type: 'market',
        status: 'filled',
        price: currentPrice,
        avgPrice: currentPrice,
        quantity: position.filledAmount,
        filledQuantity: position.filledAmount,
        fee: closeFee,
        feeCurrency: 'USDT',
        createdAt: new Date(),
      },
    };
  }

  async settleFunding(
    accountId: string,
    symbol: string,
    positionValue: number,
    direction: Direction
  ): Promise<number> {
    if (!this.config.enableFunding) return 0;

    const key = `${accountId}:${symbol}`;
    const now = new Date();
    const lastFunding = this.lastFundingTime.get(key);

    if (lastFunding && (now.getTime() - lastFunding.getTime()) < this.config.fundingIntervalMs) {
      return 0;
    }

    // Simulate funding rate
    const fundingRate = this.config.baseFundingRate * (0.5 + Math.random());
    
    // LONG pays, SHORT receives (when rate > 0)
    const fundingPayment = direction === 'LONG'
      ? -positionValue * (fundingRate / 100)
      : positionValue * (fundingRate / 100);

    this.updateBalance(accountId, fundingPayment);
    this.lastFundingTime.set(key, now);

    console.log(`[PAPER] Funding ${symbol}: ${direction} rate=${fundingRate.toFixed(4)}% payment=${fundingPayment.toFixed(2)} USDT`);

    return fundingPayment;
  }

  checkLiquidation(
    entryPrice: number,
    currentPrice: number,
    leverage: number,
    direction: Direction
  ): { isLiquidated: boolean; liquidationPrice: number; marginRatio: number } {
    const liquidationPrice = direction === 'LONG'
      ? entryPrice * (1 - (1 / leverage) + (this.config.maintenanceMarginPercent / 100))
      : entryPrice * (1 + (1 / leverage) - (this.config.maintenanceMarginPercent / 100));

    const isLiquidated = direction === 'LONG'
      ? currentPrice <= liquidationPrice
      : currentPrice >= liquidationPrice;

    // Calculate margin ratio for warnings
    const marginRatio = direction === 'LONG'
      ? ((currentPrice - liquidationPrice) / liquidationPrice) * 100
      : ((liquidationPrice - currentPrice) / liquidationPrice) * 100;

    return { isLiquidated, liquidationPrice, marginRatio };
  }

  getBalance(accountId: string): VirtualBalance {
    let balance = this.virtualBalances.get(accountId);
    if (!balance) {
      balance = {
        currency: 'USDT',
        total: this.config.initialBalance,
        available: this.config.initialBalance,
        frozen: 0,
      };
      this.virtualBalances.set(accountId, balance);
      this.peakEquity.set(accountId, this.config.initialBalance);
    }
    return balance;
  }

  updateBalance(accountId: string, delta: number): void {
    const balance = this.getBalance(accountId);
    balance.total += delta;
    balance.available += delta;
    balance.total = Math.max(0, balance.total);
    balance.available = Math.max(0, balance.available);
    this.virtualBalances.set(accountId, balance);
  }

  setInitialBalance(accountId: string, amount: number): void {
    this.virtualBalances.set(accountId, {
      currency: 'USDT',
      total: amount,
      available: amount,
      frozen: 0,
    });
    this.peakEquity.set(accountId, amount);
  }

  private async recordEquityPoint(accountId: string, currentPrice?: number): Promise<void> {
    const balance = this.getBalance(accountId);
    
    // Get open positions
    const positions = await db.position.findMany({
      where: { accountId, status: 'OPEN', isDemo: true },
    });

    let unrealizedPnl = 0;
    for (const pos of positions) {
      if (currentPrice) {
        const pnl = pos.direction === 'LONG'
          ? (currentPrice - pos.avgEntryPrice) * pos.filledAmount * pos.leverage
          : (pos.avgEntryPrice - currentPrice) * pos.filledAmount * pos.leverage;
        unrealizedPnl += pnl;
      }
    }

    const equity = balance.total + unrealizedPnl;
    const peak = Math.max(this.peakEquity.get(accountId) || balance.total, equity);
    this.peakEquity.set(accountId, peak);

    const drawdown = peak - equity;
    const drawdownPercent = peak > 0 ? (drawdown / peak) * 100 : 0;

    const trades = this.tradeHistory.get(accountId) || [];
    const realizedPnl = trades.reduce((sum, t) => sum + t.pnl, 0);

    const point: EquityPoint = {
      timestamp: new Date(),
      balance: balance.total,
      equity,
      unrealizedPnl,
      realizedPnl,
      drawdown,
      drawdownPercent,
      openPositions: positions.length,
    };

    if (!this.equityCurves.has(accountId)) {
      this.equityCurves.set(accountId, []);
    }
    this.equityCurves.get(accountId)!.push(point);
  }

  private recordTrade(accountId: string, pnl: number, duration: number): void {
    if (!this.tradeHistory.has(accountId)) {
      this.tradeHistory.set(accountId, []);
    }
    this.tradeHistory.get(accountId)!.push({
      pnl,
      timestamp: new Date(),
      duration,
    });
  }

  getEquityCurve(accountId: string): EquityPoint[] {
    return this.equityCurves.get(accountId) || [];
  }

  getPerformanceMetrics(accountId: string): PerformanceMetrics {
    const trades = this.tradeHistory.get(accountId) || [];
    const equityCurve = this.equityCurves.get(accountId) || [];

    const wins = trades.filter(t => t.pnl > 0);
    const losses = trades.filter(t => t.pnl <= 0);
    const totalPnl = trades.reduce((sum, t) => sum + t.pnl, 0);
    const grossProfit = wins.reduce((sum, t) => sum + t.pnl, 0);
    const grossLoss = Math.abs(losses.reduce((sum, t) => sum + t.pnl, 0));

    // Win rate
    const winRate = trades.length > 0 ? (wins.length / trades.length) * 100 : 0;

    // Profit factor
    const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? Infinity : 0;

    // Sharpe Ratio
    const returns: number[] = [];
    for (let i = 1; i < equityCurve.length; i++) {
      const prev = equityCurve[i - 1].equity;
      const curr = equityCurve[i].equity;
      if (prev > 0) returns.push((curr - prev) / prev);
    }

    const avgReturn = returns.length > 0 ? returns.reduce((a, b) => a + b, 0) / returns.length : 0;
    const stdReturn = returns.length > 1
      ? Math.sqrt(returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / (returns.length - 1))
      : 0;
    const sharpeRatio = stdReturn > 0 ? (avgReturn / stdReturn) * Math.sqrt(252) : 0;

    // Sortino Ratio
    const negativeReturns = returns.filter(r => r < 0);
    const downsideDeviation = negativeReturns.length > 1
      ? Math.sqrt(negativeReturns.reduce((sum, r) => sum + Math.pow(r, 2), 0) / negativeReturns.length)
      : 0;
    const sortinoRatio = downsideDeviation > 0 ? (avgReturn / downsideDeviation) * Math.sqrt(252) : 0;

    // Drawdown
    const drawdowns = equityCurve.map(p => p.drawdownPercent);
    const maxDrawdownPercent = drawdowns.length > 0 ? Math.max(...drawdowns) : 0;
    const avgDrawdown = drawdowns.length > 0 ? drawdowns.reduce((a, b) => a + b, 0) / drawdowns.length : 0;
    const maxDrawdown = Math.max(...equityCurve.map(p => p.drawdown), 0);

    // Time in drawdown
    const inDrawdown = equityCurve.filter(p => p.drawdownPercent > 0).length;
    const timeInDrawdown = equityCurve.length > 0 ? (inDrawdown / equityCurve.length) * 100 : 0;

    // Streaks
    let maxWinStreak = 0, maxLossStreak = 0, currentWinStreak = 0, currentLossStreak = 0;
    for (const trade of trades) {
      if (trade.pnl > 0) {
        currentWinStreak++;
        currentLossStreak = 0;
        maxWinStreak = Math.max(maxWinStreak, currentWinStreak);
      } else {
        currentLossStreak++;
        currentWinStreak = 0;
        maxLossStreak = Math.max(maxLossStreak, currentLossStreak);
      }
    }

    const avgTradeDuration = trades.length > 0 ? trades.reduce((sum, t) => sum + t.duration, 0) / trades.length : 0;
    const totalPnlPercent = (totalPnl / this.config.initialBalance) * 100;

    return {
      totalTrades: trades.length,
      winningTrades: wins.length,
      losingTrades: losses.length,
      winRate,
      totalPnl,
      totalPnlPercent,
      avgWin: wins.length > 0 ? grossProfit / wins.length : 0,
      avgLoss: losses.length > 0 ? grossLoss / losses.length : 0,
      profitFactor,
      sharpeRatio,
      sortinoRatio,
      maxDrawdown,
      maxDrawdownPercent,
      avgDrawdown,
      timeInDrawdown,
      maxWinStreak,
      maxLossStreak,
      avgTradeDuration,
    };
  }

  updateConfig(updates: Partial<PaperModeConfig>): void {
    Object.assign(this.config, updates);
  }

  getConfig(): PaperModeConfig {
    return { ...this.config };
  }
}

// ==================== MODE HANDLER FACTORY ====================

/**
 * Get mode-specific handler
 */
function getModeHandler(mode: TradingMode): LiveTradeHandler | DemoTradeHandler | PaperTradeHandler {
  switch (mode) {
    case 'LIVE':
      return liveHandler;
    case 'DEMO':
      return demoHandler;
    case 'PAPER':
      return paperHandler;
    default:
      return demoHandler;
  }
}

// Singleton handlers
const liveHandler = new LiveTradeHandler();
const demoHandler = new DemoTradeHandler();
const paperHandler = new PaperTradeHandler();

// ==================== EXPORTS ====================

export const unifiedTradingEngine = UnifiedTradingEngine.getInstance();
export { 
  LiveTradeHandler, 
  DemoTradeHandler, 
  PaperTradeHandler,
  liveHandler,
  demoHandler,
  paperHandler
};
export default unifiedTradingEngine;
