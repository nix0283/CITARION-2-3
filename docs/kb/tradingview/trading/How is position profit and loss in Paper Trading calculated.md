# How is position profit and loss in Paper Trading calculated

**URL:** https://www.tradingview.com/support/solutions/43000719857-how-is-position-profit-and-loss-in-paper-trading-calculated/

---

- [ Help Center ](/) - / - / [ How is position profit and loss in Paper Trading calculated ](/support/solutions/43000719857-how-is-position-profit-and-loss-in-paper-trading-calculated/) # How is position profit and loss in Paper Trading calculated In most cases, buy orders are executed at the ask price, and sell orders at the bid price. The last price on the chart does not affect the calculation. They are displayed in the order panel and on the "Buy" and "Sell" buttons in the top left corner. You can also enable their labels on the price scale. To close a long position, you need to place a sell order, so the profit and loss will be calculated as the difference between the bid price and entry price, multiplied by the quantity. The formula for long positions: (Bid Price − Average Fill Price) × Q uantity The formula for short positions : (Average Fill Price − Ask Price) × Q uantity **! Note:** Your profit and loss is calculated in the symbol's currency and then converted to USD, as the dollar is the default currency for [Paper Trading](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/). For futures, the formulas are slightly different. They account for the point value of the contract, which you can find in the symbol info by clicking on the three dots in its description. The formula for long futures positions: (Bid Price − Average Fill Price) × Q uantity × P oint Value The formula for short futures positions: (Average Fill Price − Ask price) × Quantity Example of profit and loss calculation for a short futures position: (4520.25 − 4520.50) × 10 × 50 = − 125 USD Also read: - [How to trade on TradingView](https://www.tradingview.com/support/solutions/43000756695-how-to-trade-on-tradingview/) - [The technical analysis essentials](https://www.tradingview.com/support/solutions/43000759577-the-technical-analysis-essentials-with-tradingview/) - [Introduction to fundamental analysis](https://www.tradingview.com/support/solutions/43000759574-introduction-to-fundamental-analysis-on-tradingview/) - [Simulated futures, real market experience](https://www.tradingview.com/support/solutions/43000762709-simulated-futures-real-market-experience-with-paper-trading/) - [Chart trading: key features and advantages](https://www.tradingview.com/support/solutions/43000766334-chart-trading-on-tradingview-key-features-and-advantages/) Previous Previous What is a “non-tradable” symbol notification Next Next What is commission per contract in Paper Trading Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43592593201/original/yNYj57vS32PAEVwWCH11T2VknFkx7sXiXQ.png?1763564779)

**Описание:** This TradingView image displays a **S&P 500 E-mini Futures (ES1!)** trading interface, split into two main sections: a price chart (left) and an order entry panel (right).  


### **Top Bar (Header)**  
- **Symbol & Exchange**: \


**Описание:** This TradingView image displays a **S&P 500 E-mini Futures (ES1!)** trading interface with real-time market data and order entry tools. Here’s a detailed breakdown:  


### **Top Section (Market Data & Ticker)**  
- **Ticker Symbol**: `ES1!` (S&P 500 E-mini Futures) with the TradingView logo.  
- **Market Data**:  
  - `O6,697.00` (Open), `H6,697.25` (High), `L6,696.75` (Low), `C6,697.25` (Close).  
  - Price change: `+0.50 (+0.01%)` (green, indicating a slight gain).  
- **Bid/Ask Prices**:  
  - Red “**SELL**” button: `6,697.25` (current bid price, with a volume of `1`).  
  - Blue “**BUY**” button: `6,697.50` (current ask price).  


### **Chart Area**  
- A candlestick chart (right side) shows price action, with a vertical green candlestick indicating recent price movement.  
- **Bid/Ask Labels**: Red “Bid” and red “Ask” text labels the price levels.  


### **Order Panel (Right Side)**  
- **Currency Dropdown**: “USD” (selectable, for currency denomination).  
- **Tabs**: “Order” (active) and “DOM” (Depth of Market, inactive).  
- **Order Entry Box** (red-outlined):  
  - Left (Sell): `6,697.25` (current bid price).  
  - Right (Buy): `6,697.50` (current ask price).  
  - Small label: `0.25` (likely the spread or price difference).  
- **Order Type Buttons**:  
  - “Market” (default, for immediate execution at current price).  
  - “Limit” (for setting a specific price).  
  - “Stop” (for stop-loss orders).  


### **UI Elements & Purpose**  
- **Sell/Buy Buttons**: Execute market orders at the current bid/ask price.  
- **Chart**: Visualizes price trends for technical analysis.  
- **Order Panel**: Facilitates trade execution (market/limit/stop orders) with real-time price inputs.  
- **Bid/Ask Labels**: Clarify current market liquidity levels.  


This interface combines real-time market data, price visualization, and order execution tools for futures trading.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43592588418/original/xxaX6my4bntsvjtv8PyuBNn7uDXNlHM9TA.png?1763563732)

**Описание:** The image is a **TradingView chart interface** displaying a candlestick price chart (green/red bars) with a **settings menu** open, focused on label customization. Here’s a detailed breakdown:  


### 1. **Chart & Price Data**  
- **Candlestick Chart**: Shows price action over time (x-axis: time, e.g., 02:00–03:00; y-axis: price levels, e.g., 4,096,000–4,116,000). Green/red bars represent price movements.  
- **Ask/Bid Box (Top-Right)**: A red-outlined box displays:  
  - *Ask*: 4,111.355 (red, sell price)  
  - *Bid*: 4,110.875 (blue, buy price)  
  - Timestamp: 02:17  


### 2. **Settings Menu (Right-Side)**  
A dropdown menu (likely from the chart’s “Settings” or “Chart Options” icon) with sections for **chart scaling** and **label customization**:  

#### **Chart Scaling Options**  
- *Auto (fits data to screen)*: Checked (adjusts chart to fit visible data).  
- *Lock price to bar ratio*: 0.6360 (maintains price-bar proportion).  
- *Scale price chart only*: Adjusts only price axis.  
- *Invert scale*: Reverses price axis direction.  

#### **Price Scale Type**  
- *Regular*: Checked (linear price scale).  
- *Percent*: Shows price changes as percentages.  
- *Indexed to 100*: Normalizes data to 100.  
- *Logarithmic*: Uses logarithmic price scaling.  

#### **Label Customization (Left Sub-Menu)**  
A nested menu (under “Labels”) with checkboxes for chart labels:  
- *Symbol name label*: Unchecked.  
- *Symbol last price label*: Checked (displays current price).  
- *Symbol previous day close price label*: Unchecked.  
- *Pre/post market price label*: Checked (shows pre/post-market prices).  
- *High and low price labels*: Unchecked.  
- *Bid and ask labels*: **Checked** (red box, displays Ask/Bid prices).  
- *Indicators and financials name/value labels*: Checked (shows indicator names/values).  
- *Countdown to bar close*: Checked (timer for next bar).  
- *No overlapping labels*: Checked (prevents label overlap).  

#### **Other Menu Items**  
- *Move scale to left*: Adjusts scale position.  
- *Lines*: Sub-menu for line-related settings.  
- *Plus button*: Checked (shows “+” button for adding elements).  
- *More settings…*: Accesses additional chart options.  


### 3. **UI Elements**  
- **Icons (Top-Right)**: Likely for chart type (e.g., candlestick), chat, or other tools.  
- **Time/Price Axes**: X-axis (time: 02:00, 03:00) and Y-axis (price levels) frame the chart.  


This interface allows traders to customize chart visibility (e.g., show/hide Ask/Bid, price labels) and adjust scaling, optimizing the chart for analysis.


**Описание:** The image shows a **TradingView chart interface** with a candlestick price chart (green/red bars) and two open menus for chart customization:  

### 1. Main Chart Area  
- **Candlestick Chart**: Displays price action over time (x-axis: time, y-axis: price). Green bars = price increase; red bars = price decrease.  
- **Price Axis (Right)**: Shows price levels (e.g., 4,096.000 to 4,116.000).  
- **Ask/Bid Box (Top-Right)**: Red box with:  
  - *Ask*: 4,111.355 (price to buy, red background).  
  - *Bid*: 4,110.875 (price to sell, blue background).  
  - Time: 02:17.  


### 2. Left Menu (Labels Settings)  
A dropdown menu for **label customization** (e.g., text overlays on the chart):  
- Options (with checkboxes):  
  - *Symbol name label* (unchecked).  
  - *Symbol last price label* (checked).  
  - *Symbol previous day close price label* (unchecked).  
  - *Pre/post market price label* (checked).  
  - *High and low price labels* (unchecked).  
  - *Bid and ask labels* (**checked, highlighted**).  
  - *Indicators and financials name labels* (unchecked).  
  - *Indicators and financials value labels* (checked).  
  - *Countdown to bar close* (checked).  
  - *No overlapping labels* (checked).  


### 3. Right Menu (Chart Scale/Display Settings)  
A dropdown menu for **chart scaling and display**:  
- *Auto (fits data to screen)* (checked).  
- *Lock price to bar ratio* (0.6360, unchecked).  
- *Scale price chart only* (unchecked).  
- *Invert scale* (unchecked).  
- *Regular* (checked, highlighted).  
- *Percent* (unchecked).  
- *Indexed to 100* (unchecked).  
- *Logarithmic* (unchecked).  
- *Move scale to left* (unchecked).  
- *Labels* (**highlighted, expanded**).  
- *Lines* (unchecked).  
- *Plus button* (checked).  
- *More settings…* (bottom option).  


### UI Elements & Purpose  
- **Checkboxes**: Toggle label/display options (e.g., show/hide bid/ask labels).  
- **Highlighted Boxes**: Emphasize active settings (e.g., “Bid and ask labels” in the left menu, “Labels” in the right menu).  
- **Ask/Bid Box**: Real-time market prices (buy/sell).  
- **Candlestick Chart**: Visualize price trends.  
- **Menus**: Customize chart appearance (labels, scale, display).  


This interface lets traders adjust how price data and labels appear on the chart for analysis.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43592596968/original/LCBsYm5WrXN2_6cu3i7KvtPC70hAMFiIGQ.png?1763565594)

**Описание:** This TradingView image displays a **5-minute candlestick chart for E-mini S&P 500 Futures (CME)** with a focus on a live long position. Here’s a detailed breakdown:  


### **Top Section: Symbol & Market Data**  
- **Symbol**: `E-mini S&P 500 Mini Futures · 5 · CME` (5-minute timeframe).  
- **Market Data**: `O6,697.50 H6,703.00 L6,692.50 C6,702.25 +5.00 (+0.07%)` (Open, High, Low, Close, Change, % Change).  
- **Currency**: `USD` (dropdown).  
- **Order Buttons**:  
  - `SELL` (red, 1 contract) and `BUY` (blue, 1 contract) buttons for market orders.  
  - `Bid` (red arrow, left) and `Ask` (red text, right) labels with prices: `Bid: 6,702.00`, `Ask: 6,702.25`.  


### **Chart Area**  
- **Candlestick Chart**: Shows price action over time (x-axis: 14:00–10:00 next day; y-axis: 6,580–6,720).  
- **Red Trendline**: A moving average (or trendline) tracking price.  
- **Order Details Box**: Top-right, showing:  
  - `1L` (1 long contract), `TP` (Take Profit), `SL` (Stop Loss) toggles.  
  - `1 +112.50 USD` (unrealized P&L for 1 contract).  


### **Timeframe & Chart Controls**  
- **Timeframe Tabs**: `1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All` (select chart duration).  
- **Timezone**: `10:14:00 UTC-5` (current time).  
- **Additional Tabs**: `ETH` (extended hours), `B-ADJ` (broker adjustments), and a `+` button (expand).  


### **Bottom Section: Paper Trading & Account Info**  
- **Mode Tabs**: `Pine Editor`, `Paper Trading` (active, green dot), `Trade`.  
- **Account Overview**:  
  - `Account Balance: 100,000.00 USD`, `Equity: 100,112.50 USD`, `Realized P&L: 0.00 USD`, `Unrealized P&L: +112.50 USD`, `Account Margin: 670.20 USD`, `Available Funds: 99,442.30 USD`, `Orders Margin: 0.00 USD`.  
- **Navigation Tabs**: `Positions 1` (active), `Orders`, `Order History`, `Balance History`, `Trading Journal`.  


### **Positions Table (Active Long Position)**  
- **Symbol**: `CME_MINI:ES1!` (E-mini S&P 500).  
- **Side**: `Long` (blue).  
- **Qty**: `1` (1 contract).  
- **Avg Fill Price**: `6,699.75 USD` (red box, entry price).  
- **Unrealized P&L**: `+112.50 USD` (green, profit).  
- **Take Profit**: `6,702.00 USD` (target price).  
- **Stop Loss**: (not visible, but implied by `SL` toggle).  
- **Last Price**: `6,702.25 USD` (current market price).  
- **Unrealized P&L %**: `+0.03%`.  
- **Trade Value**: `334,987.50 USD` (position value).  
- **Market Value**: `335,100.00 USD` (current market value).  
- **Action Icons**: Edit (`✎`) and close (`✕`) buttons.  


### **Key UI Elements**  
- **Trendline**: Red line for technical analysis.  
- **Order Box**: Manages TP/SL for the open position.  
- **Paper Trading Mode**: Simulated trading (no real money).  
- **Unrealized P&L**: Highlights profit on the open long position.  


This layout is typical of TradingView’s trading interface, combining real-time price data, order management, and account tracking for futures trading.


**Описание:** This TradingView image displays a **5-minute candlestick chart for S&P 500 E-mini Futures (CME)** with a focus on active trading and paper trading functionality. Here’s a detailed breakdown:  


### **Top Section: Symbol & Market Data**  
- **Symbol/Header**: “S&P 500 E-mini Futures · 5 · CME” (5-minute timeframe, CME exchange).  
- **Market Data**: Shows open (O: 6,697.50), high (H: 6,703.00), low (L: 6,692.50), close (C: 6,702.25), and change (+5.00, +0.07%).  
- **Currency**: “USD” dropdown (top-right).  


### **Trading Interface (Left/Top)**  
- **Bid/Ask Prices**:  
  - Red “SELL” button (1 contract) with “Bid” label (arrow points to bid price).  
  - Blue “BUY” button (1 contract) with “Ask” label.  
- **Order Panel**: Displays “1” (contract quantity), “+112.50 USD” (unrealized P&L), and “TP/SL” (take profit/stop loss) toggles.  


### **Chart Area**  
- **Candlestick Chart**: 5-minute candles (green = up, red = down) showing price action over time (x-axis: 14:00–10:00 next day).  
- **Moving Average**: Red trendline (likely a moving average) overlays the chart.  
- **Price Axis (Right)**: Shows price levels (6,580.00–6,720.00).  
- **Bid/Ask Levels**:  
  - Red “Ask” box: 6,702.25 (current ask price).  
  - Blue “Bid” box: 6,702.00 / 6,699.75 (current bid prices).  


### **Timeframe & Chart Controls (Below Chart)**  
- **Timeframe Buttons**: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All (to switch chart periods).  
- **Chart Tools**: Icons for full-screen, settings, and time (10:14:00 UTC-5).  


### **Paper Trading Dashboard (Bottom)**  
- **Tabs**: “Pine Editor,” “Paper Trading” (active, green dot), “Trade.”  
- **Account Metrics**:  
  - *Account Balance*: 100,000.00 USD.  
  - *Equity*: 100,112.50 USD.  
  - *Realized P&L*: 0.00 USD.  
  - *Unrealized P&L*: +112.50 USD (green, indicating profit).  
  - *Account Margin*: 670.20 USD.  
  - *Available Funds*: 99,442.30 USD.  
  - *Orders Margin*: 0.00 USD.  
- **Sub-Tabs**: “Positions” (active), “Orders,” “Order History,” “Balance History,” “Trading Journal.”  


### **Positions Table (Bottom)**  
- **Columns**: Symbol, Side, Qty, Avg Fill Price, Unrealized P&L, Take Profit, Stop Loss, Last Price, Unrealized P&L %, Trade Value, Market Value.  
- **Active Position**:  
  - *Symbol*: CME_MINI:ES1! (S&P 500 E-mini).  
  - *Side*: Long (blue label).  
  - *Qty*: 1 contract.  
  - *Avg Fill Price*: 6,699.75 USD (red box, entry price).  
  - *Unrealized P&L*: +112.50 USD (green).  
  - *Take Profit*: 6,702.00 USD.  
  - *Unrealized P&L %*: +0.03%.  
  - *Trade Value*: 334,987.50 USD.  
  - *Market Value*: 335,100.00 USD.  


### **Purpose & Context**  
This interface is used for **paper trading** (simulated trading) to practice strategies without real money. The chart analyzes short-term price movements, while the dashboard tracks account performance, open positions, and order history. The “Long” position (buy) shows a small unrealized gain, with take profit/stop loss levels set for risk management.


