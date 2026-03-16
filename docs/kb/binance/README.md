# Binance API Documentation

> **Source:** https://developers.binance.com/docs/

Comprehensive Binance API documentation for AI agent reference. This documentation covers all major Binance trading APIs and services.

## 📊 Statistics

- **Total Files:** 370+
- **Markdown Files:** 138+
- **Postman Collections:** 25 APIs
- **Swagger Specs:** Spot API
- **Last Updated:** March 2025

---

## 📂 Complete API Reference

### Trading APIs

| API | Endpoints | Description | Documentation |
|-----|-----------|-------------|---------------|
| **Spot API** | 44+ | Spot trading REST API, WebSocket streams | [spot/](./spot/) • [spot-rest/](./spot-rest/) |
| **Margin Trading** | 61+ | Margin trading endpoints | [margin/](./margin/) • [margin-rest/](./margin-rest/) |

### Derivatives APIs

| API | Endpoints | Description | Documentation |
|-----|-----------|-------------|---------------|
| **USDS Futures** | 95+ | USDT-Margined Futures | [binance-futures-api/](./binance-futures-api/) • [derivatives-usds-futures-rest/](./derivatives-usds-futures-rest/) |
| **COIN Futures** | 65+ | Coin-Margined Futures | [derivatives/coin-futures/](./derivatives/coin-futures/) • [derivatives-coin-futures-rest/](./derivatives-coin-futures-rest/) |
| **Options** | 43+ | European Options Trading | [binance-options-api/](./binance-options-api/) • [derivatives-options-rest/](./derivatives-options-rest/) |
| **Portfolio Margin** | 102+ | Portfolio Margin Trading | [derivatives-portfolio-margin-rest/](./derivatives-portfolio-margin-rest/) |
| **Portfolio Margin Pro** | 21+ | Professional Portfolio Margin | [derivatives-portfolio-margin-pro-rest/](./derivatives-portfolio-margin-pro-rest/) |

### Financial Services APIs

| API | Endpoints | Description | Documentation |
|-----|-----------|-------------|---------------|
| **Simple Earn** | 40+ | Staking and Savings Products | [simple-earn/](./simple-earn/) • [simple-earn-rest/](./simple-earn-rest/) |
| **Staking** | 37+ | On-chain Staking | [staking-rest/](./staking-rest/) |
| **Crypto Loan** | 17+ | Crypto-backed Loans | [crypto-loan/](./crypto-loan/) • [crypto-loan-rest/](./crypto-loan-rest/) |
| **VIP Loan** | 11+ | VIP Loan Services | [vip-loan-rest/](./vip-loan-rest/) |
| **Dual Investment** | 5+ | Dual Investment Products | [dual-investment-rest/](./dual-investment-rest/) |

### Payment & Conversion APIs

| API | Endpoints | Description | Documentation |
|-----|-----------|-------------|---------------|
| **Pay API** | 1+ | Binance Pay Integration | [pay-api/](./pay-api/) • [pay-rest/](./pay-rest/) |
| **Convert API** | 9+ | Convert/Cryptocurrency Exchange | [convert-rest/](./convert-rest/) |
| **Fiat API** | 5+ | Fiat Deposit/Withdrawal | [fiat-rest/](./fiat-rest/) |
| **Gift Card** | 6+ | Binance Gift Card | [gift-card-rest/](./gift-card-rest/) |
| **Rebate API** | 1+ | Commission Rebate | [rebate-rest/](./rebate-rest/) |

### Account & Sub-Account APIs

| API | Endpoints | Description | Documentation |
|-----|-----------|-------------|---------------|
| **Sub Account** | 45+ | Sub-account Management | [sub-account/](./sub-account/) • [sub-account-rest/](./sub-account-rest/) |
| **Wallet API** | 47+ | Wallet Operations | [wallet-rest/](./wallet-rest/) |

### Other Services APIs

| API | Endpoints | Description | Documentation |
|-----|-----------|-------------|---------------|
| **Algo API** | 11+ | Algorithmic Trading | [algo-rest/](./algo-rest/) |
| **Alpha API** | 5+ | Alpha Trading Strategies | [alpha-rest/](./alpha-rest/) |
| **C2C API** | 1+ | Peer-to-Peer Trading | [c2c-rest/](./c2c-rest/) |
| **Copy Trading** | 2+ | Copy Trading Services | [copy-rest/](./copy-rest/) |
| **Mining API** | 13+ | Binance Pool Mining | [mining-rest/](./mining-rest/) |
| **NFT API** | 4+ | NFT Marketplace | [nft-rest/](./nft-rest/) |

### Authentication & Authorization

| Section | Description |
|---------|-------------|
| [Login/OAuth](./login/) | OAuth 2.0 Authentication Flows |
| [OAuth Integration](./oauth/) | OAuth Integration Details |
| [Binance Open API](./binance-open-api/) | Open API Scopes |

### Reference Documentation

| Section | Description |
|---------|-------------|
| [FAQs](./faqs/) | Frequently Asked Questions |
| [Demo Mode](./demo-mode/) | Demo Trading Environment |
| [FIX API](./fix-api/) | FIX Protocol Documentation |
| [WebSocket](./websocket/) | WebSocket Market Streams |
| [REST API General](./rest-api/) | General REST API Info |
| [SBE Encoding](./sbe/) | Simple Binary Encoding |

### Resources

| Resource | Description |
|----------|-------------|
| [Postman Collections](./postman-collections/) | All API Postman Collections (25 APIs) |
| [Swagger Specs](./swagger-specs/) | OpenAPI/Swagger Specifications |
| [Python SDK - Futures](./futures/python-sdk/) | Official Python SDK for Futures |

---

## 🔑 API Endpoints

### Base URLs

```
Spot:           https://api.binance.com
Spot Testnet:   https://testnet.binance.vision
Futures USDT:   https://fapi.binance.com
Futures Coin:   https://dapi.binance.com
Options:        https://eapi.binance.com
Portfolio:      https://papi.binance.com
```

### Authentication

All private endpoints require API key authentication with HMAC SHA256, RSA, or Ed25519 signatures.

**Example - HMAC Signature (Bash):**
```bash
apiKey="your_api_key"
secretKey="your_secret_key"
timestamp=$(date +%s000)
query="symbol=BTCUSDT&side=BUY&type=LIMIT&quantity=1&price=50000&timestamp=$timestamp"
signature=$(echo -n "$query" | openssl dgst -sha256 -hmac "$secretKey" | awk '{print $2}')
curl -H "X-MBX-APIKEY: $apiKey" "https://api.binance.com/api/v3/order?$query&signature=$signature"
```

**Example - Python:**
```python
import hmac
import hashlib
import requests
from urllib.parse import urlencode

API_KEY = 'your_api_key'
API_SECRET = 'your_secret_key'

def sign(params):
    query = urlencode(params)
    signature = hmac.new(
        API_SECRET.encode(),
        query.encode(),
        hashlib.sha256
    ).hexdigest()
    return query + '&signature=' + signature

params = {
    'symbol': 'BTCUSDT',
    'side': 'BUY',
    'type': 'LIMIT',
    'quantity': 0.001,
    'price': 50000,
    'timestamp': int(time.time() * 1000)
}

headers = {'X-MBX-APIKEY': API_KEY}
response = requests.post(
    f'https://api.binance.com/api/v3/order?{sign(params)}',
    headers=headers
)
```

---

## 📡 WebSocket Streams

### Public Streams
```
wss://stream.binance.com:9443/ws/<streamName>
wss://stream.binance.com:9443/stream?streams=<streamName1>/<streamName2>
```

### Stream Types
- `<symbol>@ticker` - 24hr ticker
- `<symbol>@kline_<interval>` - Kline/candlestick
- `<symbol>@depth` - Order book depth
- `<symbol>@trade` - Trade stream
- `<symbol>@aggTrade` - Aggregate trade stream

### User Data Stream
```javascript
// Subscribe to user data
const ws = new WebSocket('wss://stream.binance.com:9443/ws/<listenKey>');
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};
```

---

## ⚡ Rate Limits

| Type | Limit | Window |
|------|-------|--------|
| IP Requests | 6,000 | 1 minute |
| Order Rate | 50-300 | 10 seconds |
| Orders | 200,000 | 1 day |

---

## 🚨 Common Error Codes

| Code | Message | Description |
|------|---------|-------------|
| -1000 | UNKNOWN | Unknown error |
| -1001 | DISCONNECTED | Internal error |
| -1002 | UNAUTHORIZED | Invalid API key |
| -1003 | TOO_MANY_REQUESTS | Rate limit exceeded |
| -1013 | INVALID_MESSAGE | Invalid quantity/price |
| -1015 | TOO_MANY_REQUESTS | Too much request weight |
| -1021 | INVALID_TIMESTAMP | Timestamp outside recvWindow |
| -1022 | INVALID_SIGNATURE | Invalid signature |
| -2010 | NEW_ORDER_REJECTED | Order rejected |
| -2013 | NO_SUCH_ORDER | Order does not exist |

---

## 🔗 Official Resources

- [Binance API Announcements](https://t.me/binance_api_announcements)
- [Binance API Telegram](https://t.me/binance_api_english)
- [Spot Testnet](https://testnet.binance.vision/)
- [Futures Testnet](https://testnet.binancefuture.com/)

## 📝 Official SDKs & Connectors

- [Python](https://github.com/binance/binance-connector-python)
- [Node.js](https://github.com/binance/binance-connector-js)
- [Java](https://github.com/binance/binance-connector-java)
- [C#](https://github.com/binance/binance-connector-dotnet)
- [Go](https://github.com/binance/binance-connector-go)
- [PHP](https://github.com/binance/binance-connector-php)
- [Ruby](https://github.com/binance/binance-connector-ruby)
- [Rust](https://github.com/binance/binance-spot-connector-rust)
- [TypeScript](https://github.com/binance/binance-connector-typescript)

---

*Documentation compiled from Binance official sources for AI agent reference*
*Sources: https://developers.binance.com, https://github.com/binance*
