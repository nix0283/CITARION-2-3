# Why do the values on the TradingView intraday charts differ from other sources?

**URL:** https://www.tradingview.com/support/solutions/43000710585-why-do-the-values-on-the-tradingview-intraday-charts-differ-from-other-sources/

---

- [ Help Center ](/)
- / 
- / [ Why do the values on the TradingView intraday charts differ from… ](/support/solutions/43000710585-why-do-the-values-on-the-tradingview-intraday-charts-differ-from-other-sources/)

# Why do the values on the TradingView intraday charts differ from other sources? 
 **Odd lots**

If we compare the Open, High, Low, Close and Volume values on any intraday resolution for North American stocks on our platform with the ones displayed on the exchange’s website and some other sources, we can notice a discrepancy between prices and, first of all, volume data during the Pre-market and After-Hours, if follow the terminology of the Nasdaq exchange. The discrepancies are due to the fact that our data provider filters the odd lots trades out in the history, and as a result, our intraday charts are built based on the full trades only.

An odd lot is an order size for a security that is less than the normal unit of trade for that particular asset. For stocks, odd lots are most often smaller than the standard 100 units of the asset.

As an example, let’s have a look at the 1-min NASDAQ:AMZN chart at the 09:25 (UTC-4) bar on 03.07.2023 and compare the values to the ones displayed on the exchange’s website:

The Close price on our platform is 130.50, and the volume is equal to 13317 while on the exchange’s website – 130.36 and 15863 respectively. The last trade which was included in the minute bar and formed its Close price was received at 13:25:55 while on the exchange’s website the Close price of this minute bar was formed based on the trade received 3 seconds later, equal to 130.36 and having the volume of 1, which is considered an incomplete lot. This minute there were 156 such odd lots with a total volume of 2546, which is the difference between what is displayed on our platform and on the exchange’s website.

**Late prints**

The second noticeable discrepancy in intraday values is due to the fact that several US stocks on our charts could display large volumes on the 1-minute resolution at 08:00 (UTC-4) during the Pre-market session until October 2024.

This was due to the fact that, at this minute, the provider included so-called late prints, which are often filtered out on other platforms. These are OTC trades that can be executed at different times, but their total volume was included in the 08:00 (UTC-4) minute bar. Since October 2024, we have implemented a filtering feature for such trades on our side so that 1-minute bars with extremely large volumes do not distort technical analysis data. However, such bars have been preserved in history and are available on the chart until October 2024.

 Previous Previous Why does TradingView show USD and BTC pairs that are not listed on the exchange? Next Next Why do spikes occur in crypto market capitalization and dominan​​ce charts? Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43431725759/original/Zk9TMS831sbVZS_Fh0gebyabsnWk7E1ncw.png?1692877891

**Описание:**

Error: Command '['z-ai', 'vision', '-p', 'Describe this TradingView interface image in detail. Explain what it shows, all UI elements, buttons, and their purposes.', '-i', 'https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43431725759/original/Zk9TMS831sbVZS_Fh0gebyabsnWk7E1ncw.png?1692877891']' timed out after 90 seconds

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43431727822/original/Me2fnjzd5nsgLapRVtUFM8FeuAmIFd40Rw.png?1692878384

**Описание:**

This image shows a **TradingView stock market interface** (likely for a specific stock, though the ticker isn’t visible) focused on **intraday price action and volume**. Here’s a detailed breakdown of all elements:  


### 1. **Top Navigation Bar**  
- **Left Section**:  
  - `Nasdaq` (logo/brand) + `Market Activity` (active tab, highlighted in blue) + `News + Insights` + `Solutions` + `About` (navigation links for different sections of the platform).  
- **Right Section**:  
  - Search bar: `Search Symbols, Products & Keywords` (magnifying glass icon) — used to look up stocks, indices, or other financial instruments.  


### 2. **Left Sidebar (Stock-Specific Tools)**  
A vertical menu with options for analyzing the selected stock:  
- `Earnings` (earnings reports/forecasts)  
- `P/E & PEG Ratios` (valuation metrics)  
- `Option Chain` (options contracts data)  
- `Short Interest` (short-selling activity)  
- `Institutional Holdings` (institutional investor positions)  
- `Insider Activity` (trading by company insiders)  
- `SEC Filings` (SEC regulatory filings)  
- `Revenue EPS` (revenue and earnings per share data)  


### 3. **Timeframe Selector (Below Navigation)**  
Buttons to adjust the chart’s time period (e.g., 1 day, 5 days, 1 month):  
- `1D` (1 Day, **active/selected** — highlighted in blue)  
- `5D` (5 Days)  
- `1M` (1 Month)  
- `6M` (6 Months)  
- `YTD` (Year-to-Date)  
- `1Y` (1 Year)  
- `5Y` (5 Years)  
- `MAX` (Maximum available historical data)  


### 4. **Main Chart Area**  
A candlestick-style chart (green/red bars) showing price movement over the trading day:  
- **Y-Axis (Right)**: Price scale (e.g., `$130.25` to `$131.50`).  
- **X-Axis (Bottom)**: Time (trading hours: `8:00 AM` to `4:00 PM`).  
- **Price Action**:  
  - Green bars = price increases (buying pressure).  
  - Red bars = price decreases (selling pressure).  
  - A horizontal black line likely marks a key price level (e.g., opening price or moving average).  
- **Volume Sub-Chart (Below Price Chart)**:  
  - Y-Axis (Right): Volume scale (0 to 3M shares).  
  - X-Axis (Bottom): Time (same as price chart).  
  - Orange bars = trading volume (higher volume = more activity).  


### 5. **Tooltip (Price/Volume Details)**  
A pop-up box showing real-time data for a specific time (hovered over the chart):  
- `Time: 9:25 AM` (current time of the data point).  
- `Last: $130.36` (latest traded price).  
- `PCL: $130.36` (likely “Previous Close Last” or a similar price metric).  
- `Shares: 15 863` (number of shares traded at that time).  


### Purpose of Key Elements  
- **Navigation Tabs**: Switch between market data, news, solutions, or platform info.  
- **Sidebar Tools**: Access fundamental/technical analysis data for the stock.  
- **Timeframe Buttons**: Adjust how far back the chart displays data (e.g., 1 day for intraday, 1 year for long-term trends).  
- **Chart**: Visualize price movements and volume to identify trends, support/resistance, or trading patterns.  
- **Tooltip**: Get precise price/volume data for a specific moment in time.  


This interface is designed for traders/investors to analyze a stock’s intraday performance, volume, and access deeper fundamental data — all core to technical and fundamental analysis on TradingView.

---

### Изображение 3

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43431729689/original/W_MVx_kXKZjKmbgntwAPjcYIb09O4I3apg.png?1692878810

**Описание:**

This image shows a **TradingView chart interface** displaying Apple Inc. (AAPL) stock data on the NASDAQ exchange. Here’s a detailed breakdown of all elements:  


### 1. **Top Bar (Header)**  
- **Symbol & Exchange**: `AAPL : AAPL INC - 1 : NASDAQ` (identifies the stock: Apple Inc., ticker `AAPL`, listed on NASDAQ).  
- **Market Status**: A blue square (likely indicating the market is open).  
- **Price Data**: `O 189.76 H 189.85 L 189.68 C 189.75 -0.08 (-0.04%)`  
  - `O`: Opening price (189.76)  
  - `H`: High price (189.85)  
  - `L`: Low price (189.68)  
  - `C`: Closing price (189.75)  
  - `-0.08 (-0.04%)`: Daily change (down 0.08, -0.04% from the previous close).  
- **Bid/Ask/Last Prices**:  
  - `191.20` (likely the *bid* price, red box), `0.05` (change, red), `191.25` (likely the *ask* price, blue box).  
- **Volume**: `Vol 44.165K` (44,165 thousand shares traded).  


### 2. **Timeframe Selector (Top-Left)**  
Buttons for selecting chart timeframes: `1s` (1 second), `5s`, `15s`, `30s`, `1m` (1 minute), `3m`, `5m`, `7m`, `14m`, `15m`, `23m`, `30m`, `45m`, `1h` (1 hour), `2h`, `3h`, `4h`, `23h`, `24h`, `D` (Daily), `3D`, `14D`, `W` (Weekly), `M` (Monthly).  
- Purpose: Switch between different time intervals (e.g., 1-minute, daily, weekly) to view price action over various periods.  


### 3. **Chart Type & Layout Buttons (Top-Right)**  
- **Chart Type**: Icons for different chart styles (e.g., candlestick, line, bar).  
- **Indicators**: `Indicators` button (opens a menu to add technical indicators like moving averages, RSI, etc.).  
- **Layout**: `88` (grid/layout toggle, e.g., split-screen for multiple charts).  
- **Alerts/Settings**: `Ale` (likely “Alerts” for price notifications) and a user/profile icon.  


### 4. **Main Chart Area**  
- **Candlestick Chart**: Red/green candlesticks represent price action:  
  - *Green candles*: Closing price > opening price (bullish).  
  - *Red candles*: Closing price < opening price (bearish).  
- **Grid**: Dark grid lines for price/time reference.  
- **Watermark**: “AAPL, 1” and “Apple Inc” (confirms the stock and timeframe).  


### 5. **Volume Bar (Bottom of Chart)**  
- **Volume Profile**: Colored bars (green/red) below the main chart, showing trading volume for each candlestick.  
- **Time Axis (X-Axis)**: Timestamps (e.g., `06:32`, `07:00`, `Thu 29 Jun 23 08:00`) mark the time period of the chart (likely a 1-minute intraday chart).  


### 6. **Bottom Bar (Timeframe & Zoom)**  
- **Timeframe Tabs**: `1D` (1 day), `5D` (5 days), `1M` (1 month), `3M`, `6M`, `YTD` (year-to-date), `1Y`, `5Y`, `All` (all available data).  
- **Zoom/Full-Screen**: Icons for zooming in/out or entering full-screen mode.  
- **Timestamp**: `08:17:23 (UTC-4)` (current time, UTC-4 timezone).  
- **Symbol**: `ETH` (likely a typo or secondary symbol; primary is AAPL).  


### Purpose of the Interface  
This TradingView chart is used for **technical analysis** of Apple’s stock. Traders use it to:  
- Analyze price trends (via candlesticks).  
- Identify support/resistance levels.  
- Add indicators (via the `Indicators` button) for deeper analysis.  
- Switch timeframes to view short-term (1-minute) or long-term (daily/weekly) price action.  
- Monitor volume (via the volume bar) to gauge trading activity.  


All elements work together to provide a comprehensive view of AAPL’s price movements, enabling traders to make informed decisions.

---

