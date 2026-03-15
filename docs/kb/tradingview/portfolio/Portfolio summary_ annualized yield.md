# Portfolio summary: annualized yield

**URL:** https://www.tradingview.com/support/solutions/43000756024-portfolio-summary-annualized-yield/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Portfolio - / [ Portfolio Summary ](/support/folders/43000598041-portfolio-summary/) - / [ Portfolio summary: annualized yield ](/support/solutions/43000756024-portfolio-summary-annualized-yield/) # Portfolio summary: annualized yield Definition: Annualized yield is a portfolio performance indicator expressed as the weighted average annual return, calculated taking into account all cash flows. The XIRR method (Extended Internal Rate of Return) is used for the calculation. Interpretation: Annualized yield allows an investor to objectively assess the portfolio's return over time, smoothing out the impact of transactions that differ in amount and date. Unlike simple return, XIRR accounts for the exact dates of deposits and withdrawals, which makes the metric relevant for portfolios with irregular cash flows. Calculation: As cash flows, we use the actual changes in cash balance on the account, i.e., net inflows/outflows, where the final date-value pair = calculation date and current portfolio value. Note: all other operations — buy, sell, commission, taxes and fees — are not considered as separate cash flows; their amounts affect the final portfolio value. For details on calculating Annualized yield for individual instruments in the Total holdings section of the Holdings tab, read here: [Holdings page](https://www.tradingview.com/support/solutions/43000756132/) As an example, let’s calculate Annualized yield as of 2025-04-07 for the following portfolio: 2025-02-01 Deposit 1000 2025-03-07 Buy NASDAQ:AAPL: - price = 204 - Qty = 1 - Commission = 0 2025-04-07 Sell NASDAQ:AAPL: - price = 214 - Qty = 1 - Commission = 0 We identify the following cash flows: Date Cash flow 2025-02-01 -1000 2025-04-07 1010 Then we use the XIRR formula in Excel, where inflows are indicated with a plus sign, and outflows with a minus sign: Date Cash flow 2025-02-01 -1000 2025-04-07 1010 XIRR 5.75% Result: calculation using the XIRR methodology gives 5.75% Note: If the portfolio includes operations that result in a negative Cash value or a negative position value, all related metric calculations will be indicative. In this case, they are for informational purposes only and do not guarantee absolute accuracy. Difference in calculation day approaches: When comparing our calculated values with XIRR results in Excel, it is important to account for differences in how calculation days are defined: - XIRR in Excel performs calculations based on calendar days. - We rely on trading days** of all holdings** included in the portfolio when calculating Annualized yield in the summary, and on the specific trading days of the asset when calculating Annualized yield for individual holdings.[](https://www.investopedia.com/terms/i/irr.asp) Previous Previous Portfolio summary: total and realized gain Next Next Overview: Portfolio change Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43604190806/original/2zFJHfOwTN28stNdCTfO4nw6p1wILeca4A.png?1769672260)

**Описание:** This TradingView image displays a **performance summary widget** with the following elements:  

1. **Header**: \


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

