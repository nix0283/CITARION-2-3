# The impact of data repainting on alert calculation

**URL:** https://www.tradingview.com/support/solutions/43000773984-the-impact-of-data-repainting-on-alert-calculation/

---

- [ Help Center ](/) - / - / [ The impact of data repainting on alert calculation ](/support/solutions/43000773984-the-impact-of-data-repainting-on-alert-calculation/) # The impact of data repainting on alert calculation A limited number of bars are available for each symbol on the chart. This number depends on the subscription type and the selected timeframe, as described in the article: [https://www.tradingview.com/pine-script-docs/concepts/repainting/#starting-points ](https://www.tradingview.com/pine-script-docs/concepts/repainting/#starting-points) As the symbol ticks, the number of bars gradually increases. To prevent this number from exceeding the allowed limit, at a certain point, old bars are removed. This means the set of bars is truncated so that the total number still complies with the limits. This process of removing old bars is called "repainting". For this reason, if you apply a script to a chart whose calculation results depend on the entire available history and then refresh the page after a while, the script may be recalculated using a new set of bars. Therefore, its calculation results may also change. Alert calculation for such a script is generally identical to that of the script itself. Still, there is an important distinction: the alert is calculated continuously on the server, so after the alert is launched, the number of bars involved in its calculation only increases. (For the "alignment" described above to take effect, the alert must be restarted.) Therefore, if an alert is created for a script whose calculation results depend on all available history and is not restarted for a long time, the results of this alert's calculation may not match the results of the script's calculation on the chart, and these discrepancies may become increasingly noticeable over time. Previous Previous Delays in OncePerBarClose alerts Next Next Common reasons for mismatches between strategy alert triggers and strategy orders on the chart Launch Supercharts

---

## Изображения

![Image 1](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 2](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

