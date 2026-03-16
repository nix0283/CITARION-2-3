# Realtime updates

---
source_url: https://tradingview.github.io/lightweight-charts/tutorials/demos/realtime-updates
description: An example of how to handle realtime updates
---

# Realtime updates
This sample demonstrates how to mimic real-time updates on a candlestick chart
with Lightweight Charts™. The chart initially populates with some historical
data. By using `setInterval` function, the chart then begins to receive
simulated real-time updates with the usage of `series.update(...)`.
Each real-time update represents a new data point or modifies the latest point,
providing the illusion of a live, updating chart. If you scroll the chart and
wish to return to the latest data points then you can use the "Go to realtime"
button provided which calls the
[`scrollToRealtime`](/lightweight-charts/docs/api/interfaces/ITimeScaleApi#scrolltorealtime) method
on the timescale.

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

const data = generateData(2500, 20, 1000);

series.setData(data.initialData);
chart.timeScale().fitContent();
chart.timeScale().scrollToPosition(5);

// simulate real-time data
function* getNextRealtimeUpdate(realtimeData) {
    for (const dataPoint of realtimeData) {
        yield dataPoint;
    }
    return null;
}
const streamingDataProvider = getNextRealtimeUpdate(data.realtimeUpdates);

const intervalID = setInterval(() => {
    const update = streamingDataProvider.next();
    if (update.done) {
        clearInterval(intervalID);
        return;
    }
    series.update(update.value);
}, 100);


const button = document.createElement('button');
button.innerText = 'Go to realtime';
button.addEventListener('click', () => chart.timeScale().scrollToRealTime());
buttonsContainer.appendChild(button);

container.appendChild(buttonsContainer);
```

## Image Descriptions

### Realtime Updates Candlestick Chart

The chart visualization is a candlestick chart used for financial/time-series data with the following detailed elements:

**Chart Area & Background:**
The chart occupies the central lower portion of the screen, with a white background and a light gray grid (horizontal and vertical lines) for reference.

**Axes:**
- **X-Axis (Time)**: Displays dates/times (e.g., "16", "23", "Feb", "8", "15", "22") in black text, spaced evenly to represent time progression.
- **Y-Axis (Value)**: Vertical axis on the right, labeled with numerical values: "0.00" (bottom), "2000.00" (middle), and "3907.16" (top, highlighted in a teal box). Values are in black text, with the top value emphasized to show the latest data point.

**Candlestick Patterns:**
- **Green Candles**: Indicate price increases (close > open).
- **Red Candles**: Indicate price decreases (close < open).
- **Wicks/Tails**: Thin vertical lines extending above/below the candle body, showing the high/low prices for the period.

**Visual Elements:**
- **Grid Lines**: Light gray, dashed horizontal/vertical lines for easy value/time comparison.
- **Latest Value Highlight**: A teal-colored box around the top Y-axis value to emphasize the most recent data point.
- **"Go to realtime" Button**: A light gray button below the chart (with black text) to reset the view to the latest data.

**Overall Style:**
The chart uses a clean, minimalistic design with high contrast (black text on white background) for readability, and color (green/red) to quickly convey price direction.

## Live Demo

The live demo of this example is available at: [View Demo](https://tradingview.github.io/lightweight-charts/tutorials/demos/realtime-updates)
