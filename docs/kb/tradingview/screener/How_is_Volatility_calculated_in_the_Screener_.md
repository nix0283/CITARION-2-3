# How is Volatility calculated in the Screener?

**URL:** https://www.tradingview.com/support/solutions/43000635876-how-is-volatility-calculated-in-the-screener/

---

- [ Help Center ](/)
- / 
- / [ How is Volatility calculated in the Screener? ](/support/solutions/43000635876-how-is-volatility-calculated-in-the-screener/)

# How is Volatility calculated in the Screener? 
 Volatility measures the price variations of a financial instrument over a specified period of time. The wider the range in prices, the higher the volatility. The narrower the range in prices, the lower the volatility. 

Here's the volatility formula that we use for our calculations (weekly, monthly, and daily):

 Pine Script® // @version= 4 
 study ( "volatility" ) 

 fastSearchN ( xs , x ) => // xs - sorted, ascending 
 max_bars_back ( xs , 366 ) 
 left = 0 
 right = min ( bar_index , 366 ) 
 mid = 0 
 if xs < x 
 0 
 else 
 for i = 0 to 9 
 mid := ceil (( left + right ) / 2 ) 
 if left == right 
 break 
 else if xs [ mid ] < x 
 right := mid 
 continue 
 else if xs [ mid ] > x 
 left := mid 
 continue 
 else 
 break 
 mid 

 month1 = 30 
 month_ago = timenow - 1000 * 60 * 60 * 24 * month1 
 month_ago_this_bar = time - 1000 * 60 * 60 * 24 * month1 
 countOfBars1MonthAgo = fastSearchN ( time , month_ago ) 
 countOfBars1MonthAgoThisBar = fastSearchN ( time , month_ago_this_bar ) 

 week1 = 7 
 week_ago = timenow - 1000 * 60 * 60 * 24 * week1 
 week_ago_this_bar = time - 1000 * 60 * 60 * 24 * week1 
 countOfBarsWeekAgo = fastSearchN ( time , week_ago ) 
 countOfBarsWeekAgoThisBar = fastSearchN ( time , week_ago_this_bar ) 

 // volatility 
 volatility ( bb ) => 
 bb2 = bb 
 if bar_index == 0 
 bb2 := 365 
 if bb2 == 0 
 na 
 else 
 s = sum (( high - low ) / abs ( low ) * 100 / bb2 , bb2 ) 
 if bb == 0 
 na 
 else 
 s 

 plot ( volatility ( countOfBarsWeekAgoThisBar ) , title = "Volatility.W" ) 
 plot ( volatility ( countOfBars1MonthAgoThisBar ) , title = "Volatility.M" ) 
 plot ( tr ( true ) * 100 / abs ( low ) , title = "Volatility.D" ) 
 Expand 49 lines Note: this script values are different on history and realtime because of timenow, see [https://www.tradingview.com/pine-script-docs/en/v4/essential/Indicator_repainting.html](https://www.tradingview.com/pine-script-docs/en/v4/essential/Indicator_repainting.html)

For visual display, you can add this script to your chart through the Pine Editor using the chart's daily timeframe. An indicator will appear on the chart, the plots of which will show values for each type of volatility.
 Previous Previous How do we calculate Relative Volume and Relative Volume at Time? Next Next How is Performance calculated in the Screener? Launch Supercharts

