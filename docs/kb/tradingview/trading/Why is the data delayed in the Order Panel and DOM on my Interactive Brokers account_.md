# Why is the data delayed in the Order Panel and DOM on my Interactive Brokers account?

**URL:** https://www.tradingview.com/support/solutions/43000719859-why-is-the-data-delayed-in-the-order-panel-and-dom-on-my-interactive-brokers-account/

---

- [ Help Center ](/) - / - / [ Why is the data delayed in the Order Panel and DOM on my Interact… ](/support/solutions/43000719859-why-is-the-data-delayed-in-the-order-panel-and-dom-on-my-interactive-brokers-account/) # Why is the data delayed in the Order Panel and DOM on my Interactive Brokers account? We receive Ask and Bid prices from the brokers once users log on their broker accounts on TradingView. If the data for the symbol is delayed on the broker platform, Ask and Bid quotes will also be delayed. Data packages purchased on TradingView do not cover these quotes. They allow users to see real-time on the charts, watchlist, and screener (for stocks). To see the Buy and Sell prices in real-time, users need to have access to it on the broker platform. We also support real-time data verification for Interactive Brokers accounts, so users do not have to pay for data twice. For more information on verification and support exchanges, please follow the [link](https://www.tradingview.com/chart/?solution=43000479666). Previous Previous Why do I receive “This username is not associated with a paper trading account” error message? Next Next How to start trade crypto? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43592849500/original/YNazmchWoeeMKL2TQJyzUL1d_tSgPKbtfQ.png?1763656118)

**Описание:** This TradingView image displays a **Depth of Market (DOM)** interface for the Eurex DAX futures contract (EUREX:FDAXU2022) via Interactive Brokers. Here’s a detailed breakdown:  


### 1. Header & Instrument Info  
- **Top Bar**: Shows the instrument name (`EUREX:FDAXU2022`) and broker (`Interactive Brokers`). A yellow “D” icon indicates **delayed data** (not real-time).  
- **Icons**: Three dots (menu) and an “X” (close button) are on the right.  


### 2. “Delayed Data” Pop-Up (Critical Alert)  
A white pop-up with an orange “D” icon and bold “Delayed data” text explains:  
- *“You are seeing delayed data in the DOM. You need to get the data from your broker, if you want to see it real-time.”*  
- Blue underlined text (“data” and “broker”) suggests clickable links (likely to broker data or settings).  


### 3. DOM Table (Order Book)  
Below the pop-up, a table shows **price levels** (right column) and corresponding **order volumes** (left column, partially visible). Visible prices:  
- `13531`, `13530`, `13529` (highlighted in blue, likely the *best bid/ask*), `13528`.  
- The left column (volumes) is partially obscured but shows numbers like `90` (price level) and `80` (another level).  


### 4. UI Purpose  
- **DOM**: Displays real-time (or delayed) buy/sell orders at different price levels, helping traders gauge liquidity and execute orders.  
- **Delayed Data Alert**: Warns users the data is not live—real-time access requires broker integration.  


This interface is core to active trading, enabling quick order placement and market depth analysis.


**Описание:** This TradingView image displays a **Depth of Market (DOM)** for the instrument `EUREX:FDAXU2022` (Eurostoxx 50 futures, 2022 contract) via Interactive Brokers. Here’s a detailed breakdown:  


### 1. Header & Instrument Info  
- **Top Bar**: Shows the instrument (`EUREX:FDAXU2022`) and broker (`Interactive Brokers`), with a yellow “D” icon (indicating delayed data).  
- **Icons**: Three dots (menu) and an “X” (close button) are on the right.  


### 2. Delayed Data Notification (Popup)  
A white popup with:  
- **Title**: “Delayed data” (orange text, with a yellow “D” icon).  
- **Message**: “You are seeing delayed data in the DOM. You need to get the data from your broker, if you want to see it real-time.”  
  - Key phrases (“data,” “broker”) are underlined in blue (likely hyperlinks for more info).  


### 3. DOM (Depth of Market) Table  
Below the popup, a table shows **price levels** (center column) and **order book depth** (left/right columns, partially visible):  
- **Price Levels**: 13531, 13530, 13529 (highlighted in blue, likely the *best bid/ask*), 13528.  
- **Left/Right Columns**: Represent bid (buy) and ask (sell) quantities (partially obscured by the popup).  
- **Y-Axis (Left)**: Numerical scale (20, 10, 0, 90, 80) — likely volume or order count.  


### Purpose of Elements  
- **DOM Table**: Shows real-time (or delayed) buy/sell orders at different price levels, critical for short-term trading.  
- **Delayed Data Popup**: Warns users that data is not real-time; real-time access requires a broker subscription.  
- **Header/Icons**: Provide instrument/broker context and navigation (close, menu).  


This interface is used for analyzing order flow and executing trades in futures markets, with the popup emphasizing data latency.


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

