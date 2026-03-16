# Connors RSI (CRSI)

**URL:** https://www.tradingview.com/support/solutions/43000502017-connors-rsi-crsi/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Connors RSI (CRSI) ](/support/solutions/43000502017-connors-rsi-crsi/) # Connors RSI (CRSI) Definition [Connors RSI (CRSI)](https://www.tradingview.com/scripts/connorsrsi/) is a technical analysis indicator created by Larry Connors that is actually a composite of three separate components. The Relative Strength Index (RSI), developed by J. Welles Wilder, plays an integral role in Connors RSI. In fact, Wilder's RSI is used in two of the indicator's three components. The three components; The RSI, UpDown Length, and Rate-of-Change, combine to form a momentum oscillator. Connors RSI outputs a value between 0 and 100, which is then used to identify short-term overbought and oversold conditions. History Connors RSI was developed by Connors Research. Calculation There are three major components to Connors RSI - RSI = Standard RSI developed by Wilder. This is typically a short-term RSI. In this example it is a 3 Period RSI. - UpDown Length = The number of consecutive days that a security price has either closed up (higher than previous day) or closed down (lower than previous days). Closing up values represented in positive numbers and closing down is represented with negative numbers. If a security closes at the same price on back to back days, the UpDown Length is 0. Connors RSI then applies a short-term RSI to the UpDown Streak Value. In this example it is a 2 period RSI. - ROC = The Rate-of-Change. The ROC takes a user-defined look-back period and calculates a percentage of the number of values within that look back period that are below the current day price change percentage. The final CRSI calculation then simply finding the average value of the three components. CRSI(3,2,100) = [ RSI(3) + RSI(UpDown Length,2) + ROC(100) ] / 3 The basics Connors RSI (CRSI) uses the above formula to generate a value between 0 and 100. This is primarily used to identify overbought and oversold levels. Connor's original definition of these levels is that a value over 90 should be considered overbought and a value under 10 should be considered oversold. On occasion, signals occur during slight corrections during a trend. For example, when the market is in an uptrend, Connors RSI might generate short term sell signals. When the market is in a downtrend, Connors RSI might generate short term buy signals. A technical analyst should also be aware of the value of adapting or tweaking the Connor RSI. One of the issues with Connor RSI is that signals oftentimes occur early. For example, in an uptrend, a sell signal may present itself. However, the market continues to rise, thus a false signal. One potential safeguard against potential false signals would be combining the Connors RSI with additional technical analysis tools such as basic chart pattern analysis or additional indicators used to measure trend strength. Another issue worth noting regarding the Connor RSI, is the placement of the overbought and oversold thresholds levels. For some trading instruments, the thresholds for overbought may need to be raised even higher and for oversold even lower. For example 95 and 5 respectively. These levels should generally be set after research and historical analysis. Making sure thresholds are in the proper place, should also help to cut down on false signals. What to look for Connors RSI is designed to define overbought and oversold levels and therefore trade signals based on those levels. A bullish signal occurs when Connors RSI enters oversold territory. A bearish signal occurs when Connors RSI enters overbought territory. *As previously mentioned, signals occasionally occur in the opposite direction of an overall trend. Summary Connors RSI indicator is a tool that takes a well established indicator, The Relative Strength Index (RSI) and applies it to its own theories. It can be a good way to define overbought and oversold levels and identify possible trading opportunities. That being said, Connors RSI does have a tendency to produce false signals. Therefore an astute technical analyst should experiment with what parameters work best for the security being traded. Also, combining Connors RSI with additional indicators will potentially increase its efficiency. Inputs RSI Length The time period to be used in calculating the RSI. 3 is the default. UpDown Length Determines the time period of the UpDown RSI calculation, 2 is the default length. ROC Length The lookback for the ROC calculation. 100 is the default. Style CRSI Can toggle the visibility of the CRSI Line as well as the visibility of a price line showing the actual current value of the CRSI. Can also select the CRSI Line's color, line thickness and visual style (Line is the Default). Upper Band Can toggle the visibility of the Upper Band Line. Can also select the Upper Band Line's value, color, line thickness and line style. Lower Band Can toggle the visibility of the Lower Band Line. Can also select the Lower Band Line's value, color, line thickness and line style. Background Can toggle the visibility of the Background. Can also select the Background's color and opacity. Precision Sets the number of decimal places to be left on the indicator's value before rounding up. The higher this number, the more decimal points will be on the indicator's value. Previous Previous Commodity Channel Index (CCI) Next Next Coppock Curve Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582633823/original/j3GuS2zaO-d-c0KYYc7runQvF4ko72icYQ.png?1758796751)

**Описание:** This TradingView chart displays Apple Inc. (NASDAQ: AAPL) on a 1-day timeframe, showing a candlestick price chart and a Commodity Channel Index (CRSI) indicator panel. The price chart shows recent price action with green (up) and red (down) candlesticks, while the CRSI indicator below plots a blue line with a light blue shaded area (likely overbought/oversold zones).  

### Top Bar Elements:  
- **Left**: Zoom controls, timeframe selector (5m), and chart type toggle.  
- **Middle**: Indicators menu, chart layout options, alert, replay, and navigation buttons.  
- **Right**: TradingView logo, multiple chart tabs, theme options, and a \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582633841/original/QFjmGewDcKyLwyAlGA7czkn6mTjNUSSgCg.png?1758796769)

**Описание:** This TradingView image displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with the **Commodity Channel Index (CRSI)** indicator settings open. Here’s a detailed breakdown:  


### 1. **Top Navigation Bar**  
- **Left**: “AAPL” (ticker), “D” (daily timeframe), “5m” (timeframe dropdown), “Indicators” (indicator menu), “Alert” (alerts), “Replay” (chart replay).  
- **Right**: “TradingView” (logo), “M”/“S” (market/session toggles), “Publish” (share chart), and various icons (zoom, layout, camera, etc.).  


### 2. **Chart Header**  
- Ticker: *Apple Inc · 1D · NASDAQ*  
- Price data: *O255.22 H255.74 L251.04 C252.31 –2.12 (–0.83%)* (open, high, low, close, change).  


### 3. **Main Chart Area**  
- **Candlestick Chart**: Green/red candles show price action (green = close > open; red = close < open).  
- **CRSI Indicator**: A blue line (with bands) plots below the main chart, measuring momentum.  


### 4. **CRSI Settings Panel (Modal)**  
A pop-up window configures the CRSI indicator:  
- **Tabs**: *Inputs* (parameters), *Style* (current tab, for visual customization), *Visibility* (toggle on/off).  
- **Style Options**:  
  - *CRSI*: Blue line (checked, enabled).  
  - *Upper Band*: Gray dashed line at 70 (checked, enabled).  
  - *Middle Band*: Gray dashed line at 50 (checked, enabled).  
  - *Lower Band*: Gray dashed line at 30 (checked, enabled).  
  - *Background*: Light blue shaded area (checked, enabled).  
- **Output Values**:  
  - *Precision*: “Default” (dropdown for decimal places).  
  - *Labels on price scale*: Checked (shows values on the right price axis).  
  - *Values in status line*: Checked (displays values in the chart’s status bar).  
- **Buttons**: *Defaults* (reset to default), *Cancel* (close without saving), *Ok* (apply changes).  


### 5. **Left Sidebar (Tools)**  
Icons for drawing (line, trendline, text), chart type (candlestick, etc.), and other tools (zoom, lock, etc.).  


### 6. **Right Sidebar (Price Scale & Info)**  
- **Price Axis**: Numerical scale (224–256 USD) for the main chart.  
- **Icons**: Notes, clock (time), chat, and other utility icons.  


### 7. **Bottom Bar**  
- **Timeframe Tabs**: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, *All* (select chart period).  
- **Timestamp**: *06:38:27 UTC-4* (current time).  
- **Pine Editor/Trading Panel**: Tabs for script editing and trading tools.  


### Purpose  
The chart analyzes Apple’s daily price action with the CRSI indicator (to identify overbought/oversold conditions). The settings panel customizes the indicator’s appearance (colors, bands, labels) for clearer analysis.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

