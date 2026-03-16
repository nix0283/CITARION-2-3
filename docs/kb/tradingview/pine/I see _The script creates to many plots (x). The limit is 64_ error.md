# I see "The script creates to many plots (x). The limit is 64" error

**URL:** https://www.tradingview.com/support/solutions/43000499056-i-see-the-script-creates-to-many-plots-x-the-limit-is-64-error/

---

- [ Help Center ](/) - / - / [ I see "The script creates to many plots (x). The limit is 64" err… ](/support/solutions/43000499056-i-see-the-script-creates-to-many-plots-x-the-limit-is-64-error/) # I see "The script creates to many plots (x). The limit is 64" error This error shows that your indicator uses too many plots. The maximum is 64. To fix the issue, reduce the number of plots created by function calls in your script. Note that `plot*()` functions can create more than one plot, including plots that are used internally and are not visible on the chart. To learn more about why this happens, consult the [Plot limits section in the User Manual](https://www.tradingview.com/pine-script-docs/writing/limitations/#plot-limits). Previous Previous I see "Maximum number of orders (9000) was reached." error Next Next I see 'Calculation takes too long to execute' error Launch Supercharts

---

## Изображения

![Image 1](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 2](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

