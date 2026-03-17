# I see a "Smoothing" section in an indicator's settings. What does it do?

**URL:** https://www.tradingview.com/support/solutions/43000742042-i-see-a-smoothing-section-in-an-indicator-s-settings-what-does-it-do/

---

- [ Help Center ](/) - / - / [ I see a "Smoothing" section in an indicator's settings. What does… ](/support/solutions/43000742042-i-see-a-smoothing-section-in-an-indicator-s-settings-what-does-it-do/) # I see a "Smoothing" section in an indicator's settings. What does it do? Several of our built-in indicators such as [RSI](https://www.tradingview.com/support/solutions/43000502338-relative-strength-index-rsi/) have a "Smoothing" option that can add a moving average plot to the indicator. This feature draws a new line alongside the indicator's calculated output, displaying a smoothed (averaged) version of that same data. The "Smoothing" section is in the script's "Settings/Inputs" tab. A moving average is a technical analysis tool that calculates a series of averages, each using a successive subset of the chart data, thereby creating a dynamic average line. Traders often use moving averages to smooth a chart's price fluctuations and help identify the general trend direction. There are different types of moving averages, which vary in their calculations. For example, some use equal weighting for each data point, while others multiply each point by a weighting factor to give more weight to specific data (e.g., weighting the points based on recency, symmetry, or volume, linearly or exponentially). The length of the moving average, which is the number of data points used in calculating the average, also influences the final plot. All together, these variations affect how quickly a moving average responds to price changes and how significantly it moves. The "Smoothing" section includes three settings: 'Type', 'Length', and 'BB StdDev'. The types of moving averages available for built-in indicators are: "[SMA](https://www.tradingview.com/support/solutions/43000696841/)", "SMA + Bollinger Bands", "[EMA](https://www.tradingview.com/support/solutions/43000592270/)", "[SMMA](https://www.tradingview.com/support/solutions/43000591343/) (RMA)", "[WMA](https://www.tradingview.com/support/solutions/43000594680/)", and "[VWMA](https://www.tradingview.com/support/solutions/43000592293/)". To learn more about moving averages and how to interpret their plots, see [this Help center article](https://www.tradingview.com/support/solutions/43000502589-moving-averages/). Alternatively, users can select "None" for the 'Type' setting to display the indicator without a moving average plot. Depending on the indicator, the default moving average type is either "SMA" or "None". The "SMA + Bollinger Bands" option for the 'Type' setting displays the same moving average line as the "SMA" option and plots two additional [Bollinger Bands](https://www.tradingview.com/support/solutions/43000501840/) around the SMA line. The 'BB StdDev' setting is only applicable when the 'Type' input is set to "SMA + Bollinger Bands". It specifies the standard deviations of the upper and lower Bollinger Bands from the SMA line. By default, the bands are 2 standard deviations above and below the SMA line. The 'Length' setting determines the number of data points used in calculating the moving average. Its default value is 14. Using a smaller length creates a faster moving average that is more responsive to short-term price changes, while using a larger length creates a slower moving average that shows more long-term changes. Previous Previous Leveraging multi-timeframe analysis Next Next Why I do not have an “Invite-only scripts” tab in my Indicators Library? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43541996707/original/CeomZNLacHD1t28-JsxDBv8mRnZOX72GQw.png?1740044754)

**Описание:** This is a **TradingView RSI (Relative Strength Index) indicator settings panel** (mobile/desktop UI). Here’s a detailed breakdown:  


### 1. Header & Navigation  
- **Title**: “RSI” (top-left) identifies the indicator.  
- **Close Button**: “×” (top-right) closes the settings panel.  
- **Tabs**: Three tabs—*Inputs* (active, underlined), *Style*, *Visibility*—let users switch between configuration, visual styling, and visibility options.  


### 2. RSI SETTINGS Section  
Configures core RSI parameters:  
- **RSI Length**: Input field (default: `14`) sets the number of periods for RSI calculation (standard for RSI).  
- **Source**: Dropdown (default: `close`) selects the price data source (e.g., `close`, `open`, `high`, `low`).  
- **Calculate Divergence**: Checkbox (unchecked) enables RSI divergence detection (identifies trend reversals). An “i” icon provides context on divergence.  


### 3. SMOOTHING Section  
Adjusts smoothing for RSI (reduces noise):  
- **Type**: Dropdown (default: `SMA`—Simple Moving Average) selects the smoothing method (e.g., `EMA`, `WMA`).  
- **Length**: Input field (default: `14`) sets the smoothing period (matches RSI length by default).  
- **BB StdDev**: Input field (default: `2`) sets Bollinger Bands standard deviation (for RSI Bollinger Bands). An “i” icon explains this parameter.  


### Purpose  
This panel lets traders customize the RSI indicator’s calculation (length, data source, divergence) and smoothing (type, length, Bollinger Bands deviation) to fit their analysis style. The *Style* tab (next) would adjust colors/line thickness, while *Visibility* controls which RSI components (e.g., overbought/oversold levels) appear on the chart.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43527536219/original/xTdSEizJTIgwWq17ulfuW-RQYWB9O2nqRQ.png?1733321235)

**Описание:** This TradingView chart displays **PayPal Holdings, Inc. (NASDAQ: PYPL)** on a **1-day (1D)** timeframe, with the following key elements:  


### 1. **Top Header & Price Data**  
- **Symbol/Exchange**: “PayPal Holdings, Inc · 1D · NASDAQ” identifies the stock, exchange, and timeframe.  
- **Price Metrics**:  
  - `O239.81 H242.76 L238.90 C242.65 +3.06 (+1.28%)`: Open, High, Low, Close prices, and daily change (green = gain).  
  - **Buy/Sell Boxes**:  
    - Red “243.03 SELL” (sell price, -0.18 from buy).  
    - Blue “243.21 BUY” (buy price, current bid/ask).  
  - **Currency**: “USD” dropdown (currency selection).  


### 2. **Candlestick Chart (Main Price Chart)**  
- **Candles**: Green (up days, close > open) and red (down days, close < open) candles show price action over time.  
- **Price Axis (Right)**: Values (e.g., 220.00, 224.00) for price levels.  
- **Markers (D, E)**:  
  - `D` (blue circle): Likely a user-defined annotation.  
  - `E` (red shield): Likely a user-defined annotation or alert.  


### 3. **Technical Indicators (Below Candlestick Chart)**  
- **RSI (Relative Strength Index)**:  
  - `RSI 14 close 72.81 57.33 73.69 40.97 ∅ ∅`: RSI values (current: 72.81, overbought >70).  
  - Purple line: RSI (momentum oscillator, 0–100).  
  - Orange line: “RSI-based MA” (moving average of RSI).  
- **Bollinger Bands**:  
  - Green lines: “Upper Bollinger Band” (56.57) and “Lower Bollinger Band” (37.51) (volatility bands around RSI).  
  - Gray shaded area: Band range.  


### 4. **Time Period & Timeframe Controls**  
- **X-Axis (Bottom)**: Dates (e.g., 16, 23, Oct, 14, 21, Nov, 11, 18) for the chart’s time range.  
- **Timeframe Buttons**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (switch between timeframes).  
- **Calendar Icon**: Opens date range selector.  


### 5. **Additional UI Elements**  
- **Timestamp**: `09:06:54 (UTC-5)` (current time, UTC offset).  
- **“ADJ”**: Adjusted price toggle (accounts for dividends/splits).  
- **“PRO” Badge**: TradingView Pro subscription indicator.  
- **Settings Icon (Bottom Right)**: Chart settings (e.g., indicators, appearance).  


This layout combines price action, technical indicators (RSI, Bollinger Bands), and trading controls to analyze PayPal’s stock performance.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

