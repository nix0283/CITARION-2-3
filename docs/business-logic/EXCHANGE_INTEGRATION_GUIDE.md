# CITARION Exchange Integration Guide

> **Last Updated:** March 2025  
> **Supported Exchanges:** 12

---

## Table of Contents

1. [Overview](#overview)
2. [Exchange Specifications](#exchange-specifications)
3. [Authentication](#authentication)
4. [Rate Limits](#rate-limits)
5. [WebSocket Formats](#websocket-formats)
6. [Error Handling](#error-handling)
7. [Testnet vs Mainnet](#testnet-vs-mainnet)

---

## Overview

CITARION integrates with 12 cryptocurrency exchanges, each with specific API requirements.

### Exchange Support Matrix

| Exchange | Spot | Futures | Testnet | Demo | WebSocket |
|----------|------|---------|---------|------|-----------|
| Binance | ✅ | ✅ | ✅ | ❌ | ✅ |
| Bybit | ✅ | ✅ | ✅ | ❌ | ✅ |
| OKX | ✅ | ✅ | ❌ | ✅ | ✅ |
| Bitget | ✅ | ✅ | ❌ | ✅ | ✅ |
| BingX | ✅ | ✅ | ❌ | ✅ | ✅ |
| KuCoin | ✅ | ✅ | ❌ | ❌ | ✅ |
| HTX (Huobi) | ✅ | ✅ | ❌ | ❌ | ✅ |
| HyperLiquid | ✅ | ✅ | ❌ | ❌ | ✅ |
| BitMEX | ❌ | ✅ | ✅ | ❌ | ✅ |
| BloFin | ✅ | ✅ | ❌ | ✅ | ✅ |
| Coinbase | ✅ | ❌ | ❌ | ❌ | ✅ |
| Aster DEX | ✅ | ✅ | ❌ | ❌ | ✅ |

---

## Exchange Specifications

### Binance

```typescript
// lib/exchange/binance-client.ts

const BINANCE_CONFIG = {
  // REST API
  restUrl: {
    spot: 'https://api.binance.com',
    futures: 'https://fapi.binance.com',
    testnet: {
      spot: 'https://testnet.binance.vision',
      futures: 'https://testnet.binancefuture.com',
    },
  },
  
  // WebSocket
  wsUrl: {
    spot: 'wss://stream.binance.com:9443/ws',
    futures: 'wss://fstream.binance.com/ws',
    testnet: {
      spot: 'wss://testnet.binance.vision/ws',
      futures: 'wss://stream.binancefuture.com/ws',
    },
  },
  
  // Rate limits
  rateLimits: {
    spot: {
      requestsPerMinute: 1200,
      ordersPerSecond: 50,
      ordersPerDay: 200000,
    },
    futures: {
      requestsPerMinute: 2400,
      ordersPerSecond: 100,
    },
  },
  
  // API Versions
  apiVersion: {
    spot: 'v3',
    futures: 'v1',
  },
};

class BinanceClient extends BaseExchangeClient {
  // Authentication
  protected signRequest(params: Record<string, string>): string {
    const query = new URLSearchParams(params).toString();
    return crypto
      .createHmac('sha256', this.apiSecret)
      .update(query)
      .digest('hex');
  }
  
  protected getHeaders(): Record<string, string> {
    return {
      'X-MBX-APIKEY': this.apiKey,
    };
  }
  
  // Endpoints
  async getBalance(): Promise<Balance[]> {
    const params = { timestamp: Date.now() };
    const signature = this.signRequest(params);
    
    return this.request('/api/v3/account', {
      ...params,
      signature,
    });
  }
  
  async createOrder(params: CreateOrderParams): Promise<Order> {
    const body = {
      symbol: params.symbol,
      side: params.side,
      type: params.type,
      quantity: params.quantity,
      price: params.price,
      timestamp: Date.now(),
    };
    
    body.signature = this.signRequest(body);
    
    return this.request('/api/v3/order', body, 'POST');
  }
}
```

### Bybit

```typescript
// lib/exchange/bybit-client.ts

const BYBIT_CONFIG = {
  // REST API (V5)
  restUrl: {
    mainnet: 'https://api.bybit.com',
    testnet: 'https://api-testnet.bybit.com',
  },
  
  // WebSocket
  wsUrl: {
    public: 'wss://stream.bybit.com/v5/public',
    private: 'wss://stream.bybit.com/v5/private',
    testnet: {
      public: 'wss://stream-testnet.bybit.com/v5/public',
      private: 'wss://stream-testnet.bybit.com/v5/private',
    },
  },
  
  // Rate limits
  rateLimits: {
    spot: {
      requestsPerMinute: 600,
    },
    futures: {
      requestsPerMinute: 1200,
    },
  },
};

class BybitClient extends BaseExchangeClient {
  // Authentication (V5)
  protected signRequest(params: Record<string, string>): string {
    const timestamp = Date.now();
    const recvWindow = 5000;
    
    const signString = `${timestamp}${this.apiKey}${recvWindow}${JSON.stringify(params)}`;
    
    return crypto
      .createHmac('sha256', this.apiSecret)
      .update(signString)
      .digest('hex');
  }
  
  protected getHeaders(): Record<string, string> {
    const timestamp = Date.now();
    return {
      'X-BAPI-API-KEY': this.apiKey,
      'X-BAPI-TIMESTAMP': timestamp.toString(),
      'X-BAPI-RECV-WINDOW': '5000',
    };
  }
  
  // V5 API endpoints
  async getBalance(): Promise<Balance[]> {
    const response = await this.request('/v5/account/wallet-balance', {
      accountType: 'UNIFIED',
    });
    
    return response.result.list[0].coin.map(c => ({
      asset: c.coin,
      free: c.walletBalance,
      locked: c.locked,
    }));
  }
  
  async createOrder(params: CreateOrderParams): Promise<Order> {
    const body = {
      category: params.category || 'linear', // linear, inverse, spot
      symbol: params.symbol,
      side: params.side,
      orderType: params.type,
      qty: params.quantity.toString(),
      price: params.price?.toString(),
      timeInForce: params.timeInForce || 'GTC',
    };
    
    return this.request('/v5/order/create', body, 'POST');
  }
}
```

### OKX

```typescript
// lib/exchange/okx-client.ts

const OKX_CONFIG = {
  // REST API
  restUrl: 'https://www.okx.com',
  
  // WebSocket
  wsUrl: {
    public: 'wss://ws.okx.com:8443/ws/v5/public',
    private: 'wss://ws.okx.com:8443/ws/v5/private',
    business: 'wss://ws.okx.com:8443/ws/v5/business',
  },
  
  // Rate limits
  rateLimits: {
    rest: {
      requestsPerSecond: 20,
      ordersPerSecond: 60,
    },
  },
};

class OKXClient extends BaseExchangeClient {
  // Authentication
  protected signRequest(
    method: string,
    path: string,
    body?: string
  ): { signature: string; timestamp: string } {
    const timestamp = new Date().toISOString();
    const preHash = timestamp + method + path + (body || '');
    
    const signature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(preHash)
      .digest('base64');
    
    return { signature, timestamp };
  }
  
  protected getHeaders(
    method: string,
    path: string,
    body?: string
  ): Record<string, string> {
    const { signature, timestamp } = this.signRequest(method, path, body);
    
    return {
      'OK-ACCESS-KEY': this.apiKey,
      'OK-ACCESS-SIGN': signature,
      'OK-ACCESS-TIMESTAMP': timestamp,
      'OK-ACCESS-PASSPHRASE': this.passphrase,
      'Content-Type': 'application/json',
    };
  }
  
  // Endpoints
  async getBalance(): Promise<Balance[]> {
    const path = '/api/v5/account/balance';
    const response = await this.request(path);
    
    return response.data[0].details.map(d => ({
      asset: d.ccy,
      free: d.availBal,
      locked: d.frozenBal,
    }));
  }
  
  async createOrder(params: CreateOrderParams): Promise<Order> {
    const body = {
      instId: params.symbol,
      tdMode: params.marginMode === 'cross' ? 'cross' : 'isolated',
      side: params.side.toLowerCase(),
      ordType: params.type.toLowerCase(),
      sz: params.quantity.toString(),
      px: params.price?.toString(),
    };
    
    const path = '/api/v5/trade/order';
    return this.request(path, body, 'POST');
  }
}
```

### Bitget

```typescript
// lib/exchange/bitget-client.ts

const BITGET_CONFIG = {
  restUrl: 'https://api.bitget.com',
  wsUrl: 'wss://ws.bitget.com/v2/ws/public',
  rateLimits: {
    requestsPerSecond: 15,
    ordersPerSecond: 30,
  },
};

class BitgetClient extends BaseExchangeClient {
  protected signRequest(
    method: string,
    path: string,
    body?: string
  ): { signature: string; timestamp: string } {
    const timestamp = Date.now().toString();
    const preHash = timestamp + method.toUpperCase() + path + (body || '');
    
    const signature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(preHash)
      .digest('base64');
    
    return { signature, timestamp };
  }
  
  protected getHeaders(
    method: string,
    path: string,
    body?: string
  ): Record<string, string> {
    const { signature, timestamp } = this.signRequest(method, path, body);
    
    return {
      'ACCESS-KEY': this.apiKey,
      'ACCESS-SIGN': signature,
      'ACCESS-TIMESTAMP': timestamp,
      'ACCESS-PASSPHRASE': this.passphrase,
      'Content-Type': 'application/json',
    };
  }
}
```

### BingX

```typescript
// lib/exchange/bingx-client.ts

const BINGX_CONFIG = {
  restUrl: 'https://open-api.bingx.com',
  wsUrl: 'wss://open-api-swap.bingx.com/swap-market',
  rateLimits: {
    requestsPerMinute: 600,
  },
};

class BingXClient extends BaseExchangeClient {
  protected signRequest(params: Record<string, string>): string {
    const query = new URLSearchParams(params).toString();
    return crypto
      .createHmac('sha256', this.apiSecret)
      .update(query)
      .digest('hex');
  }
  
  protected getHeaders(): Record<string, string> {
    return {
      'X-BX-APIKEY': this.apiKey,
    };
  }
}
```

---

## Authentication

### Common Authentication Patterns

```typescript
// Authentication types
interface ExchangeAuth {
  apiKey: string;
  apiSecret: string;
  passphrase?: string;  // OKX, Bitget, KuCoin
  uid?: string;         // Some exchanges
}

// Signature methods by exchange
const SIGNATURE_METHODS = {
  binance: 'HMAC-SHA256(queryString)',
  bybit: 'HMAC-SHA256(timestamp + apiKey + recvWindow + body)',
  okx: 'HMAC-SHA256-base64(timestamp + method + path + body)',
  bitget: 'HMAC-SHA256-base64(timestamp + method + path + body)',
  bingx: 'HMAC-SHA256(queryString)',
  kucoin: 'HMAC-SHA256-base64(timestamp + method + path + body)',
  htx: 'HMAC-SHA256-base64(method + path + timestamp + body)',
  hyperliquid: 'ECDSA(message)',
  bitmex: 'HMAC-SHA256-base64(verb + path + expires + body)',
  blofin: 'HMAC-SHA256-base64(timestamp + method + path + body)',
  coinbase: 'HMAC-SHA256-base64(timestamp + method + path + body)',
};
```

### API Key Permissions Required

| Exchange | Read | Trade | Withdraw |
|----------|------|-------|----------|
| Binance | ✅ | ✅ | ❌ |
| Bybit | ✅ | ✅ | ❌ |
| OKX | ✅ | ✅ | ❌ |
| Bitget | ✅ | ✅ | ❌ |
| BingX | ✅ | ✅ | ❌ |

---

## Rate Limits

### Rate Limit Headers

```typescript
// Standard response headers
interface RateLimitHeaders {
  'X-RateLimit-Limit': string;      // Total limit
  'X-RateLimit-Remaining': string;  // Remaining requests
  'X-RateLimit-Reset': string;      // Reset timestamp
}

// Exchange-specific headers
const RATE_LIMIT_HEADERS = {
  binance: {
    used: 'x-mbx-used-weight-1m',
    orderCount: 'x-mbx-order-count-10s',
  },
  bybit: {
    remaining: 'X-Bapi-Limit-Status',
    reset: 'X-Bapi-Limit-Reset-Timestamp',
  },
  okx: {
    remaining: 'x-okex-limit-remaining-requests',
    reset: 'x-okex-limit-reset-requests',
  },
};
```

### Rate Limit Handler

```typescript
// lib/exchange/rate-limiter.ts

class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  constructor(
    private limits: { requestsPerMinute: number; requestsPerSecond?: number }
  ) {}
  
  async waitForLimit(exchange: string): Promise<void> {
    const now = Date.now();
    const key = exchange;
    
    // Get recent requests
    let requests = this.requests.get(key) || [];
    
    // Clean old requests (older than 1 minute)
    requests = requests.filter(t => now - t < 60000);
    
    // Check if at limit
    if (requests.length >= this.limits.requestsPerMinute) {
      const oldestRequest = Math.min(...requests);
      const waitTime = 60000 - (now - oldestRequest);
      
      console.log(`Rate limit reached for ${exchange}, waiting ${waitTime}ms`);
      await sleep(waitTime);
    }
    
    // Record this request
    requests.push(now);
    this.requests.set(key, requests);
  }
}

// Usage
const limiter = new RateLimiter({ requestsPerMinute: 1200 });

async function makeRequest(exchange: string, fn: () => Promise<any>) {
  await limiter.waitForLimit(exchange);
  return fn();
}
```

---

## WebSocket Formats

### Subscription Messages

```typescript
// Binance
{
  "method": "SUBSCRIBE",
  "params": ["btcusdt@ticker", "btcusdt@depth"],
  "id": 1
}

// Bybit V5
{
  "op": "subscribe",
  "args": ["tickers.BTCUSDT", "orderbook.50.BTCUSDT"]
}

// OKX
{
  "op": "subscribe",
  "args": [{"channel": "tickers", "instId": "BTC-USDT"}]
}

// Bitget
{
  "op": "subscribe",
  "args": [{"instType": "sp", "channel": "ticker", "instId": "BTCUSDT"}]
}
```

### Ticker Updates

```typescript
// Binance ticker
{
  "e": "24hrTicker",
  "s": "BTCUSDT",
  "c": "67500.00",     // Last price
  "h": "68000.00",     // High 24h
  "l": "66000.00",     // Low 24h
  "v": "1500000",      // Volume
  "P": "2.5"           // Price change percent
}

// Bybit V5 ticker
{
  "topic": "tickers.BTCUSDT",
  "data": {
    "symbol": "BTCUSDT",
    "lastPrice": "67500.00",
    "highPrice24h": "68000.00",
    "lowPrice24h": "66000.00",
    "volume24h": "1500000",
    "price24hPcnt": "0.025"
  }
}

// OKX ticker
{
  "arg": {"channel": "tickers", "instId": "BTC-USDT"},
  "data": [{
    "instId": "BTC-USDT",
    "last": "67500.00",
    "high24h": "68000.00",
    "low24h": "66000.00",
    "vol24h": "1500000"
  }]
}
```

---

## Error Handling

### Exchange Error Codes

```typescript
// lib/exchange/errors.ts

const EXCHANGE_ERRORS = {
  binance: {
    '-1000': 'UNKNOWN',
    '-1021': 'TIMESTAMP_NOT_SYNC',
    '-1022': 'INVALID_SIGNATURE',
    '-2010': 'NEW_ORDER_REJECTED',
    '-2011': 'CANCEL_REJECTED',
    '-2013': 'ORDER_DOES_NOT_EXIST',
    '-2015': 'INVALID_API_KEY',
  },
  bybit: {
    '10001': 'INVALID_API_KEY',
    '10002': 'INVALID_SIGNATURE',
    '10003': 'RATE_LIMIT',
    '10006': 'IP_NOT_WHITELISTED',
    '110001': 'INSUFFICIENT_BALANCE',
    '110007': 'ORDER_NOT_FOUND',
  },
  okx: {
    '50000': 'INVALID_API_KEY',
    '50004': 'SIGNATURE_ERROR',
    '50011': 'RATE_LIMIT',
    '51020': 'INSUFFICIENT_BALANCE',
    '51400': 'ORDER_NOT_FOUND',
  },
};
```

### Error Handler

```typescript
// lib/exchange/error-handler.ts

function handleExchangeError(exchange: string, error: any): TradingError {
  const code = error.code || error.errCode || error.error_code;
  const message = error.message || error.msg || error.errMsg;
  
  // Map to TradingError
  switch (exchange) {
    case 'binance':
      if (code === -1021) {
        return new TradingError('EXCHANGE_ERROR', 'Timestamp sync error', {
          details: { exchange, originalCode: code },
        });
      }
      break;
      
    case 'bybit':
      if (code === 10003) {
        return new TradingError('EXCHANGE_RATE_LIMIT', 'Bybit rate limit', {
          retryable: true,
        });
      }
      break;
  }
  
  return new TradingError('EXCHANGE_ERROR', message, {
    details: { exchange, code, original: error },
  });
}
```

---

## Testnet vs Mainnet

### Configuration

```typescript
// lib/exchange/config.ts

const EXCHANGE_URLS = {
  binance: {
    mainnet: {
      spot: 'https://api.binance.com',
      futures: 'https://fapi.binance.com',
    },
    testnet: {
      spot: 'https://testnet.binance.vision',
      futures: 'https://testnet.binancefuture.com',
    },
  },
  bybit: {
    mainnet: 'https://api.bybit.com',
    testnet: 'https://api-testnet.bybit.com',
  },
  bitmex: {
    mainnet: 'https://www.bitmex.com',
    testnet: 'https://testnet.bitmex.com',
  },
};

function getExchangeUrl(exchange: string, testnet: boolean, type?: string): string {
  const urls = EXCHANGE_URLS[exchange];
  
  if (!urls) {
    throw new Error(`Unknown exchange: ${exchange}`);
  }
  
  if (testnet && urls.testnet) {
    return typeof urls.testnet === 'string' 
      ? urls.testnet 
      : urls.testnet[type || 'spot'];
  }
  
  return typeof urls.mainnet === 'string'
    ? urls.mainnet
    : urls.mainnet[type || 'spot'];
}
```

### Testnet API Keys

```bash
# Binance Testnet
# Get keys from: https://testnet.binance.vision/
BINANCE_TESTNET_API_KEY="xxx"
BINANCE_TESTNET_API_SECRET="xxx"

# Bybit Testnet
# Get keys from: https://testnet.bybit.com/
BYBIT_TESTNET_API_KEY="xxx"
BYBIT_TESTNET_API_SECRET="xxx"

# BitMEX Testnet
# Get keys from: https://testnet.bitmex.com/
BITMEX_TESTNET_API_KEY="xxx"
BITMEX_TESTNET_API_SECRET="xxx"
```

---

## Code Examples

### Creating Exchange Client

```typescript
import { createExchangeClient } from '@/lib/exchange';

// Binance client
const binance = createExchangeClient({
  exchange: 'binance',
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET,
  testnet: false,
});

// Get balance
const balance = await binance.getBalance();

// Place order
const order = await binance.createOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: 0.001,
  price: 50000,
  timeInForce: 'GTC',
});

// Subscribe to prices
binance.subscribeToTicker('BTCUSDT', (ticker) => {
  console.log('Price:', ticker.price);
});
```

---

## Related Documentation

- [API_SPECIFICATION.md](../architecture/API_SPECIFICATION.md) - Exchange API endpoints
- [SECURITY_GUIDE.md](../security/SECURITY_GUIDE.md) - API key encryption
- [ERROR_HANDLING.md](./ERROR_HANDLING.md) - Error handling
