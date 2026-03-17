# Chart Pattern Rising Wedge

**URL:** https://www.tradingview.com/support/solutions/43000653219-chart-pattern-rising-wedge/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Chart Patterns ](/support/folders/43000587407-chart-patterns/) - / [ Chart Pattern Rising Wedge ](/support/solutions/43000653219-chart-pattern-rising-wedge/) # Chart Pattern Rising Wedge Please note that the information about expected price targets provided by Auto Chart Patterns isn't a recommendation for what you should personally do. Do not take this data as investment advice. It should only be used for education and research. As with any trade, always look first and then leap. Rising wedge – a reversal pattern, which is an inclined converging channel that limits the price movement. The channel lines are directed upwards. It is expected that after the price breaks the lower line of the wedge, it will go further down to approximately the height of the base of the wedge. The indicator searches for patterns on the last 600 bars. The pattern consists of lines indicating price movements ( Price Line ) and lines forming a wedge ( Wedge ). The start and end points of each price line are in 5/5 pivots. A pivot point is a local extremum (minimum or maximum) to the left and right of which there are no price values that exceed this extremum. Thus, a point will be a 5/5 pivot high if there are no high values 5 bars to the left and 5 bars to the right of it that are higher than this value at this point. The breakout of the pattern is fixed by the close value. The intersection of the wedge lines with the close value in the interval between points 1 and 4 is not allowed. In the In Progress mode, the indicator looks for not only formed, but also emerging patterns. The last two points of such a pattern may not be in pivots, and the last price line will be dotted. The dotted horizontal line that ends with the Target label indicates the expected price level after the pattern is completed. As new bars appear, the line extends to the right until the last bar, until the pattern status changes from Awaiting to another. The label tooltip shows the price and the current status of the pattern. When the status changes, the color of the label also changes. There are 4 statuses in total: - Awaiting . The wedge has not been broken, or it has been broken and at the same time the price has not gone above the extreme point of the upper line of the wedge and has not yet reached the target. - Reached . The price broke the lower line of the wedge and reached the target. - Failed . Having broken through the lower line of the wedge, the price did not reach the target and went above the extreme point of the upper line of the wedge, or the upper line was broken. - Indefinable . The indicator cannot unambiguously determine the status of the pattern. If the indicator finds two intersecting patterns, then preference is given to the one whose status is Awaiting . If the status of the intersecting patterns is Failed or Reached , or the status of both is Awaiting , then the pattern that is larger will be displayed on the chart. A pattern with the Indefinable status is deleted if it intersects with a pattern that has a different status. Alerts: - New Pattern. Triggered when a new pattern appears on the chart. A pattern is considered new if it has a different position of point 1 or 3. - Pattern Breakout. It is triggered when a bar that has closed outside the wedge appears. Only the breakout in the direction of the target is registered. A breakout in the opposite direction will not trigger an alert. - Pattern Failed. Triggers when the pattern status changes to failed. Triggers only if the pattern is fully formed. - Target Reached. Triggers when the price reaches the pattern target. Triggers only if the pattern is fully formed. Inputs: - Patterns - Defines which pattern will be drawn depending on its status. Possible values: All, Awaiting and Reached , Only Awaiting, Last Awaiting. If Last Awaiting is selected, only one pattern with the Awaiting status will be displayed, the first point of which is located to the right of all the others. - Price Targets - Defines which price targets will be drawn depending status of the pattern. Possible values: All, Only Awaiting, Awaiting and Reached, None. - Channel Width Ratio Start/End – The minimum required channel height difference at the beginning and end of the pattern. Percent value. - In Progress – Search for emerging patterns. Previous Previous Chart Pattern Rectangle Next Next Chart Pattern Triangle Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398803821/original/Cl_OZUyQvj-u7zb-XEp4vSGry5T1C-MVoQ.jpg?1679316318)

**Описание:** This TradingView chart displays a **candlestick chart** (green candles = price close > open; red candles = price close < open) with a technical analysis pattern overlay. Here’s a breakdown:  

### 1. Chart & Pattern  
- **Candlestick Chart**: Shows price action over time (each candle represents open, high, low, close).  
- **Rising Wedge**: A bearish reversal pattern (labeled “Rising Wedge”) marked by two converging trendlines (upper and lower) forming a wedge shape. The green shaded area highlights the pattern’s boundary. Rising wedges typically signal a potential downward breakout after an uptrend.  


### 2. UI Elements & Annotations  
- **“Rising Wedge” Label**: A green box identifying the pattern.  
- **“Target” Label**: A green box with a dashed vertical line (right side) indicating a projected price level for a bearish breakout (where price is expected to fall after breaking below the wedge’s lower trendline).  


### 3. Purpose  
The chart analyzes price behavior within a rising wedge pattern to identify a potential sell signal (breakout downward) and estimate a price target for the subsequent decline.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398803985/original/mICj6DaeUDPpxaWUqtwkbsHkteifBojphg.jpg?1679316342)

**Описание:** This TradingView chart displays a technical analysis pattern with the following elements:  

### Chart & Background  
- **Grid**: Light gray grid lines for price/time reference.  
- **Shaded Area**: Light green fill between two trendlines, indicating a potential trading range or pattern (e.g., ascending channel or bullish flag).  


### Key Points & Trendlines  
- **Labeled Points**: Blue numbers (1, 2, 3, 4) mark critical price levels:  
  - *Point 1*: Lower-left anchor (likely a swing low).  
  - *Point 2*: Upper-left peak (swing high).  
  - *Point 3*: Lower-right trough (swing low, forming a higher low).  
  - *Point 4*: Upper-right peak (swing high, forming a higher high).  
- **Trendlines**: Green lines connect these points:  
  - *Lower Trendline*: Connects Points 1 → 3 (ascending support).  
  - *Upper Trendline*: Connects Points 2 → 4 (ascending resistance).  


### Target Zone  
- **Dotted Green Line**: Vertical dashed line on the right, marking a projected price target (labeled “Target” in a green button at the bottom-right). This suggests a bullish breakout projection from the pattern.  


### Purpose  
The chart illustrates a bullish technical pattern (e.g., ascending channel or breakout setup), where the shaded area represents a consolidation range. Traders use this to identify support/resistance, anticipate a breakout, and set profit targets (via the “Target” zone).


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43398804049/original/DHrs9AdlNOK39Rfl4lcM3pwyUBTAqavylQ.jpg?1679316365)

**Описание:** This TradingView chart displays a **candlestick price chart** (green candles = bullish, red = bearish) with a **Rising Wedge** technical pattern analysis:  

### Key UI Elements:  
- **Candlesticks**: Represent price action (open, high, low, close) over time. Green = closing price > opening price; red = closing < opening.  
- **Rising Wedge Pattern**: Two converging trendlines (upper resistance, lower support) forming a narrowing “wedge” shape, shaded light green. Labeled “Rising Wedge” (top-left green box). Wedges often signal potential reversals (e.g., bullish wedge may break downward, but here it’s used to project a target).  
- **Target Projection**: Dotted green line (right) extending from the wedge’s breakout point, labeled “Target” (bottom-right green box). This estimates a price level for a potential move after the pattern completes.  
- **Grid Background**: Light gray grid for price/time reference.  


### Purpose:  
The chart analyzes a Rising Wedge pattern to identify a potential price target, helping traders anticipate market behavior (e.g., breakout direction, profit targets). The candlesticks show historical price action, while the wedge and target line visualize a technical trading setup.


