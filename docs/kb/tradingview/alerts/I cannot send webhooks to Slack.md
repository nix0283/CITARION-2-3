# I cannot send webhooks to Slack

**URL:** https://www.tradingview.com/support/solutions/43000529313-i-cannot-send-webhooks-to-slack/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Alerts - / [ Webhooks usage ](/support/folders/43000560150-webhooks-usage/) - / [ I cannot send webhooks to Slack ](/support/solutions/43000529313-i-cannot-send-webhooks-to-slack/) # I cannot send webhooks to Slack Slack only accepts JSON data, as written in [their documentation](https://api.slack.com/incoming-webhooks), so you need to format the alert message properly. You can find the [example of formatting](https://api.slack.com/incoming-webhooks#posting_with_webhooks) in the documentation. Instead of a usual alert message 'BTCUSD Greater Than 9000' you should use a key **"text"** with a value containing the alert message: {"text":"BTCUSD Greater Than 9000"} You can find out more about the JSON format [in Wikipedia](https://en.wikipedia.org/wiki/JSON). Previous Previous I cannot send webhook to a URL with a port number Next Next I cannot send webhooks to Discord Launch Supercharts

---

## Изображения

![Image 1](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 2](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

