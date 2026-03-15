# 📚 Pine Script Knowledge Base

Pine Script programming language reference for TradingView indicators.

**Files:** 72

---

## 📁 Structure

```
pine-script/
├── Language/          # Language Reference
├── Concepts/          # Core Concepts
├── Visuals/           # Visual Elements
├── Writing/           # Writing Guides
├── Migration/         # Version Migration
├── Release/           # Release Notes
├── Errors/            # Error Reference
└── FAQ/               # Frequently Asked Questions
```

---

## 🎯 Key Concepts

### Script Structure
```pine
//@version=5
indicator("My Indicator", overlay=true)

// Input parameters
length = input.int(14, "Length")

// Calculation
rsiValue = ta.rsi(close, length)

// Plot
plot(rsiValue, "RSI", color=color.blue)
```

### Available Namespaces

| Namespace | Description |
|-----------|-------------|
| `ta.` | Technical Analysis |
| `math.` | Mathematical functions |
| `str.` | String operations |
| `array.` | Array operations |
| `matrix.` | Matrix operations |
| `map.` | Key-value maps |
| `request.` | External data |
| `chart.` | Chart display |
| `input.` | User inputs |
| `strategy.` | Strategy testing |

---

## 📊 Indicator Types

| Type | Description |
|------|-------------|
| `indicator` | Overlay or pane indicator |
| `strategy` | Backtestable strategy |
| `library` | Reusable code module |

---

## 🔗 Links

- [Pine Script Docs](https://www.tradingview.com/pine-script-docs/)
- [Pine Script Reference](https://www.tradingview.com/pine-script-reference/)
- [Pine Script v5 Migration](https://www.tradingview.com/pine-script-docs/en/v5/migration_guide.html)

---

*Part of CITARION Knowledge Base*
