/**
 * Market Making Status API
 * 
 * GET /api/market-making/status
 * Get current market making status
 */

import { NextRequest, NextResponse } from 'next/server';
import { activeSessions } from '../start/route';
import { MarketMakingStatus } from '@/lib/trading/market-making/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    // If sessionId provided, return specific session status
    if (sessionId) {
      const session = activeSessions.get(sessionId);

      if (!session) {
        return NextResponse.json(
          { error: 'Session not found' },
          { status: 404 }
        );
      }

      // Calculate uptime
      const uptimeSeconds = Math.floor(
        (Date.now() - new Date(session.startedAt).getTime()) / 1000
      );

      return NextResponse.json({
        sessionId: session.sessionId,
        config: session.config,
        accountId: session.accountId,
        exchange: session.exchange,
        status: session.status,
        startedAt: session.startedAt,
        lastUpdate: session.lastUpdate,
        statistics: {
          ...session.statistics,
          uptimeSeconds,
        },
        openOrders: session.openOrders || [],
        referencePrice: session.referencePrice || null,
      });
    }

    // Return all active sessions summary
    const sessions = Array.from(activeSessions.values()).map(session => ({
      sessionId: session.sessionId,
      symbol: session.config.symbol,
      exchange: session.exchange,
      status: session.status,
      startedAt: session.startedAt,
      lastUpdate: session.lastUpdate,
      statistics: session.statistics,
    }));

    return NextResponse.json({
      active: sessions.length,
      sessions,
    });
  } catch (error) {
    console.error('Market making status error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get status' },
      { status: 500 }
    );
  }
}

/**
 * Update statistics for a session
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, statistics, referencePrice, openOrders } = body;

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

    // Update provided fields
    if (statistics) {
      session.statistics = { ...session.statistics, ...statistics };
    }
    if (referencePrice) {
      session.referencePrice = referencePrice;
    }
    if (openOrders) {
      session.openOrders = openOrders;
    }
    session.lastUpdate = new Date();

    return NextResponse.json({
      success: true,
      sessionId,
      lastUpdate: session.lastUpdate,
    });
  } catch (error) {
    console.error('Market making status update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update status' },
      { status: 500 }
    );
  }
}
