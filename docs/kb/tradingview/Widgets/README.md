# TradingView Widgets Documentation

This folder contains TradingView widget documentation with complete code examples.

## Statistics
- **Total markdown files**: 52
- **Images**: 0 (not needed - all code-based)
- **Code examples**: Full embed code for each widget

## Structure

```
Widgets/
├── charts/
│   ├── advanced-chart.md    # Full chart with customization
│   ├── mini-chart.md        # Compact chart widget
│   └── symbol-overview.md   # Symbol overview widget
├── tickers/
│   ├── ticker.md            # Single ticker
│   ├── ticker-tape.md       # Scrolling ticker tape
│   ├── single-ticker.md     # Single symbol ticker
│   └── ticker-tag.md        # Ticker tag widget
├── heatmaps/
│   ├── crypto-heatmap.md    # Crypto market heatmap
│   ├── stock-heatmap.md     # Stock market heatmap
│   ├── etf-heatmap.md       # ETF heatmap
│   ├── forex-heatmap.md     # Forex heatmap
│   └── forex-cross-rates.md # Forex cross rates
├── screeners/
│   ├── screener.md          # Stock screener
│   └── crypto-mkt-screener.md # Crypto market screener
├── watchlists/
│   ├── market-overview.md   # Market overview widget
│   ├── market-quotes.md     # Market quotes
│   ├── market-summary.md    # Market summary
│   └── stock-market.md      # Stock market widget
├── symbol-details/
│   ├── symbol-info.md       # Symbol information
│   ├── company-profile.md   # Company profile
│   ├── fundamental-data.md  # Fundamental data
│   └── technical-analysis.md # Technical analysis
├── news/
│   └── top-stories.md       # Top news stories
├── calendars/
│   └── economic-calendar.md # Economic calendar
├── economics/
│   └── economic-map.md      # Economic map
├── tutorials/
│   ├── web-components/      # Web Component tutorials
│   └── iframe/              # iframe tutorials
├── getting-started.md       # Getting started guide
├── widget-formats.md        # iframe vs Web Components
├── theme-builder.md         # Theme customization
├── accessibility.md         # Accessibility guide
└── faq-*.md                 # FAQ sections
```

## Widget Types

### iframe Format
Traditional embedding using `<script>` tags:
```html
<script src="https://s3.tradingview.com/external-embedding/embed-widget-*.js">
{
  "symbol": "NASDAQ:AAPL",
  "theme": "light"
}
</script>
```

### Web Component Format (Modern)
Using custom HTML elements:
```html
<tv-advanced-chart-widget
  symbol="NASDAQ:AAPL"
  theme="light"
></tv-advanced-chart-widget>
```

## Common Symbol Formats

| Market | Format | Example |
|--------|--------|---------|
| US Stocks | EXCHANGE:SYMBOL | NASDAQ:AAPL, NYSE:IBM |
| Crypto | EXCHANGE:PAIR | BINANCE:BTCUSDT |
| Forex | FX:PAIR | FX:EURUSD |
| Indices | EXCHANGE:INDEX | FOREXCOM:SPXUSD |
| Futures | EXCHANGE:CONTRACT | CME_MINI:ES1! |

## AI Agent Usage

Each document includes:
1. **Widget overview** - What it does
2. **Complete embed code** - Ready to use
3. **Configuration options** - All parameters explained
4. **Examples** - Common use cases
5. **Symbol format** - How to specify trading symbols

## Source
All content from: https://www.tradingview.com/widget-docs/

## Note on Images
This folder contains **no images** because:
- Widget documentation is code-based
- Screenshots would only show widget appearance
- The embed code is more useful for developers
- AI agents can understand widgets from code alone
