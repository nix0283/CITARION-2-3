# Relative Vigor Index

**URL:** https://www.tradingview.com/support/solutions/43000591593-relative-vigor-index/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Relative Vigor Index ](/support/solutions/43000591593-relative-vigor-index/) # Relative Vigor Index Definition The Relative Vigor Index (RVI) is based on the likelihood of prices closing higher than the open in market uptrends, and similarly, closing lower than the open in downtrends. The Relative Vigor Index compares the closing price of a security or asset to its trading range. Calculations To calculate the Relative Vigor Index (RVI), follow the instructions that are listed underneath the following formula. Definitions: a = Close−Open b = Close−Open One Bar Prior to a c = Close−Open One Bar Prior to b d = Close−Open One Bar Prior to c e = High−Low of Bar a f = High−Low of Bar b g = High−Low of Bar c h = High−Low of Bar d i = RVI Value One Bar Prior j = RVI Value One Bar Prior to i k = RVI Value One Bar Prior to j N = Minutes/Hours/Days/Weeks/Months - To start, begin by choosing an N period to examine for future calculations. - Once you’ve chosen your period, you’ll then need to identify the Open, High, Low, and Close values for the current bar you’re analyzing. - Next, you’ll need to identify the Open, High, Low and Close values for the lookback periods prior to the current bar in your calculations. - Once you’ve done this, proceed by calculating the simple moving averages for the numerator as well as the denominator over the N period that you selected in Step 1. - Then go ahead and divide the numerator value from the denominator. - The final step is to then take the result and place it in the Signal Line equation. Plot this on a graph and you’ll have the calculation result you need. Takeaways Rather than oscillate across a trend, the Relative Vigor Index (RVI) oscillates across a center line, going either higher or lower than the line itself. Any divergences that occur between the RVI and the indicator’s price point towards a trend change or reversal of sorts. For example, a trader or investor could use the RVI indicator to aid them in identifying any potential trend changes by examining divergences with the price as it is currently and further utilizing the indicator to determine market entry and exit points with the help of other technical analysis indicators and chart patterns. There are various types of popular trading signals that can be used with the Relative Vigor Index, the two most commonly used being RVI Divergences and RVI Crossovers. RVI Divergences signify the divergence between the indicator and its price. This divergence suggests there will be a near-term trend change, specifically regarding the indicator’s trend direction. For instance, if a stock price is rising and the RVI indicator is falling below the central line as well, RVI Divergences will predict that the stock will then reverse in trend direction over the near-term. RVI Crossovers are leading indicators of future price direction and help determine a crossover to be either bullish or bearish depending on its position above or below the signal line. If a crossover is above the signal line, it signifies a bullish indicator. If a crossover is below the signal, it signifies a bearish indicator. What to look for The Relative Vigor Index compares the close to the open. It is a centered oscillator, that operates by moving around the center line rather than price. It is displayed either above or below the price chart and is best used with other technical analysis indicators and chart patterns in order to get the best and most profitable outcomes. Limitations The RVI tends to work better in markets that are trending as it seems to generate false signals and data when applied to range-bound markets. One way a trader can aim to improve their RVI results is to set long-term lookback periods. This will reduce the impact that short-term countertrends have on the overall data and takes out short-term changes from data readings. Summary The Relative Vigor Index is a technical analysis indicator that analyzes and measures trend strength and direction by comparing a security’s closing price to its trading range where the results are then smoothed and used in further analysis. RVI Divergences and RVI Crossovers are the two most popular trading signals to use under the RVI indicator and are best used in analyzing data from trending markets. Previous Previous Relative Strength Index (RSI) Next Next Relative Volatility Index Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43153135795/original/d1if30D990lSnnCTCQlyGnhQYiA5UNx2vg.png?1598531285)

**Описание:** The image displays mathematical formulas for the **Relative Vigor Index (RVI)**, a technical indicator used in trading. Here’s a breakdown of each element:  

### 1. Numerator Formula  
- **Purpose**: Calculates a weighted average of price components (open, high, low, close) for the numerator of RVI.  
- **Formula**: \( \text{NUMERATOR} = \frac{a + (2 \times b) + (2 \times c) + d}{6} \)  
  - Variables: \( a, b, c, d \) represent price data (e.g., open, high, low, close) for a single period.  
  - Weighting: \( b \) and \( c \) (likely high/low) are weighted twice as heavily as \( a \) (open) and \( d \) (close).  


### 2. Denominator Formula  
- **Purpose**: Calculates a weighted average of price components for the denominator of RVI (typically a reference period, e.g., prior period).  
- **Formula**: \( \text{DENOMINATOR} = \frac{e + (2 \times f) + (2 \times g) + h}{6} \)  
  - Variables: \( e, f, g, h \) represent price data for the reference period.  
  - Weighting: Same as the numerator ( \( f, g \) weighted twice).  


### 3. RVI Formula  
- **Purpose**: Computes the RVI by comparing the smoothed numerator to the smoothed denominator.  
- **Formula**: \( \text{RVI} = \frac{\text{SMA of NUMERATOR for } N \text{ periods}}{\text{SMA of DENOMINATOR for } N \text{ periods}} \)  
  - SMA: Simple Moving Average (smooths price data over \( N \) periods, e.g., 10 or 14).  
  - Interpretation: RVI measures price momentum; values above 1 suggest upward momentum, below 1 suggest downward momentum.  


### 4. Signal Line Formula  
- **Purpose**: Provides a smoothed version of RVI to generate trading signals (e.g., crossovers).  
- **Formula**: \( \text{Signal Line} = \frac{\text{RVI} + (2 \times i) + (2 \times j) + k}{6} \)  
  - Variables: \( i, j, k \) represent prior RVI values (e.g., the last 3 RVI readings).  
  - Weighting: Same as the numerator/denominator ( \( i, j \) weighted twice).  


### UI/Context Notes  
- The image is a **text-based formula sheet** (not a TradingView chart) explaining RVI’s calculation.  
- In TradingView, these formulas would be implemented as a custom indicator, with the Signal Line used to identify trend changes (e.g., RVI crossing above/below the Signal Line).  

This structure ensures clarity on how RVI and its signal line are derived, aiding traders in interpreting momentum and generating signals.


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

