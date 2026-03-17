# Portfolio Summary: Unrealized gain

**URL:** https://www.tradingview.com/support/solutions/43000756017-portfolio-summary-unrealized-gain/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Portfolio - / [ Portfolio Summary ](/support/folders/43000598041-portfolio-summary/) - / [ Portfolio Summary: Unrealized gain ](/support/solutions/43000756017-portfolio-summary-unrealized-gain/) # Portfolio Summary: Unrealized gain Definition - Unrealized gain – profit or loss on open positions. - Unrealized gain % – financial result on open positions, expressed as a percentage of the initial value of open positions. - Unrealized gain Last day – financial result on open positions for the last day. - Unrealized gain Last day % – financial result on open positions for the last day, expressed as a percentage of the value of open positions on the previous day. Interpretation These values help you understand: - how profitable or unprofitable the open positions are; - how the financial result changed over the last day; Calculation - Unrealized gain = Σ(Value − Invested) for all open positions - Unrealized gain % = Unrealized gain / Σ(Invested) for all open positions * 100% - Unrealized gain Last day = (ClosingPrice_today * Qty_today) - ((Qty_yesterday - Qty_sold_today) * ClosingPrice_yesterday) - (Qty_bought_today * PurchasePrice_today) - Unrealized gain Last day % = Unrealized gain Last day / Σ(Value yesterday) for all open positions * 100% Note: If one of the open positions was opened today, i.e., on the date of parameter calculation, the Value of the new position should be added to the total Value of positions for yesterday. This means Unrealized gain Last day will include the Unrealized gain for the new position. Example calculation for a portfolio as of 2025-02-11: - 2025-02-01 Deposit 1000 - 2025-02-04 Buy NASDAQ:AAPL: price = 223.8 - Qty = 1 - Commission = 0 - 2025-02-11 Buy NASDAQ:TSLA: price = 345.8 - Qty = 3 - Commission = 0 Last price (NASDAQ:AAPL) = 232.62Price on 2025-02-10 (NASDAQ:AAPL) = 227.65Last price (NASDAQ:TSLA) = 328.50 Invested = 223.8 + 345.8 × 3 = 1261.2 Σ Value = 232.62 × 1 + 328.5 × 3 = 1218.12 Σ Value yesterday = 227.65 × 1 + 345.8 × 3 = 1265.05 Unrealized gain = 1218.12 − 1261.2 = −43.08Unrealized gain % = −43.08 / 1261.2 × 100 = −3.416%Unrealized gain yesterday = 1265.05 − 1261.2 = 3.85Unrealized gain Last day = 232.62 * 1 - (1 - 0) * 227.65 - 0 * 0 + 328.5 * 3 - (0 - 0) * na - 3 * 345.8 = -46.93Unrealized gain Last day % = −46.93 / 1265.05 × 100 = −3.71% Previous Previous Portfolio summary: Portfolio value and Cash Next Next Portfolio summary: total and realized gain Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43604092641/original/PET8h8DmgiFySBmjSlllTGG3TFuQJO2mPg.png?1769622092)

**Описание:** This TradingView image displays a **\


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

