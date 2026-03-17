# Negative Volume Index (NVI)

**URL:** https://www.tradingview.com/support/solutions/43000773005-negative-volume-index-nvi/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Negative Volume Index (NVI) ](/support/solutions/43000773005-negative-volume-index-nvi/) # Negative Volume Index (NVI) The Negative Volume Index (NVI), invented by Paul L. Dysart Jr. in the 1930s and adapted by Norman G. Fosback in the 1970s, is a trend indicator that accumulates the price change percentages from only the bars where volume **decreases** while ignoring the changes from bars where volume increases. The logic behind the NVI and its counterpart, the [Positive Volume Index (PVI)](https://www.tradingview.com/support/solutions/43000773006/), is based on the assumption that most market participants trade during high-volume periods, while a smaller set of more informed investors — sometimes referred to as "smart money" — is more active during low-volume periods. Traders often analyze the NVI, alongside a moving average, on market indices to identify underlying trends based on the price movements that occur as volume decreases. Calculation Paul Dysart's original NVI was an indicator of broad market activity. It accumulated net advances in the market on days where volume decreased relative to the previous day. Norman Fosback adapted the concept to apply a Negative Volume Index to any market index with volume data. Instead of using advances and declines, Fosback's version of the NVI accumulates percentage changes in price. The calculation is as follows: - Set the initial value of the NVI. The value defines the scale of the NVI, but it does not affect the indicator's behavior. The most common initial values are 1000, 100, and 1. This indicator uses 1000. - If the volume on the current bar is less than that of the previous bar, add the current change percentage in close prices to the previous NVI value. - If the volume on the current bar is greater than or equal to that of the previous bar, do not add the bar's change percentage to the NVI. The result is a cumulative series that updates only on lower-volume bars, providing potential insights into how markets behave as trading activity decreases. Fosback derived trading signals by comparing the NVI to a one-year moving average. The NVI trending above the average suggests a possible underlying bullish trend in the market, and a value below the average suggests the opposite. The NVI is primarily intended for analyzing market activity on major market indices, but you can apply this indicator to any chart that has volume data. Inputs EMA length The length for the smoothing factor of the NVI-based [exponential moving average (EMA)](https://www.tradingview.com/support/solutions/43000592270/). The default is 255, which corresponds to approximately one year on a daily equities chart. Timeframe Sets the timeframe that the indicator uses for its calculations. The "Wait for timeframe closes" checkbox below determines whether the indicator shows results only when a bar on the specified timeframe closes. See the [Leveraging multi-timeframe analysis](https://www.tradingview.com/support/solutions/43000591555-leveraging-multi-timeframe-analysis/) article to learn more. Previous Previous Multi-Time Period Charts indicator Next Next Net Volume Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43593136328/original/tMVlJfQbh15hg0cCBXK_Da_O0s1dHRoiSQ.png?1763764731)

**Описание:** This TradingView chart displays the **SPDR S&P 500 ETF Trust (SPY)** on a **1-day (1D)** timeframe, traded on **NYSE Arca**. Here’s a detailed breakdown of its elements:  


### 1. **Header & Price Data**  
- **Symbol/Timeframe**: “SPDR S&P 500 ETF Trust · 1D · NYSE Arca” identifies the asset, timeframe, and exchange.  
- **Price Metrics**:  
  - `O655.05` (Open), `H664.55` (High), `L650.85` (Low), `C659.03` (Close) = Daily price action.  
  - `+6.50 (+1.00%)` = Daily price change (green = gain).  


### 2. **Main Price Chart (Candlestick)**  
- **Candlesticks**: Red/green bars show daily price movements (green = close > open; red = close < open).  
- **Y-Axis (Right)**: Price scale (480.00–680.00) for SPY’s price.  
- **X-Axis (Bottom)**: Time (Sep–2021), tracking the 1D timeframe.  


### 3. **Volume/Indicator Subchart (NVI)**  
Below the main chart, a subchart displays the **Negative Volume Index (NVI)**:  
- **NVI Line (Blue)**: Tracks “smart money” activity (trades on low-volume days). Labeled “NVI 3,392,600.33” (current value).  
- **NVI-based EMA (Orange)**: Exponential Moving Average of NVI, labeled “NVI-based EMA 2,835,153.33” (current value).  
- **Y-Axis (Right)**: NVI scale (1.8M–3.2M) for the subchart.  


### 4. **UI Elements**  
- **TradingView Pro Badge**: Bottom-left logo indicates a Pro subscription.  
- **Timeframe/Exchange Icons**: Top-left (1D, NYSE Arca) confirm the chart’s settings.  
- **Refresh/Settings Icon**: Bottom-right (circle with arrow) for reloading or adjusting chart settings.  


### Purpose  
The chart analyzes SPY’s price trends (via candlesticks) and NVI (to gauge institutional/smart money behavior) over time, aiding technical analysis of the S&P 500 ETF.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43593136469/original/Z19UjZ8xGe6BNwPyKctdG0UyHQqzFp8hlA.png?1763764828)

**Описание:** This is a **TradingView indicator settings modal** for the \


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

