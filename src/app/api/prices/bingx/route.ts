import { NextResponse } from "next/server";

// BingX REST API endpoints from kb documentation
const BINGX_FUTURES_BASE_URL = "https://open-api.bingx.com";
const BINGX_SPOT_BASE_URL = "https://open-api.bingx.com";

// Symbol format: BTCUSDT -> BTC-USDT
function formatSymbol(symbol: string): string {
  const s = symbol.toUpperCase();
  if (s.includes("-")) return s;
  return s.replace("USDT", "-USDT");
}

// Fetch ticker from BingX Futures API
async function fetchFuturesTicker(symbol: string) {
  const formattedSymbol = formatSymbol(symbol);
  const url = `${BINGX_FUTURES_BASE_URL}/openApi/swap/v2/quote/ticker?symbol=${formattedSymbol}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.code !== 0) {
      throw new Error(data.msg || "BingX API error");
    }
    
    return data.data;
  } catch (error) {
    console.error(`[BingX] Failed to fetch futures ticker for ${symbol}:`, error);
    throw error;
  }
}

// Fetch ticker from BingX Spot API
async function fetchSpotTicker(symbol: string) {
  const formattedSymbol = formatSymbol(symbol);
  const url = `${BINGX_SPOT_BASE_URL}/openApi/spot/v1/ticker/24hr?symbol=${formattedSymbol}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.code !== 0) {
      throw new Error(data.msg || "BingX API error");
    }
    
    return data.data;
  } catch (error) {
    console.error(`[BingX] Failed to fetch spot ticker for ${symbol}:`, error);
    throw error;
  }
}

// Default symbols to fetch
const DEFAULT_SYMBOLS = [
  "BTC-USDT", "ETH-USDT", "BNB-USDT", "SOL-USDT",
  "XRP-USDT", "DOGE-USDT", "ADA-USDT", "AVAX-USDT"
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbols = searchParams.get("symbols")?.split(",") || DEFAULT_SYMBOLS;
  const market = searchParams.get("market") || "futures"; // futures or spot
  
  try {
    const prices: Record<string, {
      symbol: string;
      price: number;
      change24h: number;
      high24h: number;
      low24h: number;
      volume24h: number;
    }> = {};
    
    // Fetch prices for all symbols
    const fetchPromises = symbols.map(async (symbol) => {
      try {
        const data = market === "spot" 
          ? await fetchSpotTicker(symbol)
          : await fetchFuturesTicker(symbol);
        
        // Parse response based on market type
        let price, change24h, high24h, low24h, volume24h;
        
        if (market === "futures") {
          // Futures response format
          price = parseFloat(data.lastPrice || data.close || 0);
          change24h = parseFloat(data.priceChangePercent || 0);
          high24h = parseFloat(data.highPrice || data.high24h || 0);
          low24h = parseFloat(data.lowPrice || data.low24h || 0);
          volume24h = parseFloat(data.volume || data.volume24h || 0);
        } else {
          // Spot response format
          price = parseFloat(data.lastPrice || data.last || 0);
          const openPrice = parseFloat(data.openPrice || data.open || price);
          change24h = openPrice > 0 ? ((price - openPrice) / openPrice) * 100 : 0;
          high24h = parseFloat(data.highPrice || data.high || 0);
          low24h = parseFloat(data.lowPrice || data.low || 0);
          volume24h = parseFloat(data.volume || data.vol || 0);
        }
        
        // Normalize symbol: BTC-USDT -> BTCUSDT
        const normalizedSymbol = symbol.replace("-", "");
        
        prices[normalizedSymbol] = {
          symbol: normalizedSymbol,
          price,
          change24h,
          high24h,
          low24h,
          volume24h,
        };
      } catch (error) {
        console.error(`[BingX] Failed to fetch ${symbol}:`, error);
      }
    });
    
    await Promise.all(fetchPromises);
    
    return NextResponse.json({
      success: true,
      prices,
      timestamp: Date.now(),
      source: "bingx",
      market,
    });
    
  } catch (error) {
    console.error("[BingX] Price fetch error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch BingX prices",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
