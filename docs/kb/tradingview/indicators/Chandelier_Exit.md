# Chandelier Exit

**URL:** https://www.tradingview.com/support/solutions/43000773013-chandelier-exit/

---

- [ Help Center ](/)
- / [ Knowledge base ](/knowledge-base/)
- / Indicators 
- / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/)
- / [ Chandelier Exit ](/support/solutions/43000773013-chandelier-exit/)

# Chandelier Exit 
 The Chandelier Exit, created by Charles Le Beau and popularized by Alexander Elder, is a volatility-based indicator that identifies stop-loss exit points based on local price extremes and [Average True Range (ATR)](https://www.tradingview.com/support/solutions/43000501823-average-true-range-atr/). The indicator's purpose is to help traders stay in a trend-following trade until the potential onset of a significant trend reversal.

Traders typically use Chandelier Exit levels as guides for stop-loss placement to aid in avoiding early trade exits, and as trend filters for signals from other indicators.

#### Calculation 

The Chandelier Exit indicator calculates two stop levels, one for long trades and the other for short trades, by finding the highest and lowest prices over a given lookback period, then adding and subtracting multiples of ATR. The formulas to calculate the exit levels are as follows:
 Long Exit = Highest Price − ATR × Multiplier Short Exit = Lowest Price + ATR × Multiplier 
Where:

- **Highest Price** and **Lowest Price** are the highest and lowest prices over the specified lookback period
- **ATR** is the Average True Range with a given length
- **Multiplier** is a scaling factor that affects the distance at which the stop levels trail behind the highest and lowest prices

The resulting levels trail behind the market price by a variable amount, expanding or contracting the trailing distance in response to changes in volatility or local price extremes.

The long exit value (blue line) increases when either of the following conditions occurs:

- The highest price increases by a greater amount than the increase in ATR
- The ATR decreases by a greater amount than the decrease in the highest price

Likewise, the short exit value (orange line) decreases when either of these conditions occurs:

- The lowest price decreases by a greater amount than the increase in ATR
- The ATR decreases by a greater amount than the increase in the lowest price

The objective of the Chandelier Exit indicator is to identify potential exit points based on significant price reversals after an established trend:

- The market price crossing below the long exit level might suggest the end of an uptrend, signaling a possible exit point for a long position
- The price crossing above the short exit level might suggest the end of a downtrend, signaling a possible exit point for a short position

Although the indicator's intended purpose is to identify exit points, some traders also use Chandelier Exit levels to help detect trends for creating or filtering trading signals. The market price crossing or persisting above the levels might suggest confirmation of a strong uptrend, and vice versa for a downtrend.

#### Inputs 

#### Length 

The number of bars back to search to determine the highest high for the long exit level and the lowest low for the short exit level.

#### ATR length 

The length for the smoothing factor of the Average True Range for both exit levels. A lower value provides more responsiveness to rapid fluctuations, while a higher value increases smoothing for longer-term volatility.

#### ATR multiplier 

The ATR scaling factor for both exit levels. It affects the distance at which the levels trail behind the highest and lowest prices. A lower value causes the levels to follow the high and low more closely. A higher value increases the distance from the price extremes to the stop levels.

#### Timeframe 

Sets the timeframe that the indicator uses for its calculations. The "Wait for timeframe closes" checkbox below determines whether the indicator shows results only when a bar on the specified timeframe closes. See the [Leveraging multi-timeframe analysis](https://www.tradingview.com/support/solutions/43000591555-leveraging-multi-timeframe-analysis/) article to learn more.
 Previous Previous Chande Momentum Oscillator (CMO) Next Next Chop Zone Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43593144915/original/IIP0CMIgDnh75lQk3AFrxxVawjaaY051uA.png?1763771753

**Описание:**

This image displays a **TradingView chart** for the **E-mini S&P 500 Futures (1D, CME)**, a financial instrument traded on the Chicago Mercantile Exchange. Below is a detailed breakdown of the interface elements, their purposes, and what the chart conveys:


### **1. Header & Instrument Information**  
- **Title**: `E-mini S&P 500 Futures · 1D · CME`  
  - Specifies the instrument (E-mini S&P 500 Futures), time frame (1D = daily), and exchange (CME).  
- **Price Data**: `O6,560.00 H6,677.50 L6,525.00 C6,620.25 +62.75 (+0.96%)`  
  - `O` (Open): 6,560.00 (first price of the day).  
  - `H` (High): 6,677.50 (highest price of the day).  
  - `L` (Low): 6,525.00 (lowest price of the day).  
  - `C` (Close): 6,620.25 (last price of the day).  
  - `+62.75 (+0.96%)`: Daily price change (green = positive, indicating the close is higher than the previous day’s close).  


### **2. Time Frame & Navigation**  
- **Time Frame Selector**: A toggle button (gray circle with \

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43593145035/original/DontH-vnasHOzN-3lDdTEgibWn6hXLhYmw.png?1763771852

**Описание:**

This image shows the **\

---

