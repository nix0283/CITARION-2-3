# Seasonality

**URL:** https://www.tradingview.com/support/solutions/43000723025-seasonality/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Seasonality ](/support/solutions/43000723025-seasonality/) # Seasonality In time series analysis, seasonality is the perceived tendency for similar variations in a dataset to occur within specific regular intervals of less than one year. TradingView's Seasonality built-in indicator tracks and visualizes an instrument's monthly performance starting from a specified year to help traders identify potential seasonal patterns. The Seasonality indicator consists of two parts: - A Heatmap table on a separate pane under the chart that displays monthly change percentages and metrics with gradient colors - Boxes on the chart that display monthly level projections based on historical average changes Heatmap The Heatmap table displays historical change percentages for each month since the chosen starting point. It organizes each year's month-to-month data on a separate row, with each column corresponding to a specific month. Additionally, the bottom rows of the table display the seasonal average, standard deviation, and percentage of positive changes for each month over the included years. See the "Inputs" section below for more information about these metrics. This visual structure provides a simple, organized way for users to analyze monthly fluctuations over several years and identify potential seasonal tendencies in a symbol's data. Boxes The boxes on the chart represent each month's projections based on the average historical change for that month over previous years. Each box starts at the first bar of the month and spans throughout the month's duration, with a vertical range from the closing price of the previous month to the price where the month would close if the market moved according to its historical average change. Each box also displays the month's average change percentage within it. For example, suppose the current month is February, the last January bar had a closing price of 200, and the average change percentage for February over previous years was 10%. In this case, the box would span the entire month of February with a starting price of 200 and an ending price of 220 (200 + 10% of 200), and the region within the box would display "10%" to signify the expected (average) change. Users can toggle the display of the boxes in the "Style" tab of the indicator's "Settings". **NOTE:** The Heatmap displays the values available at the latest tick, whereas the boxes use values available at the bar where the indicator draws them. Consequently, the average change percentages shown in the historical boxes and the "Avgs" section of the table will differ since the boxes show historical averages and the table shows current averages. Plots This indicator includes some helpful plots that provide additional information about the historical calculations. Users can view these plotted values in the indicator's status line and the Data Window. "Expected price for current month" – The price where the month would close if the market moved according to its historical average change. "Historical average for current month" - The average change percentage for the specific month at its opening time. The month's projection box also displays this value. "Historical standard deviation for current month" – The standard deviation of change percentages for the specific month at its opening time. "No. of months used in the current average" – The number of past years' months in the average and other metric calculations at the specific month's opening time. Inputs Starting year The year when the indicator's calculations start. To gather and calculate results on all available data, set this value to any year before the symbol's first available date (e.g., 1900). Note that the box drawings will start for the year after the starting year, as the indicator requires data from at least one previous year to begin projecting average change percentages. For example, if the starting year is 2015, box drawings won't start until 2016. Positive Color The color of boxes and Heatmap cells that contain positive values. Negative Color The color of boxes and Heatmap cells that contain negative values. Color Intensity Cutoff (%) Specifies the maximum absolute percentage for the color intensity calculation. Absolute values at or above this level will have the highest intensity (opacity) in the heatmap display. For example, a cutoff value of 10% means colors become more opaque as the corresponding values approach 10%, but all values above 10% will share the same opacity. Table Position Specifies the position of the Heatmap table relative to the pane where it is drawn. By default the setting is set to "Center" an the Heatmap is anchored to the center of its pane. Changing this setting to "Left" or "Right" anchors the table to the left or the right corner of the pane, respectively. Table Width (%) The table width as a percentage of the pane where the table is located. The default value is 100, which means that the table is as wide as the pane it is on. If this value is 0, the width fits the contents of the table, and the table can be wider than the pane. Table Height (%) The table height as a percentage of the pane where the table is located. The default value is 95, which means that the table is slightly shorter than the height of the pane it is on. If this value is 0, the height fits the contents of the table, and the table can be taller than the pane. Show Averages Toggles the visibility of the "Avgs" row, which displays the average change percentages for each month based on the accumulated historical data. Show Standard Deviation Toggles the visibility of the "StDev" row, which displays the standard deviation of each month's historical change percentages. Standard deviation measures the dispersion of change percentages around their mean. Analyzing this metric can help users determine whether a month's changes tend to vary or remain more stable over successive years. Show Percent Positive Toggles the visibility of the "Pos%" row, which shows how many instances of each month over previous years had a positive change. For example, if the same month had a positive change for six years out of nine recorded, the "Pos%" ratio will be 6 / 9 * 100 = 66.67%. Ignored months Excludes specific months from the Seasonality indicator's calculations. To exclude a month, write it in the "YYYY-MM" format. Users can exclude multiple months by separating them with commas and spaces. For example, "2020-03, 2022-11" will exclude March 2020 and November 2022. Previous Previous RVT ratio, 90 days Next Next Seasonals Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43470970565/original/FK4RzFmIJSY8Rs3JhIGQLGljj5ANkShMeA.png?1709540976)

**Описание:** This TradingView image displays a **monthly performance heatmap** (likely for a trading strategy, asset, or portfolio) spanning 2015–2024, with UI elements and metrics organized in a structured grid:  


### **1. Core Grid Structure**  
- **Rows**: Years (2015–2024) + summary rows (`Avgs:`, `StDev:`, `Pos%`).  
- **Columns**: Months (Jan–Dec).  


### **2. Yearly Performance (2015–2023)**  
Each cell shows a **monthly percentage return**, color-coded:  
- **Green**: Positive return (outperformance).  
- **Red**: Negative return (underperformance).  
- **White**: No data (2024, as months beyond Jan/Feb are `NaN%`).  

Examples:  
- 2020 (strong year): Jan (+55.52%), Aug (+74.15%) (green).  
- 2022 (weak year): Dec (-36.73%) (red).  


### **3. Summary Rows**  
- **`Avgs:`**: Average monthly return (2015–2023, excluding 2024).  
  - Green = positive average (e.g., Jun: +11.60%).  
  - Red = negative average (e.g., Sep: -3.22%).  

- **`StDev:`**: Standard deviation (volatility) of monthly returns.  
  - Higher values = more volatility (e.g., Aug: 26.24, vs. Feb: 8.90).  

- **`Pos%:`**: Percentage of months with positive returns (2015–2023).  
  - Green = >50% positive (e.g., Jun: 78%, Nov: 67%).  
  - Red = <50% positive (e.g., Sep: 44%, Oct: 33%).  


### **4. UI Purpose**  
This heatmap enables quick analysis of:  
- **Trend**: Which months/years perform best/worst.  
- **Volatility**: How much returns fluctuate (via `StDev`).  
- **Consistency**: How often returns are positive (via `Pos%`).  


In short, it’s a visual tool to evaluate historical performance, volatility, and consistency across months and years.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43470976465/original/Agrhqmm3O2mnnUNJQdxJpxndR5u-OxRv5g.png?1709542438)

**Описание:** This TradingView chart displays **Advanced Micro Devices Inc (AMD)** on the NASDAQ exchange, with a 1-day (1D) time frame. Here’s a detailed breakdown of all elements:  


### **Top Header & Price Data**  
- **Title**: “Advanced Micro Devices Inc · 1D · NASDAQ” (identifies the stock, time frame, and exchange).  
- **Price Metrics**:  
  - `O 121.98` (Open), `H 122.54` (High), `L 120.79` (Low), `C 122.01` (Close) for the current session.  
  - `−0.64 (−0.52%)` (daily change: down $0.64, or 0.52%).  
- **Currency**: “USD” (dropdown, for currency selection).  


### **Left Sidebar: Price & Seasonality**  
- **Price Box**:  
  - Red box: `122.01` (current price, down $0.16).  
  - Blue box: `203.17` (likely a target or reference price).  
- **Seasonality Data**: “Seasonality 2015 10 116.98 18.76% 10.50” (historical seasonal performance: 18.76% gain over a period, with 116.98 as a baseline and 10.50 as a related metric).  
- **Expand/Collapse Arrow**: Toggles additional sidebar info.  


### **Main Chart: Candlestick Pattern**  
- **Candlesticks**: Green (up days) and red (down days) bars show price action over time.  
- **Highlighted Zones**:  
  - Large teal box (left): “18.76%” (seasonal gain, spanning Nov–early Dec 2023).  
  - Smaller teal boxes (right): “2.54%”, “2.39%”, “5.58%” (percentage gains/losses for specific price ranges).  
- **Price Levels**: Dashed horizontal lines mark key support/resistance (e.g., ~170.75, 190.00, 200.00).  


### **Bottom Timeline**  
- **Dates**: “Nov”, “13”, “Tue 28 Nov ’23”, “18”, “2024”, “16”, “Feb”, “12”, “Mar” (x-axis, showing the time range of the chart).  
- **Icons**:  
  - Left: “TV” (TradingView logo) + “E” (earnings icon, marks earnings dates).  
  - Right: “E” (earnings) + lightning bolt (volatility/alerts) + gear (settings).  


### **Right Sidebar: Price Scale & Tools**  
- **Price Axis**: Vertical numbers (90.00–200.00) show price levels.  
- **Zoom Button**: “⊕ 170.75” (zooms to a specific price range).  


### **Purpose of Elements**  
- **Candlesticks**: Visualize open, high, low, close prices for each session.  
- **Highlighted Zones**: Emphasize seasonal trends, support/resistance, or percentage changes.  
- **Seasonality Data**: Analyze historical price patterns for the same period.  
- **Icons/Buttons**: Access settings, earnings info, or zoom tools.  


This chart combines price action, seasonal analysis, and technical levels to help traders analyze AMD’s performance.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43470976593/original/eE88rPFk9y9NaVzlfaov0yXIj8HzHlS74Q.png?1709542480)

**Описание:** This TradingView image displays a **seasonality analysis widget** (likely for a financial instrument, e.g., stock or index) with the following UI elements and data:  

### Header & Context  
- **Title**: \


