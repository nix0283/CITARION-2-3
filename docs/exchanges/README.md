# CITARION Exchange Integration Documentation

**Version:** 2.0 | **Last Updated:** March 2026 | **Supported Exchanges:** 12

---

## 📋 Overview

CITARION provides unified access to 12 cryptocurrency exchanges through a standardized interface, enabling seamless multi-exchange trading.

### Supported Exchanges

| Exchange | Type | Trading | Testnet | Demo | WebSocket | Copy Trading |
|----------|------|---------|---------|------|-----------|--------------|
| **Binance** | CEX | ✅ | ✅ | ❌ | ✅ | ✅ Master/Follower |
| **Bybit** | CEX | ✅ | ✅ | ❌ | ✅ | ✅ Master/Follower |
| **OKX** | CEX | ✅ | ❌ | ✅ | ✅ | ✅ Master/Follower |
| **Bitget** | CEX | ✅ | ❌ | ✅ | ✅ | ✅ Master/Follower |
| **BingX** | CEX | ✅ | ❌ | ✅ | ✅ | ✅ Master/Follower |
| **KuCoin** | CEX | ✅ | ❌ | ❌ | ✅ | ❌ |
| **HTX/Huobi** | CEX | ✅ | ❌ | ❌ | ✅ | ❌ |
| **HyperLiquid** | DEX | ✅ | ❌ | ❌ | ✅ | ❌ |
| **BitMEX** | CEX | ✅ | ✅ | ❌ | ✅ | ❌ |
| **BloFin** | CEX | ✅ | ❌ | ✅ | ✅ | ❌ |
| **Coinbase** | CEX | ✅ | ❌ | ❌ | ✅ | ❌ |
| **Aster DEX** | DEX | ✅ | ❌ | ❌ | ✅ | ❌ |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        EXCHANGE INTEGRATION ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                      EXCHANGE FACTORY                                    │    │
│  │                      createExchangeClient()                              │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
│                                    │                                             │
│              ┌─────────────────────┼─────────────────────┐                      │
│              │                     │                     │                      │
│              ▼                     ▼                     ▼                      │
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐          │
│  │   BaseExchange    │  │   BaseExchange    │  │   BaseExchange    │          │
│  │   Client          │  │   Client          │  │   Client          │          │
│  │                   │  │                   │  │                   │          │
│  │   - Binance       │  │   - Bybit         │  │   - OKX           │          │
│  │   - KuCoin        │  │   - Bitget        │  │   - BingX         │          │
│  │   - HTX           │  │   - BitMEX        │  │   - HyperLiquid   │          │
│  │   - BloFin        │  │   - Coinbase      │  │   - Aster DEX     │          │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘          │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Quick Start

### Creating an Exchange Client

```typescript
import { createExchangeClient } from '@/lib/exchange';

// Create Binance client
const binance = createExchangeClient({
  exchange: 'binance',
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
  testnet: false
});

// Create Bybit client
const bybit = createExchangeClient({
  exchange: 'bybit',
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
  testnet: true // Use testnet
});
```

### Basic Operations

```typescript
// Get account balance
const balance = await client.getBalance();

// Get current price
const ticker = await client.getTicker('BTCUSDT');

// Place order
const order = await client.createOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: 0.001,
  price: 50000
});

// Get open positions
const positions = await client.getPositions();

// Cancel order
await client.cancelOrder('BTCUSDT', 'orderId');
```

---

## 📚 Exchange Documentation

### Centralized Exchanges (CEX)

| Exchange | Documentation | Features |
|----------|---------------|----------|
| **Binance** | [binance/README.md](binance/README.md) | Spot, Futures, Inverse Futures |
| **Bybit** | [bybit/README.md](bybit/README.md) | V5 API, Spot, Futures, Options |
| **OKX** | [okx/README.md](okx/README.md) | Spot, Futures, Demo Mode |
| **Bitget** | [bitget/README.md](bitget/README.md) | Spot, Futures, Copy Trading |
| **BingX** | [bingx/README.md](bingx/README.md) | Spot, Futures, Copy Trading |
| **KuCoin** | [kucoin/README.md](kucoin/README.md) | Spot, Futures |
| **HTX/Huobi** | [htx/README.md](htx/README.md) | Spot, Futures |
| **BitMEX** | [bitmex/README.md](bitmex/README.md) | Derivatives, Testnet |
| **BloFin** | [blofin/README.md](blofin/README.md) | Spot, Futures, Demo |
| **Coinbase** | [coinbase/README.md](coinbase/README.md) | Spot |

### Decentralized Exchanges (DEX)

| Exchange | Documentation | Features |
|----------|---------------|----------|
| **HyperLiquid** | [hyperliquid/README.md](hyperliquid/README.md) | Perpetuals |
| **Aster DEX** | [aster/README.md](aster/README.md) | Up to 1001x Leverage |

---

## 📡 Common API Interface

### BaseExchangeClient Interface

```typescript
interface BaseExchangeClient {
  // Account
  getBalance(): Promise<Balance>;
  
  // Market Data
  getTicker(symbol: string): Promise<Ticker>;
  getOrderbook(symbol: string, limit?: number): Promise<Orderbook>;
  getKlines(symbol: string, interval: string, limit?: number): Promise<Candle[]>;
  
  // Trading
  createOrder(params: OrderParams): Promise<Order>;
  cancelOrder(symbol: string, orderId: string): Promise<void>;
  cancelAllOrders(symbol?: string): Promise<void>;
  getOpenOrders(symbol?: string): Promise<Order[]>;
  getOrder(symbol: string, orderId: string): Promise<Order>;
  
  // Positions (Futures)
  getPositions(): Promise<Position[]>;
  setLeverage(symbol: string, leverage: number): Promise<void>;
  setPositionMode(hedgeMode: boolean): Promise<void>;
  
  // WebSocket
  subscribeToTicker(symbol: string, callback: Function): void;
  subscribeToOrderbook(symbol: string, callback: Function): void;
  subscribeToKlines(symbol: string, interval: string, callback: Function): void;
  
  // Utils
  getMinNotional(symbol: string): number;
  getPrecision(symbol: string): { price: number; quantity: number };
  formatQuantity(symbol: string, quantity: number): string;
  formatPrice(symbol: string, price: number): string;
}
```

---

## 🔒 API Key Configuration

### Environment Variables

```env
# Binance
BINANCE_API_KEY="your-api-key"
BINANCE_API_SECRET="your-api-secret"

# Bybit
BYBIT_API_KEY="your-api-key"
BYBIT_API_SECRET="your-api-secret"

# OKX
OKX_API_KEY="your-api-key"
OKX_API_SECRET="your-api-secret"
OKX_PASSPHRASE="your-passphrase"

# Bitget
BITGET_API_KEY="your-api-key"
BITGET_API_SECRET="your-api-secret"
BITGET_PASSPHRASE="your-passphrase"

# BingX
BINGX_API_KEY="your-api-key"
BINGX_API_SECRET="your-api-secret"
```

### UI Configuration

Navigate to **Settings → Exchanges** in the dashboard to configure API keys through the UI. Keys are encrypted with AES-256-GCM before storage.

---

## 💰 Trading Fees

See [TRADING_FEES.md](TRADING_FEES.md) for a complete comparison of trading fees across all exchanges.

### Fee Comparison Summary

| Exchange | Maker | Taker | VIP Discount |
|----------|-------|-------|--------------|
| Binance | 0.02% | 0.04% | Up to 0.012% |
| Bybit | 0.02% | 0.055% | Up to 0.01% |
| OKX | 0.02% | 0.05% | Up to 0.02% |
| Bitget | 0.02% | 0.06% | Up to 0.02% |
| BingX | 0.02% | 0.05% | Volume-based |

---

## ⚠️ Error Handling

### Common Error Codes

See [error-codes.md](error-codes.md) for complete error code reference.

| Code | Description | Action |
|------|-------------|--------|
| `INSUFFICIENT_BALANCE` | Not enough balance | Check account balance |
| `INVALID_SYMBOL` | Symbol not found | Verify symbol format |
| `RATE_LIMIT` | Rate limit exceeded | Reduce request frequency |
| `ORDER_REJECTED` | Order rejected by exchange | Check order parameters |
| `POSITION_LIMIT` | Position limit exceeded | Reduce position size |

### Error Handling Example

```typescript
try {
  const order = await client.createOrder(params);
} catch (error) {
  if (error.code === 'INSUFFICIENT_BALANCE') {
    // Handle insufficient balance
  } else if (error.code === 'RATE_LIMIT') {
    // Wait and retry
    await sleep(1000);
    // Retry order
  }
}
```

---

## 🔄 Failover Strategy

See [EXCHANGE_FAILOVER.md](EXCHANGE_FAILOVER.md) for complete failover documentation.

### Automatic Failover

```typescript
import { ExchangeFailover } from '@/lib/exchange/failover';

const failover = new ExchangeFailover({
  primary: 'binance',
  fallbacks: ['bybit', 'okx']
});

// Automatically fails over to fallback exchanges
const price = await failover.getPrice('BTCUSDT');
```

---

## 🩺 Health Checks

See [EXCHANGE_HEALTH_CHECK.md](EXCHANGE_HEALTH_CHECK.md) for health check configuration.

### Health Check Endpoint

```http
GET /api/exchange/health
```

**Response:**
```json
{
  "binance": {
    "status": "healthy",
    "latency": 45,
    "lastUpdate": 1700000000000
  },
  "bybit": {
    "status": "healthy",
    "latency": 38,
    "lastUpdate": 1700000000000
  }
}
```

---

## 📋 Compliance

See [COMPLIANCE_REPORT.md](COMPLIANCE_REPORT.md) for regulatory compliance information.

### Regional Restrictions

| Exchange | US | EU | Asia | Notes |
|----------|----|----|------|-------|
| Binance | ⚠️ | ✅ | ✅ | Binance.US separate |
| Bybit | ❌ | ✅ | ✅ | Not available in US |
| OKX | ❌ | ✅ | ✅ | Not available in US |
| Bitget | ❌ | ✅ | ✅ | Not available in US |

---

## 🤝 Copy Trading

See [copy-trading.md](../trading/copy-trading.md) for copy trading documentation.

### Supported Exchanges

| Exchange | Master Mode | Follower Mode |
|----------|-------------|---------------|
| Binance | ✅ | ✅ |
| Bybit | ✅ | ✅ |
| OKX | ✅ | ✅ |
| Bitget | ✅ | ✅ |
| BingX | ✅ | ✅ |

---

## 📖 Related Documentation

- [Exchange Integration Guide](../business-logic/EXCHANGE_INTEGRATION_GUIDE.md)
- [Trading System Architecture](../trading/TRADING_SYSTEM_ARCHITECTURE.md)
- [API Specification](../architecture/API_SPECIFICATION.md)

---

*Last updated: March 2026 | CITARION Documentation Team*
