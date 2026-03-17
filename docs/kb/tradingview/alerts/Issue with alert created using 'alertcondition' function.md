# Issue with alert created using 'alertcondition' function

**URL:** https://www.tradingview.com/support/solutions/43000480296-issue-with-alert-created-using-alertcondition-function/

---

- [ Help Center ](/) - / - / [ Issue with alert created using 'alertcondition' function ](/support/solutions/43000480296-issue-with-alert-created-using-alertcondition-function/) # Issue with alert created using 'alertcondition' function If you have access to the source code of a script, you can add some plots to visualize when the conditions used in 'alertcondition' function are met and when they are not, right on the chart. Below you can see a piece of code that demonstrates how you can do this (this is just an example, you will need to replicate the plots in your specific indicator): Pine Script® // @version= 5 indicator ( 'Simple alert script' ) your_condition = close &gt; 50 alertcondition ( your_condition , 'Simple alert' , 'Now close is bigger than 50' ) plot ( your_condition ? 1 : 0 ) If an alert condition was true (plotted '1' on a sub-chart) on a particular candle, but no alert has triggered (and vice versa), please send us a report from that chart with a screenshot, demonstrating the issue, and the source code. Don't forget to select the 'Alerts' as an issue type and specify the alert with a problem. Previous Previous Issue with alert on a custom script Next Next Alert was triggered too often and stopped Launch Supercharts

---

## Изображения

![Image 1](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 2](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

