# Binance Dual Investment REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 5

---

## Trade

### Check Dual Investment accounts(USER_DATA)

`GET` `{{url}}/sapi/v1/dci/product/accounts`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | The value cannot be greater than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Change Auto-Compound status(USER_DATA)

`POST` `{{url}}/sapi/v1/dci/product/auto_compound/edit-status`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `positionId` | string | No | Get positionId from `/sapi/v1/dci/product/positions` |
| `autoCompoundPlan` | string | No | - |
| `recvWindow` | string | No | The value cannot be greater than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Dual Investment positions(USER_DATA)

`GET` `{{url}}/sapi/v1/dci/product/positions`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | No | `PENDING`:Products are purchasing, will give results later;`PURCHASE_SUCCESS`:purchase successfully;`SETTLED`: Products are finish settling;`PURCHASE_FAIL`:fail to purchase;`REFUNDING`:refund ongoing;`REFUND_SUCCESS`:refund to spot account successfully; `SETTLING`:Products are settling. If don't fill this field, will response all the position status. |
| `pageSize` | string | No | Default: 10, Maximum: 100 |
| `pageIndex` | string | No | Default: 1 |
| `recvWindow` | string | No | The value cannot be greater than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Subscribe Dual Investment products(USER_DATA)

`POST` `{{url}}/sapi/v1/dci/product/subscribe`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | No | get id from `/sapi/v1/dci/product/list` |
| `orderId` | string | No | get orderId from `/sapi/v1/dci/product/list` |
| `depositAmount` | string | No | the amount for subscribing |
| `autoCompoundPlan` | string | No | `NONE`: switch off the plan, `STANDARD`:standard plan,`ADVANCED`:advanced plan |
| `recvWindow` | string | No | The value cannot be greater than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Market-Data

### Get Dual Investment product list

`GET` `{{url}}/sapi/v1/dci/product/list`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `optionType` | string | No | Input CALL or PUT |
| `exercisedCoin` | string | No | Target exercised asset, e.g.: if you subscribe to a high sell product (call option), you should input: `optionType`:CALL,`exercisedCoin`:USDT,`investCoin`:BNB; if you subscribe to a low buy product (put option), you should input: `optionType`:PUT,`exercisedCoin`:BNB,`investCoin`:USDT |
| `investCoin` | string | No | Asset used for subscribing, e.g.: if you subscribe to a high sell product (call option), you should input: `optionType`:CALL,`exercisedCoin`:USDT,`investCoin`:BNB; if you subscribe to a low buy product (put option), you should input: `optionType`:PUT,`exercisedCoin`:BNB,`investCoin`:USDT |
| `pageSize` | string | No | Default: 10, Maximum: 100 |
| `pageIndex` | string | No | Default: 1 |
| `recvWindow` | string | No | The value cannot be greater than 60000 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

