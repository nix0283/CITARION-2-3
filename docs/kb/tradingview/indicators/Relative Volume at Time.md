# Relative Volume at Time

**URL:** https://www.tradingview.com/support/solutions/43000705489-relative-volume-at-time/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Relative Volume at Time ](/support/solutions/43000705489-relative-volume-at-time/) # Relative Volume at Time Definition Volume is the total amount of assets traded within a specific period of time. The Relative Volume at Time indicator compares the regular or cumulative volume at a particular moment within a period to its average over similar historical time points. This comparison helps identify uncharacteristically large fluctuations in trading activity relative to historical expectations at a given time. Calculation To understand the logic behind this indicator, one should first understand how it chooses the data points for its calculations. The indicator checks the time offset between the current bar and the start (anchor) of the most recent period, then selects the bars with corresponding time differences from a specified number of historical anchors. The indicator calculates the average volume using the selected data points from each period. The "Anchor Timeframe" input defines the size of each period. A new period begins whenever a new bar opens on the specified timeframe. The "Length" input governs the number of periods the indicator includes in its average. For example, suppose the Anchor Timeframe is one day, the Length is 5, and the chart uses the 30m timeframe. In this scenario, let's say each period starts at 9:30, and let's say the current time is 12:15, meaning the most recent bar's opening time is 12:00. In this case, the indicator will calculate the time offset of the last bar from the start of the current period (12:00 - 9:30 = 2 hours and 30 minutes), then find all bars over the last five days that opened 2.5 hours after the start of their respective periods. After that, it will calculate the average volume from these bars and plot the ratio of the current volume value to this average value on the chart, i.e., current volume divided by average volume. The last setting, Calculation Mode, controls the type of volume used in the calculation: - With Cumulative (by default), the indicator uses the total volume accumulated since the last period anchor. In the context of the example above, it would calculate the total volume in the current period from 9:30 to 12:15 and the average volume accumulation from 9:30-12:30 over five days. - With Regular, the indicator uses the non-cumulative volume at the time offset. The example above would use the value from the current 12:00 bar and calculate the historical average of corresponding values over five days. Note the current value will be lower than it should be in both cases, as the most recent bar is not yet closed. The difference is less significant when using Cumulative mode, especially on a period's latter bars, as the value on a bar represents the volume accumulated up to that point within the period. Switching to a lower timeframe can help improve the fidelity of the calculation by decreasing the time that the current bar remains open. If a historical period does not have a bar at a specific offset from its anchor, the indicator will use the last available bar before that offset in its calculations. Inputs Anchor Timeframe Specifies the size of the period used in the Relative Volume calculation, as described in the Calculation section above. If the "Anchor Timeframe" value is less than or equal to the chart's timeframe, the period will reset on every chart bar, which means the indicator will only use the last N bars in its calculation (where N is the "Length" value). Length Specifies the number of historical periods used in the average volume calculation at the current time point. Calculation Mode Specifies the type of volume used in the calculation. If Cumulative, the indicator uses accumulated volume from the beginning of each period. If Regular, it uses non-cumulative volume. Previous Previous Relative Volatility Index Next Next Rob Booker - ADX Breakout Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582890133/original/ozd6rCI2nj2Y4Y2HClNAcL72oPGA9E0OMw.png?1758891731)

**Описание:** This TradingView interface displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with a **RelVol (Relative Volume) indicator** configuration dialog open. Here’s a detailed breakdown:  


### 1. **Top Toolbar**  
- **Left Icons**: Zoom (±), Timeframe (D), Indicators, Alert, Replay, Undo/Redo, and TradingView logo.  
- **Right Icons**: Currency (USD), Publish, and tools (chart, time, patterns, chat, etc.).  


### 2. **Chart Header**  
- **Symbol/Timeframe**: *“Apple Inc · 1D · NASDAQ”* (1-day candlestick chart).  
- **Price Data**: *“O253.21 H257.17 L251.71 C256.87 +4.56 (+1.81%)”* (Open, High, Low, Close, and daily change).  


### 3. **Main Chart Area**  
- **Candlestick Chart**: Green/red candles show price action (green = close > open; red = close < open).  
- **Volume Bars**: Green (up days) and red (down days) bars below the candlestick chart, with blue dots marking volume extremes.  


### 4. **RelVol Indicator Dialog (Center)**  
A pop-up for configuring the *Relative Volume* indicator:  
- **Tabs**: *Inputs* (active), *Style*, *Visibility*.  
- **Settings**:  
  - *Anchor Timeframe*: Dropdown (set to “1 day”).  
  - *Length*: Input field (set to “10”).  
  - *Calculation Mode*: Dropdown (set to “Cumulative”).  
  - *Adjust Unconfirmed*: Checkbox (enabled).  
  - *Inputs in status line*: Checkbox (enabled).  
- **Buttons**: *Defaults* (dropdown), *Cancel*, *Ok*.  


### 5. **Bottom Toolbar**  
- **Timeframe Buttons**: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All (select chart period).  
- **Date Range**: *“May”* to *“Feb 2026”* (x-axis labels).  
- **Status Bar**: *“09:01:45 UTC-4”* (timestamp) and *“ADJ”* (adjusted data).  


### 6. **Right Sidebar**  
- **Tools**: Chart, time, patterns, chat, and other analysis icons.  
- **Relative Volume Ratio**: Red box showing *“0.8181”* (current relative volume value).  


### 7. **Additional Elements**  
- **Indicator Label**: *“RelVol 1D 10 Cumulative”* (below the candlestick chart, with visibility/style/edit icons).  
- **Pine Editor/Trading Panel**: Tabs at the bottom for script editing and trading tools.  


This layout is typical for technical analysis, with the RelVol dialog allowing customization of volume-based indicator parameters to assess trading volume relative to historical averages.


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

