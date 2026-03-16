/**
 * Unified Trading API
 * Single API endpoint for all trading operations
 */

import { NextRequest, NextResponse } from 'next/server';
import { unifiedTradingEngine, SignalParser, type TradingConfig, type TradingMode, type SignalSource } from '@/lib/trading/unified-engine';
import { getServerSession } from 'next-auth';

interface TradeRequest {
  signalText?: string;
  signal?: {
    symbol: string;
    direction: 'LONG' | 'SHORT';
    entryPrices: number[];
    takeProfits: Array<{ price: number; percentage: number }>;
    stopLoss?: number;
    leverage?: number;
    marginMode?: 'isolated' | 'cross';
    marketType?: 'SPOT' | 'FUTURES';
    trailingConfig?: any;
  };
  config: {
    mode: TradingMode;
    exchangeId: string;
    marketType?: 'SPOT' | 'FUTURES';
    accountId?: string;
    defaultLeverage?: number;
    defaultAmountPercent?: number;
    signalFilter?: any;
  };
  source: SignalSource;
  metadata?: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  try {
    const body: TradeRequest = await request.json();
    
    if (!body.signalText && !body.signal) {
      return NextResponse.json({
        success: false,
        error: 'Either signalText or signal is required',
        errorCode: 'MISSING_SIGNAL',
      }, { status: 400 });
    }
    
    if (!body.config?.mode || !body.config?.exchangeId) {
      return NextResponse.json({
        success: false,
        error: 'Trading config with mode and exchangeId is required',
        errorCode: 'MISSING_CONFIG',
      }, { status: 400 });
    }
    
    let userId = 'system';
    try {
      const session = await getServerSession();
      if (session?.user?.id) {
        userId = session.user.id;
      }
    } catch {
      if (body.metadata?.userId) {
        userId = body.metadata.userId as string;
      }
    }
    
    let parsedSignal;
    if (body.signalText) {
      parsedSignal = SignalParser.parse(body.signalText);
      if (!parsedSignal) {
        return NextResponse.json({
          success: false,
          error: 'Failed to parse signal text',
          errorCode: 'PARSE_ERROR',
        }, { status: 400 });
      }
    } else {
      parsedSignal = {
        symbol: body.signal!.symbol,
        direction: body.signal!.direction,
        action: body.signal!.direction === 'LONG' ? 'BUY' : 'SELL',
        entryPrices: body.signal!.entryPrices,
        takeProfits: body.signal!.takeProfits,
        stopLoss: body.signal!.stopLoss,
        leverage: body.signal!.leverage || body.config.defaultLeverage || 10,
        marginMode: body.signal!.marginMode || 'isolated',
        marketType: body.signal!.marketType || body.config.marketType || 'FUTURES',
        signalType: 'REGULAR',
        trailingConfig: body.signal!.trailingConfig,
      };
    }
    
    const config: TradingConfig = {
      mode: body.config.mode,
      exchangeId: body.config.exchangeId,
      marketType: body.config.marketType || 'FUTURES',
      defaultLeverage: body.config.defaultLeverage,
      defaultAmountPercent: body.config.defaultAmountPercent,
      signalFilter: body.config.signalFilter,
    };
    
    const result = await unifiedTradingEngine.executeTrade({
      userId,
      accountId: body.config.accountId,
      signal: parsedSignal,
      config,
      source: body.source,
      metadata: body.metadata,
    });
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('[UnifiedTradingAPI] POST error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      errorCode: 'SERVER_ERROR',
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const mode = searchParams.get('mode') as TradingMode | null;
    const exchangeId = searchParams.get('exchangeId');
    const symbol = searchParams.get('symbol');
    
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
    
    const positions = await unifiedTradingEngine.getOpenPositions(userId, config);
    
    const filteredPositions = symbol 
      ? positions.filter(p => p.symbol === symbol)
      : positions;
    
    return NextResponse.json({
      success: true,
      count: filteredPositions.length,
      positions: filteredPositions,
    });
    
  } catch (error) {
    console.error('[UnifiedTradingAPI] GET error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      errorCode: 'SERVER_ERROR',
    }, { status: 500 });
  }
}
