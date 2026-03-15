# Chart Pattern Bullish Flag

**URL:** https://www.tradingview.com/support/solutions/43000653209-chart-pattern-bullish-flag/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Chart Patterns ](/support/folders/43000587407-chart-patterns/) - / [ Chart Pattern Bullish Flag ](/support/solutions/43000653209-chart-pattern-bullish-flag/) # Chart Pattern Bullish Flag Please note that the information about expected price targets provided by Auto Chart Patterns isn't a recommendation for what you should personally do. Do not take this data as investment advice. It should only be used for education and research. As with any trade, always look first and then leap. A bullish flag is a technical analysis figure that implies a continuation of the main trend after some correction. The main trend forms a flagpole, and the correction forms a parallel flag channel. It is expected that after the price breaks the flag's parallel channel up, further price growth is expected to be approximately equal to the size of the flagpole. The indicator searches for patterns on the last 600 bars. The pattern consists of lines indicating price movements Price Line and lines of the parallel flag channel Flag . The start and end points of each price line are in 5/5 pivots. A pivot point is a local extremum (minimum or maximum) to the left and right of which there are no price values that exceed this extremum. Thus, a point will be a 5/5 pivot high if there are no high values 5 bars to the left and 5 bars to the right of it that are higher than this value at this point. The breakout of the pattern is fixed by the close value. Crossing the flag line with the close value in the interval between points 2 and 5 is not allowed. In the In Progress mode, the indicator looks for not only formed, but also emerging patterns. The last two points of such a pattern may not be in pivots, and the last price line will be dotted. The dotted horizontal line that ends with the Target label indicates the expected price level after the pattern is completed. As new bars appear, the line extends to the right until the last bar, until the pattern status changes from Awaiting to another. The label tooltip shows the price and the current status of the pattern. When the status changes, the color of the label also changes. There are 4 statuses in total: - Awaiting . The price did not reach the expected level, while there is no low value that has rolled back below the percentage of the flagpole height set by the max rollback parameter. If the price breaks through the upper line of the flag, then the condition must be met that after that it did not fall below the minimum of all the low flag channels. - Reached . The price broke the upper line of the flag and reached the expected level. - Failed . The price broke the upper line, did not reach the target level and fell below the minimum of all the low channels, either the price broke the lower line, or a low appeared in the flag channel which rolled back below the percentage of the flagpole height set by the max rollback parameter. - Indefinable . The indicator cannot unambiguously determine the status of the pattern. If the indicator finds two intersecting patterns, then preference is given to the one whose status is Awaiting . If the statuses of the intersecting patterns are Failed or Reached , or the status of both is Awaiting , then the chart will display the pattern in which points 3 and 5 are located closer to the lower line of the flag channel. A pattern with the Indefinable status is deleted if it intersects with a pattern that has a different status. Alerts: - New Pattern. Triggered when a new pattern appears on the chart. A pattern is considered new if it has a different position of point 1, 2 or 4. - Pattern Breakout. It is triggered when a bar that has closed outside the flag appears. Only the breakout in the direction of the target is registered. A breakout in the opposite direction will not trigger an alert. - Pattern Failed. Triggers when the pattern status changes to failed. Triggers only if the pattern is fully formed. - Target Reached. Triggers when the price reaches the pattern target. Triggers only if the pattern is fully formed. Inputs: - Patterns - Defines which pattern will be drawn depending on its status. Possible values: All, Awaiting and Reached , Only Awaiting, Last Awaiting. If Last Awaiting is selected, only one pattern with the Awaiting status will be displayed, the first point of which is located to the right of all the others. - Price Targets - Defines which price targets will be drawn depending status of the pattern. Possible values: All, Only Awaiting, Awaiting and Reached, None. - Permissible Deviation – The maximum allowable deviation of points in the flag from the lines of the parallel channel. Calculated as a percentage of the channel height. - Max Rollback – Determines the maximum price rollback in the flag channel as a percentage of the height of the flagpole. - In Progress – Search for emerging patterns. Previous Previous Chart Pattern Bearish Pennant Next Next Chart Pattern Bullish Pennant Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398799482/original/YHcZyiwg-IwoJ-2uWRFcuF4jp4odcJTfGg.jpg?1679315451)

**Описание:** This TradingView candlestick chart displays a **bullish flag pattern** (labeled in a purple box) and a projected price target (labeled \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43399688723/original/c2CAzRBpJocOlaF-22SODMZFlNiaXa-l7Q.jpg?1679585279)

**Описание:** This TradingView chart displays a technical analysis pattern with the following elements:  

### **Chart Structure**  
- **Grid Background**: Light gray grid lines for price/time reference.  
- **Purple Polygon**: A shaded (light purple) geometric shape connecting points 1–5, likely representing a trend or pattern (e.g., a triangle or channel).  
- **Points 1–5**: Blue numerals marking key price levels:  
  - *Point 1*: Bottom-left, starting a rising trend.  
  - *Point 2*: Peak of the initial rise.  
  - *Point 3*: Trough (support) between points 2 and 4.  
  - *Point 4*: Secondary peak (resistance).  
  - *Point 5*: Final trough (support) before a potential breakout.  


### **UI Elements**  
- **“Target” Label**: Purple box with white text in the top-right, connected by a dotted vertical line to the chart. This indicates a projected price target (e.g., for a breakout above the pattern).  


### **Purpose**  
The chart visualizes a technical pattern (likely a *triangle* or *flag*) to identify support/resistance levels, trend direction, and a projected price target for trading decisions. The shaded area highlights the pattern’s range, while the “Target” label marks a key price level for profit-taking or analysis.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398800458/original/AufJrUvtMG-IADxsGgDvGNRaD9z0Nygrow.jpg?1679315648)

**Описание:** This TradingView chart displays a **candlestick chart** (green/red bars representing price action) with technical analysis annotations:  

### Key UI/Chart Elements:  
1. **Candlestick Chart**:  
   - Green candles = price closed higher than it opened (bullish).  
   - Red candles = price closed lower than it opened (bearish).  
   - Shows price trends over time (x-axis = time, y-axis = price).  

2. **“Bullish Flag” Annotation**:  
   - A purple-shaded, triangular pattern (flag) labeled “Bullish Flag.”  
   - Purpose: Identifies a bullish continuation pattern (price rises, then consolidates in a flag shape, before resuming upward movement).  

3. **“Target” Annotation**:  
   - A purple dashed vertical line with a “Target” label at the top.  
   - Purpose: Projects a potential price level where the upward trend (after the flag) may reach (profit target for traders).  

4. **Grid Background**:  
   - Light gray grid lines for easy price/time reference.  


### Purpose of Elements:  
- **Candlesticks**: Visualize price movements (open, high, low, close) to identify trends, reversals, or patterns.  
- **Bullish Flag**: Signals a bullish trend (prior uptrend) is likely to continue after a brief consolidation.  
- **Target**: Helps traders set profit-taking levels based on the pattern’s projected move.  


This chart is used for technical analysis to identify trading opportunities (e.g., buying after the flag breaks upward) and define risk/reward targets.


