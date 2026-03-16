# Why do Spread Charts have different Daily and Intraday calculations?

**URL:** https://www.tradingview.com/support/solutions/43000690935-why-do-spread-charts-have-different-daily-and-intraday-calculations/

---

- [ Help Center ](/) - / - / [ Why do Spread Charts have different Daily and Intraday calculatio… ](/support/solutions/43000690935-why-do-spread-charts-have-different-daily-and-intraday-calculations/) # Why do Spread Charts have different Daily and Intraday calculations? Intraday OHLC and daily OHLC of spread charts are calculated separately. Now, imagine that we have 2 charts. Let's pretend that the first chart consists of only two intraday candles: candle A and candle B. Say, the high value of candle A is 2, of candle B is 3. The daily high of that chart will show the high of 3. Then let's imagine the second chart of the spread. By a happy coincidence, we also have only two intraday candles here: candles Y and Z. The high of the Y is 5, Z's high is 4. The daily high quite predictably gives us the high of 5. Here comes the tricky part, though. To create the spread candle we need to multiply those respective candles by each other and that yields us the following: A×Y = 10, B×Z = 12, which would make you believe that the daily should be 12. But no! The daily would be 5×3 = 15, because you multiply the previously acquired daily values separately. Let's have a look at some examples. Here's a spread BXP-BA. We take the close values of each 1-min candle and calculate the difference as follows: Here's another example, in this case we multiply two candles: The symbols from the formula can have a low/high value at different periods of time, but the formula uses the respective candles (e.g., 12:00 candle and 12:00 candle), hence the difference between intraday and daily values. This is an expected behavior. Here's an initial [article on spread charts](https://www.tradingview.com/support/solutions/43000502298-spread-charts/) which can be also useful to you. Previous Previous What does the One Step Back Building option mean? Next Next Why do Renko, Line Break, Kagi and PnF chart types not work on tick-based intervals? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43381821107/original/K1kd7Kvtpl97FF2kw5nvBDO8HioDv41xSg.png?1672228708)

**Описание:** This TradingView chart displays a **multi-panel layout** with three candlestick charts (Boston Properties Inc., Boeing Co., and a BXP-BA pair) alongside a calculator overlay. Here’s a detailed breakdown:  


### **Top Navigation Bar**  
- **Timeframe**: “1m” (1-minute) dropdown (left) to select chart resolution.  
- **Tools**: Icons for *Compare* (add symbols), *Indicators* (add technical indicators), *Financials* (fundamental data), *Templates* (save/load chart setups), *Alert* (price notifications), *Replay* (backtest price action), and navigation arrows (undo/redo).  
- **Display Options**: *SWB* (Switch Between Charts), *Settings* (gear icon), *Screenshot* (camera), *Publish* (share chart), and a blue “USD” button (currency).  


### **Chart Panels**  
1. **Top Panel (Boston Properties Inc. - BXP)**  
   - **Symbol/Header**: “BOSTON PROPERTIES INC - 1 - NYSE” with real-time data: `O87.52 H87.59 L87.48 C87.57 +0.05 (+0.06%)` (Open, High, Low, Close, change).  
   - **Candlestick Chart**: Red/green candles show price action (red = down, green = up) over 1-minute intervals (x-axis: 19:35–19:57, 08 Jul 20).  
   - **Volume**: Hidden (no volume bar below this panel).  

2. **Middle Panel (Boeing Co. - BA)**  
   - **Symbol/Header**: “BOEING CO - 1 - NYSE” with data: `O179.72 H179.86 L179.67 C179.78 +0.07 (+0.04%)`.  
   - **Candlestick Chart**: Similar red/green candles.  
   - **Volume**: Light blue/pink bars (buy/sell volume) below the candles.  

3. **Bottom Panel (BXP-BA Pair)**  
   - **Symbol/Header**: “BXP-BA - 1 - NYSE” with data: `O-92.20 H-92.19 L-92.27 C-92.21 -0.02 (-0.02%)` (spread between BXP and BA).  
   - **Candlestick Chart**: Red/green candles for the pair’s price.  
   - **Volume**: Light blue/pink bars (pair’s volume) below the candles.  
   - **Highlighted Section**: A red box emphasizes a specific candlestick pattern (e.g., a reversal or trend).  


### **Calculator Overlay**  
- **Title/Mode**: “Calculator” with “Standard” (basic math) and a gear icon (settings).  
- **Calculation**: `87.57 - 179.78 = -92.21` (likely computing the BXP-BA spread, linking to the bottom panel).  
- **Buttons**: Numeric keys (0–9), operators (+, -, ×, ÷), and functions (% , CE, C, √x, x², 1/x).  


### **Additional UI Elements**  
- **Time Axis**: X-axis shows timestamps (19:35–19:57, 08 Jul 20) and a “9” (possibly a session marker).  
- **Price Axis**: Y-axis displays prices (e.g., 87.50–87.90 for BXP, 179.50–180.50 for BA, -92.40–-91.60 for BXP-BA).  
- **Status Bar**: Bottom-left shows “1D 5D 1M 3M 6M YTD 1Y 5Y All” (timeframe presets) and “11:27:43 (UTC)” (current time). Bottom-right has “adj ext % log auto” (adjustments, extensions, scaling).  


### **Purpose**  
The layout is designed for **pair trading** (comparing BXP and BA) or spread analysis, with the calculator verifying the BXP-BA price difference. The multi-panel view enables quick comparison of individual stocks and their relative performance.


**Описание:** This TradingView screenshot displays a **multi-chart layout** analyzing three NYSE securities (Boston Properties Inc, Boeing Co, and a BXP-BA pair) with a calculator overlay. Here’s a detailed breakdown:  


### **Top Navigation Bar**  
- **Left**: Timeframe selector (`1m`), `Compare` (for relative performance), `Indicators` (technical analysis tools), `Financials` (company data), `Templates` (saved chart setups), `Alert` (price notifications), `Replay` (backtest mode), and navigation arrows.  
- **Right**: Chart type toggle (bars/candles), `SWB` (switch board), settings gear, screenshot icon, `Publish` (share chart), and a blue play button (likely for replay).  


### **Main Charts (3 Panels)**  
1. **Top Chart**: *Boston Properties Inc (BXP)*  
   - Candlestick chart (red/green bars) showing price action.  
   - Ticker: `BOSTON PROPERTIES INC - 1 - NYSE` with real-time data: `O87.52 H87.59 L87.48 C87.57 +0.05 (+0.06%)`.  
   - X-axis: Timestamps (e.g., `19:35`–`19:57`, `08 Jul 20`).  
   - Y-axis: Price (USD, range ~87.50–87.90).  

2. **Middle Chart**: *Boeing Co (BA)*  
   - Candlestick chart with volume bars (teal/pink) below.  
   - Ticker: `BOEING CO - 1 - NYSE` with data: `O179.72 H179.86 L179.67 C179.78 +0.07 (+0.04%)`.  
   - Volume: `67.195K` (teal = up, pink = down).  
   - Y-axis: Price (USD, range ~179.50–180.50).  

3. **Bottom Chart**: *BXP-BA Pair (BXP-BA - 1)*  
   - Candlestick chart with volume bars.  
   - Ticker: `BXP-BA - 1 - NYSE` with data: `O-92.20 H-92.19 L-92.27 C-92.21 -0.02 (-0.02%)`.  
   - Volume: `76.455K`.  
   - Y-axis: Price (USD, range ~-92.40–-91.60).  


### **Calculator Overlay**  
A pop-up calculator (`Standard` mode) is open, showing:  
- Calculation: `87.57 - 179.78 = -92.21` (matches the BXP-BA pair’s price, likely a spread calculation).  
- Buttons: Numeric keys (`0`–`9`), operators (`+`, `-`, `×`, `÷`), functions (`%`, `CE`, `C`, `√x`, `x²`, `1/x`), and memory controls (`MR`, `M+`, `M-`, `MS`).  


### **Annotations & UI Details**  
- **Red Arrows**: Connect the BXP price (`87.57`), BA price (`179.78`), and BXP-BA spread (`-92.21`) to the calculator, illustrating the spread calculation.  
- **Red Boxes**: Highlight the BXP-BA chart (bottom) and its data.  
- **Timezone**: `11:27:43 (UTC)` at the bottom right.  
- **Bottom Toolbar**: Timeframe buttons (`1D`, `5D`, `1M`, etc.), `adj` (adjusted close), `ext` (extended hours), and `auto` (auto-scale).  


### **Purpose**  
The layout analyzes price relationships (e.g., spread between BXP and BA) using candlestick charts, volume, and a calculator for quick arithmetic—common in pair trading or relative value analysis.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43381821158/original/3S8sY_ISpScmF8Xm2h1gcV1YyM8Wum-YIA.png?1672228733)

**Описание:** This TradingView chart page displays three synchronized candlestick charts (Boston Properties Inc, Boeing Co, and their product BXP*BA) with a calculator overlay. Here’s a detailed breakdown:  


### **Top Navigation Bar**  
- **Timeframe Selector**: Dropdown (currently “1m”) to adjust chart period (1 minute, 1 hour, 1 day, etc.).  
- **Tools**: Icons for *Compare* (overlay other symbols), *Indicators* (add technical indicators), *Financials* (view company data), *Templates* (save/load chart setups), *Alert* (price/volume alerts), *Replay* (simulate market history), and navigation arrows (previous/next chart).  
- **Right Icons**: *SWB* (switch between chart types), *Settings* (customize chart), *Full-Screen* (expand chart), *Camera* (screenshot), *Publish* (share chart), and *Play* (replay mode).  


### **Main Charts**  
Three stacked candlestick charts (top to bottom):  
1. **Boston Properties Inc (BXP)**:  
   - Ticker: `BOSTON PROPERTIES INC - 1 - NYSE`  
   - Price: `O87.52 H87.59 L87.48 C87.57 +0.05 (+0.06%)` (open, high, low, close, change).  
   - Candlesticks: Red (price drop) / green (price rise) bars with wicks (high/low ranges).  
   - Timestamps: `19:35–19:57` (x-axis).  

2. **Boeing Co (BA)**:  
   - Ticker: `BOEING CO - 1 - NYSE`  
   - Price: `O179.72 H179.86 L179.67 C179.78 +0.07 (+0.04%)`.  
   - Volume bars (pink/green) below candlesticks.  

3. **BXP*BA (Product)**:  
   - Ticker: `BXP*BA - 1 - NYSE`  
   - Price: `O15729.09 H15753.91 L15717.53 C15743.33 +14.88 (+0.09%)`.  
   - Volume bars below candlesticks.  


### **Calculator Overlay**  
A pop-up calculator (right) with:  
- **Header**: “Calculator” + minimize/maximize/close buttons.  
- **Mode**: “Standard” (basic arithmetic) with a “∏” (pi) button.  
- **Display**: Shows `87.57 × 179.78 = 15,743.3346` (multiplying BXP’s close by BA’s close).  
- **Buttons**:  
  - Memory: `MC` (clear), `MR` (recall), `M+` (add), `M-` (subtract), `MS` (store).  
  - Functions: `%`, `CE` (clear entry), `C` (clear), `⌫` (backspace), `√x` (square root), `x²` (square), `1/x` (reciprocal), `÷`, `×`, `-`, `+`.  
  - Numbers: `7–0`, `.` (decimal), `+/-` (sign), `=` (equals).  


### **Bottom Bar**  
- **Timeframes**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (switch chart periods).  
- **Timestamp**: `11:29:00 (UTC)` (current time).  
- **Right Icons**: `adj` (adjusted close), `ext` (extended hours), `%` (percentage), `log` (log scale), `auto` (auto-scale), and full-screen.  


### **Purpose**  
The page analyzes price action for BXP, BA, and their product (BXP*BA) over a 1-minute timeframe. The calculator demonstrates a custom calculation (e.g., portfolio value or derived metric) using closing prices.


**Описание:** This TradingView chart page displays three candlestick charts for **Boston Properties Inc (BXP)**, **Boeing Co (BA)**, and their **combined symbol (BXP*BA)**, with a calculator overlay. Here’s a detailed breakdown:  


### 1. **Top Navigation Bar**  
- **Timeframe Selector**: “1m” (1-minute) dropdown (left) to adjust chart timeframes.  
- **Tools**: Buttons for *Compare* (compare symbols), *Indicators* (add technical indicators), *Financials* (view company financials), *Templates* (save/load chart layouts), *Alert* (set price alerts), *Replay* (replay market activity), and navigation arrows (undo/redo).  
- **Right Side**: *SWB* (switch board), *Settings* (gear icon), *Full-Screen* (expand), *Camera* (screenshot), *Publish* (share chart), and *Play* (replay) buttons.  


### 2. **Chart Sections**  
Three candlestick charts (top to bottom):  

#### **Top Chart: Boston Properties Inc (BXP)**  
- **Symbol/Header**: “BOSTON PROPERTIES INC - 1 - NYSE” with real-time data: *O87.52, H87.59, L87.48, C87.57, +0.05 (+0.06%)* (open, high, low, close, change).  
- **Candlesticks**: Red (price drop) and green (price rise) bars showing price action over time (x-axis: timestamps like 19:35–19:57).  
- **Volume**: Bar graph below (teal = buying, red = selling) showing trading volume.  

#### **Middle Chart: Boeing Co (BA)**  
- **Symbol/Header**: “BOEING CO - 1 - NYSE” with data: *O179.72, H179.86, L179.67, C179.78, +0.07 (+0.04%)*.  
- **Candlesticks/Volume**: Similar structure to BXP, with volume bars (teal/red) below.  

#### **Bottom Chart: Combined Symbol (BXP*BA)**  
- **Symbol/Header**: “BXP*BA - 1 - NYSE” with data: *O15729.09, H15753.91, L15717.53, C15743.33, +14.88 (+0.09%)*.  
- **Candlesticks/Volume**: Tracks the combined value of BXP and BA, with volume bars below.  


### 3. **Calculator Overlay**  
A pop-up calculator (right) is open, showing:  
- **Title**: “Calculator” with *Standard* mode (dropdown for scientific mode).  
- **Calculation**: `87.57 × 179.78 = 15,743.3346` (multiplying BXP’s close price by BA’s close price, likely for combined value).  
- **Buttons**: Numeric keys (0–9), operators (+, -, ×, ÷), memory functions (MC, MR, M+, M-, MS, M⁻), and utility keys (% , CE, C, 1/x, x², √x).  


### 4. **Bottom Bar**  
- **Timeframe Tabs**: “1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All” to switch chart periods.  
- **Status**: “11:29:00 (UTC)” (current time) and toggles for *adj* (adjusted close), *ext* (extended hours), *%* (percentage), *log* (log scale), *auto* (auto-scale).  


### Purpose  
The page analyzes BXP, BA, and their combined performance (via BXP*BA) using candlestick charts (price action) and volume. The calculator likely computes the combined value of the two stocks.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43381821246/original/KZUIvfwVKKLg5XjB7j2RNt650bJWjL-ynQ.png?1672228764)

**Описание:** This image is a **TradingView-style intraday trading table** illustrating a custom \


**Описание:** This TradingView image is a **grid-based visualization** for analyzing intraday lows across two charts and their spread, with a focus on calculating a \


