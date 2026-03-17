# Aroon Oscillator

**URL:** https://www.tradingview.com/support/solutions/43000773004-aroon-oscillator/

---

- [ Help Center ](/)
- / [ Knowledge base ](/knowledge-base/)
- / Indicators 
- / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/)
- / [ Aroon Oscillator ](/support/solutions/43000773004-aroon-oscillator/)

# Aroon Oscillator 
 The Aroon Oscillator, created by Tushar Chande in 1995, is a trend indicator that measures the recency of the highest highs versus the lowest lows in market prices over a lookback period. It calculates the difference between the Aroon Up and Aroon Down values from the [Aroon](https://www.tradingview.com/support/solutions/43000501801-aroon/) indicator to produce a single, bounded metric that oscillates between -100 and +100.

Traders often use the Aroon Oscillator to assess the strength of short-term trends and to identify potential trend reversals or turning points in the market. 

#### Calculation 

The Aroon Oscillator's calculation relies on the values of Aroon Up and Aroon Down, which respectively measure the recency of the highest high and lowest low prices for a given lookback period. Both values range between 0 and 100, where:

- **Aroon Up** is 100 on bars where the market price reaches the highest high for the current period. The value decreases for each successive bar whose high price is less than the highest value.
- **Aroon Down** is 100 on bars where the market price reaches the lowest low for the current period. The value decreases for each successive bar whose low price is greater than the lowest value.

The indicator transforms these two readings into a single oscillator by calculating their difference:
 Aroon Oscillator = Aroon Up - Aroon Down 
The resulting oscillator ranges from -100 to +100, where:

- A positive value means that Aroon Up is greater than Aroon Down, indicating that the market price reached the highest high more recently than the lowest low. If the value is +100, Aroon Up is 100 and Aroon Down is 0, meaning the price reached the highest high on the current bar without reaching the lowest low on any bar in the period.
- A negative value means that Aroon Up is less than Aroon Down, indicating that the market price reached the lowest low more recently than the highest high. If the value is -100, Aroon Up is 0 and Aroon Down is 100, meaning the price reached the lowest low on the current bar without reaching the highest high on any bar in the period.
- A value near 0 means that Aroon Up and Aroon Down are roughly equal. It indicates that the price recently moved from the highest high to the lowest low, or vice versa, across a small number of bars relative to the length of the lookback period.

This indicator plots the oscillator as a color-coded line with a background fill, and it displays horizontal levels at -90, 0, and +90 by default. You can customize the colors and the values of the levels from the "Style" tab of the indicator's settings.

#### Inputs 

#### Length 

The number of bars to analyze for the Aroon Up and Aroon Down calculation. The length for the highest high and lowest low is one greater than this value.

#### Timeframe 

Sets the timeframe that the indicator uses for its calculations. The "Wait for timeframe closes" checkbox below determines whether the indicator shows results only when a bar on the specified timeframe closes. See the [Leveraging multi-timeframe analysis](https://www.tradingview.com/support/solutions/43000591555-leveraging-multi-timeframe-analysis/) article to learn more.
 Previous Previous Aroon Next Next Auto Fib Extension Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43593134217/original/vsIQBPJlQ3Mi2iUQl2zZ4hvX9XFwwz2qYA.png?1763763484

**Описание:**

This image displays a **TradingView chart interface** for the stock **Moderna, Inc. (NASDAQ: MRNA)**, showing a **1-day (1D) candlestick chart** with an additional technical indicator (Aroon Oscillator) below. Here’s a detailed breakdown of all elements:


### 1. **Top Header (Symbol & Price Info)**  
- **Symbol & Exchange**: `Moderna, Inc. • 1D • NASDAQ`  
  - Identifies the stock (Moderna) and the chart’s time frame (1D = daily) and exchange (NASDAQ).  
- **Market Status Icons**:  
  - Blue moon icon: Indicates the market is in a pre-market or after-hours session (not regular trading hours).  
  - Pink “≈” icon: Suggests the price is an estimate or not yet finalized (common in pre/post-market).  
- **Price Data**: `O588.50 H598.12 L581.86 C594.25 +5.10 (+0.87%)`  
  - `O`: Opening price ($588.50).  
  - `H`: High price ($598.12).  
  - `L`: Low price ($581.86).  
  - `C`: Closing price ($594.25, highlighted in green).  
  - `+5.10 (+0.87%)`: Daily price change (increase of $5.10, or 0.87%).  


### 2. **Main Chart (Candlestick Chart)**  
- **Candlestick Pattern**: Red/green vertical bars (candles) represent daily price action:  
  - **Green candles**: Closing price > opening price (price increased).  
  - **Red candles**: Closing price < opening price (price decreased).  
- **Price Axis (Right)**: Vertical scale from ~$450 to $800, showing the stock’s price range over the period.  
- **Trend**: The chart shows a general upward trend from April to mid-2023, with fluctuations (e.g., a peak in July, a dip in October, and a recent rise in November).  


### 3. **Technical Indicator: Aroon Oscillator (Below Main Chart)**  
- **Label**: `Aroon Osc 14` (Aroon Oscillator with a 14-period setting).  
- **Value**: `-85.71` (highlighted in red, bottom-right of the indicator).  
- **Color Coding**:  
  - **Green shaded area**: Positive values (bullish momentum, price trending up).  
  - **Red shaded area**: Negative values (bearish momentum, price trending down).  
- **Horizontal Dashed Lines**:  
  - Top line: ~80 (overbought/bullish threshold).  
  - Bottom line: ~-80 (oversold/bearish threshold).  
- **Interpretation**: The Aroon Oscillator measures trend strength. A value of `-85.71` (deep in the red zone) suggests **strong bearish momentum** (price is likely in a downtrend).  


### 4. **Time Axis (Bottom)**  
- Months: `Apr, May, Jun, Jul, Aug, Sep, Oct, Nov` (x-axis labels, showing the time period covered by the chart).  


### 5. **UI Elements & Buttons**  
- **“PRO” Badge (Bottom-Left)**: Indicates a TradingView Pro (paid) subscription.  
- **Settings Icon (Bottom-Right)**: Gear icon (⚙️) for customizing chart settings (e.g., indicators, time frame, colors).  


### Purpose of the Interface  
This chart is used for **technical analysis** to:  
- Track Moderna’s daily price movements (via candlesticks).  
- Assess trend strength and direction (via the Aroon Oscillator).  
- Identify potential entry/exit points for trading (e.g., the bearish Aroon signal might suggest selling or shorting).  


In summary, the interface combines price action (candlesticks) with a momentum indicator (Aroon Oscillator) to help traders analyze Moderna’s stock performance and make data-driven decisions.

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43593133277/original/3DiHBaQ1Ear-2nBpT2XKb3S6BCuP-2asJQ.png?1763762970

**Описание:**

This image shows the **configuration panel for the \

---

