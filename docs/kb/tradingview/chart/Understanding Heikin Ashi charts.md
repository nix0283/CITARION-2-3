# Understanding Heikin Ashi charts

**URL:** https://www.tradingview.com/support/solutions/43000619436-understanding-heikin-ashi-charts/

---

- [ Help Center ](/) - / - / Chart - / [ Learn more about chart types ](/support/folders/43000547460-learn-more-about-chart-types/) - / [ Understanding Heikin Ashi charts ](/support/solutions/43000619436-understanding-heikin-ashi-charts/) # Understanding Heikin Ashi charts From [Supercharts](https://www.tradingview.com/chart/), you can access Heikin Ashi. They are similar to standard candles only in that they don't use the actual assets' prices but use averages to smooth the price movements to more easily identify market trends. **CONTENTS:** - [What are Heikin Ashi charts](#What-are) - [Heikin Ashi construction principles](#Principles) - [Heikin Ashi vs standard candles](#Vs) - [How to enable Heikin Ashi](#Enable) - [Heikin Ashi settings](#Settings) What are Heikin Ashi charts Heikin Ashi charts are a variation of [Japanese candlesticks](https://www.tradingview.com/support/solutions/43000745269-introduction-to-candlestick-charts-and-patterns/). They have the same shape with bodies and wicks, but the color of each candle depends on the current trend. Consecutive green candles indicate that the trend is bullish and a sequence of red candles indicates that the trend is bearish. Heikin Ashi candles show the average prices, not the actual prices. That's why on the right side of the chart you can see two values — one is the actual price of the asset and the other is the Heikin Ashi price. To better understand them, let's have a deeper look at how these candles are constructed. Heikin Ashi construction principles Heikin Ashi uses a unique formula that affects the candles' shape, size, and their direction: - Open = (Previous (Open + Close)) / 2 - Close = (Current (Close + Open + High + Low)) / 4 - High = The highest value of a recent high, open, or close - Low = The lowest value of the recent low, open or close **! Note:** Heikin Ashi candles open at the middle level of the previous candle. Current candles are calculated with a delay, as their calculation is possible only after the previous candle is closed. When trading volatile instruments on small timeframes, this chart type can help filter false breakouts of such critical levels like support and resistance, or [chart patterns](https://www.tradingview.com/support/solutions/43000759289-how-to-read-chart-patterns/)' borders. Heikin Ashi vs standard candles Heikin Ashi - Provide clearer picture on trends - Provide average data and may save your internal resources during market turbulence - Less precise for pinpointing exact entry and exit levels Standard candles - More common, better studied, and more information about them is available - Work with both chart patterns and candlestick patterns - Well-suited for gap trading How to enable Heikin Ashi Once you are on [Supercharts](https://www.tradingview.com/chart/), open the chart type menu on the upper toolbar, and select "Heikin Ashi." Heikin Ashi settings To configure them to suit your unique trading strategy, find the gear button on the upper toolbar, and go to the "Symbol" tab. If you want to see the actual prices only, click on the "Real prices on price scale" option. As you remember, Heikin Ashi already shows it, but maybe you don't need these values to be displayed at all. Then you can find settings similar to standard candles: - **Color bars based on previous close:** With this setting on, the color of each bar will be determined by whether its close price is higher (green) or lower (red) than the close price of the previous bar, rather than by the bar's own open and close prices - **Body:** Change candle bodies' outlook for enhanced visual appearance - **Borders:** Change the color of the candles' edges - **Wick:** Choose the preferred color of the candles' shadows Heikin Ashi in a nutshell Each chart type serves its unique purpose. With Heikin Ashi, you can easily understand trend and average price, which is often important, for instance, for swing traders and those trying to understand the power of the current trend — the more same-colored consecutive candles you see, the more likely the current trend is coming to an end. Also read: - [The technical analysis essentials](https://www.tradingview.com/support/solutions/43000759577-the-technical-analysis-essentials-with-tradingview/) - [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/) - [Introduction to TradingView alerts](https://www.tradingview.com/support/solutions/43000520149-introduction-to-tradingview-alerts/) - [Chart types available on TradingView](https://www.tradingview.com/support/solutions/43000703407-chart-types-available-on-tradingview/) - [Drawing tools available on TradingView](https://www.tradingview.com/support/solutions/43000703396-drawing-tools-available-on-tradingview/) Previous Previous Session volume profile charts explained Next Next Understanding Renko charts Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582833101/original/5r19R176-gfkZmQda_A29QBsumPH_0qVZg.png?1758874267)

**Описание:** This TradingView chart displays **Meta Platforms, Inc. (META)** on the NASDAQ exchange, using a **Heikin Ashi** candlestick style with a **1-day (1D)** time frame. Here’s a detailed breakdown:  


### **Top Bar (Header)**  
- **Left**: Ticker (`META`), exchange (`NASDAQ`), and time frame (`1D`).  
- **Middle**: Key price data:  
  - `O433.41` (Open), `H435.35` (High), `L419.08` (Low), `C428.27` (Close), `-8.20 (-1.88%)` (Daily change).  
- **Right**: Currency (`USD`), price scale (`200.00`), and a `Publish` button.  


### **Price Panel (Candlestick Chart)**  
- **Candles**: Green (up) and red (down) Heikin Ashi candles show price action over time.  
- **Y-Axis (Right)**: Price scale (220.00 to 440.00 USD) for the candlestick chart.  
- **Left Sidebar Icons**: Tools for drawing, indicators, and chart customization (e.g., trend lines, Fibonacci, volume).  


### **Order/Trade Panel**  
- **Top-Left**: `SELL` (420.48) and `BUY` (420.64) buttons with a spread (`0.16`).  
- **Volume**: `Vol 96.75M` (current day’s trading volume).  


### **Volume Panel (Below Price Chart)**  
- **Bars**: Teal (up days) and pink (down days) bars show daily trading volume.  
- **Y-Axis (Right)**: Volume scale (matches price panel’s height).  


### **Time Frame & Navigation**  
- **Bottom**: Time frame buttons (`1D`, `5D`, `1M`, `3M`, `6M`, `YTD`, `1Y`, `5Y`, `All`) to adjust the chart’s period.  
- **Zoom Controls**: `+`/`-` (zoom), `<`/`>` (navigate), and a refresh icon.  


### **Right Sidebar**  
- Icons for:  
  - Chart layout, alerts, replay, and publishing.  
  - Additional tools (e.g., chat, calendar, settings).  


### **Bottom Bar**  
- `Pine Editor` (for custom indicators) and `Trading Panel` (for order execution).  
- Timestamp: `04:07:40 UTC-4` (current time).  


### **Key Purpose**  
This interface lets traders analyze META’s price trends, volume, and execute trades, with tools to customize charts, set alerts, and publish analyses.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582833139/original/5sH6eqzGysMPlglCp1fqLO1wk23ijSyBaw.png?1758874282)

**Описание:** This TradingView chart displays **Alphabet Inc. (GOOGL)** on the **NASDAQ** exchange, with a **1-day (1D)** time frame. Below is a detailed breakdown of the UI elements:  


### **Top Bar & Header**  
- **Left**: Symbol (`GOOGL`), exchange (`NASDAQ`), and time frame (`1D`). A dropdown shows the current price: `420.50 SELL` (red) and `420.66 BUY` (blue), with volume (`96.75M`).  
- **Center**: Chart type menu (open, showing options like *Bars, Candles, Heikin Ashi*).  
- **Right**:  
  - `Alert`/`Replay` buttons, navigation arrows, and a `Chart Layout` dropdown.  
  - Currency selector (`USD`), price scale (`200.00` to `440.00`), and a `Publish` button.  


### **Main Chart (Candlestick)**  
A candlestick chart tracks price action over months (Apr–Sep). Red candles = price decline; green = increase. The chart shows a recent drop (late Sep) followed by a rebound.  


### **Volume Profile (Bottom Subchart)**  
A bar graph (teal = buying volume, red = selling volume) visualizes trading volume over time. A large volume spike appears in Jun, with consistent activity through Sep.  


### **Left Sidebar (Tools & Indicators)**  
Icons for:  
- Drawing tools (trendlines, shapes).  
- Indicators (moving averages, RSI, etc.).  
- Chart types (e.g., `Pine Editor`, `Trading Panel`).  


### **Right Sidebar (Additional Tools)**  
Icons for:  
- Notes, alerts, replay, and layout customization.  
- Publishing, currency, and time zone (`04:08:02 UTC-4`).  


### **Chart Type Menu (Open)**  
Lists options to change the chart’s visual style (e.g., *Candles, Heikin Ashi, Renko, Volume candles*). `Heikin Ashi` is highlighted (selected).  


### **Key Data Points**  
- Current price: `428.27` (down `8.20`, `-1.88%`).  
- Volume: `96.75M`.  
- Time frame: `1D` (with 5D, 1M, 3M, etc. toggles below the chart).  


This layout provides a comprehensive view of price trends, volume, and customization tools for technical analysis.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582833192/original/TEFDwQ-E8t-exEcAo62ipl_XsbnoIYfwRQ.png?1758874297)

**Описание:** This TradingView chart displays **Meta Platforms, Inc. (META)** on the NASDAQ exchange, using a **1-day (1D) Heikin-Ashi candlestick chart**. Below is a detailed breakdown of the UI elements:


### **Top Navigation Bar**  
- **Left**:  
  - `META` (ticker symbol) + `1D` (timeframe) + `NASDAQ` (exchange) + `Heikin Ashi` (chart type).  
  - Price data: `O433.41 H435.35 L419.08 C428.27 -8.20 (-1.88%)` (open, high, low, close, change, % change).  
  - Order book: `420.65 SELL` (red, ask price) + `420.88 BUY` (blue, bid price) + `0.23` (spread).  
  - Volume: `Vol 96.75M` (96.75 million shares).  

- **Middle**:  
  - Timeframe selector: `15s` (dropdown) + `D` (day) + icons for timeframes (e.g., 1m, 5m, 1h).  
  - Tools: `Indicators` (dropdown), `Alert`, `Replay`, and navigation arrows (back/forward).  

- **Right**:  
  - `Chart Layout` (dropdown, \


