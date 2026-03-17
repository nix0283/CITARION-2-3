/**
 * Trading Notifications Service
 * 
 * Service for managing and sending trading notifications in Cornix-style format.
 * Integrates with:
 * - Chat service (WebSocket)
 * - Notification service (Telegram, In-App)
 * - Position monitoring
 * - Signal execution
 */

import { 
  TradingNotification, 
  TradingNotificationType,
  formatNotification,
  formatPeriod,
  getNotificationPriority,
  generateNotificationId,
  EntryTarget,
  TPTarget,
} from './trading-notifications';

// ==================== TYPES ====================

export interface TradeEvent {
  type: 'OPEN' | 'CLOSE' | 'UPDATE' | 'ERROR';
  symbol: string;
  direction: 'LONG' | 'SHORT';
  exchange: string;
  isDemo: boolean;
  positionId?: string;
  data: Record<string, unknown>;
}

export interface SignalEvent {
  type: 'RECEIVED' | 'PARSED' | 'REJECTED' | 'ERROR';
  symbol?: string;
  channelName?: string;
  exchanges?: string[];
  errorMessage?: string;
  data?: Record<string, unknown>;
}

export interface OrderEvent {
  type: 'PLACED' | 'FILLED' | 'CANCELLED' | 'REJECTED' | 'UPDATED';
  symbol: string;
  exchange: string;
  orderType: 'MARKET' | 'LIMIT' | 'STOP';
  target?: string;
  price?: number;
  amount?: number;
  reason?: string;
}

export interface PositionUpdateEvent {
  symbol: string;
  direction: 'LONG' | 'SHORT';
  exchange: string;
  isDemo: boolean;
  positionId: string;
  
  // Current state
  entryPrice: number;
  currentPrice: number;
  avgEntryPrice?: number;
  
  // Targets
  entryTargets?: EntryTarget[];
  tpTargets?: TPTarget[];
  stopLoss?: number;
  
  // PnL
  pnl?: number;
  pnlPercent?: number;
  
  // Trailing
  trailingActive?: boolean;
  trailingType?: string;
  trailingPrice?: number;
  
  // Leverage
  leverage?: number;
  
  // Channel info
  channelName?: string;
  signalBotName?: string;
}

// ==================== NOTIFICATION STORE ====================

class NotificationStore {
  private notifications: TradingNotification[] = [];
  private maxStored = 100;
  private listeners: Set<(n: TradingNotification) => void> = new Set();

  add(notification: TradingNotification): void {
    this.notifications.unshift(notification);
    if (this.notifications.length > this.maxStored) {
      this.notifications.pop();
    }
    this.notifyListeners(notification);
  }

  getRecent(count: number = 20): TradingNotification[] {
    return this.notifications.slice(0, count);
  }

  getBySymbol(symbol: string): TradingNotification[] {
    return this.notifications.filter(n => n.symbol === symbol);
  }

  getByPosition(positionId: string): TradingNotification[] {
    return this.notifications.filter(n => n.positionId === positionId);
  }

  subscribe(listener: (n: TradingNotification) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(notification: TradingNotification): void {
    this.listeners.forEach(listener => {
      try {
        listener(notification);
      } catch (error) {
        console.error('[NotificationStore] Listener error:', error);
      }
    });
  }
}

// ==================== HELPER: CREATE NOTIFICATION ====================

function createNotification(
  type: TradingNotificationType,
  options: Partial<TradingNotification> = {}
): TradingNotification {
  return {
    id: generateNotificationId(),
    type,
    priority: getNotificationPriority(type),
    timestamp: new Date(),
    ...options,
  };
}

// ==================== TRADING NOTIFICATIONS SERVICE ====================

class TradingNotificationsService {
  private store = new NotificationStore();
  private mainApiUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  /**
   * Subscribe to notification updates
   */
  subscribe(listener: (n: TradingNotification) => void): () => void {
    return this.store.subscribe(listener);
  }

  /**
   * Get recent notifications
   */
  getRecent(count: number = 20): TradingNotification[] {
    return this.store.getRecent(count);
  }

  /**
   * Notify trade opened (Cornix-style)
   */
  async notifyTradeOpened(event: PositionUpdateEvent): Promise<TradingNotification> {
    const notification = createNotification('TRADE_OPENED', {
      symbol: event.symbol,
      direction: event.direction,
      exchange: event.exchange,
      isDemo: event.isDemo,
      positionId: event.positionId,
      entryPrice: event.avgEntryPrice || event.entryPrice,
      stopLoss: event.stopLoss,
      leverage: event.leverage || 1,
      channelName: event.channelName,
      signalBotName: event.signalBotName,
      entryTargets: event.entryTargets,
      tpTargets: event.tpTargets,
    });

    this.store.add(notification);
    await this.broadcastNotification(notification);
    
    return notification;
  }

  /**
   * Notify trade closed with PnL (Cornix-style)
   */
  async notifyTradeClosed(
    event: PositionUpdateEvent,
    closeReason: 'TP' | 'SL' | 'TRAILING' | 'MANUAL' | 'LIQUIDATION',
    periodMs: number
  ): Promise<TradingNotification> {
    let type: TradingNotificationType;
    
    switch (closeReason) {
      case 'TP':
        type = 'ALL_TP_HIT';
        break;
      case 'SL':
        type = 'SL_HIT';
        break;
      case 'TRAILING':
        type = 'TRAILING_STOP_HIT';
        break;
      case 'LIQUIDATION':
        type = 'LIQUIDATION';
        break;
      default:
        type = 'TRADE_CLOSED';
    }

    const notification = createNotification(type, {
      symbol: event.symbol,
      direction: event.direction,
      exchange: event.exchange,
      isDemo: event.isDemo,
      positionId: event.positionId,
      exitPrice: event.currentPrice,
      currentPrice: event.currentPrice,
      pnl: event.pnl,
      pnlPercent: event.pnlPercent,
      period: formatPeriod(periodMs),
    });

    this.store.add(notification);
    await this.broadcastNotification(notification);
    
    return notification;
  }

  /**
   * Notify TP target hit (Cornix-style)
   */
  async notifyTPHit(
    event: PositionUpdateEvent,
    targetIndex: number,
    totalTargets: number,
    pnl: number,
    pnlPercent: number,
    periodMs: number
  ): Promise<TradingNotification> {
    const isLastTarget = targetIndex === totalTargets;
    const type = isLastTarget ? 'ALL_TP_HIT' : 'TP_TARGET_HIT';

    const notification = createNotification(type, {
      symbol: event.symbol,
      direction: event.direction,
      exchange: event.exchange,
      isDemo: event.isDemo,
      positionId: event.positionId,
      currentPrice: event.currentPrice,
      exitPrice: event.currentPrice,
      pnl,
      pnlPercent,
      orderTarget: `${targetIndex}/${totalTargets}`,
      period: formatPeriod(periodMs),
    });

    this.store.add(notification);
    await this.broadcastNotification(notification);
    
    return notification;
  }

  /**
   * Notify SL hit (Cornix-style)
   */
  async notifySLHit(
    event: PositionUpdateEvent,
    pnl: number,
    pnlPercent: number,
    periodMs: number
  ): Promise<TradingNotification> {
    const notification = createNotification('SL_HIT', {
      symbol: event.symbol,
      direction: event.direction,
      exchange: event.exchange,
      isDemo: event.isDemo,
      positionId: event.positionId,
      currentPrice: event.currentPrice,
      exitPrice: event.currentPrice,
      pnl,
      pnlPercent,
      period: formatPeriod(periodMs),
    });

    this.store.add(notification);
    await this.broadcastNotification(notification);
    
    return notification;
  }

  /**
   * Notify order filled (Cornix-style)
   */
  async notifyOrderFilled(event: OrderEvent): Promise<TradingNotification> {
    const notification = createNotification('ORDER_FILLED', {
      symbol: event.symbol,
      exchange: event.exchange,
      orderType: event.orderType,
      orderTarget: event.target,
      currentPrice: event.price,
      amountUsd: event.amount,
    });

    this.store.add(notification);
    await this.broadcastNotification(notification);
    
    return notification;
  }

  /**
   * Notify order updated (trailing, SL move, etc.)
   */
  async notifyOrderUpdated(
    event: OrderEvent,
    updateType: 'SL' | 'TP' | 'TRAILING_TP' | 'TRAILING_SL'
  ): Promise<TradingNotification> {
    let type: TradingNotificationType;
    
    switch (updateType) {
      case 'TRAILING_TP':
        type = 'TRAILING_TP_UPDATED';
        break;
      case 'TRAILING_SL':
        type = 'TRAILING_SL_UPDATED';
        break;
      default:
        type = 'ORDER_UPDATED';
    }

    const notification = createNotification(type, {
      symbol: event.symbol,
      exchange: event.exchange,
      orderType: event.orderType,
      orderTarget: event.target,
      stopLoss: event.price,
      trailingPrice: event.price,
    });

    this.store.add(notification);
    await this.broadcastNotification(notification);
    
    return notification;
  }

  /**
   * Notify entry filled (Cornix-style)
   */
  async notifyEntryFilled(
    event: PositionUpdateEvent,
    targetIndex: number,
    totalTargets: number
  ): Promise<TradingNotification> {
    const isLastTarget = targetIndex === totalTargets;
    const type = isLastTarget ? 'ALL_ENTRIES_FILLED' : 'ENTRY_FILLED';

    const notification = createNotification(type, {
      symbol: event.symbol,
      direction: event.direction,
      exchange: event.exchange,
      isDemo: event.isDemo,
      positionId: event.positionId,
      entryPrice: event.currentPrice,
      orderTarget: `${targetIndex}/${totalTargets}`,
    });

    this.store.add(notification);
    await this.broadcastNotification(notification);
    
    return notification;
  }

  /**
   * Notify trailing stop activated (Cornix-style)
   */
  async notifyTrailingActivated(
    event: PositionUpdateEvent,
    triggerTarget: number
  ): Promise<TradingNotification> {
    const notification = createNotification('TRAILING_ACTIVATED', {
      symbol: event.symbol,
      direction: event.direction,
      exchange: event.exchange,
      isDemo: event.isDemo,
      positionId: event.positionId,
      trailingType: event.trailingType,
      trailingPrice: event.trailingPrice,
      triggerTarget: triggerTarget,
      channelName: event.channelName,
      signalBotName: event.signalBotName,
    });

    this.store.add(notification);
    await this.broadcastNotification(notification);
    
    return notification;
  }

  /**
   * Notify breakeven activated (Cornix-style)
   */
  async notifyBreakevenActivated(
    event: PositionUpdateEvent,
    triggerTarget: number
  ): Promise<TradingNotification> {
    const notification = createNotification('BREAKEVEN_ACTIVATED', {
      symbol: event.symbol,
      direction: event.direction,
      exchange: event.exchange,
      isDemo: event.isDemo,
      positionId: event.positionId,
      triggerTarget: triggerTarget,
      stopLoss: event.avgEntryPrice || event.entryPrice,
    });

    this.store.add(notification);
    await this.broadcastNotification(notification);
    
    return notification;
  }

  /**
   * Notify trade edited (Cornix-style)
   */
  async notifyTradeEdited(event: PositionUpdateEvent): Promise<TradingNotification> {
    const notification = createNotification('TRADE_EDITED', {
      symbol: event.symbol,
      direction: event.direction,
      exchange: event.exchange,
      isDemo: event.isDemo,
      positionId: event.positionId,
      entryPrice: event.avgEntryPrice || event.entryPrice,
      stopLoss: event.stopLoss,
      leverage: event.leverage || 1,
      channelName: event.channelName,
      entryTargets: event.entryTargets,
      tpTargets: event.tpTargets,
    });

    this.store.add(notification);
    await this.broadcastNotification(notification);
    
    return notification;
  }

  /**
   * Notify signal parse error (Cornix-style)
   */
  async notifySignalParseError(
    symbol: string,
    channelName: string,
    exchanges: string[],
    errorMessage: string
  ): Promise<TradingNotification> {
    const notification = createNotification('SIGNAL_PARSE_ERROR', {
      symbol,
      exchange: exchanges.join(', '),
      channelName,
      errorCode: 'PARSE_ERROR',
      errorMessage,
    });

    this.store.add(notification);
    await this.broadcastNotification(notification);
    
    return notification;
  }

  /**
   * Notify order rejected (Cornix-style)
   */
  async notifyOrderRejected(
    event: OrderEvent,
    errorCode: string,
    errorMessage: string
  ): Promise<TradingNotification> {
    const notification = createNotification('ORDER_REJECTED', {
      symbol: event.symbol,
      exchange: event.exchange,
      errorCode,
      errorMessage,
    });

    this.store.add(notification);
    await this.broadcastNotification(notification);
    
    return notification;
  }

  /**
   * Notify risk alert (Cornix-style)
   */
  async notifyRiskAlert(
    symbol: string,
    alertMessage: string,
    data?: Record<string, unknown>
  ): Promise<TradingNotification> {
    const notification = createNotification('RISK_ALERT', {
      symbol,
      errorCode: 'RISK_ALERT',
      errorMessage: alertMessage,
      data,
    });

    this.store.add(notification);
    await this.broadcastNotification(notification);
    
    return notification;
  }

  /**
   * Broadcast notification to chat service and notification service
   */
  private async broadcastNotification(notification: TradingNotification): Promise<void> {
    try {
      // Send to chat service (WebSocket)
      await fetch(`${this.mainApiUrl}/?XTransformPort=3005`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'trading_notification',
          data: {
            ...notification,
            formatted: formatNotification(notification),
          },
        }),
      });
    } catch (error) {
      console.error('[TradingNotifications] Failed to broadcast:', error);
    }
  }

  /**
   * Format notification for display
   */
  format(notification: TradingNotification): string {
    return formatNotification(notification);
  }
}

// ==================== SINGLETON EXPORT ====================

export const tradingNotificationsService = new TradingNotificationsService();

export default tradingNotificationsService;
