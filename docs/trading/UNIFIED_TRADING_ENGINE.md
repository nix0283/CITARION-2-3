# Unified Trading Engine

> Single trading engine for all modes: LIVE, DEMO, TESTNET, PAPER

## Overview

The Unified Trading Engine is the central trading system for the entire CITARION platform. It provides a single, consistent interface for all trading operations across different modes and sources.

### Key Features

- **Multi-Mode Support**: LIVE, DEMO, TESTNET, PAPER
- **Multi-Source**: Built-in Chat, Telegram Bot, Manual Trading, Auto Trading
- **Cornix Signal Format**: Full support for Cornix signal parsing
- **Signal Filtering**: Configurable validation and scoring
- **Smart Order Execution**: Slippage protection, retry logic
- **Position Management**: Real-time monitoring, PnL tracking
- **Trailing Stop**: 5 trailing modes (Breakeven, Moving Target, etc.)
- **Risk Management**: Integrated risk controls

## Trading Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| LIVE | Real trading with real funds | Production trading |
| DEMO | Simulated trading with virtual funds | Learning, testing |
| TESTNET | Exchange testnet with test funds | API testing |
| PAPER | Paper trading (simulation) | Strategy development |

## API Endpoints

### POST /api/trading/unified

Execute a trade from signal.

```json
{
  "signalText": "#BTC/USDT LONG Entry: 67000 TP: 68000 SL: 66000",
  "config": {
    "mode": "DEMO",
    "exchangeId": "binance"
  },
  "source": "CHAT"
}
```

### GET /api/trading/unified

Get open positions.

### POST /api/trading/unified/close

Close position(s).

### PATCH /api/trading/unified/positions

Update position (SL, TP, Trailing).

## Signal Format (Cornix Compatible)

```
#BTC/USDT
LONG
Entry: 67000
TP: 68000, 69000
SL: 66000
Leverage: 10x
```

## Trailing Stop Modes

| Type | Description |
|------|-------------|
| BREAKEVEN | Move SL to entry after trigger |
| MOVING_TARGET | SL follows at 1 TP distance |
| MOVING_2_TARGET | SL follows at 2 TP distance |
| PERCENT_BELOW_TRIGGER | Fixed % below trigger price |
| PERCENT_BELOW_HIGHEST | Dynamic % below highest price |

## Architecture

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐
│    CHAT      │  │   TELEGRAM   │  │   MANUAL     │  │ AUTO TRADE  │
│   Service    │  │   Service    │  │   Trading    │  │   Engine    │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬──────┘
       │                 │                 │                  │
       └─────────────────┴─────────────────┴──────────────────┘
                                │
                                ▼
              ┌─────────────────────────────────┐
              │    UNIFIED TRADING ENGINE       │
              │    /api/trading/unified         │
              └─────────────────────────────────┘
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                 ▼
        ┌──────────┐      ┌──────────┐      ┌──────────┐
        │  LIVE    │      │  DEMO    │      │  PAPER   │
        │ Exchanges│      │ Simulated│      │ Virtual  │
        └──────────┘      └──────────┘      └──────────┘
```

---

*Last updated: March 2026*
