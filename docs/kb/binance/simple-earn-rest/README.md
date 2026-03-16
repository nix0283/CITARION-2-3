# Binance Simple Earn REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 40

---

## Bfusd

### Get BFUSD Account (USER_DATA)

`GET` `{{url}}/sapi/v1/bfusd/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get BFUSD Rate History (USER_DATA)

`GET` `{{url}}/sapi/v1/bfusd/history/rateHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get BFUSD Redemption History (USER_DATA)

`GET` `{{url}}/sapi/v1/bfusd/history/redemptionHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get BFUSD Rewards History (USER_DATA)

`GET` `{{url}}/sapi/v1/bfusd/history/rewardsHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get BFUSD subscription history(USER_DATA)

`GET` `{{url}}/sapi/v1/bfusd/history/subscriptionHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | USDC or USDT |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get BFUSD Quota Details (USER_DATA)

`GET` `{{url}}/sapi/v1/bfusd/quota`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Redeem BFUSD(TRADE)

`POST` `{{url}}/sapi/v1/bfusd/redeem`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | string | No | Amount |
| `type` | string | No | FAST or STANDARD, defaults to STANDARD |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Subscribe BFUSD(TRADE)

`POST` `{{url}}/sapi/v1/bfusd/subscribe`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | USDT or USDC (whichever is eligible) |
| `amount` | string | No | Amount |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Flexible-Locked

### Simple Account(USER_DATA)

`GET` `{{url}}/sapi/v1/simple-earn/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Collateral Record(USER_DATA)

`GET` `{{url}}/sapi/v1/simple-earn/flexible/history/collateralRecord`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `productId` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Rate History(USER_DATA)

`GET` `{{url}}/sapi/v1/simple-earn/flexible/history/rateHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `productId` | string | No | - |
| `aprPeriod` | string | No | "DAY","YEAR",default"DAY" |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Flexible Redemption Record(USER_DATA)

`GET` `{{url}}/sapi/v1/simple-earn/flexible/history/redemptionRecord`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `productId` | string | No | - |
| `redeemId` | string | No | - |
| `asset` | string | No | USDC or USDT |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Flexible Rewards History(USER_DATA)

`GET` `{{url}}/sapi/v1/simple-earn/flexible/history/rewardsRecord`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `productId` | string | No | - |
| `asset` | string | No | USDC or USDT |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `type` | string | No | FAST or STANDARD, defaults to STANDARD |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Flexible Subscription Record(USER_DATA)

`GET` `{{url}}/sapi/v1/simple-earn/flexible/history/subscriptionRecord`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `productId` | string | No | - |
| `purchaseId` | string | No | - |
| `asset` | string | No | USDC or USDT |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Simple Earn Flexible Product List(USER_DATA)

`GET` `{{url}}/sapi/v1/simple-earn/flexible/list`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | USDC or USDT |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Flexible Personal Left Quota(USER_DATA)

`GET` `{{url}}/sapi/v1/simple-earn/flexible/personalLeftQuota`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `productId` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Flexible Product Position(USER_DATA)

`GET` `{{url}}/sapi/v1/simple-earn/flexible/position`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | USDC or USDT |
| `productId` | string | No | - |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Redeem Flexible Product(TRADE)

`POST` `{{url}}/sapi/v1/simple-earn/flexible/redeem`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `productId` | string | No | - |
| `redeemAll` | string | No | true or false, default to false |
| `amount` | string | No | if redeemAll is false, amount is mandatory |
| `destAccount` | string | No | `SPOT`,`FUND`, default `SPOT` |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Set Flexible Auto Subscribe(USER_DATA)

`POST` `{{url}}/sapi/v1/simple-earn/flexible/setAutoSubscribe`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `productId` | string | No | - |
| `autoSubscribe` | string | No | true or false |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Subscribe Flexible Product(TRADE)

`POST` `{{url}}/sapi/v1/simple-earn/flexible/subscribe`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `productId` | string | No | - |
| `amount` | string | No | Amount |
| `autoSubscribe` | string | No | true or false, default true. |
| `sourceAccount` | string | No | `SPOT`,`FUND`,`ALL`, default `SPOT` |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Flexible Subscription Preview(USER_DATA)

`GET` `{{url}}/sapi/v1/simple-earn/flexible/subscriptionPreview`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `productId` | string | No | - |
| `amount` | string | No | Amount |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Locked Redemption Record(USER_DATA)

`GET` `{{url}}/sapi/v1/simple-earn/locked/history/redemptionRecord`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `positionId` | string | No | - |
| `redeemId` | string | No | - |
| `asset` | string | No | USDC or USDT |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Locked Rewards History(USER_DATA)

`GET` `{{url}}/sapi/v1/simple-earn/locked/history/rewardsRecord`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `positionId` | string | No | - |
| `asset` | string | No | USDC or USDT |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Locked Subscription Record(USER_DATA)

`GET` `{{url}}/sapi/v1/simple-earn/locked/history/subscriptionRecord`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `purchaseId` | string | No | - |
| `asset` | string | No | USDC or USDT |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Simple Earn Locked Product List(USER_DATA)

`GET` `{{url}}/sapi/v1/simple-earn/locked/list`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | USDC or USDT |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Locked Personal Left Quota(USER_DATA)

`GET` `{{url}}/sapi/v1/simple-earn/locked/personalLeftQuota`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Locked Product Position

`GET` `{{url}}/sapi/v1/simple-earn/locked/position`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | USDC or USDT |
| `positionId` | string | No | - |
| `projectId` | string | No | - |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Redeem Locked Product(TRADE)

`POST` `{{url}}/sapi/v1/simple-earn/locked/redeem`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `positionId` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Set Locked Auto Subscribe(USER_DATA)

`POST` `{{url}}/sapi/v1/simple-earn/locked/setAutoSubscribe`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `positionId` | string | No | - |
| `autoSubscribe` | string | No | true or false |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Set Locked Product Redeem Option(USER_DATA)

`POST` `{{url}}/sapi/v1/simple-earn/locked/setRedeemOption`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `positionId` | string | No | - |
| `redeemTo` | string | No | `SPOT`,'FLEXIBLE' |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Subscribe Locked Product(TRADE)

`POST` `{{url}}/sapi/v1/simple-earn/locked/subscribe`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | string | No | - |
| `amount` | string | No | Amount |
| `autoSubscribe` | string | No | true or false, default true. |
| `sourceAccount` | string | No | `SPOT`,`FUND`,`ALL`, default `SPOT` |
| `redeemTo` | string | No | `SPOT`,`FLEXIBLE`, default `SPOT` |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Locked Subscription Preview(USER_DATA)

`GET` `{{url}}/sapi/v1/simple-earn/locked/subscriptionPreview`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | string | No | - |
| `amount` | string | No | Amount |
| `autoSubscribe` | string | No | true or false, default true. |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Rwusd

### Get RWUSD Account (USER_DATA)

`GET` `{{url}}/sapi/v1/rwusd/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get RWUSD Rate History (USER_DATA)

`GET` `{{url}}/sapi/v1/rwusd/history/rateHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get RWUSD Redemption History (USER_DATA)

`GET` `{{url}}/sapi/v1/rwusd/history/redemptionHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get RWUSD Rewards History (USER_DATA)

`GET` `{{url}}/sapi/v1/rwusd/history/rewardsHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get RWUSD subscription history(USER_DATA)

`GET` `{{url}}/sapi/v1/rwusd/history/subscriptionHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | USDC or USDT |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Starts from 1. Default: 1 |
| `size` | string | No | Number of results per page. Default: 10, Max: 100 |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get RWUSD Quota Details (USER_DATA)

`GET` `{{url}}/sapi/v1/rwusd/quota`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Redeem RWUSD(TRADE)

`POST` `{{url}}/sapi/v1/rwusd/redeem`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | string | No | Amount |
| `type` | string | No | FAST or STANDARD, defaults to STANDARD |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Subscribe RWUSD(TRADE)

`POST` `{{url}}/sapi/v1/rwusd/subscribe`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | USDT or USDC (whichever is eligible) |
| `amount` | string | No | Amount |
| `recvWindow` | string | No | The value cannot be greater than 60000 (ms) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

