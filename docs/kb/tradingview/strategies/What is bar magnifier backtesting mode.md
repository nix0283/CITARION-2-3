# What is bar magnifier backtesting mode

**URL:** https://www.tradingview.com/support/solutions/43000669285-what-is-bar-magnifier-backtesting-mode/

---

- [ Help Center ](/) - / - / [ I'd like to know more about strategies ](/support/folders/43000549427-i-d-like-to-know-more-about-strategies/) - / [ What is bar magnifier backtesting mode ](/support/solutions/43000669285-what-is-bar-magnifier-backtesting-mode/) # What is bar magnifier backtesting mode You can obtain more realistic order fills in your strategy backtesting by using the "Bar Magnifier" option. This tool uses intrabar inspection to give you a more granular view of price movement within a bar for more precise order fills. When enabled, Bar Magnifier mode makes the broker emulator use only OHLC values for historical bars instead of assuming how the price moved. The intrabar interval used with the Bar Magnifier dynamically adjusts with the chart interval. The following table lists the intrabar intervals used for progressively higher chart intervals. **Chart timeframe (includes timeframes between it and the next one)** **Intrabar timeframe used** 1T 1T 100T 10T 1000T 100T 1S 1S 30S 5S 1 10S 5 30S 10 1 15 2 30 5 60 10 240 30 1D 60 3D 240 1W 1D Here's an example of a strategy that uses a stop order without using the Bar Magnifier option. Pine Script® // @version= 5 strategy ( "bar_magnifier_demo" , overlay = true , use_bar_magnifier = false ) if bar_index == 10381 strategy.entry ( "Long" , strategy.long , stop = 157.0 ) strategy.exit ( "Exit" , stop = 156.0 ) Expand 1 line The broker emulator places a stop order on bar #10,381 and fills an order with a price of 157.0 on the next bar as soon as the stop = 157.0 condition is met. The broker emulator estimates that inside the bar itself, the price goes from "open" to "low," then to "high" (triggering the entry), then to "close." After a few bars (11 days for the current timeframe), the condition for exiting the position with the stop price = 156.0 is triggered. When the Bar magnifier is enabled (parameter use_bar_magnifier = true), exit and entry prices are unchanged. However, the exit from the position occurs inside the same bar in which the entry happened. Pine Script® // @version= 5 strategy ( "bar_magnifier_demo" , overlay = true , use_bar_magnifier = true ) if bar_index == 10381 strategy.entry ( "Long" , strategy.long , stop = 157.0 ) strategy.exit ( "Exit" , stop = 156.0 ) Expand 1 line If we check the lower chart interval for the same symbol (a 60-minute chart, according to the intrabar interval table) and find the time range corresponding to bar 10,382, we can see that on the hourly interval, after reaching 157.0 and triggering the entry, the price goes down below 156.0, satisfying the stop = 156.0 condition. With Bar Magnifier on, the broker emulator gets access to price changes from lower intervals during backtesting, making its behavior more similar to what would happen during forward testing the strategy for the same time period. To switch the Bar magnifier option, toggle the corresponding input in strategy's "Settings/Properties" window. ! Note: The strategy can't request more than 200,000 bars from the lower timeframe. For symbols with a lot of historical data (where Num of Bars on the Chart × Num of Lower Timeframe Bars per Chart Bar &gt; 200,000), the first trades on the chart might not be affected by the bar magnifier. The number of bars, starting from the end of the chart, that can be affected by the Bar Magnifier can be roughly calculated using the following formula. last_bar_index - (200000 / Num of Lower Timeframe Bars per Chart Bar) The resulting value will be a rough approximation, because the number of lower timeframe bars can differ from one bar to another. Also read: - [Bar Replay: how and why to test a strategy in the past](https://www.tradingview.com/support/solutions/43000712747-bar-replay-how-and-why-to-test-a-strategy-in-the-past/) - [The technical analysis essentials](https://www.tradingview.com/support/solutions/43000759577-the-technical-analysis-essentials-with-tradingview/) - [Introduction to fundamental analysis](https://www.tradingview.com/support/solutions/43000759574-introduction-to-fundamental-analysis-on-tradingview/) - [How to trade on TradingView](https://www.tradingview.com/support/solutions/43000756695-how-to-trade-on-tradingview/) - [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/) Previous Previous Strategy properties Next Next How to simulate trading with leverage in Pine Script Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43326690338/original/XuukAw-5XEu76fNzo18Ckgf01c77hvg2Cg.png?1653467457)

**Описание:** This TradingView image displays a **daily candlestick chart** for the stock `bar_magnifier_demo` (NASDAQ) with trading strategy annotations and a results table. Here’s a detailed breakdown:  


### 1. **Top Header & Price Data**  
- **Symbol/Timeframe**: `bar_magnifier_demo · 1D · NASDAQ` (1-day candlestick chart for the stock).  
- **Price Metrics**: `O165.02 H167.82 L163.91 C167.40` (Open, High, Low, Close prices for the current candle).  
- **Strategy Label**: `bar_magnifier_demo` (name of the applied strategy).  


### 2. **Candlestick Chart**  
- **Candles**: Green (upward price movement) and red (downward) candles show price action over time (x-axis: dates from late Jan to early Mar).  
- **Annotations**:  
  - `Long +1` (blue arrow): Marks a **long entry** (buy signal) on a green candle.  
  - `-1 Exit` (purple arrow): Marks a **long exit** (sell signal) on a red candle.  


### 3. **Timeframe Selector**  
Below the chart, a row of buttons lets users switch timeframes: `1D` (selected), `5D`, `1M`, `3M`, `6M`, `YTD`, `1Y`, `5Y`, `All`. A “swap” icon (⇄) is also present (likely for inverting chart axes).  


### 4. **Tab Bar**  
Tabs for additional tools: `Stock Screener` (dropdown), `Text Notes`, `Pine Editor`, `Strategy Tester` (selected, blue), `Trading Panel`.  


### 5. **Strategy Results Table**  
Below the tabs, a table summarizes trades:  
- **Columns**: `Trade #`, `Type` (e.g., `Exit Long`, `Entry Long`), `Signal` (e.g., `Exit`, `Long`), `Date`, `Price`, `Contracts`, `Profit`.  
- **Trade Details**:  
  - Trade 1: `Exit Long` (signal: `Exit`) on `2022-03-08` at `$156.00`, 1 contract, profit `- $1.00` (-0.64%).  
  - Entry: `Entry Long` (signal: `Long`) on `2022-02-24` at `$157.00`.  


### 6. **UI Icons (Left of Table)**  
- `bar_magnifier_demo` (strategy name) + settings (⚙️), refresh (↻), download (↓) icons (for strategy configuration, reloading, or exporting data).  


### Purpose  
The chart visualizes price action with strategy-generated entry/exit signals, while the table quantifies trade performance (profit/loss, dates, prices). The timeframe selector and tabs enable customization of the view or access to related tools (e.g., Pine Script editor, strategy testing).


**Описание:** This TradingView image displays a **1-day (1D) candlestick chart** for the NASDAQ-listed stock **TSLA** (Tesla), with the following key elements:  


### 1. **Top Header & Price Data**  
- **Symbol & Exchange**: “TSLA · 1D · NASDAQ” (stock ticker, time frame, exchange).  
- **Price Metrics**: “O165.02 H167.82 L163.91 C167.40” (Open, High, Low, Close prices for the current candle).  
- **Indicator Label**: “bar_magnifier_demo” (name of the applied technical indicator).  


### 2. **Candlestick Chart**  
- **Candles**: Green (upward price movement) and red (downward) candles show daily price action (open, high, low, close).  
- **Annotations**:  
  - Blue arrow + “Long +1”: Marks a **long entry signal** (buy order) on a green candle.  
  - Purple arrow + “-1 Exit”: Marks a **long exit signal** (sell order) on a red candle.  


### 3. **Time Frame Selector (Below Chart)**  
Buttons for time frames: `1D` (selected), `5D`, `1M`, `3M`, `6M`, `YTD`, `1Y`, `5Y`, `All` (switches chart to different periods).  


### 4. **Tab Bar (Below Time Frame Selector)**  
Tabs for tools/features:  
- `Stock Screener` (dropdown), `Text Notes`, `Pine Editor`, `Strategy Tester` (selected, blue), `Trading Panel`.  


### 5. **Indicator Controls (Below Tab Bar)**  
- `bar_magnifier_demo` (indicator name) + icons:  
  - Gear (settings), Refresh (reload), Download (export data).  


### 6. **Strategy Tester Table (Bottom)**  
Displays trade history for the “bar_magnifier_demo” strategy:  
- **Columns**: `Trade #`, `Type` (e.g., “Exit Long”, “Entry Long”), `Signal` (e.g., “Exit”, “Long”), `Date`, `Price`, `Contracts`, `Profit`.  
- **Trades Shown**:  
  - Trade 1: “Exit Long” on 2022-03-08 at $156.00 (1 contract, -$1.00 profit, -0.64% return).  
  - “Entry Long” on 2022-02-24 at $157.00 (long position entry).  


### Purpose  
The chart visualizes TSLA’s price action with a custom indicator (“bar_magnifier_demo”) that generates **long entry/exit signals**. The Strategy Tester table validates the strategy’s performance (e.g., profit/loss per trade). Time frame buttons and tabs enable chart customization and access to tools like the Pine Editor (for coding indicators) or Trading Panel (for live trading).


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43326690339/original/Hp_G1sSnFbhtEkgzQvMj8lOt5jSAWzzZmg.png?1653467458)

**Описание:** This TradingView image displays a **1-day (1D) candlestick chart** for the stock \


**Описание:** This TradingView chart displays **AAPL (Apple Inc.)** on the **NASDAQ** exchange with a **1-day (1D)** time frame. Here’s a detailed breakdown:  


### **Top Bar (Ticker & Price Data)**  
- **Ticker/Exchange**: `AAPL · 1D · NASDAQ` (stock symbol, timeframe, exchange).  
- **Price Metrics**: `O165.02 H167.82 L163.91 C167.40` (Open, High, Low, Close for the current candle).  
- **Indicator Label**: `bar_magnifier_demo` (name of the applied technical indicator).  


### **Main Chart (Candlestick Chart)**  
- **Candlesticks**: Green (price closed higher than open) and red (price closed lower than open) bars, representing daily price action.  
- **Annotations**:  
  - `Long +1`: Blue arrow + label indicating a **long (buy) trade entry** (signal to buy).  
  - `Exit -1`: Purple arrow + label indicating a **trade exit** (signal to sell/close the long position).  
- **Time Axis**: Dates (e.g., `Feb`, `Mar`, `24`, `7`, `14`, `18`, `7`) mark the timeline.  


### **Timeframe Selector (Below Chart)**  
Buttons for switching timeframes: `1D` (selected), `5D`, `1M`, `3M`, `6M`, `YTD`, `1Y`, `5Y`, `All`.  


### **Tab Bar (Below Timeframe Selector)**  
Tabs for additional tools:  
- `Stock Screener` (dropdown), `Text Notes`, `Pine Editor`, `Strategy Tester` (selected, blue), `Trading Panel`.  


### **Indicator Controls (Below Tab Bar)**  
- `bar_magnifier_demo` (indicator name) with icons:  
  - Gear (settings), refresh (reload), download (export data).  


### **Trade Log (Bottom Section)**  
A table detailing trade history:  
- **Columns**: `Trade #`, `Type` (e.g., `Exit Long`, `Entry Long`), `Signal` (e.g., `Exit`, `Long`), `Date` (e.g., `2022-02-24`), `Price` (e.g., `156.00`, `157.00`), `Contracts` (e.g., `1`), `Profit` (e.g., `-$1.00`, `-0.64%`).  


### **Purpose of Elements**  
- **Candlestick Chart**: Visualizes price movements (open, high, low, close) over time.  
- **Annotations**: Mark trade signals (entry/exit) for strategy testing.  
- **Timeframe Selector**: Adjusts the chart’s time horizon (e.g., 1 day, 1 month).  
- **Tabs**: Access tools like strategy testing (`Strategy Tester`) or code editing (`Pine Editor`).  
- **Trade Log**: Records executed trades (entry/exit details, profit/loss) for backtesting.  


This layout is typical for **strategy testing** in TradingView, where users analyze historical price data, apply indicators, and validate trading strategies.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43326690335/original/ckREF_lfJcTbIcUhuuluXD50Tk8kq_uxnw.png?1653467457)

**Описание:** This TradingView image displays a **multi-timeframe analysis of Apple Inc. (NASDAQ: AAPL)** with two candlestick charts, annotations, and key trading data. Here’s a detailed breakdown:  


### 1. **Top Chart: 1-Day (1D) Timeframe**  
- **Title & Data**:  
  - Header: *“Apple Inc · 1D · NASDAQ”* (instrument, timeframe, exchange).  
  - Price data: *“O165.02 H167.82 L163.91 C167.40”* (Open, High, Low, Close for the day).  
  - Chart title: *“magnifier_demo”* (custom chart label).  

- **Candlestick Chart**:  
  - Green candles = price closed **higher** than open; red = closed **lower**.  
  - X-axis: Dates (e.g., “18”, “Mar”, “7”, “14”, “21” — likely late February to late March).  

- **Annotations**:  
  - *“Long +1”*: Blue arrow pointing to a green candle, indicating a **long (buy) trade entry** (signal strength +1).  
  - *“-1 Exit”*: Purple arrow pointing to a red candle, indicating a **trade exit** (signal strength -1).  


### 2. **Bottom Chart: 1-Hour (1h) Timeframe**  
- **Title & Data**:  
  - Header: *“Apple Inc · 1h · NASDAQ”* (instrument, timeframe, exchange).  
  - Price data: *“O167.51 H167.81 L166.95 C167.44”* (Open, High, Low, Close for the hour).  

- **Candlestick Chart**:  
  - Green/red candles (same color logic as 1D).  
  - X-axis: Dates (e.g., “24”, “25”, “28”, “Mar” — specific days in March).  

- **Annotations & UI Elements**:  
  - *“The stop price inside the lower timeframe has been reached”*: Blue arrow pointing to a dashed horizontal line (stop-loss level) and a green candle, explaining a stop-loss trigger.  
  - *“7 bars, 1d Vol 10.161M”*: Blue box with text, likely describing a volume or time-based metric (e.g., 7 1-hour bars = 7 hours, or 7 days of 1-hour data; volume = 10.161 million shares).  
  - Dashed horizontal line: Visual stop-loss level.  


### 3. **UI & Purpose**  
- **Timeframes**: The 1D chart shows daily trends; the 1h chart provides a shorter-term (intraday) view for trade execution/management.  
- **Annotations**: Highlight trade signals (entry/exit) and stop-loss logic, demonstrating multi-timeframe trading strategies.  
- **Data Labels**: Open/High/Low/Close (OHLC) values and volume help traders assess price action and liquidity.  


This layout is typical for technical analysis, where traders use longer (1D) and shorter (1h) timeframes to confirm trends, time entries, and manage risk (e.g., stop-losses).


**Описание:** This TradingView image displays two candlestick charts for **Apple Inc (NASDAQ)** with annotations explaining a trading strategy:  


### 1. Top Chart: 1-Day (1D) Timeframe  
- **Header**: Shows the stock symbol, timeframe, exchange, and price data:  
  - `O 165.02` (Open), `H 167.82` (High), `L 163.91` (Low), `C 167.40` (Close).  
- **Chart Type**: Candlestick chart (green = closing > opening; red = closing < opening).  
- **Annotations**:  
  - `Long +1`: Blue arrow pointing to a green candle, indicating a long (buy) trade entry.  
  - `Exit -1`: Purple arrow pointing to the same candle, indicating a trade exit.  
  - A purple triangle (trade signal) on the green candle.  
- **X-Axis**: Dates (e.g., `18`, `Mar`, `7`, `14`, `21`), representing daily time intervals.  


### 2. Bottom Chart: 1-Hour (1h) Timeframe  
- **Header**: Shows the stock symbol, timeframe, and price data:  
  - `O 167.51` (Open), `H 167.81` (High), `L 166.95` (Low), `C 167.44` (Close).  
- **Chart Type**: Candlestick chart (same color coding as the 1D chart).  
- **Annotations**:  
  - `The stop price inside the lower timeframe has been reached`: Blue arrow pointing to a dashed horizontal line (stop-loss level) and a green candle.  
  - `7 bars, 1d Vol 10.161M`: Blue box with text, indicating the stop price was triggered after 7 hourly bars (equivalent to ~1 day) with 10.161M volume.  
- **X-Axis**: Dates (e.g., `24`, `25`, `28`, `Mar`), representing hourly time intervals.  


### Key UI Elements & Purpose  
- **Timeframes**: 1D (long-term) and 1h (short-term) to analyze trends across different horizons.  
- **Price Data (OHLC)**: Open, High, Low, Close values for context on daily/hourly price action.  
- **Annotations**: Explain trade signals (long entry/exit) and stop-loss logic (triggered in the 1h chart, aligned with the 1D trade).  
- **Candlestick Colors**: Green = bullish (close > open); red = bearish (close < open).  


This layout demonstrates a multi-timeframe trading strategy, using the 1D chart for trend direction and the 1h chart to time entries/exits (e.g., stop-loss execution).


