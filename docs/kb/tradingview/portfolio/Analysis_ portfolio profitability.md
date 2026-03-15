# Analysis: portfolio profitability

**URL:** https://www.tradingview.com/support/solutions/43000756106-analysis-portfolio-profitability/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Portfolio - / [ Analysis ](/support/folders/43000598045-analysis/) - / [ Analysis: portfolio profitability ](/support/solutions/43000756106-analysis-portfolio-profitability/) # Analysis: portfolio profitability An interactive chart displays the monthly portfolio returns compared to the benchmark. Main chart elements: - X-axis (horizontal) — calendar months. - Y-axis (vertical) — monthly return, in %. - Chart bars: Blue — portfolio return. - Red — benchmark return. - All values are plotted from a zero baseline, allowing for visual evaluation of growth and drawdowns. - When hovering over a bar, a tooltip appears showing the return for the respective month. Below the chart is a period switcher that includes all calendar years from the beginning of the tracking, as well as the TTM option (Trailing Twelve Months — last 12 months). Method for calculating monthly returns: Returns are calculated using the Time-Weighted Return (TWR) method, based on the portfolio value on the dates of cash base changes. Formula: Perf % = [(1 + HP₁) × (1 + HP₂) × ... × (1 + HPₙ)] − 1HP = (End value − Initial value) / Initial valueInitial value — portfolio value at the beginning of the month / previous cash base changeEnd value — portfolio value at the next cash base change To calculate the benchmark return, virtual trades are used to simulate the structure of the actual portfolio. On each date an asset is bought in the portfolio, a virtual purchase of the benchmark is made for an equivalent amount (quantity based on the benchmark price at the asset’s purchase date). Similarly, when an asset is sold, a virtual sale of the benchmark is made at the benchmark price on the sale date, using a quantity calculated based on the ratio of asset quantity to benchmark quantity at the entry date. This allows for accurate performance comparison between the portfolio and benchmark under identical cash flow conditions. Note: The same TWR-based calculation for the entire portfolio period is provided in the article [Portfolio Summary: Total and Realized gain](https://www.tradingview.com/support/solutions/43000756023/). Previous Previous Transactions page Next Next Analysis: Beta Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43558817052/original/NAY4j4JPniubs5rTF36L0rpx4f3dEqEMvw.png?1747723669)

**Описание:** This TradingView image displays a **portfolio profitability analysis** interface with the following elements:  

### Top Navigation Bar  
- Four tabs: *Portfolio* (active), *Holdings*, *Transactions*, *Analysis* (underlined, indicating the current view).  


### Main Chart: “Portfolio profitability”  
A **bar chart** comparing portfolio performance (blue bars) vs. S&P 500 (red bars) across months (Feb–May) with a year-to-date (TTM) 2025 scope.  

#### Chart Components:  
- **X-axis**: Months (Feb, Mar, Apr, May).  
- **Y-axis**: Percentage scale (–7.0% to 7.0%), measuring performance.  
- **Bars**:  
  - Blue = *Portfolio %* (user’s portfolio performance).  
  - Red = *S&P 500 %* (benchmark performance).  
- **Tooltip (top-right)**: Hover state showing:  
  - *Portfolio 6.25%* (blue bar, May).  
  - *S&P 500 1.38%* (red bar, May).  
- **Legend (bottom-center)**: Confirms blue = Portfolio, red = S&P 500.  


### Bottom Left  
- *TTM* (Year-to-Date) label + *2025* (timeframe).  


### Purpose  
The chart visualizes how the user’s portfolio performed relative to the S&P 500 over 4 months, highlighting outperformance (e.g., May: 6.25% vs. 1.38%). The UI elements (tabs, legend, tooltip) enable navigation, data interpretation, and quick performance comparison.


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

