# Initial capital

**URL:** https://www.tradingview.com/support/solutions/43000777193-initial-capital/

---

- [ Help Center ](/)
- / [ Knowledge base ](/knowledge-base/)
- / Strategies 
- / [ Strategy report metrics ](/support/folders/43000599093-strategy-report-metrics/)
- / [ Initial capital ](/support/solutions/43000777193-initial-capital/)

# Initial capital 

#### Understanding the metric
 **Initial capital** represents the starting balance a strategy uses during backtesting. It simulates the amount of funds available for trading. It is important to note that while Initial сapital is your starting point, the actual real-time balance as the strategy runs is referred to as Account size. 

The value you set for Initial capital directly influences three key areas:

- **Buying power**: Initial capital sets the baseline for account equity, which influences available buying power. The effective position size is further constrained by leverage, margin settings, and strategy configuration. In a no-leverage environment, position size is typically limited to the available equity. For example, you cannot open a $5,000 position with only $1,000 buying power.
- **Performance**: Reported percentage returns are influenced by initial capital through position sizing and compounding effects. While absolute profit may scale with capital, relative performance primarily depends on the strategy’s risk and sizing rules.
- **Account survival & simulated margin calls**: It acts as a buffer against drawdowns. If account size falls below predefined thresholds or reaches zero, the backtest may simulate "margin call" or stop further trading.

#### Configuring initial capital

By default, if no specific value is provided in the settings or code, the field is set to 1,000,000. The currency for the capital is based on the symbol currently on the chart.

Initial capital can be set in two places:

1. **The strategy settings**

- Open the Strategy Report.
- Click on Settings (the gear icon).
- Navigate to the Properties tab.
- Locate the Initial capital field and enter your desired amount.

Changes here instantly affect the backtest and override any value set in the code.

2. **Strategy code (Pine Script)**

Developers can define a default capital directly in the strategy() declaration. This value will be used when the strategy script is first added to the chart, but can still be changed later via the UI.
 // Example declaration in Pine Script
strategy("My Strategy", initial_capital=10000) Previous Previous List of trades: Adverse excursion Next Next Open P&L Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43607376732/original/zgr4gOExkUA8BMxJRbz-NvcQwjS7rXpnrg.png?1771273365

**Описание:**

This image shows a **TradingView strategy configuration panel** for a \

---

