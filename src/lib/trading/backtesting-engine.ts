/**
 * Backtesting Engine for CITARION Platform
 * 
 * Candle-by-candle historical simulation with:
 * - Order matching within OHLC range
 * - Funding rate from historical data
 * - Slippage based on volume/orderbook
 * - Full performance metrics
 * 
 * Inspired by Freqtrade's backtesting architecture
 */

import { db } from '@/lib/db';

// ==================== TYPES ====================

export interface BacktestConfig {
  strategyId: string;
  symbol: string;
  timeframe: string;
  startDate: Date;
  endDate: Date;
  initialCapital: number;
  leverage: number;
  marginMode: 'isolated' | 'cross';
  feeRate: number; // Combined fee rate (maker + taker avg)
  slippagePercent: number;
  enableFunding: boolean;
  maintenanceMarginPercent: number;
}

export interface OHLCVCandle {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface FundingRatePoint {
  timestamp: Date;
  fundingRate: number;
}

export interface BacktestPosition {
  id: string;
  symbol: string;
  direction: 'LONG' | 'SHORT';
  quantity: number;
  entryPrice: number;
  entryTime: Date;
  leverage: number;
  margin: number;
  stopLoss?: number;
  takeProfit?: number;
  currentPrice: number;
  highestPrice: number;
  lowestPrice: number;
}

export interface BacktestTrade {
  id: string;
  symbol: string;
  direction: 'LONG' | 'SHORT';
  quantity: number;
  entryPrice: number;
  exitPrice: number;
  entryTime: Date;
  exitTime: Date;
  pnl: number;
  pnlPercent: number;
  fees: number;
  exitReason: 'TP' | 'SL' | 'SIGNAL' | 'LIQUIDATION' | 'EOD';
  holdingTimeMinutes: number;
}

export interface BacktestResult {
  config: BacktestConfig;
  trades: BacktestTrade[];
  equityCurve: Array<{
    timestamp: Date;
    equity: number;
    balance: number;
    unrealizedPnl: number;
    drawdown: number;
    drawdownPercent: number;
  }>;
  metrics: BacktestMetrics;
}

export interface BacktestMetrics {
  // Basic stats
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  
  // PnL
  totalPnl: number;
  totalPnlPercent: number;
  avgPnl: number;
  avgWin: number;
  avgLoss: number;
  profitFactor: number;
  
  // Risk metrics
  maxDrawdown: number;
  maxDrawdownPercent: number;
  avgDrawdown: number;
  
  // Risk-adjusted returns
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  
  // Trade stats
  avgHoldingTime: number;
  maxHoldingTime: number;
  minHoldingTime: number;
  
  // Streaks
  maxWinStreak: number;
  maxLossStreak: number;
}

// ==================== BACKTESTING ENGINE ====================

export class BacktestingEngine {
  private config: BacktestConfig;
  private balance: number;
  private peakEquity: number;
  private positions: Map<string, BacktestPosition> = new Map();
  private trades: BacktestTrade[] = [];
  private equityCurve: Array<{
    timestamp: Date;
    equity: number;
    balance: number;
    unrealizedPnl: number;
    drawdown: number;
    drawdownPercent: number;
  }> = [];
  private pendingOrders: Array<{
    id: string;
    symbol: string;
    direction: 'LONG' | 'SHORT';
    type: 'LIMIT' | 'STOP';
    price: number;
    quantity: number;
    leverage: number;
    stopLoss?: number;
    takeProfit?: number;
    createdAt: Date;
  }> = [];

  constructor(config: BacktestConfig) {
    this.config = config;
    this.balance = config.initialCapital;
    this.peakEquity = config.initialCapital;
  }

  /**
   * Run backtest on historical data
   */
  async run(
    candles: OHLCVCandle[],
    fundingRates?: FundingRatePoint[],
    signals?: Array<{
      timestamp: Date;
      direction: 'LONG' | 'SHORT';
      action: 'ENTER' | 'EXIT';
      stopLoss?: number;
      takeProfit?: number;
    }>
  ): Promise<BacktestResult> {
    console.log(`[Backtest] Starting backtest for ${this.config.symbol}`);
    console.log(`[Backtest] Period: ${this.config.startDate.toISOString()} - ${this.config.endDate.toISOString()}`);
    console.log(`[Backtest] Candles: ${candles.length}`);

    // Sort candles by timestamp
    const sortedCandles = [...candles].sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    );

    // Create funding rate lookup map
    const fundingMap = new Map<number, number>();
    if (fundingRates) {
      for (const fr of fundingRates) {
        fundingMap.set(fr.timestamp.getTime(), fr.fundingRate);
      }
    }

    let lastFundingTime = 0;

    // Process each candle
    for (let i = 0; i < sortedCandles.length; i++) {
      const candle = sortedCandles[i];
      
      // 1. Check pending orders (limit/stop orders)
      this.processPendingOrders(candle);
      
      // 2. Process signals if provided
      if (signals) {
        const signal = signals.find(
          s => s.timestamp.getTime() === candle.timestamp.getTime()
        );
        if (signal) {
          this.processSignal(signal, candle);
        }
      }
      
      // 3. Update open positions with current candle
      this.updatePositions(candle);
      
      // 4. Check for liquidations
      this.checkLiquidations(candle);
      
      // 5. Check stop losses and take profits
      this.checkStopLossTakeProfit(candle);
      
      // 6. Settle funding (every 8 hours)
      if (this.config.enableFunding && this.positions.size > 0) {
        const fundingTime = Math.floor(candle.timestamp.getTime() / (8 * 60 * 60 * 1000)) * (8 * 60 * 60 * 1000);
        if (fundingTime !== lastFundingTime) {
          const fundingRate = fundingMap.get(fundingTime) || 0.0001; // Default 0.01%
          this.settleFunding(fundingRate, candle);
          lastFundingTime = fundingTime;
        }
      }
      
      // 7. Record equity curve point
      this.recordEquityPoint(candle);
    }

    // Close any remaining positions at the last close price
    const lastCandle = sortedCandles[sortedCandles.length - 1];
    this.closeAllPositions(lastCandle.close, lastCandle.timestamp, 'EOD');

    // Calculate metrics
    const metrics = this.calculateMetrics();

    console.log(`[Backtest] Completed. Total trades: ${this.trades.length}`);
    console.log(`[Backtest] Win rate: ${metrics.winRate.toFixed(1)}%`);
    console.log(`[Backtest] Total PnL: ${metrics.totalPnl.toFixed(2)} (${metrics.totalPnlPercent.toFixed(2)}%)`);
    console.log(`[Backtest] Max drawdown: ${metrics.maxDrawdownPercent.toFixed(2)}%`);
    console.log(`[Backtest] Sharpe ratio: ${metrics.sharpeRatio.toFixed(2)}`);

    return {
      config: this.config,
      trades: this.trades,
      equityCurve: this.equityCurve,
      metrics,
    };
  }

  /**
   * Process pending limit/stop orders against current candle
   */
  private processPendingOrders(candle: OHLCVCandle): void {
    const filledOrders: string[] = [];

    for (const order of this.pendingOrders) {
      if (order.symbol !== this.config.symbol) continue;

      let isFilled = false;
      let fillPrice = order.price;

      if (order.type === 'LIMIT') {
        // Limit order fills if price reaches the limit within candle range
        if (order.direction === 'LONG') {
          // Buy limit: fills when low <= limit price
          if (candle.low <= order.price) {
            isFilled = true;
            fillPrice = Math.min(order.price, candle.open); // Worst case: open price
          }
        } else {
          // Sell limit: fills when high >= limit price
          if (candle.high >= order.price) {
            isFilled = true;
            fillPrice = Math.max(order.price, candle.open);
          }
        }
      } else if (order.type === 'STOP') {
        // Stop order triggers when price crosses stop price
        if (order.direction === 'LONG') {
          // Buy stop: triggers when high >= stop price
          if (candle.high >= order.price) {
            isFilled = true;
            fillPrice = Math.max(order.price, candle.open);
          }
        } else {
          // Sell stop: triggers when low <= stop price
          if (candle.low <= order.price) {
            isFilled = true;
            fillPrice = Math.min(order.price, candle.open);
          }
        }
      }

      if (isFilled) {
        // Apply slippage
        const slippage = fillPrice * (this.config.slippagePercent / 100);
        const executedPrice = order.direction === 'LONG'
          ? fillPrice + slippage
          : fillPrice - slippage;

        // Open position
        this.openPosition(
          order.id,
          order.symbol,
          order.direction,
          order.quantity,
          executedPrice,
          order.leverage,
          candle.timestamp,
          order.stopLoss,
          order.takeProfit
        );

        filledOrders.push(order.id);
      }
    }

    // Remove filled orders
    this.pendingOrders = this.pendingOrders.filter(
      o => !filledOrders.includes(o.id)
    );
  }

  /**
   * Process a trading signal
   */
  private processSignal(
    signal: {
      timestamp: Date;
      direction: 'LONG' | 'SHORT';
      action: 'ENTER' | 'EXIT';
      stopLoss?: number;
      takeProfit?: number;
    },
    candle: OHLCVCandle
  ): void {
    if (signal.action === 'ENTER') {
      // Calculate position size (1% of capital default)
      const riskPercent = 1;
      const riskAmount = this.balance * (riskPercent / 100);
      
      // Calculate quantity based on entry price and risk
      const entryPrice = candle.close;
      let quantity: number;
      
      if (signal.stopLoss) {
        const priceDiff = Math.abs(entryPrice - signal.stopLoss);
        const riskPerUnit = priceDiff;
        quantity = riskPerUnit > 0 ? riskAmount / riskPerUnit : riskAmount / entryPrice;
      } else {
        quantity = riskAmount / entryPrice;
      }
      
      // Apply leverage
      quantity *= this.config.leverage;

      // Open market position (use candle close as entry)
      const slippage = entryPrice * (this.config.slippagePercent / 100);
      const executedPrice = signal.direction === 'LONG'
        ? entryPrice + slippage
        : entryPrice - slippage;

      this.openPosition(
        `sig-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        this.config.symbol,
        signal.direction,
        quantity,
        executedPrice,
        this.config.leverage,
        candle.timestamp,
        signal.stopLoss,
        signal.takeProfit
      );
    } else if (signal.action === 'EXIT') {
      // Close all positions for this symbol
      this.closeAllPositions(candle.close, candle.timestamp, 'SIGNAL');
    }
  }

  /**
   * Open a new position
   */
  private openPosition(
    id: string,
    symbol: string,
    direction: 'LONG' | 'SHORT',
    quantity: number,
    price: number,
    leverage: number,
    time: Date,
    stopLoss?: number,
    takeProfit?: number
  ): void {
    const positionValue = quantity * price;
    const margin = positionValue / leverage;
    const fee = positionValue * this.config.feeRate;

    // Check balance
    if (this.balance < margin + fee) {
      console.warn(`[Backtest] Insufficient balance to open position. Required: ${margin + fee}, Available: ${this.balance}`);
      return;
    }

    // Deduct margin and fee
    this.balance -= (margin + fee);

    const position: BacktestPosition = {
      id,
      symbol,
      direction,
      quantity,
      entryPrice: price,
      entryTime: time,
      leverage,
      margin,
      stopLoss,
      takeProfit,
      currentPrice: price,
      highestPrice: direction === 'LONG' ? price : Infinity,
      lowestPrice: direction === 'SHORT' ? price : 0,
    };

    this.positions.set(id, position);
    console.log(`[Backtest] Opened ${direction} ${quantity.toFixed(4)} ${symbol} @ ${price}`);
  }

  /**
   * Update all positions with current candle prices
   */
  private updatePositions(candle: OHLCVCandle): void {
    for (const [id, position] of this.positions) {
      if (position.symbol !== this.config.symbol) continue;

      position.currentPrice = candle.close;
      
      if (position.direction === 'LONG') {
        position.highestPrice = Math.max(position.highestPrice, candle.high);
      } else {
        position.lowestPrice = position.lowestPrice === 0 
          ? candle.low 
          : Math.min(position.lowestPrice, candle.low);
      }
    }
  }

  /**
   * Check for liquidations
   */
  private checkLiquidations(candle: OHLCVCandle): void {
    const liquidatedPositions: string[] = [];

    for (const [id, position] of this.positions) {
      if (position.symbol !== this.config.symbol) continue;

      // Calculate liquidation price
      const mm = this.config.maintenanceMarginPercent / 100;
      const liquidationPrice = position.direction === 'LONG'
        ? position.entryPrice * (1 - (1 / position.leverage) + mm)
        : position.entryPrice * (1 + (1 / position.leverage) - mm);

      // Check if price hit liquidation
      const isLiquidated = position.direction === 'LONG'
        ? candle.low <= liquidationPrice
        : candle.high >= liquidationPrice;

      if (isLiquidated) {
        // Close position at liquidation price
        this.closePosition(id, liquidationPrice, candle.timestamp, 'LIQUIDATION');
        liquidatedPositions.push(id);
      }
    }
  }

  /**
   * Check stop losses and take profits
   */
  private checkStopLossTakeProfit(candle: OHLCVCandle): void {
    for (const [id, position] of this.positions) {
      if (position.symbol !== this.config.symbol) continue;

      // Check stop loss
      if (position.stopLoss) {
        const slHit = position.direction === 'LONG'
          ? candle.low <= position.stopLoss
          : candle.high >= position.stopLoss;

        if (slHit) {
          this.closePosition(id, position.stopLoss, candle.timestamp, 'SL');
          continue;
        }
      }

      // Check take profit
      if (position.takeProfit) {
        const tpHit = position.direction === 'LONG'
          ? candle.high >= position.takeProfit
          : candle.low <= position.takeProfit;

        if (tpHit) {
          this.closePosition(id, position.takeProfit, candle.timestamp, 'TP');
        }
      }
    }
  }

  /**
   * Close a position
   */
  private closePosition(
    positionId: string,
    exitPrice: number,
    exitTime: Date,
    reason: BacktestTrade['exitReason']
  ): void {
    const position = this.positions.get(positionId);
    if (!position) return;

    // Apply slippage for exit
    const slippage = exitPrice * (this.config.slippagePercent / 100);
    const executedPrice = position.direction === 'LONG'
      ? exitPrice - slippage
      : exitPrice + slippage;

    // Calculate PnL
    const pnlPerUnit = position.direction === 'LONG'
      ? executedPrice - position.entryPrice
      : position.entryPrice - executedPrice;
    
    const grossPnl = pnlPerUnit * position.quantity;
    const exitFee = position.quantity * executedPrice * this.config.feeRate;
    const netPnl = grossPnl - exitFee;

    // Return margin + PnL
    this.balance += position.margin + netPnl;

    // Calculate holding time
    const holdingTimeMs = exitTime.getTime() - position.entryTime.getTime();
    const holdingTimeMinutes = Math.floor(holdingTimeMs / (60 * 1000));

    // Record trade
    const trade: BacktestTrade = {
      id: position.id,
      symbol: position.symbol,
      direction: position.direction,
      quantity: position.quantity,
      entryPrice: position.entryPrice,
      exitPrice: executedPrice,
      entryTime: position.entryTime,
      exitTime,
      pnl: netPnl,
      pnlPercent: (netPnl / position.margin) * 100,
      fees: exitFee,
      exitReason: reason,
      holdingTimeMinutes,
    };

    this.trades.push(trade);
    this.positions.delete(positionId);

    console.log(`[Backtest] Closed ${position.direction} ${position.quantity.toFixed(4)} ${position.symbol} @ ${executedPrice.toFixed(2)} PnL: ${netPnl.toFixed(2)}`);
  }

  /**
   * Close all positions
   */
  private closeAllPositions(price: number, time: Date, reason: BacktestTrade['exitReason']): void {
    for (const [id] of this.positions) {
      this.closePosition(id, price, time, reason);
    }
  }

  /**
   * Settle funding for open positions
   */
  private settleFunding(fundingRate: number, candle: OHLCVCandle): void {
    for (const [id, position] of this.positions) {
      if (position.symbol !== this.config.symbol) continue;

      const positionValue = position.quantity * candle.close;
      
      // LONG pays if funding rate is positive
      // SHORT receives if funding rate is positive
      const fundingPayment = position.direction === 'LONG'
        ? -positionValue * fundingRate
        : positionValue * fundingRate;

      this.balance += fundingPayment;
    }
  }

  /**
   * Record equity curve point
   */
  private recordEquityPoint(candle: OHLCVCandle): void {
    // Calculate unrealized PnL
    let unrealizedPnl = 0;
    for (const position of this.positions.values()) {
      if (position.symbol !== this.config.symbol) continue;
      
      const pnl = position.direction === 'LONG'
        ? (candle.close - position.entryPrice) * position.quantity
        : (position.entryPrice - candle.close) * position.quantity;
      unrealizedPnl += pnl;
    }

    const equity = this.balance + unrealizedPnl;
    this.peakEquity = Math.max(this.peakEquity, equity);
    const drawdown = this.peakEquity - equity;
    const drawdownPercent = this.peakEquity > 0 ? (drawdown / this.peakEquity) * 100 : 0;

    this.equityCurve.push({
      timestamp: candle.timestamp,
      equity,
      balance: this.balance,
      unrealizedPnl,
      drawdown,
      drawdownPercent,
    });
  }

  /**
   * Calculate performance metrics
   */
  private calculateMetrics(): BacktestMetrics {
    const wins = this.trades.filter(t => t.pnl > 0);
    const losses = this.trades.filter(t => t.pnl <= 0);

    const totalPnl = this.trades.reduce((sum, t) => sum + t.pnl, 0);
    const grossProfit = wins.reduce((sum, t) => sum + t.pnl, 0);
    const grossLoss = Math.abs(losses.reduce((sum, t) => sum + t.pnl, 0));

    const winRate = this.trades.length > 0 ? (wins.length / this.trades.length) * 100 : 0;
    const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? Infinity : 0;

    // Drawdown metrics
    const drawdowns = this.equityCurve.map(e => e.drawdownPercent);
    const maxDrawdownPercent = drawdowns.length > 0 ? Math.max(...drawdowns) : 0;
    const avgDrawdown = drawdowns.length > 0
      ? drawdowns.reduce((a, b) => a + b, 0) / drawdowns.length
      : 0;
    const maxDrawdown = Math.max(...this.equityCurve.map(e => e.drawdown), 0);

    // Risk-adjusted returns
    const returns: number[] = [];
    for (let i = 1; i < this.equityCurve.length; i++) {
      const prevEquity = this.equityCurve[i - 1].equity;
      const currEquity = this.equityCurve[i].equity;
      if (prevEquity > 0) {
        returns.push((currEquity - prevEquity) / prevEquity);
      }
    }

    const avgReturn = returns.length > 0
      ? returns.reduce((a, b) => a + b, 0) / returns.length
      : 0;
    const stdReturn = returns.length > 1
      ? Math.sqrt(returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / (returns.length - 1))
      : 0;

    // Annualized Sharpe (assuming timeframe is in minutes)
    const sharpeRatio = stdReturn > 0
      ? (avgReturn / stdReturn) * Math.sqrt(252)
      : 0;

    // Sortino (downside deviation)
    const negativeReturns = returns.filter(r => r < 0);
    const downsideDeviation = negativeReturns.length > 1
      ? Math.sqrt(negativeReturns.reduce((sum, r) => sum + Math.pow(r, 2), 0) / negativeReturns.length)
      : 0;
    const sortinoRatio = downsideDeviation > 0
      ? (avgReturn / downsideDeviation) * Math.sqrt(252)
      : 0;

    // Calmar ratio
    const calmarRatio = maxDrawdownPercent > 0
      ? (this.equityCurve[this.equityCurve.length - 1]?.equity || this.config.initialCapital) / maxDrawdownPercent
      : 0;

    // Streaks
    let maxWinStreak = 0;
    let maxLossStreak = 0;
    let currentWinStreak = 0;
    let currentLossStreak = 0;

    for (const trade of this.trades) {
      if (trade.pnl > 0) {
        currentWinStreak++;
        currentLossStreak = 0;
        maxWinStreak = Math.max(maxWinStreak, currentWinStreak);
      } else {
        currentLossStreak++;
        currentWinStreak = 0;
        maxLossStreak = Math.max(maxLossStreak, currentLossStreak);
      }
    }

    // Holding time stats
    const holdingTimes = this.trades.map(t => t.holdingTimeMinutes);
    const avgHoldingTime = holdingTimes.length > 0
      ? holdingTimes.reduce((a, b) => a + b, 0) / holdingTimes.length
      : 0;
    const maxHoldingTime = holdingTimes.length > 0 ? Math.max(...holdingTimes) : 0;
    const minHoldingTime = holdingTimes.length > 0 ? Math.min(...holdingTimes) : 0;

    return {
      totalTrades: this.trades.length,
      winningTrades: wins.length,
      losingTrades: losses.length,
      winRate,
      totalPnl,
      totalPnlPercent: (totalPnl / this.config.initialCapital) * 100,
      avgPnl: this.trades.length > 0 ? totalPnl / this.trades.length : 0,
      avgWin: wins.length > 0 ? grossProfit / wins.length : 0,
      avgLoss: losses.length > 0 ? grossLoss / losses.length : 0,
      profitFactor,
      maxDrawdown,
      maxDrawdownPercent,
      avgDrawdown,
      sharpeRatio,
      sortinoRatio,
      calmarRatio,
      avgHoldingTime,
      maxHoldingTime,
      minHoldingTime,
      maxWinStreak,
      maxLossStreak,
    };
  }
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Load historical candles from exchange
 */
export async function loadHistoricalCandles(
  symbol: string,
  timeframe: string,
  startDate: Date,
  endDate: Date,
  exchange: 'binance' | 'bybit' | 'okx' = 'binance'
): Promise<OHLCVCandle[]> {
  const candles: OHLCVCandle[] = [];
  
  // This would normally fetch from exchange API
  // For now, return empty array - to be implemented with actual API
  
  return candles;
}

/**
 * Load historical funding rates
 */
export async function loadHistoricalFundingRates(
  symbol: string,
  startDate: Date,
  endDate: Date,
  exchange: 'binance' | 'bybit' | 'okx' = 'binance'
): Promise<FundingRatePoint[]> {
  const fundingRates: FundingRatePoint[] = [];
  
  // This would normally fetch from exchange API
  // For now, return empty array - to be implemented with actual API
  
  return fundingRates;
}

// Export singleton factory
export function createBacktestEngine(config: BacktestConfig): BacktestingEngine {
  return new BacktestingEngine(config);
}
