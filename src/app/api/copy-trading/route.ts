import { NextRequest, NextResponse } from 'next/server';
import { getExchangeClient } from '@/lib/exchange';
import { getActiveExchangeAccounts } from '@/lib/exchange/account-helper';
import { ExchangeId } from '@/lib/exchange/types';

/**
 * GET /api/copy-trading
 * Get copy trading status and settings for all exchanges
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const exchange = searchParams.get('exchange') as ExchangeId | null;

    // Get all active exchange accounts
    const accounts = await getActiveExchangeAccounts({
      accountType: 'REAL',
      exchange: exchange || undefined,
    });

    const results = [];

    for (const account of accounts) {
      try {
        const client = getExchangeClient({
          exchangeId: account.exchangeId as ExchangeId,
          credentials: {
            apiKey: account.credentials.apiKey,
            apiSecret: account.credentials.apiSecret,
            passphrase: account.credentials.passphrase,
          },
        });

        // Get lead trader status
        const status = await client.getLeadTraderStatus();

        results.push({
          exchange: account.exchangeId,
          isLeadTrader: status.isLeadTrader,
          followersCount: status.followersCount,
          subscriptions: 0,
          apiSupport: {
            publicApi: account.exchangeId === 'okx' || account.exchangeId === 'bitget',
            subscribe: account.exchangeId === 'okx' || account.exchangeId === 'bitget',
            manageFollowers: account.exchangeId === 'okx' || account.exchangeId === 'bitget',
          },
        });
      } catch (error) {
        results.push({
          exchange: account.exchangeId,
          error: error instanceof Error ? error.message : 'Failed to get status',
          apiSupport: {
            publicApi: account.exchangeId === 'okx' || account.exchangeId === 'bitget',
            subscribe: account.exchangeId === 'okx' || account.exchangeId === 'bitget',
            manageFollowers: account.exchangeId === 'okx' || account.exchangeId === 'bitget',
          },
        });
      }
    }

    // API Support summary
    const apiSupport = {
      okx: { publicApi: true, subscribe: true, manageFollowers: true, docs: 'https://www.okx.com/docs-v5/en/#copy-trading-rest-api' },
      bitget: { publicApi: true, subscribe: true, manageFollowers: true, docs: 'https://bitgetlimited.github.io/apidoc/en/copyTrade' },
      binance: { publicApi: false, subscribe: false, manageFollowers: false, docs: 'https://developers.binance.com/docs/copy_trading/future-copy-trading' },
      bybit: { publicApi: false, subscribe: false, manageFollowers: false, docs: 'https://bybit-exchange.github.io/docs/v5/copytrade' },
      bingx: { publicApi: false, subscribe: false, manageFollowers: false, docs: 'https://bingx-api.github.io/docs/' },
    };

    return NextResponse.json({
      success: true,
      data: results,
      apiSupport,
      totalConnections: accounts.length,
      activeSubscriptions: results.reduce((acc, r) => acc + (r.subscriptions || 0), 0),
    });
  } catch (error) {
    console.error('[Copy Trading API] Error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to get copy trading status',
        success: false 
      },
      { status: 500 }
    );
  }
}
