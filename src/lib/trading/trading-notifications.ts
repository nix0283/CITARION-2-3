/**
 * Cornix-style Trading Notifications System
 * 
 * Implements notification templates and formatting similar to Cornix:
 * - Trade opened/closed notifications
 * - Order filled/status notifications
 * - Take-profit and stop-loss hit notifications
 * - Trailing stop activation and updates
 * - Signal parsing errors
 * - Position status updates
 */

// ==================== TYPES ====================

export type TradingNotificationType =
  // Trade lifecycle
  | 'TRADE_OPENED'
  | 'TRADE_CLOSED'
  | 'TRADE_CANCELLED'
  | 'TRADE_EDITED'
  
  // Order status
  | 'ORDER_PLACED'
  | 'ORDER_FILLED'
  | 'ORDER_CANCELLED'
  | 'ORDER_REJECTED'
  | 'ORDER_UPDATED'
  
  // Exit events
  | 'TP_HIT'
  | 'TP_TARGET_HIT'
  | 'ALL_TP_HIT'
  | 'SL_HIT'
  | 'TRAILING_STOP_HIT'
  | 'LIQUIDATION'
  
  // Cornix-style exit reasons
  | 'CANCELLED_TARGET_ACHIEVED'      // "Cancelled ❌ Target achieved before entering the entry zone"
  | 'CLOSED_OPPOSITE_SIGNAL'         // "Closed due to opposite direction signal ⚠"
  | 'CLOSED_TRAILING_AFTER_TP'       // "Closed at trailing stoploss after reaching take profit ⚠"
  | 'CLOSED_STOP_AFTER_TP'           // "Closed at stoploss after reaching take profit ⚠"
  | 'MANUALLY_CANCELLED'             // "#BTC/USDT Manually Cancelled Profit/Loss: X% 📈/📉 Period: X ⏰"
  
  // Trailing events
  | 'TRAILING_ACTIVATED'
  | 'TRAILING_TP_UPDATED'
  | 'TRAILING_SL_UPDATED'
  | 'BREAKEVEN_ACTIVATED'
  
  // Entry events
  | 'ENTRY_FILLED'
  | 'ALL_ENTRIES_FILLED'
  | 'ENTRY_MISSED'
  
  // Signal events
  | 'SIGNAL_RECEIVED'
  | 'SIGNAL_PARSED'
  | 'SIGNAL_REJECTED'
  | 'SIGNAL_PARSE_ERROR'
  | 'SIGNAL_PUBLISHED'               // New: when signal is published to channel
  
  // Risk events
  | 'RISK_ALERT'
  | 'MARGIN_WARNING'
  | 'POSITION_LIMIT_REACHED'
  | 'PLAN_LIMIT_REACHED'             // "You've already reached the plan limit of X active trades"
  
  // System events
  | 'BOT_STARTED'
  | 'BOT_STOPPED'
  | 'BOT_ERROR'
  | 'SYNC_COMPLETE'
  | 'TRADE_STATUS_UPDATE';           // "Entity: Trade Status: In Progress Reason: TPs Updated"

export type NotificationPriority = 'critical' | 'high' | 'medium' | 'low';

export interface TradingNotification {
  id: string;
  type: TradingNotificationType;
  priority: NotificationPriority;
  timestamp: Date;
  
  // Trade info
  symbol?: string;
  direction?: 'LONG' | 'SHORT';
  exchange?: string;
  marketType?: 'SPOT' | 'FUTURES';
  
  // Demo mode
  isDemo?: boolean;
  
  // Position details
  positionId?: string;
  tradeId?: string;
  signalId?: string;
  
  // Prices
  entryPrice?: number;
  currentPrice?: number;
  exitPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  
  // Amounts
  amount?: number;
  amountUsd?: number;
  leverage?: number;
  
  // PnL
  pnl?: number;
  pnlPercent?: number;
  roi?: number;
  
  // Order details
  orderType?: 'MARKET' | 'LIMIT' | 'STOP';
  orderTarget?: string; // e.g., "1/4", "2/3"
  orderStatus?: 'PENDING' | 'FILLED' | 'CANCELLED' | 'REJECTED';
  
  // Trailing
  trailingType?: string;
  trailingPrice?: number;
  triggerTarget?: number;
  
  // Entry/TP targets
  entryTargets?: EntryTarget[];
  tpTargets?: TPTarget[];
  
  // Error info
  errorCode?: string;
  errorMessage?: string;
  
  // Channel info
  channelName?: string;
  signalBotName?: string;
  
  // Period
  period?: string;
  
  // Additional data
  data?: Record<string, unknown>;
}

export interface EntryTarget {
  price: number;
  percentage: number;
  filled?: boolean;
  amount?: number;
}

export interface TPTarget {
  price: number;
  percentage: number;
  hit?: boolean;
  pnl?: number;
}

// ==================== NOTIFICATION FORMATTERS ====================

/**
 * Format notification for display (Cornix-style)
 */
export function formatNotification(n: TradingNotification): string {
  const parts: string[] = [];
  
  // Demo prefix
  if (n.isDemo) {
    parts.push('**[Demo Trading]**');
  }
  
  // Main content based on type
  switch (n.type) {
    case 'TRADE_OPENED':
      parts.push(formatTradeOpened(n));
      break;
    case 'TRADE_CLOSED':
      parts.push(formatTradeClosed(n));
      break;
    case 'ORDER_FILLED':
      parts.push(formatOrderFilled(n));
      break;
    case 'ORDER_UPDATED':
      parts.push(formatOrderUpdated(n));
      break;
    case 'TP_HIT':
    case 'TP_TARGET_HIT':
      parts.push(formatTPHit(n));
      break;
    case 'ALL_TP_HIT':
      parts.push(formatAllTPHit(n));
      break;
    case 'SL_HIT':
      parts.push(formatSLHit(n));
      break;
    case 'TRAILING_STOP_HIT':
      parts.push(formatTrailingStopHit(n));
      break;
    case 'TRAILING_ACTIVATED':
      parts.push(formatTrailingActivated(n));
      break;
    case 'TRAILING_TP_UPDATED':
    case 'TRAILING_SL_UPDATED':
      parts.push(formatTrailingUpdate(n));
      break;
    case 'BREAKEVEN_ACTIVATED':
      parts.push(formatBreakevenActivated(n));
      break;
    case 'ENTRY_FILLED':
      parts.push(formatEntryFilled(n));
      break;
    case 'ALL_ENTRIES_FILLED':
      parts.push(formatAllEntriesFilled(n));
      break;
    case 'SIGNAL_PARSE_ERROR':
      parts.push(formatSignalParseError(n));
      break;
    case 'SIGNAL_PUBLISHED':
      parts.push(formatSignalPublished(n));
      break;
    case 'TRADE_EDITED':
      parts.push(formatTradeEdited(n));
      break;
    case 'ORDER_REJECTED':
      parts.push(formatOrderRejected(n));
      break;
    case 'RISK_ALERT':
      parts.push(formatRiskAlert(n));
      break;
    // Cornix-style exit reasons
    case 'CANCELLED_TARGET_ACHIEVED':
      parts.push(formatCancelledTargetAchieved(n));
      break;
    case 'CLOSED_OPPOSITE_SIGNAL':
      parts.push(formatClosedOppositeSignal(n));
      break;
    case 'CLOSED_TRAILING_AFTER_TP':
      parts.push(formatClosedTrailingAfterTP(n));
      break;
    case 'CLOSED_STOP_AFTER_TP':
      parts.push(formatClosedStopAfterTP(n));
      break;
    case 'MANUALLY_CANCELLED':
      parts.push(formatManuallyCancelled(n));
      break;
    case 'PLAN_LIMIT_REACHED':
      parts.push(formatPlanLimitReached(n));
      break;
    case 'TRADE_STATUS_UPDATE':
      parts.push(formatTradeStatusUpdate(n));
      break;
    default:
      parts.push(formatDefault(n));
  }
  
  return parts.join(' ');
}

// ==================== SPECIFIC FORMATTERS ====================

function formatTradeOpened(n: TradingNotification): string {
  const dir = n.direction === 'LONG' ? '🟢' : '🔴';
  const lines: string[] = [];
  
  // Header with client/bot info
  if (n.channelName || n.signalBotName) {
    lines.push(`**Client: ${n.exchange}**`);
    if (n.signalBotName) lines.push(`**Signal Bot: ${n.signalBotName}**`);
    if (n.channelName) lines.push(`**Channel: ${n.channelName}**`);
  }
  lines.push(`**Symbol: ${n.symbol}**`);
  lines.push('The following trade was opened successfully:');
  
  // Trade details
  lines.push(`⚡⚡ ${n.symbol} ⚡⚡`);
  lines.push(`Exchange: ${n.exchange}`);
  lines.push(`Trade Type: Regular (${n.direction?.toLowerCase()})`);
  
  // Leverage
  if (n.leverage) {
    lines.push(`Leverage: Cross (${n.leverage}.0X)`);
  }
  
  // Entry targets
  if (n.entryTargets && n.entryTargets.length > 0) {
    lines.push('Entry Orders:');
    n.entryTargets.forEach((t, i) => {
      const check = t.filled ? '✅' : '';
      lines.push(`  ${i + 1}) ${t.price} - ${t.percentage}%${check} (${t.amount?.toFixed(2) || 'N/A'} USDT)`);
    });
  } else if (n.entryPrice) {
    lines.push(`Entry Orders: 1) ${n.entryPrice} - 100.0% (${n.amountUsd?.toFixed(2) || 'N/A'} USDT)`);
  }
  
  // Take-profit targets
  if (n.tpTargets && n.tpTargets.length > 0) {
    lines.push('Take-Profit Orders:');
    n.tpTargets.forEach((t, i) => {
      lines.push(`  ${i + 1}) ${t.price} - ${t.percentage}%`);
    });
  }
  
  // Stop-loss
  if (n.stopLoss) {
    lines.push('Stop-loss Orders:');
    lines.push(`  1) ${n.stopLoss} - 100.0%`);
  }
  
  // Trailing config
  if (n.trailingType) {
    lines.push(`Trailing Configuration: ${n.trailingType}`);
  }
  
  return lines.join('\n');
}

function formatTradeClosed(n: TradingNotification): string {
  const lines: string[] = [];
  
  // Header
  lines.push(`${n.exchange} #${n.symbol}`);
  
  // Close reason and PnL
  if (n.pnl !== undefined && n.pnlPercent !== undefined) {
    if (n.pnl >= 0) {
      lines.push(`All take-profit targets achieved 😎 Profit: ${n.pnlPercent.toFixed(4)}% 📈`);
    } else {
      lines.push(`Stop Target Hit ⛔ Loss: ${Math.abs(n.pnlPercent).toFixed(4)}% 📉`);
    }
  }
  
  // Period
  if (n.period) {
    lines.push(`Period: ${n.period} ⏰`);
  }
  
  return lines.join('\n');
}

function formatOrderFilled(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`Entity: Order`);
  lines.push(`Exchange: ${n.exchange}`);
  lines.push(`Client: ${n.channelName || 'N/A'}`);
  if (n.signalBotName) lines.push(`Signal Bot: ${n.signalBotName}`);
  lines.push(`Symbol: **${n.symbol}**`);
  lines.push(`Status: **Fulfilled**`);
  lines.push(`Reason:`);
  lines.push(`Type: ${n.orderType === 'MARKET' ? 'Take-Profit Market' : n.orderType}`);
  if (n.orderTarget) lines.push(`Target: ${n.orderTarget}`);
  lines.push(`Amount: ${n.amountUsd?.toFixed(4) || 'N/A'} USDT`);
  lines.push(`Price: ${n.currentPrice || n.exitPrice}`);
  
  return lines.join('\n');
}

function formatOrderUpdated(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`Entity: Order`);
  lines.push(`Exchange: ${n.exchange}`);
  lines.push(`Client: ${n.channelName || 'N/A'}`);
  if (n.signalBotName) lines.push(`Signal Bot: ${n.signalBotName}`);
  lines.push(`Symbol: **${n.symbol}**`);
  lines.push(`Status: **Updated**`);
  lines.push(`Reason:`);
  lines.push(`Type: ${n.orderType || 'Stop'}`);
  if (n.orderTarget) lines.push(`Target: ${n.orderTarget}`);
  lines.push(`Amount: ${n.amountUsd?.toFixed(4) || 'N/A'} USDT`);
  lines.push(`Price: ${n.trailingPrice || n.stopLoss}`);
  
  return lines.join('\n');
}

function formatTPHit(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`${n.exchange} #${n.symbol}`);
  
  if (n.orderTarget) {
    lines.push(`Take-Profit target ${n.orderTarget.split('/')[0]} ✅`);
  } else {
    lines.push('Take-Profit hit ✅');
  }
  
  if (n.pnlPercent !== undefined) {
    lines.push(`Profit: ${n.pnlPercent.toFixed(4)}% 📈`);
  }
  
  if (n.period) {
    lines.push(`Period: ${n.period} ⏰`);
  }
  
  return lines.join('\n');
}

function formatAllTPHit(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`${n.exchange} #${n.symbol}`);
  lines.push('All take-profit targets achieved 😎');
  
  if (n.pnlPercent !== undefined) {
    lines.push(`Profit: ${n.pnlPercent.toFixed(4)}% 📈`);
  }
  
  if (n.period) {
    lines.push(`Period: ${n.period} ⏰`);
  }
  
  return lines.join('\n');
}

function formatSLHit(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`${n.exchange} #${n.symbol}`);
  lines.push('Stop Target Hit ⛔');
  
  if (n.pnlPercent !== undefined) {
    lines.push(`Loss: ${Math.abs(n.pnlPercent).toFixed(4)}% 📉`);
  }
  
  if (n.period) {
    lines.push(`Period: ${n.period} ⏰`);
  }
  
  return lines.join('\n');
}

function formatTrailingStopHit(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`${n.exchange} #${n.symbol}`);
  lines.push('Closed at trailing stoploss after reaching take profit ⚠');
  
  if (n.pnlPercent !== undefined) {
    lines.push(`Profit: ${n.pnlPercent.toFixed(4)}% 📈`);
  }
  
  return lines.join('\n');
}

function formatTrailingActivated(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`**Client: ${n.channelName || 'N/A'}**`);
  lines.push(`**Signal Bot: ${n.signalBotName || 'N/A'}**`);
  lines.push(`**Symbol: ${n.symbol}**`);
  lines.push('');
  lines.push(`Trailing stop activated`);
  
  if (n.trailingType) {
    lines.push(`Type: ${n.trailingType}`);
  }
  
  return lines.join('\n');
}

function formatTrailingUpdate(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`Entity: Order`);
  lines.push(`Exchange: ${n.exchange}`);
  lines.push(`Client: ${n.channelName || 'N/A'}`);
  if (n.signalBotName) lines.push(`Signal Bot: ${n.signalBotName}`);
  lines.push(`Symbol: **${n.symbol}**`);
  lines.push(`Status: **Updated**`);
  lines.push(`Reason:`);
  
  if (n.type === 'TRAILING_TP_UPDATED') {
    lines.push(`Type: Trailing Take-Profit`);
    if (n.orderTarget) lines.push(`Target: ${n.orderTarget}`);
    lines.push(`Price: ${n.trailingPrice}`);
  } else {
    lines.push(`Type: Stop`);
    if (n.orderTarget) lines.push(`Target: ${n.orderTarget}`);
    lines.push(`Amount: ${n.amountUsd?.toFixed(4) || 'N/A'} USDT`);
    lines.push(`Price: ${n.stopLoss}`);
  }
  
  return lines.join('\n');
}

function formatBreakevenActivated(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`**Symbol: ${n.symbol}**`);
  lines.push('');
  lines.push(`Breakeven stop activated after TP${n.triggerTarget || 1}`);
  
  return lines.join('\n');
}

function formatEntryFilled(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`${n.exchange} #${n.symbol}`);
  lines.push(`Entry target ${n.orderTarget?.split('/')[0] || '1'} achieved`);
  lines.push(`Entry Price: ${n.entryPrice} 💵`);
  
  return lines.join('\n');
}

function formatAllEntriesFilled(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`${n.exchange} #${n.symbol}`);
  lines.push('All entry targets achieved');
  lines.push(`Average Entry Price: ${n.entryPrice} 💵`);
  
  return lines.join('\n');
}

function formatSignalParseError(n: TradingNotification): string {
  const lines: string[] = [];
  
  if (n.channelName) lines.push(`**Channel: ${n.channelName}**`);
  lines.push(`**Symbol: ${n.symbol}**`);
  lines.push(`**Exchanges: ${n.exchange}**`);
  lines.push(`The signal you've just posted was not parsed properly:`);
  lines.push(`**${n.errorMessage}**`);
  
  return lines.join('\n');
}

function formatTradeEdited(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push('The trade was edited successfully:');
  lines.push(`**Client:** ${n.channelName || 'N/A'}`);
  lines.push(`⚡⚡ ${n.symbol} ⚡⚡`);
  lines.push(`Exchange: ${n.exchange}`);
  lines.push(`Trade Type: Regular (${n.direction?.toLowerCase()})`);
  
  if (n.leverage) {
    lines.push(`Leverage: Cross (${n.leverage}.0X)`);
  }
  
  // Entry targets with checkmarks
  if (n.entryTargets && n.entryTargets.length > 0) {
    lines.push('Entry Orders:');
    n.entryTargets.forEach((t, i) => {
      const check = t.filled ? '✅' : '';
      lines.push(`  ${i + 1}) ${t.price} - ${t.percentage}%${check}`);
    });
  }
  
  // Take-profit targets with checkmarks
  if (n.tpTargets && n.tpTargets.length > 0) {
    lines.push('Take-Profit Orders:');
    n.tpTargets.forEach((t, i) => {
      const check = t.hit ? '✅' : '';
      lines.push(`  ${i + 1}) ${t.price} - ${t.percentage}%${check}`);
    });
  }
  
  // Stop-loss
  if (n.stopLoss) {
    lines.push('Stop-loss Orders:');
    lines.push(`  1) ${n.stopLoss} - 100.0%`);
  }
  
  return lines.join('\n');
}

function formatOrderRejected(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`**Client: ${n.exchange}**`);
  if (n.signalBotName) lines.push(`**Signal Bot: ${n.signalBotName}**`);
  if (n.channelName) lines.push(`**Channel: ${n.channelName}**`);
  lines.push(`**Symbol: ${n.symbol}**`);
  lines.push(`**The trade could not be opened** - ${n.errorMessage}`);
  
  return lines.join('\n');
}

function formatRiskAlert(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push('⚠️ **Risk Alert**');
  lines.push('');
  lines.push(`Symbol: ${n.symbol}`);
  lines.push(`Alert: ${n.errorMessage}`);
  
  return lines.join('\n');
}

// ==================== CORNIX-STYLE NEW FORMATTERS ====================

function formatSignalPublished(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`⚡⚡ #${n.symbol} ⚡⚡`);
  lines.push(`Exchanges: ${n.exchange}`);
  lines.push(`Signal Type: Regular (${n.direction?.toLowerCase()})`);
  
  if (n.leverage) {
    lines.push(`Leverage: ${n.leverage}X`);
  }
  
  // Entry targets
  if (n.entryTargets && n.entryTargets.length > 0) {
    lines.push('Entry Targets:');
    n.entryTargets.forEach((t, i) => {
      const check = t.filled ? ' ✅' : '';
      lines.push(`  ${i + 1}) ${t.price}${check}`);
    });
  }
  
  // Take-profit targets
  if (n.tpTargets && n.tpTargets.length > 0) {
    lines.push('Take-Profit Targets:');
    n.tpTargets.forEach((t, i) => {
      lines.push(`  ${i + 1}) ${t.price}`);
    });
  }
  
  // Stop-loss
  if (n.stopLoss) {
    lines.push('Stop Targets:');
    lines.push(`  1) ${n.stopLoss}`);
  }
  
  // Trailing config
  if (n.trailingType) {
    lines.push(`Trailing Configuration: ${n.trailingType}`);
  }
  
  if (n.signalBotName) {
    lines.push(`Published By: ${n.signalBotName}`);
  }
  
  return lines.join('\n');
}

function formatCancelledTargetAchieved(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`${n.exchange} #${n.symbol}`);
  lines.push('Cancelled ❌ Target achieved before entering the entry zone');
  
  return lines.join('\n');
}

function formatClosedOppositeSignal(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`${n.exchange} #${n.symbol}`);
  lines.push('Closed due to opposite direction signal ⚠');
  
  if (n.pnlPercent !== undefined) {
    const sign = n.pnlPercent >= 0 ? '' : '';
    const emoji = n.pnlPercent >= 0 ? '📈' : '📉';
    lines.push(`${n.pnlPercent >= 0 ? 'Profit' : 'Loss'}: ${Math.abs(n.pnlPercent).toFixed(4)}% ${emoji}`);
  }
  
  if (n.period) {
    lines.push(`Period: ${n.period} ⏰`);
  }
  
  return lines.join('\n');
}

function formatClosedTrailingAfterTP(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`${n.exchange} #${n.symbol}`);
  lines.push('Closed at trailing stoploss after reaching take profit ⚠');
  
  if (n.pnlPercent !== undefined) {
    lines.push(`Profit: ${n.pnlPercent.toFixed(4)}% 📈`);
  }
  
  return lines.join('\n');
}

function formatClosedStopAfterTP(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`${n.exchange} #${n.symbol}`);
  lines.push('Closed at stoploss after reaching take profit ⚠');
  
  if (n.pnlPercent !== undefined) {
    lines.push(`Profit: ${n.pnlPercent.toFixed(4)}% 📈`);
  }
  
  return lines.join('\n');
}

function formatManuallyCancelled(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`#${n.symbol} Manually Cancelled`);
  
  if (n.pnlPercent !== undefined) {
    const emoji = n.pnlPercent >= 0 ? '📈' : '📉';
    const label = n.pnlPercent >= 0 ? 'Profit' : 'Loss';
    lines.push(`${label}: ${Math.abs(n.pnlPercent).toFixed(4)}% ${emoji}`);
  }
  
  if (n.period) {
    lines.push(`Period: ${n.period} ⏰`);
  }
  
  return lines.join('\n');
}

function formatPlanLimitReached(n: TradingNotification): string {
  const lines: string[] = [];
  
  if (n.isDemo) {
    lines.push('**[Demo Trading]**');
  }
  
  lines.push(`**Client: ${n.exchange}**`);
  if (n.signalBotName) lines.push(`**Signal Bot: ${n.signalBotName}**`);
  if (n.channelName) lines.push(`**Channel: ${n.channelName}**`);
  lines.push(`**Symbol: ${n.symbol}**`);
  
  if (n.data?.activeTrades) {
    lines.push(`You've already reached the plan limit of ${n.data.activeTrades} active trades. Upgrade your plan to increase the limit.`);
  } else {
    lines.push("You've already reached the plan limit of active trades. Upgrade your plan to increase the limit.");
  }
  
  return lines.join('\n');
}

function formatTradeStatusUpdate(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`Entity: Trade`);
  lines.push(`Exchange: ${n.exchange}`);
  if (n.channelName) lines.push(`Client: ${n.channelName}`);
  if (n.signalBotName) lines.push(`Signal Bot: ${n.signalBotName}`);
  lines.push(`Symbol: **${n.symbol}**`);
  lines.push(`Status: **In Progress**`);
  lines.push(`Reason: **${n.errorMessage || 'TPs Updated'}**`);
  
  return lines.join('\n');
}

function formatDefault(n: TradingNotification): string {
  const lines: string[] = [];
  
  lines.push(`**${n.type}**`);
  if (n.symbol) lines.push(`Symbol: ${n.symbol}`);
  if (n.errorMessage) lines.push(`Message: ${n.errorMessage}`);
  
  return lines.join('\n');
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get emoji for notification type
 */
export function getNotificationEmoji(type: TradingNotificationType): string {
  const emojis: Record<TradingNotificationType, string> = {
    TRADE_OPENED: '🟢',
    TRADE_CLOSED: '🔴',
    TRADE_CANCELLED: '❌',
    TRADE_EDITED: '✏️',
    ORDER_PLACED: '📝',
    ORDER_FILLED: '✅',
    ORDER_CANCELLED: '❌',
    ORDER_REJECTED: '⚠️',
    ORDER_UPDATED: '🔄',
    TP_HIT: '🎯',
    TP_TARGET_HIT: '✅',
    ALL_TP_HIT: '😎',
    SL_HIT: '⛔',
    TRAILING_STOP_HIT: '📈',
    LIQUIDATION: '💥',
    // Cornix-style exit reasons
    CANCELLED_TARGET_ACHIEVED: '❌',
    CLOSED_OPPOSITE_SIGNAL: '⚠️',
    CLOSED_TRAILING_AFTER_TP: '📈',
    CLOSED_STOP_AFTER_TP: '⚠️',
    MANUALLY_CANCELLED: '🚫',
    PLAN_LIMIT_REACHED: '⚠️',
    TRADE_STATUS_UPDATE: '📊',
    // Trailing events
    TRAILING_ACTIVATED: '📈',
    TRAILING_TP_UPDATED: '🔄',
    TRAILING_SL_UPDATED: '🔄',
    BREAKEVEN_ACTIVATED: '⚖️',
    // Entry events
    ENTRY_FILLED: '✅',
    ALL_ENTRIES_FILLED: '💵',
    ENTRY_MISSED: '❌',
    // Signal events
    SIGNAL_RECEIVED: '📡',
    SIGNAL_PARSED: '📊',
    SIGNAL_REJECTED: '🚫',
    SIGNAL_PARSE_ERROR: '⚠️',
    SIGNAL_PUBLISHED: '⚡',
    // Risk events
    RISK_ALERT: '🚨',
    MARGIN_WARNING: '💸',
    POSITION_LIMIT_REACHED: '⚠️',
    // System events
    BOT_STARTED: '🤖',
    BOT_STOPPED: '⏹️',
    BOT_ERROR: '⚠️',
    SYNC_COMPLETE: '🔄',
  };
  return emojis[type] || '📢';
}

/**
 * Get priority for notification type
 */
export function getNotificationPriority(type: TradingNotificationType): NotificationPriority {
  const critical: TradingNotificationType[] = ['LIQUIDATION', 'RISK_ALERT', 'MARGIN_WARNING'];
  const high: TradingNotificationType[] = [
    'SL_HIT', 
    'ORDER_REJECTED', 
    'BOT_ERROR', 
    'SIGNAL_PARSE_ERROR',
    'CLOSED_OPPOSITE_SIGNAL',
    'PLAN_LIMIT_REACHED'
  ];
  const low: TradingNotificationType[] = [
    'ORDER_PLACED', 
    'TRAILING_ACTIVATED', 
    'BOT_STARTED', 
    'BOT_STOPPED', 
    'SYNC_COMPLETE',
    'SIGNAL_RECEIVED',
    'SIGNAL_PARSED',
    'TRADE_STATUS_UPDATE'
  ];
  
  if (critical.includes(type)) return 'critical';
  if (high.includes(type)) return 'high';
  if (low.includes(type)) return 'low';
  return 'medium';
}

/**
 * Format period from milliseconds
 */
export function formatPeriod(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  
  const parts: string[] = [];
  
  if (months > 0) {
    parts.push(`${months} Month${months > 1 ? 's' : ''}`);
  }
  if (days % 30 > 0) {
    parts.push(`${days % 30} Day${days % 30 > 1 ? 's' : ''}`);
  }
  if (hours % 24 > 0) {
    parts.push(`${hours % 24} Hour${hours % 24 > 1 ? 's' : ''}`);
  }
  if (minutes % 60 > 0 && days === 0) {
    parts.push(`${minutes % 60} Minute${minutes % 60 > 1 ? 's' : ''}`);
  }
  
  return parts.join(' ') || '0 Minutes';
}

/**
 * Generate unique notification ID
 */
export function generateNotificationId(): string {
  return `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ==================== NOTIFICATION BUILDER ====================

export class TradingNotificationBuilder {
  private notification: TradingNotification;

  constructor(type: TradingNotificationType) {
    this.notification = {
      id: generateNotificationId(),
      type,
      priority: getNotificationPriority(type),
      timestamp: new Date(),
    };
  }

  symbol(symbol: string): this {
    this.notification.symbol = symbol;
    return this;
  }

  direction(direction: 'LONG' | 'SHORT'): this {
    this.notification.direction = direction;
    return this;
  }

  exchange(exchange: string): this {
    this.notification.exchange = exchange;
    return this;
  }

  demo(isDemo: boolean = true): this {
    this.notification.isDemo = isDemo;
    return this;
  }

  position(positionId: string): this {
    this.notification.positionId = positionId;
    return this;
  }

  entry(price: number, amountUsd?: number): this {
    this.notification.entryPrice = price;
    this.notification.amountUsd = amountUsd;
    return this;
  }

  exit(price: number): this {
    this.notification.exitPrice = price;
    return this;
  }

  currentPrice(price: number): this {
    this.notification.currentPrice = price;
    return this;
  }

  stopLoss(sl: number): this {
    this.notification.stopLoss = sl;
    return this;
  }

  takeProfit(tp: number): this {
    this.notification.takeProfit = tp;
    return this;
  }

  leverage(lev: number): this {
    this.notification.leverage = lev;
    return this;
  }

  pnl(pnl: number, percent: number): this {
    this.notification.pnl = pnl;
    this.notification.pnlPercent = percent;
    return this;
  }

  amount(amount: number, usd?: number): this {
    this.notification.amount = amount;
    this.notification.amountUsd = usd;
    return this;
  }

  orderTarget(target: string): this {
    this.notification.orderTarget = target;
    return this;
  }

  orderType(type: 'MARKET' | 'LIMIT' | 'STOP'): this {
    this.notification.orderType = type;
    return this;
  }

  trailing(type: string, price?: number): this {
    this.notification.trailingType = type;
    this.notification.trailingPrice = price;
    return this;
  }

  trigger(target: number): this {
    this.notification.triggerTarget = target;
    return this;
  }

  channel(name: string): this {
    this.notification.channelName = name;
    return this;
  }

  bot(name: string): this {
    this.notification.signalBotName = name;
    return this;
  }

  error(code: string, message: string): this {
    this.notification.errorCode = code;
    this.notification.errorMessage = message;
    return this;
  }

  period(period: string): this {
    this.notification.period = period;
    return this;
  }

  entryTargets(targets: EntryTarget[]): this {
    this.notification.entryTargets = targets;
    return this;
  }

  tpTargets(targets: TPTarget[]): this {
    this.notification.tpTargets = targets;
    return this;
  }

  data(data: Record<string, unknown>): this {
    this.notification.data = data;
    return this;
  }

  build(): TradingNotification {
    return { ...this.notification };
  }

  format(): string {
    return formatNotification(this.notification);
  }
}

// ==================== EXPORT ====================

export default {
  formatNotification,
  getNotificationEmoji,
  getNotificationPriority,
  formatPeriod,
  generateNotificationId,
  TradingNotificationBuilder,
};
