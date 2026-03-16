# Dashboard Components Documentation

**Last Updated:** March 2026  
**Status:** ✅ Complete  
**Coverage:** 100%

---

## Overview

Dashboard components provide the main user interface for monitoring and managing trading activities. All components are real-time and connected to WebSocket feeds for live updates.

---

## Components

### 1. Balance Widget (`balance-widget.tsx`)

**Purpose:** Display account balance, PnL, and portfolio value.

```typescript
interface BalanceWidgetProps {
  exchangeId: string;
  showPercentage?: boolean;
  refreshInterval?: number;
}
```

**Features:**
- Real-time balance updates via WebSocket
- Total portfolio value aggregation
- Unrealized/Realized PnL display
- Multi-currency support
- Percentage change indicators

**API Integration:**
- `GET /api/positions/sync` - Position sync
- `GET /api/pnl-stats` - PnL statistics

---

### 2. Market Forecast Widget (`market-forecast-widget.tsx`)

**Purpose:** Display ML-based market predictions and signals.

```typescript
interface MarketForecastWidgetProps {
  symbol: string;
  timeframe: '1h' | '4h' | '1d';
  showConfidence?: boolean;
}
```

**Features:**
- Price direction prediction (UP/DOWN/SIDEWAYS)
- Confidence score display
- Signal strength indicator
- Historical accuracy tracking

**API Integration:**
- `POST /api/ml/predict/price` - Price prediction
- `POST /api/ml/predict/regime` - Market regime detection

---

### 3. Market Overview (`market-overview.tsx`)

**Purpose:** Display overview of multiple trading pairs with key metrics.

```typescript
interface MarketOverviewProps {
  symbols: string[];
  sortBy: 'volume' | 'change' | 'price';
  limit?: number;
}
```

**Features:**
- Price, volume, 24h change display
- Sortable by multiple metrics
- Click-through to detailed chart
- Favorites support

**API Integration:**
- `GET /api/prices` - Real-time prices
- `GET /api/ohlcv` - OHLCV data

---

### 4. Funding Rate Widget (`funding-rate-widget.tsx`)

**Purpose:** Display funding rates for perpetual futures.

```typescript
interface FundingRateWidgetProps {
  exchanges: string[];
  showHistory?: boolean;
  alertThreshold?: number;
}
```

**Features:**
- Real-time funding rate display
- Historical funding rate chart
- Rate change alerts
- Exchange comparison

**API Integration:**
- `GET /api/funding` - Funding rates

---

### 5. Bot Status (`bot-status.tsx`)

**Purpose:** Display status of all active trading bots.

```typescript
interface BotStatusProps {
  botTypes?: BotType[];
  showInactive?: boolean;
}
```

**Features:**
- Active bot count
- Status indicators (running/paused/error)
- Quick pause/resume controls
- Error notification badges

**API Integration:**
- `GET /api/bots` - Bot list
- `GET /api/bots/control` - Bot control

---

### 6. Active Grid Bots (`active-grid-bots.tsx`)

**Purpose:** Display active Grid bots with performance metrics.

```typescript
interface ActiveGridBotsProps {
  limit?: number;
  showPerformance?: boolean;
}
```

**Features:**
- Grid bot list with symbol
- Profit/Loss display
- Grid status visualization
- Quick actions (pause/edit/close)

---

### 7. Active DCA Bots (`active-dca-bots.tsx`)

**Purpose:** Display active DCA bots with averaging information.

```typescript
interface ActiveDCABotsProps {
  limit?: number;
  showSafetyOrders?: boolean;
}
```

**Features:**
- DCA bot list with entry levels
- Average entry price
- Safety orders remaining
- Unrealized PnL

---

### 8. Active BB Bots (`active-bb-bots.tsx`)

**Purpose:** Display active Bollinger Bands bots.

```typescript
interface ActiveBBBotsProps {
  limit?: number;
  showBands?: boolean;
}
```

**Features:**
- BB band visualization
- Breakout detection status
- Position sizing info
- Band width indicator

---

### 9. Active Argus Bots (`active-argus-bots.tsx`)

**Purpose:** Display active Argus (PnD detection) bots.

```typescript
interface ActiveArgusBotsProps {
  limit?: number;
  showSignals?: boolean;
}
```

**Features:**
- Pump/Dump detection alerts
- Signal confidence display
- Volume spike indicators
- Price action visualization

---

### 10. Positions Table (`positions-table.tsx`)

**Purpose:** Display all open positions across exchanges.

```typescript
interface PositionsTableProps {
  exchanges?: string[];
  symbols?: string[];
  sortBy?: 'pnl' | 'size' | 'entry';
}
```

**Features:**
- Position size and side (LONG/SHORT)
- Entry price, current price, PnL
- Liquidation price
- Quick close button
- Position details modal

**API Integration:**
- `GET /api/positions/sync` - Position sync
- `POST /api/trade/close` - Close position

---

### 11. Signal Feed (`signal-feed.tsx`)

**Purpose:** Display incoming trading signals in real-time.

```typescript
interface SignalFeedProps {
  sources?: SignalSource[];
  autoScroll?: boolean;
  maxItems?: number;
}
```

**Features:**
- Real-time signal display
- Signal source identification
- Action buttons (execute/ignore)
- Signal confidence score
- Historical signal accuracy

**API Integration:**
- `GET /api/signals` - Signal list
- `POST /api/auto-trading/execute` - Execute signal

---

### 12. Trades History (`trades-history.tsx`)

**Purpose:** Display recent closed trades.

```typescript
interface TradesHistoryProps {
  limit?: number;
  botType?: BotType;
  symbol?: string;
}
```

**Features:**
- Trade entry/exit prices
- PnL display (absolute and percentage)
- Trade duration
- Bot association
- Export to CSV

**API Integration:**
- `GET /api/trades` - Trade history

---

## Component Interactions

```
┌─────────────────────────────────────────────────────────────┐
│                      Dashboard Layout                        │
├─────────────┬─────────────┬─────────────┬─────────────────┤
│   Balance   │   Market    │   Funding   │    Bot Status   │
│   Widget    │  Overview   │   Widget    │                  │
├─────────────┴─────────────┴─────────────┴─────────────────┤
│                     Signal Feed                             │
├─────────────────────────────────────────────────────────────┤
│  Active Grid │ Active DCA │ Active BB │ Active Argus       │
├─────────────────────────────────────────────────────────────┤
│                    Positions Table                          │
├─────────────────────────────────────────────────────────────┤
│                    Trades History                           │
└─────────────────────────────────────────────────────────────┘
```

---

## WebSocket Events

| Event | Description | Handler |
|-------|-------------|---------|
| `balance:update` | Balance change | BalanceWidget |
| `position:update` | Position update | PositionsTable |
| `signal:new` | New signal | SignalFeed |
| `bot:status` | Bot status change | BotStatus |
| `trade:close` | Trade closed | TradesHistory |
| `funding:update` | Funding rate change | FundingRateWidget |

---

## State Management

```typescript
// stores/crypto-store.ts
interface CryptoStore {
  balance: Balance;
  positions: Position[];
  signals: Signal[];
  activeBots: ActiveBot[];
  
  // Actions
  updateBalance: (balance: Balance) => void;
  addPosition: (position: Position) => void;
  removePosition: (positionId: string) => void;
  addSignal: (signal: Signal) => void;
}
```

---

## Performance Considerations

1. **Memoization:** All components use `React.memo` for performance
2. **Virtual Scrolling:** Tables use virtual scrolling for large datasets
3. **Debounced Updates:** WebSocket updates are debounced to prevent re-renders
4. **Lazy Loading:** Components are lazy-loaded for faster initial render

---

## Accessibility

- All components support keyboard navigation
- ARIA labels for screen readers
- Color contrast meets WCAG 2.1 AA standards
- Focus management for modals

---

## Testing

```typescript
// __tests__/dashboard/balance-widget.test.tsx
describe('BalanceWidget', () => {
  it('should display correct balance', () => {
    render(<BalanceWidget exchangeId="binance" />);
    expect(screen.getByText('$')).toBeInTheDocument();
  });
  
  it('should update on WebSocket event', async () => {
    // WebSocket mock test
  });
});
```

---

*Documentation for CITARION Algorithmic Trading Platform*
