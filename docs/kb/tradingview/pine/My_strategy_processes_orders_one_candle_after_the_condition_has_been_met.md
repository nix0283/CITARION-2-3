# My strategy processes orders one candle after the condition has been met

**URL:** https://www.tradingview.com/support/solutions/43000619439-my-strategy-processes-orders-one-candle-after-the-condition-has-been-met/

---

- [ Help Center ](/)
- / 
- / [ My strategy processes orders one candle after the condition has b… ](/support/solutions/43000619439-my-strategy-processes-orders-one-candle-after-the-condition-has-been-met/)

# My strategy processes orders one candle after the condition has been met 

By default, a strategy is calculated once per bar, on the bar close. During that calculation, the strategy is able to generate new orders or update existing ones. But when the bar has already closed, it cannot be traded anymore, so the earliest moment that a strategy order can be filled is at the open of the next bar. Because of this, by default, the strategy will open a position one bar after the entry condition has been met.

That behavior can be changed with the *process_orders_on_close* argument. This allows the strategy to fill orders on the close of the bar. To do this, a *process_orders_on_close *argument should be added to the [*strategy()*](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy) function declaration and set to true, like this:

 Pine Script® // @version= 5 
 strategy ( ..., process_orders_on_close = true , ...) 
 This is how strategy works without the *process_orders_on_close* argument:

 Pine Script® // @version= 5 
 strategy ( "process_orders_on_close example" ) 
 strategy.entry ( "EN" , strategy.long , when = bar_index == 20650 ) 
 strategy.close ( "EN" , when = bar_index == 20655 ) 
 This is how strategy works with the *process_orders_on_close* argument:

 Pine Script® // @version= 4 
 strategy ( "process_orders_on_close example" , process_orders_on_close = true ) 
 strategy.entry ( "EN" , strategy.long , when = bar_index == 20650 ) 
 strategy.close ( "EN" , when = bar_index == 20655 ) 

The entry *EN* is tied to a condition that will be true at the bar 20650, but the actual entry occurs one bar after that, at bar 20651. The same happens with its close: the condition is true at bar 20655, but the entry is only closed on the next bar. By adding the *process_orders_on_close* argument and setting it to true, the strategy can now fill orders on the close of the bars, so the market order *EN* now fills one bar sooner.
 Previous Previous Strategy produces unrealistically good results by peeking into the future Next Next I see "Maximum number of orders (9000) was reached." error Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43207126155/original/bVdxomHDMqjXiohPxobWbJy-WIGbq1HHIw.png?1616507070

**Описание:**

This image shows a **TradingView charting interface** displaying a 1-minute (1m) candlestick chart for **Apple Inc. (NASDAQ: AAPL)**. The interface is rich with technical analysis tools, order management features, and a Pine Script code editor. Here’s a detailed breakdown:


### **1. Top Navigation Bar**
- **Left Side**: 
  - **\

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43207126552/original/_LsgDBUSqZm-srBCZGdtBpqEVnORjZ99KA.png?1616507140

**Описание:**

This image shows a **TradingView chart interface** displaying Apple Inc. (NASDAQ: AAPL) stock data with a custom Pine Script strategy visualization. Here's a detailed breakdown:


### **1. Top Navigation Bar**
- **Left Side**: 
  - **\

---

