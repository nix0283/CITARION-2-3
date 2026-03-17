# Price Momentum Oscillator (PMO)

**URL:** https://www.tradingview.com/support/solutions/43000773010-price-momentum-oscillator-pmo/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Price Momentum Oscillator (PMO) ](/support/solutions/43000773010-price-momentum-oscillator-pmo/) # Price Momentum Oscillator (PMO) The Price Momentum Oscillator (PMO), created by Carl Swenlin, is a momentum indicator that measures the smoothed bar-by-bar [rate of change (ROC)](https://www.tradingview.com/support/solutions/43000502343-rate-of-change-roc/) in an instrument's price. The indicator applies two stages of smoothing to the ROC, and uses an [EMA](https://www.tradingview.com/support/solutions/43000592270-exponential-moving-average/) of the result as a signal line. The PMO functions similarly to indicators such as the [MACD](https://www.tradingview.com/support/solutions/43000502344-macd-moving-average-convergence-divergence/). Traders typically use it to gauge short-term momentum, identify developing trends or mean reversion opportunities, and find divergences or other patterns. However, because the indicator smooths the single-bar ROC instead of calculating the difference between price averages, it is less sensitive to the absolute magnitude of price movements, often resulting in a more consistent scale across the chart's history. Calculation The PMO indicator applies two stages of custom exponential smoothing, with different lengths, to the one-bar ROC of market prices. Then, it computes a signal line using a standard EMA. The steps to calculate the PMO and signal values are as follows: - Calculate the percentage change in prices, representing the one-bar ROC. - Apply an EMA with a custom smoothing factor to the ROC series. Instead of the standard smoothing factor of **2 / (length + 1)**, this EMA uses the factor **2 / length**. - Multiply the smoothed series by 10, then apply a second EMA using the same custom smoothing factor formula to calculate the PMO. - Apply a standard EMA to the PMO to calculate the signal line. The indicator plots the smooth PMO and its signal line in a separate pane, along with a horizontal line at zero to distinguish positive and negative momentum readings. The usual interpretation of this indicator is similar to that of the MACD indicator: - PMO values above 0 indicate average upward momentum. Values below 0 indicate average downward momentum. - The crossings between the PMO and the signal line indicate shorter-term momentum shifts. The PMO crossing over the signal line suggests that momentum is either shifting upward or continuing upward. The PMO crossing under the signal line suggests the opposite. - Divergences in the relative movements of the PMO and price might help to identify turning points or shifts in trends. For example, falling peaks in the PMO while the market price is rising might suggest the exhaustion of an uptrend. Likewise, rising dips in the PMO while the market price is falling might suggest the exhaustion of a downtrend. Inputs Source The series of values for which to calculate the PMO. Length 1 The length for the first stage of exponential smoothing. Length 2 The length for the second stage of exponential smoothing. Signal length The length for the standard EMA of the PMO (signal line). Timeframe Sets the timeframe that the indicator uses for its calculations. The "Wait for timeframe closes" checkbox below determines whether the indicator shows results only when a bar on the specified timeframe closes. See the [Leveraging multi-timeframe analysis](https://www.tradingview.com/support/solutions/43000591555-leveraging-multi-timeframe-analysis/) article to learn more. Previous Previous Positive Volume Index (PVI) Next Next Price target - indicator Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43593139585/original/LtnxZuIyuOkzxnVS9xReaylZnZBEAofS6Q.png?1763767289)

**Описание:** This TradingView chart displays **NVIDIA Corporation (NVDA)** on the **NASDAQ** exchange, with a **1-day (1D)** time frame. Here’s a detailed breakdown of its elements:  


### 1. **Header & Symbol Info**  
- **Symbol/Exchange**: `NVDA` (NVIDIA) on `NASDAQ`.  
- **Time Frame**: `1D` (1-day candlestick).  
- **Price Data**: `O265.95 H273.33 L265.67 C271.49 +5.24 (+1.97%)`  
  - `O`: Open price ($265.95)  
  - `H`: High price ($273.33)  
  - `L`: Low price ($265.67)  
  - `C`: Close price ($271.49)  
  - `+5.24 (+1.97%)`: Daily price change (gain) and percentage change.  


### 2. **Main Price Chart (Candlestick)**  
- **Type**: Candlestick chart (green/red bars) showing price action over time.  
- **Axes**:  
  - **Y-axis (right)**: Price scale (ranges from ~$160 to $280).  
  - **X-axis (bottom)**: Time (months: Dec 2024 → Dec 2025).  
- **Trend**: The chart shows a volatile trend with a significant upward move in late 2025, reflecting price fluctuations (green = closing higher than opening; red = closing lower).  


### 3. **PMO (Price Momentum Oscillator) Indicator**  
Below the main chart, the **PMO** (a momentum indicator) is displayed:  
- **Label**: `PMO close 35 20 10` (parameters: 35-period, 20-period signal line, 10-period smoothing).  
- **Lines**:  
  - **Blue line**: PMO value (current: `2.36`).  
  - **Orange line**: Signal line (current: `2.77`).  
- **Axes**:  
  - **Y-axis (right)**: PMO scale (ranges from -5 to 5).  
  - **X-axis**: Same time frame as the main chart.  
- **Purpose**: The PMO measures momentum; crossovers (blue above orange = bullish, orange above blue = bearish) signal trend shifts.  


### 4. **UI Elements**  
- **Top-Right Corner**:  
  - Price box: `271.49` (current close, highlighted in green to indicate a gain).  
- **Bottom-Left**: `TV PRO` logo (TradingView Pro branding).  
- **Bottom-Right**: Settings icon (gear symbol) for chart configuration.  


### 5. **Additional Details**  
- **Grid Lines**: Light gray grid lines for price/time reference.  
- **Color Coding**: Green/red for candlesticks (price direction), blue/orange for PMO lines (momentum).  


This chart combines price action (candlesticks) with momentum analysis (PMO) to help traders assess trends and potential reversals.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43593139695/original/xz9QFaQU5pJ2-QzBEpvEr1X-YY_19w4oHQ.png?1763767405)

**Описание:** This is a **TradingView indicator settings panel** for the **PMO (Price Momentum Oscillator)**. Here’s a detailed breakdown:  


### 1. Header & Navigation  
- **Title**: “PMO” (top-left) identifies the indicator.  
- **Close Button**: “×” (top-right) closes the settings panel.  
- **Tabs**: Three tabs—*Inputs* (active, underlined), *Style*, *Visibility*—let users switch between configuration categories.  


### 2. Inputs Tab (Active)  
This tab configures the PMO’s calculation parameters:  

- **Source**: Dropdown menu (set to “Close”) selects the price data source (e.g., Open, High, Low, Close, Volume).  
- **Length 1**: Text box (value “35”) sets the first smoothing period for the PMO.  
- **Length 2**: Text box (value “20”) sets the second smoothing period.  
- **Signal length**: Text box (value “10”) sets the smoothing period for the PMO’s signal line.  


### 3. Calculation Section  
- **Timeframe**: Dropdown (set to “Chart”) selects the time frame for calculation (e.g., 1m, 5m, 1h, or “Chart” to match the main chart’s timeframe).  
- **“Wait for timeframe closes”**: Checkbox (checked) ensures calculations only use closed candle data (avoids real-time noise).  


### 4. Footer Buttons  
- **Defaults**: Dropdown (bottom-left) resets settings to default values.  
- **Cancel**: Button (bottom-right) discards changes and closes the panel.  
- **Ok**: Button (bottom-right, black) applies changes and closes the panel.  


### Purpose  
This panel lets users customize the PMO’s behavior (data source, smoothing lengths, calculation timing) to fit their trading strategy. The *Style* tab (inactive) would adjust visual elements (colors, line thickness), and *Visibility* would control whether the indicator appears on the chart.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

