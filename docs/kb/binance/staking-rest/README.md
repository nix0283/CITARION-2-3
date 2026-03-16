# Binance Staking REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 37

---

## On-Chain-Yields

### On-chain Yields Account (USER_DATA)

`GET` `{{url}}/sapi/v1/onchain-yields/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get On-chain Yields Locked Redemption Record (USER_DATA)

`GET` `{{url}}/sapi/v1/onchain-yields/locked/history/redemptionRecord`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `positionId` | string | No | - |
| `redeemId` | string | No | - |
| `asset` | string | No | WBETH or BETH, default to BETH |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get On-chain Yields Locked Rewards History (USER_DATA)

`GET` `{{url}}/sapi/v1/onchain-yields/locked/history/rewardsRecord`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `positionId` | string | No | - |
| `asset` | string | No | WBETH or BETH, default to BETH |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get On-chain Yields Locked Subscription Record (USER_DATA)

`GET` `{{url}}/sapi/v1/onchain-yields/locked/history/subscriptionRecord`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `purchaseId` | string | No | - |
| `clientId` | string | No | - |
| `asset` | string | No | WBETH or BETH, default to BETH |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get On-chain Yields Locked Product List (USER_DATA)

`GET` `{{url}}/sapi/v1/onchain-yields/locked/list`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | WBETH or BETH, default to BETH |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get On-chain Yields Locked Personal Left Quota (USER_DATA)

`GET` `{{url}}/sapi/v1/onchain-yields/locked/personalLeftQuota`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get On-chain Yields Locked Product Position (USER_DATA)

`GET` `{{url}}/sapi/v1/onchain-yields/locked/position`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | WBETH or BETH, default to BETH |
| `positionId` | string | No | - |
| `projectId` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Redeem On-chain Yields Locked Product (TRADE)

`POST` `{{url}}/sapi/v1/onchain-yields/locked/redeem`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `positionId` | string | No | - |
| `channelId` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Set On-chain Yields Locked Auto Subscribe(USER_DATA)

`POST` `{{url}}/sapi/v1/onchain-yields/locked/setAutoSubscribe`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `positionId` | string | No | - |
| `autoSubscribe` | string | No | true or false |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Set On-chain Yields Locked Product Redeem Option(USER_DATA)

`POST` `{{url}}/sapi/v1/onchain-yields/locked/setRedeemOption`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `positionId` | string | No | - |
| `redeemTo` | string | No | 'SPOT','FLEXIBLE' |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Subscribe On-chain Yields Locked Product(TRADE)

`POST` `{{url}}/sapi/v1/onchain-yields/locked/subscribe`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | string | No | - |
| `amount` | string | No | Amount in SOL. |
| `autoSubscribe` | string | No | true or false, default true. |
| `sourceAccount` | string | No | `SPOT`,`FUND`,`ALL`, default `SPOT` |
| `redeemTo` | string | Yes | `SPOT`,`FLEXIBLE`, default `FLEXIBLE` Takes effect when Auto Subscribe is false |
| `channelId` | string | No | - |
| `clientId` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get On-chain Yields Locked Subscription Preview (USER_DATA)

`GET` `{{url}}/sapi/v1/onchain-yields/locked/subscriptionPreview`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | string | No | - |
| `amount` | string | No | Amount in SOL. |
| `autoSubscribe` | string | No | true or false, default true. |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Soft-Staking

### Get Soft Staking Rewards History(USER_DATA)

`GET` `{{url}}/sapi/v1/soft-staking/history/rewardsRecord`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | WBETH or BETH, default to BETH |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Soft Staking Product List (USER_DATA)

`GET` `{{url}}/sapi/v1/soft-staking/list`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | WBETH or BETH, default to BETH |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Set Soft Staking (USER_DATA)

`GET` `{{url}}/sapi/v1/soft-staking/set`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `softStaking` | string | No | true or false |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Sol-Staking

### SOL Staking account(USER_DATA)

`GET` `{{url}}/sapi/v1/sol-staking/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Claim Boost Rewards(TRADE)

`POST` `{{url}}/sapi/v1/sol-staking/sol/claim`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get BNSOL rewards history(USER_DATA)

`GET` `{{url}}/sapi/v1/sol-staking/sol/history/bnsolRewardsHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Boost Rewards History(USER_DATA)

`GET` `{{url}}/sapi/v1/sol-staking/sol/history/boostRewardsHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | No | "CLAIM", "DISTRIBUTE", default "CLAIM" |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get BNSOL Rate History(USER_DATA)

`GET` `{{url}}/sapi/v1/sol-staking/sol/history/rateHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get SOL redemption history(USER_DATA)

`GET` `{{url}}/sapi/v1/sol-staking/sol/history/redemptionHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get SOL staking history(USER_DATA)

`GET` `{{url}}/sapi/v1/sol-staking/sol/history/stakingHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Unclaimed Rewards(USER_DATA)

`GET` `{{url}}/sapi/v1/sol-staking/sol/history/unclaimedRewards`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get SOL staking quota details(USER_DATA)

`GET` `{{url}}/sapi/v1/sol-staking/sol/quota`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Redeem SOL(TRADE)

`POST` `{{url}}/sapi/v1/sol-staking/sol/redeem`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | string | No | Amount in SOL. |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Subscribe SOL Staking(TRADE)

`POST` `{{url}}/sapi/v1/sol-staking/sol/stake`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | string | No | Amount in SOL. |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Eth-Staking

### Get WBETH Rate History(USER_DATA)

`GET` `{{url}}/sapi/v1/eth-staking/eth/history/rateHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get ETH redemption history(USER_DATA)

`GET` `{{url}}/sapi/v1/eth-staking/eth/history/redemptionHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get ETH staking history(USER_DATA)

`GET` `{{url}}/sapi/v1/eth-staking/eth/history/stakingHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get WBETH rewards history(USER_DATA)

`GET` `{{url}}/sapi/v1/eth-staking/eth/history/wbethRewardsHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get current ETH staking quota(USER_DATA)

`GET` `{{url}}/sapi/v1/eth-staking/eth/quota`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Redeem ETH(TRADE)

`POST` `{{url}}/sapi/v1/eth-staking/eth/redeem`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | string | No | Amount in SOL. |
| `asset` | string | No | WBETH or BETH, default to BETH |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get WBETH unwrap history(USER_DATA)

`GET` `{{url}}/sapi/v1/eth-staking/wbeth/history/unwrapHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get WBETH wrap history(USER_DATA)

`GET` `{{url}}/sapi/v1/eth-staking/wbeth/history/wrapHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | Currently querying page. Start from 1. Default:1 |
| `size` | string | No | Default:10, Max:100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Wrap BETH(TRADE)

`POST` `{{url}}/sapi/v1/eth-staking/wbeth/wrap`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | string | No | Amount in SOL. |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### ETH Staking account(USER_DATA)

`GET` `{{url}}/sapi/v2/eth-staking/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Subscribe ETH Staking(TRADE)

`POST` `{{url}}/sapi/v2/eth-staking/eth/stake`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | string | No | Amount in SOL. |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

