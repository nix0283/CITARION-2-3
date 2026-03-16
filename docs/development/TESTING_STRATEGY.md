# CITARION Testing Strategy

> **Last Updated:** March 2025  
> **Testing Framework:** Bun Test + Playwright

---

## Table of Contents

1. [Overview](#overview)
2. [Testing Pyramid](#testing-pyramid)
3. [Unit Tests](#unit-tests)
4. [Integration Tests](#integration-tests)
5. [E2E Tests](#e2e-tests)
6. [Performance Tests](#performance-tests)
7. [Coverage Requirements](#coverage-requirements)
8. [CI/CD Integration](#cicd-integration)

---

## Overview

CITARION uses a comprehensive testing strategy covering all layers of the application.

### Testing Principles

1. **Test Early, Test Often** - Run tests on every commit
2. **Fast Feedback** - Unit tests < 100ms, Integration < 5s
3. **Isolation** - Tests should not depend on each other
4. **Deterministic** - Same input = same output
5. **Meaningful** - Test behavior, not implementation

### Test Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| Unit | Bun Test | Functions, classes, hooks |
| Integration | Bun Test + MSW | API routes, database |
| E2E | Playwright | User flows, UI |
| Performance | k6 | Load testing |
| Coverage | c8 | Code coverage |

---

## Testing Pyramid

```
                    ┌─────────┐
                    │   E2E   │  5%
                    │  Tests  │  Slow, Expensive
                    ├─────────┤
               ┌────┴─────────┴────┐
               │   Integration     │  15%
               │      Tests        │  Medium Speed
               └───────────────────┘
          ┌────────────────────────────┐
          │        Unit Tests          │  80%
          │      Fast, Cheap           │  High Value
          └────────────────────────────┘
```

### Test Distribution

| Type | Percentage | Count (Target) | Duration |
|------|------------|----------------|----------|
| Unit | 80% | 500+ | < 5s total |
| Integration | 15% | 100+ | < 30s total |
| E2E | 5% | 30+ | < 5min total |

---

## Unit Tests

### Setup

```typescript
// vitest.config.ts (or bunfig.toml for Bun)
export default {
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules', 'src/**/*.d.ts'],
    },
  },
};
```

### Testing Utilities

```typescript
// __tests__/setup.ts
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset } from 'vitest-mock-extended';

export const prismaMock = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prismaMock);
});
```

### Example: Unit Test for Trading Logic

```typescript
// __tests__/lib/trading/calculate-pnl.test.ts
import { describe, it, expect } from 'bun:test';
import { calculatePnL } from '@/lib/trading/calculations';

describe('calculatePnL', () => {
  it('should calculate PnL for LONG position', () => {
    const result = calculatePnL({
      direction: 'LONG',
      entryPrice: 50000,
      exitPrice: 55000,
      quantity: 0.1,
      leverage: 10,
      fee: 0.0004,
    });

    expect(result.pnl).toBeCloseTo(478);
    expect(result.pnlPercent).toBeCloseTo(9.56);
  });

  it('should calculate PnL for SHORT position', () => {
    const result = calculatePnL({
      direction: 'SHORT',
      entryPrice: 50000,
      exitPrice: 45000,
      quantity: 0.1,
      leverage: 10,
      fee: 0.0004,
    });

    expect(result.pnl).toBeCloseTo(978);
    expect(result.pnlPercent).toBeCloseTo(19.56);
  });

  it('should return negative PnL for losing trade', () => {
    const result = calculatePnL({
      direction: 'LONG',
      entryPrice: 50000,
      exitPrice: 48000,
      quantity: 0.1,
      leverage: 10,
      fee: 0.0004,
    });

    expect(result.pnl).toBeLessThan(0);
  });
});
```

### Example: Unit Test for Indicators

```typescript
// __tests__/lib/indicators/rsi.test.ts
import { describe, it, expect } from 'bun:test';
import { calculateRSI } from '@/lib/indicators/calculator';

describe('RSI Indicator', () => {
  const prices = [
    44, 44.5, 43.5, 44.5, 44.25, 45, 46, 45.5, 46.5, 47,
    47.5, 48, 47.5, 47, 46.5, 46, 45.5, 46, 46.5, 47
  ];

  it('should calculate RSI with period 14', () => {
    const rsi = calculateRSI(prices, 14);
    
    expect(rsi.length).toBe(prices.length);
    expect(rsi[rsi.length - 1]).toBeGreaterThan(0);
    expect(rsi[rsi.length - 1]).toBeLessThan(100);
  });

  it('should return null for insufficient data', () => {
    const rsi = calculateRSI([1, 2, 3], 14);
    
    expect(rsi.every(v => v === null)).toBe(true);
  });

  it('should indicate overbought condition', () => {
    const bullishPrices = Array(14).fill(0).map((_, i) => 100 + i);
    const rsi = calculateRSI(bullishPrices, 14);
    
    expect(rsi[rsi.length - 1]).toBeGreaterThan(70);
  });
});
```

### Example: Testing React Hooks

```typescript
// __tests__/hooks/use-realtime-prices.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { useRealtimePrice } from '@/hooks/use-realtime-prices';

// Mock WebSocket
const mockSocket = {
  on: jest.fn(),
  emit: jest.fn(),
  disconnect: jest.fn(),
};

jest.mock('socket.io-client', () => () => mockSocket);

describe('useRealtimePrice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return null initially', () => {
    const { result } = renderHook(() => useRealtimePrice('BTCUSDT'));
    
    expect(result.current).toBeNull();
  });

  it('should update on price_update event', () => {
    const { result } = renderHook(() => useRealtimePrice('BTCUSDT'));
    
    act(() => {
      const callback = mockSocket.on.mock.calls.find(
        call => call[0] === 'price_update'
      )[1];
      
      callback({ symbol: 'BTCUSDT', price: 50000 });
    });

    expect(result.current?.price).toBe(50000);
  });

  it('should disconnect on unmount', () => {
    const { unmount } = renderHook(() => useRealtimePrice('BTCUSDT'));
    
    unmount();
    
    expect(mockSocket.disconnect).toHaveBeenCalled();
  });
});
```

---

## Integration Tests

### Database Integration

```typescript
// __tests__/integration/db-positions.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import { db } from '@/lib/db';
import { Position, Account, User } from '@prisma/client';

describe('Position Database Operations', () => {
  let testUser: User;
  let testAccount: Account;

  beforeAll(async () => {
    testUser = await db.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
      },
    });

    testAccount = await db.account.create({
      data: {
        userId: testUser.id,
        exchangeId: 'binance',
        exchangeType: 'futures',
      },
    });
  });

  afterAll(async () => {
    await db.position.deleteMany({});
    await db.account.deleteMany({});
    await db.user.deleteMany({});
  });

  it('should create a position', async () => {
    const position = await db.position.create({
      data: {
        accountId: testAccount.id,
        symbol: 'BTCUSDT',
        direction: 'LONG',
        totalAmount: 0.1,
        avgEntryPrice: 50000,
        leverage: 10,
      },
    });

    expect(position.symbol).toBe('BTCUSDT');
    expect(position.direction).toBe('LONG');
  });

  it('should calculate total exposure', async () => {
    await db.position.createMany({
      data: [
        {
          accountId: testAccount.id,
          symbol: 'BTCUSDT',
          direction: 'LONG',
          totalAmount: 0.1,
          avgEntryPrice: 50000,
          leverage: 10,
        },
        {
          accountId: testAccount.id,
          symbol: 'ETHUSDT',
          direction: 'SHORT',
          totalAmount: 1,
          avgEntryPrice: 3000,
          leverage: 5,
        },
      ],
    });

    const positions = await db.position.findMany({
      where: { accountId: testAccount.id, status: 'OPEN' },
    });

    const totalExposure = positions.reduce(
      (sum, p) => sum + p.totalAmount * p.avgEntryPrice * p.leverage,
      0
    );

    expect(totalExposure).toBe(50000 + 15000);
  });
});
```

### API Route Testing

```typescript
// __tests__/api/trade.test.ts
import { describe, it, expect, beforeEach } from 'bun:test';
import { POST } from '@/app/api/trade/route';
import { NextRequest } from 'next/server';

describe('POST /api/trade', () => {
  beforeEach(() => {
    // Reset mocks
  });

  it('should reject unauthenticated requests', async () => {
    const request = new NextRequest('http://localhost/api/trade', {
      method: 'POST',
      body: JSON.stringify({
        symbol: 'BTCUSDT',
        side: 'BUY',
        type: 'MARKET',
        quantity: 0.001,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error.code).toBe('UNAUTHORIZED');
  });

  it('should validate order parameters', async () => {
    const request = new NextRequest('http://localhost/api/trade', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-token',
      },
      body: JSON.stringify({
        symbol: 'INVALID',
        side: 'INVALID',
        quantity: -1,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error.code).toBe('VALIDATION_ERROR');
  });

  it('should execute valid order', async () => {
    const request = new NextRequest('http://localhost/api/trade', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer valid-token',
      },
      body: JSON.stringify({
        symbol: 'BTCUSDT',
        side: 'BUY',
        type: 'MARKET',
        quantity: 0.001,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.orderId).toBeDefined();
  });
});
```

### Exchange Integration Testing

```typescript
// __tests__/integration/exchange-client.test.ts
import { describe, it, expect } from 'bun:test';
import { BinanceClient } from '@/lib/exchange/binance-client';

describe('BinanceClient', () => {
  const client = new BinanceClient({
    apiKey: process.env.BINANCE_TESTNET_API_KEY!,
    apiSecret: process.env.BINANCE_TESTNET_API_SECRET!,
    testnet: true,
  });

  it('should fetch account balance', async () => {
    const balance = await client.getBalance();
    
    expect(balance).toBeDefined();
    expect(Array.isArray(balance)).toBe(true);
  });

  it('should get current price', async () => {
    const price = await client.getCurrentPrice('BTCUSDT');
    
    expect(price).toBeGreaterThan(0);
  });

  it('should place and cancel order', async () => {
    // Place limit order far from current price
    const order = await client.createOrder({
      symbol: 'BTCUSDT',
      side: 'BUY',
      type: 'LIMIT',
      quantity: 0.001,
      price: 10000, // Far below market
    });

    expect(order.id).toBeDefined();

    // Cancel the order
    const cancelled = await client.cancelOrder({
      symbol: 'BTCUSDT',
      orderId: order.id,
    });

    expect(cancelled.status).toBe('CANCELED');
  });
});
```

---

## E2E Tests

### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### E2E Test Examples

```typescript
// e2e/trading.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Trading Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/');
  });

  test('should open a position', async ({ page }) => {
    // Navigate to trading tab
    await page.click('[data-testid="tab-trading"]');
    
    // Fill order form
    await page.fill('[name="symbol"]', 'BTCUSDT');
    await page.selectOption('[name="direction"]', 'LONG');
    await page.fill('[name="amount"]', '100');
    await page.fill('[name="leverage"]', '10');
    
    // Submit order
    await page.click('button:has-text("Open Position")');
    
    // Verify success toast
    await expect(page.locator('.toast-success')).toBeVisible();
    
    // Check position appears in list
    await page.click('[data-testid="tab-positions"]');
    await expect(page.locator('text=BTCUSDT')).toBeVisible();
  });

  test('should close a position', async ({ page }) => {
    await page.click('[data-testid="tab-positions"]');
    
    // Click close button on first position
    await page.click('[data-testid="close-position"]:first-child');
    
    // Confirm close
    await page.click('button:has-text("Confirm")');
    
    // Verify position is closed
    await expect(page.locator('.position-status:has-text("CLOSED")')).toBeVisible();
  });
});

test.describe('Grid Bot', () => {
  test('should create and start grid bot', async ({ page }) => {
    await page.click('[data-testid="tab-grid-bot"]');
    await page.click('button:has-text("Create Bot")');
    
    // Fill form
    await page.fill('[name="name"]', 'Test Grid Bot');
    await page.fill('[name="symbol"]', 'BTCUSDT');
    await page.fill('[name="upperPrice"]', '70000');
    await page.fill('[name="lowerPrice"]', '60000');
    await page.fill('[name="gridCount"]', '10');
    await page.fill('[name="totalInvestment"]', '1000');
    
    await page.click('button:has-text("Create")');
    
    // Verify bot is created
    await expect(page.locator('text=Test Grid Bot')).toBeVisible();
    
    // Start bot
    await page.click('button:has-text("Start")');
    await expect(page.locator('.bot-status:has-text("Running")')).toBeVisible();
  });
});
```

---

## Performance Tests

### k6 Load Testing

```javascript
// k6/trading-load.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp up
    { duration: '1m', target: 20 },   // Stay at 20
    { duration: '30s', target: 50 },  // Ramp up more
    { duration: '1m', target: 50 },   // Stay at 50
    { duration: '30s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% under 500ms
    http_req_failed: ['rate<0.1'],    // <10% errors
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  // Get prices
  const pricesRes = http.get(`${BASE_URL}/api/prices`);
  check(pricesRes, {
    'prices status 200': (r) => r.status === 200,
    'prices response time < 200ms': (r) => r.timings.duration < 200,
  });

  // Get positions
  const positionsRes = http.get(`${BASE_URL}/api/positions`);
  check(positionsRes, {
    'positions status 200': (r) => r.status === 200,
  });

  sleep(1);
}
```

### Benchmark Tests

```typescript
// __tests__/performance/indicator-benchmark.test.ts
import { describe, it } from 'bun:test';
import { calculateRSI, calculateMACD, calculateBollingerBands } from '@/lib/indicators/calculator';

describe('Indicator Performance', () => {
  const prices = Array(10000).fill(0).map((_, i) => 50000 + Math.sin(i / 100) * 5000);

  it('should calculate RSI for 10000 prices in < 10ms', () => {
    const start = performance.now();
    calculateRSI(prices, 14);
    const duration = performance.now() - start;

    console.log(`RSI: ${duration.toFixed(2)}ms`);
    expect(duration).toBeLessThan(10);
  });

  it('should calculate MACD for 10000 prices in < 20ms', () => {
    const start = performance.now();
    calculateMACD(prices, 12, 26, 9);
    const duration = performance.now() - start;

    console.log(`MACD: ${duration.toFixed(2)}ms`);
    expect(duration).toBeLessThan(20);
  });

  it('should calculate Bollinger Bands for 10000 prices in < 15ms', () => {
    const start = performance.now();
    calculateBollingerBands(prices, 20, 2);
    const duration = performance.now() - start;

    console.log(`BB: ${duration.toFixed(2)}ms`);
    expect(duration).toBeLessThan(15);
  });
});
```

---

## Coverage Requirements

### Minimum Coverage Thresholds

| Category | Lines | Functions | Branches |
|----------|-------|-----------|----------|
| Core Trading | 90% | 90% | 85% |
| Indicators | 85% | 85% | 80% |
| Exchange Clients | 80% | 80% | 75% |
| API Routes | 75% | 75% | 70% |
| React Components | 70% | 70% | 65% |
| **Overall** | **80%** | **80%** | **75%** |

### Coverage Configuration

```json
// package.json
{
  "scripts": {
    "test:coverage": "bun test --coverage",
    "test:coverage:report": "bun test --coverage --reporter=json"
  }
}
```

### CI Coverage Check

```yaml
# .github/workflows/test.yml
- name: Run tests with coverage
  run: bun run test:coverage
  
- name: Check coverage threshold
  run: |
    COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
    if [ $(echo "$COVERAGE < 80" | bc) -eq 1 ]; then
      echo "Coverage $COVERAGE% is below threshold 80%"
      exit 1
    fi
```

---

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
      
      - name: Install dependencies
        run: bun install
        
      - name: Run unit tests
        run: bun run test
        
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  integration-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
    steps:
      - uses: actions/checkout@v4
      
      - name: Run integration tests
        run: bun run test:integration
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/test

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Playwright
        run: bunx playwright install --with-deps
        
      - name: Run E2E tests
        run: bunx playwright test
        
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Best Practices

### DO ✅

1. **Write tests first** - TDD when possible
2. **Use descriptive names** - `should_calculate_pnl_for_long_position`
3. **One assertion per test** - Focus on single behavior
4. **Mock external dependencies** - Don't hit real APIs
5. **Clean up after tests** - Database state, files
6. **Test edge cases** - Empty arrays, null values, boundaries

### DON'T ❌

1. **Test implementation details** - Test behavior, not code
2. **Use shared state** - Each test should be isolated
3. **Skip failing tests** - Fix them or delete
4. **Over-mock** - Only mock what's necessary
5. **Ignore flaky tests** - Fix immediately

---

## Related Documentation

- [ERROR_HANDLING.md](./ERROR_HANDLING.md) - Error handling
- [API_SPECIFICATION.md](../architecture/API_SPECIFICATION.md) - API endpoints
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Development workflow
