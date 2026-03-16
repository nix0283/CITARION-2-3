# Anchored Volume Profile

**URL:** https://www.tradingview.com/support/solutions/43000707989-anchored-volume-profile/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Drawings - / [ How to use various drawing tools ](/support/folders/43000547459-how-to-use-various-drawing-tools/) - / [ Anchored Volume Profile ](/support/solutions/43000707989-anchored-volume-profile/) # Anchored Volume Profile Definition Anchored Volume Profile (AVP) indicator calculates volume data within a specified time period from the manually selected starting point to the end of the available bars, allowing traders to analyse the volume activity of a particular range instead of the entire price movement of an asset. Note: you can read more about traits shared by all Volume Profile indicators in the [Volume Profile Indicators: basic concepts](https://www.tradingview.com/chart/?solution=43000502040) Help Center article. The text below describes features unique to this particular Volume Profile indicator. How to apply AVP to your chart 1. Select Anchored Volume Profile from the drawing tools list on the chart’s left-side panel, as shown below. 2. Click on the chart to select the point from which you’d like to start your calculation. The volume profile curve will be displayed on the chart as pictured below. Calculation When calculating Anchored Volume Profile, we check a list of timeframes in a sequence until the number of bars in the time interval for which VP is calculated will be fewer than 5000. The sequence of timeframes is: 1, 3, 5, 15, 30, 60, 240, 1D. Consider the following example. The AVP indicator is set to calculate the profile for the period that starts on the first Monday bar and ends on the last Sunday bar of the same week. The symbol is traded 24x7 (for the sake of the experiment, let's assume there are no gaps where no trades were happening and each minute of every week has a bar associated with it). - First, the indicator checks the "1" timeframe, sees that the 1m chart for this symbol has 7D * 1440m = 10080 bars of 1m data, which is above the 5000 bar limit. It selects the next timeframe in the sequence. - Next, the indicator does the same with the "3" timeframe. The 3m chart for the symbol has 7D * (1440 / 3) = 3360 bars of data. This is below the 5000 bar limit, so the 3m bars will be used in the AVP calculation. Note: There is a limited number of lower timeframe bars available for the indicator's calculations. If the AVP is set to be calculated very deep in the symbol's history, there might be no lower timeframe information for that period of time. In such cases, the Chart timeframe will be used for the calculation instead. To demonstrate this, try adding AVP to NASDAQ:AAPL, 1D, and setting it up to span a one-day period that starts on Dec 12, 1980. There won't be lower timeframe data for this time interval, so AVP calculation will be carried out at the Chart resolution (1D). Building on a single bar Note that while building Anchored Volume Profile on a single bar, the close &gt; open condition is used to calculate the Up/Down Volume. i.e., if close &gt; open, the price movement is considered Up Volume, if close &lt;= open, it's Down Volume. Inputs Rows Layout / Row Size These two inputs specify the way the indicator calculates how many rows each histogram will have. If the "Rows Layout" input is set to "Number of Rows", the "Row Size" input specifies the total number of rows in the histogram, and the number of ticks per each row is calculated automatically, based on the formula: Ticks Per Row = (Histogram Top - Histogram Bottom) / Number of Rows / Tick size. Depending on the span of the histogram, the Ticks Per Row value can be rounded either up or down, and the total number of rows may exceed what is specified in the limit. Let's consider a symbol with a tick size of 0.01, and a Volume Profile histogram that spans a price change from 10 to 11, which brings the total number of ticks it spans to 100. If the "Row Size" is set to 25, the height of a single row is (3 - 2) / 25 / 0.01 = 4 ticks. The resulting histogram has 25 rows, with each row spanning 4 ticks. If the row height calculation results in a floating point number, the indicator rounds the Ticks Per Row calculation to ensure the height is a whole number. It may also create additional rows to ensure all of the data is represented in the histogram. Whether the Ticks Per Row value is rounded up or down depends on which one results in a total number of rows that is closer to the value in the "Row Size" input. For example, if in the case above the "Row Size" input is changed to 30, the initial row height is (3 - 2) / 30 / 0.01 = 3.333 ticks per each row. If this number is then rounded to the nearest integer, 3, each row in the the resulting histogram has 3 ticks per row. As a result, the first 30 rows only account for 30 * 3 = 90 ticks out of a hundred that the histogram spans. This leaves 10 ticks unaccounted for, and for them, four additional rows are created -- the first three with the size of 3, and the last one with the size of 1, increasing the total number of rows to 34. If it is rounded up instead, each row in the histogram has a height of 4 ticks. In this case, all 100 ticks fit into 25 rows with no remainder. As 34 rows is closer to 30, the requested "Row Size", the indicator uses 3 ticks as the row height. If this input is set to “Ticks Per Row”, Row Size indicates the number of ticks in each single row (1 tick being the minimal move the price for this symbol can make: for example, for NASDAQ:AAPL, 1 tick is 0.01 because the price needs to move at least 0.01 USD, i.e. 1 cent). E.g., setting it to 25 will mean that each row has the height of 25 ticks. In that case, the number of rows will be calculated automatically, and the Volume Profile histogram spanning the price from 200 to 300 for a symbol with a tick size of 0.01 will have (300 - 200) / 0.01 / 25 = 400 rows per each histogram. Volume Toggles between showing total volume for each row (Total), splitting each row into up/down (Up/Down), or showing their difference (Delta). Value Area Volume Specifies what percentage of all volume for the trading session should be highlighted by Value Area. Coordinates #1 (bar) - sets the position of the anchor of the Volume Profile. The VP will start before this position. Previous Previous Fixed Range Volume Profile drawing tool Next Next How to add text to Сhannel tools? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43581922504/original/N7t6eJZmk5QZC6ZHFUROgQswpGOBXxZ1_Q.png?1758535870)

**Описание:** This is a **TradingView chart interface** displaying Apple Inc. (NASDAQ: AAPL) on a **1-week (1W)** timeframe. Below is a detailed breakdown of UI elements, charts, and their purposes:  


### 1. **Top Toolbar (Function Buttons)**  
- **Left Side**:  
  - `+` (Add symbol), `W` (Timeframe: Weekly), `♦` (Chart type: Candlestick), `Indicators` (Add technical indicators), `Alert` (Set price alerts), `Replay` (Simulate market history), `←/→` (Zoom/pan), `TradingView` (Account menu), `M/M/S` (Chart style: Mountain/Line/Heikin-Ashi), `Refresh` (Reload data), `Settings` (Chart preferences), `Camera` (Screenshot), `Publish` (Share chart).  
- **Right Side**:  
  - `USD` (Currency selector), `Note` (Annotations), `Clock` (Time settings), `Diamond` (Chart type), `Chat` (Community comments), `Target` (Price targets), `Calendar` (Events), `Grid` (Layout), `RSS` (News), `Help` (Support).  


### 2. **Symbol & Price Bar**  
- **Symbol**: `AAPL: Apple Inc · 1W · NASDAQ` (Ticker, timeframe, exchange).  
- **Price Data**: `O237.00 H246.30 L235.03 C245.50 +11.43 (+4.88%) +7.62 (+3.20%)` (Open, High, Low, Close, daily change, weekly change).  


### 3. **Main Chart (Candlestick)**  
- **Type**: Weekly candlestick chart (green = bullish close, red = bearish close).  
- **Timeframe**: 1-week (x-axis: Feb–Nov).  
- **Y-Axis**: Price scale (170–260 USD).  
- **Trend**: Shows a dip (Mar–Jun) followed by a recovery (Jul–Oct), with recent bullish momentum.  


### 4. **Left Sidebar (Drawing/Analysis Tools)**  
A dropdown menu titled **“Forecasting and measurement tools”** is open, with categories:  
- **Forecasting/Measurement**:  
  - `Long Position`/`Short Position` (Mark trade setups), `Forecast` (Predict price), `Bars Pattern` (Identify candlestick patterns), `Ghost Feed` (Simulate trades), `Projection` (Price targets).  
- **Volume-Based**:  
  - `Anchored VWAP` (Volume-weighted average price), `Fixed Range Volume Profile` (Starred), `Anchored Volume Profile` (Selected, analyzes volume at price levels).  
- **Measurer**:  
  - `Price Range`/`Date Range`/`Date and Price Range` (Measure price/time intervals; last is starred).  


### 5. **Bottom Bar**  
- `All` (Time filter), `Calendar` (Date selector), `13:54:58 UTC+4` (Timestamp), `ADJ` (Adjusted data toggle).  


### Purpose  
This interface is used for **technical analysis** of Apple’s stock, enabling traders to:  
- Track price action (candlesticks),  
- Apply tools (volume profile, forecasts, measurements) to identify trends, support/resistance, and trade setups,  
- Customize charts (timeframes, indicators, alerts) and share insights.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43581922618/original/XxdiC7bDpXhxYNVWh_jIRCxDTQ2Lvm5OGQ.png?1758535885)

**Описание:** This TradingView chart displays **Apple Inc. (NASDAQ: AAPL)** on a **1-week (1W)** timeframe. Here’s a detailed breakdown:  


### **Top Bar (UI Elements)**  
- **Left**: Zoom in/out (+/-), timeframe toggle (W), and chart type (candlestick) buttons.  
- **Center**:  
  - *Indicators*: Dropdown to add technical indicators.  
  - *Alert*: Set price/volume alerts.  
  - *Replay*: Simulate historical price action.  
  - Navigation arrows (back/forward) for chart history.  
- **Right**:  
  - *TradingView* dropdown (account/settings), timeframe shortcuts (M/M/S), refresh, theme, fullscreen, screenshot, and *Publish* (share chart).  


### **Symbol & Price Data**  
- **Symbol**: `AAPL Apple Inc · 1W · NASDAQ` (with a sun icon, indicating market hours).  
- **OHLCV Data**:  
  - Open (O): 237.00  
  - High (H): 246.30  
  - Low (L): 235.03  
  - Close (C): 245.50  
  - Change: +11.43 (+4.88%)  
  - Additional metric: +7.62 (+3.20%) (likely a custom or comparative value).  


### **Chart Area**  
- **Candlestick Chart**: Green candles = price increase (close > open); red = decrease (close < open).  
- **Volume Profile (Right)**: Horizontal bars (pink = selling, blue = buying) show price levels with significant volume.  
- **Horizontal Line**: A user-drawn support/resistance level (black line across the chart).  


### **Left Sidebar (Tools)**  
Icons for:  
- Drawing tools (trendlines, shapes, text).  
- Chart types (candlestick, line, bar).  
- Social sharing, indicators, and settings.  


### **Bottom Bar**  
- **Timeframe Toggle**: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, *All* (current: 1W).  
- **Date Range**: X-axis labels (Jun, Jul, Aug, Sep, Oct, Nov) with a highlighted date: *Mon 04 Aug ’25*.  
- **Timestamp**: `13:56:51 UTC+4` (current time).  
- **Tabs**: *Pine Editor* (for coding indicators) and *Trading Panel* (for order execution).  


### **Right Sidebar (Additional Tools)**  
Icons for:  
- Notes, alerts, market depth, chat, and other utilities (e.g., calendar, grid).  


### **Key Purpose**  
This interface is used for **technical analysis**—traders analyze price action, volume, and indicators to make trading decisions. The 1W timeframe helps assess long-term trends, while tools like volume profile and drawing lines aid in identifying support/resistance levels.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43581922908/original/ROXLD9cPx_JFzCeVDKdrD3oEdHBm1Ejolw.png?1758535897)

**Описание:** This TradingView interface displays a **weekly (1W) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with a focus on the **Volume Profile (AVP)** indicator settings. Here’s a detailed breakdown:  


### 1. **Top Toolbar & Symbol Info**  
- **Left Icons**: Zoom (magnifying glass), “W” (timeframe), “H” (horizontal line), “Indicators” (dropdown), “Alert” (bell), “Replay” (rewind).  
- **Symbol & Data**: “AAPL: Apple Inc · 1W · NASDAQ” with open (O: 237.00), high (H: 246.30), low (L: 235.03), close (C: 245.50), +11.43 (+4.88%) day change, +7.62 (+3.20%) pre-market change.  
- **Right Icons**: “TradingView” (logo), “M/M/S” (timeframes), refresh, settings, full-screen, camera, “Publish” (black button).  


### 2. **Main Chart Area**  
- **Candlestick Chart**: Weekly candles (green = up, red = down) show price action. A horizontal black line marks a key level.  
- **Volume Profile (AVP)**: A vertical histogram on the right displays volume distribution (pink = selling, blue = buying) across price levels.  


### 3. **AVP Settings Popup**  
A modal window configures the Volume Profile:  
- **Tabs**: *Inputs* (active), *Style*, *Coordinates*, *Visibility*.  
- **Inputs Section**:  
  - *Rows Layout*: Dropdown (e.g., “Number…”).  
  - *Row Size*: Input field (24).  
  - *Volume*: Dropdown (e.g., “Up/Down”).  
  - *Value Area Volume*: Input field (70).  
- **Buttons**: *Template* (dropdown), *Cancel*, *Ok* (black).  


### 4. **Left Sidebar (Tools)**  
Icons for drawing (pen, lines), chart types (candlestick, bar), social, volume, text, zoom, magnet, lock, eye, globe, trash, star (favorites).  


### 5. **Bottom Toolbar**  
- **Timeframe Selector**: “1D 5D 1M 3M 6M YTD 1Y 5Y All” + calendar icon.  
- **Date Range**: “Jun” to “Nov” (with “Mon 04 Aug ’25” highlighted).  
- **Time/UTC**: “13:58:52 UTC+4” + “ADJ” (adjusted data).  


### 6. **Bottom Panels**  
- *Pine Editor* (for coding indicators) and *Trading Panel* (for orders) tabs.  


### Purpose  
The interface is used for **technical analysis**—combining price action (candlesticks) with volume distribution (AVP) to identify support/resistance, trend strength, and liquidity zones. The AVP settings let users customize how volume is visualized (e.g., row size, value area).


