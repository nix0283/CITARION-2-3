# How do we calculate Relative Volume and Relative Volume at Time?

**URL:** https://www.tradingview.com/support/solutions/43000635874-how-do-we-calculate-relative-volume-and-relative-volume-at-time/

---

- [ Help Center ](/) - / - / [ How do we calculate Relative Volume and Relative Volume at Time? ](/support/solutions/43000635874-how-do-we-calculate-relative-volume-and-relative-volume-at-time/) # How do we calculate Relative Volume and Relative Volume at Time? **Relative Volume** consists of Volume divided by Average Volume, where Average Volume is a Simple Moving Average, calculated on the basis of the past 10 periods (not taking into account the current volume bar). Relative Volume = volume / average volume. Here's the script that allows you to plot Relative Volume on your chart: Pine Script® // @version= 5 indicator ( "RelVol" ) AvgVol = ta.sma ( volume , 10 ) plot ( volume / AvgVol [ 1 ] , title = "Relative Volume" ) For crypto pairs in the CEX screener, a similar calculation is used, but with a preliminary conversion of all volumes to USD. During the conversion to USD, the volume is multiplied by the price (in USD) for each of the ten bars: Pine Script® // @version= 5 indicator ( "RelVolForCEX" ) volExpr = syminfo.volumetype == "quote" ? volume : ( syminfo.volumetype == "base" ? close * volume : na ) volInUSD = volExpr * request.currency_rate ( syminfo.currency , "USD" , ignore_invalid_currency = true ) avgVol10d = ta.sma ( volInUSD , 10 ) plot ( volInUSD / avgVol10d [ 1 ] , title = 'relative_volume_10d_calc_usd' ) Expand 1 line It takes the last 10 bars and makes an SMA, and then divides the volume by this SMA to calculate Relative Volume. Relative Volume is calculated on any available time interval, the list of which you may see in the opened filter editing dialog: Relative Volume is not calculated during Extended hours, only during regular trading sessions. **Relative Volume at Time** however - instead of taking the last 10 bars - only takes the average volume of a single bar per day (for the last 10 days), whichever bar corresponds to the current time. Screener calculate Relative Volume at Time only for 5 minutes bars. For example, we're calculating Relative Volume at Time on 5 minutes (5m) time frame 17 Oct `22 at 10:30. It takes the average volume of each 10:30 5 minutes bar for the last 10 days and calculates the relative volume based on that data. Bars (candles) and volumes are shown in the table: Bars taken for calculating Relative Volume at a time Volume 03 Oct `22 10:30 854.093K 04 Oct `22 10:30 1.001M 05 Oct `22 10:30 1.321M 06 Oct `22 10:30 623.869K 07 Oct `22 10:30 1.004M 10 Oct `22 10:30 931.324K 11 Oct `22 10:30 1.31M 12 Oct `22 10:30 752.673K 13 Oct `22 10:30 782.339K 14 Oct `22 10:30 1.032M The CEX screener also uses a preliminary conversion of volumes to USD to calculate relative volume at a time. To achieve this, the volume of each bar from the table above is multiplied by the corresponding price (in USD). Previous Previous How are the most popular filters connected with Change calculated? Next Next How is Volatility calculated in the Screener? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43471261258/original/4cQ4UGTFrrsP-M2qERvCeMoX6FZwLthteQ.png?1709625734)

**Описание:** This TradingView screenshot shows the **Stock Screener** interface with a focus on the **Rel Volume** (Relative Volume) filter configuration. Here’s a detailed breakdown:  


### **Top Navigation & Filters**  
- **Header**: “Stock Screener” (dropdown menu) + “Save” (cloud icon, to save the screener).  
- **Filter Buttons**: Horizontal row of dropdown filters (e.g., *Market (US)*, *Index*, *Price*, *Change %*, *Market cap*, *P/E*, *EPS dil growth*, *Div yield %*, *Sector*, *Analyst Rating*, *Perf %*, *Revenue growth*, *PEG*, *ROE*, *Beta*, *Rel Volume*). A “+” button adds new filters.  


### **Tab Bar**  
- Tabs: *Overview* (active), *Performance*, *Balance Sheet*, *More* (dropdown).  
- Icons: Grid (table view), Wave (chart view), Refresh (reload data), Expand (full-screen).  


### **Rel Volume Filter Modal**  
A pop-up modal configures the *Rel Volume* filter:  
- **Label**: “Rel Volume” (filter type).  
- **Timeframe Dropdown**: Open to “1 day” (selected), with options: *1 minute, 5 minutes, 15 minutes, 30 minutes, 1 hour, 2 hours, 4 hours, 1 day, 1 week, 1 month*.  
- **Condition**: “Above” (dropdown, e.g., “Above,” “Below”).  
- **Value**: Input field set to “0” (threshold for relative volume).  
- **Action Buttons**: Blue checkmark (apply filter) + “X” (close modal).  


### **Results Table**  
A table lists stocks matching the filter, with columns:  
- **Symbol/Name**: Ticker (e.g., MSFT, AAPL) + company name (e.g., Microsoft Corporation).  
- **Price**: Current stock price (e.g., 414.9 for MSFT).  
- **Change %**: Daily price change (e.g., +4% for MSFT).  
- **Volume**: Trading volume (e.g., 17.596M for MSFT).  
- **P/E**: Price-to-earnings ratio (e.g., 0.87 for MSFT).  
- **Market Cap**: Company valuation (e.g., 3.083T USD for MSFT).  
- **EPS (TTM)**: Earnings per share (e.g., 37.53 for MSFT).  
- **EPS Dil Growth (YoY)**: Earnings growth (e.g., +22.93% for MSFT).  
- **Div Yield % (TTM)**: Dividend yield (e.g., 0.69% for MSFT).  
- **Sector**: Industry (e.g., Technology Services for MSFT).  


### **Key Purpose**  
The interface lets users **screen stocks** by relative volume (and other metrics) to identify assets with unusual trading activity (e.g., volume above a threshold over a specific timeframe). The modal customizes the *Rel Volume* filter’s timeframe, condition, and value, while the table displays matching results with core financial data.


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

