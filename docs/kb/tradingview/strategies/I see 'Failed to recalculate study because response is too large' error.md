# I see 'Failed to recalculate study because response is too large' error

**URL:** https://www.tradingview.com/support/solutions/43000672421-i-see-failed-to-recalculate-study-because-response-is-too-large-error/

---

- [ Help Center ](/) - / - / [ I see 'Failed to recalculate study because response is too large'… ](/support/solutions/43000672421-i-see-failed-to-recalculate-study-because-response-is-too-large-error/) # I see 'Failed to recalculate study because response is too large' error This error appears if the total size of the report generated during Deep Backtesting is too large and hits the limit. The limitation is enabled for our servers to work more efficiently. To avoid this error, reduce the number of plot functions and drawings in your strategy script - comment them out or remove completely from the code. Strategy's plots and drawings are not displayed on the chart in the Deep Backtesting mode, so removing them will not affect the strategy in this mode. You can find the explanation here: [Why are the results of Deep Backtesting not shown on the chart?](https://www.tradingview.com/?solution=43000670566) Specifically, the following functions can be removed/commented out: - Any function that creates a plot: [plot](https://www.tradingview.com/pine-script-reference/v4/#fun_plot), [plotchar](https://www.tradingview.com/pine-script-reference/v4/#fun_plotchar), [plotshape](https://www.tradingview.com/pine-script-reference/v4/#fun_plotshape), [plotarrow](https://www.tradingview.com/pine-script-reference/v4/#fun_plotarrow), [plotbar](https://www.tradingview.com/pine-script-reference/v4/#fun_plotbar), [plotcandle](https://www.tradingview.com/pine-script-reference/v4/#fun_plotcandle), [bgcolor](https://www.tradingview.com/pine-script-reference/v4/#fun_bgcolor), [barcolor](https://www.tradingview.com/pine-script-reference/v4/#fun_barcolor) - Pine-based drawings: [label.new](https://www.tradingview.com/pine-script-reference/v4/#fun_label{dot}new), [line.new](https://www.tradingview.com/pine-script-reference/v4/#fun_line{dot}new), [box.new](https://www.tradingview.com/pine-script-reference/v4/#fun_box{dot}new), [table.new](https://www.tradingview.com/pine-script-reference/v4/#fun_table{dot}new) Previous Previous How much data is available for Deep Backtesting? Next Next What restrictions apply while using the Deep Backtesting mode on continuous futures? Launch Supercharts

---

## Изображения

![Image 1](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 2](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

