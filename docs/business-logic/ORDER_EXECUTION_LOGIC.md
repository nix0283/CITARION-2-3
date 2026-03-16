# CITARION Order Execution Logic

**Version:** 1.0
**Last Updated:** March 2026
**Status:** Production Ready

---

## Table of Contents

1. [Overview](#1-overview)
2. [Order Types](#2-order-types)
3. [Order Lifecycle](#3-order-lifecycle)
4. [Execution Engine](#4-execution-engine)
5. [Position Management](#5-position-management)
6. [Risk Checks](#6-risk-checks)
7. [Error Handling](#7-error-handling)
8. [Execution Algorithms](#8-execution-algorithms)
9. [Order Routing](#9-order-routing)
10. [Performance Metrics](#10-performance-metrics)

---

## 1. Overview

### 1.1 Purpose

This document describes the order execution logic in CITARION, including order types, lifecycle, execution algorithms, and risk management.

### 1.2 Execution Flow

```
Signal → Risk Check → Order Creation → Validation → Routing → 
Exchange Execution → Monitoring → Position Update → Notification
```

### 1.3 Key Components

| Component | Responsibility |
|-----------|----------------|
| Order Manager | Order creation and tracking |
| Risk Engine | Pre-trade risk checks |
| Execution Engine | Order execution |
| Position Manager | Position tracking |
| Notification Service | User notifications |

---

## 2. Order Types

### 2.1 Supported Order Types

| Type | Description | Use Case |
|------|-------------|----------|
| MARKET | Execute at best available price | Immediate execution |
| LIMIT | Execute at specified price or better | Precise entry/exit |
| STOP_MARKET | Trigger market order at price | Stop loss |
| STOP_LIMIT | Trigger limit order at price | Stop entry |
| TAKE_PROFIT_MARKET | Market order at TP price | Take profit |
| TAKE_PROFIT_LIMIT | Limit order at TP price | Take profit |
| TRAILING_STOP | Dynamic stop loss | Lock profits |

### 2.2 Order Type Definitions

```typescript
enum OrderType {
  MARKET = 'MARKET',
  LIMIT = 'LIMIT',
  STOP_MARKET = 'STOP_MARKET',
  STOP_LIMIT = 'STOP_LIMIT',
  TAKE_PROFIT_MARKET = 'TAKE_PROFIT_MARKET',
  TAKE_PROFIT_LIMIT = 'TAKE_PROFIT_LIMIT',
  TRAILING_STOP = 'TRAILING_STOP',
}

enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

enum OrderStatus {
  NEW = 'NEW',
  PARTIALLY_FILLED = 'PARTIALLY_FILLED',
  FILLED = 'FILLED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}
```

### 2.3 Order Structure

```typescript
interface Order {
  id: string;
  userId: string;
  accountId: string;
  symbol: string;
  exchange: string;
  
  // Order details
  side: OrderSide;
  type: OrderType;
  status: OrderStatus;
  
  // Quantities
  quantity: number;
  filledQuantity: number;
  remainingQuantity: number;
  
  // Prices
  price?: number;              // For limit orders
  stopPrice?: number;          // For stop orders
  avgFillPrice: number;
  
  // Execution
  timeInForce: TimeInForce;
  createdAt: Date;
  updatedAt: Date;
  
  // Risk management
  stopLoss?: number;
  takeProfit?: number;
  
  // Metadata
  clientOrderId?: string;
  exchangeOrderId?: string;
  positionId?: string;
  signalId?: string;
  botId?: string;
  
  // Fees
  commission: number;
  commissionAsset: string;
}
```

### 2.4 Time in Force

| TIF | Description |
|-----|-------------|
| GTC | Good Till Cancelled - Order remains until filled or cancelled |
| IOC | Immediate or Cancel - Fill immediately, cancel remainder |
| FOK | Fill or Kill - Fill entirely or cancel |
| GTX | Good Till Crossing - Post-only order |

---

## 3. Order Lifecycle

### 3.1 Lifecycle States

```
CREATED → VALIDATED → RISK_CHECKED → SUBMITTED → 
NEW → PARTIALLY_FILLED → FILLED → COMPLETED

Alternative paths:
CREATED → REJECTED
SUBMITTED → FAILED
NEW → CANCELLED
NEW → EXPIRED
```

### 3.2 State Transitions

```typescript
const ORDER_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  NEW: ['PARTIALLY_FILLED', 'FILLED', 'CANCELLED', 'EXPIRED', 'REJECTED'],
  PARTIALLY_FILLED: ['FILLED', 'CANCELLED'],
  FILLED: [],
  CANCELLED: [],
  REJECTED: [],
  EXPIRED: [],
};
```

### 3.3 Lifecycle Events

```typescript
interface OrderEvent {
  orderId: string;
  eventType: OrderEventType;
  timestamp: Date;
  data: any;
}

enum OrderEventType {
  CREATED = 'CREATED',
  VALIDATED = 'VALIDATED',
  RISK_PASSED = 'RISK_PASSED',
  RISK_FAILED = 'RISK_FAILED',
  SUBMITTED = 'SUBMITTED',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  FILLED = 'FILLED',
  PARTIALLY_FILLED = 'PARTIALLY_FILLED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  FAILED = 'FAILED',
}
```

### 3.4 Lifecycle Manager

```typescript
class OrderLifecycleManager {
  private transitions: Map<string, OrderEvent[]> = new Map();
  
  async transition(
    order: Order,
    newStatus: OrderStatus,
    eventData?: any
  ): Promise<Order> {
    // Validate transition
    if (!this.isValidTransition(order.status, newStatus)) {
      throw new InvalidTransitionError(order.status, newStatus);
    }
    
    // Update order
    order.status = newStatus;
    order.updatedAt = new Date();
    
    // Record event
    await this.recordEvent(order.id, newStatus, eventData);
    
    // Save to database
    await this.orderRepository.update(order);
    
    // Emit event
    await this.eventBus.emit('order:updated', order);
    
    return order;
  }
  
  private isValidTransition(from: OrderStatus, to: OrderStatus): boolean {
    return ORDER_TRANSITIONS[from]?.includes(to) ?? false;
  }
}
```

---

## 4. Execution Engine

### 4.1 Architecture

```typescript
class ExecutionEngine {
  private orderManager: OrderManager;
  private riskEngine: RiskEngine;
  private exchangeRouter: ExchangeRouter;
  private positionManager: PositionManager;
  
  async execute(signal: Signal, config: ExecutionConfig): Promise<ExecutionResult> {
    // 1. Create order from signal
    const order = await this.orderManager.createFromSignal(signal, config);
    
    // 2. Risk checks
    const riskResult = await this.riskEngine.check(order, config);
    if (!riskResult.passed) {
      return { success: false, reason: riskResult.reason };
    }
    
    // 3. Submit to exchange
    const result = await this.exchangeRouter.submit(order);
    
    // 4. Update position
    await this.positionManager.updateFromOrder(order, result);
    
    // 5. Setup TP/SL
    await this.setupRiskOrders(order, config);
    
    return { success: true, order, result };
  }
}
```

### 4.2 Order Creation

```typescript
class OrderManager {
  async createFromSignal(
    signal: Signal,
    config: ExecutionConfig
  ): Promise<Order> {
    const order = Order.create({
      userId: signal.userId,
      accountId: config.accountId,
      symbol: signal.symbol,
      exchange: config.exchange,
      side: signal.direction === 'LONG' ? 'BUY' : 'SELL',
      type: config.orderType || 'MARKET',
      quantity: this.calculateQuantity(signal, config),
      price: signal.entryPrice,
      stopLoss: signal.stopLoss,
      takeProfit: signal.takeProfits?.[0]?.price,
      timeInForce: config.timeInForce || 'GTC',
      signalId: signal.id,
      botId: config.botId,
    });
    
    await this.validate(order);
    return order;
  }
  
  private calculateQuantity(signal: Signal, config: ExecutionConfig): number {
    switch (config.amountType) {
      case 'FIXED':
        return config.fixedAmount / signal.entryPrice;
      case 'PERCENTAGE':
        return (config.balance * config.percentage / 100) / signal.entryPrice;
      case 'RISK':
        return this.calculateRiskBasedQuantity(signal, config);
      default:
        return config.defaultQuantity;
    }
  }
  
  private calculateRiskBasedQuantity(signal: Signal, config: ExecutionConfig): number {
    const riskAmount = config.balance * (config.riskPercent / 100);
    const stopDistance = Math.abs(signal.entryPrice - signal.stopLoss);
    return riskAmount / stopDistance;
  }
}
```

### 4.3 Order Validation

```typescript
class OrderValidator {
  async validate(order: Order): Promise<ValidationResult> {
    const errors: string[] = [];
    
    // Symbol validation
    if (!await this.isValidSymbol(order.symbol, order.exchange)) {
      errors.push(`Invalid symbol: ${order.symbol}`);
    }
    
    // Quantity validation
    if (order.quantity <= 0) {
      errors.push('Quantity must be positive');
    }
    
    // Price validation for limit orders
    if (order.type === 'LIMIT' && (!order.price || order.price <= 0)) {
      errors.push('Limit orders require a valid price');
    }
    
    // Exchange limits
    const limits = await this.getExchangeLimits(order.symbol, order.exchange);
    if (order.quantity < limits.minQty) {
      errors.push(`Quantity below minimum: ${limits.minQty}`);
    }
    if (order.quantity > limits.maxQty) {
      errors.push(`Quantity above maximum: ${limits.maxQty}`);
    }
    
    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
```

---

## 5. Position Management

### 5.1 Position Structure

```typescript
interface Position {
  id: string;
  userId: string;
  accountId: string;
  symbol: string;
  exchange: string;
  
  direction: 'LONG' | 'SHORT';
  status: 'OPEN' | 'CLOSED' | 'LIQUIDATED';
  
  totalAmount: number;
  filledAmount: number;
  avgEntryPrice: number;
  currentPrice: number;
  leverage: number;
  
  unrealizedPnl: number;
  realizedPnl: number;
  
  stopLoss?: number;
  takeProfit?: number;
  trailingStop?: TrailingStopConfig;
  
  openedAt: Date;
  closedAt?: Date;
  closeReason?: string;
  
  signalId?: string;
  botId?: string;
}
```

### 5.2 Position Operations

```typescript
class PositionManager {
  async openPosition(order: Order, result: ExecutionResult): Promise<Position> {
    const position = Position.create({
      userId: order.userId,
      accountId: order.accountId,
      symbol: order.symbol,
      exchange: order.exchange,
      direction: order.side === 'BUY' ? 'LONG' : 'SHORT',
      totalAmount: result.filledQuantity,
      filledAmount: result.filledQuantity,
      avgEntryPrice: result.avgPrice,
      leverage: order.leverage,
      stopLoss: order.stopLoss,
      takeProfit: order.takeProfit,
      openedAt: new Date(),
      signalId: order.signalId,
      botId: order.botId,
    });
    
    await this.positionRepository.save(position);
    await this.setupPositionMonitoring(position);
    
    return position;
  }
  
  async closePosition(
    position: Position,
    reason: CloseReason,
    price?: number
  ): Promise<Position> {
    const closePrice = price || await this.getCurrentPrice(position);
    
    position.realizedPnl = this.calculateRealizedPnl(position, closePrice);
    position.status = 'CLOSED';
    position.closedAt = new Date();
    position.closeReason = reason;
    
    await this.positionRepository.update(position);
    await this.cancelPendingOrders(position);
    await this.notifyPositionClosed(position);
    
    return position;
  }
  
  async updatePosition(
    position: Position,
    additionalAmount: number,
    avgPrice: number
  ): Promise<Position> {
    const totalValue = (position.totalAmount * position.avgEntryPrice) + 
                       (additionalAmount * avgPrice);
    const newTotalAmount = position.totalAmount + additionalAmount;
    
    position.totalAmount = newTotalAmount;
    position.filledAmount = newTotalAmount;
    position.avgEntryPrice = totalValue / newTotalAmount;
    
    await this.positionRepository.update(position);
    return position;
  }
}
```

### 5.3 PnL Calculation

```typescript
class PnLCalculator {
  calculateUnrealizedPnl(position: Position, currentPrice: number): number {
    const priceDiff = position.direction === 'LONG'
      ? currentPrice - position.avgEntryPrice
      : position.avgEntryPrice - currentPrice;
    
    return position.totalAmount * priceDiff * position.leverage;
  }
  
  calculateRealizedPnl(position: Position, closePrice: number): number {
    return this.calculateUnrealizedPnl(position, closePrice);
  }
  
  calculateRoi(position: Position, closePrice: number): number {
    const pnl = this.calculateRealizedPnl(position, closePrice);
    const initialInvestment = position.totalAmount * position.avgEntryPrice;
    return (pnl / initialInvestment) * 100;
  }
  
  calculateLiquidationPrice(position: Position): number {
    const maintenanceMargin = 0.005; // 0.5%
    
    if (position.direction === 'LONG') {
      return position.avgEntryPrice * (1 - 1/position.leverage + maintenanceMargin);
    } else {
      return position.avgEntryPrice * (1 + 1/position.leverage - maintenanceMargin);
    }
  }
}
```

---

## 6. Risk Checks

### 6.1 Pre-Trade Risk Checks

```typescript
interface RiskCheck {
  name: string;
  check: (order: Order, context: RiskContext) => Promise<RiskResult>;
  severity: 'ERROR' | 'WARNING';
}

class RiskEngine {
  private checks: RiskCheck[] = [
    this.checkBalance,
    this.checkPositionLimit,
    this.checkLeverageLimit,
    this.checkDailyLossLimit,
    this.checkDrawdownLimit,
    this.checkOrderSize,
    this.checkExposureLimit,
  ];
  
  async check(order: Order, context: RiskContext): Promise<RiskResult> {
    const results: CheckResult[] = [];
    
    for (const check of this.checks) {
      const result = await check.check(order, context);
      results.push(result);
      
      if (!result.passed && check.severity === 'ERROR') {
        return { passed: false, results, reason: result.reason };
      }
    }
    
    return { passed: true, results };
  }
  
  private checkBalance: RiskCheck = {
    name: 'Balance Check',
    severity: 'ERROR',
    check: async (order, context) => {
      const requiredMargin = this.calculateRequiredMargin(order);
      const availableBalance = context.balance * (1 - context.usedMargin);
      
      if (requiredMargin > availableBalance) {
        return {
          passed: false,
          reason: `Insufficient balance. Required: ${requiredMargin}, Available: ${availableBalance}`,
        };
      }
      return { passed: true };
    },
  };
  
  private checkPositionLimit: RiskCheck = {
    name: 'Position Limit',
    severity: 'ERROR',
    check: async (order, context) => {
      if (context.openPositions >= context.maxPositions) {
        return {
          passed: false,
          reason: `Maximum positions reached: ${context.maxPositions}`,
        };
      }
      return { passed: true };
    },
  };
  
  private checkLeverageLimit: RiskCheck = {
    name: 'Leverage Limit',
    severity: 'ERROR',
    check: async (order, context) => {
      if (order.leverage > context.maxLeverage) {
        return {
          passed: false,
          reason: `Leverage exceeds maximum: ${order.leverage} > ${context.maxLeverage}`,
        };
      }
      return { passed: true };
    },
  };
  
  private checkDailyLossLimit: RiskCheck = {
    name: 'Daily Loss Limit',
    severity: 'ERROR',
    check: async (order, context) => {
      if (context.dailyLoss >= context.maxDailyLoss) {
        return {
          passed: false,
          reason: `Daily loss limit reached: ${context.dailyLoss}`,
        };
      }
      return { passed: true };
    },
  };
}
```

### 6.2 Real-Time Risk Monitoring

```typescript
class RiskMonitor {
  private positions: Map<string, Position> = new Map();
  private priceFeed: PriceFeed;
  
  async startMonitoring(): Promise<void> {
    this.priceFeed.subscribe('price:update', async (update) => {
      const position = this.positions.get(update.symbol);
      if (position) {
        await this.checkPositionRisk(position, update.price);
      }
    });
  }
  
  private async checkPositionRisk(position: Position, currentPrice: number): Promise<void> {
    // Check stop loss
    if (position.stopLoss && this.isStopTriggered(position, currentPrice)) {
      await this.triggerStopLoss(position);
      return;
    }
    
    // Check take profit
    if (position.takeProfit && this.isTpTriggered(position, currentPrice)) {
      await this.triggerTakeProfit(position);
      return;
    }
    
    // Check trailing stop
    if (position.trailingStop) {
      await this.updateTrailingStop(position, currentPrice);
    }
    
    // Check liquidation
    const liquidationPrice = this.calculateLiquidationPrice(position);
    if (this.isNearLiquidation(currentPrice, liquidationPrice)) {
      await this.sendLiquidationWarning(position);
    }
  }
}
```

---

## 7. Error Handling

### 7.1 Error Types

```typescript
enum ExecutionErrorType {
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  INVALID_SYMBOL = 'INVALID_SYMBOL',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  EXCHANGE_UNAVAILABLE = 'EXCHANGE_UNAVAILABLE',
  ORDER_REJECTED = 'ORDER_REJECTED',
  TIMEOUT = 'TIMEOUT',
  NETWORK_ERROR = 'NETWORK_ERROR',
}

class ExecutionError extends Error {
  constructor(
    public type: ExecutionErrorType,
    message: string,
    public recoverable: boolean = false,
    public retryAfter?: number
  ) {
    super(message);
    this.name = 'ExecutionError';
  }
}
```

### 7.2 Error Recovery

```typescript
class ExecutionErrorHandler {
  async handle(error: ExecutionError, order: Order): Promise<ErrorResult> {
    switch (error.type) {
      case ExecutionErrorType.RATE_LIMIT_EXCEEDED:
        return this.handleRateLimit(error, order);
      
      case ExecutionErrorType.EXCHANGE_UNAVAILABLE:
        return this.handleExchangeUnavailable(error, order);
      
      case ExecutionErrorType.NETWORK_ERROR:
        return this.handleNetworkError(error, order);
      
      case ExecutionErrorType.ORDER_REJECTED:
        return this.handleOrderRejected(error, order);
      
      default:
        return this.handleGenericError(error, order);
    }
  }
  
  private async handleRateLimit(error: ExecutionError, order: Order): Promise<ErrorResult> {
    const retryAfter = error.retryAfter || 60;
    
    // Queue order for retry
    await this.orderQueue.add(order, {
      delay: retryAfter * 1000,
      attempts: 3,
    });
    
    return {
      handled: true,
      action: 'RETRY',
      retryAfter,
    };
  }
  
  private async handleNetworkError(error: ExecutionError, order: Order): Promise<ErrorResult> {
    // Exponential backoff retry
    const retryDelay = Math.min(1000 * Math.pow(2, order.retryCount), 30000);
    
    await this.orderQueue.add(order, {
      delay: retryDelay,
      attempts: 5,
      backoff: 'exponential',
    });
    
    return {
      handled: true,
      action: 'RETRY',
      retryAfter: retryDelay / 1000,
    };
  }
}
```

### 7.3 Circuit Breaker

```typescript
class ExecutionCircuitBreaker {
  private failures: number = 0;
  private lastFailure: Date | null = null;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  
  constructor(
    private threshold: number = 5,
    private timeout: number = 60000
  ) {}
  
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (this.shouldAttemptReset()) {
        this.state = 'HALF_OPEN';
      } else {
        throw new CircuitOpenError('Circuit breaker is open');
      }
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess(): void {
    this.failures = 0;
    this.state = 'CLOSED';
  }
  
  private onFailure(): void {
    this.failures++;
    this.lastFailure = new Date();
    
    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
    }
  }
  
  private shouldAttemptReset(): boolean {
    if (!this.lastFailure) return false;
    return Date.now() - this.lastFailure.getTime() > this.timeout;
  }
}
```

---

## 8. Execution Algorithms

### 8.1 TWAP (Time-Weighted Average Price)

```typescript
class TWAPExecutor {
  async execute(
    order: Order,
    duration: number,  // Total duration in seconds
    intervals: number  // Number of intervals
  ): Promise<ExecutionResult> {
    const intervalDuration = duration / intervals;
    const quantityPerInterval = order.quantity / intervals;
    
    const executions: ExecutionResult[] = [];
    
    for (let i = 0; i < intervals; i++) {
      await this.delay(intervalDuration * 1000);
      
      const sliceOrder = { ...order, quantity: quantityPerInterval };
      const result = await this.executeSlice(sliceOrder);
      executions.push(result);
    }
    
    return this.aggregateResults(executions);
  }
}
```

### 8.2 VWAP (Volume-Weighted Average Price)

```typescript
class VWAPExecutor {
  async execute(order: Order): Promise<ExecutionResult> {
    const volumeProfile = await this.getVolumeProfile(order.symbol);
    const executions: ExecutionResult[] = [];
    let remainingQuantity = order.quantity;
    
    for (const period of volumeProfile) {
      if (remainingQuantity <= 0) break;
      
      const targetQuantity = Math.min(
        remainingQuantity,
        order.quantity * period.volumeRatio
      );
      
      const sliceOrder = { ...order, quantity: targetQuantity };
      const result = await this.executeAtTime(sliceOrder, period.time);
      executions.push(result);
      
      remainingQuantity -= targetQuantity;
    }
    
    return this.aggregateResults(executions);
  }
}
```

### 8.3 Iceberg Orders

```typescript
class IcebergExecutor {
  constructor(
    private displayQuantity: number,
    private randomizeDisplay: boolean = true
  ) {}
  
  async execute(order: Order): Promise<ExecutionResult> {
    let remainingQuantity = order.quantity;
    const executions: ExecutionResult[] = [];
    
    while (remainingQuantity > 0) {
      const displayQty = this.calculateDisplayQuantity();
      const sliceQuantity = Math.min(displayQty, remainingQuantity);
      
      const sliceOrder = { ...order, quantity: sliceQuantity };
      const result = await this.executeSlice(sliceOrder);
      executions.push(result);
      
      remainingQuantity -= result.filledQuantity;
      
      // Small delay to avoid detection
      await this.delay(Math.random() * 1000 + 500);
    }
    
    return this.aggregateResults(executions);
  }
  
  private calculateDisplayQuantity(): number {
    if (this.randomizeDisplay) {
      const variance = this.displayQuantity * 0.2;
      return this.displayQuantity + (Math.random() * variance - variance / 2);
    }
    return this.displayQuantity;
  }
}
```

---

## 9. Order Routing

### 9.1 Smart Order Router

```typescript
class SmartOrderRouter {
  private exchanges: Map<string, ExchangeAdapter>;
  
  async route(order: Order): Promise<RoutingResult> {
    // 1. Get quotes from all exchanges
    const quotes = await this.getQuotes(order.symbol);
    
    // 2. Calculate effective prices
    const effectivePrices = quotes.map(q => ({
      exchange: q.exchange,
      price: this.calculateEffectivePrice(order, q),
      liquidity: q.liquidity,
    }));
    
    // 3. Select best exchange
    const bestRoute = this.selectBestRoute(effectivePrices, order);
    
    // 4. Execute on selected exchange
    return this.executeOnExchange(order, bestRoute.exchange);
  }
  
  private selectBestRoute(
    prices: EffectivePrice[],
    order: Order
  ): EffectivePrice {
    // Consider price, liquidity, and fees
    return prices.sort((a, b) => {
      const scoreA = this.calculateRouteScore(a, order);
      const scoreB = this.calculateRouteScore(b, order);
      return scoreB - scoreA;
    })[0];
  }
  
  private calculateRouteScore(route: EffectivePrice, order: Order): number {
    const priceScore = -route.price; // Lower price is better for buys
    const liquidityScore = Math.min(route.liquidity / order.quantity, 1) * 10;
    const feeScore = -this.getFeeRate(route.exchange) * 100;
    
    return priceScore + liquidityScore + feeScore;
  }
}
```

### 9.2 Order Splitting

```typescript
class OrderSplitter {
  async split(order: Order, maxSliceSize: number): Promise<Order[]> {
    if (order.quantity <= maxSliceSize) {
      return [order];
    }
    
    const slices: Order[] = [];
    let remaining = order.quantity;
    
    while (remaining > 0) {
      const sliceQuantity = Math.min(remaining, maxSliceSize);
      slices.push({
        ...order,
        id: generateId(),
        quantity: sliceQuantity,
        parentOrderId: order.id,
      });
      remaining -= sliceQuantity;
    }
    
    return slices;
  }
}
```

---

## 10. Performance Metrics

### 10.1 Execution Metrics

```typescript
interface ExecutionMetrics {
  // Latency
  orderSubmissionLatency: number;    // Time to submit to exchange
  orderExecutionLatency: number;     // Time from submit to fill
  totalLatency: number;              // End-to-end latency
  
  // Fill quality
  fillRate: number;                  // Percentage filled
  avgFillPrice: number;              // Average execution price
  slippage: number;                  // Price deviation from expected
  
  // Reliability
  successRate: number;               // Successful executions
  errorRate: number;                 // Failed executions
  retryRate: number;                 // Required retries
}
```

### 10.2 Metrics Collection

```typescript
class ExecutionMetricsCollector {
  private metrics: ExecutionMetrics = { ...defaultMetrics };
  
  recordExecution(
    order: Order,
    result: ExecutionResult,
    timings: ExecutionTimings
  ): void {
    // Latency metrics
    this.metrics.orderSubmissionLatency = timings.submissionTime - timings.createTime;
    this.metrics.orderExecutionLatency = timings.fillTime - timings.submissionTime;
    this.metrics.totalLatency = timings.fillTime - timings.createTime;
    
    // Fill metrics
    this.metrics.fillRate = result.filledQuantity / order.quantity;
    this.metrics.avgFillPrice = result.avgPrice;
    this.metrics.slippage = this.calculateSlippage(order, result);
    
    // Publish metrics
    this.publishMetrics(this.metrics);
  }
  
  private calculateSlippage(order: Order, result: ExecutionResult): number {
    const expectedPrice = order.price || order.expectedPrice;
    if (!expectedPrice) return 0;
    
    return Math.abs(result.avgPrice - expectedPrice) / expectedPrice;
  }
}
```

### 10.3 Performance Targets

| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| Order Submission Latency | < 50ms | > 100ms | > 500ms |
| Total Execution Latency | < 200ms | > 500ms | > 2000ms |
| Fill Rate | > 99% | < 95% | < 90% |
| Slippage | < 0.1% | > 0.5% | > 1% |
| Success Rate | > 99.9% | < 99% | < 95% |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | March 2026 | CITARION Team | Initial release |

---

*This document is part of the CITARION Documentation Suite.*
