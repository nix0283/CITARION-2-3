# 📚 Knowledge Base

External documentation from trading platforms, exchanges, and charting libraries.

**Total Files:** 3,667 markdown documents

---

## 📊 Statistics

### Exchange APIs

| Knowledge Base | Files | Source |
|----------------|-------|--------|
| **Binance API** | 276 | [binance-docs](https://binance-docs.github.io/apidocs/) |
| **OKX API** | 13 | [okx.com](https://www.okx.com/docs-v5/) |
| **Bybit API** | 1 | [bybit-exchange](https://bybit-exchange.github.io/docs/) |
| **Bitget API** | 1 | [bitget.com](https://www.bitget.com/api-doc/) |
| **BingX API** | 2 | [bingx-api](https://bingx-api.github.io/docs-v3/) |

### Trading Platforms

| Knowledge Base | Files | Source |
|----------------|-------|--------|
| **TradingView** | 2,980 | [tradingview.com](https://www.tradingview.com/) |
| **Pine Script** | 72 | [pine-script-docs](https://www.tradingview.com/pine-script-docs/) |
| **Lightweight Charts** | 76 | [lightweight-charts](https://tradingview.github.io/lightweight-charts/) |

### Trading Bots & Services

| Knowledge Base | Files | Source |
|----------------|-------|--------|
| **Cornix** | 245 | [cornix.io](https://cornix.io/) |

---

## 📁 Directory Structure

```
kb/
├── binance/              # Binance Exchange API (276 files)
│   ├── spot/            # Spot trading API
│   ├── futures/         # USDT-M & Coin-M futures
│   ├── options/         # European options
│   ├── margin/          # Margin trading
│   ├── python/          # Python SDK
│   ├── authentication.md    # Auth guide
│   ├── error-codes.md       # Error reference
│   ├── response-logging.md  # Logging guide
│   ├── trading.md           # Trading operations
│   └── websocket-streams.md # WebSocket docs
│
├── okx/                  # OKX Exchange API (13 files)
│   ├── README.md        # API Overview
│   ├── en.md            # Full API Documentation
│   ├── log.md           # API Change Log
│   ├── trick.md         # Best Practices & Tips
│   ├── broker.md        # Broker Program API
│   ├── agent.md         # Agent Program API
│   └── repos/           # SDK repositories
│
├── bybit/                # Bybit Exchange API (1 file)
│   └── README.md        # Complete API Reference
│
├── bitget/               # Bitget Exchange API (1 file)
│   └── README.md        # Complete API Reference
│
├── bingx/                # BingX Exchange API (2 files)
│   ├── README.md        # API Reference
│   └── SDK_WRAPPER.md   # TypeScript SDK Implementation
│
├── tradingview/          # TradingView Platform (2,980 files)
│   ├── Widgets/         # All widgets
│   ├── chart/           # Chart features
│   ├── indicators/      # Built-in indicators
│   ├── trading/         # Trading features
│   ├── screener/        # Screener tools
│   └── financials/      # Financial data
│
├── pine-script/          # Pine Script Language (72 files)
│   ├── Language/        # Syntax & types
│   ├── Concepts/        # Core concepts
│   ├── Writing/         # Script guides
│   ├── Visuals/         # Visual elements
│   ├── Errors/          # Error reference
│   ├── Migration/       # Version migration guides
│   └── FAQ/             # Frequently asked questions
│
├── lightweight-charts/   # Lightweight Charts (76 files)
│   ├── docs/            # API docs
│   └── tutorials/       # Tutorials
│
└── cornix/               # Cornix Bot Platform (245 files)
    ├── getting-started/ # Account setup, API keys
    ├── trading-bots/    # Signals bot, Grid bot, DCA bot
    ├── trading-configurations/ # All trading settings
    ├── channel-admins/  # Channel management
    ├── errors-notifications/ # Error messages
    ├── account-subscription/ # Plans & billing
    ├── marketplace/     # Marketplace features
    ├── backtesting/     # Backtesting docs
    ├── demo-accounts/   # Demo trading
    ├── trading-functionalities/ # Manual trading
    ├── faqs-more/       # FAQs and guides
    ├── affiliation-program/ # Affiliate program
    │
    └── Examples/        # Signal examples (8 .md files)
        ├── Cornix_bot_control_telegram-example.md
        ├── Cornix_notifications-example.md
        ├── Cornix_trading_channel-example1.md
        ├── Cornix_trading_channel-example2.md
        ├── Cornix_trading_channel-example3.md
        ├── Cornix_trading_channel-example4.md
        ├── Cornix_trading_channel-example5.md
        └── Cornix_trading_channel-example6.md
```

---

## 🔸 Exchange APIs

### Binance API

**Location:** [`binance/`](./binance/)

Complete Binance API documentation including Spot, Futures, Options, Margin, and SDKs.

**Key Endpoints:**
```
Spot:        https://api.binance.com
Futures USDT: https://fapi.binance.com
Futures Coin: https://dapi.binance.com
Options:     https://eapi.binance.com
WebSocket:   wss://stream.binance.com:9443/ws
```

### OKX API

**Location:** [`okx/`](./okx/)

Comprehensive OKX documentation with SDKs and implementation guides.

**Key Endpoints:**
```
REST:        https://www.okx.com
WebSocket:   wss://ws.okx.com:8443/ws/v5/public
```

### Bybit API

**Location:** [`bybit/`](./bybit/)

Complete V5 API reference with all product lines unified.

**Key Endpoints:**
```
Mainnet:     https://api.bybit.com
Testnet:     https://api-testnet.bybit.com
WebSocket:   wss://stream.bybit.com/v5/public/linear
```

### Bitget API

**Location:** [`bitget/`](./bitget/)

V2 API documentation for Spot and Futures trading.

**Key Endpoints:**
```
REST:        https://api.bitget.com
WebSocket:   wss://ws.bitget.com/v2/ws/public
```

### BingX API

**Location:** [`bingx/`](./bingx/)

API documentation with TypeScript SDK wrapper implementation.

**Key Endpoints:**
```
REST:        https://open-api.bingx.com
WebSocket:   wss://open-api-swap.bingx.com/openapi/swap/v2/ws
```

---

## 🔸 Trading Platforms

### TradingView

**Location:** [`tradingview/`](./tradingview/)

Complete TradingView platform documentation.

### Pine Script

**Location:** [`pine-script/`](./pine-script/)

Pine Script v5/v6 programming language reference.

### Lightweight Charts

**Location:** [`lightweight-charts/`](./lightweight-charts/)

TradingView's open-source charting library.

**GitHub:** https://github.com/tradingview/lightweight-charts

---

## 🔸 Trading Bots & Services

### Cornix

**Location:** [`cornix/`](./cornix/)

Cornix trading bot platform documentation.

**Sections:**
- `getting-started/` - Account creation, API keys
- `trading-bots/` - Signals Bot, Grid Bot, DCA Bot
- `trading-configurations/` - Trading settings
- `channel-admins/` - Signal channel management
- `errors-notifications/` - Error codes
- `account-subscription/` - Plans and billing
- `marketplace/` - Marketplace features
- `demo-accounts/` - Demo trading
- `trading-functionalities/` - Manual trading
- `faqs-more/` - FAQs and guides

**Examples (Telegram exports):**
- `Cornix_bot_control_telegram-example.md` - Bot control commands
- `Cornix_notifications-example.md` - Notification formats
- `Cornix_trading_channel-example1-6.md` - Signal formats

---

## 📖 Usage

This Knowledge Base is used for:

1. **AI-Assisted Development** - Reference for building trading features
2. **API Integration** - Exchange and platform integration
3. **Indicator Development** - Technical indicator implementations
4. **Signal Processing** - Signal format parsing and validation
5. **SDK Development** - Building wrappers for exchange APIs

---

## 🔗 External Links

### Exchanges
- [Binance API Docs](https://binance-docs.github.io/apidocs/)
- [OKX API Docs](https://www.okx.com/docs-v5/)
- [Bybit API Docs](https://bybit-exchange.github.io/docs/)
- [Bitget API Docs](https://www.bitget.com/api-doc/)
- [BingX API Docs](https://bingx-api.github.io/docs-v3/)

### Trading Platforms
- [TradingView](https://www.tradingview.com/)
- [Pine Script Reference](https://www.tradingview.com/pine-script-docs/)
- [Lightweight Charts](https://tradingview.github.io/lightweight-charts/)

### Trading Bots
- [Cornix](https://cornix.io/)

---

*Knowledge Base for CITARION Algorithmic Trading Platform*
*Last Updated: March 2026*
