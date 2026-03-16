# Choppiness Index (CHOP)

**URL:** https://www.tradingview.com/support/solutions/43000501980-choppiness-index-chop/

---

- [ Help Center ](/)
- / [ Knowledge base ](/knowledge-base/)
- / Indicators 
- / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/)
- / [ Choppiness Index (CHOP) ](/support/solutions/43000501980-choppiness-index-chop/)

# Choppiness Index (CHOP) 

#### 

#### Definition
 The [Choppiness Index (CHOP)](https://www.tradingview.com/scripts/choppinessindex/) is an indicator designed to determine if the market is choppy (trading sideways) or not choppy (trading within a trend in either direction). The Choppiness Index is an example of an indicator that is not directional at all. CHOP is not meant to predict future market direction, it is a metric to be used to for defining the market's trendiness only. A basic understanding of the indicator would be; higher values equal more choppiness, while lower values indicate directional trending.

#### History

The Choppiness Index was created by Australian commodity trader E.W. Dreiss.

#### Calculation

100 * LOG10( SUM(ATR(1), n) / ( MaxHi(n) - MinLo(n) ) ) / LOG10(n) n = User defined period length. LOG10(n) = base-10 LOG of n ATR(1) = Average True Range (Period of 1) SUM(ATR(1), n) = Sum of the Average True Range over past n bars MaxHi(n) = The highest high over past n bars 
#### The basics

- As a range-bound oscillator, The Choppiness Index has values that always fall within a certain range. CHOP produces values that operate between 0 and 100.
- The closer the value is to 100, the higher the choppiness (sideways movement) levels.
- The closer the value is to 0, the stronger the market is trending (directional movement)
- Often times, technical analysts will use a threshold on the higher end to indicate the market moving into choppiness territory. Likewise there will be a threshold in the lower zone to indicate trending territory. Common threshold values are popular Fibonacci Retracements. 61.8 for the high threshold and 38.2 for the lower threshold.

#### What to look for
 Market Condition Confirmation 
- The first way that technical analysts can use CHOP is to confirm current market conditions. With readings above the upper threshold, continued sideways movement maybe expected.

- Readings below the lower threshold may indicate a continuing trend.

 Upcoming Trendiness Change 
- The second practical use for CHOP is anticipating changes in the market's trendiness. It is generally believed that extended periods of consolidation (sideways trading) are followed by an extended period of trending (strong, directional movement) and vice versa.

#### Summary

The Choppiness Index is an interesting metric which can be useful in identifying ranges or trends. What analysts need to be wary of, is identifying when a range or trend is likely to continue and when it is likely to reverse. The best way to accomplish this would be by combining CHOP with additional charting tools and analysis. For example, using CHOP in conjunction with trend lines and traditional pattern recognition.
 Inputs Length 
The time period to be used in calculating CHOP (14 is the Default).
 Offset 
Changing this number will move the CHOP either Forwards or Backwards relative to the current market. 0 is the default.

#### Style
 CHOP 
Can toggle the visibility of the CHOP as well as the visibility of a price line showing the actual current price of the CHOP. Can also select the CHOP Line's color, line thickness and visual style (Line is the Default).
 Upper Band 
Can toggle the visibility of the Upper Band as well as select its value, color, line thickness and line style.
 Lower Band 
Can toggle the visibility of the Lower Band as well as select its value, color, line thickness and line style.
 Background 
Toggles the visibility of a Background color within the Bands. Can also change the Color itself as well as the opacity.
 Precision 
Sets the number of decimal places to be left on the indicator's value before rounding up. The higher this number, the more decimal points will be on the indicator's value.
 Previous Previous Chop Zone Next Next Commodity Channel Index (CCI) Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582463602/original/UcO1DEdo1pp1GXMDkdQrrxwcb9K1U0T78w.png?1758725703

**Описание:**

Image could not be processed

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582463704/original/hEKpxhfNOMBX9wElBUt3X6j6iYKWSXHtTg.png?1758725724

**Описание:**

This image shows a **TradingView charting interface** displaying Apple Inc. (NASDAQ: AAPL) stock data with a **CHOP (Choppiness Index) indicator** configuration panel open. Here's a detailed breakdown:


### **1. Top Navigation Bar**
- **Left Side**: 
  - `AAPL` (ticker symbol) with a green dot (live data indicator).
  - `Apple Inc · 1D · NASDAQ` (stock name, time frame: 1-day, exchange).
  - Price data: `O255.22 H255.74 L251.72 C252.02 -2.42 (-0.95%)` (Open, High, Low, Close, change).
- **Middle**: 
  - `Indicators` (dropdown to add technical indicators).
  - `Alert` (set price/volume alerts).
  - `Replay` (replay market data for backtesting).
  - Navigation arrows (back/forward for chart history).
- **Right Side**: 
  - `TradingView` (logo, dropdown for account/settings).
  - Timeframe buttons: `M` (monthly), `M` (monthly), `S` (session).
  - Icons: `Refresh` (reload data), `Settings` (chart preferences), `Fullscreen` (expand chart), `Camera` (screenshot), `Publish` (share chart).


### **2. Left Sidebar (Drawing/Tools Panel)**
Vertical icons for chart tools:
- `+` (add indicator).
- Line/shape tools (trendline, horizontal line, etc.).
- `T` (text annotation).
- `Zoom` (magnify chart).
- `Magnet` (snap to price levels).
- `Lock` (lock chart).
- `Globe` (global market data).
- `Trash` (delete elements).
- `Star` (favorite chart).


### **3. Main Chart Area**
- **Price Chart**: Candlestick chart (green = up, red = down) showing Apple's 1-day price action. Y-axis (right) shows price levels (260.00 to 30.00).
- **CHOP Indicator**: Below the price chart, a blue line (CHOP) with a light blue background (choppy market zone). The CHOP value fluctuates, indicating market volatility.


### **4. CHOP Configuration Panel (Modal)**
A pop-up window for customizing the CHOP indicator, with three tabs: `Inputs`, `Style` (active), `Visibility`.

#### **Style Tab Options**:
- **CHOP**: 
  - Checkbox (enabled).
  - Color picker (blue square) + line style (solid line) + line type (wavy).
- **Upper Band**: 
  - Checkbox (enabled).
  - Color picker (gray) + line style (dashed) + value `61.8` (Fibonacci level).
- **Middle Band**: 
  - Checkbox (enabled).
  - Color picker (checkered) + line style (dashed) + value `50`.
- **Lower Band**: 
  - Checkbox (enabled).
  - Color picker (gray) + line style (dashed) + value `38.2`.
- **Background**: 
  - Checkbox (enabled).
  - Color picker (checkered) for the choppy zone background.
- **OUTPUT VALUES**:
  - `Precision`: Dropdown (set to \

---

