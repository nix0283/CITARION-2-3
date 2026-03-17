# Bull Bear Power

**URL:** https://www.tradingview.com/support/solutions/43000717955-bull-bear-power/

---

- [ Help Center ](/)
- / [ Knowledge base ](/knowledge-base/)
- / Indicators 
- / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/)
- / [ Bull Bear Power ](/support/solutions/43000717955-bull-bear-power/)

# Bull Bear Power 

#### Definition 
 The Bull Bear Power (BBP) indicator, otherwise known as the Elder-Ray Index, estimates the relationship 

between the strength of bulls (buyers) and bears (sellers) on an instrument. When the indicator's value is nonzero, it supposedly suggests that either bulls or bears have more power in the market. The greater the distance is from zero, the greater the apparent dominance of bulls or bears. Positive values indicate higher bull power and negative values indicate higher bear power.

#### How to access the Bull Bear Power 

From Supercharts, on the upper toolbar, click Indicators → Technicals → Bull Bear Power. Or simply type "Bull Bear Power" in the Search.

If you want to screen instruments with the Bull Bear Power, you can either open the desired screener from the right toolbar in the "Products" menu or access the standalone screener from the home page.

 From there, click the "Add new filter" button and select the Bull Bear Power

#### How is the Bull Bear Power calculated 

The indicator's calculation consists of two separate components: "Bull Power" and "Bear Power". The "Bull Power" value is the difference between the current high price and the EMA of close prices, and the "Bear Power" value is the difference between the current low price and the same EMA. Taking the sum of the "Bull Power" and "Bear Power" gives us the Bull Bear Power value:

Bull Power = High - EMA

Bear Power = Low - EMA

Bull Bear Power = Bull Power + Bear Power

#### Inputs 

Length

The length for the EMA's smoothing parameter calculation. Its default value is 13.
 Previous Previous Bollinger Bars Next Next Chaikin Money Flow (CMF) Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43600754790/original/DJjmEkg4q8c-NFqqIz3FJ8CB4F_uZK8Z3g.png?1767958564

**Описание:**

This image shows a **TradingView** stock chart interface for **Tesla, Inc. (TSLA)** on the NASDAQ exchange. Here’s a detailed breakdown of all elements:  


### 1. **Top Navigation Bar**  
- **Left Side**:  
  - `TSLA`: Ticker symbol for Tesla.  
  - `+`: Button to add a new chart/asset.  
  - `5m`, `15m`, `45m`, `4h`, `D`, `W`: Timeframe buttons (5-minute, 15-minute, 45-minute, 4-hour, Daily, Weekly) to adjust the chart’s time scale.  
  - `⚖️` (Balance/Compare): Icon for comparing assets or viewing account balance.  
  - `📊` (Chart Type): Dropdown to switch between candlestick, line, bar, etc., chart types.  
  - `🔲` (Chart Layout): Icon to adjust chart layout (e.g., split panes).  
  - `🔄` (Refresh): Reload the chart.  
  - `⏩⏪` (Time Navigation): Skip forward/backward in time.  
  - `↩️↪️` (Undo/Redo): Revert or reapply chart changes.  

- **Right Side**:  
  - `☐ TradingView`: Checkbox to enable/disable TradingView branding.  
  - `🔄` (Reload): Refresh the page.  
  - `⚙️` (Settings): Access TradingView settings.  
  - `🔍` (Fullscreen): Expand the chart to full screen.  
  - `📷` (Screenshot): Capture the chart.  
  - `Publish`: Button to publish the chart (share or save).  


### 2. **Ticker & Price Info**  
- `Tesla, Inc. · 15 · NASDAQ`: Company name, exchange, and current time (15 = 3 PM, likely).  
- Price details: `O402.06 H402.88 L401.00 C401.13 -0.90 (-0.22%)` (Open, High, Low, Close, change, % change).  
- Volume: `Vol300.52K -7.67 (-1.88%)` (volume, change, % change).  
- `USD`: Currency selector (dropdown to switch currencies).  
- `450.00`: Price scale (right y-axis, showing price levels).  


### 3. **Buy/Sell Prices**  
- `405.01 SELL` (red box): Current *sell* (ask) price (red = sell).  
- `405.15 BUY` (blue box): Current *buy* (bid) price (blue = buy).  
- `0.14`: Spread (difference between buy/sell prices).  


### 4. **Chart Area**  
- **Candlestick Chart**: Red/green candles show price action (red = closing < opening; green = closing > opening).  
- **Trend Lines/Levels**: Horizontal lines (e.g., dashed red line) may represent support/resistance.  


### 5. **Indicators & Panels**  
- **Bottom Indicator (ADR 14)**: A pink line graph (likely the *Average Daily Range* over 14 periods) showing volatility.  
- **Timeframe Selector**: `1D 5D 1M 3M 6M YTD 1Y 5Y All` (buttons to switch the chart’s time range).  
- `📈` (Indicator Settings): Icon to customize the ADR indicator.  


### 6. **Right Sidebar (Open Menu)**  
A dropdown menu is open, showing:  
- **Header**: `PRODUCTS` (section title).  
- `🔍 Screeners` (highlighted with orange border + star): Tool to filter stocks by criteria (e.g., volume, price).  
- Other options:  
  - `📅 Calendars`: Economic event/calendar data.  
  - `📰 News Flow`: Real-time news for the asset.  
  - `📦 Portfolio` (NEW): View/manage your portfolio.  
  - `📈 Yield Curves`: Interest rate/yield data.  
  - `⚖️ Options`: Options trading tools.  
  - `🌐 Macro Maps`: Economic/macro data visualizations.  
  - `📊 Fundamental Graphs` (NEW): Fundamental analysis charts.  
  - `SOCIAL` (section):  
    - `📡 Community`: Social trading/community features.  
    - `🔔 Notifications`: Alerts/notifications.  


### 7. **Left Toolbar**  
Icons for various tools (from top to bottom):  
- `📊` (Chart): Main chart tool.  
- `🔗` (Link/Compare): Compare assets.  
- `📈` (Indicators): Add technical indicators.  
- `📝` (Drawing): Draw on the chart (trend lines, annotations).  
- `T` (Text): Add text labels.  
- `😊` (Alerts): Set price alerts.  
- `📏` (Measure): Measure price/time distances.  
- `🔍` (Zoom): Zoom in/out.  
- `🧲` (Magnet): Snap to price levels.  
- `✏️` (Edit): Edit chart elements.  
- `🔒` (Lock): Lock the chart.  
- `👁️` (Hide/Show): Toggle chart visibility.  
- `🌐` (Global): Access global market data.  
- `🗑️` (Delete): Remove the chart/asset.  


### 8. **Bottom Tabs**  
- `Pine Editor`: For creating custom indicators (Pine Script).  
- `Trading Panel`: For executing trades (if linked to a broker).  


### Purpose of the Interface  
This is a **technical analysis dashboard** for Tesla stock, allowing users to:  
- View price action (candlesticks) and volatility (ADR indicator).  
- Adjust timeframes, add indicators, and draw on the chart.  
- Access tools like screeners, news, and portfolio management.  
- Execute trades (via the Trading Panel, if enabled) or analyze fundamentals.  


The open “Screeners” menu suggests the user is exploring stock screening tools, while the candlestick chart and ADR indicator help analyze Tesla’s price trends and volatility.

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43600754966/original/Ub5B43O01G3JLdrrjpBS8DwjQMk2StiTHw.png?1767958614

**Описание:**

This image shows a **TradingView** interface with two main panels: a **stock chart** (left) and a **stock screener** (right), demonstrating how users analyze and filter stocks. Here’s a detailed breakdown:


### **Left Panel: Tesla (TSLA) Stock Chart**
This panel displays a **15-minute candlestick chart** for Tesla (TSLA) on the NASDAQ exchange.  

#### **Top Bar (Chart Header):**  
- **Timeframe Selector:** Dropdown showing \

---

### Изображение 3

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582452802/original/qaXfqHquDjazjPZWOQZNvTO8Uz_jr5uPag.png?1758723265

**Описание:**

This image shows a **TradingView chart interface** displaying Apple Inc. (NASDAQ: AAPL) stock data with a candlestick chart and volume bars. Here's a detailed breakdown:


### **Top Navigation Bar**
- **Left Side**: 
  - \

---

