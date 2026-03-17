/**
 * Market Info Service
 * 
 * Provides cached market information including:
 * - Price/amount precision
 * - Min/max order sizes
 * - Contract size for futures
 * - Max leverage per symbol
 * - Margin requirements
 * 
 * Features:
 * - TTL-based caching (configurable per exchange)
 * - Automatic refresh on cache expiry
 * - Fallback to cached data on error
 * - Exchange-specific adapters
 */

import { db } from '@/lib/db';
import { ExchangeId, AllExchangeId } from './types';

// ==================== TYPES ====================

export interface MarketInfo {
  symbol: string;
  exchange: AllExchangeId;
  
  // Symbol info
  baseAsset: string;
  quoteAsset: string;
  
  // Precision
  pricePrecision: number;      // Decimal places for price
  amountPrecision: number;     // Decimal places for quantity
  minPrice: number;
  maxPrice: number;
  
  // Order limits
  minAmount: number;           // Min quantity per order
  maxAmount: number;           // Max quantity per order
  minNotional: number;         // Min order value (price * qty)
  maxNotional?: number;        // Max order value
  
  // Futures specific
  contractSize?: number;       // Contract multiplier (default: 1)
  contractType?: 'PERPETUAL' | 'DELIVERY' | 'LINEAR' | 'INVERSE';
  settlementAsset?: string;    // e.g., USDT, BUSD, USDC
  
  // Leverage
  maxLeverage: number;         // Max leverage for this symbol
  leverageBrackets?: LeverageBracket[];
  
  // Margin
  initialMarginFactor?: number;
  maintenanceMarginFactor?: number;
  
  // Trading rules
  supportsMarketOrder: boolean;
  supportsLimitOrder: boolean;
  supportsStopOrder: boolean;
  supportsTrailingStop: boolean;
  supportsReduceOnly: boolean;
  
  // Timestamps
  updatedAt: Date;
  cachedAt: Date;
}

export interface LeverageBracket {
  bracket: number;
  maxNotional: number;
  minNotional: number;
  maxLeverage: number;
  maintenanceMarginRate: number;
  initialMarginRate?: number;
}

export interface MarketInfoCacheConfig {
  ttlMs: number;               // Cache TTL in milliseconds
  staleWhileRevalidateMs: number; // Use stale data while revalidating
  maxEntries: number;          // Max entries in cache
}

// ==================== CACHE CONFIG ====================

const DEFAULT_CACHE_CONFIG: MarketInfoCacheConfig = {
  ttlMs: 5 * 60 * 1000,        // 5 minutes
  staleWhileRevalidateMs: 60 * 60 * 1000, // 1 hour stale
  maxEntries: 10000,
};

const EXCHANGE_CACHE_CONFIG: Partial<Record<AllExchangeId, MarketInfoCacheConfig>> = {
  binance: { ttlMs: 5 * 60 * 1000, staleWhileRevalidateMs: 60 * 60 * 1000, maxEntries: 2000 },
  bybit: { ttlMs: 5 * 60 * 1000, staleWhileRevalidateMs: 60 * 60 * 1000, maxEntries: 2000 },
  okx: { ttlMs: 5 * 60 * 1000, staleWhileRevalidateMs: 60 * 60 * 1000, maxEntries: 2000 },
  bitget: { ttlMs: 5 * 60 * 1000, staleWhileRevalidateMs: 60 * 60 * 1000, maxEntries: 2000 },
  bingx: { ttlMs: 10 * 60 * 1000, staleWhileRevalidateMs: 2 * 60 * 60 * 1000, maxEntries: 500 },
};

// ==================== CONTRACT SIZE MAPPING ====================

/**
 * Contract sizes for futures symbols
 * Some exchanges use contract multipliers (e.g., BTC = 0.001 BTC per contract)
 */
const CONTRACT_SIZES: Partial<Record<string, number>> = {
  // Binance Futures
  'BTCUSDT': 0.001,            // 0.001 BTC per contract (on some contracts)
  'ETHUSDT': 0.01,             // 0.01 ETH per contract
  
  // Default for USDT-margined futures is 1 (linear)
  // Most symbols use 1 contract = 1 base asset
};

/**
 * Get contract size for symbol
 */
export function getContractSize(symbol: string): number {
  return CONTRACT_SIZES[symbol] ?? 1;
}

// ==================== MARKET INFO SERVICE ====================

class MarketInfoService {
  private cache: Map<string, MarketInfo> = new Map();
  private cacheTimestamps: Map<string, number> = new Map();
  private pendingRequests: Map<string, Promise<MarketInfo | null>> = new Map();
  
  /**
   * Get market info for symbol
   */
  async getMarketInfo(
    symbol: string,
    exchangeId: AllExchangeId,
    client?: {
      getMarketInfo?: (symbol: string) => Promise<MarketInfo | null>;
    }
  ): Promise<MarketInfo | null> {
    const cacheKey = `${exchangeId}:${symbol}`;
    const config = EXCHANGE_CACHE_CONFIG[exchangeId] ?? DEFAULT_CACHE_CONFIG;
    
    // Check cache
    const cached = this.cache.get(cacheKey);
    const cachedAt = this.cacheTimestamps.get(cacheKey) ?? 0;
    const now = Date.now();
    const age = now - cachedAt;
    
    // Return fresh cache
    if (cached && age < config.ttlMs) {
      return cached;
    }
    
    // Use stale cache while revalidating
    if (cached && age < config.staleWhileRevalidateMs) {
      // Trigger background refresh
      this.refreshInBackground(cacheKey, symbol, exchangeId, client);
      return cached;
    }
    
    // No cache or expired - fetch fresh
    return this.fetchMarketInfo(cacheKey, symbol, exchangeId, client);
  }
  
  /**
   * Get max leverage for symbol
   */
  async getMaxLeverage(
    symbol: string,
    exchangeId: AllExchangeId,
    client?: { getMarketInfo?: (symbol: string) => Promise<MarketInfo | null> }
  ): Promise<number> {
    const info = await this.getMarketInfo(symbol, exchangeId, client);
    return info?.maxLeverage ?? 125; // Default max
  }
  
  /**
   * Validate and adjust leverage
   */
  async validateLeverage(
    symbol: string,
    exchangeId: AllExchangeId,
    requestedLeverage: number,
    client?: { getMarketInfo?: (symbol: string) => Promise<MarketInfo | null> }
  ): Promise<{ leverage: number; adjusted: boolean; maxAllowed: number }> {
    const maxLeverage = await this.getMaxLeverage(symbol, exchangeId, client);
    
    if (requestedLeverage > maxLeverage) {
      console.warn(`[MarketInfo] Leverage ${requestedLeverage}x exceeds max ${maxLeverage}x for ${symbol}`);
      return { leverage: maxLeverage, adjusted: true, maxAllowed: maxLeverage };
    }
    
    return { leverage: requestedLeverage, adjusted: false, maxAllowed: maxLeverage };
  }
  
  /**
   * Format price according to symbol precision
   */
  formatPrice(price: number, marketInfo: MarketInfo): string {
    return price.toFixed(marketInfo.pricePrecision);
  }
  
  /**
   * Format amount according to symbol precision
   */
  formatAmount(amount: number, marketInfo: MarketInfo): string {
    return amount.toFixed(marketInfo.amountPrecision);
  }
  
  /**
   * Convert USDT amount to contracts
   */
  convertUsdtToContracts(
    usdtAmount: number,
    price: number,
    leverage: number,
    marketInfo: MarketInfo
  ): {
    contracts: number;
    formattedQuantity: number;
    notionalValue: number;
    marginUsed: number;
  } {
    const contractSize = marketInfo.contractSize ?? 1;
    const notionalValue = usdtAmount * leverage;
    const contracts = notionalValue / price / contractSize;
    
    // Format to precision
    const formattedQuantity = Math.floor(contracts * Math.pow(10, marketInfo.amountPrecision)) / 
                              Math.pow(10, marketInfo.amountPrecision);
    
    const marginUsed = (formattedQuantity * price * contractSize) / leverage;
    
    return {
      contracts,
      formattedQuantity,
      notionalValue: formattedQuantity * price * contractSize,
      marginUsed,
    };
  }
  
  /**
   * Convert contracts to USDT value
   */
  convertContractsToUsdt(
    contracts: number,
    price: number,
    marketInfo: MarketInfo
  ): { baseAssetAmount: number; quoteAssetValue: number } {
    const contractSize = marketInfo.contractSize ?? 1;
    const baseAssetAmount = contracts * contractSize;
    const quoteAssetValue = baseAssetAmount * price;
    
    return { baseAssetAmount, quoteAssetValue };
  }
  
  // ==================== PRIVATE METHODS ====================
  
  private refreshInBackground(
    cacheKey: string,
    symbol: string,
    exchangeId: AllExchangeId,
    client?: { getMarketInfo?: (symbol: string) => Promise<MarketInfo | null> }
  ): void {
    // Don't await - run in background
    this.fetchMarketInfo(cacheKey, symbol, exchangeId, client).catch(err => {
      console.error(`[MarketInfo] Background refresh failed for ${cacheKey}:`, err);
    });
  }
  
  private async fetchMarketInfo(
    cacheKey: string,
    symbol: string,
    exchangeId: AllExchangeId,
    client?: { getMarketInfo?: (symbol: string) => Promise<MarketInfo | null> }
  ): Promise<MarketInfo | null> {
    // Deduplicate concurrent requests
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey)!;
    }
    
    const promise = this.doFetchMarketInfo(cacheKey, symbol, exchangeId, client);
    this.pendingRequests.set(cacheKey, promise);
    
    try {
      const result = await promise;
      return result;
    } finally {
      this.pendingRequests.delete(cacheKey);
    }
  }
  
  private async doFetchMarketInfo(
    cacheKey: string,
    symbol: string,
    exchangeId: AllExchangeId,
    client?: { getMarketInfo?: (symbol: string) => Promise<MarketInfo | null> }
  ): Promise<MarketInfo | null> {
    try {
      // Try to get from exchange client
      if (client?.getMarketInfo) {
        const info = await client.getMarketInfo(symbol);
        if (info) {
          this.cache.set(cacheKey, info);
          this.cacheTimestamps.set(cacheKey, Date.now());
          return info;
        }
      }
      
      // Try to get from database cache
      const dbInfo = await this.getFromDatabase(symbol, exchangeId);
      if (dbInfo) {
        this.cache.set(cacheKey, dbInfo);
        this.cacheTimestamps.set(cacheKey, Date.now());
        return dbInfo;
      }
      
      // Return default values
      return this.getDefaultMarketInfo(symbol, exchangeId);
      
    } catch (error) {
      console.error(`[MarketInfo] Failed to fetch ${cacheKey}:`, error);
      
      // Return stale cache if available
      const stale = this.cache.get(cacheKey);
      if (stale) {
        return stale;
      }
      
      return this.getDefaultMarketInfo(symbol, exchangeId);
    }
  }
  
  private async getFromDatabase(symbol: string, exchangeId: AllExchangeId): Promise<MarketInfo | null> {
    try {
      const record = await db.marketCache.findUnique({
        where: {
          exchange_symbol: {
            exchange: exchangeId,
            symbol: symbol,
          },
        },
      });
      
      if (!record) return null;
      
      return {
        symbol: record.symbol,
        exchange: record.exchange as AllExchangeId,
        baseAsset: record.baseAsset,
        quoteAsset: record.quoteAsset,
        pricePrecision: record.pricePrecision,
        amountPrecision: record.amountPrecision,
        minPrice: record.minPrice,
        maxPrice: record.maxPrice,
        minAmount: record.minAmount,
        maxAmount: record.maxAmount,
        minNotional: record.minNotional,
        maxNotional: record.maxNotional ?? undefined,
        contractSize: record.contractSize ?? undefined,
        maxLeverage: record.maxLeverage,
        supportsMarketOrder: record.supportsMarketOrder,
        supportsLimitOrder: record.supportsLimitOrder,
        supportsStopOrder: record.supportsStopOrder,
        supportsTrailingStop: record.supportsTrailingStop,
        supportsReduceOnly: record.supportsReduceOnly,
        updatedAt: record.updatedAt,
        cachedAt: record.updatedAt,
      };
    } catch {
      return null;
    }
  }
  
  private getDefaultMarketInfo(symbol: string, exchangeId: AllExchangeId): MarketInfo {
    // Extract base/quote from symbol (e.g., BTCUSDT -> BTC, USDT)
    const quoteAssets = ['USDT', 'USDC', 'BUSD', 'USD'];
    let baseAsset = '';
    let quoteAsset = 'USDT';
    
    for (const quote of quoteAssets) {
      if (symbol.endsWith(quote)) {
        baseAsset = symbol.slice(0, -quote.length);
        quoteAsset = quote;
        break;
      }
    }
    
    if (!baseAsset) {
      baseAsset = symbol.slice(0, -4);
      quoteAsset = symbol.slice(-4);
    }
    
    return {
      symbol,
      exchange: exchangeId,
      baseAsset,
      quoteAsset,
      pricePrecision: 2,
      amountPrecision: 3,
      minPrice: 0.00000001,
      maxPrice: 1000000000,
      minAmount: 0.001,
      maxAmount: 100000000,
      minNotional: 5,
      maxLeverage: 125,
      supportsMarketOrder: true,
      supportsLimitOrder: true,
      supportsStopOrder: true,
      supportsTrailingStop: true,
      supportsReduceOnly: true,
      contractSize: 1,
      updatedAt: new Date(),
      cachedAt: new Date(),
    };
  }
  
  /**
   * Clear cache for specific symbol or all
   */
  clearCache(symbol?: string, exchangeId?: AllExchangeId): void {
    if (symbol && exchangeId) {
      const cacheKey = `${exchangeId}:${symbol}`;
      this.cache.delete(cacheKey);
      this.cacheTimestamps.delete(cacheKey);
    } else {
      this.cache.clear();
      this.cacheTimestamps.clear();
    }
  }
  
  /**
   * Get cache statistics
   */
  getCacheStats(): { entries: number; oldestEntry: number; newestEntry: number } {
    const timestamps = Array.from(this.cacheTimestamps.values());
    return {
      entries: this.cache.size,
      oldestEntry: timestamps.length > 0 ? Math.min(...timestamps) : 0,
      newestEntry: timestamps.length > 0 ? Math.max(...timestamps) : 0,
    };
  }
}

// ==================== SINGLETON EXPORT ====================

export const marketInfoService = new MarketInfoService();

// ==================== HELPER FUNCTIONS ====================

/**
 * Quick helper to validate leverage
 */
export async function validateLeverageForSymbol(
  symbol: string,
  exchangeId: AllExchangeId,
  leverage: number,
  client?: { getMarketInfo?: (symbol: string) => Promise<MarketInfo | null> }
): Promise<number> {
  const result = await marketInfoService.validateLeverage(symbol, exchangeId, leverage, client);
  return result.leverage;
}

/**
 * Quick helper to convert USDT to contracts
 */
export function usdtToContracts(
  usdtAmount: number,
  price: number,
  leverage: number,
  symbol: string,
  marketInfo?: MarketInfo
): { contracts: number; quantity: number; margin: number } {
  const info = marketInfo ?? marketInfoService.getDefaultMarketInfo(symbol, 'binance');
  const result = marketInfoService.convertUsdtToContracts(usdtAmount, price, leverage, info);
  
  return {
    contracts: result.contracts,
    quantity: result.formattedQuantity,
    margin: result.marginUsed,
  };
}
