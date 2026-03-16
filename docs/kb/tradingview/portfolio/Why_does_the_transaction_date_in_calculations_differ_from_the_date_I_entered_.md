# Why does the transaction date in calculations differ from the date I entered?

**URL:** https://www.tradingview.com/support/solutions/43000756240-why-does-the-transaction-date-in-calculations-differ-from-the-date-i-entered/

---

- [ Help Center ](/)
- / 
- / Portfolio 
- / [ FAQ ](/support/folders/43000598039-faq/)
- / [ Why does the transaction date in calculations differ from the dat… ](/support/solutions/43000756240-why-does-the-transaction-date-in-calculations-differ-from-the-date-i-entered/)

# Why does the transaction date in calculations differ from the date I entered? 
 This situation may occur for the following reasons:

#### Non-trading day on the asset's exchange 

If the transaction was added on a date that is on a weekend or public holiday for the exchange where the asset is traded, the system will automatically shift the transaction date to the last trading day before the entered date.

#### Time zone adjustment 

The transaction date picker in the interface works in the user's local time zone. However, asset trading takes place on exchanges located in various time zones. In case of a time mismatch, the system automatically adjusts the transaction date according to the time zone of the corresponding exchange.

#### Alignment with the benchmark’s main trading session 

Calculations aimed at comparing portfolio dynamics with a benchmark are synchronized with the benchmark’s trading days. In particular, the Performance and Portfolio Value charts on the Overview tab are built based on the benchmark’s trading calendar (e.g., the S&P 500 index).

If there are no trades on the selected date for the benchmark (e.g., due to a holiday), all transactions related to that date are automatically shifted to the next trading day of the benchmark (i.e., when the market reopens). This ensures correct data display and chronological consistency in calculations.

For example, if the S&P 500 is selected as the benchmark and you add a transaction on Saturday or Sunday for an asset that does trade on weekends (e.g., BTCUSDT), then for benchmark-related calculations, the transaction will be recorded on Monday.

If none of the above explains your case, we recommend contacting our support team — we’ll be happy to help you figure it out.
 Previous Previous Why do Annualized Yield values in the summary and in holdings differ? Next Next What are Stock Splits? Launch Supercharts

