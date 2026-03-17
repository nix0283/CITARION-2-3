# Binance Derivatives Trading Portfolio Margin Pro REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 21

---

## Account

### Get Portfolio Margin Pro Account Info(USER_DATA)

`GET` `{{url}}/sapi/v1/portfolio/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Fund Collection by Asset(USER_DATA)

`POST` `{{url}}/sapi/v1/portfolio/asset-collection`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | `LDUSDT` and `RWUSD` |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Fund Auto-collection(USER_DATA)

`POST` `{{url}}/sapi/v1/portfolio/auto-collection`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Portfolio Margin Pro Account Balance(USER_DATA)

`GET` `{{url}}/sapi/v1/portfolio/balance`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### BNB transfer(USER_DATA)

`POST` `{{url}}/sapi/v1/portfolio/bnb-transfer`

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

### Get Delta Mode Status(USER_DATA)

`GET` `{{url}}/sapi/v1/portfolio/delta-mode`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Switch Delta Mode(TRADE)

`POST` `{{url}}/sapi/v1/portfolio/delta-mode`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `deltaEnabled` | string | No | `true` to enable Delta mode; `false` to disable Delta mode |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Transferable Earn Asset Balance for Portfolio Margin (USER_DATA)

`GET` `{{url}}/sapi/v1/portfolio/earn-asset-balance`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | `LDUSDT` and `RWUSD` |
| `transferType` | string | No | `EARN_TO_FUTURE` /`FUTURE_TO_EARN` |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Transfer LDUSDT/RWUSD for Portfolio Margin(TRADE)

`POST` `{{url}}/sapi/v1/portfolio/earn-asset-transfer`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | `LDUSDT` and `RWUSD` |
| `transferType` | string | No | `EARN_TO_FUTURE` /`FUTURE_TO_EARN` |
| `amount` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Portfolio Margin Pro Negative Balance Interest History(USER_DATA)

`GET` `{{url}}/sapi/v1/portfolio/interest-history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `size` | string | No | Default:10 Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Portfolio Margin Pro Bankruptcy Loan Amount(USER_DATA)

`GET` `{{url}}/sapi/v1/portfolio/pmLoan`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Portfolio Margin Pro Bankruptcy Loan Repay History(USER_DATA)

`GET` `{{url}}/sapi/v1/portfolio/pmloan-history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10 Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Portfolio Margin Pro Bankruptcy Loan Repay

`POST` `{{url}}/sapi/v1/portfolio/repay`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `from` | string | No | SPOT or MARGIN，default SPOT |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Repay futures Negative Balance(USER_DATA)

`POST` `{{url}}/sapi/v1/portfolio/repay-futures-negative-balance`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `from` | string | No | SPOT or MARGIN，default SPOT |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Change Auto-repay-futures Status(TRADE)

`POST` `{{url}}/sapi/v1/portfolio/repay-futures-switch`

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

`GET` `{{url}}/sapi/v1/portfolio/repay-futures-switch`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Portfolio Margin Pro SPAN Account Info(USER_DATA)

`GET` `{{url}}/sapi/v2/portfolio/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Market-Data

### Query Portfolio Margin Asset Index Price (MARKET_DATA)

`GET` `{{url}}/sapi/v1/portfolio/asset-index-price`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |

**Request Body:**

---

### Portfolio Margin Collateral Rate(MARKET_DATA)

`GET` `{{url}}/sapi/v1/portfolio/collateralRate`

**Request Body:**

---

### Get Portfolio Margin Asset Leverage(USER_DATA)

`GET` `{{url}}/sapi/v1/portfolio/margin-asset-leverage`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Portfolio Margin Pro Tiered Collateral Rate(USER_DATA)

`GET` `{{url}}/sapi/v2/portfolio/collateralRate`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

