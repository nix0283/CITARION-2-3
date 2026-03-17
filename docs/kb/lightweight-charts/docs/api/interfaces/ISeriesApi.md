# Interface: ISeriesApi

**Source:** https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ISeriesApi

Represents the interface for interacting with a series.

---

## Type Parameters

| Name | Description |
|------|-------------|
| `TSeriesType` | Series type identifier |
| `HorzScaleItem` | Horizontal scale item type |
| `TData` | Data type for the series |
| `TOptions` | Series options type |
| `TPartialOptions` | Partial options type |

---

## Methods

### setData()

▸ **setData**(`data`): `void`

Sets the data for the series.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `data` | `TData[]` | Array of data points |

#### Returns

`void`

---

### update()

▸ **update**(`data`): `void`

Updates the series with new data. Adds or updates the last data point.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `data` | `TData` | Single data point |

#### Returns

`void`

---

### applyOptions()

▸ **applyOptions**(`options`): `void`

Applies new options to the series.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `options` | `TPartialOptions` | Series options to apply |

#### Returns

`void`

---

### options()

▸ **options**(): `Readonly`<`TOptions`\>

Returns the current series options.

#### Returns

`Readonly`<`TOptions`\>

---

### priceScale()

▸ **priceScale**(): [`IPriceScaleApi`](./IPriceScaleApi.md)

Returns the price scale API for this series.

#### Returns

[`IPriceScaleApi`](./IPriceScaleApi.md)

---

### setMarkers()

▸ **setMarkers**(`data`): `void`

Sets markers on the series.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `data` | [`SeriesMarker`](../type-aliases/SeriesMarker.md)[] | Array of markers |

#### Returns

`void`

---

### createPriceLine()

▸ **createPriceLine**(`options`): [`IPriceLine`](./IPriceLine.md)

Creates a price line on the series.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `options` | [`CreatePriceLineOptions`](../type-aliases/CreatePriceLineOptions.md) | Price line options |

#### Returns

[`IPriceLine`](./IPriceLine.md)

---

### removePriceLine()

▸ **removePriceLine**(`line`): `void`

Removes a price line from the series.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `line` | [`IPriceLine`](./IPriceLine.md) | Price line to remove |

#### Returns

`void`

---

### coordinateToPrice()

▸ **coordinateToPrice**(`coordinate`): `number` \| `null`

Converts a coordinate to a price value.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `coordinate` | `number` | Y coordinate in pixels |

#### Returns

`number` \| `null`

---

### priceToCoordinate()

▸ **priceToCoordinate**(`price`): `number` \| `null`

Converts a price value to a coordinate.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `price` | `number` | Price value |

#### Returns

`number` \| `null`

---

### barsInLogicalRange()

▸ **barsInLogicalRange**(`range`): [`BarsInfo`](./BarsInfo.md) \| `null`

Returns information about bars within a logical range.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `range` | [`LogicalRange`](../type-aliases/LogicalRange.md) | Logical range |

#### Returns

[`BarsInfo`](./BarsInfo.md) \| `null`

---

### setDataWithUndo()

▸ **setDataWithUndo**(`data`): `void`

Sets data with undo support.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `data` | `TData[]` | Array of data points |

#### Returns

`void`

---

### clearData()

▸ **clearData**(): `void`

Clears all data from the series.

#### Returns

`void`

---

## Events

### subscribeDataChanged()

▸ **subscribeDataChanged**(`callback`): `void`

Subscribes to data changed events.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `callback` | [`DataChangedHandler`](../type-aliases/DataChangedHandler.md) | Callback function |

#### Returns

`void`

---

### unsubscribeDataChanged()

▸ **unsubscribeDataChanged**(`callback`): `void`

Unsubscribes from data changed events.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `callback` | [`DataChangedHandler`](../type-aliases/DataChangedHandler.md) | Callback function |

#### Returns

`void`

---

### subscribeClick()

▸ **subscribeClick**(`callback`): `void`

Subscribes to click events on the series.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `callback` | [`MouseEventHandler`](../type-aliases/MouseEventHandler.md) | Callback function |

#### Returns

`void`

---

## Usage Example

```javascript
// Create a line series
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

// Update with new data point
lineSeries.update({ time: '2024-01-04', value: 108 });

// Add markers
lineSeries.setMarkers([
    {
        time: '2024-01-02',
        position: 'aboveBar',
        color: '#26a69a',
        shape: 'arrowUp',
        text: 'Buy',
    },
]);

// Create a price line
const priceLine = lineSeries.createPriceLine({
    price: 105,
    color: 'red',
    lineWidth: 1,
    lineStyle: LineStyle.Dashed,
});

// Convert price to coordinate
const coordinate = lineSeries.priceToCoordinate(105);

// Subscribe to data changes
lineSeries.subscribeDataChanged((scope) => {
    console.log('Data changed:', scope);
});
```

---

## See Also

- [IChartApi](./IChartApi.md)
- [SeriesMarker](../type-aliases/SeriesMarker.md)
- [IPriceLine](./IPriceLine.md)
- [Data Types](../../tutorials/how_to/data-points.md)
