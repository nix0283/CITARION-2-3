# BBTrend

**URL:** https://www.tradingview.com/support/solutions/43000726749-bbtrend/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ BBTrend ](/support/solutions/43000726749-bbtrend/) # BBTrend BBTrend is an indicator developed by John Bollinger, the creator of Bollinger Bands. Designed to be used in conjunction with the regular Bollinger Bands, this indicator analyzes the strength and the direction of the trend based on two separate Bollinger Bands calculations, a long one and a short one. The BBTrend indicator presents the resulting calculation as a histogram. When the BBTrend value is above zero, it indicates a bullish trend, whereas a reading below zero signifies a bearish trend. How far is the value removed from zero reflects the strength or momentum behind the trend. Calculation The BBTrend is calculated based on the bands of two different Bollinger Bands instances, a short one and a long one. The formula is: BBTrend = (math.abs(shortLower - longLower) - math.abs(shortUpper - longUpper)) / shortMiddle * 100 Where shortLower , shortMiddle , and shortUpper are the components of the short Bollinger Bands, while longLower and longUpper are the bands from the long Bollinger Bands calculation. The length of both short and long Bollinger Bands can be changed in the indicator's Inputs. The intensity of the color of each separate column in the histogram reflects the direction in which the BBTrend moves: a more intense green or red column indicates that the current value of BBTrend is moving away from 0, while a dimmer green or red shows that the BBTrend is trending towards 0, while still being above it (for green columns) or below it (for red ones). Inputs Short BB Length The length of the short Bollinger Bands calculation used while calculating the BBTrend. Long BB Length The length of the long Bollinger Bands calculation used while calculating the BBTrend. StdDev The Standard Deviation of both Bollinger Bands calculations used while calculating the BBTrend. Previous Previous Balance of Power (BOP) Next Next Bollinger Bands (BB) Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43482727219/original/9toEo8UQcV8rHaEtxlCfC05USSAl2ugd1A.png?1714486919)

**Описание:** This TradingView chart displays **Tesla, Inc. (TSLA)** on the **NASDAQ** exchange, with a **1-day (1D)** time frame. Here’s a detailed breakdown of its elements:  


### 1. **Header & Ticker Info**  
- **Ticker & Exchange**: “Tesla Inc · 1D · NASDAQ” identifies the stock, time frame, and exchange.  
- **Price Data**: “O 173.33 H 174.99 L 172.65 C 174.43 +0.93 (+0.54%)” shows the day’s open, high, low, close, and percentage change (green = gain).  
- **Currency**: “USD” (dropdown) confirms the price currency.  


### 2. **Main Price Chart (Candlestick)**  
- **Candlesticks**: Red/green bars represent price action (green = close > open; red = close < open).  
- **Price Labels**:  
  - Red box: “174.43” (current price) with “0.02” (small delta, likely a real-time update).  
  - Blue box: “174.45” (possibly a reference price, e.g., previous close or target).  
- **Price Axis (Right)**: Vertical scale (164–200 USD) for price levels.  
- **Time Axis (Bottom)**: Dates (Dec 2023–May 2024) mark the chart’s time range.  
- **Annotations**:  
  - Green “E”/blue “D” ( Feb): Likely custom labels (e.g., events or analysis points).  
  - Purple “⚡E” (May): Another custom annotation (e.g., a signal or event).  


### 3. **Volume/Indicator Panel (Below Price Chart)**  
- **BBTrend Indicator**: A volume-based or trend indicator with:  
  - Green bars (Dec–Jan): Positive trend.  
  - Red bars (Feb–May): Negative trend.  
  - Value: “BBTrend 20 50 2 −3.64” (parameters: 20/50/2; current value: -3.64, red = bearish).  
- **Y-Axis (Right)**: Scale (-8 to 8) for the indicator’s value.  


### 4. **Time Frame & Settings Bar (Bottom)**  
- **Time Frames**: Buttons (1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All) to switch chart periods.  
- **Icons**:  
  - Calendar (📅): Date range selector.  
  - Settings (⚙️): Chart configuration (e.g., indicators, styles).  
- **Timestamp**: “10:16:33 (UTC-4)” shows the last update time.  
- **“ADJ”**: Indicates the chart uses adjusted prices (accounts for splits/dividends).  


### Purpose of Elements  
- **Candlesticks**: Visualize price movement (open, high, low, close) over time.  
- **Indicators (BBTrend)**: Analyze trend strength/direction (green = bullish, red = bearish).  
- **Time Frames**: Compare price action across different horizons (e.g., 1D for daily, 1M for monthly).  
- **Annotations/Labels**: Mark key events, analysis points, or price targets.  


This layout helps traders analyze Tesla’s price trends, volume, and technical indicators to make informed decisions.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582451864/original/jqyrmNVsOwyrLEYHiHYojWjziBsa0XR2Xw.png?1758723065)

**Описание:** This TradingView chart displays Apple Inc. (NASDAQ) on a 1-day timeframe. The main candlestick chart shows price action with green (up) and red (down) candles. Below it, a volume histogram (teal bars) and the \


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

