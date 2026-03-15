# I've successfully added a strategy to my chart, but it doesn't generate orders

**URL:** https://www.tradingview.com/support/solutions/43000478450-i-ve-successfully-added-a-strategy-to-my-chart-but-it-doesn-t-generate-orders/

---

- [ Help Center ](/)
- / 
- / [ I've successfully added a strategy to my chart, but it doesn't ge… ](/support/solutions/43000478450-i-ve-successfully-added-a-strategy-to-my-chart-but-it-doesn-t-generate-orders/)

# I've successfully added a strategy to my chart, but it doesn't generate orders 
 If the "List of Trades" and "Overview" tabs of the Strategy Tester display "No data" after you've added a strategy to the chart, it's likely that it doesn't simulate any orders, which results in no data to populate the tabs. If your script is not generating orders, it may be due to any of the following reasons:

#### The script is not classified as a strategy or does not use commands that create orders 

Backtesting with the Strategy Tester only works with Pine Script® strategies, which use the [strategy()](https://www.tradingview.com/pine-script-reference/#fun_strategy) function for their declaration statement. Scripts declared with [indicator()](https://www.tradingview.com/pine-script-reference/#fun_indicator) or [library()](https://www.tradingview.com/pine-script-reference/#fun_library) cannot interact with the Strategy Tester module.

Scripts declared as strategies must use `strategy.*` order placement commands (e.g., [strategy.order()](https://www.tradingview.com/pine-script-reference/#fun_strategy.order) or [strategy.entry()](https://www.tradingview.com/pine-script-reference/#fun_strategy.entry)) to simulate orders and display data in the Strategy Tester, regardless of any other buy/sell signals that a script's author may have included in the code.

#### The strategy does not have enough capital to open a position 

For a strategy to enter a position, it must have enough money to purchase the specified number of contracts/lots/shares/units. It will not enter a trade if it does not have sufficient capital to cover the cost. For example, if a strategy's initial capital is 1000 USD and the order size is one contract, it cannot enter the position unless the asset's price falls below 1000 USD since it can't afford the entire trade. Strategies will always try to purchase the specified number of contracts/shares/lots/units and nothing less.

Important note on backtesting futures: 

Futures symbols commonly have what's known as a Contract Unit (represented as the Point Value on TradingView and accessible in Pine via the [syminfo.pointvalue](https://www.tradingview.com/pine-script-reference/#var_syminfo.pointvalue) variable). Like other symbols, the raw price on the chart represents the price of one unit of the traded commodity. However, futures contracts have a set quantity that each represents, so a single-unit purchase is not typically possible. To calculate the capital required for a contract, multiply the chart price by the Point Value.

To demonstrate the effects of Point Value on strategies that operate on futures symbols, let's look at the symbol CME_MINI:ES1!, which represents the ES futures contract with the best liquidity and has a Point Value of 50:

In the example below, the strategy we've added to the chart entered a position at precisely 4000 USD and exited at 4500 USD. The actual amount of money spent on the contract at the entry price was 4000 USD times the Point Value of 50, which is 200,000 USD. When the strategy closed its position at the exit price, the amount received was 4500 USD * 50 = 225,000 USD, resulting in a profit of 25,000 USD, which we can confirm by viewing the "Profit" column of the "List of Trades" tab in the Strategy Tester:

If the strategy had an Initial Capital value under 200,000 USD in this case, it wouldn't have been able to place the order since it could not afford the entry price, which was 50 times the price shown on the chart. To simulate the position, we must increase the Initial Capital or lower the Margin Long/Short values to allow the strategy to afford it.

#### The strategy returns a runtime error 

If a strategy encounters an issue during its calculations, it will raise a runtime error and display a red exclamation mark in the top-left corner of the chart pane that contains the strategy. Runtime errors stop the script from continuing calculations, so it cannot simulate orders. The different runtime errors in Pine have various causes and potential fixes. Clicking on the exclamation mark will show the script's error message.

#### The conditions required for placing the strategy's orders were not satisfied 

One possible cause for a strategy not showing any data is that no condition triggered an order throughout the testing range. In this case, there would be no entries on the chart because there were no orders to fill. Users can fix this by changing the conditions in a strategy's source code. It can often be helpful to visually inspect the history of a strategy's order conditions by plotting them on the chart.

The script below uses Pine's [plotshape()](https://www.tradingview.com/pine-script-reference/#fun_plotshape) function to plot blue and red crosses above bars upon the occurrence of the long and short conditions, allowing us to inspect their history on the chart:

 Pine Script® // @version= 6 
 strategy ( 'My Strategy' , overlay = true ) 

 longCondition = ta.crossover ( ta.sma ( close , 14 ) , ta.sma ( close , 28 )) 

 if longCondition 
 strategy.entry ( 'Long' , strategy.long ) 

 plotshape ( longCondition , color = color.new ( color.blue , 0 )) 

 shortCondition = ta.crossunder ( ta.sma ( close , 14 ) , ta.sma ( close , 28 )) 

 if shortCondition 
 strategy.entry ( 'Short' , strategy.short ) 

 plotshape ( shortCondition , color = color.new ( color.red , 0 )) 
 Expand 11 lines For additional information on this topic, see our [User Manual's page on Debugging](https://www.tradingview.com/pine-script-docs/writing/debugging/).

#### The strategy's Properties are incorrect 

Every strategy has several parameters that govern its rules for opening orders. Authors can set these parameters from a strategy's source code, and users can override them with the inputs in the "Properties" tab of the strategy's settings.

NOTE: There are several places in a strategy's source code where users can set the number of contracts/shares/lots/units for its orders:

- Parameters in the [strategy()](https://www.tradingview.com/pine-script-reference/#fun_strategy) function allow users to set the default trade quantity and type, which sets the default values in the "Properties" tab. Users can override these values by adjusting the "Order size" inputs.
- Order placement commands that produce entry orders, such as [strategy.entry()](https://www.tradingview.com/pine-script-reference/#fun_strategy.entry), can set the trade quantity on an order-by-order basis. In this case, changes to the input in the "Properties" tab will not affect the strategy's order size. 

Users must ensure they specify the sizes of their strategies' orders correctly. To add to the "The strategy does not have enough capital to open a position" section above, you should note that:

- If a strategy's "Order type" is set to "Contracts" (equivalent to [strategy.fixed](https://www.tradingview.com/pine-script-reference/#var_strategy.fixed) as the `default_qty_type` in the source code), the order size must be greater than 1 for most symbols. Some cryptocurrencies facilitate fractional sizes. For example, an order size of 0.1 is valid for BTCUSD but not for AAPL or EURUSD.
- The order size must be positive; negative numbers will cause runtime errors, and a value of 0 will have no effect.
- The total position size (number of contracts) cannot exceed 1e12. Strategies will not simulate new orders if the position size exceeds this number.
 Previous Previous Script or strategy gives different results after refreshing the page (repainting) Next Next Strategy produces unrealistic results on non-standard chart types (Heikin Ashi, Renko, etc.) Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398081923/original/it05WOZW6FsefVDpJanJRE2X4dz1_lo2aw.png?1678951909

**Описание:**

This image shows a **TradingView \

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398081922/original/8ZTqwM8AAUc0bmIeLwlO97bIxaujc5y_hg.png?1678951909

**Описание:**

This image shows a **TradingView interface** displaying a **Strategy Tester** for the instrument `ES #F, 1D · CME_MINI` (E-mini S&P 500 futures, daily timeframe). The interface is split into two main sections: a **chart area** (top) and a **strategy results panel** (bottom). Here’s a detailed breakdown:


### **1. Top Section: Chart Area**
The chart visualizes price action with candlesticks, overlaid with strategy signals and annotations:  
- **Instrument & Timeframe**: `ES #F, 1D · CME_MINI` (E-mini S&P 500 futures, daily).  
- **Price Scale (Right)**: Ranges from ~3,800 to 4,600 USD, with key levels (e.g., 4,000, 4,500) highlighted in red.  
- **Chart Annotations**:  
  - **Long Signal**: A blue arrow labeled “Long +1” (entry) in early April.  
  - **Exit Signal**: A purple arrow labeled “-1 Exit” (exit) in late August/early September.  
  - **Highlighted Region**: A light blue shaded area (likely a backtesting period) with dashed red/green lines (support/resistance).  
- **Tooltip (Top Center)**: Displays strategy metrics:  
  - `500.00 (12.50%) 2000` (profit: 500 USD, 12.5% return, 2,000 initial capital).  
  - `104 bars, 148d` (104 daily bars, 148 days of data).  
  - `Vol 138.555M` (volume: 138.555 million).  
- **Time Navigation (Bottom of Chart)**: Months (Apr–Sep) and timeframe buttons (`1D`, `5D`, `1M`, `3M`, `6M`, `YTD`, `1Y`, `5Y`, `All`).  
- **Additional Chart Controls**:  
  - `06:34:30 (UTC-5)`: Timestamp (likely for backtesting).  
  - `b-adj`, `set`, `%`, `log`, `auto`: Buttons for bar adjustment, settings, percentage/log scale, and auto-scale.  
  - Sun icon: Toggle dark/light mode.  


### **2. Bottom Section: Strategy Tester Panel**
This panel analyzes the strategy’s performance, with tabs and a trade list:  
- **Tabs**: `Crypto Pairs Screener`, `Pine Editor`, `Strategy Tester` (active), `Trading Panel`.  
- **Strategy Controls**:  
  - `My strategy`: Label for the active strategy.  
  - Gear icon: Strategy settings.  
  - Clock icon: Toggle real-time updates.  
  - Upload icon: Import/export strategy.  
  - `Deep Backtesting` toggle (off): Enables advanced backtesting (beta).  
- **Sub-Tabs**: `Overview`, `Performance Summary`, `List of Trades` (active), `Properties`.  
- **Trade List (Table)**:  
  - Columns: `Trade #`, `Type`, `Signal`, `Date/Time`, `Price`, `Contracts`, `Profit`.  
  - **Trade 1**:  
    - `Type`: `Exit Long` (exit position).  
    - `Signal`: `Exit`.  
    - `Date/Time`: `2021-08-26`.  
    - `Price`: `4,500.00 USD` (exit price).  
    - `Contracts`: `1`.  
    - `Profit`: `25,000.00 USD` (12.5% return).  
  - **Entry Trade (Below)**:  
    - `Type`: `Entry Long` (entry position).  
    - `Signal`: `Long`.  
    - `Date/Time`: `2021-03-31`.  
    - `Price`: `4,000.00 USD` (entry price).  


### **Key UI Elements & Purposes**  
- **Candlestick Chart**: Visualizes price movement (green = up, red = down) over time.  
- **Signals (Arrows)**: Mark strategy entry/exit points (blue = long entry, purple = exit).  
- **Timeframe Buttons**: Switch between time periods (e.g., 1D = daily, 1M = monthly).  
- **Strategy Tester Tabs**: Analyze strategy performance (trades, summary, properties).  
- **Trade List**: Details individual trades (entry/exit, profit, contracts).  


This interface is used to **backtest a trading strategy** (e.g., a long position in ES futures) and evaluate its historical performance, including profit, duration, and risk.

---

### Изображение 3

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398081921/original/Y6i8OjIj3di31BJ6dXyK0zOHuX1RReGEnA.png?1678951908

**Описание:**

This image displays a **TradingView chart interface** focused on **Amazon.com, Inc. (NASDAQ: AMZN)** with a 1-day (1D) time frame. Below is a detailed breakdown of all elements:  


### 1. **Header & Stock Information**  
- **Stock Ticker & Exchange**: *“Amazon.com, Inc. · 1D · NASDAQ”* identifies the company, time frame (1-day candlestick), and exchange (NASDAQ).  
- **Price Data**:  
  - *“O89.97 H94.02 L88.12 C92.43 +1.70 (+1.87%)”*:  
    - `O` = **Open price** (day’s opening price: $89.97).  
    - `H` = **High price** (day’s highest price: $94.02).  
    - `L` = **Low price** (day’s lowest price: $88.12).  
    - `C` = **Close price** (day’s closing price: $92.43).  
    - `+1.70 (+1.87%)` = **Daily change** (price increased by $1.70, or 1.87%).  


### 2. **Price Boxes (Top-Left)**  
Two colored boxes show real-time price data:  
- **Red Box**: *“92.92”* (likely the **last traded price** or a specific price level, with `0.38` as a small delta/variation).  
- **Blue Box**: *“93.30”* (another price level, e.g., a target or previous close, with no delta shown).  


### 3. **Chart Area**  
- **Candlestick Chart**: Displays price action over the 1D period. Red candles = price decline; green candles = price increase.  
- **“My strategy” Label**: A text label (likely a custom indicator or strategy name) with a red exclamation mark (!) icon, indicating an alert/error.  


### 4. **Error Pop-Up (Center)**  
A white pop-up with a red exclamation mark (!) and the title *“Study Error”* displays:  
- *“Maximum number of orders (9000) was reached.”*  
  This error suggests a technical limit (e.g., too many orders in a backtest, or a strategy exceeding order limits) — common in TradingView’s strategy/backtesting tools.  


### 5. **UI Elements & Purpose**  
- **Exclamation Mark Icons**: Red icons (next to “My strategy” and in the pop-up) signal errors/alerts.  
- **Pop-Up Window**: Provides context for the error (order limit reached), helping users troubleshoot strategy/backtest issues.  


### Overall Context  
This interface is used for **technical analysis** or **strategy testing** on Amazon’s stock. The error pop-up indicates a problem with a custom strategy (e.g., too many orders in a backtest), while the chart and price boxes offer real-time market data. TradingView’s design prioritizes clarity for traders analyzing price trends and testing strategies.

---

