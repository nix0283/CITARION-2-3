# I see a "Smoothing" section in an indicator's settings. What does it do?

**URL:** https://www.tradingview.com/support/solutions/43000742042-i-see-a-smoothing-section-in-an-indicator-s-settings-what-does-it-do/

---

- [ Help Center ](/)
- / 
- / [ I see a "Smoothing" section in an indicator's settings. What does… ](/support/solutions/43000742042-i-see-a-smoothing-section-in-an-indicator-s-settings-what-does-it-do/)

# I see a "Smoothing" section in an indicator's settings. What does it do? 
 Several of our built-in indicators such as [RSI](https://www.tradingview.com/support/solutions/43000502338-relative-strength-index-rsi/) have a "Smoothing" option that can add a moving average plot to the indicator. This feature draws a new line alongside the indicator's calculated output, displaying a smoothed (averaged) version of that same data. The "Smoothing" section is in the script's "Settings/Inputs" tab.

A moving average is a technical analysis tool that calculates a series of averages, each using a successive subset of the chart data, thereby creating a dynamic average line. Traders often use moving averages to smooth a chart's price fluctuations and help identify the general trend direction.

There are different types of moving averages, which vary in their calculations. For example, some use equal weighting for each data point, while others multiply each point by a weighting factor to give more weight to specific data (e.g., weighting the points based on recency, symmetry, or volume, linearly or exponentially). The length of the moving average, which is the number of data points used in calculating the average, also influences the final plot. All together, these variations affect how quickly a moving average responds to price changes and how significantly it moves. 

The "Smoothing" section includes three settings: 'Type', 'Length', and 'BB StdDev'. 

The types of moving averages available for built-in indicators are: "[SMA](https://www.tradingview.com/support/solutions/43000696841/)", "SMA + Bollinger Bands", "[EMA](https://www.tradingview.com/support/solutions/43000592270/)", "[SMMA](https://www.tradingview.com/support/solutions/43000591343/) (RMA)", "[WMA](https://www.tradingview.com/support/solutions/43000594680/)", and "[VWMA](https://www.tradingview.com/support/solutions/43000592293/)". To learn more about moving averages and how to interpret their plots, see [this Help center article](https://www.tradingview.com/support/solutions/43000502589-moving-averages/). 

Alternatively, users can select "None" for the 'Type' setting to display the indicator without a moving average plot. Depending on the indicator, the default moving average type is either "SMA" or "None".

The "SMA + Bollinger Bands" option for the 'Type' setting displays the same moving average line as the "SMA" option and plots two additional [Bollinger Bands](https://www.tradingview.com/support/solutions/43000501840/) around the SMA line. 

The 'BB StdDev' setting is only applicable when the 'Type' input is set to "SMA + Bollinger Bands". It specifies the standard deviations of the upper and lower Bollinger Bands from the SMA line. By default, the bands are 2 standard deviations above and below the SMA line. 

The 'Length' setting determines the number of data points used in calculating the moving average. Its default value is 14. Using a smaller length creates a faster moving average that is more responsive to short-term price changes, while using a larger length creates a slower moving average that shows more long-term changes. 
 Previous Previous Leveraging multi-timeframe analysis Next Next Why I do not have an “Invite-only scripts” tab in my Indicators Library? Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43541996707/original/CeomZNLacHD1t28-JsxDBv8mRnZOX72GQw.png?1740044754

**Описание:**

This image shows the **RSI (Relative Strength Index) settings panel** from the TradingView platform, used to configure the RSI indicator’s parameters. Here’s a detailed breakdown of the UI elements and their purposes:  


### 1. Header & Navigation  
- **Title**: “RSI” (top-left) identifies the indicator being configured.  
- **Close Button**: “×” (top-right) closes the settings panel.  
- **Tabs**: Three tabs—*Inputs* (active, underlined), *Style*, and *Visibility*—let users switch between different configuration sections.  


### 2. “RSI SETTINGS” Section (Core RSI Parameters)  
This section configures the RSI indicator’s core behavior:  
- **RSI Length**: A text input field with the value “14” (default). This sets the number of periods (e.g., candlesticks) used to calculate RSI.  
- **Source**: A dropdown menu set to “close”. This defines the price data (e.g., closing price of each candle) used to calculate RSI.  
- **Calculate Divergence**: A checkbox (currently unchecked) with an info icon (ⓘ). Enabling this adds divergence analysis (comparing price action to RSI trends) to the indicator.  


### 3. “SMOOTHING” Section (Optional Smoothing for RSI)  
This section adds smoothing (e.g., for Bollinger Bands-style RSI) to refine the indicator:  
- **Type**: A dropdown menu set to “SMA” (Simple Moving Average). This selects the smoothing method (e.g., SMA, EMA).  
- **Length**: A text input field with the value “14”. This sets the number of periods for the smoothing calculation.  
- **BB StdDev**: A text input field with the value “2”, paired with an info icon (ⓘ). This defines the standard deviation for Bollinger Bands-style RSI (controls the width of the bands around the smoothed RSI).  


### Purpose of the Panel  
This interface lets traders customize the RSI indicator’s calculation (length, price source, divergence) and optional smoothing (type, length, standard deviation) to match their trading strategy. The *Style* tab (not shown) would adjust visual elements (colors, line thickness), while *Visibility* controls which RSI components appear on the chart.

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43527536219/original/xTdSEizJTIgwWq17ulfuW-RQYWB9O2nqRQ.png?1733321235

**Описание:**

This image shows a **TradingView stock chart interface** displaying **Tesla, Inc. (TSLA)** on the **NASDAQ** exchange, with a **1-day (1D) candlestick chart** and technical indicators. Here’s a detailed breakdown of all elements:  


### 1. **Top Header & Stock Info**  
- **Stock Name/Exchange**: *“Tesla, Inc · 1D · NASDAQ”* (identifies the stock, time frame, and exchange).  
- **Price Data**: *“O 239.81 H 242.76 L 238.90 C 242.65 +3.06 (+1.28%)”*  
  - `O`: Opening price ($239.81).  
  - `H`: High price ($242.76).  
  - `L`: Low price ($238.90).  
  - `C`: Closing price ($242.65).  
  - `+3.06 (+1.28%)`: Daily price change (gain of $3.06, +1.28%).  
- **Currency**: *“USD”* (dropdown, likely for currency selection).  
- **Price Scale**: *“236.00”* (right-side price axis, showing the y-axis range).  


### 2. **Trading Buttons (Top-Left)**  
- **Sell Button**: Red box with *“243.03 SELL”* (current sell price, with “SELL” label).  
- **Buy Button**: Blue box with *“243.21 BUY”* (current buy price, with “BUY” label).  
- **Spread**: *“0.18”* (difference between buy/sell prices, shown between the two buttons).  


### 3. **Candlestick Chart (Main Price Chart)**  
- **Candlesticks**: Green (price closed higher than open) and red (price closed lower than open) bars, representing daily price action.  
- **Price Axis (Right)**: Vertical scale from ~212 to 236, marking price levels.  
- **Annotations (E, D)**:  
  - `E` (red shield): Likely a “sell” signal or alert.  
  - `D` (blue circle): Likely a “buy” signal or alert.  


### 4. **Technical Indicators (Below Candlestick Chart)**  
A panel with multiple indicators:  

#### a. **RSI (Relative Strength Index)**  
- Label: *“RSI 14 close”* (14-period RSI, using closing prices).  
- Values: *“72.81 57.33 73.69 40.97 ∅ ∅”* (RSI values, possibly for different timeframes or calculations).  
- RSI Line: Purple line, with a scale (right) from 30–70 (overbought/oversold levels).  

#### b. **Bollinger Bands**  
- *“Upper Bollinger Band”*: Green line (top band, value: 56.57).  
- *“Lower Bollinger Band”*: Green line (bottom band, value: 37.51).  
- Shaded area: Between the two bands, representing volatility.  

#### c. **RSI-based MA (Moving Average)**  
- Orange line (value: 47.04), likely a moving average of RSI.  


### 5. **Time Frame & Date Axis**  
- **Date Scale (Bottom)**: X-axis with dates (e.g., *“16”*, *“23”*, *“Oct”*, *“14”*, *“21”*, *“Nov”*, *“11”*, *“18”*), showing the chart’s time range.  
- **Time Frame Buttons (Bottom-Left)**: *“1D 5D 1M 3M 6M YTD 1Y 5Y All”* (switches the chart’s time frame: 1 day, 5 days, 1 month, etc.).  
- **Calendar Icon**: For custom date selection.  


### 6. **Additional UI Elements**  
- **Timestamp**: *“09:06:54 (UTC-5)”* (current time, with timezone).  
- **“ADJ”**: Likely “Adjusted” (for split/dividend-adjusted prices).  
- **“PRO” Badge**: Black “PRO” logo (indicates a TradingView Pro subscription).  
- **Settings Icon** (Bottom-Right): Gear icon, for chart settings.  


### Purpose of Elements  
- **Candlestick Chart**: Visualizes price movements (open, high, low, close) over time.  
- **RSI**: Measures momentum/overbought/oversold conditions.  
- **Bollinger Bands**: Shows volatility and potential price ranges.  
- **Buy/Sell Buttons**: For executing trades (live market prices).  
- **Time Frame Buttons**: Adjust the chart’s historical scope.  


This interface is used for **technical analysis** of Tesla’s stock, combining price action, momentum (RSI), and volatility (Bollinger Bands) to inform trading decisions.

---

