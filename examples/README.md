# CITARION WebSocket Examples

This directory contains example implementations demonstrating WebSocket communication patterns used throughout the CITARION trading platform. These examples serve as reference implementations for real-time bidirectional communication between frontend clients and backend services.

## Table of Contents

1. [Overview](#overview)
2. [WebSocket Examples](#websocket-examples)
   - [Frontend Client (frontend.tsx)](#frontend-client-frontendtsx)
   - [Server Implementation (server.ts)](#server-implementation-serverts)
3. [Running the Examples](#running-the-examples)
4. [WebSocket Protocol](#websocket-protocol)
5. [Message Types](#message-types)
6. [Error Handling](#error-handling)
7. [Best Practices](#best-practices)
8. [Extending the Examples](#extending-the-examples)
9. [Integration with CITARION](#integration-with-citarion)

---

## Overview

WebSocket connections in CITARION enable real-time data streaming for:

- **Live Price Updates** - Market data streaming from exchanges
- **Position Monitoring** - Real-time position status and PnL updates
- **Trade Execution** - Order status and fill notifications
- **Bot Status** - Live bot state changes and performance metrics
- **Signal Feed** - Trading signal delivery and status updates
- **Chat & Notifications** - User communications and alerts

### Technology Stack

| Component | Library | Version | Purpose |
|-----------|---------|---------|---------|
| Server | socket.io | ^4.x | WebSocket server implementation |
| Client | socket.io-client | ^4.x | WebSocket client library |
| Transport | WebSocket | Native | Primary transport protocol |
| Fallback | Polling | HTTP | Secondary transport for firewalls |

### Directory Structure

```
examples/
├── README.md                    # This documentation
└── websocket/
    ├── frontend.tsx            # React frontend client example
    └── server.ts               # Node.js server implementation
```

---

## WebSocket Examples

### Frontend Client (frontend.tsx)

The frontend example demonstrates a complete React component implementing a real-time chat application with WebSocket connectivity.

#### Component Overview

```tsx
// Location: examples/websocket/frontend.tsx
// Purpose: Frontend WebSocket client demonstration
// Dependencies: socket.io-client, React hooks
```

#### TypeScript Interfaces

```typescript
// User representation
type User = {
  id: string;        // Socket ID (unique connection identifier)
  username: string;  // Display name
}

// Message types
type Message = {
  id: string;                    // Unique message identifier
  username: string;              // Sender username
  content: string;               // Message content
  timestamp: Date | string;      // ISO timestamp
  type: 'user' | 'system';       // Message classification
}
```

#### Connection Configuration

The client establishes a WebSocket connection with the following configuration:

```typescript
const socketInstance = io('/?XTransformPort=3003', {
  transports: ['websocket', 'polling'],  // Transport priority
  forceNew: true,                         // Create new connection
  reconnection: true,                     // Enable auto-reconnect
  reconnectionAttempts: 5,                // Max retry attempts
  reconnectionDelay: 1000,                // Initial retry delay (ms)
  timeout: 10000                          // Connection timeout (ms)
})
```

**Configuration Parameters:**

| Parameter | Value | Description |
|-----------|-------|-------------|
| `path` | `/?XTransformPort=3003` | URL with port transformation for Caddy proxy |
| `transports` | `['websocket', 'polling']` | Primary WebSocket with HTTP polling fallback |
| `forceNew` | `true` | Creates new connection instance |
| `reconnection` | `true` | Enables automatic reconnection |
| `reconnectionAttempts` | `5` | Maximum reconnection attempts |
| `reconnectionDelay` | `1000` | Delay between reconnection attempts (ms) |
| `timeout` | `10000` | Connection timeout (ms) |

> **Important:** The `XTransformPort` query parameter is required for Caddy reverse proxy routing. Never use the port directly in the URL.

#### State Management

The component manages the following state:

```typescript
const [messages, setMessages] = useState<Message[]>([]);    // Chat history
const [inputMessage, setInputMessage] = useState('');        // Input field value
const [username, setUsername] = useState('');                // User's display name
const [isUsernameSet, setIsUsernameSet] = useState(false);   // Username confirmation
const [socket, setSocket] = useState<any>(null);             // Socket instance
const [isConnected, setIsConnected] = useState(false);       // Connection status
const [users, setUsers] = useState<User[]>([]);              // Online users list
```

#### Event Handlers

The component listens for the following server events:

```typescript
// Connection established
socketInstance.on('connect', () => {
  setIsConnected(true);
});

// Connection lost
socketInstance.on('disconnect', () => {
  setIsConnected(false);
});

// New message received
socketInstance.on('message', (msg: Message) => {
  setMessages(prev => [...prev, msg]);
});

// User joined notification
socketInstance.on('user-joined', (data: { user: User; message: Message }) => {
  setMessages(prev => [...prev, data.message]);
  setUsers(prev => {
    if (!prev.find(u => u.id === data.user.id)) {
      return [...prev, data.user];
    }
    return prev;
  });
});

// User left notification
socketInstance.on('user-left', (data: { user: User; message: Message }) => {
  setMessages(prev => [...prev, data.message]);
  setUsers(prev => prev.filter(u => u.id !== data.user.id));
});

// Online users list
socketInstance.on('users-list', (data: { users: User[] }) => {
  setUsers(data.users);
});
```

#### Client Emitted Events

The client emits the following events:

```typescript
// Join chat room
socket.emit('join', { username: username.trim() });

// Send message
socket.emit('message', {
  content: inputMessage.trim(),
  username: username.trim()
});
```

#### Cleanup Pattern

Proper cleanup prevents memory leaks and connection issues:

```typescript
useEffect(() => {
  // ... connection setup

  return () => {
    socketInstance.disconnect();
  };
}, []);
```

---

### Server Implementation (server.ts)

The server example demonstrates a complete Node.js WebSocket server using Socket.IO.

#### Server Setup

```typescript
// Location: examples/websocket/server.ts
// Purpose: WebSocket server demonstration
// Dependencies: socket.io, http
// Port: 3003
```

#### Server Configuration

```typescript
import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()
const io = new Server(httpServer, {
  path: '/',              // WebSocket endpoint path
  cors: {
    origin: "*",          // Allow all origins (restrict in production)
    methods: ["GET", "POST"]
  },
  pingTimeout: 60000,     // Heartbeat timeout (ms)
  pingInterval: 25000,    // Heartbeat interval (ms)
})
```

**Server Options:**

| Option | Value | Description |
|--------|-------|-------------|
| `path` | `/` | WebSocket endpoint (used by Caddy proxy) |
| `cors.origin` | `*` | Allowed origins (configure for production) |
| `cors.methods` | `["GET", "POST"]` | Allowed HTTP methods |
| `pingTimeout` | `60000` | Time before connection considered dead |
| `pingInterval` | `25000` | Interval between heartbeats |

> **Note:** The `path` option must remain `/` as it's used by Caddy for request forwarding.

#### Data Structures

```typescript
interface User {
  id: string       // Socket connection ID
  username: string // User display name
}

interface Message {
  id: string              // Unique message ID
  username: string        // Sender name
  content: string         // Message content
  timestamp: Date         // Message timestamp
  type: 'user' | 'system' // Message classification
}

// In-memory user storage
const users = new Map<string, User>()
```

#### Helper Functions

```typescript
// Generate unique message ID
const generateMessageId = () => Math.random().toString(36).substr(2, 9)

// Create system message (join/leave notifications)
const createSystemMessage = (content: string): Message => ({
  id: generateMessageId(),
  username: 'System',
  content,
  timestamp: new Date(),
  type: 'system'
})

// Create user message
const createUserMessage = (username: string, content: string): Message => ({
  id: generateMessageId(),
  username,
  content,
  timestamp: new Date(),
  type: 'user'
})
```

#### Server Event Handlers

```typescript
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  // Test event for debugging
  socket.on('test', (data) => {
    socket.emit('test-response', { 
      message: 'Server received test message', 
      data: data,
      timestamp: new Date().toISOString()
    })
  })

  // User joins chat
  socket.on('join', (data: { username: string }) => {
    const user: User = { id: socket.id, username: data.username }
    users.set(socket.id, user)
    
    // Broadcast join notification
    io.emit('user-joined', { 
      user, 
      message: createSystemMessage(`${username} joined the chat room`) 
    })
    
    // Send current users list to new user
    socket.emit('users-list', { users: Array.from(users.values()) })
  })

  // Handle message
  socket.on('message', (data: { content: string; username: string }) => {
    const user = users.get(socket.id)
    if (user && user.username === data.username) {
      io.emit('message', createUserMessage(data.username, data.content))
    }
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = users.get(socket.id)
    if (user) {
      users.delete(socket.id)
      io.emit('user-left', { 
        user: { id: socket.id, username: user.username }, 
        message: createSystemMessage(`${user.username} left the chat room`) 
      })
    }
  })

  // Handle errors
  socket.on('error', (error) => {
    console.error(`Socket error (${socket.id}):`, error)
  })
})
```

#### Graceful Shutdown

```typescript
const PORT = 3003
httpServer.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`)
})

// Handle termination signals
process.on('SIGTERM', () => {
  console.log('Received SIGTERM signal, shutting down server...')
  httpServer.close(() => {
    console.log('WebSocket server closed')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('Received SIGINT signal, shutting down server...')
  httpServer.close(() => {
    console.log('WebSocket server closed')
    process.exit(0)
  })
})
```

---

## Running the Examples

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- CITARION project dependencies installed

### Installation

```bash
# Navigate to project root
cd /home/z/my-project

# Install dependencies (if not already installed)
npm install

# Install WebSocket dependencies
npm install socket.io socket.io-client
```

### Starting the Server

```bash
# Option 1: Direct execution
npx tsx examples/websocket/server.ts

# Option 2: Using ts-node
npx ts-node examples/websocket/server.ts

# Option 3: Compile and run
npx tsc examples/websocket/server.ts --outDir dist/examples
node dist/examples/websocket/server.js
```

Expected output:
```
WebSocket server running on port 3003
```

### Running the Frontend

The frontend example is a React component that should be integrated into your application:

```tsx
// Import the component
import SocketDemo from '@/examples/websocket/frontend'

// Use in your page/component
export default function DemoPage() {
  return <SocketDemo />
}
```

Or test standalone:

```bash
# Start Next.js development server
npm run dev

# Navigate to the page containing SocketDemo
# http://localhost:3000/demo/websocket
```

### Testing the Connection

1. Open the frontend in multiple browser tabs
2. Enter different usernames in each tab
3. Send messages and observe real-time synchronization
4. Test reconnection by closing/reopening tabs

### Debug Mode

Enable debug logging for Socket.IO:

```bash
# Server-side debug
DEBUG=socket.io* npx tsx examples/websocket/server.ts

# Client-side debug (browser console)
localStorage.debug = 'socket.io-client:*'
```

---

## WebSocket Protocol

### Connection Lifecycle

```
┌─────────────┐                    ┌─────────────┐
│   Client    │                    │   Server    │
└──────┬──────┘                    └──────┬──────┘
       │                                  │
       │─────── CONNECT ─────────────────>│
       │        (WebSocket upgrade)       │
       │                                  │
       │<─────── CONNECTED ───────────────│
       │        (Socket established)      │
       │                                  │
       │─────── JOIN ────────────────────>│
       │        { username: "user1" }     │
       │                                  │
       │<─────── USER-JOINED ─────────────│
       │        (Broadcast to all)        │
       │                                  │
       │<─────── USERS-LIST ──────────────│
       │        (Sent to new user)        │
       │                                  │
       │─────── MESSAGE ─────────────────>│
       │        { content: "Hello" }      │
       │                                  │
       │<─────── MESSAGE ─────────────────│
       │        (Broadcast to all)        │
       │                                  │
       │─────── DISCONNECT ──────────────>│
       │        (Tab close/network)       │
       │                                  │
       │<─────── USER-LEFT ───────────────│
       │        (Broadcast to others)     │
       │                                  │
       ▼                                  ▼
```

### Transport Fallback

Socket.IO implements automatic transport fallback:

```
1. WebSocket (Primary)
   └── Full-duplex, lowest latency
       └── Fallback if: Connection fails, blocked by firewall

2. HTTP Long-Polling (Fallback)
   └── HTTP POST/GET for bidirectional communication
       └── Used when: WebSocket unavailable
           └── Automatic upgrade when WebSocket available
```

### Heartbeat Mechanism

```
Client                          Server
  │                               │
  │──── PING ────────────────────>│ (every 25s)
  │                               │
  │<─── PONG ─────────────────────│ (within 60s)
  │                               │
  │   If no PONG within 60s:      │
  │   Connection considered dead  │
  │   Reconnection triggered      │
  │                               │
```

---

## Message Types

### Message Structure

All messages follow a consistent structure:

```typescript
interface Message {
  id: string;              // Unique identifier
  username: string;        // Origin (username or "System")
  content: string;         // Message payload
  timestamp: Date;         // Creation time
  type: 'user' | 'system'; // Classification
}
```

### Message Categories

#### User Messages

Generated by users through the chat interface:

```json
{
  "id": "k7x9m2p4q",
  "username": "trader_alice",
  "content": "BTC looking bullish today!",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "type": "user"
}
```

#### System Messages

Generated automatically by the server for notifications:

```json
{
  "id": "n3y8o1r5s",
  "username": "System",
  "content": "trader_alice joined the chat room",
  "timestamp": "2024-01-15T10:25:00.000Z",
  "type": "system"
}
```

### Event Types Reference

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `connect` | Client → Internal | - | Connection established |
| `disconnect` | Client → Internal | - | Connection lost |
| `join` | Client → Server | `{ username: string }` | User joins chat |
| `message` | Client → Server | `{ content: string, username: string }` | Send message |
| `message` | Server → Client | `Message` | Receive message |
| `user-joined` | Server → Client | `{ user: User, message: Message }` | User join notification |
| `user-left` | Server → Client | `{ user: User, message: Message }` | User leave notification |
| `users-list` | Server → Client | `{ users: User[] }` | Current online users |
| `test` | Client → Server | `any` | Debug test event |
| `test-response` | Server → Client | `{ message, data, timestamp }` | Test response |

---

## Error Handling

### Client-Side Error Handling

```typescript
// Connection errors
socketInstance.on('connect_error', (error) => {
  console.error('Connection error:', error.message);
  // Implement retry logic or show notification
});

// Generic socket errors
socketInstance.on('error', (error) => {
  console.error('Socket error:', error);
  // Update UI to show error state
});

// Connection timeout
socketInstance.on('connect_timeout', () => {
  console.warn('Connection timeout');
  // Trigger reconnection or notify user
});
```

### Server-Side Error Handling

```typescript
// Socket-level errors
socket.on('error', (error) => {
  console.error(`Socket error (${socket.id}):`, error);
  // Log to monitoring service
});

// Uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  // Graceful shutdown or recovery
});

// Unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection:', reason);
});
```

### Common Error Scenarios

| Error | Cause | Solution |
|-------|-------|----------|
| `connect_error` | Server unavailable | Check server status, implement retry |
| `transport error` | Network issues | Transport fallback, reconnect |
| `ping timeout` | Connection dead | Auto-reconnect enabled by default |
| `invalid namespace` | Wrong namespace | Verify namespace configuration |
| `authentication failed` | Invalid credentials | Check auth token/headers |

### Reconnection Strategy

```typescript
// Client reconnection configuration
const socket = io('/', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  randomizationFactor: 0.5,
});

// Reconnection events
socket.on('reconnect', (attemptNumber) => {
  console.log(`Reconnected after ${attemptNumber} attempts`);
});

socket.on('reconnect_failed', () => {
  console.error('Reconnection failed after max attempts');
  // Show error UI, prompt manual refresh
});

socket.on('reconnect_error', (error) => {
  console.warn('Reconnection attempt failed:', error);
});
```

---

## Best Practices

### Connection Management

1. **Always use XTransformPort**
   ```typescript
   // Correct - uses Caddy proxy routing
   io('/?XTransformPort=3003', { ... })
   
   // Incorrect - direct port usage not supported
   io('http://localhost:3003', { ... })
   ```

2. **Implement cleanup on unmount**
   ```typescript
   useEffect(() => {
     const socket = io(...);
     return () => socket.disconnect();
   }, []);
   ```

3. **Handle reconnection states**
   ```typescript
   const [isReconnecting, setIsReconnecting] = useState(false);
   
   socket.on('reconnect_attempt', () => setIsReconnecting(true));
   socket.on('connect', () => setIsReconnecting(false));
   ```

### Security Considerations

1. **Restrict CORS in production**
   ```typescript
   // Development
   cors: { origin: "*" }
   
   // Production
   cors: { 
     origin: ['https://yourdomain.com'],
     methods: ["GET", "POST"],
     credentials: true
   }
   ```

2. **Implement authentication**
   ```typescript
   // Server-side auth
   io.use((socket, next) => {
     const token = socket.handshake.auth.token;
     if (isValidToken(token)) {
       next();
     } else {
       next(new Error('Authentication failed'));
     }
   });
   
   // Client-side auth
   io('/', {
     auth: { token: 'your-jwt-token' }
   });
   ```

3. **Validate incoming data**
   ```typescript
   socket.on('message', (data) => {
     // Validate structure
     if (!data.content || typeof data.content !== 'string') {
       return; // Ignore invalid messages
     }
     
     // Sanitize content
     const sanitized = sanitize(data.content);
     // Process message...
   });
   ```

### Performance Optimization

1. **Use binary data for large payloads**
   ```typescript
   // Send binary data
   socket.emit('large-data', new Uint8Array([...]));
   
   // Receive binary data
   socket.on('large-data', (buffer: ArrayBuffer) => {
     // Process binary data
   });
   ```

2. **Batch rapid updates**
   ```typescript
   // Debounce rapid messages
   const debouncedEmit = debounce(socket.emit, 100);
   
   // Or use batching
   let messageQueue: Message[] = [];
   setInterval(() => {
     if (messageQueue.length > 0) {
       socket.emit('batch', messageQueue);
       messageQueue = [];
     }
   }, 100);
   ```

3. **Room-based broadcasting**
   ```typescript
   // Join specific room
   socket.join('trading-signals');
   
   // Broadcast to room only
   io.to('trading-signals').emit('signal', signalData);
   ```

### State Synchronization

```typescript
// Request full state on reconnect
socket.on('connect', () => {
  socket.emit('sync-request');
});

// Server provides full state
socket.on('sync-response', (state) => {
  setState(state);
});
```

---

## Extending the Examples

### Adding New Event Types

1. **Define TypeScript interface**
   ```typescript
   interface TradeSignal {
     id: string;
     symbol: string;
     action: 'BUY' | 'SELL';
     price: number;
     timestamp: Date;
   }
   ```

2. **Server-side handler**
   ```typescript
   socket.on('trade-signal', (signal: TradeSignal) => {
     // Validate signal
     if (validateSignal(signal)) {
       // Broadcast to subscribers
       io.to('signals').emit('trade-signal', signal);
     }
   });
   ```

3. **Client-side emission**
   ```typescript
   const sendSignal = (signal: TradeSignal) => {
     socket.emit('trade-signal', signal);
   };
   ```

### Adding Rooms/Namespaces

```typescript
// Create namespace
const tradingNs = io.of('/trading');

tradingNs.on('connection', (socket) => {
  console.log('Connected to trading namespace');
  
  // Join specific room
  socket.on('subscribe', (symbol: string) => {
    socket.join(`symbol:${symbol}`);
  });
  
  // Broadcast to room
  socket.on('price-update', (data) => {
    io.of('/trading').to(`symbol:${data.symbol}`).emit('price', data);
  });
});
```

### Adding Middleware

```typescript
// Authentication middleware
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const user = await verifyToken(token);
    socket.data.user = user;
    next();
  } catch (err) {
    next(new Error('Authentication failed'));
  }
});

// Rate limiting middleware
io.use(rateLimiter({
  windowMs: 60000,
  max: 100
}));
```

### Redis Adapter for Scaling

```typescript
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const pubClient = createClient({ url: 'redis://localhost:6379' });
const subClient = pubClient.duplicate();

await Promise.all([
  pubClient.connect(),
  subClient.connect()
]);

io.adapter(createAdapter(pubClient, subClient));

// Now multiple server instances can communicate
// Messages broadcast to all connected clients across instances
```

---

## Integration with CITARION

### Production WebSocket Services

The CITARION platform uses WebSocket connections across multiple services:

| Service | Port | Purpose | Namespace |
|---------|------|---------|-----------|
| Chat Service | 3003 | Real-time messaging | `/` |
| Trade Events | 3005 | Order/trade updates | `/trading` |
| Price Stream | 3002 | Market data | `/prices` |
| Bot Monitor | 3006 | Bot status updates | `/bots` |
| Risk Monitor | 3008 | Risk alerts | `/risk` |

### CITARION Client Implementation

For production use in CITARION, use the existing WebSocket infrastructure:

```typescript
// Use existing CITARION WebSocket hooks
import { useWebSocket } from '@/lib/websocket';

function TradingComponent() {
  const { subscribe, isConnected } = useWebSocket('/trading');
  
  useEffect(() => {
    const unsubscribe = subscribe('position-update', (data) => {
      updatePosition(data);
    });
    
    return unsubscribe;
  }, [subscribe]);
}
```

### Configuration for CITARION

```typescript
// CITARION WebSocket configuration
const CITARION_WS_CONFIG = {
  chat: { port: 3003, namespace: '/' },
  trading: { port: 3005, namespace: '/trading' },
  prices: { port: 3002, namespace: '/prices' },
  bots: { port: 3006, namespace: '/bots' },
  risk: { port: 3008, namespace: '/risk' },
};

// Connect to multiple services
const chatSocket = io(`/?XTransformPort=3003`);
const tradingSocket = io('/trading?XTransformPort=3005');
```

### Real-World Use Cases

#### 1. Price Streaming
```typescript
// Subscribe to real-time prices
socket.emit('subscribe-prices', { symbols: ['BTCUSDT', 'ETHUSDT'] });
socket.on('price-update', (data) => {
  updatePriceChart(data.symbol, data.price, data.timestamp);
});
```

#### 2. Position Monitoring
```typescript
// Receive position updates
socket.on('position-update', (position) => {
  updatePositionTable(position);
});

// Receive PnL updates
socket.on('pnl-update', (pnl) => {
  updatePnlDisplay(pnl);
});
```

#### 3. Bot Status
```typescript
// Subscribe to bot events
socket.emit('subscribe-bots', { botIds: ['bot_1', 'bot_2'] });

socket.on('bot-status', (status) => {
  updateBotCard(status.botId, status);
});

socket.on('bot-trade', (trade) => {
  showTradeNotification(trade);
});
```

#### 4. Signal Feed
```typescript
// Receive trading signals
socket.on('signal', (signal) => {
  addToSignalFeed(signal);
  if (signal.priority === 'high') {
    showSignalAlert(signal);
  }
});
```

---

## Summary

This examples directory provides:

- **frontend.tsx**: Complete React component demonstrating WebSocket client implementation
- **server.ts**: Node.js server showing Socket.IO server patterns

Key takeaways:

1. Use `XTransformPort` query parameter for Caddy proxy routing
2. Implement proper cleanup on component unmount
3. Handle reconnection states gracefully
4. Validate and sanitize all incoming data
5. Use rooms/namespaces for scalable broadcasting
6. Consider Redis adapter for multi-instance deployments

For questions or issues, refer to the main CITARION documentation or the Socket.IO official documentation at https://socket.io/docs/.

---

*Last updated: January 2024 | CITARION Trading Platform Documentation*
