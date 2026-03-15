# Total trades

**URL:** https://www.tradingview.com/support/solutions/43000681704-total-trades/

---

- [ Help Center ](/)
- / [ Knowledge base ](/knowledge-base/)
- / Strategies 
- / [ Strategy report metrics ](/support/folders/43000599093-strategy-report-metrics/)
- / [ Total trades ](/support/solutions/43000681704-total-trades/)

# Total trades 
 The cumulative count of all positions that have been opened and subsequently closed by the strategy during the testing period. This figure represents the total sample size used to calculate the strategy’s performance statistics.

**Exclusions**: This metric strictly counts completed trade cycles (entry + exit). It does not include currently open positions or pending orders that have not been filled.

**Strategic value**: A small number of total trades (e.g., under 30) often leads to "overfitting" or results based on luck. A larger sample size provides higher confidence that the strategy’s performance is a result of a repeatable edge rather than market coincidence.

**Frequency validation**: This count allows you to verify if the strategy is executing at its intended pace—whether it is a high-frequency scalper or a low-frequency position trader.

Calculation Formula

The sum of all realized outcomes.

 Previous Previous Sortino Ratio Next Next Total open trades Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43608764738/original/Pn4nXY6lPWv4EKAk3479IXpR9ood6Nlvhg.png?1771944754

**Описание:**

The image displays a **text-based mathematical formula** (not a full TradingView interface) that defines the relationship between different trade categories in trading. Here’s a detailed breakdown:  


### 1. Content of the Formula  
The formula is:  
`Total Trades = Winning Trades + Losing Trades + Even Trades`  

This equation states that the **total number of trades** executed is the sum of three categories:  
- *Winning Trades*: Trades that resulted in a profit.  
- *Losing Trades*: Trades that resulted in a loss.  
- *Even Trades*: Trades where the profit/loss is zero (break-even).  


### 2. UI Elements (Simplified, as the image is text-only)  
Since the image is a plain text formula (not a graphical TradingView interface), there are no interactive UI elements (buttons, charts, etc.). However, in a full TradingView interface, this formula would typically appear in a **text box, annotation, or educational panel** (e.g., in a “Trading Journal” or “Performance Metrics” section) to help traders calculate or verify their trade statistics.  


### 3. Purpose of the Formula  
This formula is fundamental for **trade analysis**:  
- Traders use it to ensure their “Total Trades” count matches the sum of winning, losing, and even trades (to avoid miscalculations in performance metrics like win rate, profit factor, or risk-reward ratios).  
- It helps in tracking trading consistency and identifying gaps in record-keeping (e.g., if “Total Trades” doesn’t align with the sum of categories, it signals an error in logging).  


### 4. Context in TradingView  
In a real TradingView interface, this formula might be part of:  
- A **custom indicator** (to auto-calculate trade counts).  
- A **trading journal widget** (to display performance metrics).  
- An **educational tooltip** (to explain how trade categories are defined).  


In summary, the image is a text-based formula for calculating total trades, with no interactive UI elements (as it’s a simplified representation). Its purpose is to clarify the relationship between trade categories for analysis or education.

---

