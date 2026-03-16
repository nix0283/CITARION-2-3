# Chart Pattern Triple Bottom

**URL:** https://www.tradingview.com/support/solutions/43000690660-chart-pattern-triple-bottom/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Chart Patterns ](/support/folders/43000587407-chart-patterns/) - / [ Chart Pattern Triple Bottom ](/support/solutions/43000690660-chart-pattern-triple-bottom/) # Chart Pattern Triple Bottom Please note that the information about expected price targets provided by Auto Chart Patterns isn't a recommendation for what you should personally do. Do not take this data as investment advice. It should only be used for education and research. As with any trade, always look first and then leap. Triple bottom is a reversal pattern formed by three consecutive lows that are at the same level (a slight difference in price values is allowed) and two intermediate highs between them. It is expected that after the price reaches the third low and then turns around and goes above the level of the intermediate maximum, then further price growth will continue further by about the difference between the highs and lows. The indicator searches for patterns on the last 600 bars. The pattern consists of lines indicating price movements ( Price Line ) and neck lines ( Neck Line ). The neck line is drawn along the highest of the intermediate maxima. The start and end points of each price line, except for the last one (point 7), are located in 5/5 pivots. A pivot point is a local extremum (minimum or maximum) to the left and right of which there are no price values that exceed this extremum. Thus, a point will be a 5/5 pivot high if there are no high values 5 bars to the left and 5 bars to the right of it that are higher than this value at this point. Point 7 is located at the intersection of the last price line with the neck line. In the In Progress mode, the indicator looks for not only formed, but also emerging patterns. The third bottom of such a pattern may not be in the pivot, and the price lines that form it will be dotted. The pattern is considered to be formed when, after the appearance of the third bottom, the price (close) rises above the neck line. The dotted horizontal line that ends with the Target label indicates the expected price level after the pattern has formed. As new bars appear, the line extends to the right until the last bar, until the pattern status changes from Awaiting to another. The label tooltip shows the price and the current status of the pattern. When the status changes, the color of the label also changes. There are 4 statuses in total: - Awaiting . The price did not reach the expected level and did not go below the last bottom. - Reached . The price reached the expected level. - Failed . The price did not reach the expected level and went below the last bottom. - Indefinable. The indicator cannot unambiguously determine the status of the patterns. If the indicator finds two intersecting patterns, then preference is given to the one whose status is Awaiting . If the status of the intersecting patterns is Failed or Reached or the status of both is Awaiting , then the chart will display the pattern with the most similar values of the price of the bottoms, i.e. more accurate. A pattern with the Indefinable status is deleted if it intersects with a pattern that has a different status. Alerts: - New Pattern. It is triggered when a new pattern appears on the chart. A pattern is considered new if it has a different position of the first or second bottom or one of the intermediate maximum. - Pattern Formed. It is triggered when, after the appearance of the third bottom, a bar appears that has closed above the neckline. - Pattern Failed. Triggers when the pattern status changes to failed. Triggers only if the pattern is fully formed. - Target Reached. Triggers when the price reaches the pattern target. Triggers only if the pattern is fully formed. Inputs: - Patterns - Defines which pattern will be drawn depending on its status. Possible values: All, Awaiting and Reached , Only Awaiting, Last Awaiting. If Last Awaiting is selected, only one pattern with the Awaiting status will be displayed, the first point of which is located to the right of all the others. - Price Targets - Defines which price targets will be drawn depending status of the pattern. Possible values: All, Only Awaiting, Awaiting and Reached, None. - Trend Height – Sets the required height of the trend preceding the pattern relative to the height of the pattern itself. The height of the pattern is the difference in the price of the minimum of the bottoms and the maximum of the intermediate highs. Percent value. - In Progress – Search for patterns that have not been fully formed yet. - Bottoms – The maximum allowable difference in the depth of bottoms. The depth of the bottom is calculated from the highest of the intermediate maxima. Percent value. - Intermediate Maxima – The maximum allowable height difference of intermediate maxima. The height of the maximum is calculated from the lowest of the bottoms. Percentage value. Previous Previous Chart Pattern Triangle Next Next Chart Pattern Triple Top Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43381157967/original/J6rGpp5w5_EWX16sGNU86Ykq0OTVEYwSnw.png?1671736009)

**Описание:** This TradingView chart displays a **candlestick price chart** (green/red candles representing price action) with technical analysis annotations:  

### Key UI Elements & Annotations:  
- **Candlesticks**: Green (price up) and red (price down) bars showing open, high, low, close prices for each period.  
- **Purple Triangle Pattern**: A bullish “ascending triangle” (or triple-bottom) structure, with three labeled “Bottom 1/2/3” (purple boxes) marking lows, and a horizontal dashed line (resistance) at the triangle’s top.  
- **“Target” Label**: A purple box with a dashed vertical line projecting a price target above the triangle, indicating a potential breakout upward.  
- **Grid**: Light gray lines for price/time reference.  


### Purpose of Elements:  
- **Candlesticks**: Visualize price movements (trend, volatility).  
- **Triangle/Bottoms**: Identify a bullish reversal pattern (triple bottom) where price tests support 3 times, then breaks resistance.  
- **Target Line**: Suggests a profit target for a long trade (buy) after the breakout.  


The chart is used to analyze a potential bullish reversal, with the triangle pattern signaling a breakout opportunity and the target line estimating profit potential.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43381158011/original/ZGdfQLIyUmROxUhIGE6R57x7Je5Q1Lfb7g.png?1671736024)

**Описание:** This TradingView chart displays a **technical analysis pattern** (likely a bullish reversal or accumulation pattern) with labeled points and a target zone. Here’s a detailed breakdown:  


### 1. **Chart Structure & Pattern**  
The chart uses a grid background (light gray lines) for price/time reference. A purple line traces the pattern, with numbered points (1–7) marking key price levels:  
- **Point 1**: Initial high (start of the pattern).  
- **Points 2, 4, 6**: Successive lows (forming a “W” or “triple bottom” structure).  
- **Points 3, 5**: Intermediate highs (peaks between lows).  
- **Point 7**: Breakout level (where the pattern completes).  


### 2. **Shaded Area (Pattern Zone)**  
A light purple shaded region spans between the horizontal dashed line (resistance) and the lows (2, 4, 6). This represents the **accumulation/basing zone**—where price consolidates before a potential breakout.  


### 3. **Target Annotation**  
A purple “Target” label with a dashed vertical line extends upward from Point 7. This indicates the **projected price target** (e.g., measured move from the pattern’s height) for a bullish breakout.  


### 4. **UI Elements & Purpose**  
- **Numbered Points (1–7)**: Mark critical price levels for pattern recognition (e.g., trend reversals, support/resistance).  
- **Dashed Horizontal Line**: Acts as **resistance** (price struggled to break above this level during consolidation).  
- **Dashed Vertical Line (Target)**: Visualizes the expected price move *after* a breakout (e.g., “measured move” in technical analysis).  


### 5. **Pattern Interpretation**  
The structure (lows at 2/4/6, highs at 3/5) suggests a **bullish reversal pattern** (e.g., triple bottom). Traders use this to anticipate a breakout above resistance (Point 7) and a subsequent rally to the target.  


This chart simplifies pattern analysis, highlighting key levels for entry, stop-loss, and profit targets in technical trading.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43381158029/original/T2Df7me9fPOahB8J1w2KGsZMlpHmqAjU6A.png?1671736034)

**Описание:** This TradingView chart displays a **candlestick price chart** (red/green candles representing price action) with technical analysis annotations:  

### Key UI Elements & Annotations:  
- **Candlestick Chart**: Red candles = price decline; green candles = price increase. Shows price movement over time.  
- **Purple Trendlines**: Connect swing lows to form a **triple bottom pattern** (labeled *Bottom 1, Bottom 2, Bottom 3*), indicating a potential reversal from a downtrend to an uptrend.  
- **Shaded Purple Area**: Highlights the “consolidation range” between the trendlines, where price traded before breaking upward.  
- **Dotted Purple Line (Target)**: Projects a price target above the consolidation range, suggesting a bullish breakout and upward price movement.  
- **Labels**: *Bottom 1/2/3* mark the three lows of the triple bottom pattern; *Target* marks the projected price objective.  


### Purpose:  
The chart analyzes a **triple bottom reversal pattern**—a bullish signal where price forms three distinct lows (support) before breaking above resistance (the upper trendline), with the “Target” estimating the next price level for potential profit.


