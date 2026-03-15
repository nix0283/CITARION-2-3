# I see 'Calculation takes too long to execute' error

**URL:** https://www.tradingview.com/support/solutions/43000579793-i-see-calculation-takes-too-long-to-execute-error/

---

- [ Help Center ](/) - / - / [ I see 'Calculation takes too long to execute' error ](/support/solutions/43000579793-i-see-calculation-takes-too-long-to-execute-error/) # I see 'Calculation takes too long to execute' error To ensure the continued availability of computing resources to all TradingView users, indicators and strategies must complete their calculations within the following limits: - 20 seconds (for Basic plan) - 40 seconds (for Essential, Plus and Premium plans) - 100 seconds (for Ultimate plan) See [this page](https://www.tradingview.com/pricing/) to learn more about each plan's features and limitations. If a script can't complete its calculations during this allotted time, the "Calculation takes too long to execute." error will appear. Here's what you can do to prevent it: - Split the script into multiple scripts so that each one calculates faster. - Limit the number of bars the script runs on using [date/time filtering](https://www.pinecoders.com/faq_and_code/#how-do-i-implement-date-range-filtering-in-strategies). - Optimize the script's code. Pine code can be optimized in many different ways. [These suggestions](https://www.pinecoders.com/faq_and_code/#how-can-i-optimize-pine-code) will help you identify optimization opportunities. Previous Previous I see "The script creates to many plots (x). The limit is 64" error Next Next I see "The requested historical offset (X) is beyond the historical buffer’s limit (Y)" error Launch Supercharts

---

## Изображения

![Image 1](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 2](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

