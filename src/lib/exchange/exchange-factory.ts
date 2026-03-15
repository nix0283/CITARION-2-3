/**
 * Exchange Factory
 * 
 * Centralized factory for creating and managing exchange client connections.
 * Implements connection pooling, caching, and automatic reconnection.
 * 
 * Features:
 * - Connection caching (reuse existing connections)
 * - Automatic reconnection on failure
 * - Support for testnet/demo modes
 * - Rate limit management
 * - Circuit breaker integration
 * 
 * Usage:
 * const client = await ExchangeFactory.getClient('binance', credentials, { testnet: true });
 * const balance = await client.getAccountInfo();
 */

import { BinanceClient } from "./binance-client";
import { BybitClient } from "./bybit-client";
import { OKXClient } from "./okx-client";
import { BitgetClient } from "./bitget-client";
import { BingxClient } from "./bingx-client";
import { BaseExchangeClient } from "./base-client";
import {
  ApiCredentials,
  MarketType,
  ExchangeId,
  EXCHANGE_CONFIGS,
} from "./types";

export interface ExchangeClientOptions {
  testnet?: boolean;
  tradingMode?: "LIVE" | "TESTNET" | "DEMO";
  marketType?: MarketType;
  autoReconnect?: boolean;
  reconnectAttempts?: number;
}

interface CachedConnection {
  client: BaseExchangeClient;
  lastUsed: number;
  options: ExchangeClientOptions;
}

export class ExchangeFactory {
  private static connections = new Map<string, CachedConnection>();
  private static readonly CONNECTION_TTL = 30 * 60 * 1000; // 30 minutes
  private static cleanupInterval: NodeJS.Timeout | null = null;

  /**
   * Get or create an exchange client
   */
  static async getClient(
    exchangeId: ExchangeId,
    credentials: ApiCredentials,
    options: ExchangeClientOptions = {}
  ): Promise<BaseExchangeClient> {
    const cacheKey = this.getCacheKey(exchangeId, credentials, options);

    // Check for existing connection
    const cached = this.connections.get(cacheKey);
    if (cached) {
      // Verify connection is still valid
      if (await this.verifyConnection(cached.client)) {
        cached.lastUsed = Date.now();
        return cached.client;
      }
      // Connection invalid, remove and create new
      this.connections.delete(cacheKey);
    }

    // Create new client
    const client = await this.createClient(exchangeId, credentials, options);

    // Cache the connection
    this.connections.set(cacheKey, {
      client,
      lastUsed: Date.now(),
      options,
    });

    // Start cleanup if not running
    this.startCleanup();

    return client;
  }

  /**
   * Create a new exchange client
   */
  private static async createClient(
    exchangeId: ExchangeId,
    credentials: ApiCredentials,
    options: ExchangeClientOptions
  ): Promise<BaseExchangeClient> {
    const marketType = options.marketType || "futures";
    const testnet = options.testnet ?? false;

    // Check if exchange is supported
    const config = EXCHANGE_CONFIGS[exchangeId];
    if (!config) {
      throw new Error(`Unsupported exchange: ${exchangeId}`);
    }

    // Verify testnet support
    if (testnet && !config.hasTestnet && !config.hasDemo) {
      throw new Error(`${exchangeId} does not support testnet mode`);
    }

    // Create appropriate client
    let client: BaseExchangeClient;

    switch (exchangeId) {
      case "binance":
        client = new BinanceClient(credentials, marketType, testnet);
        break;
      case "bybit":
        client = new BybitClient(credentials, marketType, testnet);
        break;
      case "okx":
        client = new OKXClient(credentials, marketType, testnet);
        break;
      case "bitget":
        client = new BitgetClient(credentials, marketType, testnet);
        break;
      case "bingx":
        client = new BingXClient(credentials, marketType, testnet);
        break;
      default:
        throw new Error(`Exchange client not implemented: ${exchangeId}`);
    }

    // Test connection
    try {
      const testResult = await client.testConnection();
      if (!testResult.success) {
        throw new Error(`Connection test failed: ${testResult.message}`);
      }
    } catch (error) {
      // Clean up failed connection
      const cacheKey = this.getCacheKey(exchangeId, credentials, options);
      this.connections.delete(cacheKey);
      throw error;
    }

    return client;
  }

  /**
   * Verify connection is still valid
   */
  private static async verifyConnection(client: BaseExchangeClient): Promise<boolean> {
    try {
      const result = await client.testConnection();
      return result.success;
    } catch {
      return false;
    }
  }

  /**
   * Generate cache key for connection
   */
  private static getCacheKey(
    exchangeId: ExchangeId,
    credentials: ApiCredentials,
    options: ExchangeClientOptions
  ): string {
    // Use last 8 chars of API key for identification
    const keySuffix = credentials.apiKey.slice(-8);
    const mode = options.testnet ? "testnet" : "live";
    const market = options.marketType || "futures";
    return `${exchangeId}:${keySuffix}:${mode}:${market}`;
  }

  /**
   * Disconnect a specific client
   */
  static async disconnect(
    exchangeId: ExchangeId,
    credentials: ApiCredentials,
    options: ExchangeClientOptions = {}
  ): Promise<void> {
    const cacheKey = this.getCacheKey(exchangeId, credentials, options);
    const cached = this.connections.get(cacheKey);
    
    if (cached) {
      // Most clients don't need explicit disconnect, but clear from cache
      this.connections.delete(cacheKey);
    }
  }

  /**
   * Disconnect all clients
   */
  static async disconnectAll(): Promise<void> {
    this.connections.clear();
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  /**
   * Get all active connections
   */
  static getActiveConnections(): Array<{
    exchangeId: ExchangeId;
    keySuffix: string;
    mode: string;
    lastUsed: Date;
  }> {
    const connections: Array<{
      exchangeId: ExchangeId;
      keySuffix: string;
      mode: string;
      lastUsed: Date;
    }> = [];

    for (const [key, cached] of this.connections) {
      const [exchangeId, keySuffix, mode] = key.split(":");
      connections.push({
        exchangeId: exchangeId as ExchangeId,
        keySuffix,
        mode,
        lastUsed: new Date(cached.lastUsed),
      });
    }

    return connections;
  }

  /**
   * Start cleanup interval for stale connections
   */
  private static startCleanup(): void {
    if (this.cleanupInterval) return;

    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, cached] of this.connections) {
        if (now - cached.lastUsed > this.CONNECTION_TTL) {
          this.connections.delete(key);
        }
      }
    }, 5 * 60 * 1000); // Check every 5 minutes
  }

  /**
   * Check if exchange is supported
   */
  static isExchangeSupported(exchangeId: string): exchangeId is ExchangeId {
    return exchangeId in EXCHANGE_CONFIGS;
  }

  /**
   * Get list of supported exchanges
   */
  static getSupportedExchanges(): ExchangeId[] {
    return Object.keys(EXCHANGE_CONFIGS) as ExchangeId[];
  }

  /**
   * Get exchange configuration
   */
  static getExchangeConfig(exchangeId: ExchangeId) {
    return EXCHANGE_CONFIGS[exchangeId];
  }

  /**
   * Check if exchange supports testnet
   */
  static supportsTestnet(exchangeId: ExchangeId): boolean {
    return EXCHANGE_CONFIGS[exchangeId]?.hasTestnet ?? false;
  }

  /**
   * Check if exchange supports demo mode
   */
  static supportsDemo(exchangeId: ExchangeId): boolean {
    return EXCHANGE_CONFIGS[exchangeId]?.hasDemo ?? false;
  }
}

// Convenience function
export const getExchangeClient = (
  exchangeId: ExchangeId,
  credentials: ApiCredentials,
  options?: ExchangeClientOptions
) => ExchangeFactory.getClient(exchangeId, credentials, options);
