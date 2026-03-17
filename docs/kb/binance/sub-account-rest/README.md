# Binance Sub Account REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 45

---

## Managed-Sub-Account

### Query Managed Sub-account Snapshot (For Investor Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/managed-subaccount/accountSnapshot`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `type` | string | No | "SPOT", "MARGIN"（cross）, "FUTURES"（UM） |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default value: 1, Max value: 200 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Managed Sub-account Asset Details (For Investor Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/managed-subaccount/asset`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Deposit Assets Into The Managed Sub-account (For Investor Master Account) (USER_DATA)

`POST` `{{url}}/sapi/v1/managed-subaccount/deposit`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `toEmail` | string | No | - |
| `asset` | string | No | - |
| `amount` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Managed Sub-account Deposit Address (For Investor Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/managed-subaccount/deposit/address`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `coin` | string | No | - |
| `network` | string | No | networks can be found in `GET /sapi/v1/capital/deposit/address` |
| `amount` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Managed Sub-account Futures Asset Details (For Investor Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/managed-subaccount/fetch-future-asset`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `accountType` | string | No | No input or input "MARGIN" to get Cross Margin account details. Input "ISOLATED_MARGIN" to get Isolated Margin account details. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Managed Sub-account List (For Investor) (USER_DATA)

`GET` `{{url}}/sapi/v1/managed-subaccount/info`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | Managed sub-account email |
| `page` | string | No | Default value: 1 |
| `limit` | string | No | Default value: 1, Max value: 200 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Managed Sub-account Margin Asset Details (For Investor Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/managed-subaccount/marginAsset`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `accountType` | string | No | No input or input "MARGIN" to get Cross Margin account details. Input "ISOLATED_MARGIN" to get Isolated Margin account details. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Managed Sub Account Transfer Log (For Trading Team Sub Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/managed-subaccount/query-trans-log`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startTime` | string | No | Start Time |
| `endTime` | string | No | End Time (The start time and end time interval cannot exceed half a year) |
| `page` | string | No | Page |
| `limit` | string | No | Limit (Max: 500) |
| `transfers` | string | No | Transfer Direction (FROM/TO) |
| `transferFunctionAccountType` | string | No | Transfer function account type (SPOT/MARGIN/ISOLATED_MARGIN/USDT_FUTURE/COIN_FUTURE) |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Managed Sub Account Transfer Log (For Investor Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/managed-subaccount/queryTransLogForInvestor`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `startTime` | string | No | Start Time |
| `endTime` | string | No | End Time (The start time and end time interval cannot exceed half a year) |
| `page` | string | No | Page |
| `limit` | string | No | Limit (Max: 500) |
| `transfers` | string | No | Transfer Direction (FROM/TO) |
| `transferFunctionAccountType` | string | No | Transfer function account type (SPOT/MARGIN/ISOLATED_MARGIN/USDT_FUTURE/COIN_FUTURE) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Managed Sub Account Transfer Log (For Trading Team Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/managed-subaccount/queryTransLogForTradeParent`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `startTime` | string | No | Start Time |
| `endTime` | string | No | End Time (The start time and end time interval cannot exceed half a year) |
| `page` | string | No | Page |
| `limit` | string | No | Limit (Max: 500) |
| `transfers` | string | No | Transfer Direction (FROM/TO) |
| `transferFunctionAccountType` | string | No | Transfer function account type (SPOT/MARGIN/ISOLATED_MARGIN/USDT_FUTURE/COIN_FUTURE) |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Withdrawl Assets From The Managed Sub-account (For Investor Master Account) (USER_DATA)

`POST` `{{url}}/sapi/v1/managed-subaccount/withdraw`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fromEmail` | string | No | - |
| `asset` | string | No | - |
| `amount` | string | No | - |
| `transferDate` | string | No | Withdrawals is automatically occur on the transfer date(UTC0). If a date is not selected, the withdrawal occurs right now |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Asset-Management

### Get Sub-account Deposit Address (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/capital/deposit/subAddress`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `coin` | string | No | - |
| `network` | string | No | networks can be found in `GET /sapi/v1/capital/deposit/address` |
| `amount` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Sub-account Deposit History (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/capital/deposit/subHisrec`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `coin` | string | No | - |
| `status` | string | No | 0(0:pending,6: credited but cannot withdraw,7:Wrong Deposit,8:Waiting User confirm,1:success) |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default value: 1, Max value: 200 |
| `offset` | string | No | default:0 |
| `recvWindow` | string | No | - |
| `txId` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Detail on Sub-account's Futures Account (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/sub-account/futures/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Summary of Sub-account's Futures Account (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/sub-account/futures/accountSummary`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | string | No | Page |
| `limit` | string | No | Limit (Max: 500) |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Sub-account Futures Asset Transfer History (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/sub-account/futures/internalTransfer`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `futuresType` | string | No | 1:USDT-margined Futures，2: Coin-margined Futures |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `page` | string | No | Default value: 1 |
| `limit` | string | No | Default value: 1, Max value: 200 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Sub-account Futures Asset Transfer (For Master Account) (USER_DATA)

`POST` `{{url}}/sapi/v1/sub-account/futures/internalTransfer`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fromEmail` | string | No | - |
| `toEmail` | string | No | - |
| `futuresType` | string | No | 1:USDT-margined Futures，2: Coin-margined Futures |
| `asset` | string | No | - |
| `amount` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Move Position History for Sub-account (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/sub-account/futures/move-position`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `page` | string | No | Page |
| `row` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Move Position for Sub-account (For Master Account) (USER_DATA)

`POST` `{{url}}/sapi/v1/sub-account/futures/move-position`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fromUserEmail` | string | No | - |
| `toUserEmail` | string | No | - |
| `productType` | string | No | Only support UM |
| `orderArgs` | string | Yes | Max 10 positions supported. When input request parameter,orderArgs.symbol should be STRING, orderArgs.quantity should be BIGDECIMAL, and orderArgs.positionSide should be STRING, positionSide support BOTH,LONG and SHORT. Each entry should be like orderArgs[0].symbol=BTCUSDT,orderArgs[0].quantity=0.001,orderArgs[0].positionSide=BOTH. Example of the request parameter array: orderArgs[0].symbol=BTCUSDT orderArgs[0].quantity=0.001 orderArgs[0].positionSide=BOTH orderArgs[1].symbol=ETHUSDT orderArgs[1].quantity=0.01 orderArgs[1].positionSide=BOTH |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Futures Transfer for Sub-account (For Master Account) (USER_DATA)

`POST` `{{url}}/sapi/v1/sub-account/futures/transfer`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `asset` | string | No | - |
| `amount` | string | No | - |
| `type` | string | No | 1: transfer from subaccount's  spot account to margin account 2: transfer from subaccount's margin account to its spot account |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Detail on Sub-account's Margin Account (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/sub-account/margin/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Summary of Sub-account's Margin Account (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/sub-account/margin/accountSummary`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Margin Transfer for Sub-account (For Master Account) (USER_DATA)

`POST` `{{url}}/sapi/v1/sub-account/margin/transfer`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `asset` | string | No | - |
| `amount` | string | No | - |
| `type` | string | No | 1: transfer from subaccount's  spot account to margin account 2: transfer from subaccount's margin account to its spot account |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Sub-account Spot Assets Summary (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/sub-account/spotSummary`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | Managed sub-account email |
| `page` | string | No | Default value: 1 |
| `size` | string | No | default 10, max 20 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Sub-account Spot Asset Transfer History (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/sub-account/sub/transfer/history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fromEmail` | string | No | - |
| `toEmail` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `page` | string | No | Default value: 1 |
| `limit` | string | No | Default value: 1, Max value: 200 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Transfer to Master (For Sub-account) (USER_DATA)

`POST` `{{url}}/sapi/v1/sub-account/transfer/subToMaster`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `amount` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Transfer to Sub-account of Same Master (For Sub-account) (USER_DATA)

`POST` `{{url}}/sapi/v1/sub-account/transfer/subToSub`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `toEmail` | string | No | - |
| `asset` | string | No | - |
| `amount` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Sub-account Transfer History (For Sub-account) (USER_DATA)

`GET` `{{url}}/sapi/v1/sub-account/transfer/subUserHistory`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | If not sent, result of all assets will be returned |
| `type` | string | No | 1: transfer in, 2: transfer out |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | Default value: 1, Max value: 200 |
| `returnFailHistory` | string | No | Default `False`, return PROCESS and SUCCESS status history; If `True`,return PROCESS and SUCCESS and FAILURE status history |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Universal Transfer History (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/sub-account/universalTransfer`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fromEmail` | string | No | - |
| `toEmail` | string | No | - |
| `clientTranId` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `page` | string | No | Default value: 1 |
| `limit` | string | No | Default value: 1, Max value: 200 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Universal Transfer (For Master Account) (USER_DATA)

`POST` `{{url}}/sapi/v1/sub-account/universalTransfer`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fromEmail` | string | No | - |
| `toEmail` | string | No | - |
| `fromAccountType` | string | No | "SPOT","USDT_FUTURE","COIN_FUTURE","MARGIN"(Cross),"ISOLATED_MARGIN" |
| `toAccountType` | string | No | "SPOT","USDT_FUTURE","COIN_FUTURE","MARGIN"(Cross),"ISOLATED_MARGIN" |
| `clientTranId` | string | No | - |
| `symbol` | string | No | Only supported under ISOLATED_MARGIN type |
| `asset` | string | No | - |
| `amount` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Detail on Sub-account's Futures Account V2 (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v2/sub-account/futures/account`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `futuresType` | string | No | 1:USDT-margined Futures，2: Coin-margined Futures |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Summary of Sub-account's Futures Account V2 (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v2/sub-account/futures/accountSummary`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `futuresType` | string | No | 1:USDT-margined Futures，2: Coin-margined Futures |
| `page` | string | No | Default value: 1 |
| `limit` | string | No | Default value: 1, Max value: 200 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Sub-account Assets (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v3/sub-account/assets`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Sub-account Assets (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v4/sub-account/assets`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Account-Management

### Enable Options for Sub-account (For Master Account) (USER_DATA)

`POST` `{{url}}/sapi/v1/sub-account/eoptions/enable`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Enable Futures for Sub-account (For Master Account) (USER_DATA)

`POST` `{{url}}/sapi/v1/sub-account/futures/enable`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Futures Position-Risk of Sub-account (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/sub-account/futures/positionRisk`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Sub-account List (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/sub-account/list`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | Managed sub-account email |
| `isFreeze` | string | No | true or false |
| `page` | string | No | Default value: 1 |
| `limit` | string | No | Default value: 1, Max value: 200 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Sub-account's Status on Margin Or Futures (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/sub-account/status`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | Managed sub-account email |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query Sub-account Transaction Statistics (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/sub-account/transaction-statistics`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | Managed sub-account email |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Create a Virtual Sub-account (For Master Account) (USER_DATA)

`POST` `{{url}}/sapi/v1/sub-account/virtualSubAccount`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `subAccountString` | string | No | Please input a string. We will create a virtual email using that string for you to register |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Futures Position-Risk of Sub-account V2 (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v2/sub-account/futures/positionRisk`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `futuresType` | string | No | 1:USDT-margined Futures，2: Coin-margined Futures |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Api-Management

### Get IP Restriction for a Sub-account API Key (For Master Account) (USER_DATA)

`GET` `{{url}}/sapi/v1/sub-account/subAccountApi/ipRestriction`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `subAccountApiKey` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Delete IP List For a Sub-account API Key (For Master Account) (USER_DATA)

`DELETE` `{{url}}/sapi/v1/sub-account/subAccountApi/ipRestriction/ipList`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `subAccountApiKey` | string | No | - |
| `ipAddress` | string | No | IPs to be deleted. Can be added in batches, separated by commas |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Add IP Restriction for Sub-Account API key (For Master Account) (USER_DATA)

`POST` `{{url}}/sapi/v2/sub-account/subAccountApi/ipRestriction`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | [Sub-account email](#email-address) |
| `subAccountApiKey` | string | No | - |
| `status` | string | No | IP Restriction status. 1 = IP Unrestricted. 2 = Restrict access to trusted IPs only. |
| `ipAddress` | string | No | Insert static IP in batch, separated by commas. |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

