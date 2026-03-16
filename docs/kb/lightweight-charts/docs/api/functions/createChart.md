# Function: createChart

**Source:** https://tradingview.github.io/lightweight-charts/docs/api/functions/createChart

Creates a new chart instance.

---

## Signature

```typescript
function createChart(
    container: HTMLElement | string,
    options?: DeepPartial<ChartOptions>
): IChartApi
```

---

## Parameters

### container

The HTML container element or its ID where the chart will be rendered.

| Type | Description |
|------|-------------|
| `HTMLElement` | Direct reference to the DOM element |
| `string` | The ID of the DOM element |

### options

Optional chart configuration options.

| Type | Default |
|------|---------|
| `DeepPartial<ChartOptions>` | `{}` |

---

## Returns

`IChartApi` - The chart API interface for interacting with the chart.

---

## Example Usage

### Basic Chart Creation

```javascript
import { createChart } from 'lightweight-charts';

// Using container ID
const chart = createChart('container');

// Using DOM element
const container = document.getElementById('container');
const chart = createChart(container);
```

### Chart with Options

```javascript
import { createChart, ColorType } from 'lightweight-charts';

const chart = createChart(document.getElementById('container'), {
    width: 800,
    height: 500,
    layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: '#333333',
    },
    grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
    },
    crosshair: {
        mode: CrosshairMode.Magnet,
    },
    rightPriceScale: {
        borderColor: '#cccccc',
    },
    timeScale: {
        borderColor: '#cccccc',
        timeVisible: true,
        secondsVisible: false,
    },
});
```

### Responsive Chart

```javascript
const chart = createChart(container, {
    autoSize: true,
});

// Handle window resize
window.addEventListener('resize', () => {
    chart.applyOptions({
        width: container.clientWidth,
        height: container.clientHeight,
    });
});
```

### Dark Theme Chart

```javascript
const chart = createChart(container, {
    layout: {
        background: { type: ColorType.Solid, color: '#1e222d' },
        textColor: '#d1d4dc',
    },
    grid: {
        vertLines: { color: '#2b2b43' },
        horzLines: { color: '#363a45' },
    },
    rightPriceScale: {
        borderColor: '#2b2b43',
    },
    timeScale: {
        borderColor: '#2b2b43',
    },
});
```

---

## Common Chart Options

| Option | Type | Description |
|--------|------|-------------|
| `width` | `number` | Chart width in pixels |
| `height` | `number` | Chart height in pixels |
| `autoSize` | `boolean` | Enable automatic resizing |
| `layout` | `LayoutOptions` | Layout styling options |
| `grid` | `GridOptions` | Grid styling options |
| `crosshair` | `CrosshairOptions` | Crosshair configuration |
| `rightPriceScale` | `PriceScaleOptions` | Right price scale options |
| `leftPriceScale` | `PriceScaleOptions` | Left price scale options |
| `timeScale` | `TimeScaleOptions` | Time scale options |
| `handleScale` | `HandleScaleOptions` | Scale interaction options |
| `handleScroll` | `HandleScrollOptions` | Scroll interaction options |

---

## See Also

- [IChartApi](../interfaces/IChartApi.md)
- [ChartOptions](../type-aliases/ChartOptions.md)
- [createChartEx](./createChartEx.md)
- [remove()](../interfaces/IChartApi.md#remove)
