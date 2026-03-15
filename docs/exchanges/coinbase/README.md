# Coinbase Exchange Integration

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Overview

Coinbase Exchange (formerly GDAX) is a US-based cryptocurrency exchange focused on spot trading with strong regulatory compliance.

| Feature | Status |
|---------|--------|
| **Spot Trading** | ✅ Supported |
| **Futures Trading** | ❌ Not available |
| **Demo Trading** | ❌ Not available |
| **WebSocket** | ✅ Real-time data |
| **Testnet** | ❌ Sandbox only |

---

## 🔧 API Configuration

### REST API

| Environment | URL |
|-------------|-----|
| **Production** | `https://api.exchange.coinbase.com` |
| **Sandbox** | `https://api-public.sandbox.exchange.coinbase.com` |

### WebSocket

| Environment | URL |
|-------------|-----|
| **Production** | `wss://ws-feed.exchange.coinbase.com` |
| **Sandbox** | `wss://ws-feed-public.sandbox.exchange.coinbase.com` |

---

## 🔐 Authentication

Coinbase uses HMAC-SHA256 with CB-ACCESS-KEY, CB-ACCESS-SIGN, CB-ACCESS-TIMESTAMP, and CB-ACCESS-PASSPHRASE.

### Required Credentials

```env
COINBASE_API_KEY="your-api-key"
COINBASE_API_SECRET="your-api-secret"
COINBASE_PASSPHRASE="your-passphrase"
```

### Signature Generation

```typescript
import crypto from 'crypto';

function generateSignature(
  timestamp: string,
  method: string,
  path: string,
  body: string,
  secret: string
): string {
  const message = timestamp + method + path + body;
  const decodedSecret = Buffer.from(secret, 'base64');
  return crypto.createHmac('sha256', decodedSecret)
    .update(message)
    .digest('base64');
}

// Request headers
const headers = {
  'CB-ACCESS-KEY': apiKey,
  'CB-ACCESS-SIGN': signature,
  'CB-ACCESS-TIMESTAMP': timestamp,
  'CB-ACCESS-PASSPHRASE': passphrase,
  'Content-Type': 'application/json'
};
```

---

## 📊 Market Data Endpoints

### Get Products

```http
GET /products
```

**Response:**
```json
[
  {
    "id": "BTC-USD",
    "base_currency": "BTC",
    "quote_currency": "USD",
    "base_min_size": "0.001",
    "base_max_size": "10000",
    "quote_increment": "0.01",
    "status": "online"
  }
]
```

### Get Ticker

```http
GET /products/BTC-USD/ticker
```

### Get Order Book

```http
GET /products/BTC-USD/book?level=2
```

### Get Candlesticks

```http
GET /products/BTC-USD/candles?granularity=3600
```

---

## 📈 Trading Operations

### Place Order

```http
POST /orders
```

**Request Body:**
```json
{
  "type": "limit",
  "side": "buy",
  "product_id": "BTC-USD",
  "price": "67000.00",
  "size": "0.001"
}
```

### Cancel Order

```http
DELETE /orders/{order_id}
```

### Get Orders

```http
GET /orders?status=open
```

### Get Fills

```http
GET /fills?order_id={order_id}
```

---

## 🔄 WebSocket Streams

### Connection

```javascript
const ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');

// Subscribe to channels
ws.send(JSON.stringify({
  type: 'subscribe',
  product_ids: ['BTC-USD', 'ETH-USD'],
  channels: ['ticker', 'level2', 'matches']
}));
```

### Channel Types

| Channel | Description |
|---------|-------------|
| `ticker` | Real-time price updates |
| `level2` | Order book updates |
| `matches` | Trade executions |
| `full` | Full order book |
| `user` | User account updates |

### Example: Ticker Update

```json
{
  "type": "ticker",
  "trade_id": 12345,
  "sequence": 12345678,
  "time": "2026-03-15T10:30:45.123456Z",
  "product_id": "BTC-USD",
  "price": "67000.50",
  "side": "buy",
  "open_24h": "66500.00",
  "volume_24h": "12345.67"
}
```

---

## ⏱️ Rate Limits

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Public | 3 | per second |
| Private | 5 | per second |
| Orders | 10 | per second |

Rate limit headers:
- `X-RateLimit-Remaining`
- `X-RateLimit-Limit`
- `X-RateLimit-Reset`

---

## 📝 Order Types

| Type | Description |
|------|-------------|
| **limit** | Limit order |
| **market** | Market order |
| **stop** | Stop limit order |

### Time in Force

| Value | Description |
|-------|-------------|
| `GTC` | Good Till Cancelled |
| `GTT` | Good Till Time |
| `IOC` | Immediate or Cancel |
| `FOK` | Fill or Kill |

---

## ❌ Error Codes

| Code | Description |
|------|-------------|
| `InvalidRequest` | Invalid request format |
| `AuthenticationError` | Invalid credentials |
| `RateLimitExceeded` | Too many requests |
| `InsufficientFunds` | Not enough balance |
| `NotFound` | Resource not found |
| `BadRequest` | Invalid parameters |

---

## 📚 Related Documentation

- [../README.md](../README.md) - Exchange overview
- [../TRADING_FEES.md](../TRADING_FEES.md) - Fee comparison

---

*Last updated: March 2026 | CITARION Documentation Team*
