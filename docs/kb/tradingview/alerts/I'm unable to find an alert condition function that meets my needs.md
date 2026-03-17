# I'm unable to find an alert condition function that meets my needs

**URL:** https://www.tradingview.com/support/solutions/43000478392-i-m-unable-to-find-an-alert-condition-function-that-meets-my-needs/

---

- [ Help Center ](/) - / - / [ Alerts settings ](/support/folders/43000547663-alerts-settings/) - / [ I'm unable to find an alert condition function that meets my need… ](/support/solutions/43000478392-i-m-unable-to-find-an-alert-condition-function-that-meets-my-needs/) # I'm unable to find an alert condition function that meets my needs If you can't find a suitable condition in the Create Alert dialog, you can always accomplish your goal by coding an indicator in Pine programming language that checks the condition upon its calculation on the chart and lets you select this custom condition when setting up Alerts manually. Such a script should contain the [alertcondition function](https://www.tradingview.com/study-script-reference/#fun_alertcondition). The function has the following signature: alertcondition(condition, title, message) If the condition becomes true, alert triggers. To create an alert based on alertcondition, apply a Pine code with alertcondition to the current chart, open the Create Alert dialog, select the applied Pine code as the main condition for the alert and choose the specific alert condition with the title you've conveyed as an argument to the alertcondition function. Previous Previous Strategy Alerts Next Next How to use a variable value in alert Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43587967778/original/si5fY_JtdSeqfMpjfKwFrBbktxNBlrKuzQ.png?1761304595)

**Описание:** This TradingView interface shows a **Pine Script editor** (left) and a **\


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

