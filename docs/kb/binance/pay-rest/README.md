# Binance Pay REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 1

---

## Pay

### Get Pay Trade History

`GET` `{{url}}/sapi/v1/pay/transactions`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | default 100, max 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

