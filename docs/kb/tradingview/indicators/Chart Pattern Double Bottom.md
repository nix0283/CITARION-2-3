# Chart Pattern Double Bottom

**URL:** https://www.tradingview.com/support/solutions/43000690659-chart-pattern-double-bottom/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Chart Patterns ](/support/folders/43000587407-chart-patterns/) - / [ Chart Pattern Double Bottom ](/support/solutions/43000690659-chart-pattern-double-bottom/) # Chart Pattern Double Bottom Please note that the information about expected price targets provided by Auto Chart Patterns isn't a recommendation for what you should personally do. Do not take this data as investment advice. It should only be used for education and research. As with any trade, always look first and then leap. Double bottom is a reversal pattern formed by two consecutive lows that are at the same level (a slight difference in values is allowed) and an intermediate high between them. It is expected that after the price again reaches the level of the first low and then turns around and goes above the intermediate high level, further price growth is expected to continue further by about the difference between the lows and the high. The indicator searches for patterns on the last 600 bars. The pattern consists of lines indicating price movements ( Price Line ) and neck lines ( Neck Line ). The neckline is a horizontal line drawn through the intermediate maximum. The start and end points of each price line, except for the last one (point 5), are located in 5/5 pivots. A pivot point is a local extremum (minimum or maximum) to the left and right of which there are no price values that exceed this extremum. Thus, a point will be a 5/5 pivot high if there are no high values 5 bars to the left and 5 bars to the right of it that are higher than this value at this point. Point 5 is located at the intersection of the last price line with the neck line. In the In Progress mode, the indicator looks for not only formed, but also emerging patterns. The second bottom of such a pattern may not be in the pivot and the price lines forming it will be dotted. The pattern is considered formed when, after the appearance of the second bottom, the price (close) rises above the neck line. The dotted horizontal line that ends with the label Target indicates the expected price level after the pattern is formed. As new bars appear, the line extends to the right until the last bar, until the status of the pattern changes from Awating to another. The label tooltip shows the price and the current status of the pattern. When the status changes, the color of the label also changes. There are 4 statuses in total: - Awaiting . The price did not reach the expected level and did not go below the second bottom. - Reached . The price reached the expected level. - Failed . The price did not reach the expected level and went below the second bottom. - Indefinable . The indicator cannot unambiguously determine the status of the patterns. If the indicator finds two intersecting patterns, then preference is given to the one whose status is Awaiting . If the status of the intersecting patterns is Failed or Reached or the status of both is Awaiting, then the pattern will be displayed on the chart, in which the price values of the bottoms are the most similar, i.e., more accurate. A pattern with the Indefinable status is deleted if it intersects with a pattern that has a different status. Alerts: - New Pattern. It is triggered when a new pattern appears on the chart. A pattern is considered new if it has a different position of the first bottom or intermediate maximum. - Pattern Formed. It is triggered when, after the appearance of the second bottom, a bar appears that has closed above the neckline. - Pattern Failed. Triggers when the pattern status changes to failed. Triggers only if the pattern is fully formed. - Target Reached. Triggers when the price reaches the pattern target. Triggers only if the pattern is fully formed. Inputs: - Patterns - Defines which pattern will be drawn depending on its status. Possible values: All, Awaiting and Reached , Only Awaiting, Last Awaiting. If Last Awaiting is selected, only one pattern with the Awaiting status will be displayed, the first point of which is located to the right of all the others. - Price Targets - Defines which price targets will be drawn depending status of the pattern. Possible values: All, Only Awaiting, Awaiting and Reached, None. - Trend Height – Sets the required height of the trend preceding the pattern relative to the height of the pattern itself. The height of the pattern is considered to be the difference in the price of the minimum of the bottoms and the intermediate maximum. Percentage value. - Second Bottom – Determines which patterns to display with respect to whether the second bottom of the first bottom is above Higher or below Lower . If Both is selected, all patterns will be displayed. - Permissible Deviation – The maximum allowable difference in vertex depth. The depth of the low is calculated from the intermediate maximum. Percent value. - In Progress – Search for patterns that have not been fully formed yet. Previous Previous Chart Pattern Cup and Handle Next Next Chart Pattern Double Top Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43381153718/original/PKDxtBIajILJiA2hd4-fygoNcBXYWkeIew.png?1671734520)

**Описание:** This TradingView chart displays a **candlestick pattern** (green/red bars representing price action) with technical analysis annotations:  

### 1. Chart & Candlesticks  
- **Candlesticks**: Green (bullish, close > open) and red (bearish, close < open) bars show price movement over time.  
- **Grid**: Light gray grid lines provide price/time reference.  


### 2. Key Annotations & Shapes  
- **Triangle Pattern**: A green-outlined triangle (labeled “Bottom 1” and “Bottom 2” at its two lower vertices) forms a *symmetrical triangle* (or “bottoming triangle”), indicating a potential reversal from a downtrend to an uptrend.  
- **Support/Resistance Zone**: A dashed green horizontal line (and shaded green area) marks a key price level—likely support (where price previously bounced) or resistance (now broken to signal a breakout).  
- **Target**: A dashed green line with a “Target” label points upward, indicating a projected price level for the next upward move (profit target for a long trade).  


### 3. Labels & Purpose  
- **Bottom 1/Bottom 2**: Mark the two lows of the triangle, defining the pattern’s structure.  
- **Target**: Shows the expected price objective after the breakout (based on the triangle’s height or trend continuation).  


### 4. UI Context (TradingView)  
While the image focuses on the chart, TradingView’s UI typically includes:  
- Timeframe selector (e.g., 1H, 1D) to adjust candlestick duration.  
- Indicators/overlays (e.g., moving averages) to add technical analysis.  
- Order buttons (buy/sell) for trade execution (not visible here, as the image emphasizes analysis).  


This chart illustrates a **bottoming triangle pattern**, used to identify trend reversals and set profit targets. The shaded area and dashed line highlight key support/resistance, while “Bottom 1/2” and “Target” guide trade setup (entry at breakout, exit at target).


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43381153750/original/D5os7N4ESVWPkTwhzhmJWAwszik5PdwBQw.png?1671734532)

**Описание:** The image is a **TradingView chart** (likely a technical analysis diagram) with the following elements:  

### 1. Chart Structure & Price Action  
- A **green line** forms a zigzag pattern:  
  - Starts at a high (leftmost point), drops to a low labeled **“2”**, rises to a peak labeled **“3”**, drops to a second low labeled **“4”**, then rises to a final point labeled **“5”**.  
- The area between the lows (2, 4) and the peak (3) is shaded in **light green**, indicating a potential “consolidation” or “reversal zone.”  


### 2. Key UI Elements & Annotations  
- **“Target” Label**: A green box with white text, positioned at the top-right. A **dotted green line** connects this label to point “5,” signifying a projected price target (where traders expect the price to reach).  
- **Numbered Points (2, 3, 4, 5)**: Blue text labels critical price levels:  
  - *2*: First low (support).  
  - *3*: Peak (resistance/consolidation top).  
  - *4*: Second low (support, often a “double bottom” or “higher low” if 4 > 2).  
  - *5*: Projected target (where the upward move from 4 is expected to end).  


### 3. Purpose of Elements  
- **Line & Shaded Area**: Illustrates a potential “W-pattern” (double bottom) or “ascending triangle” setup, used to identify trend reversals or continuations.  
- **“Target” Annotation**: Guides traders on where to take profits (exit long positions) after the price rises from the support at 4.  


This diagram is typical of technical analysis, helping traders visualize support/resistance levels, pattern recognition, and profit targets.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43381153813/original/kKnEIyP-Jf4TMg1mUCANmXbzKWifv3eR-Q.png?1671734543)

**Описание:** This TradingView chart displays a **candlestick price chart** (green/red candles representing price action) with technical analysis annotations:  

### Key UI Elements & Annotations:  
- **Candlesticks**: Green (price close > open) and red (price close < open) bars showing price movement over time.  
- **Trend Lines**: Solid green lines forming a **symmetrical triangle pattern** (a consolidation phase).  
- **Support/Resistance Zones**: Dotted green lines marking the triangle’s upper (resistance) and lower (support) boundaries.  
- **Labeled Bottoms**:  
  - *Bottom 1*: The first low of the triangle pattern (leftmost trough).  
  - *Bottom 2*: The second low of the triangle pattern (rightmost trough).  
- **Target**: A dashed green line with a label, indicating the **projected price target** (upward breakout) if the price breaks above the triangle’s resistance.  
- **Shaded Area**: Light green fill within the triangle, highlighting the consolidation range.  


### Purpose of Elements:  
- The triangle pattern suggests a period of price consolidation; a breakout above resistance (dotted line) could trigger a bullish move to the “Target” level.  
- “Bottom 1” and “Bottom 2” mark key support levels within the pattern, while the “Target” defines a potential profit zone for traders anticipating an upward breakout.  

The chart uses standard TradingView styling (grid, candlestick colors) to visualize price action and technical analysis for trading decisions.


