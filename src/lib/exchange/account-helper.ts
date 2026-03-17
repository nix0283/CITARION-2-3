/**
 * Exchange Account Helper
 * 
 * Provides unified access to exchange account credentials from the database.
 * Handles both encrypted and legacy API credentials.
 */

import { db } from '@/lib/db';
import { decryptApiCredentials, type ApiCredentials } from '@/lib/encryption';
import type { ExchangeId } from './types';

export interface ExchangeAccount {
  id: string;
  userId: string;
  exchangeId: string;
  accountType: string;
  isTestnet: boolean;
  credentials: ApiCredentials;
}

/**
 * Get active exchange account with decrypted credentials
 */
export async function getExchangeAccount(
  exchange: ExchangeId,
  options?: {
    userId?: string;
    accountType?: 'REAL' | 'DEMO';
  }
): Promise<ExchangeAccount | null> {
  const account = await db.account.findFirst({
    where: {
      exchangeId: exchange,
      isActive: true,
      ...(options?.userId && { userId: options.userId }),
      ...(options?.accountType && { accountType: options.accountType }),
    },
  });

  if (!account) {
    return null;
  }

  // Decrypt API credentials if encrypted, otherwise use legacy fields
  let credentials: ApiCredentials;

  if (account.encryptedApiCredentials) {
    try {
      credentials = await decryptApiCredentials(account.encryptedApiCredentials);
    } catch (e) {
      console.error('[ExchangeAccountHelper] Failed to decrypt credentials:', e);
      // Fall back to legacy fields
      credentials = {
        apiKey: account.apiKey || '',
        apiSecret: account.apiSecret || '',
        passphrase: account.apiPassphrase || undefined,
        uid: account.apiUid || undefined,
      };
    }
  } else {
    // Use legacy fields
    credentials = {
      apiKey: account.apiKey || '',
      apiSecret: account.apiSecret || '',
      passphrase: account.apiPassphrase || undefined,
      uid: account.apiUid || undefined,
    };
  }

  return {
    id: account.id,
    userId: account.userId,
    exchangeId: account.exchangeId,
    accountType: account.accountType,
    isTestnet: account.isTestnet,
    credentials,
  };
}

/**
 * Get all active exchange accounts with decrypted credentials
 */
export async function getActiveExchangeAccounts(
  options?: {
    userId?: string;
    exchange?: ExchangeId;
    accountType?: 'REAL' | 'DEMO';
  }
): Promise<ExchangeAccount[]> {
  const accounts = await db.account.findMany({
    where: {
      isActive: true,
      ...(options?.userId && { userId: options.userId }),
      ...(options?.exchange && { exchangeId: options.exchange }),
      ...(options?.accountType && { accountType: options.accountType }),
    },
  });

  const result: ExchangeAccount[] = [];

  for (const account of accounts) {
    let credentials: ApiCredentials;

    if (account.encryptedApiCredentials) {
      try {
        credentials = await decryptApiCredentials(account.encryptedApiCredentials);
      } catch {
        credentials = {
          apiKey: account.apiKey || '',
          apiSecret: account.apiSecret || '',
          passphrase: account.apiPassphrase || undefined,
          uid: account.apiUid || undefined,
        };
      }
    } else {
      credentials = {
        apiKey: account.apiKey || '',
        apiSecret: account.apiSecret || '',
        passphrase: account.apiPassphrase || undefined,
        uid: account.apiUid || undefined,
      };
    }

    result.push({
      id: account.id,
      userId: account.userId,
      exchangeId: account.exchangeId,
      accountType: account.accountType,
      isTestnet: account.isTestnet,
      credentials,
    });
  }

  return result;
}
