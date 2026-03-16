# The Renko chart shows incorrect values and/or is constantly being recalculated

**URL:** https://www.tradingview.com/support/solutions/43000480330-the-renko-chart-shows-incorrect-values-and-or-is-constantly-being-recalculated/

---

- [ Help Center ](/) - / - / [ The Renko chart shows incorrect values and/or is constantly being… ](/support/solutions/43000480330-the-renko-chart-shows-incorrect-values-and-or-is-constantly-being-recalculated/) # The Renko chart shows incorrect values and/or is constantly being recalculated How are Renko bricks calculated? On historical bars: TradingView and data suppliers cannot make available the complete historical tick data required to calculate Renko bricks with maximal precision readily available, therefore, compromises must be made, as is common on other trading platforms. Our Renko brick calculations on historical bars follow these rules: a) The chart's timeframe determines the finest level of detail used to calculate Renko bricks. For example, if your Renko chart uses a 30-minute timeframe, Renko bricks will use the close or the OHLC of 30-minute bars to calculate the box size. The smaller the timeframe, the more accurate calculations will be. Here are examples of two Renko charts with the same Renko parameters (Traditional, 3), but using different timeframes: 1-minute and 1-day. As you can see, the 1-minute chart shows more detailed bricks, than the 1-day chart: b) The smaller the timeframe used on charts, the less historical data is available. In order to provide more depth for historical Renko charts, when no more historical data is available at the current chart's timeframe, higher timeframe information is used to calculate Renko bricks until the maximum number of bricks allowed on a chart is reached. The selection of the higher timeframes is as follows: Timeframe on Renko chart The highest timeframe used for deep history &lt; 1 60 &lt; 60 240 &lt; 240 1D The border between the higher and lower timeframes used in calculation is not static; it gets shifted into the future over time, which may lead to bricks being recalculated. c) Renko wicks represent price movement, beyond the Renko brick's levels. Specifically, when the movement is not large enough to create a new brick. Recall that only the close of the chart's timeframe bars is used in Renko calculations, so price movement during that bar is discarded. The wicks represent the discarded information. On real-time bars: During the realtime bars, projection bars are built using price information as it comes in. Projection bars can only become “real” closed Renko bricks when the bar at the chart's timeframe closes. Therefore, they can recalculate until that happens. Backtesting on Renko charts: Please note that Renko bricks prices, being inherently synthetic because of their nature, they do not reflect market prices at any precise moment in time, as normal bars do. While Renko bricks may provide useful interpretation of price activity in discretionary trading, using them to backtest, where order fills must reflect actual market prices at a specific time, is not recommended. Backtesting orders filled at Renko chart prices will inevitably be inaccurate. You can read more on the subject [here](https://www.tradingview.com/?solution=43000481029). Previous Previous The candles, bars or drawings look blurry Next Next Bar chart values are inaccurate Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582918106/original/4Cw18WNC_u2X2AUE48tseOIzO3HnfzMFfg.png?1758897247)

**Описание:** This TradingView image displays a **Renko chart** for **Apple Inc. (AAPL)** on the NASDAQ exchange, with two primary sections (price chart + volume panel) and a comprehensive UI:  


### **Top Bar (Header)**  
- **Left**:  
  - `AAPL` (ticker), `Apple Inc · 1` (company name), `NASDAQ` (exchange), `Renko [Traditional, 3]` (chart type/parameters).  
  - Price data: `O252.00 H255.00 L252.00 C255.00 +3.00 (+1.19%)` (open, high, low, close, change, % change).  
  - Buy/Sell prices: `254.83 SELL` (red, ask price), `254.85 BUY` (blue, bid price), `0.02` (bid-ask spread).  
- **Right**:  
  - Timeframe selector (`15s`), chart type toggle, `Indicators` (add technical indicators), `Alert` (set price alerts), `Replay` (backtest market movements), navigation arrows, `Chart Layout` (customize chart arrangement), `USD` (currency), `Publish` (share chart).  


### **Main Price Chart (Top Section)**  
- **Chart Type**: Renko (green/red blocks represent price movements; green = upward, red = downward).  
- **X-Axis**: Dates (May–Sep, with labels like `10, 11, 14, 21, 23, May, 12, 13, Jun, Jul, Aug, 7, 13, Sep, 9, 12, 19`).  
- **Y-Axis**: Price levels (190.00–250.00+).  
- **Trend**: Upward (green blocks dominate, with minor red corrections).  


### **Volume Panel (Bottom Section)**  
- **Header**: Repeats `Apple Inc · 1D · NASDAQ · Renko [Traditional, 3]` and price data.  
- **Volume**: `Vol 26.38M` (total volume).  
- **Chart**: Renko-style volume bars (green = high volume, red = low volume) aligned with price movements.  
- **X-Axis**: Dates (matches top chart).  
- **Y-Axis**: Volume scale (implicit, via bar height).  


### **Left Sidebar (Tools)**  
Icons for:  
- Drawing tools (trendlines, shapes), `T` (text), `♥` (favorites), `ruler` (measure), `+` (zoom), `magnet` (snap), `pen` (edit), `lock` (security), `globe` (global data), `trash` (delete).  


### **Bottom Bar**  
- Timeframe selector: `1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All` (choose chart period).  
- `Pine Editor` (code indicators), `Trading Panel` (execute trades).  
- Timestamp: `10:33:26 UTC-4` (current time), `ADJ` (adjusted data).  


### **Right Sidebar**  
Icons for:  
- Notes, clock (time), depth (order book), chat, settings, calendar, grid, RSS, help.  


### **Key Purposes**  
- **Price Chart**: Analyze price trends (Renko emphasizes directional moves).  
- **Volume Panel**: Assess trading activity (volume confirms trend strength).  
- **UI Elements**: Customize charts, add indicators, set alerts, trade, and share insights.  


This layout enables traders to analyze AAPL’s price action, volume, and execute strategies with tools for customization and real-time data.


**Описание:** This TradingView interface displays a **dual-pane Renko chart** for **Apple Inc. (AAPL)** on NASDAQ, with the following key elements:  


### **Top Bar (Header)**  
- **Left**:  
  - `AAPL` (ticker), `Apple Inc.` (company name), `1` (timeframe), `NASDAQ` (exchange), `Renko [Traditional, 3]` (chart type/parameters).  
  - Price summary: `O252.00 H255.00 L252.00 C255.00 +3.00 (+1.19%)` (open, high, low, close, change, % change).  
  - Bid/Ask: `254.83 SELL` (red, bid price) and `254.85 BUY` (blue, ask price) with a `0.02` spread.  
- **Right**:  
  - Time controls: `15s` (timeframe dropdown), `D` (day), zoom icons, `Indicators` (add technical indicators), `Alert` (price alerts), `Replay` (backtest mode), navigation arrows.  
  - Layout/Tools: `Chart Layout` (customize chart layout), `Publish` (share chart), and icons for themes, full-screen, screenshot, etc.  


### **Main Chart (Top Pane)**  
- **Chart Type**: Renko (green/red blocks represent price movements; green = upward, red = downward).  
- **Y-Axis**: Price scale (190–250+ USD).  
- **X-Axis**: Timeline (dates: May–Sep, with markers like `E`/`D` for earnings/dividends).  
- **Price Action**: Upward trend with minor corrections (green blocks dominate, red blocks as pullbacks).  


### **Volume Chart (Bottom Pane)**  
- **Title**: `Apple Inc · 1D · NASDAQ · Renko [Traditional, 3]` (matches top chart).  
- **Y-Axis**: Volume (26.38M shown).  
- **X-Axis**: Same timeline as top chart.  
- **Volume Bars**: Light blue (up days) / pink (down days) bars, with occasional spikes (e.g., around July).  


### **Left Sidebar (Tools)**  
Icons for drawing (pen, trend lines), order entry, social sharing, text, favorites, etc.  


### **Bottom Bar**  
- **Timeframe Tabs**: `1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All` (switch chart periods).  
- **Timestamp**: `10:33:26 UTC-4` (current time).  
- **Additional Tabs**: `Pine Editor` (code indicators), `Trading Panel` (execute trades).  


### **Right Sidebar**  
Icons for notes, clock (time), patterns, chat, and settings.  


### **Purpose**  
The interface combines price (Renko) and volume data to analyze AAPL’s trend, with tools for technical analysis, alerts, and trading. Renko charts filter noise by focusing on significant price moves, while volume confirms trend strength.


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

