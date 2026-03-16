# Why did one of the levels get canceled?

**URL:** https://www.tradingview.com/support/solutions/43000647245-why-did-one-of-the-levels-get-canceled/

---

- [ Help Center ](/) - / - / Trading - / [ Learn more about levels ](/support/folders/43000581727-learn-more-about-levels/) - / [ Why did one of the levels get canceled? ](/support/solutions/43000647245-why-did-one-of-the-levels-get-canceled/) # Why did one of the levels get canceled? The levels work according to the One-Cancels-Other logic. In case Take Profit triggers -&gt; Position closes -&gt; Stop Loss gets canceled and, vice versa, if the position is closed at the Stop Loss -&gt; Take Profit will be canceled. Previous Previous How are levels displayed in the Trading Panel? Next Next What are order presets? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43592798751/original/XqKd0atox1022utfO5Ktbj880kCz5Bh1pA.png?1763643626)

**Описание:** This is a **TradingView Order History** page displaying three trading orders for the symbol `CME_MINI:ES1!` (E-mini S&P 500 futures). Here’s a detailed breakdown:  


### **Top Navigation Tabs**  
- **Tabs**: `Positions`, `Orders`, `Order History` (active, underlined), `Balance History`, `Trading Journal`.  
- **Sub-filters**: `All 3` (active), `Filled 2`, `Cancelled 1`, `Rejected` (filter orders by status).  


### **Order Table Columns**  
Columns (left to right) with their purposes:  
- **Symbol**: Trading instrument (`CME_MINI:ES1!`).  
- **Side**: Order direction (`Sell`/`Buy`).  
- **Type**: Order type (`Stop`, `Limit`, `Market`).  
- **Qty**: Quantity (all orders = 1).  
- **Limit Price**: Price for limit orders (blank for market/stop orders).  
- **Stop Price**: Trigger price for stop orders (blank for limit/market orders).  
- **Fill Price**: Execution price (blank for cancelled orders).  
- **Status**: Order outcome (`Filled`/`Cancelled`).  
- **Commission**: Fees (not visible here).  
- **Placing Time**: When the order was placed (timestamp).  
- **Closing Time**: When the order closed (timestamp).  
- **Actions**: Three-dot menu (for additional options, e.g., edit/delete).  


### **Individual Orders**  
1. **First Order**:  
   - Type: `Stop` (sell stop order).  
   - Details: `Sell` 1 contract, stop price `6,680.25`, filled at `6,679.50` (status: `Filled`).  
   - Label: `Stop Loss` (red arrow, indicating a stop-loss order).  
   - Times: Placed `2025-11-19 19:28:26`, closed `2025-11-19 19:50:12`.  

2. **Second Order**:  
   - Type: `Limit` (sell limit order).  
   - Details: `Sell` 1 contract, limit price `6,713.25` (status: `Cancelled`).  
   - Label: `Take Profit` (red arrow, indicating a take-profit order).  
   - Times: Placed `2025-11-19 19:28:23`, closed `2025-11-19 19:50:12`.  

3. **Third Order**:  
   - Type: `Market` (buy market order).  
   - Details: `Buy` 1 contract, filled at `6,697.00` (status: `Filled`).  
   - Times: Placed/closed `2025-11-19 19:28:20` (instant execution).  


### **UI Elements & Purpose**  
- **Status Indicators**: `Filled` (green) = executed; `Cancelled` (orange) = not executed.  
- **Labels**: `Stop Loss`/`Take Profit` clarify order intent (risk management).  
- **Timestamps**: Track order lifecycle (placing/closing times).  
- **Filters**: Narrow orders by status (e.g., view only `Filled` orders).  


This page helps traders review past orders, analyze execution details, and assess risk-management strategies (e.g., stop-loss/take-profit usage).


**Описание:** This TradingView image displays the **Order History** tab of a trading platform, showing a detailed log of past orders. Here’s a breakdown of all elements:  


### **Top Navigation Tabs**  
- **Tabs**: `Positions`, `Orders`, `Order History` (active, underlined), `Balance History`, `Trading Journal` — switch between account views.  


### **Order Status Filters**  
- **Filter Buttons**: `All 3` (active, white background), `Filled 2`, `Cancelled 1`, `Rejected` — filter orders by status.  


### **Order Table Columns & Data**  
The table lists 3 orders for the symbol `CME_MINI:ES1!` (S&P 500 E-mini futures), with columns:  

| Column       | Purpose                                                                 | Example Data (Row 1)                          |  
|--------------|-------------------------------------------------------------------------|----------------------------------------------|  
| **Symbol**   | Trading instrument (e.g., futures contract)                               | `CME_MINI:ES1!` (with a red “500” badge)        |  
| **Side**     | Order direction: `Sell` (red) or `Buy` (blue)                             | `Sell`                                        |  
| **Type**     | Order type: `Stop`, `Limit`, `Market`                                     | `Stop`                                        |  
| **Qty**      | Quantity of contracts (here, 1)                                          | `1`                                           |  
| **Limit Price** | Price for limit orders (empty for market/stop orders)                     | `6,680.25`                                    |  
| **Stop Price** | Trigger price for stop orders (empty for limit/market orders)              | `6,680.25`                                    |  
| **Fill Price** | Price at which the order executed (empty for cancelled orders)             | `6,679.50`                                    |  
| **Status**   | Order outcome: `Filled` (green), `Cancelled` (orange)                     | `Filled`                                      |  
| **Commission** | Fee for the order (here, labeled “Stop Loss”/“Take Profit” for context)    | `Stop Loss` (red arrow)                        |  
| **Placing Time** | Time the order was placed (with down arrow for sorting)                  | `2025-11-19 19:28:26`                          |  
| **Closing Time** | Time the order closed (filled/cancelled)                                | `2025-11-19 19:50:12`                          |  
| **Actions**  | Three vertical dots (menu for additional options, e.g., edit/delete)       | `⋮` (rightmost column)                         |  


### **Order Details (Row-by-Row)**  
1. **First Order**:  
   - `Sell` stop order, `Qty 1`, `Stop Price 6,680.25`, `Fill Price 6,679.50`, `Status Filled`.  
   - Labeled “Stop Loss” (red arrow) — a protective order to limit losses.  

2. **Second Order**:  
   - `Sell` limit order, `Qty 1`, `Limit Price 6,713.25`, `Status Cancelled`.  
   - Labeled “Take Profit” (red arrow) — a target order to lock in gains (cancelled here).  

3. **Third Order**:  
   - `Buy` market order, `Qty 1`, `Fill Price 6,697.00`, `Status Filled`.  
   - Executed immediately at market price.  


### **Key UI Elements**  
- **Badges**: Red “500” next to each symbol (likely a portfolio/account identifier).  
- **Colors**: Red for `Sell`/loss orders, blue for `Buy`, green for `Filled`, orange for `Cancelled` — visual cues for order direction/status.  
- **Sorting**: Down arrow next to `Placing Time` (click to sort orders by placement time).  


This view helps traders review past trades, analyze execution prices, and track order outcomes (filled, cancelled) for performance or strategy refinement.


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

