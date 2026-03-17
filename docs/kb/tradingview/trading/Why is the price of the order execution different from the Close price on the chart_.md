# Why is the price of the order execution different from the Close price on the chart?

**URL:** https://www.tradingview.com/support/solutions/43000647247-why-is-the-price-of-the-order-execution-different-from-the-close-price-on-the-chart/

---

- [ Help Center ](/) - / - / [ Why is the price of the order execution different from the Close… ](/support/solutions/43000647247-why-is-the-price-of-the-order-execution-different-from-the-close-price-on-the-chart/) # Why is the price of the order execution different from the Close price on the chart? The Orders are Executed at the Ask and Bid Prices, which are displayed in the top left corner of the chart while the chart data is built at the middle price of the market’s Buy and Sell. To enable the market price buttons: Open Settings (gear)--&gt;Trading--&gt;tick Show Buy/Sell Buttons Or Open Settings(gear)--&gt; Scales--&gt;tick Bid and Ask Labels to see them on the Scale. Buy Order executes at the Ask Price while Sell Order executes at the Bid Price. The Long Position, on the contrary, closes at the Bid Price and the Short one at the Ask Price. Previous Previous Why was my Limit Order executed right after the placement? Next Next Why can’t I place a Stop Order? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43587782549/original/vLsnAU_fvrd6P9A7_oR0K1Zos7_TqN_0bQ.png?1761226107)

**Описание:** The image shows a **TradingView chart interface** with a **Settings popup** (for \


**Описание:** This TradingView image displays a **Settings modal window** overlaying a trading chart for the **ES 1! (E-mini S&P 500 Futures)** on the CME exchange. Here’s a detailed breakdown:  


### **1. Top Navigation & Chart Header**  
- **Timeframe Tabs**: `1m`, `5m` (selected), and other intervals (e.g., `1D`, `5D`, `1M`) for chart period selection.  
- **Symbol Info**: `ES 1! · E-mini Futures · 5 · CME` (instrument name/exchange).  
- **Order Panel**: Red `SELL` button (25,001.75) and blue `BUY` button (25,002.25) with a dropdown (for order size).  
- **Top Bar**: `TradingView` logo, refresh icon, settings gear, fullscreen, camera, and `Publish` button.  


### **2. Settings Modal (Left Panel)**  
A white modal with a **close (×)** button at the top. The left sidebar lists settings categories:  
- `Symbol`, `Status line`, `Scales and lines`, `Canvas`, `Trading` (selected), `Alerts`, `Events`.  


### **3. Trading Settings (Right Panel)**  
Under the `Trading` category, options are grouped into sections:  

#### **GENERAL**  
- **Buy/sell buttons** (checked, red box): *“Displays buy and sell buttons directly on the chart”* (enables quick order placement on the chart).  
- **One-click trading** (checked): *“Instantly place, edit, cancel orders or close positions without confirmation”*.  
- **Execution sound** (checked): Toggle + volume slider; “Melody” dropdown (set to `Chirpy`).  
- **Show only rejection notifications** (unchecked).  

#### **APPEARANCE**  
- **Positions and orders** (checked): Shows open positions/orders on the chart.  
- **Reverse position button** (checked): *“Adds a reverse button next to open positions on the chart”*.  
- **Profit and loss value** (checked): Displays P&L; “Positions” dropdown (set to `Money`).  


### **4. Chart Area (Background)**  
- **Candlestick Chart**: Red/green candles show price action (time on x-axis: `17`, `12:00`, `23`, `24`; price on y-axis: 24,600–25,350).  
- **Price Levels**: Red horizontal line at `25,054.50`; `Ask` (25,002.25) and `Bid` (25,001.75) boxes on the right.  
- **Time/Status Bar**: Bottom shows `09:25:51 UTC-4`, `RTH` (Regular Trading Hours), `B-ADJ` (price adjustment).  


### **5. Bottom UI**  
- **Timeframe Selector**: `1D`, `5D`, `1M`, `3M`, `6M`, `YTD`, `1Y`, `5Y`, `All` (for chart period).  
- **Template Dropdown**: For saving/loading chart layouts.  
- **Action Buttons**: `Cancel` (close modal) and `Ok` (apply settings).  
- **Tabs**: `Pine Editor`, `Paper Trading`, `Trade` (for strategy editing, simulated trading, live trading).  


### **Purpose**  
The modal configures **trading-specific UI/UX** (e.g., one-click orders, P&L display, sound alerts) to streamline order execution and position management on the chart. The background chart visualizes price trends for the S&P 500 futures, with real-time bid/ask prices and order controls.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43587784869/original/ZSjxgVy4YKC0C77HVzuuBurkxgi4-tfVQw.png?1761226597)

**Описание:** This TradingView image displays a **Settings dialog** overlaying a **5-minute candlestick chart** for the **ES (E-mini S&P 500 Futures)**. Here’s a detailed breakdown:  


### **1. Top Navigation Bar**  
- **Timeframe Tabs**: `1m`, `5m` (selected), `15m`, `1h`, `1D` (for chart period selection).  
- **Icons**:  
  - `Indicators` (dropdown for technical indicators).  
  - `Alert` (price/condition-based notifications).  
  - `Donchian` (likely a template/indicator).  
  - Navigation arrows (previous/next chart).  
- **TradingView Logo** (top-right, with a refresh icon).  
- **Settings Icon** (hexagon, highlighted by an orange arrow—opens this dialog).  
- **Publish Button** (black, for sharing charts).  


### **2. Symbol & Price Box (Top-Left)**  
- **Symbol**: `ES 09-24` (E-mini S&P 500 Futures, Sep 2024 contract).  
- **Exchange**: `CME` (Chicago Mercantile Exchange).  
- **Price**:  
  - `SELL`: Red box, `25,028.75` (bid price).  
  - `BUY`: Blue box, `25,029.25` (ask price).  
- **Dropdown Arrow**: For symbol selection.  


### **3. Settings Dialog (Center)**  
A modal window with:  
- **Title**: `Settings` (top-left).  
- **Close Button**: `X` (top-right).  
- **Left Menu** (settings categories):  
  - `Symbol`, `Status line`, `Scales and lines` (selected, highlighted), `Canvas`, `Trading`, `Alerts`, `Events`.  
- **Right Panel** (current settings for *Scales and lines*):  
  - **Checkboxes**:  
    - `Plus button` (enabled, with a help icon).  
    - `Countdown to bar close` (enabled).  
  - **Dropdowns**:  
    - `Symbol`: `Value, line` (display type).  
    - `Value according to s...` (value calculation).  
    - `Previous day close`: `Hidden` (visibility).  
    - `High and low`: `Hidden` (visibility).  
    - `Bid and ask`: `Value` (selected, highlighted in red—configures bid/ask display).  
  - **Color Pickers**: For `Symbol`, `Previous day close`, `High and low`, `Bid and ask` (blue/red for bid/ask).  
  - **Time Scale Section**:  
    - `Day of week on labels` (enabled).  
    - `Date format`: `Mon 29 Sep '97` (dropdown).  
    - `Time hours format`: `24-hours` (dropdown).  
    - `Save chart left edge position...` (unchecked).  
- **Bottom Buttons**: `Cancel` (white) and `Ok` (black, to apply settings).  


### **4. Chart Area (Background)**  
- **Candlestick Chart**: Green/red candles show price action over time (x-axis: `17`, `12:00`, `23`, `24`; y-axis: price levels `24,600`–`25,350`).  
- **Bid/Ask Labels**:  
  - Green box: `25,031.25` (last traded price, `04:33`).  
  - Red: `Ask 25,029.25` (ask price).  
  - Blue: `Bid 25,028.75` (bid price).  
- **Red Arrows**: Annotate price trends (upward, downward).  


### **5. Bottom Bar**  
- **Timeframe Tabs**: `1D`, `5D`, `1M`, `3M`, `6M`, `YTD`, `1Y`, `5Y`, `All` (chart period).  
- **Template Dropdown**: For saving/loading chart layouts.  
- **Tabs**: `Pine Editor` (code editor), `Paper Trading` (simulated trading), `Trade` (live trading).  
- **Time/Status**: `09:30:27 UTC-4` (current time), `RTH` (regular trading hours), `B-ADJ` (bid-ask adjustment).  


### **6. Right Sidebar**  
- **Icons**: For notes, clock (time), patterns, chat, and a grid (layout).  


### **Purpose**  
The dialog configures **chart display settings** (e.g., bid/ask visibility, time format, line styles) to customize how price data is visualized. The chart itself provides real-time price action for ES futures, with bid/ask prices and trend annotations.


**Описание:** This TradingView image displays a **5-minute candlestick chart** for the **NQ 100 E-mini Futures (CME)** with an open **Settings panel** overlaying the interface. Here’s a detailed breakdown:


### **Top Navigation Bar**  
- **Timeframe**: \


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43587789296/original/Ph4F4BtntleOHIGf-75vTdVUwN00qOYZgA.png?1761227499)

**Описание:** This TradingView chart displays a **candlestick price chart** (green/red bars representing price movements) with key UI elements:  

### 1. Price Boxes (Top-Left)  
- **Red Box**: `46262.19` (likely the *current bid price* or last traded price).  
- **Blue Box**: `46262.20` (likely the *ask price* or buy price).  
- **`0.01`**: The *spread* (difference between ask and bid prices).  


### 2. Order Labels (Right-Side)  
- **Red “Sell Limit” Box**: A pending *sell limit order* (price to sell at or above current market price). The “1” indicates 1 unit/contract. An “X” allows canceling the order.  
- **Blue “Buy Limit” Box**: A pending *buy limit order* (price to buy at or below current market price). The “1” indicates 1 unit/contract. An “X” allows canceling the order.  


### 3. Arrows (Visual Annotations)  
- **Red Arrow**: Curved, pointing from the “Sell Limit” label to the red price box, emphasizing the sell order’s price level.  
- **Blue Arrow**: Curved, pointing from the “Buy Limit” label to the blue price box, emphasizing the buy order’s price level.  


### 4. Chart Context  
The candlesticks show price action (green = upward close, red = downward close). The horizontal lines (red for Sell Limit, blue for Buy Limit) mark the price levels where the pending orders are set.  


### Purpose  
This chart visualizes a trading setup with pending limit orders (buy/sell) at specific price levels, alongside real-time price quotes (bid/ask) and spread. The arrows clarify the relationship between order prices and current market quotes.


**Описание:** This TradingView chart displays a **candlestick price chart** (green/red candles representing price movements) with key UI elements:  

### 1. Price Tickers (Top-Left)  
- **Red Box**: `46262.19` (likely the *bid price* or current sell price).  
- **Blue Box**: `46262.20` (likely the *ask price* or current buy price).  
- **“0.01”**: The *spread* (difference between bid/ask prices).  


### 2. Order Types (Annotated with Arrows)  
- **Blue Arrow + “Buy Limit” Label**: A *buy limit order* (blue horizontal line) set at a lower price. Buy limits execute when the price drops to the specified level (used to enter long positions at a discount).  
- **Red Arrow + “Sell Limit” Label**: A *sell limit order* (red horizontal line) set at a higher price. Sell limits execute when the price rises to the specified level (used to exit long positions or enter short positions at a premium).  
- **“1”**: Quantity of the order (1 unit).  
- **“×”**: Button to *cancel* the respective order.  


### 3. Chart & Grid  
- **Candlestick Chart**: Green candles = price increase (close > open); red candles = price decrease (close < open). Tracks historical price action.  
- **Grid Lines**: Light gray lines for price/time reference, aiding in technical analysis.  


### Purpose  
The chart visualizes price action while highlighting pending *limit orders* (buy/sell) to show planned trade entries/exits. The bid/ask/spread at the top provides real-time pricing context.


