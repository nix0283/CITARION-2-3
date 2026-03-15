# Money Flow (MFI)

**URL:** https://www.tradingview.com/support/solutions/43000502348-money-flow-mfi/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Money Flow (MFI) ](/support/solutions/43000502348-money-flow-mfi/) # Money Flow (MFI) Definition The [Money Flow Index indicator (MFI)](https://www.tradingview.com/scripts/moneyflow/) is a tool used in technical analysis for measuring buying and selling pressure. This is done through analyzing both price and volume. The MFI's calculation generates a value that is then plotted as a line that moves within a range of 0-100, making it an oscillator. When the MFI rises, this indicates an increase in buying pressure. When it falls, this indicates an increase in selling pressure. The Money Flow Index can generate several signals, most notably: overbought and oversold conditions, divergences, and failure swings. History The Money Flow Index indicator (MFI) was created by Gene Quong and Avrum Soudack. Calculation There are four separate steps to calculate the Money Flow Index. The following example is for a 14 Period MFI: 1. Calculate the Typical Price (High + Low + Close) / 3 = Typical Price 2. Calculate the Raw Money Flow Typical Price x Volume = Raw Money Flow 3. Calculate the Money Flow Ratio (14 Period Positive Money Flow) / (14 Period Negative Money Flow) Positive Money Flow is calculated by summing the Money Flow of all of the days in the period where Typical Price is higher than the previous period Typical Price. Negative Money Flow is calculated by summing the Money Flow of all of the days in the period where Typical Price is lower than the previous period Typical Price. 4. Calculate the Money Flow Index. 100 - 100/(1 + Money Flow Ratio) = Money Flow Index) The basics The Money Flow Index (MFI) is actually quite similar to The Relative Strength Index (RSI). The RSI is a leading indicator used to measure momentum. The MFI is essentially the RSI with the added aspect of volume. Because of its close similarity to RSI, the MFI can be used in a very similar way. What to look for Overbought/Oversold When momentum and price rise fast enough, at a high enough level, eventual the security will be considered overbought. The opposite is also true. When price and momentum fall far enough they can be considered oversold. Traditional overbought territory starts above 80 and oversold territory starts below 20. These values are subjective however, and a technical analyst can set whichever thresholds they choose. Divergence MFI Divergence occurs when there is a difference between what the price action is indicating and what MFI is indicating. These differences can be interpreted as an impending reversal. Specifically there are two types of divergences, bearish and bullish. Bullish MFI Divergence – When price makes a new low but MFI makes a higher low. Bearish MFI Divergence – When price makes a new high but MFI makes a lower high. Failure Swings Failure swings are another occurrence which can lead to a price reversal. One thing to keep in mind about failure swings is that they are completely independent of price and rely solely on MFI. Failure swings consist of four steps and are considered to be either Bullish (buying opportunity) or Bearish (selling opportunity). Bullish MFI Failure Swing - MFI drops below 20 (considered oversold). - MFI bounces back above 20. - MFI pulls back but remains above 20 (remains above oversold) - MFI breaks out above its previous high. Bearish MFI Failure Swing - MFI rises above 80 (considered overbought) - MFI drops back below 80 - MFI rises slightly but remains below 80 (remains below overbought) - MFI drops lower than its previous low. Summary A financial instrument's price and its correlation with momentum is a very important metric for any technical analyst. Because of this, the Money Flow Index (MFI) can be a very valuable technical analysis tool. Of course, MFI should not be used alone as the sole source for a traders signals or setups. MFI can be combined with additional indicators or chart pattern analysis to increase its effectiveness. Inputs Length The time period to be used in calculating the MFI. 14 is the default. Style MFI Can toggle the visibility of the MFI as well as the visibility of a price line showing the actual current value of the MFI. Can also select the MFI Line's color, line thickness and visual style. Precision Sets the number of decimal places to be left on the indicator's value before rounding up. The higher this number, the more decimal points will be on the indicator's value. Previous Previous Momentum Next Next Moon Phases Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582666158/original/PY9IaQfSZOY9t9jstJe044uZfhdFVrDEaQ.png?1758805419)

**Описание:** This TradingView chart displays Apple Inc. (NASDAQ) on a 1-day timeframe, showing a candlestick price chart with volume bars and a Money Flow Index (MFI) indicator. The main chart shows price action with green/red candles, while the lower panel displays the MFI (purple line) with a scale from 20-80.  

**Top UI Elements**:  
- **Symbol/Timeframe**: \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582666230/original/pdEbLwwve9owl3w3vicwrnCEKTly3UoU1g.png?1758805435)

**Описание:** This TradingView screenshot displays a **1-day (1D) candlestick chart for Apple Inc. (NASDAQ: AAPL)** with the Money Flow Index (MFI) indicator settings open. Here’s a detailed breakdown:  


### **Top Navigation Bar**  
- **Left**:  
  - *Apple Inc · 1D · NASDAQ*: Ticker, timeframe, and exchange.  
  - *Price data*: `O255.22 H255.74 L251.04 C252.31 -2.12 (-0.83%)` (open, high, low, close, change).  
  - *Volume*: `Vol 42.3M` (trading volume).  
- **Right**:  
  - *Timeframe selector*: `D` (day) button (with `+` to add timeframes).  
  - *Tools*: `Indicators` (dropdown), `Alert`, `Replay`, zoom/navigation arrows.  
  - *Account/Settings*: `TradingView` dropdown, `M`/`M`/`S` (likely market data), refresh, theme, fullscreen, camera, and `Publish` button.  


### **Left Sidebar (Drawing/Tools)**  
Icons for:  
- Zoom (`+`/`-`), trend lines, horizontal lines, Fibonacci, text, measure, lock, globe, trash, star (favorites).  


### **Main Chart Area**  
- **Candlestick Chart**: Green/red candles show price action (green = close > open; red = close < open).  
- **Volume Bars**: Below candles, colored (teal/pink) to match candle direction.  
- **MFI Indicator**: A purple line ( Money Flow Index) with:  
  - *Overbought/Oversold bands*: Gray dashed lines at `80` (overbought) and `20` (oversold).  
  - *Middle Band*: Gray dashed line at `50`.  


### **MFI Settings Popup (Center)**  
Tabs: `Inputs` (active), `Style`, `Visibility`.  
- **Style Tab Options**:  
  - `MF` (MFI line): Purple color, solid line, wavy style.  
  - `Overbought`/`Oversold`/`Middle Band`: Gray dashed lines with values (`80`, `20`, `50`).  
  - `Background`: Checkered pattern (enabled).  
  - `OUTPUT VALUES`:  
    - `Precision`: `Default` dropdown.  
    - `Labels on price scale`/`Values in status line`: Both checked.  
- **Buttons**: `Defaults` (dropdown), `Cancel`, `Ok`.  


### **Right Sidebar**  
- *Price scale*: `USD` dropdown (currency).  
- *Chart elements*: Notes, clock (time), depth (order book), chat, target (price alert), drawing tools, calendar, grid, news, help.  


### **Bottom Bar**  
- *Timeframe selector*: `1D 5D 1M 3M 6M YTD 1Y 5Y All` + calendar icon.  
- *Timestamp*: `09:03:19 UTC-4`.  
- *Status*: `ADJ` (adjusted data).  
- *Tabs*: `Pine Editor` (for custom scripts), `Trading Panel`.  


### **Purpose**  
The interface is used for **technical analysis**: viewing price action, volume, and MFI (momentum/overbought/oversold signals) to inform trading decisions. The MFI settings allow customization of the indicator’s appearance and output.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

