import { NextRequest, NextResponse } from 'next/server';
import { getExchangeClient } from '@/lib/exchange';
import { getExchangeAccount } from '@/lib/exchange/account-helper';
import { ExchangeId } from '@/lib/exchange/types';

/**
 * GET /api/copy-trading/positions
 * Get current positions of copy traders
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const exchange = searchParams.get('exchange') as ExchangeId;
    const traderId = searchParams.get('traderId');

    if (!exchange) {
      return NextResponse.json(
        { error: 'Exchange parameter is required' },
        { status: 400 }
      );
    }

    // Get user's exchange account
    const account = await getExchangeAccount(exchange, { accountType: 'REAL' });

    if (!account) {
      return NextResponse.json(
        { error: 'No active connection for this exchange' },
        { status: 404 }
      );
    }

    // Get exchange client
    const client = getExchangeClient({
      exchangeId: exchange,
      credentials: {
        apiKey: account.credentials.apiKey,
        apiSecret: account.credentials.apiSecret,
        passphrase: account.credentials.passphrase,
      },
    });
    
    // Get positions
    let positions;
    if (traderId) {
      // Get positions for specific trader
      positions = await client.getCopyTraderPositions(traderId);
    } else {
      // Get master trader's positions if the user is a lead trader
      try {
        positions = await client.getMasterPositions();
      } catch {
        // If not a master trader, return empty
        positions = [];
      }
    }

    return NextResponse.json({
      success: true,
      data: positions,
      exchange,
      count: positions.length,
    });
  } catch (error) {
    console.error('[Copy Trading Positions API] Error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to get positions',
        success: false 
      },
      { status: 500 }
    );
  }
}
