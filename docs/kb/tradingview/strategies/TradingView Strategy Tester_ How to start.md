# TradingView Strategy Tester: How to start

**URL:** https://www.tradingview.com/support/solutions/43000764138-tradingview-strategy-tester-how-to-start/

---

- [ Help Center ](/) - / - / [ I'd like to know more about strategies ](/support/folders/43000549427-i-d-like-to-know-more-about-strategies/) - / [ TradingView Strategy Tester: How to start ](/support/solutions/43000764138-tradingview-strategy-tester-how-to-start/) # TradingView Strategy Tester: How to start A Strategy Tester is a tool for testing trading ideas. Indicators display data and signals on the chart, while strategies automatically generate a result report. How to launch a strategy - On [Supercharts](https://www.tradingview.com/chart/), click the "Indicators" button in the upper toolbar or use the " / " hotkey. - Use the search bar or select a strategy manually in Technicals → Strategies or Community. When selected, the Strategy Tester will open at the bottom of the screen. The Strategy Tester opens automatically when you add any strategy and shows how your trading system would have performed on historical data. Only one strategy can run on a chart at a time. Types of strategies - **Built-in Strategies****:** Ready-made by TradingView for a quick start. - **Community strategies****:** Created by other traders and available for free, located under Indicators → Community. - **My strategies****:** Your own strategies written in Pine Script, or those you’ve saved to Favorites. Interface Overview When you add a strategy, the "Overview" tab displays the key metrics and charts: - **Strategy chart:** Shows how equity changes over time. Its appearance depends on the selected strategy - **Date range****:** Allows you to select the time period for displaying results - **Total P&L****:** Overall profit or loss (shown in currency and percentage) - **Max equity drawdown****:** The greatest loss drawdown, i.e., the greatest possible loss the strategy had compared to its highest profits - **Total trades****:** The total number of closed trades, winning and losing - **Profitable trades****:** The percentage of winning trades, the number of winning trades divided by the total number of closed trades - **Profit factor****:** The amount of money the strategy made for every unit of money it lost, gross profits divided by gross losses - **Buy&hold****:** Adds an alternative buy-and-hold scenario to the chart for comparison with the strategy - **Trades run-up&drawdown****:** Displays the extreme values for each trade: maximum unrealized profit (run-up) and maximum drawdown (drawdown) When you hover over the chart, detailed information appears: - Trade number and type - Cumulative P&L - Date and time - Buy & hold (if **Buy&hold** is enabled) - Run-up (if **Trades run-up&drawdown** is enabled) - Drawdown (if **Trades run-up&drawdown** is enabled) Performance The "Performance" tab provides detailed trading statistics, with separate metrics available for all trades, as well as for longs and shorts: - Open P&L - Net profit - Gross profit - Gross loss - Commission paid - Buy & hold return - Max equity run-up - Max equity drawdown - Max contracts held Trades analysis The "Trades analysis" tab provides detailed statistics about trade outcomes, including separate metrics for longs and shorts: - Total trades - Total open trades - Winning trades - Losing trades - Percent profitable - Avg P&L - Avg winning trade - Avg losing trade - Ratio avg win / avg loss - Largest winning trade - Largest winning trade percent - Largest losing trade - Largest losing trade percent - Avg # bars in trades - Avg # bars in winning trades - Avg # bars in losing trades Risk/performance ratios The "Risk/performance ratios" tab provides additional metrics that help evaluate the risk-adjusted performance of the strategy, with separate values for longs and shorts: - Sharpe ratio - Sortino ratio - Profit factor - Margin calls List of trades The "List of trades" tab shows a complete record of all executed trades with detailed parameters in table format: - Trade # - Type - Date/Time - Signal - Price - Position size - Net P&L - Run-up - Drawdown - Cumulative P&L Also read: - [Built-in Strategies](https://www.tradingview.com/support/folders/43000587406/) - [Values in Strategy Report](https://www.tradingview.com/support/folders/43000587044/) - [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/) - [How to trade on TradingView](https://www.tradingview.com/support/solutions/43000756695-how-to-trade-on-tradingview/) - [The technical analysis essentials](https://www.tradingview.com/support/solutions/43000759577-the-technical-analysis-essentials-with-tradingview/) - [Introduction to fundamental analysis](https://www.tradingview.com/support/solutions/43000759574-introduction-to-fundamental-analysis-on-tradingview/) Previous Previous How to simulate trading with leverage in Pine Script Next Next Strategy publishing rules Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43579867485/original/uFuBDq2TG38MwxbTlMfMi69OBvEx8DRzKg.png?1757507988)

**Описание:** This TradingView interface displays a **1-day (1D) chart for Apple Inc. (NASDAQ: AAPL)** with a price of $237.88 (down $1.81, -0.76%). Here’s a detailed breakdown:  


### **Top Navigation Bar**  
- **Left**: \


**Описание:** This TradingView screenshot displays a **1-day (1D) chart for Apple Inc. (NASDAQ: AAPL)** with a modal window open for \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43579867487/original/tfELdf3Z3QvZ3Y4ApvW3hyByMIH5RKVa5g.png?1757507988)

**Описание:** This TradingView screenshot displays a **technical analysis of Apple Inc. (NASDAQ: AAPL)** on a **1-day (1D) timeframe**, focusing on a backtested trading strategy. Here’s a detailed breakdown:


### **Top Navigation Bar**  
- **Left**:  
  - `AAPL` (stock ticker) + `1D` (timeframe) + `NASDAQ` (exchange).  
  - `Apple Inc.` label.  
  - Price: `237.88 USD` (current), `-1.81 (-0.76%)` (change, red = down).  
  - `SELL` (236.90) and `BUY` (237.21) buttons (order entry).  
- **Middle**:  
  - `Indicators` (dropdown for technical indicators).  
  - `Alert` (set price alerts).  
  - `Replay` (replay historical price action).  
  - Navigation arrows (back/forward).  
- **Right**:  
  - `TradingView` (account menu).  
  - Icons: Theme (light/dark), settings, full-screen, camera, `Publish` (share chart).  


### **Main Chart Area**  
- **Price Chart**: Blue line showing AAPL’s price from 2024–2025.  
- **Trade Markers**:  
  - `long`/`short` labels (trade direction: long = buy, short = sell).  
  - `+/-` numbers (profit/loss per trade, e.g., `+306` = $306 profit, `-319` = $319 loss).  
  - `sl/tp` (stop-loss/take-profit levels, marked with arrows).  
- **Time Axis**: X-axis with months (Mar, May, Jul, Sep, Nov, 2025, Mar, May, Jul, Sep).  
- **Y-Axis**: Price (USD) from 150–275.  
- **Strategy Label**: `Technicals Strategy All` (selected strategy).  


### **Strategy Tabs**  
Below the chart:  
- `Pine Editor` (code the strategy), `Strategy Tester` (test performance), `Replay Trading` (simulate trades), `Trading Panel` (live trading).  


### **Technical Strategy Report (Overview Tab)**  
- **Date Range**: `Dec 12, 1980 – Sep 8, 2025` (backtest period).  
- **Metrics**:  
  - `Total P&L`: `+169,528.98 USD (+16.89%)` (total profit).  
  - `Max equity drawdown`: `147,674.91 USD (13.88%)` (largest loss from peak).  
  - `Total trades`: `325` (number of trades).  
  - `Profitable trades`: `38.46% (125/325)` (win rate).  
  - `Profit factor`: `1.167` (gross profit/gross loss, >1 = profitable).  


### **Equity Curve Chart**  
- **Green Line**: Strategy’s cumulative profit/loss over time (1981–2025).  
- **Red Line**: `Buy & hold` (passive investment, for comparison).  
- **Y-Axis**: Equity (USD) from -50k to 150k.  
- **Key Value**: `165,027.78` (current equity).  


### **Bottom Controls**  
- Checkboxes: `Buy & hold` (toggle comparison), `Trades run-up & drawdown` (show trade-level volatility).  
- `Absolute`/`Percentage` (toggle equity curve display mode).  


### **Left Sidebar**  
Icons for tools (e.g., drawing, indicators, chat, settings) and account features.  


### **Purpose**  
This view analyzes a backtested trading strategy for AAPL, showing price action, trade signals, and performance metrics (profit, drawdown, win rate) to evaluate strategy viability. The equity curve compares the strategy’s returns to a passive “buy and hold” approach.


**Описание:** This TradingView image displays a **technical analysis chart for Apple Inc. (NASDAQ: AAPL)** with a 1-day (1D) timeframe, alongside a **strategy performance report**. Here’s a detailed breakdown:  


### **Top Bar (UI Elements)**  
- **Symbol & Exchange**: “Apple Inc · 1D · NASDAQ” (current stock, timeframe, exchange).  
- **Price Data**: Current price `237.88 USD` (down `1.81 (-0.76%)`), with “SELL” (`236.90`) and “BUY” (`237.21`) buttons (order entry).  
- **Tools**: Icons for *Indicators* (add technical indicators), *Alert* (price alerts), *Replay* (backtest replay), and *Publish* (share chart).  
- **Right Sidebar**: “TradingView” dropdown, USD currency selector, and additional tools (e.g., chart type, drawing, chat).  


### **Main Chart (Price Action + Strategy Signals)**  
- **Price Line**: Blue line showing AAPL’s price from 2024–2025.  
- **Strategy Signals**:  
  - **Arrows**: Pink arrows mark trade entries: `long` (upward, green) or `short` (downward, red).  
  - **Profit/Loss (P/L)**: Numbers next to arrows (e.g., `+306`, `-319`) show trade P/L.  
  - **Stop-Loss/Take-Profit (sl/tp)**: Labels like `-261 sl/tp` indicate stop-loss/take-profit levels.  
- **Time Axis**: X-axis spans 2024–2025 (Mar, May, Jul, Sep, Nov, 2025, Mar, May, Jul, Sep).  
- **Y-Axis**: Price scale (USD) from ~150 to 275.  


### **Strategy Report Section**  
- **Tabs**: *Pine Editor* (code editor), *Strategy Tester* (backtest), *Replay Trading* (simulate trades), *Trading Panel* (live trading).  
- **Report Tabs**: *Overview* (active), *Performance*, *Trades analysis*, *Risk/performance ratios*, *List of trades*.  
- **Metrics**:  
  - *Total P&L*: `+169,528.98 USD (+16.89%)` (overall profit).  
  - *Max equity drawdown*: `147,674.91 USD (13.88%)` (largest loss from peak).  
  - *Total trades*: `325` (number of trades).  
  - *Profitable trades*: `38.46% (125/325)` (win rate).  
  - *Profit factor*: `1.167` (ratio of gross profit to gross loss).  
- **Equity Curve**: Green line (strategy’s cumulative profit) vs. red line (benchmark, e.g., buy-and-hold) over time (1981–2025).  
- **Checkboxes**: *Buy & hold* (toggle benchmark), *Trades run-up & drawdown* (show trade-level metrics).  
- **Scale Toggle**: *Absolute* (current) vs. *Percentage* (view returns as %).  


### **Purpose**  
The chart visualizes Apple’s price action with a trading strategy’s signals (entries, P/L, sl/tp). The report quantifies the strategy’s performance (profit, drawdown, win rate) to evaluate its effectiveness.  


This layout combines real-time price data, strategy execution signals, and backtest results to help traders analyze and optimize trading strategies.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43579867486/original/3YD5pB_ofdzkbzcuMMrPWK4H3YUUEMgKLA.png?1757507988)

**Описание:** This TradingView interface displays a **technical analysis and backtesting report for Apple Inc. (NASDAQ: AAPL)** on a 1-day (1D) timeframe. Here’s a detailed breakdown:  


### **Top Navigation Bar**  
- **Left**:  
  - `AAPL` (ticker), `1D` (timeframe), `+` (add symbol), `D` (day), `Indicators` (dropdown), `Alert` (notifications), `Replay` (backtest replay).  
  - `TradingView` (logo), `Publish` (share chart).  
- **Right**:  
  - `USD` (currency), `ADJ` (adjusted data toggle), `11:14:52 UTC-4` (timestamp).  


### **Chart Section**  
- **Symbol Info**: `Apple Inc. · 1D · NASDAQ` with current price: `236.13 -1.75 (-0.74%)`.  
- **Order Buttons**: `SELL 236.11` (red) and `BUY 236.14` (blue) for quick trading.  
- **Strategy Label**: `Technicals Strategy All` (active strategy).  
- **Chart**:  
  - Blue line = price trend (2023–2025).  
  - Pink/red arrows = trade signals: `long` (green up arrows) and `short` (red down arrows) with profit/loss values (e.g., `+330`, `-388`).  
  - Green icons = trade entries; purple icons = exits.  
- **Timeframe Tabs**: `1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All` (select chart period).  


### **Strategy Report Panel**  
- **Tabs**: `Pine Editor` (code), `Strategy Tester` (active), `Replay Trading`, `Trading Panel`.  
- **Report Tabs**: `Overview` (active), `Performance`, `Trades analysis`, `Risk/performance ratios`, `List of trades`.  
- **Date Range**: `Dec 12, 1980 — Sep 9, 2025` (backtest period).  
- **Key Metrics**:  
  - `Total P&L`: `+169,066.98 USD (+16.85%)` (total profit).  
  - `Max equity drawdown`: `147,674.91 USD (13.88%)` (largest loss).  
  - `Total trades`: `325`, `Profitable trades`: `38.46% (125/325)`, `Profit factor`: `1.167`.  
- **Graphs**:  
  - **Cumulative P&L** (teal line): Tracks overall profit/loss over time.  
  - **Run-up** (light teal): Periods of profit growth.  
  - **Drawdown** (red): Periods of loss.  
  - **Bars**: Green = profitable trades, red = losing trades (volume-like).  
- **Tooltip**: `Trade #284 Long` (details: `Cumulative P&L 140,054.10 USD`, `Run-up 5,986.72 USD`, `Drawdown 920.16 USD`, date `Wed, Jul 31, 2019`).  


### **Left Sidebar**  
Icons for tools: drawing (pencil), indicators, alerts, replay, chat, etc.  


### **Bottom Controls**  
- `Buy & hold` (checkbox, toggles comparison to passive investing).  
- `Trades run-up & drawdown` (checkbox, toggles trade-specific metrics).  
- `Absolute`/`Percentage` (toggle P&L display mode).  


This layout combines real-time price data, backtested strategy performance, and interactive tools for analyzing Apple’s stock using a custom “Technicals Strategy.”


**Описание:** This TradingView image displays a **1-day (1D) chart for Apple Inc. (NASDAQ: AAPL)** with a technical trading strategy overlay, performance metrics, and a detailed strategy report. Here’s a breakdown of all elements:  


### **Top Bar (Navigation & Symbol Info)**  
- **Left**: “AAPL” (symbol), “1D” (timeframe), and buttons for *New chart*, *Daily timeframe*, *Indicators*, *Alert*, *Replay*, and navigation arrows.  
- **Center**: Symbol details: *Apple Inc. · 1D · NASDAQ*, current price `236.13 USD` (down `1.75 (-0.74%)`), and buy/sell buttons (`236.11 SELL`, `236.14 BUY`).  
- **Right**: “TradingView” dropdown, *Publish* button, and a “USD” currency selector.  


### **Main Chart (Price Action + Strategy Signals)**  
- **Y-axis**: Price scale (USD), ranging from ~150 to 275.  
- **X-axis**: Time (Nov 2023 – Sep 2025).  
- **Price Line**: Blue line showing AAPL’s price trend.  
- **Strategy Markers**: Arrows (long = green up, short = red down) with labels like `long +330`, `short -388`, etc., indicating trade signals, stop-loss (sl), take-profit (tp), and profit/loss values.  
- **Indicators**: A volume-style indicator (teal/red bars) at the bottom of the chart, plus a “Technicals Strategy All” label (strategy name).  


### **Timeframe & Date Controls**  
- **Timeframe Buttons**: `1D`, `5D`, `1M`, `3M`, `6M`, `YTD`, `1Y`, `5Y`, `All` (to switch chart periods).  
- **Date Range**: `11:14:52 UTC-4` (current time) and `ADJ` (adjusted data toggle).  


### **Strategy Report Section**  
Tabs: *Pine Editor*, *Strategy Tester*, *Replay Trading*, *Trading Panel* (current: *Trading Panel*).  

#### **Overview Tab (Key Metrics)**  
- **Metrics**:  
  - *Total P&L*: `+169,066.98 USD (+16.85%)` (total profit/loss).  
  - *Max equity drawdown*: `147,674.91 USD (13.88%)` (largest loss from a peak).  
  - *Total trades*: `325` (number of trades).  
  - *Profitable trades*: `38.46% (125/325)` (win rate).  
  - *Profit factor*: `1.167` (ratio of gross profit to gross loss).  
- **Chart**: Cumulative P&L (teal line), run-up (light teal), and drawdown (red) over time (2006–2025). A tooltip shows `Trade #284 Long` details (cumulative P&L, run-up, drawdown, date: Jul 31, 2019).  
- **Toggle Options**: *Buy & hold* (compare to passive investing) and *Trades run-up & drawdown* (show/hide metrics).  
- **Scale**: *Absolute* (current) / *Percentage* (toggle for P&L display).  


### **Sidebar (Left)**  
Icons for tools (e.g., drawing, indicators, chat, settings) and a “PRO” badge (premium feature).  


### **Purpose**  
The image analyzes Apple’s price action using a technical strategy, showing trade signals, historical performance, and key metrics (profit, drawdown, win rate) to evaluate the strategy’s effectiveness.


