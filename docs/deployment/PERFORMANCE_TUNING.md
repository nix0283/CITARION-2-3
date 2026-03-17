# CITARION Performance Tuning Guide

> **Last Updated:** March 2025  
> **Scope:** Application & Infrastructure

---

## Table of Contents

1. [Overview](#overview)
2. [Known Bottlenecks](#known-bottlenecks)
3. [Database Optimization](#database-optimization)
4. [Caching Strategy](#caching-strategy)
5. [Bundle Optimization](#bundle-optimization)
6. [ML Inference Optimization](#ml-inference-optimization)
7. [Load Testing Results](#load-testing-results)

---

## Overview

This document covers performance optimization strategies for CITARION.

### Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| API Response (p95) | < 500ms | 350ms |
| Database Query (p95) | < 100ms | 75ms |
| Time to First Byte | < 200ms | 150ms |
| WebSocket Latency | < 50ms | 30ms |
| ML Prediction | < 500ms | 350ms |

---

## Known Bottlenecks

### 1. Database Queries

**Issue:** N+1 queries in position fetching

```typescript
// ❌ Bad: N+1 problem
const positions = await db.position.findMany();
for (const pos of positions) {
  pos.account = await db.account.findUnique({ where: { id: pos.accountId } });
}

// ✅ Good: Include relations
const positions = await db.position.findMany({
  include: { account: true },
});
```

**Issue:** Missing indexes on frequently queried columns

```sql
-- Add indexes
CREATE INDEX idx_positions_account_status ON "Position"("accountId", status);
CREATE INDEX idx_signals_symbol_status ON "Signal"(symbol, status);
CREATE INDEX idx_trades_user_created ON "Trade"("userId", "createdAt" DESC);
```

### 2. WebSocket Message Handling

**Issue:** Processing blocking the event loop

```typescript
// ❌ Bad: Blocking processing
socket.on('price_update', (data) => {
  // Heavy computation blocks event loop
  const result = heavyCalculation(data);
  broadcast(result);
});

// ✅ Good: Use worker threads or batching
const batchProcessor = new BatchProcessor();
socket.on('price_update', (data) => {
  batchProcessor.add(data);
});

setInterval(() => {
  const results = batchProcessor.process();
  broadcast(results);
}, 100);
```

### 3. Large API Responses

**Issue:** Returning too much data

```typescript
// ❌ Bad: No pagination
const trades = await db.trade.findMany();

// ✅ Good: Paginated response
const trades = await db.trade.findMany({
  skip: (page - 1) * limit,
  take: limit,
  select: {
    id: true,
    symbol: true,
    pnl: true,
    // Only select needed fields
  },
});
```

---

## Database Optimization

### Query Optimization

```sql
-- Analyze slow queries
SELECT 
  query,
  mean_exec_time,
  calls
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Check index usage
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Find unused indexes
SELECT 
  schemaname || '.' || relname AS table,
  indexrelname AS index,
  pg_size_pretty(pg_relation_size(i.indexrelid)) AS index_size,
  idx_scan AS index_scans
FROM pg_stat_user_indexes ui
JOIN pg_index i ON ui.indexrelid = i.indexrelid
WHERE NOT indisunique 
  AND idx_scan < 50 
  AND pg_relation_size(relid) > 5 * 8192
ORDER BY pg_relation_size(i.indexrelid) DESC;
```

### Connection Pooling

```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// .env
DATABASE_URL="postgresql://user:pass@host:5432/citarion?connection_limit=20&pool_timeout=30"

// Or use PgBouncer for production
DATABASE_URL="postgresql://pgbouncer:6432/citarion"
```

### Query Batching

```typescript
// lib/db/batch.ts
import { db } from '@/lib/db';

export async function batchQueries<T>(
  queries: (() => Promise<T>)[],
  batchSize: number = 10
): Promise<T[]> {
  const results: T[] = [];
  
  for (let i = 0; i < queries.length; i += batchSize) {
    const batch = queries.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(q => q()));
    results.push(...batchResults);
  }
  
  return results;
}

// Usage
const positions = await batchQueries(
  symbols.map(s => () => db.position.findMany({ where: { symbol: s } }))
);
```

---

## Caching Strategy

### Cache Layers

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CACHE ARCHITECTURE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                  │
│   │   Browser   │────▶│   Redis     │────▶│   Database  │                  │
│   │   Cache     │     │   Cache     │     │   (Source)  │                  │
│   │   (Local)   │     │   (Shared)  │     │             │                  │
│   └─────────────┘     └─────────────┘     └─────────────┘                  │
│         │                    │                                               │
│         │                    │                                               │
│         ▼                    ▼                                               │
│   ┌─────────────┐     ┌─────────────┐                                       │
│   │  Static     │     │  Query      │                                       │
│   │  Assets     │     │  Results    │                                       │
│   │  (CDN)      │     │  (5-60 min) │                                       │
│   └─────────────┘     └─────────────┘                                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Redis Cache

```typescript
// lib/cache/redis.ts
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const cached = await redis.get(key);
    return cached ? JSON.parse(cached) : null;
  },
  
  async set(key: string, value: any, ttl: number = 300): Promise<void> {
    await redis.setex(key, ttl, JSON.stringify(value));
  },
  
  async del(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  },
  
  async getOrSet<T>(
    key: string,
    fn: () => Promise<T>,
    ttl: number = 300
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached) return cached;
    
    const value = await fn();
    await this.set(key, value, ttl);
    return value;
  },
};

// Usage
const positions = await cache.getOrSet(
  `positions:${userId}`,
  () => db.position.findMany({ where: { accountId } }),
  60 // 1 minute TTL
);
```

### Local Memory Cache

```typescript
// lib/cache/local.ts
class LocalCache<T> {
  private cache = new Map<string, { value: T; expires: number }>();
  
  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }
  
  set(key: string, value: T, ttlMs: number): void {
    this.cache.set(key, {
      value,
      expires: Date.now() + ttlMs,
    });
  }
  
  clear(): void {
    this.cache.clear();
  }
}

// Global instance for frequently accessed data
export const priceCache = new LocalCache<number>();
export const marketDataCache = new LocalCache<MarketData>();
```

### Cache Invalidation

```typescript
// lib/cache/invalidation.ts

// On trade execution
async function executeTrade(params: TradeParams) {
  const result = await exchangeClient.createOrder(params);
  
  // Invalidate relevant caches
  await cache.del(`positions:${params.userId}`);
  await cache.del(`balance:${params.accountId}`);
  await cache.del(`trades:${params.userId}`);
  
  return result;
}

// On position update
async function updatePosition(positionId: string, data: Partial<Position>) {
  const position = await db.position.update({
    where: { id: positionId },
    data,
  });
  
  await cache.del(`position:${positionId}`);
  await cache.del(`positions:${position.accountId}`);
  
  return position;
}
```

---

## Bundle Optimization

### Code Splitting

```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

// Heavy chart component
const TradingChart = dynamic(
  () => import('@/components/chart/trading-chart'),
  { 
    loading: () => <ChartSkeleton />,
    ssr: false,
  }
);

// ML visualization
const MLPredictionPanel = dynamic(
  () => import('@/components/ml/prediction-panel'),
  { ssr: false }
);
```

### Next.js Bundle Analysis

```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }
    return config;
  },
};
```

### Tree Shaking

```typescript
// ❌ Bad: Imports entire library
import _ from 'lodash';
const result = _.debounce(fn, 100);

// ✅ Good: Import only what you need
import debounce from 'lodash/debounce';
const result = debounce(fn, 100);
```

---

## ML Inference Optimization

### Model Quantization

```python
# models/quantize.py
import tensorflow as tf

def quantize_model(model_path: str, output_path: str):
    """Quantize model for faster inference."""
    
    # Load model
    model = tf.keras.models.load_model(model_path)
    
    # Convert to TFLite with quantization
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    converter.target_spec.supported_types = [tf.float16]
    
    quantized_model = converter.convert()
    
    with open(output_path, 'wb') as f:
        f.write(quantized_model)
    
    print(f"Quantized model saved to {output_path}")
    print(f"Size reduction: {get_size_reduction(model_path, output_path)}%")
```

### Batch Predictions

```python
# services/batch_inference.py
import asyncio
from collections import deque

class BatchPredictor:
    def __init__(self, model, batch_size=32, timeout_ms=50):
        self.model = model
        self.batch_size = batch_size
        self.timeout_ms = timeout_ms
        self.queue = deque()
        self.results = {}
        
    async def predict(self, features):
        """Add to batch and wait for result."""
        request_id = str(uuid.uuid4())
        self.queue.append((request_id, features))
        
        # Wait for result
        while request_id not in self.results:
            await asyncio.sleep(0.001)
        
        return self.results.pop(request_id)
    
    async def process_batches(self):
        """Process batches periodically."""
        while True:
            if len(self.queue) >= self.batch_size:
                await self._process_batch()
            await asyncio.sleep(self.timeout_ms / 1000)
    
    async def _process_batch(self):
        batch = [self.queue.popleft() for _ in range(min(len(self.queue), self.batch_size))]
        ids, features = zip(*batch)
        
        # Batch prediction
        predictions = self.model.predict(np.array(features))
        
        for request_id, prediction in zip(ids, predictions):
            self.results[request_id] = prediction
```

### Caching Predictions

```typescript
// Cache ML predictions for similar inputs
const predictionCache = new LRUCache<string, PredictionResult>({
  max: 1000,
  ttl: 60000, // 1 minute
});

async function getCachedPrediction(features: number[]): Promise<PredictionResult> {
  const key = hashFeatures(features);
  
  const cached = predictionCache.get(key);
  if (cached) return cached;
  
  const prediction = await mlClient.predict(features);
  predictionCache.set(key, prediction);
  
  return prediction;
}
```

---

## Load Testing Results

### Test Configuration

```yaml
# k6/config.yaml
stages:
  - duration: 30s
    target: 10
  - duration: 1m
    target: 50
  - duration: 2m
    target: 100
  - duration: 30s
    target: 0
```

### Results Summary

| Endpoint | RPS | Latency (p50) | Latency (p95) | Latency (p99) |
|----------|-----|---------------|---------------|---------------|
| GET /api/prices | 500 | 45ms | 120ms | 250ms |
| GET /api/positions | 200 | 80ms | 180ms | 350ms |
| POST /api/trade | 50 | 200ms | 450ms | 800ms |
| GET /api/signals | 150 | 60ms | 150ms | 300ms |
| WebSocket | 1000 | 20ms | 50ms | 100ms |

### Performance Profiling

```bash
# Node.js profiling
node --prof app.js
node --prof-process isolate-*.log > profile.txt

# Memory profiling
node --inspect app.js
# Open chrome://inspect

# CPU profiling with clinic
bunx clinic doctor -- node app.js
bunx clinic flame -- node app.js
```

---

## Optimization Checklist

```markdown
## Performance Optimization Checklist

### Database
- [ ] Add indexes for frequently queried columns
- [ ] Enable query logging for slow queries
- [ ] Use connection pooling
- [ ] Implement read replicas for heavy read workloads

### Caching
- [ ] Cache frequently accessed data
- [ ] Implement cache invalidation
- [ ] Use Redis for distributed cache
- [ ] Cache ML predictions

### Application
- [ ] Code split heavy components
- [ ] Tree shake unused dependencies
- [ ] Optimize bundle size
- [ ] Use lazy loading

### Infrastructure
- [ ] Enable CDN for static assets
- [ ] Use load balancing
- [ ] Configure proper TTLs
- [ ] Monitor with APM tools
```
