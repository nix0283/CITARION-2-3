# CITARION Microservices Documentation

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Overview

CITARION uses a microservices architecture to provide scalability, fault isolation, and independent deployment capabilities. Each service handles a specific domain and communicates via WebSocket and REST APIs.

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           MICROSERVICES ARCHITECTURE                             │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                           GATEWAY (Caddy)                                │    │
│  │                           Port 3000                                     │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
│                                    │                                             │
│        ┌───────────────────────────┼───────────────────────────┐                │
│        │                           │                           │                │
│        ▼                           ▼                           ▼                │
│  ┌───────────┐             ┌───────────┐              ┌───────────┐            │
│  │  Price    │             │  Bot      │              │  Risk     │            │
│  │  Service  │             │  Monitor  │              │  Monitor  │            │
│  │  :3002    │             │  :3003    │              │  :3004    │            │
│  └───────────┘             └───────────┘              └───────────┘            │
│        │                           │                           │                │
│        ▼                           ▼                           ▼                │
│  ┌───────────┐             ┌───────────┐              ┌───────────┐            │
│  │  Chat     │             │  HFT      │              │ Telegram  │            │
│  │  Service  │             │  Service  │              │ Service   │            │
│  │  :3005    │             │  :3005    │              │  :3006    │            │
│  └───────────┘             └───────────┘              └───────────┘            │
│        │                           │                           │                │
│        ▼                           ▼                           ▼                │
│  ┌───────────┐             ┌───────────┐                                         │
│  │  ML       │             │  RL       │                                         │
│  │  Service  │             │  Service  │                                         │
│  │  :3006    │             │  :3007    │                                         │
│  └───────────┘             └───────────┘                                         │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Service Overview

| Service | Port | Technology | Description | Status |
|---------|------|------------|-------------|--------|
| **Price Service** | 3002 | Bun/TypeScript | Multi-exchange price aggregation | ✅ Active |
| **Bot Monitor** | 3003 | Bun/TypeScript | Real-time bot status monitoring | ✅ Active |
| **Trade Events** | 3003 | Bun/TypeScript | Trade event confirmations | ✅ Active |
| **Risk Monitor** | 3004 | Bun/TypeScript | Risk metrics WebSocket | ✅ Active |
| **Chat Service** | 3005 | Bun/TypeScript | Oracle AI assistant | ✅ Active |
| **HFT Service** | 3005 | Go | High-frequency trading engine | ✅ Active |
| **Telegram Service** | 3006 | Bun/TypeScript | Telegram Bot integration | ✅ Active |
| **ML Service** | 3006 | Python/FastAPI | ML predictions | ✅ Active |
| **RL Service** | 3007 | Python/FastAPI | Reinforcement learning | ✅ Active |

---

## 🚀 Quick Start

### Start All Services

```bash
# Start all microservices
./start-services.sh all

# Or start individually
./start-services.sh price-service
./start-services.sh ml-service
```

### Start Individual Services

```bash
# Price Service
cd mini-services/price-service && bun run dev

# Bot Monitor
cd mini-services/bot-monitor && bun run dev

# Risk Monitor
cd mini-services/risk-monitor && bun run dev

# ML Service (Python)
cd mini-services/ml-service && python main.py

# RL Service (Python)
cd mini-services/rl-service && python main.py
```

---

## 🔌 Service Details

### Price Service (3002)

Multi-exchange price aggregation and distribution.

**Endpoints:**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/prices` | GET | Current prices |

**WebSocket Events:**
| Event | Direction | Description |
|-------|-----------|-------------|
| `subscribe` | Client → Server | Subscribe to symbols |
| `unsubscribe` | Client → Server | Unsubscribe from symbols |
| `price_update` | Server → Client | Price updates |

**Usage:**
```typescript
import { io } from 'socket.io-client';

const ws = io('/?XTransformPort=3002');

ws.on('price_update', (data) => {
  console.log(`${data.symbol}: ${data.price}`);
});

ws.emit('subscribe', { symbols: ['BTCUSDT', 'ETHUSDT'] });
```

📖 **Full Documentation:** [price-service.md](price-service.md)

---

### Bot Monitor (3003)

Real-time bot status monitoring and control.

**Endpoints:**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/bots` | GET | List all bots |
| `/bots/:id/start` | POST | Start bot |
| `/bots/:id/stop` | POST | Stop bot |

**WebSocket Events:**
| Event | Direction | Description |
|-------|-----------|-------------|
| `bot_update` | Server → Client | Bot status update |
| `start_bot` | Client → Server | Start bot |
| `stop_bot` | Client → Server | Stop bot |
| `bot_error` | Server → Client | Bot error |

**Usage:**
```typescript
const ws = io('/?XTransformPort=3003');

ws.on('bot_update', (bot) => {
  console.log(`${bot.type}: ${bot.status}`);
});

ws.emit('start_bot', { botId: 'grid-1' });
```

📖 **Full Documentation:** [bot-monitor-service.md](bot-monitor-service.md)

---

### Risk Monitor (3004)

Real-time risk metrics and kill switch control.

**Endpoints:**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/metrics` | GET | Risk metrics |
| `/killswitch/arm` | POST | Arm kill switch |
| `/killswitch/trigger` | POST | Trigger kill switch |

**WebSocket Events:**
| Event | Direction | Description |
|-------|-----------|-------------|
| `risk_update` | Server → Client | Risk metrics update |
| `drawdown_alert` | Server → Client | Drawdown alert |
| `trigger_killswitch` | Client → Server | Trigger kill switch |

**Usage:**
```typescript
const ws = io('/?XTransformPort=3004');

ws.on('risk_update', (risk) => {
  console.log(`Risk Score: ${risk.score}`);
  console.log(`Drawdown: ${risk.drawdown}`);
});

ws.emit('trigger_killswitch', { reason: 'Manual' });
```

📖 **Full Documentation:** [risk-monitor-service.md](risk-monitor-service.md)

---

### Chat Service (3005)

Oracle AI assistant for trading signals.

**Endpoints:**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/chat` | POST | Send message |

**WebSocket Events:**
| Event | Direction | Description |
|-------|-----------|-------------|
| `message` | Server → Client | AI response |
| `send_message` | Client → Server | User message |
| `parse_signal` | Client → Server | Parse signal |

**Usage:**
```typescript
const ws = io('/?XTransformPort=3005');

ws.on('message', (msg) => {
  console.log(`${msg.role}: ${msg.content}`);
});

ws.emit('send_message', {
  content: 'BTCUSDT LONG Entry: 67000 TP: 68000 SL: 66000'
});
```

📖 **Full Documentation:** [chat-service.md](chat-service.md)

---

### HFT Service (3005)

High-frequency trading engine written in Go.

**Features:**
- Sub-millisecond latency
- Order book management
- Market making strategies
- Arbitrage detection

**Endpoints:**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/orderbook/:symbol` | GET | Order book snapshot |
| `/metrics` | GET | HFT metrics |

📖 **Full Documentation:** [hft-service.md](hft-service.md)

---

### Telegram Service (3006)

Telegram Bot integration for trading notifications.

**Features:**
- Signal notifications
- Trade alerts
- Bot status updates
- Command handling

**Endpoints:**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/webhook` | POST | Telegram webhook |

📖 **Full Documentation:** [telegram-service.md](telegram-service.md)

---

### ML Service (3006)

Machine Learning predictions via Python/FastAPI.

**Endpoints:**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/v1/predict/price` | POST | Price prediction |
| `/api/v1/predict/signal` | POST | Signal classification |
| `/api/v1/predict/regime` | POST | Regime detection |
| `/api/v1/train` | POST | Train model |

**WebSocket Events:**
| Event | Direction | Description |
|-------|-----------|-------------|
| `subscribe_predictions` | Client → Server | Subscribe to predictions |
| `prediction_request` | Client → Server | Request prediction |
| `price_prediction` | Server → Client | Price prediction |
| `signal_prediction` | Server → Client | Signal prediction |

**Usage:**
```bash
# Price prediction
curl -X POST http://localhost:3006/api/v1/predict/price \
  -H "Content-Type: application/json" \
  -d '{"features": [[[ohlcvs]]]}'
```

📖 **Full Documentation:** [ml-service.md](ml-service.md)

---

### RL Service (3007)

Reinforcement Learning agents for trading.

**Endpoints:**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/v1/train/start` | POST | Start training |
| `/api/v1/train/status` | GET | Training status |
| `/api/v1/predict` | POST | Get action |

**Agents:**
| Agent | Algorithm | Use Case |
|-------|-----------|----------|
| PPO | Proximal Policy Optimization | General trading |
| SAC | Soft Actor-Critic | Continuous actions |
| DQN | Deep Q-Network | Discrete decisions |

📖 **Full Documentation:** [rl-service.md](rl-service.md)

---

## 🔧 Configuration

### Environment Variables

```env
# Service URLs
PRICE_SERVICE_URL="http://localhost:3002"
BOT_MONITOR_URL="http://localhost:3003"
RISK_MONITOR_URL="http://localhost:3004"
CHAT_SERVICE_URL="http://localhost:3005"
HFT_SERVICE_URL="http://localhost:3005"
TELEGRAM_SERVICE_URL="http://localhost:3006"
ML_SERVICE_URL="http://localhost:3006"
RL_SERVICE_URL="http://localhost:3007"

# Redis (for pub/sub)
REDIS_URL="redis://localhost:6379"

# Telegram
TELEGRAM_BOT_TOKEN="your-bot-token"
```

### Service Configuration Files

Each service has its own configuration:

```
mini-services/
├── price-service/
│   └── package.json
├── ml-service/
│   ├── config/config.yaml
│   └── requirements.txt
├── rl-service/
│   ├── config/config.yaml
│   └── requirements.txt
└── hft-service/
    └── config/config.yaml
```

---

## 📊 Monitoring

### Health Checks

```bash
# Check all services
curl http://localhost:3002/health
curl http://localhost:3003/health
curl http://localhost:3004/health
curl http://localhost:3005/health
curl http://localhost:3006/health
curl http://localhost:3007/health
```

### Prometheus Metrics

All services expose Prometheus metrics at `/metrics`:

```bash
curl http://localhost:3002/metrics
```

### Grafana Dashboard

See [MICROSERVICES_MONITORING.md](MICROSERVICES_MONITORING.md) for Grafana setup.

---

## 🔒 Security

### Authentication

Services use JWT tokens for authentication:

```typescript
// Include token in WebSocket connection
const ws = io('/?XTransformPort=3002', {
  auth: { token: 'your-jwt-token' }
});
```

### Rate Limiting

Services implement rate limiting:

| Service | Rate Limit |
|---------|------------|
| Price Service | 100 req/sec |
| ML Service | 10 req/sec |
| RL Service | 5 req/sec |

---

## 📚 Related Documentation

- [MICROSERVICES_API.md](MICROSERVICES_API.md) - Complete API reference
- [MICROSERVICES_DEPLOYMENT.md](MICROSERVICES_DEPLOYMENT.md) - Deployment guide
- [MICROSERVICES_MONITORING.md](MICROSERVICES_MONITORING.md) - Monitoring setup
- [MICROSERVICES_COMMUNICATION.md](MICROSERVICES_COMMUNICATION.md) - Inter-service communication
- [MICROSERVICES_LOGGING.md](MICROSERVICES_LOGGING.md) - Logging standards
- [MICROSERVICES_TRACING.md](MICROSERVICES_TRACING.md) - Distributed tracing
- [MICROSERVICES_TESTING.md](MICROSERVICES_TESTING.md) - Service testing

---

*Last updated: March 2026 | CITARION Documentation Team*
