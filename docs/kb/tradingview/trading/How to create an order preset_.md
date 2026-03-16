# How to create an order preset?

**URL:** https://www.tradingview.com/support/solutions/43000742710-how-to-create-an-order-preset/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Trading - / [ Order presets ](/support/folders/43000596699-order-presets/) - / [ How to create an order preset? ](/support/solutions/43000742710-how-to-create-an-order-preset/) # How to create an order preset? 1. Enter the desired parameters in the Order Window - Order type. - Price. For pending orders, specify relative prices (number of ticks from the buy/sell price). - The preset will contain the price for both sides: for the selected side, the price from OT is saved, and for the other side, the same relative price is taken but with the opposite sign, and the reference point (Bid/Ask) is changed. - Brackets. Select one or both brackets, saving relative prices or percentages. - Order validity period. 2. In the Order window, click the “Order presets” button to select “Save Order preset…” 3. In the open window, enter the name of the Order preset and check the selected parameters. 4. Click on the “Save” button. Previous Previous What are order presets? Next Next How many Order presets can I create? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43587997021/original/uEQpvY2bvcOFLXyFnSLo548XvZIORImcbQ.png?1761312925)

**Описание:** This TradingView image displays a **EUR/USD 5-minute candlestick chart** (from OANDA) with an active order panel on the right. Here’s a detailed breakdown:  


### **Top Header**  
- **Symbol/Timeframe**: “Euro/U.S. Dollar · 5 · OANDA” (5-minute timeframe, OANDA broker).  
- **Price Data**: Open (O) 1.16335, High (H) 1.16370, Low (L) 1.16319, Close (C) 1.16325, Change: -0.00009 (-0.01%).  
- **Quick Actions**: Red “SELL” button, white “1K” (position size), blue “1.16333 BUY” button.  
- **Currency Filter**: “USD” dropdown (top-right).  


### **Chart Area**  
- **Candlestick Chart**: Shows price action over time (x-axis: 22:30 to 15:00, y-axis: 1.15400–1.17100).  
- **Order Markers**:  
  - Blue “Buy” label with “1,000 Limit” (pending buy order).  
  - Red “Ask” label with “1.16333” (current ask price).  
  - Blue “Bid” label with “1.16316” (current bid price).  
  - Dashed lines: “Take Profit” (1.16561) and “Stop Loss” (1.16188) levels.  


### **Order Panel (Right Sidebar)**  
- **Order Type Tabs**: “Market” (selected), “Limit”, “Stop”.  
- **Price/Ticks**:  
  - “Price” field: 1.16376 (limit price).  
  - “Ticks” field: “Ask + 43” (price relative to ask).  
- **Units/Risk**:  
  - “Units”: 1000 (position size).  
  - “Risk, % balance”: 0.00 (risk percentage).  
- **Exits (Take Profit/Stop Loss)**:  
  - “Take profit” (checked): Price 1.16561, “Reward, % balance”: 0.00.  
  - “Stop loss” (checked): Price 1.16188, “Risk, % balance”: 0.00.  
- **Time in Force**: “Week” dropdown (order duration).  
- **Action Button**: Blue “Buy” button (executes 1,000 EURUSD @ 1.16376 LMT).  


### **Bottom UI**  
- **Timeframe Selector**: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, “All” (current: 5-minute).  
- **Timestamp**: “09:34:44 UTC-4” (current time).  
- **Tabs**: “Pine Editor”, “Paper Trading”, “Trade” (current: “Trade”).  


### **Additional Elements**  
- **Icons**: Top-right (chart settings, save order preset, close panel, menu).  
- **Status Indicators**: “TV” logo (TradingView), “EURUSD” label, and a “Save order preset…” tooltip.  


This layout enables traders to analyze price action, place orders (market/limit/stop), set profit/loss targets, and manage risk—all within a single interface.


**Описание:** This TradingView image displays a **5-minute EUR/USD chart** (from OANDA) with an active order panel. Here’s a detailed breakdown:  


### **Top Bar & Symbol Info**  
- **Symbol**: “Euro/U.S. Dollar · 5 · OANDA” (5-minute timeframe, OANDA broker).  
- **Price Data**: `O1.16335 H1.16370 L1.16319 C1.16325 -0.00009 (-0.01%)` (Open, High, Low, Close, change).  
- **Quick Actions**: Red “SELL” button, white “1K” (position size), blue “1.16333 BUY” (market buy).  


### **Chart Area**  
- **Candlestick Chart**: Shows price action over time (x-axis: 22:30 to 15:00, y-axis: price levels 1.15400–1.17100).  
- **Order Markers**:  
  - Blue “Buy” label + “1,000 Limit” (pending buy order).  
  - Red “Ask 1.16333” (current ask price).  
  - Blue “Bid 1.16316” (current bid price).  
  - Dashed lines: “1,000 Take Profit” (target) and “1,000 Stop Loss” (risk).  


### **Right-Side Order Panel**  
- **Symbol/Header**: “EURUSD” with “TV” logo, “USD” dropdown (currency), and “Save order preset…” option.  
- **Order Type Tabs**: “Market” (selected), “Limit”, “Stop”.  
- **Price Fields**:  
  - “Price”: `1.16376` (limit price, dropdown: “Ask + 43”).  
  - “Ticks”: `Ask + 43` (price offset).  
- **Units/Risk**:  
  - “Units”: `1000` (position size, +/- adjuster).  
  - “Risk, % balance”: `0.00` (risk calculation).  
- **Exits (Take Profit/Stop Loss)**:  
  - “Take profit”: Checked, price `1.16561`, “Reward, % balance”: `0.00`.  
  - “Stop loss”: Checked, price `1.16188`, “Risk, % balance”: `0.00`.  
- **Time in Force**: “Week” (order duration).  
- **Action Button**: Blue “Buy” (executes 1,000 EURUSD @ 1.16376 LMT).  


### **Bottom Bar**  
- **Timeframe Tabs**: “1D 5D 1M 3M 6M YTD 1Y 5Y All” (select chart period).  
- **Timestamp**: `09:34:44 UTC-4` (current time).  
- **Tools**: “Pine Editor”, “Paper Trading”, “Trade” (mode selection).  


### **UI Elements**  
- **Zoom/Full-Screen**: Icons (top-right) for chart scaling.  
- **Chat/Notes**: Icons (right) for community interaction or notes.  
- **Grid/Settings**: Icons (bottom-right) for chart customization.  


This layout enables traders to analyze price action, place orders (market/limit/stop), and manage risk (take profit/stop loss) in real time.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43587997171/original/5j2eCOMGbjfTyxpro-zizQVdmiDwIra6Bg.png?1761312973)

**Описание:** This TradingView screenshot displays a **EUR/USD 5-minute chart** (OANDA data) with an active order panel and a \


**Описание:** This TradingView image displays a **EUR/USD 5-minute chart** (from OANDA) with an active \


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

