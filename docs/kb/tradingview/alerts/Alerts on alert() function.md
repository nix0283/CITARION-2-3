# Alerts on alert() function

**URL:** https://www.tradingview.com/support/solutions/43000597494-alerts-on-alert-function/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Alerts - / [ Alerts settings ](/support/folders/43000547663-alerts-settings/) - / [ Alerts on alert() function ](/support/solutions/43000597494-alerts-on-alert-function/) # Alerts on alert() function Within the Pine Script® there's an additional function that lets you configure alerts — it's called the alert() function and you'll see it in the code when it's configurable. From [Supercharts](https://www.tradingview.com/chart/), you can create an alert using the "Create alert" dialog and select the indicator or strategy in the "Condition" field. Unlike other alert types, the triggering frequency and the message are determined by the script's alert() calls — not by the dialog settings. To create an alert()-based alert for an indicator: - Select the script in the "Condition" field of the “Create Alert” dialog - Choose "Any alert() function call" (the first option) Script alerts on strategies can include order fill events, "alert()" function call events, or both. - **"Order fills and alert() function calls":** The created alerts trigger on both order fills and "alert()" events - **"Order fills only":** The alert triggers only on order fills, like a standard strategy alert - **"alert() function calls only":** The alert triggers only on "alert()" events, similar to a script alert on an indicator **! Note:** If a script alert triggers more than 15 times within three minutes, it automatically stops. More information about using the "alert()" function in scripts can be found in the [Pine Reference Manual](https://www.tradingview.com/pine-script-reference/v4/#fun_alert) and the [Pine User Manual](https://www.tradingview.com/pine-script-docs/en/v4/essential/Alerts.html). Also read: - [Introduction to TradingView alerts](https://www.tradingview.com/support/solutions/43000520149-introduction-to-tradingview-alerts/) - [What is Pine Script](https://www.tradingview.com/support/solutions/43000561836-what-is-pine-script/) - [The technical analysis essentials](https://www.tradingview.com/support/solutions/43000759577-the-technical-analysis-essentials-with-tradingview/) - [Introduction to fundamental analysis](https://www.tradingview.com/support/solutions/43000759574-introduction-to-fundamental-analysis-on-tradingview/) - [How to trade on TradingView](https://www.tradingview.com/support/solutions/43000756695-how-to-trade-on-tradingview/) Previous Previous Why the {{close}} variable value in an alert description may not work Next Next I cannot create new alerts even though I have not exceeded the alert limit of my subscription Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43578067252/original/zFkXf8z3Pm0z5GbuH4vBRnDfsNaI-QVTIw.png?1756718915)

**Описание:** This is a **TradingView \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43578067253/original/qnN16HZFDEfe3a5XowwyJOTow-8c4_qf6g.png?1756718915)

**Описание:** This is a **TradingView \


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

