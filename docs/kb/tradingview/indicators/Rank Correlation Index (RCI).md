# Rank Correlation Index (RCI)

**URL:** https://www.tradingview.com/support/solutions/43000765570-rank-correlation-index-rci/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Rank Correlation Index (RCI) ](/support/solutions/43000765570-rank-correlation-index-rci/) # Rank Correlation Index (RCI) The Rank Correlation Index (RCI) is an oscillator that helps traders gauge the directional consistency of price movements. It evaluates how closely prices follow a **monotonic trend** within a given lookback period. Unlike momentum oscillators that rely on differences in price levels, the RCI measures the correlation between bar indices and price ranks, making it sensitive to the **relative ordering** of prices rather than their absolute values. Traders often use the RCI to identify potential turning points, analyze price momentum, and assess the persistence of trends. Calculation The RCI represents a scaled version of [Spearman's rank correlation coefficient](https://en.wikipedia.org/wiki/Spearman) between prices and bar indices over a lookback period. To calculate the RCI value, the indicator: - **Ranks the prices** by sorting them in ascending order. The position of each sorted price represents its initial rank. The lowest price has rank 0, and the rank of the highest price is N - 1, where N is the number of bars in the period. For example, if the analyzed prices are 10, 12, 15, and 12, their initial ranks are 0, 1, 3, and 2. - **Adjusts the ranks for ties**. If two or more prices are equal, it assigns each of them the average of their ordered positions as the final rank. For instance, the final ranks for the hypothetical prices shown in the previous step are 0, 1.5, 3, and 1.5, because the values with ranks 1 and 2 are equal, and the average of 1 and 2 is 1.5. - **Computes the correlation coefficient** between the sequences of price ranks and bar indices, then multiplies the value by 100. The result is an oscillator that moves between -100 and +100, where: - A value of +100 indicates that the prices consistently increased over the analyzed period - A value of -100 indicates that the prices consistently decreased over the period - A value near 0 indicates that the prices in the period have little to no directional consistency The indicator plots the RCI as a blue line, and it displays horizontal lines at the levels -80, 0, and +80. Values outside this range suggest strong upward or downward consistency across the period. Values that cross back into the range might indicate potential momentum shifts. If you specify a smoothing type in the "Settings/Inputs" tab, the indicator displays a yellow moving average on top of the RCI line. If the type is "SMA + Bollinger Bands", it also displays a green envelope to show standard deviation ranges above and below the average. Inputs Source The source series that the indicator uses to calculate the RCI. By default, it uses the symbol's closing prices. RCI Length The number of bars in the RCI calculation. Smaller values make the oscillator more responsive to minor fluctuations; larger values offer a smoother response for analyzing trends. Type Specifies the moving average type for smoothing the RCI, and whether the indicator includes Bollinger Bands in its display. The options are: - **None**: No smoothing - **SMA**: Simple Moving Average of the RCI - **SMA + Bollinger Bands**: SMA of the RCI, with Bollinger Bands plotted around it - **EMA**: Exponential Moving Average - **SMMA (RMA)**: Smoothed Moving Average - **WMA**: Weighted Moving Average - **VWMA**: Volume-Weighted Moving Average Length The length of the smoothing calculation, and of the Bollinger Bands when the indicator uses the "SMA + Bollinger Bands" option. BB StdDev The standard deviation multiplier. The value determines the width of the Bollinger Bands. This input is active only if the indicator uses the "SMA + Bollinger Bands" option. Previous Previous Pring's Special K Next Next Rate of Change (ROC) Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43584053827/original/bBtDvU8YO2YBzv12Jr3UgWrRkOtaPh7c7w.png?1759439068)

**Описание:** This TradingView chart displays the **Invesco QQQ Trust Series I (NASDAQ: QQQ)** on a **1-week (1W)** timeframe. Here’s a detailed breakdown of its elements:  


### 1. **Header & Symbol Info**  
- **Symbol & Exchange**: “QQQ, Invesco QQQ Trust Series I · 1W · NASDAQ” identifies the asset, timeframe, and exchange.  
- **Market Data**:  
  - `O599.11 H602.05 L597.41 C598.73 +2.76 (+0.46%)` shows the **Open (O)**, **High (H)**, **Low (L)**, **Close (C)**, and **daily change** (green/red for gains/losses).  
  - A red box on the right displays the current close price: `598.73`.  


### 2. **Price Chart (Candlestick)**  
- **Candlesticks**: Green (up days) and red (down days) represent weekly price action.  
- **Y-Axis (Price)**: Ranges from ~250 to 500, showing QQQ’s price trend over time.  
- **X-Axis (Time)**: Spans from November 2023 to November 2025, with monthly labels (Nov, Mar, May, etc.).  


### 3. **Indicator Panel (RCI)**  
Below the price chart, the **RCI (Relative Channel Index)** indicator is displayed:  
- **Label**: “RCI close 10” indicates a 10-period RCI (using closing prices).  
- **Lines**:  
  - **Blue line**: RCI value (current: `81.82`).  
  - **Yellow line**: “RCI-based MA” (moving average of RCI, current: `83.55`).  
- **Y-Axis (RCI Scale)**: Ranges from -100 to 100, with dashed horizontal lines at 0, ±60, and ±80 (common overbought/oversold levels).  
- **Background**: Light blue shading highlights the RCI’s range.  


### 4. **UI Elements**  
- **Timeframe Toggle**: “1W” (top-left) confirms the weekly view.  
- **TradingView Pro Badge**: Bottom-left “TV PRO” indicates a premium subscription.  
- **Settings Icon**: Bottom-right (gear) for chart configuration.  


### Purpose  
The chart analyzes QQQ’s weekly price trends (via candlesticks) and momentum (via RCI, a volatility-adjusted oscillator). Traders use this to identify overbought/oversold conditions, trend direction, and potential reversals.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43584053925/original/xkYmTC3NWyPVZKo0E-NZNR5jm31hqfJVcg.png?1759439092)

**Описание:** This is a **TradingView indicator settings panel** for the \


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

