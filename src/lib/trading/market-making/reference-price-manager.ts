/**
 * Reference Price Manager
 * 
 * Inspired by OctoBot-Market-Making implementation
 * Manages reference price from multiple sources for arbitrage protection
 */

import {
  PriceSourceType,
  ReferencePrice,
  ReferencePriceConfig,
  PriceDeviationEvent,
  DEFAULT_REFERENCE_PRICE_CONFIG,
} from './types';
import { EventEmitter } from 'events';

// =============================================================================
// PRICE SOURCE INTERFACE
// =============================================================================

/**
 * Price source provider interface
 */
export interface PriceSourceProvider {
  name: string;
  getPrice(symbol: string): Promise<ReferencePrice>;
  subscribe?(symbol: string, callback: (price: ReferencePrice) => void): () => void;
}

// =============================================================================
// EXCHANGE PRICE SOURCES
// =============================================================================

/**
 * Binance price source
 */
export class BinancePriceSource implements PriceSourceProvider {
  name = 'binance';
  private baseUrl = 'https://api.binance.com';

  async getPrice(symbol: string): Promise<ReferencePrice> {
    try {
      // Convert symbol format (BTCUSDT)
      const binanceSymbol = symbol.replace('/', '').replace('-', '');
      
      const response = await fetch(
        `${this.baseUrl}/api/v3/ticker/24hr?symbol=${binanceSymbol}`
      );

      if (!response.ok) {
        throw new Error(`Binance API error: ${response.status}`);
      }

      const data = await response.json();

      return {
        price: parseFloat(data.lastPrice),
        source: 'binance',
        symbol: symbol,
        timestamp: new Date(),
        bid: parseFloat(data.bidPrice),
        ask: parseFloat(data.askPrice),
        volume24h: parseFloat(data.volume),
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch Binance price for ${symbol}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}

/**
 * Bybit price source
 */
export class BybitPriceSource implements PriceSourceProvider {
  name = 'bybit';
  private baseUrl = 'https://api.bybit.com';

  async getPrice(symbol: string): Promise<ReferencePrice> {
    try {
      // Convert symbol format (BTCUSDT)
      const bybitSymbol = symbol.replace('/', '').replace('-', '');
      
      const response = await fetch(
        `${this.baseUrl}/v5/market/tickers?category=linear&symbol=${bybitSymbol}`
      );

      if (!response.ok) {
        throw new Error(`Bybit API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.retCode !== 0 || !data.result?.list?.[0]) {
        throw new Error(`Bybit API returned no data for ${symbol}`);
      }

      const ticker = data.result.list[0];

      return {
        price: parseFloat(ticker.lastPrice),
        source: 'bybit',
        symbol: symbol,
        timestamp: new Date(),
        bid: parseFloat(ticker.bid1Price),
        ask: parseFloat(ticker.ask1Price),
        volume24h: parseFloat(ticker.volume24h),
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch Bybit price for ${symbol}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}

/**
 * OKX price source
 */
export class OKXPriceSource implements PriceSourceProvider {
  name = 'okx';
  private baseUrl = 'https://www.okx.com';

  async getPrice(symbol: string): Promise<ReferencePrice> {
    try {
      // Convert symbol format (BTC-USDT-SWAP)
      const parts = symbol.replace('/', '-').split('-');
      const okxSymbol = parts.length === 2 
        ? `${parts[0]}-${parts[1]}-SWAP` 
        : symbol;
      
      const response = await fetch(
        `${this.baseUrl}/api/v5/market/ticker?instId=${okxSymbol}`
      );

      if (!response.ok) {
        throw new Error(`OKX API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.code !== '0' || !data.data?.[0]) {
        throw new Error(`OKX API returned no data for ${symbol}`);
      }

      const ticker = data.data[0];

      return {
        price: parseFloat(ticker.last),
        source: 'okx',
        symbol: symbol,
        timestamp: new Date(),
        bid: parseFloat(ticker.bidPx),
        ask: parseFloat(ticker.askPx),
        volume24h: parseFloat(ticker.vol24h),
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch OKX price for ${symbol}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}

/**
 * Local exchange price source (uses connected exchange)
 */
export class LocalPriceSource implements PriceSourceProvider {
  name = 'local';
  private getLocalPrice: (symbol: string) => Promise<number>;

  constructor(getLocalPriceFn: (symbol: string) => Promise<number>) {
    this.getLocalPrice = getLocalPriceFn;
  }

  async getPrice(symbol: string): Promise<ReferencePrice> {
    try {
      const price = await this.getLocalPrice(symbol);

      return {
        price,
        source: 'local',
        symbol,
        timestamp: new Date(),
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch local price for ${symbol}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}

// =============================================================================
// WEIGHTED PRICE CALCULATOR
// =============================================================================

/**
 * Calculate weighted average price from multiple sources
 */
export function calculateWeightedPrice(
  prices: ReferencePrice[],
  weights: Record<string, number>
): ReferencePrice {
  if (prices.length === 0) {
    throw new Error('No prices provided for weighted calculation');
  }

  // Filter out sources with zero or invalid prices
  const validPrices = prices.filter(p => p.price > 0);
  
  if (validPrices.length === 0) {
    throw new Error('No valid prices for weighted calculation');
  }

  // Normalize weights
  const totalWeight = validPrices.reduce((sum, p) => sum + (weights[p.source] || 1), 0);
  
  // Calculate weighted price
  let weightedPrice = 0;
  let weightedBid = 0;
  let weightedAsk = 0;
  let totalVolume = 0;

  for (const price of validPrices) {
    const weight = (weights[price.source] || 1) / totalWeight;
    weightedPrice += price.price * weight;
    
    if (price.bid) {
      weightedBid += price.bid * weight;
    }
    if (price.ask) {
      weightedAsk += price.ask * weight;
    }
    if (price.volume24h) {
      totalVolume += price.volume24h;
    }
  }

  return {
    price: weightedPrice,
    source: 'weighted',
    symbol: validPrices[0].symbol,
    timestamp: new Date(),
    bid: weightedBid || undefined,
    ask: weightedAsk || undefined,
    volume24h: totalVolume || undefined,
  };
}

// =============================================================================
// MAIN REFERENCE PRICE MANAGER
// =============================================================================

/**
 * Events emitted by ReferencePriceManager
 */
export interface ReferencePriceManagerEvents {
  'price:update': (price: ReferencePrice) => void;
  'price:deviation': (event: PriceDeviationEvent) => void;
  'price:error': (error: Error) => void;
  'source:switch': (source: string) => void;
}

/**
 * Reference Price Manager
 * 
 * Manages reference price from multiple sources with deviation monitoring
 */
export class ReferencePriceManager extends EventEmitter {
  private config: ReferencePriceConfig;
  private sources: Map<string, PriceSourceProvider> = new Map();
  private currentPrice: ReferencePrice | null = null;
  private previousPrice: ReferencePrice | null = null;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private symbol: string;
  private isMonitoring = false;
  
  // Weight configuration for weighted mode
  private weights: Record<string, number> = {
    binance: 1.0,
    bybit: 0.8,
    okx: 0.7,
    local: 1.0,
  };

  constructor(
    symbol: string,
    config: Partial<ReferencePriceConfig> = {},
    localPriceFn?: (symbol: string) => Promise<number>
  ) {
    super();
    this.symbol = symbol;
    this.config = { ...DEFAULT_REFERENCE_PRICE_CONFIG, ...config };

    // Initialize default sources
    this.sources.set('binance', new BinancePriceSource());
    this.sources.set('bybit', new BybitPriceSource());
    this.sources.set('okx', new OKXPriceSource());

    // Add local source if provided
    if (localPriceFn) {
      this.sources.set('local', new LocalPriceSource(localPriceFn));
    }
  }

  /**
   * Add or update a price source
   */
  addSource(name: string, provider: PriceSourceProvider): void {
    this.sources.set(name, provider);
  }

  /**
   * Remove a price source
   */
  removeSource(name: string): void {
    this.sources.delete(name);
  }

  /**
   * Set weights for weighted price calculation
   */
  setWeights(weights: Record<string, number>): void {
    this.weights = { ...this.weights, ...weights };
  }

  /**
   * Get current reference price
   */
  getCurrentPrice(): ReferencePrice | null {
    return this.currentPrice;
  }

  /**
   * Fetch reference price from configured source(s)
   */
  async getReferencePrice(): Promise<ReferencePrice> {
    switch (this.config.sourceType) {
      case PriceSourceType.LOCAL:
        return this.fetchLocalPrice();
      
      case PriceSourceType.EXTERNAL:
        return this.fetchExternalPrice();
      
      case PriceSourceType.WEIGHTED:
        return this.fetchWeightedPrice();
      
      default:
        return this.fetchLocalPrice();
    }
  }

  /**
   * Fetch price from local exchange
   */
  private async fetchLocalPrice(): Promise<ReferencePrice> {
    const localSource = this.sources.get('local');
    
    if (!localSource) {
      throw new Error('Local price source not configured');
    }

    const price = await localSource.getPrice(this.symbol);
    this.updatePrice(price);
    return price;
  }

  /**
   * Fetch price from external exchange
   */
  private async fetchExternalPrice(): Promise<ReferencePrice> {
    const exchangeName = this.config.exchangeName || 'binance';
    const source = this.sources.get(exchangeName);

    if (!source) {
      throw new Error(`External price source '${exchangeName}' not found`);
    }

    const symbolToUse = this.config.symbol || this.symbol;
    const price = await source.getPrice(symbolToUse);
    this.updatePrice(price);
    return price;
  }

  /**
   * Fetch weighted price from multiple sources
   */
  private async fetchWeightedPrice(): Promise<ReferencePrice> {
    const promises: Promise<ReferencePrice>[] = [];

    // Fetch from all configured sources
    for (const [name, source] of this.sources) {
      if (name !== 'local' || this.config.sourceType === PriceSourceType.WEIGHTED) {
        promises.push(
          source.getPrice(this.symbol).catch(err => {
            console.warn(`Failed to fetch from ${name}:`, err.message);
            return null as unknown as ReferencePrice;
          })
        );
      }
    }

    const results = await Promise.all(promises);
    const validPrices = results.filter(p => p && p.price > 0);

    if (validPrices.length === 0) {
      throw new Error('No valid prices from any source');
    }

    const weightedPrice = calculateWeightedPrice(validPrices, this.weights);
    this.updatePrice(weightedPrice);
    return weightedPrice;
  }

  /**
   * Update current price and check for deviation
   */
  private updatePrice(price: ReferencePrice): void {
    this.previousPrice = this.currentPrice;
    this.currentPrice = price;

    // Emit price update
    this.emit('price:update', price);

    // Check for deviation
    if (this.previousPrice) {
      const deviation = this.calculateDeviation(
        this.previousPrice.price,
        price.price
      );

      const event: PriceDeviationEvent = {
        previousPrice: this.previousPrice.price,
        currentPrice: price.price,
        deviationPercent: deviation,
        exceedsThreshold: deviation > this.config.deviationThresholdPercent,
        timestamp: new Date(),
      };

      this.emit('price:deviation', event);

      if (event.exceedsThreshold) {
        console.warn(
          `Price deviation exceeded threshold: ${deviation.toFixed(4)}% > ${this.config.deviationThresholdPercent}%`
        );
      }
    }
  }

  /**
   * Calculate deviation percentage
   */
  private calculateDeviation(oldPrice: number, newPrice: number): number {
    if (oldPrice === 0) return 0;
    return Math.abs((newPrice - oldPrice) / oldPrice) * 100;
  }

  /**
   * Start monitoring price updates
   */
  startMonitoring(intervalMs: number = 5000): void {
    if (this.isMonitoring) {
      this.stopMonitoring();
    }

    this.isMonitoring = true;

    // Initial fetch
    this.getReferencePrice().catch(err => {
      this.emit('price:error', err);
    });

    // Set up interval
    this.monitoringInterval = setInterval(async () => {
      try {
        await this.getReferencePrice();
      } catch (err) {
        this.emit('price:error', err instanceof Error ? err : new Error(String(err)));
      }
    }, intervalMs);

    console.log(
      `Reference price monitoring started for ${this.symbol} (interval: ${intervalMs}ms)`
    );
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    this.isMonitoring = false;
    console.log(`Reference price monitoring stopped for ${this.symbol}`);
  }

  /**
   * Check if monitoring is active
   */
  isCurrentlyMonitoring(): boolean {
    return this.isMonitoring;
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<ReferencePriceConfig>): void {
    this.config = { ...this.config, ...config };
    this.emit('source:switch', this.config.sourceType);
  }

  /**
   * Get current configuration
   */
  getConfig(): ReferencePriceConfig {
    return { ...this.config };
  }

  /**
   * Check if price deviation exceeds threshold
   */
  isPriceDeviationExcessive(newPrice: number): boolean {
    if (!this.currentPrice) return false;

    const deviation = this.calculateDeviation(this.currentPrice.price, newPrice);
    return deviation > this.config.deviationThresholdPercent;
  }

  /**
   * Get price spread from reference
   */
  getPriceSpread(marketPrice: number): {
    absolute: number;
    percent: number;
    direction: 'above' | 'below' | 'equal';
  } {
    if (!this.currentPrice) {
      return { absolute: 0, percent: 0, direction: 'equal' };
    }

    const absolute = marketPrice - this.currentPrice.price;
    const percent = this.currentPrice.price > 0
      ? (absolute / this.currentPrice.price) * 100
      : 0;

    return {
      absolute,
      percent,
      direction: absolute > 0 ? 'above' : absolute < 0 ? 'below' : 'equal',
    };
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.stopMonitoring();
    this.removeAllListeners();
    this.sources.clear();
    this.currentPrice = null;
    this.previousPrice = null;
  }
}

// =============================================================================
// FACTORY FUNCTIONS
// =============================================================================

/**
 * Create a reference price manager with default configuration
 */
export function createReferencePriceManager(
  symbol: string,
  options: {
    sourceType?: PriceSourceType;
    exchangeName?: string;
    deviationThresholdPercent?: number;
    localPriceFn?: (symbol: string) => Promise<number>;
  } = {}
): ReferencePriceManager {
  const config: Partial<ReferencePriceConfig> = {
    sourceType: options.sourceType || PriceSourceType.EXTERNAL,
    exchangeName: options.exchangeName,
    deviationThresholdPercent: options.deviationThresholdPercent || 0.5,
  };

  return new ReferencePriceManager(symbol, config, options.localPriceFn);
}

export default ReferencePriceManager;
