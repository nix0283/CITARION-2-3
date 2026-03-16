# Average True Range (ATR)

**URL:** https://www.tradingview.com/support/solutions/43000501823-average-true-range-atr/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Average True Range (ATR) ](/support/solutions/43000501823-average-true-range-atr/) # Average True Range (ATR) Definition [The Average True Range (ATR)](https://www.tradingview.com/scripts/averagetruerange/) is a tool used in technical analysis to measure volatility. Unlike many of today's popular indicators, the ATR is not used to indicate the direction of price. Rather, it is a metric used solely to measure volatility, especially volatility caused by price gaps or limit moves. If you want to screen instruments with the ATR, you can either open the desired screener from the right toolbar in the "Products" menu or access the standalone screener from the home page. From there, click the "Add new filter" button and select the ATR you need — the standard one or the [ATR%](https://www.tradingview.com/support/solutions/43000734653/). History J. Welles Wilder created the ATR and featured it in his book New Concepts in Technical Trading Systems . The book was published in 1978 and also featured several of his now classic indicators such as; The Relative Strength Index, Average Directional Index and the Parabolic SAR. Much like the indicators mentioned, the ATR is still widely used and has great importance in the world of technical analysis. Calculation To calculate the ATR, the True Range first needs to be discovered. True Range takes into account the most current period high/low range as well as the previous period close if necessary. There are three calculation which need to be completed and then compared against each other. The True Range is the largest of the following: The Current Period High minus (-) Current Period Low The Absolute Value (abs) of the Current Period High minus (-) The Previous Period Close The Absolute Value (abs) of the Current Period Low minus (-) The Previous Period Close true range = max[(high - low), abs(high - previous close), abs (low - previous close)] *Absolute Value is used because the ATR does not measure price direction, only volatility. Therefore there should be no negative numbers. *Once you have the True Range, the Average True Range can be plotted. By default on TradingView the ATR is a Relative Moving Average (RMA) of the True Range, but the smoothing type can be changed to SMA, EMA or WMA in the settings. The basics Average True Range is a continuously plotted line usually kept below the main price chart window. The way to interpret the Average True Range is that the higher the ATR value, then the higher the level of volatility. - The look back period to use for the ATR is at the trader's discretion however 14 days is the most common. - ATR can be used with varying periods (daily, weekly, intraday etc.) however daily is typically the period used. What to look for Measuring the Strength of a Move As previously stated Average True Range does not take into account price direction, therefore it is not used as an active indicator to predict future moves. Instead, it is most useful in measuring the strength of a move. For example, if a security's price makes a move or reversal, either Bullish or Bearish, there will usually be an increase in volatility. In that case, the ATR will be on the rise. This can be used as a way to gauge the underlying strength of the move. The more volatility in a large move, the more interest or pressure there is reinforcing that move. On the other hand, during periods of sustained sideways movement, volatility is frequently low. This could assist in the discovery of trading ranges. Using Absolute Value The fact that ATR is calculated using absolute values of differences in price is something that should not be ignored. This is relevant because it means that securities with higher price values will inherently have higher ATR values. Likewise, securities with lower price values will have lower ATR values. The consequence is that a trader cannot compare the ATR Values of multiple securities. What is considered to be a high ATR Value or a high ATR Range for one security may not be the same for another security. A trader should study and research the relevance of ATR for each security independently when performing chart analysis. Compare the charts below. Apple (AAPL) has a price over $450 and an ATR over 12. Ford (F) has a price over $17 and an ATR of less than 1. Summary ATR is a nice chart analysis tool for keeping an eye on volatility which is a variable that is always important in charting or investing. It is a good option when trying to gauge the overall strength of a move or for discovering a trading range. That being said, it is an indicator which is best used as a compliment to more price direction driven indicators. Once a move has begun, the ATR can add a level of confidence (or lack there of) in that move which can be rather beneficial. Inputs Length The time period to be used in calculating the Average True Range. 14 days is the default. Style ATR Can toggle the visibility of the ATR Line as well as the visibility of a price line showing the actual current value of the ATR Line. Can also select the ATR Line's color, line thickness and visual type (Line is the default). Precision Sets the number of decimal places to be left on the indicator's value before rounding up. The higher this number, the more decimal points will be on the indicator's value. Also read: - [How to trade on TradingView](https://www.tradingview.com/support/solutions/43000756695-how-to-trade-on-tradingview/) - [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/) - [The technical analysis essentials](https://www.tradingview.com/support/solutions/43000759577-the-technical-analysis-essentials-with-tradingview/) - [Introduction to fundamental analysis](https://www.tradingview.com/support/solutions/43000759574-introduction-to-fundamental-analysis-on-tradingview/) - [Portfolios: track your assets, know your trades](https://www.tradingview.com/support/solutions/43000760937-tradingview-portfolios-track-your-assets-know-your-trades/) Previous Previous Average transaction volume Next Next Awesome Oscillator (AO) Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43600746588/original/8GFRRyUDxZOKzSkaBrgwGt0Kt6orb1tdUQ.png?1767956064)

**Описание:** This TradingView interface displays a **Tesla, Inc. (TSLA)** stock chart on the NASDAQ exchange. Here’s a detailed breakdown:  


### **Top Bar & Symbol Info**  
- **Left**: Ticker symbol \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43600747102/original/tTDoGNPIEghtBINyaRVQTcNxEZuuFNVmew.png?1767956226)

**Описание:** This TradingView interface is split into two main sections: a **chart panel** (left) and a **stock screener** (right). Here’s a detailed breakdown:  


### **Left: Chart Panel (Tesla, TSLA)**  
- **Top Bar**:  
  - Symbol: `TSLA` (Tesla) with exchange `NASDAQ`.  
  - Price data: `O429.07 H429.12 L428.56 C429.08 +0.03 (+0.01%)` (open, high, low, close, change).  
  - Buy/Sell buttons: `429.00 SELL` (red) and `429.15 BUY` (blue) with a spread of `0.15`.  
  - Volume: `Vol 7.95K` (green bar).  

- **Chart Area**:  
  - Candlestick chart (red/green bars) showing price action over time.  
  - Below the candlesticks: A **volume histogram** (teal = buying, red = selling) and a **24H volume bar** (blue, labeled `24H Vol close 22.32B`).  

- **Timeframe Selector**:  
  - Horizontal bar with intervals: `1s 5s 15s 30s 1m 3m 5m 7m 14m 15m 23m 30m 45m 1h 2h 3h 4h 23h 24h D 3D 14D W M` (currently `15m` is highlighted).  

- **Bottom Bar**:  
  - Time period buttons: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (for chart range).  
  - `Trading Panel` label (bottom-left).  


### **Right: Stock Screener**  
- **Header**:  
  - `Stock Screener` dropdown (top-left).  
  - `All stocks` dropdown (filters stocks).  
  - Icons: Expand/fullscreen (top-right).  

- **Filter Tabs**:  
  - Horizontal row of filters: `US`, `Watchlist`, `Index`, `Price`, `Change %`, `Market cap`, `P/E`, `EPS dil growth`, `Div yield %`, `Sector`, `Analyst Rating`, `Perf %`, `Revenue growth`, `PEG`, `ROE`, `Beta`, `Recent earnings date`, `Upcoming earnings date`.  

- **Search/Add Column**:  
  - Search bar with `+` button (to add columns) and `ATR` typed (Average True Range, a technical indicator).  
  - Dropdown menu shows `TECHNICALS` (e.g., `Average True Range`, `Average True Range %`) and `MARGINS & RATIOS` (e.g., `Assets to equity ratio`).  

- **Table Columns**:  
  - `Symbol`, `Price`, `Change %`, `Volume`, `Volume` (repeated), `EPS dil growth TTM YoY`, `Div yield % TTM`.  

- **Stock List**:  
  - Rows of stocks (e.g., `NVDA`, `GOOG`, `AAPL`, `MSFT`, `AMZN`, `META`, `AVGO`, `TSLA`, `BRK.A`, `LLY`, `WMT`, `JPM`, `V`, `ORCL`, `MA`, `JNJ`, `XOM`) with:  
    - Logo, symbol, price (USD), % change (green = up, red = down), volume, and additional metrics (e.g., market cap, P/E).  


### **UI Elements & Purpose**  
- **Candlestick Chart**: Visualizes price movements (open, high, low, close) over time.  
- **Volume Histogram**: Shows trading volume (buying vs. selling pressure).  
- **Timeframe/Period Buttons**: Adjust chart granularity (e.g., 15m, 1D) and historical range.  
- **Stock Screener**: Filters stocks by criteria (e.g., market cap, P/E, revenue growth) and adds custom columns (e.g., ATR) for analysis.  
- **Buy/Sell Buttons**: For executing trades (simplified, likely for demo/quick orders).  


This layout combines real-time charting (left) with multi-stock screening (right) to analyze price action and filter equities by fundamental/technical metrics.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582439081/original/d8y2A6wN6N4fY7C1ae_SPGp8Fo_KAReIJA.png?1758720061)

**Описание:** This TradingView screenshot displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with an open ATR (Average True Range) indicator configuration window. Here’s a detailed breakdown:  


### **Top Navigation Bar**  
- **Left**: Zoom controls (`+`/`-`), time interval selector (`D` for daily), and a menu icon.  
- **Middle**: `Indicators` (dropdown for adding technical indicators), `Alert` (price notifications), `Replay` (historical price replay), and navigation arrows.  
- **Right**: `TradingView` logo, market data toggles (`M`/`M`/`S`), sync/refresh, settings, chart layout, screenshot, and `Publish` (share chart).  


### **Chart Header**  
- **Symbol/Timeframe**: `Apple Inc · 1D · NASDAQ` (stock name, time interval, exchange).  
- **Price Data**: `O255.88 H257.34 L253.58 C254.43 -1.65 (-0.64%)` (open, high, low, close, change, and percentage change for the current candle).  


### **Main Chart Area**  
- **Candlestick Chart**: Displays daily price action (green = up, red = down) with a red ATR line (volatility indicator) below.  
- **Y-Axis (Right)**: Price scale (260.00 to 224.00) for the candlestick chart; a secondary scale (5.20 to 4.20) for the ATR line.  


### **ATR Indicator Window (Popup)**  
Configures the ATR indicator with three tabs:  
- **Inputs** (active):  
  - `Length`: 14 (default period for ATR calculation).  
  - `Smoothing`: `RMA` (Relative Moving Average, dropdown menu).  
  - `Timeframe`: `Chart` (uses the chart’s time interval; dropdown available).  
  - Checkboxes: `Wait for timeframe closes` (waits for candle close to calculate) and `Inputs in status line` (displays settings in the chart header).  
- **Style/Visibility**: Tabs for customizing ATR’s appearance (e.g., color, line thickness) and visibility.  
- **Buttons**: `Defaults` (reset to default settings), `Cancel` (close without saving), `Ok` (apply changes).  


### **Left Toolbar**  
Icons for drawing tools (trendlines, Fibonacci, text), chart types (candlestick, line), and other functions (e.g., lock, globe, trash).  


### **Bottom Toolbar**  
- **Timeframe Selector**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (switch between time intervals).  
- **Date Range**: X-axis labels (e.g., `19`, `Sep`, `Oct`) showing the chart’s date range.  
- **Timestamp**: `09:20:32 UTC-4` (current time).  
- **Tabs**: `Pine Editor` (code editor for custom indicators) and `Trading Panel` (order execution).  


### **Key Elements**  
- The ATR window is open, indicating the user is configuring the volatility indicator.  
- The chart shows recent price action (e.g., a green candle followed by a red candle, with the ATR line trending downward then upward).  
- UI elements prioritize customization (indicators, timeframes) and real-time data (price, time).  


This layout is typical of TradingView’s interface, designed for technical analysis with easy access to indicators, timeframes, and chart tools.


