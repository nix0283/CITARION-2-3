# Stochastic Momentum Index (SMI)

**URL:** https://www.tradingview.com/support/solutions/43000707882-stochastic-momentum-index-smi/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Stochastic Momentum Index (SMI) ](/support/solutions/43000707882-stochastic-momentum-index-smi/) # Stochastic Momentum Index (SMI) The Stochastic Momentum Index (SMI) is an enhanced version of the regular stochastic oscillator, designed to be a more reliable indicator that minimizes false swings by measuring the distance between the current closing price and the median of the high/low price range. On TradingView, the indicator shows both the SMI and the EMA calculated based on it. SMI values typically fall within the range of +100 to -100, with positive values indicating that the closing price is higher than the midpoint of the high/low range. In contrast, negative values signal that the closing price is lower than the midpoint. Like the stochastic oscillator, traders and analysts use the SMI to identify overbought or oversold conditions in the market. Additionally, when combined with volume indicators, it reveals the presence of significant buying or selling pressure in the momentum. Additionally, it can be used for trend analysis, with values above 40 often interpreted as signs of a bullish trend and values below -40 as bearish. Calculation First, we calculate the highest and lowest values in the window (defined by the "%K Length" input in the indicator settings). We subtract their average from the current close to get the "relativeRange" of those values: highestLowestRange = highestHigh - lowestLow relativeRange = close - (highestHigh + lowestLow) / 2 After that, we calculate the SMI value, which can be calculated with the following formula: smi = 200 * (emaEma(relativeRange, lengthD) / emaEma(highestLowestRange, lengthD)) Where 'lengthD' is the value from the "%D Length" input in the indicator's settings, and "emaEma" is an Exponential Moving Average of an Exponential Moving Average (both calculated with the same length): emaEma(source, length) =&gt; ta.ema(ta.ema(source, length), length) Inputs %K Length Number of bars back (window) to be used in calculating highest high and lowest low. 10 is the default. %D Length Number of bars back (window) to be used in calculating SMI. 3 is the default. EMA Length Determines the number of bars back (window) to be used in calculating the SMI-based EMA. Timeframe Specifies the timeframe that the indicator is calculated on. This option allows calculating SMI based on data from another timeframe, e.g. having SMI calculated on a 1H chart be displayed on a 5m chart., Wait for timeframe closes Specifies the behavior when the indicator's timeframe is higher than the chart's. When 'Wait for timeframe closes' is checked, higher timeframe values only come in and are interconnected on the chart when the higher timeframe completes. Style SMI Can toggle the visibility of the SMI as well as the visibility of a price line showing the actual current price of the SMI. Can also select the SMI's color, line thickness, and line style. SMI-based EMA Can toggle the visibility of the SMI-based EMA as well as the visibility of a price line showing the actual current EMA value. Can also select its color, line thickness, and line style. Overbought Line Can toggle the visibility of the Overbought Line as well as the visibility of a price line showing its value. Can also select its color, line thickness, and line style. Oversold Line Can toggle the visibility of the Oversold Line as well as the visibility of a price line showing its value. Can also select its color, line thickness, and line style. Middle Line Can toggle the visibility of the Middle Line as well as sets the boundary, on the scale of 1-100, for the Upper Band (70 is the default). The color, line thickness, and line style can also be determined. Hlines Background Toggles the visibility of a Background color between the SMI's boundaries. Can also change the Color itself as well as the opacity. Overbought Gradient Fill Toggles the visibility of a background gradient color of the overbought area (higher than the overbought line 40). Can also change the Color itself as well as the opacity with the first colorpicker. Oversold Gradient Fill Toggles the visibility of a background gradient color of the oversold area (lower than the oversold line -40). Can also change the Color itself as well as the opacity with the second colorpicker. Precision Sets the number of decimal places to be left on the indicator's value before rounding up. The higher this number, the more decimal points will be on the indicator's value. Previous Previous Stochastic (STOCH) Next Next Stochastic RSI (STOCH RSI) Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582891476/original/L_RFDY_H3FWnztfnx3BrKpL2gyKaAzdmOw.png?1758891947)

**Описание:** This TradingView screenshot displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with an open price of $253.21, high of $257.17, low of $251.71, and close of $256.87 (+$4.56, +1.81%). The interface includes:  

### Top Toolbar:  
- **Left**: Zoom controls (+/-), timeframe selector (D for daily), indicators dropdown, chart type (candlestick), and replay/alert buttons.  
- **Right**: TradingView logo, timeframes (M/S), refresh, settings, chart style, screenshot, and \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582891574/original/mBTlpCR4jM38L1rxw7eNJCEyASQ0HzzO_Q.png?1758891963)

**Описание:** This TradingView interface displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with an open SMI (Stochastic Momentum Index) indicator settings panel. Here’s a detailed breakdown:  


### **Top Bar & Navigation**  
- **Left**: “AAPL” (chart title), “1D” (timeframe), “NASDAQ” (exchange). Price data: *O253.21 H257.17 L251.71 C…* (open, high, low, close).  
- **Right**: “TradingView” (logo), “M/M/S” (multiple chart tabs), “Publish” (share/chart button), “USD” (currency selector), and icons for notes, alerts, and more.  


### **Left Toolbar**  
Icons for drawing tools (trendlines, Fibonacci), text, zoom, and other charting functions.  


### **Main Chart Area**  
- **Candlestick Chart**: Green/red candles show price action (green = close > open; red = close < open) over months (May–Aug, with 2026 preview).  
- **SMI Indicator (Below Candlesticks)**:  
  - Blue line = SMI, orange line = SMI-based EMA.  
  - Shaded regions: Light blue (overbought, ~40), light gray (oversold, ~-40), middle line (0).  
  - Values: *SMI 82.25*, *SMI-based EMA 78.72* (top-right of indicator).  


### **SMI Settings Panel (Center)**  
A modal for customizing the SMI indicator, with three tabs: *Inputs* (active), *Style*, *Visibility*.  

#### **Style Tab (Active)**  
- **Checkboxes** (enable/disable elements):  
  - *SMI* (blue line), *SMI-based EMA* (orange line).  
  - *Overbought Line* (gray, value: 40), *Oversold Line* (gray, value: -40), *Middle Line* (gray, value: 0).  
  - *Hlines Background* (checkerboard), *Overbought Gradient Fill* (green), *Oversold Gradient Fill* (red).  
- **Color/Style Pickers**: For lines/fills (e.g., blue square for SMI line, orange for EMA).  
- **Output Values**:  
  - *Precision*: Dropdown (set to “Default”).  
  - *Labels on price scale* / *Values in status line*: Checked (show values).  


### **Bottom Bar**  
- **Timeframe Selector**: 1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All (current: 1D).  
- **Pine Editor / Trading Panel**: Tabs for script editing and trading tools.  
- **Time/Status**: *09:04:46 UTC-4*, *ADJ* (adjusted data).  


### **Purpose**  
The interface is used for **technical analysis**—viewing price trends, customizing the SMI indicator (to identify overbought/oversold conditions), and managing chart settings. The SMI helps traders gauge momentum and potential reversals.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

