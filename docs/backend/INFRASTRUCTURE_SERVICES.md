# Infrastructure Services Documentation

CITARION Platform Infrastructure Services - Core backend services for distributed trading system.

## Table of Contents

1. [Overview](#overview)
2. [Distributed Locks](#distributed-locks)
3. [Caching](#caching)
4. [Error Handling](#error-handling)
5. [Messaging](#messaging)
6. [WebSocket](#websocket)
7. [Event Queue](#event-queue)
8. [Signal Processing](#signal-processing)
9. [Rate Limiting](#rate-limiting)
10. [API Gateway](#api-gateway)
11. [Graceful Shutdown](#graceful-shutdown)
12. [Startup Service](#startup-service)
13. [Middleware](#middleware)
14. [Usage Examples](#usage-examples)

---

## Overview

Infrastructure Services provide the foundational components for the CITARION trading platform:

```
┌─────────────────────────────────────────────────────────────────┐
│                     Infrastructure Layer                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│  │  Distributed  │  │   Unified     │  │    Error      │       │
│  │     Locks     │  │     Cache     │  │   Handling    │       │
│  └───────────────┘  └───────────────┘  └───────────────┘       │
│                                                                  │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│  │   Messaging   │  │   WebSocket   │  │  Event Queue  │       │
│  │  (Redis/NATS) │  │    Manager    │  │    (DLQ)      │       │
│  └───────────────┘  └───────────────┘  └───────────────┘       │
│                                                                  │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│  │    Signal     │  │    Rate       │  │     API       │       │
│  │  Processing   │  │   Limiting    │  │    Gateway    │       │
│  └───────────────┘  └───────────────┘  └───────────────┘       │
│                                                                  │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│  │   Graceful    │  │   Startup     │  │     Risk      │       │
│  │   Shutdown    │  │   Service     │  │   Middleware  │       │
│  └───────────────┘  └───────────────┘  └───────────────┘       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Distributed Locks

### Overview

The distributed lock system prevents race conditions in bot processing, supporting both Redis-based (production) and in-memory (development) locks.

### Components

#### 1. Memory Lock

In-memory implementation for single-instance deployments.

```typescript
import { MemoryLock, getMemoryLock } from '@/lib/locks';

// Get singleton instance
const lock = getMemoryLock();

// Acquire lock
const acquired = await lock.acquire('resource-key', 30000, 'holder-id');

// Release lock
await lock.release('resource-key', 'holder-id');

// Execute with lock
const result = await lock.withLock('resource-key', 30000, async () => {
  // Critical section
  return { success: true };
});
```

**Features:**
- TTL-based expiration
- Automatic cleanup of expired locks
- Retry with exponential backoff
- Holder verification

#### 2. Redis Lock

Production-ready distributed lock using Redis SET NX EX pattern.

```typescript
import { 
  DistributedLock, 
  getDistributedLock,
  initializeDistributedLock 
} from '@/lib/locks';

// Initialize
const lock = await initializeDistributedLock({
  redisUrl: process.env.REDIS_URL
});

// Acquire with retry
const { acquired, holder, attempts } = await lock.acquireWithRetry(
  'bot:grid:bot-123',
  30000,
  {
    maxRetries: 5,
    initialDelay: 100,
    maxDelay: 5000,
  }
);

// Execute with auto-extend
const result = await lock.withLockAndAutoExtend(
  'long-operation',
  30000,
  async (extend) => {
    // Extend lock manually if needed
    await extend();
    
    // Long-running operation
    return await processData();
  }
);
```

**Features:**
- Atomic lock acquisition with Lua scripts
- Reentrant lock support
- Lock extension for long operations
- Auto-extend with timer

#### 3. Lock Manager

Unified API for both lock types with automatic fallback.

```typescript
import {
  acquireBotLock,
  releaseBotLock,
  withBotLock,
  withBotLockAutoExtend,
  getLockProvider,
  isRedisLock,
} from '@/lib/locks';

// Check provider
console.log(getLockProvider()); // 'redis' | 'memory'
console.log(isRedisLock()); // boolean

// Simple usage
const lock = await acquireBotLock('grid', 'bot-123', {
  ttl: 30000,
  maxRetries: 5,
});

if (lock.acquired) {
  try {
    // Process bot
  } finally {
    await releaseBotLock('grid', 'bot-123', lock.holder);
  }
}

// With auto-release
const result = await withBotLock('dca', 'bot-456', async () => {
  // Process bot - lock auto-released after
  return { processed: true };
});

// With auto-extend for long operations
const result = await withBotLockAutoExtend(
  'orion',
  'bot-789',
  async (extend) => {
    // Can extend manually
    await extend();
    return await longRunningProcess();
  }
);
```

### Lock Key Format

```
bot:{botType}:{botId}
```

**Supported Bot Types:**
- `grid` - Grid Bot
- `dca` - DCA Bot
- `bb` - BB Bot
- `vision` - Vision Bot
- `orion` - Orion Bot
- `argus` - Argus Bot
- `range` - Range Bot
- `logos` - LOGOS Bot

### Configuration

| Parameter | Default | Description |
|-----------|---------|-------------|
| `DEFAULT_TTL` | 30000 | Lock time-to-live (ms) |
| `MAX_RETRY_ATTEMPTS` | 5 | Maximum retry attempts |
| `RETRY_DELAY` | 100 | Initial retry delay (ms) |
| `MAX_RETRY_DELAY` | 5000 | Maximum retry delay (ms) |

---

## Caching

### Overview

Unified caching layer using Redis with in-memory fallback when Redis is unavailable.

### Components

#### 1. Redis Client

Core Redis client with caching and pub/sub support.

```typescript
import { redisCache } from '@/lib/cache/redis-client';

// Connect
await redisCache.connect('redis://localhost:6379');

// Basic operations
await redisCache.set('key', { data: 'value' }, { ttl: 60 });
const value = await redisCache.get('key');
await redisCache.delete('key');

// Cache-aside pattern
const data = await redisCache.getOrSet(
  'expensive-key',
  async () => {
    return await fetchData();
  },
  { ttl: 300 }
);

// Hash operations
await redisCache.hSet('user:123', 'settings', { theme: 'dark' });
const settings = await redisCache.hGet('user:123', 'settings');
const allData = await redisCache.hGetAll('user:123');

// Pub/Sub
await redisCache.subscribe('trading:signals', (message, channel) => {
  console.log(`Signal: ${JSON.stringify(message)}`);
});
await redisCache.publish('trading:signals', { symbol: 'BTCUSDT', action: 'BUY' });

// Rate limiting
const { allowed, remaining, resetAt } = await redisCache.checkRateLimit(
  'api:user:123',
  100,
  60
);
```

#### 2. Unified Cache Service

High-level caching for prices, positions, tickers, and orderbooks.

```typescript
import { unifiedCache } from '@/lib/cache/unified';

// Configure
unifiedCache.configure({
  priceTTL: 60,        // 1 minute
  positionTTL: 30,     // 30 seconds
  tickerTTL: 10,       // 10 seconds
  orderbookTTL: 5,     // 5 seconds
});

// Price caching
await unifiedCache.cachePrice('BTCUSDT', 'binance', 45000, 44999, 45001);
const price = await unifiedCache.getPrice('BTCUSDT', 'binance');

// Position caching
await unifiedCache.cachePosition('account-123', {
  id: 'pos-1',
  symbol: 'BTCUSDT',
  direction: 'LONG',
  amount: 0.1,
  avgEntryPrice: 44000,
  unrealizedPnl: 100,
  leverage: 10,
  timestamp: Date.now(),
});
const positions = await unifiedCache.getPositions('account-123');

// Ticker caching
await unifiedCache.cacheTicker('ETHUSDT', 'binance', {
  lastPrice: 2500,
  priceChange24h: 50,
  priceChangePercent24h: 2,
  volume24h: 1000000,
  high24h: 2550,
  low24h: 2450,
});
const ticker = await unifiedCache.getTicker('ETHUSDT', 'binance');

// Orderbook caching
await unifiedCache.cacheOrderbook('BTCUSDT', 'binance', {
  bids: [[45000, 1.5], [44999, 2.0]],
  asks: [[45001, 1.2], [45002, 1.8]],
});
const orderbook = await unifiedCache.getOrderbook('BTCUSDT', 'binance');

// Get or set with fetcher
const data = await unifiedCache.getOrSet(
  'custom-key',
  async () => fetchData(),
  60
);

// Invalidation
await unifiedCache.invalidatePosition('account-123', 'pos-1');
await unifiedCache.invalidatePattern('price:binance:*');
await unifiedCache.clearAll();
```

### Cache Types

```typescript
interface CachedPrice {
  symbol: string;
  exchange: string;
  price: number;
  bidPrice?: number;
  askPrice?: number;
  timestamp: number;
}

interface CachedPosition {
  id: string;
  symbol: string;
  direction: 'LONG' | 'SHORT';
  amount: number;
  avgEntryPrice: number;
  currentPrice?: number;
  unrealizedPnl: number;
  leverage: number;
  stopLoss?: number;
  takeProfit?: number;
  timestamp: number;
}

interface CachedTicker {
  symbol: string;
  exchange: string;
  lastPrice: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  timestamp: number;
}
```

### Cache Statistics

```typescript
const stats = unifiedCache.getStats();
// {
//   redis: {
//     available: true,
//     stats: {
//       hits: 1000,
//       misses: 50,
//       sets: 200,
//       deletes: 10,
//       hitRate: 0.95
//     }
//   }
// }
```

---

## Error Handling

### Overview

Structured error handling for trading operations with error codes, recovery strategies, and logging.

### Error Codes

```typescript
const TradingErrorCodes = {
  // Authentication & Authorization
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INVALID_API_KEY: 'INVALID_API_KEY',
  API_KEY_EXPIRED: 'API_KEY_EXPIRED',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  
  // Account & Balance
  ACCOUNT_NOT_FOUND: 'ACCOUNT_NOT_FOUND',
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  INSUFFICIENT_MARGIN: 'INSUFFICIENT_MARGIN',
  BALANCE_FETCH_FAILED: 'BALANCE_FETCH_FAILED',
  
  // Trading
  INVALID_SYMBOL: 'INVALID_SYMBOL',
  INVALID_QUANTITY: 'INVALID_QUANTITY',
  INVALID_PRICE: 'INVALID_PRICE',
  INVALID_LEVERAGE: 'INVALID_LEVERAGE',
  ORDER_NOT_FOUND: 'ORDER_NOT_FOUND',
  ORDER_REJECTED: 'ORDER_REJECTED',
  ORDER_TIMEOUT: 'ORDER_TIMEOUT',
  POSITION_NOT_FOUND: 'POSITION_NOT_FOUND',
  POSITION_SIZE_EXCEEDED: 'POSITION_SIZE_EXCEEDED',
  MAX_LEVERAGE_EXCEEDED: 'MAX_LEVERAGE_EXCEEDED',
  
  // Exchange
  EXCHANGE_UNAVAILABLE: 'EXCHANGE_UNAVAILABLE',
  EXCHANGE_RATE_LIMIT: 'EXCHANGE_RATE_LIMIT',
  EXCHANGE_MAINTENANCE: 'EXCHANGE_MAINTENANCE',
  EXCHANGE_ERROR: 'EXCHANGE_ERROR',
  
  // Signal Parsing
  SIGNAL_PARSE_FAILED: 'SIGNAL_PARSE_FAILED',
  SIGNAL_INVALID_FORMAT: 'SIGNAL_INVALID_FORMAT',
  SIGNAL_SYMBOL_NOT_ALLOWED: 'SIGNAL_SYMBOL_NOT_ALLOWED',
  
  // Bot Configuration
  BOT_NOT_FOUND: 'BOT_NOT_FOUND',
  BOT_INACTIVE: 'BOT_INACTIVE',
  BOT_CONFIG_INVALID: 'BOT_CONFIG_INVALID',
  
  // System
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  TIMEOUT: 'TIMEOUT',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};
```

### TradingError Class

```typescript
import { TradingError, isRetryableError, getRetryDelay } from '@/lib/errors';

// Create custom error
const error = new TradingError(
  'Insufficient USDT balance. Required: 1000, Available: 500',
  'INSUFFICIENT_BALANCE',
  false,  // recoverable
  400,     // httpStatus
  { required: 1000, available: 500, currency: 'USDT' }
);

// Convert to API response
const response = error.toResponse();
// { success: false, error: '...', code: 'INSUFFICIENT_BALANCE', ... }

// Check if retryable
if (isRetryableError(error)) {
  const delay = getRetryDelay(error);
  // Retry after delay
}
```

### Error Factories

```typescript
import {
  unauthorizedError,
  forbiddenError,
  invalidApiKeyError,
  accountNotFoundError,
  insufficientBalanceError,
  invalidSymbolError,
  orderRejectedError,
  positionNotFoundError,
  leverageExceededError,
  exchangeUnavailableError,
  exchangeRateLimitError,
  exchangeError,
  signalParseError,
  symbolNotAllowedError,
  internalError,
  timeoutError,
} from '@/lib/errors';

// Authentication errors
const auth = unauthorizedError('Session expired');
const forbidden = forbiddenError('Admin access required');
const apiKey = invalidApiKeyError('Invalid signature', { keyId: 'abc123' });

// Account errors
const account = accountNotFoundError('acc-123');
const balance = insufficientBalanceError(1000, 500, 'USDT');

// Trading errors
const symbol = invalidSymbolError('INVALIDCOIN');
const order = orderRejectedError('Insufficient margin', { orderId: '123' });
const position = positionNotFoundError('BTCUSDT');
const leverage = leverageExceededError(50, 20);

// Exchange errors
const unavailable = exchangeUnavailableError('binance');
const rateLimit = exchangeRateLimitError(60);  // retryAfter = 60s
const exchange = exchangeError('binance', 'Connection refused');

// Signal errors
const parse = signalParseError('Missing entry price');
const notAllowed = symbolNotAllowedError('SHIBUSDT', 'Not in whitelist');

// System errors
const internal = internalError('Database connection failed', { code: 'DB001' });
const timeout = timeoutError('order-placement', 30000);
```

### Error Handler Wrapper

```typescript
import { withErrorHandler } from '@/lib/errors';

// Wrap API handlers
export async function POST(request: Request) {
  return withErrorHandler(async () => {
    const body = await request.json();
    
    // Your handler logic
    if (!body.symbol) {
      throw invalidSymbolError('Missing symbol');
    }
    
    return NextResponse.json({ success: true, data: result });
  });
}
```

### Error Logging

```typescript
import { logTradingError } from '@/lib/errors';

try {
  await placeOrder(order);
} catch (error) {
  logTradingError(error, {
    operation: 'placeOrder',
    userId: 'user-123',
    accountId: 'acc-456',
    symbol: 'BTCUSDT',
    exchange: 'binance',
  });
}
```

---

## Messaging

### Overview

Async messaging patterns via Redis and NATS for inter-service communication.

### Redis Patterns

```typescript
import {
  MessageQueue,
  MessagePubSub,
  DistributedLock,
  CircuitBreaker,
  getMessagePubSub,
  getDistributedLock,
  createMessageQueue,
  createCircuitBreaker,
} from '@/lib/messaging/redis-patterns';

// Message Queue
const queue = createMessageQueue('trading-signals');

await queue.enqueue(
  { symbol: 'BTCUSDT', action: 'BUY', price: 45000 },
  { priority: 1, ttl: 60000 }
);

const item = await queue.dequeue(5000, 30000);
if (item) {
  try {
    await processSignal(item.message);
    await item.ack();
  } catch (error) {
    await item.nack();
  }
}

// Pub/Sub
const pubsub = getMessagePubSub();

// Subscribe
const unsubscribe = pubsub.subscribe('trading:signal:BTCUSDT', (message) => {
  console.log('Signal:', message);
});

// Publish
await pubsub.publish('trading:signal:BTCUSDT', {
  symbol: 'BTCUSDT',
  action: 'BUY',
});

// Pattern subscription
pubsub.psubscribe('trading:*', (channel, message) => {
  console.log(`Channel ${channel}:`, message);
});

// Circuit Breaker
const breaker = createCircuitBreaker({
  failureThreshold: 5,
  successThreshold: 3,
  timeout: 30000,
});

try {
  const result = await breaker.execute(async () => {
    return await callExternalService();
  });
} catch (error) {
  // Circuit is open or call failed
}
```

### NATS Message Queue

```typescript
import { 
  natsMessageQueue,
  EventSubjects,
  type Event,
  type EventHandler,
} from '@/lib/messaging/nats';

// Connect
await natsMessageQueue.connect({
  servers: ['nats://localhost:4222'],
  user: 'admin',
  pass: 'password',
});

// Subscribe to events
const unsubscribe = natsMessageQueue.subscribe(
  EventSubjects.TRADE_OPENED,
  async (event: Event<TradeData>) => {
    console.log('Trade opened:', event.data);
  }
);

// Publish events
await natsMessageQueue.publish(EventSubjects.POSITION_UPDATED, {
  positionId: 'pos-123',
  symbol: 'BTCUSDT',
  unrealizedPnl: 150,
  currentPrice: 45150,
});

// Request/Reply pattern
const response = await natsMessageQueue.request(
  'position.get',
  { positionId: 'pos-123' },
  5000
);

// Handle requests
natsMessageQueue.handleRequests('position.get', async (data) => {
  return await getPosition(data.positionId);
});

// Convenience methods
await natsMessageQueue.emitTradeOpened({
  tradeId: 'trade-1',
  symbol: 'BTCUSDT',
  direction: 'LONG',
  amount: 0.1,
  entryPrice: 45000,
  exchange: 'binance',
});

await natsMessageQueue.emitBotSignal({
  botId: 'bot-1',
  botType: 'grid',
  signal: 'BUY',
  symbol: 'BTCUSDT',
  confidence: 0.85,
});

await natsMessageQueue.emitRiskAlert({
  type: 'MARGIN_CALL',
  severity: 'critical',
  message: 'Margin usage exceeded 80%',
  details: { usage: 85 },
});
```

### Event Subjects

```typescript
const EventSubjects = {
  // Trading events
  TRADE_OPENED: 'trade.opened',
  TRADE_CLOSED: 'trade.closed',
  TRADE_UPDATED: 'trade.updated',
  ORDER_PLACED: 'order.placed',
  ORDER_FILLED: 'order.filled',
  ORDER_CANCELLED: 'order.cancelled',
  ORDER_REJECTED: 'order.rejected',
  
  // Position events
  POSITION_OPENED: 'position.opened',
  POSITION_CLOSED: 'position.closed',
  POSITION_UPDATED: 'position.updated',
  POSITION_LIQUIDATED: 'position.liquidated',
  
  // Bot events
  BOT_STARTED: 'bot.started',
  BOT_STOPPED: 'bot.stopped',
  BOT_PAUSED: 'bot.paused',
  BOT_RESUMED: 'bot.resumed',
  BOT_SIGNAL: 'bot.signal',
  BOT_ERROR: 'bot.error',
  
  // Market events
  PRICE_UPDATE: 'market.price',
  TICKER_UPDATE: 'market.ticker',
  FUNDING_RATE: 'market.funding',
  LIQUIDATION: 'market.liquidation',
  
  // Signal events
  SIGNAL_RECEIVED: 'signal.received',
  SIGNAL_PROCESSED: 'signal.processed',
  SIGNAL_REJECTED: 'signal.rejected',
  
  // Risk events
  RISK_ALERT: 'risk.alert',
  DRAWDOWN_WARNING: 'risk.drawdown',
  MARGIN_CALL: 'risk.margin_call',
  KILL_SWITCH: 'risk.kill_switch',
  
  // System events
  SYSTEM_STARTUP: 'system.startup',
  SYSTEM_SHUTDOWN: 'system.shutdown',
  HEALTH_CHECK: 'system.health',
  ERROR: 'system.error',
  
  // User events
  USER_LOGIN: 'user.login',
  USER_LOGOUT: 'user.logout',
  USER_SETTINGS_CHANGED: 'user.settings',
};
```

---

## WebSocket

### Overview

Unified WebSocket infrastructure for real-time price feeds, orderbook updates, and order notifications with state recovery.

### Exchange WebSocket Manager

```typescript
import {
  ExchangeWebSocketManager,
  exchangeWsManager,
  type WSConfig,
  type PriceUpdate,
  type OrderbookUpdate,
  type TradeUpdate,
} from '@/lib/websocket';

// Subscribe to price updates
const unsubscribePrice = exchangeWsManager.subscribeToPrice(
  'binance',
  'BTCUSDT',
  'futures',
  (update: PriceUpdate) => {
    console.log(`Price: ${update.price}, Spread: ${update.spread}%`);
  },
  {
    enableRecovery: true,
    onRecovery: (result) => {
      console.log(`Recovery: ${result.success}`);
    },
  }
);

// Subscribe to orderbook
const unsubscribeBook = exchangeWsManager.subscribeToOrderbook(
  'bybit',
  'ETHUSDT',
  'linear',
  (update: OrderbookUpdate) => {
    console.log(`Orderbook: ${update.bids.length} bids, ${update.asks.length} asks`);
  },
  { depth: 50 }
);

// Custom connection
const config: WSConfig = {
  exchange: 'okx',
  symbol: 'BTCUSDT',
  accountType: 'futures',
  channels: ['tickers', 'books'],
  enableRecovery: true,
  onMessage: (data) => console.log('Message:', data),
  onError: (error) => console.error('Error:', error),
  onReconnect: () => console.log('Reconnecting...'),
  onConnect: () => console.log('Connected'),
  onRecovery: (result) => console.log('Recovery:', result),
};

exchangeWsManager.connect(config);

// Connection state
const state = exchangeWsManager.getConnectionState('binance', 'BTCUSDT', 'futures');
// {
//   status: 'CONNECTED',
//   lastConnected: Date,
//   messagesReceived: 12345,
//   errors: 0,
//   lastSequence: 12345678,
//   recoveryInProgress: false
// }

// Health check
const health = exchangeWsManager.getConnectionHealth('binance-BTCUSDT');
// {
//   lastPong: 1699999999999,
//   timeSinceLastPong: 1000,
//   isHealthy: true
// }

// Disconnect
exchangeWsManager.disconnect('binance', 'BTCUSDT', 'futures');
exchangeWsManager.disconnectAll();
```

### Supported Exchanges

| Exchange | Spot | Futures | Linear | Inverse |
|----------|------|---------|--------|---------|
| Binance | ✅ | ✅ | - | ✅ |
| Bybit | ✅ | - | ✅ | ✅ |
| OKX | ✅ | ✅ | - | - |
| Bitget | ✅ | ✅ | - | - |
| BingX | - | ✅ | - | - |

### State Recovery

```typescript
import {
  WSStateRecovery,
  OrderbookRecovery,
  LocalOrderbook,
  wsStateRecovery,
  orderbookRecovery,
  createBinanceSnapshotFetcher,
  createBybitSnapshotFetcher,
  createOKXSnapshotFetcher,
  type ReconnectionResult,
} from '@/lib/websocket';

// Recovery is automatic, but you can also force resync
const result = await exchangeWsManager.forceResync('binance', 'BTCUSDT', 'futures');
// {
//   success: true,
//   missedMessages: 5,
//   bufferedApplied: 3,
//   gapsDetected: [123, 124, 125],
//   recoveryTime: 150
// }

// Get recovery stats
const stats = exchangeWsManager.getRecoveryStats();
// {
//   bufferSize: 100,
//   sequenceNumbers: Map { ... },
//   pendingRecoveries: []
// }

// Access local orderbook
const recovery = exchangeWsManager.getOrderbookRecovery();
const orderbook = recovery.getOrderbook('binance', 'BTCUSDT');

console.log('Best bid:', orderbook.getBestBid());
console.log('Best ask:', orderbook.getBestAsk());
console.log('Spread:', orderbook.getSpread());
console.log('Mid price:', orderbook.getMidPrice());
```

### Recovery Configuration

```typescript
interface WSRecoveryConfig {
  snapshotOnReconnect: boolean;  // Default: true
  maxBufferSize: number;         // Default: 1000
  sequenceValidation: boolean;   // Default: true
  gapHandling: 'resync' | 'ignore' | 'error';  // Default: 'resync'
  snapshotTimeout: number;       // Default: 10000ms
  maxBufferAge: number;          // Default: 60000ms
}
```

---

## Event Queue

### Overview

Dead Letter Queue (DLQ) for handling failed events with retry logic and exponential backoff.

### Dead Letter Queue

```typescript
import {
  DeadLetterQueue,
  getDeadLetterQueue,
  type DLQEvent,
  type DLQConfig,
} from '@/lib/event-queue';

const dlq = getDeadLetterQueue({
  maxRetries: 5,
  baseDelayMs: 1000,
  maxDelayMs: 300000,  // 5 minutes
  jitterFactor: 0.3,
  retentionMs: 86400000,  // 24 hours
  batchSize: 50,
  processingIntervalMs: 5000,
});

// Register handlers
dlq.registerHandler('order', async (event) => {
  // Retry order placement
  await placeOrder(event.payload);
  return true;  // Success
});

dlq.registerHandler('signal', async (event) => {
  // Retry signal processing
  await processSignal(event.payload);
  return true;
});

// Start processing
dlq.startProcessing();

// Add failed event
const eventId = dlq.addEvent(
  'order',
  { symbol: 'BTCUSDT', side: 'BUY', quantity: 0.1 },
  new Error('Connection refused'),
  {
    source: 'trading-api',
    priority: 'high',
    maxRetries: 3,
  }
);

// Manual retry
await dlq.retryEvent(eventId);

// Get metrics
const metrics = dlq.getMetrics();
// {
//   totalEvents: 100,
//   successfulRetries: 85,
//   permanentFailures: 10,
//   currentQueueSize: 5
// }

// Query events
const pending = dlq.getEventsByStatus('pending');
const orderEvents = dlq.getEventsByType('order');

// Stop processing
await dlq.shutdown();
```

### Event Types

```typescript
type DLQEventType = 
  | 'order'
  | 'signal'
  | 'trade'
  | 'position'
  | 'webhook'
  | 'websocket';

interface DLQEvent {
  id: string;
  type: DLQEventType;
  payload: unknown;
  error: {
    message: string;
    code?: string;
    stack?: string;
    timestamp: number;
  };
  metadata: {
    source: string;
    retryCount: number;
    maxRetries: number;
    createdAt: number;
    lastRetryAt?: number;
    nextRetryAt?: number;
    priority: 'low' | 'normal' | 'high' | 'critical';
  };
  status: 'pending' | 'processing' | 'retrying' | 'failed' | 'resolved';
}
```

### Exponential Backoff

The DLQ uses exponential backoff with jitter:

```
delay = min(baseDelay * 2^retryCount, maxDelay) + jitter
jitter = delay * jitterFactor * random()
```

---

## Signal Processing

### Overview

Double-entry protection for signal processing with deduplication and stale detection.

### Signal Deduplicator

```typescript
import {
  SignalDeduplicator,
  getSignalDeduplicator,
  shouldProcessSignal,
  markSignalProcessed,
  isSignalProcessed,
  toSignalForDedup,
  processSignalWithDedup,
  type SignalForDedup,
  type DuplicateCheckResult,
} from '@/lib/signal-processing';

// Convert parsed signal for deduplication
const signal: SignalForDedup = toSignalForDedup(parsedSignal);

// Check if already processed
const check = await shouldProcessSignal(signal);
if (!check.canProcess) {
  console.log('Duplicate signal:', check.reason);
  return;
}

// Process and mark
const positionId = await executeSignal(signal);
await markSignalProcessed(signal, {
  status: 'EXECUTED',
  positionId,
  processedAt: new Date(),
});

// Or use automatic wrapper
const result = await processSignalWithDedup(signal, async () => {
  return await executeSignal(signal);
});

if (result.processed) {
  console.log('Executed:', result.result);
} else {
  console.log('Duplicate:', result.duplicateReason);
}
```

### Deduplication Methods

1. **Exact Match** - Hash-based comparison of signal fingerprint
2. **Raw Text Match** - SHA-256 hash of original signal text
3. **Fuzzy Match** - Time window + price sliding window

```typescript
interface DeduplicatorConfig {
  defaultTTL: number;           // Default: 24 hours
  maxCacheSize: number;         // Default: 10000
  enablePersistence: boolean;   // Persist to database
  enableFuzzyMatching: boolean; // Enable fuzzy matching
  duplicateTimeWindow: number;  // Time window for fuzzy match
  priceSlidingWindow: number;   // Price tolerance (0.01 = 1%)
}
```

### Signal Cache

```typescript
import { SignalCache, getSignalCache } from '@/lib/signal-processing';

const cache = getSignalCache();

// Find similar signals
const similar = cache.findSimilar(
  'BTCUSDT',
  'LONG',
  [45000, 45100],
  3600000,  // 1 hour window
  0.01      // 1% price tolerance
);

// Get recent signals
const recent = await cache.getRecentSignals(50);
```

### Stale Signal Detector

```typescript
import {
  StaleSignalDetector,
  getStaleSignalDetector,
  type SignalWithTTL,
  type TrackedSignal,
} from '@/lib/signal-processing';

const detector = getStaleSignalDetector({
  defaultTTL: 30000,        // 30 seconds
  warningThreshold: 0.8,    // Warn at 80% of TTL
  checkInterval: 1000,      // Check every second
  maxSignalAge: 300000,     // 5 minutes max
  enableAutoReject: true,
});

// Track signal
const signalId = detector.trackSignal({
  id: 'sig-123',
  type: 'entry',
  symbol: 'BTCUSDT',
  side: 'buy',
  price: 45000,
  quantity: 0.1,
  timestamp: Date.now(),
  ttl: 30000,
  source: 'tradingview',
  botId: 'bot-1',
});

// Update status
detector.markProcessing(signalId);
detector.markExecuted(signalId);
detector.markRejected(signalId, 'Price moved too far');

// Register handlers
detector.onWarning('tradingview', (signal) => {
  console.warn('Signal approaching expiry:', signal.id);
});

detector.onExpired('tradingview', (signal) => {
  console.error('Signal expired:', signal.id);
});

// Start monitoring
detector.startMonitoring();

// Check validity
if (detector.isSignalValid(signalId)) {
  const remaining = detector.getRemainingTTL(signalId);
  console.log(`${remaining}ms remaining`);
}
```

---

## Rate Limiting

### Overview

Distributed rate limiting with Redis and multiple algorithms (Token Bucket, Sliding Window, Leaky Bucket).

### Redis Rate Limiter

```typescript
import {
  RedisRateLimiter,
  rateLimitByIp,
  rateLimitByUser,
  rateLimitByApiKey,
  rateLimitTrading,
  rateLimitMarket,
  createRateLimitMiddleware,
  type RateLimitConfig,
  type RateLimitResult,
} from '@/lib/rate-limiter';

// Connect
const limiter = RedisRateLimiter.getInstance();
await limiter.connect('redis://localhost:6379');

// Check limit
const result = await limiter.checkLimit('user-123', 'trading');
// {
//   allowed: true,
//   remaining: 25,
//   resetTime: Date,
//   retryAfter: undefined,
//   totalHits: 5
// }

// Convenience functions
const ipResult = await rateLimitByIp('192.168.1.1');
const userResult = await rateLimitByUser('user-123');
const apiKeyResult = await rateLimitByApiKey('api-key-abc');
const tradingResult = await rateLimitTrading('user-123');
const marketResult = await rateLimitMarket('user-123');

// Custom configuration
limiter.setConfig('custom', {
  windowMs: 60000,
  maxRequests: 100,
  keyPrefix: 'myapp:ratelimit:custom',
});
```

### Pre-configured Limits

| Config Key | Window | Max Requests | Use Case |
|------------|--------|--------------|----------|
| `default` | 60s | 100 | General API |
| `ip` | 60s | 200 | IP-based |
| `user` | 60s | 300 | User-based |
| `apiKey` | 60s | 1000 | API keys |
| `trading` | 60s | 30 | Trading operations |
| `market` | 1s | 20 | Market data |
| `analytics` | 60s | 50 | Analytics API |
| `webhook` | 60s | 500 | Webhooks |

### Middleware

```typescript
import { createRateLimitMiddleware } from '@/lib/rate-limiter';

// Next.js API route
const rateLimit = createRateLimitMiddleware('trading', {
  identifierExtractor: async (req) => {
    const authHeader = req.headers.get('authorization');
    return authHeader?.split(' ')[1] || 'anonymous';
  },
  onLimitReached: async (req, result) => {
    return new Response(JSON.stringify({
      error: 'Rate limit exceeded',
      retryAfter: result.retryAfter,
    }), { status: 429 });
  },
});

export async function POST(request: Request) {
  const limitResponse = await rateLimit(request);
  if (limitResponse) return limitResponse;
  
  // Process request
  return new Response(JSON.stringify({ success: true }));
}
```

### Gateway Rate Limiters

```typescript
import {
  DistributedRateLimiter,
  TokenBucketRateLimiter,
  LeakyBucketRateLimiter,
  rateLimiter,
} from '@/lib/gateway';

// Distributed (sliding window)
const distributed = rateLimiter;
const result = await distributed.check('user-123', 'api:trade');

// Token Bucket
const tokenBucket = new TokenBucketRateLimiter(
  100,  // maxTokens
  10,   // refillRate (tokens/second)
  1000  // refillInterval (ms)
);
const tbResult = await tokenBucket.consume('user-123', 1);

// Leaky Bucket
const leakyBucket = new LeakyBucketRateLimiter(
  100,  // capacity
  10    // leakRate (requests/second)
);
const allowed = await leakyBucket.tryAcquire('user-123');
```

---

## API Gateway

### Overview

API Gateway with request routing, circuit breaker, and load balancing.

### Components

```typescript
import {
  ApiGateway,
  CircuitBreaker,
  apiGateway,
  type RouteConfig,
  type GatewayMetrics,
  type CircuitState,
} from '@/lib/gateway';

// Gateway instance
const gateway = apiGateway;

// Register custom route
gateway.registerRoute({
  path: '/api/v1/custom',
  method: ['GET', 'POST'],
  service: 'custom-service',
  handler: 'customHandler',
  permissions: ['custom:read'],
  rateLimit: 50,
  cache: { enabled: true, ttl: 5000 },
});

// Get metrics
const metrics = gateway.getMetrics();
// {
//   requestsTotal: 10000,
//   requestsSuccess: 9500,
//   requestsFailed: 500,
//   avgLatency: 45,
//   activeConnections: 15,
//   circuitsOpen: 0
// }
```

### Circuit Breaker

```typescript
const circuit = new CircuitBreaker('trading-service', {
  failureThreshold: 5,
  successThreshold: 3,
  timeout: 30000,
  halfOpenMaxCalls: 3,
});

// Execute with fallback
const result = await circuit.execute(
  async () => {
    return await callTradingService();
  },
  async () => {
    // Fallback function
    return { cached: true, data: getCachedData() };
  }
);

// Check state
console.log(circuit.getState()); // 'closed' | 'open' | 'half_open'

// Reset
circuit.reset();
```

### Pre-configured Routes

| Route | Methods | Service | Rate Limit |
|-------|---------|---------|------------|
| `/api/v1/trade` | POST | trading | 10/min |
| `/api/v1/positions` | GET | trading | - |
| `/api/v1/positions/:id/close` | POST | trading | 5/min |
| `/api/v1/bots` | GET, POST | bots | - |
| `/api/v1/bots/:id` | GET, PUT, DELETE | bots | - |
| `/api/v1/bots/:id/start` | POST | bots | 5/min |
| `/api/v1/bots/:id/stop` | POST | bots | 5/min |
| `/api/v1/market/ticker` | GET | market | - |
| `/api/v1/market/klines` | GET | market | - |
| `/api/v1/market/orderbook` | GET | market | - |
| `/api/v1/analytics/pnl` | GET | analytics | - |
| `/api/v1/analytics/risk` | GET | analytics | - |
| `/api/v1/risk/var` | GET, POST | risk | - |
| `/api/v1/risk/limits` | GET, PUT | risk | - |
| `/api/v1/risk/kill-switch` | POST | risk | 1/min |

---

## Graceful Shutdown

### Overview

Robust shutdown handling for trading platform components with handler prioritization and timeout enforcement.

### Usage

```typescript
import {
  GracefulShutdown,
  setupGracefulShutdown,
  HandlerPriority,
  HandlerCategory,
  type ShutdownHandler,
} from '@/lib/graceful-shutdown';

// Setup with convenience API
const shutdown = setupGracefulShutdown({
  timeout: 45000,
  enableLogging: true,
});

// Register handlers by category
shutdown.registerPositionCloser(async () => {
  // Critical: Close all positions
  const positions = await getOpenPositions();
  for (const pos of positions) {
    await closePosition(pos.id);
  }
});

shutdown.registerBotStopper(async () => {
  // High: Stop all bots
  await botManager.stopAll();
});

shutdown.registerStateSaver('bot-states', async () => {
  // High: Save states
  await botManager.persistStates();
});

shutdown.registerConnectionCloser('database', async () => {
  // Normal: Close DB
  await db.$disconnect();
});

shutdown.registerConnectionCloser('redis', async () => {
  // Normal: Close Redis
  await redisCache.disconnect();
});

shutdown.registerCleanup('temp-files', async () => {
  // Low: Cleanup
  await cleanupTempFiles();
});
```

### Handler Priority

| Priority | Level | Use Case |
|----------|-------|----------|
| 0 | CRITICAL | Emergency position close |
| 1 | HIGH | Stop bots, save state |
| 2 | NORMAL | Close connections |
| 3 | LOW | Cleanup, logging |

### Handler Categories

- `BOT_STOPPER` - Stop all active trading bots
- `POSITION_CLOSER` - Close open positions
- `CONNECTION_CLOSER` - Close DB, Redis, WebSocket
- `STATE_SAVER` - Persist state before shutdown
- `CLEANUP` - General cleanup
- `CUSTOM` - Custom handler type

### Advanced Usage

```typescript
const manager = GracefulShutdown.getInstance({
  timeout: 60000,
  enableLogging: true,
});

// Register with full control
manager.registerHandler({
  name: 'Emergency Position Close',
  category: HandlerCategory.POSITION_CLOSER,
  priority: HandlerPriority.CRITICAL,
  handler: async () => {
    await closeAllPositions();
  },
  timeout: 15000,
  continueOnFailure: false,
});

// Setup signal handlers
manager.setupSignalHandlers();

// Check status
if (manager.isShuttingDown()) {
  console.log('Shutdown in progress');
}

const status = manager.getStatus();
// {
//   isShuttingDown: true,
//   signal: 'SIGTERM',
//   startTime: 1699999999999,
//   graceful: false,
//   forced: false,
//   handlerResults: [...],
//   summary: { total: 5, completed: 3, failed: 0, ... }
// }
```

### Signals Handled

- `SIGTERM` - Termination signal (from process manager)
- `SIGINT` - Interrupt signal (Ctrl+C)
- `SIGHUP` - Hangup signal (terminal closed)

---

## Startup Service

### Overview

Initializes all background services when the application starts.

### Usage

```typescript
import {
  initializeServices,
  shutdownServices,
  isServiceInitialized,
  getInitializedServices,
  healthCheck,
} from '@/lib/startup-service';

// Initialize all services
const result = await initializeServices();
// {
//   success: true,
//   services: {
//     'funding-websocket': { status: 'connected' }
//   }
// }

// Check specific service
if (isServiceInitialized('funding-websocket')) {
  console.log('Funding WebSocket is running');
}

// Get all initialized services
const services = getInitializedServices();
// ['funding-websocket']

// Health check
const health = await healthCheck();
// {
//   'funding-websocket': {
//     healthy: true,
//     details: '5 symbols tracked'
//   }
// }

// Graceful shutdown
await shutdownServices();
```

### Auto-initialization

The startup service auto-initializes on import in server environment:

```typescript
// In server environment, this runs automatically
if (typeof window === 'undefined') {
  initializeServices()
    .then(result => {
      if (result.success) {
        console.log('[Startup] All services initialized');
      }
    });
}
```

---

## Middleware

### Risk Middleware

Pre-execution risk checks and validation for trading operations.

```typescript
import {
  RiskMiddleware,
  riskMiddleware,
  type RiskCheckResult,
  type RiskConfig,
  type PortfolioState,
} from '@/lib/middleware/risk-middleware';

// Check trade risk
const result = await riskMiddleware.checkTradeRisk(
  'user-123',
  'account-456',
  {
    symbol: 'BTCUSDT',
    direction: 'LONG',
    entryPrices: [45000],
    leverage: 10,
    stopLoss: 44000,
    takeProfits: [{ price: 46000, percent: 50 }],
  }
);

if (!result.allowed) {
  console.log('Trade rejected:', result.reason);
  console.log('Risk level:', result.riskLevel);
}

// Result includes warnings and adjustments
if (result.warnings) {
  console.log('Warnings:', result.warnings);
}

if (result.adjustments) {
  // Suggested adjustments to make trade safer
  for (const adj of result.adjustments) {
    console.log(`${adj.field}: ${adj.originalValue} -> ${adj.suggestedValue}`);
  }
}
```

### Risk Configuration

```typescript
interface RiskConfig {
  // Position limits
  maxPositionSize: number;         // Maximum position size in USD
  maxPositionPercent: number;      // Maximum % of portfolio
  maxOpenPositions: number;        // Maximum concurrent positions
  maxOpenPositionsPerSymbol: number;
  
  // Leverage limits
  maxLeverage: number;             // Maximum leverage allowed
  defaultLeverage: number;
  
  // Drawdown limits
  maxDailyDrawdown: number;        // Maximum daily drawdown %
  maxWeeklyDrawdown: number;
  maxMonthlyDrawdown: number;
  
  // Exposure limits
  maxExposurePercent: number;
  maxCorrelatedExposure: number;
  
  // Order limits
  maxOrderValue: number;
  minOrderValue: number;
  maxOrdersPerMinute: number;
  maxOrdersPerHour: number;
  
  // Stop loss requirements
  requireStopLoss: boolean;
  minStopLossPercent: number;
  maxStopLossPercent: number;
  
  // Take profit requirements
  requireTakeProfit: boolean;
  minTakeProfitPercent: number;
  maxTakeProfitTargets: number;
  
  // Time restrictions
  allowedTradingHours?: { start: number; end: number };
  tradingDays?: number[];
  
  // Exchange restrictions
  allowedExchanges: string[];
  blockedExchanges: string[];
  allowedSymbols: string[];
  blockedSymbols: string[];
  
  // Risk score thresholds
  maxRiskScore: number;
  requireConfirmationAbove: number;
  
  // Margin requirements
  minMarginReserve: number;
  maxMarginUsage: number;
}
```

### Risk Checks Performed

1. **Position Limits** - Max positions, position size, concentration
2. **Leverage Limits** - Max leverage, auto-adjustment
3. **Drawdown Limits** - Daily, weekly, monthly drawdown
4. **Exposure Limits** - Total exposure, correlated exposure
5. **Stop Loss Requirements** - Required, min/max distance
6. **Take Profit Requirements** - Required, max targets
7. **Order Value Limits** - Min/max order value
8. **Rate Limits** - Orders per minute/hour
9. **Time Restrictions** - Trading hours, trading days
10. **Symbol Restrictions** - Allowed/blocked symbols
11. **Exchange Restrictions** - Allowed/blocked exchanges
12. **Margin Requirements** - Reserve, usage limits
13. **Risk/Reward Ratio** - Favorable R:R check

---

## Usage Examples

### Example 1: Bot Processing with Lock

```typescript
import { withBotLockAutoExtend } from '@/lib/locks';
import { riskMiddleware } from '@/lib/middleware/risk-middleware';
import { getSignalDeduplicator } from '@/lib/signal-processing';

async function processGridBot(botId: string, signal: Signal) {
  // Acquire lock with auto-extend
  const result = await withBotLockAutoExtend(
    'grid',
    botId,
    async (extend) => {
      // Check for duplicate
      const deduplicator = getSignalDeduplicator();
      const check = await deduplicator.shouldProcessSignal(signal);
      
      if (!check.canProcess) {
        return { success: false, reason: check.reason };
      }
      
      // Risk check
      const riskCheck = await riskMiddleware.checkTradeRisk(
        signal.userId,
        signal.accountId,
        signal
      );
      
      if (!riskCheck.allowed) {
        return { success: false, reason: riskCheck.reason };
      }
      
      // Extend lock for long operation
      await extend();
      
      // Execute signal
      const positionId = await executeSignal(signal);
      
      // Mark as processed
      await deduplicator.markExecuted(signal, positionId);
      
      return { success: true, positionId };
    },
    { ttl: 30000, maxRetries: 3 }
  );
  
  return result;
}
```

### Example 2: Real-time Price Streaming

```typescript
import { exchangeWsManager } from '@/lib/websocket';
import { unifiedCache } from '@/lib/cache';

// Start streaming prices
const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];
const unsubscribers: (() => void)[] = [];

for (const symbol of symbols) {
  const unsub = exchangeWsManager.subscribeToPrice(
    'binance',
    symbol,
    'futures',
    async (update) => {
      // Cache price
      await unifiedCache.cachePrice(
        update.symbol,
        update.exchange,
        update.price,
        update.bid,
        update.ask
      );
      
      // Emit to subscribers
      await natsMessageQueue.emitPriceUpdate({
        symbol: update.symbol,
        exchange: update.exchange,
        price: update.price,
        bidPrice: update.bid,
        askPrice: update.ask,
      });
    }
  );
  
  unsubscribers.push(unsub);
}

// Cleanup on shutdown
const shutdown = setupGracefulShutdown();
shutdown.registerCleanup('price-streaming', async () => {
  for (const unsub of unsubscribers) {
    unsub();
  }
});
```

### Example 3: Signal Processing Pipeline

```typescript
import { getStaleSignalDetector, getSignalDeduplicator } from '@/lib/signal-processing';
import { getDeadLetterQueue } from '@/lib/event-queue';
import { natsMessageQueue, EventSubjects } from '@/lib/messaging/nats';

async function processIncomingSignal(rawSignal: string, source: string) {
  const dlq = getDeadLetterQueue();
  const detector = getStaleSignalDetector();
  const deduplicator = getSignalDeduplicator();
  
  try {
    // 1. Parse signal
    const signal = parseSignal(rawSignal);
    
    // 2. Track with TTL
    const signalId = detector.trackSignal({
      ...signal,
      ttl: 30000,
      source,
    });
    
    // 3. Check staleness
    if (!detector.isSignalValid(signalId)) {
      detector.markRejected(signalId, 'Signal expired');
      await natsMessageQueue.publish(EventSubjects.SIGNAL_REJECTED, {
        signal,
        reason: 'expired',
      });
      return;
    }
    
    // 4. Check duplicate
    const dupCheck = await deduplicator.shouldProcessSignal(signal);
    if (!dupCheck.canProcess) {
      detector.markRejected(signalId, 'Duplicate signal');
      return;
    }
    
    // 5. Mark as processing
    detector.markProcessing(signalId);
    
    // 6. Execute signal
    const result = await executeSignal(signal);
    
    // 7. Mark as executed
    detector.markExecuted(signalId);
    await deduplicator.markExecuted(signal, result.positionId);
    
    // 8. Emit event
    await natsMessageQueue.publish(EventSubjects.SIGNAL_PROCESSED, {
      signal,
      result,
    });
    
  } catch (error) {
    // Add to DLQ for retry
    dlq.addEvent('signal', rawSignal, error, {
      source,
      priority: 'high',
    });
  }
}
```

### Example 4: API Route with Rate Limiting

```typescript
import { createRateLimitMiddleware } from '@/lib/rate-limiter';
import { withErrorHandler, TradingError } from '@/lib/errors';
import { riskMiddleware } from '@/lib/middleware/risk-middleware';
import { NextResponse } from 'next/server';

const rateLimit = createRateLimitMiddleware('trading', {
  identifierExtractor: async (req) => {
    const userId = req.headers.get('x-user-id');
    return userId || 'anonymous';
  },
});

export async function POST(request: Request) {
  // Rate limit check
  const limitResponse = await rateLimit(request);
  if (limitResponse) return limitResponse;
  
  // Error handling wrapper
  return withErrorHandler(async () => {
    const body = await request.json();
    const userId = request.headers.get('x-user-id')!;
    const accountId = request.headers.get('x-account-id')!;
    
    // Risk check
    const riskCheck = await riskMiddleware.checkTradeRisk(
      userId,
      accountId,
      body
    );
    
    if (!riskCheck.allowed) {
      throw new TradingError(
        riskCheck.reason!,
        'RISK_CHECK_FAILED',
        false,
        400,
        { riskLevel: riskCheck.riskLevel }
      );
    }
    
    // Execute trade
    const result = await executeTrade(body);
    
    return NextResponse.json({ success: true, data: result });
  });
}
```

### Example 5: Distributed Bot Execution

```typescript
import { withBotLock } from '@/lib/locks';
import { redisCache } from '@/lib/cache';
import { natsMessageQueue, EventSubjects } from '@/lib/messaging/nats';

async function executeDistributedBot(
  botType: 'grid' | 'dca' | 'bb',
  botId: string
) {
  // Try to acquire lock across all instances
  const result = await withBotLock(
    botType,
    botId,
    async () => {
      // Get cached state
      const state = await redisCache.get(`bot:${botType}:${botId}:state`);
      
      // Execute bot logic
      const actions = await executeBotLogic(botType, state);
      
      // Update state
      const newState = { ...state, lastRun: Date.now() };
      await redisCache.set(
        `bot:${botType}:${botId}:state`,
        newState,
        { ttl: 300 }
      );
      
      // Publish updates
      for (const action of actions) {
        await natsMessageQueue.publish(EventSubjects.BOT_SIGNAL, {
          botId,
          botType,
          signal: action,
        });
      }
      
      return { success: true, actions: actions.length };
    },
    { ttl: 60000, maxRetries: 0 }
  );
  
  if (!result.success) {
    // Another instance is processing this bot
    console.log(`Bot ${botId} is being processed by another instance`);
  }
  
  return result;
}
```

---

## Related Documentation

- [Backend API Reference](./BACKEND_API_REFERENCE.md)
- [Cron Jobs API](./CRON_JOBS_API.md)
- [Auto Trading API](./AUTO_TRADING_API.md)
- [Signals API](./SIGNALS_API_COMPLETE.md)
- [Exchange Clients & Copy Trading](./EXCHANGE_CLIENTS_COPY_TRADING.md)
- [ML Services](./ML_SERVICES_COMPLETE.md)
