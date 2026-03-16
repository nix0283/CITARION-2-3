"use client";

/**
 * Price WebSocket Hooks - Client-Side Module
 * 
 * React hooks for multi-exchange WebSocket price streaming.
 * Server-safe code is in price-websocket-core.ts
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  type PriceSource,
  type ConnectionStatus,
  type MarketPrice,
  EXCHANGE_WS_CONFIGS,
  DEFAULT_SYMBOLS,
  getMultiExchangeWs,
} from "./price-websocket-core";

// Re-export types and configs for backwards compatibility
export type { PriceSource, ConnectionStatus } from "./price-websocket-core";
export { EXCHANGE_WS_CONFIGS } from "./price-websocket-core";

// ==================== REACT HOOKS ====================

export function useMultiExchangePriceWebSocket(
  sources: PriceSource[] = ["binance", "bybit", "okx"],
  symbols: string[] = DEFAULT_SYMBOLS,
  useFutures = true
) {
  const [prices, setPrices] = useState<Record<string, MarketPrice>>({});
  const [statuses, setStatuses] = useState<Record<PriceSource, ConnectionStatus>>({} as Record<PriceSource, ConnectionStatus>);
  const [activeSource, setActiveSource] = useState<PriceSource>("binance");
  const wsRef = useRef<ReturnType<typeof getMultiExchangeWs> | null>(null);

  useEffect(() => {
    const ws = getMultiExchangeWs(symbols, useFutures);
    wsRef.current = ws;

    const unsubscribe = ws.subscribe((newPrices, source) => {
      requestAnimationFrame(() => {
        setPrices(ws.getAllPrices());
        setStatuses(ws.getAllStatuses());
      });
    });

    sources.forEach(source => ws.connect(source));

    return () => {
      unsubscribe();
    };
  }, [sources.join(","), symbols.join(","), useFutures]);

  const reconnect = useCallback((source?: PriceSource) => {
    if (wsRef.current) {
      if (source) {
        wsRef.current.disconnect(source);
        wsRef.current.connect(source);
      } else {
        wsRef.current.disconnectAll();
        wsRef.current.connectAll();
      }
    }
  }, []);

  const getPricesBySource = useCallback((source: PriceSource) => {
    return wsRef.current?.getPrices(source) || {};
  }, []);

  return {
    prices,
    statuses,
    activeSource,
    setActiveSource,
    reconnect,
    getPricesBySource,
    sources: Object.keys(EXCHANGE_WS_CONFIGS) as PriceSource[],
    exchangeNames: Object.fromEntries(
      Object.entries(EXCHANGE_WS_CONFIGS).map(([k, v]) => [k, v.name])
    ) as Record<PriceSource, string>,
  };
}

export function usePriceWebSocket(symbols: string[] = DEFAULT_SYMBOLS) {
  const { prices, statuses, reconnect } = useMultiExchangePriceWebSocket(["binance"], symbols);
  
  return {
    prices,
    connectionStatus: statuses["binance"] || "disconnected",
    reconnect: () => reconnect("binance"),
    lastUpdated: new Date(),
  };
}
