# What is bar magnifier backtesting mode

**URL:** https://www.tradingview.com/support/solutions/43000669285-what-is-bar-magnifier-backtesting-mode/

---

- [ Help Center ](/)
- / 
- / [ I'd like to know more about strategies ](/support/folders/43000549427-i-d-like-to-know-more-about-strategies/)
- / [ What is bar magnifier backtesting mode ](/support/solutions/43000669285-what-is-bar-magnifier-backtesting-mode/)

# What is bar magnifier backtesting mode 
 You can obtain more realistic order fills in your strategy backtesting by using the "Bar Magnifier" option. This tool uses intrabar inspection to give you a more granular view of price movement within a bar for more precise order fills.

When enabled, Bar Magnifier mode makes the broker emulator use only OHLC values for historical bars instead of assuming how the price moved.

The intrabar interval used with the Bar Magnifier dynamically adjusts with the chart interval. The following table lists the intrabar intervals used for progressively higher chart intervals.
 **Chart timeframe (includes timeframes between it and the next one)** **Intrabar timeframe used** 1T 1T 100T 10T 1000T 100T 1S 1S 30S 5S 1 10S 5 30S 10 1 15 2 30 5 60 10 240 30 1D 60 3D 240 1W 1D 
Here's an example of a strategy that uses a stop order without using the Bar Magnifier option.

 Pine Script® // @version= 5 
 strategy ( "bar_magnifier_demo" , overlay = true , use_bar_magnifier = false ) 

 if bar_index == 10381 
 strategy.entry ( "Long" , strategy.long , stop = 157.0 ) 
 strategy.exit ( "Exit" , stop = 156.0 ) 
 Expand 1 line The broker emulator places a stop order on bar #10,381 and fills an order with a price of 157.0 on the next bar as soon as the stop = 157.0 condition is met. The broker emulator estimates that inside the bar itself, the price goes from "open" to "low," then to "high" (triggering the entry), then to "close." After a few bars (11 days for the current timeframe), the condition for exiting the position with the stop price = 156.0 is triggered.

When the Bar magnifier is enabled (parameter use_bar_magnifier = true), exit and entry prices are unchanged. However, the exit from the position occurs inside the same bar in which the entry happened.

 Pine Script® // @version= 5 
 strategy ( "bar_magnifier_demo" , overlay = true , use_bar_magnifier = true ) 

 if bar_index == 10381 
 strategy.entry ( "Long" , strategy.long , stop = 157.0 ) 
 strategy.exit ( "Exit" , stop = 156.0 ) 
 Expand 1 line 

If we check the lower chart interval for the same symbol (a 60-minute chart, according to the intrabar interval table) and find the time range corresponding to bar 10,382, we can see that on the hourly interval, after reaching 157.0 and triggering the entry, the price goes down below 156.0, satisfying the stop = 156.0 condition.

With Bar Magnifier on, the broker emulator gets access to price changes from lower intervals during backtesting, making its behavior more similar to what would happen during forward testing the strategy for the same time period.

To switch the Bar magnifier option, toggle the corresponding input in strategy's "Settings/Properties" window.

! Note: The strategy can't request more than 200,000 bars from the lower timeframe.

For symbols with a lot of historical data (where Num of Bars on the Chart × Num of Lower Timeframe Bars per Chart Bar > 200,000), the first trades on the chart might not be affected by the bar magnifier.

The number of bars, starting from the end of the chart, that can be affected by the Bar Magnifier can be roughly calculated using the following formula.

last_bar_index - (200000 / Num of Lower Timeframe Bars per Chart Bar) The resulting value will be a rough approximation, because the number of lower timeframe bars can differ from one bar to another.

Also read:

- [Bar Replay: how and why to test a strategy in the past](https://www.tradingview.com/support/solutions/43000712747-bar-replay-how-and-why-to-test-a-strategy-in-the-past/)
- [The technical analysis essentials](https://www.tradingview.com/support/solutions/43000759577-the-technical-analysis-essentials-with-tradingview/)
- [Introduction to fundamental analysis](https://www.tradingview.com/support/solutions/43000759574-introduction-to-fundamental-analysis-on-tradingview/)
- [How to trade on TradingView](https://www.tradingview.com/support/solutions/43000756695-how-to-trade-on-tradingview/)
- [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/)
 Previous Previous Strategy properties Next Next How to simulate trading with leverage in Pine Script Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43326690338/original/XuukAw-5XEu76fNzo18Ckgf01c77hvg2Cg.png?1653467457

**Описание:**

This image displays a **TradingView chart interface** (likely from the \

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43326690339/original/Hp_G1sSnFbhtEkgzQvMj8lOt5jSAWzzZmg.png?1653467458

**Описание:**

This image displays a **TradingView chart interface** for analyzing stock price movements, specifically showing a candlestick chart with trading signals and a detailed trade log. Here’s a comprehensive breakdown:


### **1. Top Section: Chart Header & Price Data**
- **Symbol & Timeframe**:  
  - `TSLA` (Tesla stock)  
  - `1D` (1-day candlestick timeframe)  
  - `NASDAQ` (exchange)  
- **Price Metrics**:  
  - `O:165.02` (Open price)  
  - `H:167.82` (High price)  
  - `L:163.91` (Low price)  
  - `C:167.40` (Close price)  
- **Chart Title**: `bar_magnifier_demo` (name of the chart/indicator being used).  


### **2. Main Chart Area: Candlestick Chart**
- **Candlesticks**:  
  - Green candles = price closed **higher** than it opened (bullish).  
  - Red candles = price closed **lower** than it opened (bearish).  
- **Trading Signals**:  
  - A green candle with a **blue upward arrow** labeled `Long +1` (entry signal for a long position).  
  - A purple downward arrow labeled `Exit -1` (exit signal for the long position).  
- **Time Axis**:  
  - X-axis shows dates: `24` (late Jan), `Feb` (February), `18` (Feb 18), `Mar` (March), `7` (Mar 7).  


### **3. Timeframe Selector (Below Chart)**
Buttons to adjust the chart’s time period:  
- `1D` (1-day, current selection)  
- `5D` (5-day)  
- `1M` (1-month)  
- `3M` (3-month)  
- `6M` (6-month)  
- `YTD` (Year-to-Date)  
- `1Y` (1-year)  
- `5Y` (5-year)  
- `All` (all available data)  
- **Swap icon** (rotates the chart’s time axis).  


### **4. Tab Bar (Below Timeframe Selector)**
Tabs for different tools/features:  
- `Stock Screener` (dropdown menu, likely for filtering stocks).  
- `Text Notes` (add text annotations to the chart).  
- `Pine Editor` (TradingView’s scripting language for custom indicators).  
- `Strategy Tester` (current tab, highlighted in blue—used to backtest trading strategies).  
- `Trading Panel` (place live trades).  


### **5. Bottom Section: Trade Log (Strategy Tester Output)**
A table summarizing trades from the `Strategy Tester`:  
- **Columns**:  
  - `Trade #`: Trade number (e.g., `1`).  
  - `Type`: Trade action (e.g., `Exit Long`, `Entry Long`).  
  - `Signal`: Signal type (e.g., `Exit`, `Long`).  
  - `Date`: Trade date (e.g., `2022-02-24`).  
  - `Price`: Execution price (e.g., `156.00`, `157.00`).  
  - `Contracts`: Number of contracts (e.g., `1`).  
  - `Profit`: Profit/loss (e.g., `-$1.00`, `-0.64%`).  


### **6. Additional UI Elements**
- **Chart Settings**:  
  - `bar_magnifier_demo` (indicator name) with a **gear icon** (settings), **refresh icon** (reload), and **download icon** (export data).  
- **“Ove” (Truncated Text)**: Likely part of a label like “Overview” or “Overlay” (cut off in the image).  


### **Purpose of the Interface**
This screen is used to **backtest a trading strategy** (via `Strategy Tester`) for Tesla stock. The candlestick chart visualizes price action, while the trade log details the strategy’s performance (entry/exit points, profit/loss). The timeframe selector and tabs allow switching between different analysis tools or time periods.

---

### Изображение 3

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43326690335/original/ckREF_lfJcTbIcUhuuluXD50Tk8kq_uxnw.png?1653467457

**Описание:**

This image displays a **TradingView interface** with two overlapping price charts for **Apple Inc. (NASDAQ: AAPL)**, demonstrating a multi-timeframe trading strategy. Below is a detailed breakdown of the UI elements, charts, and their purposes:


### **1. Top Chart: Daily (1D) Timeframe**  
- **Title & Symbol**:  
  - `Apple Inc · 1D · NASDAQ` (indicates the stock, daily timeframe, and exchange).  
  - A sun icon (likely for \

---

### Изображение 4

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43326738096/original/3urMUSN3IFmoRBQZsX_riJd0AdLgnJu1eQ.png?1653475472

**Описание:**

This image shows a **TradingView interface** displaying the **\

---

