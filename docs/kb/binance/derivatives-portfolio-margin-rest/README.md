# Binance Derivatives Trading Portfolio Margin REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 102

---

## Account

### Account Information(USER_DATA)

`GET` `{{url}}/papi/v1/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Fund Collection by Asset(TRADE)

`POST` `{{url}}/papi/v1/asset-collection`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Fund Auto-collection(TRADE)

`POST` `{{url}}/papi/v1/auto-collection`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Account Balance(USER_DATA)

`GET` `{{url}}/papi/v1/balance`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### BNB transfer (TRADE)

`POST` `{{url}}/papi/v1/bnb-transfer`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | string | No | - |
| `transferSide` | string | No | "TO_UM","FROM_UM" |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get CM Account Detail(USER_DATA)

`GET` `{{url}}/papi/v1/cm/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get User Commission Rate for CM(USER_DATA)

`GET` `{{url}}/papi/v1/cm/commissionRate`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get CM Income History(USER_DATA)

`GET` `{{url}}/papi/v1/cm/income`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `incomeType` | string | No | TRANSFER, WELCOME_BONUS, REALIZED_PNL, FUNDING_FEE, COMMISSION, INSURANCE_CLEAR, REFERRAL_KICKBACK, COMMISSION_REBATE, API_REBATE, CONTEST_REWARD, CROSS_COLLATERAL_TRANSFER, OPTIONS_PREMIUM_FEE, OPTIONS_SETTLE_PROFIT, INTERNAL_TRANSFER, AUTO_EXCHANGE, DELIVERED_SETTELMENT, COIN_SWAP_DEPOSIT, COIN_SWAP_WITHDRAW, POSITION_LIMIT_INCREASE_FEE |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `page` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Change CM Initial Leverage (TRADE)

`POST` `{{url}}/papi/v1/cm/leverage`

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

### CM Notional and Leverage Brackets(USER_DATA)

`GET` `{{url}}/papi/v1/cm/leverageBracket`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query CM Position Information(USER_DATA)

`GET` `{{url}}/papi/v1/cm/positionRisk`

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

### Change CM Position Mode(TRADE)

`POST` `{{url}}/papi/v1/cm/positionSide/dual`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dualSidePosition` | string | No | "true": Hedge Mode; "false": One-way Mode |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get CM Current Position Mode(USER_DATA)

`GET` `{{url}}/papi/v1/cm/positionSide/dual`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Margin Borrow/Loan Interest History(USER_DATA)

`GET` `{{url}}/papi/v1/margin/marginInterestHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10 Max:100 |
| `archived` | string | Yes | Default: `false`. Set to `true` for archived data from 6 months ago |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Margin Loan Record(USER_DATA)

`GET` `{{url}}/papi/v1/margin/marginLoan`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `txId` | string | No | the `tranId` in `POST/papi/v1/marginLoan` |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10 Max:100 |
| `archived` | string | Yes | Default: `false`. Set to `true` for archived data from 6 months ago |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Margin Max Borrow(USER_DATA)

`GET` `{{url}}/papi/v1/margin/maxBorrowable`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Margin Max Withdraw(USER_DATA)

`GET` `{{url}}/papi/v1/margin/maxWithdraw`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Margin repay Record(USER_DATA)

`GET` `{{url}}/papi/v1/margin/repayLoan`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `txId` | string | No | the `tranId` in `POST/papi/v1/marginLoan` |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10 Max:100 |
| `archived` | string | Yes | Default: `false`. Set to `true` for archived data from 6 months ago |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Portfolio Margin Negative Balance Interest History(USER_DATA)

`GET` `{{url}}/papi/v1/portfolio/interest-history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `size` | string | No | Default:10 Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query User Negative Balance Auto Exchange Record (USER_DATA)

`GET` `{{url}}/papi/v1/portfolio/negative-balance-exchange-record`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query User Rate Limit (USER_DATA)

`GET` `{{url}}/papi/v1/rateLimit/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Repay futures Negative Balance(USER_DATA)

`POST` `{{url}}/papi/v1/repay-futures-negative-balance`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Change Auto-repay-futures Status(TRADE)

`POST` `{{url}}/papi/v1/repay-futures-switch`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `autoRepay` | string | No | Default: `true`; `false` for turn off the auto-repay futures negative balance function |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Auto-repay-futures Status(USER_DATA)

`GET` `{{url}}/papi/v1/repay-futures-switch`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get UM Account Detail(USER_DATA)

`GET` `{{url}}/papi/v1/um/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### UM Futures Account Configuration(USER_DATA)

`GET` `{{url}}/papi/v1/um/accountConfig`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Portfolio Margin UM Trading Quantitative Rules Indicators(USER_DATA)

`GET` `{{url}}/papi/v1/um/apiTradingStatus`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get User Commission Rate for UM(USER_DATA)

`GET` `{{url}}/papi/v1/um/commissionRate`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get UM Income History(USER_DATA)

`GET` `{{url}}/papi/v1/um/income`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `incomeType` | string | No | TRANSFER, WELCOME_BONUS, REALIZED_PNL, FUNDING_FEE, COMMISSION, INSURANCE_CLEAR, REFERRAL_KICKBACK, COMMISSION_REBATE, API_REBATE, CONTEST_REWARD, CROSS_COLLATERAL_TRANSFER, OPTIONS_PREMIUM_FEE, OPTIONS_SETTLE_PROFIT, INTERNAL_TRANSFER, AUTO_EXCHANGE, DELIVERED_SETTELMENT, COIN_SWAP_DEPOSIT, COIN_SWAP_WITHDRAW, POSITION_LIMIT_INCREASE_FEE |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `page` | string | No | - |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Download Id For UM Futures Transaction History (USER_DATA)

`GET` `{{url}}/papi/v1/um/income/asyn`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get UM Futures Transaction Download Link by Id(USER_DATA)

`GET` `{{url}}/papi/v1/um/income/asyn/id`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `downloadId` | string | No | get by download id api |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Change UM Initial Leverage(TRADE)

`POST` `{{url}}/papi/v1/um/leverage`

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

### UM Notional and Leverage Brackets (USER_DATA)

`GET` `{{url}}/papi/v1/um/leverageBracket`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Download Id For UM Futures Order History (USER_DATA)

`GET` `{{url}}/papi/v1/um/order/asyn`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get UM Futures Order Download Link by Id(USER_DATA)

`GET` `{{url}}/papi/v1/um/order/asyn/id`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `downloadId` | string | No | get by download id api |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query UM Position Information(USER_DATA)

`GET` `{{url}}/papi/v1/um/positionRisk`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Change UM Position Mode(TRADE)

`POST` `{{url}}/papi/v1/um/positionSide/dual`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dualSidePosition` | string | No | "true": Hedge Mode; "false": One-way Mode |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get UM Current Position Mode(USER_DATA)

`GET` `{{url}}/papi/v1/um/positionSide/dual`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### UM Futures Symbol Configuration(USER_DATA)

`GET` `{{url}}/papi/v1/um/symbolConfig`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Download Id For UM Futures Trade History (USER_DATA)

`GET` `{{url}}/papi/v1/um/trade/asyn`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get UM Futures Trade Download Link by Id(USER_DATA)

`GET` `{{url}}/papi/v1/um/trade/asyn/id`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `downloadId` | string | No | get by download id api |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get UM Account Detail V2(USER_DATA)

`GET` `{{url}}/papi/v2/um/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Trade

### CM Position ADL Quantile Estimation(USER_DATA)

`GET` `{{url}}/papi/v1/cm/adlQuantile`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel All CM Open Orders(TRADE)

`DELETE` `{{url}}/papi/v1/cm/allOpenOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query All CM Orders (USER_DATA)

`GET` `{{url}}/papi/v1/cm/allOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `pair` | string | No | - |
| `orderId` | string | No | - |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel All CM Open Conditional Orders(TRADE)

`DELETE` `{{url}}/papi/v1/cm/conditional/allOpenOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query All CM Conditional Orders(USER_DATA)

`GET` `{{url}}/papi/v1/cm/conditional/allOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `strategyId` | string | No | - |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Current CM Open Conditional Order(USER_DATA)

`GET` `{{url}}/papi/v1/cm/conditional/openOrder`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `strategyId` | string | No | - |
| `newClientStrategyId` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query All Current CM Open Conditional Orders (USER_DATA)

`GET` `{{url}}/papi/v1/cm/conditional/openOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel CM Conditional Order(TRADE)

`DELETE` `{{url}}/papi/v1/cm/conditional/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `strategyId` | string | No | - |
| `newClientStrategyId` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### New CM Conditional Order(TRADE)

`POST` `{{url}}/papi/v1/cm/conditional/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `side` | string | No | - |
| `positionSide` | string | No | Default `BOTH` for One-way Mode ; `LONG` or `SHORT` for Hedge Mode. It must be sent in Hedge Mode. |
| `strategyType` | string | No | "STOP", "STOP_MARKET", "TAKE_PROFIT", "TAKE_PROFIT_MARKET", and "TRAILING_STOP_MARKET" |
| `timeInForce` | string | No | - |
| `quantity` | string | No | - |
| `reduceOnly` | string | No | "true" or "false". default "false". Cannot be sent in Hedge Mode . |
| `price` | string | No | - |
| `workingType` | string | No | stopPrice triggered by: "MARK_PRICE", "CONTRACT_PRICE". Default "CONTRACT_PRICE" |
| `priceProtect` | string | No | "TRUE" or "FALSE", default "FALSE". Used with `STOP/STOP_MARKET` or `TAKE_PROFIT/TAKE_PROFIT_MARKET` orders |
| `newClientStrategyId` | string | No | - |
| `stopPrice` | string | No | Used with `STOP/STOP_MARKET` or `TAKE_PROFIT/TAKE_PROFIT_MARKET` orders. |
| `activationPrice` | string | No | Used with `TRAILING_STOP_MARKET` orders, default as the mark price |
| `callbackRate` | string | No | Used with `TRAILING_STOP_MARKET` orders, min 0.1, max 5 where 1 for 1% |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query CM Conditional Order History(USER_DATA)

`GET` `{{url}}/papi/v1/cm/conditional/orderHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `strategyId` | string | No | - |
| `newClientStrategyId` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query User's CM Force Orders(USER_DATA)

`GET` `{{url}}/papi/v1/cm/forceOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `autoCloseType` | string | No | `LIQUIDATION` for liquidation orders, `ADL` for ADL orders. |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Current CM Open Order (USER_DATA)

`GET` `{{url}}/papi/v1/cm/openOrder`

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

### Query All Current CM Open Orders(USER_DATA)

`GET` `{{url}}/papi/v1/cm/openOrders`

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

### Cancel CM Order(TRADE)

`DELETE` `{{url}}/papi/v1/cm/order`

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

### Modify CM Order(TRADE)

`PUT` `{{url}}/papi/v1/cm/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderId` | string | No | - |
| `origClientOrderId` | string | No | - |
| `symbol` | string | No | - |
| `side` | string | No | - |
| `quantity` | string | No | Order quantity |
| `price` | string | No | - |
| `priceMatch` | string | No | only avaliable for `LIMIT`/`STOP`/`TAKE_PROFIT` order; can be set to `OPPONENT`/ `OPPONENT_5`/ `OPPONENT_10`/ `OPPONENT_20`: /`QUEUE`/ `QUEUE_5`/ `QUEUE_10`/ `QUEUE_20`; Can't be passed together with `price` |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### New CM Order(TRADE)

`POST` `{{url}}/papi/v1/cm/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `side` | string | No | - |
| `positionSide` | string | No | Default `BOTH` for One-way Mode ; `LONG` or `SHORT` for Hedge Mode. It must be sent in Hedge Mode. |
| `type` | string | No | `LIMIT`, `MARKET` |
| `timeInForce` | string | No | - |
| `quantity` | string | No | - |
| `reduceOnly` | string | No | "true" or "false". default "false". Cannot be sent in Hedge Mode . |
| `price` | string | No | - |
| `priceMatch` | string | No | only avaliable for `LIMIT`/`STOP`/`TAKE_PROFIT` order; can be set to `OPPONENT`/ `OPPONENT_5`/ `OPPONENT_10`/ `OPPONENT_20`: /`QUEUE`/ `QUEUE_5`/ `QUEUE_10`/ `QUEUE_20`; Can't be passed together with `price` |
| `newClientOrderId` | string | No | Used to uniquely identify this cancel. Automatically generated by default |
| `newOrderRespType` | string | No | "ACK", "RESULT", default "ACK" |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query CM Order(USER_DATA)

`GET` `{{url}}/papi/v1/cm/order`

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

### Query CM Modify Order History(TRADE)

`GET` `{{url}}/papi/v1/cm/orderAmendment`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderId` | string | No | - |
| `origClientOrderId` | string | No | - |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### CM Account Trade List(USER_DATA)

`GET` `{{url}}/papi/v1/cm/userTrades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `pair` | string | No | - |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `fromId` | string | No | Trade id to fetch from. Default gets most recent trades. |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel Margin Account All Open Orders on a Symbol(TRADE)

`DELETE` `{{url}}/papi/v1/margin/allOpenOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Margin Account's all OCO (USER_DATA)

`GET` `{{url}}/papi/v1/margin/allOrderList`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fromId` | string | No | Trade id to fetch from. Default gets most recent trades. |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query All Margin Account Orders (USER_DATA)

`GET` `{{url}}/papi/v1/margin/allOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderId` | string | No | - |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query User's Margin Force Orders(USER_DATA)

`GET` `{{url}}/papi/v1/margin/forceOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10 Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Margin Account Trade List (USER_DATA)

`GET` `{{url}}/papi/v1/margin/myTrades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderId` | string | No | - |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `fromId` | string | No | Trade id to fetch from. Default gets most recent trades. |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Margin Account's Open OCO (USER_DATA)

`GET` `{{url}}/papi/v1/margin/openOrderList`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Current Margin Open Order (USER_DATA)

`GET` `{{url}}/papi/v1/margin/openOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel Margin Account Order(TRADE)

`DELETE` `{{url}}/papi/v1/margin/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderId` | string | No | - |
| `origClientOrderId` | string | No | - |
| `newClientOrderId` | string | No | Used to uniquely identify this cancel. Automatically generated by default |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### New Margin Order(TRADE)

`POST` `{{url}}/papi/v1/margin/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `side` | string | No | - |
| `type` | string | No | `LIMIT`, `MARKET` |
| `quantity` | string | No | - |
| `quoteOrderQty` | string | No | - |
| `price` | string | No | - |
| `stopPrice` | string | No | Used with `STOP/STOP_MARKET` or `TAKE_PROFIT/TAKE_PROFIT_MARKET` orders. |
| `newClientOrderId` | string | No | Used to uniquely identify this cancel. Automatically generated by default |
| `newOrderRespType` | string | No | "ACK", "RESULT", default "ACK" |
| `icebergQty` | string | No | Used with `LIMIT`, `STOP_LOSS_LIMIT`, and `TAKE_PROFIT_LIMIT` to create an iceberg order |
| `sideEffectType` | string | No | NO_SIDE_EFFECT, MARGIN_BUY, AUTO_REPAY; default NO_SIDE_EFFECT. |
| `timeInForce` | string | No | - |
| `selfTradePreventionMode` | string | No | `NONE`:No STP / `EXPIRE_TAKER`:expire taker order when STP triggers/ `EXPIRE_MAKER`:expire taker order when STP triggers/ `EXPIRE_BOTH`:expire both orders when STP triggers |
| `autoRepayAtCancel` | string | No | Only when MARGIN_BUY or AUTO_BORROW_REPAY order takes effect, true means that the debt generated by the order needs to be repay after the order is cancelled. The default is true |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Margin Account Order (USER_DATA)

`GET` `{{url}}/papi/v1/margin/order`

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

### Margin Account New OCO(TRADE)

`POST` `{{url}}/papi/v1/margin/order/oco`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `listClientOrderId` | string | No | Either `orderListId` or `listClientOrderId` must be provided |
| `side` | string | No | - |
| `quantity` | string | No | Order quantity |
| `limitClientOrderId` | string | No | A unique Id for the limit order |
| `price` | string | No | - |
| `limitIcebergQty` | string | No | - |
| `stopClientOrderId` | string | No | A unique Id for the stop loss/stop loss limit leg |
| `stopPrice` | string | No | - |
| `stopLimitPrice` | string | No | If provided, stopLimitTimeInForce is required. |
| `stopIcebergQty` | string | No | - |
| `stopLimitTimeInForce` | string | No | Valid values are `GTC/FOK/IOC` |
| `newOrderRespType` | string | No | "ACK", "RESULT", default "ACK" |
| `sideEffectType` | string | No | NO_SIDE_EFFECT, MARGIN_BUY, AUTO_REPAY; default NO_SIDE_EFFECT. |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel Margin Account OCO Orders(TRADE)

`DELETE` `{{url}}/papi/v1/margin/orderList`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderListId` | string | No | Either `orderListId` or `listClientOrderId` must be provided |
| `listClientOrderId` | string | No | Either `orderListId` or `listClientOrderId` must be provided |
| `newClientOrderId` | string | No | Used to uniquely identify this cancel. Automatically generated by default |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Margin Account's OCO (USER_DATA)

`GET` `{{url}}/papi/v1/margin/orderList`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderListId` | string | No | Either `orderListId` or `listClientOrderId` must be provided |
| `origClientOrderId` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Margin Account Repay Debt(TRADE)

`POST` `{{url}}/papi/v1/margin/repay-debt`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `amount` | string | No | - |
| `specifyRepayAssets` | string | No | Specific asset list to repay debt; Can be added in batch, separated by commas |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Margin Account Borrow(MARGIN)

`POST` `{{url}}/papi/v1/marginLoan`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `amount` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Margin Account Repay(MARGIN)

`POST` `{{url}}/papi/v1/repayLoan`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `amount` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### UM Position ADL Quantile Estimation(USER_DATA)

`GET` `{{url}}/papi/v1/um/adlQuantile`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel All UM Open Orders(TRADE)

`DELETE` `{{url}}/papi/v1/um/allOpenOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query All UM Orders(USER_DATA)

`GET` `{{url}}/papi/v1/um/allOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderId` | string | No | - |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel All UM Open Conditional Orders (TRADE)

`DELETE` `{{url}}/papi/v1/um/conditional/allOpenOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query All UM Conditional Orders(USER_DATA)

`GET` `{{url}}/papi/v1/um/conditional/allOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `strategyId` | string | No | - |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Current UM Open Conditional Order(USER_DATA)

`GET` `{{url}}/papi/v1/um/conditional/openOrder`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `strategyId` | string | No | - |
| `newClientStrategyId` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query All Current UM Open Conditional Orders(USER_DATA)

`GET` `{{url}}/papi/v1/um/conditional/openOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel UM Conditional Order(TRADE)

`DELETE` `{{url}}/papi/v1/um/conditional/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `strategyId` | string | No | - |
| `newClientStrategyId` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### New UM Conditional Order (TRADE)

`POST` `{{url}}/papi/v1/um/conditional/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `side` | string | No | - |
| `positionSide` | string | No | Default `BOTH` for One-way Mode ; `LONG` or `SHORT` for Hedge Mode. It must be sent in Hedge Mode. |
| `strategyType` | string | No | "STOP", "STOP_MARKET", "TAKE_PROFIT", "TAKE_PROFIT_MARKET", and "TRAILING_STOP_MARKET" |
| `timeInForce` | string | No | - |
| `quantity` | string | No | - |
| `reduceOnly` | string | No | "true" or "false". default "false". Cannot be sent in Hedge Mode . |
| `price` | string | No | - |
| `workingType` | string | No | stopPrice triggered by: "MARK_PRICE", "CONTRACT_PRICE". Default "CONTRACT_PRICE" |
| `priceProtect` | string | No | "TRUE" or "FALSE", default "FALSE". Used with `STOP/STOP_MARKET` or `TAKE_PROFIT/TAKE_PROFIT_MARKET` orders |
| `newClientStrategyId` | string | No | - |
| `stopPrice` | string | No | Used with `STOP/STOP_MARKET` or `TAKE_PROFIT/TAKE_PROFIT_MARKET` orders. |
| `activationPrice` | string | No | Used with `TRAILING_STOP_MARKET` orders, default as the mark price |
| `callbackRate` | string | No | Used with `TRAILING_STOP_MARKET` orders, min 0.1, max 5 where 1 for 1% |
| `priceMatch` | string | No | only avaliable for `LIMIT`/`STOP`/`TAKE_PROFIT` order; can be set to `OPPONENT`/ `OPPONENT_5`/ `OPPONENT_10`/ `OPPONENT_20`: /`QUEUE`/ `QUEUE_5`/ `QUEUE_10`/ `QUEUE_20`; Can't be passed together with `price` |
| `selfTradePreventionMode` | string | No | `NONE`:No STP / `EXPIRE_TAKER`:expire taker order when STP triggers/ `EXPIRE_MAKER`:expire taker order when STP triggers/ `EXPIRE_BOTH`:expire both orders when STP triggers |
| `goodTillDate` | string | No | order cancel time for timeInForce `GTD`, mandatory when `timeInforce` set to `GTD`; order the timestamp only retains second-level precision, ms part will be ignored; The goodTillDate timestamp must be greater than the current time plus 600 seconds and smaller than 253402300799000Mode. It must be sent in Hedge Mode. |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query UM Conditional Order History(USER_DATA)

`GET` `{{url}}/papi/v1/um/conditional/orderHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `strategyId` | string | No | - |
| `newClientStrategyId` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get UM Futures BNB Burn Status (USER_DATA)

`GET` `{{url}}/papi/v1/um/feeBurn`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Toggle BNB Burn On UM Futures Trade (TRADE)

`POST` `{{url}}/papi/v1/um/feeBurn`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `feeBurn` | string | No | "true": Fee Discount On; "false": Fee Discount Off |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query User's UM Force Orders (USER_DATA)

`GET` `{{url}}/papi/v1/um/forceOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `autoCloseType` | string | No | `LIQUIDATION` for liquidation orders, `ADL` for ADL orders. |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Current UM Open Order(USER_DATA)

`GET` `{{url}}/papi/v1/um/openOrder`

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

### Query All Current UM Open Orders(USER_DATA)

`GET` `{{url}}/papi/v1/um/openOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel UM Order(TRADE)

`DELETE` `{{url}}/papi/v1/um/order`

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

### Modify UM Order(TRADE)

`PUT` `{{url}}/papi/v1/um/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderId` | string | No | - |
| `origClientOrderId` | string | No | - |
| `symbol` | string | No | - |
| `side` | string | No | - |
| `quantity` | string | No | Order quantity |
| `price` | string | No | - |
| `priceMatch` | string | No | only avaliable for `LIMIT`/`STOP`/`TAKE_PROFIT` order; can be set to `OPPONENT`/ `OPPONENT_5`/ `OPPONENT_10`/ `OPPONENT_20`: /`QUEUE`/ `QUEUE_5`/ `QUEUE_10`/ `QUEUE_20`; Can't be passed together with `price` |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### New UM Order (TRADE)

`POST` `{{url}}/papi/v1/um/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `side` | string | No | - |
| `positionSide` | string | No | Default `BOTH` for One-way Mode ; `LONG` or `SHORT` for Hedge Mode. It must be sent in Hedge Mode. |
| `type` | string | No | `LIMIT`, `MARKET` |
| `timeInForce` | string | No | - |
| `quantity` | string | No | - |
| `reduceOnly` | string | No | "true" or "false". default "false". Cannot be sent in Hedge Mode . |
| `price` | string | No | - |
| `newClientOrderId` | string | No | Used to uniquely identify this cancel. Automatically generated by default |
| `newOrderRespType` | string | No | "ACK", "RESULT", default "ACK" |
| `priceMatch` | string | No | only avaliable for `LIMIT`/`STOP`/`TAKE_PROFIT` order; can be set to `OPPONENT`/ `OPPONENT_5`/ `OPPONENT_10`/ `OPPONENT_20`: /`QUEUE`/ `QUEUE_5`/ `QUEUE_10`/ `QUEUE_20`; Can't be passed together with `price` |
| `selfTradePreventionMode` | string | No | `NONE`:No STP / `EXPIRE_TAKER`:expire taker order when STP triggers/ `EXPIRE_MAKER`:expire taker order when STP triggers/ `EXPIRE_BOTH`:expire both orders when STP triggers |
| `goodTillDate` | string | No | order cancel time for timeInForce `GTD`, mandatory when `timeInforce` set to `GTD`; order the timestamp only retains second-level precision, ms part will be ignored; The goodTillDate timestamp must be greater than the current time plus 600 seconds and smaller than 253402300799000Mode. It must be sent in Hedge Mode. |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query UM Order (USER_DATA)

`GET` `{{url}}/papi/v1/um/order`

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

### Query UM Modify Order History(TRADE)

`GET` `{{url}}/papi/v1/um/orderAmendment`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderId` | string | No | - |
| `origClientOrderId` | string | No | - |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### UM Account Trade List(USER_DATA)

`GET` `{{url}}/papi/v1/um/userTrades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `startTime` | string | No | Timestamp in ms to get funding from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get funding until INCLUSIVE. |
| `fromId` | string | No | Trade id to fetch from. Default gets most recent trades. |
| `limit` | string | No | Default 100; max 1000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## User-Data-Streams

### Close User Data Stream(USER_STREAM)

`DELETE` `{{url}}/papi/v1/listenKey`

**Request Body:**

---

### Keepalive User Data Stream (USER_STREAM)

`PUT` `{{url}}/papi/v1/listenKey`

**Request Body:**

---

### Start User Data Stream(USER_STREAM)

`POST` `{{url}}/papi/v1/listenKey`

**Request Body:**

---

## Market-Data

### Test Connectivity

`GET` `{{url}}/papi/v1/ping`

**Request Body:**

---

