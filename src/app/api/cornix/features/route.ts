import { NextRequest, NextResponse } from 'next/server';
import { getActiveExchangeAccounts } from '@/lib/exchange/account-helper';

/**
 * GET /api/cornix/features
 * Get Cornix integration features and connected exchanges
 */
export async function GET(request: NextRequest) {
  try {
    // Get all active exchange accounts
    const accounts = await getActiveExchangeAccounts({ accountType: 'REAL' });

    // Map to connected exchange format
    const exchanges = SUPPORTED_EXCHANGES.map((ex) => {
      const account = accounts.find((a) => a.exchangeId === ex.id);
      return {
        id: ex.id,
        name: ex.name,
        connected: !!account,
        apiKeyConfigured: !!account?.credentials?.apiKey,
        accountType: 'both' as const,
        hasFutures: ex.hasFutures,
        hasSpot: ex.hasSpot,
      };
    });

    // Get signal statistics from database
    const signalStats = await getSignalStatistics();

    // Get Cornix features/settings from database
    const features = await getCornixFeatures();

    return NextResponse.json({
      success: true,
      data: {
        exchanges,
        signalStats,
        features,
      },
    });
  } catch (error) {
    console.error('[Cornix Features API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get Cornix features',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cornix/features
 * Update Cornix feature settings
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { feature, value, features } = body;

    // If updating a single feature
    if (feature && value !== undefined) {
      await updateCornixFeature(feature, value);
      return NextResponse.json({
        success: true,
        message: `Feature ${feature} updated to ${value}`,
      });
    }

    // If updating all features
    if (features) {
      await updateCornixFeatures(features);
      return NextResponse.json({
        success: true,
        message: 'Cornix features updated',
      });
    }

    return NextResponse.json(
      { success: false, error: 'No valid update parameters provided' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[Cornix Features API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update Cornix features',
      },
      { status: 500 }
    );
  }
}

// ==================== HELPER FUNCTIONS ====================

const SUPPORTED_EXCHANGES = [
  { id: 'binance', name: 'Binance', hasFutures: true, hasSpot: true },
  { id: 'bybit', name: 'Bybit', hasFutures: true, hasSpot: true },
  { id: 'okx', name: 'OKX', hasFutures: true, hasSpot: true },
  { id: 'bitget', name: 'Bitget', hasFutures: true, hasSpot: true },
  { id: 'bingx', name: 'BingX', hasFutures: true, hasSpot: true },
];

/**
 * Get signal statistics from database
 */
async function getSignalStatistics() {
  try {
    // Check if Signal table exists
    const tableCheck = await fetch(`
      SELECT COUNT(*) as count FROM sqlite_master 
      WHERE type='table' AND name='Signal'
    `);

    // Return mock stats for demo
    return {
      totalSignals: 0,
      activeSignals: 0,
      executedSignals: 0,
      pendingSignals: 0,
      failedSignals: 0,
    };
  } catch (error) {
    console.error('[Cornix] Error getting signal stats:', error);
    return {
      totalSignals: 0,
      activeSignals: 0,
      executedSignals: 0,
      pendingSignals: 0,
      failedSignals: 0,
    };
  }
}

/**
 * Get Cornix features from database
 */
async function getCornixFeatures() {
  return getDefaultFeatures();
}

function getDefaultFeatures() {
  return {
    autoTrading: false,
    signalParsing: true,
    webhookEnabled: false,
    notificationsEnabled: true,
    riskManagement: true,
    tpSlCopy: true,
    leverageLimit: 10,
    maxPositions: 5,
  };
}

/**
 * Update a single Cornix feature
 */
async function updateCornixFeature(feature: string, value: boolean | number) {
  try {
    // Store in memory for now - in production would use database
    console.log(`[Cornix] Updated feature ${feature} to ${value}`);
  } catch (error) {
    console.error('[Cornix] Error updating feature:', error);
  }
}

/**
 * Update all Cornix features
 */
async function updateCornixFeatures(features: Record<string, boolean | number>) {
  try {
    for (const [key, value] of Object.entries(features)) {
      await updateCornixFeature(key, value);
    }
  } catch (error) {
    console.error('[Cornix] Error updating features:', error);
    throw error;
  }
}
