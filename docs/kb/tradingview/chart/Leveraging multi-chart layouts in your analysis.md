# Leveraging multi-chart layouts in your analysis

**URL:** https://www.tradingview.com/support/solutions/43000629990-leveraging-multi-chart-layouts-in-your-analysis/

---

- [ Help Center ](/) - / - / [ How to work in the multi-chart mode ](/support/folders/43000578567-how-to-work-in-the-multi-chart-mode/) - / [ Leveraging multi-chart layouts in your analysis ](/support/solutions/43000629990-leveraging-multi-chart-layouts-in-your-analysis/) # Leveraging multi-chart layouts in your analysis The multi-chart mode is a powerful feature of [Supercharts](https://www.tradingview.com/chart/) allowing you to maximize your analysis by watching several charts in one workspace at once. In this article, we will learn to enable and manage multi-chart layouts. Enabling and managing multiple charts You can enable this feature in the "Layout setup" menu. The beautiful thing is that no matter how many charts you want to watch, you can easily manage each one so as not to miss any movement. Every chart in your layout has buttons allowing you to scroll and zoom. To maximize one of the charts, you need to click the 'Maximize chart' button or press Alt+Enter or Alt+Click on the chart. To switch between charts in multi-chart layout, just press Tab. Charts synchronization When you choose multiple charts, all the indicators and strategies from the initial chart will apply to the additional charts. Keep in mind that chart settings from the initial chart will not be transferred to the additional charts, as they are tied to the specific chart. But you can choose to synchronize some basic settings like interval, symbol, and more in the Layout setup menu. There's a separate workflow when it comes to drawings: they are applied only for the particular symbol. If you change symbols within the same layout, drawings will disappear. However, you can choose to synchronize them between multiple layouts or within one layout. For that, in the drawings panel on the left toolbar, find the button with either of these two icons. If this feature is off, drawings are local, meaning that they will be applied only for the particular symbol on the particular chart within the particular layout. - **Sync drawings in layout** will make drawings appear on every new chart for the same symbol within that layout - **Sync drawings globally** will save your drawings on every new chart for the same symbol, even if you create a new layout If you turn off the global synchronization, all the drawings for that symbol from all the other layouts will be deleted. Let's say you applied drawings to the chart with the AAPL symbol. If you change the symbol to, say, NVDA, the drawings will disappear. If you go back to the AAPL, the drawings will reemerge. If the global sync is on, after you create a new layout and choose the TSLA symbol there, that layout will keep the previous drawings made for the TSLA on the previous chart in another layout. Now turn on the synchronization of drawing objects using the button on the left panel. **! Note:** Drawings can only be synchronized on charts with the same symbol. Also, you can synchronize intervals between charts by adding them to different groups. To do this, click on the symbol/interval chart syncing icon in the status line or series context menu of the chart you want to be added to the group. Chart synchronization is only one feature that helps you with your analysis. For more tips and ideas, explore other articles and learn the capabilities of Supercharts. Also, read our post: [Watch multiple charts at once and build the perfect workspace](https://www.tradingview.com/chart/EURUSD/GruVJYB1-Watch-multiple-charts-at-once-and-build-the-perfect-workspace/). Also read: - [How to trade on TradingView](https://www.tradingview.com/support/solutions/43000756695-how-to-trade-on-tradingview/) - [How to configure your Supercharts](https://www.tradingview.com/support/solutions/43000748166-how-to-configure-your-supercharts/) - [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/) - [Chart types available on TradingView](https://www.tradingview.com/support/solutions/43000703407-chart-types-available-on-tradingview/) - [Drawing tools available on TradingView](https://www.tradingview.com/support/solutions/43000703396-drawing-tools-available-on-tradingview/) Previous Previous I can't see the crosshair line Next Next How to sync the charts of my layout? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43585325245/original/52385_maIFABub_J1h7npmYfjsulXXDIKw.png?1760019508)

**Описание:** This TradingView chart displays **Apple Inc. (AAPL)** on the **NASDAQ** exchange with a **4-hour (4h)** time interval. Here’s a detailed breakdown of the UI elements:  


### **Top Bar & Header**  
- **Left Side**:  
  - `AAPL` (symbol) + `4h` (timeframe) + `D`/`W` (day/week toggle).  
  - `+` (add new chart), `Indicators` (add technical indicators), `Alert` (price/volume alerts), `Replay` (backtest market movements).  
- **Right Side**:  
  - `TradingVi…` (TradingView logo, dropdown menu).  
  - `Publish` (share chart), `Camera` (screenshot), `Layout` (chart layout settings, highlighted with a red arrow).  


### **Symbol & Price Info**  
- `Apple Inc · 4h · NASDAQ` (instrument details).  
- Price: `255.56` (current), `255.58` (bid/ask), with percentage change (`-0.96%`).  
- Volume: `Vol 849.12K` (trading volume).  


### **Chart Area**  
- **Main Chart**: A blue line chart showing AAPL’s price movement over time (x-axis: dates from June–September; y-axis: price).  
- **Layout Menu** (open, right-side):  
  - Grid of layout templates (1–16) to split the chart into multiple panels (e.g., 1 panel, 2 panels, 4 panels, etc.).  
  - `SYNC IN LAYOUT` (sync layout across charts).  
  - Toggles: `Symbol`, `Interval`, `Crosshair`, `Time`, `Date range` (enable/disable these features).  


### **Left Sidebar (Tools)**  
Icons for:  
- Zoom, trend lines, Fibonacci tools, drawing tools, text, measure, magnet (snap to price), lock, visibility, globe (exchange), trash (delete).  


### **Bottom Bar**  
- **Timeframe Buttons**: `1D`, `5D`, `1M`, `3M`, `6M`, `YTD`, `1Y`, `5Y`, `All` (switch chart period).  
- **Tabs**: `Pine Editor` (code indicators), `Paper Trading` (simulate trades), `Trade` (live trading).  


### **Purpose**  
This interface is for **technical analysis**—users analyze price trends, customize layouts, add indicators, set alerts, and trade (or simulate trading) AAPL stock. The layout menu lets traders organize multiple charts/indicators for comprehensive market analysis.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43584504014/original/O4SLCsmGh6aENVNdEYN6gUetf7PGyZxvhg.png?1759742621)

**Описание:** This is a **TradingView chart interface** showing a minimalistic control panel for chart manipulation. Here’s a detailed breakdown:  

### Top Bar (Dark Background)  
- **“Maximize chart”**: A text label (likely a tooltip or button) to expand the chart to full-screen.  
- **Keyboard shortcuts**: Two shortcut indicators:  
  - `⌃ + Click` (Control + Click)  
  - `⌃ + Enter` (Control + Enter)  
  These suggest actions to trigger chart maximization or related functions.  


### Bottom Row (Light Background Buttons)  
Five interactive buttons for chart navigation/zoom:  
1. **“−” (Minus)**: Zoom out (reduce chart magnification).  
2. **“+” (Plus)**: Zoom in (increase chart magnification).  
3. **“↗” (Expand/Full-Screen Icon)**: Maximize the chart (matches the top bar’s “Maximize chart” function).  
4. **“<” (Left Arrow)**: Scroll left (view earlier time periods).  
5. **“>” (Right Arrow)**: Scroll right (view later time periods).  


### Purpose  
These controls let users adjust the chart’s **zoom level** (via “−”/“+”) and **time range** (via “<”/“>”), plus maximize the chart for a clearer view. The keyboard shortcuts provide quick access to the maximize function. The interface is clean, focusing on core chart interaction tools.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43585326275/original/p_FVKzL32hI-PzKotlNudiQRdRyaM4i-fg.png?1760019698)

**Описание:** This TradingView chart displays **Apple Inc. (AAPL)** on the **NASDAQ** exchange with a **4-hour (4h)** time frame. Here’s a detailed breakdown:  


### **Top Bar & Symbol Info**  
- **Left**: “AAPL” (symbol), “4h” (time frame, with dropdown for 1m/D/W options), and buttons for *Indicators*, *Alert*, *Replay*.  
- **Center**: Symbol details: *Apple Inc · 4h · NASDAQ*, current price `255.32` (down `2.71, -1.05%`), volume `937.52K` (down `2.74, -1.06%`).  
- **Right**: Price boxes: Red `255.31` (bid, 132 volume), Blue `255.32` (ask, 132 volume), and a dropdown arrow.  


### **Chart Area**  
- **Price Chart**: Blue line showing AAPL’s price movement over time (x-axis: dates from June–October; y-axis: price levels 190–264). A red arrow highlights a specific trend segment.  
- **Tooltip**: Hovering over the chart shows `255.32` (price) and `03:09:20` (timestamp).  


### **Left Toolbar (Drawing/Tools)**  
Icons for:  
- Zoom, trend lines, horizontal lines, Fibonacci tools, text, smiley, ruler, magnify, magnet, lock, eye, **globe (sync settings, highlighted)**, trash.  
- Globe menu: *“New drawings will sync in layout”* / *“New drawings will sync globally”* (sync options for annotations).  


### **Right Sidebar**  
Icons for:  
- Notes, clock (time), patterns, chat, target, calendar, news, crosshair, chart type, globe, grid, signal, help.  


### **Bottom Bar**  
- **Time Frame Tabs**: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All (to switch chart duration).  
- **Status**: `14:20:40 UTC` (current time), `RTH` (regular trading hours), `ADJ` (adjusted data).  
- **Tabs**: *Pine Editor* (script editor), *Paper Trading* (simulated trading), *Trade* (live trading).  


### **Top Right**  
- *TradingView* logo, refresh, settings, fullscreen, camera, and **Publish** (share chart) button.  


This layout is designed for technical analysis, with tools for drawing, syncing annotations, and switching time frames to track AAPL’s price trends.


