# Auto Trading API Documentation

> CITARION Auto Trading System - Cornix-compatible implementation for automated signal execution

## Table of Contents

1. [Overview](#overview)
2. [API Endpoints](#api-endpoints)
   - [POST /api/auto-trading/execute](#post-apiauto-tradingexecute)
   - [GET /api/auto-trading/execute](#get-apiauto-tradingexecute)
   - [POST /api/auto-trading/tp-grace](#post-apiauto-tradingtp-grace)
   - [GET /api/auto-trading/tp-grace](#get-apiauto-tradingtp-grace)
   - [POST /api/auto-trading/first-entry](#post-apiauto-tradingfirst-entry)
   - [GET /api/auto-trading/first-entry](#get-apiauto-tradingfirst-entry)
   - [POST /api/orders/reconcile](#post-apiordersreconcile)
   - [GET /api/orders/reconcile](#get-apiordersreconcile)
3. [Components](#components)
   - [Execution Engine](#execution-engine)
   - [Position Monitor](#position-monitor)
   - [Trailing Stop](#trailing-stop)
   - [TP Grace](#tp-grace)
   - [First Entry as Market](#first-entry-as-market)
   - [Order Fill Tracker](#order-fill-tracker)
4. [Signal Processing](#signal-processing)
5. [Exchange Clients](#exchange-clients)
6. [Usage Examples](#usage-examples)

---

## Overview

The Auto Trading System provides automated execution of trading signals with advanced features for position management, risk control, and profit optimization. It implements Cornix-compatible functionality including:

- **Signal Filtering**: Validate signals against configurable criteria (R:R ratio, SL/TP requirements, symbol filters)
- **First Entry as Market**: Execute entries at market price with cap protection
- **TP Grace**: Retry unfilled TP orders with progressive price adjustments
- **Trailing Stop**: Dynamic stop-loss management with 5 trailing modes
- **Position Monitoring**: Real-time tracking of entry/exit orders
- **Order Reconciliation**: Detect and resolve "ghost orders"

### Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Auto Trading System                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐           │
│  │ Signal Input │───>│ Signal Filter│───>│  Execution   │           │
│  │ (Telegram/   │    │   Service    │    │   Engine     │           │
│  │  TV/Webhook) │    └──────────────┘    └──────────────┘           │
│  └──────────────┘                                  │                  │
│                                                    ▼                  │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    Position Monitor                           │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │   │
│  │  │ Entry Orders│  │  TP Orders  │  │ Trailing Stop / SL  │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                           │                                          │
│                           ▼                                          │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │              Exchange Clients (Binance, Bybit, OKX)           │   │
│  │              Modes: PAPER / TESTNET / DEMO / LIVE            │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## API Endpoints

### POST /api/auto-trading/execute

Execute a signal with all auto-trading features enabled.

**Request Body:**

```typescript
interface ExecuteRequest {
  signalId: string;           // Required: Signal ID from database
  botConfigId: string;        // Required: Bot configuration ID
  currentPrice?: number;      // Optional: Current market price
  enableMetrics?: boolean;    // Optional: Record execution metrics (default: true)
}
```

**Response:**

```typescript
interface ExecuteResponse {
  success: boolean;
  executionResults: {
    signalFilter?: {
      passed: boolean;
      score: number;
    };
    firstEntry?: {
      success: boolean;
      orderPlaced: boolean;
      orderPrice?: number;
    };
    tpGrace?: {
      success: boolean;
      retriesNeeded: number;
    };
    trailingStop?: {
      success: boolean;
      newSL?: number;
    };
  };
  executionTime?: number;
  signal?: {
    id: string;
    symbol: string;
    direction: string;
  };
  error?: string;
}
```

**Example:**

```bash
curl -X POST https://api.citarion.io/api/auto-trading/execute \
  -H "Content-Type: application/json" \
  -d '{
    "signalId": "sig_123456",
    "botConfigId": "bot_789",
    "currentPrice": 42500.50,
    "enableMetrics": true
  }'
```

**Response Example:**

```json
{
  "success": true,
  "executionResults": {
    "signalFilter": {
      "passed": true,
      "score": 85
    },
    "firstEntry": {
      "success": true,
      "orderPlaced": true,
      "orderPrice": 42501.00
    },
    "tpGrace": {
      "success": true,
      "retriesNeeded": 0
    },
    "trailingStop": {
      "success": true,
      "newSL": 42000.00
    }
  },
  "executionTime": 156,
  "signal": {
    "id": "sig_123456",
    "symbol": "BTCUSDT",
    "direction": "LONG"
  }
}
```

---

### GET /api/auto-trading/execute

Get execution statistics and metrics.

**Query Parameters:**

| Parameter | Type   | Default | Description                          |
|-----------|--------|---------|--------------------------------------|
| feature   | string | all     | Filter by feature name               |
| days      | number | 7       | Number of days to include            |

**Response:**

```typescript
interface StatisticsResponse {
  success: boolean;
  statistics: {
    totalExecutions: number;
    successfulExecutions: number;
    successRate: number;
    avgExecutionTime: number;
    featureStats: Record<string, {
      count: number;
      success: number;
      avgTime: number;
    }>;
  };
  recentMetrics: Array<{
    id: string;
    featureName: string;
    command: string;
    success: boolean;
    executionTime: number;
    createdAt: Date;
  }>;
}
```

**Example:**

```bash
curl -X GET "https://api.citarion.io/api/auto-trading/execute?feature=signal_execute&days=30"
```

---

### POST /api/auto-trading/tp-grace

Process TP Grace for a position - handles retry of unfilled TP orders.

**Request Body:**

```typescript
interface TPGraceRequest {
  positionId: string;                              // Required
  config?: Partial<TPGraceConfig>;                 // Optional: Override config
  tpTargets?: Array<{ price: number; amount: number }>; // Optional: TP targets
  direction?: "LONG" | "SHORT";                    // Optional: Override direction
  existingStateId?: string;                        // Optional: Resume from state
}
```

**TPGraceConfig:**

```typescript
interface TPGraceConfig {
  enabled: boolean;
  capPercent: number;      // 0.01 - 2% adjustment per retry
  maxRetries: number;      // 1 - 10 retry attempts
  retryInterval?: number;  // Milliseconds between retries (default: 5000)
}
```

**Response:**

```typescript
interface TPGraceResponse {
  success: boolean;
  results: Array<{
    success: boolean;
    retryPlaced: boolean;
    retryPrice?: number;
    retryAmount?: number;
    targetId?: string;
    error?: string;
  }>;
  state?: TPGraceState;
}
```

**Example:**

```bash
curl -X POST https://api.citarion.io/api/auto-trading/tp-grace \
  -H "Content-Type: application/json" \
  -d '{
    "positionId": "pos_abc123",
    "config": {
      "enabled": true,
      "capPercent": 0.5,
      "maxRetries": 3
    },
    "tpTargets": [
      { "price": 43000, "amount": 50 },
      { "price": 43500, "amount": 50 }
    ],
    "direction": "LONG"
  }'
```

---

### GET /api/auto-trading/tp-grace

Get TP Grace state for a position or configuration from bot config.

**Query Parameters:**

| Parameter   | Type   | Description                          |
|-------------|--------|--------------------------------------|
| positionId  | string | Get state for specific position      |
| botConfigId | string | Get config from bot configuration    |

**Example:**

```bash
curl -X GET "https://api.citarion.io/api/auto-trading/tp-grace?positionId=pos_abc123"
```

---

### POST /api/auto-trading/first-entry

Execute First Entry as Market for a signal.

**Request Body:**

```typescript
interface FirstEntryRequest {
  signalId: string;                      // Required
  config?: Partial<FirstEntryConfig>;    // Optional: Override config
  currentPrice?: number;                 // Optional: Current market price
}
```

**FirstEntryConfig:**

```typescript
interface FirstEntryConfig {
  enabled: boolean;
  mode: "IMMEDIATE" | "ENTRY_PRICE_REACHED";
  maxPriceCap: number;               // 0.05 - 20% max price deviation
  onlyIfNotDefinedByGroup: boolean;  // Skip if defined by signal group
}
```

**Response:**

```typescript
interface FirstEntryResponse {
  success: boolean;
  state?: FirstEntryState;
  orderPlaced: boolean;
  orderPrice?: number;
  orderAmount?: number;
  error?: string;
}
```

**Modes:**

| Mode                   | Description                                          |
|------------------------|------------------------------------------------------|
| `IMMEDIATE`            | Execute at current market price with cap protection  |
| `ENTRY_PRICE_REACHED`  | Wait for signal entry price, then execute with cap   |

**Example:**

```bash
curl -X POST https://api.citarion.io/api/auto-trading/first-entry \
  -H "Content-Type: application/json" \
  -d '{
    "signalId": "sig_123456",
    "config": {
      "enabled": true,
      "mode": "IMMEDIATE",
      "maxPriceCap": 1.0
    },
    "currentPrice": 42500.50
  }'
```

---

### GET /api/auto-trading/first-entry

Get First Entry as Market configuration for a bot.

**Query Parameters:**

| Parameter   | Type   | Description              |
|-------------|--------|--------------------------|
| botConfigId | string | Required: Bot config ID  |

**Example:**

```bash
curl -X GET "https://api.citarion.io/api/auto-trading/first-entry?botConfigId=bot_789"
```

---

### POST /api/orders/reconcile

Trigger order reconciliation to detect "ghost orders" (orders on exchange but not in local database).

**Authentication Required:** Yes (API Key or Session)

**Request Body:**

```typescript
interface ReconcileRequest {
  accountId?: string;                      // Optional: Specific account
  config?: Partial<ReconciliationConfig>;  // Optional: Override config
  startScheduler?: boolean;                // Optional: Start periodic scheduler
  stopScheduler?: boolean;                 // Optional: Stop periodic scheduler
}
```

**Response:**

```typescript
interface ReconcileResponse {
  success: boolean;
  result?: ReconciliationResult | BulkReconciliationResult;
  authType?: string;
}
```

**Example:**

```bash
curl -X POST https://api.citarion.io/api/orders/reconcile \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "accountId": "acc_xyz",
    "config": {
      "checkOpenOrders": true,
      "checkPositions": true,
      "cancelOrphanedOrders": false
    }
  }'
```

---

### GET /api/orders/reconcile

Get reconciliation scheduler status and recent logs.

**Query Parameters:**

| Parameter  | Type   | Default | Description              |
|------------|--------|---------|--------------------------|
| accountId  | string | -       | Filter by account        |
| limit      | number | 10      | Number of logs to return |

**Example:**

```bash
curl -X GET "https://api.citarion.io/api/orders/reconcile?limit=20" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## Components

### Execution Engine

The Execution Engine handles order creation, routing, and execution across multiple exchanges.

**Location:** `src/lib/auto-trading/execution-engine.ts`

**Key Features:**
- Smart order routing
- Slippage protection (0.5% max default)
- Multi-exchange support (Binance, Bybit, OKX, etc.)
- Position size calculation based on risk
- Multi-entry support with weighted DCA

**Core Class:**

```typescript
class ExecutionEngine {
  // Execute single trade from signal
  async executeTrade(params: TradeEntryInput): Promise<ExecutionResult>;
  
  // Execute multi-entry DCA orders
  async executeMultiEntryOrders(
    params: TradeEntryInput & { entryWeights: number[] }
  ): Promise<ExecutionResult[]>;
  
  // Close position
  async closePosition(
    accountId: string,
    symbol: string,
    userId: string
  ): Promise<ExecutionResult>;
  
  // Cancel order
  async cancelOrder(
    accountId: string,
    symbol: string,
    orderId: string,
    userId: string
  ): Promise<ExecutionResult>;
}
```

**Execution Flow:**

```
1. Validate Signal ────────────────────────────────────────►
2. Get Exchange Client ────────────────────────────────────►
3. Test Connection ────────────────────────────────────────►
4. Get Current Price ──────────────────────────────────────►
5. Calculate Position Size ────────────────────────────────►
6. Set Leverage (if > 1x) ─────────────────────────────────►
7. Execute Entry Order ────────────────────────────────────►
8. Create Position Record ─────────────────────────────────►
9. Set TP/SL Orders ───────────────────────────────────────►
10. Log Execution ─────────────────────────────────────────►
```

---

### Position Monitor

Real-time position monitoring for tracking entry and exit order status.

**Location:** `src/lib/auto-trading/position-monitor.ts`

**State Interface:**

```typescript
interface PositionMonitorState {
  id: string;
  positionId: string;
  status: PositionStatus;
  
  // Entry tracking
  entryOrders: EntryOrderState[];
  totalEntryAmount: number;
  filledEntryAmount: number;
  avgEntryPrice: number;
  
  // Exit tracking
  tpOrders: TPOrderState[];
  slOrder: SLOrderState | null;
  
  // PnL
  unrealizedPnL: number;
  realizedPnL: number;
  
  // Risk metrics
  currentLeverage: number;
  liquidationPrice: number;
  marginUsed: number;
}
```

**Position Status:**

| Status      | Description                              |
|-------------|------------------------------------------|
| PENDING     | Position created, awaiting entry orders  |
| OPENING     | Entry orders placed, waiting for fill    |
| ACTIVE      | Position fully opened                    |
| CLOSING     | Exit orders in progress                  |
| CLOSED      | Position fully closed                    |
| LIQUIDATED  | Position liquidated by exchange          |

**Health Calculation:**

```typescript
function calculatePositionHealth(
  state: PositionMonitorState,
  currentPrice: number,
  direction: "LONG" | "SHORT"
): {
  health: "HEALTHY" | "WARNING" | "CRITICAL";
  metrics: {
    pnlPercent: number;
    distanceToSL: number;
    distanceToLiquidation: number;
    fillRatio: number;
  };
}
```

---

### Trailing Stop

Cornix-compatible trailing stop with 5 trailing types.

**Location:** `src/lib/auto-trading/trailing-stop.ts`

**Trailing Types:**

| Type                    | Description                                       |
|-------------------------|---------------------------------------------------|
| BREAKEVEN               | Move SL to entry price after trigger              |
| MOVING_TARGET           | SL follows at 1 TP distance from last TP          |
| MOVING_2_TARGET         | SL follows at 2 TP distance from last TP          |
| PERCENT_BELOW_TRIGGERS  | Fixed % below trigger price                       |
| PERCENT_BELOW_HIGHEST   | Dynamic % below highest price seen                |

**Configuration:**

```typescript
interface TrailingStopConfig {
  enabled: boolean;
  type: TrailingType;
  triggerType: "TARGET_REACHED" | "PERCENT_ABOVE_ENTRY";
  triggerValue?: number;       // Target # or percentage
  trailingPercent?: number;    // For PERCENT_BELOW_* types
  onlyIfNotDefinedByGroup?: boolean;
}
```

**State:**

```typescript
interface TrailingStopState {
  id: string;
  positionId: string;
  type: TrailingType;
  status: "INACTIVE" | "TRIGGERED" | "ACTIVE" | "STOPPED";
  originalSL: number;
  currentSL: number;
  avgEntryPrice: number;
  highestPrice: number;
  lowestPrice: number;
  triggerTargetIndex: number;
  lastTPPrice: number | null;
  last2TPPrice: number | null;
  trailingDistance: number;
  activatedAt: Date | null;
}
```

**Presets:**

```typescript
const TRAILING_PRESETS = {
  conservativeBreakeven: {
    type: "BREAKEVEN",
    triggerType: "TARGET_REACHED",
    triggerValue: 1
  },
  moderateMovingTarget: {
    type: "MOVING_TARGET",
    triggerType: "TARGET_REACHED",
    triggerValue: 1
  },
  aggressivePercent: {
    type: "PERCENT_BELOW_HIGHEST",
    triggerType: "PERCENT_ABOVE_ENTRY",
    triggerValue: 5,
    trailingPercent: 2
  },
  scalping: {
    type: "PERCENT_BELOW_TRIGGERS",
    triggerType: "PERCENT_ABOVE_ENTRY",
    triggerValue: 2,
    trailingPercent: 1
  },
  swing: {
    type: "MOVING_2_TARGET",
    triggerType: "TARGET_REACHED",
    triggerValue: 2
  }
};
```

---

### TP Grace

Take-Profit Grace service for retrying unfilled TP orders with progressive price adjustments.

**Location:** `src/lib/auto-trading/tp-grace.ts`

**How It Works:**

```
TP Order at $43,000 fails to fill
     │
     ▼
Retry 1: $43,000 - (0.5% × 1) = $42,785
     │
     ▼ (still not filled)
Retry 2: $43,000 - (0.5% × 2) = $42,570
     │
     ▼ (still not filled)
Retry 3: $43,000 - (0.5% × 3) = $42,355
     │
     ▼
Max retries reached - cancel order
```

**Configuration:**

```typescript
interface TPGraceConfig {
  enabled: boolean;
  capPercent: number;      // 0.01 - 2% per retry
  maxRetries: number;      // 1 - 10 attempts
  retryInterval?: number;  // ms between retries (default: 5000)
}
```

**State:**

```typescript
interface TPGraceState {
  id: string;
  positionId: string;
  tpTargets: TPTarget[];
  totalRetries: number;
  maxRetries: number;
  capPercent: number;
  direction: "LONG" | "SHORT";
  status: "ACTIVE" | "COMPLETED" | "CANCELLED";
}
```

**Price Adjustment Logic:**

- **LONG**: Lowers TP price (sell lower = better chance to fill)
- **SHORT**: Raises TP price (buy higher = better chance to fill)

```typescript
function calculateGracePrice(
  originalPrice: number,
  capPercent: number,
  direction: "LONG" | "SHORT",
  retryCount: number
): number {
  const adjustment = (capPercent / 100) * retryCount;
  
  if (direction === "LONG") {
    return originalPrice * (1 - adjustment);
  } else {
    return originalPrice * (1 + adjustment);
  }
}
```

---

### First Entry as Market

Execute first entry at market price with cap protection.

**Location:** `src/lib/auto-trading/first-entry-market.ts`

**Modes:**

| Mode                   | Behavior                                          |
|------------------------|---------------------------------------------------|
| IMMEDIATE              | Execute at current market price if within cap     |
| ENTRY_PRICE_REACHED    | Wait for signal entry price, then execute         |

**Cap Protection:**

```typescript
function calculateCappedPrice(
  entryPrice: number,
  maxCap: number,
  direction: "LONG" | "SHORT"
): number {
  if (direction === "LONG") {
    return entryPrice * (1 + maxCap / 100);  // Max buy price
  } else {
    return entryPrice * (1 - maxCap / 100);  // Min sell price
  }
}
```

**Iterative Price Expansion:**

For ENTRY_PRICE_REACHED mode, the system iteratively expands the target price:

- Step: 0.1% increments
- Max iterations: 200
- Stops when cap is exceeded

**TP Protection:**

```typescript
function isTPBeforeEntry(
  entryPrice: number,
  tpPrice: number,
  direction: "LONG" | "SHORT"
): boolean {
  // Prevents entering above TP for LONG, below TP for SHORT
  if (direction === "LONG") {
    return tpPrice < entryPrice;
  } else {
    return tpPrice > entryPrice;
  }
}
```

---

### Order Fill Tracker

Track order fill status and trigger appropriate actions.

**Location:** `src/lib/auto-trading/order-fill-tracker.ts`

**Order Types:**

| Type        | Description                    |
|-------------|--------------------------------|
| ENTRY       | Position entry order           |
| TP          | Take profit order              |
| SL          | Stop loss order                |
| TRAILING_SL | Trailing stop loss order       |

**Order Status:**

| Status             | Description                      |
|--------------------|----------------------------------|
| PENDING            | Order created, not submitted     |
| OPEN               | Order submitted to exchange      |
| PARTIALLY_FILLED   | Partial fill received            |
| FILLED             | Order completely filled          |
| CANCELLED          | Order cancelled                  |
| EXPIRED            | Order expired                    |
| REJECTED           | Order rejected by exchange       |

**State:**

```typescript
interface OrderFillState {
  id: string;
  exchangeOrderId: string;
  clientOrderId: string;
  positionId: string;
  type: OrderType;
  status: OrderStatus;
  symbol: string;
  side: "BUY" | "SELL";
  orderType: "LIMIT" | "MARKET" | "STOP_LIMIT";
  price: number;
  amount: number;
  filledAmount: number;
  avgFillPrice: number;
  remainingAmount: number;
  fillPercentage: number;
  retryCount: number;
  maxRetries: number;
}
```

**Fill Statistics:**

```typescript
function calculateFillStats(orders: OrderFillState[]): {
  total: number;
  pending: number;
  partial: number;
  filled: number;
  cancelled: number;
  totalAmount: number;
  totalFilled: number;
  avgFillPercentage: number;
}
```

---

## Signal Processing

### Signal Filter

Validate and score signals before execution.

**Location:** `src/lib/auto-trading/signal-filter.ts`

**Configuration:**

```typescript
interface SignalFilterConfig {
  // R:R Filters
  minRiskRewardRatio?: number;
  maxRiskRewardRatio?: number;
  
  // SL Filters
  requireSL: boolean;
  maxSLPercent?: number;
  minSLPercent?: number;
  
  // TP Filters
  requireTP: boolean;
  maxTPCount?: number;
  minTPCount?: number;
  
  // Symbol Filters
  allowedSymbols?: string[];
  blockedSymbols?: string[];
  
  // Direction Filter
  directionFilter?: "LONG" | "SHORT" | "BOTH";
  
  // Entry Filters
  maxEntryDistance?: number;
  
  // Volume/Price Filters
  minSymbolPrice?: number;
  maxSymbolPrice?: number;
  min24hVolume?: number;
  
  // Timing Filters
  maxSignalAge?: number;  // Minutes
  
  // Leverage Filters
  maxLeverage?: number;
  minLeverage?: number;
}
```

**Filter Result:**

```typescript
interface SignalFilterResult {
  passed: boolean;
  signal: Signal;
  filters: {
    name: string;
    passed: boolean;
    reason?: string;
  }[];
  score: number;  // 0-100
}
```

**R:R Calculation:**

```typescript
function calculateRR(
  entryPrice: number,
  slPrice: number,
  tpPrice: number,
  direction: "LONG" | "SHORT"
): number {
  const risk = direction === "LONG"
    ? Math.abs(entryPrice - slPrice) / entryPrice
    : Math.abs(slPrice - entryPrice) / entryPrice;
  
  const reward = direction === "LONG"
    ? Math.abs(tpPrice - entryPrice) / entryPrice
    : Math.abs(entryPrice - tpPrice) / entryPrice;
  
  return risk === 0 ? 0 : reward / risk;
}
```

**Signal Scoring:**

| Factor              | Points |
|---------------------|--------|
| Base score          | 50     |
| R:R >= 3            | +20    |
| R:R >= 2            | +15    |
| R:R >= 1.5          | +10    |
| Has Stop Loss       | +10    |
| 3+ Take Profits     | +10    |
| 2 Take Profits      | +5     |

---

## Exchange Clients

### Supported Exchanges

| Exchange     | Live | Testnet | Demo | Futures | Spot |
|--------------|------|---------|------|---------|------|
| Binance      | ✅   | ✅      | ✅   | ✅      | ✅   |
| Bybit        | ✅   | ✅      | ✅   | ✅      | ✅   |
| OKX          | ✅   | ✅      | ✅   | ✅      | ✅   |
| Bitget       | ✅   | ✅      | ✅   | ✅      | ✅   |
| BingX        | ✅   | -       | -    | ✅      | ✅   |

**Location:** `src/lib/auto-trading/exchange-clients.ts`

### Trading Modes

| Mode     | Description                           |
|----------|---------------------------------------|
| PAPER    | Simulated trading, no real orders     |
| TESTNET  | Exchange testnet with test funds      |
| DEMO     | Exchange demo mode (OKX)              |
| LIVE     | Real trading with real funds          |

### Client Factory

```typescript
class ExchangeClientFactory {
  static createClient(
    config: ExchangeOrderConfig
  ): BinanceClient | BybitClient | OkxClient | null {
    switch (config.exchangeId) {
      case 'binance':
        return new BinanceClient(config.mode, config.marketType, config.credentials);
      case 'bybit':
        return new BybitClient(config.mode, config.credentials);
      case 'okx':
        return new OkxClient(config.mode, config.credentials);
      default:
        throw new Error(`Unsupported exchange: ${config.exchangeId}`);
    }
  }
}
```

### Common Interface

```typescript
interface ExchangeClientInterface {
  placeOrder(params: OrderParams): Promise<ExchangeOrderResult>;
  cancelOrder(symbol: string, orderId: string): Promise<ExchangeOrderResult>;
  setLeverage(symbol: string, leverage: number): Promise<{ success: boolean; leverage: number }>;
  getPositions(): Promise<ExchangePosition[]>;
  getBalances(): Promise<ExchangeBalance[]>;
  getTicker(symbol: string): Promise<TickerInfo>;
}
```

---

## Usage Examples

### 1. Execute Signal with All Features

```typescript
import { executionEngine } from '@/lib/auto-trading/execution-engine';

const result = await executionEngine.executeTrade({
  userId: 'user_123',
  accountId: 'acc_abc',
  signal: {
    symbol: 'BTCUSDT',
    direction: 'LONG',
    entryPrices: [42500],
    takeProfits: [
      { price: 43000, percentage: 50 },
      { price: 43500, percentage: 50 }
    ],
    stopLoss: 42000,
    leverage: 10
  }
});

console.log(result);
// {
//   success: true,
//   tradeId: 'pos_xyz',
//   symbol: 'BTCUSDT',
//   side: 'LONG',
//   quantity: 0.1,
//   entryPrice: 42501.50
// }
```

### 2. Setup Trailing Stop

```typescript
import { 
  createTrailingStopState, 
  processTrailingStop,
  TRAILING_PRESETS 
} from '@/lib/auto-trading/trailing-stop';

// Using preset
const config = TRAILING_PRESETS.moderateMovingTarget;

// Create state
const state = createTrailingStopState(
  'pos_xyz',
  config,
  42500,  // avg entry price
  42000,  // initial SL
  'LONG'
);

// Process on price update
const result = processTrailingStop(
  state,
  config,
  43200,     // current price
  [43000, 43500],  // TP targets
  1,         // filled TP count
  'LONG'
);

if (result.shouldUpdateSL) {
  console.log(`New SL: ${result.newSL}`);
}
```

### 3. Process TP Grace

```typescript
import { executeTPGrace, createTPGraceState } from '@/lib/auto-trading/tp-grace';

const results = await executeTPGrace(
  'pos_xyz',
  [
    { price: 43000, amount: 50 },
    { price: 43500, amount: 50 }
  ],
  {
    enabled: true,
    capPercent: 0.5,
    maxRetries: 3
  },
  'LONG'
);

for (const result of results) {
  if (result.retryPlaced) {
    console.log(`Retry order at ${result.retryPrice} for ${result.retryAmount}`);
  }
}
```

### 4. First Entry as Market

```typescript
import { executeFirstEntryAsMarket } from '@/lib/auto-trading/first-entry-market';

const signal = {
  id: 'sig_123',
  symbol: 'BTCUSDT',
  direction: 'LONG',
  entryPrice: 42500,
  takeProfit: 43000
};

const result = await executeFirstEntryAsMarket(
  signal,
  {
    enabled: true,
    mode: 'IMMEDIATE',
    maxPriceCap: 1.0
  },
  42501.50  // current market price
);

if (result.orderPlaced) {
  console.log(`Order placed at ${result.orderPrice}`);
}
```

### 5. Filter Signal

```typescript
import { filterSignal, scoreSignal } from '@/lib/auto-trading/signal-filter';

const signal = {
  symbol: 'BTCUSDT',
  direction: 'LONG',
  entryPrice: 42500,
  stopLoss: 42000,
  takeProfit: 43500,
  leverage: 10
};

const config = {
  requireSL: true,
  requireTP: true,
  minRiskRewardRatio: 2,
  maxLeverage: 20,
  allowedSymbols: ['BTCUSDT', 'ETHUSDT']
};

const result = filterSignal(signal, config, 42500);

if (result.passed) {
  console.log(`Signal passed with score ${result.score}`);
} else {
  console.log('Signal filtered out:');
  result.filters
    .filter(f => !f.passed)
    .forEach(f => console.log(`  - ${f.name}: ${f.reason}`));
}
```

### 6. Monitor Position Health

```typescript
import { 
  createPositionMonitorState, 
  calculatePositionHealth,
  updateUnrealizedPnL 
} from '@/lib/auto-trading/position-monitor';

// Create monitor state
let state = createPositionMonitorState(
  'pos_xyz',
  [{ id: 'entry_1', price: 42500, amount: 0.1, filledAmount: 0.1, status: 'FILLED', type: 'MARKET' }],
  [{ id: 'tp_1', price: 43000, amount: 0.05, filledAmount: 0, retryCount: 0, status: 'PENDING' }],
  { id: 'sl_1', price: 42000, amount: 0.1, trailing: true, status: 'PENDING' }
);

// Update PnL
state = updateUnrealizedPnL(state, 42800, 'LONG');

// Check health
const health = calculatePositionHealth(state, 42800, 'LONG');

console.log(`Position health: ${health.health}`);
console.log(`PnL: ${health.metrics.pnlPercent.toFixed(2)}%`);
console.log(`Distance to SL: ${health.metrics.distanceToSL.toFixed(2)}%`);
```

### 7. Order Reconciliation

```typescript
// Trigger manual reconciliation
const response = await fetch('/api/orders/reconcile', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    accountId: 'acc_abc',
    config: {
      checkOpenOrders: true,
      checkPositions: true,
      cancelOrphanedOrders: false
    }
  })
});

const result = await response.json();

if (result.success) {
  console.log(`Orphaned orders: ${result.result.summary.totalOrphanedOrders}`);
  console.log(`Missing orders: ${result.result.summary.totalMissingOrders}`);
}
```

---

## Error Handling

All API endpoints follow consistent error response format:

```typescript
interface ErrorResponse {
  success: false;
  error: string;
  errorCode?: string;
}
```

**Common Error Codes:**

| Code                | Description                          |
|---------------------|--------------------------------------|
| INVALID_SIGNAL      | Signal validation failed             |
| CLIENT_INIT_FAILED  | Failed to initialize exchange client |
| CONNECTION_FAILED   | Exchange connection test failed      |
| INVALID_SIZE        | Position size calculation error      |
| ACCOUNT_NOT_FOUND   | Account not found in database        |
| POSITION_NOT_FOUND  | Position not found                   |
| EXECUTION_ERROR     | General execution error              |

---

## Rate Limits

| Endpoint                     | Limit          |
|------------------------------|----------------|
| POST /auto-trading/execute   | 60/minute      |
| POST /auto-trading/tp-grace  | 120/minute     |
| POST /auto-trading/first-entry | 120/minute   |
| POST /orders/reconcile       | 10/minute      |

---

## Related Documentation

- [Signal Parsing](../trading/CORNIX_SIGNAL_FORMAT.md)
- [Position Escort](../trading/POSITION_ESCORT.md)
- [Exchange Integration](../exchanges/README.md)
- [Risk Management](../risk/RISK_MANAGEMENT.md)

---

*Last updated: March 2026*
