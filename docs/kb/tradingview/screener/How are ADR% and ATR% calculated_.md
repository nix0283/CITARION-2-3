# How are ADR% and ATR% calculated?

**URL:** https://www.tradingview.com/support/solutions/43000734653-how-are-adr-and-atr-calculated/

---

- [ Help Center ](/) - / - / [ How are ADR% and ATR% calculated? ](/support/solutions/43000734653-how-are-adr-and-atr-calculated/) # How are ADR% and ATR% calculated? The Average Day Range% (ADR%) and Average True Range% (ATR%) are volatility indicators that help traders assess the dynamics of the price movement of an instrument in the market. **Average Day Range% (ADR%)** ADR% measures the average range of daily prices as a percentage over a certain period. The range is calculated as the difference between the maximum and minimum price for the day, expressed as a percentage of the current asset price. This indicator helps to understand how active the market has been recently and what future volatility can be expected. The formula we use to calculate: Pine Script® // @version= 5 indicator ( "Average Day Range%" , shorttitle = "ADR%" ) // Average Day Range (ADR) smaHigh = ta.sma ( high , 14 ) smaLow = ta.sma ( low , 14 ) adr = smaHigh - smaLow // Average Day Range Percent (ADRP) adrp = adr / close * 100 plot ( adrp , title = "ADR%" ) Expand 4 lines **Average True Range% (ATR%)** ATR% is the percentage expression of the Average True Range (ATR) indicator, which measures the average true price range for a certain period. ATR takes into account not only daily highs and lows but also possible price gaps. ATR% is helpful in determining the volatility of an instrument relative to its current price. The formula we use to calculate: Pine Script® // @version= 5 indicator ( "Average True Range %" , shorttitle = "ATR%" ) // Average True Range (ATR) atr = ta.rma ( ta.tr ( true ) , 14 ) // Average True Range Percent (ATRP) atrp = atr / close * 100 plot ( atrp , title = "ATR%" ) Expand 2 lines For visual display, you can add this script to your chart through the Pine Editor using the chart's daily timeframe. **The difference between ADR% and ATR%:** - ADR% focuses on daily movements and does not take gaps into account. - ATR% takes into account gaps and compares current price fluctuations with previous prices, which makes it a more complete indicator of volatility. Both indicators are important for traders, as they allow them to better understand the risk and potential price movements. Previous Previous How is Performance calculated in the Screener? Next Next How do Earnings date filters work in the Screener? Launch Supercharts

---

## Изображения

![Image 1](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 2](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

