# Equity chart

**URL:** https://www.tradingview.com/support/solutions/43000681735-equity-chart/

---

- [ Help Center ](/) - / - / [ I'd like to know more about values in the Strategy Tester Report ](/support/folders/43000587044-i-d-like-to-know-more-about-values-in-the-strategy-tester-report/) - / [ Equity chart ](/support/solutions/43000681735-equity-chart/) # Equity chart The **Equity** chart is a fundamental tool in the Strategy Report that visualizes the dynamic changes in your account balance based on closed trades. It helps you understand the "character" of your strategy — how steadily your capital grows, how its performance compares to a market benchmark (**Buy & Hold**), and the depth of intra-trade risks through **Trades Excursions**. **CONTENTS** - [How to read the chart](#How-to-read-the-chart) - [Performance](#Performance) - [Trades analysis](#Trades-analysis) - [Capital efficiency](#Capital-efficiency) - [Run-ups and drawdowns](#Run-ups-and-drawdowns) - [Main use cases](#Main-use-cases) How to read the chart The chart provides a multi-layered analysis of every trade: - **Cumulative P&L (Dark green line with dots)****:** Shows the accumulated profit or loss after each closed trade. Each dot represents a specific trade result. - **Buy & Hold (Blue line)**: Displays what your capital would look like if you simply bought the asset at the start of the test period and held it. - **Trades Excursions (Vertical bars)**: Visualize price movement during a trade: **Favorable excursion**: The maximum unrealized profit during the trade (MFE Maximum Favorable Excursion). - **Adverse excursion**: The maximum unrealized loss during the trade (MAE Maximum Adverse Excursion). - **Interactive Tooltip**: Hover over any point to see specific trade details: **Trade #**: The trade number and type (Long/Short). - **Cumulative P&L**: The total capital at the time of closing that trade. - **Favorable/Adverse excursion**: Specific currency values for the potential profit and risk within that position. - **Buy & hold**: The benchmark value at that specific time. ! **Note**: The chart defaults to **Absolute** values (currency), but you can switch to **Percentage** using the toggle on the right side of the chart area. Performance This section focuses on comparing strategy returns against the benchmark and analyzing the profit structure. **Visualizations**: - **Profit structure**: A bar chart showing the relationship between Total profit, Open P&L, Total loss, Total P&L, and Commission. - **Benchmarking**: A comparison of the return ranges (Max, Current, Min) for the strategy versus Buy & Hold. **Metrics**: - **Returns**: Initial capital, Open P&L, Net P&L, Gross profit, Gross loss, Profit factor, Commission paid, and Expected payoff. - **Benchmark comparison**: Buy & hold return, Buy & hold % gain, and Strategy outperformance. - **Risk-adjusted performance**: Sharpe ratio, Sortino ratio. Trades analysis This section provides a detailed statistical breakdown of all executed trading operations. **Visualizations**: - **P&L Distribution**: A histogram showing the frequency of trades at different profit/loss levels, including **Average loss** and **Average profit** lines. - **Win/loss ratio**: A donut chart showing the proportion of **Wins**, **Losses**, and **Break even** trades. **Metrics**: Total trades / Total open trades, Winning trades / Losing trades, Percent profitable, Avg P&L, Avg winning trade / Avg losing trade, Ratio avg win / avg loss, Largest winning / losing trade, Largest winner/loser as % of gross profit/loss, Avg # bars in trades, and Avg # bars in winning / losing trades. Capital efficiency This section evaluates how effectively the strategy uses available funds and margin requirements. **Metrics**: - **Capital usage**: Annualized return (CAGR), Return on initial capital, Account size required, Return on account size required, and Net profit as % of largest loss. - **Margin usage**: Avg margin used, Max margin used, Margin efficiency, and Margin calls. Run-ups and drawdowns An analysis of the strategy's peak growth periods and deepest declines. **Metrics**: - **Run-ups**: Avg equity run-up duration (close-to-close), Avg equity run-up (close-to-close), Max equity run-up (close-to-close), Max equity run-up (intrabar), and Max equity run-up as % of initial capital (intrabar). - **Drawdowns**: Avg equity drawdown duration (close-to-close), Avg equity drawdown (close-to-close), Max equity drawdown (close-to-close), Max equity drawdown (intrabar), Max equity drawdown as % of initial capital (intrabar), and Return of max equity drawdown. Main use cases - **Market Comparison**: Use the **Benchmarking** block in the Performance section. If your Cumulative P&L line is consistently below the Buy & Hold line, the strategy might be less effective than simply holding the asset. - **Optimizing Exits**: Analyze the **Favorable excursion** (green bars) on the chart. If green tails are significantly higher than the closing points (the dots), your strategy might be "giving back" too much profit, suggesting you should refine your exit rules. - **Risk Assessment**: Review the **Adverse excursion** (red bars). Long red bars followed by small profit dots indicate that the strategy takes excessive risks for modest gains. - **Psychological Resilience**: Check the **Drawdown duration**. This helps you understand if you can tolerate the time periods where the account remains "underwater" before hitting new highs. Previous Previous Overview tab Next Next Buy & hold equity Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43607378112/original/neyYJudgohs26pOUQKhjoWDv1l_xYlDzdQ.png?1771274026)

**Описание:** This TradingView image displays a **Strategy Report** for the \


**Описание:** This TradingView **Strategy Report** displays performance metrics and an equity chart for the \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43606782451/original/-khL38FGwkGsyskUxCRM7cCZb5nnqudFlw.png?1770902016)

**Описание:** This is a **TradingView Strategy Report** for the \


**Описание:** This is a **TradingView Strategy Report** for the \


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43606784184/original/RgVW7v_bOXbdNiMIsEHU_TtdA-_SfYhk9A.png?1770902462)

**Описание:** This TradingView \


**Описание:** This TradingView \


