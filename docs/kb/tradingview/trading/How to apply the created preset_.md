# How to apply the created preset?

**URL:** https://www.tradingview.com/support/solutions/43000742712-how-to-apply-the-created-preset/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Trading - / [ Order presets ](/support/folders/43000596699-order-presets/) - / [ How to apply the created preset? ](/support/solutions/43000742712-how-to-apply-the-created-preset/) # How to apply the created preset? 1. After saving the preset, it appears in the preset menu in the Order window. You can easily apply the desired preset by selecting it from the list. If any parameter is not suitable for the instrument on the chart, a window will open with information about the inapplicable parameters. 2. If you have a saved preset, the preset menu button will appear next to your chart's Buy/Sell buttons. After selecting a preset, it will be highlighted in color in the menu, and its name and tooltips with its parameters will be displayed on the buttons. 3. If the preset is applied in the Buy/Sell buttons, then using the hotkeys Shift+B and Shift+S in the Placing orders without confirmation mode, orders are placed with the applied Order preset. 4. If the preset is applied in the Buy/Sell buttons in the Placing orders with confirmation mode, when you click on the button, the Order Window will open with the applied Order preset. However, the Order preset is not applied when opening it from the Trade button. Previous Previous How many Order presets can I create? Next Next How to edit a created preset? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43588013971/original/LNJMpoIqdZ18Qy5wPtGf8xILEQKzcM9sSQ.png?1761317040)

**Описание:** This TradingView image displays a **5-minute (5) EUR/USD chart** from OANDA, focused on the **order entry interface** for a buy trade. Here’s a detailed breakdown:  


### **Top Bar & Chart Header**  
- **Symbol/Timeframe**: “Euro/U.S. Dollar · 5 · OANDA” (5-minute timeframe).  
- **Market Data**: Open (O: 1.16276), High (H: 1.16286), Low (L: 1.16260), Close (C: 1.16277), +0.00002 (+0.00% change).  
- **Quick Actions**: Red “SELL” button, white “1K” (position size), blue “1.16286 BUY” (current ask price), and a dropdown arrow (for order type selection).  


### **Chart Area**  
- **Candlestick Chart**: Displays price action with green (up) and red (down) candles.  
- **Order Markers**:  
  - Blue “Buy” label + “1,000” (order size) + “Limit” (order type) + “X” (cancel) at ~1.16361.  
  - Yellow “1,000” + “Stop Loss” + “X” at ~1.16173 (stop-loss level).  
- **Price Levels**:  
  - “Ask” (red): 1.16286 (current ask price).  
  - “Mid” (green): 1.16277 (mid-price).  
  - “Bid” (blue): 1.16270 (current bid price).  


### **Right-Side Order Panel**  
- **Symbol/Header**: “EURUSD” with a TV logo, “Save order preset...” (dropdown), and “ORDER PRESETS” (e.g., “New order preset,” “Limit order”).  
- **Price Section**:  
  - “Sell” (1.1627) vs. “Buy” (1.16286) buttons.  
  - “Price” field: 1.16361 (limit order price) + “Ask + 75” (price offset, e.g., 75 pips above ask).  
- **Units & Risk**:  
  - “Units”: 1000 (position size) + “Risk, % balance” dropdown.  
  - “0.00” (risk percentage, likely auto-calculated).  
- **Exits (Take Profit/Stop Loss)**:  
  - “Take profit” (checked): Price = 1.16546, Pips = 18.5 (18.5 pips above entry).  
  - “Stop loss” (checked): Price = 1.16173, Pips = 18.8 (18.8 pips below entry).  
- **Time in Force**: “Week” (order duration).  
- **Confirm Button**: Blue “Buy” button (1,000 EURUSD @ 1.16361 LMT) to execute the order.  


### **Bottom Bar**  
- **Timeframe Tabs**: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, “All” (chart period selection).  
- **Time Zone**: “10:43:32 UTC-4” (current time).  
- **Tools**: “Pine Editor” (script editor), “Paper Trading” (simulated trading), “Trade” (real trading) tabs.  


### **UI Elements & Purpose**  
- **Buttons**: “SELL” (initiate sell order), “Buy” (confirm buy order), “X” (cancel order).  
- **Dropdowns**: Order type (Limit), price offset (Ask + 75), time in force (Week), risk calculation (Risk, % balance).  
- **Checkboxes**: Enable/disable take profit/stop loss.  
- **Inputs**: Price, units, pips (for exits), and order presets (save/reuse order configurations).  


This interface is designed for **placing a limit buy order** with predefined take profit/stop loss levels, showing real-time market data, order parameters, and execution controls.


**Описание:** This TradingView image displays a **5-minute (5) EUR/USD** chart from OANDA, focused on **order entry** for a buy trade. Here’s a detailed breakdown:  


### 1. **Top Bar & Chart Header**  
- **Symbol/Timeframe**: “Euro / U.S. Dollar · 5 · OANDA” (5-minute chart for EUR/USD).  
- **Market Data**: Real-time price: `O1.16276 H1.16286 L1.16260 C1.16277 +0.00002 (+0.00%)` (Open, High, Low, Close, change).  
- **Order Buttons**: Red “SELL” and blue “BUY” buttons (quick trade execution), plus a “1K” (1,000 units) button and a dropdown (for order size).  


### 2. **Chart Area**  
- **Candlestick Chart**: Displays price action over time (x-axis: 08:00–23:00, y-axis: price levels 1.16050–1.16500).  
- **Order Markers**:  
  - Blue “Buy” marker at `1.16361` (proposed buy price).  
  - Yellow “Stop Loss” marker at `1.16173` (proposed stop-loss price).  
  - Green “Take Profit” marker (not visible, but implied by order panel).  
- **Bid/Ask/Last**: At the right, `Ask 1.16286` (red), `Last 1.16277` (green), `Bid 1.16270` (blue) show real-time market depth.  


### 3. **Right-Side Order Panel**  
- **Symbol/Header**: “EURUSD” with a “TV” logo (TradingView), and a “Save order preset…” dropdown (for reusing order settings).  
- **Order Presets**: “New order preset” (custom settings: *Sell Bid -75, Buy Ask +75, TP 18.5, SL 18.8, Week*).  
- **Price**:  
  - Buy price: `1.16361` (dropdown: “Ask +75” to adjust relative to ask price).  
- **Units**: `1000` (trade size), with “Risk, % balance” (risk management toggle).  
- **Exits (Take Profit/Stop Loss)**:  
  - *Take Profit*: Checked, price `1.16546` (18.5 pips from entry).  
  - *Stop Loss*: Checked, price `1.16173` (18.8 pips from entry).  
- **Time in Force**: “Week” (order duration).  
- **Action Button**: Blue “Buy” button (executes 1,000 EURUSD at 1.16361 LMT).  


### 4. **Bottom Bar**  
- **Timeframes**: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All (chart period selection).  
- **Timezone**: `10:43:32 UTC-4` (current time).  
- **Tabs**: “Pine Editor” (for scripts), “Paper Trading” (simulated trading), “Trade” (live trading, active).  


### 5. **UI Elements (Right Edge)**  
- Icons: Expand chart, menu, close panel, and other tools (e.g., alerts, chat, settings).  


### Purpose  
This interface is for **placing a limit buy order** on EUR/USD, with predefined take profit/stop loss levels, order size, and duration. The chart visualizes price action to inform the trade, while the panel configures order specifics (price, risk, exits).


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43588014305/original/T7AZKZ2yL0VbRGhE_SG5c_qDcNjP5h4tCg.png?1761317109)

**Описание:** This TradingView chart displays the **Euro/U.S. Dollar (EUR/USD)** 5-minute (5) timeframe from **OANDA**, with the following key elements:  


### **Top Bar (Symbol & Market Data)**  
- **Symbol/Timeframe**: \


**Описание:** This TradingView chart displays the **Euro/U.S. Dollar (EUR/USD)** currency pair on a **5-minute (5)** timeframe from **OANDA**. Here’s a detailed breakdown of all elements:  


### **Top Bar (Symbol & Market Data)**  
- **Symbol**: `Euro/U.S. Dollar · 5 · OANDA` (currency pair, timeframe, broker).  
- **Market Data**: `O 1.16276 H 1.16288 L 1.16260 C 1.16274 −0.00001 (−0.00%)` (Open, High, Low, Close, Change, % Change).  
- **Currency Selector**: `USD` dropdown (top-right) for base/currency settings.  


### **Order Panel (Left)**  
- **Buttons**:  
  - `SELL` (red) / `BUY` (blue, 1.16282) for market orders.  
  - `1K` (position size) / `^` (expand/collapse order panel).  
- **Order Presets Dropdown**:  
  - `ORDER PRESETS` header.  
  - `New order preset` (create custom preset).  
  - `Limit order` (preset type).  
  - `Sell Bid - 75, Buy Ask + 75` (preset parameters).  
  - `TP 18.5, SL 18.8` (Take Profit/Stop Loss values).  
  - `Week` (timeframe for preset).  
  - `Reset order preset` (clear custom settings).  


### **Chart Area**  
- **Candlestick Chart**: Green/red candles show price action (green = close > open; red = close < open).  
- **Price Scale (Right)**: Y-axis with values (1.16000–1.16500) for price levels.  
- **Bid/Ask Box (Right)**:  
  - `Ask 1.16282` (red, sell price).  
  - `1.16274` (current close).  
  - `Bid 1.16266` (blue, buy price).  


### **Time Axis (Bottom)**  
- **Timeline**: Hours (24, 01:00–23:00) and dates (26, 27) for the 5-minute timeframe.  
- **Timezone**: `10:45:00 UTC-4` (current time).  


### **Timeframe Selector (Bottom-Left)**  
Buttons for period selection: `1D` (1 day), `5D` (5 days), `1M` (1 month), `3M`, `6M`, `YTD` (year-to-date), `1Y`, `5Y`, `All`.  


### **Bottom Bar**  
- **Tools**: `Pine Editor` (script editor), `Paper Trading` (simulated trading), `Trade` (live trading).  
- **Icons (Right)**: Expand/collapse, help, and other UI controls.  


### **Right Sidebar (Icons)**  
Vertical icons for:  
- Chart settings, time, symbols, chat, grid, connectivity, and help.  


This layout provides real-time price data, order execution tools, and customization for technical analysis and trading.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43588014582/original/zK9zbTCiaTHFOATsmyR9I3NYeAEsUs9h6g.png?1761317171)

**Описание:** This TradingView image displays a **5-minute candlestick chart** for the **Euro/U.S. Dollar (EUR/USD)** currency pair, sourced from **OANDA**. Here’s a detailed breakdown of all elements:  


### **Top Header & Symbol Info**  
- **Symbol & Timeframe**: “Euro/U.S. Dollar · 5 · OANDA” (5 = 5-minute timeframe).  
- **Price Data**: “O1.16274 H1.16279 L1.16266 C1.16274 0.00000 (0.00%)” (Open, High, Low, Close, Change, % Change).  
- **Currency Selector**: “USD” dropdown (top-right) for currency display.  


### **Order & Trade Buttons (Top-Left)**  
- **Red Button**: “SELL 1.16274 1.5” (Sell order at 1.16274, with a quantity/size of 1.5).  
- **Blue Button**: “1.16282 NEW ORDER PR…” (New order preset, likely a Buy order at 1.16282).  
- **Dropdown Arrow**: Expands the “ORDER PRESETS” menu (see below).  


### **Order Presets Menu (Center-Top)**  
A dark gray dropdown with:  
- **Header**: “ORDER PRESETS”.  
- **Options**:  
  - “New order preset” (create a custom preset).  
  - “Limit order” (place a limit order).  
  - “Sell Bid - 75, Buy Ask + 75” (preset for selling at bid -75 pips, buying at ask +75 pips).  
  - “TP 18.5, SL 18.8” (Take Profit 18.5, Stop Loss 18.8—likely in pips).  
  - “Week” (timeframe preset).  
- **“Reset order preset”**: Resets the selected preset.  


### **Chart Area**  
- **Candlestick Chart**: Green/red candles show price action over 5-minute intervals (x-axis: time from 24:00 to 27:00; y-axis: price from 1.16000 to 1.16500).  
- **Bid/Ask Box (Right)**:  
  - Red “Ask”: 1.16282 (current ask price).  
  - Green “1.16274 04:06”: Mid-price or last traded price, with timestamp.  
  - Blue “Bid”: 1.16267 (current bid price).  


### **Chart Controls (Bottom)**  
- **Timeframe Tabs**: “1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All” (switch chart timeframes).  
- **Expand/Full-Screen Icons**: Toggle chart size.  
- **Timestamp**: “10:45:53 UTC-4” (current time).  


### **Bottom Tabs (Left)**  
- “Pine Editor” (script editor for custom indicators).  
- “Paper Trading” (simulated trading mode, active).  
- “Trade” (live trading mode).  


### **Right-Side Icons (Vertical Toolbar)**  
- **Menu/Notes**: Document icon (notes/charts).  
- **Time**: Clock icon (time settings).  
- **Symbols**: Diamond icon (symbol list).  
- **Chat**: Speech bubble (community/chat).  
- **Grid/Settings**: Grid icon (chart settings).  
- **Help**: Question mark (support).  


### **Key Purposes**  
- **Chart**: Visualize price trends (candles = open/high/low/close for 5-minute intervals).  
- **Order Buttons/Presets**: Execute trades (sell/buy) or use preconfigured order settings (limit orders, TP/SL).  
- **Bid/Ask Box**: Real-time price quotes for execution.  
- **Timeframe Tabs**: Analyze price action over different periods (1 day, 1 month, etc.).  
- **Bottom Tabs**: Switch between script editing, paper trading, and live trading.  


This layout is designed for **forex trading**, combining real-time price data, order execution, and chart analysis tools.


**Описание:** This TradingView chart displays the **Euro/U.S. Dollar (EUR/USD)** currency pair on a **5-minute (5)** timeframe, sourced from **OANDA**. Here’s a detailed breakdown of the UI elements:  


### **Top Bar (Symbol & Market Data)**  
- **Symbol/Timeframe**: *\


