# CITARION WebSocket Protocol

> **Last Updated:** March 2025  
> **Version:** 1.0.0  
> **Transport:** Socket.IO over WebSocket

---

## Table of Contents

1. [Overview](#overview)
2. [Connection](#connection)
3. [Event Types](#event-types)
4. [Payload Schemas](#payload-schemas)
5. [Heartbeat](#heartbeat)
6. [Reconnection Strategy](#reconnection-strategy)
7. [Subscription Management](#subscription-management)
8. [Error Handling](#error-handling)

---

## Overview

CITARION uses WebSocket for real-time communication across multiple microservices.

### Services and Ports

| Service | Port | Purpose |
|---------|------|---------|
| Price Service | 3002 | Real-time price feeds |
| Bot Monitor | 3003 | Bot status and trade events |
| Risk Monitor | 3004 | Risk metrics and alerts |
| Chat Service | 3005 | Oracle AI assistant |
| ML Service | 3006 | ML predictions |

### Protocol Stack

```
┌─────────────────────────────────────────┐
│           Application Layer             │
│  (Price Updates, Bot Events, Signals)   │
├─────────────────────────────────────────┤
│           Socket.IO Layer               │
│  (Event-based communication, Rooms)     │
├─────────────────────────────────────────┤
│           WebSocket Layer               │
│  (Persistent connection, Binary frame)  │
├─────────────────────────────────────────┤
│              TCP/IP                     │
└─────────────────────────────────────────┘
```

---

## Connection

### Connection URL

```javascript
// Frontend connection pattern
import { io } from 'socket.io-client';

// Connect to service via gateway
const socket = io('/?XTransformPort=3002', {
  // Options
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  transports: ['websocket'],
});
```

### Authentication

```javascript
// With JWT token
const socket = io('/?XTransformPort=3003', {
  auth: {
    token: 'your-jwt-token',
  },
});

// Server-side validation
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  
  try {
    const user = await verifyToken(token);
    socket.data.userId = user.id;
    next();
  } catch (error) {
    next(new Error('Authentication failed'));
  }
});
```

### Connection Events

```typescript
// Client events
socket.on('connect', () => {
  console.log('Connected with ID:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
  // reason: 'io server disconnect' | 'io client disconnect' | 
  //         'ping timeout' | 'transport close' | 'transport error'
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error.message);
});
```

---

## Event Types

### Price Service (Port 3002)

| Event | Direction | Description |
|-------|-----------|-------------|
| `price_update` | Server → Client | Real-time price update |
| `initial_prices` | Server → Client | All prices on connect |
| `subscribe` | Client → Server | Subscribe to symbols |
| `unsubscribe` | Client → Server | Unsubscribe from symbols |

### Bot Monitor (Port 3003)

| Event | Direction | Description |
|-------|-----------|-------------|
| `bot_update` | Server → Client | Bot status change |
| `bot_metrics` | Server → Client | Bot performance metrics |
| `bot_event` | Server → Client | Trade/signal event |
| `initial_data` | Server → Client | All bots on connect |
| `start_bot` | Client → Server | Start a bot |
| `stop_bot` | Client → Server | Stop a bot |
| `pause_bot` | Client → Server | Pause a bot |

### Risk Monitor (Port 3004)

| Event | Direction | Description |
|-------|-----------|-------------|
| `risk_update` | Server → Client | Risk metrics update |
| `risk_alert` | Server → Client | Risk threshold alert |
| `killswitch_triggered` | Server → Client | Kill switch activated |
| `killswitch_update` | Server → Client | Kill switch status |
| `trigger_killswitch` | Client → Server | Trigger kill switch |
| `arm_killswitch` | Client → Server | Arm kill switch |

### Chat Service (Port 3005)

| Event | Direction | Description |
|-------|-----------|-------------|
| `message` | Server ↔ Client | Chat message |
| `signal_detected` | Server → Client | Parsed trading signal |
| `position_update` | Server → Client | Position from signal |
| `mode_change` | Server → Client | Trading mode changed |

### ML Service (Port 3006)

| Event | Direction | Description |
|-------|-----------|-------------|
| `prediction` | Server → Client | ML prediction result |
| `subscribe_predictions` | Client → Server | Subscribe to predictions |
| `prediction_request` | Client → Server | Request on-demand prediction |

---

## Payload Schemas

### Price Update

```typescript
interface PriceUpdate {
  symbol: string;           // 'BTCUSDT'
  exchange: string;         // 'binance'
  price: number;            // 67500.50
  bidPrice?: number;        // 67500.00
  askPrice?: number;        // 67501.00
  change24h: number;        // 2.5 (percent)
  high24h?: number;         // 68000
  low24h?: number;          // 66000
  volume24h?: number;       // 1500000000
  timestamp: number;        // Unix timestamp
}

// Example
{
  "symbol": "BTCUSDT",
  "exchange": "binance",
  "price": 67500.50,
  "change24h": 2.5,
  "timestamp": 1710316800000
}
```

### Bot Update

```typescript
interface BotUpdate {
  botId: string;
  botType: 'grid' | 'dca' | 'bb' | 'vision' | 'logos' | 'institutional';
  symbol: string;
  status: 'STOPPED' | 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'ERROR';
  previousStatus?: string;
  reason?: string;
  timestamp: number;
}

// Example
{
  "botId": "bot_abc123",
  "botType": "grid",
  "symbol": "BTCUSDT",
  "status": "RUNNING",
  "previousStatus": "STOPPED",
  "reason": "Manual start",
  "timestamp": 1710316800000
}
```

### Bot Metrics

```typescript
interface BotMetrics {
  botId: string;
  totalTrades: number;
  totalPnL: number;
  winRate: number;          // 0-1
  profitFactor: number;
  maxDrawdown: number;
  sharpeRatio?: number;
  timestamp: number;
}

// Example
{
  "botId": "bot_abc123",
  "totalTrades": 150,
  "totalPnL": 1250.50,
  "winRate": 0.65,
  "profitFactor": 1.8,
  "maxDrawdown": 5.2,
  "timestamp": 1710316800000
}
```

### Bot Event

```typescript
interface BotEvent {
  botId: string;
  eventType: 'trade' | 'signal' | 'position_update' | 'error';
  data: TradeEvent | SignalEvent | PositionEvent | ErrorEvent;
  timestamp: number;
}

interface TradeEvent {
  tradeId: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  price: number;
  quantity: number;
  pnl?: number;
}

interface SignalEvent {
  signalId: number;
  symbol: string;
  direction: 'LONG' | 'SHORT';
  type: 'entry' | 'exit';
  confidence?: number;
}

// Example
{
  "botId": "bot_abc123",
  "eventType": "trade",
  "data": {
    "tradeId": "trade_xyz",
    "symbol": "BTCUSDT",
    "side": "BUY",
    "price": 67500,
    "quantity": 0.001,
    "pnl": null
  },
  "timestamp": 1710316800000
}
```

### Risk Update

```typescript
interface RiskUpdate {
  riskScore: number;        // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  totalExposure: number;
  drawdown: number;
  varValue: number;         // Value at Risk
  volatilityRegime: 'low' | 'normal' | 'high';
  timestamp: number;
}

// Example
{
  "riskScore": 45,
  "riskLevel": "medium",
  "totalExposure": 5000,
  "drawdown": 5.2,
  "varValue": -250,
  "volatilityRegime": "normal",
  "timestamp": 1710316800000
}
```

### Risk Alert

```typescript
interface RiskAlert {
  alertId: string;
  type: 'drawdown_warning' | 'drawdown_critical' | 'exposure_limit' | 
        'correlation_high' | 'liquidation_risk';
  severity: 'warning' | 'critical';
  message: string;
  value: number;
  threshold: number;
  timestamp: number;
}

// Example
{
  "alertId": "alert_123",
  "type": "drawdown_warning",
  "severity": "warning",
  "message": "Drawdown exceeded 10%",
  "value": 10.5,
  "threshold": 10,
  "timestamp": 1710316800000
}
```

### Chat Message

```typescript
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  type: 'text' | 'signal' | 'command' | 'error';
  data?: SignalData | CommandResult;
  timestamp: number;
}

interface SignalData {
  symbol: string;
  direction: 'LONG' | 'SHORT';
  entryPrices: number[];
  takeProfits: Array<{ price: number; percentage: number }>;
  stopLoss?: number;
  leverage: number;
}

// Example
{
  "id": "msg_123",
  "role": "assistant",
  "content": "Signal parsed successfully",
  "type": "signal",
  "data": {
    "symbol": "BTCUSDT",
    "direction": "LONG",
    "entryPrices": [67000],
    "takeProfits": [{"price": 68000, "percentage": 50}],
    "stopLoss": 66000,
    "leverage": 10
  },
  "timestamp": 1710316800000
}
```

### ML Prediction

```typescript
interface MLPrediction {
  type: 'price' | 'signal' | 'regime';
  symbol: string;
  horizon: string;          // '1h', '4h', '24h'
  prediction: PricePrediction | SignalPrediction | RegimePrediction;
  timestamp: number;
}

interface PricePrediction {
  direction: 'UP' | 'DOWN' | 'NEUTRAL';
  expectedChange: number;   // decimal, e.g., 0.025 = 2.5%
  confidence: number;       // 0-1
  priceTarget: number;
}

interface SignalPrediction {
  direction: 'LONG' | 'SHORT' | 'HOLD';
  probability: number;      // 0-1
  confidence: number;
  features: string[];
}

interface RegimePrediction {
  regime: 'BULL' | 'BEAR' | 'SIDEWAYS';
  probability: number;
  transitionMatrix?: number[][];
}

// Example
{
  "type": "price",
  "symbol": "BTCUSDT",
  "horizon": "1h",
  "prediction": {
    "direction": "UP",
    "expectedChange": 0.025,
    "confidence": 0.72,
    "priceTarget": 69187.50
  },
  "timestamp": 1710316800000
}
```

---

## Heartbeat

### Server-Side Heartbeat

```typescript
// Socket.IO default configuration
const io = new Server(httpServer, {
  pingInterval: 25000,    // Send ping every 25 seconds
  pingTimeout: 60000,     // Wait 60 seconds for pong
});

// Custom heartbeat for business logic
setInterval(() => {
  io.emit('heartbeat', { 
    serverTime: Date.now(),
    connectedClients: io.sockets.sockets.size,
  });
}, 30000);
```

### Client-Side Heartbeat Handler

```typescript
let lastHeartbeat = Date.now();

socket.on('heartbeat', (data) => {
  lastHeartbeat = Date.now();
  console.log('Heartbeat received:', data.serverTime);
});

// Check connection health
setInterval(() => {
  if (Date.now() - lastHeartbeat > 60000) {
    console.warn('No heartbeat for 60 seconds, reconnecting...');
    socket.disconnect();
    socket.connect();
  }
}, 30000);
```

---

## Reconnection Strategy

### Exponential Backoff

```typescript
const socket = io('/?XTransformPort=3002', {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,       // Initial delay: 1 second
  reconnectionDelayMax: 30000,   // Max delay: 30 seconds
  randomizationFactor: 0.5,      // Randomize to avoid thundering herd
});

socket.on('reconnect', (attemptNumber) => {
  console.log('Reconnected after', attemptNumber, 'attempts');
  
  // Re-subscribe to data
  socket.emit('subscribe', { symbols: subscribedSymbols });
});

socket.on('reconnect_attempt', (attemptNumber) => {
  console.log('Reconnection attempt', attemptNumber);
});

socket.on('reconnect_failed', () => {
  console.error('Reconnection failed after max attempts');
  // Fallback to polling or show error
});
```

### Connection State Machine

```
        ┌────────────────────────────────────────────┐
        │                                            │
        ▼                                            │
   ┌─────────┐      connect       ┌────────────┐    │
   │   IDLE  │ ──────────────────▶│ CONNECTING │    │
   └─────────┘                    └─────┬──────┘    │
        ▲                               │           │
        │                          ┌────┴────┐      │
        │                          │ success │      │
        │                          └────┬────┘      │
        │                               │           │
        │                               ▼           │
        │                         ┌──────────┐     │
        │         disconnect      │ CONNECTED│─────┤
        │  ◄─────────────────────┤          │     │
        │                         └────┬─────┘     │
        │                              │           │
        │                         ┌────┴────┐      │
        │                         │  error  │      │
        │                         └────┬────┘      │
        │                              │           │
        │                              ▼           │
        │                       ┌─────────────┐   │
        │                       │RECONNECTING │───┘
        │                       └─────────────┘
        │                              │
        │         max_attempts         │
        └──────────────────────────────┘
```

---

## Subscription Management

### Subscribe to Symbols

```typescript
// Client
socket.emit('subscribe', {
  symbols: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'],
  exchanges: ['binance', 'bybit'],  // Optional
});

// Server
socket.on('subscribe', (data) => {
  const { symbols, exchanges } = data;
  
  // Join rooms
  symbols.forEach(symbol => {
    socket.join(`symbol:${symbol}`);
  });
  
  // Confirm subscription
  socket.emit('subscribed', {
    symbols,
    success: true,
  });
});
```

### Unsubscribe

```typescript
// Client
socket.emit('unsubscribe', {
  symbols: ['BTCUSDT'],
});

// Server
socket.on('unsubscribe', (data) => {
  data.symbols.forEach(symbol => {
    socket.leave(`symbol:${symbol}`);
  });
  
  socket.emit('unsubscribed', { symbols: data.symbols });
});
```

### Room-Based Broadcasting

```typescript
// Server: Broadcast to specific symbol subscribers
io.to(`symbol:BTCUSDT`).emit('price_update', priceData);

// Server: Broadcast to all connected clients
io.emit('system_notification', notification);

// Server: Broadcast to user's personal room
io.to(`user:${userId}`).emit('personal_update', data);
```

---

## Error Handling

### Error Event Types

```typescript
interface WebSocketError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  recoverable: boolean;
  timestamp: number;
}

// Error codes
const WS_ERROR_CODES = {
  // Connection errors
  WS_AUTH_FAILED: 'Authentication failed',
  WS_RATE_LIMITED: 'Rate limit exceeded',
  WS_SERVER_ERROR: 'Internal server error',
  
  // Subscription errors
  WS_INVALID_SYMBOL: 'Invalid symbol format',
  WS_SYMBOL_NOT_FOUND: 'Symbol not supported',
  WS_MAX_SUBSCRIPTIONS: 'Maximum subscriptions exceeded',
  
  // Data errors
  WS_INVALID_PAYLOAD: 'Invalid payload format',
  WS_MISSING_FIELDS: 'Required fields missing',
} as const;
```

### Server-Side Error Handling

```typescript
// Emit error to client
socket.emit('error', {
  code: 'WS_INVALID_SYMBOL',
  message: 'Symbol INVALID is not supported',
  recoverable: true,
  timestamp: Date.now(),
});

// Handle client errors
socket.on('error', (error) => {
  console.error('Client error:', error);
});

// Global error handler
io.on('connection', (socket) => {
  socket.on('error', (err) => {
    console.error(`Socket ${socket.id} error:`, err);
    
    if (err.message.includes('Authentication')) {
      socket.disconnect(true);
    }
  });
});
```

### Client-Side Error Handling

```typescript
socket.on('error', (error: WebSocketError) => {
  console.error('WebSocket error:', error.code, error.message);
  
  switch (error.code) {
    case 'WS_AUTH_FAILED':
      // Redirect to login
      window.location.href = '/login';
      break;
      
    case 'WS_RATE_LIMITED':
      // Wait and retry
      setTimeout(() => socket.connect(), 5000);
      break;
      
    case 'WS_INVALID_SYMBOL':
      // Remove invalid symbol from list
      removeSymbolFromSubscription(error.details?.symbol);
      break;
      
    default:
      // Show generic error
      showErrorToast(error.message);
  }
});
```

---

## TypeScript Interfaces

```typescript
// types/websocket.ts

export interface WebSocketClientOptions {
  url: string;
  port: number;
  auth?: {
    token?: string;
  };
  reconnection?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
  reconnectionDelayMax?: number;
  timeout?: number;
  transports?: ('websocket' | 'polling')[];
}

export interface SubscriptionOptions {
  symbols?: string[];
  channels?: string[];
  exchanges?: string[];
}

export type EventHandler<T = unknown> = (data: T) => void;

export interface WebSocketClient {
  connect(): void;
  disconnect(): void;
  subscribe(options: SubscriptionOptions): void;
  unsubscribe(options: SubscriptionOptions): void;
  on<T>(event: string, handler: EventHandler<T>): void;
  off(event: string, handler?: EventHandler): void;
  emit(event: string, data: unknown): void;
  isConnected(): boolean;
}
```

---

## Best Practices

### DO ✅

1. **Use the gateway** - Always use `XTransformPort` query parameter
2. **Handle reconnection** - Re-subscribe after reconnect
3. **Validate data** - Check payload structure before using
4. **Clean up listeners** - Remove listeners on unmount
5. **Rate limit subscriptions** - Don't subscribe to too many symbols

### DON'T ❌

1. **Direct port connection** - Never use `localhost:PORT` directly
2. **Ignore disconnect events** - Always handle gracefully
3. **Block main thread** - Use async handlers
4. **Memory leak listeners** - Always clean up on disconnect
5. **Trust all data** - Validate server messages

---

## Related Documentation

- [API_SPECIFICATION.md](../architecture/API_SPECIFICATION.md) - REST API
- [FRONTEND_ARCHITECTURE.md](../architecture/FRONTEND_ARCHITECTURE.md) - Frontend patterns
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - WebSocket debugging
