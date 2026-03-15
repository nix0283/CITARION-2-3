# CITARION API Specification

> **Last Updated:** March 2025  
> **Version:** 1.0.0  
> **Base URL:** `http://localhost:3000/api`

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Rate Limiting](#rate-limiting)
4. [Response Format](#response-format)
5. [Error Codes](#error-codes)
6. [Endpoints](#endpoints)
7. [WebSocket API](#websocket-api)

---

## Overview

CITARION provides a RESTful API with 120+ endpoints for trading, bot management, ML integration, and risk management.

### Base URL

```
Development: http://localhost:3000/api
Production:  https://your-domain.com/api
```

### Content Types

```
Content-Type: application/json
Accept: application/json
```

---

## Authentication

### Session-Based (NextAuth)

```http
Cookie: next-auth.session-token=eyJhbGciOiJIUzI1NiIs...
```

### API Key

```http
Authorization: Bearer ck_xxxxxxxxxxxxxxxxxxxx
```

### API Key Format

```
Prefix: ck_ (Citarion Key)
Length: 32 characters
Example: ck_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

---

## Rate Limiting

### Default Limits

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Public | 60 | 1 minute |
| Authenticated | 120 | 1 minute |
| Trading | 30 | 1 minute |
| ML | 10 | 1 minute |

### Rate Limit Headers

```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1640000000
```

---

## Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2025-03-13T12:00:00Z",
    "requestId": "req_abc123"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "INVALID_SYMBOL",
    "message": "Symbol BTCUSRT not found",
    "details": { ... }
  },
  "meta": {
    "timestamp": "2025-03-13T12:00:00Z",
    "requestId": "req_abc123"
  }
}
```

### Paginated Response

```json
{
  "success": true,
  "data": [...],
  "meta": {
    "timestamp": "2025-03-13T12:00:00Z",
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 150,
      "totalPages": 3
    }
  }
}
```

---

## Error Codes

### Trading Errors

| Code | HTTP | Description |
|------|------|-------------|
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `INVALID_API_KEY` | 401 | Invalid exchange API key |
| `ACCOUNT_NOT_FOUND` | 404 | Account not found |
| `INSUFFICIENT_BALANCE` | 400 | Not enough balance |
| `INVALID_SYMBOL` | 400 | Symbol not supported |
| `ORDER_REJECTED` | 400 | Exchange rejected order |
| `POSITION_NOT_FOUND` | 404 | Position not found |
| `LEVERAGE_EXCEEDED` | 400 | Leverage exceeds limit |
| `EXCHANGE_UNAVAILABLE` | 503 | Exchange API unavailable |
| `EXCHANGE_RATE_LIMIT` | 429 | Exchange rate limit hit |

### Signal Errors

| Code | HTTP | Description |
|------|------|-------------|
| `SIGNAL_PARSE_ERROR` | 400 | Failed to parse signal |
| `SIGNAL_DUPLICATE` | 409 | Duplicate signal detected |
| `SIGNAL_EXPIRED` | 400 | Signal entry zone expired |

### System Errors

| Code | HTTP | Description |
|------|------|-------------|
| `INTERNAL_ERROR` | 500 | Internal server error |
| `TIMEOUT` | 504 | Request timeout |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

---

## Endpoints

### Trading

#### POST /api/trade

Execute a trade on connected exchange.

**Request:**
```json
{
  "symbol": "BTCUSDT",
  "side": "BUY",
  "type": "MARKET",
  "quantity": 0.001,
  "leverage": 10,
  "stopLoss": 65000,
  "takeProfit": 70000
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "ord_abc123",
    "symbol": "BTCUSDT",
    "side": "BUY",
    "type": "MARKET",
    "status": "FILLED",
    "price": 67000,
    "quantity": 0.001,
    "filledQuantity": 0.001,
    "fee": 0.0134,
    "timestamp": "2025-03-13T12:00:00Z"
  }
}
```

#### POST /api/trade/open

Open a new position with full configuration.

**Request:**
```json
{
  "accountId": "acc_abc123",
  "symbol": "BTCUSDT",
  "direction": "LONG",
  "amount": 100,
  "leverage": 10,
  "entryType": "MARKET",
  "stopLoss": 65000,
  "takeProfits": [
    {"price": 69000, "percentage": 50},
    {"price": 71000, "percentage": 50}
  ],
  "trailingStop": {
    "type": "PERCENT_BELOW_HIGHEST",
    "value": 5
  },
  "idempotencyKey": "unique-key-123"
}
```

#### POST /api/trade/close

Close a position.

**Request:**
```json
{
  "positionId": "pos_abc123",
  "closePrice": 68000,
  "closeReason": "MANUAL"
}
```

#### POST /api/trade/close-all

Close all open positions.

**Request:**
```json
{
  "symbol": "BTCUSDT",
  "direction": "LONG",
  "exchangeId": "binance",
  "isDemo": true
}
```

---

### Demo Trading

#### POST /api/demo/trade

Open a demo position (no authentication required).

**Request:**
```json
{
  "symbol": "BTCUSDT",
  "direction": "LONG",
  "amount": 100,
  "leverage": 10,
  "entryPrice": 67000,
  "stopLoss": 65000,
  "takeProfit": 70000
}
```

#### GET /api/demo/trade

Get demo positions.

**Response:**
```json
{
  "success": true,
  "data": {
    "positions": [
      {
        "id": "pos_abc123",
        "symbol": "BTCUSDT",
        "direction": "LONG",
        "amount": 0.001,
        "entryPrice": 67000,
        "currentPrice": 67500,
        "unrealizedPnl": 5.0,
        "unrealizedPnlPercent": 7.46
      }
    ],
    "virtualBalance": {
      "USDT": 9895.0,
      "BTC": 0.001
    }
  }
}
```

---

### Positions

#### POST /api/positions/sync

Sync positions from exchange.

**Request:**
```json
{
  "accountId": "acc_abc123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "synced": 5,
    "new": 2,
    "updated": 3,
    "closed": 1,
    "positions": [...]
  }
}
```

#### POST /api/positions/escort

Confirm position escort request.

**Request:**
```json
{
  "requestId": "req_abc123",
  "action": "ACCEPT",
  "stopLoss": 65000,
  "takeProfit": 70000
}
```

---

### Bots

#### GET /api/bots

Get all bot statuses.

**Response:**
```json
{
  "success": true,
  "data": {
    "bots": [
      {
        "type": "grid",
        "name": "Grid Bot",
        "activeCount": 3,
        "totalPnL": 150.50
      },
      {
        "type": "dca",
        "name": "DCA Bot",
        "activeCount": 2,
        "totalPnL": 75.25
      }
    ],
    "summary": {
      "totalBots": 5,
      "activeBots": 3,
      "totalPnL": 225.75
    }
  }
}
```

#### POST /api/bots/grid

Create a grid bot.

**Request:**
```json
{
  "name": "BTC Grid",
  "symbol": "BTCUSDT",
  "accountId": "acc_abc123",
  "gridType": "ARITHMETIC",
  "gridCount": 10,
  "upperPrice": 70000,
  "lowerPrice": 60000,
  "totalInvestment": 1000,
  "leverage": 1
}
```

#### POST /api/bots/grid/[id]/start

Start a grid bot.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "bot_abc123",
    "status": "RUNNING",
    "startedAt": "2025-03-13T12:00:00Z",
    "gridLevels": [
      {"level": 1, "price": 61000, "side": "BUY", "amount": 0.001},
      {"level": 2, "price": 62000, "side": "BUY", "amount": 0.001},
      ...
    ]
  }
}
```

---

### ML

#### POST /api/ml/predict/signal

Get signal classification.

**Request:**
```json
{
  "symbol": "BTCUSDT",
  "features": {
    "rsi": 65.5,
    "macd": 150.2,
    "bb_upper": 70000,
    "bb_lower": 64000,
    "volume": 1500000
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "direction": "LONG",
    "probability": 0.75,
    "confidence": 0.82,
    "features_used": ["rsi", "macd", "bb_upper", "bb_lower", "volume"]
  }
}
```

#### POST /api/ml/predict/price

Get price prediction.

**Request:**
```json
{
  "symbol": "BTCUSDT",
  "horizons": ["1h", "4h", "24h"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "predictions": [
      {
        "horizon": "1h",
        "direction": "UP",
        "expectedChange": 0.025,
        "confidence": 0.68
      },
      {
        "horizon": "4h",
        "direction": "UP",
        "expectedChange": 0.042,
        "confidence": 0.65
      },
      {
        "horizon": "24h",
        "direction": "UP",
        "expectedChange": 0.085,
        "confidence": 0.58
      }
    ]
  }
}
```

#### POST /api/ml/train

Train ML model with samples.

**Request:**
```json
{
  "samples": [
    {
      "features": {...},
      "label": "LONG",
      "timestamp": "2025-03-13T12:00:00Z"
    }
  ],
  "config": {
    "modelType": "gradient_boosting",
    "validationSplit": 0.2
  }
}
```

---

### Risk

#### GET /api/risk

Get risk report.

**Response:**
```json
{
  "success": true,
  "data": {
    "riskScore": 45,
    "riskLevel": "MEDIUM",
    "totalExposure": 5000,
    "drawdown": {
      "current": 5.2,
      "max": 15,
      "warning": 10
    },
    "var": {
      "historical95": -250,
      "parametric95": -230,
      "monteCarlo95": -260
    },
    "positions": {
      "total": 5,
      "long": 3,
      "short": 2
    },
    "killSwitch": {
      "isArmed": true,
      "isTriggered": false,
      "botsStopped": 0
    }
  }
}
```

#### POST /api/risk/killswitch/trigger

Trigger kill switch.

**Request:**
```json
{
  "reason": "Manual trigger by user"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "triggered": true,
    "stoppedBots": ["bot_abc123", "bot_def456"],
    "closedPositions": ["pos_abc123"],
    "timestamp": "2025-03-13T12:00:00Z"
  }
}
```

---

### Signals

#### POST /api/signal

Parse and save signal.

**Request:**
```json
{
  "rawSignal": "#BTC/USDT\nLONG\nEntry: 67000\nTP: 68000, 69000\nSL: 66000\nLeverage: 10x",
  "source": "TELEGRAM"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "signalId": 1234,
    "symbol": "BTCUSDT",
    "direction": "LONG",
    "marketType": "FUTURES",
    "entryPrices": [67000],
    "takeProfits": [
      {"price": 68000, "percentage": 50},
      {"price": 69000, "percentage": 50}
    ],
    "stopLoss": 66000,
    "leverage": 10,
    "status": "PENDING"
  }
}
```

#### GET /api/signals

Get aggregated signals.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `symbol` | string | Filter by symbol |
| `status` | string | Filter by status |
| `limit` | number | Max results |
| `offset` | number | Pagination offset |

---

### Exchange

#### POST /api/exchange

Connect exchange account.

**Request:**
```json
{
  "exchangeId": "binance",
  "exchangeType": "futures",
  "apiKey": "xxx",
  "apiSecret": "xxx",
  "isTestnet": false
}
```

#### GET /api/exchange

List connected exchanges.

**Response:**
```json
{
  "success": true,
  "data": {
    "exchanges": [
      {
        "id": "acc_abc123",
        "exchangeId": "binance",
        "exchangeType": "futures",
        "exchangeName": "Binance",
        "isActive": true,
        "lastSyncAt": "2025-03-13T12:00:00Z",
        "balance": {
          "USDT": 10000,
          "BTC": 0.5
        }
      }
    ]
  }
}
```

---

### Market Data

#### GET /api/prices

Get current prices.

**Response:**
```json
{
  "success": true,
  "data": {
    "BTCUSDT": {
      "price": 67500,
      "change24h": 2.5,
      "high24h": 68000,
      "low24h": 66000,
      "volume24h": 1500000000
    }
  }
}
```

#### GET /api/ohlcv

Get candlestick data.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `symbol` | string | Trading pair |
| `interval` | string | Timeframe (1m, 5m, 15m, 1h, 4h, 1d) |
| `limit` | number | Number of candles |
| `startTime` | string | Start timestamp |
| `endTime` | string | End timestamp |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "time": 1640000000000,
      "open": 67000,
      "high": 67500,
      "low": 66800,
      "close": 67200,
      "volume": 15000
    }
  ]
}
```

---

### Telegram

#### POST /api/telegram/webhook

Handle Telegram bot webhook.

**Request:**
```json
{
  "update_id": 12345,
  "message": {
    "message_id": 1,
    "from": {"id": 123456789, "username": "user"},
    "chat": {"id": 123456789},
    "text": "#BTC/USDT\nLONG\nEntry: 67000"
  }
}
```

---

### Webhooks

#### POST /api/webhook/tradingview

Handle TradingView webhook.

**Headers:**
```
X-Signature: sha256=<hmac_signature>
```

**Request:**
```json
{
  "symbol": "BTCUSDT",
  "action": "BUY",
  "price": 67000,
  "stop_loss": 66000,
  "take_profit": 70000
}
```

---

## WebSocket API

### Connection

```javascript
const ws = io('/?XTransformPort=3003');
```

### Channels

| Channel | Port | Description |
|---------|------|-------------|
| Price Updates | 3002 | Real-time prices |
| Bot Monitor | 3003 | Bot status updates |
| Trade Events | 3003 | Trade confirmations |
| Risk Monitor | 3004 | Risk metrics |
| Chat | 3005 | Oracle assistant |
| ML Predictions | 3006 | ML predictions |

### Events

#### Price Update

```javascript
ws.on('price_update', (data) => {
  // { symbol: 'BTCUSDT', price: 67500, change: 2.5 }
});
```

#### Trade Event

```javascript
ws.on('trade_event', (event) => {
  // {
  //   type: 'order_filled',
  //   positionId: 'pos_abc123',
  //   symbol: 'BTCUSDT',
  //   pnl: 50.25
  // }
});
```

#### Risk Update

```javascript
ws.on('risk_update', (risk) => {
  // { riskScore: 45, riskLevel: 'MEDIUM', drawdown: 5.2 }
});
```

---

## OpenAPI Schema

Full OpenAPI 3.0 specification available at:

```
GET /api/docs/openapi.yaml
```

Or in JSON format:

```
GET /api/docs/openapi.json
```

---

## Related Documentation

- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - Database schema
- [SECURITY_GUIDE.md](../security/SECURITY_GUIDE.md) - Security configuration
- [ENVIRONMENT_VARIABLES.md](../deployment/ENVIRONMENT_VARIABLES.md) - Environment setup
