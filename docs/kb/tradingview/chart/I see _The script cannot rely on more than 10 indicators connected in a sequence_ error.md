# I see "The script cannot rely on more than 10 indicators connected in a sequence" error

**URL:** https://www.tradingview.com/support/solutions/43000602128-i-see-the-script-cannot-rely-on-more-than-10-indicators-connected-in-a-sequence-error/

---

- [ Help Center ](/) - / - / [ I see "The script cannot rely on more than 10 indicators connecte… ](/support/solutions/43000602128-i-see-the-script-cannot-rely-on-more-than-10-indicators-connected-in-a-sequence-error/) # I see "The script cannot rely on more than 10 indicators connected in a sequence" error This error occurs when one of an indicator's source inputs uses the values from a plot calculated from a chain of more than 10 indicators, where each subsequent indicator's calculations depend on plotted values from the previous indicator. For example, suppose you add 12 [SMA](https://www.tradingview.com/support/solutions/43000696841-simple-moving-average/) indicators to the chart, then set the "Source" input of each indicator added after the first to use one of the plots from the indicator previously added to the chart. The last indicator in the calculation chain shows this error message, because its "Source" input depends on 11 sequentially connected indicators. To resolve this error, you can consolidate multiple indicators' calculations into a single indicator using Pine Script®. For instance, instead of adding more than one indicator to the chart to cascade several SMAs, you can write a single Pine script that performs the chained calculations with several [ta.sma()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.sma) function calls. This error should not be confused with the general indicator-on-indicator limit. For example, with a limit of 24 indicator-on-indicator connections, you can have 24 separate SMA indicators that depend on 24 independent [EMA](https://www.tradingview.com/support/solutions/43000592270-exponential-moving-average/) indicators. Although the total number of dependent indicators on the chart is 24, an error does not occur because each separate SMA indicator depends on exactly one EMA indicator, meaning the depth of each calculation chain does not exceed 10. In contrast, if you connect each indicator sequentially (e.g., EMA1 -&gt; SMA1 -&gt; EMA2 -&gt; SMA2 -&gt; ...), this error occurs on the 12th connected indicator, because it depends on a chain of too many previous indicators. To learn more about indicator-on-indicator features, see the [How do I apply an indicator or strategy to another indicator](https://www.tradingview.com/support/solutions/43000474048-how-do-i-apply-an-indicator-or-strategy-to-another-indicator/) article. Previous Previous Color glitches (artifacts) suddenly appear on the chart Next Next My chart looks compressed Launch Supercharts

---

## Изображения

![Image 1](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 2](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

