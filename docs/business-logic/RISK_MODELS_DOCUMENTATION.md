# CITARION Risk Models Documentation

**Version:** 1.0
**Last Updated:** March 2026
**Status:** Production Ready

---

## Table of Contents

1. [Overview](#1-overview)
2. [Position Sizing Models](#2-position-sizing-models)
3. [Value at Risk (VaR)](#3-value-at-risk-var)
4. [Expected Shortfall (CVaR)](#4-expected-shortfall-cvar)
5. [Drawdown Analysis](#5-drawdown-analysis)
6. [Sharpe & Sortino Ratios](#6-sharpe--sortino-ratios)
7. [Leverage Risk Models](#7-leverage-risk-models)
8. [Correlation Risk](#8-correlation-risk)
9. [Liquidity Risk](#9-liquidity-risk)
10. [Implementation Details](#10-implementation-details)

---

## 1. Overview

### 1.1 Purpose

This document describes the risk models and calculations used in CITARION for position sizing, portfolio management, and risk assessment.

### 1.2 Risk Management Philosophy

```
Core Principles:
1. Capital Preservation - Never risk more than you can afford to lose
2. Consistent Position Sizing - Mathematical approach to trade sizing
3. Dynamic Risk Adjustment - Adapt to market conditions
4. Correlation Awareness - Consider portfolio-wide risk
5. Drawdown Control - Limit maximum losses
```

### 1.3 Risk Metrics Overview

| Metric | Purpose | Frequency |
|--------|---------|-----------|
| Position Size | Trade sizing | Per trade |
| VaR | Portfolio risk | Daily |
| CVaR | Tail risk | Daily |
| Drawdown | Peak-to-trough | Continuous |
| Sharpe Ratio | Risk-adjusted return | Monthly |
| Sortino Ratio | Downside risk | Monthly |

---

## 2. Position Sizing Models

### 2.1 Fixed Amount Model

Simple position sizing with fixed dollar amount per trade.

```typescript
function calculateFixedAmount(config: FixedAmountConfig): number {
  return config.amount;
}

// Example: Always trade $100 per position
const size = calculateFixedAmount({ amount: 100 });
// Result: $100
```

### 2.2 Percentage of Equity Model

Position size based on percentage of total equity.

```typescript
function calculatePercentageOfEquity(
  equity: number,
  percentage: number
): number {
  return equity * (percentage / 100);
}

// Example: Risk 2% of $10,000 equity
const size = calculatePercentageOfEquity(10000, 2);
// Result: $200
```

### 2.3 Risk Per Trade Model (Kelly Criterion Derivative)

Position size based on acceptable loss per trade.

```typescript
function calculateRiskPerTrade(
  equity: number,
  riskPercent: number,
  entryPrice: number,
  stopLossPrice: number
): number {
  const riskAmount = equity * (riskPercent / 100);
  const riskPerUnit = Math.abs(entryPrice - stopLossPrice);
  const positionSize = riskAmount / riskPerUnit;
  
  return positionSize * entryPrice; // Return position value
}

// Example: Risk 1% of $10,000 equity, entry at $100, SL at $95
const size = calculateRiskPerTrade(10000, 1, 100, 95);
// Risk amount = $100
// Risk per unit = $5
// Position size = 20 units = $2,000
```

### 2.4 Volatility-Adjusted Model (ATR-Based)

Position size adjusted for market volatility.

```typescript
function calculateVolatilityAdjusted(
  equity: number,
  riskPercent: number,
  atr: number,
  atrMultiplier: number = 1
): number {
  const riskAmount = equity * (riskPercent / 100);
  const stopDistance = atr * atrMultiplier;
  
  // Assuming entry price context
  const positionValue = riskAmount / (stopDistance / 100); // Simplified
  
  return Math.min(positionValue, equity * 0.25); // Cap at 25% of equity
}

// Example: $10,000 equity, 2% risk, ATR = 500, multiplier = 2
const size = calculateVolatilityAdjusted(10000, 2, 500, 2);
// Stop distance = 1000
// Position value = $200 / (1000/100) = $20 (very conservative)
```

### 2.5 Optimal F (Kelly Criterion)

Mathematical optimal position sizing based on edge.

```typescript
function calculateKellyCriterion(
  winRate: number,
  avgWin: number,
  avgLoss: number
): number {
  // Kelly % = W - [(1 - W) / R]
  // Where: W = Win rate, R = Win/Loss ratio
  const R = avgWin / avgLoss;
  const kellyPercent = winRate - ((1 - winRate) / R);
  
  // Use fractional Kelly (typically 25-50% of full Kelly)
  return Math.max(0, kellyPercent * 0.25);
}

// Example: 60% win rate, $200 avg win, $100 avg loss
const kellyFraction = calculateKellyCriterion(0.60, 200, 100);
// R = 2.0
// Kelly = 0.60 - (0.40 / 2.0) = 0.40 = 40%
// Fractional Kelly = 10%
```

---

## 3. Value at Risk (VaR)

### 3.1 Historical VaR

Calculate VaR using historical simulation.

```typescript
function calculateHistoricalVaR(
  returns: number[],
  confidenceLevel: number = 0.95
): number {
  const sortedReturns = [...returns].sort((a, b) => a - b);
  const index = Math.floor((1 - confidenceLevel) * sortedReturns.length);
  
  return Math.abs(sortedReturns[index]);
}

// Example: Calculate 95% VaR from 100 daily returns
const returns = [...]; // Array of daily returns
const var95 = calculateHistoricalVaR(returns, 0.95);
// Returns the 5th percentile loss
```

### 3.2 Parametric VaR

Calculate VaR assuming normal distribution.

```typescript
function calculateParametricVaR(
  mean: number,
  stdDev: number,
  confidenceLevel: number = 0.95
): number {
  // Z-scores for common confidence levels
  const zScores: Record<number, number> = {
    0.90: 1.282,
    0.95: 1.645,
    0.99: 2.326,
  };
  
  const z = zScores[confidenceLevel] || 1.645;
  const var_value = -(mean - z * stdDev);
  
  return Math.max(0, var_value);
}

// Example: Mean return = 0.1%, StdDev = 2%
const var95 = calculateParametricVaR(0.001, 0.02, 0.95);
// VaR = -(0.001 - 1.645 * 0.02) = 3.19%
```

### 3.3 Monte Carlo VaR

Simulate VaR using Monte Carlo method.

```typescript
function calculateMonteCarloVaR(
  mean: number,
  stdDev: number,
  simulations: number = 10000,
  confidenceLevel: number = 0.95
): number {
  const returns: number[] = [];
  
  for (let i = 0; i < simulations; i++) {
    // Box-Muller transform for normal distribution
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const simulatedReturn = mean + stdDev * z;
    returns.push(simulatedReturn);
  }
  
  return calculateHistoricalVaR(returns, confidenceLevel);
}
```

### 3.4 Conditional VaR (Expected Shortfall)

Average loss beyond VaR threshold.

```typescript
function calculateCVaR(
  returns: number[],
  confidenceLevel: number = 0.95
): number {
  const sortedReturns = [...returns].sort((a, b) => a - b);
  const cutoffIndex = Math.floor((1 - confidenceLevel) * sortedReturns.length);
  const tailReturns = sortedReturns.slice(0, cutoffIndex);
  
  return Math.abs(tailReturns.reduce((a, b) => a + b, 0) / tailReturns.length);
}
```

---

## 4. Expected Shortfall (CVaR)

### 4.1 Definition

Expected Shortfall (ES), also known as Conditional VaR (CVaR), measures the expected loss given that the loss exceeds the VaR threshold.

```
ES_α = E[L | L > VaR_α]

Where:
- α is the confidence level (e.g., 0.95)
- L is the loss distribution
- VaR_α is the Value at Risk at level α
```

### 4.2 Calculation Methods

**Historical Method:**
```typescript
function calculateHistoricalES(
  losses: number[],
  confidenceLevel: number = 0.95
): number {
  const sortedLosses = [...losses].sort((a, b) => b - a);
  const threshold = Math.ceil((1 - confidenceLevel) * losses.length);
  const extremeLosses = sortedLosses.slice(0, threshold);
  
  return extremeLosses.reduce((sum, loss) => sum + loss, 0) / extremeLosses.length;
}
```

**Parametric Method:**
```typescript
function calculateParametricES(
  mean: number,
  stdDev: number,
  confidenceLevel: number = 0.95
): number {
  // For normal distribution
  const z = getZScore(confidenceLevel);
  const phi = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z);
  const es = mean + stdDev * (phi / (1 - confidenceLevel));
  
  return es;
}
```

### 4.3 Usage in CITARION

```typescript
// Risk assessment for portfolio
function assessPortfolioRisk(portfolio: Portfolio): RiskAssessment {
  const returns = calculateHistoricalReturns(portfolio);
  
  return {
    var95: calculateHistoricalVaR(returns, 0.95),
    var99: calculateHistoricalVaR(returns, 0.99),
    es95: calculateHistoricalES(returns, 0.95),
    es99: calculateHistoricalES(returns, 0.99),
    maxDrawdown: calculateMaxDrawdown(returns),
    sharpeRatio: calculateSharpeRatio(returns),
  };
}
```

---

## 5. Drawdown Analysis

### 5.1 Maximum Drawdown

Maximum peak-to-trough decline.

```typescript
function calculateMaxDrawdown(equityCurve: number[]): number {
  let maxDrawdown = 0;
  let peak = equityCurve[0];
  
  for (const equity of equityCurve) {
    if (equity > peak) {
      peak = equity;
    }
    
    const drawdown = (peak - equity) / peak;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }
  
  return maxDrawdown;
}

// Example
const equityCurve = [10000, 11000, 10500, 9000, 9500, 10000];
const mdd = calculateMaxDrawdown(equityCurve);
// Peak: 11000, Trough: 9000
// MDD = (11000 - 9000) / 11000 = 18.18%
```

### 5.2 Average Drawdown

Average of all drawdowns over a period.

```typescript
function calculateAverageDrawdown(equityCurve: number[]): number {
  let peak = equityCurve[0];
  const drawdowns: number[] = [];
  
  for (const equity of equityCurve) {
    if (equity > peak) {
      peak = equity;
    }
    drawdowns.push((peak - equity) / peak);
  }
  
  return drawdowns.reduce((a, b) => a + b, 0) / drawdowns.length;
}
```

### 5.3 Drawdown Duration

Time spent in drawdown state.

```typescript
function calculateDrawdownDuration(equityCurve: number[]): {
  currentDuration: number;
  maxDuration: number;
  averageDuration: number;
} {
  let peak = equityCurve[0];
  let peakIndex = 0;
  let currentDuration = 0;
  let maxDuration = 0;
  const durations: number[] = [];
  
  for (let i = 0; i < equityCurve.length; i++) {
    if (equityCurve[i] >= peak) {
      if (currentDuration > 0) {
        durations.push(currentDuration);
        maxDuration = Math.max(maxDuration, currentDuration);
      }
      peak = equityCurve[i];
      peakIndex = i;
      currentDuration = 0;
    } else {
      currentDuration = i - peakIndex;
    }
  }
  
  return {
    currentDuration,
    maxDuration,
    averageDuration: durations.length > 0 
      ? durations.reduce((a, b) => a + b, 0) / durations.length 
      : 0,
  };
}
```

### 5.4 Calmar Ratio

Return divided by maximum drawdown.

```typescript
function calculateCalmarRatio(
  annualReturn: number,
  maxDrawdown: number
): number {
  if (maxDrawdown === 0) return Infinity;
  return annualReturn / maxDrawdown;
}
```

---

## 6. Sharpe & Sortino Ratios

### 6.1 Sharpe Ratio

Risk-adjusted return using standard deviation.

```typescript
function calculateSharpeRatio(
  returns: number[],
  riskFreeRate: number = 0.02 // 2% annual risk-free rate
): number {
  const meanReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const stdDev = calculateStandardDeviation(returns);
  
  // Annualize assuming daily returns
  const annualizedReturn = meanReturn * 252;
  const annualizedStdDev = stdDev * Math.sqrt(252);
  
  return (annualizedReturn - riskFreeRate) / annualizedStdDev;
}

function calculateStandardDeviation(values: number[]): number {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
  return Math.sqrt(variance);
}

// Example
const dailyReturns = [0.01, -0.02, 0.03, 0.01, -0.01, 0.02, -0.005];
const sharpe = calculateSharpeRatio(dailyReturns, 0.02);
// Sharpe ratio interpretation:
// < 1: Sub-par
// 1-2: Good
// 2-3: Excellent
// > 3: Outstanding
```

### 6.2 Sortino Ratio

Risk-adjusted return using downside deviation only.

```typescript
function calculateSortinoRatio(
  returns: number[],
  riskFreeRate: number = 0.02,
  targetReturn: number = 0
): number {
  const meanReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const downsideDev = calculateDownsideDeviation(returns, targetReturn);
  
  // Annualize
  const annualizedReturn = meanReturn * 252;
  const annualizedDownside = downsideDev * Math.sqrt(252);
  
  if (annualizedDownside === 0) return Infinity;
  return (annualizedReturn - riskFreeRate) / annualizedDownside;
}

function calculateDownsideDeviation(
  returns: number[],
  targetReturn: number = 0
): number {
  const downsideReturns = returns
    .filter(r => r < targetReturn)
    .map(r => Math.pow(targetReturn - r, 2));
  
  if (downsideReturns.length === 0) return 0;
  
  return Math.sqrt(
    downsideReturns.reduce((a, b) => a + b, 0) / returns.length
  );
}

// Example
const returns = [0.02, -0.03, 0.01, 0.04, -0.01, 0.02, -0.02];
const sortino = calculateSortinoRatio(returns, 0.02);
// Sortino > Sharpe indicates positive skewness
```

### 6.3 Information Ratio

Excess return over benchmark relative to tracking error.

```typescript
function calculateInformationRatio(
  portfolioReturns: number[],
  benchmarkReturns: number[]
): number {
  const excessReturns = portfolioReturns.map(
    (r, i) => r - benchmarkReturns[i]
  );
  
  const meanExcess = excessReturns.reduce((a, b) => a + b, 0) / excessReturns.length;
  const trackingError = calculateStandardDeviation(excessReturns);
  
  if (trackingError === 0) return Infinity;
  return meanExcess * 252 / (trackingError * Math.sqrt(252));
}
```

---

## 7. Leverage Risk Models

### 7.1 Leverage Calculation

```typescript
function calculateLeverage(
  positionValue: number,
  accountEquity: number
): number {
  return positionValue / accountEquity;
}

function calculateEffectiveLeverage(
  positions: Position[],
  equity: number
): number {
  const totalExposure = positions.reduce(
    (sum, p) => sum + p.size * p.currentPrice,
    0
  );
  return totalExposure / equity;
}
```

### 7.2 Liquidation Price

```typescript
function calculateLiquidationPrice(
  entryPrice: number,
  leverage: number,
  direction: 'LONG' | 'SHORT',
  maintenanceMargin: number = 0.005 // 0.5%
): number {
  if (direction === 'LONG') {
    return entryPrice * (1 - 1 / leverage + maintenanceMargin);
  } else {
    return entryPrice * (1 + 1 / leverage - maintenanceMargin);
  }
}

// Example: Long position, entry $50,000, 10x leverage
const liqPrice = calculateLiquidationPrice(50000, 10, 'LONG');
// Liquidation price = $45,250
```

### 7.3 Margin at Risk

```typescript
function calculateMarginAtRisk(
  position: Position,
  currentPrice: number,
  liquidationPrice: number
): number {
  const priceDiff = Math.abs(currentPrice - liquidationPrice);
  const percentRisk = priceDiff / currentPrice;
  return position.margin * percentRisk;
}
```

### 7.4 Leverage Risk Score

```typescript
function calculateLeverageRiskScore(
  leverage: number,
  volatility: number,
  correlation: number
): number {
  // Risk score from 0-100
  const leverageRisk = Math.min(leverage / 20, 1) * 40;
  const volatilityRisk = Math.min(volatility / 0.05, 1) * 30;
  const correlationRisk = Math.abs(correlation) * 30;
  
  return leverageRisk + volatilityRisk + correlationRisk;
}
```

---

## 8. Correlation Risk

### 8.1 Correlation Matrix

```typescript
function calculateCorrelationMatrix(
  priceSeries: Map<string, number[]>
): Map<string, Map<string, number>> {
  const symbols = Array.from(priceSeries.keys());
  const matrix = new Map<string, Map<string, number>>();
  
  for (const symbol1 of symbols) {
    matrix.set(symbol1, new Map());
    for (const symbol2 of symbols) {
      const correlation = calculateCorrelation(
        priceSeries.get(symbol1)!,
        priceSeries.get(symbol2)!
      );
      matrix.get(symbol1)!.set(symbol2, correlation);
    }
  }
  
  return matrix;
}

function calculateCorrelation(x: number[], y: number[]): number {
  const n = Math.min(x.length, y.length);
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;
  
  let numerator = 0;
  let denomX = 0;
  let denomY = 0;
  
  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    numerator += dx * dy;
    denomX += dx * dx;
    denomY += dy * dy;
  }
  
  return numerator / Math.sqrt(denomX * denomY);
}
```

### 8.2 Portfolio Beta

```typescript
function calculatePortfolioBeta(
  portfolioReturns: number[],
  marketReturns: number[]
): number {
  const covariance = calculateCovariance(portfolioReturns, marketReturns);
  const marketVariance = calculateVariance(marketReturns);
  
  return covariance / marketVariance;
}
```

### 8.3 Diversification Ratio

```typescript
function calculateDiversificationRatio(
  weights: number[],
  volatilities: number[],
  correlationMatrix: number[][]
): number {
  // Weighted average volatility
  const weightedVol = weights.reduce(
    (sum, w, i) => sum + w * volatilities[i],
    0
  );
  
  // Portfolio volatility
  let portfolioVariance = 0;
  for (let i = 0; i < weights.length; i++) {
    for (let j = 0; j < weights.length; j++) {
      portfolioVariance += weights[i] * weights[j] * 
        volatilities[i] * volatilities[j] * correlationMatrix[i][j];
    }
  }
  const portfolioVol = Math.sqrt(portfolioVariance);
  
  return weightedVol / portfolioVol;
}
```

---

## 9. Liquidity Risk

### 9.1 Order Book Depth Analysis

```typescript
interface OrderBookLevel {
  price: number;
  quantity: number;
}

function calculateSlippageRisk(
  orderBook: { bids: OrderBookLevel[]; asks: OrderBookLevel[] },
  orderSize: number,
  side: 'BUY' | 'SELL'
): number {
  const levels = side === 'BUY' ? orderBook.asks : orderBook.bids;
  let remaining = orderSize;
  let totalCost = 0;
  let levelsUsed = 0;
  
  for (const level of levels) {
    if (remaining <= 0) break;
    const fillAmount = Math.min(remaining, level.quantity);
    totalCost += fillAmount * level.price;
    remaining -= fillAmount;
    levelsUsed++;
  }
  
  const avgPrice = totalCost / orderSize;
  const bestPrice = levels[0].price;
  const slippage = Math.abs(avgPrice - bestPrice) / bestPrice;
  
  return slippage;
}
```

### 9.2 Market Impact Model

```typescript
function calculateMarketImpact(
  orderSize: number,
  averageDailyVolume: number,
  volatility: number
): number {
  // Square root model: Impact = σ * sqrt(Q/V)
  // Where: σ = volatility, Q = order size, V = average daily volume
  return volatility * Math.sqrt(orderSize / averageDailyVolume);
}
```

### 9.3 Liquidity Score

```typescript
function calculateLiquidityScore(
  spread: number,
  depth: number,
  volume24h: number
): number {
  // Lower spread = higher liquidity
  const spreadScore = Math.max(0, 100 - spread * 10000);
  
  // Higher depth = higher liquidity
  const depthScore = Math.min(depth / 100000, 1) * 50;
  
  // Higher volume = higher liquidity
  const volumeScore = Math.min(volume24h / 10000000, 1) * 50;
  
  return (spreadScore + depthScore + volumeScore) / 2;
}
```

---

## 10. Implementation Details

### 10.1 Risk Engine Architecture

```typescript
class RiskEngine {
  private positionSizer: PositionSizer;
  private varCalculator: VaRCalculator;
  private drawdownMonitor: DrawdownMonitor;
  
  constructor(config: RiskEngineConfig) {
    this.positionSizer = new PositionSizer(config.sizing);
    this.varCalculator = new VaRCalculator(config.var);
    this.drawdownMonitor = new DrawdownMonitor(config.drawdown);
  }
  
  async assessRisk(context: RiskContext): Promise<RiskAssessment> {
    const positionSize = this.positionSizer.calculate(context);
    const var = await this.varCalculator.calculate(context.portfolio);
    const drawdown = this.drawdownMonitor.getCurrent();
    
    return {
      positionSize,
      var,
      drawdown,
      riskScore: this.calculateRiskScore(var, drawdown),
      recommendation: this.getRecommendation(var, drawdown),
    };
  }
  
  private calculateRiskScore(var: number, drawdown: number): number {
    // Normalize and combine risk metrics
    const varScore = Math.min(var * 10, 50);
    const ddScore = Math.min(drawdown * 100, 50);
    return varScore + ddScore;
  }
  
  private getRecommendation(var: number, drawdown: number): string {
    const score = this.calculateRiskScore(var, drawdown);
    
    if (score < 20) return 'Low risk - Normal trading permitted';
    if (score < 40) return 'Moderate risk - Consider reducing positions';
    if (score < 60) return 'Elevated risk - Reduce exposure recommended';
    if (score < 80) return 'High risk - Close losing positions';
    return 'Critical risk - Reduce all positions immediately';
  }
}
```

### 10.2 Risk Limits Configuration

```typescript
interface RiskLimits {
  // Position limits
  maxPositionSize: number;      // Maximum single position ($)
  maxLeverage: number;          // Maximum leverage (x)
  maxPositionsPerSymbol: number;
  maxTotalPositions: number;
  
  // Portfolio limits
  maxVaR: number;               // Maximum daily VaR (%)
  maxDrawdown: number;          // Maximum drawdown (%)
  maxCorrelation: number;       // Maximum portfolio correlation
  
  // Trading limits
  maxDailyTrades: number;
  maxDailyVolume: number;       // Maximum daily volume ($)
  maxOrderSize: number;         // Maximum single order ($)
  
  // Time limits
  maxHoldingPeriod: number;     // Maximum holding period (hours)
  minTimeBetweenTrades: number; // Minimum time between trades (seconds)
}

const DEFAULT_RISK_LIMITS: RiskLimits = {
  maxPositionSize: 100000,
  maxLeverage: 20,
  maxPositionsPerSymbol: 3,
  maxTotalPositions: 20,
  
  maxVaR: 0.05,          // 5% daily VaR
  maxDrawdown: 0.20,     // 20% max drawdown
  maxCorrelation: 0.7,
  
  maxDailyTrades: 100,
  maxDailyVolume: 1000000,
  maxOrderSize: 50000,
  
  maxHoldingPeriod: 168, // 7 days
  minTimeBetweenTrades: 10,
};
```

### 10.3 Risk Monitoring Service

```typescript
class RiskMonitoringService {
  private alerts: AlertManager;
  private limits: RiskLimits;
  
  async monitorRealTime(): Promise<void> {
    setInterval(async () => {
      const portfolio = await this.getPortfolioState();
      const metrics = this.calculateMetrics(portfolio);
      
      await this.checkLimits(metrics);
      await this.updateDashboards(metrics);
    }, 5000); // Every 5 seconds
  }
  
  private async checkLimits(metrics: RiskMetrics): Promise<void> {
    // VaR check
    if (metrics.var > this.limits.maxVaR) {
      await this.alerts.send({
        level: 'CRITICAL',
        message: `VaR exceeded limit: ${(metrics.var * 100).toFixed(2)}% > ${(this.limits.maxVaR * 100).toFixed(2)}%`,
        action: 'Consider reducing positions',
      });
    }
    
    // Drawdown check
    if (metrics.drawdown > this.limits.maxDrawdown * 0.8) {
      await this.alerts.send({
        level: 'WARNING',
        message: `Drawdown approaching limit: ${(metrics.drawdown * 100).toFixed(2)}%`,
        action: 'Monitor closely',
      });
    }
  }
}
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | March 2026 | CITARION Team | Initial release |

---

*This document is part of the CITARION Documentation Suite.*
