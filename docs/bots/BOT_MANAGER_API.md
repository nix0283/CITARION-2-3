# Bot Manager & API

**Version:** 2.0 | **Last Updated:** January 2025 | **Status:** Production

## Overview

The Bot Manager provides centralized control for all trading bots in the CITARION platform. It handles bot lifecycle, configuration, statistics tracking, real-time monitoring via WebSocket, and integration with the Event Bus.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           BOT MANAGER                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐      │
│  │   API Layer     │    │  Bot Manager    │    │  Integration    │      │
│  │  /api/bots/*    │───▶│    Service      │───▶│     Layer       │      │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘      │
│          │                      │                       │               │
│          ▼                      ▼                       ▼               │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐      │
│  │  Bot Control    │    │   Event Bus     │    │  Market Data    │      │
│  │     Panel       │    │   (Signals)     │    │    Service      │      │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘      │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    WebSocket Service (Port 3003)                 │    │
│  │  Real-time bot status updates, metrics, and events               │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## API Endpoints

### List All Bots

```http
GET /api/bots
```

**Response:**
```json
{
  "bots": [
    {
      "code": "HFT",
      "name": "Helios",
      "fullName": "HFT Bot - High Frequency Trading",
      "category": "frequency",
      "description": "High frequency trading with microstructure analysis",
      "status": "idle",
      "enabled": false,
      "config": {
        "symbol": "BTCUSDT",
        "exchange": "binance",
        "leverage": 5,
        "maxPositionSize": 0.1
      },
      "stats": {
        "totalTrades": 0,
        "winningTrades": 0,
        "losingTrades": 0,
        "totalPnl": 0,
        "winRate": 0,
        "avgLatency": 0,
        "signalsGenerated": 0,
        "uptime": 0
      }
    }
  ],
  "systemStatus": {
    "totalBots": 12,
    "runningBots": 3,
    "totalSignals": 45,
    "totalPnl": 12.5,
    "avgWinRate": 0.65
  }
}
```

### Get Single Bot

```http
GET /api/bots/{botType}
```

### Start Bot

```http
POST /api/bots/{botType}
Content-Type: application/json

{
  "action": "start"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Bot HFT started successfully"
}
```

### Stop Bot

```http
POST /api/bots/{botType}
Content-Type: application/json

{
  "action": "stop"
}
```

### Update Bot Config

```http
PATCH /api/bots/{botType}
Content-Type: application/json

{
  "symbol": "ETHUSDT",
  "leverage": 3,
  "maxPositionSize": 0.5
}
```

### Get Signals

```http
GET /api/signals?bot=HFT&limit=50
```

### Publish Signal

```http
POST /api/signals
Content-Type: application/json

{
  "source": "HFT",
  "symbol": "BTCUSDT",
  "exchange": "binance",
  "direction": "LONG",
  "confidence": 0.85,
  "entryPrice": 50000,
  "stopLoss": 49500,
  "takeProfit": 51000
}
```

## Bot Categories

| Category | Bots | Description |
|----------|------|-------------|
| **Operational** | MESH, SCALE, BAND | Core trading strategies |
| **Institutional** | PND, TRND, FCST, RNG, LMB | Advanced strategies |
| **Frequency** | HFT, MFT, LFT | Time-based strategies |
| **Meta** | LOGOS | Signal aggregation |

## Bot Status

| Status | Description |
|--------|-------------|
| `idle` | Bot is not running |
| `starting` | Bot is initializing |
| `running` | Bot is active and processing |
| `stopping` | Bot is shutting down |
| `error` | Bot encountered an error |
| `paused` | Bot is temporarily paused |

## Using Bot Manager in Code

```typescript
import { getBotManager } from '@/lib/bot-manager'

const manager = getBotManager()

// Get all bots
const bots = manager.getAllBots()

// Get bots by category
const frequencyBots = manager.getBotsByCategory('frequency')

// Start a bot
const result = await manager.startBot('HFT')
console.log(result.message)

// Stop a bot
await manager.stopBot('HFT')

// Update config
manager.updateBotConfig('HFT', {
  symbol: 'ETHUSDT',
  leverage: 3,
})

// Record trade
manager.recordTrade('HFT', pnl, isWin, latency)

// Get system status
const status = manager.getSystemStatus()
```

## Market Data Service

```typescript
import { getMarketDataService } from '@/lib/bot-manager/market-data-service'

const marketData = getMarketDataService()

// Get ticker
const ticker = await marketData.getTicker({
  exchange: 'binance',
  symbol: 'BTCUSDT',
})

// Get orderbook
const orderbook = await marketData.getOrderbook({
  exchange: 'binance',
  symbol: 'BTCUSDT',
}, 20)

// Get candles
const candles = await marketData.getCandles({
  exchange: 'binance',
  symbol: 'BTCUSDT',
}, '1m', 100)

// Get mid price
const midPrice = await marketData.getMidPrice({
  exchange: 'binance',
  symbol: 'BTCUSDT',
})
```

## Bot Integration

```typescript
import { getBotIntegration } from '@/lib/bot-manager/integration'

const integration = getBotIntegration()

// Start bot integration
await integration.startBot({
  botCode: 'HFT',
  exchange: 'binance',
  symbol: 'BTCUSDT',
  credentials: {
    apiKey: 'your-api-key',
    apiSecret: 'your-api-secret',
  },
})

// Stop bot
integration.stopBot('HFT')
```

## Bot Control Panel (UI)

The `BotControlPanel` component provides a visual interface for managing bots:

```tsx
import { BotControlPanel } from '@/components/bots/bot-control-panel'

export default function BotsPage() {
  return <BotControlPanel />
}
```

**Features:**
- View all bots by category
- Start/stop individual bots
- View real-time statistics
- System status overview
- Batch operations (Start All / Stop All)
- Configuration access

## Statistics Tracking

Each bot tracks:
- `totalTrades` - Total number of trades
- `winningTrades` - Profitable trades
- `losingTrades` - Loss trades
- `totalPnl` - Total profit/loss
- `winRate` - Win percentage
- `avgLatency` - Average execution latency
- `signalsGenerated` - Number of signals produced
- `uptime` - Time bot has been running

## Event Bus Integration

Bots automatically integrate with the Event Bus:

```typescript
// Bot registration
eventBus.registerBot({
  metadata: { code: 'HFT', name: 'Helios', ... },
  status: 'active',
  registeredAt: Date.now(),
  subscriptions: ['trading.order.*', 'market.orderbook.*'],
})

// Signal publishing
eventBus.publish('analytics.signal.HFT', {
  id: 'sig_123',
  timestamp: Date.now(),
  category: 'analytics',
  source: 'HFT',
  type: 'signal.generated',
  data: { direction: 'LONG', confidence: 0.85 },
})
```

## File Structure

```
src/lib/bot-manager/
├── index.ts                    # Bot Manager class
├── market-data-service.ts      # Market data fetching
└── integration.ts              # Bot integration layer

src/app/api/bots/
├── route.ts                    # List all bots
├── unified/route.ts            # Unified bots API (all types)
├── grid/route.ts               # Grid bot operations
├── dca/route.ts                # DCA bot operations
├── bb/route.ts                 # BB bot operations
└── [botType]/
    └── route.ts                # Single bot operations

src/app/api/signals/
└── route.ts                    # Signal operations

src/components/bots/
├── bot-control-panel.tsx       # UI component
├── bots-dashboard.tsx          # Unified bots dashboard
├── bot-card.tsx                # Bot card component
├── bot-config-modal.tsx        # Configuration modal
└── new-bot-modal.tsx           # New bot creation modal

src/hooks/
└── use-bots.ts                 # React hook for bot management

mini-services/bot-monitor/
└── index.ts                    # WebSocket monitoring service (port 3003)
```

---

## Unified API Endpoints

### GET /api/bots/unified

Получение списка всех ботов с унифицированным форматом.

**Query параметры:**

| Параметр | Тип | Описание |
|----------|-----|----------|
| `type` | BotType | Фильтр по типу бота |
| `status` | BotStatus | Фильтр по статусу |
| `exchangeId` | string | Фильтр по бирже |

**Ответ:**

```json
{
  "success": true,
  "bots": [
    {
      "id": "grid-1",
      "type": "grid",
      "name": "BTC Grid Master",
      "status": "RUNNING",
      "isActive": true,
      "symbol": "BTCUSDT",
      "exchangeId": "binance",
      "direction": "BOTH",
      "metrics": {
        "realizedPnL": 245.50,
        "totalTrades": 156,
        "winRate": 0.68
      }
    }
  ],
  "stats": {
    "totalBots": 5,
    "activeBots": 3,
    "pausedBots": 1,
    "stoppedBots": 1,
    "totalInvested": 5000,
    "totalPnL": 890.20
  }
}
```

### POST /api/bots/unified

Управление ботом (start/pause/stop/restart).

**Тело запроса:**

```json
{
  "botId": "grid-1",
  "botType": "grid",
  "action": "start",
  "options": {
    "closePositions": false
  }
}
```

**Ответ:**

```json
{
  "success": true,
  "bot": {
    "id": "grid-1",
    "status": "RUNNING",
    "isActive": true
  }
}
```

---

## WebSocket API (Port 3003)

WebSocket сервис для real-time мониторинга ботов.

### Подключение

```typescript
import { io } from 'socket.io-client';

// Подключение через gateway
const socket = io('/?XTransformPort=3003', {
  transports: ['websocket', 'polling'],
  autoConnect: true,
  reconnection: true,
});
```

### События от сервера

| Событие | Данные | Описание |
|---------|--------|----------|
| `initial_data` | `{ bots: WSBotStatus[], events: WSBotEvent[] }` | Начальные данные при подключении |
| `bot_update` | `WSBotStatus` | Обновление статуса бота |
| `bot_metrics` | `{ botId, metrics, timestamp }` | Обновление метрик в real-time |
| `bot_event` | `WSBotEvent` | Событие бота (trade, error, etc.) |

### События от клиента

| Событие | Данные | Описание |
|---------|--------|----------|
| `get_bot_status` | `botId: string` | Запрос статуса бота |
| `get_all_bots` | - | Запрос всех ботов |
| `start_bot` | `{ botId: string }` | Запуск бота |
| `stop_bot` | `{ botId: string }` | Остановка бота |
| `pause_bot` | `{ botId: string }` | Пауза бота |
| `subscribe_bot` | `botId: string` | Подписка на обновления бота |
| `unsubscribe_bot` | `botId: string` | Отписка от обновлений |

### Пример использования

```typescript
// Подключение
socket.on('connect', () => {
  console.log('Connected to bot monitor');
});

// Получение начальных данных
socket.on('initial_data', (data) => {
  console.log('Bots:', data.bots);
  console.log('Recent events:', data.events);
});

// Обновление статуса бота
socket.on('bot_update', (bot) => {
  console.log(`Bot ${bot.name} status: ${bot.status}`);
});

// Обновление метрик
socket.on('bot_metrics', (data) => {
  console.log(`Bot ${data.botId} PnL: ${data.metrics.unrealizedPnL}`);
});

// Запуск бота
socket.emit('start_bot', { botId: 'grid-1' });
```

---

## React Hook: useBots

Хук для управления ботами с WebSocket поддержкой.

```typescript
import { useBots } from '@/hooks/use-bots';

function MyComponent() {
  const {
    bots,
    stats,
    isLoading,
    error,
    wsConnected,
    refresh,
    controlBot,
  } = useBots({
    enableWebSocket: true,
    autoRefresh: true,
  });
  
  // Запуск бота
  const handleStart = async () => {
    await controlBot('grid-1', 'grid', 'start');
  };
  
  return (
    <div>
      {wsConnected ? '🟢 Live' : '🟡 Polling'}
      {bots.map(bot => (
        <div key={bot.id}>{bot.name} - {bot.status}</div>
      ))}
    </div>
  );
}
```

### Опции useBots

```typescript
interface UseBotsOptions {
  type?: BotType;              // Фильтр по типу
  status?: BotStatus;          // Фильтр по статусу
  exchangeId?: string;         // Фильтр по бирже
  refreshInterval?: number;    // Интервал обновления (default: 30000ms)
  autoRefresh?: boolean;       // Автообновление (default: true)
  enableWebSocket?: boolean;   // WebSocket (default: true)
}
```
