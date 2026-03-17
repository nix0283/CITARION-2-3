# Envelope (ENV)

**URL:** https://www.tradingview.com/support/solutions/43000502260-envelope-env/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Envelope (ENV) ](/support/solutions/43000502260-envelope-env/) # Envelope (ENV) Definition [Moving Average Envelopes (ENV)](https://www.tradingview.com/scripts/envelope/) are a banded indicator. ENV displays an upper envelope above a basis line and a lower envelope below the basis line. The basis line is a moving average, either a simple moving average or an exponential moving average. The envelopes are set a (user defined) percentage away from the basis line. Envelopes are a good indicator for trend identification as well as identifying overbought and oversold conditions. Calculation A Moving Average Envelope (ENV) is actually fairly simple to calculate. For this example we will use a 20 Period SMA with 10% Envelopes: Basis = 20 Period SMA Upper Envelope = 20 Period SMA + (20 Period SMA x 0.1) Lower Envelope = 20 Period SMA - (20 Period SMA x 0.1) The basics Moving Average Envelopes (ENV) are a trend following indicator. Because moving averages lag behind price, the envelopes will as well. That being said, any price movements that break through either of the envelopes should not go unnoticed. ENV is designed to have the majority of price action occur within the envelopes. Therefore, when price breaks through, this is a sign of strength and can indicate a significant price move. For example, in an strong trend (in either direction) a breakthrough above the upper envelope may indicate that the uptrend is strengthening and will continue. Another example is that during a sideways trend, a breakthrough above the upper envelope may signal an overbought condition leading to price falling back within the envelopes. As with many indicators, the trick to using ENV efficiently and effectively is using the correct parameters. This is the difficult part. This mostly comes by experimentation and experience. Historical analysis can also help the technical analyst to discover historical levels for a particular security. Another technique is overlaying several Moving Average Envelopes onto each other and setting the envelopes varying percentages away. This can give the technical analyst additional breakthrough points to consider. What to look for Trend Confirmation Frequently, during a strong, clearly defined trend, a breakthrough into overbought or oversold territory is a sign of strength. This can be used to confirmed the likelihood of a continuing trend. During a Bullish Trend, a breakthrough above the upper envelope can be seen as a sign of strength and the uptrend is likely to continue. During a Bearish Trend, a breakthrough below the lower envelope can be seen as a sign of strength and the downtrend is likely to continue. Overbought and Oversold When a market is choppy or trading sideways, Moving Average Envelopes can be useful for identifying overbought and oversold conditions. These conditions can typically lead to price corrections where price moves back towards the moving average. Summary Despite having a very simple premise, Moving Average Envelopes (ENV) can actually be quite effective. Being able to help identify trends as well as overbought and oversold conditions is a valuable trait in an indicator and one that can greatly help technical analysts. When combined with additional technical analysis tools such as pattern analysis or momentum indicators, ENV can become an integral part of a sound trading strategy. Inputs Length The time period to be used in calculating the MA which creates the base for the Upper and Lower Envelopes (20 is the default). Percent The percentage to be applied to the bands. Source Determines what data from each bar will be used in calculations. Close is the default. Exponential Determines if a simple or exponential moving average will be used for the basis. STYLE Basis Can toggle the visibility of the Basis as well as the visibility of a price line showing the actual current value of the Basis. Can also select the Basis' color, line thickness and line style. Upper Can toggle the visibility of the Upper Band as well as the visibility of a price line showing the actual current value of the Upper Band. Can also select the Upper Band's color, line thickness and line style. Lower Can toggle the visibility of the Lower Band as well as the visibility of a price line showing the actual current value of the Lower Band. Can also select the Lower Band's color, line thickness and line style. Background Toggles the visibility of a Background color within the Bands. Can also change the Color itself as well as the opacity. Previous Previous Elder's Force Index (EFI) Next Next Exponential Moving Average Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43586550989/original/oKj3xpENi5du7X6gMxAS4-oH1A9pJsl24w.png?1760619150)

**Описание:** This TradingView image displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with an open \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43586551072/original/fGACzDs9--0kgn3lIPn4cDHlllstH9-gPA.png?1760619165)

**Описание:** This TradingView screenshot displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with the **Envelope (Env) indicator** open in a settings modal. Here’s a detailed breakdown:  


### 1. **Top Navigation Bar**  
- **Left**: Zoom in/out (+/-), timeframes (D for daily), and indicator/alert controls.  
- **Middle**: *Indicators* (dropdown), *Alert*, *Replay* (backtesting), and navigation arrows.  
- **Right**: *TradingView* (account), market data (M/M/S), refresh, settings, screenshot, and *Publish* (share chart).  


### 2. **Chart Header**  
- **Symbol/Timeframe**: *Apple Inc · 1D · NASDAQ* (daily candlestick).  
- **Price Data**: Open (O: 249.49), High (H: 251.82), Low (L: 247.47), Close (C: 249.34), +1.57 (+0.63%) gain.  
- **Currency**: *USD* (dropdown).  


### 3. **Indicator Settings Modal (Env)**  
A pop-up for configuring the Envelope indicator, with 3 tabs: *Inputs* (active), *Style* (selected), *Visibility*.  

#### **Style Tab (Current)**  
- **Checkboxes**: *Basis* (orange line, checked), *Upper* (blue line, checked), *Lower* (blue line, checked), *Background* (checked, gray pattern).  
- **Color/Line Style**: Color swatches (orange/blue/gray) and line-style toggles (solid/wavy) for each component.  
- **Output Values**:  
  - *Precision*: Dropdown (set to “Default”).  
  - *Labels on price scale*: Checked (displays values on the y-axis).  
  - *Values in status line*: Checked (shows values in the chart’s status bar).  
- **Buttons**: *Defaults* (reset), *Cancel*, *Ok* (apply changes).  


### 4. **Chart Area**  
- **Candlesticks**: Green (up) and red (down) bars show price action over time (May–Nov).  
- **Envelope Lines**:  
  - *Env:Upper* (blue, 277.94) – top band.  
  - *Env:Basis* (orange, 252.68) – middle moving average.  
  - *Env:Lower* (blue, 227.41) – bottom band.  
- **Y-Axis**: Price scale (170–280 USD).  
- **X-Axis**: Time (May–Nov) with a timeline.  


### 5. **Left Toolbar**  
Icons for drawing tools (trendlines, Fibonacci), chart types (candlestick, line), and other features (text, zoom, Pine Editor, etc.).  


### 6. **Bottom Bar**  
- **Timeframe Selector**: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, *All* (current: 1D).  
- **Timestamp**: 15:52:02 UTC+3.  
- **Tabs**: *Pine Editor* (scripting), *Trading Panel* (order entry).  


### 7. **Right Sidebar**  
Icons for notes, alerts, patterns, chat, and other tools (e.g., calendar, grid).  


### Purpose  
The chart analyzes Apple’s daily price action with the Envelope indicator (to identify overbought/oversold levels). The modal customizes the indicator’s appearance and data display.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

