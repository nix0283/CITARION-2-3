# Binance Gift Card REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 6

---

## Market-Data

### Create a dual-token gift card(fixed value, discount feature)(TRADE)

`POST` `{{url}}/sapi/v1/giftcard/buyCode`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `baseToken` | string | No | The token you want to pay, example: BUSD |
| `faceToken` | string | No | The token you want to buy, example: BNB. If faceToken = baseToken, it's the same as createCode endpoint. |
| `baseTokenAmount` | string | No | The base token asset quantity, example : 1.002 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Fetch Token Limit(USER_DATA)

`GET` `{{url}}/sapi/v1/giftcard/buyCode/token-limit`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `baseToken` | string | No | The token you want to pay, example: BUSD |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Create a single-token gift card (USER_DATA)

`POST` `{{url}}/sapi/v1/giftcard/createCode`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | string | No | The token type contained in the Binance Gift Card |
| `amount` | string | No | The amount of the token contained in the Binance Gift Card |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Fetch RSA Public Key(USER_DATA)

`GET` `{{url}}/sapi/v1/giftcard/cryptography/rsa-public-key`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Redeem a Binance Gift Card(USER_DATA)

`POST` `{{url}}/sapi/v1/giftcard/redeemCode`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | No | Redemption code of Binance Gift Card to be redeemed, supports both Plaintext & Encrypted code. |
| `externalUid` | string | No | Each external unique ID represents a unique user on the partner platform. The function helps you to identify the redemption behavior of different users, such as redemption frequency and amount. It also helps risk and limit control of a single account, such as daily limit on redemption volume, frequency, and incorrect number of entries. This will also prevent a single user account reach the partner's daily redemption limits. We strongly recommend you to use this feature and transfer us the User ID of your users if you have different users redeeming Binance Gift Cards on your platform. To protect user data privacy, you may choose to transfer the user id in any desired format (max. 400 characters). |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Verify Binance Gift Card by Gift Card Number(USER_DATA)

`GET` `{{url}}/sapi/v1/giftcard/verify`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `referenceNo` | string | No | Enter the Gift Card Number |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

