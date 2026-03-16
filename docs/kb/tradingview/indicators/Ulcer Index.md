# Ulcer Index

**URL:** https://www.tradingview.com/support/solutions/43000773115-ulcer-index/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Ulcer Index ](/support/solutions/43000773115-ulcer-index/) # Ulcer Index The Ulcer Index, devised by Peter Martin in 1987 and published by Peter Martin and Byron McCann in 1989, is a volatility indicator that estimates **downside risk**. It gauges the depth and duration of relative price declines from previous highs over a defined lookback period. The indicator's name stems from the idea that price drops cause stress for most traders, stress being associated with stomach ulcers. Unlike volatility measures such as [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation), which capture both upside and downside volatility (risk), the Ulcer Index isolates **drawdowns** to provide an estimate of downside volatility for evaluating long positions. Traders often use the Ulcer Index to analyze the downside risk of an instrument and compare risk levels across instruments. Calculation The Ulcer Index measures the **root mean square** of drawdowns in price from the highest value over a selected lookback period. The calculation is as follows: Highest Price = Highest(Price, Length) DD = ((Price − Highest Price) / Highest Price) × 100 Mean Square DD = Sum(DD × DD, Length) / Length Ulcer Index = √(Mean Square DD) Where: - **Length** is the number of bars in the period - **Highest Price** is the highest price value in the period - **DD** is the percentage drawdown from the highest value on each bar - **Mean Square DD** is the average of squared drawdowns over the period - **Ulcer Index** is the square root of the average squared drawdown The resulting index provides a direct estimate of downside volatility over a lookback period: - Lower values indicate relatively stable or increasing prices with minimal drawdowns across the period - Higher values indicate larger, more sustained price declines over the period The indicator's value scales with the depth and persistence of drawdowns across the lookback period, with increasing emphasis on larger and more prolonged price drops. In addition to gauging the potential downside risk of an instrument, and comparing potential risks across multiple instruments, Peter Martin suggests substituting standard deviation with the Ulcer Index in other risk-related metrics. For example, the Ulcer Performance Index (UPI), also known as the Martin Ratio, is an alternative to the [Sharpe Ratio](https://www.tradingview.com/support/solutions/43000756107/) that measures risk-adjusted performance by dividing the average excess return by the Ulcer Index rather than standard deviation. Inputs Source The series of values for which to calculate the Ulcer Index. Length The number of bars in the lookback period. Timeframe Sets the timeframe that the indicator uses for its calculations. The "Wait for timeframe closes" checkbox below determines whether the indicator shows results only when a bar on the specified timeframe closes. See the [Leveraging multi-timeframe analysis](https://www.tradingview.com/support/solutions/43000591555-leveraging-multi-timeframe-analysis/) article to learn more. Previous Previous True Strength Index Next Next Ultimate Oscillator (UO) Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43593519265/original/RLxcLbGr8wfDVFj3BkvRmLXMqrbxUQgxLw.png?1764033040)

**Описание:** This TradingView chart displays **Bitcoin / U.S. Dollar (BTCUSD)** on the **Coinbase** exchange, with a **1-day (1D)** time frame. Here’s a detailed breakdown of its elements:  


### 1. **Header & Price Data**  
- **Title**: `Bitcoin / U.S. Dollar · 1D · Coinbase` identifies the asset, timeframe, and exchange.  
- **Price Metrics** (top-right, red text):  
  - `O88,264.00`: Opening price of the current candle.  
  - `H88,264.00`: Highest price of the current candle.  
  - `L87,835.39`: Lowest price of the current candle.  
  - `C88,069.83`: Closing price of the current candle.  
  - `-196.37 (-0.22%)`: Change in price (negative = decrease) and percentage change.  


### 2. **Main Chart (Candlestick Chart)**  
- **Type**: Candlestick chart (green = bullish, red = bearish candles) showing Bitcoin’s price action over time.  
- **Y-Axis (Right)**: Price scale (e.g., 80,000.00, 90,000.00, 100,000.00, 130,000.00) to measure price levels.  
- **Trend**: The chart shows a recent downward trend (red candles dominate the right side), with a current close at `88,069.83`.  


### 3. **Ulcer Index (Lower Chart)**  
- **Label**: `Ulcer Index close 14` (blue text) identifies the indicator.  
- **Purpose**: Measures downside risk (volatility of price drops) relative to a recent high.  
- **Chart Details**:  
  - **Line**: Blue line tracking the Ulcer Index value over time.  
  - **Shaded Area**: Light blue fill under the line for visual emphasis.  
  - **Y-Axis (Right)**: Scale (0.00 to 16.00) for the Ulcer Index.  
  - **Current Value**: `14.74` (blue box, top-right of the lower chart) indicates elevated downside risk (higher values = more severe recent drawdowns).  


### 4. **UI Elements**  
- **Time Frame Label**: `1D` (top-left) confirms the daily timeframe.  
- **TradingView Pro Logo**: Bottom-left (`TV PRO`) indicates a premium subscription.  
- **Settings Icon**: Bottom-right (gear symbol) for chart configuration (e.g., indicators, timeframes, styles).  


### 5. **Time Axis (X-Axis)**  
- Labels: `Jul`, `Aug`, `Sep`, `Oct`, `Nov` (bottom) show the time period covered (July–November).  


### Summary  
This chart combines a candlestick price chart (for Bitcoin’s price action) with the Ulcer Index (for downside risk measurement) to analyze Bitcoin’s recent performance and volatility. The UI elements (price data, indicator labels, time frame, settings) provide context for trading analysis.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43593519470/original/lp_VXHA-V4z-7kHSQOn3lvnYKbSHW1BGMg.png?1764033155)

**Описание:** This is a **TradingView configuration modal for the \


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

