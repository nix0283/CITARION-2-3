# CITARION Webhook Integration

> **Last Updated:** March 2025  
> **Supported Sources:** TradingView, Telegram, Cornix

---

## Overview

CITARION receives trading signals via webhooks from multiple sources.

### Webhook Sources

| Source | Endpoint | Authentication |
|--------|----------|----------------|
| TradingView | `/api/webhook/tradingview` | HMAC-SHA256 |
| Telegram | `/api/telegram/webhook` | Bot Token |
| Cornix | `/api/webhook/cornix` | API Key |

### Signal Format (Cornix)

```
#BTC/USDT
LONG
Entry: 67000-67500
TP1: 68000
TP2: 69000
SL: 66000
Leverage: 10x
```

---

## TradingView Webhook

### Configuration

- **URL:** `https://your-domain.com/api/webhook/tradingview`
- **Method:** POST
- **Content-Type:** application/json

### Payload Format

```json
{
  "symbol": "{{ticker}}",
  "action": "{{strategy.order.action}}",
  "price": {{close}},
  "stop_loss": {{plot_0}},
  "take_profit": {{plot_1}}
}
```

---

## Telegram Bot Webhook

### Commands

- `/start` - Start bot
- `/status` - Account status
- `/positions` - Open positions
- `/close all` - Close all positions
- `/demo` / `/real` - Switch mode

---

## Security

- IP Whitelisting for TradingView and Telegram
- HMAC-SHA256 signature verification
- Rate limiting per source
- Duplicate detection via fingerprinting

See [SECURITY_GUIDE.md](../security/SECURITY_GUIDE.md) for details.
