# Chart Components Documentation

**Last Updated:** March 2026  
**Status:** ✅ Complete  
**Coverage:** 100%

---

## Overview

Chart components provide interactive price visualization with trading functionality integration. Built on Lightweight Charts library with custom extensions for trading operations.

---

## Components

### 1. Price Chart (`price-chart.tsx`)

**Purpose:** Main interactive price chart with candlesticks, indicators, and drawing tools.

```typescript
interface PriceChartProps {
  symbol: string;
  interval: Interval;
  exchange: string;
  indicators?: IndicatorConfig[];
  showVolume?: boolean;
  showDepth?: boolean;
}
```

**Features:**
- Multiple chart types (candles, line, area, Heikin-Ashi)
- 200+ technical indicators overlay
- Drawing tools (trend lines, Fibonacci, etc.)
- Multi-timeframe analysis
- Screenshot export
- Full-screen mode

**Indicator Integration:**
```typescript
// lib/indicators/ usage
const indicators = await fetch('/api/indicators', {
  method: 'POST',
  body: JSON.stringify({
    symbol: 'BTCUSDT',
    indicators: ['rsi', 'macd', 'bb']
  })
});
```

**Chart Types:**
- Candlestick (default)
- Heikin-Ashi
- Line
- Area
- Renko
- Kagi
- Line Break
- Range Bars

---

### 2. Mini Chart (`mini-chart.tsx`)

**Purpose:** Compact chart for dashboards and overview displays.

```typescript
interface MiniChartProps {
  symbol: string;
  interval?: '1h' | '4h' | '1d';
  height?: number;
  showPrice?: boolean;
}
```

**Features:**
- Sparkline-style visualization
- Real-time price updates
- Minimal footprint
- Click to expand to full chart

**Usage:**
```tsx
<MiniChart 
  symbol="BTCUSDT" 
  interval="1h" 
  height={60}
  showPrice={true}
/>
```

---

### 3. Multi Chart Panel (`multi-chart-panel.tsx`)

**Purpose:** Display multiple charts simultaneously for correlation analysis.

```typescript
interface MultiChartPanelProps {
  symbols: string[];
  layout: '2x2' | '3x1' | '1x3' | '2x3';
  syncCrosshair?: boolean;
  linkedBy?: 'exchange' | 'quote';
}
```

**Features:**
- 2-6 simultaneous charts
- Synchronized crosshair
- Linked symbol selection
- Save/load layouts
- Individual indicator sets

**Layouts:**
- `2x2` - Four charts in grid
- `3x1` - Three charts horizontal
- `1x3` - Three charts vertical
- `2x3` - Six charts grid

---

### 4. One Click Trading (`one-click-trading.tsx`)

**Purpose:** Quick trade execution directly from chart.

```typescript
interface OneClickTradingProps {
  symbol: string;
  exchange: string;
  positionSize: number;
  defaultStopLoss?: number;
  defaultTakeProfit?: number;
}
```

**Features:**
- Single click order placement
- Visual stop-loss/take-profit lines
- Drag to adjust levels
- Position size display
- Quick reverse position

**Hotkeys:**
| Key | Action |
|-----|--------|
| `B` | Buy at market |
| `S` | Sell at market |
| `L` | Set stop-loss at cursor |
| `T` | Set take-profit at cursor |
| `C` | Close position |

**API Integration:**
```typescript
// One-click trade execution
await fetch('/api/trade/open', {
  method: 'POST',
  body: JSON.stringify({
    symbol: 'BTCUSDT',
    side: 'BUY',
    type: 'MARKET',
    quantity: 0.01
  })
});
```

---

### 5. Order Markers (`order-markers.tsx`)

**Purpose:** Display open orders, positions, and trade history on chart.

```typescript
interface OrderMarkersProps {
  symbol: string;
  showOpenOrders?: boolean;
  showPositions?: boolean;
  showHistory?: boolean;
  historyLimit?: number;
}
```

**Marker Types:**
- 🟢 Buy orders (green triangle up)
- 🔴 Sell orders (red triangle down)
- 📊 Position markers (size display)
- ⏱️ Historical trades (circles)

**Features:**
- Hover for order details
- Drag to modify price
- Right-click to cancel
- PnL display on position markers

**Visual Indicators:**
```typescript
interface OrderMarker {
  id: string;
  price: number;
  side: 'BUY' | 'SELL';
  type: 'LIMIT' | 'STOP' | 'MARKET';
  quantity: number;
  status: 'OPEN' | 'FILLED' | 'CANCELLED';
  pnl?: number;
}
```

---

### 6. Candlestick Patterns Panel (`candlestick-patterns-panel.tsx`)

**Purpose:** Identify and display candlestick patterns.

```typescript
interface CandlestickPatternsPanelProps {
  symbol: string;
  patterns?: PatternType[];
  minConfidence?: number;
}
```

**Detected Patterns:**

#### Bullish Patterns
- Hammer
- Inverted Hammer
- Bullish Engulfing
- Morning Star
- Three White Soldiers
- Piercing Line

#### Bearish Patterns
- Hanging Man
- Shooting Star
- Bearish Engulfing
- Evening Star
- Three Black Crows
- Dark Cloud Cover

#### Neutral Patterns
- Doji
- Spinning Top
- High Wave

**Pattern Structure:**
```typescript
interface DetectedPattern {
  pattern: PatternType;
  timestamp: number;
  confidence: number;
  direction: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  priceTarget?: number;
}
```

---

## Chart Integration

### Indicator Overlay

```typescript
// Adding indicator to chart
const addIndicator = (indicator: IndicatorConfig) => {
  chart.addIndicator({
    id: indicator.id,
    type: indicator.type,
    params: indicator.params,
    pane: indicator.overlay ? 'main' : 'below'
  });
};
```

### Drawing Tools

```typescript
// Drawing tool types
type DrawingTool = 
  | 'trend_line'
  | 'horizontal_line'
  | 'vertical_line'
  | 'rectangle'
  | 'fibonacci_retracement'
  | 'pitchfork'
  | 'xabcd';
```

### Time Scale Navigation

```typescript
// Time scale controls
chart.timeScale().setVisibleRange({
  from: startDate.getTime() / 1000,
  to: endDate.getTime() / 1000
});

// Scroll to real-time
chart.timeScale().scrollToRealTime();
```

---

## WebSocket Events

| Event | Description | Handler |
|-------|-------------|---------|
| `kline:update` | Candle update | PriceChart |
| `order:new` | New order marker | OrderMarkers |
| `position:update` | Position change | OrderMarkers |
| `trade:executed` | Trade execution | OrderMarkers |

---

## State Management

```typescript
// Chart state
interface ChartState {
  symbol: string;
  interval: Interval;
  indicators: Indicator[];
  drawings: Drawing[];
  orders: OrderMarker[];
  
  // Actions
  setSymbol: (symbol: string) => void;
  setInterval: (interval: Interval) => void;
  addIndicator: (indicator: Indicator) => void;
  removeIndicator: (id: string) => void;
}
```

---

## Performance

### Optimization Techniques

1. **Data Throttling:** OHLCV data updates throttled to 100ms
2. **WebGL Rendering:** GPU-accelerated chart rendering
3. **Lazy Indicator Calculation:** Indicators calculated on-demand
4. **Memory Management:** Historical data limited to 10,000 candles

### Data Management

```typescript
// Efficient data loading
const loadHistoricalData = async (symbol: string, interval: Interval) => {
  const data = await fetch(`/api/ohlcv?symbol=${symbol}&interval=${interval}&limit=1000`);
  return data.json();
};
```

---

## Trading Integration

### Order from Chart

```typescript
// Place order via chart interaction
const placeOrderFromChart = async (price: number, side: 'BUY' | 'SELL') => {
  const order = {
    symbol,
    side,
    type: 'LIMIT',
    price,
    quantity: calculatePositionSize()
  };
  
  await fetch('/api/trade/open', {
    method: 'POST',
    body: JSON.stringify(order)
  });
};
```

### Position Management

```typescript
// Modify position from chart
const modifyStopLoss = async (positionId: string, newStopLoss: number) => {
  await fetch('/api/positions/escort', {
    method: 'PUT',
    body: JSON.stringify({
      positionId,
      stopLoss: newStopLoss
    })
  });
};
```

---

## Accessibility

- Keyboard navigation for chart panning
- Audio alerts for price levels
- High contrast mode support
- Screen reader announcements for trades

---

## Example Usage

```tsx
import { PriceChart, OrderMarkers, OneClickTrading } from '@/components/chart';

function TradingView({ symbol }: { symbol: string }) {
  return (
    <div className="relative h-full">
      <PriceChart 
        symbol={symbol}
        interval="1h"
        indicators={[
          { id: 'ema20', type: 'ema', params: { period: 20 } },
          { id: 'ema50', type: 'ema', params: { period: 50 } },
          { id: 'rsi', type: 'rsi', params: { period: 14 }, overlay: false }
        ]}
        showVolume={true}
      />
      <OrderMarkers symbol={symbol} />
      <OneClickTrading 
        symbol={symbol} 
        positionSize={0.01}
        defaultStopLoss={2}
        defaultTakeProfit={4}
      />
    </div>
  );
}
```

---

*Documentation for CITARION Algorithmic Trading Platform*
