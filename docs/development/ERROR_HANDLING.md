# CITARION Error Handling

> **Last Updated:** March 2025  
> **Scope:** Backend & Frontend

---

## Table of Contents

1. [Overview](#overview)
2. [Error Classification](#error-classification)
3. [TradingError Class](#tradingerror-class)
4. [Error Codes](#error-codes)
5. [Retry Strategies](#retry-strategies)
6. [Circuit Breaker](#circuit-breaker)
7. [Logging](#logging)
8. [Alerting](#alerting)
9. [Frontend Handling](#frontend-handling)

---

## Overview

CITARION implements comprehensive error handling for reliable trading operations.

### Error Handling Principles

1. **Fail Fast** - Detect errors early
2. **Fail Safe** - Don't lose money on errors
3. **Recover Gracefully** - Retry when appropriate
4. **Log Everything** - Audit trail for debugging
5. **Alert Wisely** - Notify on critical issues

---

## Error Classification

### Error Categories

| Category | Recoverable | Example |
|----------|-------------|---------|
| **Network** | Yes | Connection timeout |
| **Exchange** | Sometimes | Rate limit, maintenance |
| **Business** | No | Insufficient balance |
| **Validation** | No | Invalid symbol |
| **System** | Sometimes | Database connection |

### Error Severity

```typescript
enum ErrorSeverity {
  LOW = 'low',           // Logged only
  MEDIUM = 'medium',     // Logged + notified
  HIGH = 'high',         // Logged + alerted + retry
  CRITICAL = 'critical', // Logged + alerted + halt
}
```

---

## TradingError Class

### Implementation

```typescript
// lib/errors/index.ts

export type TradingErrorCode = 
  // Authentication
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'INVALID_API_KEY'
  | 'SESSION_EXPIRED'
  
  // Account
  | 'ACCOUNT_NOT_FOUND'
  | 'ACCOUNT_INACTIVE'
  | 'INSUFFICIENT_BALANCE'
  
  // Trading
  | 'INVALID_SYMBOL'
  | 'INVALID_ORDER_TYPE'
  | 'ORDER_REJECTED'
  | 'POSITION_NOT_FOUND'
  | 'LEVERAGE_EXCEEDED'
  | 'POSITION_SIZE_EXCEEDED'
  
  // Exchange
  | 'EXCHANGE_UNAVAILABLE'
  | 'EXCHANGE_RATE_LIMIT'
  | 'EXCHANGE_MAINTENANCE'
  | 'EXCHANGE_ERROR'
  
  // Signal
  | 'SIGNAL_PARSE_ERROR'
  | 'SIGNAL_DUPLICATE'
  | 'SIGNAL_EXPIRED'
  
  // System
  | 'INTERNAL_ERROR'
  | 'TIMEOUT'
  | 'DATABASE_ERROR';

export class TradingError extends Error {
  code: TradingErrorCode;
  statusCode: number;
  severity: ErrorSeverity;
  retryable: boolean;
  details?: Record<string, unknown>;
  
  constructor(
    code: TradingErrorCode,
    message: string,
    options: {
      statusCode?: number;
      severity?: ErrorSeverity;
      retryable?: boolean;
      details?: Record<string, unknown>;
      cause?: Error;
    } = {}
  ) {
    super(message, { cause: options.cause });
    this.name = 'TradingError';
    this.code = code;
    this.statusCode = options.statusCode ?? 500;
    this.severity = options.severity ?? ErrorSeverity.MEDIUM;
    this.retryable = options.retryable ?? false;
    this.details = options.details;
  }
  
  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      severity: this.severity,
      retryable: this.retryable,
      details: this.details,
    };
  }
}
```

### Factory Functions

```typescript
// lib/errors/index.ts

export function unauthorizedError(message = 'Authentication required') {
  return new TradingError('UNAUTHORIZED', message, {
    statusCode: 401,
    severity: ErrorSeverity.LOW,
  });
}

export function forbiddenError(message = 'Access denied') {
  return new TradingError('FORBIDDEN', message, {
    statusCode: 403,
    severity: ErrorSeverity.LOW,
  });
}

export function invalidApiKeyError(exchange: string) {
  return new TradingError('INVALID_API_KEY', `Invalid API key for ${exchange}`, {
    statusCode: 401,
    severity: ErrorSeverity.MEDIUM,
    details: { exchange },
  });
}

export function insufficientBalanceError(required: number, available: number) {
  return new TradingError('INSUFFICIENT_BALANCE', 'Insufficient balance', {
    statusCode: 400,
    severity: ErrorSeverity.LOW,
    details: { required, available, shortfall: required - available },
  });
}

export function exchangeUnavailableError(exchange: string, reason?: string) {
  return new TradingError('EXCHANGE_UNAVAILABLE', `${exchange} is unavailable`, {
    statusCode: 503,
    severity: ErrorSeverity.HIGH,
    retryable: true,
    details: { exchange, reason },
  });
}

export function exchangeRateLimitError(exchange: string, retryAfter?: number) {
  return new TradingError('EXCHANGE_RATE_LIMIT', `${exchange} rate limit exceeded`, {
    statusCode: 429,
    severity: ErrorSeverity.MEDIUM,
    retryable: true,
    details: { exchange, retryAfter },
  });
}

export function orderRejectedError(symbol: string, reason: string) {
  return new TradingError('ORDER_REJECTED', `Order rejected: ${reason}`, {
    statusCode: 400,
    severity: ErrorSeverity.MEDIUM,
    details: { symbol, reason },
  });
}

export function signalParseError(rawSignal: string, reason: string) {
  return new TradingError('SIGNAL_PARSE_ERROR', `Failed to parse signal: ${reason}`, {
    statusCode: 400,
    severity: ErrorSeverity.LOW,
    details: { rawSignal: rawSignal.slice(0, 200), reason },
  });
}

export function internalError(message: string, cause?: Error) {
  return new TradingError('INTERNAL_ERROR', message, {
    statusCode: 500,
    severity: ErrorSeverity.HIGH,
    cause,
  });
}

export function timeoutError(operation: string, timeoutMs: number) {
  return new TradingError('TIMEOUT', `${operation} timed out after ${timeoutMs}ms`, {
    statusCode: 504,
    severity: ErrorSeverity.HIGH,
    retryable: true,
    details: { operation, timeoutMs },
  });
}
```

---

## Error Codes

### Complete Error Code Reference

| Code | HTTP | Severity | Retryable | Description |
|------|------|----------|-----------|-------------|
| `UNAUTHORIZED` | 401 | LOW | No | Authentication required |
| `FORBIDDEN` | 403 | LOW | No | Access denied |
| `INVALID_API_KEY` | 401 | MEDIUM | No | Invalid exchange API key |
| `SESSION_EXPIRED` | 401 | LOW | No | Session has expired |
| `ACCOUNT_NOT_FOUND` | 404 | LOW | No | Account not found |
| `ACCOUNT_INACTIVE` | 403 | LOW | No | Account is disabled |
| `INSUFFICIENT_BALANCE` | 400 | LOW | No | Not enough balance |
| `INVALID_SYMBOL` | 400 | LOW | No | Symbol not supported |
| `INVALID_ORDER_TYPE` | 400 | LOW | No | Invalid order type |
| `ORDER_REJECTED` | 400 | MEDIUM | No | Exchange rejected order |
| `POSITION_NOT_FOUND` | 404 | LOW | No | Position not found |
| `LEVERAGE_EXCEEDED` | 400 | LOW | No | Leverage exceeds limit |
| `POSITION_SIZE_EXCEEDED` | 400 | LOW | No | Position size too large |
| `EXCHANGE_UNAVAILABLE` | 503 | HIGH | Yes | Exchange API unavailable |
| `EXCHANGE_RATE_LIMIT` | 429 | MEDIUM | Yes | Rate limit hit |
| `EXCHANGE_MAINTENANCE` | 503 | HIGH | Yes | Exchange in maintenance |
| `EXCHANGE_ERROR` | 500 | HIGH | Sometimes | Generic exchange error |
| `SIGNAL_PARSE_ERROR` | 400 | LOW | No | Failed to parse signal |
| `SIGNAL_DUPLICATE` | 409 | LOW | No | Duplicate signal |
| `SIGNAL_EXPIRED` | 400 | LOW | No | Signal entry zone expired |
| `INTERNAL_ERROR` | 500 | HIGH | No | Internal server error |
| `TIMEOUT` | 504 | HIGH | Yes | Request timeout |
| `DATABASE_ERROR` | 500 | HIGH | Sometimes | Database error |

---

## Retry Strategies

### Retry Configuration

```typescript
// lib/retry/config.ts
export interface RetryConfig {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
  retryableErrors: TradingErrorCode[];
}

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  baseDelayMs: 1000,
  maxDelayMs: 30000,
  backoffMultiplier: 2,
  retryableErrors: [
    'EXCHANGE_UNAVAILABLE',
    'EXCHANGE_RATE_LIMIT',
    'EXCHANGE_MAINTENANCE',
    'TIMEOUT',
  ],
};

export const EXCHANGE_RETRY_CONFIG: RetryConfig = {
  ...DEFAULT_RETRY_CONFIG,
  maxAttempts: 5,
  baseDelayMs: 2000,
};
```

### Retry Implementation

```typescript
// lib/retry/index.ts
export async function withRetry<T>(
  operation: () => Promise<T>,
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<T> {
  let lastError: Error | undefined;
  let attempt = 0;
  let delay = config.baseDelayMs;

  while (attempt < config.maxAttempts) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      attempt++;

      // Check if retryable
      const tradingError = error instanceof TradingError ? error : null;
      const isRetryable = tradingError?.retryable ?? 
        config.retryableErrors.some(code => tradingError?.code === code);

      if (!isRetryable || attempt >= config.maxAttempts) {
        throw error;
      }

      // Log retry
      logTradingError(tradingError!, { attempt, nextRetryIn: delay });

      // Wait before retry
      await sleep(delay);

      // Exponential backoff
      delay = Math.min(delay * config.backoffMultiplier, config.maxDelayMs);
    }
  }

  throw lastError;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

### Usage Example

```typescript
// API route with retry
export async function POST(request: Request) {
  const body = await request.json();
  
  try {
    const result = await withRetry(
      () => exchangeClient.createOrder(body),
      EXCHANGE_RETRY_CONFIG
    );
    
    return Response.json({ success: true, data: result });
  } catch (error) {
    return handleErrorResponse(error);
  }
}
```

---

## Circuit Breaker

### Implementation

```typescript
// lib/circuit-breaker/index.ts

type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

interface CircuitBreakerConfig {
  failureThreshold: number;
  recoveryTimeout: number;
  halfOpenMaxCalls: number;
}

export class CircuitBreaker {
  private state: CircuitState = 'CLOSED';
  private failures: number = 0;
  private lastFailureTime: number = 0;
  private halfOpenCalls: number = 0;

  constructor(
    private name: string,
    private config: CircuitBreakerConfig
  ) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.config.recoveryTimeout) {
        this.state = 'HALF_OPEN';
        this.halfOpenCalls = 0;
      } else {
        throw new TradingError(
          'EXCHANGE_UNAVAILABLE',
          `Circuit breaker OPEN for ${this.name}`,
          { statusCode: 503, retryable: true }
        );
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    if (this.state === 'HALF_OPEN') {
      this.halfOpenCalls++;
      if (this.halfOpenCalls >= this.config.halfOpenMaxCalls) {
        this.state = 'CLOSED';
      }
    }
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.state === 'HALF_OPEN') {
      this.state = 'OPEN';
    } else if (this.failures >= this.config.failureThreshold) {
      this.state = 'OPEN';
    }
  }

  getState(): CircuitState {
    return this.state;
  }
}

// Exchange circuit breakers
export const exchangeCircuitBreakers = {
  binance: new CircuitBreaker('binance', {
    failureThreshold: 5,
    recoveryTimeout: 60000,
    halfOpenMaxCalls: 1,
  }),
  bybit: new CircuitBreaker('bybit', {
    failureThreshold: 5,
    recoveryTimeout: 60000,
    halfOpenMaxCalls: 1,
  }),
  // ... other exchanges
};
```

---

## Logging

### Error Logging

```typescript
// lib/logging/trading-error.ts

interface ErrorLogContext {
  userId?: string;
  accountId?: string;
  positionId?: string;
  attempt?: number;
  nextRetryIn?: number;
}

export function logTradingError(
  error: TradingError | Error,
  context: ErrorLogContext = {}
): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: getLogLevel(error),
    error: error instanceof TradingError ? error.toJSON() : {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    context,
  };

  // Console output (development)
  if (process.env.NODE_ENV === 'development') {
    console.error('[TRADING_ERROR]', JSON.stringify(logEntry, null, 2));
  }

  // Database log
  db.systemLog.create({
    data: {
      level: logEntry.level,
      category: 'TRADE',
      message: error.message,
      details: JSON.stringify(logEntry),
      userId: context.userId,
    },
  }).catch(console.error);

  // External logging (Sentry, etc.)
  if (process.env.SENTRY_DSN) {
    captureException(error, { extra: context });
  }
}

function getLogLevel(error: Error): string {
  if (error instanceof TradingError) {
    return error.severity === ErrorSeverity.CRITICAL ? 'ERROR' :
           error.severity === ErrorSeverity.HIGH ? 'WARN' : 'INFO';
  }
  return 'ERROR';
}
```

---

## Alerting

### Alert Configuration

```typescript
// lib/alerting/config.ts

interface AlertConfig {
  channels: ('email' | 'telegram' | 'slack')[];
  severityThreshold: ErrorSeverity;
  rateLimit: number; // Max alerts per hour
}

export const ALERT_CONFIG: AlertConfig = {
  channels: ['telegram'],
  severityThreshold: ErrorSeverity.HIGH,
  rateLimit: 10,
};
```

### Alert Handler

```typescript
// lib/alerting/index.ts

export async function sendAlert(
  error: TradingError,
  context: Record<string, unknown>
): Promise<void> {
  if (error.severity < ALERT_CONFIG.severityThreshold) {
    return;
  }

  const message = `
🚨 **CITARION Alert**
**Code:** ${error.code}
**Severity:** ${error.severity}
**Message:** ${error.message}
**Details:** ${JSON.stringify(error.details)}
**Time:** ${new Date().toISOString()}
  `.trim();

  // Send to configured channels
  for (const channel of ALERT_CONFIG.channels) {
    switch (channel) {
      case 'telegram':
        await sendTelegramAlert(message);
        break;
      case 'slack':
        await sendSlackAlert(message);
        break;
      case 'email':
        await sendEmailAlert(message);
        break;
    }
  }
}
```

---

## Frontend Handling

### Error Boundary

```tsx
// components/shared/error-boundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to external service
    captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="p-4 text-center">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### API Error Handler

```typescript
// lib/api/error-handler.ts
import { toast } from 'sonner';

export async function handleApiError(error: unknown): Promise<void> {
  if (error instanceof TradingError) {
    // Show user-friendly message
    toast.error(error.message, {
      description: getErrorDescription(error.code),
    });

    // Handle specific codes
    switch (error.code) {
      case 'UNAUTHORIZED':
      case 'SESSION_EXPIRED':
        // Redirect to login
        window.location.href = '/login';
        break;
      case 'EXCHANGE_RATE_LIMIT':
        // Show retry message
        toast.info('Please wait a moment and try again');
        break;
    }
  } else if (error instanceof Error) {
    toast.error('An unexpected error occurred', {
      description: error.message,
    });
  }
}

function getErrorDescription(code: TradingErrorCode): string {
  const descriptions: Record<TradingErrorCode, string> = {
    UNAUTHORIZED: 'Please log in to continue',
    FORBIDDEN: "You don't have permission for this action",
    INSUFFICIENT_BALANCE: 'Add funds to your account',
    // ... more descriptions
  };
  return descriptions[code] ?? 'Please try again or contact support';
}
```

### Toast Notifications

```tsx
// Using sonner for notifications
import { toast } from 'sonner';

// Success
toast.success('Position opened', {
  description: 'BTCUSDT LONG @ 67000',
});

// Error
toast.error('Order rejected', {
  description: 'Insufficient margin',
  action: {
    label: 'Retry',
    onClick: () => retryOrder(),
  },
});

// Loading
const toastId = toast.loading('Placing order...');
try {
  await placeOrder(params);
  toast.success('Order placed', { id: toastId });
} catch (error) {
  toast.error('Order failed', { id: toastId });
}
```

---

## Best Practices

### DO ✅

1. **Use TradingError class** - Consistent error format
2. **Set appropriate severity** - Helps alerting
3. **Mark retryable errors** - Enable automatic retry
4. **Include context** - Details for debugging
5. **Log all errors** - Audit trail
6. **Handle gracefully in UI** - User-friendly messages

### DON'T ❌

1. **Expose internal errors** - Sanitize for users
2. **Swallow errors silently** - Always log
3. **Over-alert** - Set appropriate thresholds
4. **Retry indefinitely** - Set max attempts
5. **Block on errors** - Fail fast, recover async

---

## Related Documentation

- [API_SPECIFICATION.md](../architecture/API_SPECIFICATION.md) - API error responses
- [SECURITY_GUIDE.md](../security/SECURITY_GUIDE.md) - Security error handling
- [MONITORING_AND_ALERTING.md](../deployment/MONITORING_AND_ALERTING.md) - Alerting setup
