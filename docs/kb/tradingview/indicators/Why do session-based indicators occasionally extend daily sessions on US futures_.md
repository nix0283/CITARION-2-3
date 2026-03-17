# Why do session-based indicators occasionally extend daily sessions on US futures?

**URL:** https://www.tradingview.com/support/solutions/43000746362-why-do-session-based-indicators-occasionally-extend-daily-sessions-on-us-futures/

---

- [ Help Center ](/) - / - / [ Why do session-based indicators occasionally extend daily session… ](/support/solutions/43000746362-why-do-session-based-indicators-occasionally-extend-daily-sessions-on-us-futures/) # Why do session-based indicators occasionally extend daily sessions on US futures? Some indicators on TradingView calculate on a specific time period ( session ) and reset at the end of each period. For example, the[ ](https://www.tradingview.com/support/solutions/43000703072-session-volume-profile/)[Session Volume Profile](https://www.tradingview.com/support/solutions/43000703072-session-volume-profile/) and[ ](https://www.tradingview.com/support/solutions/43000719900-session-time-price-opportunity-stpo-indicator/)[Session Time Price Opportunity](https://www.tradingview.com/support/solutions/43000719900-session-time-price-opportunity-stpo-indicator/) indicators accumulate the data within a daily trading session (a trading day from its market open to close) to produce a session analysis, which then resets once a new daily session starts. Other indicators like[ ](https://www.tradingview.com/support/solutions/43000521824-pivot-points-standard/)[Pivot Points Standard](https://www.tradingview.com/support/solutions/43000521824-pivot-points-standard/),[ ](https://www.tradingview.com/support/solutions/43000502018-volume-weighted-average-price-vwap/)[Volume Weighted Average Price](https://www.tradingview.com/support/solutions/43000502018-volume-weighted-average-price-vwap/), and periodic[ ](https://www.tradingview.com/support/solutions/43000713306-time-price-opportunity-tpo-indicator/)[Time Price Opportunity](https://www.tradingview.com/support/solutions/43000713306-time-price-opportunity-tpo-indicator/) allow users to define a custom period of days, weeks, or months for the indicator to analyze, starting from a 1 day session or longer. Occasionally, these indicators can extend daily sessions on intraday charts to include several intraday trading sessions in one long "daily" session. For example, in the screenshot below, the [Session Volume Profile](https://www.tradingview.com/support/solutions/43000703072-session-volume-profile/) indicator extends a daily session that starts on January 19 until January 21, even though there's a session break in between on January 20. This behavior is **not** a bug in the indicator, but rather an intentional adjustment by the exchange that sets the instrument's trading sessions schedule. Why this happens First, it's important to distinguish between a trading session , trading day , and calendar day . For instance, for symbols with overnight sessions, the "daily" trading session spans two calendar days, and starts on the calendar day before its associated trading day. Therefore, a daily session for the "ES1!" symbol that belongs to a "Monday" trading day starts on Sunday at 17:00 CT (Central Time) and ends on Monday at 16:00 CT. Session-based indicators reset their calculations once per trading day , which can often correspond to once per calendar day, given the daily timeframe. However, occasionally, an exchange might alter the length of an instrument's daily trading session by reducing or extending it, which can vary the number of calendar days within the session. Consequently, session-based indicators might not reset their calculations daily despite the calendar days progressing. For US-based futures under the[ ](https://www.cmegroup.com/markets/products.html)[CME Group](https://www.cmegroup.com/markets/products.html) (CBOT, CME, NYMEX, and COMEX exchanges), the exchanges observe US federal holidays, shortening the trading sessions on those days. The CME Group lists their annual holiday trading hours[ ](https://www.cmegroup.com/trading-hours.html)[here](https://www.cmegroup.com/trading-hours.html), listing the different session changes for each holiday and commodity. The exchanges often also combine the shortened sessions into one extended trading day, which results in a single "daily" session that can include intraday trades from up to three calendar days. For example, the[ ](https://www.cmegroup.com/trading-hours.html#tradeDate=2025-01-20)[CME Group holiday calendar](https://www.cmegroup.com/trading-hours.html#tradeDate=2025-01-20) shows that the exchange observes Dr. Martin Luther King, Jr. Day with shortened trading hours on Monday, January 20, 2025. For equity futures, the exchange announced that the intraday trades from Sunday, January 19, at 17:00 CT, to Tuesday, January 21, at 16:00 CT, will all belong to an extended trading session for Tuesday: We can see the modified holiday session when we add the[ ](https://www.tradingview.com/support/solutions/43000703072-session-volume-profile/)[Session Volume Profile](https://www.tradingview.com/support/solutions/43000703072-session-volume-profile/) indicator on the "ES1!" symbol's intraday chart. Monday's trading session (typically Sun 17:00–Mon 16:00 CT) is now shortened for the holiday, ending at 11:00 CT, and is combined with Tuesday's trading session (Mon 17:00–Tue 16:00 CT) as one long "daily" session. Although the indicator appears as though it misses a session reset here, it is in fact correctly representing the trading session dates set by the exchange: We can also verify that the sessions defined by the indicator match the daily data coming from the exchange by looking at the symbol's daily chart. The daily bar for Friday, January 17 (the session before Sunday) is followed immediately by the daily bar for Tuesday, January 21, which covers all the intraday price activity from Sunday to Tuesday (see our intraday labels all appearing on this candle): Bearing in mind the distinction between trading days and calendar days, it's easier to see that when a session-based indicator combines multiple calendar days into a single daily trading session, for example on a US holiday, it's not an error in the indicator. Rather, it's an intended adjustment from the exchange assigning the trading dates for its "daily" data. Our session-based indicators simply provide the daily session data as the exchanges provide it. An additional consideration is that a shortened trading session often has significantly less trading volume than a typical daily session, so using the incomplete session as a separate "daily" session would inaccurately skew the interpreted daily volume trends. Instead, having an extended session maintains the session volume reasonably within the typical daily range. If users have access to a session-based indicator's source code, they can use a "1440" timeframe in the script to express a fixed 24-hour session (1440 minutes) instead of using a daily "1D" session. The "1440" timeframe builds its sessions from the instrument's intraday data, rather than relying on the daily sessions defined by the exchange. Therefore, it divides the data at fixed intervals independent of the exchange's session changes and resets on each calendar day. Previous Previous Daily MA is not plotted correctly or does not display values on intraday chart Next Next How to apply an older version of an indicator to the chart Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43542727489/original/E8hIjPdmoUNWC_5SmpOgyaiyfo_P-dsFPA.png?1740423414)

**Описание:** This TradingView chart displays the **ES 2420 E-mini Futures (1-hour timeframe, CME)** with the following key elements:  


### 1. **Header & Market Data**  
- **Title**: “ES 2420 E-mini Futures · 1h · CME” (instrument, timeframe, exchange).  
- **Price Summary**: “O6,085.75 H6,088.25 L6,083.75 C6,085.50 −0.25 (−0.00%)” (Open, High, Low, Close, change, % change).  
- **Volume**: “SVI All Up/Down 82.74K 30.2K 112.94K” (volume metrics: up/down volume, total).  


### 2. **Chart Area**  
- **Candlestick Chart**: Green (up) and red (down) candles show price action over 1-hour intervals.  
- **Volume Profile (VP)**: Light blue (up volume) and pink (down volume) bars at the top of the chart, visualizing volume distribution by price.  
- **Horizontal Lines**: Black lines mark key support/resistance levels.  
- **Vertical Dashed Lines**: Blue dashed lines mark time intervals (e.g., “Sun 19 Jan ’25 17:00”, “Mon 20 Jan ’25 17:00”, “Tue 21 Jan ’25 17:00”).  


### 3. **Right-Side Price Axis**  
- **Price Levels**: Numerical values (e.g., 6,160.00, 6,140.00) show price scale.  
- **Current Price Box**: “6,116.25” (black, current price) and “6,116.00” (red, bid/ask) with a timestamp “40:42” (time since last update).  


### 4. **Bottom Toolbar**  
- **Timeframe Buttons**: “1D 5D 1M 3M 6M YTD 1Y 5Y All” (switch chart periods).  
- **Calendar Icon**: Opens date/time selection.  
- **Timestamp**: “13:19:18 UTC-6” (current time).  
- **Exchange/Settings**: “ETH” (exchange) and “B-ADJ” (data adjustment) with a settings icon.  


### 5. **Left-Side UI**  
- **Expand Icon**: Upward arrow (collapsible panel, likely for indicators/overlays).  
- **TradingView Pro Logo**: “TV PRO” (subscription badge).  


### Purpose  
The chart analyzes **ES (S&P 500 E-mini) futures** over a 1-hour timeframe, combining candlestick price action, volume profile, and time-based analysis to identify trends, support/resistance, and volume dynamics.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43542728312/original/q8zX7QSNcEl1u887DqNKWPJk-d_s-4yXEg.png?1740423681)

**Описание:** This TradingView image displays a **market trading schedule interface** from ICE Group, structured as follows:  

### Top Navigation Bar  
- **ICE Group** (logo, left)  
- Menu items: *MARKETS, DATA, SERVICES, INSIGHTS, EDUCATION* (center)  
- Icons: *Search (magnifying glass), User (person), LOG IN* (right, with a blue border)  


### Filters Section  
- Header: *FILTERS* (white text on dark blue background)  
- Dropdown: *“Dr. Martin Luther King, Jr.”* (gray dropdown, likely for holiday/observed day selection)  
- Button: *“Download data”* (blue text with a lock icon, top-right)  


### Trading Schedule Table  
A grid with columns for **Product Name**, **Sunday 19 Jan 2025**, **Monday 20 Jan 2025**, and **Tuesday 21 Jan 2025**. Rows represent product categories:  

1. **Interest Rates** (expandable, arrow icon)  
   - *Sunday 19 Jan*: Trade date *Tue 21 Jan*; sessions: *16:00 PREOPEN* (blue dot), *17:00 OPEN* (green dot)  
   - *Monday 20 Jan*: Trade date *Tue 21 Jan*; sessions: *12:00 PREOPEN* (blue), *17:00 OPEN* (green)  
   - *Tuesday 21 Jan*: Trade date *Tue 21 Jan* (16:00 CLOSED, red dot); *Wed 22 Jan* (16:45 PREOPEN, blue; 17:00 OPEN, green)  

2. **Equities** (expandable, arrow icon)  
   - *Sunday 19 Jan*: Trade date *Tue 21 Jan*; sessions: *16:00 PREOPEN* (blue), *17:00 OPEN* (green)  
   - *Monday 20 Jan*: Trade date *Tue 21 Jan*; sessions: *12:00 PREOPEN* (blue), *17:00 OPEN* (green)  
   - *Tuesday 21 Jan*: Trade date *Tue 21 Jan* (16:00 CLOSED, red); *Wed 22 Jan* (16:45 PREOPEN, blue; 17:00 OPEN, green)  


### UI Element Purposes  
- **Colors**: Blue = pre-open, Green = open, Red = closed (status indicators).  
- **Trade Dates**: Show when trades execute (e.g., *Tue 21 Jan* for Sunday/Monday sessions).  
- **Dropdown/Expandable Rows**: Filter by holidays or view sub-products.  
- **Download Data**: Export schedule information.  

The interface organizes trading hours for financial products (Interest Rates, Equities) across multiple days, highlighting session statuses (pre-open, open, closed) and trade execution dates.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43542728482/original/5IbZppG8qTumT92hJMUXPGTCmLKUf1nO5w.png?1740423738)

**Описание:** This TradingView chart displays the **S&P 500 E-mini Futures (1-hour timeframe, CME)** with the following key elements:  


### 1. **Header & Instrument Info**  
- **Title**: `S&P 500 E-mini Futures · 1h · CME` (identifies the asset, timeframe, and exchange).  
- **Price Data**: `O6,085.75 H6,088.25 L6,083.75 C6,086.75 +1.00 (+0.02%)` shows the current candle’s open, high, low, close, and percentage change.  
- **SVP All Up/Down**: `82.74K 30.2K 112.94K` (likely volume metrics for up/down ticks, though context varies).  


### 2. **Chart Area**  
- **Candlestick Chart**: Green/red candles represent price action (green = close > open; red = close < open).  
- **Volume Profile (VP)**: Colored bars (blue = buying volume, pink = selling volume) overlay the chart, showing volume distribution at different price levels.  
- **Horizontal Lines**: Black lines mark key support/resistance levels.  
- **Time Markers**:  
  - Orange: `Mon 20 Jan ’25 11:00` (highlights a specific time).  
  - Green: `Tue 21 Jan ’25 15:00` (another time marker).  
  - Blue: `Sun 19 Jan ’25 17:00`, `Mon 20 Jan ’25 17:00`, `Tue 21 Jan ’25 17:00` (daily time boundaries).  


### 3. **Right-Side Price Scale & Data**  
- **Price Axis**: Vertical scale (5,960.00 to 6,160.00) for price levels.  
- **Current Price Box**: `6,086.75 35:47` (current price + time remaining in the candle).  
- **Top Price Box**: `6,116.25 6,116.00` (likely a recent high/low or target).  


### 4. **Bottom Toolbar**  
- **Timeframe Buttons**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (switches chart timeframe).  
- **Calendar Icon**: For date selection.  
- **Timestamp**: `13:24:12 UTC-6` (current time).  
- **Exchange/Settings**: `ETH` (exchange) and `B-ADJ` (likely a data adjustment setting).  


### 5. **UI Elements**  
- **Expand Arrow**: Top-left (collapses/expand additional info).  
- **TradingView Pro Logo**: Bottom-left (indicates a Pro subscription).  
- **Settings Icon**: Bottom-right (chart configuration).  


This layout provides a comprehensive view of price action, volume, and time-based analysis for the S&P 500 E-mini Futures.


