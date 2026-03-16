# Chart Pattern Falling Wedge

**URL:** https://www.tradingview.com/support/solutions/43000697938-chart-pattern-falling-wedge/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Chart Patterns ](/support/folders/43000587407-chart-patterns/) - / [ Chart Pattern Falling Wedge ](/support/solutions/43000697938-chart-pattern-falling-wedge/) # Chart Pattern Falling Wedge Please note that the information about expected price targets provided by Auto Chart Patterns isn't a recommendation for what you should personally do. Do not take this data as investment advice. It should only be used for education and research. As with any trade, always look first and then leap. A falling wedge is a reversal pattern that is an inclined, converging channel that limits the price movement. The channel lines are directed downwards. It is expected that after the price breaks the upper line of the wedge, it will move further up to approximately the height of the base of the wedge. The indicator searches for patterns on the last 600 bars. The pattern consists of lines indicating price movements ( Price Line ) and lines forming a wedge ( Wedge ). The start and end points of each price line are in 5/5 pivots. A pivot point is a local extremum (minimum or maximum) to the left and right of which there are no price values that exceed this extremum. Thus, a point will be a 5/5 pivot high if there are no high values 5 bars to the left and 5 bars to the right of it that are higher than this value at this point. The breakout of the pattern is fixed by the close value. The intersection of the wedge lines with the close value in the interval between points 1 and 4 is not allowed. In the In Progress mode, the indicator looks for not only formed, but also emerging patterns. The last two points of such a pattern may not be in pivots, and the last price line will be dotted. The dotted horizontal line that ends with the Target label indicates the expected price level after the pattern is completed. As new bars appear, the line extends to the right until the last bar, until the pattern status changes from Awaiting to another. The label tooltip shows the price and the current status of the pattern. When the status changes, the color of the label also changes. There are 4 statuses in total: - Awaiting . The wedge has not been broken, or it has been broken and at the same time the price has not gone below the extreme point of the bottom line of the wedge and has not yet reached the target. - Reached . The price broke the upper line of the wedge and reached the target. - Failed . Having broken through the upper line of the wedge, the price did not reach the target and went below the extreme point of the lower line of the wedge, or the lower line was broken. - Indefinable . The indicator cannot unambiguously determine the status of the pattern. If the indicator finds two intersecting patterns, then preference is given to the one whose status is Awaiting . If the status of the intersecting patterns is Failed or Reached , or the status of both is Awaiting , then the pattern that is larger will be displayed on the chart. A pattern with the Indefinable status is deleted if it intersects with a pattern that has a different status. Alerts: - New Pattern. Triggered when a new pattern appears on the chart. A pattern is considered new if it has a different position of point 1 or 3. - Pattern Breakout. It is triggered when a bar that has closed outside the wedge appears. Only the breakout in the direction of the target is registered. A breakout in the opposite direction will not trigger an alert. - Pattern Failed. Triggers when the pattern status changes to failed. Triggers only if the pattern is fully formed. - Target Reached. Triggers when the price reaches the pattern target. Triggers only if the pattern is fully formed. Inputs: - Patterns - Defines which pattern will be drawn depending on its status. Possible values: All, Awaiting and Reached , Only Awaiting, Last Awaiting. If Last Awaiting is selected, only one pattern with the Awaiting status will be displayed, the first point of which is located to the right of all the others. - Price Targets - Defines which price targets will be drawn depending status of the pattern. Possible values: All, Only Awaiting, Awaiting and Reached, None. - Channel Width Ratio Start/End – The minimum required channel height difference at the beginning and end of the pattern. Percent value. - In Progress – Search for emerging patterns. Previous Previous Chart Pattern Elliott Wave Next Next Chart Pattern Head And Shoulders Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398810819/original/JnShqWnvy0J1wayX1MWyWS6Z4XjSPBjHEg.jpg?1679317635)

**Описание:** This TradingView chart displays a **candlestick chart** (green/red candles representing price action) with technical analysis annotations:  

### Key UI/Chart Elements:  
1. **Candlestick Chart**:  
   - Green candles = price closed higher than it opened (bullish).  
   - Red candles = price closed lower than it opened (bearish).  
   - Shows price trends over time (x-axis = time, y-axis = price).  

2. **Falling Wedge Pattern**:  
   - A red, shaded “wedge” shape (labeled “Falling Wedge”) with two converging trendlines (upper resistance, lower support).  
   - Purpose: A bullish reversal pattern (price consolidates in a narrowing range, then typically breaks upward).  

3. **Target Annotation**:  
   - A red “Target” label with a dotted vertical line (right side).  
   - Purpose: Indicates a projected price level for the expected upward breakout from the falling wedge.  

4. **Grid Background**:  
   - Light gray grid lines for easy price/time reference.  


The chart analyzes a falling wedge pattern to forecast a potential bullish breakout, with the “Target” marking the expected price objective.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398810946/original/X2dvg-AyJ6lCI3BFLi0ccudJTtmJMh5hEw.jpg?1679317662)

**Описание:** This TradingView chart displays a **technical analysis pattern** (likely a bearish Gartley or similar harmonic structure) on a grid-based price chart. Here’s a detailed breakdown:  


### **Core Elements**  
- **Chart Grid**: Light gray grid lines provide a reference for price/time scaling.  
- **Red Shaded Area**: A polygon (formed by connecting points 1→2→3→4) highlights the pattern’s “valid” or “potential” zone, shaded in light red to emphasize the area of interest.  
- **Red Lines**: Connect key points (1, 2, 3, 4) to define the pattern’s structure (e.g., trendlines, Fibonacci retracement levels, or harmonic ratios).  


### **Labeled Points**  
- **Point 1**: Top-left (likely a swing high, marking the start of the pattern).  
- **Point 2**: Bottom (a swing low, forming a trough).  
- **Point 3**: Middle (a retracement high, part of the pattern’s internal structure).  
- **Point 4**: Bottom-right (a final swing low, completing the pattern).  


### **“Target” Label**  
- A red box with “Target” text (top-right) is connected by a **dotted red line** to the chart. This line projects a potential price target (e.g., a profit-taking level) if the pattern completes as expected.  


### **Purpose**  
This chart is used for **technical analysis** (e.g., harmonic trading, Elliott Wave, or trend reversal identification). The shaded area and labeled points help traders:  
- Identify pattern validity (e.g.,是否符合 harmonic ratios).  
- Define entry/exit zones (e.g., entry at point 4, target at the dotted line).  
- Visualize risk/reward (shaded area = potential trade zone; target = profit objective).  


The design is minimalistic, focusing on pattern structure and target projection—common in TradingView for analyzing price action and planning trades.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398811030/original/sROESWMcPZUji3ZSqlvqqY5tqSdMwJVhNw.jpg?1679317684)

**Описание:** This TradingView chart displays a **candlestick price chart** (green/red bars representing price action) with technical analysis annotations:  

### 1. Chart & Candlesticks  
- **Candlesticks**: Green (bullish, close > open) and red (bearish, close < open) bars show price movement over time.  
- **Grid**: Light gray grid lines provide scale for price/time.  


### 2. Technical Pattern: Falling Wedge  
- **Red Shaded Area**: A “falling wedge” pattern (labeled “Falling Wedge”) is highlighted. This is a bullish reversal pattern, defined by two converging trendlines (upper descending, lower ascending) that narrow over time. The red shading emphasizes the pattern’s boundary.  


### 3. Target Annotation  
- **“Target” Label**: A red label with a dashed vertical line (right side) marks a projected price level. This suggests a potential upside price target if the falling wedge pattern breaks upward (a common bullish signal).  


### 4. UI Elements  
- **Labels**: “Falling Wedge” (pattern identification) and “Target” (price projection) use red boxes for clarity.  
- **Trendlines**: Red solid lines outline the falling wedge; a dashed line (inside the wedge) may show an internal trend or support/resistance.  


### Purpose  
The chart analyzes a falling wedge pattern to identify a potential bullish reversal, with the “Target” indicating a projected price level for a breakout.


