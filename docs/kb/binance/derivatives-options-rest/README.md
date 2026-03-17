# Binance Derivatives Trading Options REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 43

---

## Account

### Account Funding Flow (USER_DATA)

`GET` `{{url}}/eapi/v1/bill`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `currency` | string | No | Asset type, only support USDT  as of now |
| `recordId` | string | No | Return the recordId and subsequent data, the latest data is returned by default, e.g 100000 |
| `startTime` | string | No | Start Time, e.g 1593511200000 |
| `endTime` | string | No | End Time, e.g 1593512200000 |
| `limit` | string | No | Number of result sets returned Default:100 Max:1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Option Margin Account Information (USER_DATA)

`GET` `{{url}}/eapi/v1/marginAccount`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Trade

### Cancel all Option orders on specific symbol (TRADE)

`DELETE` `{{url}}/eapi/v1/allOpenOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Option trading pair, e.g BTC-200730-9000-C |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel All Option Orders By Underlying (TRADE)

`DELETE` `{{url}}/eapi/v1/allOpenOrdersByUnderlying`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `underlying` | string | No | Option underlying, e.g BTCUSDT |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel Multiple Option Orders (TRADE)

`DELETE` `{{url}}/eapi/v1/batchOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Option trading pair, e.g BTC-200730-9000-C |
| `orderIds` | string | Yes | Order ID, e.g [4611875134427365377,4611875134427365378] |
| `clientOrderIds` | string | Yes | User-defined order ID, e.g ["my_id_1","my_id_2"] |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Place Multiple Orders(TRADE)

`POST` `{{url}}/eapi/v1/batchOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orders` | string | Yes | order list. Max 10 orders |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### User Commission (USER_DATA)

`GET` `{{url}}/eapi/v1/commission`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### User Exercise Record (USER_DATA)

`GET` `{{url}}/eapi/v1/exerciseRecord`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Option trading pair, e.g BTC-200730-9000-C |
| `startTime` | string | No | Start Time, e.g 1593511200000 |
| `endTime` | string | No | End Time, e.g 1593512200000 |
| `limit` | string | No | Number of result sets returned Default:100 Max:1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Option Order History (TRADE)

`GET` `{{url}}/eapi/v1/historyOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Option trading pair, e.g BTC-200730-9000-C |
| `orderId` | string | No | Order ID, e.g 4611875134427365377 |
| `startTime` | string | No | Start Time, e.g 1593511200000 |
| `endTime` | string | No | End Time, e.g 1593512200000 |
| `limit` | string | No | Number of result sets returned Default:100 Max:1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Current Open Option Orders (USER_DATA)

`GET` `{{url}}/eapi/v1/openOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Option trading pair, e.g BTC-200730-9000-C |
| `orderId` | string | No | Order ID, e.g 4611875134427365377 |
| `startTime` | string | No | Start Time, e.g 1593511200000 |
| `endTime` | string | No | End Time, e.g 1593512200000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel Option Order (TRADE)

`DELETE` `{{url}}/eapi/v1/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Option trading pair, e.g BTC-200730-9000-C |
| `orderId` | string | No | Order ID, e.g 4611875134427365377 |
| `clientOrderId` | string | No | User-defined order ID, e.g 10000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### New Order (TRADE)

`POST` `{{url}}/eapi/v1/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Option trading pair, e.g BTC-200730-9000-C |
| `side` | string | No | Buy/sell direction: SELL, BUY |
| `type` | string | No | Order Type: LIMIT(only support limit) |
| `quantity` | string | No | Order Quantity |
| `price` | string | No | Order Price |
| `timeInForce` | string | No | Time in force method（Default GTC） |
| `reduceOnly` | string | No | Reduce Only（Default false） |
| `postOnly` | string | No | Post Only（Default false） |
| `newOrderRespType` | string | No | "ACK", "RESULT", Default "ACK" |
| `clientOrderId` | string | No | User-defined order ID, e.g 10000 |
| `isMmp` | string | No | is market maker protection order, true/false |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Single Order (TRADE)

`GET` `{{url}}/eapi/v1/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Option trading pair, e.g BTC-200730-9000-C |
| `orderId` | string | No | Order ID, e.g 4611875134427365377 |
| `clientOrderId` | string | No | User-defined order ID, e.g 10000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Option Position Information (USER_DATA)

`GET` `{{url}}/eapi/v1/position`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Option trading pair, e.g BTC-200730-9000-C |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Account Trade List (USER_DATA)

`GET` `{{url}}/eapi/v1/userTrades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Option trading pair, e.g BTC-200730-9000-C |
| `fromId` | string | No | Trade id to fetch from. Default gets most recent trades, e.g 4611875134427365376 |
| `startTime` | string | No | Start Time, e.g 1593511200000 |
| `endTime` | string | No | End Time, e.g 1593512200000 |
| `limit` | string | No | Number of result sets returned Default:100 Max:1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Market-Maker-Endpoints

### Get Auto-Cancel All Open Orders (Kill-Switch) Config (TRADE)

`GET` `{{url}}/eapi/v1/countdownCancelAll`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `underlying` | string | No | underlying, e.g BTCUSDT |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Set Auto-Cancel All Open Orders (Kill-Switch) Config (TRADE)

`POST` `{{url}}/eapi/v1/countdownCancelAll`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `underlying` | string | No | Option underlying, e.g BTCUSDT |
| `countdownTime` | string | No | Countdown time in milliseconds (ex. 1,000 for 1 second). 0 to disable the timer. Negative values (ex. -10000) are not accepted. Minimum acceptable value is 5,000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Auto-Cancel All Open Orders (Kill-Switch) Heartbeat (TRADE)

`POST` `{{url}}/eapi/v1/countdownCancelAllHeartBeat`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `underlyings` | string | No | Option Underlying Symbols, e.g BTCUSDT,ETHUSDT |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Market Maker Protection Config (TRADE)

`GET` `{{url}}/eapi/v1/mmp`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `underlying` | string | No | underlying, e.g BTCUSDT |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Reset Market Maker Protection Config (TRADE)

`POST` `{{url}}/eapi/v1/mmpReset`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `underlying` | string | No | underlying, e.g BTCUSDT |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Set Market Maker Protection Config (TRADE)

`POST` `{{url}}/eapi/v1/mmpSet`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `underlying` | string | No | underlying, e.g BTCUSDT |
| `windowTimeInMilliseconds` | string | No | MMP Interval in milliseconds; Range (0,5000] |
| `frozenTimeInMilliseconds` | string | No | MMP frozen time in milliseconds, if set to 0 manual reset is required |
| `qtyLimit` | string | No | quantity limit |
| `deltaLimit` | string | No | net delta limit |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Market-Maker-Block-Trade

### Cancel Block Trade Order (TRADE)

`DELETE` `{{url}}/eapi/v1/block/order/create`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `blockOrderMatchingKey` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Extend Block Trade Order (TRADE)

`PUT` `{{url}}/eapi/v1/block/order/create`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `blockOrderMatchingKey` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### New Block Trade Order (TRADE)

`POST` `{{url}}/eapi/v1/block/order/create`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `liquidity` | string | No | Taker or Maker |
| `legs` | string | Yes | Max 1 (only single leg supported), list of legs parameters in JSON; example: eapi/v1/block/order/create?orders=[{"symbol":"BTC-210115-35000-C", "price":"100","quantity":"0.0002","side":"BUY","type":"LIMIT"}] |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Accept Block Trade Order (TRADE)

`POST` `{{url}}/eapi/v1/block/order/execute`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `blockOrderMatchingKey` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Block Trade Details (USER_DATA)

`GET` `{{url}}/eapi/v1/block/order/execute`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `blockOrderMatchingKey` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Block Trade Order (TRADE)

`GET` `{{url}}/eapi/v1/block/order/orders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `blockOrderMatchingKey` | string | No | If specified, returns the specific block trade associated with the blockOrderMatchingKey |
| `endTime` | string | No | End Time, e.g 1593512200000 |
| `startTime` | string | No | Start Time, e.g 1593511200000 |
| `underlying` | string | No | underlying, e.g BTCUSDT |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Account Block Trade List (USER_DATA)

`GET` `{{url}}/eapi/v1/block/user-trades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `endTime` | string | No | End Time, e.g 1593512200000 |
| `startTime` | string | No | Start Time, e.g 1593511200000 |
| `underlying` | string | No | underlying, e.g BTCUSDT |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## User-Data-Streams

### Close User Data Stream (USER_STREAM)

`DELETE` `{{url}}/eapi/v1/listenKey`

**Request Body:**

---

### Keepalive User Data Stream (USER_STREAM)

`PUT` `{{url}}/eapi/v1/listenKey`

**Request Body:**

---

### Start User Data Stream (USER_STREAM)

`POST` `{{url}}/eapi/v1/listenKey`

**Request Body:**

---

## Market-Data

### Recent Block Trades List

`GET` `{{url}}/eapi/v1/blockTrades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Option trading pair, e.g BTC-200730-9000-C |
| `limit` | string | No | Number of result sets returned Default:100 Max:1000 |

**Request Body:**

---

### Order Book

`GET` `{{url}}/eapi/v1/depth`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Option trading pair, e.g BTC-200730-9000-C |
| `limit` | string | No | Number of result sets returned Default:100 Max:1000 |

**Request Body:**

---

### Exchange Information

`GET` `{{url}}/eapi/v1/exchangeInfo`

**Request Body:**

---

### Historical Exercise Records

`GET` `{{url}}/eapi/v1/exerciseHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `underlying` | string | No | underlying, e.g BTCUSDT |
| `startTime` | string | No | Start Time, e.g 1593511200000 |
| `endTime` | string | No | End Time, e.g 1593512200000 |
| `limit` | string | No | Number of result sets returned Default:100 Max:1000 |

**Request Body:**

---

### Index Price

`GET` `{{url}}/eapi/v1/index`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `underlying` | string | No | Option underlying, e.g BTCUSDT |

**Request Body:**

---

### Kline/Candlestick Data

`GET` `{{url}}/eapi/v1/klines`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Option trading pair, e.g BTC-200730-9000-C |
| `interval` | string | No | Time interval |
| `startTime` | string | No | Start Time, e.g 1593511200000 |
| `endTime` | string | No | End Time, e.g 1593512200000 |
| `limit` | string | No | Number of result sets returned Default:100 Max:1000 |

**Request Body:**

---

### Option Mark Price

`GET` `{{url}}/eapi/v1/mark`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Option trading pair, e.g BTC-200730-9000-C |

**Request Body:**

---

### Open Interest

`GET` `{{url}}/eapi/v1/openInterest`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `underlyingAsset` | string | No | underlying asset, e.g ETH/BTC |
| `expiration` | string | No | expiration date, e.g 221225 |

**Request Body:**

---

### Test Connectivity

`GET` `{{url}}/eapi/v1/ping`

**Request Body:**

---

### 24hr Ticker Price Change Statistics

`GET` `{{url}}/eapi/v1/ticker`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Option trading pair, e.g BTC-200730-9000-C |

**Request Body:**

---

### Check Server Time

`GET` `{{url}}/eapi/v1/time`

**Request Body:**

---

### Recent Trades List

`GET` `{{url}}/eapi/v1/trades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Option trading pair, e.g BTC-200730-9000-C |
| `limit` | string | No | Number of result sets returned Default:100 Max:1000 |

**Request Body:**

---

