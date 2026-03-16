# Enumeration: ColorType

**Source:** https://tradingview.github.io/lightweight-charts/docs/api/enumerations/ColorType

Represents the color type for series rendering.

---

## Enumeration Members

### Solid = 0

Solid color type.

### VerticalGradient = 1

Vertical gradient color type.

---

## Usage Example

```javascript
const areaSeries = chart.addAreaSeries({
    topColor: 'rgba(38, 166, 154, 0.5)',
    bottomColor: 'rgba(38, 166, 154, 0)',
    colorType: ColorType.VerticalGradient,
});
```

---

## See Also

- [AreaSeries](../interfaces/AreaData.md)
- [VerticalGradientColor](../interfaces/VerticalGradientColor.md)
