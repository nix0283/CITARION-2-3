# Compare multiple series

---
source_url: https://tradingview.github.io/lightweight-charts/tutorials/demos/compare-multiple-series
description: An example of how to compare multiple series on a single price scale
---

# Compare multiple series
This Multi-Series Comparison Example illustrates how an assortment of data
series can be integrated into a single chart for comparisons. Simply use the
charting API `addSeries` to create multiple series.
If you would like an unique price scales for each individual series,
particularly when dealing with data series with divergent value ranges, then
take a look at the [Two Price Scales Example](/lightweight-charts/tutorials/how_to/two-price-scales).

## Code Example

```javascript
const chartOptions = {
    layout: {
        textColor: 'black',
        background: { type: 'solid', color: 'white' },
    },
};
/** @type {import('lightweight-charts').IChartApi} */
const chart = createChart(document.getElementById('container'), chartOptions);

const lineSeriesOne = chart.addSeries(LineSeries, { color: '#2962FF' });

const lineSeriesTwo = chart.addSeries(LineSeries, { color: 'rgb(225, 87, 90)' });

const lineSeriesThree = chart.addSeries(LineSeries, { color: 'rgb(242, 142, 44)' });

const lineSeriesOneData = generateLineData();
const lineSeriesTwoData = generateLineData();
const lineSeriesThreeData = generateLineData();

lineSeriesOne.setData(lineSeriesOneData);
lineSeriesTwo.setData(lineSeriesTwoData);
lineSeriesThree.setData(lineSeriesThreeData);

chart.timeScale().fitContent();
```

## Image Descriptions

### Compare Multiple Series Line Chart

The chart visualization is a line graph titled "Compare multiple series" that displays three distinct data series over a time period.

**Axes & Scale:**
- **X-Axis (Horizontal)**: Represents time, with major ticks at "18" (leftmost), "Apr", "Jul", "Oct", "2019", and "Apr" (rightmost). The axis is labeled with months/years to indicate time progression.
- **Y-Axis (Vertical, Right-hand Side)**: A linear scale ranging from "0.00" (bottom) to "1200.00" (top), with intermediate ticks at "200.00", "400.00", "600.00", "800.00", "1000.00".

**Data Series (Lines):**
Three lines, each with a unique color and associated value labels:
1. **Blue Line**: Bright blue solid line with a smooth, wavy trajectory. Value Label: "436.86" (displayed in a blue-colored box at the right-hand side).
2. **Red Line**: Vibrant red solid line with a more volatile, fluctuating path. Value Label: "699.09" (displayed in a red-colored box).
3. **Orange Line**: Warm orange solid line with moderate fluctuations. Value Label: "204.22" (displayed in an orange-colored box).

**Grid & Background:**
- **Grid Lines**: Light gray, horizontal and vertical grid lines overlay the chart area.
- **Background**: White, ensuring the lines and text stand out clearly.

**Additional Visual Elements:**
- **Value Labels**: Colored boxes (matching the line colors) at the right-hand edge display the final value of each series.
- **Chart Area Boundaries**: A thin, light gray border outlines the chart.

## Live Demo

The live demo of this example is available at: [View Demo](https://tradingview.github.io/lightweight-charts/tutorials/demos/compare-multiple-series)
