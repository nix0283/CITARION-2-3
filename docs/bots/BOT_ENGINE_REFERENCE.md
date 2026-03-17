# Bot Engine Reference

> Complete documentation for all trading bot engines in CITARION Desktop

## Overview

CITARION Desktop includes **17+ trading bot types** organized into **4 categories**:

```
┌─────────────────────────────────────────────────────────────────┐
│                        BOT ECOSYSTEM                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  OPERATIONAL BOTS          INSTITUTIONAL BOTS                   │
│  ├── MESH (Grid)           ├── PND (Argus)                      │
│  ├── SCALE (DCA)           ├── TRND (Orion)                     │
│  └── BAND (BB)             ├── FCST (Vision)                    │
│                             └── RNG (Range)                     │
│  FREQUENCY BOTS                                                │
│  ├── HFT (Helios)          META BOTS                           │
│  ├── MFT (Selene)          └── LOGOS (Aggregator)              │
│  └── LFT (Atlas)                                              │
│                                                                 │
│  ANALYTICAL BOTS                                               │
│  ├── WolfBot (Pattern Recognition)                             │
│  └── Strategy Bot (Custom Strategies)                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Table of Contents

1. [Grid Bot (MESH)](#grid-bot-mesh)
2. [DCA Bot (SCALE)](#dca-bot-scale)
3. [BB Bot (BAND)](#bb-bot-band)
4. [Argus Bot (PND)](#argus-bot-pnd)
5. [Orion Bot (TRND)](#orion-bot-trnd)
6. [Vision Bot (FCST)](#vision-bot-fcst)
7. [Range Bot (RNG)](#range-bot-rng)
8. [HFT Bot (Helios)](#hft-bot-helios)
9. [MFT Bot (Selene)](#mft-bot-selene)
10. [LFT Bot (Atlas)](#lft-bot-atlas)
11. [WolfBot](#wolfbot)
12. [LOGOS Meta Bot](#logos-meta-bot)

---

## Grid Bot (MESH)

**Codename:** Архитектор (Architect)  
**Category:** Operational  
**Strategy:** Grid Trading

### Overview

Grid Bot places buy and sell orders at predetermined price levels (grid), profiting from market oscillations within a range.

### Core Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GRID BOT ENGINE                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │    Grid     │  │   Adaptive  │  │   Trailing  │        │
│  │   Engine    │→ │   Grid      │→ │   Grid      │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│         ↓                ↓                ↓                 │
│  ┌─────────────────────────────────────────────────┐       │
│  │              Exchange Adapter Layer              │       │
│  │   Binance │ Bybit │ OKX │ Bitget │ Hyperliquid  │       │
│  └─────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### Types

```typescript
interface GridBotConfig {
  id: string;
  name: string;
  symbol: string;
  exchange: string;
  accountId: string;
  accountType: 'DEMO' | 'REAL';
  
  // Grid settings
  gridType: 'arithmetic' | 'geometric' | 'adaptive';
  gridLevels: number;
  upperPrice: number;
  lowerPrice: number;
  
  // Position settings
  positionSize: number;
  positionSizeType: 'fixed' | 'percent' | 'risk_based';
  leverage: number;
  
  // Trailing grid
  trailingEnabled: boolean;
  trailingActivationPercent: number;
  trailingDistancePercent: number;
  
  // Risk management
  maxDrawdown: number;
  stopLossPercent?: number;
  takeProfitPercent?: number;
  maxOpenPositions: number;
  
  // Execution
  orderType: 'limit' | 'market';
  priceTickOffset: number;
  
  // Advanced
  rebalanceEnabled: boolean;
  rebalanceThreshold: number;
  
  // Dynamic Adjustment Settings
  dynamicAdjustmentEnabled: boolean;
  adjustmentInterval: number;
  maxAdjustmentThreshold: number;
}

interface GridLevel {
  index: number;
  price: number;
  buyOrder?: GridOrder;
  sellOrder?: GridOrder;
  quantity: number;
  filled: boolean;
  filledAt?: Date;
  avgFillPrice?: number;
}

interface GridBotState {
  id: string;
  status: GridBotStatus;
  gridLevels: GridLevel[];
  currentUpperPrice: number;
  currentLowerPrice: number;
  totalInvested: number;
  currentValue: number;
  baseAssetBalance: number;
  quoteAssetBalance: number;
  realizedPnl: number;
  unrealizedPnl: number;
  totalFees: number;
  totalFunding: number;
  totalTrades: number;
  winTrades: number;
  lossTrades: number;
  totalVolume: number;
  trailingActivated: boolean;
  trailingHighestPrice: number;
  trailingLowestPrice: number;
  trailingStopPrice?: number;
  startedAt?: Date;
  stoppedAt?: Date;
  lastUpdate: Date;
  maxDrawdown: number;
  maxDrawdownPercent: number;
  sharpeRatio: number;
  profitFactor: number;
}

type GridBotStatus = 
  | 'IDLE' 
  | 'STARTING' 
  | 'RUNNING' 
  | 'PAUSED' 
  | 'STOPPING' 
  | 'STOPPED'
  | 'ERROR';
```

### Grid Types

| Type | Description | Best For |
|------|-------------|----------|
| **Arithmetic** | Equal price intervals | Stable markets |
| **Geometric** | Equal percentage intervals | Volatile markets |
| **Adaptive** | Adjusts based on volatility | All conditions |

### Key Features

1. **Dynamic Grid Adjustment**
   - Automatic grid rebalancing when price exits range
   - Volatility-based level spacing
   - ATR-based grid optimization

2. **Trailing Grid**
   - Grid shifts to follow price in trending markets
   - Configurable activation and distance thresholds

3. **Adaptive Grid Bot Class**
   - Real-time volatility measurement (ATR, Bollinger Bands)
   - Automatic grid expansion/contraction
   - Support/Resistance based grid placement

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/bots/grid` | GET | List all grid bots |
| `/api/bots/grid` | POST | Create new grid bot |
| `/api/bots/grid/[id]` | GET | Get bot details |
| `/api/bots/grid/[id]/start` | POST | Start bot |
| `/api/bots/grid/[id]/stop` | POST | Stop bot |
| `/api/bots/grid/[id]/pause` | POST | Pause bot |
| `/api/bots/grid/[id]/metrics` | GET | Get performance metrics |

### Usage Example

```typescript
import { GridBotEngine } from '@/lib/grid-bot/grid-bot-engine';
import { createGridAdapter } from '@/lib/grid-bot/exchange-adapter';

const config: GridBotConfig = {
  id: 'grid_btc_1',
  name: 'BTC Grid',
  symbol: 'BTCUSDT',
  exchange: 'binance',
  gridType: 'geometric',
  gridLevels: 20,
  upperPrice: 50000,
  lowerPrice: 40000,
  positionSize: 100,
  leverage: 1,
  trailingEnabled: true,
  maxDrawdown: 15,
};

const adapter = createGridAdapter('binance', credentials);
const bot = new GridBotEngine(config, adapter);

bot.on('ORDER_FILLED', (event) => {
  console.log(`Order filled at level ${event.data.level}`);
});

await bot.start();
```

---

## DCA Bot (SCALE)

**Codename:** Крон (Kron)  
**Category:** Operational  
**Strategy:** Dollar Cost Averaging

### Overview

DCA Bot automatically accumulates positions and uses safety orders to average down during price drops, aiming for profitable exits.

### Types

```typescript
interface DCABotConfig {
  id: string;
  symbol: string;
  direction: 'LONG' | 'SHORT';
  
  // Entry settings
  entryType: 'market' | 'limit' | 'scheduled' | 'signal' | 'hybrid';
  entryPrice?: number;
  entryInterval?: number; // minutes for scheduled entries
  
  // Base order settings
  baseOrderType: 'fixed' | 'percent';
  baseOrderAmount: number;
  
  // Leverage
  leverage: number;
  
  // Safety orders
  safetyOrdersEnabled: boolean;
  safetyOrdersCount: number;
  maxSafetyOrders: number;
  safetyOrderPriceDeviation: number;
  safetyOrderVolumeScale: number;
  
  // Take Profit
  takeProfitEnabled: boolean;
  takeProfitType: 'total' | 'perLevel';
  takeProfitPercent: number;
  takeProfitPerLevel?: Array<{ profitPercent: number; closePercent: number }>;
  
  // Stop Loss
  stopLossEnabled: boolean;
  stopLossType: 'total' | 'trailing';
  stopLossPercent: number;
  
  // Trailing Stop
  trailingStopEnabled: boolean;
  trailingStopActivation: number;
  trailingStopDistance: number;
  
  // Averaging
  averagingEnabled: boolean;
  averagingThreshold: number;
  averagingScale: number;
  
  // Risk management
  maxDrawdown: number;
  maxDailyLoss: number;
  maxOpenTime?: number; // hours
  
  // Volatility Scaling
  volatilityScalingEnabled: boolean;
  volatilityLookbackPeriod: number;
  minVolatilityThreshold: number;
  maxVolatilityThreshold: number;
  extremeVolatilityThreshold?: number;
}

interface DCAPosition {
  id: string;
  symbol: string;
  side: 'LONG' | 'SHORT';
  entries: DCAEntry[];
  totalQuantity: number;
  avgEntryPrice: number;
  totalInvested: number;
  safetyOrdersUsed: number;
  safetyOrdersRemaining: number;
  unrealizedPnl: number;
  unrealizedPnlPercent: number;
  realizedPnl: number;
  fees: number;
  funding: number;
  currentLevel: number;
  nextSafetyOrderPrice: number;
  takeProfitPrice: number;
  stopLossPrice: number;
  openedAt: Date;
  lastUpdate: Date;
  durationMinutes: number;
  status: 'OPEN' | 'CLOSING' | 'CLOSED';
  closeReason?: 'TAKE_PROFIT' | 'STOP_LOSS' | 'MANUAL' | 'MAX_TIME' | 'LIQUIDATION';
}

interface SafetyOrder {
  level: number;
  triggerPrice: number;
  triggerDeviation: number;
  quantity: number;
  amount: number;
  status: 'PENDING' | 'TRIGGERED' | 'FILLED' | 'CANCELLED';
  order?: DCAOrder;
  triggeredAt?: Date;
  filledAt?: Date;
  filledPrice?: number;
}
```

### Volatility Scaling

The DCA Bot includes an advanced **Volatility Scaler** that dynamically adjusts:

- **Position Size**: Reduces size in high volatility
- **Level Spacing**: Widens spacing in high volatility
- **Safety Order Triggers**: More conservative triggers in extreme conditions

```typescript
type VolatilityLevel = 'LOW' | 'NORMAL' | 'HIGH' | 'EXTREME';

interface ScalingResult {
  positionSizeMultiplier: number;
  levelSpacingMultiplier: number;
  safetyOrderTriggerPrice: number;
  maxSafetyOrders: number;
  suggestedBaseAmount: number;
  suggestedDcaPercent: number;
  volatilityLevel: VolatilityLevel;
  atrPercent: number;
  confidence: number;
}
```

### Key Features

1. **Safety Orders** - Progressive averaging down with configurable:
   - Trigger deviation (%)
   - Volume scaling (1.5x default)
   - Maximum number of safety orders

2. **Take Profit Per Level** - Different TP targets based on DCA depth:
   ```typescript
   const LEVEL_TP_CONFIG = [
     { dcaLevel: 0, tpPercent: 5, closePercent: 20 },
     { dcaLevel: 1, tpPercent: 7, closePercent: 20 },
     { dcaLevel: 2, tpPercent: 10, closePercent: 30 },
     { dcaLevel: 3, tpPercent: 15, closePercent: 30, trailingAfterHit: true },
   ];
   ```

3. **Volatility-Based Position Sizing**
   - ATR-based volatility measurement
   - Automatic parameter adjustment
   - Risk reduction in extreme conditions

### Usage Example

```typescript
import { DCABotEngine } from '@/lib/dca-bot/dca-bot-engine';
import { VolatilityScaler } from '@/lib/dca-bot/volatility-scaler';

const config: DCABotConfig = {
  id: 'dca_eth_1',
  symbol: 'ETHUSDT',
  direction: 'LONG',
  entryType: 'signal',
  baseOrderAmount: 100,
  leverage: 3,
  safetyOrdersEnabled: true,
  safetyOrdersCount: 5,
  maxSafetyOrders: 5,
  safetyOrderPriceDeviation: 2,
  safetyOrderVolumeScale: 1.5,
  takeProfitEnabled: true,
  takeProfitPercent: 5,
  trailingStopEnabled: true,
  trailingStopActivation: 3,
  trailingStopDistance: 1.5,
  volatilityScalingEnabled: true,
};

const bot = new DCABotEngine(config, adapter);

bot.on('SAFETY_ORDER_FILLED', (event) => {
  console.log(`Safety order ${event.data.level} filled at ${event.data.safetyOrder.filledPrice}`);
});

await bot.start();
```

---

## BB Bot (BAND)

**Codename:** Рид (Reed)  
**Category:** Operational  
**Strategy:** Bollinger Bands Reversal

### Overview

BB Bot trades Bollinger Bands reversals with Slow Stochastic confirmation and multi-timeframe analysis.

### Types

```typescript
interface BBBotConfig {
  id: string;
  symbol: string;
  exchangeId: string;
  marketType: 'spot' | 'futures';
  direction: 'LONG' | 'SHORT' | 'BOTH';
  
  // Bollinger Bands settings
  bbInnerPeriod: number;
  bbInnerDeviation: number;
  bbOuterPeriod: number;
  bbOuterDeviation: number;
  
  // Stochastic settings
  stochKPeriod: number;
  stochDPeriod: number;
  stochSlowing: number;
  stochOverbought: number;
  stochOversold: number;
  
  // Timeframes
  timeframes: string[];
  primaryTimeframe: string;
  
  // Position settings
  tradeAmount: number;
  leverage: number;
  marginMode: 'isolated' | 'cross';
  
  // Risk management
  stopLossPercent: number;
  takeProfitPercent: number;
  trailingStopPercent?: number;
  maxDrawdown: number;
  
  // Filters
  volumeFilterEnabled: boolean;
  minVolumeRatio: number;
  mtfConfirmationEnabled: boolean;
  requiredTimeframeConfirmations: number;
  divergenceFilterEnabled: boolean;
}

interface BBSignal {
  id: string;
  timestamp: Date;
  symbol: string;
  timeframe: string;
  direction: 'LONG' | 'SHORT';
  confidence: number;
  
  // Indicator values
  bbUpper: number;
  bbMiddle: number;
  bbLower: number;
  stochK: number;
  stochD: number;
  volume: number;
  
  // Conditions
  bbCondition: string;
  stochCondition: string;
  volumeCondition: boolean;
  mtfConfirmation?: MTFConfirmation;
  divergence?: { detected: boolean; type: 'BULLISH' | 'BEARISH' | null };
  
  executed: boolean;
  positionId?: string;
}
```

### Multi-Timeframe Confirmation

```typescript
interface MTFConfirmation {
  confirmed: boolean;
  direction: "LONG" | "SHORT" | "NEUTRAL";
  confidence: number;
  timeframeVotes: { 
    timeframe: string; 
    vote: "LONG" | "SHORT" | "NEUTRAL"; 
    weight: number;
  }[];
  reason: string;
}

// Timeframe weights
const TIMEFRAME_WEIGHTS = {
  '5m': 0.5,
  '15m': 1.0,
  '1h': 1.5,
  '4h': 2.0,
  '1d': 2.5,
};
```

### Divergence Detection

BB Bot includes a DivergenceDetector for identifying bullish/bearish divergences:

```typescript
interface DivergenceSignal {
  detected: boolean;
  type: "BULLISH" | "BEARISH" | null;
  strength: number;
  price: number;
  indicatorValue: number;
}
```

---

## Argus Bot (PND)

**Codename:** Argus (Pump/Dump Detector)  
**Category:** Institutional  
**Strategy:** Orderbook Analysis + Whale Tracking

### Overview

Argus Bot detects potential pump and dump movements through real-time orderbook analysis and whale activity tracking.

### Types

```typescript
interface ArgusBotConfig {
  id: string;
  symbol: string;
  exchangeId: string;
  marketType: 'spot' | 'futures';
  
  // Position settings
  tradeAmount: number;
  leverage: number;
  marginMode: 'isolated' | 'cross';
  
  // Orderbook analyzer
  orderbookConfig: Partial<OrderbookAnalyzerConfig>;
  
  // Whale tracker
  whaleConfig: Partial<WhaleTrackerConfig>;
  
  // Circuit breaker
  circuitBreakerConfig: Partial<CircuitBreakerConfig>;
  
  // Risk management
  stopLossPercent: number;
  takeProfitPercent: number;
  maxDrawdown: number;
  maxDailyLoss: number;
  
  // Confirmation thresholds
  pumpConfirmationThreshold: number;
  dumpConfirmationThreshold: number;
  whaleActivityThreshold: number;
  
  // Mode
  enableWhaleTracking: boolean;
  enableOrderbookAnalysis: boolean;
  requireBothConfirmations: boolean;
}
```

### Orderbook Analysis

```typescript
interface OrderbookMetrics {
  imbalance: number;           // -1 to 1 (bid vs ask dominance)
  bidVolume: number;
  askVolume: number;
  spread: number;
  spreadPercent: number;
  depthAtPrice: Map<number, number>;
  largeOrders: LargeOrder[];
  wallPrice: number | null;    // Large order wall
  wallType: 'BID' | 'ASK' | null;
}

interface OrderbookSignal {
  type: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  confidence: number;
  metrics: OrderbookMetrics;
  pumpConfirmed: boolean;
  dumpConfirmed: boolean;
}
```

### Whale Tracking

```typescript
interface WhaleOrder {
  id: string;
  timestamp: Date;
  symbol: string;
  side: "BUY" | "SELL";
  price: number;
  amount: number;
  value: number;
  exchange: string;
  detectedAt: Date;
}

interface WhaleActivity {
  symbol: string;
  buyCount: number;
  sellCount: number;
  buyValue: number;
  sellValue: number;
  netValue: number;
  largestBuy: number;
  largestSell: number;
  recentOrders: WhaleOrder[];
}

interface WhaleTrackerConfig {
  minValueUsdt: number;       // Default: 100,000
  lookbackMinutes: number;    // Default: 60
  alertThreshold: number;     // Default: 500,000
}
```

### Circuit Breaker

Progressive circuit breaker with multiple protection levels:

```typescript
interface CircuitBreakerState {
  level: 1 | 2 | 3 | 4;
  status: 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED';
  dailyLoss: number;
  dailyLossPercent: number;
  consecutiveLosses: number;
  lastReset: Date;
  tradingSuspended: boolean;
  requiresManualReset: boolean;
}
```

---

## Orion Bot (TRND)

**Codename:** Orion (Trend-Following Hunter)  
**Category:** Institutional  
**Strategy:** EMA + Supertrend with Kelly Criterion

### Overview

Orion Bot is a trend-following system using EMA alignment and Supertrend confirmation, with Kelly Criterion position sizing.

### Types

```typescript
interface TrendSignal {
  id: string;
  timestamp: number;
  symbol: string;
  exchange: string;
  direction: TrendDirection;
  strength: number;          // 0-1
  confidence: number;        // 0-1
  regime: MarketRegime;
  
  // EMA values
  ema: {
    ema20: number;
    ema50: number;
    ema200: number;
    alignment: number;       // 1 = bullish, -1 = bearish, 0 = mixed
  };
  
  // Supertrend values
  supertrend: {
    value: number;
    direction: 1 | -1;       // 1 = uptrend, -1 = downtrend
    distance: number;        // % from price
  };
  
  atr: number;
  price: number;
  
  components: {
    emaAligned: boolean;
    supertrendConfirmed: boolean;
    volumeConfirmed: boolean;
    momentumConfirmed: boolean;
  };
}

type TrendDirection = 'LONG' | 'SHORT' | 'FLAT';
type MarketRegime = 'trending' | 'ranging' | 'volatile' | 'transitioning';
```

### Risk Management

```typescript
interface RiskConfig {
  riskPerTrade: {
    mode: 'fixed' | 'kelly' | 'fractional_kelly';
    fixedPct?: number;
    kellyFraction?: number;    // e.g., 0.25 = quarter Kelly
    maxRiskPct: number;
    minRiskPct: number;
  };
  
  limits: {
    maxPositions: number;
    maxPositionsPerSymbol: number;
    maxPositionsPerExchange: number;
    maxCorrelation: number;
    maxDrawdownPct: number;
    dailyLossLimitPct: number;
  };
  
  leverage: {
    default: number;
    max: number;
    volatileRegimeMultiplier: number;
  };
}
```

### Hedging Engine

Orion supports hedging mode with state machine:

```typescript
type HedgeState = 'UNHEDGED' | 'PARTIAL' | 'FULL';

interface HedgePair {
  longPosition: OrionPosition | null;
  shortPosition: OrionPosition | null;
  netExposure: number;
  hedgeRatio: number;         // 0 = unhedged, 1 = fully hedged
  state: HedgeState;
}

interface HedgeDecision {
  action: 'OPEN_HEDGE' | 'CLOSE_HEDGE' | 'ADJUST_HEDGE' | 'NO_ACTION';
  reason: string;
  side: PositionSide | null;
  size?: number;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH';
}
```

---

## Vision Bot (FCST)

**Codename:** Vision (Market Forecast)  
**Category:** Institutional  
**Strategy:** ML Forecasting with Multi-Asset Analysis

### Overview

Vision Bot provides 24-hour market forecasts using ML classification, analyzing crypto assets, stock indices, and gold correlations.

### Types

```typescript
interface VisionBotConfig {
  id: string;
  name: string;
  enabled: boolean;
  
  // Data sources
  cryptoSymbols: string[];      // ['BTC/USDT', 'ETH/USDT', ...]
  stockIndices: string[];       // ['^GSPC', '^IXIC', '^DJI']
  goldSymbol: string;           // 'GC=F'
  
  // Analysis parameters
  timeframe: '1h' | '4h' | '1d';
  lookbackDays: number;
  volatilityLow: number;
  volatilityHigh: number;
  trendThreshold: number;
  correlationWeight: number;
  
  // Trading settings
  tradingEnabled: boolean;
  strategy: StrategyType;
  riskProfile: RiskProfileType;
  initialCapital: number;
  tradingFee: number;
}

interface MarketForecast {
  timestamp: Date;
  symbol: string;
  probabilities: ForecastProbabilities;
  indicators: AggregatedIndicators;
  correlations: Correlations;
  signal: ForecastSignal;
  confidence: number;
}

interface ForecastProbabilities {
  upward: number;           // 0-1
  downward: number;         // 0-1
  consolidation: number;    // 0-1
}

interface AggregatedIndicators {
  roc_24h: number;          // 24-hour Rate of Change
  atr_pct: number;          // ATR percentage
  trend_strength: number;   // EMA12/EMA26 trend
  volume_ratio: number;     // Current vs 24h MA
  crypto_cnt: number;       // Crypto assets analyzed
  stock_cnt: number;        // Stock indices analyzed
  gold_roc: number;         // Gold ROC
}
```

### Feature Engineering

Vision Bot uses comprehensive technical analysis:

```typescript
interface FeatureSet {
  rsi: RSISResult;
  macd: MACDResult;
  bollingerBands: BollingerBandsResult;
  atr: ATRResult;
  timestamp: Date;
}

// RSI Calculation
RSISResult = {
  value: number;
  overbought: boolean;   // >= 70
  oversold: boolean;     // <= 30
}

// MACD Calculation
MACDResult = {
  macd: number;
  signal: number;
  histogram: number;
  trend: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  crossover: 'BULLISH_CROSSOVER' | 'BEARISH_CROSSOVER' | 'NONE';
}

// ATR Calculation
ATRResult = {
  value: number;
  percent: number;
  volatility: 'LOW' | 'NORMAL' | 'HIGH' | 'EXTREME';
}
```

---

## Range Bot (RNG)

**Codename:** Range  
**Category:** Institutional  
**Strategy:** Support/Resistance Range Trading

### Overview

Range Bot trades within defined support/resistance zones using oscillator confirmation.

### Types

```typescript
interface RangeConfig {
  symbol: string;
  
  // Range detection
  lookbackPeriod: number;       // Periods for range detection
  minTouches: number;           // Minimum touches to confirm level
  touchThreshold: number;       // % price deviation for touch
  maxRangeWidth: number;        // Max range width %
  minRangeWidth: number;        // Min range width %
  
  // Entry/Exit
  entryFromSupport: number;     // % above support to buy
  entryFromResistance: number;  // % below resistance to sell
  takeProfitPercent: number;
  stopLossPercent: number;
  
  // Oscillator confirmation
  useRSI: boolean;
  rsiPeriod: number;
  rsiOversold: number;
  rsiOverbought: number;
  
  useStochastic: boolean;
  stochK: number;
  stochD: number;
  stochOversold: number;
  stochOverbought: number;
  
  // Breakout settings
  breakoutConfirmation: number; // % beyond level
  breakoutRetest: boolean;      // Wait for retest
  
  // Position sizing
  positionSize: number;
  maxPositions: number;
  
  // Risk management
  maxDailyLoss: number;
  maxDrawdown: number;
}

interface RangeState {
  symbol: string;
  rangeHigh: number;
  rangeLow: number;
  rangeMid: number;
  rangeWidth: number;       // percent
  inRange: boolean;
  position: 'TOP' | 'BOTTOM' | 'MIDDLE';
  breakout: 'UPSIDE' | 'DOWNSIDE' | null;
  timeInRange: number;      // periods
}

interface RangeSignal {
  type: 'BUY' | 'SELL' | 'CLOSE_LONG' | 'CLOSE_SHORT' | 'BREAKOUT_UP' | 'BREAKOUT_DOWN';
  price: number;
  confidence: number;
  reason: string;
  rangePosition: number;    // 0 = support, 1 = resistance
  oscillatorConfirm: boolean;
  timestamp: number;
}
```

---

## HFT Bot (Helios)

**Codename:** Helios  
**Category:** Frequency  
**Strategy:** Market Microstructure Analysis

### Overview

High-Frequency Trading bot targeting <10ms latency per trade using orderbook imbalance and momentum signals.

### Types

```typescript
interface HFTConfig {
  symbol: string;
  exchange: string;
  leverage: number;
  
  // Entry parameters
  entryThreshold: number;       // Min signal strength (0-1)
  orderbookDepth: number;       // Orderbook levels to analyze
  imbalanceThreshold: number;   // Orderbook imbalance threshold
  
  // Exit parameters
  takeProfitPercent: number;
  stopLossPercent: number;
  trailingStopPercent: number;
  
  // Risk management
  maxPositionSize: number;      // In base currency
  maxOrdersPerMinute: number;   // Rate limiting
  maxDrawdownPercent: number;
  
  // Timing
  analysisIntervalMs: number;   // Default: 100ms
  orderTimeoutMs: number;       // Order timeout
  
  // Feature flags
  enableLatencyArbitrage: boolean;
  enableSpreadCapture: boolean;
  enableMomentumSignals: boolean;
}

interface OrderbookSnapshot {
  symbol: string;
  exchange: string;
  timestamp: number;
  bids: [number, number][];     // [price, quantity]
  asks: [number, number][];
  bidVolume: number;
  askVolume: number;
  imbalance: number;            // (bidVol - askVol) / (bidVol + askVol)
  spread: number;
  spreadPercent: number;
  midPrice: number;
  vwap: number;
}

interface MicrostructureSignal {
  timestamp: number;
  signalType: 
    | 'imbalance_long'
    | 'imbalance_short'
    | 'spread_capture'
    | 'momentum_up'
    | 'momentum_down'
    | 'latency_arb'
    | 'none';
  
  strength: number;            // 0-1
  direction: 'LONG' | 'SHORT' | 'NEUTRAL';
  
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  
  confidence: number;
  metadata: {
    imbalance?: number;
    spread?: number;
    momentum?: number;
    volume?: number;
  };
}
```

### Performance Metrics

```typescript
interface HFTEngineState {
  status: 'idle' | 'running' | 'paused' | 'error';
  
  // Statistics
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  totalPnl: number;
  maxDrawdown: number;
  currentDrawdown: number;
  
  // Performance metrics
  avgLatency: number;          // microseconds
  minLatency: number;
  maxLatency: number;
  ordersLastMinute: number;
  
  // Error tracking
  consecutiveErrors: number;
  lastError?: string;
}
```

---

## MFT Bot (Selene)

**Codename:** Selene  
**Category:** Frequency  
**Strategy:** Volume Profile Analysis + Regime Detection

### Overview

Medium-Frequency Trading bot targeting <100ms latency, using volume profile and multi-timeframe analysis.

### Types

```typescript
interface MFTConfig {
  symbol: string;
  exchange: string;
  leverage: number;
  
  // Timeframes
  primaryTimeframe: string;     // e.g., '15m'
  higherTimeframe: string;      // e.g., '1h'
  lowerTimeframe: string;       // e.g., '5m'
  
  // Volume profile
  volumeProfilePeriods: number;
  volumeNodeThreshold: number;  // High volume node threshold
  
  // Entry parameters
  entryThreshold: number;
  requireHigherTFConfirmation: boolean;
  
  // Exit parameters
  takeProfitRR: number;         // Risk:Reward ratio
  stopLossATR: number;          // Stop loss in ATR multiples
  trailingStopATR: number;
  
  // Risk management
  maxPositionSize: number;
  maxDailyTrades: number;
  maxDrawdownPercent: number;
  
  // Timing
  analysisIntervalMs: number;   // Default: 5000ms
  
  // Feature flags
  enableVolumeProfile: boolean;
  enableRegimeDetection: boolean;
  enableMTFConfirmation: boolean;
}

interface VolumeProfile {
  symbol: string;
  timeframe: string;
  nodes: VolumeNode[];
  poc: number;                  // Point of Control
  vah: number;                  // Value Area High
  val: number;                  // Value Area Low
  timestamp: number;
}

interface VolumeNode {
  price: number;
  volume: number;
  isHighVolume: boolean;
  isPOC: boolean;
}

interface MarketRegime {
  type: 'trending' | 'ranging' | 'volatile' | 'quiet';
  strength: number;            // 0-1
  direction: 'up' | 'down' | 'sideways';
  confidence: number;
  timestamp: number;
}
```

---

## LFT Bot (Atlas)

**Codename:** Atlas  
**Category:** Frequency  
**Strategy:** Trend Following + Multi-Timeframe

### Overview

Low-Frequency Trading bot targeting <1s latency, using trend following with position scaling.

### Types

```typescript
interface LFTConfig {
  symbol: string;
  exchange: string;
  leverage: number;
  
  // Timeframes
  primaryTimeframe: string;     // e.g., '4h'
  higherTimeframe: string;      // e.g., '1d'
  lowerTimeframe: string;       // e.g., '1h'
  
  // Trend parameters
  trendPeriod: number;          // EMA period
  trendThreshold: number;       // Min slope for confirmation
  
  // Entry parameters
  entryThreshold: number;
  requireHigherTFConfirmation: boolean;
  pullbackEntry: boolean;
  
  // Exit parameters
  takeProfitRR: number;
  stopLossATR: number;
  trailingStopATR: number;
  timeBasedExit: number;        // Hours
  
  // Position management
  maxPositionSize: number;
  positionScaleIn: boolean;
  positionScaleOut: boolean;
  scaleInPercent: number;
  scaleOutPercent: number;
  
  // Risk management
  maxWeeklyTrades: number;
  maxDrawdownPercent: number;
  riskPerTrade: number;         // % of account
  
  // Timing
  analysisIntervalMs: number;   // Default: 60000ms
}

interface TrendAnalysis {
  direction: 'up' | 'down' | 'sideways';
  strength: number;            // 0-1
  slope: number;               // Price change per period
  ema: number;
  pricePosition: 'above' | 'below' | 'neutral';
  confidence: number;
  timestamp: number;
}

interface SupportResistance {
  levels: Level[];
  nearestSupport: number | null;
  nearestResistance: number | null;
  strength: number;
  timestamp: number;
}
```

---

## WolfBot

**Codename:** WolfBot  
**Category:** Analytical  
**Strategy:** Pattern Recognition + Technical Analysis

### Overview

WolfBot provides comprehensive technical analysis with 200+ indicators, 20+ candlestick patterns, and auto trendline detection.

### Types

```typescript
interface FullAnalysis {
  symbol: string;
  timestamp: number;
  
  // Trend
  trend: 'bullish' | 'bearish' | 'sideways';
  trendStrength: number;
  
  // Support/Resistance
  nearestSupport: number | null;
  nearestResistance: number | null;
  
  // Patterns
  patterns: PatternResult;
  
  // Breakout signals
  breakouts: BreakoutSignal[];
  
  // Multi-timeframe signal
  mtfSignal?: StrategySignal;
  
  // Key indicators
  indicators: {
    rsi: number | null;
    macd: { macd: number | null; signal: number | null; histogram: number | null };
    bb: { upper: number | null; middle: number | null; lower: number | null };
    atr: number | null;
    adx: number | null;
  };
}

interface PatternResult {
  patterns: PatternMatch[];
  strongestPattern: PatternMatch | null;
  bullishPatterns: PatternMatch[];
  bearishPatterns: PatternMatch[];
  neutralPatterns: PatternMatch[];
}

interface PatternMatch {
  name: string;
  type: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  startIndex: number;
  endIndex: number;
}
```

### Features

1. **200+ Technical Indicators** - RSI, MACD, Bollinger, ATR, ADX, etc.
2. **20+ Candlestick Patterns** - Doji, Hammer, Engulfing, etc.
3. **Auto Trendline Detection** - Support/resistance levels
4. **Arbitrage Module** - Triangular arbitrage detection

---

## LOGOS Meta Bot

**Codename:** LOGOS  
**Category:** Meta  
**Strategy:** Signal Aggregation + Consensus Building

### Overview

LOGOS is the meta bot that aggregates signals from all other bots, builds consensus, and produces unified trading decisions.

### Types

```typescript
interface AggregatedSignal {
  id: string;
  timestamp: number;
  symbol: string;
  exchange: string;
  
  // Decision
  direction: 'LONG' | 'SHORT' | 'NEUTRAL';
  confidence: number;
  consensus: number;           // Agreement level
  
  // Entry/Exit
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  riskRewardRatio: number;
  
  // Aggregation details
  participatingBots: BotCode[];
  longVotes: number;
  shortVotes: number;
  neutralVotes: number;
  weightedLongScore: number;
  weightedShortScore: number;
  
  // Quality metrics
  signalQuality: 'high' | 'medium' | 'low';
  conflictDetected: boolean;
  conflictReason?: string;
  
  // Individual contributions
  contributions: SignalContribution[];
}

interface AggregationConfig {
  minSignals: number;          // Minimum signals to aggregate
  minConfidence: number;       // Minimum confidence threshold
  minConsensus: number;        // Minimum consensus to act
  
  categoryWeights: {
    operational: number;
    institutional: number;
    frequency: number;
  };
  
  confidenceWeighting: boolean;
  performanceWeighting: boolean;
  
  conflictResolution: 'strict' | 'moderate' | 'loose';
  conflictThreshold: number;
  
  aggregationWindowMs: number;
  
  signalDecay: boolean;
  decayRate: number;
}
```

### Strategy Switching

LOGOS includes automatic strategy switching based on market regime:

```typescript
interface StrategyProfile {
  name: string;
  regimeType: MarketRegimeType;
  
  riskParams: {
    stopLossMultiplier: number;
    takeProfitMultiplier: number;
    aggregationMinSignals: number;
    minConfidenceThreshold: number;
    consensusThreshold: number;
    positionSizeMultiplier: number;
  };
  
  botWeights: Partial<Record<BotCode, number>>;
  
  behavior: {
    useTightStops: boolean;
    aggressiveEntry: boolean;
    requireHigherConsensus: boolean;
    avoidCounterTrend: boolean;
  };
}

type MarketRegimeType = 'trending' | 'ranging' | 'volatile' | 'quiet';
```

### Bot Performance Tracking

```typescript
interface BotPerformance {
  botCode: BotCode;
  totalSignals: number;
  longSignals: number;
  shortSignals: number;
  correctSignals: number;
  incorrectSignals: number;
  accuracy: number;
  avgConfidence: number;
  avgLatency: number;
  lastSignalTime: number;
  weightedScore: number;
}
```

### Usage Example

```typescript
import { LOGOSEngine } from '@/lib/logos-bot/engine';

const logos = new LOGOSEngine({
  minSignals: 2,
  minConfidence: 0.6,
  minConsensus: 0.65,
  enableStrategySwitching: true,
});

logos.on('SIGNAL_AGGREGATED', (signal) => {
  console.log(`Aggregated ${signal.participatingBots.length} bots`);
  console.log(`Direction: ${signal.direction}, Confidence: ${signal.confidence}`);
});

await logos.start();

// Update with market data for strategy switching
logos.updateMarketData('BTCUSDT', 'binance', candles);
```

---

## Bot Comparison Matrix

| Bot | Category | Frequency | Risk Level | Latency Target |
|-----|----------|-----------|------------|----------------|
| MESH | Operational | Medium | Moderate | <1s |
| SCALE | Operational | Low | Moderate | <1s |
| BAND | Operational | Medium | Moderate | <1s |
| PND | Institutional | Variable | Aggressive | <500ms |
| TRND | Institutional | Low | Conservative | <1s |
| FCST | Institutional | Low | Conservative | <1s |
| RNG | Institutional | Medium | Moderate | <1s |
| HFT | Frequency | Very High | Aggressive | <10ms |
| MFT | Frequency | High | Moderate | <100ms |
| LFT | Frequency | Low | Conservative | <1s |
| LOGOS | Meta | Variable | Conservative | <500ms |

---

## API Endpoints Summary

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/bots` | GET | List all bots |
| `/api/bots/[type]` | GET, POST | List/create bots by type |
| `/api/bots/[type]/[id]` | GET, PUT, DELETE | Bot CRUD |
| `/api/bots/[type]/[id]/start` | POST | Start bot |
| `/api/bots/[type]/[id]/stop` | POST | Stop bot |
| `/api/bots/[type]/[id]/pause` | POST | Pause bot |
| `/api/bots/[type]/[id]/metrics` | GET | Get metrics |
| `/api/bots/[type]/[id]/trades` | GET | Get trade history |
| `/api/bots/[type]/[id]/signals` | GET | Get signal history |

---

## Configuration Best Practices

### Grid Bot (MESH)

```typescript
// Conservative configuration
{
  gridType: 'geometric',
  gridLevels: 15,
  leverage: 1,
  trailingEnabled: false,
  maxDrawdown: 10,
}

// Aggressive configuration
{
  gridType: 'adaptive',
  gridLevels: 30,
  leverage: 3,
  trailingEnabled: true,
  maxDrawdown: 20,
}
```

### DCA Bot (SCALE)

```typescript
// Conservative configuration
{
  safetyOrdersCount: 3,
  safetyOrderVolumeScale: 1.2,
  takeProfitPercent: 3,
  volatilityScalingEnabled: true,
}

// Aggressive configuration
{
  safetyOrdersCount: 7,
  safetyOrderVolumeScale: 2.0,
  takeProfitPercent: 8,
  trailingStopEnabled: true,
}
```

---

## Error Handling

All bot engines emit standardized events:

```typescript
type BotEventType =
  | 'BOT_STARTED'
  | 'BOT_STOPPED'
  | 'BOT_PAUSED'
  | 'BOT_RESUMED'
  | 'POSITION_OPENED'
  | 'POSITION_CLOSED'
  | 'ORDER_FILLED'
  | 'ORDER_CANCELLED'
  | 'SIGNAL_GENERATED'
  | 'SIGNAL_FILTERED'
  | 'ERROR'
  | 'MAX_DRAWDOWN_REACHED'
  | 'CIRCUIT_BREAKER_TRIGGERED';
```

---

*Last updated: March 2026*
