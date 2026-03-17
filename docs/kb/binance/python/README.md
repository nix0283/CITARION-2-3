# Python Binance Library Documentation

> **Source:** https://python-binance.readthedocs.io/en/latest/

Complete documentation for the `python-binance` library - an unofficial Python wrapper for the Binance API.

## 📚 Documentation Contents

| File | Description |
|------|-------------|
| [overview.md](./overview.md) | Getting Started - Installation, Setup, Configuration |
| [constants.md](./constants.md) | Binance Constants - Order types, Time in force, Kline intervals |
| [general.md](./general.md) | General Endpoints - Ping, Time, Exchange Info |
| [market_data.md](./market_data.md) | Market Data - Order book, Trades, Klines, Ticker |
| [account.md](./account.md) | Account Endpoints - Orders, Trades, Balance |
| [sub_accounts.md](./sub_accounts.md) | Sub Account Management |
| [margin.md](./margin.md) | Margin Trading Endpoints |
| [websockets.md](./websockets.md) | WebSocket Streams - Real-time data |
| [depth_cache.md](./depth_cache.md) | Depth Cache - Local order book management |
| [withdraw.md](./withdraw.md) | Withdraw Endpoints |
| [helpers.md](./helpers.md) | Helper Functions |
| [exceptions.md](./exceptions.md) | Exception Handling |
| [faqs.md](./faqs.md) | Frequently Asked Questions |
| [changelog.md](./changelog.md) | Version Changelog |
| [binance.md](./binance.md) | **Full API Reference** (24,000+ lines) |

## 🚀 Quick Start

### Installation

```bash
pip install python-binance
```

### Initialise the Client

```python
from binance.client import Client

api_key = 'your_api_key'
api_secret = 'your_api_secret'

client = Client(api_key, api_secret)
```

### Async Client

```python
import asyncio
from binance import AsyncClient

async def main():
    client = await AsyncClient.create(api_key, api_secret)
    
    # Get exchange info
    info = await client.get_exchange_info()
    print(info)
    
    await client.close_connection()

asyncio.run(main())
```

### Using Testnet

```python
client = Client(api_key, api_secret, testnet=True)
```

## 📖 Common Operations

### Market Data

```python
# Get order book
depth = client.get_order_book(symbol='BTCUSDT')

# Get recent trades
trades = client.get_recent_trades(symbol='BTCUSDT')

# Get klines/candlesticks
candles = client.get_klines(
    symbol='BTCUSDT',
    interval=Client.KLINE_INTERVAL_1HOUR
)

# Get historical klines
klines = client.get_historical_klines(
    "BTCUSDT",
    Client.KLINE_INTERVAL_1MINUTE,
    "1 day ago UTC"
)

# Get 24hr ticker
ticker = client.get_ticker(symbol='BTCUSDT')
```

### Account Operations

```python
# Get account info
info = client.get_account()

# Get asset balance
balance = client.get_asset_balance(asset='BTC')

# Get open orders
orders = client.get_open_orders(symbol='BTCUSDT')

# Place limit order
order = client.create_order(
    symbol='BTCUSDT',
    side='BUY',
    type='LIMIT',
    timeInForce='GTC',
    quantity=0.01,
    price=50000
)

# Place market order
order = client.order_market_buy(symbol='BTCUSDT', quantity=0.01)

# Cancel order
result = client.cancel_order(symbol='BTCUSDT', orderId=12345)
```

### WebSocket Streams

```python
from binance import ThreadedWebsocketManager

def handle_message(msg):
    print(f"Message: {msg}")

twm = ThreadedWebsocketManager(api_key, api_secret)
twm.start()

# Subscribe to kline stream
twm.start_kline_socket(
    callback=handle_message,
    symbol='BTCUSDT'
)

# Subscribe to depth stream
twm.start_depth_socket(
    callback=handle_message,
    symbol='BTCUSDT'
)

twm.join()
```

### Margin Trading

```python
# Get margin account info
info = client.get_margin_account()

# Create margin order
order = client.create_margin_order(
    symbol='BTCUSDT',
    side='BUY',
    type='LIMIT',
    quantity=0.01,
    price=50000
)

# Borrow for margin
transaction = client.create_margin_loan(asset='BTC', amount='1.0')

# Repay margin loan
transaction = client.repay_margin_loan(asset='BTC', amount='1.0')
```

## 🔑 Authentication

The library supports multiple authentication methods:

1. **API Key + Secret** (HMAC)
```python
client = Client(api_key, api_secret)
```

2. **RSA Private Key**
```python
client = Client(api_key, private_key='/path/to/key.pem')
```

3. **Ed25519 Key**
```python
client = Client(api_key, private_key='/path/to/ed25519.pem')
```

## ⚡ Rate Limits

- 1200 request weight per minute
- 10 orders per second
- 100,000 orders per 24 hours

Check current limits:
```python
info = client.get_exchange_info()
print(info['rateLimits'])
```

## 🔧 Error Handling

```python
from binance.exceptions import BinanceAPIException

try:
    order = client.create_order(...)
except BinanceAPIException as e:
    print(f"Error: {e.status_code} - {e.message}")
```

## 📦 Library Structure

```
binance/
├── client.py         # Main Client class
├── async_client.py   # AsyncClient class
├── websocket/        # WebSocket implementations
├── depth_cache.py    # Local depth cache
└── helpers.py        # Utility functions
```

## 🔗 Links

- **PyPI:** https://pypi.org/project/python-binance/
- **GitHub:** https://github.com/sammchardy/python-binance
- **Documentation:** https://python-binance.readthedocs.io/

---

*Documentation scraped from python-binance.readthedocs.io for AI agent reference*
