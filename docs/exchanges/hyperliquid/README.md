# HyperLiquid API Documentation

> Official documentation: https://hyperliquid.gitbook.io/hyperliquid-docs

## Table of Contents

1. [Overview](#overview)
2. [API Configuration](#api-configuration)
3. [Authentication](#authentication)
4. [Market Data Endpoints](#market-data-endpoints)
5. [Trading Operations](#trading-operations)
6. [WebSocket Streams](#websocket-streams)
7. [Order Book Mechanics](#order-book-mechanics)
8. [Error Handling](#error-handling)
9. [Code Examples](#code-examples)

---

## Overview

HyperLiquid is a high-performance decentralized perpetual futures exchange built on a custom L1 blockchain. The platform offers:

- **Perpetual Futures**: Up to 50x leverage on major trading pairs
- **Spot Trading**: Native spot markets
- **L1 Blockchain**: Custom-built for high throughput and low latency
- **On-chain Order Book**: Fully transparent and verifiable

### Key Features

| Feature | Description |
|---------|-------------|
| Max Leverage | Up to 50x |
| Order Types | Limit, Market, Stop Market, Take Profit |
| Settlement | USDC |
| Oracle | Pyth Network |
| Block Time | ~2 seconds |
| Gas Fees | Very low (L1 native) |

### Supported Products

- **Perpetual Futures**: BTC, ETH, and 40+ altcoins
- **Spot**: Native spot trading pairs
- **Pre-launch Markets**: Early access to new tokens

---

## API Configuration

### API Endpoints

| Environment | URL |
|------------|-----|
| L1 API (Main) | `https://api.hyperliquid.xyz` |
| L1 API (Testnet) | `https://api.hyperliquid-testnet.xyz` |
| L2 API (Main) | `https://api.hyperliquid.xyz` |
| L2 API (Testnet) | `https://api.hyperliquid-testnet.xyz` |

### WebSocket URLs

| Environment | URL |
|------------|-----|
| Mainnet | `wss://api.hyperliquid.xyz/ws` |
| Testnet | `wss://api.hyperliquid-testnet.xyz/ws` |

### API Structure

HyperLiquid uses a unique API structure:
- **L1 API**: Direct blockchain interaction (account operations, transfers)
- **L2 API**: Exchange-specific operations (trading, order book)

All API calls use **POST** requests with JSON payloads.

---

## Authentication

### Wallet-based Authentication

HyperLiquid uses EVM-compatible wallet signatures (Ethereum-style) for authentication:

1. **EIP-712 Typed Data**: Structured signing for L1 operations
2. **EIP-191 Personal Sign**: For L2 exchange operations

### Required Components

```typescript
import { ethers } from 'ethers';

// Create wallet from private key
const privateKey = 'your-private-key';
const wallet = new ethers.Wallet(privateKey);

// Get address
const address = wallet.address;
```

### L2 Signature Generation

```typescript
import { ethers } from 'ethers';

interface L2Signature {
  r: string;
  s: string;
  v: number;
}

async function signL2Action(
  wallet: ethers.Wallet,
  action: any,
  nonce: number,
  vaultAddress?: string
): Promise<L2Signature> {
  // Create the message hash
  const message = JSON.stringify({
    ...action,
    nonce,
    vaultAddress: vaultAddress || null
  });

  // Sign the message
  const signature = await wallet.signMessage(message);
  const { r, s, v } = ethers.utils.splitSignature(signature);

  return { r, s, v };
}
```

### L1 Signature Generation (EIP-712)

```typescript
import { ethers } from 'ethers';

const DOMAIN = {
  name: 'HyperLiquidSignTransaction',
  version: '1',
  chainId: 421614, // Arbitrum Sepolia for testnet
  verifyingContract: '0x0000000000000000000000000000000000000000'
};

const TYPES = {
  Agent: [
    { name: 'source', type: 'string' },
    { name: 'connectionId', type: 'bytes32' }
  ]
};

async function signL1Action(
  wallet: ethers.Wallet,
  source: string,
  connectionId: string
): Promise<string> {
  const value = {
    source,
    connectionId
  };

  const signature = await wallet._signTypedData(DOMAIN, TYPES, value);
  return signature;
}
```

### Connection ID (API Key)

```typescript
// Generate a random connection ID (acts as API key)
function generateConnectionId(): string {
  const randomBytes = ethers.utils.randomBytes(32);
  return ethers.utils.hexlify(randomBytes);
}

// Store this securely - it identifies your API session
const connectionId = generateConnectionId();
```

---

## Market Data Endpoints

All market data requests use POST method with JSON payload.

### Get Meta Information

```typescript
const response = await fetch('https://api.hyperliquid.xyz/info', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ type: 'meta' })
});

const meta = await response.json();
```

**Response:**
```json
{
  "universe": [
    {
      "maxLeverage": 50,
      "name": "BTC",
      "szDecimals": 5,
      "maxFee": 0.0025,
      "onlyIsolated": false
    },
    {
      "maxLeverage": 50,
      "name": "ETH",
      "szDecimals": 4,
      "maxFee": 0.0025,
      "onlyIsolated": false
    }
  ]
}
```

### Get All Mids (Mark Prices)

```typescript
const response = await fetch('https://api.hyperliquid.xyz/info', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ type: 'allMids' })
});

const mids = await response.json();
```

**Response:**
```json
{
  "mids": {
    "BTC": "50000.0",
    "ETH": "3000.0",
    "SOL": "100.0"
  }
}
```

### Get Order Book

```typescript
const response = await fetch('https://api.hyperliquid.xyz/info', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    type: 'l2Book',
    coin: 'BTC'
  })
});

const book = await response.json();
```

**Response:**
```json
{
  "levels": [
    [
      { "px": "50000.0", "sz": "10.0", "n": 5 },
      { "px": "49999.0", "sz": "5.0", "n": 3 }
    ],
    [
      { "px": "50001.0", "sz": "8.0", "n": 4 },
      { "px": "50002.0", "sz": "12.0", "n": 6 }
    ]
  ],
  "time": 1704067200000
}
```

### Get Recent Trades

```typescript
const response = await fetch('https://api.hyperliquid.xyz/info', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    type: 'recentTrades',
    coin: 'BTC',
    limit: 100
  })
});

const trades = await response.json();
```

**Response:**
```json
[
  {
    "coin": "BTC",
    "px": "50000.0",
    "sz": "0.5",
    "side": "B",
    "time": 1704067200000,
    "hash": "0x..."
  }
]
```

### Get User State

```typescript
const response = await fetch('https://api.hyperliquid.xyz/info', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    type: 'clearinghouseState',
    user: '0x...'
  })
});

const state = await response.json();
```

**Response:**
```json
{
  "assetPositions": [
    {
      "position": {
        "coin": "BTC",
        "entryPx": "50000.0",
        "leverage": {
          "type": "cross",
          "value": 10
        },
        "liquidationPx": "45000.0",
        "marginUsed": "5000.0",
        "positionValue": "50000.0",
        "returnOnEquity": "0.02",
        "szi": "1.0",
        "unrealizedPnl": "500.0"
      },
      "type": "oneWay"
    }
  ],
  "crossMarginSummary": {
    "accountValue": "10000.0",
    "totalMarginUsed": "5000.0",
    "totalNtlPos": "50000.0",
    "totalRawUsd": "10000.0"
  },
  "marginSummary": {
    "accountValue": "10000.0",
    "totalMarginUsed": "5000.0",
    "totalNtlPos": "50000.0",
    "totalRawUsd": "10000.0"
  },
  "withdrawable": "5000.0"
}
```

### Get Open Orders

```typescript
const response = await fetch('https://api.hyperliquid.xyz/info', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    type: 'openOrders',
    user: '0x...'
  })
});

const orders = await response.json();
```

**Response:**
```json
[
  {
    "coin": "BTC",
    "limitPx": "50000.0",
    "oid": 123456789,
    "side": "B",
    "sz": "1.0",
    "timestamp": 1704067200000
  }
]
```

### Get Order History

```typescript
const response = await fetch('https://api.hyperliquid.xyz/info', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    type: 'orderHistory',
    user: '0x...'
  })
});

const history = await response.json();
```

---

## Trading Operations

### Place Order

```typescript
const response = await fetch('https://api.hyperliquid.xyz/exchange', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: {
      type: 'order',
      orders: [{
        coin: 'BTC',
        isMarket: false,
        limitPx: '50000.0',
        sz: '1.0',
        reduceOnly: false,
        side: 'B',
        orderType: 'limit'
      }],
      grouping: 'na'
    },
    nonce: Date.now(),
    signature: {
      r: '0x...',
      s: '0x...',
      v: 27
    }
  })
});
```

**Order Parameters:**
| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| coin | STRING | YES | Asset symbol (e.g., 'BTC', 'ETH') |
| isMarket | BOOLEAN | NO | Whether market order |
| limitPx | STRING | YES | Limit price |
| sz | STRING | YES | Size in base currency |
| reduceOnly | BOOLEAN | NO | Reduce position only |
| side | STRING | YES | 'B' for buy, 'A' for sell |
| orderType | STRING | YES | 'limit', 'ioc', 'alo' |
| triggerPx | STRING | NO | Trigger price for stop orders |
| isTrigger | BOOLEAN | NO | Whether stop order |
| tpsl | STRING | NO | 'tp' or 'sl' for take profit/stop loss |

**Response:**
```json
{
  "status": "ok",
  "response": {
    "type": "order",
    "data": {
      "statuses": [
        { "resting": { "oid": 123456789 } }
      ]
    }
  }
}
```

### Cancel Order

```typescript
const response = await fetch('https://api.hyperliquid.xyz/exchange', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: {
      type: 'cancel',
      cancels: [{
        coin: 'BTC',
        oid: 123456789
      }]
    },
    nonce: Date.now(),
    signature: {
      r: '0x...',
      s: '0x...',
      v: 27
    }
  })
});
```

**Response:**
```json
{
  "status": "ok",
  "response": {
    "type": "cancel",
    "data": {
      "statuses": [
        { "success": true }
      ]
    }
  }
}
```

### Cancel by Cloid

```typescript
const response = await fetch('https://api.hyperliquid.xyz/exchange', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: {
      type: 'cancelByCloid',
      cancels: [{
        coin: 'BTC',
        cloid: 'my-order-id'
      }]
    },
    nonce: Date.now(),
    signature: {
      r: '0x...',
      s: '0x...',
      v: 27
    }
  })
});
```

### Modify Order

```typescript
const response = await fetch('https://api.hyperliquid.xyz/exchange', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: {
      type: 'modify',
      oid: 123456789,
      coin: 'BTC',
      limitPx: '51000.0',
      sz: '2.0'
    },
    nonce: Date.now(),
    signature: {
      r: '0x...',
      s: '0x...',
      v: 27
    }
  })
});
```

### Update Leverage

```typescript
const response = await fetch('https://api.hyperliquid.xyz/exchange', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: {
      type: 'updateLeverage',
      coin: 'BTC',
      leverage: 10,
      isCross: true
    },
    nonce: Date.now(),
    signature: {
      r: '0x...',
      s: '0x...',
      v: 27
    }
  })
});
```

### Update Isolated Margin

```typescript
const response = await fetch('https://api.hyperliquid.xyz/exchange', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: {
      type: 'updateIsolatedMargin',
      coin: 'BTC',
      isBuy: true,
      ntli: 1000 // Add 1000 USDC
    },
    nonce: Date.now(),
    signature: {
      r: '0x...',
      s: '0x...',
      v: 27
    }
  })
});
```

---

## WebSocket Streams

### Connection

```typescript
import WebSocket from 'ws';

const ws = new WebSocket('wss://api.hyperliquid.xyz/ws');

ws.on('open', () => {
  console.log('Connected to HyperLiquid WebSocket');
  
  // Subscribe to channels
  ws.send(JSON.stringify({
    method: 'subscribe',
    subscription: { type: 'allMids' }
  }));
});

ws.on('message', (data) => {
  const message = JSON.parse(data.toString());
  console.log('Message:', message);
});

// Keep alive with ping
setInterval(() => {
  ws.send(JSON.stringify({ method: 'ping' }));
}, 30000);
```

### Available Channels

#### All Mids

```typescript
ws.send(JSON.stringify({
  method: 'subscribe',
  subscription: { type: 'allMids' }
}));
```

**Payload:**
```json
{
  "channel": "allMids",
  "data": {
    "mids": {
      "BTC": "50000.0",
      "ETH": "3000.0"
    }
  }
}
```

#### L2 Order Book

```typescript
ws.send(JSON.stringify({
  method: 'subscribe',
  subscription: { 
    type: 'l2Book',
    coin: 'BTC'
  }
}));
```

**Payload:**
```json
{
  "channel": "l2Book",
  "data": {
    "coin": "BTC",
    "levels": [
      [
        { "px": "50000.0", "sz": "10.0", "n": 5 }
      ],
      [
        { "px": "50001.0", "sz": "8.0", "n": 4 }
      ]
    ],
    "time": 1704067200000
  }
}
```

#### Trades

```typescript
ws.send(JSON.stringify({
  method: 'subscribe',
  subscription: { 
    type: 'trades',
    coin: 'BTC'
  }
}));
```

**Payload:**
```json
{
  "channel": "trades",
  "data": [
    {
      "coin": "BTC",
      "px": "50000.0",
      "sz": "0.5",
      "side": "B",
      "time": 1704067200000,
      "hash": "0x..."
    }
  ]
}
```

#### User Events

```typescript
ws.send(JSON.stringify({
  method: 'subscribe',
  subscription: { 
    type: 'userEvents',
    user: '0x...'
  }
}));
```

**Payload (Order Update):**
```json
{
  "channel": "user",
  "data": {
    "orders": [
      {
        "coin": "BTC",
        "limitPx": "50000.0",
        "oid": 123456789,
        "side": "B",
        "sz": "1.0",
        "status": "open",
        "timestamp": 1704067200000
      }
    ]
  }
}
```

---

## Order Book Mechanics

### Order Book Structure

HyperLiquid maintains a central limit order book (CLOB) on its L1 blockchain:

- **Price-Time Priority**: Orders are matched by price, then by time
- **Pro-Rata Matching**: At the same price, orders are filled proportionally
- **Self-Trade Prevention**: Orders from the same user won't cross

### Order Types

| Type | Description |
|------|-------------|
| `limit` | Limit order (GTC) |
| `ioc` | Immediate or Cancel |
| `alo` | At Limit Only (Post Only) |

### Leverage Modes

| Mode | Description |
|------|-------------|
| Cross | All positions share collateral |
| Isolated | Each position has separate margin |

### Position Sizing

```typescript
// Position size calculation
const positionSize = notionalValue / entryPrice;
const marginRequired = notionalValue / leverage;

// Example: 1 BTC at $50,000 with 10x leverage
// Position size = 1 BTC
// Margin required = $5,000 USDC
```

### Liquidation

Liquidation occurs when position value drops below maintenance margin:

```typescript
// Liquidation price calculation (long position)
const liquidationPrice = entryPrice * (1 - 1/leverage + maintenanceMarginRate);

// Example: Entry $50,000, 10x leverage, 0.5% maintenance
// Liquidation = 50000 * (1 - 0.1 + 0.005) = 50000 * 0.905 = $45,250
```

---

## Error Handling

### Response Status

```typescript
interface HyperLiquidResponse {
  status: 'ok' | 'error';
  response?: any;
  error?: string;
}
```

### Common Errors

| Error | Description |
|-------|-------------|
| `Insufficient margin` | Not enough margin for position |
| `Invalid signature` | Signature verification failed |
| `Order not found` | Order ID doesn't exist |
| `Price too far from mark` | Price deviates too much from mark price |
| `Position size exceeds limit` | Position size too large |
| `Leverage exceeds max` | Leverage above allowed limit |
| `Market closed` | Trading suspended |
| `Nonce too low` | Nonce already used |

### Error Response Example

```json
{
  "status": "error",
  "error": "Insufficient margin"
}
```

### Error Handling Implementation

```typescript
async function placeOrderWithRetry(
  client: HyperLiquidClient,
  order: OrderParams,
  maxRetries: number = 3
): Promise<any> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await client.placeOrder(order);
      
      if (result.status === 'ok') {
        return result;
      }
      
      // Handle specific errors
      if (result.error?.includes('Insufficient margin')) {
        throw new Error('Insufficient margin - check account balance');
      }
      
      if (result.error?.includes('nonce')) {
        // Retry with new nonce
        continue;
      }
      
      throw new Error(result.error);
      
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // Exponential backoff
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
    }
  }
}
```

---

## Code Examples

### Create Client

```typescript
import { ethers } from 'ethers';
import fetch from 'node-fetch';

class HyperLiquidClient {
  private wallet: ethers.Wallet;
  private baseUrl: string;
  private address: string;

  constructor(privateKey: string, testnet: boolean = false) {
    this.wallet = new ethers.Wallet(privateKey);
    this.address = this.wallet.address;
    this.baseUrl = testnet
      ? 'https://api.hyperliquid-testnet.xyz'
      : 'https://api.hyperliquid.xyz';
  }

  private async signAction(action: any): Promise<{ r: string; s: string; v: number }> {
    const nonce = Date.now();
    const message = JSON.stringify({ ...action, nonce });
    const signature = await this.wallet.signMessage(message);
    const { r, s, v } = ethers.utils.splitSignature(signature);
    return { r, s, v };
  }

  async getInfo(type: string, params: any = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}/info`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, ...params })
    });
    return response.json();
  }

  async executeAction(action: any): Promise<any> {
    const nonce = Date.now();
    const message = JSON.stringify({ ...action, nonce });
    const signature = await this.wallet.signMessage(message);
    const { r, s, v } = ethers.utils.splitSignature(signature);

    const response = await fetch(`${this.baseUrl}/exchange`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        nonce,
        signature: { r, s, v }
      })
    });
    return response.json();
  }

  // Market data methods
  async getMeta() {
    return this.getInfo('meta');
  }

  async getAllMids() {
    return this.getInfo('allMids');
  }

  async getOrderBook(coin: string) {
    return this.getInfo('l2Book', { coin });
  }

  async getRecentTrades(coin: string, limit: number = 100) {
    return this.getInfo('recentTrades', { coin, limit });
  }

  // Account methods
  async getUserState() {
    return this.getInfo('clearinghouseState', { user: this.address });
  }

  async getOpenOrders() {
    return this.getInfo('openOrders', { user: this.address });
  }

  async getOrderHistory() {
    return this.getInfo('orderHistory', { user: this.address });
  }

  // Trading methods
  async placeOrder(params: {
    coin: string;
    isMarket?: boolean;
    limitPx: string;
    sz: string;
    reduceOnly?: boolean;
    side: 'B' | 'A';
    orderType: 'limit' | 'ioc' | 'alo';
    cloid?: string;
  }) {
    const action = {
      type: 'order',
      orders: [{
        coin: params.coin,
        isMarket: params.isMarket || false,
        limitPx: params.limitPx,
        sz: params.sz,
        reduceOnly: params.reduceOnly || false,
        side: params.side,
        orderType: params.orderType,
        cloid: params.cloid
      }],
      grouping: 'na'
    };
    return this.executeAction(action);
  }

  async cancelOrder(coin: string, oid: number) {
    const action = {
      type: 'cancel',
      cancels: [{ coin, oid }]
    };
    return this.executeAction(action);
  }

  async cancelByCloid(coin: string, cloid: string) {
    const action = {
      type: 'cancelByCloid',
      cancels: [{ coin, cloid }]
    };
    return this.executeAction(action);
  }

  async modifyOrder(oid: number, coin: string, limitPx: string, sz: string) {
    const action = {
      type: 'modify',
      oid,
      coin,
      limitPx,
      sz
    };
    return this.executeAction(action);
  }

  async setLeverage(coin: string, leverage: number, isCross: boolean = true) {
    const action = {
      type: 'updateLeverage',
      coin,
      leverage,
      isCross
    };
    return this.executeAction(action);
  }
}

// Usage
const client = new HyperLiquidClient('your-private-key');

const meta = await client.getMeta();
console.log('Meta:', meta);
```

### Place Order Example

```typescript
// Set leverage first
await client.setLeverage('BTC', 10, true);

// Place a limit buy order
const order = await client.placeOrder({
  coin: 'BTC',
  limitPx: '50000.0',
  sz: '0.001',
  side: 'B',
  orderType: 'limit',
  cloid: `order-${Date.now()}`
});

console.log('Order placed:', order);

// Place a market sell order
const marketOrder = await client.placeOrder({
  coin: 'BTC',
  isMarket: true,
  limitPx: '0', // Market orders still need a limitPx
  sz: '0.001',
  side: 'A',
  orderType: 'ioc'
});

console.log('Market order placed:', marketOrder);
```

### Get Positions Example

```typescript
const state = await client.getUserState();

console.log('Account Value:', state.crossMarginSummary.accountValue);
console.log('Total Position:', state.crossMarginSummary.totalNtlPos);
console.log('Withdrawable:', state.withdrawable);

// Print individual positions
for (const assetPosition of state.assetPositions) {
  const pos = assetPosition.position;
  console.log(`Position: ${pos.coin}`);
  console.log(`  Size: ${pos.szi}`);
  console.log(`  Entry Price: ${pos.entryPx}`);
  console.log(`  Unrealized PnL: ${pos.unrealizedPnl}`);
  console.log(`  Leverage: ${pos.leverage.value}`);
  console.log(`  Liquidation Price: ${pos.liquidationPx}`);
}
```

### WebSocket Order Book Example

```typescript
import WebSocket from 'ws';

class HyperLiquidOrderBook {
  private ws: WebSocket | null = null;
  private bids: Map<string, number> = new Map();
  private asks: Map<string, number> = new Map();
  private coin: string;

  constructor(coin: string) {
    this.coin = coin;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket('wss://api.hyperliquid.xyz/ws');

      this.ws.on('open', () => {
        console.log('Connected to HyperLiquid WebSocket');

        this.ws!.send(JSON.stringify({
          method: 'subscribe',
          subscription: {
            type: 'l2Book',
            coin: this.coin
          }
        }));

        resolve();
      });

      this.ws.on('message', (data: Buffer) => {
        try {
          const message = JSON.parse(data.toString());

          if (message.channel === 'l2Book') {
            this.updateBook(message.data);
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      });

      this.ws.on('error', reject);
    });
  }

  private updateBook(data: any) {
    // Update bids
    this.bids.clear();
    for (const level of data.levels[0]) {
      this.bids.set(level.px, parseFloat(level.sz));
    }

    // Update asks
    this.asks.clear();
    for (const level of data.levels[1]) {
      this.asks.set(level.px, parseFloat(level.sz));
    }

    this.printBook();
  }

  private printBook() {
    const bidPrices = Array.from(this.bids.keys()).sort((a, b) => parseFloat(b) - parseFloat(a));
    const askPrices = Array.from(this.asks.keys()).sort((a, b) => parseFloat(a) - parseFloat(b));

    console.log('--- Order Book ---');
    console.log(`Best Bid: ${bidPrices[0]} (${this.bids.get(bidPrices[0])})`);
    console.log(`Best Ask: ${askPrices[0]} (${this.asks.get(askPrices[0])})`);
    console.log(`Spread: ${parseFloat(askPrices[0]) - parseFloat(bidPrices[0])}`);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// Usage
const orderBook = new HyperLiquidOrderBook('BTC');
await orderBook.connect();

// Keep running
process.on('SIGINT', () => {
  orderBook.disconnect();
  process.exit();
});
```

---

## Best Practices

1. **Nonce Management**: Use unique nonces (timestamp is recommended)
2. **Signature Expiry**: Signatures don't expire, but use fresh nonces
3. **Gas Fees**: Very low, but still factor into trading costs
4. **Order Size**: Respect minimum and maximum order sizes
5. **Price Precision**: Use correct decimal places for each asset
6. **Leverage Management**: Set appropriate leverage before trading
7. **Position Monitoring**: Monitor liquidation prices closely
8. **WebSocket Reconnection**: Implement automatic reconnection

---

## Official Resources

| Resource | URL |
|----------|-----|
| API Documentation | https://hyperliquid.gitbook.io/hyperliquid-docs |
| SDK (Python) | https://github.com/hyperliquid-dex/hyperliquid-python-sdk |
| SDK (JavaScript) | https://github.com/hyperliquid-dex/hyperliquid-node-sdk |
| Frontend | https://app.hyperliquid.xyz |
| Discord | https://discord.gg/hyperliquid |
| Twitter | https://twitter.com/HyperliquidX |
