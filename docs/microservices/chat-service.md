# Chat Service Documentation

**Service Name:** Oracle Chat Service  
**Port:** 3005  
**Technology:** Bun/TypeScript (Socket.IO)  
**Status:** ✅ Active

---

## Overview

The Chat Service is an AI-powered trading assistant that provides real-time communication for trading signals and commands. It integrates with the Oracle AI assistant for intelligent signal parsing and analysis.

### Key Capabilities

- **Multi-language Chat** - Supports English and Russian commands
- **Signal Parsing** - Parses Cornix and TradingView signal formats
- **AI-Powered Analysis** - Integrates with Oracle AI for market analysis
- **Real Trading Integration** - Execute trades directly from chat
- **Position Management** - Monitor and manage open positions
- **Risk Alerts** - Real-time risk management notifications

---

## Features

### Multi-Language Support

| Language | Keywords |
|----------|----------|
| English | long, short, buy, sell, entry, tp, sl |
| Russian | лонг, шорт, вход, тп, стоп, позиция |

### Signal Parsing

The service parses trading signals in multiple formats:

- **Cornix Format** - Full Cornix signal syntax
- **TradingView Format** - Webhook alerts
- **Free Text** - Natural language signals

### Command System

| Command | Description |
|---------|-------------|
| `help` | Show available commands |
| `status` | System status and mode |
| `positions` | Show open positions |
| `demo` / `real` | Switch trading mode |
| `exchange <name>` | Select exchange |
| `sync` | Sync positions with exchange |
| `close all` | Close all positions |
| `clear signals` | Delete all signals |
| `reset` | Full database reset |

---

## REST Endpoints

### Health Check

```http
GET /health?XTransformPort=3005
```

**Response:**
```json
{
  "status": "ok",
  "service": "chat-service",
  "uptime": 3600,
  "connectedClients": 5
}
```

### Send Message

```http
POST /chat?XTransformPort=3005
Content-Type: application/json

{
  "message": "Analyze BTCUSDT",
  "context": {
    "mode": "DEMO",
    "exchange": "binance"
  }
}
```

**Response:**
```json
{
  "response": "BTCUSDT is currently in an uptrend with RSI at 65...",
  "signal": {
    "direction": "LONG",
    "confidence": 0.75,
    "entryRange": [66900, 67100],
    "targets": [68000, 69000]
  }
}
```

### Parse Signal

```http
POST /parse-signal?XTransformPort=3005
Content-Type: application/json

{
  "text": "BTCUSDT LONG Entry: 67000 TP: 68000 SL: 66000 Leverage: 10x"
}
```

**Response:**
```json
{
  "valid": true,
  "symbol": "BTCUSDT",
  "direction": "LONG",
  "action": "BUY",
  "entryPrices": [67000],
  "takeProfits": [
    { "price": 68000, "percentage": 100 }
  ],
  "stopLoss": 66000,
  "leverage": 10,
  "marketType": "FUTURES"
}
```

---

## WebSocket Events

### Connection

```javascript
import { io } from 'socket.io-client';

const ws = io('/?XTransformPort=3005');

ws.on('connect', () => {
  console.log('Connected to Chat Service');
});
```

### Server → Client Events

| Event | Description | Payload |
|-------|-------------|---------|
| `chat_message` | New chat message | `{ id, role, content, timestamp, type, data }` |
| `message_history` | Chat history on connect | `ChatMessage[]` |

### Client → Server Events

| Event | Description | Payload |
|-------|-------------|---------|
| `send_message` | Send a message | `{ content: string }` |
| `parse_signal` | Parse signal text | `{ text: string }` |
| `execute_signal` | Execute parsed signal | `{ signal: SignalData }` |
| `set_mode` | Change trading mode | `{ mode: "DEMO" | "REAL" }` |
| `set_exchange` | Change exchange | `{ exchange: string }` |
| `sync_positions` | Sync with exchange | - |
| `escort_position` | Accept/ignore external position | `{ positionId, action }` |

---

## Supported Signal Formats

### Cornix Format

```
#BTCUSDT
LONG
Entry: 67000 - 67200
TP1: 68000
TP2: 69000
SL: 66000
Leverage: 10x
```

### TradingView Format

```
BTCUSDT LONG @ 67000
Target: 68000
Stop: 66000
```

### Free Text Format

```
BTC лонг вход 67000 тп 68000 стоп 66000 плечо 10х
```

### Signal Data Structure

```typescript
interface SignalData {
  symbol: string;
  direction: "LONG" | "SHORT";
  action: "BUY" | "SELL" | "CLOSE";
  entryPrices: number[];
  takeProfits: { price: number; percentage: number }[];
  stopLoss?: number;
  leverage: number;
  marketType: "SPOT" | "FUTURES";
  exchanges?: string[];
}
```

---

## Configuration

### Environment Variables

```env
# Service Configuration
CHAT_SERVICE_PORT=3005
MAIN_API_URL=http://localhost:3000

# CORS (Required for production)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# AI Integration
ORACLE_AI_ENABLED=true
ORACLE_AI_MODEL=gpt-4
```

### AI Model Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `ORACLE_AI_MODEL` | gpt-4 | AI model for analysis |
| `MAX_TOKENS` | 500 | Maximum response tokens |
| `TEMPERATURE` | 0.7 | Response creativity |

---

## Example Code

### JavaScript/TypeScript Client

```typescript
import { io } from 'socket.io-client';

// Connect to Chat Service
const ws = io('/?XTransformPort=3005');

// Listen for messages
ws.on('chat_message', (message) => {
  console.log(`[${message.role}] ${message.content}`);
  
  if (message.type === 'signal') {
    console.log('Signal data:', message.data);
  }
});

// Send a signal
ws.emit('send_message', {
  content: 'BTCUSDT LONG Entry: 67000 TP: 68000 SL: 66000'
});

// Change mode
ws.emit('set_mode', { mode: 'REAL' });

// Sync positions
ws.emit('sync_positions');

// Execute a parsed signal
ws.emit('execute_signal', {
  signal: {
    symbol: 'ETHUSDT',
    direction: 'SHORT',
    entryPrices: [3500],
    takeProfits: [{ price: 3400, percentage: 100 }],
    stopLoss: 3600,
    leverage: 5,
    marketType: 'FUTURES'
  }
});
```

### REST API Example

```bash
# Parse a signal
curl -X POST "http://localhost:3000/parse-signal?XTransformPort=3005" \
  -H "Content-Type: application/json" \
  -d '{"text": "BTCUSDT LONG Entry: 67000 TP: 68000 SL: 66000"}'

# Send a chat message
curl -X POST "http://localhost:3000/chat?XTransformPort=3005" \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the current BTC trend?"}'
```

### React Hook Example

```typescript
import { useChatWebSocket } from '@/hooks/use-chat-websocket';

function ChatComponent() {
  const { messages, sendMessage, isConnected } = useChatWebSocket({
    onMessage: (msg) => {
      if (msg.type === 'signal') {
        // Handle signal notification
      }
    }
  });

  const handleSendSignal = (signalText: string) => {
    sendMessage({ content: signalText });
  };

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id} className={`message ${msg.role}`}>
          {msg.content}
        </div>
      ))}
    </div>
  );
}
```

---

## Integration Points

### Main API Integration

| Endpoint | Purpose |
|----------|---------|
| `/api/trade/open` | Open new position |
| `/api/trade/close-all` | Close all positions |
| `/api/positions/sync` | Sync positions |
| `/api/risk` | Get risk metrics |
| `/api/chat/parse-signal` | AI signal parsing |

### Risk Monitor Integration

The Chat Service connects to the Risk Monitor (port 3004) for real-time risk alerts:

```typescript
// Risk alerts are forwarded to chat
ws.on('chat_message', (msg) => {
  if (msg.type === 'notification' && msg.data?.type === 'RISK_WARNING') {
    // Display risk alert
  }
});
```

---

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": "PARSE_ERROR",
  "message": "Could not parse signal: missing entry price",
  "details": {}
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| `PARSE_ERROR` | Signal parsing failed |
| `INVALID_SYMBOL` | Unknown trading pair |
| `EXECUTION_FAILED` | Trade execution failed |
| `MODE_ERROR` | Mode switch not allowed |

---

## Monitoring

### Health Check

```bash
curl http://localhost:3005/health
```

### Metrics

| Metric | Description |
|--------|-------------|
| `connectedClients` | Active WebSocket connections |
| `messagesProcessed` | Total messages handled |
| `signalsParsed` | Signals successfully parsed |
| `signalsExecuted` | Trades executed |

---

## See Also

- [MICROSERVICES_API.md](MICROSERVICES_API.md) - Complete API reference
- [telegram-service.md](telegram-service.md) - Telegram integration
- [../trading/CORNIX_SIGNAL_FORMAT.md](../trading/CORNIX_SIGNAL_FORMAT.md) - Signal format details

---

*Last updated: March 2026 | CITARION Documentation Team*
