# Auto Trendlines

**URL:** https://www.tradingview.com/support/solutions/43000741165-auto-trendlines/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Auto Trendlines ](/support/solutions/43000741165-auto-trendlines/) # Auto Trendlines The indicator analyzes the last 5000 bars and builds possible support and resistance lines. These lines are divided into small and large ones depending on which Zig Zag points they are built on: - Large. Consistently connects alternating high and low pivots with left/right length of 25/25. The price difference between low and high must exceed 5 * ATR14, which is calculated in the first point. - Small. Consistently connects alternating high and low pivots with left/right length of 5/5. The price difference between low and high must exceed 2 * ATR14, which is calculated in the first point. A pivot point is a local extremum (minimum or maximum) to the left and right of which there are no price values that exceed this extremum. Thus, a point will be a 25/25 pivot high if there are no high values 25 bars to the left and 25 bars to the right of it that are higher than this value at this point. In addition to pivot points on which Zig Zag is built, the indicator collects pivot points of other sizes to count touches and further filter of lines. After calculating Zig Zags and collecting pivots of different sizes, the indicator builds all possible lines, which will be displayed on the chart after filtering. Each line has a non-displayed touch area on the chart - half of the average default ATR which is calculated at the points on which the line is drawn. The area is located between the line and the price chart and is used for fixing the touches that slightly missed the line, as well as for filtering the lines. Each line is conditionally divided into 2 parts: - Base part. The starting part of a line between the two initial points. - Extend part. The part of the line from the second point to the breakout point or the last available bar. Each constructed line is checked for compliance with the following rules: - There must be a pivot on the base part of each line with the same actual size as the Zig Zag pivots and which may not be a Zig Zag point. - The base part must not have a line touching a pivot of the same actual size as the pivot at the second point of the line. - The base part of a small line must not lie in the touch area of a large line. After filtering, the parameters of each remaining line are calculated and line intersections are processed. Lines are considered to intersect if the base part of one line enters the base part of another line by more than 30% of its length. If lines intersect, one line is selected, which will be displayed on the chart. The parameters by which the best line is selected are as follows: - Number of touches. A touch is a 3/3 pivot point that touches or crosses the line's Touch area. The line with more touches is considered to be the best. - The total length of the line, taking into account the extended part, the longer the better. - The actual size of the pivot at the second point of the line. Small lines are based on 5/5 pivots, but these points can also be larger pivots. The higher the actual size of the pivot at the second point of the line, the better this line is. - Slope angle. This is compared last. The greater the slope angle of the line, the better it is. When all the lines to be displayed on the chart are defined, the indicator determines which of the lines should have extension and which should not. This is determined by the following rule: the extension should not exceed the length of the base part by more than 2 times. If the line complies with this rule, it continues infinitely to the right or to the breakout point, if not, the chart will show only the base part of the line. A breakout is considered to be several consecutive bars with their closing price behind the line. The number of bars is regulated by the input. The default value is 3. Inputs: - Bars to Breakout. Number of bars needed to breakout the line. The default is 3. - Line Size. Defines the size of Zig Zags on which to build lines. Possible values: Small, Large, Both. - Show Pivots. Highlights the pivots on which the lines are drawn. Previous Previous Auto Pitchfork Next Next Average Daily Range (ADR) indicator Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43525428026/original/qbU64TeTpt_gJJ4zHgS0MXJvYfi4Dj5bWg.png?1732533453)

**Описание:** This TradingView chart displays a **candlestick price chart** (green/red vertical bars representing price action) on a grid background, overlaid with two technical analysis trend lines:  

### 1. Candlestick Chart  
- **Candles**: Green (bullish, closing > opening) and red (bearish, closing < opening) bars show price movement over time (open, high, low, close).  
- **Grid**: Light gray lines provide a reference for price/time scaling.  


### 2. Trend Lines  
- **Red Lines**: Upper trend lines (resistance) connect successive price highs, forming a *rising channel* (and a smaller “flag” pattern mid-chart). These indicate potential resistance levels where price may struggle to rise.  
- **Green Lines**: Lower trend lines (support) connect successive price lows, forming a *rising channel* (and a smaller “flag” pattern). These indicate potential support levels where price may find buying interest.  


### Purpose  
The chart analyzes price trends: the rising channel (red upper, green lower) suggests an **uptrend**, with the flag patterns (smaller red/green formations) indicating short-term consolidation before resuming the upward trend. Traders use these lines to identify support/resistance, trend direction, and potential breakout/breakdown zones.  


(Note: No explicit UI buttons are visible in the cropped image, but standard TradingView elements like timeframes, indicators, or drawing tools would typically appear in a full interface.)


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43525428129/original/2JjHhWabiwv05k4rHRqjn9kh2VhxHGzG1g.png?1732533488)

**Описание:** This TradingView image displays a **candlestick chart** (red/green bars representing price action) with a **green ascending trendline** and annotated technical analysis elements:  

### 1. Trendline Components  
- **Base Part**: The leftmost segment of the trendline, anchored to a “Zig Zag Pivot Point” (a swing low where the line is built).  
- **Extend Part**: The middle/right segment of the trendline, also anchored to a “Zig Zag Pivot Point.”  
- **Touch Area**: A shaded region around the trendline, indicating where price has historically interacted with the line.  


### 2. Annotations & Rules  
- **“Zig Zag Pivot Point on which the line is built”**: Marks the swing lows used to construct the trendline (two instances: left and middle).  
- **“No three bars in a row with a close below the line / This is not a breakout, but a touch”**: Explains a rule: A temporary dip (≤3 consecutive bars closing below the line) is a “touch,” not a breakout.  
- **“Breakout”**: A green arrow pointing to a sharp upward move where price clearly breaks above the trendline (confirming a breakout).  


### 3. Chart Purpose  
The image illustrates how to identify valid trendline **breakouts** (vs. temporary “touches”) using swing pivot points and bar-count rules, a common technical analysis concept in TradingView for trend trading.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

