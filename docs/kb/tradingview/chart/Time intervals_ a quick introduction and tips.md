# Time intervals: a quick introduction and tips

**URL:** https://www.tradingview.com/support/solutions/43000747934-time-intervals-a-quick-introduction-and-tips/

---

- [ Help Center ](/) - / - / [ Supercharts: learn how everything works ](/support/folders/43000579050-supercharts-learn-how-everything-works/) - / [ Time intervals: a quick introduction and tips ](/support/solutions/43000747934-time-intervals-a-quick-introduction-and-tips/) # Time intervals: a quick introduction and tips Time intervals are the amount of time or trading activity during a selected range. They instruct the chart to calculate a start time and an end time for trading. The main principles for how charts are constructed based on the interval are almost the same for every chart type. To understand how intervals work, let’s take a look at a candlestick chart, as it is one of the most informative and descriptive chart types. **CONTENTS:** - [Candlesticks as intervals](#Candlesticks-as-intervals) - [How to choose an interval](#How-to-choose-an-interval) - [How to set a custom interval](#How-to-set-a-custom-interval) - [Time intervals and trading hours](#Time-intervals-and-trading-hours) Candlesticks as intervals Each candle on a [candlestick chart](https://www.tradingview.com/support/solutions/43000745269-candles-charts-what-you-need-to-know-and-how-to-use-them/) consists of four pieces of information, also known as prices:: opening, high, low, and closing prices. The interval shows these prices within the chosen range, so it defines how much time it takes to form one candle. For example, if the interval is set to 1 day, each candlestick will use each day's opening, high, low, and closing prices. And if you choose a 4-hour interval, each candlestick will reflect the price’s action within that 4-hour period, with each previous candlestick representing the previous four hours of trading. How to choose an interval Find the time interval menu on the upper toolbar. From here, you can select one of the options. - Ticks (1, 10, 100, 1000) - Seconds (1, 5, 10, 15, 30, 45) - Minutes (1, 2, 3, 5, 10, 15, 30, 45) - Hours (1, 2, 3, 4) - Days (1 day, 1 week, 1 month, 3 months, 6 months, 12 months) - Ranges (1, 10, 100, 1000) Time intervals range widely. Some are more appropriate for scalping, others for intraday trading, some are used for swing trading, while weekly and monthly intervals for long-term investments. Depending on your strategy and goals, choose the interval that is most appropriate for you. The interval menu can be customized: some of the basic intervals can be removed. To do that, press the remove button near the star icon. To add an interval as your favorite, press the star icon to the right of it. The selected intervals will appear on the upper toolbar. How to set a custom interval You can always create a custom interval — this can be 205 minutes, 82 days, 37 weeks, etc. For this, press "Add custom interval…". Another easy way to set the time interval is to type in minutes directly from the chart. The maximum available interval here is 1,440 minutes, equal to 24 hours. Time intervals and trading hours No matter which time interval you choose, the right-most candlestick on the chart may represent that interval only partly. As the last candle may not be fully formed yet, its appearance might change based on the trading activity happening at that very moment. Some exchanges provide 24/7 trading (like those for cryptocurrencies), so the right-most candlestick always updates to reflect the current price. If the exchange is currently closed, the right-most candlestick will represent the last recorded price from the most recent trading session. For example, META stocks are traded on Nasdaq, which closes at 16:00. After closing, you'll be seeing the same candlesticks for the same time interval until the market reopens at 09:30 the next day, no matter when you view the chart. To see the date and time the candlestick was formed, move your cursor across the chart. They'll be displayed at the bottom. Add to that time the selected interval, say, 45 minutes, and you'll know what the prices were from 11:45 to 12:30. Remember that the last candlestick on that chart represents only 30 minutes of trading, because the second to the last candlestick ends at 15:30, and the exchange closes at 16:00. Starting the next day, candlesticks will again display 45 minutes of trading each. [Tick-based intervals](https://www.tradingview.com/support/solutions/43000709225/) encapsulate successive numbers of price ticks rather than fixed blocks of time. If you choose ranges as intervals, your chart type would be changed for Range. Our knowledge base has the complete guide on[ how to use Range bars](https://www.tradingview.com/support/solutions/43000474007/) to analyze the price movement of financial instruments, while also reducing market noise. Also read: - [Getting started with Supercharts](https://www.tradingview.com/support/solutions/43000746464-getting-started-with-supercharts/) - [Introduction to TradingView alerts](https://www.tradingview.com/support/solutions/43000520149-introduction-to-tradingview-alerts/) - [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/) - [TradingView screeners walkthrough](https://www.tradingview.com/support/solutions/43000718885-tradingview-screeners-walkthrough/) - [Master the Options Strategy Builder](https://www.tradingview.com/support/solutions/43000707214-master-the-options-strategy-builder/) Previous Previous TradingView layouts: a quick guide Next Next How to configure your Supercharts Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43548020211/original/EkbzHzgmoha_6sSI-xm1Ow_DbimUvgjdXA.png?1742808513)

**Описание:** This image is a **TradingView-style educational diagram** explaining a 1-day candlestick chart. Here’s a detailed breakdown:  


### 1. Title & Context  
- **Title**: “Candle at 1-day interval” (centered at the top, in bold black text).  
- **Purpose**: Indicates the chart represents a single day’s price action (1-day time interval).  


### 2. Candlestick Chart (Central Element)  
A green candlestick (vertical rectangle + thin “wicks”/“shadows”) visualizes daily price movements. Key components:  
- **Body (Rectangle)**: The thick green rectangle. Its height represents the range between the **daily open** and **daily close** prices.  
- **Upper Wick (Thin Line)**: Extends upward from the body’s top. Its length represents the range between the **daily high** and the daily close.  
- **Lower Wick (Thin Line)**: Extends downward from the body’s bottom. Its length represents the range between the **daily low** and the daily open.  


### 3. Labeled Annotations (Arrows + Text)  
Each label points to a specific part of the candlestick, defining its meaning:  
- **“Daily open”**: Arrow points to the left edge of the candlestick body (price at the start of the day).  
- **“Daily close”**: Arrow points to the right edge of the candlestick body (price at the end of the day).  
- **“Daily high”**: Arrow points to the top of the upper wick (highest price of the day).  
- **“Daily low”**: Arrow points to the bottom of the lower wick (lowest price of the day).  


### 4. Visual Style & Purpose  
- **Color**: Green body (standard for bullish days, where close > open).  
- **UI/UX Goal**: Simplifies candlestick anatomy for traders, showing how open, close, high, and low prices are represented in a 1-day interval.  


This diagram is a foundational tool for teaching candlestick chart interpretation, common in TradingView’s educational resources.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43548020220/original/GfFUmLLb37LSUrlyio8U1qSwaDEI_l0ppA.png?1742808515)

**Описание:** This TradingView chart displays a **daily (D)** candlestick chart for the symbol **NFLX** (Netflix), with the following key elements:  


### **Top Toolbar**  
- **Symbol & Timeframe**: \


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43548020225/original/sXeRDh5XbDM3opBWTVCMzURHki2_rXZNPw.png?1742808516)

**Описание:** This TradingView interface displays a **candlestick chart** for the instrument \


