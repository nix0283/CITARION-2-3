# Know Sure Thing (KST)

**URL:** https://www.tradingview.com/support/solutions/43000502329-know-sure-thing-kst/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Know Sure Thing (KST) ](/support/solutions/43000502329-know-sure-thing-kst/) # Know Sure Thing (KST) Definition The [Know Sure Thing indicator (KST)](https://www.tradingview.com/scripts/knowsurething/) is a momentum based oscillator. KST is based on Rate of Change (ROC). Know Sure Thing takes four different timeframes of ROC and smooth's them out using Simple Moving Averages. KST then calculates a final value that fluctuates between positive and negative values above and below a Zero Line. There is also a signal line which is an SMA of the KST line itself. Essentially, the Know Sure Thing Indicator measures the momentum of four separate price cycles. Technical Analysts use this information to spot divergences, overbought and oversold conditions and crossovers. History The Know Sure Thing indicator (KST) was developed by Martin Pring and introduced in 1992 in Stocks & Commodities Magazine. He originally referred to the indicator as the Summed Rate of Change . Calculation This calculation is using the default parameters in Tradingview of 10,15,20,30,10,10,10,15,9. - The first four numbers (10,15,20,30) represent the ROC lengths to be used. - The second four numbers (10,10,10,15) are the SMA lengths to be applied to their corresponding ROC lengths. - The final number (9) is the SMA length to be used in calculating the signal line. Therefore in this example, you will first need to calculate the ROCMA for each price cycle. ROCMA1 = 10 Period SMA of 10 Period ROC ROCMA2 = 10 Period SMA of 15 Period ROC ROCMA3 = 10 PERIOD SMA of 20 Period ROC ROCMA4 = 15 Period SMA of 30 Period ROC Now that you have all for ROCMA calculated, the KST can be calculated. (RCMA1 x 1) + (ROCMA2 x 2) + (ROCMA3 x 3) + (ROCMA4 x 4) = KST The signal line is then a 9 Period SMA of the KST The basics KST takes the Rate of Change for four different time periods, smooth's them out with moving averages, weights them and then sums the results. The intention is to get a better understanding of the momentum for a particular security of financial instrument. The general rule is that when KST is positive, then momentum is up and when KST is negative, then momentum is down. This would translate to Bullish and Bearish markets respectively. One thing to note, is that the time frames used in the indicator's parameters is at the trader's discretion. Pring recommended that when switching between daily, weekly and monthly charts; the parameters of the indicator should be switched accordingly. For example: Daily (10, 15, 20, 30, 10, 10, 10, 15, 9) Weekly (10, 13, 15, 20, 10, 13, 15, 20, 9) Monthly (9, 12, 18, 24, 6, 6, 6, 9, 9) What to look for Divergence Divergence occurs when price action or movements is not confirmed by the indicator's readings. This can be a sign that the current, underlying momentum does not support price and a reversal is potentially at hand. Bullish KST Divergence is when prices is falling but KST is rising. Bearish KST Divergence is when price is rising but KST is falling. Overbought/Oversold Overbought and Oversold conditions are somewhat more difficult to define in regards to the KST. The reason is that unlike other momentum oscillators (such as the RSI), KST is not bound to a specific range. Therefore, defining true overbought and oversold levels with take some research and experimentation. Historical analysis can assist in the process. Most of the time, KST overbought and oversold conditions are good for trend confirmation and not necessarily reversals. Overbought can be seen as a sign of strength during a bullishmarket, while oversold may be a sign of strength in a bearish market. Crossovers There are two different type of crossovers when analyzing the KST. There are Zero Line crossovers as well as signal line crossovers. Zero Line crossovers typically have a lot of lag and are not always reliable. Signal line crossovers on the other hand, can signify an underlying change in momentum. When the KST line is negative yet crosses above the signal line, upside momentum is increasing. When the KST line is positive and crosses below the signal line, downside momentum is increasing. Summary The Know Sure Thing indictor (KST) is like many other technical analysis indicators in that it has both strengths and weaknesses and should not be used as a stand-alone signal generating system. Because the indicator employs a series of moving averages, there is lag inherently built in. This can cause simple signals like Zero Line crossovers to be unreliable. However, the indicator still can be considered useful when using overbought and oversold conditions, not as a way to anticipate reversals, but as a way to confirm trend direction. Signal line crossovers have also been shown to be effective in anticipating price movements. Inputs ROCLen1 The time period to be used in calculating the first ROC. ROCLen2 The time period to be used in calculating the second ROC. ROCLen3 The time period to be used in calculating the third ROC. ROCLen4 The time period to be used in calculating the fourth ROC. SMALen1 The time period to be used for the SMA of the first ROC. SMALen2 The time period to be used for the SMA of the second ROC. SMALen3 The time period to be used for the SMA of the third ROC. SMALen4 The time period to be used for the SMA of the fourth ROC. SigLen The time period to be used in calculating the signal line. Style KST Can toggle the visibility of the KST Line as well as the visibility of a price line showing the actual current value of the KST Line. Can also select the KST Line's color, line thickness and visual type (Line is the default). Sig Can toggle the visibility of the Signal Line as well as the visibility of a price line showing the actual current value of the Signal Line. Can also select the Signal Line's color, line thickness and visual type (Line is the default). Zero Line Can toggle the visibility of the Zero Line. Can also select the Signal Line's value, color, line thickness and line type (dashes is the default). Precision Sets the number of decimal places to be left on the indicator's value before rounding up. The higher this number, the more decimal points will be on the indicator's value. Previous Previous Klinger Oscillator Next Next Large transaction volume Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582648416/original/sCbJiwEZwluTTeB0dL58Lesp3iBnNaIYsg.png?1758801210)

**Описание:** This TradingView screenshot displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with the **KST (Know Sure Thing) indicator** configuration panel open. Here’s a detailed breakdown:  


### **Top Navigation Bar**  
- **Left**: Zoom controls (`+`/`-`), time interval selector (`D` for daily), and a menu icon.  
- **Center**: `Indicators` dropdown (currently open, showing the KST settings), `Alert`, and `Donchian` (likely a chart type) buttons.  
- **Right**: `TradingView` logo, market/time filters (`M`/`M`/`S`), refresh, settings, full-screen, screenshot, and `Publish` button.  


### **Chart Header**  
- Displays: *“Apple Inc · 1D · NASDAQ”* with real-time data: `O255.22 H255.74 L251.04 C...` (open, high, low, close).  
- Currency: `USD` dropdown (top-right).  


### **Main Chart Area**  
- **Candlestick Chart**: Green/red candles show price action (green = close > open; red = close < open) over dates (21, 25, 27, Sep, 4, 8, 10).  
- **KST Indicator**: A line graph (red/green) overlays the candlesticks, with a label: *“KST 10 15 20 30 10 10 10 15 9”* (current parameter values).  


### **KST Configuration Panel (Center)**  
A modal window for customizing the KST indicator, with three tabs:  
- **`Inputs` (Active)**: Configures calculation parameters:  
  - `ROC Length #1-4`: 10, 15, 20, 30 (Rate of Change periods).  
  - `SMA Length #1-4`: 10, 10, 10, 15 (Simple Moving Average periods for ROC smoothing).  
  - `Signal Line Length`: 9 (SMA of the KST line).  
- **`Style`/`Visibility`**: Tabs for visual customization (not active).  
- **`CALCULATION` Section**:  
  - `Timeframe`: Dropdown (set to “Chart,” meaning uses the main chart’s 1D interval).  
- **Buttons**: `Defaults` (reset to default settings), `Cancel` (close without saving), `Ok` (apply changes).  


### **Left Sidebar**  
Icons for tools: drawing (line, trendline, text), indicators, alerts, social, Pine Editor, and account settings.  


### **Bottom Toolbar**  
- **Time Intervals**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (switch chart periods).  
- **Date Range**: Calendar icon (adjust time span).  
- **Tabs**: `Pine Editor` (code editor for custom indicators) and `Trading Panel` (order execution).  


### **Right Sidebar**  
Price scale (256.00 to 0.0000), icons for notes, clock (timeframes), patterns, chat, and additional tools (e.g., Fibonacci, calendar).  


### **Status Bar (Bottom-Right)**  
- Time: `07:53:01 UTC-4` (current server time).  
- `ADJ`: Adjusted price toggle.  


### **Purpose**  
The interface is used for **technical analysis**: the candlestick chart visualizes price trends, while the KST panel customizes a momentum indicator to identify trend strength/turning points. The layout supports charting, indicator customization, and trading workflow (e.g., alerts, orders).


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582648466/original/05Wvs39GeVFMk1Ni0mkd9ODRkkpAkDZJTA.png?1758801224)

**Описание:** This TradingView screenshot displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with the KST (Know Sure Thing) indicator configuration panel open. Here’s a detailed breakdown:  


### **Top Bar & Header**  
- **Left**: TradingView logo, zoom controls (±), time frame selector (\


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

