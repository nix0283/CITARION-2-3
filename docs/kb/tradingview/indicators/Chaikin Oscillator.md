# Chaikin Oscillator

**URL:** https://www.tradingview.com/support/solutions/43000501979-chaikin-oscillator/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Chaikin Oscillator ](/support/solutions/43000501979-chaikin-oscillator/) # Chaikin Oscillator Definition The [Chaikin Oscillator](https://www.tradingview.com/scripts/chaikinoscillator/) is, at its core, an indicator of an indicator. The Chaikin Oscillator takes Accumulation/Distribution (ADL) and applies two Exponential Moving Averages of varying length to the line. The Chaikin Oscillator's value is then derived by subtracting the longer term EMA of the ADL from the shorter term EMA of the ADL. Ultimately this serves as a way to measure the momentum of the ADL by plotting a line which fluctuates between positive and negative values. Being aware of changes in momentum can help a trader or technical analyst to anticipate trend changes since changes in momentum often precede changes in trend. History The Chaikin Oscillator technical indicator was created by famed stock analyst Marc Chaikin. The Chaikin Oscillator has become closely related to two of Chaikin’s other famous indicators; Chaikin Money Flow and Accumulation/Distribution (ADL). Calculation There are four steps in calculating The Chaikin Oscillator (this example is for a (3,10) Period): 1. Find the Money Flow Multiplier [(Close - Low) - (High - Close)] /(High - Low) = Money Flow Multiplier 2. Calculate Money Flow Volume Money Flow Multiplier x Volume for the Period = Money Flow Volume 3. Determine ADL Previous ADL + Current Period Money Flow Volume = ADL 4. Apply EMA (user defined periods) to the ADL to generate the Chaikin Oscillator (3-day EMA of ADL) - (10-day EMA of ADL) = Chaikin Oscillator The basics Chaikin believed that buying and selling pressures could be determined by where a period closes in relation to its high/low range. If the period closes in the upper half of the range, then buying pressure is higher and if the period closes in the lower half of the range, then selling pressure is higher. This is what the Money Flow Multiplier determines (step 1 in the calculation above). The Money Flow Multiplier is the key to all of Chaikin's technical analysis tools. Money Flow Multiplier determines The Money Flow Volume, which in turn determines the direction of the ADL, which ultimately determines the direction and value of The Chaikin Oscillator. As previously mentioned, The Chaikin Oscillator calculates a value that fluctuates between positive and negative values. - When The Chaikin Oscillator's value is above 0, ADL's momentum and therefore buying pressure is higher. - When The Chaikin Oscillator's value is below 0, ADL's momentum and therefore selling pressure is higher. What to look for Crosses When The Chaikin Oscillator crosses the Zero Line, this can be an indication that there is an impending trend reversal. Bullish Crosses occur when The Chaikin Oscillator crosses from Below the Zero Line to Above the Zero Line. Price then rises. Bearish Crosses occur when The Chaikin Oscillator crosses from Above the Zero Line to Below the Zero Line. Price then falls. Divergence Chaikin Oscillator Divergence occurs when there is a difference between what price action is indicating and what The Chaikin Oscillator is indicating. These differences can be interpreted as an impending reversal. Bullish Chaikin Oscillator Divergence is when price makes a new low but the Chaikin Oscillator makes a higher low. Bearish Chaikin Oscillator Divergence is when price makes a new high but the Chaikin Oscillator makes a lower high. Summary Chaikin Oscillator is an indicator of an indicator. It uses Accumulation/Distribution (ADL) and takes it a step further. The ADL measure buying/selling pressure and the Chaikin Oscillator adds in the element of momentum. Because momentum often precedes changes in price or trend, it should always be taken into consideration by technical analysts when possible. However, like with most indicators, The Chaikin Oscillator is at its best when it is not used as a stand-alone technical indicator but in conjunction with additional indicators and chart analysis. Inputs Fast Length The time period to be used in calculating the shorter term EMA. Slow Length The time period to be used in calculating the longer term EMA. Style Chaikin Oscillator Can toggle the visibility of the Chaikin Oscillator Line as well as the visibility of a price line showing the actual current value of The Chaikin Oscillator. Can also select The Chaikin Oscillator Line's color, line thickness and visual type (Line is the default). Zero Can toggle the visibility of the Zero Line. Can also select the Zero Line's value, color, line thickness and visual type (Dashes are the default). Precision Sets the number of decimal places to be left on the indicator's value before rounding up. The higher this number, the more decimal points will be on the indicator's value. Previous Previous Chaikin Money Flow (CMF) Next Next Chande Kroll Stop Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43586531557/original/TRzTi_vUzwmjEIt-gQqmk6ehRxj0u9SjVg.png?1760614270)

**Описание:** This TradingView screenshot displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with the Chaikin Oscillator indicator configuration open. Here’s a detailed breakdown:  


### **Top Bar & Symbol Info**  
- **Left**: “AAPL” (symbol), “1D” (timeframe), “4h” (dropdown for timeframe selection), and icons for indicators, alerts, replay, and navigation.  
- **Symbol Details**: `Apple Inc · 1D · NASDAQ` with price data: *Open (O) 249.49, High (H) 251.82, Low (L) 247.47, Close (C) 249.34, +1.57 (+0.63%)*.  
- **Right**: “USD” (currency), “200.00” (price scale), and icons for notes, history, alerts, chat, and publishing.  


### **Main Chart Area**  
- **Candlestick Chart**: Shows price action (green = up, red = down) over months (May–Nov).  
- **Chaikin Oscillator (Sub-chart)**: Below the main chart, a pink line (oscillator) with blue dots (likely signal points) and a dashed zero line. The current value is `-5.99M` (bottom-right).  


### **Chaikin Oscillator Settings Popup**  
A modal window configures the Chaikin Oscillator:  
- **Tabs**: *Inputs* (active), *Style*, *Visibility*.  
- **Inputs**:  
  - `Fast Length`: 3 (input field).  
  - `Slow Length`: 10 (input field).  
- **Calculation**:  
  - `Timeframe`: “Chart” (dropdown).  
  - Checkbox: *Wait for timeframe closes* (enabled).  
- **Input Values**:  
  - Checkbox: *Inputs in status line* (enabled).  
- **Buttons**: *Defaults* (dropdown), *Cancel*, *Ok*.  


### **Left Sidebar**  
Icons for tools (draw, trend lines, Fibonacci, text, indicators, etc.), account (lock, eye), and global (globe, trash, star).  


### **Bottom Bar**  
- **Timeframe Buttons**: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, *All* (selected), and a calendar icon.  
- **Timestamp**: `14:30:37 UTC+3`.  
- **Tabs**: *Pine Editor* (for scripts), *Trading Panel*.  


### **Purpose**  
The interface is used for **technical analysis**: the main chart tracks price, the Chaikin Oscillator (a momentum indicator) analyzes volume flow, and the settings popup customizes the indicator’s parameters. The layout supports charting, indicator configuration, and trading workflows.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43586531673/original/kC2GbOzsHDdpKlxRpNkFNeJm39JYvpPMuw.png?1760614300)

**Описание:** This TradingView chart displays **Apple Inc. (NASDAQ)** on a **1-day (1D)** timeframe, with the current price at **$249.34** (up +$1.57, +0.63%). The interface includes:  


### **Top Bar**  
- **Left**: Zoom (+/-), timeframe selector (4h), and indicators/alerts buttons.  
- **Center**: “Indicators” (dropdown), “Alert,” “Replay,” and navigation arrows.  
- **Right**: “TradingView” dropdown, M/M/S toggles, refresh, settings, screenshot, and “Publish” button.  


### **Chart Area**  
- **Main Candlestick Chart**: Shows price action (green/red candles) with a y-axis (USD, 180–260 range).  
- **Chaikin Oscillator (Sub-chart)**: Below the main chart, displaying a pink line (momentum indicator) with a y-axis (–120M to 80M). A tooltip shows “Chaikin Oscillator –5.99M.”  


### **Chaikin Oscillator Settings Popup**  
Open to configure the indicator:  
- **Tabs**: *Inputs* (active), *Style*, *Visibility*.  
- **Style Options**:  
  - *Chaikin Oscillator*: Checked, with a pink line style.  
  - *Zero*: Checked, with a gray dashed line (value “0”).  
- **Output Values**:  
  - *Precision*: “Default” dropdown.  
  - *Labels on price scale* / *Values in status line*: Both checked.  
- **Buttons**: “Defaults” (dropdown), “Cancel,” “Ok.”  


### **Left Sidebar**  
Icons for drawing tools (lines, shapes), text, indicators, and account settings.  


### **Bottom Bar**  
- **Timeframe Tabs**: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All (with a calendar icon).  
- **Timestamp**: “14:30:45 UTC+3” and “ADJ” (adjusted data).  
- **Tabs**: “Pine Editor” (for scripts) and “Trading Panel.”  


### **Right Sidebar**  
Icons for notes, clock, depth, chat, and other tools.  


This layout enables technical analysis, indicator customization, and real-time market monitoring.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

