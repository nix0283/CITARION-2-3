# Market Overview Widget

**Source:** https://www.tradingview.com/widget-docs/widgets/watchlists/market-overview/

---

## Overview

A comprehensive market overview widget showing multiple symbols with prices, changes, and mini charts.

## Widget Type

- **Format:** iframe / Web Component
- **Category:** Watchlists

## Embed Code (iframe)

```html
<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js" async>
  {
  "symbolsGroups": [
    {
      "name": "Indices",
      "originalName": "Indices",
      "symbols": [
        {"symbol": "FOREXCOM:SPXUSD", "displayName": "S&P 500"},
        {"symbol": "FOREXCOM:NSXUSD", "displayName": "Nasdaq 100"},
        {"symbol": "INDEX:DJI", "displayName": "Dow 30"}
      ]
    },
    {
      "name": "Commodities",
      "originalName": "Commodities",
      "symbols": [
        {"symbol": "CME_MINI:ES1!", "displayName": "S&P 500"},
        {"symbol": "CME:6E1!", "displayName": "EUR"},
        {"symbol": "COMEX:GC1!", "displayName": "Gold"}
      ]
    }
  ],
  "showSymbolLogo": true,
  "isTransparent": false,
  "colorTheme": "light",
  "locale": "en",
  "width": "100%",
  "height": "600"
}
  </script>
</div>
<!-- TradingView Widget END -->
```

## Configuration Options

| Parameter | Type | Description |
|-----------|------|-------------|
| `symbolsGroups` | array | Groups of symbols |
| `showSymbolLogo` | boolean | Show exchange logos |
| `isTransparent` | boolean | Transparent background |
| `colorTheme` | string | "light" or "dark" |
| `locale` | string | Language code |
| `width` | string/number | Widget width |
| `height` | string/number | Widget height |

## Symbols Group Format

```json
{
  "name": "Group Display Name",
  "originalName": "Original Name",
  "symbols": [
    {
      "symbol": "EXCHANGE:SYMBOL",
      "displayName": "Display Name"
    }
  ]
}
```

## Examples

### Stocks Watchlist
```html
<script src="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js">
{
  "symbolsGroups": [
    {
      "name": "Tech Stocks",
      "symbols": [
        {"symbol": "NASDAQ:AAPL", "displayName": "Apple"},
        {"symbol": "NASDAQ:GOOGL", "displayName": "Google"},
        {"symbol": "NASDAQ:MSFT", "displayName": "Microsoft"},
        {"symbol": "NASDAQ:AMZN", "displayName": "Amazon"}
      ]
    }
  ],
  "colorTheme": "dark"
}
</script>
```

### Crypto Portfolio
```html
<script src="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js">
{
  "symbolsGroups": [
    {
      "name": "Major Crypto",
      "symbols": [
        {"symbol": "BINANCE:BTCUSDT", "displayName": "Bitcoin"},
        {"symbol": "BINANCE:ETHUSDT", "displayName": "Ethereum"},
        {"symbol": "BINANCE:SOLUSDT", "displayName": "Solana"}
      ]
    }
  ]
}
</script>
```

### Multi-Asset Overview
```html
<script src="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js">
{
  "symbolsGroups": [
    {
      "name": "Indices",
      "symbols": [{"symbol": "FOREXCOM:SPXUSD", "displayName": "S&P 500"}]
    },
    {
      "name": "Forex",
      "symbols": [{"symbol": "FX:EURUSD", "displayName": "EUR/USD"}]
    },
    {
      "name": "Crypto",
      "symbols": [{"symbol": "BINANCE:BTCUSDT", "displayName": "BTC/USD"}]
    }
  ]
}
</script>
```

## AI Agent Usage Notes

- Groups organize symbols into collapsible sections
- Shows real-time prices with percentage change
- Mini sparkline charts for each symbol
- Clicking symbols opens TradingView chart
- Original URL: https://www.tradingview.com/widget-docs/widgets/watchlists/market-overview/
