# How to configure webhook alerts

**URL:** https://www.tradingview.com/support/solutions/43000529348-how-to-configure-webhook-alerts/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Alerts - / [ Webhooks usage ](/support/folders/43000560150-webhooks-usage/) - / [ How to configure webhook alerts ](/support/solutions/43000529348-how-to-configure-webhook-alerts/) # How to configure webhook alerts A TradingView webhook notifies your external app when an alert is triggered. Instead of manually checking charts, we can automatically send data via an HTTP POST request to a URL you provide. This feature can be enabled when you create or edit an alert. Add the correct URL for your app and we will send a POST request as soon as the alert is triggered, with the alert message in the body of the request. If the alert message is valid JSON, the request will include an "application/json" content-type header. Otherwise, the request will use "text/plain" as a content-type header. **! Important:** When configuring webhooks, ensure that you don't include sensitive information such as login credentials or passwords in the webhook body. Transmitting sensitive data through webhooks can expose it to unauthorized parties and create security vulnerabilities. Always use secure, authenticated endpoints and encrypt sensitive data to protect your information. Here's a list of IP addresses that TradingView uses to send POST requests, in case they need to be allowlisted: - 52.89.214.238 - 34.212.75.30 - 54.218.53.128 - 52.32.178.7 If you want to send a request to a URL with a port number, only ports 80 and 443 are accepted. Requests to other ports will be rejected. If a remote server takes longer than three seconds to process a request, the request will be cancelled. Also, IPv6 isn't currently supported for webhooks. Please note that webhooks may occasionally fail to reach the specified URL. You can monitor their delivery by checking the 'Webhook status' column in the alert log. For more details on specific errors, please refer to [the solution](https://www.tradingview.com/support/solutions/43000776894-what-do-errors-mean-when-sending-webhooks/). Many apps and services expect webhooks data in JSON rather than plain text, which is the default format for alert messages. Before sending a request, check the documentation of the app or service you are integrating with and format you alert accordingly. For example, Slack [expects](https://api.slack.com/incoming-webhooks#posting_with_webhooks) a message formatted in JSON with “text” as a key. You can enter the following message in the alert box: {"text": "BTCUSD Greater Than 9000"} Since the message is valid JSON, TradingView will send the request with an "application/json" content-type header. Here’s how the request looks using [cURL](https://en.wikipedia.org/wiki/CURL): curl -H 'Content-Type: application/json; charset=utf-8' -d '{"text": "BTCUSD Greater Than 9000"}' -X POST https://example.com/webhook/PLACEHOLDER If your message is in plain text (i.e., the default alert message), the request will use a "text/plain" content-type header. [cURL](https://en.wikipedia.org/wiki/CURL): curl -H 'Content-Type: text/plain; charset=utf-8' -d 'BTCUSD Greater Than 9000' -X POST [https://webhook.site/test](https://webhook.site/test) For your data protection, webhook alerts are only allowed when [2-factor authentication](https://www.tradingview.com/support/solutions/43000572460-how-to-configure-2fa/) is enabled. Also read: - [How to configure your Supercharts](https://www.tradingview.com/support/solutions/43000748166-how-to-configure-your-supercharts/) - [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/) - [How to trade on TradingView](https://www.tradingview.com/support/solutions/43000756695-how-to-trade-on-tradingview/) - [Drawing tools](https://www.tradingview.com/support/solutions/43000703396-drawing-tools-available-on-tradingview/) - [Chart types](https://www.tradingview.com/support/solutions/43000703407-chart-types-available-on-tradingview/) - [What do errors mean when sending webhooks?](https://www.tradingview.com/support/solutions/43000776894/) Previous Previous Limited functionality state in Watchlist Alerts Next Next I cannot send webhook to a URL with a port number Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43587772865/original/AVDWnt-S8wgiGOawoT6OAP-QkTRnhaEefg.png?1761223787)

**Описание:** This is a **TradingView \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43609003344/original/fwuEdGrcNxUY-uM9t8cZ_3ER6-JUJgm5tw.png?1772032115)

**Описание:** The image shows a **TradingView \


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43587772237/original/3LNQ4cakZXY3Kg269eunnWuQBoAn0jCzhw.png?1761223630)

**Описание:** This is a **TradingView \


