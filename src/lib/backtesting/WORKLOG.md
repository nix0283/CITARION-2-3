# Backtesting Engine Worklog

## 2026-01-XX - Initial Implementation

### Created Files
- `/src/lib/backtesting/types.ts` - Types for backtest config, positions, trades, metrics
- `/src/lib/backtesting/engine.ts` - BacktestEngine class
- `/src/lib/backtesting/index.ts` - Module exports

### Architecture

```
Backtesting Engine
├── types.ts
│   ├── BacktestConfig       - Configuration for backtest run
│   ├── BacktestPosition     - Position tracking during backtest
│   ├── BacktestTrade        - Completed trade record
│   ├── EquityPoint          - Point on equity curve
│   ├── BacktestMetrics      - Performance metrics
│   └── BacktestResult       - Full result with all data
│
└── engine.ts
    └── BacktestEngine
        ├── run()                 - Main execution loop
        ├── updatePositions()     - Update position prices
        ├── checkExitConditions() - Check SL/TP/Trailing
        ├── processEntrySignal()  - Handle strategy signals
        ├── closePosition()       - Close position with reason
        ├── updateEquityCurve()   - Track equity over time
        └── calculateMetrics()    - Compute final metrics
```

### Key Features

1. **Position Management**
   - Multiple entry support (DCA)
   - Partial closes (Multi TP)
   - Leverage and margin tracking
   - Liquidation price calculation

2. **Exit Conditions**
   - Stop Loss (fixed, percent, ATR-based)
   - Take Profit (single, multiple targets)
   - Trailing Stop (percent, ATR-based)
   - Time-based exit
   - Signal-based exit

3. **Metrics Calculated**
   - Win Rate, Profit Factor
   - Sharpe Ratio, Calmar Ratio
   - Max Drawdown
   - Average Trade Duration
   - Win/Loss Streaks

### Integration with Tactics

Backtesting Engine uses Tactics from Strategy Framework:
- Entry tactics determine how positions are opened
- Exit tactics determine SL/TP levels
- Trailing stop is managed by TacticsExecutor

### Example Usage

```typescript
import { BacktestEngine } from '@/lib/backtesting';
import { createDefaultBacktestConfig } from '@/lib/backtesting/types';

const config = createDefaultBacktestConfig(
  'rsi-reversal',
  'BTCUSDT',
  '1h',
  tacticsSet
);

const engine = new BacktestEngine(config);
const result = await engine.run(candles, (progress) => {
  console.log(`Progress: ${progress}%`);
});

console.log('Total PnL:', result.metrics.totalPnl);
console.log('Win Rate:', result.metrics.winRate);
```

### Metrics Detail

| Metric | Description |
|--------|-------------|
| totalTrades | Number of completed trades |
| winRate | Percentage of winning trades |
| profitFactor | Gross profit / Gross loss |
| sharpeRatio | Risk-adjusted return |
| maxDrawdown | Maximum peak-to-trough decline |
| avgTradeDuration | Average time in position |

### Next Steps

- [ ] Add funding rate simulation for futures
- [ ] Implement slippage model
- [ ] Add order book simulation
- [ ] Support for multi-asset backtesting

---

## 2026-03-XX - Complete Documentation

### Documentation Created

All backtesting components now fully documented in:
- /home/z/my-project/docs/backend/STRATEGY_ENGINE_COMPLETE.md

**Backtesting Section includes:**

1. **Backtest Configuration**
   - Data settings (symbol, timeframe, dates, balance)
   - Strategy settings (ID, parameters, tactics)
   - Trading settings (fees, slippage, leverage, margin mode)
   - Risk management (max risk, max drawdown, max positions)

2. **Backtest Result**
   - Status tracking (PENDING, RUNNING, COMPLETED, FAILED)
   - All trades with detailed execution info
   - Equity curve with timestamps
   - Comprehensive metrics (35+ fields)
   - Progress and error logging

3. **Backtest Metrics** (35+ metrics)
   - Basic Stats: trades, wins, losses, win rate
   - PnL: total, percent, averages, extremes
   - Ratios: profit factor, risk/reward, Sharpe, Sortino, Calmar
   - Drawdown: max, avg, time in drawdown
   - Duration: avg trade, win, loss durations
   - Streaks: current, max win streak, max loss streak
   - Returns: daily, weekly, monthly, annualized
   - Exposure: market exposure, position size, leverage
   - Risk: VaR 95, Expected Shortfall 95

4. **Walk-Forward Validation**
   - Train/test period splitting
   - Multiple segment handling
   - Robustness scoring (0-1 scale)
   - Performance degradation tracking
   - Out-of-sample validation

5. **Monte Carlo Simulation**
   - 1000+ iterations by default
   - Seeded random for reproducibility
   - Percentile analysis (5, 25, 50, 75, 95)
   - Ruin probability calculation
   - Target probability calculation

6. **Sensitivity Analysis**
   - Parameter impact scoring (0-100)
   - Stability classification (STABLE, MODERATE, SENSITIVE, HIGHLY_SENSITIVE)
   - Optimal value identification
   - Parameter interaction detection

7. **Commission Calculator**
   - Support for 7 exchanges
   - VIP tier handling
   - Maker/taker fees
   - Native token discounts
   - 30-day volume tracking

**Files Documented:**
- engine.ts (~810 lines)
- types.ts (~530 lines)
- walk-forward.ts (~779 lines)
- monte-carlo.ts (~277 lines)
- sensitivity.ts (~347 lines)
- commission.ts (~252 lines)
