# Risk Management System - Complete Documentation

## Overview

The CITARION Risk Management System provides comprehensive portfolio protection through multiple layers of risk control, including VaR calculations, position limits, drawdown monitoring, kill switch protection, and AI-driven risk analysis.

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [VaR Calculator](#2-var-calculator)
3. [Kill Switch](#3-kill-switch)
4. [Drawdown Monitor](#4-drawdown-monitor)
5. [Position Limiter](#5-position-limiter)
6. [Stress Testing](#6-stress-testing)
7. [Liquidation Protection](#7-liquidation-protection)
8. [Position Correlation](#8-position-correlation)
9. [Position Reconciliation](#9-position-reconciliation)
10. [GARCH-VaR Integration](#10-garch-var-integration)
11. [AI Risk Manager](#11-ai-risk-manager)
12. [Risk Service](#12-risk-service)
13. [Risk Middleware](#13-risk-middleware)
14. [Position Size Validator](#14-position-size-validator)
15. [Risk Validator (Trading Layer)](#15-risk-validator-trading-layer)
16. [Usage Examples](#16-usage-examples)

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        RISK MANAGEMENT ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐        │
│  │   Risk Service  │───>│  Risk Manager   │───>│   Risk Report   │        │
│  │   (Central)     │    │   (Orchestrator)│    │   (Output)      │        │
│  └────────┬────────┘    └────────┬────────┘    └─────────────────┘        │
│           │                      │                                          │
│           ▼                      ▼                                          │
│  ┌────────────────────────────────────────────────────────────────┐        │
│  │                    CORE RISK COMPONENTS                         │        │
│  ├─────────────┬─────────────┬─────────────┬─────────────┬───────┤        │
│  │    VaR      │  Position   │  Drawdown   │ Kill Switch │ GARCH │        │
│  │ Calculator  │   Limiter   │  Monitor    │   Manager   │  VaR  │        │
│  └─────────────┴─────────────┴─────────────┴─────────────┴───────┘        │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────┐        │
│  │                   ADVANCED RISK COMPONENTS                      │        │
│  ├──────────────────┬───────────────────┬─────────────────────────┤        │
│  │ Stress Testing   │ Liquidation       │ Position               │        │
│  │ Engine           │ Protection        │ Correlation            │        │
│  └──────────────────┴───────────────────┴─────────────────────────┘        │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────┐        │
│  │                     AI RISK COMPONENTS                          │        │
│  ├─────────────┬─────────────┬─────────────┬─────────────┐        │        │
│  │    Risk     │  Anomaly    │    Auto     │  Position   │        │        │
│  │  Predictor  │  Detector   │   Hedger    │   Sizer     │        │        │
│  └─────────────┴─────────────┴─────────────┴─────────────┘        │        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### File Structure

```
src/lib/risk-management/
├── index.ts                    # Module exports
├── types.ts                    # TypeScript interfaces
├── var-calculator.ts           # VaR calculations (3 methods)
├── var-monte-carlo.ts          # Advanced Monte Carlo VaR
├── kill-switch.ts              # Emergency position closer
├── kill-switch-manager.ts      # Singleton kill switch manager
├── drawdown-monitor.ts         # Drawdown tracking
├── position-limiter.ts         # Position size limits
├── position-size-validator.ts  # Position sizing validation
├── stress-testing.ts           # Stress test scenarios
├── liquidation-protection.ts   # Liquidation price calculations
├── position-correlation.ts     # Correlation monitoring
├── position-reconciliation.ts  # State synchronization
├── garch-var-integration.ts    # GARCH-enhanced VaR
├── risk-manager.ts             # Central orchestrator
├── risk-service.ts             # Service layer
└── advanced-risk.ts            # Enhanced VaR & stress testing

src/lib/ai-risk/
├── index.ts                    # AI risk exports
├── risk-predictor.ts           # ML risk prediction
├── anomaly-detector.ts         # Market anomaly detection
├── auto-hedger.ts              # Automatic hedging
└── position-sizer.ts           # AI position sizing

src/lib/trading/
└── risk-validator.ts           # Trade validation layer
```

---

## 2. VaR Calculator

### Overview

Value at Risk (VaR) calculation using three statistical methods:

- **Historical Simulation** - Uses actual historical returns distribution
- **Parametric (Variance-Covariance)** - Assumes normal distribution
- **Monte Carlo Simulation** - Simulates future scenarios

### Configuration

```typescript
interface VaRConfig {
  /** Confidence level (e.g., 0.95 for 95%) */
  confidenceLevel: number;
  /** Time horizon in days */
  timeHorizon: number;
  /** Method for VaR calculation */
  method: 'historical' | 'parametric' | 'monte_carlo';
  /** Number of simulations for Monte Carlo */
  monteCarloSimulations?: number;
  /** Historical data lookback period */
  lookbackPeriod: number;
}

const defaultVaRConfig: VaRConfig = {
  confidenceLevel: 0.95,
  timeHorizon: 1,
  method: 'historical',
  lookbackPeriod: 252,
  monteCarloSimulations: 10000,
};
```

### VaR Result

```typescript
interface VaRResult {
  /** Value at Risk */
  var: number;
  /** Expected Shortfall (Conditional VaR) */
  expectedShortfall: number;
  /** Confidence level used */
  confidenceLevel: number;
  /** Time horizon in days */
  timeHorizon: number;
  /** Method used */
  method: VaRMethod;
  /** Timestamp */
  timestamp: number;
  /** Portfolio value */
  portfolioValue: number;
  /** Risk percentage */
  riskPercentage: number;
}
```

### Historical Method

```typescript
// Uses actual historical returns distribution
private historicalVar(returns: number[]): { var: number; es: number } {
  const sorted = [...returns].sort((a, b) => a - b);
  const index = Math.floor((1 - this.config.confidenceLevel) * sorted.length);
  
  const var_value = sorted[index];
  
  // Expected Shortfall: average of returns below VaR
  const tailReturns = sorted.slice(0, index + 1);
  const es = tailReturns.reduce((sum, r) => sum + r, 0) / tailReturns.length;

  return { var: var_value, es };
}
```

### Parametric Method

```typescript
// Assumes normal distribution of returns
private parametricVar(returns: number[]): { var: number; es: number } {
  const mean = this.mean(returns);
  const std = this.standardDeviation(returns);
  
  // Z-score for confidence level
  const zScore = this.getZScore(this.config.confidenceLevel);
  
  // VaR = mean - z * std (for losses, we look at left tail)
  const var_value = mean - zScore * std;
  
  // Expected Shortfall for normal distribution
  const phi = this.normalPDF(zScore);
  const es = mean - std * phi / (1 - this.config.confidenceLevel);

  return { var: var_value, es };
}
```

### Monte Carlo Method

```typescript
// Simulates future returns using historical parameters
private monteCarloVar(returns: number[]): { var: number; es: number } {
  const mean = this.mean(returns);
  const std = this.standardDeviation(returns);
  const simulations = this.config.monteCarloSimulations || 10000;
  
  // Generate random returns using Box-Muller transform
  const simulatedReturns: number[] = [];
  for (let i = 0; i < simulations; i++) {
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const returnVal = mean + std * z;
    simulatedReturns.push(returnVal);
  }

  // Sort and get VaR
  const sorted = simulatedReturns.sort((a, b) => a - b);
  const index = Math.floor((1 - this.config.confidenceLevel) * sorted.length);
  
  const var_value = sorted[index];
  const tailReturns = sorted.slice(0, index + 1);
  const es = tailReturns.reduce((sum, r) => sum + r, 0) / tailReturns.length;

  return { var: var_value, es };
}
```

### Usage

```typescript
import { VaRCalculator, calculateVaR } from '@/lib/risk-management';

// Method 1: Class instance
const calculator = new VaRCalculator({
  confidenceLevel: 0.95,
  method: 'monte_carlo',
  monteCarloSimulations: 50000
});

const result = calculator.calculate(returns, portfolioValue);

// Method 2: Quick function
const result = calculateVaR(returns, portfolioValue, {
  confidenceLevel: 0.99,
  method: 'historical'
});

console.log(`VaR (95%): $${result.var.toFixed(2)}`);
console.log(`Expected Shortfall: $${result.expectedShortfall.toFixed(2)}`);
console.log(`Risk Percentage: ${result.riskPercentage.toFixed(2)}%`);
```

### Advanced Monte Carlo VaR

The `MonteCarloVaR` class provides additional features:

```typescript
interface VaRResult {
  var95: number;              // 95% confidence VaR
  var99: number;              // 99% confidence VaR
  expectedShortfall95: number; // CVaR at 95%
  expectedShortfall99: number; // CVaR at 99%
  maxLoss: number;            // Maximum simulated loss
  maxGain: number;            // Maximum simulated gain
  meanPnL: number;            // Mean P&L
  stdDev: number;             // Standard deviation
  simulations: number;        // Number of simulations
  timeHorizon: number;        // Time horizon in days
  percentiles: {              // Full percentile distribution
    p1: number; p5: number; p10: number; p25: number;
    p50: number; p75: number; p90: number; p95: number; p99: number;
  };
}
```

```typescript
import { MonteCarloVaR, getMonteCarloVaR } from '@/lib/risk-management';

const mcVaR = getMonteCarloVaR({
  simulations: 100000,
  timeHorizon: 1,
  confidenceLevels: [0.95, 0.99],
  riskFreeRate: 0.02
});

// Add price history
mcVaR.addPriceHistory('BTCUSDT', btcPrices);
mcVaR.addPriceHistory('ETHUSDT', ethPrices);

// Calculate all methods
const allResults = mcVaR.calculateAllMethods(positions);
// Returns: { monteCarlo, historical, parametric, bootstrap }
```

---

## 3. Kill Switch

### Overview

Emergency position closer with automatic triggers and auto-arm functionality.

### Trigger Types

```typescript
type KillSwitchTrigger = 
  | 'manual'      // User-initiated
  | 'drawdown'    // Drawdown threshold exceeded
  | 'var_breach'  // VaR limit exceeded
  | 'correlation' // Correlation limit exceeded
  | 'liquidity'   // Liquidity too low
  | 'error';      // System error
```

### States

```typescript
type KillSwitchState = 
  | 'armed'       // Ready to trigger
  | 'triggered'   // Activated, closing positions
  | 'recovering'  // Recovery period
  | 'disarmed';   // Inactive
```

### Configuration

```typescript
interface KillSwitchConfig {
  autoTrigger: boolean;
  triggers: {
    drawdown: boolean;
    varBreach: boolean;
    correlation: boolean;
    liquidity: boolean;
  };
  thresholds: {
    drawdownPct: number;      // 0.20 = 20% drawdown
    varMultiplier: number;    // 3.0 = 3x VaR
    correlationLimit: number; // 0.9 = 90% correlation
    liquidityMin: number;     // $1000 minimum
  };
  recoveryMode: 'automatic' | 'manual';
  recoveryCooldown: number;   // 24 hours in ms
  autoArm: AutoArmConfig;
}

const defaultKillSwitchConfig: KillSwitchConfig = {
  autoTrigger: true,
  triggers: {
    drawdown: true,
    varBreach: true,
    correlation: true,
    liquidity: false,
  },
  thresholds: {
    drawdownPct: 0.20,
    varMultiplier: 3.0,
    correlationLimit: 0.9,
    liquidityMin: 1000,
  },
  recoveryMode: 'manual',
  recoveryCooldown: 24 * 60 * 60 * 1000,
  autoArm: defaultAutoArmConfig,
};
```

### Auto-Arm Configuration

```typescript
interface AutoArmConfig {
  autoArmWhenBotStarts: boolean;     // Auto-arm on bot start
  autoArmWhenLiveMode: boolean;      // Auto-arm on LIVE mode
  autoArmWhenFirstPosition: boolean; // Auto-arm on first position
  autoArmOnStartup: boolean;         // Auto-arm on system start
  requireConfirmationToDisarm: boolean;
  logAutoArmEvents: boolean;
}
```

### Kill Switch Manager (Singleton)

```typescript
import { 
  KillSwitchManager, 
  getKillSwitchManager,
  canTradeGlobally 
} from '@/lib/risk-management';

// Get singleton instance
const manager = getKillSwitchManager();

// Register bot (triggers auto-arm)
manager.registerBot('bot-123', 'DCA', 'live');

// Track position opening (triggers auto-arm on first)
manager.trackPositionOpen('pos-456', 'BTCUSDT', 'bot-123');

// Get status
const status = manager.getStatus();
// { state: 'armed', tradingState: 'live', positionsClosed: 0, ... }

// Quick check
if (canTradeGlobally()) {
  // Execute trade
}

// Manual control
manager.arm('Manual arm from UI');
manager.disarmWithConfirmation();

// Trigger kill switch
await manager.trigger(positions, 'drawdown', equity, drawdown);
```

### Safety Checks

The Kill Switch performs periodic safety checks:

```typescript
interface SafetyCheckResult {
  shouldTrigger: boolean;
  trigger?: KillSwitchTrigger;
  drawdown?: number;
  varBreach?: boolean;
  correlation?: number;
  liquidity?: number;
  context?: Record<string, unknown>;
}

// Register safety check callback
killSwitch.registerSafetyCheck(async () => {
  return {
    shouldTrigger: drawdown > 0.15,
    trigger: 'drawdown',
    drawdown,
  };
});
```

---

## 4. Drawdown Monitor

### Overview

Real-time drawdown monitoring with multi-level alerts and recovery tracking.

### Thresholds

```typescript
interface DrawdownThresholds {
  warning: number;         // 0.05 = 5% warning level
  critical: number;        // 0.10 = 10% critical level
  breach: number;          // 0.20 = 20% breach (kill switch)
  recoveryThreshold: number; // 0.02 = 2% recovery threshold
}

const defaultDrawdownThresholds: DrawdownThresholds = {
  warning: 0.05,
  critical: 0.10,
  breach: 0.20,
  recoveryThreshold: 0.02,
};
```

### Drawdown Levels

```typescript
type DrawdownLevel = 'none' | 'warning' | 'critical' | 'breach';
```

### State Tracking

```typescript
interface DrawdownState {
  currentDrawdown: number;   // Current drawdown percentage
  peakEquity: number;        // Peak equity value
  currentEquity: number;     // Current equity value
  level: DrawdownLevel;      // Current level
  duration: number;          // Duration in ms
  startedAt: number | null;  // Start timestamp
  maxDrawdown: number;       // Maximum observed drawdown
  recoveryPct: number;       // Recovery percentage
}
```

### Metrics

```typescript
interface DrawdownMetrics {
  state: DrawdownState;
  daily: number;       // Daily drawdown
  weekly: number;      // Weekly drawdown
  monthly: number;     // Monthly drawdown
  avgRecoveryTime: number; // Average recovery time in ms
  drawdownCount: number;   // Number of drawdowns in period
}
```

### Usage

```typescript
import { DrawdownMonitor } from '@/lib/risk-management';

const monitor = new DrawdownMonitor({
  warning: 0.05,
  critical: 0.10,
  breach: 0.20
});

// Update with new equity
const metrics = monitor.update(95000);
// {
//   state: { currentDrawdown: 0.05, level: 'warning', ... },
//   daily: 0.02,
//   weekly: 0.05,
//   monthly: 0.08,
//   avgRecoveryTime: 86400000,
//   drawdownCount: 3
// }

// Check if exceeds level
if (monitor.exceedsLevel('critical')) {
  console.log('CRITICAL: Drawdown exceeded 10%');
}

// Get history
const history = monitor.getHistory(sinceTimestamp);
```

---

## 5. Position Limiter

### Overview

Enforces position limits and uses Kelly Criterion for optimal sizing.

### Limits Configuration

```typescript
interface PositionLimits {
  maxPositionSize: number;        // $10,000 per trade
  maxTotalExposure: number;       // $100,000 total
  maxPositionsPerSymbol: number;  // 2 per symbol
  maxTotalPositions: number;      // 20 total
  maxLeverage: number;            // 10x
  maxCorrelation: number;         // 0.7 = 70%
  maxSectorExposure: number;      // 0.3 = 30%
  maxSingleAssetExposure: number; // 0.2 = 20%
}
```

### Position Check Result

```typescript
interface PositionCheckResult {
  allowed: boolean;
  reason?: string;
  suggestions?: PositionSuggestion[];
  exposureAfter: number;
  riskLevel: number; // 0-1
}

interface PositionSuggestion {
  type: 'reduce_size' | 'reduce_leverage' | 'reject' | 'accept';
  message: string;
  suggestedValue?: number;
}
```

### Kelly Criterion

```typescript
interface KellyParams {
  winRate: number;      // 0.55 = 55% win rate
  avgWin: number;       // Average win amount
  avgLoss: number;      // Average loss amount
  fraction?: number;    // 0.25 = quarter Kelly
  maxRisk?: number;     // 0.02 = 2% max risk
}

interface KellyResult {
  kellyFraction: number;      // Optimal Kelly fraction
  adjustedFraction: number;   // After applying fraction and max
  riskAmount: number;
  suggestedSize: number;
  edge: number;               // Edge percentage
  odds: number;               // Win/loss ratio
}
```

### Kelly Formula

```
Kelly Fraction = p - (1-p)/(w/l)

where:
  p = win rate
  w = average win
  l = average loss
```

### Usage

```typescript
import { PositionLimiter, calculateKelly } from '@/lib/risk-management';

const limiter = new PositionLimiter({
  maxPositionSize: 10000,
  maxTotalExposure: 100000,
  maxLeverage: 10
});

// Check position
const result = limiter.checkPosition(
  'BTCUSDT',
  'binance',
  5000,  // size
  5,     // leverage
  portfolioData
);

if (!result.allowed) {
  console.log('Position rejected:', result.reason);
  console.log('Suggestions:', result.suggestions);
}

// Calculate Kelly-optimal size
const kelly = limiter.calculateKellySize({
  winRate: 0.55,
  avgWin: 150,
  avgLoss: 100,
  fraction: 0.25,  // Quarter Kelly
  maxRisk: 0.02    // Max 2% risk
});

console.log(`Suggested position: ${(kelly.adjustedFraction * 100).toFixed(2)}% of portfolio`);

// Quick Kelly calculation
const kellyResult = calculateKelly({
  winRate: 0.55,
  avgWin: 150,
  avgLoss: 100
});
```

---

## 6. Stress Testing

### Overview

Comprehensive stress testing for portfolio risk assessment with built-in and custom scenarios.

### Scenario Types

```typescript
interface StressScenario {
  id: string;
  name: string;
  description: string;
  type: 'historical' | 'hypothetical' | 'reverse' | 'custom';
  shocks: MarketShock[];
  duration: number;  // Days
  probability?: number;
  severity: 'mild' | 'moderate' | 'severe' | 'extreme';
}

interface MarketShock {
  type: 'price' | 'volatility' | 'correlation' | 'rate' | 'spread' | 'liquidity';
  symbol?: string;
  assetClass?: 'crypto' | 'equity' | 'fx' | 'commodity' | 'rates';
  shock: number;      // Percentage or absolute change
  direction: 'up' | 'down' | 'both';
}
```

### Built-in Scenarios

| Scenario | Description | Severity |
|----------|-------------|----------|
| `crypto_crash_2022` | 2022 crypto crash (70-90% drawdowns) | Extreme |
| `flash_crash` | Sudden 30% drop in minutes | Severe |
| `btc_dominance_shift` | BTC up 20%, altcoins down 40% | Moderate |
| `leveraged_unwind` | Cascade of liquidations, 50% drop | Extreme |
| `regulatory_crackdown` | Major regulatory action, 40% drop | Severe |
| `stablecoin_depeg` | Stablecoin loses peg, 25% drop | Severe |
| `bull_run` | Market rally with 100% gains | Mild |
| `correlation_breakdown` | Normal correlations break down | Moderate |
| `black_swan` | Extreme event with 90% crash | Extreme |

### Stress Test Result

```typescript
interface StressTestResult {
  scenarioId: string;
  scenarioName: string;
  portfolioValueBefore: number;
  portfolioValueAfter: number;
  pnl: number;
  pnlPercent: number;
  worstPosition: {
    symbol: string;
    pnl: number;
    pnlPercent: number;
  };
  bestPosition: {
    symbol: string;
    pnl: number;
    pnlPercent: number;
  };
  marginCall: boolean;
  liquidationRisk: boolean;
  breakevenShock: number;
  riskMetrics: {
    maxDrawdown: number;
    leverageAfter: number;
    marginUsage: number;
  };
  timestamp: number;
}
```

### Usage

```typescript
import { StressTestingEngine, getStressTestingEngine } from '@/lib/risk-management';

const engine = getStressTestingEngine();

// Add price history
engine.addPriceHistory('BTCUSDT', btcPrices);

// Run single scenario
const result = engine.runStressTest(positions, 'flash_crash');

// Run all scenarios
const allResults = engine.runAllStressTests(positions);
// Sorted by PnL (worst first)

// Add custom scenario
engine.addScenario({
  id: 'custom_1',
  name: 'My Custom Scenario',
  description: 'Custom stress test',
  type: 'custom',
  shocks: [
    { type: 'price', assetClass: 'crypto', shock: -25, direction: 'down' }
  ],
  duration: 7,
  severity: 'moderate'
});

// Generate summary report
const report = engine.generateSummaryReport(positions);
// {
//   worstCase: StressTestResult,
//   bestCase: StressTestResult,
//   averageLoss: number,
//   probabilityWeightedLoss: number,
//   liquidationRiskScenarios: string[],
//   marginCallScenarios: string[],
//   recommendations: string[]
// }

// Reverse stress test - find what causes X% loss
const shocks = engine.runReverseStressTest(positions, 25); // 25% loss
```

---

## 7. Liquidation Protection

### Overview

Calculates accurate liquidation prices across multiple exchanges and validates margin safety.

### Supported Exchanges

- Binance
- Bybit
- OKX
- Bitget

### Position Parameters

```typescript
interface PositionParams {
  entryPrice: number;
  positionSize: number;      // In base currency (e.g., BTC)
  leverage: number;
  accountBalance: number;    // In quote currency (e.g., USDT)
  marginMode: 'isolated' | 'cross';
  side: 'long' | 'short';
  maintenanceMarginRate?: number;
  maintenanceAmount?: number;
  markPrice?: number;
  symbol?: string;
}
```

### Liquidation Result

```typescript
interface LiquidationResult {
  liquidationPrice: number;
  exchange: Exchange;
  marginMode: MarginMode;
  maintenanceMarginRate: number;
  initialMargin: number;
  maintenanceMargin: number;
  distanceFromEntry: number;  // Percentage
  isAtRisk: boolean;
  riskLevel: number;          // 0-100
  timestamp: number;
}
```

### Tiered Maintenance Margin

Exchanges use tiered maintenance margin rates based on notional value:

```typescript
// Binance tiers example
const binanceTiers = [
  { maxNotional: 50000, rate: 0.004, maintenanceAmount: 0 },
  { maxNotional: 250000, rate: 0.005, maintenanceAmount: 50 },
  { maxNotional: 1000000, rate: 0.01, maintenanceAmount: 1300 },
  // ...
];
```

### Liquidation Formulas

**Isolated Margin (Long):**
```
LiqPrice = EntryPrice * (1 - InitialMarginRate + MMR) - (MM / PositionSize)
```

**Isolated Margin (Short):**
```
LiqPrice = EntryPrice * (1 + InitialMarginRate - MMR) + (MM / PositionSize)
```

**Cross Margin:**
```
LiqPrice = (AccountBalance - MM) / (PositionSize * (1 - MMR))  // Long
LiqPrice = (AccountBalance + MM) / (PositionSize * (1 + MMR))  // Short
```

### Margin Safety Validation

```typescript
interface ValidationResult {
  isValid: boolean;
  distanceToLiquidation: number;
  requiredBuffer: number;
  actualBuffer: number;
  bufferSufficient: boolean;
  riskLevel: number;
  atrValue: number;
  atrBufferPercent: number;
  warnings: string[];
  errors: string[];
  suggestions: string[];
  liquidationPrice: number;
  currentPrice: number;
  timestamp: number;
}
```

### Usage

```typescript
import {
  calculateLiquidationPrice,
  validateMarginSafety,
  calculateMaxSafeLeverage,
  getPortfolioLiquidationRisk
} from '@/lib/risk-management';

// Calculate liquidation price
const result = calculateLiquidationPrice({
  entryPrice: 50000,
  positionSize: 0.1,
  leverage: 10,
  accountBalance: 5000,
  marginMode: 'isolated',
  side: 'long'
}, 'binance');

console.log(`Liquidation price: $${result.liquidationPrice}`);
console.log(`Distance: ${result.distanceFromEntry}%`);

// Validate margin safety with ATR
const validation = validateMarginSafety(
  position,
  1500,  // ATR value
  5,     // Min buffer %
  'binance'
);

if (!validation.isValid) {
  console.log('Errors:', validation.errors);
  console.log('Suggestions:', validation.suggestions);
}

// Calculate max safe leverage
const maxLeverage = calculateMaxSafeLeverage(
  50000,  // Entry price
  1500,   // ATR
  10,     // Required buffer %
  'binance'
);
// Returns: 8 (max 8x leverage for 10% buffer)

// Portfolio-level risk
const portfolioRisk = getPortfolioLiquidationRisk(positions, 'binance');
// {
//   totalExposure: number,
//   weightedRiskLevel: number,
//   positionsAtRisk: number,
//   criticalPositions: number,
//   details: [...]
// }
```

---

## 8. Position Correlation

### Overview

Monitors and manages correlation between positions to prevent concentration risk.

### Configuration

```typescript
interface CorrelationConfig {
  maxCorrelationThreshold: number; // 0.7 = 70% max
  warningThreshold: number;        // 0.5 = 50% warning
  minSampleSize: number;           // 30 data points minimum
  lookbackPeriod: number;          // 24 hours in ms
  checkInterval: number;           // 1 minute check interval
  enableAlerts: boolean;
}
```

### Correlation Result

```typescript
interface CorrelationResult {
  symbol1: string;
  symbol2: string;
  correlation: number;    // -1 to 1
  covariance: number;
  sampleSize: number;
  lastUpdated: number;
}

interface CorrelationMatrix {
  symbols: string[];
  matrix: number[][];
  timestamp: number;
}
```

### Alert Types

```typescript
interface CorrelationAlert {
  id: string;
  type: 'high_correlation' | 'concentration_risk' | 'portfolio_correlation';
  severity: 'warning' | 'critical';
  symbols: string[];
  correlation: number;
  threshold: number;
  message: string;
  timestamp: number;
}
```

### Usage

```typescript
import { PositionCorrelationMonitor, getPositionCorrelationMonitor } from '@/lib/risk-management';

const monitor = getPositionCorrelationMonitor({
  maxCorrelationThreshold: 0.7,
  warningThreshold: 0.5
});

// Update position (adds price data point)
monitor.updatePosition({
  id: 'pos-1',
  symbol: 'BTCUSDT',
  side: 'long',
  size: 0.5,
  entryPrice: 50000,
  currentPrice: 52000,
  // ...
});

// Start monitoring
monitor.startMonitoring();

// Get correlation between symbols
const corr = monitor.getCorrelation('BTCUSDT', 'ETHUSDT');
// { correlation: 0.85, covariance: 0.0001, ... }

// Get correlation matrix
const matrix = monitor.calculateCorrelationMatrix(['BTCUSDT', 'ETHUSDT', 'SOLUSDT']);

// Get portfolio risk score (0-100)
const riskScore = monitor.getPortfolioRiskScore();

// Get suggestions for reducing correlation risk
const suggestions = monitor.suggestAdjustments();
// [{ symbol: 'ETHUSDT', action: 'reduce', reason: 'High correlation...' }]

// Register alert handler
monitor.onAlert((alert) => {
  if (alert.severity === 'critical') {
    // Take action
  }
});
```

---

## 9. Position Reconciliation

### Overview

Ensures consistency between internal state and exchange positions.

### Configuration

```typescript
interface ReconciliationConfig {
  tolerancePercent: number;   // 1% size tolerance
  pnlTolerance: number;       // $100 PnL tolerance
  syncInterval: number;       // 5 minutes
  autoRecover: boolean;       // Auto-fix discrepancies
  alertThreshold: number;     // 5% alert threshold
  maxDiscrepancyAge: number;  // 10 minutes
}
```

### Result

```typescript
interface ReconciliationResult {
  timestamp: number;
  matched: Array<{
    internalId: string;
    symbol: string;
    sizeDiff: number;
    pnlDiff: number;
  }>;
  missing: Array<{
    type: 'internal_only' | 'exchange_only';
    position: InternalPosition | ExchangePosition;
  }>;
  sizeDiscrepancies: Array<{
    internalId: string;
    symbol: string;
    internalSize: number;
    exchangeSize: number;
    diff: number;
    diffPercent: number;
  }>;
  pnlDiscrepancies: Array<{...}>;
  summary: {
    totalPositions: number;
    matchedCount: number;
    discrepancyCount: number;
    missingCount: number;
    healthScore: number;  // 0-100
  };
  actions: ReconciliationAction[];
}
```

### Reconciliation Actions

```typescript
interface ReconciliationAction {
  id: string;
  type: 'sync_size' | 'sync_pnl' | 'create_internal' | 'create_exchange' | 'close_position' | 'alert';
  symbol: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  autoRecoverable: boolean;
  status: 'pending' | 'executed' | 'failed';
  details: Record<string, unknown>;
}
```

### Usage

```typescript
import { PositionReconciliation, getPositionReconciliation } from '@/lib/risk-management';

const recon = getPositionReconciliation({
  tolerancePercent: 1,
  pnlTolerance: 100,
  autoRecover: false
});

// Update positions
recon.updateInternalPosition(internalPos);
recon.updateExchangePosition('BTCUSDT', exchangePos);

// Start periodic sync
recon.startPeriodicSync();

// Manual reconciliation
const result = recon.reconcile();

if (result.summary.healthScore < 80) {
  console.log('Health issues detected');
  const pendingActions = recon.getPendingActions();
}

// Register handlers
recon.onDiscrepancy((result) => {
  console.log('Discrepancy found:', result.summary);
});

recon.onAlert((message, severity) => {
  // Send notification
});
```

---

## 10. GARCH-VaR Integration

### Overview

Integrates GARCH volatility forecasts into VaR calculations for more accurate risk assessment.

### Volatility Regimes

```typescript
type VolatilityRegime = 'low' | 'normal' | 'high' | 'extreme';
```

### Volatility Adjustments

```typescript
const VOLATILITY_MULTIPLIERS: Record<string, VolatilityAdjustments> = {
  low: {
    varMultiplier: 0.85,         // Lower VaR
    positionSizeMultiplier: 1.2, // Can increase position
    stopLossMultiplier: 0.9,     // Tighter stops
    confidenceBoost: 0.1,
  },
  normal: {
    varMultiplier: 1.0,
    positionSizeMultiplier: 1.0,
    stopLossMultiplier: 1.0,
    confidenceBoost: 0,
  },
  high: {
    varMultiplier: 1.3,          // Higher VaR
    positionSizeMultiplier: 0.75, // Reduce position
    stopLossMultiplier: 1.25,    // Wider stops
    confidenceBoost: -0.05,
  },
  extreme: {
    varMultiplier: 1.6,          // Much higher VaR
    positionSizeMultiplier: 0.5, // Significant reduction
    stopLossMultiplier: 1.5,     // Much wider stops
    confidenceBoost: -0.1,
  },
};
```

### GARCH VaR Result

```typescript
interface GarchVaRResult extends VaRResult {
  volatilityRegime: VolatilityRegime;
  garchForecast: number;
  volatilityAdjustment: number;
  adjustedStd: number;
}
```

### Usage

```typescript
import { GarchVaRCalculator, getGarchVaRCalculator, calculateGarchVaR } from '@/lib/risk-management';

const calculator = getGarchVaRCalculator();

// Initialize (connects to GARCH service)
await calculator.initialize();

// Calculate GARCH-adjusted VaR
const result = await calculator.calculate(returns, portfolioValue, 'BTCUSDT');
// {
//   var: 1250,
//   expectedShortfall: 1800,
//   volatilityRegime: 'high',
//   garchForecast: 0.035,
//   volatilityAdjustment: 1.3,
//   ...
// }

// Get volatility adjustments for position sizing
const adjustments = calculator.getVolatilityAdjustments('high');
// { varMultiplier: 1.3, positionSizeMultiplier: 0.75, ... }

// Calculate adjusted position size
const sizing = calculator.calculateAdjustedPositionSize(1000, 'BTCUSDT');
// { size: 750, regime: 'high', multiplier: 0.75 }

// Calculate adjusted stop loss
const sl = calculator.calculateAdjustedStopLoss(2, 'BTCUSDT');
// { stopLoss: 2.5, regime: 'high', multiplier: 1.25 }

// Get GARCH forecasts
const forecast = await calculator.getGarchForecast('BTCUSDT');
// { forecast1d: 0.035, forecast5d: 0.045, forecast10d: 0.063, regime: 'high' }
```

---

## 11. AI Risk Manager

### Overview

AI-driven risk management with ML prediction, anomaly detection, auto-hedging, and position sizing.

### Components

```
┌─────────────────────────────────────────────────────────────────┐
│                     AI RISK MANAGER                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │    Risk      │  │   Anomaly    │  │    Auto      │          │
│  │  Predictor   │  │   Detector   │  │   Hedger     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│  ┌──────────────┐  ┌────────────────────────────────┐          │
│  │  Position    │  │       Risk Monitor             │          │
│  │   Sizer      │  │   (Real-time Assessment)       │          │
│  └──────────────┘  └────────────────────────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Risk Predictor

```typescript
import { RiskPredictor, riskPredictor } from '@/lib/ai-risk';

interface RiskMetrics {
  var: {
    90: number;
    95: number;
    99: number;
  };
  expectedShortfall: number;
  maxDrawdown: number;
  drawdownProbability: number;
  tailRiskScore: number;
  correlationBreakdownRisk: number;
}

interface RiskScore {
  overall: number;  // 0-100
  components: {
    market: number;
    liquidity: number;
    volatility: number;
    correlation: number;
    tail: number;
  };
  recommendation: 'reduce' | 'maintain' | 'increase';
}

// Calculate VaR
const varMetrics = riskPredictor.calculateVaR(returns);
// { 90: -0.015, 95: -0.025, 99: -0.045 }

// Calculate expected shortfall (CVaR)
const es = riskPredictor.calculateExpectedShortfall(returns, 0.95);

// Calculate max drawdown
const maxDD = riskPredictor.calculateMaxDrawdown(prices);

// Predict drawdown probability
const prob = riskPredictor.predictDrawdownProbability(ohlcv, 0.1); // 10% threshold

// Calculate tail risk score (kurtosis + skewness)
const tailRisk = riskPredictor.calculateTailRiskScore(returns);

// Comprehensive risk score
const score = riskPredictor.calculateRiskScore(ohlcv, positions);
// { overall: 45, recommendation: 'maintain', components: {...} }

// Stress test
const stressResults = riskPredictor.stressTest(positions, [
  { name: 'Crash', priceChange: -0.2, volChange: 0.5 },
  { name: 'Rally', priceChange: 0.3, volChange: -0.2 }
]);
```

### Anomaly Detector

```typescript
import { AnomalyDetector, anomalyDetector } from '@/lib/ai-risk';

interface Anomaly {
  timestamp: number;
  type: 'price' | 'volume' | 'volatility' | 'spread' | 'pattern';
  severity: 'low' | 'medium' | 'high' | 'critical';
  score: number;  // 0-1
  description: string;
  context: Record<string, number>;
}

// Detect all anomalies
const alert = anomalyDetector.detect(ohlcv);
// {
//   timestamp: 1234567890,
//   anomalies: [
//     { type: 'price', severity: 'high', score: 0.85, description: '...' }
//   ],
//   totalScore: 0.85,
//   recommendation: 'CRITICAL: Immediate risk reduction recommended.'
// }

// Set custom thresholds
anomalyDetector.setThresholds({
  price: 3.0,      // Standard deviations
  volume: 5.0,
  volatility: 3.0,
  spread: 4.0
});

// Isolation Forest-like scoring
const isolationScore = anomalyDetector.isolationScore(value, dataArray);

// Reconstruction error (autoencoder-like)
const error = anomalyDetector.reconstructionError(ohlcv);
```

### Auto Hedger

```typescript
import { AutoHedger, autoHedger } from '@/lib/ai-risk';

interface HedgeRecommendation {
  type: 'delta' | 'cross' | 'portfolio' | 'volatility';
  action: 'open' | 'adjust' | 'close';
  symbol: string;
  side: 'long' | 'short';
  size: number;
  reason: string;
  cost: number;
  effectiveness: number;
}

// Analyze positions
const status = autoHedger.analyze(positions, marketDataMap);
// {
//   totalExposure: 50000,
//   hedgedAmount: 15000,
//   hedgeRatio: 0.3,
//   netDelta: 25000,
//   recommendations: [...]
// }

// Calculate optimal hedge ratio
const optimalRatio = autoHedger.calculateOptimalHedgeRatio(spotReturns, hedgeReturns);

// Calculate hedge effectiveness
const effectiveness = autoHedger.calculateHedgeEffectiveness(unhedgedReturns, hedgedReturns);

// Update parameters
autoHedger.updateParams({
  hedgeRatio: 0.5,
  maxHedgeCost: 0.02,
  rebalanceThreshold: 0.05
});
```

### Position Sizer

```typescript
import { PositionSizer, positionSizer } from '@/lib/ai-risk';

// Kelly Criterion sizing
const kelly = positionSizer.kellyCriterion(0.55, 150, 100, 100000);
// {
//   size: 2500,
//   sizePercent: 2.5,
//   leverage: 1,
//   stopLoss: 0.02,
//   takeProfit: 0.04,
//   rationale: 'Kelly criterion: 5% -> Half-Kelly: 2.5%'
// }

// Risk parity allocation
const allocation = positionSizer.riskParityAllocation(
  [
    { symbol: 'BTC', returns: btcReturns, volatility: 0.6 },
    { symbol: 'ETH', returns: ethReturns, volatility: 0.8 }
  ],
  100000
);

// Volatility-adjusted sizing
const volSizing = positionSizer.volatilityAdjustedSize(
  100000,  // Portfolio value
  0.03,    // Current volatility
  0.02,    // Target risk
  50000,   // Entry price
  0.02     // Stop loss %
);

// Dynamic sizing based on market regime
const dynamicSizing = positionSizer.dynamicSize(
  100000,           // Portfolio value
  'trending_up',    // Regime
  0.03,             // Volatility
  0.8,              // Signal strength (0-1)
  riskMetrics
);

// Optimal leverage calculation
const leverage = positionSizer.optimalLeverage(0.15, 0.25, 0.02);
// Sharpe-optimal: L = (E[R] - Rf) / σ²

// Portfolio-level sizing
const portfolioSizing = positionSizer.portfolioSizing(
  signals,
  100000,
  currentPositions
);
```

### Risk Monitor (Combined)

```typescript
import { assessRisk, quickRiskCheck, RiskMonitor, riskMonitor } from '@/lib/ai-risk';

// Comprehensive risk assessment
const assessment = assessRisk(ohlcv, portfolioValue, positions);
// {
//   timestamp: 1234567890,
//   riskScore: 45,
//   anomalies: ['Unusual price movement...'],
//   positionSizing: {
//     recommended: 2.5,
//     maxAllowed: 10,
//     current: 5
//   },
//   hedging: {
//     hedgeRatio: 0.3,
//     recommendations: ['Delta hedge BTC position...'],
//     cost: 25
//   },
//   alerts: ['VaR alert: 5% risk of -2.5% loss'],
//   recommendation: 'CAUTION: Elevated risk...'
// }

// Quick risk check
const quick = quickRiskCheck(ohlcv);
// { riskLevel: 'medium', score: 45, warning: 'Moderate risk...' }

// Calculate optimal size
const optimal = calculateOptimalSize(100000, 0.55, 1.5, 0.03);
// { size: 2500, stopLoss: 0.02, takeProfit: 0.04, riskAmount: 2000 }

// Real-time monitoring
riskMonitor.onAlert((alert) => {
  console.log('Risk alert:', alert);
});

const assessment = riskMonitor.update(ohlcv, portfolioValue, positions);
const trend = riskMonitor.getTrend(); // 'improving' | 'stable' | 'worsening'
```

---

## 12. Risk Service

### Overview

Central service integrating real exchange data, GARCH volatility, and bot integration.

### Configuration

```typescript
interface RiskServiceConfig {
  updateIntervalMs: number;
  killSwitchThreshold: {
    drawdown: number;    // 15% max drawdown
    varBreach: number;   // 2x VaR breach
    dailyLoss: number;   // 10% daily loss
  };
  enableAutoKillSwitch: boolean;
  exchanges: string[];   // ['binance', 'bybit', 'okx', 'bitget', 'bingx']
}
```

### Service Report

```typescript
interface RiskServiceReport extends RiskReport {
  volatilityRegime: VolatilityRegime;
  garchAdjustments: {
    varMultiplier: number;
    positionSizeMultiplier: number;
    stopLossMultiplier: number;
  };
  bots: {
    total: number;
    running: number;
    stopped: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
  };
  exchanges: {
    name: string;
    connected: boolean;
    totalBalance: number;
    positions: number;
  }[];
  killSwitch: {
    isArmed: boolean;
    isTriggered: boolean;
    triggerReason?: string;
    botsStopped: number;
  };
}
```

### Usage

```typescript
import { getRiskService, initializeRiskService } from '@/lib/risk-management';

// Initialize
const service = initializeRiskService({
  updateIntervalMs: 60000,
  killSwitchThreshold: {
    drawdown: 15,
    varBreach: 2,
    dailyLoss: 10
  },
  enableAutoKillSwitch: true
});

await service.initialize();

// Start monitoring
service.start();

// Get current report
const report = service.getReport();
console.log('Risk Score:', report.riskScore);
console.log('Volatility Regime:', report.volatilityRegime);
console.log('Bot Risk Level:', report.bots.riskLevel);

// Get kill switch status
const ksStatus = service.getKillSwitchStatus();

// Manual kill switch control
service.armKillSwitch();
service.disarmKillSwitch();

// Manual trigger
await service.triggerKillSwitch('Manual trigger', bots);

// Stop service
service.stop();
```

---

## 13. Risk Middleware

### Overview

The RiskManager serves as the central orchestrator combining all risk components.

### Configuration

```typescript
interface RiskManagerConfig {
  var: VaRConfig;
  limits: PositionLimits;
  drawdown: DrawdownThresholds;
  killSwitch: KillSwitchConfig;
  enableLogging: boolean;
  updateInterval: number;
}
```

### Risk Report

```typescript
interface RiskReport {
  timestamp: number;
  var: VaRResult;
  exposure: {
    total: number;
    bySymbol: Record<string, number>;
    byExchange: Record<string, number>;
  };
  drawdown: DrawdownMetrics;
  limits: {
    used: number;
    available: number;
    breaches: string[];
  };
  killSwitch: KillSwitchStatus;
  riskScore: number;  // 0-100
  recommendations: string[];
}
```

### Usage

```typescript
import { RiskManager, createRiskManager, defaultRiskManagerConfig } from '@/lib/risk-management';

const manager = createRiskManager({
  var: { confidenceLevel: 0.95, method: 'monte_carlo' },
  limits: { maxLeverage: 10, maxTotalExposure: 100000 },
  drawdown: { warning: 0.05, critical: 0.10, breach: 0.20 }
});

// Initialize
manager.initialize(100000);  // Starting equity

// Update with portfolio data
const report = manager.update({
  equity: 95000,
  cash: 50000,
  positions: [...],
  dailyPnL: -2500
});

// Check if position is allowed
const check = manager.checkPosition('BTCUSDT', 'binance', 5000, 5, portfolio);

// Check if can trade
if (manager.canTrade()) {
  // Execute trade
}

// Get current risk score
const score = manager.getRiskScore();  // 0-100

// Register kill switch callback
manager.onKillSwitch(async (positions, trigger) => {
  // Handle kill switch trigger
  await closeAllPositions(positions);
});

// Trigger kill switch manually
await manager.triggerKillSwitch(positions, 'manual');

// Get drawdown metrics
const drawdown = manager.getDrawdown();

// Get VaR
const varResult = manager.getVaR();
```

---

## 14. Position Size Validator

### Overview

Risk-based position sizing with multiple strategies and validation.

### Sizing Methods

```typescript
type PositionSizingMethod = 
  | 'FIXED_FRACTIONAL'    // Risk fixed % per trade
  | 'KELLY_CRITERION'     // Mathematically optimal
  | 'VOLATILITY_ADJUSTED' // Adjust for ATR/volatility
  | 'RISK_PARITY'         // Equal risk contribution
  | 'FIXED_AMOUNT';       // Fixed position size
```

### Configuration

```typescript
interface PositionSizeConfig {
  defaultMethod: PositionSizingMethod;
  fixedFractionalRisk: number;      // 0.02 = 2%
  kellyFraction: number;            // 0.5 = half Kelly
  maxPositionPercent: number;       // 0.10 = 10%
  maxTotalExposurePercent: number;  // 0.50 = 50%
  maxOpenPositions: number;         // 10
  minRiskRewardRatio: number;       // 1.5
  defaultLeverage: number;          // 1
  maxLeverage: number;              // 20
  atrStopLossMultiplier: number;    // 2
  volatilityScalingFactor: number;  // 0.01
  enableCorrelationAdjustment: boolean;
  maxCorrelation: number;           // 0.7
  minOrderSize: number;             // $10
  maxOrderSize: number;             // $100k
}
```

### Input & Result

```typescript
interface SizingInput {
  accountBalance: number;
  availableMargin: number;
  entryPrice: number;
  stopLossPrice?: number;
  takeProfitPrice?: number;
  atr?: number;
  symbol: string;
  direction: 'LONG' | 'SHORT';
  exchange: string;
  winRate?: number;
  winLossRatio?: number;
  openPositions?: OpenPositionInfo[];
  leverage?: number;
  method?: PositionSizingMethod;
  customRiskPercent?: number;
}

interface SizingResult {
  positionSize: number;
  positionValue: number;
  units: number;
  riskAmount: number;
  riskPercent: number;
  recommendedLeverage: number;
  stopLossPercent: number;
  riskRewardRatio: number;
  method: PositionSizingMethod;
  valid: boolean;
  warnings: string[];
  errors: string[];
  adjustments: SizingAdjustment[];
  metrics: SizingMetrics;
}
```

### Exchange Limits

```typescript
const exchangeLimits = new Map([
  ['binance', { min: 10, max: 10000000, maxLeverage: 125 }],
  ['bybit', { min: 5, max: 5000000, maxLeverage: 100 }],
  ['okx', { min: 10, max: 5000000, maxLeverage: 125 }],
  ['bitget', { min: 5, max: 2000000, maxLeverage: 100 }],
  ['bingx', { min: 5, max: 1000000, maxLeverage: 50 }],
]);
```

### Usage

```typescript
import { 
  PositionSizeValidator, 
  getPositionSizeValidator,
  calculateQuickPositionSize,
  calculateKellyFraction
} from '@/lib/risk-management';

const validator = getPositionSizeValidator();

// Calculate position size
const result = validator.calculateSize({
  accountBalance: 100000,
  availableMargin: 50000,
  entryPrice: 50000,
  stopLossPrice: 48000,
  takeProfitPrice: 55000,
  atr: 1500,
  symbol: 'BTCUSDT',
  direction: 'LONG',
  exchange: 'binance',
  winRate: 0.55,
  winLossRatio: 1.5,
  leverage: 5,
  method: 'KELLY_CRITERION'
});

if (!result.valid) {
  console.log('Errors:', result.errors);
}
console.log('Position size:', result.positionSize);
console.log('Risk amount:', result.riskAmount);

// Validate existing position
const validation = validator.validate(positionValue, input);

// Get recommendations
const recommendations = validator.getRecommendedAdjustments(input);

// Quick position size calculation
const size = calculateQuickPositionSize(
  100000,  // Account balance
  50000,   // Entry price
  48000,   // Stop loss
  0.02     // 2% risk
);

// Quick Kelly fraction
const kelly = calculateKellyFraction(0.55, 1.5);  // 0.325
```

---

## 15. Risk Validator (Trading Layer)

### Overview

Production-ready risk validation layer that validates all trades before execution.

### Validation Result

```typescript
interface RiskValidationResult {
  allowed: boolean;
  reason?: string;
  warnings?: string[];
  requiredMargin?: number;
  availableBalance?: number;
  currentExposure?: number;
  maxExposure?: number;
  dailyPnL?: number;
  maxDailyLoss?: number;
}
```

### Risk Settings

```typescript
interface RiskSettings {
  maxDailyLoss: number;          // $1000
  maxDailyLossPercent: number;   // 5%
  maxPositionSize: number;       // $1000
  maxTotalExposure: number;      // $10000
  maxPositions: number;          // 10
  maxLeverage: number;           // 20x
  blacklistedSymbols: string[];
  allowedSymbols: string[];
  defaultStopLoss: number;       // 10%
  defaultTakeProfit: number;     // 20%
  minRiskRewardRatio: number;    // 1.5
  requireStopLoss: boolean;
  requireTakeProfit: boolean;
  requireConfirmation: boolean;
  killSwitchEnabled: boolean;
  killSwitchThreshold: number;   // 20%
}
```

### Validation Checks

1. **Blacklisted symbols** - Rejects trades on blacklisted symbols
2. **Allowed symbols** - If set, only allows trades on allowed symbols
3. **Leverage limits** - Rejects if leverage exceeds max
4. **Daily loss limit** - Rejects if daily loss limit reached
5. **Position count** - Rejects if max positions reached
6. **Total exposure** - Rejects if exposure limit exceeded
7. **Position size** - Warns if size exceeds recommended
8. **Stop loss required** - Rejects if SL required but not provided
9. **Take profit required** - Rejects if TP required but not provided
10. **Risk/reward ratio** - Warns if R:R below minimum
11. **Balance check** - Rejects if insufficient balance
12. **Kill switch** - Rejects if kill switch triggered

### Usage

```typescript
import { 
  validateTrade, 
  getRiskSettings,
  calculateTotalExposure,
  calculateDailyPnL,
  updateDailyMetrics
} from '@/lib/trading/risk-validator';

// Validate trade before execution
const result = await validateTrade(
  userId,
  'BTCUSDT',
  'LONG',
  1000,   // Amount
  5,      // Leverage
  48000,  // Stop loss
  52000,  // Take profit
  accountId,
  exchangeClient
);

if (!result.allowed) {
  console.log('Trade rejected:', result.reason);
  return;
}

if (result.warnings && result.warnings.length > 0) {
  console.log('Warnings:', result.warnings);
}

// Execute trade...

// Update metrics after trade
await updateDailyMetrics(userId, pnl, isWin);

// Get current exposure
const exposure = await calculateTotalExposure(userId);

// Get daily PnL
const dailyPnL = await calculateDailyPnL(userId);
```

---

## 16. Usage Examples

### Complete Risk Management Setup

```typescript
import {
  getRiskService,
  getKillSwitchManager,
  getMonteCarloVaR,
  getStressTestingEngine,
  getPositionCorrelationMonitor,
  getPositionReconciliation,
  getPositionSizeValidator
} from '@/lib/risk-management';

async function setupRiskManagement() {
  // 1. Initialize Risk Service
  const riskService = getRiskService({
    updateIntervalMs: 60000,
    killSwitchThreshold: {
      drawdown: 15,
      varBreach: 2,
      dailyLoss: 10
    },
    enableAutoKillSwitch: true
  });
  
  await riskService.initialize();
  riskService.start();

  // 2. Setup Kill Switch
  const killSwitch = getKillSwitchManager();
  killSwitch.onAutoArm((event) => {
    console.log('Kill switch auto-armed:', event.reason);
  });

  // 3. Setup VaR
  const varCalculator = getMonteCarloVaR({
    simulations: 50000,
    timeHorizon: 1
  });

  // 4. Setup Stress Testing
  const stressEngine = getStressTestingEngine();

  // 5. Setup Correlation Monitor
  const correlationMonitor = getPositionCorrelationMonitor({
    maxCorrelationThreshold: 0.7
  });
  correlationMonitor.startMonitoring();
  correlationMonitor.onAlert((alert) => {
    if (alert.severity === 'critical') {
      riskService.triggerKillSwitch(`Correlation alert: ${alert.message}`);
    }
  });

  // 6. Setup Reconciliation
  const reconciliation = getPositionReconciliation({
    autoRecover: true
  });
  reconciliation.startPeriodicSync();

  // 7. Setup Position Sizer
  const sizer = getPositionSizeValidator({
    defaultMethod: 'KELLY_CRITERION',
    kellyFraction: 0.25,
    maxLeverage: 10
  });

  return {
    riskService,
    killSwitch,
    varCalculator,
    stressEngine,
    correlationMonitor,
    reconciliation,
    sizer
  };
}
```

### Pre-Trade Validation Flow

```typescript
async function validateAndExecuteTrade(tradeParams) {
  const riskService = getRiskService();
  const killSwitch = getKillSwitchManager();
  const sizer = getPositionSizeValidator();

  // 1. Check kill switch
  if (!killSwitch.canTrade()) {
    throw new Error('Kill switch is active');
  }

  // 2. Get position size recommendation
  const sizing = sizer.calculateSize({
    accountBalance: portfolio.equity,
    availableMargin: portfolio.availableMargin,
    entryPrice: tradeParams.entryPrice,
    stopLossPrice: tradeParams.stopLoss,
    symbol: tradeParams.symbol,
    direction: tradeParams.direction,
    exchange: tradeParams.exchange,
    winRate: 0.55,
    winLossRatio: 1.5
  });

  if (!sizing.valid) {
    throw new Error(`Invalid position: ${sizing.errors.join(', ')}`);
  }

  // 3. Check correlation
  const monitor = getPositionCorrelationMonitor();
  const riskScore = monitor.getPortfolioRiskScore();
  
  if (riskScore > 70) {
    console.warn('High portfolio correlation risk');
  }

  // 4. Get VaR-adjusted position size
  const garchVaR = getGarchVaRCalculator();
  const adjustedSizing = garchVaR.calculateAdjustedPositionSize(
    sizing.positionSize,
    tradeParams.symbol
  );

  // 5. Execute with adjusted size
  const adjustedParams = {
    ...tradeParams,
    amount: adjustedSizing.size
  };

  // 6. Track position
  killSwitch.trackPositionOpen(positionId, tradeParams.symbol);

  return executeTrade(adjustedParams);
}
```

### Real-Time Risk Monitoring

```typescript
import { riskMonitor } from '@/lib/ai-risk';

function setupRealTimeMonitoring() {
  // Register alert handlers
  riskMonitor.onAlert((alert) => {
    sendNotification(`RISK ALERT: ${alert}`);
  });

  // Start monitoring loop
  setInterval(async () => {
    const ohlcv = await fetchOHLCV('BTCUSDT');
    const portfolio = await getPortfolioData();
    const positions = await getOpenPositions();

    const assessment = riskMonitor.update(ohlcv, portfolio.equity, positions);

    // Check risk level
    if (assessment.riskScore > 70) {
      // Reduce positions
      await reducePositions(0.5);
    }

    // Check anomalies
    if (assessment.anomalies.length > 0) {
      logAnomalies(assessment.anomalies);
    }

    // Check hedging recommendations
    if (assessment.hedging.recommendations.length > 0) {
      executeHedges(assessment.hedging.recommendations);
    }

    // Check trend
    const trend = riskMonitor.getTrend();
    if (trend === 'worsening') {
      alertRiskTeam('Risk trend is worsening');
    }
  }, 60000); // Every minute
}
```

### Stress Test Before Trading

```typescript
async function stressTestBeforeTrading(newPosition) {
  const stressEngine = getStressTestingEngine();
  
  // Add price history
  stressEngine.addPriceHistory(newPosition.symbol, await getPriceHistory(newPosition.symbol));

  // Get current positions + new position
  const positions = [...await getOpenPositions(), newPosition];

  // Run all scenarios
  const results = stressEngine.runAllStressTests(positions);

  // Check for critical scenarios
  const criticalScenarios = results.filter(r => 
    r.liquidationRisk || r.marginCall
  );

  if (criticalScenarios.length > 0) {
    console.log('Critical scenarios found:');
    criticalScenarios.forEach(r => {
      console.log(`- ${r.scenarioName}: ${r.pnlPercent.toFixed(2)}% loss`);
    });

    // Get summary report
    const report = stressEngine.generateSummaryReport(positions);
    console.log('Recommendations:', report.recommendations);

    return { proceed: false, report };
  }

  return { proceed: true };
}
```

### Kill Switch Integration with Bots

```typescript
import { getKillSwitchManager } from '@/lib/risk-management';

class BotManager {
  private killSwitch = getKillSwitchManager();

  async startBot(botId: string, botType: string, mode: 'paper' | 'live') {
    // Register bot (triggers auto-arm)
    this.killSwitch.registerBot(botId, botType, mode);

    // Start bot logic
    // ...
  }

  async stopBot(botId: string) {
    // Unregister bot
    this.killSwitch.unregisterBot(botId);

    // Stop bot logic
    // ...
  }

  async onPositionOpen(positionId: string, symbol: string, botId?: string) {
    // Track position (triggers auto-arm on first)
    this.killSwitch.trackPositionOpen(positionId, symbol, botId);
  }

  async onPositionClose(positionId: string) {
    this.killSwitch.trackPositionClose(positionId);
  }
}
```

---

## API Reference Summary

### Core Risk Functions

| Function | Description |
|----------|-------------|
| `calculateVaR(returns, portfolioValue, config?)` | Quick VaR calculation |
| `calculateKelly(params)` | Kelly Criterion calculation |
| `getRiskService()` | Get risk service singleton |
| `getKillSwitchManager()` | Get kill switch singleton |
| `getMonteCarloVaR(config?)` | Get Monte Carlo VaR singleton |
| `getStressTestingEngine(config?)` | Get stress testing singleton |
| `getPositionCorrelationMonitor(config?)` | Get correlation monitor |
| `getPositionReconciliation(config?)` | Get reconciliation system |
| `getPositionSizeValidator(config?)` | Get position sizer |
| `canTradeGlobally()` | Quick check if trading allowed |

### AI Risk Functions

| Function | Description |
|----------|-------------|
| `assessRisk(ohlcv, portfolioValue, positions?)` | Comprehensive risk assessment |
| `quickRiskCheck(ohlcv)` | Quick risk level check |
| `calculateOptimalSize(portfolioValue, winRate, ratio, vol)` | Optimal position sizing |

---

## Configuration Defaults

```typescript
// VaR
{
  confidenceLevel: 0.95,
  timeHorizon: 1,
  method: 'historical',
  lookbackPeriod: 252,
  monteCarloSimulations: 10000
}

// Position Limits
{
  maxPositionSize: 10000,
  maxTotalExposure: 100000,
  maxPositionsPerSymbol: 2,
  maxTotalPositions: 20,
  maxLeverage: 10,
  maxCorrelation: 0.7
}

// Drawdown
{
  warning: 0.05,
  critical: 0.10,
  breach: 0.20,
  recoveryThreshold: 0.02
}

// Kill Switch
{
  drawdownPct: 0.20,
  varMultiplier: 3.0,
  correlationLimit: 0.9,
  liquidityMin: 1000,
  recoveryCooldown: 86400000
}
```

---

## Related Documentation

- [Risk Management UI](../components/RISK_MANAGEMENT_UI.md)
- [GARCH Volatility Analysis](../ml/GARCH_VOLATILITY_ANALYSIS.md)
- [Auto Trading API](./AUTO_TRADING_API.md)
- [Backend API Reference](./BACKEND_API_REFERENCE.md)
