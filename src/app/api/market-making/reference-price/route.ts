/**
 * Reference Price API
 * 
 * GET /api/market-making/reference-price
 * Get reference price from configured source
 * 
 * POST /api/market-making/reference-price
 * Update reference price configuration
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  ReferencePriceManager,
  BinancePriceSource,
  BybitPriceSource,
  OKXPriceSource,
  calculateWeightedPrice,
} from '@/lib/trading/market-making/reference-price-manager';
import { PriceSourceType } from '@/lib/trading/market-making/types';

// Cache for reference price managers
const managers = new Map<string, ReferencePriceManager>();

/**
 * GET - Get reference price for a symbol
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') || 'BTC/USDT';
    const source = searchParams.get('source') as PriceSourceType || PriceSourceType.EXTERNAL;
    const exchange = searchParams.get('exchange') || 'binance';

    // Get or create manager
    let manager = managers.get(symbol);
    
    if (!manager) {
      manager = new ReferencePriceManager(symbol, {
        sourceType: source,
        exchangeName: exchange,
        deviationThresholdPercent: 0.5,
      });
      managers.set(symbol, manager);
    }

    // Get reference price
    const price = await manager.getReferencePrice();

    return NextResponse.json({
      success: true,
      symbol,
      price: {
        price: price.price,
        source: price.source,
        bid: price.bid,
        ask: price.ask,
        volume24h: price.volume24h,
        timestamp: price.timestamp,
        spread: price.bid && price.ask
          ? ((price.ask - price.bid) / price.price * 100).toFixed(4)
          : null,
      },
    });
  } catch (error) {
    console.error('Reference price error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get reference price' 
      },
      { status: 500 }
    );
  }
}

/**
 * POST - Get reference prices from multiple sources
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      symbol = 'BTC/USDT', 
      sources = ['binance', 'bybit', 'okx'],
      weights = { binance: 1.0, bybit: 0.8, okx: 0.7 },
    } = body;

    const results: Array<{
      source: string;
      price?: number;
      bid?: number;
      ask?: number;
      volume24h?: number;
      error?: string;
    }> = [];

    // Fetch from each source
    const sourceInstances: Record<string, BinancePriceSource | BybitPriceSource | OKXPriceSource> = {
      binance: new BinancePriceSource(),
      bybit: new BybitPriceSource(),
      okx: new OKXPriceSource(),
    };

    const validPrices: ReturnType<typeof calculateWeightedPrice extends Promise<infer T> ? never : T>[] = [];

    for (const sourceName of sources) {
      const sourceInstance = sourceInstances[sourceName];
      
      if (!sourceInstance) {
        results.push({ source: sourceName, error: 'Unknown source' });
        continue;
      }

      try {
        const price = await sourceInstance.getPrice(symbol);
        results.push({
          source: sourceName,
          price: price.price,
          bid: price.bid,
          ask: price.ask,
          volume24h: price.volume24h,
        });
        validPrices.push(price);
      } catch (error) {
        results.push({
          source: sourceName,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    // Calculate weighted price if multiple sources
    let weightedPrice = null;
    if (validPrices.length > 1) {
      weightedPrice = calculateWeightedPrice(validPrices, weights);
    }

    return NextResponse.json({
      success: true,
      symbol,
      sources: results,
      weighted: weightedPrice ? {
        price: weightedPrice.price,
        bid: weightedPrice.bid,
        ask: weightedPrice.ask,
        volume24h: weightedPrice.volume24h,
      } : null,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Reference price multi-source error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get reference prices' 
      },
      { status: 500 }
    );
  }
}
