# Advanced Chart Widget

**Source:** https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/

---

## Overview

The Advanced Real-Time Chart is a free and powerful chart widget that can be easily embedded in any website. It offers a ton of customization options.

## Widget Type

- **Format:** iframe
- **Category:** Charts

## Embed Code (iframe)

```html
<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container" style="height:100%;width:100%">
  <div id="tradingview_chart" style="height:100%;width:100%"></div>
  <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
  <script type="text/javascript">
  new TradingView.widget(
  {
  "autosize": true,
  "symbol": "NASDAQ:AAPL",
  "interval": "D",
  "timezone": "Etc/UTC",
  "theme": "light",
  "style": "1",
  "locale": "en",
  "toolbar_bg": "#f1f3f6",
  "enable_publishing": false,
  "hide_side_toolbar": false,
  "allow_symbol_change": true,
  "watchlist": [
    "NASDAQ:AAPL",
    "NASDAQ:GOOGL",
    "NASDAQ:MSFT"
  ],
  "details": true,
  "hotlist": true,
  "calendar": false,
  "container_id": "tradingview_chart"
}
  );
  </script>
</div>
<!-- TradingView Widget END -->
```

## Widget Configuration Options

| Parameter | Type | Description |
|-----------|------|-------------|
| `autosize` | boolean | Auto-resize to container |
| `symbol` | string | Trading symbol (e.g., "NASDAQ:AAPL") |
| `interval` | string | Time interval (1, 5, 15, 60, D, W, M) |
| `timezone` | string | Timezone (e.g., "Etc/UTC") |
| `theme` | string | "light" or "dark" |
| `style` | string | Chart style (1=candles, 2=line, etc.) |
| `locale` | string | Language code |
| `toolbar_bg` | string | Toolbar background color |
| `enable_publishing` | boolean | Show share button |
| `hide_side_toolbar` | boolean | Hide side toolbar |
| `allow_symbol_change` | boolean | Allow users to change symbol |
| `watchlist` | array | List of symbols for watchlist |
| `details` | boolean | Show details panel |
| `hotlist` | boolean | Show hotlist |
| `calendar` | boolean | Show economic calendar |
| `container_id` | string | DOM element ID |

## React Component (Web Component)

```jsx
import { AdvancedChart } from 'react-tradingview-widget';

<AdvancedChart
  symbol="NASDAQ:AAPL"
  theme="light"
  locale="en"
  autosize
/>
```

## Common Use Cases

### Basic Stock Chart
```html
<div class="tradingview-widget-container">
  <div id="chart"></div>
  <script src="https://s3.tradingview.com/tv.js"></script>
  <script>
  new TradingView.widget({
    "symbol": "NYSE:IBM",
    "interval": "D",
    "container_id": "chart"
  });
  </script>
</div>
```

### Crypto Chart
```html
<script>
new TradingView.widget({
  "symbol": "BINANCE:BTCUSDT",
  "interval": "60",
  "theme": "dark"
});
</script>
```

### Forex Chart
```html
<script>
new TradingView.widget({
  "symbol": "FX:EURUSD",
  "interval": "15"
});
</script>
```

## AI Agent Usage Notes

- This widget requires the TradingView JavaScript library (`tv.js`)
- Use `autosize: true` for responsive containers
- Set proper height on container element
- Symbol format: `EXCHANGE:SYMBOL` (e.g., `NASDAQ:AAPL`, `BINANCE:BTCUSDT`)
- Original URL: https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/
