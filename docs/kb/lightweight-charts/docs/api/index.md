# Lightweight Charts API Reference

**Source:** https://tradingview.github.io/lightweight-charts/docs/api

**Version:** 5.1

This page provides a comprehensive reference for the Lightweight Charts library API.

---

## Table of Contents

- [Enumerations](#enumerations)
- [Interfaces](#interfaces)
- [Type Aliases](#type-aliases)
- [Variables](#variables)
- [Functions](#functions)

---

## Enumerations

| Name | Description | Link |
|------|-------------|------|
| MarkerSign | Marker sign enumeration | [View Details](./enumerations/MarkerSign.md) |
| ColorType | Color type enumeration | [View Details](./enumerations/ColorType.md) |
| CrosshairMode | Crosshair mode enumeration | [View Details](./enumerations/CrosshairMode.md) |
| LastPriceAnimationMode | Last price animation mode enumeration | [View Details](./enumerations/LastPriceAnimationMode.md) |
| LineStyle | Line style enumeration | [View Details](./enumerations/LineStyle.md) |
| LineType | Line type enumeration | [View Details](./enumerations/LineType.md) |
| MismatchDirection | Mismatch direction enumeration | [View Details](./enumerations/MismatchDirection.md) |
| PriceLineSource | Price line source enumeration | [View Details](./enumerations/PriceLineSource.md) |
| PriceScaleMode | Price scale mode enumeration | [View Details](./enumerations/PriceScaleMode.md) |
| TickMarkType | Tick mark type enumeration | [View Details](./enumerations/TickMarkType.md) |
| TrackingModeExitMode | Tracking mode exit mode enumeration | [View Details](./enumerations/TrackingModeExitMode.md) |

---

## Interfaces

### Chart API Interfaces

| Name | Description | Link |
|------|-------------|------|
| IChartApi | Main chart API interface | [View Details](./interfaces/IChartApi.md) |
| IChartApiBase | Base chart API interface | [View Details](./interfaces/IChartApiBase.md) |
| IPaneApi | Pane API interface | [View Details](./interfaces/IPaneApi.md) |
| IPriceScaleApi | Price scale API interface | [View Details](./interfaces/IPriceScaleApi.md) |
| ITimeScaleApi | Time scale API interface | [View Details](./interfaces/ITimeScaleApi.md) |
| IYieldCurveChartApi | Yield curve chart API interface | [View Details](./interfaces/IYieldCurveChartApi.md) |

### Series API Interfaces

| Name | Description | Link |
|------|-------------|------|
| ISeriesApi | Series API interface | [View Details](./interfaces/ISeriesApi.md) |
| IPriceLine | Price line interface | [View Details](./interfaces/IPriceLine.md) |
| IPriceFormatter | Price formatter interface | [View Details](./interfaces/IPriceFormatter.md) |

### Data Interfaces

| Name | Description | Link |
|------|-------------|------|
| AreaData | Area series data | [View Details](./interfaces/AreaData.md) |
| BarData | Bar series data | [View Details](./interfaces/BarData.md) |
| BaselineData | Baseline series data | [View Details](./interfaces/BaselineData.md) |
| CandlestickData | Candlestick series data | [View Details](./interfaces/CandlestickData.md) |
| HistogramData | Histogram series data | [View Details](./interfaces/HistogramData.md) |
| LineData | Line series data | [View Details](./interfaces/LineData.md) |
| OhlcData | OHLC data | [View Details](./interfaces/OhlcData.md) |
| SingleValueData | Single value data | [View Details](./interfaces/SingleValueData.md) |
| WhitespaceData | Whitespace data | [View Details](./interfaces/WhitespaceData.md) |

### Style Options Interfaces

| Name | Description | Link |
|------|-------------|------|
| AreaStyleOptions | Area style options | [View Details](./interfaces/AreaStyleOptions.md) |
| BarStyleOptions | Bar style options | [View Details](./interfaces/BarStyleOptions.md) |
| BaselineStyleOptions | Baseline style options | [View Details](./interfaces/BaselineStyleOptions.md) |
| CandlestickStyleOptions | Candlestick style options | [View Details](./interfaces/CandlestickStyleOptions.md) |
| CustomStyleOptions | Custom style options | [View Details](./interfaces/CustomStyleOptions.md) |
| HistogramStyleOptions | Histogram style options | [View Details](./interfaces/HistogramStyleOptions.md) |
| LineStyleOptions | Line style options | [View Details](./interfaces/LineStyleOptions.md) |

### Chart Options Interfaces

| Name | Description | Link |
|------|-------------|------|
| ChartOptionsBase | Chart options base | [View Details](./interfaces/ChartOptionsBase.md) |
| ChartOptionsImpl | Chart options implementation | [View Details](./interfaces/ChartOptionsImpl.md) |
| PriceChartOptions | Price chart options | [View Details](./interfaces/PriceChartOptions.md) |
| TimeChartOptions | Time chart options | [View Details](./interfaces/TimeChartOptions.md) |
| LayoutOptions | Layout options | [View Details](./interfaces/LayoutOptions.md) |
| GridOptions | Grid options | [View Details](./interfaces/GridOptions.md) |
| CrosshairOptions | Crosshair options | [View Details](./interfaces/CrosshairOptions.md) |

### Price Scale Options Interfaces

| Name | Description | Link |
|------|-------------|------|
| PriceScaleOptions | Price scale options | [View Details](./interfaces/PriceScaleOptions.md) |
| PriceScaleMargins | Price scale margins | [View Details](./interfaces/PriceScaleMargins.md) |
| AutoScaleMargins | Auto scale margins | [View Details](./interfaces/AutoScaleMargins.md) |

### Time Scale Options Interfaces

| Name | Description | Link |
|------|-------------|------|
| TimeScaleOptions | Time scale options | [View Details](./interfaces/TimeScaleOptions.md) |
| TickMark | Tick mark interface | [View Details](./interfaces/TickMark.md) |
| TimeMark | Time mark interface | [View Details](./interfaces/TimeMark.md) |
| TimeScalePoint | Time scale point | [View Details](./interfaces/TimeScalePoint.md) |

### Custom Series Interfaces

| Name | Description | Link |
|------|-------------|------|
| ICustomSeriesPaneRenderer | Custom series pane renderer | [View Details](./interfaces/ICustomSeriesPaneRenderer.md) |
| ICustomSeriesPaneView | Custom series pane view | [View Details](./interfaces/ICustomSeriesPaneView.md) |
| CustomBarItemData | Custom bar item data | [View Details](./interfaces/CustomBarItemData.md) |
| CustomData | Custom data | [View Details](./interfaces/CustomData.md) |
| CustomSeriesWhitespaceData | Custom series whitespace data | [View Details](./interfaces/CustomSeriesWhitespaceData.md) |
| SeriesDefinition | Series definition | [View Details](./interfaces/SeriesDefinition.md) |

### Primitive Interfaces

| Name | Description | Link |
|------|-------------|------|
| IPanePrimitiveBase | Pane primitive base | [View Details](./interfaces/IPanePrimitiveBase.md) |
| IPanePrimitivePaneView | Pane primitive pane view | [View Details](./interfaces/IPanePrimitivePaneView.md) |
| IPanePrimitiveWrapper | Pane primitive wrapper | [View Details](./interfaces/IPanePrimitiveWrapper.md) |
| IPrimitivePaneRenderer | Primitive pane renderer | [View Details](./interfaces/IPrimitivePaneRenderer.md) |
| IPrimitivePaneView | Primitive pane view | [View Details](./interfaces/IPrimitivePaneView.md) |
| ISeriesPrimitiveBase | Series primitive base | [View Details](./interfaces/ISeriesPrimitiveBase.md) |
| ISeriesPrimitiveAxisView | Series primitive axis view | [View Details](./interfaces/ISeriesPrimitiveAxisView.md) |
| ISeriesPrimitiveWrapper | Series primitive wrapper | [View Details](./interfaces/ISeriesPrimitiveWrapper.md) |

### Event Interfaces

| Name | Description | Link |
|------|-------------|------|
| MouseEventParams | Mouse event parameters | [View Details](./interfaces/MouseEventParams.md) |
| TouchMouseEventData | Touch mouse event data | [View Details](./interfaces/TouchMouseEventData.md) |

### Other Interfaces

| Name | Description | Link |
|------|-------------|------|
| IRange | Range interface | [View Details](./interfaces/IRange.md) |
| Point | Point interface | [View Details](./interfaces/Point.md) |
| PaneSize | Pane size | [View Details](./interfaces/PaneSize.md) |
| PriceRange | Price range | [View Details](./interfaces/PriceRange.md) |
| BusinessDay | Business day | [View Details](./interfaces/BusinessDay.md) |
| IHorzScaleBehavior | Horizontal scale behavior | [View Details](./interfaces/IHorzScaleBehavior.md) |
| DrawingUtils | Drawing utilities | [View Details](./interfaces/DrawingUtils.md) |

---

## Type Aliases

### Series Type Aliases

| Name | Description | Link |
|------|-------------|------|
| SeriesType | Series type | [View Details](./type-aliases/SeriesType.md) |
| SeriesOptions | Series options | [View Details](./type-aliases/SeriesOptions.md) |
| SeriesPartialOptions | Series partial options | [View Details](./type-aliases/SeriesPartialOptions.md) |
| AreaSeriesOptions | Area series options | [View Details](./type-aliases/AreaSeriesOptions.md) |
| BarSeriesOptions | Bar series options | [View Details](./type-aliases/BarSeriesOptions.md) |
| BaselineSeriesOptions | Baseline series options | [View Details](./type-aliases/BaselineSeriesOptions.md) |
| CandlestickSeriesOptions | Candlestick series options | [View Details](./type-aliases/CandlestickSeriesOptions.md) |
| HistogramSeriesOptions | Histogram series options | [View Details](./type-aliases/HistogramSeriesOptions.md) |
| LineSeriesOptions | Line series options | [View Details](./type-aliases/LineSeriesOptions.md) |
| CustomSeriesOptions | Custom series options | [View Details](./type-aliases/CustomSeriesOptions.md) |

### Time Type Aliases

| Name | Description | Link |
|------|-------------|------|
| Time | Time type | [View Details](./type-aliases/Time.md) |
| UTCTimestamp | UTC timestamp | [View Details](./type-aliases/UTCTimestamp.md) |
| TimePointIndex | Time point index | [View Details](./type-aliases/TimePointIndex.md) |
| Logical | Logical type | [View Details](./type-aliases/Logical.md) |
| LogicalRange | Logical range | [View Details](./type-aliases/LogicalRange.md) |

### Price Type Aliases

| Name | Description | Link |
|------|-------------|------|
| BarPrice | Bar price | [View Details](./type-aliases/BarPrice.md) |
| Coordinate | Coordinate | [View Details](./type-aliases/Coordinate.md) |
| PriceFormat | Price format | [View Details](./type-aliases/PriceFormat.md) |

### Color Type Aliases

| Name | Description | Link |
|------|-------------|------|
| Background | Background type | [View Details](./type-aliases/Background.md) |
| Rgba | RGBA color | [View Details](./type-aliases/Rgba.md) |
| AlphaComponent | Alpha component | [View Details](./type-aliases/AlphaComponent.md) |
| RedComponent | Red component | [View Details](./type-aliases/RedComponent.md) |
| GreenComponent | Green component | [View Details](./type-aliases/GreenComponent.md) |
| BlueComponent | Blue component | [View Details](./type-aliases/BlueComponent.md) |
| ColorSpace | Color space | [View Details](./type-aliases/ColorSpace.md) |

### Event Handler Type Aliases

| Name | Description | Link |
|------|-------------|------|
| MouseEventHandler | Mouse event handler | [View Details](./type-aliases/MouseEventHandler.md) |
| LogicalRangeChangeEventHandler | Logical range change event handler | [View Details](./type-aliases/LogicalRangeChangeEventHandler.md) |
| TimeRangeChangeEventHandler | Time range change event handler | [View Details](./type-aliases/TimeRangeChangeEventHandler.md) |
| SizeChangeEventHandler | Size change event handler | [View Details](./type-aliases/SizeChangeEventHandler.md) |
| DataChangedHandler | Data changed handler | [View Details](./type-aliases/DataChangedHandler.md) |

### Marker Type Aliases

| Name | Description | Link |
|------|-------------|------|
| SeriesMarker | Series marker | [View Details](./type-aliases/SeriesMarker.md) |
| SeriesMarkerShape | Series marker shape | [View Details](./type-aliases/SeriesMarkerShape.md) |
| SeriesMarkerPosition | Series marker position | [View Details](./type-aliases/SeriesMarkerPosition.md) |
| SeriesMarkerZOrder | Series marker z-order | [View Details](./type-aliases/SeriesMarkerZOrder.md) |

### Utility Type Aliases

| Name | Description | Link |
|------|-------------|------|
| DeepPartial | Deep partial type | [View Details](./type-aliases/DeepPartial.md) |
| Mutable | Mutable type | [View Details](./type-aliases/Mutable.md) |
| Nominal | Nominal type | [View Details](./type-aliases/Nominal.md) |
| LineWidth | Line width | [View Details](./type-aliases/LineWidth.md) |
| HorzAlign | Horizontal alignment | [View Details](./type-aliases/HorzAlign.md) |
| VertAlign | Vertical alignment | [View Details](./type-aliases/VertAlign.md) |

---

## Variables

### Series Variables

| Name | Description | Link |
|------|-------------|------|
| AreaSeries | Area series definition | [View Details](./variables/AreaSeries.md) |
| BarSeries | Bar series definition | [View Details](./variables/BarSeries.md) |
| BaselineSeries | Baseline series definition | [View Details](./variables/BaselineSeries.md) |
| CandlestickSeries | Candlestick series definition | [View Details](./variables/CandlestickSeries.md) |
| HistogramSeries | Histogram series definition | [View Details](./variables/HistogramSeries.md) |
| LineSeries | Line series definition | [View Details](./variables/LineSeries.md) |
| customSeriesDefaultOptions | Custom series default options | [View Details](./variables/customSeriesDefaultOptions.md) |

---

## Functions

### Chart Creation Functions

| Name | Description | Link |
|------|-------------|------|
| createChart | Creates a chart | [View Details](./functions/createChart.md) |
| createChartEx | Creates an extended chart | [View Details](./functions/createChartEx.md) |
| createOptionsChart | Creates an options chart | [View Details](./functions/createOptionsChart.md) |
| createYieldCurveChart | Creates a yield curve chart | [View Details](./functions/createYieldCurveChart.md) |

### Watermark Functions

| Name | Description | Link |
|------|-------------|------|
| createImageWatermark | Creates an image watermark | [View Details](./functions/createImageWatermark.md) |
| createTextWatermark | Creates a text watermark | [View Details](./functions/createTextWatermark.md) |

### Marker Functions

| Name | Description | Link |
|------|-------------|------|
| createSeriesMarkers | Creates series markers | [View Details](./functions/createSeriesMarkers.md) |
| createUpDownMarkers | Creates up/down markers | [View Details](./functions/createUpDownMarkers.md) |

### Utility Functions

| Name | Description | Link |
|------|-------------|------|
| defaultHorzScaleBehavior | Default horizontal scale behavior | [View Details](./functions/defaultHorzScaleBehavior.md) |
| isBusinessDay | Checks if value is a business day | [View Details](./functions/isBusinessDay.md) |
| isUTCTimestamp | Checks if value is a UTC timestamp | [View Details](./functions/isUTCTimestamp.md) |
| version | Returns the library version | [View Details](./functions/version.md) |

---

## Getting Started

To start using the Lightweight Charts library, you can create a basic chart with the following code:

```javascript
import { createChart } from 'lightweight-charts';

const chart = createChart(document.getElementById('container'), {
    width: 600,
    height: 300,
});

const lineSeries = chart.addLineSeries();
lineSeries.setData([
    { time: '2019-04-11', value: 80.01 },
    { time: '2019-04-12', value: 96.63 },
    { time: '2019-04-13', value: 76.64 },
    { time: '2019-04-14', value: 81.89 },
    { time: '2019-04-15', value: 74.43 },
]);
```

For more examples and tutorials, see the [Tutorials](../tutorials/index.md) section.

---

## Source

This documentation is sourced from the official Lightweight Charts documentation:
https://tradingview.github.io/lightweight-charts/docs/api
