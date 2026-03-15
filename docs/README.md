# 📚 CITARION Documentation

> **Comprehensive documentation for the CITARION Algorithmic Trading Platform**

![Documentation](https://img.shields.io/badge/Documentation-100%25-brightgreen?style=flat)
![Files](https://img.shields.io/badge/Files-4000%2B-blue?style=flat)
![Languages](https://img.shields.io/badge/Languages-EN%20%7C%20RU-yellow?style=flat)

---

## 📖 Table of Contents

1. [Overview](#-overview)
2. [Documentation Audit Status](#-documentation-audit-status)
3. [Knowledge Base](#-knowledge-base)
4. [Backend Documentation](#-backend-documentation)
5. [Frontend Documentation](#-frontend-documentation)
6. [Integration Guides](#-integration-guides)
7. [Quick Links](#-quick-links)

---

## 🎯 Overview

CITARION documentation is organized into several categories:

| Category | Files | Coverage | Status |
|----------|-------|----------|--------|
| **Knowledge Base** | 3,667 | 100% | ✅ Complete |
| **Backend Docs** | 45+ | 100% | ✅ Complete |
| **Frontend Docs** | 45+ | 100% | ✅ Complete |
| **Component Docs** | 30+ | 100% | ✅ Complete |
| **Integration** | 20+ | 100% | ✅ Complete |
| **Security** | 10+ | 100% | ✅ Complete |

---

## 📊 Documentation Audit Status

Based on audit dated March 15, 2026:

| Component | Files | Documentation | Status |
|-----------|-------|---------------|--------|
| **Backend API** | 120+ endpoints | 100% | ✅ |
| **Microservices** | 9 services | 100% | ✅ |
| **Exchange Clients** | 12 exchanges | 100% | ✅ |
| **Trading Bots** | 17+ bots | 100% | ✅ |
| **Technical Indicators** | 200+ indicators | 100% | ✅ |
| **Trading Strategies** | 24+ strategies | 100% | ✅ |
| **Risk Management** | All components | 100% | ✅ |
| **ML Services** | All services | 100% | ✅ |
| **UI Components** | 170+ components | 100% | ✅ |

---

## 📚 Knowledge Base

External documentation from trading platforms, exchanges, and charting libraries.

### 🔸 Binance API Documentation

**Location:** [`kb/binance/`](./kb/binance/) | **Files:** 276

Complete Binance API documentation with REST, WebSocket, and SDK references.

| Module | Description |
|--------|-------------|
| **Spot API** | REST API, WebSocket streams, FIX protocol |
| **Futures API** | USDT-M and Coin-M futures trading |
| **Options API** | European options trading endpoints |
| **Margin Trading** | Leverage and margin endpoints |
| **Authentication** | HMAC and RSA authentication |

---

### 🔸 TradingView Platform Documentation

**Location:** [`kb/tradingview/`](./kb/tradingview/) | **Files:** 2,980

Complete TradingView platform documentation.

| Module | Description |
|--------|-------------|
| **Widgets** | Advanced Chart, Mini Chart, Heatmaps, Screeners |
| **Chart** | Chart features, indicators, drawings |
| **Trading** | Trading panel, order management |
| **Screener** | Stock/crypto screeners |
| **Alerts** | Alert configuration and management |

---

### 🔸 Pine Script Documentation

**Location:** [`kb/pine-script/`](./kb/pine-script/) | **Files:** 72

Pine Script programming language reference for TradingView indicators.

| Module | Description |
|--------|-------------|
| **Language** | Syntax, types, operators |
| **Concepts** | Core programming concepts |
| **Visuals** | Visual elements and rendering |
| **Migration** | Version migration guides |

---

### 🔸 OKX API Documentation

**Location:** [`kb/okx/`](./kb/okx/) | **Files:** 567

Comprehensive OKX documentation with SDKs.

| Module | Description |
|--------|-------------|
| **REST API** | Complete API documentation |
| **SDKs** | Rust, TypeScript, Python SDKs |
| **WebSocket** | Real-time data streams |

---

### 🔸 Cornix Bot Platform

**Location:** [`kb/cornix/`](./kb/cornix/) | **Files:** 245

Cornix trading bot platform documentation.

| Module | Description |
|--------|-------------|
| **Getting Started** | Account setup, API keys |
| **Trading Bots** | Signals Bot, Grid Bot, DCA Bot |
| **Examples** | 8 Telegram chat export examples |

---

## 🔧 Backend Documentation

**Location:** [`backend/`](./backend/) | **Files:** 45+

### API Reference

| Document | Description | Status |
|----------|-------------|--------|
| [BACKEND_API_REFERENCE.md](./backend/BACKEND_API_REFERENCE.md) | 120+ API endpoints | ✅ |
| [BOT_ENGINE_REFERENCE.md](./backend/BOT_ENGINE_REFERENCE.md) | 17+ trading bots | ✅ |
| [INDICATORS_SERVICE_COMPLETE.md](./backend/INDICATORS_SERVICE_COMPLETE.md) | 200+ indicators | ✅ |
| [STRATEGY_ENGINE_COMPLETE.md](./backend/STRATEGY_ENGINE_COMPLETE.md) | Strategy engine | ✅ |
| [RISK_MANAGEMENT_COMPLETE.md](./backend/RISK_MANAGEMENT_COMPLETE.md) | Risk management | ✅ |
| [ML_SERVICES_COMPLETE.md](./backend/ML_SERVICES_COMPLETE.md) | ML services | ✅ |
| [EXCHANGE_CLIENTS_COPY_TRADING.md](./backend/EXCHANGE_CLIENTS_COPY_TRADING.md) | Exchange clients | ✅ |

### API Categories

| Category | Endpoints | Documentation |
|----------|-----------|---------------|
| Trading | 12 | ✅ Complete |
| Bots | 21 | ✅ Complete |
| ML | 17 | ✅ Complete |
| Risk Management | 7 | ✅ Complete |
| Exchange | 7 | ✅ Complete |
| Signals | 4 | ✅ Complete |
| Cron | 8 | ✅ Complete |
| Data Management | 15 | ✅ Complete |
| Telegram | 4 | ✅ Complete |
| Copy Trading | 4 | ✅ Complete |

---

## 🎨 Frontend Documentation

**Location:** [`components/`](./components/) | **Files:** 30+

### Component Documentation

| Document | Components | Status |
|----------|------------|--------|
| [DASHBOARD_COMPONENTS.md](./components/DASHBOARD_COMPONENTS.md) | Balance, Market Forecast, Positions | ✅ |
| [CHART_COMPONENTS.md](./components/CHART_COMPONENTS.md) | Price Chart, One Click Trading | ✅ |
| [PORTFOLIO_MANAGEMENT.md](./components/PORTFOLIO_MANAGEMENT.md) | PnL Analytics, Asset Allocation | ✅ |
| [OPERATIONAL_BOTS.md](./components/OPERATIONAL_BOTS.md) | Grid, DCA, BB Bots | ✅ |
| [ANALYTICAL_BOTS.md](./components/ANALYTICAL_BOTS.md) | Argus, Orion, Vision Bots | ✅ |
| [ML_FILTERING_SYSTEM.md](./components/ML_FILTERING_SYSTEM.md) | ML Filtering, Signal Scorer | ✅ |
| [JOURNAL_FEATURE.md](./components/JOURNAL_FEATURE.md) | Journal Panel, Trade Logging | ✅ |
| [NEWS_FEED.md](./components/NEWS_FEED.md) | News Panel, Sentiment | ✅ |
| [WORKSPACE_MANAGEMENT.md](./components/WORKSPACE_MANAGEMENT.md) | Layout Management | ✅ |
| [BACKUP_RESTORE.md](./components/BACKUP_RESTORE.md) | Backup/Restore Functions | ✅ |

---

## 🔌 Integration Guides

**Location:** [`integrations/`](./integrations/), [`modules/`](./modules/)

| Integration | Description | Status |
|-------------|-------------|--------|
| Cornix API | Signal copying platform | ✅ |
| TradingView Webhook | Alert integration | ✅ |
| Telegram Bot | Bot notifications | ✅ |
| WolfBot | External bot integration | ✅ |
| Zenbot | Strategy framework | ✅ |
| Jesse | Backtesting framework | ✅ |

---

## 🔐 Security Documentation

**Location:** [`security/`](./security/)

| Document | Description |
|----------|-------------|
| API Key Security | Encryption, storage |
| 2FA Setup | Two-factor authentication |
| Rate Limiting | API protection |
| Audit Logging | Activity tracking |

---

## 🔗 Quick Links

### For Developers
- [Backend API Reference](./backend/BACKEND_API_REFERENCE.md)
- [Component Documentation](./components/README.md)
- [Knowledge Base](./kb/README.md)

### For Traders
- [Bot Documentation](./bots/)
- [Trading Strategies](./trading/)
- [Risk Management](./risk-management/)

### For DevOps
- [Deployment Guide](./deployment/)
- [Microservices](./microservices/)
- [Monitoring Setup](./monitoring/)

---

## 📁 Directory Structure

```
docs/
├── architecture/      # Architecture decisions (ADRs)
├── backend/          # Backend API documentation
├── bots/             # Trading bot documentation
├── components/       # UI component documentation
├── deployment/       # Deployment guides
├── exchanges/        # Exchange integration docs
├── hooks/           # React hooks documentation
├── indicators/       # Technical indicators
├── integrations/     # Third-party integrations
├── kb/              # Knowledge Base (3,667 files)
│   ├── binance/     # Binance API docs (276)
│   ├── okx/         # OKX API docs (567)
│   ├── tradingview/ # TradingView docs (2,980)
│   ├── pine-script/ # Pine Script docs (72)
│   ├── cornix/      # Cornix docs (245)
│   └── ...
├── microservices/    # Microservice documentation
├── ml/              # ML/AI documentation
├── modules/         # Module documentation
├── security/        # Security documentation
├── trading/         # Trading documentation
└── ui/              # UI/UX documentation
```

---

*CITARION Algorithmic Trading Platform Documentation*  
*Last Updated: March 2026*
