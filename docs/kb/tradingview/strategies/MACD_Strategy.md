# MACD Strategy

**URL:** https://www.tradingview.com/support/solutions/43000644943-macd-strategy/

---

- [ Help Center ](/)
- / [ Knowledge base ](/knowledge-base/)
- / Strategies 
- / [ Built-in Strategies ](/support/folders/43000587406-built-in-strategies/)
- / [ MACD Strategy ](/support/solutions/43000644943-macd-strategy/)

# MACD Strategy 

#### Definition
 MACD strategy is based on the Moving Average Convergence/Divergence (MACD) indicator. It enters long whenever MACD Histogram changes from negative to positive, and switches to short if the Histogram changes from positive to negative.

The underlying MACD indicator is described in detail in [its respective Help Center article](https://www.tradingview.com/chart/?solution=43000502344).

#### Inputs
 Fast Length 
The time period of the shorter term EMA. 12 days is the default.
 Slow Length 
The time period of the longer term EMA. 26 days is the default.
 MACD Length 
The time period for the EMA of the MACD Line otherwise known as the Signal Line. 9 Days is the default.
 Previous Previous Keltner Channels Strategy Next Next Momentum Strategy Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43586748759/original/C42Dct8I0LYEBVHBNDKRAyoBPyMKqaVP5A.png?1760699298

**Описание:**

This image shows a **TradingView interface** displaying a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with a **MACD Strategy** configuration window open. Below is a detailed breakdown of the UI elements, their purposes, and the information presented:


### **1. Top Navigation Bar**
- **Left Side**:
  - **Apple Inc. · 1D · NASDAQ**: Ticker symbol, time frame (1D), and exchange.
  - **Price Data**: `O 248.25 H 249.04 L 245.13 C 247.45 -1.89 (-0.76%)`: Open, high, low, close prices, and daily change (red = down).
  - **MACD Strategy 12 26 9**: Label for the active strategy (MACD parameters: Fast=12, Slow=26, Signal=9).
  - **Icons**: Eye (visibility), settings (gear), delete (trash), and more options (three dots).

- **Middle**:
  - **Time Frame Selector**: `D 4h` (dropdown to switch time frames, e.g., 1D, 4H).
  - **Indicators**: Dropdown to add/modify technical indicators.
  - **Alert**: Set price alerts.
  - **Replay**: Replay market movements for backtesting.
  - **Undo/Redo**: Arrows to reverse actions.
  - **TradingView Logo**: Branding, with a dropdown for account/settings.

- **Right Side**:
  - **Currency**: `USD` (dropdown to change base currency).
  - **Icons**: Chart type (candlestick), drawing tools, chat, clock (time), and **Publish** (share chart).


### **2. Main Chart Area**
- **Candlestick Chart**: Shows Apple’s price action from July to November (x-axis: time; y-axis: price, 200–250 USD range).
- **MACD Strategy Markers**: 
  - `MacdSE` (MACD Signal Line) and `MacdLE` (MACD Line) labels with arrows (e.g., `+2`, `-2`) indicating strategy signals (buy/sell).
  - Red/green candles represent price movements (red = down, green = up).


### **3. MACD Strategy Configuration Window (Popup)**
- **Title**: `MACD Strategy` with a close (×) button.
- **Tabs**: 
  - `Inputs` (active): Configure MACD parameters.
  - `Properties`, `Style`, `Visibility`: Customize strategy behavior, appearance, and visibility.
- **Input Fields**:
  - `Fast length`: 12 (short-term EMA for MACD).
  - `Slow length`: 26 (long-term EMA for MACD).
  - `MACD length`: 9 (signal line EMA).
- **Checkbox**: `Inputs in status line` (show parameters on the chart).
- **Buttons**: 
  - `Defaults`: Reset to default values.
  - `Cancel`: Discard changes.
  - `Ok`: Apply changes and close the window.


### **4. Bottom Section: Time Frame & Date Range**
- **Time Frame Tabs**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (switch chart duration).
- **Date Range**: `Dec 12, 1980 — Oct 16, 2025` (dropdown to adjust historical data range).
- **Timestamp**: `14:08:04 UTC+3` (current time) and `ADJ` (adjusted prices).


### **5. Strategy Tester Panel**
- **Tabs**: `Pine Editor` (code editor), `Strategy Tester` (active), `Trading Panel`.
- **Report Tabs**: `Overview` (active), `Performance`, `Trades analysis`, `Risk/performance`.
- **Trade Table**: Lists executed trades with columns:
  - `Trade #`: Trade number (e.g., 852, 851).
  - `Type`: `Short` (red) / `Long` (blue).
  - `Date/Time`: Entry/exit dates.
  - `Signal`: `MacdSE` (strategy signal).
  - `Price`: Entry/exit price.
  - `Position size`: Units traded.
  - `Net P&L`: Profit/loss (green = profit, red = loss).
  - `Run-up`: Peak gain.
  - `Drawdown`: Peak loss.
  - `Cumulative P&L`: Total strategy profit/loss.


### **6. Left Sidebar (Tools)**
- Icons for drawing (pen), lines, Fibonacci, text, smiley, ruler, zoom, Pine Editor, lock, visibility, globe, trash, and star (favorites).


### **7. Right Sidebar (Additional Tools)**
- Icons for chart type, chat, clock, alerts, downloads, calendar, and help (?).


### **Key Purpose**
This interface is used for **technical analysis and backtesting** of the MACD strategy on Apple’s stock. The chart visualizes price action, the popup configures the MACD indicator, and the Strategy Tester evaluates historical performance (trades, P&L, risk metrics). Users can adjust parameters, test strategies, and analyze results to inform trading decisions.

---

