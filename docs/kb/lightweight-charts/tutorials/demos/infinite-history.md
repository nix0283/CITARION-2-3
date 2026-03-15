# Infinite history

---
source_url: https://tradingview.github.io/lightweight-charts/tutorials/demos/infinite-history
description: An example of how to load historical data on demand
---

# Infinite history
This sample showcases the capability of Lightweight Charts™ to manage and display
an ever-expanding dataset, resembling a live feed that loads older data when the
user scrolls back in time. The example depicts a chart that initially loads a
limited amount of data, but later fetches additional data as required.
Key to this functionality is the
[`subscribeVisibleLogicalRangeChange`](/lightweight-charts/docs/api/interfaces/ITimeScaleApi#subscribevisiblelogicalrangechange)
method. This function is triggered when the visible data range changes, in this
case, when the user scrolls beyond the initially loaded data.
By checking if the amount of unseen data on the left of the screen falls below a
certain threshold (in this example, 10 units), it's determined whether
additional data needs to be loaded. New data is appended through a simulated
delay using `setTimeout`.
This kind of infinite history functionality is typical of financial charts which
frequently handle large and continuously expanding datasets.

## Code Example

```javascript
const container = document.getElementById('container');
/** @type {import('lightweight-charts').IChartApi} */
const chart = createChart(container, chartOptions);

const series = chart.addSeries(CandlestickSeries, {
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
});

const datafeed = new Datafeed();

series.setData(datafeed.getBars(200));

chart.timeScale().subscribeVisibleLogicalRangeChange(logicalRange => {
    if (logicalRange.from < 10) {
        // load more data
        const numberBarsToLoad = 50 - logicalRange.from;
        const data = datafeed.getBars(numberBarsToLoad);
        setTimeout(() => {
            series.setData(data);
        }, 250); // add a loading delay
    }
});
```

## Image Descriptions

### Infinite History Candlestick Chart

The chart visualization is a candlestick chart typical for financial data, demonstrating dynamic data loading as users scroll back in time.

**Chart Area & Background:**
The chart occupies the lower portion of the content area, with a **white background** and a subtle **light gray grid** (horizontal and vertical lines) for reference.

**Axes:**
- **Vertical (Y) Axis**: Positioned on the right side of the chart. Labeled with numerical values: 100.00, 120.00, 140.00, 160.00, 180.00 (ascending from bottom to top). Values are formatted with two decimal places, indicating price measurements.
- **Horizontal (X) Axis**: Represents time (consistent with financial chart conventions).

**Candlestick Patterns:**
- Each candlestick has a "body" (thicker central rectangle) and "wicks" (thin lines extending above/below the body).
- **Green (or teal) candles**: Represent periods where the closing price is higher than the opening price (bullish).
- **Red candles**: Represent periods where the closing price is lower than the opening price (bearish).
- The candles show price fluctuations over time, with visible upward and downward movements.

**Visual Style:**
- The chart uses a clean, minimalistic design.
- Subtle grid lines (light gray) to aid in reading values.
- No additional decorative elements within the chart area.

**Key Feature:**
This chart demonstrates "infinite history" functionality, where data loads dynamically as the user scrolls left, simulating a live financial feed with expanding datasets.

## Live Demo

The live demo of this example is available at: [View Demo](https://tradingview.github.io/lightweight-charts/tutorials/demos/infinite-history)
