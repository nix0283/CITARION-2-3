# Price Service

**Version:** 2.0 | **Port:** 3002 | **Last Updated:** March 2026

---

## 📋 Overview

The Price Service is a multi-exchange price aggregation service that provides real-time cryptocurrency price data from multiple exchanges. It aggregates prices from Binance, Bybit, and OKX exchanges for both spot and futures markets, broadcasting updates via WebSocket to connected clients.

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRICE SERVICE                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Binance    │  │    Bybit     │  │     OKX      │          │
│  │  Spot/Futures│  │  Spot/Futures│  │  Spot/Futures│          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                 │                   │
│         ▼                 ▼                 ▼                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Price Aggregation Engine                    │   │
│  │              (Caching & Broadcasting)                    │   │
│  └─────────────────────────┬───────────────────────────────┘   │
│                            │                                    │
│                            ▼                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Socket.IO Server (Port 3002)                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

- **Multi-Exchange Support** - Aggregates prices from Binance, Bybit, and OKX
- **Dual Market Types** - Supports both spot and futures markets
- **Real-Time Streaming** - WebSocket-based price updates with sub-second latency
- **Price Caching** - Maintains latest prices for quick retrieval
- **Automatic Reconnection** - Self-healing WebSocket connections to exchanges
- **Fallback Simulation** - Simulated prices when exchange connections fail
- **CORS Security** - Configurable allowed origins for production security

### Supported Exchanges

| Exchange | Spot | Futures | Symbols |
|----------|------|---------|---------|
| Binance | ✅ | ✅ | BTCUSDT, ETHUSDT, BNBUSDT, SOLUSDT, XRPUSDT, DOGEUSDT |
| Bybit | ✅ | ✅ | BTCUSDT, ETHUSDT, BNBUSDT, SOLUSDT |
| OKX | ✅ | ✅ | BTC-USDT, ETH-USDT, SOL-USDT |

---

## 🔌 REST API

### Health Check

```http
GET /health?XTransformPort=3002
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": 1700000000000,
  "uptime": 3600
}
```

### Get Current Prices

```http
GET /prices?XTransformPort=3002
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbols | string | No | Comma-separated list of symbols (e.g., `BTCUSDT,ETHUSDT`) |
| exchange | string | No | Filter by exchange (`binance`, `bybit`, `okx`) |

**Response:**
```json
{
  "prices": [
    {
      "symbol": "BTCUSDT",
      "price": 67000.50,
      "change24h": 2.5,
      "high24h": 68500.00,
      "low24h": 65500.00,
      "volume24h": 1234567890,
      "exchange": "binance",
      "type": "futures",
      "timestamp": 1700000000000
    }
  ]
}
```

### Get Supported Symbols

```http
GET /symbols?XTransformPort=3002
```

**Response:**
```json
{
  "symbols": {
    "binance": {
      "spot": ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT", "DOGEUSDT"],
      "futures": ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT", "DOGEUSDT"]
    },
    "bybit": {
      "spot": ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"],
      "futures": ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"]
    },
    "okx": {
      "spot": ["BTC-USDT", "ETH-USDT", "SOL-USDT"],
      "futures": ["BTC-USDT-SWAP", "ETH-USDT-SWAP"]
    }
  }
}
```

---

## 🔄 WebSocket Events

### Connection

```javascript
import { io } from 'socket.io-client';

const ws = io('http://localhost:3000', {
  path: '/socket.io',
  query: { XTransformPort: '3002' }
});
```

### Client → Server Events

#### Subscribe to Prices

```javascript
ws.emit('subscribe', { 
  symbols: ['BTCUSDT', 'ETHUSDT'] 
});
```

#### Subscribe to Exchange

```javascript
ws.emit('subscribe_exchange', { 
  exchange: 'binance', 
  type: 'futures' 
});
```

#### Unsubscribe

```javascript
ws.emit('unsubscribe', { 
  symbols: ['BTCUSDT'] 
});
```

### Server → Client Events

#### Initial Prices (on connection)

```javascript
ws.on('initial_prices', (data) => {
  // data = { binance_spot: {...}, binance_futures: {...}, ... }
  console.log('Initial prices loaded:', data);
});
```

#### Price Update

```javascript
ws.on('price_update', (data) => {
  console.log(`${data.symbol}: $${data.price}`);
  // data = {
  //   exchange: 'binance',
  //   type: 'futures',
  //   symbol: 'BTCUSDT',
  //   price: 67000.50,
  //   change24h: 2.5,
  //   high24h: 68500.00,
  //   low24h: 65500.00,
  //   volume24h: 1234567890
  // }
});
```

#### Exchange Prices

```javascript
ws.on('exchange_prices', (data) => {
  // data = { exchange: 'binance', type: 'spot', prices: {...} }
});
```

---

## ⚙️ Configuration

### Environment Variables

```env
# Environment
NODE_ENV=development

# CORS - Comma-separated list of allowed origins
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://app.citarion.com

# Redis (optional, for distributed caching)
REDIS_URL=redis://localhost:6379
```

### Production CORS Configuration

For production, always set `ALLOWED_ORIGINS`:

```bash
ALLOWED_ORIGINS=https://app.citarion.com,https://admin.citarion.com
```

If `ALLOWED_ORIGINS` is not set in production, all cross-origin requests will be blocked.

---

## 📝 Examples

### React Hook for Price Subscriptions

```typescript
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface PriceData {
  symbol: string;
  price: number;
  change24h: number;
  exchange: string;
}

export function usePriceService(symbols: string[]) {
  const [prices, setPrices] = useState<Record<string, PriceData>>({});
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws: Socket = io('/', {
      path: '/socket.io',
      query: { XTransformPort: '3002' }
    });

    ws.on('connect', () => setConnected(true));
    ws.on('disconnect', () => setConnected(false));

    ws.on('initial_prices', (data) => {
      // Flatten all prices
      const allPrices: Record<string, PriceData> = {};
      Object.values(data).forEach((exchangePrices: any) => {
        Object.assign(allPrices, exchangePrices);
      });
      setPrices(allPrices);
    });

    ws.on('price_update', (data: PriceData) => {
      setPrices(prev => ({
        ...prev,
        [data.symbol]: data
      }));
    });

    // Subscribe to specific symbols
    ws.emit('subscribe', { symbols });

    return () => {
      ws.disconnect();
    };
  }, [symbols.join(',')]);

  return { prices, connected };
}
```

### Vanilla JavaScript Example

```javascript
const ws = io('/?XTransformPort=3002');

ws.on('connect', () => {
  console.log('Connected to Price Service');
  ws.emit('subscribe', { symbols: ['BTCUSDT', 'ETHUSDT'] });
});

ws.on('price_update', (data) => {
  const priceEl = document.getElementById(`price-${data.symbol}`);
  if (priceEl) {
    priceEl.textContent = `$${data.price.toFixed(2)}`;
    priceEl.className = data.change24h >= 0 ? 'text-green' : 'text-red';
  }
});

ws.on('initial_prices', (data) => {
  console.log('Loaded all prices:', data);
});
```

### cURL Examples

```bash
# Get all prices
curl "http://localhost:3000/prices?XTransformPort=3002"

# Get specific symbols
curl "http://localhost:3000/prices?XTransformPort=3002&symbols=BTCUSDT,ETHUSDT"

# Get prices from specific exchange
curl "http://localhost:3000/prices?XTransformPort=3002&exchange=binance"

# Health check
curl "http://localhost:3000/health?XTransformPort=3002"
```

---

## ❌ Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "SERVICE_ERROR",
    "message": "Detailed error message",
    "details": {}
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_REQUEST` | 400 | Invalid request format or parameters |
| `UNAUTHORIZED` | 401 | Missing or invalid authentication token |
| `RATE_LIMITED` | 429 | Rate limit exceeded (100 req/sec) |
| `SERVICE_ERROR` | 500 | Internal service error |
| `NOT_FOUND` | 404 | Resource not found |

### WebSocket Error Handling

```javascript
ws.on('connect_error', (error) => {
  console.error('Connection failed:', error.message);
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});
```

### Rate Limits

| Service | Limit | Window |
|---------|-------|--------|
| Price Service | 100 requests | per second |

---

## 📚 Related Documentation

- [README.md](./README.md) - Microservices overview
- [MICROSERVICES_API.md](./MICROSERVICES_API.md) - Complete API reference
- [WEBSOCKET_PROTOCOL.md](../architecture/WEBSOCKET_PROTOCOL.md) - WebSocket standards
- [DEPLOYMENT_GUIDE.md](../deployment/DEPLOYMENT_GUIDE.md) - Deployment instructions

---

*Last updated: March 2026 | CITARION Documentation Team*
