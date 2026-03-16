# I'd like to learn more about Pine Profiler

**URL:** https://www.tradingview.com/support/solutions/43000725216-i-d-like-to-learn-more-about-pine-profiler/

---

- [ Help Center ](/) - / - / Pine Script® - / [ Pine Editor essentials ](/support/folders/43000591616-pine-editor-essentials/) - / [ I'd like to learn more about Pine Profiler ](/support/solutions/43000725216-i-d-like-to-learn-more-about-pine-profiler/) # I'd like to learn more about Pine Profiler What is the Pine Profiler, and how do I use it? The Pine Profiler is a powerful utility that analyzes the executions of all significant code lines and blocks in a Pine script and displays helpful performance information next to each line inside the Pine Editor. By inspecting the Profiler's results, programmers can gain a clearer perspective on a script's overall runtime, the distribution of runtime across its significant code regions, and the critical portions that may need extra attention and optimization. To profile a script with Pine Profiler, follow these steps: - Open the source code of the script in your Pine Editor. If this script is read-only, make a copy of it. - Add the script to the chart. - Click on the active "Profiler mode" button in the dropdown next to the "Publish indicator" option in the top-right corner: Once enabled, the Profiler collects information from all executions of the script's significant code regions and displays approximate runtime percentages to the left of the code lines inside the Pine Editor. Hovering over the left margin next to the lines in the Pine Editor will highlight an analyzed code region and reveal a small window with additional performance information, including the line numbers of the analyzed code, the time spent on that code compared to the script's total runtime, and the code's total number of executions: The fields the window will show depend on the analyzed code. If the profiled code is a single line, it will display three fields: "Line number", "Time", and "Executions". The results shown for the line at the start of a loop or conditional structure will show a "Code block range" field instead of "Line number", and it will include an additional "Line time" field. Note: The Pine Profiler wraps each significant line and code block with the extra calculations required to track and display performance results. Consequently, the sum of the percentages shown for all lines in the script will not sum up to 100%, and the sum of all the profiled regions' time results will be less than the script's total runtime. When a script contains at least four significant lines of code, the Profiler will include "flame" icons to the left of the top three code regions with the highest impact on runtime performance. If a high-impact code is outside the lines visible inside the Pine Editor, a "flame" icon and a number will appear at the top or bottom of the left margin. Clicking that icon will vertically scroll the Editor's view to show the nearest high-impact line: To learn more about the Profiler's features, how to interpret its results, and some tips on optimizing Pine Script™ code, see the [Profiling and optimization](https://www.tradingview.com/pine-script-docs/writing/profiling-and-optimization/) page in our Pine Script™ User Manual. Previous Previous How to create new script Next Next I want to edit Pine code on a separate page Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43589198726/original/xu_X8Lpufa7jMpG0jWlOIbgGB_6rDJMWkA.png?1761902634)

**Описание:** The image shows a **TradingView interface** (likely the Pine Script editor) with a dropdown menu open, displaying various settings and tools. Here’s a detailed breakdown:  


### 1. Top Bar Elements  
- **“Publish indicator” button**: A rounded rectangular button (top-center) for publishing custom indicators to the TradingView community.  
- **Three-dot menu icon** (top-right): Opens the dropdown menu (currently expanded).  


### 2. Dropdown Menu Sections & Items  
The menu is divided into labeled sections with UI elements:  

#### a. “Editor settings…”  
- Icon: Gear (⚙️)  
- Purpose: Access configuration options for the Pine Script editor.  


#### b. “OPEN EDITOR” Section  
- **“New window”**: Icon (window with “+”); opens the editor in a new window.  
- **“New tab”**: Icon (arrowed tab); opens the editor in a new tab.  


#### c. “DEVELOPER TOOLS” Section  
- **“Profiler mode”** (highlighted with a red box):  
  - Toggle switch (right): Enabled (black/white, indicating “on”).  
  - Question mark icon: Tooltip for “Profiler mode” (explains its function).  
  - Purpose: Enables performance profiling for Pine Script code (measures execution speed, resource usage).  
- **“Pine logs”**: Question mark icon (tooltip); accesses logs for debugging Pine Script.  


#### d. Other Menu Items  
- **“Release notes”**: Icon (external link); links to TradingView’s release updates.  
- **“Help”**: Arrow (→); navigates to help documentation.  


### 3. Partial UI (Bottom-Left)  
- Text: `... 1000)` (likely part of a code editor or status bar, showing line count or code context).  


### Purpose of the Interface  
This menu provides tools for **custom indicator development** in TradingView’s Pine Script editor, including settings, window/tab management, and developer utilities (like profiling for optimization). The “Profiler mode” toggle is emphasized, highlighting its role in debugging/performance tuning.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43485518943/original/Racy7CaoM0IO8obLyTH3V7g-IowDmpeOHA.png?1715697079)

**Описание:** The image shows a **TradingView code editor interface** with a **performance profiling tooltip** overlaid. Here’s a detailed breakdown:  


### 1. **Code Editor Area**  
- **Syntax Highlighted Code**: Lines 85–93 display a programming method (`delete(pivotGraphic graphic)`) and related logic (e.g., `graphic.pivotLine.delete()`, `timeframe.change()` calls). Keywords like `method`, `delete`, and class names (`pivotGraphic`) are color-coded (blue for keywords, green for parameters, etc.).  
- **Line Numbers**: Visible on the left (85, 86, 91, 92, 93) to identify code positions.  


### 2. **Performance Profiling Tooltip**  
A semi-transparent tooltip (likely from a profiling tool) displays:  
- **Line Number**: `91` (the code line being profiled).  
- **Time**: `14% (67ms from 476.9ms total)` – Indicates this line accounts for 14% of the total execution time (67ms out of 476.9ms).  
- **Executions**: `21902` – How many times this line ran.  


### 3. **UI Elements & Context**  
- **Left Sidebar (Partial)**: Shows percentage values (e.g., `0.4%`, `0.5%`, `2.9%`, `14%`) – Likely a **performance breakdown** (e.g., time spent per line/function).  
- **Purpose**: The tooltip helps identify **performance bottlenecks** in the code (e.g., optimizing the `delete` method or `timeframe.change()` calls).  


This interface is used for debugging/tracing code performance in a TradingView Pine Script or similar environment, focusing on optimizing execution speed.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43485519729/original/NOBASdK4VkVaQ7Is_bN4adsgTSRXpeGocw.gif?1715697199)

