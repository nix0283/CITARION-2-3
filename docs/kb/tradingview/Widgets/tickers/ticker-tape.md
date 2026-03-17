# Ticker Tape Widget

**Source:** https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tape/

---

## Overview

A horizontal scrolling ticker showing real-time prices for multiple symbols.

## Widget Type

- **Format:** iframe / Web Component
- **Category:** Tickers

## Embed Code (iframe)

```html
<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js" async>
  {
  "symbols": [
    {
      "proName": "FOREXCOM:SPXUSD",
      "title": "S&P 500"
    },
    {
      "proName": "FOREXCOM:NSXUSD",
      "title": "Nasdaq 100"
    },
    {
      "proName": "FX_IDC:EURUSD",
      "title": "EUR/USD"
    },
    {
      "proName": "BITSTAMP:BTCUSD",
      "title": "BTC/USD"
    },
    {
      "proName": "BITSTAMP:ETHUSD",
      "title": "ETH/USD"
    }
  ],
  "showSymbolLogo": true,
  "isTransparent": false,
  "displayMode": "adaptive",
  "colorTheme": "light",
  "locale": "en"
}
  </script>
</div>
<!-- TradingView Widget END -->
```

## Web Component (Modern)

```html
<tv-ticker-tape-widget
  symbols='[{"proName":"NASDAQ:AAPL","title":"Apple"},{"proName":"NASDAQ:GOOGL","title":"Google"}]'
  color-theme="light"
  display-mode="adaptive"
></tv-ticker-tape-widget>
```

## Configuration Options

| Parameter | Type | Description |
|-----------|------|-------------|
| `symbols` | array | List of symbols with titles |
| `showSymbolLogo` | boolean | Show exchange logos |
| `isTransparent` | boolean | Transparent background |
| `displayMode` | string | "adaptive", "regular", "compact" |
| `colorTheme` | string | "light" or "dark" |
| `locale` | string | Language code |

## Symbol Object Format

```json
{
  "proName": "EXCHANGE:SYMBOL",
  "title": "Display Name"
}
```

## Examples

### Crypto Ticker
```html
<script src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js">
{
  "symbols": [
    {"proName": "BINANCE:BTCUSDT", "title": "BTC"},
    {"proName": "BINANCE:ETHUSDT", "title": "ETH"},
    {"proName": "BINANCE:SOLUSDT", "title": "SOL"}
  ],
  "colorTheme": "dark"
}
</script>
```

### Forex Ticker
```html
<script src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js">
{
  "symbols": [
    {"proName": "FX:EURUSD", "title": "EUR/USD"},
    {"proName": "FX:GBPUSD", "title": "GBP/USD"},
    {"proName": "FX:USDJPY", "title": "USD/JPY"}
  ]
}
</script>
```

## AI Agent Usage Notes

- Widget auto-scrolls horizontally
- Use `displayMode: "compact"` for mobile
- Symbol format: `EXCHANGE:SYMBOL`
- Supports multiple exchanges: NASDAQ, NYSE, BINANCE, FX, etc.
- Original URL: https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tape/
