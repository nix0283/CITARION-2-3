# MACD Strategy

**URL:** https://www.tradingview.com/support/solutions/43000644943-macd-strategy/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Strategies - / [ Built-in Strategies ](/support/folders/43000587406-built-in-strategies/) - / [ MACD Strategy ](/support/solutions/43000644943-macd-strategy/) # MACD Strategy Definition MACD strategy is based on the Moving Average Convergence/Divergence (MACD) indicator. It enters long whenever MACD Histogram changes from negative to positive, and switches to short if the Histogram changes from positive to negative. The underlying MACD indicator is described in detail in [its respective Help Center article](https://www.tradingview.com/chart/?solution=43000502344). Inputs Fast Length The time period of the shorter term EMA. 12 days is the default. Slow Length The time period of the longer term EMA. 26 days is the default. MACD Length The time period for the EMA of the MACD Line otherwise known as the Signal Line. 9 Days is the default. Previous Previous Keltner Channels Strategy Next Next Momentum Strategy Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43586748759/original/C42Dct8I0LYEBVHBNDKRAyoBPyMKqaVP5A.png?1760699298)

**Описание:** This TradingView interface displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with a **MACD Strategy** configuration panel open. Here’s a detailed breakdown:  


### 1. **Top Navigation Bar**  
- **Left**: Ticker (AAPL), time frame (1D), and market data (Open: 248.25, High: 249.04, Low: 245.13, Close: 247.45, -1.89 [-0.76%]).  
- **Middle**: Tools (Indicators, Replay, Alert), and navigation arrows.  
- **Right**: TradingView logo, currency (USD), and action buttons (Publish, chart settings, etc.).  


### 2. **Chart Area**  
- **Candlestick Chart**: Shows price action (green = up, red = down) with MACD signals (e.g., “MacdSE” for short entries, “MacdLE” for long entries) marked by arrows.  
- **Time Axis**: Months (Jul, Aug, Oct, Nov) and a date range selector (Dec 12, 1980 – Oct 16, 2025).  
- **Price Axis**: Y-axis (200.00–250.00 USD) for price levels.  


### 3. **MACD Strategy Panel (Popup)**  
Configures the MACD indicator:  
- **Tabs**: *Inputs* (active), *Properties*, *Style*, *Visibility*.  
- **Input Fields**:  
  - *Fast length*: 12 (default).  
  - *Slow length*: 26 (default).  
  - *MACD length*: 9 (default).  
- **Checkbox**: *Inputs in status line* (enabled).  
- **Buttons**: *Defaults* (reset), *Cancel*, *Ok* (apply changes).  


### 4. **Bottom Panels**  
- **Time Frame Selector**: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All (for chart period).  
- **Tabs**: *Pine Editor* (code), *Strategy Tester* (active), *Trading Panel*.  
- **MACD Strategy Report**:  
  - Sub-tabs: *Overview* (active), *Performance*, *Trades analysis*, *Risk/perform*.  
  - Trade Table: Columns for *Trade #*, *Type* (Short/Long), *Date/Time*, *Signal*, *Price*, *Position size*, *Net P&L*, *Run-up*, *Drawdown*, *Cumulative P&L*.  
  - Sample Trades:  
    - Trade 852 (Short): Entry (Oct 8, 2025, MacdSE, 256.52 USD) → Exit (Oct 16, 2025, Open, 247.45 USD) → +9.07 USD P&L.  
    - Trade 851 (Long): Entry/Exit (Oct 8, 2025, MacdSE, 256.52 USD) → +8.22 USD P&L.  


### 5. **Left Sidebar**  
Icons for tools (draw, indicators, alerts, replay, etc.) and account features (publish, settings).  


### Purpose  
The interface is used to **analyze AAPL’s price action** with the MACD indicator, configure strategy parameters, and review backtest results (via the *Strategy Tester* tab) to evaluate trading performance.


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

