# Binance C2C REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 1

---

## C2C

### Get C2C Trade History (USER_DATA)

`GET` `{{url}}/sapi/v1/c2c/orderMatch/listUserOrderHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tradeType` | string | No | BUY, SELL |
| `startTimestamp` | string | No | - |
| `endTimestamp` | string | No | - |
| `page` | string | No | Default 1 |
| `rows` | string | No | default 100, max 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

