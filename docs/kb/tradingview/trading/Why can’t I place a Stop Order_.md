# Why can’t I place a Stop Order?

**URL:** https://www.tradingview.com/support/solutions/43000647248-why-can-t-i-place-a-stop-order/

---

- [ Help Center ](/) - / - / [ I'd like to have a better understanding of order tickets ](/support/folders/43000549223-i-d-like-to-have-a-better-understanding-of-order-tickets/) - / [ Why can’t I place a Stop Order? ](/support/solutions/43000647248-why-can-t-i-place-a-stop-order/) # Why can’t I place a Stop Order? When opening the Order Panel if you select a Price that is lower than the current Ask Price for the Buy Stop Order or a Price that is higher than the current Bid Price for a Sell Stop Order, you will see a warning “ Order Price is not appropriate for this order type/direction”. The Order Panel prevents you from placing the Stop Order that will get executed right after the placement at the current market price. Note, that the Stop Order does not guarantee it will be executed at the selected price. It gets triggered when the market price hits the Stop one and gets executed at the next market price. How can I avoid this Limitation? The workaround for this limitation is: - Open Settings---&gt;Trading--&gt;tick Instant Order Placement - Settings--&gt;Scales→tick Plus Button - Place the Buy Stop Order higher than the Ask price. - Drag it down on the chart. Previous Previous Why is the price of the order execution different from the Close price on the chart? Next Next Why was my order canceled? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43592807120/original/7GIv_Kz2vP-t1j4ylR-ZzidfxfYgrmRoCQ.png?1763645814)

**Описание:** This TradingView order entry screen for the **NQ1!** (Nasdaq-100 futures) instrument includes the following UI elements:  

### Top Bar  
- **Instrument**: “NQ1!” (top-left, with a chart icon).  
- **Tabs**: “Order” (active, white) and “DOM” (dark gray, for Depth of Market).  
- **Icons**: Grid (multi-chart), three dots (menu), and “X” (close).  


### Price & Order Type Section  
- **Sell/Buy Prices**:  
  - *Sell*: 25,197.00 (left, gray background).  
  - *Buy*: 25,198.25 (right, light blue background, red border).  
  - *Spread*: “1.25” (between Sell/Buy, indicating the price difference).  
- **Order Type Tabs**: “Limit” (gray) and “Stop” (black underline, active).  
- **Error Message**: Black tooltip stating, *“Order price is not appropriate for this order type/direction.”*  


### Order Details  
- **Price Input**: Red-bordered field showing “25186.50” (current order price).  
- **Ask - 47**: Dropdown (right of price) for market data (e.g., ask price minus 47 ticks).  
- **Units**: Field with “2” (number of contracts) and a “+/–” button (adjust quantity).  
- **Risk, % balance**: Dropdown (right of Units) for risk management.  
- **Risk Value**: “0.50” (percentage of account balance at risk).  


### Exits (Take Profit/Stop Loss)  
- **Take Profit**: Unchecked checkbox.  
  - *Price*: “25210.75” (target price).  
  - *Ticks*: “100” (distance from entry in ticks).  
- **Stop Loss**: Unchecked checkbox.  
  - *Price*: “25173.25” (stop price).  
  - *Ticks*: “50” (distance from entry in ticks).  
- **Add Level**: Blue “+ Add level” button (add more exit orders).  


### Time in Force & Submit  
- **Time in Force**: Field (empty, for order duration settings).  
- **Buy Button**: Gray, with text: *“2 NQ1! @ 25,186.50 STP”* (summary of the order: 2 contracts, buy at 25,186.50, Stop order).  


### Purpose  
This screen is for placing a **Stop Buy order** (STP) on NQ1!. The error message suggests the entered price (25,186.50) is invalid for the selected order type/direction. Elements like “Units,” “Risk,” and “Exits” help traders define order size, risk, and profit/loss targets. The “DOM” tab would show real-time order book data.


**Описание:** This TradingView mobile interface displays an **order entry screen for the NQ1! (Nasdaq-100 futures) contract**, focused on configuring a buy order. Here’s a detailed breakdown:  


### 1. **Top Bar & Tabs**  
- **Symbol**: “NQ1!” (top-left, with a chart icon) identifies the trading instrument.  
- **Icons**: Top-right includes a “split screen” icon, a “more options” menu (three dots), and a “close” (X) button.  
- **Tabs**: Two tabs—*“Order”* (active, for order entry) and *“DOM”* (Depth of Market, for order book visualization).  


### 2. **Price & Order Type Section**  
- **Sell/Buy Prices**:  
  - *Sell*: 25,197.00 (left, gray background).  
  - *Buy*: 25,198.25 (right, blue background, highlighted with a red border—current best ask price).  
  - A small “1.25” (spread) sits between them.  
- **Order Type Toggle**: Tabs for *“Limit”* (active, black underline) and *“Stop”* (inactive).  


### 3. **Order Price & Validation**  
- **Price Input**: A red-bordered field shows “25186.50” (entered order price).  
- **Validation Message**: A black tooltip states, *“Order price is not appropriate for this order type/direction”* (alerts the user the price is invalid for the selected order type/direction).  
- **Ask Reference**: A dropdown labeled “Ask - 47” (shows the ask price and ticks from the best ask).  


### 4. **Order Size & Risk**  
- **Units**: A field with “2” (number of contracts) and a “±” button (adjusts units).  
- **Risk, % balance**: A field with “0.50” (risk percentage of account balance, with a dropdown to modify risk settings).  


### 5. **Exits (Take Profit/Stop Loss)**  
- **Section Header**: “Exits” (collapsible, with an upward arrow to expand/collapse).  
- **Take Profit**:  
  - Checkbox (unchecked) to enable.  
  - *Price*: 25210.75 (target price).  
  - *Ticks*: 100 (distance in ticks from the entry price).  
- **Stop Loss**:  
  - Checkbox (unchecked) to enable.  
  - *Price*: 25173.25 (stop price).  
  - *Ticks*: 50 (distance in ticks from the entry price).  
- **Add Level**: A blue “+ Add level” button (adds additional exit targets).  


### 6. **Time in Force**  
- A field (labeled “Time in force”) with “---” (default, no time-in-force rule set—e.g., Day, GTC).  


### 7. **Order Action Button**  
- A gray “Buy” button (bottom) with the summary: *“2 NQ1! @ 25,186.50 STP”* (confirms 2 contracts, price, and order type—“STP” likely means “Stop” or a specific order variant).  


### Purpose & Context  
This screen is for **configuring a buy order** (with invalid price validation, size, risk, and exit targets). The UI guides traders to set price, size, risk, and exit levels before executing the order, with clear visual cues (colors, borders, tooltips) to highlight errors or key data.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43592799430/original/Lm37ron4kjJVQAY55A6TGWUyKPuX4JXxpg.png?1763643826)

**Описание:** This is a **TradingView Settings window** (modal dialog) focused on the **\


**Описание:** This is a **TradingView \


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43592806449/original/ei7fMfQ0tkXDrZteZaZdoqJMP6zIl6AyBQ.png?1763645625)

**Описание:** This is a **TradingView settings panel** (modal window) focused on the **\


**Описание:** The image shows a **TradingView \


