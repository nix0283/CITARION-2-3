# RCI Ribbon

**URL:** https://www.tradingview.com/support/solutions/43000765571-rci-ribbon/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ RCI Ribbon ](/support/solutions/43000765571-rci-ribbon/) # RCI Ribbon The RCI Ribbon indicator visualizes how the typical direction of price movements aligns across multiple periods by plotting a set of three [Rank Correlation Index (RCI)](https://www.tradingview.com/support/solutions/43000765570/) oscillators with different lookback lengths. The RCI helps traders gauge the directional consistency of price changes. It evaluates how closely prices follow a **monotonic trend** within a given lookback period. Unlike other momentum oscillators, the RCI measures the correlation between bar indices and price ranks, making it sensitive to the **relative ordering** of prices rather than their absolute values. By analyzing three RCI oscillators together, traders can see whether the direction of price changes is relatively consistent across multiple time periods, or if short-term directional shifts diverge from the longer-term structure. Calculation The RCI Ribbon relies on the same calculation as the standard [RCI](https://www.tradingview.com/support/solutions/43000765570/). Each oscillator represents a scaled version of Spearman's rank correlation coefficient between prices and bar indices over one of the specified lookback periods. To calculate the RCI value, the indicator: - **Ranks the prices** by sorting them in ascending order. The position of each sorted price represents its initial rank. The lowest price has rank 0, and the rank of the highest price is N - 1, where N is the number of bars in the period. For example, if the analyzed prices are 10, 12, 15, and 12, their initial ranks are 0, 1, 3, and 2. - **Adjusts the ranks for ties**. If two or more prices are equal, it assigns each the average of their ordered positions as the final rank. For instance, the final ranks for the hypothetical prices shown in the previous step are 0, 1.5, 3, and 1.5, because the values with ranks 1 and 2 are equal, and the average of 1 and 2 is 1.5. - **Computes the correlation coefficient** between the sequences of price ranks and bar indices, then multiplies the value by 100. The result oscillates within the range between -100 and +100, where: - A value of +100 indicates that the prices consistently increased over the analyzed period - A value of -100 indicates that the prices consistently decreased over the period - A value near 0 indicates that the prices in the period have little to no directional consistency This indicator calculates and plots three separate RCI oscillators: - Short RCI (blue line) - Middle RCI (red line) - Long RCI (green line) Additionally, it displays horizontal lines at the levels -80, 0, and +80. An oscillator value outside this range suggests strong upward or downward consistency across one of the periods. The alignment of positive or negative RCI values can indicate strengthening trends, especially if the values are near the edges of the range. Divergences between the oscillators can help traders identify short-term momentum shifts and potential mean reversion opportunities. Inputs Source The source series that the indicator uses to calculate each RCI. By default, it uses the symbol's closing prices. Short RCI Length The number of bars in the short-term RCI calculation. Middle RCI Length The number of bars in the medium-term RCI calculation. Long RCI Length The number of bars in the long-term RCI calculation. Previous Previous Rate of Change (ROC) Next Next Realized market cap Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43584058649/original/ZgAJJRZEpO07WOotVr3dYB7HOQFM-EqJHw.png?1759441174)

**Описание:** This TradingView chart displays the **Invesco QQQ Trust Series I (QQQ)** on a **1-week (1W)** timeframe, listed on NASDAQ. Here’s a detailed breakdown of its elements:  


### 1. **Header & Ticker Info**  
- **Ticker & Timeframe**: “QQQ, Invesco QQQ Trust Series I · 1W · NASDAQ” identifies the asset, timeframe, and exchange.  
- **Price Data**: “O599.11 H602.05 L597.41 C598.73 +2.76 (+0.46%)” shows the **open (O)**, **high (H)**, **low (L)**, **close (C)** prices, and the **daily change** (+2.76, +0.46%).  
- **Current Price Box**: A red box on the right displays the latest close price: `598.73`.  


### 2. **Main Price Chart (Candlestick)**  
- **Candlestick Chart**: The top section uses green/red candlesticks to show price action over time (x-axis: Nov 2023–Nov, y-axis: ~250–550).  
  - Green candles = price closed **higher** than the open.  
  - Red candles = price closed **lower** than the open.  
- **Trend**: The chart shows a **long-term uptrend** (from ~250 in late 2023 to ~598 in late 2025), with minor pullbacks (e.g., early 2025).  


### 3. **RCI Ribbon Indicator (Lower Panel)**  
- **Indicator Label**: “RCI Ribbon close 10 30 50” identifies the indicator (RCI = Ribbon Channel Index) with three moving averages (10, 30, 50 periods).  
- **Lines & Values**: Three colored lines represent different RCI periods:  
  - **Blue (Short RCI)**: 81.82 (short-term momentum).  
  - **Red (Middle RCI)**: 96.62 (medium-term momentum).  
  - **Green (Long RCI)**: 63.56 (long-term momentum).  
- **Shaded Area**: A light blue region (between dashed horizontal lines) highlights the RCI’s range, with the y-axis measuring RCI values (-100 to 120).  
- **Purpose**: The RCI Ribbon helps identify trend strength/direction (e.g., rising lines = bullish momentum; falling lines = bearish).  


### 4. **UI & Navigation Elements**  
- **Time Axis (X-axis)**: Labels months/years (Nov 2023–Nov) to show the chart’s time range.  
- **Price Axis (Y-axis)**: Left y-axis for the candlestick chart (250–550); right y-axis for the RCI (–100 to 120).  
- **TradingView Pro Logo**: Bottom-left “TV PRO” indicates a premium subscription.  
- **Settings Icon**: Bottom-right gear icon for chart customization (e.g., indicators, timeframes).  


### Key Takeaways  
The chart combines a **candlestick price chart** (for trend visualization) with an **RCI Ribbon** (for momentum analysis) to assess QQQ’s performance. The uptrend in the candlesticks, plus rising RCI lines (especially the middle/long-term), suggests bullish momentum.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43584058859/original/oouJut5XK7CmnOSBy37DMWGt5kpnCcxLaw.png?1759441237)

**Описание:** This is a **TradingView indicator settings panel** for the \


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

