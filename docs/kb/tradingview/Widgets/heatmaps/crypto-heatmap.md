# Crypto Heatmap Widget

**Source:** https://www.tradingview.com/widget-docs/widgets/heatmaps/crypto-heatmap/

---

## Overview

Visual heatmap showing cryptocurrency market performance with color-coded price changes.

## Widget Type

- **Format:** iframe / Web Component
- **Category:** Heatmaps

## Embed Code (iframe)

```html
<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js" async>
  {
  "dataSource": "Crypto",
  "blockSize": "market_cap_calc",
  "blockColor": "change",
  "locale": "en",
  "symbolUrl": "",
  "colorTheme": "light",
  "hasTopBar": false,
  "isDataSetEnabled": false,
  "isZoomEnabled": true,
  "hasSymbolTooltip": true,
  "width": "100%",
  "height": "500"
}
  </script>
</div>
<!-- TradingView Widget END -->
```

## Configuration Options

| Parameter | Type | Description |
|-----------|------|-------------|
| `dataSource` | string | "Crypto" |
| `blockSize` | string | "market_cap_calc" or "volume_24h_calc" |
| `blockColor` | string | "change" (24h price change) |
| `locale` | string | Language code |
| `colorTheme` | string | "light" or "dark" |
| `hasTopBar` | boolean | Show top toolbar |
| `isDataSetEnabled` | boolean | Show dataset selector |
| `isZoomEnabled` | boolean | Enable zoom |
| `hasSymbolTooltip` | boolean | Show tooltip on hover |
| `width` | string/number | Widget width |
| `height` | string/number | Widget height |

## Color Interpretation

- **Green blocks**: Price increased (darker = larger gain)
- **Red blocks**: Price decreased (darker = larger loss)
- **Block size**: Market cap or 24h volume

## Examples

### Full-Width Heatmap
```html
<script src="https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js">
{
  "dataSource": "Crypto",
  "blockSize": "market_cap_calc",
  "blockColor": "change",
  "colorTheme": "dark",
  "isZoomEnabled": true,
  "width": "100%",
  "height": 600
}
</script>
```

### Compact Heatmap
```html
<script src="https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js">
{
  "dataSource": "Crypto",
  "blockSize": "volume_24h_calc",
  "hasTopBar": false,
  "width": 400,
  "height": 300
}
</script>
```

## AI Agent Usage Notes

- Widget provides visual market overview
- Block size represents market cap by default
- Colors show 24-hour price performance
- Interactive: click blocks for details
- Useful for market sentiment analysis
- Original URL: https://www.tradingview.com/widget-docs/widgets/heatmaps/crypto-heatmap/
