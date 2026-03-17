# HTX (Huobi) API Documentation

> Official documentation: https://www.htx.com/en-us/opend/newApiPages/

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

HTX (formerly Huobi) provides comprehensive API access to its trading platform, supporting spot, futures, and options trading. The API offers:

- **REST API**: For order management, account data, and market data
- **WebSocket API**: For real-time data streams
- **FIX API**: For institutional traders

### Supported Features

| Feature | Spot | Futures | Options |
|---------|------|---------|---------|
| Market Orders | ✅ | ✅ | ✅ |
| Limit Orders | ✅ | ✅ | ✅ |
| Stop Orders | ✅ | ✅ | ❌ |
| OCO Orders | ✅ | ❌ | ❌ |
| Margin Trading | ✅ | ❌ | ❌ |
| WebSocket | ✅ | ✅ | ✅ |

---

## API Configuration

### REST API URLs

| Environment | URL |
|------------|-----|
| Spot (Main) | `https://api.huobi.pro` |
| Spot (Alternative) | `https://api-aws.huobi.pro` |
| Futures (Main) | `https://api.hbdm.com` |
| Coin-M Futures | `https://api.hbdm.com` |
| USDT-M Futures | `https://api.hbdm.com` |
| Options | `https://api.hbdm.com` |
| Testnet Spot | `https://api-testnet.huobi.pro` |
| Testnet Futures | `https://api-testnet.hbdm.com` |

### WebSocket URLs

| Environment | URL |
|------------|-----|
| Spot Public | `wss://api.huobi.pro/ws` |
| Spot Private | `wss://api.huobi.pro/ws` |
| Futures Public | `wss://api.hbdm.com/ws` |
| Futures Private | `wss://api.hbdm.com/ws` |
| Options Public | `wss://api.hbdm.com/ws` |

### API Version

```
Spot API: /v1/, /v2/
Futures API: /api/v1/
```

---

## Authentication

### API Key Requirements

HTX requires two credentials:
- **API Key**: Public identifier
- **Secret Key**: Used for signature generation

### Signature Generation

```typescript
import crypto from 'crypto';

function generateSignature(
  method: string,
  host: string,
  path: string,
  params: Record<string, string>,
  secretKey: string
): string {
  // Sort parameters alphabetically
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');

  // Create pre-hash string
  const preHash = `${method}\n${host}\n${path}\n${sortedParams}`;

  // Generate HMAC SHA256 signature
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(preHash)
    .digest('base64');

  return signature;
}
```

### Required Parameters

All authenticated requests require:
| Parameter | Description |
|-----------|-------------|
| `AccessKeyId` | Your API key |
| `SignatureMethod` | `HmacSHA256` |
| `SignatureVersion` | `2` |
| `Timestamp` | UTC timestamp in format `YYYY-MM-DDThh:mm:ss` |
| `Signature` | Request signature |

### Authentication Example

```typescript
import axios from 'axios';
import crypto from 'crypto';

const apiKey = 'your-api-key';
const secretKey = 'your-secret-key';
const host = 'api.huobi.pro';

function getTimestamp(): string {
  return new Date().toISOString().replace(/\.\d{3}Z$/, '');
}

async function authenticatedRequest(
  method: 'GET' | 'POST',
  path: string,
  params: Record<string, string> = {}
) {
  const timestamp = getTimestamp();
  
  const allParams = {
    AccessKeyId: apiKey,
    SignatureMethod: 'HmacSHA256',
    SignatureVersion: '2',
    Timestamp: timestamp,
    ...params
  };

  const signature = generateSignature(method, host, path, allParams, secretKey);
  
  const queryString = Object.keys(allParams)
    .sort()
    .map(key => `${key}=${encodeURIComponent(allParams[key])}`)
    .join('&') + `&Signature=${encodeURIComponent(signature)}`;

  const url = `https://${host}${path}?${queryString}`;

  const response = await axios({
    method,
    url
  });

  return response.data;
}
```

---

## Market Data Endpoints

### Get All Tickers

```
GET /market/tickers
```

**Response:**
```json
{
  "status": "ok",
  "data": [
    {
      "symbol": "btcusdt",
      "open": "49000.00",
      "high": "51000.00",
      "low": "48500.00",
      "close": "50000.00",
      "amount": "12345.67",
      "vol": "617283500.00",
      "count": 98765,
      "bid": "49999.00",
      "bidSize": "1.234",
      "ask": "50001.00",
      "askSize": "2.345",
      "lastPrice": "50000.00",
      "lastSize": "0.5"
    }
  ]
}
```

### Get Order Book

```
GET /market/depth
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | YES | Trading pair |
| depth | INT | NO | Depth level (5, 10, 20) |
| type | STRING | NO | `step0`, `step1`, `step2` |

**Response:**
```json
{
  "status": "ok",
  "ch": "market.btcusdt.depth.step0",
  "ts": 1704067200000,
  "tick": {
    "bids": [
      [50000.00, 1.5],
      [49999.00, 2.0]
    ],
    "asks": [
      [50001.00, 1.0],
      [50002.00, 0.5]
    ],
    "version": 1234567890,
    "ts": 1704067200000
  }
}
```

### Get Klines

```
GET /market/history/kline
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | YES | Trading pair |
| period | STRING | YES | Kline period |
| size | INT | NO | Number of candles (default 150, max 2000) |

**Period Types:**
- `1min`, `5min`, `15min`, `30min`, `60min`
- `4hour`, `1day`, `1mon`, `1week`, `1year`

**Response:**
```json
{
  "status": "ok",
  "data": [
    {
      "id": 1704067200,
      "open": 50000.00,
      "close": 51000.00,
      "low": 49500.00,
      "high": 51500.00,
      "amount": 1234.56,
      "vol": 61728000.00,
      "count": 12345
    }
  ]
}
```

### Get Recent Trades

```
GET /market/history/trade
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | YES | Trading pair |
| size | INT | NO | Number of trades (default 1, max 2000) |

**Response:**
```json
{
  "status": "ok",
  "data": [
    {
      "id": 1234567890,
      "ts": 1704067200000,
      "data": [
        {
          "id": 1234567890,
          "price": 50000.00,
          "amount": 0.5,
          "direction": "buy",
          "ts": 1704067200000
        }
      ]
    }
  ]
}
```

---

## Trading Operations

### Place Order

```
POST /v1/order/orders/place
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| account-id | STRING | YES | Account ID |
| symbol | STRING | YES | Trading pair |
| type | STRING | YES | Order type |
| amount | STRING | YES | Order amount |
| price | STRING | NO | Order price (required for limit) |
| source | STRING | NO | Order source |
| client-order-id | STRING | NO | Client order ID |
| self-match-prevent | INT | NO | Self-match prevention |

**Order Types:**
- `buy-market` - Market buy
- `sell-market` - Market sell
- `buy-limit` - Limit buy
- `sell-limit` - Limit sell
- `buy-ioc` - IOC buy
- `sell-ioc` - IOC sell
- `buy-limit-maker` - Post only buy
- `sell-limit-maker` - Post only sell
- `buy-stop-limit` - Stop limit buy
- `sell-stop-limit` - Stop limit sell

**Response:**
```json
{
  "status": "ok",
  "data": "123456789012345"
}
```

### Cancel Order

```
POST /v1/order/orders/{order-id}/submitcancel
```

### Cancel All Orders

```
POST /v1/order/orders/batchcancel
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| order-ids | ARRAY | YES | List of order IDs |

### Get Order Info

```
GET /v1/order/orders/{order-id}
```

**Response:**
```json
{
  "status": "ok",
  "data": {
    "id": 123456789012345,
    "symbol": "btcusdt",
    "account-id": 123456,
    "amount": "0.001",
    "price": "50000.00",
    "created-at": 1704067200000,
    "type": "buy-limit",
    "field-amount": "0.0005",
    "field-cash-amount": "25.00",
    "field-fees": "0.015",
    "finished-at": 1704070800000,
    "source": "api",
    "state": "filled",
    "canceled-at": 0
  }
}
```

### Get Open Orders

```
GET /v1/order/openOrders
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| account-id | STRING | YES | Account ID |
| symbol | STRING | NO | Trading pair |
| side | STRING | NO | buy, sell |
| size | INT | NO | Page size (default 10, max 500) |

### Order States

| State | Description |
|-------|-------------|
| `pre-submitted` | Pre-submitted |
| `submitting` | Submitting |
| `submitted` | Submitted |
| `partial-filled` | Partially filled |
| `partial-canceled` | Partially filled then canceled |
| `filled` | Fully filled |
| `canceled` | Canceled |

---

## Account Endpoints

### Get Accounts

```
GET /v1/account/accounts
```

**Response:**
```json
{
  "status": "ok",
  "data": [
    {
      "id": 123456,
      "type": "spot",
      "subtype": "",
      "state": "working"
    },
    {
      "id": 123457,
      "type": "margin",
      "subtype": "btcusdt",
      "state": "working"
    }
  ]
}
```

### Get Account Balance

```
GET /v1/account/accounts/{account-id}/balance
```

**Response:**
```json
{
  "status": "ok",
  "data": {
    "id": 123456,
    "type": "spot",
    "state": "working",
    "list": [
      {
        "currency": "btc",
        "type": "trade",
        "balance": "1.2345",
        "available": "1.0000",
        "debt": "0",
        "seq-num": "123456"
      },
      {
        "currency": "usdt",
        "type": "trade",
        "balance": "10000.00",
        "available": "9500.00",
        "debt": "0",
        "seq-num": "123457"
      }
    ]
  }
}
```

---

## Futures API

### Get Contract Info

```
GET /api/v1/contract_contract_info
```

**Response:**
```json
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "contract_type": "swap",
      "contract_size": 0.001,
      "price_tick": 0.1,
      "delivery_time": "",
      "create_date": "20200101",
      "settlement_date": "20200101",
      "support_margin_mode": "cross_isolated",
      "trade_partition": "USDT"
    }
  ]
}
```

### Get Position

```
POST /api/v1/contract_position_info
```

**Response:**
```json
{
  "status": "ok",
  "data": [
    {
      "symbol": "BTC",
      "contract_code": "BTC-USDT",
      "contract_type": "swap",
      "volume": 1.0,
      "cost_open": 50000.00,
      "cost_hold": 50000.00,
      "profit_unreal": 100.00,
      "profit_ratio": 0.02,
      "profit": 100.00,
      "position_margin": 5000.00,
      "lever_rate": 10,
      "direction": "buy",
      "last_price": 51000.00
    }
  ]
}
```

### Place Futures Order

```
POST /api/v1/contract_order
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| contract_code | STRING | YES | Contract code |
| client_order_id | LONG | NO | Client order ID |
| price | DECIMAL | NO | Price (required for limit) |
| volume | LONG | YES | Volume (contracts) |
| offset | STRING | YES | open, close |
| direction | STRING | YES | buy, sell |
| lever_rate | INT | YES | Leverage |
| order_price_type | STRING | NO | limit, opponent, optimal_5 |

---

## WebSocket Streams

### Connection Example

```typescript
import WebSocket from 'ws';
import crypto from 'crypto';

const host = 'api.huobi.pro';
const apiKey = 'your-api-key';
const secretKey = 'your-secret-key';

// Public WebSocket connection
const ws = new WebSocket(`wss://${host}/ws`);

ws.on('open', () => {
  console.log('Connected to HTX WebSocket');
  
  // Subscribe to market data
  ws.send(JSON.stringify({
    sub: 'market.btcusdt.kline.1min',
    id: 'id1'
  }));
});

ws.on('message', (data: Buffer) => {
  // HTX sends compressed data
  const zlib = require('zlib');
  const message = zlib.unzipSync(data).toString();
  
  const parsed = JSON.parse(message);
  
  if (parsed.ping) {
    // Respond to ping
    ws.send(JSON.stringify({ pong: parsed.ping }));
  } else {
    console.log('Message:', parsed);
  }
});
```

### Authentication for Private Channels

```typescript
// Get authentication signature
function getAuthSignature(): { signature: string; timestamp: string } {
  const timestamp = Date.now().toString();
  const message = `GET\n${host}\n/ws\nAccessKeyId=${apiKey}&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=${timestamp}`;
  
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(message)
    .digest('base64');
  
  return { signature, timestamp };
}

// Authenticate
const { signature, timestamp } = getAuthSignature();

ws.send(JSON.stringify({
  op: 'auth',
  AccessKeyId: apiKey,
  SignatureMethod: 'HmacSHA256',
  SignatureVersion: '2',
  Timestamp: timestamp,
  Signature: signature
}));
```

### Available Channels

#### Public Channels

| Channel | Topic | Description |
|---------|-------|-------------|
| Kline | `market.{symbol}.kline.{period}` | Kline data |
| Depth | `market.{symbol}.depth.{type}` | Order book |
| Trade Detail | `market.{symbol}.trade.detail` | Trade details |
| Market Detail | `market.{symbol}.detail` | Market detail |

#### Private Channels

| Channel | Topic | Description |
|---------|-------|-------------|
| Orders | `orders.{symbol}` | Order updates |
| Account | `accounts` | Account updates |

### Channel Examples

#### Kline Channel

```typescript
// Subscribe
ws.send(JSON.stringify({
  sub: 'market.btcusdt.kline.1min',
  id: 'kline_sub'
}));
```

**Payload:**
```json
{
  "ch": "market.btcusdt.kline.1min",
  "ts": 1704067200000,
  "tick": {
    "id": 1704067200,
    "open": 50000.00,
    "close": 50100.00,
    "low": 49900.00,
    "high": 50200.00,
    "amount": 123.45,
    "vol": 6172800.00,
    "count": 1234
  }
}
```

#### Depth Channel

```typescript
// Subscribe
ws.send(JSON.stringify({
  sub: 'market.btcusdt.depth.step0',
  id: 'depth_sub'
}));
```

**Payload:**
```json
{
  "ch": "market.btcusdt.depth.step0",
  "ts": 1704067200000,
  "tick": {
    "bids": [
      [50000.00, 1.5],
      [49999.00, 2.0]
    ],
    "asks": [
      [50001.00, 1.0],
      [50002.00, 0.5]
    ],
    "version": 1234567890,
    "ts": 1704067200000
  }
}
```

#### Trade Detail Channel

```typescript
// Subscribe
ws.send(JSON.stringify({
  sub: 'market.btcusdt.trade.detail',
  id: 'trade_sub'
}));
```

**Payload:**
```json
{
  "ch": "market.btcusdt.trade.detail",
  "ts": 1704067200000,
  "tick": {
    "id": 1234567890,
    "ts": 1704067200000,
    "data": [
      {
        "id": 1234567890,
        "tradeId": 987654321,
        "price": 50000.00,
        "amount": 0.5,
        "direction": "buy",
        "ts": 1704067200000
      }
    ]
  }
}
```

#### Orders Channel (Private)

```typescript
// Subscribe after authentication
ws.send(JSON.stringify({
  op: 'sub',
  topic: 'orders.btcusdt'
}));
```

**Payload:**
```json
{
  "op": "notify",
  "topic": "orders.btcusdt",
  "ts": 1704067200000,
  "data": {
    "orderState": "filled",
    "orderType": "buy-limit",
    "lastActTime": 1704067200000,
    "orderId": 123456789012345,
    "symbol": "btcusdt",
    "type": "buy-limit",
    "price": "50000.00",
    "orderSource": "api",
    "volume": "0.001",
    "clientOrderId": "my-order-123",
    "remainAmount": "0",
    "execAmount": "0.001"
  }
}
```

---

## Rate Limits

### REST API Rate Limits

| Endpoint Type | Limit |
|---------------|-------|
| Public Market Data | 100 requests/10s per IP |
| Private Trading | 100 requests/10s per API Key |
| Private Account | 100 requests/10s per API Key |

### Rate Limit Headers

```typescript
const headers = {
  'x-ratelimit-remaining': '50',   // Remaining requests
  'x-ratelimit-limit': '100',      // Limit per window
  'x-ratelimit-reset': '1704067210' // Reset timestamp
};
```

### WebSocket Rate Limits

| Action | Limit |
|--------|-------|
| Connections | 50 per IP |
| Subscriptions | 100 per connection |

---

## Order Types

| Type | Description | Spot | Futures |
|------|-------------|------|---------|
| `buy-market` | Market buy | ✅ | ❌ |
| `sell-market` | Market sell | ✅ | ❌ |
| `buy-limit` | Limit buy | ✅ | ❌ |
| `sell-limit` | Limit sell | ✅ | ❌ |
| `buy-ioc` | IOC buy | ✅ | ❌ |
| `sell-ioc` | IOC sell | ✅ | ❌ |
| `buy-limit-maker` | Post only buy | ✅ | ❌ |
| `sell-limit-maker` | Post only sell | ✅ | ❌ |
| `buy-stop-limit` | Stop limit buy | ✅ | ❌ |
| `sell-stop-limit` | Stop limit sell | ✅ | ❌ |

---

## Error Codes

### General Errors

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 429 | Too many requests |
| 500 | Internal server error |
| 502 | Bad gateway |
| 503 | Service unavailable |
| 504 | Gateway timeout |

### Order Errors

| Code | Description |
|------|-------------|
| 1000 | Order placement failed |
| 1001 | Order cancellation failed |
| 1002 | Order not found |
| 1003 | Order already cancelled |
| 1004 | Order already filled |
| 1005 | Insufficient balance |
| 1006 | Invalid order size |
| 1007 | Invalid order price |
| 1008 | Order would trigger immediately |
| 1009 | Trading not allowed |

### Account Errors

| Code | Description |
|------|-------------|
| 2000 | Account not found |
| 2001 | Account frozen |
| 2002 | Invalid account type |
| 2003 | Sub-account error |

### Market Errors

| Code | Description |
|------|-------------|
| 3000 | Symbol not found |
| 3001 | Trading paused |
| 3002 | Market closed |

### Signature Errors

| Code | Description |
|------|-------------|
| 4001 | Invalid API key |
| 4002 | Invalid signature |
| 4003 | Invalid timestamp |
| 4004 | Missing required parameter |
| 4005 | Parameter value out of range |

---

## Code Examples

### Create Client

```typescript
import axios from 'axios';
import crypto from 'crypto';

class HTXClient {
  private apiKey: string;
  private secretKey: string;
  private host: string;

  constructor(
    apiKey: string,
    secretKey: string,
    testnet: boolean = false
  ) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.host = testnet ? 'api-testnet.huobi.pro' : 'api.huobi.pro';
  }

  private getTimestamp(): string {
    return new Date().toISOString().replace(/\.\d{3}Z$/, '');
  }

  private sign(method: string, path: string, params: Record<string, string>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');

    const preHash = `${method}\n${this.host}\n${path}\n${sortedParams}`;

    return crypto
      .createHmac('sha256', this.secretKey)
      .update(preHash)
      .digest('base64');
  }

  async request(method: string, path: string, params: Record<string, string> = {}) {
    const timestamp = this.getTimestamp();
    
    const allParams = {
      AccessKeyId: this.apiKey,
      SignatureMethod: 'HmacSHA256',
      SignatureVersion: '2',
      Timestamp: timestamp,
      ...params
    };

    const signature = this.sign(method, path, allParams);
    
    const queryString = Object.keys(allParams)
      .sort()
      .map(key => `${key}=${encodeURIComponent(allParams[key])}`)
      .join('&') + `&Signature=${encodeURIComponent(signature)}`;

    const url = `https://${this.host}${path}?${queryString}`;

    const response = await axios({ method, url });
    return response.data;
  }

  // Market data methods
  async getTickers() {
    const response = await axios.get(`https://${this.host}/market/tickers`);
    return response.data;
  }

  async getOrderBook(symbol: string, depth: number = 20) {
    const response = await axios.get(
      `https://${this.host}/market/depth?symbol=${symbol}&depth=${depth}`
    );
    return response.data;
  }

  async getKlines(symbol: string, period: string, size: number = 150) {
    const response = await axios.get(
      `https://${this.host}/market/history/kline?symbol=${symbol}&period=${period}&size=${size}`
    );
    return response.data;
  }

  // Account methods
  async getAccounts() {
    return this.request('GET', '/v1/account/accounts');
  }

  async getBalance(accountId: string) {
    return this.request('GET', `/v1/account/accounts/${accountId}/balance`);
  }

  // Order methods
  async placeOrder(params: {
    'account-id': string;
    symbol: string;
    type: string;
    amount: string;
    price?: string;
    'client-order-id'?: string;
  }) {
    return this.request('POST', '/v1/order/orders/place', params);
  }

  async cancelOrder(orderId: string) {
    return this.request('POST', `/v1/order/orders/${orderId}/submitcancel`);
  }

  async getOrder(orderId: string) {
    return this.request('GET', `/v1/order/orders/${orderId}`);
  }

  async getOpenOrders(accountId: string, symbol?: string) {
    const params: Record<string, string> = { 'account-id': accountId };
    if (symbol) params.symbol = symbol;
    return this.request('GET', '/v1/order/openOrders', params);
  }
}

// Usage
const client = new HTXClient(
  'your-api-key',
  'your-secret-key'
);

const tickers = await client.getTickers();
console.log(tickers);
```

### Place Order Example

```typescript
// Get accounts first
const accounts = await client.getAccounts();
const spotAccountId = accounts.data.find((a: any) => a.type === 'spot').id;

// Place a limit buy order
const order = await client.placeOrder({
  'account-id': spotAccountId,
  symbol: 'btcusdt',
  type: 'buy-limit',
  amount: '0.001',
  price: '50000',
  'client-order-id': `order-${Date.now()}`
});

console.log('Order placed:', order.data);

// Place a market buy order
const marketOrder = await client.placeOrder({
  'account-id': spotAccountId,
  symbol: 'btcusdt',
  type: 'buy-market',
  amount: '100' // Amount in USDT for market buy
});

console.log('Market order placed:', marketOrder.data);
```

### Get Positions Example (Futures)

```typescript
class HTXFuturesClient extends HTXClient {
  constructor(apiKey: string, secretKey: string, testnet: boolean = false) {
    super(apiKey, secretKey, testnet);
    this.host = testnet ? 'api-testnet.hbdm.com' : 'api.hbdm.com';
  }

  async getContractInfo(contractCode?: string) {
    const params = contractCode ? { contract_code: contractCode } : {};
    return this.request('GET', '/api/v1/contract_contract_info', params);
  }

  async getPositions(contractCode?: string) {
    const params = contractCode ? { contract_code: contractCode } : {};
    return this.request('POST', '/api/v1/contract_position_info', params);
  }

  async placeFuturesOrder(params: {
    contract_code: string;
    price?: string;
    volume: string;
    offset: string;
    direction: string;
    lever_rate: string;
    order_price_type?: string;
  }) {
    return this.request('POST', '/api/v1/contract_order', params);
  }
}

// Usage
const futuresClient = new HTXFuturesClient(
  'your-api-key',
  'your-secret-key'
);

// Get positions
const positions = await futuresClient.getPositions('BTC-USDT');
console.log('Positions:', positions.data);

// Place futures order
const futuresOrder = await futuresClient.placeFuturesOrder({
  contract_code: 'BTC-USDT',
  price: '50000',
  volume: '1',
  offset: 'open',
  direction: 'buy',
  lever_rate: '10',
  order_price_type: 'limit'
});

console.log('Futures order placed:', futuresOrder.data);
```

---

## Best Practices

1. **Time Synchronization**: Ensure server time is synced with NTP
2. **Signature Encoding**: Properly encode all parameters in signatures
3. **Rate Limiting**: Monitor rate limits and implement exponential backoff
4. **WebSocket Compression**: HTX sends gzip compressed WebSocket data
5. **Ping/Pong**: Respond to WebSocket ping messages to keep connection alive
6. **Order Management**: Use client-order-id for idempotency
7. **Error Handling**: Parse error codes and implement appropriate recovery

---

## Official Resources

| Resource | URL |
|----------|-----|
| API Documentation | https://www.htx.com/en-us/opend/newApiPages/ |
| API Status | https://status.htx.com/ |
| SDK (JavaScript) | https://github.com/huobiapi/huobi-node-sdk-api |
| SDK (Python) | https://github.com/HuobiRDCenter/huobi_Python |
| SDK (Java) | https://github.com/HuobiRDCenter/huobi_Java |
| SDK (Go) | https://github.com/huobirdcenter/huobi_golang |
