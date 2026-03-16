# State Management Documentation

## Table of Contents

1. [Overview](#overview)
2. [Store Architecture](#store-architecture)
3. [State Slices](#state-slices)
   - [Navigation State](#navigation-state)
   - [Account State](#account-state)
   - [Market Data State](#market-data-state)
   - [Positions State](#positions-state)
   - [Trades State](#trades-state)
   - [Signals State](#signals-state)
   - [Chat State](#chat-state)
4. [Actions and Setters](#actions-and-setters)
5. [Computed Properties](#computed-properties)
6. [Persistence](#persistence)
7. [Usage Examples](#usage-examples)
8. [Best Practices](#best-practices)

---

## Overview

The CITARION application uses **Zustand** as its primary state management solution. Zustand provides a lightweight, performant, and boilerplate-free approach to global state management in React applications.

### Key Features

- **Minimal Boilerplate**: No actions, reducers, or dispatchers required
- **Persist Middleware**: Automatic state persistence to localStorage
- **Computed Properties**: Derived state calculations with memoization
- **TypeScript Support**: Full type safety out of the box
- **React Integration**: Hooks-based API for component integration

### Installation

```bash
npm install zustand
```

---

## Store Architecture

### File Location

```
src/stores/crypto-store.ts
```

### Store Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        CryptoStore                               │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │ Navigation  │  │   Account   │  │      Market Data        │ │
│  │ ─────────── │  │ ─────────── │  │ ─────────────────────── │ │
│  │ activeTab   │  │ account     │  │ marketPrices            │ │
│  │ sidebarOpen │  │             │  │                         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │  Positions  │  │   Trades    │  │        Signals          │ │
│  │ ─────────── │  │ ─────────── │  │ ─────────────────────── │ │
│  │ positions[] │  │ trades[]    │  │ signals[]               │ │
│  │ CRUD ops    │  │ CRUD ops    │  │ CRUD ops                │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                         Chat                                 ││
│  │ ─────────────────────────────────────────────────────────── ││
│  │ chatMessages[]  │  addChatMessage  │  clearChat             ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│                    Computed Properties                          │
│  getTotalBalance │ getTotalPnL │ getOpenPositionsCount │ getWinRate│
└─────────────────────────────────────────────────────────────────┘
```

### Store Interface

```typescript
interface CryptoStore {
  // Navigation
  activeTab: string
  setActiveTab: (tab: string) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  
  // Account
  account: Account
  setTradingMode: (mode: TradingMode) => void
  updateVirtualBalance: (balance: Partial<VirtualBalance>) => void
  resetDemoBalance: () => void
  
  // Market Data
  marketPrices: Record<string, MarketPrice>
  setMarketPrices: (prices: Record<string, MarketPrice>) => void
  updateMarketPrice: (symbol: string, price: MarketPrice) => void
  
  // Positions
  positions: Position[]
  setPositions: (positions: Position[]) => void
  addPosition: (position: Position) => void
  updatePosition: (id: string, updates: Partial<Position>) => void
  removePosition: (id: string) => void
  
  // Trades
  trades: Trade[]
  setTrades: (trades: Trade[]) => void
  addTrade: (trade: Trade) => void
  updateTrade: (id: string, updates: Partial<Trade>) => void
  
  // Signals
  signals: Signal[]
  setSignals: (signals: Signal[]) => void
  addSignal: (signal: Signal) => void
  updateSignal: (id: string, updates: Partial<Signal>) => void
  
  // Chat
  chatMessages: ChatMessage[]
  addChatMessage: (message: ChatMessage) => void
  clearChat: () => void
  
  // Computed helpers
  getTotalBalance: () => number
  getTotalPnL: () => { value: number; percent: number }
  getOpenPositionsCount: () => number
  getWinRate: () => number
}
```

---

## State Slices

### Navigation State

The navigation slice manages UI routing and sidebar visibility.

#### State Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `activeTab` | `string` | `"dashboard"` | Current active navigation tab |
| `sidebarOpen` | `boolean` | `true` | Sidebar visibility state |

#### Actions

```typescript
// Set active tab
setActiveTab: (tab: string) => void

// Toggle sidebar
setSidebarOpen: (open: boolean) => void
```

#### Usage

```typescript
// In component
const { activeTab, setActiveTab, sidebarOpen, setSidebarOpen } = useCryptoStore()

// Set tab
setActiveTab('trading')

// Toggle sidebar
setSidebarOpen(!sidebarOpen)
```

---

### Account State

The account slice manages trading account configuration and virtual balance.

#### State Properties

| Property | Type | Description |
|----------|------|-------------|
| `account` | `Account` | Current account configuration |

#### Account Interface

```typescript
interface Account {
  id: string
  accountType: "DEMO" | "PAPER" | "TESTNET" | "LIVE"
  exchangeId: string
  exchangeType: "spot" | "futures"
  exchangeName: string
  virtualBalance: VirtualBalance
  isActive: boolean
  isTestnet: boolean
}
```

#### Virtual Balance Interface

```typescript
interface VirtualBalance {
  USDT: number
  BTC: number
  ETH: number
  BNB: number
  SOL: number
}
```

#### Initial Virtual Balance

```typescript
const INITIAL_VIRTUAL_BALANCE: VirtualBalance = {
  USDT: 10000,
  BTC: 0,
  ETH: 0,
  BNB: 0,
  SOL: 0,
}
```

#### Default Account

```typescript
{
  id: "demo-account",
  accountType: "DEMO",
  exchangeId: "binance",
  exchangeType: "futures",
  exchangeName: "Binance",
  virtualBalance: INITIAL_VIRTUAL_BALANCE,
  isActive: true,
  isTestnet: false,
}
```

#### Actions

```typescript
// Set trading mode
setTradingMode: (mode: TradingMode) => void

// Update virtual balance
updateVirtualBalance: (balance: Partial<VirtualBalance>) => void

// Reset to initial demo balance
resetDemoBalance: () => void
```

#### Trading Modes

| Mode | Description |
|------|-------------|
| `DEMO` | Virtual trading with simulated prices |
| `PAPER` | Virtual trading with real market data |
| `TESTNET` | Exchange testnet trading |
| `LIVE` | Real trading with actual funds |

---

### Market Data State

The market data slice manages real-time cryptocurrency prices.

#### State Properties

| Property | Type | Description |
|----------|------|-------------|
| `marketPrices` | `Record<string, MarketPrice>` | Symbol to price mapping |

#### Market Price Interface

```typescript
interface MarketPrice {
  symbol: string
  price: number
  change24h: number
  high24h: number
  low24h: number
  volume24h: number
}
```

#### Demo Prices (Default)

```typescript
const DEMO_PRICES: Record<string, MarketPrice> = {
  BTCUSDT: { symbol: "BTCUSDT", price: 67432.50, change24h: 2.45, high24h: 68100, low24h: 65800, volume24h: 28500000000 },
  ETHUSDT: { symbol: "ETHUSDT", price: 3521.80, change24h: -0.82, high24h: 3600, low24h: 3450, volume24h: 15200000000 },
  BNBUSDT: { symbol: "BNBUSDT", price: 598.45, change24h: 1.23, high24h: 610, low24h: 585, volume24h: 1850000000 },
  SOLUSDT: { symbol: "SOLUSDT", price: 172.30, change24h: 4.56, high24h: 178, low24h: 162, volume24h: 3200000000 },
  XRPUSDT: { symbol: "XRPUSDT", price: 0.5234, change24h: -1.15, high24h: 0.54, low24h: 0.51, volume24h: 1250000000 },
  DOGEUSDT: { symbol: "DOGEUSDT", price: 0.1542, change24h: 3.28, high24h: 0.16, low24h: 0.148, volume24h: 890000000 },
  ADAUSDT: { symbol: "ADAUSDT", price: 0.4521, change24h: -0.45, high24h: 0.47, low24h: 0.44, volume24h: 450000000 },
  AVAXUSDT: { symbol: "AVAXUSDT", price: 35.82, change24h: 1.89, high24h: 37, low24h: 34.5, volume24h: 380000000 },
}
```

#### Actions

```typescript
// Replace all prices
setMarketPrices: (prices: Record<string, MarketPrice>) => void

// Update single price
updateMarketPrice: (symbol: string, price: MarketPrice) => void
```

---

### Positions State

The positions slice manages open trading positions with full CRUD operations.

#### State Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `positions` | `Position[]` | `[]` | Array of open positions |

#### Position Interface

```typescript
interface Position {
  id: string
  symbol: string
  direction: "LONG" | "SHORT"
  size: number
  entryPrice: number
  markPrice?: number
  leverage?: number
  unrealizedPnl?: number
  liquidationPrice?: number
  stopLoss?: number
  takeProfit?: number
  trailingStop?: TrailingStopConfig
  createdAt: Date
  updatedAt?: Date
}
```

#### Actions

```typescript
// Replace all positions
setPositions: (positions: Position[]) => void

// Add new position
addPosition: (position: Position) => void

// Update existing position
updatePosition: (id: string, updates: Partial<Position>) => void

// Remove position
removePosition: (id: string) => void
```

#### Implementation

```typescript
// setPositions
setPositions: (positions) => set({ positions })

// addPosition
addPosition: (position) => set((state) => ({
  positions: [...state.positions, position]
}))

// updatePosition
updatePosition: (id, updates) => set((state) => ({
  positions: state.positions.map((p) =>
    p.id === id ? { ...p, ...updates } : p
  )
}))

// removePosition
removePosition: (id) => set((state) => ({
  positions: state.positions.filter((p) => p.id !== id)
}))
```

---

### Trades State

The trades slice manages closed trade history with automatic size limiting.

#### State Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `trades` | `Trade[]` | `[]` | Array of closed trades (max 100) |

#### Trade Interface

```typescript
interface Trade {
  id: string
  symbol: string
  direction: "LONG" | "SHORT"
  amount: number
  entryPrice: number
  exitPrice: number
  pnl: number
  status: "OPEN" | "CLOSED"
  openedAt: Date
  closedAt?: Date
  fees?: number
  notes?: string
}
```

#### Actions

```typescript
// Replace all trades
setTrades: (trades: Trade[]) => void

// Add new trade (keeps last 100)
addTrade: (trade: Trade) => void

// Update existing trade
updateTrade: (id: string, updates: Partial<Trade>) => void
```

#### Size Limiting

Trades are automatically limited to the most recent 100:

```typescript
addTrade: (trade) => set((state) => ({
  trades: [trade, ...state.trades].slice(0, 100)
}))
```

---

### Signals State

The signals slice manages trading signals with automatic size limiting.

#### State Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `signals` | `Signal[]` | `[]` | Array of signals (max 50) |

#### Signal Interface

```typescript
interface Signal {
  id: string
  symbol: string
  direction: "LONG" | "SHORT"
  entryPrice?: number
  stopLoss?: number
  takeProfitTargets?: TakeProfitTarget[]
  source: "tradingview" | "telegram" | "manual" | "bot"
  status: "pending" | "executed" | "cancelled" | "expired"
  confidence?: number
  createdAt: Date
  executedAt?: Date
}

interface TakeProfitTarget {
  price: number
  percentage: number
}
```

#### Actions

```typescript
// Replace all signals
setSignals: (signals: Signal[]) => void

// Add new signal (keeps last 50)
addSignal: (signal: Signal) => void

// Update existing signal
updateSignal: (id: string, updates: Partial<Signal>) => void
```

#### Size Limiting

Signals are automatically limited to the most recent 50:

```typescript
addSignal: (signal) => set((state) => ({
  signals: [signal, ...state.signals].slice(0, 50)
}))
```

---

### Chat State

The chat slice manages real-time chat messages with size limiting.

#### State Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `chatMessages` | `ChatMessage[]` | `[]` | Array of messages (max 50) |

#### Chat Message Interface

```typescript
interface ChatMessage {
  id: string
  content: string
  sender: "user" | "bot" | "system"
  timestamp: Date
  metadata?: Record<string, unknown>
}
```

#### Actions

```typescript
// Add message (keeps last 50)
addChatMessage: (message: ChatMessage) => void

// Clear all messages
clearChat: () => void
```

#### Size Limiting

Messages are automatically limited to the most recent 50:

```typescript
addChatMessage: (message) => set((state) => ({
  chatMessages: [...state.chatMessages, message].slice(-50)
}))
```

---

## Actions and Setters

### Action Categories

| Category | Actions | Purpose |
|----------|---------|---------|
| Navigation | `setActiveTab`, `setSidebarOpen` | UI navigation control |
| Account | `setTradingMode`, `updateVirtualBalance`, `resetDemoBalance` | Account configuration |
| Market Data | `setMarketPrices`, `updateMarketPrice` | Price data management |
| Positions | `setPositions`, `addPosition`, `updatePosition`, `removePosition` | Position CRUD |
| Trades | `setTrades`, `addTrade`, `updateTrade` | Trade history management |
| Signals | `setSignals`, `addSignal`, `updateSignal` | Signal management |
| Chat | `addChatMessage`, `clearChat` | Chat functionality |

### Action Patterns

#### Simple Setter

```typescript
setActiveTab: (tab) => set({ activeTab: tab })
```

#### State-Based Update

```typescript
updateVirtualBalance: (balance) => set((state) => ({
  account: {
    ...state.account,
    virtualBalance: { ...state.account.virtualBalance, ...balance } as VirtualBalance
  }
}))
```

#### CRUD Pattern

```typescript
// Create
addPosition: (position) => set((state) => ({
  positions: [...state.positions, position]
}))

// Read (via selector)
const positions = useCryptoStore((state) => state.positions)

// Update
updatePosition: (id, updates) => set((state) => ({
  positions: state.positions.map((p) =>
    p.id === id ? { ...p, ...updates } : p
  )
}))

// Delete
removePosition: (id) => set((state) => ({
  positions: state.positions.filter((p) => p.id !== id)
}))
```

---

## Computed Properties

The store provides several computed properties for derived state calculations.

### getTotalBalance

Calculates total portfolio value in USDT.

```typescript
getTotalBalance: () => {
  const state = get()
  const balance = state.account.virtualBalance
  if (!balance) return 0
  
  let total = balance.USDT || 0
  
  // Convert crypto holdings to USDT
  const prices = state.marketPrices
  if (balance.BTC && prices.BTCUSDT) total += balance.BTC * prices.BTCUSDT.price
  if (balance.ETH && prices.ETHUSDT) total += balance.ETH * prices.ETHUSDT.price
  if (balance.BNB && prices.BNBUSDT) total += balance.BNB * prices.BNBUSDT.price
  if (balance.SOL && prices.SOLUSDT) total += balance.SOL * prices.SOLUSDT.price
  
  return total
}
```

**Returns**: `number` - Total portfolio value in USDT

### getTotalPnL

Calculates total profit/loss from closed trades.

```typescript
getTotalPnL: () => {
  const state = get()
  const closedTrades = state.trades.filter(t => t.status === "CLOSED")
  
  if (closedTrades.length === 0) {
    return { value: 0, percent: 0 }
  }
  
  const totalPnL = closedTrades.reduce((sum, t) => sum + t.pnl, 0)
  const totalInvested = closedTrades.reduce((sum, t) => sum + (t.entryPrice || 0) * t.amount, 0)
  const percent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0
  
  return { value: totalPnL, percent }
}
```

**Returns**: `{ value: number; percent: number }` - PnL value and percentage

### getOpenPositionsCount

Returns the count of open positions.

```typescript
getOpenPositionsCount: () => {
  return get().positions.filter(p => p.direction).length
}
```

**Returns**: `number` - Number of open positions

### getWinRate

Calculates the win rate from closed trades.

```typescript
getWinRate: () => {
  const state = get()
  const closedTrades = state.trades.filter(t => t.status === "CLOSED")
  
  if (closedTrades.length === 0) return 0
  
  const wins = closedTrades.filter(t => t.pnl > 0).length
  return (wins / closedTrades.length) * 100
}
```

**Returns**: `number` - Win rate as percentage (0-100)

---

## Persistence

### Configuration

The store uses Zustand's persist middleware for automatic state persistence.

```typescript
persist(
  storeImplementation,
  {
    name: "crypto-store",
    partialize: (state) => ({
      account: state.account,
      positions: state.positions,
      trades: state.trades,
      signals: state.signals,
      sidebarOpen: state.sidebarOpen,
    }),
  }
)
```

### Persisted Fields

| Field | Persisted | Reason |
|-------|-----------|--------|
| `account` | ✅ Yes | User configuration persists across sessions |
| `positions` | ✅ Yes | Open positions should not be lost |
| `trades` | ✅ Yes | Trade history is valuable |
| `signals` | ✅ Yes | Signal history is valuable |
| `sidebarOpen` | ✅ Yes | UI preference |
| `activeTab` | ❌ No | Always start on dashboard |
| `marketPrices` | ❌ No | Always fetch fresh prices |
| `chatMessages` | ❌ No | Chat is transient |

### Storage Location

Data is stored in `localStorage` under the key `crypto-store`.

### Clearing Persisted Data

```typescript
// Clear all persisted store data
localStorage.removeItem('crypto-store')

// Or use the store's resetDemoBalance action
useCryptoStore.getState().resetDemoBalance()
```

---

## Usage Examples

### Basic Store Access

```typescript
import { useCryptoStore } from '@/stores/crypto-store'

function MyComponent() {
  const activeTab = useCryptoStore((state) => state.activeTab)
  const setActiveTab = useCryptoStore((state) => state.setActiveTab)
  
  return (
    <button onClick={() => setActiveTab('trading')}>
      Current: {activeTab}
    </button>
  )
}
```

### Multiple Values Selection

```typescript
function BalanceDisplay() {
  const { account, marketPrices, getTotalBalance } = useCryptoStore()
  
  const totalBalance = getTotalBalance()
  
  return (
    <div>
      <h2>Total Balance: ${totalBalance.toFixed(2)}</h2>
      <p>USDT: {account.virtualBalance.USDT}</p>
      <p>BTC: {account.virtualBalance.BTC}</p>
    </div>
  )
}
```

### Position Management

```typescript
function PositionManager() {
  const { 
    positions, 
    addPosition, 
    updatePosition, 
    removePosition 
  } = useCryptoStore()
  
  const openPosition = () => {
    addPosition({
      id: crypto.randomUUID(),
      symbol: 'BTCUSDT',
      direction: 'LONG',
      size: 0.1,
      entryPrice: 67000,
      createdAt: new Date(),
    })
  }
  
  const closePosition = (id: string, exitPrice: number) => {
    const position = positions.find(p => p.id === id)
    if (position) {
      // Remove from positions
      removePosition(id)
      
      // Add to trades
      useCryptoStore.getState().addTrade({
        id: crypto.randomUUID(),
        symbol: position.symbol,
        direction: position.direction,
        amount: position.size,
        entryPrice: position.entryPrice,
        exitPrice,
        pnl: (exitPrice - position.entryPrice) * position.size,
        status: 'CLOSED',
        openedAt: position.createdAt,
        closedAt: new Date(),
      })
    }
  }
  
  return (
    <div>
      <button onClick={openPosition}>Open Position</button>
      {positions.map(p => (
        <div key={p.id}>
          <span>{p.symbol} {p.direction}</span>
          <button onClick={() => closePosition(p.id, 68000)}>Close</button>
        </div>
      ))}
    </div>
  )
}
```

### Trading Mode Switch

```typescript
function ModeSwitch() {
  const { account, setTradingMode } = useCryptoStore()
  
  const modes: TradingMode[] = ['DEMO', 'PAPER', 'TESTNET', 'LIVE']
  
  return (
    <select 
      value={account.accountType} 
      onChange={(e) => setTradingMode(e.target.value as TradingMode)}
    >
      {modes.map(mode => (
        <option key={mode} value={mode}>{mode}</option>
      ))}
    </select>
  )
}
```

### Market Price Updates

```typescript
function useMarketPriceUpdates() {
  const updateMarketPrice = useCryptoStore((state) => state.updateMarketPrice)
  
  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr')
    
    ws.onmessage = (event) => {
      const tickers = JSON.parse(event.data)
      tickers.forEach((ticker: any) => {
        if (ticker.s.endsWith('USDT')) {
          updateMarketPrice(ticker.s, {
            symbol: ticker.s,
            price: parseFloat(ticker.c),
            change24h: parseFloat(ticker.P),
            high24h: parseFloat(ticker.h),
            low24h: parseFloat(ticker.l),
            volume24h: parseFloat(ticker.v),
          })
        }
      })
    }
    
    return () => ws.close()
  }, [updateMarketPrice])
}
```

### Signal Management

```typescript
function SignalFeed() {
  const { signals, addSignal, updateSignal } = useCryptoStore()
  
  const handleNewSignal = (signal: Omit<Signal, 'id' | 'createdAt'>) => {
    addSignal({
      ...signal,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    })
  }
  
  const markExecuted = (id: string) => {
    updateSignal(id, { 
      status: 'executed', 
      executedAt: new Date() 
    })
  }
  
  return (
    <div>
      {signals.map(signal => (
        <div key={signal.id}>
          <span>{signal.symbol} {signal.direction}</span>
          <span>{signal.status}</span>
          {signal.status === 'pending' && (
            <button onClick={() => markExecuted(signal.id)}>
              Mark Executed
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
```

### Computed Properties Usage

```typescript
function PerformanceStats() {
  const { getTotalPnL, getWinRate, getOpenPositionsCount } = useCryptoStore()
  
  const pnl = getTotalPnL()
  const winRate = getWinRate()
  const openPositions = getOpenPositionsCount()
  
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <h3>Total P&L</h3>
        <p className={pnl.value >= 0 ? 'text-green-500' : 'text-red-500'}>
          ${pnl.value.toFixed(2)} ({pnl.percent.toFixed(2)}%)
        </p>
      </div>
      <div>
        <h3>Win Rate</h3>
        <p>{winRate.toFixed(1)}%</p>
      </div>
      <div>
        <h3>Open Positions</h3>
        <p>{openPositions}</p>
      </div>
    </div>
  )
}
```

### Chat Integration

```typescript
function ChatPanel() {
  const { chatMessages, addChatMessage, clearChat } = useCryptoStore()
  const [input, setInput] = useState('')
  
  const sendMessage = () => {
    if (!input.trim()) return
    
    addChatMessage({
      id: crypto.randomUUID(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    })
    
    setInput('')
  }
  
  return (
    <div>
      <div className="messages">
        {chatMessages.map(msg => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={clearChat}>Clear Chat</button>
    </div>
  )
}
```

### Reset Demo Account

```typescript
function ResetDemoButton() {
  const resetDemoBalance = useCryptoStore((state) => state.resetDemoBalance)
  
  const handleReset = () => {
    if (confirm('Are you sure? This will reset your balance and clear all positions.')) {
      resetDemoBalance()
    }
  }
  
  return (
    <button onClick={handleReset} className="btn-danger">
      Reset Demo Account
    </button>
  )
}
```

---

## Best Practices

### 1. Use Selectors for Performance

Prefer selecting specific state slices over the entire store:

```typescript
// ❌ Bad - Re-renders on any state change
const store = useCryptoStore()

// ✅ Good - Only re-renders when positions change
const positions = useCryptoStore((state) => state.positions)
```

### 2. Destructure Actions

Destructure actions at the top of your component for cleaner code:

```typescript
function MyComponent() {
  const { addPosition, updatePosition, removePosition } = useCryptoStore()
  // ...
}
```

### 3. Keep Actions Atomic

Each action should do one thing well:

```typescript
// ✅ Good - Single responsibility
addPosition: (position) => set((state) => ({
  positions: [...state.positions, position]
}))

// ❌ Bad - Multiple responsibilities
addPositionAndNotify: (position) => {
  set((state) => ({ positions: [...state.positions, position] }))
  sendNotification('New position opened')
}
```

### 4. Use Computed Properties for Derived State

Don't duplicate derived state in the store:

```typescript
// ❌ Bad - Duplicates derived state
const store = {
  positions: [],
  positionsCount: 0, // Duplicates positions.length
}

// ✅ Good - Use computed property
const count = useCryptoStore((state) => state.getOpenPositionsCount())
```

### 5. Persist Selectively

Only persist essential data to avoid bloat:

```typescript
partialize: (state) => ({
  // ✅ Persist user data
  account: state.account,
  positions: state.positions,
  
  // ❌ Don't persist volatile data
  // marketPrices: state.marketPrices,
  // chatMessages: state.chatMessages,
})
```

### 6. Handle Large Arrays with Limits

Use `slice()` to prevent memory issues:

```typescript
// Keep last 100 trades
addTrade: (trade) => set((state) => ({
  trades: [trade, ...state.trades].slice(0, 100)
}))
```

### 7. Type Safety

Always use TypeScript types for state:

```typescript
interface CryptoStore {
  positions: Position[]  // Not any[]
  addPosition: (position: Position) => void
}
```

### 8. Avoid Nested State Updates

Flatten state when possible, or use proper spread operators:

```typescript
// ✅ Good - Proper nested update
updateVirtualBalance: (balance) => set((state) => ({
  account: {
    ...state.account,
    virtualBalance: {
      ...state.account.virtualBalance,
      ...balance
    }
  }
}))
```

### 9. Use Immer for Complex Updates

For deeply nested state, consider using Immer middleware:

```typescript
import { immer } from 'zustand/middleware/immer'

export const useStore = create(
  immer((set) => ({
    nested: { deep: { value: 0 } },
    update: (val) => set((state) => {
      state.nested.deep.value = val  // Direct mutation with Immer
    }),
  }))
)
```

### 10. Test Store Actions

Write unit tests for store logic:

```typescript
import { useCryptoStore } from './crypto-store'

describe('CryptoStore', () => {
  beforeEach(() => {
    useCryptoStore.setState({ positions: [] })
  })
  
  it('should add a position', () => {
    const position = { id: '1', symbol: 'BTCUSDT' }
    useCryptoStore.getState().addPosition(position)
    
    expect(useCryptoStore.getState().positions).toHaveLength(1)
  })
})
```

---

## Type Exports

The store re-exports all types for convenience:

```typescript
export type { 
  TradingMode, 
  MarketPrice, 
  Position, 
  Trade, 
  Account, 
  VirtualBalance, 
  Signal, 
  ChatMessage 
}
```

---

## Related Documentation

- [Trading System Architecture](../trading/TRADING_SYSTEM_ARCHITECTURE.md)
- [API Specification](../architecture/API_SPECIFICATION.md)
- [Frontend Architecture](../architecture/FRONTEND_ARCHITECTURE.md)
- [Trading Modes and Themes](../components/TRADING_MODES_AND_THEMES.md)

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01 | Initial store implementation |
| 1.1.0 | 2024-02 | Added computed properties |
| 1.2.0 | 2024-03 | Added persist middleware |
| 1.3.0 | 2024-04 | Added signals slice |
| 1.4.0 | 2024-05 | Added chat slice |
