# Bar Replay: how and why to test a strategy in the past

**URL:** https://www.tradingview.com/support/solutions/43000712747-bar-replay-how-and-why-to-test-a-strategy-in-the-past/

---

- [ Help Center ](/) - / - / Chart - / [ Bar Replay ](/support/folders/43000547807-bar-replay/) - / [ Bar Replay: how and why to test a strategy in the past ](/support/solutions/43000712747-bar-replay-how-and-why-to-test-a-strategy-in-the-past/) # Bar Replay: how and why to test a strategy in the past Bar replay is a feature of [Supercharts](https://www.tradingview.com/chart/) that enables you to simulate past price movements for strategy testing. This tool assists traders in refining strategies by analyzing historical market behavior and practicing trading decisions without real financial exposure. It offers a risk-free, interactive, and dynamic way to enhance your trading skills, refine strategies, and gain valuable insights into historical market behavior. **CONTENTS:** - [Why you need Bar Replay](#Why-Bar-Replay) - [Using Bar Replay](#Using-Bar-Replay) - [Using drawings and indicators](#Drawings-and-indicators) - [Historical depth](#Historical-depth) - [Hotkeys](#Hotkeys) - [Extra tips](#Tips) Why you need Bar Replay Historical trading starts at a selected point with adjustable replay speed that enables you to observe strategy performance. But, Bar Replay isn't just about exploring the past, it can help you think ahead for the future. Here are some of the key benefits of Bar Replay. **Strategy refinement:** Use historical price analysis and simulated trading to test and refine trading strategies, identifying improvement opportunities. **Realistic learning:** Experience simulated real market conditions and gain practical insights into how strategies perform. **Historical insights:** Study past price movements to uncover patterns and trends that inform trading decisions. **Risk-free practice:** Develop trading confidence and experience through practice without real financial exposure. **Variable speed:** Control replay speed to effectively learn tools and strategies. **Continuity of analysis:** You can pause your replay session at any point and return later to continue from the exact same place, with your previous settings preserved. Using Bar Replay Mastering new features takes time. Here is a quick how-to guide to get you started. **Open Bar Replay:** First, find the "Bar Replay" button on your chart's top panel — it looks like a video rewind button. [](https://drive.google.com/file/d/1TS_USp7HkkYxgfPixlrP9AnY5xg0nuJq/view?usp=drive_link) **Select starting point:** You can now choose a starting point for your replay on the chart. When you hover your cursor over the chart screen, a blue vertical line with scissors appears. Click on your desired starting date and time. Here, you can select specific dates to make any bar in the chart's history your replay starting point. Alternatively, you can choose the "Select the first available day" button to start from the chart's earliest date. You can also choose the "Random bar" function, which will take you to a random bar within the chart. [](https://drive.google.com/file/d/1wdP9x1V86Vc3LD3aoLp5zkHP5rrZuSpW/view?usp=sharing) **Start the playback:** Click the "Play" button to begin the replay. You can adjust the replay speed before or during playback according to your preferences. [](https://drive.google.com/file/d/19QX2Ve5wgNlScfikUVAv7HQhy_mSOYpz/view?usp=sharing) **Manual advancement:** Slow down the replay to catch all the details. To move forward one step at a time, simply click the "Forward" button. [](https://drive.google.com/file/d/1JgUewM4rg1Jrn8iwMPTQFBT3yXTHgYIN/view?usp=sharing) **Monitor status:** You can check the chart's status display to see when Bar Replay is active. The replay symbol indicates the chart is in replay mode. Without replaying, this symbol won't be visible. [](https://drive.google.com/file/d/1rDIzfw0NBk_NwD0F5_CqIjsQQyJjKvzH/view?usp=sharing) **Change starting point:** You can switch to a different starting point even during replay. Choose from "Select bar," "Select data," or "Random bar" to establish a new starting point for your analysis. **Multiple charts:** You can simultaneously run Bar Replay on all charts in the layout and track dynamic changes in one or multiple different symbols across various timeframes at the same point in time. When accessing a workspace with several charts, you can choose a replay mode: either one current chart or all charts. In single chart mode, you can launch the replay on only one chart, and it will function the same as before. When you select the starting bar in "All charts" mode, the starting line will appear on all charts in the layout. While you choose the starting point on one chart, the charts are synchronized in time so that the replay starting point on each chart is visible. Replay synchronizes in time, so charts with different intervals work together — charts with larger intervals wait for data from charts with smaller intervals. For example, a weekly chart won't show a new bar until seven bars have loaded on a daily chart. **End the replay:** You can stop the replay and return to live data using the "Jump to real-time chart" button. This instantly brings you back to current market conditions. **Close the replay panel:** You can close the replay panel by clicking the "X" button or by clicking the "Bar Replay" button again. Bar Replay automatically saves your current session when you exit. The next time you open it, you can either continue from the same point with the same symbols and intervals, or start a new session from a different starting bar. A replay session automatically remembers: - The symbols and intervals on your charts - The time of the last viewed bar - The replay state Chart type and style settings are not saved. Replay session restore works only for chart types that support Bar Replay. In multi-chart layouts, only the corresponding charts will restore the previous session. If none of the charts in your layout support replay, the continue option will not appear. Using drawings and indicators Drawings and indicators function somewhat differently in Bar Replay compared to regular charts in terms of purpose and functionality. In Bar Replay, drawings serve as annotations for historical price data, helping with strategy testing. You can create drawings, and they will be saved after you close Bar Replay. Indicators offer insights into past price movements based on selected parameters, allowing you to evaluate indicator performance for strategy improvement. In Bar Replay, indicators can process replayed data for calculations. Historical depth The amount of historical data varies depending on the selected symbol and chart interval. Intraday intervals show a limited amount of data. As a result, intraday interval data may be shorter than daily data. For example, if you replay Apple stocks on a daily interval, the daily history starts from December 12, 1980, while 1-minute AAPL data starts from January 3, 2000, and the earliest 1-second bar in replay dates from August 17, 2022. For some symbols, we have 1-minute data dating back to 2011, for others back to 2009, while some extend even further to 2000. So, you can replay up to 20+ years of minute data in replay mode. At the same time, other symbols have shorter intraday history, therefore less data is available in replay. For all second-based timeframes, TradingView stores data starting from August 2022, and the earliest second-bar in Replay dates from August 17, 2022. **Symbol** **Initial 1-second bar** **Initial 1-minute bar** **Initial daily bar** NASDAQ:AAPL August 17, 2022 January 3, 2000 December 12, 1980 NASDAQ:MSFT August 17, 2022 January 3, 2000 March 13, 1986 SP:SPX August 17, 2022 January 3, 2000 January 1, 1871 TVC:VIX August 17, 2022 April 8, 1997 January 3, 1990 TVC:DXY August 17, 2022 March 13, 2007 January 31, 1967 FX:EURUSD FX:GBPUSD August 17, 2022 November 28, 2001 January 4, 1971 BITSTAMP:BTCUSD August 17, 2022 August 18, 2011 August 18, 2011 BITSTAMP:ETHUSD August 17, 2022 August 7, 2015 August 7, 2015 The above-mentioned replay limits do not apply to continuous futures charts — 1! and 2! symbols (for example, ES1!, BANKNIFTY1!), and to futures contracts with the enabled "[Use settlement as close on daily interval](https://www.tradingview.com/support/solutions/43000685268-can-i-switch-settlement-and-last-prices-as-close-for-futures/)" setting, as they have their own special intraday limitations due to their synthetic nature To find out where the initial replayable bar for a certain symbol is, simply turn on Replay mode, choose "Select date…" in the dropdown at the replay panel, and then press "Select the first available day." Therefore, you can initiate the replay from the very first bar or any other bar within the available history from the "Select date" menu. To access more detailed intraday data, you can select the starting point for Bar Replay on a higher interval and then switch to a lower interval. For example, to replay older 1-minute bars, you can go to the daily interval, enable Replay mode, choose the "Select bar" option, and manually select the starting point on the chart. Then, switch to a 1-minute interval and press "Play." If the specified starting point for the replay is too distant and no data is available for the selected time period, Bar Replay will automatically jump to the first available bar. When you switch timeframes from higher to lower ones, it may happen that data is available on the higher timeframe (e.g., 1 day) but not on the lower timeframe chart (e.g., 1 min) because the intraday plan's limit has been reached or there is no intraday data in our data storage this far back in time. In this case, you will see the message "Data point unavailable" in the bottom left corner of the chart, and your timeframe remains unchanged. If you want to use a lower timeframe in Replay anyway, you need to choose a starting point where lower timeframe data is available by using the "Select date" option → "Select the first available day." Hotkeys Moving efficiently is important. Hotkeys can be used in Bar Replay to help you quickly and conveniently control playback from the keyboard, without using a mouse or trackpad. To begin or halt playback, simply press "Shift + ↓." To advance one step forward, just press "Shift + →." Extra tips As you're getting to know Bar Play better, you'll find out how it works in practice. Before you start practising, here are a few helpful hints: - Server-side [alerts](https://www.tradingview.com/support/solutions/43000520149/) persist based on real-time data - Generating new server-side alerts is not possible during replay - Trading orders are executed using real-time data, including those in [Paper Trading](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/) and with other brokers - Quotes visible on the trading panel and in the quotes list align with real-time data while in replay mode - [Regression trend](https://www.tradingview.com/support/solutions/43000518108-regression-trend/) and [fixed range volume profile](https://www.tradingview.com/support/solutions/43000707985-fixed-range-volume-profile-drawing-tool/) are inactive during replay - It's not possible to replay bars in smaller segments - The following chart types don't work with Bar Replay — [Renko](https://www.tradingview.com/?solution=43000502284), [Kagi](https://www.tradingview.com/?solution=43000502272), [PnF](https://www.tradingview.com/?solution=43000502276), [Range](https://www.tradingview.com/?solution=43000474007), [Line Break](https://www.tradingview.com/?solution=43000502273), [Volume footprint](https://www.tradingview.com/support/solutions/43000726164-volume-footprint-chart/), [Time Price Opportunity](https://www.tradingview.com/?solution=43000725590). - Bar Replay does not work with [spread charts](https://www.tradingview.com/support/solutions/43000502298-spread-charts-explained/) and [tick-based charts](https://www.tradingview.com/support/solutions/43000709225-what-are-tick-based-intervals-for/) Bar Replay in a nutshell Bar Replay is a powerful TradingView feature that allows you to simulate historical market conditions for strategy testing and skill development. You can select any starting point from available historical data (ranging from decades of daily data to recent second-by-second data) and replay market movements at customizable speeds. The tool supports multiple chart synchronization, works with drawings and indicators, and provides risk-free practice opportunities. Also read: - [Introduction to TradingView alerts](https://www.tradingview.com/support/solutions/43000520149-introduction-to-tradingview-alerts/) - [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/) - [TradingView screeners walkthrough](https://www.tradingview.com/support/solutions/43000718885-tradingview-screeners-walkthrough/) - [Master the Options Strategy Builder](https://www.tradingview.com/support/solutions/43000707214-master-the-options-strategy-builder/) - [Heatmaps: from global trends to details](https://www.tradingview.com/support/solutions/43000766446-tradingview-heatmaps-from-global-trends-to-details/) Previous Previous Upside Tasuki Gap - Bullish Next Next How do I turn Bar Replay on? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43585334163/original/9EQX7Q3S68f_J7RN1X83jUAj3uN-p4kAEQ.png?1760021380)

**Описание:** This is a **TradingView chart interface** displaying a gold CFD (Contract for Difference) market. Here’s a detailed breakdown:  


### **Top Navigation Bar**  
- **TradingView Logo**: Black circular icon (leftmost) for platform branding.  
- **Search Bar**: Contains “GOLD” (searches for instruments).  
- **Add Symbol (+)**: Button to add new assets to the chart.  
- **Timeframe Selector**: “D” (Day) indicates the chart uses a **daily (1D)** timeframe.  
- **Chart Type Toggle**: Line chart icon (switches between chart types like line, candlestick, etc.).  
- **Indicators Dropdown**: “Indicators” with a downward arrow (adds/edits technical indicators).  
- **Layout Grid Icon**: Changes chart layout (e.g., split-screen, full-screen).  
- **Alert Button**: Bell icon + “Alert” (sets price/condition-based notifications).  
- **Replay Button**: “Replay” (replays historical price action for backtesting).  
- **Navigation Arrows**: Left/right arrows (navigates between chart periods).  


### **Chart Header & Symbol Info**  
- **Symbol Details**: “CFDs on Gold (US$ / OZ) · 1D · TVC” (specifies the instrument: Gold CFDs, priced in USD per ounce, 1-day timeframe, from TVC exchange).  
- **Price Display**: “161.11” (current price, in purple text).  
- **Bar Replay Tooltip**: “Bar Replay” (explains the Replay button’s function).  


### **Left Sidebar (Tools)**  
- **Zoom In/Out**: “+”/“-” icon (adjusts chart zoom).  
- **Trendline Tool**: Line with a dot (draws trendlines/lines on the chart).  
- **Horizontal Lines Tool**: Three horizontal lines (draws support/resistance levels).  


### **Chart Area**  
- Currently **empty** (no price data plotted yet, or the chart is in “Replay” mode, which may hide live data).  


### **Purpose**  
This interface is used for **technical analysis** of gold prices, allowing users to:  
- Track price movements (via charts, once data loads).  
- Add indicators (e.g., moving averages, RSI) for analysis.  
- Set alerts for price changes.  
- Replay historical data to test strategies.  
- Use drawing tools to annotate charts.  


The design prioritizes quick access to core trading functions (search, timeframe, indicators, alerts) for efficient market analysis.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43495563216/original/m8yGiCcf3GnvQnCJ0y3aWLOvVU5tS-FCSQ.gif?1719926413)

![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43585334253/original/GHqDZ0-nO7HCA6XBJQA5XfYu0YUwv7CkxQ.png?1760021405)

**Описание:** This TradingView image displays a **Replay Speed dropdown menu** (for backtesting/chart replay functionality) overlaid on a chart interface. Here’s a detailed breakdown:  


### 1. **Replay Speed Dropdown Menu**  
A white, rectangular dropdown menu titled **“REPLAY SPEED”** (top of the menu) lists speed options (left column) with their update rates (right column):  
- **10x**: 10 updates per 1 second  
- **7x**: 7 updates per 1 second  
- **5x**: 5 updates per 1 second  
- **3x**: 3 updates per 1 second  
- **1x**: 1 update per 1 second  
- **0.5x** (selected, highlighted in dark gray): 1 update per 2 seconds  
- **0.3x**: 1 update per 3 seconds  
- **0.2x**: 1 update per 5 seconds  
- **0.1x**: 1 update per 10 seconds  


### 2. **Chart Background**  
The underlying chart has a **grid layout** (light gray lines) with time labels on the x-axis: *Jul, Aug, Sep, Nov* (indicating a time-based chart, e.g., daily/weekly).  


### 3. **Bottom Toolbar (UI Controls)**  
Below the chart, a toolbar contains interactive elements:  
- **“Select bar” dropdown**: A gray button with a left arrow icon (for selecting specific chart bars).  
- **Play/pause/step controls**: Icons for playback (▶️), step forward (▶|), and pause (⏸️).  
- **Speed indicator**: “0.5x” (matches the selected speed in the dropdown).  
- **Timeframe selector**: “D” (likely “Daily” timeframe).  


### Purpose of Elements  
- **Replay Speed Menu**: Adjusts how quickly historical data replays (faster speeds = more updates/second; slower speeds = fewer updates/second).  
- **Chart Grid/Time Labels**: Visualizes price action over time.  
- **Toolbar Controls**: Manage replay playback (play, pause, step) and select chart parameters (bar, speed, timeframe).  


This interface is used for **backtesting trading strategies** or analyzing historical price action at custom replay speeds.


