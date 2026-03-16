# Signals API Complete Documentation

> **Version:** 1.0.0  
> **Last Updated:** March 2026  
> **Status:** Production Ready

---

## Table of Contents

1. [Overview](#overview)
2. [Endpoints](#endpoints)
   - [/api/signals](#api-signals---crud--aggregation)
   - [/api/signal](#api-signal---single-signal-management)
   - [/api/signals/processed](#api-signalsprocessed---deduplication-tracking)
   - [/api/chat/parse-signal](#api-chatparse-signal---signal-parsing)
   - [/api/webhook/tradingview](#api-webhooktradingview---tradingview-webhook)
   - [Cornix Endpoints](#cornix-endpoints)
3. [Signal Parsing](#signal-parsing-cornix-format)
4. [Signal Filtering](#signal-filtering)
5. [Signal Deduplication](#signal-deduplication)
6. [Stale Signal Detection](#stale-signal-detection)
7. [Usage Examples](#usage-examples)
8. [Error Handling](#error-handling)

---

## Overview

The Signals API provides comprehensive trading signal management for CITARION, supporting:

- **Signal Parsing**: Cornix-compatible parsing with multi-format support
- **Signal CRUD Operations**: Create, read, update, delete signals
- **Signal Deduplication**: Double-entry protection to prevent duplicate positions
- **Stale Signal Detection**: TTL-based signal expiration
- **Webhook Integration**: TradingView alert reception with HMAC validation
- **Cornix Integration**: Full Cornix API compatibility

### Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SIGNALS API ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────────────┐  │
│  │  Signal      │    │  Signal      │    │  TradingView Webhook      │  │
│  │  Sources     │───▶│  Parser      │───▶│  (HMAC-SHA256 Validation) │  │
│  │              │    │  (Cornix)     │    │                           │  │
│  └──────────────┘    └──────────────┘    └──────────────────────────┘  │
│         │                   │                         │                  │
│         │                   ▼                         ▼                  │
│         │          ┌──────────────┐          ┌──────────────┐           │
│         │          │  Stale       │          │  Rate        │           │
│         │          │  Signal      │          │  Limiting    │           │
│         │          │  Detector    │          │  (10/min/IP) │           │
│         │          └──────────────┘          └──────────────┘           │
│         │                   │                                           │
│         ▼                   ▼                                           │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    SIGNAL DEDUPLICATOR                              │   │
│  │  - SHA-256 Hash Generation                                         │   │
│  │  - 24-hour TTL Cache                                               │   │
│  │  - Fuzzy Price Matching (0.1% window)                              │   │
│  │  - Database Persistence                                            │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                          │
│                              ▼                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    SIGNAL DATABASE (Prisma)                         │   │
│  │  - Signal (main storage)                                           │   │
│  │  - ProcessedSignalRecord (deduplication)                           │   │
│  │  - SignalIdCounter (auto-increment ID)                             │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                          │
│                              ▼                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    AUTO-TRADING EXECUTION                           │   │
│  │  - Position Creation                                               │   │
│  │  - TP/SL Order Placement                                           │   │
│  │  - Notification Dispatch                                           │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Endpoints

### /api/signals (CRUD, Aggregation)

Signal aggregation endpoint for LOGOS integration and general signal management.

#### GET /api/signals

Get aggregated signals from LOGOS.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `bot` | string | - | Filter by bot code (optional) |
| `limit` | number | 50 | Maximum signals to return |

**Response:**
```typescript
interface SignalsResponse {
  signals: Signal[];
  total: number;
}

interface Signal {
  id: string;           // sig_<timestamp>_<random>
  timestamp: number;    // Unix timestamp
  source: string;       // Bot code (e.g., "ORION", "VISION")
  // ... additional signal data
}
```

**Example:**
```bash
curl "https://api.citarion.com/api/signals?bot=ORION&limit=10"
```

#### POST /api/signals

Publish a signal (internal use for LOGOS integration).

**Request Body:**
```typescript
interface SignalPublishRequest {
  source: string;        // Bot code
  symbol: string;        // Trading pair
  direction: "LONG" | "SHORT";
  entryPrice: number;
  takeProfit?: number;
  stopLoss?: number;
  leverage?: number;
  confidence?: number;
  // ... additional fields
}
```

**Response:**
```typescript
interface SignalPublishResponse {
  success: boolean;
  signal: Signal;
}
```

---

### /api/signal (Single Signal Management)

Full CRUD operations for individual signal management with database persistence.

#### GET /api/signal

Query signals from database.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `action` | string | - | Special action: `current_id`, `active` |
| `symbol` | string | - | Filter by symbol |
| `direction` | string | - | Filter by direction (LONG/SHORT) |
| `marketType` | string | - | Filter by market type (SPOT/FUTURES) |
| `status` | string | - | Filter by status (PENDING/ACTIVE/CLOSED) |
| `limit` | number | 50 | Maximum results |

**Response for `action=current_id`:**
```typescript
{
  success: true;
  currentId: number;  // Current signal ID counter value
}
```

**Response for `action=active`:**
```typescript
interface ActiveSignalsResponse {
  success: true;
  count: number;
  signals: {
    signalId: number;
    symbol: string;
    direction: "LONG" | "SHORT";
    marketType: "SPOT" | "FUTURES";
    status: "PENDING" | "ACTIVE";
    entryPrices: number[];
    takeProfits: { price: number; percentage: number }[];
    stopLoss?: number;
    leverage?: number;
    createdAt: Date;
  }[];
}
```

**Example:**
```bash
# Get current signal ID
curl "https://api.citarion.com/api/signal?action=current_id"

# Get active signals for BTCUSDT
curl "https://api.citarion.com/api/signal?action=active&symbol=BTCUSDT"
```

#### POST /api/signal

Create a new signal from text or execute management command.

**Request Body:**
```typescript
interface SignalCreateRequest {
  text: string;   // Signal text or management command
  source?: string; // Source identifier (default: "API")
}
```

**Management Commands:**
| Command | Example | Description |
|---------|---------|-------------|
| Reset ID | `id reset` / `сброс id` | Reset signal ID counter |
| Clear Base | `clear base` / `очистить базу` | Delete all signals |
| Market Entry | `BTCUSDT enter` / `BTCUSDT вход` | Execute market entry |
| Update TP | `BTCUSDT long tp2 100` | Update TP2 price |
| Update SL | `BTCUSDT long sl 95` | Update stop loss |
| Close Signal | `BTCUSDT long close` | Close active signal |

**Response:**
```typescript
interface SignalCreateResponse {
  success: boolean;
  signalId?: number;
  signal?: ParsedSignal;
  message?: string;
  error?: string;
}
```

**Signal Parsing Response:**
```typescript
interface ParsedSignal {
  id: number;
  symbol: string;           // BTCUSDT
  baseAsset: string;        // BTC
  quoteAsset: string;       // USDT
  direction: "LONG" | "SHORT";
  action: "BUY" | "SELL" | "CLOSE" | "UPDATE_TP" | "UPDATE_SL" | "MARKET_ENTRY";
  marketType: "SPOT" | "FUTURES";
  entryPrices: number[];
  entryZone?: { min: number; max: number };
  entryWeights?: number[];   // DCA weights
  stopLoss?: number;
  takeProfits: { price: number; percentage: number }[];
  leverage: number;
  leverageType: "ISOLATED" | "CROSS";
  signalType: "REGULAR" | "BREAKOUT";
  trailingConfig?: TrailingConfig;
  exchanges: string[];
  confidence: number;        // 0.0 - 1.0
  rawText: string;
}
```

#### PUT /api/signal

Update an existing signal.

**Request Body:**
```typescript
interface SignalUpdateRequest {
  signalId: number;
  takeProfits?: { price: number; percentage: number }[];
  stopLoss?: number;
  status?: "PENDING" | "ACTIVE" | "CLOSED";
}
```

#### DELETE /api/signal

Delete signals.

**Query Parameters:**
| Parameter | Description |
|-----------|-------------|
| `action=clear_all` | Delete all signals |
| `signalId=<id>` | Delete specific signal |

---

### /api/signals/processed (Deduplication Tracking)

View and manage processed signal records for deduplication.

#### GET /api/signals/processed

Get recent processed signals for debugging.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | number | 50 | Max signals (max: 100) |
| `symbol` | string | - | Filter by symbol |
| `direction` | string | - | Filter by direction |
| `status` | string | - | Filter by status |

**Response:**
```typescript
interface ProcessedSignalsResponse {
  success: true;
  data: {
    signals: ProcessedSignal[];
    stats: {
      cacheSize: number;
      initialized: boolean;
      config: {
        defaultTTL: number;
        priceSlidingWindow: number;
        enableFuzzyMatching: boolean;
      };
    };
    filters: {
      symbol?: string;
      direction?: string;
      status?: string;
      limit: number;
    };
  };
}

interface ProcessedSignal {
  id: string;
  hash: string;             // SHA-256 fingerprint
  symbol: string;
  direction: "LONG" | "SHORT";
  entryPrices: number[];
  status: "EXECUTED" | "IGNORED" | "FAILED" | "DUPLICATE";
  positionId?: string;
  tradeId?: string;
  signalId?: number;
  processedAt: Date;
  expiresAt: Date;
  signalSource?: string;
  rawTextHash?: string;
}
```

#### DELETE /api/signals/processed

Clear signal cache for testing.

**Query Parameters:**
| Parameter | Description |
|-----------|-------------|
| `all=true` | Clear all expired entries |
| `hash=<hash>` | Delete specific signal by hash |

#### POST /api/signals/processed

Check if a signal would be considered a duplicate.

**Request Body:**
```typescript
interface DuplicateCheckRequest {
  signal: {
    symbol: string;
    direction: "LONG" | "SHORT";
    entryPrices: number[];
    stopLoss?: number;
    takeProfits?: { price: number; percentage: number }[];
    marketType?: "SPOT" | "FUTURES";
    rawText?: string;
  };
}
```

**Response:**
```typescript
interface DuplicateCheckResponse {
  success: true;
  data: {
    isDuplicate: boolean;
    reason?: "EXACT_MATCH" | "FUZZY_MATCH" | "SAME_RAW_TEXT" | "TIME_WINDOW";
    originalSignal?: ProcessedSignal;
    similarSignals: ProcessedSignal[];
    signalHash: string;
  };
}
```

---

### /api/chat/parse-signal (Signal Parsing)

Chat-based signal parsing with Cornix format support and management commands.

#### GET /api/chat/parse-signal

Get API documentation and templates.

**Response:**
```typescript
interface ParseSignalDocs {
  success: true;
  message: "Signal Parser API - Cornix Compatible";
  documentation: "/docs/CORNIX_SIGNAL_FORMAT.md";
  keyRule: {
    spot: "Signals with 'spot' word → SPOT market";
    futures: "Signals without 'spot' → FUTURES market (default)";
  };
  usage: {
    method: "POST";
    body: { message: "signal text", saveToDb: false };
  };
  templates: SignalTemplate[];
  exampleRequests: {
    futuresLong: { message: "#BTC/USDT\nLONG\nEntry: 67000\nTP: 68000\nStop: 66000\nLeverage: 10x" };
    spotBuy: { message: "#ETH/USDT SPOT\nBuy: 2500\nTP: 2600\nStop: 2400" };
    getTemplates: { message: "шаблон" };
  };
}
```

#### POST /api/chat/parse-signal

Parse a signal message or execute chat commands.

**Request Body:**
```typescript
interface ParseRequest {
  message: string;   // Signal text or command
  saveToDb?: boolean; // Save to database (default: false)
}
```

**Chat Commands:**
| Command | Description |
|---------|-------------|
| `help` / `помощь` | Show command reference |
| `positions` / `позиции` | Show open positions status |
| `close all` | Close all open positions |
| `close <symbol> [direction]` | Close specific position |
| `delete signals` | Delete all signals |
| `clear database` | Full database reset |
| `шаблон` / `template` | Show signal templates |
| `long` / `short` / `spot` | Show specific template |

**Signal Templates:**

| Template ID | Name | Market Type | Description |
|-------------|------|------------|-------------|
| `futures-long` | FUTURES LONG | FUTURES | Default futures signal |
| `futures-short` | FUTURES SHORT | FUTURES | Short signal format |
| `spot-basic` | SPOT (Basic) | SPOT | Basic spot signal |
| `breakout` | Breakout Signal | FUTURES | Breakout entry signal |
| `entry-zone` | Entry Zone | FUTURES | Zone-based entry |
| `multi-entry` | Multi-Entry | FUTURES | DCA multiple entries |
| `full-cornix` | Full Cornix | FUTURES | Complete Cornix format |

**Response:**
```typescript
interface ParseResponse {
  success: boolean;
  type: "signal" | "template" | "templates-list" | "close-all" | "close-position" | "delete-signals" | "clear-database" | "status" | "help" | "error";
  message: string;      // Human-readable response
  signal?: ParsedCornixSignal;
  template?: SignalTemplate;
  templates?: SignalTemplateSummary[];
  closedCount?: number;
  totalPnL?: number;
  deletedCount?: number;
}
```

---

### /api/webhook/tradingview (TradingView Webhook)

Receive and process TradingView alerts with security features.

#### Security Features

1. **HMAC-SHA256 Signature Validation**
   - Header: `X-TradingView-Signature`
   - Requires `TRADINGVIEW_WEBHOOK_SECRET` environment variable

2. **Rate Limiting**
   - 10 requests per minute per IP
   - Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

#### GET /api/webhook/tradingview

Get webhook documentation and auto-execute settings.

**Response:**
```typescript
interface WebhookDocs {
  success: true;
  message: "TradingView Webhook Endpoint - Cornix Compatible";
  security: {
    signatureValidation: {
      enabled: boolean;
      algorithm: "HMAC-SHA256";
      header: "X-TradingView-Signature";
      note: string;
    };
    rateLimiting: {
      enabled: true;
      limit: "10 requests per minute per IP";
      headers: {
        "X-RateLimit-Limit": "Maximum requests allowed";
        "X-RateLimit-Remaining": "Requests remaining in current window";
        "X-RateLimit-Reset": "Unix timestamp when the window resets";
      };
    };
  };
  autoExecute: {
    enabled: boolean;
    sources: string[];
    requiresConfirmation: boolean;
  };
  usage: {
    method: "POST";
    contentType: "application/json or text/plain";
    importantNote: "Signals containing word 'spot' or 'спот' are SPOT trades";
    setupInstructions: {
      step1: "Go to TradingView Alert dialog";
      step2: "Set webhook URL to your endpoint";
      step3: "If secret is configured, add the secret key in alert message";
      step4: "Use provided alert templates";
    };
  };
  formats: SignalFormat[];
  parsedFields: {
    symbol: "Coin pair (BTC/USDT, BTCUSDT, #BTC/USDT)";
    direction: "LONG or SHORT (inferred from prices or explicit)";
    marketType: "SPOT (if 'spot'/'спот' in text) or FUTURES (default)";
    entryPrices: "Entry prices from Entry/Buy keywords";
    entryZone: "Range entry from 'Entry Zone' keyword";
    stopLoss: "Stop loss from Stop/SL keywords";
    takeProfits: "TP targets from TP/Target/Take Profit keywords";
    leverage: "Leverage from Leverage/Lev keywords or X notation";
    signalType: "REGULAR or BREAKOUT (if 'above'/'below' in text)";
  };
}
```

#### POST /api/webhook/tradingview

Receive TradingView alert.

**Headers:**
- `X-TradingView-Signature`: HMAC-SHA256 signature (if configured)
- `Content-Type`: `application/json` or `text/plain`

**Request Body:**
Plain text signal message in Cornix format.

**Response:**
```typescript
interface WebhookResponse {
  success: boolean;
  signalId: number;
  signal: {
    symbol: string;
    direction: "LONG" | "SHORT";
    marketType: "SPOT" | "FUTURES";
    action: "BUY" | "SELL" | "CLOSE";
    entryPrices: number[];
    stopLoss?: number;
    takeProfits: { price: number; percentage: number }[];
    leverage: number;
    signalType: "REGULAR" | "BREAKOUT";
    formatted: string;
  };
  message: string;
  tradeId?: string;
  requiresConfirmation?: boolean;
  processingTime: string;  // e.g., "125ms"
}
```

**Error Responses:**
```typescript
// Rate limit exceeded (429)
{
  error: "Rate limit exceeded",
  retryAfter: 30,
  message: "Too many requests. Try again in 30 seconds."
}

// Invalid signature (401)
{
  error: "Unauthorized",
  message: "Invalid signature - request could not be authenticated",
  hint: "Ensure your TradingView alert includes the correct secret key."
}

// Parse error (400)
{
  success: false,
  error: "Could not parse TradingView alert",
  hint: "Ensure signal contains coin pair (e.g., BTC/USDT) and entry/exit targets",
  received: "<first 1000 chars of body>"
}
```

---

### Cornix Endpoints

Full Cornix API integration endpoints.

#### GET /api/cornix/signals

Get signals from Cornix API.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `status` | string | - | Filter: PENDING, ACTIVE, CLOSED |
| `limit` | number | 50 | Maximum signals |

**Configuration Required:**
- `CORNIX_API_KEY`
- `CORNIX_API_SECRET`

#### GET /api/cornix/positions

Get positions from Cornix API.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `status` | string | - | Filter: OPEN, CLOSED |
| `limit` | number | 50 | Maximum positions |

#### POST /api/cornix/positions

Execute action on Cornix position.

**Request Body:**
```typescript
interface CornixPositionAction {
  action: "close" | "update";
  positionId: string;
  stopLoss?: number;
  takeProfit?: number;
}
```

#### GET /api/cornix/metrics

Get comprehensive Cornix metrics.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `period` | string | 30d | Period: 7d, 30d, 90d, all |
| `exchange` | string | - | Filter by exchange |

**Response:**
```typescript
interface CornixMetricsResponse {
  success: true;
  data: {
    performance: {
      totalPnl: number;
      totalPnlPercent: number;
      todayPnl: number;
      weekPnl: number;
      monthPnl: number;
      winRate: number;
      totalTrades: number;
      winningTrades: number;
      losingTrades: number;
      avgWin: number;
      avgLoss: number;
      profitFactor: number;
      sharpeRatio: number;
      maxDrawdown: number;
      currentStreak: number;
      bestTrade: number;
      worstTrade: number;
    };
    signals: {
      totalSignals: number;
      successfulSignals: number;
      failedSignals: number;
      pendingSignals: number;
      avgExecutionTime: number;
      successRate: number;
      avgReturn: number;
      signalsByExchange: Record<string, number>;
      signalsByPair: { pair: string; count: number; pnl: number }[];
    };
    copyTrading: {
      activeFollowers: number;
      totalFollowers: number;
      totalCopiedTrades: number;
      avgFollowerPnl: number;
      profitShareEarned: number;
      topFollowers: { id: string; pnl: number; trades: number }[];
    };
    equityCurve: { date: string; pnl: number; trades: number; equity: number }[];
    period: string;
    startDate: Date;
    endDate: Date;
  };
}
```

#### POST /api/cornix/sync

Synchronize signals and positions from Cornix API.

**Response:**
```typescript
interface CornixSyncResponse {
  success: true;
  message: "Cornix sync completed";
  data: {
    signals: { total: number; synced: number };
    positions: { total: number; synced: number };
  };
}
```

#### GET /api/cornix/sync

Get Cornix sync status.

**Response:**
```typescript
interface CornixSyncStatus {
  success: boolean;
  configured: boolean;
  connected?: boolean;
  accounts?: number;
  message?: string;
  error?: string;
}
```

#### GET /api/cornix/features

Get Cornix integration features and connected exchanges.

**Response:**
```typescript
interface CornixFeaturesResponse {
  success: true;
  data: {
    exchanges: {
      id: string;
      name: string;
      connected: boolean;
      apiKeyConfigured: boolean;
      accountType: "both";
      hasFutures: boolean;
      hasSpot: boolean;
    }[];
    signalStats: {
      totalSignals: number;
      activeSignals: number;
      executedSignals: number;
      pendingSignals: number;
      failedSignals: number;
    };
    features: {
      autoTrading: boolean;
      signalParsing: boolean;
      webhookEnabled: boolean;
      notificationsEnabled: boolean;
      riskManagement: boolean;
      tpSlCopy: boolean;
      leverageLimit: number;
      maxPositions: number;
    };
  };
}
```

#### POST /api/cornix/features

Update Cornix feature settings.

**Request Body:**
```typescript
interface FeatureUpdateRequest {
  feature?: string;          // Single feature name
  value?: boolean | number;  // New value
  features?: Record<string, boolean | number>;  // Multiple features
}
```

---

## Signal Parsing (Cornix Format)

### Supported Formats

The signal parser supports Cornix-compatible formats with flexible keyword ordering.

#### Coin Pair Formats

| Format | Example | Notes |
|--------|---------|-------|
| Hashtag | `#BTCUSDT`, `#BTC/USDT` | Preferred format |
| Slash | `BTC/USDT`, `BTC-USDT` | With separator |
| Space | `BTC USDT` | With space |
| Combined | `BTCUSDT` | Auto-detected |
| Single | `BTC` | Defaults to USDT |

#### Direction Keywords

**LONG:**
- English: `long`, `buy`, `buying`, `longs`
- Russian: `лонг`, `покупка`, `покупать`

**SHORT:**
- English: `short`, `sell`, `selling`, `shorts`
- Russian: `шорт`, `продажа`, `продавать`

#### Market Type Detection

```
┌────────────────────────────────────────────────────┐
│           MARKET TYPE DETECTION RULE               │
├────────────────────────────────────────────────────┤
│  Contains "spot" or "спот" → SPOT                  │
│  Otherwise → FUTURES (default)                     │
└────────────────────────────────────────────────────┘
```

#### Entry Keywords

| Keyword | Example |
|---------|---------|
| Entry | `Entry: 67000` |
| Enter | `Enter 67000` |
| Buy | `Buy: 67000` |
| Вход | `Вход: 67000` |
| Entry Zone | `Entry Zone: 66000-67000` |
| Range | `range 66000 67000` |

#### Take Profit Keywords

| Keyword | Example |
|---------|---------|
| TP | `TP: 68000`, `TP1: 68000` |
| Take Profit | `Take-Profit: 68000` |
| Target | `Target: 68000` |
| Тейк | `тейк: 68000` |
| Цель | `цель: 68000` |

#### Stop Loss Keywords

| Keyword | Example |
|---------|---------|
| SL | `SL: 66000` |
| Stop | `Stop: 66000` |
| Stop Loss | `Stop Loss: 66000` |
| Стоп | `стоп: 66000` |

#### Leverage Keywords

| Keyword | Example | Notes |
|---------|---------|-------|
| Leverage | `Leverage: 10x` | Full format |
| Lev | `Lev 10` | Short format |
| x notation | `10x`, `x10` | Standalone |
| Isolated | `Isolated (10x)` | Isolated margin |
| Cross | `Cross (10x)` | Cross margin |

### Multi-Entry (DCA) Signals

Support for weighted multi-entry signals:

**Format 1 - Indexed with Percentage:**
```
Entry Targets:
1) 67000 (50%)
2) 66500 (30%)
3) 66000 (20%)
```

**Format 2 - Inline Weights:**
```
Entry: 67000:50, 66500:30, 66000:20
```

**Format 3 - DCA Notation:**
```
DCA Entry: 67000 (base), 66500 (1.5x), 66000 (2x)
```

### Trailing Stop Types

| Type | Description |
|------|-------------|
| `breakeven` | Move SL to entry after TP1 |
| `moving_target` | Move SL to TP after trigger |
| `moving_2_target` | Move SL to TP-2 after trigger |
| `percent_below_trigger` | SL trails by percentage below trigger price |
| `percent_below_highest` | SL trails by percentage below highest price |

### Confidence Scoring

```typescript
confidence = 0.5; // Base
if (coinPair) confidence += 0.1;
if (entryPrices.length > 0) confidence += 0.2;
if (stopLoss) confidence += 0.1;
if (takeProfits.length > 0) confidence += 0.1;
if (explicitDirection) confidence += 0.1;
if (trailingConfig) confidence += 0.05;
if (multiEntryConfig) confidence += 0.05;
confidence = Math.min(confidence, 1);
```

---

## Signal Filtering

### Signal Filter Configuration

```typescript
interface SignalFilterConfig {
  enabled: boolean;
  minConfidence: number;          // Minimum confidence (0-1)
  allowedSources: string[];        // TRADINGVIEW, TELEGRAM, API
  allowedSymbols?: string[];       // Whitelist symbols
  blockedSymbols?: string[];       // Blacklist symbols
  maxLeverage: number;             // Maximum leverage allowed
  requireStopLoss: boolean;        // SL mandatory
  requireTakeProfit: boolean;      // TP mandatory
  minRiskRewardRatio: number;      // Minimum R:R ratio
}
```

### Filter Pipeline

```
Signal → Source Filter → Symbol Filter → Confidence Check
       → Leverage Check → Risk/Reward Check → Final Validation
```

### Risk/Reward Calculation

```typescript
function calculateRiskReward(signal: ParsedSignal): number {
  const avgEntry = signal.entryPrices.reduce((a, b) => a + b) / signal.entryPrices.length;
  const avgTP = signal.takeProfits.reduce((a, b) => a + b.price, 0) / signal.takeProfits.length;
  
  if (signal.direction === "LONG") {
    const reward = avgTP - avgEntry;
    const risk = avgEntry - (signal.stopLoss || 0);
    return risk > 0 ? reward / risk : 0;
  } else {
    const reward = avgEntry - avgTP;
    const risk = (signal.stopLoss || avgEntry) - avgEntry;
    return risk > 0 ? reward / risk : 0;
  }
}
```

---

## Signal Deduplication

### Double-Entry Protection

The deduplicator prevents duplicate positions from the same signal.

#### Hash Generation

```typescript
// Canonical signal representation
const canonical = [
  signal.symbol.toUpperCase(),
  signal.direction,
  [...signal.entryPrices].sort((a, b) => a - b).join(','),
  signal.stopLoss ? `SL:${signal.stopLoss}` : '',
  signal.takeProfits ? `TP:${signal.takeProfits.map(tp => tp.price).sort().join(',')}` : '',
  signal.marketType ? `MT:${signal.marketType}` : ''
].filter(Boolean).join('|');

// SHA-256 hash
const hash = createHash('sha256').update(canonical).digest('hex');
```

#### Deduplication Configuration

```typescript
interface DeduplicatorConfig {
  defaultTTL: 24 * 60 * 60 * 1000;     // 24 hours
  priceSlidingWindow: 0.001;            // 0.1% price tolerance
  enableFuzzyMatching: true;            // Similar signal detection
  duplicateTimeWindow: 60 * 60 * 1000; // 1 hour
  enablePersistence: true;              // Database storage
  maxCacheSize: 10000;                  // Max in-memory entries
}
```

#### Duplicate Detection Types

| Type | Description |
|------|-------------|
| `EXACT_MATCH` | Identical signal hash |
| `SAME_RAW_TEXT` | Same raw text content |
| `FUZZY_MATCH` | Similar prices within sliding window |
| `TIME_WINDOW` | Same signal within time window |

#### Usage Example

```typescript
import { 
  getSignalDeduplicator, 
  toSignalForDedup,
  type SignalForDedup 
} from '@/lib/signal-processing';

const deduplicator = getSignalDeduplicator();

// Check if signal is duplicate
const signal: SignalForDedup = {
  symbol: "BTCUSDT",
  direction: "LONG",
  entryPrices: [67000],
  stopLoss: 66000,
  takeProfits: [{ price: 68000, percentage: 100 }],
  marketType: "FUTURES",
  rawText: signalText,
};

const check = await deduplicator.isProcessed(signal);

if (!check.isDuplicate) {
  // Process signal
  await executeSignal(signal);
  
  // Mark as processed
  await deduplicator.markExecuted(signal, positionId, tradeId);
} else {
  console.log(`Duplicate detected: ${check.reason}`);
  console.log(`Original: ${check.originalSignal?.id}`);
}
```

---

## Stale Signal Detection

### TTL-Based Signal Expiration

Signals have a Time-To-Live (TTL) to prevent execution of outdated signals.

#### Configuration

```typescript
interface StaleSignalConfig {
  defaultTTL: 30000;           // 30 seconds default TTL
  warningThreshold: 0.8;       // Warn at 80% of TTL
  checkInterval: 1000;         // Check every second
  maxSignalAge: 300000;        // 5 minutes max age
  enableAutoReject: true;      // Auto-reject expired signals
}
```

#### Signal Lifecycle

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   PENDING   │────▶│ PROCESSING  │────▶│  EXECUTED   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   
       │                   │                   
       ▼                   ▼                   
┌─────────────┐     ┌─────────────┐           
│   EXPIRED   │────▶│  REJECTED   │           
└─────────────┘     └─────────────┘           
```

#### Usage Example

```typescript
import { getStaleSignalDetector, type SignalWithTTL } from '@/lib/signal-processing';

const detector = getStaleSignalDetector();

// Start monitoring
detector.startMonitoring();

// Track a signal with TTL
const signal: SignalWithTTL = {
  id: 'sig_123',
  type: 'entry',
  symbol: 'BTCUSDT',
  side: 'buy',
  price: 67000,
  timestamp: Date.now(),
  ttl: 30000, // 30 seconds
  source: 'tradingview',
};

const trackedId = detector.trackSignal(signal);

// Check validity
if (detector.isSignalValid(trackedId)) {
  // Process signal
  detector.markProcessing(trackedId);
  await executeSignal(signal);
  detector.markExecuted(trackedId);
}

// Get remaining TTL
const remaining = detector.getRemainingTTL(trackedId);

// Get metrics
const metrics = detector.getMetrics();
console.log(`Active: ${metrics.activeSignals}, Expired: ${metrics.expiredSignals}`);
```

---

## Usage Examples

### 1. Create Signal from Text

```bash
curl -X POST https://api.citarion.com/api/signal \
  -H "Content-Type: application/json" \
  -d '{
    "text": "#BTC/USDT LONG Entry: 67000 TP: 68000 SL: 66000 Leverage: 10x",
    "source": "MANUAL"
  }'
```

### 2. TradingView Webhook Setup

```javascript
// TradingView Alert Message
const alertMessage = `
⚡⚡ #BTC/USDT ⚡⚡
Exchanges: Binance Futures
Signal Type: Regular (Long)
Leverage: Isolated (10X)
Entry Zone: 66900 - 67100
Take-Profit Targets: 1) 68000 2) 69000 3) 70000
Stop Targets: 1) 66000
`;

// Configure in TradingView:
// 1. Alert Name: "CITARION Signal"
// 2. Webhook URL: https://api.citarion.com/api/webhook/tradingview
// 3. Message: alertMessage above
```

### 3. Check Duplicate Signal

```bash
curl -X POST https://api.citarion.com/api/signals/processed \
  -H "Content-Type: application/json" \
  -d '{
    "signal": {
      "symbol": "BTCUSDT",
      "direction": "LONG",
      "entryPrices": [67000],
      "stopLoss": 66000,
      "takeProfits": [{"price": 68000, "percentage": 100}],
      "marketType": "FUTURES"
    }
  }'
```

### 4. Get Active Signals

```bash
curl "https://api.citarion.com/api/signal?action=active&symbol=BTCUSDT&direction=LONG"
```

### 5. Update Signal TP/SL

```bash
# Update TP2
curl -X POST https://api.citarion.com/api/signal \
  -H "Content-Type: application/json" \
  -d '{"text": "BTCUSDT long tp2 69500"}'

# Update SL
curl -X POST https://api.citarion.com/api/signal \
  -H "Content-Type: application/json" \
  -d '{"text": "BTCUSDT long sl 65500"}'
```

### 6. Close Signal

```bash
curl -X POST https://api.citarion.com/api/signal \
  -H "Content-Type: application/json" \
  -d '{"text": "BTCUSDT long close"}'
```

### 7. Chat-Based Signal Parsing

```typescript
// Parse signal via chat API
const response = await fetch('/api/chat/parse-signal', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: '#ETH/USDT SPOT\nBuy: 2500\nTP: 2600, 2700\nStop: 2400',
    saveToDb: true,
  }),
});

const result = await response.json();
// result.signal contains parsed signal
// result.message contains human-readable summary
```

### 8. Cornix Metrics

```bash
curl "https://api.citarion.com/api/cornix/metrics?period=30d"
```

---

## Error Handling

### Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid signal format |
| 401 | Unauthorized - Invalid/missing signature |
| 404 | Not Found - Signal not found |
| 429 | Rate Limited - Too many requests |
| 500 | Internal Server Error |

### Error Response Format

```typescript
interface ErrorResponse {
  success: false;
  error: string;
  details?: string;
  hint?: string;
}
```

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Could not parse signal | Missing coin pair | Include symbol like BTCUSDT |
| Invalid signature | Wrong webhook secret | Verify TRADINGVIEW_WEBHOOK_SECRET |
| Rate limit exceeded | >10 requests/minute | Implement backoff/retry |
| Signal already processed | Duplicate detected | Check signal hash |
| No active signal found | Invalid symbol/direction | Verify signal exists |

---

## TypeScript Interfaces Summary

```typescript
// Core signal interface
interface ParsedSignal {
  id?: number;
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  direction: "LONG" | "SHORT";
  action: "BUY" | "SELL" | "CLOSE" | "UPDATE_TP" | "UPDATE_SL" | "MARKET_ENTRY";
  marketType: "SPOT" | "FUTURES";
  entryPrices: number[];
  entryZone?: { min: number; max: number };
  entryWeights?: number[];
  stopLoss?: number;
  takeProfits: { price: number; percentage: number }[];
  leverage: number;
  leverageType: "ISOLATED" | "CROSS";
  signalType: "REGULAR" | "BREAKOUT";
  trailingConfig?: TrailingConfig;
  amountPerTrade?: number;
  riskPercentage?: number;
  exchanges: string[];
  confidence: number;
  rawText: string;
}

// Trailing configuration
interface TrailingConfig {
  entry?: { type: "percentage" | "price"; value: number };
  takeProfit?: { type: "percentage" | "price"; value: number };
  stop?: {
    type: "moving_target" | "moving_2_target" | "breakeven" | 
          "percent_below_trigger" | "percent_below_highest";
    trigger?: { type: "target" | "percent"; value: number };
  };
}

// Multi-entry DCA configuration
interface MultiEntryConfig {
  targets: EntryTarget[];
  totalWeight: number;
  strategy: "EVENLY_DIVIDED" | "CUSTOM_RATIOS" | "DECREASING" | "INCREASING" | "DCA";
}

interface EntryTarget {
  index: number;
  price: number;
  weight: number; // Percentage (0-100)
}

// Deduplication types
interface SignalForDedup {
  symbol: string;
  direction: "LONG" | "SHORT";
  entryPrices: number[];
  stopLoss?: number;
  takeProfits?: { price: number; percentage: number }[];
  marketType?: "SPOT" | "FUTURES";
  rawText?: string;
  signalSource?: string;
}

interface DuplicateCheckResult {
  isDuplicate: boolean;
  originalSignal?: ProcessedSignal;
  similarSignals?: ProcessedSignal[];
  reason?: "EXACT_MATCH" | "FUZZY_MATCH" | "SAME_RAW_TEXT" | "TIME_WINDOW";
}

// Signal status
type SignalStatus = "PENDING" | "ACTIVE" | "CLOSED" | "EXECUTED" | "IGNORED" | "FAILED" | "DUPLICATE";
type ProcessedStatus = "EXECUTED" | "IGNORED" | "FAILED" | "DUPLICATE" | "PENDING";
```

---

## See Also

- [Auto Trading API](./AUTO_TRADING_API.md) - Signal execution engine
- [Backend API Reference](./BACKEND_API_REFERENCE.md) - Complete API reference
- [Cornix Signal Format](../trading/CORNIX_SIGNAL_FORMAT.md) - Detailed format specification
- [Copy Trading](../trading/copy-trading.md) - Copy trading integration
