# Kaufman's Adaptive Moving Average (KAMA)

**URL:** https://www.tradingview.com/support/solutions/43000773012-kaufman-s-adaptive-moving-average-kama/

---

- [ Help Center ](/) - / - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Kaufman's Adaptive Moving Average (KAMA) ](/support/solutions/43000773012-kaufman-s-adaptive-moving-average-kama/) # Kaufman's Adaptive Moving Average (KAMA) Kaufman's Adaptive Moving Average (KAMA), introduced by Perry J. Kaufman in 1995, is a moving average that dynamically adjusts its smoothing behavior to the relative noise or choppiness in market movements. Kaufman designed the indicator as a generalized trend-following solution based on the idea that faster averages are more useful for tracking trends when the market price is moving quickly in one direction, and slower averages are better for avoiding whipsaws during periods of choppiness and volatility. As such, KAMA follows the market price at a faster rate when movements are efficient and directional, and at a slower rate when movements are choppy or inefficient. Traders often analyze movements in KAMA to identify trends and choppy market conditions, and use the crossings between KAMA and price or other moving averages to find potential turning points and signals. Calculation At its core, KAMA uses the same general structure as an [exponential moving average (EMA)](https://www.tradingview.com/support/solutions/43000592270-exponential-moving-average/): MA = SC × Price + (1 − SC) × Previous MA Where: - **SC** is the **smoothing factor**, sometimes referred to as the smoothing constant, which is a value between 0 and 1 that controls the **rate** at which the moving average follows the market price. The lower the factor, the less sensitive the moving average becomes to short-term price changes. - **Previous MA** is the EMA value on the previous bar. A traditional EMA calculates a fixed smoothing factor of 2 / (length + 1), where the length value controls the period for which the average responds significantly to changes in price. By contrast, KAMA calculates a **dynamic** factor based on the estimated **efficiency** of market movements. Below are the steps that the indicator performs to calculate the smoothing factor. Calculate the Efficiency Ratio KAMA uses Kaufman's Efficiency Ratio (ER) to control its responsiveness. The ratio represents the absolute change in price over a period relative to the total bar-by-bar change (volatility) within that period: Change = Abs(Price − Price N bars ago) Volatility = Sum of Abs(Price − Price 1 bar ago) over N bars ER = Change / Volatility An ER value near 1 means that the total bar-by-bar change across the period is close to the overall change, indicating efficient price movement in one direction. A value near 0 means that the overall change is much smaller than the total bar-by-bar change, indicating choppy or inefficient movement over the period. Calculate initial smoothing factors KAMA uses two separate EMA smoothing factors to determine its smoothing response. One factor corresponds to the slowest response for inefficient price movements, and the other corresponds to the fastest response for efficient movements: Slow SC = 2 / (Slow Length + 1) Fast SC = 2 / (Fast Length + 1) Calculate the final smoothing factor The indicator determines the final smoothing factor by mixing the fast and slow smoothing factors based on the value of ER, then squaring the result: SC = (ER × (Fast SC - Slow SC) + Slow SC)² This smoothing factor causes the moving average to converge toward the market price at a faster rate when ER is high, and at a slower rate when ER is low. Squaring the factor significantly reduces the moving average's responsiveness during periods of choppy or inefficient price movement. Inputs Source The source series for which to calculate the adaptive moving average. ER length The number of bars to analyze for the Efficiency Ratio. Use a lower value to make the average's smoothing behavior change in response to only very recent price fluctuations, and a higher value to make the behavior responsive to fluctuations over a larger period. Fast length The length for the fast smoothing factor, which controls the fastest possible response of the moving average. Slow length The length for the slow smoothing factor, which controls the slowest possible response of the moving average. Timeframe Sets the timeframe that the indicator uses for its calculations. The "Wait for timeframe closes" checkbox below determines whether the indicator shows results only when a bar on the specified timeframe closes. See the [Leveraging multi-timeframe analysis](https://www.tradingview.com/support/solutions/43000591555-leveraging-multi-timeframe-analysis/) article to learn more. Previous Previous Ichimoku Cloud Next Next Keltner Channels (KC) Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43593143742/original/ZAMYkKllGyLuUZ71BudUdZ2I3q-oQ-ZF8w.png?1763770455)

**Описание:** This TradingView chart displays **Adobe Inc. (ADBE)** on the **NASDAQ** exchange with a **1-day (1D)** time frame. Here’s a detailed breakdown of its elements:  


### 1. **Header & Ticker Info**  
- **Ticker & Exchange**: “ADBE 1D · NASDAQ” identifies the stock (Adobe) and its exchange (NASDAQ).  
- **Market Data**:  
  - `O265.95` (Open), `H273.33` (High), `L265.67` (Low), `C271.49` (Close) = Daily price action.  
  - `+5.24 (+1.97%)` = Price change (green = gain).  
- **KAMA Indicator**: “KAMA 26 30 268.71” = Kaufman Adaptive Moving Average (a trend-following indicator) with parameters (26, 30) and current value (268.71).  


### 2. **Chart Area**  
- **Candlestick Chart**: Green/red candles represent daily price action (green = close > open; red = close < open).  
- **KAMA Line**: Blue line overlaying the candles, smoothing price trends to identify direction.  
- **Grid Lines**: Light gray lines for price (y-axis) and time (x-axis) reference.  


### 3. **Axes**  
- **Y-Axis (Price)**: Ranges from ~190 to 285, marking price levels.  
- **X-Axis (Time)**: Spans months (Jun–Dec), showing the 6+ month trend.  


### 4. **UI Elements**  
- **Close Button**: “×” (top-left) to dismiss the chart.  
- **TradingView Pro Badge**: “TV PRO” (bottom-left) indicates a premium subscription.  
- **Timeframe/Settings Icon**: “⚙️” (bottom-right) for adjusting chart settings (timeframe, indicators, etc.).  


### 5. **Trend Context**  
The chart shows a **long-term uptrend** (Jun–Dec), with the KAMA line confirming upward momentum. Recent price action (Nov–Dec) hovers near the KAMA line, suggesting potential support/resistance.  


This layout provides a clear view of price action, trend direction (via KAMA), and key market data for technical analysis.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43593143973/original/p43HP_RYx8FHwAJJBYKaaV0YvGTqiSU87w.png?1763770705)

**Описание:** This is a **TradingView indicator settings panel** for the \


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

