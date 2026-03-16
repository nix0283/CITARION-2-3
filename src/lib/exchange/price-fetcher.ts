/**
 * Exchange Price Fetcher
 * 
 * Fetches real-time prices from multiple exchanges for Paper Trading.
 * Supports: Binance, Bybit, OKX, Bitget, BingX
 * 
 * All exchanges provide public price data without API keys.
 * 
 * Markets: FUTURES (perpetual) and SPOT
 */

export type ExchangeId = "binance" | "bybit" | "okx" | "bitget" | "bingx";
export type MarketType = "futures" | "spot";

export interface PriceData {
  symbol: string;
  exchange: ExchangeId;
  market: MarketType;
  price: number;
  bid?: number;
  ask?: number;
  high24h?: number;
  low24h?: number;
  volume24h?: number;
  change24h?: number;
  timestamp: number;
}

/**
 * Exchange API endpoints for public price data
 * Supports both FUTURES and SPOT markets
 */
const EXCHANGE_PRICE_URLS: Record<ExchangeId, (symbol: string, market: MarketType) => string> = {
  binance: (symbol, market) => 
    market === "futures" 
      ? `https://fapi.binance.com/fapi/v1/ticker/price?symbol=${symbol}`
      : `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`,
  bybit: (symbol, market) =>
    market === "futures"
      ? `https://api.bybit.com/v5/market/tickers?category=linear&symbol=${symbol}`
      : `https://api.bybit.com/v5/market/tickers?category=spot&symbol=${symbol}`,
  okx: (symbol, market) => 
    market === "futures"
      ? `https://www.okx.com/api/v5/market/ticker?instId=${symbol}`
      : `https://www.okx.com/api/v5/market/ticker?instId=${symbol}`,
  bitget: (symbol, market) =>
    market === "futures"
      ? `https://api.bitget.com/api/v2/mix/market/ticker?symbol=${symbol}&productType=umcbl`
      : `https://api.bitget.com/api/v2/spot/market/tickers?symbol=${symbol}`,
  bingx: (symbol, market) =>
    market === "futures"
      ? `https://open-api.bingx.com/openApi/swap/v2/quote/ticker?symbol=${symbol}`
      : `https://open-api.bingx.com/openApi/spot/v1/ticker/24hr?symbol=${symbol}`,
};

/**
 * Symbol formatters for each exchange
 * Supports both FUTURES and SPOT markets
 */
const formatSymbolForExchange = (symbol: string, exchange: ExchangeId, market: MarketType = "futures"): string => {
  const normalized = symbol.toUpperCase().replace(/[-_]/g, "");
  
  switch (exchange) {
    case "okx":
      if (market === "futures") {
        // OKX uses BTC-USDT-SWAP format for perpetuals
        if (normalized.endsWith("USDT")) {
          const base = normalized.replace("USDT", "");
          return `${base}-USDT-SWAP`;
        }
      } else {
        // OKX spot uses BTC-USDT format
        if (normalized.endsWith("USDT")) {
          const base = normalized.replace("USDT", "");
          return `${base}-USDT`;
        }
      }
      return normalized;
    
    case "bitget":
      // Bitget uses BTCUSDT format for both
      return normalized;
    
    case "bingx":
      // BingX uses BTC-USDT format for both
      if (normalized.endsWith("USDT")) {
        const base = normalized.replace("USDT", "");
        return `${base}-USDT`;
      }
      return normalized;
    
    default:
      return normalized;
  }
};

/**
 * Parse price response from each exchange
 */
const parsePriceResponse = (exchange: ExchangeId, data: any, symbol: string, market: MarketType = "futures"): PriceData | null => {
  try {
    switch (exchange) {
      case "binance": {
        // Binance futures: { symbol: "BTCUSDT", price: "50000.00" }
        // Binance spot: { symbol: "BTCUSDT", price: "50000.00" }
        if (data.symbol && data.price) {
          return {
            symbol,
            exchange,
            market,
            price: parseFloat(data.price),
            timestamp: Date.now(),
          };
        }
        // Try 24hr ticker format
        if (data.lastPrice !== undefined) {
          return {
            symbol,
            exchange,
            market,
            price: parseFloat(data.lastPrice),
            high24h: data.highPrice ? parseFloat(data.highPrice) : undefined,
            low24h: data.lowPrice ? parseFloat(data.lowPrice) : undefined,
            volume24h: data.volume ? parseFloat(data.volume) : undefined,
            change24h: data.priceChangePercent ? parseFloat(data.priceChangePercent) : undefined,
            timestamp: Date.now(),
          };
        }
        return null;
      }
      
      case "bybit": {
        // Bybit returns { result: { list: [{ lastPrice: "50000.00" }] } }
        const list = data?.result?.list;
        if (list && list.length > 0) {
          const ticker = list[0];
          return {
            symbol,
            exchange,
            market,
            price: parseFloat(ticker.lastPrice),
            bid: ticker.bid1Price ? parseFloat(ticker.bid1Price) : undefined,
            ask: ticker.ask1Price ? parseFloat(ticker.ask1Price) : undefined,
            high24h: ticker.highPrice24h ? parseFloat(ticker.highPrice24h) : undefined,
            low24h: ticker.lowPrice24h ? parseFloat(ticker.lowPrice24h) : undefined,
            volume24h: ticker.volume24h ? parseFloat(ticker.volume24h) : undefined,
            timestamp: Date.now(),
          };
        }
        return null;
      }
      
      case "okx": {
        // OKX returns { data: [{ last: "50000.00", bidPx: "...", askPx: "..." }] }
        const tickers = data?.data;
        if (tickers && tickers.length > 0) {
          const ticker = tickers[0];
          return {
            symbol,
            exchange,
            market,
            price: parseFloat(ticker.last),
            bid: ticker.bidPx ? parseFloat(ticker.bidPx) : undefined,
            ask: ticker.askPx ? parseFloat(ticker.askPx) : undefined,
            high24h: ticker.high24h ? parseFloat(ticker.high24h) : undefined,
            low24h: ticker.low24h ? parseFloat(ticker.low24h) : undefined,
            volume24h: ticker.vol24h ? parseFloat(ticker.vol24h) : undefined,
            change24h: ticker.change24h ? parseFloat(ticker.change24h) : undefined,
            timestamp: Date.now(),
          };
        }
        return null;
      }
      
      case "bitget": {
        // Bitget returns { data: { list: [{ lastPr: "50000.00" }] } } for futures
        // Bitget spot returns { data: [{ lastPr: "50000.00" }] }
        const list = data?.data?.list || (Array.isArray(data?.data) ? data.data : null);
        if (list && list.length > 0) {
          const ticker = list[0];
          return {
            symbol,
            exchange,
            market,
            price: parseFloat(ticker.lastPr || ticker.last),
            bid: ticker.bidPr ? parseFloat(ticker.bidPr) : undefined,
            ask: ticker.askPr ? parseFloat(ticker.askPr) : undefined,
            high24h: ticker.high24h ? parseFloat(ticker.high24h) : undefined,
            low24h: ticker.low24h ? parseFloat(ticker.low24h) : undefined,
            volume24h: ticker.baseVolume ? parseFloat(ticker.baseVolume) : undefined,
            timestamp: Date.now(),
          };
        }
        return null;
      }
      
      case "bingx": {
        // BingX returns { data: { lastPrice: "50000.00" } } for futures
        // BingX spot returns similar format in data
        const ticker = data?.data;
        if (ticker && (ticker.lastPrice || ticker.last)) {
          return {
            symbol,
            exchange,
            market,
            price: parseFloat(ticker.lastPrice || ticker.last),
            bid: ticker.bidPrice ? parseFloat(ticker.bidPrice) : undefined,
            ask: ticker.askPrice ? parseFloat(ticker.askPrice) : undefined,
            high24h: ticker.highPrice ? parseFloat(ticker.highPrice) : undefined,
            low24h: ticker.lowPrice ? parseFloat(ticker.lowPrice) : undefined,
            volume24h: ticker.volume ? parseFloat(ticker.volume) : undefined,
            change24h: ticker.priceChangePercent ? parseFloat(ticker.priceChangePercent) : undefined,
            timestamp: Date.now(),
          };
        }
        return null;
      }
      
      default:
        return null;
    }
  } catch (error) {
    console.error(`[PriceFetcher] Error parsing ${exchange} response:`, error);
    return null;
  }
};

/**
 * Fetch price from a specific exchange
 */
export async function fetchPriceFromExchange(
  symbol: string,
  exchange: ExchangeId,
  market: MarketType = "futures"
): Promise<PriceData | null> {
  try {
    const formattedSymbol = formatSymbolForExchange(symbol, exchange, market);
    const url = EXCHANGE_PRICE_URLS[exchange](formattedSymbol, market);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Cache for 1 second
      next: { revalidate: 1 },
    });
    
    if (!response.ok) {
      console.error(`[PriceFetcher] ${exchange} returned ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    return parsePriceResponse(exchange, data, symbol, market);
  } catch (error) {
    console.error(`[PriceFetcher] Error fetching from ${exchange}:`, error);
    return null;
  }
}

/**
 * Fetch price from multiple exchanges (fallback chain)
 * Tries exchanges in order until one succeeds
 */
export async function fetchPriceWithFallback(
  symbol: string,
  preferredExchange?: ExchangeId,
  market: MarketType = "futures"
): Promise<PriceData | null> {
  // Order of preference
  const exchanges: ExchangeId[] = preferredExchange
    ? [preferredExchange, "binance", "bybit", "okx", "bitget", "bingx"]
    : ["binance", "bybit", "okx", "bitget", "bingx"];
  
  // Remove duplicates
  const uniqueExchanges = [...new Set(exchanges)];
  
  for (const exchange of uniqueExchanges) {
    const price = await fetchPriceFromExchange(symbol, exchange, market);
    if (price) {
      return price;
    }
  }
  
  return null;
}

/**
 * Fetch prices for multiple symbols from an exchange
 */
export async function fetchMultiplePrices(
  symbols: string[],
  exchange: ExchangeId = "binance",
  market: MarketType = "futures"
): Promise<Map<string, PriceData>> {
  const results = new Map<string, PriceData>();
  
  // Fetch in parallel with Promise.all
  const promises = symbols.map(async (symbol) => {
    const price = await fetchPriceFromExchange(symbol, exchange, market);
    if (price) {
      results.set(symbol, price);
    }
  });
  
  await Promise.all(promises);
  
  return results;
}

/**
 * Fetch spot prices for asset symbols (e.g., BTC, ETH, USDT)
 * Converts asset symbols to trading pairs (BTC -> BTCUSDT)
 */
export async function fetchAssetPrices(
  assets: string[],
  preferredExchange: ExchangeId = "binance"
): Promise<Map<string, number>> {
  const results = new Map<string, number>();
  
  // USDT is always 1
  results.set("USDT", 1);
  results.set("USDC", 1);
  results.set("BUSD", 1);
  
  // Filter out stablecoins
  const nonStableAssets = assets.filter(a => 
    !["USDT", "USDC", "BUSD", "VST", "SUSDT"].includes(a.toUpperCase())
  );
  
  // Convert to trading pairs: BTC -> BTCUSDT
  const symbols = nonStableAssets.map(a => `${a.toUpperCase()}USDT`);
  
  // Fetch prices
  const priceData = await fetchMultiplePrices(symbols, preferredExchange, "spot");
  
  // Map back to asset names
  for (const asset of nonStableAssets) {
    const symbol = `${asset.toUpperCase()}USDT`;
    const data = priceData.get(symbol);
    if (data) {
      results.set(asset.toUpperCase(), data.price);
    }
  }
  
  return results;
}

/**
 * Get cached price from our database (faster for repeated requests)
 */
export async function getCachedPrice(symbol: string): Promise<number | null> {
  try {
    // Import db only when needed
    const { db } = await import("@/lib/db");
    
    const marketPrice = await db.marketPrice.findUnique({
      where: { symbol },
    });
    
    if (marketPrice) {
      return marketPrice.price;
    }
    
    return null;
  } catch (error) {
    console.error("[PriceFetcher] Error getting cached price:", error);
    return null;
  }
}

/**
 * Update cached price in database
 */
export async function updateCachedPrice(
  symbol: string,
  price: number,
  exchange: string = "BINANCE"
): Promise<void> {
  try {
    const { db } = await import("@/lib/db");
    
    await db.marketPrice.upsert({
      where: { symbol },
      update: {
        price,
        lastUpdate: new Date(),
      },
      create: {
        symbol,
        exchange,
        price,
        lastUpdate: new Date(),
      },
    });
  } catch (error) {
    console.error("[PriceFetcher] Error updating cached price:", error);
  }
}

/**
 * Price fetcher class for continuous updates
 */
export class PriceFetcher {
  private symbol: string;
  private exchange: ExchangeId;
  private currentPrice: number = 0;
  private lastUpdate: number = 0;
  private updateInterval: NodeJS.Timeout | null = null;
  private listeners: ((price: PriceData) => void)[] = [];
  
  constructor(symbol: string, exchange: ExchangeId = "binance") {
    this.symbol = symbol;
    this.exchange = exchange;
  }
  
  async start(intervalMs: number = 3000): Promise<void> {
    // Initial fetch
    await this.fetch();
    
    // Start interval
    this.updateInterval = setInterval(async () => {
      await this.fetch();
    }, intervalMs);
  }
  
  stop(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.listeners = [];
  }
  
  private async fetch(): Promise<void> {
    const priceData = await fetchPriceFromExchange(this.symbol, this.exchange, "futures");
    
    if (priceData) {
      this.currentPrice = priceData.price;
      this.lastUpdate = priceData.timestamp;
      
      // Notify listeners
      for (const listener of this.listeners) {
        listener(priceData);
      }
    }
  }
  
  getPrice(): number {
    return this.currentPrice;
  }
  
  subscribe(callback: (price: PriceData) => void): () => void {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
}

export default {
  fetchPriceFromExchange,
  fetchPriceWithFallback,
  fetchMultiplePrices,
  fetchAssetPrices,
  getCachedPrice,
  updateCachedPrice,
  PriceFetcher,
};
