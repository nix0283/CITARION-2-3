# Webhook authentication

**URL:** https://www.tradingview.com/support/solutions/43000680459-webhook-authentication/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Alerts - / [ Webhooks usage ](/support/folders/43000560150-webhooks-usage/) - / [ Webhook authentication ](/support/solutions/43000680459-webhook-authentication/) # Webhook authentication When sending a request, the webhook server also sends an SSL certificate to the specified URL. With this certificate, you can verify that the request was actually sent by the TradingView server. Note: The certificate is sent only when using the HTTPS protocol. Enabling and corresponding configuration of the certificate verification is carried out entirely on the side of the webhook recipient application, and no additional actions need to be performed on the TradingView website. The authenticity of the request can be verified using the following certificate fields: Subject: - C = US - ST = Ohio - L = Westerville - O = TradingView, Inc. - CN = webhook-server@tradingview.com Subject Alternative Name: - email:webhook-server@tradingview.com Previous Previous I cannot send webhooks to Discord Next Next Using credentials for webhooks Launch Supercharts

---

## Изображения

![Image 1](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 2](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

