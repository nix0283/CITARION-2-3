# Trading Sessions

**URL:** https://www.tradingview.com/support/solutions/43000729030-trading-sessions/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Trading Sessions ](/support/solutions/43000729030-trading-sessions/) # Trading Sessions The Trading Sessions indicator highlights custom trading sessions on the chart. For each trading session, the indicator draws a colored box containing all the bars that opened within the session in the specified time zone. Users can customize up to three trading sessions with unique start and end times and time zones. The default settings represent commonly used Asian, European, and North American sessions (Tokyo, London, and New York). Instruments that are traded in multiple markets in different time zones can experience periodic spikes in volume and volatility. Using the Trading Sessions indicator, users can visually track when different markets open and close. Note that the Trading Sessions indicator is available only on intraday timeframes. Inputs The indicator’s inputs define the trading session’s timings, and include options to display additional price information about each session. General settings There are four toggles at the top of the indicator’s Inputs tab, which provide general settings that apply to all three trading sessions. These settings determine the text information and additional visuals displayed for each session: - "Show session names": Labels each session box with the text from its "Displayed name" setting. - "Draw session open and close lines": Draws two additional dashed lines within each session box to mark the open and close prices of the session (i.e., the first bar’s open and the last bar’s close). - "Show tick range for each session": Calculates the number of ticks between the highest and lowest prices within the session and displays the range value in a label below the session box. - "Show average price per session": Calculates the average close price for all bars within the session and displays it in a label below the session box. It also draws a dotted line within the session box at the average price. Session settings The following inputs determine the settings for a specific trading session. The " First session" , " Second session" , and " Third session" input sections each have the same settings. Show session Specifies whether the indicator displays this trading session. If it is unchecked, the session is hidden from the chart. Displayed name Specifies the name of the session. The default value corresponds to the session’s default time zone, but users can enter any text of their choice to label the session. The session’s name appears on the chart below each session box only when the "Show session names" input is selected. Otherwise, the session’s name is hidden from the chart. Session time Specifies the start and end times of the session. The input’s dropdown list shows the time options in 15-minute intervals. To use a time that falls outside these intervals, select the minutes value in the input field and type the desired number. If the session’s end time is earlier than its start time, the indicator considers it an overnight session. For example, the session time "10:00–09:00" highlights bars from 10AM on the first day to 9AM on the second day. Session time zone Specifies the time zone for the session’s start and end times. There are two supported formats for a session's time zone: - GMT (or UTC) notation , which uses a numerical offset from the[ Greenwich Mean Time](https://en.wikipedia.org/wiki/Greenwich_Mean_Time) or[ Coordinated Universal Time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time), e.g., "GMT-5", "GMT+0630", "UTC+11". - IANA database notation , which uses a regional identifier, e.g., "America/New_York", "Asia/Tokyo", "Europe/Paris". See the[ IANA time zone database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) reference page for the list of possible time zone identifiers and their respective GMT offsets. If the time zone field is left empty, the indicator uses the IANA time zone from the exchange of the symbol that is currently open on the chart. Session color Sets the color and opacity of the session box and any related text or lines displayed for this session (e.g., session name, average price line, etc.). Considerations for time zone changes Using the IANA time zone notation is a more robust way to specify a session’s time zone than using a fixed GMT notation. We recommend using the IANA notation in most cases because it automatically adjusts for a region’s local time policies, such as annual switches to[ daylight saving time (DST)](https://en.wikipedia.org/wiki/Daylight_saving_time), and it also accounts for historic and future updates to time zone boundaries. To demonstrate, let's look at a "BINANCE:BTCUSD" chart; the symbol’s exchange uses a fixed GMT(0) time zone throughout the year. Using the Trading Sessions indicator, we can compare two different sessions that both represent the typical New York trading hours: "09:30–16:00". The first trading session uses "GMT-4" as its time zone, highlighting its session bars in a blue box. The second session uses the "America/New_York" time zone notation, highlighting its session bars in a yellow box. Since both sessions are meant to represent the same period in the same local time zone, the session boxes should always align perfectly. However, the session boxes do diverge periodically. During daylight saving time (DST), both the "GMT" and "IANA" trading sessions overlap exactly. During the rest of the year, however, the two sessions differ by one hour because New York’s local time switches from GMT-4 to GMT-5 outside of DST. The "America/New_York" notation automatically adjusts for this time zone change, but the "GMT-4" offset remains fixed. As a result, using the "America/New_York" notation always highlights the "09:30–16:00" sessions correctly in the region’s local time, while using the "GMT-4" notation highlights the sessions correctly only during DST. Likewise, using a "GMT-5" time zone instead highlights the sessions correctly only in the non-DST period, and deviates by one hour during DST. Therefore, to avoid needing to manually adjust GMT offsets for regions that experience time zone changes, use the IANA time zone notation to represent regional time zones accurately at any time of the year. Previous Previous Time Weighted Average Price Next Next Transaction fees in USD Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43556707726/original/zdh-Wd55MzLxGHvwYphOxUrrvccU_Jdg1Q.png?1746720113)

**Описание:** This TradingView chart displays the **U.S. Dollar/Canadian Dollar (USDCAD)** currency pair on a **1-hour (1h)** timeframe, provided by **FXCM**. Here’s a detailed breakdown:  


### **Top Bar (Header)**  
- **Symbol/Timeframe**: “U.S. Dollar / Canadian Dollar · 1h · FXCM” identifies the instrument, timeframe, and data provider.  
- **Price Data**: “O1.04192 H1.04201 L1.04118 C1.04125 -0.00067 (-0.06%)” shows:  
  - Open (O): 1.04192  
  - High (H): 1.04201  
  - Low (L): 1.04118  
  - Close (C): 1.04125  
  - Change: -0.00067 (-0.06%) (red = price decrease).  
- **Currency Selector**: “USD” dropdown (top-right) lets users switch the quote currency.  
- **Session Toggle**: “Trading Sessions” with a settings icon (gear) enables customization of session overlays.  


### **Chart Area**  
The chart uses **candlesticks** (green = bullish, red = bearish) to show price action. Colored shaded regions represent **trading sessions** (London, Tokyo, New York) with:  
- **London Session** (orange):  
  - Range: 1253 pips (1.03000–1.04253)  
  - Avg: 1.03595  
- **Tokyo Session** (blue):  
  - Range: 816 pips (1.03791–1.04607)  
  - Avg: 1.03791  
- **New York Session** (teal):  
  - Range: 812 pips (1.04026–1.04838)  
  - Avg: 1.04026  
- **Additional New York Session** (rightmost teal):  
  - Range: 568 pips (1.03800–1.04368)  
  - Avg: 1.04181  

Dashed lines mark session **support/resistance** levels.  


### **Right Sidebar (Price Panel)**  
- **Current Price**: “1.04242” (top) and “1.04200” (mid) show real-time price levels.  
- **Last Close**: “1.04125” (red box) with timestamp “33:29” (33 minutes, 29 seconds since last update).  
- **Price Scale**: Vertical axis (right) ranges from 1.02800 to 1.04400, labeled with price levels.  


### **Bottom Bar (Time Axis)**  
- **Time Labels**: Hours (e.g., 03:00, 06:00, 09:00) mark the 1-hour candlestick intervals.  
- **TradingView Logo**: Bottom-left identifies the platform.  
- **Settings Icon**: Bottom-right (gear) accesses chart settings.  


### **Key UI Elements**  
- **Candlesticks**: Visualize open, high, low, close (OHLC) for each hour.  
- **Session Overlays**: Color-coded regions (London/orange, Tokyo/blue, New York/teal) highlight volatility and average price per session.  
- **Range/Avg Text**: Below each session, “Range” (pip movement) and “Avg” (average price) provide statistical context.  


This chart is designed for **technical analysis**, helping traders identify session-based volatility, support/resistance, and price trends in the USDCAD pair.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43556708118/original/C6UKS0tTU8emaupNosJmLrAl-ZUR6O8Ufg.png?1746720204)

**Описание:** This is a **TradingView \


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43556708374/original/MElTLsEMQl_En4kDEtcz4jPbWsq06RKXKw.png?1746720281)

**Описание:** This TradingView chart displays the **Bitcoin / U.S. Dollar (BTCUSD)** pair on the **Binance** exchange, using a **1-hour (1h)** time frame. Here’s a detailed breakdown of all elements:  


### **1. Header & Symbol Information**  
- **Title**: `Bitcoin / U.S. Dollar · 1h · BINANCE` (specifies the trading pair, time frame, and exchange).  
- **Market Data**:  
  - `O 105,193.68` (Open price), `H 105,267.14` (High), `L 105,046.52` (Low), `C 105,083.55` (Close) for the current candle.  
  - `+109.01 (-0.10%)` (price change: +109.01 USD, -0.10% from the previous close).  
- **Currency Selector**: `USD` dropdown (top-right) to switch the quote currency.  


### **2. Chart Area**  
- **Candlestick Chart**: Displays price action via green (bullish) and red (bearish) candlesticks. Each candle represents 1 hour of trading.  
- **Price Scale (Y-Axis)**: Ranges from ~67,200 to 71,200 USD, showing Bitcoin’s price levels.  
- **Time Scale (X-Axis)**: Dates/times (e.g., `Nov`, `12:00`, `2`, `3`, `Sun 03 Nov '24 07:00`) mark the timeline.  
- **Annotations**:  
  - `US daylight saving time` (red text + vertical line): Highlights a time zone transition.  
  - Colored boxes (brown, blue, yellow) with `GMT`/`IANA` labels: Likely mark trading sessions or time zone boundaries.  


### **3. UI Controls**  
- **Time Frame Selector** (bottom-left): Buttons for `1D` (1 day), `5D` (5 days), `1M` (1 month), `3M`, `6M`, `YTD` (year-to-date), `1Y`, `5Y`, `All` (all available data).  
- **Expand/Collapse Button** (left of time frames): Toggles additional chart options.  
- **Full-Screen Toggle** (bottom-right): Enters/exits full-screen mode.  
- **Timestamp**: `19:34:35 (UTC)` (bottom-right) shows the current UTC time.  


### **4. Additional Elements**  
- **TradingView Logo**: Bottom-left, identifies the platform.  
- **Session Labels**: `GMT`/`IANA` (inside colored boxes) reference time zones (GMT = Greenwich Mean Time, IANA = International Atomic Time).  


### **Purpose**  
This chart is used for **technical analysis** of Bitcoin’s price movements, helping traders identify trends, support/resistance levels, and time-based patterns (e.g., session overlaps). The 1-hour time frame is ideal for short-to-medium-term trading strategies.


