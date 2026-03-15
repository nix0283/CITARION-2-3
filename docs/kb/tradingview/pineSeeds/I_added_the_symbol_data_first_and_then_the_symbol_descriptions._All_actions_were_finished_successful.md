# I added the symbol data first and then the symbol descriptions. All actions were finished successfully, but the chart does not display the data. What should I do?

**URL:** https://www.tradingview.com/support/solutions/43000717545-i-added-the-symbol-data-first-and-then-the-symbol-descriptions-all-actions-were-finished-successfully-but-the-chart-does-not-display-the-data-what-should-i-do/

---

- [ Help Center ](/)
- / 
- / [ TradingView UI ](/support/folders/43000592630-tradingview-ui/)
- / [ I added the symbol data first and then the symbol descriptions. A… ](/support/solutions/43000717545-i-added-the-symbol-data-first-and-then-the-symbol-descriptions-all-actions-were-finished-successfully-but-the-chart-does-not-display-the-data-what-should-i-do/)

# I added the symbol data first and then the symbol descriptions. All actions were finished successfully, but the chart does not display the data. What should I do? 
 When adding symbols, you first need to add their descriptions in *symbol_info**/*, then ensure that actions run successfully and *No data here* appears on the chart. If you added the symbol data before these steps, delete data from the CSV file and commit the changes. Then check that *No data here* appeared on the chart and add the symbol data again. For more information, refer to the [How to add symbols to the chart and remove them](https://github.com/tradingview-pine-seeds/docs/blob/main/data_tutorial.md) tutorial.

Note: the steps above only work for the symbols that have just been added. For those symbols whose data is already shown on the chart, you can change the CSV files without waiting for * No data here* to appear on the chart. Your data will be updated.
 Previous Previous Why can't I find my symbols in the symbol search box? Next Next What if the maximum amount of time required for the symbol to appear on the chart has passed, but I still do not see it? Launch Supercharts

