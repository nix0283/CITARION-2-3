# I cannot send webhooks to Discord

**URL:** https://www.tradingview.com/support/solutions/43000529625-i-cannot-send-webhooks-to-discord/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Alerts - / [ Webhooks usage ](/support/folders/43000560150-webhooks-usage/) - / [ I cannot send webhooks to Discord ](/support/solutions/43000529625-i-cannot-send-webhooks-to-discord/) # I cannot send webhooks to Discord Before sending webhooks to Discord, please read the [Developer Documentation](https://discordapp.com/developers/docs/intro). You must format your message properly depending on the action you want to perform. For example, if you want to post a message to the chat, instead of a usual alert message 'BTCUSD Greater Than 9000' you should use the **"content"** key with a string value containing the alert message (as it is written [in the documentation](https://discordapp.com/developers/docs/resources/channel#create-message)), instead of the usual alert message ' BTCUSD Greater Than 9000.' Look below for an example: {"content":"BTCUSD Greater Than 9000"} You can find out more about the JSON format [on Wikipedia](https://en.wikipedia.org/wiki/JSON). Previous Previous I cannot send webhooks to Slack Next Next Webhook authentication Launch Supercharts

---

## Изображения

![Image 1](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 2](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

