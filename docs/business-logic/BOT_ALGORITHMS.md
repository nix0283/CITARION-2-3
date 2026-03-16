# CITARION Bot Algorithms

> **Last Updated:** March 2025  
> **Scope:** All trading bot algorithms

---

## Table of Contents

1. [Overview](#overview)
2. [Grid Bot Algorithm](#grid-bot-algorithm)
3. [DCA Bot Algorithm](#dca-bot-algorithm)
4. [BB Bot Algorithm](#bb-bot-algorithm)
5. [Vision Bot Algorithm](#vision-bot-algorithm)
6. [Institutional Bots](#institutional-bots)
7. [Risk Management Algorithms](#risk-management-algorithms)

---

## Overview

CITARION implements 17+ trading bot algorithms, each with specific mathematical models and execution strategies.

### Algorithm Categories

| Category | Bots | Key Metrics |
|----------|------|-------------|
| Grid | MESH | Profit per grid, utilization |
| DCA | SCALE | Avg entry, break-even price |
| Oscillator | BAND | BB width, Stoch K/D |
| Forecast | FCST | Prediction confidence |
| Institutional | 5 types | Spread, volume, volatility |

---

## Grid Bot Algorithm

### Mathematical Model

Grid trading profits from price oscillations within a defined range.

#### Grid Level Calculation

```
Arithmetic Grid:
price_i = lower_price + (i × grid_spacing)

where:
  i = grid level (0 to grid_count)
  grid_spacing = (upper_price - lower_price) / grid_count

Geometric Grid:
price_i = lower_price × (1 + grid_spacing)^i

where:
  grid_spacing = ((upper_price / lower_price)^(1/grid_count)) - 1
```

#### Implementation

```typescript
// lib/grid-bot/calculator.ts

interface GridConfig {
  upperPrice: number;
  lowerPrice: number;
  gridCount: number;
  totalInvestment: number;
  gridType: 'ARITHMETIC' | 'GEOMETRIC';
}

interface GridLevel {
  level: number;
  price: number;
  buyAmount: number;
  sellAmount: number;
}

export function calculateGridLevels(config: GridConfig): GridLevel[] {
  const { upperPrice, lowerPrice, gridCount, totalInvestment, gridType } = config;
  
  const levels: GridLevel[] = [];
  const amountPerGrid = totalInvestment / gridCount;
  
  for (let i = 0; i <= gridCount; i++) {
    let price: number;
    
    if (gridType === 'ARITHMETIC') {
      const spacing = (upperPrice - lowerPrice) / gridCount;
      price = lowerPrice + (i * spacing);
    } else {
      const ratio = upperPrice / lowerPrice;
      const spacing = Math.pow(ratio, 1 / gridCount);
      price = lowerPrice * Math.pow(spacing, i);
    }
    
    levels.push({
      level: i,
      price,
      buyAmount: amountPerGrid / price,
      sellAmount: amountPerGrid / price,
    });
  }
  
  return levels;
}
```

#### Profit Calculation

```
profit_per_grid = (sell_price - buy_price) × quantity

total_potential_profit = profit_per_grid × grid_count

grid_profit_ratio = profit_per_grid / (buy_price × quantity)
                  = grid_spacing / price
```

#### Trailing Grid

```typescript
// Dynamic grid adjustment based on ATR
export function calculateTrailingGrid(
  currentPrice: number,
  atr: number,
  atrMultiplier: number = 2
): { upperPrice: number; lowerPrice: number } {
  const range = atr * atrMultiplier;
  
  return {
    upperPrice: currentPrice + range,
    lowerPrice: currentPrice - range,
  };
}
```

---

## DCA Bot Algorithm

### Mathematical Model

Dollar-Cost Averaging reduces average entry price through multiple purchases.

#### Average Entry Price

```
avg_entry_price = Σ(quantity_i × price_i) / Σ(quantity_i)

with DCA multiplier:
  quantity_i = base_quantity × multiplier^(i-1)
```

#### Break-Even Calculation

```typescript
// lib/dca-bot/calculator.ts

interface DCAConfig {
  baseAmount: number;
  dcaLevels: number;
  dcaPercent: number;        // Price drop % per level
  dcaMultiplier: number;     // Amount multiplier
}

interface DCAState {
  totalInvested: number;
  totalQuantity: number;
  avgEntryPrice: number;
  breakEvenPrice: number;
}

export function calculateDCAState(
  config: DCAConfig,
  currentPrice: number,
  filledLevels: number
): DCAState {
  const { baseAmount, dcaLevels, dcaPercent, dcaMultiplier } = config;
  
  let totalInvested = 0;
  let totalQuantity = 0;
  
  for (let i = 0; i <= Math.min(filledLevels, dcaLevels); i++) {
    const price = currentPrice * (1 - (i * dcaPercent / 100));
    const amount = baseAmount * Math.pow(dcaMultiplier, i);
    const quantity = amount / price;
    
    totalInvested += amount;
    totalQuantity += quantity;
  }
  
  const avgEntryPrice = totalInvested / totalQuantity;
  
  return {
    totalInvested,
    totalQuantity,
    avgEntryPrice,
    breakEvenPrice: avgEntryPrice, // Simplified (doesn't include fees)
  };
}
```

#### Optimal DCA Parameters

```typescript
// Calculate optimal DCA levels for target average entry
export function calculateOptimalDCA(
  currentPrice: number,
  targetAvgPrice: number,
  maxLevels: number,
  maxDropPercent: number
): { levels: number[]; amounts: number[] } {
  // Kelly-inspired calculation
  const targetDrop = (currentPrice - targetAvgPrice) / currentPrice;
  const levelDrop = Math.min(targetDrop / maxLevels, maxDropPercent / 100);
  
  const levels: number[] = [];
  const amounts: number[] = [];
  
  for (let i = 0; i < maxLevels; i++) {
    levels.push(currentPrice * (1 - (i * levelDrop)));
    // Increasing amounts for better averaging
    amounts.push(1 + (i * 0.5)); // Multiplier
  }
  
  return { levels, amounts };
}
```

---

## BB Bot Algorithm

### Mathematical Model

Bollinger Bands bot uses volatility bands and stochastic oscillator.

#### Bollinger Bands

```
Middle Band = SMA(period)
Upper Band = Middle + (std_dev × deviation)
Lower Band = Middle - (std_dev × deviation)

where:
  std_dev = Standard Deviation over period
  deviation = Typically 2
  period = Typically 20
```

#### Double Bollinger Bands

```typescript
// lib/bb-bot/indicators.ts

interface BBResult {
  middle: number;
  innerUpper: number;
  innerLower: number;
  outerUpper: number;
  outerLower: number;
  bandwidth: number;
  percentB: number;
}

export function calculateDoubleBollingerBands(
  prices: number[],
  innerDeviation: number = 1,
  outerDeviation: number = 2,
  period: number = 20
): BBResult {
  const sma = calculateSMA(prices, period);
  const stdDev = calculateStdDev(prices, period);
  
  const lastPrice = prices[prices.length - 1];
  
  return {
    middle: sma,
    innerUpper: sma + (stdDev * innerDeviation),
    innerLower: sma - (stdDev * innerDeviation),
    outerUpper: sma + (stdDev * outerDeviation),
    outerLower: sma - (stdDev * outerDeviation),
    bandwidth: (2 * stdDev * outerDeviation) / sma,
    percentB: (lastPrice - (sma - stdDev * outerDeviation)) / 
              (2 * stdDev * outerDeviation),
  };
}
```

#### Slow Stochastic

```typescript
interface StochResult {
  k: number;
  d: number;
  isOverbought: boolean;
  isOversold: boolean;
}

export function calculateSlowStochastic(
  highs: number[],
  lows: number[],
  closes: number[],
  kPeriod: number = 14,
  dPeriod: number = 3,
  slowing: number = 3
): StochResult {
  const fastK = calculateFastK(highs, lows, closes, kPeriod);
  const slowK = calculateSMA(fastK, slowing);
  const d = calculateSMA(slowK, dPeriod);
  
  const lastK = slowK[slowK.length - 1];
  const lastD = d[d.length - 1];
  
  return {
    k: lastK,
    d: lastD,
    isOverbought: lastK > 80,
    isOversold: lastK < 20,
  };
}
```

#### Signal Generation

```typescript
interface BBSignal {
  type: 'LONG' | 'SHORT' | 'CLOSE';
  strength: number; // 0-1
  reason: string;
}

export function generateBBSignal(
  price: number,
  bb: BBResult,
  stoch: StochResult,
  config: { minStrength: number }
): BBSignal | null {
  // Long signal: Price at lower band + Stoch oversold
  if (price <= bb.innerLower && stoch.isOversold) {
    const strength = Math.min(
      (bb.innerLower - price) / (bb.outerLower - bb.innerLower),
      (20 - stoch.k) / 20
    );
    
    if (strength >= config.minStrength) {
      return {
        type: 'LONG',
        strength,
        reason: 'Price at lower BB + Stoch oversold',
      };
    }
  }
  
  // Short signal: Price at upper band + Stoch overbought
  if (price >= bb.innerUpper && stoch.isOverbought) {
    const strength = Math.min(
      (price - bb.innerUpper) / (bb.outerUpper - bb.innerUpper),
      (stoch.k - 80) / 20
    );
    
    if (strength >= config.minStrength) {
      return {
        type: 'SHORT',
        strength,
        reason: 'Price at upper BB + Stoch overbought',
      };
    }
  }
  
  return null;
}
```

---

## Vision Bot Algorithm

### Mathematical Model

Vision bot uses ML ensemble for price forecasting.

#### Feature Engineering

```typescript
// lib/vision-bot/features.ts

interface MarketFeatures {
  // Price features
  returns: number[];
  logReturns: number[];
  volatility: number;
  
  // Trend features
  ema5: number;
  ema20: number;
  trend: number; // -1 to 1
  
  // Momentum features
  rsi: number;
  macd: { value: number; signal: number; histogram: number };
  
  // Volume features
  volumeRatio: number;
  obvTrend: number;
  
  // Volatility features
  atr: number;
  bbWidth: number;
}

export function extractFeatures(candles: Candle[]): MarketFeatures {
  const closes = candles.map(c => c.close);
  const volumes = candles.map(c => c.volume);
  
  return {
    returns: calculateReturns(closes),
    logReturns: calculateLogReturns(closes),
    volatility: calculateVolatility(closes, 20),
    
    ema5: calculateEMA(closes, 5),
    ema20: calculateEMA(closes, 20),
    trend: calculateTrendStrength(closes, 20),
    
    rsi: calculateRSI(closes, 14)[closes.length - 1] || 50,
    macd: calculateMACD(closes, 12, 26, 9),
    
    volumeRatio: volumes[volumes.length - 1] / calculateSMA(volumes, 20),
    obvTrend: calculateOBVTrend(candles),
    
    atr: calculateATR(candles, 14),
    bbWidth: calculateBBWidth(closes, 20),
  };
}
```

#### Forecast Generation

```typescript
// lib/vision-bot/forecast.ts

interface Forecast {
  symbol: string;
  horizon: string; // 1h, 4h, 24h
  direction: 'UP' | 'DOWN' | 'NEUTRAL';
  probability: number;
  confidence: number;
  expectedChange: number;
  priceTarget: number;
  stopLoss: number;
}

export async function generateForecast(
  symbol: string,
  candles: Candle[],
  mlClient: MLServiceClient
): Promise<Forecast[]> {
  const features = extractFeatures(candles);
  
  // Get ML predictions for multiple horizons
  const predictions = await mlClient.predictPrice({
    features: normalizeFeatures(features),
    horizons: ['1h', '4h', '24h'],
  });
  
  return predictions.map(p => ({
    symbol,
    horizon: p.horizon,
    direction: p.expectedChange > 0 ? 'UP' : p.expectedChange < 0 ? 'DOWN' : 'NEUTRAL',
    probability: p.probability,
    confidence: p.confidence,
    expectedChange: p.expectedChange,
    priceTarget: candles[candles.length - 1].close * (1 + p.expectedChange),
    stopLoss: calculateDynamicStopLoss(candles, p.expectedChange),
  }));
}
```

---

## Institutional Bots

### Spectrum (Spread Trading)

```typescript
// Spread = |price_A - price_B| / mean_price
interface SpreadTrade {
  symbolA: string;
  symbolB: string;
  correlation: number;
  spreadMean: number;
  spreadStdDev: number;
  currentSpread: number;
  zScore: number;
}

export function calculateSpreadSignal(trade: SpreadTrade): 'LONG_SPREAD' | 'SHORT_SPREAD' | null {
  const zScore = (trade.currentSpread - trade.spreadMean) / trade.spreadStdDev;
  
  // Mean reversion strategy
  if (zScore > 2) {
    return 'SHORT_SPREAD'; // Spread too wide, expect contraction
  }
  if (zScore < -2) {
    return 'LONG_SPREAD'; // Spread too narrow, expect expansion
  }
  
  return null;
}
```

### Reed (Statistical Arbitrage)

```typescript
// Cointegration-based pairs trading
interface PairsTrade {
  symbolA: string;
  symbolB: string;
  hedgeRatio: number;
  residual: number;
  halfLife: number;
}

export function calculatePairsSignal(trade: PairsTrade): Signal | null {
  // Trade when residual exceeds threshold
  const threshold = 2 * trade.residual.stdDev;
  
  if (Math.abs(trade.residual) > threshold) {
    return {
      type: 'PAIRS_TRADE',
      direction: trade.residual > 0 ? 'SHORT_A_LONG_B' : 'LONG_A_SHORT_B',
      quantity: Math.abs(trade.residual) / threshold,
      expectedReturn: trade.halfLife * 0.1, // Rough estimate
    };
  }
  
  return null;
}
```

### Architect (Market Making)

```typescript
// Inventory-based market making
interface MarketMakerState {
  inventory: number;        // Current position
  targetInventory: number;  // Target position (usually 0)
  maxInventory: number;     // Max allowed position
  baseSpread: number;       // Base bid-ask spread
  skewFactor: number;       // How much to skew based on inventory
}

export function calculateMMQuotes(
  midPrice: number,
  state: MarketMakerState
): { bid: number; ask: number; bidSize: number; askSize: number } {
  // Skew quotes based on inventory
  const inventorySkew = (state.inventory / state.maxInventory) * state.skewFactor;
  
  const bidOffset = state.baseSpread / 2 * (1 + inventorySkew);
  const askOffset = state.baseSpread / 2 * (1 - inventorySkew);
  
  // Size inversely proportional to inventory
  const bidSize = state.maxInventory - state.inventory;
  const askSize = state.maxInventory + state.inventory;
  
  return {
    bid: midPrice * (1 - bidOffset),
    ask: midPrice * (1 + askOffset),
    bidSize,
    askSize,
  };
}
```

---

## Risk Management Algorithms

### VaR Calculation

```typescript
// lib/risk-management/var.ts

interface VaRConfig {
  confidenceLevel: number; // 0.95, 0.99
  horizon: number;         // Days
  method: 'historical' | 'parametric' | 'monte_carlo';
}

export function calculateVaR(
  returns: number[],
  config: VaRConfig
): { var: number; cvar: number } {
  switch (config.method) {
    case 'historical':
      return calculateHistoricalVaR(returns, config.confidenceLevel);
    case 'parametric':
      return calculateParametricVaR(returns, config.confidenceLevel);
    case 'monte_carlo':
      return calculateMonteCarloVaR(returns, config);
  }
}

function calculateHistoricalVaR(
  returns: number[],
  confidence: number
): { var: number; cvar: number } {
  const sorted = [...returns].sort((a, b) => a - b);
  const index = Math.floor(returns.length * (1 - confidence));
  
  const varValue = sorted[index];
  const cvarValue = sorted.slice(0, index).reduce((a, b) => a + b, 0) / index;
  
  return { var: varValue, cvar: cvarValue };
}

function calculateParametricVaR(
  returns: number[],
  confidence: number
): { var: number; cvar: number } {
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((a, b) => a + (b - mean) ** 2, 0) / returns.length;
  const stdDev = Math.sqrt(variance);
  
  // Z-score for confidence level
  const zScore = getZScore(1 - confidence);
  
  const varValue = mean - (zScore * stdDev);
  const cvarValue = mean - (stdDev * Math.exp(-zScore ** 2 / 2) / 
                   (Math.sqrt(2 * Math.PI) * (1 - confidence)));
  
  return { var: varValue, cvar: cvarValue };
}
```

### Kelly Criterion

```typescript
// lib/risk-management/position-sizer.ts

export function calculateKellyFraction(
  winRate: number,
  avgWin: number,
  avgLoss: number
): number {
  // Kelly = W - ((1-W) / R)
  // where W = win rate, R = avg win / avg loss
  const R = avgWin / Math.abs(avgLoss);
  const kelly = winRate - ((1 - winRate) / R);
  
  // Use fractional Kelly (typically 25-50%)
  return Math.max(0, Math.min(kelly * 0.5, 0.25));
}

export function calculatePositionSize(
  capital: number,
  riskPercent: number,
  entryPrice: number,
  stopLoss: number
): number {
  const riskAmount = capital * (riskPercent / 100);
  const riskPerUnit = Math.abs(entryPrice - stopLoss);
  const rewardRatio = avgWin / Math.abs(avgLoss);
  const kelly = winRate - ((1 - winRate) / rewardRatio);
  
  // Cap at reasonable level
  return Math.max(0, Math.min(kelly, 0.25)); // Max 25%
}

export function calculatePositionSize(
  capital: number,
  kellyFraction: number,
  entryPrice: number,
  stopLoss: number
): number {
  // Risk amount based on Kelly
  const riskAmount = capital * kellyFraction;
  
  // Position size based on stop loss
  const riskPerUnit = Math.abs(entryPrice - stopLoss);
  const positionSize = riskAmount / riskPerUnit;
  
  return positionSize;
}
```

### Trailing Stop Algorithms

```typescript
// lib/risk-management/trailing-stop.ts

type TrailingType = 
  | 'BREAKEVEN'
  | 'MOVING_TARGET'
  | 'MOVING_2_TARGET'
  | 'PERCENT_BELOW_TRIGGERS'
  | 'PERCENT_BELOW_HIGHEST';

interface TrailingState {
  type: TrailingType;
  entryPrice: number;
  highestPrice: number;
  trailingPercent: number;
  activated: boolean;
  currentStop: number;
}

export function updateTrailingStop(
  state: TrailingState,
  currentPrice: number,
  targetReached: number // Which TP was reached
): TrailingState {
  const newState = { ...state };
  
  // Update highest price
  if (currentPrice > state.highestPrice) {
    newState.highestPrice = currentPrice;
  }
  
  switch (state.type) {
    case 'BREAKEVEN':
      // Move SL to entry when TP1 is reached
      if (targetReached >= 1 && !state.activated) {
        newState.currentStop = state.entryPrice;
        newState.activated = true;
      }
      break;
      
    case 'MOVING_TARGET':
      // Trail stop behind each TP
      if (targetReached >= 1) {
        newState.currentStop = state.entryPrice;
      }
      if (targetReached >= 2) {
        newState.currentStop = state.entryPrice + 
          (state.highestPrice - state.entryPrice) * 0.5;
      }
      break;
      
    case 'PERCENT_BELOW_HIGHEST':
      // Trail by percentage below highest price
      if (state.activated) {
        newState.currentStop = state.highestPrice * (1 - state.trailingPercent / 100);
      } else if (currentPrice >= state.entryPrice * (1 + state.trailingPercent / 100)) {
        newState.activated = true;
        newState.currentStop = state.highestPrice * (1 - state.trailingPercent / 100);
      }
      break;
  }
  
  return newState;
}
```

---

## Related Documentation

- [DATABASE_SCHEMA.md](../architecture/DATABASE_SCHEMA.md) - Bot data models
- [API_SPECIFICATION.md](../architecture/API_SPECIFICATION.md) - Bot APIs
- [RISK_MANAGEMENT.md](../business-logic/RISK_MANAGEMENT.md) - Risk algorithms
