# Analysis: Beta

**URL:** https://www.tradingview.com/support/solutions/43000756135-analysis-beta/

---

- [ Help Center ](/)
- / [ Knowledge base ](/knowledge-base/)
- / ** Portfolio 
- / [ Analysis ](/support/folders/43000598045-analysis/)
- / [ Analysis: Beta ](/support/solutions/43000756135-analysis-beta/)

# Analysis: Beta 

#### Definition: 
 This indicator reflects the sensitivity of the portfolio’s return to benchmark fluctuations and measures its systematic risk relative to it.

#### Interpretation: 

- Beta = 1: The asset moves in sync with the market. If the market rises or falls by 1%, the asset is likely to change by the same 1%.
- Beta > 1: The asset is more volatile than the market. If the market rises by 1%, the asset’s price changes more — for example, by 1.5% (β = 1.5).
- Beta < 1: The asset is less volatile than the market. With the same 1% market movement, the asset changes by a smaller percentage, for example 0.5% (β = 0.5).
- Beta = 0: No correlation with the market. The asset’s movements are independent of the general market trend.
- Beta < 0: Inverse relationship. When the market rises, the asset falls and vice versa. This behavior is typical, for example, of certain defensive assets or instruments like inverse ETFs.

#### Example: 

Portfolio:

- Risk Free Rate (RFR) = 2%
- 2025-01-01 deposit of 1000
- 2025-03-03 purchase of NASDAQ:AAPL (qty:1, price: 190, commission: 0)
- 2025-04-11 Beta calculation date. Last price of AAPL = 198.15

Beta = −0.39, i.e., we have a portfolio with inverse correlation: when the benchmark rises by 1%, the portfolio on average decreases by 0.39%. When the benchmark falls, the portfolio increases by 0.39%, respectively.

Note: It’s important to account for the short-term nature of the period used for simplification of the calculation.

#### Calculation: 

Beta is calculated over the entire period covered by the portfolio using monthly returns (monthly performance) of the portfolio and the selected benchmark. Beta is displayed on a scale from 0 to 2, where the benchmark value is always fixed at 1, as it is the standard.

Formula: β = Covariance(Perf Bench, Perf Portfolio) / Variance(Perf Bench)where:

- Covariance — covariance of portfolio and benchmark returns
- Variance — variance of benchmark returns
- Perf Bench — monthly returns of the benchmark
- Perf Portfolio — monthly returns of the portfolio

Beta calculation example based on the interpretation’s portfolio:

- Perf Portfolio: January: 0
- February: 0
- March: 3.2% (obtained: pv as of March 31 ((1032.13-1000)/1000)*100)
- April: −2.3% (obtained: ((1008.15-1032.13)/1032.13)*100)

Avg = (0 + 0 + 3.2 − 2.3) / 4 = 0.225%

- Perf Bench: January: 0
- February: 0
- March: −0.773% (obtained: pv as of March 31 ((992.27-1000)/1000)*100)
- April: −0.813% (obtained: ((984.2-992.27)/992.27)*100)

Avg = (0 + 0 − 0.773 − 0.813) / 4 = −0.3965%

- Covariance(Perf Bench, Perf Portfolio): Deviations from averages for each month: January: (0 − 0.225)(0 − (−0.3965)) = (−0.225)(0.3965) = −0.0892
- February: (0 − 0.225)(0 − (−0.3965)) = (−0.225)(0.3965) = −0.0892
- March: (3.2 − 0.225)(−0.773 − (−0.3965)) = (2.975)(−0.3765) = −1.1201
- April: (−2.3 − 0.225)(−0.813 − (−0.3965)) = (−2.525)(−0.4165) = 1.0517

Covariance = (−0.0892 + (−0.0892) + (−1.1201) + 1.0517) / 4 = −0.062

- Variance(Perf Bench): Squared deviations from the benchmark mean:
- January: (0 − (−0.3965))² = 0.1572
- February: (0 − (−0.3965))² = 0.1572
- March: (−0.773 − (−0.3965))² = 0.1417
- April: (−0.813 − (−0.3965))² = 0.1735

Variance = (0.1572 + 0.1572 + 0.1417 + 0.1735) / 4 = 0.157

- Covariance(Perf Bench, Perf Portfolio) / Variance(Perf Bench): β = −0.062 / 0.157 = −0.39

#### Note: 

- Beta helps assess systematic (non-diversifiable) risk associated with market volatility but does not account for the asset’s fundamental characteristics.
- When interpreting the result, it is important to ensure that the selected benchmark is relevant to the assets included in the portfolio.
- If all transactions were made in the current month relative to the date of the Beta calculation, the indicator will not be calculated because there is no completed calendar month.

#### Also read** 

- [General about Beta](https://www.tradingview.com/support/solutions/43000703603/)
 Previous Previous Analysis: portfolio profitability Next Next Analysis: Sharpe ratio Launch Supercharts

