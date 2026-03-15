# 📚 Lightweight Charts Knowledge Base

TradingView's open-source charting library documentation.

**Files:** 76

---

## 📁 Structure

```
lightweight-charts/
├── docs/
│   ├── api/          # API Reference
│   ├── plugins/      # Plugin System
│   └── tutorials/    # Tutorials
└── tutorials/
    └── how_to/       # How-to Guides
```

---

## 🚀 Quick Start

```typescript
import { createChart, LineSeries } from 'lightweight-charts';

const chart = createChart(document.getElementById('container'), {
  width: 800,
  height: 400,
  layout: {
    background: { color: '#131722' },
    textColor: '#d1d4dc',
  },
});

const lineSeries = chart.addSeries(LineSeries, {
  color: '#2962FF',
  lineWidth: 2,
});

lineSeries.setData([
  { time: '2024-01-01', value: 100 },
  { time: '2024-01-02', value: 105 },
  // ...
]);

chart.timeScale().fitContent();
```

---

## 📊 Series Types

| Series | Type | Description |
|--------|------|-------------|
| Line | `LineSeries` | Line chart |
| Area | `AreaSeries` | Area chart |
| Baseline | `BaselineSeries` | Zero-based area |
| Histogram | `HistogramSeries` | Histogram bars |
| Candlestick | `CandlestickSeries` | OHLC candles |
| Bar | `BarSeries` | OHLC bars |

---

## 🔌 Features

- Multiple panes
- Price scales
- Time scale
- Crosshair
- Markers
- Price lines
- Custom plugins

---

## 🔗 Links

- [GitHub](https://github.com/tradingview/lightweight-charts)
- [Docs](https://tradingview.github.io/lightweight-charts/)
- [Examples](https://tradingview.github.io/lightweight-charts/tutorials/)

---

*Part of CITARION Knowledge Base*
