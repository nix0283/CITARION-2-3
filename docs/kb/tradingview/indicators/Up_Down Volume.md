# Up/Down Volume

**URL:** https://www.tradingview.com/support/solutions/43000672561-up-down-volume/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Up/Down Volume ](/support/solutions/43000672561-up-down-volume/) # Up/Down Volume Definition The Up/Down Volume indicator reflects the direction in which the trades were moving within each particular bar. To do this, it splits the volume values on the current bar into two: Up Volume (volume calculated when the price went up) and Down Volume (volume calculated when the price went down). If the Up Volume is greater than the Down Volume, then the main trading volume within the current candle occurred at the purchase price. The resulting values are plotted as a histogram: Up Volume values are plotted above zero, Down Volume values below zero. The difference between the two values are indicated by Delta, displayed as a notch in the color of the prevailing volume. Calculation To calculate the Up and Down Volume values, the indicator scans the volume from the candles of a smaller timeframe that are included in the current candle and analyzes in which direction the price moved when these candles formed. To do this, it first determines the timeframe from which the volume values will be taken. A higher timeframe will provide more historical data, but the calculations will be less accurate. Different lower timeframes can be used to calculate the Up/Down Volume. By default, the timeframe for the calculation is selected automatically, based on the timeframe of the main chart: Chart timeframe Timeframe used for the calculation Seconds 1S Minutes or Hours 1 Daily 5 Others 60 After the timeframe is selected, each bar of a smaller timeframe is analyzed for the direction in which the price moved. If the opening price is not equal to the closing price: - If the closing price of the current bar is higher than its opening price, it is considered that the price was moving up. - If the closing price of the current bar is less than its opening price, the price is considered to have moved down. If the closing price of the current bar is equal to the opening price: - If the closing price of the current bar is greater than or equal to the closing price of the previous one, it is considered that the price was moving up. - If the closing price of the current bar is less than the closing price of the previous one, it is considered that the price was moving down. After that, the volume values on all bars where the price moved in the same direction are summed up. Thus, Up Volume shows how much volume was traded when the price was moving up, and Down Volume indicates for trades while movement down. Inputs Use custom timeframe Determines whether the lower timeframe used for the calculation is selected automatically (by default) or manually. If checked, the timeframe will be chosen based on the Timeframe input instead. Timeframe Allows you to specify a specific timeframe that the indicator will check to look for bars to use while calculating the sum of volumes. Higher timeframes provide more historical data, but the calculation becomes less precise. This field is only used when the Use custom timeframe option is enabled. Previous Previous Ultimate Oscillator (UO) Next Next Visible Average Price Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582920193/original/939HV45rdQKOjmj1Syb3ll3HABT8ZQ4b0A.png?1758897699)

**Описание:** This TradingView chart displays **Apple Inc. (NASDAQ: AAPL)** on a **1-day (1D)** timeframe, showing a candlestick price chart with an **Up/Down Volume (Up/Dn Vol)** indicator configuration window open. Here’s a detailed breakdown:  


### **Top Bar & Symbol Info**  
- **Left**: Zoom controls (`+`/`-`), timeframe selector (`D` for daily), and a “More” menu (three dots).  
- **Center**:  
  - `Indicators` (dropdown to add technical indicators), `Alert` (set price alerts), `Replay` (simulate market movements), and navigation arrows (back/forward).  
  - Symbol details: *“AAPL Apple Inc · 1D · NASDAQ”* with current price data: *O254.10 H256.60 L253.78 C255.27 -1.60 (-0.62%)* (open, high, low, close, change).  
- **Right**: Currency selector (`USD`), and icons for notes, alerts, chat, and publishing.  


### **Main Chart Area**  
- **Price Chart**: Candlestick chart (green = up, red = down) showing price action over months (May 2025–Feb 2026).  
- **Volume Subchart**: Below the price chart, a volume histogram (green = up volume, red = down volume) with blue dots (likely indicator markers).  
- **Up/Down Volume (Up/Dn Vol) Configuration Window**:  
  - Tabs: `Inputs` (active), `Style`, `Visibility`.  
  - Options:  
    - *“Use custom timeframe”* (unchecked, with an info icon).  
    - *“Timeframe”* dropdown (set to “1 minute”).  
    - *“Inputs in status line”* (checked, to display indicator values in the status bar).  
  - Buttons: `Defaults` (reset to default settings), `Cancel`, `Ok` (apply changes).  


### **Left Sidebar**  
Icons for drawing tools (trendlines, Fibonacci, text), chart types (candlestick, line), and other functions (e.g., lock, globe, trash).  


### **Bottom Bar**  
- **Timeframe Selector**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (switch between timeframes).  
- **Date Range**: X-axis labels (May, Jun, Jul, Aug, Sep, Oct, Nov, Dec, 2026, Feb).  
- **Status Bar**: Timestamp (`10:41:26 UTC-4`), `ADJ` (adjusted data), and tabs for `Pine Editor` (script editor) and `Trading Panel`.  


### **Right Sidebar**  
Icons for additional features: notes, alerts, chat, chart styles, calendar, and help.  


### **Key Data Points**  
- Current price: $255.27 (down 0.62%).  
- Volume: `Up Volume: 6.41M`, `Down Volume: -2.67M` (displayed in green/red boxes).  


This layout is typical of TradingView, combining price action, volume analysis, and customizable indicators for technical trading.


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

