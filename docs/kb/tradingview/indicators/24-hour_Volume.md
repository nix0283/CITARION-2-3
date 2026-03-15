# 24-hour Volume

**URL:** https://www.tradingview.com/support/solutions/43000668584-24-hour-volume/

---

- [ Help Center ](/)
- / [ Knowledge base ](/knowledge-base/)
- / Indicators 
- / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/)
- / [ 24-hour Volume ](/support/solutions/43000668584-24-hour-volume/)

# 24-hour Volume 

#### Definition
 Volume is the total amount of assets traded in a specific period of time. The 24-hour Volume indicator is used to measure the total volume of a symbol traded in the last 24 hours, expressed as in currency. It can be used to measure the market's interest in a particular symbol.

#### Calculation

To calculate the 24-hour volume, the indicator uses data from different timeframes; the timeframes chosen depend on the timeframe on the main chart:

Chart timeframe

Timeframe used for the calculation

less than 1D

1

1D - 1W

5

greater than 1W

60

The indicator calculates the sum of the volume for the last X bars of the lower timeframe, where X is the number of bars that opened in the last 24 hours. The indicator works with calendar hours regardless of the symbol session, so if there has been no past trades for 24 hours or more (e.g., on the first Monday bar on a symbol that is only traded on business days), 24-hour volume can be equal to the regular volume data.

The indicator always displays the 24-hour volume converted to the currency selected in the indicator's inputs. This means that, if the exchange presents its volume data in base currency (e.g., when for BTCUSD, the volume represents the number of BTC traded), the *24-hour Volume* indicator converts the base volume into currency volume by multiplying the volume by the price on the chart. The 'Price Source' input can be used to select which specific chart value will be used for this conversion.

The volume can be additionally converted into a currency different from the one on the chart. This can be done by switching the 'Target Currency' input from Default to a different currency.

#### What to look for

The 24-hour volume is a metric used to track the total value of all cryptocurrency transactions within a 24-hour period. It can be used to measure the market's interest in a particular symbol and gauge its overall health. A high 24-hour volume means that there is high demand for the symbol and that it is healthy and viable. A low 24-hour volume may indicate that the symbol is not as popular as others.

#### Inputs

 Price Source 
Specifies the price source used to convert base volume into currency volume, if necessary.
 Target Currency 
Sets the currency that the 24-hour volume will be presented in. Available options: Default, USD, EUR, CAD, JPY, GBP, HKD, CNY, NZD, RUB.
 Previous Previous 1 year active supply % Next Next Accumulation Distribution (ADL) Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582424451/original/CF05HhagG3vCTnXMjW_LInVQaAYP35Zufw.png?1758716522

**Описание:**

This image shows a **TradingView chart interface** displaying Apple Inc. (NASDAQ: AAPL) stock data with a candlestick price chart and volume bars. Here's a detailed breakdown:


### **Top Navigation Bar**
- **Left Side**: 
  - `TV` logo (TradingView branding)
  - Zoom in/out buttons (`+`/`-`)
  - Timeframe selector: `D` (Daily)
  - Chart type toggle (candlestick icon)
  - `Indicators` dropdown (for adding technical indicators)
  - Chart layout options (grid, full-screen)
  - `Alert` (price alert settings)
  - `Replay` (backtest market movements)
  - Undo/redo arrows
- **Right Side**: 
  - `TradingView` dropdown (account/settings)
  - Market data toggles (`M`/`M`/`S`)
  - Chart tools (refresh, settings, screenshot, publish)


### **Chart Header**
- **Symbol & Timeframe**: `Apple Inc · 1D · NASDAQ` (1-day candlestick chart)
- **Price Data**:  
  `O255.88 H257.34 L253.58 C254.43 -1.65 (-0.64%)`  
  (Open: $255.88, High: $257.34, Low: $253.58, Close: $254.43, down $1.65/-0.64%)


### **Main Chart Area**
- **Candlestick Chart**: Green candles (price up) and red candles (price down) showing daily price action over several months (July–October).
- **Volume Bars**: Blue bars below the price chart, representing trading volume (y-axis: 0–20B shares).
- **X-axis**: Dates (15, 18, 23, 28, Aug, 6, 11, 14, 19, 22, 27, Sep, 5, 10, 15, 18, 23, 26, Oct, 6, 9, 14).
- **Y-axis (Price)**: $0–$260.00 (right side).


### **\

---

