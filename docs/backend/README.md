# Backend Documentation

Полная документация по backend компонентам CITARION.

## Документация

### Core Systems

| Файл | Описание |
|------|----------|
| [BACKEND_API_REFERENCE.md](./BACKEND_API_REFERENCE.md) | Полный справочник по 120+ API endpoints |
| [STRATEGY_ENGINE_COMPLETE.md](./STRATEGY_ENGINE_COMPLETE.md) | Полная документация по движку стратегий |
| [CRON_JOBS_API.md](./CRON_JOBS_API.md) | Cron Jobs и фоновые задачи |
| [AUTO_TRADING_API.md](./AUTO_TRADING_API.md) | Auto-Trading Engine API |
| [DATA_MANAGEMENT_API.md](./DATA_MANAGEMENT_API.md) | Backup, Files, Journal, News API |
| [SIGNALS_API_COMPLETE.md](./SIGNALS_API_COMPLETE.md) | Signals API и Cornix интеграция |
| [EXCHANGE_CLIENTS_COPY_TRADING.md](./EXCHANGE_CLIENTS_COPY_TRADING.md) | Exchange Clients и Copy Trading |
| [ML_SERVICES_COMPLETE.md](./ML_SERVICES_COMPLETE.md) | ML Pipeline и Services |
| [RISK_MANAGEMENT_COMPLETE.md](./RISK_MANAGEMENT_COMPLETE.md) | Risk Management System |
| [INFRASTRUCTURE_SERVICES.md](./INFRASTRUCTURE_SERVICES.md) | Infrastructure Services |
| [BOT_ENGINE_REFERENCE.md](./BOT_ENGINE_REFERENCE.md) | Все Bot Engines (17+ ботов) |

### NEW: 100% Coverage Documents

| Файл | Описание |
|------|----------|
| [INDICATORS_SERVICE_COMPLETE.md](./INDICATORS_SERVICE_COMPLETE.md) | **200+ индикаторов** - полная документация |
| [COMPONENT_INTERACTIONS.md](../architecture/COMPONENT_INTERACTIONS.md) | **Все взаимодействия** Backend↔Backend, Backend↔UI, UI↔UI |

---

## Структура Backend

```
┌─────────────────────────────────────────────────────────────┐
│                      Backend Architecture                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐ │
│  │  API Routes    │  │  Cron Jobs     │  │  WebSocket     │ │
│  │  (/api/*)      │  │  (/api/cron/*) │  │  Connections   │ │
│  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘ │
│          │                   │                   │           │
│  ┌───────▼───────────────────▼───────────────────▼────────┐ │
│  │                    Core Services                        │ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │  • Strategy Manager    • Auto-Trading Engine           │ │
│  │  • Backtesting Engine  • Risk Monitor                  │ │
│  │  • Signal Processor    • Exchange Clients              │ │
│  │  • Position Monitor    • Trailing Stop                 │ │
│  └─────────────────────────────────────────────────────────┘ │
│                              │                               │
│  ┌───────────────────────────▼────────────────────────────┐ │
│  │                    Data Layer                           │ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │  • PostgreSQL (Neon)    • Redis Cache                  │ │
│  │  • TimescaleDB          • S3 Storage                    │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## API Endpoints по категориям

### Trading API (12 endpoints)
- `POST /api/trade/open` - Открытие позиции
- `POST /api/trade/close` - Закрытие позиции
- `GET /api/orders` - Список ордеров
- `POST /api/orders/reconcile` - Reconcile ghost orders
- ...

### Bots API (21 endpoints)
- `GET /api/bots/grid` - Grid bots
- `POST /api/bots/dca` - DCA bot operations
- `GET /api/bots/orion` - Orion bot status
- ...

### ML API (17 endpoints)
- `GET /api/ml/predict` - ML prediction
- `POST /api/ml/train` - Model training
- ...

### Risk Management API (7 endpoints)
- `GET /api/risk/report` - Risk report
- `POST /api/risk/kill-switch` - Emergency shutdown
- ...

### Cron API (8 endpoints)
- `GET /api/cron` - Worker status
- `GET /api/cron/grid` - Grid bot worker
- `GET /api/cron/position-sync` - Position sync
- ...

См. [BACKEND_API_REFERENCE.md](./BACKEND_API_REFERENCE.md) для полного списка.

---

## Strategy Engine

### Компоненты

1. **Strategies** (24+ стратегий)
   - Built-in: RSI, MACD, Bollinger, EMA Crossover
   - Zenbot: 19 портированных стратегий
   - Neural: AI-powered стратегия

2. **Tactics System**
   - Entry Tactics: MARKET, LIMIT, DCA, BREAKOUT
   - Exit Tactics: TP, SL, Trailing Stop
   - Position Management

3. **Backtesting**
   - Engine с комиссиями и slippage
   - Walk-Forward Validation
   - Monte Carlo Simulation
   - Sensitivity Analysis

4. **Plugin System**
   - Logging, Confidence Filter
   - Deduplication, Rate Limit
   - Notifications

См. [STRATEGY_ENGINE_COMPLETE.md](./STRATEGY_ENGINE_COMPLETE.md) для полной документации.

---

## Exchange Clients

### Active Exchanges (5)

| Exchange | Markets | Demo | Testnet |
|----------|---------|------|---------|
| Binance | Spot, Futures | ✅ | ✅ |
| Bybit | Spot, Futures | ✅ | ✅ |
| OKX | Spot, Futures | ✅ | ❌ |
| Bitget | Spot, Futures | ✅ | ❌ |
| BingX | Futures | ✅ | ❌ |

### Disabled Exchanges (7)

- KuCoin, Huobi, HyperLiquid, BitMEX, BloFin, Coinbase, Aster

См. [EXCHANGE_CLIENTS_COPY_TRADING.md](./EXCHANGE_CLIENTS_COPY_TRADING.md) для деталей.

---

## Auto-Trading Features

- **Signal Execution**: Multi-exchange, mode-aware
- **Trailing Stop**: 5 типов (BREAKEVEN, MOVING_TARGET, MOVING_2_TARGET, PERCENT_BELOW_TRIGGERS, PERCENT_BELOW_HIGHEST)
- **TP Grace**: Retry unfilled TPs with progressive adjustment
- **First Entry as Market**: Market execution with cap protection
- **Order Reconciliation**: Fix ghost orders

См. [AUTO_TRADING_API.md](./AUTO_TRADING_API.md) для API справочника.

---

## Copy Trading

- **Master Trader APIs**: Binance, Bybit
- **Profit Sharing**: FIXED, TIERED, PERFORMANCE
- **Slippage Protection**: ATR-based dynamic thresholds

См. [EXCHANGE_CLIENTS_COPY_TRADING.md](./EXCHANGE_CLIENTS_COPY_TRADING.md) для деталей.

---

## Безопасность

- **Authentication**: Session, API Key, Bearer, Demo
- **Rate Limiting**: Per-endpoint limits
- **Circuit Breaker**: CLOSED/OPEN/HALF_OPEN pattern
- **API Version Monitoring**: Deprecation tracking

---

## Мониторинг

- **Health Checks**: `/api/health`
- **Cron Status**: `/api/cron`
- **Error Tracking**: Structured logging

---

## Связанные документы

- [Microservices Documentation](../microservices/README.md)
- [Exchange Documentation](../exchanges/README.md)
- [ML Documentation](../ml/README.md)
- [Security Documentation](../security/README.md)
