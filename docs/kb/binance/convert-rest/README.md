# Binance Convert REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 9

---

## Trade

### Accept Quote (TRADE)

`POST` `{{url}}/sapi/v1/convert/acceptQuote`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `quoteId` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Send Quote Request(USER_DATA)

`POST` `{{url}}/sapi/v1/convert/getQuote`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fromAsset` | string | No | - |
| `toAsset` | string | No | - |
| `fromAmount` | string | No | When specified, it is the amount you will be debited after the conversion |
| `toAmount` | string | No | When specified, it is the amount you will be credited after the conversion |
| `walletType` | string | Yes | It is to choose which wallet of assets. The wallet selection is `SPOT`, `FUNDING` and `EARN`. Combination of wallet is supported i.e. `SPOT_FUNDING`, `FUNDING_EARN`, `SPOT_FUNDING_EARN` or `SPOT_EARN`  Default is `SPOT`. |
| `validTime` | string | No | 10s, 30s, 1m, default 10s |
| `recvWindow` | string | No | The value cannot be greater than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel limit order (USER_DATA)

`POST` `{{url}}/sapi/v1/convert/limit/cancelOrder`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderId` | string | No | The orderId from `placeOrder` api |
| `recvWindow` | string | No | The value cannot be greater than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Place limit order (USER_DATA)

`POST` `{{url}}/sapi/v1/convert/limit/placeOrder`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `baseAsset` | string | No | base asset (use the response `fromIsBase` from `GET /sapi/v1/convert/exchangeInfo` api to check which one is baseAsset ) |
| `quoteAsset` | string | No | quote asset |
| `limitPrice` | string | No | Symbol limit price (from baseAsset to quoteAsset) |
| `baseAmount` | string | No | Base asset amount.  (One of `baseAmount` or `quoteAmount` is required) |
| `quoteAmount` | string | No | Quote asset amount.  (One of `baseAmount` or `quoteAmount` is required) |
| `side` | string | No | `BUY` or `SELL` |
| `walletType` | string | Yes | It is to choose which wallet of assets. The wallet selection is `SPOT`, `FUNDING` and `EARN`. Combination of wallet is supported i.e. `SPOT_FUNDING`, `FUNDING_EARN`, `SPOT_FUNDING_EARN` or `SPOT_EARN`  Default is `SPOT`. |
| `expiredType` | string | No | 1_D, 3_D, 7_D, 30_D  (D means day) |
| `recvWindow` | string | No | The value cannot be greater than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query limit open orders (USER_DATA)

`GET` `{{url}}/sapi/v1/convert/limit/queryOpenOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | The value cannot be greater than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Order status(USER_DATA)

`GET` `{{url}}/sapi/v1/convert/orderStatus`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderId` | string | No | Either orderId or quoteId is required |
| `quoteId` | string | No | Either orderId or quoteId is required |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Convert Trade History(USER_DATA)

`GET` `{{url}}/sapi/v1/convert/tradeFlow`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 100, Max 1000 |
| `recvWindow` | string | No | The value cannot be greater than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Market-Data

### Query order quantity precision per asset(USER_DATA)

`GET` `{{url}}/sapi/v1/convert/assetInfo`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | The value cannot be greater than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### List All Convert Pairs

`GET` `{{url}}/sapi/v1/convert/exchangeInfo`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fromAsset` | string | No | User spends coin |
| `toAsset` | string | No | User receives coin |

**Request Body:**

---

