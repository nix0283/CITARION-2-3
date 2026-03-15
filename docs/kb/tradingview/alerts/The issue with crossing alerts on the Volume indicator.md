# The issue with crossing alerts on the Volume indicator

**URL:** https://www.tradingview.com/support/solutions/43000744212-the-issue-with-crossing-alerts-on-the-volume-indicator/

---

- [ Help Center ](/) - / - / [ The issue with crossing alerts on the Volume indicator ](/support/solutions/43000744212-the-issue-with-crossing-alerts-on-the-volume-indicator/) # The issue with crossing alerts on the Volume indicator The alert for crossing the Volume indicator with the value can be triggered when the volume of the new candle has not yet crossed the value set in the alert. This happens because the Volume value at the candle's open is almost zero. And if the volume on the previous candle was higher than the value from the condition in the alert, then when the candle opens, this level is crossed. This is clearly visible if you select to display the indicator as a line: The screenshots below show that the volume crosses the set value, and the condition for triggering the alert is considered fulfilled: If you need to know when the volume will be above or below a certain level, it is recommended to use the “Greater than” condition for alerts. Previous Previous Issue with "Once Per Bar" alert Next Next Issue with alerts on indicators that use offsets Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43536256122/original/I4v2Pv0hkH9QIpWjGNRpTdP-ePN6DKNlsw.png?1737554952)

**Описание:** This TradingView chart displays the **BTC/USD (Bitcoin/U.S. Dollar)** pair on a **1-minute (1m)** timeframe from the **OANDA** exchange. Here’s a detailed breakdown of UI elements and their purposes:  


### **Top Bar (Header)**  
- **Symbol & Exchange**: “BTC/USD” (current instrument) + “Bitcoin / U.S. Dollar · 1 · OANDA” (full instrument name, timeframe, and exchange).  
- **Price Data**: “O104,971.6 H104,974.9 L104,960.6 C104,974.9 +1.8 (+0.00%)” shows **Open, High, Low, Close** prices, and **change** (green = positive, red = negative).  
- **Timeframe Selector**: “1m” (1-minute candlestick) with a dropdown to switch timeframes (e.g., 1m, 5m, 1h).  
- **Tools**:  
  - `Indicators` (dropdown to add technical indicators).  
  - `Alert` (set price/volume alerts).  
  - `Replay` (replay historical price action).  
  - Navigation arrows (back/forward through chart history).  
  - `TradingView` (logo, account/settings).  
  - `Publish` (share chart publicly).  


### **Left Sidebar (Drawing/Tools)**  
Icons for:  
- Drawing (lines, shapes, text).  
- Trendlines, Fibonacci tools.  
- Chart type (candlestick, line, bar).  
- Volume (ticks, volume).  
- Text, magnifying glass (zoom), magnet (snap to grid), lock (lock chart), eye (visibility), link (share), trash (delete).  


### **Main Chart Area**  
- **Candlestick Chart**: Green candles = price closed higher than open; red = closed lower. Shows price action over time.  
- **Volume Histogram**: Below the candlesticks, colored bars (teal = buying volume, red = selling volume) represent trading volume per candle. A dashed line marks a volume threshold (e.g., 150 ticks).  
- **Annotations**: Red arrows highlight low volume (rightmost teal bar) and a dashed volume line. A purple “refresh” icon (top-right of candles) indicates a recent update.  


### **Right Sidebar (Price/Time)**  
- **Price Axis**: Vertical numbers (e.g., 104,920.0–105,120.0) show price levels.  
- **Time Axis**: Horizontal timestamps (7:57–08:17) show when each candle/volume bar occurred.  
- **Current Price Box**: “104,974.9 00:59” displays the latest price and time.  
- **USD Dropdown**: Currency selector for price display.  


### **Bottom Bar**  
- **Timeframe Tabs**: “1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All” (switch chart period).  
- **UTC Time**: “08:12:01 (UTC)” (current time).  
- **Tools**: “Stock Screener, Pine Editor, Strategy Tester, Replay Trading, Trading Panel” (advanced features).  


### **Key Elements**  
- **Vol · Ticks 6**: Label for the volume histogram (shows “ticks” as the volume metric).  
- **“TV PRO” Logo**: Bottom-left, indicates a Pro subscription.  


This layout enables traders to analyze price trends, volume, and execute technical analysis with drawing tools, indicators, and time-based views.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43536256325/original/WqZGFpyb__YJ9Ip0_HPfbfMhr7qnWhmO3Q.png?1737554980)

**Описание:** This TradingView screenshot displays a **BTC/USD 1-minute candlestick chart** (Bitcoin/U.S. Dollar) from OANDA, with a **Volume indicator configuration panel** open. Here’s a detailed breakdown:


### **Top Navigation Bar**  
- **Left**: Symbol (`BTC/USD`), time frame (`1m`), and tools (zoom, indicators, alert, replay, undo/redo).  
- **Right**: TradingView logo, save, settings, chart layout, screenshot, and `Publish` button.  


### **Chart Header**  
- Symbol details: `Bitcoin / U.S. Dollar · 1 · OANDA`  
- Price data: `O104,868.0 H104,868.0 L104,868.0 C104,868.0 +2.7 (+0.00%)` (open, high, low, close, change).  
- Price scale (right): `104,900.0` to `0`, with current price `104,868.0` highlighted in green.  


### **Main Chart Area**  
- **Candlestick Chart**: Green/red candles show price action (green = closing > opening; red = closing < opening).  
- **Volume Indicator**: A line chart (light blue) below the candles, labeled `Vol · Ticks` (volume in ticks).  
- **Time Axis**: X-axis shows timestamps (`8:25` to `08:45`).  


### **Volume Indicator Panel (Center)**  
A modal for configuring the Volume indicator, with three tabs: `Inputs`, `Style` (active), `Visibility`.  

#### **Style Tab**  
- **Volume Toggle**: Checked (enabled).  
- **Color Settings**:  
  - `Growing` (green checkered) / `Falling` (red checkered) for volume direction.  
- **Line Style Dropdown**: Open, showing options (red arrow highlights `Line with breaks`):  
  - `Price line` (toggle off), `Line`, `Line with breaks` (selected), `Step line`, `Step line with breaks`, `Step line with diamonds`, `Histogram`, `Cross`, `Area`, `Area with breaks`, `Columns`, `Circles`.  
- **Outputs Section**:  
  - `Precision`: `Default` (dropdown).  
  - `Labels on price scale`: Checked (shows volume labels on the price axis).  
  - `Values in status line`: Checked (displays volume values in the status bar).  
- **Defaults**: Dropdown for resetting settings.  


### **Left Sidebar**  
Icons for tools: drawing (pen, trendline), chart type (candle, bar), indicators, text, zoom, compare, pine editor, lock, visibility, link, delete.  


### **Bottom Bar**  
- **Time Frames**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (select chart duration).  
- **Tabs**: `Stock Screener`, `Pine Editor`, `Strategy Tester`, `Replay Trading`, `Trading Panel`.  


### **Right Sidebar**  
Icons for order book, clock, depth, chat, chart type, target, calendar, community, notifications, help.  


### **Status Bar (Bottom Right)**  
Timestamp: `08:40:02 (UTC)`.  


This interface is used for real-time Bitcoin price analysis, with the Volume indicator panel allowing customization of how volume data is visualized (e.g., line style, colors, labels).


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43536256446/original/GXutiUQQ1bT-mxvTO7zSKZ7zio1EY5JMxw.png?1737555007)

**Описание:** This TradingView chart displays the **BTC/USD (Bitcoin/U.S. Dollar)** pair on a **1-minute (1m)** timeframe from the **OANDA** exchange. Here’s a detailed breakdown of the UI elements:  


### **Top Toolbar**  
- **Left**:  
  - `BTC/USD`: Symbol name.  
  - `+`: Add new chart.  
  - `1m`: Timeframe selector (1-minute candlesticks).  
  - `⚖️`: Trading tools (e.g., order placement).  
  - `📊 Indicators`: Dropdown to add technical indicators.  
  - `🔲`: Chart style toggle (e.g., candlestick, line, bar).  
  - `⏰ Alert`: Set price alerts.  
  - `▶️ Replay`: Replay historical price action.  
  - `↩️/↪️`: Undo/redo actions.  

- **Right**:  
  - `TradingView`: Platform logo/dropdown.  
  - `🔄`: Refresh chart.  
  - `⚙️`: Settings.  
  - `[]`: Full-screen mode.  
  - `📷`: Screenshot tool.  
  - `Publish`: Share chart.  


### **Symbol & Price Bar**  
- `Bitcoin / U.S. Dollar · 1 · OANDA`: Symbol details (pair, timeframe, exchange).  
- `O 105,198.2 H 105,201.6 L 105,196.2 C 105,196.2 -1.9 (-0.00%)`:  
  - `O` (Open), `H` (High), `L` (Low), `C` (Close) prices for the current candle.  
  - `-1.9 (-0.00%)`: Daily change (negligible here).  


### **Main Chart (Candlesticks)**  
- **Candlesticks**: Green = bullish (close > open), Red = bearish (close < open).  
- **Price Scale (Right)**: Y-axis showing price levels (105,000–105,300 USD).  
- **Current Price Box**: `105,196.2 00:55` (last traded price + timestamp).  


### **Volume/Ticks Subchart**  
- `Vol · Ticks 4`: Volume/tick data (light blue line).  
- **Volume Scale (Right)**: Y-axis (0–500 ticks).  
- **Red Arrow**: Highlights a sharp drop in volume/ticks around 08:55.  


### **Left Sidebar (Tools)**  
Vertical icons for:  
- Drawing tools (trendlines, shapes).  
- Chart types (candlestick, line, bar).  
- Text, zoom, and other analysis tools.  


### **Bottom Toolbar**  
- **Time Range**: `8:42–09:02` (x-axis, 1-minute intervals).  
- **Timeframe Buttons**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (switch chart duration).  
- **UTC Timestamp**: `08:56:06 (UTC)` (current time).  
- **Tabs**: `Stock Screener`, `Pine Editor` (scripting), `Strategy Tester`, `Replay Trading`, `Trading Panel` (order execution).  


### **Right Sidebar (Additional Tools)**  
Icons for:  
- Order book, trade history, chat, and other platform features (e.g., calendar, help).  


### **Key Purpose**  
This interface is used for **technical analysis** of Bitcoin’s short-term price action, enabling traders to:  
- Track real-time price movements (candlesticks).  
- Analyze volume/tick patterns (subchart).  
- Apply indicators, set alerts, or replay price action.  
- Execute trades or share insights.  

The 1-minute timeframe is ideal for scalping or short-term trading strategies.


