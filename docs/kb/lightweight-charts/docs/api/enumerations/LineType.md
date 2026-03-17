# Enumeration: LineType

**Source:** https://tradingview.github.io/lightweight-charts/docs/api/enumerations/LineType

Represents the type of line rendering.

---

## Enumeration Members

### Simple = 0

Simple line type (straight lines between points).

### WithSteps = 1

Stepped line type (step lines between points).

### Curved = 2

Curved line type (bezier curves between points).

---

## Usage Example

```javascript
const lineSeries = chart.addLineSeries({
    color: 'blue',
    lineType: LineType.Curved,
});
```

---

## See Also

- [LineStyleOptions](../interfaces/LineStyleOptions.md)
- [LineSeries](../variables/LineSeries.md)
