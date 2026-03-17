---
title: "OKX API guide"
source: "https://www.okx.com/docs-v5/log_en/"
fetched: "2026-03-10T12:48:19+00:00"
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


-   [Upcoming Changes](#upcoming-changes){.toc-h1 .toc-link data-title="Upcoming Changes"}
    -   [Added response field `subCode` to place order and amend order APIs for more detailed error information in REST and WebSocket responses.](#upcoming-changes-added-response-field-subcode-to-place-order-and-amend-order-apis-for-more-detailed-error-information-in-rest-and-websocket-responses){.toc-h2 .toc-link data-title="Added response field subCode to place order and amend order APIs for more detailed error information in REST and WebSocket responses."}
    -   [Delist instId request parameter in WS order operation channels](#upcoming-changes-delist-instid-request-parameter-in-ws-order-operation-channels){.toc-h2 .toc-link data-title="Delist instId request parameter in WS order operation channels"}
    -   [Delist old attached stop profit and stop loss parameters](#upcoming-changes-delist-old-attached-stop-profit-and-stop-loss-parameters){.toc-h2 .toc-link data-title="Delist old attached stop profit and stop loss parameters"}
-   [2026-03-04](#2026-03-04){.toc-h1 .toc-link data-title="2026-03-04"}
    -   [Pre-market rebase contract](#2026-03-04-delist-old-attached-stop-profit-and-stop-loss-parameters-pre-market-rebase-contract){.toc-h2 .toc-link data-title="Pre-market rebase contract"}
-   [2026-03-02](#2026-03-02){.toc-h1 .toc-link data-title="2026-03-02"}
    -   [SBE Market Data](#2026-03-02-delist-old-attached-stop-profit-and-stop-loss-parameters-sbe-market-data){.toc-h2 .toc-link data-title="SBE Market Data"}
    -   [Instruments](#2026-03-02-delist-old-attached-stop-profit-and-stop-loss-parameters-instruments){.toc-h2 .toc-link data-title="Instruments"}
-   [2026-02-27](#2026-02-27){.toc-h1 .toc-link data-title="2026-02-27"}
-   [2026-02-12](#2026-02-12){.toc-h1 .toc-link data-title="2026-02-12"}
-   [2026-02-05](#2026-02-05){.toc-h1 .toc-link data-title="2026-02-05"}
-   [2026-01-21](#2026-01-21){.toc-h1 .toc-link data-title="2026-01-21"}
-   [2026-01-15](#2026-01-15){.toc-h1 .toc-link data-title="2026-01-15"}
    -   [Rename XAUT Perpetual Contract](#2026-01-15-rename-xaut-perpetual-contract){.toc-h2 .toc-link data-title="Rename XAUT Perpetual Contract"}
-   [2026-01-13](#2026-01-13){.toc-h1 .toc-link data-title="2026-01-13"}
-   [2026-01-07](#2026-01-07){.toc-h1 .toc-link data-title="2026-01-07"}
-   [2025-12-22](#2025-12-22){.toc-h1 .toc-link data-title="2025-12-22"}
-   [2025-12-10](#2025-12-10){.toc-h1 .toc-link data-title="2025-12-10"}
    -   [Manual borrow rate limit Update](#2025-12-10-manual-borrow-rate-limit-update){.toc-h2 .toc-link data-title="Manual borrow rate limit Update"}
-   [2025-12-03](#2025-12-03){.toc-h1 .toc-link data-title="2025-12-03"}
-   [2025-11-26](#2025-11-26){.toc-h1 .toc-link data-title="2025-11-26"}
    -   [Orders endpoints](#2025-11-26-orders-endpoints){.toc-h2 .toc-link data-title="Orders endpoints"}
    -   [Market data](#2025-11-26-market-data){.toc-h2 .toc-link data-title="Market data"}
    -   [cancelSource](#2025-11-26-cancelsource){.toc-h2 .toc-link data-title="cancelSource"}
    -   [Error code](#2025-11-26-error-code){.toc-h2 .toc-link data-title="Error code"}
-   [2025-11-25](#2025-11-25){.toc-h1 .toc-link data-title="2025-11-25"}
    -   [Instruments endpoint/channel](#2025-11-25-error-code-instruments-endpoint-channel){.toc-h2 .toc-link data-title="Instruments endpoint/channel"}
    -   [Get fee rates endpoint](#2025-11-25-error-code-get-fee-rates-endpoint){.toc-h2 .toc-link data-title="Get fee rates endpoint"}
-   [2025-11-21](#2025-11-21){.toc-h1 .toc-link data-title="2025-11-21"}
    -   [ETH staking redeem updates](#2025-11-21-eth-staking-redeem-updates){.toc-h2 .toc-link data-title="ETH staking redeem updates"}
-   [2025-11-20](#2025-11-20){.toc-h1 .toc-link data-title="2025-11-20"}
-   [2025-11-13](#2025-11-13){.toc-h1 .toc-link data-title="2025-11-13"}
    -   [Delta neutral strategy](#2025-11-13-delta-neutral-strategy){.toc-h2 .toc-link data-title="Delta neutral strategy"}
        -   [New endpoints](#2025-11-13-delta-neutral-strategy-new-endpoints){.toc-h3 .toc-link data-title="New endpoints"}
        -   [Get account configuration](#2025-11-13-delta-neutral-strategy-get-account-configuration){.toc-h3 .toc-link data-title="Get account configuration"}
        -   [Get interest rate and loan quota](#2025-11-13-delta-neutral-strategy-get-interest-rate-and-loan-quota){.toc-h3 .toc-link data-title="Get interest rate and loan quota"}
        -   [Balance endpoints/account channel](#2025-11-13-delta-neutral-strategy-balance-endpoints-account-channel){.toc-h3 .toc-link data-title="Balance endpoints/account channel"}
        -   [Get positions/Positions channel](#2025-11-13-delta-neutral-strategy-get-positions-positions-channel){.toc-h3 .toc-link data-title="Get positions/Positions channel"}
        -   [Get maximum withdrawals](#2025-11-13-delta-neutral-strategy-get-maximum-withdrawals){.toc-h3 .toc-link data-title="Get maximum withdrawals"}
        -   [cancelSource](#2025-11-13-delta-neutral-strategy-cancelsource){.toc-h3 .toc-link data-title="cancelSource"}
        -   [Error code](#2025-11-13-delta-neutral-strategy-error-code){.toc-h3 .toc-link data-title="Error code"}
    -   [Stablecoin lender APR logic update](#2025-11-13-stablecoin-lender-apr-logic-update){.toc-h2 .toc-link data-title="Stablecoin lender APR logic update"}
-   [2025-11-11](#2025-11-11){.toc-h1 .toc-link data-title="2025-11-11"}
    -   [Deposit Record Masking](#2025-11-11-deposit-record-masking){.toc-h2 .toc-link data-title="Deposit Record Masking"}
-   [2025-11-06](#2025-11-06){.toc-h1 .toc-link data-title="2025-11-06"}
-   [2025-10-23](#2025-10-23){.toc-h1 .toc-link data-title="2025-10-23"}
    -   [Add position limit parameters to account/instruments endpoint](#2025-10-23-add-position-limit-parameters-to-account-instruments-endpoint){.toc-h2 .toc-link data-title="Add position limit parameters to account/instruments endpoint"}
    -   [Announcements endpoint pTime update & businessPTime added](#2025-10-23-announcements-endpoint-ptime-update-amp-businessptime-added){.toc-h2 .toc-link data-title="Announcements endpoint pTime update & businessPTime added"}
-   [2025-09-26](#2025-09-26){.toc-h1 .toc-link data-title="2025-09-26"}
    -   [New request field](#2025-09-26-new-request-field){.toc-h2 .toc-link data-title="New request field"}
    -   [USD-margined contract](#2025-09-26-usd-margined-contract){.toc-h2 .toc-link data-title="USD-margined contract"}
        -   [New endpoint](#2025-09-26-usd-margined-contract-new-endpoint){.toc-h3 .toc-link data-title="New endpoint"}
        -   [New Response Parameters](#2025-09-26-usd-margined-contract-new-response-parameters){.toc-h3 .toc-link data-title="New Response Parameters"}
        -   [Return parameters meaning adjustment](#2025-09-26-usd-margined-contract-return-parameters-meaning-adjustment){.toc-h3 .toc-link data-title="Return parameters meaning adjustment"}
        -   [`instFamily` and `uly` parameter explanation](#2025-09-26-usd-margined-contract-instfamily-and-uly-parameter-explanation){.toc-h3 .toc-link data-title="<code>instFamily</code> and <code>uly</code> parameter explanation"}
        -   [New error code](#2025-09-26-usd-margined-contract-new-error-code){.toc-h3 .toc-link data-title="New error code"}
-   [2025-09-17](#2025-09-17){.toc-h1 .toc-link data-title="2025-09-17"}
    -   [Spot and margin fee in quote currency](#2025-09-17-spot-and-margin-fee-in-quote-currency){.toc-h2 .toc-link data-title="Spot and margin fee in quote currency"}
-   [2025-09-11](#2025-09-11){.toc-h1 .toc-link data-title="2025-09-11"}
-   [2025-09-10](#2025-09-10){.toc-h1 .toc-link data-title="2025-09-10"}
    -   [Create RFQ](#2025-09-10-spot-and-margin-fee-in-quote-currency-create-rfq){.toc-h2 .toc-link data-title="Create RFQ"}
    -   [Get rfqs/Rfqs channel](#2025-09-10-spot-and-margin-fee-in-quote-currency-get-rfqs-rfqs-channel){.toc-h2 .toc-link data-title="Get rfqs/Rfqs channel"}
    -   [Execute quote](#2025-09-10-spot-and-margin-fee-in-quote-currency-execute-quote){.toc-h2 .toc-link data-title="Execute quote"}
    -   [MMP related endpoints](#2025-09-10-spot-and-margin-fee-in-quote-currency-mmp-related-endpoints){.toc-h2 .toc-link data-title="MMP related endpoints"}
    -   [Get trades](#2025-09-10-spot-and-margin-fee-in-quote-currency-get-trades){.toc-h2 .toc-link data-title="Get trades"}
    -   [Structure block trades channel](#2025-09-10-spot-and-margin-fee-in-quote-currency-structure-block-trades-channel){.toc-h2 .toc-link data-title="Structure block trades channel"}
    -   [Public trades data](#2025-09-10-spot-and-margin-fee-in-quote-currency-public-trades-data){.toc-h2 .toc-link data-title="Public trades data"}
    -   [Error codes](#2025-09-10-spot-and-margin-fee-in-quote-currency-error-codes){.toc-h2 .toc-link data-title="Error codes"}
-   [2025-09-09](#2025-09-09){.toc-h1 .toc-link data-title="2025-09-09"}
-   [2025-09-04](#2025-09-04){.toc-h1 .toc-link data-title="2025-09-04"}
-   [2025-09-02](#2025-09-02){.toc-h1 .toc-link data-title="2025-09-02"}
    -   [Historical market data query endpoint](#2025-09-02-historical-market-data-query-endpoint){.toc-h2 .toc-link data-title="Historical market data query endpoint"}
    -   [Rate limit reduction for manual borrow/repay](#2025-09-02-rate-limit-reduction-for-manual-borrow-repay){.toc-h2 .toc-link data-title="Rate limit reduction for manual borrow/repay"}
-   [2025-08-28](#2025-08-28){.toc-h1 .toc-link data-title="2025-08-28"}
-   [2025-08-26](#2025-08-26){.toc-h1 .toc-link data-title="2025-08-26"}
-   [2025-08-20](#2025-08-20){.toc-h1 .toc-link data-title="2025-08-20"}
    -   [Unified USD orderbook revamp](#2025-08-20-unified-usd-orderbook-revamp){.toc-h2 .toc-link data-title="Unified USD orderbook revamp"}
-   [2025-08-12](#2025-08-12){.toc-h1 .toc-link data-title="2025-08-12"}
-   [2025-08-08](#2025-08-08){.toc-h1 .toc-link data-title="2025-08-08"}
-   [2025-08-05](#2025-08-05){.toc-h1 .toc-link data-title="2025-08-05"}
-   [2025-07-30](#2025-07-30){.toc-h1 .toc-link data-title="2025-07-30"}
-   [2025-07-29](#2025-07-29){.toc-h1 .toc-link data-title="2025-07-29"}
-   [2025-07-24](#2025-07-24){.toc-h1 .toc-link data-title="2025-07-24"}
    -   [Add auto earn feature](#2025-07-24-add-auto-earn-feature){.toc-h2 .toc-link data-title="Add auto earn feature"}
    -   [Added toAddrType parameter in withdrawal endpoints](#2025-07-24-added-toaddrtype-parameter-in-withdrawal-endpoints){.toc-h2 .toc-link data-title="Added toAddrType parameter in withdrawal endpoints"}
-   [2025-07-08](#2025-07-08){.toc-h1 .toc-link data-title="2025-07-08"}
    -   [Open API supports Unified USD Orderbook](#2025-07-08-open-api-supports-unified-usd-orderbook){.toc-h2 .toc-link data-title="Open API supports Unified USD Orderbook"}
    -   [Trades channel adds seqId field](#2025-07-08-trades-channel-adds-seqid-field){.toc-h2 .toc-link data-title="Trades channel adds seqId field"}
    -   [Fills channel adds clOrdId push data parameter](#2025-07-08-fills-channel-adds-clordid-push-data-parameter){.toc-h2 .toc-link data-title="Fills channel adds clOrdId push data parameter"}
    -   [Order channel revamp](#2025-07-08-order-channel-revamp){.toc-h2 .toc-link data-title="Order channel revamp"}
    -   [Transaction timeouts revamp](#2025-07-08-transaction-timeouts-revamp){.toc-h2 .toc-link data-title="Transaction timeouts revamp"}
-   [2025-07-02](#2025-07-02){.toc-h1 .toc-link data-title="2025-07-02"}
-   [2025-06-26](#2025-06-26){.toc-h1 .toc-link data-title="2025-06-26"}
-   [2025-06-24](#2025-06-24){.toc-h1 .toc-link data-title="2025-06-24"}
-   [2025-06-19](#2025-06-19){.toc-h1 .toc-link data-title="2025-06-19"}
-   [2025-06-17](#2025-06-17){.toc-h1 .toc-link data-title="2025-06-17"}
    -   [Fiat Buy/Sell](#2025-06-17-fiat-buy-sell){.toc-h2 .toc-link data-title="Fiat Buy/Sell"}
-   [2025-06-13](#2025-06-13){.toc-h1 .toc-link data-title="2025-06-13"}
-   [2025-06-03](#2025-06-03){.toc-h1 .toc-link data-title="2025-06-03"}
-   [2025-05-30](#2025-05-30){.toc-h1 .toc-link data-title="2025-05-30"}
-   [2025-05-29](#2025-05-29){.toc-h1 .toc-link data-title="2025-05-29"}
    -   [Add id parameter to all websocket subscribe & response](#2025-05-29-add-id-parameter-to-all-websocket-subscribe-amp-response){.toc-h2 .toc-link data-title="Add id parameter to all websocket subscribe & response"}
    -   [Add pre-open related response parameters](#2025-05-29-add-pre-open-related-response-parameters){.toc-h2 .toc-link data-title="Add pre-open related response parameters"}
-   [2025-05-28](#2025-05-28){.toc-h1 .toc-link data-title="2025-05-28"}
    -   [DMA Broker Endpionts Revamp](#2025-05-28-dma-broker-endpionts-revamp){.toc-h2 .toc-link data-title="DMA Broker Endpionts Revamp"}
-   [2025-05-27](#2025-05-27){.toc-h1 .toc-link data-title="2025-05-27"}
    -   [Adjustment for websocket disconnect notification](#2025-05-27-adjustment-for-websocket-disconnect-notification){.toc-h2 .toc-link data-title="Adjustment for websocket disconnect notification"}
-   [2025-05-26](#2025-05-26){.toc-h1 .toc-link data-title="2025-05-26"}
-   [2025-05-21](#2025-05-21){.toc-h1 .toc-link data-title="2025-05-21"}
-   [2025-05-15](#2025-05-15){.toc-h1 .toc-link data-title="2025-05-15"}
-   [2025-05-08](#2025-05-08){.toc-h1 .toc-link data-title="2025-05-08"}
-   [2025-05-07](#2025-05-07){.toc-h1 .toc-link data-title="2025-05-07"}
-   [2025-05-06](#2025-05-06){.toc-h1 .toc-link data-title="2025-05-06"}
    -   [Instruments endpoints revamp](#2025-05-06-instruments-endpoints-revamp){.toc-h2 .toc-link data-title="Instruments endpoints revamp"}
-   [2025-04-28](#2025-04-28){.toc-h1 .toc-link data-title="2025-04-28"}
    -   [AWS domain ceased service](#2025-04-28-aws-domain-ceased-service){.toc-h2 .toc-link data-title="AWS domain ceased service"}
-   [2025-04-24](#2025-04-24){.toc-h1 .toc-link data-title="2025-04-24"}
-   [2025-04-17](#2025-04-17){.toc-h1 .toc-link data-title="2025-04-17"}
-   [2025-04-02](#2025-04-02){.toc-h1 .toc-link data-title="2025-04-02"}
-   [2025-03-26](#2025-03-26){.toc-h1 .toc-link data-title="2025-03-26"}
    -   [Setting collateral cryptocurrencies in multi-currency account mode](#2025-03-26-setting-collateral-cryptocurrencies-in-multi-currency-account-mode){.toc-h2 .toc-link data-title="Setting collateral cryptocurrencies in multi-currency account mode"}
    -   [Adding parameters for Websocket](#2025-03-26-adding-parameters-for-websocket){.toc-h2 .toc-link data-title="Adding parameters for Websocket"}
-   [2025-03-21](#2025-03-21){.toc-h1 .toc-link data-title="2025-03-21"}
-   [2025-03-19](#2025-03-19){.toc-h1 .toc-link data-title="2025-03-19"}
-   [2025-03-18](#2025-03-18){.toc-h1 .toc-link data-title="2025-03-18"}
    -   [One-click repay supported in SPOT mode](#2025-03-18-one-click-repay-supported-in-spot-mode){.toc-h2 .toc-link data-title="One-click repay supported in SPOT mode"}
-   [2025-03-12](#2025-03-12){.toc-h1 .toc-link data-title="2025-03-12"}
    -   [Expiry futures daily settlement](#2025-03-12-expiry-futures-daily-settlement){.toc-h2 .toc-link data-title="Expiry futures daily settlement"}
    -   [New cancelSource enumeration](#2025-03-12-new-cancelsource-enumeration){.toc-h2 .toc-link data-title="New cancelSource enumeration"}
    -   [Add pagination parameters in push data in account and position channels](#2025-03-12-add-pagination-parameters-in-push-data-in-account-and-position-channels){.toc-h2 .toc-link data-title="Add pagination parameters in push data in account and position channels"}
-   [2025-03-03](#2025-03-03){.toc-h1 .toc-link data-title="2025-03-03"}
    -   [Fixed Loan and Simple Earn Fixed going offline](#2025-03-03-fixed-loan-and-simple-earn-fixed-going-offline){.toc-h2 .toc-link data-title="Fixed Loan and Simple Earn Fixed going offline"}
        -   [Fixed Loan](#2025-03-03-fixed-loan-and-simple-earn-fixed-going-offline-fixed-loan){.toc-h3 .toc-link data-title="Fixed Loan"}
        -   [Simple Earn Fixed](#2025-03-03-fixed-loan-and-simple-earn-fixed-going-offline-simple-earn-fixed){.toc-h3 .toc-link data-title="Simple Earn Fixed"}
-   [2025-02-12](#2025-02-12){.toc-h1 .toc-link data-title="2025-02-12"}
    -   [Isolated margin support base and quote currency as collateral](#2025-02-12-isolated-margin-support-base-and-quote-currency-as-collateral){.toc-h2 .toc-link data-title="Isolated margin support base and quote currency as collateral"}
-   [2025-01-17](#2025-01-17){.toc-h1 .toc-link data-title="2025-01-17"}
    -   [Update margin calculation rules for the portfolio margin mode](#2025-01-17-update-margin-calculation-rules-for-the-portfolio-margin-mode){.toc-h2 .toc-link data-title="Update margin calculation rules for the portfolio margin mode"}
-   [2025-01-15](#2025-01-15){.toc-h1 .toc-link data-title="2025-01-15"}
-   [2025-01-07](#2025-01-07){.toc-h1 .toc-link data-title="2025-01-07"}
    -   [Get oracle API is offline](#2025-01-07-get-oracle-api-is-offline){.toc-h2 .toc-link data-title="Get oracle API is offline"}
-   [2024-12-31](#2024-12-31){.toc-h1 .toc-link data-title="2024-12-31"}
-   [2024-12-18](#2024-12-18){.toc-h1 .toc-link data-title="2024-12-18"}
    -   [Websocket disconnect notification for service upgrade](#2024-12-18-websocket-disconnect-notification-for-service-upgrade){.toc-h2 .toc-link data-title="Websocket disconnect notification for service upgrade"}
-   [2024-12-16](#2024-12-16){.toc-h1 .toc-link data-title="2024-12-16"}
-   [2024-12-11](#2024-12-11){.toc-h1 .toc-link data-title="2024-12-11"}
-   [2024-12-04](#2024-12-04){.toc-h1 .toc-link data-title="2024-12-04"}
-   [2024-12-03](#2024-12-03){.toc-h1 .toc-link data-title="2024-12-03"}
-   [2024-11-28](#2024-11-28){.toc-h1 .toc-link data-title="2024-11-28"}
-   [2024-11-22](#2024-11-22){.toc-h1 .toc-link data-title="2024-11-22"}
-   [2024-11-21](#2024-11-21){.toc-h1 .toc-link data-title="2024-11-21"}
    -   [Fixed Loan and Simple Earn Fixed going offline](#2024-11-21-fixed-loan-and-simple-earn-fixed-going-offline){.toc-h2 .toc-link data-title="Fixed Loan and Simple Earn Fixed going offline"}
        -   [Fixed Loan API adjustment](#2024-11-21-fixed-loan-and-simple-earn-fixed-going-offline-fixed-loan-api-adjustment){.toc-h3 .toc-link data-title="Fixed Loan API adjustment"}
        -   [Simple Earn Fixed API adjustment](#2024-11-21-fixed-loan-and-simple-earn-fixed-going-offline-simple-earn-fixed-api-adjustment){.toc-h3 .toc-link data-title="Simple Earn Fixed API adjustment"}
-   [2024-11-20](#2024-11-20){.toc-h1 .toc-link data-title="2024-11-20"}
    -   [Chase order](#2024-11-20-chase-order){.toc-h2 .toc-link data-title="Chase order"}
-   [2024-11-18](#2024-11-18){.toc-h1 .toc-link data-title="2024-11-18"}
-   [2024-11-14](#2024-11-14){.toc-h1 .toc-link data-title="2024-11-14"}
-   [2024-11-11](#2024-11-11){.toc-h1 .toc-link data-title="2024-11-11"}
-   [2024-11-08](#2024-11-08){.toc-h1 .toc-link data-title="2024-11-08"}
-   [2024-10-28](#2024-10-28){.toc-h1 .toc-link data-title="2024-10-28"}
-   [2024-10-23](#2024-10-23){.toc-h1 .toc-link data-title="2024-10-23"}
-   [2024-10-17](#2024-10-17){.toc-h1 .toc-link data-title="2024-10-17"}
    -   [Convert revamp](#2024-10-17-convert-revamp){.toc-h2 .toc-link data-title="Convert revamp"}
        -   [Convert](#2024-10-17-convert-revamp-convert){.toc-h3 .toc-link data-title="Convert"}
        -   [Easy convert](#2024-10-17-convert-revamp-easy-convert){.toc-h3 .toc-link data-title="Easy convert"}
        -   [One-click repay](#2024-10-17-convert-revamp-one-click-repay){.toc-h3 .toc-link data-title="One-click repay"}
        -   [Small assets convert](#2024-10-17-convert-revamp-small-assets-convert){.toc-h3 .toc-link data-title="Small assets convert"}
-   [2024-10-15](#2024-10-15){.toc-h1 .toc-link data-title="2024-10-15"}
-   [2024-10-14](#2024-10-14){.toc-h1 .toc-link data-title="2024-10-14"}
-   [2024-10-10](#2024-10-10){.toc-h1 .toc-link data-title="2024-10-10"}
-   [2024-10-04](#2024-10-04){.toc-h1 .toc-link data-title="2024-10-04"}
-   [2024-10-01](#2024-10-01){.toc-h1 .toc-link data-title="2024-10-01"}
-   [2024-09-20](#2024-09-20){.toc-h1 .toc-link data-title="2024-09-20"}
-   [2024-09-19](#2024-09-19){.toc-h1 .toc-link data-title="2024-09-19"}
-   [2024-09-18](#2024-09-18){.toc-h1 .toc-link data-title="2024-09-18"}
-   [2024-09-13](#2024-09-13){.toc-h1 .toc-link data-title="2024-09-13"}
-   [2024-08-29](#2024-08-29){.toc-h1 .toc-link data-title="2024-08-29"}
-   [2024-08-28](#2024-08-28){.toc-h1 .toc-link data-title="2024-08-28"}
-   [2024-08-22](#2024-08-22){.toc-h1 .toc-link data-title="2024-08-22"}
-   [2024-08-21](#2024-08-21){.toc-h1 .toc-link data-title="2024-08-21"}
-   [2024-08-14](#2024-08-14){.toc-h1 .toc-link data-title="2024-08-14"}
    -   [Added fills channel](#2024-08-14-added-fills-channel){.toc-h2 .toc-link data-title="Added fills channel"}
    -   [OKX to change discount rate rules in multi-currency and portfolio margin modes](#2024-08-14-okx-to-change-discount-rate-rules-in-multi-currency-and-portfolio-margin-modes){.toc-h2 .toc-link data-title="OKX to change discount rate rules in multi-currency and portfolio margin modes"}
    -   [Added endpoints](#2024-08-14-added-endpoints){.toc-h2 .toc-link data-title="Added endpoints"}
    -   [Added request fields](#2024-08-14-added-request-fields){.toc-h2 .toc-link data-title="Added request fields"}
-   [2024-08-08](#2024-08-08){.toc-h1 .toc-link data-title="2024-08-08"}
    -   [Withdrawal API adjustment for Bahamas entity users](#2024-08-08-withdrawal-api-adjustment-for-bahamas-entity-users){.toc-h2 .toc-link data-title="Withdrawal API adjustment for Bahamas entity users"}
        -   [Withdraw assets to the exchange wallet](#2024-08-08-withdrawal-api-adjustment-for-bahamas-entity-users-withdraw-assets-to-the-exchange-wallet){.toc-h3 .toc-link data-title="Withdraw assets to the exchange wallet"}
        -   [Withdraw assets to the private wallet](#2024-08-08-withdrawal-api-adjustment-for-bahamas-entity-users-withdraw-assets-to-the-private-wallet){.toc-h3 .toc-link data-title="Withdraw assets to the private wallet"}
        -   [Newly added error code](#2024-08-08-withdrawal-api-adjustment-for-bahamas-entity-users-newly-added-error-code){.toc-h3 .toc-link data-title="Newly added error code"}
-   [2024-08-01](#2024-08-01){.toc-h1 .toc-link data-title="2024-08-01"}
-   [2024-07-23](#2024-07-23){.toc-h1 .toc-link data-title="2024-07-23"}
-   [2024-07-17](#2024-07-17){.toc-h1 .toc-link data-title="2024-07-17"}
-   [2024-07-04](#2024-07-04){.toc-h1 .toc-link data-title="2024-07-04"}
-   [2024-07-03](#2024-07-03){.toc-h1 .toc-link data-title="2024-07-03"}
-   [2024-06-26](#2024-06-26){.toc-h1 .toc-link data-title="2024-06-26"}
-   [2024-06-25](#2024-06-25){.toc-h1 .toc-link data-title="2024-06-25"}
-   [2024-06-20](#2024-06-20){.toc-h1 .toc-link data-title="2024-06-20"}
-   [2024-06-19](#2024-06-19){.toc-h1 .toc-link data-title="2024-06-19"}
-   [2024-06-13](#2024-06-13){.toc-h1 .toc-link data-title="2024-06-13"}
-   [2024-06-05](#2024-06-05){.toc-h1 .toc-link data-title="2024-06-05"}
-   [2024-06-03](#2024-06-03){.toc-h1 .toc-link data-title="2024-06-03"}
-   [2024-05-30](#2024-05-30){.toc-h1 .toc-link data-title="2024-05-30"}
-   [2024-05-15](#2024-05-15){.toc-h1 .toc-link data-title="2024-05-15"}
-   [2024-05-10](#2024-05-10){.toc-h1 .toc-link data-title="2024-05-10"}
-   [2024-05-09](#2024-05-09){.toc-h1 .toc-link data-title="2024-05-09"}
-   [2024-05-08](#2024-05-08){.toc-h1 .toc-link data-title="2024-05-08"}
-   [2024-05-06](#2024-05-06){.toc-h1 .toc-link data-title="2024-05-06"}
-   [2024-04-25](#2024-04-25){.toc-h1 .toc-link data-title="2024-04-25"}
-   [2024-04-24](#2024-04-24){.toc-h1 .toc-link data-title="2024-04-24"}
-   [2024-04-18](#2024-04-18){.toc-h1 .toc-link data-title="2024-04-18"}
-   [2024-04-11](#2024-04-11){.toc-h1 .toc-link data-title="2024-04-11"}
-   [2024-04-10](#2024-04-10){.toc-h1 .toc-link data-title="2024-04-10"}
-   [2024-04-02](#2024-04-02){.toc-h1 .toc-link data-title="2024-04-02"}
-   [2024-03-27](#2024-03-27){.toc-h1 .toc-link data-title="2024-03-27"}
-   [2024-03-19](#2024-03-19){.toc-h1 .toc-link data-title="2024-03-19"}
-   [2024-03-14](#2024-03-14){.toc-h1 .toc-link data-title="2024-03-14"}
-   [2024-03-12](#2024-03-12){.toc-h1 .toc-link data-title="2024-03-12"}
-   [2024-03-06](#2024-03-06){.toc-h1 .toc-link data-title="2024-03-06"}
-   [2024-02-28](#2024-02-28){.toc-h1 .toc-link data-title="2024-02-28"}
-   [2024-02-07](#2024-02-07){.toc-h1 .toc-link data-title="2024-02-07"}
-   [2024-02-06](#2024-02-06){.toc-h1 .toc-link data-title="2024-02-06"}
-   [2024-02-01](#2024-02-01){.toc-h1 .toc-link data-title="2024-02-01"}
-   [2024-01-31](#2024-01-31){.toc-h1 .toc-link data-title="2024-01-31"}
-   [2024-01-22](#2024-01-22){.toc-h1 .toc-link data-title="2024-01-22"}
-   [2024-01-18](#2024-01-18){.toc-h1 .toc-link data-title="2024-01-18"}
-   [2024-01-17](#2024-01-17){.toc-h1 .toc-link data-title="2024-01-17"}
-   [2024-01-18](#2024-01-18){.toc-h1 .toc-link data-title="2024-01-18"}
-   [2024-01-10](#2024-01-10){.toc-h1 .toc-link data-title="2024-01-10"}
-   [2024-01-09](#2024-01-09){.toc-h1 .toc-link data-title="2024-01-09"}
-   [2024-01-04](#2024-01-04){.toc-h1 .toc-link data-title="2024-01-04"}
-   [2023-12-28](#2023-12-28){.toc-h1 .toc-link data-title="2023-12-28"}
-   [2023-12-20](#2023-12-20){.toc-h1 .toc-link data-title="2023-12-20"}
-   [2023-12-12](#2023-12-12){.toc-h1 .toc-link data-title="2023-12-12"}
-   [2023-12-11](#2023-12-11){.toc-h1 .toc-link data-title="2023-12-11"}
-   [2023-12-07](#2023-12-07){.toc-h1 .toc-link data-title="2023-12-07"}
-   [2023-12-06](#2023-12-06){.toc-h1 .toc-link data-title="2023-12-06"}
-   [2023-12-05](#2023-12-05){.toc-h1 .toc-link data-title="2023-12-05"}
-   [2023-12-04](#2023-12-04){.toc-h1 .toc-link data-title="2023-12-04"}
-   [2023-11-30](#2023-11-30){.toc-h1 .toc-link data-title="2023-11-30"}
-   [2023-11-22](#2023-11-22){.toc-h1 .toc-link data-title="2023-11-22"}
-   [2023-11-18](#2023-11-18){.toc-h1 .toc-link data-title="2023-11-18"}
-   [2023-11-16](#2023-11-16){.toc-h1 .toc-link data-title="2023-11-16"}
-   [2023-11-15](#2023-11-15){.toc-h1 .toc-link data-title="2023-11-15"}
-   [2023-11-13](#2023-11-13){.toc-h1 .toc-link data-title="2023-11-13"}
-   [2023-11-10](#2023-11-10){.toc-h1 .toc-link data-title="2023-11-10"}
-   [2023-11-08](#2023-11-08){.toc-h1 .toc-link data-title="2023-11-08"}
-   [2023-11-07](#2023-11-07){.toc-h1 .toc-link data-title="2023-11-07"}
-   [2023-11-02](#2023-11-02){.toc-h1 .toc-link data-title="2023-11-02"}
-   [2023-11-01](#2023-11-01){.toc-h1 .toc-link data-title="2023-11-01"}
-   [2023-10-31](#2023-10-31){.toc-h1 .toc-link data-title="2023-10-31"}
-   [2023-10-27](#2023-10-27){.toc-h1 .toc-link data-title="2023-10-27"}
-   [2023-10-24](#2023-10-24){.toc-h1 .toc-link data-title="2023-10-24"}
-   [2023-10-19](#2023-10-19){.toc-h1 .toc-link data-title="2023-10-19"}
-   [2023-10-18](#2023-10-18){.toc-h1 .toc-link data-title="2023-10-18"}
-   [2023-09-29](#2023-09-29){.toc-h1 .toc-link data-title="2023-09-29"}
-   [2023-09-28](#2023-09-28){.toc-h1 .toc-link data-title="2023-09-28"}
-   [2023-09-27](#2023-09-27){.toc-h1 .toc-link data-title="2023-09-27"}
-   [2023-09-20](#2023-09-20){.toc-h1 .toc-link data-title="2023-09-20"}
-   [2023-09-13](#2023-09-13){.toc-h1 .toc-link data-title="2023-09-13"}
-   [2023-09-08](#2023-09-08){.toc-h1 .toc-link data-title="2023-09-08"}
-   [2023-08-31](#2023-08-31){.toc-h1 .toc-link data-title="2023-08-31"}
-   [2023-08-30](#2023-08-30){.toc-h1 .toc-link data-title="2023-08-30"}
-   [2023-08-23](#2023-08-23){.toc-h1 .toc-link data-title="2023-08-23"}
-   [2023-08-22](#2023-08-22){.toc-h1 .toc-link data-title="2023-08-22"}
-   [2023-08-16](#2023-08-16){.toc-h1 .toc-link data-title="2023-08-16"}
-   [2023-08-14](#2023-08-14){.toc-h1 .toc-link data-title="2023-08-14"}
-   [2023-08-02](#2023-08-02){.toc-h1 .toc-link data-title="2023-08-02"}
-   [2023-07-26](#2023-07-26){.toc-h1 .toc-link data-title="2023-07-26"}
-   [2023-07-20](#2023-07-20){.toc-h1 .toc-link data-title="2023-07-20"}
-   [2023-07-19](#2023-07-19){.toc-h1 .toc-link data-title="2023-07-19"}
-   [2023-07-17](#2023-07-17){.toc-h1 .toc-link data-title="2023-07-17"}
-   [2023-07-07](#2023-07-07){.toc-h1 .toc-link data-title="2023-07-07"}
-   [2023-07-05](#2023-07-05){.toc-h1 .toc-link data-title="2023-07-05"}
-   [2023-06-28](#2023-06-28){.toc-h1 .toc-link data-title="2023-06-28"}
-   [2023-06-27](#2023-06-27){.toc-h1 .toc-link data-title="2023-06-27"}
-   [2022-06-26](#2022-06-26){.toc-h1 .toc-link data-title="2022-06-26"}
-   [2023-06-20](#2023-06-20){.toc-h1 .toc-link data-title="2023-06-20"}
-   [2023-06-19](#2023-06-19){.toc-h1 .toc-link data-title="2023-06-19"}
-   [2023-06-15](#2023-06-15){.toc-h1 .toc-link data-title="2023-06-15"}
-   [2023-06-07](#2023-06-07){.toc-h1 .toc-link data-title="2023-06-07"}
-   [2023-06-02](#2023-06-02){.toc-h1 .toc-link data-title="2023-06-02"}
-   [2023-05-29](#2023-05-29){.toc-h1 .toc-link data-title="2023-05-29"}
-   [2023-05-24](#2023-05-24){.toc-h1 .toc-link data-title="2023-05-24"}
-   [2023-05-10](#2023-05-10){.toc-h1 .toc-link data-title="2023-05-10"}
-   [2023-04-27](#2023-04-27){.toc-h1 .toc-link data-title="2023-04-27"}
-   [2023-04-26](#2023-04-26){.toc-h1 .toc-link data-title="2023-04-26"}
-   [2023-04-19](#2023-04-19){.toc-h1 .toc-link data-title="2023-04-19"}
-   [2023-04-10](#2023-04-10){.toc-h1 .toc-link data-title="2023-04-10"}
-   [2023-04-07](#2023-04-07){.toc-h1 .toc-link data-title="2023-04-07"}
-   [2023-04-06](#2023-04-06){.toc-h1 .toc-link data-title="2023-04-06"}
-   [2023-04-03](#2023-04-03){.toc-h1 .toc-link data-title="2023-04-03"}
-   [2023-03-30](#2023-03-30){.toc-h1 .toc-link data-title="2023-03-30"}
-   [2023-03-29](#2023-03-29){.toc-h1 .toc-link data-title="2023-03-29"}
-   [2023-03-27](#2023-03-27){.toc-h1 .toc-link data-title="2023-03-27"}
-   [2023-03-24](#2023-03-24){.toc-h1 .toc-link data-title="2023-03-24"}
-   [2023-03-16](#2023-03-16){.toc-h1 .toc-link data-title="2023-03-16"}
-   [2023-03-15](#2023-03-15){.toc-h1 .toc-link data-title="2023-03-15"}
-   [2023-03-14](#2023-03-14){.toc-h1 .toc-link data-title="2023-03-14"}
-   [2023-03-01](#2023-03-01){.toc-h1 .toc-link data-title="2023-03-01"}
-   [2023-02-20](#2023-02-20){.toc-h1 .toc-link data-title="2023-02-20"}
-   [2023-02-17](#2023-02-17){.toc-h1 .toc-link data-title="2023-02-17"}
-   [2022-02-15](#2022-02-15){.toc-h1 .toc-link data-title="2022-02-15"}
-   [2023-02-08](#2023-02-08){.toc-h1 .toc-link data-title="2023-02-08"}
-   [2023-02-07](#2023-02-07){.toc-h1 .toc-link data-title="2023-02-07"}
-   [2023-02-02](#2023-02-02){.toc-h1 .toc-link data-title="2023-02-02"}
-   [2023-02-01](#2023-02-01){.toc-h1 .toc-link data-title="2023-02-01"}
-   [2023-01-30](#2023-01-30){.toc-h1 .toc-link data-title="2023-01-30"}
-   [2023-01-19](#2023-01-19){.toc-h1 .toc-link data-title="2023-01-19"}
-   [2023-01-09](#2023-01-09){.toc-h1 .toc-link data-title="2023-01-09"}
-   [2022-12-30](#2022-12-30){.toc-h1 .toc-link data-title="2022-12-30"}
-   [2022-12-28](#2022-12-28){.toc-h1 .toc-link data-title="2022-12-28"}
-   [2022-12-23](#2022-12-23){.toc-h1 .toc-link data-title="2022-12-23"}
-   [2022-12-20](#2022-12-20){.toc-h1 .toc-link data-title="2022-12-20"}
-   [2022-12-15](#2022-12-15){.toc-h1 .toc-link data-title="2022-12-15"}
-   [2022-12-14](#2022-12-14){.toc-h1 .toc-link data-title="2022-12-14"}
-   [2022-12-12](#2022-12-12){.toc-h1 .toc-link data-title="2022-12-12"}
-   [2022-12-09](#2022-12-09){.toc-h1 .toc-link data-title="2022-12-09"}
-   [2022-12-08](#2022-12-08){.toc-h1 .toc-link data-title="2022-12-08"}
-   [2022-12-06](#2022-12-06){.toc-h1 .toc-link data-title="2022-12-06"}
-   [2022-12-01](#2022-12-01){.toc-h1 .toc-link data-title="2022-12-01"}
-   [2022-11-30](#2022-11-30){.toc-h1 .toc-link data-title="2022-11-30"}
-   [2022-11-29](#2022-11-29){.toc-h1 .toc-link data-title="2022-11-29"}
-   [2022-11-28](#2022-11-28){.toc-h1 .toc-link data-title="2022-11-28"}
-   [2022-11-25](#2022-11-25){.toc-h1 .toc-link data-title="2022-11-25"}
-   [2022-11-24](#2022-11-24){.toc-h1 .toc-link data-title="2022-11-24"}
-   [2022-11-21](#2022-11-21){.toc-h1 .toc-link data-title="2022-11-21"}
-   [2022-11-11](#2022-11-11){.toc-h1 .toc-link data-title="2022-11-11"}
-   [2022-11-10](#2022-11-10){.toc-h1 .toc-link data-title="2022-11-10"}
-   [2022-11-08](#2022-11-08){.toc-h1 .toc-link data-title="2022-11-08"}
-   [2022-11-07](#2022-11-07){.toc-h1 .toc-link data-title="2022-11-07"}
-   [2022-11-01](#2022-11-01){.toc-h1 .toc-link data-title="2022-11-01"}
-   [2022-10-28](#2022-10-28){.toc-h1 .toc-link data-title="2022-10-28"}
-   [2022-10-27](#2022-10-27){.toc-h1 .toc-link data-title="2022-10-27"}
-   [2022-10-20](#2022-10-20){.toc-h1 .toc-link data-title="2022-10-20"}
-   [2022-10-19](#2022-10-19){.toc-h1 .toc-link data-title="2022-10-19"}
-   [2022-10-14](#2022-10-14){.toc-h1 .toc-link data-title="2022-10-14"}
-   [2022-10-13](#2022-10-13){.toc-h1 .toc-link data-title="2022-10-13"}
-   [2022-10-10](#2022-10-10){.toc-h1 .toc-link data-title="2022-10-10"}
-   [2022-10-10](#2022-10-10){.toc-h1 .toc-link data-title="2022-10-10"}
-   [2022-09-28](#2022-09-28){.toc-h1 .toc-link data-title="2022-09-28"}
-   [2022-09-22](#2022-09-22){.toc-h1 .toc-link data-title="2022-09-22"}
-   [2022-09-08](#2022-09-08){.toc-h1 .toc-link data-title="2022-09-08"}
-   [2022-09-06](#2022-09-06){.toc-h1 .toc-link data-title="2022-09-06"}
-   [2022-09-05](#2022-09-05){.toc-h1 .toc-link data-title="2022-09-05"}
-   [2022-09-01](#2022-09-01){.toc-h1 .toc-link data-title="2022-09-01"}
-   [2022-08-29](#2022-08-29){.toc-h1 .toc-link data-title="2022-08-29"}
-   [2022-08-26](#2022-08-26){.toc-h1 .toc-link data-title="2022-08-26"}
-   [2022-08-25](#2022-08-25){.toc-h1 .toc-link data-title="2022-08-25"}
-   [2022-08-24](#2022-08-24){.toc-h1 .toc-link data-title="2022-08-24"}
-   [2022-08-15](#2022-08-15){.toc-h1 .toc-link data-title="2022-08-15"}
-   [2022-08-10](#2022-08-10){.toc-h1 .toc-link data-title="2022-08-10"}
-   [2022-08-03](#2022-08-03){.toc-h1 .toc-link data-title="2022-08-03"}
-   [2022-08-02](#2022-08-02){.toc-h1 .toc-link data-title="2022-08-02"}
-   [2022-07-25](#2022-07-25){.toc-h1 .toc-link data-title="2022-07-25"}
-   [2022-07-22](#2022-07-22){.toc-h1 .toc-link data-title="2022-07-22"}
-   [2022-07-18](#2022-07-18){.toc-h1 .toc-link data-title="2022-07-18"}
-   [2022-07-15](#2022-07-15){.toc-h1 .toc-link data-title="2022-07-15"}
-   [2022-07-11](#2022-07-11){.toc-h1 .toc-link data-title="2022-07-11"}
-   [2022-07-01](#2022-07-01){.toc-h1 .toc-link data-title="2022-07-01"}
-   [2022-06-30](#2022-06-30){.toc-h1 .toc-link data-title="2022-06-30"}
-   [2022-06-24](#2022-06-24){.toc-h1 .toc-link data-title="2022-06-24"}
-   [2022-06-23](#2022-06-23){.toc-h1 .toc-link data-title="2022-06-23"}
-   [2022-06-20](#2022-06-20){.toc-h1 .toc-link data-title="2022-06-20"}
-   [2022-06-16](#2022-06-16){.toc-h1 .toc-link data-title="2022-06-16"}
-   [2022-06-14](#2022-06-14){.toc-h1 .toc-link data-title="2022-06-14"}
-   [2022-06-10](#2022-06-10){.toc-h1 .toc-link data-title="2022-06-10"}
-   [2022-06-09](#2022-06-09){.toc-h1 .toc-link data-title="2022-06-09"}
-   [2022-06-07](#2022-06-07){.toc-h1 .toc-link data-title="2022-06-07"}
-   [2022-06-01](#2022-06-01){.toc-h1 .toc-link data-title="2022-06-01"}
-   [2022-05-26](#2022-05-26){.toc-h1 .toc-link data-title="2022-05-26"}
-   [2022-05-23](#2022-05-23){.toc-h1 .toc-link data-title="2022-05-23"}
-   [2022-05-20](#2022-05-20){.toc-h1 .toc-link data-title="2022-05-20"}
-   [2022-05-19](#2022-05-19){.toc-h1 .toc-link data-title="2022-05-19"}
-   [2022-05-18](#2022-05-18){.toc-h1 .toc-link data-title="2022-05-18"}
-   [2022-05-13](#2022-05-13){.toc-h1 .toc-link data-title="2022-05-13"}
-   [2022-05-07](#2022-05-07){.toc-h1 .toc-link data-title="2022-05-07"}
-   [2022-05-05](#2022-05-05){.toc-h1 .toc-link data-title="2022-05-05"}
-   [2022-04-28](#2022-04-28){.toc-h1 .toc-link data-title="2022-04-28"}
-   [2022-04-26](#2022-04-26){.toc-h1 .toc-link data-title="2022-04-26"}
-   [2022-04-25](#2022-04-25){.toc-h1 .toc-link data-title="2022-04-25"}
-   [2022-04-15](#2022-04-15){.toc-h1 .toc-link data-title="2022-04-15"}
-   [2022-04-14](#2022-04-14){.toc-h1 .toc-link data-title="2022-04-14"}
-   [2022-04-08](#2022-04-08){.toc-h1 .toc-link data-title="2022-04-08"}
-   [2022-04-07](#2022-04-07){.toc-h1 .toc-link data-title="2022-04-07"}
-   [2022-03-10](#2022-03-10){.toc-h1 .toc-link data-title="2022-03-10"}
-   [2022-03-02](#2022-03-02){.toc-h1 .toc-link data-title="2022-03-02"}
-   [2022-02-17](#2022-02-17){.toc-h1 .toc-link data-title="2022-02-17"}
-   [2022-01-26](#2022-01-26){.toc-h1 .toc-link data-title="2022-01-26"}
-   [2022-01-25](#2022-01-25){.toc-h1 .toc-link data-title="2022-01-25"}
-   [2022-01-20](#2022-01-20){.toc-h1 .toc-link data-title="2022-01-20"}
-   [2022-01-18](#2022-01-18){.toc-h1 .toc-link data-title="2022-01-18"}
-   [2022-01-17](#2022-01-17){.toc-h1 .toc-link data-title="2022-01-17"}
-   [2022-01-14](#2022-01-14){.toc-h1 .toc-link data-title="2022-01-14"}
-   [2022-01-11](#2022-01-11){.toc-h1 .toc-link data-title="2022-01-11"}
-   [2022-01-06](#2022-01-06){.toc-h1 .toc-link data-title="2022-01-06"}
-   [2021-12-24](#2021-12-24){.toc-h1 .toc-link data-title="2021-12-24"}
-   [2021-12-14](#2021-12-14){.toc-h1 .toc-link data-title="2021-12-14"}
-   [2021-12-06](#2021-12-06){.toc-h1 .toc-link data-title="2021-12-06"}
-   [2021-12-04](#2021-12-04){.toc-h1 .toc-link data-title="2021-12-04"}
-   [2021-11-26](#2021-11-26){.toc-h1 .toc-link data-title="2021-11-26"}
-   [2021-11-25](#2021-11-25){.toc-h1 .toc-link data-title="2021-11-25"}
-   [2021-11-23](#2021-11-23){.toc-h1 .toc-link data-title="2021-11-23"}
-   [2021-11-20](#2021-11-20){.toc-h1 .toc-link data-title="2021-11-20"}
-   [2021-11-02](#2021-11-02){.toc-h1 .toc-link data-title="2021-11-02"}
-   [2021-11-01](#2021-11-01){.toc-h1 .toc-link data-title="2021-11-01"}
-   [2021-10-19](#2021-10-19){.toc-h1 .toc-link data-title="2021-10-19"}
-   [2021-10-18](#2021-10-18){.toc-h1 .toc-link data-title="2021-10-18"}
-   [2021-10-15](#2021-10-15){.toc-h1 .toc-link data-title="2021-10-15"}
-   [2021-10-14](#2021-10-14){.toc-h1 .toc-link data-title="2021-10-14"}
-   [2021-10-12](#2021-10-12){.toc-h1 .toc-link data-title="2021-10-12"}
-   [2021-09-30](#2021-09-30){.toc-h1 .toc-link data-title="2021-09-30"}
-   [2021-09-08](#2021-09-08){.toc-h1 .toc-link data-title="2021-09-08"}
-   [2021-09-07](#2021-09-07){.toc-h1 .toc-link data-title="2021-09-07"}
-   [2021-09-06](#2021-09-06){.toc-h1 .toc-link data-title="2021-09-06"}
-   [2021-09-03](#2021-09-03){.toc-h1 .toc-link data-title="2021-09-03"}
-   [2021-08-31](#2021-08-31){.toc-h1 .toc-link data-title="2021-08-31"}
-   [2021-08-20](#2021-08-20){.toc-h1 .toc-link data-title="2021-08-20"}
-   [2021-07-30](#2021-07-30){.toc-h1 .toc-link data-title="2021-07-30"}
-   [2021-07-20](#2021-07-20){.toc-h1 .toc-link data-title="2021-07-20"}
-   [2021-07-08](#2021-07-08){.toc-h1 .toc-link data-title="2021-07-08"}
-   [2021-06-15](#2021-06-15){.toc-h1 .toc-link data-title="2021-06-15"}
-   [2021-06-11](#2021-06-11){.toc-h1 .toc-link data-title="2021-06-11"}
-   [2021-06-08](#2021-06-08){.toc-h1 .toc-link data-title="2021-06-08"}
-   [2021-05-25](#2021-05-25){.toc-h1 .toc-link data-title="2021-05-25"}
-   [2021-05-18](#2021-05-18){.toc-h1 .toc-link data-title="2021-05-18"}
-   [2021-05-12](#2021-05-12){.toc-h1 .toc-link data-title="2021-05-12"}
-   [2021-04-27](#2021-04-27){.toc-h1 .toc-link data-title="2021-04-27"}
-   [2021-04-21](#2021-04-21){.toc-h1 .toc-link data-title="2021-04-21"}
-   [2021-04-16](#2021-04-16){.toc-h1 .toc-link data-title="2021-04-16"}
-   [2021-03-31](#2021-03-31){.toc-h1 .toc-link data-title="2021-03-31"}
-   [2021-03-24](#2021-03-24){.toc-h1 .toc-link data-title="2021-03-24"}
-   [2021-03-02](#2021-03-02){.toc-h1 .toc-link data-title="2021-03-02"}
-   [2021-02-26](#2021-02-26){.toc-h1 .toc-link data-title="2021-02-26"}
-   [2021-02-05](#2021-02-05){.toc-h1 .toc-link data-title="2021-02-05"}







# Upcoming Changes

**Last update: March 9, 2026**\
This update is expected to go live on **March 10, 2026**.

### Added response field `subCode` to place order and amend order APIs for more detailed error information in REST and WebSocket responses. 

-   [POST / Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
-   [POST / Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
-   [POST / Amend order](/docs-v5/en/#order-book-trading-trade-post-amend-order)
-   [POST / Amend multiple orders](/docs-v5/en/#order-book-trading-trade-post-amend-multiple-orders)
-   [WS / Place order](/docs-v5/en/#order-book-trading-trade-ws-place-order)
-   [WS / Place multiple orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)
-   [WS / Amend order](/docs-v5/en/#order-book-trading-trade-ws-amend-order)
-   [WS / Amend multiple orders](/docs-v5/en/#order-book-trading-trade-post-ws-multiple-orders)

  --------------------------------------------------------------------------------------------------------------------------------------------------
  **Field**               **Type**                **Description**
  ----------------------- ----------------------- --------------------------------------------------------------------------------------------------
  \> subCode              String                  Sub-code of sCode.\
                                                  Returns `""` when sCode is 0 (request successful).\
                                                  When sCode is not 0 (request failed), returns the sub-code if available; otherwise returns `""`.

  --------------------------------------------------------------------------------------------------------------------------------------------------

## Delist instId request parameter in WS order operation channels 

**Last update: January 29, 2025**\
\

To reduce latency of WebSocket order operations, the following order operation channels have introduced a new request parameter, `instIdCode`. In the demo trading environment, the `instId` request parameter has been delisted. In the production environment, `instId` will be delisted in phases. After the delisting, any `instId` value provided will be ignored.\
\

-   Phase 1 delisting date: **March 26, 2026**. The affected channels include:\
    -   [WS / Place order](/docs-v5/en/#order-book-trading-trade-ws-place-order)
    -   [WS / Place multiple orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)
-   Phase 2 delisting date: **March 31, 2026**. The affected channels include:\
    -   [WS / Amend order](/docs-v5/en/#order-book-trading-trade-ws-amend-order)
    -   [WS / Amend multiple orders](/docs-v5/en/#order-book-trading-trade-ws-amend-multiple-orders)
    -   [WS / Cancel order](/docs-v5/en/#order-book-trading-trade-ws-cancel-order)
    -   [WS / Cancel multiple orders](/docs-v5/en/#order-book-trading-trade-ws-cancel-multiple-orders)

  ---------------------------------------------------------------------------------------------------------------------------------------------
  Request Parameter Name   Type              Required          Description
  ------------------------ ----------------- ----------------- --------------------------------------------------------------------------------
  \> instIdCode            Integer           Conditional       Instrument ID code.\
                                                               If both `instId` and `instIdCode` are provided, `instIdCode` takes precedence.

  \> instId                String            Conditional       Instrument ID\
                                                               Will be deprecated on March 2026.
  ---------------------------------------------------------------------------------------------------------------------------------------------

Note: Users can use the [Get instruments](/docs-v5/en/#public-data-rest-api-get-instruments) interface to map `instIdCode` to `instId`.

## Delist old attached stop profit and stop loss parameters 

**Last update: November 20, 2025**\

In order to streamline the placement parameters and order information parameters, Open API will delist the old stop-loss and take-profit parameters.

-   Related request parameters will be delisted in **mid-October or later** (the parameters in the array attachAlgoOrds aren't affected), no specific time will be further notified.
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)\
    -   [Get order details](/docs-v5/en/#order-book-trading-trade-get-order-details)\
    -   [Get order list](/docs-v5/en/#order-book-trading-trade-get-order-list)\
    -   [Get order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\
    -   [Get order history (last 30 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)\

  -------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------------
  attachAlgoClOrdId       String                  Client-supplied Algo ID when placing order attaching TP/SL.

  tpTriggerPx             String                  Take-profit trigger price.

  tpTriggerPxType         String                  Take-profit trigger price type.\
                                                  `last`: last price\
                                                  `index`: index price\
                                                  `mark`: mark price

  tpOrdPx                 String                  Take-profit order price.

  slTriggerPx             String                  Stop-loss trigger price.

  slTriggerPxType         String                  Stop-loss trigger price type.\
                                                  `last`: last price\
                                                  `index`: index price\
                                                  `mark`: mark price

  slOrdPx                 String                  Stop-loss order price.
  -------------------------------------------------------------------------------------------------------------

# 2026-03-04 

### Pre-market rebase contract 

-   Added new value `rebase` for response parameter `state`
-   Added new value `rebase_contract` for response parameter `ruleType`
    -   [Get instruments (private)](/docs-v5/en/#trading-account-rest-api-get-instruments)
    -   [Get instruments (public)](/docs-v5/en/#public-data-rest-api-get-instruments)
    -   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------------------------------------
  state                   String                  Instrument status\
                                                  `live`\
                                                  `suspend`\
                                                  `rebase`: can\'t be traded during rebasing, only applicable to `SWAP`\
                                                  `preopen`: e.g. Futures and options contracts rollover from generation to trading start; certain symbols before they go live\
                                                  `test`: Test pairs, can\'t be traded

  ruleType                String                  Trading rule types\
                                                  `normal`: normal trading\
                                                  `pre_market`: pre-market trading\
                                                  `rebase_contract`: pre-market rebase contract
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2026-03-02 

### SBE Market Data 

-   [SBE](/docs-v5/en/#order-book-trading-sbe-market-data) `bbo-tbt` channel will be **available to users of any trading fee tier** but requires login starting **3rd March 2026**.

### Instruments 

-   Added new value `Stocks` for response field `instCategory`

    -   [Get instruments (private)](/docs-v5/en/#trading-account-rest-api-get-instruments)
    -   [Get instruments (public)](/docs-v5/en/#public-data-rest-api-get-instruments)
    -   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  instCategory            String                  The asset category of the instrument's base asset (the first segment of the instrument ID). For example, for `BTC-USDT-SWAP`, the `instCategory` represents the asset category of `BTC`.\
                                                  `1`: Crypto\
                                                  `3`: Stocks

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2026-02-27 

-   Add new response parameter `lendingRate` to the public borrow history endpoint
    -   [GET / Public borrow history (public)](/docs-v5/en/#financial-product-simple-earn-flexible-get-public-borrow-history-public)

**Response Parameters**

  **Parameter**   **Type**   **Description**
  --------------- ---------- ------------------------------
  lendingRate     String     Annual lending interest rate

# 2026-02-12 

-   Added new parameters
    -   [Get instruments (private)](/docs-v5/en/#trading-account-rest-api-get-instruments)
    -   [Get instruments (public)](/docs-v5/en/#public-data-rest-api-get-instruments)
    -   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  instCategory            String                  The category of the instrument's base currency (the first part of the instrument ID). For example, for `BTC-USDT-SWAP`, the `instCategory` refers to the category of `BTC`.\
                                                  `1`: Crypto

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2026-02-05 

#### The [Get instruments (private)](/docs-v5/en/#trading-account-rest-api-get-instruments) endpoint has been updated to include remaining position opening quota. 

-   Added response fields `longPosRemainingQuota` and `shortPosRemainingQuota` to indicate the account\'s remaining available quota for opening long and short positions.
    -   [Get instruments (private)](/docs-v5/en/#trading-account-rest-api-get-instruments)

  **Field**                   **Type**   **Description**
  --------------------------- ---------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \> longPosRemainingQuota    String     The remaining long position value (USD) the user is permitted to open, netting all existing long positions and resting buy orders. The quota is shared across the master account and all subaccounts.
  \> shortPosRemainingQuota   String     The remaining short position value (USD) the user is permitted to open, netting all existing short positions and resting sell orders. The quota is shared across the master account and all subaccounts.

# 2026-01-21 

-   Add a new optional request parameter `convertMode` to the following endpoints:
    -   [GET / Get convert currency pair](/docs-v5/en/#funding-account-rest-api-get-convert-currency-pair)
    -   [POST / Estimate quote](/docs-v5/en/#funding-account-rest-api-estimate-quote)
    -   [POST / Convert trade](/docs-v5/en/#funding-account-rest-api-convert-trade)

**Request Parameters**

  ----------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- ----------------------------------
  convertMode       String            No                `0`: standard convert (default)\
                                                        `1`: large order convert for VIP

  ----------------------------------------------------------------------------------------

# 2026-01-15 

## Rename XAUT Perpetual Contract 

To enhance your trading experience, OKX renamed XAUTUSDT perpetual to XAUUSDT perpetual and the trading of XAUTUSDT perpetual will be suspended from **8:05 am to 8:25 am on Jan 15, 2026 (UTC)**, more details can be found in [announcement details](https://www.okx.com/help/okx-will-rename-xautusdt-perpetual-to-xauusdt-perpetual).\

-   When renaming:

    -   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel) will first push the update data of `instId: XAUT-USDT-SWAP`, `state: expired`, then push the update data of `instId: XAU-USDT-SWAP`, `state: live`.\

-   After renaming:

    -   The `instId`, `instFamily`, `uly` in the pushed data will use the new parameter values.
    -   OKX will no longer support subscribing to the WebSocket channels for this perpetual using `instId: XAUT-USDT-SWAP` or `instFamily: XAUT-USDT`, nor will it support sending HTTP requests via OpenAPI with these parameters. Please use `instId: XAU-USDT-SWAP` or `instFamily: XAU-USDT` for related trading operations after the contract is renamed.\
    -   For the `trades` and regular snapshot push of `positions` channels, the old subscriptions will still push data, please resubscribe using the new parameter values after the renaming.\
    -   For [order book channels](/docs-v5/en/#order-book-trading-market-data-ws-order-book-channel), old subscriptions will continue to receive data. After the renaming, please first cancel the subscription using the new parameter values, then resubscribe using the new values.\
    -   For other channels, they will no longer push any data, please resubscribe using the new parameter values after the renaming.\
    -   `instIdCode` will remain unchanged.

The parameters to be renamed are as follows:

  Value Type        instId             uly           instFamily    ctValCcy
  ----------------- ------------------ ------------- ------------- ----------
  Before Renaming   `XAUT-USDT-SWAP`   `XAUT-USDT`   `XAUT-USDT`   `XAUT`
  After Renaming    `XAU-USDT-SWAP`    `XAU-USDT`    `XAU-USDT`    `XAU`

# 2026-01-13 

-   Add a new request parameter isElpTakerAccess to place order requests. Only applicable to `ioc` order type.
    -   [POST / Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
    -   [POST / Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
    -   [WS / Place order](/docs-v5/en/#order-book-trading-trade-ws-place-order)
    -   [WS / Place multiple orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)

**Request Parameters**

  ----------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**      **Type**          **Required**      **Description**
  ------------------ ----------------- ----------------- ---------------------------------------------------------------------------------
  isElpTakerAccess   Boolean           No                ELP taker access\
                                                         `true`: the request can trade with ELP orders but a speed bump will be applied\
                                                         `false`: the request cannot trade with ELP orders and no speed bump\
                                                         \
                                                         The default value is `false` while `true` is only applicable to ioc orders.

  ----------------------------------------------------------------------------------------------------------------------------------------

-   The rate limit of orders tagged as isElpTakerAccess:true will be restricted

    -   50 orders per 2 seconds per User ID per instrument ID.
    -   This rate limit is shared in Place order/Place multiple orders endpoints in REST/WebSocket

-   Add a new response parameter elp in instruments endpoint to indicate whether ELP is supported for a certain symbol and if users have permission to place ELP orders for this symbol. This doesn\'t mean there are ELP pending orders in this symbol.

    -   [Get instruments](/docs-v5/en/#trading-account-rest-api-get-instruments)

**Response Parameters**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ------------------------------------------------------------------------------------------------------------
  elp                     String                  ELP maker permission\
                                                  `0`: ELP is not enabled for this symbol\
                                                  `1`: ELP is enabled for this symbol, but current users don\'t have permission to place ELP orders for it.\
                                                  `2`: ELP is enabled for this symbol, and current users have permission to place ELP orders for it.\
                                                  \
                                                  It doesn\'t mean there will be ELP liquidity when elp is `1/2`.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------

**Error code**

  **Error Code**   **HTTP Status Code**   **Error Message**
  ---------------- ---------------------- --------------------------------------------------------------------------------------------------------------------------
  54044            200                    ELP is not enabled for {param0}. You can't place orders that take ELP liquidity of it.
  54045            200                    OpenAPI users can only place IOC orders that take ELP liquidity.
  54046            200                    You can't place orders to take ELP liquidity.
  54047            200                    You can't amend this order because an order with the same order ID or client order ID is in speed bump.
  54048            200                    You can't cancel the order because an order with the same order ID or client order ID is in speed bump.
  54049            200                    API users can't place orders that take ELP liquidity now because system is busy. To proceed, set isElpTakerAccess:false.

# 2026-01-07 

-   Added new request parameter groupId to trade fee endpoint
    -   [Get fee rates](/docs-v5/en/#trading-account-rest-api-get-fee-rates)

Request parameters

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------------------
  groupId           String            No                Instrument trading fee group ID\
                                                        Users can use instruments endpoint to fetch the mapping of an instrument ID and its trading fee group ID

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2025-12-22 

-   Added new parameters
    -   [Get instruments (private)](/docs-v5/en/#trading-account-rest-api-get-instruments)
    -   [Get instruments (public)](/docs-v5/en/#public-data-rest-api-get-instruments)
    -   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)

  -----------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -----------------------------------------------------------------------------
  upcChg                  Array of objects        Upcoming changes. It is \[\] when there is no upcoming change.

  \> param                String                  The parameter name to be updated.\
                                                  `tickSz`\
                                                  `minSz`\
                                                  `maxMktSz`

  \> newValue             String                  The parameter value that will replace the current one.

  \> effTime              String                  Effective time. Unix timestamp format in milliseconds, e.g. `1597026383085`
  -----------------------------------------------------------------------------------------------------------------------------

# 2025-12-10 

## Manual borrow rate limit Update 

-   The rate limit for the following endpoint will be changed from 1 request per 3 second per User ID to 1 request per second per Master Account User ID
    -   [Manual borrow / repay](/docs-v5/en/#trading-account-rest-api-manual-borrow-repay)

# 2025-12-03 

-   Added new parameters
    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)
    -   [Algo order details](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-details)
    -   [Algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)
    -   [Algo order history](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)
    -   [Algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)

  ----------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------
  advanceOrdType    String            No                Trigger order type\
                                                        `fok`: Fill-or-kill order\
                                                        `ioc`: Immediate-or-cancel order\
                                                        Default is \"\", limit or market (controlled by orderPx)

  ----------------------------------------------------------------------------------------------------------------

# 2025-11-26 

The OKX Enhanced Liquidity Program order (ELP) introduces a new **post-only order type (ELP)**, aiming to enhance liquidity and improve trade execution quality for non-API users. ELP orders can be placed by all users while matching exclusively with taker orders that are not directly placed via OpenAPI.

By providing targeted liquidity, this program offers non-API users new economic incentives with price improvement and slippage reduction while maintaining transparency and market integrity across the platform.

The API changes are listed below.

## Orders endpoints 

-   ordType request parameter adds new enum `elp` to indicate placing ELP orders for certain symbols
    -   [POST / Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
    -   [POST / Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
    -   [WS / Place order](/docs-v5/en/#order-book-trading-trade-ws-place-order)
    -   [WS / Place multiple orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)
    -   [POST / Order precheck](/docs-v5/en/#order-book-trading-trade-post-order-precheck)

**Request Parameters**

  -----------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- -----------------------------------------
  ordType           String            Yes               Order type\
                                                        `elp`: Enhanced Liquidity Program order

  -----------------------------------------------------------------------------------------------

-   ordType response parameter adds new enum `elp`
    -   [GET / Order details](/docs-v5/en/#order-book-trading-trade-get-order-details)
    -   [GET / Order List](/docs-v5/en/#order-book-trading-trade-get-order-list)
    -   [GET / Order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)
    -   [GET / Order history (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)
    -   [WS / Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

**Response Parameters**

  -----------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -----------------------------------------
  ordType                 String                  Order type\
                                                  `elp`: Enhanced Liquidity Program order

  -----------------------------------------------------------------------------------------

## Market data 

-   Ticker endpoints and channels will include valid ELP liquidity and trades when calculating all these fields.
    -   [GET / Tickers](/docs-v5/en/#order-book-trading-market-data-get-tickers)
    -   [GET / Ticker](/docs-v5/en/#order-book-trading-market-data-get-ticker)
    -   [WS / Tickers channel](/docs-v5/en/#order-book-trading-market-data-ws-tickers-channel)

\

-   Current order book endpoints and channels will not include ELP liquidity.
    -   [GET / Order book](/docs-v5/en/#order-book-trading-market-data-get-order-book)
    -   [GET / Full order book](/docs-v5/en/#order-book-trading-market-data-get-full-order-book)
    -   [WS / Order book channel](/docs-v5/en/#order-book-trading-market-data-ws-order-book-channel)
        -   `books/books5/bbo-tbt/books-l2-tbt/books50-l2-tbt`

\

-   Add a new order book WebSocket channel `books-elp` to return ELP orders only, including both valid and invalid parts (invalid parts means ELP buy orders with a price higher than best bid of non-ELP orders; or ELP sell orders with a price lower than best ask of non-ELP orders). Users should distinguish valid and invalid parts using the best bid/ask price of non-ELP orders.
    -   `books-elp`: Only return ELP orders, including both valid and invalid parts. 400 depth levels will be pushed in the initial full snapshot. Incremental data will be pushed every 100 ms for the changes in the order book during that period of time.
    -   The new channel shares the same seqId mechanism with existing order book channels if subscribing to the same symbol.

\

-   Candlesticks endpoints and channels will include ELP liquidity and trades when calculating all these fields.
    -   [GET / Candlesticks](/docs-v5/en/#order-book-trading-market-data-get-candlesticks)
    -   [GET / Candlesticks history](/docs-v5/en/#order-book-trading-market-data-get-candlesticks-history)
    -   [WS / Candlesticks channel](/docs-v5/en/#order-book-trading-market-data-ws-candlesticks-channel)

\

-   Trades endpoints and channels add source response field to indicate whether the maker order is ELP order or normal limit order. source field will be taken into consideration when doing aggregating for trades channel. Thus, after the change, message is sent only once per taker order, per filled price, per source.
    -   [GET / Trades](/docs-v5/en/#order-book-trading-market-data-get-trades)
    -   [GET / Trades history](/docs-v5/en/#order-book-trading-market-data-get-trades-history)
    -   [WS / Trades channel](/docs-v5/en/#order-book-trading-market-data-ws-trades-channel)
    -   [WS / All trades channel](/docs-v5/en/#order-book-trading-market-data-ws-all-trades-channel)

**Response Parameters**

  ---------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ---------------------------------
  source                  String                  Transaction source\
                                                  `0`: normal order`1`: elp order

  ---------------------------------------------------------------------------------

## cancelSource 

Added cancelSource 45 for the scenario - order price verification of ELP orders failed.

## Error code 

  **Error code**   **Error Message (EN)**
  ---------------- ------------------------------------------------------------------------------------------------------
  54039            ELP orders can\'t be reduce-only orders.
  54040            ELP orders can\'t be used with TP/SL settings.
  54041            ELP orders aren\'t supported for {param0}.
  54042            You don\'t have permission to place ELP orders for {param0}.
  54043            You can only place up to {param1} ELP orders for {param0}. Cancel some of your orders and try again.

# 2025-11-25 

OKX updated the trading fee scheme for improved fee differentiation across tiers. Please refer to the announcement for more details.

### Instruments endpoint/channel 

-   Add a new response parameter groupId to indicate which group a specific symbol belongs to.
    -   [Get instruments (private)](/docs-v5/en/#trading-account-rest-api-get-instruments)
    -   [Get instruments (public)](/docs-v5/en/#public-data-rest-api-get-instruments)
    -   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)

**Response Parameters**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  groupId                 String                  Instrument trading fee group ID\
                                                  Spot:\
                                                  `1`: Spot USDT\
                                                  `2`: Spot USDC & Crypto\
                                                  `3`: Spot TRY\
                                                  `4`: Spot EUR\
                                                  `5`: Spot BRL\
                                                  `7`: Spot AED\
                                                  `8`: Spot AUD\
                                                  `9`: Spot USD\
                                                  `10`: Spot SGD\
                                                  `11`: Spot zero\
                                                  `12`: Spot group one\
                                                  `13`: Spot group two\
                                                  `14`: Spot group three\
                                                  `15`: Spot special rule\
                                                  \
                                                  Expiry futures:\
                                                  `1`: Expiry futures crypto-margined\
                                                  `2`: Expiry futures USDT-margined\
                                                  `3`: Expiry futures USDC-margined\
                                                  `4`: Expiry futures premarket\
                                                  `5`: Expiry futures group one\
                                                  `6`: Expiry futures group two\
                                                  \
                                                  Perpetual futures:\
                                                  `1`: Perpetual futures crypto-margined\
                                                  `2`: Perpetual futures USDT-margined\
                                                  `3`: Perpetual futures USDC-margined\
                                                  `4`: Perpetual futures group one\
                                                  `5`: Perpetual futures group two\
                                                  \
                                                  Options:\
                                                  `1`: Options crypto-margined\
                                                  `2`: Options USDC-margined\
                                                  \
                                                  **instType and groupId should be used together to determine a trading fee group. Users should use this endpoint together with [fee rates endpoint](/docs-v5/en/#trading-account-rest-api-get-fee-rates) to get the trading fee of a specific symbol.**\
                                                  \
                                                  **Some enum values may not apply to you; the actual return values shall prevail.**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Get fee rates endpoint 

-   Add new response parameter feeGroup. Fields that will be deprecated: maker, makerU, makerUSDC, taker, takerU, takerUSDC.
    -   [Get fee rates](/docs-v5/en/#trading-account-rest-api-get-fee-rates)

**Response Parameters**

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  feeGroup                Array of objects        Fee groups.\
                                                  Applicable to `SPOT/MARGIN/SWAP/FUTURES/OPTION`

  \> taker                String                  Taker fee

  \> maker                String                  Maker fee

  \> groupId              String                  Instrument trading fee group ID\
                                                  \
                                                  **instType and groupId should be used together to determine a trading fee group. Users should use this endpoint together with [instruments endpoint](/docs-v5/en/#trading-account-rest-api-get-instruments) to get the trading fee of a specific symbol.**
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2025-11-21 

## ETH staking redeem updates 

-   Added `ordId` and new enum value `cancelled` in Purchase&Redeem history
    -   [GET / Purchase&Redeem history (ETH)](/docs-v5/en/#financial-product-eth-staking-get-purchase-amp-redeem-history)

#### Response parameters 

  -----------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -----------------------
  ordId                   String                  Order ID

  status                  String                  Status\
                                                  `pending`\
                                                  `success`\
                                                  `failed`\
                                                  `cancelled`
  -----------------------------------------------------------------------

-   Added new error code

  Error Code   HTTP Status   Error Message
  ------------ ------------- --------------------------------------------------------
  51762        200           Redemption partially processed and can\'t be cancelled

-   Introduced a new `cancel-redeem` endpoint for ETH.
    -   [POST / Cancel redeem (ETH)](/docs-v5/en/#financial-product-eth-staking-post-cancel-redeem)

# 2025-11-20 

-   Added new request parameter `instIdCode`
    -   [WS / Place order](/docs-v5/en/#order-book-trading-trade-ws-place-order)
    -   [WS / Place multiple orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)
    -   [WS / Amend order](/docs-v5/en/#order-book-trading-trade-ws-amend-order)
    -   [WS / Amend multiple orders](/docs-v5/en/#order-book-trading-trade-ws-amend-multiple-orders)
    -   [WS / Cancel order](/docs-v5/en/#order-book-trading-trade-ws-cancel-order)
    -   [WS / Cancel multiple orders](/docs-v5/en/#order-book-trading-trade-ws-cancel-multiple-orders)

  ---------------------------------------------------------------------------------------------------------------------------------------------
  Request Parameter Name   Type              Required          Description
  ------------------------ ----------------- ----------------- --------------------------------------------------------------------------------
  \> instIdCode            Integer           Conditional       Instrument ID code.\
                                                               If both `instId` and `instIdCode` are provided, `instIdCode` takes precedence.

  \> instId                String            Conditional       Instrument ID\
                                                               Will be deprecated on March 2026.
  ---------------------------------------------------------------------------------------------------------------------------------------------

Note: You can use the [Get instruments](/docs-v5/en/#public-data-rest-api-get-instruments) interface to map `instIdCode` to `instId`.

Attached TP/SL support dynamic change (%) function has been launched in production

-   Add new request parameters:
    -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
    -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)

  ------------------------------------------------------------------------------------------------------------------------
  Parameter           Type               Required          Description
  ------------------- ------------------ ----------------- ---------------------------------------------------------------
  attachAlgoOrds      Array of objects   No                TP/SL information attached when placing order

  \> tpTriggerRatio   String             Conditional       Take profit trigger ratio, 0.3 represents 30%\
                                                           Only one of `tpTriggerPx` and `tpTriggerRatio` can be passed\
                                                           Only applicable to FUTURES and SWAP.

  \> slTriggerRatio   String             Conditional       Stop loss trigger ratio, 0.3 represents 30%\
                                                           Only one of `slTriggerPx` and `slTriggerRatio` can be passed\
                                                           Only applicable to FUTURES and SWAP.
  ------------------------------------------------------------------------------------------------------------------------

-   Add new request parameters:
    -   [Amend order](/docs-v5/en/#order-book-trading-trade-post-amend-order)
    -   [Amend multiple orders](/docs-v5/en/#order-book-trading-trade-post-amend-multiple-orders)
    -   [Amend algo order](/docs-v5/en/#order-book-trading-algo-trading-post-amend-algo-order)

  -------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter              Type               Required          Description
  ---------------------- ------------------ ----------------- -------------------------------------------------------------------------------------
  attachAlgoOrds         Array of objects   No                TP/SL information attached when placing order

  \> newTpTriggerRatio   String             Conditional       Take profit trigger ratio, 0.3 represents 30%\
                                                              Only one of `newTpTriggerPx` and `newTpTriggerRatio` can be passed, 0 means delete\
                                                              Only applicable to FUTURES and SWAP.

  \> newSlTriggerRatio   String             Conditional       Stop profit trigger ratio, 0.3 represents 30%\
                                                              Only one of `newSlTriggerPx` and `newSlTriggerRatio` can be passed, 0 means delete\
                                                              Only applicable to FUTURES and SWAP.
  -------------------------------------------------------------------------------------------------------------------------------------------------

-   Add new response parameters\
    -   [Order details](/docs-v5/en/#order-book-trading-trade-get-order-details)
    -   [Order List](/docs-v5/en/#order-book-trading-trade-get-order-list)
    -   [Order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)
    -   [Order history (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)
    -   [Algo order details](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-details)
    -   [Algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)
    -   [Algo order history](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)
    -   [Algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)

  ------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ------------------------------------------------
  attachAlgoOrds          Array of objects        TP/SL information attached when placing order

  \> tpTriggerRatio       String                  Take profit trigger ratio, 0.3 represents 30%\
                                                  Only applicable to FUTURES and SWAP

  \> slTriggerRatio       String                  Stop profit trigger ratio, 0.3 represents 30%\
                                                  Only applicable to FUTURES and SWAP
  ------------------------------------------------------------------------------------------------

# 2025-11-13 

## Delta neutral strategy 

Delta neutral strategy related changes. Please refer to [Introduction to delta neutral strategy](https://www.okx.com/help/introduction-to-delta-neutral-strategy) for more details.

### New endpoints 

-   Added two new endpoints.
    -   [Set trading config](/docs-v5/en/#trading-account-rest-api-set-trading-config)
    -   [Precheck set delta neutral](/docs-v5/en/#trading-account-rest-api-precheck-set-delta-neutral)

### Get account configuration 

-   Add a new request parameter stgyType to indicate whether a subaccount is delta neutral strategy enabled.
    -   [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)

**Response Parameters**

  -----------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -----------------------------
  stgyType                String                  Strategy type\
                                                  `0`: general strategy\
                                                  `1`: delta neutral strategy

  -----------------------------------------------------------------------------

### Get interest rate and loan quota 

-   Add new response parameters configCcyList and config.
    -   [Get interest rate and loan quota](/docs-v5/en/#public-data-rest-api-get-interest-rate-and-loan-quota)

**Response Parameters**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  configCcyList           Array of strings        Currencies that have loan quota configured using customized absolute value.\
                                                  Users should refer to config to get the loan quota of a currency which is listed in configCcyList, instead of getting it from basic/vip/regular.

  \> ccy                  String                  Currency

  \> rate                 String                  Daily rate

  config                  Array of objects        The currency details of loan quota configured using customized absolute value

  \> ccy                  String                  Currency

  \> stgyType             String                  Strategy type\
                                                  `0`: general strategy\
                                                  `1`: delta neutral strategy\
                                                  If only `0` is returned for a currency, it means the loan quota is shared between accounts in general strategy and accounts in delta neutral strategy; if both `0/1` are returned for a currency, it means accounts in delta neutral strategy have separate loan quotas.

  \> quota                String                  Loan quota in absolute value

  \> level                String                  VIP level
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

> Response example


``` {.highlight .json .tab-json}
{
    "code": "0",
    "data": [
        {
            "basic": [
                {
                    "ccy": "USDT",
                    "quota": "500000",
                    "rate": "0.00043728"
                },
                {
                    "ccy": "BTC",
                    "quota": "10",
                    "rate": "0.00019992"
                }
            ],
            "vip": [
                {
                    "irDiscount": "",
                    "loanQuotaCoef": "6",
                    "level": "VIP 1"
                },
                {
                    "irDiscount": "",
                    "loanQuotaCoef": "7",
                    "level": "VIP 2"
                }
            ],
            "regular": [
                {
                    "irDiscount": "",
                    "loanQuotaCoef": "1",
                    "level": "Lv1"
                },
                {
                    "irDiscount": "",
                    "loanQuotaCoef": "2",
                    "level": "Lv1"
                }
            ],
            "configCcyList": [
                {
                    "ccy": "USDT",
                    "rate": "0.00043728",
                }
            ],
            "config": [
                {
                    "ccy": "USDT",
                    "stgyType": "0",    // general strategy
                    "quota": "xxxxxx",
                    "level": "VIP 8"
                },
                ......
                {
                    "ccy": "USDT",
                    "stgyType": "1",    // delta neutral strategy
                    "quota": "xxxxx",
                    "level": "VIP 1"
                },
                ......
            ]
        }
    ],
    "msg": ""
}
```


### Balance endpoints/account channel 

-   Add new response/push data parameters, delta, deltaLever and deltaNeutralStatus.
    -   [Get balance](/docs-v5/en/#trading-account-rest-api-get-balance)
    -   [Get sub-account trading balance](/docs-v5/en/#sub-account-rest-api-get-sub-account-trading-balance)
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)

**Response Parameters**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameters**          **Types**               **Description**
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------
  delta                   String                  Delta (USD)

  deltaLever              String                  Delta neutral strategy account level delta leverage\
                                                  deltaLever = delta / totalEq

  deltaNeutralStatus      String                  Delta risk status\
                                                  `0`: normal\
                                                  `1`: transfer restricted\
                                                  `2`: delta reducing - cancel all pending orders if delta is greater than 5000 USD, only one delta reducing order allowed per index (spot, futures, swap)
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Get positions/Positions channel 

-   Add a new response parameter hedgedPos
    -   [Get positions](/docs-v5/en/#trading-account-rest-api-get-positions)
    -   [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)

**Response Parameters**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameters**          **Types**               **Description**
  ----------------------- ----------------------- ---------------------------------------------------------------------------------------------------------------
  hedgedPos               String                  Hedged position size\
                                                  Only return for accounts in delta neutral strategy, stgyType:1. Return \"\" for accounts in general strategy.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------

### Get maximum withdrawals 

-   maxWdEx and spotOffsetMaxWdEx will be returned as \"\" as DNA doesn\'t support borrow and withdraw.
    -   [Get maximum withdrawals](/docs-v5/en/#trading-account-rest-api-get-maximum-withdrawals)

### cancelSource 

New cancelSource code 46 for delta reducing cancel orders.

### Error code 

  **Error code**   **Error messages**
  ---------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  51209            Order failed because your current status only allows placing delta-reducing orders. Increase your account equity or place an order that would reduce delta when filled to proceed.
  51210            Order failed because your current status only allows placing one order per underlying. Cancel other orders in the underlying to proceed.
  51211            Order failed because your current status only allows placing delta-reducing orders. Increase your account equity or place an order that would reduce delta when filled to proceed.
  51212            Order failed because your current status doesn't support batch orders. Place a single order to proceed.
  51213            Order failed because your current status only allows placing one order per underlying. Cancel other orders in the underlying to proceed.
  51214            Failed to modify order because your current status only allows placing delta-reducing orders. Increase your account equity or place an order that would reduce delta when filled to proceed.
  59518            This account isn't eligible for delta neutral strategy.
  59519            You must be VIP 1 or above to use delta netural strategy.
  59520            You can't use delta neutral strategy in spot or futures mode.
  59521            Flexible Loan and delta neutral strategy can\'t be in use at the same time.
  59522            You can't borrow and transfer or withdraw when using delta neutral strategy.
  59523            You can't place orders or open positions in isolated mode and use delta neutral strategy at the same time.
  59524            You can't trade options or open option positions and use delta neutral strategy at the same time.
  59525            Some bots and copy trades can't be used at the same time as delta neutral strategy.
  59526            Failed to switch strategy because your delta-to-equity ratio will exceed the threshold and trigger the transfer-out restriction after the switch. Lower your delta and try again.
  59527            You must set all currencies as collateral when using delta neutral strategy.
  59528            Failed to switch strategy because your account's {param0} borrowing in the targeted strategy will exceed the main account borrowing limit after the switch. Repay your liabilities and try again.

## Stablecoin lender APR logic update 

Interest rate response parameter descriptions are updated to align with the stablecoin group lender APR logic.

-   [Get saving balance](/docs-v5/en/#financial-product-savings-get-saving-balance)

  **Parameter**   **Type**   **Description**
  --------------- ---------- -------------------------------------------------
  rate            String     Minimum annual lending rate configured by users

-   [GET / Accrued interest](/docs-v5/en/#financial-product-flexible-loan-get-accrued-interest)

  **Parameter**   **Type**   **Description**
  --------------- ---------- -----------------------------------------
  interestRate    String     Annual APY. e.g. `0.01` represents `1%`

-   [GET / Public borrow info (public)](/docs-v5/en/#financial-product-savings-get-public-borrow-info-public)

  **Parameter**   **Type**   **Description**
  --------------- ---------- ----------------------------------------------
  avgRate         String     24-hours average borrowing rate
  preRate         String     Last annual borrowing interest rate
  estRate         String     Next estimate annual borrowing interest rate

-   [GET / Public borrow history (public)](/docs-v5/en/#financial-product-savings-get-public-borrow-history-public)

  **Parameter**   **Type**   **Description**
  --------------- ---------- --------------------------------
  rate            String     Annual borrowing interest rate

-   Other rates description improvements
    -   [Get interest accrued data](/docs-v5/en/#trading-account-rest-api-get-interest-accrued-data)
    -   [Get interest rate and loan quota](/docs-v5/en/#public-data-rest-api-get-interest-rate-and-loan-quota)
    -   [Get interest rate](/docs-v5/en/#trading-account-rest-api-get-interest-rate)
    -   [Get borrow interest and limit](/docs-v5/en/#trading-account-rest-api-get-borrow-interest-and-limit)

# 2025-11-11 

## Deposit Record Masking 

-   Mask phone number and email address returned in the `from` response field to protect sensitive information.
    -   [Get deposit history](/docs-v5/en/#funding-account-rest-api-get-deposit-history)
    -   [WS / Deposit info channel](/docs-v5/en/#funding-account-websocket-deposit-info-channel)

#### Response parameters 

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  from                    String                  Deposit account\
                                                  If the deposit comes from an internal transfer, this field displays the account information of the internal transfer initiator, which can be a mobile phone number or email address (masked), and will return \"\" in other cases

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2025-11-06 

OKX launched [SBE Market Data](/docs-v5/en/#order-book-trading-sbe-market-data)

# 2025-10-23 

## Add position limit parameters to account/instruments endpoint 

-   Added `posLmtAmt`, `posLmtPct`, `maxPlatOILmt` parameters in the following endpoints:
    -   [Get instruments](/docs-v5/en/#trading-account-rest-api-get-instruments)

#### Response parameters 

  **Parameter**   **Type**   **Description**
  --------------- ---------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  posLmtAmt       String     Maximum position value (USD) for this instrument at the user level, based on the notional value of all same-direction open positions and resting orders. The effective user limit is max(posLmtAmt, oiUSD × posLmtPct). Applicable to `SWAP`/`FUTURES`.
  posLmtPct       String     Maximum position ratio (e.g., 30 for 30%) a user may hold relative to the platform's current total position value. The effective user limit is max(posLmtAmt, oiUSD × posLmtPct). Applicable to `SWAP`/`FUTURES`.
  maxPlatOILmt    String     Platform-wide maximum position value (USD) for this instrument. If the global position limit switch is enabled and platform total open interest reaches or exceeds this value, all users' new opening orders for this instrument are rejected; otherwise, orders pass.

## Announcements endpoint pTime update & businessPTime added 

-   Added `businessPTime` response parameter in the following endpoints:
    -   [Get announcements](/docs-v5/en/#announcement-get-announcements)

#### Response parameters 

  **Parameter**   **Type**   **Description**
  --------------- ---------- -----------------------------------------------------------------------------------------------------------------------------
  businessPTime   String     The time displayed on the announcement page for user reference. Unix timestamp format in milliseconds, e.g. `1597026383085`

-   Revise `pTime` to return the first actual publish time instead of the time displayed on the announcement page.

#### Response parameters 

  **Parameter**   **Type**   **Description**
  --------------- ---------- -----------------------------------------------------------------------------------------
  pTime           String     The first actual publish time, Unix timestamp format in milliseconds, e.g. `1750228261`

# 2025-09-26 

## New request field 

-   [POST / Cancel algo order](/docs-v5/en/#order-book-trading-algo-trading-post-cancel-algo-order)

  ------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------------------
  algoClOrdId       String            Conditional       Client-supplied Algo ID\
                                                        Either `algoId` or `algoClOrdId` is required. If both are passed, `algoId` will be used.

  ------------------------------------------------------------------------------------------------------------------------------------------------

## USD-margined contract 

To support the growth of the USDⓈ ecosystem and meet our users' diverse trading needs, OKX is introducing USD-margined contract. [More details](https://www.okx.com/help/okx-will-launch-usd-margined-futures-contracts) for the first type users, [More details](https://www.okx.com/help/okx-will-launch-usd-margined-futures) for the second type users.\
\

Users are categorized into two types based on their country or region. If you get valid data from `GET /api/v5/account/instruments?instType=SPOT&instId=BTC-USD`, you belong to the first type users, if you get an empty array \[\] data from that URL, you belong to the second type.\
\

### New endpoint 

-   [POST / Set settle currency](/docs-v5/en/#trading-account-rest-api-set-settle-currency)

### New Response Parameters 

-   [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)

  Parameter       Type     Description
  --------------- -------- ------------------------------------------------------------------------------------------------------
  settleCcy       String   Current account\'s USD-margined contract settle currency
  settleCcyList   String   Current account\'s USD-margined contract settle currency list, like \[\"USD\", \"USDC\", \"USDG\"\].

### Return parameters meaning adjustment 

-   [GET / Get order details](/docs-v5/en/#order-book-trading-trade-get-order-details)
-   [GET / Get order list](/docs-v5/en/#order-book-trading-trade-get-order-list)
-   [GET / Get order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)
-   [GET / Get order history (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)
-   [WS / Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)
-   [Get algo order details](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-details)
-   [Get algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)
-   [Get algo order history](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)
-   [Algo order channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)
-   [Advanced algo order channel](/docs-v5/en/#order-book-trading-algo-trading-ws-advance-algo-orders-channel)

Before:

  ---------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ---------------------------------------------------------------------------------------------
  ccy                     String                  Margin currency\
                                                  Applicable to all `isolated` `MARGIN` orders and `cross` `MARGIN` orders in `Futures mode`.

  ---------------------------------------------------------------------------------------------------------------------------------------------

After:

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------------------------------------
  ccy                     String                  Margin currency\
                                                  Applicable to all `isolated` `MARGIN` orders and `cross` `MARGIN` orders in `Futures mode`, `FUTURES` and `SWAP` contracts.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### `instFamily` and `uly` parameter explanation 

-   The following explanation is based on the `BTC` contract, other contracts are similar.
-   `uly` is the index, like \"BTC-USD\", and there is a one-to-many relationship with the settlement and margin currency (`settleCcy`).
-   `instFamily` is the trading instrument family, like `BTC-USD_UM`, and there is a one-to-one relationship with the settlement and margin currency (`settleCcy`).
-   The following table shows the corresponding relationship of `uly`, `instFamily`, `settleCcy` and `instId`.

  **Contract Type**        **uly**    **instFamily**   **settleCcy**   **Delivery contract instId**   **Swap contract instId**
  ------------------------ ---------- ---------------- --------------- ------------------------------ --------------------------
  USDT-margined contract   BTC-USDT   BTC-USDT         USDT            BTC-USDT-250808                BTC-USDT-SWAP
  USDC-margined contract   BTC-USDC   BTC-USDC         USDC            BTC-USDC-250808                BTC-USDC-SWAP
  USD-margined contract    BTC-USD    **BTC-USD_UM**   **USDⓈ**        **BTC-USD_UM-250808**          **BTC-USD_UM-SWAP**
  Coin-margined contract   BTC-USD    **BTC-USD**      **BTC**         **BTC-USD-250808**             **BTC-USD-SWAP**

Note:\
1. USDⓈ represents USD and multiple USD stable coins, like USDC, USDG.\
2. The settlement and margin currency refers to the `settleCcy` field returned by the [Get instruments](/docs-v5/en/#trading-account-rest-api-get-instruments) endpoint.

### New error code 

  Error Code   HTTP Status   Error Message
  ------------ ------------- --------------------------------------------------------------------------------------------------------
  59684        200           Borrowing isn't supported for this currency.
  54073        200           Couldn't place order, as {param0} is at risk of depegging. Switch settlement currencies and try again.
  59683        200           Set this crypto as your collateral crypto before selecting it as your settlement currency.
  59686        200           This crypto can't be set as a settlement currency.
  54072        200           This contract is currently view-only and not tradable.
  51008        200           Order failed. Insufficient {param0} balance.
  51008        200           Order failed. Insufficient {param0} margin.
  51502        200           Order failed. Insufficient {param0} balance.
  51502        200           Order failed. Insufficient {param0} margin.
  54074        200           Your settings failed as you have positions, bot or open orders for USD contracts.

# 2025-09-17 

## Spot and margin fee in quote currency 

OKX will support charging fees in quote currency for spot and margin trading. Users will be able to choose between paying fees in quote currency or in the obtained currency (default). The feature is available in production environment on 17 September 2025.

-   Added a new endpoint to configure the fee charging currency:
    -   [Set fee type](/docs-v5/en/#trading-account-rest-api-set-fee-type)

Request parameters

  -------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------------------------------------
  feeType           String            Yes               Fee charging method\
                                                        `0`: Charge fees in obtained currency (default)\
                                                        `1`: Charge fees in quote currency (only applicable to Spot mode)

  -------------------------------------------------------------------------------------------------------------------------

Response parameters

  ----------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------
  feeType                 String                  Fee charging method\
                                                  `0`: Charge fees in obtained currency\
                                                  `1`: Charge fees in quote currency

  ----------------------------------------------------------------------------------------

-   Added a new response parameter to the following endpoint:
    -   [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)

  --------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------
  feeType                 String                  Fee charging method\
                                                  `0`: Charge fees in obtained currency (default)\
                                                  `1`: Charge fees in quote currency

  --------------------------------------------------------------------------------------------------

-   The definitions of response parameters `feeCcy`, `fee`, `rebateCcy` and `rebate` in the following endpoints will be updated to align with the new fee charging mechanism:
    -   [Get order details](/docs-v5/en/#order-book-trading-trade-get-order-details)
    -   [Get order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)
    -   [Get order history (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)
    -   [Get order list](/docs-v5/en/#order-book-trading-trade-get-order-list)
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  feeCcy                  String                  Fee currency\
                                                  For maker sell orders of Spot and Margin, this represents the quote currency. For all other cases, it represents the currency in which fees are charged.

  fee                     String                  Fee amount\
                                                  For Spot and Margin (excluding maker sell orders): accumulated fee charged by the platform, always negative\
                                                  For maker sell orders in Spot and Margin modes, Expiry Futures, Perpetual Futures and Options: accumulated fee and rebate (always in quote currency for maker sell orders in Spot and Margin modes)

  rebateCcy               String                  Rebate currency\
                                                  For maker sell orders of Spot and Margin, this represents the base currency. For all other cases, it represents the currency in which rebates are paid.

  rebate                  String                  Rebate amount, only applicable to Spot and Margin\
                                                  For maker sell orders: Accumulated fee and rebate amount in base currency.\
                                                  For all other cases, it represents the maker rebate amount, always positive, return \"\" if no rebate.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2025-09-11 

-   Added response parameters earnAmt and earnApr, indicating the auto earn amount and actual annual percentage rate (APR)
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)

  ----------------------------------------------------------------------------------
  Parameters              Types                   Description
  ----------------------- ----------------------- ----------------------------------
  earnAmt                 String                  Auto earn amount\
                                                  Only applicable when type is 381

  earnApr                 String                  Auto earn APR\
                                                  Only applicable when type is 381
  ----------------------------------------------------------------------------------

-   Added new enumeration values of bill type and subtype
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)

  ------------------------------------------------------------------------------
  Parameters              Types                   Description
  ----------------------- ----------------------- ------------------------------
  type                    String                  Bill type\
                                                  `1`: Transfer

  subtype                 String                  Bill subtype\
                                                  `381`: Auto earn (auto lend)
  ------------------------------------------------------------------------------

# 2025-09-10 

-   Released the group RFQ feature. For a group RFQ, taker (trading team) only needs to create a single RFQ and allocate multiple normal or managed subaccounts to it, specifying allocated leg amount of each subaccount. RFQ makers only need to quote the group RFQ once. Once the taker executes the quote, RFQ executions will happen between the RFQ maker and all allocated subaccounts. Each leg will be executed at same price for all subaccounts.

### Create RFQ 

-   [Create RFQ](/docs-v5/en/#block-trading-rest-api-create-rfq)

1.  Only a master account can conduct group RFQ and the available scope of allocated subaccounts is its normal and managed subaccounts.
2.  Users will pass in **acctAlloc** request parameter to indicate the details of group RFQ account allocation, account name, instrument ID, allocated size, etc. master account is also allowed and should be indicated as \"0\". For tdMode, ccy and posSide fields, they will inherit the system default value if you leave them empty.
3.  Add **groupId, acctAlloc** as a new response parameter.
4.  The upper limit of the number of allocated subaccounts is 10. You will receive error code 70516 if you exceed the upper limit.
5.  For each symbol, the total size of RFQ legs in all accounts should be equal to its combined amount in the group RFQ. If not, you will receive error code 70514.
6.  For each sub-account, the ratio of a leg\'s size to the group RFQ must be the same across all symbols. If not, you will receive error code 70515. Here is an example:
    1.  Parent RFQ legs
        1.  Symbol: BTC-USDT, size: 50, symbol: ETH-USDT, size: 100
    2.  Child RFQ legs, happy case
        1.  Acct1: symbol: BTC-USDT, size: 30, symbol: ETH-USDT, size: 60 (ratio: 0.6)
        2.  Acct2: symbol: BTC-USDT, size: 20, symbol: ETH-USDT, size: 40 (ratio: 0.4)
    3.  Child RFQ legs, bad case
        1.  Acct1: symbol: BTC-USDT, size: 30, symbol: ETH-USDT, size: 50
        2.  Acct2: symbol: BTC-USDT, size: 20, symbol: ETH-USDT, size: 50
        3.  The total size is equal. But the ratio is not equal for different legs per subaccount.
7.  For allowPartialExecution field, it will be ignored even though users pass it in. For a group RFQ, allowPartialExecution will always be true, since taker can not determine whether the RFQ can be partially or fully filled if any subaccount fails. Thus, makers should regard it as a RFQ that can be partially filled.
8.  Group RFQ will not be created if any subaccount fails.

**Request parameters**

  **Parameter**   **Type**           **Required**   **Description**
  --------------- ------------------ -------------- ------------------------------------------------------------
  acctAlloc       Array of objects   No             Account level allocation of the RFQ
  \> acct         String             Yes            The name of the allocated account of the RFQ.
  \> legs         Array of objects   Yes            The allocated legs of the account.
  \>\> sz         String             Yes            The allocated size of each leg
  \>\> instId     String             Yes            The Instrument ID of each leg. Example : \"BTC-USDT-SWAP\"
  \>\> tdMode     String             No             Trade mode
  \>\> ccy        String             No             Margin currency
  \>\> posSide    String             No             Position side

**Response parameters**

  ----------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ----------------------------------------------------------
  \> groupId              String                  Group RFQ ID\
                                                  Only applicable to group RFQ, return \"\" for normal RFQ

  \> acctAlloc            Array of objects        Account level allocation of the RFQ

  \>\> acct               String                  The name of the allocated account of the RFQ

  \>\> sCode              String                  The code of the event execution result, 0 means success

  \>\> sMsg               String                  Rejection message if the request is unsuccessful

  \>\> legs               Array of objects        The allocated legs of the account

  \>\>\> instId           String                  Instrument ID

  \>\>\> sz               String                  The calculated size of each leg of allocated account

  \>\>\> tdMode           String                  Trade mode

  \>\>\> ccy              String                  Margin currency

  \>\>\> posSide          String                  Position side
  ----------------------------------------------------------------------------------------------------------

### Get rfqs/Rfqs channel 

-   [Get rfqs](/docs-v5/en/#block-trading-rest-api-get-rfqs)
-   [Rfqs channel](/docs-v5/en/#block-trading-websocket-private-channel-rfqs-channel)

1.  allowPartialExecution field is always true for group RFQ for taker and maker.
2.  Add a new response parameter acctAlloc with all account allocation the same as the initial request, but it is only applicable to takers.
3.  Add a new response parameter groupId, applicable to both takers and makers.
4.  For group RFQ state,
    1.  if any allocated account is pending execution, then pending_fill
    2.  otherwise,
        1.  if any allocated account is filled, then filled
        2.  if all allocated accounts are failed, then failed

**Response parameters**

  ------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ------------------------------------------------------------
  \> groupId              String                  Group RFQ ID\
                                                  Only applicable to group RFQ, return \"\" for normal RFQ

  \> acctAlloc            Array of objects        Account level allocation of the RFQ\
                                                  This is only applicable to the taker.

  \>\> acct               String                  The name of the allocated account of the RFQ.

  \>\> legs               Array of objects        The allocated legs of the account.

  \>\>\> instId           String                  The Instrument ID of each leg. Example : \"BTC-USDT-SWAP\"

  \>\>\> sz               String                  The allocated size of each leg.

  \>\>\> tdMode           String                  Trade mode

  \>\>\> ccy              String                  Margin currency

  \>\>\> posSide          String                  Position side
  ------------------------------------------------------------------------------------------------------------

### Execute quote 

-   [Execute Quote](/docs-v5/en/#block-trading-rest-api-execute-quote)

1.  Takers are not allowed to partially execuate the quote for group RFQ. You will receive error code 70507 if you don\'t pass in the full leg size.
2.  Parent RFQ leg size will be the summation of the filled size of each child RFQ leg size while fee should also be the summation.
3.  The blockTdId of parent RFQ and the tradeId of parent RFQ legs will be emoty. But there will be subaccount breakdown attached with blockTdId and tradeId populated.

**Response Parameters**

  **Parameter**    **Type**           **Description**
  ---------------- ------------------ ------------------------------------------------------------
  \> acctAlloc     Array of objects   Account level allocation of the RFQ
  \>\> acct        String             The name of the allocated account of the RFQ.
  \>\> blockTdId   String             Block trade ID
  \>\> sCode       String             The code of the event execution result, 0 means success
  \>\> sMsg        String             Rejection message if the request is unsuccessful
  \>\> legs        Array of objects   The allocated legs of the account.
  \>\>\> instId    String             The Instrument ID of each leg. Example : \"BTC-USDT-SWAP\"
  \>\>\> sz        String             The size of each account leg is filled.
  \>\>\> fee       String             The fee of each account level leg
  \>\>\> feeCcy    String             Fee currency. To be read in conjunction with fee
  \>\>\> tradeId   String             Last traded ID of each account leg

### MMP related endpoints 

-   [Reset MMP status](/docs-v5/en/#block-trading-rest-api-reset-mmp-status)
-   [Set MMP](/docs-v5/en/#block-trading-rest-api-set-mmp)
-   [Get MMP Config](/docs-v5/en/#block-trading-rest-api-get-mmp-config)

For RFQ makers, the execution attempt of group RFQ will only count once towards MMP regardless of how many account allocations involved.

### Get trades 

-   [Get trades](/docs-v5/en/#block-trading-rest-api-get-trades)

1.  This endpoint is at parent RFQ level and contains account allocation. For parent RFQ, we should return the actual executed size, i.e. failed execution size should not be included in the parent RFQ level.
2.  For account allocation, we should include both filled and failed child RFQ but add an errorCode to indicate whether a child RFQ is filled.
3.  Trade results will only be returned to group RFQ creator. Allocated subaccounts and MSAs will not see trade results. Allocated accounts are expected to get these trades through trading bills.
4.  Trades data will only be returned after all child RFQs are execuated.
5.  For parent RFQ isSuccessful field,
    1.  it will return true if any child RFQs are filled
    2.  otherwise, if all child RFQ fails, it will return false
6.  Parent RFQ blockTdId or legs tradeId will be empty. However, account allocation breakdown will be offered and blockTdId/tradeId will be attached.

**Response Parameters**

  ------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ------------------------------------------------------------
  \> acctAlloc            Array of objects        Applicable to both taker, maker

  \>\> blockTdId          String                  Block trade ID

  \>\> errorCode          String                  Error code for unsuccessful trades.\
                                                  It is \"0\" for successful trade.

  \>\> acct               String                  The name of the allocated account of the RFQ\
                                                  Only applicable to taker, return \"\" to makers

  \>\> legs               Array of objects        The allocated legs of the account.

  \>\>\> instId           String                  The Instrument ID of each leg. Example : \"BTC-USDT-SWAP\"

  \>\>\> sz               String                  Filled size

  \>\>\> tradeId          String                  Trade ID

  \>\>\> fee              String                  Fee

  \>\>\> feeCcy           String                  Fee currency
  ------------------------------------------------------------------------------------------------------------

### Structure block trades channel 

-   [Structure block trades channel](/docs-v5/en/#block-trading-websocket-private-channel-structure-block-trades-channel)

1.  This endpoint is at parent RFQ level and contains account allocation. For parent RFQ, we should return the actual executed size, i.e. failed execution size should not be included in the parent RFQ level.
2.  For account allocation, we should include both filled and failed child RFQ but add an errorCode to indicate whether a child RFQ is filled.
3.  Trade results will only be returned to group RFQ creator. Allocated subaccounts and MSAs will not see trade results. Allocated accounts are expected to get these trades through trading bills.
4.  Trades data will only be returned after all child RFQs are execuated.
5.  For parent RFQ isSuccessful field,
    1.  it will return true if any child RFQs are filled
    2.  otherwise, if all child RFQ fails, it will return false
6.  Parent RFQ blockTdId or legs tradeId will be empty. However, account allocation breakdown will be offered and tradeId will be attached.

**Response Parameters**

  **Parameter**    **Type**           **Description**
  ---------------- ------------------ ---------------------------------------------------------------------------------------------
  \> acctAlloc     Array of objects   Applicable to both taker, maker
  \>\> blockTdId   String             Block trade ID
  \>\> errorCode   String             Error code for unsuccessful trades.It is \"0\" for successful trade.
  \>\> acct        String             The name of the allocated account of the RFQOnly applicable to taker, return \"\" to makers
  \>\> legs        Array of objects   The allocated legs of the account.
  \>\>\> instId    String             The Instrument ID of each leg. Example : \"BTC-USDT-SWAP\"
  \>\>\> sz        String             Filled size
  \>\>\> tradeId   String             Trade ID
  \>\>\> fee       String             Fee
  \>\>\> feeCcy    String             Fee currency

### Public trades data 

-   Add new response parameter groupId, facilitating clients to map subaccount execution to group RFQ. Only applicable to group RFQ, return \"\" for normal RFQ.

**Examples**

-   One group RFQ request.
-   Two accounts allocated. (acct 1, acct 2)
-   Two legs. (BTC, ETH)

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Endpoint name**                                    **URL**                                      **Description**
  ---------------------------------------------------- -------------------------------------------- -------------------------------------------------------------------------------------------------------------
  Get public multi-leg transactions of block trades    `GET /api/v5/rfq/public-trades`              • Data return by this endpoint should be at **parent RFQ level** regardless of the subaccounts allocation.\
                                                                                                    • blockTdId and tradeId will be empty.

  Get public single-leg transactions of block trades   `GET /api/v5/public/block-trades`            • Data return by this endpoint should be at **child RFQ execution level** but split into a single leg.\
                                                                                                    • tradeId will be populated.

  Public structure block trades channel                \"channel\": \"public-struc-block-trades\"   • Data return by this endpoint should be at **parent RFQ level** regardless of the subaccounts allocation.\
                                                                                                    • blockTdId and tradeId will be empty.

  Public block trades channel                          \"channel\": \"public-block-trades\"         • Data return by this endpoint should be at **child RFQ execution level** but split into a single leg.\
                                                                                                    • tradeId will be populated.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Error codes 

  **Error Code**   **Error Message EN**
  ---------------- ----------------------------------------------------------------------------------------------------------------------
  70510            For error details, refer to the acctAlloc field.
  70514            For each symbol, the total size of RFQ legs in all accounts should be equal to its combined amount in the group RFQ.
  70515            For each sub-account, the ratio of a leg's size to the main account RFQ must be the same across all symbols.
  70516            You can only select up to {param0} sub-accounts for group RFQ.
  70517            {param0} doesn\'t exist or you don't have permission to create group RFQ for it.
  70518            Make sure you didn't select the same account more than once for group RFQ.

# 2025-09-09 

-   Added frpType response parameter to the endpoints below, indicating the type of forced repayment the user is experiencing
    -   [Get balance](/docs-v5/en/#trading-account-rest-api-get-balance)
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)
    -   [Get sub-account trading balance](/docs-v5/en/#sub-account-rest-api-get-sub-account-trading-balance)

  ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ---------------------------------------------------------------------------------------------------------
  frpType                 String                  Forced repayment (FRP) type\
                                                  `0`: no FRP\
                                                  `1`: user based FRP\
                                                  `2`: platform based FRP\
                                                  \
                                                  Return `1`/`2` when twap is \>= 1, applicable to `Spot mode`/`Multi-currency margin`/`Portfolio margin`

  ---------------------------------------------------------------------------------------------------------------------------------------------------------

# 2025-09-04 

-   Add source response parameter to the endpoints below.
    -   [GET / Trades](/docs-v5/en/#order-book-trading-market-data-get-trades)
    -   [GET / Trades history](/docs-v5/en/#order-book-trading-market-data-get-trades-history)
    -   [WS / All trades channel](/docs-v5/en/#order-book-trading-market-data-ws-all-trades-channel)

  -----------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -----------------------
  source                  String                  Order source\
                                                  `0`: normal

  -----------------------------------------------------------------------

# 2025-09-02 

## Historical market data query endpoint 

-   Added new public endpoint for batch retrieving historical market data
    -   [Get historical market data](/docs-v5/en/#public-data-rest-api-get-historical-market-data)
    -   Supports 6 data module types: trade history, candlestick, funding rate, and orderbook data (50/400/5000-level)
    -   Provides daily and monthly data aggregation options

## Rate limit reduction for manual borrow/repay 

-   The rate limit for the following endpoint will be reduced from 1 request per second to 1 request per 3 seconds
    -   [manual borrow/repay](/docs-v5/en/#trading-account-rest-api-manual-borrow-repay)

# 2025-08-28 

-   Added new response parameter preMktSwTime to instruments endpoints to indicate the time when premarket perpetual contracts switch to normal perpetual contracts
    -   [Get instruments (private)](/docs-v5/en/#trading-account-rest-api-get-instruments)
    -   [Get instruments (public)](/docs-v5/en/#public-data-rest-api-get-instruments)
    -   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)

**Response Parameter**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------------------------------------------------------------------
  preMktSwTime            String                  The time premarket swap switched to normal swap, Unix timestamp format in milliseconds, e.g. 1597026383085.\
                                                  Only applicable premarket `SWAP`

  --------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Fee rates endpoints support querying fee rates for premarket perpetual contracts
    -   [Get fee rates](/docs-v5/en/#trading-account-rest-api-get-fee-rates)

# 2025-08-26 

-   Added new push data parameter source to trades channel
    -   [WS / Trades channel](/docs-v5/en/#order-book-trading-market-data-ws-trades-channel)

**Push data parameters**

  -----------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------
  \> source               String                  Order source\
                                                  `0`: normal orders

  -----------------------------------------------------------------------

# 2025-08-20 

## Unified USD orderbook revamp 

To revamp unified USD orderbook, [more details](https://www.okx.com/help/okx-to-delist-usdc-spot-trading-pairs-to-support-the-unified-usd-orderbook) for the first type users, [more details](https://www.okx.com/help/okx-to-upgrade-usdc-spot-trading-pairs) for the second type users. OKX delisted the `Crypto-USDC` trading pairs and upgrade the Crypto-USD trading pairs for accessibility to all users.

Users are categorized into two types based on their country or region, with varying solutions for each. If you get valid data from `GET /api/v5/account/instruments?instType=SPOT&instId=BTC-USD`, you belong to the first type users, if you get an empty array \[\] data from that URL, you belong to the second type.

-   If you are going to trade `Crypto-USDC` pairs after the revamp:
    -   The `instId` should be set to `Crypto-USD`, such as `BTC-USD`.
    -   The `tradeQuoteCcy` is used to determine the settlement quote currency and must be set as `USDC`.
    -   The value for `tradeQuoteCcy` should be one of the enumerated values from `tradeQuoteCcyList`, which can be obtained from the endpoint [Get instruments (private)](/docs-v5/en/#trading-account-rest-api-get-instruments).
-   What you need to do:
    -   For the first type users:
        -   Regarding [Trade](/docs-v5/en/#order-book-trading-trade), [Algo Trading](/docs-v5/en/#order-book-trading-algo-trading) and and in [Block Trading](/docs-v5/en/#block-trading), you currently have two options to trade `Crypto-USDC`. The first option is to trade directly with `"instId": "Crypto-USDC"` without specifying `tradeQuoteCcy`. The second option is to trade using `"instId": "BTC-USD"` with `"tradeQuoteCcy": "USDC"`. The first option will not be available after the revamp. For more details, please refer to the **Example 1** below.
        -   Regarding [Grid Trading](/docs-v5/en/#order-book-trading-grid-trading) and [Recurring Buy](/docs-v5/en/#order-book-trading-recurring-buy), you must trade using `"instId": "BTC-USD"` with `"tradeQuoteCcy": "USDC"` after the revamp, .
    -   For the second type of users, you are allowed to trade only with `"instId": "Crypto-USDC"` before the revamp. Afterward, you must use `"instId": "Crypto-USD"` with `"tradeQuoteCcy": "USDC"`.
    -   When trading `Crypto-USDC` after the revamp, [Get maximum available balance/equity](/docs-v5/en/#trading-account-rest-api-get-maximum-available-balance-equity) and [Get maximum order quantity](/docs-v5/en/#trading-account-rest-api-get-maximum-order-quantity) will also need to use `"instId": "BTC-USD"` with `"tradeQuoteCcy": "USDC"`.
    -   When trading `Crypto-USDC` after the revamp, [Get the maximum loan of instrument](/docs-v5/en/#trading-account-rest-api-get-the-maximum-loan-of-instrument) will need to use `"tradeQuoteCcy": "USDC"`.
    -   For market data related `Crypto-USDC` and `Crypto-USD` trading, after the revamp, they will share the same order book, both using `"instId": "Crypto-USD"`, such as `BTC-USD`. The `tradeQuoteCcy` is not supported.

Example 1: Placing an order with `BTC-USDC`:

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Type**                                                                             **Before upgrading**                                      **After upgrading**
  ------------------------------------------------------------------------------------ --------------------------------------------------------- ---------------------------------------------------------
  Operation                                                                            Trading `BTC-USDC`                                        Trading `BTC-USDC`

  Request fields for `"op": "order"`                                                   First option:\                                            Only option:\
                                                                                       {\                                                        {\
                                                                                            \"instId\": \"BTC-USDC\",\                               \"instId\": \"BTC-USD\",\
                                                                                            \"tradeQuoteCcy\": \"\"\                                 \"tradeQuoteCcy\": \"USDC\"\
                                                                                       }\                                                        }\
                                                                                       \                                                         
                                                                                       Second option:\                                           
                                                                                       {\                                                        
                                                                                           \"instId\": \"BTC-USD\",\                             
                                                                                           \"tradeQuoteCcy\": \"USDC\"\                          
                                                                                       }\                                                        

  Response body from\                                                                  \[\                                                       \[\
  [Get instruments (private)](/docs-v5/en/#trading-account-rest-api-get-instruments)       {\                                                    {\
                                                                                                \"instId\": \"BTC-USDC\",\                                \"instId\": \"BTC-USD\",\
                                                                                                \"tradeQuoteCcyList\": \[\"USDC\"\],\                     \"tradeQuoteCcyList\": \[\"USD\", \"USDC\"\],\
                                                                                                \...\...\                                                 \...\...\
                                                                                           },\                                                       }\
                                                                                           {\                                                    \]
                                                                                                \"instId\": \"BTC-USD\",\                        
                                                                                                \"tradeQuoteCcyList\": \[\"USD\", \"USDC\"\],\   
                                                                                                \...\...\                                        
                                                                                           }\                                                    
                                                                                       \]                                                        
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2025-08-12 

-   Added new request parameter pxAmendType indicating the price amendment type for placing orders
    -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
    -   [Batch place orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
    -   [WS/Place order](/docs-v5/en/#order-book-trading-trade-ws-place-order)
    -   [WS/Batch place orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------------------------------------------------------
  pxAmendType       String            No                The price amendment type for orders\
                                                        `0`: Do not allow the system to amend to order price if `px` exceeds the price limit\
                                                        `1`: Allow the system to amend the price to the best available value within the price limit if `px` exceeds the price limit\
                                                        The default value is `0`

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new request parameter pxAmendType indicating the price amendment type for amending orders
    -   [Amend order](/docs-v5/en/#order-book-trading-trade-post-amend-order)
    -   [Batch amend orders](/docs-v5/en/#order-book-trading-trade-post-amend-multiple-orders)
    -   [WS/Amend order](/docs-v5/en/#order-book-trading-trade-ws-amend-order)
    -   [WS/Batch amend orders](/docs-v5/en/#order-book-trading-trade-ws-amend-multiple-orders)

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------------------------------------------
  pxAmendType       String            No                The price amendment type for orders\
                                                        `0`: Do not allow the system to amend to order price if `newPx` exceeds the price limit\
                                                        `1`: Allow the system to amend the price to the best available value within the price limit if `newPx` exceeds the price limit\
                                                        The default value is `0`

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new request parameter
    -   [Get the maximum loan of instrument](/docs-v5/en/#trading-account-rest-api-get-the-maximum-loan-of-instrument)
    -   [Post / Place grid algo order](/docs-v5/en/#order-book-trading-grid-trading-post-place-grid-algo-order)
    -   [Post / Place recurring buy order](/docs-v5/en/#order-book-trading-recurring-buy-post-place-recurring-buy-order)

  --------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- --------------------------------------------------------------------------------
  tradeQuoteCcy     String            No                The quote currency for trading. Only applicable to `SPOT`.\
                                                        The default value is the quote currency of `instId`, e.g. `USD` for `BTC-USD`.

  --------------------------------------------------------------------------------------------------------------------------------------

-   Added new return parameter
    -   [Get / Transaction details (last 3 days)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-days)
    -   [Get / Transaction details (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-months)
    -   [Get / Grid algo order list](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-list)
    -   [Get / Grid algo order details](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-details)
    -   [Get / Recurring buy order list](/docs-v5/en/#order-book-trading-recurring-buy-get-recurring-buy-order-list)
    -   [Spot grid algo orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-spot-grid-algo-orders-channel)
    -   [Get / Recurring buy order list](/docs-v5/en/#order-book-trading-recurring-buy-get-recurring-buy-order-list)
    -   [Get / Recurring buy order history](/docs-v5/en/#order-book-trading-recurring-buy-get-recurring-buy-order-history)
    -   [Get / Recurring buy order details](/docs-v5/en/#order-book-trading-recurring-buy-get-recurring-buy-order-details)
    -   [Recurring buy orders channel](/docs-v5/en/#order-book-trading-recurring-buy-ws-recurring-buy-orders-channel)

  Parameter       Type     Description
  --------------- -------- ---------------------------------
  tradeQuoteCcy   String   The quote currency for trading.

# 2025-08-08 

-   Added new response parameter colRes indicating the platform collateral borrowing restriction status and whether it is enabled
    -   [Get balance](/docs-v5/en/#trading-account-rest-api-get-balance)
    -   [Get sub-account trading balance](/docs-v5/en/#sub-account-rest-api-get-sub-account-trading-balance)
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)
    -   [Get discount rate and interest-free quota](/docs-v5/en/#public-data-rest-api-get-discount-rate-and-interest-free-quota)

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  colRes                  String                  Platform level collateral restriction status\
                                                  `0`: The restriction is not enabled.\
                                                  `1`: The restriction is not enabled. But the crypto is close to the platform\'s collateral limit.\
                                                  `2`: The restriction is enabled. This crypto can\'t be used as margin for your new orders. This may result in failed orders. But it will still be included in the account\'s adjusted equity and doesn\'t impact margin ratio.\
                                                  Refer to [Introduction to the platform collateralized borrowing limit](https://www.okx.com/help/introduction-to-the-platforms-collateralized-borrowing-limit-mechanism) for more details.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2025-08-05 

-   Added a new request field

    -   [Create RFQ](/docs-v5/en/#block-trading-rest-api-create-rfq)
    -   [Create Quote](/docs-v5/en/#block-trading-rest-api-create-quote)

      ------------------------------------------------------------------------------------------------------------------------------------------------------------------
      Parameter          Type               Required          Description
      ------------------ ------------------ ----------------- ----------------------------------------------------------------------------------------------------------
      legs               Array of Objects   No                The legs of the RFQ or Quote.

      \> tradeQuoteCcy   String             No                The quote currency used for trading. Only applicable to SPOT.\
                                                              The default value is the quote currency of the instId, for example: for `BTC-USD`, the default is `USD`.
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response field

    -   [Create RFQ](/docs-v5/en/#block-trading-rest-api-create-rfq)
    -   [Create Quote](/docs-v5/en/#block-trading-rest-api-create-quote)
    -   [Get RFQ](/docs-v5/en/#block-trading-rest-api-get-rfqs)
    -   [Get Quote](/docs-v5/en/#block-trading-rest-api-get-quotes)
    -   [Get Trade](/docs-v5/en/#block-trading-rest-api-get-trades)
    -   [Quotes channel](/docs-v5/en/#block-trading-websocket-private-channel-quotes-channel)
    -   [RFQs channel](/docs-v5/en/#block-trading-websocket-private-channel-rfqs-channel)

      **Parameter**        **Type**           **Description**
      -------------------- ------------------ --------------------------------------
      \> legs              Array of Objects   The legs .
      \>\> tradeQuoteCcy   String             The quote currency used for trading.

-   Removed request field uly from API docs, suggest using instFamily instead

      Parameter   Type     Required   Description
      ----------- -------- ---------- -------------
      uly         String   No         Underlying.

-   Add new enum for category response parameter to indicate the collateral borrowing auto converion orders

    -   [GET / Order details](/docs-v5/en/#order-book-trading-trade-get-order-details)
    -   [GET / Order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)
    -   [GET / Order history (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)
    -   [WS / Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

  -----------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -----------------------
  category                String                  Category\
                                                  `auto_conversion`

  -----------------------------------------------------------------------

-   Deprecate avgAmt, avgAmtUsd fields, return \"\"

    -   [GET / Public borrow info (public)](/docs-v5/en/#financial-product-simple-earn-flexible-get-public-borrow-info-public)

-   Deprecate amt field, return \"\"

    -   [GET / Public borrow history (public)](/docs-v5/en/#financial-product-simple-earn-flexible-get-public-borrow-history-public)

-   Added new response parameters interestFreeLiab nad potentialBorrowingAmt

    -   [Get borrow interest and limit](/docs-v5/en/#trading-account-rest-api-get-borrow-interest-and-limit)

  **Parameter**              **Type**   **Description**
  -------------------------- ---------- ------------------------------------------------
  records                    String     Details for currencies
  \> interestFreeLiab        String     Interest-free liability for current account
  \> potentialBorrowingAmt   String     Potential borrowing amount for current account

-   Added new response parameters totalLiab and interestFreeLiab
    -   [Get interest accrued data](/docs-v5/en/#trading-account-rest-api-get-interest-accrued-data)

  **Parameter**      **Type**   **Description**
  ------------------ ---------- ---------------------------------------------
  totalLiab          String     Total liability for current account
  interestFreeLiab   String     Interest-free liability for current account

# 2025-07-30 

-   Updated parameter descriptions
    -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
    -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)
    -   [Place multiple orders channel](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)

  --------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- --------------------------------------------------------------------------------------------
  tdMode            String            Yes               Trade mode\
                                                        Margin mode `cross` `isolated`\
                                                        Non-Margin mode `cash`\
                                                        `spot_isolated` (only applicable to SPOT lead trading)\
                                                        Note: `isolated` is not available in multi-currency margin mode and portfolio margin mode.

  --------------------------------------------------------------------------------------------------------------------------------------------------

-   Added error code

  Error Code   HTTP Status   Error Message
  ------------ ------------- ------------------------------------------------------------------------------------------------------
  50072        200           Isolated margin mode is no longer supported in multi-currency margin mode and portfolio margin mode.

# 2025-07-29 

-   Add a new response field
    -   [Get instruments (private)](/docs-v5/en/#trading-account-rest-api-get-instruments)
    -   [Get instruments (public)](/docs-v5/en/#public-data-rest-api-get-instruments)
    -   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)

  ----------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ----------------------------------------------------------------------------
  instIdCode              Integer                 Instrument ID code.\
                                                  For simple binary encoding, you must use `instIdCode` instead of `instId`.

  ----------------------------------------------------------------------------------------------------------------------------

-   Add new request parameter idxVol, indicating the price change percentage. Add new response parameters to indicate corresponding values before the price change while the original fields will indicate values after.
    -   [Position builder (new)](/docs-v5/en/#trading-account-rest-api-position-builder-new)

#### Request parameters 

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  idxVol            String            No                Price volatility percentage, indicating what this price change means towards each of the values. In decimal form, range -0.99 \~ 1, in 0.01 increment.\
                                                        Default 0

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### Response parameters 

  --------------------------------------------------------------------------------------------
  **Parameters**          **Types**               **Description**
  ----------------------- ----------------------- --------------------------------------------
  riskUnitData            Array of objects        Risk unit info\
                                                  Only applicable to `Portfolio margin`

  \> mmrBf                String                  Risk unit MMR before volatility (`USD`)\
                                                  Return \"\" if users don\'t pass in idxVol

  \> imrBf                String                  Risk unit IMR before volatility (`USD`)\
                                                  Return \"\" if users don\'t pass in idxVol

  \> portfolios           Array of objects        Portfolios info\
                                                  Only applicable to `Portfolio margin`

  \>\> markPxBf           String                  Mark price before price volatility\
                                                  Return \"\" if users don\'t pass in idxVol

  positions               Array of objects        Position info\
                                                  Only applicable to `Multi-currency margin`

  \> markPxBf             String                  Mark price before price volatility\
                                                  Return \"\" if users don\'t pass in idxVol

  \> imrBf                String                  IMR before price volatility
  --------------------------------------------------------------------------------------------

-   Add new endpoint get position builder trend
    -   [Position builder trend graph](/docs-v5/en/#trading-account-rest-api-position-builder-trend-graph)

# 2025-07-24 

## Add auto earn feature 

This feature is being rolled out. For details, please refer to the [Introduction to Trading Account Auto Earn and Its Rules](https://www.okx.com/help/introduction-to-trading-account-auto-earn-and-its-rules).

-   Add set auto earn endpoint to enable or disable USDT auto lending and adjust the minimum lending APR

    -   [Set auto earn](/docs-v5/en/#trading-account-rest-api-set-auto-earn)

-   Bills endpoint adds bill type `type: 1`, `subType: 381` representing auto lend interest transfer in

    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)
    -   [Get bills details (last 1 year)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-1-year)

-   Balance endpoint and channel adds auto lend related fields

    -   [Get account balance](/docs-v5/en/#trading-account-rest-api-get-balance)
    -   [Get sub-account trading balance](/docs-v5/en/#sub-account-rest-api-get-sub-account-trading-balance)
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------------------------
  details                 Array of objects        Detailed asset information in all currencies

  \> autoLendStatus       String                  Auto lend status\
                                                  `unsupported`: auto lend is not supported by this currency\
                                                  `off`: auto lend is supported but turned off\
                                                  `pending`: auto lend is turned on but pending matching\
                                                  `active`: auto lend is turned on and matched

  \> autoLendMtAmt        String                  Auto lend currency matched amount\
                                                  Return \"0\" when autoLendStatus is `unsupported/off/pending`. Return matched amount when autoLendStatus is `active`
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Add error codes

  Error Code   HTTP Status   Error Message
  ------------ ------------- ----------------------------------------------------------------------------------------
  59671        200           Auto-earn currently doesn't support {param0}.
  59672        200           You can't modify your minimmum lending APR when Auto-earn is off.
  59673        200           You can't turn off Auto-earn within 24 hours of turning it on. Try again at {param0}.
  59674        200           You can't borrow to transfer or withdraw when Auto-earn is on for this cryptocurrency.
  59675        200           You've already turned on Auto-earn for {param0}.
  59676        200           You can only use Auto-earn if your trading fee tier is {param0} or higher.

## Added toAddrType parameter in withdrawal endpoints 

-   Added `toAddrType` parameter in the following endpoints:
    -   [Withdrawal](/docs-v5/en/#funding-account-rest-api-withdrawal)
    -   [Withdrawal history](/docs-v5/en/#funding-account-rest-api-get-withdrawal-history)
    -   [Withdrawal info channel](/docs-v5/en/#funding-account-websocket-withdrawal-info-channel)

  -----------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------------------------------------------
  toAddrType        String            No                Address type\
                                                        `1`: wallet address, email, phone, or login account name\
                                                        `2`: UID (only applicable for dest=`3`)

  -----------------------------------------------------------------------------------------------------------------

# 2025-07-08 

## Open API supports Unified USD Orderbook 

For more details, please refer to [Unified USD Orderbook FAQ](https://www.okx.com/help/unified-usd-orderbook-faq)

-   Added new request parameter\
    -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)\
    -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)\
    -   [Place order channel](/docs-v5/en/#order-book-trading-trade-ws-place-order)\
    -   [Place multiple orders channel](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)\
    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)\
    -   [Get maximum available balance/equity](/docs-v5/en/#trading-account-rest-api-get-maximum-available-balance-equity)\
    -   [Get maximum order quantity](/docs-v5/en/#trading-account-rest-api-get-maximum-order-quantity)

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------------------------------------
  tradeQuoteCcy     String            No                The quote currency used for trading. Only applicable to `SPOT`.\
                                                        The default value is the quote currency of the `instId`, for example: for `BTC-USD`, the default is `USD`.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameter
    -   [Get instruments (private)](/docs-v5/en/#trading-account-rest-api-get-instruments)
    -   [Get instruments (public)](/docs-v5/en/#public-data-rest-api-get-instruments)

  **Parameter**       **Type**           **Description**
  ------------------- ------------------ -----------------------------------------------------------------------------
  tradeQuoteCcyList   Array of strings   List of quote currencies available for trading, e.g. \[\"USD\", \"USDC\"\].

-   Added new response parameter
    -   [Order details](/docs-v5/en/#order-book-trading-trade-get-order-details)
    -   [Order List](/docs-v5/en/#order-book-trading-trade-get-order-list)
    -   [Order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)
    -   [Order history (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)
    -   [Algo order details](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-details)
    -   [Algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)
    -   [Algo order history](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)
    -   [Algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)
    -   [Advance algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-advance-algo-orders-channel)

  **Parameter**   **Type**   **Description**
  --------------- ---------- --------------------------------------
  tradeQuoteCcy   String     The quote currency used for trading.

## Trades channel adds seqId field 

-   [WS / Trades channel](/docs-v5/en/#order-book-trading-market-data-ws-trades-channel)

  Parameter   Type      Description
  ----------- --------- -------------------------------------
  data        Array     Subscribed data
  \> seqId    Integer   Sequence ID of the current message.

Note: The seqId may be the same for different trade updates that occur at the same time.

## Fills channel adds clOrdId push data parameter 

-   Allowing users to specify clOrdId when placing orders. The field will be returned upon trade execution. Note that the fills channel will only return this field if the user-provided clOrdId conforms to the signed int64 positive integer format (1-9223372036854775807, 2\^63-1); if the user does not provide this field or if clOrdId does not meet the format requirements, the field will return \"0\". The order endpoints and channel will continue to return the user-provided clOrdId as usual. All request and response parameters are of string type.
    -   [WS / Fills channel](/docs-v5/en/#order-book-trading-trade-ws-fills-channel)

  Parameter    Type     Description
  ------------ -------- -------------------------------------------
  data         Array    Subscribed data
  \> clOrdId   String   Client Order ID as assigned by the client

## Order channel revamp 

To improve system performance, OKX has implemented technical changes. In exceptional cases, the same message may be sent multiple times (perhaps with the different uTime) from the [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel). The following guidelines are advised:

-   If a `tradeId` is present, it means a fill. Each `tradeId` should only be returned once per instrument ID, and the later messages that have the same `tradeId` should be discarded.
-   If `tradeId` is absent and the `state` is \"filled,\" it means that the `SPOT`/`MARGIN` market order is fully filled. For messages with the same `ordId`, process only the first filled message and discard any subsequent messages. State = filled is the terminal state of an order.
-   If the state is `canceled` or `mmp_canceled`, it indicates that the order has been canceled. For cancellation messages with the same `ordId`, process the first one and discard later messages. State = canceled / mmp_canceled is the terminal state of an order.
-   If `reqId` is present, it indicates a response to a user-requested order modification. It is recommended to use a unique `reqId` for each modification request. For modification messages with the same `reqId`, process only the first message received and discard subsequent messages.

## Transaction timeouts revamp 

-   The following endpoint is supported to set the request header `expTime`:

    -   [POST / Place sub order](/docs-v5/en/#order-book-trading-signal-bot-trading-post-place-sub-order) under signal bot trading

# 2025-07-02 

-   Added new endpoint

    -   [Get asset bills history](/docs-v5/en/#funding-account-rest-api-asset-bills-history)

-   Added new response parameter

    -   [Get asset bills details](/docs-v5/en/#funding-account-rest-api-asset-bills-details)

  Parameter   Type     Description
  ----------- -------- -------------
  notes       String   Notes

# 2025-06-26 

-   To provide the latest data and enhance the user experience, order book endpoints do not return data immediately. Instead, they return the latest data once the server-side cache has been updated.

    -   [GET / Order book](/docs-v5/en/#order-book-trading-market-data-get-order-book)
    -   [GET / Full order book](/docs-v5/en/#order-book-trading-market-data-get-full-order-book)

# 2025-06-24 

-   Added new enumeration values
    -   [Get withdrawal history](/docs-v5/en/#funding-account-rest-api-withdrawal-history)

  -------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------------------------
  state                   String                  Status of withdrawal\
                                                  \
                                                  
                                                  Stage 1 : Pending withdrawal
                                                  
                                                  `19`: insufficent balance in the hot wallet\
                                                  \
                                                  \> `0`, `17`, `19` can be cancelled, other statuses cannot be cancelled

  -------------------------------------------------------------------------------------------------------------------------

# 2025-06-19 

-   The maximum and default of request parameter limit of the endpoint are both changed to 400.
    -   [Get funding rate history](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-funding-rate-history)

# 2025-06-17 

## Fiat Buy/Sell 

-   Added new endpoints

    -   [GET Fiat Buy/Sell currency list](/docs-v5/en/#funding-account-rest-api-get-buy-sell-currencies)
    -   [GET Fiat Buy/Sell currency pair](/docs-v5/en/#funding-account-rest-api-get-buy-sell-currency-pair)
    -   [POST Fiat Buy/Sell quote](/docs-v5/en/#funding-account-rest-api-get-buy-sell-quote)
    -   [POST Fiat Buy/Sell trade](/docs-v5/en/#funding-account-rest-api-buy-sell-trade)
    -   [GET Fiat Buy/Sell trade history](/docs-v5/en/#funding-account-rest-api-get-buy-sell-trade-history)

-   Added new error codes

  --------------------------------------------------------------------------------------------------------------
  Error code                          Error Message
  ----------------------------------- --------------------------------------------------------------------------
  50071                               {param} already exists\
                                      e.g. clOrdId already exists

  51820                               Request failed

  51821                               The payment method is not supported

  51822                               Quote expired

  51823                               Parameter {param} of buy/sell trading is inconsistent with the quotation
  --------------------------------------------------------------------------------------------------------------

# 2025-06-13 

-   Added auto convert related enums for bills and transaction details endpoints
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)
    -   [Get bills details (last 1 year)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-1-year)

  -------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -------------------------
  subType                 String                  Bill subtype\
                                                  `379`: Auto convert in\
                                                  `380`: Auto convert out

  -------------------------------------------------------------------------

# 2025-06-03 

-   Add currency level response parameters colBorrAutoConversion, indicating the indicator of forced repayment when the collateralized borrowing on a crypto reaches the platform limit and users\' trading accounts hold this crypto.
    -   [Get balance](/docs-v5/en/#trading-account-rest-api-get-balance)
    -   [Get sub-account trading balance](/docs-v5/en/#sub-account-rest-api-get-sub-account-trading-balance)
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameters**             **Types**               **Description**
  -------------------------- ----------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------
  details                    Array of objects        Detailed asset information in all currencies

  \> colBorrAutoConversion   String                  Indicator of forced repayment when the collateralized borrowing on a crypto reaches the platform limit and users\' trading accounts hold this crypto.\
                                                     Divided into multiple levels from 1-5, the larger the number, the more likely the repayment will be triggered.\
                                                     The default will be 0, indicating there is no risk currently. 5 means this user is undergoing auto conversion now.\
                                                     Applicable to `Spot mode`/`Futures mode`/`Multi-currency margin`/`Portfolio margin`
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2025-05-30 

-   Add account level response parameters availEq, indicating the account level available equity excluding currencies that have been restricted for collateralized borrowing; add currency level response parameter collateralRestrict, which marks coin as restricted for collateralized borrowing.
    -   [Get balance](/docs-v5/en/#trading-account-rest-api-get-balance)
    -   [Get sub-account trading balance](/docs-v5/en/#sub-account-rest-api-get-sub-account-trading-balance)
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameters**          **Types**               **Description**
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------------------------
  availEq                 String                  Account level available equity, excluding currencies that are restricted due to the collateralized borrowing limit.\
                                                  Applicable to `Multi-currency margin`/`Portfolio margin`

  details                 Array of objects        Detailed asset information in all currencies

  \> collateralRestrict   Boolean                 Platform level collateralized borrow restriction\
                                                  `true`\
                                                  `false`
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Add currency level response parameter collateralRestrict, which marks coin as restricted for collateralized borrowing
    -   [Get discount rate and interest-free quota](/docs-v5/en/#public-data-rest-api-get-discount-rate-and-interest-free-quota)

  ---------------------------------------------------------------------------------------------------
  **Parameters**          **Types**               **Description**
  ----------------------- ----------------------- ---------------------------------------------------
  collateralRestrict      Boolean                 Platform level collateralized borrow restriction\
                                                  `true`\
                                                  `false`

  ---------------------------------------------------------------------------------------------------

# 2025-05-29 

## Add id parameter to all websocket subscribe & response 

-   Added an optional `id` parameter to the subscribe requests for websocket connections with the following url paths:
    -   `/ws/v5/public`
    -   `/ws/v5/private`
    -   `/ws/v5/business`

The same `id` will be included in all the assoicated response messages to help users to reliably map responses to the corresponding requests:

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------------------
  id                String            No                Unique identifier of the message\
                                                        Provided by client. It will be returned in response message for identifying the corresponding request.\
                                                        A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------

## Add pre-open related response parameters 

For pre-open details, please refer to [OKX call auction and pre-open mechanism](https://www.okx.com/help/call-auction-mechanism).

-   For tickers, return best bid/ask based on actual order book during the pre-open period, where the best ask price may be lower than the best bid price.

    -   [GET / Tickers](/docs-v5/en/#order-book-trading-market-data-get-tickers)
    -   [GET / Ticker](/docs-v5/en/#order-book-trading-market-data-get-ticker)
    -   [WS / Tickers channel](/docs-v5/en/#order-book-trading-market-data-ws-tickers-channel)

-   For depth data, return all depth data where the best ask price may be lower than the best bid price.

    -   [GET / Order book](/docs-v5/en/#order-book-trading-market-data-get-order-book)
    -   [GET / Full order book](/docs-v5/en/#order-book-trading-market-data-get-full-order-book)
    -   [WS / Order book channel](/docs-v5/en/#order-book-trading-market-data-ws-order-book-channel)

-   Add cancelSource:43, indicating batch cancellation at the end of the pre-open period.

    -   [WS / Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

  Parameter         Type     Description
  ----------------- -------- -----------------------------------------------------------------------------------------------------------------------------------------
  \> cancelSource   String   `43`: Order cancelled because the buy order price is higher than the index price or the sell order price is lower than the index price.

-   Instruments REST endpoint and WebSocket channel add new response parameters contTdSwitchTime and openType
    -   [Get instruments (private)](/docs-v5/en/#trading-account-rest-api-get-instruments)
    -   [Get instruments (public)](/docs-v5/en/#public-data-rest-api-get-instruments)
    -   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  contTdSwTime            String                  Continuous trading switch time. The switch time from call auction, prequote to continuous trading, Unix timestamp format in milliseconds. e.g. `1597026383085`.\
                                                  Only applicable to `SPOT`/`MARGIN` that are listed through call auction or prequote, return \"\" in other cases.

  openType                String                  Open type\
                                                  `fix_price`: fix price opening\
                                                  `pre_quote`: pre-quote\
                                                  `call_auction`: call auction\
                                                  Only applicable to `SPOT`/`MARGIN`, return \"\" for all other business lines
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Add error codes 51196, 51197

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ -------------------------------------------------------------------
  51196        200                You can only place limit orders during the pre-quote phase.
  51197        200                You can only place limit orders after the pre-quote phase begins.

# 2025-05-28 

## DMA Broker Endpionts Revamp 

**Last update: May 14, 2025**\

It has been released to demo trading environment and will be in production in late-May.

-   Delist enumeration value for `perm` field\
    -   [Create an API Key for a sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-create-an-api-key-for-a-sub-account)\
    -   [Query the API Key of a sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-query-the-api-key-of-a-sub-account)\

  -----------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -----------------------
  perm                    String                  API Key permissions\
                                                  `withdraw`: Withdraw

  -----------------------------------------------------------------------

-   Field renaming and addition
    -   [Get sub-account list](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-sub-account-list)
    -   [Get sub-account fee rates](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-sub-account-fee-rates)

  ------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ------------------------------------------------------------------
  \> ~~mainAcct~~\        String                  ~~Main account name of the second-level sub-account\
  \> firstLvSubAcct                               It is the first-level sub-account when `mainAcct` is \"\"\
                                                  It is the second-level sub-account when `mainAcct` has value.~~\
                                                  The first level sub-account.\
                                                  For subAcctLv: 1, firstLvSubAcct is equal to subAcct.\
                                                  For subAcctLv: 2, subAcct belongs to firstLvSubAcct.

  \> subAcctLv            String                  Sub-account level\
                                                  `1`: First level sub-account\
                                                  `2`: Second level sub-account
  ------------------------------------------------------------------------------------------------------------------

# 2025-05-27 

## Adjustment for websocket disconnect notification 

To enhance the API service, websocket disconnect notification (event = `notice`) will adjust from 30 seconds prior to the upgrade of the WebSocket service to 60 seconds.

The feature has launched to production on May 27, 2025 (effective on June 2, 2025).

# 2025-05-26 

-   The request parameter has been updated as follows:
    -   [Get funding rate](/docs-v5/en/#public-data-rest-api-get-funding-rate)

Before

  -------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------
  instId            String            Yes               Instrument ID, e.g. `BTC-USD-SWAP`\
                                                        only applicable to `SWAP`

  -------------------------------------------------------------------------------------------

After

  --------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- --------------------------------------------------------------------------------------------------
  instId            String            Yes               Instrument ID, e.g. `BTC-USD-SWAP` or `ANY` to return the funding rate info of all swap symbols\
                                                        only applicable to `SWAP`

  --------------------------------------------------------------------------------------------------------------------------------------------------------

# 2025-05-21 

-   Added Move positions and Get move positions history endpoints

    -   [Move positions](/docs-v5/en/#trading-account-rest-api-move-positions)
    -   [Get move positions history](/docs-v5/en/#trading-account-rest-api-get-move-positions-history)

-   Added move positions related enums for bills and transaction details endpoints

    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)
    -   [Get bills details (last 1 year)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-1-year)
    -   [GET / Transaction details (last 3 days)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-days)
    -   [GET / Transaction details (last 1 year)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-1-year)

  ----------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ----------------------------------
  type                    String                  Bill type\
                                                  `32`: Move position

  subType                 String                  Bill/transaction subtype\
                                                  `324`: Move position buy\
                                                  `325`: Move position sell\
                                                  `326`: Move position open long\
                                                  `327`: Move position open short\
                                                  `328`: Move position close long\
                                                  `329`: Move position close short
  ----------------------------------------------------------------------------------

-   Added move positions related error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ -----------------------------------------------------------------------------------------------------------------------------------
  70060        200                The {account} doesn't exist or the position side is incorrect. "To" and "from" accounts must be under the same main account.
  70061        200                To move position, please enter a position that's opposite to your current side and is smaller than or equal to your current size.
  70062        200                {account} has reached the maximum number of position transfers allowed per day.
  70064        200                Position does not exist.
  70065        200                Couldn't move position. Execution price cannot be determined.
  70066        200                Moving positions isn\'t supported in spot mode. Switch to any other account mode and try again.
  70067        200                Moving positions isn\'t supported in margin trading.

# 2025-05-15 

-   Added new enumeration values
    -   [Asset bills details](/docs-v5/en/#funding-account-rest-api-asset-bills-details)

  ---------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------
  type                    String                  Bill type\
                                                  `372`: Asset segregation\
                                                  `373`: Asset release

  ---------------------------------------------------------------------------

# 2025-05-08 

-   Added new enumeration values
    -   [(Flexible loan) GET / Loan history](/docs-v5/en/#financial-product-flexible-loan-get-loan-history)

  -------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------
  type                    String                  Action type\
                                                  `sell_collateral`\
                                                  `buy_transition_coin`\
                                                  `sell_transition_coin`\
                                                  `buy_borrowed_coin`

  -------------------------------------------------------------------------

# 2025-05-07 

-   Added new enumeration values for cancelSource field
    -   [WS / Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

  Parameter         Type     Description
  ----------------- -------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \> cancelSource   String   `44`: Your order was canceled because your available balance of this crypto was insufficient for auto conversion. Auto conversion was triggered when the total collateralized liabilities for this crypto reached the platform's risk control limit.

-   Added new bill subtypes for trading account
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-1-year)
    -   [GET / Transaction details (last 3 days)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-days)
    -   [GET / Transaction details (last 1 year)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-1-year)

  ------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ------------------------------------------------------
  subType                 String                  Bill subtype\
                                                  `376`: Collateralized borrowing auto conversion buy\
                                                  `377`: Collateralized borrowing auto conversion sell

  ------------------------------------------------------------------------------------------------------

-   Added new endpoints
    -   [(SOL staking) GET / Product info](/docs-v5/en/#financial-product-sol-staking-get-product-info)

# 2025-05-06 

## Instruments endpoints revamp 

\
OKX revamped instruments REST endpoints and WebSocket channel, which will update `listTime` or `expTime` once the listing and delisting announcement is published.\
\
**Instrument listing**

-   [Get instruments (public)](/docs-v5/en/#public-data-rest-api-get-instruments)
-   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)

Instruments REST endpoint and WebSocket channel will update `listTime` once the listing announcement is published:

1.  For `SPOT/MARGIN/SWAP`, this event is only applicable to `instType`, `instId`, `listTime`, `state`.\
2.  For `FUTURES`, this event is only applicable to `instType`, `instFamily`, `listTime`, `state`.\
3.  Other fields will be \"\" temporarily, but they will be updated at least 5 minutes in advance of the `listTime`, then the WebSocket subscription using related `instId`/`instFamily` can be available.\

> Instrument listing - Channel update example


``` {.highlight .json .tab-json}
{
  "arg": {
    "channel": "instruments",
    "instType": "SPOT"
  },
  "data": [
    {
        "alias": "",
        "auctionEndTime": "",
        "baseCcy": "",
        "category": "",
        "ctMult": "",
        "ctType": "",
        "ctVal": "",
        "ctValCcy": "",
        "expTime": "",
        "instFamily": "",
        "instId": "BTC-USDT",
        "instType": "SPOT",
        "lever": "",
        "listTime": "1606468572000",
        "lotSz": "",
        "maxIcebergSz": "",
        "maxLmtAmt": "",
        "maxLmtSz": "",
        "maxMktAmt": "",
        "maxMktSz": "",
        "maxStopSz": "",
        "maxTriggerSz": "",
        "maxTwapSz": "",
        "minSz": "",
        "optType": "",
        "quoteCcy": "",
        "settleCcy": "",
        "state": "preopen",
        "ruleType": "",
        "stk": "",
        "tickSz": "",
        "uly": ""
    }
  ]
}
```


\
**Instrument delisting**

-   [Get instruments (private)](/docs-v5/en/#trading-account-rest-api-get-instruments)
-   [Get instruments (public)](/docs-v5/en/#public-data-rest-api-get-instruments)
-   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)

Instruments REST endpoints and WebSocket channel will update `expTime` once the delisting announcement is published.

# 2025-04-28 

## AWS domain ceased service 

AWS domain ceased service, please switch to the other service domain. AWS domain as follows:\

  Original AWS domain   Switch To
  --------------------- -------------
  aws.okx.com           www.okx.com
  wsaws.okx.com         ws.okx.com

# 2025-04-24 

-   Delisted request filed from the document
    -   [Get algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)\

  ----------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------------
  algoClOrdId       String            No                Client-supplied Algo ID\
                                                        A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------

-   Delisted endpoints from the document
    -   [Cancel Advance Algo Order](/docs-v5/en/#order-book-trading-algo-trading-post-cancel-advance-algo-order)
    -   [Get the user\'s affiliate rebate information](/docs-v5/en/#affiliate-rest-api-get-the-user-39-s-affiliate-rebate-information)

# 2025-04-17 

-   Added endpoints

    -   [Create sub-account](/docs-v5/en/#sub-account-rest-api-create-sub-account)\
    -   [Create an API Key for a sub-account](/docs-v5/en/#sub-account-rest-api-create-an-api-key-for-a-sub-account)\
    -   [Query the API Key of a sub-account](/docs-v5/en/#sub-account-rest-api-query-the-api-key-of-a-sub-account)\
    -   [Delete the API Key of sub-accounts](/docs-v5/en/#sub-account-rest-api-delete-the-api-key-of-sub-accounts)\
        \

-   Added new error codes

  Error code   Error Message
  ------------ -------------------------------------------------------------------------------------------------
  59515        You are currently not on the custody whitelist. Please contact customer service for assistance.
  59516        Please create the Copper custody funding account first.
  59517        Please create the Komainu custody funding account first.
  59518        You can't create a sub-account using the API; please use the app or web.
  59519        You can't use this function/feature while it\'s frozen, due to: {freezereason}

-   Added new request parameter
    -   [Add investment](/docs-v5/en/#order-book-trading-grid-trading-post-add-investment)

  -----------------------------------------------------------------------------------------------------------------------
  Parameter             Type              Required          Description
  --------------------- ----------------- ----------------- -------------------------------------------------------------
  allowReinvestProfit   String            No                Whether reinvesting profits, only applicable to spot grid.\
                                                            `true` or `false`. The default is true.

  -----------------------------------------------------------------------------------------------------------------------

# 2025-04-02 

OKX plans to roll out updates to the funding rate calculation method for perpetual contracts in batches starting mid-April. The API related changes have been released to production.

For specific updates and the schedule, please refer to the announcement: [Learn more](/help/okx-to-change-the-funding-rate-formula-for-perpetual-futures).

-   The premium field of the following endpoints always represents the premium index calculated by the current premium formula.

    -   [Get premium history](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-premium-history)
    -   [Get funding rate](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-funding-rate)
    -   [Funding rate channel](https://www.okx.com/docs-v5/en/#public-data-websocket-funding-rate-channel)

-   Add a new response parameter and push data parameter, formulaType, to indicate whether the funding rate is calculated by the new formula.

    -   [Get funding rate](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-funding-rate)
    -   [Funding rate channel](https://www.okx.com/docs-v5/en/#public-data-websocket-funding-rate-channel)
    -   [Get funding rate history](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-funding-rate-history)

  --------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- --------------------------------------
  formulaType             String                  Formula type\
                                                  `noRate`: old funding rate formula\
                                                  `withRate`: new funding rate formula

  --------------------------------------------------------------------------------------

-   Add a new response parameter and push data parameter, interestRate and impactMargin
    -   [Get funding rate](https://www.okx.com/docs-v5/en/#public-data-rest-api-get-funding-rate)
    -   [Funding rate channel](https://www.okx.com/docs-v5/en/#public-data-websocket-funding-rate-channel)

  **Parameter**   **Type**   **Description**
  --------------- ---------- -------------------------------------------------------
  interestRate    String     Interest rate
  impactValue     String     Depth weighted amount (in the unit of quote currency)

# 2025-03-26 

## Setting collateral cryptocurrencies in multi-currency account mode 

[Learn more](/help/setting-collateral-cryptocurrencies-in-multi-currency-account-mode)

-   Added new response parameters
    -   [Get balance](/docs-v5/en/#trading-account-rest-api-get-balance)
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)

  ----------------------------------------------------------------------------------------------
  **Parameters**          **Types**               **Description**
  ----------------------- ----------------------- ----------------------------------------------
  details                 String                  Detailed asset information in all currencies

  \> collateralEnabled    Boolean                 `true`: Collateral enabled\
                                                  `false`: Collateral disabled\
                                                  Applicable to `Multi-currency margin`
  ----------------------------------------------------------------------------------------------

-   Added new endpoints

    -   [Set collateral assets](/docs-v5/en/#trading-account-rest-api-set-collateral-assets)
    -   [Get collateral assets](/docs-v5/en/#trading-account-rest-api-get-collateral-assets)

-   Added new error codes

  Error code   Error Message
  ------------ --------------------------------------------------------------------------------------------------------------------------------------------------------
  54024        Your order failed because you must enable {ccy} as collateral to trade expiry futures, perpetual futures, and options in cross-margin mode.
  54025        Your order failed because you must enable {ccy} as collateral to trade margin, expiry futures, perpetual futures, and options in isolated margin mode.
  54026        Your order failed because you must enable {ccy} and {ccy1} as collateral to trade the margin pair in isolated margin mode.
  54027        Your order failed because you must enable {ccy} as collateral to trade options.
  54028        Your order failed because you must enable {ccy} as collateral to trade spot in isolated margin mode.
  54029        {param0} doesn't exist within {param1}.
  59658        {ccy} isn't supported as collateral.
  59658        {ccy} and {ccy1} aren't supported as collateral.
  59658        {ccy}, {ccy1}, and {ccy2} aren't supported as collateral.
  59658        {ccy}, {ccy1}, {ccy2}, and {number} other crypto aren't supported as collateral.
  59659        Failed to apply settings because you must also enable {ccy} to enable {ccy1} as collateral.
  59660        Failed to apply settings because you must also disable {ccy} to disable {ccy1} as collateral.
  59661        Failed to apply settings because you can't disable {ccy} as collateral.
  59662        Failed to apply settings because of open orders or positions requiring {ccy} as collateral.
  59662        Failed to apply settings because of open orders or positions requiring {ccy} and {ccy1} as collateral.
  59662        Failed to apply settings because of open orders or positions requiring {ccy}, {ccy1}, and {ccy2} as collateral.
  59662        Failed to apply settings because of open orders or positions requiring {ccy}, {ccy1}, {ccy2}, and {number} other crypto as collateral.
  59664        Failed to apply settings because you have borrowings in {ccy}.
  59664        Failed to apply settings because you have borrowings in {ccy} and {ccy1}.
  59664        Failed to apply settings because you have borrowings in {ccy}, {ccy1}, and {ccy2}.
  59664        Failed to apply settings because you have borrowings in {ccy}, {ccy1}, {ccy2}, and {number} other crypto.
  59665        Failed to apply settings. Enable other cryptocurrencies as collateral to meet the position's margin requirements.
  59666        Failed to apply settings because you can't enable and disable a crypto as collateral at the same time.
  59667        Failed to apply settings because virtual accounts don't support enabling collateral.

## Adding parameters for Websocket 

-   Added new response parameter
    -   [WS / Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------
  \> fillIdxPx            String                  Index price at the moment of trade execution\
                                                  For cross currency spot pairs, it returns baseCcy-USDT index price. For example, for LTC-ETH, this field returns the index price of LTC-USDT.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameter
    -   [Open interest channel](/docs-v5/en/#public-data-websocket-open-interest-channel)

  Parameter   Type     Description
  ----------- -------- --------------------------------
  \> oiUsd    String   Open interest in number of USD

# 2025-03-21 

-   Add new enum `third_quarter` for response parameter alias. Please refer to expTime response field to get the expiration time.
    -   [Get instruments (public)](/docs-v5/en/#public-data-rest-api-get-instruments)
    -   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)

  --------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------
  alias                   String                  Alias\
                                                  `third_quarter`: third quarter

  --------------------------------------------------------------------------------

# 2025-03-19 

-   Added new parameters
    -   [Get sub-account list](/docs-v5/en/#sub-account-rest-api-get-sub-account-list)

  --------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------------
  subAcctLv               String                  Sub-account level\
                                                  `1`: First level sub-account\
                                                  `2`: Second level sub-account

  firstLvSubAcct          String                  The first level sub-account.\
                                                  For subAcctLv: 1, firstLvSubAcct is equal to subAcct.\
                                                  For subAcctLv: 2, subAcct belongs to firstLvSubAcct.

  ifDma                   Boolean                 Whether it is dma broker sub-account.\
                                                  `true`: Dma broker sub-account\
                                                  `false`: It is not dma broker sub-account.
  --------------------------------------------------------------------------------------------------------

# 2025-03-18 

## One-click repay supported in SPOT mode 

-   Added new endpoints

    -   [GET / One-click repay currency list (New)](/docs-v5/en/#order-book-trading-trade-get-one-click-repay-currency-list-new)
    -   [POST / Trade one-click repay (New)](/docs-v5/en/#order-book-trading-trade-post-trade-one-click-repay-new)
    -   [GET / One-click repay history (new)](/docs-v5/en/#order-book-trading-trade-get-one-click-repay-history-new)

-   Added new error codes

  Error code   Error Message
  ------------ -------------------------------------------------------------------------------------
  59129        The first crypto you use to repay must be {param0}.
  59130        If an asset's balance is \< 1 USD, it can only repay borrowings of the same crypto.
  59140        You can only repay with your collateral crypto.

# 2025-03-12 

## Expiry futures daily settlement 

OKX will launch a daily settlement mechanism for expiry futures in cross-margin mode, [Learn more](/help/okx-will-launch-a-daily-settlement-mechanism-for-expiry-futures-in-cross)

-   Added new endpoint

    -   [Get estimated future settlement info](/docs-v5/en/#public-data-rest-api-get-estimated-future-settlement-price)
    -   [Get future settlement history](/docs-v5/en/#public-data-rest-api-get-futures-settlement-history)

-   Added new response parameters

    -   [Get estimated delivery/exercise/settlement price](/docs-v5/en/#public-data-websocket-estimated-delivery-exercise-settlement-price-channel)

  ----------------------------------------------------------------------------------
  **Parameters**          **Types**               **Description**
  ----------------------- ----------------------- ----------------------------------
  settleType              String                  Type\
                                                  `settlement`: Future settlement\
                                                  `delivery`: Future delivery\
                                                  `exercise`: Option exercise

  ----------------------------------------------------------------------------------

-   Added new response parameters
    -   [Get instruments (private)](/docs-v5/en/#trading-account-rest-api-get-instruments)
    -   [Get instruments (public)](/docs-v5/en/#public-data-rest-api-get-instruments)
    -   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)

  --------------------------------------------------------------------------------------
  **Parameters**          **Types**               **Description**
  ----------------------- ----------------------- --------------------------------------
  futureSettlement        Boolean                 Whether daily settlement is enabled\
                                                  Applicable to `FUTURES` `cross`

  --------------------------------------------------------------------------------------

-   Added new response parameters
    -   [Get positions](/docs-v5/en/#trading-account-rest-api-get-positions)
    -   [Get positions history](/docs-v5/en/#trading-account-rest-api-get-positions-history)
    -   [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)
    -   [Balance and position channel](/docs-v5/en/#trading-account-websocket-balance-and-position-channel)

Entry Price\
Under cross-margin mode, the entry price of expiry futures will update at settlement to the last settlement price, and when the position is opened or increased.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameters**          **Types**               **Description**
  ----------------------- ----------------------- ---------------------------------------------------------------------------------------------------------------
  nonSettleAvgPx          String                  Non-Settlement entry price\
                                                  The non-settlement entry price only reflects the average price at which the position is opened or increased.\
                                                  Applicable to `FUTURES` `cross`

  settledPnl              String                  Accumulated settled P&L (calculated by settlement price)\
                                                  Applicable to `FUTURES` `cross`
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new enums for parameters
    -   [Balance and position channel](/docs-v5/en/#trading-account-websocket-balance-and-position-channel)

  -----------------------------------------------------------------------
  **Parameters**          **Types**               **Description**
  ----------------------- ----------------------- -----------------------
  \> eventType            String                  Event Type\
                                                  `settlement`

  -----------------------------------------------------------------------

-   Added new enums for parameters
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)

  -----------------------------------------------------------------------
  **Parameters**          **Types**               **Description**
  ----------------------- ----------------------- -----------------------
  type                    String                  Bill type\
                                                  `34`: Settlement

  subType                 String                  Bill sub-type\
                                                  `355`: Settlement PnL
  -----------------------------------------------------------------------

## New cancelSource enumeration 

-   Added new enumeration values for cancelSource field
    -   [WS / Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

  Parameter         Type     Description
  ----------------- -------- ---------------------------------------------------
  \> cancelSource   String   `10`: Order canceled: Option contract expiration.

## Add pagination parameters in push data in account and position channels 

-   Add eventType, curPage, lastPage push data parameters to account and positions WebSocket channels.
    -   [Account Channel](/docs-v5/en/#trading-account-websocket-account-channel)
    -   [Positions Channel](/docs-v5/en/#trading-account-websocket-positions-channel)

**Push data parameters**

  -------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------------------------------
  eventType               String                  Event type:\
                                                  `snapshot`: Initial and regular snapshot push\
                                                  `event_update`: Event-driven update push

  curPage                 Integer                 Current page number.\
                                                  Only applicable for `snapshot` events. Not included in `event_update` events.

  lastPage                Boolean                 Whether this is the last page of pagination:\
                                                  `true`\
                                                  `false`\
                                                  Only applicable for `snapshot` events. Not included in `event_update` events.
  -------------------------------------------------------------------------------------------------------------------------------

# 2025-03-03 

## Fixed Loan and Simple Earn Fixed going offline 

### Fixed Loan 

-   API offline
    -   Convert fixed loan to market loan (`POST /api/v5/account/fixed-loan/convert-to-market-loan`)
    -   Manual renew fixed loan borrowing order (`POST /api/v5/account/fixed-loan/manual-reborrow`)
    -   Place fixed loan borrowing order (`POST /api/v5/account/fixed-loan/borrowing-order`)
    -   Reduce liabilities for fixed loan (`POST /api/v5/account/fixed-loan/reduce-liabilities`)
    -   Repay fixed loan borrowing order (`POST /api/v5/account/fixed-loan/repay-borrowing-order`)
    -   Amend fixed loan borrowing order (`POST /api/v5/account/fixed-loan/amend-borrowing-order`)
    -   Get fixed loan borrow limit (`GET /api/v5/account/fixed-loan/borrowing-limit`)
    -   Get fixed loan borrow order list (`GET /api/v5/account/fixed-loan/borrowing-orders-list`)
    -   Get fixed loan borrow quote (`GET /api/v5/account/fixed-loan/borrowing-quote`)

### Simple Earn Fixed 

-   API offline
    -   Amend lending order (`POST /api/v5/finance/fixed-loan/amend-lending-order`)
    -   Get lending APY history (`GET /api/v5/finance/fixed-loan/lending-apy-history`)
    -   Get lending offers (`GET /api/v5/finance/fixed-loan/lending-offers`)
    -   Get lending order list (`GET /api/v5/finance/fixed-loan/lending-orders-list`)
    -   Get lending sub order list (`GET /api/v5/finance/fixed-loan/lending-sub-orders`)
    -   Get lending volume (`GET /api/v5/finance/fixed-loan/pending-lending-volume`)
    -   Place lending order (`POST /api/v5/finance/fixed-loan/lending-order`)

# 2025-02-12 

## Isolated margin support base and quote currency as collateral 

OKX released a new **isolated margin trading mode** (`auto_transfers_ccy`) to support either base or quote currency as collateral for long and short positions. For example, when longing BTC-USDT, users were previously required to use BTC as collateral. With this update, USDT can also be used. The same applies to short positions.

After users are switched to the new isolated margin trading mode, they must specify the collateral currency using the `ccy` parameter when placing isolated margin orders. If the parameter is missing, an error will be returned with code 50014 and the message: \"Parameter ccy cannot be empty.\"

**The API changes are listed below**:

-   Add a new enumeration value `auto_transfers_ccy` for the isoMode request parameter. Users are not allowed to revert to the old mode once they switch to the new one.
    -   [Isolated margin trading settings](/docs-v5/en/#trading-account-rest-api-isolated-margin-trading-settings)

**Request Parameters**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  isoMode           String            Yes               Isolated margin trading settings\
                                                        `auto_transfers_ccy`: New auto transfers, enabling both base and quote currency as the margin for isolated margin trading. Only applicable to `MARGIN`.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Add a new enumeration value `auto_transfers_ccy` for the mgnIsoMode response parameter.

    -   [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)

-   For placing orders, users must pass in ccy request parameter to indicate the collateral currency for isolated margin trading when they are in the `auto_transfers_ccy` mode. Otherwise, an error will be returned with code as 50014 and message as \"Parameter ccy cannot be empty\".

    -   [POST / Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
    -   [POST / Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
    -   [WS / Place order](/docs-v5/en/#order-book-trading-trade-ws-place-order)
    -   [WS / Place multiple orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)
    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)

-   For order details, ccy response parameter will be returned if users trade isolated margin under `auto_transfers_ccy` mode.

    -   [GET / Order details](/docs-v5/en/#order-book-trading-trade-get-order-details)
    -   [GET / Order List](/docs-v5/en/#order-book-trading-trade-get-order-list)
    -   [GET / Order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)
    -   [GET / Order history (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)
    -   [WS / Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)
    -   [Algo order details](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-details)
    -   [Algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)
    -   [Algo order history](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)
    -   [Algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)
    -   [Advance algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-advance-algo-orders-channel)

-   For position details, ccy response parameter will be returned if users trade isolated margin under `auto_transfers_ccy` mode.

    -   [Get positions](/docs-v5/en/#trading-account-rest-api-get-positions)
    -   [Get positions history](/docs-v5/en/#trading-account-rest-api-get-positions-history)
    -   [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)
    -   [Balance and position channel](/docs-v5/en/#trading-account-websocket-balance-and-position-channel)

-   For get maximum order quantity, users can pass in ccy to decide which currency to be used as collateral.

    -   [Get maximum order quantity](/docs-v5/en/#trading-account-rest-api-get-maximum-order-quantity)

-   For the endpoints below, users must pass in ccy.

    -   [Get maximum available balance/equity](/docs-v5/en/#trading-account-rest-api-get-maximum-available-balance-equity)
    -   [Increase/decrease margin](/docs-v5/en/#trading-account-rest-api-increase-decrease-margin)
    -   [Get leverage estimated info](/docs-v5/en/#trading-account-rest-api-get-leverage-estimated-info)

-   For the endpoints below, users must pass in mgnCcy.

    -   [Get the maximum loan of instrument](/docs-v5/en/#trading-account-rest-api-get-the-maximum-loan-of-instrument)

-   Added new bill subtypes for trading account

    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)

  ----------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------
  subType                 String                  Bill subtype\
                                                  `332`: Margin transfer in isolated margin position\
                                                  `333`: Margin transfer out isolated margin position\
                                                  `334`: Margin loss when closing isolated margin position

  ----------------------------------------------------------------------------------------------------------

\

-   Array attachAlgoOrds with stop-profit and stop-loss is be available
    -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)\
    -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)\

\

-   Added new parameters
    -   [Get balance](/docs-v5/en/#trading-account-rest-api-get-balance)
    -   [Get sub-account trading balance](/docs-v5/en/#sub-account-rest-api-get-sub-account-trading-balance)
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)

  ----------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------
  notionalUsdForBorrow    String                  Notional value for `Borrow` in USD\
                                                  Applicable to `Spot mode`/`Multi-currency margin`/`Portfolio margin`

  notionalUsdForSwap      String                  Notional value of positions for `Perpetual Futures` in USD\
                                                  Applicable to `Multi-currency margin`/`Portfolio margin`

  notionalUsdForFutures   String                  Notional value of positions for `Expiry Futures` in USD\
                                                  Applicable to `Multi-currency margin`/`Portfolio margin`

  notionalUsdForOption    String                  Notional value of positions for `Option` in USD\
                                                  Applicable to `Spot mode`/`Multi-currency margin`/`Portfolio margin`
  ----------------------------------------------------------------------------------------------------------------------

# 2025-01-17 

## Update margin calculation rules for the portfolio margin mode 

Risk notice\
These changes will result in your margin being adjusted. Please take precautionary measures against potential liquidation risk in your account.

To provide better trading services, OKX will update margin calculation rules for portfolio margin mode.\

More details refer to [OKX will update margin calculation rules for the portfolio margin mode](/help/okx-will-update-margin-calculation-rules-for-the-portfolio-margin-mode)\
\

API have adjustment as follows:

-   Adjusted response parameters
    -   [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)

  -----------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -----------------------
  spotOffsetType          String                  ~~Risk offset type~~\
                                                  (Deprecated)

  -----------------------------------------------------------------------

-   API offline
    -   Set risk offset type (POST /api/v5/account/set-riskOffset-type)

# 2025-01-15 

-   Added new parameters & remove parameters
    -   [Position builder (new)](/docs-v5/en/#trading-account-rest-api-position-builder-new)

Request parameters

  -------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type               Required          Description
  ----------------- ------------------ ----------------- ------------------------------------------------------------------------------
  acctLv            String             No                Switch to account mode\
                                                         `3`: Multi-currency margin\
                                                         `4`: Portfolio margin\
                                                         The default is `4`

  spotOffsetType    String             No                ~~Spot-derivatives risk offset mode\
                                                         `1`: Spot-derivatives (USDT)\
                                                         `2`: Spot-derivatives (crypto)\
                                                         `3`: Derivatives-only\
                                                         The default is `3`~~\
                                                         (Deprecated)

  lever             String             No                Cross margin leverage in Multi-currency margin mode, the default is `1`.\
                                                         If the allowed leverage is exceeded, set according to the maximum leverage.\
                                                         Only applicable to `Multi-currency margin`

  simPos            Array of objects   No                List of simulated positions

  \> avgPx          String             Yes               Average open price

  \> lever          String             No                leverage\
                                                         Only applicable to `Multi-currency margin`\
                                                         The default is `1`\
                                                         If the allowed leverage is exceeded, set according to the maximum leverage.
  -------------------------------------------------------------------------------------------------------------------------------------

Response parameters

  --------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameters**          **Types**               **Description**
  ----------------------- ----------------------- --------------------------------------------------------------------------------------------------
  upl                     String                  UPL for the account

  acctLever               String                  Leverage of the account

  assets                  Array of objects        Asset info

  \> borrowMmr            String                  ~~Borrowing MMR (`USD`)~~(Deprecated)

  riskUnitData            Array of objects        Risk unit info

  \> upl                  String                  Risk unit UPL (`USD`)

  \> mr8                  String                  Borrowing MMR/IMR

  \> mr9                  String                  USDT-USDC-USD hedge risk

  \> portfolios           Array of objects        Portfolios info\
                                                  Only applicable to `Portfolio margin`

  \>\> posSide            String                  Position side\
                                                  `long`\
                                                  `short`\
                                                  `net`

  \>\> avgPx              String                  Average open price

  \>\> markPx             String                  Mark price

  \>\> floatPnl           String                  Float P&L

  \> positions            Array of objects        Position info\
                                                  Only applicable to `Multi-currency margin`

  \>\> instId             String                  Instrument ID, e.g. `BTC-USDT-SWAP`

  \>\> instType           String                  Instrument type\
                                                  `SPOT`\
                                                  `SWAP`\
                                                  `FUTURES`\
                                                  `OPTION`

  \>\> amt                String                  When `instType` is `SPOT`, it represents spot in use.\
                                                  When `instType` is `SWAP`/`FUTURES`/`OPTION`, it represents position amount.

  \>\> posSide            String                  Position side\
                                                  `long`\
                                                  `short`\
                                                  `net`

  \>\> avgPx              String                  Average open price

  \>\> markPx             String                  Mark price

  \>\> floatPnl           String                  Float P&L

  \>\> imr                String                  IMR

  \>\> mgnRatio           String                  Margin ratio

  \>\> lever              String                  Leverage

  \>\> notionalUsd        String                  Notional in `USD`

  \>\> isRealPos          Boolean                 Whether it is a real position\
                                                  If `instType` is `SWAP`/`FUTURES`/`OPTION`, it is a valid parameter, else it will return `false`
  --------------------------------------------------------------------------------------------------------------------------------------------------

# 2025-01-07 

## Get oracle API is offline 

`Get oracle` API is offline, please use [Get token market data](https://www.oklink.com/docs/en/#token-price-data-get-token-market-data) instead.

# 2024-12-31 

-   Adjusted request parameters
    -   [(ETH staking)Purchase&Redeem history](/docs-v5/en/#financial-product-eth-staking-get-purchase-amp-redeem-history)
    -   [(SOL staking)Purchase&Redeem history](/docs-v5/en/#financial-product-sol-staking-get-purchase-amp-redeem-history)

Before

  -----------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------
  type              String            Yes               Type\
                                                        `purchase`\
                                                        `redeem`

  -----------------------------------------------------------------------

After

  -----------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------
  type              String            No                Type\
                                                        `purchase`\
                                                        `redeem`

  -----------------------------------------------------------------------

# 2024-12-18 

-   OKX supports tag level cancel all after for MMP orders (ordType: `mmp`, `mmp_and_post_only`)

    -   [POST / Cancel All After](/docs-v5/en/#order-book-trading-trade-post-cancel-all-after)\

-   Added new request parameters

    -   [First copy settings](/docs-v5/en/#order-book-trading-copy-trading-post-first-copy-settings)
    -   [Amend copy settings](/docs-v5/en/#order-book-trading-copy-trading-post-amend-copy-settings)

  ----------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------------
  tag               String            No                Order tag\
                                                        A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 16 characters.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------

-   The copy trading endpoints below are open.
    -   [First copy settings](/docs-v5/en/#order-book-trading-copy-trading-post-first-copy-settings)
    -   [Amend copy settings](/docs-v5/en/#order-book-trading-copy-trading-post-amend-copy-settings)
    -   [Stop copying](/docs-v5/en/#order-book-trading-copy-trading-post-stop-copying)
    -   [Copy settings](/docs-v5/en/#order-book-trading-copy-trading-get-copy-settings)
    -   [My lead traders](/docs-v5/en/#order-book-trading-copy-trading-get-my-lead-traders)

## Websocket disconnect notification for service upgrade 

To enhance the API service, WebSocket has introduced a new message type (event = `notice`). 30 seconds prior to the upgrade of the WebSocket service, the following message will be sent to users indicating that the connection will soon be disconnected. Users are encouraged to establish a new connection to prevent any disruptions caused by disconnection.

Websocket push data example\
{\
  \"event\": \"notice\",\
  \"code\": \"64008\",\
  \"msg\": \"The connection will soon be closed for a service upgrade. Please reconnect.\",\
  \"connId\": \"a4d3ae55\"\
}\

The feature is supported by WebSocket Public (/ws/v5/public) and Private (/ws/v5/private).

# 2024-12-16 

-   Added new module

    -   [SOL staking](/docs-v5/en/#financial-product-sol-staking)

-   The copy trading function below is delisted.

    -   [Multiple leverages](/docs-v5/en/#order-book-trading-copy-trading-get-multiple-leverages)
    -   [Set Multiple leverages](/docs-v5/en/#order-book-trading-copy-trading-post-set-multiple-leverages)
    -   [My history lead traders](/docs-v5/en/#order-book-trading-copy-trading-get-my-history-lead-traders)
    -   [Existing lead or copy positions](/docs-v5/en/#order-book-trading-copy-trading-get-existing-lead-positions)
    -   [Lead or copy position history](/docs-v5/en/#order-book-trading-copy-trading-get-lead-position-history)
    -   [Place lead or copy stop order](/docs-v5/en/#order-book-trading-copy-trading-post-place-lead-stop-order)
    -   [Close lead or copy position](/docs-v5/en/#order-book-trading-copy-trading-post-close-lead-position)
    -   [Copy trading notification channel](/docs-v5/en/#order-book-trading-copy-trading-ws-copy-trading-notification-channel)\

-   The lead trading function below is delisted.

    -   [Apply for lead trading](/docs-v5/en/#order-book-trading-copy-trading-post-apply-for-lead-trading)
    -   [Stop lead trading](/docs-v5/en/#order-book-trading-copy-trading-post-stop-lead-trading)
    -   [Lead trader ranks (private)](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-ranks-private)
    -   [Lead trader weekly pnl (private)](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-weekly-pnl-private)
    -   [Lead trader daily pnl (private)](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-daily-pnl-private)
    -   [Lead trader stats (private)](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-stats-private)
    -   [Lead trader currency preferences (private)](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-currency-preferences-private)
    -   [Lead trader current lead positions (private)](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-current-lead-positions-private)
    -   [Lead trader lead position history (private)](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-lead-position-history-private)
    -   [Copy traders (private)](/docs-v5/en/#order-book-trading-copy-trading-get-copy-traders-private)

# 2024-12-11 

-   Added lmtPx request parameter to block trade create rfq endpoint.
    -   [Create RFQ](/docs-v5/en/#block-trading-rest-api-create-rfq)

**Request Parameters**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type               Required          Description
  ----------------- ------------------ ----------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  legs              Array of objects   Yes               An Array of objects containing each leg of the RFQ. Maximum 15 legs can be placed per request

  \> lmtPx          String             No                Taker expected price for the RFQ\
                                                         If provided, RFQ trade will be automatically executed if the price from the quote is better than or equal to the price specified until the RFQ is canceled or expired.\
                                                         This field has to be provided for all legs to have the RFQ automatically executed, or leave empty for all legs, otherwise request will be rejected.\
                                                         The auto execution side depends on the leg side of the RFQ.\
                                                         For `SPOT/MARGIN/FUTURES/SWAP`, lmtPx will be in unit of the quote ccy.\
                                                         For `OPTION`, lmtPx will be in unit of settle ccy.\
                                                         The field will not be disclosed to counterparties.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Delayed the block trade public trades update for 15 minutes. The affected endpoints are:

    -   [Get public multi-leg transactions of block trades](/docs-v5/en/#block-trading-rest-api-get-public-multi-leg-transactions-of-block-trades)
    -   [Get public single-leg transactions of block trades](/docs-v5/en/#block-trading-rest-api-get-public-single-leg-transactions-of-block-trades)
    -   [Public structure block trades channel](/docs-v5/en/#block-trading-websocket-public-channel-public-structure-block-trades-channel)
    -   [Public block trades channel](/docs-v5/en/#block-trading-websocket-public-channel-public-block-trades-channel)

-   Added fillPnl response parameter to nitro spread private trade endpoints.

    -   [Get trades (last 7 days)](/docs-v5/en/#spread-trading-rest-api-get-trades-last-7-days)
    -   [Trades channel](/docs-v5/en/#spread-trading-websocket-private-channel-trades-channel)

  Parameter    Type               Description
  ------------ ------------------ ------------------------------------------------------------------------------------------------------------------------------------
  legs         Array of objects   Legs of trade
  \> fillPnl   String             Last filled profit and loss, applicable to orders which have a trade and aim to close position. It always is 0 in other conditions

# 2024-12-04 

-   OKX added endpoints to support users to switch account modes while holding certain types of positions. If users plan to switch account modes while holding positions, they should first call the preset endpoint to conduct necessary settings, then call the precheck endpoint to get unmatched information, margin check, and other related information, and finally call the account mode switch endpoint to switch account modes.

    -   [Preset account mode switch](/docs-v5/en/#trading-account-rest-api-preset-account-mode-switch)
    -   [Precheck account mode switch](/docs-v5/en/#trading-account-rest-api-precheck-account-mode-switch)
    -   [Set account mode](/docs-v5/en/#trading-account-rest-api-set-account-mode)

-   Added error codes.

  **Error Code**   **Error Message**
  ---------------- -----------------------------------------------------------------------------------------------------------------------------
  59132            Unable to switch. Please close or cancel all open orders and refer to the pre-check endpoint to stop any incompatible bots.
  59133            Unable to switch due to insufficient assets for the chosen account mode.
  59134            Unable to switch. Refer to the pre-check endpoint and close any incompatible positions.
  59135            Unable to switch. Refer to the pre-check endpoint and adjust your trades from copy trading.
  59136            Unable to switch. Pre-set leverage for all cross margin contract positions then try again.
  59137            Lower leverage to {param0} or below for all cross margin contract positions and try again.
  59138            Unable to switch due to a position tier check failure.
  59139            Unable to switch due to a margin check failure.

# 2024-12-03 

-   Added new request parameter\
    -   [Get trades](/docs-v5/en/#block-trading-rest-api-get-trades)\

  --------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- --------------------------------------------
  isSuccessful      Boolean           No                Whether the trade is filled successfully.\
                                                        `true`: the default value. `false`.

  --------------------------------------------------------------------------------------------------

-   Added new request parameter\
    -   [Get trades](/docs-v5/en/#block-trading-rest-api-get-trades)\
    -   [Structure block trades channel](/docs-v5/en/#block-trading-websocket-private-channel-structure-block-trades-channel)\

  ------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ------------------------------------------
  \> isSuccessful         Boolean                 Whether the trade is filled successfully

  \> errorCode            String                  Error code for unsuccessful trades.\
                                                  It is \"\" for successful trade.
  ------------------------------------------------------------------------------------------

# 2024-11-28 

-   OKX adds new push data parameter seqId for nitro spread order book channls, `spread-bbo-tbt` and `sprd-books5`.

    -   [Order book channel](/docs-v5/en/#spread-trading-websocket-public-channel-order-book-channel)

-   Broker endpoint path revamp\
    Changing the URL prefix under [DMA Broker](/docs-v5/broker_en/#dma-broker) from \"/broker/nd\" to \"/broker/dma\".

# 2024-11-22 

-   Added new response parameters
    -   [Get currencies](/docs-v5/en/#funding-account-rest-api-get-currencies)

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------------------------------------------------------------------------------------
  ctAddr                  String                  Contract address

  depEstOpenTime          String                  Estimated opening time for deposit, Unix timestamp format in milliseconds, e.g. `1597026383085`

  wdEstOpenTime           String                  Estimated opening time for withdraw, Unix timestamp format in milliseconds, e.g. `1597026383085`

  minInternal             String                  The minimum `internal transfer` amount of currency in a single transaction\
                                                  No maximum `internal transfer` limit in a single transaction, subject to the withdrawal limit in the past 24 hours(`wdQuota`).
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2024-11-21 

## Fixed Loan and Simple Earn Fixed going offline 

As part of our ongoing endeavour to stay responsive to users\' demands, we will be upgrading our fixed-term Loan and Earn products. As such, we will be taking VIP Loan and Simple Earn Fixed offline to implement changes. This will not affect Simple Earn Flexible.\
Starting from 6:00 am UTC on November 21, 2024, new subscriptions will be disabled.\
[Announcements](/help/vip-loan-and-simple-earn-fixed-going-offline)

### Fixed Loan API adjustment 

-   Function restricted
    -   [Get fixed loan borrow limit](/docs-v5/en/#trading-account-rest-api-get-fixed-loan-borrow-limit)
    -   [Get fixed loan borrow quote](/docs-v5/en/#trading-account-rest-api-get-fixed-loan-borrow-quote)
    -   [Place fixed loan borrowing order](/docs-v5/en/#trading-account-rest-api-place-fixed-loan-borrowing-order)
    -   [Amend fixed loan borrowing order](/docs-v5/en/#trading-account-rest-api-amend-fixed-loan-borrowing-order)
    -   [Manual renew fixed loan borrowing order](/docs-v5/en/#trading-account-rest-api-manual-renew-fixed-loan-borrowing-order)

### Simple Earn Fixed API adjustment 

-   Function restricted

    -   [GET / Lending offers (public)](/docs-v5/en/#financial-product-simple-earn-fixed-get-lending-offers-public)
    -   [GET / Lending APY history (public)](/docs-v5/en/#financial-product-simple-earn-fixed-get-lending-volume-public)
    -   [GET / Lending volume (public)](/docs-v5/en/#financial-product-fixed-earn-get-lending-volume-public)
    -   [POST / Place lending order](/docs-v5/en/#financial-product-simple-earn-fixed-post-place-lending-order)

-   Adjusted request parameters

    -   [POST / Amend lending order](/docs-v5/en/#financial-product-simple-earn-fixed-post-amend-lending-order)

  -------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------------------------
  rate              String            No                ~~Lending APR~~\
                                                        The parameter is no longer supported

  autoRenewal       String            No                ~~Whether or not auto-renewal when the term is due~~\
                                                        The parameter is no longer supported
  -------------------------------------------------------------------------------------------------------------

# 2024-11-20 

-   Adjusted request parameters
    -   [Get the maximum loan of instrument](/docs-v5/en/#trading-account-rest-api-get-the-maximum-loan-of-instrument)

Before

  Parameter   Type     Required   Description
  ----------- -------- ---------- -----------------------------------------------------------------------------------------------------------
  instId      String   Yes        Single instrument or multiple instruments (no more than 5) separated with comma, e.g. `BTC-USDT,ETH-USDT`

After

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------------------------------------------------------------------------------------------
  instId            String            Conditional       Single instrument or multiple instruments (no more than 5) separated with comma, e.g. `BTC-USDT,ETH-USDT`

  ccy               String            Conditional       Currency\
                                                        Applicable to get Max loan of manual borrow for the currency in `Spot mode` (enabled borrowing)
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------

## Chase order 

Chase order has been launched.

-   Add new request parameter or enumeration.
    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)

  ------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------
  ordType           String            No                Order type\
                                                        `chase`: chase order, only applicable to FUTURES and SWAP.

  ------------------------------------------------------------------------------------------------------------------

**Chase order**

It will place a Post Only order immediately and amend it continuously\
Chase order and corresponding Post Only order can\'t be amended.

  -------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------------------------------------------------
  chaseType         String            No                Chase type.\
                                                        `distance`: distance from best bid/ask price, the default value.\
                                                        `ratio`: ratio.

  chaseVal          String            No                Chase value.\
                                                        It represents distance from best bid/ask price when `chaseType` is distance.\
                                                        For USDT-margined contract, the unit is USDT.\
                                                        For USDC-margined contract, the unit is USDC.\
                                                        For Crypto-margined contract, the unit is USD.\
                                                        It represents ratio when `chaseType` is ratio. 0.1 represents 10%.\
                                                        The default value is 0.

  maxChaseType      String            Conditional       Maximum chase type.\
                                                        `distance`: maximum distance from best bid/ask price\
                                                        `ratio`: the ratio.\
                                                        \
                                                        maxChaseTyep and maxChaseVal need to be used together or none of them.

  maxChaseVal       String            Conditional       Maximum chase value.\
                                                        It represents maximum distance when `maxChaseType` is distance.\
                                                        It represents ratio when `maxChaseType` is ratio. 0.1 represents 10%.

  reduceOnly        Boolean           No                Whether the order can only reduce the position size.\
                                                        Valid options: `true` or `false`. The default value is `false`.
  -------------------------------------------------------------------------------------------------------------------------------------

-   Add new response parameters.
    -   [Algo order details](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-details)
    -   [Algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)
    -   [Algo order history](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)
    -   [Algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)

  Parameter      Type     Description
  -------------- -------- --------------------------------------------------------
  chaseType      String   Chase type. Only applicable to `chase` order.
  chaseVal       String   Chase value. Only applicable to `chase` order.
  maxChaseType   String   Maximum chase type. Only applicable to `chase` order.
  maxChaseVal    String   Maximum chase value. Only applicable to `chase` order.

-   Add new request parameter numeration.
    -   [Algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)
    -   [Algo order history](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)

  ------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------
  ordType           String            No                Order type\
                                                        `chase`: chase order, only applicable to FUTURES and SWAP.

  ------------------------------------------------------------------------------------------------------------------

-   Add new response parameter numeration.
    -   [Order details](/docs-v5/en/#order-book-trading-trade-get-order-details)
    -   [Order List](/docs-v5/en/#order-book-trading-trade-get-order-list)
    -   [Order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)
    -   [Order history (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

  Parameter      Type     Description
  -------------- -------- ---------------------------------------------------------------------------------------------------------------------------------------------------
  source         String   `34`: The normal order triggered by the chase order.
  cancelSource   String   `42`: Your order was canceled because the difference between the initial and current best bid or ask prices reached the maximum chase difference.

# 2024-11-18 

-   Added new module

    -   [Flexible loan](/docs-v5/en/#financial-product-flexible-loan)

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ ------------------------------------------------------------------
  51750        200                The collateral cannot contain assets in the currency of the loan
  51751        200                Currency {ccy} does not support borrowing
  51752        200                Currency {ccy} does not support collateralization
  51753        200                The collateral does not include this asset
  51754        200                There is currently no debt, no need to increase collateral
  51755        200                Currency {ccy} operation is restricted
  51756        200                Exceeding the maximum redeemable quantity
  51757        200                The collateral amount should not be less than {minAmt}

# 2024-11-14 

-   Adjusted response parameters
    -   [Get currencies](/docs-v5/en/#funding-account-rest-api-get-currencies)

Before

  --------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------
  minFee                  String                  The minimum withdrawal fee for normal address\
                                                  Apply to `on-chain withdrawal`

  maxFee                  String                  The maximum withdrawal fee for normal address\
                                                  Apply to `on-chain withdrawal`

  minFeeForCtAddr         String                  The minimum withdrawal fee for contract address\
                                                  Apply to `on-chain withdrawal`

  maxFeeForCtAddr         String                  The maximum withdrawal fee for contract address\
                                                  Apply to `on-chain withdrawal`
  --------------------------------------------------------------------------------------------------

After

  ----------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------
  fee                     String                  The fixed withdrawal fee\
                                                  Apply to `on-chain withdrawal`

  minFee                  String                  ~~The minimum withdrawal fee for normal address\
                                                  Apply to `on-chain withdrawal`~~\
                                                  (Deprecated)

  maxFee                  String                  ~~The maximum withdrawal fee for normal address\
                                                  Apply to `on-chain withdrawal`~~\
                                                  (Deprecated)

  minFeeForCtAddr         String                  ~~The minimum withdrawal fee for contract address\
                                                  Apply to `on-chain withdrawal`~~\
                                                  (Deprecated)

  maxFeeForCtAddr         String                  ~~The maximum withdrawal fee for contract address\
                                                  Apply to `on-chain withdrawal`~~\
                                                  (Deprecated)
  ----------------------------------------------------------------------------------------------------

-   Added new endpoint
    -   [Get sub-account fee rates](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-sub-account-fee-rates)

# 2024-11-11 

-   OKX starts to support historical position data under the portfolio margin account mode. This function has been launched in production at **04:00 AM (UTC) on November 11, 2024**. After the function is launched, the newly created positions of users in the portfolio margin account mode will generate historical position records after closing; positions created before the launch of the function will not generate historical position records when closed after the launch.
    -   [Get positions history](/docs-v5/en/#trading-account-rest-api-get-positions-history)

# 2024-11-08 

-   Added response parameters
    -   [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)

  ---------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------------------------
  type                    String                  Account type\
                                                  `0`: Main account\
                                                  `1`: Standard sub-account\
                                                  `2`: Managed trading sub-account\
                                                  `5`: Custody trading sub-account - Copper\
                                                  `9`: Managed trading sub-account - Copper\
                                                  `12`: Custody trading sub-account - Komainu

  ---------------------------------------------------------------------------------------------

For the discount rate related fields delist, the discount rate related fields that are unnecessary was delisted. There is more detail below:\
\

Related change: [OKX to change discount rate rules in multi-currency and portfolio margin modes](/docs-v5/log_en/#2024-08-14-okx-to-change-discount-rate-rules-in-multi-currency-and-portfolio-margin-modes)

-   [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)

  ---------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------------------------
  type                    String                  Sub-account type\
                                                  `1`: Standard sub-account\
                                                  `2`: Managed trading sub-account\
                                                  `5`: Custody trading sub-account - Copper\
                                                  `9`: Managed trading sub-account - Copper\
                                                  `12`: Custody trading sub-account - Komainu

  ---------------------------------------------------------------------------------------------

-   [Get discount rate and interest-free quota](/docs-v5/en/#public-data-rest-api-get-estimated-delivery-exercise-price)

  Response Parameter   Type     Description
  -------------------- -------- -------------------------------------------------------------------------------------------------------
  discountInfo         Array    Original discount details. It will be removed once the adjustment of discount rate rules is completed
  \> discountRate      String   Discount rate
  \> maxAmt            String   Tier - upper bound, \"\" means positive infinity
  \> minAmt            String   Tier - lower bound, the minimum is 0

-   The limit is adjusted to 30 WebSocket connections per specific WebSocket channel per sub-account for certain channels.
    -   [Connection count limit](/docs-v5/en/#overview-websocket-connection-count-limit)

# 2024-10-28 

-   Added response parameters
    -   [GET / Offers](/docs-v5/en/#financial-product-on-chain-earn-get-offers)

  --------------------------------------------------------------------------------------------------------------
  Parameter                  Type                    Description
  -------------------------- ----------------------- -----------------------------------------------------------
  fastRedemptionDailyLimit   String                  Fast redemption daily limit\
                                                     If fast redemption is not supported, it will return \'\'.

  --------------------------------------------------------------------------------------------------------------

-   Added response parameters
    -   [GET / Active orders](/docs-v5/en/#financial-product-on-chain-earn-get-active-orders)

  Parameter            Type               Description
  -------------------- ------------------ ----------------------
  fastRedemptionData   Array of objects   Fast redemption data
  \> ccy               String             Currency, e.g. `BTC`
  \> redeemingAmt      String             Redeeming amount

-   Added new endpoints

    -   [GET / Product info](/docs-v5/en/#financial-product-eth-staking-get-product-info)

-   Added response parameters

    -   [GET / Purchase&Redeem history](/docs-v5/en/#financial-product-eth-staking-get-purchase-amp-redeem-history)

  Parameter      Type     Description
  -------------- -------- ------------------
  redeemingAmt   String   Redeeming amount

# 2024-10-23 

-   Add a new auctionEndTime response parameter to indicate the end time of call auctions. The `preopen` of state is introduced for certain symbol listing, and the listTime will be updated to reflect the listing time.
    -   [Get instruments (private)](/docs-v5/en/#trading-account-rest-api-get-instruments)
    -   [Get instruments (public)](/docs-v5/en/#public-data-rest-api-get-instruments)
    -   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)

  ---------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ---------------------------------------------------------------------------------------------
  auctionEndTime          String                  The end time of call auction, Unix timestamp format in milliseconds, e.g. `1597026383085`\
                                                  \
                                                  Only applicable to `SPOT` that are listed through call auctions, return \"\" in other cases

  ---------------------------------------------------------------------------------------------------------------------------------------------

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ------------------------------------------------------------------------------------------------------------------------------
  state                   String                  Instrument status\
                                                  `preopen` e.g. Futures and options contracts rollover from generation to trading start; certain symbols before they go live.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added response parameters:
    -   [Get balance](/docs-v5/en/#trading-account-rest-api-get-balance)
    -   [Get sub-account trading balance](/docs-v5/en/#sub-account-rest-api-get-sub-account-trading-balance)
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)

  -------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------
  \> spotCopyTradingEq    String                  Spot smart sync equity.\
                                                  The default is \"0\", only applicable to copy trader.

  -------------------------------------------------------------------------------------------------------

# 2024-10-17 

## Convert revamp 

### Convert 

Convert settlement has been adjusted from the fund account to the trading account.\
The source of funds for convert has been adjusted from available assets in the funding account to available assets in the trading account, and the assets converted will be credited to the trading account.

-   New added error code

  Error code   HTTP code   Error message
  ------------ ----------- ---------------------------------------------------
  52914        200         Insufficient available balance in trading account

-   According trading bills
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)

  -----------------------------------------------------------------------
  Parameters              Type                    Description
  ----------------------- ----------------------- -----------------------
  type                    String                  Bill type\
                                                  `27`: Convert\
                                                  `30`: Simple trade

  subType                 String                  Bill sub-type\
                                                  `318`: Convert in\
                                                  `319`: Convert out\
                                                  `320`: Simple buy\
                                                  `321`: Simple sell
  -----------------------------------------------------------------------

### Easy convert 

-   Added new request parameters
    -   [GET / Easy convert currency list](/docs-v5/en/#order-book-trading-trade-get-easy-convert-currency-list)
    -   [POST / Place easy convert](/docs-v5/en/#order-book-trading-trade-post-place-easy-convert)

  -----------------------------------------------------------------------------
  Parameters        Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------
  source            String            No                Funding source\
                                                        `1`: Trading account\
                                                        `2`: Funding account\
                                                        The default is `1`.

  -----------------------------------------------------------------------------

-   According trading bills
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)

  -------------------------------------------------------------------------
  Parameters              Type                    Description
  ----------------------- ----------------------- -------------------------
  type                    String                  Bill type\
                                                  `28`: Easy convert

  subType                 String                  Bill sub-type\
                                                  `236`: Easy convert in\
                                                  `237`: Easy convert out
  -------------------------------------------------------------------------

### One-click repay 

-   According trading bills
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)

  ----------------------------------------------------------------------------
  Parameters              Type                    Description
  ----------------------- ----------------------- ----------------------------
  type                    String                  Bill type\
                                                  `29`: One-click repay

  subType                 String                  Bill sub-type\
                                                  `224`：One-click repay in\
                                                  `225`：One-click repay out
  ----------------------------------------------------------------------------

### Small assets convert 

The API has offline, and it is recommended to use \"Easy convert\".

-   API offline
    -   [Small assets convert](/docs-v5/en/#funding-account-rest-api-small-assets-convert)

# 2024-10-15 

-   Added new response parameters
    -   [Get fixed loan borrow limit](/docs-v5/en/#trading-account-rest-api-get-fixed-loan-borrow-limit)

  Parameter   Type     Description
  ----------- -------- -------------------------------------
  \> term     String   Borrowing term, e.g. `30D`: 30 Days

-   Added new request parameters
    -   [Get fixed loan borrow order list](/docs-v5/en/#trading-account-rest-api-get-fixed-loan-borrow-order-list)

  **Parameters**   **Types**   **Required**   **Description**
  ---------------- ----------- -------------- -------------------------------------
  term             String      No             Borrowing term, e.g. `30D`: 30 Days

-   Added enumeration for parameter
    -   [Get sub-account list](/docs-v5/en/#sub-account-rest-api-get-sub-account-list)

  ---------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------------------------
  type                    String                  Sub-account type\
                                                  `9`: Managed trading sub-account - Copper\
                                                  `12`: Custody trading sub-account - Komainu

  ---------------------------------------------------------------------------------------------

# 2024-10-14 

API supported borrow in spot mode\
More details refer to: https://www.okx.com/help/borrow-in-spot-mode

-   Added new endpoints

    -   [Manual borrow / repay](/docs-v5/en/#trading-account-rest-api-manual-borrow-repay)
    -   [Set auto repay](/docs-v5/en/#trading-account-rest-api-set-auto-repay)
    -   [Get borrow/repay history](/docs-v5/en/#trading-account-rest-api-get-borrow-repay-history)

-   Added new request parameters

    -   [Get leverage](/docs-v5/en/#trading-account-rest-api-increase-decrease-margin)

  --------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- --------------------------------------------------------------------------------------------
  ccy               String            Conditional       Currency，used for getting leverage of currency level.\
                                                        Applicable to `cross` `MARGIN` of `Spot mode`/`Multi-currency margin`/`Portfolio margin`.\
                                                        Supported single currency or multiple currencies (no more than 20) separated with comma.

  --------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new bill subtypes for trading account
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)

  -----------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------
  subType                 String                  Bill subtype\
                                                  `306`: Manual borrow\
                                                  `307`: Auto borrow\
                                                  `308`: Manual repay\
                                                  `309`: Auto repay\
                                                  `312`: Auto offset

  -----------------------------------------------------------------------

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ ------------------------------------------------------------------------------------
  59410        200                You can only borrow this crypto if it supports borrowing and borrowing is enabled.
  59411        200                Manual borrowing failed. Your account\'s free margin is insufficient.
  59412        200                Manual borrowing failed. The amount exceeds your borrowing limit.
  59413        200                You didn\'t borrow this crypto. No repayment needed.
  59414        200                Manual borrowing failed. The minimum borrowing limit is {param0}.

# 2024-10-10 

-   Added new response parameters
    -   [Get currencies](/docs-v5/en/#funding-account-rest-api-get-currencies)

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------
  burningFeeRate          String                  Burning fee rate, e.g \"0.05\" represents \"5%\".\
                                                  Some currencies may charge combustion fees. The burning fee is deducted based on the withdrawal quantity (excluding gas fee) multiplied by the burning fee rate.\
                                                  Apply to `on-chain withdrawal`

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameters
    -   [Get non-tradable assets](/docs-v5/en/#funding-account-rest-api-get-non-tradable-assets)

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  burningFeeRate          String                  Burning fee rate, e.g \"0.05\" represents \"5%\".\
                                                  Some currencies may charge combustion fees. The burning fee is deducted based on the withdrawal quantity (excluding gas fee) multiplied by the burning fee rate.

  feeCcy                  String                  Fixed withdrawal fee unit
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Nitro spread supports market orders, the request and response parameter ordType adds the enumeration value `market`.

    -   [Place order](/docs-v5/en/#spread-trading-rest-api-place-order)
    -   [Get order details](/docs-v5/en/#spread-trading-rest-api-get-order-details)
    -   [Get active orders](/docs-v5/en/#spread-trading-rest-api-get-active-orders)
    -   [Get orders (last 21 days)](/docs-v5/en/#spread-trading-rest-api-get-orders-last-21-days)
    -   [Get orders history (last 3 months)](/docs-v5/en/#spread-trading-rest-api-get-orders-history-last-3-months)
    -   [WS / Place order](/docs-v5/en/#spread-trading-websocket-trade-api-ws-place-order)
    -   [Order channel](/docs-v5/en/#spread-trading-websocket-private-channel-order-channel)

-   Nitro spread adds a new order cancellation scenario, the cancelSource response parameter adds the enumeration value `15`: Order canceled: The order price is beyond the limit.

    -   [Get order details](/docs-v5/en/#spread-trading-rest-api-get-order-details)
    -   [Get active orders](/docs-v5/en/#spread-trading-rest-api-get-active-orders)
    -   [Get orders (last 21 days)](/docs-v5/en/#spread-trading-rest-api-get-orders-last-21-days)
    -   [Get orders history (last 3 months)](/docs-v5/en/#spread-trading-rest-api-get-orders-history-last-3-months)
    -   [Order channel](/docs-v5/en/#spread-trading-websocket-private-channel-order-channel)

# 2024-10-04 

-   Added call auction details WebSocket channel
    -   [WS / Call auction details channel](/docs-v5/en/#order-book-trading-market-data-ws-call-auction-details-channel)

# 2024-10-01 

-   Added public feature for endpoint:
    -   [GET / Announcements](/docs-v5/en/#announcement-get-announcements)

# 2024-09-20 

-   Added new endpoints

    -   [Convert fixed loan to market loan](/docs-v5/en/#trading-account-rest-api-convert-fixed-loan-to-market-loan)
    -   [Reduce liabilities for fixed loan](/docs-v5/en/#trading-account-rest-api-reduce-liabilities-for-fixed-loan)

-   Added enumeration for parameter

    -   [Get fixed loan borrow order list](/docs-v5/en/#trading-account-rest-api-get-fixed-loan-borrow-order-list)

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  state                   String                  State\
                                                  `8`: Pending repay (more details refer to [Reduce liabilities for fixed loan](/docs-v5/en/#trading-account-rest-api-reduce-liabilities-for-fixed-loan))

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added enumeration for response parameter `adlType`. For more information, please refer to the product documentation. [Introduction to Auto-deleveraging (ADL)](https://www.okx.com/help/iv-introduction-to-auto-deleveraging-adl).
    -   [Get security fund](/docs-v5/en/#public-data-rest-api-get-insurance-fund)
    -   [ADL warning channel](/docs-v5/en/#public-data-websocket-adl-warning-channel)

  **Parameter**   **Type**   **Description**
  --------------- ---------- -------------------------------------------------------------------------------------------------------------------------------------
  adlType         String     `pos_adl_start`：ADL begins due to the volume of liquidation orders falls to a certain level (only applicable to premarket symbols)

# 2024-09-19 

-   Added new response parameters
    -   [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)

  ------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ------------------------------------------------------
  enableSpotBorrow        Boolean                 Whether borrow is allowed or not in `Spot mode`\
                                                  `true`: Enabled\
                                                  `false`: Disabled

  spotBorrowAutoRepay     Boolean                 Whether auto-repay is allowed or not in `Spot mode`\
                                                  `true`: Enabled\
                                                  `false`: Disabled
  ------------------------------------------------------------------------------------------------------

-   Added new response parameters
    -   [Get leverage](/docs-v5/en/#trading-account-rest-api-increase-decrease-margin)

  **Parameter**   **Type**   **Description**
  --------------- ---------- -----------------
  ccy             String     Currency

-   Add response parameters
    -   [Get discount rate and interest-free quota](/docs-v5/en/#public-data-rest-api-get-estimated-delivery-exercise-price)

  Parameter   Type     Description
  ----------- -------- ---------------------------------------------------------------------------------
  disCcyEq    String   Discount equity in currency for quick calculation if your equity is the`maxAmt`

-   Add request parameters
    -   [Mass Cancel Order channel](/docs-v5/en/#order-book-trading-trade-ws-mass-cancel-order)\
    -   [Mass Cancel Order](/docs-v5/en/#order-book-trading-trade-post-mass-cancel-order)\

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------------------------------------------------
  lockInterval      String            No                Lock interval(ms)\
                                                        The range should be \[0, 10 000\]\
                                                        The default is 0. You can set it as \"0\" if you want to unlock it immediately.\
                                                        Error 54008 will be returned when placing order during lock interval, it is different from 51034 which is thrown when MMP is triggered

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Add new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ ---------------------------------------------------------------------------------------------------------
  54008        200                This operation is disabled by the \'mass cancel order\' endpoint. Please enable it using this endpoint.
  54009        200                The range of {param0} should be \[{param1}, {param2}\].

-   Added new response parameters\
    -   [Algo order details](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-details)
    -   [Algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)
    -   [Algo order history](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)
    -   [Algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)
    -   [Advance algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-advance-algo-orders-channel)

  -----------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------
  isTradeBorrowMode       String                  Whether borrowing currency automatically\
                                                  true\
                                                  false\
                                                  Only applicable to `trigger order`, `trailing order` and `twap order`

  -----------------------------------------------------------------------------------------------------------------------

-   Transaction details (last 2 years) endpoints below was delisted
    -   [POST / Transaction details (in the past 2 years)](/docs-v5/en/#order-book-trading-trade-post-transaction-details-in-the-past-2-years)
    -   [GET / Transaction details (in the past 2 years)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-in-the-past-2-years)

# 2024-09-18 

-   Added new endpoints:
    -   [GET / Announcements](/docs-v5/en/#announcement-get-announcements)
    -   [GET / Announcement types](/docs-v5/en/#announcement-get-announcement-types)

# 2024-09-13 

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ ---------------------------------------------------------------------------------------------------------------------------------------------------
  54011        200                Pre-market trading contracts are only allowed to reduce the number of positions within 1 hour before delivery. Please modify or cancel the order.

-   Added new response parameter for rfq public-trades endpoint to get the name of the strategy.
    -   [GET public-trades](/docs-v5/en/#block-trading-rest-api-get-public-structure-block-trades)

**Response Parameters**

  Parameter   Type     Description
  ----------- -------- ----------------------------------------------
  strategy    String   Option strategy, e.g. `CALL_CALENDAR_SPREAD`

# 2024-08-29 

-   Trade fee endpoint adds ruleType request and response parameters to distinguish trade fee rates of different trade rule types.
    -   [Get fee rates](/docs-v5/en/#trading-account-rest-api-get-fee-rates)

**Request Parameters**

  ------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------
  ruleType          String            Yes               Trading rule types\
                                                        `normal`: normal trading\
                                                        `pre_market`: pre-market trading\
                                                        ruleType can not be passed through together with instId/instFamily/uly

  ------------------------------------------------------------------------------------------------------------------------------

**Response Parameters**

  ----------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------
  ruleType                String                  Trading rule types\
                                                  `normal`: normal trading\
                                                  `pre_market`: pre-market trading

  ----------------------------------------------------------------------------------

-   Added new response parameter for get open interest endpoint.
    -   [Get open interest](/docs-v5/en/#public-data-rest-api-get-open-interest)

**Response Parameters**

  Parameter   Type     Description
  ----------- -------- ---------------------
  oiUsd       String   Open interest (USD)

# 2024-08-28 

-   Added response parameters:
    -   [Get balance](/docs-v5/en/#trading-account-rest-api-get-balance)
    -   [Get sub-account trading balance](/docs-v5/en/#sub-account-rest-api-get-sub-account-trading-balance)
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)

  Parameter          Type     Description
  ------------------ -------- --------------------------------------------------------------------------------------------------------------------
  \> spotBal         String   Spot balance. The unit is currency, e.g. BTC. [More details](https://www.okx.com/help/i-introduction-of-spot)
  \> openAvgPx       String   Spot average cost price. The unit is USD. [More details](https://www.okx.com/help/i-introduction-of-spot)
  \> accAvgPx        String   Spot accumulated cost price. The unit is USD. [More details](https://www.okx.com/help/i-introduction-of-spot)
  \> spotUpl         String   Spot unrealized profit and loss. The unit is USD. [More details](https://www.okx.com/help/i-introduction-of-spot)
  \> spotUplRatio    String   Spot unrealized profit and loss ratio. [More details](https://www.okx.com/help/i-introduction-of-spot)
  \> totalPnl        String   Spot accumulated profit and loss. The unit is USD. [More details](https://www.okx.com/help/i-introduction-of-spot)
  \> totalPnlRatio   String   Spot accumulated profit and loss ratio. [More details](https://www.okx.com/help/i-introduction-of-spot)

-   Added new endpoint
    -   [GET / Max grid quantity (public)](/docs-v5/en/#order-book-trading-grid-trading-get-max-grid-quantity-public)

# 2024-08-22 

-   Nitro spread private trade endpoints added a new response parameter szCont, presenting the filled contract amount of a single leg.
    -   [Get trades (last 7 days)](/docs-v5/en/#spread-trading-rest-api-get-trades-last-7-days)
    -   [Trades channel](/docs-v5/en/#spread-trading-websocket-private-channel-trades-channel)

  ----------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------
  legs                    Array of objects        Legs of trade

  \> szCont               String                  Filled amount of the contract\
                                                  Only applicable to contracts, return \"\" for spot
  ----------------------------------------------------------------------------------------------------

-   To better use experience, regarding the endpoints/channels related to the account, information on crypto with a balance less than 1e-8 has been included in \"details\"
    -   [Get balance](/docs-v5/en/#trading-account-rest-api-get-balance)
    -   [Get sub-account trading balance](/docs-v5/en/#sub-account-rest-api-get-sub-account-trading-balance)
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)
    -   [Balance and positions channel](/docs-v5/en/#trading-account-websocket-balance-and-position-channel)
    -   [Get account and position risk](/docs-v5/en/#trading-account-rest-api-get-account-and-position-risk)

# 2024-08-21 

-   Added call auction details endpoint

    -   [GET / Call auction details](/docs-v5/en/#order-book-trading-market-data-get-call-auction-details)

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ ---------------------------------
  51505        200                {instId} is not in call auction

-   Added new order book channel for Nitro Spread `sprd-books-l2-tbt`. 400 depth levels will be pushed in the initial full snapshot. Incremental data will be pushed every 10 ms for the changes in the order book during that period of time. When subscribing to this channel, the following parameters are added to the push data: action, checksum, prevSeqId, and seqId
    -   [Order book channel](/docs-v5/en/#spread-trading-websocket-public-channel-order-book-channel)

  -----------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------------------
  action                  String                  Push data action, incremental data or full snapshot.\
                                                  `snapshot`: full\
                                                  `update`: incremental

  data                    Array of objects        Subscribed data

  \> checksum             Integer                 Checksum, implementation details below. Only applicable to `sprd-books-l2-tbt`.

  \> prevSeqId            Integer                 Sequence ID of the last sent message. Only applicable to `sprd-books-l2-tbt`.

  \> seqId                Integer                 Sequence ID of the current message, implementation details below. Only applicable to `sprd-books-l2-tbt`.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------

# 2024-08-14 

## Added fills channel 

-   [WS / Fills channel](/docs-v5/en/#order-book-trading-trade-ws-fills-channel)

## OKX to change discount rate rules in multi-currency and portfolio margin modes 

OKX will change the discount rate rules in phases. For details, please refer to [OKX to change discount rate rules in multi-currency and portfolio margin modes](/help/okx-to-change-discount-rate-rules-in-multi-currency-and-portfolio-margin) .

The changes on API have been released in the demo trading environment and will go live in production in mid August. To avoid any impact on your trading strategies, please refer to the content below for necessary adjustments.

-   As the feature is deployed in phases, you can find out the discount rule type of the current account by response parameter `discountType` from [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration):

    -   When `discountType` is 0, it represents that you are under the original discount rate rules, which are related to Array discountInfo from [Get discount rate and interest-free quota](/docs-v5/en/#public-data-rest-api-get-discount-rate-and-interest-free-quota);
    -   When `discountType` is 1, it represents that you are under the new discount rate rules, which are related to Array details from [Get discount rate and interest-free quota](/docs-v5/en/#public-data-rest-api-get-discount-rate-and-interest-free-quota);

-   Add new response parameter. After new discount rate rules are effective completely, this parameter will be removed from the endpoint. Advice you to prepare in advance.

    -   [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)

  -------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------
  discountType            String                  Discount rule type for current account\
                                                  `0`: Original discount rate rules, the default value\
                                                  `1`: New discount rules

  -------------------------------------------------------------------------------------------------------

-   [Get discount rate and interest-free quota](/docs-v5/en/#public-data-rest-api-get-discount-rate-and-interest-free-quota) parameter adjustments.
    -   Besides the responses of the original discount details (Array discountInfo), New discount details (Array details) will be added;
    -   `discountLv` will be , advise you don\'t use it anymore;
    -   After new discount rate rules are effective completely, the original discount details (Array discountInfo) will be removed from the endpoint. Advice you to prepare in advance.

Before:

  Request Parameter   Type     Required   Description
  ------------------- -------- ---------- ----------------
  discountLv          String   No         Discount level

  Response Parameter   Type               Description
  -------------------- ------------------ --------------------------------------------------
  discountLv           String             Discount rate level.
  discountInfo         Array of objects   Discount details.
  \> discountRate      String             Discount rate
  \> maxAmt            String             Tier - upper bound, \"\" means positive infinity
  \> minAmt            String             Tier - lower bound, the minimum is 0

After:

  Request Parameter   Type     Required   Description
  ------------------- -------- ---------- -----------------------------
  discountLv          String   No         Discount level (Deprecated)

  Response Parameter   Type               Description
  -------------------- ------------------ -------------------------------------------------------------------------------------------------------
  discountLv           String             Discount rate level. It will be Deprecated
  discountInfo         Array of objects   Original discount details. It will be removed once the adjustment of discount rate rules is completed
  \> discountRate      String             Discount rate
  \> maxAmt            String             Tier - upper bound, \"\" means positive infinity
  \> minAmt            String             Tier - lower bound, the minimum is 0
  minDiscountRate      String             Minimum discount rate when it exceeds the maximum amount of the last tier.
  details              Array of objects   New discount details.
  \> discountRate      String             Discount rate
  \> maxAmt            String             Tier - upper bound, \"\" means positive infinity
  \> minAmt            String             Tier - lower bound, the minimum is 0
  \> tier              String             Tiers
  \> liqPenaltyRate    String             Liquidation penalty rate

## Added endpoints 

-   Bills details (since 2021) endpoints below have been released in production
    -   [Apply bills details (since 2021)](/docs-v5/en/#trading-account-rest-api-apply-bills-details-since-2021)
    -   [Get bills details (since 2021)](/docs-v5/en/#trading-account-rest-api-get-bills-details-since-2021)

## Added request fields 

\* [Amend algo order](/docs-v5/en/#order-book-trading-algo-trading-post-amend-algo-order)

  --------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type               Required          Description
  ----------------------- ------------------ ----------------- -------------------------------------------------------------------------------------------
  newTriggerPx            String             Yes               New trigger price after amendment

  newOrdPx                String             Yes               New order price after amendment\
                                                               If the price is `-1`, the order will be executed at the market price.

  newTriggerPxType        String             No                New trigger price type after amendment\
                                                               `last`: last price\
                                                               `index`: index price\
                                                               `mark`: mark price\
                                                               The default is `last`

  attachAlgoOrds          Array of objects   No                Attached SL/TP orders info\
                                                               Applicable to `Futures mode/Multi-currency margin/Portfolio margin`

  \> newTpTriggerPx       String             No                Take-profit trigger price\
                                                               If you fill in this parameter, you should fill in the take-profit order price as well.

  \> newTpTriggerPxType   String             No                Take-profit trigger price type\
                                                               `last`: last price\
                                                               `index`: index price\
                                                               `mark`: mark price\
                                                               The default is `last`

  \> newTpOrdPx           String             No                Take-profit order price\
                                                               If you fill in this parameter, you should fill in the take-profit trigger price as well.\
                                                               If the price is `-1`, take-profit will be executed at the market price.

  \> newSlTriggerPx       String             No                Stop-loss trigger price\
                                                               If you fill in this parameter, you should fill in the stop-loss order price.

  \> newSlTriggerPxType   String             No                Stop-loss trigger price type\
                                                               `last`: last price\
                                                               `index`: index price\
                                                               `mark`: mark price\
                                                               The default is `last`

  \> newSlOrdPx           String             No                Stop-loss order price\
                                                               If you fill in this parameter, you should fill in the stop-loss trigger price.\
                                                               If the price is `-1`, stop-loss will be executed at the market price.
  --------------------------------------------------------------------------------------------------------------------------------------------------------

# 2024-08-08 

## Withdrawal API adjustment for Bahamas entity users 

Due to compliance requirements, Bahamas entity users need to pass in the field `rcvrInfo` when making on-chain/lightning withdrawal.\

(User entity information reference: <https://www.okx.com/help/terms-of-service> )\

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameters                  Type              Required          Description
  --------------------------- ----------------- ----------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  rcvrInfo                    Object            Conditional       Recipient information\
                                                                  For the specific entity users to do on-chain withdrawal/lightning withdrawal, this information is required.

  \> walletType               String            Yes               Wallet Type\
                                                                  `exchange`: Withdraw to exchange wallet\
                                                                  `private`: Withdraw to private wallet\
                                                                  If withdrawal to the exchange wallet, relevant information about the recipient must be provided.\
                                                                  For the exchange wallet belongs to business recipient, `rcvrFirstName` may input the company name, `rcvrLastName` may input \"N/A\", location info may input the registered address of the company.\
                                                                  Withdrawal to a private wallet does not require providing recipient information.

  \> exchId                   String            Conditional       Exchange ID\
                                                                  You can query supported exchanges through the endpoint of [Get exchange list (public)](/docs-v5/en/#funding-account-rest-api-get-exchange-list-public)\
                                                                  If the exchange is not in the exchange list, fill in \'0\' in this field.

  \> rcvrFirstName            String            Conditional       Receiver\'s first name, e.g. `Bruce`

  \> rcvrLastName             String            Conditional       Receiver\'s last name, e.g. `Wayne`

  \> rcvrCountry              String            Conditional       The recipient\'s country, e.g. `United States`

  \> rcvrCountrySubDivision   String            Conditional       State/Province of the recipient, e.g. `California`

  \> rcvrTownName             String            Conditional       The town/city where the recipient is located, e.g. `San Jose`

  \> rcvrStreetName           String            Conditional       Recipient\'s street address, e.g. `Clementi Avenue 1`
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Withdraw assets to the exchange wallet 

If users withdraw assets to the exchange wallet, they need to provide recipient information.

-   Users under the Bahamas entity need to pass in the following field information of the recipient (rcvrFirstName, rcvrLastName, rcvrCountry, rcvrCountrySubDivision, rcvrTownName, rcvrStreetName). For the exchange wallet belongs to business recipient, `rcvrFirstName` may input the company name, `rcvrLastName` may input \"N/A\", location info may input the registered address of the company. The examples are as follows:

on-chain withdrawal to the exchange wallet\
POST /api/v5/asset/withdrawal\
body\
{\
   \"amt\":\"1\",\
   \"fee\":\"0.0005\",\
   \"dest\":\"4\",\
   \"ccy\":\"BTC\",\
   \"chain\":\"BTC-Bitcoin\",\
   \"toAddr\":\"17DKe3kkkkiiiiTvAKKi2vMPbm1Bz3CMKw\",\
   \"rcvrInfo\":{\
     \"walletType\":\"exchange\",\
     \"exchId\":\"did:ethr:0xfeb4f99829a9acdf52979abee87e83addf22a7e1\",\
     \"rcvrFirstName\":\"Bruce\",\
     \"rcvrLastName\":\"Wayne\",\
     \"rcvrCountry\":\"United States\",\
     \"rcvrCountrySubDivision\":\"California\",\
     \"rcvrTownName\":\"San Jose\",\
     \"rcvrStreetName\":\"Clementi Avenue 1\"\
   }\
}\

lightning withdrawal to the exchange wallet\
POST /api/v5/asset/withdrawal-lightning\
body\
{\
  \"invoice\":\"lnbc100u1psnnvhtpp5yq2x3q5hhrzsuxpwx7ptphwzc4k4wk0j3stp0099968m44cyjg9sdqqcqzpgxqzjcsp5hz\",\
   \"ccy\":\"BTC\",\
   \"rcvrInfo\":{\
     \"walletType\":\"exchange\",\
     \"exchId\":\"did:ethr:0xfeb4f99829a9acdf52979abee87e83addf22a7e1\",\
     \"rcvrFirstName\":\"Bruce\",\
     \"rcvrLastName\":\"Wayne\",\
     \"rcvrCountry\":\"United States\",\
     \"rcvrCountrySubDivision\":\"California\",\
     \"rcvrTownName\":\"San Jose\",\
     \"rcvrStreetName\":\"Clementi Avenue 1\"\
   }\
}\

### Withdraw assets to the private wallet 

If users withdraw assets to the private wallet, there is no need to provide recipient information. The examples are as follows:

on-chain withdrawal to the private wallet\
POST /api/v5/asset/withdrawal\
body\
{\
   \"amt\":\"1\",\
   \"fee\":\"0.0005\",\
   \"dest\":\"4\",\
   \"ccy\":\"BTC\",\
   \"chain\":\"BTC-Bitcoin\",\
   \"toAddr\":\"17DKe3kkkkiiiiTvAKKi2vMPbm1Bz3CMKw\",\
   \"rcvrInfo\":{\
     \"walletType\":\"private\"\
   }\
}\

lightning withdrawal to the private wallet\
POST /api/v5/asset/withdrawal-lightning\
body\
{\
  \"invoice\":\"lnbc100u1psnnvhtpp5yq2x3q5hhrzsuxpwx7ptphwzc4k4wk0j3stp0099968m44cyjg9sdqqcqzpgxqzjcsp5hz\",\
   \"ccy\":\"BTC\",\
   \"rcvrInfo\":{\
     \"walletType\":\"private\"\
   }\
}\

### Newly added error code 

If Bahamas entity users do not pass in the new parameter `rcvrInfo`, the following error code will be returned.

  Error code   Error Message                                                                                                                                                                                                                      Example
  ------------ ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  58237        According to local laws and regulations, please provide accurate recipient information (rcvrInfo). For the exchange address, please also provide exchange information and recipient identity information ({consientParameters}).   According to local laws and regulations, please provide accurate recipient information (rcvrInfo). For exchange address, please also provide exchange information and recipient identity information (rcvrFirstName, rcvrLastName, rcvrCountry, rcvrCountrySubDivision, rcvrTownName, rcvrStreetName).

# 2024-08-01 

-   Add posSide response parameter in the historical positions endpoint, indicating the position mode side.
    -   [Get positions history](/docs-v5/en/#trading-account-rest-api-get-positions-history)

  ----------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------
  posSide                 String                  Position mode side\
                                                  `long`: Hedge mode long\
                                                  `short`: Hedge mode short\
                                                  `net`: Net mode

  ----------------------------------------------------------------------------

-   Added new endpoint
    -   [POST / Order precheck](/docs-v5/en/#order-book-trading-trade-post-order-precheck)

# 2024-07-23 

-   Added ruleType response parameter for instrument endpoints, indicating the trading rule types.
    -   [Get instruments (private)](/docs-v5/en/#trading-account-rest-api-get-instruments)
    -   [Get instruments (public)](/docs-v5/en/#public-data-rest-api-get-instruments)
    -   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)

  ----------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------
  ruleType                String                  Trading rule types\
                                                  `normal`: normal trading\
                                                  `pre_market`: pre-market trading

  ----------------------------------------------------------------------------------

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ --------------------------------------------------------------------
  54005        200                Switch to isolated margin mode to trade pre-market expiry futures.
  54006        200                Pre-market expiry future position limit is {posLimit} contracts.
  54007        200                Instrument {instId} is not supported

# 2024-07-17 

-   Added subscription restriction for order book channel. After the adjustment, within the same connection, users will not be able to simultaneously subscribe to `books-l2-tbt` and `books50-l2-tbt/books` channels for the same trading symbol.
    -   [WS / Order book channel](/docs-v5/en/#order-book-trading-market-data-ws-order-book-channel)

If a user has already subscribed to the `books-l2-tbt` order book channel for a specific trading symbol within the same connection and then decides to subscribe to the `books50-l2-tbt/books` channels, we will retain the user\'s `books-l2-tbt` subscription since it provides more depth of the order book and is prioritized in the push sequence. An error code 64004 will be returned for the new subscription. An example is provided below.

  --------------------------------------- -------------------------------------------------------------------------------------------------------------------------
  **Request**                             **Response**

  {\                                      {\
      \"op\": \"subscribe\",\                 \"event\":\"subscribe\",\
      \"args\": \[\                           \"arg\":{\
          {\                                     \"channel\":\"books\",\
              \"channel\": \"books\",\           \"instId\":\"BTC-USDT\"\
              \"instId\": \"BTC-USDT\"\       },\
          }\                                  \"connId\":\"a4d3ae55\"\
      \]\                                  }\
  }                                       \
                                          {\
                                              \"event\":\"error\",\
                                              \"code\":\"64004\",\
                                              \"msg\":\"Subscribe to both books and books-l2-tbt for BTC-USDT is not allowed. Unsubscribe books-l2-tbt first.\",\
                                              \"connId\":\"a4d3ae55\"\
                                           } 
  --------------------------------------- -------------------------------------------------------------------------------------------------------------------------

\
If a user has already subscribed to the `books50-l2-tbt/books` order book channels for a specific trading symbol within the same connection and then decides to subscribe to the `books-l2-tbt` channel, we will make new subscriptions to the `books-l2-tbt` channel and then cancel the user\'s existing `books50-l2-tbt/books` subscriptions. This is also because the `books-l2-tbt` channel provides more depth and is prioritized in the push sequence.

Note that the unsubscription process may have a delay of a few seconds, meaning the user might continue to receive messages from the old channels for a few seconds after successfully subscribing to the new channel.

  --------------------------------------------- -----------------------------------------
  **Request**                                   **Response**

  {\                                            {\
      \"op\": \"subscribe\",\                       \"event\":\"subscribe\",\
      \"args\": \[\                                 \"arg\":{\
          {\                                           \"channel\":\"books-l2-tbt\",\
              \"channel\": \"books-l2-tbt\",\          \"instId\":\"BTC-USDT\"\
              \"instId\": \"BTC-USDT\"\             },\
          }\                                        \"connId\":\"a4d3ae55\"\
      \]\                                        }\
  }                                              \
                                                 {\
                                                    \"event\":\"unsubscribe\",\
                                                    \"arg\":{\
                                                       \"channel\":\"books50-l2-tbt\",\
                                                       \"instId\":\"BTC-USDT\"\
                                                    },\
                                                    \"connId\":\"a4d3ae55\"\
                                                 }\
                                                 \
                                                 {\
                                                    \"event\":\"unsubscribe\",\
                                                    \"arg\":{\
                                                       \"channel\":\"books\",\
                                                       \"instId\":\"BTC-USDT\"\
                                                    },\
                                                    \"connId\":\"a4d3ae55\"\
                                                 }
  --------------------------------------------- -----------------------------------------

-   Added new error code

  Error code   Error Message
  ------------ ---------------------------------------------------------------------------------------------------------------
  64004        Subscribe to both {channelName} and books-l2-tbt for {instId} is not allowed. Unsubscribe books-l2-tbt first.

-   Added new request parameter instId for bills endpoints
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)

  Parameter   Type     Required   Description
  ----------- -------- ---------- ---------------
  instId      String   No         Instrument ID

-   Added new error code

  Error code   Error Message
  ------------ ---------------------------------------------------------------------------------------------------------------
  64004        Subscribe to both {channelName} and books-l2-tbt for {instId} is not allowed. Unsubscribe books-l2-tbt first.

-   Added new error code. For batch placement and batch amendation under portfolio margin mode, the order will get the error 54004 if its failure caused by another order\'s failure.

    -   [POST / Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
    -   [POST / Amend multiple orders](/docs-v5/en/#order-book-trading-trade-post-amend-multiple-orders)
    -   [WS / Place multiple orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)
    -   [WS / Amend multiple orders](/docs-v5/en/#order-book-trading-trade-ws-amend-multiple-orders)

  Error code   Error Message
  ------------ ---------------------------------------------------------------------------------------
  54004        Order placement or modification failed because one of the orders in the batch failed.

-   Added new request parameters:
    -   [Place grid algo order](/docs-v5/en/#order-book-trading-grid-trading-post-place-grid-algo-order)\

  ---------------------------------------------------------------------------------------------------------------
  Parameter            Type              Required          Description
  -------------------- ----------------- ----------------- ------------------------------------------------------
  profitSharingRatio   String            No                Profit sharing ratio, it only supports these values\
                                                           `0`,`0.1`,`0.2`,`0.3`\
                                                           0.1 represents 10%

  ---------------------------------------------------------------------------------------------------------------

# 2024-07-04 

The following adjustment may affect API withdrawal\
\
Starting from 7:00 am UTC on July 4, 2024, all existing verified addresses in the OKX withdrawal address book will be placed on a 30-day expiry period. Withdrawal to expired verified addresses cannot be made via API.\
More details in announcement: https://www.okx.com/help/okx-introduces-30-day-verification-for-withdrawal-address-book)

# 2024-07-03 

-   Added enumeration for parameter
    -   [Recurring buy order list](/docs-v5/en/#order-book-trading-recurring-buy-get-recurring-buy-order-list)
    -   [Recurring buy order details](/docs-v5/en/#order-book-trading-recurring-buy-get-recurring-buy-order-details)
    -   [Recurring buy orders channel](/docs-v5/en/#order-book-trading-recurring-buy-ws-recurring-buy-orders-channel)

  -----------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------
  state                   String                  Algo order state\
                                                  `pause`

  -----------------------------------------------------------------------

-   SPOT and MARGIN Supported TP/SL modification\
    -   [POST / Amend order](/docs-v5/en/#order-book-trading-trade-post-amend-order)
    -   [POST / Amend multiple orders](/docs-v5/en/#order-book-trading-trade-post-amend-multiple-orders)
    -   [POST / Amend multiple orders](/docs-v5/en/#order-book-trading-trade-post-amend-multiple-orders)\

# 2024-06-26 

-   Added new endpoints

    -   [(Simple earn fixed) Place lending order](/docs-v5/en/#financial-product-simple-earn-fixed-post-place-lending-order)
    -   [(Simple earn fixed) Amend lending order](/docs-v5/en/#financial-product-simple-earn-fixed-post-amend-lending-order)
    -   [(Simple earn fixed) Get lending order list](/docs-v5/en/#financial-product-simple-earn-fixed-get-lending-order-list)
    -   [(Simple earn fixed) Get lending sub order list](/docs-v5/en/#financial-product-simple-earn-fixed-get-lending-sub-order-list)

-   Add new response parameters

    -   [(Simple earn fixed) Get lending offers (public)](/docs-v5/en/#financial-product-simple-earn-fixed-get-lending-offers-public)

  Parameter   Type     Description
  ----------- -------- ---------------
  lendQuota   String   Lending quota

# 2024-06-25 

-   Added a new endpoint for spread trading cancel all after
    -   [Cancel All After](/docs-v5/en/#spread-trading-rest-api-cancel-all-after)

# 2024-06-20 

-   Added new response parameter acct, indicating which account the fund is.
    -   [GET / Easy convert history](/docs-v5/en/#order-book-trading-trade-get-easy-convert-history)

  -----------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------
  acct                    String                  `6`: Funding account\
                                                  `18`: Trading account

  -----------------------------------------------------------------------

# 2024-06-19 

-   Add tag request and response parameters to support order tag level CAA.
    -   [POST / Cancel All After](/docs-v5/en/#order-book-trading-trade-post-cancel-all-after)

  ----------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------------
  tag               String            No                CAA order tag\
                                                        A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 16 characters.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------

-   Add error code 51071

  Error code   HTTP Status Code   Error Message
  ------------ ------------------ --------------------------------------------------------------------------
  51071        200                You\'ve reached the maximum limit for tag level cancel all after timers.

-   Fix the data push sequence for different order book channels within the same connection and trading symbol. After the adjustment, the push sequence for order book channels within the same connection and trading symbol will be fixed as follows: bbo-tbt -\> books-l2-tbt -\> books50-l2-tbt -\> books -\> books5.
    -   [WS / Order book channel](/docs-v5/en/#order-book-trading-market-data-ws-order-book-channel)

To provide a better user experience overall, Open API launched copy trading restriction function, there are details below.

-   Only whitelist users can use the copy trading function. The lead trading function won\'t be affected.

    -   [First copy settings](/docs-v5/en/#order-book-trading-copy-trading-post-first-copy-settings)
    -   [Amend copy settings](/docs-v5/en/#order-book-trading-copy-trading-post-amend-copy-settings)
    -   [Stop copying](/docs-v5/en/#order-book-trading-copy-trading-post-stop-copying)
    -   [Copy settings](/docs-v5/en/#order-book-trading-copy-trading-get-copy-settings)
    -   [Multiple leverages](/docs-v5/en/#order-book-trading-copy-trading-get-multiple-leverages)
    -   [Set Multiple leverages](/docs-v5/en/#order-book-trading-copy-trading-post-set-multiple-leverages)
    -   [My lead traders](/docs-v5/en/#order-book-trading-copy-trading-get-my-lead-traders)
    -   [My history lead traders](/docs-v5/en/#order-book-trading-copy-trading-get-my-history-lead-traders)
    -   [Existing lead or copy positions](/docs-v5/en/#order-book-trading-copy-trading-get-existing-lead-positions)
    -   [Lead or copy position history](/docs-v5/en/#order-book-trading-copy-trading-get-lead-position-history)
    -   [Place lead or copy stop order](/docs-v5/en/#order-book-trading-copy-trading-post-place-lead-stop-order)
    -   [Close lead or copy position](/docs-v5/en/#order-book-trading-copy-trading-post-close-lead-position)

-   Data from the endpoints below will be delayed 5 minutes

    -   [Lead trader current lead positions (private)](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-current-lead-positions-private)
    -   [Lead trader current lead positions](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-current-lead-positions)
    -   [Copy trading notification channel](/docs-v5/en/#order-book-trading-copy-trading-ws-copy-trading-notification-channel)\

-   The sensitive parameters on endpoints below will be \"\" when lead traders enable lead trading protection

    -   [Lead trader current lead positions (private)](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-current-lead-positions-private)
    -   [Lead trader current lead positions](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-current-lead-positions)

These parameters are affected

  **Parameter**   **Type**   **Description**
  --------------- ---------- ------------------------------------------------
  instId          String     Instrument ID, e.g. BTC-USDT-SWAP
  openAvgPx       String     Average open price
  openTime        String     Open time
  subPos          String     Quantity of positions
  markPx          String     Latest mark price, only applicable to contract

# 2024-06-13 

-   Added new endpoints
    -   [Get contract open interest history](/docs-v5/en/#trading-statistics-rest-api-get-contract-open-interest-history)
    -   [Get contract taker volume](/docs-v5/en/#trading-statistics-rest-api-get-contract-taker-volume)
    -   [Get top traders contract long/short ratio](/docs-v5/en/#trading-statistics-rest-api-get-top-traders-contract-long-short-ratio)
    -   [Get top traders contract long/short ratio (by position)](/docs-v5/en/#trading-statistics-rest-api-get-top-traders-contract-long-short-ratio-by-position)
    -   [Get contract long/short ratio](/docs-v5/en/#trading-statistics-rest-api-get-contract-long-short-ratio)

# 2024-06-05 

OKX starts to enable users to customize the spot risk offset amount, only applicable to Portfolio Margin Mode. The new feature and corresponding changes are listed below:

\

-   Add a new endpoint [Set risk offset amount](/docs-v5/en/#trading-account-rest-api-set-risk-offset-amount)
-   Add new response parameters clSpotInUseAmt/maxSpotInUseAmt, representing user-defined spot risk offset amount and max possible spot risk offset amount respectively. The spotInUseAmt will represent the actual spot risk offset amount.
    -   [Get balance](/docs-v5/en/#trading-account-rest-api-get-balance)
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)
    -   [Get positions](/docs-v5/en/#trading-account-rest-api-get-positions)
    -   [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)

  --------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------------------------------------------------
  \> spotInUseAmt         String                  Actual spot risk offset amount\
                                                  The value of this field is equal to maxSpotInUseAmt if user doesn\'t define clSpotInUseAmt

  \> clSpotInUseAmt       String                  User-defined spot risk offset amount

  \> maxSpotInUseAmt      String                  Max possible spot risk offset amount
  --------------------------------------------------------------------------------------------------------------------------------------------

-   Add new enumeration value for request and response parameters
    -   [Set risk offset type](/docs-v5/en/#trading-account-rest-api-set-risk-offset-type)

  ------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------
  type              String            Yes               Risk offset type\
                                                        `4`: Spot-derivatives (USDC) risk offset

  ------------------------------------------------------------------------------------------------

-   Add new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  59648        200                Your modified spot-in-use amount is insufficient, which may lead to liquidation. Adjust the amount.
  59649        200                Disabling spot-derivatives risk offset mode may increase the risk of liquidation. Adjust the size of your positions and ensure your maintenance margin ratio is safe.
  59650        200                Switching your offset unit may increase the risk of liquidation. Adjust the size of your positions and ensure your maintenance margin ratio is safe.
  59651        200                Enable spot-derivatives risk offset mode to set your spot-in-use amount.
  59652        200                You can only set a spot-in-use amount for crypto that can be used as margin.

# 2024-06-03 

-   Added new endpoints

    -   [Get fixed loan borrow limit](/docs-v5/en/#trading-account-rest-api-get-fixed-loan-borrow-limit)
    -   [Get fixed loan borrow quote](/docs-v5/en/#trading-account-rest-api-get-fixed-loan-borrow-quote)
    -   [Place fixed loan borrowing order](/docs-v5/en/#trading-account-rest-api-place-fixed-loan-borrowing-order)
    -   [Amend fixed loan borrowing order](/docs-v5/en/#trading-account-rest-api-amend-fixed-loan-borrowing-order)
    -   [Manual renew fixed loan borrowing order](/docs-v5/en/#trading-account-rest-api-amend-fixed-loan-borrowing-order)
    -   [Repay fixed loan borrowing order](/docs-v5/en/#trading-account-rest-api-amend-fixed-loan-borrowing-order)
    -   [Get fixed loan borrow order list](/docs-v5/en/#trading-account-rest-api-get-fixed-loan-borrow-order-list)

-   Added new enumeration value

    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)

  ---------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------------------
  subType                 String                  `293`: Fixed loan interest deduction\
                                                  `294`: Fixed loan interest refund\
                                                  `295`: Fixed loan overdue penalty

  ---------------------------------------------------------------------------------------

# 2024-05-30 

-   Added new module [Simple earn fixed](/docs-v5/en/#financial-product-simple-earn-fixed)
-   Added new enumeration value
    -   [Asset bills details](/docs-v5/en/#funding-account-rest-api-asset-bills-details)

  ----------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------
  type                    String                  `304`: Simple Earn Fixed order submission\
                                                  `305`: Simple Earn Fixed order redemption\
                                                  `306`: Simple Earn Fixed principal distribution\
                                                  `307`: Simple Earn Fixed interest distribution (early termination compensation)\
                                                  `308`: Simple Earn Fixed interest distribution\
                                                  `309`: Simple Earn Fixed interest distribution (extension compensation)

  ----------------------------------------------------------------------------------------------------------------------------------

# 2024-05-15 

-   Added new response parameters:
    -   [Account configuration](/docs-v5/en/#order-book-trading-copy-trading-get-account-configuration)

Response parameter

  Parameter          Type     Description
  ------------------ -------- --------------------------------
  maxCopyTraderNum   String   Maximum number of copy traders
  copyTraderNum      String   Current number of copy traders

# 2024-05-10 

-   Added new endpoints for spread trading market data
    -   [Get ticker (Public)](/docs-v5/en/#spread-trading-rest-api-get-ticker-public)
    -   [Get candlesticks](/docs-v5/en/#spread-trading-rest-api-get-candlesticks)
    -   [Get candlesticks history](/docs-v5/en/#spread-trading-rest-api-get-candlesticks-history)
    -   [Candlesticks channel](/docs-v5/en/#spread-trading-websocket-public-channel-candlesticks-channel)

# 2024-05-09 

-   Add new push data parameters for spread tickers channel.
    -   [Tickers channel](/docs-v5/en/#spread-trading-websocket-public-channel-tickers-channel)

#### Push data parameters 

  **Parameters**   **Types**          **Description**
  ---------------- ------------------ ---------------------------------------------------------
  data             Array of objects   Subscribed data
  \> open24h       String             Open price in the past 24 hours
  \> high24h       String             Highest price in the past 24 hours
  \> low24h        String             Lowest price in the past 24 hours
  \> vol24h        String             24h trading volume, with a unit of base currency or USD

vol24h\
For Spot vs USDT-margined contracts spread and USDT-margined contracts spread, the volume is with the unit of base currency; for Crypto-margined contracts spread, the volume is with the unit of USD.

# 2024-05-08 

-   Added new endpoint

    -   [Add investment](/docs-v5/en/#order-book-trading-grid-trading-post-add-investment)

-   New enumeration value for sprdType field

    -   [Get Spreads (Public)](/docs-v5/en/#spread-trading-rest-api-get-spreads-public)

  Parameter     Type     Description
  ------------- -------- -----------------------
  \> sprdType   String   spread Type: `hybrid`

-   Added new endpoint
    -   [Get instruments](/docs-v5/en/#trading-account-rest-api-get-instruments)

# 2024-05-06 

-   Added response parameters
    -   [Get the invitee\'s detail](/docs-v5/en/#affiliate-rest-api-get-the-invitee-39-s-detail)

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------------------------------
  firstTradeTime          String                  Timestamp that the first trade is completed after the latest rebate relationship is established with the parent affiliate\
                                                  Unix timestamp in millisecond format, e.g. 1597026383085\
                                                  If user has not traded, \"\" will be returned

  level                   String                  Invitee trading fee level, e.g. Lv1

  depAmt                  String                  Accumulated amount of deposit in USDT\
                                                  If user has not deposited, 0 will be returned

  volMonth                String                  Accumulated Trading volume in the current month in USDT\
                                                  If user has not traded, 0 will be returned

  accFee                  String                  Accumulated Amount of trading fee in USDT\
                                                  If there is no any fee, 0 will be returned

  kycTime                 String                  KYC2 verification time. Unix timestamp in millisecond format and the precision is in day\
                                                  If user has not passed KYC2, \"\" will be returned

  region                  String                  User country or region. e.g. \"United Kingdom\"

  affiliateCode           String                  Affiliate invite code that the invitee registered/recalled via
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2024-04-25 

-   Commission detail download optimization
    -   [Get download link(ND)](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-download-link-nd)

Added new response fields for decompressed CSV file. Changed the data dimension from order to fill.

  -----------------------------------------------------------------------
  Parameter                           Description
  ----------------------------------- -----------------------------------
  tradeId                             Last traded ID

  amt                                 Trade amount in USDT

  fee                                 fee amount in USDT

  execType                            Liquidity taker or maker\
                                      `T`: taker\
                                      `M`: maker
  -----------------------------------------------------------------------

# 2024-04-24 

-   Added new endpoint

    -   [Get premium history](/docs-v5/en/#public-data-rest-api-get-premium-history)

-   Added new endpoints

    -   [Get contract credits](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-contract-credits)
    -   [Activate contract credit](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-activate-contract-credit)

-   Added new response parameters\

    -   [Order details](/docs-v5/en/#order-book-trading-trade-get-order-details)
    -   [Order List](/docs-v5/en/#order-book-trading-trade-get-order-list)
    -   [Order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)
    -   [Order history (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)

  ---------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------------------------------------------
  attachAlgoOrds          Array of objects        TP/SL information attached when placing order

  \> failCode             String                  The error code when failing to place TP/SL order, e.g. 51020\
                                                  The default is \"\"

  \> failReason           String                  The error reason when failing to place TP/SL order.\
                                                  The default is \"\"
  ---------------------------------------------------------------------------------------------------------------

-   Added new response parameter ts.

    -   [POST / Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
    -   [POST / Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
    -   [POST / Amend order](/docs-v5/en/#order-book-trading-trade-post-amend-order)
    -   [POST / Amend multiple orders](/docs-v5/en/#order-book-trading-trade-post-amend-multiple-orders)
    -   [POST / Cancel order](/docs-v5/en/#order-book-trading-trade-post-cancel-order)
    -   [POST / Cancel multiple orders](/docs-v5/en/#order-book-trading-trade-post-cancel-multiple-orders)
    -   [WS / Place order](/docs-v5/en/#order-book-trading-trade-ws-place-order)
    -   [WS / Place multiple orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)
    -   [WS / Amend order](/docs-v5/en/#order-book-trading-trade-ws-amend-order)
    -   [WS / Amend multiple orders](/docs-v5/en/#order-book-trading-trade-ws-amend-multiple-orders)
    -   [WS / Cancel order](/docs-v5/en/#order-book-trading-trade-ws-cancel-order)
    -   [WS / Cancel multiple orders](/docs-v5/en/#order-book-trading-trade-ws-cancel-multiple-orders)

**Response parameter**

  Parameter   Type     Description
  ----------- -------- ------------------------------------------------------------------------------------------------------------------------------------
  ts          String   Timestamp when the order request processing is finished by our system, Unix timestamp format in milliseconds, e.g. `1597026383085`

# 2024-04-18 

-   Added new response parameters
    -   [GET / offers](/docs-v5/en/#financial-product-earn-get-offers)

  ---------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------------------------------------------------------------------
  redeemPeriod            Array of stringss       Redemption Period, format in \[min time,max time\]\
                                                  `H`: Hour, `D`: Day\
                                                  e.g. \[\"1H\",\"24H\"\] represents redemption period is between 1 Hour and 24 Hours.\
                                                  \[\"14D\",\"14D\"\] represents redemption period is 14 days.

  ---------------------------------------------------------------------------------------------------------------------------------------

-   The moon grid has been offline

# 2024-04-11 

-   In order to improve system performance and optimize user experience, OKX decides to reduce some fields in the position risk warning channel. After the change, the corresponding fields will return \"\" or \[\], and after a period of time, it will be completely offline. Users can access the same fields using the [positions channel](/docs-v5/en/#trading-account-websocket-positions-channel).\

-   [Position risk warning](/docs-v5/en/#trading-account-websocket-position-risk-warning)

The deleted fields are listed as follows:

  -------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------
  data                    Array                   Subscribed data

  \> availPos             String                  Position that can be closed\
                                                  Only applicable to `MARGIN`, `FUTURES`/`SWAP` in the `long-short` mode and `OPTION`

  \> avgPx                String                  Average open price

  \> upl                  String                  Unrealized profit and loss

  \> uplRatio             String                  Unrealized profit and loss ratio

  \> liqPx                String                  Estimated liquidation price\
                                                  Not applicable to `OPTION`

  \> imr                  String                  Initial margin requirement, only applicable to `cross`

  \> margin               String                  Margin, can be added or reduced. Only applicable to `isolated` `Margin`.

  \> mmr                  String                  Maintenance margin requirement

  \> liab                 String                  Liabilities, only applicable to `MARGIN`.

  \> liabCcy              String                  Liabilities currency, only applicable to `MARGIN`.

  \> interest             String                  Interest. Interest that has been incurred.

  \> tradeId              String                  Last trade ID

  \> notionalUsd          String                  Notional value of positions in `USD`

  \> optVal               String                  Option Value, only applicable to `OPTION`.

  \> adl                  String                  Automatic-Deleveraging, signal area\
                                                  Divided into 5 levels, from 1 to 5, the smaller the number, the weaker the adl intensity.

  \> last                 String                  Latest traded price

  \> deltaBS              String                  delta: Black-Scholes Greeks in dollars, only applicable to `OPTION`

  \> deltaPA              String                  delta: Greeks in coins, only applicable to `OPTION`

  \> gammaBS              String                  gamma: Black-Scholes Greeks in dollars, only applicable to `OPTION`

  \> gammaPA              String                  gamma: Greeks in coins, only applicable to `OPTION`

  \> thetaBS              String                  theta: Black-Scholes Greeks in dollars, only applicable to `OPTION`

  \> thetaPA              String                  theta: Greeks in coins, only applicable to `OPTION`

  \> vegaBS               String                  vega: Black-Scholes Greeks in dollars, only applicable to `OPTION`

  \> vegaPA               String                  vega: Greeks in coins, only applicable to `OPTION`
  -------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameter acctStpMode
    -   [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)

  -----------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------
  acctStpMode             String                  Account self-trade prevention mode\
                                                  `cancel_maker`\
                                                  `cancel_taker`\
                                                  `cancel_both`\
                                                  Users can log in to the webpage through the master account to modify this configuration

  -----------------------------------------------------------------------------------------------------------------------------------------

# 2024-04-10 

-   For better trading experience, the exchange exempts new and amendment request count of fiat trading symbols but still keep the trading volume when calculating rate limit

-   Add new request and response parameter subType for transaction details endpoints.

    -   [GET / Transaction details (last 3 days)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-days)
    -   [GET / Transaction details (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-months)

**Request parameter**

  ----------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------
  subType           String            No                Transaction type\
                                                        `1`: Buy\
                                                        `2`: Sell\
                                                        `3`: Open long\
                                                        `4`: Open short\
                                                        `5`: Close long\
                                                        `6`: Close short\
                                                        `100`: Partial liquidation close long\
                                                        `101`: Partial liquidation close short\
                                                        `102`: Partial liquidation buy\
                                                        `103`: Partial liquidation sell\
                                                        `104`: Liquidation long\
                                                        `105`: Liquidation short\
                                                        `106`: Liquidation buy\
                                                        `107`: Liquidation sell\
                                                        `110`: Liquidation transfer in\
                                                        `111`: Liquidation transfer out\
                                                        `118`: System token conversion transfer in\
                                                        `119`: System token conversion transfer out\
                                                        `125`: ADL close long\
                                                        `126`: ADL close short\
                                                        `127`: ADL buy\
                                                        `128`: ADL sell\
                                                        `212`: Auto borrow of quick margin\
                                                        `213`: Auto repay of quick margin\
                                                        `204`: block trade buy\
                                                        `205`: block trade sell\
                                                        `206`: block trade open long\
                                                        `207`: block trade open short\
                                                        `208`: block trade close long\
                                                        `209`: block trade close short\
                                                        `270`: Spread trading buy\
                                                        `271`: Spread trading sell\
                                                        `272`: Spread trading open long\
                                                        `273`: Spread trading open short\
                                                        `274`: Spread trading close long\
                                                        `275`: Spread trading close short

  ----------------------------------------------------------------------------------------------------

**Response parameter**

  Parameter   Type     Description
  ----------- -------- ------------------
  subType     String   Transaction type

# 2024-04-02 

-   Added new endpoint, Cancel All after for block trading quotes
    -   [Cancel All After](/docs-v5/en/#block-trading-rest-api-cancel-all-after)

# 2024-03-27 

-   Decommissioned the order lite book endpoint `GET /api/v5/market/books-lite`.

-   Exempted SPOT/MARGIN orders from the sub-account rate limit.

# 2024-03-19 

-   Released new feature connection count limit per private WebSocket channel

To enhance system stability and fairness to users, the exchange starts to impose limitations on the number of concurrent WebSocket connections allowed to subscribe to the following WebSocket channels. The limit will be set at 20 WebSocket connections per specific WebSocket channel per sub-account. Each WebSocket connection is identified by the unique `connId`.

\

The WebSocket channels subject to this limitation are as follows:

1.  [Orders channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)
2.  [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)
3.  [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)
4.  [Balance and positions channel](/docs-v5/en/#trading-account-websocket-balance-and-position-channel)
5.  [Position risk warning channel](/docs-v5/en/#trading-account-websocket-position-risk-warning)
6.  [Account greeks channel](/docs-v5/en/#trading-account-websocket-account-greeks-channel)

If users subscribe to the same channel through the same WebSocket connection through multiple arguments, for example, by using `{"channel": "orders", "instType": "ANY"}` and `{"channel": "orders", "instType": "SWAP"}`, it will be counted once only. If users subscribe to the listed channels (such as orders and accounts) using either the same or different connections, it will not affect the counting, as these are considered as two different channels. The system calculates the number of WebSocket connections per channel.

\

The platform will send the number of active connections to clients through the `channel-conn-count` event message **to new channel subscriptions**.

> Connection count update


``` {.highlight .json .tab-json}
{
    "event":"channel-conn-count",
    "channel":"orders",
    "connCount": "2",
    "connId":"abcd1234"
}
```


\

When the limit is breached, generally the latest connection that sends the subscription request will be rejected. Client will receive the usual subscription acknowledgement followed by the `channel-conn-count-error` from the connection that the subscription has been terminated. In exceptional circumstances the platform may unsubscribe existing connections.

> Connection limit error


``` {.highlight .json .tab-json}
{
    "event": "channel-conn-count-error",
    "channel": "orders",
    "connCount": "20",
    "connId":"a4d3ae55"
}
```


\

Order operations through WebSocket, including place, amend and cancel orders, are not impacted through this change.

# 2024-03-14 

-   Released new feature mandatory self trade prevention at 10:00 (UTC) on March 14

    -   Deprecated the `stpId` field in the Place order(Batch place orders) REST endpoint and WebSocket channel.
    -   For order book trading, the default `stpMode` is Cancel Maker. Users can utilize the `stpMode` request parameter of Place order(Batch place orders) REST endpoint and WebSocket channel to determine the `stpMode` for new orders of certain order types.
    -   For spread trading, Cancel maker is supported by default and only.
    -   For orders that are canceled due to self trade prevention, users can query the records of `cancelSource = 32` in the historical orders endpoint. The order channel will also push relevant information.
    -   For block trading, the RFQ will face creation failure if all makers are under the same master account of the taker, and the taker will receive error code \"56004\". Otherwise, the RFQ will be created but not be received by makers that are under the same master account of the taker.

-   Added new enumeration values for cancelSource field

    -   [WS / Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

  -----------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------------
  \> cancelSource         String                  `38`: You have canceled market maker protection (MMP) orders\
                                                  `39`: Your order was canceled because market maker protection (MMP) was triggered

  -----------------------------------------------------------------------------------------------------------------------------------

-   New enumeration value for withdrawal `state`
    -   [Get withdrawal history](/docs-v5/en/?shell#funding-account-rest-api-get-withdrawal-history)
    -   [Get sub-account withdrawal history](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-sub-account-withdrawal-history)
    -   [Withdrawal info channel](/docs-v5/en/#funding-account-websocket-withdrawal-info-channel)

  --------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------------------------------------------------
  state                   String                  `15`: Pending transaction validation\
                                                  `16`: Due to local laws and regulations, your withdrawal may take up to 24 hours to arrive

  --------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameters and numerations\
    -   [Get grid algo order list](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-list)\
    -   [Get grid algo order history](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-history)\
    -   [Get grid algo order details](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-details)\
    -   [Contract grid algo orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-contract-grid-algo-orders-channel)

  Parameter    Type     Description
  ------------ -------- -------------------------------------------------------------------------------
  fee          String   Accumulated fee. Only applicable to contract grid, or it will be \"\"
  fundingFee   String   Accumulated funding fee. Only applicable to contract grid, or it will be \"\"

-   OKX restricted the use of the copy trading notification channel. Only the clients who are on the whitelist can get updates.
    -   [Copy trading notification channel](/docs-v5/en/#order-book-trading-copy-trading-ws-copy-trading-notification-channel)\

# 2024-03-12 

-   Released new feature

    -   [Sub-account rate limit](/docs-v5/en/#overview-rate-limits-sub-account-rate-limit)
    -   [Fill ratio based sub-account rate limit](/docs-v5/en/#overview-rate-limits-fill-ratio-based-sub-account-rate-limit)

-   Added new error code

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ ----------------------------------------------------------------
  50061        200                You\'ve reached the maximum order rate limit for this account.

# 2024-03-06 

-   Added new request parameters:
    -   [Place grid algo order](/docs-v5/en/#order-book-trading-grid-trading-post-place-grid-algo-order)\
    -   [Amend grid algo order](/docs-v5/en/#order-book-trading-grid-trading-post-amend-grid-algo-order)

  Parameter   Type     Required   Description
  ----------- -------- ---------- ---------------------------------------
  tpRatio     String   No         Take profit ratio, 0.1 represents 10%
  slRatio     String   No         Stop loss ratio, 0.1 represents 10%

-   Added new response parameters and numerations\
    -   [Get grid algo order list](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-list)\
    -   [Get grid algo order history](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-history)\
    -   [Get grid algo order details](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-details)\
    -   [Contract grid algo orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-contract-grid-algo-orders-channel)

  Parameter   Type     Description
  ----------- -------- ---------------------------------------
  tpRatio     String   Take profit ratio, 0.1 represents 10%
  slRatio     String   Stop loss ratio, 0.1 represents 10%

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ --------------------------------------------------------------------------------
  55100        200                Take profit % should be within the range of {parameter1}-{parameter2}
  55101        200                Stop loss % should be within the range of {parameter1}-{parameter2}
  55102        200                Take profit % should be greater than the current bot's PnL%
  55103        200                Stop loss % should be less than the current bot's PnL%
  55104        200                Only futures grid supports take profit or stop loss based on profit percentage

# 2024-02-28 

The function of TP limit order has been deployed to the production.

-   Added new request parameter:
    -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
    -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)

  ----------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------
  \> tpOrdKind      String            No                TP order kind\
                                                        `condition`\
                                                        `limit`\
                                                        The default is `condition`

  ----------------------------------------------------------------------------------

-   Added new request parameters:
    -   [Amend order](/docs-v5/en/#order-book-trading-trade-post-amend-order)
    -   [Amend multiple orders](/docs-v5/en/#order-book-trading-trade-post-amend-multiple-orders)

  -----------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------
  \> newTpOrdKind   String            No                TP order kind\
                                                        `condition`\
                                                        `limit`

  -----------------------------------------------------------------------

-   Added new response parameters and numerations\
    -   [Order details](/docs-v5/en/#order-book-trading-trade-get-order-details)
    -   [Order List](/docs-v5/en/#order-book-trading-trade-get-order-list)
    -   [Order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)
    -   [Order history (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

  -----------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------
  isTpLimit               String                  Whether it is TP limit order. true or false

  cancelSource            String                  `36`: Your TP limit order was canceled because the corresponding SL order was triggered.\
                                                  `37`: Your TP limit order was canceled because the corresponding SL order was canceled.

  attachAlgoOrds          Array of objects        TP/SL information attached when placing order

  \> tpOrdKind            String                  TP order kind\
                                                  `condition`\
                                                  `limit`

  \> linkedAlgoOrd        Object                  Linked SL order detail, only applicable to TP limit order of one-cancels-the-other order(oco)

  \>\> algoId             Object                  Algo ID
  -----------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameters\
    -   [Algo order details](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-details)
    -   [Algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)
    -   [Algo order history](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)
    -   [Algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)

  Parameter   Type     Description
  ----------- -------- ---------------------------------------------------------------------------------------------------------------------------------------------
  linkedOrd   Object   Linked TP order detail, only applicable to SL order that comes from the one-cancels-the-other (OCO) order that contains the TP limit order.
  \> ordId    String   Order ID
  cTime       String   Creation time Unix timestamp format in milliseconds, e.g. `1597026383085`
  uTime       String   Order updated time, Unix timestamp format in milliseconds, e.g. 1597026383085

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ -----------------------------------------------------------------------------------------
  51090        200                You can\'t modify the amount of an SL order placed with a TP limit order.
  51091        200                All TP orders in one order must be of the same type.
  51092        200                TP order prices (tpOrdPx) in one order must be different.
  51093        200                TP limit order prices (tpOrdPx) in one order can\'t be --1 (market price).
  51094        200                You can\'t place TP limit orders in spot, margin, or options trading.
  51095        200                To place TP limit orders at this endpoint, you must place an SL order at the same time.
  51096        200                cxlOnClosePos needs to be true to place a TP limit order
  51098        200                You can\'t add a new TP order to an SL order placed with a TP limit order.
  51099        200                You can\'t place TP limit orders as a lead trader.
  50062        200                This feature is currently unavailable.

-   Newly added endpoints

    -   [Position builder (new)](/docs-v5/en/#trading-account-rest-api-position-builder-new)

-   Newly added endpoints

    -   [Get the user\'s broker rebate information](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-the-user-39-s-broker-rebate-information)

-   Added a new endpoint to retrieve the full order book.

    -   [GET / Full order book](/docs-v5/en/#order-book-trading-market-data-get-full-order-book)

-   Added new fields for the trial fund balance

    -   [Get balance](/docs-v5/en/#trading-account-rest-api-get-balance)
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)

  Parameters   Types    Description
  ------------ -------- ----------------------------------------------
  \> details   Array    Detailed asset information in all currencies
  rewardBal    String   Trial fund balance

-   Add new response parameter for premium
    -   [Get funding rate](/docs-v5/en/#public-data-rest-api-get-funding-rate)
    -   [Funding rate channel](/docs-v5/en/#public-data-websocket-funding-rate-channel)

  Parameters   Types    Description
  ------------ -------- -------------------------------------------------------------------
  premium      String   Premium between the mid price of perps market and the index price

-   Added new enumeration values of bill type and subtype for structured products
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)

  ------------------------------------------------------------------------------------------
  Parameters              Types                   Description
  ----------------------- ----------------------- ------------------------------------------
  type                    String                  Bill type\
                                                  `26`: Structured products

  subtype                 String                  Bill subtype\
                                                  `296`: From structured order placements\
                                                  `297`: To structured order placements\
                                                  `298`: From structured settlements\
                                                  `299`: To structured settlements
  ------------------------------------------------------------------------------------------

-   [Isolated margin trading settings](/docs-v5/en/#trading-account-rest-api-isolated-margin-trading-settings) parameter `isoMode` deprecated `quick_margin`

# 2024-02-07 

-   Newly added endpoint, which returns rate limit and fill ratio related data. For more details, please refer to [Fill ratio based sub-account rate limit](/docs-v5/en/#overview-rate-limits-fill-ratio-based-sub-account-rate-limit).
    -   [GET / Account rate limit](/docs-v5/en/#order-book-trading-trade-get-account-rate-limit)

# 2024-02-06 

The feature has been released to demo trading, estimated to be released to production on 2024/02/28.

-   Newly added endpoints
    -   [Position builder (new)](/docs-v5/en/#trading-account-rest-api-position-builder-new)

# 2024-02-01 

-   Add new response parameters
    -   [Get deposit address](/docs-v5/en/#funding-account-rest-api-get-deposit-address)
    -   [Lightning deposits](/docs-v5/en/#funding-account-rest-api-get-deposit-history)

  Parameter      Type     Description
  -------------- -------- -------------------------------
  verifiedName   String   Verified name (for recipient)

# 2024-01-31 

-   Add newly endpoints for signal bot trading
-   Improve the updateInterval request parameter
    -   [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)

**Before:**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------------------------
  updateInterval    int               No                `0`: only push due to positions events\
                                                        \
                                                        The data will be pushed both by events and regularly if this field is omitted or set to other values than 0.\
                                                        \
                                                        The following format should be strictly obeyed when using this field.\
                                                        \"extraParams\": \"\
                                                        {\
                                                        \\\"updateInterval\\\": \\\"0\\\"\
                                                        }\
                                                        \"

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

**After:**

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  updateInterval    int               No                `0`: only push due to positions events\
                                                        `2000, 3000, 4000`: push by events and regularly according to the time interval setting (ms)\
                                                        \
                                                        The data will be pushed both by events and around per 5 seconds regularly if this field is omitted or set to other values than the valid values above.\
                                                        \
                                                        The following format should be strictly followed when using this field.\
                                                        \"extraParams\": \"\
                                                        {\
                                                        \\\"updateInterval\\\": \\\"0\\\"\
                                                        }\
                                                        \"

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Deleted `isoMode` enum (`autonomy`: Manual transfers) in [Isolated margin trading settings](/docs-v5/en/#trading-account-rest-api-isolated-margin-trading-settings)

# 2024-01-22 

OKX has migrated savings endpoints to the new. The new endpoints have been released in production on 2023/03/15. The corresponding old endpoints has been offline on **2024/01/22**.

-   Added a new function module [Savings](/docs-v5/en/#rest-api-savings), the relevant endpoints of the savings are adjusted as follows
    -   [Get saving balance](/docs-v5/en/#financial-product-savings-get-saving-balance) adjusted endpoint path from `/api/v5/asset/saving-balance` to `/api/v5/finance/savings/balance`
    -   [Savings purchase/redemption](/docs-v5/en/#financial-product-savings-post-savings-purchase-redemption) adjusted endpoint path from `/api/v5/asset/purchase_redempt` to `/api/v5/finance/savings/purchase-redempt`
    -   [Set lending rate](/docs-v5/en/#financial-product-savings-post-set-lending-rate) adjusted endpoint path from `/api/v5/asset/set-lending-rate` to `/api/v5/finance/savings/set-lending-rate`
    -   [Get lending history](/docs-v5/en/#financial-product-savings-get-lending-history) adjusted endpoint path from `/api/v5/asset/lending-history` to `/api/v5/finance/savings/lending-history`
    -   [Get public borrow info (public)](/docs-v5/en/#financial-product-savings-get-public-borrow-info-public) adjusted endpoint path from `/api/v5/asset/lending-rate-summary` to `/api/v5/finance/savings/lending-rate-summary`
    -   [Get public borrow history (public)](/docs-v5/en/#financial-product-savings-get-public-borrow-history-public) adjusted endpoint path from `/api/v5/asset/lending-rate-history` to `/api/v5/finance/savings/lending-rate-history`

# 2024-01-18 

-   Add new response parameters
    -   [Get balance](/docs-v5/en/#trading-account-rest-api-get-balance)
    -   [Get sub-account trading balance](/docs-v5/en/#sub-account-rest-api-get-sub-account-trading-balance)
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)

**Response Parameters**

  --------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------------------------------------
  upl                     String                  Cross-margin info of unrealized profit and loss at the account level in `USD`\
                                                  Applicable to `Multi-currency margin`/`Portfolio margin`

  \> (details) imr        String                  Initial margin requirement at the currency level\
                                                  Applicable to `Futures mode`

  \> (details) mmr        String                  Maintenance margin requirement at the currency level\
                                                  Applicable to `Futures mode`
  --------------------------------------------------------------------------------------------------------------------------------

# 2024-01-17 

Contract lead trading was supported in the production environment(Only applicable to ND sub-account)

-   Added new endpoints and channel

    -   [Apply for lead trading](/docs-v5/en/#order-book-trading-copy-trading-post-apply-for-lead-trading)
    -   [Stop lead trading](/docs-v5/en/#order-book-trading-copy-trading-post-stop-lead-trading)
    -   [Amend profit sharing ratio](/docs-v5/en/#order-book-trading-copy-trading-post-amend-profit-sharing-ratio)
    -   [Lead trader ranks (private)](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-ranks-private)
    -   [Lead trader weekly pnl (private)](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-weekly-pnl-private)
    -   [Lead trader daily pnl (private)](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-daily-pnl-private)
    -   [Lead trader stats (private)](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-stats-private)
    -   [Lead trader currency preferences (private)](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-currency-preferences-private)
    -   [Lead trader current lead positions (private)](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-current-lead-positions-private)
    -   [Lead trader lead position history (private)](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-lead-position-history-private)
    -   [Copy traders (private)](/docs-v5/en/#order-book-trading-copy-trading-get-copy-traders-private)
    -   [Copy traders](/docs-v5/en/#order-book-trading-copy-trading-get-copy-traders)
    -   [Account configuration](/docs-v5/en/#order-book-trading-copy-trading-get-account-configuration)
    -   [Total unrealized profit sharing](/docs-v5/en/#order-book-trading-copy-trading-get-total-unrealized-profit-sharing)
    -   [Lead trading notification channel](/docs-v5/en/#order-book-trading-copy-trading-ws-lead-trading-notification-channel)

-   Added new response parameters:

    -   [Get profit sharing details](/docs-v5/en/#order-book-trading-copy-trading-get-profit-sharing-details)
    -   [Get unrealized profit sharing details](/docs-v5/en/#order-book-trading-copy-trading-get-unrealized-profit-sharing-details)

Response parameter

  Parameter   Type     Description
  ----------- -------- ---------------
  portLink    String   Portrait link

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ ---------------------------------------------------------------------------------------------------------------------------------------------
  59282        200                Only ND sub-accounts under ND brokers whose main accounts are on the allowlist support this endpoint. Reach out to BD for help.
  59284        200                You\'ve reached the monthly limit of {param0} ratio edits
  59286        200                You can\'t become a contract lead trader when using spot mode
  59287        200                Profit sharing ratio should be between {param0} and {param1}
  59288        200                You\'re leading trades but your account is in portfolio margin mode. Switch to futures mode or multiple-currency margin mode and try again.

**Liquidation and ADL data improvements**

\

**When liquidation happens under cross margin mode**

-   [WS / Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

  Parameter                  before             after
  -------------------------- ------------------ ----------------------------------------------------------
  fillPx, fillSz, fillTime   \"\" or \"0\"      the corresponding actual values when liquidation happens
  pnl                        Profit and loss    Profit and loss + liquidation penalty
  tradeId                    the last tradeId   \"0\"
  fillPnl                    \"0\"              Profit and loss

-   Bills related endpoints, [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days), [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)

  Parameter   before             after
  ----------- ------------------ -----------------------------------------------------
  ordId       \"\"               the corresponding order ID when liquidation happens
  tradeId     the last tradeId   \"0\"

-   [Balance and position channel](/docs-v5/en/#trading-account-websocket-balance-and-position-channel), [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)

  Parameter   before             after
  ----------- ------------------ -------
  tradeId     the last tradeId   \"0\"

\

**When liquidation happens under isolated margin mode**

-   [WS / Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

  Parameter                  before             after
  -------------------------- ------------------ ----------------------------------------------------------
  fillPx, fillSz, fillTime   \"\" or \"0\"      the corresponding actual values when liquidation happens
  tradeId                    the last tradeId   \"0\"
  fillPnl                    \"0\"              Profit and loss

-   Bills related endpoints, [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days), [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)

  Parameter   before             after
  ----------- ------------------ -----------------------------------------------------
  ordId       \"\"               the corresponding order ID when liquidation happens
  tradeId     the last tradeId   \"0\"

-   [Balance and position channel](/docs-v5/en/#trading-account-websocket-balance-and-position-channel), [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)

  Parameter   before             after
  ----------- ------------------ -------
  tradeId     the last tradeId   \"0\"

\

**When Auto-Deleveraging (ADL) happens**

-   [WS / Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

  Parameter                  before             after
  -------------------------- ------------------ ----------------------------------------------------------
  fillPx, fillSz, fillTime   \"\" or \"0\"      the corresponding actual values when liquidation happens
  tradeId                    the last tradeId   \"0\"
  fillPnl                    \"0\"              Profit and loss

-   Bills related endpoints, [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days), [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)

  Parameter   before             after
  ----------- ------------------ -----------------------------------------------------
  ordId       \"\"               the corresponding order ID when liquidation happens
  tradeId     the last tradeId   \"0\"

**Note: After liquidation or ADL happens, the tradeId corresponding to the position will be set to \"0\". Through REST endpoints and Websocket channels, users will receive \"tradeId\": \"0\" until there is a new transaction for this position.**

# 2024-01-18 

The feature has been released to demo trading, estimated to be released to production on 2024/01/18.

-   Add new response parameters
    -   [Get balance](/docs-v5/en/#trading-account-rest-api-get-balance)
    -   [Get sub-account trading balance](/docs-v5/en/#sub-account-rest-api-get-sub-account-trading-balance)
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)

**Response Parameters**

  --------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------------------------------------
  upl                     String                  Cross-margin info of unrealized profit and loss at the account level in `USD`\
                                                  Applicable to `Multi-currency margin`/`Portfolio margin`

  \> (details) imr        String                  Initial margin requirement at the currency level\
                                                  Applicable to `Futures mode`

  \> (details) mmr        String                  Maintenance margin requirement at the currency level\
                                                  Applicable to `Futures mode`
  --------------------------------------------------------------------------------------------------------------------------------

# 2024-01-10 

-   Updated the error messages for the error code below

  Error code   HTTP Status Code   Error message
  ------------ ------------------ ----------------------------------------------------
  51137        200                The highest price limit for buy orders is {param0}
  51138        200                The lowest price limit for sell orders is {param0}

-   New enumeration value for cancelSource field
    -   [WS / Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

  Parameter         Type     Description
  ----------------- -------- -----------------------------------------------------------
  \> cancelSource   String   `15`: Order canceled: The order price is beyond the limit

-   Added historical ADL records into get security fund endpoint. Added new enumeration value `adl` for request parameter type; added new response parameters instType, maxBal, maxBalTs, decRate, adlType.
    -   [Get security fund](/docs-v5/en/#public-data-rest-api-get-insurance-fund)

**Request Parameters**

  ----------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------
  type              String            No                Type\
                                                        `adl`: ADL historical data

  ----------------------------------------------------------------------------------

**Response Parameters**

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------------------------------------------------------------------------------------------------
  instType                String                  Instrument type

  details                 Array of objects        security fund data

  \> maxBal               String                  Maximum security fund balance in the past eight hours\
                                                  Only applicable when type is `adl`

  \> maxBalTs             String                  Timestamp when security fund balance reached maximum in the past eight hours, Unix timestamp format in milliseconds, e.g. `1597026383085`\
                                                  Only applicable when type is `adl`

  \> decRate              String                  Real-time security fund decline rate (compare balance and maxBal)\
                                                  Only applicable when type is `adl`

  \> adlType              String                  ADL related events\
                                                  `rate_adl_start`: ADL begins due to high security fund decline rate\
                                                  `bal_adl_start`: ADL begins due to security fund balance falling\
                                                  `adl_end`: ADL ends\
                                                  \
                                                  When the rate and balance ADL are triggered at the same time, only `bal_adl_start` will be returned\
                                                  Only applicable when type is `adl`
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2024-01-09 

-   Newly added endpoints. Spread trading supports querying historical orders in the past three months.
    -   [Get orders history (last 3 months)](/docs-v5/en/#spread-trading-rest-api-get-orders-history-last-3-months)

# 2024-01-04 

-   Added request parameters
    -   [Create sub-account (ND)](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-create-sub-account)

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------------------------
  mainAcct          String            Conditional       Main account name of the second-level sub-account\
                                                        When you are creating the first-level sub-account, it should be \"\"\
                                                        When you are creating the second-level sub-account, it is required and should be the first-level sub-account.\

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameter:
    -   [Get sub-account list](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-sub-account-list)\

  ---------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------------------------------------------
  \> mainAcct             String                  Main account name of the second-level sub-account\
                                                  It is the first-level sub-account when `mainAcct` is \"\"\
                                                  It is the second-level sub-account when `mainAcct` has value.

  ---------------------------------------------------------------------------------------------------------------

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------
  59622        200                You\'re creating a sub-account for a non-existing or incorrect sub-account. Create a sub-account under the ND broker first or use the correct sub-account code.
  59623        200                Couldn\'t delete the sub-account under the ND broker as the sub-account has one or more sub-accounts, which must be deleted first.

# 2023-12-28 

OKX plans to migrate savings endpoints to the new. The new endpoints have been released in production on 2023/03/15. The corresponding old endpoints will be offline on **2024/01/22**. Please migrate to the new endpoints as soon as possible.

-   Added a new function module [Savings](/docs-v5/en/#rest-api-savings), the relevant endpoints of the savings are adjusted as follows
    -   [Get saving balance](/docs-v5/en/#financial-product-savings-get-saving-balance) adjusted endpoint path from `/api/v5/asset/saving-balance` to `/api/v5/finance/savings/balance`
    -   [Savings purchase/redemption](/docs-v5/en/#financial-product-savings-post-savings-purchase-redemption) adjusted endpoint path from `/api/v5/asset/purchase_redempt` to `/api/v5/finance/savings/purchase-redempt`
    -   [Set lending rate](/docs-v5/en/#financial-product-savings-post-set-lending-rate) adjusted endpoint path from `/api/v5/asset/set-lending-rate` to `/api/v5/finance/savings/set-lending-rate`
    -   [Get lending history](/docs-v5/en/#financial-product-savings-get-lending-history) adjusted endpoint path from `/api/v5/asset/lending-history` to `/api/v5/finance/savings/lending-history`
    -   [Get public borrow info (public)](/docs-v5/en/#financial-product-savings-get-public-borrow-info-public) adjusted endpoint path from `/api/v5/asset/lending-rate-summary` to `/api/v5/finance/savings/lending-rate-summary`
    -   [Get public borrow history (public)](/docs-v5/en/#financial-product-savings-get-public-borrow-history-public) adjusted endpoint path from `/api/v5/asset/lending-rate-history` to `/api/v5/finance/savings/lending-rate-history`

# 2023-12-20 

-   Set one year time range limit for response results

    -   [Get interest accrued data](/docs-v5/en/#trading-account-rest-api-get-interest-accrued-data)

-   Added new response parameter or push data parameter `enabled` to indicate whether the price limit is in force

    -   [Get limit price](/docs-v5/en/#public-data-rest-api-get-limit-price)
    -   [Price limit channel](/docs-v5/en/#public-data-websocket-price-limit-channel)

**Response Parameters**

  -------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------
  enabled                 Boolean                 Whether price limit is effective\
                                                  `true`: the price limit is effective\
                                                  `false`: the price limit is not effective

  -------------------------------------------------------------------------------------------

-   Add new response parameter `method` to distinguish the difference of current period\'s mechanism and cross-period mechanism
    -   [Get funding rate](/docs-v5/en/#public-data-rest-api-get-funding-rate)
    -   [Get funding rate history](/docs-v5/en/#public-data-rest-api-get-funding-rate-history)
    -   [Funding rate channel](/docs-v5/en/#public-data-websocket-funding-rate-channel)

**Response Parameters**

  -------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------
  method                  String                  Funding rate mechanism\
                                                  `current_period`\
                                                  `next_period`

  -------------------------------------------------------------------------

For some altcoins perpetual swaps with significant fluctuations in funding rates, OKX will closely monitor market changes. When necessary, the funding rate collection frequency, currently set at 8 hours, may be adjusted to higher frequencies such as 6 hours, 4 hours, 2 hours, or 1 hour. Thus, users should focus on the difference between `fundingTime` and `nextFundingTime` fields to determine the funding fee interval of a contract.

# 2023-12-12 

-   Added new endpoints to set and get MMP config in block trading
    -   [Set MMP](/docs-v5/en/#block-trading-rest-api-set-mmp)
    -   [Get MMP Config](/docs-v5/en/#block-trading-rest-api-get-mmp-config)

# 2023-12-11 

-   The cancel all after endpoint is now applicable to all users and all trading symbols through order book (except Spread trading)
    -   [POST / Cancel All After](/docs-v5/en/#order-book-trading-trade-post-cancel-all-after)

# 2023-12-07 

-   Added new response parameter:
    -   [Get the user\'s broker rebate information](/docs-v5/broker_en/#fully-disclosed-broker-api-and-oauth-broker-commision-api-get-the-user-39-s-broker-rebate-information)

  Parameter    Type     Description
  ------------ -------- -----------------------------------------------------------------
  lastRebate   String   Account monthly rebate amount. Only applicable to VIP4 and VIP5

# 2023-12-06 

-   The `tag` for block and spread transactions in the below endpoints returns the input `tag` value for block and spread orders. Return \"\" if not populated.

    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)\
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)\
    -   [Get transaction details (last 3 days)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-days)\
    -   [Get transaction details (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-months)\

-   Added new request parameters:

    -   [Close lead or copy position](/docs-v5/en/#order-book-trading-copy-trading-post-close-lead-position)

  -----------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------------------------------------------------------
  ordType           String            No                Order type\
                                                        `market`：Market order, the default value\
                                                        `limit`：Limit order\

  px                String            No                Order price. Only applicable to `limit` order and `SPOT` lead trader\
                                                        If the price is 0, the pending order will be canceled.\
                                                        It is modifying order if you set `px` after placing limit order.
  -----------------------------------------------------------------------------------------------------------------------------

-   Added new request parameters:

    -   [Place lead or copy stop order](/docs-v5/en/#order-book-trading-copy-trading-post-place-lead-stop-order)

  --------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- --------------------------------------------------------------------------------------------
  tpOrdPx           String            No                Take-profit order price\
                                                        If the price is -1, take-profit will be executed at the market price, the default is `-1`\
                                                        Only applicable to `SPOT` lead trader

  slOrdPx           String            No                Stop-loss order price\
                                                        If the price is -1, stop-loss will be executed at the market price, the default is `-1`\
                                                        Only applicable to `SPOT` lead trader
  --------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameter:
    -   [Existing lead or copy positions](/docs-v5/en/#order-book-trading-copy-trading-get-existing-lead-positions)

  Parameter     Type     Description
  ------------- -------- ------------------------------------------
  availSubPos   String   Quantity of positions that can be closed

-   Added new response parameters:

    -   [Lead or copy position history](/docs-v5/en/#order-book-trading-copy-trading-get-lead-position-history)

  ----------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------
  closeSubPos             String                  Quantity of positions that is already closed

  type                    String                  The type of closing position\
                                                  `1`：Close position partially;\
                                                  `2`：Close all
  ----------------------------------------------------------------------------------------------

# 2023-12-05 

-   Newly added endpoints
    -   [Apply for monthly statement](/docs-v5/en/#funding-account-rest-api-apply-for-monthly-statement-last-year)
    -   [Retrieve for monthly statement](/docs-v5/en/#funding-account-rest-api-get-monthly-statement-last-year)

# 2023-12-04 

-   Adjusted response fields in [Status](/docs-v5/en/#status-get-status) and [Status channel](/docs-v5/en/#status-ws-status-channel)\
    Added enumeration value `10`: Spread trading and `11`: Copy trading for `serviceType` field.\
    \

# 2023-11-30 

Contract copy trading was supported in the production environment

-   Added new endpoints and channel

    -   [First copy settings](/docs-v5/en/#order-book-trading-copy-trading-post-first-copy-settings)
    -   [Amend copy settings](/docs-v5/en/#order-book-trading-copy-trading-post-amend-copy-settings)
    -   [Stop copying](/docs-v5/en/#order-book-trading-copy-trading-post-stop-copying)
    -   [Copy settings](/docs-v5/en/#order-book-trading-copy-trading-get-copy-settings)
    -   [Multiple leverages](/docs-v5/en/#order-book-trading-copy-trading-get-multiple-leverages)
    -   [Set Multiple leverages](/docs-v5/en/#order-book-trading-copy-trading-post-set-multiple-leverages)
    -   [My lead traders](/docs-v5/en/#order-book-trading-copy-trading-get-my-lead-traders)
    -   [My history lead traders](/docs-v5/en/#order-book-trading-copy-trading-get-my-history-lead-traders)
    -   [Lead trader ranks](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-ranks)
    -   [Lead trader weekly pnl](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-weekly-pnl)
    -   [Lead trader daily pnl](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-daily-pnl)
    -   [Lead trader stats](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-stats)
    -   [Lead trader currency preferences](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-currency-preferences)
    -   [Lead trader current lead positions](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-current-lead-positions)
    -   [Lead trader lead position history](/docs-v5/en/#order-book-trading-copy-trading-get-lead-trader-lead-position-history)
    -   [Copy trading configuration](/docs-v5/en/#order-book-trading-copy-trading-get-copy-trading-configuration)
    -   [Copy trading notification channel](/docs-v5/en/#order-book-trading-copy-trading-ws-copy-trading-notification-channel)\

-   Added new request parameters and response parameters:

    -   [Get existing leading positions](/docs-v5/en/#order-book-trading-copy-trading-get-existing-lead-positions)

Request parameters

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------------------------------------------------------------------------------------
  uniqueCode        String            No                Lead trader unique code, only applicable to copy trading\
                                                        A combination of case-sensitive alphanumerics, all numbers and the length is 16 characters, e.g. 213E8C92DC61EFAC

  subPosType        String            No                Data type.\
                                                        `lead`: lead trading, the default value\
                                                        `copy`: copy trading
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Response parameters

  Parameter    Type     Description
  ------------ -------- ----------------------------------------------------
  tpOrdPx      String   Take-profit order price, it is -1 for market price
  slOrdPx      String   Stop-loss order price, it is -1 for market price
  margin       String   Margin
  upl          String   Unrealized profit and loss
  uplRatio     String   Unrealized profit and loss ratio
  markPx       String   Latest mark price, only applicable to contract
  uniqueCode   String   Lead trader unique code
  ccy          String   Currency

-   Added new request parameter and response parameters:
    -   [Get lead or copy position history](/docs-v5/en/#oorder-book-trading-copy-trading-get-lead-position-history)

  ------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------
  subPosType        String            No                Data type.\
                                                        `lead`: lead trading, the default value\
                                                        `copy`: copy trading

  ------------------------------------------------------------------------------------------------

Response parameters

  Parameter          Type     Description
  ------------------ -------- --------------------------------------------------------
  margin             String   Margin
  ccy                String   Currency
  markPx             String   Latest mark price, only applicable to contract
  uniqueCode         String   Lead trader unique code
  profitSharingAmt   String   Profit sharing amount, only applicable to copy trading

-   Added new request parameter
    -   [Place leading stop order](/docs-v5/en/#order-book-trading-copy-trading-post-place-lead-stop-order)
    -   [Close leading position](/docs-v5/en/#order-book-trading-copy-trading-post-close-lead-position)

  ------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------
  subPosType        String            No                Data type.\
                                                        `lead`: lead trading, the default value\
                                                        `copy`: copy trading

  ------------------------------------------------------------------------------------------------

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ -------------------------------------------------------------------------------------------------------------
  59263        200                ND brokers need to be on the allowlist to access this feature. Reach out to BD for help.
  59264        200                Spot copy trading isn\'t supported
  59267        200                Cancellation failed as you aren\'t copying this trader
  59268        200                You can\'t copy trades with instId that hasn\'t been selected by the lead trader
  59269        200                This contract lead trader doesn\'t exist
  59270        200                Maximum total amount (copyTotalAmt) can\'t be lower than amount per order (copyAmt) when using fixed amount
  59273        200                You aren\'t a contract copy trader yet. Start by coping a contract trader.
  59275        200                You can\'t copy trade as you\'re applying to become a lead trader
  59276        200                You can\'t copy this lead trader as they\'ve applied to stop leading trades
  59277        200                You can\'t copy this lead trader as they don\'t have any copy trader vacancies
  59278        200                Your request to stop copy trading is being processed. Try again later.
  59279        200                You\'ve already copied this trader
  59280        200                You can\'t modify copy trade settings as you aren\'t copying this trader
  59283        200                Your account isn\'t currently using futures mode
  59130        200                The highest take profit level is {num}%. Enter a smaller number and try again.
  59259        200                Enter a multiplier value that\'s within the valid range
  59285        200                You haven\'t led or copied any trades yet

# 2023-11-22 

-   Added new channel
    -   [ADL warning channel](/docs-v5/en/#public-data-websocket-adl-warning-channel)

\

-   Added new enumeration value for type field
    -   [Get security fund](/docs-v5/en/#public-data-rest-api-get-insurance-fund)

**Request Parameters**

  Parameter   Type     Required   Description
  ----------- -------- ---------- ------------------
  type        String   No         `regular_update`

**Response Parameters**

  Parameter   Type     Description
  ----------- -------- ------------------
  type        String   `regular_update`

The new enumeration value `regular_update` for type field of security fund endpoint is used to present up-to-minute security fund change. The amt field will be used to present the difference of security fund balance when the type field is `liquidation_balance_deposit`, `bankruptcy_loss` or `platform_revenue`, which is generated once per day around 08:00 am (UTC). When type is `regular_update`, the amt field will be returned as \"\".

\

-   Add new response parameters
    -   [Get funding rate](/docs-v5/en/#public-data-rest-api-get-funding-rate)
    -   [Funding rate channel](/docs-v5/en/#public-data-websocket-funding-rate-channel)

  -------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               type                    Description
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------------
  minFundingRate          String                  The lower limit of the predicted funding rate of the next cycle

  maxFundingRate          String                  The upper limit of the predicted funding rate of the next cycle

  settState               String                  Settlement state of funding rate\
                                                  `processing`\
                                                  `settled`

  settFundingRate         String                  If settState = `processing`, it is the funding rate that is being used for current settlement cycle.\
                                                  If settState = `settled`, it is the funding rate that is being used for previous settlement cycle

  ts                      String                  Data return time, Unix timestamp format in milliseconds, e.g. `1597026383085`
  -------------------------------------------------------------------------------------------------------------------------------------------------------

# 2023-11-18 

-   Add enumeration value for alias field
    -   [Get instruments](/docs-v5/en/#public-data-rest-api-get-instruments)
    -   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------------------------------------
  alias                   String                  `this_month` `next_month`\
                                                  **Not recommended for use, users are encouraged to rely on the expTime field to determine the delivery time of the contract**

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

\
**Notice for new monthly futures contracts generation and alias field change**

\

Currently, the BTC/USDT- and BTC/USD-margined futures contracts are different in number from futures contracts in other margins, the supported expiration dates are different, and the rules for contract rotation are also slightly different. As indicated in previous announcement, OKX recommends that users should **use the expTime field** of instruments REST endpoint and WebSocket channel to determine the expiration dates of futures contracts and **disable alias field**.

\

OKX has expanded the available durations for BTC/USDT- and BTC/USD-margined futures contracts to the following: **weekly, bi-weekly, monthly (new duration), bi-monthly (new duration), quarterly, and bi-quarterly** at 8:00 am UTC on November 17, 2023. Before adjustment, we only support the following 4 durations: weekly, bi-weekly, quarterly, and bi-quarterly. Following this adjustment, all the available expiration dates for newly listed contracts will be as follows:

1.  Weekly (this_week): November 24, 2023
2.  Bi-weekly (next_week): December 1, 2023
3.  Monthly (this_month): December 29, 2023. Before adjustment, it is a quarterly contract. If you use the alias field to determine the expiration date, you may mistakenly think that the expiration date is November 24, 2023.
4.  Bi-monthly (next_month): January 26, 2024. Newly listed contract.
5.  Quarterly (quarter): March 29, 2024. Before adjustment, it is a bi-quarterly contract. If you use the alias field to determine the expiration date, you may mistakenly think that the expiration date is December 29, 2023.
6.  Bi-quarterly (next_quarter): June 28, 2024. Newly listed contract.

After adjustment, the alias field of instruments REST endpoint and WebSocket channel will have new enumeration values, `this_month` and `next_month`. For now, the new enumeration values are only applicable to BTC/USDT- and BTC/USD-margined futures contracts. In the future, OKX may expand the available durations for more futures contracts. Please **use the expTime field** of instruments REST endpoint and WebSocket channel to determine the expiration dates of futures contracts and **disable alias field**.

\

For more details, please visit [announcement](https://www.okx.com/help/okx-to-list-bi-monthly-and-bi-quarterly-usdt-and-crypto-margined-futures-for)

# 2023-11-16 

OKX has introduced economic calendar data endpoints to empower users with comprehensive and up-to-minute macroeconomic data.

This feature has been released in production environment and is only supported in production environment.

-   Added new endpoints
    -   [Get economic calendar data](/docs-v5/en/#public-data-rest-api-get-economic-calendar-data)
    -   [Economic calendar data channel](/docs-v5/en/#public-data-websocket-economic-calendar-channel)

# 2023-11-15 

-   Added a new function module [Affiliate](/docs-v5/en/#affiliate)

-   Added enumeration for parameter

    -   [Place recurring buy order](/docs-v5/en/#order-book-trading-recurring-buy-post-place-recurring-buy-order)
    -   [Recurring buy order list](/docs-v5/en/#order-book-trading-recurring-buy-get-recurring-buy-order-list)
    -   [Recurring buy order history](/docs-v5/en/#order-book-trading-recurring-buy-get-recurring-buy-order-history)
    -   [Recurring buy order details](/docs-v5/en/#order-book-trading-recurring-buy-get-recurring-buy-order-details)
    -   [Recurring buy orders channel](/docs-v5/en/#order-book-trading-recurring-buy-ws-recurring-buy-orders-channel)

  -----------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------
  period                  String                  Period\
                                                  `hourly`

  -----------------------------------------------------------------------

-   Added new parameters
    -   [Place recurring buy order](/docs-v5/en/#order-book-trading-recurring-buy-post-place-recurring-buy-order)
    -   [Recurring buy order list](/docs-v5/en/#order-book-trading-recurring-buy-get-recurring-buy-order-list)
    -   [Recurring buy order history](/docs-v5/en/#order-book-trading-recurring-buy-get-recurring-buy-order-history)
    -   [Recurring buy order details](/docs-v5/en/#order-book-trading-recurring-buy-get-recurring-buy-order-details)
    -   [Recurring buy orders channel](/docs-v5/en/#order-book-trading-recurring-buy-ws-recurring-buy-orders-channel)

  -----------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------
  recurringHour           String                  Recurring buy by hourly\
                                                  `1`/`4`/`8`/`12`\
                                                  e.g. 4 represents \"recurring buy every 4 hour\"

  nextInvestTime          String                  Next invest time, Unix timestamp format in milliseconds, e.g. 1597026383085
  -----------------------------------------------------------------------------------------------------------------------------

# 2023-11-13 

-   Added new response parameters
    -   [Get instruments](/docs-v5/en/#public-data-rest-api-get-instruments)

  -------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------
  maxLmtAmt               String                  Max USD amount for a single limit order

  maxMktAmt               String                  Max USD amount for a single market order\
                                                  Only applicable to `SPOT/MARGIN`
  -------------------------------------------------------------------------------------------

-   Added new error code

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ ------------------------------------------------------------
  51185        200                The maximum value allowed per order is {maxOrderValue} USD

# 2023-11-10 

SPOT copy trading was public in production

-   Added enumeration for request parameter:
    -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
    -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)
    -   [Websocket Place order](/docs-v5/en/#order-book-trading-trade-ws-place-order)
    -   [Websocket Place multiple orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)

  --------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- --------------------------------------------------------
  tdMode            String            No                Trade mode\
                                                        `spot_isolated` (only applicable to SPOT lead trading)

  --------------------------------------------------------------------------------------------------------------

-   Added new response parameters\
    -   [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)\

  ---------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------------------------------------------
  spotRoleType            String                  SPOT copy trading role type.\
                                                  `0`: General user；`1`：Leading trader；`2`：Copy trader

  spotTraderInsts         String                  Spot lead trading instruments, only applicable to lead trader
  ---------------------------------------------------------------------------------------------------------------

-   Added new response parameters\
    -   [Get balance](/docs-v5/en/#trading-account-rest-api-get-balance)\
    -   [Get sub-account trading balance](/docs-v5/en/#sub-account-rest-api-get-sub-account-trading-balance)\
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)\

  Parameter       Type     Description
  --------------- -------- --------------------------------------------------------
  \> spotIsoBal   String   SPOT isolated balance. only applicable to copy trading

-   Added enumeration value\
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)\
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)\

  ------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------
  subType           String            No                Bill subtype\
                                                        `280`: SPOT profit sharing expenses; `281`: SPOT profit sharing refund

  ------------------------------------------------------------------------------------------------------------------------------

-   Added new request parameter and response parameter:
    -   [Get existing leading positions](/docs-v5/en/#order-book-trading-copy-trading-get-existing-lead-positions)
    -   [Get leading position history](/docs-v5/en/#order-book-trading-copy-trading-get-lead-position-history)
    -   [Place leading stop order](/docs-v5/en/#order-book-trading-copy-trading-post-place-lead-stop-order)
    -   [Close leading position](/docs-v5/en/#order-book-trading-copy-trading-post-close-lead-position)
    -   [Amend leading instruments](/docs-v5/en/#order-book-trading-copy-trading-post-amend-leading-instruments)
    -   [Get leading instruments](/docs-v5/en/#order-book-trading-copy-trading-get-leading-instruments)
    -   [Get profit sharing details](/docs-v5/en/#order-book-trading-copy-trading-get-profit-sharing-details)
    -   [Get total profit sharing](/docs-v5/en/#order-book-trading-copy-trading-get-total-profit-sharing)
    -   [Get unrealized profit sharing details](/docs-v5/en/#order-book-trading-copy-trading-get-unrealized-profit-sharing-details)

Request parameters

  ------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------
  instType          String            No                Instrument type\
                                                        `SPOT`\
                                                        `SWAP`

  ------------------------------------------------------------------------

Response parameters

  Parameter   Type     Description
  ----------- -------- -----------------
  instType    String   Instrument type

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ ------------------------------------------------------------------------------------------------------------------
  51072        200                As a spot lead trader, you need to set tdMode to \'spot_isolated\' when configured buying lead trade pairs
  51073        200                As a spot lead trader, you need to use \'/copytrading/close-subposition\' for selling assets through lead trades
  51074        200                Only the tdMode for lead trade pairs configured by spot lead traders can be set to \'spot_isolated\'
  59260        200                You are not a spot lead trader yet. Complete the application on our website or app first.
  59262        200                You are not a contract lead trader yet. Complete the application on our website or app first.
  59642        200                Lead and copy traders can only use spot or futures modes
  59643        200                Couldn't switch account modes as you're currently copying spot trades

# 2023-11-08 

-   Added a new function module [ETH Staking](/docs-v5/en/#financial-product-eth-staking)

-   Migrated block trade public transactions old endpoint into a new one and added new response parameters. The request URL of new endpoint is **\"GET /api/v5/public/block-trades\"** and the old one will be offline in **later November**. New response parameters in new endpoint:

    -   [Get block trades](/docs-v5/en/#block-trading-rest-api-get-block-trades)

  -------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -------------------------------------------
  fillVol                 String                  Implied volatility\
                                                  Only applicable to `OPTION`

  fwdPx                   String                  Forward price\
                                                  Only applicable to options

  idxPx                   String                  Index price\
                                                  Applicable to `FUTURES`, `SWAP`, `OPTION`

  markPx                  String                  Mark price\
                                                  Applicable to `FUTURES`, `SWAP`, `OPTION`
  -------------------------------------------------------------------------------------------

\

-   Added new push data parameters
    -   [Public block trades channel](/docs-v5/en/#block-trading-websocket-public-channel-public-block-trades-channel)

  -------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -------------------------------------------
  \> fillVol              String                  Implied volatility\
                                                  Only applicable to `OPTION`

  \> fwdPx                String                  Forward price\
                                                  Only applicable to options

  \> idxPx                String                  Index price\
                                                  Applicable to `FUTURES`, `SWAP`, `OPTION`

  \> markPx               String                  Mark price\
                                                  Applicable to `FUTURES`, `SWAP`, `OPTION`
  -------------------------------------------------------------------------------------------

Split TPs function was launched in production

For placing/amending order, the original TP/SL parameters attached will be hided from the document. Advising you to use new parameters.

-   Add new request parameters:
    -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
    -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter                 Type               Required          Description
  ------------------------- ------------------ ----------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------
  attachAlgoOrds            Array of objects   No                TP/SL information attached when placing order

  \> attachAlgoClOrdId      String             No                Client-supplied Algo ID when placing order attaching TP/SL\
                                                                 A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.\
                                                                 It will be posted to `algoClOrdId` when placing TP/SL order once the general order is filled completely.

  \> tpTriggerPx            String             Conditional       Take-profit trigger price\
                                                                 If you fill in this parameter, you should fill in the take-profit order price as well.

  \> tpOrdPx                String             Conditional       Take-profit order price\
                                                                 If you fill in this parameter, you should fill in the take-profit trigger price as well.\
                                                                 If the price is -1, take-profit will be executed at the market price.

  \> slTriggerPx            String             Conditional       Stop-loss trigger price\
                                                                 If you fill in this parameter, you should fill in the stop-loss order price.

  \> slOrdPx                String             Conditional       Stop-loss order price\
                                                                 If you fill in this parameter, you should fill in the stop-loss trigger price.\
                                                                 If the price is -1, stop-loss will be executed at the market price.

  \> tpTriggerPxType        String             No                Take-profit trigger price type\
                                                                 `last`: last price\
                                                                 `index`: index price\
                                                                 `mark`: mark price\
                                                                 The Default is last

  \> slTriggerPxType        String             No                Stop-loss trigger price type\
                                                                 `last`: last price\
                                                                 `index`: index price\
                                                                 `mark`: mark price\
                                                                 The Default is last

  \> sz                     String             Conditional       Size. Only applicable to TP order of split TPs, and it is required for TP order of split TPs

  \> amendPxOnTriggerType   String             No                Whether to enable Cost-price SL. Only applicable to SL order of split TPs. Whether `slTriggerPx` will move to `avgPx` when the first TP order is triggered\
                                                                 `0`: disable, the default value\
                                                                 `1`: Enable
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Add new request parameters:
    -   [Amend order](/docs-v5/en/#order-book-trading-trade-post-amend-order)
    -   [Amend multiple orders](/docs-v5/en/#order-book-trading-trade-post-amend-multiple-orders)

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter                 Type               Required          Description
  ------------------------- ------------------ ----------------- ----------------------------------------------------------------------------------------------------------
  attachAlgoOrds            Array of objects   No                TP/SL information attached when placing order

  \> attachAlgoId           String             Conditional       The order ID of attached TP/SL order

  \> attachAlgoClOrdId      String             Conditional       Client-supplied Algo ID when placing order attaching TP/SL\
                                                                 A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.\
                                                                 It will be posted to `algoClOrdId` when placing TP/SL order once the general order is filled completely.

  \> newTpTriggerPx         String             Conditional       Take-profit trigger price.\
                                                                 Either the take profit trigger price or order price is 0, it means that the take profit is deleted.\
                                                                 Only applicable to Futures and Perpetual swap.

  \> newTpOrdPx             String             Conditional       Take-profit order price\
                                                                 If the price is -1, take-profit will be executed at the market price.\
                                                                 Only applicable to Futures and Perpetual swap.

  \> newSlTriggerPx         String             Conditional       Stop-loss trigger price\
                                                                 Either the stop loss trigger price or order price is 0, it means that the stop loss is deleted.\
                                                                 Only applicable to Futures and Perpetual swap.

  \> newSlOrdPx             String             Conditional       Stop-loss order price\
                                                                 If the price is -1, stop-loss will be executed at the market price.\
                                                                 Only applicable to Futures and Perpetual swap.

  \> newTpTriggerPxType     String             Conditional       Take-profit trigger price type\
                                                                 `last`: last price\
                                                                 `index`: index price\
                                                                 `mark`: mark price\
                                                                 Only applicable to `FUTURES`/`SWAP`\
                                                                 If you want to add the take-profit, this parameter is required

  \> newSlTriggerPxType     String             Conditional       Stop-loss trigger price type\
                                                                 `last`: last price\
                                                                 `index`: index price\
                                                                 `mark`: mark price\
                                                                 Only applicable to `FUTURES`/`SWAP`\
                                                                 If you want to add the stop-loss, this parameter is required

  \> sz                     String             Conditional       New size. Only applicable to TP order of split TPs, and it is required for TP order of split TPs

  \> amendPxOnTriggerType   String             No                Whether to enable Cost-price SL. Only applicable to SL order of split TPs.\
                                                                 `0`: disable, the default value\
                                                                 `1`: Enable
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Add new response parameters\
    -   [Order details](/docs-v5/en/#order-book-trading-trade-get-order-details)
    -   [Order List](/docs-v5/en/#order-book-trading-trade-get-order-list)
    -   [Order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)
    -   [Order history (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

  ------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter                 Type                    Description
  ------------------------- ----------------------- ----------------------------------------------------------------------------------------------------------
  attachAlgoOrds            Array of objects        TP/SL information attached when placing order

  \> attachAlgoId           String                  The order ID of attached TP/SL order

  \> attachAlgoClOrdId      String                  Client-supplied Algo ID when placing order attaching TP/SL\
                                                    A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.\
                                                    It will be posted to `algoClOrdId` when placing TP/SL order once the general order is filled completely.

  \> tpTriggerPx            String                  Take-profit trigger price.

  \> tpTriggerPxType        String                  Take-profit trigger price type.\
                                                    `last`: last price\
                                                    `index`: index price\
                                                    `mark`: mark price

  \> tpOrdPx                String                  Take-profit order price.

  \> slTriggerPx            String                  Stop-loss trigger price.

  \> slTriggerPxType        String                  Stop-loss trigger price type.\
                                                    `last`: last price\
                                                    `index`: index price\
                                                    `mark`: mark price

  \> slOrdPx                String                  Stop-loss order price.

  \> sz                     String                  Conditional

  \> amendPxOnTriggerType   String                  Whether to enable Cost-price SL. Only applicable to SL order of split TPs.\
                                                    `0`: disable, the default value\
                                                    `1`: Enable
  ------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Add new response parameters\
    -   [Algo order details](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-details)
    -   [Algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)
    -   [Algo order history](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)
    -   [Algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)

  -------------------------------------------------------------------------------------------------------------------------------
  Parameter                 Type                    Description
  ------------------------- ----------------------- -----------------------------------------------------------------------------
  \> amendPxOnTriggerType   String                  Whether to enable Cost-price SL. Only applicable to SL order of split TPs.\
                                                    `0`: disable, the default value\
                                                    `1`: Enable

  -------------------------------------------------------------------------------------------------------------------------------

-   Add new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  51076        200                TP/SL orders in Split TPs only support one-way TP/SL. You can\'t use slTriggerPx&slOrdPx and tpTriggerPx&tpOrdPx at the same time.
  51077        200                You cannot set 'amendPxOnTriggerTyp' as 1 for spot and margin trading
  51078        200                You are a lead trader. Split TPs are not supported.
  51079        200                The number of TP orders with Split TPs attached in a same order cannot exceed {param0}
  51080        200                Take-profit trigger price types (tpTriggerPxType) must be the same in an order with Split TPs attached
  51081        200                Take-profit trigger prices (tpTriggerPx) cannot be the same in an order with Split TPs attached
  51082        200                TP trigger prices (tpOrdPx) in one order with multiple TPs must be market prices.
  51083        200                The total size of TP orders with Split TPs attached in a same order should equal the size of this order
  51084        200                The number of SL orders with Split TPs attached in a same order cannot exceed {param0}
  51085        200                The number of TP orders cannot be less than 2 when cost-price SL is enabled (amendPxOnTriggerType set as 1) for Split TPs
  51086        200                The number of orders with Split TPs attached in a same order cannot exceed {param0}
  51538        200                You need to use attachAlgoOrds if you used attachAlgoOrds when placing an order. attachAlgoOrds is not supported if you did not use attachAlgoOrds when placing this order.
  51539        200                attachAlgoId or attachAlgoClOrdId cannot be identical when modifying any TP/SL within your split TPs order
  51527        200                Order modification failed. At least 1 of the attached TP/SL orders does not exist.
  51089        200                The size of the TP order among split TPs attached cannot be empty

# 2023-11-07 

**Spread trading supports IOC orders**

-   Added new enum value for request parameter ordType
    -   [Place order](/docs-v5/en/#spread-trading-rest-api-place-order)
    -   [Get orders (last 21 days)](/docs-v5/en/#spread-trading-rest-api-get-orders-last-21-days)

  Parameter   Type     Required   Description
  ----------- -------- ---------- ----------------------------------
  ordType     String   No         `ioc`: Immediate-or-cancel order

-   Added new enum value for response parameter ordType
    -   [Get order details](/docs-v5/en/#spread-trading-rest-api-get-order-details)
    -   [Get active orders](/docs-v5/en/#spread-trading-rest-api-get-active-orders)
    -   [Get orders (last 21 days)](/docs-v5/en/#spread-trading-rest-api-get-orders-last-21-days)
    -   [Order channel](/docs-v5/en/#spread-trading-websocket-private-channel-order-channel)

  Parameter   Type     Description
  ----------- -------- ----------------------------------
  ordType     String   `ioc`: Immediate-or-cancel order

-   Added new enum value for response parameter cancelSource
    -   [Get orders (last 21 days)](/docs-v5/en/#spread-trading-rest-api-get-orders-last-21-days)
    -   [Order channel](/docs-v5/en/#spread-trading-websocket-private-channel-order-channel)

  Parameter      Type     Description
  -------------- -------- ------------------------------------------------------------------------------------
  cancelSource   String   `14`: Order canceled: IOC order was partially canceled due to incompletely filled.

# 2023-11-02 

-   Added new parameters
    -   [Get convert history](/docs-v5/en/#funding-account-rest-api-get-convert-history)

  Parameters   Type     Description
  ------------ -------- -------------------------------------------
  clTReqId     String   Client Order ID as assigned by the client

# 2023-11-01 

-   Added new response parameter and push data parameter
    -   [Get rfqs](/docs-v5/en/#block-trading-rest-api-get-rfqs)
    -   [Rfqs channel](/docs-v5/en/#block-trading-websocket-private-channel-rfqs-channel)

  ---------------------------------------------------------------------------------------------------
  Parameters              Type                    Description
  ----------------------- ----------------------- ---------------------------------------------------
  flowType                String                  Identify the type of the RFQ.\
                                                  Only applicable to Makers, return \"\" for Takers

  ---------------------------------------------------------------------------------------------------

-   Added new response parameters
    -   [Get sub-account list (ND)](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-sub-account-list)

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameters              Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------------------------------------------
  \> enable               Boolean                 Sub-account status\
                                                  `true`: normal\
                                                  `false`: frozen

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
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameters
    -   [Get sub-account list](/docs-v5/en/#sub-account-rest-api-get-sub-account-list)

  -----------------------------------------------------------------------
  Parameters              Type                    Description
  ----------------------- ----------------------- -----------------------
  frozenFunc              Array of strings        Frozen functions\
                                                  `trading`\
                                                  `convert`\
                                                  `transfer`\
                                                  `withdrawal`\
                                                  `deposit`\
                                                  `flexible_loan`

  -----------------------------------------------------------------------

-   Added connId field for WebSocket event response message to help users target a specific WebSocket connection

  Parameter   Type     Required   Description
  ----------- -------- ---------- -------------------------
  connId      String   Yes        WebSocket connection ID

# 2023-10-31 

-   Added a new WebSocket channel for spread trading amend order. This endpoint is now only applicable to whitelisted users.
    -   [Amend order](/docs-v5/en/#spread-trading-websocket-trade-api-ws-amend-order)

# 2023-10-27 

-   Fee rates endpoint adjustment\

In order to improve market liquidity and improve the overall user experience, OKX adjusted the rules of trading fee rates between **7:00--9:00 am UTC on Oct. 27, 2023**.\
At the same time, [Get fee rates](/docs-v5/en/#trading-account-rest-api-get-fee-rates) was affected and have adjustment as following:\
\

Note:\
1. Only the **SPOT/MARGIN** response fields was **affected**, `FUTURES`/`SWAP`/`OPTION` response fields wasn\'t affected.\
2. For `SPOT`/`MARGIN`, the fee rate of the **USDⓈ&Crypto trading pairs** was returned by **takerUSDC/makerUSDC** rather than taker/maker after the adjustment.\
\

Before:\

  ----------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------
  taker                   String                  For `SPOT`/`MARGIN`, it is taker fee rate of the USDT&USDⓈ&Crypto trading pairs.\
                                                  For `FUTURES`/`SWAP`/`OPTION`, it is the fee rate of crypto-margined contracts

  maker                   String                  For `SPOT`/`MARGIN`, it is maker fee rate of the USDT&USDⓈ&Crypto trading pairs.\
                                                  For `FUTURES`/`SWAP`/`OPTION`, it is the fee rate of crypto-margined contracts

  takerUSDC               String                  Taker fee rate for the USDC trading pairs(`SPOT/MARGIN`) and contracts(`FUTURES/SWAP`)

  makerUSDC               String                  Maker fee rate for the USDC trading pairs(`SPOT/MARGIN`) and contracts(`FUTURES/SWAP`)
  ----------------------------------------------------------------------------------------------------------------------------------------

After:\

  ----------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ----------------------------------------------------------------------------------
  taker                   String                  For `SPOT`/`MARGIN`, it is taker fee rate of the **USDT trading pairs**.\
                                                  For `FUTURES`/`SWAP`/`OPTION`, it is the fee rate of crypto-margined contracts

  maker                   String                  For `SPOT`/`MARGIN`, it is maker fee rate of the **USDT trading pairs**.\
                                                  For `FUTURES`/`SWAP`/`OPTION`, it is the fee rate of crypto-margined contracts

  takerUSDC               String                  For `SPOT`/`MARGIN`, it is taker fee rate of the **USDⓈ&Crypto trading pairs**.\
                                                  For `FUTURES`/`SWAP`, it is the fee rate of USDC-margined contracts

  makerUSDC               String                  For `SPOT`/`MARGIN`, it is maker fee rate of the **USDⓈ&Crypto trading pairs**.\
                                                  For `FUTURES`/`SWAP`, it is the fee rate of USDC-margined contracts

  fiat                    Array                   Details of fiat fee rate

  \> ccy                  String                  Fiat currency.

  \> taker                String                  Taker fee rate

  \> maker                String                  Maker fee rate
  ----------------------------------------------------------------------------------------------------------------------------------

USDⓈ represent the stablecoin besides USDT

-   Adjusted request parameters
    -   [Set trading fee rate for the sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-set-trading-fee-rate-for-the-sub-account)

Before:

  ---------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------
  quoteCcyType      String            No                Quote currency type\
                                                        `2`: USDT/USDⓈ/Crypto\
                                                        `3`: USDC\
                                                        Applicated to `SPOT`\
                                                        When specifying this parameter, `instType` is required.

  ---------------------------------------------------------------------------------------------------------------

After:

  ---------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------
  quoteCcyType      String            No                Quote currency type\
                                                        `2`: USDT\
                                                        `3`: USDⓈ/Crypto\
                                                        Applicated to `SPOT`\
                                                        When specifying this parameter, `instType` is required.

  ---------------------------------------------------------------------------------------------------------------

# 2023-10-24 

-   Added a new endpoint for spread trading amend order. This endpoint is now only applicable to whitelisted users.
    -   [Amend order](/docs-v5/en/#spread-trading-rest-api-amend-order)

# 2023-10-19 

-   Added a new function \[Download the transaction details in the past 2 years\]
    -   [Apply for transaction details](/docs-v5/en/#order-book-trading-trade-post-transaction-details-in-the-past-2-years)
    -   [Get transaction details](/docs-v5/en/#order-book-trading-trade-get-transaction-details-in-the-past-2-years)

# 2023-10-18 

-   Trades channel adjustment, aggregate trades per taker order, per filled price

    -   [WS / Trades channel](/docs-v5/en/#order-book-trading-market-data-ws-trades-channel)

-   Added a new function module [Signal bot trading](/docs-v5/en/#order-book-trading-signal-bot-trading)

-   Added response parameters

    -   [Get download link (ND)](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-download-link-nd)
    -   [Get download link (FD)](/docs-v5/broker_en/#fully-disclosed-broker-api-and-oauth-broker-commision-api-get-download-link-fd)

  Parameter   Type     Description
  ----------- -------- --------------------------------------------------------------------------------------------------
  beginTime   String   Rebate record begin time, Unix timestamp format in milliseconds, e.g. `1597026383085`
  endTime     String   Rebate record end time, Unix timestamp format in milliseconds, e.g. `1597026383085`
  cTime       String   Generate download link request time, Unix timestamp format in milliseconds, e.g. `1597026383085`

-   Added new endpoint

    -   [Report sub-account IP](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-report-sub-account-ip)

-   Added request parameters

    -   [Create sub-account (ND)](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-create-sub-account)

  ---------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------
  clientIP          String            No                Sub-account register IP\
                                                        Please use ND server IP for non personal accounts

  ---------------------------------------------------------------------------------------------------------

-   Added enumeration value for cancelSource field
    -   [WS / Order channel](/docs-v5/en/#order-book-trading-trade-post-cancel-all-after)

  Parameter         Type     Description
  ----------------- -------- -----------------------------------------------------------------------------
  \> cancelSource   String   `33`: The order exceeds the maximum number of order matches per taker order

-   Added new error code\

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ --------------------------------------------------------------
  51088        200                You can only place 1 TP/SL order to close an entire position

-   Added response parameter\

    -   [Get positions](/docs-v5/en/#trading-account-rest-api-get-positions)\
    -   [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)\

  Parameter   Type     Description
  ----------- -------- -----------------
  bePx        String   Breakeven price

# 2023-09-29 

-   Added new request parameters
    -   [Unit convert](/docs-v5/en/#public-data-rest-api-unit-convert)

  ----------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------
  opType            String            No                Order type\
                                                        `open`: round down sz when opening positions\
                                                        `close`: round sz to the nearest when closing positions\
                                                        The default is `close`\
                                                        Applicable to `FUTURES` `SWAP`

  ----------------------------------------------------------------------------------------------------------------

# 2023-09-28 

-   Adjusted trading restriction

To ensure the high performance of the trading system and provide users with a better trading experience, OKX has adjusted trading restriction that the maximum number of maker orders that can be matched with a taker order cannot exceed **1000**.

\

When the number of maker orders matched with a taker order exceeds **the maximum number limit of 1000**, the taker order will be canceled:

1.  The limit orders will only be executed with a portion corresponding to **1000** maker orders and the remainder will be canceled.
2.  Fill or Kill (FOK) orders will be canceled directly.

# 2023-09-27 

-   Adjust parameter
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

Before:

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \> amendResult          String                  The result of amending the order\
                                                  `-1`: failure\
                                                  `0`: success\
                                                  `1`: Automatic cancel (due to failed amendment)\
                                                  When amending the order through API and the amendment failed, `-1` will be returned if `cxlOnFail` is set to `false`. Otherwise `1` will be returned if `cxlOnFail` is set to `true`.\
                                                  When amending the order through Web/APP and the amendment failed, `-1` will be returned.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

After:

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \> amendResult          String                  The result of amending the order\
                                                  `-1`: failure\
                                                  `0`: success\
                                                  `1`: Automatic cancel (due to failed amendment)\
                                                  `2`: Automatic amendation successfully, only applicable to pxVol and pxUsd orders of Option.\
                                                  When amending the order through API and the amendment failed, `-1` will be returned if `cxlOnFail` is set to `false`. Otherwise `1` will be returned if `cxlOnFail` is set to `true`.\
                                                  When amending the order through Web/APP and the amendment failed, `-1` will be returned.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2023-09-20 

-   Added response parameters, the new fields will be applicable to both success and failure responses of those endpoints below

    -   [POST / Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
    -   [POST / Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
    -   [POST / Cancel order](/docs-v5/en/#order-book-trading-trade-post-cancel-order)
    -   [POST / Cancel multiple orders](/docs-v5/en/#order-book-trading-trade-post-cancel-multiple-orders)
    -   [POST / Amend order](/docs-v5/en/#order-book-trading-trade-post-amend-order)
    -   [POST / Amend multiple orders](/docs-v5/en/#order-book-trading-trade-post-amend-multiple-orders)
    -   [WS / Place order](/docs-v5/en/#order-book-trading-trade-ws-place-order)
    -   [WS / Place multiple orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)
    -   [WS / Cancel order](/docs-v5/en/#order-book-trading-trade-ws-cancel-order)
    -   [WS / Cancel multiple orders](/docs-v5/en/#order-book-trading-trade-ws-cancel-multiple-orders)
    -   [WS / Amend order](/docs-v5/en/#order-book-trading-trade-ws-amend-order)
    -   [WS / Amend multiple orders](/docs-v5/en/#order-book-trading-trade-ws-amend-multiple-orders)

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------------------------------------------
  inTime                  String                  Timestamp at Websocket / REST gateway when the request is received, Unix timestamp format in microseconds, e.g. `1597026383085123`\
                                                  For REST, the time is recorded after authentication.

  outTime                 String                  Timestamp at Websocket / REST gateway when the response is sent, Unix timestamp format in microseconds, e.g. `1597026383085123`
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added response parameters
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------
  interest                String                  Interest

  tag                     String                  Order tag

  fillTime                String                  Last filled time

  tradeId                 String                  Last traded ID

  clOrdId                 String                  Client Order ID as assigned by the client\
                                                  A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.

  fillIdxPx               String                  Index price at the moment of trade execution\
                                                  For cross currency spot pairs, it returns baseCcy-USDT index price. For example, for LTC-ETH, this field returns the index price of LTC-USDT.

  fillMarkPx              String                  Mark price when filled\
                                                  Applicable to FUTURES/SWAP/OPTIONS, return \"\" for other instrument types

  fillPxVol               String                  Implied volatility when filled\
                                                  Only applicable to options; return \"\" for other instrument types

  fillPxUsd               String                  Options price when filled, in the unit of USD\
                                                  Only applicable to options; return \"\" for other instrument types

  fillMarkVol             String                  Mark volatility when filled\
                                                  Only applicable to options; return \"\" for other instrument types

  fillFwdPx               String                  Forward price when filled\
                                                  Only applicable to options; return \"\" for other instrument types
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added push data parameter
    -   [Balance and position channel](/docs-v5/en/#trading-account-websocket-balance-and-position-channel)

  Parameter      Type               Description
  -------------- ------------------ --------------------------------
  data           Array of objects   Subscribed data
  \> trades      Array of objects   Details of trade
  \>\> instId    String             Instrument ID, e.g. `BTC-USDT`
  \>\> tradeId   String             Trade ID

-   Added new parameters for `trigger order`
    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)
    -   [Algo order details](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-details)
    -   [Algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)
    -   [Algo order history](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)
    -   [Algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)

  --------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------------------------------------------------------------
  attachAlgoOrds          Array of objects        Attached SL/TP orders info\
                                                  Applicable to `Futures mode/Multi-currency margin/Portfolio margin`

  \> attachAlgoClOrdId    String                  Client-supplied Algo ID when placing order attaching TP/SL.\
                                                  A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.\
                                                  It will be posted to algoClOrdId when placing TP/SL order once the general order is filled completely.

  \> tpTriggerPx          String                  Take-profit trigger price\
                                                  If you fill in this parameter, you should fill in the take-profit order price as well.

  \> tpTriggerPxType      String                  Take-profit trigger price type\
                                                  \
                                                  `last`: last price\
                                                  `index`: index price\
                                                  `mark`: mark price\
                                                  The Default is `last`

  \> tpOrdPx              String                  Take-profit order price\
                                                  If you fill in this parameter, you should fill in the take-profit trigger price as well.\
                                                  If the price is `-1`, take-profit will be executed at the market price.

  \> slTriggerPx          String                  Stop-loss trigger price\
                                                  If you fill in this parameter, you should fill in the stop-loss order price.

  \> slTriggerPxType      String                  Stop-loss trigger price type\
                                                  `last`: last price\
                                                  `index`: index price\
                                                  `mark`: mark price\
                                                  The Default is `last`

  \> slOrdPx              String                  Stop-loss order price\
                                                  If you fill in this parameter, you should fill in the stop-loss trigger price.\
                                                  If the price is `-1`, stop-loss will be executed at the market price.
  --------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new parameters for `trailing stop order`
    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)
    -   [Advance algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-advance-algo-orders-channel)

  -------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------------
  reduceOnly              Boolean                 Whether the order can only reduce the position size.\
                                                  Valid options: `true` or `false`. The default value is `false`.\
                                                  This parameter is only valid in the `FUTRUES`/`SWAP` net mode, and is ignored in the long/short mode.

  -------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new enum value
    -   [Order details](/docs-v5/en/#order-book-trading-trade-get-order-details)
    -   [Order List](/docs-v5/en/#order-book-trading-trade-get-order-list)
    -   [Order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)
    -   [Order history (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

  --------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------------------
  source                  String                  Order source\
                                                  `6`: The normal order triggered by the `trigger order`\
                                                  `7`:The normal order triggered by the `TP/SL order`\
                                                  `25`:The normal order triggered by the `trailing stop order`

  --------------------------------------------------------------------------------------------------------------

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ --------------------------------------------------------------------------------------------
  51333        200                Close position order in hedge-mode or reduce-only order in one-way mode cannot attach TPSL

# 2023-09-13 

-   Add request and response parameters\

    -   [Place leading stop order](/docs-v5/en/#order-book-trading-copy-trading-post-place-lead-stop-order)
    -   [Close leading position](/docs-v5/en/#order-book-trading-copy-trading-post-close-lead-position)

  ----------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------------
  tag               String            No                Order tag\
                                                        A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 16 characters.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------

-   Add request parameters\
    -   [Get existing leading positions](/docs-v5/en/#order-book-trading-copy-trading-get-existing-lead-positions)

  Parameter   Type     Required   Description
  ----------- -------- ---------- -----------------------------------------------------------------------------
  after       String   No         Pagination of data to return records earlier than the requested `subPosId`.
  before      String   No         Pagination of data to return records newer than the requested `subPosId`.
  limit       String   No         Number of results per request. Maximum is 500. Default is 500.

-   Add restriction of the last 3 months
    -   [Get profit sharing details](/docs-v5/en/#order-book-trading-copy-trading-get-profit-sharing-details)

# 2023-09-08 

**For placing orders endpoints:**

-   Adjust and add request parameters
    -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
    -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
    -   [Place order (websocket)](/docs-v5/en/#order-book-trading-trade-ws-place-order)
    -   [Place multiple orders (websocket)](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)

Before:

  Parameter   Type     Required      Description
  ----------- -------- ------------- --------------------------------------------------------------------------
  px          String   Conditional   Order price. Only applicable to `limit`, `post_only`, `fok`, `ioc` order

After:

  ------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------------------------------
  px                String            Conditional       Order price. Only applicable to `limit`, `post_only`, `fok`, `ioc` order\
                                                        When placing an option order, one of px/pxUsd/pxVol must be filled in, and only one can be filled in

  ------------------------------------------------------------------------------------------------------------------------------------------------------------

Add request parameters

  ------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------------------------------
  pxUsd             String            Conditional       Place options orders in `USD`\
                                                        Only applicable to options\
                                                        When placing an option order, one of px/pxUsd/pxVol must be filled in, and only one can be filled in

  pxVol             String            Conditional       Place options orders based on implied volatility, where 1 represents 100%\
                                                        Only applicable to options\
                                                        When placing an option order, one of px/pxUsd/pxVol must be filled in, and only one can be filled in
  ------------------------------------------------------------------------------------------------------------------------------------------------------------

**For amending orders endpoints:**

-   Adjust and add request parameters
    -   [Amend order](/docs-v5/en/#order-book-trading-trade-post-amend-order)
    -   [Amend multiple orders](/docs-v5/en/#order-book-trading-trade-post-amend-multiple-orders)
    -   [Amend order (websocket)](/docs-v5/en/#order-book-trading-trade-ws-amend-order)
    -   [Amend multiple orders(websocket)](/docs-v5/en/#order-book-trading-trade-ws-amend-multiple-orders)

Before:

  Parameter   Type     Required      Description
  ----------- -------- ------------- ---------------------------
  newPx       String   Conditional   New price after amendment

After:

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  newPx             String            Conditional       New price after amendment\
                                                        When modifying options orders, users can only fill in one of the following: newPx, newPxUsd, or newPxVol. It must be consistent with parameters when placing orders. For example, if users placed the order using px, they should use newPx when modifying the order.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Add request parameters

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------------------------------------------------------------------------------------------
  newPxUsd          String            Conditional       Modify options orders using USD prices\
                                                        Only applicable to options.\
                                                        When modifying options orders, users can only fill in one of the following: newPx, newPxUsd, or newPxVol.

  newPxVol          String            Conditional       Modify options orders based on implied volatility, where 1 represents 100%\
                                                        Only applicable to options.\
                                                        When modifying options orders, users can only fill in one of the following: newPx, newPxUsd, or newPxVol.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2023-08-31 

**Added new trading restriction**

\

To ensure the high performance of the trading system and provide users with a better trading experience, OKX has now added a new trading restriction that the maximum number of maker orders that can be matched with a taker order cannot exceed 256.

\

When the number of maker orders matched with a taker order exceeds **the maximum number limit of 256**, the taker order will be canceled:

1.  The limit orders will only be executed with a portion corresponding to 256 maker orders and the remainder will be canceled.
2.  Fill or Kill (FOK) orders will be canceled directly.

\

When order is canceled due to this, users can get `cancelSource = "0"` and `cancelSourceReason = "Order was canceled by system"` through the endpoints below:

-   [GET / Order details](/docs-v5/en/#order-book-trading-trade-get-order-details)
-   [GET / Order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)

\

They can also receive `cancelSource = "0"` through the following WebSocket channel:

-   [WS / Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

\

In the future, in order to adapt to more scenarios where orders are canceled due to improve trading system performance, the `cancelSource` and `cancelSourceReason` of this reason may be modified:

-   cancelSource = \"33\"
-   cancelSourceReason = \"The taker order was canceled because it exceeded the maximum number of maker orders matched\"

# 2023-08-30 

**For order details, list and history endpoints:**

-   Adjusted and added request parameters
    -   [Get order details](/docs-v5/en/#order-book-trading-trade-get-order-details)
    -   [Get order list](/docs-v5/en/#order-book-trading-trade-get-order-list)
    -   [Get order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)
    -   [Get order history (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)

Before:

  Parameter   Type     Description
  ----------- -------- -------------
  px          String   Price

After:

  -----------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------
  px                      String                  Price\
                                                  For options, use coin as unit (e.g. BTC, ETH)

  -----------------------------------------------------------------------------------------------

Added response parameters

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------------------------
  pxUsd                   String                  Options price in `USD`Only applicable to options; return \"\" for other instrument types

  pxVol                   String                  Implied volatility of the options orderOnly applicable to options; return \"\" for other instrument types

  pxType                  String                  Price type of options\
                                                  `px`: Place an order based on price, in the unit of coin (the unit for the request parameter px is BTC or ETH)\
                                                  `pxVol`: Place an order based on pxVol\
                                                  `pxUsd`: Place an order based on pxUsd, in the unit of USD (the unit for the request parameter px is USD)
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Add new enumeration value for `amendSource`
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \> amendSource          String                  Source of the order amendation.\
                                                  `1`: Order amended by user\
                                                  `2`: Order amended by user, but the order quantity is overriden by system due to reduce-only\
                                                  `3`: New order placed by user, but the order quantity is overriden by system due to reduce-only\
                                                  `4`: Order amended by system due to other pending orders\
                                                  `5`: Order modification due to changes in options px, pxVol, or pxUsd as a result of following variations. For example, when iv = 60, USD and px are anchored at iv = 60, the changes in USD or px lead to modification.

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

For transaction details endpoints:

-   Added response parameters
    -   [Get transaction details (last 3 days)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-days)
    -   [Get transaction details (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-months)
    -   [Order channel](/docs-v5/zh/#order-book-trading-trade-ws-order-channel)

  --------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------------------------
  fillPxVol               String                  Implied volatility when filled\
                                                  Only applicable to options; return \"\" for other instrument types

  fillPxUsd               String                  Options price when filled, in the unit of USD\
                                                  Only applicable to options; return \"\" for other instrument types

  fillMarkVol             String                  Mark volatility when filled\
                                                  Only applicable to options; return \"\" for other instrument types

  fillFwdPx               String                  Forward price when filled\
                                                  Only applicable to options; return \"\" for other instrument types

  fillMarkPx              String                  Mark price when filled\
                                                  Applicable to `FUTURES`, `SWAP`, `OPTION`
  --------------------------------------------------------------------------------------------------------------------

Added new error codes

  Error code   HTTP Status Code   Error Message
  ------------ ------------------ ----------------------------------------------------------------------------------------------------------------------
  51175        200                Parameters {param0} {param1} and {param2} cannot be empty at the same time
  51176        200                Only one parameter can be filled among Parameters {param0} {param1} and {param2}
  51177        200                Unavailable to amend {param1} because the price type of the current options order is {param0}
  51179        200                Unavailable to place options orders using {param0} in simple mode
  51180        200                The range of {param0} should be ({param1}, {param2})
  51181        200                ordType must be limit when placing {param0} orders
  51182        200                The total number of pending orders under price types pxUsd and pxVol for the current account cannot exceed {param0}.
  51536        200                Unable to modify the size of the options order if the price type is pxUsd or pxVol
  51537        200                pxUsd or pxVol are not supported by non-options instruments

-   Added response parameters\

    -   [Get positions](/docs-v5/en/#trading-account-rest-api-get-positions)\
    -   [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)\

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------------------
  realizedPnl             String                  Realized profit and loss

  pnl                     String                  Accumulated pnl of closing order(s)

  fee                     String                  Accumulated fee\
                                                  Negative number represents the user transaction fee charged by the platform.Positive number represents rebate.

  fundingFee              String                  Accumulated funding fee

  liqPenalty              String                  Accumulated liquidation penalty. It is negative when there is a value.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added response parameters\
    -   [Get positions history](/docs-v5/en/#trading-account-rest-api-get-positions-history)\

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------------------
  realizedPnl             String                  Realized profit and loss

  fee                     String                  Accumulated fee\
                                                  Negative number represents the user transaction fee charged by the platform.Positive number represents rebate.

  fundingFee              String                  Accumulated funding fee

  liqPenalty              String                  Accumulated liquidation penalty. It is negative when there is a value.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Adjusted the request parameter.
    -   [Cancel all after](/docs-v5/en/#order-book-trading-trade-post-cancel-all-after)

before:\

  -----------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------------------------------------------------
  timeOut           String            Yes               The countdown for order cancellation, with second as the unit.\
                                                        Range of value can be 0, \[5, 120\].\
                                                        Setting timeOut to 0 disables Cancel All After.

  -----------------------------------------------------------------------------------------------------------------------

after:\

  -----------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------------------------------------------------
  timeOut           String            Yes               The countdown for order cancellation, with second as the unit.\
                                                        Range of value can be 0, \[10, 120\].\
                                                        Setting timeOut to 0 disables Cancel All After.

  -----------------------------------------------------------------------------------------------------------------------

-   New WebSocket channel
    -   [All trades channel](/docs-v5/en/#order-book-trading-market-data-ws-all-trades-channel)

# 2023-08-23 

-   Added new parameters
    -   [Get daily rebate records](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-daily-rebate-records)

#### Request Parameters 

  Parameter   Type     Required   Description
  ----------- -------- ---------- -----------------------------------------------------------------------------------------------------------------------
  beginTime   String   No         Begin time, Unix timestamp format in milliseconds, e.g. `1597026383085` , search data after `1597026383085` (include)
  endTime     String   No         End time, Unix timestamp format in milliseconds, e.g. `1597026383085` , search data before `1597026383085` (exclude)

#### Response Parameters 

  **Parameter**   **Type**   **Description**
  --------------- ---------- --------------------------------------------------------------------------
  \> rebateTime   String     Rebate time, Unix timestamp format in milliseconds, e.g. `1597026383085`

Return results in reverse chronological order\

# 2023-08-22 

-   Added new endpoints

    -   [Get exchange list (public)](/docs-v5/en/#funding-account-rest-api-get-exchange-list-public)

-   Added new response parameters

    -   [Withdrawal](/docs-v5/en/#funding-account-rest-api-withdrawal)
    -   [Lightning withdrawals](/docs-v5/en/#funding-account-rest-api-lightning-withdrawals)

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter          Type              Required          Description
  ------------------ ----------------- ----------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------
  rcvrInfo           Object            Conditional       Receiver\'s info\
                                                         Specific country/region certified users need to provide this information for on-chain withdrawal

  \> walletType      String            Yes               Wallet Type\
                                                         `exchange`：Withdraw to exchange wallet\
                                                         `private`：Withdraw to private wallet\
                                                         If you withdraw to exchange wallet,`exchId`&`rcvrFirstName`&`rcvrLastName` is required\
                                                         If you withdraw to private wallet, no additional information is required

  \> exchId          String            Conditional       Exchange ID\
                                                         You can query supported exchanges through the endpoint of [Get exchange list (public)](/docs-v5/en/#funding-account-rest-api-get-exchange-list-public)\
                                                         If the exchange is not in the exchange list, fill in \'0\' in this field

  \> rcvrFirstName   String            Conditional       Receiver\'s first name, e.g. `Bruce`

  \> rcvrLastName    String            Conditional       Receiver\'s last name, e.g. `Wayne`
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  58237        200                As required by local laws and regulations, you need to provide the \"rcvrInfo\". If you\'re withdrawing to an exchange platform, provide the info of the exchange and the recipient.
  58238        200                Incomplete info. The info of the exchange and the recipient are required if you\'re withdrawing to an exchange platform.

# 2023-08-16 

-   Added new response parameters\
    -   [Get balance](/docs-v5/en/#trading-account-rest-api-get-balance)\
    -   [Get sub-account trading balance](/docs-v5/en/#sub-account-rest-api-get-sub-account-trading-balance)\
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)\

  -------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------------
  \> borrowFroz           String                  Potential borrowing IMR of the account in `USD`\
                                                  Only applicable to `Multi-currency margin` and `Portfolio margin`. It is \"\" for other margin modes.

  \>\> borrowFroz         String                  Potential borrowing IMR of the currency in `USD`\
                                                  Only applicable to `Multi-currency margin` and `Portfolio margin`. It is \"\" for other margin modes.
  -------------------------------------------------------------------------------------------------------------------------------------------------------

-   Adjusted response parameters:
    -   [Get instruments](/docs-v5/en/#public-data-rest-api-get-instruments)
    -   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)

Before:

  -------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------
  \> expTime              String                  Expiry time\
                                                  Only applicable to `FUTURES/OPTION`

  -------------------------------------------------------------------------------------

After:

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \> expTime              String                  Expiry time\
                                                  Applicable to `SPOT/MARGIN/FUTURES/SWAP/OPTION`. For `FUTURES/OPTION`, it is the delivery/exercise time. It can also be the delisting time of the trading instrument. Update once change.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Optimization for Margin when closing position.

-   Added new request parameters\
    -   [Get maximum available balance/equity](/docs-v5/en/#trading-account-rest-api-get-maximum-available-balance-equity)\

  ---------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------
  px                String            No                The available amount corresponds to price of close position.\
                                                        Only applicable to reduceOnly `MARGIN`.

  ---------------------------------------------------------------------------------------------------------------------

-   Adjusted response parameter description\

    -   [Get positions](/docs-v5/en/#trading-account-rest-api-get-positions)\
    -   [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)\

Before:

  -----------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------------
  availPos                String                  Position that can be closed\
                                                  Only applicable to `MARGIN`, `FUTURES/SWAP` in the `long-short` mode and `OPTION`

  -----------------------------------------------------------------------------------------------------------------------------------

After:

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  availPos                String                  Position that can be closed\
                                                  Only applicable to `MARGIN`, `FUTURES/SWAP` in the `long-short` mode and `OPTION`.\
                                                  For `Margin` position, the rest of sz will be `SPOT` trading after the liability is repaid while closing the position. Please get the available reduce-only amount from \"Get maximum available tradable amount\" if you want to reduce the amount of `SPOT` trading as much as possible.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Error code update
    -   Stop using error codes 51401, 51402, 51509 and 51510
    -   Consolidate error codes 51401 and 51402 into **51400**, 51509 and 51510 into **51503**
    -   The updated error messages of 51400 and 51503 are shown below.

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ -------------------------------------------------------------------------------------
  51400        200                Cancellation failed as the order has been filled, canceled or does not exist.
  51503        200                Order modification failed as the order has been filled, canceled or does not exist.

-   Added description about 1s candlestick supported
    -   [Get candlesticks history](/docs-v5/en/#order-book-trading-market-data-get-candlesticks-history)\
    -   [Candlesticks channel](/docs-v5/en/#order-book-trading-market-data-ws-candlesticks-channel)\

# 2023-08-14 

**Adjustment to pending order limit for trading symbols**

After the adjustment, **the maximum number of pending orders per trading symbol is 500**. For example, for the perpetual swap contract BTC-USDT-SWAP, the futures contract BTC-USDT-230707, and the spot BTC-USDT, each supports a maximum of 500 pending orders.

The maximum number of pending orders per account remains unchanged at 4000. The existing rules for options trading are not changed. For users who have more than 500 orders for a trading symbol, the new limit does not affect existing orders. However, users are not able to place new orders for that trading symbol until some of the existing orders are filled or canceled so that the number of pending orders for the trading symbol is below the limit.

The limit of 500 pending orders applies to the following **order types**:

-   Limit
-   Market
-   Post only
-   Fill or Kill (FOK)
-   Immediate or Cancel (IOC)
-   Market order with Immediate-or-Cancel order (optimal limit IOC)
-   Take Profit / Stop Loss (TP/SL)
-   Limit and market orders triggered under the order types below:
    -   Take Profit / Stop Loss (TP/SL)
    -   Trigger
    -   Trailing stop
    -   Arbitrage
    -   Iceberg
    -   TWAP
    -   Recurring buy

\
\

**Added new error code 51174**

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ ---------------------------------------------------------------------------------------------------
  51174        200                Order failed. The number of {param0} pending orders reached the upper limit of {param1} (orders).

# 2023-08-02 

-   Added new endpoints

    -   [Set ND sub-account asset in demo trading](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-set-nd-sub-account-asset-in-demo-trading)

-   Added new response parameters

    -   [Get borrow interest and limit](/docs-v5/en/#trading-account-rest-api-get-borrow-interest-and-limit)\
    -   [Get sub-account borrow interest and limit](/docs-v5/en/#sub-account-rest-api-get-sub-account-borrow-interest-and-limit)

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter                    Type                    Description
  ---------------------------- ----------------------- --------------------------------------------------------------------------------------------------------------------------------------
  \> surplusLmtDetails         Array of objects        The details of available amount across all sub-accounts\
                                                       The value of `surplusLmt` is the minimum value within this array. It can help you judge the reason that `surplusLmt` is not enough.\
                                                       Only applicable to `VIP loans`

  \>\> allAcctRemainingQuota   String                  Total remaining quota for master account and sub-accounts

  \>\> curAcctRemainingQuota   String                  The remaining quota for the current sub-account.\
                                                       Only applicable to the case in which the sub-account is assigned the loan allocation

  \>\> platRemainingQuota      String                  Remaining quota for the platform.\
                                                       The format like \"600\" will be returned when it is more than `curAcctRemainingQuota` or `allAcctRemainingQuota`
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2023-07-26 

-   Adjusted response fields
    -   [Get the user\'s broker rebate information](/docs-v5/broker_en/#fully-disclosed-broker-api-and-oauth-broker-commision-api-get-the-user-39-s-broker-rebate-information)

Before

  -----------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------
  type                    String                  The reason that Broker cannot get broker rebate\
                                                  `2`: The user level is equal to or more than `VIP3`

  -----------------------------------------------------------------------------------------------------

After

  -------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------------
  type                    String                  The reason that Broker cannot get broker rebate\
                                                  `2`: The trading fee level is `VIP4/5` and the monthly commission amount has reached the upper limit\
                                                  `3`: The trading fee level is greater than or equal to `VIP6`

  clientRebateRatio       String                  Commission rebate ratio for client
  -------------------------------------------------------------------------------------------------------------------------------------------------------

# 2023-07-20 

-   Added new response fields
    -   [Get daily rebate records](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-daily-rebate-records)

  Parameter         Type               Description
  ----------------- ------------------ ---------------------------------------------------------------------------
  totIncomeCat      Object             Category statistics for the total rebate amount
  \> spot           String             Total Rebate amount for `spot`, the unit is `USDT`
  \> derivative     String             Total Rebate amount for `derivative`, the unit is `USDT`
  \> convert        String             Total Rebate amount for `convert`, the unit is `USDT`
  details           Array of objects   Sub-account rebate amount record list
  \> incomeCat      Object             Category statistics for the rebate amount of the sub-account
  \>\> spot         String             The rebate amount of the sub-account for `spot`, the unit is `USDT`
  \>\> derivative   String             The rebate amount of the sub-account for `derivative`, the unit is `USDT`
  \>\> convert      String             The rebate amount of the sub-account for `convert`, the unit is `USDT`
  \> netFee         String             The net fee of the sub-account, the unit is `USDT`
  \> netFeeCat      Object             Category statistics for the net fee of the sub-account
  \>\> spot         String             The net fee of the sub-account for `spot`, the unit is `USDT`
  \>\> derivative   String             The net fee of the sub-account for `derivative`, the unit is `USDT`
  \> markupFee      String             The markup fee of the sub-account, the unit is `USDT`
  \> markupFeeCat   Object             Category statistics for the markup fee of the sub-account
  \>\> spot         String             The markup fee of the sub-account for `spot`, the unit is `USDT`
  \>\> derivative   String             The markup fee of the sub-account for `derivative`, the unit is `USDT`
  \>\> convert      String             The markup fee of the sub-account for `convert`, the unit is `USDT`

-   Added new response fields for decompressed CSV file
    -   [Get download link(FD)](/docs-v5/broker_en/#fully-disclosed-broker-api-and-oauth-broker-commision-api-get-download-link-fd)

  Parameter       Description
  --------------- ----------------------------------------------------------------------------------------------------------------------------------------------
  netFee          Net fee (The handling fee base for commission settlement after removing data such as commission cards and counterparties), in unit of `USDT`
  settlementFee   Settlement fee (Broker\'s handling fee base before settlement removing node commission rebates, commission cards, etc. ), in unit of `USDT`

-   Added new response fields for decompressed CSV file
    -   [Get download link(ND)](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-download-link-nd)

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter                           Description
  ----------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------
  rebateCat                           Rebate category\
                                      `spot`\
                                      `derivative`\
                                      `convert`

  netFee                              Net fee (The handling fee base for commission settlement after removing data such as commission cards and counterparties), in unit of `USDT`

  markupFee                           Markup fee, in unit of `USDT`
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2023-07-19 

-   Added new response fields
    -   [Grid algo order list](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-list)
    -   [Grid algo order history](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-history)
    -   [Grid algo order details](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-details)
    -   [Spot grid algo orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-spot-grid-algo-orders-channel)
    -   [Contract grid algo orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-contract-grid-algo-orders-channel)

  --------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------------------------------------------
  profitSharingRatio      String                  Profit sharing ratio\
                                                  Value range \[0, 0.3\]\
                                                  If it is a normal order (neither copy order nor lead order), this field returns \"\"

  copyType                String                  Profit sharing order type\
                                                  `0`: Normal order\
                                                  `1`: Copy order without profit sharing\
                                                  `2`: Copy order with profit sharing\
                                                  `3`: Lead order
  --------------------------------------------------------------------------------------------------------------------------------------

-   Added new response fields
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)\
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)\

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  px                      String                  Price. It is related to subType.\
                                                  Trade filled price for 1: Buy 2: Sell 3: Open long 4: Open short 5: Close long 6: Close short 204: block trade buy 205: block trade sell 206: block trade open long 207: block trade open short 208: block trade close long209: block trade close short 114: Auto buy 115: Auto sell\
                                                  Liquidation Price:100: Partial liquidation close long 101: Partial liquidation close short 102: Partial liquidation buy 103: Partial liquidation sell 104: Liquidation long 105: Liquidation short 106: Liquidation buy 107: Liquidation sell 16: Repay forcibly 17: Repay interest by borrowing forcibly 110: Liquidation transfer in 111: Liquidation transfer out\
                                                  Delivery price for 112: Delivery long 113: Delivery short\
                                                  Exercise price for 170: Exercised 171: Counterparty exercised 172: Expired OTM\
                                                  Mark price for 173: Funding fee expense 174: Funding fee income

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response fields\
    -   [Get option market data](/docs-v5/en/#public-data-rest-api-get-option-market-data)\
    -   [Option summary channel](/docs-v5/en/#public-data-websocket-option-summary-channel)

  Parameter   Type     Description
  ----------- -------- --------------------------------------------
  volLv       String   Implied volatility of at-the-money options

-   Added new endpoint
    -   [Set account mode](/docs-v5/en/#trading-account-rest-api-set-account-mode)

The MMP optimizations below have been deployed to the production

-   Added new enumeration value for `ordType`\

    -   Related endpoints about request parameter:\
        -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)\
        -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)\
        -   [Place order (websocket)](/docs-v5/en/#order-book-trading-trade-ws-place-order)\
        -   [Place multiple orders (websocket)](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)\
        -   [Get order list](/docs-v5/en/#order-book-trading-trade-get-order-list)\
        -   [Get order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\
        -   [Get order history (last 30 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)\
    -   Related endpoints about response parameter:\
        -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)\
        -   [Get order details](/docs-v5/en/#order-book-trading-trade-get-order-details)\
        -   [Get order list](/docs-v5/en/#order-book-trading-trade-get-order-list)\
        -   [Get order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\
        -   [Get order history (last 30 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)\

  Parameter   Type     Description
  ----------- -------- ----------------------------------------------------------------------------------------------------------------------
  ordType     String   `mmp_and_post_only`：Market Maker Protection and Post-only order(only applicable to Option in Portfolio Margin mode)

-   Added new endpoints
    -   [Set MMP](/docs-v5/en/#trading-account-rest-api-set-mmp)\
    -   [GET MMP Config](/docs-v5/en/#trading-account-rest-api-get-mmp-config)\

# 2023-07-17 

-   Added new response fields
    -   [Get sub-account list](/docs-v5/en/#sub-account-rest-api-get-sub-account-list)

  Parameter   Type     Description
  ----------- -------- -----------------
  uid         String   sub-account uid

-   Added new request fields
    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  cxlOnClosePos     Boolean           No                Whether the TP/SL order placed by the user is associated with the corresponding position of the instrument. If it is associated, the TP/SL order will be canceled when the position is fully closed; if it is not, the TP/SL order will not be affected when the position is fully closed.\
                                                        \
                                                        Valid values:\
                                                        `true`: Place a TP/SL order associated with the position\
                                                        `false`: Place a TP/SL order that is not associated with the position\
                                                        \
                                                        The default value is `false`. If `true` is passed in, users must pass reduceOnly = true as well, indicating that when placing a TP/SL order associated with a position, it must be a reduceOnly order.\
                                                        \
                                                        Only applicable to `Futures mode` and `Multi-currency margin`.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2023-07-07 

The MMP optimizations below have been deployed to the demo trading environment and will be deployed to production on July 19, 2023.

-   Added new enumeration value for `ordType`\

    -   Related endpoints about request parameter:\
        -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)\
        -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)\
        -   [Get order list](/docs-v5/en/#order-book-trading-trade-get-order-list)\
        -   [Get order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\
        -   [Get order history (last 30 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)\
    -   Related endpoints about response parameter:\
        -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)\
        -   [Get order details](/docs-v5/en/#order-book-trading-trade-get-order-details)\
        -   [Get order list](/docs-v5/en/#order-book-trading-trade-get-order-list)\
        -   [Get order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\
        -   [Get order history (last 30 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)\

  Parameter   Type     Description
  ----------- -------- ----------------------------------------------------------------------------------------------------------------------
  ordType     String   `mmp_and_post_only`：Market Maker Protection and Post-only order(only applicable to Option in Portfolio Margin mode)

-   Added new endpoints
    -   [Set MMP](/docs-v5/en/#trading-account-rest-api-set-mmp)\
    -   [GET MMP Config](/docs-v5/en/#trading-account-rest-api-get-mmp-config)\

# 2023-07-05 

-   Added enumeration value\
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)\
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)\

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  type              String            No                Bill type\
                                                        `24`: Spread trading

  subType           String            No                Bill subtype\
                                                        `270`: Spread trading buy; `271`: Spread trading sell; `272`: Spread trading open long; `273`: Spread trading open short; `274`: Spread trading close long; `275`: Spread trading close short
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response fields
    -   [Get transaction details (last 3 days)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-days)
    -   [Get transaction details (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-months)

  Parameter   Type     Description
  ----------- -------- ------------------------------------------------------------------------------------------------------------------------------------
  fillPnl     String   Last filled profit and loss, applicable to orders which have a trade and aim to close position. It always is 0 in other conditions

-   Added new push data parameters
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

  Parameter    Type     Description
  ------------ -------- ------------------------------------------------------------------------------------------------------------------------------------
  \> fillPnl   String   Last filled profit and loss, applicable to orders which have a trade and aim to close position. It always is 0 in other conditions

-   Added new request fields
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)
    -   [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter             Type              Required          Description
  --------------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------------------------
  \> extraParams        String            No                Additional configuration

  \>\> updateInterval   int               No                `0`: only push due to events\
                                                            The data will be pushed both by events and regularly if this field is omitted or set to other values than 0.\
                                                            The following format should be strictly obeyed when using this field.\
                                                            \"extraParams\": \"\
                                                            {\
                                                            \\\"updateInterval\\\": \\\"0\\\"\
                                                            }\
                                                            \"
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new endpoints

    -   [Get leverage estimated info](/docs-v5/en/#trading-account-rest-api-get-leverage-estimated-info)\
        \

-   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel) supported the update of the delivery orders(category=delivery).

-   Changed the request permission of [Position builder](/docs-v5/en/#trading-account-rest-api-position-builder) from \"Trade\" to \"Read\"\

# 2023-06-28 

API document added endpoint information about Option MMP

-   Added new enumeration value for `ordType`\

    -   Related endpoints about request parameter:\
        -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)\
        -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)\
        -   [Place order (websocket)](/docs-v5/en/#order-book-trading-trade-ws-place-order)\
        -   [Place multiple orders (websocket)](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)\
        -   [Get order list](/docs-v5/en/#order-book-trading-trade-get-order-list)\
        -   [Get order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\
        -   [Get order history (last 30 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)\
    -   Related endpoints about response parameter:\
        -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)\
        -   [Get order details](/docs-v5/en/#order-book-trading-trade-get-order-details)\
        -   [Get order list](/docs-v5/en/#order-book-trading-trade-get-order-list)\
        -   [Get order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\
        -   [Get order history (last 30 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)\

  Parameter   Type     Description
  ----------- -------- -------------------------------------------------------------------------------------
  ordType     String   `mmp`：Market Maker Protection (only applicable to Option in Portfolio Margin mode)

-   Added new enumeration value for `state`\

    -   Related endpoints about request parameter:\
        -   [Get order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\
        -   [Get order history (last 30 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)\
    -   Related endpoints about response parameter:\
        -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)\
        -   [Get order details](/docs-v5/en/#order-book-trading-trade-get-order-details)\
        -   [Get order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\
        -   [Get order history (last 30 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)\

  Parameter   Type     Description
  ----------- -------- -----------------------------------------------------------------------------
  state       String   `mmp_canceled`：Order canceled automatically due to Market Maker Protection

-   Added new endpoints
    -   [Mass Cancel Order channel](/docs-v5/en/#order-book-trading-trade-ws-mass-cancel-order)\
    -   [Mass Cancel Order](/docs-v5/en/#order-book-trading-trade-post-mass-cancel-order)\
    -   [Cancel All After](/docs-v5/en/#order-book-trading-trade-post-cancel-all-after)\
    -   [Reset MMP Status](/docs-v5/en/#trading-account-rest-api-reset-mmp-status)\

# 2023-06-27 

-   Added new response parameters
    -   [Get currencies](/docs-v5/en/#funding-account-rest-api-get-currencies)

  Parameter         Type     Description
  ----------------- -------- ---------------------------------------------
  minFeeForCtAddr   String   Minimum withdrawal fee for contract address
  maxFeeForCtAddr   String   Maximum withdrawal fee for contract address

# 2022-06-26 

-   Added API doc for [Spread Orderbook](/docs-v5/en/#spread-trading). Currently only available for whitelisted users in demo trading environment\
-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ --------------------------------------------------
  75001        200                Trade ID does not exist
  75002        200                {sprdId} : new orders are not accepted currently
  75003        200                Invalid price

# 2023-06-20 

-   Added new response parameters in [Order book channel](/docs-v5/en/#order-book-trading-market-data-ws-order-book-channel):\

  Parameter      Type      Description
  -------------- --------- ----------------------------------------------------------------------------------------------------
  \> prevSeqId   Integer   Sequence ID of the last sent message. Only applicable to `books`, `books-l2-tbt`, `books50-l2-tbt`
  \> seqId       Integer   Sequence ID of the current message

-   The request parameter has been updated as follows:
    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)

Before:

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  closeFraction     String            No                Fraction of position to be closed when the algo order is triggered.\
                                                        Currently the system supports fully closing the position only so the only accepted value is `1`. For the same position, only one TPSL pending order for fully closing the position is supported.\
                                                        \
                                                        This is only applicable to `FUTURES` or `SWAP` instruments.\
                                                        This is only applicable if `posSide` is `net`.\
                                                        This is only applicable if `reduceOnly` is `true`.\
                                                        This is only applicable if `ordType` is `conditional` or `oco`.\
                                                        This is only applicable if the stop loss and take profit order is executed as market order.\
                                                        This is not supported in Portfolio Margin mode.\
                                                        Either `sz` or `closeFraction` is required.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

After:

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  closeFraction     String            No                Fraction of position to be closed when the algo order is triggered.\
                                                        Currently the system supports fully closing the position only so the only accepted value is `1`. For the same position, only one TPSL pending order for fully closing the position is supported.\
                                                        \
                                                        This is only applicable to `FUTURES` or `SWAP` instruments.\
                                                        If `posSide` is `net`, `reduceOnly` must be `true`.\
                                                        This is only applicable if `ordType` is `conditional` or `oco`.\
                                                        This is only applicable if the stop loss and take profit order is executed as market order.\
                                                        This is not supported in Portfolio Margin mode.\
                                                        Either `sz` or `closeFraction` is required.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   The request parameter has been updated as follows:
    -   [Create an API Key for a sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-create-an-api-key-for-a-sub-account)

Before:

  ---------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------
  ip                String            Optional          Link IP addresses, separate with commas if more than one. Support up to 20 addresses.\
                                                        If sub-account API Key has `trade`/`withdraw` permission, linking IP addresses is required.

  ---------------------------------------------------------------------------------------------------------------------------------------------------

After:

  Parameter   Type     Required   Description
  ----------- -------- ---------- ---------------------------------------------------------------------------------------
  ip          String   No         Link IP addresses, separate with commas if more than one. Support up to 20 addresses.

-   The request parameter has been updated as follows:
    -   [Reset the API Key of a sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-reset-the-api-key-of-a-sub-account)

Before:

  ---------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------
  ip                String            No                Link IP addresses, separate with commas if more than one. Support up to 20 addresses.\
                                                        The field will be reset if set.\
                                                        If sub-account API Key has `trade`/`withdraw` permission, linking IP addresses is required.

  ---------------------------------------------------------------------------------------------------------------------------------------------------

After:

  ----------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------
  ip                String            No                Link IP addresses, separate with commas if more than one. Support up to 20 addresses.\
                                                        The field will be reset if set.

  ----------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameters:\
    -   [Get sub-account list](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-sub-account-list)\

  Parameter   Type     Required   Description
  ----------- -------- ---------- -----------------
  uid         String   No         Sub-account uid

-   Added new request parameters\
    -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)\
    -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)\

  Parameter           Type     Required   Description
  ------------------- -------- ---------- -------------------------------------------------------------
  attachAlgoClOrdId   String   No         Client-supplied Algo ID when placing order attaching TP/SL.

-   Added new response parameters to support self trade prevention:\
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)\
    -   [Get order details](/docs-v5/en/#order-book-trading-trade-get-order-details)\
    -   [Get order list](/docs-v5/en/#order-book-trading-trade-get-order-list)\
    -   [Get order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\
    -   [Get order history (last 30 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)\

  Parameter           Type     Description
  ------------------- -------- -------------------------------------------------------------
  attachAlgoClOrdId   String   Client-supplied Algo ID when placing order attaching TP/SL.

-   Added new parameters\
    -   [Get algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)\
    -   [Get algo order history](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)\
    -   [Get algo order details](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-details)\
    -   [Algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)\

Before:

  Parameter   Type     Description
  ----------- -------- --------------------------------------------
  ordId       String   Order ID
  state       String   State,`live` `pause` `partially_effective`

After:

  Parameter   Type     Description
  ----------- -------- --------------------------------------------------------------------------------------
  ordId       String   Latest order ID
  state       String   State,`live` `pause` `partially_effective` `partially_failed`
  ordIdList   Array    Order ID list. There will be multiple order IDs when there is TP/SL splitting order.

# 2023-06-19 

-   Added a new endpoint
    -   [Get history of managed sub-account transfer](/docs-v5/en/#sub-account-rest-api-get-history-of-managed-sub-account-transfer)

# 2023-06-15 

-   Planned system maintenance that may result in short interruption (lasting less than 5 seconds) or websocket disconnection (users can immediately reconnect) will not be announced. The maintenance will only be performed during times of low market volatility.
    -   [Get system status](/docs-v5/en/#status-get-status)
    -   [Status channel](/docs-v5/en/#status-ws-status-channel)

# 2023-06-07 

-   Added new request parameters to support self trade prevention:\
    -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)\
    -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)\
    -   [Place order (websocket)](/docs-v5/en/#order-book-trading-trade-ws-place-order)\
    -   [Place multiple orders (websocket)](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)\

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- --------------------------------------------------------------------------------------------------------------------
  stpId             String            No                Self trade prevention ID. Orders from the same master account with the same ID will be prevented from self trade.\
                                                        Numerical integers defined by user in the range of 1\<= x\<= 999999999

  stpMode           String            No                Self trade prevention mode\
                                                        Default to cancel maker\
                                                        `cancel_maker`,`cancel_taker`, `cancel_both`\
                                                        Cancel both does not support FOK.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameters to support self trade prevention:\
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)\
    -   [Get order details](/docs-v5/en/#order-book-trading-trade-get-order-details)\
    -   [Get order list](/docs-v5/en/#order-book-trading-trade-get-order-list)\
    -   [Get order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\
    -   [Get order history (last 30 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)\

  --------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------------
  stpId                   String                  Self trade prevention ID\
                                                  Return \"\" if self trade prevention is not applicable

  stpMode                 String                  Self trade prevention mode\
                                                  Return \"\" if self trade prevention is not applicable

  cancelSource            String                  `32`: Self trade prevention
  --------------------------------------------------------------------------------------------------------

-   The adjustment of response parameters was launched in production environment.
    -   [Get option trades](/docs-v5/en/#order-book-trading-market-data-get-option-trades)\
    -   [Option trades channel](/docs-v5/en/#order-book-trading-market-data-ws-option-trades-channel)\

Before:

  Parameter   Type     Description
  ----------- -------- ---------------------------
  indexPx     String   Index price while trading

After:

  Parameter   Type     Description
  ----------- -------- ---------------------------
  idxPx       String   Index price while trading

-   Added new response parameters\
    -   [Get transaction details (last 3 days)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-days)\
    -   [Get transaction details (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-months)\

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------
  fillIdxPx               String                  Index price at the moment of trade execution\
                                                  For cross currency spot pairs, it returns baseCcy-USDT index price. For example, for LTC-ETH, this field returns the index price of LTC-USDT.

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameters\
    -   [Get positions](/docs-v5/en/#trading-account-rest-api-get-positions)\
    -   [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)\

  Parameter   Type     Description
  ----------- -------- -------------------------------
  idxPx       String   Latest underlying index price

-   Added new response parameters\
    -   [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)\

  -------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------
  kycLv                   String                  Main account KYC level\
                                                  `0`: No verification `1`: level 1 completed, `2`: level 2 completed, `3`: level 3 completed.\
                                                  If the request originates from a subaccount, kycLv is the KYC level of the main account.\
                                                  If the request originates from the main account, kycLv is the KYC level of the current account.

  -------------------------------------------------------------------------------------------------------------------------------------------------

#### Sub-account 

-   Added new endpoint
    -   [Get sub-account maximum withdrawals](/docs-v5/en/#sub-account-rest-api-get-sub-account-maximum-withdrawals)

# 2023-06-02 

-   The adjustment of response parameters will be launched in production environment on June 7, 2023.
    -   [Get option trades](/docs-v5/en/#order-book-trading-market-data-get-option-trades)\
    -   [Option trades channel](/docs-v5/en/#order-book-trading-market-data-ws-option-trades-channel)\

Before:

  Parameter   Type     Description
  ----------- -------- ---------------------------
  indexPx     String   Index price while trading

After:

  Parameter   Type     Description
  ----------- -------- ---------------------------
  idxPx       String   Index price while trading

# 2023-05-29 

-   Additional enumeration value `pending_fill` will be added to response parameter `state` of Quotes Websocket channel on June 1, 2023\
    -   [Quotes channel](/docs-v5/en/#block-trading-websocket-private-channel-quotes-channel)\

  Parameter   Type     Description
  ----------- -------- -----------------------------------------------------------------------------------------------------------------
  state       String   The status of the quote. Valid values can be `active` `pending_fill` `canceled` `filled` `expired` or `failed`.

# 2023-05-24 

-   Added new response parameters\
    -   [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)\

  -------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------------
  mainUid                 String                  Main Account ID of current request.\
                                                  The current request account is main account if uid = mainUid.\
                                                  The current request account is sub-account if uid != mainUid.

  perm                    String                  The permission of the urrent request API Key. read_only：Read only；trade ：Trade; withdraw: Withdraw
  -------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameters:\
    -   [Place grid algo order](/docs-v5/en/#order-book-trading-grid-trading-post-place-grid-algo-order)
    -   [Amend grid algo order](/docs-v5/en/#order-book-trading-grid-trading-post-amend-grid-algo-order)
    -   [Stop grid algo order](/docs-v5/en/#order-book-trading-grid-trading-post-stop-grid-algo-order)
    -   [Close position for contract grid](/docs-v5/en/#order-book-trading-grid-trading-post-close-position-for-contract-grid)
    -   [Cancel close position order for contract grid](/docs-v5/en/#order-book-trading-grid-trading-post-cancel-close-position-order-for-contract-grid)

  Parameter     Type     Description
  ------------- -------- -------------------------
  tag           String   Order tag
  algoClOrdId   String   Client-supplied Algo ID

-   Added new response parameters:\
    -   [Instant trigger grid algo order](/docs-v5/en/#order-book-trading-grid-trading-post-instant-trigger-grid-algo-order)
    -   [Get grid algo order list](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-list)
    -   [Get grid algo order history](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-history)
    -   [Get grid algo order details](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-details)
    -   [Get grid algo sub orders](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-sub-orders)
    -   [Get grid algo order positions](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-positions)
    -   [Spot/Moon grid withdraw income](/docs-v5/en/#order-book-trading-grid-trading-post-spot-moon-grid-withdraw-income)
    -   [Adjust margin balance](/docs-v5/en/#order-book-trading-grid-trading-post-adjust-margin-balance)
    -   [Spot grid algo orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-spot-grid-algo-orders-channel)
    -   [Contract grid algo orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-contract-grid-algo-orders-channel)
    -   [Moon grid algo orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-moon-grid-algo-orders-channel)
    -   [Grid positions channel](/docs-v5/en/#order-book-trading-grid-trading-ws-grid-positions-channel)
    -   [Grid sub orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-grid-sub-orders-channel)

  Parameter     Type     Description
  ------------- -------- -------------------------
  algoClOrdId   String   Client-supplied Algo ID

# 2023-05-10 

-   Added new response parameters:\
    -   [Get sub-account list](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-sub-account-list)\

  Parameter   Type     Description
  ----------- -------- ---------------------
  \> uid      String   Sub-account user ID

# 2023-04-27 

-   Added new request parameters:\
    -   [Amend order](/docs-v5/en/#order-book-trading-trade-post-amend-order)\
    -   [Amend multiple orders](/docs-v5/en/#order-book-trading-trade-post-amend-multiple-orders)\

  -------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**        **Type**          **Required**      **Description**
  -------------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------------
  newTpTriggerPx       String            Conditional       Take-profit trigger price.\
                                                           Either the take profit trigger price or order price is 0, it means that the take profit is deleted

  newTpOrdPx           String            Conditional       Take-profit order price\
                                                           If the price is -1, take-profit will be executed at the market price.

  newSlTriggerPx       String            Conditional       Stop-loss trigger price\
                                                           Either the stop loss trigger price or order price is 0, it means that the stop loss is deleted

  newSlOrdPx           String            Conditional       Stop-loss order price\
                                                           If the price is -1, stop-loss will be executed at the market price.

  newTpTriggerPxType   String            Conditional       Take-profit trigger price type\
                                                           `last`: last price\
                                                           `index`: index price\
                                                           `mark`: mark price

  newSlTriggerPxType   String            Conditional       Stop-loss trigger price type\
                                                           `last`: last price\
                                                           `index`: index price\
                                                           `mark`: mark price
  -------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added a new endpoint: [Amend algo order](/docs-v5/en/#order-book-trading-algo-trading-post-amend-algo-order)
-   Added new response parameters:\
    -   [Algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)\

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------------------------
  \> tdMode               String                  Trade mode\
                                                  Margin mode: `cross` `isolated`\
                                                  Non-Margin mode: `cash`.\
                                                  If not provided, tdMode will inherit default values set by the system shown below:\
                                                  Futures mode & SPOT: `cash`\
                                                  Buy options in Futures mode and Multi-currency Margin: `isolated`\
                                                  Other cases: `cross`

  \> ccy                  String                  Margin currency.\
                                                  Only applicable to `cross` `MARGIN` orders in `Futures mode`. The parameter will be ignored in other scenarios.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new request parameters:\
    -   [Create RFQ](/docs-v5/en/#block-trading-rest-api-create-rfq)\
    -   [Create Quote](/docs-v5/en/#block-trading-rest-api-create-quote)\

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- -----------------------------------------------------------------------------------------------------------------
  \> tdMode         String            No                Trade mode\
                                                        Margin mode: `cross` `isolated`\
                                                        Non-Margin mode: `cash`.\
                                                        If not provided, tdMode will inherit default values set by the system shown below:\
                                                        Futures mode & SPOT: `cash`\
                                                        Buy options in Futures mode and Multi-currency Margin: `isolated`\
                                                        Other cases: `cross`

  \> ccy            String            No                Margin currency.\
                                                        Only applicable to `cross` `MARGIN` orders in `Futures mode`. The parameter will be ignored in other scenarios.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameters:\
    -   [Create RFQ](/docs-v5/en/#block-trading-rest-api-create-rfq)\
    -   [Create Quote](/docs-v5/en/#block-trading-rest-api-create-quote)\
    -   [Get rfqs](/docs-v5/en/#block-trading-rest-api-get-rfqs)\
    -   [Get quotes](/docs-v5/en/#block-trading-rest-api-get-quotes)\
    -   [Rfqs channel](/docs-v5/en/#block-trading-websocket-private-channel-rfqs-channel)\
    -   [Quotes channel](/docs-v5/en/#block-trading-websocket-private-channel-quotes-channel)\

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------------------------
  \> tdMode               String                  Trade mode\
                                                  Margin mode: `cross` `isolated`\
                                                  Non-Margin mode: `cash`.\
                                                  If not provided, tdMode will inherit default values set by the system shown below:\
                                                  Futures mode & SPOT: `cash`\
                                                  Buy options in Futures mode and Multi-currency Margin: `isolated`\
                                                  Other cases: `cross`

  \> ccy                  String                  Margin currency.\
                                                  Only applicable to `cross` `MARGIN` orders in `Futures mode`. The parameter will be ignored in other scenarios.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2023-04-26 

-   The request parameters made some changes as follows:
    -   [Set trading fee rate for the sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-set-trading-fee-rate-for-the-sub-account)

Before:

  ------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------
  mgnType           String            No                Margin type\
                                                        `1`: USDT-margined\
                                                        `2`: crypto-margined\
                                                        Applicated to `FUTURES/SWAP`

  ------------------------------------------------------------------------------------

After:

  ---------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------
  quoteCcyType      String            No                Quote currency type\
                                                        `2`: USDT/USDⓈ/Crypto\
                                                        `3`: USDC\
                                                        Applicated to `SPOT`\
                                                        When specifying this parameter, `instType` is required.

  mgnType           String            No                Margin type\
                                                        `1`: USDT-margined\
                                                        `2`: crypto-margined\
                                                        `3`: USDC-margined\
                                                        Applicated to `FUTURES/SWAP`\
                                                        When specifying this parameter, `instType` is required.
  ---------------------------------------------------------------------------------------------------------------

-   Added new endpoint:

    -   [Set sub-accounts VIP loan%](/docs-v5/en/#sub-account-rest-api-set-sub-accounts-vip-loan-allocation)
    -   [Get sub-account borrow interest and limit](/docs-v5/en/#sub-account-rest-api-get-sub-account-borrow-interest-and-limit)

-   The response parameters made some changes as follows:

    -   [Get borrow interest and limit](/docs-v5/en/#trading-account-rest-api-get-borrow-interest-and-limit)\

Before:

  **Parameter**   **Type**   **Description**
  --------------- ---------- --------------------------------------------------------
  \> loanQuota    String     Borrow limit of master account
  \> surplusLmt   String     Available borrow amount of master and all sub-accounts
  \> usedLmt      String     Borrowed amount of master account and all sub-accounts

After:

  ----------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------------
  loanAlloc               String                  VIP Loan allocation for the current trading account\
                                                  1. The unit is percent(%). Range is \[0, 100\]. Precision is 0.01%\
                                                  2. If master account did not assign anything, then \"0\"\
                                                  3. \"\" if shared between master and sub-account

  \> loanQuota            String                  Borrow limit of master account\
                                                  If loanAlloc has been assigned, then it is the borrow limit of the current trading account

  \> surplusLmt           String                  Available amount across all sub-accounts\
                                                  If loanAlloc has been assigned, then it is the available amount to borrow by the current trading account

  \> usedLmt              String                  Borrowed amount across all sub-accounts\
                                                  If loanAlloc has been assigned, then it is the borrowed amount by the current trading account
  ----------------------------------------------------------------------------------------------------------------------------------------------------------

-   Adjusted parameters\

    -   The endpoints:
        -   [Get positions history](/docs-v5/en/#trading-account-rest-api-get-positions-history)\
        -   [Get positions](/docs-v5/en/#trading-account-rest-api-get-positions)\
        -   Positions channel, Balance and position channel, Position risk warning channel\
    -   posId added one more attribute expiration, the posId and position information will be cleared if it is more than 30 days after the last close position.

-   Added response parameter\

    -   [Get positions](/docs-v5/en/#trading-account-rest-api-get-positions)
    -   [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)\

  **Parameter**    **Type**   **Description**
  ---------------- ---------- --------------------------------------------------------------------------------------------------
  uplLastPx        String     Unrealized profit and loss calculated by last price. Main usage is showing, actual value is upl.
  uplRatioLastPx   String     Unrealized profit and loss ratio calculated by last price.

# 2023-04-19 

-   Below WebSocket channels are migrated to the new WebSocket URL `wss://ws.okx.com:8443/ws/v5/business` and `wss://wsaws.okx.com:8443/ws/v5/business`. Those channels will no longer be supported by the existing websocket URL by the end of May 2023. More details can refer to: [Changes to API WebSocket subscription parameter and URL](https://www.okx.com/help-center/changes-to-v5-api-websocket-subscription-parameter-and-url)

    -   Block trading channels
        -   [Rfqs channel](/docs-v5/en/#block-trading-websocket-private-channel-rfqs-channel)\
        -   [Quotes channel](/docs-v5/en/#block-trading-websocket-private-channel-quotes-channel)\
        -   [Structure block trades channel](/docs-v5/en/#block-trading-websocket-private-channel-structure-block-trades-channel)\
        -   [Public structure block trades channel](/docs-v5/en/#block-trading-websocket-public-channel-public-structure-block-trades-channel)\
        -   [Public block trades channel](/docs-v5/en/#block-trading-websocket-public-channel-public-block-trades-channel)\
        -   [Block tickers channel](/docs-v5/en/#block-trading-websocket-public-channel-block-tickers-channel)\
    -   Algo and strategy trading channels
        -   [Algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)\
        -   [Advance algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-advance-algo-orders-channel)\
        -   [Spot grid algo orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-spot-grid-algo-orders-channel)\
        -   [Contract grid algo orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-contract-grid-algo-orders-channel)\
        -   [Moon grid algo orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-moon-grid-algo-orders-channel)\
        -   [Grid positions channel](/docs-v5/en/#order-book-trading-grid-trading-ws-grid-positions-channel)\
        -   [Grid sub orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-grid-sub-orders-channel)\
        -   [Recurring buy orders channel](/docs-v5/en/#order-book-trading-recurring-buy-ws-recurring-buy-orders-channel)\
    -   Candlesticks channels
        -   [Candlesticks channel](/docs-v5/en/#order-book-trading-market-data-ws-candlesticks-channel)\
        -   [Mark price candlesticks channel](/docs-v5/en/#public-data-websocket-mark-price-candlesticks-channel)\
        -   [Index candlesticks channel](/docs-v5/en/#public-data-websocket-index-candlesticks-channel)\

-   Adjustment below to API WebSocket subscription parameter uly. More details can also refer to: [Changes to API WebSocket subscription parameter and URL](https://www.okx.com/help-center/changes-to-v5-api-websocket-subscription-parameter-and-url)

    -   Currently, the websocket subscription parameter uly is mapped to the parameter instFamily. After the end of May 2023, the subscription parameter uly will be ignored and no longer be processed. Please replace uly with instFamily as soon as possible.

-   Websocket no longer supported multiple account batch login.

# 2023-04-10 

-   There were changes to API, as OKX supports USDC index.\
    For details, please refer to [Changes to API users as OKX supports USDC index](https://www.okx.com/help/changes-to-v5-api-users-as-okx-supports-usdc-index)

# 2023-04-07 

-   Websocket will not support multiple account batch login from April 19, 2023.

# 2023-04-06 

-   Added new push data parameter\
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)\

  --------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------------------------------------------------------
  \> cancelSource         String                  Source of the order cancellation.\
                                                  `31`: The post-only order will take liquidity in taker orders

  \> amendSource          String                  Source of the order amendation.\
                                                  `1`: Order amended by user\
                                                  `2`: Order amended by user, but the order quantity is overriden by system due to reduce-only\
                                                  `3`: New order placed by user, but the order quantity is overriden by system due to reduce-only\
                                                  `4`: Order amended by system due to other pending orders
  --------------------------------------------------------------------------------------------------------------------------------------------------

# 2023-04-03 

-   OKX will no longer support users to retrieve platform historical liquidation orders through the REST endpoint by the end of April 2023. Please subscribe to the websocket channel below to receive real time data:
    -   [Liquidation orders channel](/docs-v5/en/#public-data-websocket-liquidation-orders-channel)\
-   Added new response parameters
    -   [Status](/docs-v5/en/#status-get-status) endpoint.\
    -   [Status channel](/docs-v5/en/#status-ws-status-channel)\

  ----------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------
  maintType               String                  Maintenance type\
                                                  `1`: Scheduled maintenance; `2`: Unscheduled maintenance; `3`: System disruption

  env                     String                  Environment.\
                                                  `1`: Production Trading, `2`: Demo Trading
  ----------------------------------------------------------------------------------------------------------------------------------

# 2023-03-30 

-   The response parameters made some changes as follows:
    -   [Get 24H Total Volume](/docs-v5/en/#order-book-trading-market-data-get-24h-total-volume)

Before:

  **Parameter**   **Type**   **Description**
  --------------- ---------- -------------------------------------------------------------
  volUsd          String     24-hour total trading volume on the platform in \"USD\"
  volCny          String     24-hour total trading volume on the platform in \"CNY\"
  blockVolUsd     String     24-hour total OTC trading volume on the platform in \"USD\"
  blockVolCny     String     24-hour total OTC trading volume on the platform in \"CNY\"

After:

  **Parameter**   **Type**   **Description**
  --------------- ---------- ---------------------------------------------------------------------
  volUsd          String     24-hour total trading volume from the order book trading in \"USD\"
  volCny          String     24-hour total trading volume from the order book trading in \"CNY\"

# 2023-03-29 

-   Added a new function module [Recurring buy](/docs-v5/en/#order-book-trading-recurring-buy)\

-   WebSocket API added new channels

    -   [Recurring buy orders channel](/docs-v5/en/#order-book-trading-recurring-buy-ws-recurring-buy-orders-channel)\

# 2023-03-27 

-   The response parameters will make some changes as follows on March 30,2023:
    -   [Get 24H Total Volume](/docs-v5/en/#order-book-trading-market-data-get-24h-total-volume)

Before:

  **Parameter**   **Type**   **Description**
  --------------- ---------- -------------------------------------------------------------
  volUsd          String     24-hour total trading volume on the platform in \"USD\"
  volCny          String     24-hour total trading volume on the platform in \"CNY\"
  blockVolUsd     String     24-hour total OTC trading volume on the platform in \"USD\"
  blockVolCny     String     24-hour total OTC trading volume on the platform in \"CNY\"

After:

  **Parameter**   **Type**   **Description**
  --------------- ---------- ---------------------------------------------------------------------
  volUsd          String     24-hour total trading volume from the order book trading in \"USD\"
  volCny          String     24-hour total trading volume from the order book trading in \"CNY\"

-   Delisted endpoints from the document
    -   Get liquidation orders (GET /api/v5/public/liquidation-orders)

# 2023-03-24 

-   There will be changes to API on April 10,2023, as OKX supports USDC index.\
    For details, please refer to [Changes to API users as OKX supports USDC index](https://www.okx.com/help/changes-to-v5-api-users-as-okx-supports-usdc-index)

# 2023-03-16 

-   Added new endpoint:
    -   [Get option tick bands](/docs-v5/en/#public-data-rest-api-get-option-tickbands)\
    -   [Liquidation orders channel](/docs-v5/en/#public-data-websocket-liquidation-orders-channel)\

# 2023-03-15 

For the savings endpoints adjustment, the old endpoints will be offline later, please migrate to the new endpoints as soon as possible

-   Added a new function module [Savings](/docs-v5/en/#rest-api-savings), the relevant endpoints of the savings are adjusted as follows
    -   [Get saving balance](/docs-v5/en/#financial-product-savings-get-saving-balance) adjusted endpoint path from `/api/v5/asset/saving-balance` to `/api/v5/finance/savings/balance`
    -   [Savings purchase/redemption](/docs-v5/en/#financial-product-savings-post-savings-purchase-redemption) adjusted endpoint path from `/api/v5/asset/purchase_redempt` to `/api/v5/finance/savings/purchase-redempt`
    -   [Set lending rate](/docs-v5/en/#financial-product-savings-post-set-lending-rate) adjusted endpoint path from `/api/v5/asset/set-lending-rate` to `/api/v5/finance/savings/set-lending-rate`
    -   [Get lending history](/docs-v5/en/#financial-product-savings-get-lending-history) adjusted endpoint path from `/api/v5/asset/lending-history` to `/api/v5/finance/savings/lending-history`
    -   [Get public borrow info (public)](/docs-v5/en/#financial-product-savings-get-public-borrow-info-public) adjusted endpoint path from `/api/v5/asset/lending-rate-summary` to `/api/v5/finance/savings/lending-rate-summary`
    -   [Get public borrow history (public)](/docs-v5/en/#financial-product-savings-get-public-borrow-history-public) adjusted endpoint path from `/api/v5/asset/lending-rate-history` to `/api/v5/finance/savings/lending-rate-history`

# 2023-03-14 

-   Adjusted response parameter `wdQuota`,`usedWdQuota` in [Get currencies](/docs-v5/en/#funding-account-rest-api-get-currencies)\
    -   Withdrawal quota unit is adjusted from `BTC` to `USD`

# 2023-03-01 

-   Added new response parameters
    -   [Get algo order history](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)
    -   [Algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)\
    -   [Advance algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-advance-algo-orders-channel)\

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  failCode                String                  It represents that the reason that algo order fails to trigger. It is \"\" when the state is `effective`/`canceled`. There will be value when the state is `order_failed`, e.g. 51008;\
                                                  Only applicable to Stop Order, Trailing Stop Order, Trigger order.

  algoClOrdId             String                  Client-supplied Algo ID
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   The change of request and response parameters\
    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)\
    -   [Get algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)\

#### Adjusted request parameter 

Before:\

  ----------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------------
  clOrdId           String            No                Client Order ID as assigned by the client\
                                                        A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------

After:\

  ----------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------------
  algoClOrdId       String            No                Client-supplied Algo ID\
                                                        A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------

#### Added new response parameters 

  Parameter     Type     Description
  ------------- -------- -------------------------
  algoClOrdId   String   Client-supplied Algo ID

Request parameter \`clOrdId\` already was replaced by \`algoClOrdId\`, and still be returned for forward compatbility

-   Added new response parameters
    -   [Get Order Details](/docs-v5/en/#order-book-trading-trade-get-order-details)\
    -   [Get Order List](/docs-v5/en/#order-book-trading-trade-get-order-details)\
    -   [Get Order History (last 7 days）](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\
    -   [Get Order History (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)\
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)\

  Parameter     Type     Description
  ------------- -------- --------------------------------------------------------------------------------------------------------------------------
  algoClOrdId   String   Client-supplied Algo ID. There will be a value when algo order attaching `algoClOrdId` is triggered, or it will be \"\".
  algoId        String   Algo ID. There will be a value when algo order is triggered, or it will be \"\".

-   Added new endpoint:
    -   [Get algo order details](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-details)\

# 2023-02-20 

-   Adjusted push data parameter\
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)\

Combined \'Order canceled by system\' to enum 0, and updated the corresponding meanings of enums.\

Before:

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------------------------------------------------------------------------------------------------------------------------
  \> cancelSource         String                  Source of the order cancellation.\
                                                  Valid values and the corresponding meanings are:\
                                                  `0`,`5`,`7`,`8`,`10`,`11`,`12`,`15`,`16`,`18`,`19`: Order canceled by system\
                                                  `1`: Order canceled by user\
                                                  `2`: Pre reduce-only order canceled, due to insufficient margin in user position\
                                                  `3`: Risk cancellation was triggered. Pending order was canceled due to insufficient maintenance margin ratio and forced-liquidation risk.\
                                                  `4`: Borrowings of crypto reached hard cap.\
                                                  `6`: ADL order cancellation was triggered. Pending order was canceled due to a low margin ratio and forced-liquidation risk.\
                                                  `9`: Insufficient balance after funding fees deducted.\
                                                  `13`: FOK order was canceled due to incompletely filled.\
                                                  `14`: IOC order was partially canceled due to incompletely filled.\
                                                  `17`: Close order was canceled, due to the position was already closed at market price.\
                                                  `20`: Cancel all after triggered

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

After:

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------
  \> cancelSource         String                  Source of the order cancellation.\
                                                  Valid values and the corresponding meanings are:\
                                                  `0`: Order canceled by system\
                                                  `1`: Order canceled by user\
                                                  `2`: Order canceled: Pre reduce-only order canceled, due to insufficient margin in user position\
                                                  `3`: Order canceled: Risk cancellation was triggered. Pending order was canceled due to insufficient maintenance margin ratio and forced-liquidation risk.\
                                                  `4`: Order canceled: Borrowings of crypto reached hard cap, order was canceled by system.\
                                                  `6`: Order canceled: ADL order cancellation was triggered. Pending order was canceled due to a low margin ratio and forced-liquidation risk.\
                                                  `9`: Order canceled: Insufficient balance after funding fees deducted.\
                                                  `13`: Order canceled: FOK order was canceled due to incompletely filled.\
                                                  `14`: Order canceled: IOC order was partially canceled due to incompletely filled.\
                                                  `17`: Order canceled: Close order was canceled, due to the position was already closed at market price.\
                                                  `20`: Cancel all after triggered\
                                                  `21`: Order canceled: The TP/SL order was canceled because the position had been closed\
                                                  `22`, `23`: Order canceled: Reduce-only orders only allow reducing your current position. System has already canceled this order.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2023-02-17 

-   Added new endpoint:
    -   [Set auto loan](/docs-v5/en/#trading-account-rest-api-set-auto-loan)\

# 2022-02-15 

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ -------------------------------------------------------------------------------------------------------------------
  58127        200                Main account API Key does not support current transfer \'type\' parameter. Please refer to the API documentation.
  58128        200                Sub-account API Key does not support current transfer \'type\' parameter. Please refer to the API documentation.

-   Added new response fields\
    -   [Get Transaction details (last 3 days)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-days)\
    -   [Get transaction details (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-months)\

  Parameter   Type     Description
  ----------- -------- -------------------------------------------------------------------
  fillTime    String   Trade time which is the same as `fillTime` for the order channel.

# 2023-02-08 

-   Added new response parameters\
    -   [Deposit info channel](/docs-v5/en/#funding-account-websocket-deposit-info-channel)\

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------
  \> fromWdId             String                  Internal transfer initiator\'s withdrawal ID\
                                                  If the deposit comes from internal transfer, this field displays the withdrawal ID of the internal transfer initiator, and will return \"\" in other cases

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameters\
    -   [Withdrawal info channel](/docs-v5/en/#funding-account-websocket-withdrawal-info-channel)\

  -----------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------
  \> nonTradableAsset     String                  Whether it is a non-tradable asset or not\
                                                  `true`: non-tradable asset, `false`: tradable asset

  \> feeCcy               String                  Withdrawal fee currency, e.g. `USDT`
  -----------------------------------------------------------------------------------------------------

# 2023-02-07 

-   The websocket close frame status code will be updated with reason text.\
    The change can be ignored if client is not processing websocket close frame status code number.\
    The change will be effective in production environment from February 15, 2023.\
    \

# 2023-02-02 

-   Added new response parameters\
    -   [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)\

  Parameter   Type     Description
  ----------- -------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ip          String   IP addresses that linked with current API key, separate with commas if more than one, e.g. `117.37.203.58,117.37.203.57`. It is an empty string \"\" if there is no IP bonded.

-   Added new endpoints
    -   [Get the user\'s broker rebate information](/docs-v5/broker_en/#fd-api-and-oauth-broker-api-get-the-user-39-s-broker-rebate-information)\
    -   [Get the user\'s affiliate rebate information](/docs-v5/en/#sub-account-rest-api-get-the-user-39-s-affiliate-rebate-information)\

# 2023-02-01 

-   Added enumeration value to `type` of [Asset bills details](/docs-v5/en/#funding-account-rest-api-asset-bills-details)

  ------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ------------------------------
  type                    String                  Bill type\
                                                  `225`: Shark Fin subscribe\
                                                  `226`: Shark Fin collection\
                                                  `227`: Shark Fin profit\
                                                  `228`: Shark Fin refund

  ------------------------------------------------------------------------------

# 2023-01-30 

-   Added new request parameter\
    -   [Cancel Quote](/docs-v5/en/#block-trading-rest-api-cancel-quote)\

#### Request parameter 

  Parameter   Type     Required   Description
  ----------- -------- ---------- -------------
  rfqId       String   No         RFQ ID.

# 2023-01-19 

-   Added new channel:
    -   [Deposit info channel](/docs-v5/en/#funding-account-websocket-deposit-info-channel)
    -   [Withdrawal info channel](/docs-v5/en/#funding-account-websocket-withdrawal-info-channel)

# 2023-01-09 

-   Added new endpoint:
    -   [Get deposit withdraw status](/docs-v5/en/#funding-account-rest-api-get-deposit-withdraw-status)

# 2022-12-30 

-   Added new request & response parameter\
    -   [Get deposit history](/docs-v5/en/#funding-account-rest-api-get-deposit-history)\

#### Request parameter 

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------------------------------------------------------------------------------------------------------
  fromWdId          String            No                Internal transfer initiator\'s withdrawal ID\
                                                        If the deposit comes from internal transfer, this field displays the withdrawal ID of the internal transfer initiator

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### Response parameter 

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------------------------------
  fromWdId                String                  Internal transfer initiator\'s withdrawal ID\
                                                  If the deposit comes from internal transfer, this field displays the withdrawal ID of the internal transfer initiator

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2022-12-28 

-   The Bar size of candlesticks have made some changes:\
    The change content: To better system performance, the endpoints and channels below do not support these bar sizes: 6M, 1Y, 6Mutc, 1Yutc.\
    \

    -   [Get candlesticks](/docs-v5/en/#order-book-trading-market-data-get-candlesticks)\
    -   [Get candlesticks history](/docs-v5/en/#order-book-trading-market-data-get-candlesticks-history)\
    -   [Get index candlesticks](/docs-v5/en/#public-data-rest-api-get-index-candlesticks)\
    -   [Get index candlesticks history](/docs-v5/en/#public-data-rest-api-get-index-candlesticks-history)\
    -   [Get mark price candlesticks](/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks)\
    -   [Get mark price candlesticks history](/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks-history)\
    -   [Candlesticks channel](/docs-v5/en/#order-book-trading-market-data-ws-candlesticks-channel)\
    -   [Index candlesticks channel](/docs-v5/en/#public-data-websocket-index-candlesticks-channel)\
    -   [Mark price candlesticks channel](/docs-v5/en/#public-data-websocket-mark-price-candlesticks-channel)\
        \

-   The push logic of "[Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)" has been changed:\
    The change content: To better system performance, the full instrument list is not pushed for the first time after the subscription on "[Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)". Please get the full instrument list from [Get instruments](/docs-v5/en/#public-data-rest-api-get-instruments), and get updates from "[Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)".\
    \

-   Added new endpoint and channel:

    -   [Get option trades](/docs-v5/en/#order-book-trading-market-data-get-option-trades)\
    -   [Option trades channel](/docs-v5/en/#order-book-trading-market-data-ws-option-trades-channel)\

# 2022-12-23 

-   Added a new function module [Fast API](/docs-v5/broker_en/#fd-api-and-oauth-broker-fast-api)\
    \

-   Added new response parameters\

    -   [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)\

  -------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------
  opAuth                  String                  Whether the option trading was activated\
                                                  `0` not activate, `1` activated

  -------------------------------------------------------------------------------------------

# 2022-12-20 

-   Added new endpoint:

    -   [Activate option](/docs-v5/en/#trading-account-rest-api-activate-option)\
        \

-   Added a new response parameter

    -   [Get algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)
    -   [Get algo order history](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)

  Parameter   Type     Description
  ----------- -------- ---------------------------------
  last        String   Last filled price while placing

Quick Margin has been deployed to the production trading service\

-   Added new request parameters\
    -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)\
    -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)\
    -   [Place order channel](/docs-v5/en/#order-book-trading-trade-ws-place-order)\
    -   [Place multiple orders channel](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)\
    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)\
    -   [Get maximum available balance/equity](/docs-v5/en/#trading-account-rest-api-get-maximum-available-balance-equity)\

  -----------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------------------------------------------------------------
  quickMgnType      String            No                Quick Margin type. Only applicable to Quick Margin Mode of isolated margin\
                                                        `manual`, `auto_borrow`, `auto_repay`\
                                                        The default value is `manual`

  -----------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameters\
    -   [Get Order Details](/docs-v5/en/#order-book-trading-trade-get-order-details)\
    -   [Get Order List](/docs-v5/en/#order-book-trading-trade-get-order-list)\
    -   [Get Algo Order List](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)\
    -   [Order Channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)\

  -----------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -----------------------------------------------------------------------------
  quickMgnType            String                  Quick Margin type, Only applicable to Quick Margin Mode of isolated margin\
                                                  `manual`, `auto_borrow`, `auto_repay`

  -----------------------------------------------------------------------------------------------------------------------------

-   Added new response parameters\
    -   [Get positions](/docs-v5/en/#trading-account-rest-api-get-positions)\
    -   [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)\

  Parameter       Type     Description
  --------------- -------- -----------------------------------------------------------------------------------------------------------
  baseBorrowed    String   Base currency amount already borrowed, only applicable to MARGIN(Quick Margin Mode）
  baseInterest    String   Base Interest, undeducted interest that has been incurred, only applicable to MARGIN(Quick Margin Mode）
  quoteBorrowed   String   Quote currency amount already borrowed, only applicable to MARGIN(Quick Margin Mode）
  quoteInterest   String   Quote Interest, undeducted interest that has been incurred, only applicable to MARGIN(Quick Margin Mode）

-   Adjust request parameters\
    -   [Increase/Decrease margin](/docs-v5/en/#trading-account-rest-api-increase-decrease-margin)\

Before：\

  -----------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------------------------------------------
  type              String            Yes               `add`: add margin\
                                                        `reduce`: reduce margin

  ccy               String            No                Currency, only applicable to `MARGIN`（Manual transfers）
  -----------------------------------------------------------------------------------------------------------------

After：\

  ---------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------
  type              String            Yes               `add`: add margin, or transfer collaterals in (Quick Margin Mode)\
                                                        `reduce`: reduce margin, transfer collaterals out (Quick Margin Mode)

  ccy               String            No                Currency, only applicable to `MARGIN`（Manual transfers and Quick Margin Mode）
  ---------------------------------------------------------------------------------------------------------------------------------------

-   Added enumeration value\
    -   [Get Account Configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)\

  **Parameter**   **Type**   **Description**
  --------------- ---------- ----------------------------------------------------------------------------------------------------------------------------------------------------
  mgnIsoMode      String     quick_margin: Quick Margin Mode(For new accounts, including subaccounts, Some defaults will be automatic, and Other defaults will be quick_margin)

-   Added enumeration value\
    -   [Isolated margin trading settings](/docs-v5/en/#trading-account-rest-api-isolated-margin-trading-settings)\

  **Parameter**   **Type**   **Description**
  --------------- ---------- ---------------------------------
  isoMode         String     quick_margin: Quick Margin Mode

-   Added enumeration value\
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)\
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)\

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------------------------------------------------------------------------------
  type              String            No                Bill type\
                                                        `15`: Quick Margin

  subType           String            No                Bill subtype\
                                                        `210`: Manual Borrowing `211`: Manual Repayment `212`: Auto borrow `213`: Auto repay `16`: Repay forcibly `17`: Repay interest by borrowing forcibly
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added endpoints\

    -   [Manual borrow and repay in Quick Margin Mode](/docs-v5/en/#trading-account-rest-api-manual-borrow-and-repay-in-quick-margin-mode)\
    -   [Get borrow and repay history in Quick Margin Mode](/docs-v5/en/#trading-account-rest-api-get-borrow-and-repay-history-in-quick-margin-mode)\

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ ----------------------------------------------------------------------------------------------------------------------
  59313        200                Unable to repay. You haven\'t borrowed any \${ccy} (\${ccyPair}) in Quick margin mode.
  51152        200                Unable to place an order that mixes automatic buy with automatic repayment or manual operation in Quick margin mode.

# 2022-12-15 

-   Added new response parameter\
    -   [Get offers](/docs-v5/en/#financial-product-earn-get-offers)\

  ------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ------------------------------------
  state                   String                  Product state\
                                                  `purchasable`: Purchasable\
                                                  `sold_out`: Sold out\
                                                  `Stop`: Suspension of subscription

  ------------------------------------------------------------------------------------

-   Added new request & response parameter\
    -   [Purchase](/docs-v5/en/#financial-product-earn-post-purchase)\

#### Request parameter 

  ----------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------------
  tag               String            No                Order tag\
                                                        A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 16 characters.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------

#### Response parameter 

  Parameter   Type     Description
  ----------- -------- -------------
  tag         String   Order tag

-   Added new response parameter\
    -   [Redeem](/docs-v5/en/#financial-product-earn-post-redeem)\
    -   [Cancel purchases/redemptions](/docs-v5/en/#financial-product-earn-post-cancel-purchases-redemptions)\
    -   [Get order history](/docs-v5/en/#financial-product-earn-get-order-history)\

  Parameter   Type     Description
  ----------- -------- -------------
  tag         String   Order tag

-   Added new response parameter\
    -   [Get active orders](/docs-v5/en/#financial-product-earn-get-active-orders)\

  Parameter                  Type     Description
  -------------------------- -------- -----------------------------------------------------
  estSettlementTime          String   Estimated redemption settlement time
  cancelRedemptionDeadline   String   Deadline for cancellation of redemption application
  tag                        String   Order tag

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ -----------------------------------
  51732        200                Required user KYC level not met
  51733        200                User is under risk control
  51734        200                User KYC Country is not supported
  51735        200                Sub-account is not supported
  51736        200                Insufficient {ccy} balance

Copy trading endpoints have been deployed to the production trading service

-   Added new response parameters\
    -   [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)\

  -----------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------
  roleType                String                  Role type.\
                                                  `0`: General user；`1`：Leading trader；`2`：Copy trader

  traderInsts             String                  Leading trade instruments, only applicable to lead trader
  -----------------------------------------------------------------------------------------------------------

-   Added enumeration value\
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)\
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)\

  ---------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------
  type              String            No                Bill type\
                                                        `18`: Profit sharing

  subType           String            No                Bill subtype\
                                                        `250`: Profit sharing expenses; `251`: Profit sharing refund; `252`: Profit sharing income;
  ---------------------------------------------------------------------------------------------------------------------------------------------------

-   Added rate limit rules of leading contracts:

    -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
    -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
    -   [Amend order](/docs-v5/en/#order-book-trading-trade-post-amend-order)
    -   [Amend multiple orders](/docs-v5/en/#order-book-trading-trade-post-amend-multiple-orders)
    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)
    -   [Websocket Place order](/docs-v5/en/#order-book-trading-trade-ws-place-order)
    -   [Websocket Place multiple orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)
    -   [Websocket Amend order](/docs-v5/en/#order-book-trading-trade-ws-amend-order)
    -   [Websocket Amend multiple orders](/docs-v5/en/#order-book-trading-trade-ws-amend-multiple-orders)

-   Added new endpoints:

    -   [Get existing leading positions](/docs-v5/en/#order-book-trading-copy-trading-get-existing-lead-positions)
    -   [Get leading position history](/docs-v5/en/#order-book-trading-copy-trading-get-lead-position-history)
    -   [Place leading stop order](/docs-v5/en/#order-book-trading-copy-trading-post-place-lead-stop-order)
    -   [Close leading position](/docs-v5/en/#order-book-trading-copy-trading-post-close-lead-position)
    -   [Amend leading instruments](/docs-v5/en/#order-book-trading-copy-trading-post-amend-leading-instruments)
    -   [Get leading instruments](/docs-v5/en/#order-book-trading-copy-trading-get-leading-instruments)
    -   [Get profit sharing details](/docs-v5/en/#order-book-trading-copy-trading-get-profit-sharing-details)
    -   [Get total profit sharing](/docs-v5/en/#order-book-trading-copy-trading-get-total-profit-sharing)
    -   [Get unrealized profit sharing details](/docs-v5/en/#order-book-trading-copy-trading-get-unrealized-profit-sharing-details)

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  51156        200                You\'re leading trades in long/short mode and can\'t use this API endpoint to close positions
  51159        200                You\'re leading trades in buy/sell mode. If you want to place orders using this API endpoint, the orders must be in the same direction as your existing positions and open orders.
  51162        200                You have {instrument} open orders. Cancel these orders and try again
  51163        200                You hold {instrument} positions. Close these positions and try again
  51166        200                Currently, we don\'t support leading trades with this instrument
  51321        200                You\'re leading trades. Currently, we don\'t support leading trades with arbitrage, iceberg, or TWAP bots
  51322        200                You\'re leading trades that have been filled at market price. We\'ve canceled your open stop orders to close your positions
  51323        200                You\'re already leading trades with take profit or stop loss settings. Cancel your existing stop orders to proceed
  51324        200                As a lead trader, you hold positions in {instrument}. To close your positions, place orders in the amount that equals the available amount for closing
  51325        200                As a lead trader, you must use market price when placing stop orders
  59128        200                As a lead trader, you can\'t lead trades in {instrument} with leverage higher than {num}×
  59216        200                The position doesn\'t exist. Please try again

# 2022-12-14 

-   Added new response parameters
    -   [Get positions](/docs-v5/en/#trading-account-rest-api-get-positions)
    -   [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)

  Parameter    Type     Description
  ------------ -------- -------------------------------------------------
  bizRefId     String   External business id, e.g. experience coupon id
  bizRefType   String   External business type

-   Added new response parameter
    -   [Get order details](/docs-v5/en/#order-book-trading-trade-get-order-details)\
    -   [Get order history (last 7 days)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\

  Parameter            Type     Description
  -------------------- -------- ----------------------------------
  cancelSource         String   Code of the cancellation source.
  cancelSourceReason   String   Reason for the cancellation.

The optimization of VIP Loan stable interest rate launched on production environment

-   The change of request and response parameters\
    -   [VIP loans borrow and repay](/docs-v5/en/#trading-account-rest-api-vip-loans-borrow-and-repay)\

#### Adjusted response parameter 

Before:\

  Parameter   Type     Description
  ----------- -------- ----------------------------------------------------------------
  amt         String   borrow/repay amount
  loanQuota   String   Borrow limit
  posLoan     String   Frozen amount for current account (Within the locked quota)
  availLoan   String   Available amount for current account (Within the locked quota)
  usedLoan    String   Borrowed amount for current account

After:\

  Parameter   Type     Description
  ----------- -------- -----------------------------
  amt         String   Already borrow/repay amount

#### Added new request parameter 

  Parameter   Type     Required      Description
  ----------- -------- ------------- -------------------------------------------------------
  ordId       String   Conditional   Order ID of borrowing, it is necessary while repaying

#### Added new response parameters 

  -----------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------
  ordId                   String                  Order ID of borrowing

  state                   String                  State\
                                                  1:Borrowing\
                                                  2:Borrowed\
                                                  3:Repaying\
                                                  4:Repaid\
                                                  5:Borrow failed
  -----------------------------------------------------------------------

-   Added new response parameter
    -   [Get borrow interest and limit](/docs-v5/en/#trading-account-rest-api-get-borrow-interest-and-limit)\

  Parameter    Type     Description
  ------------ -------- ---------------------------------------------------------------------------
  \> avgRate   String   Average interest of Already borrowed coin, only applicable to `VIP loans`

-   Added new endpoints:
    -   [Get VIP interest accrued data](/docs-v5/en/#trading-account-rest-api-get-vip-interest-accrued-data)
    -   [Get VIP interest deducted data](/docs-v5/en/#trading-account-rest-api-get-vip-interest-deducted-data)
    -   [Get VIP loan order list](/docs-v5/en/#trading-account-rest-api-get-vip-loan-order-list)
    -   [Get VIP loan order detail](/docs-v5/en/#trading-account-rest-api-get-vip-loan-order-detail)

# 2022-12-12 

-   The Bar size of candlesticks will make some changes:\
    The change date of demo trading environment: December 15, 2022.\
    The change date of production environment: December 28, 2022.\
    The change content: To better system performance, the endpoints and channels below will not support these bar sizes: 6M, 1Y, 6Mutc, 1Yutc.\
    \

    -   [Get candlesticks](/docs-v5/en/#order-book-trading-market-data-get-candlesticks)\
    -   [Get candlesticks history](/docs-v5/en/#order-book-trading-market-data-get-candlesticks-history)\
    -   [Get index candlesticks](/docs-v5/en/#public-data-rest-api-get-index-candlesticks)\
    -   [Get index candlesticks history](/docs-v5/en/#public-data-rest-api-get-index-candlesticks-history)\
    -   [Get mark price candlesticks](/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks)\
    -   [Get mark price candlesticks history](/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks-history)\
    -   [Candlesticks channel](/docs-v5/en/#order-book-trading-market-data-ws-candlesticks-channel)\
    -   [Index candlesticks channel](/docs-v5/en/#public-data-websocket-index-candlesticks-channel)\
    -   [Mark price candlesticks channel](/docs-v5/en/#public-data-websocket-mark-price-candlesticks-channel)\

# 2022-12-09 

-   Added new endpoint\
    -   [Get sub-account withdrawal history](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-sub-account-withdrawal-history)

# 2022-12-08 

-   Added new response parameter\
    -   [Get currencies](/docs-v5/en/#funding-account-rest-api-get-currencies)\

  Parameter             Type     Description
  --------------------- -------- ------------------------------------
  depQuoteDailyLayer2   String   Layer2 network daily deposit limit

-   Added new request & response parameter\
    -   [Create RFQ](/docs-v5/en/#block-trading-rest-api-create-rfq)\

#### Request parameter 

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------------------------
  tag               String            No                RFQ tag. The block trade associated with the RFQ will have the same tag.\
                                                        A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 16 characters.

  \> posSide        String            No                Position side. The default is `net` in the net mode. It can only be `long` or `short` in the long/short mode.\
                                                        If not specified, users in long/short mode always open new positions.\
                                                        Only applicable to FUTURES/SWAP.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### Response parameter 

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \> tag                  String                  RFQ tag. The block trade associated with the RFQ will have the same tag.

  \>\> posSide            String                  Position side. The default is `net` in the net mode. If not specified, return \"\", which is equivalent to net.\
                                                  It can only be `long` or `short` in the long/short mode. If not specified, return \"\", which corresponds to the direction that opens new positions for the trade (buy =\> long, sell =\> short).\
                                                  Only applicable to FUTURES/SWAP.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new request & response parameter\
    -   [Create Quote](/docs-v5/en/#block-trading-rest-api-create-quote)\

#### Request parameter 

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------------------------
  tag               String            No                Quote tag. The block trade associated with the Quote will have the same tag.\
                                                        A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 16 characters.

  \> posSide        String            No                Position side. The default is `net` in the net mode. It can only be `long` or `short` in the long/short mode.\
                                                        If not specified, users in long/short mode always open new positions.\
                                                        Only applicable to FUTURES/SWAP.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### Response parameter 

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \> tag                  String                  Quote tag. The block trade associated with the Quote will have the same tag.

  \>\> posSide            String                  Position side. The default is `net` in the net mode. If not specified, return \"\", which is equivalent to net.\
                                                  It can only be `long` or `short` in the long/short mode. If not specified, return \"\", which corresponds to the direction that opens new positions for the trade (buy =\> long, sell =\> short).\
                                                  Only applicable to FUTURES/SWAP.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameter\
    -   [Get rfqs](/docs-v5/en/#block-trading-rest-api-get-rfqs)\

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \> tag                  String                  RFQ tag. The block trade associated with the RFQ will have the same tag.

  \>\> posSide            String                  Position side. The default is `net` in the net mode. If not specified, return \"\", which is equivalent to net.\
                                                  It can only be `long` or `short` in the long/short mode. If not specified, return \"\", which corresponds to the direction that opens new positions for the trade (buy =\> long, sell =\> short).\
                                                  Only applicable to FUTURES/SWAP.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameter\
    -   [Get Quotes](/docs-v5/en/#block-trading-rest-api-get-quotes)\

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \> tag                  String                  Quote tag. The block trade associated with the Quote will have the same tag.

  \>\> posSide            String                  Position side. The default is `net` in the net mode. If not specified, return \"\", which is equivalent to net.\
                                                  It can only be `long` or `short` in the long/short mode. If not specified, return \"\", which corresponds to the direction that opens new positions for the trade (buy =\> long, sell =\> short).\
                                                  Only applicable to FUTURES/SWAP.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameter\
    -   [Execute Quote](/docs-v5/en/#block-trading-rest-api-execute-quote)\
    -   [Get trades](/docs-v5/en/#block-trading-rest-api-get-trades)\

  Parameter   Type     Description
  ----------- -------- -------------------------------------------------------------------------------------
  \> tag      String   Trade tag. The block trade will have the tag of the RFQ or Quote it corresponds to.

-   Added new push data parameter\
    -   [Rfqs channel](/docs-v5/en/#block-trading-websocket-private-channel-rfqs-channel)\

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \> tag                  String                  RFQ tag. The block trade associated with the RFQ will have the same tag.

  \>\> posSide            String                  Position side. The default is `net` in the net mode. If not specified, return \"\", which is equivalent to net.\
                                                  It can only be `long` or `short` in the long/short mode. If not specified, return \"\", which corresponds to the direction that opens new positions for the trade (buy =\> long, sell =\> short).\
                                                  Only applicable to FUTURES/SWAP.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new push data parameter\
    -   [Quotes channel](/docs-v5/en/#block-trading-websocket-private-channel-quotes-channel)\

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \> tag                  String                  Quote tag. The block trade associated with the Quote will have the same tag.

  \>\> posSide            String                  Position side. The default is `net` in the net mode. If not specified, return \"\", which is equivalent to net.\
                                                  It can only be `long` or `short` in the long/short mode. If not specified, return \"\", which corresponds to the direction that opens new positions for the trade (buy =\> long, sell =\> short).\
                                                  Only applicable to FUTURES/SWAP.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new push data parameter\
    -   [Structure block trades channel](/docs-v5/en/#block-trading-websocket-private-channel-structure-block-trades-channel)\

  Parameter   Type     Description
  ----------- -------- -------------------------------------------------------------------------------------
  \> tag      String   Trade tag. The block trade will have the tag of the RFQ or Quote it corresponds to.

# 2022-12-06 

-   The push logic of "[Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)" will be changed:\
    The change date of demo trading environment: December 15, 2022.\
    The change date of production environment: December 28, 2022.\
    The change content: To better system performance, the full instrument list will not be pushed for the first time after the subscription on "[Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)". Please get the full instrument list from [Get instruments](/docs-v5/en/#public-data-rest-api-get-instruments), and get updates from "[Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)".\
    \

-   Logic optimization of reduce-only orders launched.

    -   After launch, There may be conditions that the system modify order size and cancel reduce-only pending orders(Depending on the priority of orders, more detail can refer to the related product document)\
    -   It is applicable for reduce-only orders coming from FUTURES and SWAP in buy/sell mode.
    -   You can check returned `sMsg` to get the prompt message if the system modifies order size after placement;
    -   The `cancelSource` of orders channel will be 22 or 23 if the system cancels reduce-only pending orders.\
        \

# 2022-12-01 

-   Logic optimization of reduce-only orders will be launched on December 5, 2022.

    -   After launch, There may be conditions that the system modify order size and cancel reduce-only pending orders(Depending on the priority of orders, more detail can refer to the related product document)\
    -   It is applicable for reduce-only orders coming from FUTURES and SWAP in buy/sell mode.
    -   You can check returned `sMsg` to get the prompt message if the system modifies order size after placement;
    -   The `cancelSource` of orders channel will be 22 or 23 if the system cancels reduce-only pending orders.\
        \

-   The response fields within [Get instruments](/docs-v5/en/#public-data-rest-api-get-instruments) and [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel) have been adjusted in the production trading service.\
    The test trading pairs will be returned, and their `state` will be `test`.\
    \

-   Adjusted response parameters:

    -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)\
    -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)\
    -   [Place order channel](/docs-v5/en/#order-book-trading-trade-ws-place-order)\
    -   [Place multiple orders channel](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)\

Other endpoints and channels may have the same adjustment, so we advise you to be compatible in advance

Before:

  Parameter   Type     Description
  ----------- -------- ---------------------------------------------------
  sMsg        String   Rejection message if the request is unsuccessful.

After:

  Parameter   Type     Description
  ----------- -------- --------------------------------------------------
  sMsg        String   Rejection or success message of event execution.

-   Added new endpoint\

    -   [Get non-tradable assets](/docs-v5/en/#funding-account-rest-api-get-non-tradable-assets)

-   Added new response parameter\

    -   [Get withdrawal history](/docs-v5/en/#funding-account-rest-api-get-withdrawal-history)\

  -----------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------
  nonTradableAsset        Boolean                 Whether it is a non-tradable asset or not\
                                                  `true`: non-tradable asset, `false`: tradable asset

  feeCcy                  String                  Withdrawal fee currency, e.g. `USDT`
  -----------------------------------------------------------------------------------------------------

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ ------------------------------------------------------------------------------------
  58125        200                Non-tradable assets can only be transferred from sub-accounts to main accounts
  58126        200                Non-tradable assets can only be transferred between funding accounts
  58227        200                Withdrawal of non-tradable assets can be withdrawn all at once only
  58228        200                Withdrawal of non-tradable assets requires that the API Key must be bound to an IP
  58229        200                Insufficient funding account balance to pay fees {fee} USDT

# 2022-11-30 

-   Added new endpoint\

    -   [Set risk offset type](/docs-v5/en/#trading-account-rest-api-set-risk-offset-type)
    -   [Get Quote products](/docs-v5/en/#block-trading-rest-api-get-quote-products)

-   Added new response parameters\

    -   [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)\

  Parameter   Type     Description
  ----------- -------- ------------------------------------------------------------------------------------------------------------------------------------------
  label       String   API key note of current request API key. No more than 50 letters (case sensitive) or numbers, which can be pure letters or pure numbers.

-   Added enumeration value for `perm` field\
    -   [Create an API Key for a sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-create-an-api-key-for-a-sub-account)\
    -   [Reset the API Key of a sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-reset-the-api-key-of-a-sub-account)\

  -----------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -----------------------
  perm                    String                  API Key permissions\
                                                  `withdraw`: Withdraw

  -----------------------------------------------------------------------

-   New rate limit rules\
    -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)
    -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)
    -   [Amend order](/docs-v5/en/#order-book-trading-trade-post-amend-order)
    -   [Amend multiple orders](/docs-v5/en/#order-book-trading-trade-post-amend-multiple-orders)
    -   [Cancel order](/docs-v5/en/#order-book-trading-trade-post-cancel-order)
    -   [Cancel multiple orders](/docs-v5/en/#order-book-trading-trade-post-cancel-multiple-orders)
    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)
    -   [Cancel algo order](/docs-v5/en/#order-book-trading-algo-trading-post-cancel-algo-order)
    -   [Cancel advance algo order](/docs-v5/en/#order-book-trading-algo-trading-post-cancel-advance-algo-order)
    -   [Place grid algo order](/docs-v5/en/#order-book-trading-grid-trading-post-place-grid-algo-order)
    -   [Amend grid algo order](/docs-v5/en/#order-book-trading-grid-trading-post-stop-grid-algo-order)
    -   [Stop grid algo order](/docs-v5/en/#order-book-trading-grid-trading-post-place-grid-algo-order)
    -   [Close positions](/docs-v5/en/#order-book-trading-trade-post-close-positions)
    -   [Get order details](/docs-v5/en/#order-book-trading-trade-get-order-details)
    -   [Websocket Place order](/docs-v5/en/#order-book-trading-trade-ws-place-order)
    -   [Websocket Place multiple orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)
    -   [Websocket Amend order](/docs-v5/en/#order-book-trading-trade-ws-amend-order)
    -   [Websocket Amend multiple orders](/docs-v5/en/#order-book-trading-trade-ws-amend-multiple-orders)
    -   [Websocket Cancel order](/docs-v5/en/#order-book-trading-trade-ws-cancel-order)
    -   [Websocket Cancel multiple orders](/docs-v5/en/#order-book-trading-trade-ws-cancel-multiple-orders)

#### Adjusted rate limit rule 

Before:\

-   Derivatives rate limit rule: User ID + (Instrument Type + underlying)\
-   Spot & Margin rate limit rule: User ID + (Instrument Type + Instrument ID)\

After:\

-   Rate limit rule (except Options): User ID + Instrument ID\
-   Rate limit rule (Options only): User ID + Instrument Family\

Changes below are to support Stop-loss or Take-profit close position orders feature.

-   Added a new request parameter and requirement of an existing parameter\
    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  sz                String            Conditional       Quantity to buy or sell\
                                                        Either `sz` or `closeFraction` is required.

  closeFraction     String            Conditional       Fraction of position to be closed when the algo order is triggered.\
                                                        Currently the system supports fully closing the position only so the only accepted value is `1`. For the same position, only one TPSL pending order for fully closing the position is supported.\
                                                        \
                                                        This is only applicable to `FUTURES` or `SWAP` instruments.\
                                                        This is only applicable if `posSide` is `net`.\
                                                        This is only applicable if `reduceOnly` is `true`.\
                                                        This is only applicable if `ordType` is `conditional` or `oco`.\
                                                        This is only applicable if the stop loss and take profit order is executed as market order\
                                                        Either `sz` or `closeFraction` is required.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added a new response parameter
    -   [Get algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)
    -   [Get algo order history](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)

  Parameter       Type     Description
  --------------- -------- ---------------------------------------------------------------------
  closeFraction   String   Fraction of position to be closed when the algo order is triggered.

-   Added new response parameters
    -   [Get positions](/docs-v5/en/#trading-account-rest-api-get-positions)
    -   [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)

  ---------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------------------------------------------------
  \> closeOrderAlgo       Array                   Close position algo orders attached to the position

  \>\> algoId             String                  Algo ID

  \>\> slTriggerPx        String                  Stop-loss trigger price.

  \>\> slTriggerPxType    String                  Stop-loss trigger price type.\
                                                  `last`：last price\
                                                  `index`：index price\
                                                  `mark`：mark price

  \>\> tpTriggerPx        String                  Take-profit trigger price.

  \>\> tpTriggerPxType    String                  Take-profit trigger price type.\
                                                  `last`：last price\
                                                  `index`：index price\
                                                  `mark`：mark price

  \>\> closeFraction      String                  Fraction of position to be closed when the algo order is triggered.
  ---------------------------------------------------------------------------------------------------------------------

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ -----------------------------------------------------------------
  51327        200                closeFraction is only available for futures and perpetual swaps
  51328        200                closeFraction is only available for reduceOnly orders
  51329        200                closeFraction is only available in NET mode
  51330        200                closeFraction is only available for stop market orders

To support Quick Margin Mode, we adjusted endpoints. The adjustment below has been deployed to the demo trading environment, and expect to be deployed to production gradually in December, 2022.\

-   Added new request parameters\
    -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)\
    -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)\
    -   [Place order channel](/docs-v5/en/#order-book-trading-trade-ws-place-order)\
    -   [Place multiple orders channel](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)\
    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)\
    -   [Get maximum available balance/equity](/docs-v5/en/#trading-account-rest-api-get-maximum-available-balance-equity)\

  -----------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------------------------------------------------------------
  quickMgnType      String            No                Quick Margin type. Only applicable to Quick Margin Mode of isolated margin\
                                                        `manual`, `auto_borrow`, `auto_repay`\
                                                        The default value is `manual`

  -----------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameters\
    -   [Get Order Details](/docs-v5/en/#order-book-trading-trade-get-order-details)\
    -   [Get Order List](/docs-v5/en/#order-book-trading-trade-get-order-list)\
    -   [Get Algo Order List](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)\
    -   [Order Channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)\

  -----------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -----------------------------------------------------------------------------
  quickMgnType            String                  Quick Margin type, Only applicable to Quick Margin Mode of isolated margin\
                                                  `manual`, `auto_borrow`, `auto_repay`

  -----------------------------------------------------------------------------------------------------------------------------

-   Added new response parameters\
    -   [Get positions](/docs-v5/en/#trading-account-rest-api-get-positions)\
    -   [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)\

  Parameter       Type     Description
  --------------- -------- -----------------------------------------------------------------------------------------------------------
  baseBorrowed    String   Base currency amount already borrowed, only applicable to MARGIN(Quick Margin Mode）
  baseInterest    String   Base Interest, undeducted interest that has been incurred, only applicable to MARGIN(Quick Margin Mode）
  quoteBorrowed   String   Quote currency amount already borrowed, only applicable to MARGIN(Quick Margin Mode）
  quoteInterest   String   Quote Interest, undeducted interest that has been incurred, only applicable to MARGIN(Quick Margin Mode）

-   Adjust request parameters\
    -   [Increase/Decrease margin](/docs-v5/en/#trading-account-rest-api-increase-decrease-margin)\

Before：\

  -----------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------------------------------------------
  type              String            Yes               `add`: add margin\
                                                        `reduce`: reduce margin

  ccy               String            No                Currency, only applicable to `MARGIN`（Manual transfers）
  -----------------------------------------------------------------------------------------------------------------

After：\

  ---------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------
  type              String            Yes               `add`: add margin, or transfer collaterals in (Quick Margin Mode)\
                                                        `reduce`: reduce margin, transfer collaterals out (Quick Margin Mode)

  ccy               String            No                Currency, only applicable to `MARGIN`（Manual transfers and Quick Margin Mode）
  ---------------------------------------------------------------------------------------------------------------------------------------

-   Added enumeration value
    -   [Get Account Configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)\

  **Parameter**   **Type**   **Description**
  --------------- ---------- ---------------------------------
  mgnIsoMode      String     quick_margin: Quick Margin Mode

-   Added enumeration value\
    -   [Get Account Configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)\

  **Parameter**   **Type**   **Description**
  --------------- ---------- ---------------------------------
  mgnIsoMode      String     quick_margin: Quick Margin Mode

-   Added enumeration value\
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)\
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)\

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------------------------------------------------------------------------------
  type              String            No                Bill type\
                                                        `15`: Quick Margin

  subType           String            No                Bill subtype\
                                                        `210`: Manual Borrowing `211`: Manual Repayment `212`: Auto borrow `213`: Auto repay `16`: Repay forcibly `17`: Repay interest by borrowing forcibly
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added endpoints\

    -   [Manual borrow and repay in Quick Margin Mode](/docs-v5/en/#trading-account-rest-api-manual-borrow-and-repay-in-quick-margin-mode)\
    -   [Get borrow and repay history in Quick Margin Mode](/docs-v5/en/#trading-account-rest-api-get-borrow-and-repay-history-in-quick-margin-mode)\

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ ----------------------------------------------------------------------------------------
  59313        200                Unable to repay. You haven\'t borrowed any \${ccy} (\${ccyPair}) in Quick margin mode.

# 2022-11-29 

To support the optimization of VIP Loan stable interest rate, we adjusted endpoints. The adjustment below has been deployed to the demo trading environment, and expect to be deployed to production on December 14, 2022.

-   The change of request and response parameters\
    -   [VIP loans borrow and repay](/docs-v5/en/#trading-account-rest-api-vip-loans-borrow-and-repay)\

#### Adjusted response parameter 

Before:\

  Parameter   Type     Description
  ----------- -------- ---------------------
  amt         String   borrow/repay amount

After:\

  Parameter   Type     Description
  ----------- -------- -----------------------------
  amt         String   Already borrow/repay amount

#### Added new request parameter 

  Parameter   Type     Required      Description
  ----------- -------- ------------- -------------------------------------------------------
  ordId       String   Conditional   Order ID of borrowing, it is necessary while repaying

#### Added new response parameters 

  -----------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------
  ordId                   String                  Order ID of borrowing

  state                   String                  State\
                                                  1:Borrowing\
                                                  2:Borrowed\
                                                  3:Repaying\
                                                  4:Repaid\
                                                  5:Borrow failed
  -----------------------------------------------------------------------

-   Added new response parameter
    -   [Get borrow interest and limit](/docs-v5/en/#trading-account-rest-api-get-borrow-interest-and-limit)\

  Parameter    Type     Description
  ------------ -------- ---------------------------------------------------------------------------
  \> avgRate   String   Average interest of Already borrowed coin, only applicable to `VIP loans`

-   Added new endpoints:
    -   [Get VIP interest accrued data](/docs-v5/en/#trading-account-rest-api-get-vip-interest-accrued-data)
    -   [Get VIP loan order list](/docs-v5/en/#trading-account-rest-api-get-vip-loan-order-list)
    -   [Get VIP loan order detail](/docs-v5/en/#trading-account-rest-api-get-vip-loan-order-detail)

# 2022-11-28 

-   Added new response parameter\
    -   [Get candlesticks](/docs-v5/en/#order-book-trading-market-data-get-candlesticks)\
    -   [Get candlesticks history](/docs-v5/en/#order-book-trading-market-data-get-candlesticks-history)\
    -   [Get index candlesticks](/docs-v5/en/#public-data-rest-api-get-index-candlesticks)\
    -   [Get index candlesticks history](/docs-v5/en/#public-data-rest-api-get-index-candlesticks-history)\
    -   [Get mark price candlesticks](/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks)\
    -   [Get mark price candlesticks history](/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks-history)\
    -   [Candlesticks channel](/docs-v5/en/#order-book-trading-market-data-ws-candlesticks-channel)\
    -   [Index candlesticks channel](/docs-v5/en/#public-data-websocket-index-candlesticks-channel)\
    -   [Mark price candlesticks channel](/docs-v5/en/#public-data-websocket-mark-price-candlesticks-channel)\

  -----------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------
  confirm                 String                  The state of candlesticks.\
                                                  `0` represents that it is uncompleted, `1` represents that it is completed.

  -----------------------------------------------------------------------------------------------------------------------------

-   Added new endpoint\
    -   [Get option trades](/docs-v5/en/#order-book-trading-market-data-get-option-trades-by-instrument-family)

# 2022-11-25 

-   Adjusted response fields in [Status](/docs-v5/en/#status-get-status) and [Status channel](/docs-v5/en/#status-ws-status-channel)\
    Added enumeration value `8`: Trading service (in batches of accounts) and `9`: Trading service (in batches of products) for `serviceType` field.\
    \

# 2022-11-24 

-   Added new request parameters\
    -   [Set trading fee rate for the sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-set-trading-fee-rate-for-the-sub-account)\

  -----------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------------
  mgnType           String            No                Margin type\
                                                        `1`: USDT-margined\
                                                        `2`: crypto-margined\
                                                        Applicate to `FUTURES/SWAP`

  -----------------------------------------------------------------------------------

# 2022-11-21 

-   New response parameter will be added on November 28, 2022, at the earliest\
    -   [Get candlesticks](/docs-v5/en/#order-book-trading-market-data-get-candlesticks)\
    -   [Get candlesticks history](/docs-v5/en/#order-book-trading-market-data-get-candlesticks-history)\
    -   [Get index candlesticks](/docs-v5/en/#public-data-rest-api-get-index-candlesticks)\
    -   [Get index candlesticks history](/docs-v5/en/#public-data-rest-api-get-index-candlesticks-history)\
    -   [Get mark price candlesticks](/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks)\
    -   [Get mark price candlesticks history](/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks-history)\
    -   [Candlesticks channel](/docs-v5/en/#order-book-trading-market-data-ws-candlesticks-channel)\
    -   [Index candlesticks channel](/docs-v5/en/#public-data-websocket-index-candlesticks-channel)\
    -   [Mark price candlesticks channel](/docs-v5/en/#public-data-websocket-mark-price-candlesticks-channel)\

  -----------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------
  confirm                 String                  The state of candlesticks.\
                                                  `0` represents that it is uncompleted, `1` represents that it is completed.

  -----------------------------------------------------------------------------------------------------------------------------

-   Added new request parameters\
    -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)\
    -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)\

  -------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------------------------------------------------------------
  tpTriggerPx       String            No                Take-profit trigger price\
                                                        If you fill in this parameter, you should fill in the take-profit order price as well.

  tpOrdPx           String            No                Take-profit order price\
                                                        If you fill in this parameter, you should fill in the take-profit trigger price as well.\
                                                        If the price is -1, take-profit will be executed at the market price.

  slTriggerPx       String            No                Stop-loss trigger price\
                                                        If you fill in this parameter, you should fill in the stop-loss order price.

  slOrdPx           String            No                Stop-loss order price\
                                                        If you fill in this parameter, you should fill in the stop-loss trigger price.\
                                                        If the price is -1, stop-loss will be executed at the market price.

  tpTriggerPxType   String            No                Take-profit trigger price type\
                                                        `last`: last price\
                                                        `index`: index price\
                                                        `mark`: mark price\
                                                        The Default is last

  slTriggerPxType   String            No                Stop-loss trigger price type\
                                                        `last`: last price\
                                                        `index`: index price\
                                                        `mark`: mark price\
                                                        The Default is last
  -------------------------------------------------------------------------------------------------------------------------------------------------

# 2022-11-11 

-   Added new request parameters\
    -   [Withdrawal](/docs-v5/en/#funding-account-rest-api-withdrawal)\

  ------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------
  areaCode          String            Optional          Area code for phone number\
                                                        If `toAddr` is a phone number, this parameter is required.

  ------------------------------------------------------------------------------------------------------------------

-   Added new response parameters\
    -   [Get deposit history](/docs-v5/en/#funding-account-rest-api-get-deposit-history)\
    -   [Get sub-account deposit history](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-sub-account-deposit-history)\

  ----------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------
  areaCodeFrom            String                  Area code for phone number\
                                                  If `from` is a phone number, this parameter return area code of the phone number

  ----------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameters\
    -   [Get withdrawal history](/docs-v5/en/#funding-account-rest-api-get-withdrawal-history)\

  -----------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------------
  areaCodeFrom            String                  Area code for phone number\
                                                  If `from` is a phone number, this parameter return the area code for phone number

  areaCodeTo              String                  Area code for phone number\
                                                  If `to` is a phone number, this parameter return the area code for phone number
  -----------------------------------------------------------------------------------------------------------------------------------

# 2022-11-10 

-   Added new push data parameter\
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)\

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------------------------------------------------------------------------------------------------------------------------
  \> cancelSource         String                  Source of the order cancellation.\
                                                  Valid values and the corresponding meanings are:\
                                                  `0`,`5`,`7`,`8`,`10`,`11`,`12`,`15`,`16`,`18`,`19`: Order canceled by system\
                                                  `1`: Order canceled by user\
                                                  `2`: Pre reduce-only order canceled, due to insufficient margin in user position\
                                                  `3`: Risk cancellation was triggered. Pending order was canceled due to insufficient maintenance margin ratio and forced-liquidation risk.\
                                                  `4`: Borrowings of crypto reached hard cap.\
                                                  `6`: ADL order cancellation was triggered. Pending order was canceled due to a low margin ratio and forced-liquidation risk.\
                                                  `9`: Insufficient balance after funding fees deducted.\
                                                  `13`: FOK order was canceled due to incompletely filled.\
                                                  `14`: IOC order was partially canceled due to incompletely filled.\
                                                  `17`: Close order was canceled, due to the position was already closed at market price.\
                                                  `20`: Cancel all after triggered

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new request and return parameters\
    -   [Position builder](/docs-v5/en/#trading-account-rest-api-position-builder)\

#### Request Parameters 

  ------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------
  spotOffsetType    String            No                Spot-derivatives risk offset mode\
                                                        1: Spot-derivatives (USDT) 2: Spot-derivatives (crypto) 3: Derivatives-only\
                                                        The default is 3

  ------------------------------------------------------------------------------------------------------------------------------------

#### Response Parameters 

  **Parameters**   **Types**   **Description**
  ---------------- ----------- -----------------------------------------------------
  acctImr          String      Initial margin requirement of account dimension
  acctMmr          String      Maintenance margin requirement of account dimension

In order to be forward compatible, put acctImr and acctMmr into the new JSON of data.

# 2022-11-08 

-   New response parameter was added\
    -   [Get candlesticks](/docs-v5/en/#order-book-trading-market-data-get-candlesticks)\
    -   [Get candlesticks history](/docs-v5/en/#order-book-trading-market-data-get-candlesticks-history)\
    -   [Candlesticks channel](/docs-v5/en/#order-book-trading-market-data-ws-candlesticks-channel)

  --------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------------------
  volCcyQuote             String                  Trading volume, the value is the quantity in quote currency\
                                                  e.g. The unit is USDT for BTC-USDT and BTC-USDT-SWAP;\
                                                  The unit is USD for BTC-USD-SWAP

  --------------------------------------------------------------------------------------------------------------

# 2022-11-07 

-   Added new request parameters\
    -   [Get download link](/docs-v5/broker_en/#fd-api-and-oauth-broker-api-get-download-link)\
    -   [Create rebate details download link](/docs-v5/broker_en/#fd-api-and-oauth-broker-api-create-rebate-details-download-link)\

  -----------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------------------------------------------------------------
  brokerType        String            Optional          Broker Type\
                                                        `api`: API Broker\
                                                        `oauth`: Oauth Broker\
                                                        When the broker has only one broker type, this parameter can be left blank\
                                                        This parameter is required when the broker has multiple broker types

  -----------------------------------------------------------------------------------------------------------------------------------

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ -----------------------------
  50044        200                Must select one broker type

# 2022-11-01 

-   New response parameter will be added on November 8, 2022, at the earliest\
    -   [Get candlesticks](/docs-v5/en/#order-book-trading-market-data-get-candlesticks)\
    -   [Get candlesticks history](/docs-v5/en/#order-book-trading-market-data-get-candlesticks-history)\
    -   [Candlesticks channel](/docs-v5/en/#order-book-trading-market-data-ws-candlesticks-channel)

  --------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------------------
  volCcyQuote             String                  Trading volume, the value is the quantity in quote currency\
                                                  e.g. The unit is USDT for BTC-USDT and BTC-USDT-SWAP;\
                                                  The unit is USD for BTC-USD-SWAP

  --------------------------------------------------------------------------------------------------------------

# 2022-10-28 

-   Added new request parameters\
    -   [Get trades](/docs-v5/en/#block-trading-rest-api-get-trades)\

  Parameter   Type     Required   Description
  ----------- -------- ---------- ------------------------------------------------------------------------------------------------------------------------------
  beginTs     String   No         Filter trade execution time with a begin timestamp (UTC timezone). Unix timestamp format in milliseconds, e.g. 1597026383085
  endTs       String   No         Filter trade execution time with an end timestamp (UTC timezone). Unix timestamp format in milliseconds, e.g. 1597026383085

-   Added new error codes

  Error Code   HTTP Status Code   Error Message
  ------------ ------------------ ---------------------------------------------------------------------------
  70010        200                Timestamp parameters need to be in Unix timestamp format in milliseconds.
  70013        200                endTs needs to be bigger than or equal to beginTs.
  70016        200                Please specify your instrument settings for at least one instType.

# 2022-10-27 

-   Added new parameters\
    -   [Get Order History (last 7 days）](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\
    -   [Get Order History (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)\

  Parameter   Type     Required   Description
  ----------- -------- ---------- ------------------------------------------------------------------------------------------
  begin       String   No         Filter with a begin timestamp. Unix timestamp format in milliseconds, e.g. 1597026383085
  end         String   No         Filter with an end timestamp. Unix timestamp format in milliseconds, e.g. 1597026383085

**The rules of filtering with `begin`and `end` are as follows:**\
1. The result includes parameters of `begin` and `end`.\
2. Return near `end` if `begin` and `end` both exist.\
3. The endpoint filters with `begin` and `end` first, and then paginates with `after` and `before` when `begin` or `end`, `after` or `before` exist at the same request.\

# 2022-10-20 

-   The response fields within [Get instruments](/docs-v5/en/#public-data-rest-api-get-instruments) and [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel) have been adjusted in the production trading service.\
    The preopen trading pairs will be returned, and their `state` will be `preopen`.\
    \

-   Added new return parameters:\

    -   [Get Order Details](/docs-v5/en/#order-book-trading-trade-get-order-details)\
    -   [Get Order List](/docs-v5/en/#order-book-trading-trade-get-order-details)\
    -   [Get Order History (last 7 days）](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\
    -   [Get Order History (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)\
    -   [Get Algo Order List](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)\
    -   [Get Algo Order History](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)\

  **Parameter**   **Type**   **Description**
  --------------- ---------- ------------------------------------------------------------------------------------
  reduceOnly      String     Whether the order can only reduce the position size. Valid options: true or false.

-   Related candlesticks Channels changed the push frequency\
    -   [Candlesticks channel](/docs-v5/en/#order-book-trading-market-data-ws-candlesticks-channel)
    -   [Mark price candlesticks channel](/docs-v5/en/#public-data-websocket-mark-price-candlesticks-channel)
    -   [Index candlesticks channel](/docs-v5/en/#public-data-websocket-index-candlesticks-channel)\

Before: the push frequency is the fastest interval 500ms push the data.\
After: the push frequency is the fastest interval 1 second push the data.\
\

-   Adjusted response fields in [Status](/docs-v5/en/#status-get-status) and [Status channel](/docs-v5/en/#status-ws-status-channel)\
    Added enumeration value `6`: Block trading for `serviceType` field.\
    \

-   Added new endpoint\

    -   [Get order lite book](/docs-v5/en/#order-book-trading-market-data-get-order-lite-book)

# 2022-10-19 

-   The response fields within [Get instruments](/docs-v5/en/#public-data-rest-api-get-instruments) and [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel) will be adjusted in the production trading service on October 20, 2022 at the earliest.\
    After adjustment, the preopen trading pairs will be returned, and their `state` will be `preopen`.

# 2022-10-14 

To support USDC contracts in Rest and WebSocket APIs, a new instrument parameter instFamily (instrument family) has been added.\
e.g. The underlying index (uly) of BTC-USD-SWAP and BTC-USDC-SWAP are both BTC-USD, yet the instrument family of BTC-USD-SWAP is BTC-USD, and the instrument family of BTC-USDC-SWAP is BTC-USDC.\
If you set the request parameter \"uly\" as BTC-USD, you will get the data for both BTC-USD (coin-margined) and BTC-USDC contracts.\
If you set the request parameter \"instFamily\" as BTC-USD, then you will only get data for BTC-USD (coin-margined) contracts, and not BTC-USDC contracts.\
You can look up the corresponding instFamily of each instrument from the \"Get instruments\" endpoint.

-   Added new parameters\
    -   [Get instruments](/docs-v5/en/#public-data-rest-api-get-instruments)\

  -------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------
  instFamily              String                  Instrument family\
                                                  Applicable to `FUTURES/SWAP/OPTION`

  -------------------------------------------------------------------------------------

-   Added new request fields\
    -   [Get order List](/docs-v5/en/#order-book-trading-trade-get-order-list)\
    -   [Get order history (last 7 days）](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\
    -   [Get order history (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)\
    -   [Get Transaction details (last 3 days)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-days)\
    -   [Get transaction details (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-months)\
    -   [Get fee rates](/docs-v5/en/#trading-account-rest-api-get-fee-rates)\
    -   [Get mark price](/docs-v5/en/#public-data-rest-api-get-mark-price)\
    -   [Get open interest](/docs-v5/en/#public-data-rest-api-get-open-interest)\
    -   [Get tickers](/docs-v5/en/#order-book-trading-market-data-get-tickers)\
    -   [Get block tickers](/docs-v5/en/#block-trading-rest-api-get-block-tickers)\

  -------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------
  instFamily        String            No                Instrument family\
                                                        Applicable to `FUTURES/SWAP/OPTION`

  -------------------------------------------------------------------------------------------

-   Added new request and response fields\
    -   [Get position tiers](/docs-v5/en/#public-data-rest-api-get-position-tiers)

Request Parameter:

  ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------------
  instFamily        String            Conditional       Single instrument familiy or multiple instrument families (no more than 5) separated with comma.\
                                                        Applicable to `FUTURES/SWAP/OPTION`\
                                                        Either `uly` or `instFamily` is required. If both are passed, `instFamily` will be used.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------

Response Parameter:

  -------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------
  instFamily              String                  Instrument family\
                                                  Applicable to `FUTURES/SWAP/OPTION`

  -------------------------------------------------------------------------------------

-   Added new request and response fields\
    -   [Get security fund](/docs-v5/en/#public-data-rest-api-get-insurance-fund)

Request Parameter:

  ------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------------------
  instFamily        String            Conditional       Instrument family\
                                                        Applicable to `FUTURES/SWAP/OPTION`\
                                                        Either `uly` or `instFamily` is required. If both are passed, `instFamily` will be used.

  ------------------------------------------------------------------------------------------------------------------------------------------------

Response Parameter:

  -------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------
  instFamily              String                  Instrument family\
                                                  Applicable to `FUTURES/SWAP/OPTION`

  -------------------------------------------------------------------------------------

-   Added new request fields\
    -   [Get liquidation orders](/docs-v5/en/#rest-api-public-data-get-liquidation-orders)

  ------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------------------
  instFamily        String            Conditional       Instrument family\
                                                        Applicable to `FUTURES/SWAP/OPTION`\
                                                        Either `uly` or `instFamily` is required. If both are passed, `instFamily` will be used.

  ------------------------------------------------------------------------------------------------------------------------------------------------

-   Adjusted request fields\
    -   [Set Quote products](/docs-v5/en/#block-trading-rest-api-set-quote-products)\

Before：\

  Parameter   Type     Required      Description
  ----------- -------- ------------- -------------
  \> uly      String   Conditional   underlying

After：\

  -------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------
  \> instFamily     String            Conditional       Instrument family\
                                                        Applicable to `FUTURES/SWAP/OPTION`

  -------------------------------------------------------------------------------------------

-   Adjusted request fields\
    -   [Get PM limitation](/docs-v5/en/#rest-api-account-get-pm-limitation)

Before：\

  **Parameter**   **Type**   **Required**   **Description**
  --------------- ---------- -------------- ----------------------------------------------------------------------------------
  uly             String     Yes            Single underlying or multiple underlyings (no more than 3) separated with comma.

After：\

  -----------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- -----------------------------------------------------------------------------------------
  uly               String            Conditional       Single underlying or multiple underlyings (no more than 3) separated with comma.\
                                                        Either `uly` or `instFamily` is required.\
                                                        If both are passed, `instFamily` will be used.

  instFamily        String            Conditional       Single instrument family or instrument families (no more than 5) separated with comma.\
                                                        Applicable to `FUTURES/SWAP/OPTION`\
                                                        Either `uly` or `instFamily` is required.\
                                                        If both are passed, `instFamily` will be used.
  -----------------------------------------------------------------------------------------------------------------------------------------------

-   Adjusted request fields\
    -   [Get option market data](/docs-v5/en/#public-data-rest-api-get-option-market-data)
    -   [Get delivery/exercise history](/docs-v5/en/#public-data-rest-api-get-delivery-exercise-history)

Before：\

  **Parameter**   **Type**   **Required**   **Description**
  --------------- ---------- -------------- -----------------
  uly             String     Yes            Underlying

After：\

  -----------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- -----------------------------------------------------------------------------------------
  uly               String            Conditional       Underlying\
                                                        Either `uly` or `instFamily` is required.If both are passed, `instFamily` will be used.

  instFamily        String            Conditional       Instrument family\
                                                        Applicable to `FUTURES/SWAP/OPTION`\
                                                        Either `uly` or `instFamily` is required.If both are passed, `instFamily` will be used.
  -----------------------------------------------------------------------------------------------------------------------------------------------

In the WebSocket channels, the request parameter uly will be replaced by instFamily. If uly is received, the value of the parameter will be treated as instFamily.\
e.g. If you would like to subscribe to contracts with \"uly\" BTC-USD, i.e. both BTC-USD (coin-margined) and BTC-USDC contracts, you need to subscribe to both the \"instFamily\" BTC-USD and BTC-USDC. You will not get the data for BTC-USDC contracts by only subscribing to the instFamily BTC-USD.\
We recommend you to replace \"uly\" by \"instFamily\" in relevant requests as soon as possible, as the \"uly\" parameter will be deprecated in the future.

-   Adjusted request fields\
    -   [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)
    -   [Algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)
    -   [Estimated delivery/exercise price channel](/docs-v5/en/#public-data-websocket-estimated-delivery-exercise-price-channel)
    -   [OPTION summary channel](/docs-v5/en/#public-data-websocket-option-summary-channel)
    -   [Position risk warning](/docs-v5/en/#trading-account-websocket-position-risk-warning)

Before：\

  Parameter   Type     Description
  ----------- -------- -------------
  \> uly      String   underlying

After：\

  -------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------
  \> instFamily           String                  Instrument family\
                                                  Applicable to `FUTURES/SWAP/OPTION`

  -------------------------------------------------------------------------------------

-   Added new response fields\
    -   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)

  -------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -------------------------------------
  \> instFamily           String                  Instrument family\
                                                  Applicable to `FUTURES/SWAP/OPTION`

  -------------------------------------------------------------------------------------

# 2022-10-13 

-   Added new response parameter\
    -   [Funding rate channel](/docs-v5/en/#public-data-websocket-funding-rate-channel)\

  **Parameter**        **Type**   **Description**
  -------------------- ---------- ----------------------------------------------------------------------------------------------------------
  \> nextFundingTime   String     Forecasted funding time for the next period, Unix timestamp format in milliseconds, e.g. `1597026383085`

# 2022-10-10 

-   Added new request fields\
    -   [Create RFQ](/docs-v5/en/#block-trading-rest-api-create-rfq)\

  Parameter               Type      Required   Description
  ----------------------- --------- ---------- -----------------------------------------------------------------------------------------
  allowPartialExecution   Boolean   No         Whether the RFQ can be partially filled provided that the shape of legs stays the same.

Valid value is true or false. false by default. \|

-   Added new request fields\
    -   [Execute Quote](/docs-v5/en/#block-trading-rest-api-execute-quote)\

  **Parameter**                                                                                                            **Type**           **Required**   **Description**
  ------------------------------------------------------------------------------------------------------------------------ ------------------ -------------- ---------------------------------------------------------------------------
  legs                                                                                                                     Array of objects   No             An Array of objects containing the execution size of each leg of the RFQ.
  \*Note: `tgtCcy` and `side` of each leg will be same as ones in the RFQ. px will be the same as the ones in the Quote.                                     
  \> instId                                                                                                                String             Yes            The Instrument ID, for example: \"BTC-USDT-SWAP\".
  \> sz                                                                                                                    String             Yes            The size of each leg

-   Added new request fields\
    -   [Set quote products](/docs-v5/en/#block-trading-rest-api-set-quote-products)\

  **Parameter**   **Type**   **Required**   **Description**
  --------------- ---------- -------------- -----------------------------------------------------------------------------------------------------------------------------------------------
  includeAll      Boolean    No             Receive all instruments or not under specific instType setting. Valid value can be boolean (True/False). By default, the value will be false.

-   Added new response fields\
    -   [Create RFQ](/docs-v5/en/#block-trading-rest-api-create-rfq)\
    -   [Get rfqs](/docs-v5/en/#block-trading-rest-api-get-rfqs)\
    -   [Rfqs channel](/docs-v5/en/#block-trading-websocket-private-channel-rfqs-channel)\
        Response Parameter:

  Parameter                  Type      Description
  -------------------------- --------- -----------------------------------------------------------------------------------------
  \> allowPartialExecution   Boolean   Whether the RFQ can be partially filled provided that the shape of legs stays the same.

Valid value is `true` or `false`. `false` by default. \|

-   Added new error codes

  Error Message                                                                                      Error Code
  -------------------------------------------------------------------------------------------------- ------------
  Please specify your instrument settings for at least one instType.                                 70013
  It\'s not allowed to have includeAll=True for all the instType.                                    70014
  The total value of all-spot RFQs should be greater than the min notional value {spotMinNotional}   70108
  Leg sizes specified are under the minimum block size required by Jupiter.                          70503
  Leg sizes specified do not have the same ratios as the whole RFQ.                                  70506
  Partial execution was attempted but allowPartialExecution of the RFQ is not enabled.               70507

# 2022-10-10 

-   Added new request fields\
    -   [Get deposit history](/docs-v5/en/#funding-account-rest-api-get-deposit-history)\
    -   [Get sub-account deposit history](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-sub-account-deposit-history)\

  -------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------
  type              String            No                Deposit Type\
                                                        `3`: internal transfer\
                                                        `4`: deposit from chain

  -------------------------------------------------------------------------------

-   Added new request and response fields\
    -   [Get withdrawal history](/docs-v5/en/#funding-account-rest-api-get-withdrawal-history)

Request Parameter:

  --------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- --------------------------
  type              String            No                Withdrawal type\
                                                        `3`: internal transfer\
                                                        `4`: withdrawal to chain

  --------------------------------------------------------------------------------

Response Parameter:

  Parameter   Type     Description
  ----------- -------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  addrEx      Object   Withdrawal address attachment (This will not be returned if the currency does not require this) e.g. TONCOIN attached tag name is comment, the return will be {\'comment\':\'123456\'}

# 2022-09-28 

To support USDC contracts in Rest and WebSocket APIs, a new instrument parameter instFamily (instrument family) has been added. e.g. the underlying index (uly) of BTC-USD-SWAP and BTC-USDC-SWAP are both BTC-USD, yet the instrument family of BTC-USD-SWAP is BTC-USD, and the instrument family of BTC-USDC-SWAP is BTC-USDC. You can look up the corresponding instFamily of each intrument from the \"Get instruments\" endpoint. The change below has been deployed to the demo trading environment, and will be deployed to production around mid October.

-   Added new parameters\
    -   [Get instruments](/docs-v5/en/#public-data-rest-api-get-instruments)\

  -------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------
  instFamily              String                  Instrument family\
                                                  Applicable to `FUTURES/SWAP/OPTION`

  -------------------------------------------------------------------------------------

-   Added new request fields\
    -   [Get order List](/docs-v5/en/#order-book-trading-trade-get-order-list)\
    -   [Get order history (last 7 days）](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\
    -   [Get order history (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)\
    -   [Get Transaction details (last 3 days)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-days)\
    -   [Get transaction details (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-months)\
    -   [Get fee rates](/docs-v5/en/#trading-account-rest-api-get-fee-rates)\
    -   [Get mark price](/docs-v5/en/#public-data-rest-api-get-mark-price)\
    -   [Get open interest](/docs-v5/en/#public-data-rest-api-get-open-interest)\
    -   [Get tickers](/docs-v5/en/#order-book-trading-market-data-get-tickers)\
    -   [Get block tickers](/docs-v5/en/#block-trading-rest-api-get-block-tickers)\

  -------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------
  instFamily        String            No                Instrument family\
                                                        Applicable to `FUTURES/SWAP/OPTION`

  -------------------------------------------------------------------------------------------

-   Added new request and response fields\
    -   [Get position tiers](/docs-v5/en/#public-data-rest-api-get-position-tiers)

Request Parameter:

  ---------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------------
  instFamily        String            Conditional       Single instrument familiy or multiple instrument families (no more than 5) separated with comma.\
                                                        Applicable to `FUTURES/SWAP/OPTION`\
                                                        Either `uly` or `instFamily` is required. If both are passed, `instFamily` will be used.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------

Response Parameter:

  -------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------
  instFamily              String                  Instrument family\
                                                  Applicable to `FUTURES/SWAP/OPTION`

  -------------------------------------------------------------------------------------

-   Added new request and response fields\
    -   [Get security fund](/docs-v5/en/#public-data-rest-api-get-insurance-fund)

Request Parameter:

  ------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------------------
  instFamily        String            Conditional       Instrument family\
                                                        Applicable to `FUTURES/SWAP/OPTION`\
                                                        Either `uly` or `instFamily` is required. If both are passed, `instFamily` will be used.

  ------------------------------------------------------------------------------------------------------------------------------------------------

Response Parameter:

  -------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------
  instFamily              String                  Instrument family\
                                                  Applicable to `FUTURES/SWAP/OPTION`

  -------------------------------------------------------------------------------------

-   Added new request fields\
    -   [Get liquidation orders](/docs-v5/en/#rest-api-public-data-get-liquidation-orders)

  ------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------------------
  instFamily        String            Conditional       Instrument family\
                                                        Applicable to `FUTURES/SWAP/OPTION`\
                                                        Either `uly` or `instFamily` is required. If both are passed, `instFamily` will be used.

  ------------------------------------------------------------------------------------------------------------------------------------------------

-   Adjusted request fields\
    -   [Set Quote products](/docs-v5/en/#block-trading-rest-api-set-quote-products)\

Before：\

  Parameter   Type     Required      Description
  ----------- -------- ------------- -------------
  \> uly      String   Conditional   underlying

After：\

  -------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------
  \> instFamily     String            Conditional       Instrument family\
                                                        Applicable to `FUTURES/SWAP/OPTION`

  -------------------------------------------------------------------------------------------

-   Adjusted request fields\
    -   [Get PM limitation](/docs-v5/en/#rest-api-account-get-pm-limitation)

Before：\

  **Parameter**   **Type**   **Required**   **Description**
  --------------- ---------- -------------- ----------------------------------------------------------------------------------
  uly             String     Yes            Single underlying or multiple underlyings (no more than 3) separated with comma.

After：\

  -----------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- -----------------------------------------------------------------------------------------
  uly               String            Conditional       Single underlying or multiple underlyings (no more than 3) separated with comma.\
                                                        Either `uly` or `instFamily` is required.\
                                                        If both are passed, `instFamily` will be used.

  instFamily        String            Conditional       Single instrument family or instrument families (no more than 5) separated with comma.\
                                                        Applicable to `FUTURES/SWAP/OPTION`\
                                                        Either `uly` or `instFamily` is required.\
                                                        If both are passed, `instFamily` will be used.
  -----------------------------------------------------------------------------------------------------------------------------------------------

-   Adjusted request fields\
    -   [Get option market data](/docs-v5/en/#public-data-rest-api-get-option-market-data)
    -   [Get delivery/exercise history](/docs-v5/en/#public-data-rest-api-get-delivery-exercise-history)

Before：\

  **Parameter**   **Type**   **Required**   **Description**
  --------------- ---------- -------------- -----------------
  uly             String     Yes            Underlying

After：\

  -----------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- -----------------------------------------------------------------------------------------
  uly               String            Conditional       Underlying\
                                                        Either `uly` or `instFamily` is required.If both are passed, `instFamily` will be used.

  instFamily        String            Conditional       Instrument family\
                                                        Applicable to `FUTURES/SWAP/OPTION`\
                                                        Either `uly` or `instFamily` is required.If both are passed, `instFamily` will be used.
  -----------------------------------------------------------------------------------------------------------------------------------------------

In the WebSocket channels, the request parameter uly will be replaced by instFamily. If uly is received, the value of the parameter will be treated as instFamily. We recommend you to replace uly by instFamily in relevant requests as soon as possible, as the uly parameter will be deprecated in the future.

-   Adjusted request fields\
    -   [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)
    -   [Order channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)
    -   [Algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)
    -   [Estimated delivery/exercise price channel](/docs-v5/en/#public-data-websocket-estimated-delivery-exercise-price-channel)
    -   [OPTION summary channel](/docs-v5/en/#public-data-websocket-option-summary-channel)
    -   [Position risk warning](/docs-v5/en/#trading-account-websocket-position-risk-warning)

Before：\

  Parameter   Type     Description
  ----------- -------- -------------
  \> uly      String   underlying

After：\

  -------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------
  \> instFamily           String                  Instrument family\
                                                  Applicable to `FUTURES/SWAP/OPTION`

  -------------------------------------------------------------------------------------

-   Added new response fields\
    -   [Instruments channel](/docs-v5/en/#public-data-websocket-instruments-channel)

  -------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -------------------------------------
  \> instFamily           String                  Instrument family\
                                                  Applicable to `FUTURES/SWAP/OPTION`

  -------------------------------------------------------------------------------------

# 2022-09-22 

-   Added new endpoints
    -   [Get index candlesticks history](/docs-v5/en/#public-data-rest-api-get-index-candlesticks-history)\
    -   [Get mark price candlesticks history](/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks-history)\

# 2022-09-08 

-   The response fields within [Get fee rates](/docs-v5/en/#trading-account-rest-api-get-fee-rates) have been adjusted in the production trading service.\

before:\

  **Parameter**   **Type**   **Description**
  --------------- ---------- ------------------------------------------------------------------------------------------
  taker           String     Taker fee rate. It is the fee rate of crypto-margined contracts for `FUTURES` and `SWAP`
  maker           String     Maker fee rate. It is the fee rate of crypto-margined contracts for `FUTURES` and `SWAP`
  takerU          String     Taker fee rate of USDT-margined contracts, only applicable to `FUTURES/SWAP`
  makerU          String     Maker fee rate of USDT-margined contracts, only applicable to `FUTURES/SWAP`

after:\

  **Parameter**   **Type**   **Description**
  --------------- ---------- -----------------------------------------------------------------------------------------------------------------------------------------------
  taker           String     Taker fee rate for the USDT&USDⓈ&Crypto trading pairs and contracts. It is the fee rate of crypto-margined contracts for `FUTURES` and `SWAP`
  maker           String     Maker fee rate for the USDT&USDⓈ&Crypto trading pairs and contracts. It is the fee rate of crypto-margined contracts for `FUTURES` and `SWAP`
  takerU          String     Taker fee rate of USDT-margined contracts, only applicable to `FUTURES/SWAP`
  makerU          String     Maker fee rate of USDT-margined contracts, only applicable to `FUTURES/SWAP`
  takerUSDC       String     Taker fee rate for the USDC trading pairs
  makerUSDC       String     Maker fee rate for the USDC trading pairs

USDⓈ represent the stablecoin besides USDT and USDC

-   Added new parameters\
    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)\
    -   [Get algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)\
    -   [Get algo order history](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)\
    -   [Algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)\
    -   [Advance algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-advance-algo-orders-channel)\

  ----------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------
  clOrdId                 String                  Client Order ID as assigned by the client\
                                                  A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.

  ----------------------------------------------------------------------------------------------------------------------------------------------------

# 2022-09-06 

-   Added new response parameters\
    -   [Get currencies](/docs-v5/en/#funding-account-rest-api-get-currencies)\

  ----------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ----------------------------------------------------
  depQuotaFixed           String                  Fixed deposit limit, unit in `BTC`\
                                                  Return empty string if there is no deposit limit

  usedDepQuotaFixed       String                  Used amount of fixed deposit quota, unit in `BTC`\
                                                  Return empty string if there is no deposit limit
  ----------------------------------------------------------------------------------------------------

-   The response fields within [Get fee rates](/docs-v5/en/#trading-account-rest-api-get-fee-rates) will be adjusted in the production trading service on September 8, 2022 at the earliest\

before:\

  **Parameter**   **Type**   **Description**
  --------------- ---------- ------------------------------------------------------------------------------------------
  taker           String     Taker fee rate. It is the fee rate of crypto-margined contracts for `FUTURES` and `SWAP`
  maker           String     Maker fee rate. It is the fee rate of crypto-margined contracts for `FUTURES` and `SWAP`
  takerU          String     Taker fee rate of USDT-margined contracts, only applicable to `FUTURES/SWAP`
  makerU          String     Maker fee rate of USDT-margined contracts, only applicable to `FUTURES/SWAP`

after:\

  **Parameter**   **Type**   **Description**
  --------------- ---------- -----------------------------------------------------------------------------------------------------------------------------------------------
  taker           String     Taker fee rate for the USDT&USDⓈ&Crypto trading pairs and contracts. It is the fee rate of crypto-margined contracts for `FUTURES` and `SWAP`
  maker           String     Maker fee rate for the USDT&USDⓈ&Crypto trading pairs and contracts. It is the fee rate of crypto-margined contracts for `FUTURES` and `SWAP`
  takerU          String     Taker fee rate of USDT-margined contracts, only applicable to `FUTURES/SWAP`
  makerU          String     Maker fee rate of USDT-margined contracts, only applicable to `FUTURES/SWAP`
  takerUSDC       String     Taker fee rate for the USDC trading pairs
  makerUSDC       String     Maker fee rate for the USDC trading pairs

USDⓈ represent the stablecoin besides USDT and USDC

# 2022-09-05 

-   Added new parameter for CSV file\
    -   [Get download link](/docs-v5/broker_en/#fd-api-and-oauth-broker-api-get-download-link)\

  Parameter    Description
  ------------ ---------------------------------------------------------
  affiliated   Whether there is affiliated relation. `true` or `false`

# 2022-09-01 

-   Added new endpoint\

    -   [Reset MMP status](/docs-v5/en/#block-trading-rest-api-reset-mmp-status)\

-   Added new request parameters\

    -   [Set Quote products](/docs-v5/en/#block-trading-rest-api-set-quote-products)\

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------------------------------------------------------------------------------------------------------------------
  \> maxBlockSz           String                  For FUTURES, OPTION and SWAP the max quantity of the RFQ/Quote is in unit of contracts. For SPOT, this parameter is in base currency.

  \> makerPxBand          String                  Price bands in unit of ticks, are against mark price. Set makerPxBand to 1 tick means:\
                                                  If Bid price \> Mark + 1 tick, it will be stopped\
                                                  If Ask price \< Mark - 1 tick, It will be stopped
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameter\
    -   [Create Quote](/docs-v5/en/#block-trading-rest-api-create-quote)\
    -   [Get quotes](/docs-v5/en/#block-trading-rest-api-get-quotes)\
    -   [Quotes channel](/docs-v5/en/#block-trading-websocket-private-channel-quotes-channel)\

  Parameter   Type     Description
  ----------- -------- -------------------------------------------------------
  \> reason   String   Reasons of state. Valid values can be `mmp_canceled`.

-   Added new request and response parameter\
    -   [Close positions](/docs-v5/en/#order-book-trading-trade-post-close-positions)\

  ----------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------
  clOrdId                 String                  Client-supplied ID\
                                                  A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.

  ----------------------------------------------------------------------------------------------------------------------------------------------------

Grid trading supported \"moon grid\"

-   `Grid trading` added enumeration value for `algoOrdType` field\
    -   [Place grid algo order](/docs-v5/en/#order-book-trading-grid-trading-post-place-grid-algo-order)\
    -   [Stop grid algo order](/docs-v5/en/#order-book-trading-grid-trading-post-stop-grid-algo-order)\
    -   [Get grid algo order list](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-list)\
    -   [Get grid algo order history](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-history)\
    -   [Get grid algo order details](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-order-details)\
    -   [Get grid algo sub orders](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-sub-orders)\
    -   [Get grid AI parameter (public)](/docs-v5/en/#order-book-trading-grid-trading-get-grid-ai-parameter-public)\
    -   [Grid sub orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-grid-sub-orders-channel)\

  **Parameter**   **Type**   **Description**
  --------------- ---------- ------------------------
  algoOrdType     String     `moon_grid`: Moon grid

-   Added new channel\

    -   [Moon grid algo orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-moon-grid-algo-orders-channel)\

-   Added new error codes\

  Error Message                                                              HTTP Status   Error Code
  -------------------------------------------------------------------------- ------------- ------------
  Operation failed under MMP status, the frozen window is {0} seconds.       200           70008
  Duplicate setting for underlying/instId {0} under the same instType {1}.   200           70012
  Quoted price of instId {0} cannot exceed your preset price limit.          200           70310

# 2022-08-29 

-   New request and response parameter will be added on Sep 29, 2022, at the earliest\
    -   [Close positions](/docs-v5/en/#order-book-trading-trade-post-close-positions)\

  ----------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------
  clOrdId                 String                  Client-supplied ID\
                                                  A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.

  ----------------------------------------------------------------------------------------------------------------------------------------------------

-   Adjusted request fields in [Set trading fee rate for the sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-set-trading-fee-rate-for-the-sub-account)\

before:\

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------------------------------------------------------------
  chgTaker          String            Conditional       Taker fee rate for changing\
                                                        For `absolute`: The unit is bp (1bp = 0.01%). Range belongs to \[0.1 bp, 1,000bp\], same as \[0.001%, 10%\]. Precision is 0.1 bp.\
                                                        For `percentage`: The unit is percent(%). Range belongs to \[1%, 10000%\]. Precision is 1%

  chgMaker          String            Conditional       Maker fee rate for changing\
                                                        For `absolute`: The unit is bp (1bp = 0.01%). Range belongs to \[0.1 bp, 1,000bp\], same as \[0.001%, 10%\]. Precision is 0.1 bp.\
                                                        For `percentage`: The unit is percent(%). Range belongs to \[1%, 10000%\]. Precision is 1%\
                                                        Either chgTaker or chgMaker is required.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

after:\

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------------------------------------------
  chgTaker          String            Conditional       Taker fee rate for changing\
                                                        For `absolute`: The unit is bp (1bp = 0.01%). Range belongs to \[0 bp, 1,000bp\], same as \[0.00%, 10%\]. Precision is 0.1 bp.\
                                                        For `percentage`: The unit is percent(%). Range belongs to \[0%, 10000%\]. Precision is 1%

  chgMaker          String            Conditional       Maker fee rate for changing\
                                                        For `absolute`: The unit is bp (1bp = 0.01%). Range belongs to \[0 bp, 1,000bp\], same as \[0.00%, 10%\]. Precision is 0.1 bp.\
                                                        For `percentage`: The unit is percent(%). Range belongs to \[0%, 10000%\]. Precision is 1%\
                                                        Either chgTaker or chgMaker is required.
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2022-08-26 

-   Added new request and response parameter\
    -   [Close positions](/docs-v5/en/#order-book-trading-trade-post-close-positions)\

  ----------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------
  tag                     String                  Order tag\
                                                  A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 16 characters.

  ----------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new error codes\

  Error Message                                                             HTTP Status Code   Error Code
  ------------------------------------------------------------------------- ------------------ ------------
  RFQ quantity cannot be less than the lower limit                          200                52917
  Insufficient balance in funding account                                   200                52918
  Parameter {param} of convert trading is inconsistent with the quotation   200                52919
  Quantity of convert trading cannot exceed the quotation quantity          200                52920
  Quote traded, please ask for quote again                                  200                52921
  Quote expired, please ask for quote again                                 200                52922
  Service unavailable, please try again later                               200                52923

# 2022-08-25 

-   Added new WebSocket channel

    -   [Public block trades channel](/docs-v5/en/#block-trading-websocket-public-channel-public-block-trades-channel)\

-   Added new endpoints

    -   [Get easy convert currency list](/docs-v5/en/#order-book-trading-trade-get-easy-convert-currency-list)\
    -   [Place easy convert](/docs-v5/en/#order-book-trading-trade-post-place-easy-convert)\
    -   [Get easy convert history](/docs-v5/en/#order-book-trading-trade-get-easy-convert-history)\
    -   [Get one-click repay currency list](/docs-v5/en/#order-book-trading-trade-get-one-click-repay-currency-list)\
    -   [Trade one-click repay](/docs-v5/en/#order-book-trading-trade-post-trade-one-click-repay)\
    -   [Get one-click repay history](/docs-v5/en/#order-book-trading-trade-get-one-click-repay-history)\

-   Added new error codes\

  Error Message                                                                                                                    HTTP Status Code   Error Code
  -------------------------------------------------------------------------------------------------------------------------------- ------------------ ------------
  Unable to place order. Spot trading only supports using the last price as trigger price. Please select \"Last\" and try again.   200                51415

# 2022-08-24 

Supported Spot-derivatives risk offset in Portfolio Margin

-   Added new request parameters\
    -   [Get maximum available balance/equity](/docs-v5/en/#trading-account-rest-api-get-maximum-available-balance-equity)\
    -   [Get maximum order quantity](/docs-v5/en/#trading-account-rest-api-get-maximum-order-quantity)\

  ------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------------------------------
  unSpotOffset      Boolean           No                `true`: disable Spot-Derivatives risk offset, `false`: enable Spot-Derivatives risk offset\
                                                        Default is `false`\
                                                        Only applicable to `Portfolio margin`\
                                                        It is effective when Spot-Derivatives risk offset is turned on, otherwise this parameter is ignored.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameters\
    -   [Get maximum withdrawals](/docs-v5/en/#trading-account-rest-api-get-maximum-withdrawals)\

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- --------------------------------------------------------------------------------------------------------------------------
  spotOffsetMaxWd         String                  Max withdrawal under Spot-Derivatives risk offset mode (excludes borrowed crypto transfer out under `Portfolio margin`)\
                                                  Applicable to `Portfolio margin`

  spotOffsetMaxWdEx       String                  Max withdrawal under Spot-Derivatives risk offset mode (includes borrowed crypto transfer out under `Portfolio margin`)\
                                                  Applicable to `Portfolio margin`
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new response parameters\
    -   [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)\

  ----------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------
  spotOffsetType          String                  Risk offset type\
                                                  `1`: Spot-Derivatives(USDT) to be offsetted\
                                                  `2`: Spot-Derivatives(Coin) to be offsetted\
                                                  `3`: Only derivatives to be offsetted\
                                                  Only applicable to `Portfolio margin`

  ----------------------------------------------------------------------------------------------

-   Added new request parameters\
    -   [Funds transfer](/docs-v5/en/#funding-account-rest-api-funds-transfer)\
    -   [Master accounts manage the transfers between sub-accounts](/docs-v5/en/#sub-account-rest-api-master-accounts-manage-the-transfers-between-sub-accounts)\

  ----------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------
  omitPosRisk       String            No                Ignore position risk\
                                                        Default is `false`\
                                                        Applicable to `Portfolio margin`

  ----------------------------------------------------------------------------------------

-   Added new response parameters\
    -   [Get balance](/docs-v5/en/#trading-account-rest-api-get-balance)\
    -   [Account channel](/docs-v5/en/#trading-account-websocket-account-channel)\

  ----------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------
  \> spotInUseAmt         String                  Spot in use amount\
                                                  Applicable to `Portfolio margin`

  ----------------------------------------------------------------------------------

-   Added new response parameters\
    -   [Get positions](/docs-v5/en/#trading-account-rest-api-get-positions)\
    -   [Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)\

  ----------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------
  \> spotInUseAmt         String                  Spot in use amount\
                                                  Applicable to `Portfolio margin`

  \> spotInUseCcy         String                  Spot in use unit, e.g. `BTC`\
                                                  Applicable to `Portfolio margin`
  ----------------------------------------------------------------------------------

-   Added new error codes\

  Error Message                                                                                                                                                                                                                                                                                                  HTTP Status Code   Error Code
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------ ------------
  This transfer will result in a high-risk level of your position, which may lead to forced liquidation. You need to re-adjust the transfer amount to make sure the position is at a safe level before proceeding with the transfer.                                                                             200                58121
  A portion of your spot is being used for Delta offset between positions. If the transfer amount exceeds the available amount, it may affect current spot-derivatives risk offset structure, which will result in an increased Maintenance Margin Requirement (MMR) rate. Please be aware of your risk level.   200                58122

# 2022-08-15 

-   Added new response parameter\
    -   [Create sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-create-sub-account)\

  Parameter   Type     Description
  ----------- -------- -------------
  uid         String   Account ID

-   Adjusted request fields in [Reset the API Key of a sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-reset-the-api-key-of-a-sub-account)\

before:\

  --------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- --------------------------------------------------------------------------------------------------
  label             String            Yes               API Key note\
                                                        No more than 50 letters (case sensitive) or numbers, which can be pure letters or pure numbers.\
                                                        The field will be reset if set.

  perm              String            Yes               API Key permissions\
                                                        `read_only`: Read only\
                                                        `trade`: Trade\
                                                        Separate with commas if more than one.\
                                                        The field will be reset if set.
  --------------------------------------------------------------------------------------------------------------------------------------------------------

after:\

  --------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- --------------------------------------------------------------------------------------------------
  label             String            No                API Key note\
                                                        No more than 50 letters (case sensitive) or numbers, which can be pure letters or pure numbers.\
                                                        The field will be reset if set.

  perm              String            No                API Key permissions\
                                                        `read_only`: Read only\
                                                        `trade`: Trade\
                                                        Separate with commas if more than one.\
                                                        The field will be reset if set.
  --------------------------------------------------------------------------------------------------------------------------------------------------------

# 2022-08-10 

-   Added new endpoints

    -   [Set Quote products](/docs-v5/en/#block-trading-rest-api-set-quote-products)\

-   Added new error codes\

  Error Message                                                        HTTP Status Code   Error Code
  -------------------------------------------------------------------- ------------------ ------------
  Underlying index {0} does not exist under instType {1}.              200                70007
  Data must have at least 1 valid element.                             200                70009
  Duplicate setting for instType {0}.                                  200                70011
  Counterparties for selected instruments are currently unavailable.   200                70109

# 2022-08-03 

-   Added new error codes\

  Error Message                                                                                        HTTP Status Code   Error Code
  ---------------------------------------------------------------------------------------------------- ------------------ ------------
  Missing label of withdrawal address.                                                                 200                58221
  Illegal withdrawal address.                                                                          200                58222
  This type of coin does not support on-chain withdrawals within OKX. Please use internal transfers.   200                58224

# 2022-08-02 

-   Added a new function module [Earn](/docs-v5/en/#financial-product-earn)\

# 2022-07-25 

-   Added new request parameters\
    -   [Get positions history](/docs-v5/en/#trading-account-rest-api-get-positions-history)\

  Parameter   Type     Required   Description
  ----------- -------- ---------- -------------
  posId       String   No         Position ID

# 2022-07-22 

-   Added new endpoints
    -   [Reset the API Key of a sub-account](/docs-v5/en/#sub-account-rest-api-reset-the-api-key-of-a-sub-account)\

# 2022-07-18 

-   Added a new function module [Transaction timeliness](/docs-v5/en/#overview-transaction-timeliness)\

# 2022-07-15 

-   Added new endpoints

    -   [Compute margin balance](/docs-v5/en/#order-book-trading-grid-trading-post-compute-margin-balance)\
    -   [Adjust margin balance](/docs-v5/en/#order-book-trading-grid-trading-post-adjust-margin-balance)\

-   Added new return parameters\

    -   [Get grid algo sub orders](/docs-v5/en/#order-book-trading-grid-trading-get-grid-algo-sub-orders)\
    -   [Grid sub orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-grid-sub-orders-channel)\

  Parameter   Type     Description
  ----------- -------- -------------
  tag         String   Order tag

# 2022-07-11 

-   Adjusted request fields in [Get trades history](/docs-v5/en/#order-book-trading-market-data-get-trades-history)\

before adjusting request fields:\

  Parameter   Type     Required   Description
  ----------- -------- ---------- --------------------------------------------------------------------------
  after       String   No         Pagination of data to return records earlier than the requested tradeId.
  before      String   No         Pagination of data to return records newer than the requested tradeId.

after adjusting request fields:\

  --------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- --------------------------------------------------------------------------------
  type              String            No                Pagination Type\
                                                        `1`: tradeId `2`: timestamp\
                                                        The default is `1`

  after             String            No                Pagination of data to return records earlier than the requested tradeId or ts.

  before            String            No                Pagination of data to return records newer than the requested tradeId.\
                                                        Do not support timestamp for pagination
  --------------------------------------------------------------------------------------------------------------------------------------

# 2022-07-01 

-   Added new endpoints
    -   [Get PM limitation](/docs-v5/en/#rest-api-account-get-pm-limitation)\
    -   [Get grid AI parameter (public)](/docs-v5/en/#order-book-trading-grid-trading-get-grid-ai-parameter-public)\

# 2022-06-30 

-   Added request parameters `anonymous` and `expiresIn` in the endpoint [Create Quote](/docs-v5/en/#block-trading-rest-api-create-quote)

-   Added new return parameters\

    -   [Get currencies](/docs-v5/en/#funding-account-rest-api-get-currencies)\

  Parameter              Type      Description
  ---------------------- --------- ---------------------------------------------------------------------------------
  minDep                 String    Minimum deposit amount of the currency in a single transaction
  needTag                Boolean   Whether tag/memo information is required for withdrawal
  minDepArrivalConfirm   String    Minimum number of blockchain confirmations to acknowledge fund deposit
  minWdUnlockConfirm     String    Minimum number of blockchain confirmations required for withdrawal of a deposit

-   Added new return parameters\
    -   [Get deposit history](/docs-v5/en/#funding-account-rest-api-get-deposit-history)\
    -   [Get sub-account deposit history](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-sub-account-deposit-history)\

  Parameter             Type     Description
  --------------------- -------- ---------------------------------------------------------------
  actualDepBlkConfirm   String   The actual amount of blockchain confirmed in a single deposit

# 2022-06-24 

-   Added new endpoints

    -   [Get sub-account funding balance](/docs-v5/en/#order-book-trading-market-data-get-trades-history)\

-   Adjusted request fields in [Get position tiers](/docs-v5/en/#public-data-rest-api-get-position-tiers)\

before adjusting request fields:\

  ----------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------
  uly               String            Conditional       Underlying\
                                                        Required when instType is one of `SWAP`,`FUTURES`,`OPTION`, ignore when instType is `MARGIN`

  instId            String            Conditional       Instrument ID, e.g. BTC-USDT\
                                                        Required when instType is `MARGIN`, ignore when instType is one of `SWAP`,`FUTURES`,`OPTION`
  ----------------------------------------------------------------------------------------------------------------------------------------------------

after adjusting request fields:\

  ----------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------
  uly               String            Conditional       Single underlying or multiple underlyings (no more than 3) separated with comma.\
                                                        Required when instType is one of `SWAP`,`FUTURES`,`OPTION`, ignore when instType is `MARGIN`

  instId            String            Conditional       Single instrument or multiple instruments (no more than 5) separated with comma.\
                                                        Required when instType is `MARGIN`, ignore when instType is one of `SWAP`,`FUTURES`,`OPTION`
  ----------------------------------------------------------------------------------------------------------------------------------------------------

# 2022-06-23 

-   The response fields within [Get positions history](/docs-v5/en/#trading-account-rest-api-get-positions-history) was adjusted\

before:\

#### Response Parameters 

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------------------------
  type                    String                  The type of closing position\
                                                  `partClose`：Close position partially;`allClose`：Close all;`3`：Liquidation;`4`：Partial liquidation; `5`：ADL;\
                                                  It is the latest type if there are several types for the same position.

  posSide                 String                  Direction: `long` `short`\
                                                  Only applicable to `MARGIN/FUTURES/SWAP/OPTION`
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------

after:\

  ----------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------
  type                    String                  The type of closing position\
                                                  `1`：Close position partially;`2`：Close all;`3`：Liquidation;`4`：Partial liquidation; `5`：ADL;\
                                                  It is the latest type if there are several types for the same position.

  direction               String                  Direction: `long` `short`\
                                                  Only applicable to `MARGIN/FUTURES/SWAP/OPTION`
  ----------------------------------------------------------------------------------------------------------------------------------------------------

# 2022-06-20 

-   Adjusted request and response fields in [Status](/docs-v5/en/#status-get-status)\

before adjusting request fields:\

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------------------------------------------------
  state             String            No                System maintenance status,`scheduled`: waiting; `ongoing`: processing; `completed`: completed ;`canceled`: canceled .\
                                                        If this parameter is not filled, the data with status `scheduled` and `ongoing` will be returned by default

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

after adjusting request fields:\

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------------------------------------------------------
  state             String            No                System maintenance status,`scheduled`: waiting; `ongoing`: processing; `pre_open`: pre_open; `completed`: completed ;`canceled`: canceled.\
                                                        Generally, `pre_open` last about 10 minutes. There will be `pre_open` when the time of upgrade is too long.\
                                                        If this parameter is not filled, the data with status `scheduled`, `ongoing` and `pre_open` will be returned by default

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

before adjusting response fields:\

  -----------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------
  end                     String                  End time of system maintenance, Unix timestamp format in milliseconds, e.g. `1617788463867`.\
                                                  It is expected end time before `completed`, changed to actual end time after `completed`.

  serviceType             String                  Service type, `0`：WebSocket ; `5`：Trading service
  -----------------------------------------------------------------------------------------------------------------------------------------------

after adjusting response fields:\

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------------------------------------------------------------------------------------------------------------------------
  end                     String                  Time of resuming trading totally. Unix timestamp format in milliseconds, e.g. `1617788463867`.\
                                                  It is expected end time before `completed`, changed to actual end time after `completed`.

  preOpenBegin            String                  The time of pre_open. Canceling orders, placing Post Only orders, and transferring funds to trading accounts are back after `preOpenBegin`.

  serviceType             String                  Service type, `0`：WebSocket ; `5`：Trading service; 99: Others (e.g. Suspend partial instruments)
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Adjusted push data fields in [Status channel](/docs-v5/en/#status-ws-status-channel)\

before:\

  -----------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------
  \> end                  String                  End time of system maintenance, Unix timestamp format in milliseconds, e.g. `1617788463867`.\
                                                  It is expected end time before `completed`, changed to actual end time after `completed`

  \> serviceType          String                  Service type, `0`：WebSocket ; `5`：Trading service
  -----------------------------------------------------------------------------------------------------------------------------------------------

after:\

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------------------------------------------------------------------------------------------------------------------------
  \> end                  String                  Time of resuming trading totally. Unix timestamp format in milliseconds, e.g. `1617788463867`.\
                                                  It is expected end time before `completed`, changed to actual end time after `completed`.

  \> preOpenBegin         String                  The time of pre_open. Canceling orders, placing Post Only orders, and transferring funds to trading accounts are back after `preOpenBegin`.

  \> serviceType          String                  Service type, `0`：WebSocket ; `5`：Trading service; `99`: Others (e.g. Suspend partial instruments)
  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2022-06-16 

-   Removed request parameter : `acctLv`
    -   [Create sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-create-sub-account)\

# 2022-06-14 

-   The response fields within [Get positions history](/docs-v5/en/#trading-account-rest-api-get-positions-history) will be adjusted in the production trading service on June 16, 2022 at the earliest\

before:\

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------------------------
  type                    String                  The type of closing position\
                                                  `partClose`：Close position partially;`allClose`：Close all;`3`：Liquidation;`4`：Partial liquidation; `5`：ADL;\
                                                  It is the latest type if there are several types for the same position.

  posSide                 String                  Direction: `long` `short`\
                                                  Only applicable to `MARGIN/FUTURES/SWAP/OPTION`
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------

after:\

  ----------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------
  type                    String                  The type of closing position\
                                                  `1`：Close position partially;`2`：Close all;`3`：Liquidation;`4`：Partial liquidation; `5`：ADL;\
                                                  It is the latest type if there are several types for the same position.

  direction               String                  Direction: `long` `short`\
                                                  Only applicable to `MARGIN/FUTURES/SWAP/OPTION`
  ----------------------------------------------------------------------------------------------------------------------------------------------------

# 2022-06-10 

-   REST API added a new function module [Grid trading](/docs-v5/en/#order-book-trading-grid-trading)\

-   WebSocket API added new channels

    -   [Spot grid algo orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-spot-grid-algo-orders-channel)
    -   [Contract grid algo orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-contract-grid-algo-orders-channel)
    -   [Grid positions channel](/docs-v5/en/#order-book-trading-grid-trading-ws-grid-positions-channel)
    -   [Grid sub orders channel](/docs-v5/en/#order-book-trading-grid-trading-ws-grid-sub-orders-channel)

-   Added new error codes\

  Error Message                                                                                            HTTP Status Code   Error Code
  -------------------------------------------------------------------------------------------------------- ------------------ ------------
  Futures Grid is not available in Portfolio Margin mode                                                   200                51055
  Action not allowed                                                                                       200                51056
  This bot isn't available in current account mode. Switch mode in Settings \> Account mode to continue.   200                51057
  No available position for this algo order                                                                200                51058
  Strategy for the current state does not support this operation                                           200                51059
  Used margin must be greater than {0}{1}                                                                  200                51340
  Position closing not allowed                                                                             200                51341
  Closing order already exists. Please try again later                                                     200                51342
  TP price must be less than the lower price                                                               200                51343
  SL price must be greater than the upper price                                                            200                51344
  Policy type is not grid policy                                                                           200                51345
  The highest price cannot be lower than the lowest price                                                  200                51346
  No profit available                                                                                      200                51347
  Stop loss price should be less than the lower price in the range                                         200                51348
  Stop profit price should be greater than the highest price in the range                                  200                51349
  Single income must be greater than 0                                                                     200                51351

-   Added new endpoints
    -   [Modify deposit address for sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-modify-sub-account-deposit-address)\
    -   [Get positions history](/docs-v5/en/#trading-account-rest-api-get-positions-history)\
    -   [Unit convert](/docs-v5/en/#public-data-rest-api-unit-convert)\

# 2022-06-09 

-   [Block trading](/docs-v5/en/#block-trading) goes live
-   Adjusted request fields in [Create sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-create-sub-account)\
-   Adjusted request fields in [Create sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-create-sub-account)\

before:\

  Parameter   Type     Required   Description
  ----------- -------- ---------- -------------------
  label       String   No         Sub-account notes

after:\

  -------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------------------------------------------------------------------
  label             String            No                Sub-account notes\
                                                        No more than 50 letters (case sensitive) or numbers, which can be pure letters or pure numbers.

  -------------------------------------------------------------------------------------------------------------------------------------------------------

-   Adjusted request fields in [Create an API Key for a sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-create-an-api-key-for-a-sub-account)\

before:\

  Parameter   Type     Required   Description
  ----------- -------- ---------- --------------
  label       String   Yes        API Key note

after:\

  -------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------------------------------------------------------------------
  label             String            Yes               API Key note\
                                                        No more than 50 letters (case sensitive) or numbers, which can be pure letters or pure numbers.

  -------------------------------------------------------------------------------------------------------------------------------------------------------

-   Adjusted request fields in [Reset the API Key of a sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-reset-the-api-key-of-a-sub-account)\

before:\

  Parameter   Type     Required   Description
  ----------- -------- ---------- --------------
  label       String   Yes        API Key note

after:\

  -------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------------------------------------------------------------------
  label             String            Yes               API Key note\
                                                        No more than 50 letters (case sensitive) or numbers, which can be pure letters or pure numbers.

  -------------------------------------------------------------------------------------------------------------------------------------------------------

# 2022-06-07 

-   The function below has been gone live in production trading service:
    -   All ND sub-accounts have the permission of transfer out by default, and cannot be set permission of transfer out any more with [Set Permission Of Transfer Out](/docs-v5/en/#sub-account-rest-api-set-permission-of-transfer-out).\

# 2022-06-01 

-   The function below will go live on June 6, 2022 at the earliest:
    -   All ND subaccounts will have the permission of transfer out by default, and cannot be set permission of transfer out any more with [Set Permission Of Transfer Out](/docs-v5/en/#sub-account-rest-api-set-permission-of-transfer-out).\

# 2022-05-26 

-   Added new parameters\
    -   [Place order](/docs-v5/en/#order-book-trading-trade-post-place-order)\
    -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)\
    -   [Place order channel](/docs-v5/en/#order-book-trading-trade-ws-place-order)\
    -   [Place multiple orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)\

  -------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------------------------------------------------------------------------
  banAmend          Boolean           No                Whether to disallow the system from amending the size of the SPOT Market Order.\
                                                        Valid options: `true` or `false`. The default value is `false`.\
                                                        If `true`, system will not amend and reject the market order if user does not have sufficient funds.\
                                                        Only applicable to SPOT Market Orders

  -------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new endpoints
    -   [Get trades history](/docs-v5/en/#order-book-trading-market-data-get-trades-history)\

# 2022-05-23 

-   Block trading feature has been gone live in demo trading service\
    -   REST API refer to [here](/docs-v5/en/#block-trading)\
    -   WebSocket refer to [private channel](/docs-v5/en/#block-trading-websocket-private-channel) and [public channel](/docs-v5/en/#block-trading-websocket-public-channel)\

# 2022-05-20 

-   Added new parameters\
    -   [Get bills details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days)\
    -   [Get bills details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)\
    -   [Get transaction details (last 3 days)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-days)\
    -   [Get transaction details (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-months)\

  Parameter   Type     Required   Description
  ----------- -------- ---------- ------------------------------------------------------------------------------------------
  begin       String   No         Filter with a begin timestamp. Unix timestamp format in milliseconds, e.g. 1597026383085
  end         String   No         Filter with an end timestamp. Unix timestamp format in milliseconds, e.g. 1597026383085

**The rules of filtering with `begin`and `end` are as follows:**\
1. The result includes parameters of `begin` and `end`.\
2. Return near `end` if `begin` and `end` both exist.\
3. The endpoint filters with `begin` and `end` first, and then paginates with `after` and `before` when `begin` or `end`, `after` or `before` exist at the same request.\

# 2022-05-19 

-   Added new endpoints for Fully-Disclosed Broker

    -   [Get download link](/docs-v5/broker_en/#fd-api-and-oauth-broker-api-get-download-link)\
    -   [Create rebate details download link](/docs-v5/broker_en/#fd-api-and-oauth-broker-api-create-rebate-details-download-link)\
        \

-   The push logic of \"[Tickers channel](/docs-v5/en/#order-book-trading-market-data-ws-tickers-channel)\" ws changed as follows:

    -   For currency pairs and contracts that have not been traded, the condition that `last` is an empty string will occur, which is common in newly launched currency pairs and contracts (especially options contracts).\
        \

-   Added functionality below into Live trading:

    -   The changes of \"book5\" depth channel from pushing data every \"200\" ms to pushing data every \"100\" ms\

# 2022-05-18 

-   Adjusted request fields in [Create an API Key for a sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-create-an-api-key-for-a-sub-account)\

before：\

  Parameter    Type     Required   Description
  ------------ -------- ---------- -----------------------------------------------------------------------------------------------------------------------------
  passphrase   String   Yes        API Key password, supports 6 to 32 lowercase alphanumeric characters and at least one uppercase letter or special character
  ip           String   Yes        Link IP addresses, separate with commas if more than one. Support up to 20 addresses

after：\

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------------------------------------------------------
  passphrase        String            Yes               API Key password, supports 8 to 32 alphanumeric characters containing at least 1 number, 1 uppercase letter, 1 lowercase letter and 1 symbol

  ip                String            Conditional       Link IP addresses, separate with commas if more than one. Support up to 20 addresses\
                                                        If sub-account API Key has `trade` permission, linking IP addresses is required.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Adjusted request fields in [Reset the API Key of a sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-reset-the-api-key-of-a-sub-account)\

before：\

  Parameter   Type     Required   Description
  ----------- -------- ---------- --------------------------------------------------------------------------------------
  ip          String   No         Link IP addresses, separate with commas if more than one. Support up to 20 addresses

after：\

  ---------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------
  ip                String            No                Link IP addresses, separate with commas if more than one. Support up to 20 addresses\
                                                        The field will be reset if set.\
                                                        If sub-account API Key has `trade` permission, linking IP addresses is required.

  ---------------------------------------------------------------------------------------------------------------------------------------------

# 2022-05-13 

-   Added new parameters\
    -   [Funds transfer](/docs-v5/en/#funding-account-rest-api-funds-transfer)\
    -   [Get funds transfer state](/docs-v5/en/#funding-account-rest-api-get-funds-transfer-state)\
    -   [Asset bills details](/docs-v5/en/#funding-account-rest-api-asset-bills-details)\
    -   [Withdrawal](/docs-v5/en/#funding-account-rest-api-withdrawal)\
    -   [Get withdrawal history](/docs-v5/en/#funding-account-rest-api-get-withdrawal-history)\

  ----------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------
  clientId                String                  Client-supplied ID\
                                                  A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters.

  ----------------------------------------------------------------------------------------------------------------------------------------------------

# 2022-05-07 

-   The push logic of \"[Tickers channel](/docs-v5/en/#order-book-trading-market-data-ws-tickers-channel)\" will be changed as follows on May 12, 2022:

    -   For currency pairs and contracts that have not been traded, the condition that `last` is an empty string will occur, which is common in newly launched currency pairs and contracts (especially options contracts).\
        \

-   The following changes was made to the \'[Get fee rates](/docs-v5/en/#trading-account-rest-api-get-fee-rates)\' interface.

    -   The `category` field was removed, but it would not affect the existing program calls. A request returns the same data with or without the category value.\
    -   Newly added return parameters: takerU and makerU, representing the fee rates of USDT-margined futures and perpetual contracts. When users check the fee rates of futures and perpetual contracts, the meaning of the original taker and maker parameters would change, representing only the fee rates of crypto-margined contracts.

For details, please refer to [OKX Will Make Changes to the \'Get Fee Rates\' Interface](https://www.okx.com/support/hc/en-us/articles/5558895139853)

# 2022-05-05 

-   Added functionality below into Live trading:
    -   New \"bbo-tbt\" depth channel that sends tick-by-tick Level 1 data will be available on WebSocket API\
    -   The changes of \"book5\" depth channel from pushing data every \"200\" ms to pushing data every \"100\" ms will `go live within two weeks`\
    -   Only API users who are VIP5 and above in trading fee tier are allowed to subscribe to \"books-l2-tbt\" 400 depth channels\
    -   Only API users who are VIP4 and above in trading fee tier are allowed to subscribe to \"books50-l2-tbt\" 50 depth channels\

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Depth Channel**       **Before**                                          **After**
  ----------------------- --------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------
  bbo-tbt                 None                                                1.Newly added channel that sends tick-by-tick Level 1 data\
                                                                              2.All API users can subscribe\
                                                                              3.Public depth channel, verification not required

  books-l2-tbt            1.All API users can subscribe\                      1.Only users who are VIP5 and above can subscribe\
                          2.Public depth channel, verification not required   2.Identity verification required before subscription, identity verification refers to [Login](/docs-v5/en/#overview-websocket-login)

  books50-l2-tbt          1.All API users can subscribe\                      1.Only users who are VIP4 and above can subscribe\
                          2.Public depth channel, verification not required   2.Identity verification required before subscription, identity verification refers to [Login](/docs-v5/en/#overview-websocket-login)

  books                   1.All API users can subscribe\                      No update
                          2.Public depth channel, verification not required   

  books5                  1.All API users can subscribe\                      No update.\
                          2.Public depth channel, verification not required   The change from pushing data every \"200\" ms to pushing data every \"100\" ms will `go live in two weeks`.\
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new endpoints

    -   [Set Permission Of Transfer Out](/docs-v5/en/#sub-account-rest-api-set-permission-of-transfer-out)\

-   Added new values for type `3`and`4`\

    -   [Funds transfer](/docs-v5/en/#funding-account-rest-api-funds-transfer)\

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  type              String            No                `3`: sub-account to master account (Only applicable to API Key from sub-account)\
                                                        `4`: sub-account to sub-account(Only applicable to APIKey from sub-account, and target account needs to be another sub-account which belongs to same master account)

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new return parameters\
    -   [View sub-account list](/docs-v5/en/#sub-account-rest-api-get-sub-account-list)\

  --------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- --------------------------------------------------------------------------------
  canTransOut             Boolean                 Whether the sub-account has the right to transfer out. The default is `true`.\
                                                  `false`: cannot transfer out\
                                                  `true`: can transfer

  --------------------------------------------------------------------------------------------------------------------------------

-   Added new error codes

  Error Message                                                         Error Code
  --------------------------------------------------------------------- ------------
  {0} Sub-account has no permission to transfer out, please set first   58119

# 2022-04-28 

-   Newly added reponse parameters in the endpoint
    -   [Get instruments](/docs-v5/en/#public-data-rest-api-get-instruments)\

  **Parameter**   **Type**   **Description**
  --------------- ---------- ------------------------------------------------------------------
  maxLmtSz        String     The maximum order quantity of the contract or spot limit order
  maxMktSz        String     The maximum order quantity of the contract or spot market order
  maxTwapSz       String     The maximum order quantity of the contract or spot twap order
  maxIcebergSz    String     The maximum order quantity of the contract or spot iceBerg order
  maxTriggerSz    String     The maximum order quantity of the contract or spot trigger order
  maxStopSz       String     The maximum order quantity of the contract or spot stop order

-   Newly added a enumeration and reponse parameters to push data for WebSocket channel
    -   [instrument channel](/docs-v5/en/#public-data-websocket-instruments-channel)\
        \

  ------------------------------------------------------------------------------------
  **Parameter**     **Type**           **Required**      **Description**
  ----------------- ------------------ ----------------- -----------------------------
  op                String             Yes               Operation\
                                                         `subscribe`\
                                                         `unsubscribe`\

  args              Array of objects   Yes               List of subscribed channels

  \> channel        String             Yes               Channel name\
                                                         `instruments`

  \> instType       String             Yes               Instrument type\
                                                         `MARGIN`
  ------------------------------------------------------------------------------------

\

  **Parameter**   **Type**   **Description**
  --------------- ---------- ------------------------------------------------------------------
  maxLmtSz        String     The maximum order quantity of the contract or spot limit order
  maxMktSz        String     The maximum order quantity of the contract or spot market order
  maxTwapSz       String     The maximum order quantity of the contract or spot twap order
  maxIcebergSz    String     The maximum order quantity of the contract or spot iceBerg order
  maxTriggerSz    String     The maximum order quantity of the contract or spot trigger order
  maxStopSz       String     The maximum order quantity of the contract or spot stop order

# 2022-04-26 

-   Added new return parameters\
    -   [Get currencies](/docs-v5/en/#funding-account-rest-api-get-currencies)\

  **Parameter**   **Type**   **Description**
  --------------- ---------- -----------------------
  logoLink        String     Logo link of currency

# 2022-04-25 

-   Added functionality below into Demo trading, and go live on May 5, 2022 at the earliest:
    -   New \"bbo-tbt\" depth channel that sends tick-by-tick Level 1 data will be available on WebSocket API\
    -   The \"book5\" depth channel is adjusted from pushing data every \"200\" ms to pushing data every \"100\" ms\
    -   Only API users who are VIP5 and above in trading fee tier are allowed to subscribe to \"books-l2-tbt\" 400 depth channels\
    -   Only API users who are VIP4 and above in trading fee tier are allowed to subscribe to \"books50-l2-tbt\" 50 depth channels\

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Depth Channel**       **Before**                                          **After**
  ----------------------- --------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------
  bbo-tbt                 None                                                1.Newly added channel that sends tick-by-tick Level 1 data\
                                                                              2.All API users can subscribe\
                                                                              3.Public depth channel, verification not required

  books-l2-tbt            1.All API users can subscribe\                      1.Only users who are VIP5 and above can subscribe\
                          2.Public depth channel, verification not required   2.Identity verification required before subscription, identity verification refers to [Login](/docs-v5/en/#overview-websocket-login)

  books50-l2-tbt          1.All API users can subscribe\                      1.Only users who are VIP4 and above can subscribe\
                          2.Public depth channel, verification not required   2.Identity verification required before subscription, identity verification refers to [Login](/docs-v5/en/#overview-websocket-login)

  books                   1.All API users can subscribe\                      No update
                          2.Public depth channel, verification not required   

  books5                  1.All API users can subscribe\                      1\. All API users can subscribe\
                          2.Public depth channel, verification not required   2. Public depth channel, verification not required\
                                                                              3. It will push data every 100ms (currently it pushes every 200ms)
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2022-04-15 

-   Update notice on May 2022. The following changes will be made to the \'Get fee rates\' interface.
    -   The `category` field will be removed, but it will not affect the existing program calls. A request returns the same data with or without the category value.\
    -   Newly added return parameters: takerU and makerU, representing the fee rates of USDT-margined futures and perpetual contracts. When users check the fee rates of futures and perpetual contracts, the meaning of the original taker and maker parameters will change, representing only the fee rates of crypto-margined contracts.

For details, please refer to [OKX Will Make Changes to the \'Get Fee Rates\' Interface](https://www.okx.com/support/hc/en-us/articles/5558895139853)

# 2022-04-14 

-   Update notice on April 25, 2022 about Demo trading and go live on May 5, 2022 at the earliest:
    -   New \"bbo-tbt\" depth channel that sends tick-by-tick Level 1 data will be available on WebSocket API\


``` {.highlight .json .tab-json}
{
  "op": "subscribe",
  "args": [
    {
      "channel": "bbo-tbt",
      "instId": "BTC-USDT"
    }
  ]
}
```


#### Request parameters 

  ------------------------------------------------------------------------------------
  Parameter         Type               Required          Description
  ----------------- ------------------ ----------------- -----------------------------
  op                String             Yes               Operation\
                                                         `subscribe`\
                                                         `unsubscribe`\

  args              Array of objects   Yes               List of subscribed channels

  \> channel        String             Yes               Channel name\
                                                         `books`\
                                                         `books5`\
                                                         `books50-l2-tbt`\
                                                         `books-l2-tbt`\
                                                         `bbo-tbt`

  \> instId         String             Yes               Instrument ID
  ------------------------------------------------------------------------------------

> Response Example


``` {.highlight .json .tab-json}
{
  "event": "subscribe",
  "arg": {
    "channel": "bbo-tbt",
    "instId": "BTC-USDT"
  }
}
```


> Failure example


``` {.highlight .json .tab-json}
{
  "event": "error",
  "code": "60012",
  "msg": "Invalid request: {\"op\": \"subscribe\", \"argss\":[{ \"channel\" : \"bbo-tbt\", \"instId\" : \"BTC-USDT\"}]}"
}
```


#### Response parameters 

  Parameter    Type     Required   Description
  ------------ -------- ---------- ------------------------------------------
  event        String   Yes        Event, `subscribe` `unsubscribe` `error`
  arg          Object   No         Subscribed channel
  \> channel   String   Yes        Channel name
  \> instId    String   Yes        Instrument ID
  msg          String   No         Error message
  code         String   No         Error code

> Push Data Example:


``` {.highlight .json .tab-json}
{
    "arg": {
        "channel": "bbo-tbt",
        "instId": "BTC-USDT"
    },
    "data": [{
        "asks": [
            ["8506.96", "100", "0", "2"]
        ],
        "bids": [
            ["8446", "95", "0", "3"]
        ],
        "ts": "1597026383085"
    }]
}
```


> Push Data Example:Only the bids has depth


``` {.highlight .json .tab-json}
{
    "arg": {
        "channel": "bbo-tbt",
        "instId": "BTC-USDT"
    },
    "data": [{
        "asks": [],
        "bids": [
            ["8446", "95", "0", "3"]
        ],
        "ts": "1597026383085"
    }]
}
```


\* The \"book5\" depth channel is adjusted from pushing data every \"200\" ms to pushing data every \"100\" ms\
\* Only API users who are VIP5 and above in trading fee tier are allowed to subscribe to \"books-l2-tbt\" 400 depth channels\
\* Only API users who are VIP4 and above in trading fee tier are allowed to subscribe to \"books50-l2-tbt\" 50 depth channels\

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Depth Channel**       **Before**                                          **After**
  ----------------------- --------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------
  bbo-tbt                 None                                                1.Newly added channel that sends tick-by-tick Level 1 data\
                                                                              2.All API users can subscribe\
                                                                              3.Public depth channel, verification not required

  books-l2-tbt            1.All API users can subscribe\                      1.Only users who are VIP5 and above can subscribe\
                          2.Public depth channel, verification not required   2.Identity verification required before subscription, identity verification refers to [Login](/docs-v5/en/#overview-websocket-login)

  books50-l2-tbt          1.All API users can subscribe\                      1.Only users who are VIP4 and above can subscribe\
                          2.Public depth channel, verification not required   2.Identity verification required before subscription, identity verification refers to [Login](/docs-v5/en/#overview-websocket-login)

  books                   1.All API users can subscribe\                      No update
                          2.Public depth channel, verification not required   

  books5                  1.All API users can subscribe\                      1\. All API users can subscribe\
                          2.Public depth channel, verification not required   2. Public depth channel, verification not required\
                                                                              3. It will push data every 100ms (currently it pushes every 200ms)
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2022-04-08 

-   Demo trading supported endpoints as follows:\
    -   [Get balance](/docs-v5/en/#funding-account-rest-api-get-balance)\
    -   [Get account asset valuation](/docs-v5/en/#funding-account-rest-api-get-account-asset-valuation)\
    -   [Funds transfer](/docs-v5/en/#funding-account-rest-api-funds-transfer)\
    -   [Get funds transfer state](/docs-v5/en/#funding-account-rest-api-get-funds-transfer-state)\
    -   [Asset bills details](/docs-v5/en/#funding-account-rest-api-asset-bills-details)\
    -   [Get convert currencies](/docs-v5/en/#funding-account-rest-api-get-convert-currencies)\
    -   [Get convert currency pair](/docs-v5/en/#funding-account-rest-api-get-convert-currency-pair)\
    -   [Estimate quote](/docs-v5/en/#funding-account-rest-api-estimate-quote)\
    -   [Convert trade](/docs-v5/en/#funding-account-rest-api-convert-trade)\
    -   [Get convert history](/docs-v5/en/#funding-account-rest-api-get-convert-history)\

# 2022-04-07 

-   Added new request parameters\
    -   [Estimate quote](/docs-v5/en/#funding-account-rest-api-estimate-quote)\
    -   [Convert trade](/docs-v5/en/#funding-account-rest-api-convert-trade)\
    -   [Get convert history](/docs-v5/en/#funding-account-rest-api-get-convert-history)\

  Parameter   Type     Required   Description
  ----------- -------- ---------- -------------
  tag         String   No         Order tag

-   Added new return parameters\
    -   [Get currencies](/docs-v5/en/#funding-account-rest-api-get-currencies)\

  **Parameter**   **Type**   **Description**
  --------------- ---------- -------------------------------------------------------------------------------
  maxWd           String     Maximum amount of currency withdrawal in a single transaction
  wdTickSz        String     Withdrawal precision, indicating the number of digits after the decimal point
  wdQuota         String     Withdrawal limit in the past 24 hours, unit in `USDT`
  usedWdQuota     String     Amount of currency withdrawal used in the past 24 hours, unit in `USDT`

-   Added new request parameters\
    -   [Get deposit history](/docs-v5/en/#funding-account-rest-api-get-deposit-history)\

  Parameter   Type     Required   Description
  ----------- -------- ---------- -------------
  depId       String   No         Deposit ID

-   Added new request parameters\
    -   [Get withdrawal history](/docs-v5/en/#funding-account-rest-api-get-withdrawal-history)\

  Parameter   Type     Required   Description
  ----------- -------- ---------- ---------------
  wdId        String   No         Withdrawal ID

-   Added new endpoints

    -   [Cancel withdrawal](/docs-v5/en/#funding-account-rest-api-cancel-withdrawal)\
    -   [Small assets convert](/docs-v5/en/#funding-account-rest-api-small-assets-convert)\

-   Added new error codes

  Error Message                                                Error Code
  ------------------------------------------------------------ ------------
  The daily usage of small assets convert exceeds the limit.   58370
  Small assets exceed the maximum limit.                       58371
  Insufficient small assets.                                   58372
  Withdrawal ID does not exist.                                58215
  Operation not allowed.                                       58216

# 2022-03-10 

-   Offlined endpoints
    -   [Create an API Key for a sub-account](/docs-v5/en/#rest-api-subaccount-create-an-apikey-for-a-sub-account)\
    -   [Query the API Key of a sub-account](/docs-v5/en/#rest-api-subccount-get-subaccount-APIKEY)\
    -   [Reset the API Key of a sub-account](/docs-v5/en/#sub-account-rest-api-reset-the-api-key-of-a-sub-account)\
    -   [Delete the API Key of sub-accounts](/docs-v5/en/#rest-api-subccount-get-subaccount-APIKEY)\
        \
-   Removed funds password : `pwd`
    -   [Withdrawal](/docs-v5/en/#funding-account-rest-api-withdrawal)\
    -   [Lightning withdrawals](/docs-v5/en/#funding-account-rest-api-lightning-withdrawals)\
    -   [Create sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-create-sub-account)
    -   [Delete sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-delete-sub-account)

If the user continues to pass in the funds password, the parameter will be ignored and no error will be reported.

-   Added new endpoints for Non-Disclosed Broker

    -   [Create an API Key for a sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-create-an-api-key-for-a-sub-account)\
    -   [Query the API Key of a sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-delete-the-api-key-of-sub-accounts)\
    -   [Reset the API Key of a sub-account](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-reset-the-api-key-of-a-sub-account)\
    -   [Delete the API Key of sub-accounts](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-query-the-api-key-of-a-sub-account)\
    -   [Get download link](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-get-download-link)\
    -   [Create rebate details download link](/docs-v5/broker_en/#dma-broker-common-v5-api-for-brokers-create-rebate-details-download-link)\

-   Added new return parameters\

    -   [Position builder](/docs-v5/en/#trading-account-rest-api-position-builder)\

##### Response Parameters 

  **Parameters**   **Types**   **Description**
  ---------------- ----------- -----------------------------
  mr1              String      spot & vol movements
  mr2              String      theta decay
  mr3              String      vega term-structure
  mr4              String      basis risk
  mr5              String      interest-rate risk
  mr6              String      extreme market move
  mr7              String      transaction cost & slippage

-   Added new error codes\

  Error Message                                                                   Error Code
  ------------------------------------------------------------------------------- ------------
  You are not currently on the whitelist, please contact customer service         50041
  This endpoint requires that APIKey must be bound to IP                          50035
  begin date cannot be greater than end date.                                     59615
  The time interval between the begin date and end date cannot exceed 180 days.   59616

# 2022-03-02 

-   Added a new function module [Convert](/docs-v5/en/#funding-account-rest-api-small-assets-convert)\

-   Added a new error code module [OTC](/docs-v5/en/#error-code-rest-api-otc)\

# 2022-02-17 

-   Adjusted request field in [Savings purchase/redemption](/docs-v5/en/#financial-product-savings-post-savings-purchase-redemption)：\
    before：\

  --------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- --------------------------------------------------------------------------------------------------
  rate              String            No                Purchase rate\
                                                        Only applicable to purchase saving shares\
                                                        The interest rate of the new subscription will cover the interest rate of the last subscription\
                                                        The default interest rate of 1%\
                                                        The rate value range is between 1% and 365%

  --------------------------------------------------------------------------------------------------------------------------------------------------------

after：\

  --------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- --------------------------------------------------------------------------------------------------
  rate              String            Yes               Purchase rate\
                                                        Only applicable to purchase saving shares\
                                                        The interest rate of the new subscription will cover the interest rate of the last subscription\
                                                        The rate value range is between 1% and 365%

  --------------------------------------------------------------------------------------------------------------------------------------------------------

[Business announcement](/support/hc/en-us/articles/4432179789581)

# 2022-01-26 

-   Added new endpoints

    -   [Get custody trading sub-account list](/docs-v5/en/#sub-account-rest-api-get-custody-trading-sub-account-list)\

-   Added new return parameters\

    -   [View sub-account list](/docs-v5/en/#sub-account-rest-api-get-sub-account-list)\

  **Parameter**   **Type**   **Description**
  --------------- ---------- ---------------------------------------------------------------------------
  type            String     Sub-account type `1`:Standard sub-account `2`:Custody trading sub-account

# 2022-01-25 

-   Added new return parameters\
    -   [Get deposit address](/docs-v5/en/#funding-account-rest-api-get-deposit-address)\

  -----------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -----------------------------------------------------------------------------------------------
  addrEx                  Object                  Deposit address attachment (This will not be returned if the currency does not require this)\
                                                  e.g. `TONCOIN` attached tag name is `comment`, the return will be `{'comment':'123456'}`

  -----------------------------------------------------------------------------------------------------------------------------------------------

# 2022-01-20 

-   The new domain name has been enabled. Click [here](/docs-v5/en/#overview) to see the details\

# 2022-01-18 

-   Added a new request parameter`tag`\

    -   [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)\

-   Added new return parameters\

    -   [Get algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)\
    -   [Get algo order history](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)\
    -   [Advance algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-advance-algo-orders-channel)\
    -   [Algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)\

  ----------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ----------------------------------------------------------------------------------------------------
  tag                     String                  Order tag\
                                                  A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 16 characters.

  ----------------------------------------------------------------------------------------------------------------------------------------------------

# 2022-01-17 

Trigger order supported multiple trigger price type

-   Added new return parameters:\
    -   [Get Algo Order List](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)\
    -   [Get Algo Order History](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)\
    -   [Algo Orders Channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)\

  -----------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -----------------------
  triggerPxType           String                  Trigger price type\
                                                  `last`: last price\
                                                  `index`: index price\
                                                  `mark`: mark price

  -----------------------------------------------------------------------

-   Added new request fields to [Place Algo Order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order) for trigger order placement\

  -----------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------
  triggerPxType     String            No                Trigger price type\
                                                        `last`: last price\
                                                        `index`: index price\
                                                        `mark`: mark price\
                                                        The Default is `last`

  -----------------------------------------------------------------------------

# 2022-01-14 

-   Added a new request parameter `autoCxl` :\

    -   [Close positions](/docs-v5/en/#order-book-trading-trade-post-close-positions)\

-   Added a new endpoint and a WebSocket channel\

    -   [Get Greeks](/docs-v5/en/#trading-account-rest-api-get-greeks)\
    -   [Account greeks channel](/docs-v5/en/#trading-account-websocket-account-greeks-channel)\
        \

# 2022-01-11 

-   `Broker API` migrated to [Broker](/docs-v5/broker_en/)

# 2022-01-06 

-   Added new return parameters:\
    -   [Get algo order list](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)\
    -   [Get algo order history](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)\
    -   [Advance algo orders channel](/docs-v5/en/#order-book-trading-algo-trading-ws-advance-algo-orders-channel)\

  --------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- --------------------------------------------
  callbackRatio           String                  Callback price ratio\
                                                  Only applicable to `move_order_stop` order

  callbackSpread          String                  Callback price variance\
                                                  Only applicable to `move_order_stop` order

  activePx                String                  Active price\
                                                  Only applicable to `move_order_stop` order

  moveTriggerPx           String                  Trigger price\
                                                  Only applicable to `move_order_stop` order
  --------------------------------------------------------------------------------------------

added enumeration value for `ordType` field\

  **Parameter**   **Type**   **Description**
  --------------- ---------- -----------------------------------
  ordType         String     `move_order_stop`: Trailing order

\

-   Added new request fields to [Place algo order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)\

  ---------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------
  callbackRatio     String            Conditional       Callback price ratio , e.g. `0.01`\
                                                        \
                                                        Either `callbackRatio` or `callbackSpread` is allowed to be passed.

  callbackSpread    String            Conditional       Callback price variance

  activePx          String            No                Active price
  ---------------------------------------------------------------------------------------------------------------------------

added enumeration value for `ordType` field\

  **Parameter**   **Type**   **Description**
  --------------- ---------- -----------------------------------
  ordType         String     `move_order_stop`: Trailing order

-   Endpoint `Get piggyBank balance` changed to [Get saving balance](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)

-   Added new error codes

  Error Message      Error Code
  ------------------ ------------
  Wrong passphrase   60024

# 2021-12-24 

-   Added new endpoints

    -   [Positon builder](/docs-v5/en/#trading-account-rest-api-position-builder)\
    -   [Isolated margin trading settings](/docs-v5/en/#trading-account-rest-api-isolated-margin-trading-settings)\
        \

-   Added new return fields to [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration)\

  ----------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ----------------------------------------------------------
  ctIsoMode               String                  Contract isolated margin trading settings\
                                                  `automatic`：Auto transfers `autonomy`：Manual transfers

  mgnIsoMode              String                  Margin isolated margin trading settings\
                                                  `automatic`：Auto transfers `autonomy`：Manual transfers
  ----------------------------------------------------------------------------------------------------------

\

-   Added new return fields to[Get positions](/docs-v5/en/#trading-account-rest-api-get-positions) 、[Get account and position risk](/docs-v5/en/#trading-account-rest-api-get-account-and-position-risk)、[Positions channel](/docs-v5/en/#trading-account-websocket-positions-channel)、[Balance and position channel](/docs-v5/en/#trading-account-websocket-balance-and-position-channel)\

  Parameter   Type     Description
  ----------- -------- -------------------------------------------------------------------------
  baseBal     String   Base currency balance, only applicable to `MARGIN`（Manual transfers）
  quoteBal    String   Quote currency balance, only applicable to `MARGIN`（Manual transfers）

\

-   Added a new request field to [Increase/decrease margin](/docs-v5/en/#trading-account-rest-api-increase-decrease-margin)\

  -------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------------------------------------------------------
  auto              Boolean           No                Automatic loan transfer out, `true` or `false`, the default is `false`\
                                                        only applicable to `MARGIN`（Manual transfers）

  loanTrans         Boolean           No                Whether or not borrowed coins can be transferred out under `Multi-currency margin`\
                                                        the default is `false`
  -------------------------------------------------------------------------------------------------------------------------------------------

\

-   Added a new request field to [Get maximum available balance/equity](/docs-v5/en/#trading-account-rest-api-get-maximum-available-balance-equity)\

  ---------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------------------------------------------------------------------
  px                String            No                Price\
                                                        When the price is not specified, it will be calculated according to the last traded price.\
                                                        The parameter will be ignored when multiple instruments are specified.

  ---------------------------------------------------------------------------------------------------------------------------------------------------

# 2021-12-14 

-   Added new endpoints

    -   [Set lending rate](/docs-v5/en/#financial-product-savings-post-set-lending-rate)\
    -   [Get lending history](/docs-v5/en/#financial-product-savings-get-lending-history)\
    -   [Get public borrow info (public)](/docs-v5/en/#financial-product-savings-get-public-borrow-info-public)\
    -   [Get public borrow history (public)](/docs-v5/en/#financial-product-savings-get-public-borrow-history-public)\
        \

-   Added new return fields to [Get PiggyBank Balance](/docs-v5/en/#financial-product-savings-get-saving-balance)\

  Parameter    Type     Description
  ------------ -------- -------------------
  rate         String   Lending rate
  loanAmt      String   Lending amount
  pendingAmt   String   Pending amount
  redemptAmt   String   Redempting amount

\

-   Added a new field to [PiggyBank Purchase/Redemption](/docs-v5/en/#financial-product-savings-post-savings-purchase-redemption)\

  Parameter   Type     Description
  ----------- -------- --------------
  rate        String   Lending rate

\

-   Adjusted response field in [Get Interest Rate and Loan Quota](/docs-v5/en/#public-data-rest-api-get-interest-rate-and-loan-quota)\

  -------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -------------------------------------
  \> irDiscount           String                  Interest rate discount\
                                                  Discarded field, always return \"\"

  -------------------------------------------------------------------------------------

# 2021-12-06 

-   Added a new request field to [Funds transfer](/docs-v5/en/#funding-account-rest-api-funds-transfer) , [Master accounts manage the transfers between sub-accounts](/docs-v5/en/#sub-account-rest-api-master-accounts-manage-the-transfers-between-sub-accounts), [Increase/Decrease margin](/docs-v5/en/#trading-account-rest-api-increase-decrease-margin)\

  -------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------------------------------------------------------
  loanTrans         Boolean           No                Whether or not borrowed coins can be transferred out under `Multi-currency margin`\
                                                        the default is `false`

  -------------------------------------------------------------------------------------------------------------------------------------------

\

-   Added a response field to [Get maximum withdrawals](/docs-v5/en/#trading-account-rest-api-get-maximum-withdrawals)\

  Parameter   Type     Description
  ----------- -------- --------------------------------------------------------------------------------------
  maxWdEx     String   Max withdrawal (allowing borrowed crypto transfer out under `Multi-currency margin`)

\

-   Adjusted response field in [Get interest rate and loan quota for VIP loans](/docs-v5/en/#public-data-rest-api-get-interest-rate-and-loan-quota-for-vip-loans) :\

  Parameter   Type     Description
  ----------- -------- ------------------------
  \> level    String   VIP Level, e.g. `VIP5`

# 2021-12-04 

Stop order supported multiple trigger price type

-   Added new return parameters:\
    -   [Get Order Details](/docs-v5/en/#order-book-trading-trade-get-order-details)\
    -   [Get Order List](/docs-v5/en/#order-book-trading-trade-get-order-details)\
    -   [Get Order History (last 7 days）](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\
    -   [Get Order History (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)\
    -   [Get Algo Order List](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)\
    -   [Get Algo Order History](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)\
    -   [Order Channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)\
    -   [Algo Orders Channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)\

  ----------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ----------------------------------
  tpTriggerPxType         String                  Take-profit trigger price type.\
                                                  `last`: last price\
                                                  `index`: index price\
                                                  `mark`: mark price

  slTriggerPxType         String                  Stop-loss trigger price type.\
                                                  `last`: last price\
                                                  `index`: index price\
                                                  `mark`: mark price
  ----------------------------------------------------------------------------------

-   Added new request fields to [Place Algo Order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order) for stop order placement\

  ---------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ---------------------------------
  tpTriggerPxType   String            No                Take-profit trigger price type\
                                                        \
                                                        `last`: last price\
                                                        `index`: index price\
                                                        `mark`: mark price\
                                                        The Default is `last`

  slTriggerPxType   String            No                Stop-loss trigger price type\
                                                        \
                                                        `last`: last price\
                                                        `index`: index price\
                                                        `mark`: mark price\
                                                        The Default is `last`
  ---------------------------------------------------------------------------------------

# 2021-11-26 

-   Adjusted request field in [Place Order](/docs-v5/en/#order-book-trading-trade-post-place-order)、[Place Multiple Orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)：\

  ------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------------------------------------------
  reduceOnly        Boolean           No                Whether the order can only reduce the position size.\
                                                        Valid options: `true` or `false`. The default value is `false`.\
                                                        Only applicable to `MARGIN` orders, and `FUTURES/SWAP` orders in `net` mode\
                                                        Only applicable to `Futures mode` and `Multi-currency margin`

  ------------------------------------------------------------------------------------------------------------------------------------

# 2021-11-25 

-   Added new endpoints

    -   [VIP loans borrow and repay](/docs-v5/en/#trading-account-rest-api-vip-loans-borrow-and-repay)\
    -   [Get borrow and repay history for VIP loans](/docs-v5/en/#trading-account-rest-api-get-borrow-and-repay-history-for-vip-loans)\
    -   [Get borrow interest and limit](/docs-v5/en/#trading-account-rest-api-get-borrow-interest-and-limit)\
    -   [Get Interest Rate and Loan Quota for VIP loans (public)](/docs-v5/en/#public-data-rest-api-get-interest-rate-and-loan-quota-for-vip-loans)\
        \

-   Added a new field to [Get interest accrued data](/docs-v5/en/#trading-account-rest-api-get-interest-accrued-data)\

  -----------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- -----------------------
  type                    String                  Loan type\
                                                  `1`: VIP loans\
                                                  `2`: Market loans

  -----------------------------------------------------------------------

\

-   [Get Bills Details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days) and [Get Bills Details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months) added enumeration value for `subType` field\

  **Parameter**   **Type**   **Description**
  --------------- ---------- ----------------------------------------
  subType         String     `14`: Interest deduction for VIP loans

-   Added new error codes

  Error Message                                                                               HTTP Status Code   Error Code
  ------------------------------------------------------------------------------------------- ------------------ ------------
  Insufficient available margin, add margin or reduce the borrowing amount                    200                59303
  Insufficient equity for borrowing, keep enough funds to pay interest for at least one day   200                59304
  Use VIP loan first to set the VIP loan priority                                             200                59305
  Your borrowing amount exceeds the max limit                                                 200                59306
  You are not eligible for VIP loans                                                          200                59307
  Unable to repay VIP loan due to insufficient borrow limit                                   200                59308
  Unable to repay an amount that exceeds the borrowed amount                                  200                59309
  Your account does not support VIP loan                                                      200                59310
  Unable to set up as there is VIP loan                                                       200                59311
  {currency} does not support VIP loans                                                       200                59312

# 2021-11-23 

-   Added a new function module [ND-Broker](/docs-v5/en/#broker-api)\

-   Added a new endpoint [Get account asset valuation](/docs-v5/en/#funding-account-rest-api-get-account-asset-valuation)\

# 2021-11-20 

-   Added new response field to [Increase/Decrease margin](/docs-v5/en/#trading-account-rest-api-increase-decrease-margin) for stop order placement\

#### Response Parameters 

  **Parameter**   **Type**   **Description**
  --------------- ---------- -------------------------------------------
  leverage        String     Real leverage after the margin adjustment

# 2021-11-02 

-   Added a new request field to [Get maximum buy/sell amount or open amount](/docs-v5/en/#trading-account-rest-api-set-leverage)\

  ------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ------------------------------------------
  leverage          String            No                Leverage for instrument\
                                                        The default is current leverage\
                                                        Only applicable to `MARGIN/FUTURES/SWAP`

  ------------------------------------------------------------------------------------------------

# 2021-11-01 

-   Added a new endpoint [Get account risk state](/docs-v5/en/#trading-account-rest-api-get-account-risk-state)\

-   [Get Order Details](/docs-v5/en/#order-book-trading-trade-get-order-details) Added enumeration value ddh for category field\

  ----------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ----------------------------
  category                String                  Category\
                                                  `normal`\
                                                  `twap`\
                                                  `adl`\
                                                  `full_liquidation`\
                                                  `partial_liquidation`\
                                                  `delivery`\
                                                  `ddh`: Delta dynamic hedge

  ----------------------------------------------------------------------------

-   [Get Order History (last 7 days）](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days) Added enumeration value ddh for category field\

  ----------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ----------------------------
  category                String                  Category\
                                                  `normal`\
                                                  `twap`\
                                                  `adl`\
                                                  `full_liquidation`\
                                                  `partial_liquidation`\
                                                  `delivery`\
                                                  `ddh`: Delta dynamic hedge

  ----------------------------------------------------------------------------

-   [Get Order History (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months) Added enumeration value ddh for category field\

  ----------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ----------------------------
  category                String                  Category\
                                                  `normal`\
                                                  `twap`\
                                                  `adl`\
                                                  `full_liquidation`\
                                                  `partial_liquidation`\
                                                  `delivery`\
                                                  `ddh`: Delta dynamic hedge

  ----------------------------------------------------------------------------

-   [Order Channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel) Added enumeration value ddh for category field\

  ----------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ----------------------------
  category                String                  Category\
                                                  `normal`\
                                                  `twap`\
                                                  `adl`\
                                                  `full_liquidation`\
                                                  `partial_liquidation`\
                                                  `delivery`\
                                                  `ddh`: Delta dynamic hedge

  ----------------------------------------------------------------------------

-   [Get Bills Details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days) New enumeration value 13 for type field: ddh; new enumeration value for subType field: `131`: ddh buy and `132`: ddh sell\

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  type              String            No                Bill type\
                                                        `1`: Transfer `2`: Trade `3`: Delivery `4`: Forced repayment `5`: Liquidation `6`: Margin transfer `7`: Interest deduction `8`: Funding fee `9`: ADL `10`: Clawback `11`: System token conversion `12`: Strategy transfer `13`: ddh

  subType           String            No                Bill subtype\
                                                        `1`: Buy `2`: Sell `3`: Open long `4`: Open short `5`: Close long `6`: Close short `9`: Interest deduction `11`: Transfer in `12`: Transfer out `160`: Manual margin increase `161`: Manual margin decrease `162`: Auto margin increase `110`: Auto buy `111`: Auto sell `118`: System token conversion transfer in `119`: System token conversion transfer out `100`: Partial liquidation close long `101`: Partial liquidation close short `102`: Partial liquidation buy `103`: Partial liquidation sell `104`: Liquidation long `105`: Liquidation short `106`: Liquidation buy `107`: Liquidation sell `110`: Liquidation transfer in `111`: Liquidation transfer out `125`: ADL close long `126`: ADL close short `127`: ADL buy `128`: ADL sell `131`: ddh buy `132`: ddh sell `170`: Exercised `171`: Counterparty exercised `172`: Expired OTM `112`: Delivery long `113`: Delivery short `117`: Delivery/Exercise clawback `173`: Funding fee expense `174`: Funding fee income `200`:System transfer in `201`: Manually transfer in `202`: System transfer out `203`: Manually transfer out
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   [Get Bills Details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months) New enumeration value 13 for type field: ddh; new enumeration value for subType field: `131`: ddh buy and `132`: ddh sell\

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  type              String            No                Bill type\
                                                        `1`: Transfer `2`: Trade `3`: Delivery `4`: Forced repayment `5`: Liquidation `6`: Margin transfer `7`: Interest deduction `8`: Funding fee `9`: ADL `10`: Clawback `11`: System token conversion `12`: Strategy transfer `13`: ddh

  subType           String            No                Bill subtype\
                                                        `1`: Buy `2`: Sell `3`: Open long `4`: Open short `5`: Close long `6`: Close short `9`: Interest deduction `11`: Transfer in `12`: Transfer out `160`: Manual margin increase `161`: Manual margin decrease `162`: Auto margin increase `110`: Auto buy `111`: Auto sell `118`: System token conversion transfer in `119`: System token conversion transfer out `100`: Partial liquidation close long `101`: Partial liquidation close short `102`: Partial liquidation buy `103`: Partial liquidation sell `104`: Liquidation long `105`: Liquidation short `106`: Liquidation buy `107`: Liquidation sell `110`: Liquidation transfer in `111`: Liquidation transfer out `125`: ADL close long `126`: ADL close short `127`: ADL buy `128`: ADL sell `131`: ddh buy `132`: ddh sell `170`: Exercised `171`: Counterparty exercised `172`: Expired OTM `112`: Delivery long `113`: Delivery short `117`: Delivery/Exercise clawback `173`: Funding fee expense `174`: Funding fee income `200`:System transfer in `201`: Manually transfer in `202`: System transfer out `203`: Manually transfer out
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   [Get Account Configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration) Added enumeration value 4 for acctLv field\

  -----------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -----------------------------------------------------------------------------------
  uid                     String                  Account ID

  acctLv                  String                  Account level\
                                                  `1`: Spot mode `2`: Futures mode `3`: Multi-currency margin `4`：Portfolio margin
  -----------------------------------------------------------------------------------------------------------------------------------

-   [Get Candlesticks](/docs-v5/en/#order-book-trading-market-data-get-candlesticks) 、[Get Candlesticks History](/docs-v5/en/#rest-api-market-data-get-candlesticks-history-top-currencies-only)、[Get Index Candlesticks](/docs-v5/en/#public-data-rest-api-get-index-candlesticks) 、[Get Mark Price Candlesticks](/docs-v5/en/#public-data-rest-api-get-mark-price-candlesticks) Add enumeration value to the bar field, support to get UTC time zone k-line\[/6Hutc/12Hutc/1Dutc/1Wutc/1Mutc/3Mutc/6Mutc/1Yutc\]\

  -------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------------------------------------------------------
  bar               String            No                Bar size, the default is `1m`\
                                                        e.g. \[1m/3m/5m/15m/30m/1H/2H/4H\]\
                                                        Hong Kong time opening price k-line:\[6H/12H/1D/1W/1M/3M/6M/1Y\]\
                                                        UTC time opening price k-line:\[/6Hutc/12Hutc/1Dutc/1Wutc/1Mutc/3Mutc/6Mutc/1Yutc\]

  -------------------------------------------------------------------------------------------------------------------------------------------

-   [Index Candlesticks Channel](/docs-v5/en/#public-data-websocket-index-candlesticks-channel) Added UTC time zone k-line channel\

  -----------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -----------------------
  \> channel        String            Yes               Channel name\
                                                        `index-candle1Y`\
                                                        `index-candle6M`\
                                                        `index-candle3M`\
                                                        `index-candle1M`\
                                                        `index-candle1W`\
                                                        `index-candle1D`\
                                                        `index-candle2D`\
                                                        `index-candle3D`\
                                                        `index-candle5D`\
                                                        `index-candle12H`\
                                                        `index-candle6H`\
                                                        `index-candle4H`\
                                                        `index -candle2H`\
                                                        `index-candle1H`\
                                                        `index-candle30m`\
                                                        `index-candle15m`\
                                                        `index-candle5m`\
                                                        `index-candle3m`\
                                                        `index-candle1m`\
                                                        `index-candle1Yutc`\
                                                        `index-candle3Mutc`\
                                                        `index-candle1Mutc`\
                                                        `index-candle1Wutc`\
                                                        `index-candle1Dutc`\
                                                        `index-candle2Dutc`\
                                                        `index-candle3Dutc`\
                                                        `index-candle5Dutc`\
                                                        `index-candle12Hutc`\
                                                        `index-candle6Hutc`

  -----------------------------------------------------------------------------

-   [Mark Price Candlesticks Channel](/docs-v5/en/public-data-websocket-mark-price-candlesticks-channel) Added UTC time zone k-line channel\

  ----------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------
  \> channel        String            Yes               Channel name\
                                                        `mark-price-candle1Y`\
                                                        `mark-price-candle6M`\
                                                        `mark-price-candle3M`\
                                                        `mark-price-candle1M`\
                                                        `mark-price-candle1W`\
                                                        `mark-price-candle1D`\
                                                        `mark-price-candle2D`\
                                                        `mark-price-candle3D`\
                                                        `mark-price-candle5D`\
                                                        `mark-price-candle12H`\
                                                        `mark-price-candle6H`\
                                                        `mark-price-candle4H`\
                                                        `mark-price-candle2H`\
                                                        `mark-price-candle1H`\
                                                        `mark-price-candle30m`\
                                                        `mark-price-candle15m`\
                                                        `mark-price-candle5m`\
                                                        `mark-price-candle3m`\
                                                        `mark-price-candle1m`\
                                                        `mark-price-candle1Yutc`\
                                                        `mark-price-candle3Mutc`\
                                                        `mark-price-candle1Mutc`\
                                                        `mark-price-candle1Wutc`\
                                                        `mark-price-candle1Dutc`\
                                                        `mark-price-candle2Dutc`\
                                                        `mark-price-candle3Dutc`\
                                                        `mark-price-candle5Dutc`\
                                                        `mark-price-candle12Hutc`\
                                                        `mark-price-candle6Hutc`

  ----------------------------------------------------------------------------------

-   [Candlesticks Channel](/docs-v5/en/order-book-trading-market-data-ws-candlesticks-channel) Added UTC time zone k-line channel\

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------------------------------------------------------
  channel           String            Yes               Channel name\
                                                        `candle1Y`\
                                                        `candle6M` `candle3M` `candle1M`\
                                                        `candle1W`\
                                                        `candle1D` `candle2D` `candle3D` `candle5D`\
                                                        `candle12H` `candle6H` `candle4H` `candle2H` `candle1H`\
                                                        `candle30m` `candle15m` `candle5m` `candle3m` `candle1m`\
                                                        `candle1Yutc` `candle3Mutc` `candle1Mutc` `candle1Wutc` `candle1Dutc` `candle2Dutc` `candle3Dutc` `candle5Dutc` `candle12Hutc` `candle6Hutc`

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   [Get Bills Details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days) Added the field execType\

  ---------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------
  execType                String                  Liquidity taker or maker\
                                                  `T`: taker\
                                                  `M`: maker

  ---------------------------------------------------------------------------

-   [Get Bills Details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months) Added the field execType\

  ---------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------
  execType                String                  Liquidity taker or maker\
                                                  `T`: taker\
                                                  `M`: maker

  ---------------------------------------------------------------------------

-   Added new error codes\

  Error Message                                                                                                     HTTP Status Code   Error Code
  ----------------------------------------------------------------------------------------------------------------- ------------------ ------------
  The current account risk status only supports you to place IOC orders that can reduce the risk of your account.   200                51037
  There is already an IOC order under the current risk module that reduces the risk of the account.                 200                51038
  Leverage cannot be adjusted for the cross positions of Futures and Perpetual swap under the PM account.           200                51039
  Cannot adjust margins for long isolated options positions                                                         200                51040
  The current account mode does not support this API interface.                                                     200                51010
  Portfolio margin account does not support ordType {0} in Trading bot mode                                         200                51295
  Portfolio margin account only supports net mode.                                                                  200                51041
  Failed to amend bulk orders. You cannot add duplicate batch orders in your Portfolio margin account.              200                51512
  No net long positions can be held under cross margin mode in options.                                             200                51019

# 2021-10-19 

-   [Get Positions](/docs-v5/en/#trading-account-rest-api-get-positions) Add the field markPx:\
    The return parameter adds the marked price field：\

  **Parameter**   **Type**   **Description**
  --------------- ---------- -----------------
  markPx          String     Mark price

-   [Positions Channel](/docs-v5/en/#trading-account-websocket-positions-channel) Add the field markPx:\
    The return parameter adds the marked price field ：\

  **Parameter**   **Type**   **Description**
  --------------- ---------- -----------------
  \>markPx        String     Mark price

# 2021-10-18 

-   [Get Maximum Withdrawals](/docs-v5/en/#trading-account-rest-api-get-maximum-withdrawals) Support query with multiple currencies. Currencies should be separated by half-width commas and no more than 20.

-   Added new return fields to [Get Currencies](/docs-v5/en/#funding-account-rest-api-get-currencies)\

  **Parameters**   **Types**   **Description**
  ---------------- ----------- -------------------------------------------------
  mainNet          Boolean     If current chain is main net then return `true`

-   Added new error codes\

  Error Message                                                                     HTTP Status Code   Error Code
  --------------------------------------------------------------------------------- ------------------ ------------
  No permission to use this API                                                     200                50030
  Trigger orders are not available in the net mode of futures and perpetual swaps   200                51298
  Withdrawals suspended due to {chainName} maintenance                              200                58214
  Only IDs with the same instrument type are supported                              200                59004

# 2021-10-15 

Real Trading supported `iceberg` order and `twap` order.

-   Adjusted request field in [Place Algo Order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)：\
    before：\

  -------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- -------------------------------------
  ordType           String            Yes               Order type\
                                                        `conditional`: One-way stop order\
                                                        `oco`: One-cancels-the-other order\
                                                        `trigger`: Trigger order\

  -------------------------------------------------------------------------------------------

after：\

  -------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- -------------------------------------
  ordType           String            Yes               Order type\
                                                        `conditional`: One-way stop order\
                                                        `oco`: One-cancels-the-other order\
                                                        `trigger`: Trigger order\
                                                        `iceberg`: Iceberg order\
                                                        `twap`: TWAP order

  -------------------------------------------------------------------------------------------

Added new request fields:\

Iceberg Order

  -------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------------------------
  pxVar             String            Conditional       Price variance\
                                                        Either `pxVar` or `pxSpread` is allowed to be passed.

  pxSpread          String            Conditional       Price ratio

  szLimit           String            Yes               Average amount

  pxLimit           String            Yes               Price Limit
  -------------------------------------------------------------------------------------------------------------

TWAP Order

  -------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------------------------
  pxVar             String            Conditional       Price variance\
                                                        Either `pxVar` or `pxSpread` is allowed to be passed.

  pxSpread          String            Conditional       Price ratio

  szLimit           String            Yes               Average amount

  pxLimit           String            Yes               Price Limit

  timeInterval      String            Yes               Time interval
  -------------------------------------------------------------------------------------------------------------

-   Adjusted request field in [Get Algo Order History](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)、[Get Algo Order List](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)\

before：\

  -------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- -------------------------------------
  ordType           String            Yes               Order type\
                                                        `conditional`: One-way stop order\
                                                        `oco`: One-cancels-the-other order\
                                                        `trigger`: Trigger order\

  -------------------------------------------------------------------------------------------

after：\

  -------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- -------------------------------------
  ordType           String            Yes               Order type\
                                                        `conditional`: One-way stop order\
                                                        `oco`: One-cancels-the-other order\
                                                        `trigger`: Trigger order\
                                                        `iceberg`: Iceberg order\
                                                        `twap`: TWAP order

  -------------------------------------------------------------------------------------------

Added new returned fields:\

  ----------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ----------------------------------------------------
  pxVar                   String                  Price variance\
                                                  Only applicable to `iceberg` order or `twap` order

  pxSpread                String                  Price Ratio\
                                                  Only applicable to `iceberg` order or `twap` order

  szLimit                 String                  Average amount\
                                                  Only applicable to `iceberg` order or `twap` order

  pxLimit                 String                  Price Limit\
                                                  Only applicable to `iceberg` order or `twap` order

  timeInterval            String                  Time interval\
                                                  Only applicable to `twap` order
  ----------------------------------------------------------------------------------------------------

-   Added interface: [Cancel Advance Algo Order](/docs-v5/en/#order-book-trading-algo-trading-post-cancel-advance-algo-order)

-   Added new channel: [Advance Algo Orders Channel](/docs-v5/en/#order-book-trading-algo-trading-ws-advance-algo-orders-channel)

# 2021-10-14 

-   Added a new function module [demo trading explorer](/demo-trading-explorer/v5/en)

# 2021-10-12 

-   [Get maximum available balance/equity](/docs-v5/en/#trading-account-rest-api-get-maximum-available-balance-equity) and [Get the maximum loan of instrument](/docs-v5/en/trading-account-rest-api-get-the-maximum-loan-of-instrument) Support query with multiple instrument IDs(instId). Instrument IDs should be separated by half-width commas and no more than 5.\
-   Added endpoint: [Get Funds Transfer State](/docs-v5/en/#funding-account-rest-api-get-funds-transfer-state)\

# 2021-09-30 

-   Added endpoint: [Lightning Deposits](/docs-v5/en/#funding-account-rest-api-lightning-deposits)\
-   Added endpoint: [Lightning Withdrawals](/docs-v5/en/#funding-account-rest-api-lightning-withdrawals)\
-   Added new error codes\

  Error Message                                                                               HTTP Status Code   Error Code
  ------------------------------------------------------------------------------------------- ------------------ ------------
  Invoice expired.                                                                            200                58351
  Invalid invoice.                                                                            200                58352
  Deposit amount must be within limits.                                                       200                58353
  You have reached the limit of 10,000 invoices per day.                                      200                58354
  Permission denied. Please contact your account manager.                                     200                58355
  The accounts of the same node do not support the Lightning network deposit or withdrawal.   200                58356

# 2021-09-08 

-   Added new error codes\

  Error Message                                                    HTTP Status Code   Error Code
  ---------------------------------------------------------------- ------------------ ------------
  The range of Price variance is {0}\~{1}                          200                51282
  The range of Time interval is {0}\~{1}                           200                51283
  The range of Average amount is {0}\~{1}                          200                51284
  The range of Total amount is {0}\~{1}                            200                51285
  The total amount should not be less than {0}                     200                51286
  Contract not supported                                           200                51287
  We are stopping the Bot. Please do not click it multiple times   200                51288
  Bot configuration does not exist. Please try again later         200                51289
  The Bot engine is being upgraded. Please try again later         200                51290
  This Bot does not exist or has been stopped                      200                51291
  This Bot type does not exist                                     200                51292
  This Bot does not exist                                          200                51293
  This Bot cannot be created temporarily. Please try again later   200                51294

# 2021-09-07 

-   [Get Leverage](/docs-v5/en/#trading-account-rest-api-get-leverage):\
    Support query with multiple instrument IDs(instId). Instrument IDs should be separated by half-width commas and no more than 20.\

  **Parameter**   **Type**   **Required**   **Description**
  --------------- ---------- -------------- -----------------------------------------------------------------------------------
  instId          String     No             Single instrument or multiple instruments (no more than 20) separated with comma.

-   Added interface: [Get index components](/docs-v5/en/#central-limit-orderbook-market-data-get-index-components)

# 2021-09-06 

Release on Demo Trading

Demo Trading supported `iceberg` order and `twap` order.

-   Adjusted request field in [Place Algo Order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)：\
    before：\

  -------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- -------------------------------------
  ordType           String            Yes               Order type\
                                                        `conditional`: One-way stop order\
                                                        `oco`: One-cancels-the-other order\
                                                        `trigger`: Trigger order\

  -------------------------------------------------------------------------------------------

after：\

  -------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- -------------------------------------
  ordType           String            Yes               Order type\
                                                        `conditional`: One-way stop order\
                                                        `oco`: One-cancels-the-other order\
                                                        `trigger`: Trigger order\
                                                        `iceberg`: Iceberg order\
                                                        `twap`: TWAP order

  -------------------------------------------------------------------------------------------

Added new request fields:\

Iceberg Order

  -------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------------------------
  pxVar             String            Conditional       Price variance\
                                                        Either `pxVar` or `pxSpread` is allowed to be passed.

  pxSpread          String            Conditional       Price ratio

  szLimit           String            Yes               Average amount

  pxLimit           String            Yes               Price Limit
  -------------------------------------------------------------------------------------------------------------

TWAP Order

  -------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- -------------------------------------------------------
  pxVar             String            Conditional       Price variance\
                                                        Either `pxVar` or `pxSpread` is allowed to be passed.

  pxSpread          String            Conditional       Price ratio

  szLimit           String            Yes               Average amount

  pxLimit           String            Yes               Price Limit

  timeInterval      String            Yes               Time interval
  -------------------------------------------------------------------------------------------------------------

-   Adjusted request field in [Get Algo Order History](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)、[Get Algo Order List](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)\

before：\

  -------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- -------------------------------------
  ordType           String            Yes               Order type\
                                                        `conditional`: One-way stop order\
                                                        `oco`: One-cancels-the-other order\
                                                        `trigger`: Trigger order\

  -------------------------------------------------------------------------------------------

after：\

  -------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- -------------------------------------
  ordType           String            Yes               Order type\
                                                        `conditional`: One-way stop order\
                                                        `oco`: One-cancels-the-other order\
                                                        `trigger`: Trigger order\
                                                        `iceberg`: Iceberg order\
                                                        `twap`: TWAP order

  -------------------------------------------------------------------------------------------

Added new returned fields:\

  ----------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ----------------------------------------------------
  pxVar                   String                  Price variance\
                                                  Only applicable to `iceberg` order or `twap` order

  pxSpread                String                  Price Ratio\
                                                  Only applicable to `iceberg` order or `twap` order

  szLimit                 String                  Average amount\
                                                  Only applicable to `iceberg` order or `twap` order

  pxLimit                 String                  Price Limit\
                                                  Only applicable to `iceberg` order or `twap` order

  timeInterval            String                  Time interval\
                                                  Only applicable to `twap` order
  ----------------------------------------------------------------------------------------------------

-   Added interface: [Cancel Advance Algo Order](/docs-v5/en/#order-book-trading-algo-trading-post-cancel-advance-algo-order)

-   Added new channel: [Advance Algo Orders Channel](/docs-v5/en/#order-book-trading-algo-trading-ws-advance-algo-orders-channel)

# 2021-09-03 

-   Added a new function module [trading statistics function](/docs-v5/en/#trading-statistics)

# 2021-08-31 

-   Added new return fields `stgyEq` and `isoUpl` to [Get Balance](/docs-v5/en/#funding-account-rest-api-get-balance)\
-   Added new fields `stgyEq` and `isoUpl` to push data for [Account Channel](/docs-v5/en/#trading-account-websocket-account-channel)

  ----------------------------------------------------------------------------------------------------------
  **Parameters**          **Types**               **Description**
  ----------------------- ----------------------- ----------------------------------------------------------
  \> stgyEq               String                  strategy equity

  \> isoUpl               String                  Isolated unrealized profit and loss of the currency\
                                                  Applicable to `Futures mode` and `Multi-currency margin`
  ----------------------------------------------------------------------------------------------------------

# 2021-08-20 

-   Added a new request field `txId` to [Get Withdrawal History](/docs-v5/en/#funding-account-rest-api-get-withdrawal-history), [Get Deposit History](/docs-v5/en/#funding-account-rest-api-get-deposit-history)\

  Parameter   Type     Required   Description
  ----------- -------- ---------- ----------------------------
  txId        String   No         Hash record of the deposit

-   [Withdrawal](/docs-v5/en/#funding-account-rest-api-withdrawal) supported universal address\

# 2021-07-30 

-   Added a new request parameter `tgtCcy` for order placement：\
    -   [REST-Place Order](/docs-v5/en/#order-book-trading-trade-post-place-order)\
    -   [REST-Place Multiple Orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders)\
    -   [REST-Place Algo Order](/docs-v5/en/#order-book-trading-algo-trading-post-place-algo-order)\
    -   [WebSocket-Place Order](/docs-v5/en/#order-book-trading-trade-ws-place-order)\
    -   [WebSocket-Place Multiple Orders](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders)\

  ---------------------------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- ---------------------------------------------------------
  tgtCcy            String            No                The number of transactions the type\
                                                        `base_ccy`: Base currency ,`quote_ccy`: Quote currency\
                                                        Only applicable to `SPOT`

  ---------------------------------------------------------------------------------------------------------------

-   Added a new response parameter `tgtCcy` for order query：\
    -   [Get Order Details](/docs-v5/en/#order-book-trading-trade-get-order-details)\
    -   [Get Order History (last 7 days）](/docs-v5/en/#order-book-trading-trade-get-order-history-last-7-days)\
    -   [Get Order History (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-order-history-last-3-months)\
    -   [Get Order List](/docs-v5/en/#order-book-trading-trade-get-order-list)\
    -   [Get Algo Order List](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-list)\
    -   [Get Algo Order History](/docs-v5/en/#order-book-trading-algo-trading-get-algo-order-history)\

  ---------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ---------------------------------------------------------
  tgtCcy                  String                  The number of transactions the type\
                                                  `base_ccy`: Base currency ,`quote_ccy`: Quote currency\
                                                  Only applicable to `SPOT`

  ---------------------------------------------------------------------------------------------------------

-   Added a field `tgtCcy` to push data for WebSocket channel：\
    -   [Order Channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)\
    -   [Algo Orders Channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)\

  ---------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- ---------------------------------------------------------
  tgtCcy                  String                  The number of transactions the type\
                                                  `base_ccy`: Base currency ,`quote_ccy`: Quote currency\
                                                  Only applicable to `SPOT`

  ---------------------------------------------------------------------------------------------------------

-   Added a new error code `59110`\

  Error Message                                                                          HTTP Status Code   Error Code
  -------------------------------------------------------------------------------------- ------------------ ------------
  The instrument type corresponding to this {0} does not support the tgtCcy parameter.   200                59110

-   Added a new error code `51281`\

  Error Message                               HTTP Status Code   Error Code
  ------------------------------------------- ------------------ ------------
  trigger not support the tgtCcy parameter.   200                51281

# 2021-07-20 

-   Added endpoint: [Get Transaction Details (last 3 months)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-months)
-   [Get Transaction details (last 3 days)](/docs-v5/en/#order-book-trading-trade-get-transaction-details-last-3-days) The transaction details endpoint will be modified from obtaining historical data of the past 3 months to historical data of the past 3 days.
-   Added endpoint: [Get Position Tiers](/docs-v5/en/#public-data-rest-api-get-position-tiers)

# 2021-07-08 

-   Added a new endpoint: [Get PiggyBank balance](/docs-v5/en/#financial-product-savings-get-saving-balance)

# 2021-06-15 

-   Added a new returned field `ctAddr` to [Get Deposit Address](/docs-v5/en/#funding-account-rest-api-get-deposit-address)\

  Parameter   Type     Description
  ----------- -------- -----------------------------------
  ctAddr      String   Last 6 digits of contract address

-   Added a new returned field `chain` to [Get Deposit Address](/docs-v5/en/#funding-account-rest-api-get-deposit-address), [Withdrawal](/docs-v5/en/#funding-account-rest-api-withdrawal), [Get Withdrawal History](/docs-v5/en/#funding-account-rest-api-get-withdrawal-history), [Get Deposit History](/docs-v5/en/#funding-account-rest-api-get-deposit-history)\

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter               Type                    Description
  ----------------------- ----------------------- ---------------------------------------------------------------------------------------------------------------------------------
  chain                   String                  Chain name\
                                                  There are multiple chains under some currencies, such as `USDT` has `USDT-ERC20`, `USDT-TRC20`. You have to make a distinction.

  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Added a new request field `chain` to [Withdrawal](/docs-v5/en/#funding-account-rest-api-withdrawal)\

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Parameter         Type              Required          Description
  ----------------- ----------------- ----------------- ----------------------------------------------------------------------------------------------------------------------------------
  chain             String            Conditional       Chain name\
                                                        There are multiple chains under some currencies, such as `USDT` has `USDT-ERC20`, `USDT-TRC20`. You have to make a distinction.\
                                                        If the parameter is not filled in, the default will be the main chain.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Parameter \'ccy\' no longer contains chain info in funding interfaces.

# 2021-06-11 

-   Added a new error code `55000`\

  Error Message                                                 HTTP Status Code   Error Code
  ------------------------------------------------------------- ------------------ ------------
  Cannot be transferred out within 30 minutes after delivery.   200                55000

-   [Get maximum order quantity](/docs-v5/en/#trading-account-rest-api-get-maximum-order-quantity):\
    Support query with multiple instrument IDs(instId). Instrument IDs should be separated by half-width commas and no more than 5.\

  **Parameter**   **Type**   **Required**   **Description**
  --------------- ---------- -------------- -----------------------------------------------------------------------------------------------------------------------
  instId          String     No             Single instrument or multiple instruments (no more than 5) separated with comma, e.g. BTC-USDT-200802,ETH-USDT-200802

# 2021-06-08 

-   Adjusted returned fields in [Master accounts manage the transfers between sub-accounts](/docs-v5/en/#sub-account-rest-api-master-accounts-manage-the-transfers-between-sub-accounts)\

before：\

  **Parameter name**   **Type**   **Description**
  -------------------- ---------- -----------------
  transferId           int        Transfer ID

after：\

  **Parameter name**   **Type**   **Description**
  -------------------- ---------- -----------------
  transId              String     Transfer ID

-   Updated data type for error code `50011`\

before：\

  **code**   **type**   **httpcode**   **msg**
  ---------- ---------- -------------- ------------------------
  50011      int        429            Requests too frequent.

after：\

  **code**   **type**   **httpcode**   **msg**
  ---------- ---------- -------------- ------------------------
  50011      String     429            Requests too frequent.

-   [Get Positions](/docs-v5/en/#trading-account-rest-api-get-positions): Support query with multiple instrument IDs(instId). Instrument IDs should be separated by half-width commas and no more than 5.\

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**     **Type**          **Required**      **Description**
  ----------------- ----------------- ----------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------
  instType          String            No                Instrument type\
                                                        `MARGIN`\
                                                        `SWAP`\
                                                        `FUTURES`\
                                                        `OPTION`\
                                                        `instId` will be checked against `instType` when both parameters are passed, and the position information of the `instId` will be returned.

  instId            String            No                Instrument ID, e.g. `BTC-USD-190927-5000-C`\
                                                        If there were a position under instId, it would return the position information even if its open interest is 0. Otherwise, it will return an empty value.

  posId             String            No                Single position ID or multiple position IDs (no more than 20) separated with comma
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Added new fields to [Order Channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel)\

  **Parameter**        **Type**   **Description**
  -------------------- ---------- --------------------------------------------
  \> fillNotionalUsd   String     Filled notional value in `USD` of order
  \> notionalUsd       String     Estimated national value in `USD` of order

-   Added new fields to [Algo Orders Channel](/docs-v5/en/#order-book-trading-algo-trading-ws-algo-orders-channel)\

  **Parameter**    **Type**   **Description**
  ---------------- ---------- --------------------------------------------
  \> notionalUsd   String     Estimated national value in `USD` of order

# 2021-05-25 

-   Added new fields to [Get Discount Rate And Interest-Free Quota](/docs-v5/en/#public-data-rest-api-get-discount-rate-and-interest-free-quota)\

  **Parameter**     **Type**           **Description**
  ----------------- ------------------ ------------------------------------------------------------
  discountInfo      Array of objects   Detailed discount rate of a certain currency
  \> discountRate   String             Discount rate
  \> maxAmt         String             Upper limit of a tier (USD). \"\" means positive infinity.
  \> minAmt         String             Lower limit of a tier (USD). The minimum value is 0.

-   Added Get the underlying index of derivatives: [Get Underlying](/docs-v5/en/#public-data-rest-api-get-underlying)
-   Added Get the public information interface of Margin interest rate and borrow limit: [Get Interest Rate and Loan Quota](/docs-v5/en/#public-data-rest-api-get-interest-rate-and-loan-quota)
-   Added enumeration value to `ordType` of [Place Order](/docs-v5/en/#order-book-trading-trade-post-place-order),[Place Multiple Orders](/docs-v5/en/#order-book-trading-trade-post-place-multiple-orders),[Place Order Channel](/docs-v5/en/#order-book-trading-trade-ws-place-order),[Place Multiple Orders Channel](/docs-v5/en/#order-book-trading-trade-ws-place-multiple-orders): `optimal_limit_ioc`

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Parameter**           **Type**                **Description**
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------------------------------
  ordType                 String                  Order type\
                                                  `market`: market order\
                                                  `limit`: limit order\
                                                  `post_only`: Post-only order\
                                                  `fok`: Fill-or-kill order\
                                                  `ioc`: Immediate-or-cancel order\
                                                  `optimal_limit_ioc`: Market order with immediate-or-cancel order (applicable only to Futures and Perpetual swap).

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 2021-05-18 

-   [Get Balance](/docs-v5/en/#trading-account-rest-api-get-balance), [Get Sub-account Balance](/docs-v5/en/#rest-api-subaccount-get-sub-account-balance), [Account Channel](/docs-v5/en/#trading-account-websocket-account-channel) add new response parameters: `notionalUsd`（Notional value of positions in `USD`）,`notionalLever`（Leverage of the currency）,`eqUsd`（Equity `USD` of the currency）,`maxLoan`（Max loan of the currency）.

# 2021-05-12 

-   Adjusted fields in REST API [Status](/docs-v5/en/#status-get-status): `begin` and `end` timestamps changed from seconds to milliseconds.

# 2021-04-27 

-   Modified the `clOrdId` rules of the WebSocket transaction module interface [WebSocket Trade](/docs-v5/en/#order-book-trading-trade-ws-order-channel)

# 2021-04-21 

-   Added books50-l2-tbt with 50 depth levels [books50-l2-tbt with 50 depth levels](/docs-v5/en/#order-book-trading-market-data-ws-order-book-channel)\
-   Added new fields to [Get orders channel](/docs-v5/en/#order-book-trading-trade-ws-order-channel): `fillFee` (the fee of the last filled) ,`fillFeeCcy` (the currency of the last filled),`execType` (liquidity taker or maker of the last filled, `T`: taker `M`: maker )
-   Added new fields to [Get account configuration](/docs-v5/en/#trading-account-rest-api-get-account-configuration): `level`(fee tier), and `levelTmp`(trial fee tier)
-   Added an interface for [obtaining position tiers of derivatives](/docs-v5/en/#public-data-rest-api-get-position-tiers)
-   Added an [on-chain transaction data](/docs-v5/en/#public-data-rest-api-get-oracle) interface
-   Added an enumeration value `interest_deduction` of `eventType` to [balance and position channel](/docs-v5/en/#trading-account-websocket-balance-and-position-channel)
-   Deleted `subType` 109: liquidation fee in [Get Bills Details (last 7 days)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-7-days) and [Get Bills Details (last 3 months)](/docs-v5/en/#trading-account-rest-api-get-bills-details-last-3-months)
-   Add new response fields to [Positions Channel](/docs-v5/en/#trading-account-websocket-positions-channel) and [Get Positions](/docs-v5/en/#trading-account-rest-api-get-positions):\

  **Parameter**   **Type**   **Description**
  --------------- ---------- ------------------------------------------------------------------------
  \> deltaBS      String     delta：Black-Scholes Greeks in dollars, only applicable to `OPTION`
  \> deltaPA      String     delta：Greeks in coins, only applicable to `FUTURES`、`SWAP`、`OPTION`
  \> gammaBS      String     gamma：Black-Scholes Greeks in dollars, only applicable to `OPTION`
  \> gammaPA      String     gamma：Greeks in coins, only applicable to `OPTION`
  \> thetaBS      String     theta：Black-Scholes Greeks in dollars, only applicable to `OPTION`
  \> thetaPA      String     theta：Greeks in coins, only applicable to `OPTION`
  \> vegaBS       String     vega：Black-Scholes Greeks in dollars, only applicable to `OPTION` \`
  \> vegaPA       String     vega：Greeks in coins, only applicable to `OPTION`

# 2021-04-16 

-   Added endpoint: [Get account and position risk](/docs-v5/en/#trading-account-rest-api-get-account-and-position-risk)
-   Added new fields to [Get Balance](/docs-v5/en/#trading-account-rest-api-get-balance), [Get sub-account trading balance](/docs-v5/en/#sub-account-rest-api-get-sub-account-trading-balance), [Account Channel](/docs-v5/en/#trading-account-websocket-account-channel): `cashBal` (balance of a certain currency), and `uTime` (balance update time of a certain currency)
-   Added endpoint: [Get interest rate](/docs-v5/en/#trading-account-rest-api-get-interest-rate)
-   Added endpoint: [Get 24H Total Volume](/docs-v5/en/#order-book-trading-market-data-get-24h-total-volume)

# 2021-03-31 

-   Added new fields to [Get Balance](/docs-v5/en/#trading-account-rest-api-get-balance): `ordFroz` (position margin of cross pending orders converted to USD).
-   Added new fields to [Query detailed balance info of Trading Account of a sub-account (applies to master accounts only)](/docs-v5/en/#sub-account-rest-api-get-sub-account-trading-balance): `ordFroz` (position margin of cross pending orders converted to USD).
-   Added new fields to [Account Channel](/docs-v5/en/#trading-account-websocket-account-channel): `ordFroz` (position margin of cross pending orders converted to USD).

# 2021-03-24 

-   Added AWS domain name to Real market.
-   Added domain name to Demo trading. The old domain name will be replaced by the new one.

# 2021-03-02 

-   Added Push channel: [balance and position](/docs-v5/en/#trading-account-websocket-balance-and-position-channel)

# 2021-02-26 

-   Added new fields to [Get Balance](/docs-v5/en/#trading-account-rest-api-get-balance): `disEq` (equity of a certain currency converted to USD).

# 2021-02-05 

-   Due to the logic change of [discount rate calculation](/docs-v5/en/#public-data-rest-api-get-discount-rate-and-interest-free-quota) used to acquire the interest-free limit and discount rate will return parameters of discount level（discountLv）instead of discount rate（discount). For more info, please refer to [Discount rates](https://www.okx.com/trade-market/discountrate).\
    response before:\
    `{ "code":"0", "msg":"", "data":[ { "ccy":"BTC", "amt" :"2" , "discount" :"0.8" } ] }`\
    response after:\
    `{ "code":"0", "msg":"", "data":[ { "ccy":"BTC", "amt" :"2" , "discountLv" :"1" } ] }`\

-   Added a new response field to [Get Balance](/docs-v5/en/#trading-account-rest-api-get-balance): uplLiab(liabilities due to Unrealized loss of the position).





