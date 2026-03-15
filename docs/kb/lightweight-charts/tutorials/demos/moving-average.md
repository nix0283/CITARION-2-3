# Moving average indicator

---
source_url: https://tradingview.github.io/lightweight-charts/tutorials/demos/moving-average
description: An example of how to add a moving average indicator line
---

# Moving average indicator
This example demonstrates the implementation of a moving average (MA) indicator
using Lightweight Charts™. It effectively shows how to overlay a line series
representing the moving average on a candlestick series.
Initial rendering involves the creation of a candlestick series using randomly
generated data. The `calculateMovingAverageSeriesData` function subsequently
computes the 20-period MA data from the candlestick data. For each point, if
less than 20 data points precede it, the function creates a whitespace data
point. If 20 or more data points precede it, it calculates the MA for that
period.
The MA data set forms a line series, which is placed underneath the candlestick
series (by creating the line series first). As a result, users can view the
underlying price data (via the candlestick series) in conjunction with the
moving average trend line which provides valuable analytical insight.

## Code Example

```javascript
/** @type {import('lightweight-charts').IChartApi} */
const chart = createChart(document.getElementById('container'), chartOptions);

const barData = generateCandleData(500);

function calculateMovingAverageSeriesData(candleData, maLength) {
    const maData = [];

    for (let i = 0; i < candleData.length; i++) {
        if (i < maLength) {
            // Provide whitespace data points until the MA can be calculated
            maData.push({ time: candleData[i].time });
        } else {
            // Calculate the moving average, slow but simple way
            let sum = 0;
            for (let j = 0; j < maLength; j++) {
                sum += candleData[i - j].close;
            }
            const maValue = sum / maLength;
            maData.push({ time: candleData[i].time, value: maValue });
        }
    }

    return maData;
}

const maData = calculateMovingAverageSeriesData(barData, 20);

const maSeries = chart.addSeries(LineSeries, { color: '#2962FF', lineWidth: 1 });
maSeries.setData(maData);

const candlestickSeries = chart.addSeries(CandlestickSeries, {
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
});
candlestickSeries.setData(barData);
```

## Image Descriptions

### Moving Average Indicator Chart

The chart visualization is a financial candlestick chart with a moving average (MA) line overlay, designed to demonstrate technical analysis.

**Chart Area & Structure:**
The chart occupies the lower portion of the content area, bounded by a light gray grid background. It features two primary data series: a **candlestick series** (for price action) and a **line series** (for the moving average).

**Axes:**
- **Y-Axis (Price)**: Vertical axis on the right, labeled with numerical values (70.00, 80.00, 90.00, 100.00, 110.00) in black text. Uses a linear scale to represent price levels.
- **X-Axis (Time)**: Horizontal axis representing time periods (e.g., days/hours) for the candlestick data.

**Candlestick Series (Price Action):**
- **Bullish candles** (price increase): Filled with green (or teal) bodies, with wicks in the same green.
- **Bearish candles** (price decrease): Filled with red bodies, with wicks in the same red.
- Each candle shows the open, high, low, and close prices for a time period.

**Moving Average (MA) Line Series:**
- A smooth, continuous blue line overlaying the candlestick series.
- Represents the 20-period moving average, calculated from the candlestick data.
- Positioned "underneath" the candlesticks (rendered first) to allow clear visibility of both price action and trend.

**Color Palette:**
- **Candlesticks**: Green (bullish) and red (bearish) for price direction.
- **MA Line**: Blue (#2962FF) for the trend indicator.
- **Grid/Background**: Light gray/white for clarity.

## Live Demo

The live demo of this example is available at: [View Demo](https://tradingview.github.io/lightweight-charts/tutorials/demos/moving-average)
