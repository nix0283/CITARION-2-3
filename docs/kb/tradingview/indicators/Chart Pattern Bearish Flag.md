# Chart Pattern Bearish Flag

**URL:** https://www.tradingview.com/support/solutions/43000697936-chart-pattern-bearish-flag/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Chart Patterns ](/support/folders/43000587407-chart-patterns/) - / [ Chart Pattern Bearish Flag ](/support/solutions/43000697936-chart-pattern-bearish-flag/) # Chart Pattern Bearish Flag Please note that the information about expected price targets provided by Auto Chart Patterns isn't a recommendation for what you should personally do. Do not take this data as investment advice. It should only be used for education and research. As with any trade, always look first and then leap. A bearish flag is a technical analysis figure that implies a continuation of the main trend after some correction. The main trend forms a flagpole, and the correction forms a parallel flag channel. It is expected that after the price breaks the flag's parallel channel down, further price decline is expected to be approximately equal to the size of the flagpole. The indicator searches for patterns on the last 600 bars. The pattern consists of lines indicating price movements ( Price Line ) and lines of the parallel flag channel ( Flag ). The start and end points of each price line are in 5/5 pivots. A pivot point is a local extremum (minimum or maximum) to the left and right of which there are no price values that exceed this extremum. Thus, a point will be a 5/5 pivot high if there are no high values 5 bars to the left and 5 bars to the right of it that are higher than this value at this point. The breakout of the pattern is fixed by the close value. Crossing the flag line with the close value in the interval between points 2 and 5 is not allowed. In the In Progress mode, the indicator looks for not only formed, but also emerging patterns. The last two points of such a pattern may not be in pivots, and the last price line will be dotted. The dotted horizontal line that ends with the Target label indicates the expected price level after the pattern is completed. As new bars appear, the line extends to the right until the last bar, until the pattern status changes from Awaiting to another. The label tooltip shows the price and the current status of the pattern. When the status changes, the color of the label also changes. There are 4 statuses in total: - Awaiting. The price did not reach the expected level, while there is no high value that has rolled back above the percentage of the flagpole height set by the max rollback parameter. If the price has broken through the lower line of the flag, then the condition must be met that after that it has not risen above the maximum of all the high flag channels. - Reached. The price broke the lower line of the flag and reached the expected level. - Failed. The price broke the lower line, did not reach the target level and rose above the maximum of all the highs of the channel, either the price broke the upper line, or a high appeared in the flag channel which rolled back above the percentage of the flagpole height set by the max rollback parameter. - Indefinable. The indicator cannot unambiguously determine the status of the pattern. If the indicator finds two intersecting patterns, then preference is given to the one whose status is Awaiting . If the statuses of the intersecting patterns are Failed or Reached , or the status of both is Awaiting , then the chart will display the pattern in which points 3 and 5 are located closer to the lower line of the flag channel. A pattern with the Indefinable status is deleted if it intersects with a pattern that has a different status. Alerts: - New Pattern. Triggered when a new pattern appears on the chart. A pattern is considered new if it has a different position of point 1, 2 or 4. - Pattern Breakout. It is triggered when a bar that has closed outside the flag appears. Only the breakout in the direction of the target is registered. A breakout in the opposite direction will not trigger an alert. - Pattern Failed. Triggers when the pattern status changes to failed. Triggers only if the pattern is fully formed. - Target Reached. Triggers when the price reaches the pattern target. Triggers only if the pattern is fully formed. Inputs: - Patterns - Defines which pattern will be drawn depending on its status. Possible values: All, Awaiting and Reached , Only Awaiting, Last Awaiting. If Last Awaiting is selected, only one pattern with the Awaiting status will be displayed, the first point of which is located to the right of all the others. - Price Targets - Defines which price targets will be drawn depending status of the pattern. Possible values: All, Only Awaiting, Awaiting and Reached, None. - Permissible Deviation – The maximum allowable deviation of points in the flag from the lines of the parallel channel. Calculated as a percentage of the channel height. - Max Rollback – Determines the maximum price rollback in the flag channel as a percentage of the height of the flagpole. - In Progress – Search for emerging patterns. Previous Previous Auto chart patterns on TradingView Next Next Chart Pattern Bearish Pennant Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398806553/original/KrInJYjt4mKSps-RiyZCiKha_0CyEuGG6Q.jpg?1679316811)

**Описание:** This TradingView chart displays a **candlestick price chart** (red/green bars representing price action) with technical analysis annotations:  

### Key UI Elements & Annotations:  
- **Candlesticks**: Red (price decline) and green (price rise) bars showing open, high, low, and close prices over time.  
- **Bearish Flag Pattern**: A light blue shaded area bounded by two parallel trendlines (a “flag” shape) labeled “Bearish Flag.” This pattern suggests a temporary pause in a downward trend, with a breakout expected to continue the prior decline.  
- **Target**: A dashed vertical line (rightmost) labeled “Target,” indicating a projected price level for the bearish flag breakout (where traders expect the price to fall to).  


### Purpose:  
The chart uses candlestick analysis and the *bearish flag* pattern (a continuation pattern) to identify a potential bearish trading opportunity, with the “Target” marking the expected price objective for the downward move.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398806621/original/CReQrf5a271yDeyaEqipfHzp1RA9kymX_g.jpg?1679316829)

**Описание:** This TradingView chart displays a technical analysis pattern with the following elements:  

### **Chart & Grid**  
- A light gray grid (background) provides a reference for price/time scaling.  
- The main chart area shows a blue line forming a **5-point pattern** (labeled 1–5), typical of Elliott Wave or harmonic patterns, with a light blue shaded region (likely a \


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398806732/original/_yHCdgJgK7csUnAOx6iOoKeN1epXonLkYg.jpg?1679316854)

**Описание:** This TradingView chart displays a **candlestick chart** (with red/green candles representing price action) overlaid with a **blue ascending channel** (trend lines marking support/resistance, shaded light blue). A **dotted teal line** on the right indicates a projected price \


