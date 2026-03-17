# Binance Copy Trading REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 2

---

## Future-Copy-Trading

### Get Futures Lead Trading Symbol Whitelist(USER_DATA)

`GET` `{{url}}/sapi/v1/copyTrading/futures/leadSymbol`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Futures Lead Trader Status(TRADE)

`GET` `{{url}}/sapi/v1/copyTrading/futures/userStatus`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

