# Trade Events Service

**Version:** 2.0 | **Port:** 3003 | **Last Updated:** March 2026

---

## 📋 Overview

The Trade Events Service provides real-time trade event confirmations and notifications. It handles order lifecycle events, position updates, and trade confirmations with automatic retry and timeout mechanisms.

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   TRADE EVENTS SERVICE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                 Event Processor                          │   │
│  │        (Confirmation & Retry Logic)                      │   │
│  └─────────────────────────┬───────────────────────────────┘   │
│                            │                                    │
│         ┌──────────────────┼──────────────────┐                │
│         ▼                  ▼                  ▼                │
│  ┌────────────┐    ┌────────────┐    ┌────────────┐           │
│  │   Order    │    │  Position  │    │   Trade    │           │
│  │  Events    │    │  Events    │    │ Confirm.   │           │
│  └────────────┘    └────────────┘    └────────────┘           │
│                            │                                    │
│                            ▼                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Socket.IO Server (Port 3003)                │   │
│  │              Health Check (Port 3004)                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

- **Real-Time Trade Confirmations** - Instant trade event notifications
- **Event History** - Maintain event history for reconnection
- **Confirmation Tracking** - Track event confirmations with timeout
- **Automatic Retry** - Retry failed confirmations (up to 3 attempts)
- **User/Account Filtering** - Subscribe to specific users or accounts
- **Multi-Source Confirmations** - WebSocket, Exchange, Manual confirmations
- **Statistics** - Real-time event statistics

---

## 🔌 REST API

### Health Check

```http
GET /health?XTransformPort=3003
```

**Response:**
```json
{
  "status": "healthy",
  "service": "trade-events-service",
  "port": 3003,
  "stats": {
    "connectedClients": 5,
    "totalEventsProcessed": 1234,
    "pendingConfirmations": 3,
    "eventsByType": {
      "order_filled": 500,
      "position_opened": 300,
      "tp_hit": 234
    },
    "uptime": 3600
  }
}
```

### Get Events

```http
GET /events?XTransformPort=3003
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | string | No | Filter by user ID |
| accountId | string | No | Filter by account ID |
| symbol | string | No | Filter by symbol |
| type | string | No | Filter by event type |
| limit | number | No | Limit number of results (default: 50) |

**Response:**
```json
{
  "events": [
    {
      "id": "evt_1700000000_abc123",
      "type": "order_filled",
      "timestamp": "2026-03-15T10:30:00.000Z",
      "userId": "user-123",
      "accountId": "account-456",
      "symbol": "BTCUSDT",
      "exchange": "binance",
      "direction": "LONG",
      "price": 67000.50,
      "quantity": 0.1,
      "status": "confirmed",
      "isDemo": true,
      "tradingMode": "DEMO"
    }
  ],
  "count": 1
}
```

### Confirm Event

```http
POST /events/:id/confirm?XTransformPort=3003
```

**Request Body:**
```json
{
  "source": "WEBSOCKET",
  "confirmedBy": "user-123",
  "data": {}
}
```

**Response:**
```json
{
  "success": true,
  "eventId": "evt_1700000000_abc123",
  "confirmedAt": "2026-03-15T10:30:05.000Z"
}
```

---

## 🔄 WebSocket Events

### Connection

```javascript
import { io } from 'socket.io-client';

const ws = io('http://localhost:3000', {
  path: '/socket.io',
  query: { XTransformPort: '3003' }
});
```

### Client → Server Events

#### Authenticate

```javascript
ws.emit('authenticate', {
  userId: 'user-123',
  accountIds: ['account-456', 'account-789']
});
```

#### Subscribe to Events

```javascript
ws.emit('subscribe', {
  userId: 'user-123',
  symbols: ['BTCUSDT', 'ETHUSDT'],
  exchanges: ['binance', 'bybit'],
  eventTypes: ['order_filled', 'position_opened']
});
```

#### Unsubscribe

```javascript
ws.emit('unsubscribe');
```

#### Emit Trade Event

```javascript
ws.emit('emit_event', {
  type: 'order_filled',
  userId: 'user-123',
  accountId: 'account-456',
  symbol: 'BTCUSDT',
  exchange: 'binance',
  direction: 'LONG',
  price: 67000.50,
  quantity: 0.1,
  status: 'pending',
  isDemo: true,
  tradingMode: 'DEMO'
});
```

#### Confirm Event

```javascript
ws.emit('confirm_event', {
  eventId: 'evt_1700000000_abc123',
  confirmation: {
    source: 'WEBSOCKET',
    confirmedBy: 'user-123'
  }
});
```

#### Reject Event

```javascript
ws.emit('reject_event', {
  eventId: 'evt_1700000000_abc123',
  reason: 'Invalid order',
  errorCode: 'INVALID_ORDER'
});
```

#### Get Events

```javascript
ws.emit('get_events', {
  symbol: 'BTCUSDT',
  type: 'order_filled',
  limit: 50
});
```

#### Get Pending Events

```javascript
ws.emit('get_pending_events');
```

#### Get Statistics

```javascript
ws.emit('get_stats');
```

#### Heartbeat

```javascript
ws.emit('ping');
```

### Server → Client Events

#### Connected (on connection)

```javascript
ws.on('connected', (data) => {
  // data = { clientId, serverTime, message }
});
```

#### Authenticated

```javascript
ws.on('authenticated', (data) => {
  // data = { userId, accountIds }
});
```

#### Initial Events (on connection)

```javascript
ws.on('initial_events', (data) => {
  // data = { events: [...], count: number }
});
```

#### Trade Event

```javascript
ws.on('trade_event', (event) => {
  console.log('Trade event:', event.type, event.symbol);
  // event = {
  //   id: 'evt_xxx',
  //   type: 'order_filled',
  //   timestamp: Date,
  //   userId: 'user-123',
  //   accountId: 'account-456',
  //   tradeId: 'trade-xxx',
  //   positionId: 'pos-xxx',
  //   orderId: 'order-xxx',
  //   symbol: 'BTCUSDT',
  //   exchange: 'binance',
  //   direction: 'LONG',
  //   price: 67000.50,
  //   quantity: 0.1,
  //   pnl: 150.25,
  //   status: 'confirmed',
  //   isDemo: true,
  //   tradingMode: 'DEMO'
  // }
});
```

#### Event Emitted

```javascript
ws.on('event_emitted', (data) => {
  // data = { eventId, timestamp }
});
```

#### Event Confirmed

```javascript
ws.on('event_confirmed', (data) => {
  // data = { eventId, confirmedAt }
});
```

#### Event Rejected

```javascript
ws.on('event_rejected', (data) => {
  // data = { eventId, reason }
});
```

#### Events List

```javascript
ws.on('events', (data) => {
  // data = { events: [...], count: number, filters: {...} }
});
```

#### Pending Events

```javascript
ws.on('pending_events', (data) => {
  // data = { events: [...], count: number }
});
```

#### Statistics

```javascript
ws.on('stats', (stats) => {
  // stats = { connectedClients, totalEventsProcessed, ... }
});
```

#### Server Shutdown

```javascript
ws.on('server_shutdown', (data) => {
  // data = { message, timestamp }
});
```

---

## 📊 Event Types and Payloads

### Event Types

| Type | Description |
|------|-------------|
| `order_placed` | Order submitted to exchange |
| `order_filled` | Order executed successfully |
| `order_cancelled` | Order cancelled |
| `order_rejected` | Order rejected by exchange |
| `position_opened` | New position opened |
| `position_closed` | Position closed |
| `tp_hit` | Take profit hit |
| `sl_hit` | Stop loss hit |

### Event Statuses

| Status | Description |
|--------|-------------|
| `pending` | Event awaiting confirmation |
| `confirmed` | Event confirmed |
| `failed` | Event failed |
| `cancelled` | Event cancelled |

### Full Event Payload

```typescript
interface TradeEvent {
  id: string;
  type: TradeEventType;
  timestamp: Date;
  userId: string;
  accountId: string;
  
  // Trade details
  tradeId?: string;
  positionId?: string;
  orderId?: string;
  clientOrderId?: string;
  
  // Symbol info
  symbol: string;
  exchange: string;
  direction: 'LONG' | 'SHORT';
  
  // Price info
  price?: number;
  entryPrice?: number;
  exitPrice?: number;
  avgPrice?: number;
  
  // Size info
  quantity?: number;
  amount?: number;
  leverage?: number;
  
  // PnL
  pnl?: number;
  pnlPercent?: number;
  fee?: number;
  
  // Status
  status: TradeEventStatus;
  reason?: string;
  errorCode?: string;
  errorMessage?: string;
  
  // Confirmation data
  confirmations?: TradeConfirmation[];
  confirmedAt?: Date;
  
  // Metadata
  isDemo: boolean;
  tradingMode: 'DEMO' | 'TESTNET' | 'LIVE';
  metadata?: Record<string, unknown>;
}
```

### Confirmation Interface

```typescript
interface TradeConfirmation {
  source: 'WEBSOCKET' | 'EXCHANGE' | 'MANUAL';
  timestamp: Date;
  confirmedBy?: string;
  data?: Record<string, unknown>;
}
```

---

## ⚙️ Configuration

### Environment Variables

```env
# Environment
NODE_ENV=development

# CORS - Comma-separated list of allowed origins
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://app.citarion.com

# Confirmation timeout (ms)
CONFIRMATION_TIMEOUT=30000

# Maximum retry attempts
MAX_RETRY_ATTEMPTS=3

# Maximum history size
MAX_HISTORY_SIZE=1000
```

### Timeout and Retry Configuration

| Setting | Value | Description |
|---------|-------|-------------|
| Confirmation Timeout | 30s | Time to wait for confirmation |
| Max Retry Attempts | 3 | Retries before marking as failed |
| Max History Size | 1000 | Events kept in memory |
| Ping Timeout | 60s | WebSocket ping timeout |
| Ping Interval | 25s | WebSocket ping interval |

---

## 📝 Examples

### React Hook for Trade Events

```typescript
import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface TradeEvent {
  id: string;
  type: string;
  symbol: string;
  price: number;
  quantity: number;
  status: string;
  timestamp: Date;
}

export function useTradeEvents(options?: {
  userId?: string;
  symbols?: string[];
}) {
  const [events, setEvents] = useState<TradeEvent[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [connected, setConnected] = useState(false);
  const [ws, setWs] = useState<Socket | null>(null);

  useEffect(() => {
    const socket: Socket = io('/', {
      path: '/socket.io',
      query: { XTransformPort: '3003' }
    });

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    socket.on('initial_events', (data) => {
      setEvents(data.events);
    });

    socket.on('trade_event', (event: TradeEvent) => {
      setEvents(prev => [event, ...prev].slice(0, 100));
    });

    socket.on('pending_events', (data) => {
      setPendingCount(data.count);
    });

    // Authenticate if userId provided
    if (options?.userId) {
      socket.emit('authenticate', { userId: options.userId });
    }

    // Subscribe to specific symbols
    if (options?.symbols) {
      socket.emit('subscribe', { symbols: options.symbols });
    }

    setWs(socket);

    return () => socket.disconnect();
  }, [options?.userId, options?.symbols?.join(',')]);

  const confirmEvent = useCallback((eventId: string) => {
    ws?.emit('confirm_event', {
      eventId,
      confirmation: { source: 'WEBSOCKET' }
    });
  }, [ws]);

  const rejectEvent = useCallback((eventId: string, reason: string) => {
    ws?.emit('reject_event', { eventId, reason });
  }, [ws]);

  return { events, pendingCount, connected, confirmEvent, rejectEvent };
}
```

### Trade Notification Component

```typescript
import { useTradeEvents } from '@/hooks/use-trade-events';

export function TradeNotifications() {
  const { events, pendingCount, connected } = useTradeEvents();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Trade Events</h2>
        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-sm">
              {pendingCount} pending
            </span>
          )}
          <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {events.map((event) => (
          <div
            key={event.id}
            className={`p-3 border rounded-lg ${
              event.status === 'pending' ? 'border-yellow-300 bg-yellow-50' :
              event.status === 'confirmed' ? 'border-green-300 bg-green-50' :
              'border-red-300 bg-red-50'
            }`}
          >
            <div className="flex justify-between">
              <span className="font-medium">{event.type.replace('_', ' ')}</span>
              <span className="text-sm text-gray-500">
                {new Date(event.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="text-sm mt-1">
              {event.symbol} {event.direction} • {event.quantity} @ ${event.price}
            </div>
            {event.pnl !== undefined && (
              <div className={`text-sm font-medium ${event.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                PnL: ${event.pnl.toFixed(2)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Emitting Trade Events

```typescript
// From your trading system
const ws = io('/?XTransformPort=3003');

// Emit a new order
ws.emit('emit_event', {
  type: 'order_placed',
  userId: 'user-123',
  accountId: 'account-456',
  symbol: 'BTCUSDT',
  exchange: 'binance',
  direction: 'LONG',
  orderId: 'order-' + Date.now(),
  clientOrderId: 'client-' + Date.now(),
  price: 67000,
  quantity: 0.1,
  status: 'pending',
  isDemo: true,
  tradingMode: 'DEMO'
});

// Listen for the emitted event
ws.on('event_emitted', (data) => {
  console.log('Event emitted:', data.eventId);
});

// Listen for trade events (including your own)
ws.on('trade_event', (event) => {
  if (event.type === 'order_filled') {
    console.log('Order filled:', event.orderId);
  }
});
```

---

## ❌ Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "EVENT_NOT_FOUND",
    "message": "Event not found",
    "details": { "eventId": "evt_xxx" }
  }
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| `EVENT_NOT_FOUND` | Event does not exist |
| `EVENT_ALREADY_CONFIRMED` | Event already confirmed |
| `INVALID_EVENT` | Invalid event data |
| `UNAUTHORIZED` | Missing or invalid authentication |
| `RATE_LIMITED` | Rate limit exceeded |
| `TIMEOUT` | Confirmation timeout after max retries |

### WebSocket Error Events

```javascript
ws.on('event_not_found', (data) => {
  console.error('Event not found:', data.eventId);
});

ws.on('event_already_confirmed', (data) => {
  console.warn('Event already confirmed:', data.eventId, data.status);
});
```

### Confirmation Timeout Handling

Events that are not confirmed within the timeout period will be automatically retried up to `MAX_RETRY_ATTEMPTS` times. After all retries fail, the event status is set to `failed` with `errorCode: 'TIMEOUT'`.

---

## 📚 Related Documentation

- [README.md](./README.md) - Microservices overview
- [MICROSERVICES_API.md](./MICROSERVICES_API.md) - Complete API reference
- [bot-monitor-service.md](./bot-monitor-service.md) - Bot monitor service
- [risk-monitor-service.md](./risk-monitor-service.md) - Risk monitor service
- [ORDER_EXECUTION_LOGIC.md](../business-logic/ORDER_EXECUTION_LOGIC.md) - Order execution

---

*Last updated: March 2026 | CITARION Documentation Team*
