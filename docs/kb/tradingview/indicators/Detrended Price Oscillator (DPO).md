# Detrended Price Oscillator (DPO)

**URL:** https://www.tradingview.com/support/solutions/43000502246-detrended-price-oscillator-dpo/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Detrended Price Oscillator (DPO) ](/support/solutions/43000502246-detrended-price-oscillator-dpo/) # Detrended Price Oscillator (DPO) Definition The [Detrended Price Oscillator indicator (DPO)](https://www.tradingview.com/scripts/detrendedpriceoscillator/) is used to remove trend from price. This is done in order to identify and isolate short-term cycles. DPO is not typically aligned with the most current prices. It is offset to the left (the past) which helps to remove current trend. Because it is offset to the past, the DPO is not considered a momentum oscillator. It only measures past prices against a Simple Moving Average as a way to gauge a cycle's high/low range as well as typical duration. Calculation (Price of (N/2 + 1) periods ago) - (N Period SMA) = DPO N = The user defined look-back period The basics The Detrended Price Oscillator indicator (DPO) compares past prices to a displaced (shifted to the past) Simple Moving Average. The SMA is displayed a Zero Line, with DPO fluctuating between positive (above the line) and negative (below the line) values. Simply put, a positive values means that price was above the SMA and a negative value means price was below the SMA. What to look for The main purpose of the DPO is to analyze historical data in order to observe cycle's in a market's movement. DPO can give the technical analyst a better sense of a cycle's typical high/low range as well as its duration. Cycle High/Low Range Cycle Duration Summary The Detrended Price Oscillator (DPO)is not necessarily intended to be a signal-generating indicator. Instead it is best served as a way for a technical analyst to build confidence when identifying the characteristics of a trading instrument's typical cycle. Because of this, it would be prudent to use the DPO alongside additional indicators which are designed to gauge trend or momentum. Inputs Period The time period to be used in calculating the DPO. Centered When the DPO is centered, the DPO line stays offset towards the left. When it is not centered, it shifts back to the right to match current price. Style Detrended Price Oscillator Can toggle the visibility of the DPO as well as the visibility of a price line showing the actual current value of the DPO. Can also select the DPO Line's color, line thickness and visual style (Line is the Default). Zero Line Can toggle the visibility of the Zero Line. Can also select the line’s value, line thickness, value and visual type (dashes is the default). Precision Sets the number of decimal places to be left on the indicator's value before rounding up. The higher this number, the more decimal points will be on the indicator's value. Previous Previous Cumulative Volume Index (CVI) Next Next Directional Movement (DMI) Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43586537314/original/McF25flI4hIeTxE2pYEo2mtvXaS8B4NuBA.png?1760615712)

**Описание:** This TradingView chart displays Apple Inc. (NASDAQ) on a 1-day timeframe, with a **DPO (Detrended Price Oscillator)** indicator configuration modal open.  

### Top Bar:  
- **Left**: Zoom controls, timeframe selector (\


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43586537360/original/7zMxd2C8AmqkagaDpfr39X_5-ZPsocHAEg.png?1760615726)

**Описание:** This TradingView screenshot displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with the Detrended Price Oscillator (DPO) indicator configuration open. Here’s a detailed breakdown:  


### **Top Navigation Bar**  
- **Left**: Zoom controls (`+`/`-`), timeframes (`D` for daily), and chart type toggles (candlestick, line, etc.).  
- **Middle**: `Indicators` (dropdown for adding technical indicators), `Alert` (set price alerts), `Replay` (backtest market movements), and navigation arrows.  
- **Right**: `TradingView` (account menu), time zone (`UTC+3`), and tools (refresh, settings, camera, `Publish`).  


### **Chart Header**  
- **Symbol/Timeframe**: `Apple Inc · 1D · NASDAQ` (current instrument and timeframe).  
- **Price Data**: `O 249.49 H 251.82 L 247.47 C 249.34 +1.57 (+0.63%)` (open, high, low, close, and daily change).  
- **Currency**: `USD` (dropdown for currency selection).  


### **Main Chart Area**  
- **Candlestick Chart**: Shows Apple’s price action over months (May–Nov), with green (up) and red (down) candles.  
- **DPO Indicator**: A green line below the main chart (labeled `DPO 21` in the legend) displays the Detrended Price Oscillator, with blue dots marking key points.  


### **DPO Configuration Popup (Center)**  
A modal window titled `DPO` is open, with three tabs:  
- **`Inputs`**: Not active.  
- **`Style`** (active):  
  - `DPO` (checked): Toggle to show/hide the DPO line. Color: green, line style: solid.  
  - `Zero Line` (checked): Toggle to show/hide the zero reference line. Color: gray, line style: dashed.  
  - `OUTPUT VALUES`:  
    - `Precision`: Dropdown (set to `Default`).  
    - `Labels on price scale`: Checkbox (enabled, shows DPO values on the price axis).  
    - `Values in status line`: Checkbox (enabled, shows DPO values in the status bar).  
- **`Visibility`**: Not active.  
- **Buttons**: `Defaults` (reset to default settings), `Cancel` (close without saving), `Ok` (apply changes).  


### **Left Sidebar (Tools)**  
Icons for drawing tools (trendlines, Fibonacci, text), chart types, and account features (Pine Editor, Trading Panel).  


### **Bottom Timeline/Timeframes**  
- **Months**: `May` to `Nov` (x-axis labels).  
- **Timeframe Buttons**: `1D` (active), `5D`, `1M`, `3M`, `6M`, `YTD`, `1Y`, `5Y`, `All` (switch chart periods).  
- **Date Picker**: Calendar icon (select custom date ranges).  


### **Right Sidebar**  
Icons for notes, alerts, patterns, chat, and other features (e.g., `ADJ` for adjusted data).  


### **Status Bar**  
- **Time**: `14:54:53 UTC+3` (current time).  
- **DPO Value**: `DPO 6.85` (current DPO reading, shown in green).  


This layout is typical of TradingView’s interface, enabling traders to analyze price action, customize indicators, and manage alerts/notes. The DPO popup allows fine-tuning the indicator’s appearance and data display.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

