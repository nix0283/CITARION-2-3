# Binance Wallet REST API

> **Source:** Binance Official Postman Collection

**Total Endpoints:** 47

---

## Account

### Get API Key Permission (USER_DATA)

`GET` `{{url}}/sapi/v1/account/apiRestrictions`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Account API Trading Status (USER_DATA)

`GET` `{{url}}/sapi/v1/account/apiTradingStatus`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Disable Fast Withdraw Switch (USER_DATA)

`POST` `{{url}}/sapi/v1/account/disableFastWithdrawSwitch`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Enable Fast Withdraw Switch (USER_DATA)

`POST` `{{url}}/sapi/v1/account/enableFastWithdrawSwitch`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Account info (USER_DATA)

`GET` `{{url}}/sapi/v1/account/info`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Account Status (USER_DATA)

`GET` `{{url}}/sapi/v1/account/status`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Daily Account Snapshot (USER_DATA)

`GET` `{{url}}/sapi/v1/accountSnapshot`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | min 7, max 30, default 7 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Others

### Get symbols delist schedule for spot (MARKET_DATA)

`GET` `{{url}}/sapi/v1/spot/delist-schedule`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |

**Request Body:**

---

### System Status (System)

`GET` `{{url}}/sapi/v1/system/status`

**Request Body:**

---

## Travel-Rule

### Fetch address verification list (USER_DATA)

`GET` `{{url}}/sapi/v1/addressVerify/list`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Submit Deposit Questionnaire (For local entities that require travel rule) (supporting network) (USER_DATA)

`PUT` `{{url}}/sapi/v1/localentity/broker/deposit/provide-info`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `subAccountId` | string | No | External user ID. |
| `depositId` | string | No | Wallet deposit ID |
| `questionnaire` | string | No | JSON format questionnaire answers. |
| `beneficiaryPii` | string | No | JSON format beneficiary Pii. |
| `network` | string | No | - |
| `coin` | string | No | - |
| `amount` | string | No | - |
| `address` | string | No | - |
| `addressTag` | string | No | Secondary address identifier for coins like XRP,XMR etc. |
| `signature` | string | No | Must be the last parameter. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Broker Withdraw (for brokers of local entities that require travel rule) (USER_DATA)

`POST` `{{url}}/sapi/v1/localentity/broker/withdraw/apply`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | string | No | - |
| `addressTag` | string | No | Secondary address identifier for coins like XRP,XMR etc. |
| `network` | string | No | - |
| `coin` | string | No | - |
| `addressName` | string | No | Description of the address. Address book cap is 200, space in name should be encoded into `%20` |
| `amount` | string | No | - |
| `withdrawOrderId` | string | No | withdrawID defined by the client (i.e. client's internal withdrawID) |
| `transactionFeeFlag` | string | No | When making internal transfer, `true` for returning the fee to the destination account; `false` for returning the fee back to the departure account. Default `false`. |
| `walletType` | string | No | The wallet type for withdraw，0-spot wallet ，1-funding wallet. Default walletType is the current "selected wallet" under wallet->Fiat and Spot/Funding->Deposit |
| `questionnaire` | string | No | JSON format questionnaire answers. |
| `originatorPii` | string | No | JSON format originator Pii, see StandardPii section below |
| `signature` | string | No | Must be the last parameter. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Deposit History (for local entities that required travel rule) (supporting network) (USER_DATA)

`GET` `{{url}}/sapi/v1/localentity/deposit/history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `trId` | string | No | Comma(,) separated list of travel rule record Ids. |
| `txId` | string | No | - |
| `tranId` | string | No | Comma(,) separated list of wallet tran Ids. |
| `network` | string | No | - |
| `coin` | string | No | - |
| `travelRuleStatus` | string | No | 0:Completed,1:Pending,2:Failed |
| `pendingQuestionnaire` | string | No | true: Only return records that pending deposit questionnaire. false/not provided: return all records. |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `offset` | string | No | Default: 0 |
| `limit` | string | No | min 7, max 30, default 7 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Submit Deposit Questionnaire (For local entities that require travel rule) (supporting network) (USER_DATA)

`PUT` `{{url}}/sapi/v1/localentity/deposit/provide-info`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tranId` | string | No | Wallet tran ID |
| `questionnaire` | string | No | JSON format questionnaire answers. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Check Questionnaire Requirements (for local entities that require travel rule) (supporting network) (USER_DATA)

`GET` `{{url}}/sapi/v1/localentity/questionnaire-requirements`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### VASP list (for local entities that require travel rule) (supporting network) (USER_DATA)

`GET` `{{url}}/sapi/v1/localentity/vasp`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Withdraw (for local entities that require travel rule) (USER_DATA)

`POST` `{{url}}/sapi/v1/localentity/withdraw/apply`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `coin` | string | No | - |
| `withdrawOrderId` | string | No | client side id for withdrawal, if provided in POST `/sapi/v1/capital/withdraw/apply`, can be used here for query. |
| `network` | string | No | - |
| `address` | string | No | - |
| `addressTag` | string | No | Secondary address identifier for coins like XRP,XMR etc. |
| `amount` | string | No | - |
| `transactionFeeFlag` | string | No | When making internal transfer, `true` for returning the fee to the destination account; `false` for returning the fee back to the departure account. Default `false`. |
| `name` | string | No | Description of the address. Address book cap is 200, space in name should be encoded into `%20` |
| `walletType` | string | No | The wallet type for withdraw，0-spot wallet ，1-funding wallet. Default walletType is the current "selected wallet" under wallet->Fiat and Spot/Funding->Deposit |
| `recvWindow` | string | No | - |
| `questionnaire` | string | No | JSON format questionnaire answers. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Withdraw History (for local entities that require travel rule) (supporting network) (USER_DATA)

`GET` `{{url}}/sapi/v1/localentity/withdraw/history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `trId` | string | No | Comma(,) separated list of travel rule record Ids. |
| `txId` | string | No | - |
| `withdrawOrderId` | string | No | client side id for withdrawal, if provided in POST `/sapi/v1/capital/withdraw/apply`, can be used here for query. |
| `network` | string | No | - |
| `coin` | string | No | - |
| `travelRuleStatus` | string | No | 0:Completed,1:Pending,2:Failed |
| `offset` | string | No | Default: 0 |
| `limit` | string | No | min 7, max 30, default 7 |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Deposit History V2 (for local entities that required travel rule) (supporting network) (USER_DATA)

`GET` `{{url}}/sapi/v2/localentity/deposit/history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `depositId` | string | No | Comma(,) separated list of wallet tran Ids. |
| `txId` | string | No | - |
| `network` | string | No | - |
| `coin` | string | No | - |
| `retrieveQuestionnaire` | string | No | true: return `questionnaire` within response. |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `offset` | string | No | Default: 0 |
| `limit` | string | No | min 7, max 30, default 7 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Submit Deposit Questionnaire V2 (For local entities that require travel rule) (supporting network) (USER_DATA)

`PUT` `{{url}}/sapi/v2/localentity/deposit/provide-info`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `depositId` | string | No | Wallet deposit ID |
| `questionnaire` | string | No | JSON format questionnaire answers. |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Withdraw History V2 (for local entities that require travel rule) (supporting network) (USER_DATA)

`GET` `{{url}}/sapi/v2/localentity/withdraw/history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `trId` | string | No | Comma(,) separated list of travel rule record Ids. |
| `txId` | string | No | - |
| `withdrawOrderId` | string | No | client side id for withdrawal, if provided in POST `/sapi/v1/capital/withdraw/apply`, can be used here for query. |
| `network` | string | No | - |
| `coin` | string | No | - |
| `travelRuleStatus` | string | No | 0:Completed,1:Pending,2:Failed |
| `offset` | string | No | Default: 0 |
| `limit` | string | No | min 7, max 30, default 7 |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Asset

### Asset Detail (USER_DATA)

`GET` `{{url}}/sapi/v1/asset/assetDetail`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | If asset is blank, then query all positive assets user have. |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Asset Dividend Record (USER_DATA)

`GET` `{{url}}/sapi/v1/asset/assetDividend`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | If asset is blank, then query all positive assets user have. |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `limit` | string | No | min 7, max 30, default 7 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query User Delegation History(For Master Account)(USER_DATA)

`GET` `{{url}}/sapi/v1/asset/custody/transfer-history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `type` | string | No | Delegate/Undelegate |
| `asset` | string | No | If asset is blank, then query all positive assets user have. |
| `current` | string | No | current page, default 1, the min value is 1 |
| `size` | string | No | page size, default 10, the max value is 100 |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### DustLog(USER_DATA)

`GET` `{{url}}/sapi/v1/asset/dribblet`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountType` | string | No | `SPOT` or `MARGIN`,default `SPOT` |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Dust Transfer (USER_DATA)

`POST` `{{url}}/sapi/v1/asset/dust`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `accountType` | string | No | `SPOT` or `MARGIN`,default `SPOT` |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Assets That Can Be Converted Into BNB (USER_DATA)

`POST` `{{url}}/sapi/v1/asset/dust-btc`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `accountType` | string | No | `SPOT` or `MARGIN`,default `SPOT` |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Dust Convert (USER_DATA)

`POST` `{{url}}/sapi/v1/asset/dust-convert/convert`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | - |
| `clientId` | string | No | A unique id for the request |
| `targetAsset` | string | No | - |
| `thirdPartyClientId` | string | No | - |
| `dustQuotaAssetToTargetAssetPrice` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Dust Convertible Assets (USER_DATA)

`POST` `{{url}}/sapi/v1/asset/dust-convert/query-convertible-assets`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `targetAsset` | string | No | - |
| `dustQuotaAssetToTargetAssetPrice` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Funding Wallet (USER_DATA)

`POST` `{{url}}/sapi/v1/asset/get-funding-asset`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | If asset is blank, then query all positive assets user have. |
| `needBtcValuation` | string | No | true or false |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Cloud-Mining payment and refund history (USER_DATA)

`GET` `{{url}}/sapi/v1/asset/ledger-transfer/cloud-mining/queryByPage`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tranId` | string | No | The transaction id |
| `clientTranId` | string | No | The unique flag |
| `asset` | string | No | If asset is blank, then query all positive assets user have. |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | current page, default 1, the min value is 1 |
| `size` | string | No | page size, default 10, the max value is 100 |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Trade Fee (USER_DATA)

`GET` `{{url}}/sapi/v1/asset/tradeFee`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `symbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query User Universal Transfer History(USER_DATA)

`GET` `{{url}}/sapi/v1/asset/transfer`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | No | - |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `current` | string | No | current page, default 1, the min value is 1 |
| `size` | string | No | page size, default 10, the max value is 100 |
| `fromSymbol` | string | No | - |
| `toSymbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### User Universal Transfer (USER_DATA)

`POST` `{{url}}/sapi/v1/asset/transfer`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | No | - |
| `asset` | string | No | - |
| `amount` | string | No | - |
| `fromSymbol` | string | No | - |
| `toSymbol` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Query User Wallet Balance (USER_DATA)

`GET` `{{url}}/sapi/v1/asset/wallet/balance`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `quoteAsset` | string | No | `USDT`, `ETH`, `USDC`, `BNB`, etc. default `BTC` |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Toggle BNB Burn On Spot Trade And Margin Interest (USER_DATA)

`POST` `{{url}}/sapi/v1/bnbBurn`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `spotBNBBurn` | string | No | "true" or "false"; Determines whether to use BNB to pay for trading fees on SPOT |
| `interestBNBBurn` | string | No | "true" or "false"; Determines whether to use BNB to pay for margin loan's interest |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Get Open Symbol List (MARKET_DATA)

`GET` `{{url}}/sapi/v1/spot/open-symbol-list`

**Request Body:**

---

### User Asset (USER_DATA)

`POST` `{{url}}/sapi/v3/asset/getUserAsset`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `asset` | string | No | If asset is blank, then query all positive assets user have. |
| `needBtcValuation` | string | No | Whether need btc valuation or not. |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

## Capital

### All Coins' Information (USER_DATA)

`GET` `{{url}}/sapi/v1/capital/config/getall`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Deposit Address(supporting network) (USER_DATA)

`GET` `{{url}}/sapi/v1/capital/deposit/address`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `coin` | string | No | - |
| `network` | string | No | - |
| `amount` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Fetch deposit address list with network(USER_DATA)

`GET` `{{url}}/sapi/v1/capital/deposit/address/list`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `coin` | string | No | - |
| `network` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### One click arrival deposit apply (for expired address deposit) (USER_DATA)

`POST` `{{url}}/sapi/v1/capital/deposit/credit-apply`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `depositId` | string | No | Deposit record Id, priority use |
| `txId` | string | No | - |
| `subAccountId` | string | No | Sub-accountId of Cloud user |
| `subUserId` | string | No | Sub-userId of parent user |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Deposit History (supporting network) (USER_DATA)

`GET` `{{url}}/sapi/v1/capital/deposit/hisrec`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `includeSource` | string | No | Default: `false`, return `sourceAddress`field when set to `true` |
| `coin` | string | No | - |
| `status` | string | No | 0(0:Email Sent, 2:Awaiting Approval 3:Rejected 4:Processing 6:Completed) |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `offset` | string | No | Default: 0 |
| `limit` | string | No | min 7, max 30, default 7 |
| `recvWindow` | string | No | - |
| `txId` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Fetch withdraw address list (USER_DATA)

`GET` `{{url}}/sapi/v1/capital/withdraw/address/list`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Withdraw(USER_DATA)

`POST` `{{url}}/sapi/v1/capital/withdraw/apply`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `coin` | string | No | - |
| `withdrawOrderId` | string | No | client side id for withdrawal, if provided in POST `/sapi/v1/capital/withdraw/apply`, can be used here for query. |
| `network` | string | No | - |
| `address` | string | No | - |
| `addressTag` | string | No | Secondary address identifier for coins like XRP,XMR etc. |
| `amount` | string | No | - |
| `transactionFeeFlag` | string | No | When making internal transfer, `true` for returning the fee to the destination account; `false` for returning the fee back to the departure account. Default `false`. |
| `name` | string | No | Description of the address. Address book cap is 200, space in name should be encoded into `%20` |
| `walletType` | string | No | The wallet type for withdraw，0-spot wallet ，1-funding wallet. Default walletType is the current "selected wallet" under wallet->Fiat and Spot/Funding->Deposit |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Withdraw History (supporting network) (USER_DATA)

`GET` `{{url}}/sapi/v1/capital/withdraw/history`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `coin` | string | No | - |
| `withdrawOrderId` | string | No | client side id for withdrawal, if provided in POST `/sapi/v1/capital/withdraw/apply`, can be used here for query. |
| `status` | string | No | 0(0:Email Sent, 2:Awaiting Approval 3:Rejected 4:Processing 6:Completed) |
| `offset` | string | No | Default: 0 |
| `limit` | string | No | min 7, max 30, default 7 |
| `idList` | string | No | id list returned in the response of POST `/sapi/v1/capital/withdraw/apply`, separated by `,` |
| `startTime` | string | No | - |
| `endTime` | string | No | - |
| `recvWindow` | string | No | - |
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

### Fetch withdraw quota (USER_DATA)

`GET` `{{url}}/sapi/v1/capital/withdraw/quota`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `timestamp` | string | Yes | UTC timestamp in ms |
| `signature` | string | Yes | Signature |

**Request Body:**

---

