# Binance VIP Loan REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 11

---

## Trade

### VIP Loan Borrow(TRADE)

`POST` `{{url}}/sapi/v1/loan/vip/borrow`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `loanAccountId` | string | No | - |
| `loanCoin` | string | No | - |
| `loanAmount` | string | No | - |
| `collateralAccountId` | string | No | Multiple split by `,` |
| `collateralCoin` | string | No | Multiple split by `,` |
| `isFlexibleRate` | string | No | Default: TRUE. TRUE : flexible rate; FALSE: fixed rate |
| `loanTerm` | string | No | Mandatory for fixed rate. Optional for fixed interest rate. Eg: 30/60 days |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### VIP Loan Renew(TRADE)

`POST` `{{url}}/sapi/v1/loan/vip/renew`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderId` | string | No | - |
| `loanTerm` | string | No | 30/60 days |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### VIP Loan Repay(TRADE)

`POST` `{{url}}/sapi/v1/loan/vip/repay`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderId` | string | No | - |
| `amount` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## User-Information

### Get VIP Loan Accrued Interest (USER_DATA)

`GET` `{{url}}/sapi/v1/loan/vip/accruedInterest`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderId` | string | No | - |
| `loanCoin` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Current querying page. Start from 1; default: 1; max: 1000 |
| `limit` | string | No | Default: 10; max: 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Check VIP Loan Collateral Account (USER_DATA)

`GET` `{{url}}/sapi/v1/loan/vip/collateral/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderId` | string | No | - |
| `collateralAccountId` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get VIP Loan Ongoing Orders(USER_DATA)

`GET` `{{url}}/sapi/v1/loan/vip/ongoing/orders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderId` | string | No | - |
| `collateralAccountId` | string | No | - |
| `loanCoin` | string | No | - |
| `collateralCoin` | string | No | - |
| `current` | string | No | Current querying page. Start from 1; default: 1; max: 1000 |
| `limit` | string | No | Default: 10; max: 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Application Status(USER_DATA)

`GET` `{{url}}/sapi/v1/loan/vip/request/data`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `current` | string | No | Current querying page. Start from 1; default: 1; max: 1000 |
| `limit` | string | No | Default: 10; max: 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Market-Data

### Get Collateral Asset Data(USER_DATA)

`GET` `{{url}}/sapi/v1/loan/vip/collateral/data`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collateralCoin` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get VIP Loan Interest Rate History (USER_DATA)

`GET` `{{url}}/sapi/v1/loan/vip/interestRateHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `coin` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Current querying page. Start from 1; default: 1; max: 1000 |
| `limit` | string | No | Default: 10; max: 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Loanable Assets Data(USER_DATA)

`GET` `{{url}}/sapi/v1/loan/vip/loanable/data`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `loanCoin` | string | No | - |
| `vipLevel` | string | No | default:user's vip level |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Borrow Interest Rate(USER_DATA)

`GET` `{{url}}/sapi/v1/loan/vip/request/interestRate`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `loanCoin` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

