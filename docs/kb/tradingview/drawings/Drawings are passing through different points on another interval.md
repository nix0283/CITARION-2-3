# Drawings are passing through different points on another interval

**URL:** https://www.tradingview.com/support/solutions/43000477901-drawings-are-passing-through-different-points-on-another-interval/

---

- [ Help Center ](/) - / - / [ Drawings are passing through different points on another interval ](/support/solutions/43000477901-drawings-are-passing-through-different-points-on-another-interval/) # Drawings are passing through different points on another interval Drawings may be displayed differently on various time intervals of the same symbol. One of the reasons for that is that lower time frame contains more information (due to bars with their time and OHLC values). For example, we draw the trend line that connects 2 bars in their high points and then compare how the results may vary, depending on the interval we use (daily vs. weekly charts in this example). 1. Firstly, we draw a trend line on the chart with a daily time frame and compare how it is displayed on the weekly chart. Timestamps that were selected as points on a daily chart are not the same as those displayed on a weekly chart. On a weekly chart, each timestamp marks the beginning of the week and the trend line points on a weekly chart will be displayed on marks that match the first days of the week (including daily chart days). This means that X coordinates of this line are different, while the trend line remains the same. 2. We are now going to draw the same (but factually a different) trend line on the weekly chart. The timestamps that we used to place points on the weekly chart are available on the daily chart, so the trend line will be displayed exactly on those points. But on the daily chart trend line points will not touch the high price as they do on the weekly time frame since the line ends where the first day of the week starts (weekly high hasn't been reached yet). It works the same when you draw something using a single chart layout and then switch the chart time frame. The drawing might be placed differently depending on the time frame that was used when it was originally added. Previous Previous Ghost Feed: a drawing tool to study your chart Next Next Lines become non-parallel when switching interval Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43579372357/original/8f61LPwE03bUnZpCuFaqngsjK7SQJTYfIw.png?1757336212)

**Описание:** This TradingView image displays **two side-by-side candlestick charts** for Apple Inc. (NASDAQ:AAPL), with distinct timeframes and UI elements:  


### 1. Left Chart: 1-Day (1D) Timeframe  
- **Header**:  
  - Ticker: `Apple Inc · 1D · NASDAQ` (1-day candlestick, NASDAQ exchange).  
  - Price Data: `O241.32 H241.32 L238.49 C239.69 -0.09 (-0.04%)` (Open, High, Low, Close, and daily change).  
  - Currency: `USD` dropdown (select currency).  

- **Chart Area**:  
  - **Candlesticks**: Green (up days, close > open) and red (down days, close < open) bars showing price action.  
  - **Trendline**: Blue descending trendline (technical analysis tool to identify support/resistance).  
  - **Annotations**: Labels `E` (green house icon, likely a saved chart/analysis) and `A` (blue marker, custom annotation).  
  - **Time Axis**: Dates (e.g., `Wed 16 Jul '25`, `Tue 05 Aug '25`) with a blue highlighted range.  

- **Bottom Toolbar**:  
  - Timeframe Buttons: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (switch between timeframes).  
  - Icons: Calendar (date range), and `PRO` logo (TradingView Pro subscription).  


### 2. Right Chart: 1-Week (1W) Timeframe  
- **Header**:  
  - Ticker: `Apple Inc · 1W · NASDAQ` (1-week candlestick).  
  - Price Data: `O229.25 H241.32 L226.97 C239.69 +7.55 (+3.25%) -0.09 (-0.04%)` (Open, High, Low, Close, weekly change, and daily change).  
  - Currency: `USD` dropdown.  

- **Chart Area**:  
  - **Candlesticks**: Larger weekly bars (green/red) showing broader price trends.  
  - **Trendline**: Blue descending trendline (matches the 1D chart for consistency).  
  - **Annotations**: Labels `E` (green house) and `D` (blue marker).  
  - **Time Axis**: Dates (e.g., `Mon 14 Jul '25`, `Mon 04 Aug '25`, `Sep`) with a blue highlighted range.  


### 3. Global UI Elements  
- **Top Right**: `USD` dropdown (currency selection, shared across charts).  
- **Bottom Right**: `08:54:52 UTC-4` (timestamp) and `ADJ` (adjusted price toggle, for splits/dividends).  


### Purpose of Elements  
- **Candlesticks**: Visualize open/close/high/low prices for each period.  
- **Trendlines**: Identify support/resistance or trend direction.  
- **Timeframe Buttons**: Compare price action across daily/weekly (or other) periods.  
- **Annotations/Labels**: Mark key levels or saved analyses.  
- **Price Data**: Show real-time/most recent price metrics (open, high, low, close, % change).  


This layout enables traders to analyze Apple’s short-term (1D) and medium-term (1W) price behavior, using trendlines and timeframes to identify trends, support, or resistance.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43579372518/original/_0XdpTwrRLBkklLwNgpS_CdNURlAlfR0eQ.png?1757336243)

**Описание:** This TradingView image displays two side-by-side candlestick charts for Apple Inc. (NASDAQ:AAPL), showing different timeframes:  

### Left Chart (1D - Daily)  
- **Header**: Shows \


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

