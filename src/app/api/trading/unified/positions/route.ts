/**
 * Unified Trading Positions API
 */

import { NextRequest, NextResponse } from 'next/server';
import { unifiedTradingEngine, type TradingConfig, type TradingMode, type TrailingStopConfig } from '@/lib/trading/unified-engine';
import { getServerSession } from 'next-auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const mode = searchParams.get('mode') as TradingMode | null;
    const exchangeId = searchParams.get('exchangeId');
    const symbol = searchParams.get('symbol');
    const direction = searchParams.get('direction');
    
    let userId = 'system';
    try {
      const session = await getServerSession();
      if (session?.user?.id) {
        userId = session.user.id;
      }
    } catch {}
    
    const config: Partial<TradingConfig> = {};
    if (mode) config.mode = mode;
    if (exchangeId) config.exchangeId = exchangeId;
    
    let positions = await unifiedTradingEngine.getOpenPositions(userId, config);
    
    if (symbol) {
      positions = positions.filter(p => p.symbol === symbol);
    }
    if (direction) {
      positions = positions.filter(p => p.direction === direction);
    }
    
    const totalUnrealizedPnl = positions.reduce((sum, p) => sum + (p.unrealizedPnl || 0), 0);
    const totalRealizedPnl = positions.reduce((sum, p) => sum + (p.realizedPnl || 0), 0);
    
    return NextResponse.json({
      success: true,
      count: positions.length,
      positions,
      summary: {
        totalUnrealizedPnl,
        totalRealizedPnl,
        totalPnl: totalUnrealizedPnl + totalRealizedPnl,
      },
    });
    
  } catch (error) {
    console.error('[PositionsAPI] GET error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      errorCode: 'SERVER_ERROR',
    }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { positionId, stopLoss, takeProfit, trailingStop } = body;
    
    if (!positionId) {
      return NextResponse.json({
        success: false,
        error: 'Position ID is required',
        errorCode: 'MISSING_POSITION_ID',
      }, { status: 400 });
    }
    
    let userId = 'system';
    try {
      const session = await getServerSession();
      if (session?.user?.id) {
        userId = session.user.id;
      }
    } catch {}
    
    const result = await unifiedTradingEngine.updatePosition(positionId, {
      stopLoss,
      takeProfit,
      trailingStop: trailingStop as TrailingStopConfig,
    });
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('[PositionsAPI] PATCH error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      errorCode: 'SERVER_ERROR',
    }, { status: 500 });
  }
}
