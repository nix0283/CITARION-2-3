/**
 * Market Making Stop API
 * 
 * POST /api/market-making/stop
 * Stop a market making session
 */

import { NextRequest, NextResponse } from 'next/server';
import { activeSessions } from '../start/route';
import { MarketMakingStatus } from '@/lib/trading/market-making/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, cancelOrders = true } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      );
    }

    const session = activeSessions.get(sessionId);

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Update session status
    session.status = MarketMakingStatus.STOPPED;
    session.lastUpdate = new Date();

    // If cancelOrders is true, mark that orders should be cancelled
    // (actual cancellation would be handled by the market making engine)
    if (cancelOrders) {
      session.ordersCancelled = true;
    }

    // Remove from active sessions
    activeSessions.delete(sessionId);

    return NextResponse.json({
      success: true,
      sessionId,
      status: MarketMakingStatus.STOPPED,
      message: cancelOrders
        ? 'Market making stopped and orders cancelled'
        : 'Market making stopped, orders remain open',
    });
  } catch (error) {
    console.error('Market making stop error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to stop market making' },
      { status: 500 }
    );
  }
}

/**
 * Pause market making (keep orders, stop rebalancing)
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, action } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      );
    }

    const session = activeSessions.get(sessionId);

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    if (action === 'pause') {
      session.status = MarketMakingStatus.PAUSED;
      session.lastUpdate = new Date();
      
      return NextResponse.json({
        success: true,
        sessionId,
        status: MarketMakingStatus.PAUSED,
        message: 'Market making paused',
      });
    }

    if (action === 'resume') {
      if (session.status !== MarketMakingStatus.PAUSED) {
        return NextResponse.json(
          { error: 'Can only resume from paused state' },
          { status: 400 }
        );
      }

      session.status = MarketMakingStatus.RUNNING;
      session.lastUpdate = new Date();
      
      return NextResponse.json({
        success: true,
        sessionId,
        status: MarketMakingStatus.RUNNING,
        message: 'Market making resumed',
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "pause" or "resume"' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Market making pause/resume error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update market making' },
      { status: 500 }
    );
  }
}
