# BitMEX API Documentation

> Official documentation: https://www.bitmex.com/app/apiOverview

## Table of Contents

1. [Overview](#overview)
2. [API Configuration](#api-configuration)
3. [Authentication](#authentication)
4. [Market Data Endpoints](#market-data-endpoints)
5. [Trading Operations](#trading-operations)
6. [WebSocket Streams](#websocket-streams)
7. [Rate Limits](#rate-limits)
8. [Order Types](#order-types)
9. [Error Codes](#error-codes)
10. [Code Examples](#code-examples)

---

## Overview

BitMEX (Bitcoin Mercantile Exchange) is a leading derivatives exchange specializing in Bitcoin-based perpetual and futures contracts. The platform offers:

- **Perpetual Contracts**: BTC-settled with up to 100x leverage
- **Futures Contracts**: Quarterly and bi-quarterly expirations
- **Options**: Bitcoin options trading
- **Testnet**: Full-featured test environment with free test coins

### Supported Products

| Product Type | Description | Settlement |
|--------------|-------------|------------|
| Perpetual | No expiry, funding rate | BTC (XBT) |
| Futures | Quarterly expiry | BTC (XBT) |
| Perpetual USDT | USDT-margined perpetuals | USDT |
| Futures USDT | USDT-margined futures | USDT |
| Upside Profit | Profit sharing contracts | BTC |
| Downside Profit | Inverse profit sharing | BTC |

### Key Features

- **High Leverage**: Up to 100x on BTC perpetuals
- **Insurance Fund**: Protects against auto-deleveraging
- **Testnet**: Full-featured test environment
- **Trezor Integration**: Hardware wallet security

---

## API Configuration

### REST API URLs

| Environment | URL |
|------------|-----|
| Mainnet API | `https://www.bitmex.com/api/v1` |
| Mainnet (Alternative) | `https://api.bitmex.com/api/v1` |
| Testnet API | `https://testnet.bitmex.com/api/v1` |

### WebSocket URLs

| Environment | URL |
|------------|-----|
| Mainnet WS | `wss://ws.bitmex.com/realtime` |
| Testnet WS | `wss://ws.testnet.bitmex.com/realtime` |

### API Rate Limits

| Limit Type | Threshold |
|------------|-----------|
| Public | 150 requests/minute |
| Private | 150 requests/minute |
| Orders | 300 requests/minute |

---

## Authentication

### API Key Requirements

BitMEX requires:
- **API Key**: Public identifier
- **API Secret**: Used for signature generation

### Signature Generation

```typescript
import crypto from 'crypto';

function generateSignature(
  method: string,
  path: string,
  expires: number,
  body: string,
  apiSecret: string
): string {
  const message = method + path + expires + body;
  return crypto
    .createHmac('sha256', apiSecret)
    .update(message)
    .digest('hex');
}
```

### Required Headers

| Header | Description |
|--------|-------------|
| `api-key` | Your API key |
| `api-expires` | Unix timestamp when signature expires |
| `api-signature` | HMAC SHA256 signature |
| `Content-Type` | `application/json` for POST/PUT/DELETE |

### Authentication Example

```typescript
import axios from 'axios';
import crypto from 'crypto';

const apiKey = 'your-api-key';
const apiSecret = 'your-api-secret';
const baseUrl = 'https://www.bitmex.com/api/v1';

async function authenticatedRequest(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  body?: object
) {
  const expires = Math.round(Date.now() / 1000) + 60; // 60 seconds from now
  const bodyString = body ? JSON.stringify(body) : '';
  
  const signature = generateSignature(
    method,
    path,
    expires,
    bodyString,
    apiSecret
  );

  const headers: Record<string, string> = {
    'api-key': apiKey,
    'api-expires': expires.toString(),
    'api-signature': signature,
    'Content-Type': 'application/json'
  };

  const url = `${baseUrl}${path}`;
  
  const response = await axios({
    method,
    url,
    headers,
    data: body,
    params: method === 'GET' ? body : undefined
  });

  return response.data;
}
```

### GET vs POST Signature

```typescript
// GET request - query string goes in signature
const params = { symbol: 'XBTUSD', count: 100 };
const queryString = '?symbol=XBTUSD&count=100';
const signature = generateSignature('GET', '/api/v1/trade' + queryString, expires, '', apiSecret);

// POST request - body goes in signature
const body = { symbol: 'XBTUSD', side: 'Buy', orderQty: 1, price: 50000 };
const signature = generateSignature('POST', '/api/v1/order', expires, JSON.stringify(body), apiSecret);
```

---

## Market Data Endpoints

### Get Instruments

```
GET /api/v1/instrument
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | NO | Instrument symbol |
| filter | STRING | NO | Table filter |
| columns | STRING | NO | Array of columns |
| count | NUMBER | NO | Number of results (default 100, max 500) |

**Response:**
```json
[
  {
    "symbol": "XBTUSD",
    "rootSymbol": "XBT",
    "state": "Open",
    "typ": "FFWCSX",
    "listing": "2016-05-13T12:00:00.000Z",
    "front": "2016-05-13T12:00:00.000Z",
    "expiry": null,
    "settle": null,
    "relistInterval": null,
    "fundingRate": "0.0001",
    "fundingInterval": "2000-01-01T08:00:00.000Z",
    "indicativeFundingRate": "0.0001",
    "rebalanceTimestamp": null,
    "rebalanceInterval": null,
    "openingTimestamp": "2024-01-01T00:00:00.000Z",
    "closingTimestamp": "2024-01-01T00:05:00.000Z",
    "sessionInterval": "2000-01-01T00:05:00.000Z",
    "prevClosePrice": 50000,
    "limitDownPrice": 45000,
    "limitUpPrice": 55000,
    "bankruptLimitDownPrice": 40000,
    "bankruptLimitUpPrice": 60000,
    "prevTotalVolume": 1000000,
    "totalVolume": 1005000,
    "volume": 5000,
    "volume24h": 50000,
    "prevTotalTurnover": 50000000000,
    "totalTurnover": 50250000000,
    "turnover": 250000000,
    "turnover24h": 2500000000,
    "homeNotional24h": 50000,
    "foreignNotional24h": 2500000000,
    "prevPrice24h": 50000,
    "vwap": 50000,
    "highPrice": 51000,
    "lowPrice": 49000,
    "lastPrice": 50500,
    "lastPriceProtected": 50500,
    "lastTickDirection": "PlusTick",
    "lastChangePcnt": 0.01,
    "bidPrice": 50500,
    "midPrice": 50500.5,
    "askPrice": 50501,
    "impactBidPrice": 50500,
    "impactMidPrice": 50500.5,
    "impactAskPrice": 50501,
    "hasLiquidity": true,
    "openInterest": 100000000,
    "openValue": 2000,
    "fairMethod": "FundingRate",
    "fairBasisRate": 0.0001,
    "fairBasis": 0.01,
    "fairPrice": 50500.5,
    "markMethod": "FairPrice",
    "markPrice": 50500.5,
    "indicativeTaxRate": 0,
    "indicativeSettlePrice": 50500,
    "optionStrikePrice": null,
    "optionMultiplier": null,
    "positionCurrency": "USD",
    "underlying": "XBT",
    "underlyingSymbol": "XBT",
    "quoteCurrency": "XBT",
    "settleCurrency": "XBt",
    "tickSize": 0.5,
    "lotSize": 1
  }
]
```

### Get Order Book

```
GET /api/v1/orderBook/L2
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | YES | Instrument symbol |
| depth | NUMBER | NO | Order book depth (default 25, max 1000) |

**Response:**
```json
[
  {
    "symbol": "XBTUSD",
    "id": 8700000000,
    "side": "Sell",
    "size": 100,
    "price": 50501
  },
  {
    "symbol": "XBTUSD",
    "id": 8700000001,
    "side": "Buy",
    "size": 150,
    "price": 50500
  }
]
```

### Get Trade History

```
GET /api/v1/trade
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | YES | Instrument symbol |
| filter | STRING | NO | Table filter |
| columns | STRING | NO | Array of columns |
| count | NUMBER | NO | Number of results |
| start | NUMBER | NO | Starting point |
| reverse | BOOLEAN | NO | Reverse chronological order |
| startTime | STRING | NO | Start timestamp |
| endTime | STRING | NO | End timestamp |

**Response:**
```json
[
  {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "symbol": "XBTUSD",
    "side": "Buy",
    "size": 100,
    "price": 50500,
    "tickDirection": "PlusTick",
    "trdMatchID": "00000000-0000-0000-0000-000000000000",
    "grossValue": 198020,
    "homeNotional": 0.0019802,
    "foreignNotional": 100
  }
]
```

### Get Funding History

```
GET /api/v1/funding
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | NO | Instrument symbol |
| filter | STRING | NO | Table filter |
| columns | STRING | NO | Array of columns |
| count | NUMBER | NO | Number of results |
| startTime | STRING | NO | Start timestamp |
| endTime | STRING | NO | End timestamp |

**Response:**
```json
[
  {
    "timestamp": "2024-01-01T08:00:00.000Z",
    "symbol": "XBTUSD",
    "fundingInterval": "2000-01-01T08:00:00.000Z",
    "fundingRate": 0.0001,
    "fundingRateDaily": 0.0003
  }
]
```

---

## Trading Operations

### Place Order

```
POST /api/v1/order
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | YES | Instrument symbol |
| side | STRING | YES | Buy, Sell |
| orderQty | NUMBER | YES | Order quantity |
| ordType | STRING | NO | Order type (default Limit) |
| price | NUMBER | NO | Limit price |
| stopPx | NUMBER | NO | Stop price |
| clOrdID | STRING | NO | Client order ID |
| timeInForce | STRING | NO | Time in force |
| execInst | STRING | NO | Execution instructions |
| displayQty | NUMBER | NO | Visible quantity |
| pegOffsetValue | NUMBER | NO | Trailing offset |
| pegPriceType | STRING | NO | Peg price type |

**Response:**
```json
{
  "orderID": "00000000-0000-0000-0000-000000000000",
  "clOrdID": "my-order-123",
  "clOrdLinkID": "00000000-0000-0000-0000-000000000000",
  "account": 100000,
  "symbol": "XBTUSD",
  "side": "Buy",
  "orderQty": 100,
  "price": 50000,
  "stopPx": null,
  "pegOffsetValue": null,
  "pegPriceType": "",
  "currency": "USD",
  "settlCurrency": "XBt",
  "ordType": "Limit",
  "timeInForce": "GoodTillCancel",
  "execInst": "",
  "contingencyType": "",
  "exDestination": "XBME",
  "ordStatus": "New",
  "triggered": "",
  "workingIndicator": true,
  "ordRejReason": "",
  "simpleLeavesQty": 100,
  "leavesQty": 100,
  "simpleCumQty": 0,
  "cumQty": 0,
  "avgPx": null,
  "multiLegReportingType": "",
  "text": "Submitted via API.",
  "transactTime": "2024-01-01T00:00:00.000Z",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Place Bulk Orders

```
POST /api/v1/order/bulk
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| orders | ARRAY | YES | Array of order objects |

```typescript
const orders = [
  { symbol: 'XBTUSD', side: 'Buy', orderQty: 100, price: 50000 },
  { symbol: 'XBTUSD', side: 'Sell', orderQty: 100, price: 51000 }
];

await authenticatedRequest('POST', '/api/v1/order/bulk', { orders });
```

### Amend Order

```
PUT /api/v1/order
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| orderID | STRING | NO | Order ID |
| origClOrdID | STRING | NO | Original client order ID |
| orderQty | NUMBER | NO | New quantity |
| price | NUMBER | NO | New price |
| stopPx | NUMBER | NO | New stop price |

### Amend Bulk Orders

```
PUT /api/v1/order/bulk
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| orders | ARRAY | YES | Array of amendment objects |

### Cancel Order

```
DELETE /api/v1/order
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| orderID | STRING | NO | Order ID |
| clOrdID | STRING | NO | Client order ID |
| text | STRING | NO | Cancellation reason |

### Cancel All Orders

```
DELETE /api/v1/order/all
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | NO | Instrument symbol |
| filter | STRING | NO | Order filter |
| text | STRING | NO | Cancellation reason |

### Get Order

```
GET /api/v1/order
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | NO | Instrument symbol |
| filter | STRING | NO | Table filter |
| count | NUMBER | NO | Number of results |
| reverse | BOOLEAN | NO | Reverse order |

---

## Position Management

### Get Position

```
GET /api/v1/position
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| filter | STRING | NO | Table filter |
| columns | STRING | NO | Array of columns |

**Response:**
```json
[
  {
    "account": 100000,
    "symbol": "XBTUSD",
    "currency": "USD",
    "underlying": "XBT",
    "quoteCurrency": "USD",
    "commission": 0.00075,
    "initMarginReq": 0.01,
    "maintMarginReq": 0.005,
    "riskLimit": 20000000000,
    "leverage": 100,
    "crossMargin": true,
    "deleveragePercentile": 0.1,
    "rebalancedPnl": 100000,
    "prevRealisedPnl": 0,
    "prevUnrealisedPnl": 0,
    "prevClosePrice": 50000,
    "openingTimestamp": "2024-01-01T00:00:00.000Z",
    "openingQty": 0,
    "openingCost": 0,
    "openingComm": 0,
    "openOrderBuyQty": 100,
    "openOrderBuyCost": 5000000,
    "openOrderBuyPremium": 0,
    "openOrderSellQty": 0,
    "openOrderSellCost": 0,
    "openOrderSellPremium": 0,
    "execBuyQty": 100,
    "execBuyCost": 5000000,
    "execSellQty": 0,
    "execSellCost": 0,
    "execQty": 100,
    "execCost": 5000000,
    "execComm": 37500,
    "currentTimestamp": "2024-01-01T01:00:00.000Z",
    "currentQty": 100,
    "currentCost": 5000000,
    "currentComm": 37500,
    "realisedCost": 0,
    "unrealisedCost": 5000000,
    "grossOpenCost": 5000000,
    "grossOpenPremium": 0,
    "grossExecCost": 5000000,
    "isOpen": true,
    "markPrice": 50500,
    "markValue": 4950500,
    "riskValue": 4950500,
    "homeNotional": 0.00198019802,
    "foreignNotional": 100,
    "posState": "Liquidation",
    "posCost": 5000000,
    "posCost2": 5000000,
    "posCross": 0,
    "posInit": 50000,
    "posComm": 37688,
    "posLoss": 0,
    "posMargin": 87688,
    "posMaint": 25000,
    "initMargin": 50000,
    "maintMargin": 25000,
    "realisedPnl": -37500,
    "unrealisedPnl": 49500,
    "unrealisedPnlPcnt": 0.0099,
    "unrealisedRoePcnt": 0.99,
    "simpleQty": 100,
    "simpleCost": 100,
    "simpleValue": 100,
    "simplePnl": 0.99,
    "avgCostPrice": 50000,
    "avgEntryPrice": 50000,
    "breakEvenPrice": 50037.5,
    "marginCallPrice": 49499.99,
    "liquidationPrice": 49500.01,
    "bankruptPrice": 49500.01,
    "timestamp": "2024-01-01T01:00:00.000Z",
    "lastPrice": 50500,
    "lastValue": 4950500
  }
]
```

### Update Leverage

```
POST /api/v1/position/leverage
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | YES | Instrument symbol |
| leverage | NUMBER | YES | New leverage |
| targetAccount | NUMBER | NO | Target account ID |

### Update Risk Limit

```
POST /api/v1/position/riskLimit
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | YES | Instrument symbol |
| riskLimit | NUMBER | YES | New risk limit |

### Transfer Isolated Margin

```
POST /api/v1/position/isolate
```

**Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| symbol | STRING | YES | Instrument symbol |
| enabled | BOOLEAN | YES | Enable isolated margin |

---

## Account Endpoints

### Get User

```
GET /api/v1/user
```

**Response:**
```json
{
  "id": 100000,
  "ownerId": 1,
  "firstname": null,
  "lastname": null,
  "username": "user@example.com",
  "email": "user@example.com",
  "phone": null,
  "created": "2020-01-01T00:00:00.000Z",
  "lastUpdated": "2024-01-01T00:00:00.000Z",
  "preferences": {
    "alertOnLiquidations": true,
    "animationsEnabled": true,
    "announcementsLastSeen": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get Margin

```
GET /api/v1/user/margin
```

**Response:**
```json
{
  "account": 100000,
  "currency": "XBt",
  "riskLimit": 100000000,
  "prevState": "Normal",
  "prevAmount": 100000000,
  "prevTimestamp": "2024-01-01T00:00:00.000Z",
  "prevDeposited": 100000000,
  "prevWithdrawn": 0,
  "prevTransferIn": 0,
  "prevTransferOut": 0,
  "prevCredit": 0,
  "prevDebit": 0,
  "prevRealisedPnl": 0,
  "prevUnrealisedPnl": 0,
  "prevRebates": 0,
  "prevSynthBalance": 0,
  "marginBalance": 100000000,
  "availableBalance": 100000000,
  "excessMargin": 100000000,
  "marginLeverage": 1.0,
  "unrealisedPnl": 0,
  "maintMargin": 0,
  "initMargin": 0,
  "targetExcessMargin": 0,
  "walletBalance": 100000000,
  "amount": 100000000,
  "pendingCredit": 0,
  "pendingDebit": 0,
  "pendingWithdrawal": 0,
  "prevRealisedCost": 0,
  "realisedCost": 0,
  "withdrawalLock": 0
}
```

### Get Wallet Balance

```
GET /api/v1/user/wallet
```

**Response:**
```json
{
  "account": 100000,
  "currency": "XBt",
  "deposited": 100000000,
  "withdrawn": 0,
  "transferIn": 0,
  "transferOut": 0,
  "amount": 100000000,
  "pendingCredit": 0,
  "pendingDebit": 0,
  "confirmedDebit": 0,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## WebSocket Streams

### Connection

```typescript
import WebSocket from 'ws';
import crypto from 'crypto';

const ws = new WebSocket('wss://ws.bitmex.com/realtime');

ws.on('open', () => {
  console.log('Connected to BitMEX WebSocket');
  
  // Authenticate (optional)
  const apiKey = 'your-api-key';
  const apiSecret = 'your-api-secret';
  const expires = Math.round(Date.now() / 1000) + 60;
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update('GET/realtime' + expires)
    .digest('hex');

  ws.send(JSON.stringify({
    op: 'authKeyExpires',
    args: [apiKey, expires, signature]
  }));

  // Subscribe to channels
  ws.send(JSON.stringify({
    op: 'subscribe',
    args: ['trade:XBTUSD', 'orderBookL2_25:XBTUSD']
  }));
});

ws.on('message', (data) => {
  const message = JSON.parse(data.toString());
  console.log('Message:', message);
});
```

### Available Channels

#### Public Channels

| Channel | Description |
|---------|-------------|
| `trade:{symbol}` | Trade executions |
| `orderBookL2:{symbol}` | Full order book |
| `orderBookL2_25:{symbol}` | Top 25 levels |
| `orderBookL2_1:{symbol}` | Top 1 level |
| `quote:{symbol}` | Best bid/ask |
| `instrument:{symbol}` | Instrument updates |
| `funding:{symbol}` | Funding rate |
| `liquidation:{symbol}` | Liquidations |
| `settlement:{symbol}` | Settlements |

#### Private Channels

| Channel | Description |
|---------|-------------|
| `order` | Order updates |
| `position` | Position updates |
| `execution` | Execution updates |
| `margin` | Margin updates |
| `wallet` | Wallet updates |
| `transact` | Transaction updates |

### Channel Examples

#### Trade Channel

```typescript
ws.send(JSON.stringify({
  op: 'subscribe',
  args: ['trade:XBTUSD']
}));
```

**Payload:**
```json
{
  "table": "trade",
  "action": "insert",
  "data": [
    {
      "timestamp": "2024-01-01T00:00:00.000Z",
      "symbol": "XBTUSD",
      "side": "Buy",
      "size": 100,
      "price": 50500,
      "tickDirection": "PlusTick",
      "trdMatchID": "00000000-0000-0000-0000-000000000000",
      "grossValue": 198020,
      "homeNotional": 0.0019802,
      "foreignNotional": 100
    }
  ]
}
```

#### Order Book Channel

```typescript
ws.send(JSON.stringify({
  op: 'subscribe',
  args: ['orderBookL2_25:XBTUSD']
}));
```

**Payload:**
```json
{
  "table": "orderBookL2_25",
  "action": "update",
  "data": [
    {
      "symbol": "XBTUSD",
      "id": 8700000000,
      "side": "Sell",
      "size": 100,
      "price": 50501
    }
  ]
}
```

#### Position Channel (Private)

```typescript
// After authentication
ws.send(JSON.stringify({
  op: 'subscribe',
  args: ['position']
}));
```

**Payload:**
```json
{
  "table": "position",
  "action": "update",
  "data": [
    {
      "account": 100000,
      "symbol": "XBTUSD",
      "currentQty": 100,
      "markPrice": 50500,
      "unrealisedPnl": 49500,
      "liquidationPrice": 49500.01
    }
  ]
}
```

#### Order Channel (Private)

```typescript
ws.send(JSON.stringify({
  op: 'subscribe',
  args: ['order']
}));
```

**Payload:**
```json
{
  "table": "order",
  "action": "insert",
  "data": [
    {
      "orderID": "00000000-0000-0000-0000-000000000000",
      "clOrdID": "my-order-123",
      "symbol": "XBTUSD",
      "side": "Buy",
      "orderQty": 100,
      "price": 50000,
      "ordStatus": "New",
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## Rate Limits

### REST API Rate Limits

| Category | Limit | Period |
|----------|-------|--------|
| Public | 150 requests | 1 minute |
| Private | 150 requests | 1 minute |
| Order | 300 requests | 1 minute |

### Rate Limit Headers

```typescript
const headers = {
  'x-ratelimit-remaining': '100',  // Remaining requests
  'x-ratelimit-limit': '150',      // Limit per period
  'x-ratelimit-reset': '1704067260' // Reset timestamp (Unix)
};
```

### Rate Limit Exceeded Response

```json
{
  "error": {
    "message": "Rate limit exceeded, retry in 1 second. Note that exceeding rate limits repeatedly will result in a temporary ban.",
    "name": "HTTPError"
  }
}
```

---

## Order Types

### Basic Order Types

| Type | Description |
|------|-------------|
| `Limit` | Limit order (GTC default) |
| `Market` | Market order |
| `Stop` | Stop market order |
| `StopLimit` | Stop limit order |
| `MarketIfTouched` | MIT order |
| `LimitIfTouched` | LIT order |

### Advanced Order Types

| Type | Description |
|------|-------------|
| `Pegged` | Trailing stop order |
| `Simple` | Simple order |

### Time In Force Options

| Option | Description |
|--------|-------------|
| `GoodTillCancel` | Order remains until cancelled |
| `ImmediateOrCancel` | Execute immediately or cancel |
| `FillOrKill` | Execute entirely or cancel |
| `PostOnly` | Maker only order |

### Execution Instructions

| Instruction | Description |
|-------------|-------------|
| `ParticipateDoNotInitiate` | Post only |
| `AllOrNone` | Fill or kill |
| `MarkPrice` | Use mark price |
| `LastPrice` | Use last price |
| `Close` | Close position |
| `ReduceOnly` | Reduce position only |

### Order Examples

```typescript
// Limit order
const limitOrder = {
  symbol: 'XBTUSD',
  side: 'Buy',
  orderQty: 100,
  price: 50000,
  ordType: 'Limit'
};

// Market order
const marketOrder = {
  symbol: 'XBTUSD',
  side: 'Buy',
  orderQty: 100,
  ordType: 'Market'
};

// Stop market order
const stopOrder = {
  symbol: 'XBTUSD',
  side: 'Sell',
  orderQty: 100,
  stopPx: 45000,
  ordType: 'Stop',
  execInst: 'Close'
};

// Trailing stop
const trailingStop = {
  symbol: 'XBTUSD',
  side: 'Sell',
  orderQty: 100,
  ordType: 'Pegged',
  pegPriceType: 'TrailingStopPct',
  pegOffsetValue: -5 // 5% trailing stop
};

// Post only order
const postOnlyOrder = {
  symbol: 'XBTUSD',
  side: 'Buy',
  orderQty: 100,
  price: 50000,
  ordType: 'Limit',
  execInst: 'ParticipateDoNotInitiate'
};
```

---

## Error Codes

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
| 502 | Bad Gateway |
| 503 | Service Unavailable |
| 504 | Gateway Timeout |

### API Error Codes

| Code | Description |
|------|-------------|
| 0 | OK |
| 404 | Not Found |
| 403 | Forbidden |
| 401 | Unauthorized |
| 400 | Bad Request |

### Order Error Messages

| Message | Description |
|---------|-------------|
| `Invalid order` | Order validation failed |
| `Insufficient Available Balance` | Not enough margin |
| `Order price not valid` | Price outside allowed range |
| `Order quantity not valid` | Quantity outside allowed range |
| `Order would trigger immediately` | Stop would trigger on placement |
| `Position is in liquidation` | Cannot modify liquidating position |
| `Market is closed` | Trading suspended |
| `Symbol not found` | Invalid instrument |
| `Order not found` | Order ID doesn't exist |

### Error Response Format

```json
{
  "error": {
    "message": "Insufficient Available Balance",
    "name": "HTTPError"
  }
}
```

---

## Code Examples

### Create Client

```typescript
import axios from 'axios';
import crypto from 'crypto';

class BitMEXClient {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl: string;
  private testnet: boolean;

  constructor(
    apiKey: string,
    apiSecret: string,
    testnet: boolean = false
  ) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.testnet = testnet;
    this.baseUrl = testnet
      ? 'https://testnet.bitmex.com/api/v1'
      : 'https://www.bitmex.com/api/v1';
  }

  private sign(verb: string, path: string, expires: number, body: string = ''): string {
    const message = verb + path + expires + body;
    return crypto
      .createHmac('sha256', this.apiSecret)
      .update(message)
      .digest('hex');
  }

  async request(
    verb: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    params: object = {},
    body: object | null = null
  ): Promise<any> {
    const expires = Math.round(Date.now() / 1000) + 60;
    const bodyString = body ? JSON.stringify(body) : '';
    
    const queryString = verb === 'GET' && Object.keys(params).length > 0
      ? '?' + Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')
      : '';
    
    const fullPath = path + queryString;
    const signature = this.sign(verb, fullPath, expires, bodyString);

    const headers: Record<string, string> = {
      'api-key': this.apiKey,
      'api-expires': expires.toString(),
      'api-signature': signature,
      'Content-Type': 'application/json'
    };

    const response = await axios({
      method: verb,
      url: this.baseUrl + fullPath,
      headers,
      data: body,
      params: verb === 'GET' ? undefined : params
    });

    return response.data;
  }

  // Market data methods
  async getInstruments(symbol?: string) {
    const params = symbol ? { symbol } : {};
    return this.request('GET', '/api/v1/instrument', params);
  }

  async getOrderBook(symbol: string, depth: number = 25) {
    return this.request('GET', '/api/v1/orderBook/L2', { symbol, depth });
  }

  async getTrades(symbol: string, count: number = 100) {
    return this.request('GET', '/api/v1/trade', { symbol, count });
  }

  async getFunding(symbol: string, count: number = 100) {
    return this.request('GET', '/api/v1/funding', { symbol, count });
  }

  // Account methods
  async getUser() {
    return this.request('GET', '/api/v1/user');
  }

  async getMargin() {
    return this.request('GET', '/api/v1/user/margin');
  }

  async getWallet() {
    return this.request('GET', '/api/v1/user/wallet');
  }

  // Position methods
  async getPositions() {
    return this.request('GET', '/api/v1/position');
  }

  async setLeverage(symbol: string, leverage: number) {
    return this.request('POST', '/api/v1/position/leverage', {}, { symbol, leverage });
  }

  // Order methods
  async placeOrder(params: {
    symbol: string;
    side: 'Buy' | 'Sell';
    orderQty: number;
    price?: number;
    ordType?: string;
    stopPx?: number;
    clOrdID?: string;
    timeInForce?: string;
    execInst?: string;
  }) {
    return this.request('POST', '/api/v1/order', {}, params);
  }

  async placeBulkOrders(orders: object[]) {
    return this.request('POST', '/api/v1/order/bulk', {}, { orders });
  }

  async amendOrder(params: {
    orderID?: string;
    origClOrdID?: string;
    orderQty?: number;
    price?: number;
  }) {
    return this.request('PUT', '/api/v1/order', {}, params);
  }

  async cancelOrder(orderID: string) {
    return this.request('DELETE', '/api/v1/order', { orderID });
  }

  async cancelAllOrders(symbol?: string) {
    const params = symbol ? { symbol } : {};
    return this.request('DELETE', '/api/v1/order/all', params);
  }

  async getOrders(symbol?: string, filter?: object) {
    const params = { ...filter };
    if (symbol) params['symbol'] = symbol;
    return this.request('GET', '/api/v1/order', params);
  }
}

// Usage
const client = new BitMEXClient(
  'your-api-key',
  'your-secret-key',
  false // Set to true for testnet
);

const instruments = await client.getInstruments();
console.log(instruments);
```

### Place Order Example

```typescript
// Set leverage first
await client.setLeverage('XBTUSD', 10);

// Place a limit buy order
const order = await client.placeOrder({
  symbol: 'XBTUSD',
  side: 'Buy',
  orderQty: 100,
  price: 50000,
  ordType: 'Limit',
  clOrdID: `order-${Date.now()}`
});

console.log('Order placed:', order.orderID);

// Place a market sell order
const marketOrder = await client.placeOrder({
  symbol: 'XBTUSD',
  side: 'Sell',
  orderQty: 100,
  ordType: 'Market'
});

console.log('Market order placed:', marketOrder.orderID);
```

### Get Positions Example

```typescript
const positions = await client.getPositions();

for (const pos of positions) {
  if (pos.isOpen) {
    console.log(`Position: ${pos.symbol}`);
    console.log(`  Size: ${pos.currentQty}`);
    console.log(`  Entry Price: ${pos.avgEntryPrice}`);
    console.log(`  Mark Price: ${pos.markPrice}`);
    console.log(`  Unrealized PnL: ${pos.unrealisedPnl} ${pos.currency}`);
    console.log(`  Liquidation Price: ${pos.liquidationPrice}`);
    console.log(`  Leverage: ${pos.leverage}`);
  }
}
```

### Testnet Usage

```typescript
// Connect to testnet for testing
const testnetClient = new BitMEXClient(
  'your-testnet-api-key',
  'your-testnet-api-secret',
  true // Use testnet
);

// Get free testnet BTC from faucet
// https://testnet.bitmex.com/app/faucet

// Place test orders
const testOrder = await testnetClient.placeOrder({
  symbol: 'XBTUSD',
  side: 'Buy',
  orderQty: 100,
  price: 50000,
  ordType: 'Limit'
});

console.log('Test order placed:', testOrder.orderID);
```

---

## Testnet Support

BitMEX provides a full-featured testnet:

### Testnet Features

- **Free Test Coins**: Get testnet BTC from the faucet
- **Full API**: Identical to mainnet API
- **No Risk**: Test strategies without real money
- **Same Interface**: Use same code as production

### Testnet Faucet

Access free testnet BTC at: https://testnet.bitmex.com/app/faucet

### Switching Between Environments

```typescript
// Production
const prodClient = new BitMEXClient(apiKey, apiSecret, false);

// Testnet
const testClient = new BitMEXClient(testnetApiKey, testnetApiSecret, true);
```

---

## Best Practices

1. **Use Testnet First**: Always test new code on testnet
2. **Rate Limiting**: Respect rate limits to avoid temporary bans
3. **Error Handling**: Implement proper error handling and retries
4. **Position Management**: Monitor liquidation prices closely
5. **Order Management**: Use client order IDs for tracking
6. **WebSocket Reconnection**: Implement automatic reconnection
7. **Time Synchronization**: Ensure server time is accurate
8. **Security**: Never expose API keys in client-side code

---

## Official Resources

| Resource | URL |
|----------|-----|
| API Documentation | https://www.bitmex.com/app/apiOverview |
| Testnet | https://testnet.bitmex.com/ |
| Testnet Faucet | https://testnet.bitmex.com/app/faucet |
| SDK (JavaScript) | https://github.com/BitMEX/api-connectors |
| SDK (Python) | https://github.com/BitMEX/sample-market-maker |
| API Status | https://status.bitmex.com/ |
| Swagger UI | https://www.bitmex.com/api/explorer/ |
