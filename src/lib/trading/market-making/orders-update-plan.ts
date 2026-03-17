/**
 * Orders Update Plan
 * 
 * Inspired by OctoBot-Market-Making implementation
 * Provides atomic batch operations for order creation/cancellation
 */

import {
  OrderAction,
  OrderActionType,
  OrdersUpdatePlan as IOrdersUpdatePlan,
  PlanExecutionResult,
  BookOrderData,
  ExistingOrder,
} from './types';
import { EventEmitter } from 'events';
import { randomUUID } from 'crypto';

// =============================================================================
// ORDER ACTION BUILDERS
// =============================================================================

/**
 * Create a "create order" action
 */
export function createOrderAction(orderData: BookOrderData): OrderAction {
  return {
    type: OrderActionType.CREATE,
    orderData,
  };
}

/**
 * Create a "cancel order" action
 */
export function cancelOrderAction(existingOrder: ExistingOrder): OrderAction {
  return {
    type: OrderActionType.CANCEL,
    existingOrder,
  };
}

/**
 * Create a "modify order" action
 */
export function modifyOrderAction(
  existingOrder: ExistingOrder,
  newOrderData: BookOrderData
): OrderAction {
  return {
    type: OrderActionType.MODIFY,
    orderData: newOrderData,
    existingOrder,
  };
}

// =============================================================================
// ORDER EXECUTOR INTERFACE
// =============================================================================

/**
 * Interface for order execution
 * Must be implemented by the exchange adapter
 */
export interface OrderExecutor {
  createOrder(order: BookOrderData): Promise<BookOrderData>;
  cancelOrder(orderId: string): Promise<boolean>;
  modifyOrder(orderId: string, newOrder: BookOrderData): Promise<BookOrderData>;
}

// =============================================================================
// ORDERS UPDATE PLAN CLASS
// =============================================================================

/**
 * Events emitted by OrdersUpdatePlan
 */
export interface OrdersUpdatePlanEvents {
  'plan:start': (planId: string) => void;
  'plan:progress': (planId: string, completed: number, total: number) => void;
  'plan:complete': (result: PlanExecutionResult) => void;
  'plan:error': (planId: string, error: Error) => void;
  'plan:cancel': (planId: string) => void;
  'action:execute': (action: OrderAction) => void;
  'action:success': (action: OrderAction, result: BookOrderData | boolean) => void;
  'action:fail': (action: OrderAction, error: Error) => void;
}

/**
 * Orders Update Plan
 * 
 * Manages atomic batch operations for order updates
 */
export class OrdersUpdatePlan extends EventEmitter {
  private planId: string;
  private actions: OrderAction[];
  private cancelled: boolean = false;
  private cancellable: boolean = true;
  private triggerSource: string;
  private createdAt: Date;
  private completedAt?: Date;
  
  // Execution state
  private isExecuting: boolean = false;
  private currentActionIndex: number = 0;
  private executionResults: Array<{
    action: OrderAction;
    success: boolean;
    result?: BookOrderData | boolean;
    error?: string;
  }> = [];

  constructor(
    actions: OrderAction[],
    triggerSource: string = 'manual'
  ) {
    super();
    this.planId = randomUUID();
    this.actions = [...actions];
    this.triggerSource = triggerSource;
    this.createdAt = new Date();
  }

  /**
   * Get plan ID
   */
  getPlanId(): string {
    return this.planId;
  }

  /**
   * Get all actions
   */
  getActions(): OrderAction[] {
    return [...this.actions];
  }

  /**
   * Get action count
   */
  getActionCount(): number {
    return this.actions.length;
  }

  /**
   * Check if plan is cancelled
   */
  isCancelled(): boolean {
    return this.cancelled;
  }

  /**
   * Check if plan is cancellable
   */
  isCancellable(): boolean {
    return this.cancellable;
  }

  /**
   * Get trigger source
   */
  getTriggerSource(): string {
    return this.triggerSource;
  }

  /**
   * Get creation timestamp
   */
  getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
   * Cancel the plan
   */
  cancel(): boolean {
    if (!this.cancellable || this.cancelled) {
      return false;
    }

    if (this.isExecuting) {
      // Can only cancel if not yet started or in early stages
      if (this.currentActionIndex === 0) {
        this.cancelled = true;
        this.emit('plan:cancel', this.planId);
        return true;
      }
      return false;
    }

    this.cancelled = true;
    this.emit('plan:cancel', this.planId);
    return true;
  }

  /**
   * Execute the plan with the provided executor
   */
  async execute(executor: OrderExecutor): Promise<PlanExecutionResult> {
    if (this.cancelled) {
      return {
        planId: this.planId,
        success: false,
        createdOrders: [],
        cancelledOrderIds: [],
        failedActions: this.actions.map(action => ({
          action,
          error: 'Plan was cancelled',
        })),
        duration: 0,
      };
    }

    if (this.isExecuting) {
      throw new Error('Plan is already executing');
    }

    this.isExecuting = true;
    this.cancellable = false;
    this.executionResults = [];
    
    const startTime = Date.now();
    this.emit('plan:start', this.planId);

    const createdOrders: BookOrderData[] = [];
    const cancelledOrderIds: string[] = [];
    const failedActions: Array<{ action: OrderAction; error: string }> = [];

    for (let i = 0; i < this.actions.length; i++) {
      // Check for cancellation
      if (this.cancelled) {
        failedActions.push(
          ...this.actions.slice(i).map(action => ({
            action,
            error: 'Plan was cancelled',
          }))
        );
        break;
      }

      this.currentActionIndex = i;
      const action = this.actions[i];

      this.emit('plan:progress', this.planId, i + 1, this.actions.length);
      this.emit('action:execute', action);

      try {
        const result = await this.executeAction(action, executor);

        if (action.type === OrderActionType.CREATE || action.type === OrderActionType.MODIFY) {
          if (result && typeof result !== 'boolean') {
            createdOrders.push(result);
          }
        } else if (action.type === OrderActionType.CANCEL) {
          if (typeof result === 'boolean' && result && action.existingOrder) {
            cancelledOrderIds.push(action.existingOrder.orderId);
          }
        }

        this.executionResults.push({
          action,
          success: true,
          result,
        });

        this.emit('action:success', action, result);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        
        this.executionResults.push({
          action,
          success: false,
          error: errorMessage,
        });

        failedActions.push({
          action,
          error: errorMessage,
        });

        this.emit('action:fail', action, error instanceof Error ? error : new Error(errorMessage));
      }
    }

    const duration = Date.now() - startTime;
    this.completedAt = new Date();
    this.isExecuting = false;

    const result: PlanExecutionResult = {
      planId: this.planId,
      success: failedActions.length === 0,
      createdOrders,
      cancelledOrderIds,
      failedActions,
      duration,
    };

    this.emit('plan:complete', result);
    return result;
  }

  /**
   * Execute a single action
   */
  private async executeAction(
    action: OrderAction,
    executor: OrderExecutor
  ): Promise<BookOrderData | boolean> {
    switch (action.type) {
      case OrderActionType.CREATE:
        if (!action.orderData) {
          throw new Error('Missing order data for CREATE action');
        }
        return executor.createOrder(action.orderData);

      case OrderActionType.CANCEL:
        if (!action.existingOrder) {
          throw new Error('Missing existing order for CANCEL action');
        }
        return executor.cancelOrder(action.existingOrder.orderId);

      case OrderActionType.MODIFY:
        if (!action.existingOrder || !action.orderData) {
          throw new Error('Missing data for MODIFY action');
        }
        return executor.modifyOrder(action.existingOrder.orderId, action.orderData);

      default:
        throw new Error(`Unknown action type: ${(action as OrderAction).type}`);
    }
  }

  /**
   * Get execution results
   */
  getExecutionResults(): typeof this.executionResults {
    return [...this.executionResults];
  }

  /**
   * Check if execution is complete
   */
  isComplete(): boolean {
    return this.completedAt !== undefined;
  }

  /**
   * Get completion timestamp
   */
  getCompletedAt(): Date | undefined {
    return this.completedAt;
  }

  /**
   * Convert to plain object (for serialization)
   */
  toObject(): IOrdersUpdatePlan {
    return {
      planId: this.planId,
      actions: this.actions,
      cancelled: this.cancelled,
      cancellable: this.cancellable,
      triggerSource: this.triggerSource,
      createdAt: this.createdAt,
      completedAt: this.completedAt,
    };
  }

  /**
   * Create from plain object (for deserialization)
   */
  static fromObject(data: IOrdersUpdatePlan): OrdersUpdatePlan {
    const plan = new OrdersUpdatePlan(data.actions, data.triggerSource);
    plan.planId = data.planId;
    plan.cancelled = data.cancelled;
    plan.cancellable = data.cancellable;
    plan.createdAt = data.createdAt;
    plan.completedAt = data.completedAt;
    return plan;
  }
}

// =============================================================================
// PLAN BUILDER
// =============================================================================

/**
 * Builder for creating orders update plans
 */
export class OrdersUpdatePlanBuilder {
  private actions: OrderAction[] = [];
  private triggerSource: string = 'manual';

  /**
   * Set trigger source
   */
  setTriggerSource(source: string): this {
    this.triggerSource = source;
    return this;
  }

  /**
   * Add create order action
   */
  createOrder(orderData: BookOrderData): this {
    this.actions.push(createOrderAction(orderData));
    return this;
  }

  /**
   * Add multiple create order actions
   */
  createOrders(orders: BookOrderData[]): this {
    orders.forEach(order => this.actions.push(createOrderAction(order)));
    return this;
  }

  /**
   * Add cancel order action
   */
  cancelOrder(order: ExistingOrder): this {
    this.actions.push(cancelOrderAction(order));
    return this;
  }

  /**
   * Add multiple cancel order actions
   */
  cancelOrders(orders: ExistingOrder[]): this {
    orders.forEach(order => this.actions.push(cancelOrderAction(order)));
    return this;
  }

  /**
   * Add modify order action
   */
  modifyOrder(order: ExistingOrder, newOrderData: BookOrderData): this {
    this.actions.push(modifyOrderAction(order, newOrderData));
    return this;
  }

  /**
   * Add custom action
   */
  addAction(action: OrderAction): this {
    this.actions.push(action);
    return this;
  }

  /**
   * Clear all actions
   */
  clear(): this {
    this.actions = [];
    return this;
  }

  /**
   * Build the plan
   */
  build(): OrdersUpdatePlan {
    return new OrdersUpdatePlan(this.actions, this.triggerSource);
  }
}

// =============================================================================
// PLAN EXECUTOR
// =============================================================================

/**
 * Manages execution of multiple plans with queuing
 */
export class PlanExecutorService extends EventEmitter {
  private queue: OrdersUpdatePlan[] = [];
  private currentPlan: OrdersUpdatePlan | null = null;
  private isProcessing: boolean = false;
  private executor: OrderExecutor;

  constructor(executor: OrderExecutor) {
    super();
    this.executor = executor;
  }

  /**
   * Submit a plan for execution
   */
  submit(plan: OrdersUpdatePlan): void {
    this.queue.push(plan);
    this.processQueue();
  }

  /**
   * Submit and wait for completion
   */
  async execute(plan: OrdersUpdatePlan): Promise<PlanExecutionResult> {
    return new Promise((resolve, reject) => {
      plan.once('plan:complete', resolve);
      plan.once('plan:error', reject);
      this.submit(plan);
    });
  }

  /**
   * Process the queue
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;
    this.currentPlan = this.queue.shift()!;

    try {
      await this.currentPlan.execute(this.executor);
    } catch (error) {
      this.emit('plan:error', this.currentPlan.getPlanId(), error);
    } finally {
      this.currentPlan = null;
      this.isProcessing = false;
      // Process next plan
      this.processQueue();
    }
  }

  /**
   * Cancel current plan
   */
  cancelCurrent(): boolean {
    if (this.currentPlan) {
      return this.currentPlan.cancel();
    }
    return false;
  }

  /**
   * Cancel all plans
   */
  cancelAll(): void {
    this.queue.forEach(plan => plan.cancel());
    this.queue = [];
    if (this.currentPlan) {
      this.currentPlan.cancel();
    }
  }

  /**
   * Get queue length
   */
  getQueueLength(): number {
    return this.queue.length;
  }

  /**
   * Check if processing
   */
  isActive(): boolean {
    return this.isProcessing;
  }
}

// =============================================================================
// FACTORY FUNCTIONS
// =============================================================================

/**
 * Create a new plan builder
 */
export function createPlanBuilder(): OrdersUpdatePlanBuilder {
  return new OrdersUpdatePlanBuilder();
}

/**
 * Create a simple plan with actions
 */
export function createPlan(
  actions: OrderAction[],
  triggerSource: string = 'manual'
): OrdersUpdatePlan {
  return new OrdersUpdatePlan(actions, triggerSource);
}

export default OrdersUpdatePlan;
