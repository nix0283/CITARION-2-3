# Issue with alerts on indicators that use offsets

**URL:** https://www.tradingview.com/support/solutions/43000744279-issue-with-alerts-on-indicators-that-use-offsets/

---

- [ Help Center ](/) - / - / [ Issue with alerts on indicators that use offsets ](/support/solutions/43000744279-issue-with-alerts-on-indicators-that-use-offsets/) # Issue with alerts on indicators that use offsets If an alert is created on an indicator that uses plots with offsets, then when comparing the alert signal with the signal on the chart, it may seem that the alert is triggered with a delay. Let's look at an example: an alert triggered when pivotHigh is detected. pivotHigh is a high whose value is greater than a certain number of previous and subsequent high values. (There are more than two previous and subsequent high values in this example.) You can find a bar where the above condition is met using this Pine script: //@version=6 indicator("PivotHigh", overlay=false) plot(high) plot(high, linewidth=2, style = plot.style_circles) phDetected = high[2] &gt; high[0] and high[2] &gt; high[1] and high[2] &gt; high[3] and high[2] &gt; high[4] plotshape(phDetected?high[2]:na, style=shape.labeldown, location=location.absolute, text="pivotHigh", textcolor=color.white, color=color.green, offset=0) alertcondition(phDetected) When adding the script to the chart, we see the label displayed on the bar from 16:30, although pivotHigh is located 2 bars to the left. If you create an alert on alertcondition from a script, it will also trigger on the bar from 16:30 since the pivotHigh detection condition is met on it. We can add an offset to the plotshape function to display the label on the pivotHigh bar. plotshape(phDetected?high[2]:na, style=shape.labeldown, location=location.absolute, text="pivotHigh", textcolor=color.white, color=color.green, offset=-2) Such an offset is needed only for convenience (it is often used in divergence indicators) and does not affect the alert triggering, i.e., the alert will still trigger correctly on the bar from 16:30. However, it may seem that it should trigger earlier (namely, on the bar from 14:30). Previous Previous The issue with crossing alerts on the Volume indicator Next Next The trigger time of a strategy alert differs from the order execution time in the strategy tester Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43536464116/original/p3yLVEZ7JjfLEt_Y6rnKMJZ-YCHRauRVsQ.png?1737628860)

**Описание:** This TradingView chart displays **Apple Inc. (NASDAQ)** on a **1-hour (1h)** timeframe. Here’s a detailed breakdown of the UI elements:  


### **Top Toolbar**  
- **Left**:  
  - *Chart type selector* (candlestick icon, current view).  
  - *Zoom in/out* (+/- buttons).  
  - *Timeframe selector* (1h, with dropdown for other intervals like 1D, 5m, etc.).  
  - *Indicators* (dropdown to add technical indicators).  
  - *Chart style* (grid icon, for layout options).  
  - *Alert* (bell icon, set price alerts).  
  - *Replay* (rewind icon, simulate past price action).  
  - *Undo/redo* arrows.  
- **Right**:  
  - *TradingView logo* (with dropdown menu).  
  - *Refresh* (sync icon), *Settings* (gear), *Fullscreen* (square), *Screenshot* (camera), *Publish* (share chart).  


### **Chart Header**  
- **Symbol/Timeframe**: *Apple Inc · 1h · NASDAQ* (with a sun icon, indicating market session).  
- **Price Data**: *O229.44 H230.07 L229.23 C229.96 +0.52 (+0.23%)* (Open, High, Low, Close, and daily change).  
- **Currency**: *USD* (dropdown to switch currencies).  


### **Main Chart Area**  
- **Candlestick Chart**: Red/green candles show price action (red = close < open; green = close > open).  
- **PivotHigh Indicator**: A blue line with a green label (“pivotHigh”) marks a key high (230.07). The indicator’s label in the left panel confirms this value.  
- **Price Scale (Right)**: Y-axis with values (228.00–233.00) for price reference.  


### **Left Sidebar (Drawing/Tools)**  
Icons for:  
- Trend lines, Fibonacci tools, text, zoom, magnet (snap to price), lock, visibility, link, and delete.  


### **Bottom Toolbar**  
- **Timeframe Buttons**: *1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All* (switch chart duration).  
- **Timestamp**: *Fri 17 Jan ’25 16:30* (current time on the chart).  
- **Server Time**: *12:50:34 (UTC)* (real-time clock).  
- **Labels**: *RTH* (Regular Trading Hours), *ADJ* (Adjusted data).  


### **Bottom Panel**  
Tabs for: *Stock Screener, Pine Editor (code indicators), Strategy Tester, Replay Trading, Trading Panel* (expandable/collapsible).  


### **Purpose**  
This interface is used for **technical analysis** of Apple’s stock, enabling traders to:  
- View price action (candles) and trends (PivotHigh indicator).  
- Customize charts (indicators, timeframes, drawing tools).  
- Set alerts, replay market history, or publish analyses.  
- Access advanced tools (strategy testing, Pine Script editing) for trading strategies.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43536464609/original/H_Tb_GITKNcruHCzkS1icTK3a8DYLYLkMw.png?1737628981)

**Описание:** This TradingView chart displays **Apple Inc. (NASDAQ)** on a **1-hour (1h)** timeframe. Here’s a detailed breakdown:  


### **Top Bar (UI Elements)**  
- **Left**: Zoom controls (magnifying glass +/−), timeframe selector (\


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

