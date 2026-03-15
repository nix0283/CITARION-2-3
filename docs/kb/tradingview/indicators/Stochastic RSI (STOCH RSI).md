# Stochastic RSI (STOCH RSI)

**URL:** https://www.tradingview.com/support/solutions/43000502333-stochastic-rsi-stoch-rsi/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Stochastic RSI (STOCH RSI) ](/support/solutions/43000502333-stochastic-rsi-stoch-rsi/) # Stochastic RSI (STOCH RSI) Definition The [Stochastic RSI](https://www.tradingview.com/scripts/stochasticrsi/) indicator (Stoch RSI) is essentially an indicator of an indicator. It is used in technical analysis to provide a stochastic calculation to the RSI indicator. This means that it is a measure of RSI relative to its own high/low range over a user defined period of time. The Stochastic RSI is an oscillator that calculates a value between 0 and 1 which is then plotted as a line. This indicator is primarily used for identifying overbought and oversold conditions. History The Stochastic RSI (Stoch RSI) indicator was developed by Tushard Chande and Stanley Kroll. They introduced their indicator in their 1994 book The New Technical Trader. Calculation In this example, a very common 14 Period Stoch RSI is used. Stoch RSI = (RSI - Lowest Low RSI) / (Highest High RSI - Lowest Low RSI) Here are some approximate benchmark levels: 14 Day Stoch RSI = 1 when RSI is at its highest level in 14 Days. 14 Day Stoch RSI = .8 when RSI is near the high of its 14 Day high/low range. 14 Day Stoch RSI = .5 when RSI is in the middle of its 14 Day high/low range. 14 Day Stoch RSI = .2 when RSI is near the low of its 14 Day high/low range. 14 Day Stoch RSI = 0 when RSI is at its lowest level in 14 Days. The basics It is important to remember that the Stoch RSI is an indicator of an indicator making it two steps away from price. RSI is one step away from price and therefore a stochastic calculation of the RSI is two steps away. This is important because as with any indicator that is multiple steps away from price, Stoch RSI can have brief disconnects from actual price movement. That being said, as a range bound indicator, the Stoch RSI's primary function is identifying crossovers as well as overbought and oversold conditions. What to look for Overbought/Oversold Overbought and Oversold conditions are traditionally different than the RSI. While RSI overbought and oversold conditions are traditionally set at 70 for overbought and 30 for oversold, Stoch RSI are typically .80 and .20 respectively. When using the Stoch RSI, overbought and oversold work best when trading along with the underlying trend. During an uptrend, look for oversold conditions for points of entry. During a downtrend, look for overbought conditions for points of entry. Summary When using Stoch RSI in technical analysis, a trader should be careful. By adding the Stochastic calculation to RSI, speed is greatly increased. This can generate many more signals and therefore more bad signals as well as the good ones. Stoch RSI needs to be combined with additional tools or indicators in order to be at its most effective. Using trend lines or basic chart pattern analysis can help to identify major, underlying trends and increase the Stoch RSI's accuracy. Using Stoch RSI to make trades that go against the underlying trend is a dangerous proposition. Inputs K The time period to be used in calculating the %K. 3 is the default. D % D = Percent of Deviation between price and the average of previous prices (Momentum). The time period to be used in calculating the %D. 3 is the default. RSI Length The time period to be used in calculating the RSI Stochastic Length The time period to be used in calculating the Stochastic RSI Source Determines what data from each bar will be used in calculations. Close is the default. Style K Can toggle the visibility of the %K as well as the visibility of a price line showing the actual current value of the %K. Can also select the %K Line's color, line thickness and visual style (Line is the Default). D Can toggle the visibility of the %D as well as the visibility of a price line showing the actual current value of the %D. Can also select the %D Line's color, line thickness and visual style (Line is the Default). Upper Band Can toggle the visibility of a line indicating overbought levels. Can also select the line’s value, line thickness, value and visual type (dashes is the default). Lower Band Can toggle the visibility of a line indicating oversold levels. Can also select the line’s value, line thickness, value and visual type (dashes is the default). Background Toggles the visibility of a Background color within the Bands. Can also change the Color itself as well as the opacity. Precision Sets the number of decimal places to be left on the indicator's value before rounding up. The higher this number, the more decimal points will be on the indicator's value. Previous Previous Stochastic Momentum Index (SMI) Next Next Supertrend Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582894991/original/99u3XHMWX63MtlUBjemp4NslCAcD3BYZqw.png?1758892660)

**Описание:** This TradingView interface displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with a **Stoch RSI indicator configuration panel** open. Here’s a detailed breakdown:  


### 1. **Top Toolbar**  
- **Left Icons**: Zoom (magnifying glass), timeframes (1D, 5D, 1M, etc.), and chart type toggles (candlestick, line, etc.).  
- **Indicators Dropdown**: For adding technical indicators.  
- **Alert/Replay**: Set price alerts or replay historical price action.  
- **TradingView Menu**: Access account/settings.  
- **Publish Button**: Share the chart.  


### 2. **Chart Header**  
- **Symbol Info**: *“Apple Inc · 1D · NASDAQ”* with real-time data: *O253.21 H257.17 L251.71 C256.87 +4.56 (+1.81%)*.  
- **Currency**: *USD* (dropdown for currency selection).  


### 3. **Main Chart Area**  
- **Candlestick Chart**: Shows Apple’s price action (green = up, red = down) over months (May–Aug 2025, with 2026 preview).  
- **Stoch RSI Indicator**: Below the main chart, with two lines (K: blue, D: orange) and a shaded “overbought/oversold” zone (light blue, 0–100 scale).  


### 4. **Stoch RSI Configuration Panel**  
A modal window for customizing the Stoch RSI indicator:  
- **Tabs**: *Inputs* (active), *Style*, *Visibility*.  
- **Input Fields**:  
  - *K*: 3 (fast stochastic period).  
  - *D*: 3 (slow stochastic period).  
  - *RSI Length*: 14 (RSI calculation period).  
  - *Stochastic Length*: 14 (stochastic calculation period).  
  - *RSI Source*: *Close* (dropdown for price source).  
- **Calculation Section**:  
  - *Timeframe*: *Chart* (uses the main chart’s timeframe).  
  - *Wait for timeframe closes* (checkbox, ensures calculations use closed candles).  
- **Input Values Section**:  
  - *Inputs in status line* (checkbox, displays settings in the chart’s status bar).  
- **Buttons**: *Defaults* (reset to default), *Cancel*, *Ok* (apply changes).  


### 5. **Left Sidebar**  
Icons for tools (drawing, indicators, alerts, etc.) and a *“PRO”* badge (TradingView Pro feature).  


### 6. **Bottom Toolbar**  
- **Timeframe Buttons**: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, *All* (select chart period).  
- **Pine Editor/Trading Panel**: Tabs for scripting (Pine Script) or trading tools.  


### 7. **Right Sidebar**  
Icons for notes, alerts, chat, and other features (e.g., chart style, calendar).  


### 8. **Status Bar**  
- Time: *09:17:07 UTC-4* (current time).  
- *ADJ*: Adjusted price (if applicable).  


This layout enables traders to analyze price trends, customize technical indicators, and manage chart settings—all core to technical analysis on TradingView.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582895048/original/i4_PzjVL17NAwmvfq2Ru93QNnRE96RDjIA.png?1758892675)

**Описание:** This TradingView chart displays **Apple Inc. (NASDAQ: AAPL)** on a **1-day (1D)** timeframe, with the Stoch RSI indicator settings panel open. Here’s a detailed breakdown:  


### **Top Bar & Header**  
- **Left**: Zoom controls (+/-), timeframe selector (\


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

