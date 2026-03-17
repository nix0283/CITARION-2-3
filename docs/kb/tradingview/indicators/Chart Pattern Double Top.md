# Chart Pattern Double Top

**URL:** https://www.tradingview.com/support/solutions/43000653211-chart-pattern-double-top/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Chart Patterns ](/support/folders/43000587407-chart-patterns/) - / [ Chart Pattern Double Top ](/support/solutions/43000653211-chart-pattern-double-top/) # Chart Pattern Double Top Please note that the information about expected price targets provided by Auto Chart Patterns isn't a recommendation for what you should personally do. Do not take this data as investment advice. It should only be used for education and research. As with any trade, always look first and then leap. Double top is a reversal pattern formed by two consecutive highs that are at the same level (slight difference in values is allowed) and an intermediate low between them. It is expected that after the price again reaches the level of the first high and then reverses and falls below the level of the intermediate low, the fall will continue further by about the difference between the highs and the low. The indicator searches for patterns on the last 600 bars. The pattern consists of lines indicating price movements ( Price Line ) and neck lines ( Neck Line ). The neck line is a horizontal line drawn through the intermediate minimum. The start and end points of each price line, except for the last one (point 5), are located in 5/5 pivots. A pivot point is a local extremum (minimum or maximum) to the left and right of which there are no price values that exceed this extremum. Thus, a point will be a 5/5 pivot high if there are no high values 5 bars to the left and 5 bars to the right of it that are higher than this value at this point. Point 5 is located at the intersection of the last price line with the neck line. In the In Progress mode, the indicator looks for not only formed, but also emerging patterns. The second peak of such a pattern may not be in the pivot, and the price lines that form it will be dotted. The pattern is considered formed when, after the appearance of the second peak, the price (close) falls below the neckline. The dotted horizontal line that ends with the Target label indicates the expected price level after the pattern has formed. As new bars appear, the line extends to the right until the last bar, until the pattern status changes from Awaiting to another. The label tooltip shows the price and the current status of the pattern. When the status changes, the color of the label also changes. There are 4 statuses in total: - Awaiting . The price did not reach the expected level and did not go above the second top. - Reached . The price reached the expected level. - Failed . The price did not reach the expected level and went above the second top. - Indefinable. The indicator cannot unambiguously determine the status of the patterns. If the indicator finds two intersecting patterns, then preference is given to the one whose status is Awaiting . If the status of the intersecting patterns is Failed or Reached or the status of both is Awaiting , then the pattern will be displayed on the chart, in which the price values of the vertices are the most similar, i.e., more accurate. A pattern with the Indefinable status is deleted if it intersects with a pattern that has a different status. Alerts: - New Pattern. It is triggered when a new pattern appears on the chart. A pattern is considered new if it has a different position of the first top or the intermediate minimum. - Pattern Formed. It is triggered when, after the appearance of the second top, a bar appears that has closed below the neckline. - Pattern Failed. Triggers when the pattern status changes to failed. Triggers only if the pattern is fully formed. - Target Reached. Triggers when the price reaches the pattern target. Triggers only if the pattern is fully formed. Inputs: - Patterns - Defines which pattern will be drawn depending on its status. Possible values: All, Awaiting and Reached , Only Awaiting, Last Awaiting. If Last Awaiting is selected, only one pattern with the Awaiting status will be displayed, the first point of which is located to the right of all the others. - Price Targets - Defines which price targets will be drawn depending status of the pattern. Possible values: All, Only Awaiting, Awaiting and Reached, None. - Trend Height – Sets the required height of the trend preceding the pattern relative to the height of the pattern itself. The height of the pattern is the difference in price between the maximum of the tops and the intermediate minimum. Percent value. - Second Top – Determines which patterns to display with respect to whether the second top of the first top is above Higher or below Lower . If Both is selected, all patterns will be displayed. - Permissible Deviation – The maximum allowable difference in tops heights. The height of the top is calculated from the intermediate minimum. Percent value. - In Progress – Search for patterns that have not been fully formed yet. Also read: - [How to trade on TradingView](https://www.tradingview.com/support/solutions/43000756695-how-to-trade-on-tradingview/) - [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/) - [The technical analysis essentials](https://www.tradingview.com/support/solutions/43000759577-the-technical-analysis-essentials-with-tradingview/) - [Introduction to fundamental analysis](https://www.tradingview.com/support/solutions/43000759574-introduction-to-fundamental-analysis-on-tradingview/) - [Portfolios: track your assets, know your trades](https://www.tradingview.com/support/solutions/43000760937-tradingview-portfolios-track-your-assets-know-your-trades/) Previous Previous Chart Pattern Double Bottom Next Next Chart Pattern Elliott Wave Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43381128637/original/bP9YLZeUrLiAF5LD7fEBG5Tw7o1sVL_Z0Q.png?1671726918)

**Описание:** This TradingView chart displays a **candlestick price chart** (green/red bars representing price action) with technical analysis annotations:  

### Key UI Elements & Annotations:  
- **Candlesticks**: Green (bullish, closing > opening) and red (bearish, closing < opening) bars show price movement over time.  
- **Pink Triangles**: Two ascending triangles labeled *“Top 1”* and *“Top 2”* highlight potential swing highs (peaks) in an uptrend. The shaded pink area between them suggests a “double top” pattern (a bearish reversal setup).  
- **Dotted Horizontal Line**: A support/resistance level (or “neckline” for the double top) connecting the lows between the two triangles.  
- **Dotted Vertical Line + “Target” Label**: A projected price target (downward) indicating the expected bearish move after the pattern completes (typically the height of the pattern, measured from the neckline).  


### Purpose:  
The chart illustrates a **double top technical pattern** (two consecutive peaks at similar price levels) to signal a potential trend reversal from bullish to bearish. Traders use this setup to identify entry points for short positions and project profit targets.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43381128698/original/X7RbV_RJHpQM8lHx8qYPotdt-GJbm2z43Q.png?1671726933)

**Описание:** This TradingView chart displays a technical analysis pattern with labeled points (1–5) and a target projection:  

- **Grid Background**: Light gray grid lines for price/time reference.  
- **Pattern Structure**: A red line forms a sequence: Point 1 (bottom-left) → Point 2 (peak) → Point 3 (valley) → Point 4 (higher peak) → Point 5 (rightmost point). The area between Points 2–3–4–5 is shaded pink, indicating a potential pattern (e.g., double top or corrective structure).  
- **Dotted Lines**: A horizontal dotted line connects Points 3–5 (support/resistance), and a vertical dotted line extends downward from Point 5, labeled “Target” (pink box), suggesting a projected price decline.  
- **Labels**: Blue text marks key points (1, 2, 3, 4, 5); the “Target” label (pink) identifies the projected price level.  

This setup likely illustrates a bearish scenario, where the pattern (e.g., a double top) signals a potential downward move to the “Target” level.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43381128776/original/kF-kYkGnXJj1OP6Q-IVDKCles1PuBNIsmA.png?1671726954)

**Описание:** This TradingView chart displays a **candlestick chart** (green = bullish, red = bearish candles) with technical analysis annotations:  

### 1. Chart & Candles  
- **Candlesticks**: Represent price action (open, high, low, close) over time. Green candles show price closed higher than it opened; red candles show price closed lower.  
- **Grid**: Light gray gridlines for price/time reference.  


### 2. Annotations & Shapes  
- **“Top 1” / “Top 2” Labels**: Pink boxes marking potential market peaks (resistance levels).  
- **Pink Triangles**: Two ascending triangles (shaded pink) outline bullish trend phases. The first triangle (left) shows a rally to “Top 1,” followed by a pullback. The second triangle (right) shows a retest of the trend, peaking at “Top 2.”  
- **Dotted Pink Line (Support)**: Horizontal dashed line marking a key support level (price floor) for both triangles.  
- **Dotted Pink Line (Target)**: Vertical dashed line projecting a potential price target (downward) from “Top 2,” indicating a bearish forecast (e.g., a breakdown below support).  


### 3. Purpose of Elements  
- **Triangles**: Highlight bullish trend structures (ascending price action).  
- **Top Labels**: Identify resistance levels (price points where selling pressure may increase).  
- **Support Line**: Marks a critical price level; a break below it could trigger the “Target” (downward price movement).  
- **Target Line**: Suggests a bearish price objective if support fails, guiding trade planning (e.g., short positions).  


This chart uses technical patterns (ascending triangles, support/resistance) to analyze trend direction and potential price targets.


