# Telegram Service Documentation

**Service Name:** Telegram Bot Service  
**Port:** 3006  
**Technology:** Bun/TypeScript (Socket.IO)  
**Status:** ✅ Active

---

## Overview

The Telegram Service provides a Telegram Bot integration for trading notifications, signal alerts, and command handling. It enables traders to interact with CITARION through Telegram's messaging platform.

### Key Capabilities

- **Signal Notifications** - Receive trading signal alerts
- **Trade Alerts** - Position open/close notifications
- **Bot Commands** - Control trading via Telegram
- **Inline Keyboards** - Interactive button interfaces
- **WebSocket Bridge** - Forward messages to Chat Service

---

## Features

### Notification Types

| Type | Description |
|------|-------------|
| **Signal Alert** | New trading signal received |
| **Trade Execution** | Order filled notification |
| **Position Update** - Position modification |
| **Risk Warning** | Drawdown or risk alerts |
| **External Position** | Discovered external positions |

### Interactive Features

- **Inline Keyboards** - Buttons for quick actions
- **Callback Queries** - Respond to button clicks
- **Markdown Support** - Rich formatting in messages
- **Multi-Language** - English and Russian support

---

## REST Endpoints

### Health Check

```http
GET /health?XTransformPort=3006
```

**Response:**
```json
{
  "status": "ok",
  "service": "telegram-service",
  "bot_token_configured": true,
  "polling_active": true,
  "active_users": 5
}
```

### Send Notification

```http
POST /notify?XTransformPort=3006
Content-Type: application/json

{
  "chatId": 123456789,
  "message": "🟢 *Position Opened*\n\nBTCUSDT LONG\nEntry: $67,000\nLeverage: 10x",
  "parse_mode": "Markdown"
}
```

**Response:**
```json
{
  "success": true,
  "message_id": 456
}
```

### Webhook Configuration

```http
POST /webhook?XTransformPort=3006
Content-Type: application/json

{
  "url": "https://your-domain.com/api/telegram/webhook",
  "secret_token": "your-webhook-secret"
}
```

### Set Webhook

```http
POST /webhook/set?XTransformPort=3006
Content-Type: application/json

{
  "url": "https://your-domain.com/api/telegram/webhook"
}
```

---

## Bot Commands

### Basic Commands

| Command | Description |
|---------|-------------|
| `/start` | Initialize bot and show welcome message |
| `/help` | Display help and available commands |
| `/status` | Show system status and configuration |
| `/positions` | List open positions |
| `/balance` | Show account balance |

### Trading Commands

| Command | Description |
|---------|-------------|
| `/settings` | Open settings with inline keyboard |
| `/sync` | Sync positions with exchange |
| `/close all` | Close all open positions |

### Settings Commands

| Command | Description |
|---------|-------------|
| `/demo` | Switch to DEMO mode |
| `/real` | Switch to REAL mode |
| `/exchange <name>` | Change exchange |

---

## Command Details

### /start

Initializes the bot and shows the welcome message:

```
🤖 *Welcome to Oracle Bot!*

Advanced trading assistant with Cornix signal support.

📊 *Commands:*
/status — System status
/positions — Open positions
/balance — Account balance
/settings — Bot settings
/help — Full help

⚡ *Features:*
• Signal parsing (Cornix format)
• Real-time notifications
• Risk management alerts
• External position tracking

💡 Send a signal to execute a trade.
```

### /status

Shows current system status:

```
📊 *Oracle Status*

• Mode: DEMO
• Exchange: binance
• Open Positions: 3
• Risk Level: moderate
• Risk Score: 45
```

### /positions

Lists open positions:

```
📊 *Open Positions (3)*

🟢 *BTCUSDT* LONG
  Entry: $67,000
  Lev: 10x

🟢 *ETHUSDT* LONG
  Entry: $3,500
  Lev: 5x

🔴 *SOLUSDT* SHORT
  Entry: $150
  Lev: 10x
```

### /settings

Shows interactive settings panel:

```
⚙️ *Settings*

Mode: DEMO
Exchange: binance

[✅ DEMO] [💰 REAL]
[📊 Binance] [📊 Bybit]
[📊 OKX] [📊 Gate]
```

### /help

Displays comprehensive help:

```
📚 *Oracle Bot Help*

🎮 *Trading Modes:*
• DEMO — Virtual trading ($10,000)
• REAL — Live trading (requires API keys)

📝 *Signal Format (Cornix):*
```
BTCUSDT LONG
Entry: 67000
TP: 68000, 69000
SL: 66000
Leverage: 10x
```

🔹 *Keywords:*
• Direction: long/лонг, short/шорт
• Entry: entry/вход, buy
• TP: tp/тп, target/цель
• SL: sl, stop/стоп
• Leverage: leverage/плечо, x50

🔹 *Management:*
• BTCUSDT tp2 100 — Update TP2
• BTCUSDT sl 95 — Update SL
• BTCUSDT close — Close position
```

---

## Webhook Configuration

### Setting Up Webhook

```bash
# Set webhook URL
curl -X POST "https://api.telegram.org/bot<YOUR_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-domain.com/api/telegram/webhook"}'

# Get webhook info
curl "https://api.telegram.org/bot<YOUR_TOKEN>/getWebhookInfo"
```

### Webhook Handler

```typescript
// In your Next.js API route
// /api/telegram/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const update = await request.json();
  
  // Handle message
  if (update.message) {
    const { message } = update;
    // Process command or signal
  }
  
  // Handle callback query
  if (update.callback_query) {
    const { callback_query } = update;
    // Process button click
  }
  
  return NextResponse.json({ ok: true });
}
```

---

## Configuration

### Environment Variables

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your-bot-token-here
TELEGRAM_WEBHOOK_URL=https://your-domain.com/api/telegram/webhook

# Service URLs
MAIN_API_URL=http://localhost:3000
CHAT_SERVICE_URL=http://localhost:3005

# CORS (Required for production)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3005

# Optional
TELEGRAM_SECRET_TOKEN=your-webhook-secret
```

### Getting Bot Token

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Follow the prompts to name your bot
4. Receive your bot token

---

## WebSocket Events

### Connection

```javascript
import { io } from 'socket.io-client';

const ws = io('/?XTransformPort=3006');
```

### Server → Client Events

| Event | Description | Payload |
|-------|-------------|---------|
| `notification_sent` | Notification delivered | `{ chatId, messageId }` |
| `command_received` | Command from Telegram | `{ command, userId }` |

### Client → Server Events

| Event | Description | Payload |
|-------|-------------|---------|
| `send_notification` | Send to specific user | `{ telegramId, message }` |
| `broadcast` | Send to all users | `{ message }` |

---

## Example Code

### TypeScript Client

```typescript
import { io } from 'socket.io-client';

// Connect to Telegram Service
const ws = io('/?XTransformPort=3006');

// Send notification to specific user
ws.emit('send_notification', {
  telegramId: 123456789,
  message: '🟢 *Trade Executed*\n\nBTCUSDT LONG @ $67,000'
});

// Broadcast to all users
ws.emit('broadcast', {
  message: '⚠️ *Risk Alert*\n\nDrawdown reached 10%'
});

// Listen for events
ws.on('notification_sent', (data) => {
  console.log(`Notification sent to ${data.chatId}`);
});
```

### REST API Example

```bash
# Send notification
curl -X POST "http://localhost:3000/notify?XTransformPort=3006" \
  -H "Content-Type: application/json" \
  -d '{
    "chatId": 123456789,
    "message": "🟢 *Position Opened*\n\nBTCUSDT LONG\nEntry: $67,000"
  }'

# Health check
curl "http://localhost:3000/health?XTransformPort=3006"
```

### React Integration

```typescript
// hooks/use-telegram-notifications.ts
import { useEffect } from 'react';
import { io } from 'socket.io-client';

export function useTelegramNotifications(userId: number) {
  useEffect(() => {
    const ws = io('/?XTransformPort=3006');
    
    ws.on('connect', () => {
      console.log('Connected to Telegram Service');
    });
    
    return () => {
      ws.disconnect();
    };
  }, []);
  
  const sendNotification = (message: string) => {
    ws.emit('send_notification', {
      telegramId: userId,
      message
    });
  };
  
  const broadcast = (message: string) => {
    ws.emit('broadcast', { message });
  };
  
  return { sendNotification, broadcast };
}
```

### Python Bot Client

```python
import requests

class TelegramServiceClient:
    def __init__(self, base_url="http://localhost:3000"):
        self.base_url = base_url
    
    def notify(self, chat_id: int, message: str):
        """Send notification to Telegram user"""
        return requests.post(
            f"{self.base_url}/notify?XTransformPort=3006",
            json={"chatId": chat_id, "message": message}
        ).json()
    
    def health(self):
        """Check service health"""
        return requests.get(
            f"{self.base_url}/health?XTransformPort=3006"
        ).json()

# Usage
client = TelegramServiceClient()

# Send trade notification
client.notify(123456789, """
🟢 *Position Opened*

BTCUSDT LONG
Entry: $67,000
Leverage: 10x
""")
```

---

## Signal Parsing

The Telegram Service parses signals sent directly to the bot:

### Supported Formats

```
# Cornix Format
BTCUSDT LONG
Entry: 67000
TP: 68000
SL: 66000
Leverage: 10x

# Short Format
BTCUSDT лонг вход 67000 тп 68000 стоп 66000

# Free Text
BTC long at 67000 target 68000 stop 66000
```

### Parsed Signal Structure

```typescript
interface ParsedSignal {
  symbol: string;
  direction: "LONG" | "SHORT";
  action: "BUY" | "SELL" | "CLOSE";
  entryPrices: number[];
  takeProfits: { price: number; percentage: number }[];
  stopLoss?: number;
  leverage: number;
  marketType: "SPOT" | "FUTURES";
}
```

---

## Integration Points

### Main API Integration

| Endpoint | Purpose |
|----------|---------|
| `/api/trade/open` | Execute signals |
| `/api/trade/close-all` | Close positions |
| `/api/positions/sync` | Sync positions |
| `/api/risk` | Get risk metrics |

### Chat Service Integration

The Telegram Service connects to Chat Service (port 3005) for:

- Forwarding notifications
- Signal parsing delegation
- Risk alert forwarding

```typescript
// Forward important messages
chatServiceClient.on('chat_message', async (message) => {
  if (message.type === 'notification' || message.type === 'external-position') {
    for (const session of sessions.values()) {
      await sendMessage(session.chatId, message.content);
    }
  }
});
```

---

## Security

### Best Practices

1. **Never expose bot token** in client-side code
2. **Use webhook secret** for verification
3. **Validate chat IDs** before sending messages
4. **Rate limit** message sending

### Webhook Verification

```typescript
import crypto from 'crypto';

function verifyWebhook(
  body: string,
  signature: string,
  secret: string
): boolean {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  
  return hash === signature;
}
```

---

## Monitoring

### Health Check

```bash
curl http://localhost:3006/health
```

### Metrics

| Metric | Description |
|--------|-------------|
| `bot_token_configured` | Bot token is set |
| `polling_active` | Long polling running |
| `active_users` | Registered user sessions |
| `messages_sent` | Total notifications sent |

---

## Troubleshooting

### Bot Not Responding

1. Check `TELEGRAM_BOT_TOKEN` is set
2. Verify bot is not blocked by user
3. Check service logs for errors

### Webhook Not Working

1. Verify webhook URL is accessible
2. Check SSL certificate is valid
3. Verify secret token matches

### Rate Limiting

Telegram has rate limits:
- **30 messages/second** to same group
- **20 messages/minute** to same user

---

## See Also

- [MICROSERVICES_API.md](MICROSERVICES_API.md) - Complete API reference
- [chat-service.md](chat-service.md) - Chat Service integration
- [README.md](README.md) - Microservices overview

---

*Last updated: March 2026 | CITARION Documentation Team*
