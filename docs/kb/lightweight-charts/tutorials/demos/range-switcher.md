# Range switcher

---
source_url: https://tradingview.github.io/lightweight-charts/tutorials/demos/range-switcher
description: An example of how to switch range (resolution) of the chart
---

# Range switcher
This example illustrates the creation of a range switcher in Lightweight Charts™
that allows for changing the data set displayed based on a selected time range
or interval. Different data sets representing ranges such as daily ('1D'),
weekly ('1W'), monthly ('1M'), and yearly ('1Y') are prepared.
The chart begins with daily data displayed by default. Then, buttons
corresponding to each predefined interval are created. When a user clicks one of
these buttons, the `setChartInterval` function is called with the chosen
interval, swapping the currently displayed data series with the one
corresponding to the chosen interval. Consequently, the viewers can quickly
switch between different timeframes, providing flexible analysis of the data
trends.

## Code Example

```javascript

```

## Image Descriptions

### Range Switcher Line Chart

The chart visualization is a line graph displaying a time-series data trend, part of a "Range switcher" example.

**Chart Area & Background:**
The chart occupies the lower portion of the content area, with a **white background** and a subtle grid (light gray lines) for reference.

**Axes:**
- **X-Axis (Horizontal)**: Represents time, with labeled intervals: "Nov", "2019", "Feb", "Apr", "May". Labels are in dark gray/black color positioned below the chart.
- **Y-Axis (Vertical)**: Represents numerical values, with labels "25.50", "26.00", and a top-right value "26.23" (in blue). Axis labels are dark gray/black and aligned to the right.

**Data Series (Line):**
- A single **blue line** (solid, medium thickness) traces the data trend.
- The line shows fluctuations over time, with peaks and valleys indicating changes in the measured value.

**Data Point & Value Highlight:**
- At the top-right of the chart, a **blue rectangular box** contains the value "26.23", which is the current data point's value.

**Range Switcher Buttons (Below the Chart):**
Four gray rectangular buttons (with rounded corners) are positioned below the chart:
- **"1D"** (daily)
- **"1W"** (weekly)
- **"1M"** (monthly)
- **"1Y"** (yearly)

These buttons allow users to switch between different time ranges for the data displayed in the chart.

## Live Demo

The live demo of this example is available at: [View Demo](https://tradingview.github.io/lightweight-charts/tutorials/demos/range-switcher)
