# Parabolic SAR Strategy

**URL:** https://www.tradingview.com/support/solutions/43000645065-parabolic-sar-strategy/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Strategies - / [ Built-in Strategies ](/support/folders/43000587406-built-in-strategies/) - / [ Parabolic SAR Strategy ](/support/solutions/43000645065-parabolic-sar-strategy/) # Parabolic SAR Strategy Definition Parabolic Stop and Reverse (SAR) strategy is based on the Parabolic SAR indicator. It enters long whenever SAR changes its position from being above the chart to being below, and enters short when the opposite happens. The underlying Parabolic SAR indicator is described in detail in [its respective Help Center article](https://www.tradingview.com/chart/?solution=43000502597). Inputs Start The starting value for the Acceleration Factor (.02 is the Default). Increment The increment in which the Acceleration Factor will move (.02 is Default). Max Value The maximum value of the Acceleration Factor (.20 is the Default) Previous Previous OutSide Bar Strategy Next Next Pivot Extension Strategy Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43586749075/original/3RacoJL6nxTdV_qGjLss3z14sXnAvUXM9w.png?1760699418)

**Описание:** This TradingView screenshot displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with the **Parabolic SAR Strategy** indicator applied. Here’s a detailed breakdown:  


### **Top Bar & Chart Header**  
- **Left**: “AAPL” (ticker), “Apple Inc · 1D · NASDAQ” (instrument/timeframe), and price data: *O 248.25, H 249.04, L 245.13, C 247.45* (open, high, low, close) with a **-1.89 (-0.76%)** change.  
- **Right**: “ParSE” (Parabolic SAR label), “Parabolic SAR Strategy:SAR” (orange), “Parabolic SAR Strategy:Next bar SAR 257.78” (blue), and “USD” (currency).  


### **Chart Area**  
- **Candlestick Chart**: Green/red candles show price action (green = up, red = down) over months (Jul–Nov).  
- **Parabolic SAR Dots**: Colored dots (blue/orange) overlay the chart, marking trend direction (blue = uptrend, orange = downtrend). Labels like “ParSE” (SAR), “ParLE +2” (long entry) indicate strategy signals.  


### **“Parabolic SAR Strategy” Popup (Center)**  
A modal for configuring the indicator:  
- **Tabs**: *Inputs* (active), *Properties*, *Style*, *Visibility*.  
- **Inputs**: Fields for “Start (0.02)”, “Increment (0.02)”, “Maximum (0.2)” (SAR parameters).  
- **Checkbox**: “Inputs in status line” (shows parameters on the chart).  
- **Buttons**: *Defaults* (reset), *Cancel*, *Ok* (apply changes).  


### **Left Sidebar (Tools)**  
Icons for drawing (line, trendline), chart types (candle, bar), social, text, and other tools (e.g., “PRO” badge, timeframes: 1D/5D/1M/3M/6M/YTD/1Y/5Y/All).  


### **Bottom Panel**  
- **Tabs**: *Pine Editor* (code), *Strategy Tester* (active), *Trading Panel*.  
- **Report Tabs**: *Overview* (active), *Performance*, *Trades analysis*, *Risk/performance*.  
- **Trade Table**: Lists trades (e.g., Trade #850: Short, Entry Oct 10, 2025 @252.74, Exit Oct 16, 2025 @247.45, +5.29 USD P&L). Columns: *Trade #*, *Type*, *Date/Time*, *Signal*, *Price*, *Position size*, *Net P&L*, *Run-up*, *Drawdown*, *Cumulative P&L*.  


### **Top-Right & Bottom-Right**  
- **Top-Right**: “TradingView” (logo), “M/M/S” (market data), “Publish” (share chart), and icons (alerts, replay, zoom, etc.).  
- **Bottom-Right**: Date range (Dec 12, 1980–Oct 16, 2025), “14:10:05 UTC+3” (time), “ADJ” (adjusted data).  


### **Purpose**  
The interface is used to **analyze Apple’s price action** with the Parabolic SAR indicator, configure its parameters, and review backtest results (via the Strategy Tester) to evaluate trading performance.


**Описание:** This TradingView screenshot displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with the **Parabolic SAR Strategy** indicator applied. Here’s a detailed breakdown:


### **Top Bar & Chart Header**  
- **Left**: Ticker (`AAPL`), time frame (`1D`), and price data: `O 248.25 H 249.04 L 245.13 C 247.45 -1.89 (-0.76%)`.  
- **Middle**: Toolbar with icons for:  
  - Zoom (`+`/`-`), time frame selector (`4h` dropdown), indicators (`Indicators`), alert (`Alert`), replay (`Replay`), and navigation arrows.  
  - `TradingView` logo, time zone (`UTC+3`), and currency (`USD`).  
- **Right**: `Publish` button and additional tools (e.g., chart style, screenshot, settings).  


### **Chart Area**  
- **Candlestick Chart**: Green/red candles show price action (green = up, red = down) over months (Jul–Nov).  
- **Parabolic SAR**: Colored dots (blue = uptrend, orange = downtrend) with labels:  
  - `ParSE` (Parabolic SAR Exit), `ParLE` (Parabolic SAR Long Entry), and `-2` (signal strength).  
- **Trend**: Recent downtrend (orange dots) with a `ParSE` exit at ~$257.78 (noted in the top-right).  


### **Pop-Up: Parabolic SAR Strategy Settings**  
A modal window configures the indicator:  
- **Tabs**: `Inputs` (active), `Properties`, `Style`, `Visibility`.  
- **Input Fields**:  
  - `Start`: 0.02 (initial acceleration factor).  
  - `Increment`: 0.02 (acceleration increase per trend).  
  - `Maximum`: 0.2 (max acceleration factor).  
- **Checkbox**: `Inputs in status line` (shows settings on the chart).  
- **Buttons**: `Defaults` (reset to defaults), `Cancel`, `Ok` (apply changes).  


### **Bottom Panel: Strategy Tester**  
- **Tabs**: `Pine Editor`, `Strategy Tester` (active), `Trading Panel`.  
- **Report Tabs**: `Overview` (active), `Performance`, `Trades analysis`, `Risk/performance`.  
- **Trade Table**:  
  - **Trade #850 (Short)**: Exit Oct 16, 2025 (price: $247.45), entry Oct 10, 2025 (price: $252.74). Net P&L: +$5.29 (+2.09%).  
  - **Trade #849 (Long)**: Exit Oct 10, 2025 (price: $252.74), entry (not fully visible). Net P&L: +$12.61.  
- **Columns**: Trade #, Type, Date/Time, Signal, Price, Position size, Net P&L, Run-up, Drawdown, Cumulative P&L.  


### **Left Sidebar**  
Icons for drawing tools (trendlines, Fibonacci), chart types, text, and account settings.  


### **Purpose**  
The image demonstrates **backtesting the Parabolic SAR strategy** on Apple’s stock, with real-time price data, indicator customization, and trade history analysis. The pop-up allows tweaking the SAR’s parameters to optimize signals.


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

