# I see 'Cannot create an order with negative quantity' error

**URL:** https://www.tradingview.com/support/solutions/43000651235-i-see-cannot-create-an-order-with-negative-quantity-error/

---

- [ Help Center ](/)
- / 
- / [ I see 'Cannot create an order with negative quantity' error ](/support/solutions/43000651235-i-see-cannot-create-an-order-with-negative-quantity-error/)

# I see 'Cannot create an order with negative quantity' error 
 This error appears when the strategy calculates the size of its entry as the percentage of its equity. If the equity falls below 0, the size of the position also becomes negative, which is not possible and results in a runtime error.

The best way to fix this issue is to [convert the strategy](https://www.tradingview.com/support/solutions/43000530720/) to Pine Script v6. In Pine v6, the strategy by default enforces limits on position size. If the equity of the strategy starts falling too much, the existing positions will be forcibly liquidated by margin calls, and if the funds run out fully, the strategy will not attempt to create new orders with negative quantity, avoiding this error.

If you want to learn more about the source of this error and how to avoid it in earlier Pine versions, consult the text below.

if the strategy equity becomes negative and the total number of contracts calculated for the [strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy%7Bdot%7Dentry) or [strategy.order()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy%7Bdot%7Dorder) functions is a negative. It can be avoided by tweaking the strategy settings from the Properties menu or by directly changing the logic of the strategy.

#### Source of the error 

Let’s take a look at the script where the order quantity is calculated as a percentage of equity, either through the Order Size setting in the strategy settings, or via the [strategy_percent_of_equity](https://www.tradingview.com/pine-script-reference/v5/#var_strategy%7Bdot%7Dpercent_of_equity) constant in the Pine source of the strategy. On each bar, the *[strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy%7Bdot%7Dentry)* function is called to enter the position:

 Pine Script® // @version= 5 
 strategy ( "negative_qty" , default_qty_type = strategy.percent_of_equity ) 

 strategy.entry ( "Short" , strategy.short ) 
 plot ( strategy.equity ) 
 When adding the script to a *NASDAQ:AAPL* chart for *1D* timeframe, the script crashes with a runtime error:

Cannot create an order with negative quantity. Current qty_type is percent_of_equity and equity is less than 0 To understand the reason for this error, you should plot the capital using the *[strategy.equity](https://www.tradingview.com/pine-script-reference/v5/#var_strategy%7Bdot%7Dequity)* variable and add a constraint on the call to the [*strategy.equity()*](https://www.tradingview.com/pine-script-reference/v5/#var_strategy%7Bdot%7Dequity) function using any condition operator. That way, the function for entering a position will not be called on each bar (and will not cause additional recalculation of parameters, including the *qty* value) and the script will be calculated successfully:

 Pine Script® // @version= 5 
 strategy ( "negative_qty" , default_qty_type = strategy.percent_of_equity ) 

 if strategy.equity > 0 
 strategy.entry ( "Short" , strategy.short ) 

 hline ( 0 , "zero line" , color = color.black , linestyle = hline.style_dashed ) 
 plot ( strategy.equity , color = color.black , linewidth = 3 ) 
 Expand 3 lines At the opening of the second bar ([*bar_index*](https://www.tradingview.com/pine-script-reference/v5/#var_bar_index)* = 1*), the strategy enters a short position. But with the growth of the AAPL value, the profit (the value of the *[strategy.openprofit](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}openprofit)* variable) from the open short position *Short* plummets, and in the end the capital of the strategy (* [strategy.equity](https://www.tradingview.com/pine-script-reference/v5/#var_strategy%7Bdot%7Dequity)* = * [strategy.initial_capital](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}initial_capital)* + * [strategy.netprofit](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}netprofit)* + * [strategy.openprofit](https://www.tradingview.com/pine-script-reference/v5/#var_strategy{dot}openprofit)* ) becomes negative.

The number of contracts calculated by the strategy engine is calculated as *qty = (order size * equity / 100) / close*. The area where the strategy capital turns into negative values can be displayed as follows:

 Pine Script® // @version= 5 
 strategy ( "negative_qty" , default_qty_type = strategy.percent_of_equity ) 

 if strategy.equity > 0 
 strategy.entry ( "Short" , strategy.short ) 

 hline ( 0 , "zero line" , color = color.black , linestyle = hline.style_dashed ) 
 plot ( strategy.equity , color = color.black , linewidth = 3 ) 

 equity_p = 1 // percents of equity order size value (1% is def ault) 
 qty = ( equity_p * strategy.equity / 100 ) / close 

 if qty <= -1 
 var l1 = label.new ( bar_index , strategy.equity , text = "Negative qty_value at \n bar index: " + str.tostring ( bar_index ) + ".\n" + "Order size: " + str.tostring ( math.round ( qty )) , color = color.white ) 
 var l2 = label.new ( bar_index - 1 , strategy.equity [ 1 ] , text = "Order size : " + str.tostring ( math.round ( qty [ 1 ])) , color = color.white ) 
 var l3 = label.new ( bar_index - 2 , strategy.equity [ 2 ] , text = "Order size: " + str.tostring ( math.round ( qty [ 2 ])) , color = color.white ) 

 bgcolor ( qty > -1 ? color.green : color.red ) 
 Expand 13 lines The screenshot shows the label located on the negative equity section, where the resulting number of contracts is - 2. The number of contracts on the green section is >= 0:

If, when calculating a strategy, * [strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy%7Bdot%7Dentry)* is called on a bar with negative equity (and on which the number of contracts is negative), the calculation of the strategy stops with an error.

#### How do I fix this? 

As a rule, this error does not appear in a correctly implemented strategy. To avoid mistakes, the strategy should use conditions for entering and exiting a position, stops, and margin.

If an error occurs, the correct methods for debugging the strategy are:

1. Using margin leverage (Margin For Long/Short positions in the [Properties](https://www.tradingview.com/chart/?solution=43000628599) of the strategy or *margin_long* and *margin_short* parameters in the [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy) function). If specified, a part of a position will be automatically liquidated if the strategy does not have enough equity to maintain it. You can find out more about this functionality in the article in our [User Manual](https://www.tradingview.com/pine-script-docs/concepts/strategies/) or in a [blog post](https://www.tradingview.com/blog/en/strategy-leverage-24638/).

 Pine Script® // @version= 5 
 strategy ( "" , default_qty_type = strategy.percent_of_equity , default_qty_value = 10 , margin_long = 100 , margin_short = 100 ) 

 longCondition = ta.crossover ( ta.sma ( close , 14 ) , ta.sma ( close , 28 )) 
 if ( longCondition ) 
 strategy.entry ( "Long" , strategy.long ) 

 shortCondition = ta.crossunder ( ta.sma ( close , 14 ) , ta.sma ( close , 28 )) 
 if ( shortCondition ) 
 strategy.entry ( "Short" , strategy.short ) 
 Expand 5 lines 2. Checking the equity value to see if it’s above zero before calling * [strategy.entry()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy%7Bdot%7Dentry)* or *[strategy.order()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy%7Bdot%7Dorder)* functions or additionally redefining the number of entry contracts.

 Pine Script® // @version= 5 
 strategy ( "" , default_qty_type = strategy.percent_of_equity , default_qty_value = 10 ) 

 if strategy.equity > 0 
 strategy.entry ( "Short" , strategy.short ) // enter at 10 % of currently available equity 
 else 
 strategy.entry ( "Long" , strategy.long , qty = 1 ) // Reverse position with fixed contract size 
 Expand 2 lines 3. Using variables of the *strategy.risk* category for risk management. You can read more about these in our [User Manual](https://www.tradingview.com/pine-script-docs/concepts/strategies/).
 Previous Previous I see the "Memory limits exceeded" error Next Next I see the "The script executes too many unique `request.*()` function calls" error Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43280114573/original/kc7qeFUdYT6kUcxv8Y6IGRCsuN9TTRoWWQ.png?1639464661

**Описание:**

This image shows a **TradingView chart interface** displaying a 1-day (1D) candlestick chart for **Adobe Inc. (NASDAQ: ADBE)**. Below is a detailed breakdown of all UI elements, their purposes, and the information presented:


### 1. **Header/Title Bar**  
- **Symbol & Timeframe**: `Adobe Inc · 1D · NASDAQ`  
  - Identifies the stock (Adobe Inc.), chart timeframe (1-day), and exchange (NASDAQ).  
- **Market Data**: `O13.05 H13.38 L13.05 C13.35 +0.32 (+2.43%)`  
  - `O`: Open price ($13.05)  
  - `H`: High price ($13.38)  
  - `L`: Low price ($13.05)  
  - `C`: Close price ($13.35)  
  - `+0.32 (+2.43%)`: Daily price change (gain of $0.32, +2.43% increase).  
- **Additional Metrics**:  
  - `13.35` (red box): Current price (matches the close price).  
  - `0.00` (red box): Price change (no change in this context, likely a placeholder or error).  
  - `160.24` (blue box): Another metric (possibly volume, RSI, or a custom indicator— TradingView often uses blue for secondary data).  


### 2. **Candlestick Chart**  
- **Candlesticks**: Vertical bars (candles) represent price action over 1-day intervals:  
  - **Green candles**: Close price > Open price (bullish day).  
  - **Red candles**: Close price < Open price (bearish day).  
  - Each candle shows:  
    - **Body**: Range between open and close.  
    - **Wicks/Tails**: Range between high and low (extremes of the day).  
- **Chart Area**: The main plot displays price movement over time (x-axis: dates, y-axis: price).  


### 3. **Lower Chart (Indicator/Strategy Panel)**  
This section shows a **custom indicator or strategy output** (likely from a Pine Script strategy):  
- **Color-Coded Zones**:  
  - **Green zone**: Bullish signal (e.g., buy signal).  
  - **Red zone**: Bearish signal (e.g., sell signal).  
- **Annotations/Tooltips**:  
  - `negative_qty -3074.84`: A custom metric (e.g., negative quantity in a strategy, possibly a P&L or position size).  
  - `Order size: 1`: A buy order (size = 1 unit) placed in the green zone.  
  - `Order size: 0`: A neutral/exit order (size = 0) at the boundary of green/red.  
  - `Negative qty_value at bar index: 7712. Order size: -2`: A sell order (size = -2 units) in the red zone (bar index 7712 is a specific candle).  
- **Line Graph**: A black line (likely a moving average or strategy equity curve) tracks the indicator’s output over time.  


### 4. **Timeframe Selector (Bottom Left)**  
- Buttons: `1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All`  
  - Switches the chart’s time horizon (e.g., 1-day, 5-day, 1-month, etc.).  
  - `1D` is selected (current view).  


### 5. **Tools & Panels (Bottom Bar)**  
- **Stock Screener**: Dropdown menu to filter stocks (e.g., by sector, price, volume).  
- **Text Notes**: Add manual notes to the chart.  
- **Pine Editor**: Opens the Pine Script editor to create/modify custom indicators/strategies.  
- **Strategy Tester**: Tests trading strategies (backtesting) using historical data.  
- **Trading Panel**: Places live trades (if connected to a broker).  


### 6. **Icons & Miscellaneous**  
- **Lock Icon**: Appears on the candlestick and in the red zone—likely indicates a \

---

