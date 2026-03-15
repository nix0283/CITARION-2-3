# Binance Mining REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 13

---

## Mining

### Hashrate Resale Request(USER_DATA)

`POST` `{{url}}/sapi/v1/mining/hash-transfer/config`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userName` | string | No | Mining account test |
| `algo` | string | No | Algorithm(sha256) sha256 |
| `endDate` | string | No | Resale End Time (Millisecond timestamp) 1617659086000 |
| `startDate` | string | No | Resale Start Time(Millisecond timestamp) 1607659086000 |
| `toPoolUser` | string | No | Mining Account S19pro |
| `hashRate` | string | No | Resale hashrate h/s must be transferred (BTC is greater than 500000000000 ETH is greater than 500000) 100000000 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Cancel hashrate resale configuration(USER_DATA)

`POST` `{{url}}/sapi/v1/mining/hash-transfer/config/cancel`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `configId` | string | No | Mining ID 168 |
| `userName` | string | No | Mining account test |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Hashrate Resale List

`GET` `{{url}}/sapi/v1/mining/hash-transfer/config/details/list`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pageIndex` | string | No | Page number, empty default first page, starting from 1  |
| `pageSize` | string | No | Min 10,Max 200  |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Hashrate Resale Detail(USER_DATA)

`GET` `{{url}}/sapi/v1/mining/hash-transfer/profit/details`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `configId` | string | No | Mining ID 168 |
| `pageIndex` | string | No | Page number, empty default first page, starting from 1  |
| `pageSize` | string | No | Min 10,Max 200  |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Earnings List(USER_DATA)

`GET` `{{url}}/sapi/v1/mining/payment/list`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `algo` | string | No | Algorithm(sha256) sha256 |
| `userName` | string | No | Mining account test |
| `coin` | string | No | Coin Name  |
| `startDate` | string | No | Millisecond timestamp  |
| `endDate` | string | No | Millisecond timestamp  |
| `pageIndex` | string | No | Page number, empty default first page, starting from 1  |
| `pageSize` | string | No | Min 10,Max 200  |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Extra Bonus List(USER_DATA)

`GET` `{{url}}/sapi/v1/mining/payment/other`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `algo` | string | No | Algorithm(sha256) sha256 |
| `userName` | string | No | Mining account test |
| `coin` | string | No | Coin Name  |
| `startDate` | string | No | Millisecond timestamp  |
| `endDate` | string | No | Millisecond timestamp  |
| `pageIndex` | string | No | Page number, empty default first page, starting from 1  |
| `pageSize` | string | No | Min 10,Max 200  |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Mining Account Earning(USER_DATA)

`GET` `{{url}}/sapi/v1/mining/payment/uid`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `algo` | string | No | Algorithm(sha256) sha256 |
| `startDate` | string | No | Millisecond timestamp  |
| `endDate` | string | No | Millisecond timestamp  |
| `pageIndex` | string | No | Page number, empty default first page, starting from 1  |
| `pageSize` | string | No | Min 10,Max 200  |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Acquiring Algorithm(MARKET_DATA)

`GET` `{{url}}/sapi/v1/mining/pub/algoList`

**Request Body:**

---

### Acquiring CoinName(MARKET_DATA)

`GET` `{{url}}/sapi/v1/mining/pub/coinList`

**Request Body:**

---

### Account List(USER_DATA)

`GET` `{{url}}/sapi/v1/mining/statistics/user/list`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `algo` | string | No | Algorithm(sha256) sha256 |
| `userName` | string | No | Mining account test |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Statistic List(USER_DATA)

`GET` `{{url}}/sapi/v1/mining/statistics/user/status`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `algo` | string | No | Algorithm(sha256) sha256 |
| `userName` | string | No | Mining account test |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Request for Detail Miner List(USER_DATA)

`GET` `{{url}}/sapi/v1/mining/worker/detail`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `algo` | string | No | Algorithm(sha256) sha256 |
| `userName` | string | No | Mining account test |
| `workerName` | string | No | Miner’s name(required) bhdc1.16A10404B |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Request for Miner List(USER_DATA)

`GET` `{{url}}/sapi/v1/mining/worker/list`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `algo` | string | No | Algorithm(sha256) sha256 |
| `userName` | string | No | Mining account test |
| `pageIndex` | string | No | Page number, empty default first page, starting from 1  |
| `sort` | string | No | sort sequence(default=0)0 positive sequence，1 negative sequence |
| `sortColumn` | string | No | Sort by( default 1): <br></br>1: miner name, <br></br>2: real-time computing power, <br></br>3: daily average computing power, <br></br>4: real-time rejection rate, <br></br>5: last submission time |
| `workerStatus` | string | No | miners status(default=0),0 all，1 valid，2 invalid，3 failure |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

