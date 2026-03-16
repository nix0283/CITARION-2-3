# Time Weighted Average Price

**URL:** https://www.tradingview.com/support/solutions/43000692939-time-weighted-average-price/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Time Weighted Average Price ](/support/solutions/43000692939-time-weighted-average-price/) # Time Weighted Average Price The Time Weighted Average Price (TWAP) is a trading indicator used to help traders manage their positions in the market. It is calculated by dividing the total value of a security traded over a specific period of time by the total number of shares traded during that period. The resulting value provides a simple and effective way to measure the average price at which a security is traded over a given timeframe. TWAP is most commonly used to facilitate execution of bigger orders without excessive impact on the market price. The order is split into separate smaller orders which are executed with a delay between them to ensure that the size of the orders does not affect the market negatively. The TWAP value represents the average price for the specified period and can be used to automatically specify a proper price for the order. Inputs Anchor Period Indicator calculation period. This setting specifies the Anchor, i.e. how frequently the TWAP calculation will be reset. For TWAP to work properly, each TWAP period should include several bars inside of it, so e.g. setting both and timeframe to '1D' is not useful because the indicator will be reset on every bar. Adding a new custom timeframe through the Interval menu above the chart will also add said timeframe to the Anchor Period dropdown in the indicator settings. Source The source for the TWAP calculation. Traditionally, the bar's average value is used as the source. By default, the source is ohlc4. Offset Changing this number will move the TWAP either Forwards or Backwards, relative to the current market. Zero is the default. Previous Previous Technical Ratings Next Next Trading Sessions Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43586581518/original/BFtEcRwJKs_wY8Rlq1jXxJBWbtHHgx2J_g.png?1760625608)

**Описание:** This TradingView screenshot displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with a **TWAP (Time-Weighted Average Price) indicator configuration window** open. Here’s a detailed breakdown:  


### **Top Navigation Bar**  
- **Left**:  
  - *Apple Inc · 1D · NASDAQ*: Ticker and timeframe.  
  - *O 248.25 H 248.68 L 246.18 C 248.44 -0.90 (-0.36%)*: Real-time price data (Open, High, Low, Close, change).  
  - *TWAP 1D ohlc4*: Active indicator label.  
- **Middle**:  
  - Icons for *Indicators* (dropdown), *Alert*, *Replay*, and navigation arrows.  
- **Right**:  
  - *TradingView* dropdown, *M/M/S* (timeframes), *Publish* button, and other tools (refresh, settings, camera).  


### **Left Sidebar (Tools)**  
Vertical icons for drawing tools (trendlines, Fibonacci), chart types (candlestick, line), text, and other utilities (e.g., lock, globe, trash).  


### **Main Chart Area**  
- **Candlestick Chart**: Shows AAPL’s price action (green = up, red = down) over months (May–Nov).  
- **TWAP Line**: Orange line overlaying the chart (current value: 247.89, top-right).  


### **TWAP Configuration Window (Center)**  
A modal for customizing the TWAP indicator, with three tabs:  
- **Inputs** (active):  
  - *Anchor Period*: Dropdown (set to “1 day”).  
  - *Source*: Dropdown (set to “(O + H …” for open/high/low/close).  
  - *Offset*: Numeric input (0).  
  - *CALCULATION*:  
    - *Timeframe*: Dropdown (set to “Chart”).  
    - *Wait for timeframe closes*: Checkbox (enabled).  
  - *INPUT VALUES*:  
    - *Inputs in status line*: Checkbox (enabled).  
- **Style**: For visual customization (not shown).  
- **Visibility**: For toggling indicator visibility (not shown).  
- **Buttons**: *Defaults* (reset), *Cancel*, *Ok* (apply changes).  


### **Bottom Chart Controls**  
- **Timeframe Buttons**: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All.  
- **Date Range**: May–Nov (x-axis).  
- **Time/UTC**: 17:39:50 UTC+3 (right).  


### **Right Sidebar**  
Icons for notes, alerts, chat, and other features (e.g., patterns, calendar, grid).  


### **Purpose**  
The chart analyzes AAPL’s daily price trends, while the TWAP window configures the indicator to calculate average prices over time—useful for large-order execution or trend analysis. The UI balances real-time data, customization, and trading tools.


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

