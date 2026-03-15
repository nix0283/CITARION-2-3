# Chart Pattern Rectangle

**URL:** https://www.tradingview.com/support/solutions/43000653216-chart-pattern-rectangle/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Chart Patterns ](/support/folders/43000587407-chart-patterns/) - / [ Chart Pattern Rectangle ](/support/solutions/43000653216-chart-pattern-rectangle/) # Chart Pattern Rectangle Please note that the information about expected price targets provided by Auto Chart Patterns isn't a recommendation for what you should personally do. Do not take this data as investment advice. It should only be used for education and research. As with any trade, always look first and then leap. A rectangle is an indefinite pattern that can herald both an increase and a fall in price. The target price level depends on the direction in which the price broke this pattern. It is expected that after the breakout of the pattern, the price will go approximately to the height of the rectangle in the direction of the breakout. The indicator searches for patterns on the last 600 bars. The pattern consists of lines denoting price movements ( Price Line ) and lines forming a rectangle ( Rectangle ). The start and end points of each price line are in 5/5 pivots. A pivot point is a local extremum (minimum or maximum) to the left and right of which there are no price values that exceed this extremum. Thus, a point will be a 5/5 pivot high if there are no high values 5 bars to the left and 5 bars to the right of it that are higher than this value at this point. The breakout of the pattern is fixed by the close value. The intersection of the horizontal lines of the rectangle with the close value in the interval between points 1 and 4 is not allowed. In the In Progress mode, the indicator looks for not only formed, but also emerging patterns. The last two points of such a pattern may not be in pivots, and the last price line will be dotted. The dotted horizontal line that ends with the Target label indicates the expected price level after the pattern is completed. If the pattern is not broken, then the indicator will draw 2 such lines – one in each direction. After the breakout, only the line in the direction of the breakout remains. As new bars appear, the line extends to the right until the last bar, until the pattern status changes from Awaiting to another. The label tooltip shows the price and the current status of the pattern. When the status changes, the color of the label also changes. There are 4 statuses in total: - Awaiting. The rectangle is not broken or is broken and the price has not yet reached the target level in the direction of the breakdown and has not gone beyond the last opposite point of the rectangle. - Reached. The price broke through one of the horizontal lines of the rectangle and reached the target in the same direction. - Failed. The price broke through one of the lines of the rectangle and, having not reached the target, went beyond the last point opposite to the direction of the breakdown. - Indefinable. The indicator cannot unambiguously determine the status of the pattern. If the indicator finds two intersecting patterns, then preference is given to the one whose status is Awaiting . If the status of the intersecting patterns is Failed or Reached , or the status of both is Awaiting , then the pattern that is larger will be displayed on the chart. A pattern with the Indefinable status is deleted if it intersects with a pattern that has a different status. Alerts: - New Pattern. Triggered when a new pattern appears on the chart. The pattern is considered new if the position of the first point has changed. - Pattern Breakout. It is triggered when a bar that has closed outside the rectangle appears. If there is a breakout of the same line on which the last point of the pattern is located, then in case of an unsuccessful attempt to rebuild point 4, this alert will trigger on reverse rebuilding if no more than 5 bars have appeared since the breakout. - Pattern Failed. Triggers when the pattern status changes to failed. Triggers only if the pattern is fully formed. - Target Reached. Triggers when the price reaches the pattern target. Triggers only if the pattern is fully formed. Inputs: - Patterns - Defines which pattern will be drawn depending on its status. Possible values: All, Awaiting and Reached , Only Awaiting, Last Awaiting. If Last Awaiting is selected, only one pattern with the Awaiting status will be displayed, the first point of which is located to the right of all the others. - Price Targets - Defines which price targets will be drawn depending status of the pattern. Possible values: All, Only Awaiting, Awaiting and Reached, None. - Permissible Deviation – The maximum allowable deviation of a point from its corresponding line. It is calculated as a percentage of the distance between the lines of the rectangle on the same bar where this point is located. - In Progress – Search for emerging patterns. Previous Previous Chart Pattern Inverted Cup and Handle Next Next Chart Pattern Rising Wedge Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398793751/original/LFBbyEMLmAj_yNGBTtaidCR7MlCqVmCgOQ.jpg?1679314193)

**Описание:** This TradingView image displays a **candlestick chart** (used for technical analysis of financial markets) with the following elements:  

### 1. Chart & Candlesticks  
- **Candlesticks**: Red (price closed lower than open) and green (price closed higher than open) vertical bars, representing price action over time.  
- **Grid**: Light gray grid lines for price/time reference.  


### 2. Annotations & Drawing Tools  
- **Rectangle Tool**: An orange-outlined rectangle (labeled “Rectangle”) highlights a price range, likely marking a trading pattern (e.g., consolidation or support/resistance zone).  
- **Trend Lines**: Orange diagonal lines inside the rectangle, forming a symmetrical pattern (possibly a “head-and-shoulders” or “triangle” setup) to identify trend direction.  
- **Target**: A dashed orange line with a “Target” label, indicating a projected price level for a trade (e.g., profit target for a short/long position).  


### 3. UI Elements  
- **“Rectangle” Button**: An orange button (top-center) for activating the rectangle drawing tool (used to mark price ranges).  
- **“Target” Button**: An orange button (bottom-right) for setting price targets (e.g., for trade exits).  


### Purpose  
The chart analyzes price behavior within a defined range (rectangle) using trend lines, while the “Target” line suggests a projected price move (e.g., for trading strategies like breakouts or reversals).


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398793867/original/8YH-_neV36dokhQM-WRKeK2an97g_5_UAQ.jpg?1679314219)

**Описание:** This TradingView image displays a technical analysis chart with a **rectangular price pattern** (likely a trading range or consolidation zone) outlined in orange, filled with a light orange background. Here’s a detailed breakdown:  

### UI Elements & Annotations:  
- **Labeled Points (Blue Text):**  
  - **1:** Top-left corner of the rectangle (potential swing high).  
  - **2:** Bottom-left corner (potential swing low).  
  - **3:** Top-middle peak (highest point in the pattern).  
  - **4:** Bottom-right corner (potential breakout point).  
- **Orange Lines:** Connect points 1→2→3→4, forming a zigzag pattern within the rectangle (likely a trend or correction structure).  
- **Dotted Orange Line:** Extends downward from point 4, labeled “Target” (orange tooltip) — indicating a projected price target for a bearish breakout (e.g., measured move or support level).  
- **Grid Background:** Light gray grid for price/time reference (standard in TradingView for technical analysis).  


### Purpose:  
This chart visualizes a **trading setup** (e.g., a bearish breakout scenario) where the rectangle defines a consolidation range. The “Target” line suggests a price projection for a downward move after a breakout below point 4. The zigzag lines (1-2-3-4) may represent a corrective pattern (e.g., ABCD) or trend structure, helping traders identify entry, stop-loss, or profit targets.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398793950/original/0vF_41_gl3jK6rmDkHDDk6Pk3Oa6j0P3nQ.jpg?1679314244)

**Описание:** This TradingView image displays a **candlestick chart** (with green/red candles representing price action) on a grid background. Key UI elements and their purposes:  

### 1. **Candlestick Chart**  
- **Candles**: Green (bullish, closing > opening) and red (bearish, closing < opening) vertical bars showing price movement over time.  
- **Grid**: Light gray lines for visual reference of price/time scales.  


### 2. **Annotations & Shapes**  
- **Orange Rectangle**: A labeled “Rectangle” shape (top-center) highlighting a specific price range. It likely marks a consolidation or trading range, with an orange border and light orange fill.  
- **Dashed Orange Line**: A vertical dashed line (right) labeled “Target” (top/bottom). This suggests a projected price level (e.g., profit target for a trade).  
- **Orange Trendline**: A diagonal line within the rectangle, connecting key price points (e.g., support/resistance or a trend channel).  


### 3. **Labels**  
- “Rectangle”: Identifies the highlighted price range.  
- “Target”: Marks the dashed line as a price objective (e.g., for a short/long trade).  


### Purpose  
The chart analyzes price behavior (via candles) within a defined range (rectangle), using a trendline for trend direction and a “Target” for projecting future price movement (e.g., exit strategy).


