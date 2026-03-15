# How to use Long and Short Position drawing tools?

**URL:** https://www.tradingview.com/support/solutions/43000475660-how-to-use-long-and-short-position-drawing-tools/

---

- [ Help Center ](/) - / - / [ How to use various drawing tools ](/support/folders/43000547459-how-to-use-various-drawing-tools/) - / [ How to use Long and Short Position drawing tools? ](/support/solutions/43000475660-how-to-use-long-and-short-position-drawing-tools/) # How to use Long and Short Position drawing tools? This feature lets you estimate how an order will go if you go long or short, shows the Profit & Loss (P&L) and estimates risk and closing account balance when the price reaches your profit target or stop loss levels. You can practice placing orders and seeing results without actually having to place the orders — get confident and knowledgeable before risking real money in the markets. Calculate your Position Size and Account Balance 1. Create a Long Position or Short Position drawing. 2. In the properties dialog of the instrument, enter your initial account size in the default or selected currency, and the risk amount either in absolute numbers or as a % of your account size. You can also enter the Lot size and set Leverage, change the Entry price, Profit or Stop level, and QTY precision if needed. Click OK to accept. 3. Drawing tool tags will show you position size (1) and account balance when positions are closed after reaching either the Take Profit (2) or the Stop Loss (3) level. 4. And you can see more useful information on Long and Short Position drawing tools, such as Target and Stop levels (in price, percentage, and ticks accordingly), Profit & Loss, quantity (Qty), Risk/Reward Ratio, and P&L. How are the Position Size, Account Balance, Target and Stop levels, Risk/Reward Ratio, and P&L calculated? Long Position: 1 Position Size Qty = min(QtyRisk, QtyLvg), where: QtyRisk = (RiskSize / ((EntryPrice – StopPrice) * Point value)) / Lot size QtyLvg = (Account size * Leverage / EntryPrice) * Point value / Lot size 2 Account Balance when the position is closed after reaching the Take Profit level Amount = AccountSize + (ProfitPrice – EntryPrice) * Qty * Point value * Lot size 3 Account Balance when the position is closed after reaching the Stop Loss level Amount = AccountSize — (EntryPrice – StopLevel) * Qty * Point value * Lot size 4 The target level is showing the difference between the Entry price and the Profit price TP price offset = ProfitPrice - EntryPrice TP percent offset = ((ProfitPrice - EntryPrice) / EntryPrice) * 100 5 The stop level is showing the difference between the Stop price and the Entry price SL price offset = EntryPrice - StopPrice SL percent offset = ((EntryPrice - StopPrice) / EntryPrice) * 100 6 Risk/reward ratio Risk/reward ratio = (ProfitPrice - EntryPrice) / (EntryPrice - StopPrice) 7 Profit P&L — this is the difference by which the amount will increase when the profit level is reached P&L = (ProfitPrice - EntryPrice) * Qty * Point value* Lot size 8 Loss P&L — this is the difference by which the amount will decrease when the stop level is reached P&L = (StopPrice - EntryPrice) * Qty * Point value * Lot size 9 Open P&L when there are no bars within the Long Position tool area, but the tool itself is placed within the historical data Open P&L = PositionRightEdgeClosePrice - EntryPrice Open P&L when there are bars within the Long Position tool area, but the entry price level is not reached by any bar Open P&L when neither the Take Profit nor the Stop Loss levels are reached by the price within the Long Position tool area Closed P&L when the position is closed after the Take Profit level is reached Closed P&L = TP price offset Closed P&L when the position is closed after the Stop Loss level is reached Closed P&L = SL price offset Open P&L when the Long Position tool is placed in the future, where there are no bars yet Open P&L = LastPrice - EntryPrice Short Position: 1 Position Size Qty = min(QtyRisk, QtyLvg), where: QtyRisk = (RiskSize / ((StopPrice – EntryPrice) * Point Value)) / Lot size QtyLvg = (Account size * Leverage / EntryPrice) * Point value / Lot size 2 Account Balance when the position is closed after reaching the Take Profit level Amount = AccountSize + (EntryPrice – ProfitLevel) * Qty * Point value * Lot size 3 Account Balance when the position is closed after reaching the Stop Loss level Amount = AccountSize — (StopLevel – EntryPrice) * Qty * Point value * Lot size 4 The target level is showing the difference between the Entry price and the Profit price TP price offset = EntryPrice - ProfitPrice TP percent offset = ((EntryPrice - ProfitPrice) / EntryPrice) * 100 5 The stop level is showing the difference between the Stop price and the Entry price Stop level (for price) = StopPrice - EntryPrice Stop level (in percentage) = ((StopPrice - EntryPrice) / EntryPrice) * 100 6 Risk/reward ratio Risk/reward ratio = (EntryPrice - ProfitPrice) / (StopPrice - EntryPrice) 7 Profit P&L — this is the difference by which the amount will increase when the profit level is reached P&L = (EntryPrice - ProfitPrice) * Qty * Point value * Lot size 8 Loss P&L — this is the difference by which the amount will decrease when the stop level is reached P&L = (EntryPrice - StopPrice) * Qty * Point value * Lot size 9 Open P&L when there are no bars within the Short Position tool area, but the tool itself is placed within the historical data Open P&L = EntryPrice - PositionRightEdgeClosePrice Open P&L when there are bars within the Short Position tool area, but the entry price level is not reached by any bar Open P&L when neither the Take Profit nor the Stop Loss levels are reached by the price within the Short Position tool area Closed P&L when the position is closed after the Take Profit level is reached Closed P&L = TP price offset Closed P&L when the position is closed after the Stop Loss level is reached Closed P&L = SL price offset Open P&L when the Short Position tool is placed in the future, where there are no bars yet Open P&L = EntryPrice - LastPrice - AccountSize — initial account size specified in the settings - RiskSize = Risk, if risk is selected in absolute numbers, - Risk / 100 * AccountSize, if risk is selected as a percentage of account size. Display performance in the Compact mode Try using the Compact stats mode if you want the position performance tags to consume less space on the chart. You can enable it by choosing the Compact stats mode checkbox in Settings. Also read: - [How to trade on TradingView](https://www.tradingview.com/support/solutions/43000756695-how-to-trade-on-tradingview/) - [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/) - [The technical analysis essentials](https://www.tradingview.com/support/solutions/43000759577-the-technical-analysis-essentials-with-tradingview/) - [Introduction to fundamental analysis](https://www.tradingview.com/support/solutions/43000759574-introduction-to-fundamental-analysis-on-tradingview/) - [Portfolios: track your assets, know your trades](https://www.tradingview.com/support/solutions/43000760937-tradingview-portfolios-track-your-assets-know-your-trades/) Previous Previous I can't find drawing tools (fib retracement, trend line or other) Next Next What is the Cross Line drawing tool? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43605776510/original/xsgP4EcTt06uOc7ApXAp05hNKiGoUDQnWw.png?1770391486)

**Описание:** This TradingView chart displays **Apple Inc. (AAPL)** on the NASDAQ exchange, using a **30-minute (30m)** candlestick time frame. Here’s a detailed breakdown of the UI elements:  


### **Top Toolbar**  
- **Symbol/Timeframe**: “AAPL” (symbol), “30m” (timeframe dropdown), and “NASDAQ” (exchange).  
- **Tools**:  
  - `Indicators` (dropdown for adding technical indicators).  
  - `Alert` (set price alerts), `Replay` (replay market data), and navigation arrows (back/forward).  
  - `CC Layout` (customize chart layout), `Trade` (execute trades), `Publish` (share chart).  


### **Left Sidebar (Drawing/Tools)**  
- **Drawing Tools**: Icons for lines, shapes, and annotations (e.g., trendlines, Fibonacci).  
- **Expanded Menu (Highlighted)**: A dropdown showing indicator categories:  
  - **PROJECTION**: “Long Position” (project long trade setups), “Short Position” (project short trade setups).  
  - **Forecast/Bars Pattern/Ghost Feed/Projection**: Additional predictive tools.  
  - **VOLUME-BASED**: “Anchored VWAP,” “Fixed Range Volume Profile,” etc. (volume analysis).  
  - **MEASURER**: “Price Range,” “Date Range,” etc. (measure price/time ranges).  


### **Main Chart Area**  
- **Candlestick Chart**: Green candles = price increase; red candles = price decrease.  
- **Highlighted Zones**: Light green (bullish) and pink (bearish) shaded areas (likely projection or support/resistance zones).  


### **Right Sidebar (Price/Info)**  
- **Price Levels**: Current price (`260.85`/`260.75`), bid/ask, and historical levels (e.g., `259.62`, `258.39`).  
- **Icons**: Chart settings, trade, chat, and other utilities (e.g., clock, calendar).  


### **Bottom Toolbar**  
- **Time/Date**: X-axis shows timestamps (12, 13, 14 with 18:00 markers).  
- **Status**: “16:52:30 UTC” (current time), “RTH” (regular trading hours), “ADJ” (adjusted data).  


### **Purpose**  
This interface is used for **technical analysis**—traders analyze price action, add indicators (via the left menu), and plan trades (long/short positions) using the chart’s visual cues (candles, zones) and tools.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43605776602/original/psvXeB5fELCLLMtIDIowTwJJYSuuLsfh-g.png?1770391504)

**Описание:** The image shows a **TradingView chart interface** with a **Long Position configuration panel** open on the right. Here’s a detailed breakdown:  


### **Left: Candlestick Chart**  
- **Candlesticks**: Green (bullish) and red (bearish) bars representing price action over time.  
- **Color Zones**:  
  - *Green zone* (top): Profit target area (labeled “Target: 8.70 (3.246%) 870, Amount: 1250”).  
  - *Red zone* (bottom): Stop-loss area (labeled “Stop: 8.70 (3.246%) 870, Amount: 750”).  
- **Annotations**:  
  - A green tooltip: “Closed P&L: 8.70, Qty: 28, Risk/Reward Ratio: 1” (summarizes trade results).  
  - A dashed trendline (likely a support/resistance or trend indicator).  


### **Right: “Long Position” Panel**  
A modal for configuring a long trade, with three tabs: *Inputs* (active), *Style*, *Visibility*.  

#### **Inputs Tab (Active)**  
- **Account Settings**:  
  - *Account size*: `1000` (dropdown: “Default”).  
  - *Lot size*: `1`.  
  - *Risk*: `25.00` (dropdown: “%”).  
  - *Entry price*: `268.06`.  
  - *Leverage*: `10000.0`.  

- **Profit Level**:  
  - *Ticks*: `870`.  
  - *Price*: `276.76` (calculated target price).  

- **Stop Level**:  
  - *Ticks*: `870`.  
  - *Price*: `259.36` (calculated stop-loss price).  

- **QTY precision**: Dropdown set to “Default”.  

- **Buttons**:  
  - *Template*: Dropdown (for saving/loading trade templates).  
  - *Cancel*: Closes the panel.  
  - *Ok*: Confirms and applies the trade configuration.  


### **UI Elements**  
- **Panel Header**: “Long Position” (with a pencil icon for editing, and an “X” to close).  
- **Tabs**: *Inputs* (selected, black underline), *Style*, *Visibility* (for customizing the position’s appearance/visibility).  


### **Purpose**  
The chart visualizes price action with profit/stop zones, while the panel configures trade parameters (account size, risk, entry/exit levels) for a long position. The “Closed P&L” tooltip confirms a prior trade’s results (risk/reward ratio 1:1).


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43606022531/original/elfs_kTDRPLCtXn0vraPxauaVD2C9CPcKg.png?1770632963)

**Описание:** This TradingView chart displays a **candlestick chart** (with green/red candles representing price movements) overlaid with trade management elements:  

### 1. Trade Zones (Colored Rectangles)  
- **Red Zone (Top)**: Marks the **stop-loss area** (risk zone). A dashed trendline connects its top-left and top-right corners, defining the stop level.  
- **Light Green Zone (Bottom)**: Marks the **target area** (reward zone). A dashed trendline connects its bottom-left and bottom-right corners, defining the target level.  


### 2. Key Labels & Annotations  
- **Label 1 (Red Box)**: Shows a *closed trade*:  
  - `Closed P&L: -0.38` (Profit/Loss: -$0.38, a loss).  
  - `Qty: 657` (Quantity of shares/contracts traded).  
  - `Risk/Reward Ratio: 1` (Risk and reward were equal, typical of a break-even or 1:1 trade).  

- **Label 2 (Green Box)**: Shows the *target details*:  
  - `Target: 0.38 (0.153%) 38, Amount: 1250` (Target profit: $0.38 per unit, 0.153% of position, 38 total profit, $1250 position size).  

- **Label 3 (Red Box)**: Shows the *stop-loss details*:  
  - `Stop: 0.38 (0.153%) 38, Amount: 750` (Stop-loss risk: $0.38 per unit, 0.153% of position, 38 total risk, $750 position size).  


### 3. UI Elements  
- **Blue Squares**: Anchor points for the trade zones (define the stop-loss/target boundaries).  
- **Dashed Trendlines**: Connect the blue squares to visualize the stop-loss (top) and target (bottom) levels.  


### Purpose  
The chart illustrates a completed trade with:  
- A **stop-loss** (red zone) to limit risk.  
- A **target** (green zone) to lock in profit.  
- A 1:1 risk/reward ratio (equal risk and reward).  
- Closed P&L, quantity, and position size details to evaluate trade performance.  

This layout helps traders analyze risk management, trade execution, and performance.


