# Mini Chart Widget

**Source:** https://www.tradingview.com/widget-docs/widgets/charts/mini-chart/

---

## Overview

A compact, lightweight chart widget perfect for showing price trends in small spaces.

## Widget Type

- **Format:** iframe / Web Component
- **Category:** Charts

## Embed Code (iframe)

```html
<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js" async>
  {
  "symbol": "NASDAQ:AAPL",
  "width": "350",
  "height": "220",
  "locale": "en",
  "dateRange": "12M",
  "colorTheme": "light",
  "isTransparent": false,
  "autosize": false,
  "largeChartUrl": ""
}
  </script>
</div>
<!-- TradingView Widget END -->
```

## Web Component (Modern)

```html
<tv-mini-symbol-overview
  symbol="NASDAQ:AAPL"
  date-range="12M"
  color-theme="light"
></tv-mini-symbol-overview>
```

## Configuration Options

| Parameter | Type | Description |
|-----------|------|-------------|
| `symbol` | string | Trading symbol |
| `width` | string/number | Widget width |
| `height` | string/number | Widget height |
| `locale` | string | Language code |
| `dateRange` | string | "1D", "1M", "3M", "12M", "60M", "ALL" |
| `colorTheme` | string | "light" or "dark" |
| `isTransparent` | boolean | Transparent background |
| `autosize` | boolean | Auto-resize to container |
| `largeChartUrl` | string | URL for clicking chart |

## Examples

### Bitcoin Mini Chart
```html
<script src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js">
{
  "symbol": "BINANCE:BTCUSDT",
  "dateRange": "3M",
  "colorTheme": "dark",
  "isTransparent": true
}
</script>
```

### Forex Mini Chart
```html
<script src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js">
{
  "symbol": "FX:EURUSD",
  "dateRange": "1M",
  "width": 300,
  "height": 150
}
</script>
```

### Responsive Mini Chart
```html
<div style="width: 100%; height: 200px;">
  <script src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js">
  {
    "symbol": "NYSE:TSLA",
    "autosize": true
  }
  </script>
</div>
```

## AI Agent Usage Notes

- Ideal for dashboards, sidebars, and compact displays
- Use `autosize: true` for responsive layouts
- `largeChartUrl` allows linking to full chart
- `dateRange` options: 1D, 1M, 3M, 12M, 60M, ALL
- Original URL: https://www.tradingview.com/widget-docs/widgets/charts/mini-chart/
