# TypeScript Types Documentation

This document provides comprehensive documentation for all TypeScript types used in the CITARION trading platform.

## Table of Contents

1. [Overview](#overview)
2. [Trading Types](#trading-types)
3. [Market Data Types](#market-data-types)
4. [Account Types](#account-types)
5. [Bot Configuration Types](#bot-configuration-types)
6. [API Response Types](#api-response-types)
7. [WebSocket Message Types](#websocket-message-types)
8. [Funding & PnL Types](#funding--pnl-types)
9. [Usage Examples](#usage-examples)
10. [Type Guards](#type-guards)

---

## Overview

All TypeScript types are exported from `/src/types/index.ts`. These types provide type safety across the entire application, including:

- **Trading Operations**: Positions, trades, signals
- **Market Data**: Prices, volumes, funding rates
- **Account Management**: Virtual balances, exchange accounts
- **Bot Configuration**: Grid, DCA, BB bot settings
- **API Communication**: Request/response types
- **WebSocket Messages**: Real-time data streaming

### Import Convention

```typescript
// Import all types from the central types module
import type {
  Position,
  Trade,
  Signal,
  MarketPrice,
  Account,
  // ... other types
} from "@/types"
```

---

## Trading Types

### TradingMode

Defines the operational mode for trading activities.

```typescript
export type TradingMode = "DEMO" | "REAL"
```

| Value | Description |
|-------|-------------|
| `DEMO` | Virtual trading with simulated positions and balance |
| `REAL` | Live trading with real funds on connected exchanges |

**Usage:**

```typescript
const mode: TradingMode = "DEMO"

// Mode-aware operations
if (mode === "DEMO") {
  // Use virtual balance simulation
} else {
  // Execute real trades on exchange
}
```

---

### Position

Represents an active trading position with full tracking details.

```typescript
export interface Position {
  id: string                    // Unique position identifier
  symbol: string                // Trading pair (e.g., "BTCUSDT")
  direction: "LONG" | "SHORT"   // Position direction
  totalAmount: number           // Total position size in base currency
  avgEntryPrice: number         // Weighted average entry price
  currentPrice: number          // Current market price
  leverage: number              // Applied leverage (1-125x)
  unrealizedPnl: number         // Unrealized profit/loss in quote currency
  stopLoss?: number | null      // Stop loss price level
  takeProfit?: number | null    // Take profit price level
  trailingStop?: TrailingStopConfig | null  // Trailing stop configuration
  // Funding tracking
  totalFundingPaid?: number     // Total funding fees paid
  totalFundingReceived?: number // Total funding fees received
  lastFundingTime?: string | null  // ISO timestamp of last funding
  // Fees
  openFee?: number              // Opening fee amount
  closeFee?: number             // Estimated closing fee
  isDemo: boolean               // Whether this is a demo position
  createdAt: string             // ISO timestamp of position creation
  updatedAt: string             // ISO timestamp of last update
}
```

**Example Position:**

```typescript
const position: Position = {
  id: "pos_abc123",
  symbol: "BTCUSDT",
  direction: "LONG",
  totalAmount: 0.1,
  avgEntryPrice: 45000,
  currentPrice: 46500,
  leverage: 10,
  unrealizedPnl: 150,
  stopLoss: 44000,
  takeProfit: 48000,
  trailingStop: {
    type: "PERCENT",
    value: 2,
    activated: true,
    highestPrice: 46800
  },
  totalFundingPaid: 5.23,
  totalFundingReceived: 2.10,
  lastFundingTime: "2024-01-15T08:00:00Z",
  isDemo: false,
  createdAt: "2024-01-14T10:30:00Z",
  updatedAt: "2024-01-15T12:45:00Z"
}
```

---

### TrailingStopConfig

Configuration for dynamic stop loss that follows price movements.

```typescript
export interface TrailingStopConfig {
  type: "PERCENT" | "ATR" | "PRICE"  // Trailing method
  value: number                       // Trailing distance value
  activated: boolean                  // Whether trailing is active
  highestPrice?: number               // Highest price seen (for calculation)
}
```

| Type | Description | Value Unit |
|------|-------------|------------|
| `PERCENT` | Trail by percentage below highest price | Percentage (e.g., 2 = 2%) |
| `ATR` | Trail by ATR multiplier | ATR multiplier (e.g., 1.5) |
| `PRICE` | Trail by fixed price distance | Price units (e.g., 500 USDT) |

---

### Trade

Complete record of a trade from entry to exit.

```typescript
export interface Trade {
  id: string                              // Unique trade identifier
  symbol: string                          // Trading pair
  direction: "LONG" | "SHORT"             // Trade direction
  status: "PENDING" | "OPEN" | "CLOSED" | "CANCELLED"  // Trade status
  entryPrice?: number                     // Actual entry price
  exitPrice?: number                      // Exit price (if closed)
  amount: number                          // Trade amount in base currency
  leverage: number                        // Applied leverage
  pnl: number                             // Realized profit/loss
  pnlPercent: number                      // PnL as percentage
  fee: number                             // Total fees paid
  stopLoss?: number | null                // Stop loss level
  takeProfits?: TakeProfitTarget[]        // Multiple TP targets
  closeReason?: "TP" | "SL" | "MANUAL" | "LIQUIDATION" | "TRAILING_STOP"
  signalSource?: "TELEGRAM" | "DISCORD" | "TRADINGVIEW" | "MANUAL"
  isDemo: boolean                         // Demo trade flag
  createdAt: string                       // Trade creation timestamp
  closedAt?: string                       // Trade closure timestamp
}
```

**Trade Status Flow:**

```
PENDING → OPEN → CLOSED
   ↓         ↓
CANCELLED  CANCELLED
```

---

### TakeProfitTarget

Individual take profit target with partial close support.

```typescript
export interface TakeProfitTarget {
  price: number       // Target price level
  percentage: number  // Percentage of position to close (1-100)
  filled: boolean     // Whether this target has been hit
}
```

**Example Multi-TP Trade:**

```typescript
const trade: Trade = {
  id: "trade_xyz789",
  symbol: "ETHUSDT",
  direction: "LONG",
  status: "OPEN",
  entryPrice: 2500,
  amount: 2,
  leverage: 5,
  pnl: 0,
  pnlPercent: 0,
  fee: 5.00,
  takeProfits: [
    { price: 2600, percentage: 25, filled: false },  // TP1: 25%
    { price: 2700, percentage: 25, filled: false },  // TP2: 25%
    { price: 2800, percentage: 50, filled: false },  // TP3: 50%
  ],
  isDemo: false,
  createdAt: "2024-01-15T14:00:00Z"
}
```

---

## Market Data Types

### MarketPrice

Real-time market price data with 24-hour statistics.

```typescript
export interface MarketPrice {
  symbol: string      // Trading pair identifier
  price: number       // Current price
  change24h: number   // 24-hour price change (absolute)
  high24h: number     // 24-hour high price
  low24h: number      // 24-hour low price
  volume24h: number   // 24-hour trading volume
}
```

**Example:**

```typescript
const btcPrice: MarketPrice = {
  symbol: "BTCUSDT",
  price: 45250.50,
  change24h: 1250.30,
  high24h: 45800.00,
  low24h: 43800.00,
  volume24h: 28500000000
}
```

---

### Signal

Trading signal from external sources with full parsing details.

```typescript
export interface Signal {
  id: string                                        // Unique signal identifier
  source: "TELEGRAM" | "DISCORD" | "TRADINGVIEW" | "MANUAL"  // Signal origin
  symbol: string                                    // Trading pair
  direction: "LONG" | "SHORT"                       // Trade direction
  action: "BUY" | "SELL" | "CLOSE"                  // Recommended action
  entryPrices: number[]                             // Entry price levels
  takeProfits: TakeProfitTarget[]                   // TP targets
  stopLoss?: number | null                          // Stop loss level
  leverage?: number                                 // Suggested leverage
  rawMessage?: string                               // Original message text
  confidence: number                                // Signal confidence (0-1)
  status: "PENDING" | "EXECUTED" | "FAILED" | "IGNORED"
  createdAt: string                                 // Signal timestamp
}
```

**Signal Processing Flow:**

```
Raw Message → Parser → Signal → Filter → Execute → Position
```

**Example Signal:**

```typescript
const signal: Signal = {
  id: "sig_123",
  source: "TELEGRAM",
  symbol: "BTCUSDT",
  direction: "LONG",
  action: "BUY",
  entryPrices: [45000, 44500],
  takeProfits: [
    { price: 46000, percentage: 50, filled: false },
    { price: 47000, percentage: 50, filled: false },
  ],
  stopLoss: 43500,
  leverage: 10,
  rawMessage: "BTCUSDT LONG\nEntry: 45000-44500\nTP1: 46000 (50%)\nTP2: 47000\nSL: 43500",
  confidence: 0.85,
  status: "PENDING",
  createdAt: "2024-01-15T10:00:00Z"
}
```

---

## Account Types

### Account

Exchange account configuration with virtual balance support.

```typescript
export interface Account {
  id: string                         // Account identifier
  accountType: TradingMode           // DEMO or REAL
  exchangeId: string                 // Exchange identifier (e.g., "binance")
  exchangeType: "spot" | "futures" | "inverse"  // Market type
  exchangeName: string               // Display name
  virtualBalance?: VirtualBalance    // Virtual balance for demo accounts
  isActive: boolean                  // Account active status
  isTestnet: boolean                 // Testnet flag
}
```

---

### VirtualBalance

Virtual balance for demo trading with multi-currency support.

```typescript
export interface VirtualBalance {
  USDT: number       // USDT balance
  BTC: number        // Bitcoin balance
  ETH: number        // Ethereum balance
  BNB: number        // BNB balance
  SOL: number        // Solana balance
  [key: string]: number  // Additional currencies
}
```

**Example:**

```typescript
const demoAccount: Account = {
  id: "acc_demo_001",
  accountType: "DEMO",
  exchangeId: "binance",
  exchangeType: "futures",
  exchangeName: "Binance Futures Demo",
  virtualBalance: {
    USDT: 10000,
    BTC: 0.5,
    ETH: 2.5,
    BNB: 10,
    SOL: 50
  },
  isActive: true,
  isTestnet: false
}
```

---

## Bot Configuration Types

### BotConfigInput

Complete bot configuration for all bot types.

```typescript
export interface BotConfigInput {
  id: string                              // Bot identifier
  name: string                            // Bot display name
  isActive: boolean                       // Active status
  exchangeId: string                      // Connected exchange
  exchangeType: "spot" | "futures" | "inverse"
  
  // Trade amount settings
  tradeAmount: number                     // Amount per trade
  amountType: "FIXED" | "PERCENTAGE"      // Amount calculation method
  amountOverride: boolean                 // Override signal amount
  
  // Trailing stop settings
  trailingEnabled: boolean                // Enable trailing stop
  trailingType?: TrailingType             // Trailing method
  trailingValue?: number                  // Trailing distance
  trailingStopPercent?: number            // Trailing percentage
  
  // Leverage settings
  leverage: number                        // Default leverage
  leverageOverride: boolean               // Override signal leverage
  
  // Risk management
  defaultStopLoss?: number                // Default SL percentage
  
  // Filters
  maxOpenTrades: number                   // Maximum concurrent trades
  allowedSymbols?: string[]               // Whitelist of symbols
  blacklistedSymbols?: string[]           // Blacklist of symbols
  
  // Notification preferences
  notifyOnEntry: boolean                  // Notify on trade entry
  notifyOnExit: boolean                   // Notify on trade exit
  notifyOnSL: boolean                     // Notify on stop loss hit
  notifyOnTP: boolean                     // Notify on take profit hit
}
```

---

### TrailingType

Available trailing stop strategies.

```typescript
export type TrailingType = 
  | "BREAKEVEN"              // Move SL to entry after price moves X%
  | "MOVING_TARGET"          // Trail TP behind price
  | "PERCENT_BELOW_HIGHEST"  // SL always X% below highest price
  | "MOVING_2_TARGET"        // Move to next TP after first is hit
```

**Trailing Type Descriptions:**

| Type | Behavior | Use Case |
|------|----------|----------|
| `BREAKEVEN` | SL moves to entry price after activation | Lock in profits, avoid losses |
| `MOVING_TARGET` | TP follows price upward/downward | Capture extended moves |
| `PERCENT_BELOW_HIGHEST` | Dynamic SL tracking highest price | Trend-following exits |
| `MOVING_2_TARGET` | Sequential TP progression | Multi-target strategies |

**Example Bot Config:**

```typescript
const botConfig: BotConfigInput = {
  id: "bot_grid_001",
  name: "BTC Grid Bot",
  isActive: true,
  exchangeId: "binance",
  exchangeType: "futures",
  tradeAmount: 100,
  amountType: "FIXED",
  amountOverride: false,
  trailingEnabled: true,
  trailingType: "PERCENT_BELOW_HIGHEST",
  trailingValue: 3,
  trailingStopPercent: 3,
  leverage: 10,
  leverageOverride: true,
  defaultStopLoss: 5,
  maxOpenTrades: 5,
  allowedSymbols: ["BTCUSDT", "ETHUSDT"],
  blacklistedSymbols: [],
  notifyOnEntry: true,
  notifyOnExit: true,
  notifyOnSL: true,
  notifyOnTP: true
}
```

---

## API Response Types

### TradeOpenResponse

Response from trade opening endpoint.

```typescript
export interface TradeOpenResponse {
  success: boolean                    // Operation success status
  trade?: Trade                       // Created trade object
  position?: Position                 // Created/updated position
  error?: string                      // Error message if failed
  message?: string                    // Additional info message
}
```

**Example Success Response:**

```typescript
const response: TradeOpenResponse = {
  success: true,
  trade: {
    id: "trade_new",
    symbol: "BTCUSDT",
    // ... trade details
  },
  position: {
    id: "pos_new",
    symbol: "BTCUSDT",
    // ... position details
  },
  message: "Trade opened successfully"
}
```

---

### TradeCloseResponse

Response from trade closing endpoint.

```typescript
export interface TradeCloseResponse {
  success: boolean                    // Operation success status
  position?: {                        // Closed position info
    id: string
    status: string
    closedAt: string
  }
  pnl?: {                             // PnL details
    value: number                     // Absolute PnL value
    percent: number                   // PnL percentage
    fee: number                       // Closing fee
  }
  error?: string                      // Error message if failed
  message?: string                    // Additional info message
}
```

---

### ParsedSignalResponse

Response from signal parsing endpoint.

```typescript
export interface ParsedSignalResponse {
  success: boolean                    // Parsing success status
  signal?: Signal                     // Parsed signal object
  error?: string                      // Error message if parsing failed
  confidence?: number                 // Parsing confidence (0-1)
}
```

---

## WebSocket Message Types

### PriceUpdateMessage

Real-time price update message.

```typescript
export interface PriceUpdateMessage {
  type: "PRICE_UPDATE"
  data: Record<string, MarketPrice>   // Symbol → MarketPrice mapping
}
```

**Example:**

```typescript
const priceUpdate: PriceUpdateMessage = {
  type: "PRICE_UPDATE",
  data: {
    "BTCUSDT": {
      symbol: "BTCUSDT",
      price: 45250,
      change24h: 500,
      high24h: 45800,
      low24h: 44500,
      volume24h: 25000000000
    },
    "ETHUSDT": {
      symbol: "ETHUSDT",
      price: 2520,
      change24h: 30,
      high24h: 2580,
      low24h: 2480,
      volume24h: 15000000000
    }
  }
}
```

---

### PositionUpdateMessage

Real-time position update message.

```typescript
export interface PositionUpdateMessage {
  type: "POSITION_UPDATE"
  data: Position[]                    // Array of current positions
}
```

---

### WebSocketMessage

Union type for all WebSocket messages.

```typescript
export type WebSocketMessage = PriceUpdateMessage | PositionUpdateMessage
```

---

## Funding & PnL Types

### FundingRate

Perpetual futures funding rate data.

```typescript
export interface FundingRate {
  symbol: string                      // Trading pair
  exchange: string                    // Exchange name
  fundingRate: number                 // Funding rate (decimal: 0.0001 = 0.01%)
  fundingTime: Date | string          // Next funding time
  markPrice?: number                  // Current mark price
  indexPrice?: number                 // Index price
  timestamp?: Date | string           // Data timestamp
}
```

**Funding Rate Interpretation:**

| Funding Rate | Interpretation | Longs Pay Shorts |
|--------------|----------------|------------------|
| Positive (>0) | Longs pay shorts | Yes |
| Negative (<0) | Shorts pay longs | No |
| Zero (=0) | Neutral | No payment |

**Example:**

```typescript
const fundingRate: FundingRate = {
  symbol: "BTCUSDT",
  exchange: "binance",
  fundingRate: 0.0001,  // 0.01% - longs pay shorts
  fundingTime: "2024-01-15T16:00:00Z",
  markPrice: 45250,
  indexPrice: 45200,
  timestamp: "2024-01-15T14:30:00Z"
}
```

---

### FundingPayment

Record of a funding payment transaction.

```typescript
export interface FundingPayment {
  id: string                          // Payment identifier
  positionId: string                  // Associated position
  symbol: string                      // Trading pair
  direction: "LONG" | "SHORT"         // Position direction
  quantity: number                    // Position quantity
  fundingRate: number                 // Applied funding rate
  payment: number                     // Payment amount (+ = received, - = paid)
  fundingTime: Date | string          // Funding timestamp
  createdAt?: Date | string           // Record creation time
}
```

---

### PnLHistory

Historical PnL snapshot record.

```typescript
export interface PnLHistory {
  id: string                          // Record identifier
  userId: string                      // User identifier
  timestamp: Date | string            // Snapshot timestamp
  isDemo: boolean                     // Demo flag
  balance: number                     // Account balance
  equity: number                      // Total equity (balance + unrealized)
  realizedPnL: number                 // Cumulative realized PnL
  unrealizedPnL: number               // Current unrealized PnL
  fundingPnL: number                  // Cumulative funding PnL
  feesPaid: number                    // Total fees paid
  tradesCount: number                 // Total trades count
  winsCount: number                   // Winning trades count
  lossesCount: number                 // Losing trades count
}
```

---

### PnLStats

Aggregated PnL statistics for a period.

```typescript
export interface PnLStats {
  period: string                      // Period identifier (e.g., "2024-01")
  realizedPnL: number                 // Realized PnL
  unrealizedPnL: number               // Unrealized PnL
  fundingPnL: number                  // Funding PnL
  feesPaid: number                    // Total fees
  netPnL: number                      // Net PnL (realized - fees + funding)
  tradesCount: number                 // Total trades
  winsCount: number                   // Winning trades
  lossesCount: number                 // Losing trades
  winRate: number                     // Win rate (0-1)
  profitFactor: number                // Gross profit / Gross loss
  avgTrade: number                    // Average trade PnL
  bestTrade: number                   // Best single trade
  worstTrade: number                  // Worst single trade
}
```

**Key Metrics Formulas:**

```
Win Rate = Wins / (Wins + Losses)
Profit Factor = Gross Profit / |Gross Loss|
Net PnL = Realized PnL + Funding PnL - Fees Paid
```

---

### ChatMessage

Chat message with optional signal attachment.

```typescript
export interface ChatMessage {
  id: string                          // Message identifier
  role: "user" | "assistant"          // Message sender role
  content: string                     // Message text content
  signal?: Signal                     // Attached trading signal
  timestamp: string                   // ISO timestamp
}
```

---

## Usage Examples

### Working with Positions

```typescript
import type { Position, TrailingStopConfig } from "@/types"

// Calculate position PnL
function calculatePnL(position: Position): number {
  const direction = position.direction === "LONG" ? 1 : -1
  const priceDiff = position.currentPrice - position.avgEntryPrice
  return direction * priceDiff * position.totalAmount * position.leverage
}

// Update trailing stop
function updateTrailingStop(
  position: Position,
  currentPrice: number
): TrailingStopConfig | null {
  if (!position.trailingStop?.activated) return null
  
  const { type, value, highestPrice = 0 } = position.trailingStop
  
  if (currentPrice > highestPrice) {
    let newStop: number
    
    switch (type) {
      case "PERCENT":
        newStop = currentPrice * (1 - value / 100)
        break
      case "ATR":
        newStop = currentPrice - value * calculateATR(position.symbol)
        break
      case "PRICE":
        newStop = currentPrice - value
        break
    }
    
    return {
      ...position.trailingStop,
      highestPrice: currentPrice
    }
  }
  
  return position.trailingStop
}
```

### Processing Signals

```typescript
import type { Signal, Trade, Position } from "@/types"

// Validate signal before execution
function validateSignal(signal: Signal): boolean {
  // Check required fields
  if (!signal.symbol || !signal.direction) return false
  
  // Validate entry prices
  if (signal.entryPrices.length === 0) return false
  
  // Validate TP levels
  const validTPs = signal.takeProfits.every(tp => 
    tp.price > 0 && tp.percentage > 0 && tp.percentage <= 100
  )
  if (!validTPs) return false
  
  // Validate confidence
  if (signal.confidence < 0 || signal.confidence > 1) return false
  
  return true
}

// Calculate position size from signal
function calculatePositionSize(
  signal: Signal,
  accountBalance: number,
  riskPercent: number = 1
): number {
  if (!signal.stopLoss || signal.entryPrices.length === 0) return 0
  
  const entryPrice = signal.entryPrices[0]
  const stopDistance = Math.abs(entryPrice - signal.stopLoss)
  const stopPercent = stopDistance / entryPrice
  
  const riskAmount = accountBalance * (riskPercent / 100)
  const positionSize = riskAmount / stopPercent
  
  return positionSize
}
```

### WebSocket Message Handling

```typescript
import type { WebSocketMessage, PriceUpdateMessage, PositionUpdateMessage } from "@/types"

// Type-safe message handler
function handleWebSocketMessage(message: WebSocketMessage): void {
  switch (message.type) {
    case "PRICE_UPDATE":
      handlePriceUpdate(message)
      break
    case "POSITION_UPDATE":
      handlePositionUpdate(message)
      break
  }
}

function handlePriceUpdate(message: PriceUpdateMessage): void {
  Object.entries(message.data).forEach(([symbol, price]) => {
    console.log(`${symbol}: $${price.price} (${price.change24h > 0 ? '+' : ''}${price.change24h})`)
  })
}

function handlePositionUpdate(message: PositionUpdateMessage): void {
  message.data.forEach(position => {
    console.log(`Position ${position.id}: ${position.direction} ${position.symbol}`)
    console.log(`  Unrealized PnL: $${position.unrealizedPnl.toFixed(2)}`)
  })
}
```

### Bot Configuration Management

```typescript
import type { BotConfigInput, TrailingType } from "@/types"

// Create default bot config
function createDefaultBotConfig(
  name: string,
  exchangeId: string
): BotConfigInput {
  return {
    id: crypto.randomUUID(),
    name,
    isActive: false,
    exchangeId,
    exchangeType: "futures",
    tradeAmount: 100,
    amountType: "FIXED",
    amountOverride: false,
    trailingEnabled: false,
    leverage: 10,
    leverageOverride: false,
    maxOpenTrades: 3,
    notifyOnEntry: true,
    notifyOnExit: true,
    notifyOnSL: true,
    notifyOnTP: true
  }
}

// Apply trailing stop configuration
function configureTrailingStop(
  config: BotConfigInput,
  type: TrailingType,
  value: number
): BotConfigInput {
  return {
    ...config,
    trailingEnabled: true,
    trailingType: type,
    trailingValue: value,
    trailingStopPercent: type === "PERCENT_BELOW_HIGHEST" ? value : undefined
  }
}
```

---

## Type Guards

Type guards for runtime type checking.

### Position Type Guard

```typescript
function isPosition(value: unknown): value is Position {
  if (typeof value !== "object" || value === null) return false
  
  const pos = value as Position
  return (
    typeof pos.id === "string" &&
    typeof pos.symbol === "string" &&
    (pos.direction === "LONG" || pos.direction === "SHORT") &&
    typeof pos.totalAmount === "number" &&
    typeof pos.avgEntryPrice === "number" &&
    typeof pos.currentPrice === "number" &&
    typeof pos.leverage === "number" &&
    typeof pos.unrealizedPnl === "number" &&
    typeof pos.isDemo === "boolean"
  )
}
```

### Trade Type Guard

```typescript
function isTrade(value: unknown): value is Trade {
  if (typeof value !== "object" || value === null) return false
  
  const trade = value as Trade
  const validStatuses = ["PENDING", "OPEN", "CLOSED", "CANCELLED"]
  const validDirections = ["LONG", "SHORT"]
  
  return (
    typeof trade.id === "string" &&
    typeof trade.symbol === "string" &&
    validDirections.includes(trade.direction) &&
    validStatuses.includes(trade.status) &&
    typeof trade.amount === "number" &&
    typeof trade.leverage === "number" &&
    typeof trade.isDemo === "boolean"
  )
}
```

### Signal Type Guard

```typescript
function isSignal(value: unknown): value is Signal {
  if (typeof value !== "object" || value === null) return false
  
  const signal = value as Signal
  const validSources = ["TELEGRAM", "DISCORD", "TRADINGVIEW", "MANUAL"]
  const validDirections = ["LONG", "SHORT"]
  const validActions = ["BUY", "SELL", "CLOSE"]
  const validStatuses = ["PENDING", "EXECUTED", "FAILED", "IGNORED"]
  
  return (
    typeof signal.id === "string" &&
    validSources.includes(signal.source) &&
    typeof signal.symbol === "string" &&
    validDirections.includes(signal.direction) &&
    validActions.includes(signal.action) &&
    Array.isArray(signal.entryPrices) &&
    typeof signal.confidence === "number" &&
    signal.confidence >= 0 &&
    signal.confidence <= 1 &&
    validStatuses.includes(signal.status)
  )
}
```

### WebSocket Message Type Guards

```typescript
function isPriceUpdateMessage(message: WebSocketMessage): message is PriceUpdateMessage {
  return message.type === "PRICE_UPDATE"
}

function isPositionUpdateMessage(message: WebSocketMessage): message is PositionUpdateMessage {
  return message.type === "POSITION_UPDATE"
}

// Usage in message handler
function processMessage(rawMessage: unknown): void {
  if (!isWebSocketMessage(rawMessage)) {
    console.error("Invalid WebSocket message")
    return
  }
  
  if (isPriceUpdateMessage(rawMessage)) {
    // TypeScript knows rawMessage is PriceUpdateMessage
    updatePrices(rawMessage.data)
  } else if (isPositionUpdateMessage(rawMessage)) {
    // TypeScript knows rawMessage is PositionUpdateMessage
    updatePositions(rawMessage.data)
  }
}

function isWebSocketMessage(value: unknown): value is WebSocketMessage {
  if (typeof value !== "object" || value === null) return false
  
  const msg = value as WebSocketMessage
  return msg.type === "PRICE_UPDATE" || msg.type === "POSITION_UPDATE"
}
```

### Funding Rate Type Guard

```typescript
function isFundingRate(value: unknown): value is FundingRate {
  if (typeof value !== "object" || value === null) return false
  
  const fr = value as FundingRate
  return (
    typeof fr.symbol === "string" &&
    typeof fr.exchange === "string" &&
    typeof fr.fundingRate === "number" &&
    (fr.fundingTime instanceof Date || typeof fr.fundingTime === "string")
  )
}
```

---

## Related Documentation

- [Backend API Reference](/docs/backend/BACKEND_API_REFERENCE.md) - API endpoints using these types
- [Trading System Architecture](/docs/trading/TRADING_SYSTEM_ARCHITECTURE.md) - How types flow through the system
- [WebSocket Protocol](/docs/architecture/WEBSOCKET_PROTOCOL.md) - WebSocket message specifications
- [Database Schema](/docs/architecture/DATABASE_SCHEMA.md) - Prisma models for database storage

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01 | Initial type definitions |
| 1.1.0 | 2024-02 | Added funding and PnL types |
| 1.2.0 | 2024-03 | Added multi-TP support (TakeProfitTarget) |
| 1.3.0 | 2024-04 | Enhanced trailing stop types |
| 1.4.0 | 2025-01 | Added comprehensive documentation |
