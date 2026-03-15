# Volume Delta

**URL:** https://www.tradingview.com/support/solutions/43000725057-volume-delta/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Volume Delta ](/support/solutions/43000725057-volume-delta/) # Volume Delta The Volume Delta indicator uses intrabar volume and price fluctuations to estimate the difference (delta) between buying and selling pressure within each chart bar, providing insight into an instrument's sentiment and market dynamics. The indicator analyzes each chart bar from an intrabar timeframe (i.e., a timeframe lower than the chart's), categorizing each intrabar's volume as positive or negative. It gradually accumulates the polarized volume values throughout a chart bar to calculate the volume delta, and it keeps track of the highest and lowest volume delta values achieved over the bar's duration. After performing this analysis on a bar, the indicator plots a candle to represent the results: - The candle's open value is always 0. - The candle's close signifies the bar's final volume delta value. - The high reflects the highest volume delta calculated throughout the bar's duration. - The low reflects the lowest volume delta calculated throughout the bar's duration. Calculation The Volume Delta indicator scans volume and price action across lower-timeframe bars within each chart bar to calculate volume delta values. To do this, it must first determine the intrabar timeframe to analyze. Users can decide the lower timeframe manually or let the indicator determine the timeframe. By default, it selects the timeframe automatically based on the chart's timeframe using the following rules: Chart timeframe Timeframe used for the calculation Seconds 1S Minutes or Hours 1 Daily 5 Others 60 When selecting an intrabar timeframe manually, it's important to note that lower timeframes provide higher precision at the cost of less chart bar coverage. Higher timeframes provide more historical data, but the volume delta values will be less precise. After timeframe selection, the indicator analyzes the direction of the available intrabars to categorize their volume and calculate the delta on each bar. If the intrabar's opening price is not equal to the closing price: - It considers the intrabar's volume positive and adds the value to the chart bar's total if the closing price exceeds the opening price. - It considers the intrabar's volume negative and subtracts it from the chart bar's total if the closing price is below the opening price. If the intrabar's opening and closing prices are equal: - It considers the intrabar's volume positive and adds the value to the chart bar's total if the closing price exceeds the close of the previous intrabar. - It considers the intrabar's volume negative and subtracts it from the chart bar's total if the closing price is below the previous intrabar's close. - If the closing price equals that of the previous intrabar, the indicator assigns the previous intrabar's positive/negative status to the current intrabar. Inputs Use custom timeframe Determines whether the user manually chooses the lower timeframe. If unchecked (default), the indicator selects the timeframe automatically. Otherwise, it uses the value specified in the "Timeframe" input below. Timeframe Specifies the intrabar timeframe used for volume delta calculation when "Use custom timeframe" is enabled. Higher timeframes provide more historical data at the cost of reduced precision. Lower timeframes cover fewer chart bars but offer higher precision. Previous Previous Volume Next Next Volume Weighted Average Price (VWAP) Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582920578/original/WHV7h-ZozrD0W0jursZ6Tactniv6W0lnkQ.png?1758897787)

**Описание:** This TradingView screenshot displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with a **Volume Delta** indicator configuration dialog open. Here’s a detailed breakdown:  


### 1. **Top Bar (Header)**  
- **Left**:  
  - `AAPL` (ticker), `Apple Inc · 1D · NASDAQ` (symbol/timeframe/exchange).  
  - Price data: `O254.10 H256.60 L253.78 C255.50 -1.37 (-0.53%)` (open, high, low, close, change).  
- **Middle**:  
  - Icons: `+` (add chart), `D` (timeframe toggle), `⚖️` (volume), `📈 Indicators` (dropdown), `88` (chart type), `w` (workspace), `⏰ Alert`, `⏮️ Replay`, navigation arrows, `TradingView` (logo), `M/M/S` (market/minute/second), `⚡` (refresh), `⚙️` (settings), `[]` (full-screen), `📷` (screenshot), `Publish` (share).  
- **Right**: `USD` (currency), `📝` (notes), `⏰` (alerts), `◇` (patterns), `💬` (chat).  


### 2. **Left Sidebar (Tools)**  
Vertical icons for drawing/analysis:  
- `+` (add), `✏️` (draw), `≡` (lines), `⚖️` (volume), `T` (text), `😊` (emoji), `📏` (Fibonacci), `+` (zoom), `🧲` (magnet), `✏️` (edit), `🔒` (lock), `👁️` (visibility), `🌐` (globe), `🗑️` (delete), `⭐` (favorites).  


### 3. **Main Chart Area**  
- **Candlestick Chart**: Green/red candles show price action (green = close > open; red = close < open) over months (May–Feb 2026).  
- **Volume Delta (Subchart)**: Below the main chart, green/red bars represent volume delta (buy vs. sell volume). A blue dot marks a specific data point.  
- **Indicator Label**: `Volume Delta 1` (with eye/lock/settings/trash icons) confirms the active indicator.  


### 4. **Volume Delta Dialog (Modal)**  
Configures the `Volume Delta` indicator:  
- **Tabs**: `Inputs` (active), `Style`, `Visibility`.  
- **Options**:  
  - `Use custom timeframe` (checkbox, unchecked).  
  - `Timeframe`: Dropdown set to `1 minute`.  
  - `INPUT VALUES`: `Inputs in status line` (checked).  
- **Buttons**: `Defaults` (dropdown), `Cancel`, `Ok`.  


### 5. **Bottom Bar**  
- **Timeframe Toggle**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (select chart duration).  
- **Date Range**: `May–Feb 2026` (x-axis labels).  
- **Timestamp**: `10:42:53 UTC-4` (current time).  
- **Additional**: `ADJ` (adjusted data), `Pine Editor`/`Trading Panel` (tabs), `⌄` (expand), `[]` (full-screen).  


### 6. **Right Sidebar (Widgets)**  
Vertical icons for:  
- `📝` (notes), `⏰` (alerts), `◇` (patterns), `💬` (chat), `⚪` (target), `📈` (trend), `📅` (calendar), `⚫` (grid), `📶` (signals), `❓` (help).  


### Purpose  
The chart analyzes Apple’s daily price action, with the `Volume Delta` dialog allowing customization of volume-related metrics (e.g., timeframe, display settings) to assess buying/selling pressure.


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

