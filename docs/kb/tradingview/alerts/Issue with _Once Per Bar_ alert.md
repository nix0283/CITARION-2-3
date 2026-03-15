# Issue with "Once Per Bar" alert

**URL:** https://www.tradingview.com/support/solutions/43000741171-issue-with-once-per-bar-alert/

---

- [ Help Center ](/) - / - / [ Alerts are being triggered incorrectly/not being triggered ](/support/folders/43000548797-alerts-are-being-triggered-incorrectly-not-being-triggered/) - / [ Issue with "Once Per Bar" alert ](/support/solutions/43000741171-issue-with-once-per-bar-alert/) # Issue with "Once Per Bar" alert Alerts on indicators with a frequency different from Once Per Bar Close (which are Once , Once Per Minute , and Once Per Bar ) can trigger during the bar building. Since HLC ( High , Low , Close ) changes during the bar building, the values of indicators that depend on HLC can also change. This leads to the fact that the time of execution of the triggering condition on the chart does not always coincide with the time of the actual alert triggering. For example, let's consider 2 common cases: - the alert triggered, but the condition is not met on the chart - the alert triggered later than the condition was met on the chart 1) The alert triggered, but the condition is not met on the chart The screenshots below show the change in HLC and RSI during the bar construction from 10:00 in replay mode. The first screenshot shows that at a certain point, the RSI value was below 30 (i.e. there was an intersection of level 30). The second screenshot shows that at the moment of closing of this bar, the RSI value rose above 30 (i.e. there is no longer a crossing of level 30). Thus, the alert with the condition RSI Crossing 30 would have been triggered during the process of constructing the bar from 10:00, although at the moment of the bar's closing, it may seem that it should not have been triggered. 2) The alert triggered later than the condition on the chart was met The screenshots below show the change in HLC and BB Lower Band during the process of building the bar from 02:00 in the bar replay mode, as well as the level at which the Lower Band value and the bar wick intersect (68840, black dotted line). The first screenshot shows that while building the bar, the Close value was below level 68840, and the indicator value was below the Close value, while the bar and indicator did not intersect at level 68840. The second screenshot shows that at the moment of the bar closing, the Close rose above the level of 68840. The indicator value also increased, but since the Low value remained unchanged (it can only decrease during the bar building), the indicator and wick crossed at the level of 68840. It is important to note that the crossing did not occur at the moment when the price dropped to the level of 68840 but at the moment when the indicator value rose to this level. Thus, the alert with the condition BTCUSD Crossing BB LowerBand would have triggered during the building process precisely at the moment when both the price and the indicator value began to rise. However, after the bar closed, it may seem that the triggering should have occurred earlier (namely, at the moment when the price dropped to the level of 68840). Previous Previous Alert was triggered too often and stopped Next Next The issue with crossing alerts on the Volume indicator Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43525449197/original/FgpDhfQg7CptwDBR35SxWDAEr_za9lMOJw.png?1732538140)

**Описание:** This TradingView screenshot displays a **1-hour (1h) candlestick chart** for **Bitcoin / U.S. Dollar (BTC/USD)** on the **COINBASE** exchange. Here’s a detailed breakdown of all elements:  


### **Top Bar (Header)**  
- **Left**:  
  - `BTC/USD` (symbol name) + `+` (add new symbol).  
  - `1h` (timeframe selector, currently 1-hour).  
  - `⚙️` (settings) + `Indicators` (dropdown to add technical indicators).  
  - `📊` (chart type) + `Alert` (set price alerts) + `Replay` (replay market data).  
- **Right**:  
  - `TradingView` (brand) + `⚡` (refresh) + `⚙️` (settings) + `[]` (chart layout) + `📷` (screenshot) + `Publish` (share chart).  


### **Symbol & Price Info**  
- `🟠 Bitcoin / U.S. Dollar · 1h · COINBASE` (symbol details).  
- `▶️` (live data indicator) + `O58,028.14 H58,217.61 L57,820.00 C57,820.00 -200.71 (-0.35%)` (open, high, low, close, change, % change).  
- `USD` (currency selector, top-right).  


### **Main Chart (Candlesticks)**  
- **Candlesticks**: Red (price decline) and green (price rise) bars showing 1-hour price action.  
- **Y-axis (right)**: Price scale (e.g., 57,800.00 to 58,600.00 USD).  


### **Indicator Panel (RSI)**  
- `RSI 14 close` (Relative Strength Index, 14-period, close-based) + `🟢 27.93 27.93` (RSI value).  
- **RSI Subchart**: Purple line (RSI) with dashed overbought (60–80) and oversold (20–40) zones. Y-axis (right) ranges 0–80.  


### **Left Toolbar (Drawing/Tools)**  
Icons for:  
- Trend lines, Fibonacci, moving averages, text, RSI, zoom, pattern recognition, lock, hide, link, delete.  


### **Bottom Bar**  
- **Time Navigation**: `05:00` to `14:00` (time labels) + `Mon 19 Aug ’24 10:00` (current time marker).  
- **Playback Controls**: `Select bar` (dropdown) + play/pause/step + `1x` (speed) + `Sell`/`Buy`/`Flatten` (trading buttons) + `×` (close trade).  
- **Timeframe Tabs**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (switch timeframes).  
- **Timestamp**: `11:34:23 (UTC)` (current time).  


### **Bottom Tabs**  
- `Stock Screener` (scan symbols) + `Pine Editor` (code indicators) + `Strategy Tester` (backtest) + `Replay Trading` (active) + `Trading Panel` (order management).  


### **Right Toolbar**  
Icons for:  
- Order book, clock (time), depth (order flow), ideas, chat, alerts, notifications, chart styles, calendar, help.  


### **Purpose**  
This interface is used for **technical analysis** (candlesticks, RSI) and **trading** (buy/sell buttons) of BTC/USD, with tools to customize charts, set alerts, and replay market data.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43525449547/original/TDoeME0ISpoZFX3WAHg4Tc25_BW7bNihSw.png?1732538208)

**Описание:** This TradingView chart displays the **BTC/USD (Bitcoin/U.S. Dollar)** pair on **Coinbase** with a **1-hour (1h)** timeframe. Here’s a detailed breakdown of UI elements, charts, and their purposes:  


### **Top Bar (Header)**  
- **Symbol/Timeframe**: `BTC/USD` (symbol) + `1h` (timeframe) + `Indicators` (dropdown to add technical indicators) + `Alert` (set price alerts) + `Replay` (replay market movements) + `TradingView` (logo/dropdown) + `Publish` (share chart).  
- **Market Data**: `O58,069.26 H58,514.38 L57,989.18 C58,399.21 +334.52 (+0.58%)` shows **Open, High, Low, Close** prices and daily change.  


### **Main Chart (Candlestick)**  
- **Candlesticks**: Red (price decline) and green (price increase) bars represent price action over 1-hour intervals.  
- **Price Axis (Right)**: Vertical scale for Bitcoin price (e.g., 57,800–58,600 USD).  


### **Indicator Panel (Below Main Chart)**  
- **RSI (Relative Strength Index)**: A momentum oscillator (purple line) with:  
  - `RSI 14 close` (indicator name/period) + `40.14` (current RSI value).  
  - Horizontal dashed lines (overbought/oversold levels, e.g., 20, 40, 60, 80).  


### **Left Sidebar (Tools)**  
Icons for drawing (trendlines, shapes), chart types (candlestick, line), and other functions (e.g., `T` for text, `+` for zoom, `magnet` for Fibonacci tools).  


### **Bottom Bar**  
- **Time Navigation**: `05:00–14:00` (x-axis, showing the trading day).  
- **Replay Controls**: `Select bar` (choose a candle) + play/pause buttons + `1x` (speed) + `Sell/Buy/Flatten` (trading actions).  
- **Timeframe Tabs**: `1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All` (switch chart duration).  
- **Timestamp**: `11:34:38 (UTC)` (current time).  


### **Right Sidebar**  
Icons for notes, clock (timeframes), patterns, ideas, chat, alerts, and more (e.g., `?` for help).  


### **Bottom Tabs**  
`Stock Screener`, `Pine Editor` (code indicators), `Strategy Tester`, `Replay Trading` (active), `Trading Panel` (order execution).  


This layout enables traders to analyze price trends, apply indicators, and execute trades, with tools for customization, replay, and real-time data.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43525455329/original/0gSeRS-HaCONbIQ-NqdcUZZp02dIcNkw3g.png?1732539221)

**Описание:** This TradingView chart displays the **BTC/USD (Bitcoin/U.S. Dollar)** pair on the **Coinbase** exchange, using a **1-hour (1h)** time frame. Here’s a detailed breakdown of the UI elements:  


### **Top Toolbar**  
- **Symbol/Exchange**: Shows \


