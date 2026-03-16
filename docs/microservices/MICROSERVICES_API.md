# CITARION Microservices API Reference

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Overview

Complete API reference for all CITARION microservices.

---

## 🔌 Gateway Configuration

All services are accessed through the Caddy gateway. Use the `XTransformPort` query parameter to specify the target service.

```bash
# Example: Access Price Service on port 3002
curl "http://localhost:3000/api/prices?XTransformPort=3002"

# WebSocket connection
const ws = io('/?XTransformPort=3002');
```

---

## Price Service (Port 3002)

### REST Endpoints

#### Health Check
```http
GET /health?XTransformPort=3002
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": 1700000000000,
  "uptime": 3600
}
```

#### Get Current Prices
```http
GET /prices?XTransformPort=3002
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbols | string | No | Comma-separated symbols |
| exchange | string | No | Filter by exchange |

**Response:**
```json
{
  "prices": [
    {
      "symbol": "BTCUSDT",
      "price": 67000.50,
      "change24h": 2.5,
      "volume24h": 1234567890,
      "exchange": "binance",
      "timestamp": 1700000000000
    }
  ]
}
```

### WebSocket Events

#### Subscribe to Prices
```javascript
// Client → Server
ws.emit('subscribe', { symbols: ['BTCUSDT', 'ETHUSDT'] });
```

#### Price Update
```javascript
// Server → Client
ws.on('price_update', (data) => {
  // data = { symbol, price, exchange, timestamp }
});
```

#### Unsubscribe
```javascript
ws.emit('unsubscribe', { symbols: ['BTCUSDT'] });
```

---

## Bot Monitor Service (Port 3003)

### REST Endpoints

#### List All Bots
```http
GET /bots?XTransformPort=3003
```

**Response:**
```json
{
  "bots": [
    {
      "id": "grid-1",
      "type": "grid",
      "status": "running",
      "symbol": "BTCUSDT",
      "exchange": "binance",
      "pnl": 150.25,
      "positions": 5
    }
  ]
}
```

#### Start Bot
```http
POST /bots/start?XTransformPort=3003
Content-Type: application/json

{
  "botId": "grid-1"
}
```

#### Stop Bot
```http
POST /bots/stop?XTransformPort=3003
Content-Type: application/json

{
  "botId": "grid-1"
}
```

### WebSocket Events

#### Bot Status Update
```javascript
ws.on('bot_update', (bot) => {
  console.log(`Bot ${bot.type}: ${bot.status}`);
});
```

#### Control Bot
```javascript
ws.emit('start_bot', { botId: 'grid-1' });
ws.emit('stop_bot', { botId: 'grid-1' });
```

---

## Risk Monitor Service (Port 3004)

### REST Endpoints

#### Get Risk Metrics
```http
GET /metrics?XTransformPort=3004
```

**Response:**
```json
{
  "riskScore": 45,
  "riskLevel": "moderate",
  "totalExposure": 50000,
  "drawdown": 5.2,
  "var": -2500,
  "cvar": -3200,
  "positions": 8,
  "timestamp": 1700000000000
}
```

#### Arm Kill Switch
```http
POST /killswitch/arm?XTransformPort=3004
Content-Type: application/json

{
  "triggerType": "PERCENT_BELOW_HIGHEST",
  "threshold": 0.15
}
```

#### Trigger Kill Switch
```http
POST /killswitch/trigger?XTransformPort=3004
Content-Type: application/json

{
  "reason": "Manual trigger"
}
```

### WebSocket Events

#### Risk Update
```javascript
ws.on('risk_update', (risk) => {
  // risk = { score, level, exposure, drawdown, var }
});
```

#### Drawdown Alert
```javascript
ws.on('drawdown_alert', (alert) => {
  // alert = { level, current, threshold, timestamp }
});
```

---

## Chat Service (Port 3005)

### REST Endpoints

#### Send Message
```http
POST /chat?XTransformPort=3005
Content-Type: application/json

{
  "message": "Analyze BTCUSDT",
  "context": {}
}
```

**Response:**
```json
{
  "response": "BTCUSDT is currently in an uptrend...",
  "signal": {
    "direction": "LONG",
    "confidence": 0.75
  }
}
```

#### Parse Signal
```http
POST /parse-signal?XTransformPort=3005
Content-Type: application/json

{
  "text": "BTCUSDT LONG Entry: 67000 TP: 68000 SL: 66000"
}
```

**Response:**
```json
{
  "symbol": "BTCUSDT",
  "direction": "LONG",
  "entryPrice": 67000,
  "takeProfits": [68000],
  "stopLoss": 66000,
  "valid": true
}
```

### WebSocket Events

#### Message Exchange
```javascript
ws.emit('send_message', { content: 'Hello' });
ws.on('message', (msg) => {
  // msg = { role, content, timestamp }
});
```

---

## ML Service (Port 3006)

### REST Endpoints

#### Price Prediction
```http
POST /api/v1/predict/price?XTransformPort=3006
Content-Type: application/json

{
  "features": [[[...ohlcvs...]]],
  "symbol": "BTCUSDT",
  "horizon": 24
}
```

**Response:**
```json
{
  "predictions": {
    "1h": 67100.50,
    "4h": 67500.00,
    "24h": 68200.00
  },
  "confidence": 0.82,
  "model": "lstm_attention"
}
```

#### Signal Classification
```http
POST /api/v1/predict/signal?XTransformPort=3006
Content-Type: application/json

{
  "features": [[...indicators...]],
  "symbol": "BTCUSDT"
}
```

**Response:**
```json
{
  "signal": "BUY",
  "probability": 0.78,
  "confidence": 0.85
}
```

#### Regime Detection
```http
POST /api/v1/predict/regime?XTransformPort=3006
Content-Type: application/json

{
  "observations": [[...features...]]
}
```

**Response:**
```json
{
  "regime": "bull_trend",
  "probability": 0.72,
  "states": ["accumulation", "markup", "distribution", "markdown"]
}
```

### WebSocket Events

#### Subscribe to Predictions
```javascript
ws.emit('subscribe_predictions', {
  channels: ['price_predictions', 'signal_predictions']
});
```

#### Prediction Update
```javascript
ws.on('price_prediction', (pred) => {
  // pred = { symbol, predictions, confidence }
});
```

---

## RL Service (Port 3007)

### REST Endpoints

#### Start Training
```http
POST /api/v1/train/start?XTransformPort=3007
Content-Type: application/json

{
  "agent": "ppo",
  "symbol": "BTCUSDT",
  "episodes": 1000
}
```

#### Get Training Status
```http
GET /api/v1/train/status?XTransformPort=3007
```

**Response:**
```json
{
  "status": "training",
  "progress": 0.45,
  "episode": 450,
  "reward": 125.50,
  "metrics": {
    "sharpe": 1.5,
    "winRate": 0.62
  }
}
```

#### Get Action
```http
POST /api/v1/predict?XTransformPort=3007
Content-Type: application/json

{
  "state": [[...state_features...]],
  "agent": "ppo"
}
```

**Response:**
```json
{
  "action": "BUY",
  "size": 0.1,
  "confidence": 0.75
}
```

---

## Telegram Service (Port 3006)

### REST Endpoints

#### Send Notification
```http
POST /notify?XTransformPort=3006
Content-Type: application/json

{
  "chatId": "123456789",
  "message": "Trade executed: BTCUSDT LONG"
}
```

#### Set Webhook
```http
POST /webhook/set?XTransformPort=3006
Content-Type: application/json

{
  "url": "https://your-domain.com/api/telegram/webhook"
}
```

---

## Error Handling

All services return errors in a consistent format:

```json
{
  "error": {
    "code": "SERVICE_ERROR",
    "message": "Detailed error message",
    "details": {}
  }
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `INVALID_REQUEST` | Invalid request format |
| `UNAUTHORIZED` | Missing or invalid token |
| `RATE_LIMITED` | Rate limit exceeded |
| `SERVICE_ERROR` | Internal service error |
| `NOT_FOUND` | Resource not found |

---

## Rate Limits

| Service | Limit | Window |
|---------|-------|--------|
| Price Service | 100 | per second |
| Bot Monitor | 50 | per second |
| Risk Monitor | 50 | per second |
| Chat Service | 20 | per second |
| ML Service | 10 | per second |
| RL Service | 5 | per second |

---

*Last updated: March 2026 | CITARION Documentation Team*
