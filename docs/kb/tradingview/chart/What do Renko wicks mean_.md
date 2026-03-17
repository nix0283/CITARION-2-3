# What do Renko wicks mean?

**URL:** https://www.tradingview.com/support/solutions/43000481040-what-do-renko-wicks-mean/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Chart - / [ Learn more about chart types ](/support/folders/43000547460-learn-more-about-chart-types/) - / [ What do Renko wicks mean? ](/support/solutions/43000481040-what-do-renko-wicks-mean/) # What do Renko wicks mean? On a Renko chart, wicks show major price moves inside a Renko box, if they happened. A new Renko brick is built based on a value specified in the Renko chart's Box Size (either directly, when the Box Size Assignment method is set to Traditional, or indirectly, when it's set to ATR). The conditions for a new brick to appear are based on the direction of the last created Renko brick: to create a new brick that moves in the same direction as the last one, the price needs to move 1x Box Size in that direction. But to reverse and create a move in the opposite direction, the price needs to move 2x Box Size: first to get to the level of the open of the last brick, and then to move one Box Size beyond it. Sometimes, the price moves more than one Box Size but less than two in the direction opposite of the direction of the last brick. This indicates an obvious price swing that wasn't enough to turn the Renko chart, but came close to it. These moments are highlighted on the Renko chart with wicks. Consequently, High wicks will only appear on bricks that move down, and Low wicks will only appear on bricks that move up. Wicks are enabled by default on Renko charts. You can adjust wick color & enable/disable them in the Symbol tab of the Chart settings dialog. Renko wicks are based on actual prices present on the regular, non-Renko chart, unlike Renko bricks' Open and Close which are synthetic and are always divisible by the chart's Box Size. The source for these values depends on the source for the whole Renko chart (also specified in Chart settings): if the Renko chart is based solely on Close, wicks will represent highest/lowest Close values; if OHLC is chosen, highest and lowest wicks will be based on High and Low values respectively. Let's examine a specific case: On the screenshot above, we have a Renko chart of AAPL with 1D timeframe. Source is set to OHLC, and the Box Size is 3. There is a sequence of two downward-moving bricks, with the second one formed on 11 Apr '22. The next brick is also going down and was formed on 18 Apr '22. It has a High wick of 171.27. On the chart below that, we open the same symbol and timeframe, but on a regular candlestick chart, and check what candles the 18 Apr '22 brick is based on. As the previous brick formed on 11 Apr '22, everything after that date and up to and including 18 Apr '22 is used to build the next brick. In this case, before the price moved down to 165, where a new down brick could be formed, it first moved up to 171.21. This was above the open of the previous brick (171), but not enough to turn the direction of the Renko chart up. After that level was reached, the price fell, which caused another down brick to form. The swing in the Up direction is reflected with a High wick on a resulting Renko brick. Previous Previous Why are the bars so thin? Next Next What does the One Step Back Building option mean? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43329508829/original/V9fqHHPI5_mZFM9UFjaKroPaevzsJEGrxw.png?1654272736)

**Описание:** This is a **TradingView \


**Описание:** This is a **TradingView \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43329508892/original/YOR5FWjpM5qSw6uEEFgbkNtscD-Ra8UWMw.png?1654272751)

**Описание:** This TradingView image displays two stacked charts for **Apple Inc. (AAPL)** on the NASDAQ exchange, comparing a **Renko chart** (top) and a **1D (daily) candlestick chart** (bottom). Here’s a detailed breakdown:  


### 1. **Top Chart: Renko [Traditional, 3]**  
- **Chart Type & Timeframe**: Renko (price-based chart, not time-based) with a “Traditional, 3” box size (each box represents a $3 price move).  
- **Price & Change**: Current price = $145.06 (red box), +$0.01 (+0.01%), with a 4.06% drop (likely from a prior high).  
- **UI Elements**:  
  - **Price Boxes**: Green boxes = price increases; red boxes = price decreases.  
  - **Highlighted Price**: Blue tooltip shows $171.27 (a prior high).  
  - **Timeline**: Dates (21, 23, Apr, 11 Apr ’22, 18 Apr ’22, 22, 25, 28) mark Renko box formation.  
  - **Right Axis**: Price scale (162.00–176.00 USD) with dashed horizontal lines (support/resistance levels).  
  - **Icons**: Sun (theme toggle), double arrow (expand chart), and a green dot (TradingView logo).  


### 2. **Bottom Chart: 1D (Daily) Candlestick**  
- **Chart Type & Timeframe**: Daily candlestick (1-day intervals).  
- **Price & Change**: Current price = $145.06 (red box), +$0.01 (+0.01%), matching the Renko chart’s current price.  
- **UI Elements**:  
  - **Candlesticks**: Green = price up; red = price down. Wicks show high/low ranges.  
  - **Highlighted Price**: Blue tooltip shows $171.27 (same prior high as Renko).  
  - **Timeline**: Dates (30, Apr, 5, 7, 11 Apr ’22, 13, 18 Apr ’22, 20, 25, 27, Ma) mark daily intervals.  
  - **Right Axis**: Price scale (160.00–178.00 USD) with dashed horizontal lines.  
  - **Icons**: “E” (earnings marker), double arrow (expand chart), and a green dot (TradingView logo).  


### 3. **Shared UI Elements**  
- **Symbol & Exchange**: “Apple Inc · NASDAQ” (top/bottom).  
- **Currency**: “USD” dropdown (top-right of both charts).  
- **Price Boxes**: Red (current price) and blue (last price) boxes with change (+0.01).  


### Purpose  
The image compares two chart types:  
- **Renko**: Simplifies price action (removes time, focuses on $3 moves) to highlight trends.  
- **1D Candlestick**: Shows daily open/high/low/close (time-based) for traditional analysis.  

Both charts track AAPL’s price movement, with the Renko chart emphasizing price-based trends and the candlestick chart providing time-based context.


**Описание:** This TradingView image displays **two overlapping charts** for Apple Inc. (AAPL) on NASDAQ, with the top chart using a **Renko (Traditional, 3)** style and the bottom chart using a **1D (daily) candlestick** style. Both charts share the same price axis (USD) and time period (April 2022), enabling direct comparison of price action across different chart types.  


### **Top Chart: Renko (Traditional, 3)**  
- **Chart Type**: Renko (Traditional, 3) – Renko charts use fixed-size “bricks” (here, 3 USD) to filter noise, showing price movements only when they exceed the brick size. Green bricks = upward price movement; red bricks = downward movement.  
- **Price Axis (Right)**: Ranges from ~162.00 to 176.00 USD, with horizontal dashed lines marking key price levels (e.g., 164.00, 165.00, 168.00, 170.00, 171.00, 174.00).  
- **Time Axis (Bottom)**: Dates (21, 23, Apr, 11 Apr ’22, 18 Apr ’22, 22, 25, 28) indicate the time frame.  
- **Key Price Labels**: A blue tooltip shows a peak price of **171.27** (likely a high or significant level).  
- **UI Elements**:  
  - Top-left: Ticker (`AAPL`), exchange (`NASDAQ`), chart type (`Renko [Traditional, 3]`), and `TradingView` branding.  
  - Price boxes: Red (`145.06`, last price) and blue (`145.07`, current/ask price), with a small `0.01` change.  
  - Top-right: Currency selector (`USD`).  
  - Bottom-right: Zoom/navigation button (double arrow) and theme toggle (sun icon).  


### **Bottom Chart: 1D Candlestick**  
- **Chart Type**: 1D (daily) candlestick – Each candle represents one day’s price action (open, high, low, close). Green candles = closing price > opening price; red candles = closing price < opening price.  
- **Price Axis (Right)**: Same range as the top chart (~160.00 to 178.00 USD), with dashed lines for key levels.  
- **Time Axis (Bottom)**: Dates (30, Apr, 5, 7, 11 Apr ’22, 13, 18 Apr ’22, 20, 25, 27, Ma) show daily intervals.  
- **Key Price Labels**: A blue tooltip also highlights **171.27** (consistent with the top chart, marking a peak).  
- **UI Elements**:  
  - Top-left: Ticker (`Apple Inc`), exchange (`NASDAQ`), chart type (`1D`), and `TradingView` branding.  
  - Price boxes: Same red (`145.06`) and blue (`145.07`) as the top chart.  
  - Top-right: Currency selector (`USD`).  
  - Bottom-right: Zoom/navigation button (double arrow) and theme toggle (sun icon).  


### **Shared UI & Purpose**  
Both charts display Apple’s price action, with the Renko chart emphasizing trend direction (via bricks) and the candlestick chart showing daily volatility (via open/high/low/close). The overlapping time frame (April 2022) and price axis allow traders to cross-reference price movements across chart types, aiding in technical analysis (e.g., identifying trends, support/resistance, or momentum). The UI elements (price boxes, currency selectors, zoom buttons) provide real-time data and navigation tools for analyzing the stock.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

