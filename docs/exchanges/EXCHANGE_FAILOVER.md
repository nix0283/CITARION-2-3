# Exchange Failover Strategy

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Overview

This document describes the exchange failover strategy for CITARION, ensuring continuous trading operations even when primary exchanges experience issues.

---

## 🏗️ Failover Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        EXCHANGE FAILOVER ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │                    EXCHANGE ROUTER                                    │  │
│   │            (Intelligent Exchange Selection)                           │  │
│   └───────────────────────────────┬──────────────────────────────────────┘  │
│                                   │                                          │
│        ┌──────────────────────────┼──────────────────────────┐              │
│        │                          │                          │              │
│        ▼                          ▼                          ▼              │
│   ┌─────────┐               ┌─────────┐               ┌─────────┐          │
│   │ Primary │               │Secondary│               │Tertiary │          │
│   │ Binance │               │  Bybit  │               │   OKX   │          │
│   │  P: 1   │               │  P: 2   │               │  P: 3   │          │
│   └────┬────┘               └────┬────┘               └────┬────┘          │
│        │                         │                         │               │
│        │    Health Monitor       │                         │               │
│        │    ┌────────────────────┴─────────────────────────┘               │
│        │    │                                                                │
│        ▼    ▼                                                                │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │                     HEALTH CHECK SERVICE                              │  │
│   │            (Latency, Connectivity, Rate Limits)                       │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Failover Triggers

### Automatic Failover Conditions

| Condition | Threshold | Action |
|-----------|-----------|--------|
| **API Latency** | > 5 seconds | Route to secondary |
| **Connection Loss** | 3 failed attempts | Route to secondary |
| **Rate Limited** | 429 status code | Backoff + secondary |
| **Order Failure** | 2 consecutive failures | Route to secondary |
| **Exchange Maintenance** | Announced | Pre-emptive switch |

### Health Score Calculation

```typescript
interface ExchangeHealth {
  exchange: string;
  latency: number;        // ms
  successRate: number;    // 0-1
  rateLimitRemaining: number;
  lastUpdate: number;
  score: number;          // 0-100
}

function calculateHealthScore(health: ExchangeHealth): number {
  let score = 100;
  
  // Latency penalty (up to -30 points)
  if (health.latency > 5000) score -= 30;
  else if (health.latency > 2000) score -= 20;
  else if (health.latency > 1000) score -= 10;
  
  // Success rate penalty (up to -40 points)
  if (health.successRate < 0.9) score -= 40;
  else if (health.successRate < 0.95) score -= 20;
  else if (health.successRate < 0.99) score -= 10;
  
  // Rate limit penalty (up to -30 points)
  if (health.rateLimitRemaining < 10) score -= 30;
  else if (health.rateLimitRemaining < 50) score -= 15;
  else if (health.rateLimitRemaining < 100) score -= 5;
  
  return Math.max(0, score);
}
```

---

## 🔀 Exchange Priority

### Default Priority Configuration

```typescript
interface ExchangePriority {
  symbol: string;
  primary: ExchangeId;
  secondary: ExchangeId;
  tertiary?: ExchangeId;
}

const EXCHANGE_PRIORITIES: ExchangePriority[] = [
  { symbol: 'BTCUSDT', primary: 'binance', secondary: 'bybit', tertiary: 'okx' },
  { symbol: 'ETHUSDT', primary: 'binance', secondary: 'bybit', tertiary: 'okx' },
  { symbol: 'SOLUSDT', primary: 'bybit', secondary: 'binance', tertiary: 'okx' },
  // ... more symbols
];
```

### Dynamic Priority Adjustment

```typescript
function selectBestExchange(symbol: string): ExchangeId {
  const priority = EXCHANGE_PRIORITIES.find(p => p.symbol === symbol);
  if (!priority) return 'binance'; // Default
  
  const exchanges = [priority.primary, priority.secondary, priority.tertiary]
    .filter(Boolean);
  
  // Sort by health score
  const sorted = exchanges.sort((a, b) => {
    const healthA = getExchangeHealth(a);
    const healthB = getExchangeHealth(b);
    return healthB.score - healthA.score;
  });
  
  return sorted[0];
}
```

---

## 🔧 Failover Configuration

```typescript
// config/failover.ts
export const FAILOVER_CONFIG = {
  // Health check settings
  healthCheck: {
    interval: 5000,         // 5 seconds
    timeout: 3000,          // 3 second timeout
    endpoints: ['/api/v3/ping', '/api/v3/time'],
  },
  
  // Failover thresholds
  thresholds: {
    minHealthScore: 50,     // Switch if score < 50
    maxLatency: 5000,       // Max acceptable latency
    minSuccessRate: 0.95,   // Min success rate
  },
  
  // Recovery settings
  recovery: {
    checkInterval: 30000,   // Check primary every 30s
    minRecoveryScore: 80,   // Switch back when score > 80
    cooldownPeriod: 60000,  // Wait 60s before switching back
  },
  
  // Circuit breaker
  circuitBreaker: {
    failureThreshold: 5,    // Open after 5 failures
    resetTimeout: 60000,    // Try again after 60s
  },
};
```

---

## 🚨 Failover Events

### Event Types

```typescript
type FailoverEvent = 
  | { type: 'FAILOVER_TRIGGERED'; from: ExchangeId; to: ExchangeId; reason: string }
  | { type: 'FAILOVER_RECOVERED'; to: ExchangeId }
  | { type: 'HEALTH_DEGRADED'; exchange: ExchangeId; score: number }
  | { type: 'CIRCUIT_OPENED'; exchange: ExchangeId }
  | { type: 'CIRCUIT_CLOSED'; exchange: ExchangeId };
```

### Event Handling

```typescript
// Listen for failover events
failoverManager.on('FAILOVER_TRIGGERED', (event) => {
  logger.warn({
    from: event.from,
    to: event.to,
    reason: event.reason
  }, 'Exchange failover triggered');
  
  // Notify monitoring
  metrics.increment('failover.count', { from: event.from, to: event.to });
  
  // Alert team
  if (event.reason === 'CONNECTION_LOSS') {
    alerting.sendCriticalAlert(`Exchange ${event.from} connection lost`);
  }
});
```

---

## 📊 Monitoring Failover

### Prometheus Metrics

```
# Failover events
failover_events_total{from="binance",to="bybit"} 5

# Exchange health scores
exchange_health_score{exchange="binance"} 85
exchange_health_score{exchange="bybit"} 92

# Circuit breaker state
circuit_breaker_state{exchange="binance"} 0  # 0=closed, 1=open
```

### Grafana Dashboard

```json
{
  "panels": [
    {
      "title": "Exchange Health Scores",
      "type": "gauge",
      "targets": [
        { "expr": "exchange_health_score" }
      ]
    },
    {
      "title": "Failover Events",
      "type": "graph",
      "targets": [
        { "expr": "rate(failover_events_total[5m])" }
      ]
    },
    {
      "title": "Active Exchange per Symbol",
      "type": "stat",
      "targets": [
        { "expr": "active_exchange" }
      ]
    }
  ]
}
```

---

## 📚 Related Documentation

- [EXCHANGE_HEALTH_CHECK.md](EXCHANGE_HEALTH_CHECK.md) - Health monitoring
- [../microservices/MICROSERVICES_MONITORING.md](../microservices/MICROSERVICES_MONITORING.md) - Service monitoring
- [../deployment/INCIDENT_RESPONSE_PLAYBOOK.md](../deployment/INCIDENT_RESPONSE_PLAYBOOK.md) - Incident handling

---

*Last updated: March 2026 | CITARION Documentation Team*
