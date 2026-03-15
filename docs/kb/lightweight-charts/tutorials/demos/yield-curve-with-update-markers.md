# Yield Curve Chart with Update Markers

---
source_url: https://tradingview.github.io/lightweight-charts/tutorials/demos/yield-curve-with-update-markers
description: An example of a yield curve chart with real-time updates using markers
---

# Yield Curve Chart with Update Markers
This sample demonstrates how to create a yield curve chart with real-time
updates using Lightweight Charts™. The chart displays two
[yield curves](/lightweight-charts/docs/next/chart-types#yield-curve-chart) and utilizes the
[UpDownMarkersPrimitive](/lightweight-charts/docs/next/api/functions/createUpDownMarkers) plugin
to show price change markers for updates.
The chart is initialized with historical yield curve data for two series. By
using the `setInterval` function, we simulate real-time updates to the first
curve. These updates are applied using the `update` method provided by the
UpDownMarkersPrimitive, which automatically handles the creation and display of
markers for price changes.
Key features of this demo:
- Yield curve chart configuration with custom time range settings.
- Two line series representing different yield curves.
- Usage of the UpDownMarkersPrimitive plugin for displaying update markers.
- Simulated real-time updates to demonstrate dynamic data handling.
The UpDownMarkersPrimitive is attached to the first series when created using
`priceChangeMarkers = createUpDownMarkers(series1)`. We then use
`priceChangeMarkers.setData(curve1)` to initialize the data and
`priceChangeMarkers.update(...)` for subsequent updates. This approach allows
the primitive to manage both the series data and the markers, providing a
seamless way to visualize price changes.

## Code Example

```javascript
const chartOptions = {
    autoSize: true,
    layout: {
        textColor: 'black',
        background: { type: 'solid', color: 'white' },
    },
    yieldCurve: {
        baseResolution: 12,
        minimumTimeRange: 10,
        startTimeRange: 3,
    },
    handleScroll: false,
    handleScale: false,
    grid: {
        vertLines: {
            visible: false,
        },
        horzLines: {
            visible: false,
        },
    },
    timeScale: {
        minBarSpacing: 3,
    },
};

const container = document.getElementById('container');
const chart = createYieldCurveChart(container, chartOptions);

const series1 = chart.addSeries(LineSeries, {
    lineType: 2,
    color: '#26c6da',
    pointMarkersVisible: true,
    lineWidth: 2,
});
const priceChangeMarkers = createUpDownMarkers(series1);
priceChangeMarkers.setData(curve1);

const series2 = chart.addSeries(LineSeries, {
    lineType: 2,
    color: 'rgb(164, 89, 209)',
    pointMarkersVisible: true,
    lineWidth: 1,
});
series2.setData(curve2);

chart.timeScale().fitContent();

chart.timeScale().subscribeSizeChange(() => {
    chart.timeScale().fitContent();
});

setInterval(() => {
    curve1
        .filter(() => Math.random() < 0.1)
        .forEach(data => {
            const shift = (Math.random() > 0.5 ? -1 : 1) * Math.random() * 0.01 * data.value;
            priceChangeMarkers.update(
                {
                    ...data,
                    value: data.value + shift,
                },
                true
            );
        });
}, 5000);
```

## Image Descriptions

### Yield Curve Chart with Update Markers

The chart visualization is a yield curve chart displaying two line series with real-time update markers, demonstrating the UpDownMarkersPrimitive plugin.

**Chart Area & Background:**
- The chart has a **white background** with grid lines disabled (both vertical and horizontal lines are invisible).
- The layout is configured for yield curve display with custom time range settings.

**Axes:**
- **X-Axis (Time)**: Represents maturity points along the yield curve, with custom time range settings (baseResolution: 12, minimumTimeRange: 10, startTimeRange: 3).
- **Y-Axis (Value)**: Represents yield percentages or rates.

**Data Series (Two Line Series):**
1. **Series 1 (Cyan Line)**: 
   - Color: #26c6da (cyan/teal)
   - Line width: 2 pixels
   - Point markers visible
   - Uses lineType: 2 (curved line)
   - Attached to UpDownMarkersPrimitive for price change visualization

2. **Series 2 (Purple Line)**:
   - Color: rgb(164, 89, 209) (purple)
   - Line width: 1 pixel
   - Point markers visible
   - Uses lineType: 2 (curved line)

**Update Markers:**
- The UpDownMarkersPrimitive plugin displays markers indicating price changes.
- Markers show up/down triangles or indicators when the curve updates.
- Simulated real-time updates occur every 5 seconds with random value shifts.

**Special Features:**
- Scrolling and scaling are disabled (handleScroll: false, handleScale: false)
- The chart automatically fits content on size changes
- Yield curve configuration with specific base resolution settings

## Live Demo

The live demo of this example is available at: [View Demo](https://tradingview.github.io/lightweight-charts/tutorials/demos/yield-curve-with-update-markers)
