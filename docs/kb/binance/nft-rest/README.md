# Binance NFT REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 4

---

## NFT

### Get NFT Deposit History(USER_DATA)

`GET` `{{url}}/sapi/v1/nft/history/deposit`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 50, Max 50 |
| `page` | string | No | Default 1 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get NFT Transaction History(USER_DATA)

`GET` `{{url}}/sapi/v1/nft/history/transactions`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `orderType` | string | No | 0: purchase order, 1: sell order, 2: royalty income, 3: primary market order, 4: mint fee |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 50, Max 50 |
| `page` | string | No | Default 1 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get NFT Withdraw History(USER_DATA)

`GET` `{{url}}/sapi/v1/nft/history/withdraw`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default 50, Max 50 |
| `page` | string | No | Default 1 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get NFT Asset(USER_DATA)

`GET` `{{url}}/sapi/v1/nft/user/getAsset`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | string | No | Default 50, Max 50 |
| `page` | string | No | Default 1 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

