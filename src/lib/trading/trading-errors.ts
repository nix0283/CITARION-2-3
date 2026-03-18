/**
 * Trading Errors - Professional Error Handling
 * 
 * Hierarchical error types for trading operations.
 * Each error type is recoverable or not, allowing for proper retry logic.
 */

/**
 * Base trading error class with classification
 */
export class TradingError extends Error {
  public readonly code: string;
  public readonly recoverable: boolean;
  public readonly httpStatus: number;
  public readonly details?: Record<string, unknown>;
  public readonly timestamp: Date;

  constructor(
    message: string,
    code: string,
    recoverable: boolean = false,
    httpStatus: number = 500,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'TradingError';
    this.code = code;
    this.recoverable = recoverable;
    this.httpStatus = httpStatus;
    this.details = details;
    this.timestamp = new Date();
    
    // Maintain proper stack trace in V8 environments
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      recoverable: this.recoverable,
      httpStatus: this.httpStatus,
      details: this.details,
      timestamp: this.timestamp.toISOString(),
      stack: this.stack,
    };
  }
}

/**
 * Balance-related errors
 */
export class BalanceError extends TradingError {
  constructor(
    message: string,
    code: 'BALANCE_FETCH_FAILED' | 'INSUFFICIENT_BALANCE' | 'BALANCE_SYNC_ERROR',
    details?: Record<string, unknown>
  ) {
    super(message, code, code === 'BALANCE_SYNC_ERROR', 500, details);
    this.name = 'BalanceError';
  }
}

/**
 * Order-related errors
 */
export class OrderError extends TradingError {
  constructor(
    message: string,
    code: 
      | 'ORDER_TIMEOUT' 
      | 'ORDER_REJECTED' 
      | 'ORDER_FAILED' 
      | 'ORDER_NOT_FOUND'
      | 'ORDER_ALREADY_FILLED'
      | 'ORDER_CANCELLED',
    recoverable: boolean = false,
    details?: Record<string, unknown>
  ) {
    super(message, code, recoverable || code === 'ORDER_TIMEOUT', 500, details);
    this.name = 'OrderError';
  }
}

/**
 * Exchange API errors
 */
export class ExchangeError extends TradingError {
  constructor(
    message: string,
    code: 
      | 'EXCHANGE_UNREACHABLE' 
      | 'EXCHANGE_RATE_LIMITED' 
      | 'EXCHANGE_MAINTENANCE'
      | 'EXCHANGE_AUTH_FAILED'
      | 'EXCHANGE_PERMISSION_DENIED',
    details?: Record<string, unknown>
  ) {
    const recoverable = code === 'EXCHANGE_UNREACHABLE' || code === 'EXCHANGE_RATE_LIMITED';
    const httpStatus = code === 'EXCHANGE_RATE_LIMITED' ? 429 : 500;
    super(message, code, recoverable, httpStatus, details);
    this.name = 'ExchangeError';
  }
}

/**
 * Position-related errors
 */
export class PositionError extends TradingError {
  constructor(
    message: string,
    code: 'POSITION_NOT_FOUND' | 'POSITION_ALREADY_CLOSED' | 'POSITION_LIQUIDATED',
    details?: Record<string, unknown>
  ) {
    super(message, code, false, 500, details);
    this.name = 'PositionError';
  }
}

/**
 * Signal validation errors
 */
export class SignalError extends TradingError {
  constructor(
    message: string,
    code: 'SIGNAL_INVALID' | 'SIGNAL_FILTERED' | 'SIGNAL_EXPIRED',
    details?: Record<string, unknown>
  ) {
    super(message, code, false, 400, details);
    this.name = 'SignalError';
  }
}

/**
 * Risk management errors
 */
export class RiskError extends TradingError {
  constructor(
    message: string,
    code: 'RISK_EXCEEDED' | 'LEVERAGE_TOO_HIGH' | 'POSITION_TOO_LARGE' | 'DAILY_LOSS_LIMIT',
    details?: Record<string, unknown>
  ) {
    super(message, code, false, 400, details);
    this.name = 'RiskError';
  }
}

/**
 * Timeout error for async operations
 */
export class TimeoutError extends TradingError {
  public readonly timeoutMs: number;

  constructor(operation: string, timeoutMs: number) {
    super(
      `${operation} timed out after ${timeoutMs}ms`,
      'TIMEOUT',
      true, // Timeouts are generally recoverable
      408,
      { operation, timeoutMs }
    );
    this.name = 'TimeoutError';
    this.timeoutMs = timeoutMs;
  }
}

/**
 * Check if error is recoverable (can be retried)
 */
export function isRecoverableError(error: unknown): boolean {
  if (error instanceof TradingError) {
    return error.recoverable;
  }
  
  // Network errors are generally recoverable
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    if (
      message.includes('network') ||
      message.includes('timeout') ||
      message.includes('econnrefused') ||
      message.includes('econnreset') ||
      message.includes('socket hang up')
    ) {
      return true;
    }
  }
  
  return false;
}

/**
 * Check if error is a rate limit error
 */
export function isRateLimitError(error: unknown): boolean {
  if (error instanceof ExchangeError && error.code === 'EXCHANGE_RATE_LIMITED') {
    return true;
  }
  
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return message.includes('rate limit') || message.includes('too many requests');
  }
  
  return false;
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
  if (error instanceof ExchangeError && error.code === 'EXCHANGE_AUTH_FAILED') {
    return true;
  }
  
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes('unauthorized') ||
      message.includes('invalid api key') ||
      message.includes('invalid signature') ||
      message.includes('permission denied')
    );
  }
  
  return false;
}

/**
 * Wrap an async operation with timeout
 */
export async function withTimeout<T>(
  operation: Promise<T>,
  timeoutMs: number,
  operationName: string
): Promise<T> {
  let timeoutId: NodeJS.Timeout;
  
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new TimeoutError(operationName, timeoutMs));
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([operation, timeoutPromise]);
    clearTimeout(timeoutId!);
    return result;
  } catch (error) {
    clearTimeout(timeoutId!);
    throw error;
  }
}

/**
 * Retry configuration
 */
export interface RetryConfig {
  maxRetries: number;
  baseDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
  retryableErrors: string[];
}

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelayMs: 1000,
  maxDelayMs: 30000,
  backoffMultiplier: 2,
  retryableErrors: [
    'TIMEOUT',
    'EXCHANGE_UNREACHABLE',
    'EXCHANGE_RATE_LIMITED',
    'ORDER_TIMEOUT',
    'BALANCE_SYNC_ERROR',
  ],
};

/**
 * Retry an operation with exponential backoff
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  config: Partial<RetryConfig> = {},
  operationName: string = 'operation'
): Promise<T> {
  const finalConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
  let lastError: Error | null = null;
  let delay = finalConfig.baseDelayMs;

  for (let attempt = 1; attempt <= finalConfig.maxRetries + 1; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Check if error is retryable
      const errorCode = error instanceof TradingError ? error.code : '';
      const isRetryable = 
        isRecoverableError(error) || 
        finalConfig.retryableErrors.includes(errorCode);

      if (!isRetryable || attempt > finalConfig.maxRetries) {
        throw error;
      }

      console.warn(
        `[Retry] ${operationName} attempt ${attempt}/${finalConfig.maxRetries + 1} failed: ${lastError.message}. Retrying in ${delay}ms...`
      );

      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Exponential backoff
      delay = Math.min(delay * finalConfig.backoffMultiplier, finalConfig.maxDelayMs);
    }
  }

  throw lastError;
}
