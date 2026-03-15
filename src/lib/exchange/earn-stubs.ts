/**
 * Earn Methods Stubs for Exchange Clients
 * 
 * This file provides default implementations for Earn methods
 * that can be mixed into exchange clients.
 * 
 * Exchanges with full support:
 * - Binance (implemented in binance-client.ts)
 * - Bybit (V5 API /v5/earn/*)
 * - OKX (V5 API /api/v5/finance/*)
 * - Bitget (V2 API /api/v2/earn/*)
 * 
 * Exchanges with limited/no support:
 * - BingX (no documented Earn API)
 */

import type {
  EarnProduct,
  EarnPosition,
  EarnAccount,
  EarnProductsList,
  EarnResult,
  EarnHistoryItem,
  EarnProductType,
  SubscribeEarnParams,
  RedeemEarnParams,
} from "./types";

/**
 * Empty earn account for exchanges without Earn support
 */
export function getEmptyEarnAccount(exchange: string): EarnAccount {
  return {
    exchange: exchange as any,
    totalPrincipal: 0,
    totalPendingInterest: 0,
    totalInterestEarned: 0,
    totalValue: 0,
    totalFlexible: 0,
    totalLocked: 0,
    positionCount: 0,
    positions: [],
    timestamp: new Date(),
  };
}

/**
 * Empty earn products list
 */
export function getEmptyEarnProductsList(exchange: string): EarnProductsList {
  return {
    exchange: exchange as any,
    products: [],
    hasMore: false,
    timestamp: new Date(),
  };
}

/**
 * Bybit Earn Implementation
 * 
 * Bybit V5 API endpoints:
 * - GET /v5/earn/product - List products
 * - GET /v5/earn/position - Get positions
 * - POST /v5/earn/subscribe - Subscribe
 * - POST /v5/earn/redeem - Redeem
 */
export class BybitEarnClient {
  private signedRequest: (method: "GET" | "POST", endpoint: string, params?: Record<string, unknown>) => Promise<unknown>;
  
  constructor(signedRequest: BybitEarnClient["signedRequest"]) {
    this.signedRequest = signedRequest;
  }
  
  async getProducts(asset?: string, type?: EarnProductType): Promise<EarnProductsList> {
    try {
      const params: Record<string, unknown> = {};
      if (asset) params.coin = asset;
      
      const data = await this.signedRequest("GET", "/v5/earn/product", params) as {
        list?: Array<{
          productId: string;
          coin: string;
          interestRate: string;
          minAmount: string;
          maxAmount?: string;
          remainingQuota?: string;
          period?: number;
          status: string;
        }>;
      };
      
      const products: EarnProduct[] = (data.list || []).map((p) => ({
        productId: p.productId,
        exchange: "bybit",
        type: p.period ? "LOCKED" : "FLEXIBLE" as EarnProductType,
        asset: p.coin,
        apy: parseFloat(p.interestRate) * 100,
        minAmount: parseFloat(p.minAmount),
        maxAmount: p.maxAmount ? parseFloat(p.maxAmount) : undefined,
        remainingQuota: p.remainingQuota ? parseFloat(p.remainingQuota) : undefined,
        lockDuration: p.period,
        status: p.status === "OPERABLE" ? "SUBSCRIBABLE" : "UNSUBSCRIBABLE" as const,
        timestamp: new Date(),
      }));
      
      return {
        exchange: "bybit",
        products,
        hasMore: false,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error("[Bybit] Error fetching earn products:", error);
      return getEmptyEarnProductsList("bybit");
    }
  }
  
  async getPositions(asset?: string): Promise<EarnAccount> {
    try {
      const params: Record<string, unknown> = {};
      if (asset) params.coin = asset;
      
      const data = await this.signedRequest("GET", "/v5/earn/position", params) as {
        list?: Array<{
          positionId: string;
          productId: string;
          coin: string;
          amount: string;
          interestAccumulated: string;
          interestRate: string;
          period?: number;
          createTime: string;
          status: string;
        }>;
      };
      
      const positions: EarnPosition[] = (data.list || []).map((p) => ({
        positionId: p.positionId,
        exchange: "bybit",
        productId: p.productId,
        type: p.period ? "LOCKED" : "FLEXIBLE" as EarnProductType,
        asset: p.coin,
        principal: parseFloat(p.amount),
        pendingInterest: 0,
        totalInterest: parseFloat(p.interestAccumulated),
        totalValue: parseFloat(p.amount) + parseFloat(p.interestAccumulated),
        apy: parseFloat(p.interestRate) * 100,
        subscribeTime: new Date(parseInt(p.createTime)),
        canRedeem: p.status === "OPERABLE",
        timestamp: new Date(),
      }));
      
      const totalPrincipal = positions.reduce((sum, p) => sum + p.principal, 0);
      const totalInterest = positions.reduce((sum, p) => sum + p.totalInterest, 0);
      
      return {
        exchange: "bybit",
        totalPrincipal,
        totalPendingInterest: 0,
        totalInterestEarned: totalInterest,
        totalValue: totalPrincipal + totalInterest,
        totalFlexible: positions.filter(p => p.type === "FLEXIBLE").reduce((s, p) => s + p.totalValue, 0),
        totalLocked: positions.filter(p => p.type === "LOCKED").reduce((s, p) => s + p.totalValue, 0),
        positionCount: positions.length,
        positions,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error("[Bybit] Error fetching earn positions:", error);
      return getEmptyEarnAccount("bybit");
    }
  }
  
  async subscribe(params: SubscribeEarnParams): Promise<EarnResult> {
    try {
      const data = await this.signedRequest("POST", "/v5/earn/subscribe", {
        productId: params.productId,
        amount: params.amount,
      }) as { orderId?: string };
      
      return { success: true, transactionId: data.orderId };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
  
  async redeem(params: RedeemEarnParams): Promise<EarnResult> {
    try {
      const data = await this.signedRequest("POST", "/v5/earn/redeem", {
        positionId: params.positionId,
        amount: params.amount,
      }) as { redemptionId?: string };
      
      return { success: true, transactionId: data.redemptionId };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

/**
 * OKX Earn Implementation
 * 
 * OKX V5 API endpoints:
 * - GET /api/v5/finance/savings/balance - Get savings balance
 * - GET /api/v5/finance/savings/products - Get products
 * - POST /api/v5/finance/savings/purchase - Subscribe
 * - POST /api/v5/finance/savings/redeem - Redeem
 */
export class OKXEarnClient {
  private signedRequest: (method: "GET" | "POST", path: string, params?: Record<string, unknown>) => Promise<unknown>;
  
  constructor(signedRequest: OKXEarnClient["signedRequest"]) {
    this.signedRequest = signedRequest;
  }
  
  async getProducts(asset?: string, type?: EarnProductType): Promise<EarnProductsList> {
    try {
      // OKX has different endpoints for savings and staking
      const endpoint = type === "LOCKED" 
        ? "/api/v5/finance/staking-products"
        : "/api/v5/finance/savings/products";
      
      const params: Record<string, unknown> = {};
      if (asset) params.ccy = asset;
      
      const data = await this.signedRequest("GET", endpoint, params) as Array<{
        productId: string;
        ccy: string;
        rate: string;
        minAmt: string;
        maxAmt?: string;
        term?: string;
        state: string;
      }>;
      
      const products: EarnProduct[] = (data || []).map((p) => ({
        productId: p.productId,
        exchange: "okx",
        type: p.term ? "LOCKED" : "FLEXIBLE" as EarnProductType,
        asset: p.ccy,
        apy: parseFloat(p.rate) * 100,
        minAmount: parseFloat(p.minAmt),
        maxAmount: p.maxAmt ? parseFloat(p.maxAmt) : undefined,
        lockDuration: p.term ? parseInt(p.term) : undefined,
        status: p.state === "open" ? "SUBSCRIBABLE" : "UNSUBSCRIBABLE" as const,
        timestamp: new Date(),
      }));
      
      return {
        exchange: "okx",
        products,
        hasMore: false,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error("[OKX] Error fetching earn products:", error);
      return getEmptyEarnProductsList("okx");
    }
  }
  
  async getPositions(asset?: string): Promise<EarnAccount> {
    try {
      const params: Record<string, unknown> = {};
      if (asset) params.ccy = asset;
      
      const data = await this.signedRequest("GET", "/api/v5/finance/savings/balance", params) as Array<{
        productId: string;
        ccy: string;
        amt: string;
        availBal: string;
        interest: string;
        rate: string;
        state: string;
      }>;
      
      const positions: EarnPosition[] = (data || []).map((p) => ({
        positionId: p.productId,
        exchange: "okx",
        productId: p.productId,
        type: "FLEXIBLE" as EarnProductType,
        asset: p.ccy,
        principal: parseFloat(p.amt),
        pendingInterest: 0,
        totalInterest: parseFloat(p.interest),
        totalValue: parseFloat(p.amt) + parseFloat(p.interest),
        apy: parseFloat(p.rate) * 100,
        subscribeTime: new Date(),
        canRedeem: p.state === "1",
        timestamp: new Date(),
      }));
      
      const totalPrincipal = positions.reduce((sum, p) => sum + p.principal, 0);
      const totalInterest = positions.reduce((sum, p) => sum + p.totalInterest, 0);
      
      return {
        exchange: "okx",
        totalPrincipal,
        totalPendingInterest: 0,
        totalInterestEarned: totalInterest,
        totalValue: totalPrincipal + totalInterest,
        totalFlexible: totalPrincipal,
        totalLocked: 0,
        positionCount: positions.length,
        positions,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error("[OKX] Error fetching earn positions:", error);
      return getEmptyEarnAccount("okx");
    }
  }
  
  async subscribe(params: SubscribeEarnParams): Promise<EarnResult> {
    try {
      const data = await this.signedRequest("POST", "/api/v5/finance/savings/purchase", {
        productId: params.productId,
        amt: params.amount,
      }) as { orderId?: string };
      
      return { success: true, transactionId: data.orderId };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
  
  async redeem(params: RedeemEarnParams): Promise<EarnResult> {
    try {
      const data = await this.signedRequest("POST", "/api/v5/finance/savings/redeem", {
        productId: params.positionId,
        amt: params.amount,
      }) as { redemptionId?: string };
      
      return { success: true, transactionId: data.redemptionId };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

/**
 * Bitget Earn Implementation
 * 
 * Bitget V2 API endpoints:
 * - GET /api/v2/earn/savings/product - Get products
 * - GET /api/v2/earn/savings/account - Get account
 * - POST /api/v2/earn/savings/subscribe - Subscribe
 * - POST /api/v2/earn/savings/redeem - Redeem
 */
export class BitgetEarnClient {
  private signedRequest: (method: "GET" | "POST", path: string, params?: Record<string, unknown>) => Promise<unknown>;
  
  constructor(signedRequest: BitgetEarnClient["signedRequest"]) {
    this.signedRequest = signedRequest;
  }
  
  async getProducts(asset?: string, type?: EarnProductType): Promise<EarnProductsList> {
    try {
      const endpoint = type === "LOCKED"
        ? "/api/v2/earn/fixed/product"
        : "/api/v2/earn/savings/product";
      
      const params: Record<string, unknown> = {};
      if (asset) params.coin = asset;
      
      const data = await this.signedRequest("GET", endpoint, params) as {
        productList?: Array<{
          productId: string;
          coin: string;
          rate: string;
          minAmount: string;
          maxAmount?: string;
          period?: number;
          status: string;
        }>;
      };
      
      const products: EarnProduct[] = (data.productList || []).map((p) => ({
        productId: p.productId,
        exchange: "bitget",
        type: p.period ? "LOCKED" : "FLEXIBLE" as EarnProductType,
        asset: p.coin,
        apy: parseFloat(p.rate),
        minAmount: parseFloat(p.minAmount),
        maxAmount: p.maxAmount ? parseFloat(p.maxAmount) : undefined,
        lockDuration: p.period,
        status: p.status === "ongoing" ? "SUBSCRIBABLE" : "UNSUBSCRIBABLE" as const,
        timestamp: new Date(),
      }));
      
      return {
        exchange: "bitget",
        products,
        hasMore: false,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error("[Bitget] Error fetching earn products:", error);
      return getEmptyEarnProductsList("bitget");
    }
  }
  
  async getPositions(asset?: string): Promise<EarnAccount> {
    try {
      const params: Record<string, unknown> = {};
      if (asset) params.coin = asset;
      
      const data = await this.signedRequest("GET", "/api/v2/earn/savings/account", params) as {
        accountList?: Array<{
          productId: string;
          coin: string;
          amount: string;
          interest: string;
          rate: string;
          createTime: string;
        }>;
      };
      
      const positions: EarnPosition[] = (data.accountList || []).map((p) => ({
        positionId: p.productId,
        exchange: "bitget",
        productId: p.productId,
        type: "FLEXIBLE" as EarnProductType,
        asset: p.coin,
        principal: parseFloat(p.amount),
        pendingInterest: 0,
        totalInterest: parseFloat(p.interest),
        totalValue: parseFloat(p.amount) + parseFloat(p.interest),
        apy: parseFloat(p.rate),
        subscribeTime: new Date(parseInt(p.createTime)),
        canRedeem: true,
        timestamp: new Date(),
      }));
      
      const totalPrincipal = positions.reduce((sum, p) => sum + p.principal, 0);
      const totalInterest = positions.reduce((sum, p) => sum + p.totalInterest, 0);
      
      return {
        exchange: "bitget",
        totalPrincipal,
        totalPendingInterest: 0,
        totalInterestEarned: totalInterest,
        totalValue: totalPrincipal + totalInterest,
        totalFlexible: totalPrincipal,
        totalLocked: 0,
        positionCount: positions.length,
        positions,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error("[Bitget] Error fetching earn positions:", error);
      return getEmptyEarnAccount("bitget");
    }
  }
  
  async subscribe(params: SubscribeEarnParams): Promise<EarnResult> {
    try {
      const endpoint = params.type === "LOCKED"
        ? "/api/v2/earn/fixed/subscribe"
        : "/api/v2/earn/savings/subscribe";
      
      const data = await this.signedRequest("POST", endpoint, {
        productId: params.productId,
        amount: params.amount,
      }) as { orderId?: string };
      
      return { success: true, transactionId: data.orderId };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
  
  async redeem(params: RedeemEarnParams): Promise<EarnResult> {
    try {
      const data = await this.signedRequest("POST", "/api/v2/earn/savings/redeem", {
        productId: params.positionId,
        amount: params.amount,
      }) as { redemptionId?: string };
      
      return { success: true, transactionId: data.redemptionId };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
