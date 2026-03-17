/**
 * Market Making Start API
 * 
 * POST /api/market-making/start
 * Start a market making session
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  MarketMakingConfig,
  StartMarketMakingRequest,
  StartMarketMakingResponse,
  MarketMakingStatus,
  DEFAULT_SPREAD_CONFIG,
  DEFAULT_ORDER_BOOK_CONFIG,
  DEFAULT_REFERENCE_PRICE_CONFIG,
  DEFAULT_VOLUME_CONFIG,
  VolumeProfile,
  PriceSourceType,
} from '@/lib/trading/market-making/types';

// In-memory storage for active sessions (in production, use Redis or database)
const activeSessions = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    const body: StartMarketMakingRequest = await request.json();
    const { config, accountId, exchange } = body;

    // Validate request
    if (!config || !accountId || !exchange) {
      return NextResponse.json(
        { error: 'Missing required fields: config, accountId, exchange' },
        { status: 400 }
      );
    }

    // Validate symbol
    if (!config.symbol) {
      return NextResponse.json(
        { error: 'Symbol is required' },
        { status: 400 }
      );
    }

    // Generate session ID
    const sessionId = `mm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create session record
    const session = {
      sessionId,
      config: {
        symbol: config.symbol,
        spread: {
          minSpreadPercent: config.spread?.minSpreadPercent ?? DEFAULT_SPREAD_CONFIG.minSpreadPercent,
          maxSpreadPercent: config.spread?.maxSpreadPercent ?? DEFAULT_SPREAD_CONFIG.maxSpreadPercent,
          allowedSpreadDeviation: config.spread?.allowedSpreadDeviation ?? DEFAULT_SPREAD_CONFIG.allowedSpreadDeviation,
        },
        orderBook: {
          bidsCount: config.orderBook?.bidsCount ?? DEFAULT_ORDER_BOOK_CONFIG.bidsCount,
          asksCount: config.orderBook?.asksCount ?? DEFAULT_ORDER_BOOK_CONFIG.asksCount,
          volumeProfile: config.orderBook?.volumeProfile ?? VolumeProfile.DECREASING,
          volumeMultiplier: config.orderBook?.volumeMultiplier ?? DEFAULT_ORDER_BOOK_CONFIG.volumeMultiplier,
        },
        referencePrice: {
          sourceType: config.referencePrice?.sourceType ?? PriceSourceType.EXTERNAL,
          exchangeName: config.referencePrice?.exchangeName,
          symbol: config.referencePrice?.symbol,
          deviationThresholdPercent: config.referencePrice?.deviationThresholdPercent ?? DEFAULT_REFERENCE_PRICE_CONFIG.deviationThresholdPercent,
        },
        volume: {
          dailyVolumePercent: config.volume?.dailyVolumePercent ?? DEFAULT_VOLUME_CONFIG.dailyVolumePercent,
          targetCumulativeVolumePercent: config.volume?.targetCumulativeVolumePercent ?? DEFAULT_VOLUME_CONFIG.targetCumulativeVolumePercent,
          minOrderSize: config.volume?.minOrderSize ?? DEFAULT_VOLUME_CONFIG.minOrderSize,
          maxOrderSize: config.volume?.maxOrderSize ?? DEFAULT_VOLUME_CONFIG.maxOrderSize,
        },
        paperTrading: config.paperTrading ?? false,
        maxPositionSize: config.maxPositionSize ?? 1000,
      },
      accountId,
      exchange,
      status: MarketMakingStatus.RUNNING,
      startedAt: new Date(),
      lastUpdate: new Date(),
      statistics: {
        totalOrdersCreated: 0,
        totalOrdersFilled: 0,
        fillRate: 0,
        totalVolumeTraded: 0,
        totalPnl: 0,
        unrealizedPnl: 0,
        averageSpreadCaptured: 0,
        uptimeSeconds: 0,
        currentPosition: 0,
      },
    };

    // Store session
    activeSessions.set(sessionId, session);

    const response: StartMarketMakingResponse = {
      success: true,
      sessionId,
      status: MarketMakingStatus.RUNNING,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Market making start error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to start market making' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return list of active sessions
  const sessions = Array.from(activeSessions.values()).map(session => ({
    sessionId: session.sessionId,
    symbol: session.config.symbol,
    exchange: session.exchange,
    status: session.status,
    startedAt: session.startedAt,
  }));

  return NextResponse.json({ sessions });
}

// Export for use in other routes
export { activeSessions };
