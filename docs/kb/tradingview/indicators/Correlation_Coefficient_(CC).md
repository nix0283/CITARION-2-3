# Correlation Coefficient (CC)

**URL:** https://www.tradingview.com/support/solutions/43000502022-correlation-coefficient-cc/

---

- [ Help Center ](/)
- / [ Knowledge base ](/knowledge-base/)
- / Indicators 
- / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/)
- / [ Correlation Coefficient (CC) ](/support/solutions/43000502022-correlation-coefficient-cc/)

# Correlation Coefficient (CC) 

#### Definition
 [Correlation Coefficient (CC)](https://www.tradingview.com/scripts/correlationcoefficient/) is used in statistics to measure the correlation between two sets of data. In the trading world, the data sets would be stocks, etf's or any other financial instrument. The correlation between two financial instruments, simply put, is the degree in which they are related. Correlation is based on a scale of 1 to -1. The closer the Correlation Coefficient is to 1, the higher their positive correlation. The instruments will move up and down together. The higher the Correlation efficient is to -1, the more they move in opposite directions. A value at 0 indicates that there is no correlation.
 High Positive Correlation 

#### History

Correlation Coefficient is used not only in finance, but in statistical analysis spanning many different topics. It has been in use for hundreds of years.

#### Calculation

The Correlation Coefficient calculation uses Closing Prices. The below example will be made using the Closing Prices over 12 periods for the SPY and JPM:

*numbers may vary slightly due to rounding*
 PERIOD
 DATE
 SECURITY 1
 SECURITY 2 

 Date 
 SPY JPM 

 1 8/1/2013 
 170.66 56.54 2 8/2/2013 
 170.95 56.40 3 8/5/2013 
 170.70 56.10 4 8/6/2013 
 169.73 
 55.49 5 8/7/2013 
 169.18 55.30 6 8/8/2013 
 169.80 54.83 7 8/9/2013 
 169.31 54.52 8 8/12/2013 
 169.11 54.09 9 8/13/2013 
 169.61 54.29 10 8/14/2013 
 168.74 54.15 11 8/15/2013 
 166.38 53.29 12 8/16/2013 
 165.83 51.83 
All of the necessary data will need to be set up (preferably in a table) which can be done in three steps.

1. First, every period needs to be squared for both securities.
 PERIOD 
 DATE 
 SECURITY 1
 SECURITY 2 

 Date 
 SPY 
 JPM 
 SPY Squared 
 JPM Squared 

 1 8/1/2013 
 170.66 56.54 29124.84 
 3196.77 
 2 8/2/2013 
 170.95 56.40 29223.90 
 3180.96 3 8/5/2013 
 170.70 56.10 29138.49 3147.21 
 4 8/6/2013 
 169.73 
 55.49 28808.27 
 3079.14 
 5 8/7/2013 
 169.18 55.30 28621.87 
 3058.09 
 6 8/8/2013 
 169.80 54.83 28832.04 
 3006.33 
 7 8/9/2013 
 169.31 
 54.52 28665.88 
 2972.43 8 8/12/2013 
 169.11 54.09 28598.19 
 2925.73 
 9 8/13/2013 
 169.61 54.29 28767.55 
 2947.40 
 10 8/14/2013 
 168.74 54.15 28473.19 
 2932.22 
 11 8/15/2013 
 166.38 53.29 27682.30 
 2839.82 
 12 8/16/2013 
 165.83 51.83 27499.59 2686.35 
2. Multiply the each period value of SPY by each period of JPM. Notice the last column.
 PERIOD 
 DATE 
 SECURITY 1 
 SECURITY 2 

 Date 
 SPY 
 JPM 
 SPY Squared JPM Squared SPY x JPM 

 1 8/1/2013 
 170.66 56.54 29124.84 
 3196.77 
 9649.12 
 2 8/2/2013 
 170.95 56.40 29223.90 
 3180.96 9641.58 
 3 8/5/2013 
 170.70 56.10 29138.49 3147.21 
 9576.27 
 4 8/6/2013 
 169.73 
 55.49 28808.27 
 3079.14 
 9418.32 
 5 8/7/2013 
 169.18 55.30 28621.87 
 3058.09 
 9355.65 
 6 8/8/2013 
 169.80 54.83 28832.04 
 3006.33 
 9310.13 
 7 8/9/2013 
 169.31 54.52 28665.88 
 2972.43 9230.78 
 8 8/12/2013 
 169.11 54.09 28598.19 
 2925.73 
 9147.16 
 9 8/13/2013 
 169.61 54.29 28767.55 
 2947.40 
 9208.13 
 10 8/14/2013 
 168.74 54.15 28473.19 
 2932.22 
 9137.27 
 11 8/15/2013 
 166.38 53.29 27682.30 
 2839.82 
 8866.39 
 12 8/16/2013 
 165.83 51.83 27499.59 2686.35 8594.97 
3. Find the Average Value for each column.
 PERIOD 
 DATE 
 SECURITY 1
 SECURITY 2

 Date 
 SPY JPM 
 SPY Squared JPM Squared SPY x JPM 

 1 8/1/2013 
 170.66 56.54 29124.84 
 3196.77 
 9649.12 
 2 8/2/2013 
 170.95 56.40 29223.90 
 3180.96 9641.58 
 3 8/5/2013 
 170.70 56.10 29138.49 3147.21 
 9576.27 
 4 8/6/2013 
 169.73 
 55.49 28808.27 
 3079.14 
 9418.32 
 5 8/7/2013 
 169.18 55.30 28621.87 
 3058.09 
 9355.65 
 6 8/8/2013 
 169.80 54.83 28832.04 
 3006.33 
 9310.13 
 7 8/9/2013 
 169.31 54.52 28665.88 
 2972.43 9230.78 
 8 8/12/2013 
 169.11 54.09 28598.19 
 2925.73 
 9147.16 
 9 8/13/2013 
 169.61 54.29 28767.55 
 2947.40 
 9208.13 
 10 8/14/2013 
 168.74 54.15 28473.19 
 2932.22 
 9137.27 
 11 8/15/2013 
 166.38 53.29 27682.30 
 2839.82 
 8866.39 
 12 8/16/2013 
 165.83 51.83 27499.59 2686.35 8594.97 
 Average 
 169.1667 
 54.7358 
 28619.6762 
 2997.7049 
 9261.3142 

Now that all of the data has been properly arranged in a table, the rest of the formula can be completed. This portion can be done in three steps as well.

- Calculate the Variance for both securities. Variance = Squared Average - (Average Value * Average Value) SPY Variance: *2.3151* JPM Variance: *1.697*
- Calculate the Covariance of the securities. Covariance = (Average Value of Security1 x Security2) - (Security1 Average Value x Security2 Average Value) SPY & JPM Covariance = *1.8395*
- Calculate the Correlation Coefficient.Correlation Coefficient = Covariance / SQRT(Security1 Variance x Security2 Variance)

SPY & JPM Correlation Coefficient = 0.9432

#### The basics

Even though The Correlation Coefficient (CC) moves within a band of 1 to -1, it is not considered an oscillator. Values fluctuate between positive and negative correlation, indicating how closely their prices move together. A Correlation Coefficient of +1 is perfect positive correlation and they move in perfect synch. A Correlation Coefficient of -1 is perfect negative correlation and they move in exact opposite directions. Both of these extremes are rare and the Correlation Coefficient will often fluctuate somewhere between the two. Correlation Coefficient of 0 is the middle point indicating that there is currently no correlation between the two instruments.
 High Negative Correlation 

#### What to look for

As opposed to a lot of technical analysis indicators, The Correlation Coefficient is ideal for longer-term investing. If in an investor is going for a truly diversified portfolio, then the Correlation Coefficient can come in quite useful. It can help you determine for diverse the assets in your portfolio are from one another. In other words, by having instruments with low correlation, unnecessary, duplicated risk can be avoided.

#### Summary

As previously mentioned, The Correlation Coefficient can be a useful tool in assembling a diverse portfolio. One thing to always keep in mind however, is the correlation between two instruments can and does change from time to time. This indicator will help the trader to be aware of such changes and alter their investments accordingly.

#### Inputs
 Symbol 
The second instrument which will then be compared to the original instrument on the chart.
 Length 
The time period to be used in calculating the correlation. 20 days is the default.
 Source 
Determines what data from each bar will be used in calculations. Close is the default.

#### Style
 Correlation 
Can toggle the visibility of the Correlation Coefficient as well as the visibility of a price line showing the actual current value of the Correlation Coefficient. Can also select the Correlation Coefficient's color, line thickness and visual style (Area is the Default).
 Level 
Toggles the visibility and sets price level of three additional horizontal lines. By default, the lines display the maximum and minimum possible values of the correlation coefficient calculation (1 and -1, respectively), as well as the level of zero correlation. It is also possible to set the color, line thickness and select the visual style of each line (the default is Dashed line).
 Previous Previous Coppock Curve Next Next Crypto Open Interest Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43586533204/original/bwiS38gkcmypMMs6OyAErUujAAR_9PK6rg.png?1760614613

**Описание:**

This image shows a **TradingView** charting interface displaying Apple Inc. (NASDAQ:AAPL) stock data with a correlation indicator configuration window open. Here's a detailed breakdown:


### **Top Navigation Bar**
- **Left Side**: 
  - `AAPL` (stock ticker) with a plus icon (add to watchlist).
  - Timeframe selector: `D` (Daily), `1D` (1 Day) is active.
  - Chart type icons: Line, Candlestick, Bar, etc.
  - `Indicators` dropdown (for adding technical indicators).
  - `W` (Week) timeframe button.
  - `Alert` (set price alerts), `Replay` (backtest market movements), and navigation arrows (previous/next chart).
- **Right Side**: 
  - `TradingView` logo with a dropdown (account/settings).
  - `M` (Month), `M` (another month), `S` (Scale) buttons.
  - Refresh, theme, fullscreen, screenshot, and `Publish` (share chart) buttons.


### **Chart Header**
- **Stock Info**: `Apple Inc · 1D · NASDAQ` with a sun icon (market open).
- **Price Data**: `O249.49 H251.82 L247.47 C249.34 +1.57 (+0.63%)` (Open, High, Low, Close, change, and percentage change).
- **Currency**: `USD` dropdown (currency selector).


### **Main Chart Area**
- **Candlestick Chart**: Red/green candles showing Apple's daily price action (May–Nov).
- **Correlation Indicator**: A blue line below the main chart (labeled `CC GOOG close 20` in the status bar), showing correlation with Google (GOOG) over 20 periods. The correlation value is `-0.13` (negative, weak inverse relationship).
- **Y-Axis**: Price scale (170–250 USD) for the main chart; correlation scale (-1.00 to 1.00) for the indicator.


### **Left Sidebar (Tools)**
Vertical icons for:
- Zoom, trendline, drawing tools, Fibonacci, text, smiley, ruler, magnifying glass, magnet, pen, lock, eye, globe, trash, star (favorites).


### **Indicator Configuration Window (CC)**
A modal window titled `CC` (Correlation Coefficient) with three tabs: `Inputs` (active), `Style`, `Visibility`.

#### **Inputs Tab**
- **Symbol**: `NASDAQ:GOOG` (Google stock, editable via pencil icon).
- **Source**: `Close` (dropdown, uses closing prices for correlation).
- **Length**: `20` (periods for the correlation calculation).
- **INPUT VALUES**: Checkbox `Inputs in status line` (shows indicator parameters on the chart).
- **Buttons**: `Defaults` (reset to default settings), `Cancel` (close without saving), `Ok` (apply changes).


### **Bottom Toolbar**
- **Timeframe Buttons**: `1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All` (select chart period).
- **Calendar Icon**: Date range selector.
- **Timestamp**: `14:36:11 UTC+3` (current time).
- **ADJ**: Adjusted prices toggle.
- **Tabs**: `Pine Editor` (code indicator scripts), `Trading Panel` (trade execution).


### **Right Sidebar**
Icons for:
- Notes, clock (time), diamonds (patterns), chat, target (price alert), mountain (trend), calendar, grid, signal (alerts), help.


### **Key Purpose**
The interface is used for **technical analysis**, showing Apple's price chart with a correlation indicator to Google. The configuration window customizes the indicator's symbol, data source, and period. The layout supports charting, indicator customization, and trading tools.

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43586533250/original/T5AJNZ09gkTjccR1D6F14PTSSNBBP2ZUQQ.png?1760614627

**Описание:**

This image shows a **TradingView** charting interface displaying Apple Inc. (NASDAQ: AAPL) stock data with a **Correlation Coefficient (CC)** indicator configuration window open. Here's a detailed breakdown:


### **1. Top Navigation Bar**
- **Left Side**: 
  - `AAPL` (stock ticker) with a plus icon (add to watchlist).
  - Timeframe selector: `D` (Daily), `1D` (Daily candlestick), `5D` (5-day), `1M` (1-month), etc.
  - Chart type icons: Line, Candlestick, Bar, etc.
  - `Indicators` dropdown (to add technical indicators).
  - `Alert` (set price alerts), `Replay` (replay market data), and navigation arrows (back/forward).
- **Right Side**: 
  - `TradingView` logo with a dropdown (account/settings).
  - Timezone: `M` (Market), `M` (Market), `S` (Session).
  - Icons: Refresh, Theme (light/dark), Fullscreen, Camera (screenshot), `Publish` (share chart).


### **2. Stock & Price Info (Below Navigation)**
- **Ticker**: `Apple Inc · 1D · NASDAQ` (1-day timeframe, NASDAQ exchange).
- **Price Data**:  
  `O249.49 H251.82 L247.47 C249.34 +1.57 (+0.63%)` (Open, High, Low, Close, Change, % Change).  
  Green text indicates a positive day (+0.63% gain).


### **3. Main Chart Area**
- **Candlestick Chart**: Shows Apple's price action over months (May–Nov). Red/green candles represent price movements (red = down, green = up).
- **Y-Axis (Right)**: Price scale (170.00–250.00 USD).
- **X-Axis (Bottom)**: Time (May, Jun, Jul, Aug, Sep, Oct, Nov).


### **4. Indicator Panel (Bottom of Chart)**
- **CC Indicator**: A blue line (correlation coefficient) plotted below the main chart, showing values between -1.00 and 1.00 (right Y-axis).  
  The current correlation value is `Correlation -0.13` (weak negative correlation, likely vs. another asset like GOOG, as hinted by `CC GOOG close 20` in the panel label).


### **5. CC Indicator Configuration Window (Center)**
A modal window titled `CC` (Correlation Coefficient) is open, with three tabs:  
- `Inputs` (selected, but `Style` is active in the image), `Style`, `Visibility`.  

#### **Style Tab Options**:
- **Correlation**:  
  - Checkbox (enabled).  
  - Color picker (blue square) + line style (solid line).  
  - Wave icon (toggle line style).  
- **Level 1**:  
  - Checkbox (enabled).  
  - Color picker (gray square) + dashed line style.  
  - Value: `1` (upper correlation level).  
- **Level 0**:  
  - Checkbox (enabled).  
  - Color picker (checkered square) + dashed line.  
  - Value: `0` (neutral correlation).  
- **Level -1**:  
  - Checkbox (enabled).  
  - Color picker (gray square) + dashed line.  
  - Value: `-1` (lower correlation level).  

#### **Output Values Section**:
- `Precision`: Dropdown (set to `Default`).  
- `Labels on price scale`: Checkbox (enabled, shows correlation values on the price axis).  
- `Values in status line`: Checkbox (enabled, displays values in the chart's status bar).  

#### **Buttons**:
- `Defaults` (dropdown, reset to default settings).  
- `Cancel` (close window without saving).  
- `Ok` (apply changes and close).


### **6. Left Sidebar (Tools)**
Icons for:  
- Drawing tools (line, trendline, Fibonacci, text, smiley, ruler, zoom).  
- Indicators (magnet, pen, lock, eye, globe, trash).  
- `Pine Editor` (code editor for custom indicators) and `Trading Panel` (order entry) at the bottom.


### **7. Bottom Timeframe Bar**
- Timeframes: `1D, 5D, 1M, 3M, 6M, YTD, 1Y, 5Y, All` (select chart period).  
- Calendar icon (customize date range).  
- Time: `14:36:19 UTC+3` (current time).  
- `ADJ` (adjusted prices, e.g., for splits/dividends).


### **8. Right Sidebar (Additional Tools)**
Icons for:  
- Notes, clock (time), diamond (patterns), chat, target (price alerts), mountain (trend), calendar, grid, RSS, help.


### **Purpose of the Interface**
This is a technical analysis tool for traders to:  
- View Apple's price history (candlestick chart).  
- Analyze correlation with another asset (via the CC indicator, here vs. GOOG).  
- Customize indicator settings (style, levels, labels) to refine analysis.  
- Use drawing tools, set alerts, and manage orders.  

The open `CC` window allows traders to adjust how the correlation coefficient is visualized (colors, levels, labels) to better interpret relationships between assets.

---

