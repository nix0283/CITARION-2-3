# Binance Fiat REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 5

---

## Fiat

### Deposit(TRADE)

`POST` `{{url}}/sapi/v1/fiat/deposit`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Order Detail(USER_DATA)

`GET` `{{url}}/sapi/v1/fiat/get-order-detail`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderNo` | string | No | order id retrieved from the api call of withdrawal |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Fiat Deposit/Withdraw History (USER_DATA)

`GET` `{{url}}/sapi/v1/fiat/orders`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `transactionType` | string | No | 0-buy,1-sell |
| `beginTime` | string | No | - |
| `endTime` | string | No | - |
| `page` | string | No | default 1 |
| `rows` | string | No | default 100, max 500 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Fiat Payments History (USER_DATA)

`GET` `{{url}}/sapi/v1/fiat/payments`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `transactionType` | string | No | 0-buy,1-sell |
| `beginTime` | string | No | - |
| `endTime` | string | No | - |
| `page` | string | No | default 1 |
| `rows` | string | No | default 100, max 500 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Fiat Withdraw(WITHDRAW)

`POST` `{{url}}/sapi/v2/fiat/withdraw`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

