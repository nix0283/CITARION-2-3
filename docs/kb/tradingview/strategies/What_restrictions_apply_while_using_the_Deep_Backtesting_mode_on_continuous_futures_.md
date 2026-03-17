# What restrictions apply while using the Deep Backtesting mode on continuous futures?

**URL:** https://www.tradingview.com/support/solutions/43000730038-what-restrictions-apply-while-using-the-deep-backtesting-mode-on-continuous-futures/

---

- [ Help Center ](/)
- / 
- / [ What restrictions apply while using the Deep Backtesting mode on… ](/support/solutions/43000730038-what-restrictions-apply-while-using-the-deep-backtesting-mode-on-continuous-futures/)

# What restrictions apply while using the Deep Backtesting mode on continuous futures? 
 There are special rules for using the Deep Backtesting mode on continuous futures charts. Since each such instrument consists of a sequence of individual futures charts spliced together into a single continuous one, requesting a large data period can result in a serious load.

Therefore, the following restrictions were introduced for such symbols:

- When requesting second-based timeframes, the maximal requested depth for a timeframe of N seconds is N*3 months from today's date.
- When requesting minute-based timeframes, the maximal requested depth for a timeframe of N minutes is N*3 years from today's date.

Note that the restrictions start from today's date regardless of the end date selected in the Deep Backtesting date picker.

There is also the general limitation on the length of historical data that applies to all Deep Backtesting queries, whether or not the requested data is of a continuous futures symbol. These limits are described in the following Help Center Article: [How much data is available for Deep Backtesting?](https://www.tradingview.com/chart/?solution=43000668210)
 Previous Previous I see 'Failed to recalculate study because response is too large' error Next Next Overview tab Launch Supercharts

