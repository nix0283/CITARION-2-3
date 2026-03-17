/**
 * Market Making Distribution API
 * 
 * POST /api/market-making/distribution
 * Calculates order book distribution preview
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  DistributionPreviewRequest,
  DistributionPreviewResponse,
  OrderBookDistribution,
  SpreadConfig,
  OrderBookConfig,
  VolumeConfig,
  VolumeProfile,
  SymbolMarketInfo,
} from '@/lib/trading/market-making/types';
import {
  OrderBookDistributionCalculator,
  createDistributionCalculator,
} from '@/lib/trading/market-making/order-book-distribution';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: DistributionPreviewRequest = await request.json();

    // Validate required fields
    if (!body.symbol || !body.referencePrice || body.referencePrice <= 0) {
      return NextResponse.json(
        { error: 'Invalid request: symbol and referencePrice are required' },
        { status: 400 }
      );
    }

    // Create default market info if not provided
    const marketInfo: SymbolMarketInfo = {
      symbol: body.symbol,
      base: body.symbol.replace(/USDT?$/, ''),
      quote: body.symbol.includes('USD') ? 'USD' : 'USDT',
      tickSize: 0.01,
      stepSize: 0.001,
      minQty: 0.001,
      maxQty: 10000,
      minNotional: 10,
      pricePrecision: 2,
      qtyPrecision: 3,
    };

    // Use provided config or defaults
    const spreadConfig: SpreadConfig = body.spread || {
      minSpreadPercent: 2,
      maxSpreadPercent: 6,
      allowedSpreadDeviation: 0.1,
    };

    const orderBookConfig: OrderBookConfig = body.orderBook || {
      bidsCount: 5,
      asksCount: 5,
      volumeProfile: VolumeProfile.DECREASING,
      volumeMultiplier: 1.5,
    };

    const volumeConfig: VolumeConfig = body.volume || {
      dailyVolumePercent: 2,
      targetCumulativeVolumePercent: 3,
      minOrderSize: 0.001,
      maxOrderSize: 100,
    };

    // Create calculator
    const calculator = new OrderBookDistributionCalculator(
      orderBookConfig,
      spreadConfig,
      volumeConfig
    );

    // Calculate distribution
    const distribution = calculator.computeDistribution({
      referencePrice: body.referencePrice,
      dailyBaseVolume: body.dailyBaseVolume || 1000,
      dailyQuoteVolume: body.dailyQuoteVolume || 1000000,
      availableBase: body.availableBase || 1,
      availableQuote: body.availableQuote || 10000,
      marketInfo,
    });

    // Check for warnings
    const warnings: string[] = [];

    // Check if orders can be placed with available funds
    if (distribution.totalBidVolume > (body.availableQuote || 0)) {
      warnings.push(
        `Insufficient quote balance: need ${distribution.totalBidVolume.toFixed(2)}, have ${(body.availableQuote || 0).toFixed(2)}`
      );
    }

    if (distribution.totalAskVolume > (body.availableBase || 0)) {
      warnings.push(
        `Insufficient base balance: need ${distribution.totalAskVolume.toFixed(4)}, have ${(body.availableBase || 0).toFixed(4)}`
      );
    }

    // Check spread compliance
    const spreadCheck = calculator.isSpreadCompliant(
      distribution.bids,
      distribution.asks
    );

    if (!spreadCheck.compliant) {
      warnings.push(
        `Spread not within configured range: min ${spreadCheck.minSpread.toFixed(2)}%, max ${spreadCheck.maxSpread.toFixed(2)}%`
      );
    }

    // Check if any orders would be below minimum notional
    const minNotional = marketInfo.minNotional;
    const belowMinNotional = [...distribution.bids, ...distribution.asks].filter(
      o => o.price * o.quantity < minNotional
    );

    if (belowMinNotional.length > 0) {
      warnings.push(
        `${belowMinNotional.length} orders below minimum notional (${minNotional} ${marketInfo.quote})`
      );
    }

    const response: DistributionPreviewResponse = {
      distribution,
      warnings,
      valid: warnings.length === 0,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Market making distribution error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to calculate distribution' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Return default configuration
  return NextResponse.json({
    defaultConfig: {
      spread: {
        minSpreadPercent: 2,
        maxSpreadPercent: 6,
        allowedSpreadDeviation: 0.1,
      },
      orderBook: {
        bidsCount: 5,
        asksCount: 5,
        volumeProfile: 'DECREASING',
        volumeMultiplier: 1.5,
      },
      volume: {
        dailyVolumePercent: 2,
        targetCumulativeVolumePercent: 3,
        minOrderSize: 0.001,
        maxOrderSize: 100,
      },
    },
    supportedVolumeProfiles: ['DECREASING', 'INCREASING', 'UNIFORM'],
    maxOrdersPerSide: 10,
  });
}
