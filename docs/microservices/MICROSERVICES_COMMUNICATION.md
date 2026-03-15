# CITARION Inter-Service Communication

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Overview

This document describes the communication patterns and protocols used between CITARION microservices.

---

## 🏗️ Communication Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     INTER-SERVICE COMMUNICATION                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                          GATEWAY (Caddy)                              │   │
│  │                           Port 3000                                   │   │
│  └───────────────────────────────┬──────────────────────────────────────┘   │
│                                  │                                           │
│          ┌───────────────────────┼───────────────────────┐                  │
│          │                       │                       │                  │
│          ▼                       ▼                       ▼                  │
│  ┌───────────────┐       ┌───────────────┐       ┌───────────────┐          │
│  │ REST API      │       │ WebSocket     │       │ Server-Sent   │          │
│  │ (Sync)        │       │ (Real-time)   │       │ Events        │          │
│  └───────────────┘       └───────────────┘       └───────────────┘          │
│          │                       │                       │                  │
│          └───────────────────────┼───────────────────────┘                  │
│                                  │                                           │
│                                  ▼                                           │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                        REDIS PUB/SUB                                  │   │
│  │                     (Event Bus)                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📡 Communication Patterns

### 1. Synchronous REST API

Used for request-response operations that need immediate results.

```typescript
// Example: Get prices from Price Service
const response = await fetch('/api/prices?XTransformPort=3002', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});

const prices = await response.json();
```

**Use Cases:**
- Price queries
- Bot configuration
- Risk metrics retrieval
- Model status checks

### 2. WebSocket (Real-time Bidirectional)

Used for real-time, bidirectional communication.

```typescript
// Client-side WebSocket connection
import { io } from 'socket.io-client';

const ws = io('/?XTransformPort=3002', {
  transports: ['websocket'],
  auth: { token: 'jwt-token' }
});

// Subscribe to events
ws.emit('subscribe', { symbols: ['BTCUSDT', 'ETHUSDT'] });

// Handle updates
ws.on('price_update', (data) => {
  console.log(`${data.symbol}: ${data.price}`);
});
```

**Use Cases:**
- Real-time price updates
- Bot status monitoring
- Risk alerts
- Trade confirmations

### 3. Server-Sent Events (SSE)

Used for one-way real-time updates from server to client.

```typescript
// SSE connection
const eventSource = new EventSource('/api/trade-events?XTransformPort=3003');

eventSource.onmessage = (event) => {
  const trade = JSON.parse(event.data);
  console.log('Trade event:', trade);
};

eventSource.onerror = (error) => {
  console.error('SSE Error:', error);
};
```

**Use Cases:**
- Trade event streaming
- Log streaming
- Notification feeds

### 4. Redis Pub/Sub

Used for inter-service event broadcasting.

```typescript
// Publisher (Price Service)
import { createClient } from 'redis';

const publisher = createClient({ url: process.env.REDIS_URL });
await publisher.connect();

await publisher.publish('price:BTCUSDT', JSON.stringify({
  symbol: 'BTCUSDT',
  price: 67000.50,
  timestamp: Date.now()
}));

// Subscriber (Bot Monitor)
const subscriber = createClient({ url: process.env.REDIS_URL });
await subscriber.connect();

await subscriber.subscribe('price:BTCUSDT', (message) => {
  const price = JSON.parse(message);
  // Process price update
});
```

**Use Cases:**
- Price broadcast to multiple services
- Trade signal distribution
- Kill switch notifications
- System-wide alerts

---

## 🔄 Event Flow Examples

### Trade Execution Flow

```
1. User → Main App (REST)
   POST /api/trade { symbol, side, quantity }

2. Main App → Exchange (REST)
   Create order on exchange

3. Exchange → Main App (WebSocket)
   Order confirmation

4. Main App → Redis (Pub/Sub)
   Publish 'trade:executed'

5. Bot Monitor ← Redis
   Receives trade event

6. Risk Monitor ← Redis
   Updates risk metrics

7. Telegram Service ← Redis
   Sends notification

8. User ← Main App (WebSocket)
   Trade confirmation
```

### Kill Switch Flow

```
1. Risk Monitor → Redis (Pub/Sub)
   Publish 'killswitch:triggered'

2. All Services ← Redis
   Receive kill switch event

3. Bot Monitor
   Stops all bots

4. Price Service
   Maintains price feeds (monitoring only)

5. ML Service
   Stops predictions

6. Telegram Service
   Sends emergency alert
```

---

## 🛡️ Circuit Breaker Pattern

```typescript
import CircuitBreaker from 'opossum';

// Configure circuit breaker for service calls
const breaker = new CircuitBreaker(async (service, endpoint) => {
  const response = await fetch(`http://${service}${endpoint}`);
  return response.json();
}, {
  timeout: 5000,           // 5 second timeout
  errorThresholdPercentage: 50,  // Open after 50% failures
  resetTimeout: 30000      // Try again after 30s
});

breaker.on('open', () => {
  console.log('Circuit breaker opened - service unavailable');
});

breaker.on('halfOpen', () => {
  console.log('Circuit breaker half-open - testing service');
});

breaker.on('close', () => {
  console.log('Circuit breaker closed - service healthy');
});

// Usage
try {
  const prices = await breaker.fire('price-service:3002', '/prices');
} catch (error) {
  // Fallback to cached data
  return getCachedPrices();
}
```

---

## 🔁 Retry Configuration

```typescript
import { retry } from 'ts-retry';

async function callServiceWithRetry(service, endpoint, options = {}) {
  return retry(
    async () => {
      const response = await fetch(`http://${service}${endpoint}`, options);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    },
    {
      maxTry: 3,
      delay: 1000,
      backoff: 'exponential',
      maxBackoff: 10000,
      onError: (error, tryCount) => {
        console.warn(`Service call failed (attempt ${tryCount}):`, error.message);
      }
    }
  );
}
```

---

## 📨 Message Queue (Optional)

For high-throughput scenarios, RabbitMQ can be used:

```yaml
# docker-compose.yml addition
rabbitmq:
  image: rabbitmq:3-management
  ports:
    - "5672:5672"
    - "15672:15672"
```

```typescript
// Publisher
import amqp from 'amqplib';

const connection = await amqp.connect('amqp://rabbitmq');
const channel = await connection.createChannel();

await channel.assertQueue('trade_signals');
channel.sendToQueue('trade_signals', Buffer.from(JSON.stringify(signal)));

// Consumer
await channel.consume('trade_signals', (msg) => {
  const signal = JSON.parse(msg.content.toString());
  processSignal(signal);
  channel.ack(msg);
});
```

---

## 📊 Service Registry

Services register themselves for discovery:

```typescript
interface ServiceRegistration {
  name: string;
  port: number;
  health: string;
  metadata: Record<string, string>;
}

// Service self-registration
const registration: ServiceRegistration = {
  name: 'price-service',
  port: 3002,
  health: '/health',
  metadata: {
    version: '2.0.0',
    type: 'price-feed'
  }
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});
```

---

## 🔒 Security

### JWT Token Authentication

```typescript
// Include JWT in service-to-service calls
const token = await getServiceToken();

const response = await fetch('/api/prices?XTransformPort=3002', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### API Key for External Services

```typescript
// Exchange API calls
const exchangeClient = createExchangeClient({
  exchange: 'binance',
  apiKey: decryptApiKey(storedKey),
  apiSecret: decryptApiKey(storedSecret)
});
```

---

## 📚 Related Documentation

- [MICROSERVICES_API.md](MICROSERVICES_API.md) - API reference
- [MICROSERVICES_TRACING.md](MICROSERVICES_TRACING.md) - Distributed tracing
- [../architecture/WEBSOCKET_PROTOCOL.md](../architecture/WEBSOCKET_PROTOCOL.md) - WebSocket specs

---

*Last updated: March 2026 | CITARION Documentation Team*
