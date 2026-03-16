# Choppiness Index (CHOP)

**URL:** https://www.tradingview.com/support/solutions/43000501980-choppiness-index-chop/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Choppiness Index (CHOP) ](/support/solutions/43000501980-choppiness-index-chop/) # Choppiness Index (CHOP) Definition The [Choppiness Index (CHOP)](https://www.tradingview.com/scripts/choppinessindex/) is an indicator designed to determine if the market is choppy (trading sideways) or not choppy (trading within a trend in either direction). The Choppiness Index is an example of an indicator that is not directional at all. CHOP is not meant to predict future market direction, it is a metric to be used to for defining the market's trendiness only. A basic understanding of the indicator would be; higher values equal more choppiness, while lower values indicate directional trending. History The Choppiness Index was created by Australian commodity trader E.W. Dreiss. Calculation 100 * LOG10( SUM(ATR(1), n) / ( MaxHi(n) - MinLo(n) ) ) / LOG10(n) n = User defined period length. LOG10(n) = base-10 LOG of n ATR(1) = Average True Range (Period of 1) SUM(ATR(1), n) = Sum of the Average True Range over past n bars MaxHi(n) = The highest high over past n bars The basics - As a range-bound oscillator, The Choppiness Index has values that always fall within a certain range. CHOP produces values that operate between 0 and 100. - The closer the value is to 100, the higher the choppiness (sideways movement) levels. - The closer the value is to 0, the stronger the market is trending (directional movement) - Often times, technical analysts will use a threshold on the higher end to indicate the market moving into choppiness territory. Likewise there will be a threshold in the lower zone to indicate trending territory. Common threshold values are popular Fibonacci Retracements. 61.8 for the high threshold and 38.2 for the lower threshold. What to look for Market Condition Confirmation - The first way that technical analysts can use CHOP is to confirm current market conditions. With readings above the upper threshold, continued sideways movement maybe expected. - Readings below the lower threshold may indicate a continuing trend. Upcoming Trendiness Change - The second practical use for CHOP is anticipating changes in the market's trendiness. It is generally believed that extended periods of consolidation (sideways trading) are followed by an extended period of trending (strong, directional movement) and vice versa. Summary The Choppiness Index is an interesting metric which can be useful in identifying ranges or trends. What analysts need to be wary of, is identifying when a range or trend is likely to continue and when it is likely to reverse. The best way to accomplish this would be by combining CHOP with additional charting tools and analysis. For example, using CHOP in conjunction with trend lines and traditional pattern recognition. Inputs Length The time period to be used in calculating CHOP (14 is the Default). Offset Changing this number will move the CHOP either Forwards or Backwards relative to the current market. 0 is the default. Style CHOP Can toggle the visibility of the CHOP as well as the visibility of a price line showing the actual current price of the CHOP. Can also select the CHOP Line's color, line thickness and visual style (Line is the Default). Upper Band Can toggle the visibility of the Upper Band as well as select its value, color, line thickness and line style. Lower Band Can toggle the visibility of the Lower Band as well as select its value, color, line thickness and line style. Background Toggles the visibility of a Background color within the Bands. Can also change the Color itself as well as the opacity. Precision Sets the number of decimal places to be left on the indicator's value before rounding up. The higher this number, the more decimal points will be on the indicator's value. Previous Previous Chop Zone Next Next Commodity Channel Index (CCI) Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582463602/original/UcO1DEdo1pp1GXMDkdQrrxwcb9K1U0T78w.png?1758725703)

**Описание:** This TradingView screenshot displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with a **CHOP (Choppiness Index) indicator configuration window** open. Here’s a detailed breakdown:  


### **Top Bar & Header**  
- **Left**: “AAPL” (ticker), “1D” (timeframe), and “NASDAQ” (exchange).  
- **Price Data**: `O255.22 H255.74 L251.72 C252.03 -2.40 (-0.94%)` (open, high, low, close, change, and percentage change).  
- **Icons**: Zoom (+/-), timeframe toggle, “Indicators” (dropdown), “Alert,” “Replay,” and “TradingView” (dropdown).  
- **Right**: “Publish” button, and icons for charts, alerts, replay, and settings.  


### **Main Chart Area**  
- **Candlestick Chart**: Green/red candles show price action (green = closing > opening; red = closing < opening).  
- **CHOP Indicator**: A blue line (below the main chart) measures market “choppiness” (range-bound vs. trending). The blue shaded area (background) likely represents the CHOP’s range.  


### **CHOP Configuration Window (Modal)**  
A pop-up for adjusting the CHOP indicator:  
- **Tabs**: *Inputs* (active), *Style*, *Visibility*.  
- **Inputs Section**:  
  - `Length`: Set to `14` (period for CHOP calculation).  
  - `Offset`: Set to `0` (shifts the indicator forward/backward).  
  - `Timeframe`: Dropdown (set to “Chart,” meaning it uses the main chart’s timeframe).  
  - Checkbox: *“Wait for timeframe closes”* (ensures calculation only after the period ends).  
  - Checkbox: *“Inputs in status line”* (displays settings in the chart’s status bar).  
- **Buttons**: *Defaults* (reset to default settings), *Cancel*, *Ok* (apply changes).  


### **Left Sidebar (Tools)**  
Icons for drawing (trendlines, shapes), text, Fibonacci tools, and other charting utilities.  


### **Bottom Bar**  
- **Timeframe Selector**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (switch between timeframes).  
- **Date Range**: X-axis labels (e.g., “Sep,” “Oct”) and a calendar icon (customize date range).  
- **Status**: `10:54:24 UTC-4` (timestamp) and “ADJ” (adjusted data).  


### **Bottom Panels**  
- “Pine Editor” (for coding custom indicators) and “Trading Panel” (for order execution) tabs.  


### **Purpose**  
The chart analyzes Apple’s daily price action, while the CHOP window configures the indicator to measure market volatility/trend strength. The UI balances real-time data, technical analysis tools, and customization options for traders.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582463704/original/hEKpxhfNOMBX9wElBUt3X6j6iYKWSXHtTg.png?1758725724)

**Описание:** This TradingView image displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with a **CHOP (Chop Zone) indicator** configuration panel open. Here’s a detailed breakdown:  


### 1. **Top Navigation Bar**  
- **Left**: Zoom controls (magnifying glass +/–), time frame selector (e.g., “D” for daily), and a “+” button (likely for adding indicators).  
- **Middle**: Menu options: *Indicators* (dropdown), *Alert*, *Replay*, and navigation arrows (back/forward).  
- **Right**: *TradingView* logo, time zone selector (M/M/S), refresh, settings, chart style, screenshot, and *Publish* button.  


### 2. **Chart Header**  
- Ticker: *Apple Inc · 1D · NASDAQ*  
- Price data: *O255.22 H255.74 L251.72 C252.02* (open, high, low, close)  
- Change: *–2.42 (–0.95%)* (red, indicating a price drop).  


### 3. **Main Chart (Candlestick)**  
- **Candlesticks**: Green (price up) and red (price down) bars showing daily price action.  
- **Y-axis (Right)**: Price scale (260.00 to 30.00, though the CHOP indicator uses a separate scale below).  


### 4. **CHOP Indicator Panel (Center)**  
A modal window configures the CHOP indicator (measures market “choppiness”):  
- **Tabs**: *Inputs*, *Style* (active), *Visibility*.  
- **Style Settings**:  
  - *CHOP*: Checked (enabled), with a blue line style (solid line + wave icon).  
  - *Upper Band*: Checked, gray dashed line, value `61.8`.  
  - *Middle Band*: Checked, gray dashed line, value `50`.  
  - *Lower Band*: Checked, gray dashed line, value `38.2`.  
  - *Background*: Checked, light blue fill (for the CHOP zone).  
- **Output Values**:  
  - *Precision*: Dropdown (set to “Default”).  
  - *Labels on price scale*: Checked (displays CHOP values on the price axis).  
  - *Values in status line*: Checked (shows CHOP values in the chart’s status bar).  
- **Buttons**: *Defaults* (reset to default), *Cancel*, *Ok* (apply changes).  


### 5. **CHOP Indicator (Below Main Chart)**  
- A blue line (CHOP value) with light blue background (chop zone) spans the chart.  
- X-axis: Dates (late August–early October, e.g., “Sep 4”, “Oct 3”).  
- Y-axis (Right): CHOP scale (65.00 to 30.00, though the background zone is ~40–60).  


### 6. **Left Sidebar (Tools)**  
Icons for drawing (line, trendline), chart types (candle, bar), Fibonacci, text, zoom, and other tools.  


### 7. **Bottom Bar**  
- Time frame selector: *1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All* (with a calendar icon for custom dates).  
- *Pine Editor* (for coding indicators) and *Trading Panel* (for orders) tabs.  


### 8. **Right Sidebar**  
Icons for notes, alerts, patterns, chat, and other features (e.g., chart sharing, settings).  


### Purpose  
The chart analyzes Apple’s daily price action with the CHOP indicator to identify “choppy” (low-trend) market conditions. The configuration panel customizes the indicator’s visual style and output.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

