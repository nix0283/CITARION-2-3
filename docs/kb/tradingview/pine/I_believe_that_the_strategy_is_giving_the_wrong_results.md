# I believe that the strategy is giving the wrong results

**URL:** https://www.tradingview.com/support/solutions/43000483946-i-believe-that-the-strategy-is-giving-the-wrong-results/

---

- [ Help Center ](/)
- / 
- / [ I believe that the strategy is giving the wrong results ](/support/solutions/43000483946-i-believe-that-the-strategy-is-giving-the-wrong-results/)

# I believe that the strategy is giving the wrong results 
 Please note that there are many factors that can affect strategy calculation results and even the tiniest of discrepancies may lead to a big difference in the outputs. See some examples of this below:

**Chart reloading/reopening.** Historical data may differ slightly from the data that is collected in real-time. Even if they match, in some cases, historical data is altered by data vendors. Different data = different backtesting results.

**Intrabar price movement.** When a strategy is calculated in real-time, we have a clear understanding of how the current price was moving between OHLC. When a strategy is applied to a chart, we don't have this information, thus we use [assumptions](https://www.tradingview.com/pine-script-docs/v4/essential/strategies/#strategies). These assumptions might be wrong and they are definitely not 100% accurate even if the price was indeed moving exactly this way.

**Specific functions in the source code.** Some functions behave differently in real-time vs. historical calculation due to their internal logic. An example of such a function would be '[security](https://www.tradingview.com/study-script-reference/#fun_security)'. This peculiarity is called* Repainting*, you can find out more about it in [our user manual](https://www.tradingview.com/pine-script-docs/v4/essential/indicator-repainting/).

**Strategy calculation frequency.** During historical backtesting, a strategy is always calculated only on close of every candle, while when the data updates in real-time, the same strategy might be [set to be calculated with every price update](https://www.tradingview.com/pine-script-docs/v4/essential/strategies/#strategies).

If you are sure that none of the above-mentioned issues relate to your case, please send a report with the Pine Script issue type you are experiencing attach a strategy code and describe your problem in detail.
 Previous Previous I've added a script from the Community Scripts, and it is calculated incorrectly and/or I don't understand how it works Next Next Strategy produces unrealistically good results by peeking into the future Launch Supercharts

