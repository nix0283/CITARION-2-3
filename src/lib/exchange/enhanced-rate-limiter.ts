/**
 * Enhanced Rate Limiter
 * 
 * Provides rate limiting with:
 * - Minimum interval between requests (per exchange)
 * - Token bucket algorithm
 * - Request queuing with priority
 * - Exchange-specific limits
 * - Rate limit headers support
 * - Automatic backoff
 */

import { AllExchangeId, EXCHANGE_RATE_LIMITS } from './types';

// ==================== TYPES ====================

export interface RateLimitStatus {
  canProceed: boolean;
  waitMs: number;
  usedTokens: number;
  maxTokens: number;
  resetInMs: number;
}

export interface RateLimitConfig {
  /** Minimum interval between requests in ms */
  minIntervalMs: number;
  /** Maximum requests per window */
  maxRequests: number;
  /** Time window in ms */
  windowMs: number;
  /** Cost per request */
  costPerRequest?: number;
  /** Enable jitter for distributed systems */
  enableJitter?: boolean;
}

export interface QueueItem {
  cost: number;
  isOrder: boolean;
  priority: 'HIGH' | 'NORMAL' | 'LOW';
  resolve: () => void;
  timestamp: number;
}

// ==================== EXCHANGE MINIMUM INTERVALS ====================

/**
 * Minimum intervals between requests for each exchange
 * Based on CryptoCopyTradeBot patterns and exchange API docs
 */
export const EXCHANGE_MIN_INTERVALS: Record<AllExchangeId, number> = {
  // Active exchanges
  binance: 50,      // 50ms minimum (20 req/s max sustained)
  bybit: 100,       // 100ms minimum (10 req/s)
  okx: 50,          // 50ms minimum (20 req/s)
  bitget: 66,       // 66ms minimum (15 req/s)
  bingx: 100,       // 100ms minimum (10 req/s)
  
  // Disabled exchanges (for reference)
  kucoin: 30,       // 30ms minimum
  coinbase: 200,    // 200ms minimum (5 req/s)
  huobi: 100,       // 100ms minimum
  hyperliquid: 10,  // 10ms minimum
  bitmex: 100,      // 100ms minimum
  blofin: 50,       // 50ms minimum
  aster: 10,        // 10ms minimum
  gate: 60,         // 60ms minimum
};

// ==================== ENHANCED RATE LIMITER ====================

export class EnhancedRateLimiter {
  private tokens: number;
  private lastRefill: number;
  private lastRequest: number;
  private queue: QueueItem[] = [];
  private processing: boolean = false;
  
  constructor(
    private exchangeId: AllExchangeId,
    private config?: Partial<RateLimitConfig>
  ) {
    const limits = EXCHANGE_RATE_LIMITS[exchangeId];
    this.config = {
      minIntervalMs: EXCHANGE_MIN_INTERVALS[exchangeId] ?? 100,
      maxRequests: limits?.general?.maxRequests ?? 100,
      windowMs: limits?.general?.windowMs ?? 60000,
      costPerRequest: limits?.defaultWeight ?? 1,
      enableJitter: true,
      ...config,
    };
    
    this.tokens = this.config.maxRequests!;
    this.lastRefill = Date.now();
    this.lastRequest = 0;
  }
  
  /**
   * Acquire permission to make a request
   * Returns when it's safe to proceed
   */
  async acquire(
    cost: number = 1,
    isOrder: boolean = false,
    priority: 'HIGH' | 'NORMAL' | 'LOW' = 'NORMAL'
  ): Promise<void> {
    // Check minimum interval first
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequest;
    const minInterval = this.config.minIntervalMs!;
    
    if (timeSinceLastRequest < minInterval) {
      const waitTime = minInterval - timeSinceLastRequest;
      await this.sleep(waitTime);
    }
    
    // Refill tokens
    this.refillTokens();
    
    // Check if we have enough tokens
    const requiredTokens = cost * (this.config.costPerRequest ?? 1);
    
    if (this.tokens >= requiredTokens) {
      this.tokens -= requiredTokens;
      this.lastRequest = Date.now();
      return;
    }
    
    // Queue the request
    return new Promise((resolve) => {
      this.queue.push({
        cost: requiredTokens,
        isOrder,
        priority,
        resolve,
        timestamp: Date.now(),
      });
      
      // Sort by priority (HIGH first, then older requests)
      this.queue.sort((a, b) => {
        if (a.priority !== b.priority) {
          const priorityOrder = { HIGH: 0, NORMAL: 1, LOW: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return a.timestamp - b.timestamp;
      });
      
      this.processQueue();
    });
  }
  
  /**
   * Check if we can proceed without waiting
   */
  canProceed(cost: number = 1): RateLimitStatus {
    const now = Date.now();
    
    // Refill tokens
    this.refillTokens();
    
    const requiredTokens = cost * (this.config.costPerRequest ?? 1);
    const timeSinceLastRequest = now - this.lastRequest;
    const minInterval = this.config.minIntervalMs!;
    
    // Need to wait for minimum interval?
    let waitMs = 0;
    if (timeSinceLastRequest < minInterval) {
      waitMs = minInterval - timeSinceLastRequest;
    }
    
    // Need to wait for tokens?
    const canProceed = this.tokens >= requiredTokens;
    if (!canProceed && waitMs === 0) {
      // Calculate time until we have enough tokens
      const refillRate = this.config.maxRequests! / this.config.windowMs!;
      const tokensNeeded = requiredTokens - this.tokens;
      waitMs = Math.ceil(tokensNeeded / refillRate);
    }
    
    return {
      canProceed: canProceed && waitMs === 0,
      waitMs,
      usedTokens: this.config.maxRequests! - this.tokens,
      maxTokens: this.config.maxRequests!,
      resetInMs: this.config.windowMs! - (now - this.lastRefill),
    };
  }
  
  /**
   * Get current rate limit status
   */
  getStatus(): RateLimitStatus {
    return this.canProceed(0);
  }
  
  /**
   * Update rate limits from exchange headers
   */
  updateFromHeaders(headers: Headers): void {
    // Common rate limit headers
    const remaining = headers.get('x-ratelimit-remaining');
    const limit = headers.get('x-ratelimit-limit');
    const reset = headers.get('x-ratelimit-reset');
    
    // Binance-specific
    const usedWeight = headers.get('x-mbx-used-weight-1m');
    
    // Bybit-specific
    const remainingBybit = headers.get('x-bapi-limit');
    
    if (remaining && limit) {
      const remainingTokens = parseInt(remaining, 10);
      const maxTokens = parseInt(limit, 10);
      
      if (!isNaN(remainingTokens) && !isNaN(maxTokens)) {
        this.tokens = remainingTokens;
        this.config.maxRequests = maxTokens;
      }
    }
    
    if (usedWeight) {
      const used = parseInt(usedWeight, 10);
      if (!isNaN(used)) {
        this.tokens = Math.max(0, this.config.maxRequests! - used);
      }
    }
  }
  
  /**
   * Force wait (for rate limit errors)
   */
  async backoff(attempt: number): Promise<void> {
    // Exponential backoff with jitter
    const baseDelay = Math.min(1000 * Math.pow(2, attempt), 60000);
    const jitter = this.config.enableJitter ? Math.random() * 1000 : 0;
    await this.sleep(baseDelay + jitter);
  }
  
  // ==================== PRIVATE METHODS ====================
  
  private refillTokens(): void {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    
    // Calculate tokens to add based on time elapsed
    const refillRate = this.config.maxRequests! / this.config.windowMs!;
    const tokensToAdd = elapsed * refillRate;
    
    this.tokens = Math.min(this.config.maxRequests!, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }
  
  private processQueue(): void {
    if (this.processing) return;
    this.processing = true;
    
    const process = async () => {
      while (this.queue.length > 0) {
        this.refillTokens();
        
        const next = this.queue[0];
        if (!next) break;
        
        if (this.tokens >= next.cost) {
          // Wait for minimum interval
          const now = Date.now();
          const timeSinceLastRequest = now - this.lastRequest;
          if (timeSinceLastRequest < this.config.minIntervalMs!) {
            await this.sleep(this.config.minIntervalMs! - timeSinceLastRequest);
          }
          
          // Consume tokens
          this.tokens -= next.cost;
          this.lastRequest = Date.now();
          
          // Remove from queue and resolve
          this.queue.shift();
          next.resolve();
        } else {
          // Wait for tokens
          const refillRate = this.config.maxRequests! / this.config.windowMs!;
          const tokensNeeded = next.cost - this.tokens;
          const waitTime = tokensNeeded / refillRate;
          
          await this.sleep(waitTime);
        }
      }
      
      this.processing = false;
    };
    
    process().catch(console.error);
  }
  
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// ==================== RATE LIMITER MANAGER ====================

export class RateLimiterManager {
  private limiters: Map<string, EnhancedRateLimiter> = new Map();
  
  /**
   * Get or create rate limiter for exchange
   */
  getLimiter(exchangeId: AllExchangeId, accountId?: string): EnhancedRateLimiter {
    const key = accountId ? `${exchangeId}:${accountId}` : exchangeId;
    
    if (!this.limiters.has(key)) {
      this.limiters.set(key, new EnhancedRateLimiter(exchangeId));
    }
    
    return this.limiters.get(key)!;
  }
  
  /**
   * Get status for all limiters
   */
  getAllStatus(): Record<string, RateLimitStatus> {
    const result: Record<string, RateLimitStatus> = {};
    
    for (const [key, limiter] of this.limiters.entries()) {
      result[key] = limiter.getStatus();
    }
    
    return result;
  }
  
  /**
   * Clear all limiters
   */
  clear(): void {
    this.limiters.clear();
  }
}

// ==================== SINGLETON EXPORT ====================

export const rateLimiterManager = new RateLimiterManager();

// ==================== HELPER FUNCTIONS ====================

/**
 * Quick helper to acquire rate limit permission
 */
export async function acquireRateLimit(
  exchangeId: AllExchangeId,
  cost: number = 1,
  isOrder: boolean = false
): Promise<void> {
  const limiter = rateLimiterManager.getLimiter(exchangeId);
  await limiter.acquire(cost, isOrder);
}

/**
 * Quick helper to check if can proceed
 */
export function checkRateLimit(exchangeId: AllExchangeId, cost: number = 1): RateLimitStatus {
  const limiter = rateLimiterManager.getLimiter(exchangeId);
  return limiter.canProceed(cost);
}

/**
 * Get minimum interval for exchange
 */
export function getMinInterval(exchangeId: AllExchangeId): number {
  return EXCHANGE_MIN_INTERVALS[exchangeId] ?? 100;
}
