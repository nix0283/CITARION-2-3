# Binance Derivatives Trading COIN Futures REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 65

---

## Account

### Account Information (USER_DATA)

`GET` `{{url}}/dapi/v1/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Futures Account Balance (USER_DATA)

`GET` `{{url}}/dapi/v1/balance`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### User Commission Rate (USER_DATA)

`GET` `{{url}}/dapi/v1/commissionRate`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Income History(USER_DATA)

`GET` `{{url}}/dapi/v1/income`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `incomeType` | string | No | "TRANSFER","WELCOME_BONUS", "FUNDING_FEE", "REALIZED_PNL", "COMMISSION", "INSURANCE_CLEAR", and "DELIVERED_SETTELMENT" |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `page` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Download Id For Futures Transaction History(USER_DATA)

`GET` `{{url}}/dapi/v1/income/asyn`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | Timestamp in ms |
| `endTime` | string | No | Timestamp in ms |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Futures Transaction History Download Link by Id (USER_DATA)

`GET` `{{url}}/dapi/v1/income/asyn/id`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `downloadId` | string | No | get by download id api |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Notional Bracket for Pair(USER_DATA)

`GET` `{{url}}/dapi/v1/leverageBracket`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pair` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Download Id For Futures Order History (USER_DATA)

`GET` `{{url}}/dapi/v1/order/asyn`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | Timestamp in ms |
| `endTime` | string | No | Timestamp in ms |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Futures Order History Download Link by Id (USER_DATA)

`GET` `{{url}}/dapi/v1/order/asyn/id`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `downloadId` | string | No | get by download id api |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Current Position Mode(USER_DATA)

`GET` `{{url}}/dapi/v1/positionSide/dual`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Download Id For Futures Trade History (USER_DATA)

`GET` `{{url}}/dapi/v1/trade/asyn`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | Timestamp in ms |
| `endTime` | string | No | Timestamp in ms |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Futures Trade Download Link by Id(USER_DATA)

`GET` `{{url}}/dapi/v1/trade/asyn/id`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `downloadId` | string | No | get by download id api |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Notional Bracket for Symbol(USER_DATA)

`GET` `{{url}}/dapi/v2/leverageBracket`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Trade

### Position ADL Quantile Estimation(USER_DATA)

`GET` `{{url}}/dapi/v1/adlQuantile`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel All Open Orders(TRADE)

`DELETE` `{{url}}/dapi/v1/allOpenOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### All Orders (USER_DATA)

`GET` `{{url}}/dapi/v1/allOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `pair` | string | No | - |
| `orderId` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel Multiple Orders(TRADE)

`DELETE` `{{url}}/dapi/v1/batchOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderIdList` | string | Yes | max length 10 <br /> e.g. [1234567,2345678] |
| `origClientOrderIdList` | string | Yes | max length 10<br /> e.g. ["my_id_1","my_id_2"], encode the double quotes. No space after comma. |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Modify Multiple Orders(TRADE)

`PUT` `{{url}}/dapi/v1/batchOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `batchOrders` | string | Yes | order list. Max 5 orders |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Place Multiple Orders(TRADE)

`POST` `{{url}}/dapi/v1/batchOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `batchOrders` | string | Yes | order list. Max 5 orders |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Auto-Cancel All Open Orders (TRADE)

`POST` `{{url}}/dapi/v1/countdownCancelAll`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `countdownTime` | string | No | countdown time, 1000 for 1 second. 0 to cancel the timer |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### User's Force Orders(USER_DATA)

`GET` `{{url}}/dapi/v1/forceOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `autoCloseType` | string | No | "LIQUIDATION" for liquidation orders, "ADL" for ADL orders. |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Change Initial Leverage (TRADE)

`POST` `{{url}}/dapi/v1/leverage`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `leverage` | string | No | target initial leverage: int from 1 to 125 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Change Margin Type (TRADE)

`POST` `{{url}}/dapi/v1/marginType`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `marginType` | string | No | ISOLATED, CROSSED |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Current Open Order(USER_DATA)

`GET` `{{url}}/dapi/v1/openOrder`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderId` | string | No | - |
| `origClientOrderId` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Current All Open Orders (USER_DATA)

`GET` `{{url}}/dapi/v1/openOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `pair` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel Order (TRADE)

`DELETE` `{{url}}/dapi/v1/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderId` | string | No | - |
| `origClientOrderId` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Modify Order (TRADE)

`PUT` `{{url}}/dapi/v1/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderId` | string | No | - |
| `origClientOrderId` | string | No | - |
| `symbol` | string | No | - |
| `side` | string | No | `SELL`, `BUY` |
| `quantity` | string | No | quantity measured by contract number, Cannot be sent with `closePosition`=`true` |
| `price` | string | No | - |
| `priceMatch` | string | No | only avaliable for `LIMIT`/`STOP`/`TAKE_PROFIT` order; can be set to `OPPONENT`/ `OPPONENT_5`/ `OPPONENT_10`/ `OPPONENT_20`: /`QUEUE`/ `QUEUE_5`/ `QUEUE_10`/ `QUEUE_20`; Can't be passed together with `price` |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### New Order (TRADE)

`POST` `{{url}}/dapi/v1/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `side` | string | No | `SELL`, `BUY` |
| `positionSide` | string | No | Default `BOTH` for One-way Mode ; `LONG` or `SHORT` for Hedge Mode. It must be sent with Hedge Mode. |
| `type` | string | No | - |
| `timeInForce` | string | No | - |
| `quantity` | string | No | quantity measured by contract number, Cannot be sent with `closePosition`=`true` |
| `reduceOnly` | string | No | "true" or "false". default "false". Cannot be sent in Hedge Mode; cannot be sent with `closePosition`=`true`(Close-All) |
| `price` | string | No | - |
| `newClientOrderId` | string | No | A unique id among open orders. Automatically generated if not sent. Can only be string following the rule: `^[\.A-Z\:/a-z0-9_-]{1,36}$` |
| `stopPrice` | string | No | Used with `STOP/STOP_MARKET` or `TAKE_PROFIT/TAKE_PROFIT_MARKET` orders. |
| `closePosition` | string | No | `true`, `false`；Close-All,used with `STOP_MARKET` or `TAKE_PROFIT_MARKET`. |
| `activationPrice` | string | No | Used with `TRAILING_STOP_MARKET` orders, default as the latest price(supporting different `workingType`) |
| `callbackRate` | string | No | Used with `TRAILING_STOP_MARKET` orders, min 0.1, max 10 where 1 for 1% |
| `workingType` | string | No | stopPrice triggered by: "MARK_PRICE", "CONTRACT_PRICE". Default "CONTRACT_PRICE" |
| `priceProtect` | string | No | "TRUE" or "FALSE", default "FALSE". Used with `STOP/STOP_MARKET` or `TAKE_PROFIT/TAKE_PROFIT_MARKET` orders. |
| `newOrderRespType` | string | No | "ACK", "RESULT", default "ACK" |
| `priceMatch` | string | No | only avaliable for `LIMIT`/`STOP`/`TAKE_PROFIT` order; can be set to `OPPONENT`/ `OPPONENT_5`/ `OPPONENT_10`/ `OPPONENT_20`: /`QUEUE`/ `QUEUE_5`/ `QUEUE_10`/ `QUEUE_20`; Can't be passed together with `price` |
| `selfTradePreventionMode` | string | No | `EXPIRE_TAKER`:expire taker order when STP triggers/ `EXPIRE_MAKER`:expire taker order when STP triggers/ `EXPIRE_BOTH`:expire both orders when STP triggers; default `EXPIRE_MAKER` |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Order (USER_DATA)

`GET` `{{url}}/dapi/v1/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderId` | string | No | - |
| `origClientOrderId` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Order Modify History (USER_DATA)

`GET` `{{url}}/dapi/v1/orderAmendment`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderId` | string | No | - |
| `origClientOrderId` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Modify Isolated Position Margin(TRADE)

`POST` `{{url}}/dapi/v1/positionMargin`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `positionSide` | string | No | Default `BOTH` for One-way Mode ; `LONG` or `SHORT` for Hedge Mode. It must be sent with Hedge Mode. |
| `amount` | string | No | - |
| `type` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Position Margin Change History(TRADE)

`GET` `{{url}}/dapi/v1/positionMargin/history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `type` | string | No | 1: Add position margin,2: Reduce position margin |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Position Information(USER_DATA)

`GET` `{{url}}/dapi/v1/positionRisk`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `marginAsset` | string | No | - |
| `pair` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Change Position Mode(TRADE)

`POST` `{{url}}/dapi/v1/positionSide/dual`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dualSidePosition` | string | No | "true": Hedge Mode; "false": One-way Mode |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Account Trade List (USER_DATA)

`GET` `{{url}}/dapi/v1/userTrades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `pair` | string | No | - |
| `orderId` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `fromId` | string | No | ID to get aggregate trades from INCLUSIVE. |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Portfolio-Margin-Endpoints

### Classic Portfolio Margin Account Information (USER_DATA)

`GET` `{{url}}/dapi/v1/pmAccountInfo`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## User-Data-Streams

### Close User Data Stream(USER_STREAM)

`DELETE` `{{url}}/dapi/v1/listenKey`

**Request Body:**

---

### Keepalive User Data Stream (USER_STREAM)

`PUT` `{{url}}/dapi/v1/listenKey`

**Request Body:**

---

### Start User Data Stream (USER_STREAM)

`POST` `{{url}}/dapi/v1/listenKey`

**Request Body:**

---

## Market-Data

### Compressed/Aggregate Trades List

`GET` `{{url}}/dapi/v1/aggTrades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `fromId` | string | No | ID to get aggregate trades from INCLUSIVE. |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |

**Request Body:**

---

### Query Index Price Constituents

`GET` `{{url}}/dapi/v1/constituents`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |

**Request Body:**

---

### Continuous Contract Kline/Candlestick Data

`GET` `{{url}}/dapi/v1/continuousKlines`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pair` | string | No | BTCUSD |
| `contractType` | string | No | ALL, CURRENT_QUARTER, NEXT_QUARTER, PERPETUAL |
| `interval` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |

**Request Body:**

---

### Order Book

`GET` `{{url}}/dapi/v1/depth`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |

**Request Body:**

---

### Exchange Information

`GET` `{{url}}/dapi/v1/exchangeInfo`

**Request Body:**

---

### Get Funding Rate Info

`GET` `{{url}}/dapi/v1/fundingInfo`

**Request Body:**

---

### Get Funding Rate History of Perpetual Futures

`GET` `{{url}}/dapi/v1/fundingRate`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |

**Request Body:**

---

### Old Trades Lookup(MARKET_DATA)

`GET` `{{url}}/dapi/v1/historicalTrades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |
| `fromId` | string | No | ID to get aggregate trades from INCLUSIVE. |

**Request Body:**

---

### Index Price Kline/Candlestick Data

`GET` `{{url}}/dapi/v1/indexPriceKlines`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pair` | string | No | BTCUSD |
| `interval` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |

**Request Body:**

---

### Kline/Candlestick Data

`GET` `{{url}}/dapi/v1/klines`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `interval` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |

**Request Body:**

---

### Mark Price Kline/Candlestick Data

`GET` `{{url}}/dapi/v1/markPriceKlines`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `interval` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |

**Request Body:**

---

### Open Interest

`GET` `{{url}}/dapi/v1/openInterest`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |

**Request Body:**

---

### Test Connectivity

`GET` `{{url}}/dapi/v1/ping`

**Request Body:**

---

### Index Price and Mark Price

`GET` `{{url}}/dapi/v1/premiumIndex`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `pair` | string | No | - |

**Request Body:**

---

### Premium index Kline Data

`GET` `{{url}}/dapi/v1/premiumIndexKlines`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `interval` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |

**Request Body:**

---

### 24hr Ticker Price Change Statistics

`GET` `{{url}}/dapi/v1/ticker/24hr`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `pair` | string | No | - |

**Request Body:**

---

### Symbol Order Book Ticker

`GET` `{{url}}/dapi/v1/ticker/bookTicker`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `pair` | string | No | - |

**Request Body:**

---

### Symbol Price Ticker

`GET` `{{url}}/dapi/v1/ticker/price`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `pair` | string | No | - |

**Request Body:**

---

### Check Server time

`GET` `{{url}}/dapi/v1/time`

**Request Body:**

---

### Recent Trades List

`GET` `{{url}}/dapi/v1/trades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |

**Request Body:**

---

### Basis

`GET` `{{url}}/futures/data/basis`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pair` | string | No | BTCUSD |
| `contractType` | string | No | ALL, CURRENT_QUARTER, NEXT_QUARTER, PERPETUAL |
| `period` | string | No | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| `limit` | string | No | Default 100; max 1000 |
| `startTime` | string | No | - |
| `endTime` | string | No | - |

**Request Body:**

---

### Long/Short Ratio

`GET` `{{url}}/futures/data/globalLongShortAccountRatio`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pair` | string | No | BTCUSD |
| `period` | string | No | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| `limit` | string | No | Default 100; max 1000 |
| `startTime` | string | No | - |
| `endTime` | string | No | - |

**Request Body:**

---

### Open Interest Statistics

`GET` `{{url}}/futures/data/openInterestHist`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pair` | string | No | BTCUSD |
| `contractType` | string | No | ALL, CURRENT_QUARTER, NEXT_QUARTER, PERPETUAL |
| `period` | string | No | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| `limit` | string | No | Default 100; max 1000 |
| `startTime` | string | No | - |
| `endTime` | string | No | - |

**Request Body:**

---

### Taker Buy/Sell Volume

`GET` `{{url}}/futures/data/takerBuySellVol`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pair` | string | No | BTCUSD |
| `contractType` | string | No | ALL, CURRENT_QUARTER, NEXT_QUARTER, PERPETUAL |
| `period` | string | No | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| `limit` | string | No | Default 100; max 1000 |
| `startTime` | string | No | - |
| `endTime` | string | No | - |

**Request Body:**

---

### Top Trader Long/Short Ratio (Accounts)

`GET` `{{url}}/futures/data/topLongShortAccountRatio`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `period` | string | No | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| `limit` | string | No | Default 100; max 1000 |
| `startTime` | string | No | - |
| `endTime` | string | No | - |

**Request Body:**

---

### Top Trader Long/Short Ratio (Positions)

`GET` `{{url}}/futures/data/topLongShortPositionRatio`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pair` | string | No | BTCUSD |
| `period` | string | No | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| `limit` | string | No | Default 100; max 1000 |
| `startTime` | string | No | - |
| `endTime` | string | No | - |

**Request Body:**

---

