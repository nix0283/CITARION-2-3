# Enumeration: LineStyle

**Source:** https://tradingview.github.io/lightweight-charts/docs/api/enumerations/LineStyle

Represents the line style for drawing lines.

---

## Enumeration Members

### Solid = 0

Solid line style.

### Dotted = 1

Dotted line style.

### Dashed = 2

Dashed line style.

### LargeDashed = 3

Large dashed line style.

### SparseDotted = 4

Sparse dotted line style.

---

## Usage Example

```javascript
const lineSeries = chart.addLineSeries({
    color: 'blue',
    lineWidth: 2,
    lineStyle: LineStyle.Dashed,
});
```

---

## See Also

- [LineStyleOptions](../interfaces/LineStyleOptions.md)
- [LineSeries](../variables/LineSeries.md)
