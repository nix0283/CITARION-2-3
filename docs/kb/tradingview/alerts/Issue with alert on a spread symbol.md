# Issue with alert on a spread symbol

**URL:** https://www.tradingview.com/support/solutions/43000478406-issue-with-alert-on-a-spread-symbol/

---

- [ Help Center ](/) - / - / [ Issue with alert on a spread symbol ](/support/solutions/43000478406-issue-with-alert-on-a-spread-symbol/) # Issue with alert on a spread symbol In a [spread chart](https://www.tradingview.com/?solution=43000502298), the real-time bars are built on tick data, whereas historical bars are built based on minute data. The reason for this difference is that the tick data of price movements within a bar is not included in historical bars. This is the peculiarity of the way spread charts are computed. The sequence of price movements intra-bar plays a crucial part in building spread bars in real-time. An alert server processes data received in real-time, whereas your chart server can partially compute historical data as well. As a result, the bars built on both servers can mismatch. Thus, when opening a chart, you may see a range of bars that are different from that used by an alert. An alert will then fire and you may perceive it as incorrect. At the moment, there is no solution to this behavior, therefore, we strongly advise not to set alerts on spread charts. Previous Previous What do errors mean when sending webhooks ? Next Next Issue with alert on a custom script Launch Supercharts

---

## Изображения

![Image 1](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 2](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

