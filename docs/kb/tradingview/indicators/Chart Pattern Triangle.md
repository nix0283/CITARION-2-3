# Chart Pattern Triangle

**URL:** https://www.tradingview.com/support/solutions/43000653217-chart-pattern-triangle/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Chart Patterns ](/support/folders/43000587407-chart-patterns/) - / [ Chart Pattern Triangle ](/support/solutions/43000653217-chart-pattern-triangle/) # Chart Pattern Triangle Please note that the information about expected price targets provided by Auto Chart Patterns isn't a recommendation for what you should personally do. Do not take this data as investment advice. It should only be used for education and research. As with any trade, always look first and then leap. A triangle is an indefinite pattern that can herald both an increase and a fall in price. The target price level depends on the direction in which the price broke this pattern. It is expected that after the pattern breakout, the price will go approximately to the height of the triangle base in the direction of the breakout. The indicator searches for patterns on the last 600 bars. The pattern consists of lines denoting price movements ( Price Line ) and lines forming a triangle ( Triangle ). The start and end points of each price line are in 5/5 pivots. A pivot point is a local extremum (minimum or maximum) to the left and right of which there are no price values that exceed this extremum. Thus, a point will be a 5/5 pivot high if there are no high values 5 bars to the left and 5 bars to the right of it that are higher than this value at this point. The breakout of the pattern is fixed by the close value. The intersection of the lines of the triangle with the close value in the interval between points 1 and 5 is not allowed. In the In Progress mode, the indicator looks for not only formed, but also emerging patterns. The last two points of such a pattern may not be in pivots, and the last price line will be dotted. The dotted horizontal line that ends with the Target label indicates the expected price level after the pattern is completed. If the pattern is not broken, then the indicator will draw 2 such lines – one in each direction. After the breakout, only the line in the direction of the breakout remains. As new bars appear, the line extends to the right until the last bar, until the pattern status changes from Awaiting to another. The label tooltip shows the price and the current status of the pattern. When the status changes, the color of the label also changes. There are 4 statuses in total: - Awaiting . The triangle is not broken or broken, and the price has not yet reached the target level in the direction of the breakdown and has not gone beyond the last opposite point of the triangle. - Reached . The price broke through one of the triangle lines and reached the target in the same direction. - Failed . The price broke through one of the lines of the triangle and, having not reached the target, went beyond the last point opposite to the direction of the breakdown. - Indefinable . The indicator cannot unambiguously determine the status of the pattern. If the indicator finds two intersecting patterns, then preference is given to the one whose status is Awaiting . If the status of the intersecting patterns is Failed or Reached , or the status of both is Awaiting , then the pattern that is larger will be displayed on the chart. A pattern with the Indefinable status is deleted if it intersects with a pattern that has a different status. Alerts: - New Pattern. It is triggered when a new pattern appears on the chart. A pattern is considered new if it has changed the position of point 1, 2 or 4. - Pattern Breakout. It is triggered when a bar that has closed outside the triangle appears. If there is a breakout of the same line on which the last point of the pattern is located, then in case of an unsuccessful attempt to rebuild point 5, this alert will trigger on reverse rebuilding if no more than 5 bars have appeared since the breakout. - Pattern Failed. Triggers when the pattern status changes to failed. Triggers only if the pattern is fully formed. - Target Reached. Triggers when the price reaches the pattern target. Triggers only if the pattern is fully formed. Inputs: - Patterns - Defines which pattern will be drawn depending on its status. Possible values: All, Awaiting and Reached , Only Awaiting, Last Awaiting. If Last Awaiting is selected, only one pattern with the Awaiting status will be displayed, the first point of which is located to the right of all the others. - Price Targets - Defines which price targets will be drawn depending status of the pattern. Possible values: All, Only Awaiting, Awaiting and Reached, None. - Permissible Deviation – The maximum allowable deviation of point 3 from the corresponding line. It is calculated as a percentage of the distance between the lines of the triangle on the same bar where point 3 is located. - In Progress – Search for emerging patterns. Previous Previous Chart Pattern Rising Wedge Next Next Chart Pattern Triple Bottom Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398783593/original/btwsbdK6Oz7GqJazOiLSLSyqUPNS6KJaeg.jpg?1679311788)

**Описание:** This TradingView chart displays a **candlestick price chart** (green/red candles representing price movements) overlaid with a **blue ascending channel pattern** (two parallel trendlines forming a bullish triangle, with the area between them shaded light blue).  

### Key UI Elements:  
- **Candlesticks**: Green (price closed higher than open) and red (price closed lower than open) bars showing price action over time.  
- **Ascending Channel**: Two blue trendlines (upper resistance, lower support) defining a bullish pattern; the shaded area highlights the expected price range.  
- **Target**: A blue dashed vertical line with a labeled “Target” box, indicating a projected price level (likely a profit target for a trade setup).  


### Purpose:  
The chart analyzes price behavior within the ascending channel to identify potential breakout/bounce scenarios. The “Target” suggests a forecasted price level for traders to aim for (e.g., a short trade if price breaks below the channel, or a long trade if it bounces from support). The candlestick pattern and channel help visualize trend direction, volatility, and potential entry/exit points.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398784174/original/ov6deyP2V_2XJcbdmPhiVYR-3ahMP3_DkQ.jpg?1679311895)

**Описание:** This TradingView chart displays a **technical analysis pattern** (likely a bullish or bearish flag/ pennant structure) on a grid-based price chart. Here’s a detailed breakdown:  


### **UI Elements & Chart Components**  
1. **Grid Background**: Light gray grid lines provide a reference for price/time scaling.  
2. **Pattern Overlay**: A light blue shaded polygon outlines a multi-segment trend structure, with numbered vertices (2, 3, 4, 5) marking key points:  
   - **Vertex 2**: A sharp low (potential “base” of the pattern).  
   - **Vertex 3**: A peak (resistance or swing high).  
   - **Vertex 4**: A trough (support or swing low).  
   - **Vertex 5**: A subsequent peak (continuation of the pattern).  
3. **Dashed Vertical Line**: Extends downward from vertex 5, labeled “Target” (blue button) — indicating a projected price objective (e.g., for a trade setup).  


### **Purpose of Elements**  
- **Pattern (Shaded Area)**: Highlights a technical pattern (e.g., a “flag” or “wedge”) to identify trend direction, support/resistance, or potential reversals.  
- **Numbered Vertices**: Mark critical swing highs/lows to define the pattern’s structure.  
- **“Target” Label**: Denotes a projected price level (e.g., for profit-taking in a trade strategy).  


This chart is used for **technical analysis** to identify patterns, define trade setups, and project price targets.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398784547/original/TMjqyX17NaGR7X3BEd0KnYLDT5jY62ag6Q.jpg?1679311987)

**Описание:** This TradingView chart displays a **candlestick pattern** (green/red bars representing price movements) within a **blue ascending triangle** (labeled \


