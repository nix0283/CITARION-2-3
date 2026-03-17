# Time Price Opportunity charts explained

**URL:** https://www.tradingview.com/support/solutions/43000725590-time-price-opportunity-charts-explained/

---

- [ Help Center ](/)
- / 
- / Chart 
- / [ Learn more about chart types ](/support/folders/43000547460-learn-more-about-chart-types/)
- / [ Time Price Opportunity charts explained ](/support/solutions/43000725590-time-price-opportunity-charts-explained/)

# Time Price Opportunity charts explained 
 The Time Price Opportunity (TPO) chart type, also known as market profile, helps you visualize price dynamics as the profile period develops and the concentration of prices at certain levels during a specific period. You can use TPO on our [Supercharts](https://www.tradingview.com/chart/) to identify price levels with the most or most minor activity, to gain insights to determine future price movements.

 **CONTENTS:**

- [TPO charts construction principles](#Construction)
- [Chart settings](#Settings) [Line](#Line) 
- [Time Price Opportunity](#Tpo) 
- [Lines and marks](#Marks) 
- [Volume profile](#Profile)
- [Summary info](#Summary%20info)
 - [Splitting and merging profiles](#Merging) 

- [Multi-session profiles](#Multi-session%20profiles) 
 [Session selection](#Session%20selection)
- [Custom sessions](#Custom%20sessions)
- [Overlapping sessions](#Overlapping%20sessions)
- [Out-of-range session times](#Out-of-range%20session%20times)
 - [Alerts](#Alerts)

#### TPO charts construction principles 

Time Price Opportunity is based on a concept developed by J. Peter Steidlmayer in the 1980s. It has gained widespread acceptance in the futures and commodity markets and is now widely used across all sectors.

- Each profile covers a period, which can be specified in days, weeks, or months
- Each letter represents one block of time within a profile, dividing the profile period into equal periods (5 minutes, 10 minutes, 15 minutes, 30 minutes, 1 hour, 2 hours, or 4 hours). The sequence of letters begins with uppercase A-Z, followed by lowercase a-z, and repeats as necessary
- A block of one letter appears at each price level where market activity occurred during the time segment corresponding to one letter. For example, all levels at which block "A" appears were visited during the first time segment of the profile period
- Each profile line represents the price range that covers the chart

For more detailed information on how the TPO profile is calculated, read our article on the [TPO indicator](https://www.tradingview.com/support/solutions/43000713306-time-price-opportunity-tpo/).

On the right side of the TPO is the [volume profile](https://www.tradingview.com/support/solutions/43000502040-volume-profile-indicators-basic-concepts/) — it is calculated using data for the period specified in the "Block Size" parameter.

Additionally, a price chart is displayed as a line.

#### Chart settings 

#### Line 

- **Price source:** Allows you to select based on which values the line chart is built
- **Line:** Sets the color and thickness of the chart line

#### Time Price Opportunity 

- **Periods:** Determines the duration of each profile, set by the number of days, weeks, or months. The default is one day
- **Block size:** Defines the sub-period of time represented by each letter used to name the blocks. Smaller block size allows for more detail. Values: 5 minutes, 10 minutes, 15 minutes, 30 minutes, 1 hour, 2 or 4 hours, default is 30 minutes. Affects the calculation of TPO and Volume profiles
- **Row size:** Determines how many lines the profile will contain. Select the optimal value for the "Ticks per row" setting in automatic mode. The number of ticks you specified in the "Ticks per row" field is used manually
- **Ticks per row:** This value is used only if the manual Row size setting mode is used
- **Value area:** Sets the percentage of blocks used to calculate the cost zone. The default value is 70%
- **Gradient colors:** These colors are used to display TPO blocks. The first two colors define the color range for the A-Z blocks; the last two colors are for blocks a-z
- **Blocks:** Controls the display of TPO-colored blocks. Disabling the settings will not work if the Letters setting is enabled, but they cannot be displayed due to the lack of space
- **Letters:** Controls the display of TPO letters. If this feature is enabled, letters will only be displayed if there is enough space for them; otherwise, colored blocks will be displayed
- **Opacity outside the VA:** Sets the transparency value outside the Value Zone
- **Split by blocks:** Distributes blocks into each time block throughout the entire profile period
- **Summary info:** Additional data about each separate TPO calculation

#### Lines and labels 

- **POC:** Toggle the visibility of the line and point of control mark for the TPO period
- **Poor high:** Toggle the visibility of the line and the weak high label for the TPO period
- **Poor low:** Toggle the visibility of the line and the weak low label for the TPO period
- **Single prints:** Toggle the visibility of the single print line and label for the TPO period
- **VAH:** Toggle the line's visibility and the value area high label for the TPO period
- **VAL:** Toggle the line's visibility and the value area low label for the TPO period
- **TPO midpoint:** Toggle the visibility of the average level label for the TPO period
- **Open price:** Toggle the visibility of the open price label for the TPO period
- **Closing price:** Toggle the visibility of the closing price label for the TPO period
- **Initial balance range:** Display the initial balance line as a vertical line to the left of the TPO profile and determines the number of blocks used to form the range

#### Volume profile 

- **Show volume profile:** Toggles the visibility of the volume profile to the right of the TPO profile
- **Values:** Toggle the visibility of volume values if there is enough space for them
- **VAH:** Switch the visibility of the value area high line for the volume profile
- **VAL:** Switch the visibility of the value area low line for the volume profile
- **POC:** Toggle the visibility of the point of control line for the volume profile
- **Volume:** Determine the color of levels outside the value zone
- **Value area:** Determine the color of the levels inside the cost zone
- **Placement:** Determine whether the volume profile is aligned left or right

#### Summary info 

When this input is selected, a new pane will be created below the TPO chart. That pane will show additional data about each separate TPO calculation.

Use the dropdown input to customize:

- **HL range:** The range of the profile, i.e., the difference between its highest and lowest points
- **VA range:** The range of the value area
- **VAH:** The highest point of the value area
- **VAL:** The lowest point of the value area
- **POC:** Point of control of the TPO
- **Total volume:** The total volume for the whole period covered by this specific profile
- **Total TPO:** The total number of blocks in this profile
- **TPO above POC:** The total number of blocks in this profile above the point of control
- **TPO below POC:** Total number of blocks in this profile below the point of control
- **Rotation factor:** The coefficient of bars' rise and fall among the bars covered by the profile. The logic behind the rotation factor calculation can be read below
- **IB high:** The highest point of the initial balance range
- **IB low:** The lowest point of the initial balance range
- **IB range:** The initial balance range

#### Rotation factor 

The rotation factor is the coefficient that shows how bars inside of a specific profile rise and fall. To do that, calculate the rotation factor for each bar of the "Block Size" timeframe, and then sum their rotation factors up.

A single bar can have a rating ranging from -2 to +2. To calculate it, compare the high of the current bar with the high of the previous bar:

- If the current bar has a higher high, assign a value of +1
- If it has a lower high, assign a value of -1
- If the highs are equal, assign a value of 0

Next, perform the same comparison for the lows of both bars. Finally, sum the values to obtain the rotation factor for the current bar.

On the screenshot below, you can see the resulting calculation on the TPO chart above, and the progressing calculation on the regular chart.

#### Splitting and merging profiles 

You can split or merge individual profiles: this is especially useful when you need to look at specific areas of the graph at different levels of detail. To use this feature, right-click on the profile blocks and select the appropriate action from the context menu.

#### Multi-session profiles 

When the Period parameter is set to 1 day, TPO charts support multi-session profiles, allowing you to visualize separate TPO distributions for different parts of the trading day — such as pre-market, regular, post-market, and also fully custom sessions defined by the user.

#### Session selection 

In the Session dropdown, you can choose one of the following presets:

- **All:** A single continuous session covering the entire session
- **Each:** Separate profiles for Pre-market, Market, and Post-market sessions
- **Pre-market only:** Builds the profile using only pre-market data
- **Market only:** Includes only regular trading hours
- **Post-market only:** Includes only post-market data
- **Custom:** Allows full manual control over session intervals

When a non-custom preset is selected, profiles are generated automatically based on the predefined session boundaries for the instrument.

#### Custom sessions 

To define your own session intervals:

- Select Session → Custom.
- Set the start and end times for the desired session (for example, 04:00-20:00). Please note that the time is specified in the chart’s Timezone setting.
- Click Add session to include additional intervals. You can add up to five custom sessions in total.
- Each defined interval will produce a separate TPO profile on the chart.

You can apply splitting and merging operations to the resulting custom TPO profiles to analyze specific periods in more detail.

#### Overlapping sessions 

If two or more custom session intervals overlap, the overlapping areas are automatically divided into separate sessions at their intersection points. Each resulting segment is displayed sequentially in historical order and generates its own TPO profile.

For example, to analyze the correlation of a cryptocurrency with NASDAQ trading hours:

- Set your chart timezone to New York
- Define the first custom session as 04:00–20:00 (extended hours)
- Define the second custom session as 09:30–16:00 (regular hours)

This configuration produces three separate TPO profiles:

- 04:00–09:30
- 09:30–16:00
- 16:00–20:00

This allows you to easily compare market activity across different trading phases.

#### Out-of-range session times 

If a custom session starts before market open or ends after market close for the instrument, the session boundaries are automatically adjusted to fit within the valid trading hours.

This ensures that all TPO profiles only include actual traded data and prevents gaps in the visualization.

#### Alerts 

You can now create alerts on TPO — allowing you to receive notifications when price interacts with key structural levels of completed profiles.

TPO alerts help you track important market reactions to value areas, points of control, and profile anomalies, without the need to constantly monitor the chart.

#### Available alert conditions 

The following alert conditions are currently supported:

- Price crossed extended POC
- Price crossed extended VAH
- Price crossed extended VAL
- Price crossed extended poor high
- Price crossed extended poor low
- Price crossed extended singleprint

#### How TPO alerts work 

- Alerts are available on TPO chart types, as well as on Periodic TPO and Session TPO studies.
- Alerts are triggered only by completed profiles.The currently forming (real-time) TPO profile is ignored to avoid excessive noise and false signals.

#### Important notes and limitations 

#### Extended levels only 

You can create alerts only on extended TPO objects listed above.

If a level is not extended, it will not appear in the alert conditions list.

Extended levels are controlled in Settings → Lines & Labels.If an extend option is disabled, alerts for that level cannot be created and will be hidden in the alert's creation dialog.

#### Real-time profile is excluded 

Alerts do not take the real-time (unfinished) TPO profile into account.Since the profile is still forming, using it for alerts would generate unnecessary noise and unreliable signals.

#### Merge & Split behavior 

TPO charts and studies support profile merge and split operations.However, alerts do not dynamically react to these changes.

Key implications:

- When an alert is created, a snapshot of the study parameters is used on the backend.
- Any subsequent changes to chart settings — including merging or splitting profiles — are not propagated to existing alerts.
- As a result, after merging or splitting profiles: Alerts may continue to trigger based on outdated extended levels
- In some cases, alerts may fire for levels that no longer exist on the chart

#### Alert dialog behavior 

- A new condition group Time Price Opportunities appears for TPO charts.
- Only alert conditions whose corresponding extend options are enabled will be shown.
- If all extend options are disabled, the Time Price Opportunities group will not be displayed at all.
- When clicking an alert: Alerts created on TPO charts will open the chart in TPO mode
- Alerts created on TPO studies will not change the chart type

#### Why use TPO alerts? 

TPO alerts allow you to react instantly when price revisits or breaks through structurally important market profile levels, such as:

- Acceptance or rejection around value boundaries
- Re-tests of control points
- Resolution of unfinished auctions (poor highs/lows)
- Interaction with low-liquidity single print zones

By combining TPO alerts with profile visualization, you can monitor market structure passively, while staying focused on execution and decision-making when it matters most.

Also read:

- [How to read chart patterns](https://www.tradingview.com/support/solutions/43000759289-how-to-read-chart-patterns/)
- [How to trade on TradingView](https://www.tradingview.com/support/solutions/43000756695-how-to-trade-on-tradingview/)
- [The technical analysis essentials](https://www.tradingview.com/support/solutions/43000759577-the-technical-analysis-essentials-with-tradingview/)
- [Chart types available on TradingView](https://www.tradingview.com/support/solutions/43000703407-chart-types-available-on-tradingview/)
- [Drawing tools available on TradingView](https://www.tradingview.com/support/solutions/43000703396-drawing-tools-available-on-tradingview/)
 Previous Previous Volume footprint charts: a complete guide Next Next Session volume profile charts explained Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43517099210/original/Paw8rIid0aeIE84qO0haJO8NrdXaHHm_fA.png?1728995363

**Описание:**

This image shows a **TradingView chart interface** with a **\

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43552199101/original/UFjolAipPpDfAFwI71_J_tdWxELRD0XJbQ.png?1744632971

**Описание:**

This image shows a **TradingView interface** displaying a **Volume Profile (TPO) chart** for **Adobe Inc. (NASDAQ: ADBE)** on a **1-day (1D) timeframe**. The chart uses a **TPO (Time-Price-Opportunity) structure** with a rotation factor of 100, alongside candlestick price action. Below is a detailed breakdown of all UI elements, their purposes, and the chart’s components:


### **1. Top Header & Symbol Information**  
- **Symbol & Exchange**: `Adobe Inc. · 1D · NASDAQ · TPO [1, Day, 30m, 100]`  
  - Identifies the stock (Adobe), timeframe (1-day), exchange (NASDAQ), and chart type (TPO with 100 rotation factor).  
- **Price & Change**: `235.33 -0.41 (-0.17%)`  
  - Current price: $235.33, daily change: -$0.41 (-0.17%).  
- **Currency Dropdown**: `USD` (dropdown menu to switch currency).  


### **2. Buy/Sell Buttons (Order Entry)**  
- **Sell Button**: Red button with `235.98 SELL` (current ask price, used to place a sell order).  
- **Buy Button**: Blue button with `235.00 BUY` (current bid price, used to place a buy order).  
- **Spread**: `0.02` (difference between ask and bid prices).  


### **3. Price Axis (Right Side)**  
- Vertical axis showing price levels (e.g., 228.00, 230.00, 232.00, ..., 244.00) to reference price action.  


### **4. TPO Chart (Core Visualization)**  
The TPO chart displays **volume/distribution at different price levels** using colored blocks (letters) and horizontal lines. Key elements:  

#### **a. TPO Blocks (Letters)**  
- Colored blocks (e.g., pink, green, black) represent price levels where trading occurred. Each letter (A, B, C, ..., M) denotes a time period (rotation) at that price.  
- **Color Coding**:  
  - Pink: Higher price levels (selling pressure).  
  - Green: Lower price levels (buying pressure).  
  - Black: Neutral/central price levels.  

#### **b. Key Volume Profile Levels**  
- **VAH (Value Area High)**: Top dashed line of the \

---

### Изображение 3

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43552402610/original/3TSFKb3Zx3l5AUajEppTgyKEw7F0KjKtqg.png?1744706452

**Описание:**

This image shows the **Settings interface** of TradingView, specifically focused on configuring **Volume Profile (VP)** or **Market Profile** chart elements. The interface is divided into three main sections: a left navigation menu, a central configuration panel, and a right dropdown menu for additional options. Here’s a detailed breakdown:


### 1. **Top Bar**  
- **Title**: \

---

### Изображение 4

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43552199218/original/uH26hGGu0lSBh6wWzuF8rLWcONYiOQ1znQ.png?1744633005

**Описание:**

This image shows a **TradingView interface** displaying two charts for **Apple Inc. (NASDAQ: AAPL)**, focusing on a 1-day (intraday) timeframe with 30-minute (30m) candlesticks. The interface includes price action, volume, and technical indicators, with detailed UI elements for trading and analysis. Below is a breakdown:


### **Top Chart: Volume Profile (TPO) Chart**
This chart visualizes price action, volume, and key volume profile metrics (VAH, POC, VAL) over the trading day.  

#### **Header & Ticker Info**  
- **Ticker**: `Apple Inc · 30 · NASDAQ · TPO [1, Day, 30m, 30]` (30 = likely a parameter for the volume profile tool).  
- **Current Price**: `235.32 +0.14 (+0.06%)` (current price, change, and percentage change).  
- **Currency**: `USD` (dropdown for currency selection).  


#### **Trading Buttons (Top-Left)**  
- **SELL Button**: Red button with `234.61` (sell price) and `0.10` (likely spread or fee). Click to place a sell order.  
- **BUY Button**: Blue button with `234.71` (buy price). Click to place a buy order.  


#### **Chart Elements**  
- **Price Line**: Blue line showing price movement over time.  
- **Volume Profile (TPO)**: Colored bars (green/red) representing trading volume at different price levels. Labels:  
  - `VAH` (Value Area High): Top of the most traded price range.  
  - `POC` (Point of Control): Price with the highest volume.  
  - `VAL` (Value Area Low): Bottom of the most traded price range.  
- **Time Axis**: X-axis with dates/times (e.g., `28`, `12:00`, `Mar`, `12:00`, `4`, `12:00`, `5`, `12:00`, `6`, `12:00`).  
- **Price Axis (Right)**: Y-axis with price levels (e.g., `242.50`, `240.00`, `237.50`, `235.32`, `234.61`, `232.50`, `230.00`).  


#### **Additional UI Elements**  
- **Rotation Factor**: Purple icon with text (likely a technical indicator toggle/setting).  
- **Settings Icon**: Gear icon (top-right) for chart settings (e.g., indicators, timeframes).  


### **Bottom Chart: Rotation Factor (1D 30) Candlestick Chart**  
This chart shows price action (candlesticks) with the \

---

### Изображение 5

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43517099424/original/AMo5qED5m-U4C8YnNp7jwWJv1ILuj58jjQ.png?1728995402

**Описание:**

This image shows a **TradingView** interface displaying a **Market Profile chart** for **Apple Inc. (AAPL)** on the NASDAQ exchange. The chart is set to a **30-minute (30m)** time frame, with a **1-day** aggregation and **25** TPO (Time Price Opportunity) levels. Here’s a detailed breakdown of the UI elements:


### **Top Navigation Bar**
- **Left Side**:  
  - **TV Logo**: TradingView branding.  
  - **Zoom Controls**: `+` (zoom in) and `-` (zoom out) buttons.  
  - **Time Frame Selector**: `30m` (currently selected; other options like 1D, 5D, 1M, etc., are visible in the bottom bar).  
  - **Chart Type Icons**: Grid (candlestick), line, and other chart type toggles.  
  - **Indicators Dropdown**: `Indicators` (to add technical indicators).  
  - **TPO Settings**: `M` (Market Profile toggle) and a grid icon (for chart layout).  
  - **Alert Button**: `Alert` (to set price alerts).  
  - **Replay Button**: `Replay` (to replay historical price action).  
  - **Undo/Redo Arrows**: For chart modifications.  
  - **TPO Dropdown**: `TPO` (to configure Time Price Opportunity settings).  
  - **Refresh/Settings Icons**: For data refresh and global settings.  
  - **Publish Button**: `Publish` (to share the chart).  

- **Right Side**:  
  - **Chart Title**: `Apple Inc · 30 · NASDAQ · TPO [1, Day, 30m, 25]` (confirms the symbol, time frame, and TPO settings).  
  - **Current Price**: `227.87 +0.06 (+0.03%)` (current price, change, and percentage change).  


### **Price Panel (Top-Left)**
- **Sell Price**: `228.97` (red box, labeled \

---

