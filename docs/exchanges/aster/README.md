# Aster DEX Exchange Integration

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Overview

Aster is a decentralized exchange (DEX) offering high-leverage perpetual futures trading with up to 1001x leverage.

| Feature | Status |
|---------|--------|
| **Spot Trading** | ❌ Not available |
| **Perpetual Futures** | ✅ Supported |
| **Demo Trading** | ❌ Not available |
| **WebSocket** | ✅ Real-time data |
| **Max Leverage** | ✅ Up to 1001x |

⚠️ **Risk Warning**: Trading with high leverage carries significant risk of liquidation and total loss of funds.

---

## 🔧 API Configuration

### REST API

| Environment | URL |
|-------------|-----|
| **Mainnet** | `https://api.aster.exchange` |
| **Testnet** | `https://api-testnet.aster.exchange` |

### WebSocket

| Environment | URL |
|-------------|-----|
| **Public** | `wss://ws.aster.exchange/public` |
| **Private** | `wss://ws.aster.exchange/private` |

---

## 🔐 Authentication

Aster uses wallet-based authentication (EVM-compatible wallets like MetaMask).

### Wallet Connection

```typescript
import { ethers } from 'ethers';

// Connect wallet
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const address = await signer.getAddress();

// Sign message for authentication
const message = `Login to Aster at ${Date.now()}`;
const signature = await signer.signMessage(message);
```

### API Signature

```typescript
function generateSignature(
  method: string,
  path: string,
  body: string,
  privateKey: string
): string {
  const message = method + path + body;
  const wallet = new ethers.Wallet(privateKey);
  return wallet.signMessageSync(message);
}
```

---

## 📊 Market Data Endpoints

### Get Markets

```http
GET /api/v1/markets
```

**Response:**
```json
{
  "markets": [
    {
      "id": "BTC-USD-PERP",
      "base": "BTC",
      "quote": "USD",
      "type": "perpetual",
      "maxLeverage": 1001,
      "minSize": "0.001",
      "tickSize": "0.1"
    }
  ]
}
```

### Get Order Book

```http
GET /api/v1/orderbook?market=BTC-USD-PERP
```

### Get Funding Rate

```http
GET /api/v1/funding?market=BTC-USD-PERP
```

---

## 📈 Trading Operations

### Place Order

```http
POST /api/v1/orders
```

**Request Body:**
```json
{
  "market": "BTC-USD-PERP",
  "side": "buy",
  "type": "limit",
  "price": "67000",
  "size": "0.001",
  "leverage": 100
}
```

### Set Leverage

```http
POST /api/v1/leverage
```

**Request Body:**
```json
{
  "market": "BTC-USD-PERP",
  "leverage": 100
}
```

### Get Positions

```http
GET /api/v1/positions
```

---

## ⚠️ High Leverage Considerations

### Risk Management

| Leverage | Margin Requirement | Liquidation Distance |
|----------|-------------------|---------------------|
| 10x | 10% | ~9% |
| 50x | 2% | ~1.8% |
| 100x | 1% | ~0.9% |
| 500x | 0.2% | ~0.18% |
| 1001x | 0.1% | ~0.09% |

### Safety Recommendations

1. **Use Stop Loss**: Always set stop loss orders
2. **Monitor Positions**: Check positions frequently
3. **Avoid Max Leverage**: Start with lower leverage
4. **Position Sizing**: Use small position sizes with high leverage
5. **Liquidation Buffer**: Maintain extra margin

---

## 🔄 WebSocket Streams

### Connection

```javascript
const ws = new WebSocket('wss://ws.aster.exchange/public');

// Subscribe to channels
ws.send(JSON.stringify({
  type: 'subscribe',
  channel: 'orderbook',
  market: 'BTC-USD-PERP'
}));
```

### Available Channels

| Channel | Description |
|---------|-------------|
| `orderbook` | Order book updates |
| `trades` | Trade stream |
| `ticker` | Price ticker |
| `funding` | Funding rate updates |
| `positions` | Position updates (private) |
| `orders` | Order updates (private) |

---

## 📝 Order Types

| Type | Description |
|------|-------------|
| **limit** | Limit order |
| **market** | Market order |
| **stop_market** | Stop market order |
| **stop_limit** | Stop limit order |
| **take_profit** | Take profit order |

---

## ❌ Error Codes

| Code | Description |
|------|-------------|
| `INSUFFICIENT_MARGIN` | Not enough margin |
| `LEVERAGE_EXCEEDED` | Leverage above max |
| `POSITION_LIQUIDATED` | Position was liquidated |
| `MARKET_CLOSED` | Market is closed |
| `INVALID_SIZE` | Invalid position size |

---

## 📚 Related Documentation

- [../README.md](../README.md) - Exchange overview
- [../../risk/RISK_MODELS_DOCUMENTATION.md](../../business-logic/RISK_MODELS_DOCUMENTATION.md) - Risk management

---

*Last updated: March 2026 | CITARION Documentation Team*
