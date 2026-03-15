# Strategy produces unrealistic results on non-standard chart types (Heikin Ashi, Renko, etc.)

**URL:** https://www.tradingview.com/support/solutions/43000481029-strategy-produces-unrealistic-results-on-non-standard-chart-types-heikin-ashi-renko-etc/

---

- [ Help Center ](/) - / - / [ Strategy produces unrealistic results on non-standard chart types… ](/support/solutions/43000481029-strategy-produces-unrealistic-results-on-non-standard-chart-types-heikin-ashi-renko-etc/) # Strategy produces unrealistic results on non-standard chart types (Heikin Ashi, Renko, etc.) On TradingView, strategies can be applied to any type of chart, including non-standard ones like Heikin Ashi (HA), Renko, Kagi, Point and Figure and Range. Because of the inherently synthetic nature of price levels on non-standard charts, backtesting results calculated on them will typically not produce results representing real market conditions. Strategy orders are filled using the chart's OHLC values, as is documented in the [User Manual](https://www.tradingview.com/pine-script-docs/concepts/strategies/#broker-emulator). A strategy running on a Renko chart, for example, will use the price levels from the Renko bricks rather than from real market prices. Our Help Center pages explain their [features](https://www.tradingview.com/?solution=43000502284) and [calculations](https://www.tradingview.com/?solution=43000480330). Renko brick levels, being disconnected from actual market prices at any given moment, will fill orders using their own prices and therefore, will not produce reliable strategy results. This is because the formation of boxes in real-time is different from recorded historical data. Note: Heikin Ashi charts differ from other non-standard types because, while the OHLC are synthetic, the Heikin Ashi bars are tied to the time scale in the same way regular charts are. As a result, every single regular chart bar has exactly one Heikin Ashi bar calculated based on it. Thanks to this, a strategy can be calculated on the data from a Heikin Ashi chart, but still open and close positions based on non-synthetic data from a standard chart. To turn this option on, open the strategy's Properties and select the "Using standard OHLC" option. Consider this simple strategy: Pine Script® // @version= 6 strategy ( "My Strategy" , overlay = true ) longCondition = open &lt; close if ( longCondition ) strategy.entry ( "My Long Entry Id" , strategy.long ) shortCondition = open &gt; close if ( shortCondition ) strategy.entry ( "My Short Entry Id" , strategy.short ) Expand 3 lines On a standard chart using normal candles, it produces results that are quite ordinary. It will also produce the exact same results on any other standard chart type: Bars, Hollow candles, Line, Area or Baseline. If, however, you run that same strategy on any non-standard chart type, you will obtain different results that cannot be reproduced in real markets. On a Renko chart, for example, we obtain this: These results are calculated using the Renko chart's synthetic prices, which most likely do not reflect the actual order fills you would get if you were trading for real. Why do we allow strategies to run on non-standard charts? The different methods used to interpret price action in building non-standard charts can provide traders with an original perspective when analyzing markets. Traders who understand their advantages and limitations may find them useful. We provide tools and believe it's up to traders to select the ones they want to use to trade. However, we still consider it our duty to warn our community: exercise caution when using strategies on non-standard chart types. Use them privately if you wish, but in order to protect the community we will moderate script publications using strategies on non-standard charts. Previous Previous I've successfully added a strategy to my chart, but it doesn't generate orders Next Next I've added a script from the Community Scripts, and it is calculated incorrectly and/or I don't understand how it works Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43546332757/original/FKlxBAtyTyaQK2_fOOFtazgMAXZ2ORT6xQ.png?1741958551)

**Описание:** This TradingView interface section focuses on **margin settings, recalculation triggers, and order filling logic** for backtesting or strategy execution. Here’s a detailed breakdown:  


### 1. **Margin Section**  
- **Title**: “MARGIN” (header, gray text).  
- **“Margin for long positions”**:  
  - Label: Text field for input.  
  - Input Box: Pre-filled with `100` (percentage).  
  - Units: `%` (gray text, right of input).  
  - Info Icon: Gray circle with “i” (tooltip for margin details).  
- **“Margin for short positions”**:  
  - Identical structure to long positions: Label, input box (`100`), `%`, and info icon.  


### 2. **Recalculate Section**  
- **Title**: “RECALCULATE” (header, gray text).  
- **“After order is filled”**:  
  - Checkbox: Unchecked (empty square).  
  - Info Icon: Gray “i” (tooltip for recalculation timing).  
- **“On every tick”**:  
  - Checkbox: Unchecked (empty square).  
  - Info Icon: Gray “i” (tooltip for tick-based recalculation).  


### 3. **Fill Orders Section**  
- **Title**: “FILL ORDERS” (header, gray text).  
- **Unlabeled Checkbox (top)**:  
  - Unchecked (empty square).  
  - Tooltip: Black box explaining: *“Forces strategies running on Heikin Ashi charts to fill orders using actual OHLC prices, for more realistic results”* (describes behavior for Heikin Ashi chart strategies).  
- **“Using standard OHLC”**:  
  - Checkbox: Checked (filled square, indicating this option is active).  
  - Info Icon: Gray “i” (tooltip for standard OHLC order filling).  


### Purpose of Elements  
- **Margin Inputs**: Define the percentage of account equity required to open long/short positions (e.g., 100% means full margin).  
- **Recalculate Checkboxes**: Control when the strategy recalculates (e.g., after orders fill, or on every price tick).  
- **Fill Orders Checkboxes**: Choose how orders are filled (standard OHLC vs. Heikin Ashi-specific logic) to simulate realistic trade execution.  


This section is critical for configuring how a trading strategy handles margin, recalculates, and executes orders during backtesting or live trading.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43546331731/original/PNExyppU3k1nE7oUPH9ocaGVziZFiRQpkQ.png?1741958297)

**Описание:** This TradingView image displays a **NASDAQ-listed stock (TSLA)** on a **1-day (1D) candlestick chart** with a **Strategy Tester** panel, analyzing a custom trading strategy (\


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43546331791/original/_EekWOHFnEaYvbFp-IF6E4UamXfH4XMMrw.png?1741958306)

**Описание:** This TradingView image displays a **NASDAQ stock chart (Renko [ATR(14), 6.5])** for an unspecified ticker, with a focus on a custom trading strategy (\


