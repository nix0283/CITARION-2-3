# Average True Range (ATR)

**URL:** https://www.tradingview.com/support/solutions/43000501823-average-true-range-atr/

---

- [ Help Center ](/)
- / [ Knowledge base ](/knowledge-base/)
- / Indicators 
- / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/)
- / [ Average True Range (ATR) ](/support/solutions/43000501823-average-true-range-atr/)

# Average True Range (ATR) 

#### 

#### Definition
 [The Average True Range (ATR)](https://www.tradingview.com/scripts/averagetruerange/) is a tool used in technical analysis to measure volatility. Unlike many of today's popular indicators, the ATR is not used to indicate the direction of price. Rather, it is a metric used solely to measure volatility, especially volatility caused by price gaps or limit moves.

If you want to screen instruments with the ATR, you can either open the desired screener from the right toolbar in the "Products" menu or access the standalone screener from the home page.

From there, click the "Add new filter" button and select the ATR you need — the standard one or the 

[ATR%](https://www.tradingview.com/support/solutions/43000734653/).

#### History

J. Welles Wilder created the ATR and featured it in his book *New Concepts in Technical Trading Systems*. The book was published in 1978 and also featured several of his now classic indicators such as; The Relative Strength Index, Average Directional Index and the Parabolic SAR. Much like the indicators mentioned, the ATR is still widely used and has great importance in the world of technical analysis.

#### Calculation

To calculate the ATR, the True Range first needs to be discovered. True Range takes into account the most current period high/low range as well as the previous period close if necessary. There are three calculation which need to be completed and then compared against each other. The True Range is the largest of the following:

The Current Period High minus (-) Current Period Low
The Absolute Value (abs) of the Current Period High minus (-) The Previous Period Close
The Absolute Value (abs) of the Current Period Low minus (-) The Previous Period Close true range = max[(high - low), abs(high - previous close), abs (low - previous close)] *Absolute Value is used because the ATR does not measure price direction, only volatility. Therefore there should be no negative numbers. *Once you have the True Range, the Average True Range can be plotted. By default on TradingView the ATR is a Relative Moving Average (RMA) of the True Range, but the smoothing type can be changed to SMA, EMA or WMA in the settings.

#### The basics

Average True Range is a continuously plotted line usually kept below the main price chart window. The way to interpret the Average True Range is that the higher the ATR value, then the higher the level of volatility.

- The look back period to use for the ATR is at the trader's discretion however 14 days is the most common.
- ATR can be used with varying periods (daily, weekly, intraday etc.) however daily is typically the period used.

#### What to look for
 Measuring the Strength of a Move 
As previously stated Average True Range does not take into account price direction, therefore it is not used as an active indicator to predict future moves. Instead, it is most useful in measuring the strength of a move. For example, if a security's price makes a move or reversal, either Bullish or Bearish, there will usually be an increase in volatility. In that case, the ATR will be on the rise. This can be used as a way to gauge the underlying strength of the move. The more volatility in a large move, the more interest or pressure there is reinforcing that move.

On the other hand, during periods of sustained sideways movement, volatility is frequently low. This could assist in the discovery of trading ranges.

 Using Absolute Value 
The fact that ATR is calculated using absolute values of differences in price is something that should not be ignored. This is relevant because it means that securities with higher price values will inherently have higher ATR values. Likewise, securities with lower price values will have lower ATR values. The consequence is that a trader cannot compare the ATR Values of multiple securities. What is considered to be a high ATR Value or a high ATR Range for one security may not be the same for another security. A trader should study and research the relevance of ATR for each security independently when performing chart analysis.
 Compare the charts below. 
Apple (AAPL) has a price over $450 and an ATR over 12.

Ford (F) has a price over $17 and an ATR of less than 1.

#### Summary

ATR is a nice chart analysis tool for keeping an eye on volatility which is a variable that is always important in charting or investing. It is a good option when trying to gauge the overall strength of a move or for discovering a trading range. That being said, it is an indicator which is best used as a compliment to more price direction driven indicators. Once a move has begun, the ATR can add a level of confidence (or lack there of) in that move which can be rather beneficial.

#### Inputs
 Length 
The time period to be used in calculating the Average True Range. 14 days is the default.

#### Style
 ATR 
Can toggle the visibility of the ATR Line as well as the visibility of a price line showing the actual current value of the ATR Line. Can also select the ATR Line's color, line thickness and visual type (Line is the default).
 Precision 
Sets the number of decimal places to be left on the indicator's value before rounding up. The higher this number, the more decimal points will be on the indicator's value.

Also read:

- [How to trade on TradingView](https://www.tradingview.com/support/solutions/43000756695-how-to-trade-on-tradingview/)
- [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/)
- [The technical analysis essentials](https://www.tradingview.com/support/solutions/43000759577-the-technical-analysis-essentials-with-tradingview/)
- [Introduction to fundamental analysis](https://www.tradingview.com/support/solutions/43000759574-introduction-to-fundamental-analysis-on-tradingview/)
- [Portfolios: track your assets, know your trades](https://www.tradingview.com/support/solutions/43000760937-tradingview-portfolios-track-your-assets-know-your-trades/)
 Previous Previous Average transaction volume Next Next Awesome Oscillator (AO) Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43600746588/original/8GFRRyUDxZOKzSkaBrgwGt0Kt6orb1tdUQ.png?1767956064

**Описание:**

This image shows a **TradingView** financial charting interface displaying **Tesla, Inc. (TSLA)** stock data on the NASDAQ exchange. Here’s a detailed breakdown of all elements:


### **1. Top Navigation Bar**
- **Left Side**:  
  - `TSLA`: Ticker symbol for Tesla.  
  - `+`: Button to add a new symbol/asset.  
  - `5m`, `15m`, `45m`, `4h`, `D`, `W`: Timeframe buttons (5-minute, 15-minute, 45-minute, 4-hour, Daily, Weekly) to adjust the chart’s time resolution.  
  - `↕` (expand icon): Likely for full-screen or layout adjustments.  
  - `📊` (chart type): Toggle between candlestick, line, area, etc.  
  - `⚙️` (settings): Configure chart preferences.  
  - `🔍` (zoom): Zoom in/out on the chart.  
  - `↔️` (pan): Move the chart horizontally.  
  - `↩️` (undo) / `↪️` (redo): Reverse/redo actions.  

- **Right Side**:  
  - `TradingView` dropdown: Switch between TradingView accounts or features.  
  - `🔄` (refresh): Reload data.  
  - `⚙️` (settings): Global app settings.  
  - `[]` (layout): Adjust chart layout (e.g., split-screen).  
  - `📷` (screenshot): Capture the chart.  
  - `Publish`: Share or publish the chart.  


### **2. Stock Header & Price Data**
- **Stock Info**: `Tesla, Inc. · 15 · NASDAQ` (15 = 15-minute timeframe, NASDAQ = exchange).  
- **Price Metrics**:  
  - `O 402.06 H 402.88 L 401.00 C 401.13`: Open ($402.06), High ($402.88), Low ($401.00), Close ($401.13).  
  - `-0.90 (-0.22%)`: Daily price change (down $0.90, -0.22%).  
  - `Vol 300.52K -7.67 (-1.88%)`: Volume (300,520 shares, down 7.67% from prior period).  
- **Buy/Sell Prices**:  
  - `405.01 SELL` (red box): Current ask price (price to sell).  
  - `405.15 BUY` (blue box): Current bid price (price to buy).  


### **3. Main Chart Area**
- **Candlestick Chart**: Red/green candles show price action (red = close < open; green = close > open) over the 15-minute timeframe.  
- **Y-Axis (Right)**: Price scale (e.g., 410.00, 420.00, 430.00, 440.00).  


### **4. Indicator Panel (Below Main Chart)**
- **Indicator**: `ADR 14 3.05` (Average Directional Range, 14-period).  
- **Line Graph**: Pink line showing ADR values over time.  
- **X-Axis (Bottom)**: Time labels (12, 13, 14, 17) and timeframe buttons: `1D` (1-day), `5D` (5-day), `1M` (1-month), `3M`, `6M`, `YTD` (year-to-date), `1Y`, `5Y`, `All` (all available data).  


### **5. Left Sidebar (Tools)**
Vertical icons for charting tools:  
- `📈` (chart): Main chart view.  
- `🔗` (link): Share/analyze.  
- `⚙️` (settings): Indicator settings.  
- `👥` (community): Social features.  
- `📊` (indicators): Add technical indicators.  
- `T` (text): Add labels/annotations.  
- `😊` (sentiment): Social sentiment.  
- `✏️` (draw): Drawing tools (trendlines, shapes).  
- `🔍` (zoom): Zoom tool.  
- `🧲` (magnet): Snap to grid.  
- `✂️` (cut): Remove elements.  
- `🔒` (lock): Lock chart.  
- `👁️` (visibility): Toggle element visibility.  
- `🌐` (globe): Global market data.  
- `🗑️` (trash): Delete elements.  


### **6. Right Sidebar (Products & Social)**
- **Products Section**:  
  - `Screeners` (highlighted with orange border + star): Tool to filter stocks by criteria (e.g., price, volume).  
  - `Calendars`: Economic event calendar.  
  - `News Flow`: Real-time news feed.  
  - `Portfolio` (NEW): Track holdings.  
  - `Yield Curves`: Bond yield data.  
  - `Options`: Options chain/analysis.  
  - `Macro Maps`: Macroeconomic data.  
  - `Fundamental Graphs` (NEW): Fundamental analysis charts.  

- **Social Section**:  
  - `Community`: TradingView community feed.  
  - `Notifications`: Alerts/notifications.  


### **7. Bottom Bar**
- `Pine Editor`: Script editor for custom indicators (Pine Script).  
- `Trading Panel`: Execute trades (if linked to a broker).  


### **Purpose of the Interface**  
This layout is designed for **technical analysis** of Tesla’s stock, allowing users to:  
- View price action (candlesticks) and indicators (ADR).  
- Adjust timeframes, add tools, and customize the chart.  
- Access screening, news, and portfolio tools for deeper research.  
- Execute trades (via `Trading Panel`) or share analyses (`Publish`).  


The interface balances real-time data, charting tools, and analytical features to support trading decisions.

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43600747102/original/tTDoGNPIEghtBINyaRVQTcNxEZuuFNVmew.png?1767956226

**Описание:**

This image shows a **TradingView** interface with a split-screen layout, displaying both a **stock chart** (left) and a **stock screener** (right). Here's a detailed breakdown:


### **Left Panel: TSLA (Tesla) Chart**
This panel displays a 15-minute candlestick chart for Tesla (TSLA) on the NASDAQ exchange.  

#### **Top Bar (Chart Header):**  
- **Symbol & Exchange:** \

---

### Изображение 3

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582439081/original/d8y2A6wN6N4fY7C1ae_SPGp8Fo_KAReIJA.png?1758720061

**Описание:**

Error: Command '['z-ai', 'vision', '-p', 'Describe this TradingView interface image in detail. Explain what it shows, all UI elements, buttons, and their purposes.', '-i', 'https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582439081/original/d8y2A6wN6N4fY7C1ae_SPGp8Fo_KAReIJA.png?1758720061']' timed out after 90 seconds

---

### Изображение 4

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582439174/original/nEuC-nGIHJWgPBv-AYozyldSO1YNTiRhvQ.png?1758720078

**Описание:**

This image shows a **TradingView chart interface** displaying Apple Inc. (NASDAQ: AAPL) stock data with an **ATR (Average True Range)** indicator configuration dialog open. Here's a detailed breakdown:


### **1. Top Navigation Bar**
- **Left Side**: 
  - \

---

