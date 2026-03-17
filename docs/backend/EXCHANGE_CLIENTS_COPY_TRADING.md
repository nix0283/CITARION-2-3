# Exchange Clients & Copy Trading Documentation

## Overview

This document covers the Exchange Client architecture and Copy Trading system for the trading platform. The system supports 5 active exchanges with unified APIs, rate limiting, circuit breakers, and comprehensive copy trading functionality.

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Exchange Client Architecture                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │
│  │ ExchangeFactory │  │ Circuit Breaker │  │ API Monitor │                 │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                 │
│         │                │                │                         │
│  ┌──────▼────────────────▼────────────────▼──────┐                 │
│  │              BaseExchangeClient                │                 │
│  │  - Rate Limiting    - Request Signing          │                 │
│  │  - Error Handling   - Trading Mode Support     │                 │
│  └───────────────────────┬───────────────────────┘                 │
│                          │                                         │
│  ┌─────────┬─────────┬───┴───┬─────────┬─────────┐                │
│  │ Binance │  Bybit  │  OKX  │ Bitget  │  BingX  │                │
│  └─────────┴─────────┴───────┴─────────┴─────────┘                │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Copy Trading Module                       │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │  Master Trader APIs  │  Follower APIs  │  Profit Sharing    │   │
│  │  Slippage Protection │  Risk Manager   │  Fill Ratio Track  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Table of Contents

1. [Active Exchanges](#active-exchanges)
2. [Exchange Configuration](#exchange-configuration)
3. [Base Exchange Client](#base-exchange-client)
4. [Exchange Factory](#exchange-factory)
5. [Circuit Breaker Pattern](#circuit-breaker-pattern)
6. [Exchange-Specific Clients](#exchange-specific-clients)
7. [Copy Trading System](#copy-trading-system)
8. [API Reference](#api-reference)
9. [Usage Examples](#usage-examples)
10. [Best Practices](#best-practices)

---

## Active Exchanges

The system supports 5 active exchanges with full API integration:

| Exchange | Markets | Testnet | Demo | Passphrase | Max Leverage |
|----------|---------|---------|------|------------|--------------|
| Binance | Spot, Futures, Inverse | ✅ | ❌ | ❌ | 125x |
| Bybit | Spot, Futures, Inverse | ✅ | ❌ | ❌ | 100x |
| OKX | Spot, Futures, Inverse | ❌ | ✅ | ✅ | 125x |
| Bitget | Spot, Futures, Inverse | ❌ | ✅ | ✅ | 125x |
| BingX | Spot, Futures | ❌ | ✅ | ❌ | 50x |

### Disabled Exchanges

The following exchanges are disabled but available for future activation:
- KuCoin (Sandbox available)
- Coinbase (Sandbox available)
- Huobi/HTX (Testnet available)
- HyperLiquid (Testnet available, wallet-based auth)
- BitMEX (Testnet available, inverse futures)
- BloFin (Demo available)
- Aster DEX (Testnet available, wallet-based auth)

---

## Exchange Configuration

### ExchangeId Types

```typescript
// Active exchange IDs - shown in UI
export type ExchangeId = 
  | "binance" 
  | "bybit" 
  | "okx" 
  | "bitget" 
  | "bingx";

// All exchange IDs including disabled ones
export type AllExchangeId = 
  | ExchangeId 
  | "kucoin" 
  | "coinbase" 
  | "huobi" 
  | "hyperliquid" 
  | "bitmex" 
  | "blofin"
  | "aster"
  | "gate";
```

### Trading Modes

```typescript
export type TradingMode = "LIVE" | "TESTNET" | "DEMO";

export interface TestnetConfig {
  supported: boolean;
  separateRegistration: boolean;
  registrationUrl?: string;
  initialBalance?: number;
  balanceCurrency?: string;
  hasFaucet: boolean;
}

export interface DemoConfig {
  supported: boolean;
  type: "simulation";
  symbolPrefix?: string;       // e.g., "S" for Bitget demo symbols
  demoCurrency?: string;       // e.g., "VST" for BingX, "SUSDT" for Bitget
  initialBalance?: number;
  minBalanceForRecharge?: number;
  rechargeCooldownHours?: number;
  specialHeader?: { name: string; value: string };
}
```

### Exchange Configuration Object

```typescript
export interface ExchangeConfig {
  id: ExchangeId;
  name: string;
  markets: MarketType[];
  hasTestnet: boolean;
  hasDemo: boolean;
  requiresPassphrase: boolean;
  requiresUid: boolean;
  supportsHedgeMode: boolean;
  supportsTrailingStop: boolean;
  supportsReduceOnly: boolean;
  apiVersion: string;
  
  // URLs
  spotUrl?: string;
  futuresUrl?: string;
  inverseUrl?: string;
  spotTestnetUrl?: string;
  futuresTestnetUrl?: string;
  wsUrl?: string;
  wsTestnetUrl?: string;
  
  // Configurations
  testnetConfig?: TestnetConfig;
  demoConfig?: DemoConfig;
  rateLimits: RateLimitConfig;
  docsUrl?: string;
}
```

### Active Exchange Configurations

```typescript
// Binance Configuration
binance: {
  id: "binance",
  name: "Binance",
  markets: ["spot", "futures", "inverse"],
  hasTestnet: true,
  hasDemo: false,
  testnetConfig: {
    supported: true,
    separateRegistration: true,
    registrationUrl: "https://testnet.binancefuture.com",
    initialBalance: 15000,
    balanceCurrency: "USDT",
    hasFaucet: true,
  },
  futuresUrl: "https://fapi.binance.com",
  futuresTestnetUrl: "https://testnet.binancefuture.com",
  rateLimits: {
    general: { maxRequests: 1200, windowMs: 60000, cost: 1 },
    orders: { maxRequests: 50, windowMs: 10000, cost: 1 },
  },
}

// OKX Configuration
okx: {
  id: "okx",
  name: "OKX",
  markets: ["spot", "futures", "inverse"],
  hasTestnet: false,
  hasDemo: true,
  requiresPassphrase: true,
  demoConfig: {
    supported: true,
    type: "simulation",
    demoCurrency: "USDT",
    initialBalance: 10000,
    specialHeader: { name: "x-simulated-trading", value: "1" },
    demoApiKeyRequired: true,
  },
}

// Bitget Configuration
bitget: {
  id: "bitget",
  name: "Bitget",
  markets: ["spot", "futures", "inverse"],
  hasTestnet: false,
  hasDemo: true,
  requiresPassphrase: true,
  demoConfig: {
    supported: true,
    type: "simulation",
    symbolPrefix: "S",         // Demo symbols: SBTCUSDT, SETHUSDT
    demoCurrency: "SUSDT",
    initialBalance: 50000,
    rechargeCooldownHours: 72,
  },
}

// BingX Configuration
bingx: {
  id: "bingx",
  name: "BingX",
  markets: ["spot", "futures"],
  hasTestnet: false,
  hasDemo: true,
  demoConfig: {
    supported: true,
    type: "simulation",
    demoCurrency: "VST",       // Virtual Simulation Token
    initialBalance: 100000,
    minBalanceForRecharge: 20000,
    rechargeCooldownHours: 168, // 7 days
  },
}
```

### Rate Limits

```typescript
export const EXCHANGE_RATE_LIMITS: Record<AllExchangeId, RateLimitConfig> = {
  binance: {
    general: { maxRequests: 1200, windowMs: 60000, cost: 1 },
    orders: { maxRequests: 50, windowMs: 10000, cost: 1 },
  },
  bybit: {
    general: { maxRequests: 120, windowMs: 60000, cost: 1 },
    orders: { maxRequests: 100, windowMs: 60000, cost: 1 },
  },
  okx: {
    general: { maxRequests: 20, windowMs: 2000, cost: 1 },
    orders: { maxRequests: 60, windowMs: 2000, cost: 1 },
  },
  bitget: {
    general: { maxRequests: 15, windowMs: 1000, cost: 1 },
    orders: { maxRequests: 30, windowMs: 1000, cost: 1 },
  },
  bingx: {
    general: { maxRequests: 10, windowMs: 1000, cost: 1 },
    orders: { maxRequests: 10, windowMs: 1000, cost: 1 },
  },
};
```

---

## Base Exchange Client

The `BaseExchangeClient` provides common functionality for all exchange implementations:

### Core Methods

```typescript
export abstract class BaseExchangeClient {
  protected exchangeId: AllExchangeId;
  protected credentials: ApiCredentials;
  protected marketType: MarketType;
  protected testnet: boolean;
  protected tradingMode: TradingMode;
  protected rateLimiter: RateLimiter;
  protected circuitBreaker: ExchangeCircuitBreaker;

  // Abstract methods - must be implemented by each exchange
  abstract createOrder(params: CreateOrderParams): Promise<OrderResult>;
  abstract cancelOrder(params: CancelOrderParams): Promise<OrderResult>;
  abstract closePosition(params: ClosePositionParams): Promise<OrderResult>;
  abstract getPosition(symbol: string): Promise<Position | null>;
  abstract getPositions(): Promise<Position[]>;
  abstract getAccountInfo(): Promise<AccountInfo>;
  abstract getTicker(symbol: string): Promise<Ticker>;
  abstract getFundingRate(symbol: string): Promise<FundingRate>;
  abstract getOrderbook(symbol: string, depth?: number): Promise<Orderbook>;
  abstract setLeverage(params: SetLeverageParams): Promise<{ success: boolean; leverage: number }>;
  abstract testConnection(): Promise<{ success: boolean; message: string }>;
  
  // Position sync methods
  abstract getFuturesPositions(): Promise<ExchangePosition[]>;
  abstract getSpotPositions(): Promise<ExchangePosition[]>;
  
  // New abstract methods
  abstract getMarkPrice(symbol: string): Promise<MarkPrice>;
  abstract getOpenOrders(symbol?: string): Promise<OpenOrder[]>;
  abstract getOrderHistory(symbol?: string, limit?: number, startTime?: Date, endTime?: Date): Promise<OrderHistoryItem[]>;
  abstract getBalanceHistory(params?: BalanceHistoryParams): Promise<BalanceHistoryItem[]>;
  abstract getOpenInterest(symbol: string): Promise<OpenInterest>;
}
```

### Request Processing

```typescript
protected async request(
  method: "GET" | "POST" | "DELETE" | "PUT",
  endpoint: string,
  params: Record<string, unknown> = {},
  isSigned: boolean = true,
  isOrder: boolean = false
): Promise<{ data: unknown; headers: Headers }> {
  // 1. Circuit breaker check
  if (!this.circuitBreaker.canExecute()) {
    throw new CircuitBreakerOpenError(this.circuitBreaker);
  }

  // 2. Rate limiting
  await this.rateLimit(1, isOrder);

  // 3. Build request with signing
  const headers = isSigned ? this.signRequest(method, endpoint, params) : {};

  // 4. Execute with retries
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, { method, headers, body });
      
      if (!response.ok) {
        this.circuitBreaker.recordFailure();
        if (isRetriable(error) && attempt < 3) continue;
        throw this.parseError(response);
      }
      
      this.circuitBreaker.recordSuccess();
      return { data, headers: response.headers };
    } catch (error) {
      // Handle retries with exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      await sleep(delay);
    }
  }
}
```

### Trading Mode Support

```typescript
// Get trading mode
getTradingMode(): TradingMode {
  return this.tradingMode;
}

// Set trading mode
setTradingMode(mode: TradingMode): void {
  this.tradingMode = mode;
  if (mode === "TESTNET") {
    this.testnet = true;
  }
}

// Check modes
isDemo(): boolean {
  return this.tradingMode === "DEMO";
}

isTestnet(): boolean {
  return this.tradingMode === "TESTNET" || this.testnet;
}
```

---

## Exchange Factory

The `ExchangeFactory` provides centralized client creation and connection pooling:

### Factory Methods

```typescript
export class ExchangeFactory {
  private static connections = new Map<string, CachedConnection>();
  private static readonly CONNECTION_TTL = 30 * 60 * 1000; // 30 minutes

  // Get or create client with connection pooling
  static async getClient(
    exchangeId: ExchangeId,
    credentials: ApiCredentials,
    options: ExchangeClientOptions = {}
  ): Promise<BaseExchangeClient>;

  // Disconnect specific client
  static async disconnect(
    exchangeId: ExchangeId,
    credentials: ApiCredentials,
    options?: ExchangeClientOptions
  ): Promise<void>;

  // Get all active connections
  static getActiveConnections(): Array<{
    exchangeId: ExchangeId;
    keySuffix: string;
    mode: string;
    lastUsed: Date;
  }>;

  // Check if exchange is supported
  static isExchangeSupported(exchangeId: string): exchangeId is ExchangeId;

  // Get supported exchanges
  static getSupportedExchanges(): ExchangeId[];

  // Check testnet/demo support
  static supportsTestnet(exchangeId: ExchangeId): boolean;
  static supportsDemo(exchangeId: ExchangeId): boolean;
}
```

### Connection Options

```typescript
export interface ExchangeClientOptions {
  testnet?: boolean;
  tradingMode?: "LIVE" | "TESTNET" | "DEMO";
  marketType?: MarketType;
  autoReconnect?: boolean;
  reconnectAttempts?: number;
}
```

### Usage Example

```typescript
// Get client with connection pooling
const client = await ExchangeFactory.getClient('binance', {
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET,
}, {
  testnet: true,
  marketType: 'futures'
});

// Use client
const balance = await client.getAccountInfo();
const positions = await client.getPositions();
```

---

## Circuit Breaker Pattern

The circuit breaker prevents flooding failing exchanges with requests:

### States

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Circuit Breaker States                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   CLOSED ──(5 failures)──► OPEN ──(30s timeout)──► HALF_OPEN       │
│      ▲                         │                        │          │
│      │                         │                        │          │
│      └─────(1 success)─────────┘                        │          │
│      │                                                  │          │
│      │                    (any failure)                 │          │
│      └──────────────── ◄────────────────────────────────┘          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Configuration

```typescript
export interface ExchangeCircuitBreakerConfig {
  failureThreshold: number;     // Default: 5
  successThreshold: number;     // Default: 1
  openTimeout: number;          // Default: 30000ms
  halfOpenMaxCalls: number;     // Default: 3
  enableLogging: boolean;       // Default: true
}
```

### Usage

```typescript
// Circuit breaker is automatically managed by BaseExchangeClient
const client = new BinanceClient(credentials, 'futures', true);

// Check state manually
const state = client.getCircuitBreakerState(); // "CLOSED" | "OPEN" | "HALF_OPEN"

// Force operations
client.forceCircuitBreakerOpen();   // Stop all requests
client.forceCircuitBreakerClose();  // Allow all requests
client.resetCircuitBreaker();       // Reset to initial state

// Get statistics
const stats = client.getCircuitBreakerStats();
// {
//   exchangeId: "binance",
//   state: "CLOSED",
//   failureCount: 0,
//   totalFailures: 12,
//   totalSuccesses: 456,
//   totalCalls: 468
// }
```

---

## Exchange-Specific Clients

### Binance Client

```typescript
export class BinanceClient extends BaseExchangeClient {
  constructor(
    credentials: ApiCredentials,
    marketType: MarketType = "futures",
    testnet: boolean = false,
    tradingMode?: TradingMode
  );

  // Position mode management
  async getPositionMode(): Promise<{ dualSidePosition: boolean }>;
  async setPositionMode(hedgeMode: boolean): Promise<void>;

  // Market data
  async getTicker(symbol: string): Promise<Ticker>;
  async getFundingRate(symbol: string): Promise<FundingRate>;
  async getOrderbook(symbol: string, depth?: number): Promise<Orderbook>;
  async getMarkPrice(symbol: string): Promise<MarkPrice>;
  async getOpenInterest(symbol: string): Promise<OpenInterest>;

  // Order management
  async createOrder(params: CreateOrderParams): Promise<OrderResult>;
  async cancelOrder(params: CancelOrderParams): Promise<OrderResult>;
  async getOpenOrders(symbol?: string): Promise<OpenOrder[]>;
  async getOrderHistory(symbol?: string, limit?: number): Promise<OrderHistoryItem[]>;
}
```

### Bybit Client (V5 API)

```typescript
export class BybitClient extends BaseExchangeClient {
  private category: string; // "spot" | "linear" | "inverse"

  constructor(
    credentials: ApiCredentials,
    marketType: MarketType = "futures",
    testnet: boolean = false,
    tradingMode?: TradingMode
  );

  // Server time sync for testnet
  async getServerTime(): Promise<number>;
}
```

### OKX Client

```typescript
export class OKXClient extends BaseExchangeClient {
  private instType: string; // "SPOT" | "SWAP" | "FUTURES"

  constructor(
    credentials: ApiCredentials,
    marketType: MarketType = "futures",
    testnet: boolean = false,
    tradingMode?: TradingMode
  );

  // Demo trading header
  protected getHeaders(method: string, path: string, body?: string): Record<string, string> {
    const headers = { /* ... */ };
    if (this.tradingMode === "DEMO") {
      headers["x-simulated-trading"] = "1";
    }
    return headers;
  }

  // Account config
  async getAccountConfig(): Promise<{
    acctLv: number;
    posMode: string;
    autoLoan: boolean;
  }>;

  // Copy trading (via OKXMasterTrader)
  async getMasterTraderSettings(): Promise<MasterTraderSettings | null>;
  async updateMasterTraderSettings(settings: Partial<MasterTraderSettings>): Promise<MasterTraderResult>;
  async getMasterFollowers(limit?: number): Promise<MasterFollowerInfo[]>;
}
```

### Bitget Client (Demo Mode)

```typescript
export class BitgetClient extends BaseExchangeClient {
  private demoMode: boolean;

  // Demo symbol handling
  private getSymbol(symbol: string): string {
    if (this.demoMode) {
      return toDemoSymbol(symbol, "bitget"); // BTCUSDT -> SBTCUSDT
    }
    return symbol;
  }

  // Demo-specific methods
  async getDemoSymbols(): Promise<string[]>;
  async getDemoBalance(): Promise<{ available: number; frozen: number }>;
}
```

### BingX Client (VST Demo)

```typescript
export class BingxClient extends BaseExchangeClient {
  private demoMode: boolean;

  // VST balance
  async getVSTBalance(): Promise<{ available: number; total: number }>;

  // Recharge status
  async checkRechargeStatus(): Promise<{
    eligible: boolean;
    currentBalance: number;
    minRequired: number;
  }>;

  // Position mode
  async setPositionMode(hedgeMode: boolean): Promise<{ success: boolean }>;
}
```

---

## Copy Trading System

### Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Copy Trading Architecture                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────┐              ┌───────────────────┐          │
│  │   Master Trader   │              │  Follower Account │          │
│  │                   │   Copying    │                   │          │
│  │  - Trade signals  │ ───────────► │  - Auto execution │          │
│  │  - Position mgmt  │              │  - Risk management│          │
│  │  - TP/SL updates  │              │  - Slippage check │          │
│  └───────────────────┘              └───────────────────┘          │
│           │                                    │                    │
│           │                                    │                    │
│           ▼                                    ▼                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     Shared Components                        │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │  - ProfitSharingEngine    - SlippageProtector               │   │
│  │  - FollowerRiskManager    - FillRatioTracker                │   │
│  │  - FIFO Queue             - Position Monitor                │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Master Trader Types

```typescript
// Copy Trading Types
export interface CopyTraderStats {
  traderId: string;
  nickname?: string;
  avatar?: string;
  exchange: ExchangeId;
  
  // Performance
  roi: number;
  roi7d?: number;
  roi30d?: number;
  roi90d?: number;
  winRate: number;
  totalTrades: number;
  maxDrawdown?: number;
  
  // Following
  followersCount: number;
  aum?: number;              // Assets Under Management
  
  // Timestamps
  tradingDays?: number;
  traderSince?: Date;
  timestamp: Date;
}

export interface MasterTraderSettings {
  exchange: ExchangeId;
  profitShareEnabled: boolean;
  profitSharePercent: number;
  minCopyAmount: number;
  requireApproval: boolean;
  active: boolean;
  visible: boolean;
  totalFollowers: number;
  activeFollowers: number;
  totalProfitShared: number;
  totalTradesCopied: number;
}

export interface MasterFollowerInfo {
  followerId: string;
  exchange: ExchangeId;
  subscribedAt: Date;
  active: boolean;
  totalPnl: number;
  totalCopiedTrades: number;
  totalVolume: number;
}
```

### Master Trader Implementations

#### Binance Master Trader

```typescript
export class BinanceMasterTrader {
  // Check Lead Trader status
  async getLeadTraderStatus(): Promise<LeadTraderStatus>;
  
  // Get whitelist symbols
  async getCopyTradingSymbols(): Promise<CopyTradingSymbol[]>;
  
  // Note: Most operations require Web UI
  // - Apply as Lead Trader: Web UI only
  // - Follower management: Web UI only
  // - Profit sharing: Web UI only
  
  static getInstructions(): string; // Returns how to become Lead Trader
}
```

Binance Limitations:
- No public API for applying as Lead Trader
- No API for managing followers
- No API for profit sharing details
- Master Traders use standard Futures API

#### OKX Master Trader

```typescript
export class OKXMasterTrader {
  async getLeadTraderStatus(): Promise<LeadTraderStatus>;
  async getMasterTraderSettings(): Promise<MasterTraderSettings | null>;
  async updateMasterTraderSettings(settings: Partial<MasterTraderSettings>): Promise<MasterTraderResult>;
  async getFollowers(limit?: number): Promise<MasterFollowerInfo[]>;
  async removeFollower(followerId: string): Promise<MasterTraderResult>;
  async getProfitSharingDetails(startDate?: Date, endDate?: Date): Promise<MasterProfitSummary[]>;
  async getMasterPositions(): Promise<MasterTraderPosition[]>;
}
```

OKX has the most complete Master Trader API support.

### Profit Sharing Engine

```typescript
export class ProfitSharingEngine {
  constructor(config: Partial<ProfitShareConfig>);

  // Calculate share for a trade
  calculateShare(
    followerPnl: number,
    followerId: string,
    masterId: string
  ): {
    masterSharePercent: number;
    masterShareAmount: number;
    followerNetPnl: number;
    shouldDistribute: boolean;
  };

  // Record share for database
  async recordShare(trade: TradeInfo, followerId: string, masterId: string): Promise<ProfitShareRecord>;

  // Distribute to master
  async distributeToMaster(record: ProfitShareRecord): Promise<{ success: boolean; error?: string }>;

  // Get statistics
  async getMasterStats(masterId: string): Promise<MasterTraderStats>;
  async getFollowerStats(followerId: string): Promise<FollowerStats | null>;
}
```

#### Profit Share Configuration

```typescript
export interface ProfitShareConfig {
  shareType: "FIXED" | "TIERED" | "PERFORMANCE";
  fixedPercent?: number;
  tiers?: ProfitShareTier[];
  minProfitThreshold: number;
  calculationPeriodDays: number;
  autoDistribute: boolean;
}

// Default tiers
const DEFAULT_TIERS: ProfitShareTier[] = [
  { minProfit: 0, maxProfit: 100, sharePercent: 10 },
  { minProfit: 100, maxProfit: 500, sharePercent: 12 },
  { minProfit: 500, maxProfit: 2000, sharePercent: 15 },
  { minProfit: 2000, maxProfit: Infinity, sharePercent: 20 },
];
```

### Slippage Protection

```typescript
export class SlippageProtector {
  constructor(
    config: Partial<SlippageConfig>,
    priceFetcher?: PriceFetcher,
    ohlcvFetcher?: OHLCVFetcher
  );

  // Check if execution is acceptable
  checkSlippage(
    masterEntry: number,
    currentPrice: number,
    direction: 'LONG' | 'SHORT',
    context: CopyTradeContext
  ): SlippageResult;

  // Dynamic threshold based on ATR
  getDynamicThreshold(symbol: string, exchange: ExchangeId): number;

  // Update volatility data
  updateVolatilityData(symbol: string, exchange: ExchangeId, candles: OHLCVCandle[]): void;

  // Get statistics
  getSlippageStats(): {
    totalChecks: number;
    acceptedCount: number;
    rejectedCount: number;
    warningCount: number;
    avgSlippage: number;
    maxSlippage: number;
    rejectionRate: number;
  };
}
```

#### Slippage Configuration

```typescript
export interface SlippageConfig {
  maxSlippagePercent: number;       // Default: 0.5%
  volatilityMultiplier: boolean;    // Adjust based on ATR
  rejectOnExceeded: boolean;        // Default: true
  warningThreshold: number;         // Default: 0.25%
  atrPeriod: number;                // Default: 14
  volatilityFactor: number;         // Default: 0.1
  enableLogging: boolean;           // Default: true
  maxLatencyMs: number;             // Default: 30000ms
}
```

#### Risk Profile Configurations

```typescript
// Conservative
{
  maxSlippagePercent: 0.25,
  rejectOnExceeded: true,
  maxLatencyMs: 15000,
}

// Moderate
{
  maxSlippagePercent: 0.5,
  volatilityMultiplier: true,
  maxLatencyMs: 30000,
}

// Aggressive
{
  maxSlippagePercent: 1.0,
  rejectOnExceeded: false,  // Allow with warning
  maxLatencyMs: 60000,
}
```

---

## API Reference

### Exchange Client Methods

| Method | Description | Auth |
|--------|-------------|------|
| `getAccountInfo()` | Get account balance and margin | Private |
| `createOrder()` | Place new order | Private |
| `cancelOrder()` | Cancel existing order | Private |
| `closePosition()` | Close position with market order | Private |
| `getPosition()` | Get position for symbol | Private |
| `getPositions()` | Get all open positions | Private |
| `setLeverage()` | Set leverage for symbol | Private |
| `getTicker()` | Get ticker data | Public |
| `getFundingRate()` | Get funding rate | Public |
| `getOrderbook()` | Get order book | Public |
| `getMarkPrice()` | Get mark/index price | Public |
| `getOpenOrders()` | Get open orders | Private |
| `getOrderHistory()` | Get order history | Private |
| `getOpenInterest()` | Get open interest | Public |
| `testConnection()` | Test API connection | Private |

### Copy Trading Methods

| Method | Description | Role |
|--------|-------------|------|
| `getLeadTraderStatus()` | Check Lead Trader status | Any |
| `getCopyTraderList()` | Get top traders | Public |
| `getCopyTraderStats()` | Get trader statistics | Public |
| `getCopyTraderPositions()` | Get trader's positions | Public |
| `copyTraderSubscribe()` | Subscribe to trader | Follower |
| `copyTraderUnsubscribe()` | Unsubscribe from trader | Follower |
| `getCopyFollowerSettings()` | Get copy settings | Follower |
| `getMasterTraderSettings()` | Get master settings | Master |
| `updateMasterTraderSettings()` | Update master settings | Master |
| `getMasterFollowers()` | Get list of followers | Master |
| `removeMasterFollower()` | Remove a follower | Master |

---

## Usage Examples

### Example 1: Create Exchange Client

```typescript
import { ExchangeFactory } from '@/lib/exchange';

// Create client with testnet
const client = await ExchangeFactory.getClient('binance', {
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET,
}, {
  testnet: true,
  marketType: 'futures'
});

// Test connection
const result = await client.testConnection();
if (!result.success) {
  throw new Error(`Connection failed: ${result.message}`);
}
```

### Example 2: Place Order

```typescript
// Create market order
const order = await client.createOrder({
  symbol: 'BTCUSDT',
  side: 'buy',
  type: 'market',
  quantity: 0.001,
  leverage: 10,
});

if (order.success) {
  console.log(`Order placed: ${order.order?.id}`);
} else {
  console.error(`Order failed: ${order.error}`);
}
```

### Example 3: Demo Trading (Bitget)

```typescript
// Create Bitget client in demo mode
const client = new BitgetClient(credentials, 'futures', false, true);

// Check demo balance (SUSDT)
const balance = await client.getDemoBalance();
console.log(`Available: ${balance.available} SUSDT`);

// Place order with demo symbol (auto-converted)
const order = await client.createOrder({
  symbol: 'BTCUSDT', // Will be converted to SBTCUSDT
  side: 'buy',
  type: 'limit',
  quantity: 0.01,
  price: 50000,
});
```

### Example 4: Position Management

```typescript
// Get all positions
const positions = await client.getPositions();

for (const pos of positions) {
  console.log(`${pos.symbol}: ${pos.side} ${pos.quantity} @ ${pos.entryPrice}`);
  console.log(`  Unrealized PnL: ${pos.unrealizedPnl}`);
  console.log(`  Leverage: ${pos.leverage}x`);
  
  // Close position
  if (pos.unrealizedPnl > 100) {
    await client.closePosition({
      symbol: pos.symbol,
      market: true,
    });
  }
}
```

### Example 5: Copy Trading Setup

```typescript
import { ProfitSharingEngine, SlippageProtector } from '@/lib/copy-trading';

// Configure profit sharing
const profitEngine = new ProfitSharingEngine({
  shareType: 'TIERED',
  minProfitThreshold: 10,
  autoDistribute: true,
});

// Configure slippage protection
const slippageProtector = new SlippageProtector({
  maxSlippagePercent: 0.5,
  volatilityMultiplier: true,
  rejectOnExceeded: true,
});

// Before copying a trade
const masterEntry = 50000;
const currentPrice = 50010;

const slippage = slippageProtector.checkSlippage(
  masterEntry,
  currentPrice,
  'LONG',
  {
    exchange: 'binance',
    symbol: 'BTCUSDT',
    direction: 'LONG',
    masterTraderId: 'master-123',
    followerId: 'follower-456',
    positionSize: 1000,
    leverage: 10,
    masterTradeTime: new Date(Date.now() - 5000), // 5 seconds ago
    entryType: 'market',
  }
);

if (slippage.acceptable) {
  // Execute copy trade
  console.log(`Slippage OK: ${slippage.slippagePercent.toFixed(4)}%`);
} else {
  console.log(`Trade rejected: ${slippage.reason}`);
}
```

### Example 6: Circuit Breaker Monitoring

```typescript
// Monitor circuit breaker for all exchanges
import { circuitBreakerManager } from '@/lib/exchange';

// Get all stats
const allStats = circuitBreakerManager.getAllStats();

for (const stats of allStats) {
  if (stats.state === 'OPEN') {
    console.warn(`Exchange ${stats.exchangeId} is down!`);
    console.log(`  Failures: ${stats.totalFailures}`);
    console.log(`  Opened at: ${stats.openedAt}`);
  }
}

// Reset a specific exchange
circuitBreakerManager.get('binance').reset();
```

### Example 7: OKX Master Trader

```typescript
import { OKXClient } from '@/lib/exchange';

const client = new OKXClient(credentials, 'futures', false, 'LIVE');

// Check if already a Master Trader
const status = await client.getLeadTraderStatus();

if (status.isLeadTrader) {
  // Get settings
  const settings = await client.getMasterTraderSettings();
  console.log(`Profit share: ${settings.profitSharePercent}%`);
  console.log(`Followers: ${settings.activeFollowers}`);
  
  // Get follower list
  const followers = await client.getMasterFollowers(50);
  for (const follower of followers) {
    console.log(`- ${follower.followerId}: $${follower.totalPnl} PnL`);
  }
}
```

---

## Best Practices

### Do's

1. **Use ExchangeFactory** - Connection pooling reduces overhead
2. **Monitor Circuit Breakers** - Catch exchange issues early
3. **Handle Rate Limits** - Respect exchange-specific limits
4. **Use Demo Mode First** - Test strategies before live trading
5. **Check Slippage** - Protect followers from bad entries
6. **Implement Retries** - Network issues are transient
7. **Log All Operations** - Essential for debugging and audit

### Don'ts

1. **Don't ignore rate limits** - Can result in IP bans
2. **Don't skip demo testing** - Bugs cost real money
3. **Don't hardcode credentials** - Use environment variables
4. **Don't ignore errors** - Log and handle appropriately
5. **Don't disable circuit breaker** - It protects from cascading failures
6. **Don't share API keys** - Each user should have their own

### Error Handling

```typescript
try {
  const order = await client.createOrder(params);
  if (!order.success) {
    // Handle business logic error
    if (order.errorCode === 'INSUFFICIENT_BALANCE') {
      console.log('Not enough balance for this order');
    }
  }
} catch (error) {
  if (error instanceof CircuitBreakerOpenError) {
    // Exchange is down, wait or use different exchange
    console.log(`Exchange ${error.exchangeId} is temporarily unavailable`);
  } else if (error.code === 429) {
    // Rate limited, wait and retry
    await sleep(1000);
    // Retry logic...
  } else {
    // Log unexpected errors
    console.error('Unexpected error:', error);
  }
}
```

---

*Last updated: March 2026*
