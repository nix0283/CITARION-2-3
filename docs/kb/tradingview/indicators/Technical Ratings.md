# Technical Ratings

**URL:** https://www.tradingview.com/support/solutions/43000614331-technical-ratings/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Technical Ratings ](/support/solutions/43000614331-technical-ratings/) # Technical Ratings The Technical Ratings indicator is a composite tool that combines signals from multiple popular indicators into a single, normalized score (rating), then determines a rating category — such as "Buy" or "Sell" — based on the value. It provides a more compact and intuitive way to analyze a market's technical factors and find potential signals than analyzing each constituent indicator separately. This indicator evaluates ratings based on a set of conditions from 26 constituent indicators, including moving averages and oscillators. Additionally, it evaluates those ratings across multiple timeframes and displays their categories in a table. The indicator can show rating information for the moving averages, the oscillators, or a combination of both. The ratings from this indicator are the same as those displayed by the "Rating" columns of the [Screener](https://www.tradingview.com/screener/) and the gauges on a symbol's "Technicals" page. Calculation This indicator calculates the following three ratings on each bar: - **Moving average rating (MAs):** The mean of ratings based on 15 moving averages and filters, including Simple and Exponential MAs with different lengths (10, 20, 30, 50, 100, and 200), Hull MA (9), VWMA (20), and Ichimoku Cloud (9, 26, 52) - **Oscillator rating (Oscillators):** The mean of ratings based on 11 oscillators and indicators, including RSI (14), Stochastic (14, 3, 3), CCI (20), ADX (14, 14), Awesome Oscillator, Momentum (10), MACD (12, 26, 9), Stochastic RSI (3, 3, 14, 14), Williams %R (14), Bull Bear Power (13), and UO (7, 14, 28) - **Overall rating (All):** The mean of the moving average and oscillator ratings Each constituent indicator contributes a value of -1 (for "sell"), 0 (for "neutral"), or +1 (for "buy") to the average ratings on each selected timeframe. The resulting averages oscillate between -1 and +1, where: - A positive value indicates a higher confluence of "buy" conditions than "sell" conditions on the bar - A negative value indicates a higher confluence of "sell" conditions than "buy" conditions on the bar The indicator displays the moving average, oscillator, or overall rating for its main timeframe as color-coded columns in a separate pane. The table displays one of five categories for the enabled rating types on each selected timeframe. The following logic determines the assigned category for each score: - **Strong Sell:** Score is below -0.5 - **Sell:** Score is below -0.1 and above or equal to -0.5 - **Neutral:** Score ranges from -0.1 to 0.1 - **Buy:** Score is above 0.1 and below or equal to 0.5 - **Strong Buy:** Score is above 0.5 Individual indicator conditions The Technical Ratings indicator uses the following criteria to calculate ratings for each constituent indicator: All moving averages - **Buy:** MA value &lt; price - **Sell:** MA value &gt; price - **Neutral:** MA value = price Ichimoku Cloud - **Buy:** Leading span A &gt; Leading span B, Base line &gt; Leading span A, Conversion line &gt; Base line, and price &gt; Conversion line - **Sell:** Leading span A &lt; Leading span B, Base line &lt; Leading span A, Conversion line &lt; Base line, and price &lt; Conversion line - **Neutral:** Neither Buy nor Sell Relative Strength Index - **Buy:** RSI &lt; 30 and RSI &gt; previous RSI - **Sell:** RSI &gt; 70 and RSI &lt; previous RSI - **Neutral:** Neither Buy nor Sell Stochastic - **Buy:** %K &lt; 20, %D &lt; 20, and %K &gt; %D - **Sell:** %K &gt; 80, %D &gt; 80, and %K &lt; %D - **Neutral:** Neither Buy nor Sell Commodity Channel Index - **Buy:** CCI &lt; -100 and CCI &gt; previous CCI - **Sell:** CCI &gt; 100 and CCI &lt; previous CCI - **Neutral:** Neither Buy nor Sell Average Directional Index - **Buy:** +DI &gt; -DI, ADX &gt; 20, and ADX &gt; previous ADX - **Sell:** +DI &lt; -DI, ADX &gt; 20, and ADX &lt; previous ADX - **Neutral:** Neither Buy nor Sell Awesome Oscillator - **Buy:** AO crosses over 0, or AO is above 0 for two consecutive bars and turns upward (the current value is above the value from the previous bar, and the previous bar's value is below the value from two bars back) - **Sell:** AO crosses under 0, or AO is below 0 for two consecutive bars and turns downward (the current value is below the value from the previous bar, and the previous bar's value is above the value from two bars back) - **Neutral:** Neither Buy nor Sell Momentum - **Buy:** Current value &gt; previous value - **Sell:** Current value &lt; previous value - **Neutral:** Current value = previous value MACD - **Buy:** MACD &gt; Signal - **Sell:** MACD &lt; Signal - **Neutral:** MACD = Signal Stochastic RSI - **Buy:** Downtrend, K &lt; 20, D &lt; 20, and K &gt; D - **Sell:** Uptrend, K &gt; 80, D &gt; 80, and K &lt; D - **Neutral:** Neither Buy nor Sell Williams Percent Range - **Buy:** %R &lt; -80 and %R &gt; previous value - **Sell:** %R &gt; -20 and %R &lt; previous value - **Neutral:** Neither Buy nor Sell Bull Bear Power - **Buy:** Uptrend, Bear power &lt; 0, and Bear power &gt; previous value - **Sell:** Downtrend, Bull power &gt; 0, and Bull power &lt; previous value - **Neutral:** Neither Buy nor Sell Ultimate Oscillator - **Buy:** Oscillator &gt; 70 - **Sell:** Oscillator &lt; 30 - **Neutral:** Neither Buy nor Sell Inputs Indicator timeframe The timeframe on which to calculate the indicator's primary rating. It must be higher than or equal to the chart's timeframe. The indicator plots the requested rating as columns and shows the category of the latest realtime value in the first row of the table. Additionally, the indicator uses the plotted rating for its alert conditions. Rating is based on Specifies which rating groups the indicator uses for its display and alerts: - **All:** The plot and alerts use the overall rating, and the table includes columns for all three rating groups - **MAs:** The indicator uses the moving average rating only - **Oscillators:** The indicator uses the oscillator rating only Plot confirmed ratings only This setting applies only to the indicator's plotted rating. If enabled and the indicator's primary rating comes from a higher timeframe than the chart's timeframe, the plotted value from the last closed HTF bar persists until after the latest HTF bar closes. If not enabled, the plot updates while the HTF bar is open to show the latest realtime changes in the requested rating. Note that the plot displays only the confirmed rating for each closed HTF bar after chart reloads. Show MTF These inputs control the additional timeframes for which the table displays rating categories. Each enabled timeframe has a separate corresponding row in the table. Note that the table automatically excludes repeated timeframes. If two enabled timeframes, including the indicator's timeframe, are the same, the table displays only one row for that timeframe, not two. Table settings These inputs configure the appearance and layout of the table: - **Size:** Specifies the relative size of the table's text - **Position:** Sets the vertical (top, middle, bottom) and horizontal (left, center, right) placement of the table in the pane - **Color inputs:** Set the table's text and header colors, and the background colors for each rating category. The Buy, Neutral, and Sell color inputs also set the colors of the plotted columns. **! Note:** Technical ratings are provided as general market information for educational and entertainment purposes only, and do not constitute investment advice. Refer to our [Terms of Use](https://www.tradingview.com/policies/) and [Disclaimer](https://www.tradingview.com/disclaimer/) to learn more. Previous Previous Supply Equality Ratio Next Next Time Weighted Average Price Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43585947487/original/THPl0c18LquhSYFda1cJ0wGUegtEceqhiQ.png?1760395782)

**Описание:** This TradingView chart displays **Tesla, Inc. (TSLA)** on the **NASDAQ** exchange, using a **1-day (1D)** timeframe. Here’s a detailed breakdown of its elements:  


### 1. **Header & Price Data**  
- **Symbol/Exchange**: “TSLA” (Tesla) + “1D · NASDAQ” (1-day timeframe, NASDAQ exchange).  
- **Price Metrics**:  
  - `O249.38` (Open price), `H249.69` (High), `L245.56` (Low), `C247.66` (Close).  
  - `+2.39 (+0.97%)`: Daily price change (green/red indicates gain/loss; here, green for a 0.97% increase).  


### 2. **Main Chart (Candlestick Chart)**  
- **Candlesticks**: Green (price closed higher than open) and red (price closed lower than open) bars show daily price action (open, high, low, close).  
- **Y-Axis (Price)**: Ranges from ~190 to 260, with horizontal grid lines for price levels.  
- **X-Axis (Time)**: Months (Jun–Nov) mark the time period.  


### 3. **Volume & Technicals Section**  
Below the candlestick chart, two sub-charts appear:  

#### a. **Volume Bars**  
- **Blue Bars**: Represent daily trading volume (higher bars = more volume).  
- **Red Bars**: Likely indicate volume on down days (or a specific volume metric, e.g., selling volume).  
- **Y-Axis (Volume)**: Ranges from 0 to 1.20 (scaled volume).  


#### b. **Technical Analysis (TA) Panel**  
- **Label**: “Technicals All 60 240 1D 1W 1M small middle right 0.11” (describes the TA setup: multiple timeframes, small chart, middle-right position, and a score of 0.11).  
- **Color-Coded Matrix**:  
  - Rows: Timeframes (`1D`, `1W`, `1M`).  
  - Columns: Technical categories (`TF` = Trend Following, `MAs` = Moving Averages, `Osc` = Oscillators, `All` = Overall).  
  - Cells: Signals (e.g., `Buy`, `Strong Buy`, `Neutral`, `Sell`) with color coding (blue = bullish, red = bearish).  
  - Example: `1D` row shows “Buy” (TF), “Neutral” (MAs), “Buy” (Osc), “Buy” (All).  


### 4. **UI Elements**  
- **“TV PRO” Logo**: Bottom-left, indicates TradingView Pro (paid) subscription.  
- **Settings Icon**: Bottom-right, for chart customization (timeframe, indicators, styles).  


### Purpose  
This chart combines **price action** (candlesticks), **volume** (bar chart), and **technical analysis** (TA matrix) to help traders analyze Tesla’s short-term (1D) trend, volume patterns, and multi-timeframe technical signals.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43585948151/original/in370vI4lrTBEMXZjKGaa6KiH8p_jtqG-w.png?1760396222)

**Описание:** This is a **TradingView \


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43585948624/original/2pL0KMHLgasUwMO4wpi0yBefxJ7HLDxl7w.png?1760396595)

**Описание:** This is a **TradingView \


