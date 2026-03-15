# Williams Alligator

**URL:** https://www.tradingview.com/support/solutions/43000592305-williams-alligator/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Williams Alligator ](/support/solutions/43000592305-williams-alligator/) # Williams Alligator Definition The Williams Alligator indicator is a trend-following indicator based on the idea that financial markets and individual securities usually trend at a lower rate than sideways ranges. It uses smoothed Moving Averages to analyze market trends. The indicator was developed with the thought in mind that both institutions and individuals generally collect more profit when a market is trending strongly. History The Williams Alligator indicator was first introduced by experienced trader, Bill Williams. Williams was an early pioneer of market psychology and the idea that investor and trader sentiment can affect market performance and subsequent trends. Calculations The Williams Alligator indicator uses the Simple Moving Average (SMA) indicator in its calculation to add more smoothed averages to the result that generally slow down indicator turns. The indicator uses three smoothed Moving Averages (MAs) set at periods that are Fibonacci numbers: five, eight, and 13. The calculation for the Williams Alligator indicator is represented below by the following formula: Simple moving average (SMA): Subsequent values are as follows: Definitions: SUM1: The sum of closing prices for n amount of periods PREVSUM: The smoothed sum of the previous bar SMMA1: The smoothed Moving Average of the first bar SMMA(i): The smoothed Moving Average of the current bar (not including the first bar) CLOSE(i): The current closing price n: The chosen smoothing period The three Moving Averages that are used comprise the Alligator in three major ways: the Jaw, the Teeth, and the Lips/Mouth. These components open and close depending on their subsequent reaction to evolving trends and trading ranges alike. Let’s dig a little deeper into each function of the Williams Alligator indicator. The Jaw. The Alligator’s jaw is projected as a blue line and begins with the 13-bar SMMA. The line is smoothed by eight bars on its following values. The Teeth. The Alligator’s teeth are projected as a red line and begin with the eight-bar SMMA. The line is smoothed by five bars on its following values. The Lips/Mouth. The Alligator’s lips/mouth are projected as a green line and begin with the five-bar SMMA. The line is smoothed by three bars on its following values. Takeaways The Williams Alligator indicator is a great tool used for technical analysis. It uses three smoothed Moving Averages to paint a clearer picture for the trader in their market analysis. Additionally, the indicator applies both convergence and divergence in order to build useful trading signals. The Jaw of the Alligator inherently makes the slower turns, whereas the Lips/Mouth of the indicator make the faster turns. When the Lips cross down through the other lines, it is signally short-sale opportunities. If the Lips cross upward, it is typically signalling a buying opportunity. The Alligator is often referred to as “sleeping” when the line is crossing downwards, and “awakening” when it is crossing upwards. What to look for There are other terms that traders and investors should know and look out for while using this indicator. We’ll break them down a bit for you here. “Eating with [it’s] mouth wide open.” This phrase refers to the three lines of the Williams Alligator indicator stretching apart and moving either higher or lower to denote trading periods. These periods are specific to management of long or short positions. “Sated.” This phrase refers to the lines of the indicator and when they converge into narrow bands. If the lines are shifting towards a more horizontal direction, it may potentially mean that the trend is coming to a close. This alerts the trader to possible trade position realignment and maintaining a profitable outcome. “Sleeping.” This phrase refers to an unusual choppiness in the market where the indicator fires off false positive signals at a high rate. This is explained more below in the Limitations section. Limitations As mentioned above, the Williams Alligator indicator is known for pushing false positive signals when the three lines are criss-crossing amongst each other. This can happen often and is often due to choppy market conditions. This is referred to as “sleeping.” So what should traders do if their indicator is “sleeping?” Williams advises traders to wait it out on the sidelines. It is one of the major drawbacks of the indicator because too many awakening signals within a large range will most likely fail, and it could end up triggering whipsaws. That is when the price sees an extreme directional pivot that can alter trades and trends. Summary The Williams Alligator indicator is a trend-following indicator that uses smoothed Moving Averages to analyze market trends and provide smoother results for general analysis. This is evident in the indicator’s calculation. The Alligator is separated into three main parts: the Jaw, the Teeth, and the Lips/Mouth. Each factor has different tell-tale signs that alert the trader to market trend movement. Previous Previous Williams %R (%R) Next Next Williams Fractal Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43152608549/original/K4OozSqVdtzEOxGhjiKU3eICF0bR3kPvbA.png?1598376604)

**Описание:** The image displays two mathematical formulas related to a technical indicator (likely a Simple Moving Average, SMMA) on a plain white background.  

### UI Elements & Content:  
1. **First Formula**: `SUM1 = SUM(Close, n)`  
   - `SUM1`: A variable representing the sum of closing prices.  
   - `SUM(Close, n)`: A function that calculates the sum of the `Close` price (of a financial asset, e.g., stock) over `n` periods (e.g., days).  

2. **Second Formula**: `SMMA = SUM1 / n`  
   - `SMMA`: The output of the indicator (Simple Moving Average).  
   - `SUM1 / n`: Divides the summed closing prices (`SUM1`) by the number of periods (`n`) to compute the average.  


### Purpose:  
These formulas define a **Simple Moving Average (SMMA)**, a common technical analysis tool used to smooth price data and identify trends. The first step sums closing prices over `n` periods; the second step averages that sum to produce the SMMA value. No charts, buttons, or interactive UI elements are present—this is a static display of the indicator’s mathematical logic.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43152609108/original/IuWxG77MJwOaC_Gn6ho0eYCXnQ-oU_Eh1Q.png?1598376782)

**Описание:** The image displays two mathematical formulas related to the **Smoothed Moving Average (SMMA)** calculation, presented in a clean, text-based format (no TradingView UI elements, charts, or buttons are visible). Here’s a breakdown:  

### 1. First Formula:  
`PREV SUM = SMMA(i - 1) × n`  
- **Purpose**: Computes the “previous sum” for the SMMA calculation.  
- **Variables**:  
  - `PREV SUM`: The sum from the prior period.  
  - `SMMA(i - 1)`: The SMMA value at the *previous* time step (`i - 1`).  
  - `n`: The lookback period (e.g., 10 for a 10-period SMMA).  


### 2. Second Formula:  
`SMMA(i) = (PREV SUM - SMMA(i - 1) + Close(i)) / n`  
- **Purpose**: Calculates the SMMA value at the *current* time step (`i`).  
- **Variables**:  
  - `SMMA(i)`: The SMMA value at the current time step (`i`).  
  - `PREV SUM`: The sum from the first formula.  
  - `SMMA(i - 1)`: The SMMA value at the prior time step.  
  - `Close(i)`: The closing price of the asset at the current time step (`i`).  
  - `n`: The lookback period (consistent with the first formula).  


### Context (SMMA Logic):  
SMMA is a type of moving average that weights recent data more heavily than older data (smoother than a Simple Moving Average). The formulas show how to iteratively compute SMMA:  
1. Use the prior SMMA (`SMMA(i - 1)`) to find the prior sum (`PREV SUM`).  
2. Update the sum by subtracting the prior SMMA, adding the current close price, then dividing by `n` to get the new SMMA (`SMMA(i)`).  


No TradingView-specific UI (e.g., charts, buttons, timeframes) is present—this is a standalone mathematical representation of the SMMA algorithm.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

