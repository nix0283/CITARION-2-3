# How to select replay interval for the Bar Replay

**URL:** https://www.tradingview.com/support/solutions/43000739158-how-to-select-replay-interval-for-the-bar-replay/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Chart - / [ Bar Replay ](/support/folders/43000547807-bar-replay/) - / [ How to select replay interval for the Bar Replay ](/support/solutions/43000739158-how-to-select-replay-interval-for-the-bar-replay/) # How to select replay interval for the Bar Replay In the market simulation mode, you can choose different intervals for replay. The replay interval is the amount of time that corresponds to one data update in the Bar Replay mode. If it is set to 5 minutes, then for each tick in the replay mode, data will be added that corresponds to 5 minutes in real-time. The current interval is displayed on the simulator control panel to the right of the replay speed. Clicking on it will open a menu for selecting available intervals for this chart. The minimum replay interval for second charts is 1 second, and for intraday and daily intervals, it is 1 minute. Weekly and monthly charts can only be played in one-day intervals. The available replay intervals in the Bar Replay mode for several charts are selected, considering the smaller intervals selected on the charts. For example, if there are two charts in the workspace - AAPL 5 min and AAPL 1 day - then the replay intervals of 1 min and 5 min will be available for them. For the AAPL 2 min and 17 min charts, only 1 replay interval is available - 1 minute because it is the only interval that evenly divides the chart intervals (2 and 17 min). When the "Auto select interval" option is active, the replay interval is selected automatically: the current chart interval for a single-chart layout, the largest common interval among the charts for a multi-chart layout mode. Also read: - [Layouts: a quick guide](https://www.tradingview.com/support/solutions/43000746975-tradingview-layouts-a-quick-guide/) - [How to trade on TradingView](https://www.tradingview.com/support/solutions/43000756695-how-to-trade-on-tradingview/) - [Introduction to TradingView alerts](https://www.tradingview.com/support/solutions/43000520149-introduction-to-tradingview-alerts/) - [How to configure your Supercharts](https://www.tradingview.com/support/solutions/43000748166-how-to-configure-your-supercharts/) - [Indicators: simple steps to get started](https://www.tradingview.com/support/solutions/43000543626-tradingview-indicators-simple-steps-to-get-started/) Previous Previous How much data is available for Bar Replay? Next Next How do I disable Executions in Bar Replay? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43559657501/original/d1ABKXpmnzM3rngGJvHtj8vjDY5jn1Yp8Q.png?1748002010)

**Описание:** This TradingView chart displays **Apple Inc. (NASDAQ: AAPL)** on a **1-day (1D)** timeframe, showing a candlestick price chart with volume bars below. Here’s a detailed breakdown of the UI elements:  


### **Top Toolbar**  
- **Left**:  
  - `+` (Add chart), `D` (Timeframe selector, set to \


**Описание:** This TradingView image displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** in replay mode, with the following key elements:  


### **Top Bar & Header**  
- **Left**: TradingView logo, “AAPL” ticker, time frame (“D” for daily), and a vertical toolbar (icons for drawing tools, indicators, alerts, etc.).  
- **Center**: Ticker details: *“Apple Inc · 1D · NASDAQ”*; price data: *“O 205.17 H 207.04 L 200.71 C 202.09 -4.77 (-2.31%)”* (open, high, low, close, change).  
- **Right**: “Replay” button (active), “Alert” button, navigation arrows, and a “Publish” button.  


### **Price & Order Panel**  
- **Sell/Buy Prices**: Red box shows *“200.99 SELL”* (sell price), blue box shows *“201.09 BUY”* (buy price) with a $0.10 spread.  
- **Volume**: *“Vol 59.21M”* (59.21 million shares traded).  


### **Main Chart (Candlestick)**  
- **Candles**: Green (up) and red (down) candles represent daily price action (open, high, low, close) over months (Oct 2024–Jul 2025).  
- **Y-Axis (Right)**: Price scale (e.g., 200.00, 210.00, 260.00 USD).  
- **Horizontal Line**: Dotted red line marks the current close price (*202.09*).  


### **Volume Bar (Below Chart)**  
- **Bars**: Pink (sell volume) and teal (buy volume) bars show daily trading volume.  
- **X-Axis (Bottom)**: Time scale (months: Oct, Nov, Dec, 2025, Apr, May, Jun, Jul).  


### **Replay Controls**  
- **“UPDATE INTERVAL” Dropdown**: Open menu with options (1 hour, 2 hours, 3 hours, 4 hours, *“1 day”* (selected)).  
- **“Replay interval” Toggle**: Switch to control replay speed.  
- **Playback Buttons**: Play, pause, speed (0.5x), and time frame (“D” for daily) controls.  


### **Bottom Bar**  
- **Time Frames**: Tabs for 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All.  
- **Right**: “Sell/Buy/Flatten” buttons, timestamp (*12:01:37 UTC*), and “ADJ” (adjusted data) label.  


### **Left & Right Toolbars**  
- **Left**: Icons for drawing (trend lines, Fibonacci), indicators, and account tools.  
- **Right**: Icons for charts, alerts, chat, and settings.  


### **Bottom Tabs**  
- Tabs for “Crypto Pairs Screener,” “Pine Editor,” “Strategy Tester,” “Replay Trading” (active), and “Trading Panel.”  


This layout is typical of TradingView’s interface, designed for technical analysis, replay trading, and real-time market monitoring.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43559657552/original/1CEFAIf5JahaRePbPo39RBBCy1tHh1cDdg.png?1748002029)

**Описание:** This TradingView interface displays a **dual-chart layout** for Apple Inc. (NASDAQ: AAPL) with two timeframes: a **1-day (1D) candlestick chart** (left) and a **5-minute (5m) candlestick chart** (right), plus a trading panel at the bottom. Here’s a detailed breakdown:


### **Top Navigation Bar**  
- **Left**:  
  - `Apple Inc · 1D · NASDAQ`: Ticker symbol and timeframe.  
  - `O205.17 H207.04 L200.71 C202.09 -4.77 (-2.31%)`: Daily open, high, low, close, and daily change.  
  - `201.04 SELL` (red) / `201.13 BUY` (blue): Current bid/ask prices with spread (0.09).  
  - `Vol 59.21M`: Daily trading volume.  
- **Right**:  
  - `USD`: Currency selector.  
  - `Replay` (black button): Toggle replay mode (for backtesting).  
  - `Replay Save`: Save replay sessions.  
  - Icons: Chart type (candlestick), indicators, alert, replay, zoom, settings, full-screen, camera, and `Publish` (share chart).  


### **Left Chart: 1-Day (1D) Candlestick**  
- **Price Action**: Candlesticks show daily price movements (green = up, red = down) from March to June.  
- **Volume**: Bar graph below the price chart (green = up days, red = down days) with `59.21M` total volume.  
- **Timeframe Selector**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (bottom left) to switch timeframes.  


### **Right Chart: 5-Minute (5m) Candlestick**  
- **Price Action**: Intraday candlesticks (green/red) with:  
  - `O201.78 H202.50 L201.78 C202.05 +0.27 (+0.13%)`: 5-minute open, high, low, close, and change.  
  - `201.04 SELL` / `201.13 BUY`: Current bid/ask (same as left chart).  
  - `Vol 20 236.17K 81.6K`: Volume metrics (current, high, low).  
- **Volume**: Bar graph below with `236.17K` (peak) and `81.6K` (low) volumes.  
- **Time Axis**: `21` (21:00) to `22` (22:00) for intraday timing.  


### **Trading Panel (Bottom)**  
- **Update Interval**: Dropdown menu (1 minute / 5 minutes) with `Auto select interval` toggle (off).  
- **Controls**:  
  - `Select bar`: Choose a specific candlestick.  
  - Playback buttons: Play, pause, speed (0.5x), and 5m interval.  
  - `Sell` / `Buy` / `Flatten`: Trading buttons (right).  
- **Timestamp**: `12:02:24 UTC` (current time).  


### **Left Sidebar (Icons)**  
Vertical menu with tools:  
- Chart tools (pen, trendline, Fibonacci), social (share), text, favorites, zoom, drawing, lock, chart style, link, delete, star (favorites).  


### **Right Sidebar (Icons)**  
Vertical menu with:  
- Notes, clock (alerts), patterns, chat, target, calendar, signals, chart, Wi-Fi, bell (notifications), help.  


### **Key Features**  
- **Replay Mode**: Enabled (black `Replay` button) to simulate historical price action.  
- **Dual Timeframes**: Compare daily (long-term) and 5-minute (short-term) trends.  
- **Trading Integration**: Buy/sell buttons and volume metrics for real-time execution.  
- **Customization**: Indicators, alerts, and chart styles via top/right icons.  


This layout is designed for **technical analysis** and **trading**, combining long-term trend analysis (1D) with short-term intraday action (5m) to inform decisions.


**Описание:** This TradingView interface displays two **Apple Inc. (NASDAQ)** charts with a focus on real-time trading and analysis:  


### **Top Navigation Bar**  
- **Left**: `Apple Inc · 1D · NASDAQ` (daily chart) and `Apple Inc · 5 · NASDAQ` (5-minute chart) tabs.  
- **Timeframes**: `5m` (5-minute), `Indicators` (dropdown for technical indicators), `Alert` (notifications), `Replay` (backtesting), and playback controls (`<`, `>`, `Replay`/`Save`).  
- **Right**: `Replay` (save), `Publish` (share chart), and icons for settings, full-screen, and more.  


### **Left Chart: Daily (1D) Chart**  
- **Title/Price**: `Apple Inc · 1D · NASDAQ` with open/high/low/close (O205.17 H207.04 L200.71 C202.09) and a **-2.31%** daily loss.  
- **Order Prices**: `201.04 SELL` (red) and `201.13 BUY` (blue) with a 0.09 spread.  
- **Volume**: `Vol 59.21M` (59.21 million shares) as a bar graph below the candlestick chart.  
- **Time Axis**: Months (Mar–Jun) for the daily timeframe.  
- **Bottom Controls**: Timeframe buttons (`1D`, `5D`, `1M`, etc.), `Select bar` (for analysis), playback speed (`0.5x`, `5m`), and `Sell`/`Buy`/`Flatten` buttons.  


### **Right Chart: 5-Minute (5) Chart**  
- **Title/Price**: `Apple Inc · 5 · NASDAQ` with O201.78 H202.50 L201.78 C202.05 and a **+0.13%** gain.  
- **Order Prices**: `201.04 SELL` (red) and `201.13 BUY` (blue) with a 0.09 spread.  
- **Volume**: `Vol 20` (20 bars) with `236.17K` (green) and `81.6K` (orange) volume markers.  
- **Time Axis**: Hours (21:00–22:00) for the 5-minute timeframe.  


### **Pop-Up: Update Interval**  
- Dropdown menu for chart refresh rate: `1 minute`, `5 minutes` (selected), and `Auto select interval` (toggle off).  


### **Left Sidebar (Icons)**  
Vertical icons for tools: drawing (pen), indicators, social, text, favorites, and more (e.g., chart types, alerts, chat).  


### **Bottom Bar**  
- Tabs: `Crypto Pairs Screener`, `Pine Editor` (scripting), `Strategy Tester`, `Replay Trading` (active), `Trading Panel`.  
- Time: `12:02:24 UTC`, `RTH` (regular trading hours), `ADJ` (adjusted data).  


### **Purpose**  
The interface enables **technical analysis** (candlestick charts, volume, indicators) and **trading** (order prices, buy/sell buttons) for Apple stock, with options to backtest (`Replay`), set alerts, and customize charts.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43559657638/original/6XuSK7k2Ggb9JJguf2Qe-mCzf87PMWKEcg.png?1748002046)

**Описание:** This TradingView interface displays a **dual-chart layout** for Apple Inc. (NASDAQ:AAPL) with a focus on real-time trading and replay functionality. Here’s a detailed breakdown:


### **Top Navigation Bar**  
- **Left**:  
  - \


**Описание:** This TradingView interface displays two side-by-side **Apple Inc. (NASDAQ)** candlestick charts in replay mode, showing different timeframes.  

### Top Bar & Navigation:  
- **Left**: “AAPL” (ticker), “2m” (timeframe), “Indicators” (dropdown), “Alert” (notifications), “Replay” (active mode).  
- **Right**: “Replay” (save), “Publish” (share), and standard UI icons (settings, fullscreen, etc.).  


### Chart 1 (Left, 2-Minute Timeframe):  
- **Header**: “Apple Inc · 2 · NASDAQ” with open (O202.39), high (H202.50), low (L202.02), close (C202.05), and change (-0.34, -0.17%).  
- **Price Boxes**: Red “201.04 SELL” (ask) and blue “201.18 BUY” (bid) with 0.14 spread.  
- **Volume**: “Vol 137.66K” (trading volume).  
- **Chart**: Candlesticks (red = down, green = up) with volume bars (teal = buying, pink = selling) below.  
- **Time Axis**: 17:30–22 (UTC).  


### Chart 2 (Right, 17-Minute Timeframe):  
- **Header**: “Apple Inc · 17 · NASDAQ” with O201.88, H202.50, L201.58, C202.05, +0.19 (+0.09%).  
- **Price Boxes**: Same “201.04 SELL” / “201.18 BUY” as left chart.  
- **Volume**: “Vol 20…56K 242.36K” (larger volume).  
- **Chart**: Candlesticks with volume bars; orange line (likely moving average) and “Pre 201.10” (pre-market price).  
- **Time Axis**: 19–22 (UTC).  


### Bottom Controls:  
- **Timeframe Tabs**: 1D, 5D, 1M, etc. (select chart period).  
- **Replay Tools**: “Select bar” (navigate bars), play/pause, speed (1x), “1m” (interval).  
- **Trading Panel**: “Sell,” “Buy,” “Flatten” buttons (for simulated trades).  
- **Status**: “12:03:36 UTC” (replay time), “RTH” (regular trading hours), “ADJ” (adjusted data).  


### Pop-Up: “UPDATE INTERVAL”  
- Dropdown: “1 minute” (replay speed).  
- Toggle: “Auto select interval” (on/off).  


### Side Icons (Left/Right):  
- **Left**: Drawing tools (trendlines, Fibonacci), indicators, and account settings.  
- **Right**: Chat, alerts, and publishing tools.  


### Purpose:  
The interface enables **replay trading** (simulated market activity) for Apple stock, comparing 2-minute and 17-minute timeframes. Users analyze price action, volume, and execute simulated trades while adjusting replay speed and intervals.


