# CITARION Database Schema

> **Last Updated:** March 2025  
> **Database:** SQLite (via Prisma ORM)  
> **Models:** 40+ tables

---

## Table of Contents

1. [Overview](#overview)
2. [ER Diagram](#er-diagram)
3. [Core Models](#core-models)
4. [Trading Models](#trading-models)
5. [Bot Models](#bot-models)
6. [Market Data Models](#market-data-models)
7. [Indexes](#indexes)
8. [Migrations](#migrations)

---

## Overview

CITARION uses **Prisma ORM** with SQLite for development and testing. The schema supports:

- Multi-user trading accounts
- Multiple exchange integrations
- Various trading bot types (Grid, DCA, BB, Vision, Institutional)
- Signal parsing and tracking
- Real-time market data caching
- Position escort for external positions

---

## ER Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              CITARION DATABASE SCHEMA                                │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌─────────┐       ┌─────────────┐       ┌─────────────┐                            │
│  │  User   │──1:N──│   Account   │──1:N──│   Position  │                            │
│  └─────────┘       └─────────────┘       └─────────────┘                            │
│       │                  │                     │                                     │
│       │                  │                     │                                     │
│       │ 1:N              │ 1:N                 │ 1:1                                 │
│       ▼                  ▼                     ▼                                     │
│  ┌─────────┐       ┌─────────────┐       ┌─────────────┐                            │
│  │  Trade  │       │  BotConfig  │       │   Signal    │                            │
│  └─────────┘       └─────────────┘       └─────────────┘                            │
│       │                  │                     │                                     │
│       │                  │                     │                                     │
│       ▼                  ▼                     ▼                                     │
│  ┌─────────┐       ┌─────────────┐       ┌─────────────┐                            │
│  │Position │       │ GridBot     │       │ EscortReq   │                            │
│  │(FK)     │       │ DcaBot      │       │             │                            │
│  └─────────┘       │ BBBot       │       └─────────────┘                            │
│                    │ VisionBot   │                                                  │
│                    └─────────────┘                                                  │
│                                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────┐    │
│  │                           MARKET DATA                                        │    │
│  ├─────────────┬─────────────┬─────────────┬─────────────┬─────────────────────┤    │
│  │ MarketPrice │ OhlcvCandle │ FundingRate │ PnLHistory  │ SystemLog           │    │
│  └─────────────┴─────────────┴─────────────┴─────────────┴─────────────────────┘    │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Core Models

### User

Main user entity with authentication and Telegram integration.

```prisma
model User {
  id          String  @id @default(cuid())
  email       String  @unique
  name        String?
  password    String?
  image       String?
  currentMode String  @default("DEMO") // REAL or DEMO

  // Telegram integration
  telegramId         String?   @unique
  telegramUsername   String?
  telegramVerified   Boolean   @default(false)
  telegramLinkCode   String?   @unique
  telegramLinkExpiry DateTime?

  // Two-Factor Authentication
  twoFactorEnabled     Boolean   @default(false)
  twoFactorSecret      String?
  twoFactorBackupCodes String?
  twoFactorEnabledAt   DateTime?

  // Relations
  accounts             Account[]
  trades               Trade[]
  botConfigs           BotConfig[]
  sessions             Session[]
  apiKeys              ApiKey[]
  classifiedSignals    ClassifiedSignal[]
  spectrumBots         SpectrumBot[]
  reedBots             ReedBot[]
  architectBots        ArchitectBot[]
  equilibristBots      EquilibristBot[]
  kronBots             KronBot[]
  botPerformanceSummaries BotPerformanceSummary[]
  notifications        Notification[]
  notificationPreference NotificationPreference?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (cuid) | Primary key |
| `email` | String | Unique email |
| `currentMode` | String | "DEMO" or "REAL" trading mode |
| `telegramId` | String? | Telegram user ID for bot integration |
| `twoFactorEnabled` | Boolean | 2FA status |

### Account

Exchange account configuration with encrypted credentials.

```prisma
model Account {
  id          String @id @default(cuid())
  userId      String
  user        User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  accountType   String @default("DEMO") // REAL or DEMO
  exchangeId    String @default("binance")
  exchangeType  String @default("spot") // spot, futures, inverse
  exchangeName  String @default("Binance")

  // API Credentials (Encrypted)
  apiKey                  String?
  apiSecret               String?
  apiPassphrase           String?
  apiUid                  String?
  encryptedApiCredentials String?  // AES-256-GCM encrypted JSON
  encryptionVersion       Int?     @default(1)

  subAccount  String?
  isTestnet   Boolean @default(false)
  virtualBalance String? // JSON: {"USDT": 10000, "BTC": 0.5}

  isActive    Boolean   @default(true)
  lastSyncAt  DateTime?
  lastError   String?

  // Relations
  trades            Trade[]
  positions         Position[]
  botConfigs        BotConfig[]
  gridBots          GridBot[]
  dcaBots           DcaBot[]
  bbBots            BBBot[]
  visionBots        VisionBot[]
  escortRequests    EscortRequest[]
  externalPositions ExternalPosition[]

  @@unique([userId, exchangeId, exchangeType])
}
```

### Session

User session management.

```prisma
model Session {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
}
```

### ApiKey

API key management for bot/service authentication.

```prisma
model ApiKey {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  name        String
  keyHash     String   @unique // SHA-256 hash
  keyPrefix   String            // First 10 chars for identification
  permissions String   @default("[\"trade:read\", \"trade:write\"]")
  isActive    Boolean  @default(true)
  lastUsedAt  DateTime?
  expiresAt   DateTime?

  @@index([userId, isActive])
}
```

---

## Trading Models

### Trade

Individual trade record with PnL tracking.

```prisma
model Trade {
  id        String  @id @default(cuid())
  userId    String
  user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  accountId String
  account   Account @relation(fields: [accountId], references: [id], onDelete: Cascade)

  symbol    String  // e.g., BTCUSDT
  direction String  // LONG or SHORT
  status    String  @default("PENDING") // PENDING, OPEN, CLOSED, CANCELLED

  entryPrice Float?
  entryTime  DateTime?
  amount     Float
  leverage   Int     @default(1)

  exitPrice   Float?
  exitTime    DateTime?
  closeReason String? // TP, SL, MANUAL, LIQUIDATION

  stopLoss    Float?
  takeProfits String? // JSON: [{"price": 50000, "percentage": 50}]

  pnl        Float @default(0)
  pnlPercent Float @default(0)
  fee        Float @default(0)

  signalSource String? // TELEGRAM, DISCORD, TRADINGVIEW, MANUAL
  signalId     String?
  isDemo       Boolean @default(true)

  position   Position? @relation(fields: [positionId], references: [id])
  positionId String?   @unique
}
```

### Position

Active position with trailing stop and funding tracking.

```prisma
model Position {
  id        String  @id @default(cuid())
  accountId String
  account   Account @relation(fields: [accountId], references: [id], onDelete: Cascade)

  symbol    String
  direction String  // LONG or SHORT
  status    String  @default("OPEN") // OPEN, CLOSED

  totalAmount   Float
  filledAmount  Float  @default(0)
  avgEntryPrice Float
  currentPrice  Float?
  leverage      Int    @default(1)

  // Source tracking
  source             String  @default("PLATFORM") // PLATFORM, EXTERNAL, SIGNAL
  exchangePositionId String?

  // Escort (position management)
  escortEnabled Boolean @default(false)
  escortStatus  String?

  // Risk management
  stopLoss          Float?
  takeProfit        Float?
  trailingStop      String? // JSON: {"type": "PERCENT", "value": 5}
  trailingActivated Boolean @default(false)

  // PnL
  unrealizedPnl Float @default(0)
  realizedPnl   Float @default(0)

  // Funding tracking
  totalFundingPaid     Float     @default(0)
  totalFundingReceived Float     @default(0)
  lastFundingTime      DateTime?

  // Trailing stop tracking
  highestPrice Float?
  lowestPrice  Float?

  isDemo      Boolean   @default(true)
  closedAt    DateTime?
  closeReason String?

  @@index([source, escortStatus])
  @@index([accountId, status])
}
```

### Signal

Parsed trading signal from various sources.

```prisma
model Signal {
  id       String  @id @default(cuid())
  signalId Int     @unique // Sequential ID (Cornix-style)

  source        String // TELEGRAM, DISCORD, TRADINGVIEW, MANUAL, APP
  sourceChannel String?
  sourceMessage String?

  symbol     String
  direction  String  // LONG or SHORT
  action     String  // BUY, SELL, CLOSE
  marketType String  @default("FUTURES")

  entryPrices  String? // JSON: [50000, 49500]
  entryZone    String? // JSON: {"min": 50000, "max": 51000}
  entryWeights String? // JSON: [50, 30, 20]

  takeProfits    String? // JSON: [{"price": 52000, "percentage": 30}]
  stopLoss       Float?
  leverage       Int     @default(1)
  leverageType   String  @default("ISOLATED")
  signalType     String  @default("REGULAR")

  trailingConfig   String?
  amountPerTrade   Float?
  riskPercentage   Float?
  exchanges        String? // JSON: ["Binance", "Bybit"]

  status       String    @default("PENDING")
  errorMessage String?
  processedAt  DateTime?
  closedAt     DateTime?

  positionId String?   @unique
  position   Position? @relation(fields: [positionId], references: [id])

  @@index([signalId])
  @@index([symbol, marketType, status])
}
```

### EscortRequest

Request to adopt externally opened positions.

```prisma
model EscortRequest {
  id        String  @id @default(cuid())
  accountId String
  account   Account @relation(fields: [accountId], references: [id], onDelete: Cascade)

  symbol     String
  direction  String
  size       Float
  entryPrice Float
  leverage   Int @default(1)

  exchange           String
  marketType         String
  exchangePositionId String?

  status String @default("PENDING") // PENDING, ACCEPTED, REJECTED, TIMEOUT

  positionId String?   @unique
  position   Position? @relation(fields: [positionId], references: [id])

  @@index([accountId, status])
  @@index([status, createdAt])
}
```

---

## Bot Models

### BotConfig

General bot configuration (Cornix-compatible).

```prisma
model BotConfig {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  accountId String?
  account   Account? @relation(fields: [accountId], references: [id])

  name        String
  description String?
  isActive    Boolean @default(false)

  // Exchange settings
  exchangeId   String @default("binance")
  exchangeType String @default("futures")

  // Amount settings
  tradeAmount    Float   @default(100)
  amountType     String  @default("FIXED")
  amountOverride Boolean @default(false)

  // Trailing Stop (5 types)
  trailingEnabled      Boolean @default(false)
  trailingType         String  @default("BREAKEVEN")
  trailingTriggerType  String  @default("TARGET_REACHED")
  trailingTriggerValue Float?
  trailingPercent      Float?
  trailingActivated    Boolean @default(false)
  trailingHighestPrice Float?

  // Entry Strategy
  entryStrategy    String  @default("EVENLY_DIVIDED")
  entryWeights     String?
  entryZoneTargets Int     @default(1)

  // DCA Settings
  dcaFirstEntryPercent Float?
  dcaAmountScale       Float  @default(1)
  dcaPriceDiff         Float  @default(1)
  dcaPriceScale        Float  @default(1)
  dcaMaxPriceDiff      Float  @default(10)

  // Take Profit Strategy (9 types)
  tpStrategy     String  @default("EVENLY_DIVIDED")
  tpTargetCount  Int     @default(3)
  tpCustomRatios String?
  tpGraceEnabled Boolean @default(false)
  tpGraceMaxCap  Float   @default(0.5)

  // Stop Loss
  defaultStopLoss Float?
  slTimeout       Int    @default(0)
  slOrderType     String @default("MARKET")

  // Margin
  leverage         Int     @default(1)
  leverageOverride Boolean  @default(false)
  hedgeMode        Boolean  @default(false)
  marginMode       String   @default("ISOLATED")

  // Auto-trading
  autoExecuteEnabled Boolean @default(false)
  autoExecuteSources String?
  autoExecuteRequiresConfirmation Boolean @default(true)

  // Notifications
  notifyOnEntry     Boolean @default(true)
  notifyOnExit      Boolean @default(true)
  notifyOnSL        Boolean @default(true)
  notifyOnTP        Boolean @default(true)
  notifyOnError     Boolean @default(true)
  notifyOnNewSignal Boolean @default(true)
}
```

### GridBot

Grid trading bot configuration.

```prisma
model GridBot {
  id        String  @id @default(cuid())
  userId    String
  accountId String
  account   Account @relation(fields: [accountId], references: [id], onDelete: Cascade)

  name        String
  description String?
  isActive    Boolean @default(false)

  symbol     String
  exchangeId String @default("binance")
  direction  String @default("LONG")

  // Grid settings
  gridType  String @default("ARITHMETIC") // ARITHMETIC or GEOMETRIC
  gridCount Int    @default(10)

  // Price range
  upperPrice Float
  lowerPrice Float

  // Investment
  totalInvestment Float
  perGridAmount   Float?

  // Leverage
  leverage   Int    @default(1)
  marginMode String @default("ISOLATED")

  // TP/SL
  takeProfit Float?
  stopLoss   Float?

  // Trigger
  triggerPrice Float?
  triggerType  String?

  // State
  levels String? // JSON
  status String @default("STOPPED")

  // Performance
  totalProfit Float @default(0)
  totalTrades Int   @default(0)
  realizedPnL Float @default(0)

  // Adaptive Grid
  adaptiveEnabled    Boolean @default(false)
  baseAtr            Float?
  rebalanceThreshold Float   @default(0.05)
  trailingGrid       Boolean @default(false)

  // Dynamic Adjustment
  dynamicAdjustmentEnabled Boolean   @default(false)
  adjustmentInterval       Int        @default(60000)
  maxAdjustmentThreshold   Float      @default(0.05)
  lastAdjustmentAt         DateTime?
  adjustmentHistory        String?
  currentGridUpper         Float?
  currentGridLower         Float?

  gridOrders GridOrder[]

  @@index([userId, isActive])
  @@index([symbol, exchangeId, isActive])
}
```

### DcaBot

Dollar-cost averaging bot configuration.

```prisma
model DcaBot {
  id        String  @id @default(cuid())
  userId    String
  accountId String
  account   Account @relation(fields: [accountId], references: [id], onDelete: Cascade)

  name        String
  description String?
  isActive    Boolean @default(false)

  symbol     String
  exchangeId String @default("binance")
  direction  String @default("LONG")

  // Entry
  entryType  String  @default("MARKET")
  entryPrice Float?
  baseAmount Float

  // DCA levels
  dcaLevels     Int   @default(5)
  dcaPercent    Float @default(5)
  dcaMultiplier Float @default(1.5)
  dcaCustomLevels String?

  // TP/SL
  tpType     String  @default("PERCENT")
  tpValue    Float   @default(10)
  tpSellBase Boolean @default(false)
  slEnabled  Boolean @default(false)
  slType     String  @default("PERCENT")
  slValue    Float?

  // Leverage
  leverage   Int    @default(1)
  marginMode String @default("ISOLATED")

  // Trailing
  trailingEnabled Boolean @default(false)
  trailingPercent Float?

  // State
  status        String    @default("STOPPED")
  totalInvested Float     @default(0)
  totalAmount   Float     @default(0)
  avgEntryPrice Float?
  currentLevel  Int       @default(0)

  // Performance
  realizedPnL Float @default(0)
  totalTrades Int   @default(0)

  dcaOrders DcaOrder[]

  @@index([userId, isActive])
}
```

### BBBot

Bollinger Bands bot configuration.

```prisma
model BBBot {
  id        String  @id @default(cuid())
  userId    String
  accountId String
  account   Account @relation(fields: [accountId], references: [id], onDelete: Cascade)

  name        String
  description String?
  isActive    Boolean @default(false)

  symbol     String
  exchangeId String @default("binance")
  marketType String @default("FUTURES")

  // Timeframes (JSON array)
  timeframes String @default("[\"15m\"]")

  // Position
  direction   String @default("BOTH")
  tradeAmount Float  @default(100)
  leverage    Int    @default(1)
  marginMode  String @default("ISOLATED")

  // Risk
  stopLoss     Float?
  takeProfit   Float?
  trailingStop Float?

  // Manual mode
  isManualMode     Boolean @default(false)
  manualEntryPrice Float?
  manualTargets    String?
  manualStopLoss   Float?

  // State
  status String @default("STOPPED")

  // Performance
  totalProfit Float @default(0)
  totalTrades Int   @default(0)
  winTrades   Int   @default(0)
  lossTrades  Int   @default(0)
  realizedPnL Float @default(0)

  timeframeConfigs BBotTimeframeConfig[]
  bbSignals        BBSignal[]

  @@index([userId, isActive])
  @@index([symbol, exchangeId, isActive])
}
```

---

## Market Data Models

### MarketPrice

Cached market prices.

```prisma
model MarketPrice {
  id       String @id @default(cuid())
  symbol   String @unique
  exchange String @default("BINANCE")

  price              Float
  bidPrice           Float?
  askPrice           Float?
  high24h            Float?
  low24h             Float?
  volume24h          Float?
  priceChangePercent Float?

  lastUpdate DateTime @default(now())
}
```

### OhlcvCandle

Historical candlestick data for backtesting.

```prisma
model OhlcvCandle {
  id String @id @default(cuid())

  symbol     String
  exchange   String @default("binance")
  marketType String @default("futures")
  timeframe  String
  openTime   DateTime
  closeTime  DateTime

  open   Float
  high   Float
  low    Float
  close  Float
  volume Float

  quoteVolume         Float?
  trades              Int?
  takerBuyVolume      Float?
  takerBuyQuoteVolume Float?
  isFinal             Boolean @default(true)

  @@unique([symbol, exchange, timeframe, openTime])
  @@index([symbol, exchange, timeframe, openTime])
}
```

### FundingRateHistory

Funding rate data for futures.

```prisma
model FundingRateHistory {
  id String @id @default(cuid())

  symbol   String
  exchange String @default("binance")

  fundingRate Float
  fundingTime DateTime
  markPrice   Float?
  indexPrice  Float?

  @@index([symbol, exchange, fundingTime])
}
```

### PnLHistory

Equity curve tracking.

```prisma
model PnLHistory {
  id     String @id @default(cuid())
  userId String

  timestamp DateTime @default(now())
  isDemo    Boolean  @default(true)

  balance Float
  equity  Float

  realizedPnL   Float @default(0)
  unrealizedPnL Float @default(0)
  fundingPnL    Float @default(0)
  feesPaid      Float @default(0)

  tradesCount Int @default(0)
  winsCount   Int @default(0)
  lossesCount Int @default(0)

  @@index([userId, isDemo, timestamp])
}
```

---

## Indexes

### Performance Indexes

| Table | Index | Purpose |
|-------|-------|---------|
| `User` | `telegramId` (unique) | Telegram lookup |
| `Account` | `[userId, exchangeId, exchangeType]` (unique) | Account lookup |
| `Position` | `[source, escortStatus]` | External position queries |
| `Position` | `[accountId, status]` | Active positions |
| `Signal` | `signalId` (unique) | Sequential signal lookup |
| `Signal` | `[symbol, marketType, status]` | Signal filtering |
| `GridBot` | `[userId, isActive]` | Active bots |
| `GridBot` | `[symbol, exchangeId, isActive]` | Symbol bots |
| `OhlcvCandle` | `[symbol, exchange, timeframe, openTime]` | Candle lookup |
| `PnLHistory` | `[userId, isDemo, timestamp]` | Equity curve |

---

## Migrations

### Running Migrations

```bash
# Push schema changes (development)
bun run db:push

# Create migration
bunx prisma migrate dev --name <migration_name>

# Apply migrations (production)
bunx prisma migrate deploy

# Reset database
bun run db:reset
```

### Schema Version

Current schema version supports:
- ✅ Multi-exchange trading
- ✅ 5 bot types (Grid, DCA, BB, Vision, Institutional)
- ✅ Signal parsing with Cornix format
- ✅ Position escort for external positions
- ✅ Trailing stop (5 types)
- ✅ 2FA authentication
- ✅ Telegram integration
- ✅ Funding rate tracking

---

## Relations Summary

```
User (1) ────────< (N) Account
  │                       │
  │                       ├──< Position
  │                       │       │
  │                       │       └──< FundingPayment
  │                       │
  │                       ├──< Trade
  │                       │
  │                       ├──< GridBot ────< GridOrder
  │                       ├──< DcaBot ────< DcaOrder
  │                       ├──< BBBot ────< BBotTimeframeConfig
  │                       │            └──< BBSignal
  │                       └──< VisionBot
  │
  ├──< BotConfig
  ├──< Session
  ├──< ApiKey
  └──< Notification
```

---

## Data Types Reference

| Prisma Type | SQLite Type | JavaScript |
|-------------|-------------|------------|
| `String` | TEXT | string |
| `Int` | INTEGER | number |
| `Float` | REAL | number |
| `Boolean` | INTEGER (0/1) | boolean |
| `DateTime` | TEXT (ISO 8601) | Date |
| `Json` | TEXT | object |

---

## Encryption

API credentials are encrypted using **AES-256-GCM**:

```typescript
// Encrypted JSON structure
{
  "version": 1,
  "encryptedApiKey": "base64...",
  "encryptedApiSecret": "base64...",
  "encryptedPassphrase": "base64...",
  "encryptedUid": "base64...",
  "iv": "base64...",
  "authTag": "base64..."
}
```

See [SECURITY_GUIDE.md](../security/SECURITY_GUIDE.md) for encryption details.
