# Volume profile indicators: basic concepts

**URL:** https://www.tradingview.com/support/solutions/43000502040-volume-profile-indicators-basic-concepts/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Volume Profiles ](/support/folders/43000587408-volume-profiles/) - / [ Volume profile indicators: basic concepts ](/support/solutions/43000502040-volume-profile-indicators-basic-concepts/) # Volume profile indicators: basic concepts Volume profile is an advanced charting indicator that displays trading activity over a specified time period at specified price levels. These indicators take into account user-defined parameters such as number of rows and time period and plots a histogram on the chart to reveal dominant and/or significant price levels based on volume. They take the total volume traded at a defined price during the given time period and divides the total volume into either up volume (trades that moved the price up) or down volume (trades that moved the price down) and then make that information easily visible. **CONTENTS:** - [Volume profile types](#Volume-profile-types) - [Volume profile basic concepts](#Volume-profile-basic-concepts) [Calculation methodology](#Calculation-methodology) - [Types of volume used in calculations](#Types-of-volume-used-in-calculations) - [Typical levels of significance](#Typical-levels-of-significance) - [Calculating value area](#Calculating-value-area) - [Calculation on non-standard chart types](#Calculation-on-non-standard-chart-types) - [Style](#Style) - [What to look for](#What-to-look-for) [Support and resistance levels](#Support-and-resistance-levels) - [Volume nodes](#Volume-nodes) - [Example strategy](#Example-strategy) Volume profile types This trading feature is available as a chart type, indicators, and drawing tools. You can choose any of them, that will help you reach your trading goals: - [Auto anchored volume profile](https://www.tradingview.com/support/solutions/43000703077-auto-anchored-volume-profile/) - [Fixed range volume profile](https://www.tradingview.com/support/solutions/43000480324-fixed-range-volume-profile-indicator/) - [Periodic volume profile](https://www.tradingview.com/support/solutions/43000703071-periodic-volume-profile/) - [Session volume profile charts](https://www.tradingview.com/support/solutions/43000745275-session-volume-profile-charts-explained/) - [Session volume profile HD](https://www.tradingview.com/support/solutions/43000557450-session-volume-profile-hd/) - [Visible range volume profile](https://www.tradingview.com/support/solutions/43000703076-visible-range-volume-profile/) Volume profile basic concepts Calculation methodology Volume profile indicators are calculated using data from lower timeframes for the same symbol. For example, to calculate the volume profile for one daily session, the system loads all 1-minute bars that were traded in that daily session, analyzes the price levels where they were traded and analyzes the price levels where they were traded and the direction of price movement. If the bar closes above or equal to its open, this counts as an up bar, otherwise it's a down bar. Once analyzed, this data is added to the volume profile histogram. The particular logic used to decide which lower timeframe should be used for the calculation varies depending on the specific indicator. Types of volume used in calculations Volume Profile uses the following types of volume: - Trade volume for stocks - Tick volume for indices, forex, and crypto CFDs. It indicates the number of price updates - Base or quote volume for crypto We use up/down volume instead of buy/sell volume and calculate VP based on a price direction inside bars: if close &gt;= open, we take it as an up volume, if close &lt; open, it's down volume. Typical levels of significance Point of control (POC): The price level for the time period with the highest traded volume. Profile high: The highest reached price level during the specified time period. Profile low: The lowest reached price level during the specified time period. Value area (VA): The range of price levels in which the specified percentage of all volume was traded during the time period. Typically, this percentage is set to 70%, however, it is up to the trader’s discretion. Value area high (VAH): The highest price level within the value area. Value area low (VAL): The lowest price level within the value area. Calculating value area - Determine the total volume traded in the profile (total buys and sells). - Multiply the total volume by the chosen percentage (default 70%) to determine the target volume for the value area. - Start at the Point of Control (POC) — the row with the highest total volume. Include the POC in the value area first and subtract its volume from the target volume. - Take the next row above the POC and the next row below the POC. - Compare their total volumes and choose the larger one. - Attempt to add the chosen row to the value area: If adding it does not exceed the remaining target volume, include it and update the corresponding boundary (VAH if added above, VAL if added below). - If it would exceed the target, stop — the value area is complete. - For the next step, take the next row on the side you just added (the side with the larger volume) and the current row on the opposite side. Repeat steps 5–7. - Tie-breaking rules: If the two candidate rows have equal volumes, choose the row closer to the POC. - If the distances are equal, choose the row above the POC. - When the target volume is reached , the highest included row becomes the Value Area High (VAH) , and the lowest included row becomes the Value Area Low (VAL) . Calculation on non-standard chart types This applies to the following chart types: - [Heikin Ashi](https://www.tradingview.com/support/solutions/43000619436-understanding-heikin-ashi-charts/) - [Renko](https://www.tradingview.com/support/solutions/43000502284-understanding-renko-charts/) - [Line break](https://www.tradingview.com/support/solutions/43000502273-introduction-to-line-break-charts/) - [Kagi](https://www.tradingview.com/support/solutions/43000502272-learn-to-use-kagi-charts/) - [Point and figure](https://www.tradingview.com/support/solutions/43000502276-what-are-point-and-figure-charts/) - [Range](https://www.tradingview.com/support/solutions/43000474007-understanding-range-charts/) If you're using the volume profile indicators on this kind of chart, the data on the chart will not represent actual prices, and the volume data will also be distorted. For example, a single daily candle that closes above its open can become N separate Renko bricks rising in a sequence, and the daily volume for that candle will be divided by N and the resulting value will be given to every brick in the sequence. Failing to account for this can result in inaccurate predictions and hinder the effectiveness of your trading strategy. Style Volume Profile: Toggles the visibility of the volume histogram. Values: Toggles whether the numerical values should be displayed on the volume histogram itself and adjusts the color of the text. The meaning of these values depends on the volume input in the indicator's "Inputs" tab: with "Total" selected, it shows the total volume for this row, "Up/Down" shows both up and down volume in a sequence, and "Delta" shows only the delta, i.e., the difference between the up and down volume for the level. Width (% of the box): Alters the width of the rows in the histogram. The longest row is scaled according to this setting, and all other rows are based on its scaling: e.g., if the indicator displays 3 rows with volumes of 20K, 40K and 100K and Width is set to 40, the 100K row will extend 40% of the width of the histogram, the 40K will extend 40% of 40% (16% of total), and 20K will extend 20% of the 40% (8% of total). Placement: Place rows either left or right. Up volume: Determines the color as well as opacity for the up volume (Buys). Down volume: Determines the color as well as opacity for the down volume (Sells). Value area up: Determines the color as well as opacity for the value area up. Value area down: Determines the color as well as opacity for the value area down. VAH: Toggles the visibility of the value area high. VAL: Toggles the visibility of the value area low. POC: Toggles the visibility of the point of control. Developing POC: Toggles the visibility of the developing point of control, showing you how POC was changing when the market was in session. Developing VA: Toggles the visibility of the developing value area, showing you how VA was changing when the market was in session. Histogram Box: Determines the background color as well as opacity for the volume profile area. This option is unavailable for visible range volume profile. What to look for Support and resistance levels You can use volume profiles to identify support and resistance levels. You can use volume profile to spot key support and resistance levels. This approach differs from others in that volume profile is a reactive tool, meaning it shows you what already happened rather than predicting what's coming next. Unlike proactive indicators like trend lines or moving averages that try to forecast future moves, volume profile reveals where significant trading activity took place in the past. This backward-looking approach is actually valuable because it helps you understand why certain price levels matter. When you see a price level where significant buying activity occurred previously, that spot often becomes a support zone — a place where price tends to bounce back up. The same logic works in reverse — if you notice heavy selling activity at a higher price level, that area typically acts as resistance, pushing price back down when it tries to break through. Volume nodes High volume nodes (HVN) are peaks in volume at specific price levels. You can think of these as consolidation zones where significant buying and selling activity occurred, keeping price stuck in one area for an extended time. This heavy activity suggests a fair value area — a price where the market found balance between buyers and sellers. When price returns to a previous HVN, expect it to slow down and move sideways. The market is less likely to break through these levels quickly because they represent areas where traders were comfortable doing business before. Low volume nodes (LVN) are the opposite — they are valleys where volume dropped significantly. These usually form during breakouts or breakdowns when price moved quickly through a level. You can see this as an "unfair value area" where the market didn't want to stick around. When price approaches a previous LVN, it's more likely to either shoot through or bounce off quickly. Since traders view these as unfair price levels, it won't spend much time there compared to the high volume zones. Example strategy Just like most other tools or studies, volume profile has a number of uses. There are many trading strategies that use volume profile as a key component. Below are the basics of one such strategy, which is based on comparing the current day’s opening price to the previous day’s volume profile. If the current day opens above the previous day’s value area (but still below the profile high) look for price to retrace back toward the point of control and then proceed to rise (the direction of the day’s open). Therefore during the retracement to the point of control, there is a buying opportunity. If the current day opens below the previous day’s value area (but still above the profile low) look for price to retrace back toward the point of control and then proceed to fall (the direction of the day’s open). Therefore during the retracement to the point of control, there is a selling opportunity. If the current day’s opening price is completely outside of the previous day’s profile (above the profile high or below the profile low) this can be seen as a possible runner in the direction of the opening price relative to the previous day’s profile range. Volume profile in a nutshell Volume profile is an extremely valuable technical analysis tool that is used by traders everywhere. The key to volume profile’s continued relevance is its versatility. It is a charting tool that truly does have a wide array of uses. Unlike many other studies, there is little to no debate about volume profile's usefulness. The data that is provided by volume profile is indisputable, leaving it to the trader to find new and creative ways to use it. Even though in its simplest form, it is a great reactive method for discovering traditional support and resistance areas, traders are still coming up with ways to chart the indicator in predicative or proactive ways. Consider the trading strategy example given earlier in the article. Being able to compare a real-time event (the current day’s open) with historical events (the previous day’s volume profile) and make a trading decision based on the relationship is a great example of this. Also read: - [TradingView social network](https://www.tradingview.com/support/solutions/43000761245-tradingview-social-network/) - [Introduction to TradingView alerts](https://www.tradingview.com/support/solutions/43000520149-introduction-to-tradingview-alerts/) - [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/) - [TradingView screeners walkthrough](https://www.tradingview.com/support/solutions/43000718885-tradingview-screeners-walkthrough/) - [Master the Options Strategy Builder](https://www.tradingview.com/support/solutions/43000707214-master-the-options-strategy-builder/) Previous Previous I cannot find the Volume Profile indicators Next Next Fixed Range Volume Profile indicator Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43585363955/original/WBFuttqSSiALFIoJAN4V4-JkBoRqAt8UIg.png?1760028590)

**Описание:** This TradingView screenshot displays a **4-hour (4h) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with a **VRVP (Volume-Range Volume Profile)** indicator settings panel open. Here’s a detailed breakdown:  


### **Top Navigation & Symbol Bar**  
- **Left**: “AAPL” (symbol), “4h” (timeframe, with dropdown for D/W/5m), and “Indicators” (current indicator: VRVP).  
- **Right**: “Alert,” “Donlay” (likely a saved chart), “TradingVi…” (account), “Publish” (share chart), and standard UI icons (refresh, settings, screenshot, etc.).  


### **Symbol & Price Info**  
- **Symbol**: “Apple Inc · 4h · NASDAQ” with real-time data: *O257.77 H258.00 L…* (open/high/low).  
- **Price Boxes**: Red (253.94, +0.01, 132 volume) and blue (253.95, 132 volume) for bid/ask or trade prices.  
- **Indicator Bar**: “VRVP” (selected indicator) with eye (visibility), gear (settings), trash (delete), and menu icons.  


### **Chart Area**  
- **Main Chart**: 4-hour candlesticks (green = up, red = down) showing price action over ~2 weeks (x-axis: 10–24, likely Oct 2023).  
- **Volume Profile (Right)**: Horizontal volume bars (teal = up volume, pink = down volume) overlaid on price levels (y-axis: 224.20–262.00). A vertical dashed line marks the current price (253.95, 40:29 timestamp).  


### **VRVP Settings Panel (Center)**  
A modal for customizing the Volume-Range Volume Profile:  
- **Tabs**: *Inputs* (active), *Style*, *Visibility*.  
- **Options**:  
  - *Volume profile* (checked, enabled).  
  - *Values* (unchecked, hides volume numbers).  
  - *Width (% of the box)*: 30 (bar width).  
  - *Placement*: “Right” (dropdown, positions profile on the right).  
  - Color pickers: *Up Volume* (teal), *Down Volume* (pink), *Value Area Up/Down* (teal/pink).  
  - *VAH/VAL/POC*: Checkboxes for “Point of Control” (POC, checked, black line) and others (unchecked).  
  - *Developing POC* (unchecked).  
- **Buttons**: “Defaults” (reset), “Cancel,” “Ok” (apply changes).  


### **Bottom Bar**  
- **Timeframe Tabs**: 1D/5D/1M/3M/6M/YTD/1Y/5Y/All (select chart period).  
- **Status**: “22 Oct ’23 17:30” (timestamp), “16:49:31 UTC,” “RTH” (regular trading hours), “ADJ” (adjusted data).  
- **Tools**: “Pine Editor” (script editor), “Paper Trading” (simulated trading), “Trade” (live trading).  


### **Left Sidebar**  
Icons for drawing tools (trendlines, Fibonacci), chart types (candlestick, line), and account/settings (lock, globe, trash).  


### **Right Sidebar**  
Icons for notes, alerts, patterns, chat, and additional tools (calendar, screener, etc.).  


This layout is typical of TradingView, combining real-time price data, customizable technical indicators, and trading tools for analysis.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43587061986/original/pdOzexicLtvrX4ESFytfVFsyYkiQmQCHnA.png?1760960956)

**Описание:** This TradingView chart displays **Apple Inc. (NASDAQ: AAPL)** on a **1-day (1D)** timeframe, showing price action from July to February 2022. Here’s a detailed breakdown:  


### **Top Bar (Navigation & Tools)**  
- **Left Icons**: Zoom (magnifying glass), timeframe selector (\


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43587062050/original/LKG4G0T6HPF0l1nLP--TFY0Fj7F5FkaIrg.png?1760960976)

**Описание:** This TradingView chart displays **Apple Inc. (NASDAQ)** on a **1-day (1D)** timeframe. Here’s a detailed breakdown:  


### **Top Bar (Navigation & Tools)**  
- **Left**: Zoom controls (+/-), timeframes (D = Day), and chart type toggles (bars, lines, etc.).  
- **Middle**: *Indicators* (dropdown for technical indicators), *Alert* (price/volume alerts), *Replay* (backtest market movements), and navigation arrows (previous/next chart).  
- **Right**: *TradingView* (account menu), *M/M/S* (market/margin/stop-loss toggles), *Publish* (share chart), and icons for settings, full-screen, screenshot, and notifications.  


### **Symbol & Market Data Bar**  
- **Symbol**: “Apple Inc · 1D · NASDAQ” (stock, timeframe, exchange).  
- **OHLCV Data**: Open (O248.02), High (H253.38), Low (L247.27), Close (C252.29), +4.84 (+1.96%) (daily price change).  
- **Volume Metrics**: “VRVP Number Of Rows 24 Up/Down” with volume values (224.3M, 221.85M, 446.14M) — likely volume-related data.  
- **Currency**: “USD” (dropdown for currency selection).  


### **Chart Area**  
- **Candlestick Chart**: Green/red candles show price action (green = close > open; red = close < open).  
- **Volume Profile (VRVP)**: Colored bars (pink = selling, blue = buying) on the right, representing volume at price levels. A tooltip labels “High Volume Nodes corresponding with a period of stability” — highlighting a price zone with significant volume and low volatility.  
- **Horizontal Line**: Marks a key price level (79.61, likely support/resistance).  


### **Left Sidebar (Drawing/Tools)**  
Icons for:  
- Trend lines, Fibonacci tools, text, shapes, and other annotations.  
- Zoom, lock, and view mode toggles.  


### **Bottom Bar (Timeframe & Time)**  
- **Timeframe Tabs**: 1D (active), 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All (switch chart duration).  
- **Time**: “2020” (year) with monthly labels (Feb–Jul).  
- **Timestamp**: “07:44:55 UTC-4” (current time).  
- **“ADJ”**: Adjusted price toggle (accounts for splits/dividends).  


### **Bottom Panels**  
- *Pine Editor*: For coding custom indicators (TradingView’s Pine Script).  
- *Trading Panel*: For order placement (buy/sell).  


### **Right Sidebar (Additional Tools)**  
Icons for:  
- Notes, alerts, market depth, chat, and other utilities (e.g., chart styles, calendar, grid).  


This layout is typical of TradingView, prioritizing price action, volume analysis, and tool accessibility for technical trading.


