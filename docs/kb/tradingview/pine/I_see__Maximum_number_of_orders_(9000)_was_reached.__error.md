# I see "Maximum number of orders (9000) was reached." error

**URL:** https://www.tradingview.com/support/solutions/43000478442-i-see-maximum-number-of-orders-9000-was-reached-error/

---

- [ Help Center ](/)
- / 
- / [ I see "Maximum number of orders (9000) was reached." error ](/support/solutions/43000478442-i-see-maximum-number-of-orders-9000-was-reached-error/)

# I see "Maximum number of orders (9000) was reached." error 
 This error means that the strategy placed more orders, or closed more trades, than the maximum number allowed.

To avoid this error, [convert your strategy ](https://www.tradingview.com/support/solutions/43000530720-how-can-i-convert-scripts-to-a-newer-pine-version/)to Pine Script v6. In v6, all orders above the limit are trimmed: each new order appears in the List of Trades, and the oldest order above the order limit is removed.

Alternatively, you can limit the dates when a strategy places orders by checking for a time range in the order condition. The following example script establishes a time range for placing orders by checking whether the [time](https://www.tradingview.com/pine-script-reference/v5/#var_time) of the current bar is between two [timestamps](https://www.tradingview.com/pine-script-reference/v5/#fun_timestamp).
 Pine Script® // @version= 6 
 strategy ( "My strategy" , overlay = true ) 

 enableFilter = input ( true , "Enable Backtesting Range Filtering" ) 
 fromDate = input.time ( timestamp ( "20 Jul 2023 00:00 +0300" ) , "Start Date" ) 
 toDate = input.time ( timestamp ( "20 Jul 2099 00:00 +0300" ) , "End Date" ) 

 tradeDateIsAllowed = not enableFilter or ( time >= fromDate and time <= toDate ) 

 longCondition = ta.crossover ( ta.sma ( close , 14 ) , ta.sma ( close , 28 )) 
 shortCondition = ta.crossunder ( ta.sma ( close , 14 ) , ta.sma ( close , 28 )) 

 if longCondition and tradeDateIsAllowed 
 strategy.entry ( "Long" , strategy.long ) 

 if shortCondition and tradeDateIsAllowed 
 strategy.entry ( "Short" , strategy.short ) 
 Expand 12 lines Previous Previous My strategy processes orders one candle after the condition has been met Next Next I see "The script creates to many plots (x). The limit is 64" error Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43318982844/original/GkHaE9SQHAwbxNlR_Y9I94BalBK6xPyVLw.png?1651230228

**Описание:**

This image shows a **TradingView** interface displaying a stock chart for **Apple Inc. (NASDAQ)** with a focus on a technical analysis error. Here’s a detailed breakdown of all elements:  


### 1. **Header/Title Bar**  
- **Stock & Exchange Info**:  
  - `Apple Inc · 1D · NASDAQ · TradingView`: Identifies the asset (Apple Inc.), time frame (1D = 1 day), exchange (NASDAQ), and platform (TradingView).  
- **Price Data (Top Right)**:  
  - `O159.25 H164.52`: Shows the **Open** price (`O`) and **High** price (`H`) for the day.  


### 2. **Price Display (Left)**  
- **Current Price**:  
  - `159.05` (red box): The *last traded price* (or current price) for Apple, colored red (indicating a drop from the previous price).  
- **Price Change**:  
  - `0.10`: The change in price (e.g., +$0.10 or -$0.10; context suggests a small increase, as the “last price” is slightly higher than the “bid/ask” below).  
- **Bid/Ask Prices**:  
  - `159.15` (blue box): The *ask price* (price to buy) or *bid price* (price to sell); blue typically denotes the “best” actionable price (e.g., the ask price for buying).  


### 3. **Strategy & Error Notification**  
- **“My strategy” Label**:  
  - Text indicating a custom trading strategy is applied to the chart.  
- **Exclamation Mark Icon**:  
  - A red exclamation mark (⚠️) next to “My strategy” signals a problem with the strategy.  
- **Error Pop-Up Box**:  
  - **Title**: `! Study Error` (red text, emphasizing the issue).  
  - **Message**: `Maximum number of orders (9000) was reached.`  
    - This means the technical study/strategy attempted to generate more than 9,000 orders (e.g., for backtesting or real-time analysis), exceeding TradingView’s limit.  


### 4. **Chart Background (Subtle Details)**  
- Dotted horizontal lines (e.g., teal and orange) suggest *support/resistance levels* or *indicator lines* on the chart (partially visible behind the error pop-up).  


### Purpose of Elements  
- **Price Boxes**: Show real-time (or latest) price data for Apple.  
- **Error Pop-Up**: Alerts the user to a technical issue with their strategy (too many orders generated).  
- **Exclamation Mark**: Draws attention to the error.  


This interface is typical of TradingView’s charting tool, where users analyze stocks, apply strategies, and receive error notifications for technical issues.

---

