# Auto Pitchfork

**URL:** https://www.tradingview.com/support/solutions/43000657911-auto-pitchfork/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Auto Pitchfork ](/support/solutions/43000657911-auto-pitchfork/) # Auto Pitchfork Definition Auto Pitchfork is a tool that aims to identify possible support and resistance levels and forecast the future price movement based on the previous trends. Auto pitchfork is an indicator that draws the Pitchfork drawing tool automatically based on past price movement. The basic idea behind the use of a pitchfork is that it essentially creates a type of trend channel. A trend is considered active as long as price stays within the Pitchfork channel. Reversals occur when price breaks out of a Pitchfork channel. The pitchfork has a center median line (trend line) as well as two more sets of lines above and below that median line. The additional lines are set a specified number of standard deviations away from the median. The indicator is written in Pine Script and its source code can be accessed, copied and modified. You can access it from the Source code icon to the right of the indicator's name on the chart, or from the Pine Editor, by using the Open button, then clicking on New default built-in script… and finding Auto Pitchfork in the menu there. Inputs Depth The minimum number of bars that will be taken into account when calculating the indicator. Increasing this number will result in pitchforks that skip smaller price peaks and troughs in favor of bigger ones. For example, with Depth set to 10, each of the three points found by the indicator must be highest or lowest among the nearest 10 bars (five on the left and five on the right). Type There are four different types of Auto Pitchfork, based on four different Pitchfork drawings available on TradingView. Changing the option changes the calculation of the pitchfork’s slope, which allows the indicator to react to the price slopes it found differently. The indicator is drawn using three points, and the slope is based on how these points are used to draw the median: - Original. The median connects the first point found by the indicator with the middle of the line connecting points 2 and 3. - Schiff. An additional point is calculated, based on the X coordinate of the point 1 and the Y coordinate of the middle between point 1 and point 2. The median connects that additional point to the middle of the line between points 2 and 3. - Modified Schiff. The median connects the middle of the line between points 1 and 2 to the middle of the line between points 2 and 3. - Inside. The median connects the middle of the line between points 1 and 2 to point 3. Background Transparency The transparency of the background between the Pitchfork lines, from 0 (fully visible) to 100 (fully transparent). Extend Left If selected, the pitchfork lines will extend both ways. Level settings Level settings allow you to tweak each level of the pitchfork separately. You can change the visibility (turn on/off), Fibonacci ratio used to calculate the line, color that the line and its background use, width of the line, and its type. Previous Previous Auto Fib Retracement Next Next Auto Trendlines Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582436007/original/5Ym3QP_6GV68PUJLByjk15FGMCotXB8avg.png?1758719314)

**Описание:** This TradingView chart displays **Amazon.com, Inc. (NASDAQ: AMZN)** on a **1-day (1D)** timeframe, showing a candlestick chart with technical analysis overlays. Here’s a detailed breakdown:  


### **Top Bar (UI Elements)**  
- **Left Side**:  
  - `AMZN`: Ticker symbol.  
  - `+`/`D`: Zoom in/out and time interval selector (set to “D” for daily).  
  - `Indicators` dropdown: For adding technical indicators.  
  - `W`: Workspace menu.  
  - `Alert`/`Replay`: Set price alerts or replay market data.  
  - Navigation arrows: Step back/forward through chart history.  

- **Right Side**:  
  - `TradingView` dropdown: Account/settings menu.  
  - `M`/`M`/`S`: Chart style (e.g., candlestick, line) and scale toggles.  
  - `Publish`: Share or publish the chart.  


### **Chart Header**  
- **Symbol Info**: `Amazon.com, Inc. · 1D · NASDAQ` (stock name, timeframe, exchange).  
- **Price Data**: `O227.83 H227.86 L220.07 C220.71 -6.92 (-3.04%)` (Open, High, Low, Close, daily change).  
- **Indicator Label**: `Auto Pitchfork 10 Original` (name of the applied technical indicator).  


### **Main Chart Area**  
- **Candlestick Chart**: Green candles = price closed higher than open; red = closed lower.  
- **Auto Pitchfork (10 Original)**: A technical analysis tool with three trend lines (red, green, blue) forming a “pitchfork” shape, with shaded regions (light blue, green) indicating potential support/resistance zones.  


### **Left Sidebar (Tools)**  
Icons for drawing (trend lines, Fibonacci), chart types (candlestick, line), text, zoom, and other analysis tools.  


### **Bottom Bar**  
- **Timeframe Tabs**: `1D` (active), `5D`, `1M`, `3M`, `6M`, `YTD`, `1Y`, `5Y`, `All` (switch chart periods).  
- **Calendar Icon**: Toggle date range.  
- **Timestamp**: `09:06:24 UTC-4` (current time).  
- **“ADJ”**: Adjusted price toggle (accounts for splits/dividends).  


### **Bottom Panels**  
- `Pine Editor`: For coding custom indicators (TradingView’s Pine Script).  
- `Trading Panel`: For placing orders (buy/sell).  


### **Right Sidebar**  
Icons for notes, alerts, chat, and additional tools (e.g., chart patterns, economic calendar).  


### **Key Purpose**  
The chart visualizes Amazon’s daily price action, with the Auto Pitchfork indicator highlighting trend channels and potential price zones. Traders use this to analyze trends, support/resistance, and make informed decisions.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582436054/original/Jzy1ZcQ-jRsKYdko1417ASmG-FzbVvRNtg.png?1758719333)

**Описание:** This TradingView interface displays a **1-day (1D) candlestick chart for Amazon.com, Inc. (NASDAQ: AMZN)** with the \


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582436150/original/dJ2mznluem4lx86xfElYLKiL4JehhrYVbA.png?1758719352)

**Описание:** This TradingView screenshot displays a **1D (daily) candlestick chart** for **Amazon.com, Inc. (NASDAQ: AMZN)**, with an open **\


