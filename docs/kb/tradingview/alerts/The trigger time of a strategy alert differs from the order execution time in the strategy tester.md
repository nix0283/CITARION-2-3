# The trigger time of a strategy alert differs from the order execution time in the strategy tester

**URL:** https://www.tradingview.com/support/solutions/43000771511-the-trigger-time-of-a-strategy-alert-differs-from-the-order-execution-time-in-the-strategy-tester/

---

- [ Help Center ](/) - / - / [ The trigger time of a strategy alert differs from the order execu… ](/support/solutions/43000771511-the-trigger-time-of-a-strategy-alert-differs-from-the-order-execution-time-in-the-strategy-tester/) # The trigger time of a strategy alert differs from the order execution time in the strategy tester An alert always displays the exact time it was triggered (in the case of a strategy alert, this is the same time the corresponding order was executed). However, in the strategy tester, the exact order execution time is only displayed for real time orders (i.e., orders for which the chart page was already open at the time of execution). For historical orders (i.e., orders executed before the chart page was opened), the order execution time is the open time of the corresponding bar. This is because, in general, it is impossible to determine the exact time of execution for a historical order, since intrabar price movement is not taken into account when calculating a strategy based on history. Thus, the order execution time in the strategy tester doesn't always match the alert trigger time, and it may appear as if the alert was triggered with a delay. Such discrepancies most often occur when executing limit orders and when enabling the "Recalculate After Order Is Filled," "Recalculate On Every Tick," and "Fill Orders On Bar Close" options. For example, let's consider the "ChannelBreakOutStrategy" strategy and the alert created for it. In this case, the limit order was executed in real time at 09:23 UTC: The alert triggered at the same time: If we refresh the page (F5), the exact execution time in the strategy tester will change to the bar open time, i.e., 09:00 UTC, so it may appear as if the alert was triggered with a 23-minute delay, although it was triggered on time: Previous Previous Issue with alerts on indicators that use offsets Next Next Delays in OncePerBarClose alerts Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43589220516/original/C-UCEE4PTYabDfwrf2fp9vAVP0dRuOlovg.png?1761909027)

**Описание:** This TradingView interface displays a **1-hour (1h) candlestick chart for CFDs on Gold (US$/OZ)** with the \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43589220698/original/Ro48Pu16UsQPjveWxAt2oIfxQIc8K-9UaA.png?1761909086)

**Описание:** This TradingView image displays the **Alerts** tab (selected, with \


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43589220901/original/ih2738Wmbu8DIRHYwX-k0GxQ9Slayfq6vw.png?1761909131)

**Описание:** This TradingView image displays a **1-hour (1h) candlestick chart for CFDs on Gold (US$/OZ)** with the \


