# I've successfully added a strategy to my chart, but it doesn't generate orders

**URL:** https://www.tradingview.com/support/solutions/43000478450-i-ve-successfully-added-a-strategy-to-my-chart-but-it-doesn-t-generate-orders/

---

- [ Help Center ](/) - / - / [ I've successfully added a strategy to my chart, but it doesn't ge… ](/support/solutions/43000478450-i-ve-successfully-added-a-strategy-to-my-chart-but-it-doesn-t-generate-orders/) # I've successfully added a strategy to my chart, but it doesn't generate orders If the "List of Trades" and "Overview" tabs of the Strategy Tester display "No data" after you've added a strategy to the chart, it's likely that it doesn't simulate any orders, which results in no data to populate the tabs. If your script is not generating orders, it may be due to any of the following reasons: The script is not classified as a strategy or does not use commands that create orders Backtesting with the Strategy Tester only works with Pine Script® strategies, which use the [strategy()](https://www.tradingview.com/pine-script-reference/#fun_strategy) function for their declaration statement. Scripts declared with [indicator()](https://www.tradingview.com/pine-script-reference/#fun_indicator) or [library()](https://www.tradingview.com/pine-script-reference/#fun_library) cannot interact with the Strategy Tester module. Scripts declared as strategies must use `strategy.*` order placement commands (e.g., [strategy.order()](https://www.tradingview.com/pine-script-reference/#fun_strategy.order) or [strategy.entry()](https://www.tradingview.com/pine-script-reference/#fun_strategy.entry)) to simulate orders and display data in the Strategy Tester, regardless of any other buy/sell signals that a script's author may have included in the code. The strategy does not have enough capital to open a position For a strategy to enter a position, it must have enough money to purchase the specified number of contracts/lots/shares/units. It will not enter a trade if it does not have sufficient capital to cover the cost. For example, if a strategy's initial capital is 1000 USD and the order size is one contract, it cannot enter the position unless the asset's price falls below 1000 USD since it can't afford the entire trade. Strategies will always try to purchase the specified number of contracts/shares/lots/units and nothing less. Important note on backtesting futures: Futures symbols commonly have what's known as a Contract Unit (represented as the Point Value on TradingView and accessible in Pine via the [syminfo.pointvalue](https://www.tradingview.com/pine-script-reference/#var_syminfo.pointvalue) variable). Like other symbols, the raw price on the chart represents the price of one unit of the traded commodity. However, futures contracts have a set quantity that each represents, so a single-unit purchase is not typically possible. To calculate the capital required for a contract, multiply the chart price by the Point Value. To demonstrate the effects of Point Value on strategies that operate on futures symbols, let's look at the symbol CME_MINI:ES1!, which represents the ES futures contract with the best liquidity and has a Point Value of 50: In the example below, the strategy we've added to the chart entered a position at precisely 4000 USD and exited at 4500 USD. The actual amount of money spent on the contract at the entry price was 4000 USD times the Point Value of 50, which is 200,000 USD. When the strategy closed its position at the exit price, the amount received was 4500 USD * 50 = 225,000 USD, resulting in a profit of 25,000 USD, which we can confirm by viewing the "Profit" column of the "List of Trades" tab in the Strategy Tester: If the strategy had an Initial Capital value under 200,000 USD in this case, it wouldn't have been able to place the order since it could not afford the entry price, which was 50 times the price shown on the chart. To simulate the position, we must increase the Initial Capital or lower the Margin Long/Short values to allow the strategy to afford it. The strategy returns a runtime error If a strategy encounters an issue during its calculations, it will raise a runtime error and display a red exclamation mark in the top-left corner of the chart pane that contains the strategy. Runtime errors stop the script from continuing calculations, so it cannot simulate orders. The different runtime errors in Pine have various causes and potential fixes. Clicking on the exclamation mark will show the script's error message. The conditions required for placing the strategy's orders were not satisfied One possible cause for a strategy not showing any data is that no condition triggered an order throughout the testing range. In this case, there would be no entries on the chart because there were no orders to fill. Users can fix this by changing the conditions in a strategy's source code. It can often be helpful to visually inspect the history of a strategy's order conditions by plotting them on the chart. The script below uses Pine's [plotshape()](https://www.tradingview.com/pine-script-reference/#fun_plotshape) function to plot blue and red crosses above bars upon the occurrence of the long and short conditions, allowing us to inspect their history on the chart: Pine Script® // @version= 6 strategy ( 'My Strategy' , overlay = true ) longCondition = ta.crossover ( ta.sma ( close , 14 ) , ta.sma ( close , 28 )) if longCondition strategy.entry ( 'Long' , strategy.long ) plotshape ( longCondition , color = color.new ( color.blue , 0 )) shortCondition = ta.crossunder ( ta.sma ( close , 14 ) , ta.sma ( close , 28 )) if shortCondition strategy.entry ( 'Short' , strategy.short ) plotshape ( shortCondition , color = color.new ( color.red , 0 )) Expand 11 lines For additional information on this topic, see our [User Manual's page on Debugging](https://www.tradingview.com/pine-script-docs/writing/debugging/). The strategy's Properties are incorrect Every strategy has several parameters that govern its rules for opening orders. Authors can set these parameters from a strategy's source code, and users can override them with the inputs in the "Properties" tab of the strategy's settings. NOTE: There are several places in a strategy's source code where users can set the number of contracts/shares/lots/units for its orders: - Parameters in the [strategy()](https://www.tradingview.com/pine-script-reference/#fun_strategy) function allow users to set the default trade quantity and type, which sets the default values in the "Properties" tab. Users can override these values by adjusting the "Order size" inputs. - Order placement commands that produce entry orders, such as [strategy.entry()](https://www.tradingview.com/pine-script-reference/#fun_strategy.entry), can set the trade quantity on an order-by-order basis. In this case, changes to the input in the "Properties" tab will not affect the strategy's order size. Users must ensure they specify the sizes of their strategies' orders correctly. To add to the "The strategy does not have enough capital to open a position" section above, you should note that: - If a strategy's "Order type" is set to "Contracts" (equivalent to [strategy.fixed](https://www.tradingview.com/pine-script-reference/#var_strategy.fixed) as the `default_qty_type` in the source code), the order size must be greater than 1 for most symbols. Some cryptocurrencies facilitate fractional sizes. For example, an order size of 0.1 is valid for BTCUSD but not for AAPL or EURUSD. - The order size must be positive; negative numbers will cause runtime errors, and a value of 0 will have no effect. - The total position size (number of contracts) cannot exceed 1e12. Strategies will not simulate new orders if the position size exceeds this number. Previous Previous Script or strategy gives different results after refreshing the page (repainting) Next Next Strategy produces unrealistic results on non-standard chart types (Heikin Ashi, Renko, etc.) Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398081923/original/it05WOZW6FsefVDpJanJRE2X4dz1_lo2aw.png?1678951909)

**Описание:** This TradingView image displays a **Symbol Info pop-up window** for the S&P 500 E-mini Futures (ES1!) contract, overlaying a partially visible price chart. Here’s a detailed breakdown:  


### 1. Top Bar (Symbol Header)  
- **Symbol Ticker**: `ES1! · S&P 500 E-mini Futures · 1D · CME_MINI`  
  - `ES1!`: Ticker symbol for S&P 500 E-mini Futures.  
  - `1D`: Timeframe (1-day candlestick chart).  
  - `CME_MINI`: Exchange (CME Group’s E-mini futures).  
- **Icons**:  
  - Left arrow: Navigate to previous symbol.  
  - Eye icon: Toggle chart visibility.  
  - Three dots: Additional options menu.  


### 2. Symbol Info Pop-Up Window  
A white modal with a **close button (X)** in the top-right. It lists key contract details:  

| Field               | Value                                  | Purpose                                  |  
|---------------------|----------------------------------------|------------------------------------------|  
| Symbol name         | `CME_MINI:ES1!`                        | Unique identifier for the contract.        |  
| Symbol description  | `E-MINI S&P 500 FUTURES (CONTINUOUS: CURRENT CONTRACT IN FRONT)` | Describes the contract (continuous, front-month). |  
| Symbol type         | `futures`                              | Asset class (futures contract).            |  
| Current contract    | `ESM2023`                              | Specific contract month (e.g., September 2023). |  
| Point value         | `50`                                   | Monetary value per 1-point price move.     |  
| Exchange            | `CME_MINI`                             | Primary exchange (CME Group).              |  
| Listed exchange     | `CME_MINI`                             | Exchange where the contract is listed.     |  
| Currency            | `USD`                                  | Settlement currency (U.S. Dollar).         |  
| Tick size           | `0.25`                                 | Minimum price increment (0.25 points).     |  


### 3. Background Chart (Partially Visible)  
A candlestick chart (1D timeframe) for ES1! is partially visible behind the pop-up, showing price action (green/red candles) typical of futures trading.  


### Purpose  
This pop-up provides critical contract metadata (e.g., point value, tick size, exchange) to help traders understand the instrument’s specifications, while the top bar and chart offer navigation and price visualization.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398081922/original/8ZTqwM8AAUc0bmIeLwlO97bIxaujc5y_hg.png?1678951909)

**Описание:** This TradingView image displays a **Strategy Tester** for the `ES.D - CME_MINI` (E-mini S&P 500 futures) instrument, focused on a **long trade** with detailed UI elements:  


### 1. **Top Section: Chart & Instrument Info**  
- **Instrument**: `ES.D - CME_MINI` (E-mini S&P 500 futures) in USD.  
- **Chart**: A candlestick chart showing price action from April to September. Key elements:  
  - **Trade Markers**:  
    - *Entry*: Blue arrow labeled “Long +1” (March 31, 2021, price ~4000 USD).  
    - *Exit*: Purple arrow labeled “-1 Exit” (August 26, 2021, price 4500 USD).  
  - **Support/Resistance Zones**: Light blue shaded area (4000–4500 USD) with dashed red lines (4000, 4500) and a solid blue line (mid-zone).  
  - **Tooltip**: Shows trade stats: `500.00 (12.50%) 2000` (profit/return), `104 bars, 148d` (timeframe), `Vol 138.555M` (volume).  


### 2. **Timeframe & Navigation**  
- **Timeframe Buttons**: `1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All` (select chart period).  
- **Timezone**: `06:34:30 (UTC-5)` (current time).  
- **Chart Options**: `b-adj` (back-adjusted), `set` (settings), `%` (percentage scale), `log` (logarithmic), `auto` (auto-scale).  


### 3. **Strategy Tester Tabs**  
Tabs for `Crypto Pairs Screener`, `Pine Editor`, `Strategy Tester` (active), `Trading Panel`.  


### 4. **Strategy Details (My Strategy Section)**  
- **Tabs**: `Overview`, `Performance Summary`, `List of Trades` (active), `Properties`.  
- **Controls**: Gear (settings), clock (timeframe), upload (import), `Deep Backtesting` toggle (BETA).  
- **Trade Table**:  
  - Columns: `Trade #`, `Type`, `Signal`, `Date/Time`, `Price`, `Contracts`, `Profit`.  
  - Trade 1:  
    - *Exit Long*: Signal “Exit”, Date `2021-08-26`, Price `4500.00 USD`, Contracts `1`, Profit `25,000.00 USD (12.5%)`.  
    - *Entry Long*: Signal “Long”, Date `2021-03-31`, Price `4000.00 USD`.  


### Purpose  
The image analyzes a **long futures trade** (entry at 4000, exit at 4500) using TradingView’s Strategy Tester, showing profit, timeframe, and trade history. It combines chart visualization (price action, support/resistance) with backtesting results (trade list, performance).


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398081921/original/Y6i8OjIj3di31BJ6dXyK0zOHuX1RReGEnA.png?1678951908)

**Описание:** This TradingView image displays a **1-day (1D) candlestick chart** for **Amazon.com, Inc. (NASDAQ: AMZN)**. Here’s a detailed breakdown of all elements:  


### 1. **Header & Stock Info**  
- **Stock Title**: *“Amazon.com, Inc. · 1D · NASDAQ”* (identifies the company, time frame, and exchange).  
- **Price Metrics**:  
  - `O89.97` (Open price), `H94.02` (High), `L88.12` (Low), `C92.43` (Close), `+1.70 (+1.87%)` (daily gain).  
- **Sun Icon**: Indicates the current trading session (likely pre-market or post-market, based on the sun symbol).  


### 2. **Price Boxes (Top-Left)**  
- **Red Box**: `92.92` (likely the *last traded price* or a key reference price) with `0.38` (change from a prior value).  
- **Blue Box**: `93.30` (another reference price, e.g., bid/ask or a custom indicator value).  


### 3. **Chart Area**  
- **Candlestick Chart**: Shows price action over the 1-day period. Red candles = price decline; green candles = price increase.  
- **Grid Lines**: Light gray lines for price/time reference.  


### 4. **Study/Strategy Error Pop-Up**  
A white pop-up with a red warning icon (`!`) displays:  
- **Title**: *“Study Error”* (indicates a technical issue with a custom indicator/strategy).  
- **Message**: *“Maximum number of orders (9000) was reached.”* (the strategy exceeded its order limit, likely due to excessive backtesting or a bug).  


### 5. **Strategy Label**  
- *“My strategy”* (text label) with a red warning icon (`!`) next to it, linking the error to this custom strategy.  


### Purpose of Elements  
- **Header/Price Metrics**: Provide real-time stock data (open, high, low, close, % change).  
- **Price Boxes**: Show key price levels (e.g., last trade, bid/ask, or indicator values).  
- **Candlestick Chart**: Visualize price trends (up/down) over the 1-day period.  
- **Error Pop-Up**: Alerts the user to a technical issue with their custom strategy (order limit exceeded).  


This image captures a trading session with a technical error in a custom strategy, alongside core stock price data and a candlestick chart for trend analysis.


