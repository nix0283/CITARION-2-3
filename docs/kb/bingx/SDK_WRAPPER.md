# BingX SDK Wrapper Implementation

Since BingX doesn't provide official SDKs for all languages, here's a comprehensive TypeScript wrapper implementation for the BingX API.

## Installation

```bash
npm install axios crypto-js
```

## Core SDK Wrapper

```typescript
// bingx-sdk.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import crypto from 'crypto';

interface BingXConfig {
  apiKey: string;
  apiSecret: string;
  baseUrl?: string;
  recvWindow?: number;
  timeout?: number;
}

interface BingXResponse<T = any> {
  code: number;
  msg: string;
  data: T;
}

interface OrderParams {
  symbol: string;
  side: 'BUY' | 'SELL';
  type: 'LIMIT' | 'MARKET';
  quantity?: string;
  quoteOrderQty?: string;
  price?: string;
  positionSide?: 'LONG' | 'SHORT';
  reduceOnly?: boolean;
  clientOrderId?: string;
}

interface Position {
  symbol: string;
  positionSide: 'LONG' | 'SHORT';
  positionAmt: string;
  entryPrice: string;
  markPrice: string;
  unRealizedProfit: string;
  leverage: string;
  initialMargin: string;
  liquidationPrice: string;
  updateTime: string;
}

interface Balance {
  asset: string;
  totalAmount: string;
  availableAmount: string;
  frozenAmount: string;
}

interface Ticker {
  symbol: string;
  price: string;
  bidPrice: string;
  askPrice: string;
  high24h: string;
  low24h: string;
  volume24h: string;
}

interface Kline {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
}

class BingXSDK {
  private client: AxiosInstance;
  private apiKey: string;
  private apiSecret: string;
  private recvWindow: number;

  constructor(config: BingXConfig) {
    this.apiKey = config.apiKey;
    this.apiSecret = config.apiSecret;
    this.recvWindow = config.recvWindow || 5000;

    this.client = axios.create({
      baseURL: config.baseUrl || 'https://open-api.bingx.com',
      timeout: config.timeout || 30000,
      headers: {
        'X-BX-APIKEY': this.apiKey,
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for signing
    this.client.interceptors.request.use((config) => {
      const timestamp = Date.now().toString();
      const params = new URLSearchParams(config.params || {});
      params.set('timestamp', timestamp);
      params.set('recvWindow', this.recvWindow.toString());

      const queryString = params.toString();
      const signature = this.sign(queryString);
      params.set('signature', signature);

      config.params = Object.fromEntries(params.entries());
      return config;
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => {
        const data = response.data as BingXResponse;
        if (data.code !== 0) {
          throw new BingXApiError(data.code, data.msg);
        }
        return response;
      },
      (error) => {
        if (error.response?.data) {
          const { code, msg } = error.response.data;
          throw new BingXApiError(code || -1, msg || error.message);
        }
        throw error;
      }
    );
  }

  private sign(message: string): string {
    return crypto
      .createHmac('sha256', this.apiSecret)
      .update(message)
      .digest('hex');
  }

  // ==================== Market Data ====================

  /**
   * Get ticker price
   */
  async getTickerPrice(symbol: string, market: 'spot' | 'swap' = 'swap'): Promise<Ticker> {
    const path = market === 'swap' 
      ? '/openApi/swap/v2/quote/price'
      : '/openApi/spot/v1/ticker/price';
    
    const response = await this.client.get<BingXResponse<Ticker>>(path, {
      params: { symbol },
    });
    
    return response.data.data;
  }

  /**
   * Get multiple tickers
   */
  async getTickers(market: 'spot' | 'swap' = 'swap', symbols?: string[]): Promise<Ticker[]> {
    const path = market === 'swap'
      ? '/openApi/swap/v2/quote/ticker'
      : '/openApi/spot/v1/ticker/ticker';
    
    const params: any = {};
    if (symbols && symbols.length > 0) {
      params.symbols = JSON.stringify(symbols);
    }
    
    const response = await this.client.get<BingXResponse<Ticker[]>>(path, { params });
    return response.data.data;
  }

  /**
   * Get order book depth
   */
  async getOrderBook(symbol: string, limit: number = 100, market: 'spot' | 'swap' = 'swap'): Promise<{
    bids: Array<{ price: string; qty: string }>;
    asks: Array<{ price: string; qty: string }>;
  }> {
    const path = market === 'swap'
      ? '/openApi/swap/v2/quote/depth'
      : '/openApi/spot/v1/depth';
    
    const response = await this.client.get<BingXResponse>(path, {
      params: { symbol, limit },
    });
    
    return response.data.data;
  }

  /**
   * Get klines/candlesticks
   */
  async getKlines(
    symbol: string,
    interval: string = '1h',
    options?: {
      startTime?: number;
      endTime?: number;
      limit?: number;
    },
    market: 'spot' | 'swap' = 'swap'
  ): Promise<Kline[]> {
    const path = market === 'swap'
      ? '/openApi/swap/v2/quote/klines'
      : '/openApi/spot/v1/klines';
    
    const params: any = {
      symbol,
      interval,
      ...options,
    };
    
    const response = await this.client.get<BingXResponse<string[][]>>(path, { params });
    
    return response.data.data.map((k) => ({
      openTime: parseInt(k[0]),
      open: k[1],
      high: k[2],
      low: k[3],
      close: k[4],
      volume: k[5],
      closeTime: parseInt(k[6]),
    }));
  }

  /**
   * Get funding rate (futures only)
   */
  async getFundingRate(symbol: string): Promise<{
    symbol: string;
    fundingRate: string;
    nextFundingTime: string;
    markPrice: string;
    indexPrice: string;
  }> {
    const response = await this.client.get<BingXResponse>(
      '/openApi/swap/v2/quote/fundingRate',
      { params: { symbol } }
    );
    
    return response.data.data;
  }

  /**
   * Get mark price (futures only)
   */
  async getMarkPrice(symbol: string): Promise<{
    symbol: string;
    markPrice: string;
    indexPrice: string;
  }> {
    const response = await this.client.get<BingXResponse>(
      '/openApi/swap/v2/quote/markPrice',
      { params: { symbol } }
    );
    
    return response.data.data;
  }

  // ==================== Trading ====================

  /**
   * Place order (futures)
   */
  async placeFuturesOrder(params: OrderParams): Promise<{ orderId: string; clientOrderId?: string }> {
    const body: any = {
      symbol: params.symbol,
      side: params.side,
      type: params.type,
    };

    if (params.type === 'LIMIT') {
      body.quantity = params.quantity;
      body.price = params.price;
    } else if (params.type === 'MARKET') {
      if (params.quantity) body.quantity = params.quantity;
      if (params.quoteOrderQty) body.quoteOrderQty = params.quoteOrderQty;
    }

    if (params.positionSide) body.positionSide = params.positionSide;
    if (params.reduceOnly) body.reduceOnly = params.reduceOnly;
    if (params.clientOrderId) body.clientOrderId = params.clientOrderId;

    const response = await this.client.post<BingXResponse>(
      '/openApi/swap/v2/trade/order',
      null,
      { params: body }
    );
    
    return response.data.data;
  }

  /**
   * Place order (spot)
   */
  async placeSpotOrder(params: OrderParams): Promise<{ orderId: string }> {
    const body: any = {
      symbol: params.symbol,
      side: params.side,
      type: params.type,
    };

    if (params.type === 'LIMIT') {
      body.quantity = params.quantity;
      body.price = params.price;
    } else if (params.type === 'MARKET') {
      body.quoteOrderQty = params.quoteOrderQty || params.quantity;
    }

    if (params.clientOrderId) body.newClientOrderId = params.clientOrderId;

    const response = await this.client.post<BingXResponse>(
      '/openApi/spot/v1/trade/order',
      null,
      { params: body }
    );
    
    return response.data.data;
  }

  /**
   * Cancel order
   */
  async cancelOrder(
    symbol: string,
    orderId?: string,
    clientOrderId?: string,
    market: 'spot' | 'swap' = 'swap'
  ): Promise<void> {
    const path = market === 'swap'
      ? '/openApi/swap/v2/trade/order'
      : '/openApi/spot/v1/trade/cancelOrder';
    
    const params: any = { symbol };
    if (orderId) params.orderId = orderId;
    if (clientOrderId) params.clientOrderId = clientOrderId;

    await this.client.delete(path, { params });
  }

  /**
   * Cancel all open orders
   */
  async cancelAllOrders(symbol?: string, market: 'spot' | 'swap' = 'swap'): Promise<void> {
    const path = market === 'swap'
      ? '/openApi/swap/v2/trade/allOpenOrders'
      : '/openApi/spot/v1/trade/cancelAllOrders';
    
    const params: any = {};
    if (symbol) params.symbol = symbol;

    await this.client.delete(path, { params });
  }

  /**
   * Query open orders
   */
  async getOpenOrders(
    symbol?: string,
    market: 'spot' | 'swap' = 'swap'
  ): Promise<any[]> {
    const path = market === 'swap'
      ? '/openApi/swap/v2/trade/openOrders'
      : '/openApi/spot/v1/trade/openOrders';
    
    const params: any = {};
    if (symbol) params.symbol = symbol;

    const response = await this.client.get<BingXResponse<any[]>>(path, { params });
    return response.data.data;
  }

  /**
   * Query order history
   */
  async getOrderHistory(
    symbol?: string,
    options?: {
      startTime?: number;
      endTime?: number;
      limit?: number;
    },
    market: 'spot' | 'swap' = 'swap'
  ): Promise<any[]> {
    const path = market === 'swap'
      ? '/openApi/swap/v2/trade/allOrders'
      : '/openApi/spot/v1/trade/historyOrders';
    
    const params: any = { ...options };
    if (symbol) params.symbol = symbol;

    const response = await this.client.get<BingXResponse<any[]>>(path, { params });
    return response.data.data;
  }

  // ==================== Position Management (Futures) ====================

  /**
   * Get positions
   */
  async getPositions(symbol?: string): Promise<Position[]> {
    const params: any = {};
    if (symbol) params.symbol = symbol;

    const response = await this.client.get<BingXResponse<Position[]>>(
      '/openApi/swap/v2/user/positions',
      { params }
    );
    
    return response.data.data;
  }

  /**
   * Set leverage
   */
  async setLeverage(symbol: string, leverage: number): Promise<void> {
    await this.client.post(
      '/openApi/swap/v2/trade/leverage',
      null,
      { params: { symbol, leverage } }
    );
  }

  /**
   * Set position mode (hedge/one-way)
   */
  async setPositionMode(dualSidePosition: boolean): Promise<void> {
    await this.client.post(
      '/openApi/swap/v2/trade/positionSide/dual',
      null,
      { params: { dualSidePosition: dualSidePosition.toString() } }
    );
  }

  /**
   * Set margin type
   */
  async setMarginType(symbol: string, marginType: 'ISOLATED' | 'CROSSED'): Promise<void> {
    await this.client.post(
      '/openApi/swap/v2/trade/marginType',
      null,
      { params: { symbol, marginType } }
    );
  }

  // ==================== Account ====================

  /**
   * Get futures balance
   */
  async getFuturesBalance(): Promise<Balance[]> {
    const response = await this.client.get<BingXResponse<{ balance: Balance[] }>>(
      '/openApi/swap/v2/user/balance'
    );
    
    return response.data.data.balance;
  }

  /**
   * Get spot balance
   */
  async getSpotBalance(): Promise<Array<{ asset: string; free: string; locked: string }>> {
    const response = await this.client.get<BingXResponse<{ balances: any[] }>>(
      '/openApi/spot/v1/account/balance'
    );
    
    return response.data.data.balances;
  }

  /**
   * Get account info
   */
  async getAccountInfo(market: 'spot' | 'swap' = 'swap'): Promise<any> {
    const path = market === 'swap'
      ? '/openApi/swap/v2/user/account'
      : '/openApi/spot/v1/account';
    
    const response = await this.client.get<BingXResponse>(path);
    return response.data.data;
  }

  // ==================== WebSocket Support ====================

  /**
   * Get listen key for private WebSocket
   */
  async getListenKey(): Promise<string> {
    const response = await this.client.post<BingXResponse<{ listenKey: string }>>(
      '/openApi/swap/v2/user/auth'
    );
    
    return response.data.data.listenKey;
  }

  /**
   * Keep alive listen key
   */
  async keepAliveListenKey(): Promise<void> {
    await this.client.put('/openApi/swap/v2/user/auth');
  }

  /**
   * Close listen key
   */
  async closeListenKey(): Promise<void> {
    await this.client.delete('/openApi/swap/v2/user/auth');
  }
}

// Custom error class
class BingXApiError extends Error {
  public code: number;
  
  constructor(code: number, message: string) {
    super(message);
    this.name = 'BingXApiError';
    this.code = code;
  }
}

// Export
export { BingXSDK, BingXConfig, BingXApiError, OrderParams, Position, Balance, Ticker, Kline };
```

## Usage Examples

### Basic Setup

```typescript
import { BingXSDK } from './bingx-sdk';

const bingx = new BingXSDK({
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
});
```

### Market Data

```typescript
// Get ticker
const ticker = await bingx.getTickerPrice('BTC-USDT');
console.log(`BTC Price: ${ticker.price}`);

// Get order book
const orderBook = await bingx.getOrderBook('BTC-USDT', 20);
console.log(`Best bid: ${orderBook.bids[0].price}`);
console.log(`Best ask: ${orderBook.asks[0].price}`);

// Get klines
const klines = await bingx.getKlines('BTC-USDT', '1h', { limit: 100 });
console.log(`Latest close: ${klines[klines.length - 1].close}`);

// Get funding rate
const funding = await bingx.getFundingRate('BTC-USDT');
console.log(`Funding rate: ${funding.fundingRate}`);
```

### Trading

```typescript
// Place limit order
const order = await bingx.placeFuturesOrder({
  symbol: 'BTC-USDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: '0.001',
  price: '50000',
  positionSide: 'LONG',
});

// Place market order
const marketOrder = await bingx.placeFuturesOrder({
  symbol: 'BTC-USDT',
  side: 'SELL',
  type: 'MARKET',
  quantity: '0.001',
});

// Cancel order
await bingx.cancelOrder('BTC-USDT', order.orderId);

// Get open orders
const openOrders = await bingx.getOpenOrders('BTC-USDT');
```

### Position Management

```typescript
// Get positions
const positions = await bingx.getPositions();
console.log(`Open positions: ${positions.length}`);

// Set leverage
await bingx.setLeverage('BTC-USDT', 20);

// Set hedge mode
await bingx.setPositionMode(true);

// Get balance
const balance = await bingx.getFuturesBalance();
console.log(`USDT Available: ${balance.find(b => b.asset === 'USDT')?.availableAmount}`);
```

### Error Handling

```typescript
import { BingXApiError } from './bingx-sdk';

try {
  const order = await bingx.placeFuturesOrder({
    symbol: 'BTC-USDT',
    side: 'BUY',
    type: 'LIMIT',
    quantity: '0.001',
    price: '50000',
  });
} catch (error) {
  if (error instanceof BingXApiError) {
    console.error(`API Error [${error.code}]: ${error.message}`);
    
    switch (error.code) {
      case 100202:
        console.error('Insufficient balance');
        break;
      case 100400:
        console.error('Invalid parameters');
        break;
      case 100600:
        console.error('Rate limit exceeded');
        break;
      default:
        console.error('Unknown error');
    }
  }
}
```

### WebSocket Integration

```typescript
import WebSocket from 'ws';

// Get listen key for private channels
const listenKey = await bingx.getListenKey();

// Connect to WebSocket
const ws = new WebSocket('wss://open-api-swap.bingx.com/openapi/swap/v2/ws');

ws.on('open', () => {
  console.log('Connected to BingX WebSocket');
  
  // Subscribe to depth
  ws.send(JSON.stringify({
    id: 'depth_sub',
    reqType: 'sub',
    dataType: 'BTC-USDT@depth20',
  }));
  
  // Subscribe to account updates (requires authentication)
  ws.send(JSON.stringify({
    id: 'account_sub',
    reqType: 'sub',
    dataType: 'ACCOUNT_UPDATE',
  }));
});

ws.on('message', (data) => {
  const message = JSON.parse(data.toString());
  console.log('Message:', message);
});

// Keep listen key alive (every 30 minutes)
setInterval(() => {
  bingx.keepAliveListenKey();
}, 30 * 60 * 1000);
```

## Rate Limiting

The SDK wrapper includes built-in rate limiting. Here's how to add it:

```typescript
class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private windowMs: number;
  
  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }
  
  async waitForSlot(): Promise<void> {
    const now = Date.now();
    this.requests = this.requests.filter(t => now - t < this.windowMs);
    
    if (this.requests.length >= this.maxRequests) {
      const waitTime = this.windowMs - (now - this.requests[0]) + 10;
      await new Promise(r => setTimeout(r, waitTime));
    }
    
    this.requests.push(Date.now());
  }
}

// Add to SDK constructor
this.rateLimiter = new RateLimiter(10, 1000); // 10 req/s for trading
```

## Related Documentation

- [BingX API Documentation](./README.md)
- [Local Order Book Management](./README.md#local-order-book-management)
- [Error Codes](./README.md#error-codes)
- [WebSocket Streams](./README.md#websocket-streams)
