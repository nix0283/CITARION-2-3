# Binance Crypto Loan REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 17

---

## Stable-Rate

### Get Loan Borrow History(USER_DATA)

`GET` `{{url}}/sapi/v1/loan/borrow/history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderId` | string | No | orderId in `POST /sapi/v1/loan/borrow` |
| `loanCoin` | string | No | - |
| `collateralCoin` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Current querying page. Start from 1; default: 1; max: 1000 |
| `limit` | string | No | Default: 10; max: 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Crypto Loans Income History(USER_DATA)

`GET` `{{url}}/sapi/v1/loan/income`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `type` | string | No | All types will be returned by default. Enum：`borrowIn` ,`collateralSpent`, `repayAmount`, `collateralReturn`(Collateral return after repayment), `addCollateral`, `removeCollateral`, `collateralReturnAfterLiquidation` |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default: 10; max: 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Loan LTV Adjustment History(USER_DATA)

`GET` `{{url}}/sapi/v1/loan/ltv/adjustment/history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderId` | string | No | orderId in `POST /sapi/v1/loan/borrow` |
| `loanCoin` | string | No | - |
| `collateralCoin` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Current querying page. Start from 1; default: 1; max: 1000 |
| `limit` | string | No | Default: 10; max: 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Check Collateral Repay Rate(USER_DATA)

`GET` `{{url}}/sapi/v1/loan/repay/collateral/rate`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `loanCoin` | string | No | - |
| `collateralCoin` | string | No | - |
| `repayAmount` | string | No | repay amount of loanCoin |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Loan Repayment History(USER_DATA)

`GET` `{{url}}/sapi/v1/loan/repay/history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderId` | string | No | orderId in `POST /sapi/v1/loan/borrow` |
| `loanCoin` | string | No | - |
| `collateralCoin` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Current querying page. Start from 1; default: 1; max: 1000 |
| `limit` | string | No | Default: 10; max: 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Flexible-Rate

### Flexible Loan Adjust LTV(TRADE)

`POST` `{{url}}/sapi/v2/loan/flexible/adjust/ltv`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `loanCoin` | string | No | - |
| `collateralCoin` | string | No | - |
| `adjustmentAmount` | string | No | - |
| `direction` | string | No | "ADDITIONAL", "REDUCED" |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Flexible Loan Borrow(TRADE)

`POST` `{{url}}/sapi/v2/loan/flexible/borrow`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `loanCoin` | string | No | - |
| `loanAmount` | string | No | Mandatory when collateralAmount is empty |
| `collateralCoin` | string | No | - |
| `collateralAmount` | string | No | Mandatory when loanAmount is empty |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Flexible Loan Borrow History(USER_DATA)

`GET` `{{url}}/sapi/v2/loan/flexible/borrow/history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `loanCoin` | string | No | - |
| `collateralCoin` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Current querying page. Start from 1; default: 1; max: 1000 |
| `limit` | string | No | Default: 10; max: 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Flexible Loan Collateral Assets Data(USER_DATA)

`GET` `{{url}}/sapi/v2/loan/flexible/collateral/data`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `collateralCoin` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Flexible Loan Liquidation History (USER_DATA)

`GET` `{{url}}/sapi/v2/loan/flexible/liquidation/history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `loanCoin` | string | No | - |
| `collateralCoin` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Current querying page. Start from 1; default: 1; max: 1000 |
| `limit` | string | No | Default: 10; max: 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Flexible Loan Assets Data(USER_DATA)

`GET` `{{url}}/sapi/v2/loan/flexible/loanable/data`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `loanCoin` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Flexible Loan LTV Adjustment History(USER_DATA)

`GET` `{{url}}/sapi/v2/loan/flexible/ltv/adjustment/history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `loanCoin` | string | No | - |
| `collateralCoin` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Current querying page. Start from 1; default: 1; max: 1000 |
| `limit` | string | No | Default: 10; max: 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Flexible Loan Ongoing Orders(USER_DATA)

`GET` `{{url}}/sapi/v2/loan/flexible/ongoing/orders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `loanCoin` | string | No | - |
| `collateralCoin` | string | No | - |
| `current` | string | No | Current querying page. Start from 1; default: 1; max: 1000 |
| `limit` | string | No | Default: 10; max: 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Flexible Loan Repay(TRADE)

`POST` `{{url}}/sapi/v2/loan/flexible/repay`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `loanCoin` | string | No | - |
| `collateralCoin` | string | No | - |
| `repayAmount` | string | No | repay amount of loanCoin |
| `collateralReturn` | string | No | Default: TRUE. TRUE: Return extra collateral to spot account; FALSE: Keep extra collateral in the order, and lower LTV. |
| `fullRepayment` | string | No | Default: FALSE. TRUE: Full repayment; FALSE: Partial repayment, based on loanAmount |
| `repaymentType` | string | No | Default: 1. 1: Repayment with loan asset; 2: Repayment with collateral |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Flexible Loan Repayment History(USER_DATA)

`GET` `{{url}}/sapi/v2/loan/flexible/repay/history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `loanCoin` | string | No | - |
| `collateralCoin` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Current querying page. Start from 1; default: 1; max: 1000 |
| `limit` | string | No | Default: 10; max: 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Check Collateral Repay Rate (USER_DATA)

`GET` `{{url}}/sapi/v2/loan/flexible/repay/rate`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `loanCoin` | string | No | - |
| `collateralCoin` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Flexible Loan Interest Rate History (USER_DATA)

`GET` `{{url}}/sapi/v2/loan/interestRateHistory`

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

