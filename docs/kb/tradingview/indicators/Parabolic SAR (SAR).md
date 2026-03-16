# Parabolic SAR (SAR)

**URL:** https://www.tradingview.com/support/solutions/43000502597-parabolic-sar-sar/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Parabolic SAR (SAR) ](/support/solutions/43000502597-parabolic-sar-sar/) # Parabolic SAR (SAR) Definition [Parabolic SAR (SAR)](https://www.tradingview.com/scripts/parabolicsar/) is a time and price technical analysis tool primarily used to identify points of potential stops and reverses. In fact, the SAR in Parabolic SAR stands for "Stop and Reverse". The indicator's calculations create a parabola which is located below price during a Bullish Trend and above Price during a Bearish Trend. History J. Welles Wilder created the Parabolic SAR (SAR) and featured it in his book New Concepts in Technical Trading Systems. The book was published in 1978 and also featured several of his now classic indicators such as; The Relative Strength Index, Average True Range and the Directional Movement Index. Much like the indicators mentioned, the Parabolic SAR indicator is still widely used and has great importance in the world of technical analysis. Calculation We have adopted the original algorithm for the Parabolic SAR (which stands for stop and reverse) described in the book New Concepts in Technical Trading Systems written by the creator of SAR, J. Welles Wilder Jr. To first understand Parabolic SAR, it’s important to know how it looks on the chart. SAR is most commonly displayed as a dotted line that is charted alongside an asset’s price. Generally, when an asset is rising, SAR is displayed below the price and when an asset is falling, SAR is displayed above the price. A buy or reversal is signaled when the price crosses above or below Parabolic SAR. The steps look like this: 1. For the first day of entry or reversal, the SAR is the previous EP (Extreme Point) - the highest high of the uptrend or the lowest low of the downtrend. A. If entered Long (uptrend), the EP is the **lowest **price reached while in the previous Short trade. B. If entered Short (downtrend), the EP is the **highest** price reached while in the previous Long trade. 2. For the second day and thereafter, the SAR is calculated in a specific manner depending on if the asset is in an uptrend or downtrend. If the asset is in an **uptrend**, the calculation looks like this: A. Find the difference between the highest price made while in the trade (EP) and the SAR for that day. Multiply the difference by the AF (Acceleration Factor - determines the sensitivity of the SAR) and add the result to the current SAR to obtain the SAR for the next day. B. Use the Start Value (see image below, 0.02 by default) for the first AF and increase its Increment (0.02 by default) on each day a **new high** for the trade is made. If a new high is not made, continue to use the AF as it was last increased. Do not increase the AF above the Max Value (0.2 by default). If the asset is in a **downtrend**, the calculation looks like this: A. Find the difference between the lowest price made while in the trade (EP) and the SAR on its current day. Multiply the difference by the AF and add the result to the current SAR to obtain the SAR for tomorrow. B. Use Start value (0.02 by default) for the first AF and increase its Increment (0.02 by default) on each day a new low for the trade is made. If a **new low** is not made, continue to use the AF as it was last increased. Do not increase the AF above the Max Value (0.2 by default). 3. As a final step, it’s important to remember to never move SAR into the previous day’s range or any day before that. A. If in an **uptrend**, never move the current SAR above the** previous day’s low or the day before that**. If SAR is calculated to be above those values, then use the lower low between the previous day and the day before that as the new SAR. Make the next day’s calculations based on this. B. If in a **downtrend**, never move the current SAR below the** previous day’s high or the day before that**. If the SAR is calculated to be below those values, then use the higher high the previous day and the day before that as the new SAR. Make the next day’s calculations based upon this SAR. Let’s sum it up! **First**, for every new bar, we calculate the current SAR based on previous values (see step 2 from the rules above). Previous SAR + Previous AF * (Previous EP - Previous SAR) = Current SAR **Second**, we check if the calculated value is penetrated by the price of a current bar. We use &lt; and &gt; inequality operators to compare values. If it is, a reversal is made and the previous EP as a new SAR value (see paragraph 1 in the rules above). If there is no reversal, we check if the calculated SAR value is above the two previous low values in case of uptrend or below the two previous high values in case of downtrend (see paragraph 3 in the rules above). If it is, we update the SAR value according to the rules. On every new bar we update the AF value if EP value gets updated (see paragraph 2 in the rules above). How SAR is calculated since the beginning of its history In the book that introduced SAR, there are no clear instructions on how to calculate SAR for the beginning of a barset. Therefore, we assume that the SAR value on the first bar cannot be calculated because there are no previous values. On a second bar, we define if a trend is up or down, comparing the close values of the first and second bars. Then, we use the rule from paragraph 1 in the rules above: we use high of the first bar as a SAR on a second bar if a trend is down, and low of the first value if a trend is up. What to look for Stops and Reversals The Parabolic SAR (SAR) indicator has a very simple premise. When price in an uptrend breaks below the parabola (which will be below the trend), this signals a potential reversal of price. When price breaks above the parabola (above the trend) during a downtrend, this can also signal a price reversal. In a practical sense, many traders use these breakthroughs as a point to place stop orders or even as points to enter the market at the beginning of a new trend. Summary Parabolic SAR is a nice, compact indicator that can provide some good information. It is not typically recommended, however to use it as a stand-alone to generate trading signals. Since it is time and price based it is not adept at measuring the actual strength of a trend, merely its direction and duration. It is a good idea to use it in conjunction with an indicator that specializes in measuring trend strength. A good choice would be Wilder's own Directional Movement. Inputs Indicator Timeframe Specifies the timeframe that the indicator is calculated on. This option allows calculating SAR based on a data from another timeframe, e.g. having SAR calculated on 1H chart be displayed on a 5m chart. Start The starting value for the Acceleration Factor (.02 is the Default). Increment The increment in which the Acceleration Factor will move (.02 is Default). Max Value The maximum value of the Acceleration Factor (.20 is the Default) Style Parabolic SAR Can toggle the visibility of the Parabolic SAR as well as the visibility of a price line showing the actual current value of the Parabolic SAR. Can also select the Parabolic SAR's color, cross thickness and visual style (Cross is the Default). Previous Previous Open Interest Next Next Percentage Price Oscillator (PPO) Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582694748/original/G5V_xcxJkR2wZoT_5JR5dHDUQ59Y7Og_TA.png?1758811017)

**Описание:** This TradingView chart displays Apple Inc. (NASDAQ) on a 1-day timeframe with the Parabolic SAR indicator configuration open. The main candlestick chart shows price action from February to October, with blue dots representing SAR values. The SAR settings panel is active, showing three tabs (Inputs/Style/Visibility) with current parameters: Start (0.02), Increment (0.02), Max value (0.2), and options for timeframe calculation and status line display. The top toolbar contains standard TradingView controls: chart type selector, indicators dropdown, alert/replay buttons, and a \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582694801/original/ikqXgn_iUvOkJsK4KFiCG8-ER4nhkjytCQ.png?1758811032)

**Описание:** This TradingView chart displays Apple Inc. (NASDAQ) on a 1-day timeframe with a candlestick chart showing price action from February to October. The chart includes a Parabolic SAR (SAR) indicator overlay (blue dots) and has an open settings modal for the SAR indicator. 

**Top Toolbar**: Contains standard TradingView controls - zoom, timeframe selector (D), indicators dropdown, chart style options, alert, replay, and publishing tools. The ticker shows current price: O253.21 H254.32 L251.71 C253.72 +1.41 (+0.56%).

**Left Sidebar**: Vertical menu with drawing tools (trendlines, Fibonacci, text, etc.), chart types, and additional functions.

**Main Chart Area**: Candlestick chart with price scale (170-260 USD) on the right. Blue SAR dots appear above/below candles indicating trend direction.

**SAR Settings Modal** (center):
- **Tabs**: Inputs (active), Style, Visibility
- **Parameters**: Start (0.02), Increment (0.02), Max value (0.2) input fields
- **Calculation**: Timeframe dropdown (set to \


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582694869/original/-uLP0JqE6XR6GeWXYTbyvuK7W73rfX--IQ.png?1758811048)

**Описание:** This TradingView chart displays **Apple Inc. (NASDAQ)** on a **1-day (1D)** timeframe, with a candlestick chart showing price action over ~9 months (Feb–Oct). Here’s a detailed breakdown:  


### **Top Bar (UI Elements)**  
- **Left**: Zoom controls (`+`/`-`), timeframe selector (`D` for 1D), and chart type toggles (candlestick, bar, etc.).  
- **Middle**: `Indicators` (dropdown to add technical indicators), `Alert` (set price alerts), `Replay` (backtest market movements), and navigation arrows (previous/next chart).  
- **Right**: `TradingView` (account menu), market data toggles (`M`/`S`), refresh, settings, screenshot, and `Publish` (share chart).  


### **Symbol & Price Bar**  
- **Symbol**: `AAPL: Apple Inc · 1D · NASDAQ` (ticker, timeframe, exchange).  
- **Price Data**: `O253.21 H254.32 L251.71 C253.79 +1.47 (+0.58%)` (open, high, low, close, change, % change).  
- **Indicator Panel**: `SAR 0.02 0.02 0.2` (Parabolic SAR parameters) with visibility/edit icons.  


### **Main Chart**  
- **Candlestick Chart**: Red/green candles show daily price action (red = close < open; green = close > open).  
- **Parabolic SAR**: Blue dots (dots = SAR values) track trend direction (dots above price = downtrend; below = uptrend).  
- **Price Scale (Right)**: Y-axis with values (170–260 USD) and a label: `SAR:ParabolicSAR 233.66` (current SAR value).  


### **SAR Settings Popup**  
A modal window configures the **Parabolic SAR** indicator:  
- **Tabs**: `Inputs` (parameters), `Style` (selected, for customization), `Visibility` (show/hide).  
- **Style Options**:  
  - `ParabolicSAR` (checked, enabled).  
  - Color picker (blue) and line style (solid).  
  - `++` (add/remove plots).  
- **Output Values**:  
  - `Precision`: Dropdown (set to `Default`).  
  - `Labels on price scale` (checked, shows SAR values on Y-axis).  
  - `Values in status line` (checked, displays SAR in the top-right).  
- **Buttons**: `Defaults` (reset to default settings), `Cancel` (close without saving), `Ok` (apply changes).  


### **Bottom Bar**  
- **Timeframe Tabs**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (switch chart periods).  
- **Date Range**: Months (Feb–Oct) on the X-axis.  
- **Timestamp**: `10:36:30 UTC-4` (current time).  
- **Pine Editor/Trading Panel**: Tabs for script editing and trading tools.  


### **Left Sidebar**  
Icons for drawing tools (trendlines, Fibonacci), chart types (candlestick, line), and account/settings (lock, globe, trash).  


### **Purpose**  
This interface is used for **technical analysis** of Apple’s stock, with the SAR indicator helping identify trend reversals. The popup customizes SAR’s appearance and output, while the top/bottom bars provide navigation, timeframe control, and additional tools.


