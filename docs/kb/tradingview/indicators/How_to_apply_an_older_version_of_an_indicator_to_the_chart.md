# How to apply an older version of an indicator to the chart

**URL:** https://www.tradingview.com/support/solutions/43000746752-how-to-apply-an-older-version-of-an-indicator-to-the-chart/

---

- [ Help Center ](/)
- / 
- / [ How-to's and FAQ on Indicators ](/support/folders/43000547458-how-to-s-and-faq-on-indicators/)
- / [ How to apply an older version of an indicator to the chart ](/support/solutions/43000746752-how-to-apply-an-older-version-of-an-indicator-to-the-chart/)

# How to apply an older version of an indicator to the chart 
 When you add an indicator to the chart, the most recent published version of the indicator is added. You can access an indicator's past versions only if it's written in Pine Script ® and open-source. All community scripts, and some built-in scripts, are written in Pine Script.

To use an older version of an indicator, first load the indicator onto the chart and check whether the "Source code" button (curly braces `{}` icon) is visible for the indicator. If the button is present, then you can access the source code, including older versions. Select the "Source code" button to open the indicator's script in the Pine Editor:

Next, open the Pine Editor's "Manage script" dropdown menu (the arrow next to the script name in the editor's menu bar) and select "Version history":

The "Version history" panel lists the script versions in chronological order, where the first version listed is the most recent published script. The panel also displays a side-by-side or inline preview of the scripts, which highlights the differences between two script versions.

By default, script versions are identified using the date and time that they were published. You can use the search bar to find a specific version by typing the corresponding date/time. Select your desired script version, then open its "More" menu and select the "Add version to chart" option: 

The older version of the indicator appears in a new pane on the chart, differentiated by an "Update available" symbol next to the indicator's name, which signifies that a newer version is available:

Note that the original indicator you added (the one that uses the latest script version) still remains on the chart, and its respective script version also remains open in the Pine Editor, as shown by the green source code icon next to its name.

Also read:

- [TradingView social network](https://www.tradingview.com/support/solutions/43000761245-tradingview-social-network/)
- [How to read financial statements](https://www.tradingview.com/support/solutions/43000760059-how-to-read-financial-statements/)
- [Introduction to TradingView alerts](https://www.tradingview.com/support/solutions/43000520149-introduction-to-tradingview-alerts/)
- [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/)
- [TradingView screeners walkthrough](https://www.tradingview.com/support/solutions/43000718885-tradingview-screeners-walkthrough/)
 Previous Previous Why do session-based indicators occasionally extend daily sessions on US futures? Next Next 1 year active supply % Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43544296431/original/a5VHzIjuqSuwNlhBslgvWwfTlQKEFsJONg.png?1741107056

**Описание:**

This image is a **TradingView chart** displaying Microsoft Corp. (NASDAQ: MSFT) stock data on a **1-day (1D) timeframe**. Below is a detailed breakdown of all UI elements, their purposes, and what the chart shows:


### **1. Header & Stock Information**  
- **Stock Name & Exchange**: `Microsoft Corp. · 1D · NASDAQ` (identifies the company, time frame, and exchange).  
- **Price Data**: `O408.51 H409.37 L399.32 C404.00 -4.21 (-1.03%)`  
  - `O`: Opening price ($408.51).  
  - `H`: High price ($409.37).  
  - `L`: Low price ($399.32).  
  - `C`: Closing price ($404.00, in red, indicating a **down day**).  
  - `-4.21 (-1.03%)`: Daily price change (down $4.21, or 1.03% loss).  


### **2. Main Chart (Candlestick Chart)**  
- **Candlestick Bars**: Red/green bars represent daily price action:  
  - **Green candles**: Closing price > opening price (up day).  
  - **Red candles**: Closing price < opening price (down day).  
- **Price Axis (Right)**: Vertical scale from `$400.00` to `$460.00`, showing the stock’s price range.  


### **3. Volume Profile (Below Main Chart)**  
- **Bars**: Green (buying volume) and red (selling volume) bars show trading volume per day.  
- **Volume Axis (Right)**: Scale from `-20.00` to `20.00` (or `0.0000`), measuring volume intensity.  
- **Key Volume Metrics**:  
  - `Post 404.50` (blue): Likely the **post-market price** (trading after regular hours).  
  - `404.00` (red): Current closing price (matches the main chart).  
  - `-15.93` (red): Volume difference or indicator value (e.g., net volume).  


### **4. Indicator Panel (Left, Below Main Chart)**  
- **Indicator Name**: `BBP 13` (likely a custom indicator, e.g., Bollinger Bands Percent or a proprietary tool, with a period of 13).  
- **Icons**:  
  - `Eye` (visibility): Toggle indicator visibility.  
  - `Hexagon` (settings): Configure indicator parameters.  
  - `{}` (code): Edit indicator source code (labeled “Source code” in a tooltip).  
  - `Trash` (delete): Remove the indicator.  
  - `⋮⋮` (more options): Additional actions (e.g., duplicate, share).  


### **5. Chart Controls (Right, Below Main Chart)**  
- **Icons**:  
  - `Up arrow`: Expand chart (full-screen or larger view).  
  - `Trash`: Delete the chart/indicator.  
  - `X`: Close the chart/panel.  
  - `Square`: Reset zoom or toggle chart type.  


### **6. Time Axis (Bottom)**  
- **Months**: `Sep, Oct, Nov, Dec, 2025, Feb, Mar` (shows the time range of the chart, spanning late 2024 to early 2025).  


### **7. Branding**  
- `TradingView PRO` logo (bottom-left): Indicates a **TradingView Pro** (paid) subscription.  


### **Summary of What the Chart Shows**  
The chart displays Microsoft’s daily stock price (candlesticks) and volume (green/red bars) over ~6 months (Sep 2024–Mar 2025). The stock closed at $404.00, down 1.03% for the day, with visible volatility (peaks/troughs) and varying volume (green = buying, red = selling). The `BBP 13` indicator is applied to analyze price/volume behavior, and the interface includes tools to customize, edit, or manage the chart/indicator.

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43544296544/original/PzM9ee8InezSCj9x_UpcPr-fkmVPDjE33A.png?1741107090

**Описание:**

This image shows a **TradingView chart interface** displaying Microsoft Corp. (NASDAQ: MSFT) stock data with the **Bull Bear Power (BBP)** indicator loaded. Below is a detailed breakdown of all UI elements, their purposes, and the context:


### 1. **Top Header (Stock & Price Info)**  
- **Symbol & Exchange**: `Microsoft Corp. · 1D · NASDAQ`  
  - `1D` = 1-day (daily) time frame.  
- **Price Metrics**:  
  - `O 392.66` (Open), `H 392.90` (High), `L 386.57` (Low), `C 391.40` (Close).  
  - Change: `-1.13 (-0.29%)` (red = price decline).  
- **Time Stamp**: `11:45:35 UTC-5` (current time).  
- **Price Scale**: Right-side y-axis (0–460.00) for price levels.  


### 2. **Main Chart Area**  
- **Candlestick Chart**: Shows MSFT’s daily price action (green = up, red = down).  
- **Volume Histogram**: Below the candlesticks, green/red bars represent trading volume (green = buying pressure, red = selling pressure).  
- **Time Axis**: Bottom x-axis (Sep → Nov → Dec → 2025 → Feb → Mar) for date ranges.  


### 3. **Indicator Panel (Left Side)**  
- **BBP Indicator**:  
  - Label: `BBP 13` (13-period Bull Bear Power).  
  - Value: `-29.10` (red = bearish signal).  
  - `TV PRO` logo: TradingView Pro (paid) indicator.  


### 4. **Script Menu (Dropdown, Center-Left)**  
A context menu is open, showing options for managing the BBP indicator:  
- **`Save script` (Ctrl + S)**: Save the current indicator configuration.  
- **`Make a copy…`**: Duplicate the indicator to modify.  
- **`Rename…`**: Rename the indicator.  
- **`Version history…`**: View past versions of the indicator.  
- **`+ Create new`**: Build a new custom indicator.  
- **`RECENTLY USED`**: List of recently used indicators (e.g., `Bull Bear Power`, `Testing indicator versions`, `24-hour Volume`).  
- **`Open script… (Ctrl + O)`**: Load a saved indicator script.  


### 5. **Bottom Toolbar**  
- **Time Frame Buttons**: `1D` (active), `5D`, `1M`, `3M`, `6M`, `Y1` (switch chart time frames).  
- **Stock Screener**: Dropdown to filter stocks.  
- **`Replay Trading`**: Simulate past market conditions.  
- **`Trading Panel`**: Access order execution tools.  
- **`ADJ`**: Adjust for splits/dividends.  


### 6. **Indicator Editor (Bottom Section)**  
- **Indicator Name**: `~ Bull Bear Power` (locked, read-only).  
- **`Add to chart`**: Add the indicator to the chart.  
- **`Publish indicator`**: Share the indicator with the TradingView community.  
- **Warning Banner**:  
  - `! This script is read-only. To edit its code, create a working copy.` (orange icon = alert).  
- **Code Editor**:  
  - Line 1: `//@version=6` (TradingView Pine Script version).  
  - Line 2: `indicator(\

---

### Изображение 3

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43544296719/original/S0hBRBln4BYNHUA9nTjUxf0EE7X_v7xrXg.png?1741107134

**Описание:**

This image shows the **TradingView Version History** interface, which allows users to manage and compare different versions of a Pine Script indicator. Here's a detailed breakdown:


### **1. Header & Navigation**
- **Title**: \

---

### Изображение 4

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43544296793/original/odgvUL-oG22-WtQ6Gagsf075XYReMIJcmw.png?1741107156

**Описание:**

This image shows a **TradingView chart interface** displaying Microsoft Corp. (NASDAQ: MSFT) stock data with technical analysis indicators, along with a script editor panel. Here’s a detailed breakdown:


### **1. Top Header & Stock Info**  
- **Stock Title**: `Microsoft Corp. · 1D · NASDAQ` (1D = 1-day time frame, NASDAQ = exchange).  
- **Price Data**:  
  - `O392.66` (Open), `H392.90` (High), `L386.57` (Low), `C391.39` (Close).  
  - Change: `-1.14 (-0.29%)` (red = price decline).  
- **Current Price Box**: Red box on the right shows `391.39` (current price) and `04:12:51` (timestamp, likely for pre-market/extended hours).  


### **2. Chart Area**  
- **Candlestick Chart**: The main chart shows price action (green = up, red = down) over time (x-axis: months: Nov, Dec, 2025, Feb, Mar).  
- **Volume/Indicators**:  
  - **BBP 13 (Bull Bear Power)**: Two panels below the candlestick chart:  
    - *Top panel*: Histogram (green = bullish volume, red = bearish volume) with value `-29.09`.  
    - *Bottom panel*: Line graph (blue) showing the indicator’s trend, also with value `-29.09`.  


### **3. Time Frame & Timestamp**  
- **Time Frame**: `1D` (1-day) at the bottom left.  
- **Timestamp**: `11:47:07 UTC-5` (current time, UTC-5 timezone).  
- **Adjustment Button**: `ADJ` (likely for adjusting price data, e.g., splits/dividends).  


### **4. Bottom Navigation Tabs**  
Tabs for different TradingView features:  
- `Stock Screener` (dropdown), `Pine Editor` (active, blue), `Strategy Tester`, `Replay Trading`, `Trading Panel`.  


### **5. Script Editor Panel (Active)**  
- **Indicator Name**: `~ Bull Bear Power` (with a lock icon, meaning the script is read-only).  
- **Actions**:  
  - `Add to chart` (dropdown to add the indicator to other charts).  
  - `Publish indicator` (share the script publicly).  
  - `000` (menu for script options).  
- **Read-Only Warning**: Orange banner: *“This script is read-only. To edit its code, create a working copy.”*  
- **Code**:  
  - Line 1: `//@version=6` (Pine Script version).  
  - Line 2: `indicator(\

---

