# Enumeration: PriceScaleMode

**Source:** https://tradingview.github.io/lightweight-charts/docs/api/enumerations/PriceScaleMode

Represents the price scale mode.

---

## Enumeration Members

### Normal = 0

Normal price scale mode.

### Logarithmic = 1

Logarithmic price scale mode.

### Inverted = 2

Inverted price scale mode.

### Percentage = 3

Percentage price scale mode (shows percentage changes from the first visible value).

### IndexedTo100 = 4

Indexed to 100 price scale mode (shows values indexed to 100 from the first visible value).

---

## Usage Example

```javascript
const chart = createChart(document.getElementById('container'), {
    rightPriceScale: {
        mode: PriceScaleMode.Logarithmic,
    },
});
```

---

## See Also

- [PriceScaleOptions](../interfaces/PriceScaleOptions.md)
- [IPriceScaleApi](../interfaces/IPriceScaleApi.md)
