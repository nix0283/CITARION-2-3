# Binance Spot REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 44

---

## Account

### Account information

`GET` `{{url}}/api/v3/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `omitZeroBalances` | string | No | When set to `true`, emits only the non-zero balances of an account. <br>Default value: `false` |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Commission Rates

`GET` `{{url}}/api/v3/account/commission`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query all Order lists

`GET` `{{url}}/api/v3/allOrderList`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fromId` | string | No | ID to get aggregate trades from INCLUSIVE. |
| `startTime` | string | No | Timestamp in ms to get aggregate trades from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get aggregate trades until INCLUSIVE. |
| `limit` | string | No | Default: 500; Maximum: 1000. |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### All orders

`GET` `{{url}}/api/v3/allOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderId` | string | No | - |
| `startTime` | string | No | Timestamp in ms to get aggregate trades from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get aggregate trades until INCLUSIVE. |
| `limit` | string | No | Default: 500; Maximum: 1000. |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Allocations

`GET` `{{url}}/api/v3/myAllocations`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `startTime` | string | No | Timestamp in ms to get aggregate trades from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get aggregate trades until INCLUSIVE. |
| `fromAllocationId` | string | No | - |
| `limit` | string | No | Default: 500; Maximum: 1000. |
| `orderId` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query relevant filters

`GET` `{{url}}/api/v3/myFilters`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Prevented Matches

`GET` `{{url}}/api/v3/myPreventedMatches`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `preventedMatchId` | string | No | - |
| `orderId` | string | No | - |
| `fromPreventedMatchId` | string | No | - |
| `limit` | string | No | Default: 500; Maximum: 1000. |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Account trade list

`GET` `{{url}}/api/v3/myTrades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderId` | string | No | - |
| `startTime` | string | No | Timestamp in ms to get aggregate trades from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get aggregate trades until INCLUSIVE. |
| `fromId` | string | No | ID to get aggregate trades from INCLUSIVE. |
| `limit` | string | No | Default: 500; Maximum: 1000. |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Open Order lists

`GET` `{{url}}/api/v3/openOrderList`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Current open orders

`GET` `{{url}}/api/v3/openOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Symbol to query |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query order

`GET` `{{url}}/api/v3/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderId` | string | No | - |
| `origClientOrderId` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Order Amendments

`GET` `{{url}}/api/v3/order/amendments`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderId` | string | No | - |
| `fromExecutionId` | string | No | - |
| `limit` | string | No | Default:500; Maximum: 1000  |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Order list

`GET` `{{url}}/api/v3/orderList`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderListId` | string | No | Either `orderListId` or `listClientOrderId` must be provided |
| `origClientOrderId` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Unfilled Order Count

`GET` `{{url}}/api/v3/rateLimit/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Trade

### Cancel All Open Orders on a Symbol

`DELETE` `{{url}}/api/v3/openOrders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel order

`DELETE` `{{url}}/api/v3/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderId` | string | No | - |
| `origClientOrderId` | string | No | - |
| `newClientOrderId` | string | No | A unique id among open orders. Automatically generated if not sent.<br/> Orders with the same `newClientOrderID` can be accepted only when the previous one is filled, otherwise the order will be rejected. |
| `cancelRestrictions` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### New order

`POST` `{{url}}/api/v3/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `side` | string | No | - |
| `type` | string | No | - |
| `timeInForce` | string | No | - |
| `quantity` | string | No | - |
| `quoteOrderQty` | string | No | - |
| `price` | string | No | - |
| `newClientOrderId` | string | No | A unique id among open orders. Automatically generated if not sent.<br/> Orders with the same `newClientOrderID` can be accepted only when the previous one is filled, otherwise the order will be rejected. |
| `strategyId` | string | No | - |
| `strategyType` | string | No | The value cannot be less than `1000000`. |
| `stopPrice` | string | No | Used with `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, and `TAKE_PROFIT_LIMIT` orders. |
| `trailingDelta` | string | No | See [Trailing Stop order FAQ](faqs/trailing-stop-faq.md). |
| `icebergQty` | string | No | Used with `LIMIT`, `STOP_LOSS_LIMIT`, and `TAKE_PROFIT_LIMIT` to create an iceberg order. |
| `newOrderRespType` | string | No | - |
| `selfTradePreventionMode` | string | No | - |
| `pegPriceType` | string | No | - |
| `pegOffsetValue` | string | No | Priceleveltopegthepriceto(max:100).<br>See[PeggedOrdersInfo](#pegged-orders-info) |
| `pegOffsetType` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Order Amend Keep Priority

`PUT` `{{url}}/api/v3/order/amend/keepPriority`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderId` | string | No | - |
| `origClientOrderId` | string | No | - |
| `newClientOrderId` | string | No | A unique id among open orders. Automatically generated if not sent.<br/> Orders with the same `newClientOrderID` can be accepted only when the previous one is filled, otherwise the order will be rejected. |
| `newQty` | string | No | `newQty` must be greater than 0 and less than the order's quantity. |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel an Existing Order and Send a New Order

`POST` `{{url}}/api/v3/order/cancelReplace`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `side` | string | No | - |
| `type` | string | No | - |
| `cancelReplaceMode` | string | No | - |
| `timeInForce` | string | No | - |
| `quantity` | string | No | - |
| `quoteOrderQty` | string | No | - |
| `price` | string | No | - |
| `cancelNewClientOrderId` | string | No | Used to uniquely identify this cancel. Automatically generated by default. |
| `cancelOrigClientOrderId` | string | No | Either `cancelOrderId` or `cancelOrigClientOrderId` must be sent. <br></br> If both `cancelOrderId` and `cancelOrigClientOrderId` parameters are provided, the `cancelOrderId` is searched first, then the `cancelOrigClientOrderId` from that result is checked against that order. <br></br> If both conditions are not met the request will be rejected. |
| `cancelOrderId` | string | No | Either `cancelOrderId` or `cancelOrigClientOrderId` must be sent. <br></br>If both `cancelOrderId` and `cancelOrigClientOrderId` parameters are provided, the `cancelOrderId` is searched first, then the `cancelOrigClientOrderId` from that result is checked against that order. <br></br>If both conditions are not met the request will be rejected. |
| `newClientOrderId` | string | No | A unique id among open orders. Automatically generated if not sent.<br/> Orders with the same `newClientOrderID` can be accepted only when the previous one is filled, otherwise the order will be rejected. |
| `strategyId` | string | No | - |
| `strategyType` | string | No | The value cannot be less than `1000000`. |
| `stopPrice` | string | No | Used with `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, and `TAKE_PROFIT_LIMIT` orders. |
| `trailingDelta` | string | No | See [Trailing Stop order FAQ](faqs/trailing-stop-faq.md). |
| `icebergQty` | string | No | Used with `LIMIT`, `STOP_LOSS_LIMIT`, and `TAKE_PROFIT_LIMIT` to create an iceberg order. |
| `newOrderRespType` | string | No | - |
| `selfTradePreventionMode` | string | No | - |
| `cancelRestrictions` | string | No | - |
| `orderRateLimitExceededMode` | string | No | - |
| `pegPriceType` | string | No | - |
| `pegOffsetValue` | string | No | Priceleveltopegthepriceto(max:100).<br>See[PeggedOrdersInfo](#pegged-orders-info) |
| `pegOffsetType` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### New OCO - Deprecated

`POST` `{{url}}/api/v3/order/oco`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `listClientOrderId` | string | No | A unique Id for the entire orderList |
| `side` | string | No | - |
| `quantity` | string | No | - |
| `limitClientOrderId` | string | No | A unique Id for the limit order |
| `price` | string | No | - |
| `limitStrategyId` | string | No | - |
| `limitStrategyType` | string | No | The value cannot be less than `1000000`. |
| `limitIcebergQty` | string | No | Used to make the `LIMIT_MAKER` leg an iceberg order. |
| `trailingDelta` | string | No | See [Trailing Stop order FAQ](faqs/trailing-stop-faq.md). |
| `stopClientOrderId` | string | No | A unique Id for the stop loss/stop loss limit leg |
| `stopPrice` | string | No | - |
| `stopStrategyId` | string | No | - |
| `stopStrategyType` | string | No | The value cannot be less than `1000000`. |
| `stopLimitPrice` | string | No | If provided, `stopLimitTimeInForce` is required. |
| `stopIcebergQty` | string | No | Used with `STOP_LOSS_LIMIT` leg to make an iceberg order. |
| `stopLimitTimeInForce` | string | No | - |
| `newOrderRespType` | string | No | - |
| `selfTradePreventionMode` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Test new order

`POST` `{{url}}/api/v3/order/test`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `computeCommissionRates` | string | No | Default: `false` <br> See [Commissions FAQ](faqs/commission_faq.md#test-order-diferences) to learn more. |
| `symbol` | string | No | - |
| `side` | string | No | - |
| `type` | string | No | - |
| `timeInForce` | string | No | - |
| `quantity` | string | No | - |
| `quoteOrderQty` | string | No | - |
| `price` | string | No | - |
| `newClientOrderId` | string | No | A unique id among open orders. Automatically generated if not sent.<br/> Orders with the same `newClientOrderID` can be accepted only when the previous one is filled, otherwise the order will be rejected. |
| `strategyId` | string | No | - |
| `strategyType` | string | No | The value cannot be less than `1000000`. |
| `stopPrice` | string | No | Used with `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, and `TAKE_PROFIT_LIMIT` orders. |
| `trailingDelta` | string | No | See [Trailing Stop order FAQ](faqs/trailing-stop-faq.md). |
| `icebergQty` | string | No | Used with `LIMIT`, `STOP_LOSS_LIMIT`, and `TAKE_PROFIT_LIMIT` to create an iceberg order. |
| `newOrderRespType` | string | No | - |
| `selfTradePreventionMode` | string | No | - |
| `pegPriceType` | string | No | - |
| `pegOffsetValue` | string | No | Priceleveltopegthepriceto(max:100).<br>See[PeggedOrdersInfo](#pegged-orders-info) |
| `pegOffsetType` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel Order list

`DELETE` `{{url}}/api/v3/orderList`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `orderListId` | string | No | Either `orderListId` or `listClientOrderId` must be provided |
| `listClientOrderId` | string | No | A unique Id for the entire orderList |
| `newClientOrderId` | string | No | A unique id among open orders. Automatically generated if not sent.<br/> Orders with the same `newClientOrderID` can be accepted only when the previous one is filled, otherwise the order will be rejected. |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### New Order list - OCO

`POST` `{{url}}/api/v3/orderList/oco`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `listClientOrderId` | string | No | A unique Id for the entire orderList |
| `side` | string | No | - |
| `quantity` | string | No | - |
| `aboveType` | string | No | - |
| `aboveClientOrderId` | string | No | Arbitrary unique ID among open orders for the above order. Automatically generated if not sent |
| `aboveIcebergQty` | string | No | Note that this can only be used if `aboveTimeInForce` is `GTC`. |
| `abovePrice` | string | No | Can be used if `aboveType` is `STOP_LOSS_LIMIT` , `LIMIT_MAKER`, or `TAKE_PROFIT_LIMIT` to specify the limit price. |
| `aboveStopPrice` | string | No | Can be used if `aboveType` is `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT`. <br>Either `aboveStopPrice` or `aboveTrailingDelta` or both, must be specified. |
| `aboveTrailingDelta` | string | No | See [Trailing Stop order FAQ](faqs/trailing-stop-faq.md). |
| `aboveTimeInForce` | string | No | - |
| `aboveStrategyId` | string | No | Arbitrary numeric value identifying the above order within an order strategy. |
| `aboveStrategyType` | string | No | Arbitrary numeric value identifying the above order strategy. <br>Values smaller than 1000000 are reserved and cannot be used. |
| `abovePegPriceType` | string | No | - |
| `abovePegOffsetType` | string | No | - |
| `abovePegOffsetValue` | string | No | - |
| `belowType` | string | No | - |
| `belowClientOrderId` | string | No | Arbitrary unique ID among open orders for the below order. Automatically generated if not sent |
| `belowIcebergQty` | string | No | Note that this can only be used if `belowTimeInForce` is `GTC`. |
| `belowPrice` | string | No | Can be used if `belowType` is `STOP_LOSS_LIMIT`, `LIMIT_MAKER`, or `TAKE_PROFIT_LIMIT` to specify the limit price. |
| `belowStopPrice` | string | No | Can be used if `belowType` is `STOP_LOSS`, `STOP_LOSS_LIMIT, TAKE_PROFIT` or `TAKE_PROFIT_LIMIT` <br>Either belowStopPrice or belowTrailingDelta or both, must be specified. |
| `belowTrailingDelta` | string | No | See [Trailing Stop order FAQ](faqs/trailing-stop-faq.md). |
| `belowTimeInForce` | string | No | - |
| `belowStrategyId` | string | No | Arbitrary numeric value identifying the below order within an order strategy. |
| `belowStrategyType` | string | No | Arbitrary numeric value identifying the below order strategy. <br>Values smaller than 1000000 are reserved and cannot be used. |
| `belowPegPriceType` | string | No | - |
| `belowPegOffsetType` | string | No | - |
| `belowPegOffsetValue` | string | No | - |
| `newOrderRespType` | string | No | - |
| `selfTradePreventionMode` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### New Order List - OPO

`POST` `{{url}}/api/v3/orderList/opo`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `listClientOrderId` | string | No | A unique Id for the entire orderList |
| `newOrderRespType` | string | No | - |
| `selfTradePreventionMode` | string | No | - |
| `workingType` | string | No | - |
| `workingSide` | string | No | - |
| `workingClientOrderId` | string | No | Arbitrary unique ID among open orders for the working order. Automatically generated if not sent.  |
| `workingPrice` | string | No | - |
| `workingQuantity` | string | No | Sets the quantity for the working order.  |
| `workingIcebergQty` | string | No | This can only be used if `workingTimeInForce` is `GTC`, or if `workingType` is `LIMIT_MAKER`.  |
| `workingTimeInForce` | string | No | - |
| `workingStrategyId` | string | No | Arbitrary numeric value identifying the working order within an order strategy.  |
| `workingStrategyType` | string | No | Arbitrary numeric value identifying the working order strategy. Values smaller than 1000000 are reserved and cannot be used.  |
| `workingPegPriceType` | string | No | - |
| `workingPegOffsetType` | string | No | - |
| `workingPegOffsetValue` | string | No | - |
| `pendingType` | string | No | - |
| `pendingSide` | string | No | - |
| `pendingClientOrderId` | string | No | Arbitrary unique ID among open orders for the pending order. Automatically generated if not sent.  |
| `pendingPrice` | string | No | - |
| `pendingStopPrice` | string | No | - |
| `pendingTrailingDelta` | string | No | - |
| `pendingIcebergQty` | string | No | This can only be used if `pendingTimeInForce` is `GTC` or if `pendingType` is `LIMIT_MAKER`.  |
| `pendingTimeInForce` | string | No | - |
| `pendingStrategyId` | string | No | Arbitrary numeric value identifying the pending order within an order strategy.  |
| `pendingStrategyType` | string | No | Arbitrary numeric value identifying the pending order strategy. Values smaller than 1000000 are reserved and cannot be used.  |
| `pendingPegPriceType` | string | No | - |
| `pendingPegOffsetType` | string | No | - |
| `pendingPegOffsetValue` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### New Order List - OPOCO

`POST` `{{url}}/api/v3/orderList/opoco`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `listClientOrderId` | string | No | A unique Id for the entire orderList |
| `newOrderRespType` | string | No | - |
| `selfTradePreventionMode` | string | No | - |
| `workingType` | string | No | - |
| `workingSide` | string | No | - |
| `workingClientOrderId` | string | No | Arbitrary unique ID among open orders for the working order. Automatically generated if not sent.  |
| `workingPrice` | string | No | - |
| `workingQuantity` | string | No | Sets the quantity for the working order.  |
| `workingIcebergQty` | string | No | This can only be used if `workingTimeInForce` is `GTC`, or if `workingType` is `LIMIT_MAKER`.  |
| `workingTimeInForce` | string | No | - |
| `workingStrategyId` | string | No | Arbitrary numeric value identifying the working order within an order strategy.  |
| `workingStrategyType` | string | No | Arbitrary numeric value identifying the working order strategy. Values smaller than 1000000 are reserved and cannot be used.  |
| `workingPegPriceType` | string | No | - |
| `workingPegOffsetType` | string | No | - |
| `workingPegOffsetValue` | string | No | - |
| `pendingSide` | string | No | - |
| `pendingAboveType` | string | No | - |
| `pendingAboveClientOrderId` | string | No | Arbitrary unique ID among open orders for the pending above order. Automatically generated if not sent.  |
| `pendingAbovePrice` | string | No | Can be used if `pendingAboveType` is `STOP_LOSS_LIMIT` , `LIMIT_MAKER`, or `TAKE_PROFIT_LIMIT` to specify the limit price.  |
| `pendingAboveStopPrice` | string | No | Can be used if `pendingAboveType` is `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT`  |
| `pendingAboveTrailingDelta` | string | No | See [Trailing Stop FAQ](./faqs/trailing-stop-faq.md)  |
| `pendingAboveIcebergQty` | string | No | This can only be used if `pendingAboveTimeInForce` is `GTC` or if `pendingAboveType` is `LIMIT_MAKER`.  |
| `pendingAboveTimeInForce` | string | No | - |
| `pendingAboveStrategyId` | string | No | Arbitrary numeric value identifying the pending above order within an order strategy.  |
| `pendingAboveStrategyType` | string | No | Arbitrary numeric value identifying the pending above order strategy. Values smaller than 1000000 are reserved and cannot be used.  |
| `pendingAbovePegPriceType` | string | No | - |
| `pendingAbovePegOffsetType` | string | No | - |
| `pendingAbovePegOffsetValue` | string | No | - |
| `pendingBelowType` | string | No | - |
| `pendingBelowClientOrderId` | string | No | Arbitrary unique ID among open orders for the pending below order. Automatically generated if not sent.  |
| `pendingBelowPrice` | string | No | Can be used if `pendingBelowType` is `STOP_LOSS_LIMIT` or `TAKE_PROFIT_LIMIT` to specify limit price  |
| `pendingBelowStopPrice` | string | No | Can be used if `pendingBelowType` is `STOP_LOSS`, `STOP_LOSS_LIMIT, TAKE_PROFIT or TAKE_PROFIT_LIMIT`. Either `pendingBelowStopPrice` or `pendingBelowTrailingDelta` or both, must be specified.  |
| `pendingBelowTrailingDelta` | string | No | - |
| `pendingBelowIcebergQty` | string | No | This can only be used if `pendingBelowTimeInForce` is `GTC`, or if `pendingBelowType` is `LIMIT_MAKER`.  |
| `pendingBelowTimeInForce` | string | No | - |
| `pendingBelowStrategyId` | string | No | Arbitrary numeric value identifying the pending below order within an order strategy.  |
| `pendingBelowStrategyType` | string | No | Arbitrary numeric value identifying the pending below order strategy. Values smaller than 1000000 are reserved and cannot be used.  |
| `pendingBelowPegPriceType` | string | No | - |
| `pendingBelowPegOffsetType` | string | No | - |
| `pendingBelowPegOffsetValue` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### New Order list - OTO

`POST` `{{url}}/api/v3/orderList/oto`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `listClientOrderId` | string | No | A unique Id for the entire orderList |
| `newOrderRespType` | string | No | - |
| `selfTradePreventionMode` | string | No | - |
| `workingType` | string | No | - |
| `workingSide` | string | No | - |
| `workingClientOrderId` | string | No | Arbitrary unique ID among open orders for the working order. Automatically generated if not sent.  |
| `workingPrice` | string | No | - |
| `workingQuantity` | string | No | Sets the quantity for the working order.  |
| `workingIcebergQty` | string | No | This can only be used if `workingTimeInForce` is `GTC`, or if `workingType` is `LIMIT_MAKER`.  |
| `workingTimeInForce` | string | No | - |
| `workingStrategyId` | string | No | Arbitrary numeric value identifying the working order within an order strategy.  |
| `workingStrategyType` | string | No | Arbitrary numeric value identifying the working order strategy. Values smaller than 1000000 are reserved and cannot be used.  |
| `workingPegPriceType` | string | No | - |
| `workingPegOffsetType` | string | No | - |
| `workingPegOffsetValue` | string | No | - |
| `pendingType` | string | No | - |
| `pendingSide` | string | No | - |
| `pendingClientOrderId` | string | No | Arbitrary unique ID among open orders for the pending order. Automatically generated if not sent.  |
| `pendingPrice` | string | No | - |
| `pendingStopPrice` | string | No | - |
| `pendingTrailingDelta` | string | No | - |
| `pendingQuantity` | string | No | Sets the quantity for the pending order. |
| `pendingIcebergQty` | string | No | This can only be used if `pendingTimeInForce` is `GTC` or if `pendingType` is `LIMIT_MAKER`.  |
| `pendingTimeInForce` | string | No | - |
| `pendingStrategyId` | string | No | Arbitrary numeric value identifying the pending order within an order strategy.  |
| `pendingStrategyType` | string | No | Arbitrary numeric value identifying the pending order strategy. Values smaller than 1000000 are reserved and cannot be used.  |
| `pendingPegPriceType` | string | No | - |
| `pendingPegOffsetType` | string | No | - |
| `pendingPegOffsetValue` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### New Order list - OTOCO

`POST` `{{url}}/api/v3/orderList/otoco`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `listClientOrderId` | string | No | A unique Id for the entire orderList |
| `newOrderRespType` | string | No | - |
| `selfTradePreventionMode` | string | No | - |
| `workingType` | string | No | - |
| `workingSide` | string | No | - |
| `workingClientOrderId` | string | No | Arbitrary unique ID among open orders for the working order. Automatically generated if not sent.  |
| `workingPrice` | string | No | - |
| `workingQuantity` | string | No | Sets the quantity for the working order.  |
| `workingIcebergQty` | string | No | This can only be used if `workingTimeInForce` is `GTC`, or if `workingType` is `LIMIT_MAKER`.  |
| `workingTimeInForce` | string | No | - |
| `workingStrategyId` | string | No | Arbitrary numeric value identifying the working order within an order strategy.  |
| `workingStrategyType` | string | No | Arbitrary numeric value identifying the working order strategy. Values smaller than 1000000 are reserved and cannot be used.  |
| `workingPegPriceType` | string | No | - |
| `workingPegOffsetType` | string | No | - |
| `workingPegOffsetValue` | string | No | - |
| `pendingSide` | string | No | - |
| `pendingQuantity` | string | No | Sets the quantity for the pending order. |
| `pendingAboveType` | string | No | - |
| `pendingAboveClientOrderId` | string | No | Arbitrary unique ID among open orders for the pending above order. Automatically generated if not sent.  |
| `pendingAbovePrice` | string | No | Can be used if `pendingAboveType` is `STOP_LOSS_LIMIT` , `LIMIT_MAKER`, or `TAKE_PROFIT_LIMIT` to specify the limit price.  |
| `pendingAboveStopPrice` | string | No | Can be used if `pendingAboveType` is `STOP_LOSS`, `STOP_LOSS_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT`  |
| `pendingAboveTrailingDelta` | string | No | See [Trailing Stop FAQ](./faqs/trailing-stop-faq.md)  |
| `pendingAboveIcebergQty` | string | No | This can only be used if `pendingAboveTimeInForce` is `GTC` or if `pendingAboveType` is `LIMIT_MAKER`.  |
| `pendingAboveTimeInForce` | string | No | - |
| `pendingAboveStrategyId` | string | No | Arbitrary numeric value identifying the pending above order within an order strategy.  |
| `pendingAboveStrategyType` | string | No | Arbitrary numeric value identifying the pending above order strategy. Values smaller than 1000000 are reserved and cannot be used.  |
| `pendingAbovePegPriceType` | string | No | - |
| `pendingAbovePegOffsetType` | string | No | - |
| `pendingAbovePegOffsetValue` | string | No | - |
| `pendingBelowType` | string | No | - |
| `pendingBelowClientOrderId` | string | No | Arbitrary unique ID among open orders for the pending below order. Automatically generated if not sent.  |
| `pendingBelowPrice` | string | No | Can be used if `pendingBelowType` is `STOP_LOSS_LIMIT` or `TAKE_PROFIT_LIMIT` to specify limit price  |
| `pendingBelowStopPrice` | string | No | Can be used if `pendingBelowType` is `STOP_LOSS`, `STOP_LOSS_LIMIT, TAKE_PROFIT or TAKE_PROFIT_LIMIT`. Either `pendingBelowStopPrice` or `pendingBelowTrailingDelta` or both, must be specified.  |
| `pendingBelowTrailingDelta` | string | No | - |
| `pendingBelowIcebergQty` | string | No | This can only be used if `pendingBelowTimeInForce` is `GTC`, or if `pendingBelowType` is `LIMIT_MAKER`.  |
| `pendingBelowTimeInForce` | string | No | - |
| `pendingBelowStrategyId` | string | No | Arbitrary numeric value identifying the pending below order within an order strategy.  |
| `pendingBelowStrategyType` | string | No | Arbitrary numeric value identifying the pending below order strategy. Values smaller than 1000000 are reserved and cannot be used.  |
| `pendingBelowPegPriceType` | string | No | - |
| `pendingBelowPegOffsetType` | string | No | - |
| `pendingBelowPegOffsetValue` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### New order using SOR

`POST` `{{url}}/api/v3/sor/order`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `side` | string | No | - |
| `type` | string | No | - |
| `timeInForce` | string | No | - |
| `quantity` | string | No | - |
| `price` | string | No | - |
| `newClientOrderId` | string | No | A unique id among open orders. Automatically generated if not sent.<br/> Orders with the same `newClientOrderID` can be accepted only when the previous one is filled, otherwise the order will be rejected. |
| `strategyId` | string | No | - |
| `strategyType` | string | No | The value cannot be less than `1000000`. |
| `icebergQty` | string | No | Used with `LIMIT`, `STOP_LOSS_LIMIT`, and `TAKE_PROFIT_LIMIT` to create an iceberg order. |
| `newOrderRespType` | string | No | - |
| `selfTradePreventionMode` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Test new order using SOR

`POST` `{{url}}/api/v3/sor/order/test`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `computeCommissionRates` | string | No | Default: `false` <br> See [Commissions FAQ](faqs/commission_faq.md#test-order-diferences) to learn more. |
| `symbol` | string | No | - |
| `side` | string | No | - |
| `type` | string | No | - |
| `timeInForce` | string | No | - |
| `quantity` | string | No | - |
| `price` | string | No | - |
| `newClientOrderId` | string | No | A unique id among open orders. Automatically generated if not sent.<br/> Orders with the same `newClientOrderID` can be accepted only when the previous one is filled, otherwise the order will be rejected. |
| `strategyId` | string | No | - |
| `strategyType` | string | No | The value cannot be less than `1000000`. |
| `icebergQty` | string | No | Used with `LIMIT`, `STOP_LOSS_LIMIT`, and `TAKE_PROFIT_LIMIT` to create an iceberg order. |
| `newOrderRespType` | string | No | - |
| `selfTradePreventionMode` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than `60000`. <br> Supports up to three decimal places of precision (e.g., 6000.346) so that microseconds may be specified. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## General

### Exchange information

`GET` `{{url}}/api/v3/exchangeInfo`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Symbol to query |
| `symbols` | string | Yes | List of symbols to query |
| `permissions` | string | Yes | List of permissions to query |
| `showPermissionSets` | string | No | Controls whether the content of the `permissionSets` field is populated or not. Defaults to `true` |
| `symbolStatus` | string | No | - |

**Request Body:**

---

### Test connectivity

`GET` `{{url}}/api/v3/ping`

**Request Body:**

---

### Check server time

`GET` `{{url}}/api/v3/time`

**Request Body:**

---

## Market

### Compressed/Aggregate trades list

`GET` `{{url}}/api/v3/aggTrades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `fromId` | string | No | ID to get aggregate trades from INCLUSIVE. |
| `startTime` | string | No | Timestamp in ms to get aggregate trades from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get aggregate trades until INCLUSIVE. |
| `limit` | string | No | Default: 500; Maximum: 1000. |

**Request Body:**

---

### Current average price

`GET` `{{url}}/api/v3/avgPrice`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |

**Request Body:**

---

### Order book

`GET` `{{url}}/api/v3/depth`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `limit` | string | No | Default: 500; Maximum: 1000. |
| `symbolStatus` | string | No | - |

**Request Body:**

---

### Old trade lookup

`GET` `{{url}}/api/v3/historicalTrades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `limit` | string | No | Default: 500; Maximum: 1000. |
| `fromId` | string | No | ID to get aggregate trades from INCLUSIVE. |

**Request Body:**

---

### Kline/Candlestick data

`GET` `{{url}}/api/v3/klines`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `interval` | string | No | - |
| `startTime` | string | No | Timestamp in ms to get aggregate trades from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get aggregate trades until INCLUSIVE. |
| `timeZone` | string | No | Default: 0 (UTC) |
| `limit` | string | No | Default: 500; Maximum: 1000. |

**Request Body:**

---

### Rolling window price change statistics

`GET` `{{url}}/api/v3/ticker`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Symbol to query |
| `symbols` | string | Yes | List of symbols to query |
| `windowSize` | string | No | - |
| `type` | string | No | - |
| `symbolStatus` | string | No | - |

**Request Body:**

---

### 24hr ticker price change statistics

`GET` `{{url}}/api/v3/ticker/24hr`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Symbol to query |
| `symbols` | string | Yes | List of symbols to query |
| `type` | string | No | - |
| `symbolStatus` | string | No | - |

**Request Body:**

---

### Symbol order book ticker

`GET` `{{url}}/api/v3/ticker/bookTicker`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Symbol to query |
| `symbols` | string | Yes | List of symbols to query |
| `symbolStatus` | string | No | - |

**Request Body:**

---

### Symbol price ticker

`GET` `{{url}}/api/v3/ticker/price`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Symbol to query |
| `symbols` | string | Yes | List of symbols to query |
| `symbolStatus` | string | No | - |

**Request Body:**

---

### Trading Day Ticker

`GET` `{{url}}/api/v3/ticker/tradingDay`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | Symbol to query |
| `symbols` | string | Yes | List of symbols to query |
| `timeZone` | string | No | Default: 0 (UTC) |
| `type` | string | No | - |
| `symbolStatus` | string | No | - |

**Request Body:**

---

### Recent trades list

`GET` `{{url}}/api/v3/trades`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `limit` | string | No | Default: 500; Maximum: 1000. |

**Request Body:**

---

### UIKlines

`GET` `{{url}}/api/v3/uiKlines`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `interval` | string | No | - |
| `startTime` | string | No | Timestamp in ms to get aggregate trades from INCLUSIVE. |
| `endTime` | string | No | Timestamp in ms to get aggregate trades until INCLUSIVE. |
| `timeZone` | string | No | Default: 0 (UTC) |
| `limit` | string | No | Default: 500; Maximum: 1000. |

**Request Body:**

---

