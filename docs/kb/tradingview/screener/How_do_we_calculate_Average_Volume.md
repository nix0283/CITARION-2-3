# How do we calculate Average Volume

**URL:** https://www.tradingview.com/support/solutions/43000745917-how-do-we-calculate-average-volume/

---

- [ Help Center ](/)
- / 
- / [ How do we calculate Average Volume ](/support/solutions/43000745917-how-do-we-calculate-average-volume/)

# How do we calculate Average Volume 
 *Avg Vol* — the average trading volume over a specified period. Calculated as the SMA of volume over a specified number of days (returns the moving average, that is, the sum of last N values of volume, divided by N. Where N is the number of days). It represents the average number of shares, contracts, or other assets traded during that time. Higher average volume often indicates stronger market activity and liquidity, while lower values may suggest reduced interest. Helpful in identifying trends, market sentiment, and key levels of activity.

- Here is a script for classic exchanges that allows you to display average volume for 10, 30, 60, and 90 days on your chart (Average Volume is not calculated during Extended hours, only during regular trading sessions):

 Pine Script® // @version= 6 
 // Average volume 
 indicator ( "Average volume" ) 
 AvgVol = ta.sma ( volume , 10 ) 
 plot ( AvgVol , title = 'average_volume_10d_calc' ) 
 plot ( ta.sma ( volume , 30 ) , title = 'average_volume_30d_calc' ) 
 plot ( ta.sma ( volume , 60 ) , title = 'average_volume_60d_calc' ) 
 plot ( ta.sma ( volume , 90 ) , title = 'average_volume_90d_calc' ) 
 Expand 3 lines - Here is a script for crypto exchanges, with automatic USD conversion that allows you to display average volume for 10, 30, 60, and 90 days on your chart (Average Volume is not calculated during Extended hours, only during regular trading sessions):

 Pine Script® // @version= 6 
 // Average volume in USD 
 indicator ( "Average volume in USD" ) 
 volExpr = syminfo.volumetype == "quote" ? volume : ( syminfo.volumetype == "base" ? close * volume : na ) 
 volInUSD = volExpr * request.currency_rate ( syminfo.currency , "USD" , ignore_invalid_currency = true ) 
 avgVol10d = ta.sma ( volInUSD , 10 ) 
 plot ( avgVol10d , title = 'average_volume_10d_calc_usd' ) 
 plot ( ta.sma ( volInUSD , 30 ) , title = 'average_volume_30d_calc_usd' ) 
 plot ( ta.sma ( volInUSD , 60 ) , title = 'average_volume_60d_calc_usd' ) 
 plot ( ta.sma ( volInUSD , 90 ) , title = 'average_volume_90d_calc_usd' ) 
 Expand 5 lines Average Volume is calculated on any available time interval, the list of which you may see in the opened filter editing dialog:

 Previous Previous How do Earnings date filters work in the Screener? Next Next Base and Quote currency Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43541976242/original/YNCqOZSBUl1Ko_HxqMdKWRaSlFP3DmRk4w.png?1740039403

**Описание:**

The image displays a **TradingView Stock Screener interface** (focused on the US market) with a dropdown menu open for configuring the \

---

