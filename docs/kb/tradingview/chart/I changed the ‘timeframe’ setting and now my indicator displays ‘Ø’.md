# I changed the ‘timeframe’ setting and now my indicator displays ‘Ø’

**URL:** https://www.tradingview.com/support/solutions/43000586466-i-changed-the-timeframe-setting-and-now-my-indicator-displays/

---

- [ Help Center ](/) - / - / [ I changed the ‘timeframe’ setting and now my indicator displays ‘… ](/support/solutions/43000586466-i-changed-the-timeframe-setting-and-now-my-indicator-displays/) # I changed the ‘timeframe’ setting and now my indicator displays ‘Ø’ Some TradingView indicators have a ‘timeframe’ setting, which enables MTF functionality. This setting allows you to calculate the indicator on a timeframe that is different from the one you currently have on the chart. You can read more about MTF functionality in our [Help Center](https://www.tradingview.com/chart/?solution=43000584445). If the 'timeframe' setting is set to the timeframe higher than the one on the chart and the "Wait for timeframe closes" option is turned on, the indicator's plots will return Ø on most bars instead of a numerical value. To demonstrate, let’s start by opening a 1m chart and adding a Moving Average (MA) indicator that calculates based on the data from the 5m timeframe. Here’s how it’ll look: As you can see in the top left corner, the MA indicator displays Ø instead of a numerical value. But why does this happen? When the indicator requests the data from the 5m timeframe, it gets one MA value for each of the five minutes. On the chart, one bar is equal to 1m of time, so we have five times as much data for the chart itself than for the indicator. Effectively, for each of the five bars, we can only have one MA value. In order to draw the indicator in this case, we attach the MA values to every fifth bar and then connect them with a straight line. In the end, we get a relatively smooth MA where every fifth bar has an associated MA value, whereas all bars in between don't - they display Ø instead. If you change the style of the indicator to Line With Breaks in its settings, you’ll see where the actual values are located. With this style, the values will no longer be connected by lines. On real-time data, the indicator will be drawn only up to the last available closed bar of the indicator’s timeframe. In our example, the MA values will lag 1-4 bars behind the chart, because the 5m bar that the indicator is based on has not yet closed. A new value will appear as soon as the 5m bar closes, so it will happen once every five minutes. Previous Previous Earnings, splits or dividends labels are not displayed Next Next Color glitches (artifacts) suddenly appear on the chart Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43584534748/original/OFKZWAIgWjJ6gVOzeAFH8I69GYfJOaqEiw.png?1759750010)

**Описание:** This is a **TradingView chart** displaying a 1-minute (1m) candlestick chart for **Meta Platforms, Inc. (NASDAQ: META)**. Here’s a detailed breakdown of the UI elements:  


### **Top Toolbar**  
- **Left**:  
  - `META` (ticker) + `1m` (timeframe) + `+` (add symbol) + `1m` (timeframe selector) + `⚖️` (volume/price toggle) + `📊 Indicators` (add indicators) + `🔲` (chart style: candle/line/area) + `🔔 Alert` (set price alerts) + `⏮ Replay` (replay market data) + `↶↷` (undo/redo).  
- **Right**:  
  - `TradingView` (logo) + `💾 Save` (save chart) + `🔄` (refresh) + `⚙️` (settings) + `📷` (screenshot) + `📤 Publish` (share chart).  


### **Ticker & Price Info**  
- Ticker: `META, Inc. · 1 · NASDAQ` (Meta Platforms, Inc., 1-minute timeframe, NASDAQ exchange).  
- Price data: `O258.12 H258.22 L258.10 C258.21 +0.09 (+0.03%)` (Open: 258.12, High: 258.22, Low: 258.10, Close: 258.21, +0.09 change, +0.03% gain).  


### **Chart Area**  
- **Candlesticks**: Red (price decline) and green (price rise) candles show price action over 1-minute intervals.  
- **Moving Averages**: A blue line (likely a 5-period SMA, per the `MA: 5 9 close 0 SMA 5` label) tracks average price.  
- **Price Scale (Right)**: Vertical axis with prices (256.80–259.10) for reference.  
- **Time Scale (Bottom)**: Horizontal axis with timestamps (12:00–15:45) and a tooltip showing `Fri 03 Oct '25 15:11` (current time).  


### **Left Sidebar (Tools)**  
Icons for:  
- `⚙️` (settings), `📊` (drawing tools), `👥` (social), `🔧` (Pine Editor), `📏` (measure), `🔍` (zoom), `📡` (data), `🔒` (lock), `👁️` (visibility), `🔗` (link), `🗑️` (delete).  


### **Bottom Toolbar**  
- **Timeframe Selector**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (switch between timeframes).  
- **Additional Info**: `07:25:51 UTC-4 RTH ADJ` (UTC time, regular trading hours, adjusted data).  


### **Bottom Panels**  
- `Pine Editor` (code editor for custom indicators) + `Trading Panel` (place trades).  


### **Right Sidebar (Icons)**  
Icons for:  
- `📝` (notes), `🕒` (time), `⚖️` (volume), `💬` (chat), `🌐` (global), `📈` (indicators), `📅` (calendar), `⚙️` (settings), `📶` (connectivity), `❓` (help).  


### **Key Purpose**  
This chart is used for **technical analysis** of Meta’s stock, showing short-term price movements (1-minute candles) with a moving average to identify trends. Traders use tools (drawing, indicators, alerts) to analyze price action, set alerts, and make trading decisions.


**Описание:** This TradingView chart displays **Apple Inc. (AAPL) on NASDAQ** with a **1-minute (1m) candlestick timeframe**. Here’s a detailed breakdown:  


### **Top Bar (Toolbar)**  
- **Left**:  
  - `AAPL` (ticker) + `Apple Inc. · 1 · NASDAQ` (symbol/exchange).  
  - Sun icon (market status: pre-market/regular hours) + `O258.12 H258.22 L258.10 C258.21 +0.09 (+0.03%)` (open/high/low/close + change/percent change).  
  - `MA · 5 9 close 0 SMA 5` (moving average settings: 5-period and 9-period Simple Moving Averages).  
- **Middle**:  
  - `1m` (timeframe selector) + `Indicators` (dropdown for adding technical indicators) + `Alert` (set price alerts) + `Replay` (replay market data) + navigation arrows (previous/next chart).  
- **Right**:  
  - `TradingView` (logo) + `Save` (save chart) + `Publish` (share chart) + icons for settings, chart styles, and more.  


### **Left Sidebar (Tools)**  
Vertical icons for:  
- Drawing tools (lines, shapes, text).  
- Chart types (candlestick, line, bar).  
- Social/analysis features (community, Pine Editor, Trading Panel).  


### **Main Chart Area**  
- **Candlestick Chart**: Red/green candles show price action (green = close > open; red = close < open).  
- **Blue Line**: 5-period Simple Moving Average (SMA) to smooth price trends.  
- **Price Scale (Right)**: Y-axis with values (256.80–259.10) and a tooltip showing `258.64` (current price).  


### **Bottom Bar**  
- **Time Axis (X-axis)**: Timestamps (12:00–15:45) + `Fri 03 Oct '25 15:11` (current time).  
- **Timeframe Selector**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (switch between timeframes).  
- **Status Info**: `07:25:51 UTC-4 RTH ADJ` (UTC time, regular trading hours, adjusted data).  


### **Key UI Elements**  
- **Tooltip**: Hovering over the chart shows price (`258.64`) and time.  
- **Indicators**: The blue SMA is active (configured via `MA · 5 9 close 0 SMA 5`).  
- **Navigation/Actions**: Top bar tools for saving, publishing, and customizing the chart.  


This layout is typical of TradingView’s interface, designed for real-time technical analysis with customizable tools, timeframes, and indicators.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43584535063/original/E2pJiQ19QDvyFKhzFsvfyWquKwEate4tYg.png?1759750101)

**Описание:** This TradingView chart displays **Apple Inc. (NASDAQ: AAPL)** on a **1-minute (1m)** timeframe, with a candlestick chart showing price action (green/red candles) over the trading day. Here’s a detailed breakdown of UI elements:  


### **Top Toolbar**  
- **Left**:  
  - *Timeframe selector*: “1m” (current), with options for 1D, 5D, 1M, etc.  
  - *Indicators*: Dropdown to add technical indicators (e.g., MA, RSI).  
  - *Alert/Replay*: Set price alerts or replay historical price action.  
- **Right**:  
  - *TradingView/Saved*: Toggle saved charts.  
  - *Publish*: Share or publish the chart.  


### **Chart Header**  
- **Symbol/Timeframe**: “Apple Inc · 1 · NASDAQ” (stock name, timeframe, exchange).  
- **Price Data**: Real-time open (O257.86), high (H258.06), low (L257.80), close (C258.01), and change (+0.15, +0.06%).  
- **Indicator Bar**: Shows active indicators (e.g., “MA 5 9 close 0 SMA 5”) with edit/delete icons.  


### **Main Chart Area**  
- **Candlestick Chart**: Green/red candles represent price movements (green = close > open; red = close < open).  
- **Moving Average (MA) Settings Popup**: Open to customize the MA indicator:  
  - *Tabs*: `Inputs` (parameters), `Style` (selected, for visual customization), `Visibility` (show/hide).  
  - *Style Options*: Dropdown menu with line styles (e.g., “Line with breaks,” “Step line,” “Histogram,” “Area”) and color/line-type controls.  
  - *Checkboxes*: “Labels on price scale” (show MA values on price axis) and “Values in status line” (show MA values in the chart’s status bar).  


### **Left Sidebar**  
Icons for tools:  
- Drawing (pen), chart type (candlestick), indicators, alerts, and more (e.g., trend lines, Fibonacci tools).  


### **Bottom Toolbar**  
- *Time Axis*: Timestamps (12:00–15:45) for the 1m chart.  
- *Period Selector*: “1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All” to switch timeframes.  
- *Timestamp/Settings*: “07:27:50 UTC-4” (current time) and “RTH/ADJ” (regular trading hours/adjusted).  


### **Right Sidebar**  
Icons for:  
- Chart settings, order book, chat, and additional tools (e.g., full-screen, screenshot).  


### **Purpose**  
This interface is used for **technical analysis**—traders customize indicators (like the MA) to identify trends, support/resistance, and trading signals. The 1m timeframe is ideal for short-term (intraday) trading, while the MA helps smooth price data to spot trends.


**Описание:** This TradingView chart displays **TSLA (Tesla Inc.) on the NASDAQ** (1-minute timeframe, per the \


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

