# Changelog

All notable changes to CITARION will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-03-13

### Added

#### Trading Bots
- **17+ Specialized Trading Bots** - Complete bot ecosystem
  - Grid Bot (MESH) - Auto-levels, trailing grid, adaptive grid
  - DCA Bot (SCALE) - ML timing, safety orders, TP per level
  - BB Bot (BAND) - Bollinger Bands with MTF confirmation
  - Vision Bot (FCST) - 24-hour price forecasting
  - Argus Bot (PND) - Pump & dump detection
  - Orion Bot (TRND) - Trend detection with hedging
  - Range Bot (RNG) - Range-bound detection
  - LOGOS Bot - ML-weighted strategy switching
  - Institutional Bots: Spectrum, Reed, Architect, Equilibrist, Kron
  - Frequency Bots: Helios (HFT), Selene (MFT), Atlas (LFT)

#### Machine Learning
- **Lawrence Classifier** - Lorentzian distance-based classification
- **Price Predictor** - LSTM + Attention multi-horizon forecasts
- **Signal Classifier** - Gradient Boosting BUY/SELL/HOLD
- **Regime Detector** - Hidden Markov Models for market states
- **RL Agents** - PPO, SAC, DQN implementations
- **ML Pipeline** - Auto-ML, feature engineering, model registry

#### Technical Indicators
- **50+ Technical Indicators**
  - Moving Averages: SMA, EMA, WMA, HMA, ALMA, TEMA, DEMA, KAMA
  - Oscillators: RSI, MACD, Stochastic, CCI, MFI, AO
  - Volatility: Bollinger Bands, ATR, Keltner, Donchian
  - Volume: OBV, VWAP, Volume Profile
  - Advanced: Squeeze Momentum, Wave Trend, Neural Probability Channel

#### Risk Management
- **VaR Calculator** - Historical, Parametric, Monte Carlo methods
- **Kill Switch** - 5 trigger types (Breakeven, Moving Target, etc.)
- **Drawdown Monitor** - Multi-level alerts
- **Position Limiter** - Kelly Criterion optimization
- **Liquidation Protection** - Auto-deleverage prevention
- **Stress Testing** - Portfolio stress scenarios

#### Exchange Integration
- **12 Exchange Integrations**
  - Binance (Spot, Futures, Testnet)
  - Bybit V5 (Spot, Futures, Testnet)
  - OKX (Demo mode support)
  - Bitget, BingX, KuCoin, HTX/Huobi
  - HyperLiquid, BitMEX, BloFin
  - Coinbase, Aster DEX (1001x leverage)
- **Copy Trading** - Master/Follower modes for 5 exchanges
- **Universal Bot Adapter** - Single interface for all exchanges

#### Microservices
- **9 Microservices**
  - Price Service (3002) - Multi-exchange price aggregation
  - Bot Monitor (3003) - Real-time bot status
  - Trade Events Service (3003) - Event confirmations
  - Risk Monitor (3004) - Risk metrics WebSocket
  - Chat Service (3005) - Oracle AI assistant
  - HFT Service (3005) - Go sub-millisecond engine
  - Telegram Service (3006) - Bot integration
  - ML Service (3006) - Python/FastAPI predictions
  - RL Service (3007) - Reinforcement learning

#### API & Backend
- **120+ API Endpoints**
  - Trading APIs (trade, positions, orders)
  - Bot Management APIs (17 bot types)
  - ML APIs (train, predict, classify)
  - Risk APIs (metrics, killswitch)
  - Exchange APIs (connect, verify, sync)
  - Signal APIs (parse, process, webhook)

#### Frontend
- **React 19 + Next.js 16**
- **shadcn/ui Components** - 40+ UI components
- **Real-time Charts** - Lightweight Charts integration
- **Multi-chart Panel** - Multiple symbols simultaneously
- **One-click Trading** - Quick execution interface
- **Trading Hotkeys** - Keyboard shortcuts (B, S, E, R, 1-6)

### Changed

- Upgraded from Next.js 14 to Next.js 16 with App Router
- Migrated to React 19 with new features
- Updated to Tailwind CSS 4
- Improved state management with Zustand 5
- Enhanced data fetching with TanStack Query 5

### Security

- **Two-Factor Authentication (2FA)** - TOTP implementation
- **API Key Encryption** - AES-256-GCM encryption
- **Credential Manager** - Secure API key storage
- **Audit Trail** - Full activity logging
- **Input Validation** - Zod schemas for all inputs

### Performance

- **Incremental Indicators** - Real-time calculations without full recalc
- **Worker Pool** - Parallel processing for ML tasks
- **Caching Layer** - Redis support for distributed caching
- **Database Optimization** - Indexed queries, connection pooling

---

## [1.5.0] - 2025-12-15

### Added

- Grid Bot with adaptive levels and trailing grid
- DCA Bot with ML timing and safety orders
- Copy Trading support for Binance, Bybit, OKX, Bitget, BingX
- Telegram Bot integration
- Signal Parser for Cornix format
- Hyperopt engine (Grid, Random, TPE, Genetic)
- Backtesting engine with Monte Carlo simulation
- Paper Trading engine

### Changed

- Improved exchange client architecture
- Enhanced error handling with circuit breaker
- Better WebSocket reconnection logic

---

## [1.0.0] - 2025-06-01

### Added

- Basic trading functionality
- 5 exchange integrations (Binance, Bybit, OKX, Bitget, BingX)
- Core trading bots (Grid, DCA, BB)
- Risk management basics (Stop Loss, Take Profit)
- Demo/Paper trading mode
- Basic technical indicators
- Simple signal parsing

---

## Release Notes

### Version 2.0.0 Highlights

**Major Architecture Overhaul:**
- Complete rewrite with modular architecture
- Microservices-based design for scalability
- Plugin system for custom strategies

**Production Ready:**
- Docker and Kubernetes deployment support
- CI/CD pipeline templates
- Comprehensive monitoring with Prometheus/Grafana

**Developer Experience:**
- Full TypeScript strict mode
- Comprehensive API documentation
- Testing infrastructure with coverage reports

---

## Upgrade Guide

### From 1.x to 2.0.0

1. **Backup Data**
   ```bash
   cp -r db db_backup
   ```

2. **Update Dependencies**
   ```bash
   rm -rf node_modules bun.lock
   bun install
   ```

3. **Migrate Database**
   ```bash
   bun run db:push
   ```

4. **Update Environment Variables**
   - Add `ENCRYPTION_KEY` for API key encryption
   - Add `NEXTAUTH_SECRET` for authentication
   - Update `DATABASE_URL` if using PostgreSQL

5. **Update API Clients**
   - Exchange clients now use unified interface
   - Bot APIs have new endpoints

---

## Roadmap

### Q2 2026
- [ ] Web-based strategy builder (no-code)
- [ ] Advanced portfolio analytics
- [ ] Social trading features

### Q3 2026
- [ ] Mobile app (React Native)
- [ ] DEX integrations (Uniswap, PancakeSwap)
- [ ] Advanced order types (TWAP, VWAP, Iceberg)

### Q4 2026
- [ ] Multi-tenant enterprise features
- [ ] Advanced reporting and compliance
- [ ] AI-powered strategy optimization

---

## Contributing

See [CONTRIBUTING.md](docs/development/CONTRIBUTING.md) for guidelines.

---

## License

MIT License - see [LICENSE](LICENSE) for details.
