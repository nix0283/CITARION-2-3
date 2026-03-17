# I see the "The script executes too many unique `request.*()` function calls" error

**URL:** https://www.tradingview.com/support/solutions/43000745852-i-see-the-the-script-executes-too-many-unique-request-function-calls-error/

---

- [ Help Center ](/) - / - / [ I see the "The script executes too many unique `request.*()` func… ](/support/solutions/43000745852-i-see-the-the-script-executes-too-many-unique-request-function-calls-error/) # I see the "The script executes too many unique `request.*()` function calls" error This error occurs if a Pine script executes too many unique request.*() function calls. Whether a request.*() call is unique depends on its specified context (symbol, timeframe, and modifiers), its expression, and the scope from which it executes. Each unique request.*() call consumes extra computational resources, because it fetches another dataset into memory and runs extra computations on that data. Therefore, Pine limits the number of unique requests allowed for any script. If you have a non-professional plan, your scripts can execute no more than 40 unique data requests. If you upgrade to a [Professional plan](https://www.tradingview.com/pricing/?status=pro), whether Ultimate, your Pine v6 scripts can execute up to 64 unique requests. Alternatively, if you can access the script's source code, you can try to rewrite the code to reduce the total number of unique requests and ensure the script stays within your plan's limit. To learn more about how request.*() functions work and how to use them, see our User Manual's [Other timeframes and data](https://www.tradingview.com/pine-script-docs/concepts/other-timeframes-and-data/) page. Previous Previous I see 'Cannot create an order with negative quantity' error Next Next Where can I find a reliable Pine programmer to hire? Launch Supercharts

---

## Изображения

![Image 1](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 2](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

