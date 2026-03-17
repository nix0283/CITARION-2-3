/**
 * Unified Trading Close Position API
 */

import { NextRequest, NextResponse } from 'next/server';
import { unifiedTradingEngine } from '@/lib/trading/unified-engine';
import { getDefaultUser } from '@/lib/auth-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { positionId, reason, mode } = body;
    
    // Get user ID - use default user if no session
    let userId: string;
    try {
      const user = await getDefaultUser();
      userId = user.id;
    } catch {
      userId = 'system';
    }
    
    if (positionId) {
      const result = await unifiedTradingEngine.closePosition(
        positionId,
        userId,
        reason || 'MANUAL'
      );
      return NextResponse.json(result);
    }
    
    const result = await unifiedTradingEngine.closeAllPositions(
      userId,
      mode ? { mode, exchangeId: 'binance' } : {}
    );
    
    return NextResponse.json({
      success: true,
      closed: result.closed,
      totalPnL: result.totalPnL,
      errors: result.errors,
    });
    
  } catch (error) {
    console.error('[UnifiedTradingCloseAPI] Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      errorCode: 'SERVER_ERROR',
    }, { status: 500 });
  }
}
