# Consecutive Up/Down Strategy

**URL:** https://www.tradingview.com/support/solutions/43000599836-consecutive-up-down-strategy/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Strategies - / [ Built-in Strategies ](/support/folders/43000587406-built-in-strategies/) - / [ Consecutive Up/Down Strategy ](/support/solutions/43000599836-consecutive-up-down-strategy/) # Consecutive Up/Down Strategy Definition The Consecutive Up/Down Strategy enters long if for at least X consecutive bars the current close is greater than the previous close. It enters short if for at least Y consecutive bars the current close is lower than the previous close. The X and Y inputs are managed in the strategy settings, which can be accessed by right-clicking on the strategy when it’s overlaid on the chart or by clicking the Settings wheel in the top left region of the chart. Calculations Pine Script Pine Script® // @version= 5 strategy ( "Consecutive Up/Down Strategy" , overlay = true ) consecutiveBarsUp = input ( 3 ) consecutiveBarsDown = input ( 3 ) price = close ups = 0.0 ups := price &gt; price [ 1 ] ? nz ( ups [ 1 ]) + 1 : 0 dns = 0.0 dns := price &lt; price [ 1 ] ? nz ( dns [ 1 ]) + 1 : 0 if ( ups &gt;= consecutiveBarsUp ) strategy.entry ( "ConsUpLE" , strategy.long , comment = "ConsUpLE" ) if ( dns &gt;= consecutiveBarsDown ) strategy.entry ( "ConsDnSE" , strategy.short , comment = "ConsUpLE" ) //plot(strategy.equity, title="equity", color=colo r.red, linewidth=2, style=plot.style_areabr) Expand 9 lines Summary The Consecutive Up/Down Strategy is primarily designed for trends. It can be used on any timeframe and it’s dependent on the values you assign to the Consecutive Bars Up and Consecutive Bars Down. This can be adjusted in the strategy Settings and it’s up to you to decide. The strategy’s default option is 3 consecutive up bars and 3 consecutive down bars. This means that if there are 3 consecutive bars that are above or below the previous bar close, the strategy will go long or short. Previous Previous Channel BreakOut Strategy Next Next Greedy Strategy Launch Supercharts

---

## Изображения

![Image 1](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 2](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

