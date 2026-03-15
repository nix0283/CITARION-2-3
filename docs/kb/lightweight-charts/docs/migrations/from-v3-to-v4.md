# From v3 to v4

> **Source:** https://tradingview.github.io/lightweight-charts/docs/migrations/from-v3-to-v4

In this document you can find the migration guide from the previous version v3 to v4.

## Exported enum `LasPriceAnimationMode` has been removed

Please use `LastPriceAnimationMode` instead.

## `scaleMargins` option has been removed from series options

Previously, you could do something like the following:

```javascript
const series = chart.addLineSeries({
    scaleMargins: { /* options here */ },
});
```

And `scaleMargins` option was applied to series' price scale as `scaleMargins` option.

Since v4 this option won't be applied to the price scale and will be just ignored (if you're using TypeScript you will get a compilation error).

To fix this, you need to apply these options to series' price scale:

```javascript
const series = chart.addLineSeries();
series.priceScale().applyOptions({
    scaleMargins: { /* options here */ },
});
```

## `backgroundColor` from `layout` options has been removed

If you want to have solid background color you need to use `background` property instead, e.g. instead of:

```javascript
const chart = createChart({
    layout: {
        backgroundColor: 'red',
    },
});
```

Use:

```javascript
const chart = createChart({
    layout: {
        background: {
            type: ColorType.Solid,
            color: 'red',
        },
    },
});
```

## `overlay` property of series options has been removed

Please follow [the guide for migrating from v2 to v3](./from-v2-to-v3.md) where this option was deprecated.

## `priceScale` option has been removed

Please follow [the guide for migrating from v2 to v3](./from-v2-to-v3.md).

## `priceScale()` method of chart API now requires to provide price scale id

Before v4 you could write the following code:

```javascript
const priceScale = chart.priceScale();
```

And in `priceScale` you had a right price scale if it is visible and a left price scale otherwise.

Since v4 you have to provide an ID of price scale explicitly, e.g. if you want to get a right price scale you need to provide `'right'`:

```javascript
const rightPriceScale = chart.priceScale('right');
const leftPriceScale = chart.priceScale('left');
```

## `drawTicks` from `leftPriceScale` and `rightPriceScale` options has been renamed to `ticksVisible`

Since v4 you have to use `ticksVisible` instead of `drawTicks`.

```javascript
const chart = createChart({
    leftPriceScale: {
        ticksVisible: false,
    },
    rightPriceScale: {
        ticksVisible: false,
    },
});
```

Also this option is off by default.

## The type of outbound time values has been changed

### Affected API

- `IChartApi.subscribeClick` (via `MouseEventParams.time`)
- `IChartApi.subscribeCrosshairMove` (via `MouseEventParams.time`)
- `LocalizationOptions.timeFormatter` (via argument of `TimeFormatterFn`)
- `TimeScaleOptions.tickMarkFormatter` (via argument of `TickMarkFormatter`)

Previously the type of an inbound time (a values you provide to the library, e.g. in `ISeriesApi.setData`) was different from an outbound one (a values the library provides to your code, e.g. an argument of `LocalizationOptions.timeFormatter`).

So the difference between types was that outbound time couldn't be a business day string.

Since v4 we improved our API in this matter and now the library will return exactly the same values back for all time-related properties.

Thus, if you provide a string to your series in `ISeriesApi.setData`, you'll receive exactly the same value back:

```javascript
series.setData([
    { time: '2001-01-01', value: 1 },
]);
chart.applyOptions({
    localization: {
        timeFormatter: time => time, // will be '2001-01-01' for the bar above
    },
    timeScale: {
        tickMarkFormatter: time => time, // will be '2001-01-01' for the bar above
    },
});
chart.subscribeCrosshairMove(param => {
    console.log(param.time); // will be '2001-01-01' if you hover the bar above
});
chart.subscribeClick(param => {
    console.log(param.time); // will be '2001-01-01' if you click on the bar above
});
```

Handling this breaking change depends on your needs and your handlers, but generally speaking you need to convert provided time to a desired format manually if it is required.

For example, you could use provided helpers to check the type of a time:

```javascript
import {
    createChart,
    isUTCTimestamp,
    isBusinessDay,
} from 'lightweight-charts';

const chart = createChart(document.body);
chart.subscribeClick(param => {
    if (param.time === undefined) {
        // the time is undefined, i.e. there is no any data point where a time could be received from
        return;
    }
    if (isUTCTimestamp(param.time)) {
        // param.time is UTCTimestamp
    } else if (isBusinessDay(param.time)) {
        // param.time is a BusinessDay object
    } else {
        // param.time is a business day string in ISO format, e.g. `'2010-01-01'`
    }
});
```

## `seriesPrices` property from `MouseEventParams` has been removed

### Affected API

- `IChartApi.subscribeClick`
- `IChartApi.subscribeCrosshairMove`

The property `seriesPrices` of `MouseEventParams` has been removed.

Instead, you can use `MouseEventParams.seriesData` - it is pretty similar to the old `seriesPrices`, but it contains series' data items instead of just prices:

```javascript
lineSeries.setData([{ time: '2001-01-01', value: 1 }]);
barSeries.setData([{ time: '2001-01-01', open: 5, high: 10, low: 1, close: 7 }]);
chart.subscribeCrosshairMove(param => {
    console.log(param.seriesData.get(lineSeries)); // { time: '2001-01-01', value: 1 } or undefined
    console.log(param.seriesData.get(barSeries)); // { time: '2001-01-01', open: 5, high: 10, low: 1, close: 7 } or undefined
});
```

## `MouseEventParams` field `hoveredMarkerId` was renamed to `hoveredObjectId`

Since v4 you have to use `hoveredObjectId` instead of `hoveredMarkerId`.

```javascript
chart.subscribeCrosshairMove(param => {
    console.log(param.hoveredObjectId);
});
chart.subscribeClick(param => {
    console.log(param.hoveredObjectId);
});
```

## Summary of Breaking Changes

| v3 API | v4 API |
|--------|--------|
| `LasPriceAnimationMode` | `LastPriceAnimationMode` |
| `series.scaleMargins` | `series.priceScale().applyOptions({ scaleMargins })` |
| `layout.backgroundColor` | `layout.background: { type: ColorType.Solid, color }` |
| `chart.priceScale()` | `chart.priceScale('right')` or `chart.priceScale('left')` |
| `drawTicks` | `ticksVisible` |
| `seriesPrices` (MouseEventParams) | `seriesData` (MouseEventParams) |
| `hoveredMarkerId` (MouseEventParams) | `hoveredObjectId` (MouseEventParams) |
