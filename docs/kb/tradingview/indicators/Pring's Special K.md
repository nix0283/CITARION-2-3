# Pring's Special K

**URL:** https://www.tradingview.com/support/solutions/43000773011-pring-s-special-k/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Pring's Special K ](/support/solutions/43000773011-pring-s-special-k/) # Pring's Special K The Special K, invented by Martin J. Pring, is a trend and momentum indicator that combines average rates of change over multiple lengths into a single oscillator, providing a filtered, composite view of price cycles over the short, medium, and long term. Building on the concepts of the [Know Sure Thing indicator (KST)](https://www.tradingview.com/support/solutions/43000502329-know-sure-thing-kst/) and years of market observations, Pring designed the Special K to identify primary trends and reversals, and to aid in timing short-term, pro-trend trades. Calculation The Special K is a weighted sum of [simple moving averages (SMAs)](https://www.tradingview.com/support/solutions/43000696841-simple-moving-average/) of the market price's [rate of change (ROC)](https://www.tradingview.com/support/solutions/43000502343-rate-of-change-roc/) over multiple lookback lengths. Pring selected the weight and the lookback lengths for each average ROC based on his observations of cycles and trends. The sum combines the following values: - 10-bar SMA of the 10-bar ROC - 10-bar SMA of the 15-bar ROC × 2 - 10-bar SMA of the 20-bar ROC × 3 - 15-bar SMA of the 30-bar ROC × 4 - 50-bar SMA of the 40-bar ROC - 65-bar SMA of the 65-bar ROC × 2 - 75-bar SMA of the 75-bar ROC × 3 - 100-bar SMA of the 100-bar ROC × 4 - 130-bar SMA of the 195-bar ROC - 130-bar SMA of the 265-bar ROC × 2 - 130-bar SMA of the 390-bar ROC × 3 - 195-bar SMA of the 530-bar ROC × 4 The result is a composite oscillator representing a weighted combination of significant market cycles with reduced noise. The indicator also includes a twice-smoothed signal line for detecting reversals. By default, it calculates the 100-bar SMA of the Special K, then applies a second 100-bar SMA to the result. You can customize the signal line's smoothing lengths from the "Inputs" tab of the indicator's settings. **!Note:** Because the Special K calculates up to the 195-bar SMA of the 530-bar ROC, it requires a chart with at least **725 bars** of data. The indicator displays an error if the chart's history contains fewer than 725 bars. The main intention of the Special K is to detect primary trends and reversal points: - Rising peaks and dips in the Special K suggest that the primary trend is bullish. Falling peaks and dips suggest the opposite. - A positive Special K indicates long-term bullish strength, and a negative value indicates long-term bearish strength. - Crossings between the Special K and the signal line can indicate the reversal or continuation of a primary trend. The Special K crossing over the signal line suggests that the trend is either shifting upward or continuing upward. The Special K crossing under the signal line suggests the opposite. - Pring also recommends drawing trendlines on the Special K to find reversal points. The Special K breaching a long-term trendline might indicate a shift in the primary trend from bullish to bearish or vice versa. Traders also use the indicator in conjunction with the KST, moving average crosses, or other momentum indicators to filter short-term signals based on the trends suggested by the Special K. Inputs Source The series of values for which to calculate the Special K. Signal length 1 The number of bars for the first SMA in the signal line calculation. Signal length 2 The number of bars for the second SMA in the signal line calculation. Timeframe Sets the timeframe that the indicator uses for its calculations. The "Wait for timeframe closes" checkbox below determines whether the indicator shows results only when a bar on the specified timeframe closes. See the [Leveraging multi-timeframe analysis](https://www.tradingview.com/support/solutions/43000591555-leveraging-multi-timeframe-analysis/) article to learn more. Previous Previous Price Volume Trend (PVT) Next Next Rank Correlation Index (RCI) Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43593142213/original/zoAnDNrSrIgXIa7my-C7uKJmEYoK-Z8F8g.png?1763769495)

**Описание:** This TradingView image displays a **1-day (1D) chart** for the **SPDR S&P 500 ETF Trust (NYSE Arca: SPY)**, featuring two panels and key UI elements:  


### 1. **Top Panel: Price Chart (SPY)**  
- **Title/Instrument Info**:  
  - `SPDR S&P 500 ETF Trust · 1D · NYSE Arca`: Identifies the asset, timeframe (1 day), and exchange.  
  - `O655.05 H664.55 L650.85 C659.03 +6.50 (+1.00%)`: Shows the day’s **Open (O)**, **High (H)**, **Low (L)**, **Close (C)**, and **daily change** (green for gains).  
- **Chart Type**: A **candlestick chart** (red/green bars) tracking SPY’s price over time (x-axis: 2018–2026; y-axis: 0–700). The green line (or candle) at the top right confirms the current close (`659.03`).  


### 2. **Bottom Panel: “Special K” Indicator**  
- **Label/Values**:  
  - `Special K close 100 100 427.25 374.61`: Describes the indicator (likely a custom oscillator) with two lines:  
    - **Blue line**: `Special K` (current value `427.25`).  
    - **Orange line**: `Signal` (current value `374.61`).  
- **Chart Type**: A **line chart** (blue/orange lines) tracking the indicator’s values over time (same x-axis as the top panel; y-axis: -100–600).  


### 3. **UI Elements**  
- **Timeframe/Exchange**: `1D` (top-left) and `NYSE Arca` (exchange) define the chart’s scope.  
- **TradingView Pro Badge**: Bottom-left (`TV PRO`) indicates a premium subscription.  
- **Zoom/Time Controls**: Bottom-right (circular icon) allows adjusting the chart’s time range.  


### Purpose  
The top panel shows SPY’s price action (trend, volatility), while the bottom panel displays the “Special K” indicator (likely for momentum/overbought/oversold signals, via the blue/orange line crossover). Together, they help analyze SPY’s short-term (1D) price behavior and technical indicators.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43593142522/original/dhELAtrbhz5N4sUS1XxIyakd-FvoCkCLqQ.png?1763769636)

**Описание:** This is a **TradingView indicator configuration modal** for an indicator named \


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

