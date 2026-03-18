/**
 * Direct Exchange WebSocket Hook
 * 
 * Прямое подключение к WebSocket биржи из браузера.
 * Устраняет двойной hop через Socket.IO proxy.
 * 
 * Преимущества:
 * - Минимальная latency (10-50ms вместо 23-120ms)
 * - Прямой поток данных
 * - Нет overhead Socket.IO
 * 
 * Поддерживаемые биржи:
 * - Binance (Spot, Futures)
 * - Bybit (Spot, Linear)
 * - OKX (Public)
 */

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ==================== TYPES ====================

export type ExchangeType = 'binance' | 'bybit' | 'okx';
export type MarketType = 'spot' | 'futures';

export interface DirectPriceData {
  symbol: string;
  exchange: ExchangeType;
  price: number;
  bid: number;
  ask: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  timestamp: number;
}

export interface DirectWSStatus {
  connected: boolean;
  connecting: boolean;
  error: string | null;
  lastMessage: number | null;
  messagesPerSecond: number;
  latency: number;
}

export interface UseDirectExchangeWebSocketOptions {
  exchange: ExchangeType;
  symbols: string[];
  marketType?: MarketType;
  enabled?: boolean;
  onPriceUpdate?: (data: DirectPriceData) => void;
  onError?: (error: string) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

// ==================== WEBSOCKET CONFIGS ====================

interface WSConfig {
  getUrl: (marketType: MarketType) => string;
  getSubscribeMessage: (symbols: string[], marketType: MarketType) => string;
  parseMessage: (data: any, exchange: ExchangeType) => DirectPriceData | null;
  pingInterval: number;
  pingMessage: string;
}

const WS_CONFIGS: Record<ExchangeType, WSConfig> = {
  binance: {
    getUrl: (marketType) => 
      marketType === 'futures' 
        ? 'wss://fstream.binance.com/stream'
        : 'wss://stream.binance.com:9443/stream',
    getSubscribeMessage: (symbols, marketType) => {
      const streams = symbols.map(s => `${s.toLowerCase()}@ticker`).join('/');
      return JSON.stringify({
        method: 'SUBSCRIBE',
        params: symbols.map(s => `${s.toLowerCase()}@ticker`),
        id: Date.now(),
      });
    },
    parseMessage: (data) => {
      if (!data.data || !data.stream?.includes('@ticker')) return null;
      const d = data.data;
      return {
        symbol: d.s,
        exchange: 'binance',
        price: parseFloat(d.c),
        bid: parseFloat(d.b),
        ask: parseFloat(d.a),
        change24h: parseFloat(d.P),
        high24h: parseFloat(d.h),
        low24h: parseFloat(d.l),
        volume24h: parseFloat(d.v) * parseFloat(d.c),
        timestamp: Date.now(),
      };
    },
    pingInterval: 180000, // 3 minutes (server pings)
    pingMessage: JSON.stringify({ method: 'ping' }),
  },
  
  bybit: {
    getUrl: (marketType) =>
      marketType === 'futures'
        ? 'wss://stream.bybit.com/v5/public/linear'
        : 'wss://stream.bybit.com/v5/public/spot',
    getSubscribeMessage: (symbols) => JSON.stringify({
      op: 'subscribe',
      args: symbols.map(s => `tickers.${s}`),
    }),
    parseMessage: (data) => {
      if (!data.topic?.includes('tickers') || !data.data) return null;
      const d = data.data;
      return {
        symbol: d.symbol,
        exchange: 'bybit',
        price: parseFloat(d.lastPrice),
        bid: parseFloat(d.bid1Price),
        ask: parseFloat(d.ask1Price),
        change24h: parseFloat(d.price24hPcnt || '0') * 100,
        high24h: parseFloat(d.highPrice24h),
        low24h: parseFloat(d.lowPrice24h),
        volume24h: parseFloat(d.volume24h) * parseFloat(d.lastPrice),
        timestamp: Date.now(),
      };
    },
    pingInterval: 20000,
    pingMessage: JSON.stringify({ op: 'ping' }),
  },
  
  okx: {
    getUrl: () => 'wss://ws.okx.com:8443/ws/v5/public',
    getSubscribeMessage: (symbols) => JSON.stringify({
      op: 'subscribe',
      args: symbols.map(s => ({
        channel: 'tickers',
        instId: s.replace('USDT', '-USDT'),
      })),
    }),
    parseMessage: (data) => {
      if (data.arg?.channel !== 'tickers' || !data.data?.[0]) return null;
      const d = data.data[0];
      const symbol = (data.arg?.instId || d.instId || '').replace('-', '');
      const last = parseFloat(d.last || '0');
      const open = parseFloat(d.open24h || last.toString());
      return {
        symbol,
        exchange: 'okx',
        price: last,
        bid: parseFloat(d.bidPx || '0'),
        ask: parseFloat(d.askPx || '0'),
        change24h: open > 0 ? ((last - open) / open) * 100 : 0,
        high24h: parseFloat(d.high24h || '0'),
        low24h: parseFloat(d.low24h || '0'),
        volume24h: parseFloat(d.vol24h || '0'),
        timestamp: Date.now(),
      };
    },
    pingInterval: 25000,
    pingMessage: 'ping',
  },
};

// ==================== HOOK ====================

export function useDirectExchangeWebSocket(
  options: UseDirectExchangeWebSocketOptions
): {
  prices: Record<string, DirectPriceData>;
  status: DirectWSStatus;
  reconnect: () => void;
  disconnect: () => void;
} {
  const {
    exchange,
    symbols,
    marketType = 'futures',
    enabled = true,
    onPriceUpdate,
    onError,
    onConnect,
    onDisconnect,
  } = options;

  const [prices, setPrices] = useState<Record<string, DirectPriceData>>({});
  const [status, setStatus] = useState<DirectWSStatus>({
    connected: false,
    connecting: false,
    error: null,
    lastMessage: null,
    messagesPerSecond: 0,
    latency: 0,
  });

  const wsRef = useRef<WebSocket | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const messageCountRef = useRef<number>(0);
  const lastSecondRef = useRef<number>(Date.now());
  const connectTimeRef = useRef<number>(0);

  const config = WS_CONFIGS[exchange];

  const updateMessagesPerSecond = useCallback(() => {
    const now = Date.now();
    const elapsed = now - lastSecondRef.current;
    
    if (elapsed >= 1000) {
      const mps = (messageCountRef.current / elapsed) * 1000;
      setStatus(prev => ({
        ...prev,
        messagesPerSecond: Math.round(mps),
      }));
      messageCountRef.current = 0;
      lastSecondRef.current = now;
    }
  }, []);

  const startPingInterval = useCallback(() => {
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
    }
    
    // Only start client-side pings for exchanges that need it
    if (exchange !== 'binance') {
      pingIntervalRef.current = setInterval(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(config.pingMessage);
        }
      }, config.pingInterval);
    }
  }, [exchange, config]);

  const connect = useCallback(() => {
    if (!enabled || wsRef.current?.readyState === WebSocket.OPEN) return;

    setStatus(prev => ({ ...prev, connecting: true, error: null }));

    const url = config.getUrl(marketType);
    connectTimeRef.current = Date.now();
    
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      const latency = Date.now() - connectTimeRef.current;
      console.log(`[DirectWS] Connected to ${exchange} ${marketType} in ${latency}ms`);
      
      // Subscribe to symbols
      ws.send(config.getSubscribeMessage(symbols, marketType));
      
      // Start ping interval
      startPingInterval();
      
      setStatus(prev => ({
        ...prev,
        connected: true,
        connecting: false,
        latency,
      }));
      
      onConnect?.();
    };

    ws.onmessage = (event) => {
      messageCountRef.current++;
      updateMessagesPerSecond();
      
      try {
        // Handle pong responses
        if (event.data === 'pong' || event.data.includes('pong')) {
          return;
        }
        
        const data = JSON.parse(event.data);
        
        // Handle ping from server (Binance)
        if (data.ping) {
          ws.send(JSON.stringify({ pong: data.ping }));
          return;
        }
        
        const priceData = config.parseMessage(data, exchange);
        
        if (priceData) {
          setPrices(prev => ({
            ...prev,
            [priceData.symbol]: priceData,
          }));
          
          setStatus(prev => ({
            ...prev,
            lastMessage: Date.now(),
          }));
          
          onPriceUpdate?.(priceData);
        }
      } catch (error) {
        // Ignore parse errors
      }
    };

    ws.onerror = () => {
      const errorMsg = `WebSocket error on ${exchange}`;
      console.error(`[DirectWS] ${errorMsg}`);
      setStatus(prev => ({
        ...prev,
        connected: false,
        connecting: false,
        error: errorMsg,
      }));
      onError?.(errorMsg);
    };

    ws.onclose = (event) => {
      console.log(`[DirectWS] Disconnected from ${exchange}: ${event.code} ${event.reason}`);
      
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
      
      setStatus(prev => ({
        ...prev,
        connected: false,
        connecting: false,
      }));
      
      onDisconnect?.();
      
      // Auto-reconnect after 5 seconds if not closed intentionally
      if (event.code !== 1000 && enabled) {
        setTimeout(connect, 5000);
      }
    };
  }, [enabled, exchange, marketType, symbols, config, startPingInterval, updateMessagesPerSecond, onPriceUpdate, onError, onConnect, onDisconnect]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close(1000, 'Manual disconnect');
      wsRef.current = null;
    }
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
    }
  }, []);

  const reconnect = useCallback(() => {
    disconnect();
    setTimeout(connect, 100);
  }, [disconnect, connect]);

  // Auto-connect on mount
  useEffect(() => {
    connect();
    return disconnect;
  }, [connect, disconnect]);

  // Re-subscribe when symbols change
  useEffect(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(config.getSubscribeMessage(symbols, marketType));
    }
  }, [symbols, marketType, config]);

  return {
    prices,
    status,
    reconnect,
    disconnect,
  };
}

// ==================== CONVENIENCE HOOKS ====================

/**
 * Single symbol price with direct WebSocket
 */
export function useDirectSymbolPrice(
  symbol: string,
  exchange: ExchangeType = 'binance',
  marketType: MarketType = 'futures'
): {
  price: DirectPriceData | null;
  status: DirectWSStatus;
} {
  const { prices, status } = useDirectExchangeWebSocket({
    exchange,
    symbols: [symbol],
    marketType,
  });

  return {
    price: prices[symbol] || null,
    status,
  };
}

/**
 * Multiple symbols with direct WebSocket
 */
export function useDirectSymbolsPrice(
  symbols: string[],
  exchange: ExchangeType = 'binance',
  marketType: MarketType = 'futures'
): {
  prices: Record<string, DirectPriceData>;
  status: DirectWSStatus;
} {
  return useDirectExchangeWebSocket({
    exchange,
    symbols,
    marketType,
  });
}

export default useDirectExchangeWebSocket;
