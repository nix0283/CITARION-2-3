# What do the ratings in the Screener mean?

**URL:** https://www.tradingview.com/support/solutions/43000475547-what-do-the-ratings-in-the-screener-mean/

---

- [ Help Center ](/)
- / 
- / [ What do the ratings in the Screener mean? ](/support/solutions/43000475547-what-do-the-ratings-in-the-screener-mean/)

# What do the ratings in the Screener mean? 
 Note: Screener technical ratings are also available in the built-in [Technical Ratings ](https://www.tradingview.com/?solution=43000614331)indicator.

We’ve added columns with recommendations based on general ratings.
 Moving Averages Rating consists of SMAs and EMAs with different lengths (MA lengths are 10, 20, 30, 50, 100, and 200), the Ichimoku Cloud (9, 26, 52), VWMA (20), and HullMA (9). Oscillators Rating is calculated on the following oscillators: RSI (14), Stochastic (14, 3, 3), CCI (20), ADX (14, 14), AO, Momentum (10), MACD (12, 26, 9), Stochastic RSI (3, 3, 14, 14), Williams %R (14), Bulls and Bears Power and UO (7,14,28). Technical Rating column will show you combined ratings for all of the indicators mentioned above. 
You can also add your own filters to this column. 

#### Calculations 

These are the criteria used to determine the rating of the individual indicators used. Note that changes from the last bar are used to determine falling or rising states:
 All Moving Averages 
- Buy — MA value < price
- Sell — MA value > price
- Neutral — MA value = price
 Ichimoku Cloud 
- Buy — lead line 1 > lead line 2 and base line > lead line 1 and conversion line > base line and price > conversion line
- Sell — lead line 1 < lead line 2 and base line < lead line 1 and conversion line < base line and price < conversion line
- Neutral — neither Buy nor Sell
 Relative Strength Index 
- Buy — indicator < 30 and rising
- Sell — indicator > 70 and falling
- Neutral — neither Buy nor Sell
 Stochastic 
- Buy — main and signal lines < 20 and main line > signal line
- Sell — main and signal lines > 80 and main line < signal line
- Neutral — neither Buy nor Sell
 Commodity Channel Index 
- Buy — indicator < -100 and rising
- Sell — indicator > 100 and falling
- Neutral — neither Buy nor Sell
 Average Directional Index 
- Buy — +DI line > -DI line and indicator > 20 and rising
- Sell — +DI line < -DI line and indicator > 20 and rising
- Neutral — neither Buy nor Sell
 Awesome Oscillator 
- Buy — saucer and values are greater than 0, or cross over the zero line
- Sell — saucer and values are lower than 0, or cross under the zero line
- Neutral — neither Buy nor Sell
 Momentum 
- Buy — indicator values are rising
- Sell — indicator values are falling
- Neutral — neither Buy nor Sell
 MACD 
- Buy — main line values > signal line values
- Sell — main line values < signal line values
- Neutral — neither Buy nor Sell
 Stochastic RSI 
- Buy — downtrend and K and D lines < 20 and K line > D line
- Sell — uptrend and K and D lines > 80 and K line < D line
- Neutral — neither Buy nor Sell
 Williams Percent Range 
- Buy — indicator < lower band and rising
- Sell — indicator > upper band and falling
- Neutral — neither Buy nor Sell
 Bulls and Bears Power 
- Buy — uptrend and BearPower < zero and BearPower is rising
- Sell — downtrend and BullPower > zero and BullPower is falling
- Neutral — neither Buy nor Sell
 Ultimate Oscillator 
- Buy — UO > 70
- Sell — UO < 30
- Neutral — neither Buy nor Sell

The numerical value of the *Sell* rating is -1, *Neutral* is 0 and *Buy* is 1. The group and overall ratings are calculated as the average of the ratings of the individual indicators.

Recommendations for the group or overall ratings are based on this numerical rating value and determined according to the following criteria:

- [-1.0 ≤ value < -0.5] — Strong Sell
- [-0.5 ≤ value < -0.1] — Sell
- [-0.1 ≤ value ≤ 0.1] — Neutral
- [0.1 < value ≤ 0.5] — Buy
- [0.5 < value ≤ 1.0] — Strong Buy
 Previous Previous How to add the Screener search results to the Watchlist Next Next How are the most popular filters connected with Change calculated? Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43457075398/original/aanx57oOB_SH1UAK0kG3tfQiYSO2barJIw.png?1703166411

**Описание:**

This image displays a **stock screening/symbol list interface** from TradingView, designed to help users filter and evaluate stocks based on technical and fundamental ratings. Here’s a detailed breakdown of the UI elements, their purposes, and the data presented:


### **1. Header & Search Bar**  
- **Search Icon (Magnifying Glass)**: Located at the top-left, this is a search button to open a search field for finding specific stocks by symbol or name.  
- **\

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43457075505/original/_KVzrukkCBeCy0XRyzVzA_2EsD0n3gee_Q.png?1703166431

**Описание:**

This image shows a **TradingView stock screener interface** displaying a list of stocks with their technical ratings filtered to show only \

---

