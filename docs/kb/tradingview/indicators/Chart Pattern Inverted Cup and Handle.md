# Chart Pattern Inverted Cup and Handle

**URL:** https://www.tradingview.com/support/solutions/43000732559-chart-pattern-inverted-cup-and-handle/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Chart Patterns ](/support/folders/43000587407-chart-patterns/) - / [ Chart Pattern Inverted Cup and Handle ](/support/solutions/43000732559-chart-pattern-inverted-cup-and-handle/) # Chart Pattern Inverted Cup and Handle Please note that the information about expected price targets provided by Auto Chart Patterns is not a recommendation for what you should personally do. Do not take this data as investment advice. It should only be used for education and research. As with any trade, always look first and then leap. Inverted Cup and Handle is an indicator that highlights a continuation pattern: a U-shaped correction of the main trend - the cup - and another small corrective movement after the cup, which can also have a U-shape or be represented as a trend line with a [](https://jira.xtools.tv/browse/JV-4819)upward slope - the handle. The edges of the cup should be approximately at the same level. It is expected that after the breakout of the trend line, the price will go further down by a distance equal to the height of the bowl. The indicator searches for patterns on the last 600 bars. The pattern consists of a line outlining a cup and a line indicating a handle ( Price Line ). Points 1, 3 and 4, as marked in the screenshot, are located on 5/5 pivot points. A pivot point is a local extremum (minimum or maximum) to the left and right of which there are no price values that exceed this extremum. Thus, a point will be a 5/5 pivot high if there are no high values 5 bars to the left and 5 bars to the right of it that are higher than this value at this point. Point 2 is located in the center of the cup and at the price of a highest high of the 5/5 pivot point, which is located in a small range to the left and right of the center of the cup. The minimum width of the cup is 20 bars, and the handle cannot be longer than the cup. In the In Progress mode, the indicator searches not only for formed patterns, but also for patterns that are still being formed. The last point of such a pattern (point 4) may not be in the pivot point, in this case the handle line will be dotted. When forming the handle, the highest high values between points 3 and 4 and between point 4 and the end of the handle are taken into account. The high between points 3 and 4 should be lower than the high between point 4 and the end of the handle line. The breakout of the pattern is based on the close value of the symbol. The dotted line that ends with the Target label indicates the expected price level after the pattern is fully formed. As new bars appear, the line extends to the right to the latest bar until the status of the pattern changes from Awaiting to any other. The label’s tooltip shows the price and the current status of the pattern. When the status changes, the color of the label also changes. There are 4 statuses in total: - Awaiting - the handle is not broken through, or it is broken through and at the same time the price has not gone above the threshold value (determined by the Handle Max Rollback input) and has not reached the target yet. - Reached - the price broke through the handle and reached the target. - Failed - the price did not reach the target and went above the threshold value, or the handle became longer than the cup. - Indefinable - the indicator cannot uniquely determine the status of the pattern. If the indicator finds two overlapping patterns, then preference is given to the one with the Awaiting status. If the statuses of the overlapping patterns are Failed or Reached or the status of both is Awaiting , then the chart will display the pattern whose cup shape is closer to the U-shaped one. A pattern with the Indefinable status is deleted if it intersects with a pattern with a different status. Alerts: - New Pattern . It is triggered when a new pattern appears on the chart. A pattern is considered new if it has a different position of point 1, 2 or 3. - Pattern Breakout . It is triggered when a bar appears that has closed below the handle line. - Pattern Failed. Triggers when the pattern status changes to failed. Triggers only if the pattern is fully formed. - Target Reached. Triggers when the price reaches the pattern target. Triggers only if the pattern is fully formed. Inputs: - Patterns - determines which patterns will be displayed on the chart depending on their status. Possible values: All, Awaiting and Reached, Only Awaiting, Last Awaiting. - Price Targets - determines which price targets will be displayed on the chart depending on the status of the pattern. Possible values: All, Only Awaiting, Awaiting and Reached, None. - Permissible Deviation - determines the maximum allowable price difference along the edges of the cup. It is calculated as a percentage of the height of the cup. - Handle Max Rollback - determines the maximum allowable price increase in the handle, calculated as a percentage of the height of the cup. - Cup Max Rollback - determines the maximum allowable price increase in the cup relative to the previous trend. It is calculated as a percentage of the height of the previous trend. The checkbox enables/disables parameter check and trend search before building a pattern. The option is disabled by default. - In Progress - searching for the patterns which are being formed. Previous Previous Chart Pattern Inverse Head And Shoulders Next Next Chart Pattern Rectangle Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43498887500/original/iw8Q5mRndr5-e1NRiWu7Y8rclqtCvKlzkg.png?1721297109)

**Описание:** This TradingView chart displays a **candlestick price chart** with a technical analysis pattern labeled \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43498887607/original/CCaEcjnu3aKW9QvRw0rTybccPvCmssBl_Q.png?1721297142)

**Описание:** This TradingView chart illustrates the **Cup and Handle** technical pattern, a bullish reversal setup. Here’s a detailed breakdown:  


### **Header & Title**  
- **Title**: “Cup And Handle All All 15 61.8 50” – Indicates the pattern type, timeframes (likely 15-minute), and Fibonacci levels (61.8%, 50%) used for analysis.  
- **Checkbox (Top-Left)**: A toggle (unchecked) for enabling/disabling the pattern’s visibility or related indicators.  


### **Chart Elements**  
- **Cup Shape**: A large, light-green shaded semicircle (labeled “2” at the peak) representing the “cup” phase—price rises to a high, then corrects, forming a rounded bottom.  
- **Handle**: A smaller, right-side pattern (labeled “3” for the low, “4” for the breakout) where price dips briefly before resuming an upward trend.  
- **Price Action**: A blue zigzag line shows price movement: rising to the cup’s peak (2), falling to the cup’s low (1), forming the handle (3→4), and then breaking upward.  


### **Labels & Annotations**  
- **Numbers (1–4)**: Mark key points:  
  - 1: Cup’s left low (start of the cup).  
  - 2: Cup’s peak (resistance level).  
  - 3: Handle’s low (support level).  
  - 4: Handle’s breakout (entry point for long trades).  
- **“Target” (Green Box)**: A dashed green line projects the expected price target (measured from the cup’s depth, e.g., from 1→2, projected upward from 4).  


### **UI & Purpose**  
- **Grid Background**: Light gray gridlines aid in price/time alignment.  
- **TradingView Logo (Bottom-Left)**: Branding.  
- **Pattern Logic**: The Cup and Handle signals a bullish reversal—traders enter long at the handle’s breakout (4) with a target equal to the cup’s height (from 1→2).  


This chart visually teaches how to identify and trade the Cup and Handle pattern, emphasizing key levels (support/resistance) and profit targets.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

