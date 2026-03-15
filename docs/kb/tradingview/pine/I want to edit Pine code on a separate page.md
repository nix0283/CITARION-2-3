# I want to edit Pine code on a separate page

**URL:** https://www.tradingview.com/support/solutions/43000660019-i-want-to-edit-pine-code-on-a-separate-page/

---

- [ Help Center ](/) - / - / Pine Script® - / [ Pine Editor essentials ](/support/folders/43000591616-pine-editor-essentials/) - / [ I want to edit Pine code on a separate page ](/support/solutions/43000660019-i-want-to-edit-pine-code-on-a-separate-page/) # I want to edit Pine code on a separate page When coding with Pine Script®, you often need space to both see your code and the chart where it runs. The default Pine Editor is displayed under the chart, which, depending on your screen, might not be too convenient — making viewing your work awkward. For this reason, and because of your feedback, we developed the detach mode. To open the Pine Editor on in a detached mode, you need to: - Click the "More" button (three dots) in the top right corner of the Pine Editor. - Select either "New window" or "New tab". Whenever you open the detached tab or window from a chart, it maintains a link to that chart, allowing you to add and update scripts from the detached page. The status of the link can be found in the status line in the bottom right corner of the editor. Hovering over it further explains what it means, and what can be done to restore the link if that is possible. The version of the script open in the detached editor is highlighted by a special symbol on the chart. You can also use the full [Pine Logs](https://www.tradingview.com/support/solutions/43000710876/) functionality in the detached editor, provided the editor is tied to a chart and the script is added to that chart. Simply click on the "Pine Logs" button in the More menu to open the panel. The Pine Logs menu will be populated with logs, provided that the script you are working with uses them. Previous Previous I'd like to learn more about Pine Profiler Next Next Script or strategy gives different results after refreshing the page (repainting) Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43590451061/original/Pkg44svzHERzdiQ1Mg3T6fl2aosyotTFoA.png?1762503907)

**Описание:** This TradingView image displays a **dropdown menu** (likely triggered by a \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43543606123/original/PXJayrW33Qz_nKBZtj5cOiVNUCaJbN9EFA.png?1740736638)

**Описание:** This image shows a **TradingView Pine Script™ v6 code editor** with a notification banner. Here’s a detailed breakdown:  


### 1. Code Editor Section  
The top portion displays Pine Script code (a programming language for TradingView indicators/strategies):  
- **Function Call**: `requestPastCloses(timeframesArray, symbol, close)` (retrieves historical closing prices for multiple timeframes).  
- **Styling/Formatting**: `bgcolor = neutralColor, text_color = chart.fg_color, width = cellWidth, height` (defines background color, text color, and cell dimensions).  
- **Input Definition**: `Input, color.new(cellColorBase, LOW_TRANSP), color.new(cellColorBase, HEAVY_TRAN` (creates a user input with custom colors, likely for visual customization).  
- **Date Format**: `MMM YYYY\


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43543606159/original/mhLpet_BQoT-WqmVxavRDmDAT2luv2YFQQ.png?1740736648)

**Описание:** This TradingView image displays a **Performance table** (top-left header) with a modal dialog overlay. Here’s a detailed breakdown:  


### 1. **Modal Dialog (Foreground)**  
A white popup titled *“Opened in detached editor”* (with a code-bracket icon) explains:  
- Text: *“The source code of this script version is open in the detached Pine Editor.”*  
- Button: *“Go to editor”* (gray, clickable, to navigate to the Pine Editor).  


### 2. **Performance Table (Background)**  
The table tracks performance metrics for assets, with:  
- **Columns**: Timeframes (`1W` = 1 Week, `1M` = 1 Month, `3M` = 3 Months) and a partial month column (leftmost, e.g., “Apr”).  
- **Rows**: Assets (e.g., *Apple*, *Amazon.com*, *Euro/US Dollar*, *-mini S&P 500 Future*, *E…n / U.S. dollar*).  
- **Performance Values**:  
  - Green (positive): *Apple* (1.01% 3M), *Amazon.com* (1.46% 3M).  
  - Red (negative): *Euro/US Dollar* (-1.46% 3M), *-mini S&P 500 Future* (-2.53% 1W, -3.62% 1M, -2.90% 3M), *E…n / U.S. dollar* (-11.95% 1W, -16.44% 1M, -11.52% 3M).  


### 3. **UI Elements**  
- **Header**: *“Performance”* (top-left) with a code-bracket icon (likely for script settings).  
- **Timeframe Tabs**: `1W`, `1M`, `3M` (gray headers, indicating active performance periods).  
- **Asset Names**: Leftmost column (e.g., “Apple”, “Amazon.com”) with partial truncation (e.g., “E…n” for “Ethereum”).  


### Purpose  
The table visualizes asset performance over 1-week, 1-month, and 3-month periods. The modal informs the user that the script’s source code is open in a separate Pine Editor, with a button to access it. Red/green colors denote negative/positive performance, aiding quick trend identification.


