# Binance Algo REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 11

---

## Future-Algo

### Query Historical Algo Orders(USER_DATA)

`GET` `{{url}}/sapi/v1/algo/futures/historicalOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Trading symbol eg. BTCUSDT |
| `side` | string | No | BUY or SELL |
| `startTime` | string | No | in milliseconds  eg.1641522717552 |
| `endTime` | string | No | in milliseconds  eg.1641522526562 |
| `page` | string | No | Default is 1 |
| `pageSize` | string | No | MIN 1, MAX 100; Default 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Time-Weighted Average Price(Twap) New Order(TRADE)

`POST` `{{url}}/sapi/v1/algo/futures/newOrderTwap`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Trading symbol eg. BTCUSDT |
| `side` | string | No | Trading side ( BUY or SELL ) |
| `positionSide` | string | No | Default `BOTH` for One-way Mode ; `LONG` or `SHORT` for Hedge Mode. It must be sent in Hedge Mode. |
| `quantity` | string | No | Quantity of base asset; Maximum notional per order is 200k, 2mm or 10mm, depending on symbol. Please reduce your size if you order is above the maximum notional per order. |
| `duration` | string | No | Duration for TWAP orders in seconds. [300, 86400] |
| `clientAlgoId` | string | No | A unique id among Algo orders (length should be 32 characters)， If it is not sent, we will give default value |
| `reduceOnly` | string | No | "true" or "false". Default "false"; Cannot be sent in Hedge Mode; Cannot be sent when you open a position |
| `limitPrice` | string | No | Limit price of the order; If it is not sent, will place order by market price by default |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Volume Participation(VP) New Order (TRADE)

`POST` `{{url}}/sapi/v1/algo/futures/newOrderVp`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Trading symbol eg. BTCUSDT |
| `side` | string | No | Trading side ( BUY or SELL ) |
| `positionSide` | string | No | Default `BOTH` for One-way Mode ; `LONG` or `SHORT` for Hedge Mode. It must be sent in Hedge Mode. |
| `quantity` | string | No | Quantity of base asset; Maximum notional per order is 200k, 2mm or 10mm, depending on symbol. Please reduce your size if you order is above the maximum notional per order. |
| `urgency` | string | No | Represent the relative speed of the current execution; ENUM: LOW, MEDIUM, HIGH |
| `clientAlgoId` | string | No | A unique id among Algo orders (length should be 32 characters)， If it is not sent, we will give default value |
| `reduceOnly` | string | No | "true" or "false". Default "false"; Cannot be sent in Hedge Mode; Cannot be sent when you open a position |
| `limitPrice` | string | No | Limit price of the order; If it is not sent, will place order by market price by default |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Current Algo Open Orders(USER_DATA)

`GET` `{{url}}/sapi/v1/algo/futures/openOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel Algo Order(TRADE)

`DELETE` `{{url}}/sapi/v1/algo/futures/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `algoId` | string | No | eg. 14511 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Sub Orders(USER_DATA)

`GET` `{{url}}/sapi/v1/algo/futures/subOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `algoId` | string | No | eg. 14511 |
| `page` | string | No | Default is 1 |
| `pageSize` | string | No | MIN 1, MAX 100; Default 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Spot-Algo

### Query Historical Algo Orders(USER_DATA)

`GET` `{{url}}/sapi/v1/algo/spot/historicalOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Trading symbol eg. BTCUSDT |
| `side` | string | No | BUY or SELL |
| `startTime` | string | No | in milliseconds  eg.1641522717552 |
| `endTime` | string | No | in milliseconds  eg.1641522526562 |
| `page` | string | No | Default is 1 |
| `pageSize` | string | No | MIN 1, MAX 100; Default 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Time-Weighted Average Price(Twap) New Order(TRADE)

`POST` `{{url}}/sapi/v1/algo/spot/newOrderTwap`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Trading symbol eg. BTCUSDT |
| `side` | string | No | Trading side ( BUY or SELL ) |
| `quantity` | string | No | Quantity of base asset; Maximum notional per order is 200k, 2mm or 10mm, depending on symbol. Please reduce your size if you order is above the maximum notional per order. |
| `duration` | string | No | Duration for TWAP orders in seconds. [300, 86400] |
| `clientAlgoId` | string | No | A unique id among Algo orders (length should be 32 characters)， If it is not sent, we will give default value |
| `limitPrice` | string | No | Limit price of the order; If it is not sent, will place order by market price by default |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Current Algo Open Orders(USER_DATA)

`GET` `{{url}}/sapi/v1/algo/spot/openOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel Algo Order(TRADE)

`DELETE` `{{url}}/sapi/v1/algo/spot/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `algoId` | string | No | eg. 14511 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Sub Orders(USER_DATA)

`GET` `{{url}}/sapi/v1/algo/spot/subOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `algoId` | string | No | eg. 14511 |
| `page` | string | No | Default is 1 |
| `pageSize` | string | No | MIN 1, MAX 100; Default 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

