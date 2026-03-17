# SMI Ergodic Oscillator

**URL:** https://www.tradingview.com/support/solutions/43000594671-smi-ergodic-oscillator/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ SMI Ergodic Oscillator ](/support/solutions/43000594671-smi-ergodic-oscillator/) # SMI Ergodic Oscillator Definition The Stochastic Momentum Index (SMI) Ergodic Oscillator, often referred to as SMIEO, uses and manipulates the SMI Ergodic indicator’s double moving averages of price minus previous price over two time frames. The indicator uses a signal line, consisting of the Exponential Moving Average (EMA) of the SMI indicator, and subtracts this from the SMI. The oscillator is displayed on the chart as a histogram, and can be altered in its settings by the trader (i.e. input, method (EMA), and period length settings). Calculations The following is a condensed code for the SMI Ergodic Oscillator indicator. //price (user defined, default is closing price) //method = moving average (user defined, default is EMA) //prevP = previousPrice, index = current bar number //abs = absolute value //ma = moving average prevP = price[index-1]; change = price - prevP; absChange = abs(price - prevP); tempChange = ma(method, index, fastPeriod, change); tempAbsC = ma(method, index, fastPeriod, absChange); tempChange = ma(method, index, slowPeriod, tempChange); tempAbsC = ma(method, index, slowPeriod, tempAbsC); SMI = tempChange / tempAbsC; SIGNAL = ma(method, index, sigPeriod, SMI); Plot: SMIEO = SMI - SIGNAL; Takeaways and what to look for The SMI Ergodic Oscillator is best used with other indicators and tools for technical analysis. Summary The SMIEO uses and manipulates the SMI Ergodic indicator’s double moving averages of price minus previous price over two timeframes. This aids the trader by giving them helpful trigger signals. The indicator uses a signal line and then subtracts this from the SMI. The trader can change indicator settings, such as input, method (EMA), and period length, depending on their trade needs or preferences. Previous Previous SMI Ergodic Indicator Next Next Smoothed Moving Average Launch Supercharts

---

## Изображения

![Image 1](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 2](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

