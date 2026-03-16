# Percentage Price Oscillator (PPO)

**URL:** https://www.tradingview.com/support/solutions/43000502346-percentage-price-oscillator-ppo/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Percentage Price Oscillator (PPO) ](/support/solutions/43000502346-percentage-price-oscillator-ppo/) # Percentage Price Oscillator (PPO) The Percentage Price Oscillator (PPO) is a momentum indicator that measures the relative difference between two moving averages. Similar to the [MACD](https://www.tradingview.com/support/solutions/43000502344-macd-moving-average-convergence-divergence/) indicator, the PPO consists of three components: the main oscillator, a smoothed signal line, and a histogram line that represents the difference between those values. While the MACD indicator measures the difference between two moving averages in absolute price units, the PPO expresses the difference between two averages as a **percentage** of the slower average. The PPO is thus a relative measure that is less sensitive to the actual scale of price changes, offering more consistency for comparing momentum across history or across securities. Traders often use the PPO in a similar way to the MACD: to analyze short-term momentum, identify mean reversion or trends, and spot divergences or other patterns. Calculation The formula of the PPO closely resembles that of the MACD. The only difference is that the PPO computes the percentage distance from the slower average to the faster average, for a more consistent scale across time. The calculation is as follows: PPO = (Fast MA − Slow MA) / Slow MA × 100 Signal = Moving average of PPO Histogram = PPO − Signal Where: - **Fast MA** is the moving average with the lowest length - **Slow MA** is the moving average with the highest length The indicator plots the PPO and signal values as lines, and the histogram values as color-coded columns. It also displays a horizontal zero line to distinguish positive and negative values. The typical interpretation of the indicator is similar to that of the MACD: - A PPO value above 0 indicates that the fast MA is greater than the slow MA, suggesting average upward momentum or a potential uptrend. A PPO value below 0 indicates the opposite. - A histogram value above 0, or the PPO moving above the signal line, suggests that upward momentum is increasing or downward momentum is decreasing. A histogram value below 0 or the PPO moving below the signal line suggests the opposite. - Divergences between PPO and price movements might help to identify turning points or shifts in trends. For example, falling peaks in the PPO while the price rises might signal the exhaustion of an uptrend, while rising dips in the PPO as the price falls might signal the exhaustion of a downtrend. - Divergences between the PPO and the histogram can indicate changes in short-term momentum. For example, falling histogram values as the PPO rises might suggest that upward momentum is weakening, while rising histogram values as the PPO falls might suggest that downward momentum is weakening. Inputs Source The series of values for which to calculate the oscillator. Fast length The length value for the fast moving average. Slow length The length value for the slow moving average. Signal length The length value for the moving average of the PPO (signal line). Oscillator MA type Specifies the type for the fast and slow averages in the PPO calculation. Select "EMA" to use two [exponential moving averages](https://www.tradingview.com/support/solutions/43000592270-exponential-moving-average/), or "SMA" to use [simple moving averages](https://www.tradingview.com/support/solutions/43000696841-simple-moving-average/) instead. Signal MA type Specifies which type of moving average the indicator applies to the PPO to calculate the signal line. Select "EMA" for an exponential moving average, or "SMA" for a simple moving average. Timeframe Sets the timeframe that the indicator uses for its calculations. The "Wait for timeframe closes" checkbox below determines whether the indicator shows results only when a bar on the specified timeframe closes. See the [Leveraging multi-timeframe analysis](https://www.tradingview.com/support/solutions/43000591555-leveraging-multi-timeframe-analysis/) article to learn more. Previous Previous Parabolic SAR (SAR) Next Next Percentage Volume Oscillator (PVO) Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43595982115/original/u7hXH4qUiptt68okb8Hntrf3OHzSh99RVg.png?1765217552)

**Описание:** This TradingView chart displays **PayPal Holdings (PYPL)** on the **NASDAQ** exchange with a **1-day (1D)** time frame. Here’s a detailed breakdown:  


### 1. **Top Header & Price Data**  
- **Symbol/Exchange/Timeframe**: `PYPL · 1D · NASDAQ` identifies the stock, exchange, and chart period.  
- **Price Metrics**:  
  - `O278.13` (Open), `H279.67` (High), `L276.70` (Low), `C277.38` (Close) show the day’s price action.  
  - `−1.40 (−0.50%)` indicates the stock closed down $1.40 (0.50% lower) from the prior day.  


### 2. **Main Price Chart (Candlestick)**  
- **Candlesticks**: Green candles = price closed higher than open; red = closed lower. They visualize daily price movements (open, high, low, close) over time.  
- **Y-Axis (Right)**: Price scale (e.g., 200.00, 220.00, ..., 280.00) for the stock’s price.  
- **Trend**: The chart shows an overall upward trend from July to December, with recent consolidation near $277.38.  


### 3. **PPO (Percentage Price Oscillator) Indicator**  
Below the main chart, the **PPO** (a momentum indicator) is displayed with three components:  
- **PPO Line (Blue)**: Measures momentum (difference between two moving averages, expressed as a percentage).  
- **Signal Line (Orange)**: A smoothed version of the PPO (e.g., 9-period EMA) for trend confirmation.  
- **Histogram (Bars)**: The gap between PPO and Signal Line (green = PPO > Signal; red = PPO < Signal), showing momentum strength.  

- **PPO Values**:  
  - `PPO 1.63%` (blue line’s current value).  
  - `Signal line 1.72%` (orange line’s value).  
  - `Histogram −0.09%` (bar value, indicating PPO is slightly below the Signal Line).  


### 4. **UI Elements & Time Axis**  
- **Time Axis (Bottom)**: Months (Jul–Dec) mark the chart’s time range.  
- **TradingView Pro Logo**: Indicates a paid subscription.  
- **Settings Icon (Bottom Right)**: For chart customization (e.g., indicators, timeframes).  


### Purpose of Each Element  
- **Candlestick Chart**: Analyze price trends, support/resistance, and daily volatility.  
- **PPO Indicator**: Identify momentum shifts (e.g., crossovers of PPO/Signal Line signal trend changes) and overbought/oversold conditions.  
- **Histogram**: Visualize momentum strength (taller bars = stronger momentum).  


This chart combines price action with a momentum indicator to help traders assess trend direction, momentum, and potential reversals.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43595982754/original/CxFep2M7BLIxiU0CNgZGliDFVepcrJY94w.png?1765217746)

**Описание:** This is a **TradingView indicator settings modal** (for an indicator named \


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

