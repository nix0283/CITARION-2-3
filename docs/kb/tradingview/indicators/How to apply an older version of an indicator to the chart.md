# How to apply an older version of an indicator to the chart

**URL:** https://www.tradingview.com/support/solutions/43000746752-how-to-apply-an-older-version-of-an-indicator-to-the-chart/

---

- [ Help Center ](/) - / - / [ How-to's and FAQ on Indicators ](/support/folders/43000547458-how-to-s-and-faq-on-indicators/) - / [ How to apply an older version of an indicator to the chart ](/support/solutions/43000746752-how-to-apply-an-older-version-of-an-indicator-to-the-chart/) # How to apply an older version of an indicator to the chart When you add an indicator to the chart, the most recent published version of the indicator is added. You can access an indicator's past versions only if it's written in Pine Script ® and open-source. All community scripts, and some built-in scripts, are written in Pine Script. To use an older version of an indicator, first load the indicator onto the chart and check whether the "Source code" button (curly braces `{}` icon) is visible for the indicator. If the button is present, then you can access the source code, including older versions. Select the "Source code" button to open the indicator's script in the Pine Editor: Next, open the Pine Editor's "Manage script" dropdown menu (the arrow next to the script name in the editor's menu bar) and select "Version history": The "Version history" panel lists the script versions in chronological order, where the first version listed is the most recent published script. The panel also displays a side-by-side or inline preview of the scripts, which highlights the differences between two script versions. By default, script versions are identified using the date and time that they were published. You can use the search bar to find a specific version by typing the corresponding date/time. Select your desired script version, then open its "More" menu and select the "Add version to chart" option: The older version of the indicator appears in a new pane on the chart, differentiated by an "Update available" symbol next to the indicator's name, which signifies that a newer version is available: Note that the original indicator you added (the one that uses the latest script version) still remains on the chart, and its respective script version also remains open in the Pine Editor, as shown by the green source code icon next to its name. Also read: - [TradingView social network](https://www.tradingview.com/support/solutions/43000761245-tradingview-social-network/) - [How to read financial statements](https://www.tradingview.com/support/solutions/43000760059-how-to-read-financial-statements/) - [Introduction to TradingView alerts](https://www.tradingview.com/support/solutions/43000520149-introduction-to-tradingview-alerts/) - [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/) - [TradingView screeners walkthrough](https://www.tradingview.com/support/solutions/43000718885-tradingview-screeners-walkthrough/) Previous Previous Why do session-based indicators occasionally extend daily sessions on US futures? Next Next 1 year active supply % Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43544296431/original/a5VHzIjuqSuwNlhBslgvWwfTlQKEFsJONg.png?1741107056)

**Описание:** This TradingView chart displays **Microsoft Corp. (NASDAQ)** on a **1-day (1D)** timeframe. Here’s a detailed breakdown of its elements:  


### 1. **Header & Ticker Info**  
- **Ticker**: “Microsoft Corp. · 1D · NASDAQ” identifies the stock, time frame, and exchange.  
- **Price Data**: “O408.51 H409.37 L399.32 C404.00 -4.21 (-1.03%)” shows:  
  - Open (O): $408.51, High (H): $409.37, Low (L): $399.32, Close (C): $404.00.  
  - Daily change: -$4.21 (-1.03% decline).  


### 2. **Candlestick Chart (Top Panel)**  
- **Candles**: Red/green bars represent daily price action (red = close < open; green = close > open).  
- **Y-Axis (Right)**: Price scale (400.00–460.00) for the stock’s price.  


### 3. **Volume Profile (Bottom Panel)**  
- **Bars**: Green (up days) and red (down days) bars show trading volume.  
- **Y-Axis (Right)**: Volume scale (0.0000–20.00, likely in millions).  
- **Key Value**: Red box “-15.93” (net volume or indicator value).  


### 4. **UI Controls & Indicators**  
- **Indicator Label**: “BBP 13” (likely a custom indicator, e.g., Bollinger Bands Percent or similar).  
- **Icons (Left)**:  
  - Eye (visibility), hexagon (indicator settings), braces (code), trash (delete), “…” (more options).  
- **Icons (Right)**:  
  - Up arrow (expand), trash (delete), “×” (close), square (reset).  


### 5. **Additional Elements**  
- **“Source code” Tooltip**: Hover text for the indicator’s code.  
- **“Post” Box**: Blue/red boxes show “404.50” (likely a trade price) and “404.00” (current close).  
- **Time Axis (Bottom)**: Months (Sep–Mar) mark the chart’s time range (including 2025).  
- **“TV PRO” Logo**: TradingView Pro branding.  


This layout combines price action (candles), volume, and custom indicators to analyze Microsoft’s stock performance over months.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43544296544/original/PzM9ee8InezSCj9x_UpcPr-fkmVPDjE33A.png?1741107090)

**Описание:** This TradingView image displays a **Microsoft Corp. (NASDAQ)** stock chart with the following elements:  


### 1. **Header & Stock Info**  
- **Title**: *“Microsoft Corp. · 1D · NASDAQ”* (1D = 1-day timeframe).  
- **Price Data**: `O392.66 H392.90 L386.57 C391.40 -1.13 (-0.29%)` (Open, High, Low, Close, change, % change).  
- **Time/UTC**: `11:45:35 UTC-5` (current time).  


### 2. **Chart Area**  
- **Candlestick Chart**: Shows price action (green = up, red = down) over months (Sep → Mar 2025).  
- **Volume Histogram**: Below the candlestick chart, green/red bars represent trading volume (green = bullish, red = bearish).  
- **Indicator**: *“Bull Bear Power (BBP)”* is active, showing a value of `-29.10` (bearish signal, as it’s negative).  


### 3. **Timeframe Selector**  
- Buttons: `1D 5D 1M 3M 6M YTD` (1-day, 5-day, 1-month, etc.) to adjust the chart’s time range.  


### 4. **Script Menu (Dropdown)**  
A menu is open, offering options to manage the *Bull Bear Power* indicator:  
- `Save script` (Ctrl+S): Save changes.  
- `Make a copy...`: Duplicate the script.  
- `Rename...`: Rename the script.  
- `Version history...`: View past versions.  
- `Create new`: Make a new script.  
- `Recently Used`: Lists saved scripts (e.g., *“Bull Bear Power”*, *“Testing indicator versions”*, *“24-hour Volume”*).  
- `Open script...` (Ctrl+O): Load a script.  


### 5. **Bottom Panel (Script Editor)**  
- **Indicator Info**: *“~ Bull Bear Power”* (locked, read-only).  
- **Warning**: *“This script is read-only. To edit its code, create a working copy.”* (orange alert).  
- **Code Snippet**: Shows the indicator’s code:  
  ```javascript
  //@version=6
  indicator(\


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43544296719/original/S0hBRBln4BYNHUA9nTjUxf0EE7X_v7xrXg.png?1741107134)

**Описание:** This TradingView \


