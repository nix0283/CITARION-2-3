/**
 * Unified Price Hub
 * 
 * Единый источник цен для всех модулей платформы.
 * Устраняет проблему разных источников цен в разных модулях.
 * 
 * Архитектура:
 * ┌──────────────────────────────────────────────────────┐
 * │                   UnifiedPriceHub                     │
 * │                                                       │
 * │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
 * │  │   Binance   │  │    Bybit    │  │     OKX     │  │
 * │  │    WS       │  │     WS      │  │     WS      │  │
 * │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  │
 * │         │                │                │         │
 * │         └────────────────┼────────────────┘         │
 * │                          ▼                           │
 * │                  ┌─────────────┐                    │
 * │                  │ Price Cache │                    │
 * │                  └──────┬──────┘                    │
 * │                         │                            │
 * │         ┌───────────────┼───────────────┐           │
 * │         ▼               ▼               ▼           │
 * │    Trading       PaperTrading    Dashboard          │
 * │    Engine          Engine                           │
 * └──────────────────────────────────────────────────────┘
 * 
 * Использование:
 * 
 * // Получить цену
 * const price = await priceHub.getPrice('BTCUSDT');
 * 
 * // Подписаться на обновления
 * const unsub = priceHub.subscribe('BTCUSDT', (data) => {
 *   console.log('Price update:', data.price);
 * });
 * 
 * // Отписаться
 * unsub();
 */

import { EventEmitter } from 'events';

// ==================== TYPES ====================

export type PriceSource = 'binance' | 'bybit' | 'okx' | 'bitget' | 'bingx' | 'rest' | 'fallback';

export interface UnifiedPriceData {
  symbol: string;
  price: number;
  bid: number;
  ask: number;
  spread: number;
  spreadPercent: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  source: PriceSource;
  timestamp: number;
  confidence: number; // 0-1, based on source reliability
}

export interface PriceSubscription {
  symbol: string;
  callback: (data: UnifiedPriceData) => void;
  interval?: number; // Minimum interval between callbacks (ms)
  lastCalled?: number;
}

export interface PriceHubConfig {
  /** Default exchange for price fetching */
  defaultExchange: PriceSource;
  /** Cache TTL in milliseconds */
  cacheTTL: number;
  /** Enable REST fallback when WebSocket unavailable */
  enableRestFallback: boolean;
  /** Fallback prices for demo trading */
  fallbackPrices: Record<string, number>;
  /** Enable logging */
  enableLogging: boolean;
}

// ==================== EXCHANGE REST APIs ====================

interface ExchangeAPI {
  url: string;
  formatSymbol: (symbol: string) => string;
  parsePrice: (data: any) => number | null;
  parseBid?: (data: any) => number | null;
  parseAsk?: (data: any) => number | null;
  parseChange24h?: (data: any) => number | null;
  parseVolume?: (data: any) => number | null;
}

const EXCHANGE_APIS: Record<string, ExchangeAPI> = {
  binance: {
    url: 'https://api.binance.com/api/v3/ticker/24hr?symbol=',
    formatSymbol: (s) => s.toUpperCase().replace(/[^A-Z0-9]/g, ''),
    parsePrice: (d) => parseFloat(d.lastPrice),
    parseBid: (d) => parseFloat(d.bidPrice),
    parseAsk: (d) => parseFloat(d.askPrice),
    parseChange24h: (d) => parseFloat(d.priceChangePercent),
    parseVolume: (d) => parseFloat(d.quoteVolume),
  },
  bybit: {
    url: 'https://api.bybit.com/v5/market/tickers?category=linear&symbol=',
    formatSymbol: (s) => s.toUpperCase().replace(/[^A-Z0-9]/g, ''),
    parsePrice: (d) => parseFloat(d.result?.list?.[0]?.lastPrice),
    parseBid: (d) => parseFloat(d.result?.list?.[0]?.bid1Price),
    parseAsk: (d) => parseFloat(d.result?.list?.[0]?.ask1Price),
    parseChange24h: (d) => parseFloat(d.result?.list?.[0]?.price24hPcnt || '0') * 100,
    parseVolume: (d) => parseFloat(d.result?.list?.[0]?.volume24h || '0'),
  },
  okx: {
    url: 'https://www.okx.com/api/v5/market/ticker?instId=',
    formatSymbol: (s) => {
      const symbol = s.toUpperCase().replace(/[^A-Z0-9]/g, '');
      return `${symbol.replace('USDT', '-USDT')}-SWAP`;
    },
    parsePrice: (d) => parseFloat(d.data?.[0]?.last),
    parseBid: (d) => parseFloat(d.data?.[0]?.bidPx),
    parseAsk: (d) => parseFloat(d.data?.[0]?.askPx),
    parseChange24h: (d) => parseFloat(d.data?.[0]?.open24h) > 0
      ? ((parseFloat(d.data?.[0]?.last) - parseFloat(d.data?.[0]?.open24h)) / parseFloat(d.data?.[0]?.open24h)) * 100
      : 0,
    parseVolume: (d) => parseFloat(d.data?.[0]?.vol24h || '0'),
  },
};

// ==================== DEFAULT CONFIG ====================

const DEFAULT_CONFIG: PriceHubConfig = {
  defaultExchange: 'binance',
  cacheTTL: 5000, // 5 seconds
  enableRestFallback: true,
  fallbackPrices: {
    BTCUSDT: 97000,
    ETHUSDT: 3400,
    BNBUSDT: 620,
    SOLUSDT: 180,
    XRPUSDT: 2.5,
    DOGEUSDT: 0.35,
    ADAUSDT: 0.85,
    AVAXUSDT: 38,
    LINKUSDT: 16,
    DOTUSDT: 6.5,
    MATICUSDT: 0.45,
    LTCUSDT: 95,
    ATOMUSDT: 10,
    UNIUSDT: 12,
    NEARUSDT: 5.5,
    ARBUSDT: 0.85,
    OPUSDT: 1.5,
    APTUSDT: 8,
    SUIUSDT: 3.5,
    SEIUSDT: 0.35,
  },
  enableLogging: false,
};

// ==================== UNIFIED PRICE HUB CLASS ====================

export class UnifiedPriceHub extends EventEmitter {
  private static instance: UnifiedPriceHub;
  
  private config: PriceHubConfig;
  private priceCache: Map<string, { data: UnifiedPriceData; timestamp: number }> = new Map();
  private subscriptions: Map<string, Set<PriceSubscription>> = new Map();
  private wsPrices: Map<string, UnifiedPriceData> = new Map();
  private pendingRequests: Map<string, Promise<UnifiedPriceData | null>> = new Map();
  
  private constructor(config: Partial<PriceHubConfig> = {}) {
    super();
    this.config = { ...DEFAULT_CONFIG, ...config };
  }
  
  static getInstance(config?: Partial<PriceHubConfig>): UnifiedPriceHub {
    if (!UnifiedPriceHub.instance) {
      UnifiedPriceHub.instance = new UnifiedPriceHub(config);
    }
    return UnifiedPriceHub.instance;
  }
  
  // ==================== PUBLIC METHODS ====================
  
  /**
   * Get price for a symbol
   * Priority: WS Cache > Memory Cache > REST API > Fallback
   */
  async getPrice(symbol: string, exchange?: PriceSource): Promise<number> {
    const data = await this.getPriceData(symbol, exchange);
    return data?.price ?? this.getFallbackPrice(symbol);
  }
  
  /**
   * Get full price data for a symbol
   */
  async getPriceData(symbol: string, exchange?: PriceSource): Promise<UnifiedPriceData | null> {
    const normalizedSymbol = this.normalizeSymbol(symbol);
    const source = exchange ?? this.config.defaultExchange;
    
    // Check for pending request (deduplication)
    const pendingKey = `${source}:${normalizedSymbol}`;
    if (this.pendingRequests.has(pendingKey)) {
      return this.pendingRequests.get(pendingKey)!;
    }
    
    // 1. Check WebSocket cache (real-time)
    const wsPrice = this.wsPrices.get(normalizedSymbol);
    if (wsPrice && Date.now() - wsPrice.timestamp < this.config.cacheTTL) {
      return wsPrice;
    }
    
    // 2. Check memory cache
    const cached = this.priceCache.get(normalizedSymbol);
    if (cached && Date.now() - cached.timestamp < this.config.cacheTTL) {
      return cached.data;
    }
    
    // 3. Fetch from REST API
    if (this.config.enableRestFallback) {
      const promise = this.fetchPriceFromAPI(normalizedSymbol, source);
      this.pendingRequests.set(pendingKey, promise);
      
      try {
        const data = await promise;
        if (data) {
          this.priceCache.set(normalizedSymbol, { data, timestamp: Date.now() });
          return data;
        }
      } finally {
        this.pendingRequests.delete(pendingKey);
      }
    }
    
    // 4. Return fallback
    return this.createFallbackData(normalizedSymbol);
  }
  
  /**
   * Subscribe to price updates
   */
  subscribe(symbol: string, callback: (data: UnifiedPriceData) => void, interval = 0): () => void {
    const normalizedSymbol = this.normalizeSymbol(symbol);
    
    const subscription: PriceSubscription = {
      symbol: normalizedSymbol,
      callback,
      interval,
      lastCalled: 0,
    };
    
    if (!this.subscriptions.has(normalizedSymbol)) {
      this.subscriptions.set(normalizedSymbol, new Set());
    }
    
    this.subscriptions.get(normalizedSymbol)!.add(subscription);
    
    // Immediately call with current price if available
    const currentPrice = this.wsPrices.get(normalizedSymbol) || this.priceCache.get(normalizedSymbol)?.data;
    if (currentPrice) {
      callback(currentPrice);
    }
    
    // Return unsubscribe function
    return () => {
      this.subscriptions.get(normalizedSymbol)?.delete(subscription);
    };
  }
  
  /**
   * Subscribe to multiple symbols
   */
  subscribeMulti(symbols: string[], callback: (data: Record<string, UnifiedPriceData>) => void, interval = 1000): () => void {
    const unsubs: Array<() => void> = [];
    const latestPrices: Record<string, UnifiedPriceData> = {};
    let lastCalled = 0;
    
    for (const symbol of symbols) {
      const unsub = this.subscribe(symbol, (data) => {
        latestPrices[data.symbol] = data;
        
        // Throttle callback
        const now = Date.now();
        if (now - lastCalled >= interval) {
          lastCalled = now;
          callback({ ...latestPrices });
        }
      }, 0);
      unsubs.push(unsub);
    }
    
    return () => unsubs.forEach(u => u());
  }
  
  /**
   * Update price from WebSocket (called by WebSocket handlers)
   */
  updateFromWebSocket(data: UnifiedPriceData): void {
    this.wsPrices.set(data.symbol, data);
    
    // Notify subscribers
    const subs = this.subscriptions.get(data.symbol);
    if (subs) {
      const now = Date.now();
      for (const sub of subs) {
        // Check interval throttle
        if (sub.interval && now - (sub.lastCalled ?? 0) < sub.interval) {
          continue;
        }
        sub.lastCalled = now;
        sub.callback(data);
      }
    }
    
    // Emit event
    this.emit('price', data);
  }
  
  /**
   * Get all cached prices
   */
  getAllPrices(): Record<string, UnifiedPriceData> {
    const result: Record<string, UnifiedPriceData> = {};
    
    // WS prices take priority
    for (const [symbol, data] of this.wsPrices) {
      result[symbol] = data;
    }
    
    // Add cached prices not in WS
    for (const [symbol, { data }] of this.priceCache) {
      if (!result[symbol]) {
        result[symbol] = data;
      }
    }
    
    return result;
  }
  
  /**
   * Get prices for specific exchange
   */
  getPricesForExchange(exchange: PriceSource): Record<string, UnifiedPriceData> {
    const result: Record<string, UnifiedPriceData> = {};
    
    for (const [symbol, data] of this.wsPrices) {
      if (data.source === exchange) {
        result[symbol] = data;
      }
    }
    
    return result;
  }
  
  /**
   * Clear cache
   */
  clearCache(): void {
    this.priceCache.clear();
    this.wsPrices.clear();
  }
  
  /**
   * Update config
   */
  updateConfig(updates: Partial<PriceHubConfig>): void {
    Object.assign(this.config, updates);
  }
  
  /**
   * Get config
   */
  getConfig(): PriceHubConfig {
    return { ...this.config };
  }
  
  // ==================== PRIVATE METHODS ====================
  
  private normalizeSymbol(symbol: string): string {
    return symbol.toUpperCase().replace(/[^A-Z0-9]/g, '');
  }
  
  private async fetchPriceFromAPI(symbol: string, exchange: PriceSource): Promise<UnifiedPriceData | null> {
    const api = EXCHANGE_APIS[exchange];
    if (!api) return null;
    
    try {
      const formattedSymbol = api.formatSymbol(symbol);
      const response = await fetch(`${api.url}${formattedSymbol}`, {
        next: { revalidate: 5 },
        headers: { 'Accept': 'application/json' },
      });
      
      if (!response.ok) return null;
      
      const data = await response.json();
      
      const price = api.parsePrice(data);
      if (price === null || isNaN(price)) return null;
      
      const bid = api.parseBid?.(data) ?? price;
      const ask = api.parseAsk?.(data) ?? price;
      const spread = ask - bid;
      const spreadPercent = bid > 0 ? (spread / bid) * 100 : 0;
      
      return {
        symbol,
        price,
        bid,
        ask,
        spread,
        spreadPercent,
        change24h: api.parseChange24h?.(data) ?? 0,
        high24h: 0,
        low24h: 0,
        volume24h: api.parseVolume?.(data) ?? 0,
        source: exchange,
        timestamp: Date.now(),
        confidence: 0.9, // High confidence for direct API
      };
    } catch (error) {
      if (this.config.enableLogging) {
        console.error(`[PriceHub] API error for ${symbol} on ${exchange}:`, error);
      }
      return null;
    }
  }
  
  private getFallbackPrice(symbol: string): number {
    const normalized = this.normalizeSymbol(symbol);
    
    // Direct match
    if (this.config.fallbackPrices[normalized]) {
      return this.config.fallbackPrices[normalized];
    }
    
    // Try with USDT suffix
    const withUSDT = normalized.includes('USDT') ? normalized : `${normalized}USDT`;
    if (this.config.fallbackPrices[withUSDT]) {
      return this.config.fallbackPrices[withUSDT];
    }
    
    // Try removing USDT and re-adding
    const base = normalized.replace('USDT', '');
    const baseWithUSDT = `${base}USDT`;
    if (this.config.fallbackPrices[baseWithUSDT]) {
      return this.config.fallbackPrices[baseWithUSDT];
    }
    
    // Default fallback
    return 100;
  }
  
  private createFallbackData(symbol: string): UnifiedPriceData {
    const price = this.getFallbackPrice(symbol);
    
    return {
      symbol,
      price,
      bid: price * 0.9999,
      ask: price * 1.0001,
      spread: price * 0.0002,
      spreadPercent: 0.02,
      change24h: 0,
      high24h: price,
      low24h: price,
      volume24h: 0,
      source: 'fallback',
      timestamp: Date.now(),
      confidence: 0.1, // Low confidence for fallback
    };
  }
}

// ==================== SINGLETON EXPORT ====================

export const priceHub = UnifiedPriceHub.getInstance();

// ==================== CONVENIENCE FUNCTIONS ====================

/**
 * Get price (convenience function)
 */
export async function getPrice(symbol: string, exchange?: PriceSource): Promise<number> {
  return priceHub.getPrice(symbol, exchange);
}

/**
 * Get price data (convenience function)
 */
export async function getPriceData(symbol: string, exchange?: PriceSource): Promise<UnifiedPriceData | null> {
  return priceHub.getPriceData(symbol, exchange);
}

/**
 * Subscribe to price (convenience function)
 */
export function subscribePrice(
  symbol: string,
  callback: (data: UnifiedPriceData) => void,
  interval?: number
): () => void {
  return priceHub.subscribe(symbol, callback, interval);
}

export default priceHub;
