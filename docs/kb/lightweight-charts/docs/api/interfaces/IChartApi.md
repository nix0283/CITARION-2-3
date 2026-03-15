# Interface: IChartApi

**Source:** https://tradingview.github.io/lightweight-charts/docs/api/interfaces/IChartApi

The main interface for interacting with a chart. This is the primary entry point for all chart operations.

---

## Hierarchy

- **IChartApiBase**
  - **IChartApi**

---

## Properties

### widget

• **widget**: [`IChartWidgetBase`](./IChartWidgetBase.md)

The chart widget.

---

## Methods

### addAreaSeries()

▸ **addAreaSeries**(`options?`): [`ISeriesApi`](./ISeriesApi.md)<`"Area"`, [`Time`](../type-aliases/Time.md), [`AreaData`](./AreaData.md), [`AreaSeriesOptions`](../type-aliases/AreaSeriesOptions.md), [`AreaSeriesPartialOptions`](../type-aliases/AreaSeriesPartialOptions.md)\>

Adds an area series to the chart.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `options?` | [`AreaSeriesOptions`](../type-aliases/AreaSeriesOptions.md) | Area series options |

#### Returns

[`ISeriesApi`](./ISeriesApi.md)

---

### addBarSeries()

▸ **addBarSeries**(`options?`): [`ISeriesApi`](./ISeriesApi.md)<`"Bar"`, [`Time`](../type-aliases/Time.md), [`BarData`](./BarData.md), [`BarSeriesOptions`](../type-aliases/BarSeriesOptions.md), [`BarSeriesPartialOptions`](../type-aliases/BarSeriesPartialOptions.md)\>

Adds a bar series to the chart.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `options?` | [`BarSeriesOptions`](../type-aliases/BarSeriesOptions.md) | Bar series options |

#### Returns

[`ISeriesApi`](./ISeriesApi.md)

---

### addBaselineSeries()

▸ **addBaselineSeries**(`options?`): [`ISeriesApi`](./ISeriesApi.md)<`"Baseline"`, [`Time`](../type-aliases/Time.md), [`BaselineData`](./BaselineData.md), [`BaselineSeriesOptions`](../type-aliases/BaselineSeriesOptions.md), [`BaselineSeriesPartialOptions`](../type-aliases/BaselineSeriesPartialOptions.md)\>

Adds a baseline series to the chart.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `options?` | [`BaselineSeriesOptions`](../type-aliases/BaselineSeriesOptions.md) | Baseline series options |

#### Returns

[`ISeriesApi`](./ISeriesApi.md)

---

### addCandlestickSeries()

▸ **addCandlestickSeries**(`options?`): [`ISeriesApi`](./ISeriesApi.md)<`"Candlestick"`, [`Time`](../type-aliases/Time.md), [`CandlestickData`](./CandlestickData.md), [`CandlestickSeriesOptions`](../type-aliases/CandlestickSeriesOptions.md), [`CandlestickSeriesPartialOptions`](../type-aliases/CandlestickSeriesPartialOptions.md)\>

Adds a candlestick series to the chart.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `options?` | [`CandlestickSeriesOptions`](../type-aliases/CandlestickSeriesOptions.md) | Candlestick series options |

#### Returns

[`ISeriesApi`](./ISeriesApi.md)

---

### addHistogramSeries()

▸ **addHistogramSeries**(`options?`): [`ISeriesApi`](./ISeriesApi.md)<`"Histogram"`, [`Time`](../type-aliases/Time.md), [`HistogramData`](./HistogramData.md), [`HistogramSeriesOptions`](../type-aliases/HistogramSeriesOptions.md), [`HistogramSeriesPartialOptions`](../type-aliases/HistogramSeriesPartialOptions.md)\>

Adds a histogram series to the chart.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `options?` | [`HistogramSeriesOptions`](../type-aliases/HistogramSeriesOptions.md) | Histogram series options |

#### Returns

[`ISeriesApi`](./ISeriesApi.md)

---

### addLineSeries()

▸ **addLineSeries**(`options?`): [`ISeriesApi`](./ISeriesApi.md)<`"Line"`, [`Time`](../type-aliases/Time.md), [`LineData`](./LineData.md), [`LineSeriesOptions`](../type-aliases/LineSeriesOptions.md), [`LineSeriesPartialOptions`](../type-aliases/LineSeriesPartialOptions.md)\>

Adds a line series to the chart.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `options?` | [`LineSeriesOptions`](../type-aliases/LineSeriesOptions.md) | Line series options |

#### Returns

[`ISeriesApi`](./ISeriesApi.md)

---

### addCustomSeries()

▸ **addCustomSeries**<`TData`, `TOptions`, `TPartialOptions`\>(`definition`, `options?`, `paneIndex?`): [`ISeriesApi`](./ISeriesApi.md)<`"Custom"`, [`Time`](../type-aliases/Time.md), `TData`, `TOptions`, `TPartialOptions`\>

Creates a custom series with specified parameters. A custom series is a generic series which can be extended with a custom renderer to implement chart types that aren't supported by the built-in series types.

#### Type Parameters

| Name | Default |
|------|---------|
| `TData` | - |
| `TOptions` | [`CustomSeriesOptions`](../type-aliases/CustomSeriesOptions.md) |
| `TPartialOptions` | [`CustomSeriesPartialOptions`](../type-aliases/CustomSeriesPartialOptions.md) |

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `definition` | [`SeriesDefinition`](./SeriesDefinition.md)<`TData`, `TOptions`, `TPartialOptions`\> | Custom series definition |
| `options?` | `TOptions` | Custom series options |
| `paneIndex?` | `number` | Pane index |

#### Returns

[`ISeriesApi`](./ISeriesApi.md)

---

### applyOptions()

▸ **applyOptions**(`options`): `void`

Applies new options to the chart.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `options` | [`DeepPartial`](../type-aliases/DeepPartial.md)<[`ChartOptions`](../type-aliases/ChartOptions.md)\> | Chart options to apply |

#### Returns

`void`

---

### chart()

▸ **chart**(): [`IChartWidgetBase`](./IChartWidgetBase.md)

Returns the chart widget.

#### Returns

[`IChartWidgetBase`](./IChartWidgetBase.md)

---

### remove()

▸ **remove**(): `void`

Removes the chart from the DOM and releases all resources.

#### Returns

`void`

---

### resize()

▸ **resize**(`width`, `height`, `forceRepaint?`): `void`

Resizes the chart.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `width` | `number` | New width |
| `height` | `number` | New height |
| `forceRepaint?` | `boolean` | Force repaint |

#### Returns

`void`

---

### takeScreenshot()

▸ **takeScreenshot**(): `HTMLCanvasElement`

Takes a screenshot of the chart.

#### Returns

`HTMLCanvasElement`

Canvas element with the chart screenshot.

---

### priceScale()

▸ **priceScale**(`priceScaleId?`): [`IPriceScaleApi`](./IPriceScaleApi.md)

Returns the price scale API.

#### Parameters

| Name | Type | Default value | Description |
|------|------|---------------|-------------|
| `priceScaleId?` | `string` | `'right'` | Price scale ID |

#### Returns

[`IPriceScaleApi`](./IPriceScaleApi.md)

---

### timeScale()

▸ **timeScale**(): [`ITimeScaleApi`](./ITimeScaleApi.md)

Returns the time scale API.

#### Returns

[`ITimeScaleApi`](./ITimeScaleApi.md)

---

### pane()

▸ **pane**(`paneIndex`): [`IPaneApi`](./IPaneApi.md)

Returns the pane API.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `paneIndex` | `number` | Pane index |

#### Returns

[`IPaneApi`](./IPaneApi.md)

---

### panes()

▸ **panes**(): [`IPaneApi`](./IPaneApi.md)[]

Returns all panes.

#### Returns

[`IPaneApi`](./IPaneApi.md)[]

---

### options()

▸ **options**(): `Readonly`<[`ChartOptions`](../type-aliases/ChartOptions.md)\>

Returns the current chart options.

#### Returns

`Readonly`<[`ChartOptions`](../type-aliases/ChartOptions.md)\>

---

## Events

### subscribeCrosshairMove()

▸ **subscribeCrosshairMove**(`callback`): `void`

Subscribes to crosshair move events.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `callback` | [`MouseEventHandler`](../type-aliases/MouseEventHandler.md) | Callback function |

#### Returns

`void`

---

### unsubscribeCrosshairMove()

▸ **unsubscribeCrosshairMove**(`callback`): `void`

Unsubscribes from crosshair move events.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `callback` | [`MouseEventHandler`](../type-aliases/MouseEventHandler.md) | Callback function |

#### Returns

`void`

---

### subscribeClick()

▸ **subscribeClick**(`callback`): `void`

Subscribes to click events.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `callback` | [`MouseEventHandler`](../type-aliases/MouseEventHandler.md) | Callback function |

#### Returns

`void`

---

### unsubscribeClick()

▸ **unsubscribeClick**(`callback`): `void`

Unsubscribes from click events.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `callback` | [`MouseEventHandler`](../type-aliases/MouseEventHandler.md) | Callback function |

#### Returns

`void`

---

### subscribeDblClick()

▸ **subscribeDblClick**(`callback`): `void`

Subscribes to double-click events.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `callback` | [`MouseEventHandler`](../type-aliases/MouseEventHandler.md) | Callback function |

#### Returns

`void`

---

### unsubscribeDblClick()

▸ **unsubscribeDblClick**(`callback`): `void`

Unsubscribes from double-click events.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `callback` | [`MouseEventHandler`](../type-aliases/MouseEventHandler.md) | Callback function |

#### Returns

`void`

---

## Usage Example

```javascript
import { createChart } from 'lightweight-charts';

const chart = createChart(document.getElementById('container'), {
    width: 600,
    height: 300,
    layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
    },
});

// Add a line series
const lineSeries = chart.addLineSeries({
    color: 'blue',
    lineWidth: 2,
});

// Set data
lineSeries.setData([
    { time: '2024-01-01', value: 100 },
    { time: '2024-01-02', value: 105 },
    { time: '2024-01-03', value: 102 },
]);

// Subscribe to crosshair move events
chart.subscribeCrosshairMove((param) => {
    if (!param.point || !param.time) {
        return;
    }
    console.log('Crosshair at:', param.point, 'time:', param.time);
});

// Subscribe to click events
chart.subscribeClick((param) => {
    console.log('Clicked at:', param.point);
});

// Resize the chart
chart.resize(800, 400);

// Take a screenshot
const screenshot = chart.takeScreenshot();
document.body.appendChild(screenshot);

// Clean up when done
chart.remove();
```

---

## See Also

- [createChart](../functions/createChart.md)
- [ISeriesApi](./ISeriesApi.md)
- [IPriceScaleApi](./IPriceScaleApi.md)
- [ITimeScaleApi](./ITimeScaleApi.md)
- [IPaneApi](./IPaneApi.md)
