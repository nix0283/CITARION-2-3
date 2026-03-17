# VWAP Auto Anchored

**URL:** https://www.tradingview.com/support/solutions/43000652199-vwap-auto-anchored/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ VWAP Auto Anchored ](/support/solutions/43000652199-vwap-auto-anchored/) # VWAP Auto Anchored VWAP Auto Anchored is an indicator that displays a Volume Weighted Average Price calculation for a single user-defined period. The general VWAP calculation mechanism and the basics of the concept are described in [this Help Center article](https://www.tradingview.com/chart/?solution=43000502018). VWAP Auto Anchored differs from other VWAP indicators and drawings in that it’s automatically tied to the beginning of the last period available on the chart and is only displayed from that point. Please note that the VWAP Auto Anchored indicator is not written in Pine and thus there is no way to examine its source code. Inputs Anchor Period Anchor Period specifies the anchor of the VWAP calculation, i.e. how often VWAP recalculates and where it starts. The available options are: Auto - The starting point of the VWAP calculation depends on the timeframe on the chart: - "Session" on all intraday timeframes - "Month" on the 1D timeframe - "Quarter" on all timeframes between 2D and 10D - "Year" on all timeframes between 11D and 60D - "Decade" on all timeframes above 61D Highest High - VWAP starts on the bar with the highest high among the last X bars, where X is specified in the Length argument. Lowest Low ** **- VWAP starts on the bar with the lowest low among the last X bars, where X is specified in the Length argument. Highest Volume - VWAP starts on the bar with the highest volume among the last X bars, where X is specified in the Length argument. Session - VWAP starts at the beginning of the last daily session. Week - VWAP starts at the beginning of the last week. Month - VWAP starts at the beginning of the last month. Year - VWAP starts at the beginning of the last year. Quarter - VWAP starts at the beginning of the last quarter (three-month period: Jan-Mar, Apr-Jun, Jul-Sep, Oct-Dec). Decade - VWAP starts at the beginning of the last decade. Century - VWAP starts at the beginning of the last century. Earnings - VWAP starts at the bar with the last earnings report for the current symbol. Dividends - VWAP starts at the bar with the last dividends report for the current symbol. Splits - VWAP starts at the bar with the last split for the current symbol. Source The source for the VWAP calculation. Traditionally, the bar's average value is used as the source. By default, the source is hlc3, but hl2 is another common option. This option does not affect the Anchor Period calculation, i.e. the Highest High anchor always compares the ‘high’ data, no matter what is chosen as the source. Length A rolling window that specifies the number of bars that the indicator analyses when searching for the anchor. Applies only to Highest High, Lowest Low, and Highest Volume anchor periods. E.g. with the Highest High anchor period and the length of 100, the indicator will search for the last 100 bars for the bar with the highest ‘high’ value to start the VWAP calculation on. Bands Calculation mode Determines the units used to calculate the distance of the bands. When 'Percentage' is selected, a multiplier of 1 means 1%. Bands Multiplier The value the Standard Deviation bands will be multiplied by before being plotted on the chart. Offset Changing this number will move the VWAP either Forwards or Backwards, relative to the current market. Zero is the default. Style VWAP Can toggle the visibility of the VWAP as well as the visibility of a price line showing the actual current value of the VWAP. Can also select the VWAP Line's color, line thickness, and line style. Upper Band #1-3, Lower Band #1-3 Can toggle the visibility of the VWAP standard deviation bands and set their colors and line types. Backround Can change whether to fill the space between the standard deviation bands and tune the color. Precision Sets the number of decimal places to be left on the indicator's value before rounding up. The higher this number, the more decimal points will be on the indicator's value. Previous Previous Vortex Indicator Next Next Weighted Moving Average Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43282251835/original/CIwnIMSX6IyLva9QvtsRCHMJI6PUe6tQDA.png?1640086981)

**Описание:** This TradingView chart displays **MRO (Marathon Oil) stock on NASDAQ** with the following key elements:  

### 1. Header & Ticker Info  
- **Ticker**: “MRO” (Marathon Oil) with “NASDAQ” exchange label.  
- **Price Data**:  
  - Current price: `169.75` (red, -1.39, -0.81% change).  
  - Bid/Ask: `171.55` (red, 0.10) / `171.65` (blue).  
- **Currency**: “USD” dropdown (top-right).  


### 2. Chart Type & Timeframe  
- **Chart**: Candlestick chart (green/red candles show price action).  
- **Timeframe**: Daily (x-axis labels: *Sep, Oct, Nov, Dec, 2022*; dates like “20,” “18,” “15,” “13” mark specific days).  


### 3. Technical Indicators & Overlays  
- **VWAP (Volume-Weighted Average Price)**: Orange dotted line (horizontal, near 171.55).  
- **Moving Averages**:  
  - Blue line: Likely a shorter-term MA (e.g., 20-day).  
  - Green lines: Two longer-term MAs (e.g., 50-day, 100-day) with a shaded “cloud” (Ichimoku-inspired or Bollinger-like area).  
- **Indicator Label**: “VWAP AA Lowest Low hlc3 100 1” (custom indicator settings).  


### 4. Price Panel (Right)  
- **Pre-Market/Current**: “Pre” (orange) shows `171.55`; current price `169.75` (teal).  
- **Y-Axis**: Price scale (136.00–184.00 USD).  


### 5. UI Controls (Bottom)  
- **Icons**:  
  - `E` (home/clear), `D` (draw/annotate).  
- **Date Range**: X-axis spans late 2021 (Sep) to early 2022 (Dec).  
- **Theme Toggle**: Sun icon (top-right) for light/dark mode.  


### 6. Chart Behavior  
- **Candles**: Green = upward close, red = downward close.  
- **Trend**: Recent rally (Dec) followed by a pullback (current price ~169.75, below VWAP).  


This layout provides real-time price, technical analysis tools, and historical context for MRO’s daily performance.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582921821/original/czdi857eY8GbKqWRT9jPwW9ncH5adEZBzw.png?1758898029)

**Описание:** This TradingView screenshot displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with the **VWAP AA (Volume-Weighted Average Price - Auto Anchor)** indicator settings panel open. Here’s a detailed breakdown:  


### **Top Navigation Bar**  
- **Left**: Zoom controls (magnifying glass), time frame selector (D for 1D), and indicator menu (dropdown labeled “Indicators”).  
- **Right**: “Alert,” “Pine,” “TradingView” (logo), time zone selector (M/M/S), refresh, settings, chart type, and “Publish” button.  


### **Chart Header**  
- **Symbol/Timeframe**: “AAPL Apple Inc · 1D · NASDAQ” with current price data: *O254.10 H256.60 L253.78* (open, high, low).  
- **Indicator Label**: “VWAP AA Auto hlc3 14 Standard Deviation 1 2 3” (describes the VWAP AA setup: Auto anchor, HLC3 source, 14-period length, 1/2/3 standard deviation bands).  


### **VWAP AA Settings Panel (Modal)**  
This panel configures the VWAP AA indicator:  
- **Tabs**: *Inputs* (active), *Style*, *Visibility*.  
- **Inputs Section**:  
  - *Anchor Period*: Dropdown set to “Auto” (uses the first trade of the day as the VWAP anchor).  
  - *Source*: Dropdown set to “(H + L + …” (likely HLC3, a common VWAP source).  
  - *Length*: Input field set to “14” (period for VWAP calculation).  
  - *Bands Settings*:  
    - *Bands Calculation Mode*: Dropdown set to “Standar…” (standard deviation).  
    - *Bands Multiplier #1*: Checked (enabled) with value “1” (1 standard deviation band).  
    - *Bands Multiplier #2*: Unchecked (disabled) with value “2”.  
    - *Bands Multiplier #3*: Unchecked (disabled) with value “3”.  
  - *Offset*: Input field set to “0” (no horizontal shift of the VWAP line).  
  - *Input Values*: Checkbox “Inputs in status line” (shows VWAP values in the chart’s status bar).  
- **Buttons**: “Defaults” (reset to default settings), “Cancel” (close without saving), “Ok” (apply settings).  


### **Chart Area**  
- **Candlestick Chart**: Displays AAPL’s price action (green/red candles) from May to Aug (x-axis) with price levels (y-axis, ~188–260 USD).  
- **VWAP Bands**:  
  - *Upper Band #1*: Green label “249.71” (1 standard deviation above VWAP).  
  - *VWAP*: Blue label “241.06” (volume-weighted average price).  
  - *Lower Band #1*: Green label “232.41” (1 standard deviation below VWAP).  


### **Left Sidebar**  
Icons for drawing tools (trend lines, Fibonacci, text), chart types (candlestick, line), and other features (e.g., “PRO” badge, Pine Editor, Trading Panel).  


### **Bottom Timeline**  
Time frame buttons (1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All) and a calendar icon (for custom date ranges).  


### **Right Sidebar**  
Icons for notes, alerts, order book, chat, and other utilities (e.g., “USD” currency selector, “ADJ” for adjusted data).  


### **Status Bar (Bottom Right)**  
- Time: “10:46:24 UTC-4” (current time).  
- “ADJ” (adjusted data toggle).  


### **Purpose**  
The VWAP AA indicator helps traders analyze price relative to the volume-weighted average, with bands indicating volatility. The settings panel customizes the VWAP’s anchor, source, length, and band multipliers to fit trading strategies. The chart provides a visual of AAPL’s price trends, while the UI elements enable chart customization, analysis, and publishing.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582921884/original/upLYXHE7jHyP5wPcUdqhkXrrc_x9-pkpDg.png?1758898043)

**Описание:** This TradingView image displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with the **VWAP AA (Volume-Weighted Average Price with Auto Bands)** indicator settings open. Here’s a detailed breakdown:  


### **Top Bar & Chart Header**  
- **Left**: Symbol (`AAPL`), name (`Apple Inc.`), exchange (`NASDAQ`), and current price data (`O254.10 H256.60 L253.78 C…`).  
- **Right**: Currency (`USD`), price scale (260.00–200.00), and a “Publish” button.  


### **Chart Area**  
- **Candlestick Chart**: Shows price action (green/red candles) from August to April, with VWAP (blue line) and three sets of bands (green, brown, teal) overlaid.  
- **VWAP AA Settings Panel** (center, modal):  
  - **Tabs**: `Inputs`, `Style` (active), `Visibility`.  
  - **Style Options**: Checkboxes for `VWAP`, `Upper/Lower Bands #1–3`, and `Background` (all enabled). Each has a color picker (e.g., blue for VWAP, green for Band #1) and a line-style toggle.  
  - **Output Values**: `Precision` (set to “Default”) and checkboxes for `Labels on price scale`/`Values in status line` (both enabled).  
  - **Buttons**: `Defaults` (dropdown), `Cancel`, `Ok`.  


### **Left Sidebar**  
Icons for tools (e.g., drawing, indicators, alerts) and a “PRO” badge.  


### **Bottom Bar**  
- **Timeframes**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (1D is active).  
- **Tabs**: `Pine Editor`, `Trading Panel`.  


### **Right Sidebar**  
Icons for notes, alerts, chat, and other features.  


### **Key Elements**  
- **VWAP AA**: A technical indicator showing VWAP (blue) and bands (volatility envelopes) in green/brown/teal.  
- **Price Scale Labels**: Right-side values (e.g., `VWAP AA:Upper Band #1 249.71`, `VWAP AA:VWAP 241.06`) display current indicator values.  


This layout is typical for TradingView, focusing on customizing the VWAP AA indicator to analyze price relative to volume-weighted averages and volatility bands.


