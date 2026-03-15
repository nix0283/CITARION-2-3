# CITARION - Algorithmic Trading Platform

> **Professional-grade algorithmic trading platform with AI-powered analytics, multi-exchange support, and institutional features.**

---

## ⚠️ Project Scope Declaration

> **CITARION is a PERSONAL, SINGLE-USER algorithmic trading platform.**
> 
> This project is designed and built exclusively for **personal use by the owner**. It is NOT:
> - A multi-tenant SaaS platform
> - A social trading network
> - An enterprise/corporate solution
> - A service with user registration/authentication for multiple users
> - A distributed cluster system
> 
> **Architecture decisions are based on single-user deployment:**
> - Single database instance (SQLite)
> - No user management system required
> - No horizontal scaling needed
> - No tenant isolation or multi-tenancy features
> - Local execution preferred over cloud services
> 
> All documentation, architecture, and audit reports should be interpreted within this context.

---

![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript%205-3178C6?style=flat&logo=typescript)
![Python](https://img.shields.io/badge/Python%203.11-3776AB?style=flat&logo=python)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%204-06B6D4?style=flat&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## Table of Contents

1. [Overview](#-overview)
2. [Architecture](#-architecture)
3. [Features](#-features)
4. [Quick Start](#-quick-start)
5. [Project Structure](#-project-structure)
6. [API Reference](#-api-reference)
7. [Trading Bots](#-trading-bots)
8. [Technical Indicators](#-technical-indicators)
9. [Trading Strategies](#-trading-strategies)
10. [Machine Learning](#-machine-learning)
11. [Risk Management](#-risk-management)
12. [Exchange Integration](#-exchange-integration)
13. [Microservices](#-microservices)
14. [React Hooks](#-react-hooks)
15. [State Management](#-state-management)
16. [Security](#-security)
17. [Production Deployment](#-production-deployment)
18. [Testing](#-testing)
19. [Development](#-development)
20. [Troubleshooting & FAQ](#-troubleshooting--faq)
21. [Environment Variables](#-environment-variables)
22. [Changelog](#-changelog)
23. [Documentation](#-documentation)
24. [License](#-license)

---

## 🎯 Overview

CITARION is a comprehensive **algorithmic trading platform** designed for professional traders, featuring:

- **803 TypeScript/TSX files** with **347,000+ lines of code**
- **120+ API Endpoints** for trading, ML, bots, risk management
- **12 Exchange Integrations** with real API clients
- **17+ Specialized Trading Bots** - Grid, DCA, HFT, ML-based, and more
- **200+ Technical Indicators** - Moving averages, oscillators, volatility, volume, patterns
- **8+ Trading Strategies** - RSI, MACD, Bollinger, Zenbot-ported strategies
- **Real-time ML Predictions** - Price, signal, regime prediction via WebSocket
- **Comprehensive Risk Management** - VaR, Kill Switch, Drawdown monitoring
- **Copy Trading Support** - Master Trader and Follower modes
- **Multi-language Chat Trading** - Oracle AI assistant with signal parsing

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16, React 19, TypeScript 5 |
| **Styling** | Tailwind CSS 4, shadcn/ui, Framer Motion |
| **State** | Zustand 5, TanStack Query 5 |
| **Database** | Prisma ORM, SQLite |
| **Charts** | Recharts, Lightweight Charts |
| **Real-time** | Socket.IO, Server-Sent Events |
| **ML Backend** | Python FastAPI, TensorFlow, scikit-learn, PyTorch |
| **HFT Engine** | Go with sub-millisecond latency |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           CITARION ARCHITECTURE                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ┌───────────────────┐     ┌───────────────────┐     ┌───────────────────────┐  │
│  │   Next.js 16      │     │  Python ML        │     │    Exchange           │  │
│  │   Frontend        │────▶│  Services         │────▶│    APIs               │  │
│  │   (Port 3000)     │     │  (Ports 3006+)    │     │    (REST/WS)          │  │
│  └───────────────────┘     └───────────────────┘     └───────────────────────┘  │
│          │                        │                          │                    │
│          │                        │                          │                    │
│          ▼                        ▼                          ▼                    │
│  ┌───────────────────┐     ┌───────────────────┐     ┌───────────────────────┐  │
│  │   SQLite/         │     │   TensorFlow      │     │   Real-time           │  │
│  │   Prisma ORM      │     │   scikit-learn    │     │   Price Feeds         │  │
│  │   (Database)      │     │   PyTorch         │     │   (WebSocket)         │  │
│  └───────────────────┘     └───────────────────┘     └───────────────────────┘  │
│                                                                                  │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │                         MICROSERVICES                                      │  │
│  ├─────────────┬─────────────┬─────────────┬─────────────┬─────────────────┤  │
│  │ Price       │ Bot         │ Risk        │ Chat        │ Telegram        │  │
│  │ Service     │ Monitor     │ Monitor     │ Service     │ Service         │  │
│  │ :3002       │ :3003       │ :3004       │ :3005       │ :3006           │  │
│  └─────────────┴─────────────┴─────────────┴─────────────┴─────────────────┘  │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### Trading Features
- **Multi-Exchange Trading** - Single interface for 12 exchanges
- **Demo/Paper Trading** - Virtual balance with real prices
- **Signal Parsing** - Cornix format support with multi-entry
- **Position Management** - Trailing stops, take profits, DCA
- **Order Types** - Market, Limit, Stop-Limit, OCO
- **Leverage Trading** - Up to 1001x on Aster DEX

### ML/AI Features
- **Price Prediction** - LSTM + Attention for multi-horizon forecasts
- **Signal Classification** - Gradient Boosting for BUY/SELL/HOLD
- **Regime Detection** - Hidden Markov Models for market states
- **Reinforcement Learning** - PPO, SAC, DQN agents

### Risk Management
- **VaR Calculator** - Historical, Parametric, Monte Carlo methods
- **Kill Switch** - Emergency stop with 5 trigger types
- **Drawdown Monitor** - Multi-level alerts
- **Position Limiter** - Kelly Criterion optimization

### Analytics
- **Backtesting** - Strategy testing with historical data
- **Hyperopt** - Grid, Random, TPE, Genetic optimization
- **Performance Metrics** - Sharpe, Sortino, Max Drawdown

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 20+** or **Bun** (recommended)
- **Python 3.11+**
- **pip** or **uv** (Python package manager)

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/nix0283/CITARION-2-3.git
cd CITARION-2-3

# Install Node.js dependencies
bun install

# Install Python dependencies
pip install -r requirements.txt
```

### 2. Setup Database

```bash
# Push database schema
bun run db:push
```

### 3. Install shadcn/ui Components

```bash
npx shadcn@latest add accordion alert alert-dialog aspect-ratio avatar badge breadcrumb button calendar carousel chart checkbox collapsible command context-menu dialog drawer dropdown-menu form hover-card input input-otp label menubar navigation-menu pagination popover progress radio-group resizable scroll-area select separator sheet sidebar skeleton slider sonner switch table tabs textarea toast toggle toggle-group tooltip
```

### 4. Start Services

```bash
# Start Next.js development server (automatic in sandbox)
bun run dev

# Start Python ML services (separate terminal)
cd mini-services/ml-service && python main.py

# Or start all services at once
./start-services.sh all
```

### 5. Open Dashboard

Use the **Preview Panel** on the right side of the interface, or click **"Open in New Tab"**.

---

## 📁 Project Structure

```
citarion/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # 120+ API Routes
│   │   │   ├── ml/                   # ML Integration APIs
│   │   │   ├── bots/                 # Bot Management APIs
│   │   │   ├── trade/                # Trading APIs
│   │   │   ├── risk/                 # Risk Management APIs
│   │   │   ├── signals/              # Signal Processing APIs
│   │   │   ├── demo/                 # Demo Trading APIs
│   │   │   ├── exchange/             # Exchange APIs
│   │   │   ├── telegram/             # Telegram Bot APIs
│   │   │   ├── cron/                 # Background Jobs
│   │   │   └── ...
│   │   ├── page.tsx                  # Main Dashboard
│   │   ├── layout.tsx                # Root Layout
│   │   └── globals.css               # Global Styles
│   │
│   ├── components/
│   │   ├── ui/                       # shadcn/ui Components (40+)
│   │   ├── bots/                     # Bot Panels (17 types)
│   │   ├── risk-management/          # Risk Panels
│   │   ├── strategy-lab/             # Backtesting UI
│   │   ├── trading/                  # Trading Forms
│   │   ├── chat/                     # Oracle Chatbot
│   │   ├── chart/                    # Price Charts
│   │   ├── layout/                   # Layout Components
│   │   └── ...
│   │
│   ├── lib/                          # Core Libraries
│   │   ├── db.ts                     # Prisma Client
│   │   ├── utils.ts                  # Utilities
│   │   ├── common-types.ts           # Shared Types
│   │   ├── exchanges.ts              # Exchange Config
│   │   │
│   │   ├── exchange/                 # Exchange Clients
│   │   │   ├── index.ts              # Factory & Exports
│   │   │   ├── types.ts              # Exchange Types
│   │   │   ├── base-client.ts        # Abstract Base
│   │   │   ├── binance-client.ts     # Binance API
│   │   │   ├── bybit-client.ts       # Bybit V5 API
│   │   │   ├── okx-client.ts         # OKX API
│   │   │   ├── bitget-client.ts      # Bitget API
│   │   │   ├── bingx-client.ts       # BingX API
│   │   │   └── copy-trading/         # Copy Trading
│   │   │
│   │   ├── strategy/                 # Trading Strategies
│   │   │   ├── index.ts              # Strategy Exports
│   │   │   ├── types.ts              # Strategy Types
│   │   │   ├── builtin.ts            # Built-in Strategies
│   │   │   ├── zenbot-strategies.ts  # Zenbot Port
│   │   │   ├── zenbot-indicators.ts  # Indicator Helpers
│   │   │   ├── manager.ts            # Strategy Manager
│   │   │   ├── neural-strategy.ts    # Neural Network
│   │   │   ├── self-learning.ts      # Self-Learning
│   │   │   ├── risk-manager.ts       # Risk Manager
│   │   │   ├── trailing-stop.ts      # Trailing Stop
│   │   │   ├── alpha-factors.ts      # Alpha Factors
│   │   │   └── tactics/              # Entry/Exit Tactics
│   │   │
│   │   ├── indicators/               # Technical Indicators
│   │   │   ├── builtin.ts            # Main Export
│   │   │   ├── builtin-types.ts      # Indicator Types
│   │   │   ├── builtin-moving-averages.ts
│   │   │   ├── builtin-oscillators.ts
│   │   │   ├── builtin-volatility.ts
│   │   │   ├── builtin-volume.ts
│   │   │   ├── builtin-pivot.ts
│   │   │   ├── calculator.ts         # Calculations
│   │   │   ├── advanced/             # Advanced Indicators
│   │   │   └── chart-types/          # Chart Types
│   │   │
│   │   ├── ml/                       # Machine Learning
│   │   │   ├── index.ts              # ML Exports
│   │   │   ├── lawrence-classifier.ts
│   │   │   ├── probability-calibrator.ts
│   │   │   ├── feature-extender.ts
│   │   │   ├── kernel-regression.ts
│   │   │   ├── signal-adapter.ts
│   │   │   └── ml-pipeline.ts
│   │   │
│   │   ├── grid-bot/                 # Grid Trading Bot
│   │   ├── dca-bot/                  # DCA Trading Bot
│   │   ├── vision-bot/               # Forecasting Bot
│   │   ├── logos-bot/                # Meta Bot
│   │   ├── trading-bot/              # Trend Bot
│   │   │
│   │   ├── risk-management/          # Risk Management
│   │   │   ├── index.ts              # Risk Exports
│   │   │   ├── var-calculator.ts     # VaR
│   │   │   ├── position-limiter.ts   # Position Limits
│   │   │   ├── drawdown-monitor.ts   # Drawdown
│   │   │   ├── kill-switch.ts        # Kill Switch
│   │   │   ├── monte-carlo-var.ts    # Monte Carlo
│   │   │   ├── stress-testing.ts     # Stress Tests
│   │   │   └── liquidation-protection.ts
│   │   │
│   │   ├── auto-trading/             # Auto Trading
│   │   ├── genetic/                  # Genetic Algorithms
│   │   ├── hyperopt/                 # Hyperparameter Opt
│   │   ├── backtesting/              # Backtesting
│   │   ├── paper-trading/            # Paper Trading
│   │   │
│   │   ├── locks/                    # Distributed Locks
│   │   ├── cache/                    # Caching Layer
│   │   ├── errors/                   # Error Handling
│   │   ├── notification-service.ts   # Notifications
│   │   ├── telegram-bot.ts           # Telegram Bot
│   │   ├── signal-parser.ts          # Signal Parser
│   │   ├── ohlcv.ts                  # OHLCV Data
│   │   ├── funding.ts                # Funding Rates
│   │   └── market-forecast.ts        # Market Forecast
│   │
│   ├── hooks/                        # React Hooks
│   │   ├── use-risk-monitor.ts       # Risk Monitoring
│   │   ├── use-trade-events.ts       # Trade Events
│   │   ├── use-ml-classification.ts  # ML Classification
│   │   ├── use-chat-websocket.ts     # Chat WebSocket
│   │   ├── use-bot-monitor.ts        # Bot Monitoring
│   │   ├── use-realtime-prices.ts    # Price Updates
│   │   ├── use-trading-hotkeys.ts    # Keyboard Shortcuts
│   │   └── ...
│   │
│   ├── stores/                       # State Management
│   │   └── crypto-store.ts           # Zustand Store
│   │
│   ├── types/                        # TypeScript Types
│   │   └── index.ts                  # Domain Types
│   │
│   └── __tests__/                    # Unit Tests
│       └── core-modules.test.ts
│
├── mini-services/                    # Microservices
│   ├── price-service/                # Price Feeds (3002)
│   ├── bot-monitor/                  # Bot Monitor (3003)
│   ├── trade-events-service/         # Trade Events (3003)
│   ├── risk-monitor/                 # Risk Monitor (3004)
│   ├── chat-service/                 # Chat Service (3005)
│   ├── hft-service/                  # HFT Engine (3005)
│   ├── telegram-service/             # Telegram Bot (3006)
│   ├── ml-service/                   # ML Service (3006)
│   └── rl-service/                   # RL Service (3007)
│
├── prisma/
│   └── schema.prisma                 # Database Schema
│
├── docs/                             # Documentation
├── requirements.txt                  # Python Dependencies
├── package.json                      # Node Dependencies
└── README.md                         # This File
```

---

## 🔌 API Reference

### Trading APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/trade` | POST | Execute real trade |
| `/api/trade` | GET | Get open positions |
| `/api/trade/open` | POST | Open new position |
| `/api/trade/close` | POST | Close position |
| `/api/trade/close-all` | POST | Close all positions |
| `/api/demo/trade` | POST | Open demo position |
| `/api/demo/close` | POST | Close demo position |
| `/api/trades` | GET/POST/DELETE | Trade history with filters |
| `/api/trade-events` | GET/POST | SSE trade events |
| `/api/trading/notifications` | GET | SSE real-time trading notifications |
| `/api/positions/sync` | POST | Sync positions from exchanges |
| `/api/positions/escort` | POST/PUT/DELETE | Position escort management |

### Bot APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/bots` | GET | List all bots |
| `/api/bots/[botType]` | GET/POST/PATCH | Single bot operations |
| `/api/bots/grid` | GET/POST | Grid bot management |
| `/api/bots/dca` | GET/POST | DCA bot management |
| `/api/bots/bb` | GET/POST | Bollinger Bands bot |
| `/api/bots/argus` | GET/POST | Argus bot |
| `/api/bots/vision` | GET/POST | Vision bot |
| `/api/bots/range` | GET/POST | Range bot |
| `/api/bots/institutional` | GET/POST | Institutional bots |

### ML APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ml/train` | POST/GET/PUT/DELETE | ML training pipeline |
| `/api/ml/stats` | GET/DELETE | ML statistics |
| `/api/ml/predict/signal` | POST | Signal prediction |
| `/api/ml/predict/price` | POST | Price prediction |
| `/api/ml/predict/regime` | POST | Regime detection |
| `/api/ml/classify` | POST | Signal classification |
| `/api/ml/filter` | POST | Signal filtering |
| `/api/ml/models` | GET | Model management |
| `/api/ml/pipeline` | POST | ML pipeline execution |

### Risk APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/risk` | GET/POST | Risk report & actions |
| `/api/risk/metrics` | GET | Position risk metrics |
| `/api/risk/killswitch/trigger` | POST | Trigger kill switch |
| `/api/risk/killswitch/arm` | POST | Arm kill switch |
| `/api/risk/killswitch/disarm` | POST | Disarm kill switch |

### Signal APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/signals` | GET/POST | Signal aggregation |
| `/api/signal` | GET/POST/PUT/DELETE | Signal CRUD |
| `/api/chat/parse-signal` | POST | AI signal parser |
| `/api/webhook/tradingview` | POST | TradingView webhook |

### Exchange APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/exchange` | GET/POST/PUT/DELETE | Exchange connection |
| `/api/exchange/verify` | POST | Verify credentials |
| `/api/prices` | GET/POST | Current prices |
| `/api/ohlcv` | GET/POST | Candlestick data |
| `/api/funding` | GET | Funding rates |

### Cron/Background Jobs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/cron` | GET/POST | Run all workers |
| `/api/cron/grid` | POST | Grid bot cron |
| `/api/cron/dca` | POST | DCA bot cron |
| `/api/cron/sync` | POST | Position sync cron |
| `/api/cron/ohlcv-sync` | POST | OHLCV sync cron |

---

## 🤖 Trading Bots

### Meta Bots

| Bot | Code | Description |
|-----|------|-------------|
| **LOGOS** | LOGOS | Signal aggregator with ML-weighted strategy switching |

### Operational Bots

| Bot | Code | Description | ML Integration |
|-----|------|-------------|----------------|
| **Grid Bot** | MESH | Grid trading with auto-levels | ❌ Direction-agnostic |
| **DCA Bot** | SCALE | Dollar-cost averaging | ✅ Entry timing |
| **BB Bot** | BAND | Bollinger Bands oscillator | ✅ Breakout classification |

### Institutional Bots

| Bot | Code | Description |
|-----|------|-------------|
| **Spectrum** | PR | Spread trading |
| **Reed** | STA | Statistical arbitrage |
| **Architect** | MM | Market making |
| **Equilibrist** | MR | Mean reversion |
| **Kron** | TRF | Trend following |

### Analytical Bots

| Bot | Code | Description |
|-----|------|-------------|
| **Argus** | PND | Pump & dump detection |
| **Orion** | TRND | Trend detection |
| **Vision** | FCST | 24-hour price forecasting |
| **Range** | RNG | Range-bound detection |
| **Wolf** | WOLF | Wolf wave detection |

### Frequency Bots

| Bot | Code | Description |
|-----|------|-------------|
| **Helios** | HFT | High-frequency trading |
| **Selene** | MFT | Medium-frequency trading |
| **Atlas** | LFT | Low-frequency trading |

### Bot Configuration

```typescript
interface BotConfig {
  id: string;
  botType: 'grid' | 'dca' | 'bb' | 'vision' | 'orion' | 'argus' | 'range' | 'logos';
  symbol: string;
  exchange: ExchangeId;
  tradingMode: 'PAPER' | 'TESTNET' | 'DEMO' | 'LIVE';
  leverage: number;
  maxPositions: number;
  riskPerTrade: number;
  stopLoss?: number;
  takeProfit?: number;
  trailingStop?: TrailingStopConfig;
}
```

---

## 📈 Technical Indicators

### Moving Averages

| Indicator | Description |
|-----------|-------------|
| **SMA** | Simple Moving Average |
| **EMA** | Exponential Moving Average |
| **WMA** | Weighted Moving Average |
| **VWMA** | Volume Weighted MA |
| **HMA** | Hull Moving Average |
| **ALMA** | Arnaud Legoux MA |
| **TEMA** | Triple EMA |
| **DEMA** | Double EMA |
| **ZLEMA** | Zero Lag EMA |
| **TMA** | Triangular MA |
| **KAMA** | Kaufman Adaptive MA |
| **LSMA** | Least Squares MA |

### Oscillators

| Indicator | Description |
|-----------|-------------|
| **RSI** | Relative Strength Index |
| **MACD** | Moving Average Convergence Divergence |
| **Stochastic** | Stochastic Oscillator |
| **CCI** | Commodity Channel Index |
| **Williams %R** | Williams Percent Range |
| **MFI** | Money Flow Index |
| **AO** | Awesome Oscillator |
| **ROC** | Rate of Change |
| **Momentum** | Momentum Indicator |

### Volatility

| Indicator | Description |
|-----------|-------------|
| **Bollinger Bands** | Volatility bands |
| **ATR** | Average True Range |
| **Keltner Channels** | ATR-based channels |
| **Donchian Channels** | Price channels |
| **Standard Deviation** | Price volatility |

### Volume

| Indicator | Description |
|-----------|-------------|
| **OBV** | On-Balance Volume |
| **VWAP** | Volume Weighted Average Price |
| **MFI** | Money Flow Index |
| **Volume Profile** | Volume at price |
| **Accumulation/Distribution** | A/D Line |

### Pivot Points

| Type | Description |
|------|-------------|
| **Standard** | Classic pivot points |
| **Fibonacci** | Fib-based pivots |
| **Camarilla** | Camarilla pivots |
| **Woodie** | Woodie pivots |
| **DeMark** | DeMark pivots |

### Usage Example

```typescript
import { BUILTIN_INDICATORS } from '@/lib/indicators/builtin';

// Get RSI indicator
const rsi = BUILTIN_INDICATORS.find(i => i.id === 'rsi');

// Calculate RSI
const result = calculateIndicator(rsi, closes, { period: 14 });
```

### Advanced Indicators (ML-based)

| Indicator | Description |
|-----------|-------------|
| **WaveTrend** | Momentum oscillator with divergence detection |
| **Kernel Regression** | Nadaraya-Watson estimator with channel bands |
| **Squeeze Momentum** | Volatility breakout detection |
| **Neural Probability Channel** | ML-based probability bands |
| **ML Adaptive SuperTrend** | Adaptive trend indicator |
| **K-Means Volatility** | Clustered volatility analysis |

### Candlestick Patterns (24 patterns)

| Category | Patterns |
|----------|----------|
| **Single Candle** | Doji, Hammer, Shooting Star, Marubozu, etc. |
| **Two Candle** | Engulfing, Tweezer, Piercing Line, Dark Cloud |
| **Three Candle** | Morning/Evening Star, Three White Soldiers, etc. |

📖 **Full Indicators Reference**: [docs/backend/INDICATORS_SERVICE_COMPLETE.md](docs/backend/INDICATORS_SERVICE_COMPLETE.md)

---

## 📊 Trading Strategies

### Built-in Strategies

| Strategy | Description | Parameters |
|----------|-------------|------------|
| **RSIStrategy** | RSI overbought/oversold | period, overbought, oversold |
| **MACDStrategy** | MACD crossover | fastPeriod, slowPeriod, signalPeriod |
| **BollingerBandsStrategy** | BB breakout | period, stdDev |
| **EMACrossoverStrategy** | EMA trend crossover | fastPeriod, slowPeriod |

### Zenbot-Ported Strategies

| Strategy | Description |
|----------|-------------|
| **Bollinger** | Bollinger Bands breakout |
| **VWAP** | Volume-weighted price action |
| **DEMA** | Double EMA crossover |
| **SAR** | Parabolic SAR |
| **Momentum** | Momentum-based entries |
| **StochRSI+MACD** | Combined oscillator |
| **WaveTrend** | Wave trend oscillator |
| **CCI-SRSI** | CCI with Stochastic RSI |

### Strategy Interface

```typescript
interface IStrategy {
  name: string;
  description: string;
  parameters: StrategyParameter[];
  
  populateIndicators(candles: Candle[]): Promise<Candle[]>;
  populateEntrySignal(candles: Candle[]): Promise<StrategySignal | null>;
  populateExitSignal(candles: Candle[], position: Position): Promise<StrategySignal | null>;
}
```

### Tactics System

**Entry Tactics:**
- Market - Immediate market order
- Limit - Limit order at price
- Limit Zone - Order within price zone
- Breakout - Enter on breakout
- Pullback - Enter on pullback
- DCA - Dollar-cost averaging entries

**Exit Tactics:**
- Fixed TP - Fixed take profit
- Multi TP - Multiple take profit targets
- Trailing Stop - Dynamic stop loss
- Breakeven - Move SL to entry
- Time-based - Exit after time period

---

## 🧠 Machine Learning

### ML Service (Python/FastAPI)

**Models:**

| Model | Purpose | Architecture |
|-------|---------|--------------|
| **Price Predictor** | Multi-horizon price forecasts | LSTM + Attention |
| **Signal Classifier** | BUY/SELL/HOLD classification | Gradient Boosting |
| **Regime Detector** | Market regime detection | Hidden Markov Model |

**REST Endpoints:**

```bash
# Price prediction (multi-horizon)
curl -X POST http://localhost:3006/api/v1/predict/price \
  -H "Content-Type: application/json" \
  -d '{"features": [[[ohlcvs]]]}'

# Signal classification
curl -X POST http://localhost:3006/api/v1/predict/signal \
  -H "Content-Type: application/json" \
  -d '{"features": [[indicators]]}'

# Regime detection
curl -X POST http://localhost:3006/api/v1/predict/regime \
  -H "Content-Type: application/json" \
  -d '{"observations": [[features]]}'
```

**WebSocket:**

```javascript
const ws = new WebSocket('ws://localhost:3006/ws');

// Subscribe to predictions
ws.send(JSON.stringify({
  type: 'subscribe_predictions',
  data: { channels: ['price_predictions', 'signal_predictions'] }
}));

// Request on-demand prediction
ws.send(JSON.stringify({
  type: 'prediction_request',
  data: { prediction_type: 'price', features: [[[...]]] }
}));
```

### RL Service (Python/FastAPI)

**Agents:**

| Agent | Algorithm | Use Case |
|-------|-----------|----------|
| **PPO** | Proximal Policy Optimization | General trading |
| **SAC** | Soft Actor-Critic | Continuous actions |
| **DQN** | Deep Q-Network | Discrete decisions |

**Endpoints:**

```bash
# Start training
curl -X POST http://localhost:3007/api/v1/train/start

# Get prediction
curl -X POST http://localhost:3007/api/v1/predict \
  -H "Content-Type: application/json" \
  -d '{"state": [[...]]}'
```

### Lawrence Classifier

```typescript
import { LawrenceClassifier } from '@/lib/ml';

const classifier = new LawrenceClassifier({
  k: 5,
  distanceFunction: 'euclidean'
});

// Train
classifier.train(samples);

// Predict
const result = classifier.predict(features);
// { direction: 'LONG', probability: 0.75, confidence: 0.82 }
```

---

## 🛡️ Risk Management

### VaR Calculator

```typescript
import { VaRCalculator } from '@/lib/risk-management';

const varCalc = new VaRCalculator({
  confidenceLevel: 0.95,
  horizon: 1, // days
  method: 'monte_carlo'
});

const result = varCalc.calculate(returns);
// { var: -0.025, cvar: -0.035 }
```

### Kill Switch

**Trigger Types:**
1. **Breakeven** - Trigger when at breakeven
2. **Moving Target** - Trail with moving target
3. **Moving 2-Target** - Dual moving targets
4. **Percent Below Triggers** - Fixed percentage
5. **Percent Below Highest** - Trail from highest

```typescript
import { KillSwitch, KillSwitchManager } from '@/lib/risk-management';

const manager = getKillSwitchManager();

// Arm kill switch
await manager.arm({
  triggerType: 'PERCENT_BELOW_HIGHEST',
  threshold: 0.15 // 15% drawdown
});

// Trigger emergency stop
await manager.trigger('Manual trigger');
```

### Position Limiter

```typescript
import { PositionLimiter, calculateKelly } from '@/lib/risk-management';

// Kelly Criterion
const kellyFraction = calculateKelly(winRate, avgWin, avgLoss);

// Position limits
const limiter = new PositionLimiter({
  maxPositionSize: 0.1, // 10% of portfolio
  maxLeverage: 10,
  maxCorrelation: 0.7
});
```

### Drawdown Monitor

```typescript
import { DrawdownMonitor } from '@/lib/risk-management';

const monitor = new DrawdownMonitor({
  warningLevel: 0.10,  // 10% warning
  criticalLevel: 0.15, // 15% critical
  maxLevel: 0.25       // 25% max
});

monitor.onAlert((alert) => {
  console.log(`Drawdown alert: ${alert.level}`);
});
```

---

## 🔗 Exchange Integration

### Supported Exchanges

| Exchange | Trading | Testnet | Demo | WebSocket | Features |
|----------|---------|---------|------|-----------|----------|
| **Binance** | ✅ | ✅ | ❌ | ✅ | Spot, Futures, Inverse |
| **Bybit** | ✅ | ✅ | ❌ | ✅ | V5 API, Spot, Futures |
| **OKX** | ✅ | ❌ | ✅ | ✅ | Demo Mode Support |
| **Bitget** | ✅ | ❌ | ✅ | ✅ | Full Implementation |
| **BingX** | ✅ | ❌ | ✅ | ✅ | Full Implementation |
| **KuCoin** | ✅ | ❌ | ❌ | ✅ | Spot, Futures |
| **HTX/Huobi** | ✅ | ❌ | ❌ | ✅ | Full Implementation |
| **HyperLiquid** | ✅ | ❌ | ❌ | ✅ | Perps |
| **BitMEX** | ✅ | ✅ | ❌ | ✅ | Derivatives |
| **BloFin** | ✅ | ❌ | ✅ | ✅ | Full Implementation |
| **Coinbase** | ✅ | ❌ | ❌ | ✅ | Spot |
| **Aster DEX** | ✅ | ❌ | ❌ | ✅ | Up to 1001x leverage |

### Exchange Client Usage

```typescript
import { createExchangeClient } from '@/lib/exchange';

// Create client
const client = createExchangeClient({
  exchange: 'binance',
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
  testnet: false
});

// Get balance
const balance = await client.getBalance();

// Place order
const order = await client.createOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: 0.001,
  price: 50000
});

// Get positions
const positions = await client.getPositions();

// Subscribe to prices
client.subscribeToTicker('BTCUSDT', (ticker) => {
  console.log(ticker.price);
});
```

### Copy Trading

```typescript
import { CopyTradingClient } from '@/lib/exchange/copy-trading';

const copyClient = new CopyTradingClient({
  exchange: 'bybit',
  mode: 'follower', // or 'master'
  masterTraderId: 'trader-123'
});

// Get master trader stats
const stats = await copyClient.getMasterTraderStats();

// Get copied positions
const positions = await copyClient.getCopiedPositions();
```

### Testnet & Demo Trading

CITARION supports multiple testing environments for safe trading development:

| Exchange | Mode | Endpoint | Initial Balance | Registration |
|----------|------|----------|-----------------|--------------|
| **Binance** | TESTNET | `testnet.binancefuture.com` | 15,000 USDT | [Register](https://testnet.binancefuture.com) |
| **Bybit** | TESTNET | `api-testnet.bybit.com` | 50,000 USDT | [Register](https://testnet.bybit.com) |
| **OKX** | DEMO | `www.okx.com` + header | 10,000 USDT | Same account |
| **Bitget** | DEMO | `api.bitget.com` (S-prefix) | 50,000 SUSDT | Same account |
| **BingX** | DEMO | `open-api.bingx.com` | 100,000 VST | Same account |

**Usage:**

```typescript
// Binance Testnet
const binanceClient = new BinanceClient({
  exchange: 'binance',
  testnet: true,  // Uses testnet.binancefuture.com
  apiKey: 'testnet-api-key',
  apiSecret: 'testnet-api-secret'
});

// OKX Demo Mode
const okxClient = new OKXClient({
  exchange: 'okx',
  demo: true,  // Adds x-simulated-trading: 1 header
  apiKey: 'demo-api-key',
  apiSecret: 'api-secret',
  passphrase: 'passphrase'
});

// Bitget Demo Mode (S-prefix symbols)
const bitgetClient = new BitgetClient({
  exchange: 'bitget',
  demo: true,  // Uses SBTCUSDT instead of BTCUSDT
  apiKey: 'demo-api-key',
  apiSecret: 'api-secret',
  passphrase: 'passphrase'
});
```

### Trading Notifications (SSE)

Real-time trading notifications via Server-Sent Events:

```typescript
// Connect to trading notifications
const eventSource = new EventSource('/api/trading/notifications');

eventSource.onmessage = (event) => {
  const notification = JSON.parse(event.data);
  
  switch (notification.type) {
    case 'POSITION_OPENED':
      console.log(`Position opened: ${notification.data.symbol}`);
      break;
    case 'POSITION_CLOSED':
      console.log(`Position closed: PnL ${notification.data.realizedPnl}`);
      break;
    case 'FUNDING_RATE':
      console.log(`Funding rate: ${notification.data.rate}`);
      break;
  }
};
```

**Notification Types:**
- `POSITION_OPENED` - New position opened
- `POSITION_CLOSED` - Position closed with PnL
- `POSITION_EDITED` - SL/TP modified
- `FUNDING_RATE` - Funding rate update
- `MARK_PRICE` - Mark price change
- `LIQUIDATION_WARNING` - Near liquidation alert

---

## 🔧 Microservices

### Service Overview

| Service | Port | Technology | Description |
|---------|------|------------|-------------|
| **Price Service** | 3002 | Bun/TypeScript | Multi-exchange price aggregation |
| **Bot Monitor** | 3003 | Bun/TypeScript | Real-time bot status monitoring |
| **Trade Events** | 3003 | Bun/TypeScript | Trade event confirmations |
| **Risk Monitor** | 3004 | Bun/TypeScript | Risk metrics WebSocket |
| **Chat Service** | 3005 | Bun/TypeScript | Oracle AI assistant |
| **HFT Service** | 3005 | Go | High-frequency trading engine |
| **Telegram Service** | 3006 | Bun/TypeScript | Telegram Bot integration |
| **ML Service** | 3006 | Python/FastAPI | ML predictions |
| **RL Service** | 3007 | Python/FastAPI | Reinforcement learning |
| **Funding Service** | 3010 | Bun/TypeScript | Real-time funding rates (5 exchanges) |

### Price Service (3002)

```typescript
// WebSocket connection
const ws = io('/?XTransformPort=3002');

ws.on('price_update', (data) => {
  console.log(`${data.symbol}: ${data.price}`);
});

ws.emit('subscribe', { symbols: ['BTCUSDT', 'ETHUSDT'] });
```

### Bot Monitor (3003)

```typescript
const ws = io('/?XTransformPort=3003');

ws.on('bot_update', (bot) => {
  console.log(`${bot.type}: ${bot.status}`);
});

ws.emit('start_bot', { botId: 'grid-1' });
```

### Risk Monitor (3004)

```typescript
const ws = io('/?XTransformPort=3004');

ws.on('risk_update', (risk) => {
  console.log(`Risk Score: ${risk.score}`);
  console.log(`Drawdown: ${risk.drawdown}`);
});

ws.emit('trigger_killswitch', { reason: 'Manual' });
```

### Chat Service (3005)

```typescript
const ws = io('/?XTransformPort=3005');

ws.on('message', (msg) => {
  console.log(`${msg.role}: ${msg.content}`);
});

ws.emit('send_message', {
  content: 'BTCUSDT LONG Entry: 67000 TP: 68000 SL: 66000'
});
```

### Funding Service (3010)

Real-time funding rates from 5 exchanges (Binance, Bybit, OKX, Bitget, BingX) with WebSocket + REST fallback.

```typescript
// Get funding rates via HTTP
const response = await fetch('/api/funding/rates?XTransformPort=3010');
const data = await response.json();

// data.rates = [
//   { symbol: 'BTCUSDT', exchange: 'binance', rate: 0.0001, ratePercent: '0.0100%', 
//     annualizedRate: 10.95, heatLevel: 'low', source: 'websocket' }
// ]

// Check exchange status
const status = await fetch('/?XTransformPort=3010&path=status').then(r => r.json());
// status.exchanges = { binance: { connected: true, source: 'websocket' }, ... }

// Force refresh
await fetch('/?XTransformPort=3010&path=refresh');
```

**Features:**
- WebSocket connections for real-time updates (Binance, Bybit, OKX, Bitget)
- REST API fallback when WebSocket unavailable
- Automatic reconnection with 5-second delay
- Heat level calculation (low/medium/high/critical)
- Alerts for high funding rates (>50% annualized)

---

## 🪝 React Hooks

### useRiskMonitor

```typescript
const { riskState, killSwitch, triggerKillSwitch } = useRiskMonitor();

// riskState: { riskScore, riskLevel, totalExposure, drawdown, varValue }
// killSwitch: { isArmed, isTriggered, botsStopped }
```

### useTradeEvents

```typescript
const { events, latestEvent, confirmEvent } = useTradeEvents({
  subscription: { symbols: ['BTCUSDT'] },
  onEvent: (event) => console.log(event)
});
```

### useMLClassification

```typescript
const { result, isLoading, classify } = useMLClassification({ symbol: 'BTCUSDT' });

await classify({ high: [...], low: [...], close: [...], volume: [...] });
// result: { direction: 'LONG', probability: 0.75, confidence: 0.82 }
```

### useRealtimePrices

```typescript
const price = useRealtimePrice('BTCUSDT');
const { best, worst } = useTopPerformers(3);
const status = useConnectionStatuses();
```

### useTradingHotkeys

```typescript
useTradingHotkeys({
  onBuy: () => openBuyDialog(),
  onSell: () => openSellDialog(),
  onCloseAll: () => closeAllPositions()
});

// Hotkeys: B (buy), S (sell), Shift+E (close all), R (refresh)
// Quick buy: 1-6 (1%, 5%, 10%, 25%, 50%, 100%)
```

---

## 📦 State Management

### Zustand Store

```typescript
import { useCryptoStore } from '@/stores/crypto-store';

const {
  // Navigation
  activeTab,
  sidebarOpen,
  
  // Account
  account,
  tradingMode,
  virtualBalance,
  
  // Market Data
  marketPrices,
  
  // Positions & Trades
  positions,
  trades,
  signals,
  
  // Actions
  addPosition,
  closePosition,
  addTrade,
  addSignal,
  
  // Computed
  getTotalBalance,
  getTotalPnL,
  getWinRate
} = useCryptoStore();
```

---

## 🔒 Security

CITARION implements enterprise-grade security measures to protect your trading operations and API keys.

### Two-Factor Authentication (2FA)

```typescript
import { TwoFactorAuth } from '@/lib/auth/two-factor-auth';

const tfa = new TwoFactorAuth();

// Generate secret
const secret = tfa.generateSecret('user@example.com');

// Verify code
const isValid = tfa.verifyToken(secret, '123456');
```

### API Key Encryption

All exchange API keys are encrypted using **AES-256-GCM** before storage:

```typescript
import { encryptApiKey, decryptApiKey } from '@/lib/encryption';

// Encrypt API key before storage
const encrypted = encryptApiKey('your-api-key');

// Decrypt when needed
const decrypted = decryptApiKey(encrypted);
```

### Security Best Practices

| Practice | Description |
|----------|-------------|
| **API Key Storage** | Never store API keys in plaintext |
| **IP Whitelisting** | Use IP restrictions on exchange APIs |
| **Permission Scoping** | Only grant necessary API permissions |
| **Key Rotation** | Rotate API keys periodically |
| **Secure Environment** | Use environment variables, never commit secrets |
| **Kill Switch** | Configure emergency stop mechanisms |
| **Audit Trail** | Monitor all trading activities |

### Security Configuration

```env
# Required security settings
ENCRYPTION_KEY="your-32-byte-encryption-key-here"
NEXTAUTH_SECRET="your-nextauth-secret-min-32-chars"
```

### Security Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SECURITY ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────┐    ┌──────────────────┐    ┌───────────────┐  │
│  │   API Keys       │    │   AES-256-GCM    │    │   Database    │  │
│  │   (Input)        │───▶│   Encryption     │───▶│   Storage     │  │
│  └──────────────────┘    └──────────────────┘    └───────────────┘  │
│                                                                      │
│  ┌──────────────────┐    ┌──────────────────┐    ┌───────────────┐  │
│  │   User Input     │    │   Input          │    │   Sanitized   │  │
│  │   (Forms/API)    │───▶│   Validation     │───▶│   Processing  │  │
│  └──────────────────┘    └──────────────────┘    └───────────────┘  │
│                                                                      │
│  ┌──────────────────┐    ┌──────────────────┐    ┌───────────────┐  │
│  │   2FA Token      │    │   TOTP           │    │   Access      │  │
│  │   (Auth)         │───▶│   Verification   │───▶│   Granted     │  │
│  └──────────────────┘    └──────────────────┘    └───────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

📖 **Full Security Guide**: [docs/security/SECURITY_GUIDE.md](docs/security/SECURITY_GUIDE.md)

---

## 🚀 Production Deployment

### Docker Deployment

```bash
# Build Docker image
docker build -t citarion:latest .

# Run with Docker Compose
docker-compose up -d
```

**docker-compose.yml**:
```yaml
version: '3.8'
services:
  citarion:
    image: citarion:latest
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=file:/app/data/citarion.db
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - ENCRYPTION_KEY=${ENCRYPTION_KEY}
    volumes:
      - ./data:/app/data
      - ./logs:/app/logs
```

### Kubernetes Deployment

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: citarion
spec:
  replicas: 3
  selector:
    matchLabels:
      app: citarion
  template:
    spec:
      containers:
      - name: citarion
        image: citarion:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
```

### Microservices Deployment

```bash
# Deploy all microservices
./start-services.sh all

# Deploy specific service
./start-services.sh price-service
./start-services.sh ml-service
./start-services.sh rl-service
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: bun install
      - run: bun run lint
      - run: bun run test
      - run: bun run build
      - name: Deploy to Production
        run: ./deploy.sh
```

### Environment Checklist

| Setting | Development | Production |
|---------|-------------|------------|
| `NODE_ENV` | development | production |
| `DATABASE_URL` | SQLite file | PostgreSQL/MySQL |
| `NEXTAUTH_URL` | localhost | your-domain.com |
| `NEXTAUTH_SECRET` | random | strong-random-32+ |
| `ENCRYPTION_KEY` | random | strong-random-32 |
| `REDIS_URL` | optional | required |

📖 **Full Deployment Guide**: [docs/deployment/DEPLOYMENT_GUIDE.md](docs/deployment/DEPLOYMENT_GUIDE.md)

---

## 🧪 Testing

### Test Structure

```
src/__tests__/
├── core-modules.test.ts       # Core module tests
├── bots/                       # Bot tests
├── strategies/                 # Strategy tests
├── indicators/                 # Indicator tests
├── risk/                       # Risk management tests
└── api/                        # API integration tests
```

### Running Tests

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run with coverage
bun run test:coverage

# Run specific test file
bun test src/__tests__/core-modules.test.ts
```

### Test Coverage

| Module | Coverage Target | Current |
|--------|-----------------|---------|
| Core Trading | 90% | 85% |
| Risk Management | 95% | 90% |
| ML Pipeline | 85% | 80% |
| API Routes | 90% | 85% |
| Indicators | 95% | 92% |

### Testing Examples

```typescript
// Unit test example
describe('VaRCalculator', () => {
  it('should calculate VaR correctly', () => {
    const varCalc = new VaRCalculator({
      confidenceLevel: 0.95,
      method: 'historical'
    });
    const result = varCalc.calculate(mockReturns);
    expect(result.var).toBeCloseTo(-0.025, 3);
  });
});

// Integration test example
describe('Trading API', () => {
  it('should execute trade successfully', async () => {
    const response = await fetch('/api/trade', {
      method: 'POST',
      body: JSON.stringify({
        symbol: 'BTCUSDT',
        side: 'BUY',
        quantity: 0.001
      })
    });
    expect(response.status).toBe(200);
  });
});
```

📖 **Full Testing Strategy**: [docs/development/TESTING_STRATEGY.md](docs/development/TESTING_STRATEGY.md)

---

## 🔧 Development

### Scripts

```bash
# Development
bun run dev           # Start dev server

# Code Quality
bun run lint          # Run ESLint
bun run type-check    # TypeScript check

# Database
bun run db:push       # Push schema changes
bun run db:studio     # Open Prisma Studio
bun run db:migrate    # Run migrations
bun run db:reset      # Reset database

# Testing
bun run test          # Run tests
bun run test:watch    # Watch mode
bun run test:coverage # Coverage report
```

### Python Virtual Environment

```bash
# Create
python -m venv venv

# Activate (Linux/macOS)
source venv/bin/activate

# Activate (Windows)
.\venv\Scripts\activate

# Install
pip install -r requirements.txt
```

### Code Style

| Tool | Configuration |
|------|---------------|
| **ESLint** | `eslint.config.mjs` |
| **TypeScript** | `tsconfig.json` (strict mode) |
| **Prettier** | Integrated with ESLint |
| **Imports** | Absolute paths via `@/` alias |

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Run checks before commit
bun run lint
bun run test

# Commit with conventional format
git commit -m "feat: add new trading bot"

# Push and create PR
git push origin feature/your-feature
```

---

## ❓ Troubleshooting & FAQ

### Common Issues

#### 1. Database Connection Error

**Problem**: `Error: Cannot connect to database`

**Solution**:
```bash
# Check database file exists
ls -la db/custom.db

# Run migrations
bun run db:push
```

#### 2. API Key Not Working

**Problem**: Exchange API returns authentication error

**Solution**:
- Verify API key permissions (need trading permissions)
- Check IP whitelist on exchange
- Ensure API secret is correctly copied
- Verify encryption key is set

#### 3. WebSocket Connection Fails

**Problem**: Real-time prices not updating

**Solution**:
```typescript
// Check service is running
curl http://localhost:3002/health

// Verify WebSocket URL
const ws = io('/?XTransformPort=3002');
```

#### 4. ML Service Not Responding

**Problem**: Prediction requests timeout

**Solution**:
```bash
# Check ML service
curl http://localhost:3006/health

# Check Python dependencies
source venv/bin/activate
pip list | grep tensorflow
```

#### 5. Build Errors

**Problem**: TypeScript compilation errors

**Solution**:
```bash
# Clear cache
rm -rf .next node_modules
bun install
bun run dev
```

### FAQ

**Q: How do I add a new exchange?**
```typescript
// Create new client in src/lib/exchange/
// Implement BaseExchangeClient interface
// Register in exchange-factory.ts
```

**Q: How do I create a custom trading bot?**
```typescript
// Create in src/lib/your-bot/
// Implement bot interface
// Add to bot manager
// Create API routes in src/app/api/bots/your-bot/
```

**Q: How do I add new technical indicators?**
```typescript
// Add to src/lib/indicators/
// Follow builtin-types.ts interface
// Export from builtin.ts
```

**Q: Can I use PostgreSQL instead of SQLite?**
```bash
# Update DATABASE_URL
DATABASE_URL="postgresql://user:pass@host:5432/citarion"

# Run migrations
bun run db:migrate
```

📖 **Full Troubleshooting Guide**: [docs/development/TROUBLESHOOTING.md](docs/development/TROUBLESHOOTING.md)

---

## 📝 Changelog

### Version 2.1.0 (Current)

**New Features:**
- 📡 SSE Trading Notifications - real-time position & funding updates
- 🔔 Cornix-style notification format integration
- 📊 Enhanced Chat Service with multi-entry signal parsing
- 🧪 Detailed Testnet/Demo configuration for 5 exchanges

**Exchange Testing Modes:**
| Exchange | Mode | Initial Balance |
|----------|------|-----------------|
| Binance | TESTNET | 15,000 USDT |
| Bybit | TESTNET | 50,000 USDT |
| OKX | DEMO | 10,000 USDT |
| Bitget | DEMO | 50,000 SUSDT |
| BingX | DEMO | 100,000 VST |

### Version 2.0.0

**New Features:**
- ✨ 17+ specialized trading bots
- 🧠 ML-powered signal classification
- 📊 50+ technical indicators
- 🔗 12 exchange integrations
- 🛡️ Comprehensive risk management
- 🤖 Reinforcement learning agents

**Improvements:**
- ⚡ Upgraded to Next.js 16
- 🎨 New UI with shadcn/ui
- 📈 Enhanced backtesting engine
- 🔒 Improved security with 2FA

### Version 1.5.0

**Features:**
- Grid bot with adaptive levels
- DCA bot with ML timing
- Copy trading support
- Telegram bot integration

### Version 1.0.0

**Initial Release:**
- Basic trading functionality
- 5 exchange integrations
- Core trading bots
- Risk management basics

📖 **Full Changelog**: [CHANGELOG.md](CHANGELOG.md)

---

## 📦 Environment Variables

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Encryption (API Keys)
ENCRYPTION_KEY="your-32-byte-encryption-key"

# Exchange API Keys (optional, configure in UI)
BINANCE_API_KEY=""
BINANCE_API_SECRET=""
BYBIT_API_KEY=""
BYBIT_API_SECRET=""
OKX_API_KEY=""
OKX_API_SECRET=""
OKX_PASSPHRASE=""
BITGET_API_KEY=""
BITGET_API_SECRET=""
BITGET_PASSPHRASE=""
BINGX_API_KEY=""
BINGX_API_SECRET=""

# ML Service
ML_SERVICE_URL="http://localhost:3006"
RL_SERVICE_URL="http://localhost:3007"

# Telegram Bot
TELEGRAM_BOT_TOKEN=""
TELEGRAM_WEBHOOK_URL=""

# Redis (optional, for distributed locks)
REDIS_URL="redis://localhost:6379"
```

---

## 📚 Documentation

### Knowledge Base (3,933 Files)

External documentation from trading platforms, exchanges, and charting libraries:

| Knowledge Base | Files | Description |
|----------------|-------|-------------|
| **[Binance API](docs/kb/binance/)** | 271 | Complete Binance API (Spot, Futures, Options, Margin, SDK) |
| **[TradingView](docs/kb/tradingview/)** | 2,980 | Platform widgets, chart features, screeners |
| **[Pine Script](docs/kb/pine-script/)** | 72 | Pine Script language reference |
| **[Lightweight Charts](docs/kb/lightweight-charts/)** | 76 | Charting library documentation |
| **[Cornix](docs/kb/cornix/)** | 237 | Trading bot platform |
| **[Cornix API](docs/kb/cornix-api/)** | 225 | Signal format and API integration |

### Backend Documentation (100% Coverage ✅)
- [Backend API Reference](docs/backend/BACKEND_API_REFERENCE.md) - 120+ API endpoints
- [Bot Engine Reference](docs/backend/BOT_ENGINE_REFERENCE.md) - 17+ trading bots
- [Indicators Service](docs/backend/INDICATORS_SERVICE_COMPLETE.md) - 200+ indicators
- [Component Interactions](docs/architecture/COMPONENT_INTERACTIONS.md) - All interactions
- [100% Coverage Report](docs/backend/BACKEND_COVERAGE_REPORT_100.md) - Full audit

### ML Integration
- [ML Bot Integration](docs/ml/ML_BOT_INTEGRATION.md)
- [ML Integration Guide](docs/ml/ML_INTEGRATION.md)
- [ML Signal Pipeline](docs/ml/ML_SIGNAL_PIPELINE.md)

### Architecture
- [Trading System Architecture](docs/trading/TRADING_SYSTEM_ARCHITECTURE.md)
- [Database Schema](docs/architecture/DATABASE_SCHEMA.md)
- [WebSocket Protocol](docs/architecture/WEBSOCKET_PROTOCOL.md)

### Exchange Integration
- [Exchange Integration](docs/exchanges/README.md)
- [Copy Trading API](docs/trading/copy-trading.md)
- [12 Exchange Clients](docs/backend/EXCHANGE_CLIENTS_COPY_TRADING.md)

### Risk Management
- [Risk Management System](docs/backend/RISK_MANAGEMENT_COMPLETE.md)
- [Risk Models Documentation](docs/business-logic/RISK_MODELS_DOCUMENTATION.md)

### Full Documentation Index
See [docs/README.md](docs/README.md) for complete documentation index (4,000+ documents).

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

---

## 📞 Support

- **Documentation**: `/docs` folder
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions

---

Built with ❤️ for algorithmic traders. Powered by Next.js, TypeScript, Python, and AI.
