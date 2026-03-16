# Binance Alpha REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 5

---

## Market-Data

### Aggregated Trades

`GET` `{{url}}/bapi/defi/v1/public/alpha-trade/agg-trades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | e.g., "ALPHA_175USDT" – use token ID from Token List |
| `fromId` | string | No | starting trade ID to fetch from |
| `startTime` | string | No | start timestamp (milliseconds) |
| `endTime` | string | No | end timestamp (milliseconds) |
| `limit` | string | No | number of results to return (default 500, max 1000) |

**Request Body:**

---

### Get Exchange Info

`GET` `{{url}}/bapi/defi/v1/public/alpha-trade/get-exchange-info`

**Request Body:**

---

### Klines (Candlestick Data)

`GET` `{{url}}/bapi/defi/v1/public/alpha-trade/klines`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | e.g., "ALPHA_175USDT" – use token ID from Token List |
| `interval` | string | No | e.g., "1h" – supported intervals: 1s, 15s, 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M |
| `limit` | string | No | number of results to return (default 500, max 1000) |
| `startTime` | string | No | start timestamp (milliseconds) |
| `endTime` | string | No | end timestamp (milliseconds) |

**Request Body:**

---

### Ticker (24hr Price Statistics)

`GET` `{{url}}/bapi/defi/v1/public/alpha-trade/ticker`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | e.g., "ALPHA_175USDT" – use token ID from Token List |

**Request Body:**

---

### Token List

`GET` `{{url}}/bapi/defi/v1/public/wallet-direct/buw/wallet/cex/alpha/all/token/list`

**Request Body:**

---

