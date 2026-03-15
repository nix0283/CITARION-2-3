# CITARION Monitoring and Alerting

> **Last Updated:** March 2025  
> **Tools:** Prometheus, Grafana, Custom Metrics

---

## Table of Contents

1. [Overview](#overview)
2. [Metrics](#metrics)
3. [Dashboards](#dashboards)
4. [Alerts](#alerts)
5. [Runbooks](#runbooks)
6. [SLI/SLO](#slislo)
7. [Incident Management](#incident-management)

---

## Overview

CITARION implements comprehensive monitoring for trading operations, system health, and business metrics.

### Monitoring Stack

| Component | Tool | Purpose |
|-----------|------|---------|
| Metrics | Prometheus | Collection and storage |
| Visualization | Grafana | Dashboards |
| Alerting | Prometheus Alertmanager | Alert routing |
| Logging | Winston + Loki | Log aggregation |
| Tracing | OpenTelemetry | Distributed tracing |

### Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MONITORING ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                   │
│  │   Next.js   │     │ Microservices│    │   Exchange  │                   │
│  │   App       │     │ (Python/Go)  │    │   APIs      │                   │
│  └──────┬──────┘     └──────┬──────┘     └──────┬──────┘                   │
│         │                   │                   │                          │
│         └───────────────────┼───────────────────┘                          │
│                             │                                                │
│                             ▼                                                │
│                    ┌─────────────────┐                                      │
│                    │   Prometheus    │                                      │
│                    │   (:9090)       │                                      │
│                    └────────┬────────┘                                      │
│                             │                                                │
│              ┌──────────────┼──────────────┐                                │
│              │              │              │                                │
│              ▼              ▼              ▼                                │
│     ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                     │
│     │   Grafana    │ │ Alertmanager │ │    Loki      │                     │
│     │   (:3001)    │ │   (:9093)    │ │   (:3100)    │                     │
│     └──────────────┘ └──────────────┘ └──────────────┘                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Metrics

### Business Metrics

```typescript
// lib/monitoring/prometheus.ts
import { Registry, Counter, Gauge, Histogram, collectDefaultMetrics } from 'prom-client';

// Create registry
export const registry = new Registry();

// Default Node.js metrics
collectDefaultMetrics({ register: registry });

// ==================== TRADING METRICS ====================

export const tradesTotal = new Counter({
  name: 'citarion_trades_total',
  help: 'Total number of trades executed',
  labelNames: ['exchange', 'symbol', 'direction', 'status'],
  registers: [registry],
});

export const pnlCurrent = new Gauge({
  name: 'citarion_pnl_current',
  help: 'Current unrealized PnL',
  labelNames: ['exchange', 'account'],
  registers: [registry],
});

export const positionCount = new Gauge({
  name: 'citarion_positions_active',
  help: 'Number of active positions',
  labelNames: ['exchange', 'direction'],
  registers: [registry],
});

export const signalConfidence = new Histogram({
  name: 'citarion_signal_confidence',
  help: 'Distribution of signal confidence scores',
  buckets: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
  registers: [registry],
});

// ==================== BOT METRICS ====================

export const botStatus = new Gauge({
  name: 'citarion_bot_status',
  help: 'Bot running status (1=running, 0=stopped)',
  labelNames: ['bot_type', 'bot_id', 'symbol'],
  registers: [registry],
});

export const botPnL = new Gauge({
  name: 'citarion_bot_pnl',
  help: 'Bot PnL',
  labelNames: ['bot_type', 'bot_id'],
  registers: [registry],
});

export const botTrades = new Counter({
  name: 'citarion_bot_trades_total',
  help: 'Total trades by bot',
  labelNames: ['bot_type', 'bot_id', 'result'],
  registers: [registry],
});

// ==================== EXCHANGE METRICS ====================

export const exchangeLatency = new Histogram({
  name: 'citarion_exchange_latency_seconds',
  help: 'Exchange API latency',
  labelNames: ['exchange', 'endpoint'],
  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
  registers: [registry],
});

export const exchangeErrors = new Counter({
  name: 'citarion_exchange_errors_total',
  help: 'Total exchange API errors',
  labelNames: ['exchange', 'error_type'],
  registers: [registry],
});

export const exchangeRateLimit = new Gauge({
  name: 'citarion_exchange_rate_limit_remaining',
  help: 'Remaining rate limit',
  labelNames: ['exchange'],
  registers: [registry],
});

// ==================== SYSTEM METRICS ====================

export const websocketConnections = new Gauge({
  name: 'citarion_websocket_connections',
  help: 'Active WebSocket connections',
  labelNames: ['service'],
  registers: [registry],
});

export const apiLatency = new Histogram({
  name: 'citarion_api_latency_seconds',
  help: 'API request latency',
  labelNames: ['method', 'path', 'status'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1],
  registers: [registry],
});

export const dbQueryDuration = new Histogram({
  name: 'citarion_db_query_duration_seconds',
  help: 'Database query duration',
  labelNames: ['query', 'table'],
  buckets: [0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25],
  registers: [registry],
});

// ==================== ML METRICS ====================

export const mlPredictionLatency = new Histogram({
  name: 'citarion_ml_prediction_latency_seconds',
  help: 'ML prediction latency',
  labelNames: ['model', 'prediction_type'],
  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5],
  registers: [registry],
});

export const mlAccuracy = new Gauge({
  name: 'citarion_ml_accuracy',
  help: 'ML model accuracy',
  labelNames: ['model'],
  registers: [registry],
});
```

### Recording Metrics

```typescript
// Example: Recording a trade
export async function executeTrade(params: TradeParams) {
  const timer = exchangeLatency.startTimer({ 
    exchange: params.exchange, 
    endpoint: 'createOrder' 
  });
  
  try {
    const result = await exchangeClient.createOrder(params);
    
    tradesTotal.inc({
      exchange: params.exchange,
      symbol: params.symbol,
      direction: params.direction,
      status: 'success',
    });
    
    return result;
  } catch (error) {
    exchangeErrors.inc({
      exchange: params.exchange,
      error_type: error.code,
    });
    
    throw error;
  } finally {
    timer();
  }
}
```

### Metrics Endpoint

```typescript
// app/api/metrics/route.ts
import { registry } from '@/lib/monitoring/prometheus';

export async function GET() {
  const metrics = await registry.metrics();
  
  return new Response(metrics, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}
```

---

## Dashboards

### Main Trading Dashboard

```json
{
  "title": "CITARION Trading Overview",
  "panels": [
    {
      "title": "Active Positions",
      "type": "stat",
      "targets": [
        {
          "expr": "sum(citarion_positions_active)"
        }
      ]
    },
    {
      "title": "Current PnL",
      "type": "gauge",
      "targets": [
        {
          "expr": "sum(citarion_pnl_current)"
        }
      ],
      "thresholds": {
        "mode": "absolute",
        "steps": [
          { "color": "red", "value": -1000 },
          { "color": "yellow", "value": 0 },
          { "color": "green", "value": 100 }
        ]
      }
    },
    {
      "title": "Trades per Hour",
      "type": "graph",
      "targets": [
        {
          "expr": "rate(citarion_trades_total[1h])"
        }
      ]
    },
    {
      "title": "Exchange Latency",
      "type": "heatmap",
      "targets": [
        {
          "expr": "rate(citarion_exchange_latency_seconds_bucket[5m])"
        }
      ]
    }
  ]
}
```

### Bot Performance Dashboard

```yaml
# grafana/dashboards/bots.json
Panels:
  - Bot Status Table:
      query: citarion_bot_status
      columns: [bot_type, bot_id, symbol, status]
      
  - Bot PnL Ranking:
      query: topk(10, citarion_bot_pnl)
      sort: descending
      
  - Trade Success Rate:
      query: |
        sum(rate(citarion_bot_trades_total{result="success"}[1h])) 
        / 
        sum(rate(citarion_bot_trades_total[1h]))
        
  - Win Rate by Bot Type:
      query: |
        sum by (bot_type) (citarion_bot_trades_total{result="win"})
        /
        sum by (bot_type) (citarion_bot_trades_total)
```

### System Health Dashboard

```yaml
Panels:
  - API Latency (p95):
      query: histogram_quantile(0.95, rate(citarion_api_latency_seconds_bucket[5m]))
      threshold: 500ms
      
  - Error Rate:
      query: |
        sum(rate(citarion_exchange_errors_total[5m])) 
        / 
        sum(rate(citarion_trades_total[5m]))
      threshold: 1%
      
  - WebSocket Connections:
      query: sum(citarion_websocket_connections)
      
  - Database Query Time:
      query: histogram_quantile(0.95, rate(citarion_db_query_duration_seconds_bucket[5m]))
      threshold: 100ms
```

---

## Alerts

### Alert Rules

```yaml
# prometheus/alerts.yml
groups:
  - name: citarion.trading
    rules:
      # High PnL Loss
      - alert: HighPnLLoss
        expr: sum(citarion_pnl_current) < -1000
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High PnL loss detected"
          description: "Total PnL is {{ $value }}"

      # Low Win Rate
      - alert: LowWinRate
        expr: |
          (sum(rate(citarion_bot_trades_total{result="win"}[1h])) 
           / sum(rate(citarion_bot_trades_total[1h]))) < 0.4
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Win rate below 40%"

      # High Error Rate
      - alert: HighErrorRate
        expr: |
          (sum(rate(citarion_exchange_errors_total[5m])) 
           / sum(rate(citarion_trades_total[5m]))) > 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Error rate above 10%"

  - name: citarion.exchange
    rules:
      # Exchange Unavailable
      - alert: ExchangeUnavailable
        expr: citarion_exchange_status == 0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Exchange {{ $labels.exchange }} unavailable"

      # High Latency
      - alert: HighExchangeLatency
        expr: |
          histogram_quantile(0.95, rate(citarion_exchange_latency_seconds_bucket[5m])) > 2
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High latency for {{ $labels.exchange }}"

      # Rate Limit Warning
      - alert: RateLimitApproaching
        expr: citarion_exchange_rate_limit_remaining < 100
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: "Rate limit low for {{ $labels.exchange }}"

  - name: citarion.system
    rules:
      # API Latency
      - alert: HighAPILatency
        expr: |
          histogram_quantile(0.95, rate(citarion_api_latency_seconds_bucket[5m])) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "API latency p95 > 1s"

      # WebSocket Disconnections
      - alert: WebSocketDisconnections
        expr: |
          delta(citarion_websocket_connections[5m]) < -5
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: "Multiple WebSocket disconnections"

      # Database Slow Queries
      - alert: SlowDatabaseQueries
        expr: |
          histogram_quantile(0.95, rate(citarion_db_query_duration_seconds_bucket[5m])) > 0.1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Database queries p95 > 100ms"
```

### Alertmanager Configuration

```yaml
# alertmanager/config.yml
global:
  resolve_timeout: 5m

route:
  group_by: ['severity', 'alertname']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  receiver: 'default'
  routes:
    - match:
        severity: critical
      receiver: 'critical'
      continue: false
    - match:
        severity: warning
      receiver: 'warning'

receivers:
  - name: 'default'
    telegram_configs:
      - bot_token: '{{ .TelegramBotToken }}'
        api_url: 'https://api.telegram.org'
        chat_id: -1001234567890
        parse_mode: 'HTML'

  - name: 'critical'
    telegram_configs:
      - bot_token: '{{ .TelegramBotToken }}'
        chat_id: -1001234567890
        parse_mode: 'HTML'
    # Also send email for critical
    email_configs:
      - to: 'oncall@example.com'
        from: 'alerts@citarion.com'
        smarthost: 'smtp.example.com:587'

  - name: 'warning'
    telegram_configs:
      - bot_token: '{{ .TelegramBotToken }}'
        chat_id: -1001234567890
        parse_mode: 'HTML'

templates:
  - '/etc/alertmanager/templates/*.tmpl'
```

### Alert Template

```html
<!-- alertmanager/templates/telegram.tmpl -->
{{ define "telegram.default.message" }}
{{ if eq .Status "firing" }}
🔥 <b>ALERT: {{ .GroupLabels.alertname }}</b>
{{ else }}
✅ <b>RESOLVED: {{ .GroupLabels.alertname }}</b>
{{ end }}

<b>Severity:</b> {{ .GroupLabels.severity }}
<b>Description:</b> {{ range .Alerts }}{{ .Annotations.description }}{{ end }}
<b>Time:</b> {{ .CommonAnnotations.timestamp }}
{{ end }}
```

---

## Runbooks

### High PnL Loss Runbook

```markdown
## Alert: HighPnLLoss

### Symptoms
- Total unrealized PnL below -1000 USDT

### Diagnosis
1. Check open positions:
   ```sql
   SELECT symbol, direction, unrealized_pnl 
   FROM Position 
   WHERE status = 'OPEN' 
   ORDER BY unrealized_pnl ASC;
   ```

2. Check recent trades:
   ```sql
   SELECT * FROM Trade 
   WHERE createdAt > NOW() - INTERVAL '1 hour'
   ORDER BY pnl;
   ```

3. Check market conditions:
   - Major price movements
   - High volatility
   - Funding rates

### Remediation
1. If single bad position:
   - Close position manually
   - Review bot settings

2. If market crash:
   - Consider kill switch
   - Reduce leverage

3. If bot malfunction:
   - Stop affected bot
   - Review bot configuration

### Escalation
- Level 1: On-call engineer
- Level 2: Trading team lead
```

### Exchange Unavailable Runbook

```markdown
## Alert: ExchangeUnavailable

### Symptoms
- Exchange API returning errors
- Cannot place/monitor orders

### Diagnosis
1. Check exchange status page
2. Test API directly:
   ```bash
   curl -X GET "https://api.binance.com/api/v3/ping"
   ```
3. Check network connectivity
4. Check API key status

### Remediation
1. If exchange maintenance:
   - Wait for exchange to recover
   - Notify users

2. If API key issue:
   - Regenerate API key
   - Update credentials

3. If network issue:
   - Check firewall rules
   - Check DNS resolution

### Escalation
- Level 1: On-call engineer
- Level 2: DevOps team
```

---

## SLI/SLO

### Service Level Indicators

| SLI | Description | Target |
|-----|-------------|--------|
| Availability | Uptime percentage | 99.9% |
| Latency (p95) | API response time | < 500ms |
| Error Rate | Failed requests | < 1% |
| Trade Success | Successful trades | > 99% |

### Service Level Objectives

```yaml
# SLO definitions
slos:
  availability:
    target: 99.9
    window: 30d
    measurement: |
      (sum(rate(http_requests_total{status!~"5.."}[30d])) 
       / sum(rate(http_requests_total[30d]))) * 100

  latency:
    target: 95
    threshold_ms: 500
    measurement: |
      histogram_quantile(0.95, 
        sum(rate(http_request_duration_seconds_bucket[7d])) by (le)
      ) < 0.5

  error_rate:
    target: 1
    measurement: |
      (sum(rate(http_requests_total{status=~"5.."}[7d])) 
       / sum(rate(http_requests_total[7d]))) * 100

  trade_success:
    target: 99
    measurement: |
      (sum(rate(citarion_trades_total{status="success"}[7d])) 
       / sum(rate(citarion_trades_total[7d]))) * 100
```

### Error Budget

```
Error Budget = 1 - SLO

For 99.9% availability:
- Daily budget: 1m 26s downtime
- Monthly budget: 43m 50s downtime
- Yearly budget: 8h 45m downtime
```

---

## Incident Management

### Incident Severity Levels

| Level | Name | Response | Example |
|-------|------|----------|---------|
| SEV1 | Critical | 15 min | Trading halted, data loss |
| SEV2 | High | 30 min | Exchange down, high loss |
| SEV3 | Medium | 2 hours | Bot malfunction |
| SEV4 | Low | 1 day | Minor bugs |

### Incident Response Process

```
1. DETECT
   ├─ Alert triggered
   ├─ User report
   └─ Monitoring dashboard

2. TRIAGE
   ├─ Assess severity
   ├─ Assign responder
   └─ Create incident channel

3. RESPOND
   ├─ Investigate root cause
   ├─ Implement fix
   └─ Communicate status

4. RESOLVE
   ├─ Verify fix
   ├─ Close incident
   └─ Update documentation

5. REVIEW
   ├─ Post-mortem (SEV1/SEV2)
   ├─ Action items
   └─ Process improvement
```

### Post-Mortem Template

```markdown
# Incident: [Title]

## Summary
- **Date:** YYYY-MM-DD
- **Duration:** X hours Y minutes
- **Severity:** SEV1/SEV2/SEV3/SEV4
- **Impact:** [Description of user/business impact]

## Timeline
- HH:MM - Alert triggered
- HH:MM - Investigation started
- HH:MM - Root cause identified
- HH:MM - Fix implemented
- HH:MM - Incident resolved

## Root Cause
[Technical explanation of what happened]

## Contributing Factors
1. Factor 1
2. Factor 2

## Resolution
[Steps taken to resolve the incident]

## Action Items
| Action | Owner | Priority | Status |
|--------|-------|----------|--------|
| Item 1 | @name | High | Pending |
| Item 2 | @name | Medium | Done |

## Lessons Learned
- What went well
- What could be improved
```

---

## Related Documentation

- [DEPLOYMENT_GUIDE.md](../deployment/DEPLOYMENT_GUIDE.md) - Deployment setup
- [ERROR_HANDLING.md](./ERROR_HANDLING.md) - Error handling
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Troubleshooting guide
