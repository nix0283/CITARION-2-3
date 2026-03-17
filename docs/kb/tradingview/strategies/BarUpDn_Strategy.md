# BarUpDn Strategy

**URL:** https://www.tradingview.com/support/solutions/43000599823-barupdn-strategy/

---

- [ Help Center ](/)
- / [ Knowledge base ](/knowledge-base/)
- / Strategies 
- / [ Built-in Strategies ](/support/folders/43000587406-built-in-strategies/)
- / [ BarUpDn Strategy ](/support/solutions/43000599823-barupdn-strategy/)

# BarUpDn Strategy 

#### Definition
 The BarUpDn strategy enters a long position if the current bar is green (close > open) and opens above the close of the previous bar. If the current bar is red and its open is below the close of the previous bar, it will enter short. If the loss percent per day exceeds the number specified in the indicator settings, all positions will be closed.

#### Calculations
 Pine Script code 
 Pine Script® // @version= 5 
 strategy ( "BarUpDn Strategy" , overlay = true , default_qty_type = strategy.percent_of_equity , default_qty_value = 10 ) 
 maxIdLossPcnt = input.float ( 1 , "Max Intraday Loss(%)" ) 
 strategy.risk.max_intraday_loss ( maxIdLossPcnt , strategy.percent_of_equity ) 
 if ( close > open and open > close [ 1 ]) 
 strategy.entry ( "BarUp" , strategy.long ) 
 if ( close < open and open < close [ 1 ]) 
 strategy.entry ( "BarDn" , strategy.short ) 
 //plot(strategy.equity, title="equity", color=colo r.red, linewidth=2, style=plot.style_areabr) 
 Expand 4 lines 
#### Conclusion
 The BarUpDn strategy is based on whether or not a specific bar is green and higher than the previous bar or red and lower than the previous bar. The strategy is looking for quick changes in price and attempting to trade those changes, potentially jumping into the start of an uptrend or a downtrend. The BarUpDn strategy is also relatively simple and can be used as an educational starting point for those new to Pine strategies.
 Previous Previous Strategy publishing rules Next Next Bollinger Bands Strategy Launch Supercharts

