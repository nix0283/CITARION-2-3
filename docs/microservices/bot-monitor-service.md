# Bot Monitor Service

**Version:** 2.0 | **Port:** 3003 | **Last Updated:** March 2026

---

## 📋 Overview

The Bot Monitor Service provides real-time monitoring and control of trading bots. It tracks bot lifecycle events, status changes, trade executions, and position updates, broadcasting all events via WebSocket to connected clients.

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    BOT MONITOR SERVICE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Bot Registry                          │   │
│  │           (In-Memory Bot Status Store)                   │   │
│  └─────────────────────────┬───────────────────────────────┘   │
│                            │                                    │
│         ┌──────────────────┼──────────────────┐                │
│         ▼                  ▼                  ▼                │
│  ┌────────────┐    ┌────────────┐    ┌────────────┐           │
│  │  Status    │    │   Trade    │    │  Position  │           │
│  │  Monitor   │    │  Tracking  │    │  Updates   │           │
│  └────────────┘    └────────────┘    └────────────┘           │
│                            │                                    │
│                            ▼                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Socket.IO Server (Port 3003)                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

- **Bot Lifecycle Management** - Start, stop, pause bots via WebSocket
- **Real-Time Status Updates** - Live bot status broadcasting
- **Trade Tracking** - Track all bot trades in real-time
- **Position Monitoring** - Live position updates per bot
- **Error Tracking** - Capture and broadcast bot errors
- **Event History** - Maintain recent event history for reconnection
- **Metrics Aggregation** - Calculate and broadcast bot metrics

---

## 🔌 REST API

### Health Check

```http
GET /health?XTransformPort=3003
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": 1700000000000,
  "uptime": 3600,
  "bots": {
    "total": 5,
    "running": 3,
    "stopped": 2
  }
}
```

### List All Bots

```http
GET /bots?XTransformPort=3003
```

**Response:**
```json
{
  "bots": [
    {
      "id": "grid-bot-1",
      "type": "grid",
      "name": "BTC Grid Master",
      "status": "RUNNING",
      "exchangeId": "binance",
      "symbol": "BTCUSDT",
      "mode": "PAPER",
      "metrics": {
        "totalTrades": 156,
        "totalPnL": 2340.50,
        "unrealizedPnL": 125.30,
        "winRate": 0.68
      },
      "lastUpdate": "2026-03-15T10:30:00.000Z"
    }
  ]
}
```

### Start Bot

```http
POST /bots/:id/start?XTransformPort=3003
```

**Response:**
```json
{
  "success": true,
  "bot": {
    "id": "grid-bot-1",
    "status": "RUNNING"
  }
}
```

### Stop Bot

```http
POST /bots/:id/stop?XTransformPort=3003
```

**Response:**
```json
{
  "success": true,
  "bot": {
    "id": "grid-bot-1",
    "status": "STOPPED"
  }
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

#### Get Bot Status

```javascript
ws.emit('get_bot_status', 'grid-bot-1');
```

#### Get All Bots

```javascript
ws.emit('get_all_bots');
```

#### Start Bot

```javascript
ws.emit('start_bot', { botId: 'grid-bot-1' });
```

#### Stop Bot

```javascript
ws.emit('stop_bot', { botId: 'grid-bot-1' });
```

#### Pause Bot

```javascript
ws.emit('pause_bot', { botId: 'grid-bot-1' });
```

#### Execute Manual Trade

```javascript
ws.emit('execute_trade', {
  botId: 'grid-bot-1',
  symbol: 'BTCUSDT',
  side: 'BUY',
  amount: 0.1,
  price: 67000
});
```

#### Subscribe to Bot

```javascript
ws.emit('subscribe_bot', 'grid-bot-1');
```

#### Unsubscribe from Bot

```javascript
ws.emit('unsubscribe_bot', 'grid-bot-1');
```

### Server → Client Events

#### Initial Data (on connection)

```javascript
ws.on('initial_data', (data) => {
  // data = { bots: [...], events: [...] }
  console.log('Bots:', data.bots);
  console.log('Recent events:', data.events);
});
```

#### Bot Status

```javascript
ws.on('bot_status', (bot) => {
  console.log('Bot status:', bot);
});
```

#### All Bots

```javascript
ws.on('all_bots', (bots) => {
  console.log('All bots:', bots);
});
```

#### Bot Update

```javascript
ws.on('bot_update', (bot) => {
  console.log(`Bot ${bot.type}: ${bot.status}`);
  // bot = {
  //   id: 'grid-bot-1',
  //   type: 'grid',
  //   name: 'BTC Grid Master',
  //   status: 'RUNNING',
  //   exchangeId: 'binance',
  //   symbol: 'BTCUSDT',
  //   mode: 'PAPER',
  //   metrics: { totalTrades, totalPnL, unrealizedPnL, winRate },
  //   lastUpdate: Date
  // }
});
```

#### Bot Metrics

```javascript
ws.on('bot_metrics', (data) => {
  // data = { botId, metrics, timestamp }
});
```

#### Bot Event

```javascript
ws.on('bot_event', (event) => {
  // event = { type, botId, data, timestamp }
  // type: 'status_change' | 'trade' | 'position_update' | 'error' | 'log'
});
```

#### Bot Error

```javascript
ws.on('bot_error', (error) => {
  // error = { botId, error, timestamp }
});
```

---

## 📊 Bot States and Transitions

### State Diagram

```
                    ┌──────────────┐
                    │              │
              ┌────▶│    IDLE     │────┐
              │     │              │    │
              │     └──────────────┘    │
              │                         │
        start │                         │ stop
              │                         │
              │     ┌──────────────┐    │
              │     │              │    │
              └─────│   RUNNING   │◀───┘
                    │              │
                    └──────┬───────┘
                           │
                     pause │ resume
                           │
                    ┌──────▼───────┐
                    │              │
                    │    PAUSED    │
                    │              │
                    └──────────────┘
```

### Bot States

| State | Description | Transitions |
|-------|-------------|-------------|
| `IDLE` | Bot is created but not started | → RUNNING, → STOPPED |
| `RUNNING` | Bot is actively trading | → PAUSED, → STOPPED |
| `PAUSED` | Bot is temporarily paused | → RUNNING, → STOPPED |
| `STOPPED` | Bot is fully stopped | → RUNNING |

### Bot Types

| Type | Description |
|------|-------------|
| `grid` | Grid trading bot |
| `dca` | Dollar-cost averaging bot |
| `bb` | Bollinger Bands signal bot |
| `orion` | Orion multi-strategy bot |
| `hft` | High-frequency trading bot |
| `vision` | Vision ML-based bot |

---

## ⚙️ Configuration

### Environment Variables

```env
# Environment
NODE_ENV=development

# CORS - Comma-separated list of allowed origins
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://app.citarion.com

# Main API URL (for bot data)
API_URL=http://localhost:3000

# Monitoring interval (ms)
MONITOR_INTERVAL=5000
```

### Bot Status Interface

```typescript
interface BotStatus {
  id: string;
  type: string;
  name: string;
  status: 'IDLE' | 'RUNNING' | 'PAUSED' | 'STOPPED';
  exchangeId: string;
  symbol: string;
  mode: 'PAPER' | 'LIVE' | 'TESTNET';
  metrics: {
    totalTrades: number;
    totalPnL: number;
    unrealizedPnL: number;
    winRate: number;
  };
  lastUpdate: Date;
}
```

### Bot Event Interface

```typescript
interface BotEvent {
  type: 'status_change' | 'trade' | 'position_update' | 'error' | 'log';
  botId: string;
  data: any;
  timestamp: Date;
}
```

---

## 📝 Examples

### React Hook for Bot Monitoring

```typescript
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Bot {
  id: string;
  type: string;
  name: string;
  status: string;
  symbol: string;
  metrics: {
    totalTrades: number;
    totalPnL: number;
    winRate: number;
  };
}

export function useBotMonitor() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws: Socket = io('/', {
      path: '/socket.io',
      query: { XTransformPort: '3003' }
    });

    ws.on('connect', () => setConnected(true));
    ws.on('disconnect', () => setConnected(false));

    ws.on('initial_data', (data) => {
      setBots(data.bots);
      setEvents(data.events);
    });

    ws.on('bot_update', (bot: Bot) => {
      setBots(prev => prev.map(b => b.id === bot.id ? bot : b));
    });

    ws.on('bot_event', (event) => {
      setEvents(prev => [event, ...prev].slice(0, 100));
    });

    return () => ws.disconnect();
  }, []);

  const startBot = (botId: string) => {
    ws.emit('start_bot', { botId });
  };

  const stopBot = (botId: string) => {
    ws.emit('stop_bot', { botId });
  };

  return { bots, events, connected, startBot, stopBot };
}
```

### Bot Control Panel Component

```typescript
import { useBotMonitor } from '@/hooks/use-bot-monitor';

export function BotControlPanel() {
  const { bots, events, connected, startBot, stopBot } = useBotMonitor();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
        <span>{connected ? 'Connected' : 'Disconnected'}</span>
      </div>

      <div className="grid gap-4">
        {bots.map((bot) => (
          <div key={bot.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{bot.name}</h3>
                <p className="text-sm text-gray-500">{bot.type} • {bot.symbol}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-sm ${
                  bot.status === 'RUNNING' ? 'bg-green-100 text-green-700' :
                  bot.status === 'PAUSED' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {bot.status}
                </span>
                {bot.status === 'RUNNING' ? (
                  <button onClick={() => stopBot(bot.id)} className="btn-danger">Stop</button>
                ) : (
                  <button onClick={() => startBot(bot.id)} className="btn-primary">Start</button>
                )}
              </div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Trades:</span> {bot.metrics.totalTrades}
              </div>
              <div>
                <span className="text-gray-500">PnL:</span> ${bot.metrics.totalPnL.toFixed(2)}
              </div>
              <div>
                <span className="text-gray-500">Win Rate:</span> {(bot.metrics.winRate * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Vanilla JavaScript Example

```javascript
const ws = io('/?XTransformPort=3003');

ws.on('connect', () => {
  console.log('Connected to Bot Monitor');
});

ws.on('initial_data', (data) => {
  console.log('Initial bots:', data.bots);
  renderBots(data.bots);
});

ws.on('bot_update', (bot) => {
  updateBotUI(bot);
});

ws.on('bot_event', (event) => {
  if (event.type === 'trade') {
    showTradeNotification(event.data);
  } else if (event.type === 'error') {
    showErrorAlert(event.data);
  }
});

// Control functions
function startBot(botId) {
  ws.emit('start_bot', { botId });
}

function stopBot(botId) {
  ws.emit('stop_bot', { botId });
}

function pauseBot(botId) {
  ws.emit('pause_bot', { botId });
}
```

---

## ❌ Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "BOT_NOT_FOUND",
    "message": "Bot with ID 'grid-bot-1' not found",
    "details": { "botId": "grid-bot-1" }
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `BOT_NOT_FOUND` | 404 | Bot does not exist |
| `INVALID_STATE` | 400 | Invalid state transition |
| `UNAUTHORIZED` | 401 | Missing or invalid token |
| `RATE_LIMITED` | 429 | Rate limit exceeded |
| `SERVICE_ERROR` | 500 | Internal service error |

### WebSocket Error Handling

```javascript
ws.on('connect_error', (error) => {
  console.error('Connection failed:', error.message);
});

ws.on('bot_error', (error) => {
  console.error(`Bot ${error.botId} error:`, error.error);
});
```

### Rate Limits

| Service | Limit | Window |
|---------|-------|--------|
| Bot Monitor | 50 requests | per second |

---

## 📚 Related Documentation

- [README.md](./README.md) - Microservices overview
- [MICROSERVICES_API.md](./MICROSERVICES_API.md) - Complete API reference
- [BOT_MANAGER_API.md](../bots/BOT_MANAGER_API.md) - Bot manager documentation
- [trade-events-service.md](./trade-events-service.md) - Trade events service

---

*Last updated: March 2026 | CITARION Documentation Team*
