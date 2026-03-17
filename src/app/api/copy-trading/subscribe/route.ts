import { NextRequest, NextResponse } from 'next/server';
import { getExchangeClient } from '@/lib/exchange';
import { getExchangeAccount } from '@/lib/exchange/account-helper';
import { ExchangeId } from '@/lib/exchange/types';

/**
 * POST /api/copy-trading/subscribe
 * Subscribe to copy a trader
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      exchange, 
      traderId, 
      copyMode, 
      amount,
      maxAmountPerTrade 
    } = body as {
      exchange: ExchangeId;
      traderId: string;
      copyMode: 'fixed' | 'ratio' | 'percentage';
      amount: number;
      maxAmountPerTrade?: number;
    };

    if (!exchange || !traderId || !copyMode || !amount) {
      return NextResponse.json(
        { error: 'Missing required parameters: exchange, traderId, copyMode, amount' },
        { status: 400 }
      );
    }

    // Check if exchange supports API subscription
    const supportedExchanges: ExchangeId[] = ['okx', 'bitget'];
    if (!supportedExchanges.includes(exchange)) {
      return NextResponse.json(
        { 
          error: `${exchange} does not support API-based subscription. Use the exchange's web UI.`,
          errorCode: 'NOT_SUPPORTED',
          success: false 
        },
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

    // Subscribe to trader
    const result = await client.copyTraderSubscribe({
      traderId,
      copyMode,
      amount,
      maxAmountPerTrade,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[Copy Trading Subscribe API] Error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to subscribe',
        success: false 
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/copy-trading/subscribe
 * Unsubscribe from a trader
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const exchange = searchParams.get('exchange') as ExchangeId;
    const traderId = searchParams.get('traderId');

    if (!exchange || !traderId) {
      return NextResponse.json(
        { error: 'Missing required parameters: exchange, traderId' },
        { status: 400 }
      );
    }

    // Check if exchange supports API subscription
    const supportedExchanges: ExchangeId[] = ['okx', 'bitget'];
    if (!supportedExchanges.includes(exchange)) {
      return NextResponse.json(
        { 
          error: `${exchange} does not support API-based unsubscription. Use the exchange's web UI.`,
          errorCode: 'NOT_SUPPORTED',
          success: false 
        },
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

    // Unsubscribe from trader
    const result = await client.copyTraderUnsubscribe(traderId);

    return NextResponse.json(result);
  } catch (error) {
    console.error('[Copy Trading Unsubscribe API] Error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to unsubscribe',
        success: false 
      },
      { status: 500 }
    );
  }
}
