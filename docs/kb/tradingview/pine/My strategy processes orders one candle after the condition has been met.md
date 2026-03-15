# My strategy processes orders one candle after the condition has been met

**URL:** https://www.tradingview.com/support/solutions/43000619439-my-strategy-processes-orders-one-candle-after-the-condition-has-been-met/

---

- [ Help Center ](/) - / - / [ My strategy processes orders one candle after the condition has b… ](/support/solutions/43000619439-my-strategy-processes-orders-one-candle-after-the-condition-has-been-met/) # My strategy processes orders one candle after the condition has been met By default, a strategy is calculated once per bar, on the bar close. During that calculation, the strategy is able to generate new orders or update existing ones. But when the bar has already closed, it cannot be traded anymore, so the earliest moment that a strategy order can be filled is at the open of the next bar. Because of this, by default, the strategy will open a position one bar after the entry condition has been met. That behavior can be changed with the process_orders_on_close argument. This allows the strategy to fill orders on the close of the bar. To do this, a process_orders_on_close argument should be added to the [ strategy() ](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy) function declaration and set to true, like this: Pine Script® // @version= 5 strategy ( ..., process_orders_on_close = true , ...) This is how strategy works without the process_orders_on_close argument: Pine Script® // @version= 5 strategy ( "process_orders_on_close example" ) strategy.entry ( "EN" , strategy.long , when = bar_index == 20650 ) strategy.close ( "EN" , when = bar_index == 20655 ) This is how strategy works with the process_orders_on_close argument: Pine Script® // @version= 4 strategy ( "process_orders_on_close example" , process_orders_on_close = true ) strategy.entry ( "EN" , strategy.long , when = bar_index == 20650 ) strategy.close ( "EN" , when = bar_index == 20655 ) The entry EN is tied to a condition that will be true at the bar 20650, but the actual entry occurs one bar after that, at bar 20651. The same happens with its close: the condition is true at bar 20655, but the entry is only closed on the next bar. By adding the process_orders_on_close argument and setting it to true, the strategy can now fill orders on the close of the bars, so the market order EN now fills one bar sooner. Previous Previous Strategy produces unrealistically good results by peeking into the future Next Next I see "Maximum number of orders (9000) was reached." error Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43207126155/original/bVdxomHDMqjXiohPxobWbJy-WIGbq1HHIw.png?1616507070)

**Описание:** This TradingView chart displays **Apple Inc. (NASDAQ)** on a **1-minute timeframe**, with a candlestick chart showing price action from ~15:25 to 22:00 (UTC-4). Here’s a detailed breakdown:  


### **Top Bar & Symbol Info**  
- **Left Icons**: Drawing tools (pen, trendline, Fibonacci, text, etc.) for chart annotation.  
- **Timeframe Selector**: “1m” (1-minute) is active; other options (e.g., 5m, 15m) are available.  
- **Symbol Data**:  
  - Ticker: *Apple Inc · 1 · NASDAQ*  
  - Price: *O 123.48 H 123.48 L 123.30 C 123.37* (open, high, low, close)  
  - Change: *-0.10 (-0.08%)* (red = slight decline).  
  - Bid/Ask: *123.26 (red, -0.02)* / *123.28 (blue, +0.02)*.  
- **Right Icons**: “Publish” (blue, to share chart), settings, zoom, screenshot, and layout tools.  


### **Chart Area**  
- **Candlestick Chart**: Green candles = price increase; red = decrease.  
- **Annotations**:  
  - Blue boxes: *20650* (entry) and *20655* (exit) mark trade signals.  
  - Text: *“Close entry(s) order EN”* (exit instruction) with a purple arrow.  
  - Labels: *“EN +1”* (entry) and *“-1”* (exit) indicate trade direction.  
- **Grid**: Light gray lines for price/time reference.  


### **Bottom Bar**  
- **Timeframe Tabs**: *1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All* (to switch chart duration).  
- **Timestamp**: *09:13:18 (UTC-4)* (current time).  
- **Price Scale**: *adj, ext, %, log, auto* (adjust price axis).  


### **Script Panel (Bottom Section)**  
- **Tabs**: *Stock Screener, Text Notes, Pine Editor, Strategy Tester, Trading Panel* (Pine Editor is active).  
- **Script Details**:  
  - Name: *process_orders_on_cl* (trading strategy).  
  - Actions: *Open, Save, Add to Chart, Publish Script*.  
- **Code**: Pine Script v4 code (e.g., `strategy(\


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43207126552/original/_LsgDBUSqZm-srBCZGdtBpqEVnORjZ99KA.png?1616507140)

**Описание:** This TradingView chart displays **Apple Inc. (NASDAQ: AAPL)** on a 1-minute timeframe, with a candlestick chart showing price action from ~15:25 to 22:00 (UTC-4). Here’s a detailed breakdown of UI elements:  


### **Top Bar (Toolbar & Header)**  
- **Left Toolbar**: Icons for drawing tools (line, trendline, Fibonacci, text, etc.), zoom, and other charting functions.  
- **Timeframe Selector**: “1m” (1-minute) is active; other options (e.g., 5m, 15m) are available.  
- **Chart Type Icons**: Candlestick (selected), line, bar, area, Heikin-Ashi, etc.  
- **Symbol Info**: “Apple Inc · 1 · NASDAQ” with real-time data: *O 123.48 H 123.48 L 123.30 C 123.37 -0.10 (-0.08%)* (open, high, low, close, change).  
- **Price Boxes**: Red (123.26, -0.03) and blue (123.29) boxes show bid/ask or trade prices.  
- **Script Label**: “process_orders_on_close example” (custom indicator).  
- **Right Toolbar**: “Publish” (blue, for sharing), “Unnamed” (chart name), settings, screenshot, and layout icons.  


### **Main Chart Area**  
- **Candlestick Chart**: Green candles = price increase; red = decrease. Y-axis (left) shows price (119.80–121.40+); X-axis (bottom) shows time (15:25–22:00).  
- **Annotations**:  
  - Blue boxes: “20650” (entry point, “EN +1”) and “20655” (exit point, “Close entry(s) order EN -1”) with arrows.  
  - Text: “Close entry(s) order EN” (exit instruction).  


### **Bottom Panels**  
- **Timeframe Tabs**: “1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All” (for switching chart periods).  
- **Status Bar**: “09:13:32 (UTC-4)” (current time), plus “adj, ext, %, log, auto” (adjustments, extensions, percentage/log scale, auto).  
- **Tab Bar**: “Stock Screener, Text Notes, Pine Editor, Strategy Tester, Trading Panel” (Pine Editor is active).  
- **Pine Editor**:  
  - Script name: “process_orders_on_cl” with “Open, Save, Add to Chart, Publish Script” buttons.  
  - Code: Shows a Pine Script strategy (“process_orders_on_close example”) with `strategy.entry` (long at bar 20650) and `strategy.close` (exit at bar 20655).  


### **Right Sidebar**  
Icons for alerts, news, calendar, community, chat, and notifications (standard TradingView sidebar).  


### **Purpose**  
This chart demonstrates a **Pine Script strategy** (`process_orders_on_close`) that enters a long position at bar 20650 and exits at bar 20655, with annotations marking entry/exit points. The UI supports real-time trading analysis, strategy backtesting, and customization via the Pine Editor.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

