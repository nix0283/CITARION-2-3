# I'd like to learn more about Pine logs

**URL:** https://www.tradingview.com/support/solutions/43000710876-i-d-like-to-learn-more-about-pine-logs/

---

- [ Help Center ](/)
- / 
- / Pine Script® 
- / [ Pine Editor essentials ](/support/folders/43000591616-pine-editor-essentials/)
- / [ I'd like to learn more about Pine logs ](/support/solutions/43000710876-i-d-like-to-learn-more-about-pine-logs/)

# I'd like to learn more about Pine logs 
 To enable logs you could use one of three new logging functions: 

- [log.error()](/pine-script-reference/v6/#fun_log.error) creates messages of type *Error* displayed in red.
- [log.info()](/pine-script-reference/v6/#fun_log.info) creates messages of type *Info* displayed in gray.
- [log.warning()](/pine-script-reference/v6/#fun_log.warning) creates messages of type *Warning* displayed in orange.

After adding script on the chart you can open Pine logs. Use one of the entry points:

- selecting *Pine logs…* from the Editor's *More* menu
- from the *More* menu of a script loaded on your chart if it uses *log.*()* function

 Pine logs work everywhere: on historical bars, in real-time, and in Replay mode. The logging functions can be called from any type of script (indicator, strategy, or library) and from anywhere in the script, including local blocks, loops, and from inside [request.security()](/pine-script-reference/v6/#fun_request.security) and similar functions. You can call logging functions in two ways: using only a string argument, or using a formatting string and a list of values in [str.format()](/pine-script-reference/v6/#fun_str.format) fashion.

Scripts using logs must be personal scripts; privately or publicly published scripts cannot generate logs, even if they contain calls to *log.*()* functions.

The following code example uses all three logging functions:

 Pine Script® // @version= 6 
 indicator ( "Pine logs" ) 
 if barstate.ishistory 
 if bar_index % 100 == 0 
 log.warning ( "\nBar index: {0,number,#}" , bar_index ) 
 else 
 // Realtime bar processing. 
 varip lastTime = timenow 
 varip updateNo = 0 
 if barstate.isnew 
 updateNo := 0 
 log.error ( "\nNew bar" ) 
 else 
 log.info ( "\nUpdate no: {0}\nclose: {1}\nSeconds elapsed: {2 }" , updateNo , close , ( timenow - lastTime ) / 1000 ) 
 updateNo += 1 
 lastTime := timenow 
 plot ( timenow ) 
 Expand 12 lines The example displays the bar index on every hundredth historical bar using an orange warning message. In real-time, it displays an error message in red for each new bar, and for each real-time update, it creates an information message in gray showing the update number, the close price, and the time elapsed since the last chart update.

To see Pine logs in action:

- Save the above code example to a personal script and add it to a chart with an active market.
- Open the *Pine logs* pane using the Editor's *More* menu or the indicator's *More* menu on the chart.

A timestamp prefixes each log entry. It is the bar's opening time for historical bars, and the current time for realtime messages. Newer messages appear at the bottom of the pane. Only the last 10,000 messages will display for historical bars; realtime messages are appended to those.

The top of the pane contains icons allowing you to start/stop the logging, specify a starting date, filter the logs by message type, and search the logs. The search field contains a sub-menu allowing you to match case, whole words, and use regex.

When you hover over a log message, icons appear that allow you to view the source code that has generated the message, or jump to the corresponding chart bar:

When multiple scripts on your chart use logs, each one maintains its own set of messages. You can move between each script's logs by using the dropdown at the top of the Pine logs pane:
 Previous Previous How to use the command palette and keyboard shortcuts? Next Next How to create new script Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43589741202/original/50WZoDVoWpw-El7uIKuGXs-1QoyClTU1Hw.png?1762247104

**Описание:**

This image shows a **TradingView** interface with a **Pine Script editor** open, displaying a stock chart for **Tesla, Inc. (TSLA)** on NASDAQ. The interface is divided into several key sections:


### **1. Top Navigation Bar**
- **Timeframe Selector**: Buttons for timeframes (`1s`, `1m`, `2m`, `5m`, `30m`, `D`, `3h`, etc.) with `1m` (1-minute) selected.
- **Chart Type Icons**: Buttons for different chart types (e.g., candlestick, line, bar) and layout options (e.g., `V` for vertical, `B` for bar).
- **Layout & Tools**: 
  - `Layout A` dropdown (for saving/loading chart layouts).
  - Icons for settings, refresh, and publishing (`Publish` button, top-right).


### **2. Stock Chart Section (Top-Left)**
- **Ticker Info**: `Tesla, Inc. 1 · NASDAQ` with current price details:  
  - `O 266.46` (Open), `H 266.49` (High), `L 266.40` (Low), `C 266.49` (Close), `0.00 (0.00%)` (Change).  
- **Buy/Sell Prices**:  
  - Red box: `266.24 SELL` (sell price).  
  - Blue box: `266.70 BUY` (buy price).  
- **RSI Indicator**: `RSI Strategy 14 30 70` (Relative Strength Index with 14-period, overbought/oversold levels 30/70).  
- **Volume**: `Vol 544` (current volume).  
- **Chart Elements**:  
  - Candlestick chart with price action (green/red candles).  
  - Dotted horizontal lines (likely RSI levels or support/resistance).  
  - Blue arrow labeled `RsiLE +2` (RSI-based long entry signal).  
  - Volume bar at the bottom (blue, indicating 544 shares).  


### **3. Pine Script Editor (Bottom-Left)**
- **Tabs**: `Pine Editor`, `Strategy Tester`, `Trading Panel` (with `Pine Editor` active).  
- **Script Details**:  
  - `Untitled script` (dropdown to save/rename).  
  - `Update on chart` (button to apply changes to the chart).  
  - `Publish indicator` (button to share the script).  
- **Code**: A Pine Script (`v6`) with:  
  - Line 1: `//@version=6` (Pine Script version).  
  - Line 2: `indicator(\

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43432607208/original/wHRqUk9AVwcKDsOYCkuOSGZh0aAO-Z8QrQ.png?1693306159

**Описание:**

This image displays a **\

---

### Изображение 3

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43432607207/original/srvF2pC0DxFurWL78NwoacgVVv0yoWrKqw.png?1693306158

**Описание:**

This image shows a **TradingView interface** displaying **real-time trading data** (likely from a backtesting or live trading script, such as Pine Script) with a focus on bar/candlestick updates. Here’s a detailed breakdown of the UI elements, text, and their purposes:


### 1. **Top Section (White Background)**
This area displays a **timestamped log entry** with trading metrics:  
- **Timestamp**: `[2023-08-28T08:54:31.633-04:00]`  
  - Format: ISO 8601 (date + time + timezone offset). Indicates when the data was recorded.  
- **Update no: 0**  
  - A counter for the number of updates (e.g., in a script, this tracks how many times data has been refreshed).  
- **close: 104.095**  
  - The **closing price** of the current trading bar (e.g., a candlestick or time-based interval).  
- **Seconds elapsed: 1.005**  
  - Time since the last update (e.g., for measuring script execution speed or bar duration).  


### 2. **Bottom Section (Light Blue Background)**
This area highlights a **new trading bar** with:  
- **Timestamp**: `[2023-08-28T08:54:31.633-04:0` (truncated, likely a formatting error or partial display).  
- **“New bar” (Red Text)**  
  - Indicates a new candlestick/bar has formed (e.g., a new time interval, like 1-minute, 5-minute, etc.).  
- **Icons (Right Side)**:  
  - `{}` (Curly Braces): Likely a **code editor** or **script editor** button (e.g., to view/edit the Pine Script or indicator code generating this data).  
  - **Target Icon (Crosshair/Scope)**: A **“Scroll to bar”** button (black tooltip confirms this).  
    - Purpose: Navigates the chart to the specific bar associated with this log entry (e.g., centers the chart on the new bar).  


### 3. **Tooltip**
- **“Scroll to bar”**: A black tooltip explaining the target icon’s function (navigates the chart to the bar).  


### Overall Context
This interface is part of TradingView’s **scripting environment** (e.g., Pine Script) or a **backtesting tool**, where users log real-time data (prices, bar updates, script metrics) to debug or analyze trading strategies. The “New bar” text and timestamp confirm a new candlestick has formed, while the “Scroll to bar” button helps users visualize the bar on the chart. The “close” price and “Seconds elapsed” provide granular data for performance analysis.

---

### Изображение 4

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43432607209/original/dIFbVEC8cqkSOqZQA9L1maCVn1i3cjMScw.png?1693306159

**Описание:**

This image shows a **TradingView \

---

