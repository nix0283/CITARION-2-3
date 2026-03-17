# Funding Rate Service

> **Real-time funding rates from multiple exchanges with WebSocket + REST fallback**

---

## Overview

The Funding Rate Service is a standalone mini-service that collects and serves funding rate data from 5 major cryptocurrency exchanges. It uses WebSocket connections for real-time data with automatic fallback to REST API polling when WebSocket is unavailable.

### Port
`3010`

### Supported Exchanges

| Exchange | WebSocket | REST API | Notes |
|----------|-----------|----------|-------|
| **Binance** | ✅ | ✅ | Primary WebSocket support |
| **Bybit** | ✅ | ✅ | V5 API |
| **OKX** | ✅ | ✅ | SWAP instruments |
| **Bitget** | ✅ | ✅ | USDT-FUTURES |
| **BingX** | ❌ | ✅ | REST only (no WebSocket) |

### Tracked Symbols

```typescript
const SYMBOLS = [
  "BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT",
  "DOGEUSDT", "ADAUSDT", "AVAXUSDT", "LINKUSDT", "MATICUSDT"
];
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    FUNDING SERVICE (Port 3010)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                  WebSocket Connections                    │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │   │
│  │  │ Binance │ │  Bybit  │ │   OKX   │ │ Bitget  │        │   │
│  │  │   WS    │ │   WS    │ │   WS    │ │   WS    │        │   │
│  │  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘        │   │
│  └───────┼──────────┼──────────┼──────────┼────────────────┘   │
│          │          │          │          │                     │
│          ▼          ▼          ▼          ▼                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   REST API Fallback                       │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────┐│   │
│  │  │ Binance │ │  Bybit  │ │   OKX   │ │ Bitget  │ │BingX││   │
│  │  │  REST   │ │  REST   │ │  REST   │ │  REST   │ │REST ││   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────┘│   │
│  └──────────────────────────────────────────────────────────┘   │
│          │                                                      │
│          ▼                                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    HTTP Server                            │   │
│  │  • GET /rates    - All funding rates                      │   │
│  │  • GET /status   - Exchange connection status             │   │
│  │  • GET /health   - Service health check                   │   │
│  │  • GET /refresh  - Force REST refresh                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## API Endpoints

### GET /rates

Get all current funding rates.

**Query Parameters:**
- `exchange` (optional) - Filter by exchange (binance, bybit, okx, bitget, bingx)
- `symbol` (optional) - Filter by symbol (e.g., BTCUSDT)

**Response:**
```json
{
  "success": true,
  "rates": [
    {
      "symbol": "BTCUSDT",
      "exchange": "binance",
      "rate": 0.0001,
      "ratePercent": "0.0100%",
      "annualizedRate": 10.95,
      "markPrice": 95432.50,
      "indexPrice": 95430.00,
      "heatLevel": "low",
      "heatScore": 1,
      "timestamp": "2026-03-15T10:00:00.000Z",
      "source": "websocket"
    }
  ],
  "count": 50,
  "timestamp": "2026-03-15T10:00:00.000Z"
}
```

### GET /status

Get connection status for all exchanges.

**Response:**
```json
{
  "success": true,
  "exchanges": {
    "binance": {
      "exchange": "binance",
      "connected": true,
      "lastUpdate": "2026-03-15T10:00:00.000Z",
      "error": null,
      "source": "websocket"
    },
    "bingx": {
      "exchange": "bingx",
      "connected": false,
      "lastUpdate": "2026-03-15T09:59:00.000Z",
      "error": null,
      "source": "rest"
    }
  },
  "ratesCount": 50,
  "timestamp": "2026-03-15T10:00:00.000Z"
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "service": "funding-service",
  "port": 3010,
  "uptime": 3600,
  "timestamp": "2026-03-15T10:00:00.000Z"
}
```

### GET /refresh

Force refresh all funding rates via REST API.

**Response:**
```json
{
  "success": true,
  "message": "Refresh triggered for all exchanges",
  "ratesCount": 50,
  "timestamp": "2026-03-15T10:00:00.000Z"
}
```

---

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3010 | HTTP server port |
| `POLLING_INTERVAL` | 60000 | REST polling interval (ms) |
| `WS_RECONNECT_DELAY` | 5000 | WebSocket reconnect delay (ms) |

### Constants

```typescript
const PORT = 3010;
const POLLING_INTERVAL = 60000; // 1 minute
const WS_RECONNECT_DELAY = 5000; // 5 seconds
```

---

## Heat Level Calculation

The service calculates a "heat level" for each funding rate to indicate market sentiment:

| Heat Level | Annualized Rate | Score | Interpretation |
|------------|-----------------|-------|----------------|
| `low` | < 20% | 0-1 | Normal market conditions |
| `medium` | 20-50% | 2 | Elevated funding |
| `high` | 50-100% | 3 | High funding costs |
| `critical` | > 100% | 4 | Extreme funding costs |

**Formula:**
```
Annualized Rate = |Funding Rate| × 3 × 365
```

---

## Running the Service

### Development (with auto-reload)

```bash
cd mini-services/funding-service
bun run dev
```

### Production

```bash
cd mini-services/funding-service
bun run start
```

### Via start-services.sh

```bash
./start-services.sh funding
```

---

## Integration with Main App

### Frontend API Route

The main Next.js app fetches funding rates from this service via:

```
GET /api/funding/rates?XTransformPort=3010
```

### Example Usage in Frontend

```typescript
// Fetch funding rates from the mini-service
const response = await fetch('/api/funding/rates?XTransformPort=3010');
const data = await response.json();

// Data structure
interface FundingRateResponse {
  success: boolean;
  rates: Array<{
    symbol: string;
    exchange: string;
    rate: number;
    ratePercent: string;
    annualizedRate: number;
    markPrice?: number;
    indexPrice?: number;
    heatLevel: 'low' | 'medium' | 'high' | 'critical';
    heatScore: number;
    timestamp: string;
    source: 'websocket' | 'rest';
  }>;
  count: number;
  timestamp: string;
}
```

---

## Automatic Fallback Mechanism

The service implements automatic fallback from WebSocket to REST API:

1. **WebSocket Connected**: Real-time updates via WebSocket
2. **WebSocket Disconnected**: Automatic REST polling every 60 seconds
3. **Reconnection**: Automatic WebSocket reconnection every 5 seconds

```typescript
// REST polling only runs when WebSocket is not connected
async function pollRestFallback(exchange) {
  const status = exchangeStatuses.get(exchange);
  
  // Skip if WebSocket is connected and working
  if (status?.connected && status.source === "websocket") {
    return;
  }
  
  // Poll REST API...
}
```

---

## Alert System

The service logs alerts when funding rates are significantly high:

```typescript
// Alert when annualized rate > 50%
const annualized = Math.abs(rate.fundingRate) * 3 * 365;
if (annualized > 50) {
  console.log(`[ALERT] ${rate.exchange}:${rate.symbol} funding ${(rate.fundingRate * 100).toFixed(4)}% (${annualized.toFixed(0)}% annualized)`);
}
```

---

## Error Handling

- **WebSocket Errors**: Automatic reconnection with delay
- **REST Errors**: Logged and skipped, other exchanges continue
- **Parse Errors**: Silently ignored to prevent crashes

---

## Monitoring

### Check Service Status

```bash
curl http://localhost:3010/status
```

### Check Health

```bash
curl http://localhost:3010/health
```

### Get Funding Rates

```bash
# All rates
curl http://localhost:3010/rates

# Specific exchange
curl http://localhost:3010/rates?exchange=binance

# Specific symbol
curl http://localhost:3010/rates?symbol=BTCUSDT
```

---

## Logs

The service outputs detailed logs for monitoring:

```
========================================
  Funding Rate Service
  Port: 3010
  Symbols: 10
========================================

[Startup] Connecting WebSockets...
[Binance] Connecting WebSocket...
[Binance] WebSocket connected
[Bybit] Connecting WebSocket...
[Bybit] WebSocket connected
[Startup] Initial REST fetch...
[Binance] REST: Updated 10 symbols
[BingX] REST: Updated 10 symbols
[ALERT] binance:DOGEUSDT funding 0.0500% (54% annualized)
```

---

## Related Documentation

- [Funding Rates Component](/docs/components/FUNDING_RATES.md) - Frontend component documentation
- [Exchange Integration](/docs/exchanges/) - Exchange API documentation
- [Microservices Overview](/docs/microservices/) - All microservices

---

## Changelog

### v1.0.0 (March 2026)

- Initial release
- WebSocket support for Binance, Bybit, OKX, Bitget
- REST API fallback for all 5 exchanges
- Heat level calculation
- Alert system for high funding rates
- HTTP API for data access
