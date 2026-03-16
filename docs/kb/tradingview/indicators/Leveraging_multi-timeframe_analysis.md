# Leveraging multi-timeframe analysis

**URL:** https://www.tradingview.com/support/solutions/43000591555-leveraging-multi-timeframe-analysis/

---

- [ Help Center ](/)
- / 
- / Indicators 
- / [ How-to's and FAQ on Indicators ](/support/folders/43000547458-how-to-s-and-faq-on-indicators/)
- / [ Leveraging multi-timeframe analysis ](/support/solutions/43000591555-leveraging-multi-timeframe-analysis/)

# Leveraging multi-timeframe analysis 
 Multi-timeframe analysis (MTF) is a feature of [Supercharts](https://www.tradingview.com/chart/). With it, you can view the same ticker or indicator on a higher timeframe than the chart’s to see the price action within a broader, long-term perspective.

 Many of our built-in indicators come with MTF functionality. When they do, the script's "Settings/Inputs" tab will contain the "Calculation" section with a "Timeframe" dropdown, from where you can select the timeframe that you want this particular indicator to be calculated on. This allows you to look at, for example, a 1h chart and see the daily moving average at the same time.

The indicator's timeframe should ideally be higher than the chart's, to provide a broader perspective. Using timeframes lower than the chart's will produce fragmentary results, because for each bar on the chart, there will be several bars from the indicator's timeframe, and only the last intrabar's value will be displayed (multiple values cannot be displayed for a single chart bar).

If you want to add new timeframes to the "Timeframe" dropdown, you can do this by adding them to the main "Time Interval" dropdown menu available on the chart page. The list of custom timeframes is shared between the two menus.

The "Wait for timeframe closes" option specifies the behavior when the indicator's timeframe is higher than the chart's. When "Wait for timeframe closes" is checked, higher timeframe values only come in and are interconnected on the chart when the higher timeframe completes.

For example, an indicator with "1 hour" as its timeframe displayed on a minute chart will only return a value once in 60 bars, i.e., when the hourly bar closes and the value is confirmed. This has the advantage of avoiding repainting in real-time. The values will be visually connected by a line, but no data will be actually present between them.

If 'Wait for timeframe closes' is unchecked, historical gaps are filled with the last returned value. On real-time bars, the last available value will be returned on every tick, allowing you to track the real-time development of the indicator's values. With this setting enabled, the indicator will produce non-repainting values on historical bars, but repainting values in real time.

Also read:

- [Getting started with Supercharts](https://www.tradingview.com/support/solutions/43000746464-getting-started-with-supercharts/)
- [Introduction to TradingView alerts](https://www.tradingview.com/support/solutions/43000520149-introduction-to-tradingview-alerts/)
- [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/)
- [TradingView screeners walkthrough](https://www.tradingview.com/support/solutions/43000718885-tradingview-screeners-walkthrough/)
- [Master the Options Strategy Builder](https://www.tradingview.com/support/solutions/43000707214-master-the-options-strategy-builder/)
 Previous Previous I'd like to know more about The Commitments of Traders (COT) reports Next Next I see a "Smoothing" section in an indicator's settings. What does it do? Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582421103/original/QKMxxvS54X6GjM8OzM1H8_aM-TrRjm4YdA.png?1758715540

**Описание:**

This image shows a **TradingView chart interface** displaying the **BTC/USD (Bitcoin/U.S. Dollar)** pair on the **Bitstamp** exchange, with a **30-minute (30m)** timeframe. The chart features **candlestick patterns** (red/green) representing price action, overlaid with a **blue Simple Moving Average (SMA)** line. A modal window for configuring the SMA indicator is open, with the \

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43582421168/original/9dNDmupzm1jo7FWJwbHr_CO96YOwKs2_5A.png?1758715561

**Описание:**

This image shows a **TradingView chart interface** displaying Apple Inc. (NASDAQ: AAPL) stock data with a **30-minute candlestick chart**. The interface is actively showing a dropdown menu for selecting time intervals, with a red arrow highlighting the current selection. Here’s a detailed breakdown of all elements:


### **Top Navigation Bar**
- **Left Side**:  
  - **\

---

