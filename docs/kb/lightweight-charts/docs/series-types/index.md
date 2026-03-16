# Series | Lightweight Charts

---

Series | Lightweight Charts[Skip to main content](#__docusaurus_skipToContent_fallback)

Version: 5.1On this page

This article describes supported series types and ways to [customize](#customization) them.

## Supported types[​](#supported-types)

### Area[​](#area)

- **Series Definition**: [`AreaSeries`](/lightweight-charts/docs/api/variables/AreaSeries)

- **Data format**: [`SingleValueData`](/lightweight-charts/docs/api/interfaces/SingleValueData) or [`WhitespaceData`](/lightweight-charts/docs/api/interfaces/WhitespaceData)

- **Style options**: a mix of [`SeriesOptionsCommon`](/lightweight-charts/docs/api/interfaces/SeriesOptionsCommon) and [`AreaStyleOptions`](/lightweight-charts/docs/api/interfaces/AreaStyleOptions)

This series is represented with a colored area between the [time scale](/lightweight-charts/docs/time-scale) and line connecting all data points:

```
const chartOptions = { layout: { textColor: 'black', background: { type: 'solid', color: 'white' } } };
const chart = createChart(document.getElementById('container'), chartOptions);
const areaSeries = chart.addSeries(AreaSeries, { lineColor: '#2962FF', topColor: '#2962FF', bottomColor: 'rgba(41, 98, 255, 0.28)' });

const data = [{ value: 0, time: 1642425322 }, { value: 8, time: 1642511722 }, { value: 10, time: 1642598122 }, { value: 20, time: 1642684522 }, { value: 3, time: 1642770922 }, { value: 43, time: 1642857322 }, { value: 41, time: 1642943722 }, { value: 43, time: 1643030122 }, { value: 56, time: 1643116522 }, { value: 46, time: 1643202922 }];

areaSeries.setData(data);

chart.timeScale().fitContent();

```

 

### Bar[​](#bar)

- **Series Definition**: [`BarSeries`](/lightweight-charts/docs/api/variables/BarSeries)

- **Data format**: [`BarData`](/lightweight-charts/docs/api/interfaces/BarData) or [`WhitespaceData`](/lightweight-charts/docs/api/interfaces/WhitespaceData)

- **Style options**: a mix of [`SeriesOptionsCommon`](/lightweight-charts/docs/api/interfaces/SeriesOptionsCommon) and [`BarStyleOptions`](/lightweight-charts/docs/api/interfaces/BarStyleOptions)

This series illustrates price movements with vertical bars.
The length of each bar corresponds to the range between the highest and lowest price values.
Open and close values are represented with the tick marks on the left and right side of the bar, respectively:

```
const chartOptions = { layout: { textColor: 'black', background: { type: 'solid', color: 'white' } } };
const chart = createChart(document.getElementById('container'), chartOptions);
const barSeries = chart.addSeries(BarSeries, { upColor: '#26a69a', downColor: '#ef5350' });

const data = [
 { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
 { open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 1642514276 },
 { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
 { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
 { open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 1642773476 },
 { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
 { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276 },
 { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676 },
 { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076 },
 { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
 { open: 10.96, high: 11.90, low: 10.80, close: 11.50, time: 1643291876 },
 { open: 11.50, high: 12.00, low: 11.30, close: 11.80, time: 1643378276 },
 { open: 11.80, high: 12.20, low: 11.70, close: 12.00, time: 1643464676 },
 { open: 12.00, high: 12.50, low: 11.90, close: 12.30, time: 1643551076 },
 { open: 12.30, high: 12.80, low: 12.10, close: 12.60, time: 1643637476 },
 { open: 12.60, high: 13.00, low: 12.50, close: 12.90, time: 1643723876 },
 { open: 12.90, high: 13.50, low: 12.70, close: 13.20, time: 1643810276 },
 { open: 13.20, high: 13.70, low: 13.00, close: 13.50, time: 1643896676 },
 { open: 13.50, high: 14.00, low: 13.30, close: 13.80, time: 1643983076 },
 { open: 13.80, high: 14.20, low: 13.60, close: 14.00, time: 1644069476 },
];

barSeries.setData(data);

chart.timeScale().fitContent();

```

 

### Baseline[​](#baseline)

- **Series Definition**: [`BaselineSeries`](/lightweight-charts/docs/api/variables/BaselineSeries)

- **Data format**: [`SingleValueData`](/lightweight-charts/docs/api/interfaces/SingleValueData) or [`WhitespaceData`](/lightweight-charts/docs/api/interfaces/WhitespaceData)

- **Style options**: a mix of [`SeriesOptionsCommon`](/lightweight-charts/docs/api/interfaces/SeriesOptionsCommon) and [`BaselineStyleOptions`](/lightweight-charts/docs/api/interfaces/BaselineStyleOptions)

This series is represented with two colored areas between the [the base value line](/lightweight-charts/docs/api/interfaces/BaselineStyleOptions#basevalue) and line connecting all data points:

```
const chartOptions = { layout: { textColor: 'black', background: { type: 'solid', color: 'white' } } };
const chart = createChart(document.getElementById('container'), chartOptions);
const baselineSeries = chart.addSeries(BaselineSeries, { baseValue: { type: 'price', price: 25 }, topLineColor: 'rgba( 38, 166, 154, 1)', topFillColor1: 'rgba( 38, 166, 154, 0.28)', topFillColor2: 'rgba( 38, 166, 154, 0.05)', bottomLineColor: 'rgba( 239, 83, 80, 1)', bottomFillColor1: 'rgba( 239, 83, 80, 0.05)', bottomFillColor2: 'rgba( 239, 83, 80, 0.28)' });

const data = [{ value: 1, time: 1642425322 }, { value: 8, time: 1642511722 }, { value: 10, time: 1642598122 }, { value: 20, time: 1642684522 }, { value: 3, time: 1642770922 }, { value: 43, time: 1642857322 }, { value: 41, time: 1642943722 }, { value: 43, time: 1643030122 }, { value: 56, time: 1643116522 }, { value: 46, time: 1643202922 }];

baselineSeries.setData(data);

chart.timeScale().fitContent();

```

 

### Candlestick[​](#candlestick)

- **Series Definition**: [`CandlestickSeries`](/lightweight-charts/docs/api/variables/CandlestickSeries)

- **Data format**: [`CandlestickData`](/lightweight-charts/docs/api/interfaces/CandlestickData) or [`WhitespaceData`](/lightweight-charts/docs/api/interfaces/WhitespaceData)

- **Style options**: a mix of [`SeriesOptionsCommon`](/lightweight-charts/docs/api/interfaces/SeriesOptionsCommon) and [`CandlestickStyleOptions`](/lightweight-charts/docs/api/interfaces/CandlestickStyleOptions)

This series illustrates price movements with candlesticks.
The solid body of each candlestick represents the open and close values for the time period. Vertical lines, known as wicks, above and below the candle body represent the high and low values, respectively:

```
const chartOptions = { layout: { textColor: 'black', background: { type: 'solid', color: 'white' } } };
const chart = createChart(document.getElementById('container'), chartOptions);
const candlestickSeries = chart.addSeries(CandlestickSeries, { upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });

const data = [{ open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 }, { open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 1642514276 }, { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 }, { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 }, { open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 1642773476 }, { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 }, { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276 }, { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676 }, { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076 }, { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 }];

candlestickSeries.setData(data);

chart.timeScale().fitContent();

```

 

### Histogram[​](#histogram)

- **Series Definition**: [`HistogramSeries`](/lightweight-charts/docs/api/variables/HistogramSeries)

- **Data format**: [`HistogramData`](/lightweight-charts/docs/api/interfaces/HistogramData) or [`WhitespaceData`](/lightweight-charts/docs/api/interfaces/WhitespaceData)

- **Style options**: a mix of [`SeriesOptionsCommon`](/lightweight-charts/docs/api/interfaces/SeriesOptionsCommon) and [`HistogramStyleOptions`](/lightweight-charts/docs/api/interfaces/HistogramStyleOptions)

This series illustrates the distribution of values with columns:

```
const chartOptions = { layout: { textColor: 'black', background: { type: 'solid', color: 'white' } } };
const chart = createChart(document.getElementById('container'), chartOptions);
const histogramSeries = chart.addSeries(HistogramSeries, { color: '#26a69a' });

const data = [{ value: 1, time: 1642425322 }, { value: 8, time: 1642511722 }, { value: 10, time: 1642598122 }, { value: 20, time: 1642684522 }, { value: 3, time: 1642770922, color: 'red' }, { value: 43, time: 1642857322 }, { value: 41, time: 1642943722, color: 'red' }, { value: 43, time: 1643030122 }, { value: 56, time: 1643116522 }, { value: 46, time: 1643202922, color: 'red' }];

histogramSeries.setData(data);

chart.timeScale().fitContent();

```

 

### Line[​](#line)

- **Series Definition**: [`LineSeries`](/lightweight-charts/docs/api/variables/LineSeries)

- **Data format**: [`LineData`](/lightweight-charts/docs/api/interfaces/LineData) or [`WhitespaceData`](/lightweight-charts/docs/api/interfaces/WhitespaceData)

- **Style options**: a mix of [`SeriesOptionsCommon`](/lightweight-charts/docs/api/interfaces/SeriesOptionsCommon) and [`LineStyleOptions`](/lightweight-charts/docs/api/interfaces/LineStyleOptions)

This series is represented with a set of data points connected by straight line segments:

```
const chartOptions = { layout: { textColor: 'black', background: { type: 'solid', color: 'white' } } };
const chart = createChart(document.getElementById('container'), chartOptions);
const lineSeries = chart.addSeries(LineSeries, { color: '#2962FF' });

const data = [{ value: 0, time: 1642425322 }, { value: 8, time: 1642511722 }, { value: 10, time: 1642598122 }, { value: 20, time: 1642684522 }, { value: 3, time: 1642770922 }, { value: 43, time: 1642857322 }, { value: 41, time: 1642943722 }, { value: 43, time: 1643030122 }, { value: 56, time: 1643116522 }, { value: 46, time: 1643202922 }];

lineSeries.setData(data);

chart.timeScale().fitContent();

```

 

### Custom series (plugins)[​](#custom-series-plugins)

The library enables you to create custom series types, also known as series plugins, to expand its functionality. With this feature, you can add new series types, indicators, and other visualizations.

To define a custom series type, create a class that implements the [`ICustomSeriesPaneView`](/lightweight-charts/docs/api/interfaces/ICustomSeriesPaneView) interface. This class defines the rendering code that Lightweight Charts™ uses to draw the series on the chart.
Once your custom series type is defined, it can be added to any chart instance using the [`addCustomSeries()`](/lightweight-charts/docs/api/interfaces/IChartApi#addcustomseries) method. Custom series types function like any other series.

For more information, refer to the [Plugins](/lightweight-charts/docs/plugins/intro) article.

## Customization[​](#customization)

Each series type offers a unique set of customization options listed on the [`SeriesStyleOptionsMap`](/lightweight-charts/docs/api/interfaces/SeriesStyleOptionsMap) page.

You can adjust series options in two ways:

Specify the default options using the corresponding parameter while creating a series:

```
// Change default top & bottom colors of an area series in creating time
const series = chart.addSeries(AreaSeries, {
 topColor: 'red',
 bottomColor: 'green',
});

```

Use the [`ISeriesApi.applyOptions`](/lightweight-charts/docs/api/interfaces/ISeriesApi#applyoptions) method to apply other options on the fly:

```
// Updating candlestick series options on the fly
candlestickSeries.applyOptions({
 upColor: 'red',
 downColor: 'blue',
});

```

[Supported types](#supported-types)
- [Area](#area)
- [Bar](#bar)
- [Baseline](#baseline)
- [Candlestick](#candlestick)
- [Histogram](#histogram)
- [Line](#line)
- [Custom series (plugins)](#custom-series-plugins)

- [Customization](#customization)

---

## Image Descriptions

### Area Series

![Area Series Chart](https://tradingview.github.io/lightweight-charts/docs/series-types)

**Description:** This is an **area series chart** (a filled line chart).

### Visual Characteristics:
- **Color**: A single blue gradient fills the area under the line, transitioning from a lighter blue at the bottom to a deeper blue at the top.
- **Pattern/Texture**: The area is solidly filled (no patterns), with a smooth, continuous blue fill that emphasizes the magnitude of values over time.
- **Line**: A thin blue line outlines the top edge of the filled area, defining the data trend.
- **Grid/Background**: Light gray grid lines (horizontal/vertical) provide structure, with a white background.
- **Annotations**: A blue box on the right labels a value ("46.00"), and a dashed horizontal line (likely a reference) appears near the top.
- **Axes**: The x-axis shows numbered ticks (17, 19, 21, 23, 25), and the y-axis ranges from 0.00 to 60.00.

The chart uses blue as the primary color, with a solid fill to highlight the cumulative or magnitude-based trend of the data series.

---

### Bar Series

![Bar Series Chart](https://tradingview.github.io/lightweight-charts/docs/series-types)

**Description:** This is a **bar series chart** (a type of financial/time-series bar chart).

### Visual Characteristics:
- **Bars**: Each bar is a vertical bar with a thick central body (representing price range) and thin lines extending above/below (representing high/low prices).
- **Colors**:
  - **Green (teal)**: Bars with upward price movement (close > open), indicating gains.
  - **Red**: Bars with downward price movement (close < open), indicating losses.
- **Patterns**: Bars are spaced evenly along the x-axis (time-based). A horizontal dashed line (likely a moving average or reference level) runs across the chart.
- **Visual Elements**: The y-axis (right) shows a numerical scale (9.00–15.00), and a teal-colored box (legend) labels the series with "14.00". The x-axis uses dates for time progression.

The chart emphasizes price volatility and trend over time, with color-coding to quickly distinguish price direction.

---

### Baseline Series

![Baseline Series Chart](https://tradingview.github.io/lightweight-charts/docs/series-types)

**Description:** This is a **baseline series chart** with two colored areas around a base value.

### Series Type & Structure
- The series displays values relative to a baseline value, with colored areas above and below the base line.
- The x-axis ranges from 17 to 25 (time or sequential categories), with a y-axis ranging across the data values.

### Visual Elements & Colors
- **Above Baseline (Teal)**:
  - Line color: Teal (turquoise).
  - Shading: A light teal area fills the region above the baseline, emphasizing values higher than the base.
- **Below Baseline (Red)**:
  - Line color: Bright red.
  - Shading: A light red area fills the region below the baseline, emphasizing values lower than the base.

### Additional Details
- A horizontal **dashed line** marks the baseline value.
- The chart uses a clean, minimal grid (light gray lines) for axis alignment.
- The contrast between teal (above) and red (below) creates visual distinction for positive vs negative deviations from the baseline.

---

### Candlestick Series

![Candlestick Series Chart](https://tradingview.github.io/lightweight-charts/docs/series-types)

**Description:** This is a **candlestick chart** (a financial time-series visualization).

### Visual Characteristics:
- **Colors**:
  - **Green (teal) candles**: Represent price increases (closing price > opening price).
  - **Red candles**: Represent price decreases (closing price < opening price).
- **Candle Structure**:
  - **Body**: Rectangular core of each candle, width consistent across all candles.
  - **Wicks (shadows)**: Thin vertical lines extending above/below the body, indicating the high/low prices for the period.
- **Patterns**:
  - Early candles (left) are predominantly red (price declines), transitioning to green (price increases) in later periods (right).
  - Wicks vary in length, showing volatility (e.g., long wicks on some candles indicate significant price swings within the period).
- **Additional Elements**:
  - A horizontal dashed line (likely a moving average or reference level).
  - Y-axis (right) labeled with price values (9.00–12.00), X-axis (bottom) with time periods (17, 19, 21, 23, 25).

The chart compactly displays open, high, low, and close prices for each period, with color and wick length conveying trend direction and volatility.

---

### Histogram Series

![Histogram Series Chart](https://tradingview.github.io/lightweight-charts/docs/series-types)

**Description:** This is a **histogram series chart** displaying distribution of values with columns.

### Visual Characteristics:
- **Series Type**: Vertical columns/bars representing data distribution.
- **Colors**:
  - Primary: Teal (medium-dark green) bars.
  - Secondary: Red bars for specific data points.
- **Patterns/Elements**:
  - X-axis: Time periods (17, 19, 21, 23, 25).
  - Y-axis: Numeric scale (0–60).
  - Bars: Solid fill (no gradients or patterns), varying heights based on value.
  - Grid: Light gray vertical/horizontal grid lines for reference.
  - Annotation: Value labels on the right side.

The chart compares values across time periods, using color contrast to distinguish different data characteristics, with a clear y-axis scale and grid for readability.

---

### Line Series

![Line Series Chart](https://tradingview.github.io/lightweight-charts/docs/series-types)

**Description:** This is a **line series chart** (specifically a single-series line graph).

### Visual Characteristics:
- **Series Type**: A single continuous line (no markers) representing a time-series or sequential data trend.
- **Color**: The line is a solid, bright blue.
- **Patterns/Visual Elements**:
  - The line connects data points with straight segments, showing fluctuations (dips, rises, plateaus).
  - A horizontal dashed gray line (likely a reference or average) runs across the chart.
  - A blue rectangular label on the right displays the value "46.00" (aligning with the line's endpoint).
  - The y-axis ranges from 0.00 to 60.00, with grid lines for reference.
  - The x-axis (labeled 17, 19, 21, 23, 25) suggests a sequential (e.g., time-based) scale.

The chart emphasizes the line's trend through color contrast (blue against white) and grid lines for context.