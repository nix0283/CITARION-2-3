# Chart types | Lightweight Charts

---

Chart types | Lightweight Charts[Skip to main content](#__docusaurus_skipToContent_fallback)

Version: 5.1On this page

Lightweight Charts offers different types of charts to suit various data visualization needs. This article provides an overview of the available chart types and how to create them.

## Standard Time-based Chart[​](#standard-time-based-chart)

The standard time-based chart is the most common type, suitable for displaying time series data.

- **Creation method**: [`createChart`](/lightweight-charts/docs/api/functions/createChart)

- **Horizontal scale**: Time-based

- **Use case**: General-purpose charting for financial and time series data

```
import { createChart } from 'lightweight-charts';

const chart = createChart(document.getElementById('container'), options);

```

This chart type uses time values for the horizontal scale and is ideal for most financial and time series data visualizations.

```
const chartOptions = { layout: { textColor: 'black', background: { type: 'solid', color: 'white' } } };
const chart = createChart(document.getElementById('container'), chartOptions);
const areaSeries = chart.addSeries(AreaSeries, { lineColor: '#2962FF', topColor: '#2962FF', bottomColor: 'rgba(41, 98, 255, 0.28)' });

const data = [{ value: 0, time: 1642425322 }, { value: 8, time: 1642511722 }, { value: 10, time: 1642598122 }, { value: 20, time: 1642684522 }, { value: 3, time: 1642770922 }, { value: 43, time: 1642857322 }, { value: 41, time: 1642943722 }, { value: 43, time: 1643030122 }, { value: 56, time: 1643116522 }, { value: 46, time: 1643202922 }];

areaSeries.setData(data);

chart.timeScale().fitContent();

```

## Yield Curve Chart[​](#yield-curve-chart)

The yield curve chart is specifically designed for displaying yield curves, common in financial analysis.

- **Creation method**: [`createYieldCurveChart`](/lightweight-charts/docs/api/functions/createYieldCurveChart)

- **Horizontal scale**: Linearly spaced, defined in monthly time duration units

**Key differences**:

- Whitespace is ignored for crosshair and grid lines

- Specialized for yield curve representation

```
import { createYieldCurveChart } from 'lightweight-charts';

const chart = createYieldCurveChart(document.getElementById('container'), options);

```

Use this chart type when you need to visualize yield curves or similar financial data where the horizontal scale represents time durations rather than specific dates.

tip
If you want to spread out the beginning of the plot further and don't need a linear time scale, you can enforce a minimum spacing around each point by increasing the [`minBarSpacing`](/lightweight-charts/docs/api/interfaces/TimeScaleOptions#minbarspacing) option in the TimeScaleOptions. To prevent the rest of the chart from spreading too wide, adjust the `baseResolution` to a larger number, such as `12` (months).

```
const chartOptions = {
 layout: { textColor: 'black', background: { type: 'solid', color: 'white' } },
 yieldCurve: { baseResolution: 1, minimumTimeRange: 10, startTimeRange: 3 },
 handleScroll: false, handleScale: false,
};

const chart = createYieldCurveChart(document.getElementById('container'), chartOptions);
const lineSeries = chart.addSeries(LineSeries, { color: '#2962FF' });

const curve = [{ time: 1, value: 5.378 }, { time: 2, value: 5.372 }, { time: 3, value: 5.271 }, { time: 6, value: 5.094 }, { time: 12, value: 4.739 }, { time: 24, value: 4.237 }, { time: 36, value: 4.036 }, { time: 60, value: 3.887 }, { time: 84, value: 3.921 }, { time: 120, value: 4.007 }, { time: 240, value: 4.366 }, { time: 360, value: 4.290 }];

lineSeries.setData(curve);

chart.timeScale().fitContent();

```

## Options Chart (Price-based)[​](#options-chart-price-based)

The options chart is a specialized type that uses price values on the horizontal scale instead of time.

- **Creation method**: [`createOptionsChart`](/lightweight-charts/docs/api/functions/createOptionsChart)

- **Horizontal scale**: Price-based (numeric)

- **Use case**: Visualizing option chains, price distributions, or any data where price is the primary x-axis metric

```
import { createOptionsChart } from 'lightweight-charts';

const chart = createOptionsChart(document.getElementById('container'), options);

```

This chart type is particularly useful for financial instruments like options, where the price is a more relevant x-axis metric than time.

```
const chartOptions = {
 layout: { textColor: 'black', background: { type: 'solid', color: 'white' } },
};

const chart = createOptionsChart(document.getElementById('container'), chartOptions);
const lineSeries = chart.addSeries(LineSeries, { color: '#2962FF' });

const data = [];
for (let i = 0; i < 1000; i++) {
 data.push({
 time: i * 0.25,
 value: Math.sin(i / 100) + i / 500,
 });
}

lineSeries.setData(data);

chart.timeScale().fitContent();

```

## Custom Horizontal Scale Chart[​](#custom-horizontal-scale-chart)

For advanced use cases, Lightweight Charts allows creating charts with custom horizontal scale behavior.

- **Creation method**: [`createChartEx`](/lightweight-charts/docs/api/functions/createChartEx)

- **Horizontal scale**: Custom-defined

- **Use case**: Specialized charting needs with non-standard horizontal scales

```
import { createChartEx, defaultHorzScaleBehavior } from 'lightweight-charts';

const customBehavior = new (defaultHorzScaleBehavior())();
// Customize the behavior as needed

const chart = createChartEx(document.getElementById('container'), customBehavior, options);

```

This method provides the flexibility to define custom horizontal scale behavior, allowing for unique and specialized chart types.

## Choosing the Right Chart Type[​](#choosing-the-right-chart-type)

- Use `createChart` for most standard time-based charting needs.

- Choose `createYieldCurveChart` when working specifically with yield curves or similar financial data.

- Opt for `createOptionsChart` when you need to visualize data with price as the primary horizontal axis, such as option chains.

- Use `createChartEx` when you need a custom horizontal scale behavior that differs from the standard time-based or price-based scales.

Each chart type provides specific functionality and is optimized for different use cases. Consider your data structure and visualization requirements when selecting the appropriate chart type for your application.

- [Standard Time-based Chart](#standard-time-based-chart)
- [Yield Curve Chart](#yield-curve-chart)
- [Options Chart (Price-based)](#options-chart-price-based)
- [Custom Horizontal Scale Chart](#custom-horizontal-scale-chart)
- [Choosing the Right Chart Type](#choosing-the-right-chart-type)

## Image Descriptions

This section provides detailed visual descriptions of the chart visualizations displayed on the original documentation page.

### Standard Time-based Chart Visualization

**Chart Type**: Area chart with line overlay

**Colors**:
- Area fill: Blue gradient from `#2962FF` (top) to `rgba(41, 98, 255, 0.28)` (bottom)
- Line color: Solid blue `#2962FF`
- Background: White
- Grid lines: Light gray

**Axes**:
- X-axis (Horizontal): Time-based scale with values 17, 19, 21, 23, 25 (representing time periods)
- Y-axis (Vertical): Numeric scale from 0.00 to 60.00 with intervals at 20.00 and 40.00

**Visual Elements**:
- Smooth curved line connecting data points
- Gradient-filled area between the line and the x-axis
- Light gray horizontal and vertical grid lines
- Value label "46.00" visible at a peak point
- Data pattern shows fluctuating values with an overall upward trend toward the end

**Data Pattern**: The chart displays time series data with values ranging from approximately 0 to 56, showing multiple peaks and troughs. The area fill creates a visual emphasis on the magnitude of values over time.

---

### Yield Curve Chart Visualization

**Chart Type**: Line chart (specialized for yield curves)

**Colors**:
- Line color: Solid blue `#2962FF`
- Background: White
- Grid lines: Light gray

**Axes**:
- X-axis (Horizontal): Time duration labels (1Y, 5Y, 10Y, 20Y, 30Y) representing years
- Y-axis (Vertical): Percentage scale from 4.000% to 5.500% with intervals at 4.500% and 5.000%

**Visual Elements**:
- Smooth blue line connecting yield data points
- Light gray horizontal and vertical grid lines
- Linearly spaced horizontal scale based on time duration

**Data Pattern**: The chart displays a typical yield curve shape characteristic of bond markets:
- Starts high at short durations (around 5.3%)
- Steeply declines through medium durations
- Reaches a minimum around 10-20 years
- Gradually rises at longer durations (30Y)
- The curve shows the relationship between interest rates and time to maturity

**Special Features**: This chart type is specifically designed for yield curve visualization where whitespace is ignored for crosshair and grid lines, and the horizontal scale represents time durations rather than specific dates.

---

### Options Chart (Price-based) Visualization

**Chart Type**: Line chart with price-based horizontal scale

**Colors**:
- Line color: Solid blue `#2962FF`
- Background: White
- Grid lines: Light gray

**Axes**:
- X-axis (Horizontal): Price/numeric scale with values 50, 100, 150, 200, 240
- Y-axis (Vertical): Numeric scale from 0.00 to 3.00 with intervals at 1.00 and 2.00

**Visual Elements**:
- Smooth blue curve with a sinusoidal wave pattern
- Light gray horizontal and vertical grid lines
- Value label "1.46" visible on the right side

**Data Pattern**: The chart displays a wave-like pattern generated by a mathematical function (sin(x/100) + x/500), demonstrating how the chart handles price-based data on the horizontal axis. This visualization is particularly useful for:
- Option chain visualization
- Price distribution analysis
- Any data where price is the primary horizontal axis metric

**Special Features**: Unlike standard time-based charts, this chart uses price values on the horizontal scale, making it ideal for financial instruments like options where price is a more relevant metric than time.

---

### Custom Horizontal Scale Chart

**Note**: The original documentation page does not display a specific visualization example for the Custom Horizontal Scale Chart. This chart type is described conceptually as a flexible option for advanced use cases requiring non-standard horizontal scale behavior.

**Intended Use**: This chart type would display similar line-based visualizations but with a custom-defined horizontal scale tailored to specific application requirements. The visual appearance would depend on the custom scale implementation defined by the developer.

---

### Design Consistency

All chart visualizations in the Lightweight Charts library maintain consistent styling:
- **Primary color**: Blue (`#2962FF`) for lines and highlights
- **Background**: White (`#FFFFFF`)
- **Grid lines**: Light gray for subtle visual guidance
- **Typography**: Clean sans-serif fonts for axis labels
- **Layout**: Generous padding and spacing for readability

The visual design follows the TradingView design language, emphasizing clarity, professionalism, and ease of data interpretation for financial applications.