# What do the ratings in the Screener mean?

**URL:** https://www.tradingview.com/support/solutions/43000475547-what-do-the-ratings-in-the-screener-mean/

---

- [ Help Center ](/) - / - / [ What do the ratings in the Screener mean? ](/support/solutions/43000475547-what-do-the-ratings-in-the-screener-mean/) # What do the ratings in the Screener mean? Note: Screener technical ratings are also available in the built-in [Technical Ratings ](https://www.tradingview.com/?solution=43000614331)indicator. We’ve added columns with recommendations based on general ratings. Moving Averages Rating consists of SMAs and EMAs with different lengths (MA lengths are 10, 20, 30, 50, 100, and 200), the Ichimoku Cloud (9, 26, 52), VWMA (20), and HullMA (9). Oscillators Rating is calculated on the following oscillators: RSI (14), Stochastic (14, 3, 3), CCI (20), ADX (14, 14), AO, Momentum (10), MACD (12, 26, 9), Stochastic RSI (3, 3, 14, 14), Williams %R (14), Bulls and Bears Power and UO (7,14,28). Technical Rating column will show you combined ratings for all of the indicators mentioned above. You can also add your own filters to this column. Calculations These are the criteria used to determine the rating of the individual indicators used. Note that changes from the last bar are used to determine falling or rising states: All Moving Averages - Buy — MA value &lt; price - Sell — MA value &gt; price - Neutral — MA value = price Ichimoku Cloud - Buy — lead line 1 &gt; lead line 2 and base line &gt; lead line 1 and conversion line &gt; base line and price &gt; conversion line - Sell — lead line 1 &lt; lead line 2 and base line &lt; lead line 1 and conversion line &lt; base line and price &lt; conversion line - Neutral — neither Buy nor Sell Relative Strength Index - Buy — indicator &lt; 30 and rising - Sell — indicator &gt; 70 and falling - Neutral — neither Buy nor Sell Stochastic - Buy — main and signal lines &lt; 20 and main line &gt; signal line - Sell — main and signal lines &gt; 80 and main line &lt; signal line - Neutral — neither Buy nor Sell Commodity Channel Index - Buy — indicator &lt; -100 and rising - Sell — indicator &gt; 100 and falling - Neutral — neither Buy nor Sell Average Directional Index - Buy — +DI line &gt; -DI line and indicator &gt; 20 and rising - Sell — +DI line &lt; -DI line and indicator &gt; 20 and rising - Neutral — neither Buy nor Sell Awesome Oscillator - Buy — saucer and values are greater than 0, or cross over the zero line - Sell — saucer and values are lower than 0, or cross under the zero line - Neutral — neither Buy nor Sell Momentum - Buy — indicator values are rising - Sell — indicator values are falling - Neutral — neither Buy nor Sell MACD - Buy — main line values &gt; signal line values - Sell — main line values &lt; signal line values - Neutral — neither Buy nor Sell Stochastic RSI - Buy — downtrend and K and D lines &lt; 20 and K line &gt; D line - Sell — uptrend and K and D lines &gt; 80 and K line &lt; D line - Neutral — neither Buy nor Sell Williams Percent Range - Buy — indicator &lt; lower band and rising - Sell — indicator &gt; upper band and falling - Neutral — neither Buy nor Sell Bulls and Bears Power - Buy — uptrend and BearPower &lt; zero and BearPower is rising - Sell — downtrend and BullPower &gt; zero and BullPower is falling - Neutral — neither Buy nor Sell Ultimate Oscillator - Buy — UO &gt; 70 - Sell — UO &lt; 30 - Neutral — neither Buy nor Sell The numerical value of the Sell rating is -1, Neutral is 0 and Buy is 1. The group and overall ratings are calculated as the average of the ratings of the individual indicators. Recommendations for the group or overall ratings are based on this numerical rating value and determined according to the following criteria: - [-1.0 ≤ value &lt; -0.5] — Strong Sell - [-0.5 ≤ value &lt; -0.1] — Sell - [-0.1 ≤ value ≤ 0.1] — Neutral - [0.1 &lt; value ≤ 0.5] — Buy - [0.5 &lt; value ≤ 1.0] — Strong Buy Previous Previous How to add the Screener search results to the Watchlist Next Next How are the most popular filters connected with Change calculated? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43457075398/original/aanx57oOB_SH1UAK0kG3tfQiYSO2barJIw.png?1703166411)

**Описание:** This TradingView image displays a **stock screener results table** with the following UI elements:  

### Header & Controls  
- **Search Icon**: Top-left magnifying glass for searching symbols.  
- **Symbol Column Header**: “Symbol ↑” (sortable, ascending) with a count “14309” (total symbols screened).  
- **Rating Columns**: “MA Rating”, “Tech Rating”, “Os Rating” (headers for different technical analysis ratings).  
- **Add Button**: Top-right “+” to add new symbols to the list.  


### Table Rows (Stock Listings)  
Each row includes:  
1. **Company Logo**: Small icon (e.g., blue circle, diamond, star) representing the company.  
2. **Ticker Symbol**: Short code (e.g., “A”, “AA”, “AABB”).  
3. **Company Name**: Full name (e.g., “Agilent Technologies, Inc.”) with a “D” (likely “Daily” timeframe) and sometimes “DR” (Depositary Receipt) suffix.  
4. **Rating Columns**:  
   - **MA Rating**: Moving Average-based rating (green “Strong buy” with upward arrow, red “Sell” with downward arrow, or gray “Neutral”).  
   - **Tech Rating**: Technical analysis rating (same color-coding as MA Rating).  
   - **Os Rating**: (Unclear, but follows same “Strong buy/Buy/Neutral/Sell” format).  


### Example Rows (Top 6)  
- **Agilent Technologies (A)**: MA=Strong buy, Tech=Buy, Os=Neutral.  
- **Alcoa Corp (AA)**: MA=Strong buy, Tech=Neutral, Os=Sell.  
- **Asia Broadband (AABB)**: MA=Sell, Tech=Sell, Os=Neutral.  
- **Aberdeen Intl (AABVF)**: MA=Sell, Tech=Sell, Os=Sell.  
- **AAC Tech (AACAF)**: MA=Neutral, Tech=Neutral, Os=Sell.  
- **AAC Tech DR (AACAY)**: MA=Strong buy, Tech=Buy, Os=Sell.  


### Purpose  
This table helps traders **screen stocks** by technical ratings (MA, Tech, Os) to identify buy/sell candidates. The “Symbol ↑” sort and “+” button enable customization, while color-coded ratings (green=buy, red=sell, gray=neutral) provide quick visual signals.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43457075505/original/_KVzrukkCBeCy0XRyzVzA_2EsD0n3gee_Q.png?1703166431)

**Описание:** This TradingView image displays a **stock screener interface** for U.S. markets, focused on filtering stocks by technical rating. Here’s a detailed breakdown:  


### **Top Filter Bar**  
A horizontal row of dropdown filters for refining the stock list:  
- `US` (region selector, with flag icon)  
- `Index`, `Price`, `Change %`, `Market cap`, `P/E`, `EPS dil growth`, `Div yield %`, `Sector`, `Analyst Rating`, `Perf %` (financial/technical metrics)  
- `Revenue growth`, `PEG`, `ROE`, `Beta` (additional metrics)  
- `Tech Rating Sell` (active filter, expanded to show options)  
- `+` (add new filter button)  


### **Filter Dropdown (Expanded: “Tech Rating”)**  
A pop-up menu for selecting technical rating criteria:  
- `Reset` (clear filter)  
- `TECHNICAL RATING` (header)  
- `1 DAY` (timeframe)  
- Rating options: `Strong sell`, `Sell` (selected, highlighted blue), `Neutral`, `Buy`, `Strong buy`  
- `Custom...` (custom filter)  
- `Remove` (delete this filter)  


### **Tab Navigation**  
Below the filters, tabs for different data views:  
- `Overview` (active, bold)  
- `Performance`, `Extended Hours`, `Valuation`, `Profitability`, `Income Statement`, `Balance Sheet`, `Cash Flow`, `Technicals`  


### **Stock Table**  
A data table listing stocks with columns (left to right):  
- **Symbol**: Ticker (e.g., `AABB`, `AABVF`) + company name (e.g., “Asia Broadband, Inc.”) + `D` (delisted) or `DR` (depositary receipt) indicators.  
- **Price**: Current stock price (e.g., `0.0200 usd`).  
- **Volume/Rel Volume**: Trading volume (e.g., `732M`) + relative volume (e.g., `1.02`).  
- **Market cap**: Market capitalization (e.g., `49.379M usd`).  
- **P/E**: Price-to-earnings ratio (e.g., `11.76`).  
- **EPS dil TTM**: Diluted earnings per share (trailing twelve months, e.g., `0.00 usd`).  
- **EPS dil growth TTM YoY**: EPS growth year-over-year (e.g., `—`, `+27.52%`).  
- **Div yield % TTM**: Dividend yield (e.g., `0.00%`).  
- **Sector**: Industry (e.g., `Finance`, `Commercial Services`).  


### **Key UI Elements**  
- **Search/Sort**: `Symbol ↑` (sort by symbol, ascending) + magnifying glass (search).  
- **Column Headers**: Clickable for sorting (e.g., `Price`, `Market cap`).  
- **Add Column**: `+` (right of table, to add new data columns).  
- **Expand/Collapse**: Arrow icon (top-right, for table view options).  


### **Purpose**  
This interface helps traders/investors **filter U.S. stocks** by technical rating (e.g., “Sell”) and analyze key metrics (price, volume, P/E, sector) to identify investment opportunities. The active “Sell” filter narrows results to stocks with a bearish technical outlook.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

