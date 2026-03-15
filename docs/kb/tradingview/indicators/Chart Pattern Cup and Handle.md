# Chart Pattern Cup and Handle

**URL:** https://www.tradingview.com/support/solutions/43000732556-chart-pattern-cup-and-handle/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Chart Patterns ](/support/folders/43000587407-chart-patterns/) - / [ Chart Pattern Cup and Handle ](/support/solutions/43000732556-chart-pattern-cup-and-handle/) # Chart Pattern Cup and Handle Please note that the information about expected price targets provided by Auto Chart Patterns is not a recommendation for what you should personally do. Do not take this data as investment advice. It should only be used for education and research. As with any trade, always look first and then leap. Cup and Handle is an indicator that highlights a continuation pattern: a U-shaped correction of the main trend - the cup - and another small corrective movement after the cup, which can also have a U-shape or be represented as a trend line with a downward slope - the handle. The edges of the cup should be approximately at the same level. It is expected that after the breakout of the trend line, the price will go further up by a distance equal to the height of the bowl. The indicator searches for patterns on the last 600 bars. The pattern consists of a line outlining a cup and a line indicating a handle ( Price Line ). Points 1, 3 and 4, as marked in the screenshot, are located on 5/5 pivot points. A pivot point is a local extremum (minimum or maximum) to the left and right of which there are no price values that exceed this extremum. Thus, a point will be a 5/5 pivot high if there are no high values 5 bars to the left and 5 bars to the right of it that are higher than this value at this point. Point 2 is located in the center of the cup and at the price of a lowest low of the 5/5 pivot point, which is located in a small range to the left and right of the center of the cup. The minimum width of the cup is 20 bars, and the handle cannot be longer than the cup. In the In Progress mode , the indicator searches not only for formed patterns, but also for patterns that are still being formed. The last point of such a pattern (point 4) may not be in the pivot point, in this case the handle line will be dotted. When forming the handle, the lowest low values between points 3 and 4 and between point 4 and the end of the handle are taken into account. The low between points 3 and 4 should be higher than the low between point 4 and the end of the handle line. The breakout of the pattern is based on the close value of the symbol. The dotted line that ends with the Target label indicates the expected price level after the pattern is fully formed. As new bars appear, the line extends to the right to the latest bar until the status of the pattern changes from Awaiting to any other. The label's tooltip shows the price and the current status of the pattern. When the status changes, the color of the label changes as well. There are 4 statuses in total: - Awaiting - the handle is not broken through, or it is broken through and at the same time the price has not gone below the threshold value (determined by the Handle Max Rollback input) and has not reached the target yet. - Reached - the price broke through the handle and reached the target. - Failed - the price did not reach the target and went below the threshold value, or the handle became longer than the cup. - Indefinable - the indicator cannot uniquely determine the status of the pattern. If the indicator finds two overlapping patterns, then preference is given to the one with the Awaiting status. If the statuses of the overlapping patterns are Failed or Reached or the status of both is Awaiting , then the chart will display the pattern whose cup shape is closer to the U-shaped one. A pattern with the Indefinable status is deleted if it intersects with a pattern with a different status. Alerts: - New Pattern . It is triggered when a new pattern appears on the chart. A pattern is considered new if it has a different position of point 1, 2 or 3. - Pattern Breakout . It is triggered when a bar appears that has closed above the handle line. - Pattern Failed. Triggers when the pattern status changes to failed. Triggers only if the pattern is fully formed. - Target Reached. Triggers when the price reaches the pattern target. Triggers only if the pattern is fully formed. Inputs: - Patterns - determines which patterns will be displayed on the chart depending on their status. Possible values: All, Awaiting and Reached, Only Awaiting, Last Awaiting. - Price Targets - determines which price targets will be displayed on the chart depending on the status of the pattern. Possible values: All, Only Awaiting, Awaiting and Reached, None. - Permissible Deviation - determines the maximum allowable price difference along the edges of the cup. It is calculated as a percentage of the height of the cup. - Handle Max Rollback - determines the maximum allowable price reduction in the handle, calculated as a percentage of the height of the cup. - Cup Max Rollback - determines the maximum allowable decrease in the price in the cup relative to the previous trend. It is calculated as a percentage of the height of the previous trend. The checkbox enables/disables parameter check and trend search before the pattern. The option is disabled by default. - In Progress - searching for the patterns which are being formed. Previous Previous Chart Pattern Bullish Pennant Next Next Chart Pattern Double Bottom Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43498869803/original/7IeAqLG3J4ORzu1DjkKoT1mEZOQpmFfgXw.png?1721292721)

**Описание:** This TradingView chart displays a **Cup and Handle** technical analysis pattern, used to identify potential bullish reversals. Here’s a detailed breakdown:  


### 1. **Chart Type & Timeframe**  
- **Candlestick Chart**: Red/green candles represent price action (red = bearish, green = bullish).  
- **Timeframe**: Implied as a 15-minute (or similar) chart (from the label “Cup And Handle All All 15”).  


### 2. **Key UI Elements**  
- **Top-Left Label**: `Cup And Handle All All 15 61.8 50`  
  - Identifies the pattern, timeframe, and Fibonacci levels (61.8% retracement, 50% retracement) used in analysis.  
- **Pattern Label**: `Cup And Handle` (pink box, left)  
  - Highlights the identified pattern: a “cup” (U-shaped consolidation) and “handle” (minor pullback) formation.  
- **Target Label**: `Target` (pink box, top-right)  
  - Marks the projected price target for the pattern’s breakout.  


### 3. **Chart Annotations**  
- **Cup and Handle Pattern**:  
  - **Cup**: A U-shaped consolidation (pink shaded area) where price declines, stabilizes, then rises.  
  - **Handle**: A minor pullback (right side of the pattern) before a breakout.  
- **Trend Lines**:  
  - Two pink lines outline the pattern: the “cup” (lower curve) and the “handle” (upper descending line).  
- **Target Line**:  
  - A dashed pink line extends upward from the pattern’s breakout point, indicating the expected price target.  


### 4. **Purpose of Elements**  
- **Candlesticks**: Show open/high/low/close prices for each period.  
- **Pattern & Target Labels**: Guide traders on potential entry (breakout of the handle) and exit (target price).  
- **Fibonacci Levels (61.8/50)**: Suggest retracement levels used to validate the pattern’s structure.  


This chart is used to anticipate a bullish breakout, with the “target” serving as a profit-taking level after the pattern completes.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43498870039/original/dFITxa3IS4OTyPncmREG2KbUH4QcZInnCA.png?1721292790)

**Описание:** This TradingView chart displays a **Cup and Handle** pattern (a technical analysis setup) for a 15-minute candlestick chart. Here’s a detailed breakdown:  


### 1. **Header & Timeframe**  
- Top-left text: *“Cup and Handle All All 15 61.8 50”*  
  - “Cup and Handle”: Indicates the technical pattern being analyzed.  
  - “All All”: Likely refers to “All Symbols” (default watchlist) and “All Timeframes” (or a specific indicator setting).  
  - “15”: Timeframe (15-minute candlesticks).  
  - “61.8, 50”: Fibonacci retracement levels (common in pattern analysis).  


### 2. **Pattern Elements**  
The chart visualizes the *Cup and Handle* structure with labeled points:  
- **Point 1**: Left edge of the “cup” (start of the pattern’s base).  
- **Point 2**: Bottom of the “cup” (the pattern’s trough, where price finds support).  
- **Point 3**: Right edge of the “cup” (peak before the “handle” forms).  
- **Point 4**: Part of the “handle” (a minor retracement after the cup’s peak, before the breakout).  


### 3. **Shaded Region**  
A light pink shaded area spans from Point 1 to Point 3, representing the **“cup”** portion of the pattern (the rounded, U-shaped base).  


### 4. **Handle & Breakout**  
- A blue zigzag line (labeled 3 → 4) shows the **“handle”** (a short retracement after the cup’s peak).  
- A red dashed vertical line extends upward from the handle, with a pink “Target” label. This marks the **projected price target** (where traders expect price to rise after breaking out of the handle).  


### 5. **UI & Navigation**  
- Top-left: A small checkbox (likely for toggling the pattern’s visibility or an indicator).  
- Bottom-left: The TradingView logo (branding).  


### Purpose of the Chart  
This chart is used to identify a *Cup and Handle* pattern, a bullish reversal setup. Traders use it to anticipate a breakout above the “handle” (Point 4) and target the projected price level (dashed line) for profit. The Fibonacci levels (61.8, 50) may guide stop-loss or take-profit placements.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

