# Whitespace data

---
source_url: https://tradingview.github.io/lightweight-charts/tutorials/demos/whitespace
description: An example of how to provide whitespace data
---

# Whitespace data
This sample demonstrates the usage of "whitespace data" in Lightweight Charts™.
Rather than a complete set of pricing information, these data points only
provide a timestamp. This generates a gap or "whitespace" on the chart,
signifying periods without trading. An example in the code is `{time: { year: 2018, month: 9, day: 24 }}`, which results in a visual break in the candlestick
series.
API Reference[​](#api-reference)
- [WhitespaceData](/lightweight-charts/docs/api/interfaces/WhitespaceData)
- [API Reference](#api-reference)

## Code Example

```javascript
const container = document.getElementById('container');
/** @type {import('lightweight-charts').IChartApi} */
const chart = createChart(container, chartOptions);

const candlestickSeries = chart.addSeries(CandlestickSeries, {
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
});

candlestickSeries.setData([
    {
        close: 108.9974612905403,
        high: 121.20998259466148,
        low: 96.65376292551082,
        open: 104.5614412226746,
        time: { year: 2018, month: 9, day: 22 },
    },
    {
        close: 110.46815600023501,
        high: 111.3650273696516,
        low: 82.65543461471314,
        open: 110.16538466099634,
        time: { year: 2018, month: 9, day: 23 },
    },
    // highlight-start
    {
        // Whitespace data, only time is provided
        time: { year: 2018, month: 9, day: 24 },
    },
    // highlight-end
    {
        close: 96.80120024431532,
        high: 101.92074283374939,
        low: 89.25819769856513,
        open: 89.25819769856513,
        time: { year: 2018, month: 9, day: 25 },
    },
    
]);

chart.timeScale().fitContent();
```

## Image Descriptions

### Whitespace Data Candlestick Chart

The chart visualization is a candlestick chart displaying financial price data over time, with the following detailed elements:

**Axes & Time Scale:**
- **X-axis (Horizontal)**: Represents time, labeled with months and specific dates (Oct, 15, Nov, 15, Dec, 15, 29). The scale progresses from October to late December, with grid lines aligning to these date markers.
- **Y-axis (Vertical)**: Represents price, with values ranging from 20.00 to 140.00 (increments of 20.00). A teal-colored value label ("71.01") is positioned near the bottom-right, indicating the current price.

**Candlestick Elements:**
- Each candlestick consists of a vertical "body" (thick line) and "wicks" (thin lines extending above/below the body).
- **Green candles**: Indicate price increases (closing price > opening price).
- **Red candles**: Indicate price decreases (closing price < opening price).
- **Whitespace Gaps**: Visible breaks in the candlestick series represent periods with no trading data, demonstrating the "whitespace data" concept.

**Grid & Background:**
- **Grid Lines**: Light gray, dashed horizontal and vertical lines overlay the chart.
- **Background**: White, with the chart area enclosed in a subtle border.

## Live Demo

The live demo of this example is available at: [View Demo](https://tradingview.github.io/lightweight-charts/tutorials/demos/whitespace)
