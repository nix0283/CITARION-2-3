# How to create a portfolio via transaction import

**URL:** https://www.tradingview.com/support/solutions/43000756010-how-to-create-a-portfolio-via-transaction-import/

---

- [ Help Center ](/)
- / 
- / Portfolio 
- / [ Portfolio Management ](/support/folders/43000598040-portfolio-management/)
- / [ How to create a portfolio via transaction import ](/support/solutions/43000756010-how-to-create-a-portfolio-via-transaction-import/)

# How to create a portfolio via transaction import 
 To create a portfolio using transaction import from a CSV file:

- Go to the [portfolios page](https://www.tradingview.com/portfolios/).
- Select the card Import CSV file

After clicking, a pop-up window will open with the settings for the new portfolio and the option to upload a CSV file with transactions. 

#### Fields for portfolio setup: 

- Portfolio name — name of the portfolio. You can enter up to 128 characters. Portfolio names may be identical.
- Currency — portfolio currency. All asset values will be automatically converted into this currency if they are traded in another one. Cash holdings are also accounted for in the portfolio currency.
- Risk-free rate — the risk-free rate of return. This is the theoretical annual return that can be earned with zero or minimal risk. Typically, it may be based on bank deposit rates, the key interest rate of the main investment country, or long-term government bonds.[](https://www.investopedia.com/terms/r/risk-freerate.asp) It is used in the calculations of the [Sortino](https://www.tradingview.com/support/solutions/43000756110/) and [Sharpe](https://www.tradingview.com/support/solutions/43000756107/) ratios.
- Benchmark — market performance benchmark. Allows you to compare your portfolio's performance against a market reference. We recommend using an index or a fund corresponding to your portfolio's market or sector as a benchmark. Learn more in the related [article](https://www.tradingview.com/support/solutions/43000756149/).
- **Auto adjust trades for splits - **when enabled, all transactions you entered are automatically adjusted to reflect stock splits
- Description (optional) — portfolio description. This field may be left empty. Maximum length — 1200 characters.

#### CSV file format 

Only one format is supported. The file must be in CSV format with a comma as the delimiter. A header is required. A sample file can be downloaded in the upload window.

#### Supported fields: 

- Symbol — instrument in the format exchange:ticker (for example, NASDAQ:AAPL or BYBIT:BTCUSDT). To add a transaction for cash, this field should contain — $CASH. Note: $ is the identifier for a cash transaction. All cash transactions will be added in the portfolio currency.
- Side — transaction direction: for instruments: buy, **sell** or **dividend**
- for cash: deposit, withdrawal, taxes and fees
 - Qty — quantity:
 for buy or sell transactions, this is the number of assets in units. If the asset is traded in lots, you must specify the number of units, not lots.
- for dividend transactions, this is the total amount of dividend received from one dividend payment
- for cash transactions, this is the amount of money
 - Status (optional) — supported for the ability to import transactions from a trading panel. If the field is present, only transactions with the value Filled will be added; the rest will be skipped. If the field is absent, all transactions will be added.
- Fill Price — for buy or sell transactions, this is the price at which the transaction was made. For dividend and cash transactions, the value will be ignored.
- Commission — for buy or sell transactions, this is the commission paid when the transaction was made. For divicash transactions, the value will be ignored.
- Closing Time — date and time of the transaction in the format YYYY-MM-DD hh:mm:ss or YYYY-MM-DDTHH:mm:ss.sssZ. The transaction date is mandatory. The time of the transaction is optional.

After uploading the file, preliminary information will be displayed: number of instruments and number of transactions that will be added, and the total commission.If there are format errors in the file, a message will appear indicating the line. In this case, no transaction will be added.

#### Important 

If the number of transactions or instruments exceeds the limits of the current subscription level, the portfolio will not be created. Reduce the number of elements and try again.

#### New portfolio created! 

Transactions from the file will be added to the portfolio — only for supported instruments.You can edit them on the transactions page. More details — in the [article](https://www.tradingview.com/support/solutions/43000756015/) about editing transactions.The guide for manually adding transactions — in a separate [article](https://www.tradingview.com/support/solutions/43000756013/).
 Previous Previous How to create a portfolio from a watchlist Next Next Portfolio page Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43604226338/original/t88d9PmKVB8zy6M6VsS8Kj_Jun4ldVeYKQ.png?1769683441

**Описание:**

This image shows a **\

---

