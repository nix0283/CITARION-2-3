/**
 * Funding Rate Service - Mini Service
 * 
 * Real-time funding rates from multiple exchanges with WebSocket + REST fallback
 * 
 * Exchanges supported:
 * - Binance (WebSocket + REST)
 * - Bybit (WebSocket + REST)
 * - OKX (WebSocket + REST)
 * - Bitget (WebSocket + REST)
 * - BingX (REST only)
 * 
 * Port: 3010
 */

import { serve } from "bun";

// ==================== CONFIGURATION ====================

const PORT = 3010;
const POLLING_INTERVAL = 60000; // 1 minute for REST fallback
const MARK_PRICE_INTERVAL = 15000; // 15 seconds for OKX/BingX mark price updates
const WS_RECONNECT_DELAY = 5000;

// Symbols to track
const SYMBOLS = [
  "BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT",
  "DOGEUSDT", "ADAUSDT", "AVAXUSDT", "LINKUSDT", "MATICUSDT"
];

// ==================== TYPES ====================

interface FundingRate {
  symbol: string;
  exchange: string;
  fundingRate: number;
  fundingTime: Date;
  markPrice?: number;
  indexPrice?: number;
  timestamp: Date;
  source: "websocket" | "rest";
}

interface ExchangeStatus {
  exchange: string;
  connected: boolean;
  lastUpdate: Date | null;
  error: string | null;
  source: "websocket" | "rest" | "none";
}

// ==================== STATE ====================

const fundingRates = new Map<string, FundingRate>();
const exchangeStatuses = new Map<string, ExchangeStatus>();
const webSockets = new Map<string, WebSocket>();

// Initialize exchange statuses
const EXCHANGES = ["binance", "bybit", "okx", "bitget", "bingx"];
EXCHANGES.forEach(ex => {
  exchangeStatuses.set(ex, {
    exchange: ex,
    connected: false,
    lastUpdate: null,
    error: null,
    source: "none"
  });
});

// ==================== EXCHANGE CONFIGS ====================

const EXCHANGE_CONFIGS = {
  binance: {
    name: "Binance",
    wsUrl: "wss://fstream.binance.com/ws",
    restUrl: "https://fapi.binance.com/fapi/v1/fundingRate",
    formatSymbol: (s: string) => s.toLowerCase(),
    wsSubscribe: (symbols: string[]) => {
      const streams = symbols.map(s => `${s.toLowerCase()}@markPrice`).join("/");
      return JSON.stringify({
        method: "SUBSCRIBE",
        params: streams.split("/"),
        id: Date.now()
      });
    },
    parseWs: (data: any): FundingRate | null => {
      if (data.e !== "markPriceUpdate" || !data.s) return null;
      return {
        symbol: data.s,
        exchange: "binance",
        fundingRate: parseFloat(data.r || "0"),
        fundingTime: new Date(data.T || Date.now()),
        markPrice: parseFloat(data.p || "0"),
        indexPrice: parseFloat(data.i || "0"),
        timestamp: new Date(),
        source: "websocket"
      };
    },
    fetchRest: async (symbols: string[]): Promise<FundingRate[]> => {
      const results: FundingRate[] = [];
      for (const symbol of symbols) {
        try {
          const res = await fetch(`https://fapi.binance.com/fapi/v1/fundingRate?symbol=${symbol}&limit=1`);
          const data = await res.json();
          if (Array.isArray(data) && data[0]) {
            results.push({
              symbol,
              exchange: "binance",
              fundingRate: parseFloat(data[0].fundingRate),
              fundingTime: new Date(data[0].fundingTime),
              markPrice: parseFloat(data[0].markPrice || "0"),
              timestamp: new Date(),
              source: "rest"
            });
          }
        } catch (e) {
          console.error(`[Binance] REST error for ${symbol}:`, e);
        }
      }
      return results;
    }
  },

  bybit: {
    name: "Bybit",
    wsUrl: "wss://stream.bybit.com/v5/public/linear",
    restUrl: "https://api.bybit.com/v5/market/funding/history",
    formatSymbol: (s: string) => s.toUpperCase(),
    wsSubscribe: (symbols: string[]) => {
      return JSON.stringify({
        op: "subscribe",
        args: symbols.map(s => `tickers.${s.toUpperCase()}`)
      });
    },
    parseWs: (data: any): FundingRate | null => {
      // Only parse snapshot messages, not delta updates
      if (!data.topic?.includes("tickers") || data.type !== "snapshot" || !data.data) return null;
      const d = data.data;
      const symbol = data.topic.replace("tickers.", "");
      return {
        symbol,
        exchange: "bybit",
        fundingRate: parseFloat(d.fundingRate || "0"),
        fundingTime: new Date(parseInt(d.nextFundingTime || "0")),
        markPrice: parseFloat(d.markPrice || "0"),
        indexPrice: parseFloat(d.indexPrice || "0"),
        timestamp: new Date(),
        source: "websocket"
      };
    },
    fetchRest: async (symbols: string[]): Promise<FundingRate[]> => {
      const results: FundingRate[] = [];
      // Use tickers endpoint to get both funding rate AND markPrice
      try {
        const res = await fetch("https://api.bybit.com/v5/market/tickers?category=linear");
        const data = await res.json();
        if (data.result?.list) {
          for (const item of data.result.list) {
            const symbol = item.symbol;
            if (symbols.includes(symbol)) {
              results.push({
                symbol,
                exchange: "bybit",
                fundingRate: parseFloat(item.fundingRate || "0"),
                fundingTime: new Date(parseInt(item.nextFundingTime || Date.now())),
                markPrice: parseFloat(item.markPrice || "0"),
                indexPrice: parseFloat(item.indexPrice || "0"),
                timestamp: new Date(),
                source: "rest"
              });
            }
          }
        }
      } catch (e) {
        console.error(`[Bybit] REST error:`, e);
      }
      return results;
    }
  },

  okx: {
    name: "OKX",
    wsUrl: "wss://ws.okx.com:8443/ws/v5/public",
    restUrl: "https://www.okx.com/api/v5/public/funding-rate-history",
    formatSymbol: (s: string) => s.replace("USDT", "-USDT-SWAP"),
    wsSubscribe: (symbols: string[]) => {
      return JSON.stringify({
        op: "subscribe",
        args: symbols.map(s => ({
          channel: "funding-rate",
          instId: s.replace("USDT", "-USDT-SWAP")
        }))
      });
    },
    parseWs: (data: any): FundingRate | null => {
      // OKX funding-rate channel doesn't include markPrice
      // We'll get markPrice from REST API fallback
      if (data.arg?.channel !== "funding-rate" || !data.data?.[0]) return null;
      const d = data.data[0];
      const symbol = data.arg.instId.replace("-USDT-SWAP", "USDT");
      return {
        symbol,
        exchange: "okx",
        fundingRate: parseFloat(d.fundingRate || "0"),
        fundingTime: new Date(parseInt(d.fundingTime || "0")),
        markPrice: 0, // Will be filled by REST fallback
        indexPrice: 0,
        timestamp: new Date(),
        source: "websocket"
      };
    },
    fetchRest: async (symbols: string[]): Promise<FundingRate[]> => {
      const results: FundingRate[] = [];
      // Fetch mark prices first (OKX requires separate endpoint)
      const markPrices: Record<string, number> = {};
      try {
        const markRes = await fetch("https://www.okx.com/api/v5/public/mark-price?instType=SWAP");
        const markData = await markRes.json();
        if (markData.data) {
          for (const item of markData.data) {
            const symbol = item.instId.replace("-USDT-SWAP", "USDT");
            markPrices[symbol] = parseFloat(item.markPx || "0");
          }
        }
      } catch (e) {
        console.error("[OKX] Mark price fetch error:", e);
      }
      
      // Fetch funding rates
      for (const symbol of symbols) {
        try {
          const instId = symbol.replace("USDT", "-USDT-SWAP");
          const res = await fetch(`https://www.okx.com/api/v5/public/funding-rate?instId=${instId}`);
          const data = await res.json();
          if (data.data?.[0]) {
            const item = data.data[0];
            results.push({
              symbol,
              exchange: "okx",
              fundingRate: parseFloat(item.fundingRate || "0"),
              fundingTime: new Date(parseInt(item.fundingTime || Date.now())),
              markPrice: markPrices[symbol] || 0,
              indexPrice: 0,
              timestamp: new Date(),
              source: "rest"
            });
          }
        } catch (e) {
          console.error(`[OKX] REST error for ${symbol}:`, e);
        }
      }
      return results;
    }
  },

  bitget: {
    name: "Bitget",
    wsUrl: "wss://ws.bitget.com/v2/ws/public",
    restUrl: "https://api.bitget.com/api/v2/mix/market/ticker",
    formatSymbol: (s: string) => s.toUpperCase(),
    wsSubscribe: (symbols: string[]) => {
      return JSON.stringify({
        op: "subscribe",
        args: symbols.map(s => ({
          instType: "USDT-FUTURES",
          channel: "ticker",
          instId: s.toUpperCase()
        }))
      });
    },
    parseWs: (data: any): FundingRate | null => {
      if (data.arg?.channel !== "ticker" || !data.data?.[0]) return null;
      const d = data.data[0];
      return {
        symbol: data.arg.instId || "",
        exchange: "bitget",
        fundingRate: parseFloat(d.fundingRate || "0"),
        fundingTime: d.ts ? new Date(parseInt(d.ts)) : new Date(),
        markPrice: parseFloat(d.markPrice || d.lastPr || "0"),
        timestamp: new Date(),
        source: "websocket"
      };
    },
    fetchRest: async (symbols: string[]): Promise<FundingRate[]> => {
      const results: FundingRate[] = [];
      for (const symbol of symbols) {
        try {
          const res = await fetch(`https://api.bitget.com/api/v2/mix/market/ticker?productType=USDT-FUTURES&symbol=${symbol}`);
          const data = await res.json();
          if (data.data?.[0]) {
            const item = data.data[0];
            results.push({
              symbol,
              exchange: "bitget",
              fundingRate: parseFloat(item.fundingRate || "0"),
              fundingTime: new Date(parseInt(item.ts || Date.now())),
              markPrice: parseFloat(item.markPrice || item.lastPr || "0"),
              timestamp: new Date(),
              source: "rest"
            });
          }
        } catch (e) {
          console.error(`[Bitget] REST error for ${symbol}:`, e);
        }
      }
      return results;
    }
  },

  bingx: {
    name: "BingX",
    // BingX doesn't have WebSocket for funding, REST only
    wsUrl: null,
    restUrl: "https://open-api.bingx.com/openApi/swap/v2/quote/fundingRate",
    formatSymbol: (s: string) => s.replace("USDT", "-USDT"),
    wsSubscribe: () => "",
    parseWs: () => null,
    fetchRest: async (symbols: string[]): Promise<FundingRate[]> => {
      const results: FundingRate[] = [];
      for (const symbol of symbols) {
        try {
          const symbolParam = symbol.replace("USDT", "-USDT");
          const res = await fetch(`https://open-api.bingx.com/openApi/swap/v2/quote/fundingRate?symbol=${symbolParam}`);
          const data = await res.json();
          // BingX returns an array, take the first (current) element
          if (data.code === 0 && Array.isArray(data.data) && data.data[0]) {
            const item = data.data[0];
            results.push({
              symbol,
              exchange: "bingx",
              fundingRate: parseFloat(item.fundingRate || "0"),
              fundingTime: new Date(item.fundingTime || Date.now()),
              markPrice: parseFloat(item.markPrice || "0"),
              timestamp: new Date(),
              source: "rest"
            });
          }
        } catch (e) {
          console.error(`[BingX] REST error for ${symbol}:`, e);
        }
      }
      return results;
    }
  }
};

// ==================== WEBSOCKET MANAGEMENT ====================

function connectWebSocket(exchange: keyof typeof EXCHANGE_CONFIGS) {
  const config = EXCHANGE_CONFIGS[exchange];
  if (!config.wsUrl) {
    console.log(`[${config.name}] WebSocket not available, using REST only`);
    return;
  }

  // Close existing connection
  const existingWs = webSockets.get(exchange);
  if (existingWs) {
    existingWs.close();
  }

  console.log(`[${config.name}] Connecting WebSocket...`);

  try {
    const ws = new WebSocket(config.wsUrl!);
    
    ws.onopen = () => {
      console.log(`[${config.name}] WebSocket connected`);
      
      // Subscribe to all symbols
      ws.send(config.wsSubscribe(SYMBOLS));
      
      // Update status
      const status = exchangeStatuses.get(exchange);
      if (status) {
        status.connected = true;
        status.error = null;
        status.source = "websocket";
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data.toString());
        
        // Handle ping/pong
        if (data.ping || data.op === "ping") {
          ws.send(JSON.stringify({ pong: data.ping || Date.now() }));
          return;
        }
        
        // Parse funding rate
        const rate = config.parseWs(data);
        if (rate && rate.symbol) {
          updateFundingRate(rate, exchange);
        }
      } catch (e) {
        // Ignore parse errors
      }
    };

    ws.onclose = () => {
      console.log(`[${config.name}] WebSocket disconnected`);
      const status = exchangeStatuses.get(exchange);
      if (status) {
        status.connected = false;
        status.source = status.source === "websocket" ? "none" : status.source;
      }
      
      // Reconnect after delay
      setTimeout(() => connectWebSocket(exchange), WS_RECONNECT_DELAY);
    };

    ws.onerror = (error) => {
      console.error(`[${config.name}] WebSocket error:`, error);
      const status = exchangeStatuses.get(exchange);
      if (status) {
        status.error = "WebSocket error";
      }
    };

    webSockets.set(exchange, ws);
  } catch (error) {
    console.error(`[${config.name}] Failed to connect:`, error);
    const status = exchangeStatuses.get(exchange);
    if (status) {
      status.error = "Connection failed";
    }
  }
}

// ==================== REST POLLING ====================

async function pollRestFallback(exchange: keyof typeof EXCHANGE_CONFIGS) {
  const config = EXCHANGE_CONFIGS[exchange];
  const status = exchangeStatuses.get(exchange);
  
  // For OKX and BingX, always poll REST for markPrice (WebSocket doesn't provide it)
  // For other exchanges, skip if WebSocket is connected and working
  const needsRestPolling = exchange === "okx" || exchange === "bingx";
  if (!needsRestPolling && status?.connected && status.source === "websocket") {
    return;
  }

  console.log(`[${config.name}] Polling REST API...`);

  try {
    const rates = await config.fetchRest(SYMBOLS);
    
    for (const rate of rates) {
      updateFundingRate(rate, exchange);
    }

    // Update status
    const currentStatus = exchangeStatuses.get(exchange);
    if (currentStatus) {
      currentStatus.lastUpdate = new Date();
      currentStatus.error = null;
      if (!currentStatus.connected) {
        currentStatus.source = "rest";
      }
    }
    
    console.log(`[${config.name}] REST: Updated ${rates.length} symbols`);
  } catch (error) {
    console.error(`[${config.name}] REST polling failed:`, error);
  }
}

// ==================== DATA MANAGEMENT ====================

function updateFundingRate(rate: FundingRate, exchange: string) {
  const key = `${exchange}-${rate.symbol}`;
  
  // If we have existing data from WebSocket, only update markPrice if this is REST data
  const existing = fundingRates.get(key);
  if (existing && existing.source === "websocket" && rate.source === "rest") {
    // Don't overwrite WebSocket funding rate with REST, but update markPrice if missing or zero
    if ((!existing.markPrice || existing.markPrice === 0) && rate.markPrice && rate.markPrice > 0) {
      existing.markPrice = rate.markPrice;
      existing.indexPrice = rate.indexPrice;
      console.log(`[${exchange}] Updated markPrice for ${rate.symbol}: ${rate.markPrice}`);
    }
    return;
  }
  
  fundingRates.set(key, rate);
  
  // Update exchange status
  const status = exchangeStatuses.get(exchange);
  if (status) {
    status.lastUpdate = new Date();
  }
  
  // Log significant funding rates
  const annualized = Math.abs(rate.fundingRate) * 3 * 365;
  if (annualized > 50) {
    console.log(`[ALERT] ${rate.exchange}:${rate.symbol} funding ${(rate.fundingRate * 100).toFixed(4)}% (${annualized.toFixed(0)}% annualized)`);
  }
}

// ==================== DATABASE ====================

async function saveToDatabase(rates: FundingRate[]) {
  // Database saving is handled by the main Next.js app via API
  // This service provides data through HTTP API
}

// ==================== HTTP SERVER ====================

const server = serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    
    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle OPTIONS
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Health check
    if (url.pathname === "/health") {
      return Response.json({
        status: "ok",
        service: "funding-service",
        port: PORT,
        uptime: process.uptime?.() || 0,
        timestamp: new Date().toISOString()
      }, { headers: corsHeaders });
    }

    // Status endpoint
    if (url.pathname === "/status") {
      const statuses = Object.fromEntries(exchangeStatuses);
      return Response.json({
        success: true,
        exchanges: statuses,
        ratesCount: fundingRates.size,
        timestamp: new Date().toISOString()
      }, { headers: corsHeaders });
    }

    // Get all funding rates
    if (url.pathname === "/rates" || url.pathname === "/") {
      const exchange = url.searchParams.get("exchange");
      const symbol = url.searchParams.get("symbol");
      
      let rates = Array.from(fundingRates.values());
      
      if (exchange) {
        rates = rates.filter(r => r.exchange === exchange);
      }
      if (symbol) {
        rates = rates.filter(r => r.symbol === symbol);
      }

      // Format for frontend
      const formattedRates = rates.map(r => ({
        symbol: r.symbol,
        exchange: r.exchange,
        rate: r.fundingRate,
        ratePercent: (r.fundingRate * 100).toFixed(4),
        annualizedRate: r.fundingRate * 3 * 365,
        markPrice: r.markPrice,
        indexPrice: r.indexPrice,
        heatLevel: getHeatLevel(r.fundingRate),
        heatScore: getHeatScore(r.fundingRate),
        timestamp: r.timestamp.toISOString(),
        source: r.source
      }));

      return Response.json({
        success: true,
        rates: formattedRates,
        count: formattedRates.length,
        timestamp: new Date().toISOString()
      }, { headers: corsHeaders });
    }

    // Force refresh endpoint
    if (url.pathname === "/refresh") {
      console.log("[API] Force refresh requested");
      await Promise.all(EXCHANGES.map(ex => pollRestFallback(ex as any)));
      
      return Response.json({
        success: true,
        message: "Refresh triggered for all exchanges",
        ratesCount: fundingRates.size,
        timestamp: new Date().toISOString()
      }, { headers: corsHeaders });
    }

    // 404
    return Response.json({
      success: false,
      error: "Not found"
    }, { status: 404, headers: corsHeaders });
  }
});

// ==================== HELPER FUNCTIONS ====================

function getHeatLevel(rate: number): "low" | "medium" | "high" | "critical" {
  const annualized = Math.abs(rate) * 3 * 365;
  if (annualized > 100) return "critical";
  if (annualized > 50) return "high";
  if (annualized > 20) return "medium";
  return "low";
}

function getHeatScore(rate: number): number {
  const annualized = Math.abs(rate) * 3 * 365;
  if (annualized > 100) return 4;
  if (annualized > 50) return 3;
  if (annualized > 20) return 2;
  if (annualized > 5) return 1;
  return 0;
}

// ==================== STARTUP ====================

console.log(`\n========================================`);
console.log(`  Funding Rate Service`);
console.log(`  Port: ${PORT}`);
console.log(`  Symbols: ${SYMBOLS.length}`);
console.log(`========================================\n`);

// Connect WebSockets for exchanges that support it
console.log("[Startup] Connecting WebSockets...");
connectWebSocket("binance");
connectWebSocket("bybit");
connectWebSocket("okx");
connectWebSocket("bitget");

// Initial REST fetch for all exchanges
console.log("[Startup] Initial REST fetch...");
setTimeout(async () => {
  await Promise.all(EXCHANGES.map(ex => pollRestFallback(ex as any)));
}, 2000);

// Set up periodic REST polling as fallback
// Use Promise.allSettled to run in parallel and prevent one exchange from blocking others
setInterval(async () => {
  await Promise.allSettled(EXCHANGES.map(ex => pollRestFallback(ex as any)));
}, POLLING_INTERVAL);

// Extra polling for OKX and BingX mark prices (WebSocket doesn't provide markPrice)
setInterval(async () => {
  await Promise.allSettled([
    pollRestFallback("okx"),
    pollRestFallback("bingx")
  ]);
}, MARK_PRICE_INTERVAL);

console.log(`[Funding Service] Running on port ${PORT}`);
