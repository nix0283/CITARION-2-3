# Operational Bots Documentation

**Status:** Production Ready  
**Version:** 2.0.0  
**Last Updated:** March 2026

---

## Table of Contents

1. [Overview](#1-overview)
2. [Grid Bot (MESH)](#2-grid-bot-mesh)
3. [DCA Bot (SCALE)](#3-dca-bot-scale)
4. [BB Bot (BAND)](#4-bb-bot-band)
5. [API Reference](#5-api-reference)
6. [Usage Examples](#6-usage-examples)
7. [Best Practices](#7-best-practices)

---

## 1. Overview

### 1.1 Introduction

Operational Bots — это три специализированных торговых бота для автоматизированной торговли на криптовалютных рынках. Каждый бот оптимизирован под конкретную рыночную стратегию:

| Bot | Codename | Strategy | Best For |
|-----|----------|----------|----------|
| **Grid Bot** | MESH / Архитектор | Сеточная торговля | Боковой рынок (флэт) |
| **DCA Bot** | SCALE / Крон | Dollar Cost Averaging | Накопление позиции |
| **BB Bot** | BAND / Рид | Bollinger Bands | Volatility trading |

### 1.2 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      OPERATIONAL BOTS ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────┐   ┌────────────────┐   ┌────────────────┐          │
│  │  Grid Bot      │   │  DCA Bot       │   │  BB Bot        │          │
│  │  Manager       │   │  Manager       │   │  Manager       │          │
│  │  (MESH)        │   │  (SCALE)       │   │  (BAND)        │          │
│  └───────┬────────┘   └───────┬────────┘   └───────┬────────┘          │
│          │                    │                    │                    │
│          ▼                    ▼                    ▼                    │
│  ┌────────────────┐   ┌────────────────┐   ┌────────────────┐          │
│  │ Grid Bot       │   │ DCA Bot        │   │ BB Bot         │          │
│  │ Engine         │   │ Engine         │   │ Engine         │          │
│  └───────┬────────┘   └───────┬────────┘   └───────┬────────┘          │
│          │                    │                    │                    │
│          └────────────────────┼────────────────────┘                    │
│                               │                                         │
│                               ▼                                         │
│                    ┌─────────────────────┐                              │
│                    │  Exchange Adapter   │                              │
│                    │  (Multi-Exchange)   │                              │
│                    └─────────────────────┘                              │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Supported Exchanges

All operational bots support the following exchanges:

- **Binance** (Spot & Futures)
- **Bybit** (Spot & Futures)
- **OKX** (Spot & Futures)
- **Bitget** (Spot & Futures)
- **KuCoin** (Spot & Futures)
- **BingX** (Spot & Futures)
- **HyperLiquid** (Perpetuals)
- **Aster DEX** (DeFi)

---

## 2. Grid Bot (MESH)

### 2.1 Overview

**Grid Bot (MESH)** — сеточный торговый бот, создающий структуру ордеров в заданном ценовом диапазоне. Также известен как **Архитектор**.

**Кодовое имя:** `MESH` / `Архитектор`

**Принцип работы:**
- Покупает при падении цены к нижним уровням сетки
- Продаёт при росте цены к верхним уровням сетки
- Зарабатывает на колебаниях цены в диапазоне

### 2.2 Component: GridBotManager

**Location:** `src/components/bots/grid-bot-manager.tsx`

```tsx
export function GridBotManager() {
  // State
  const [bots, setBots] = useState<GridBot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  // Backtest state
  const [showBacktest, setShowBacktest] = useState(false);
  const [backtestResult, setBacktestResult] = useState<BacktestResult | null>(null);
  
  // Paper trading state
  const [isPaperTrading, setIsPaperTrading] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [gridType, setGridType] = useState<"ARITHMETIC" | "GEOMETRIC">("ARITHMETIC");
  const [gridCount, setGridCount] = useState(10);
  // ...
}
```

### 2.3 GridBot Interface

```tsx
interface GridBot {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  symbol: string;
  exchangeId: string;
  gridType: "ARITHMETIC" | "GEOMETRIC";
  gridCount: number;
  upperPrice: number;
  lowerPrice: number;
  totalInvestment: number;
  leverage: number;
  status: "RUNNING" | "STOPPED" | "PAUSED" | "COMPLETED";
  totalProfit: number;
  totalTrades: number;
  account: {
    exchangeName: string;
    accountType: string;
  };
}
```

### 2.4 Grid Types

#### Arithmetic Grid

Равные интервалы между уровнями:

```
Price: $70,000 ─────────────── Level 5 (Sell)
                    ↑ $2,500
Price: $67,500 ─────────────── Level 4
                    ↑ $2,500
Price: $65,000 ─────────────── Level 3 (Current)
                    ↑ $2,500
Price: $62,500 ─────────────── Level 2
                    ↑ $2,500
Price: $60,000 ─────────────── Level 1 (Buy)
```

**Formula:** `step = (upperPrice - lowerPrice) / (gridLevels - 1)`

#### Geometric Grid

Равные процентные интервалы:

```
Price: $70,000 ─────────────── Level 5 (+5.2% from previous)
Price: $66,554 ─────────────── Level 4 (+5.2%)
Price: $63,275 ─────────────── Level 3 (+5.2%)
Price: $60,158 ─────────────── Level 2 (+5.2%)
Price: $57,194 ─────────────── Level 1 (Base)
```

**Formula:** `ratio = (upperPrice / lowerPrice) ^ (1 / (gridLevels - 1))`

### 2.5 Grid Bot Engine

**Location:** `src/lib/grid-bot/grid-bot-engine.ts`

```tsx
export class GridBotEngine extends EventEmitter {
  private config: GridBotConfig;
  private state: GridBotState;
  private adapter: GridBotAdapter;
  
  // Lifecycle
  async start(): Promise<{ success: boolean; error?: string }>;
  async stop(cancelOrders: boolean): Promise<void>;
  async pause(): Promise<void>;
  async resume(): Promise<void>;
  
  // Getters
  getConfig(): GridBotConfig;
  getState(): GridBotState;
  getTrades(): GridTrade[];
  getMetrics(): GridBotMetrics;
  getCurrentPrice(): number;
}
```

### 2.6 Configuration Parameters

```tsx
interface GridBotConfig {
  id: string;
  name: string;
  symbol: string;
  exchange: string;
  accountId: string;
  accountType: 'DEMO' | 'REAL';
  
  // Grid settings
  gridType: 'arithmetic' | 'geometric' | 'adaptive';
  gridLevels: number;           // 2-50
  upperPrice: number;
  lowerPrice: number;
  
  // Position settings
  positionSize: number;
  positionSizeType: 'fixed' | 'percent' | 'risk_based';
  leverage: number;             // 1-20
  
  // Trailing grid
  trailingEnabled: boolean;
  trailingActivationPercent: number;
  trailingDistancePercent: number;
  
  // Risk management
  maxDrawdown: number;          // Percentage
  stopLossPercent?: number;
  takeProfitPercent?: number;
  maxOpenPositions: number;
  
  // Execution
  orderType: 'limit' | 'market';
  priceTickOffset: number;
  
  // Advanced
  rebalanceEnabled: boolean;
  rebalanceThreshold: number;
  dynamicAdjustmentEnabled: boolean;
}
```

### 2.7 Grid Bot Metrics

| Metric | Description |
|--------|-------------|
| `totalReturn` | Total profit/loss in quote currency |
| `totalReturnPercent` | Total return as percentage |
| `winRate` | Percentage of winning trades |
| `profitFactor` | Gross profit / Gross loss |
| `sharpeRatio` | Risk-adjusted return |
| `maxDrawdown` | Maximum equity decline |
| `gridEfficiency` | Percentage of filled levels |
| `orderFillRate` | Order execution success rate |

### 2.8 Events

```tsx
type GridBotEventType =
  | 'BOT_STARTED'
  | 'BOT_STOPPED'
  | 'GRID_INITIALIZED'
  | 'ORDER_PLACED'
  | 'ORDER_FILLED'
  | 'ORDER_CANCELLED'
  | 'POSITION_OPENED'
  | 'POSITION_CLOSED'
  | 'GRID_REBALANCED'
  | 'TRAILING_ACTIVATED'
  | 'STOP_LOSS_TRIGGERED'
  | 'MAX_DRAWDOWN_REACHED'
  | 'ERROR';
```

---

## 3. DCA Bot (SCALE)

### 3.1 Overview

**DCA Bot (SCALE)** — бот для Dollar Cost Averaging стратегии. Также известен как **Крон**.

**Кодовое имя:** `SCALE` / `Крон`

**Принцип работы:**
- Открывает базовую позицию
- Добавляет Safety Orders при падении цены
- Усредняет точку входа
- Закрывает позицию при достижении Take Profit

### 3.2 Component: DCABotManager

**Location:** `src/components/bots/dca-bot-manager.tsx`

```tsx
export function DcaBotManager() {
  // State
  const [bots, setBots] = useState<DcaBot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Signal Filter State
  const [filterEnabled, setFilterEnabled] = useState(true);
  const [filterConfig, setFilterConfig] = useState<DCAFilterConfig>(DEFAULT_DCA_FILTER_CONFIG);
  const [dcaLevelPreview, setDcaLevelPreview] = useState<DCALevelPreview[]>([]);
  
  // Form state
  const [direction, setDirection] = useState<"LONG" | "SHORT">("LONG");
  const [baseAmount, setBaseAmount] = useState("100");
  const [dcaLevels, setDcaLevels] = useState(5);
  const [dcaPercent, setDcaPercent] = useState(5);
  const [dcaMultiplier, setDcaMultiplier] = useState(1.5);
  // ...
}
```

### 3.3 DCABot Interface

```tsx
interface DcaBot {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  symbol: string;
  exchangeId: string;
  direction: "LONG" | "SHORT";
  
  // DCA settings
  baseAmount: number;
  dcaLevels: number;
  dcaPercent: number;          // Price drop % for each DCA
  dcaMultiplier: number;       // Amount multiplier per level
  
  // Take Profit / Stop Loss
  tpType: "total" | "perLevel";
  tpValue: number;
  slEnabled: boolean;
  slValue?: number;
  
  // State
  leverage: number;
  status: string;
  totalInvested: number;
  totalAmount: number;
  avgEntryPrice?: number;
  currentLevel: number;
  realizedPnL: number;
}
```

### 3.4 DCA Algorithm

```
Entry Price: $50,000
Base Amount: $100
DCA Levels: 5
DCA Percent: 5%
DCA Multiplier: 1.5x

┌─────────┬──────────────┬──────────┬─────────────────────┐
│ Level   │ Trigger Price │ Amount   │ New Avg Entry       │
├─────────┼──────────────┼──────────┼─────────────────────┤
│ Base    │ $50,000      │ $100     │ $50,000.00          │
│ DCA 1   │ $47,500 (-5%)│ $150     │ $48,571.43          │
│ DCA 2   │ $45,125 (-5%)│ $225     │ $46,923.08          │
│ DCA 3   │ $42,869 (-5%)│ $337.50  │ $45,238.10          │
│ DCA 4   │ $40,725 (-5%)│ $506.25  │ $43,478.26          │
│ DCA 5   │ $38,689 (-5%)│ $759.38  │ $41,666.67          │
└─────────┴──────────────┴──────────┴─────────────────────┘

Take Profit: +10% from average entry
Stop Loss: -15% from average entry (optional)
```

### 3.5 DCA Bot Engine

**Location:** `src/lib/dca-bot/dca-bot-engine.ts`

```tsx
export class DCABotEngine extends EventEmitter {
  private config: DCABotConfig;
  private state: DCABotState;
  private adapter: DCABotAdapter;
  
  // Volatility scaling
  private volatilityScaler: VolatilityScaler | null;
  private currentScaling: ScalingResult | null;
  
  // Lifecycle
  async start(): Promise<{ success: boolean; error?: string }>;
  async stop(closePosition: boolean): Promise<void>;
  async pause(): Promise<void>;
  async resume(): Promise<void>;
  
  // Position management
  private async openBasePosition(): Promise<void>;
  private async addSafetyOrder(): Promise<void>;
  private async closePosition(reason: CloseReason): Promise<void>;
  
  // Volatility
  getOptimizedParameters(availableCapital: number): OptimizedDCAConfig | null;
  getVolatilityReading(): VolatilityReading | null;
  getCurrentScaling(): ScalingResult | null;
}
```

### 3.6 ML Integration for Timing

DCA Bot включает интеграцию с ML для оптимизации тайминга входа:

#### DCA Entry Filter

**Location:** `src/lib/bot-filters/dca-entry-filter.ts`

```tsx
export class DCAEntryFilter {
  private config: DCAFilterConfig;
  
  async evaluate(signal: DCASignal): Promise<DCAFilterResult>;
  
  // Checks
  private checkPriceDrop(signal: DCASignal): PriceDropResult;
  private checkRSI(signal: DCASignal): RSIResult;
  private checkATR(signal: DCASignal): ATRResult;
  
  // Calculations
  calculateOptimalLevel(signal: DCASignal): number;
  calculateAmount(signal: DCASignal): number;
  calculateAvgEntryAdjustment(signal: DCASignal, amount: number): number;
}
```

#### DCA Filter Configuration

```tsx
interface DCAFilterConfig {
  // Price drop thresholds per level (percentage)
  levelDropThresholds: number[];       // [3, 5, 7, 10, 15, 20, 25, 30, 35, 40]
  
  // RSI thresholds
  rsiOversold: number;                 // 30
  rsiSeverelyOversold: number;         // 20
  
  // Amount multipliers per level
  amountMultipliers: number[];         // [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5]
  
  // ATR-based adjustments
  atrMultiplierThreshold: number;      // 2
  
  // Minimum thresholds
  minConfidence: number;               // 0.5
  
  // Margin requirements
  requireMarginCheck: boolean;
  minMarginPercent: number;            // 10
}
```

#### DCA Signal Evaluation

```tsx
interface DCASignal {
  symbol: string;
  currentPrice: number;
  avgEntryPrice: number;
  currentLevel: number;
  maxLevels: number;
  totalInvested: number;
  totalAmount: number;
  unrealizedPnl: number;
  rsi: number;
  atr: number;
  priceDropPercent: number;
}

interface DCAFilterResult {
  approved: boolean;
  confidence: number;           // 0.0 - 1.0
  level: number;                // Recommended DCA level
  amount: number;               // Recommended amount
  reasons: string[];
  avgEntryAdjustment: number;
}
```

### 3.7 Volatility Scaling

DCA Bot поддерживает адаптивное масштабирование на основе волатильности:

```tsx
interface VolatilityReading {
  atrPercent: number;
  volatilityLevel: 'LOW' | 'NORMAL' | 'HIGH' | 'EXTREME';
  recommendedAction: 'NORMAL_DCA' | 'INCREASE_SIZE' | 'PAUSE_DCA';
}

interface ScalingResult {
  positionSizeMultiplier: number;
  levelSpacingMultiplier: number;
  maxSafetyOrders: number;
  recommendedPause: boolean;
}
```

| Volatility Level | Position Size | Level Spacing | Max DCA Levels |
|-----------------|---------------|---------------|----------------|
| LOW (<1.5%) | 1.0x | 0.8x | All |
| NORMAL (1.5-3.5%) | 1.0x | 1.0x | All |
| HIGH (3.5-6%) | 0.8x | 1.2x | Reduced |
| EXTREME (>6%) | 0.5x | 1.5x | Paused |

### 3.8 Events

```tsx
type DCABotEventType =
  | 'BOT_STARTED'
  | 'BOT_STOPPED'
  | 'POSITION_OPENED'
  | 'POSITION_CLOSED'
  | 'SAFETY_ORDER_TRIGGERED'
  | 'SAFETY_ORDER_FILLED'
  | 'TAKE_PROFIT_TRIGGERED'
  | 'STOP_LOSS_TRIGGERED'
  | 'TRAILING_STOP_ACTIVATED'
  | 'AVERAGING_TRIGGERED'
  | 'MAX_TIME_REACHED'
  | 'MAX_DRAWDOWN_REACHED'
  | 'VOLATILITY_UPDATE'
  | 'ERROR';
```

---

## 4. BB Bot (BAND)

### 4.1 Overview

**BB Bot (BAND)** — бот на основе Bollinger Bands стратегии. Также известен как **Рид**.

**Кодовое имя:** `BAND` / `Рид`

**Принцип работы:**
- Использует Double Bollinger Bands (Inner & Outer)
- Подтверждение через Slow Stochastic
- Multi-timeframe анализ
- Автоматическое определение паттернов

### 4.2 Component: BBBotManager

**Location:** `src/components/bots/bb-bot-manager.tsx`

```tsx
export function BBBotManager() {
  // State
  const [bots, setBots] = useState<BBBot[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
  // Signal Filter State
  const [filterEnabled, setFilterEnabled] = useState(true);
  const [filterConfig, setFilterConfig] = useState<BBFilterConfig>(DEFAULT_BB_FILTER_CONFIG);
  const [currentFilterResult, setCurrentFilterResult] = useState<BBFilterResult | null>(null);
  
  // Expanded timeframes state
  const [expandedTimeframes, setExpandedTimeframes] = useState<Record<string, boolean>>({});
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    symbol: 'BTCUSDT',
    marketType: 'FUTURES',
    timeframes: ['15m'] as string[],
    direction: 'LONG',
    tradeAmount: 100,
    leverage: 1,
    // ...
  });
}
```

### 4.3 BBBot Interface

```tsx
interface BBBot {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  symbol: string;
  exchangeId: string;
  marketType: "SPOT" | "FUTURES";
  timeframes: string;           // JSON array
  direction: "LONG" | "SHORT" | "BOTH";
  
  // Position
  tradeAmount: number;
  leverage: number;
  marginMode: "ISOLATED" | "CROSS";
  
  // Risk
  stopLoss?: number;
  takeProfit?: number;
  trailingStop?: number;
  
  // Manual mode
  isManualMode: boolean;
  manualEntryPrice?: number;
  manualTargets?: string;       // JSON array
  manualStopLoss?: number;
  
  // State
  status: string;
  totalProfit: number;
  totalTrades: number;
  winTrades: number;
  lossTrades: number;
  realizedPnL: number;
  
  // Timeframe configs
  timeframeConfigs: TimeframeConfig[];
}
```

### 4.4 Bollinger Bands Strategy

#### Double Bollinger Bands

```
                    Upper Outer (2.0σ)
                    ─────────────────────
                    Upper Inner (1.0σ)
                    ─────────────────────
                    
                    Middle (SMA 20)
                    ══════════════════════
                    
                    Lower Inner (1.0σ)
                    ─────────────────────
                    Lower Outer (2.0σ)
                    ─────────────────────

Signal Zones:
• OUTSIDE bands: Strong reversal signal
• BETWEEN inner & outer: Trend continuation
• INSIDE inner: Neutral / Squeeze
```

#### Timeframe Configuration

```tsx
interface TimeframeConfig {
  timeframe: string;
  
  // Bollinger Bands
  bbEnabled: boolean;
  bbInnerPeriod: number;        // Default: 20
  bbInnerDeviation: number;     // Default: 1.0
  bbOuterPeriod: number;        // Default: 20
  bbOuterDeviation: number;     // Default: 2.0
  bbSource: string;             // close, open, hl2, hlc3
  
  // Stochastic
  stochEnabled: boolean;
  stochKPeriod: number;         // Default: 14
  stochDPeriod: number;         // Default: 3
  stochSlowing: number;         // Default: 3
  stochOverbought: number;      // Default: 80
  stochOversold: number;        // Default: 20
  
  // Moving Averages
  emaEnabled: boolean;
  emaPeriod: number;
  smaEnabled: boolean;
  smaPeriod: number;
  smmaEnabled: boolean;
  smmaPeriod: number;
}
```

### 4.5 BB Bot Engine

**Location:** `src/lib/bb-bot/engine.ts`

```tsx
export class BBBotEngine extends EventEmitter {
  private config: BBBotConfig;
  private state: BBBotState;
  private adapter: BBAdapter;
  
  // Analysis components
  private mtfConfirmation: MultiTimeframeConfirmation;
  private volumeFilter: VolumeConfirmationFilter;
  private divergenceDetector: DivergenceDetector;
  
  // Lifecycle
  async start(): Promise<{ success: boolean; error?: string }>;
  async stop(closePosition: boolean): Promise<void>;
  async pause(): Promise<void>;
  async resume(): Promise<void>;
  
  // Signal analysis
  private async analyzeAndGenerateSignal(): Promise<BBSignal | null>;
  private calculateIndicators(ohlcv: OHLCV[]): BBIndicators;
  
  // Getters
  getConfig(): BBBotConfig;
  getState(): BBBotState;
  getSignals(): BBSignal[];
  getCurrentPrice(): number;
}
```

### 4.6 ML Classification for Breakouts

#### BB Signal Filter

**Location:** `src/lib/bot-filters/bb-signal-filter.ts`

```tsx
export class BBSignalFilter {
  private config: BBFilterConfig;
  private signalHistory: Map<string, BBSignal[]>;
  
  async evaluate(signal: BBSignal): Promise<BBFilterResult>;
  
  // Pattern detection
  private detectSignalType(signal: BBSignal): SignalType;
  private isBandWalk(signal: BBSignal): boolean;
  private isReversalPattern(signal: BBSignal): boolean;
  
  // Analysis methods
  private analyzeOuterTouch(signal: BBSignal): AnalysisResult;
  private analyzeInnerTouch(signal: BBSignal): AnalysisResult;
  private analyzeBandWalk(signal: BBSignal): AnalysisResult;
  private analyzeReversal(signal: BBSignal): AnalysisResult;
  private analyzeSqueeze(signal: BBSignal): AnalysisResult;
}
```

#### Signal Types

```tsx
type SignalType = 
  | 'INNER_TOUCH'    // Price touched inner band
  | 'OUTER_TOUCH'    // Price touched outer band
  | 'BAND_WALK'      // Price walking along bands
  | 'SQUEEZE'        // Low volatility squeeze
  | 'REVERSAL';      // Reversal pattern detected
```

#### BB Filter Configuration

```tsx
interface BBFilterConfig {
  // Stochastic thresholds
  stochOversold: number;        // 20
  stochOverbought: number;      // 80
  
  // Band position weights
  outerBandWeight: number;      // 1.0
  innerBandWeight: number;      // 0.7
  
  // Squeeze detection
  squeezeBandwidthThreshold: number;  // 0.05
  
  // Confidence modifiers
  trendAlignmentBonus: number;  // 0.15
  divergenceBonus: number;      // 0.2
  
  // Minimum thresholds
  minProbability: number;       // 0.6
  minConfidence: number;        // 0.5
}
```

#### BB Signal Evaluation

```tsx
interface BBSignal {
  symbol: string;
  timeframe: string;
  currentPrice: number;
  
  // BB values
  bbInnerUpper: number;
  bbInnerLower: number;
  bbOuterUpper: number;
  bbOuterLower: number;
  bbMiddle: number;
  percentB: number;            // Position within bands (0-1)
  bandwidth: number;
  
  // Stochastic
  stochK: number;
  stochD: number;
  
  // Context
  trend: 'TRENDING_UP' | 'TRENDING_DOWN' | 'RANGING';
}

interface BBFilterResult {
  approved: boolean;
  probability: number;         // 0.0 - 1.0
  confidence: number;          // 0.0 - 1.0
  direction: 'LONG' | 'SHORT' | 'NEUTRAL';
  signalType: SignalType;
  reasons: string[];
}
```

### 4.7 Signal Analysis Patterns

#### Outer Band Touch (Reversal Signal)

```
LONG Signal Conditions:
• Price touches lower outer band
• Stochastic K & D both oversold (<20)
• K crossing above D (bullish crossover)

SHORT Signal Conditions:
• Price touches upper outer band
• Stochastic K & D both overbought (>80)
• K crossing below D (bearish crossover)
```

#### Squeeze Pattern (Breakout Signal)

```
Squeeze Detection:
• Bandwidth < 5% (narrow bands)
• Low volatility consolidation
• High probability breakout incoming

Direction determined by:
• Trend direction
• Price position relative to middle band
• Stochastic momentum
```

### 4.8 Events

```tsx
type BBBotEventType =
  | 'BOT_STARTED'
  | 'BOT_STOPPED'
  | 'BOT_INITIALIZED'
  | 'SIGNAL_GENERATED'
  | 'POSITION_OPENED'
  | 'POSITION_CLOSED'
  | 'TAKE_PROFIT_FILLED'
  | 'STOP_LOSS_TRIGGERED'
  | 'TRAILING_STOP_UPDATED'
  | 'PRICE_UPDATE'
  | 'ERROR';
```

---

## 5. API Reference

### 5.1 Grid Bot API

#### Create Grid Bot

```http
POST /api/bots/grid
Content-Type: application/json

{
  "name": "BTC Grid Bot",
  "symbol": "BTCUSDT",
  "exchangeId": "binance",
  "gridType": "ARITHMETIC",
  "gridCount": 10,
  "upperPrice": 70000,
  "lowerPrice": 60000,
  "totalInvestment": 1000,
  "leverage": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Grid bot created successfully",
  "bot": {
    "id": "grid_abc123",
    "status": "STOPPED",
    ...
  }
}
```

#### Start Grid Bot

```http
PATCH /api/bots/grid
Content-Type: application/json

{
  "id": "grid_abc123",
  "action": "start"
}
```

#### Stop Grid Bot

```http
PATCH /api/bots/grid
Content-Type: application/json

{
  "id": "grid_abc123",
  "action": "stop"
}
```

#### Delete Grid Bot

```http
DELETE /api/bots/grid?id=grid_abc123
```

#### Get Grid Bot Status

```http
GET /api/bots/grid?id=grid_abc123
```

### 5.2 DCA Bot API

#### Create DCA Bot

```http
POST /api/bots/dca
Content-Type: application/json

{
  "name": "ETH DCA Bot",
  "symbol": "ETHUSDT",
  "exchangeId": "binance",
  "direction": "LONG",
  "baseAmount": 100,
  "dcaLevels": 5,
  "dcaPercent": 5,
  "dcaMultiplier": 1.5,
  "tpValue": 10,
  "slEnabled": false,
  "leverage": 1,
  "filterEnabled": true,
  "filterConfig": {
    "rsiOversold": 30,
    "rsiSeverelyOversold": 20,
    "minConfidence": 0.5
  }
}
```

#### Start DCA Bot

```http
PATCH /api/bots/dca
Content-Type: application/json

{
  "id": "dca_xyz789",
  "action": "start"
}
```

### 5.3 BB Bot API

#### Create BB Bot

```http
POST /api/bots/bb
Content-Type: application/json

{
  "name": "BTC BB Bot",
  "symbol": "BTCUSDT",
  "exchangeId": "binance",
  "marketType": "FUTURES",
  "timeframes": ["15m", "1h"],
  "direction": "BOTH",
  "tradeAmount": 100,
  "leverage": 1,
  "stopLoss": 5,
  "takeProfit": 10,
  "filterEnabled": true,
  "filterConfig": {
    "minProbability": 0.6,
    "minConfidence": 0.5,
    "stochOversold": 20,
    "stochOverbought": 80
  },
  "timeframeConfigs": [
    {
      "timeframe": "15m",
      "bbEnabled": true,
      "bbInnerPeriod": 20,
      "bbInnerDeviation": 1.0,
      "bbOuterDeviation": 2.0,
      "stochEnabled": true,
      "stochKPeriod": 14
    }
  ]
}
```

#### BB Bot Actions

```http
PATCH /api/bots/bb
Content-Type: application/json

{
  "botId": "bb_def456",
  "action": "start" | "stop" | "pause" | "delete"
}
```

---

## 6. Usage Examples

### 6.1 Grid Bot Example

```tsx
import { GridBotManager } from '@/components/bots/grid-bot-manager';

function TradingPage() {
  return (
    <div className="container mx-auto p-4">
      <GridBotManager />
    </div>
  );
}
```

#### Programmatic Grid Bot Creation

```tsx
import { createGridBot } from '@/lib/grid-bot';

const bot = createGridBot({
  id: 'grid-1',
  name: 'BTC Grid Bot',
  symbol: 'BTCUSDT',
  exchange: 'binance',
  accountType: 'DEMO',
  gridType: 'arithmetic',
  gridLevels: 10,
  upperPrice: 70000,
  lowerPrice: 60000,
  positionSize: 0.01,
  positionSizeType: 'fixed',
  leverage: 1,
  maxDrawdown: 20,
}, {
  paperTrading: true,
  initialBalance: 10000,
});

// Start the bot
await bot.start();

// Listen to events
bot.on('ORDER_FILLED', (event) => {
  console.log('Order filled:', event.data);
});

// Get metrics
const metrics = bot.getMetrics();
console.log('Win rate:', metrics.winRate);
console.log('Total PnL:', metrics.totalReturn);
```

### 6.2 DCA Bot Example

```tsx
import { DcaBotManager } from '@/components/bots/dca-bot-manager';

function DCATradingPage() {
  return (
    <div className="container mx-auto p-4">
      <DcaBotManager />
    </div>
  );
}
```

#### Programmatic DCA Bot Creation

```tsx
import { DCABotEngine } from '@/lib/dca-bot';
import { PaperAdapter } from '@/lib/dca-bot/paper-adapter';

const bot = new DCABotEngine({
  id: 'dca-1',
  symbol: 'ETHUSDT',
  direction: 'LONG',
  entryType: 'signal',
  baseOrderAmount: 100,
  leverage: 1,
  safetyOrdersEnabled: true,
  safetyOrdersCount: 5,
  safetyOrderPriceDeviation: 5,
  safetyOrderVolumeScale: 1.5,
  takeProfitEnabled: true,
  takeProfitPercent: 10,
  stopLossEnabled: false,
  volatilityScalingEnabled: true,
}, new PaperAdapter({ initialBalance: 5000 }));

await bot.start();

bot.on('SAFETY_ORDER_FILLED', (event) => {
  console.log('Safety order filled:', event.data);
});

bot.on('VOLATILITY_UPDATE', (event) => {
  console.log('Volatility:', event.data.reading.volatilityLevel);
});
```

### 6.3 BB Bot Example

```tsx
import { BBBotManager } from '@/components/bots/bb-bot-manager';

function BBTradingPage() {
  return (
    <div className="container mx-auto p-4">
      <BBBotManager />
    </div>
  );
}
```

#### Programmatic BB Bot Creation

```tsx
import { BBBotEngine } from '@/lib/bb-bot';
import { BinanceAdapter } from '@/lib/exchange/binance-adapter';

const bot = new BBBotEngine({
  id: 'bb-1',
  symbol: 'BTCUSDT',
  exchangeId: 'binance',
  marketType: 'futures',
  direction: 'BOTH',
  bbInnerPeriod: 20,
  bbInnerDeviation: 1.0,
  bbOuterPeriod: 20,
  bbOuterDeviation: 2.0,
  stochKPeriod: 14,
  stochDPeriod: 3,
  stochSlowing: 3,
  stochOverbought: 80,
  stochOversold: 20,
  timeframes: ['15m', '1h'],
  primaryTimeframe: '15m',
  tradeAmount: 100,
  leverage: 1,
  stopLossPercent: 5,
  takeProfitPercent: 10,
  volumeFilterEnabled: true,
  mtfConfirmationEnabled: true,
}, new BinanceAdapter({ apiKey: '...', apiSecret: '...' }));

await bot.start();

bot.on('SIGNAL_GENERATED', (event) => {
  console.log('Signal:', event.data.signal);
});

bot.on('POSITION_OPENED', (event) => {
  console.log('Position opened:', event.data.position);
});
```

### 6.4 Filter Integration Example

```tsx
import { DCAEntryFilter } from '@/lib/bot-filters/dca-entry-filter';
import { BBSignalFilter } from '@/lib/bot-filters/bb-signal-filter';

// DCA Filter
const dcaFilter = new DCAEntryFilter({
  levelDropThresholds: [3, 5, 7, 10, 15, 20],
  rsiOversold: 30,
  minConfidence: 0.5,
});

const dcaResult = await dcaFilter.evaluate({
  symbol: 'BTCUSDT',
  currentPrice: 62000,
  avgEntryPrice: 65000,
  currentLevel: 1,
  maxLevels: 5,
  totalInvested: 100,
  totalAmount: 0.00154,
  unrealizedPnl: -4.6,
  rsi: 28,
  atr: 1500,
  priceDropPercent: 4.6,
});

console.log('DCA Approved:', dcaResult.approved);
console.log('Confidence:', dcaResult.confidence);
console.log('Next Level:', dcaResult.level);

// BB Filter
const bbFilter = new BBSignalFilter({
  minProbability: 0.6,
  minConfidence: 0.5,
});

const bbResult = await bbFilter.evaluate({
  symbol: 'BTCUSDT',
  timeframe: '15m',
  currentPrice: 63500,
  bbInnerUpper: 66000,
  bbInnerLower: 64000,
  bbOuterUpper: 67000,
  bbOuterLower: 63000,
  bbMiddle: 65000,
  percentB: 0.25,
  bandwidth: 0.06,
  stochK: 25,
  stochD: 20,
  trend: 'RANGING',
});

console.log('BB Approved:', bbResult.approved);
console.log('Direction:', bbResult.direction);
console.log('Signal Type:', bbResult.signalType);
```

---

## 7. Best Practices

### 7.1 Grid Bot Best Practices

1. **Range Selection**
   - Выбирайте диапазон на основе поддержки/сопротивления
   - Избегайте слишком узких диапазонов
   - Учитывайте текущую волатильность

2. **Grid Levels**
   - Меньше уровней = больше прибыли с сделки, но меньше частота
   - Больше уровней = чаще сделки, но меньше прибыль с каждой

3. **Risk Management**
   - Всегда устанавливайте Max Drawdown
   - Используйте Trailing Grid для трендовых движений
   - Мониторьте Paper Trading перед реальной торговлей

### 7.2 DCA Bot Best Practices

1. **Entry Timing**
   - Используйте ML Filter для оптимизации входа
   - Включите RSI проверку для подтверждения
   - Учитывайте волатильность через ATR

2. **Position Sizing**
   - Базовый ордер должен быть комфортным для потери
   - Multiplier 1.5x - золотой стандарт
   - Лимит 5-7 DCA уровней

3. **Risk Management**
   - Всегда устанавливайте Take Profit
   - Stop Loss опционально, но рекомендуется
   - Max Drawdown = защита капитала

### 7.3 BB Bot Best Practices

1. **Timeframe Selection**
   - Основной таймфрейм: 15m - 1h
   - Подтверждение: старший таймфрейм
   - Multi-timeframe анализ повышает точность

2. **Signal Filtering**
   - Включите Volume Filter
   - Используйте MTF Confirmation
   - Проверяйте Divergence

3. **Risk Management**
   - Stop Loss: за пределами внешней полосы
   - Take Profit: у средней линии или внутренней полосы
   - Trailing Stop для трендовых движений

---

## Files Reference

| File | Description |
|------|-------------|
| `src/components/bots/grid-bot-manager.tsx` | Grid Bot UI Component |
| `src/components/bots/dca-bot-manager.tsx` | DCA Bot UI Component |
| `src/components/bots/bb-bot-manager.tsx` | BB Bot UI Component |
| `src/lib/grid-bot/grid-bot-engine.ts` | Grid Bot Core Engine |
| `src/lib/grid-bot/types.ts` | Grid Bot TypeScript Types |
| `src/lib/grid-bot/exchange-adapter.ts` | Grid Bot Exchange Integration |
| `src/lib/grid-bot/paper-adapter.ts` | Grid Bot Paper Trading |
| `src/lib/dca-bot/dca-bot-engine.ts` | DCA Bot Core Engine |
| `src/lib/dca-bot/types.ts` | DCA Bot TypeScript Types |
| `src/lib/dca-bot/volatility-scaler.ts` | DCA Volatility Scaling |
| `src/lib/dca-bot/safety-orders.ts` | DCA Safety Orders Logic |
| `src/lib/bb-bot/engine.ts` | BB Bot Core Engine |
| `src/lib/bb-bot/mtf-confirmation.ts` | Multi-Timeframe Confirmation |
| `src/lib/bot-filters/dca-entry-filter.ts` | DCA ML Entry Filter |
| `src/lib/bot-filters/bb-signal-filter.ts` | BB Signal Classification |

---

*Documentation generated: March 2026*
