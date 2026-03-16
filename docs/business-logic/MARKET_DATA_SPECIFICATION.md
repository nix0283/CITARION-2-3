# CITARION Market Data Specification

**Version:** 1.0
**Last Updated:** March 2026
**Status:** Production Ready

---

## Table of Contents

1. [Overview](#1-overview)
2. [Data Types](#2-data-types)
3. [OHLCV Data](#3-ohlcv-data)
4. [Ticker Data](#4-ticker-data)
5. [Order Book Data](#5-order-book-data)
6. [Trade Data](#6-trade-data)
7. [Funding Rate Data](#7-funding-rate-data)
8. [WebSocket Streams](#8-websocket-streams)
9. [Data Storage](#9-data-storage)
10. [API Endpoints](#10-api-endpoints)

---

## 1. Overview

### 1.1 Purpose

This document specifies the market data formats, sources, and processing within CITARION for algorithmic trading.

### 1.2 Data Sources

| Source | Type | Coverage | Latency |
|--------|------|----------|---------|
| Exchange REST APIs | Historical | All pairs | ~100ms |
| Exchange WebSocket | Real-time | All pairs | <10ms |
| Internal Cache | Cached | Active pairs | <1ms |
| Database | Historical | All stored | ~50ms |

### 1.3 Supported Exchanges

```
Binance, Bybit, OKX, Bitget, BingX, KuCoin
```

---

## 2. Data Types

### 2.1 Data Type Overview

| Type | Description | Update Frequency |
|------|-------------|------------------|
| OHLCV | Candlestick data | Per candle close |
| Ticker | Current price info | Real-time |
| Order Book | Bid/Ask depth | Real-time |
| Trades | Individual trades | Real-time |
| Funding Rate | Perpetual funding | 8 hours |
| Liquidations | Forced closures | Real-time |

### 2.2 Timeframes

| Timeframe | Interval | Use Case |
|-----------|----------|----------|
| 1s | 1 second | HFT, scalping |
| 1m | 1 minute | Day trading |
| 5m | 5 minutes | Short-term |
| 15m | 15 minutes | Intraday |
| 1h | 1 hour | Swing trading |
| 4h | 4 hours | Position trading |
| 1d | 1 day | Long-term |
| 1w | 1 week | Trend analysis |

---

## 3. OHLCV Data

### 3.1 OHLCV Structure

```typescript
interface OhlcvCandle {
  symbol: string;
  exchange: string;
  timeframe: Timeframe;
  openTime: Date;
  closeTime: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  quoteVolume?: number;
  trades?: number;
  takerBuyVolume?: number;
  takerBuyQuoteVolume?: number;
  isFinal: boolean;
}
```

### 3.2 OHLCV Response Format

```json
{
  "symbol": "BTCUSDT",
  "exchange": "binance",
  "timeframe": "1h",
  "data": [
    {
      "openTime": 1678905600000,
      "closeTime": 1678909199999,
      "open": 50000.00,
      "high": 50500.00,
      "low": 49800.00,
      "close": 50200.00,
      "volume": 1234.56,
      "quoteVolume": 61891234.56,
      "trades": 15000,
      "takerBuyVolume": 600.0,
      "takerBuyQuoteVolume": 30120000.00,
      "isFinal": true
    }
  ]
}
```

### 3.3 OHLCV Storage Schema

```sql
CREATE TABLE ohlcv_candles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol VARCHAR(20) NOT NULL,
  exchange VARCHAR(20) NOT NULL,
  timeframe VARCHAR(5) NOT NULL,
  open_time TIMESTAMP WITH TIME ZONE NOT NULL,
  close_time TIMESTAMP WITH TIME ZONE NOT NULL,
  open DECIMAL(20, 8) NOT NULL,
  high DECIMAL(20, 8) NOT NULL,
  low DECIMAL(20, 8) NOT NULL,
  close DECIMAL(20, 8) NOT NULL,
  volume DECIMAL(20, 8) NOT NULL,
  quote_volume DECIMAL(20, 8),
  trades INTEGER,
  taker_buy_volume DECIMAL(20, 8),
  taker_buy_quote_volume DECIMAL(20, 8),
  is_final BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(symbol, exchange, timeframe, open_time)
);

-- TimescaleDB hypertable
SELECT create_hypertable('ohlcv_candles', 'open_time', 
  chunk_time_interval => INTERVAL '1 day'
);
```

### 3.4 OHLCV Fetching

```typescript
class OhlcvService {
  async fetchOhlcv(
    symbol: string,
    exchange: string,
    timeframe: Timeframe,
    limit: number = 500,
    startTime?: Date,
    endTime?: Date
  ): Promise<OhlcvCandle[]> {
    // 1. Check cache first
    const cached = await this.cache.get(this.getCacheKey(...));
    if (cached) return cached;

    // 2. Fetch from database
    const dbData = await this.fetchFromDatabase(...);
    
    // 3. If insufficient, fetch from exchange
    if (dbData.length < limit) {
      const exchangeData = await this.fetchFromExchange(...);
      await this.storeCandles(exchangeData);
      return this.mergeAndSort(dbData, exchangeData);
    }
    
    return dbData;
  }
}
```

---

## 4. Ticker Data

### 4.1 Ticker Structure

```typescript
interface Ticker {
  symbol: string;
  exchange: string;
  price: number;
  bidPrice: number;
  bidQuantity: number;
  askPrice: number;
  askQuantity: number;
  openPrice?: number;
  highPrice?: number;
  lowPrice?: number;
  volume?: number;
  quoteVolume?: number;
  priceChange?: number;
  priceChangePercent?: number;
  lastUpdate: Date;
}
```

### 4.2 Ticker Response Format

```json
{
  "symbol": "BTCUSDT",
  "exchange": "binance",
  "price": 50123.45,
  "bidPrice": 50123.40,
  "bidQuantity": 1.5,
  "askPrice": 50123.50,
  "askQuantity": 2.0,
  "openPrice": 49800.00,
  "highPrice": 50500.00,
  "lowPrice": 49500.00,
  "volume": 15000.00,
  "quoteVolume": 750000000.00,
  "priceChange": 323.45,
  "priceChangePercent": 0.65,
  "lastUpdate": "2026-03-15T10:30:00.000Z"
}
```

### 4.3 Ticker Update Frequency

| Update Type | Frequency | Storage |
|-------------|-----------|---------|
| Real-time | Every trade | In-memory |
| Snapshot | Every second | Database |
| Historical | Daily | Database |

### 4.4 Price Aggregation

```typescript
class PriceService {
  private priceCache: Map<string, CachedPrice> = new Map();
  
  async getPrice(symbol: string, exchange: string): Promise<number> {
    const cacheKey = `${exchange}:${symbol}`;
    const cached = this.priceCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < 5000) {
      return cached.price;
    }
    
    // Fetch from WebSocket, database, or API
    const price = await this.fetchPrice(symbol, exchange);
    this.priceCache.set(cacheKey, { price, timestamp: Date.now() });
    
    return price;
  }
}
```

---

## 5. Order Book Data

### 5.1 Order Book Structure

```typescript
interface OrderBook {
  symbol: string;
  exchange: string;
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  lastUpdateId: number;
  timestamp: Date;
}

interface OrderBookLevel {
  price: number;
  quantity: number;
}
```

### 5.2 Order Book Response Format

```json
{
  "symbol": "BTCUSDT",
  "exchange": "binance",
  "lastUpdateId": 123456789,
  "timestamp": "2026-03-15T10:30:00.000Z",
  "bids": [
    ["50123.40", "1.5"],
    ["50123.30", "2.0"],
    ["50123.20", "3.5"]
  ],
  "asks": [
    ["50123.50", "2.0"],
    ["50123.60", "1.5"],
    ["50123.70", "2.5"]
  ]
}
```

### 5.3 Order Book Depth

```typescript
enum OrderBookDepth {
  SHALLOW = 5,      // Top 5 levels
  STANDARD = 20,    // Top 20 levels
  DEEP = 100,       // Top 100 levels
  FULL = 5000,      // Full order book
}
```

### 5.4 Order Book Metrics

```typescript
interface OrderBookMetrics {
  spread: number;           // ask - bid
  spreadPercent: number;    // spread / midPrice
  midPrice: number;         // (bid + ask) / 2
  imbalance: number;        // (bidQty - askQty) / (bidQty + askQty)
  depth: number;            // Total quantity within range
  liquidity: number;        // Estimated liquidity
}
```

---

## 6. Trade Data

### 6.1 Trade Structure

```typescript
interface Trade {
  id: string;
  symbol: string;
  exchange: string;
  price: number;
  quantity: number;
  quoteQuantity: number;
  time: Date;
  isBuyerMaker: boolean;
  side: 'BUY' | 'SELL';
}
```

### 6.2 Trade Response Format

```json
{
  "id": "12345",
  "symbol": "BTCUSDT",
  "exchange": "binance",
  "price": 50123.45,
  "quantity": 0.5,
  "quoteQuantity": 25061.72,
  "time": "2026-03-15T10:30:00.123Z",
  "isBuyerMaker": false,
  "side": "BUY"
}
```

### 6.3 Trade Aggregation

```typescript
// Aggregate trades by time window
interface AggregatedTrade {
  symbol: string;
  startTime: Date;
  endTime: Date;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
  totalVolume: number;
  totalQuoteVolume: number;
  tradeCount: number;
  buyVolume: number;
  sellVolume: number;
}
```

---

## 7. Funding Rate Data

### 7.1 Funding Rate Structure

```typescript
interface FundingRate {
  symbol: string;
  exchange: string;
  fundingRate: number;
  fundingTime: Date;
  markPrice: number;
  indexPrice: number;
  estimatedSettlePrice?: number;
  nextFundingTime?: Date;
  nextFundingRate?: number;
}
```

### 7.2 Funding Rate Response

```json
{
  "symbol": "BTCUSDT",
  "exchange": "binance",
  "fundingRate": 0.0001,
  "fundingTime": "2026-03-15T08:00:00.000Z",
  "markPrice": 50123.45,
  "indexPrice": 50120.00,
  "estimatedSettlePrice": 50122.00,
  "nextFundingTime": "2026-03-15T16:00:00.000Z",
  "nextFundingRate": 0.00012
}
```

### 7.3 Funding Rate History

```typescript
interface FundingRateHistory {
  symbol: string;
  exchange: string;
  rates: {
    fundingTime: Date;
    fundingRate: number;
    markPrice: number;
    indexPrice: number;
  }[];
}
```

### 7.4 Funding Rate Calculation

```typescript
class FundingRateCalculator {
  // Calculate estimated funding payment
  calculateFundingPayment(
    positionSize: number,
    entryPrice: number,
    fundingRate: number
  ): number {
    // Funding = Position Value * Funding Rate
    // Positive: Longs pay Shorts
    // Negative: Shorts pay Longs
    const positionValue = positionSize * entryPrice;
    return positionValue * fundingRate;
  }
  
  // Predict next funding rate
  predictFundingRate(
    markPrice: number,
    indexPrice: number,
    interestRate: number = 0.0001
  ): number {
    const premium = (markPrice - indexPrice) / indexPrice;
    const clamp = Math.max(-0.0005, Math.min(0.0005, premium));
    return interestRate + clamp;
  }
}
```

---

## 8. WebSocket Streams

### 8.1 Connection Management

```typescript
interface WebSocketConfig {
  exchange: string;
  subscriptions: Subscription[];
  reconnect: boolean;
  reconnectDelay: number;
  pingInterval: number;
}

interface Subscription {
  stream: string;
  callback: (data: any) => void;
}
```

### 8.2 Stream Types

| Stream | Format | Description |
|--------|--------|-------------|
| Trade | `<symbol>@trade` | Individual trades |
| AggTrade | `<symbol>@aggTrade` | Aggregated trades |
| Kline | `<symbol>@kline_<interval>` | OHLCV candles |
| MiniTicker | `<symbol>@miniTicker` | Basic price info |
| Ticker | `<symbol>@ticker` | Full ticker info |
| BookTicker | `<symbol>@bookTicker` | Best bid/ask |
| Depth | `<symbol>@depth<levels>` | Order book |

### 8.3 WebSocket Message Formats

**Trade Message:**
```json
{
  "e": "trade",
  "E": 1678905600000,
  "s": "BTCUSDT",
  "t": 12345,
  "p": "50123.45",
  "q": "0.5",
  "b": 123,
  "a": 456,
  "T": 1678905600123,
  "m": false
}
```

**Kline Message:**
```json
{
  "e": "kline",
  "E": 1678905600000,
  "s": "BTCUSDT",
  "k": {
    "t": 1678905600000,
    "T": 1678909199999,
    "s": "BTCUSDT",
    "i": "1h",
    "o": "50000.00",
    "c": "50123.45",
    "h": "50500.00",
    "l": "49800.00",
    "v": "1234.56",
    "q": "61891234.56",
    "n": 15000,
    "x": false
  }
}
```

### 8.4 WebSocket Implementation

```typescript
class ExchangeWebSocketManager {
  private connections: Map<string, WebSocket> = new Map();
  
  async subscribe(
    exchange: string,
    stream: string,
    callback: Function
  ): Promise<void> {
    const ws = await this.getConnection(exchange);
    
    ws.send(JSON.stringify({
      method: 'SUBSCRIBE',
      params: [stream],
      id: Date.now()
    }));
    
    ws.on('message', (data) => {
      const parsed = JSON.parse(data.toString());
      if (this.matchesStream(parsed, stream)) {
        callback(parsed);
      }
    });
  }
  
  async unsubscribe(exchange: string, stream: string): Promise<void> {
    const ws = this.connections.get(exchange);
    if (ws) {
      ws.send(JSON.stringify({
        method: 'UNSUBSCRIBE',
        params: [stream],
        id: Date.now()
      }));
    }
  }
}
```

---

## 9. Data Storage

### 9.1 Storage Strategy

| Data Type | Hot Storage | Warm Storage | Cold Storage |
|-----------|-------------|--------------|--------------|
| OHLCV (1m) | 7 days | 90 days | S3 (compressed) |
| OHLCV (1h+) | 30 days | 1 year | S3 (compressed) |
| Trades | 24 hours | 7 days | S3 (compressed) |
| Tickers | 1 day | 7 days | S3 (compressed) |
| Funding Rates | 30 days | 1 year | S3 (compressed) |

### 9.2 Data Retention Policies

```sql
-- Automatic data retention
SELECT add_retention_policy('ohlcv_candles_1m', INTERVAL '90 days');
SELECT add_retention_policy('ohlcv_candles_1h', INTERVAL '730 days');
SELECT add_retention_policy('trade_history', INTERVAL '7 days');
SELECT add_retention_policy('ticker_history', INTERVAL '7 days');

-- Compression policy
SELECT add_compression_policy('ohlcv_candles', INTERVAL '7 days');
```

### 9.3 Data Aggregation Jobs

```typescript
class DataAggregationService {
  // Aggregate 1m candles to higher timeframes
  @Cron('*/5 * * * *') // Every 5 minutes
  async aggregateCandles(): Promise<void> {
    await this.aggregateToTimeframe('1m', '5m');
    await this.aggregateToTimeframe('5m', '15m');
    await this.aggregateToTimeframe('15m', '1h');
    await this.aggregateToTimeframe('1h', '4h');
    await this.aggregateToTimeframe('4h', '1d');
  }
  
  private async aggregateToTimeframe(
    fromTimeframe: string,
    toTimeframe: string
  ): Promise<void> {
    const query = `
      INSERT INTO ohlcv_candles_${toTimeframe}
      SELECT 
        symbol,
        exchange,
        time_bucket('${toTimeframe}', open_time) as open_time,
        first(open, open_time) as open,
        max(high) as high,
        min(low) as low,
        last(close, open_time) as close,
        sum(volume) as volume
      FROM ohlcv_candles_${fromTimeframe}
      WHERE open_time >= now() - INTERVAL '${toTimeframe}'
      GROUP BY symbol, exchange, time_bucket('${toTimeframe}', open_time)
      ON CONFLICT (symbol, exchange, open_time) DO UPDATE
      SET high = EXCLUDED.high, low = EXCLUDED.low, 
          close = EXCLUDED.close, volume = EXCLUDED.volume
    `;
    
    await this.db.$executeRawUnsafe(query);
  }
}
```

---

## 10. API Endpoints

### 10.1 Market Data Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/market/prices` | GET | Get current prices |
| `/api/market/tickers` | GET | Get ticker data |
| `/api/market/candles` | GET | Get OHLCV candles |
| `/api/market/orderbook` | GET | Get order book |
| `/api/market/trades` | GET | Get recent trades |
| `/api/market/funding` | GET | Get funding rates |

### 10.2 Endpoint Details

**GET /api/market/prices**
```typescript
// Query params
interface PriceQuery {
  symbols?: string;     // Comma-separated, e.g., "BTCUSDT,ETHUSDT"
  exchange?: string;    // Exchange ID
}

// Response
interface PriceResponse {
  prices: {
    symbol: string;
    price: number;
    change24h: number;
    changePercent24h: number;
    lastUpdate: Date;
  }[];
}
```

**GET /api/market/candles**
```typescript
// Query params
interface CandlesQuery {
  symbol: string;
  exchange?: string;
  timeframe?: Timeframe;
  limit?: number;
  startTime?: Date;
  endTime?: Date;
}

// Response
interface CandlesResponse {
  symbol: string;
  exchange: string;
  timeframe: Timeframe;
  candles: OhlcvCandle[];
}
```

### 10.3 Rate Limits

| Endpoint | Rate Limit | Burst |
|----------|------------|-------|
| /api/market/prices | 100/min | 20 |
| /api/market/candles | 50/min | 10 |
| /api/market/orderbook | 30/min | 5 |
| /api/market/trades | 30/min | 5 |

---

## Appendix A: Symbol Format

### Standard Format

```
{BASE}{QUOTE}  (e.g., BTCUSDT, ETHUSDT)
```

### Exchange-Specific Formats

| Exchange | BTC/USDT | Format |
|----------|----------|--------|
| Binance | BTCUSDT | No separator |
| Bybit | BTCUSDT | No separator |
| OKX | BTC-USDT-SWAP | With dashes |
| Bitget | BTCUSDT | No separator |
| BingX | BTC-USDT | With dash |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | March 2026 | CITARION Team | Initial release |

---

*This document is part of the CITARION Documentation Suite.*
