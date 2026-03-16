# Overview: Portfolio change

**URL:** https://www.tradingview.com/support/solutions/43000756018-overview-portfolio-change/

---

- [ Help Center ](/)
- / [ Knowledge base ](/knowledge-base/)
- / Portfolio 
- / [ Overview ](/support/folders/43000598042-overview/)
- / [ Overview: Portfolio change ](/support/solutions/43000756018-overview-portfolio-change/)

# Overview: Portfolio change 
 Reflects portfolio dynamics over time in absolute values **(**Value) and relative indicators **(**Performance), with the option to compare against the benchmark.

#### Structure 

- Display mode selector: Value — reflects Portfolio value over time in the portfolio’s currency.
- Performance — displays relative portfolio performance (Total gain %).

 - Analysis period selector:
 Available intervals: 1 month, 3 months, 6 months, Year to date, 1 year, All time.
- By default, the **3 months** interval is selected.
- Under each button, the return for the selected period is displayed (if available).
- If the portfolio history is shorter than the selected period, the return is not displayed (marked with a dash), and the chart is built for the available period.

Note: Performance from the chart may not fully match Performance for fixed periods below the chart, in case the portfolio contains assets that lead the benchmark in trading days. I.e., the chart compares to the benchmark using dates on which the benchmark had trading days. Values for the fixed periods below the chart use all data, including those for assets on dates ahead of the benchmark.

#### Value mode 

- Line chart reflecting Portfolio value for each day
- Two lines are shown on the chart: Portfolio — actual value of all assets and cash.
- Benchmark — value of a virtual portfolio consisting only of the benchmark.

 - When hovering the cursor, a tooltip appears showing date and values:
 Portfolio: total value on the selected date.
- Benchmark: value on the same date.

The portfolio value on a given date is calculated taking into account free cash, current value of open positions, and accumulated realized profit as of that date. More info here: [Portfolio Summary: Portfolio Value and Cash](https://www.tradingview.com/support/solutions/43000756016/)

#### Performance mode 

- Displays the chart of relative returns.
- The scale is in percentages; performance can be positive (above zero) or negative (below zero).
- When hovering the cursor, a tooltip appears showing date and values: Portfolio performance in %.
- Benchmark performance in %.

Calculation method:

Calculated using the Time-Weighted Return (TWR) method, based on portfolio value on dates of changes to the cash base.

Formula: Perf % = [(1 + HP1) × (1 + HP2) × ⋯ × (1 + HPn)] − 1

Where:

- HP = (End value − Initial value) / Initial value
- Initial value — portfolio value on the start date of the month / previous change to the base
- End value — portfolio value on the date of change to the cash base

More info here: [Analysis: Portfolio profitability](https://www.tradingview.com/support/solutions/43000756106/) and [Portfolio Summary: Total and Realized gain](https://www.tradingview.com/support/solutions/43000756023/)

#### Comparison with benchmark 

To calculate returns for the benchmark, virtual trades are used that reproduce the timing of transactions from the actual portfolio. On each asset purchase date in the portfolio, a virtual purchase of the benchmark is made for an equivalent amount (quantity based on the benchmark price on the purchase date). Similarly, when an asset is sold — a virtual sale of the benchmark is made at its price on the sale date, with quantity calculated using the ratio of asset quantity to benchmark quantity on the entry date. This allows correct comparison of portfolio and benchmark performance under identical cash flow conditions.

[](https://www.investopedia.com/terms/t/time-weightedror.asp)
 Previous Previous Portfolio summary: annualized yield Next Next Overview: Portfolio distribution Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43558637984/original/tZVnr-WLNPcL_4MQSUsaxfS90XdLW1k5BQ.png?1747657428

**Описание:**

This image shows a **TradingView portfolio analysis interface** focused on tracking portfolio performance over time. Here's a detailed breakdown:


### **1. Top Navigation Bar**
- **Tabs**: Four navigation tabs at the top:  
  - `Portfolio` (active, likely the current view)  
  - `Holdings` (for viewing individual assets in the portfolio)  
  - `Transactions` (for viewing buy/sell history)  
  - `Analysis` (for deeper financial analysis tools)  


### **2. Main Section: \

---

