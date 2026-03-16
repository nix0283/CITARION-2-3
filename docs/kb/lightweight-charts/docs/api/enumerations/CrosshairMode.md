# Enumeration: CrosshairMode

**Source:** https://tradingview.github.io/lightweight-charts/docs/api/enumerations/CrosshairMode

Represents the crosshair mode.

---

## Enumeration Members

### Normal = 0

This mode allows crosshair to move freely on the chart.

### Magnet = 1

This mode sticks the crosshair's vertical line to the nearest data point.

### Hidden = 2

This mode hides the crosshair.

---

## Usage Example

```javascript
const chart = createChart(document.getElementById('container'), {
    crosshair: {
        mode: CrosshairMode.Magnet,
    },
});
```

---

## See Also

- [Crosshair Options](../interfaces/CrosshairOptions.md)
- [Crosshair Customization Tutorial](../../tutorials/customization/crosshair.md)
