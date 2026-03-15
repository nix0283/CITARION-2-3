# How are High/Low and New high/New low calculated?

**URL:** https://www.tradingview.com/support/solutions/43000753745-how-are-high-low-and-new-high-new-low-calculated/

---

- [ Help Center ](/)
- / 
- / [ How are High/Low and New high/New low calculated? ](/support/solutions/43000753745-how-are-high-low-and-new-high-new-low-calculated/)

# How are High/Low and New high/New low calculated? 

#### **High/Low**
 This is the highest/lowest value of the symbol's price for a certain period of time. 

These metrics have 2 types of settings in the screener:

#### **High/Low Interval**

**Interval** - High/Low is the highest/lowest value of the symbol's price in the selected timeframe. You can check this data by opening the Superchats and looking at the bar values:

Let's take a look at how it works on the High 1-month as an example. First of all, we imagine the bars on the chart with the selected 1-month interval. Each candle (bar) represents aggregated data for a month of the price change history, expressed in 5 numbers: the open price of the interval, the close price, the low price for the period, the high price for the period, and the total trading volume. The bar in the selected interval covers a **calendar month**, e.g., from 01.01 to 31.01, from 01.02 to 28.02, from 01.03 to 31.03, etc. In the screener, the serial data is exactly the same as on the chart (with the same selected interval). As a result, when selecting the High 1-month in the screener, the value is equal to the high price of the monthly bar from the chart. If today is March 4, then the range of the monthly bar is from March 1 to March 4, so the High 1 month is the high price from March 1 to March 4.

#### **High/Low ****Date range**

**Date range** - the High/Low value of the symbol for the last selected period. For example, the High 1M is the highest value of the daily bar price for the **last 30 days**. Let's assume that today is March 4, then the screener looks at the high prices of all daily bars over the past 30 days, i.e., from February 2 to March 4, and finds the highest value among them.

#### **New high/New low**

It allows you to find symbols that have a high/low price for a certain period of time in the last trading session.

For example, the New High 1M filter will help you find symbols that have updated their monthly highs in the current session (whose symbol price today was at least once higher than all asset prices over the past month). 

**How it works**: The screener compares the high of the last daily bar with the highest high of the month. If the High of the current daily bar is greater than or equal to the high value for 30 days, then the symbol meets the filter condition and is included in the results.

All similar filters in the set work the same way:

#### **New High**

****
 ** ** 

New High 1 Month - find the symbols whose high price for the last month occurred in the last trading session;

New High 3 Month - find the symbols whose high price for the last 3 months occurred in the last trading session;

New High 6 Month - find the symbols whose high price for the last 6 months occurred in the last trading session;

New High 52 Month - find the symbols whose high price for the last 52 months occurred in the last trading session;

New High All Time - find the symbols whose price has never been as high as in the last trading session.

#### **New Low**

****
 ** ** 

New Low 1 Month - find the symbols whose low price for the last month occurred in the last trading session;

New Low 3 Month - find the symbols whose low price for the last 3 months occurred in the last trading session;

New Low 6 Month - find the symbols whose low price for the last 6 months occurred in the last trading session;

New Low 52 Month - find the symbols whose low price for the last 52 months occurred in the last trading session;

New Low All Time - find the symbols whose price has never been as low as in the last trading session.
 Previous Previous Stock exchange’s markets Next Next Sharia-compliant securities Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43551864895/original/svij3CA3k1zny98NC1oUipOmwXSQztVE2Q.png?1744373515

**Описание:**

This image shows the **TradingView Stock Screener interface** displaying a list of U.S. stocks with their real-time market data. Here's a detailed breakdown:


### **Top Navigation Bar**
- **TradingView Logo**: Left-aligned, the platform's brand identifier.
- **Search Bar**: Labeled \

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43551865019/original/LctYaIAfUqmAnBonU7raAY9yROaSf1PWlg.png?1744373555

**Описание:**

This image displays a **candlestick chart** (a core element of TradingView’s technical analysis interface) that illustrates the price action of a financial instrument (e.g., stock, forex, crypto) over a single time period (e.g., 1 minute, 1 hour, 1 day). Below is a detailed breakdown of the UI elements, their purposes, and the chart’s structure:


### 1. **Candlestick Components (Visual & Labeled)**
Candlesticks encode four key price points for a time period:  
- **Green Candlestick (Left):** Represents a period where the **Close price > Open price** (bullish, upward price movement).  
  - **Body:** The thick rectangular portion. Its top edge = **Open price**, bottom edge = **Close price**.  
  - **Wick (Shadow):** The thin vertical line extending above the body. Its top = **High price** (highest price traded during the period).  
- **Red Candlestick (Right):** Represents a period where the **Close price < Open price** (bearish, downward price movement).  
  - **Body:** The thick rectangular portion. Its top edge = **Open price**, bottom edge = **Close price**.  
  - **Wick (Shadow):** The thin vertical line extending below the body. Its bottom = **Low price** (lowest price traded during the period).  


### 2. **Labeled Price Levels (Dashed Blue Lines)**
Dashed blue horizontal lines label the four core price metrics for the candlesticks:  
- **High:** Top of the green candlestick’s wick (highest price of the period).  
- **Open:** Top edge of the green candlestick’s body (price at the start of the period).  
- **Close:** Bottom edge of the red candlestick’s body (price at the end of the period).  
- **Low:** Bottom of the red candlestick’s wick (lowest price of the period).  


### 3. **Grid Background**
The light gray grid (horizontal/vertical lines) provides a reference for price levels and time intervals, helping traders visually compare candlestick sizes and price movements.  


### 4. **TradingView Context (Implicit UI Elements)**
While not visible in the cropped image, a full TradingView interface would include:  
- **Timeframe Selector:** Buttons (e.g., 1m, 5m, 1h, 1d) to adjust the candlestick period.  
- **Symbol Search:** Field to enter the asset (e.g., “AAPL,” “BTC/USD”).  
- **Indicators/Overlays:** Tools to add moving averages, Bollinger Bands, etc.  
- **Drawing Tools:** Pen, Fibonacci retracement, trendline tools for technical analysis.  
- **Order Buttons:** “Buy”/“Sell” (for live trading) or “Long”/“Short” (for CFDs).  


### Purpose of the Chart
This candlestick chart is used to analyze **price action**, identify trends (bullish/bearish), and make trading decisions. For example:  
- A green candlestick signals buying pressure (close > open).  
- A red candlestick signals selling pressure (close < open).  
- The wicks (high/low) show volatility (price range traded during the period).  


In summary, the image simplifies TradingView’s core candlestick chart to highlight how price data (open, high, low, close) is visualized—foundational for technical analysis in trading.

---

### Изображение 3

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43551863672/original/SrHbxXESSBG98_5Cf0u16trAkkV32NjuuA.png?1744373162

**Описание:**

This image shows a **TradingView** interface with two main panels: a **chart view** (left) displaying AT&T Inc. stock data and a **stock screener** (right) showing a list of U.S. stocks hitting new highs. Here's a detailed breakdown:


### **Left Panel: Chart View (AT&T Inc. Stock Chart)**
This panel displays a **1-month (1M) candlestick chart** for AT&T Inc. (NYSE: T), with the following elements:

#### **Top Bar (Chart Header)**
- **Symbol & Exchange**: \

---

### Изображение 4

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43551864663/original/3_MBZakeXcOTIdl3MB2EnNMdnXn-xoRJMQ.png?1744373454

**Описание:**

This image shows the **TradingView Stock Screener interface** displaying a list of US stocks with their key metrics. Here's a detailed breakdown:


### **Top Navigation Bar**
- **TradingView Logo**: Left-aligned, the platform's brand identifier.
- **Search Bar**: Labeled \

---

### Изображение 5

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43551864740/original/0CYmG6fQwyscexbXBw6WjpN8qCW0ow9usw.png?1744373476

**Описание:**

This image shows the **TradingView Stock Screener interface** in the \

---

