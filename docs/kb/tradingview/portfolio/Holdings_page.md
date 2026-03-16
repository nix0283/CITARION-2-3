# Holdings page

**URL:** https://www.tradingview.com/support/solutions/43000756132-holdings-page/

---

- [ Help Center ](/)
- / [ Knowledge base ](/knowledge-base/)
- / Portfolio 
- / [ Holdings ](/support/folders/43000598043-holdings/)
- / [ Holdings page ](/support/solutions/43000756132-holdings-page/)

# Holdings page 
 Displays a table with metrics for each portfolio asset.

#### Structure: 

The table includes six modes:

- Position
- Price
- Financials
- Performance
- Risk
- Technicals

In addition, in the upper right corner of the table, there are control elements that add extra interaction options:

- Display sold – allows including closed (sold) holdings in the table.
- Summary – adds a TOTAL summary row, the value of which is determined by the following customizable options: Minimum
- Maximum
- Average
- Median

Note: The summary operates on absolute values and does not account for currency conversion, percentage values, etc.

- Group By – allows grouping the holdings list by the following criteria: Currency
- Symbol type
- Sector
- Exchange

For each row (except summary rows), an additional menu can be invoked, allowing to:

- add a transaction for the current asset.
- delete the asset along with its full transaction history.

#### Metrics: 

Position:

- Allocation – share in the portfolio relative to the total Value of open positions
 Formula: Value / Σ Value * 100%
- Qty – position size.
- Avg price – average opening price of the position calculated using FIFO. When part of the position is closed, the average price is recalculated based on the remaining lots.
- Last price – current instrument price (in instrument currency).
- Invested – the amount of entry costs for open positions (in portfolio currency).
 Formula: Avg price * Qty
- Value – current value of the position (in portfolio currency)
 Formula: Qty * Last price
- Unrealized gain – profit or loss at the current market price
 Formula: Value - Invested
- Unrealized gain % – unrealized profit relative to the invested amount
 Formula: Unrealized gain / Invested * 100%
- Daily gain – change in profit for the position over the last trading day
 Formula: Value - Value of yesterday
- Daily gain % – daily profit change relative to yesterday’s Value
 Formula: Daily gain / Value of yesterday * 100%
Note: if there was no position for the previous day, the calculation will be made relative to Invested. More in the article: [Portfolio Summary: Unrealized gain](https://www.tradingview.com/support/solutions/43000756017/).
- Total dividend – total all dividend received for the symbol in portfolio currency.
- Total gain – total profit in portfolio currency.
 Formula: Unrealized gain + Realized gain for the position
Note: Realized gain for the position = Total gain - Unrealized gain. More in the article: [Portfolio Summary: Total and Realized gain](https://www.tradingview.com/support/solutions/43000756023/).
- Total gain % – profit relative to Invested
 Formula: Total gain / Invested * 100%
Note: considers the Invested amount across all transactions within the position, including closed ones
- Annualized yield – average annual return in %
 Calculated using the XIRR method, with dates and amounts of buy/sell operations used as cash flows. Purchases are with a minus sign, sales with a plus. If the position is not closed, use the last price and the calculation date as the final value. More in the article: [Portfolio Summary: Annualized yield](https://www.tradingview.com/support/solutions/43000756024/).

Price:

- Last – current instrument price (in instrument currency).
- Chg% – (Close price of the current bar – Close price of the previous bar) / Close price of the previous bar * 100
- Chg – Close price of the current bar – Close price of the previous bar
- Volume – trading volume for the day
- Avg Vol (10) – average trading volume over 10 days
- Market Cap – [Market capitalization](https://www.tradingview.com/support/solutions/43000597015/)

Financials:

- Revenue – revenue derived from the product or service a company sells. [More info here](https://www.tradingview.com/support/solutions/43000553619/).
- EPS – the earnings per share collected directly from a company’s press release. [More info here](https://www.tradingview.com/support/solutions/43000744068/).
- P/E Ratio – the market price of a stock relative to its earnings per share. [More info here](https://www.tradingview.com/support/solutions/43000597017/).
- Beta – [Beta](https://www.tradingview.com/support/solutions/43000703603/) 1Y
- Dividend – [Dividends per share](https://www.tradingview.com/support/solutions/43000670334/)
- Yield – the ratio of a company’s annualized dividend compared to its share price. [More info here](https://www.tradingview.com/support/solutions/43000597817/).

Performance:

- Perf% 1W / 1M / 3M / YTD / 1Y / 5Y / All time – Percentage price change over the corresponding period. [More info here](https://www.tradingview.com/support/solutions/43000636536/).

Risk:

- Beta 1Y / 3Y / 5Y – Measures the asset's sensitivity to market movements. [More info here](https://www.tradingview.com/support/solutions/43000703603/).
- Volatility 1D / 1W / 1M – Measures the price variations of a financial instrument over a specified period of time. [More info here](https://www.tradingview.com/support/solutions/43000635876/).

Technicals:

- Tech Rating – is a technical analysis tool that combines the [ratings of several technical indicators](https://www.tradingview.com/support/solutions/43000614331/).
- Ma Rating – [Moving Averages](https://www.tradingview.com/support/solutions/43000502589/)
- Os Rating – Oscillators Rating
- RSI (14) – [Relative Strength Index](https://www.tradingview.com/support/solutions/43000502338/) with Length 14
- Mom (10) – [Momentum](https://www.tradingview.com/support/solutions/43000589187/) with Length 10
- AO – [Awesome Oscillator](https://www.tradingview.com/support/solutions/43000501826/)
- CCI (20) – [Commodity Channel Index](https://www.tradingview.com/support/solutions/43000502001/) with Length 20
 Previous Previous Overview: News Next Next Transactions page Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43558657145/original/7O6JsBVttxMLGIl3rDgqp2D4HKm5rkoWaw.png?1747661264

**Описание:**

This image displays a **TradingView \

---

