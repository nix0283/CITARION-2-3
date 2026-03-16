# Volume footprint charts: a complete guide

**URL:** https://www.tradingview.com/support/solutions/43000726164-volume-footprint-charts-a-complete-guide/

---

- [ Help Center ](/) - / - / Chart - / [ Learn more about chart types ](/support/folders/43000547460-learn-more-about-chart-types/) - / [ Volume footprint charts: a complete guide ](/support/solutions/43000726164-volume-footprint-charts-a-complete-guide/) # Volume footprint charts: a complete guide A volume footprint is a powerful [Supercharts](https://www.tradingview.com/chart/)' tool that visualizes the distribution of trading volume across multiple price levels for each candle on a specified timeframe, providing you with additional information to help identify areas of high liquidity or significant trading activity. **CONTENTS:** - [What is a volume footprint chart](#What-is-a-volume-footprint-chart) - [Calculation](#Calculation) [Volume data source](#Volume-data-source) - [Volume categorization](#Volume-categorization) - [Imbalance detection](#Imbalance-detection) - [Interpretation](#Interpretation) [Order flow](#Order-flow) - [Failed auction](#Failed-auction) - [Delta divergence](#Delta-divergence) - [Excess trades at extreme price levels](#Excess-trades-at-extreme-price-levels) - [Alerts](#Alerts) [Important notes on interpretation](#Important-notes-on-interpretation) - [Settings](#Settings) [Candles](#Candles) - [Volume footprint](#Volume-footprint) - [Labels](#Labels) - [Imbalance](#Imbalance) - [Volume footprint in a nutshell](#Volume-footprint-in-a-nutshell) What is a volume footprint chart By default, this chart type displays the distribution of seller volume to the left of each candle and buyer volume to the right, with optional gradient colors that indicate the relative intensity of the volume at each level. It places vertical lines beside levels in the distributions to highlight significant areas of imbalance. Additionally, it shows each bar's Value Area (VA) and Point of Control (POC), and displays volume delta and total volume information below each candle. Calculation Volume data source This chart type retrieves a symbol's volume data from multiple intrabar intervals (intervals lower than the chart's) for its historical calculations. The interval gradually increases as available historical data becomes exhausted, starting with the lowest available interval. In other words, the deeper into the chart's history you go, the higher the intrabar interval of the volume data. The footprints for the chart's recent candles are the most precise since they use the most granular information in their calculations. The chart requests intrabar data based on its main timeframe: - Intraday timeframes: 1 tick (for professional plans) → 1 second → 1 minute → 60 minutes. - Daily charts: 1 minute → 60 minutes. - Weekly and Monthly charts: 60 minutes. The highest intrabar interval used for historical footprint calculations depends on the selected chart timeframe. Volume categorization The volume footprint chart categorizes volume as "buy" or "sell" based on the direction of intrabar price movements. It uses the following algorithm to determine the category of each volume value: - If the intrabar's closing price exceeds its opening price, it assigns the volume to the "buy" category - If the intrabar's closing price is below its opening price, it assigns the volume to the "sell" category - If the closing price equals the opening price: The volume will belong to the "buy" category if the current intrabar's close exceeds the previous intrabar's close - The volume will belong to the "sell" category if the current intrabar's close is below the previous intrabar's close - The volume will belong to the same category as the previous intrabar if their closing prices are equal The chart accumulates the categorized volume across the lower intervals at different price levels to construct the footprint representation. Imbalance detection A balanced market occurs when there's equilibrium between supply and demand, typically resulting in relatively stable prices. In contrast, an imbalanced market occurs when there is a significant disparity between supply and demand, often leading to more substantial price movements. The volume footprint chart detects a buy imbalance when the "buy" volume at a price level exceeds the "sell" volume at the level below by a specified percentage. Similarly, it detects a sell imbalance when the "sell" volume at a level exceeds the "buy" volume at the level above by that percentage. Users can control the percentage by which the "buy" volume must exceed the "sell" volume, or vice versa, to detect an imbalance through the "Imbalance" input in the chart's settings. By default, this value is 300% (i.e., the volume of one side must be three times larger than the other). When it detects a "buy" imbalance, the chart will display a vertical line to the right of the corresponding price level. When a "sell" imbalance occurs, a vertical line will appear to the left of the level. In the given example, a sequential comparison of volumes at different levels is carried out. For each comparison, the assessment determines whether the larger volume of the pair exceeds the specified imbalance threshold, according to the formula: max(buy, sell) ≥ (imbalance percentage / 100) * min(buy, sell). The initial calculation is as follows: 506.37 ("buy") ≥ (300 / 100) * 166.433 ("sell"). This statement is true, indicating a buy imbalance. Subsequent comparisons follow the same logic: "buy" level 3 is compared with "sell" level 2, and "buy" level 4 with "sell" level 3. Traders often analyze volume footprints to identify balance and imbalance within the market. When a market is balanced, a volume footprint may show evenly distributed trading volume across various price levels, suggesting stability and equilibrium. Conversely, when in an imbalanced state, a volume footprint may reveal clusters of elevated trading activity at specific levels, indicating areas of supply or demand disparity and potential price trends. Interpretation Order flow During the order execution process, market participants engage in a search for price equilibrium that will satisfy both buyers and sellers, thus driving transactions. The directed volume of each transaction determines its contribution to a market's buying or selling pressure. When supply surpasses demand, downward price movement may occur as the market moves toward more equitable prices for buyers. Conversely, when the demand for an asset exceeds its supply, prices may rise until enough participants are willing to sell. Analyzing the concentration of buying and selling activity across price levels with the volume footprint chart can provide deeper insight into the dominance of buyers and sellers, the balance or imbalance between supply and demand, and areas of elevated liquidity (i.e., areas with a greater abundance of trading activity). Traders can utilize such insights to gauge market sentiment and identify trading opportunities. Failed auction In Auction Market Theory, a failed auction is a pattern in which the market fails to establish a new price for an instrument, resulting in a return to previous prices. Traders conventionally analyze failed auctions with tools such as "Market Profile," but they can also identify instances of such patterns using footprints. A failed auction typically occurs when one side of the market, either buyers or sellers, fails to attract enough participation to sustain trading activity at a price level, potentially leading to a rapid price reversal as market participants reassess and adjust their positions. Failed auctions often coincide with heightened volatility, and they can indicate potential key turning points in the market. Traders and analysts often pay close attention to failed auctions, as they can provide valuable insights into market dynamics and trading opportunities. Identifying failed auction states can help traders identify support and resistance levels and anticipate potential reversal patterns. The example below demonstrates a case where prices moved successively higher with each bar while buyer volume gradually decreased. On the fourth bar in the image, the imbalance between sellers and buyers reached a point where buyers could not push the price further upward, and the price rebounded downward. You can interpret this area of imbalance as a possible resistance level. If prices break through this level in the future, it might suggest a growing trend. Delta divergence Delta divergence in volume footprints refers to a discrepancy or disagreement between price movement and volume delta. Positive delta divergence occurs when prices successively move downward while the volume delta rises, possibly even turning positive. Conversely, negative delta divergence occurs when prices successively rise while the volume delta falls or even becomes negative. These divergence patterns often suggest that, despite the current price action, the underlying buying or selling pressure is diminishing, potentially signaling the weakening or reversal of the current trend. The example below shows four falling bars, two of which have a positive delta. In other words, those bars exhibit positive delta divergence. Traders often analyze delta divergence in footprint charts to help them anticipate potential reversals or changes in market direction. However, it's essential to consider other factors and utilize additional tools to help validate divergences and make informed trading decisions. Excess trades at extreme price levels In Auction Market Theory, the market price rises until demand is exhausted and falls until supply is exhausted. This exhaustive movement represents a complete auction. On a footprint chart, this situation appears as zero or minimal purchases at the low price level or minimal sales at the high price level. In some cases, a situation referred to as an incomplete auction may arise, where the difference between buying and selling volume at the high or low levels differs only slightly relative to the differences at previous levels. This condition may indicate that price exploration is incomplete, and there may still be interested market participants above the current highs or below the current lows. In essence, this pattern might indicate that the market price may continue its directional movement beyond the current range until the auction is complete. Alerts You can create alerts on Volume Footprint charts — allowing you to get notified when important order flow events occur directly on your footprint chart. The following alert conditions are currently available: - Buy imbalance is stacked — triggered when multiple consecutive buy imbalances appear at consecutive price levels. Default alert message: “A new buy imbalance has stacked up across multiple levels!” - New buy imbalance — triggered when a new single buy imbalance is detected at any price level. Default alert message: “A new buy imbalance was found.” - New sell imbalance — triggered when a new single sell imbalance is detected. Default alert message: “A new sell imbalance was found.” - Sell imbalance is stacked — triggered when multiple consecutive sell imbalances appear at consecutive price levels. Default alert message: “A new sell imbalance has stacked up across multiple levels!” In addition to imbalance-based alerts, you can also set alerts on Volume Delta, Total Buy Volume, and Total Sell Volume. These conditions support the full range of alert operators, including: Comparison operators: - Crossing, Crossing Up, Crossing Down - Greater Than, Less Than Channel-based operators: - Entering Channel, Exiting Channel - Inside Channel, Outside Channel Movement-based operators: - Moving Up, Moving Down - Moving Up %, Moving Down % This functionality is fully integrated into existing alert infrastructure, enabling the use of all related features. This flexibility allows you to track not only imbalance formations, but also key changes in total order flow — for example, when delta crosses above zero, or when buy volume exceeds a threshold that signals aggressive accumulation. These alerts help traders track emerging supply and demand imbalances in real time. By combining imbalance alerts with footprint visualization, you can quickly spot moments when aggressive buyers or sellers begin to dominate the market — often signaling potential shifts in market direction or upcoming volatility. Important notes on interpretation When interpreting alert results for Volume Footprints, keep in mind that this study is repainting by design. In real time, the chart may use one intrabar data source (e.g., 1T) for calculations, while the same bar may later be recalculated using a less granular interval (e.g., 1S) as more historical data becomes available. This means that the appearance of imbalances — and therefore alert triggers — can differ slightly between real-time execution and historical review. In addition, when using Row size = ATR, the chart automatically derives the number of Ticks per row from the current ATR value. For consistent comparison between alert signals and chart visuals, it is recommended to manually set Ticks per row to the same value and to configure alerts with manual row sizing whenever possible. For more information about repainting behavior and how it may affect script calculations, see article about [Repainting](https://www.tradingview.com/support/solutions/43000478429/) Settings Customization options for the volume footprint chart are available from the chart settings, which you can access from the gear button in the toolbar above the chart. Candles The settings in the "Candles" section are identical to those for a regular candlestick chart. From this section, you can configure the appearance of the candlesticks. Volume footprint Row size Controls how the chart will determine the size of each footprint row (level). There are two options to choose from: - The "Auto" option specifies that the chart will calculate the size automatically based on the data's latest normalized Average True Range (ATR) value. It uses the formula: 0.2 * NormalizedATR . The chart recalculates the size when selecting the "Volume footprint" chart type or changing the symbol or timeframe. When using this option, the input below specifies the length of the ATR calculation - The "Manual" option specifies that the chart will utilize the number of ticks specified in the "Ticks per row" input below ATR length Specifies the smoothing length for the Average True Range used to calculate the number of ticks per footprint row when the "Row size" input uses the "Auto" option. Ticks per Row Specifies the number of ticks per footprint row when the "Row size" input uses the "Manual" option. Display Specifies the display type of the chart. In Cluster mode, all cells have the same width. In Profile mode, the width of each cell is proportional to the trading volume at that level, offering a clearer, more dynamic representation. Type Defines the display mode of the footprints on the chart. Four options are available: - The "Buy and Sell" option (default) displays seller volume across levels to the left of each candle and buyer volume to the right - The "Delta" option will display one column to the right of each bar that shows the volume delta (i.e., the difference between buyer and seller volume) for each level - The "Total" option will display one column to the right of each bar that shows the total volume at each price level - The "Ladder" option will highlight with color the highest volume at each price level Apply gradient to background If enabled, the color of the background of each footprint level will differ based on its volume compared to the volume at other levels. The chart uses the following algorithm to calculate the gradient colors: - Determine the maximum and minimum volume - Calculate the volume range, i.e., the difference between the maximum and minimum volume value - Subtract the minimum volume from the current level's volume - Calculate the ratio of the value obtained in step 3 to the volume range obtained in step 2 - Use the ratio from step 4 to select a color from the available options: Select the first color if the ratio is less than 0.25 - Select the second color if the ratio is greater than or equal to 0.25 and less than 0.5 - Select the third color if the ratio is greater than or equal to 0.5 and less than 0.75 - Select the fourth color if the ratio is greater than or equal to 0.75 - Repeat steps 3 through 5 for each price level When the footprint type is "Buy and sell" or "Delta," the chart calculates the gradients for the buy and sell sides separately. Background These inputs specify the background colors used by the footprint levels. Users can choose separate colors for buy and sell sides when the footprint type is "Buy and sell" or "Delta". If the "Apply gradient to background" option is enabled, a four-color gradient will be available for each color option. The chart will select colors for each level using the algorithm described in the previous section. Value area Enables Value Area (VA) lines and specifies the VA percentage. The Value Area High (VAH) line will appear above all levels included in the Value Area, and the Value Area Low (VAL) line will appear below all levels in the Value Area. The volume footprint chart's Value Area algorithm is similar to the algorithm used by our Volume Profile indicators. Labels POC Determines whether the chart will display each footprint's Point of Control (POC). Show summary info Determines whether each footprint displays detailed information. There are two available modes: - Info Box (default) — Displays a compact information box below each footprint, showing the total volume, total buy and sell volume, and overall volume delta. - Table — When selected, creates an additional pane below the Footprint chart. This pane provides extended data for each footprint calculation. Use the dropdown menu to choose which parameters to display: Volume — Total traded volume for the bar. - Volume change, % — Percentage change in volume compared to the previous bar. - Buy volume — Total volume of all buy trades within the bar. - Buy volume, % — Percentage of buy volume relative to the total bar volume. - Sell volume — Total volume of all sell trades within the bar. - Sell volume, % — Percentage of sell volume relative to the total bar volume. - Delta — The difference between buy and sell volume for the bar. - Delta, % — Delta expressed as a percentage of total volume (Delta / Volume × 100). - Min delta — The minimum delta value recorded within the bar. - Max delta — The maximum delta value recorded within the bar. - Session CVD — Cumulative volume delta, calculated and reset once per day (fixed 1D period). - POC — Point of control of the footprint. - HL range — The price range of the bar, calculated as High – Low. - Open interest high — only for futures — The highest open interest value within the bar (available for futures only). - Open interest low — only for futures — The lowest open interest value within the bar (available for futures only) Imbalance Specifies the percentage by which buyer volume must exceed seller volume, or vice versa, to detect a significant imbalance. See the "Imbalance detection" section above to learn how the volume footprint chart detects imbalances. Highlighting Determines whether the chart will highlight imbalanced price levels and specifies the colors. When imbalance highlights are enabled, the chart places colored vertical lines to the sides of significantly imbalanced levels. The chart displays buy imbalance markers to the right of the levels and sell imbalance markers to the left. Stacked levels Controls whether to display stacked imbalances and the number of required consecutive levels with an imbalance on the same side to detect a stacked imbalance. When enabled, the chart projects stacked imbalances until subsequent prices intersect the levels. Volume footprint in a nutshell A volume footprint chart is a powerful trading tool that displays the distribution of buying and selling volume at each price level within individual candles on your chart. Unlike traditional charts that only show price movement, volume footprints reveal the underlying battle between buyers and sellers by categorizing volume based on whether prices moved up or down during smaller timeframes. The chart displays seller volume on the left side of each candle and buyer volume on the right, with gradient colors and vertical lines highlighting areas of significant imbalance where one side overwhelmingly dominates the other. This detailed volume analysis helps traders identify key market dynamics such as failed auctions, delta divergence, and areas of high liquidity that traditional price charts miss. By examining where the most trading activity occurs (Point of Control) and detecting imbalances between supply and demand, traders can better understand market sentiment, spot potential support and resistance levels, and anticipate price reversals or continuations. The footprint essentially transforms volume data into a visual roadmap of market behavior, making it easier to time entries and exits based on actual trading activity rather than just price movement alone. Also read: - [The technical analysis essentials](https://www.tradingview.com/support/solutions/43000759577-the-technical-analysis-essentials-with-tradingview/) - [Introduction to TradingView alerts](https://www.tradingview.com/support/solutions/43000520149-introduction-to-tradingview-alerts/) - [Chart types available on TradingView](https://www.tradingview.com/support/solutions/43000703407-chart-types-available-on-tradingview/) - [Indicators: simple steps to get started](https://www.tradingview.com/support/solutions/43000543626-tradingview-indicators-simple-steps-to-get-started/) - [Drawing tools available on TradingView](https://www.tradingview.com/support/solutions/43000703396-drawing-tools-available-on-tradingview/) Previous Previous What are high-low charts Next Next Time Price Opportunity charts explained Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43481035650/original/7jWofOedIHQDMLJ1GC-W6HQL9nUIQ6zy8Q.png?1713798415)

**Описание:** This TradingView image displays a **Volume Profile (Market Profile) chart** for the stock **TSLA (Tesla)** on the NASDAQ exchange, using a 15-minute time frame. Here’s a detailed breakdown of all elements:  


### **1. Header & Ticker Info**  
- **Ticker & Exchange**: `TSLA 15 · NASDAQ` (Tesla, 15-minute candlestick, NASDAQ).  
- **Price Metrics**:  
  - `O 165.37` (Open), `H 165.45` (High), `L 165.35` (Low), `C 165.44` (Close).  
  - `+0.07 (+0.04%)` (Daily change: +$0.07, +0.04%).  
- **Price Boxes**:  
  - Red box: `165.44` (current price, with `+0.01` change).  
  - Blue box: `165.45` (high of the period).  
- **Currency**: `USD` (dropdown, top-right).  


### **2. Main Chart (Volume Profile)**  
The chart visualizes **price levels (y-axis)** vs. **time (x-axis, 15:45 to 10:30)**, with vertical “volume bars” (color-coded) representing trading activity at each price.  

- **Color Coding**:  
  - **Red bars**: Selling pressure (more volume at a price level).  
  - **Green bars**: Buying pressure (more volume at a price level).  
  - **Black bars**: Highest volume (key support/resistance levels).  
- **Volume Labels**: Each bar shows volume (e.g., `6.953K`, `4.861K`), with “K” = thousands.  
- **Price Levels (Y-Axis)**: Ranges from `164.70` to `166.20`, with grid lines for clarity.  


### **3. Delta & Total Volume Boxes**  
Below each vertical volume cluster, boxes display:  
- **Delta**: Net volume (buy volume – sell volume). Red = negative (more selling), green = positive (more buying).  
- **Total**: Total volume traded at that price cluster.  

Examples:  
- Leftmost cluster: `Delta 591.203K` (strong buying), `Total 3.181M`.  
- Middle cluster: `Delta -177.266K` (selling), `Total 1.721M`.  


### **4. Time Axis (X-Axis)**  
Time stamps: `15:45`, `22` (likely a typo, e.g., 22:00), `09:45`, `10:00`, `10:15`, `10:30` (15-minute intervals).  


### **5. UI Elements**  
- **Bottom-Right Icons**:  
  - Lightning bolt (likely for “Market Depth” or real-time data).  
  - Gear (settings).  


### **Purpose of the Chart**  
This Volume Profile chart helps traders identify:  
- **Key price levels** (high-volume bars, especially black ones) as support/resistance.  
- **Buying/selling pressure** (color-coded volume) to gauge market sentiment.  
- **Liquidity zones** (total volume) to assess where most trading occurs.  


In short, the chart combines price, volume, and time to reveal where traders are most active, helping with entry/exit decisions and risk management.


**Описание:** This TradingView image displays a **15-minute candlestick chart** for **TSLA (Tesla) on NASDAQ**, focusing on a detailed **Volume Profile** (market depth) visualization. Here’s a breakdown of key elements:  


### 1. **Header & Ticker Info**  
- **Ticker**: `TSLA 15 · NASDAQ` (15-minute time frame, NASDAQ exchange).  
- **Price Data**:  
  - `O 165.37` (Open), `H 165.45` (High), `L 165.35` (Low), `C 165.44` (Close).  
  - `+0.07 (+0.04%)` (daily change, green = positive).  
- **Current Price Box**:  
  - Red box: `165.44` (last price) with `0.01` (change).  
  - Blue box: `165.45` (bid/ask or reference price).  
- **Currency**: `USD` (top-right dropdown).  


### 2. **Main Chart (Volume Profile)**  
The chart uses **candlesticks** with **vertical volume bars** (color-coded: *red* = selling pressure, *green* = buying pressure) to show price levels and volume at each level.  

- **Y-Axis (Price)**: Ranges from `164.70` to `166.20`, with grid lines for clarity.  
- **X-Axis (Time)**: Timestamps (e.g., `15:45`, `22`, `09:45`, `10:00`, `10:15`, `10:30`) mark 15-minute intervals.  
- **Candlesticks**: Each candle represents 15 minutes, with:  
  - Red body = price closed lower than open (selling).  
  - Green body = price closed higher than open (buying).  
  - Wicks = intraday high/low.  
- **Volume Bars**: Vertical bars at each price level show the number of shares traded (e.g., `6.953K`, `4.861K`). Taller bars = higher volume.  


### 3. **Volume Profile Metrics (Below Each Candle)**  
For each 15-minute candle, three metrics summarize volume activity:  
- **Delta**: Net volume (buy volume – sell volume). *Red* = more selling; *green* = more buying.  
- **Total**: Total volume (buy + sell) for the candle.  
- **Examples**:  
  - First candle: `Delta 591.203K`, `Total 3.181M` (high buying pressure).  
  - Middle candle: `Delta -177.266K`, `Total 1.721M` (net selling).  


### 4. **UI Elements**  
- **Bottom-Left**: TradingView logo.  
- **Bottom-Right**:  
  - Lightning bolt icon (likely for “Market Replay” or real-time data).  
  - Gear icon (settings).  


### Purpose  
This chart helps traders analyze **price action** (via candlesticks) and **volume distribution** (via volume profile) to identify support/resistance, buying/selling pressure, and liquidity at different price levels. The 15-minute time frame is ideal for intraday trading.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43488069251/original/bGTPGoJI3oRUu3pQnQOozpgjzP5J-Xw9Xg.png?1716812277)

**Описание:** This TradingView image displays a **volume profile (or order book) visualization** for a financial instrument, showing buy/sell volume distribution across price levels. Here’s a detailed breakdown:  


### 1. **Core Structure: Two Columns (Buy/Sell Sides)**  
- **Left Column (Pink/Red Shades)**: Represents the **buy side** (demand).  
- **Right Column (Green Shades)**: Represents the **sell side** (supply).  


### 2. **Price Levels (Rows 1–4)**  
Each row (1–4) corresponds to a price level (e.g., support/resistance zones or bid/ask tiers). Volume values are labeled in thousands (K):  

| Level | Buy Side Volume (Left) | Sell Side Volume (Right) |  
|-------|-----------------------|-------------------------|  
| 1     | 166.433 K             | 144.644 K               |  
| 2     | 550.535 K             | 506.37 K                |  
| 3     | 244.744 K             | 158.847 K               |  
| 4     | 171.992 K             | 250.835 K               |  


### 3. **Central Candlestick (Price Action)**  
A red candlestick sits between the two columns, indicating:  
- **Bearish price movement** (close < open) for the current period.  
- Its position relative to the volume columns shows where price traded (e.g., near a key volume level).  


### 4. **Bid-Ask Arrows (Blue)**  
Two blue arrows (left/right) between the columns suggest:  
- **Liquidity flow** or **order book imbalance** (e.g., buy pressure vs. sell pressure).  
- The left arrow (pointing left) may indicate buy-side dominance; the right arrow (pointing right) may indicate sell-side dominance.  


### 5. **Color Coding & Volume Interpretation**  
- **Darker shades** (e.g., row 2) = Higher volume (key support/resistance).  
- **Lighter shades** (e.g., row 1) = Lower volume (less significant price levels).  


### Purpose  
This visualization helps traders:  
- Identify **key price levels** (high-volume zones) for support/resistance.  
- Assess **liquidity** (volume depth) at different prices.  
- Gauge **order book imbalance** (buy vs. sell pressure) to predict price direction.  


In short, it’s a snapshot of volume distribution and price action, critical for analyzing market structure and making trading decisions.


**Описание:** This TradingView image displays a **volume profile** (or order book-style visualization) comparing buy/sell volumes across four price levels, with a central candlestick chart element. Here’s a detailed breakdown:  


### 1. **Layout & Structure**  
The image is divided into two vertical sections (left = “buy”/red, right = “sell”/green) flanking a central candlestick, with four horizontal rows (labeled 1–4) representing price levels (1 = lowest, 4 = highest).  


### 2. **Left Section (Buy Volume - Red Shades)**  
- **Row 1 (Light Red):** `166.433 K` (buy volume at the lowest price level).  
- **Row 2 (Dark Red):** `550.535 K` (highest buy volume, likely a key support level).  
- **Row 3 (Light Red):** `244.744 K` (buy volume at a mid-level price).  
- **Row 4 (Light Red):** `171.992 K` (buy volume at the highest price level).  


### 3. **Right Section (Sell Volume - Green Shades)**  
- **Row 1 (Light Green):** `144.644 K` (sell volume at the lowest price level).  
- **Row 2 (Dark Green):** `506.37 K` (highest sell volume, likely a key resistance level).  
- **Row 3 (Light Green):** `158.847 K` (sell volume at a mid-level price).  
- **Row 4 (Light Green):** `250.835 K` (sell volume at the highest price level).  


### 4. **Central Candlestick & Arrows**  
- A **red candlestick** (open > close) sits between the two sections, indicating a bearish price move (or current price action).  
- **Blue bidirectional arrows** (left/right) suggest a comparison or “flow” between buy (left) and sell (right) volumes, emphasizing volume dynamics.  


### 5. **UI Elements & Purpose**  
- **Color Coding:** Red = buy interest, green = sell interest (standard TradingView convention for order flow/volume).  
- **“K” Suffix:** Denotes thousands (e.g., `166.433 K` = 166,433 units of volume).  
- **Rows (1–4):** Represent price levels (e.g., support/resistance zones) with corresponding volume.  
- **Candlestick:** Visualizes price action (open, high, low, close) to contextualize volume data.  


### 6. **Key Takeaway**  
This visualization highlights **volume distribution** across price levels, showing where buyers (left) and sellers (right) are most active. The dark red (row 2) and dark green (row 2) cells indicate the highest volume at mid-levels, suggesting a “liquidity zone” or key price range for trading. The candlestick and arrows tie volume to price movement, helping traders identify support/resistance and volume-based trading signals.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43482198815/original/_XhpfOnvTyvlXYkHrU0DCGxAk60AfX0mOQ.png?1714222051)

**Описание:** This TradingView image displays a **Volume Profile (or Volume at Price) chart** for the stock **AAPL (Apple Inc.)** on the NASDAQ exchange, showing price levels and corresponding trading volumes. Here’s a detailed breakdown:  


### 1. **Top Bar (Header)**  
- **Symbol & Exchange**: “AAPL” (stock ticker) + “NASDAQ” (exchange).  
- **Price Data**: `O168.28 H168.44 L168.18 C168.29 +0.01 (+0.01%)` → Open (O), High (H), Low (L), Close (C) prices, plus the daily change (green for gains).  
- **Volume**: `Vol405.119K` → Total volume traded.  
- **Currency**: “USD” (top-right) confirms the price currency.  


### 2. **Chart Type & Timeframe**  
- **Chart Type**: Volume Profile (vertical bars represent price levels, with height/size indicating volume at that price).  
- **Timeframe**: The x-axis shows a short intraday window (e.g., `21:49:30` to `21:52`), indicating real-time or recent trading activity.  


### 3. **Price Axis (Right)**  
- Vertical axis with prices (e.g., `166.30` to `167.15`), showing the range of prices traded during the displayed period.  


### 4. **Volume Profile Bars**  
Each vertical bar represents a **price level**, with:  
- **Color**:  
  - *Red*: Price level where selling pressure dominated (more volume at ask/bids, or price declined).  
  - *Teal/Green*: Price level where buying pressure dominated (more volume at bids, or price rose).  
  - *Black*: Neutral or mixed volume (no clear bias).  
- **Labels**: Volume values (e.g., `7.792K`, `12.886K`) show how much stock traded at that price. Larger labels = higher volume.  


### 5. **UI Elements**  
- **“Volume Profile” Button** (top-left): Toggles the Volume Profile chart type.  
- **“TV PRO” Logo** (bottom-left): TradingView’s premium branding.  
- **Navigation Arrow** (bottom-right): Scrolls through historical data.  


### Purpose of the Chart  
This chart helps traders identify **key price levels with high volume** (support/resistance), showing where most trading occurred. Red bars highlight selling pressure; teal/green bars highlight buying pressure. The short timeframe (seconds/minutes) suggests real-time analysis of intraday order flow.


**Описание:** This TradingView image displays a **Volume Profile (or Volume at Price) chart** for **Tesla, Inc. (TSLA)** on the NASDAQ exchange, showing intraday price/volume data. Here’s a detailed breakdown:  


### 1. **Top Bar (Symbol & Market Data)**  
- **Symbol/Exchange**: `TSLA` (Tesla) on `NASDAQ`.  
- **OHLCV Data**:  
  - `O168.28` (Open), `H168.44` (High), `L168.18` (Low), `C168.29` (Close).  
  - `+0.01 (+0.01%)` (Price change), `Vol405.119K` (Total volume).  
- **Currency**: `USD` (top-right).  


### 2. **Chart Type & Timeframe**  
- **Chart Type**: Volume Profile (or “Volume at Price”)—displays volume aggregated at specific price levels (vertical bars) over time (horizontal axis).  
- **Timeframe**: Intraday (x-axis shows timestamps: `21:49:30` to `21:52`).  


### 3. **Price Axis (Right)**  
- Vertical axis with price levels (e.g., `166.30` to `167.15`), indicating the price range of the chart.  


### 4. **Volume Bars (Core of the Chart)**  
- **Color Coding**:  
  - **Red**: Selling pressure (price declines).  
  - **Green**: Buying pressure (price increases).  
  - **Black**: Neutral/transition (no clear trend).  
- **Structure**: Each vertical “stack” of bars represents volume at a specific price, with:  
  - **Top/Bottom Bars**: Larger volume at extreme prices (e.g., `12.194K` at `166.35`, `33.094K` at `166.60`).  
  - **Middle Bars**: Volume at intermediate prices (e.g., `24.909K` at `166.75`, `18.551K` at `166.70`).  
- **Volume Values**: Labeled on each bar (e.g., `7.792K`, `12.886K`, `24.622K`), showing how much volume traded at that price.  


### 5. **UI Elements**  
- **“Vol Profile” Button** (top-left): Toggles the Volume Profile chart type.  
- **Timestamps (x-axis)**: Horizontal axis showing time (e.g., `21:49:30`, `21:50`, `21:51:30`), marking when volume occurred.  
- **Red Arrows**: Highlight key price levels (e.g., peaks/troughs) for emphasis.  
- **“TV PRO” Logo** (bottom-left): Indicates TradingView Pro (paid) subscription.  
- **Navigation Arrow** (bottom-right): For scrolling through time periods.  


### Purpose of the Chart  
This chart helps traders analyze **volume distribution by price**—identifying support/resistance levels, high-volume price zones, and trend strength (e.g., green bars = buying, red = selling). It’s used to spot where most trading activity occurred, informing entry/exit decisions.


