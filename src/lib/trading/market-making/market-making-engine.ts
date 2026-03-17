/**
 * Market Making Engine
 * 
 * Inspired by OctoBot-Market-Making implementation
 * Main engine that orchestrates market making operations
 */

import {
  MarketMakingConfig,
  MarketMakingStatus,
  MarketMakingStatistics,
  MarketMakingStatusResponse,
  BookOrderData,
  ExistingOrder,
  ReferencePrice,
  OrderSide,
  OrderActionType,
  SpreadConfig,
  OrderBookConfig,
  VolumeConfig,
  DEFAULT_SPREAD_CONFIG,
  DEFAULT_ORDER_BOOK_CONFIG,
  DEFAULT_VOLUME_CONFIG,
} from './types';
import { OrderBookDistributionCalculator, createDistributionCalculator } from './order-book-distribution';
import { ReferencePriceManager, createReferencePriceManager, PriceSourceProvider } from './reference-price-manager';
import {
  OrdersUpdatePlan,
  PlanExecutionResult,
  OrderExecutor,
  createPlanBuilder,
  createOrderAction,
  cancelOrderAction,
} from './orders-update-plan';
import { EventEmitter } from 'events';

// =============================================================================
// ENGINE INTERFACES
// =============================================================================

/**
 * Exchange adapter for market making
 */
export interface MarketMakingExchangeAdapter extends OrderExecutor {
  name: string;
  getOpenOrders(symbol: string): Promise<ExistingOrder[]>;
  getBalance(currency: string): Promise<number>;
  getMarketInfo(symbol: string): Promise<{
    tickSize: number;
    stepSize: number;
    minQty: number;
    maxQty: number;
    minNotional: number;
    pricePrecision: number;
    qtyPrecision: number;
    base: string;
    quote: string;
  }>;
  get24hVolume(symbol: string): Promise<{ baseVolume: number; quoteVolume: number }>;
  getCurrentPrice(symbol: string): Promise<number>;
  subscribeToPrice?(symbol: string, callback: (price: number) => void): () => void;
  subscribeToOrders?(symbol: string, callback: (order: ExistingOrder) => void): () => void;
}

/**
 * Market making session
 */
export interface MarketMakingSession {
  sessionId: string;
  config: MarketMakingConfig;
  accountId: string;
  exchange: string;
  status: MarketMakingStatus;
  startedAt: Date;
  lastUpdate: Date;
  statistics: MarketMakingStatistics;
}

// =============================================================================
// MARKET MAKING ENGINE
// =============================================================================

/**
 * Events emitted by MarketMakingEngine
 */
export interface MarketMakingEngineEvents {
  'status:change': (status: MarketMakingStatus) => void;
  'order:created': (order: BookOrderData) => void;
  'order:cancelled': (orderId: string) => void;
  'order:filled': (order: ExistingOrder) => void;
  'price:update': (price: ReferencePrice) => void;
  'price:deviation': (deviation: number, exceedsThreshold: boolean) => void;
  'plan:execute': (plan: OrdersUpdatePlan) => void;
  'plan:complete': (result: PlanExecutionResult) => void;
  'error': (error: Error) => void;
  'rebalance': (reason: string) => void;
}

/**
 * Market Making Engine
 * 
 * Main orchestration engine for market making operations
 */
export class MarketMakingEngine extends EventEmitter {
  private config: MarketMakingConfig;
  private adapter: MarketMakingExchangeAdapter;
  private distributionCalculator: OrderBookDistributionCalculator;
  private referencePriceManager: ReferencePriceManager;
  
  private status: MarketMakingStatus = MarketMakingStatus.STOPPED;
  private sessionId: string | null = null;
  private startedAt: Date | null = null;
  private accountId: string;
  
  private statistics: MarketMakingStatistics = this.createEmptyStatistics();
  private openOrders: ExistingOrder[] = [];
  
  private monitoringInterval: NodeJS.Timeout | null = null;
  private rebalanceInterval: NodeJS.Timeout | null = null;
  
  private unsubscribers: Array<() => void> = [];

  constructor(
    config: MarketMakingConfig,
    adapter: MarketMakingExchangeAdapter,
    accountId: string
  ) {
    super();
    this.config = config;
    this.adapter = adapter;
    this.accountId = accountId;
    
    // Initialize distribution calculator
    this.distributionCalculator = createDistributionCalculator(
      config.orderBook.bidsCount,
      config.orderBook.asksCount,
      config.spread.minSpreadPercent,
      config.spread.maxSpreadPercent,
      config.orderBook.volumeProfile
    );

    // Initialize reference price manager
    this.referencePriceManager = createReferencePriceManager(
      config.symbol,
      {
        sourceType: config.referencePrice.sourceType,
        exchangeName: config.referencePrice.exchangeName,
        deviationThresholdPercent: config.referencePrice.deviationThresholdPercent,
        localPriceFn: async (symbol: string) => {
          return adapter.getCurrentPrice(symbol);
        },
      }
    );

    // Set up event handlers
    this.setupEventHandlers();
  }

  /**
   * Set up event handlers
   */
  private setupEventHandlers(): void {
    // Price deviation handler
    this.referencePriceManager.on('price:deviation', (event) => {
      this.emit('price:deviation', event.deviationPercent, event.exceedsThreshold);
      
      // Cancel all orders on excessive deviation (arbitrage protection)
      if (event.exceedsThreshold) {
        this.handleExcessiveDeviation();
      }
    });

    // Price update handler
    this.referencePriceManager.on('price:update', (price) => {
      this.emit('price:update', price);
    });

    // Price error handler
    this.referencePriceManager.on('price:error', (error) => {
      console.error('Reference price error:', error);
      this.emit('error', error);
    });
  }

  /**
   * Create empty statistics object
   */
  private createEmptyStatistics(): MarketMakingStatistics {
    return {
      totalOrdersCreated: 0,
      totalOrdersFilled: 0,
      fillRate: 0,
      totalVolumeTraded: 0,
      totalPnl: 0,
      unrealizedPnl: 0,
      averageSpreadCaptured: 0,
      uptimeSeconds: 0,
      currentPosition: 0,
    };
  }

  /**
   * Start market making
   */
  async start(): Promise<MarketMakingStatusResponse> {
    if (this.status !== MarketMakingStatus.STOPPED) {
      throw new Error(`Cannot start: engine is ${this.status}`);
    }

    this.setStatus(MarketMakingStatus.STARTING);

    try {
      // Generate session ID
      this.sessionId = `mm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      this.startedAt = new Date();

      // Start reference price monitoring
      this.referencePriceManager.startMonitoring(5000);

      // Subscribe to order updates if available
      if (this.adapter.subscribeToOrders) {
        const unsub = this.adapter.subscribeToOrders(
          this.config.symbol,
          this.handleOrderUpdate.bind(this)
        );
        this.unsubscribers.push(unsub);
      }

      // Initial order placement
      await this.rebalanceOrders('initial');

      // Start periodic rebalancing
      this.startPeriodicRebalancing();

      // Start statistics update
      this.startStatisticsUpdate();

      this.setStatus(MarketMakingStatus.RUNNING);

      return this.getStatus();
    } catch (error) {
      this.setStatus(MarketMakingStatus.ERROR);
      this.emit('error', error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  }

  /**
   * Stop market making
   */
  async stop(cancelOpenOrders: boolean = true): Promise<void> {
    if (this.status === MarketMakingStatus.STOPPED) {
      return;
    }

    this.setStatus(MarketMakingStatus.PAUSED);

    try {
      // Stop monitoring
      this.referencePriceManager.stopMonitoring();

      // Clear intervals
      if (this.monitoringInterval) {
        clearInterval(this.monitoringInterval);
        this.monitoringInterval = null;
      }
      if (this.rebalanceInterval) {
        clearInterval(this.rebalanceInterval);
        this.rebalanceInterval = null;
      }

      // Unsubscribe from updates
      this.unsubscribers.forEach(unsub => unsub());
      this.unsubscribers = [];

      // Cancel all open orders
      if (cancelOpenOrders) {
        await this.cancelAllOrders();
      }

      this.setStatus(MarketMakingStatus.STOPPED);
      this.sessionId = null;
      this.startedAt = null;
    } catch (error) {
      this.emit('error', error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  }

  /**
   * Pause market making (keep orders, stop rebalancing)
   */
  pause(): void {
    if (this.status !== MarketMakingStatus.RUNNING) {
      return;
    }

    this.setStatus(MarketMakingStatus.PAUSED);
    
    if (this.rebalanceInterval) {
      clearInterval(this.rebalanceInterval);
      this.rebalanceInterval = null;
    }
  }

  /**
   * Resume paused market making
   */
  resume(): void {
    if (this.status !== MarketMakingStatus.PAUSED) {
      return;
    }

    this.setStatus(MarketMakingStatus.RUNNING);
    this.startPeriodicRebalancing();
  }

  /**
   * Get current status
   */
  getStatus(): MarketMakingStatusResponse {
    const currentPrice = this.referencePriceManager.getCurrentPrice();

    return {
      status: this.status,
      config: this.config,
      referencePrice: currentPrice || {
        price: 0,
        source: 'unknown',
        symbol: this.config.symbol,
        timestamp: new Date(),
      },
      openOrders: this.openOrders,
      statistics: this.statistics,
      lastUpdate: new Date(),
    };
  }

  /**
   * Get current session info
   */
  getSession(): MarketMakingSession | null {
    if (!this.sessionId) return null;

    return {
      sessionId: this.sessionId,
      config: this.config,
      accountId: this.accountId,
      exchange: this.adapter.name,
      status: this.status,
      startedAt: this.startedAt!,
      lastUpdate: new Date(),
      statistics: this.statistics,
    };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<MarketMakingConfig>): void {
    this.config = { ...this.config, ...newConfig };

    // Recreate distribution calculator if needed
    if (newConfig.spread || newConfig.orderBook) {
      this.distributionCalculator = createDistributionCalculator(
        this.config.orderBook.bidsCount,
        this.config.orderBook.asksCount,
        this.config.spread.minSpreadPercent,
        this.config.spread.maxSpreadPercent,
        this.config.orderBook.volumeProfile
      );
    }

    // Update reference price config
    if (newConfig.referencePrice) {
      this.referencePriceManager.updateConfig(this.config.referencePrice);
    }
  }

  /**
   * Set status and emit event
   */
  private setStatus(status: MarketMakingStatus): void {
    const previousStatus = this.status;
    this.status = status;
    
    if (previousStatus !== status) {
      this.emit('status:change', status);
    }
  }

  /**
   * Start periodic rebalancing
   */
  private startPeriodicRebalancing(): void {
    // Rebalance every 30 seconds by default
    const intervalMs = 30000;
    
    this.rebalanceInterval = setInterval(() => {
      if (this.status === MarketMakingStatus.RUNNING) {
        this.rebalanceOrders('periodic').catch(err => {
          console.error('Rebalance error:', err);
          this.emit('error', err);
        });
      }
    }, intervalMs);
  }

  /**
   * Start statistics update
   */
  private startStatisticsUpdate(): void {
    this.monitoringInterval = setInterval(() => {
      this.updateStatistics();
    }, 10000);
  }

  /**
   * Update statistics
   */
  private async updateStatistics(): Promise<void> {
    if (this.startedAt) {
      this.statistics.uptimeSeconds = Math.floor(
        (Date.now() - this.startedAt.getTime()) / 1000
      );
    }

    // Update fill rate
    if (this.statistics.totalOrdersCreated > 0) {
      this.statistics.fillRate =
        (this.statistics.totalOrdersFilled / this.statistics.totalOrdersCreated) * 100;
    }

    // Get current position from open orders
    const orders = await this.adapter.getOpenOrders(this.config.symbol);
    this.openOrders = orders;
    
    // Calculate net position
    this.statistics.currentPosition = orders.reduce((sum, order) => {
      const signedQty = order.side === OrderSide.BUY
        ? order.remainingQuantity
        : -order.remainingQuantity;
      return sum + signedQty;
    }, 0);
  }

  /**
   * Rebalance orders
   */
  private async rebalanceOrders(reason: string): Promise<PlanExecutionResult> {
    this.emit('rebalance', reason);

    // Get current market state
    const currentPrice = this.referencePriceManager.getCurrentPrice();
    if (!currentPrice) {
      throw new Error('No reference price available');
    }

    // Get market info
    const marketInfo = await this.adapter.getMarketInfo(this.config.symbol);
    
    // Get 24h volume
    const volume = await this.adapter.get24hVolume(this.config.symbol);
    
    // Get balances
    const baseCurrency = marketInfo.base;
    const quoteCurrency = marketInfo.quote;
    const availableBase = await this.adapter.getBalance(baseCurrency);
    const availableQuote = await this.adapter.getBalance(quoteCurrency);

    // Get current open orders
    this.openOrders = await this.adapter.getOpenOrders(this.config.symbol);

    // Calculate ideal distribution
    const distribution = this.distributionCalculator.computeDistribution({
      referencePrice: currentPrice.price,
      dailyBaseVolume: volume.baseVolume,
      dailyQuoteVolume: volume.quoteVolume,
      availableBase,
      availableQuote,
      marketInfo: {
        symbol: this.config.symbol,
        base: baseCurrency,
        quote: quoteCurrency,
        ...marketInfo,
      },
    });

    // Calculate orders to cancel and create
    const toCancel = this.distributionCalculator.computeOrdersToCancel(
      this.openOrders,
      {
        referencePrice: currentPrice.price,
        dailyBaseVolume: volume.baseVolume,
        dailyQuoteVolume: volume.quoteVolume,
        availableBase,
        availableQuote,
        marketInfo: {
          symbol: this.config.symbol,
          base: baseCurrency,
          quote: quoteCurrency,
          ...marketInfo,
        },
      }
    );

    const toCreate = this.distributionCalculator.computeOrdersToCreate(
      this.openOrders,
      {
        referencePrice: currentPrice.price,
        dailyBaseVolume: volume.baseVolume,
        dailyQuoteVolume: volume.quoteVolume,
        availableBase,
        availableQuote,
        marketInfo: {
          symbol: this.config.symbol,
          base: baseCurrency,
          quote: quoteCurrency,
          ...marketInfo,
        },
      }
    );

    // Build update plan
    const builder = createPlanBuilder().setTriggerSource(reason);

    // Add cancellations first
    for (const order of toCancel) {
      builder.cancelOrder(order);
    }

    // Then add creations
    for (const order of toCreate) {
      builder.createOrder(order);
    }

    const plan = builder.build();
    this.emit('plan:execute', plan);

    // Execute plan
    const result = await plan.execute(this.adapter);
    this.emit('plan:complete', result);

    // Update statistics
    this.statistics.totalOrdersCreated += result.createdOrders.length;
    this.statistics.totalOrdersFilled += result.cancelledOrderIds.length;

    return result;
  }

  /**
   * Handle order updates from exchange
   */
  private handleOrderUpdate(order: ExistingOrder): void {
    if (order.status === 'FILLED' || order.status === 'PARTIALLY_FILLED') {
      this.statistics.totalOrdersFilled++;
      this.emit('order:filled', order);

      // Trigger rebalance on fill
      if (this.status === MarketMakingStatus.RUNNING) {
        this.rebalanceOrders('fill').catch(err => {
          console.error('Rebalance after fill error:', err);
        });
      }
    }
  }

  /**
   * Handle excessive price deviation
   */
  private async handleExcessiveDeviation(): Promise<void> {
    console.warn('Excessive price deviation detected - cancelling all orders');
    
    await this.cancelAllOrders();
    
    // Pause market making on excessive deviation
    this.pause();
  }

  /**
   * Cancel all open orders
   */
  private async cancelAllOrders(): Promise<void> {
    const orders = await this.adapter.getOpenOrders(this.config.symbol);
    
    for (const order of orders) {
      try {
        await this.adapter.cancelOrder(order.orderId);
        this.emit('order:cancelled', order.orderId);
      } catch (err) {
        console.error(`Failed to cancel order ${order.orderId}:`, err);
      }
    }

    this.openOrders = [];
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.stop(true);
    this.referencePriceManager.destroy();
    this.removeAllListeners();
  }
}

// =============================================================================
// ENGINE FACTORY
// =============================================================================

/**
 * Create a market making engine
 */
export function createMarketMakingEngine(
  config: MarketMakingConfig,
  adapter: MarketMakingExchangeAdapter,
  accountId: string
): MarketMakingEngine {
  return new MarketMakingEngine(config, adapter, accountId);
}

export default MarketMakingEngine;
