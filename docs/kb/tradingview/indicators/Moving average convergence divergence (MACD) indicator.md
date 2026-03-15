# Moving average convergence divergence (MACD) indicator

**URL:** https://www.tradingview.com/support/solutions/43000502344-moving-average-convergence-divergence-macd-indicator/

---

- [ Help Center ](/) - / - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Moving average convergence divergence (MACD) indicator ](/support/solutions/43000502344-moving-average-convergence-divergence-macd-indicator/) # Moving average convergence divergence (MACD) indicator The moving average convergence divergence is a momentum indicator that measures the difference between two moving averages, providing a direct, unbounded view of how two averages converge and diverge over time. It also offers a gauge of price momentum and short-term trends. **CONTENTS:** - [What is moving average convergence divergence](#What-is-moving-average-convergence-divergence) - [How MACD is calculated](#How-MACD-is-calculated) [What is MACD divergence](#What-is-MACD-divergence) - [MACD settings](#MACD-settings) What is moving average convergence divergence The MACD indicator was originally created by Gerald Appel in the 1970s. In 1986, Thomas Aspray added a histogram line, which represents the difference between the MACD and signal line. Now, the MACD consists of three parts: - The MACD line, which oscillates around zero as the two moving averages converge and diverge - A smoothed signal line, which follows the MACD and provides crossing points for identifying potential reversals - A histogram that provides a visualization to help identify strengthening or weakening momentum and anticipate possible MACD-signal crossovers Our indicator displays all three series — the MACD, the signal line, and the histogram — in a separate chart pane. By analyzing these values together, you can: - Determine trend direction - Assess price movement strength - Identify potential turning points - Spot momentum divergences and other patterns How MACD is calculated The indicator calculates the difference between two moving averages of different lengths to create the main MACD series. It smooths the MACD to derive a signal line and then computes the histogram by taking the difference between the MACD and signal line values. MACD = Fast MA − Slow MA Signal = Moving average of MACD Histogram = MACD − Signal Where: - Fast MA is the moving average with the lowest length - Slow MA is the moving average with the highest length The indicator plots the MACD and signal values as lines, and the histogram values as color-coded columns. It also displays a horizontal zero line to distinguish positive and negative values. By using these values you can analyze momentum and trends in multiple ways. A few of the most common interpretations: - The MACD moving above 0 indicates that the fast MA is greater than the slow MA. This suggests average upward momentum or a potential uptrend - The MACD moving below 0 indicates that the fast MA is smaller than the slow MA. This suggests average downward momentum or a potential downtrend - A histogram value above 0 or the MACD moving above the signal line, suggests that upward momentum is increasing or downward momentum is decreasing - A histogram value below 0 or the MACD moving below the signal line, suggests that downward momentum is increasing or upward momentum is decreasing What is MACD divergence Divergences are discrepancies between price movement and the movement of a technical indicator. There are two types of divergences: - **Regular:** Suggests weakening of the current trend or preparing to reverse - **Hidden:** Suggests continuation of the current trend Divergences between the relative movements of the market price and the MACD might help to identify turning points or shifts in trends. For example, falling peaks in the MACD as the price rises might indicate the exhaustion of an uptrend. Likewise, rising dips in the MACD while the price drops might signal the exhaustion of a downtrend. Divergences between the movements of the MACD and the histogram can signal potential shifts in momentum. For example, falling histogram values as the MACD rises indicate that the MACD is increasing at a slower rate, suggesting the possible exhaustion of upward momentum. Rising histogram values while the MACD falls indicate that the MACD is decreasing at a slower rate, suggesting the potential exhaustion of downward momentum. This indicator includes alert conditions for when the histogram changes from positive to negative, and vice versa, to signal the points where momentum might be shifting between rising and falling states. Refer to the [Getting started with technical alerts](https://www.tradingview.com/support/solutions/43000763315/) article to learn how to use them. MACD settings - **Source:** The series of values for which to calculate the oscillator - **Fast length:** The length value for the fast moving average - **Slow length:** The length value for the slow moving average - **Signal length:** The length value for the moving average of the MACD (signal line). - **Oscillator MA type:** Specifies the type for the fast and slow averages in the MACD calculation. Select "EMA" to use two [exponential moving averages](https://www.tradingview.com/support/solutions/43000592270-exponential-moving-average/), or "SMA" to use [simple moving averages](https://www.tradingview.com/support/solutions/43000696841-simple-moving-average/) instead - **Signal MA type:** Specifies which type of moving average the indicator applies to the MACD to calculate the signal line. Select "EMA" for an exponential moving average, or "SMA" for a simple moving average - **Timeframe:** Sets the timeframe that the indicator uses for its calculations. The "Wait for timeframe closes" checkbox below determines whether the indicator shows results only when a bar on the specified timeframe closes. This can be especially helpful for [multi-timeframe analysis](https://www.tradingview.com/support/solutions/43000591555-leveraging-multi-timeframe-analysis/) Also read: - [The technical analysis essentials](https://www.tradingview.com/support/solutions/43000759577/) - [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/) - [TradingView screeners walkthrough](https://www.tradingview.com/support/solutions/43000718885-tradingview-screeners-walkthrough/) - [Master the Options Strategy Builder](https://www.tradingview.com/support/solutions/43000707214-master-the-options-strategy-builder/) - [Chart trading: key features and advantages](https://www.tradingview.com/support/solutions/43000766334/) Previous Previous Moon Phases Next Next Moving Average Ribbon Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43595989723/original/QwxjQjwHex3h8ODLrkMSJTVv8NOXTRzd1A.png?1765220215)

**Описание:** This TradingView image displays a **1-day (1D) candlestick chart** for **Tesla, Inc. (TSLA)** on the NASDAQ exchange, with a **MACD (Moving Average Convergence Divergence)** indicator below. Here’s a detailed breakdown:  


### 1. **Top Section: Stock Info & Price Action**  
- **Ticker & Exchange**: `TSLA 1D · NASDAQ` (Tesla, 1-day timeframe, NASDAQ).  
- **Price Data**: `O278.13 H279.67 L276.40 C276.52 -2.26 (-0.81%)`  
  - `O`: Open price ($278.13)  
  - `H`: High price ($279.67)  
  - `L`: Low price ($276.40)  
  - `C`: Close price ($276.52, highlighted in red, indicating a **down day**).  
  - `-2.26 (-0.81%)`: Daily price change (down $2.26, -0.81%).  
- **Candlestick Chart**: Green candles = price closed higher than open (up days); red candles = price closed lower than open (down days). The chart shows TSLA’s price trend over months (Jun–Dec), with an overall upward trajectory (peaking near $280) before a recent decline.  


### 2. **MACD Indicator (Below Candlestick Chart)**  
The MACD helps identify trend momentum and potential reversals. It has three components:  
- **MACD Line (Blue)**: Calculated as the difference between two exponential moving averages (EMA) (default: 12-period EMA – 26-period EMA).  
- **Signal Line (Orange)**: A 9-period EMA of the MACD line (used to generate trade signals).  
- **Histogram (Bars)**: Visualizes the gap between the MACD and Signal lines (green = MACD > Signal; red = MACD < Signal).  

- **MACD Values**: `MACD close 12 26 9 -0.2624 4.40 4.66`  
  - `-0.2624`: Histogram value (current gap between MACD/Signal lines, negative = bearish momentum).  
  - `4.40`: MACD line value.  
  - `4.66`: Signal line value.  


### 3. **UI Elements & Navigation**  
- **Timeframe Toggle**: `1D` (1-day) is selected (top-left, next to ticker).  
- **Price Scale (Right)**: Y-axis for the candlestick chart (ranges ~$190–$300).  
- **MACD Scale (Right)**: Y-axis for the MACD (ranges ~-2 to 8).  
- **Date Axis (Bottom)**: X-axis showing months (Jun–Dec) to track time.  
- **TradingView Pro Logo**: Bottom-left (`TV PRO`), indicating a premium subscription.  
- **Settings Icon**: Bottom-right (gear symbol) for chart customization.  


### Purpose of Elements  
- **Candlestick Chart**: Shows price action (open, high, low, close) over time to identify trends, support/resistance, and reversals.  
- **MACD**: Analyzes momentum (trend strength) and potential buy/sell signals (e.g., MACD crossing above/below the Signal line).  
- **UI Buttons/Icons**: Enable timeframe changes, price scaling, and chart customization.  


This layout helps traders analyze TSLA’s short-term price movements and momentum using both price action and the MACD indicator.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43596173630/original/j1qWZFTEkvI_YVd9Sp1IiONdh82zHJSIHQ.png?1765292438)

**Описание:** This TradingView screenshot displays a **Tesla, Inc. (NASDAQ: TSLA)** 1-day candlestick chart with a **MACD (Moving Average Convergence Divergence)** indicator configuration panel open. Here’s a detailed breakdown:  


### 1. **Top Navigation & Symbol Info**  
- **Left**: “TSLA” (symbol) with a “+” (add new chart) button. Timeframe tabs: `1m, 5m, 15m, 45m, 1h, 4h, D, W` (current: `D` = 1-day).  
- **Symbol Details**: “Tesla, Inc. · 1D · NASDAQ” with:  
  - Current price: `444.27` (red “SELL” button) / `444.42` (blue “BUY” button), spread `0.15`.  
  - Open/High: `O437.54 H444.6…` (truncated).  


### 2. **Main Chart (Candlestick)**  
- **Candlestick Chart**: Red/green candles show price action (green = up, red = down) over months (Mar–Feb 2026).  
- **Price Axis (Right)**: Ranges from ~`220` to `480` USD, with current price `444.30` (green box, timestamp `05:59:43`).  


### 3. **MACD Configuration Panel (Center)**  
A modal for customizing the MACD indicator, with 3 tabs: `Inputs` (active), `Style`, `Visibility`.  

#### Inputs Tab:  
- **Source**: Dropdown set to `Close` (uses closing price for calculation).  
- **Fast Length**: `12` (period for the fast EMA).  
- **Slow Length**: `26` (period for the slow EMA).  
- **Signal Length**: `9` (period for the signal line EMA).  
- **Oscillator MA Type**: Dropdown set to `EMA` (exponential moving average).  
- **Signal MA Type**: Dropdown set to `EMA`.  
- **Timeframe**: Dropdown set to `Chart` (uses the main chart’s timeframe).  
- **Checkbox**: `Wait for timeframe closes` (requires full candle close for calculation).  
- **Buttons**: `Defaults` (reset to default settings), `Cancel` (close without saving), `Ok` (apply changes).  


### 4. **MACD Indicator (Below Main Chart)**  
- **Histogram + Lines**: Blue (MACD line), orange (signal line), and colored bars (histogram, showing momentum).  
- **Label**: `MACD close 12 26 9` (confirms parameters).  


### 5. **Left Sidebar (Tools)**  
Icons for drawing tools (trendlines, Fibonacci), chart types, text, zoom, Pine Editor, and more.  


### 6. **Bottom Timeline & Timeframes**  
- **Timeline**: Months (Mar–Feb 2026) with current time `19:00:16 UTC+4`.  
- **Timeframe Buttons**: `1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All` (for zooming).  


### 7. **Right Sidebar (Additional Tools)**  
Icons for watchlist, clock, patterns, chat, calendar, and other features (e.g., “Trade,” “Publish” buttons at the top).  


### Purpose  
The interface is for **technical analysis**: the main chart tracks price, the MACD panel customizes momentum indicators, and tools enable drawing, trading, or publishing insights.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

