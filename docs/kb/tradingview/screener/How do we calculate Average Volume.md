# How do we calculate Average Volume

**URL:** https://www.tradingview.com/support/solutions/43000745917-how-do-we-calculate-average-volume/

---

- [ Help Center ](/) - / - / [ How do we calculate Average Volume ](/support/solutions/43000745917-how-do-we-calculate-average-volume/) # How do we calculate Average Volume Avg Vol — the average trading volume over a specified period. Calculated as the SMA of volume over a specified number of days (returns the moving average, that is, the sum of last N values of volume, divided by N. Where N is the number of days). It represents the average number of shares, contracts, or other assets traded during that time. Higher average volume often indicates stronger market activity and liquidity, while lower values may suggest reduced interest. Helpful in identifying trends, market sentiment, and key levels of activity. - Here is a script for classic exchanges that allows you to display average volume for 10, 30, 60, and 90 days on your chart (Average Volume is not calculated during Extended hours, only during regular trading sessions): Pine Script® // @version= 6 // Average volume indicator ( "Average volume" ) AvgVol = ta.sma ( volume , 10 ) plot ( AvgVol , title = 'average_volume_10d_calc' ) plot ( ta.sma ( volume , 30 ) , title = 'average_volume_30d_calc' ) plot ( ta.sma ( volume , 60 ) , title = 'average_volume_60d_calc' ) plot ( ta.sma ( volume , 90 ) , title = 'average_volume_90d_calc' ) Expand 3 lines - Here is a script for crypto exchanges, with automatic USD conversion that allows you to display average volume for 10, 30, 60, and 90 days on your chart (Average Volume is not calculated during Extended hours, only during regular trading sessions): Pine Script® // @version= 6 // Average volume in USD indicator ( "Average volume in USD" ) volExpr = syminfo.volumetype == "quote" ? volume : ( syminfo.volumetype == "base" ? close * volume : na ) volInUSD = volExpr * request.currency_rate ( syminfo.currency , "USD" , ignore_invalid_currency = true ) avgVol10d = ta.sma ( volInUSD , 10 ) plot ( avgVol10d , title = 'average_volume_10d_calc_usd' ) plot ( ta.sma ( volInUSD , 30 ) , title = 'average_volume_30d_calc_usd' ) plot ( ta.sma ( volInUSD , 60 ) , title = 'average_volume_60d_calc_usd' ) plot ( ta.sma ( volInUSD , 90 ) , title = 'average_volume_90d_calc_usd' ) Expand 5 lines Average Volume is calculated on any available time interval, the list of which you may see in the opened filter editing dialog: Previous Previous How do Earnings date filters work in the Screener? Next Next Base and Quote currency Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43541976242/original/YNCqOZSBUl1Ko_HxqMdKWRaSlFP3DmRk4w.png?1740039403)

**Описание:** This TradingView image displays the **Stock Screener** interface for filtering and analyzing US stocks. Here’s a detailed breakdown:  


### **Top Navigation & Filters**  
- **Header**: “Stock Screener” (dropdown menu for selecting screeners) + gear icon (settings) + upward arrow (expand/collapse).  
- **Market Filter**: “Market” dropdown (set to “US”) + “Watchlist,” “Index,” “Price,” “Change %,” “Market cap,” “P/E,” “EPS dil growth,” “Div yield %,” “Sector,” “Analyst Rating,” “Perf %,” “Revenue growth,” “PEG,” “ROE,” “Beta” (all dropdown filters for screening criteria).  
- **Date Filters**: “Recent earnings date,” “Upcoming earnings date,” “Avg Volume” (dropdown with “30 DAYS” selected, plus “Manual setup” and “Remove” options).  


### **Tab Bar**  
Tabs for different views: “Custom” (active), “Overview,” “Performance,” “Dividends,” “More” (dropdown). A refresh icon (reload data) is on the right.  


### **Search & Columns**  
- **Symbol Search**: Search bar with “Symbol” label + “13847” (current input).  
- **Data Columns**:  
  - “Avg Volume 30D” (average volume over 30 days, with a dropdown for time range: 10/30/60/90 days).  
  - “Volume” (current trading volume).  
  - “Rel Volume” (relative volume vs. average).  
  - “Market cap” (with a downward arrow for sorting, plus a “+” to add columns).  


### **Stock List (Table)**  
Rows of stocks with key metrics:  
- **Symbol/Name**: Ticker (e.g., AAPL, NVDA) + company name (e.g., Apple Inc.).  
- **Avg Volume 30D**: Average volume (e.g., 54.64M for AAPL).  
- **Price**: Current price (e.g., 244.87 USD for AAPL).  
- **Change %**: Daily price change (e.g., +1.25% for MSFT, -0.01% for AMZN).  
- **Volume**: Current volume (e.g., 32.2M for NVDA).  
- **Rel Volume**: Relative volume (e.g., 0.75 for AAPL).  
- **Market cap**: Market capitalization (e.g., 3.68T USD for AAPL).  


### **UI Elements & Purpose**  
- **Dropdowns**: Filter stocks by market, metrics (e.g., P/E, sector), or time ranges (e.g., 30 days for volume).  
- **Tabs**: Switch between “Custom” (current view), “Overview,” “Performance,” etc.  
- **Search Bar**: Find specific stocks by symbol.  
- **Column Headers**: Sort or add/remove columns (e.g., “Market cap” has a sort arrow; “+” adds new columns).  
- **Stock Rows**: Display real-time data (price, volume, market cap) for filtered stocks.  


This interface helps users screen stocks by criteria (e.g., volume, market cap, sector) and analyze their performance, with interactive filters to refine results.


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

