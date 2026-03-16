# KuCoin API Documentation

> Official documentation: https://www.kucoin.com/docs/

## Table of Contents

1. [Overview](#overview)
2. [API Configuration](#api-configuration)
3. [Authentication](#authentication)
4. [Market Data Endpoints](#market-data-endpoints)
5. [Trading Operations](#trading-operations)
6. [WebSocket Streams](#websocket-streams)
7. [Rate Limits](#rate-limits)
8. [Error Codes](#error-codes)
9. [Code Examples](#code-examples)

---

## Overview

KuCoin provides comprehensive API access to its trading platform, supporting both spot and futures trading. The API offers:

- **REST API**: For order management, account data, and market data
- **WebSocket API**: For real-time data streams
- **FIX API**: For institutional traders

### Supported Features

| Feature | Spot | Futures |
|---------|------|---------|
| Market Orders | ✅ | ✅ |
| Limit Orders | ✅ | ✅ |
| Stop Orders | ✅ | ✅ |
| OCO Orders | ✅ | ❌ |
| Margin Trading | ✅ | ❌ |
| WebSocket | ✅ | ✅ |
| Sub-accounts | ✅ | ✅ |

---

## API Configuration

### REST API URLs

| Environment | URL |
|------------|-----|
| Spot (Main) | `https://api.kucoin.com` |
| Futures (Main) | `https://api-futures.kucoin.com` |
| Spot (Testnet) | `https://openapi-sandbox.kucoin.com` |
| Futures (Testnet) | `https://api-sandbox-futures.kucoin.com` |

### WebSocket URLs

| Environment | URL |
|------------|-----|
| Spot Public | `wss://ws-api.kucoin.com` |
| Spot Private | `wss://ws-api.kucoin.com` |
| Futures Public | `wss://ws-api-futures.kucoin.com` |
| Futures Private | `wss://ws-api-futures.kucoin.com` |

### API Version

```
Spot API: /api/v1/, /api/v2/, /api/v3/
Futures API: /api/v1/
```

---

## Authentication

### API Key Requirements

KuCoin requires three credentials:
- **API Key**: Public identifier
- **API Secret**: Used for signature generation
- **API Passphrase**: User-defined passphrase for additional security

### Signature Generation

```typescript
import crypto from 'crypto';

function generateSignature(
  timestamp: string,
  method: string,
  requestPath: string,
  body: string,
  secretKey: string
): string {
  const preHash = timestamp + method + requestPath + body;
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(preHash)
    .digest('base64');
  return signature;
}

// Generate passphrase hash
function generatePassphrase(passphrase: string, secretKey: string): string {
  return crypto
    .createHmac('sha256', secretKey)
    .update(passphrase)
    .digest('base64');
}
```

### Required Headers

| Header | Description |
|--------|-------------|
| `KC-API-KEY` | Your API key |
| `KC-API-SIGN` | Request signature |
| `KC-API-TIMESTAMP` | UTC timestamp in milliseconds |
| `KC-API-PASSPHRASE` | Hashed passphrase |
| `KC-API-KEY-VERSION` | API key version (usually `2`) |

### Authentication Example

```typescript
import axios from 'axios';
import crypto from 'crypto';

const apiKey = 'your-api-key';
const secretKey = 'your-secret-key';
const passphrase = 'your-passphrase';

// Hash the passphrase
const hashedPassphrase = crypto
  .createHmac('sha256', secretKey)
  .update(passphrase)
  .digest('base64');

async function authenticatedRequest(
  method: 'GET' | 'POST' | 'DELETE',
  endpoint: string,
  body?: object
) {
  const timestamp = Date.now().toString();
  const bodyString = body ? JSON.stringify(body) : '';
  
  const signature = generateSignature(
    timestamp,
    method,
    endpoint,
    bodyString,
    secretKey
  );

  const headers = {
    'KC-API-KEY': apiKey,
    'KC-API-SIGN': signature,
    'KC-API-TIMESTAMP': timestamp,
    'KC-API-PASSPHRASE': hashedPassphrase,
    'KC-API-KEY-VERSION': '2',
    'Content-Type': 'application/json'
  };

  const url = `https://api.kucoin.com${endpoint}`;
  
  const response = await axios({
    method,
    url,
    headers,
    data: body
  });

  return response.data;
}
```

---

## Market Data Endpoints

### Get All Tickers

```
GET /api/v1/market/allTickers
```

**Response:**
```json
{
  "code": "200000",
  "data": {
    "ticker": [
      {
        "symbol": "BTC-USDT",
        "symbolName": "BTC-USDT",
        "buy": "50000.0",
        "sell": "50001.0",
        "changeRate": "0.015",
        "changePrice": "750.0",
        "high": "51000.0",
        "low": "49000.0",
        "vol": "10000.0",
        "volValue": "500000000.0",
        "last": "50000.0"
      }
    ]
  }
}
```

### Get Order Book

```
GET /api/v1/market/orderbook/level2_{depth}
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | YES | Trading pair |
| depth | STRING | NO | 20, 100 (default 20) |

**Response:**
```json
{
  "code": "200000",
  "data": {
    "time": 1704067200000,
    "sequence": "1234567890",
    "bids": [
      ["50000.0", "1.5"],
      ["49999.0", "2.0"]
    ],
    "asks": [
      ["50001.0", "1.0"],
      ["50002.0", "0.5"]
    ]
  }
}
```

### Get Klines

```
GET /api/v1/market/candles
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | YES | Trading pair |
| type | STRING | YES | Kline type |
| startAt | LONG | NO | Start timestamp (seconds) |
| endAt | LONG | NO | End timestamp (seconds) |

**Kline Types:**
- `1min`, `3min`, `5min`, `15min`, `30min`
- `1hour`, `2hour`, `4hour`, `6hour`, `8hour`, `12hour`
- `1day`, `1week`, `1month`

**Response:**
```json
{
  "code": "200000",
  "data": [
    [
      "1704067200",  // Open time
      "50000.0",     // Open
      "51000.0",     // Close
      "51500.0",     // High
      "49500.0",     // Low
      "1000.0",      // Volume
      "50500000.0"   // Turnover
    ]
  ]
}
```

### Get Recent Trades

```
GET /api/v1/market/histories
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | YES | Trading pair |

---

## Trading Operations

### Place Order

```
POST /api/v1/orders
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | YES | Trading pair |
| side | STRING | YES | buy, sell |
| type | STRING | YES | limit, market |
| price | STRING | NO | Price (required for limit) |
| size | STRING | NO | Size (required for limit) |
| funds | STRING | NO | Funds (for market orders) |
| timeInForce | STRING | NO | GTC, GTT, IOC, FOK |
| cancelAfter | LONG | NO | Cancel after timestamp |
| postOnly | BOOLEAN | NO | Post only order |
| hidden | BOOLEAN | NO | Hidden order |
| iceberg | BOOLEAN | NO | Iceberg order |
| visibleSize | STRING | NO | Visible size for iceberg |
| clientOid | STRING | YES | Client order ID |

**Response:**
```json
{
  "code": "200000",
  "data": {
    "orderId": "64e1b2c3d4e5f6789012345"
  }
}
```

### Cancel Order

```
DELETE /api/v1/orders/{orderId}
```

### Cancel All Orders

```
DELETE /api/v1/orders
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | NO | Trading pair |

### Get Order Info

```
GET /api/v1/orders/{orderId}
```

**Response:**
```json
{
  "code": "200000",
  "data": {
    "id": "64e1b2c3d4e5f6789012345",
    "symbol": "BTC-USDT",
    "opType": "DEAL",
    "type": "limit",
    "side": "buy",
    "price": "50000.0",
    "size": "0.001",
    "funds": "0",
    "dealFunds": "50.0",
    "dealSize": "0.001",
    "fee": "0.03",
    "feeCurrency": "USDT",
    "stp": null,
    "stop": null,
    "stopTriggerPrice": null,
    "stopPrice": null,
    "timeInForce": "GTC",
    "postOnly": false,
    "hidden": false,
    "iceberg": false,
    "visibleSize": null,
    "cancelAfter": 0,
    "channel": "API",
    "clientOid": "my-order-123",
    "remark": null,
    "tags": null,
    "isActive": false,
    "cancelExist": false,
    "createdAt": 1704067200000,
    "tradeType": "TRADE"
  }
}
```

### Get Open Orders

```
GET /api/v1/orders
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| status | STRING | NO | active, done (default active) |
| symbol | STRING | NO | Trading pair |
| side | STRING | NO | buy, sell |
| type | STRING | NO | limit, market |

---

## Account Endpoints

### Get Account List

```
GET /api/v1/accounts
```

**Response:**
```json
{
  "code": "200000",
  "data": [
    {
      "id": "64e1b2c3d4e5f6789012345",
      "currency": "USDT",
      "type": "trade",
      "balance": "10000.0",
      "available": "9500.0",
      "holds": "500.0"
    }
  ]
}
```

### Get Account Balance

```
GET /api/v1/account-balance
```

---

## Futures API

### Get Position

```
GET /api/v1/positions
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | NO | Contract symbol |

**Response:**
```json
{
  "code": "200000",
  "data": [
    {
      "id": "64e1b2c3d4e5f6789012345",
      "symbol": "XBTUSDTM",
      "autoDeposit": false,
      "maintMargin": "50.0",
      "maintMarginRate": "0.005",
      "riskLimit": "1000000",
      "realLeverage": "10.0",
      "crossMode": false,
      "delevPercentage": "0.88",
      "openingTimestamp": 1704067200000,
      "currentTimestamp": 1704070800000,
      "currentQty": "1.0",
      "currentCost": "50000.0",
      "currentComm": "0.03",
      "unrealisedCost": "50000.0",
      "realisedGrossPnl": "0.0",
      "realisedPnl": "-0.03",
      "openOrderBuyQty": "0",
      "openOrderSellQty": "0",
      "markPrice": "50500.0",
      "markValue": "50500.0",
      "posCost": "50000.0",
      "posCross": "0.0",
      "posInit": "5000.0",
      "posComm": "0.03",
      "posLoss": "0.0",
      "posMargin": "5000.0",
      "posMaint": "250.0",
      "maintMargin": "50.0",
      "avgEntryPrice": "50000.0",
      "liquidationPrice": "45000.0",
      "bankruptPrice": "45500.0",
      "settleCurrency": "USDT",
      "isInverse": false
    }
  ]
}
```

### Place Futures Order

```
POST /api/v1/orders
```

**Parameters (Futures):**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | YES | Contract symbol |
| side | STRING | YES | buy, sell |
| type | STRING | YES | limit, market |
| leverage | STRING | NO | Leverage (1-100) |
| price | STRING | NO | Price (required for limit) |
| size | STRING | YES | Contract size |
| timeInForce | STRING | NO | GTC, IOC, FOK |
| postOnly | BOOLEAN | NO | Post only |
| reduceOnly | BOOLEAN | NO | Reduce position only |
| clientOid | STRING | YES | Client order ID |

---

## WebSocket Streams

### Connection Flow

1. **POST /api/v1/bullet-public** - Get WebSocket server and token (public)
2. **POST /api/v1/bullet-private** - Get WebSocket server and token (private)
3. **Connect** to the WebSocket URL with token
4. **Subscribe** to channels

### Get WebSocket Token

```typescript
// Public channels
const bulletResponse = await axios.post('https://api.kucoin.com/api/v1/bullet-public');
const { token, instanceServers } = bulletResponse.data.data;

// Private channels (requires authentication)
const bulletResponse = await authenticatedRequest('POST', '/api/v1/bullet-private');
```

**Response:**
```json
{
  "code": "200000",
  "data": {
    "token": "v2lZ2tGg3M7JQvQZ7hZJg8L9Kp0M3nQ1",
    "instanceServers": [
      {
        "endpoint": "wss://ws-api.kucoin.com",
        "protocol": "websocket",
        "encrypt": true,
        "pingInterval": 18000,
        "pingTimeout": 10000
      }
    ]
  }
}
```

### WebSocket Connection

```typescript
import WebSocket from 'ws';

const token = 'your-websocket-token';
const connectId = Date.now();
const wsUrl = `wss://ws-api.kucoin.com?token=${token}&connectId=${connectId}`;

const ws = new WebSocket(wsUrl);

ws.on('open', () => {
  console.log('Connected to KuCoin WebSocket');
  
  // Subscribe to channels
  ws.send(JSON.stringify({
    id: 1,
    type: 'subscribe',
    topic: '/market/ticker:BTC-USDT',
    privateChannel: false,
    response: true
  }));
});

ws.on('message', (data) => {
  const message = JSON.parse(data.toString());
  console.log('Message:', message);
});

// Ping/pong to keep connection alive
setInterval(() => {
  ws.send(JSON.stringify({
    id: Date.now(),
    type: 'ping'
  }));
}, 18000);
```

### Available Channels

#### Public Channels

| Channel | Topic | Description |
|---------|-------|-------------|
| Ticker | `/market/ticker:{symbol}` | Real-time ticker updates |
| Order Book | `/spotMarket/level2Depth50:{symbol}` | Level 2 order book |
| Match Engine | `/market/match:{symbol}` | Trade executions |
| Klines | `/market/candles:{symbol}_{type}` | Kline data |

#### Private Channels

| Channel | Topic | Description |
|---------|-------|-------------|
| Account Balance | `/account/balance` | Balance updates |
| Order Changes | `/spotMarket/tradeOrders` | Order updates |
| Stop Order | `/spotMarket/advancedOrders` | Stop order updates |

### Channel Examples

#### Ticker Channel

```typescript
// Subscribe
ws.send(JSON.stringify({
  id: 1,
  type: 'subscribe',
  topic: '/market/ticker:BTC-USDT'
}));
```

**Payload:**
```json
{
  "type": "message",
  "topic": "/market/ticker:BTC-USDT",
  "subject": "trade.ticker",
  "data": {
    "sequence": "1234567890",
    "price": "50000.0",
    "size": "0.001",
    "bestAsk": "50001.0",
    "bestAskSize": "1.0",
    "bestBid": "50000.0",
    "bestBidSize": "1.5",
    "time": 1704067200000
  }
}
```

#### Order Book Channel

```typescript
// Subscribe to Level 2 order book
ws.send(JSON.stringify({
  id: 1,
  type: 'subscribe',
  topic: '/spotMarket/level2Depth50:BTC-USDT'
}));
```

**Payload:**
```json
{
  "type": "message",
  "topic": "/spotMarket/level2Depth50:BTC-USDT",
  "subject": "level2",
  "data": {
    "asks": [
      ["50001.0", "1.0"],
      ["50002.0", "0.5"]
    ],
    "bids": [
      ["50000.0", "1.5"],
      ["49999.0", "2.0"]
    ],
    "timestamp": 1704067200000
  }
}
```

#### Private Order Updates

```typescript
// Subscribe to order updates (requires private token)
ws.send(JSON.stringify({
  id: 1,
  type: 'subscribe',
  topic: '/spotMarket/tradeOrders',
  privateChannel: true
}));
```

**Payload:**
```json
{
  "type": "message",
  "topic": "/spotMarket/tradeOrders",
  "subject": "orderChange",
  "data": {
    "orderId": "64e1b2c3d4e5f6789012345",
    "symbol": "BTC-USDT",
    "type": "limit",
    "side": "buy",
    "price": "50000.0",
    "size": "0.001",
    "orderTime": 1704067200000,
    "status": "open",
    "filledSize": "0.0005",
    "dealFunds": "25.0",
    "remainSize": "0.0005",
    "fee": "0.015",
    "feeCurrency": "USDT"
  }
}
```

---

## Rate Limits

### REST API Rate Limits

| Endpoint Category | Limit |
|-------------------|-------|
| Public Market Data | 30 requests/3s per IP |
| Private Trading | 45 requests/3s per API Key |
| Private Account | 30 requests/3s per API Key |
| Others | 30 requests/3s per IP |

### Rate Limit Headers

```typescript
const headers = {
  'X-RateLimit-Remaining': '25',    // Remaining requests
  'X-RateLimit-Limit': '30',        // Limit per window
  'X-RateLimit-Reset': '1704067230' // Reset timestamp
};
```

### WebSocket Rate Limits

| Action | Limit |
|--------|-------|
| Connections | 100 per IP |
| Subscriptions | 100 per connection |
| Messages | 100 per 10 seconds |

---

## Order Types

| Type | Description | Spot | Futures |
|------|-------------|------|---------|
| `limit` | Limit order | ✅ | ✅ |
| `market` | Market order | ✅ | ✅ |
| `limit_stop` | Stop limit order | ✅ | ✅ |
| `market_stop` | Stop market order | ✅ | ✅ |

### Time In Force Options

| Option | Description |
|--------|-------------|
| `GTC` | Good Till Cancel |
| `GTT` | Good Till Time |
| `IOC` | Immediate Or Cancel |
| `FOK` | Fill Or Kill |

---

## Error Codes

### General Errors

| Code | Description |
|------|-------------|
| 200000 | Success |
| 400001 | Bad request |
| 400002 | Invalid request format |
| 400003 | Invalid API key |
| 400004 | Invalid signature |
| 400005 | Invalid timestamp |
| 400006 | Invalid passphrase |
| 400007 | API key not found |
| 400008 | IP not whitelisted |
| 400009 | Insufficient permissions |

### Order Errors

| Code | Description |
|------|-------------|
| 200001 | Order placement failed |
| 200002 | Order cancellation failed |
| 200003 | Order not found |
| 200004 | Order already cancelled |
| 200005 | Order already filled |
| 200006 | Insufficient balance |
| 200007 | Invalid order size |
| 200008 | Invalid order price |
| 200009 | Order would trigger immediately |
| 200010 | Position not found |
| 200011 | Position size exceeds limit |
| 200012 | Leverage exceeds limit |

### Rate Limit Errors

| Code | Description |
|------|-------------|
| 429000 | Too many requests |
| 429001 | Rate limit exceeded |

### System Errors

| Code | Description |
|------|-------------|
| 500000 | Internal server error |
| 500001 | Service unavailable |
| 500002 | System maintenance |
| 500003 | Market closed |

---

## Code Examples

### Create Client

```typescript
import axios from 'axios';
import crypto from 'crypto';

class KuCoinClient {
  private apiKey: string;
  private secretKey: string;
  private passphrase: string;
  private baseUrl: string;

  constructor(
    apiKey: string,
    secretKey: string,
    passphrase: string,
    testnet: boolean = false
  ) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.passphrase = passphrase;
    this.baseUrl = testnet
      ? 'https://openapi-sandbox.kucoin.com'
      : 'https://api.kucoin.com';
  }

  private sign(timestamp: string, method: string, path: string, body: string = ''): string {
    const preHash = timestamp + method + path + body;
    return crypto
      .createHmac('sha256', this.secretKey)
      .update(preHash)
      .digest('base64');
  }

  private getPassphrase(): string {
    return crypto
      .createHmac('sha256', this.secretKey)
      .update(this.passphrase)
      .digest('base64');
  }

  async request(method: string, endpoint: string, body?: object) {
    const timestamp = Date.now().toString();
    const bodyString = body ? JSON.stringify(body) : '';
    const signature = this.sign(timestamp, method, endpoint, bodyString);

    const headers: Record<string, string> = {
      'KC-API-KEY': this.apiKey,
      'KC-API-SIGN': signature,
      'KC-API-TIMESTAMP': timestamp,
      'KC-API-PASSPHRASE': this.getPassphrase(),
      'KC-API-KEY-VERSION': '2',
      'Content-Type': 'application/json'
    };

    const response = await axios({
      method,
      url: `${this.baseUrl}${endpoint}`,
      headers,
      data: body
    });

    return response.data;
  }

  // Market data methods
  async getTicker(symbol: string) {
    return this.request('GET', `/api/v1/market/orderbook/level1?symbol=${symbol}`);
  }

  async getOrderBook(symbol: string, depth: number = 20) {
    return this.request('GET', `/api/v1/market/orderbook/level2_${depth}?symbol=${symbol}`);
  }

  async getKlines(symbol: string, type: string) {
    return this.request('GET', `/api/v1/market/candles?symbol=${symbol}&type=${type}`);
  }

  // Account methods
  async getAccounts() {
    return this.request('GET', '/api/v1/accounts');
  }

  async getBalance() {
    return this.request('GET', '/api/v1/account-balance');
  }

  // Order methods
  async placeOrder(params: {
    symbol: string;
    side: 'buy' | 'sell';
    type: 'limit' | 'market';
    price?: string;
    size?: string;
    funds?: string;
    clientOid: string;
  }) {
    return this.request('POST', '/api/v1/orders', params);
  }

  async cancelOrder(orderId: string) {
    return this.request('DELETE', `/api/v1/orders/${orderId}`);
  }

  async getOrder(orderId: string) {
    return this.request('GET', `/api/v1/orders/${orderId}`);
  }

  async getOpenOrders(symbol?: string) {
    const query = symbol ? `?symbol=${symbol}` : '';
    return this.request('GET', `/api/v1/orders${query}`);
  }
}

// Usage
const client = new KuCoinClient(
  'your-api-key',
  'your-secret-key',
  'your-passphrase'
);

const ticker = await client.getTicker('BTC-USDT');
console.log(ticker);
```

### Place Order Example

```typescript
// Place a limit buy order
const order = await client.placeOrder({
  symbol: 'BTC-USDT',
  side: 'buy',
  type: 'limit',
  price: '50000',
  size: '0.001',
  clientOid: `order-${Date.now()}`
});

console.log('Order placed:', order.data.orderId);

// Place a market sell order
const marketOrder = await client.placeOrder({
  symbol: 'BTC-USDT',
  side: 'sell',
  type: 'market',
  funds: '100', // Sell 100 USDT worth of BTC
  clientOid: `market-order-${Date.now()}`
});

console.log('Market order placed:', marketOrder.data.orderId);
```

### Get Positions Example (Futures)

```typescript
class KuCoinFuturesClient extends KuCoinClient {
  constructor(apiKey: string, secretKey: string, passphrase: string, testnet: boolean = false) {
    super(apiKey, secretKey, passphrase, testnet);
    this.baseUrl = testnet
      ? 'https://api-sandbox-futures.kucoin.com'
      : 'https://api-futures.kucoin.com';
  }

  async getPositions(symbol?: string) {
    const query = symbol ? `?symbol=${symbol}` : '';
    return this.request('GET', `/api/v1/positions${query}`);
  }

  async placeFuturesOrder(params: {
    symbol: string;
    side: 'buy' | 'sell';
    type: 'limit' | 'market';
    leverage: string;
    price?: string;
    size: string;
    clientOid: string;
  }) {
    return this.request('POST', '/api/v1/orders', params);
  }

  async setLeverage(symbol: string, leverage: string) {
    return this.request('POST', '/api/v1/position/update-user-leverage', {
      symbol,
      leverage
    });
  }
}

// Usage
const futuresClient = new KuCoinFuturesClient(
  'your-api-key',
  'your-secret-key',
  'your-passphrase'
);

// Set leverage
await futuresClient.setLeverage('XBTUSDTM', '10');

// Place futures order
const futuresOrder = await futuresClient.placeFuturesOrder({
  symbol: 'XBTUSDTM',
  side: 'buy',
  type: 'limit',
  leverage: '10',
  price: '50000',
  size: '1',
  clientOid: `futures-order-${Date.now()}`
});

// Get positions
const positions = await futuresClient.getPositions();
console.log('Positions:', positions.data);
```

---

## Best Practices

1. **Time Synchronization**: Ensure server time is synced with NTP
2. **Passphrase Security**: Use a strong passphrase and never expose it
3. **Rate Limiting**: Monitor rate limit headers and implement backoff
4. **WebSocket Reconnection**: Implement automatic reconnection with token refresh
5. **Order Management**: Use `clientOid` for idempotency
6. **Error Handling**: Parse error codes and implement appropriate recovery
7. **Testnet Testing**: Always test new strategies on testnet first

---

## Official Resources

| Resource | URL |
|----------|-----|
| API Documentation | https://www.kucoin.com/docs/ |
| API Status | https://status.kucoin.com/ |
| API Announcement | https://www.kucoin.com/docs/notice |
| SDK (JavaScript) | https://github.com/Kucoin/kucoin-node-sdk |
| SDK (Python) | https://github.com/Kucoin/kucoin-python-sdk |
| SDK (Go) | https://github.com/Kucoin/kucoin-go-sdk |
