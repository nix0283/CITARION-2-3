# Strategy properties

**URL:** https://www.tradingview.com/support/solutions/43000628599-strategy-properties/

---

- [ Help Center ](/)
- / [ Knowledge base ](/knowledge-base/)
- / Strategies 
- / [ I'd like to know more about strategies ](/support/folders/43000549427-i-d-like-to-know-more-about-strategies/)
- / [ Strategy properties ](/support/solutions/43000628599-strategy-properties/)

# Strategy properties 

#### Each Pine strategy has a number of properties that determine its behavior: 

- Initial Capital
- Base Currency
- Order Size
- Pyramiding
- Commission
- Verify Price For Limit Orders
- Slippage
- Margin
- Recalculate
- Fill orders
 They are available in the strategy settings, in the Properties tab:

Each of the parameters specified in the properties of the strategy can be changed by editing the arguments of the [strategy()](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy) function call in the corresponding Pine script:

*strategy(title, initial_capital, currency, default_qty_value, default_qty_type, pyramiding, commission_type, commission_value, backtest_fill_limits_assumption, slippage, process_orders_on_close, margin_long, margin_short, calc_on_order_fills, calc_on_every_tick, process_orders_on_close*, *use_bar_magnifier*) 

Let's take a look at each input parameter in the Properties menu and its corresponding parameter in the Pine language:

1 - *Initial Capital* (parameter: *initial_capital*) represents the amount of funds initially available for the strategy to trade, in the currency defined in *Base Currency*. By default, this value is equal to 1,000,000. You may need to increase this value for trades to occur on certain symbols.

2 - *Base Currency* (parameter: *currency*) specifies the currency used for calculations. Results appearing in the Strategy Tester tab (profit, loss, drawdown, etc) are expressed in this currency. Available choices are:

*Default, USD, EUR, AUD, GBP, NZD, CAD, CHF, HKD, JPY, NOK, SEK, SGD, TRY, ZAR*. If the *Default* choice is selected, the strategy will use the default currency for this symbol and there is no currency conversion.

3 - *Order Size* (parameters: *default_qty_value*, *default_qty_type*). This requires a value and a calculation mode. Note that the calculated values can be subject to constraints due to the minimum tradable quantities for the symbol:

- *Quantity* (argument: *strategy.fixed*) - the strategy will enter with the specified number of contracts/shares/lots.
- *Amount in currency* (argument: *strategy.cash*) - the strategy will enter the amount specified in base currency.
- *Percentage of equity* (argument: *strategy.percent_of_equity*) - position sizes will be calculated as a percentage of the available equity when the trade opens.

4 - *Pyramiding* (parameter: *pyramiding*) specifies the maximum number of successive entries allowed in the same direction. When pyramiding is disabled, the strategy can only open one long or short position, even if entry conditions are met. Pyramiding only affects entries made using the strategy.entry() function. It has no effect on orders created using strategy.order().

5 - *Commission* (parameters: *commission_type*, *commission_value*). It is the amount paid in trading fees for each trade. A value and calculation mode must be supplied. Note that commission is applied on both entries and exits, and that when a percentage is used, the calculated commission will vary with the value of the transaction:

- *Percentage of the transacted value* (argument: *strategy.commission.percent**)* - imposes a commission on each order equal to the specified percentage.
- *Currency per contract* (argument: *strategy.commission.cash_per_contract*) - imposes a commission on each contract.
- *Currency per order* (argument: *strategy.commission.cash_per_order*) - imposes a commission on each order.

6 - *Verify Price For Limit Orders* (parameter: *backtest_fill_limits_assumption*) makes the conditions for entering a position using limit orders more strict. By default, this value is 0, i.e. limit orders are filled on historical data as soon as the price indicated in the order is reached. If the parameter is not zero, then limit orders can enter a position within the bar only if the market price has exceeded the level of the limit order by the specified number of ticks.

7 - *Slippage* (parameter: *slippage*) specifies the value in ticks to be added to the fill price of market or stop orders. It can be used to account for the spread.

8 - *Margin for Long/Short positions (parameters: margin_long*, *margin_short*) specifies the margin for each trade, i.e., the percent of the position that the trader must fund. For example, if the *Margin for long positions* is set to 25%, the trader has to have enough funds to cover 25% of the open trade and can potentially spend up to 400% of their equity on every trade. If a trade has been opened and it starts losing money to the extent where the trader's funds are not enough to cover their portion of the trade, a Margin Call occurs and forcibly liquidates a part of the original position. You can learn more about this feature and how it's calculated in [this Help Center article](https://www.tradingview.com/chart/?solution=43000717375).

9 - *Recalculate* options specify how often the strategy should be recalculated. By default, the strategy is recalculated at the close of each bar, but using the options below, it can also be recalculated:

- *After Order is Filled* (parameter: *calc_on_order_fills*) - allows the strategy to perform an additional intra-bar order calculation immediately after an order fills. That extra calculation happens on both historical and realtime bars.
- *On Every Tick* (parameter: *calc_on_every_tick*). By default, strategies only calculate on the close of realtime bars. This parameter allows the strategy to calculate on each update of realtime bars, like an indicator would. Note that tick data is lost when the chart is refreshed, so strategies using this option will [repaint](https://www.tradingview.com/chart/?solution=43000478429). This parameter does not affect the behavior of strategies on historical bars. Also note that strategies using this feature will not show realistic results on historical bars, as they contain no tick data.

10 - *Fill orders**:*

- *Using bar magnifier* (parameter: *use_bar_magnifier*) - directs the Broker Emulator to use more precise, lower timeframe prices during history backtesting in order to achieve more realistic results. Read more about this feature in [Help Center](https://www.tradingview.com/chart/?solution=43000669285). 
- *On bar close* (parameter: *process_orders_on_close*). If true, the strategy generates an additional attempt to execute orders after a bar closes and strategy calculations are completed. If the orders are market orders, the broker emulator executes them before the next bar's open. If the orders are price-dependent, they will only be filled if the price conditions are met. This option is useful if you wish to execute orders at the same time that they are created: by default, the orders are created on the Close of the current bar and executed on the Open of the next one; with this setting turned on, they will be executed on the same Close that the order is created on. Note that entering the position on the same tick that the order is created can be misleading because that would not be possible to accomplish in real trading.
- *Using standard OHLC (parameter: fill_orders_on_standard_ohlc) *forces strategies running on [Heikin Ashi](https://www.tradingview.com/chart/?solution=43000619436) charts to fill orders using actual OHLC prices, for more realistic results. By default, strategy scripts fill orders using the chart's prices, regardless of chart type. For Heikin Ashi charts, this setting prevents the use of synthetic prices which may not align with reality. For example, this strategy we've applied to the daily NASDAQ:AAPL Heikin Ashi chart filled an order on 2023-09-25 at a synthetic price of 175.61 USD. However, after enabling the "Using standard OHLC" option, the same order filled at the standard chart price of 174.20 USD. 
 Previous Previous How to export strategy data Next Next What is bar magnifier backtesting mode Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43440948202/original/A48Sj20JJTTUvZXQEiiMeKYTVEUCo74YwQ.png?1696585775

**Описание:**

This image shows a **TradingView \

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43464057585/original/gDgMVgavKi5w6cSDhker6qZwSq-nG_qGXA.png?1706608014

**Описание:**

This image shows a **TradingView** interface displaying a **Bitcoin/TetherUS (BTC/USDT)** trading chart on the Binance exchange, with the **BarUpDn Strategy** configuration panel open. Here’s a detailed breakdown:


### **1. Top Navigation Bar**
- **Symbol & Exchange**:  
  - Left: `BTC / TetherUS` (trading pair) with a `+` (add to watchlist) and `D` (timeframe selector, currently \

---

### Изображение 3

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43464057618/original/zld30QSTituf8vRB1LSZ1ELo_L1wbbA-2g.png?1706608028

**Описание:**

This image shows a **TradingView interface** displaying a **Bitcoin/TetherUS (BTC/USDT) 1-day chart** on Binance, with the **BarUpDn Strategy** settings panel open. Here's a detailed breakdown:


### **1. Top Navigation Bar**
- **Symbol & Exchange**:  
  - Left: `BTC / USDT` (Bitcoin/TetherUS) with a `+` (add symbol) and `D` (timeframe: 1 Day) button.  
  - Middle: `Bitcoin / TetherUS · 1D · BINANCE` (pair, timeframe, exchange).  
  - Right: Price data: `O 44151.10 H 44324.80 L 42450.00 C 44081.10 -7` (Open, High, Low, Close, change).  

- **Toolbar Icons**:  
  - `Indicators` (add technical indicators), `Alert` (set price alerts), `Replay` (replay market movements), and a `Publish` button (share chart).  


### **2. Chart Area**
- **Chart Type**: Candlestick chart (red/green candles) with **blue upward arrows** (buy signals) and **red downward arrows** (sell signals) overlaid, indicating the BarUpDn Strategy’s signals.  
- **Timeframe Tabs**: `1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All` (select chart period).  
- **Strategy Label**: `BarUpDn Strategy 1` with icons: eye (visibility), gear (settings), code brackets (Pine Editor), `X` (close), and `...` (more options).  


### **3. Strategy Tester Panel (Bottom-Left)**
- **Tabs**: `Overview` (selected), `Performance Summary`, `List of Trades`, `Properties`.  
- **Performance Metrics**:  
  - `Net Profit`: `-95,117.81 USDT (-9.51%)` (red, indicating a loss).  
  - `Gross Profit`: `649,037.72 USDT (64.9%)`.  
  - `Gross Loss`: `744,155.53 USDT (74.42%)`.  
  - `Max Run-up`: `74,047.85 USDT (7.64%)`.  


### **4. BarUpDn Strategy Settings Panel (Right)**
- **Header**: `BarUpDn Strategy` with an `X` (close panel).  
- **Tabs**: `Inputs`, `Properties` (selected), `Style`, `Visibility`.  

#### **Properties Tab (Current)**
- **Commission**: `0 %` (trading fee, dropdown for `%`/`basis points`).  
- **Verify price for limit orders**: `0 ticks` (price verification for limit orders).  
- **Slippage**: `0 ticks` (price difference between order and execution).  
- **Margin for long/short positions**: `0 %` (margin requirements, info icons for details).  
- **Recalculate**: Checkboxes for `After order is filled` / `On every tick` (when to recalculate strategy).  
- **Fill orders**: Checkboxes for `Using bar magnifier` / `On bar close` (order execution timing).  
  - `Using standard OHLC` is **checked** (uses standard Open/High/Low/Close data).  

- **Buttons**: `Defaults` (reset to default settings), `Cancel` (discard changes), `Ok` (apply changes).  


### **5. Right Sidebar (Additional Info)**
- **Price Scale**: Y-axis with values `30000.00` to `17500.00` (BTC/USDT price range).  
- **Current Price**: `27261.07 USDT` (top-right, with an upward arrow).  
- **Time**: `0:18:48 (UTC)` (current time).  
- **Strategy Stats**:  
  - `Short`: `761.90 USDT (-12.98%)` (short position profit/loss).  
  - `121.52 USDT (27.41%)` (another metric).  
  - `883.42 USDT (40.39%)` (another metric).  


### **Purpose of UI Elements**
- **Chart**: Visualize price action and strategy signals (arrows).  
- **Strategy Tester**: Analyze backtest performance (profit/loss, win rate, etc.).  
- **Settings Panel**: Customize strategy parameters (fees, margin, order execution).  
- **Toolbar**: Access tools (indicators, alerts, replay) and publish charts.  


This interface is used for **backtesting trading strategies** (BarUpDn) on historical BTC/USDT data, allowing traders to optimize parameters and evaluate performance before live trading.

---

