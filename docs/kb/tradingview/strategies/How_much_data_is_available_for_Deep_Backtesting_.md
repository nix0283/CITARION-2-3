# How much data is available for Deep Backtesting?

**URL:** https://www.tradingview.com/support/solutions/43000668210-how-much-data-is-available-for-deep-backtesting/

---

- [ Help Center ](/)
- / 
- / [ How much data is available for Deep Backtesting? ](/support/solutions/43000668210-how-much-data-is-available-for-deep-backtesting/)

# How much data is available for Deep Backtesting? 
 Deep Backtesting allows users to backtest strategies on all data available in TradingView's data storage. The length of the historical data can vary depending on the selected symbol and chart timeframe. On daily and daily-based timeframes, charts display all available data, and the Deep Backtesting mode uses this same data. On intraday timeframes, TradingView keeps a limited amount of data. As a result, the length of the data on intraday timeframes may be shorter than on daily ones.

Please note that the maximum length of historical data per calculation is 2 million bars. If the period used for a backtest covers more than 2 million bars, the strategy will execute on the most recent 2 million bars within the selected period. This limit cannot be extended for now due to technical reasons. Two million bars provide quite a lot of data, and you can use a higher timeframe if you need to test your strategy over a lengthier date range. 

If no data exists within the selected Deep Backtesting period, the Strategy Tester will return the error "No data for the selected period and chart timeframe". If only some intraday data is available within the selected period, the strategy will calculate in its typical fashion.
 Previous Previous Why are the calculation results in the Deep Backtesting mode not loading? Next Next I see 'Failed to recalculate study because response is too large' error Launch Supercharts

