# Type Alias: SeriesType

**Source:** https://tradingview.github.io/lightweight-charts/docs/api/type-aliases/SeriesType

The available series types in Lightweight Charts.

---

## Type Declaration

```typescript
type SeriesType = 
    | 'Area'
    | 'Bar'
    | 'Baseline'
    | 'Candlestick'
    | 'Custom'
    | 'Histogram'
    | 'Line';
```

---

## Remarks

These are the built-in series types supported by the library. Each series type has its own data format and options.

---

## Series Type Descriptions

| Type | Description | Data Type |
|------|-------------|-----------|
| `'Area'` | Filled area chart | [AreaData](../interfaces/AreaData.md) |
| `'Bar'` | OHLC bar chart | [BarData](../interfaces/BarData.md) |
| `'Baseline'` | Baseline chart with positive/negative areas | [BaselineData](../interfaces/BaselineData.md) |
| `'Candlestick'` | Candlestick chart | [CandlestickData](../interfaces/CandlestickData.md) |
| `'Custom'` | Custom series type | Custom data |
| `'Histogram'` | Histogram/column chart | [HistogramData](../interfaces/HistogramData.md) |
| `'Line'` | Simple line chart | [LineData](../interfaces/LineData.md) |

---

## Usage Example

```javascript
// The series type is automatically determined when using addXxxSeries methods
const lineSeries = chart.addLineSeries(); // SeriesType = 'Line'
const candlestickSeries = chart.addCandlestickSeries(); // SeriesType = 'Candlestick'

// For custom series, you specify the definition
const customSeries = chart.addCustomSeries(customDefinition);
```

---

## See Also

- [SeriesOptions](./SeriesOptions.md)
- [SeriesDataItemTypeMap](../interfaces/SeriesDataItemTypeMap.md)
- [IChartApi](../interfaces/IChartApi.md)
