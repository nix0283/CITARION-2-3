# Trend Strength Index

**URL:** https://www.tradingview.com/support/solutions/43000730926-trend-strength-index/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Trend Strength Index ](/support/solutions/43000730926-trend-strength-index/) # Trend Strength Index The Trend Strength Index indicator measures the tendency of a symbol to either trend steadily or to revert to its mean. The core idea behind TSI is that the more momentum a symbol has relative to its volatility, the more likely it is to follow a trend and less likely to revert to its mean. This indicator analyzes price momentum using the Pearson correlation coefficient, a normalized measure of the linear relationship between time series. Its output shows the correlation between the chart's closing prices and bar index values over a defined number of bars. A chart's bar index starts at 0 and increases by one for each successive bar. In other words, the bar index represents points on a straight line with a slope of 1. The correlation between this index and price data is a measure of momentum, as it reflects how steadily price moved compared to a consistent linear trend. Traders can use this indicator to gauge the strength and consistency of price activity over time: - A value near 1 shows that prices experienced relatively steady increases across successive bars, indicating high upward trend strength. - A value near -1 shows that prices experienced relatively steady decreases across successive bars, indicating high downward trend strength. - A value near 0 suggests a lack of trend strength, because prices did not demonstrate a steady positive or negative relationship with the bar index. Inputs Length The number of bars used to calculate the Trend Strength Index. Bullish/Bearish Color The colors that represent a positive trend and a negative trend, respectively. Changing the transparency of the color affects the gradient that colors the space between the main TSI plot and zero: the gradient starts fully transparent at zero and reaches the transparency specified in the input at 1 for the Bullish Color and -1 for the Bearish Color. Previous Previous Transaction fees in USD Next Next Triple EMA Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43494575683/original/ehZUVGLsSQupAodUs2-wwLlIaRJmxC_xYg.png?1719478877)

**Описание:** This TradingView chart displays **Adobe Inc. (NASDAQ)** on a **1-day (1D)** timeframe, with the following key elements:  


### 1. **Header & Price Data**  
- **Ticker & Exchange**: “Adobe Inc · 1D · NASDAQ” (identifies the stock and timeframe).  
- **Price Metrics**:  
  - `O217.59 H218.63 L213.00 C214.29` (Open, High, Low, Close for the current day).  
  - `-2.38 (-1.10%)` (daily change: price dropped $2.38, or 1.10%).  
- **Real-Time Price Boxes**:  
  - Red box: `214.57` (current bid/last traded price, red = price drop).  
  - Blue box: `214.75` (current ask price).  
  - Orange “Pre” box: `214.62` (previous day’s close).  
  - Red box: `214.29` (current day’s close).  


### 2. **Main Chart (Candlestick)**  
- **Candlestick Chart**: Shows price action over time (x-axis: months 2024; y-axis: price, 160–210+).  
  - Green candles = price increase; red = decrease.  
  - Recent trend: Sharp rise in June, followed by a pullback (current day’s red candle).  


### 3. **Technical Indicator (TSI)**  
- **TSI (True Strength Index)**: Below the main chart, with:  
  - `TSI 14 0.91` (indicator name, period, and current value).  
  - Purple line: TSI trend (measures momentum).  
  - Red dashed line: `-1.00` (oversold threshold); green dashed line: `0.00` (neutral).  
  - Light blue shading: Area above/below the TSI line (visual emphasis).  


### 4. **Timeframe & UI Controls**  
- **Timeframe Buttons**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (switch between timeframes).  
- **Additional Icons**:  
  - Calendar (date selector), gear (settings), “ADJ” (adjusted close toggle).  
  - Timestamp: `04:59:53 (UTC-4)` (current time).  


### 5. **Icons & Markers**  
- Green “E”/blue “D” icons: Likely mark events (e.g., earnings “E”, dividends “D”).  
- Purple lightning bolt: Highlights a specific segment (e.g., recent volatility).  


### Purpose  
The chart combines price action (candlesticks) with momentum (TSI) to analyze Adobe’s short-term trend, while UI controls enable timeframe adjustments and data customization.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582895562/original/cNuzMtzUleNIwaa4p7d2nNOzNCSJeck3qQ.png?1758892802)

**Описание:** This TradingView chart displays Apple Inc. (NASDAQ) on a 1-day timeframe. The main candlestick chart shows price action with green (bullish) and red (bearish) candles. Below it, a Trend Strength Index (TSI) indicator is visible as a purple line with shaded areas. A settings popup for the TSI indicator is open, showing tabs for Inputs (selected), Style, and Visibility. The Inputs tab contains: Length (set to 14), Bullish/Bearish Color selectors, Timeframe dropdown (set to \


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

