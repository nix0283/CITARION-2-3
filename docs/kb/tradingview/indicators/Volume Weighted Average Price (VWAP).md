# Volume Weighted Average Price (VWAP)

**URL:** https://www.tradingview.com/support/solutions/43000502018-volume-weighted-average-price-vwap/

---

- [ Help Center ](/) - / - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Volume Weighted Average Price (VWAP) ](/support/solutions/43000502018-volume-weighted-average-price-vwap/) # Volume Weighted Average Price (VWAP) Volume Weighted Average Price (VWAP) is a technical analysis tool used to measure the average price weighted by volume. VWAP is typically used with intraday charts as a way to determine the general direction of intraday prices. It's similar to a moving average in that when price is above VWAP, prices are rising and when price is below VWAP, prices are falling. VWAP is primarily used by technical analysts to identify market trend. Calculation There are five steps in calculating VWAP: - Calculate the Typical Price for the period. [(High + Low + Close)/3)] - Multiply the Typical Price by the period Volume. (Typical Price x Volume) - Create a Cumulative Total of Typical Price. Cumulative(Typical Price x Volume) - Create a Cumulative Total of Volume. Cumulative(Volume) - Divide the Cumulative Totals. VWAP = Cumulative(Typical Price x Volume) / Cumulative(Volume) The basics The Volume Weighted Average Price indicator is similar to a moving average in that when prices are advancing, they are above the indicator line and when they are declining, they are below the indicator line. Keep in mind, however, that much like a moving average, VWAP can also experience lag. Lag is inherent in the indicator because it's a calculation of an average using past data. VWAP can be used over any time frame: intraday (seconds, minutes, hours), week, month, year, decade, century. For example, if you select a weekly interval, the sum of the values will accumulate starting from the first trading day of each week. What to look for Trend Identification Trend Identification is a major benefit of using the Volume Weighted Average Price indicator. The premise is very straightforward but can be very useful, especially when used for confirming trading signals. Bullish Trend is characterized by prices trading above the VWAP. Bearish Trend is characterized by prices trading below the VWAP. Sideways Market is characterized by prices trading above and below the VWAP. Summary The Volume Weighted Average Price is an interesting indicator because unlike many other technical analysis tools, it's best suited for intraday analysis. It's a solid way of identifying the underlying trend of an intraday period. When price is above the VWAP, the trend is up and when it's below the VWAP, the trend is down. There is a downside, however. Even though it is primarily used on an intraday basis, there can still be a great deal of lag between the indicator and price. The indicator begins calculating at the open and stops calculating at the close. Therefore, for a chart using a short timeframe (i.e. 1 minute), there can be several hundred periods within that single day. The closer it is to the day's close, the more lag the indicator will have. This is true for any indicator that calculates an average using past data. Inputs Hide VWAP on 1D or Above If selected, VWAP will only be displayed on intraday timeframes. This is useful with the 'Session' Anchor Period, because VWAP makes sense only when the Anchor Period is higher than the chart timeframe. Anchor Period Indicator calculation period. This setting specifies the Anchor, i.e. how frequently the VWAP calculation will be reset. For VWAP to work properly, each VWAP period should include several bars inside of it, so e.g. setting Anchor to 'Session' and timeframe to '1D' is not useful because the indicator will be reset on every bar. Possible values: Session, Week, Month, Quarter, Year, Decade, Century, Earnings (reset on earnings), Dividends (reset on dividends), Splits (reset on splits). Source The source for the VWAP calculation. Traditionally, bar's average value is used as the source. By default, the source is hlc3, but hl2 is another common option. Offset Changing this number will move the VWAP either Forwards or Backwards, relative to the current market. Zero is the default. Bands Calculation mode Determines the units used to calculate the distance of the bands. When 'Percentage' is selected, a multiplier of 1 means 1%. Bands Multiplier #1-3 If selected, the indicator will calculate the Standard Deviations of the all VWAP values since the last anchor. The Standard Deviation bands will be multiplied by the corresponding values before being plotted on the chart. Timeframe Specifies the timeframe that the indicator is calculated on. This option allows calculating VWAP based on a data from another timeframe, e.g. having VWAP calculated on 1H chart be displayed on a 5m chart. Wait for timeframe closes Specifies the behavior when the indicator's timeframe is higher than the chart's. When 'Wait for timeframe closes' is checked, higher timeframe values only come in and are interconnected on the chart when the higher timeframe completes. Style VWAP Can toggle the visibility of the VWAP as well as the visibility of a price line showing the actual current value of the VWAP. Can also select the VWAP Line's color, line thickness, and line style. Upper Band #1-3, Lower Band #1-3 Can toggle the visibility of the VWAP standard deviation bands and set their colors and line types. Bands Fill #1-3 Can change whether to fill the space between the standard deviation bands and tune the color. Precision Sets the number of decimal places to be left on the indicator's value before rounding up. The higher this number, the more decimal points will be on the indicator's value. Also read: - [How to trade on TradingView](https://www.tradingview.com/support/solutions/43000756695-how-to-trade-on-tradingview/) - [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/) - [The technical analysis essentials](https://www.tradingview.com/support/solutions/43000759577-the-technical-analysis-essentials-with-tradingview/) - [Introduction to fundamental analysis](https://www.tradingview.com/support/solutions/43000759574-introduction-to-fundamental-analysis-on-tradingview/) - [Portfolios: track your assets, know your trades](https://www.tradingview.com/support/solutions/43000760937-tradingview-portfolios-track-your-assets-know-your-trades/) Previous Previous Volume Delta Next Next Volume-Weighted Moving Average (VWMA) Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43241201194/original/IH_QmCGpxlETg5n_YinfOnKilmw8w6FD4g.png?1627557193)

**Описание:** This TradingView chart displays **Apple Inc. (AAPL) stock** on the NASDAQ exchange, with a **1-minute (1m) candlestick chart** showing intraday price action. Here’s a detailed breakdown of all elements:  


### 1. **Header & Ticker Info**  
- **Ticker**: `AAPL` (Apple Inc.) with `NASDAQ` exchange label.  
- **Price Data**:  
  - `O145.18` (Open), `H145.19` (High), `L144.95` (Low), `C144.98` (Close) for the current session.  
  - Change: `-0.20 (-0.13%)` (red text, indicating a slight decline).  
- **Timeframe**: `1m` (1-minute candles) and `UTC-4` (timezone).  
- **Currency**: `USD` (top-right dropdown).  


### 2. **Chart Type & Indicators**  
- **Candlestick Chart**: Red/green candles represent price movements (red = close < open; green = close > open) over 1-minute intervals.  
- **VWAP (Volume-Weighted Average Price)**: A blue line (labeled `VWAP`) showing the average price weighted by volume.  
- **VWAP Bands**: Green shaded area with two bands:  
  - `VWAP:Upper Band` (top green line) and `VWAP:Lower Band` (bottom green line) — these form a volatility channel around the VWAP.  


### 3. **UI Elements & Labels**  
- **Price Box (Top-Left)**:  
  - Red box: `144.98` (current price).  
  - Blue box: `144.89` (likely a custom price level or indicator value).  
- **VWAP Session Data**: `VWAP Session hlc3 0 1 144.87 145.89 143.84` — displays VWAP-related values (e.g., session VWAP, high/low/close for VWAP).  
- **Right-Side Price Labels**:  
  - `144.98` (current price, red).  
  - `VWAP` (blue, VWAP line value).  
  - `Pre 144.85` (orange, pre-market or prior session price).  
- **Time Axis (Bottom)**: Dates/times (e.g., `27`, `28`, `29` — likely trading days) and 1-minute intervals (e.g., `10:40`, `12:00`).  
- **Toggle Icons**:  
  - Sun icon (bottom-right): Switches between light/dark mode.  
  - `E` icon (center-bottom): Likely a “expand” or “event” marker (e.g., earnings announcement).  


### 4. **Chart Purpose**  
The chart is used for **intraday trading analysis**, focusing on short-term price action relative to VWAP (a key volume-based indicator). Traders use it to identify trends, support/resistance (via VWAP bands), and momentum.  


This layout provides real-time price data, technical indicators (VWAP + bands), and time-based context for active trading decisions.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582921321/original/CTqWQ9v3qFlexwW7piA20ndlFSNGCT-VNw.png?1758897915)

**Описание:** This TradingView screenshot displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with a **VWAP (Volume-Weighted Average Price) indicator settings panel** open. Here’s a detailed breakdown:  


### **Top Navigation Bar**  
- **Left**: Zoom controls (magnifying glass), timeframes (D for daily), and a “+” button (add chart).  
- **Middle**: “Indicators” dropdown (for adding technical indicators), “Alert” (price notifications), and “Donlau” (likely a user or workspace label).  
- **Right**: “TradingView” logo, multiple “M”/“S” buttons (chart styles), “Publish” (share chart), and icons for charts, alerts, and settings.  


### **Chart Header**  
- **Symbol/Timeframe**: “AAPL Apple Inc · 1D · NASDAQ” with real-time data: *O254.10 H256.60 L253.78 C…* (open, high, low, close).  
- **VWAP Session**: A labeled box (with eye, settings, and delete icons) for the VWAP indicator.  


### **VWAP Settings Panel (Center)**  
A modal window titled “VWAP” with three tabs: *Inputs* (active), *Style*, *Visibility*.  

#### **Inputs Tab**  
- **VWAP SETTINGS**:  
  - Checkbox: *“Hide VWAP on 1D or Above”* (toggle visibility for daily+ timeframes).  
  - *Anchor Period*: Dropdown set to *“Session”* (defines VWAP calculation start).  
  - *Source*: Dropdown (*“(H + L + …”*) for price data (e.g., high/low/close).  
  - *Offset*: Input field (value `0`, adjusts VWAP line position).  

- **BANDS SETTINGS**:  
  - *Bands Calculation Mode*: Dropdown (*“Standard”*) for band methodology.  
  - Checkboxes for band multipliers: *#1 (checked, value 1)*, *#2 (unchecked, value 2)*, *#3 (unchecked, value 3)* (controls upper/lower VWAP bands).  

- **CALCULATION**: “Defaults” dropdown (reset settings) + *Cancel*/*Ok* buttons (apply/close panel).  


### **Chart Area**  
- **Candlestick Chart**: Green/red candles show price action (May–Aug 2025, with 2026 preview).  
- **VWAP Lines**: Green (lower band), blue (VWAP), and green (upper band) lines (values: 255.31 for all, per the top-right box).  
- **Y-Axis**: Price scale (188.00–252.00 USD).  
- **X-Axis**: Time (May, Jun, Jul, Aug, Dec, 2026, Feb) with a timezone label (*10:44:48 UTC-4*).  


### **Left Sidebar**  
Icons for drawing tools (trendlines, Fibonacci), text, and account features (lock, globe, trash).  


### **Bottom Toolbar**  
- Timeframe buttons: *1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All* (switch chart periods).  
- “Pine Editor” (code editor for custom indicators) and “Trading Panel” (order execution) tabs.  


### **Right Sidebar**  
Icons for notes, alerts, chat, and additional tools (e.g., chart styles, calendar).  


### **Top-Right Box**  
Displays VWAP values: *“VWAP:Lower Band #1 255.31”*, *“VWAP:Upper Band #1 255.31”*, *“VWAP 255.31”* (USD).  


This interface is used to analyze Apple’s price trends with VWAP (a volume-based average) and customize its settings (e.g., bands, anchor period) for trading insights.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582921383/original/Ha7Sm4O0i4a0mow4gs58sVs5c0XW3V14Jw.png?1758897930)

**Описание:** This TradingView chart displays Apple Inc. (NASDAQ) on a 1-day timeframe, currently showing a -0.53% decline (O254.10 H256.60 L253.78 C255.50). The interface includes:

**Top Toolbar**: Contains zoom controls, timeframe selector (D), indicators menu, alert/replay functions, and account options. A \


