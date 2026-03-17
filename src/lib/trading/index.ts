/**
 * Trading Library Exports
 * 
 * Central export point for trading-related functionality
 */

// Trading Notifications (Cornix-style)
export * from './trading-notifications';
export * from './trading-notifications-service';

// Re-export commonly used items
export { 
  tradingNotificationsService,
  type TradingNotification,
  type TradingNotificationType,
  type EntryTarget,
  type TPTarget,
  type PositionUpdateEvent,
  type OrderEvent,
  formatNotification,
  getNotificationEmoji,
  formatPeriod,
  TradingNotificationBuilder,
} from './trading-notifications';
