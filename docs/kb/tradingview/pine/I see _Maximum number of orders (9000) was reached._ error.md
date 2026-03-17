# I see "Maximum number of orders (9000) was reached." error

**URL:** https://www.tradingview.com/support/solutions/43000478442-i-see-maximum-number-of-orders-9000-was-reached-error/

---

- [ Help Center ](/) - / - / [ I see "Maximum number of orders (9000) was reached." error ](/support/solutions/43000478442-i-see-maximum-number-of-orders-9000-was-reached-error/) # I see "Maximum number of orders (9000) was reached." error This error means that the strategy placed more orders, or closed more trades, than the maximum number allowed. To avoid this error, [convert your strategy ](https://www.tradingview.com/support/solutions/43000530720-how-can-i-convert-scripts-to-a-newer-pine-version/)to Pine Script v6. In v6, all orders above the limit are trimmed: each new order appears in the List of Trades, and the oldest order above the order limit is removed. Alternatively, you can limit the dates when a strategy places orders by checking for a time range in the order condition. The following example script establishes a time range for placing orders by checking whether the [time](https://www.tradingview.com/pine-script-reference/v5/#var_time) of the current bar is between two [timestamps](https://www.tradingview.com/pine-script-reference/v5/#fun_timestamp). Pine Script® // @version= 6 strategy ( "My strategy" , overlay = true ) enableFilter = input ( true , "Enable Backtesting Range Filtering" ) fromDate = input.time ( timestamp ( "20 Jul 2023 00:00 +0300" ) , "Start Date" ) toDate = input.time ( timestamp ( "20 Jul 2099 00:00 +0300" ) , "End Date" ) tradeDateIsAllowed = not enableFilter or ( time &gt;= fromDate and time &lt;= toDate ) longCondition = ta.crossover ( ta.sma ( close , 14 ) , ta.sma ( close , 28 )) shortCondition = ta.crossunder ( ta.sma ( close , 14 ) , ta.sma ( close , 28 )) if longCondition and tradeDateIsAllowed strategy.entry ( "Long" , strategy.long ) if shortCondition and tradeDateIsAllowed strategy.entry ( "Short" , strategy.short ) Expand 12 lines Previous Previous My strategy processes orders one candle after the condition has been met Next Next I see "The script creates to many plots (x). The limit is 64" error Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43318982844/original/GkHaE9SQHAwbxNlR_Y9I94BalBK6xPyVLw.png?1651230228)

**Описание:** This TradingView image displays a stock chart for **Apple Inc. (NASDAQ)** with a 1-day (1D) time frame. Here’s a detailed breakdown of all elements:  


### **Header & Ticker Info**  
- **Title**: “Apple Inc · 1D · NASDAQ · TradingView” identifies the asset, time frame, exchange, and platform.  
- **Price Metrics**:  
  - `O159.25` (Open price: $159.25)  
  - `H164.52` (High price: $164.52)  
  - A sun icon (likely indicating market hours or a theme toggle).  


### **Price Display**  
- **Current Price**: `159.05` (red box, indicating a drop from the prior close) with a change of `+0.10` (positive movement).  
- **Bid/Ask or Alternative Price**: `159.15` (blue box, typically representing the bid or a related price level).  


### **Strategy & Error Notification**  
- **Strategy Label**: “My strategy” (a user-defined trading strategy).  
- **Error Alert**: A red exclamation mark icon next to “My strategy” triggers a pop-up:  
  - **Title**: “Study Error” (red text, indicating a critical issue).  
  - **Message**: “Maximum number of orders (9000) was reached.” (Explains the error: the strategy hit a limit on order quantity, likely due to excessive backtesting or real-time order generation).  


### **Chart Context**  
- The background shows a partial price chart (dotted lines suggest support/resistance levels or moving averages, though details are truncated).  


### **Purpose of Elements**  
- **Price Boxes**: Show real-time/current price, change, and alternative pricing (e.g., bid/ask).  
- **Strategy Label**: Links to a user’s custom trading logic.  
- **Error Pop-Up**: Alerts the user to a technical issue (order limit exceeded) that may require troubleshooting (e.g., reducing strategy complexity or order frequency).  


This layout is typical of TradingView’s interface, combining real-time market data, strategy management, and error notifications to help traders monitor and troubleshoot their setups.


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

