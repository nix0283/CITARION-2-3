# Chart Pattern Triple Top

**URL:** https://www.tradingview.com/support/solutions/43000653218-chart-pattern-triple-top/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Chart Patterns ](/support/folders/43000587407-chart-patterns/) - / [ Chart Pattern Triple Top ](/support/solutions/43000653218-chart-pattern-triple-top/) # Chart Pattern Triple Top Please note that the information about expected price targets provided by Auto Chart Patterns isn't a recommendation for what you should personally do. Do not take this data as investment advice. It should only be used for education and research. As with any trade, always look first and then leap. Triple Top is a reversal pattern formed by three consecutive highs that are at the same level (a slight difference in price values is allowed) and two intermediate lows between them. It is expected that after the price reaches the third high and then falls below the level of the intermediate low, then the fall will continue further by about the difference between the highs and lows. The indicator searches for patterns on the last 600 bars. The pattern consists of lines indicating price movements ( Price Line ) and neck lines ( Neck Line ). The neck line is drawn along the smallest of the intermediate lows. The start and end points of each price line, except for the last one (point 7), are located in 5/5 pivots. A pivot point is a local extremum (minimum or maximum) to the left and right of which there are no price values that exceed this extremum. Thus, a point will be a 5/5 pivot high if there are no high values 5 bars to the left and 5 bars to the right of it that are higher than this value at this point. Point 7 is located at the intersection of the last price line with the neck line. In the In Progress mode, the indicator looks for not only formed, but also emerging patterns. The third peak of such a pattern may not be in the pivot, and the price lines that form it will be dotted. The pattern is considered formed when, after the appearance of the third peak, the price (close) falls below the neckline. The dotted horizontal line that ends with the Target label indicates the expected price level after the pattern has formed. As new bars appear, the line extends to the right until the last bar, until the pattern status changes from Awaiting to another. The label tooltip shows the price and the current status of the pattern. When the status changes, the color of the label also changes. There are 4 statuses in total: - Awaiting . The price did not reach the expected level and did not go above the last top. - Reached . The price reached the expected level. - Failed . The price did not reach the expected level and went above the last top. - Indefinable. The indicator cannot unambiguously determine the status of the patterns. If the indicator finds two intersecting patterns, then preference is given to the one whose status is Awaiting . If the status of the intersecting patterns is Failed or Reached or the status of both is Awaiting , then the chart will display the pattern whose vertex prices values are most similar, i.e. more accurate. A pattern with the Indefinable status is deleted if it intersects with a pattern that has a different status. Alerts: - New Pattern. It is triggered when a new pattern appears on the chart. A pattern is considered new if it has a different position of the first or second top or one of the intermediate minima. - Pattern Formed. It is triggered when, after the appearance of the third top, a bar appears that has closed below the neckline. - Pattern Failed. Triggers when the pattern status changes to failed. Triggers only if the pattern is fully formed. - Target Reached. Triggers when the price reaches the pattern target. Triggers only if the pattern is fully formed. Inputs: - Patterns - Defines which pattern will be drawn depending on its status. Possible values: All, Awaiting and Reached , Only Awaiting, Last Awaiting. If Last Awaiting is selected, only one pattern with the Awaiting status will be displayed, the first point of which is located to the right of all the others. - Price Targets - Defines which price targets will be drawn depending status of the pattern. Possible values: All, Only Awaiting, Awaiting and Reached, None. - Trend Height – Sets the required height of the trend preceding the pattern relative to the height of the pattern itself. The height of the pattern is the difference in price between the maximum of the tops and the minimum of the intermediate lows. Percent value. - In Progress – Search for patterns that have not been fully formed yet. - Tops – The maximum allowable difference in tops heights. The height of the top is calculated from the minimum of the intermediate lows. Percent value. - Intermediate Minima – The maximum allowable difference in the depth of intermediate minima. The depth of the minimum is measured from the highest of the peaks. Percent value. Previous Previous Chart Pattern Triple Bottom Next Next Gaps Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43381130948/original/eMXllBNMI7PtE-uhDQc-11LzptMLv2bsXQ.png?1671727508)

**Описание:** This TradingView image displays a **candlestick chart** (green = bullish, red = bearish candles) with technical analysis annotations:  

### 1. Chart & Candlesticks  
- **Candlesticks**: Represent price action (open, high, low, close) over time. Green candles show upward price movement; red candles show downward movement.  
- **Grid**: Light gray grid lines for price/time reference.  


### 2. Key Annotations & Lines  
- **Trendline (Pink Solid Line)**: A rising trendline (support) drawn along the lows of the upward price movement, indicating an uptrend.  
- **Pink Shaded Area**: A “trading range” or “consolidation zone” between three peaks (“Top 1,” “Top 2,” “Top 3”) and a dashed horizontal support line (below the peaks).  
- **Dashed Horizontal Line**: A key support level (likely a “breakout” or “breakdown” threshold) within the pink shaded area.  
- **Dashed Vertical Line (Target)**: A projected price target (downward) after a potential breakdown below the dashed support line, indicating a bearish forecast.  


### 3. Labels  
- **Top 1, Top 2, Top 3**: Mark the three peaks of the pink shaded area (resistance levels).  
- **Target**: Labels the projected price level (downward) if price breaks below the dashed support line, signaling a bearish trade setup.  


### Purpose  
The chart illustrates a **potential bearish scenario**: After an uptrend (trendline), price consolidates in a range (pink area) between resistance (peaks) and support (dashed line). A breakdown below support would trigger a sell signal, with the “Target” as the profit-taking level.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43381131064/original/zDTzdfy9kb7WMlY6Rf20EydIp6IaZAqxFw.png?1671727533)

**Описание:** This TradingView chart displays a technical analysis pattern with the following elements:  

### **Chart & Price Action**  
- A red line traces price movement from point **1** (bottom-left) upward to **2**, then downward to **3**, upward to **4**, downward to **5**, upward to **6**, and finally downward to **7**.  
- **Pink shaded areas** highlight three ascending triangles (between 2–3, 4–5, 6–7), indicating consolidation phases after upward moves.  


### **Labels & Annotations**  
- **Numbered Points (1–7)**: Blue text marks key price levels (1 = start, 2/4/6 = peaks, 3/5/7 = troughs).  
- **Dotted Horizontal Line**: Connects troughs 3, 5, and 7, serving as a **support level** (a key resistance/support boundary for the pattern).  
- **“Target” Annotation**: A red label with a dashed vertical line from 7 downward, indicating a projected price target (likely a bearish breakout target if price falls below support).  


### **UI & Purpose**  
- **Grid Background**: Light gray grid aids in visualizing price levels and pattern symmetry.  
- **Color Coding**: Red for price action, pink for pattern shading, blue for labels, and red for the target annotation.  

This chart illustrates a **triple top** or **ascending triangle breakdown** pattern, used to identify potential trend reversals (e.g., a bearish move after the final peak at 6, with 7 as a breakout point and the “Target” as a profit-taking level).


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43381131122/original/voZfON53u0p1kfcn8ggHzIK3FX5aUm25VQ.png?1671727545)

**Описание:** This TradingView chart displays a **candlestick chart** (green/red candles representing price action) with technical analysis annotations:  

### 1. Chart & Price Action  
- **Candlesticks**: Green (bullish, closing > opening) and red (bearish, closing < opening) bars show price movements over time.  
- **Trend Line**: A solid pink line marks a prior **uptrend** (ascending slope, connecting lower price lows).  


### 2. Key Annotations  
- **Top 1, Top 2, Top 3**: Pink labels mark three consecutive **swing highs** (peaks) in a potential **distribution phase** (price consolidating after an uptrend).  
- **Pink Shaded Area**: A polygon (dotted outline) highlights a **trading range** (consolidation zone) between the three tops and a lower support level (dotted horizontal line).  
- **Target**: A pink label with a dotted arrow points to a projected **price target** (likely a bearish breakout target, below the consolidation range).  


### 3. UI & Purpose  
- The chart is designed for **technical analysis**, focusing on trend reversal (from uptrend to potential downtrend) via:  
  - Identifying swing highs (Top 1–3) to spot a “topping pattern.”  
  - Using the shaded range to define support/resistance.  
  - Projecting a “Target” for a bearish trade (e.g., short position) if price breaks below the range.  


This setup suggests a bearish bias, with the target indicating a projected price drop after a breakout of the consolidation range.


