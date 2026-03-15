# I'd like to learn more about Pine Profiler

**URL:** https://www.tradingview.com/support/solutions/43000725216-i-d-like-to-learn-more-about-pine-profiler/

---

- [ Help Center ](/)
- / 
- / Pine Script® 
- / [ Pine Editor essentials ](/support/folders/43000591616-pine-editor-essentials/)
- / [ I'd like to learn more about Pine Profiler ](/support/solutions/43000725216-i-d-like-to-learn-more-about-pine-profiler/)

# I'd like to learn more about Pine Profiler 

#### 

#### What is the Pine Profiler, and how do I use it? 
 The Pine Profiler is a powerful utility that analyzes the executions of all significant code lines and blocks in a Pine script and displays helpful performance information next to each line inside the Pine Editor. By inspecting the Profiler's results, programmers can gain a clearer perspective on a script's overall runtime, the distribution of runtime across its significant code regions, and the critical portions that may need extra attention and optimization.

To profile a script with Pine Profiler, follow these steps:

- Open the source code of the script in your Pine Editor. If this script is read-only, make a copy of it.
- Add the script to the chart.
- Click on the active "Profiler mode" button in the dropdown next to the "Publish indicator" option in the top-right corner: 

Once enabled, the Profiler collects information from all executions of the script's significant code regions and displays approximate runtime percentages to the left of the code lines inside the Pine Editor.

Hovering over the left margin next to the lines in the Pine Editor will highlight an analyzed code region and reveal a small window with additional performance information, including the line numbers of the analyzed code, the time spent on that code compared to the script's total runtime, and the code's total number of executions:

The fields the window will show depend on the analyzed code. If the profiled code is a single line, it will display three fields: "Line number", "Time", and "Executions". The results shown for the line at the start of a loop or conditional structure will show a "Code block range" field instead of "Line number", and it will include an additional "Line time" field.

Note: The Pine Profiler wraps each significant line and code block with the extra calculations required to track and display performance results. Consequently, the sum of the percentages shown for all lines in the script will not sum up to 100%, and the sum of all the profiled regions' time results will be less than the script's total runtime. 

When a script contains at least four significant lines of code, the Profiler will include "flame" icons to the left of the top three code regions with the highest impact on runtime performance. If a high-impact code is outside the lines visible inside the Pine Editor, a "flame" icon and a number will appear at the top or bottom of the left margin. Clicking that icon will vertically scroll the Editor's view to show the nearest high-impact line:

To learn more about the Profiler's features, how to interpret its results, and some tips on optimizing Pine Script™ code, see the [Profiling and optimization](https://www.tradingview.com/pine-script-docs/writing/profiling-and-optimization/) page in our Pine Script™ User Manual.
 Previous Previous How to create new script Next Next I want to edit Pine code on a separate page Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43589198726/original/xu_X8Lpufa7jMpG0jWlOIbgGB_6rDJMWkA.png?1761902634

**Описание:**

This image shows a **dropdown menu** from the TradingView interface, likely accessed via a \

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43485518943/original/Racy7CaoM0IO8obLyTH3V7g-IowDmpeOHA.png?1715697079

**Описание:**

The image provided is **not a TradingView interface**—it is a screenshot of a **code editor or profiling tool** (likely from a development environment like VS Code, WebStorm, or a similar IDE) displaying a code snippet with performance profiling data. Below is a detailed breakdown of the elements shown:


### 1. **Code Snippet & Syntax**  
The visible code is written in a language resembling **JavaScript/TypeScript** (evidenced by syntax like `method`, arrow functions `=>`, and method calls like `graphic.pivotLine.delete()`). Key lines include:  
- Line 85: `method delete(pivotGraphic graphic) =>` (defines a method named `delete` that takes a `pivotGraphic` parameter).  
- Line 86: `graphic.pivotLine.delete()` (calls the `delete()` method on the `pivotLine` property of the `graphic` object).  
- Line 91: `localPivotTimeframeChange = timeframe.change(pivotTime` (assigns a value to `localPivotTimeframeChange` using a `timeframe.change()` method, with the line truncated).  
- Line 92: `securityPivotTimeframeChange = timeframe.change(timef` (similar assignment, also truncated).  


### 2. **Profiling/Performance Overlay**  
A pop-up window (likely from a **code profiler** or **debugger**) overlays the code, displaying performance metrics:  
- **Line number**: `91` (indicates the line being profiled).  
- **Time**: `14% (67ms from 476.9ms total)` (this line accounts for 14% of the total execution time, with 67ms spent on it out of a total 476.9ms).  
- **Executions**: `21902` (the line was executed 21,902 times).  


### 3. **UI Elements & Context**  
- **Line Numbers**: Visible on the left (e.g., 85, 86, 91, 92, 93) to identify code positions.  
- **Syntax Highlighting**: Different colors for keywords (`method`, `delete`), variables (`graphic`, `pivotGraphic`), and method calls (e.g., `graphic.pivotLine.delete()`).  
- **Percentage Indicators** (left sidebar): Values like `0.4%`, `0.5%`, `14%`, `2.9%` (likely profiling metrics for other lines, showing their relative execution time).  


### 4. **Purpose of Elements**  
- **Code Editor**: Used to write/edit the code (e.g., a trading algorithm or indicator, given references to `pivotGraphic` and `timeframe`).  
- **Profiler Overlay**: Helps developers optimize code by identifying slow-running lines (e.g., line 91 is a bottleneck, taking 14% of total time).  


### Why This Isn’t TradingView  
TradingView is a **charting platform** for financial markets, with UI elements like charts, indicators, order panels, and toolbars. This image shows a **code editor/profiler**, which is unrelated to TradingView’s interface. The content (code, profiling data) suggests it’s from a development environment, not a trading platform.


In summary, the image depicts a code editor with profiling data for a programming project (possibly related to trading logic, given terms like `pivotGraphic` and `timeframe`), not a TradingView interface.

---

### Изображение 3

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43485519729/original/NOBASdK4VkVaQ7Is_bN4adsgTSRXpeGocw.gif?1715697199

**Описание:**

Image could not be processed

---

