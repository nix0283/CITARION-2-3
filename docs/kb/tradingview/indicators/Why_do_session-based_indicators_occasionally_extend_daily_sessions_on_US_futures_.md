# Why do session-based indicators occasionally extend daily sessions on US futures?

**URL:** https://www.tradingview.com/support/solutions/43000746362-why-do-session-based-indicators-occasionally-extend-daily-sessions-on-us-futures/

---

- [ Help Center ](/)
- / 
- / [ Why do session-based indicators occasionally extend daily session… ](/support/solutions/43000746362-why-do-session-based-indicators-occasionally-extend-daily-sessions-on-us-futures/)

# Why do session-based indicators occasionally extend daily sessions on US futures? 
 Some indicators on TradingView calculate on a specific time period (*session*) and reset at the end of each period. For example, the[ ](https://www.tradingview.com/support/solutions/43000703072-session-volume-profile/)[Session Volume Profile](https://www.tradingview.com/support/solutions/43000703072-session-volume-profile/) and[ ](https://www.tradingview.com/support/solutions/43000719900-session-time-price-opportunity-stpo-indicator/)[Session Time Price Opportunity](https://www.tradingview.com/support/solutions/43000719900-session-time-price-opportunity-stpo-indicator/) indicators accumulate the data within a *daily trading session* (a trading day from its market open to close) to produce a session analysis, which then resets once a new daily session starts. Other indicators like[ ](https://www.tradingview.com/support/solutions/43000521824-pivot-points-standard/)[Pivot Points Standard](https://www.tradingview.com/support/solutions/43000521824-pivot-points-standard/),[ ](https://www.tradingview.com/support/solutions/43000502018-volume-weighted-average-price-vwap/)[Volume Weighted Average Price](https://www.tradingview.com/support/solutions/43000502018-volume-weighted-average-price-vwap/), and periodic[ ](https://www.tradingview.com/support/solutions/43000713306-time-price-opportunity-tpo-indicator/)[Time Price Opportunity](https://www.tradingview.com/support/solutions/43000713306-time-price-opportunity-tpo-indicator/) allow users to define a custom period of days, weeks, or months for the indicator to analyze, starting from a 1 day session or longer.

Occasionally, these indicators can extend daily sessions on intraday charts to include several intraday trading sessions in one long "daily" session. For example, in the screenshot below, the [Session Volume Profile](https://www.tradingview.com/support/solutions/43000703072-session-volume-profile/) indicator extends a daily session that starts on January 19 until January 21, even though there's a session break in between on January 20. This behavior is **not** a bug in the indicator, but rather an *intentional* adjustment by the exchange that sets the instrument's trading sessions schedule.

#### Why this happens

First, it's important to distinguish between a *trading session*, *trading day*, and *calendar day*. For instance, for symbols with overnight sessions, the "daily" trading session spans two calendar days, and starts on the calendar day *before* its associated trading day. Therefore, a daily session for the "ES1!" symbol that belongs to a "Monday" trading day starts on Sunday at 17:00 CT (Central Time) and ends on Monday at 16:00 CT.

Session-based indicators reset their calculations once per *trading day*, which can often correspond to once per calendar day, given the daily timeframe. However, occasionally, an exchange might alter the length of an instrument's daily trading session by reducing or extending it, which can vary the number of calendar days within the session. Consequently, session-based indicators might not reset their calculations daily despite the calendar days progressing.

For US-based futures under the[ ](https://www.cmegroup.com/markets/products.html)[CME Group](https://www.cmegroup.com/markets/products.html) (CBOT, CME, NYMEX, and COMEX exchanges), the exchanges observe US federal holidays, shortening the trading sessions on those days. The CME Group lists their annual holiday trading hours[ ](https://www.cmegroup.com/trading-hours.html)[here](https://www.cmegroup.com/trading-hours.html), listing the different session changes for each holiday and commodity. The exchanges often also combine the shortened sessions into one extended trading day, which results in a single "daily" session that can include intraday trades from up to three calendar days.

For example, the[ ](https://www.cmegroup.com/trading-hours.html#tradeDate=2025-01-20)[CME Group holiday calendar](https://www.cmegroup.com/trading-hours.html#tradeDate=2025-01-20) shows that the exchange observes Dr. Martin Luther King, Jr. Day with shortened trading hours on Monday, January 20, 2025. For equity futures, the exchange announced that the intraday trades from Sunday, January 19, at 17:00 CT, to Tuesday, January 21, at 16:00 CT, will all belong to an extended trading session for Tuesday:

We can see the modified holiday session when we add the[ ](https://www.tradingview.com/support/solutions/43000703072-session-volume-profile/)[Session Volume Profile](https://www.tradingview.com/support/solutions/43000703072-session-volume-profile/) indicator on the "ES1!" symbol's intraday chart. Monday's trading session (typically Sun 17:00–Mon 16:00 CT) is now shortened for the holiday, ending at 11:00 CT, and is combined with Tuesday's trading session (Mon 17:00–Tue 16:00 CT) as one long "daily" session. Although the indicator appears as though it misses a session reset here, it is in fact correctly representing the trading session dates set by the exchange:

We can also verify that the sessions defined by the indicator match the daily data coming from the exchange by looking at the symbol's daily chart. The daily bar for Friday, January 17 (the session before Sunday) is followed immediately by the daily bar for Tuesday, January 21, which covers all the intraday price activity from Sunday to Tuesday (see our intraday labels all appearing on this candle):

Bearing in mind the distinction between trading days and calendar days, it's easier to see that when a session-based indicator combines multiple calendar days into a single daily trading session, for example on a US holiday, it's not an error in the indicator. Rather, it's an intended adjustment from the exchange assigning the trading dates for its "daily" data. Our session-based indicators simply provide the daily session data as the exchanges provide it.

An additional consideration is that a shortened trading session often has significantly less trading volume than a typical daily session, so using the incomplete session as a separate "daily" session would inaccurately skew the interpreted daily volume trends. Instead, having an extended session maintains the session volume reasonably within the typical daily range.

If users have access to a session-based indicator's source code, they can use a "1440" timeframe in the script to express a fixed 24-hour session (1440 minutes) instead of using a daily "1D" session. The "1440" timeframe builds its sessions from the instrument's intraday data, rather than relying on the daily sessions defined by the exchange. Therefore, it divides the data at fixed intervals independent of the exchange's session changes and resets on each calendar day.
 Previous Previous Daily MA is not plotted correctly or does not display values on intraday chart Next Next How to apply an older version of an indicator to the chart Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43542727489/original/E8hIjPdmoUNWC_5SmpOgyaiyfo_P-dsFPA.png?1740423414

**Описание:**

This image displays a **TradingView chart** for the **S&P 500 E-mini Futures (CME)** on a **1-hour (1h) timeframe**, showing price action, volume, and key technical elements. Below is a detailed breakdown of the interface:


### **1. Header & Symbol Information**  
- **Title**: `S&P 500 E-mini Futures · 1h · CME`  
  - Identifies the instrument (S&P 500 E-mini Futures) and exchange (CME), with the timeframe (1-hour).  
- **Price Data**: `O6,085.75 H6,088.25 L6,083.75 C6,085.50 -0.25 (-0.00%)`  
  - `O` (Open): 6,085.75 (first price of the current candle).  
  - `H` (High): 6,088.25 (highest price in the current candle).  
  - `L` (Low): 6,083.75 (lowest price in the current candle).  
  - `C` (Close): 6,085.50 (last price of the current candle).  
  - Change: `-0.25 (-0.00%)` (price change, showing no net movement).  


### **2. Volume Indicator (SVI All Up/Down)**  
- `SVI All Up/Down 82.74K 30.2K 112.94K`  
  - **SVI**: \

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43542728312/original/q8zX7QSNcEl1u887DqNKWPJk-d_s-4yXEg.png?1740423681

**Описание:**

This image shows a **TradingView interface** (specifically from ICE Group) displaying a **market trading schedule** with holiday filters applied. Here’s a detailed breakdown:


### **1. Top Navigation Bar**
- **Logo**: \

---

### Изображение 3

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43542728482/original/5IbZppG8qTumT92hJMUXPGTCmLKUf1nO5w.png?1740423738

**Описание:**

This image shows a **TradingView chart** displaying the **S&P 500 E-mini Futures (1-hour timeframe, CME)**. Below is a detailed breakdown of all UI elements, their purposes, and what the chart conveys:  


### 1. **Header & Instrument Info**  
- **Title**: *“S&P 500 E-mini Futures · 1h · CME”*  
  - Identifies the instrument (S&P 500 E-mini Futures), timeframe (1-hour), and exchange (CME).  
- **Price Data**: *“O6,085.75 H6,088.25 L6,083.75 C6,086.75 +1.00 (+0.02%)”*  
  - **O** (Open): 6,085.75  
  - **H** (High): 6,088.25  
  - **L** (Low): 6,083.75  
  - **C** (Close): 6,086.75  
  - Price change: +1.00 (+0.02%) (current candle’s gain).  


### 2. **Market Breadth (SVP All Up/Down)**  
- *“SVP All Up/Down 82.74K 30.2K 112.94K”*  
  - Tracks market breadth (up/down volume):  
    - 82.74K: Volume of stocks/futures *up*.  
    - 30.2K: Volume of stocks/futures *down*.  
    - 112.94K: Total volume.  
  - Helps gauge market sentiment (e.g., if up volume > down, bullish bias).  


### 3. **Chart Area (Candlestick Chart)**  
- **Candlesticks**: Green (bullish, close > open) and red (bearish, close < open) bars show price action over 1-hour intervals.  
- **Volume Profile (VP)**: Colored bars (blue = buying, pink = selling) behind the candlesticks, showing volume at different price levels.  
- **Horizontal Lines**: Black lines mark key support/resistance levels (e.g., a major resistance near 6,116.25).  
- **Time Markers**:  
  - *Orange*: *“Mon 20 Jan ’25 11:00”* (labels a specific time on the chart).  
  - *Green*: *“Tue 21 Jan ’25 15:00”* (another time marker).  
  - *Blue*: *“Sun 19 Jan ’25 17:00”*, *“Mon 20 Jan ’25 17:00”*, *“Tue 21 Jan ’25 17:00”* (daily time markers at 17:00 UTC).  


### 4. **Right-Side Price Scale & Info**  
- **Price Levels**: Vertical axis (right) shows price levels (e.g., 5,960.00 to 6,160.00).  
- **Current Price Box**: *“6,086.75 35:47”*  
  - Current price: 6,086.75.  
  - Time remaining in the current candle: 35 minutes 47 seconds.  
- **Top-Right Price**: *“6,116.25”* (likely a key level, e.g., resistance) with *“6,116.00”* below it (maybe a bid/ask or prior level).  


### 5. **Bottom Toolbar (Timeframe & Settings)**  
- **Timeframe Buttons**: *“1D 5D 1M 3M 6M YTD 1Y 5Y All”*  
  - Switches the chart’s timeframe (e.g., 1D = daily, 1M = monthly).  
- **Calendar Icon**: Opens a date/time selector to jump to specific periods.  
- **Time Stamp**: *“13:24:12 UTC-6”* (current server time).  
- **Symbols**: *“ETH”* (likely the exchange/timezone) and *“B-ADJ”* (maybe a data adjustment setting).  


### 6. **Additional UI Elements**  
- **“TV PRO” Logo**: Bottom-left, indicates a TradingView Pro subscription.  
- **Expand/Collapse Arrow**: Top-left (small upward arrow) toggles a sidebar (e.g., for additional indicators).  
- **Settings Icon**: Bottom-right (gear icon) opens chart settings (e.g., indicators, styles).  


### What the Chart Shows  
The 1-hour candlestick chart tracks S&P 500 E-mini Futures price action, with volume profile (VP) highlighting buying/selling pressure at different prices. Key time markers (e.g., Mon 20 Jan 11:00, Tue 21 Jan 15:00) and horizontal lines (support/resistance) help traders analyze trends, reversals, or breakouts. The market breadth (SVP) adds context on overall market sentiment.  


This interface is designed for technical analysis, enabling traders to visualize price, volume, and time-based patterns to make informed decisions.

---

### Изображение 4

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43542728698/original/yDuDhW-GeBvmAFU8WzdCl12ECr79YbNT0w.png?1740423802

**Описание:**

This image displays a **TradingView chart** for the **S&P 500 E-mini Futures (1D, CME)**, showing a daily candlestick chart with volume profile (VP) and time-based annotations. Here’s a detailed breakdown of all elements:  


### 1. **Header & Instrument Info**  
- **Title**: *“S&P 500 E-mini Futures · 1D · CME”*  
  - Identifies the instrument (S&P 500 E-mini Futures), time frame (1 Day), and exchange (CME).  
- **Price Data**: *“O6,090.75 H6,098.00 L6,020.75 C6,070.25 −22.00 (−0.36%)”*  
  - **O**: Open price (6,090.75)  
  - **H**: High price (6,098.00)  
  - **L**: Low price (6,020.75)  
  - **C**: Close price (6,070.25)  
  - **−22.00 (−0.36%)**: Daily change (down 22 points, -0.36%).  


### 2. **Volume Profile (VP) & Market Breadth**  
- **“VP All Up/Down 26.28K 31.16K 57.43K”**:  
  - Volume Profile (VP) data:  
    - *26.28K*: Volume of stocks/futures “up” (or bullish volume).  
    - *31.16K*: Volume of stocks/futures “down” (or bearish volume).  
    - *57.43K*: Total volume.  
- **Up/Down Arrow Button**: A small upward arrow (likely a toggle to expand/collapse the VP panel).  


### 3. **Chart Area (Candlesticks + Volume Profile)**  
- **Candlesticks**: Green (bullish, close > open) and red (bearish, close < open) bars represent daily price action.  
- **Volume Profile (VP) Bars**: Light blue (bullish volume) and pink (bearish volume) bars show volume distribution at different price levels.  
- **Time Annotations (Colored Labels)**:  
  - *Green*: *“Tue 21 Jan ’25 15:00”* (Tuesday, 3 PM) – Marks a specific time on the chart.  
  - *Orange*: *“Mon 20 Jan ’25 11:00”* (Monday, 11 AM) – Another time marker.  
  - *Blue*: *“Tue 21 Jan ’25 17:00”*, *“Mon 20 Jan ’25 17:00”*, *“Sun 19 Jan ’25 17:00”* – Evening time markers (17:00 = 5 PM).  


### 4. **Right-Side Price Scale & Current Price Box**  
- **Price Axis (Y-Axis)**: Ranges from ~5,900 to 6,200, showing price levels.  
- **Current Price Box** (top-right):  
  - *“6,145.75”* (black, likely the last traded price or a key level).  
  - *“6,133.25”* (red, possibly the bid/ask or another price metric).  
  - *“6,070.25”* (red, the daily close price).  
  - *“02:31:57”*: A timer (e.g., time until the next market event, like the close of the trading day).  


### 5. **Bottom Time Axis (X-Axis)**  
- Dates: *14, 15, 16, Fri 17 Jan ’25, 21, 22, 23, 24* (representing daily bars, with “Fri 17 Jan ’25” highlighted as a Friday).  


### 6. **Time Frame Selector (Bottom-Left)**  
- Buttons: *“1D” (selected), 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All*  
  - Switches the chart’s time frame (e.g., 1 Day, 5 Days, 1 Month, etc.).  


### 7. **Additional UI Elements**  
- **“TV PRO” Logo**: Bottom-left, indicates a TradingView Pro (paid) subscription.  
- **Calendar Icon**: Next to the time frame selector (likely for date selection).  
- **Time Stamp**: *“13:28:02 UTC-6”* (current time in UTC-6 timezone).  
- **“B-ADJ” & “SET”**: Bottom-right, likely toggles for “Bid-Ask Adjustment” and “Settings” (or other chart configurations).  
- **Settings Icon** (bottom-right, gear symbol): Opens chart settings.  


### Purpose of the Interface  
This chart is used for **technical analysis** of the S&P 500 E-mini Futures, combining:  
- Price action (candlesticks) to track daily trends.  
- Volume Profile (VP) to analyze volume distribution at price levels.  
- Time annotations to mark key market events or sessions.  
- Time frame selection to adjust the chart’s lookback period.  

Traders use this to identify trends, support/resistance, and volume-driven price movements.

---

