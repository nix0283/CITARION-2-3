# Binance Margin Trading REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 61

---

## Account

### Get BNB Burn Status (USER_DATA)

`GET` `{{url}}/sapi/v1/bnbBurn`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Cross Margin Account Details (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Cross Isolated Margin Capital Flow (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/capital-flow`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `symbol` | string | No | isolated margin pair |
| `type` | string | No | Transfer Type: ROLL_IN, ROLL_OUT |
| `startTime` | string | No | Only supports querying data from the past 90 days. |
| `endTime` | string | No | - |
| `fromId` | string | No | If `fromId` is set, data with `id` greater than `fromId` will be returned. Otherwise, the latest data will be returned. |
| `limit` | string | No | Limit on the number of data records returned per request. Default: 500; Maximum: 1000. |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Cross Margin Fee Data (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/crossMarginData`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `vipLevel` | string | No | User's current specific margin data will be returned if vipLevel is omitted |
| `coin` | string | No | - |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Disable Isolated Margin Account (TRADE)

`DELETE` `{{url}}/sapi/v1/margin/isolated/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Enable Isolated Margin Account (TRADE)

`POST` `{{url}}/sapi/v1/margin/isolated/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Isolated Margin Account Info (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/isolated/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbols` | string | No | Max 5 symbols can be sent; separated by ",". e.g. "BTCUSDT,BNBUSDT,ADAUSDT" |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Enabled Isolated Margin Account Limit (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/isolated/accountLimit`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Isolated Margin Fee Data (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/isolatedMarginData`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `vipLevel` | string | No | User's current specific margin data will be returned if vipLevel is omitted |
| `symbol` | string | No | isolated margin pair |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Adjust cross margin max leverage (USER_DATA)

`POST` `{{url}}/sapi/v1/margin/max-leverage`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `maxLeverage` | string | No | Can only adjust 3 , 5 or 10，Example: maxLeverage = 5 or 3 for Cross Margin Classic; maxLeverage=10 for Cross Margin Pro 10x leverage or 20x if compliance allows. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Summary of Margin account (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/tradeCoeff`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Trade

### Query Margin Account's all OCO (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/allOrderList`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `isIsolated` | string | No | For isolated margin or not, "TRUE", "FALSE", default "FALSE" |
| `symbol` | string | No | isolated margin pair |
| `fromId` | string | No | If `fromId` is set, data with `id` greater than `fromId` will be returned. Otherwise, the latest data will be returned. |
| `startTime` | string | No | Only supports querying data from the past 90 days. |
| `endTime` | string | No | - |
| `limit` | string | No | Limit on the number of data records returned per request. Default: 500; Maximum: 1000. |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Margin Account's All Orders (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/allOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `isIsolated` | string | No | For isolated margin or not, "TRUE", "FALSE", default "FALSE" |
| `orderId` | string | No | - |
| `startTime` | string | No | Only supports querying data from the past 90 days. |
| `endTime` | string | No | - |
| `limit` | string | No | Limit on the number of data records returned per request. Default: 500; Maximum: 1000. |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Special key List(Low Latency Trading)(TRADE)

`GET` `{{url}}/sapi/v1/margin/api-key-list`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | isolated margin pair |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Create Special Key(Low-Latency Trading)(TRADE)

`POST` `{{url}}/sapi/v1/margin/apiKey`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiName` | string | No | - |
| `symbol` | string | No | isolated margin pair |
| `ip` | string | No | Can be added in batches, separated by commas. Max 30 for an API key |
| `publicKey` | string | No | 1. If publicKey is inputted it will create an RSA or Ed25519 key. <br />2. Need to be encoded to URL-encoded format |
| `permissionMode` | string | No | This parameter is only for the Ed25519 API key, and does not effact for other encryption methods. The value can be TRADE (TRADE for all permissions) or READ (READ for USER_DATA, FIX_API_READ_ONLY). The default value is TRADE. |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Delete Special Key(Low-Latency Trading)(TRADE)

`DELETE` `{{url}}/sapi/v1/margin/apiKey`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `apiName` | string | No | - |
| `symbol` | string | No | isolated margin pair |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Special key(Low Latency Trading)(TRADE)

`GET` `{{url}}/sapi/v1/margin/apiKey`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | isolated margin pair |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Edit ip for Special Key(Low-Latency Trading)(TRADE)

`PUT` `{{url}}/sapi/v1/margin/apiKey/ip`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | isolated margin pair |
| `ip` | string | No | Can be added in batches, separated by commas. Max 30 for an API key |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Small Liability Exchange Coin List (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/exchange-small-liability`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Small Liability Exchange (MARGIN)

`POST` `{{url}}/sapi/v1/margin/exchange-small-liability`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `assetNames` | string | Yes | The assets list of small liability exchange， Example: assetNames = BTC,ETH |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Small Liability Exchange History (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/exchange-small-liability-history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `startTime` | string | No | Only supports querying data from the past 90 days. |
| `endTime` | string | No | - |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Force Liquidation Record (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/forceLiquidationRec`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | Only supports querying data from the past 90 days. |
| `endTime` | string | No | - |
| `isolatedSymbol` | string | No | isolated symbol |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10 Max:100 |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Margin Manual Liquidation(MARGIN)

`POST` `{{url}}/sapi/v1/margin/manual-liquidation`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | No | `MARGIN`,`ISOLATED` |
| `symbol` | string | No | isolated margin pair |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Prevented Matches(USER_DATA)

`GET` `{{url}}/sapi/v1/margin/myPreventedMatches`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `preventedMatchId` | string | No | - |
| `orderId` | string | No | - |
| `fromPreventedMatchId` | string | No | - |
| `recvWindow` | string | No | No more than 60000 |
| `isIsolated` | string | No | For isolated margin or not, "TRUE", "FALSE", default "FALSE" |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Margin Account's Trade List (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/myTrades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `isIsolated` | string | No | For isolated margin or not, "TRUE", "FALSE", default "FALSE" |
| `orderId` | string | No | - |
| `startTime` | string | No | Only supports querying data from the past 90 days. |
| `endTime` | string | No | - |
| `fromId` | string | No | If `fromId` is set, data with `id` greater than `fromId` will be returned. Otherwise, the latest data will be returned. |
| `limit` | string | No | Limit on the number of data records returned per request. Default: 500; Maximum: 1000. |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Margin Account's Open OCO (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/openOrderList`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `isIsolated` | string | No | For isolated margin or not, "TRUE", "FALSE", default "FALSE" |
| `symbol` | string | No | isolated margin pair |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Margin Account Cancel all Open Orders on a Symbol (TRADE)

`DELETE` `{{url}}/sapi/v1/margin/openOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `isIsolated` | string | No | For isolated margin or not, "TRUE", "FALSE", default "FALSE" |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Margin Account's Open Orders (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/openOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | isolated margin pair |
| `isIsolated` | string | No | For isolated margin or not, "TRUE", "FALSE", default "FALSE" |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Margin Account Cancel Order (TRADE)

`DELETE` `{{url}}/sapi/v1/margin/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `isIsolated` | string | No | For isolated margin or not, "TRUE", "FALSE", default "FALSE" |
| `orderId` | string | No | - |
| `origClientOrderId` | string | No | - |
| `newClientOrderId` | string | No | Used to uniquely identify this cancel. Automatically generated by default |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Margin Account New Order (TRADE)

`POST` `{{url}}/sapi/v1/margin/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `isIsolated` | string | No | For isolated margin or not, "TRUE", "FALSE", default "FALSE" |
| `side` | string | No | - |
| `type` | string | No | `MARGIN`,`ISOLATED` |
| `quantity` | string | No | - |
| `quoteOrderQty` | string | No | - |
| `price` | string | No | - |
| `stopPrice` | string | No | Used with `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, and `TAKE_PROFIT_LIMIT` orders. |
| `newClientOrderId` | string | No | Used to uniquely identify this cancel. Automatically generated by default |
| `icebergQty` | string | No | Used with `LIMIT`, `STOP_LOSS_LIMIT`, and `TAKE_PROFIT_LIMIT` to create an iceberg order. |
| `newOrderRespType` | string | No | Set the response JSON. ACK, RESULT, or FULL; MARKET and LIMIT order types default to FULL, all other orders default to ACK. |
| `sideEffectType` | string | No | NO_SIDE_EFFECT, MARGIN_BUY, AUTO_REPAY,AUTO_BORROW_REPAY; default NO_SIDE_EFFECT. More info in [FAQ](https://www.binance.com/en/support/faq/how-to-use-the-sideeffecttype-parameter-with-the-margin-order-endpoints-f9fc51cda1984bf08b95e0d96c4570bc) |
| `timeInForce` | string | No | GTC,IOC,FOK |
| `selfTradePreventionMode` | string | No | The allowed enums is dependent on what is configured on the symbol. The possible supported values are EXPIRE_TAKER, EXPIRE_MAKER, EXPIRE_BOTH, NONE |
| `autoRepayAtCancel` | string | No | Only when MARGIN_BUY or AUTO_BORROW_REPAY order takes effect, true means that the debt generated by the order needs to be repay after the order is cancelled. The default is true |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Margin Account's Order (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `isIsolated` | string | No | For isolated margin or not, "TRUE", "FALSE", default "FALSE" |
| `orderId` | string | No | - |
| `origClientOrderId` | string | No | - |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Margin Account New OCO (TRADE)

`POST` `{{url}}/sapi/v1/margin/order/oco`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `isIsolated` | string | No | For isolated margin or not, "TRUE", "FALSE", default "FALSE" |
| `listClientOrderId` | string | No | Either `orderListId` or `listClientOrderId` must be provided |
| `side` | string | No | - |
| `quantity` | string | No | - |
| `limitClientOrderId` | string | No | A unique Id for the limit order |
| `price` | string | No | - |
| `limitIcebergQty` | string | No | - |
| `stopClientOrderId` | string | No | A unique Id for the stop loss/stop loss limit leg |
| `stopPrice` | string | No | - |
| `stopLimitPrice` | string | No | If provided, `stopLimitTimeInForce` is required. |
| `stopIcebergQty` | string | No | - |
| `stopLimitTimeInForce` | string | No | Valid values are `GTC`/`FOK`/`IOC` |
| `newOrderRespType` | string | No | Set the response JSON. ACK, RESULT, or FULL; MARKET and LIMIT order types default to FULL, all other orders default to ACK. |
| `sideEffectType` | string | No | NO_SIDE_EFFECT, MARGIN_BUY, AUTO_REPAY,AUTO_BORROW_REPAY; default NO_SIDE_EFFECT. More info in [FAQ](https://www.binance.com/en/support/faq/how-to-use-the-sideeffecttype-parameter-with-the-margin-order-endpoints-f9fc51cda1984bf08b95e0d96c4570bc) |
| `selfTradePreventionMode` | string | No | The allowed enums is dependent on what is configured on the symbol. The possible supported values are EXPIRE_TAKER, EXPIRE_MAKER, EXPIRE_BOTH, NONE |
| `autoRepayAtCancel` | string | No | Only when MARGIN_BUY or AUTO_BORROW_REPAY order takes effect, true means that the debt generated by the order needs to be repay after the order is cancelled. The default is true |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Margin Account New OTO (TRADE)

`POST` `{{url}}/sapi/v1/margin/order/oto`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `isIsolated` | string | No | For isolated margin or not, "TRUE", "FALSE", default "FALSE" |
| `listClientOrderId` | string | No | Either `orderListId` or `listClientOrderId` must be provided |
| `newOrderRespType` | string | No | Set the response JSON. ACK, RESULT, or FULL; MARKET and LIMIT order types default to FULL, all other orders default to ACK. |
| `sideEffectType` | string | No | NO_SIDE_EFFECT, MARGIN_BUY, AUTO_REPAY,AUTO_BORROW_REPAY; default NO_SIDE_EFFECT. More info in [FAQ](https://www.binance.com/en/support/faq/how-to-use-the-sideeffecttype-parameter-with-the-margin-order-endpoints-f9fc51cda1984bf08b95e0d96c4570bc) |
| `selfTradePreventionMode` | string | No | The allowed enums is dependent on what is configured on the symbol. The possible supported values are EXPIRE_TAKER, EXPIRE_MAKER, EXPIRE_BOTH, NONE |
| `autoRepayAtCancel` | string | No | Only when MARGIN_BUY or AUTO_BORROW_REPAY order takes effect, true means that the debt generated by the order needs to be repay after the order is cancelled. The default is true |
| `workingType` | string | No | Supported values: `LIMIT`, `LIMIT_MAKER` |
| `workingSide` | string | No | BUY, SELL |
| `workingClientOrderId` | string | No | Arbitrary unique ID among open orders for the working order. Automatically generated if not sent. |
| `workingPrice` | string | No | - |
| `workingQuantity` | string | No | - |
| `workingIcebergQty` | string | No | This can only be used if `workingTimeInForce` is `GTC`. |
| `workingTimeInForce` | string | No | GTC,IOC,FOK |
| `pendingType` | string | No | Supported values: [Order Types](https://developers.binance.com/docs/binance-spot-api-docs/enums#order-types-ordertypes-type) Note that `MARKET` orders using `quoteOrderQty` are not supported. |
| `pendingSide` | string | No | BUY, SELL |
| `pendingClientOrderId` | string | No | Arbitrary unique ID among open orders for the pending order. Automatically generated if not sent. |
| `pendingPrice` | string | No | - |
| `pendingStopPrice` | string | No | - |
| `pendingTrailingDelta` | string | No | - |
| `pendingQuantity` | string | No | - |
| `pendingIcebergQty` | string | No | This can only be used if `pendingTimeInForce` is `GTC`. |
| `pendingTimeInForce` | string | No | GTC,IOC,FOK |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Margin Account New OTOCO (TRADE)

`POST` `{{url}}/sapi/v1/margin/order/otoco`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `isIsolated` | string | No | For isolated margin or not, "TRUE", "FALSE", default "FALSE" |
| `sideEffectType` | string | No | NO_SIDE_EFFECT, MARGIN_BUY, AUTO_REPAY,AUTO_BORROW_REPAY; default NO_SIDE_EFFECT. More info in [FAQ](https://www.binance.com/en/support/faq/how-to-use-the-sideeffecttype-parameter-with-the-margin-order-endpoints-f9fc51cda1984bf08b95e0d96c4570bc) |
| `autoRepayAtCancel` | string | No | Only when MARGIN_BUY or AUTO_BORROW_REPAY order takes effect, true means that the debt generated by the order needs to be repay after the order is cancelled. The default is true |
| `listClientOrderId` | string | No | Either `orderListId` or `listClientOrderId` must be provided |
| `newOrderRespType` | string | No | Set the response JSON. ACK, RESULT, or FULL; MARKET and LIMIT order types default to FULL, all other orders default to ACK. |
| `selfTradePreventionMode` | string | No | The allowed enums is dependent on what is configured on the symbol. The possible supported values are EXPIRE_TAKER, EXPIRE_MAKER, EXPIRE_BOTH, NONE |
| `workingType` | string | No | Supported values: `LIMIT`, `LIMIT_MAKER` |
| `workingSide` | string | No | BUY, SELL |
| `workingClientOrderId` | string | No | Arbitrary unique ID among open orders for the working order. Automatically generated if not sent. |
| `workingPrice` | string | No | - |
| `workingQuantity` | string | No | - |
| `workingIcebergQty` | string | No | This can only be used if `workingTimeInForce` is `GTC`. |
| `workingTimeInForce` | string | No | GTC,IOC,FOK |
| `pendingSide` | string | No | BUY, SELL |
| `pendingQuantity` | string | No | - |
| `pendingAboveType` | string | No | Supported values: `LIMIT_MAKER`, `STOP_LOSS`, and `STOP_LOSS_LIMIT` |
| `pendingAboveClientOrderId` | string | No | Arbitrary unique ID among open orders for the pending above order. Automatically generated if not sent. |
| `pendingAbovePrice` | string | No | - |
| `pendingAboveStopPrice` | string | No | - |
| `pendingAboveTrailingDelta` | string | No | - |
| `pendingAboveIcebergQty` | string | No | This can only be used if `pendingAboveTimeInForce` is `GTC`. |
| `pendingAboveTimeInForce` | string | No | - |
| `pendingBelowType` | string | No | Supported values: `LIMIT_MAKER`, `STOP_LOSS`, and `STOP_LOSS_LIMIT` |
| `pendingBelowClientOrderId` | string | No | Arbitrary unique ID among open orders for the pending below order. Automatically generated if not sent. |
| `pendingBelowPrice` | string | No | - |
| `pendingBelowStopPrice` | string | No | - |
| `pendingBelowTrailingDelta` | string | No | - |
| `pendingBelowIcebergQty` | string | No | This can only be used if `pendingBelowTimeInForce` is `GTC`. |
| `pendingBelowTimeInForce` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Margin Account Cancel OCO (TRADE)

`DELETE` `{{url}}/sapi/v1/margin/orderList`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `isIsolated` | string | No | For isolated margin or not, "TRUE", "FALSE", default "FALSE" |
| `orderListId` | string | No | Either `orderListId` or `listClientOrderId` must be provided |
| `listClientOrderId` | string | No | Either `orderListId` or `listClientOrderId` must be provided |
| `newClientOrderId` | string | No | Used to uniquely identify this cancel. Automatically generated by default |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Margin Account's OCO (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/orderList`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `isIsolated` | string | No | For isolated margin or not, "TRUE", "FALSE", default "FALSE" |
| `symbol` | string | No | isolated margin pair |
| `orderListId` | string | No | Either `orderListId` or `listClientOrderId` must be provided |
| `origClientOrderId` | string | No | - |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Current Margin Order Count Usage (TRADE)

`GET` `{{url}}/sapi/v1/margin/rateLimit/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `isIsolated` | string | No | For isolated margin or not, "TRUE", "FALSE", default "FALSE" |
| `symbol` | string | No | isolated margin pair |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Borrow-Repay

### Margin account borrow/repay(MARGIN)

`POST` `{{url}}/sapi/v1/margin/borrow-repay`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `isIsolated` | string | No | `TRUE` for Isolated Margin, `FALSE` for Cross Margin, Default `FALSE` |
| `symbol` | string | No | - |
| `amount` | string | No | - |
| `type` | string | No | `MARGIN`,`ISOLATED` |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query borrow/repay records in Margin account(USER_DATA)

`GET` `{{url}}/sapi/v1/margin/borrow-repay`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `isolatedSymbol` | string | No | isolated symbol |
| `txId` | string | No | `tranId` in `POST /sapi/v1/margin/loan` |
| `startTime` | string | No | Only supports querying data from the past 90 days. |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10 Max:100 |
| `type` | string | No | `MARGIN`,`ISOLATED` |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Interest History (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/interestHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `isolatedSymbol` | string | No | isolated symbol |
| `startTime` | string | No | Only supports querying data from the past 90 days. |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10 Max:100 |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Margin Interest Rate History (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/interestRateHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `vipLevel` | string | No | User's current specific margin data will be returned if vipLevel is omitted |
| `startTime` | string | No | Only supports querying data from the past 90 days. |
| `endTime` | string | No | - |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Max Borrow (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/maxBorrowable`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `isolatedSymbol` | string | No | isolated symbol |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get future hourly interest rate (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/next-hourly-interest-rate`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `assets` | string | No | List of assets, separated by commas, up to 20 |
| `isIsolated` | string | No | for isolated margin or not, "TRUE", "FALSE" |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Risk-Data-Stream

### Close User Data Stream (USER_STREAM)

`DELETE` `{{url}}/sapi/v1/margin/listen-key`

**Request Body:**

---

### Keepalive User Data Stream (USER_STREAM)

`PUT` `{{url}}/sapi/v1/margin/listen-key`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `listenKey` | string | No | - |

**Request Body:**

---

### Start User Data Stream (USER_STREAM)

`POST` `{{url}}/sapi/v1/margin/listen-key`

**Request Body:**

---

## Transfer

### Query Max Transfer-Out Amount (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/maxTransferable`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `isolatedSymbol` | string | No | isolated symbol |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Cross Margin Transfer History (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/transfer`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `type` | string | No | Transfer Type: ROLL_IN, ROLL_OUT |
| `startTime` | string | No | Only supports querying data from the past 90 days. |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10 Max:100 |
| `isolatedSymbol` | string | No | isolated symbol |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Market-Data

### Get All Margin Assets (MARKET_DATA)

`GET` `{{url}}/sapi/v1/margin/allAssets`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |

**Request Body:**

---

### Get All Cross Margin Pairs (MARKET_DATA)

`GET` `{{url}}/sapi/v1/margin/allPairs`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | isolated margin pair |

**Request Body:**

---

### Query Margin Available Inventory(USER_DATA)

`GET` `{{url}}/sapi/v1/margin/available-inventory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | No | `MARGIN`,`ISOLATED` |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cross margin collateral ratio (MARKET_DATA)

`GET` `{{url}}/sapi/v1/margin/crossMarginCollateralRatio`

**Request Body:**

---

### Get Delist Schedule (MARKET_DATA)

`GET` `{{url}}/sapi/v1/margin/delist-schedule`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | No more than 60000 |

**Request Body:**

---

### Get All Isolated Margin Symbol(MARKET_DATA)

`GET` `{{url}}/sapi/v1/margin/isolated/allPairs`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | isolated margin pair |
| `recvWindow` | string | No | No more than 60000 |

**Request Body:**

---

### Query Isolated Margin Tier Data (USER_DATA)

`GET` `{{url}}/sapi/v1/margin/isolatedMarginTier`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `tier` | string | No | All margin tier data will be returned if tier is omitted |
| `recvWindow` | string | No | No more than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Liability Coin Leverage Bracket in Cross Margin Pro Mode(MARKET_DATA)

`GET` `{{url}}/sapi/v1/margin/leverageBracket`

**Request Body:**

---

### Get Limit Price Pairs(MARKET_DATA)

`GET` `{{url}}/sapi/v1/margin/limit-price-pairs`

**Request Body:**

---

### Get list Schedule (MARKET_DATA)

`GET` `{{url}}/sapi/v1/margin/list-schedule`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | No more than 60000 |

**Request Body:**

---

### Query Margin PriceIndex (MARKET_DATA)

`GET` `{{url}}/sapi/v1/margin/priceIndex`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |

**Request Body:**

---

### Get Margin Restricted Assets (MARKET_DATA)

`GET` `{{url}}/sapi/v1/margin/restricted-asset`

**Request Body:**

---

### Get Margin Asset Risk-Based Liquidation Ratio (MARKET_DATA)

`GET` `{{url}}/sapi/v1/margin/risk-based-liquidation-ratio`

**Request Body:**

---

