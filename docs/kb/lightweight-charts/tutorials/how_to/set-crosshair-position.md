# Set crosshair position

---
source_url: https://tradingview.github.io/lightweight-charts/tutorials/how_to/set-crosshair-position
---

# Set crosshair positionLightweight Charts™ allows the crosshair position to be set programatically using the [`setCrosshairPosition`](/lightweight-charts/docs/api/interfaces/IChartApi#setcrosshairposition), and cleared using [`clearCrosshairPosition`](/lightweight-charts/docs/api/interfaces/IChartApi#clearcrosshairposition).
Usually the crosshair position is set automatically by the user's actions. However in some cases you may want to set it explicitly. For example if you want to synchronise the crosshairs of two separate charts.

## Image Descriptions

### Crosshair Syncing - Two Charts
Two vertically stacked charts demonstrating synchronized crosshair positions. The chart features:
- **Top Chart (Red Theme)**:
  - **Chart Type**: Line series with red solid line
  - **Background**: Light pink (#FFF5F5)
  - **Y-Axis**: Scale showing values from 0 to 500
  - **Crosshair**: Vertical red dashed line at the current mouse position
  - **Data Pattern**: Upward trend from 0 to 500
- **Bottom Chart (Blue Theme)**:
  - **Chart Type**: Line series with blue solid line
  - **Background**: Light blue (#F5F5FF)
  - **Y-Axis**: Scale showing values from 100 to 600
  - **Crosshair**: Synchronized vertical line matching top chart position
  - **Data Pattern**: Parallel upward trend from 100 to 600
- **Purpose**: Demonstrates how to programmatically set crosshair position to synchronize multiple charts
- **Key Concept**: When hovering over one chart, the crosshair position is automatically synced to the other chart using `setCrosshairPosition` API

### Mobile Touch Tracking
A single chart demonstrating crosshair tracking on mobile without long-press. The chart features:
- **Chart Type**: Line series
- **Data Pattern**: Upward trend
- **Crosshair**: Follows finger touch position
- **Purpose**: Shows how to enable tracking mode on mobile devices without requiring long-press gesture

## Syncing two charts[​](#syncing-two-charts)Show all code
```
// Lightweight Charts™ Example: Crosshair syncing
// https://tradingview.github.io/lightweight-charts/tutorials/how_to/set-crosshair-position
function generateData(startValue, startDate) {
const res = [];
const time = startDate ?? (new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0)));
for (let i = 0; i < 500; ++i) {
res.push({
time: time.getTime() / 1000,
value: i + startValue,
});
time.setUTCDate(time.getUTCDate() + 1);
}
return res;
}
const chart1 = createChart(
document.getElementById('container'),
{
height: 250,
crosshair: {
mode: 0,
},
timeScale: {
visible: false,
},
layout: {
background: {
type: 'solid',
color: '#FFF5F5',
},
},
}
);
const mainSeries1 = chart1.addSeries(LineSeries, {
color: 'red',
});
mainSeries1.setData(generateData(0));
const chart2 = createChart(
document.getElementById('container'),
{
height: 250,
layout: {
background: {
type: 'solid',
color: '#F5F5FF',
},
},
}
);
const mainSeries2 = chart2.addSeries(LineSeries, {
color: 'blue',
});
mainSeries2.setData(generateData(100));
chart1.timeScale().subscribeVisibleLogicalRangeChange(timeRange => {
chart2.timeScale().setVisibleLogicalRange(timeRange);
});
chart2.timeScale().subscribeVisibleLogicalRangeChange(timeRange => {
chart1.timeScale().setVisibleLogicalRange(timeRange);
});
function getCrosshairDataPoint(series, param) {
if (!param.time) {
return null;
}
const dataPoint = param.seriesData.get(series);
return dataPoint || null;
}
function syncCrosshair(chart, series, dataPoint) {
if (dataPoint) {
chart.setCrosshairPosition(dataPoint.value, dataPoint.time, series);
return;
}
chart.clearCrosshairPosition();
}
chart1.subscribeCrosshairMove(param => {
const dataPoint = getCrosshairDataPoint(mainSeries1, param);
syncCrosshair(chart2, mainSeries2, dataPoint);
});
chart2.subscribeCrosshairMove(param => {
const dataPoint = getCrosshairDataPoint(mainSeries2, param);
syncCrosshair(chart1, mainSeries1, dataPoint);
});
```
## Tracking without long-press (on mobile)[​](#tracking-without-long-press-on-mobile)If scrolling and scaling is disabled, then the API can be used to enable a kind of tracking mode without the user having to long-press the screen.
Show all code
```
// Lightweight Charts™ Example: Crosshair syncing
// https://tradingview.github.io/lightweight-charts/tutorials/how_to/set-crosshair-position
function generateData() {
const res = [];
const time = new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0));
for (let i = 0; i < 500; ++i) {
res.push({
time: time.getTime() / 1000,
value: i,
});
time.setUTCDate(time.getUTCDate() + 1);
}
return res;
}
const chart = createChart(
document.getElementById('container'),
{
handleScale: false,
handleScroll: false,
}
);
const mainSeries = chart.addSeries({
priceFormat: {
minMove: 1,
precision: 0,
},
});
mainSeries.setData(generateData());
chart.timeScale().fitContent();
document.getElementById('container').addEventListener('touchmove', e => {
const bcr = document.getElementById('container').getBoundingClientRect();
const x = bcr.left + e.touches[0].clientX;
const y = bcr.top + e.touches[0].clientY;
const price = mainSeries.coordinateToPrice(y);
const time = chart.timeScale().coordinateToTime(x);
if (!Number.isFinite(price) || !Number.isFinite(time)) {
return;
}
chart.setCrosshairPosition(price, time, mainSeries);
});
document.getElementById('container').addEventListener('touchend', () => {
chart.clearCrosshairPosition();
});
```
