# Exchange Health Check System

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Overview

Real-time health monitoring for all connected exchanges to ensure optimal routing and failover decisions.

---

## 🏗️ Health Check Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     EXCHANGE HEALTH CHECK SYSTEM                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                     HEALTH CHECK SERVICE                               │  │
│  │                        (Port 3008)                                     │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                    │                                         │
│         ┌──────────────────────────┼──────────────────────────┐             │
│         │                          │                          │             │
│         ▼                          ▼                          ▼             │
│   ┌───────────┐             ┌───────────┐             ┌───────────┐        │
│   │  Binance  │             │   Bybit   │             │    OKX    │        │
│   │  Health   │             │  Health   │             │  Health   │        │
│   │  Check    │             │  Check    │             │  Check    │        │
│   └───────────┘             └───────────┘             └───────────┘        │
│                                                                              │
│   Metrics Collected:                                                         │
│   • API Latency (p50, p95, p99)                                              │
│   • WebSocket Latency                                                        │
│   • Order Success Rate                                                       │
│   • Rate Limit Status                                                        │
│   • System Status                                                            │
│   • Order Book Depth                                                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Health Metrics

### Collected Metrics

| Metric | Description | Update Frequency |
|--------|-------------|------------------|
| **API Latency** | REST API response time | Every request |
| **WS Latency** | WebSocket message delay | Every message |
| **Success Rate** | Order success percentage | Rolling 5 min |
| **Rate Limit** | Remaining API calls | Every response |
| **Order Book** | Depth and spread | Every update |
| **System Status** | Exchange operational status | Every 30s |

### Health Score Components

```typescript
interface ExchangeHealthMetrics {
  exchange: ExchangeId;
  
  // Latency metrics
  apiLatency: {
    p50: number;
    p95: number;
    p99: number;
  };
  wsLatency: number;
  
  // Success metrics
  orderSuccessRate: number;
  apiSuccessRate: number;
  
  // Rate limits
  rateLimitRemaining: number;
  rateLimitLimit: number;
  rateLimitReset: number;
  
  // Order book quality
  orderBookDepth: number;
  spreadPercentage: number;
  
  // System status
  systemStatus: 'operational' | 'degraded' | 'maintenance' | 'down';
  
  // Computed
  healthScore: number;
  lastUpdate: number;
}
```

---

## 🔧 Health Check Endpoints

### Internal API

```typescript
// GET /internal/health/:exchange
app.get('/internal/health/:exchange', async (req, res) => {
  const { exchange } = req.params;
  const health = await healthService.getHealth(exchange);
  res.json(health);
});

// GET /internal/health/all
app.get('/internal/health/all', async (req, res) => {
  const health = await healthService.getAllHealth();
  res.json(health);
});

// GET /internal/health/status
app.get('/internal/health/status', async (req, res) => {
  const status = await healthService.getSystemStatus();
  res.json(status);
});
```

### Response Example

```json
{
  "exchange": "binance",
  "healthScore": 92,
  "status": "healthy",
  "metrics": {
    "apiLatency": {
      "p50": 150,
      "p95": 450,
      "p99": 800
    },
    "wsLatency": 50,
    "orderSuccessRate": 0.995,
    "apiSuccessRate": 0.998,
    "rateLimitRemaining": 5500,
    "rateLimitLimit": 6000,
    "orderBookDepth": 500,
    "spreadPercentage": 0.01
  },
  "systemStatus": "operational",
  "lastUpdate": 1700000000000
}
```

---

## 🔄 Health Check Implementation

### REST API Check

```typescript
async function checkRestHealth(exchange: ExchangeId): Promise<RestHealth> {
  const client = getExchangeClient(exchange);
  const startTime = Date.now();
  
  try {
    // Ping endpoint
    await client.getTime();
    const latency = Date.now() - startTime;
    
    return {
      status: 'ok',
      latency,
      timestamp: Date.now()
    };
  } catch (error) {
    return {
      status: 'error',
      latency: -1,
      error: error.message,
      timestamp: Date.now()
    };
  }
}
```

### WebSocket Check

```typescript
async function checkWsHealth(exchange: ExchangeId): Promise<WsHealth> {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const ws = connectWebSocket(exchange);
    
    const timeout = setTimeout(() => {
      ws.disconnect();
      resolve({ status: 'timeout', latency: -1 });
    }, 5000);
    
    ws.on('message', () => {
      clearTimeout(timeout);
      const latency = Date.now() - startTime;
      ws.disconnect();
      resolve({ status: 'ok', latency });
    });
    
    ws.on('error', (error) => {
      clearTimeout(timeout);
      ws.disconnect();
      resolve({ status: 'error', error: error.message });
    });
  });
}
```

### Order Book Quality Check

```typescript
async function checkOrderBookQuality(exchange: ExchangeId, symbol: string): Promise<OrderBookHealth> {
  const client = getExchangeClient(exchange);
  const orderBook = await client.getOrderBook(symbol);
  
  const bestBid = parseFloat(orderBook.bids[0]?.[0] || 0);
  const bestAsk = parseFloat(orderBook.asks[0]?.[0] || 0);
  
  if (bestBid === 0 || bestAsk === 0) {
    return { quality: 'poor', depth: 0, spread: Infinity };
  }
  
  const spread = (bestAsk - bestBid) / bestBid * 100;
  const depth = orderBook.bids.length + orderBook.asks.length;
  
  let quality: 'excellent' | 'good' | 'fair' | 'poor';
  if (spread < 0.01 && depth > 100) quality = 'excellent';
  else if (spread < 0.05 && depth > 50) quality = 'good';
  else if (spread < 0.1 && depth > 20) quality = 'fair';
  else quality = 'poor';
  
  return { quality, depth, spread };
}
```

---

## ⚠️ Alert Thresholds

### Configuration

```typescript
const ALERT_THRESHOLDS = {
  latency: {
    warning: 2000,    // 2 seconds
    critical: 5000,   // 5 seconds
  },
  successRate: {
    warning: 0.95,    // 95%
    critical: 0.90,   // 90%
  },
  healthScore: {
    warning: 70,
    critical: 50,
  },
  rateLimitRemaining: {
    warning: 100,
    critical: 20,
  },
  spread: {
    warning: 0.05,    // 0.05%
    critical: 0.1,    // 0.1%
  },
};
```

### Alert Generation

```typescript
function generateAlerts(health: ExchangeHealthMetrics): Alert[] {
  const alerts: Alert[] = [];
  
  // Latency alerts
  if (health.apiLatency.p95 > ALERT_THRESHOLDS.latency.critical) {
    alerts.push({
      severity: 'critical',
      type: 'HIGH_LATENCY',
      exchange: health.exchange,
      message: `P95 latency ${health.apiLatency.p95}ms exceeds critical threshold`,
    });
  }
  
  // Success rate alerts
  if (health.orderSuccessRate < ALERT_THRESHOLDS.successRate.critical) {
    alerts.push({
      severity: 'critical',
      type: 'LOW_SUCCESS_RATE',
      exchange: health.exchange,
      message: `Order success rate ${(health.orderSuccessRate * 100).toFixed(1)}% below critical`,
    });
  }
  
  return alerts;
}
```

---

## 📊 Prometheus Metrics

### Exposed Metrics

```
# Exchange latency
exchange_api_latency_ms{exchange="binance",percentile="p95"} 450

# Exchange health score
exchange_health_score{exchange="binance"} 92

# Exchange status (1=up, 0=down)
exchange_status{exchange="binance"} 1

# Order success rate
exchange_order_success_rate{exchange="binance"} 0.995

# Rate limit remaining
exchange_rate_limit_remaining{exchange="binance"} 5500

# Order book spread
exchange_orderbook_spread{exchange="binance",symbol="BTCUSDT"} 0.01
```

---

## 🔧 Configuration

```yaml
# config/health-check.yaml
healthCheck:
  interval: 5000
  timeout: 3000
  retries: 3
  
  exchanges:
    binance:
      enabled: true
      priority: 1
      endpoints:
        - /api/v3/ping
        - /api/v3/time
      symbols:
        - BTCUSDT
        - ETHUSDT
        
    bybit:
      enabled: true
      priority: 2
      endpoints:
        - /v5/market/time
        
    okx:
      enabled: true
      priority: 3
      endpoints:
        - /api/v5/public/time
        
  alerts:
    channels:
      - slack
      - telegram
    cooldown: 300000  # 5 minutes
```

---

## 📚 Related Documentation

- [EXCHANGE_FAILOVER.md](EXCHANGE_FAILOVER.md) - Failover strategy
- [../microservices/MICROSERVICES_MONITORING.md](../microservices/MICROSERVICES_MONITORING.md) - Service monitoring
- [../deployment/MONITORING_AND_ALERTING.md](../deployment/MONITORING_AND_ALERTING.md) - Alerting setup

---

*Last updated: March 2026 | CITARION Documentation Team*
