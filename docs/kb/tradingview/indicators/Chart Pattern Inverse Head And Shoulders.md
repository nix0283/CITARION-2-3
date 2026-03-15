# Chart Pattern Inverse Head And Shoulders

**URL:** https://www.tradingview.com/support/solutions/43000690666-chart-pattern-inverse-head-and-shoulders/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Chart Patterns ](/support/folders/43000587407-chart-patterns/) - / [ Chart Pattern Inverse Head And Shoulders ](/support/solutions/43000690666-chart-pattern-inverse-head-and-shoulders/) # Chart Pattern Inverse Head And Shoulders Please note that the information about expected price targets provided by Auto Chart Patterns isn't a recommendation for what you should personally do. Do not take this data as investment advice. It should only be used for education and research. As with any trade, always look first and then leap. Inverted head and shoulders is a reversal pattern formed by three consecutive lows and two intermediate highs. The first and third lows are called shoulders. They are located approximately at the same level above the second – the head. Also, important is the line drawn along the intermediate highs – the neckline. The pattern is considered completed only when the price, having formed the right shoulder, rises above the neckline. It is expected that further price movement up will be approximately equal to the height of the head. The indicator searches for patterns on the last 600 bars. The pattern consists of lines indicating price movements ( Price Line ) and neck lines ( Neck Line ). The neck line is drawn through intermediate highs and is limited by intersections with price lines. The start and end points of each price line, except for the last one (point 7), are located in 5/5 pivots. A pivot point is a local extremum (minimum or maximum) to the left and right of which there are no price values that exceed this extremum. Thus, a point will be a 5/5 pivot high if there are no high values 5 bars to the left and 5 bars to the right of it that are higher than this value at this point. Point 7 is located at the intersection of the last price line with the neck line. In the In Progress mode, the indicator looks for not only formed, but also emerging patterns. The right shoulder of such a pattern may not be in the pivot, and the price lines forming it will be dotted. The pattern is considered formed when, after the formation of the right shoulder, the price (close) rises above the neckline. The dotted horizontal line that ends with the Target label indicates the expected price level after the pattern has formed. As new bars appear, the line extends to the right until the last bar, until the pattern status changes from Awaiting to another. The label tooltip shows the price and the current status of the pattern. When the status changes, the color of the label also changes. There are 4 statuses in total: - Awaiting . The price did not reach the expected level and did not go below the right shoulder. - Reached . The price reached the expected level. - Failed . The price did not reach the expected level and went below the right shoulder. - Indefinable. The indicator cannot unambiguously determine the status of the patterns. If the indicator finds two intersecting patterns, then preference is given to the one whose status is Awaiting . If the status of the intersecting patterns is Failed or Reached or the status of both is Awaiting , If the status of the intersecting patterns is Failed or Reached or the status of both is Awaiting , then the most obvious pattern will be displayed on the chart. A pattern with the Indefinable status is deleted if it intersects with a pattern that has a different status. Alerts: - New Pattern. It is triggered when a new pattern appears on the chart. A pattern is considered new if it has a different position of the left shoulder, head, or one of the intermediate maxima. - Pattern Formed. It is triggered when, after the appearance of the right shoulder, a bar appears that has closed above the neckline. - Pattern Failed. Triggers when the pattern status changes to failed. Triggers only if the pattern is fully formed. - Target Reached. Triggers when the price reaches the pattern target. Triggers only if the pattern is fully formed. Inputs: - Patterns - Defines which pattern will be drawn depending on its status. Possible values: All, Awaiting and Reached , Only Awaiting, Last Awaiting. If Last Awaiting is selected, only one pattern with the Awaiting status will be displayed, the first point of which is located to the right of all the others. - Price Targets - Defines which price targets will be drawn depending status of the pattern. Possible values: All, Only Awaiting, Awaiting and Reached, None. - Trend Height – Sets the required height of the trend preceding the pattern relative to the height of the head. The height of the head is calculated as the difference between the price value of the pivot, in which the head is located, and the neck lines on the same bar. Percent value. - In Progress – Search for patterns that have not been fully formed yet. Also read: - [How to trade on TradingView](https://www.tradingview.com/support/solutions/43000756695-how-to-trade-on-tradingview/) - [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/) - [The technical analysis essentials](https://www.tradingview.com/support/solutions/43000759577-the-technical-analysis-essentials-with-tradingview/) - [Introduction to fundamental analysis](https://www.tradingview.com/support/solutions/43000759574-introduction-to-fundamental-analysis-on-tradingview/) - [Portfolios: track your assets, know your trades](https://www.tradingview.com/support/solutions/43000760937-tradingview-portfolios-track-your-assets-know-your-trades/) Previous Previous Chart Pattern Head And Shoulders Next Next Chart Pattern Inverted Cup and Handle Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43381164276/original/R1La60RWbTgsZUMou_ZZ2t7IKPZZvOr9pA.png?1671738336)

**Описание:** This TradingView chart displays a **candlestick pattern** (red/green bars) illustrating a **Head and Shoulders (H&S) reversal pattern** (a bullish setup, as price is rising after the pattern). Here’s a breakdown of elements:  


### 1. **Chart Type & Price Action**  
- **Candlesticks**: Red (price decline) and green (price rise) bars show price movements over time.  
- **Trend**: The pattern forms after a prior downtrend, with the H&S structure signaling a potential bullish reversal.  


### 2. **Pattern Labels (Green Boxes)**  
- **Left Shoulder**: The first peak (and subsequent trough) in the pattern, marking the initial swing high/low.  
- **Head**: The lowest trough (deepest valley) of the pattern, forming the “head” of the H&S structure.  
- **Right Shoulder**: The final peak (and trough) mirroring the left shoulder, completing the pattern.  


### 3. **Trendlines & Support/Resistance**  
- **Green Solid Lines**: Connect the pattern’s peaks (shoulders, head) to define the H&S structure.  
- **Green Dashed Line**: A *neckline* (support/resistance) connecting the troughs of the left shoulder, head, and right shoulder. Price breaks above this line to confirm the bullish reversal.  


### 4. **Target Annotation**  
- **Green “Target” Label + Dashed Line**: A projected price level (above the current price) indicating the expected upside move. The target is typically calculated as the height of the H&S pattern (from head trough to neckline) added to the neckline breakout price.  


### 5. **UI & Purpose**  
- **Grid Background**: Helps visualize price levels and pattern symmetry.  
- **Labels/Annotations**: Clearly mark key pattern components (shoulders, head) and the projected target for trading decisions.  


This chart is used to identify a bullish reversal (H&S bottom) and project a price target for long trades, with the neckline breakout confirming the pattern’s validity.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43381164304/original/Ye2pdWHDkx0LoMQddXH2ep43iq3VOlrCSg.png?1671738347)

**Описание:** This TradingView chart displays a **technical analysis pattern** (likely a bullish Elliott Wave or harmonic structure) with the following elements:  

### 1. Chart Structure & Pattern  
- A green line forms a sequence of labeled points (**1–7**) representing price movements:  
  - **1 → 2**: Downward trend (first decline).  
  - **2 → 3**: Upward correction (first rally).  
  - **3 → 4**: Deeper downward trend (second decline).  
  - **4 → 5**: Upward correction (second rally).  
  - **5 → 6**: Downward trend (third decline).  
  - **6 → 7**: Upward trend (final rally).  
- **Shaded green areas** between trend lines (e.g., 2–3, 4–5, 6–7) highlight “correction” or “consolidation” zones.  


### 2. Key UI Elements  
- **“Target” Label (Top-Right)**: A green badge with a dashed green line extending from point 7, indicating a projected price target for the upward move (7 → Target).  
- **Numbered Points (1–7)**: Blue text labels mark critical price levels (highs/lows) in the pattern.  
- **Grid Background**: Light gray grid lines provide visual reference for price levels.  


### 3. Purpose  
The chart illustrates a **bullish price pattern** (e.g., Elliott Wave “impulse” or “ABC” correction) to identify trend direction, support/resistance, and a profit target (via the “Target” label). Traders use this to anticipate future price movements and set entry/exit points.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43381164335/original/xEQ--DzBPFjmLoMjZGIH_wxZot_QijwsVw.png?1671738358)

**Описание:** This TradingView chart displays a **candlestick price chart** (red/green bars) with a technical analysis pattern and annotations:  

### 1. Chart & Pattern  
- **Candlestick Chart**: Red candles = price decline; green candles = price rise.  
- **Head and Shoulders Pattern**: A bullish reversal pattern (green shaded area) with:  
  - *Left Shoulder*: First swing low (labeled).  
  - *Head*: Lowest swing low (labeled).  
  - *Right Shoulder*: Final swing low (labeled).  
  - *Neckline*: Dotted green line connecting the peaks of the shoulders/head (resistance-turned-support).  


### 2. Annotations & Targets  
- **Target**: Green label with a dotted green line extending upward from the neckline. This marks the **profit target** (measured from the neckline to the head’s depth, projected upward).  


### 3. UI Elements (Simplified)  
- **Grid**: Light gray lines for price/time reference.  
- **Labels**: Green boxes with text (“Left Shoulder,” “Head,” “Right Shoulder,” “Target”) to identify pattern components.  


### Purpose  
The chart illustrates a **bullish Head and Shoulders reversal pattern**, where traders anticipate a breakout above the neckline, triggering a long position with a target equal to the pattern’s height (head-to-neckline distance) projected upward.


