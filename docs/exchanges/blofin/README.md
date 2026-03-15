# BloFin Exchange Integration

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Overview

BloFin is a cryptocurrency exchange supporting spot and futures trading with demo mode support.

| Feature | Status |
|---------|--------|
| **Spot Trading** | ✅ Supported |
| **Futures Trading** | ✅ Supported |
| **Demo Trading** | ✅ Supported |
| **WebSocket** | ✅ Real-time data |
| **Testnet** | ❌ Not available |

---

## 🔧 API Configuration

### REST API

| Environment | URL |
|-------------|-----|
| **Mainnet** | `https://openapi.blofin.com` |
| **Demo** | `https://openapi-demo.blofin.com` |

### WebSocket

| Environment | URL |
|-------------|-----|
| **Public** | `wss://openapi.blofin.com/ws/public` |
| **Private** | `wss://openapi.blofin.com/ws/private` |

---

## 🔐 Authentication

BloFin uses HMAC-SHA256 signing with API Key, Secret, and Passphrase.

### Required Credentials

```env
BLOFIN_API_KEY="your-api-key"
BLOFIN_API_SECRET="your-api-secret"
BLOFIN_PASSPHRASE="your-passphrase"
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
  return crypto.createHmac('sha256', secret).update(message).digest('base64');
}

// Request headers
const headers = {
  'ACCESS-KEY': apiKey,
  'ACCESS-SIGN': signature,
  'ACCESS-TIMESTAMP': timestamp,
  'ACCESS-PASSPHRASE': passphrase,
  'Content-Type': 'application/json'
};
```

---

## 📊 Market Data Endpoints

### Get Tickers

```http
GET /api/v1/market/tickers
```

**Response:**
```json
{
  "code": "0",
  "data": [
    {
      "instId": "BTC-USDT",
      "last": "67000.50",
      "bidPx": "66999.00",
      "askPx": "67001.00",
      "open24h": "66500.00",
      "high24h": "67500.00",
      "low24h": "66000.00",
      "vol24h": "12345.67",
      "ts": "1700000000000"
    }
  ]
}
```

### Get Order Book

```http
GET /api/v1/market/books?instId=BTC-USDT
```

### Get Candlesticks

```http
GET /api/v1/market/candles?instId=BTC-USDT&bar=1H
```

---

## 📈 Trading Operations

### Place Order

```http
POST /api/v1/trade/order
```

**Request Body:**
```json
{
  "instId": "BTC-USDT",
  "tdMode": "cash",
  "side": "buy",
  "ordType": "limit",
  "px": "67000",
  "sz": "0.001"
}
```

### Cancel Order

```http
POST /api/v1/trade/cancel-order
```

### Get Order Details

```http
GET /api/v1/trade/order?instId=BTC-USDT&ordId=12345
```

### Get Open Orders

```http
GET /api/v1/trade/orders-pending?instId=BTC-USDT
```

---

## 🔄 WebSocket Streams

### Public Channels

```javascript
const ws = new WebSocket('wss://openapi.blofin.com/ws/public');

// Subscribe to ticker
ws.send(JSON.stringify({
  op: 'subscribe',
  args: [{ channel: 'tickers', instId: 'BTC-USDT' }]
}));

// Handle messages
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};
```

### Private Channels

```javascript
const ws = new WebSocket('wss://openapi.blofin.com/ws/private');

// Authenticate
ws.send(JSON.stringify({
  op: 'login',
  args: [{
    apiKey: 'your-api-key',
    passphrase: 'your-passphrase',
    timestamp: Date.now().toString(),
    sign: 'signature'
  }]
}));

// Subscribe to account updates
ws.send(JSON.stringify({
  op: 'subscribe',
  args: [{ channel: 'account' }]
}));
```

### Available Channels

| Channel | Description |
|---------|-------------|
| `tickers` | Real-time ticker updates |
| `books` | Order book updates |
| `trades` | Trade stream |
| `candle1m` | 1-minute candles |
| `account` | Account balance updates |
| `orders` | Order updates |
| `positions` | Position updates |

---

## ⏱️ Rate Limits

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Public Market | 20 | per 2s |
| Trading | 60 | per 2s |
| Account | 10 | per 2s |

Rate limit headers:
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

---

## 📝 Order Types

| Type | Code | Description |
|------|------|-------------|
| **Market** | `market` | Immediate execution at best price |
| **Limit** | `limit` | Execution at specified price |
| **Post Only** | `post_only` | Maker only order |
| **FOK** | `fok` | Fill or Kill |
| **IOC** | `ioc` | Immediate or Cancel |

---

## ❌ Error Codes

| Code | Description |
|------|-------------|
| `0` | Success |
| `50000` | Invalid request |
| `50001` | Invalid API key |
| `50002` | Invalid signature |
| `50004` | Timestamp expired |
| `51001` | Insufficient balance |
| `51002` | Order not found |
| `51003` | Invalid instrument |

---

## 📚 Related Documentation

- [../README.md](../README.md) - Exchange overview
- [../TRADING_FEES.md](../TRADING_FEES.md) - Fee comparison

---

*Last updated: March 2026 | CITARION Documentation Team*
