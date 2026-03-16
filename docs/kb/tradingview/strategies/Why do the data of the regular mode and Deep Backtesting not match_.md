# Why do the data of the regular mode and Deep Backtesting not match?

**URL:** https://www.tradingview.com/support/solutions/43000666266-why-do-the-data-of-the-regular-mode-and-deep-backtesting-not-match/

---

- [ Help Center ](/) - / - / [ Why do the data of the regular mode and Deep Backtesting not matc… ](/support/solutions/43000666266-why-do-the-data-of-the-regular-mode-and-deep-backtesting-not-match/) # Why do the data of the regular mode and Deep Backtesting not match? The choice of the time interval adds an additional input parameter for the strategy calculation. Because of this, the results of the calculation may change. In the regular mode, the calculation is based on the bars loaded on the chart (the maximum [number of intraday bars](https://www.tradingview.com/?solution=43000480679) depends on the TradingView subscription plan). In the Deep Backtesting mode, it uses the bars that fall within the time period you have chosen for the calculation. Follow [this link](https://www.tradingview.com/?solution=43000668210) to learn more about the length of historical data available for Deep Backtesting. When Deep Backtesting is used, script calculations will typically begin at an earlier point than with regular backtesting. Because some calculations such as EMA or RMA are dependent on where they begin calculating, their values will differ on chart bars, so trades appearing on the chart, which are calculated using regular backtesting, may not always appear at the same places as trades calculated with Deep Backtesting. The same applies when a custom date range is used for Deep Backtesting, even when that range covers chart bars. This is due to the fact that in Deep Backtesting, script calculations will start at the beginning of the date range, whereas regular backtesting calculations always begin on the chart's first bar. Previous Previous How Deep Backtesting works Next Next Why are the calculation results in the Deep Backtesting mode not loading? Launch Supercharts

---

## Изображения

![Image 1](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 2](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

