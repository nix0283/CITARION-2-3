# I'd like to learn more about Pine logs

**URL:** https://www.tradingview.com/support/solutions/43000710876-i-d-like-to-learn-more-about-pine-logs/

---

- [ Help Center ](/) - / - / Pine Script® - / [ Pine Editor essentials ](/support/folders/43000591616-pine-editor-essentials/) - / [ I'd like to learn more about Pine logs ](/support/solutions/43000710876-i-d-like-to-learn-more-about-pine-logs/) # I'd like to learn more about Pine logs To enable logs you could use one of three new logging functions: - [log.error()](/pine-script-reference/v6/#fun_log.error) creates messages of type Error displayed in red. - [log.info()](/pine-script-reference/v6/#fun_log.info) creates messages of type Info displayed in gray. - [log.warning()](/pine-script-reference/v6/#fun_log.warning) creates messages of type Warning displayed in orange. After adding script on the chart you can open Pine logs. Use one of the entry points: - selecting Pine logs… from the Editor's More menu - from the More menu of a script loaded on your chart if it uses log.*() function Pine logs work everywhere: on historical bars, in real-time, and in Replay mode. The logging functions can be called from any type of script (indicator, strategy, or library) and from anywhere in the script, including local blocks, loops, and from inside [request.security()](/pine-script-reference/v6/#fun_request.security) and similar functions. You can call logging functions in two ways: using only a string argument, or using a formatting string and a list of values in [str.format()](/pine-script-reference/v6/#fun_str.format) fashion. Scripts using logs must be personal scripts; privately or publicly published scripts cannot generate logs, even if they contain calls to log.*() functions. The following code example uses all three logging functions: Pine Script® // @version= 6 indicator ( "Pine logs" ) if barstate.ishistory if bar_index % 100 == 0 log.warning ( "\nBar index: {0,number,#}" , bar_index ) else // Realtime bar processing. varip lastTime = timenow varip updateNo = 0 if barstate.isnew updateNo := 0 log.error ( "\nNew bar" ) else log.info ( "\nUpdate no: {0}\nclose: {1}\nSeconds elapsed: {2 }" , updateNo , close , ( timenow - lastTime ) / 1000 ) updateNo += 1 lastTime := timenow plot ( timenow ) Expand 12 lines The example displays the bar index on every hundredth historical bar using an orange warning message. In real-time, it displays an error message in red for each new bar, and for each real-time update, it creates an information message in gray showing the update number, the close price, and the time elapsed since the last chart update. To see Pine logs in action: - Save the above code example to a personal script and add it to a chart with an active market. - Open the Pine logs pane using the Editor's More menu or the indicator's More menu on the chart. A timestamp prefixes each log entry. It is the bar's opening time for historical bars, and the current time for realtime messages. Newer messages appear at the bottom of the pane. Only the last 10,000 messages will display for historical bars; realtime messages are appended to those. The top of the pane contains icons allowing you to start/stop the logging, specify a starting date, filter the logs by message type, and search the logs. The search field contains a sub-menu allowing you to match case, whole words, and use regex. When you hover over a log message, icons appear that allow you to view the source code that has generated the message, or jump to the corresponding chart bar: When multiple scripts on your chart use logs, each one maintains its own set of messages. You can move between each script's logs by using the dropdown at the top of the Pine logs pane: Previous Previous How to use the command palette and keyboard shortcuts? Next Next How to create new script Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43589741202/original/50WZoDVoWpw-El7uIKuGXs-1QoyClTU1Hw.png?1762247104)

**Описание:** This TradingView interface displays a **NASDAQ stock chart (ASML Inc.)** with a **Pine Script editor** and **Pine logs** panel, used for algorithmic trading strategy development. Here’s a detailed breakdown:  


### 1. **Top Navigation Bar**  
- **Timeframes**: Buttons for time intervals (1s, 1m, 2m, 5m, 30m, D, 3h, etc.) to adjust chart resolution.  
- **Chart Tools**: Icons for drawing (pen), indicators (chart), layout (grid), and view options (V, B).  
- **Layout/Theme**: “Layout A” dropdown, light/dark mode toggle, and “Publish” button (to share charts).  


### 2. **Chart Section (Top-Left)**  
- **Ticker Info**: “ASML Inc. · 1 · NASDAQ” with real-time data: *O266.46 H266.49 L266.40 C266.49 (0.00%)* (open, high, low, close, % change).  
- **Order Panel**: Red “266.24 SELL” (sell price) and blue “266.70 BUY” (buy price) buttons.  
- **Indicator**: “RSI Strategy 14 30 70” (Relative Strength Index with default overbought/oversold levels).  
- **Volume**: “Vol 544” (current volume) with a volume histogram below the price chart.  
- **Price Scale**: Y-axis (266.00–268.00) and a blue horizontal line (likely a custom indicator or support/resistance).  


### 3. **Pine Logs Panel (Top-Right)**  
- **Header**: “Pine logs” with a close (×) button.  
- **Controls**: Pause (||), search (🔍), timestamp (⏱️), and menu (⋯) icons.  
- **Log Entries**: Timestamped messages (e.g., `[2025-11-03T13:50:00] Bar index: 21700`) showing script execution details (bar indices, update counts, close prices, elapsed seconds).  


### 4. **Pine Editor (Bottom-Left)**  
- **Tabs**: “Pine Editor” (active), “Strategy Tester”, “Trading Panel”.  
- **Script Info**: “Untitled script” (dropdown), “Save” button, “Update on chart” (refresh), and “Publish indicator” (share script).  
- **Code**: Pine Script v6 code (lines 1–18) with syntax highlighting:  
  - Defines an indicator (“Pine logs”).  
  - Logs bar indices, update counts, and elapsed time (e.g., `log.warning`, `log.error`, `log.info`).  
  - Plots `timenow` (line 17) to visualize time-based data.  


### 5. **Right-Side Toolbar**  
Icons for chart elements (e.g., trendlines, Fibonacci), chat, alerts, and help—standard TradingView tools for customization.  


### Purpose  
This setup is for **developing, testing, and debugging a Pine Script trading strategy** (e.g., RSI-based) on ASML’s stock. The editor writes the script, the chart visualizes price action, and the logs panel tracks real-time execution (bar indices, update timing, price changes) to validate logic.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43432607208/original/wHRqUk9AVwcKDsOYCkuOSGZh0aAO-Z8QrQ.png?1693306159)

**Описание:** This is a **\


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43432607207/original/srvF2pC0DxFurWL78NwoacgVVv0yoWrKqw.png?1693306158)

**Описание:** The image shows a **TradingView interface** (likely a Pine Script debugging or data output panel) with two main sections:  

### 1. Top Section (Log Output)  
- **Timestamp**: `[2023-08-28T08:54:31.633-04:00]` (ISO 8601 format, showing date/time with timezone offset).  
- **Update no**: `0` (likely a sequence number for the data update).  
- **close**: `104.095` (a price value, e.g., closing price of a financial instrument).  
- **Seconds elapsed**: `1.005` (time since the last update).  


### 2. Bottom Section (New Bar Notification)  
- **Timestamp**: `[2023-08-28T08:54:31.633-04:0` (truncated, matching the top timestamp).  
- **Text**: `New bar` (in red, indicating a new candlestick/bar has formed on the chart).  
- **Icons**:  
  - `{}` (code brackets, possibly for editing or viewing script code).  
  - `⌖` (target/crosshair icon, likely for focusing on the bar).  


### 3. UI Element: “Scroll to bar” Tooltip  
- A dark gray tooltip with white text, positioned over the bottom section. It suggests an action to navigate to the newly formed bar on the chart.  


### Purpose  
This panel displays real-time data (e.g., from a Pine Script indicator) to track price updates, bar formation, and timing—critical for debugging or monitoring trading logic. The “Scroll to bar” tooltip helps users quickly locate the new bar on the chart.


