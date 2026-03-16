# Binance Derivatives Trading USDS Futures REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 95

---

## Account

### Futures Account Configuration(USER_DATA)

`GET` `{{url}}/fapi/v1/accountConfig`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Futures Trading Quantitative Rules Indicators (USER_DATA)

`GET` `{{url}}/fapi/v1/apiTradingStatus`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### User Commission Rate (USER_DATA)

`GET` `{{url}}/fapi/v1/commissionRate`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get BNB Burn Status (USER_DATA)

`GET` `{{url}}/fapi/v1/feeBurn`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Toggle BNB Burn On Futures Trade (TRADE)

`POST` `{{url}}/fapi/v1/feeBurn`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `feeBurn` | string | No | "true": Fee Discount On; "false": Fee Discount Off |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Income History (USER_DATA)

`GET` `{{url}}/fapi/v1/income`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `incomeType` | string | No | TRANSFER, WELCOME_BONUS, REALIZED_PNL, FUNDING_FEE, COMMISSION, INSURANCE_CLEAR, REFERRAL_KICKBACK, COMMISSION_REBATE, API_REBATE, CONTEST_REWARD, CROSS_COLLATERAL_TRANSFER, OPTIONS_PREMIUM_FEE, OPTIONS_SETTLE_PROFIT, INTERNAL_TRANSFER, AUTO_EXCHANGE, DELIVERED_SETTELMENT, COIN_SWAP_DEPOSIT, COIN_SWAP_WITHDRAW, POSITION_LIMIT_INCREASE_FEE, STRATEGY_UMFUTURES_TRANSFER，FEE_RETURN，BFUSD_REWARD |
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

`GET` `{{url}}/fapi/v1/income/asyn`

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

`GET` `{{url}}/fapi/v1/income/asyn/id`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `downloadId` | string | No | get by download id api |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Notional and Leverage Brackets (USER_DATA)

`GET` `{{url}}/fapi/v1/leverageBracket`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Current Multi-Assets Mode (USER_DATA)

`GET` `{{url}}/fapi/v1/multiAssetsMargin`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Download Id For Futures Order History (USER_DATA)

`GET` `{{url}}/fapi/v1/order/asyn`

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

`GET` `{{url}}/fapi/v1/order/asyn/id`

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

`GET` `{{url}}/fapi/v1/positionSide/dual`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query User Rate Limit (USER_DATA)

`GET` `{{url}}/fapi/v1/rateLimit/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Symbol Configuration(USER_DATA)

`GET` `{{url}}/fapi/v1/symbolConfig`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Download Id For Futures Trade History (USER_DATA)

`GET` `{{url}}/fapi/v1/trade/asyn`

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

`GET` `{{url}}/fapi/v1/trade/asyn/id`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `downloadId` | string | No | get by download id api |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Account Information V2(USER_DATA)

`GET` `{{url}}/fapi/v2/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Futures Account Balance V2 (USER_DATA)

`GET` `{{url}}/fapi/v2/balance`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Account Information V3(USER_DATA)

`GET` `{{url}}/fapi/v3/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Futures Account Balance V3 (USER_DATA)

`GET` `{{url}}/fapi/v3/balance`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Trade

### Position ADL Quantile Estimation(USER_DATA)

`GET` `{{url}}/fapi/v1/adlQuantile`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel All Algo Open Orders (TRADE)

`DELETE` `{{url}}/fapi/v1/algoOpenOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel Algo Order (TRADE)

`DELETE` `{{url}}/fapi/v1/algoOrder`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `algoId` | string | No | - |
| `clientAlgoId` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### New Algo Order(TRADE)

`POST` `{{url}}/fapi/v1/algoOrder`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `algoType` | string | No | Only support `CONDITIONAL` |
| `symbol` | string | No | - |
| `side` | string | No | `SELL`, `BUY` |
| `positionSide` | string | No | Default `BOTH` for One-way Mode ; `LONG` or `SHORT` for Hedge Mode. It must be sent with Hedge Mode. |
| `type` | string | No | - |
| `timeInForce` | string | No | - |
| `quantity` | string | No | - |
| `price` | string | No | - |
| `triggerPrice` | string | No | - |
| `workingType` | string | No | stopPrice triggered by: "MARK_PRICE", "CONTRACT_PRICE". Default "CONTRACT_PRICE" |
| `priceMatch` | string | No | only avaliable for `LIMIT`/`STOP`/`TAKE_PROFIT` order; can be set to `OPPONENT`/ `OPPONENT_5`/ `OPPONENT_10`/ `OPPONENT_20`: /`QUEUE`/ `QUEUE_5`/ `QUEUE_10`/ `QUEUE_20`; Can't be passed together with `price` |
| `closePosition` | string | No | `true`, `false`；Close-All，used with `STOP_MARKET` or `TAKE_PROFIT_MARKET`. |
| `priceProtect` | string | No | "TRUE" or "FALSE", default "FALSE". Used with `STOP/STOP_MARKET` or `TAKE_PROFIT/TAKE_PROFIT_MARKET` orders. |
| `reduceOnly` | string | No | "true" or "false". default "false". Cannot be sent in Hedge Mode |
| `activatePrice` | string | No | Used with `TRAILING_STOP_MARKET` orders, default as the latest price(supporting different `workingType`) |
| `callbackRate` | string | No | Used with `TRAILING_STOP_MARKET` orders, min 0.1, max 5 where 1 for 1% |
| `clientAlgoId` | string | No | - |
| `newOrderRespType` | string | No | "ACK", "RESULT", default "ACK" |
| `selfTradePreventionMode` | string | No | `EXPIRE_TAKER`:expire taker order when STP triggers/ `EXPIRE_MAKER`:expire taker order when STP triggers/ `EXPIRE_BOTH`:expire both orders when STP triggers; default `NONE` |
| `goodTillDate` | string | No | order cancel time for timeInForce `GTD`, mandatory when `timeInforce` set to `GTD`; order the timestamp only retains second-level precision, ms part will be ignored; The goodTillDate timestamp must be greater than the current time plus 600 seconds and smaller than 253402300799000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Algo Order (USER_DATA)

`GET` `{{url}}/fapi/v1/algoOrder`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `algoId` | string | No | - |
| `clientAlgoId` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query All Algo Orders (USER_DATA)

`GET` `{{url}}/fapi/v1/allAlgoOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `algoId` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `page` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel All Open Orders (TRADE)

`DELETE` `{{url}}/fapi/v1/allOpenOrders`

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

`GET` `{{url}}/fapi/v1/allOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderId` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel Multiple Orders (TRADE)

`DELETE` `{{url}}/fapi/v1/batchOrders`

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

`PUT` `{{url}}/fapi/v1/batchOrders`

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

`POST` `{{url}}/fapi/v1/batchOrders`

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

`POST` `{{url}}/fapi/v1/countdownCancelAll`

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

### User's Force Orders (USER_DATA)

`GET` `{{url}}/fapi/v1/forceOrders`

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

### Change Initial Leverage(TRADE)

`POST` `{{url}}/fapi/v1/leverage`

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

### Change Margin Type(TRADE)

`POST` `{{url}}/fapi/v1/marginType`

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

### Change Multi-Assets Mode (TRADE)

`POST` `{{url}}/fapi/v1/multiAssetsMargin`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `multiAssetsMargin` | string | No | "true": Multi-Assets Mode; "false": Single-Asset Mode |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Current All Algo Open Orders (USER_DATA)

`GET` `{{url}}/fapi/v1/openAlgoOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `algoType` | string | No | - |
| `symbol` | string | No | - |
| `algoId` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Current Open Order (USER_DATA)

`GET` `{{url}}/fapi/v1/openOrder`

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

`GET` `{{url}}/fapi/v1/openOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel Order (TRADE)

`DELETE` `{{url}}/fapi/v1/order`

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

`PUT` `{{url}}/fapi/v1/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderId` | string | No | - |
| `origClientOrderId` | string | No | - |
| `symbol` | string | No | - |
| `side` | string | No | `SELL`, `BUY` |
| `quantity` | string | No | Order quantity, cannot be sent with `closePosition=true` |
| `price` | string | No | - |
| `priceMatch` | string | No | only avaliable for `LIMIT`/`STOP`/`TAKE_PROFIT` order; can be set to `OPPONENT`/ `OPPONENT_5`/ `OPPONENT_10`/ `OPPONENT_20`: /`QUEUE`/ `QUEUE_5`/ `QUEUE_10`/ `QUEUE_20`; Can't be passed together with `price` |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### New Order(TRADE)

`POST` `{{url}}/fapi/v1/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `side` | string | No | `SELL`, `BUY` |
| `positionSide` | string | No | Default `BOTH` for One-way Mode ; `LONG` or `SHORT` for Hedge Mode. It must be sent with Hedge Mode. |
| `type` | string | No | - |
| `timeInForce` | string | No | - |
| `quantity` | string | No | - |
| `reduceOnly` | string | No | "true" or "false". default "false". Cannot be sent in Hedge Mode |
| `price` | string | No | - |
| `newClientOrderId` | string | No | A unique id among open orders. Automatically generated if not sent. Can only be string following the rule: `^[\.A-Z\:/a-z0-9_-]{1,36}$` |
| `newOrderRespType` | string | No | "ACK", "RESULT", default "ACK" |
| `priceMatch` | string | No | only avaliable for `LIMIT`/`STOP`/`TAKE_PROFIT` order; can be set to `OPPONENT`/ `OPPONENT_5`/ `OPPONENT_10`/ `OPPONENT_20`: /`QUEUE`/ `QUEUE_5`/ `QUEUE_10`/ `QUEUE_20`; Can't be passed together with `price` |
| `selfTradePreventionMode` | string | No | `EXPIRE_TAKER`:expire taker order when STP triggers/ `EXPIRE_MAKER`:expire taker order when STP triggers/ `EXPIRE_BOTH`:expire both orders when STP triggers; default `NONE` |
| `goodTillDate` | string | No | order cancel time for timeInForce `GTD`, mandatory when `timeInforce` set to `GTD`; order the timestamp only retains second-level precision, ms part will be ignored; The goodTillDate timestamp must be greater than the current time plus 600 seconds and smaller than 253402300799000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Order (USER_DATA)

`GET` `{{url}}/fapi/v1/order`

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

### Test Order(TRADE)

`POST` `{{url}}/fapi/v1/order/test`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `side` | string | No | `SELL`, `BUY` |
| `positionSide` | string | No | Default `BOTH` for One-way Mode ; `LONG` or `SHORT` for Hedge Mode. It must be sent with Hedge Mode. |
| `type` | string | No | - |
| `timeInForce` | string | No | - |
| `quantity` | string | No | - |
| `reduceOnly` | string | No | "true" or "false". default "false". Cannot be sent in Hedge Mode |
| `price` | string | No | - |
| `newClientOrderId` | string | No | A unique id among open orders. Automatically generated if not sent. Can only be string following the rule: `^[\.A-Z\:/a-z0-9_-]{1,36}$` |
| `stopPrice` | string | No | Used with `STOP/STOP_MARKET` or `TAKE_PROFIT/TAKE_PROFIT_MARKET` orders. |
| `closePosition` | string | No | `true`, `false`；Close-All，used with `STOP_MARKET` or `TAKE_PROFIT_MARKET`. |
| `activationPrice` | string | No | Used with `TRAILING_STOP_MARKET` orders, default as the latest price(supporting different `workingType`) |
| `callbackRate` | string | No | Used with `TRAILING_STOP_MARKET` orders, min 0.1, max 5 where 1 for 1% |
| `workingType` | string | No | stopPrice triggered by: "MARK_PRICE", "CONTRACT_PRICE". Default "CONTRACT_PRICE" |
| `priceProtect` | string | No | "TRUE" or "FALSE", default "FALSE". Used with `STOP/STOP_MARKET` or `TAKE_PROFIT/TAKE_PROFIT_MARKET` orders. |
| `newOrderRespType` | string | No | "ACK", "RESULT", default "ACK" |
| `priceMatch` | string | No | only avaliable for `LIMIT`/`STOP`/`TAKE_PROFIT` order; can be set to `OPPONENT`/ `OPPONENT_5`/ `OPPONENT_10`/ `OPPONENT_20`: /`QUEUE`/ `QUEUE_5`/ `QUEUE_10`/ `QUEUE_20`; Can't be passed together with `price` |
| `selfTradePreventionMode` | string | No | `EXPIRE_TAKER`:expire taker order when STP triggers/ `EXPIRE_MAKER`:expire taker order when STP triggers/ `EXPIRE_BOTH`:expire both orders when STP triggers; default `NONE` |
| `goodTillDate` | string | No | order cancel time for timeInForce `GTD`, mandatory when `timeInforce` set to `GTD`; order the timestamp only retains second-level precision, ms part will be ignored; The goodTillDate timestamp must be greater than the current time plus 600 seconds and smaller than 253402300799000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Order Modify History (USER_DATA)

`GET` `{{url}}/fapi/v1/orderAmendment`

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

`POST` `{{url}}/fapi/v1/positionMargin`

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

### Get Position Margin Change History (TRADE)

`GET` `{{url}}/fapi/v1/positionMargin/history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `type` | string | No | 1: Add position margin，2: Reduce position margin |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Change Position Mode(TRADE)

`POST` `{{url}}/fapi/v1/positionSide/dual`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dualSidePosition` | string | No | "true": Hedge Mode; "false": One-way Mode |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Futures TradFi Perps Contract(USER_DATA)

`POST` `{{url}}/fapi/v1/stock/contract`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Account Trade List (USER_DATA)

`GET` `{{url}}/fapi/v1/userTrades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
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

### Position Information V2 (USER_DATA)

`GET` `{{url}}/fapi/v2/positionRisk`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Position Information V3 (USER_DATA)

`GET` `{{url}}/fapi/v3/positionRisk`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Convert

### Accept the offered quote (USER_DATA)

`POST` `{{url}}/fapi/v1/convert/acceptQuote`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `quoteId` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### List All Convert Pairs

`GET` `{{url}}/fapi/v1/convert/exchangeInfo`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fromAsset` | string | No | User spends coin |
| `toAsset` | string | No | User receives coin |

**Request Body:**

---

### Send Quote Request(USER_DATA)

`POST` `{{url}}/fapi/v1/convert/getQuote`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fromAsset` | string | No | - |
| `toAsset` | string | No | - |
| `fromAmount` | string | No | When specified, it is the amount you will be debited after the conversion |
| `toAmount` | string | No | When specified, it is the amount you will be credited after the conversion |
| `validTime` | string | No | 10s, default 10s |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Order status(USER_DATA)

`GET` `{{url}}/fapi/v1/convert/orderStatus`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderId` | string | No | Either orderId or quoteId is required |
| `quoteId` | string | No | Either orderId or quoteId is required |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Portfolio-Margin-Endpoints

### Classic Portfolio Margin Account Information (USER_DATA)

`GET` `{{url}}/fapi/v1/pmAccountInfo`

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

### Close User Data Stream (USER_STREAM)

`DELETE` `{{url}}/fapi/v1/listenKey`

**Request Body:**

---

### Keepalive User Data Stream (USER_STREAM)

`PUT` `{{url}}/fapi/v1/listenKey`

**Request Body:**

---

### Start User Data Stream (USER_STREAM)

`POST` `{{url}}/fapi/v1/listenKey`

**Request Body:**

---

## Market-Data

### Compressed/Aggregate Trades List

`GET` `{{url}}/fapi/v1/aggTrades`

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

### Multi-Assets Mode Asset Index

`GET` `{{url}}/fapi/v1/assetIndex`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |

**Request Body:**

---

### Query Index Price Constituents

`GET` `{{url}}/fapi/v1/constituents`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |

**Request Body:**

---

### Continuous Contract Kline/Candlestick Data

`GET` `{{url}}/fapi/v1/continuousKlines`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pair` | string | No | - |
| `contractType` | string | No | - |
| `interval` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |

**Request Body:**

---

### Order Book

`GET` `{{url}}/fapi/v1/depth`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |

**Request Body:**

---

### Exchange Information

`GET` `{{url}}/fapi/v1/exchangeInfo`

**Request Body:**

---

### Get Funding Rate Info

`GET` `{{url}}/fapi/v1/fundingInfo`

**Request Body:**

---

### Get Funding Rate History

`GET` `{{url}}/fapi/v1/fundingRate`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |

**Request Body:**

---

### Old Trades Lookup (MARKET_DATA)

`GET` `{{url}}/fapi/v1/historicalTrades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |
| `fromId` | string | No | ID to get aggregate trades from INCLUSIVE. |

**Request Body:**

---

### Composite Index Symbol Information

`GET` `{{url}}/fapi/v1/indexInfo`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |

**Request Body:**

---

### Index Price Kline/Candlestick Data

`GET` `{{url}}/fapi/v1/indexPriceKlines`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pair` | string | No | - |
| `interval` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |

**Request Body:**

---

### Query Insurance Fund Balance Snapshot

`GET` `{{url}}/fapi/v1/insuranceBalance`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |

**Request Body:**

---

### Kline/Candlestick Data

`GET` `{{url}}/fapi/v1/klines`

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

`GET` `{{url}}/fapi/v1/markPriceKlines`

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

`GET` `{{url}}/fapi/v1/openInterest`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |

**Request Body:**

---

### Test Connectivity

`GET` `{{url}}/fapi/v1/ping`

**Request Body:**

---

### Mark Price

`GET` `{{url}}/fapi/v1/premiumIndex`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |

**Request Body:**

---

### Premium index Kline Data

`GET` `{{url}}/fapi/v1/premiumIndexKlines`

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

### RPI Order Book

`GET` `{{url}}/fapi/v1/rpiDepth`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |

**Request Body:**

---

### ADL Risk

`GET` `{{url}}/fapi/v1/symbolAdlRisk`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |

**Request Body:**

---

### 24hr Ticker Price Change Statistics

`GET` `{{url}}/fapi/v1/ticker/24hr`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |

**Request Body:**

---

### Symbol Order Book Ticker

`GET` `{{url}}/fapi/v1/ticker/bookTicker`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |

**Request Body:**

---

### Symbol Price Ticker

`GET` `{{url}}/fapi/v1/ticker/price`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |

**Request Body:**

---

### Check Server Time

`GET` `{{url}}/fapi/v1/time`

**Request Body:**

---

### Recent Trades List

`GET` `{{url}}/fapi/v1/trades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |

**Request Body:**

---

### Trading Schedule

`GET` `{{url}}/fapi/v1/tradingSchedule`

**Request Body:**

---

### Symbol Price Ticker V2

`GET` `{{url}}/fapi/v2/ticker/price`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |

**Request Body:**

---

### Basis

`GET` `{{url}}/futures/data/basis`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pair` | string | No | - |
| `contractType` | string | No | - |
| `period` | string | No | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| `limit` | string | No | Default 30,Max 500 |
| `startTime` | string | No | - |
| `endTime` | string | No | - |

**Request Body:**

---

### Quarterly Contract Settlement Price

`GET` `{{url}}/futures/data/delivery-price`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pair` | string | No | - |

**Request Body:**

---

### Long/Short Ratio

`GET` `{{url}}/futures/data/globalLongShortAccountRatio`

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

### Open Interest Statistics

`GET` `{{url}}/futures/data/openInterestHist`

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

### Taker Buy/Sell Volume

`GET` `{{url}}/futures/data/takerlongshortRatio`

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
| `symbol` | string | No | - |
| `period` | string | No | "5m","15m","30m","1h","2h","4h","6h","12h","1d" |
| `limit` | string | No | Default 100; max 1000 |
| `startTime` | string | No | - |
| `endTime` | string | No | - |

**Request Body:**

---

