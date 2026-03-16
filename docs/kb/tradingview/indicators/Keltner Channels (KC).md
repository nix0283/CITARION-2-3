# Keltner Channels (KC)

**URL:** https://www.tradingview.com/support/solutions/43000502266-keltner-channels-kc/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Keltner Channels (KC) ](/support/solutions/43000502266-keltner-channels-kc/) # Keltner Channels (KC) Definition The [Keltner Channels (KC) indicator](https://www.tradingview.com/scripts/keltnerchannels/) is a banded indicator similar to Bollinger Bands and Moving Average Envelopes. They consist of an Upper Envelope above a Middle Line as well as a Lower Envelope below the Middle Line. The Middle Line is a moving average of price over a user-defined time period. Either a simple moving average or an exponential moving average are typically used. The Upper and Lower Envelopes are set a (user-defined multiple) of a range away from the Middle Line. This can be a multiple of the daily high/low range, or more commonly a multiple of the Average True Range. History The basic idea behind the Keltner Channels indicator was introduced by Chester Keltner in his 1960 book How to Make Money in Commodities . Since then, his ideas have been expanded upon and simplified, most notably by Linda Bradford Raschke. Raschke popularized using an exponential moving average for the middle line and using Average True Range for the envelopes. Calculation For this example we will use a 20 Period EMA with Envelopes using Average True Range and a multiplier of 2: Basis = 20 Period EMA Upper Envelope = 20 Period EMA + (2 X ATR) Lower Envelope = 20 Period EMA - (2 X ATR) The basics Much like any indicator that is based around a moving average, The Keltner Channels (KC) indicator is a lagging indicator. Moving averages inherently lag behind price and therefore so do any bands or envelopes that are calculated using a moving average. The main occurrences to look for when using Keltner Channels are breakthroughs above the Upper Envelope or below the Lower Envelope. A breakthrough above the Upper Envelope signifies overbought conditions. A breakthrough below the Lower Envelope signifies oversold conditions. Keep in mind however when using Keltner Channels, that overbought and oversold conditions are oftentimes a sign of strength. During a clearly defined trend, overbought and oversold conditions can signify strength. In this case, the current trend would strengthen and ultimately continue. It works a little bit different in a sideways market. When the market is trending sideways, overbought and oversold readings are frequently followed by price moving back towards the moving average (Middle Line). What to look for Trend Confirmation As previously mentioned, during a clearly defined trend, breakthrough above or below the envelopes can be a sign of underlying strength of the trend. During a Bullish Trend, a breakthrough above the upper envelope can be seen as a sign of strength and the uptrend is likely to continue. During a Bearish Trend, a breakthrough below the lower envelope can be seen as a sign of strength and the downtrend is likely to continue. Overbought and Oversold When a market is choppy or trading sideways, Keltner Channels can be useful for identifying overbought and oversold conditions. These conditions can typically lead to price corrections where price moves back towards the moving average (Middle Line). Summary In terms of trend identification and determining overbought and oversold levels, the Keltner Channels indicator does this effectively. It is one of a number of banded indicators that accomplishes this task, just in its own way. While Keltner Channels can be used independently, it is best to use them with additional technical analysis tools. Historical analysis may also be helpful when trying to determine the correct parameters when setting up the indicator. Different securities may require a different multiplier to adjust the width of the bands or envelopes. Inputs Indicator Timeframe Specifies the timeframe that the indicator is calculated on. This option allows calculating KC based on a data from another timeframe, e.g. having KC calculated on 1H chart be displayed on a 5m chart. Length The time period to be used in calculating the MA which creates the base for the Upper and Lower Envelopes (20 is the default). Multiplier The multiplier to be applied to the bands. Source Determines what data from each bar will be used in calculations. Close is the default. Use Exponential MA Determines if a simple or exponential moving average will be used for the basis. Bands Style Determines if high/low range or average true range will be used for the bands. ATR Length The time period to be used in calculating the Average True Range. Style Upper Can toggle the visibility of the Upper Band as well as the visibility of a price line showing the actual current value of the Upper Band. Can also select the Upper Band's color, line thickness and line style. Basis Can toggle the visibility of the Basis as well as the visibility of a price line showing the actual current value of the Basis. Can also select the Basis' color, line thickness and line style. Lower Can toggle the visibility of the Lower Band as well as the visibility of a price line showing the actual current value of the Lower Band. Can also select the Lower Band's color, line thickness and line style. Background Toggles the visibility of a Background color within the Bands. Can also change the Color itself as well as the opacity. Previous Previous Kaufman's Adaptive Moving Average (KAMA) Next Next Klinger Oscillator Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43586562907/original/HTDcsLmMIVtls45eBbwggPfJIQ3S4mV48Q.png?1760621655)

**Описание:** This TradingView chart displays **Apple Inc. (NASDAQ: AAPL)** on a **1-day (1D)** timeframe, with the Keltner Channels (KC) indicator configuration panel open. Here’s a detailed breakdown:  


### **Top Bar & Symbol Info**  
- **Left**: Zoom controls (+/-), timeframe toggle (D for daily), and indicator/alert buttons.  
- **Symbol**: “Apple Inc · 1D · NASDAQ” with real-time data: *O 248.25, H 248.38, L 246.18, C 247.03* (close), down **-2.31 (-0.93%)**.  
- **Right**: Currency (USD), “Publish” button, and icons for notes, alerts, replay, and layout.  


### **Indicator Panel (KC Settings)**  
A modal window configures the **Keltner Channels (KC)** indicator:  
- **Tabs**: *Inputs* (active), *Style*, *Visibility*.  
- **Inputs**:  
  - *Length*: 20 (period for the moving average).  
  - *Multiplier*: 2 (for ATR-based band width).  
  - *Source*: “Close” (price data source).  
  - *Use Exponential MA*: Checked (uses EMA for the centerline).  
  - *Bands Style*: “Average…” (dropdown for band calculation).  
  - *ATR Length*: 10 (period for Average True Range).  
  - *Timeframe*: “Chart” (uses the chart’s timeframe for calculation).  
  - *Wait for timeframe closes*: Checked (recalculates only on period close).  
  - *Inputs in status line*: Checked (displays settings in the chart’s status bar).  
- **Buttons**: *Defaults* (reset to default), *Cancel*, *Ok* (apply settings).  


### **Chart Area**  
- **Main Chart**: Candlestick chart showing price action (green/red candles) with **KC bands** (blue lines: *Upper, Basis, Lower*). The right side labels band values: *KC:Upper 258.71, KC:Basis 249.39, KC:Lower 240.07*.  
- **Time Axis**: Months (May–Nov) and timeframe buttons (1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All) at the bottom.  
- **Status Bar**: Time (16:33:51 UTC+3) and “ADJ” (adjusted data) indicator.  


### **Left Toolbar**  
Icons for drawing tools (trendlines, Fibonacci), chart types (candlestick, line), text, and other features (e.g., Pine Editor, Trading Panel).  


### **Right Sidebar**  
Icons for notes, alerts, replay, and additional tools (e.g., layout, calendar, help).  


### **Purpose**  
The chart is used for technical analysis, with the KC indicator helping identify trend direction and volatility (bands expand/contract with price movement). The open panel allows customization of the KC’s parameters to suit trading strategies.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43586562958/original/F2-bkAzOjMdBL6eiDJi-yqXl3ngpEKS_ig.png?1760621670)

**Описание:** This TradingView chart displays **Apple Inc. (NASDAQ: AAPL)** on a **1-day (1D)** timeframe, with the Keltner Channels (KC) indicator settings panel open. Here’s a detailed breakdown:  


### **Top Bar & Header**  
- **Left**: Zoom controls (`+`/`-`), timeframe selector (`D` for daily), and indicator toggle.  
- **Middle**: `Indicators` (dropdown), `Alert`, `Replay`, and navigation arrows.  
- **Right**: `TradingView` dropdown, market data (`M`/`S`), theme/settings icons, and `Publish` button.  


### **Chart Header**  
- Ticker: `Apple Inc · 1D · NASDAQ`  
- Price data: `O248.25 H248.38 L246.18 C247.19 -2.16 (-0.86%)` (open, high, low, close, change).  
- Currency: `USD` dropdown.  


### **Indicator Settings Panel (KC: Keltner Channels)**  
A modal window configures the KC indicator:  
- **Tabs**: `Inputs` (parameters), `Style` (current tab), `Visibility` (show/hide lines).  
- **Style Options**:  
  - `Upper`, `Basis`, `Lower`: Checkboxes (all enabled) to toggle lines; color picker (blue) and line style (solid) for each.  
  - `Background`: Checkbox (enabled) with a transparent pattern.  
- **Output Values**:  
  - `Precision`: Dropdown (set to `Default`).  
  - `Labels on price scale`: Checkbox (enabled) to show values on the y-axis.  
  - `Values in status line`: Checkbox (enabled) to display values in the chart’s status bar.  
- **Buttons**: `Defaults` (reset), `Cancel` (close without saving), `Ok` (apply changes).  


### **Chart Area**  
- **Main Chart**: Candlestick chart (green/red candles) with KC lines:  
  - `KC:Upper` (top blue line, ~258.73), `KC:Basis` (middle blue line, ~249.40), `KC:Lower` (bottom blue line, ~240.08).  
- **Y-Axis**: Price scale (185–260 USD).  
- **X-Axis**: Time (May–Nov, with monthly labels).  


### **Left Toolbar**  
Icons for drawing tools (trendline, Fibonacci, text), chart types (candlestick, line), and other functions (lock, globe, trash).  


### **Bottom Bar**  
- **Timeframe Selector**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (current: `1D`).  
- **Timestamp**: `16:33:59 UTC+3`.  
- **Tabs**: `Pine Editor` (script editor), `Trading Panel` (order entry).  


### **Right Sidebar**  
Icons for notes, alerts, chat, and additional tools (calendar, grid).  


### **Purpose**  
The chart analyzes Apple’s price action using Keltner Channels (a volatility-based indicator) to identify trends and potential reversals. The settings panel customizes the indicator’s appearance and data display.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

