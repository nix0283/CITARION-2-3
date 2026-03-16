/**
 * Trading Notifications API
 * 
 * API endpoints for:
 * - Getting trading notifications
 * - Creating notifications for trade events
 * - SSE stream for real-time notifications
 */

import { NextRequest, NextResponse } from 'next/server';
import { tradingNotificationsService } from '@/lib/trading/trading-notifications-service';
import { formatNotification, getNotificationEmoji, TradingNotificationType } from '@/lib/trading/trading-notifications';

// GET /api/trading/notifications - Get recent notifications
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const count = parseInt(searchParams.get('count') || '20');
  const symbol = searchParams.get('symbol');
  const positionId = searchParams.get('positionId');

  // SSE stream for real-time notifications
  const accept = request.headers.get('accept') || '';
  if (accept.includes('text/event-stream')) {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Send initial connection message
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'connected' })}\n\n`));

        // Subscribe to notifications
        const unsubscribe = tradingNotificationsService.subscribe((notification) => {
          try {
            const data = JSON.stringify({
              ...notification,
              formatted: formatNotification(notification),
              emoji: getNotificationEmoji(notification.type),
            });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          } catch (error) {
            console.error('[SSE] Error sending notification:', error);
          }
        });

        // Heartbeat every 30 seconds
        const heartbeat = setInterval(() => {
          try {
            controller.enqueue(encoder.encode(`: heartbeat\n\n`));
          } catch {
            clearInterval(heartbeat);
            unsubscribe();
          }
        }, 30000);

        // Cleanup on close
        request.signal.addEventListener('abort', () => {
          clearInterval(heartbeat);
          unsubscribe();
          controller.close();
        });
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  }

  // Regular JSON response
  try {
    const notifications = tradingNotificationsService.getRecent(count);
    
    // Add formatted messages
    const formattedNotifications = notifications.map(n => ({
      ...n,
      formatted: formatNotification(n),
      emoji: getNotificationEmoji(n.type),
    }));

    return NextResponse.json({
      success: true,
      count: formattedNotifications.length,
      notifications: formattedNotifications,
    });
  } catch (error) {
    console.error('[API] Error getting notifications:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get notifications' },
      { status: 500 }
    );
  }
}

// POST /api/trading/notifications - Create a notification (for testing/events)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, data } = body;

    if (!eventType || !data) {
      return NextResponse.json(
        { success: false, error: 'Missing eventType or data' },
        { status: 400 }
      );
    }

    let notification;

    // Route to appropriate notification method
    switch (eventType) {
      case 'TRADE_OPENED':
        notification = await tradingNotificationsService.notifyTradeOpened({
          symbol: data.symbol,
          direction: data.direction,
          exchange: data.exchange || 'binance',
          isDemo: data.isDemo ?? true,
          positionId: data.positionId,
          entryPrice: data.entryPrice,
          avgEntryPrice: data.avgEntryPrice,
          stopLoss: data.stopLoss,
          leverage: data.leverage,
          channelName: data.channelName,
          signalBotName: data.signalBotName,
          entryTargets: data.entryTargets,
          tpTargets: data.tpTargets,
          currentPrice: data.currentPrice || data.entryPrice,
        });
        break;

      case 'TP_HIT':
        notification = await tradingNotificationsService.notifyTPHit(
          {
            symbol: data.symbol,
            direction: data.direction,
            exchange: data.exchange || 'binance',
            isDemo: data.isDemo ?? true,
            positionId: data.positionId,
            entryPrice: data.entryPrice,
            currentPrice: data.currentPrice,
          },
          data.targetIndex || 1,
          data.totalTargets || 1,
          data.pnl || 0,
          data.pnlPercent || 0,
          data.periodMs || 0
        );
        break;

      case 'SL_HIT':
        notification = await tradingNotificationsService.notifySLHit(
          {
            symbol: data.symbol,
            direction: data.direction,
            exchange: data.exchange || 'binance',
            isDemo: data.isDemo ?? true,
            positionId: data.positionId,
            entryPrice: data.entryPrice,
            currentPrice: data.currentPrice,
          },
          data.pnl || 0,
          data.pnlPercent || 0,
          data.periodMs || 0
        );
        break;

      case 'TRADE_CLOSED':
        notification = await tradingNotificationsService.notifyTradeClosed(
          {
            symbol: data.symbol,
            direction: data.direction,
            exchange: data.exchange || 'binance',
            isDemo: data.isDemo ?? true,
            positionId: data.positionId,
            entryPrice: data.entryPrice,
            currentPrice: data.currentPrice,
            pnl: data.pnl,
            pnlPercent: data.pnlPercent,
          },
          data.closeReason || 'MANUAL',
          data.periodMs || 0
        );
        break;

      case 'ENTRY_FILLED':
        notification = await tradingNotificationsService.notifyEntryFilled(
          {
            symbol: data.symbol,
            direction: data.direction,
            exchange: data.exchange || 'binance',
            isDemo: data.isDemo ?? true,
            positionId: data.positionId,
            entryPrice: data.entryPrice,
            currentPrice: data.currentPrice,
          },
          data.targetIndex || 1,
          data.totalTargets || 1
        );
        break;

      case 'TRAILING_ACTIVATED':
        notification = await tradingNotificationsService.notifyTrailingActivated(
          {
            symbol: data.symbol,
            direction: data.direction,
            exchange: data.exchange || 'binance',
            isDemo: data.isDemo ?? true,
            positionId: data.positionId,
            entryPrice: data.entryPrice,
            currentPrice: data.currentPrice,
            trailingType: data.trailingType,
            trailingPrice: data.trailingPrice,
            channelName: data.channelName,
            signalBotName: data.signalBotName,
          },
          data.triggerTarget || 1
        );
        break;

      case 'BREAKEVEN_ACTIVATED':
        notification = await tradingNotificationsService.notifyBreakevenActivated(
          {
            symbol: data.symbol,
            direction: data.direction,
            exchange: data.exchange || 'binance',
            isDemo: data.isDemo ?? true,
            positionId: data.positionId,
            entryPrice: data.entryPrice,
            avgEntryPrice: data.avgEntryPrice,
            currentPrice: data.currentPrice,
          },
          data.triggerTarget || 1
        );
        break;

      case 'ORDER_FILLED':
        notification = await tradingNotificationsService.notifyOrderFilled({
          symbol: data.symbol,
          exchange: data.exchange || 'binance',
          orderType: data.orderType || 'MARKET',
          target: data.target,
          price: data.price,
          amount: data.amount,
          type: 'FILLED',
        });
        break;

      case 'SIGNAL_PARSE_ERROR':
        notification = await tradingNotificationsService.notifySignalParseError(
          data.symbol || 'UNKNOWN',
          data.channelName || 'Unknown',
          data.exchanges || ['binance'],
          data.errorMessage || 'Unknown error'
        );
        break;

      case 'RISK_ALERT':
        notification = await tradingNotificationsService.notifyRiskAlert(
          data.symbol || 'SYSTEM',
          data.message || 'Risk alert',
          data.data
        );
        break;

      default:
        return NextResponse.json(
          { success: false, error: `Unknown event type: ${eventType}` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      notification: {
        ...notification,
        formatted: formatNotification(notification),
        emoji: getNotificationEmoji(notification.type),
      },
    });
  } catch (error) {
    console.error('[API] Error creating notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}
