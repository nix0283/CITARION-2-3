# Cron Jobs API Documentation

## Overview

The Cron Jobs system provides automated background processing for trading bots, position monitoring, and market data synchronization. The system uses HTTP endpoints that can be triggered by various scheduling services (Vercel Cron, external cron services, GitHub Actions).

### Key Features

- **Distributed Locking**: Prevents race conditions when multiple workers process the same bot
- **Timeout Handling**: Each bot has a 25-second processing timeout (lock TTL: 30 seconds)
- **Error Isolation**: One bot failure doesn't affect processing of other bots
- **Processing Metrics**: Tracks duration, success rate, and timeouts per bot type
- **Multi-Exchange Support**: Works with Binance, Bybit, and OKX

### Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Cron Scheduler                                │
│  (Vercel Cron / cron-job.org / GitHub Actions / External Service)   │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     Cron API Endpoints                               │
├─────────────────────────────────────────────────────────────────────┤
│  /api/cron          - All workers (Grid, Position Monitor)          │
│  /api/cron/grid     - Grid Bot Worker                               │
│  /api/cron/dca      - DCA Bot Worker                                │
│  /api/cron/sync     - Position Sync with Exchange                   │
│  /api/cron/position-sync - Fast Position Sync (30s)                 │
│  /api/cron/ohlcv-sync - OHLCV Data Sync                             │
│  /api/cron/all      - Combined: Grid + DCA + Positions              │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     Worker Libraries                                 │
├─────────────────────────────────────────────────────────────────────┤
│  bot-workers.ts      - Grid & DCA bot processing                    │
│  grid-bot-worker.ts  - Grid bot execution with exchange orders      │
│  position-monitor.ts - TP/SL monitoring                             │
│  position-sync-service.ts - Exchange position sync                  │
│  ohlcv-service.ts    - Multi-exchange candle data sync              │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   Distributed Lock System                            │
│  (Redis / In-Memory for single instance)                            │
│  - Lock TTL: 30 seconds                                             │
│  - Max Retries: 3                                                   │
│  - Per-Symbol Mutex for order execution                             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Endpoints

### 1. /api/cron (All Workers)

Main endpoint that runs all workers in a single call.

**URL:** `/api/cron`

**Methods:** `GET`, `POST`

#### GET - Run All Workers Once

Executes Grid Worker and Position Monitor once.

**Headers:**
```
Authorization: Bearer <CRON_SECRET>
```

**Response:**
```json
{
  "success": true,
  "timestamp": "2024-03-15T10:30:00.000Z",
  "duration": "234ms",
  "results": {
    "gridWorker": {
      "executed": true,
      "botsProcessed": 3
    },
    "positionMonitor": {
      "executed": true
    }
  },
  "workers": {
    "gridWorker": "running",
    "positionMonitor": "active"
  }
}
```

#### POST - Worker Management

Control worker lifecycle (start/stop/status).

**Headers:**
```
Authorization: Bearer <CRON_SECRET>
Content-Type: application/json
```

**Request Body:**
```json
{
  "action": "start" | "stop" | "status",
  "workers": ["grid", "position"]
}
```

**Response:**
```json
{
  "success": true,
  "timestamp": "2024-03-15T10:30:00.000Z",
  "action": "start",
  "results": {
    "grid": {
      "action": "start",
      "success": true,
      "message": "Grid worker started"
    },
    "position": {
      "action": "start",
      "success": true,
      "message": "Position monitor started"
    }
  }
}
```

---

### 2. /api/cron/grid (Grid Bot Worker)

Process all active Grid bots and execute grid orders.

**URL:** `/api/cron/grid`

**Methods:** `GET`, `POST`

#### GET - Health Check

**Response:**
```json
{
  "status": "ok",
  "message": "Grid Bot Cron endpoint ready",
  "usage": {
    "POST": {
      "description": "Process all grid bots or a specific one",
      "body": {
        "botId": "optional - process specific bot"
      }
    }
  }
}
```

#### POST - Process Grid Bots

**Request Body (optional):**
```json
{
  "botId": "optional-bot-id"
}
```

**Response (all bots):**
```json
{
  "success": true,
  "processed": 3,
  "bots": [
    {
      "botId": "bot-uuid-1",
      "success": true,
      "actions": [
        "Current price: $42150.00",
        "Current grid level: 5/10",
        "Level 3: Placed SELL at $42500.00"
      ]
    },
    {
      "botId": "bot-uuid-2",
      "success": true,
      "actions": ["Bot is not running"]
    }
  ],
  "timestamp": "2024-03-15T10:30:00.000Z"
}
```

**Response (single bot):**
```json
{
  "success": true,
  "botId": "bot-uuid",
  "actions": [
    "Current price: $42150.00",
    "Current grid level: 5/10",
    "Profit this cycle: $12.50"
  ],
  "error": null
}
```

---

### 3. /api/cron/dca (DCA Bot Worker)

Process all active DCA (Dollar Cost Averaging) bots.

**URL:** `/api/cron/dca`

**Methods:** `GET`, `POST`

#### GET - Health Check

**Response:**
```json
{
  "status": "ok",
  "message": "DCA Bot Cron endpoint ready"
}
```

#### POST - Process DCA Bots

**Request Body (optional):**
```json
{
  "botId": "optional-bot-id"
}
```

**Response:**
```json
{
  "success": true,
  "processed": 2,
  "bots": [
    {
      "botId": "dca-bot-uuid",
      "success": true,
      "actions": [
        "Current price: $42150.00",
        "DCA Level 2 executed at $41000.00"
      ]
    }
  ],
  "timestamp": "2024-03-15T10:30:00.000Z"
}
```

---

### 4. /api/cron/sync (Position Sync)

Synchronize positions with connected exchanges.

**URL:** `/api/cron/sync`

**Methods:** `GET`, `POST`

#### GET - Health Check

**Response:**
```json
{
  "status": "ok",
  "service": "position-sync",
  "timestamp": "2024-03-15T10:30:00.000Z"
}
```

#### POST - Sync All Accounts

Synchronizes positions from all connected REAL exchange accounts.

**Response:**
```json
{
  "success": true,
  "sync": {
    "accountsChecked": 2,
    "newPositions": 1,
    "closedPositions": 0,
    "updatedPositions": 3,
    "errors": []
  },
  "monitor": {
    "checked": 5,
    "updated": 2,
    "closed": 0,
    "errors": []
  },
  "timestamp": "2024-03-15T10:30:00.000Z"
}
```

---

### 5. /api/cron/position-sync (Fast Position Sync)

Quick position synchronization for frequent polling (every 30 seconds).

**URL:** `/api/cron/position-sync`

**Methods:** `GET`, `POST`

#### GET - Health Check

**Response:**
```json
{
  "status": "ok",
  "message": "Position Sync Cron endpoint ready",
  "usage": {
    "description": "Syncs positions from all connected REAL exchange accounts",
    "schedule": "Every 30 seconds recommended"
  }
}
```

#### POST - Sync Positions

**Response:**
```json
{
  "success": true,
  "timestamp": "2024-03-15T10:30:00.000Z",
  "duration": "156ms",
  "summary": {
    "newPositions": 1,
    "closedPositions": 0,
    "updatedPositions": 2,
    "errors": 0
  },
  "details": {
    "account-uuid": {
      "newPositions": [...],
      "closedPositions": [...],
      "updatedPositions": [...],
      "errors": []
    }
  }
}
```

---

### 6. /api/cron/ohlcv-sync (OHLCV Data Sync)

Sync historical candlestick data from multiple exchanges.

**URL:** `/api/cron/ohlcv-sync`

**Methods:** `GET`, `POST`

#### GET - Scheduled Sync

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `exchanges` | string | `binance` | Comma-separated exchange IDs |
| `symbols` | string | Top 10 | Comma-separated symbols |
| `timeframes` | string | `1h,4h,1d` | Comma-separated timeframes |
| `daysBack` | number | `7` | Days to sync (max 7 for GET) |

**Default Symbols by Exchange:**
```typescript
const DEFAULT_SYMBOLS = {
  binance: ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT', 
            'DOGEUSDT', 'ADAUSDT', 'AVAXUSDT', 'DOTUSDT', 'LINKUSDT'],
  bybit: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'XRPUSDT', 'DOGEUSDT'],
  okx: ['BTC-USDT', 'ETH-USDT', 'SOL-USDT', 'XRP-USDT', 'DOGE-USDT'],
};
```

**Response:**
```json
{
  "success": true,
  "timestamp": "2024-03-15T10:30:00.000Z",
  "duration": "2345ms",
  "summary": {
    "total": 60,
    "success": 55,
    "skipped": 3,
    "errors": 2
  },
  "results": [
    {
      "exchange": "binance",
      "symbol": "BTCUSDT",
      "timeframe": "1h",
      "marketType": "futures",
      "status": "success",
      "candles": 168
    },
    {
      "exchange": "binance",
      "symbol": "ETHUSDT",
      "timeframe": "1h",
      "marketType": "futures",
      "status": "skipped",
      "message": "Recently synced"
    }
  ]
}
```

#### POST - Manual Full Sync

**Request Body:**
```json
{
  "exchange": "binance",
  "symbol": "BTCUSDT",
  "timeframe": "1h",
  "marketType": "futures",
  "daysBack": 30
}
```

**Response:**
```json
{
  "success": true,
  "exchange": "binance",
  "symbol": "BTCUSDT",
  "timeframe": "1h",
  "marketType": "futures",
  "daysBack": 30,
  "fetched": 720,
  "stored": 720
}
```

---

### 7. /api/cron/all (Combined Worker)

Combined endpoint to process all trading bots in one call.

**URL:** `/api/cron/all`

**Methods:** `GET`, `POST`

#### GET - Health Check

**Response:**
```json
{
  "status": "ok",
  "message": "All Bots Cron endpoint ready",
  "tasks": ["grid", "dca", "positions"],
  "usage": {
    "POST": {
      "body": {
        "tasks": "Array of tasks to run: ['grid', 'dca', 'positions']"
      }
    }
  }
}
```

#### POST - Run All Tasks

**Request Body:**
```json
{
  "tasks": ["grid", "dca", "positions"]
}
```

**Response:**
```json
{
  "success": true,
  "timestamp": "2024-03-15T10:30:00.000Z",
  "duration": "456ms",
  "results": {
    "grid": {
      "processed": 3,
      "results": [...]
    },
    "dca": {
      "processed": 2,
      "results": [...]
    },
    "positions": {
      "success": true
    }
  }
}
```

---

### 8. /api/bots/grid-worker (Grid Bot Management)

Manage Grid bot worker lifecycle and individual bots.

**URL:** `/api/bots/grid-worker`

**Methods:** `GET`, `POST`

#### GET - Actions

**Query Parameters:**
| Action | Description |
|--------|-------------|
| `status` | Get worker status and active bots count |
| `start` | Start the grid worker |
| `stop` | Stop the grid worker |
| `list` | List all active grid bots with orders |

**GET /api/bots/grid-worker?action=status:**
```json
{
  "isRunning": true,
  "activeBots": 3,
  "message": "Grid bot worker is running"
}
```

**GET /api/bots/grid-worker?action=list:**
```json
{
  "bots": [
    {
      "id": "bot-uuid",
      "name": "Grid BTCUSDT LONG",
      "symbol": "BTCUSDT",
      "status": "ACTIVE",
      "gridOrders": [
        {
          "id": "order-uuid",
          "gridLevel": 1,
          "price": 41000,
          "side": "BUY",
          "status": "PENDING",
          "amount": 0.01
        }
      ],
      "_count": {
        "gridOrders": 10
      }
    }
  ],
  "count": 1
}
```

#### POST - Bot Management

**Actions:**

| Action | Description | Required Fields |
|--------|-------------|-----------------|
| `init` | Initialize and start a bot | `botId` |
| `stop-bot` | Stop a specific bot | `botId` |
| `create` | Create a new Grid bot | See below |

**POST - Create Bot:**
```json
{
  "action": "create",
  "name": "Grid BTCUSDT LONG",
  "symbol": "BTCUSDT",
  "exchangeId": "binance",
  "gridType": "ARITHMETIC",
  "gridCount": 10,
  "upperPrice": 45000,
  "lowerPrice": 40000,
  "totalInvestment": 1000,
  "leverage": 10,
  "marginMode": "ISOLATED",
  "takeProfit": 500,
  "stopLoss": 200
}
```

**Response:**
```json
{
  "success": true,
  "bot": {
    "id": "new-bot-uuid",
    "name": "Grid BTCUSDT LONG",
    "symbol": "BTCUSDT",
    "status": "STOPPED",
    "isActive": false
  },
  "message": "Grid bot created. Use action=init to start it."
}
```

---

## Worker Architecture

### Grid Bot Worker

The Grid Bot Worker monitors active Grid bots and executes orders when price reaches grid levels.

#### Processing Flow

```
1. Acquire distributed lock for bot
2. Get current market price
3. Parse grid levels from bot configuration
4. For each level:
   - Check if price trigger condition met
   - Calculate position size
   - Execute order (demo or live exchange)
   - Update level status
5. Check Take Profit / Stop Loss
6. Release lock
```

#### Distributed Lock Integration

```typescript
const BOT_LOCK_OPTIONS: BotLockOptions = {
  ttl: 30000,     // 30 seconds
  maxRetries: 3,
};

const BOT_PROCESSING_TIMEOUT = 25000; // 25 seconds (less than lock TTL)
```

#### Per-Symbol Mutex

Prevents concurrent order execution for the same symbol:

```typescript
class SymbolMutex {
  async acquire(symbol: string): Promise<() => void>;
  isLocked(symbol: string): boolean;
  getLockedCount(): number;
}
```

### DCA Bot Worker

The DCA Bot Worker processes Dollar Cost Averaging bots with safety orders.

#### Processing Logic

1. Check current price against DCA levels
2. Calculate price drop percentage from avg entry
3. Trigger DCA level if threshold reached
4. Update average entry price after DCA
5. Check Take Profit / Stop Loss

---

## Scheduling

### Vercel Cron

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/all",
      "schedule": "* * * * *"
    },
    {
      "path": "/api/cron/ohlcv-sync",
      "schedule": "0 * * * *"
    },
    {
      "path": "/api/cron/position-sync",
      "schedule": "*/30 * * * * *"
    }
  ]
}
```

### External Cron Service

```bash
# Every minute - process all bots
curl -X POST https://your-domain.com/api/cron/all \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"tasks": ["grid", "dca", "positions"]}'

# Every 30 seconds - position sync
curl -X POST https://your-domain.com/api/cron/position-sync \
  -H "Authorization: Bearer YOUR_CRON_SECRET"

# Every hour - OHLCV sync
curl -X GET "https://your-domain.com/api/cron/ohlcv-sync?exchanges=binance,bybit" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### GitHub Actions

```yaml
name: Cron Jobs
on:
  schedule:
    - cron: '* * * * *'  # Every minute

jobs:
  cron:
    runs-on: ubuntu-latest
    steps:
      - name: Run Cron Jobs
        run: |
          curl -X POST ${{ secrets.APP_URL }}/api/cron/all \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
            -H "Content-Type: application/json" \
            -d '{"tasks": ["grid", "dca", "positions"]}'
```

### Recommended Schedule

| Endpoint | Frequency | Purpose |
|----------|-----------|---------|
| `/api/cron/all` | Every minute | Process all trading bots |
| `/api/cron/position-sync` | Every 30 seconds | Fast position updates |
| `/api/cron/ohlcv-sync` | Every hour | Historical data sync |
| `/api/cron/ohlcv-sync` | Every 15 min | Intraday data sync |

---

## Monitoring

### Processing Metrics

Track worker performance:

```typescript
interface BotProcessingMetrics {
  totalProcessed: number;
  successful: number;
  failed: number;
  timeouts: number;
  avgDuration: number;
  maxDuration: number;
  lastProcessingTime: number;
}

// Get metrics
const gridMetrics = getBotMetrics('grid');
const dcaMetrics = getBotMetrics('dca');
```

### Health Check Endpoints

All cron endpoints support GET requests for health monitoring:

```bash
# Check all workers
curl https://your-domain.com/api/cron

# Check grid worker
curl https://your-domain.com/api/cron/grid

# Check position sync
curl https://your-domain.com/api/cron/position-sync
```

### Logging

Workers log to console with timestamps:

```
[GridWorker] Checking 3 active grid bots
[GridWorker] Bot bot-uuid processing...
[GridWorker] Placed BUY order for BTCUSDT: 0.01 @ 41000
[GridWorker] Released lock for bot bot-uuid
[GridWorker] Processed: 3, Skipped: 0
```

---

## Error Handling

### Error Types

| Error | Description | Handling |
|-------|-------------|----------|
| `Unauthorized` | Invalid or missing CRON_SECRET | Return 401 |
| `Bot not found` | Bot ID doesn't exist | Return success with error |
| `locked` | Bot already being processed | Skip processing |
| `timed out` | Processing exceeded 25 seconds | Record timeout metric |
| `Exchange error` | Order execution failed | Mark level as FAILED, notify |

### Error Isolation

Each bot is processed independently. Errors don't cascade:

```typescript
const settledResults = await Promise.allSettled(processPromises);

for (const result of settledResults) {
  if (result.status === 'fulfilled') {
    results.push(result.value);
  } else {
    results.push({
      botId: 'unknown',
      success: false,
      actions: [],
    });
  }
}
```

### Notification on Errors

Failed orders trigger Telegram notifications:

```typescript
await notifyTelegram({
  type: "ORDER_REJECTED",
  title: "❌ Grid Order Failed",
  message: `${symbol} ${side} @ $${price}\nError: ${error}`,
});
```

---

## Examples

### Example 1: Trigger All Workers via cURL

```bash
curl -X POST https://api.citarion.io/api/cron/all \
  -H "Authorization: Bearer your-cron-secret" \
  -H "Content-Type: application/json" \
  -d '{"tasks": ["grid", "dca", "positions"]}'
```

### Example 2: Process Specific Grid Bot

```bash
curl -X POST https://api.citarion.io/api/cron/grid \
  -H "Authorization: Bearer your-cron-secret" \
  -H "Content-Type: application/json" \
  -d '{"botId": "550e8400-e29b-41d4-a716-446655440000"}'
```

### Example 3: Sync OHLCV for Multiple Exchanges

```bash
curl -X GET "https://api.citarion.io/api/cron/ohlcv-sync?exchanges=binance,bybit&symbols=BTCUSDT,ETHUSDT&timeframes=1h,4h" \
  -H "Authorization: Bearer your-cron-secret"
```

### Example 4: Create and Start Grid Bot

```bash
# Create bot
curl -X POST https://api.citarion.io/api/bots/grid-worker \
  -H "Content-Type: application/json" \
  -d '{
    "action": "create",
    "name": "Grid BTCUSDT",
    "symbol": "BTCUSDT",
    "gridCount": 10,
    "upperPrice": 45000,
    "lowerPrice": 40000,
    "totalInvestment": 1000,
    "leverage": 10
  }'

# Response: {"success": true, "bot": {"id": "new-bot-uuid", ...}}

# Start bot
curl -X POST https://api.citarion.io/api/bots/grid-worker \
  -H "Content-Type: application/json" \
  -d '{"action": "init", "botId": "new-bot-uuid"}'
```

### Example 5: Check Worker Status

```bash
curl -X GET "https://api.citarion.io/api/bots/grid-worker?action=status"
# Response: {"isRunning": true, "activeBots": 3, "message": "Grid bot worker is running"}
```

### Example 6: Stop All Workers

```bash
curl -X POST https://api.citarion.io/api/cron \
  -H "Authorization: Bearer your-cron-secret" \
  -H "Content-Type: application/json" \
  -d '{"action": "stop", "workers": ["grid", "position"]}'
```

---

## Security

### CRON_SECRET

All cron endpoints require authentication via `CRON_SECRET` environment variable.

**Environment Variable:**
```bash
CRON_SECRET=your-secure-random-string
```

**Authentication Methods:**

1. **Authorization Header:**
   ```
   Authorization: Bearer your-cron-secret
   ```

2. **Query Parameter:**
   ```
   /api/cron/grid?secret=your-cron-secret
   ```

### Development Mode

In development (`NODE_ENV=development`), authentication is optional.

---

## Related Documentation

- [Grid Bot Implementation](../bots/GRID_BOT_IMPLEMENTATION.md)
- [Position Monitor](../trading/POSITION_MONITOR.md)
- [Exchange Integration](../exchange/README.md)
- [Distributed Locks](./DISTRIBUTED_LOCKS.md)
