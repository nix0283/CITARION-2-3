# How are levels displayed in the Trading Panel?

**URL:** https://www.tradingview.com/support/solutions/43000647244-how-are-levels-displayed-in-the-trading-panel/

---

- [ Help Center ](/) - / - / Trading - / [ Learn more about levels ](/support/folders/43000581727-learn-more-about-levels/) - / [ How are levels displayed in the Trading Panel? ](/support/solutions/43000647244-how-are-levels-displayed-in-the-trading-panel/) # How are levels displayed in the Trading Panel? The Take Profit level is shown as a Limit Order whereas the Stop Loss is a Stop Order. Until the Parent Order has not been executed its status is “Working” while the Levels are “Inactive”. Inactive status does not mean they are deactivated, it means that they have not been activated yet. Once an Order turns into a position its status is “Filled” and its Levels are indicated as “Working”. Previous Previous Why is the Time in Force setting not shown in the Order panel? Next Next Why did one of the levels get canceled? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43587994066/original/pIly5CKD7ep-inP_ldC8xGkKpjbHfwJlsA.png?1761312178)

**Описание:** This TradingView image displays a **paper trading session for NQ1! (Nasdaq-100 E-mini Futures)** on the CME, with a 5-minute (5) chart. Here’s a detailed breakdown:  


### **Top Section: Symbol & Market Data**  
- **Symbol/Header**: `NQ1! NQ1! NQ1! NQ-100 E-mini Futures · 5 · CME` (instrument, exchange, timeframe).  
- **Market Data**: `O25,269.25 H25,273.50 L25,265.75 C25,268.00 −1.00 (−0.00%)` (open, high, low, close, change).  
- **Currency**: `USD` (dropdown for currency selection).  


### **Order Entry & Market Depth**  
- **Sell/Buy Buttons**: Red `SELL` (25,487.25) and blue `BUY` (25,488.00) buttons with quantity selector (`1`).  
- **Market Depth**:  
  - `Ask`: 25,488.00 (sell price).  
  - `Bid`: 25,487.25 (buy price).  
  - Price levels: 25,400.00, 25,268.00 (close), 25,259.25 (low).  


### **Chart Area**  
- **Chart Type**: Candlestick chart (red/green candles) showing price action over time (x-axis: dates/times, y-axis: price levels).  
- **Orders on Chart**:  
  - `Buy Limit`: 24,985.00 (blue horizontal line, pending buy order).  
  - `Stop Loss`: 24,704.25 (orange horizontal line, pending sell order).  
  - `Take Profit`: 25,259.25 (green horizontal line, pending sell order).  
- **Red Arrows**: Visual annotations linking orders to the chart.  


### **Chart Controls**  
- **Timeframe Tabs**: `1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All` (select chart period).  
- **Timestamp**: `09:21:55 UTC-4` (current time).  
- **Additional Tabs**: `RTH` (Regular Trading Hours), `B-ADJ` (back-adjusted data).  


### **Paper Trading Panel**  
- **Tabs**: `Pine Editor`, `Paper Trading` (active, green dot), `Trade`.  
- **Account Info**: `Paper Trading` (dropdown), `Account: Paper Trading USD` (dropdown), `Account Balance: 100,000.00`, `Equity: 100,000.00`, `Realized P&L: 0.00`, `Unrealized P&L: 0.00`, `Account margin: 0.00`, `Available funds: 100,000.00`, `Orders margin: 499,700.00`.  


### **Orders Table**  
- **Tabs**: `Positions`, `Orders 3` (active), `History`, `Account History`, `Trading Journal`.  
- **Order Filters**: `All 3`, `Working 1`, `Inactive 2`, `Filled`, `Cancelled`, `Rejected`.  
- **Order Details** (3 total):  
  1. `Buy Limit`: Symbol `CME_MINI:NQ1!`, Side `Buy`, Type `Limit`, Qty `1`, Limit Price `24,985.00`, Take Profit `25,259.25`, Stop Loss `24,704.25`, Status `Working`.  
  2. `Sell Stop Loss`: Symbol `CME_MINI:NQ1!`, Side `Sell`, Type `Stop Loss`, Qty `1`, Stop Price `24,704.25`, Status `Inactive`.  
  3. `Sell Take Profit`: Symbol `CME_MINI:NQ1!`, Side `Sell`, Type `Take Profit`, Qty `1`, Limit Price `25,259.25`, Status `Inactive`.  


### **Purpose of Elements**  
- **Chart**: Visualize price trends to inform trading decisions.  
- **Order Buttons/Market Depth**: Execute trades or view current bid/ask prices.  
- **Orders on Chart**: Display pending (working) and inactive orders (stop loss/take profit).  
- **Paper Trading Panel**: Simulate trading with virtual funds (no real risk).  
- **Orders Table**: Track pending, filled, or canceled orders.  


This layout enables traders to analyze price action, place/manage orders, and monitor a simulated account—all core to TradingView’s trading workflow.


**Описание:** This TradingView image displays a **NQ1! (Nasdaq-100 E-mini Futures)** 5-minute chart on the CME exchange, with a focus on a pending buy limit order and its associated stop loss/take profit orders. Here’s a detailed breakdown:


### **Top Section: Symbol & Market Data**  
- **Symbol/Header**: \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43588010987/original/OcV9Yu30NxqTjntXZomVtPc90t__EBK-WA.png?1761316245)

**Описание:** This TradingView image displays a **paper trading session for Nasdaq 100 E-mini Futures (NQ1!)** on the CME, with a 5-minute candlestick chart and active trading interface. Here’s a detailed breakdown:  


### **Top Section: Symbol & Price Data**  
- **Symbol/Header**: `Nasdaq 100 E-mini Futures · 5 · CME` (5-minute timeframe).  
- **Price Metrics**:  
  - Open (O): `25,514.75`, High (H): `25,515.50`, Low (L): `25,494.00`, Close (C): `25,504.50` (red text, -10.75, -0.04% change).  
- **Trading Buttons**:  
  - `SELL 1` (red button, quantity 1), `BUY 25,503.75` (blue button, current bid price).  
- **Currency**: `USD` dropdown (top right).  


### **Chart Area**  
- **Candlestick Chart**: 5-minute timeframe, showing price action over time (x-axis: hours 17–27; y-axis: price levels).  
- **Order Markers**:  
  - `Take Profit` (green, 25,999.00) and `Stop Loss` (orange, 25,130.00) lines (with “X” to close orders).  
  - A blue box shows `+40.00 USD` (unrealized P&L for the open position).  
- **Market Depth**: Right side displays `Ask` (25,503.75), `Bid` (25,501.50), and price levels (e.g., 25,600.00, 24,400.00).  


### **Timeframe & Chart Controls**  
- **Timeframe Tabs**: `1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All` (select chart duration).  
- **Time/Status**: `10:28:26 UTC-4` (current time), `RTH` (Regular Trading Hours), `B-ADJ` (price adjustment).  


### **Paper Trading Interface**  
- **Tabs**: `Pine Editor`, `Paper Trading` (active, green dot), `Trade`.  
- **Account Info**:  
  - `Paper Trading` (dropdown), `Account: Paper Trading USD` (paper account).  
  - Metrics: `Account Balance: 100,000.00`, `Equity: 100,040.00`, `Realized P&L: 0.00`, `Unrealized P&L: +40.00`, `Account margin: 1,020.14`, `Available funds: 99,019.86`, `Orders margin: 0.00`.  
- **Sub-Tabs**: `Positions 1`, `Orders 2` (active), `History`, `Account History`, `Trading Journal`.  
- **Order Filters**: `All 3`, `Working 2`, `Inactive`, `Filled 1`, `Cancelled`, `Rejected` (filter order status).  


### **Orders Table**  
Three orders for `CME_MINI:NQ1!` (100 contracts):  
1. **Stop Loss (Sell)**: Qty 1, Stop Price `25,130.00`, Status `Working`.  
2. **Take Profit (Sell)**: Qty 1, Limit Price `25,999.00`, Status `Working`.  
3. **Market Buy**: Qty 1, Fill Price `25,501.50`, Status `Filled` (executed).  


### **UI Elements & Purpose**  
- **Buttons/Controls**: Sell/Buy buttons (execute trades), timeframe tabs (adjust chart duration), order filters (manage order visibility), “X” (close orders).  
- **Charts**: Visualize price trends; order lines (Take Profit/Stop Loss) define risk/reward for open positions.  
- **Paper Trading**: Simulates trading with virtual funds (no real money), tracking P&L, margin, and order status.  


This interface combines real-time price data, charting, and order management for simulated futures trading, enabling users to practice strategies without financial risk.


**Описание:** This TradingView image displays a **Nasdaq 100 E-mini Futures (NQ1!)** 5-minute chart in **Paper Trading** mode. Here’s a detailed breakdown:  


### **Top Section: Symbol & Market Data**  
- **Symbol**: `Nasdaq 100 E-mini Futures · 5 · CME` (5-minute timeframe, CME exchange).  
- **Market Data**:  
  - Open (O): 25,514.75 | High (H): 25,515.50 | Low (L): 25,494.00 | Close (C): 25,504.50 (red, -10.75, -0.04%).  
  - **Bid/Ask**: Bid = 25,501.50 (blue), Ask = 25,503.75 (red).  
  - **Order Buttons**: Red “SELL 1” (sell 1 contract) and blue “BUY 25,503.75” (buy at current ask).  


### **Chart Area**  
- **Price Chart**: Candlestick chart showing price action over time (x-axis: 17–27, y-axis: 24,000–25,600).  
- **Orders on Chart**:  
  - **Take Profit (green)**: 1 contract at 25,999.00 (top horizontal line).  
  - **Stop Loss (orange)**: 1 contract at 25,130.00 (lower horizontal line).  
  - **Profit Preview**: Blue box shows “+40.00 USD” (unrealized P&L for the open position).  


### **Timeframe & Chart Controls**  
- **Timeframe Tabs**: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All (current: 5-minute).  
- **Chart Settings**: Icons for time, RTH (regular trading hours), B-ADJ (back-adjusted).  


### **Paper Trading Panel**  
- **Mode Tabs**: `Pine Editor` | `Paper Trading` (active, green dot) | `Trade`.  
- **Account Info**:  
  - Account: `Paper Trading USD` (simulated funds).  
  - Metrics: Account Balance (100,000.00), Equity (100,040.00), Realized P&L (0.00), Unrealized P&L (+40.00), Account Margin (1,020.14), Available Funds (99,019.86), Orders Margin (0.00).  


### **Orders Table**  
- **Tabs**: `Positions 1` | `Orders 2` (active) | `History` | `Account History` | `Trading Journal`.  
- **Order Filters**: `All 3` | `Working 2` | `Inactive` | `Filled 1` | `Cancelled` | `Rejected`.  
- **Order Details** (3 total):  
  1. **Stop Loss (Sell)**: 1 contract, stop price 25,130.00, status `Working`.  
  2. **Take Profit (Sell)**: 1 contract, limit price 25,999.00, status `Working`.  
  3. **Market Buy**: 1 contract, filled at 25,501.50, status `Filled`.  


### **UI Elements**  
- **Right Sidebar**: Icons for notes, clock, alerts, chat, etc.  
- **Currency**: “USD” dropdown (top right).  


### **Purpose**  
This interface is for **simulated trading** (paper trading) of NQ1! futures, allowing users to place, manage, and track orders (stop loss, take profit, market buy) with real-time P&L and account metrics. The chart visualizes price action, while the orders table manages open/closed positions.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

