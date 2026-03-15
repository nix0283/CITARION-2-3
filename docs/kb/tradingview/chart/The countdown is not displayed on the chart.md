# The countdown is not displayed on the chart

**URL:** https://www.tradingview.com/support/solutions/43000476233-the-countdown-is-not-displayed-on-the-chart/

---

- [ Help Center ](/) - / - / [ The countdown is not displayed on the chart ](/support/solutions/43000476233-the-countdown-is-not-displayed-on-the-chart/) # The countdown is not displayed on the chart If the countdown to the bar close is not displayed on your chart, it might be due to the following reasons: - The countdown is disabled. Make a right click on the Price Scale and make sure that Countdown To Bar Close is checked. - One of the chart types that does not have a fixed time interval is selected: [Renko](https://www.tradingview.com/?solution=43000502284), [Kagi](https://www.tradingview.com/?solution=43000502272), [PnF](https://www.tradingview.com/?solution=43000502276), [Line Break](https://www.tradingview.com/?solution=43000502273) or [Range](https://www.tradingview.com/?solution=43000474007). The countdown cannot be displayed for those chart types. - The symbol with delayed data is selected on the chart. If for example, you have a symbol with data delayed by 15 minutes, the countdown will only be displayed for the time intervals over 15 minutes. You can check the data update mode of the current symbol in the top left corner of the chart — if the data is delayed, you will see a Data is delayed (D) sign. - The symbol selected on the chart is not being traded at the moment. During non-trading hours on intraday charts, there is no bar waiting for close, which is why the countdown timer is not displayed. - Your computer clock is either too fast or too slow. To have your charts working correctly, we recommend syncing the time on your computer with NTP time servers. Previous Previous The Renko chart is not displayed or is displayed incorrectly Next Next When comparing symbols, I only see detached lines on the chart Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43494583074/original/ei9Q1qS_GTyb07Xmfsik36WcNAnk4J45yw.png?1719480619)

**Описание:** This TradingView chart displays **Apple Inc. (NASDAQ: AAPL)** on a **1-day (1D)** timeframe. Here’s a detailed breakdown of the UI elements:  


### **Top Toolbar**  
- **Left**:  
  - *Chart type selector* (candlestick icon, currently active).  
  - *Timeframe selector* (set to “D” for daily).  
  - *Price scale/menu* (dropdown for scaling options).  
  - *Indicators* (dropdown to add technical indicators).  
  - *Chart style* (grid, moving average, etc.).  
  - *Alert* (set price alerts).  
  - *Replay* (replay historical price action).  
  - *Navigation arrows* (scroll left/right).  

- **Right**:  
  - *New name* (rename chart).  
  - *Refresh* (reload data).  
  - *Settings* (chart preferences).  
  - *Fullscreen* (expand chart).  
  - *Screenshot* (capture chart).  
  - *Publish* (share chart).  


### **Symbol & Price Bar**  
- **Symbol**: “Apple Inc · 1D · NASDAQ” (current instrument).  
- **OHLC Data**: Open (209.15), High (211.38), Low (208.61), Close (209.07) +0.93 (+0.45%).  
- **Price Boxes**:  
  - Red box: 210.59 (likely prior close or reference price).  
  - Blue box: 210.73 (another reference price).  
- **Volume**: 56.714M (trading volume).  


### **Main Chart Area**  
- **Candlestick Chart**: Shows price action over months (Feb–Sep). Red candles = price decline; green = increase.  
- **Volume Histogram**: Below the chart, colored bars (teal = buying volume, pink = selling volume) show volume per period.  
- **Time Axis**: X-axis labels months (Feb, Mar, Apr, May, Jun, Jul, Aug, Sep).  


### **Right-Side Menu (Open)**  
A dropdown menu is active, with options:  
- *Auto (fits data to screen)*: Adjusts chart to show all data.  
- *Lock price to bar ratio*: Maintains price-bar proportion.  
- *Scale price chart only*: Scales only price (not volume).  
- *Invert scale*: Flips price axis.  
- *Regular/Percent/Indexed to 100/Logarithmic*: Price display modes.  
- *Move scale to left*: Adjusts time range.  
- *Labels/Lines*: Toggle chart labels/lines.  
- ***Countdown to bar close***: **Checked** (shows time remaining until the current daily bar closes).  
- *Plus button*: Add elements (e.g., indicators).  
- *Settings…*: Advanced chart settings.  


### **Bottom Toolbar**  
- *Timeframe Buttons*: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All (switch timeframes).  
- *UTC Time*: 08:45:09 (UTC-4) (current time).  
- *ADJ*: Adjusted data toggle.  


### **Bottom Tabs**  
- *Stock Screener*: Filter stocks.  
- *Pine Editor*: Code custom indicators.  
- *Strategy Tester*: Backtest trading strategies.  
- *Trading Panel*: Execute trades.  


### **Left Sidebar**  
Icons for tools (e.g., drawing, indicators, text, screenshot, settings, help).  


This layout provides a comprehensive view of Apple’s price action, with tools to analyze, customize, and trade. The “Countdown to bar close” feature helps traders track time until the daily candle closes.


**Описание:** This TradingView chart displays **Apple Inc. (NASDAQ: AAPL)** on a **1-day (1D)** timeframe, showing a candlestick price chart with volume bars. Here’s a detailed breakdown:  


### **Top Toolbar & Header**  
- **Left**: “AAPL” (symbol), “1D” (timeframe), and a dropdown for additional timeframes.  
- **Middle**: Real-time data: `O209.15 H211.38 L208.61 C209.07 +0.93 (+0.45%)` (open, high, low, close, change, % change). Below: `210.59` (red, likely prior close) and `210.73` (blue, likely current price), plus `Vol 56.714M` (volume).  
- **Right**: Icons for *Alert*, *Replay*, *New name* (chart labeling), *Publish* (share chart), and other tools (e.g., chart style, indicators).  


### **Main Chart Area**  
- **Price Chart**: Candlesticks (green = up, red = down) show price action over months (Feb–Sep). A red diagonal line highlights a recent trend.  
- **Volume Bars**: Colored bars (teal = up days, pink = down days) below the price chart, with labels (e.g., “1%”, “D”, “E”) marking events.  
- **Y-Axis (Right)**: Price scale (224.00, 220.00).  


### **Right-Side Menu (Open)**  
A dropdown menu (likely from the “M” or chart settings icon) includes:  
- **Scale/Display Options**:  
  - `Auto (fits data to screen)` (checked), `Lock price to bar ratio`, `Scale price chart only`, `Invert scale`.  
  - `Regular` (checked, price scale), `Percent`, `Indexed to 100`, `Logarithmic`.  
- **Navigation**: `Move scale to left`.  
- **Labels/Lines**: Submenus for `Labels` and `Lines`.  
- **Countdown to bar close** (checked, highlighted in red box): Shows time remaining until the current candle closes.  
- `Plus button` (checked) and `Settings...`.  


### **Bottom Toolbar**  
- **Timeframe Buttons**: `1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All` (switch chart periods).  
- **Tabs**: `Stock Screener`, `Pine Editor` (for custom indicators), `Strategy Tester`, `Trading Panel`.  
- **Time/Status**: `08:45:09 (UTC-4)` (current time) and `ADJ` (adjusted data).  


### **Left Sidebar**  
Icons for drawing tools (trendlines, Fibonacci, text), chart types, and other functions (e.g., social sharing, settings).  


### **Purpose**  
This interface is used for technical analysis: traders analyze price trends, volume, and time remaining in the current candle, with tools to customize charts, add indicators, and manage alerts. The “Countdown to bar close” helps track intraday timing for trading decisions.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43494583159/original/tfTGIxiEf3qw2gVvU75qOy2qq01LUMFh_A.png?1719480643)

**Описание:** This TradingView chart displays the **GAMES WORKSHOP GROUP ORD GBP0.05** stock (LSE) on a **1-day (1D)** timeframe. Here’s a detailed breakdown of UI elements, charts, and their purposes:  


### **Top Bar & Status**  
- **Left**:  
  - `GAMES WORKSHOP GROUP ORD GBP0.05 · 1D · LSE`: Ticker symbol, timeframe, and exchange.  
  - `Market open · Data is delayed`: Status banner (red box) indicating market status and data latency.  
  - `O10,710 H10,850 L10,650 C10,740 -10 (-0.06%)`: Key price data (Open, High, Low, Close, Change, % Change).  
- **Right**:  
  - `New name` (with “Save”): Rename the chart.  
  - `Publish` (blue button): Share/publish the chart.  
  - Icons: Undo/redo, replay, alert, and other tools (e.g., chart type, indicators).  


### **Left Sidebar (Tools)**  
Vertical icons for charting tools:  
- Zoom, trend lines, Fibonacci, drawing tools, social sharing, indicators, text, and more (e.g., `+` for adding indicators, `T` for text, `Q` for search).  


### **Main Chart Area**  
- **Candlestick Chart**: Red/green candles show price action (red = close < open; green = close > open). The chart spans ~Nov 2023–Jul 2024, with price ranging ~9,200–10,800.  
- **Volume Bar Graph**: Below the candlestick chart, colored bars (teal = up days, pink = down days) show trading volume.  
- **Price/Volume Labels**:  
  - Top-left: `10720` (red) / `10750` (blue) (likely bid/ask or reference prices).  
  - `Vol 18.747K`: Current volume.  
  - Top-right: `10,740` (current price), `03:33:15` (timestamp), `10,600` (price level), `18.747K` (volume).  


### **Bottom Bar**  
- **Timeframe Tabs**: `1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All` (switch chart periods).  
- **Timestamp**: `13:46:44 (UTC+1)` (current time).  
- **Tabs**: `Stock Screener`, `Pine Editor` (for custom scripts), `Strategy Tester`, `Trading Panel`.  


### **Right Sidebar (Widgets)**  
Vertical icons for additional features:  
- Chart settings, time, patterns, alerts, chat, and help (e.g., calendar, question mark for support).  


### **Key Purposes**  
- **Candlestick Chart**: Analyze price trends, support/resistance, and volatility.  
- **Volume Bars**: Assess trading activity (high volume = strong momentum).  
- **Top Bar**: Track real-time price data and market status.  
- **Tools/Sidebar**: Customize charts, add indicators, or access trading features.  


This layout enables traders to analyze price action, volume, and market data for the GAMES WORKSHOP GROUP stock, with tools to customize and share insights.


**Описание:** This TradingView chart displays the daily (1D) price action of **GAMES WORKSHOP GROUP ORD GBP0.05** on the LSE (London Stock Exchange). Here’s a detailed breakdown of its UI elements and components:  


### **Top Toolbar & Status Bar**  
- **Left (Tools):** Icons for chart type (candlestick), timeframes (e.g., 1D, 5D), indicators, and drawing tools (lines, shapes, text).  
- **Center (Status):**  
  - Ticker: `GAMES WORKSHOP GROUP ORD GBP0.05 · 1D · LSE` (instrument details).  
  - Market status: `Market open · Data is delayed` (red box, indicating real-time data is not live).  
  - Price summary: `O10,710 H10,850 L10,650 C10,740 -10 (-0.06%)` (Open, High, Low, Close, change, % change).  
- **Right (Actions):**  
  - `New name` (rename chart), `Save`, `Publish` (share chart), and icons for alerts, replay, zoom, and settings.  


### **Left Sidebar (Tools Panel)**  
Vertical icons for:  
- Chart tools (lines, Fibonacci, text),  
- Indicators,  
- Social sharing,  
- Drawing tools (pen, shapes),  
- Timeframe selection (1D, 5D, 1M, etc.),  
- Global market data,  
- Favorites (star icon).  


### **Main Chart Area**  
- **Candlestick Chart:** Red/green candles show price movement (red = close < open; green = close > open). The chart spans late 2023 (Nov) to July 2024, with price ranging ~9,200–10,800.  
- **Volume Bar (Bottom):** Pink/green bars (matching candle colors) show trading volume. A red arrow highlights a volume spike (e.g., in Dec 2023).  
- **Price Axis (Right):** Y-axis with price levels (8,800–11,200).  
- **Time Axis (Bottom):** X-axis with months (Nov 2023–Jul 2024).  


### **Bottom Toolbar**  
- **Timeframe Buttons:** `1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All` (switch chart periods).  
- **Additional Tools:** Calendar, adjust (ADJ), and timestamp (`13:46:44 UTC+1`).  
- **Tabs:** `Stock Screener`, `Pine Editor` (code editor), `Strategy Tester`, `Trading Panel` (for order execution).  


### **Right Sidebar (Widgets)**  
Icons for:  
- Notes,  
- Alerts,  
- Market depth,  
- News,  
- Chat,  
- Ideas,  
- Full-screen,  
- Calendar,  
- Help.  


### **Key Data Points**  
- Current price: `10,740` (top-right box, with timestamp `03:33:15`).  
- Volume: `18.747K` (below price box, matching the volume bar).  


This layout provides a comprehensive view of price action, volume, and tools for analysis, trading, and sharing.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

