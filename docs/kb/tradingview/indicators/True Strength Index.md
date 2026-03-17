# True Strength Index

**URL:** https://www.tradingview.com/support/solutions/43000592290-true-strength-index/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ True Strength Index ](/support/solutions/43000592290-true-strength-index/) # True Strength Index Definition The True Strength Index indicator is a momentum oscillator designed to detect, confirm or visualize the strength of a trend. It does this by indicating potential trends and trend changes through crossovers while fluctuating between positive and negative territory. Positive refers to buyers being in more control and negative refers to sellers being in more control. Calculations The Truth Strength Index indicator can be calculated with a few simple steps. Below are formulas and relevant definitions for the calculation. Definitions It’s important to know how to calculate the EMA when computing the True Strength Index indicator. You can check the calculations for the EMA indicator here. - Start off calculating the indicator by recording price changes and absolute price changes. - Then calculate the price change 25-period EMA and the subsequent absolute price change 25-period EMA. - Next, you’ll need to compute the True Strength Index indicator value by plugging in the double smoothed price change and double smoothed absolute price change to the True Strength Index indicator formula. Takeaways The True Strength Index indicator fluctuates between positive and negative territory, where positive refers to a bullish confirmation and negative refers to a bearish confirmation. Additionally, if the indicator diverges from price, it may be a signal that the price trend is weak and/or weakening further and may reverse direction in the near future. The True Strength Index indicator is projected by a single line. What to look for The True Strength Index indicator uses a single line, usually with a 7-12 ranged period EMA of the single line. A signal line crossover occurs when the indicator crosses the signal line. If it crosses above the signal line from below, it could warrant a possible long position. If the True Strength Index crosses below the signal line from above, it could warrant a possible selling or short selling position. The indicator also generates signals for centerline crossovers. These signals determine the direction of price momentum and alert the trader of when momentum is strong and positive (when the indicator is above zero) or when it is weak and negative (when the indicator is below zero). The centerline can also be used for directional bias. In these cases, traders may decide to enter only in a long position when the indicator is projected as being above the centerline. If the indicator was valued below zero, however, the trader could then decide to only trade in short positions. In addition, breakouts and divergence are also used by traders using the True Strength Index indicator as a way to identify and determine price momentum shifts and general changes in price. Limitations The True Strength Index indicator alerts traders with many signals, although some of these are false signals and can affect a trader’s position. False signals often refer to price action being different than expected or predicted following a trade signal. This is why it is key to use the indicator in addition to other price-tracking indicators. With the addition of other analysis tools, traders will find it easier to trade based on more information and significant data. In addition, signal line crossovers occur frequently and may not provide significant trading benefit. These signals need to be filtered by the trader and this can be aided by using additional forms of analysis such as other indicators and tools that relate to the specific trade type. Divergence can often be difficult to map and rely on as well with this indicator. If divergence lasts too long, it can end up providing little insight into when a reversal will actually occur in a trend. Additionally, divergence is not always present when price is noticeably reversing. Summary The True Strength Index was created to show the strength of a trend as an oscillator. It does this by indicating potential trends and trend changes through signal line crossovers and spotting divergence, warning the trader of trend weakness or trend strength. Previous Previous TRIX Next Next Ulcer Index Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43152589632/original/Am5DBxhtLF7-7AlHd9q3TCx56YP6y4EBOw.png?1598371724)

**Описание:** This image displays the **mathematical formula for the True Strength Index (TSI)**, a momentum oscillator used in technical analysis. It contains no TradingView UI elements (e.g., charts, buttons, or interface components) — it is purely a text-based breakdown of the TSI calculation. Here’s a detailed breakdown of the formulas:  


### 1. Main TSI Formula  
$$TSI = \left( \frac{PCDS}{APCDS} \right) \times 100$$  
- **Purpose**: Computes the TSI value, which measures momentum by comparing two smoothed price change series.  


### 2. Intermediate Calculations (Building Blocks)  
- **Price Change (PC)**:  
  $$PC = CCP - PCP$$  
  - \(CCP\): Current Close Price (current period’s closing price).  
  - \(PCP\): Previous Close Price (prior period’s closing price).  
  - **Purpose**: Calculates the raw price change between consecutive periods.  

- **Smoothed Price Change (PCS)**:  
  $$PCS = 25\text{-period EMA of } PC$$  
  - **Purpose**: Applies a 25-period Exponential Moving Average (EMA) to \(PC\) to reduce noise.  

- **Double-Smoothed Price Change (PCDS)**:  
  $$PCDS = 13\text{-period EMA of } PCS$$  
  - **Purpose**: Further smooths \(PCS\) with a 13-period EMA (second smoothing step).  


### 3. Absolute Price Change Series (for “Absolute” Momentum)  
- **Absolute Price Change (APC)**:  
  $$APC = AVCCP - PCP$$  
  - \(AVCCP\): Absolute Value of Current Close Price (absolute value of \(CCP\)).  
  - \(PCP\): Previous Close Price.  
  - **Purpose**: Measures the *magnitude* of price change (ignores direction, e.g., -5 and +5 both become 5).  

- **Smoothed Absolute Price Change (APCS)**:  
  $$APCS = 25\text{-period EMA of } APC$$  
  - **Purpose**: Smooths \(APC\) with a 25-period EMA.  

- **Double-Smoothed Absolute Price Change (APCDS)**:  
  $$APCDS = 13\text{-period EMA of } APCS$$  
  - **Purpose**: Further smooths \(APCS\) with a 13-period EMA (second smoothing step for the absolute series).  


### Key Context  
The TSI uses **two smoothed series**:  
- \(PCDS\): Smoothed *directional* price change (trend direction).  
- \(APCDS\): Smoothed *absolute* price change (trend strength).  

The ratio \(\frac{PCDS}{APCDS}\) (multiplied by 100) normalizes momentum, with values ranging roughly between -100 and +100. High positive values indicate strong upward momentum; high negative values indicate strong downward momentum.  


This formula is the foundation of the TSI indicator, which traders use to identify overbought/oversold conditions, trend strength, and potential reversals. The image itself is a static text representation of the calculation — no interactive TradingView elements (charts, buttons, etc.) are present.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43152589910/original/OliI5H2c2Fm4T2q51t3RGHjEXkK686LS_g.png?1598371773)

**Описание:** The image is a **text-based reference list** (not a TradingView chart) defining technical analysis abbreviations used in trading. It contains 10 entries, each pairing an acronym with its full definition:  

1. **PC = Price change** (difference between current and prior prices).  
2. **PCDS = PC double smoothed** (price change smoothed twice, likely via moving averages).  
3. **APCDS = Absolute PC double smoothed** (absolute value of PC, then smoothed twice).  
4. **CCP = Current close price** (most recent closing price of an asset).  
5. **PCP = Prior close price** (previous period’s closing price).  
6. **PCS = PC smoothed** (price change smoothed once).  
7. **EMA = Exponential moving average** (a trend-following indicator weighting recent data more heavily).  
8. **APC = Absolute PC** (absolute value of price change, ignoring direction).  
9. **APCS = Absolute PC smoothed** (absolute PC value smoothed once).  


### Purpose  
This list clarifies terminology for technical indicators (e.g., smoothed price changes, moving averages) used in TradingView’s charting tools. It helps traders interpret formulas or custom indicators by defining core components like price changes, smoothing methods, and absolute values.  

*(Note: The image lacks UI elements like charts/buttons—this is a glossary of trading abbreviations, not a visual chart interface.)*


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

