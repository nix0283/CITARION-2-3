---
title: "OKX API guide"
source: "https://www.okx.com/docs-v5/broker_en/"
fetched: "2026-03-10T12:48:36+00:00"
---

[ NAV []{.image .placeholder original-image-src="images/navbar-cad8cdcb.png" original-image-title=""} ](#)

<div>


[![](/home/z/my-project/docs/exchange/okx/media/27eab0491831ad58e093f353d1446011fec0eafe.png){.logo}](/)




-   [API](/docs-v5/en)
-   [🔥 Agent](/docs-v5/agent_en)
-   [Broker](/docs-v5/broker_en)
-   [Best Practice](/docs-v5/trick_en)
-   [Change Log](/docs-v5/log_en)

API Agent Broker Best Practice Change Log



[中文](javascript:void(0);){.toc-link onclick="javascript:changeHyperlink()" style="display: inline-block;"}


</div>



[HTTP](#){language-name="shell"} [Python](#){language-name="python"}


-   [Broker Program](#broker-program){.toc-h1 .toc-link data-title="Broker Program"}
-   [Broker guide](#broker-guide){.toc-h1 .toc-link data-title="Broker guide"}
    -   [Get rebate guide](#broker-guide-get-rebate-guide){.toc-h2 .toc-link data-title="Get rebate guide"}
    -   [Common API for brokers](#broker-guide-common-api-for-brokers){.toc-h2 .toc-link data-title="Common API for brokers"}
        -   [Core trading](#broker-guide-common-api-for-brokers-core-trading){.toc-h3 .toc-link data-title="Core trading"}
        -   [Algo trading](#broker-guide-common-api-for-brokers-algo-trading){.toc-h3 .toc-link data-title="Algo trading"}
        -   [Grid trading](#broker-guide-common-api-for-brokers-grid-trading){.toc-h3 .toc-link data-title="Grid trading"}
        -   [Recurring Buy](#broker-guide-common-api-for-brokers-recurring-buy){.toc-h3 .toc-link data-title="Recurring Buy"}
        -   [Block trading](#broker-guide-common-api-for-brokers-block-trading){.toc-h3 .toc-link data-title="Block trading"}
        -   [Spread Trading](#broker-guide-common-api-for-brokers-spread-trading){.toc-h3 .toc-link data-title="Spread Trading"}
        -   [Convert](#broker-guide-common-api-for-brokers-convert){.toc-h3 .toc-link data-title="Convert"}
        -   [Financial Product](#broker-guide-common-api-for-brokers-financial-product){.toc-h3 .toc-link data-title="Financial Product"}
-   [DMA Broker](#dma-broker){.toc-h1 .toc-link data-title="DMA Broker"}
    -   [Get sub-account list](#dma-broker-common-api-for-brokers-get-sub-account-list){.toc-h2 .toc-link data-title="Get sub-account list"}
    -   [Get sub-account fee rates](#dma-broker-common-api-for-brokers-get-sub-account-fee-rates){.toc-h2 .toc-link data-title="Get sub-account fee rates"}
    -   [Create an API Key for a sub-account](#dma-broker-common-api-for-brokers-create-an-api-key-for-a-sub-account){.toc-h2 .toc-link data-title="Create an API Key for a sub-account"}
    -   [Query the API Key of a sub-account](#dma-broker-common-api-for-brokers-query-the-api-key-of-a-sub-account){.toc-h2 .toc-link data-title="Query the API Key of a sub-account"}
    -   [Get trading data link (DMA)](#dma-broker-common-api-for-brokers-get-trading-data-link-dma){.toc-h2 .toc-link data-title="Get trading data link (DMA)"}
    -   [Create trading details download link (DMA)](#dma-broker-common-api-for-brokers-create-trading-details-download-link-dma){.toc-h2 .toc-link data-title="Create trading details download link (DMA)"}
-   [Fully Disclosed Broker (API and Oauth)](#fully-disclosed-broker-api-and-oauth){.toc-h1 .toc-link data-title="Fully Disclosed Broker (API and Oauth)"}
    -   [Introduction](#fully-disclosed-broker-api-and-oauth-introduction){.toc-h2 .toc-link data-title="Introduction"}
    -   [OAuth Broker](#fully-disclosed-broker-api-and-oauth-oauth-broker){.toc-h2 .toc-link data-title="OAuth Broker"}
        -   [Introduction](#fully-disclosed-broker-api-and-oauth-oauth-broker-introduction){.toc-h3 .toc-link data-title="Introduction"}
        -   [Preparation before Integration](#fully-disclosed-broker-api-and-oauth-oauth-broker-preparation-before-integration){.toc-h3 .toc-link data-title="Preparation before Integration"}
        -   [Introduction of authorization mode](#fully-disclosed-broker-api-and-oauth-oauth-broker-introduction-of-authorization-mode){.toc-h3 .toc-link data-title="Introduction of authorization mode"}
        -   [Usage of Token](#fully-disclosed-broker-api-and-oauth-oauth-broker-usage-of-token){.toc-h3 .toc-link data-title="Usage of Token"}
        -   [Permissions](#fully-disclosed-broker-api-and-oauth-oauth-broker-permissions){.toc-h3 .toc-link data-title="Permissions"}
        -   [Fast API](#fully-disclosed-broker-api-and-oauth-oauth-broker-fast-api){.toc-h3 .toc-link data-title="Fast API"}
    -   [Broker Commision API](#fully-disclosed-broker-api-and-oauth-broker-commision-api){.toc-h2 .toc-link data-title="Broker Commision API"}
        -   [Get download link (FD)](#fully-disclosed-broker-api-and-oauth-broker-commision-api-get-download-link-fd){.toc-h3 .toc-link data-title="Get download link (FD)"}
        -   [Create rebate details download link (FD)](#fully-disclosed-broker-api-and-oauth-broker-commision-api-create-rebate-details-download-link-fd){.toc-h3 .toc-link data-title="Create rebate details download link (FD)"}
        -   [Get the user\'s broker rebate information](#fully-disclosed-broker-api-and-oauth-broker-commision-api-get-the-user-39-s-broker-rebate-information){.toc-h3 .toc-link data-title="Get the user's broker rebate information"}
    -   [Error Code](#fully-disclosed-broker-api-and-oauth-error-code){.toc-h2 .toc-link data-title="Error Code"}







# Broker Program

If your business platform offers cryptocurrency services, you can apply to join the OKX Broker Program, become our partner broker, enjoy exclusive broker services, and earn high rebates through trading fees generated by OKX users.\
The Broker Program includes, and is not limited to, integrated trading platforms, trading bots, copy trading platforms, trading bot providers, quantitative strategy institutions, asset management platforms etc.\

-   [Click to apply](/broker/home)
-   [Broker rules](/help/introduction-of-rules-on-okx-brokers)
-   If you have any questions, feel free to contact our customer support.

Relevant information for specific Broker Program documentation and product services will be provided following successful applications.\

# Broker guide

## Get rebate guide 

When an OKX broker is using any of our APIs, there is a tag field. Do make sure to use your unique broker code in order to ensure we know the volume is coming from your end.\
This code can be seen in your Broker Dashboard\
With the broker code attached, brokers will be able to receive commissions and able to track the trading data on the dashboard

## Common API for brokers 

When the OKX broker calls the OKX API interface, when the request parameter has `tag`, please be sure to enter your exclusive Broker code information to realize the association between the order and the broker.\
When the order is entered into the `Brokercode` information, the broker can enjoy the corresponding commission reward, data statistics and other specific logic tracking.\

### Core trading 

[More details](/docs-v5/en/#order-book-trading)

-   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
-   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
-   [Close positions](/docs-v5/en/#order-book-trading-trade-post-close-positions)

### Algo trading 

[More details](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)

-   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)

### Grid trading 

[More details](/docs-v5/en/#order-book-trading-grid-trading-post-place-grid-algo-order)

-   [Place grid algo order](/docs-v5/en/#order-book-trading-grid-trading-post-place-grid-algo-order)

### Recurring Buy 

[More details](/docs-v5/en/#order-book-trading-recurring-buy)

-   [Place recurring buy order](/docs-v5/en/#order-book-trading-recurring-buy-post-place-recurring-buy-order)

### Block trading 

[More details](/docs-v5/en/#block-trading)

-   [Create RFQ](/docs-v5/en/#block-trading-rest-api-create-rfq)

### Spread Trading 

[More details](/docs-v5/en/#spread-trading)

-   [Spread Trading Place order](/docs-v5/en/#spread-trading-rest-api-place-order)

### Convert 

[More details](/docs-v5/en/#funding-account)

-   [Estimate quote](/docs-v5/en/#funding-account-rest-api-estimate-quote)
-   [Convert trade](/docs-v5/en/#funding-account-rest-api-convert-trade)

### Financial Product 

[More details](/docs-v5/en/#financial-product-earn)

-   [Earn product](/docs-v5/en/#financial-product-earn-post-purchase)

# DMA Broker

### Get sub-account list 

#### Rate Limit: 10 request per second 

#### Rate limit rule: User ID 

#### Permission: Read 

#### HTTP Request 

`GET /api/v5/broker/dma/subaccount-info`

> Request Example


``` {.highlight .shell .tab-shell}
GET /api/v5/broker/dma/subaccount-info
```


#### Request Parameters 

  Parameter   Type     Required   Description
  ----------- -------- ---------- ---------------------------------------------------------------------------
  subAcct     String   No         Sub-account name
  uid         String   No         Sub-account UID
  page        String   No         Page for pagination
  limit       String   No         Number of results per request. The maximum is `100`; the default is `100`

> Response Example


``` {.highlight .json .tab-json}
{
    "code": "0",
    "data": [
        {
            "details": [
                {
                    "acctLv": "1",
                    "canTransOut": false,
                    "firstLvSubAcct": "h*******5",
                    "subAcctLv": "1",
                    "enable": true,
                    "frozenFunc": [],
                    "label": "1",
                    "subAcct": "h*******5",
                    "ts": "1648521249000",
                    "uid": "289*********1696"
                }
            ],
            "page": "1",
            "totalPage": "1"
        }
    ],
    "msg": ""
}
```


#### Response Parameters 

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------------------------------------------
  totalPage               String                  Total number of pages

  page                    String                  Current page number

  details                 Array of objects        List of sub-accounts

  \> subAcct              String                  Sub-account name

  \> uid                  String                  Sub-account UID

  \> label                String                  Sub-account notes

  \> acctLv               String                  Account level\
                                                  `1`: Spot mode\
                                                  `2`: Futures mode\
                                                  `3`: Multi-currency margin\
                                                  `4`：Portfolio margin

  \> enable               Boolean                 Sub-account status\
                                                  `true`: normal\
                                                  `false`: frozen (global)

  \> frozenFunc           Array of strings        Frozen functions\
                                                  `trading`\
                                                  `convert`\
                                                  `transfer`\
                                                  `withdrawal`\
                                                  `deposit`\
                                                  `flexible_loan`

  \> canTransOut          String                  Whether the sub-account has the right to transfer out.(Directly transfer to another sub account through the sub account APIKey）\
                                                  `true`: can transfer out\
                                                  `false`: cannot transfer out

  \> firstLvSubAcct       String                  The first level sub-account.\
                                                  For subAcctLv: 1, firstLvSubAcct is equal to subAcct.\
                                                  For subAcctLv: 2, subAcct belongs to firstLvSubAcct.

  \> subAcctLv            String                  Sub-account level\
                                                  `1`: First level sub-account\
                                                  `2`: Second level sub-account

  \> ts                   String                  Creation time of sub-account, Unix timestamp format in milliseconds, e.g. `1597026383085`
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Get sub-account fee rates 

#### Rate Limit: 1 request per second 

#### Rate limit rule: User ID 

#### Permission: Read 

#### HTTP Request 

`GET /api/v5/broker/dma/subaccount-trade-fee`

> Request Example


``` {.highlight .shell .tab-shell}
GET /api/v5/broker/dma/subaccount-trade-fee
```


#### Request Parameters 

  Parameter   Type     Required   Description
  ----------- -------- ---------- ---------------------------------------------------------------------------
  subAcct     String   No         Sub-account name
  uid         String   No         Sub-account UID
  page        String   No         Page for pagination
  limit       String   No         Number of results per request. The maximum is `100`; the default is `100`

> Response Example


``` {.highlight .json .tab-json}
{
    "code": "0",
    "data": [
        {
            "details": [
                {
                    "feeRates": [
                        {
                            "marker": "-0.0008",
                            "taker": "-0.001",
                            "type": "1"
                        },
                        {
                            "marker": "-0.0005",
                            "taker": "-0.0007",
                            "type": "2"
                        },
                        {
                            "marker": "-0.0002",
                            "taker": "-0.0005",
                            "type": "3"
                        },
                        {
                            "marker": "-0.0002",
                            "taker": "-0.0005",
                            "type": "4"
                        },
                        {
                            "marker": "-0.0002",
                            "taker": "-0.0005",
                            "type": "5"
                        },
                        {
                            "marker": "-0.0002",
                            "taker": "-0.0005",
                            "type": "6"
                        },
                        {
                            "marker": "-0.0002",
                            "taker": "-0.0005",
                            "type": "7"
                        },
                        {
                            "marker": "-0.0002",
                            "taker": "-0.0005",
                            "type": "8"
                        },
                        {
                            "marker": "-0.0002",
                            "taker": "-0.0003",
                            "type": "9"
                        }
                    ],
                    "firstLvSubAcct": "subaccount111ad",
                    "subAcctLv": "1",
                    "subAcct": "subaccount111ad",
                    "ts": "1658287703000",
                    "uid": "335748406955877155"
                }
            ],
            "page": "1",
            "totalPage": "1"
        }
    ],
    "msg": ""
}
```


#### Response Parameters 

  -------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------
  totalPage               String                  Total number of pages

  page                    String                  Current page number

  details                 Array of objects        List of sub-accounts

  \> subAcct              String                  Sub-account name

  \> uid                  String                  Sub-account UID

  \> firstLvSubAcct       String                  The first level sub-account.\
                                                  For subAcctLv: 1, firstLvSubAcct is equal to subAcct.\
                                                  For subAcctLv: 2, subAcct belongs to firstLvSubAcct.

  \> subAcctLv            String                  Sub-account level\
                                                  `1`: First level sub-account\
                                                  `2`: Second level sub-account

  \> ts                   String                  Creation time of sub-account, Unix timestamp format in milliseconds, e.g. `1597026383085`

  \> feeRates             Array                   Fee rates

  \>\> type               String                  Fee type\
                                                  `1`: SPOT and MARGIN USDT trading pairs\
                                                  `2`: SPOT and MARGIN USDⓈ&Crypto trading pairs/Crypto\
                                                  `3`: FUTURES USDT-margined contracts\
                                                  `4`: FUTURES USDC-margined contracts\
                                                  `5`: FUTURES crypto-margined contracts\
                                                  `6`: SWAP USDT-margined contracts\
                                                  `7`: SWAP USDC-margined contracts\
                                                  `8`: SWAP crypto-margined contracts\
                                                  `9`: OPTION

  \>\> maker              String                  Taker fee rate

  \>\> taker              String                  Maker fee rate
  -------------------------------------------------------------------------------------------------------------------------------------------

The fee rate like maker and taker: positive number, which means the rate of rebate; negative number, which means the rate of commission.

### Create an API Key for a sub-account 

#### Rate limit：40 requests per second 

#### Rate limit rule: User ID 

#### Permission: Trade 

#### HTTP Request 

`POST /api/v5/broker/dma/subaccount/apikey`

> Request sample


``` {.highlight .shell .tab-shell}
POST /api/v5/broker/dma/subaccount/apikey
body
{
    "subAcct":"panpanBroker2",
    "label":"broker3",
    "passphrase": "******",
    "perm":"read_only,trade",
    "ip":"10.0.108.9"
}
```


#### Request Parameters 

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  subAcct           String            Yes               Sub-account name, supports 6 to 20 characters that include numbers and letters (case sensitive, space character is not supported).

  label             String            Yes               API Key note\
                                                        No more than 50 letters (case sensitive) or numbers, which can be pure letters or pure numbers.

  passphrase        String            Yes               API Key password, supports 8 to 32 alphanumeric characters containing at least 1 number, 1 uppercase letter, 1 lowercase letter and 1 special character.

  ip                String            No                Link IP addresses, separate with commas if more than one. Support up to 20 addresses.\
                                                        **For security reasons, it is recommended to bind IP addresses.**\
                                                        **API keys with trading or withdrawal permissions that are not bound to IPs will expire after 14 days of inactivity. (API keys in demo trading will not be deleted.)**

  perm              String            No                API Key permissions\
                                                        `read_only`: Read only, it is the default value and can\'t be removed\
                                                        `trade`: Trade
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

> Returned result


``` {.highlight .json .tab-json}
{
    "code": "0",
    "msg": "",
    "data": [{
        "subAcct": "panpanBroker2",
        "label": "broker3",
        "apiKey": "****",
        "secretKey": "****",
        "passphrase": "******",
        "perm": "read_only,trade",
        "ip": "10.0.108.9",
        "ts": "1597026383085"
    }]
}
```


#### Response parameters 

  ----------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ----------------------------------------------------------------------------
  subAcct                 String                  Sub-account name

  label                   String                  API Key note

  apiKey                  String                  API public key

  secretKey               String                  API private key

  passphrase              String                  API Key password

  perm                    String                  API Key access\
                                                  `read_only`: Read only `trade`: Trade

  ip                      String                  IP address that linked with API Key

  ts                      String                  Creation time, Unix timestamp format in milliseconds, e.g. `1597026383085`
  ----------------------------------------------------------------------------------------------------------------------------

### Query the API Key of a sub-account 

#### Rate limit：1 request per second 

#### Rate limit rule: User ID 

#### Permission: Read 

#### HTTP Request 

`GET /api/v5/broker/dma/subaccount/apikey`

> Request sample


``` {.highlight .shell .tab-shell}
Get /api/v5/broker/dma/subaccount/apikey?subAcct=panpanBroker2
```


#### Request Parameters 

  Parameter   Type     Required   Description
  ----------- -------- ---------- ------------------
  subAcct     String   Yes        Sub-account name
  apiKey      String   No         API public key

> Returned results


``` {.highlight .json .tab-json}
{    
    "code":"0",
    "msg":"",
    "data":[
        {
            "label":"v5",
            "apiKey":"arg13sdfgs",
            "perm":"read_only,trade",
            "ip":"1.1.1.1,2.2.2.2",
            "ts":"1597026383085"
        },
        {
            "label":"v5.1",
            "apiKey":"arg13sdfgs",
            "perm":"read_only",
            "ip":"1.1.1.1,2.2.2.2",
            "ts":"1597026383085"
        }
    ]
}
```


#### Response parameters 

  ------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ------------------------------------------------------------------------------------
  label                   String                  API Key note

  apiKey                  String                  API public key

  perm                    String                  API Key access\
                                                  `read_only`: Read\
                                                  `trade`: Trade

  ip                      String                  IP address that linked with API Key

  ts                      String                  API Key creation time, Unix timestamp format in milliseconds, e.g. `1597026383085`
  ------------------------------------------------------------------------------------------------------------------------------------

### Get trading data link (DMA) 

Get the download link of the trading details that have been successfully applied for in the fill dimension. After the download link is generated, it will only be valid for 9 hours.

#### Rate Limit: 2 requests per min 

#### Rate limit rule: User ID 

#### Permission: Read 

#### HTTP Request 

`GET /api/v5/broker/dma/rebate-per-orders`

> Request Example


``` {.highlight .shell .tab-shell}
GET /api/v5/broker/dma/rebate-per-orders?type=false&begin=20221207&end=20230207
```


#### Request Parameters 

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------------------------------------------------------------------
  type              String            Yes               Type\
                                                        true: Get all the generated history for the current user\
                                                        false: Query the specified history

  begin             String            Optional          Begin date for download link generated, in the format of `YYYYMMDD`, e.g. `20210623`, search data after `2021/06/23 00:00:00` (include)\
                                                        If `type` is `false`, this field is required

  end               String            Optional          End date for download link generated, in the format of `YYYYMMDD`, e.g. `20210623`, search data before `2021/06/24 00:00:00` (exclude)\
                                                        If `type` is `false`, this field is required
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

> Response Example


``` {.highlight .json .tab-json}
{
    "code": "0",
    "data": [
        {
            "beginTime": "1671638400000",
            "cTime": "1671675432000",
            "endTime": "1671638400000",
            "fileHref": "http://okg-pri-hk.oss-cn-hongkong.aliyuncs.com/okex/broker/pap/brokerRebateInfo/******/******/2022-12-22/RebateDetails/RebateDetails1222-1222.csv?Expires=1697617451&OSSAccessKeyId=******&Signature=******",
            "state": "finished",
            "ts": "1671676696000"
        }
    ],
    "msg": ""
}
```


#### Response Parameters 

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ------------------------------------------------------------------------------------------------------------------
  fileHref                String                  Download file link

  beginTime               String                  Rebate record begin time, Unix timestamp format in milliseconds, e.g. `1597026383085`

  endTime                 String                  Rebate record end time, Unix timestamp format in milliseconds, e.g. `1597026383085`

  cTime                   String                  The first request time for generating download link, Unix timestamp format in milliseconds, e.g. `1597026383085`

  ts                      String                  Download link generation time, Unix timestamp format in milliseconds, e.g. `1597026383085`

  state                   String                  Download link status\
                                                  \"finished\" \"ongoing\"
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### Field descriptions in the decompressed CSV file 

  ------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**                       **Description**
  ----------------------------------- ------------------------------------------------------------------------------------------------
  subAcct                             Sub-account name

  subAcctLv                           Sub-account level.\
                                      `1`：The first level sub-account\
                                      `2`: The second level sub-account

  firstLvSubAcct                      The first level sub-account.\
                                      For subAcctLv: 1, firstLvSubAcct is equal to subAcct.\
                                      For subAcctLv: 2, subAcct belongs to firstLvSubAcct

  instId                              Instrument ID

  ordId                               Order ID

  tradeId                             Last traded ID

  amt                                 Trade amount in USDT

  fee                                 fee amount in USDT

  execType                            Liquidity taker or maker\
                                      `T`: taker\
                                      `M`: maker

  ts                                  The last trade time of the order , Unix timestamp format in milliseconds, e.g. `1597026383085`
  ------------------------------------------------------------------------------------------------------------------------------------

### Create trading details download link (DMA) 

Support total historical trading details for all DMA sub-accounts under DMA Broker

#### Rate Limit: 1 request 60 min 

#### Rate limit rule: User ID 

#### Permission: Read 

#### HTTP Request 

`POST /api/v5/broker/dma/trades`

> Request Example


``` {.highlight .shell .tab-shell}
POST /api/v5/broker/dma/trades
body
{
    "begin":"20210623",
    "end":"20210626"
}
```


#### Request Parameters 

  Parameter   Type     Required   Description
  ----------- -------- ---------- ---------------------------------------------------------------------------------------------------------------------------
  begin       String   Yes        Begin date, in the format of `YYYYMMDD`, e.g. `20210623`, search data after `2021/06/23 00:00:00` (include), UTC timezone
  end         String   Yes        End date, in the format of `YYYYMMDD`, e.g. `20210623`, search data before `2021/06/24 00:00:00` (exclude), UTC timezone

The interval between begin and end of the data time range downloaded by one request is 180 days.

> Response Example


``` {.highlight .json .tab-json}
{
    "code": "0",
    "data":[
      {
        "result": "false",
        "ts": "1646892328000"
      }
    ],
    "msg": ""
}
```


#### Response Parameters 

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------
  result                  String                  Whether there is already a download link for this section\
                                                  `true`: Existed, can check from \"Get download link\".\
                                                  `false`: Does not exist and is generating, can check the download link after 3 hours

  ts                      String                  Time when the server received the first request to generate historical commission details. Unix timestamp format in milliseconds, e.g. `1597026383085`
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Check the file link from the \"Get download link (ND)\" endpoint in 3 hours to allow for data generation.\
During peak demand, data generation may take longer. If the file link is still unavailable after 5 hours, reach out to customer support for assistance.

# Fully Disclosed Broker (API and Oauth)

## Introduction 

There are 2 types of FD brokers. API brokers and OAuth brokers. If you are trading aggregator platform, trading bot platform, technical provider, asset management platform or a social trading platform, FD broker will be the most suitable option for you\
\

API Broker

-   Use OKX API to connect broker with OKX to enjoy OKX\'s unique products
-   Users are able to create API keys on OKX and provide them to the broker where they can use the broker UI to trade while choosing OKX as the exchange

OAuth Broker

-   OAuth login provides your users a safer and more convenient way for users to use your product
-   Broker can provide OAuth authorisation where API keys are automatically created for users
-   More details can refer to [broker homepage](/broker/home)

FD broker advanges:

-   High Commission
    -   Up to 50% commission
    -   Receives commission for both old and new users
    -   Support affiliate and broker rebates to get higher commissions
    -   Commissions received from high VIP users
-   Flexible commission management through broker dashboard
-   User\'s API safety
    -   FAST API, a more convenient and safer method for users to create API keys
    -   Third-party IP whitelists, strengthen security where only trades executed via your whitelisted servers can be executed

## OAuth Broker 

### Introduction 

OAuth login provides your users a safer and more convenient way to use your product.\
With OKX OAuth 2.0, users can trade with OKX after one-click authorization from third-party applications. No password or account API key is required.\
OKX OAuth 2.0 is available in both Web and Mobile applications and is developed based on some new features in the OAuth 2.0 protocol (RFC 6749) and the OAuth 2.1 draft protocol.\
To receive documents for OAuth, please contact your BD.

### Preparation before Integration 

1.  Register your account and apply for broker via the official website\
    You need to apply for an OAuth broker first and gain access to `client_id` and `client_secret` information after approval.\
    **Integration Procedures:**

    1.  Brokers apply for OKX accounts.
    2.  Brokers apply to be an OAuth broker via OKX official website and fill out the application form and fields with red asterisk are mandatory.
    3.  OKX will review the application form within 2 days after receiving it.
    4.  The broker will receive an email notification including `client_id` and `client_secret` once the application form is approved by OKX\'s platform.

2.  OAuth Rebate settings\
    OAuth-Broker needs to add BrokerCode in the Tag during order placement, and OKX will use that Tag to calculate rebate.

### Introduction of authorization mode 

OKX OAuth 2.0 provides: authorization code mode and PKCE mode.

  Authorization mode        Descriptions                                                                                                                                                                                         Scenario
  ------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Authorization code mode   With user authorization, the third-party app provides client_secret to get authorization code. access token and refresh token can be retrieved based on authorization codes.                         The application has a server, which can store app keys and interact with the OKX OAuth server .
  PKCE mode                 With User authorization, the third-party app provides code_verifier as a temporary key to obtain authorization code. access token and refresh token can be retrieved based on authorization codes.   The application has no server (or does not want the back-end server to intervene in the authorization process), therefore it cannot store the app key or interact with the OKX OAuth server through random characters.

#### Authorization code mode 

This mode is available in both App and Web application. User authorizes third-party application from an authorisation page, which receives user authorization code. After that, application exchanges it for access token, which can be used to call OKX OpenAPI.

![](/home/z/my-project/docs/exchange/okx/media/86574541e621018d8a4fe7eef4685f49380a3ce9.svg)

#### PKCE mode 

If the third-party application does not have a server or does not want the server to participate in the authorization process or not able to store the third-party app key (client_secret), then this mode is recommended to obtain token through client device access to effectively enhance the security of developer applications.

![](/home/z/my-project/docs/exchange/okx/media/77dcd6e20bdd84cbfc76e3ad20922748e8428ec4.svg)

### Usage of Token 

#### Differences between tokens 

After the third-party application calls the token exchange endpoint through authorization code, there will be two types of tokens.

-   access token : Used for third-party apps to call OKX OpenAPI endpoint.
-   refresh token : Used for obtaining a new access token when the previous one expires.

#### How to use 

> Example


``` {.highlight .shell .tab-shell}
curl -H "Content-Type:application/json" \
-H "Authorization:Bearer ******"  \
-H "TERMID:32cf9c63-6737-4ab5-b1ab-8858ae659185" \
https://www.okx.com/api/v5/asset/currencies
```


After the third-party app completes the authorization and obtains the token, it will be able to call the OKX OpenAPI endpoint through the access token. When requesting, you need to carry the following information in the request header:

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Header Parameters       Required                Descriptions
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Authorization           Yes                     Fill in the access token as bearer to this field, e.g. Access token is \"1234567890\", then the content of the field should be \"Bearer 1234567890\"

  TERMID                  Conditional             This field is used to verify the validity of the request\
                                                  If the request is initiated by the third-party client device app (such as selecting PKCE mode), the client device should include the device ID when requesting again\
                                                  If the request is initiated by the third-party app server (if the authorization code mode is selected), there is no need to fill in this field
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### Token validity 

-   access token : Valid within 1 hour
-   refresh token : Valid within 3 days

If the access token expires, the endpoint will no longer be accessible. If the refresh token is still within the valid period, the third-party app needs to call the refresh token endpoint to obtain a new pair of access token and refresh token. The new access token can continue to be used.\
When a new access token is retrieved via refresh token, the old access token cannot be used regardless of whether it has expired or not. When you revoke the token, the original one will no longer be valid.

### Permissions 

  Permissions Scope   Descriptions
  ------------------- ----------------------------------------------------------------------
  read_only           For read-only function permissions (not include sub-account modules)
  trade               For trading function permissions (not include sub-account modules)

### Fast API 

\
**Introduction**\
\

Fast API is a feature that helps OKX users quickly authorize third-party apps, create API Keys and bind third-party apps.

\
**Fast API workflow**\
\

![](/home/z/my-project/docs/exchange/okx/media/96626beb9010c8c07f52038d458f216d5d67ec4b.png)

After the Broker user logs in on the Broker interface, he can jump to the login OKX page through Oauth authorization. After the login authorization on the OKX page, OKX will authorize the API broker to create an API Key for his user with read-only and trade permissions.

\
**Application process**\

1.  Apply for API and OAuth Brokers on OKX

    -   It is recommended to apply for a third-party APP IP Whitelist\

2.  In the Oauth Broker application, provide

    -   Third-Party Servers IP Whitelist
    -   Redirect URL
    -   Logo
    -   Fast API permissions
    -   Cross Domain Name

3.  After your application is successful, you will receive an email with client_id and client_secret. Please keep this information safe and do not show it to others.

## Broker Commision API 

-   You can know whether the user is your invitee by [Affiliate endpoint](/docs-v5/en/#affiliate)
-   You can know whether the user can contribute rebate to you by [Get the user\'s broker rebate information](/docs-v5/broker_en/#fully-disclosed-broker-api-and-oauth-broker-commision-api-get-the-user-39-s-broker-rebate-information)
-   Rebate data download
    -   Generate data by [Create rebate details download link (FD)](/docs-v5/broker_en/#fully-disclosed-broker-api-and-oauth-broker-commision-api-create-rebate-details-download-link-fd) first.
    -   Then get download link by [Get download link (FD)](/docs-v5/broker_en/#fully-disclosed-broker-api-and-oauth-broker-commision-api-get-download-link-fd).

### Get download link (FD) 

Get the download link of the commission rebate details that have been successfully applied for. Every request gets refreshed links that are valid for 2 hours.

#### Rate Limit: 2 requests per min 

#### Rate limit rule: User ID 

#### Permission: Read 

#### HTTP Request 

`GET /api/v5/broker/fd/rebate-per-orders`

> Request Example


``` {.highlight .shell .tab-shell}
GET /api/v5/broker/fd/rebate-per-orders?type=false&begin=20211109&end=20211208
```



``` {.highlight .python .tab-python}
import okx.FDBroker as FDbroker

# API initialization
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"
flag = "0"  # Production trading: 0, Demo trading: 1

fdBrokerAPI = FDbroker.FDBrokerAPI(apikey, secretkey, passphrase, False, flag)

# Get the download link of the commission rebate details
result = fdBrokerAPI.get_rebate_details_download_link(
    type="true"
)
print(result)
```


#### Request Parameters 

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------------------------------------------------------------------
  type              String            Yes               Type\
                                                        `true`: Get all the generated history for the current user\
                                                        `false`: Query the specified history

  begin             String            Optional          Begin date for download link generated, in the format of `YYYYMMDD`, e.g. `20210623`, search data after `2021/06/23 00:00:00` (include)\
                                                        If `type` is false, this field is required

  end               String            Optional          End date for download link generated, in the format of `YYYYMMDD`, e.g. `20210623`, search data before `2021/06/24 00:00:00` (exclude)\
                                                        If `type` is false, this field is required

  brokerType        String            Optional          Broker type\
                                                        `api`: API Broker\
                                                        `oauth`: Oauth Broker\
                                                        When the broker has only one broker type, this parameter can be left blank\
                                                        This parameter is required when the broker has multiple broker types
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

> Response Example


``` {.highlight .json .tab-json}
{
    "code": "0",
    "data": [
        {
            "fileHref": "http://okg-pri-hk.oss-cn-hongkong.aliyuncs.com/okex/broker/pap/brokerRebateInfo/2c0ca94923dca9f53659507ee20a1f/2022-05-16/RebateDetails/RebateDetails0510-0513.xls?Expires=1652880844&OSSAccessKeyId=LTAIKNPwWs7ASPZn4iaa&Signature=ro%2BD2OMAgVzDrfguxjIM%2FY%3D",
            "state": "finished",
            "ts": "1646892328000"
        }
    ],
    "msg": ""
}
```


#### Response Parameters 

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ------------------------------------------------------------------------------------------------------------------
  fileHref                String                  Download file link

  beginTime               String                  Rebate record begin time, Unix timestamp format in milliseconds, e.g. `1597026383085`

  endTime                 String                  Rebate record end time, Unix timestamp format in milliseconds, e.g. `1597026383085`

  cTime                   String                  The first request time for generating download link, Unix timestamp format in milliseconds, e.g. `1597026383085`

  ts                      String                  Download link generation time, Unix timestamp format in milliseconds, e.g. `1597026383085`

  state                   String                  Download link status\
                                                  `finished`\
                                                  `ongoing`
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### Field descriptions in the decompressed CSV file 

  Parameter            Description
  -------------------- -------------------------------------------------------------------------------------------------------------------------------------
  brokerCode           Brokercode the user tag with
  level                The user level，e.g Lv1, VIP1, VIP2
  instId               Instrument ID
  ordId                Order ID
  spotTradeAmt         Spot trade volume, in unit of `USDT`
  derivativeTradeAmt   Derivative trade, in unit of `USDT`
  fee                  Fee, in unit of `USDT`
  netFee               Net fee (The fee base for commission settlement after removing data such as commission cards and counterparties), in unit of `USDT`
  settlementFee        Settlement fee (The fee base before settlement removing node commission rebates, commission cards, etc. ), in unit of `USDT`
  brokerRebate         Rebate amount to broker, in unit of `USDT`
  suBrokerRebate       Rebate amount to sub-broker, in unit of `USDT`
  userRebate           Rebate amount to user, in unit of `USDT`
  affiliated           Whether there is affiliated rebate. `true` or `false`
  ts                   The last trade time of the order. Unix timestamp format in milliseconds, e.g. `1597026383085`

### Create rebate details download link (FD) 

Support total historical commission details for FD Broker.

#### Rate Limit: 1 request 60 min 

#### Rate limit rule: User ID 

#### Permission: Read 

#### HTTP Request 

`POST /api/v5/broker/fd/rebate-per-orders`

> Request Example


``` {.highlight .shell .tab-shell}
POST /api/v5/broker/fd/rebate-per-orders
body
{
    "begin":"20210623",
    "end":"20210626"
}
```



``` {.highlight .python .tab-python}
import okx.FDBroker as FDbroker

# API initialization
apikey = "YOUR_API_KEY"
secretkey = "YOUR_SECRET_KEY"
passphrase = "YOUR_PASSPHRASE"
flag = "0"  # Production trading: 0, Demo trading: 1

fdBrokerAPI = FDbroker.FDBrokerAPI(apikey, secretkey, passphrase, False, flag)

# Generate historical commission details
result = fdBrokerAPI.generate_rebate_details_download_link(
    begin="20210623",
    end="20210626"
)
print(result)
```


#### Request Parameters 

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------------------------------------------------------------------------------
  begin             String            Yes               Begin date, in the format of `YYYYMMDD`, e.g. `20210623`, search data after `2021/06/23 00:00:00` (include)

  end               String            Yes               End date, in the format of `YYYYMMDD`, e.g. `20210623`, search data before `2021/06/24 00:00:00` (exclude)

  brokerType        String            Optional          Broker type\
                                                        `api`: API Broker\
                                                        `oauth`: Oauth Broker\
                                                        When the broker has only one broker type, this parameter can be left blank\
                                                        This parameter is required when the broker has multiple broker types
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------

The interval between begin and end of the data time range downloaded by one request is 180 days

> Response Example


``` {.highlight .json .tab-json}
{
    "code": "0",
    "data":[
      {
        "result": "true",
        "ts": "1646892328000"
      }
    ],
    "msg": ""
}
```


#### Response Parameters 

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------
  result                  String                  Whether there is already a download link for this section\
                                                  `true`: Existed, can check from \"Get download link\".\
                                                  `false`: Does not exist and is generating, can check the download link after 2 hours

  ts                      String                  Timestamp when the server received the first request to generate historical commission details. Unix timestamp format in milliseconds, e.g. `1597026383085`
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Check the file link from the \"Get download link (FD)\" endpoint in 2 hours to allow for data generation.\
During peak demand, data generation may take longer. If the file link is still unavailable after 3 hours, reach out to customer support for assistance.

### Get the user\'s broker rebate information 

If the user meets rebate conditions, places orders with brokerCode and pays the transaction fee, FD brokers will get broker rebate.

#### Rate Limit: 2 requests per second 

#### Rate limit rule: User ID 

#### Permission: Read 

#### HTTP Request 

`GET /api/v5/broker/fd/if-rebate`

> Request Example


``` {.highlight .shell .tab-shell}
GET /api/v5/broker/fd/if-rebate?apiKey=63d54aa0-0020-4ad9-a9f0-ac92654bc831
```


#### Request Parameters 

  -----------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------------------------------------------------------------
  apiKey            String            Yes               The user\'s API key

  brokerType        String            Optional          Broker Type\
                                                        `api`: API Broker\
                                                        `oauth`: Oauth Broker\
                                                        When the broker has only one broker type, this parameter can be left blank\
                                                        This parameter is required when the broker has multiple broker types
  -----------------------------------------------------------------------------------------------------------------------------------

> Response Example


``` {.highlight .json .tab-json}
{
    "code": "0",
    "data":[
      {
        "affiliated": false,
        "brokerCode": "6099c63a8d75SCDE",
        "type": "0",
        "clientRebateRatio":"0", 
        "lastRebate":""
      }
    ],
    "msg": ""
}
```


#### Response Parameters 

  -------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------------
  type                    String                  The reason that Broker cannot get broker rebate\
                                                  `0`: Broker can get broker rebate\
                                                  `1`: Broker identification is expired\
                                                  `2`: The trading fee level is `VIP5/6` and the monthly commission amount has reached the upper limit\
                                                  `3`: The trading fee level is greater than or equal to `VIP7`

  brokerCode              String                  Broker code for FD broker

  affiliated              String                  Whether there is an affiliated rebate\
                                                  `true`: there is an affiliated rebate\
                                                  `false`: no affiliated rebate

  clientRebateRatio       String                  Commission rebate ratio for client

  lastRebate              String                  Account monthly rebate amount. Only applicable to VIP5 and VIP6
  -------------------------------------------------------------------------------------------------------------------------------------------------------

## Error Code 

  Error Message   HTTP Status Code   Error Code
  --------------- ------------------ ------------------------------------------------------------------------------------------------
  53000           400                Invalid token
  53001           400                Authorization canceled
  53002           400                Token expired
  53003           400                Token revoked
  53004           400                Account has been frozen
  53005           400                Wrong refresh token
  53006           401                Invalid device
  53009           400                Authorization failed
  53010           400                Parameter {0} error
  53011           400                Parameter {0} cannot be empty
  53012           400                Authorization code expired. Make sure to use it within the valid timeframe and correct domain.
  53013           400                You don't have permission to access this API
  53014           401                Invalid IP
  53015           400                Parameter {name} length cannot exceed {max length}
  53016           400                Invalid redirect_uri
  53017           400                Fast API permissions not enabled




[HTTP](#){language-name="shell"} [Python](#){language-name="python"}



