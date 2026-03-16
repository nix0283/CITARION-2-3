# Sortino Ratio

**URL:** https://www.tradingview.com/support/solutions/43000681697-sortino-ratio/

---

- [ Help Center ](/)
- / [ Knowledge base ](/knowledge-base/)
- / Strategies 
- / [ Strategy report metrics ](/support/folders/43000599093-strategy-report-metrics/)
- / [ Sortino Ratio ](/support/solutions/43000681697-sortino-ratio/)

# Sortino Ratio 
 The Sortino ratio is a variation of the Sharpe ratio. Unlike the Sharpe ratio, its is calculated using the standard deviation of the downside risk, rather than that of the entire (upside + downside) risk. Due to this, it is thought to give a better view of a portfolio's risk-adjusted performance because positive volatility is considered a benefit.

The formula for the Sortino ratio is SR = (MR - RFR) / DD, where MR is the average return for a monthly period, and RFR is the risk-free rate of return (by default, 2% annually. Can be changed with the "risk_free_rate" parameter of the "strategy()" function). DD is the downside deviation of returns = sqrt(sum(min(0, Xi - T))^2/N), where Xi - ith return, N - total number of returns, T - target return.
 Previous Previous Sharpe ratio Next Next Total trades Launch Supercharts

