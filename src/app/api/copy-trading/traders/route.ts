import { NextRequest, NextResponse } from 'next/server';
import { getExchangeClient } from '@/lib/exchange';
import { ExchangeId } from '@/lib/exchange/types';

/**
 * GET /api/copy-trading/traders
 * Get list of top copy traders for a specific exchange
 * This is PUBLIC data - no authentication required
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const exchange = searchParams.get('exchange') as ExchangeId;
    const limit = parseInt(searchParams.get('limit') || '20');
    const sortBy = searchParams.get('sortBy') || 'roi';

    if (!exchange) {
      return NextResponse.json(
        { error: 'Exchange parameter is required' },
        { status: 400 }
      );
    }

    // Check if exchange supports public copy trading API
    const publicApiExchanges: ExchangeId[] = ['okx', 'bitget'];
    if (!publicApiExchanges.includes(exchange)) {
      return NextResponse.json(
        { 
          error: `${exchange} does not provide public copy trading data via API`,
          errorCode: 'NOT_SUPPORTED',
          success: false,
          data: [],
        },
        { status: 200 }
      );
    }

    // Create a public client (no credentials needed for public data)
    const client = getExchangeClient({
      exchangeId: exchange,
      credentials: {
        apiKey: 'public',
        apiSecret: 'public',
      },
    });
    
    // Get trader list (this is public data)
    const traders = await client.getCopyTraderList(limit, sortBy);

    return NextResponse.json({
      success: true,
      data: traders,
      exchange,
      apiSupport: {
        publicApi: true,
        subscribe: true,
        manageFollowers: exchange === 'okx',
      },
    });
  } catch (error) {
    console.error('[Copy Trading Traders API] Error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to get traders',
        success: false,
        data: [],
      },
      { status: 500 }
    );
  }
}
