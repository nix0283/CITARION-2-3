# Binance Rebate REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 1

---

## Rebate

### Get Spot Rebate History Records (USER_DATA)

`GET` `{{url}}/sapi/v1/rebate/taxQuery`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `page` | string | No | Default 1 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

