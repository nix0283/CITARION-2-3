# Getting started with technical alerts

**URL:** https://www.tradingview.com/support/solutions/43000763315-getting-started-with-technical-alerts/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Alerts - / [ Alerts settings ](/support/folders/43000547663-alerts-settings/) - / [ Getting started with technical alerts ](/support/solutions/43000763315-getting-started-with-technical-alerts/) # Getting started with technical alerts On TradingView, you can set alerts for drawing tools, indicators, strategies, and chart patterns. These notify you about changes in an indicator's readings, when the price breaks a chart pattern, and many other conditions that trigger a technical alert. **CONTENTS:** - [What are technical alerts](#Technical-alerts) - [Alerts on indicators](#Indicators) - [Alerts on custom Pine scripts](#Custom-scripts) - [Alerts for Pine strategies](#Strategies) - [Alerts on drawing tools](#Drawing-tools) - [Alerts on chart patterns](#Chart-patterns) What are technical alerts An alert is considered technical when it's set for an indicator, drawing, or strategy. When you configure alerts, you can select from many different operators that trigger them. Technical alerts use all the available operators: - **Crossing / Crossing up / Crossing down:** Trigger when the value reaches a certain level - **Greater than / Less than:** Trigger when the value surpasses a certain level - **Entering/Exiting channel:** Trigger when the value reaches a channel's boundaries from a certain direction - **Inside/Outside channel:** Trigger when the value moves into or out a channel's boundaries - **Moving up / down / up % / down %:** Trigger when the asset's price rises or falls by a certain amount within a specified number of bars **! Note:** Alerts using Channel and Moving operators are always technical. Other operators can work with price alerts unless they are used with indicators, drawing tools, or strategies. Alerts on indicators You can set alerts for over a thousand [TradingView indicators](https://www.tradingview.com/support/solutions/43000543626-tradingview-indicators-simple-steps-to-get-started/), including community-created ones. These alerts notify you about indicators reaching or surpassing the threshold you set for your trades. To get the most out of these alerts, we suggest you examine your [Supercharts](https://www.tradingview.com/chart/) thoroughly in the past and spot where the indicator has reached those levels you want to be notified about. Also, you can try backtesting to confirm the viability of your trading strategy. There’s a couple of ways to create an indicator alert, depending on what's comfortable for you: - Right-click on the indicator and click "Add alert…" - Open Alert manager, click on the "Create alert" button, select the desired indicator in the "Condition" dropdown Then you'll need to select a built-in preset or customize your own condition to set it up. **! Note:** If indicator parameters are changed after an alert is created, the alert will still trigger using the old settings. Alerts on custom Pine scripts For advanced customization, you can configure [script alerts](https://www.tradingview.com/support/solutions/43000597494-script-alerts/) using Pine Script® — TradingView’s programming language for traders. Or you can define your own trigger settings using [alertcondition](https://www.tradingview.com/pine-script-docs/concepts/alerts/#alertcondition-events) and [alert functions](https://www.tradingview.com/pine-script-docs/concepts/alerts/#script-alerts). For the alert() function, unlike other types of alerts, the triggering frequency and the message sent with script alerts are controlled by the "alert()" function calls in the script, not through the "Create Alert" dialog. If you want to dive deeper into using the "alert()" function in scripts, use the [Pine Reference Manual](https://www.tradingview.com/pine-script-reference/v4/#fun_alert) and the [Pine User Manual](https://www.tradingview.com/pine-script-docs/). Alerts for Pine strategies To create an alert for a strategy, you need to select one in the "Indicators, metrics, and strategies" window. There, open the "Technicals" tab, and select "Strategies." When a strategy is added to your chart, in the "Condition" field, select one of the options: - **Order fills and alert() function calls:** The created alerts will trigger on [order fills](https://www.tradingview.com/support/solutions/43000597494-script-alerts/) and "alert()" events - **Order fills only:** The alert only triggers on order fills, like an ordinary strategy alert - **alert() function calls only:** The alert only triggers on "alert()" events, like a script alert on an indicator Alerts on drawing tools Currently, we support alerts for lines, channels, rectangle and [Anchored VWAP](https://www.tradingview.com/support/solutions/43000669764-anchored-vwap/). The first three you can find in the trend line tools and geometric shapes on the left toolbar. **For lines:** - Crossing - Crossing up / Crossing down - Greater than / Less than **For channels:** - Entering channel / Exiting channel - Inside channel / Outside channel **For rectangle:** - Entering rectangle - Exiting rectangle - Inside rectangle - Outside rectangle You can find Anchored VWAP in the "Forecasting and measurement tools" on the left toolbar. Alerts on chart patterns You can set alerts for [automatically detected chart patterns](https://www.tradingview.com/support/solutions/43000690464-auto-chart-patterns-on-tradingview/). These alerts identify pattern breakouts, recognize new formations, and notify you about a pattern reaching its target. To set up a chart pattern alert, ensure that it's added to the chart: - Click on the "Indicators, metrics, and strategies" on the upper toolbar - Go to the "Technicals" tab - select "Patterns" **! Note:** You need to select a chart pattern manually to set an alert for it. Alerts don't work for "All chart patterns." The bottom line TradingView's technical alerts give you the power to monitor changes in indicators, Pine scripts and strategies, drawing tools, and chart patterns. You can set them to trigger based on specific conditions, such as crossing a threshold, entering or exiting a channel, or meeting indicator-based criteria. Also read: - [Introduction to TradingView alerts](https://www.tradingview.com/support/solutions/43000520149-introduction-to-tradingview-alerts/) - [Watchlist alerts: your trading edge](https://www.tradingview.com/support/solutions/43000739708-watchlist-alerts-your-trading-edge/) - [The technical analysis essentials](https://www.tradingview.com/support/solutions/43000759577-the-technical-analysis-essentials-with-tradingview/) - [Introduction to fundamental analysis](https://www.tradingview.com/support/solutions/43000759574-introduction-to-fundamental-analysis-on-tradingview/) - [How to trade on TradingView](https://www.tradingview.com/support/solutions/43000756695-how-to-trade-on-tradingview/) Previous Previous How to use price alerts Next Next Watchlist alerts: your trading edge Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43589256412/original/C59M4w5R_RYBxIkGyyU_KHa5TV-x-xSHkw.png?1761918165)

**Описание:** This TradingView screenshot displays a **4-hour candlestick chart for META (Meta Platforms, Inc.) on NASDAQ**, with an active \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43589256501/original/MNn4mgDALgYTFUQDfowv8GE_ZewCJCpZ0g.png?1761918189)

**Описание:** This TradingView screenshot displays a **4-hour (4h) candlestick chart for Apple Inc. (AAPL)** with the \


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43589256688/original/RpAKKVZhpFzQy8UAajD2TIpyeW5-doEMlQ.png?1761918220)

**Описание:** This TradingView screenshot displays a **4-hour (4h) candlestick chart** for **Apple Inc. (AAPL)** on the NASDAQ exchange. Here’s a detailed breakdown of the UI elements:  


### **Top Toolbar**  
- **Left**:  
  - `AAPL` (ticker symbol) + `+` (add new symbol).  
  - `4h` (timeframe selector, currently 4-hour candles).  
  - `♦` (trading symbol toggle), `Indicators` (dropdown to add technical indicators), `w` (workspace settings), `Alert` (price alerts), `Replay` (backtest mode), and navigation arrows (previous/next chart).  
- **Right**:  
  - `TradingView` (account/settings dropdown), `M/M/S` (chart style: Mountain/Line/Candle), `⚡` (refresh), `⚙️` (settings), `{}` (source code), `📷` (screenshot), and `Publish` (share chart).  


### **Chart Header**  
- Ticker: `Apple Inc · 4h · NASDAQ`  
- Price data: `O276.99 H277.32 L269.26 C269.83` (Open, High, Low, Close).  
- Change: `-1.56 (-0.57%)` (daily change) and `-1.57 (-0.58%)` (extended hours).  
- Currency: `USD` (dropdown to switch currencies).  


### **Main Chart Area**  
- **Candlestick Chart**: Green candles = price increase; red = decrease. The chart shows price action over time (x-axis: dates, y-axis: price).  
- **Horizontal Lines**: Dashed lines (e.g., at ~257.50) likely mark support/resistance or indicator levels.  
- **Price Label**: `AAPL 269.83` (current price, top-right).  


### **Left Sidebar (Drawing/Tools Panel)**  
Icons for drawing (trendlines, Fibonacci), chart types, and tools. A dropdown menu is open, showing:  
- **Sections**: `PROJECTION`, `VOLUME-BASED`, `MEASURER`.  
- **Highlighted Option**: `Anchored VWAP` (Volume-Weighted Average Price, a volume-based indicator) with a star (favorites).  
- Other options: `Long/Short Position`, `Forecast`, `Bars Pattern`, `Ghost Feed`, `Projection`, `Fixed Range Volume Profile`, `Anchored Volume Profile`, `Price Range`, `Date Range`, `Date and Price Range`.  


### **Right Sidebar**  
Icons for:  
- Notes (`📝`), alerts (`⏰` with a “1” badge), patterns (`◇`), chat (`💬`), and other tools (e.g., chart styles, calendar, notifications).  


### **Bottom Toolbar**  
- Time/Date: X-axis labels (e.g., `3, 7, 9... Nov, 5, 7...`).  
- `All` (data range), calendar icon (date selector), and timestamp: `09:38:50 UTC-4` (current time).  
- `RTH` (Regular Trading Hours) and `ADJ` (adjusted data) toggles.  


### **Purpose**  
This interface is used for **technical analysis** of AAPL’s price action, with tools to add indicators (like VWAP), draw on charts, set alerts, and analyze trends. The open menu suggests the user is selecting a volume-based indicator to overlay on the candlestick chart.


