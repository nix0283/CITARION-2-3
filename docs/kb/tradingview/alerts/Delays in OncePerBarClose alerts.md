# Delays in OncePerBarClose alerts

**URL:** https://www.tradingview.com/support/solutions/43000773948-delays-in-onceperbarclose-alerts/

---

- [ Help Center ](/) - / - / [ Delays in OncePerBarClose alerts ](/support/solutions/43000773948-delays-in-onceperbarclose-alerts/) # Delays in OncePerBarClose alerts Alerts with the "Once Per Bar Close" setting don't always trigger exactly at the bar's close. This happens for two reasons: 1. Rare or late trades from the exchange To determine whether the current bar has actually closed, the server waits for the first trade of the new bar. Only after this appears can one be sure that no late trades will arrive for this bar (this sometimes happens due to network delays, for example). If an instrument is rarely traded or there are technical delays, the first trade of the new bar may appear several seconds after the bar formally closes. This causes the alert to be delayed. 2. Complete absence of trades If there are no trades for too long (for example, after a session closes), the server automatically "closes" the current bar 1 minute after its formal close, without waiting for the first trade of the new bar to appear. Therefore, for example, an alert for a session close will not trigger exactly at the close, but 1 minute after. Previous Previous The trigger time of a strategy alert differs from the order execution time in the strategy tester Next Next The impact of data repainting on alert calculation Launch Supercharts

---

## Изображения

![Image 1](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 2](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

