/**
 * Shared Exchange Constants
 * 
 * Single source of truth for exchange information.
 * Import from this file instead of defining locally.
 * 
 * Usage:
 * import { SUPPORTED_EXCHANGES, EXCHANGE_OPTIONS } from '@/lib/constants/exchanges';
 */

import type { ExchangeId } from "@/lib/exchange/types";

export interface ExchangeInfo {
  id: ExchangeId;
  name: string;
  supported: boolean;
  supportsSpot: boolean;
  supportsFutures: boolean;
  supportsTestnet: boolean;
  supportsDemo: boolean;
  maxLeverage: number;
  makerFee: number;
  takerFee: number;
  requiresPassphrase: boolean;
  logoUrl?: string;
}

/**
 * Comprehensive exchange information array
 */
export const SUPPORTED_EXCHANGES: ExchangeInfo[] = [
  {
    id: "binance",
    name: "Binance",
    supported: true,
    supportsSpot: true,
    supportsFutures: true,
    supportsTestnet: true,
    supportsDemo: false,
    maxLeverage: 125,
    makerFee: 0.0002,
    takerFee: 0.0004,
    requiresPassphrase: false,
    logoUrl: "/exchanges/binance.svg",
  },
  {
    id: "bybit",
    name: "Bybit",
    supported: true,
    supportsSpot: true,
    supportsFutures: true,
    supportsTestnet: true,
    supportsDemo: false,
    maxLeverage: 100,
    makerFee: 0.0002,
    takerFee: 0.00055,
    requiresPassphrase: false,
    logoUrl: "/exchanges/bybit.svg",
  },
  {
    id: "okx",
    name: "OKX",
    supported: true,
    supportsSpot: true,
    supportsFutures: true,
    supportsTestnet: false,
    supportsDemo: true,
    maxLeverage: 125,
    makerFee: 0.0002,
    takerFee: 0.0005,
    requiresPassphrase: true,
    logoUrl: "/exchanges/okx.svg",
  },
  {
    id: "bitget",
    name: "Bitget",
    supported: true,
    supportsSpot: true,
    supportsFutures: true,
    supportsTestnet: false,
    supportsDemo: true,
    maxLeverage: 125,
    makerFee: 0.0002,
    takerFee: 0.0006,
    requiresPassphrase: true,
    logoUrl: "/exchanges/bitget.svg",
  },
  {
    id: "bingx",
    name: "BingX",
    supported: true,
    supportsSpot: true,
    supportsFutures: true,
    supportsTestnet: false,
    supportsDemo: true,
    maxLeverage: 150,
    makerFee: 0.0002,
    takerFee: 0.0005,
    requiresPassphrase: false,
    logoUrl: "/exchanges/bingx.svg",
  },
];

/**
 * Simple exchange options for Select/ComboBox components
 */
export const EXCHANGE_OPTIONS = SUPPORTED_EXCHANGES.map((ex) => ({
  value: ex.id,
  label: ex.name,
}));

/**
 * Alias for backward compatibility
 */
export const EXCHANGES = EXCHANGE_OPTIONS;

/**
 * Get exchange info by ID
 */
export function getExchangeInfo(exchangeId: ExchangeId): ExchangeInfo | undefined {
  return SUPPORTED_EXCHANGES.find((ex) => ex.id === exchangeId);
}

/**
 * Get exchange name by ID
 */
export function getExchangeName(exchangeId: ExchangeId): string {
  return getExchangeInfo(exchangeId)?.name || exchangeId.toUpperCase();
}

/**
 * Check if exchange supports a feature
 */
export function exchangeSupports(
  exchangeId: ExchangeId,
  feature: "spot" | "futures" | "testnet" | "demo"
): boolean {
  const exchange = getExchangeInfo(exchangeId);
  if (!exchange) return false;

  switch (feature) {
    case "spot":
      return exchange.supportsSpot;
    case "futures":
      return exchange.supportsFutures;
    case "testnet":
      return exchange.supportsTestnet;
    case "demo":
      return exchange.supportsDemo;
    default:
      return false;
  }
}

/**
 * Get exchanges that support a specific feature
 */
export function getExchangesByFeature(
  feature: "spot" | "futures" | "testnet" | "demo"
): ExchangeInfo[] {
  return SUPPORTED_EXCHANGES.filter((ex) => exchangeSupports(ex.id, feature));
}

/**
 * Exchange ID list for type safety
 */
export const EXCHANGE_IDS: ExchangeId[] = SUPPORTED_EXCHANGES.map((ex) => ex.id);

/**
 * Default exchange for new users
 */
export const DEFAULT_EXCHANGE: ExchangeId = "binance";

/**
 * Trading pair common bases
 */
export const TRADING_PAIRS = {
  USDT: ["BTC", "ETH", "BNB", "SOL", "XRP", "ADA", "DOGE", "AVAX", "DOT", "MATIC"],
  BUSD: ["BTC", "ETH", "BNB"],
} as const;

/**
 * Position sides for orders
 */
export const POSITION_SIDES = [
  { value: "long", label: "Long" },
  { value: "short", label: "Short" },
  { value: "both", label: "Both (Hedge Mode)" },
] as const;

/**
 * Generate trading symbol
 */
export function generateSymbol(base: string, quote: string = "USDT"): string {
  return `${base}${quote}`;
}

/**
 * Common timeframes
 */
export const TIMEFRAMES = [
  { value: "1m", label: "1 Minute" },
  { value: "5m", label: "5 Minutes" },
  { value: "15m", label: "15 Minutes" },
  { value: "30m", label: "30 Minutes" },
  { value: "1h", label: "1 Hour" },
  { value: "4h", label: "4 Hours" },
  { value: "1d", label: "1 Day" },
  { value: "1w", label: "1 Week" },
] as const;

/**
 * Order types
 */
export const ORDER_TYPES = [
  { value: "market", label: "Market" },
  { value: "limit", label: "Limit" },
  { value: "stop_market", label: "Stop Market" },
  { value: "stop_limit", label: "Stop Limit" },
] as const;

/**
 * Position sides
 */
export const POSITION_SIDES = [
  { value: "long", label: "Long" },
  { value: "short", label: "Short" },
] as const;

/**
 * Leverage options with labels
 */
export const LEVERAGE_OPTIONS = [
  { value: 1, label: "1x" },
  { value: 2, label: "2x" },
  { value: 3, label: "3x" },
  { value: 5, label: "5x" },
  { value: 10, label: "10x" },
  { value: 15, label: "15x" },
  { value: 20, label: "20x" },
  { value: 25, label: "25x" },
  { value: 30, label: "30x" },
  { value: 40, label: "40x" },
  { value: 50, label: "50x" },
  { value: 75, label: "75x" },
  { value: 100, label: "100x" },
  { value: 125, label: "125x" },
] as const;

/**
 * Default leverage
 */
export const DEFAULT_LEVERAGE = 10;

/**
 * Margin modes
 */
export const MARGIN_MODES = [
  { value: "isolated", label: "Isolated" },
  { value: "cross", label: "Cross" },
] as const;
