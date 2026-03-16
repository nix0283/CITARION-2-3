# How much data is available for Bar Replay?

**URL:** https://www.tradingview.com/support/solutions/43000692816-how-much-data-is-available-for-bar-replay/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Chart - / [ Bar Replay ](/support/folders/43000547807-bar-replay/) - / [ How much data is available for Bar Replay? ](/support/solutions/43000692816-how-much-data-is-available-for-bar-replay/) # How much data is available for Bar Replay? The length of historical data in Bar Replay can vary depending on the selected symbol and chart interval. For daily and daily-based intervals, we display all available data on the chart, and the same data can be used in the Bar Replay mode. For intraday intervals, TradingView keeps a limited amount of data, and the length in the Bar Replay varies depending on the plan. Essential plan - Calculated using the formula: now to 6 months back, multiplied by interval in minutes - The higher the interval selected, the more intraday time-based data is available **Example** Essential users have access to 6 months of 1-minute data. For a 2-minute interval, this limit is doubled, and a year of 2-minute data is available; for a 3-minute it is tripled and 18 months of 3-minute data is available. Plus plan - Calculated to give more historical intraday time-based data for Bar Replay: now to 1 year back, multiplied by the interval in minutes - The higher the interval selected, the more intraday time-based data is available **Example** Plus users have access to one year of 1-minute data. For a 2-minute interval, this limit is doubled, and two years of 2-minute data is available; for a 3-minute it is tripled and three years of 3-minute data is available. **Subscription** **Seconds-based intervals** **1-minute chart** **2-minute chart** **3-minute chart** **5-minute chart** **15-minute chart** **Essential** - 6 months 12 months 18 months 30 months 90 months **Plus** - 1 year 2 years 3 years 5 years 15 years Premium and professional plans Our Premium and professional plans (Expert and Ultimate) provide even more historical intraday data for Bar Replay and allow you to play absolutely all time-based data available in TradingView's data storage. By “all time-based data” here we really mean all historical data that we have, with no extra limitations set. For all time intervals, whether it’s 1 hour, 1 minute, or even 1 second, you’ll get access to the maximum depth of data history and you’ll be able to play it in the Replay mode as far back as the symbol’s data is available on TradingView. Ultimate users also have access to historical tick data in Bar Replay. Tick-based historical data is available for up to 7 days back from the current time. Tick Replay allows you to replay every individual trade (tick) as it occurred, providing the highest possible historical precision. The amount of historical data may vary depending on the selected symbol, chart interval, and data type. On intraday time-based intervals, TradingView keeps a limited amount of data. As a result, the length of the data on intraday intervals may be shorter than on daily ones. For example, if you play NASDAQ:AAPL on a daily interval, the daily history starts from December 12, 1980, while 1-minute AAPL data starts from January 3, 2000, and the earliest 1-second bar in Replay dates from August 17, 2022. For some symbols, we have 1-minute data as far back as 2011, for some, back to 2009, while for others, the data can extend even further, back to 2000. So, you can play up to 20+ years of minutes data in the Replay mode. At the same time, other symbols have shorter intraday history, therefore less data is present in Replay. For all seconds-based intervals, TradingView stores the data starting from August 2022, and the earliest seconds-bar in Replay dates from 2022-08-17. For tick-based Replay, TradingView provides access to tick data for the most recent 7 days on the Ultimate plan. So, Premium and professional-tier plans can replay time-based data as far back as the symbol’s data is available in our storage. Here are some examples: **Symbol** **Initial 1-second bar** **Initial 1-minute bar** **Initial daily bar** NASDAQ:AAPL August 17, 2022 January 3, 2000 December 12, 1980 NASDAQ:MSFT August 17, 2022 January 3, 2000 March 13, 1986 SP:SPX August 17, 2022 January 3, 2000 January 1, 1871 TVC:VIX August 17, 2022 April 8, 1997 January 3, 1990 TVC:DXY August 17, 2022 March 13, 2007 January 31, 1967 FX:EURUSD FX:GBPUSD August 17, 2022 November 28, 2001 January 4, 1971 BITSTAMP:BTCUSD August 17, 2022 August 18, 2011 August 18, 2011 BITSTAMP:ETHUSD August 17, 2022 August 7, 2015 August 7, 2015 Please note that the above-mentioned replay limits are not applied to continuous futures charts — 1! and 2! symbols (for example, ES1!, BANKNIFTY1!), and to futures contracts with the enabled setting "[Use settlement as close on daily interval](https://www.tradingview.com/support/solutions/43000685268-can-i-switch-settlement-and-last-prices-as-close-for-futures/)" as they have their own special intraday limitations due to their synthetic nature: - Premium, Expert, and Ultimate users have access to 30 days of seconds-data of synthetic symbols for all seconds-based intervals. - Premium, Expert, and Ultimate users have access to 1 year of 1-minute data of synthetic symbols. For a 2-minute interval, this limit is doubled, and 2 years of 2-minute data is available; for 3-minute it is tripled and 3 years of 3-minute data is available, and so on. - Plus users can go 1 year back on the 1-minute chart, 2 years back on the 2-minute chart, and so on. - Essential users can go 6 months back on the 1-minute chart, 12 months back on the 2-minute chart, and so on. Tick Replay is not available for symbols that do not support tick-based intervals. To find out where the initial replayable bar for a certain symbol according to your subscription is, please turn the Replay mode on, choose “Select date…” in the dropdown at the replay panel and then press “Select the first available day”. So, you can initiate the replay from the very first bar or any other bar within the available history from the “Select date” menu. Additionally, to access deep intraday time-based data, you can select the starting point for Bar Replay on a higher interval and then switch to a lower interval. For example, if you want to play older 1-minute bars, you can go to the daily interval, turn on Replay mode, select the “Select bar” option, and manually set the starting point somewhere on the chart within your plan's limits. Then, switch to a 1-minute interval and press Play. If the specified starting point for the replay is too far away and there is no data available for the selected time period, Bar Replay will automatically bring you to the first available bar. When you switch intervals from higher to lower ones, it may happen that there is data available on the higher interval (e.g. 1 day) that is not available on the lower time frame chart (e.g. 1 min), as the intraday plan’s limit has been reached or there is no intraday data in our data storage this far back in time. In this case, you will see the message “Data point unavailable” in the bottom left corner of the chart, and your interval remains unchanged. If you want to use a lower interval in Replay anyway, you need to choose a starting point where a lower interval data is available by using the “Select date” option → “Select the first available day”. Previous Previous Learn to trade on historical data Next Next How to select replay interval for the Bar Replay Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43509866162/original/KXmAAhLW-uYyHuJW5JQkX5RQaL4Noxw7XQ.gif?1725985307)

![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43509866372/original/KNyKNitLyjmZQoAMGFklTut0FDZHDL87LA.gif?1725985392)

![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43510040979/original/8uaOlwmDk8sng2s-fXyaYSvtCjrLJgYEEw.png?1726050519)

**Описание:** This TradingView interface displays a **chart with a time-based x-axis** (11:32, 11:41, 11:47) and a **notification popup**.  

### UI Elements:  
- **Left Sidebar Icons** (vertical, top to bottom):  
  - Magnet (likely for \


**Описание:** This TradingView interface displays a **chart playback error notification** over a time-based chart. Here’s a detailed breakdown:  


### **1. Left Sidebar (Tool Icons)**  
A vertical toolbar with 6 icons (top to bottom):  
- **Magnet (with arrows)**: For “Magnet” tool (likely for drawing/alignment).  
- **Pencil + Lock**: For “Edit” or “Lock” (drawing/editing tools).  
- **Lock**: For “Lock” (securing chart elements).  
- **Eye + “fx”**: For “Chart Visibility” or “Indicators” (toggle chart/indicator display).  
- **Link**: For “Share” or “Link” (share chart or connect to data).  
- **Trash Can**: For “Delete” (remove chart elements).  


### **2. Main Chart Area**  
- **Time Axis (X-axis)**: Displays timestamps: `11:32`, `11:41`, `11:47` (likely a 15-minute interval, e.g., 11:30–11:45).  
- **Chart Content**: A blue line (partially visible) suggests a price/time series, but the focus is on the error message.  


### **3. Error Notification (Popup)**  
A white popup with a light blue left border contains:  
- **Title**: `Data point unavailable` (bold, top-left).  
- **Close Button**: `×` (top-right, to dismiss the popup).  
- **Icon**: Blue circle with a white exclamation mark (warning symbol).  
- **Message**:  
  - `The selected date is not available for playback.`  
  - `The chart was moved to the first point available for playback.`  
  (Explains that the user tried to view a date with no data, so the chart auto-adjusted to the earliest available data point.)  


### **Purpose**  
This UI is part of TradingView’s **chart playback feature** (used to review historical price action). The error occurs when a user selects a time with no data, prompting the system to shift to the nearest valid data point. The sidebar tools support chart customization (drawing, indicators, sharing, etc.).


