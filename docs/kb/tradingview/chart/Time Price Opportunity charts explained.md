# Time Price Opportunity charts explained

**URL:** https://www.tradingview.com/support/solutions/43000725590-time-price-opportunity-charts-explained/

---

- [ Help Center ](/) - / - / Chart - / [ Learn more about chart types ](/support/folders/43000547460-learn-more-about-chart-types/) - / [ Time Price Opportunity charts explained ](/support/solutions/43000725590-time-price-opportunity-charts-explained/) # Time Price Opportunity charts explained The Time Price Opportunity (TPO) chart type, also known as market profile, helps you visualize price dynamics as the profile period develops and the concentration of prices at certain levels during a specific period. You can use TPO on our [Supercharts](https://www.tradingview.com/chart/) to identify price levels with the most or most minor activity, to gain insights to determine future price movements. **CONTENTS:** - [TPO charts construction principles](#Construction) - [Chart settings](#Settings) [Line](#Line) - [Time Price Opportunity](#Tpo) - [Lines and marks](#Marks) - [Volume profile](#Profile) - [Summary info](#Summary%20info) - [Splitting and merging profiles](#Merging) - [Multi-session profiles](#Multi-session%20profiles) [Session selection](#Session%20selection) - [Custom sessions](#Custom%20sessions) - [Overlapping sessions](#Overlapping%20sessions) - [Out-of-range session times](#Out-of-range%20session%20times) - [Alerts](#Alerts) TPO charts construction principles Time Price Opportunity is based on a concept developed by J. Peter Steidlmayer in the 1980s. It has gained widespread acceptance in the futures and commodity markets and is now widely used across all sectors. - Each profile covers a period, which can be specified in days, weeks, or months - Each letter represents one block of time within a profile, dividing the profile period into equal periods (5 minutes, 10 minutes, 15 minutes, 30 minutes, 1 hour, 2 hours, or 4 hours). The sequence of letters begins with uppercase A-Z, followed by lowercase a-z, and repeats as necessary - A block of one letter appears at each price level where market activity occurred during the time segment corresponding to one letter. For example, all levels at which block "A" appears were visited during the first time segment of the profile period - Each profile line represents the price range that covers the chart For more detailed information on how the TPO profile is calculated, read our article on the [TPO indicator](https://www.tradingview.com/support/solutions/43000713306-time-price-opportunity-tpo/). On the right side of the TPO is the [volume profile](https://www.tradingview.com/support/solutions/43000502040-volume-profile-indicators-basic-concepts/) — it is calculated using data for the period specified in the "Block Size" parameter. Additionally, a price chart is displayed as a line. Chart settings Line - **Price source:** Allows you to select based on which values the line chart is built - **Line:** Sets the color and thickness of the chart line Time Price Opportunity - **Periods:** Determines the duration of each profile, set by the number of days, weeks, or months. The default is one day - **Block size:** Defines the sub-period of time represented by each letter used to name the blocks. Smaller block size allows for more detail. Values: 5 minutes, 10 minutes, 15 minutes, 30 minutes, 1 hour, 2 or 4 hours, default is 30 minutes. Affects the calculation of TPO and Volume profiles - **Row size:** Determines how many lines the profile will contain. Select the optimal value for the "Ticks per row" setting in automatic mode. The number of ticks you specified in the "Ticks per row" field is used manually - **Ticks per row:** This value is used only if the manual Row size setting mode is used - **Value area:** Sets the percentage of blocks used to calculate the cost zone. The default value is 70% - **Gradient colors:** These colors are used to display TPO blocks. The first two colors define the color range for the A-Z blocks; the last two colors are for blocks a-z - **Blocks:** Controls the display of TPO-colored blocks. Disabling the settings will not work if the Letters setting is enabled, but they cannot be displayed due to the lack of space - **Letters:** Controls the display of TPO letters. If this feature is enabled, letters will only be displayed if there is enough space for them; otherwise, colored blocks will be displayed - **Opacity outside the VA:** Sets the transparency value outside the Value Zone - **Split by blocks:** Distributes blocks into each time block throughout the entire profile period - **Summary info:** Additional data about each separate TPO calculation Lines and labels - **POC:** Toggle the visibility of the line and point of control mark for the TPO period - **Poor high:** Toggle the visibility of the line and the weak high label for the TPO period - **Poor low:** Toggle the visibility of the line and the weak low label for the TPO period - **Single prints:** Toggle the visibility of the single print line and label for the TPO period - **VAH:** Toggle the line's visibility and the value area high label for the TPO period - **VAL:** Toggle the line's visibility and the value area low label for the TPO period - **TPO midpoint:** Toggle the visibility of the average level label for the TPO period - **Open price:** Toggle the visibility of the open price label for the TPO period - **Closing price:** Toggle the visibility of the closing price label for the TPO period - **Initial balance range:** Display the initial balance line as a vertical line to the left of the TPO profile and determines the number of blocks used to form the range Volume profile - **Show volume profile:** Toggles the visibility of the volume profile to the right of the TPO profile - **Values:** Toggle the visibility of volume values if there is enough space for them - **VAH:** Switch the visibility of the value area high line for the volume profile - **VAL:** Switch the visibility of the value area low line for the volume profile - **POC:** Toggle the visibility of the point of control line for the volume profile - **Volume:** Determine the color of levels outside the value zone - **Value area:** Determine the color of the levels inside the cost zone - **Placement:** Determine whether the volume profile is aligned left or right Summary info When this input is selected, a new pane will be created below the TPO chart. That pane will show additional data about each separate TPO calculation. Use the dropdown input to customize: - **HL range:** The range of the profile, i.e., the difference between its highest and lowest points - **VA range:** The range of the value area - **VAH:** The highest point of the value area - **VAL:** The lowest point of the value area - **POC:** Point of control of the TPO - **Total volume:** The total volume for the whole period covered by this specific profile - **Total TPO:** The total number of blocks in this profile - **TPO above POC:** The total number of blocks in this profile above the point of control - **TPO below POC:** Total number of blocks in this profile below the point of control - **Rotation factor:** The coefficient of bars' rise and fall among the bars covered by the profile. The logic behind the rotation factor calculation can be read below - **IB high:** The highest point of the initial balance range - **IB low:** The lowest point of the initial balance range - **IB range:** The initial balance range Rotation factor The rotation factor is the coefficient that shows how bars inside of a specific profile rise and fall. To do that, calculate the rotation factor for each bar of the "Block Size" timeframe, and then sum their rotation factors up. A single bar can have a rating ranging from -2 to +2. To calculate it, compare the high of the current bar with the high of the previous bar: - If the current bar has a higher high, assign a value of +1 - If it has a lower high, assign a value of -1 - If the highs are equal, assign a value of 0 Next, perform the same comparison for the lows of both bars. Finally, sum the values to obtain the rotation factor for the current bar. On the screenshot below, you can see the resulting calculation on the TPO chart above, and the progressing calculation on the regular chart. Splitting and merging profiles You can split or merge individual profiles: this is especially useful when you need to look at specific areas of the graph at different levels of detail. To use this feature, right-click on the profile blocks and select the appropriate action from the context menu. Multi-session profiles When the Period parameter is set to 1 day, TPO charts support multi-session profiles, allowing you to visualize separate TPO distributions for different parts of the trading day — such as pre-market, regular, post-market, and also fully custom sessions defined by the user. Session selection In the Session dropdown, you can choose one of the following presets: - **All:** A single continuous session covering the entire session - **Each:** Separate profiles for Pre-market, Market, and Post-market sessions - **Pre-market only:** Builds the profile using only pre-market data - **Market only:** Includes only regular trading hours - **Post-market only:** Includes only post-market data - **Custom:** Allows full manual control over session intervals When a non-custom preset is selected, profiles are generated automatically based on the predefined session boundaries for the instrument. Custom sessions To define your own session intervals: - Select Session → Custom. - Set the start and end times for the desired session (for example, 04:00-20:00). Please note that the time is specified in the chart’s Timezone setting. - Click Add session to include additional intervals. You can add up to five custom sessions in total. - Each defined interval will produce a separate TPO profile on the chart. You can apply splitting and merging operations to the resulting custom TPO profiles to analyze specific periods in more detail. Overlapping sessions If two or more custom session intervals overlap, the overlapping areas are automatically divided into separate sessions at their intersection points. Each resulting segment is displayed sequentially in historical order and generates its own TPO profile. For example, to analyze the correlation of a cryptocurrency with NASDAQ trading hours: - Set your chart timezone to New York - Define the first custom session as 04:00–20:00 (extended hours) - Define the second custom session as 09:30–16:00 (regular hours) This configuration produces three separate TPO profiles: - 04:00–09:30 - 09:30–16:00 - 16:00–20:00 This allows you to easily compare market activity across different trading phases. Out-of-range session times If a custom session starts before market open or ends after market close for the instrument, the session boundaries are automatically adjusted to fit within the valid trading hours. This ensures that all TPO profiles only include actual traded data and prevents gaps in the visualization. Alerts You can now create alerts on TPO — allowing you to receive notifications when price interacts with key structural levels of completed profiles. TPO alerts help you track important market reactions to value areas, points of control, and profile anomalies, without the need to constantly monitor the chart. Available alert conditions The following alert conditions are currently supported: - Price crossed extended POC - Price crossed extended VAH - Price crossed extended VAL - Price crossed extended poor high - Price crossed extended poor low - Price crossed extended singleprint How TPO alerts work - Alerts are available on TPO chart types, as well as on Periodic TPO and Session TPO studies. - Alerts are triggered only by completed profiles.The currently forming (real-time) TPO profile is ignored to avoid excessive noise and false signals. Important notes and limitations Extended levels only You can create alerts only on extended TPO objects listed above. If a level is not extended, it will not appear in the alert conditions list. Extended levels are controlled in Settings → Lines & Labels.If an extend option is disabled, alerts for that level cannot be created and will be hidden in the alert's creation dialog. Real-time profile is excluded Alerts do not take the real-time (unfinished) TPO profile into account.Since the profile is still forming, using it for alerts would generate unnecessary noise and unreliable signals. Merge & Split behavior TPO charts and studies support profile merge and split operations.However, alerts do not dynamically react to these changes. Key implications: - When an alert is created, a snapshot of the study parameters is used on the backend. - Any subsequent changes to chart settings — including merging or splitting profiles — are not propagated to existing alerts. - As a result, after merging or splitting profiles: Alerts may continue to trigger based on outdated extended levels - In some cases, alerts may fire for levels that no longer exist on the chart Alert dialog behavior - A new condition group Time Price Opportunities appears for TPO charts. - Only alert conditions whose corresponding extend options are enabled will be shown. - If all extend options are disabled, the Time Price Opportunities group will not be displayed at all. - When clicking an alert: Alerts created on TPO charts will open the chart in TPO mode - Alerts created on TPO studies will not change the chart type Why use TPO alerts? TPO alerts allow you to react instantly when price revisits or breaks through structurally important market profile levels, such as: - Acceptance or rejection around value boundaries - Re-tests of control points - Resolution of unfinished auctions (poor highs/lows) - Interaction with low-liquidity single print zones By combining TPO alerts with profile visualization, you can monitor market structure passively, while staying focused on execution and decision-making when it matters most. Also read: - [How to read chart patterns](https://www.tradingview.com/support/solutions/43000759289-how-to-read-chart-patterns/) - [How to trade on TradingView](https://www.tradingview.com/support/solutions/43000756695-how-to-trade-on-tradingview/) - [The technical analysis essentials](https://www.tradingview.com/support/solutions/43000759577-the-technical-analysis-essentials-with-tradingview/) - [Chart types available on TradingView](https://www.tradingview.com/support/solutions/43000703407-chart-types-available-on-tradingview/) - [Drawing tools available on TradingView](https://www.tradingview.com/support/solutions/43000703396-drawing-tools-available-on-tradingview/) Previous Previous Volume footprint charts: a complete guide Next Next Session volume profile charts explained Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43517099210/original/Paw8rIid0aeIE84qO0haJO8NrdXaHHm_fA.png?1728995363)

**Описание:** This TradingView screenshot displays a **Time Price Opportunity (TPO) chart** for Apple Inc. (NASDAQ: AAPL) with an open **Chart settings** dialog. Here’s a detailed breakdown:  


### **Top Navigation Bar**  
- **Left**: Apple Inc. ticker (AAPL), timeframe selector (\


**Описание:** This TradingView interface displays a **Time Price Opportunity (TPO) chart** for Apple Inc. (NASDAQ: AAPL) with an open **Chart settings** modal. Here’s a detailed breakdown:


### **Top Navigation Bar**  
- **Left**:  
  - \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43552199101/original/UFjolAipPpDfAFwI71_J_tdWxELRD0XJbQ.png?1744632971)

**Описание:** This TradingView chart displays **Tesla, Inc. (TSLA)** on the NASDAQ exchange, using a **1-Day (1D) timeframe** with a **Volume Profile (TPO)** indicator (labeled \


**Описание:** This TradingView image displays a **1-day (1D) Volume Profile (TPO) chart** for **AMD (Advanced Micro Devices, Inc.)** on the NASDAQ exchange, with the following key elements:  


### 1. **Header & Ticker Info**  
- **Ticker**: `AMD Inc. · 1D · NASDAQ · TPO [1, Day, 30m, 100]` (Time Price Opportunity chart, 1-day timeframe, 30-minute TPO intervals, 100 TPOs).  
- **Price**: `235.33` (current price) with a change of `-0.41 (-0.17%)` (slight decline).  
- **Currency**: `USD` (dropdown for currency selection).  


### 2. **Order Buttons**  
- **Sell**: Red button showing `235.98` (sell price) with a spread of `0.02` (difference between buy/sell prices).  
- **Buy**: Blue button showing `235.00` (buy price).  


### 3. **Chart (Volume Profile / TPO)**  
The chart uses **color-coded TPO (Time Price Opportunity) blocks** (labeled A–M) to show price levels where trading occurred. Key annotations:  
- **VAH (Value Area High)**: Dashed line marking the upper bound of the “value area” (price range with most trading).  
- **POC (Point of Control)**: Solid line (or block) marking the price with the highest volume (most traded level).  
- **VAL (Value Area Low)**: Dashed line marking the lower bound of the value area.  
- **IB (Initial Balance)**: Range (high/low) from the first 30 minutes of trading (used to gauge volatility).  

TPO blocks are color-coded (e.g., pink, green, black) to represent different time periods or volume intensity. The blue line is the **Volume Profile (or moving average)**, showing the average price trend.  


### 4. **Price Axis (Right)**  
Vertical axis with price levels (e.g., `228.00`, `230.00`, ..., `244.00`) to reference TPO block positions.  


### 5. **Data Table (Bottom)**  
A table summarizing key metrics:  
- **VAH, VAL, POC**: Corresponding price levels for the value area.  
- **Rotation factor**: A measure of how price rotates around the POC.  
- **IB high/low/range**: Initial Balance (first 30 minutes) high, low, and range (volatility).  
- **Numerical values** (e.g., `4.00`, `6.00`, `5.00`): Likely volume or TPO counts for specific price levels.  


### 6. **Icons**  
- **Lightning bolt**: Possibly a “quick action” or “signal” icon.  
- **Settings gear**: For chart configuration (e.g., indicators, timeframes).  


### Purpose  
This chart helps traders analyze **price distribution** (where trading occurred) and **volume concentration** (POC) to identify support/resistance, trend direction, and market sentiment. The TPO blocks and value area (VAH/VAL) highlight price levels with significant trading activity, while the IB range gauges early-session volatility.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43552402610/original/3TSFKb3Zx3l5AUajEppTgyKEw7F0KjKtqg.png?1744706452)

**Описание:** This is a **TradingView settings panel** (specifically the \


**Описание:** This is a **TradingView settings panel** (likely for a Volume Profile or Market Profile chart) with a clean, white UI. Here’s a detailed breakdown:  


### **Header & Navigation**  
- **Title**: “Settings” (top-left).  
- **Close Button**: “X” (top-right) to dismiss the panel.  
- **Left Sidebar (Settings Categories)**: Vertical list of options with icons:  
  - *Symbol* (selected, highlighted gray) – for symbol-specific settings.  
  - *Status line* (horizontal lines icon).  
  - *Scales and lines* (arrows icon).  
  - *Canvas* (pencil icon).  
  - *Trading* (zigzag icon).  
  - *Alerts* (clock icon).  
  - *Events* (calendar icon).  


### **Main Content (Symbol Settings)**  
The right panel shows settings for the **“Symbol”** category, focused on “LINES & LABELS” (subheading).  

#### **Top Section**  
- **“Summary info” Checkbox**: Checked (enabled).  
- **Dropdown Menu**: Labeled “VAH, VAL, POC, …” (blue border, expanded to show options).  


#### **Dropdown Options (Expanded)**  
A list of checkboxes for Volume Profile/Market Profile metrics:  
- Unchecked: *HL range, VA range, Total volume, Total TPO, TPO above POC, TPO below POC, Rotation factor, TPO Midpoint, Open, Poor high, Poor low, Single prints*.  
- Checked: *VAH, VAL, POC, IB high, IB low, IB range*.  


### **Purpose**  
This panel lets users customize which Volume Profile/Market Profile elements (e.g., Value Area High/Low, Point of Control, Initial Balance) appear on the chart. The left sidebar organizes settings by category (symbol, status line, etc.), while the main panel focuses on toggling chart labels/lines.


