# Strategy produces unrealistic results on non-standard chart types (Heikin Ashi, Renko, etc.)

**URL:** https://www.tradingview.com/support/solutions/43000481029-strategy-produces-unrealistic-results-on-non-standard-chart-types-heikin-ashi-renko-etc/

---

- [ Help Center ](/)
- / 
- / [ Strategy produces unrealistic results on non-standard chart types… ](/support/solutions/43000481029-strategy-produces-unrealistic-results-on-non-standard-chart-types-heikin-ashi-renko-etc/)

# Strategy produces unrealistic results on non-standard chart types (Heikin Ashi, Renko, etc.) 
 On TradingView, strategies can be applied to any type of chart, including non-standard ones like Heikin Ashi (HA), Renko, Kagi, Point and Figure and Range. Because of the inherently synthetic nature of price levels on non-standard charts, backtesting results calculated on them will typically not produce results representing real market conditions.

Strategy orders are filled using the chart's OHLC values, as is documented in the [User Manual](https://www.tradingview.com/pine-script-docs/concepts/strategies/#broker-emulator). A strategy running on a Renko chart, for example, will use the price levels from the Renko bricks rather than from real market prices. Our Help Center pages explain their [features](https://www.tradingview.com/?solution=43000502284) and [calculations](https://www.tradingview.com/?solution=43000480330). Renko brick levels, being disconnected from actual market prices at any given moment, will fill orders using their own prices and therefore, will not produce reliable strategy results. This is because the formation of boxes in real-time is different from recorded historical data.

Note: Heikin Ashi charts differ from other non-standard types because, while the OHLC are synthetic, the Heikin Ashi bars are tied to the time scale in the same way regular charts are. As a result, every single regular chart bar has exactly one Heikin Ashi bar calculated based on it. Thanks to this, a strategy can be calculated on the data from a Heikin Ashi chart, but still open and close positions based on non-synthetic data from a standard chart. To turn this option on, open the strategy's Properties and select the "Using standard OHLC" option.

Consider this simple strategy:

 Pine Script® // @version= 6 
 strategy ( "My Strategy" , overlay = true ) 
 longCondition = open < close 
 if ( longCondition ) 
 strategy.entry ( "My Long Entry Id" , strategy.long ) 
 shortCondition = open > close 
 if ( shortCondition ) 
 strategy.entry ( "My Short Entry Id" , strategy.short ) 
 Expand 3 lines On a standard chart using normal candles, it produces results that are quite ordinary. It will also produce the exact same results on any other standard chart type: Bars, Hollow candles, Line, Area or Baseline.

If, however, you run that same strategy on any non-standard chart type, you will obtain different results that cannot be reproduced in real markets. On a Renko chart, for example, we obtain this:

These results are calculated using the Renko chart's synthetic prices, which most likely do not reflect the actual order fills you would get if you were trading for real.
 Why do we allow strategies to run on non-standard charts? 
The different methods used to interpret price action in building non-standard charts can provide traders with an original perspective when analyzing markets. Traders who understand their advantages and limitations may find them useful. We provide tools and believe it's up to traders to select the ones they want to use to trade. However, we still consider it our duty to warn our community: exercise caution when using strategies on non-standard chart types. Use them privately if you wish, but in order to protect the community we will moderate script publications using strategies on non-standard charts.
 Previous Previous I've successfully added a strategy to my chart, but it doesn't generate orders Next Next I've added a script from the Community Scripts, and it is calculated incorrectly and/or I don't understand how it works Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43546332757/original/FKlxBAtyTyaQK2_fOOFtazgMAXZ2ORT6xQ.png?1741958551

**Описание:**

This image displays a **TradingView strategy configuration interface** focused on margin settings, order recalculation options, and order filling behavior. Below is a detailed breakdown of all UI elements and their purposes:


### 1. **Margin Section**  
- **Header**: \

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43546331731/original/PNExyppU3k1nE7oUPH9ocaGVziZFiRQpkQ.png?1741958297

**Описание:**

This image shows a **TradingView interface** displaying a stock chart for **TSLA (Tesla Inc.)** on the NASDAQ exchange, with a focus on a **Strategy Tester** report for a custom trading strategy. Here’s a detailed breakdown of all elements:


### **1. Top Header & Stock Info**
- **Symbol & Exchange**: `TSLA : 1D · NASDAQ` (Tesla, daily timeframe, NASDAQ).  
- **Price Data**:  
  - `O218.93 H220.85 L214.62 C217.49 -1.05 (-0.48%)`: Open ($218.93), High ($220.85), Low ($214.62), Close ($217.49), change (-$1.05, -0.48%).  
- **Trading Buttons**:  
  - `SELL 216.12` (red button, current sell price).  
  - `BUY 211.12` (blue button, current buy price).  
- **Currency**: `USD` (dropdown for currency selection).  


### **2. Chart Area**
- **Candlestick Chart**: Shows TSLA’s price action over time (from July 2024 to March 2025). Red candles = price decline; green candles = price increase.  
- **Strategy Signals**:  
  - Red downward arrows = **sell signals** (strategy suggests selling).  
  - Blue upward arrows = **buy signals** (strategy suggests buying).  
- **Key Price Levels**:  
  - `221.89` (black box, likely a reference price).  
  - `Pre 211.12` (orange, previous close).  
  - `209.68` (red, support/resistance level).  
- **Time Axis**: Months labeled (Jul '24, Sep, Oct, Nov, Dec, 2025, Feb, Mar) with a timeline marker at `Thu 25 Jul '24`.  


### **3. Chart Controls (Below Chart)**
- **Timeframe Buttons**: `1D` (selected, daily), `5D`, `1M`, `3M`, `6M`, `YTD`, `1Y`, `5Y`, `All` (switch chart periods).  
- **Date Picker**: Calendar icon (for custom date ranges).  
- **Timestamp**: `09:16:40 UTC-4` (current time).  
- **Adjustment**: `ADJ` (adjustments for splits/dividends).  


### **4. Strategy Tester Tabs**
- **Tabs**: `Stock Screener` (dropdown), `Pine Editor` (for coding strategies), `Strategy Tester` (selected, blue), `Replay Trading`, `Trading Panel`.  


### **5. Strategy Report Section**
- **Report Header**: `My Strategy report` (dropdown) + `Deep Backtesting` toggle (gray, disabled).  
- **Report Tabs**:  
  - `Overview` (selected, black), `Performance`, `Trades analysis`, `Risk/performance ratios`, `List of trades`.  
- **Performance Metrics**:  
  - `Total P&L`: `-29.50 USD 0.00%` (total profit/loss, red = loss).  
  - `Max equity drawdown`: `182.52 USD 0.02%` (largest drop in equity).  
  - `Total trades`: `5,217` (number of trades).  
  - `Profitable trades`: `30.48% 1590/2523` (30.48% of trades were profitable).  
  - `Profit factor`: `0.966` (ratio of gross profit to gross loss; <1 = unprofitable).  


### **6. Equity Curve (Bottom Chart)**
- **Y-Axis**: `1,000,000.00` to `999,900.00` (starts at $1M, ends near $999,900, reflecting the -$29.50 P&L).  
- **X-Axis**: Trade numbers (1 to 5,214).  
- **Legend**:  
  - `Equity` (checked, shows the strategy’s equity curve).  
  - `Drawdown` (unchecked, would show drawdown).  
  - `Buy & hold equity` (unchecked, would show buy-and-hold performance).  
- **View Toggle**: `Absolute` (selected) vs. `Percentage` (for equity curve scaling).  


### **Purpose of the Interface**
This screen is used to **backtest a custom trading strategy** for TSLA. The chart displays price action with strategy-generated buy/sell signals, while the report below analyzes the strategy’s performance (P&L, drawdown, win rate, etc.). Traders use this to evaluate if a strategy is profitable before live trading. The equity curve visualizes how the strategy’s capital would have grown (or shrunk) over time.

---

### Изображение 3

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43546331791/original/_EekWOHFnEaYvbFp-IF6E4UamXfH4XMMrw.png?1741958306

**Описание:**

This image shows a **TradingView interface** displaying a **Renko chart** for the stock **TSLA (Tesla, Inc.)** on the NASDAQ exchange, with a focus on a custom trading strategy (\

---

