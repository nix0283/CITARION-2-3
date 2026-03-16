# Spread charts explained

**URL:** https://www.tradingview.com/support/solutions/43000502298-spread-charts-explained/

---

- [ Help Center ](/)
- / [ Knowledge base ](/knowledge-base/)
- / Chart 
- / [ Learn more about chart types ](/support/folders/43000547460-learn-more-about-chart-types/)
- / [ Spread charts explained ](/support/solutions/43000502298-spread-charts-explained/)

# Spread charts explained 
 Spread charts are comparisons of financial instruments and additional variables. Spread trading is gaining popularity due to their new perspective of financial instrument value that can help to alleviate a certain amount of risk.

There are a few different ways of utilizing spread charts. Some of the more popular ways include price inversions, currency conversions, financial instrument comparisons, and pairs trading.

#### 

**CONTENTS:**

- [Operators and setup](#Setup)
- [Repainting spread charts](#Repaint)
- [Common spread types](#Common) [Chart inversions](#Inversion)
- [Currency conversions](#Currency)
 - [Instrument comparisons](#Instrument)
 [Exchange arbitrage](#Exchange)
- [Crypto arbitrage](#Crypto)
- [Pair trading](#Pair)

#### Operators and setup 

To create your own custom spread chart:

- Enter the first variable (symbol, number etc.) in the "[Symbol Search](https://www.tradingview.com/support/solutions/43000746682-tradingview-symbol-search-tips-for-finding-assets/)" window
- Enter one of the four operators: Subtraction ( – ), addition ( + ), multiplication ( * ), or division ( / ), followed by a space
- Enter the second variable in the "Symbol Search" window

For example: entering AAPL / XAUUSD will create a comparison of Apple stock vs. gold by dividing Apple stock's prices by gold prices.

Spreads for intraday charts are calculated by taking the open, high, low, and close of each 1-minute bar and then recompiling them into the selected interval. This approach is the only method that results in correct spread charts. We handle all necessary calculations on our servers and display the finished spread chart.

**! Note:** A single spread can include no more than 10 unique symbols.

#### Repainting spread charts 

Spread charts can get repainted. The reason for this is that real-time bars are built on tick data, whereas historical bars are built from minute data. The tick data of price movements within a bar is not included in historical bars. The sequence of price movements within a bar plays a crucial role in building spread bars in real time. Therefore, real-time and historical data in a spread chart may differ.

When you refresh a chart, the bars may mismatch, and you may see slightly different bars after refreshing the spread chart. This affects alerts set on spread charts.

#### Common spread types 

#### Chart inversions 

Inverting a chart is a good way to visually chart the correlation between two instruments. For example, with two instruments with very low correlation, inverting one of the instruments with this method will make them viewable moving in the same direction.

Example: an inversion on EURUSD: 1/EURUSD.

#### Currency conversions 

Multiplying or dividing an instrument by a currency pair will allow you to view the price of the instrument in a different currency.

Example: best buy shown in euros: BBY/EURUSD.

#### Instrument comparisons 

A common way to utilize spreads is to divide one instrument by another. This will give you spread value that can be tracked as a single instrument.

Example: Apple's stock vs. gold: AAPL/XAUUSD.

#### Exchange arbitrage 

Spreads can also be used to see the instrument price difference between different exchanges. To do so, you need to subtract a symbol on one exchange from another exchange.

Example: TSX:META–NASDAQ:META.

#### Crypto arbitrage 

With cryptocurrencies popularity rising, crypto arbitrage has become a popular trading opportunity.

Example: BTCUSD-BTCEUR×EURUSD.

#### Pair trading 

Pairs trading involves trading two separate instruments simultaneously to execute a single trade. It is a popular strategy for reducing trading risk.

The idea is to find two highly correlated symbols (or negatively correlated ones) and open positions in both. If the pair is highly correlated, they should move in the same direction.

Typically, an opportunity presents when the pair ratio deviates beyond a threshold — often a certain number of standard deviations from its average. You may then go long on the underperforming symbol and short on the overperforming one.

When the pair moves back toward its average deviation, you may close both positions.

Many technical analysts use the Bollinger Bands indicator to spot pair trading opportunities. In the example below, Bollinger Bands are set to be 2.2 standard deviations from the mean.

Here's a number of things in regards to pairs trading:

- **Designed to be market-neutral:** Because of the opposing positions, overall market direction should not affect the trade. The profit comes from the relative movement between the instruments, not the market trend
- **Correlation moves:** Correlation ranges from –1 to 1, with 1 being perfect positive correlation. Pairs trading can also work with negatively correlated instruments. For those, positions may be opened in the same direction when the instruments are closer together than usual — anticipating divergence
- **Position size:** Avoid entering the same number of units for both instruments. Instead, match the dollar value of both positions. If you use an equal number of shares but the instruments have different prices, the more expensive instrument will dominate the trade

In the example below, using the same number of shares creates a highly unbalanced trade in dollar terms.

The number of shares should be adjusted to equalize the dollar value of each side. While it may not be exact, getting close is crucial.

**Correlation between instruments:** This is the cornerstone of pairs trading. Correlation changes over time — even during a trade — so we recommend monitoring it closely.

Also read:

- [Getting started with Supercharts](https://www.tradingview.com/support/solutions/43000746464-getting-started-with-supercharts/)
- [Introduction to TradingView alerts](https://www.tradingview.com/support/solutions/43000520149-introduction-to-tradingview-alerts/)
- [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/)
- [TradingView screeners walkthrough](https://www.tradingview.com/support/solutions/43000718885-tradingview-screeners-walkthrough/)
- [Master the Options Strategy Builder](https://www.tradingview.com/support/solutions/43000707214-master-the-options-strategy-builder/)
 Previous Previous Advanced intraday chart types Next Next Understanding bar charts Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43602743744/original/_zdiYu2JbhauMZYKVvoT1NCcB2dEmn9-Iw.png?1768990111

**Описание:**

This image displays a **simple financial comparison table** (likely from a TradingView interface or a similar trading platform) designed to compare two investment positions. Here’s a detailed breakdown of its elements:  


### 1. **Table Structure & Columns**  
The table has three columns:  
- **First Column (Left):** Labels the data categories (e.g., “MOST RECENT CLOSE,” “NUMBER OF SHARES”).  
- **Second Column (Middle):** Titled “SYMBOL 1” with the ticker “SPY” (a popular S&P 500 ETF).  
- **Third Column (Right):** Titled “SYMBOL 2” with the ticker “USB” (likely U.S. Bancorp, a bank stock).  


### 2. **Rows & Data Points**  
Each row represents a key metric for the two symbols:  

- **“MOST RECENT CLOSE”**:  
  - SPY: $176.26 (the latest closing price of the SPY ETF).  
  - USB: $37.76 (the latest closing price of USB stock).  

- **“NUMBER OF SHARES”**:  
  - SPY: 500 shares (the quantity of SPY held).  
  - USB: 500 shares (the quantity of USB held).  

- **“DOLLAR VALUE”**:  
  - SPY: $88,130.00 (calculated as `500 shares × $176.26`).  
  - USB: $18,880.00 (calculated as `500 shares × $37.76`).  


### 3. **UI Elements & Purpose**  
- **Column Headers**: “SYMBOL 1”/“SYMBOL 2” identify the two assets being compared.  
- **Row Labels**: Clearly define the metric (e.g., closing price, share count, total value) for easy interpretation.  
- **Data Cells**: Display numerical values (prices, quantities, totals) for quick comparison of the two positions.  


### 4. **Context & Use Case**  
This table is likely used to:  
- Compare the *value* of two investments (e.g., portfolio allocation, performance).  
- Track the *dollar exposure* to each asset (e.g., $88k in SPY vs. $18.8k in USB).  
- Analyze how different assets contribute to a portfolio (e.g., SPY is a larger portion of the total value here).  


In short, the interface provides a concise, side-by-side view of two investment positions, highlighting their prices, quantities, and total dollar values for easy comparison.

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43602743818/original/tzeq9uHtz7rluo0_lezKOg6_9UVfhY6dlw.png?1768990134

**Описание:**

The image displays a **simple trading comparison table** (likely from a TradingView widget or a custom portfolio tracker) designed to compare two financial instruments. Here’s a detailed breakdown:  


### 1. **Table Structure & Columns**  
The table has three columns:  
- **First column (left):** Labels for metrics (e.g., “MOST RECENT CLOSE,” “NUMBER OF SHARES,” “DOLLAR VALUE”).  
- **Second column (middle):** Titled “SYMBOL 1” with the ticker `SPY` (SPDR S&P 500 ETF, a popular U.S. stock market index fund).  
- **Third column (right):** Titled “SYMBOL 2” with the ticker `USB` (U.S. Bancorp, a U.S. bank stock).  


### 2. **Rows & Metrics**  
Each row represents a key trading metric:  

#### a. **“MOST RECENT CLOSE”**  
- **Purpose:** Shows the last traded price of each symbol.  
- **Values:**  
  - `SYMBOL 1 (SPY): $176.26` (price per share of the S&P 500 ETF).  
  - `SYMBOL 2 (USB): $37.76` (price per share of U.S. Bancorp).  


#### b. **“NUMBER OF SHARES”**  
- **Purpose:** Indicates how many shares of each symbol are held (or being analyzed).  
- **Values:**  
  - `SYMBOL 1 (SPY): 107` shares.  
  - `SYMBOL 2 (USB): 500` shares.  


#### c. **“DOLLAR VALUE”**  
- **Purpose:** Calculates the total value of the shares (price × number of shares) for each symbol.  
- **Values:**  
  - `SYMBOL 1 (SPY): $18,859.82` (107 shares × $176.26).  
  - `SYMBOL 2 (USB): $18,880.00` (500 shares × $37.76).  


### 3. **UI Elements & Function**  
- **Column Headers:** “SYMBOL 1”/“SYMBOL 2” identify the two assets being compared.  
- **Metric Labels:** “MOST RECENT CLOSE,” “NUMBER OF SHARES,” and “DOLLAR VALUE” define what each row measures.  
- **Text/Numbers:** Clear, readable font for prices, share counts, and totals (no interactive buttons here—this is a static data display).  


### 4. **Context (TradingView Relevance)**  
While the image doesn’t show TradingView’s full interface (e.g., charts, indicators), this table likely comes from a **TradingView widget** (e.g., a “Portfolio” or “Watchlist” widget) that lets users track multiple assets. It’s used to quickly compare:  
- Recent prices,  
- Share quantities,  
- Total dollar value of holdings.  


In short, this table is a concise snapshot for comparing two stocks/ETFs, showing their latest prices, how many shares are held, and the total value of those shares.

---

