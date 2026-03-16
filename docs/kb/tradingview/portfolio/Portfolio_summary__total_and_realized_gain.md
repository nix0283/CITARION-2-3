# Portfolio summary: total and realized gain

**URL:** https://www.tradingview.com/support/solutions/43000756023-portfolio-summary-total-and-realized-gain/

---

- [ Help Center ](/)
- / 
- / Portfolio 
- / [ Portfolio Summary ](/support/folders/43000598041-portfolio-summary/)
- / [ Portfolio summary: total and realized gain ](/support/solutions/43000756023-portfolio-summary-total-and-realized-gain/)

# Portfolio summary: total and realized gain 

#### 

#### Total gain 

#### Definition: 
 Total gain is the combined realized and unrealized financial result of the portfolio, accounting for all income and expenses.Total gain % is the overall portfolio return calculated using the Time-Weighted Return (TWR) method. This metric helps evaluate the performance of the user’s strategy.

Go to **Overview** and select **Portfolio change → Performance** to plot these values as a chart: 

#### Calculation: 

Total gain = Realized gain + Unrealized gain

Total gain % = [(1+HP₁) × (1+HP₂) × ... × (1+HPₙ)] − 1

HP = (End value - Initial value) / Initial value

- Initial value — portfolio value at the moment of entering the position.
- End value — portfolio value at the moment of exiting the position.

**Note:** both closed and open positions are considered.

- **HP** — the percentage change of the value of the portfolio before any new cash flows.

Let’s examine an example calculation based on the following set of trades:

2025-02-01 Deposit 1000 

2025-03-07 Buy NASDAQ:AAPL: 

- price = 204 
- Qty = 1 
- Commission = 0 

2025-03-07 Buy NASDAQ:TSLA: 

- price = 228 
- Qty = 1 
- Commission = 0 

2025-03-10 Sell NASDAQ:AAPL: 

- price = 214 
- Qty = 1 
- Commission = 0 

2025-03-15 Sell NASDAQ:TSLA: 

- price = 230 
- Qty = 1 
- Commission = 0 

2025-03-16 Buy NASDAQ:TSLA: 

- price = 240 
- Qty = 1 
- Commission = 0 

Last price for NASDAQ:TSLA = 249.78

Total gain:

- Realized gain (as calculated in the "Realized gain" section below): 12
- Unrealized gain (as per the method described in [Portfolio Summary: Unrealized gain](https://www.tradingview.com/support/solutions/43000756017/)): 9.78 → 12 + 9.78 = 21.78

Total gain %: Calculate HP for each position:

- HP₁ = (1010 - 1000) / 1000 = 0.01
- HP₂ = (1012 - 1010) / 1010 = 0.002
- HP₃ = (1021.78 - 1012) / 1012 = 0.009

Based on HPₙ and the TWR method, we calculate the final Total gain %: ((1 + 0.01) * (1 + 0.002) * (1 + 0.009) - 1) * 100 = 2.11%

Note:If the portfolio includes operations that result in a negative Cash value or a negative position value, all related metric calculations will be indicative. In this case, the metrics are for informational purposes only and do not guarantee absolute accuracy.

#### Realized gain 

#### Definition: 

Realized gain is the fixed financial result of the portfolio.Realized gain % is the fixed financial result of the portfolio expressed as a percentage using the Time-Weighted Return (TWR) method.

#### Calculation: 

Realized gain = Σ(End value - Initial value) - commission - taxes and feesNote: the commission on open trades is included.

Realized gain % = [(1+HP₁) × (1+HP₂) × ... × (1+HPₙ)] − 1HP = (End value - Initial value) / Initial value

- Initial value — portfolio value at the moment of entering the position
- End value — portfolio value at the moment of exiting the position

**Note:** Only closed positions are considered.

Let’s examine an example calculation based on the following set of trades:

2025-02-01 Deposit 1000 

2025-03-07 Buy NASDAQ:AAPL: 

- price = 204 
- Qty = 1 
- Commission = 0 

2025-03-07 Buy NASDAQ:TSLA: 

- price = 228 
- Qty = 1 
- Commission = 0 

2025-03-10 Sell NASDAQ:AAPL: 

- price = 214 
- Qty = 1 
- Commission = 0 

2025-03-15 Sell NASDAQ:TSLA: 

- price = 230 
- Qty = 1 
- Commission = 0 

Realized gain:

- Trade 1: 1010 - 1000 = 10
- Trade 2: 1012 - 1010 = 2 → 10 + 2 - 0 (Commission) - 0 (Taxes and fees) = 12

Realized gain %: Calculate HP for each closed position:

- HP₁ = (1010 - 1000) / 1000 = 0.01
- HP₂ = (1012 - 1010) / 1010 = 0.002

Based on HPₙ and the TWR method, we calculate the final Realized gain %: ((1 + 0.01) * (1 + 0.002) - 1) * 100 = 1.2%
 Previous Previous Portfolio Summary: Unrealized gain Next Next Portfolio summary: annualized yield Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43604098912/original/NXZeasLEv9WsEbyVCLaIB3kekRZ_lMXxSw.png?1769624028

**Описание:**

This image displays a **TradingView portfolio performance summary** (likely from the \

---

