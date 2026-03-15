# How to trade with leverage in Paper Trading

**URL:** https://www.tradingview.com/support/solutions/43000742700-how-to-trade-with-leverage-in-paper-trading/

---

- [ Help Center ](/) - / - / [ Paper Trading: general questions ](/support/folders/43000549214-paper-trading-general-questions/) - / [ How to trade with leverage in Paper Trading ](/support/solutions/43000742700-how-to-trade-with-leverage-in-paper-trading/) # How to trade with leverage in Paper Trading To start simulated trading with margin, your [Paper Trading](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/) account is already pre-configured with default values. Or you can [set the leverage](https://www.tradingview.com/support/solutions/43000742699-how-to-set-leverage-in-paper-trading/) you want to trade with. In the "Order info" section in the Order Panel, you can see the following information about your future position: - **Margin:** Total amount of your funds and borrowed funds - **Leverage:** The proportion of your funds and borrowed funds - **Tick value:** Minimum price change of the asset - **Trade value:** Total cost of the expected position **! Note:** When the margin value increases, the progress bar shifts to the right. If the margin value exceeds your available funds, the progress bar reaches the right edge and turns red. This means that you don't have enough funds to open a position for this order. At the time of order execution, if the ratio of margin and available funds remains the same, the order won't be executed. You can see how much of your funds will be used to open a position in the "Margin" column. You can find it in the "Orders" tab of the Trading panel. Same applies when an order is executed and a position is opened. Now, in the "Margin" column you can see how much of your funds are being used to maintain the position. **! Important:** TradingView doesn't provide real margin trading services. We only simulate the behavior of real brokers to help you improve your trading strategies in a risk-free environment. Also read: - [How to trade on TradingView](https://www.tradingview.com/support/solutions/43000756695-how-to-trade-on-tradingview/) - [The technical analysis essentials](https://www.tradingview.com/support/solutions/43000759577-the-technical-analysis-essentials-with-tradingview/) - [Introduction to fundamental analysis](https://www.tradingview.com/support/solutions/43000759574-introduction-to-fundamental-analysis-on-tradingview/) - [Chart trading: key features and advantages](https://www.tradingview.com/support/solutions/43000766334-chart-trading-on-tradingview-key-features-and-advantages/) - [Simulated futures, real market experience](https://www.tradingview.com/support/solutions/43000762709-simulated-futures-real-market-experience-with-paper-trading/) Previous Previous How to set leverage in Paper Trading Next Next How to change the account currency in Paper Trading Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43529762684/original/GIdsA35TsCVaneRf2zt7U4jqYV9qeVVD1Q.png?1734336460)

**Описание:** This is a **TradingView mobile (paper trading) order entry screen** for the instrument \


**Описание:** This is a **TradingView mobile app \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43529762683/original/fETfsjXttP-vARL4nBkUGJ5M1e3OqT1YUQ.png?1734336460)

**Описание:** This is a **TradingView mobile (paper trading) order entry interface** for the instrument \


**Описание:** This TradingView image shows a **paper trading order interface** for the instrument \


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43529762689/original/A4pA4JgqCF58Ko4_rdoal-Pch444yiUzHA.png?1734336460)

**Описание:** This TradingView image displays the **Paper Trading** interface (selected in the top navigation bar) for a new margin account (USD). Here’s a detailed breakdown:  


### **Top Navigation Bar**  
- Tabs: *Screener, Pine Editor, Strategy Tester, Replay Trading, Paper Trading (active, with green dot), Trade*.  
- Window controls: Minimize/Maximize buttons (right).  


### **Account Header**  
- **Paper Trading** (dropdown) + *Account: New margin account usd* (dropdown) + Settings icon (gear).  


### **Account Metrics (Key Financial Data)**  
- **Account Balance**: $100,000.00 (total funds).  
- **Equity**: $100,000.00 (balance + P&L).  
- **Realized P&L**: $0.00 (profits/losses from closed trades).  
- **Unrealized P&L**: $0.00 (profits/losses from open positions).  
- **Account margin**: $0.00 (margin used for open positions).  
- **Available funds**: $100,000.00 (funds available for new trades).  
- **Orders margin**: $30,000.00 (margin reserved for pending orders).  


### **Tab Navigation (Below Metrics)**  
- Tabs: *Positions, Orders (active, underlined), History, Account History, Trading Journal*.  


### **Order Filter Tabs**  
- Filters: *All (1), Working (1), Inactive, Filled, Cancelled, Rejected* (to sort orders).  


### **Orders Table (Active: “Working” Tab)**  
Columns (with sample data for one order):  
- **Symbol**: `CME_MINI:ES1!` (S&P 500 E-mini futures) + “500” badge (likely contract size).  
- **Side**: `Buy` (order direction).  
- **Type**: `Limit` (order type).  
- **Qty**: `2` (quantity of contracts).  
- **Limit Price**: `6,000.00` (price at which the limit order is set).  
- **Status**: `Working` (order is active, not yet filled).  
- **Order ID**: `1893` (unique order identifier).  
- **Leverage**: `20:1` (margin leverage ratio).  
- **Margin**: `30,000.00 USD` (margin reserved for this order).  
- **Action Icons**: Delete (trash), Edit (pencil), Close (X) (for managing the order).  


### **Purpose**  
This interface is for **simulated trading** (paper trading) to practice strategies without real money. It tracks account balances, order statuses, and margin usage, with tools to manage (edit/delete) pending orders. The “Working” tab shows active (unfilled) orders, while other tabs (e.g., “Filled”) would show executed trades.


**Описание:** This TradingView screenshot displays the **Paper Trading** interface, focused on order management and account metrics. Here’s a detailed breakdown:  


### **Top Navigation Bar**  
- **Tabs**: `Market Screener` (dropdown), `Pine Editor`, `Strategy Tester`, `Replay Trading`, `Paper Trading` (active, highlighted blue), `Trade`.  
- **Window Controls**: Minimize, maximize, close buttons (top-right).  


### **Account Header**  
- **Paper Trading Dropdown**: Toggles paper trading settings.  
- **Account Info**: `Account: New margin account usd` (dropdown to switch accounts).  
- **Settings Icon**: Adjusts account preferences.  


### **Account Metrics (Key Financial Data)**  
- `Account Balance`: $100,000.00 (total funds in the account).  
- `Equity`: $100,000.00 (balance + unrealized P&L).  
- `Realized P&L`: $0.00 (profit/loss from closed positions).  
- `Unrealized P&L`: $0.00 (profit/loss from open positions).  
- `Account margin`: $0.00 (margin used by open positions).  
- `Available funds`: $100,000.00 (funds available for new trades).  
- `Orders margin`: $30,000.00 (margin reserved for pending orders).  


### **Tab Navigation (Below Metrics)**  
Tabs for managing trading activity: `Positions`, `Orders 1` (active, underlined), `History`, `Account History`, `Trading Journal`.  


### **Order Filter Tabs**  
Sub-tabs to filter orders: `All 1`, `Working 1` (active, underlined), `Inactive`, `Filled`, `Cancelled`, `Rejected`.  


### **Orders Table (Active Order Details)**  
Columns (left to right):  
- `Symbol`: `CME_MINI:ES1!` (S&P 500 E-mini futures contract) with a red “500” badge (likely contract size).  
- `Side`: `Buy` (order direction).  
- `Type`: `Limit` (order type).  
- `Qty`: `2` (quantity of contracts).  
- `Limit Price`: `6,000.00` (price at which the limit order is set).  
- `Status`: `Working` (order is active and pending execution).  
- `Order ID`: `1893` (unique order identifier).  
- `Leverage`: `20:1` (margin leverage ratio).  
- `Margin`: `30,000.00 USD` (margin reserved for this order).  
- **Action Icons**:  
  - `D` (dark mode toggle, orange).  
  - Pencil (edit order).  
  - `X` (cancel order).  


### **Purpose of UI Elements**  
- **Top Tabs**: Navigate between TradingView tools (e.g., strategy testing, paper trading).  
- **Account Metrics**: Track real-time financial health (balance, equity, margin).  
- **Order Tabs/Filters**: Organize orders by status (working, filled, etc.).  
- **Orders Table**: View, edit, or cancel pending orders; monitor order details (symbol, price, leverage).  


This interface is designed for simulated trading, allowing users to practice order execution, track margin usage, and manage positions without real financial risk.


