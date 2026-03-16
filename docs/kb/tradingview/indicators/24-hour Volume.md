# 24-hour Volume

**URL:** https://www.tradingview.com/support/solutions/43000668584-24-hour-volume/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ 24-hour Volume ](/support/solutions/43000668584-24-hour-volume/) # 24-hour Volume Definition Volume is the total amount of assets traded in a specific period of time. The 24-hour Volume indicator is used to measure the total volume of a symbol traded in the last 24 hours, expressed as in currency. It can be used to measure the market's interest in a particular symbol. Calculation To calculate the 24-hour volume, the indicator uses data from different timeframes; the timeframes chosen depend on the timeframe on the main chart: Chart timeframe Timeframe used for the calculation less than 1D 1 1D - 1W 5 greater than 1W 60 The indicator calculates the sum of the volume for the last X bars of the lower timeframe, where X is the number of bars that opened in the last 24 hours. The indicator works with calendar hours regardless of the symbol session, so if there has been no past trades for 24 hours or more (e.g., on the first Monday bar on a symbol that is only traded on business days), 24-hour volume can be equal to the regular volume data. The indicator always displays the 24-hour volume converted to the currency selected in the indicator's inputs. This means that, if the exchange presents its volume data in base currency (e.g., when for BTCUSD, the volume represents the number of BTC traded), the 24-hour Volume indicator converts the base volume into currency volume by multiplying the volume by the price on the chart. The 'Price Source' input can be used to select which specific chart value will be used for this conversion. The volume can be additionally converted into a currency different from the one on the chart. This can be done by switching the 'Target Currency' input from Default to a different currency. What to look for The 24-hour volume is a metric used to track the total value of all cryptocurrency transactions within a 24-hour period. It can be used to measure the market's interest in a particular symbol and gauge its overall health. A high 24-hour volume means that there is high demand for the symbol and that it is healthy and viable. A low 24-hour volume may indicate that the symbol is not as popular as others. Inputs Price Source Specifies the price source used to convert base volume into currency volume, if necessary. Target Currency Sets the currency that the 24-hour volume will be presented in. Available options: Default, USD, EUR, CAD, JPY, GBP, HKD, CNY, NZD, RUB. Previous Previous 1 year active supply % Next Next Accumulation Distribution (ADL) Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582424451/original/CF05HhagG3vCTnXMjW_LInVQaAYP35Zufw.png?1758716522)

**Описание:** This TradingView screenshot displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with a volume bar chart below. Here’s a detailed breakdown:  


### **Top Navigation Bar**  
- **Left**:  
  - *Zoom controls* (plus/minus, “D” for day timeframe).  
  - *Chart type icons* (candlestick, line, etc.).  
  - *Indicators menu* (dropdown to add technical indicators).  
  - *Timeframe selector* (e.g., “W” for weekly).  
  - *Alert* (set price alerts) and *Replay* (backtest market movements) buttons.  
  - *Undo/redo* arrows.  
- **Right**:  
  - *TradingView logo* (dropdown for account/settings).  
  - *Market data toggles* (M/M/S for metrics).  
  - *Chart tools* (refresh, settings, fullscreen, screenshot, “Publish” button).  


### **Chart Header**  
- **Symbol/Timeframe**: “Apple Inc · 1D · NASDAQ” (current instrument and timeframe).  
- **Price Data**: Open (O: 255.88), High (H: 257.34), Low (L: 253.58), Close (C: 254.43), Change (-1.65, -0.64%).  


### **Main Chart Area**  
- **Candlestick Chart**: Green candles = price increase; red = decrease. Tracks AAPL’s daily price action over months (x-axis: dates from mid-July to early October).  
- **Volume Bar Chart**: Blue bars below the candlestick chart, measuring trading volume (y-axis: 0–20B).  


### **Left Sidebar (Drawing/Tools)**  
Icons for:  
- Zoom, trend lines, Fibonacci tools, text, smiley (annotations), measuring, search, alerts, drawing, lock, visibility, globe, delete.  


### **“24H Vol” Popup (Indicator Settings)**  
A modal for configuring the *24H Vol* (24-hour volume) indicator:  
- **Tabs**: *Inputs* (active), *Style*, *Visibility*.  
- **Inputs**:  
  - *Price Source*: Dropdown (set to “Close”).  
  - *Target Currency*: Dropdown (set to “Default”).  
  - *Checkbox*: “Inputs in status line” (shows settings on the chart).  
- **Buttons**: *Defaults* (reset to default), *Cancel*, *Ok* (apply changes).  


### **Bottom Bar**  
- **Timeframe Buttons**: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All (switch chart periods).  
- **Date Range**: X-axis labels (dates: 15, 18, 23, … Oct 14).  
- **Timestamp**: “08:21:29 UTC-4” (current time).  
- **Tabs**: *Pine Editor* (code indicator scripts), *Trading Panel* (order execution).  


### **Right Sidebar**  
Icons for:  
- Notes, clock (time), depth (order book), chat, target (price alerts), drawing, calendar, grid, signals, help.  


### **Purpose**  
This interface is used for **technical analysis**—traders analyze price trends, volume, and customize indicators to make trading decisions. The “24H Vol” popup adjusts how volume data is calculated/displayed.


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

