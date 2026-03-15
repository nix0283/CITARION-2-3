# CITARION Microservices Testing Guide

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Overview

Comprehensive testing strategy for CITARION microservices, including unit, integration, contract, and end-to-end testing.

---

## 🧪 Testing Pyramid

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           TESTING PYRAMID                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                              ┌─────────┐                                     │
│                              │   E2E   │  (Few, Slow, Expensive)            │
│                              │  Tests  │                                     │
│                           ┌──┴─────────┴──┐                                  │
│                           │  Integration  │  (Some, Medium)                 │
│                           │    Tests      │                                  │
│                        ┌──┴───────────────┴──┐                               │
│                        │      Contract       │  (Per Interface)             │
│                        │       Tests         │                               │
│                     ┌──┴─────────────────────┴──┐                            │
│                     │        Unit Tests          │  (Many, Fast, Cheap)     │
│                     │                           │                            │
│                     └───────────────────────────┘                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Test Structure

```
mini-services/
├── price-service/
│   ├── src/
│   └── __tests__/
│       ├── unit/
│       │   ├── price-aggregator.test.ts
│       │   └── websocket-handler.test.ts
│       ├── integration/
│       │   └── exchange-integration.test.ts
│       └── contract/
│           └── price-api.contract.test.ts
│
├── bot-monitor/
│   └── __tests__/
│       ├── unit/
│       ├── integration/
│       └── e2e/
│
├── ml-service/
│   ├── tests/
│   │   ├── test_price_predictor.py
│   │   ├── test_signal_classifier.py
│   │   └── test_api.py
│   └── conftest.py
│
└── rl-service/
    └── tests/
```

---

## 🔬 Unit Testing

### TypeScript Services

```typescript
// __tests__/unit/price-aggregator.test.ts
import { describe, it, expect, beforeEach, vi } from 'bun:test';
import { PriceAggregator } from '../src/price-aggregator';

describe('PriceAggregator', () => {
  let aggregator: PriceAggregator;
  
  beforeEach(() => {
    aggregator = new PriceAggregator();
  });
  
  describe('updatePrice', () => {
    it('should update price for symbol', () => {
      aggregator.updatePrice('BTCUSDT', 67000.50, 'binance');
      
      const price = aggregator.getPrice('BTCUSDT');
      
      expect(price).toEqual({
        symbol: 'BTCUSDT',
        price: 67000.50,
        exchange: 'binance',
        timestamp: expect.any(Number)
      });
    });
    
    it('should use best price from multiple exchanges', () => {
      aggregator.updatePrice('BTCUSDT', 67000.50, 'binance');
      aggregator.updatePrice('BTCUSDT', 67001.00, 'bybit');
      
      const bestPrice = aggregator.getBestPrice('BTCUSDT');
      
      expect(bestPrice.price).toBe(67000.50);
    });
  });
  
  describe('calculateVWAP', () => {
    it('should calculate VWAP correctly', () => {
      aggregator.updatePrice('BTCUSDT', 67000, 'binance', 100);
      aggregator.updatePrice('BTCUSDT', 67100, 'bybit', 50);
      
      const vwap = aggregator.calculateVWAP('BTCUSDT');
      
      expect(vwap).toBeCloseTo(67033.33, 2);
    });
  });
});
```

### Python Services

```python
# tests/test_price_predictor.py
import pytest
import numpy as np
from ml.predictors import PricePredictor

class TestPricePredictor:
    @pytest.fixture
    def predictor(self):
        return PricePredictor(model_path="models/test_model.h5")
    
    def test_predict_returns_valid_shape(self, predictor):
        features = np.random.randn(1, 60, 10)  # Batch, timesteps, features
        prediction = predictor.predict(features)
        
        assert prediction.shape == (1, 3)  # 3 horizons
        assert np.all(prediction > 0)
    
    def test_predict_with_invalid_input_raises(self, predictor):
        with pytest.raises(ValueError):
            predictor.predict(None)
    
    def test_confidence_in_valid_range(self, predictor):
        features = np.random.randn(1, 60, 10)
        result = predictor.predict_with_confidence(features)
        
        assert 0 <= result['confidence'] <= 1
```

---

## 🔗 Integration Testing

### Service-to-Service Testing

```typescript
// __tests__/integration/trade-flow.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import { io } from 'socket.io-client';

describe('Trade Flow Integration', () => {
  let priceWs: any;
  let botWs: any;
  
  beforeAll(async () => {
    priceWs = io('http://localhost:3002');
    botWs = io('http://localhost:3003');
    
    await Promise.all([
      new Promise(resolve => priceWs.on('connect', resolve)),
      new Promise(resolve => botWs.on('connect', resolve))
    ]);
  });
  
  afterAll(() => {
    priceWs.disconnect();
    botWs.disconnect();
  });
  
  it('should execute complete trade flow', async () => {
    // 1. Subscribe to prices
    priceWs.emit('subscribe', { symbols: ['BTCUSDT'] });
    
    // 2. Wait for price update
    const priceUpdate = await new Promise(resolve => {
      priceWs.on('price_update', resolve);
    });
    
    expect(priceUpdate).toHaveProperty('symbol', 'BTCUSDT');
    expect(priceUpdate).toHaveProperty('price');
    
    // 3. Execute trade
    const response = await fetch('http://localhost:3000/api/trade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        symbol: 'BTCUSDT',
        side: 'BUY',
        quantity: 0.001,
        type: 'MARKET'
      })
    });
    
    const trade = await response.json();
    expect(trade).toHaveProperty('orderId');
    
    // 4. Verify bot update
    const botUpdate = await new Promise(resolve => {
      botWs.on('bot_update', resolve);
    });
    
    expect(botUpdate).toHaveProperty('status');
  });
});
```

### Database Integration

```typescript
// __tests__/integration/database.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { db } from '@/lib/db';
import { PrismaClient } from '@prisma/client';

describe('Database Integration', () => {
  beforeEach(async () => {
    // Clean test data
    await db.trade.deleteMany({ where: { test: true } });
    await db.position.deleteMany({ where: { test: true } });
  });
  
  afterEach(async () => {
    await db.trade.deleteMany({ where: { test: true } });
    await db.position.deleteMany({ where: { test: true } });
  });
  
  it('should create and retrieve position', async () => {
    const position = await db.position.create({
      data: {
        symbol: 'BTCUSDT',
        side: 'LONG',
        size: 0.001,
        entryPrice: 67000,
        exchange: 'binance',
        test: true
      }
    });
    
    const retrieved = await db.position.findUnique({
      where: { id: position.id }
    });
    
    expect(retrieved).toMatchObject({
      symbol: 'BTCUSDT',
      side: 'LONG',
      size: 0.001
    });
  });
});
```

---

## 📜 Contract Testing

### API Contract Tests

```typescript
// __tests__/contract/price-service.contract.test.ts
import { describe, it, expect } from 'bun:test';

const PRICE_SERVICE_CONTRACT = {
  endpoints: {
    '/health': {
      method: 'GET',
      response: {
        status: 'string',
        timestamp: 'number',
        uptime: 'number'
      }
    },
    '/prices': {
      method: 'GET',
      response: {
        prices: [{
          symbol: 'string',
          price: 'number',
          change24h: 'number',
          volume24h: 'number',
          exchange: 'string',
          timestamp: 'number'
        }]
      }
    }
  },
  wsEvents: {
    incoming: ['subscribe', 'unsubscribe'],
    outgoing: ['price_update', 'error']
  }
};

describe('Price Service Contract', () => {
  it('should match /health endpoint contract', async () => {
    const response = await fetch('http://localhost:3002/health');
    const data = await response.json();
    
    expect(typeof data.status).toBe('string');
    expect(typeof data.timestamp).toBe('number');
    expect(typeof data.uptime).toBe('number');
  });
  
  it('should match /prices endpoint contract', async () => {
    const response = await fetch('http://localhost:3002/prices?symbols=BTCUSDT');
    const data = await response.json();
    
    expect(Array.isArray(data.prices)).toBe(true);
    
    if (data.prices.length > 0) {
      const price = data.prices[0];
      expect(typeof price.symbol).toBe('string');
      expect(typeof price.price).toBe('number');
      expect(typeof price.exchange).toBe('string');
    }
  });
});
```

### Consumer-Driven Contracts

```typescript
// Using Pact for consumer-driven contracts
import { PactV3 } from '@pact-foundation/pact';

const provider = new PactV3({
  consumer: 'bot-monitor',
  provider: 'price-service',
  port: 3002
});

describe('Price Service Consumer Contract', () => {
  it('should provide price updates', async () => {
    await provider
      .given('price data exists')
      .uponReceiving('a request for BTCUSDT price')
      .withRequest({
        method: 'GET',
        path: '/prices',
        query: { symbols: 'BTCUSDT' }
      })
      .willRespondWith({
        status: 200,
        body: {
          prices: eachLike({
            symbol: like('BTCUSDT'),
            price: like(67000.50),
            exchange: like('binance')
          })
        }
      });
    
    await provider.executeTest(async (mockServer) => {
      const response = await fetch(`${mockServer.url}/prices?symbols=BTCUSDT`);
      const data = await response.json();
      
      expect(data.prices[0].symbol).toBe('BTCUSDT');
    });
  });
});
```

---

## 🌐 End-to-End Testing

### Playwright E2E Tests

```typescript
// e2e/trading.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Trading Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Login or set auth state
  });
  
  test('should execute a market order', async ({ page }) => {
    // Navigate to trading panel
    await page.click('[data-testid="trading-panel"]');
    
    // Select symbol
    await page.fill('[data-testid="symbol-input"]', 'BTCUSDT');
    await page.press('[data-testid="symbol-input"]', 'Enter');
    
    // Wait for price load
    await page.waitForSelector('[data-testid="current-price"]');
    
    // Open position
    await page.click('[data-testid="buy-button"]');
    await page.fill('[data-testid="quantity-input"]', '0.001');
    await page.click('[data-testid="confirm-order"]');
    
    // Verify order confirmation
    await expect(page.locator('[data-testid="order-status"]')).toHaveText('Filled');
  });
  
  test('should start grid bot', async ({ page }) => {
    await page.click('[data-testid="bots-tab"]');
    await page.click('[data-testid="grid-bot-card"]');
    await page.click('[data-testid="create-bot-button"]');
    
    // Fill bot configuration
    await page.fill('[data-testid="bot-symbol"]', 'BTCUSDT');
    await page.fill('[data-testid="grid-levels"]', '10');
    await page.fill('[data-testid="grid-spacing"]', '100');
    
    await page.click('[data-testid="start-bot-button"]');
    
    await expect(page.locator('[data-testid="bot-status"]')).toHaveText('Running');
  });
});
```

---

## 🔧 Mocking External Services

### Exchange Mock

```typescript
// __mocks__/exchange-client.ts
export class MockExchangeClient {
  private prices: Map<string, number> = new Map([
    ['BTCUSDT', 67000],
    ['ETHUSDT', 3500]
  ]);
  
  async getPrice(symbol: string): Promise<number> {
    return this.prices.get(symbol) || 0;
  }
  
  async createOrder(order: Order): Promise<OrderResult> {
    return {
      orderId: `mock-${Date.now()}`,
      symbol: order.symbol,
      side: order.side,
      quantity: order.quantity,
      price: this.prices.get(order.symbol) || 0,
      status: 'FILLED',
      timestamp: Date.now()
    };
  }
  
  async getPositions(): Promise<Position[]> {
    return [];
  }
  
  simulatePriceChange(symbol: string, newPrice: number): void {
    this.prices.set(symbol, newPrice);
  }
}
```

### WebSocket Mock

```typescript
// __mocks__/websocket.ts
import { EventEmitter } from 'events';

export class MockWebSocket extends EventEmitter {
  connected = false;
  
  connect(): void {
    this.connected = true;
    this.emit('connect');
  }
  
  disconnect(): void {
    this.connected = false;
    this.emit('disconnect');
  }
  
  emit(event: string, data?: any): boolean {
    return super.emit(event, data);
  }
  
  // Helper to simulate server messages
  simulateServerMessage(event: string, data: any): void {
    this.emit(event, data);
  }
}
```

---

## 📊 Load Testing

### k6 Load Test

```javascript
// load/trading-api.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '1m', target: 10 },   // Ramp up
    { duration: '3m', target: 50 },   // Sustained load
    { duration: '1m', target: 100 },  // Peak load
    { duration: '1m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% under 500ms
    errors: ['rate<0.01'],             // <1% errors
  },
};

export default function() {
  // Get prices
  const pricesRes = http.get('http://localhost:3000/api/prices');
  check(pricesRes, {
    'prices status 200': (r) => r.status === 200,
    'prices response time < 200ms': (r) => r.timings.duration < 200,
  });
  
  // Create trade (10% of requests)
  if (Math.random() < 0.1) {
    const tradeRes = http.post('http://localhost:3000/api/demo/trade', JSON.stringify({
      symbol: 'BTCUSDT',
      side: Math.random() > 0.5 ? 'BUY' : 'SELL',
      quantity: 0.001,
      type: 'MARKET'
    }), { headers: { 'Content-Type': 'application/json' } });
    
    check(tradeRes, {
      'trade status 200': (r) => r.status === 200,
    });
    
    errorRate.add(tradeRes.status !== 200);
  }
  
  sleep(1);
}
```

---

## ✅ Test Coverage

### Coverage Targets

| Service | Unit | Integration | E2E |
|---------|------|-------------|-----|
| Main App | 80% | 70% | 50% |
| Price Service | 90% | 80% | - |
| Bot Monitor | 85% | 75% | - |
| Risk Monitor | 95% | 85% | - |
| ML Service | 80% | 70% | - |
| RL Service | 75% | 65% | - |

### Running Coverage

```bash
# TypeScript
bun run test:coverage

# Python
pytest --cov=src --cov-report=html
```

---

## 📚 Related Documentation

- [../development/TESTING_STRATEGY.md](../development/TESTING_STRATEGY.md) - Main testing strategy
- [MICROSERVICES_DEPLOYMENT.md](MICROSERVICES_DEPLOYMENT.md) - Deployment guide
- [../development/TROUBLESHOOTING.md](../development/TROUBLESHOOTING.md) - Troubleshooting

---

*Last updated: March 2026 | CITARION Documentation Team*
