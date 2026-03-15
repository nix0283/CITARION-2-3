# Chart Pattern Elliott Wave

**URL:** https://www.tradingview.com/support/solutions/43000653212-chart-pattern-elliott-wave/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Chart Patterns ](/support/folders/43000587407-chart-patterns/) - / [ Chart Pattern Elliott Wave ](/support/solutions/43000653212-chart-pattern-elliott-wave/) # Chart Pattern Elliott Wave Please know that information about expected waves that have not yet formed in In-Progress mode is not a recommendation as to what you personally should do. Do not take this data as investment advice. It should be used only for education and scientific research. As with any trade, always look first at the result. Elliott Waves are a system of repeating patterns discovered by Ralph Nelson Elliott. Elliott discovered 13 patterns in total, but the 5-3 pattern consisting of 8 waves is considered the basic one. According to Elliott's wave theory, waves are divided into "Motive” and "Corrective”. Motive waves are price movements that coincide with the direction of the main trend, Corrective waves are movements against the main trend. In the screenshot shown above, the motive waves are (1), (3), (5), (a), and (c), and corrective waves are (2), (4), and (b). Also, according to Elliott, any motive wave of the basic model can be represented as five smaller waves, and any corrective wave as a three. Thus, the basic model 5-3 can be represented as 2 waves of a higher wave level and as 34 waves of a lower one. The Chart Pattern Elliott Wave indicator is configured to recognize the most common wave patterns, which are built according to the following rules: Impulse (Motive wave): - Wave structure: 5-3-5-3-5 - Wave 2 does not retrace more than 100% of the length of wave 1 - Wave 3 moves beyond the end of wave 1 - Wave 3 cannot be the shortest among waves 1, 3, and 5 - Wave 4 does not go beyond the level of wave 1 ZigZag (Corrective wave): - Wave structure: 5-3-5 - Wave b is shorter than a - Wave c goes beyond the level of wave a The indicator analyzes the last 600 bars in search of patterns, conditionally dividing them into two levels by nesting (main and sub-waves). The start and end points of the waves in the patterns found are tied to the most suitable pivot points. Then the indicator checks the rules for impulse and zigzag and draws patterns that capture the most amplitude price movements. The following marking is used to indicate the level that the wave belongs to: Main Waves: (1), (2), (3), (4), (5), (a), (b), (c) Sub-waves: 1, 2, 3, 4, 5, a, b, c This marking does not correspond to the historical levels of the Elliott wave theory; it is conditional. It displays the nesting level of the pattern. When the pattern is in the In Progress mode, the indicator builds as many waves as possible based on the pivots, and uses a local extremum (highest high or lowest low) to build the last wave. If that last wave does not complete the pattern, the indicator draws possible projections of the next wave using Fibonacci proportions. Depending on the length of wave 3, wave 5 will be projected either from wave 1 or from the height of the movement of the first three waves. The projections of wave C are constructed from the length of wave A. All other projections are calculated based on the wave preceding them. The minimum number of waves in the in-progress pattern is 3. Alerts: - New Pattern. It is triggered when a new pattern appears on the chart, or when a previously drawn pattern is rebuilt and at the same time the position of two or more points changes. The rebuilding of the very first point of the pattern is not taken into account. - New Potential Wave. It is triggered when a new forming wave is added to a previously found pattern, or when the last formed wave is rebuilt to a new point and becomes forming again. - Wave Formed . It is triggered when any of the forming waves of the pattern are formed. Inputs: - Invert Pattern - This flag allows you to change the direction of the pattern, to search for impulse in a downtrend, and a zigzag in an uptrend. - In Progress - Enables the search for incomplete patterns that are in the process of being formed. - Length type - How the wavelength is calculated when checking the rules of pattern construction: - Absolute - the wavelength is calculated as the price difference between the start and end point of the wave. - Percent - the wavelength is calculated as the percentage change in price between the start and end points of the wave. - Show Projections - Enables possible projections of future waves when in In Progress mode. Important note: When new data is received, the indicator updates and clarifies previously found patterns. Changing any settings of the indicator leads to its complete recalculation. The result may differ from the expected one. Previous Previous Chart Pattern Double Top Next Next Chart Pattern Falling Wedge Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43282992445/original/rBSBOAO7z0NAm11u9j5P0JgRiIDbZ94odQ.png?1640270787)

**Описание:** This TradingView chart displays a **green line graph** on a white grid background, illustrating a sequence of price movements labeled with numbered and lettered points (1–5, a–c). The line forms a series of peaks and troughs, representing a technical analysis pattern (likely an Elliott Wave structure).  

### UI Elements & Purpose:  
- **Grid Background**: Light gray lines for visual reference of price levels and time intervals.  
- **Labeled Points**:  
  - (1), (3), (5), (b): Peaks (local highs).  
  - (2), (4), (a), (c): Troughs (local lows).  
  These labels denote key turning points in the price trend, used to identify wave counts or pattern phases (e.g., impulse waves in Elliott Wave theory).  

### Chart Purpose:  
The chart visualizes price action over time, helping traders analyze trend direction, reversals, and pattern structure (e.g., bullish/bearish phases, corrective waves). The labeled points guide interpretation of market behavior for technical analysis.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43282992516/original/jjF-X0MN1G9GF2kvbk3aFJ73tV2C-g03oA.png?1640270802)

**Описание:** This TradingView chart displays an **Elliott Wave analysis** of a market trend, using color-coded wave structures to illustrate price movements. Here’s a breakdown of key elements:  


### **1. Wave Structure & Color Coding**  
- **Red Lines (I, II)**: Define the *larger-degree trend* (e.g., a bull market’s impulse wave “I” and corrective wave “II”).  
- **Green Lines ((1), (2), (3), (4), (5), (a), (b), (c))**: Represent *intermediate-degree waves* within the larger trend.  
- **Blue Lines (1–5, a–c)**: Show *sub-waves* (e.g., impulse waves 1–5 or corrective a–b–c patterns) within the intermediate waves.  


### **2. Wave Labels & Patterns**  
- **Impulse Waves (1, 3, 5)**: Upward-moving waves (blue) with 5 sub-waves (1–5), indicating trend continuation.  
- **Corrective Waves (2, 4, a, b, c)**: Downward or sideways waves (blue/green) with 3 sub-waves (a–b–c), indicating trend correction.  
- **Larger Trend**: The red “I” (upward) and “II” (downward) suggest a completed bull market impulse (I) followed by a corrective phase (II).  


### **3. UI & Purpose**  
- **Grid Background**: Standard TradingView grid for price/time reference.  
- **Wave Labels**: Numerical (1–5) and alphabetical (a–c) labels identify sub-waves, helping traders analyze trend structure (e.g., “wave 3 of (3)” signals a strong upward move).  


### **Key Takeaway**  
This chart uses Elliott Wave theory to map market cycles: red = major trend, green = intermediate waves, blue = sub-waves. Traders use this to identify trend direction, correction phases, and potential entry/exit points.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

