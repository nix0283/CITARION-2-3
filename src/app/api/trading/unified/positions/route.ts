/**
 * Unified Trading Positions API
 */

import { NextRequest, NextResponse } from 'next/server';
import { unifiedTradingEngine, type TradingMode, type TrailingStopConfig } from '@/lib/trading/unified-engine';
import { getDefaultUser } from '@/lib/auth-utils';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const mode = searchParams.get('mode') as TradingMode | null;
    const exchangeId = searchParams.get('exchangeId');
    const symbol = searchParams.get('symbol');
    const direction = searchParams.get('direction');
    const accountId = searchParams.get('accountId');
    
    // Get user ID - use default user if no session
    let userId: string;
    try {
      const defaultUser = await getDefaultUser();
      userId = defaultUser.id;
    } catch {
      userId = 'system';
    }
    
    // Build query - include both OPEN and ACTIVE status
    const whereClause: any = {
      account: { userId },
      status: { in: ['OPEN', 'ACTIVE'] },
    };
    
    if (mode === 'DEMO' || mode === 'PAPER') {
      whereClause.isDemo = true;
    } else if (mode === 'LIVE') {
      whereClause.isDemo = false;
    }
    
    if (accountId) {
      whereClause.accountId = accountId;
    }
    
    // Fetch positions from database
    const positions = await db.position.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        account: {
          select: {
            exchangeId: true,
            exchangeName: true,
          },
        },
      },
    });
    
    // Filter by symbol if provided
    let filteredPositions = positions;
    if (symbol) {
      filteredPositions = filteredPositions.filter(p => p.symbol === symbol);
    }
    if (direction) {
      filteredPositions = filteredPositions.filter(p => p.direction === direction);
    }
    
    const totalUnrealizedPnl = filteredPositions.reduce((sum, p) => sum + (p.unrealizedPnl || 0), 0);
    const totalRealizedPnl = filteredPositions.reduce((sum, p) => sum + (p.realizedPnl || 0), 0);
    
    return NextResponse.json({
      success: true,
      count: filteredPositions.length,
      positions: filteredPositions.map(p => ({
        id: p.id,
        accountId: p.accountId,
        symbol: p.symbol,
        direction: p.direction,
        status: p.status,
        totalAmount: p.totalAmount,
        filledAmount: p.filledAmount,
        avgEntryPrice: p.avgEntryPrice,
        currentPrice: p.currentPrice,
        leverage: p.leverage,
        stopLoss: p.stopLoss,
        takeProfit: p.takeProfit,
        trailingStop: p.trailingStop ? JSON.parse(p.trailingStop) : null,
        trailingActivated: p.trailingActivated,
        highestPrice: p.highestPrice,
        lowestPrice: p.lowestPrice,
        unrealizedPnl: p.unrealizedPnl,
        realizedPnl: p.realizedPnl,
        isDemo: p.isDemo,
        source: p.source,
        openedAt: p.createdAt,
        exchangeId: p.account?.exchangeId,
        exchangeName: p.account?.exchangeName,
      })),
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
