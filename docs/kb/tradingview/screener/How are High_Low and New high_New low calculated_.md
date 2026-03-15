# How are High/Low and New high/New low calculated?

**URL:** https://www.tradingview.com/support/solutions/43000753745-how-are-high-low-and-new-high-new-low-calculated/

---

- [ Help Center ](/) - / - / [ How are High/Low and New high/New low calculated? ](/support/solutions/43000753745-how-are-high-low-and-new-high-new-low-calculated/) # How are High/Low and New high/New low calculated? **High/Low** This is the highest/lowest value of the symbol's price for a certain period of time. These metrics have 2 types of settings in the screener: **High/Low Interval** **Interval** - High/Low is the highest/lowest value of the symbol's price in the selected timeframe. You can check this data by opening the Superchats and looking at the bar values: Let's take a look at how it works on the High 1-month as an example. First of all, we imagine the bars on the chart with the selected 1-month interval. Each candle (bar) represents aggregated data for a month of the price change history, expressed in 5 numbers: the open price of the interval, the close price, the low price for the period, the high price for the period, and the total trading volume. The bar in the selected interval covers a **calendar month**, e.g., from 01.01 to 31.01, from 01.02 to 28.02, from 01.03 to 31.03, etc. In the screener, the serial data is exactly the same as on the chart (with the same selected interval). As a result, when selecting the High 1-month in the screener, the value is equal to the high price of the monthly bar from the chart. If today is March 4, then the range of the monthly bar is from March 1 to March 4, so the High 1 month is the high price from March 1 to March 4. **High/Low ****Date range** **Date range** - the High/Low value of the symbol for the last selected period. For example, the High 1M is the highest value of the daily bar price for the **last 30 days**. Let's assume that today is March 4, then the screener looks at the high prices of all daily bars over the past 30 days, i.e., from February 2 to March 4, and finds the highest value among them. **New high/New low** It allows you to find symbols that have a high/low price for a certain period of time in the last trading session. For example, the New High 1M filter will help you find symbols that have updated their monthly highs in the current session (whose symbol price today was at least once higher than all asset prices over the past month). **How it works**: The screener compares the high of the last daily bar with the highest high of the month. If the High of the current daily bar is greater than or equal to the high value for 30 days, then the symbol meets the filter condition and is included in the results. All similar filters in the set work the same way: **New High** **** ** ** New High 1 Month - find the symbols whose high price for the last month occurred in the last trading session; New High 3 Month - find the symbols whose high price for the last 3 months occurred in the last trading session; New High 6 Month - find the symbols whose high price for the last 6 months occurred in the last trading session; New High 52 Month - find the symbols whose high price for the last 52 months occurred in the last trading session; New High All Time - find the symbols whose price has never been as high as in the last trading session. **New Low** **** ** ** New Low 1 Month - find the symbols whose low price for the last month occurred in the last trading session; New Low 3 Month - find the symbols whose low price for the last 3 months occurred in the last trading session; New Low 6 Month - find the symbols whose low price for the last 6 months occurred in the last trading session; New Low 52 Month - find the symbols whose low price for the last 52 months occurred in the last trading session; New Low All Time - find the symbols whose price has never been as low as in the last trading session. Previous Previous Stock exchange’s markets Next Next Sharia-compliant securities Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43551864895/original/svij3CA3k1zny98NC1oUipOmwXSQztVE2Q.png?1744373515)

**Описание:** This is a **TradingView Stock Screener** interface displaying a list of US stocks with real-time market data. Here’s a detailed breakdown:  


### **Top Navigation & Header**  
- **TradingView Logo**: Left-aligned, with a search bar (“Search (⌘K)”) and navigation tabs: *Products* (active), *Community*, *Markets*, *Brokers*, *More*.  
- **User Profile Icon**: Top-right (black circle with “TV”).  


### **Stock Screener Controls**  
- **“Stock Screener” Dropdown**: Filter for screening criteria (e.g., market, watchlist).  
- **Filter Buttons**:  
  - *Market*: US (flag + dropdown).  
  - *Watchlist*, *Index*, *Market cap*, *Upcoming earnings date*, *New high*, *New low*: All dropdown menus.  
  - *High*: Active dropdown (showing “HIGH 1 DAY” and time intervals).  
  - *+*: Add filter.  
  - *Reset all*: Clear all filters.  


### **Tab Navigation (Below Filters)**  
Tabs for different data views: *Overview* (active), *Performance*, *Extended Hours*, *Valuation*, *Dividends*, *Profitability*, *Income Statement*.  


### **Table Columns (Data Headers)**  
- *Symbol*: Stock ticker (e.g., AAPL).  
- *Price*: Current price (USD).  
- *Change %*: Daily price change (green = up, red = down).  
- *Volume*: Trading volume (e.g., 65.3M).  
- *Rel Volume*: Relative volume vs. average.  
- *Market cap*: Market capitalization (e.g., 3.34T USD).  
- *P/E*: Price-to-earnings ratio.  
- *High*: Current day’s high (with a dropdown for time intervals: 1 min, 5 min, 15 min, 30 min, 1 hr, 2 hrs, 4 hrs, 1 day, 1 week, 1 month, 3 months, 6 months, 52 weeks).  


### **Stock Data Rows**  
Each row shows a stock with:  
- **Icon**: Company logo (e.g., Apple’s apple).  
- **Ticker & Name**: E.g., “AAPL | Apple Inc.”.  
- **Price/Change/Volume**: E.g., 222.13 USD, +1.94%, 65.3M.  
- **Market Cap/P/E/High**: E.g., 3.34T USD, 35.31, 6.29.  


### **Dropdown Menu (Active: “High”)**  
- **Sections**:  
  - *HIGH 1 DAY*: Header.  
  - *INTERVAL*: Time options (1 min to 52 weeks).  
  - *DATE RANGE*: Timeframe options (1 month to 52 weeks).  


### **Purpose**  
This screen lets users **screen stocks** by criteria (market, cap, earnings, etc.) and view real-time data (price, volume, P/E) to analyze performance. The “High” dropdown adjusts the time interval for the “High” column (e.g., 1-day high vs. 1-week high).


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43551865019/original/LctYaIAfUqmAnBonU7raAY9yROaSf1PWlg.png?1744373555)

**Описание:** This TradingView image displays a **candlestick chart** (a standard financial chart type) with labeled components explaining candlestick anatomy. Here’s a detailed breakdown:  


### **UI Elements & Chart Components**  
1. **Candlesticks**:  
   - Two candlesticks are visible:  
     - **Green candlestick** (left): Represents a period where the *close price* exceeded the *open price* (bullish).  
     - **Red candlestick** (right): Represents a period where the *close price* was below the *open price* (bearish).  
   - Each candlestick has a “body” (thick vertical bar) and “wicks” (thin lines extending from the body).  


2. **Labeled Price Levels (Dashed Blue Lines)**:  
   - **High**: Topmost dashed line, marking the highest price reached during the candlestick’s time period.  
   - **Open**: Dashed line indicating the price at the start of the period (top of the body for green candles, bottom for red candles).  
   - **Close**: Dashed line indicating the price at the end of the period (bottom of the body for green candles, top for red candles).  
   - **Low**: Bottommost dashed line, marking the lowest price reached during the period.  


### **Purpose of Elements**  
- **Candlesticks**: Visualize price action (open, high, low, close) over a specific time interval (e.g., 1 minute, 1 hour). Green = upward price movement; red = downward movement.  
- **Dashed Lines**: Clarify the four key price points of a candlestick, helping traders analyze market behavior (e.g., volatility, trend direction).  


This chart is a foundational tool for technical analysis, enabling traders to interpret price patterns and make informed decisions.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43551863672/original/SrHbxXESSBG98_5Cf0u16trAkkV32NjuuA.png?1744373162)

**Описание:** The image displays a **TradingView** interface split into two panels: a **chart view** (left) and a **stock screener** (right).  


### **Left Panel: AT&T Inc. (T) Chart**  
- **Header**: Shows the ticker `AT&T Inc. · 1M · NYSE` (1-month timeframe, NYSE exchange).  
- **Price Data**:  
  - `O27.27 H28.56 L24.89 C28.28 +0.87 (+3.17%)` (Open, High, Low, Close, change, % change).  
  - `SELL` (28.37) and `BUY` (28.39) buttons (order entry).  
  - `Pre` (28.37) and `T` (28.28) (pre-market/real-time prices).  
- **Chart**: Candlestick chart (1-month timeframe) with a red arrow labeled \


