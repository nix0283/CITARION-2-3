# CITARION Microservices Monitoring Guide

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Overview

Comprehensive monitoring setup for all CITARION microservices using Prometheus, Grafana, and distributed logging.

---

## 🏗️ Monitoring Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        MONITORING ARCHITECTURE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐     │
│  │ Price       │   │ Bot         │   │ Risk        │   │ ML          │     │
│  │ Service     │   │ Monitor     │   │ Monitor     │   │ Service     │     │
│  │ :3002       │   │ :3003       │   │ :3004       │   │ :3006       │     │
│  └──────┬──────┘   └──────┬──────┘   └──────┬──────┘   └──────┬──────┘     │
│         │                 │                 │                 │             │
│         └─────────────────┴─────────────────┴─────────────────┘             │
│                                    │                                         │
│                                    ▼                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                        PROMETHEUS                                     │   │
│  │                     (Metrics Collection)                              │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                         GRAFANA                                       │   │
│  │                     (Visualization & Alerts)                          │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Prometheus Configuration

### prometheus.yml

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

rule_files:
  - /etc/prometheus/alert_rules.yml

scrape_configs:
  # Main Application
  - job_name: 'citarion'
    static_configs:
      - targets: ['citarion:3000']
    metrics_path: '/api/metrics'

  # Price Service
  - job_name: 'price-service'
    static_configs:
      - targets: ['price-service:3002']

  # Bot Monitor
  - job_name: 'bot-monitor'
    static_configs:
      - targets: ['bot-monitor:3003']

  # Risk Monitor
  - job_name: 'risk-monitor'
    static_configs:
      - targets: ['risk-monitor:3004']

  # Chat Service
  - job_name: 'chat-service'
    static_configs:
      - targets: ['chat-service:3005']

  # ML Service
  - job_name: 'ml-service'
    static_configs:
      - targets: ['ml-service:3006']
    scrape_interval: 30s

  # RL Service
  - job_name: 'rl-service'
    static_configs:
      - targets: ['rl-service:3007']
    scrape_interval: 30s

  # Redis
  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']

  # Node Exporter (System Metrics)
  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']
```

---

## 🚨 Alert Rules

### alert_rules.yml

```yaml
groups:
  - name: citarion_alerts
    rules:
      # Service Down Alert
      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Service {{ $labels.job }} is down"
          description: "{{ $labels.instance }} has been down for more than 1 minute."

      # High Error Rate
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High error rate on {{ $labels.service }}"
          description: "Error rate is {{ $value }} requests/sec"

      # High Latency
      - alert: HighLatency
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High latency on {{ $labels.service }}"
          description: "95th percentile latency is {{ $value }}s"

      # ML Model Drift
      - alert: MLModelDrift
        expr: ml_model_accuracy < 0.7
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "ML model accuracy degraded"
          description: "Model accuracy is {{ $value }}"

      # Risk Level Critical
      - alert: RiskLevelCritical
        expr: risk_score > 80
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Risk level critical"
          description: "Risk score is {{ $value }}"

      # Drawdown Warning
      - alert: DrawdownWarning
        expr: portfolio_drawdown > 0.1
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: "Portfolio drawdown warning"
          description: "Drawdown is {{ $value | humanizePercentage }}"

      # Exchange Connection Lost
      - alert: ExchangeConnectionLost
        expr: exchange_connected == 0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Exchange connection lost"
          description: "Connection to {{ $labels.exchange }} lost"

      # Memory Usage High
      - alert: HighMemoryUsage
        expr: process_resident_memory_bytes / node_memory_MemTotal_bytes > 0.9
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage"
          description: "Memory usage is {{ $value | humanizePercentage }}"
```

---

## 📈 Grafana Dashboards

### Dashboard Provisioning

```yaml
# grafana/provisioning/dashboards/dashboards.yml
apiVersion: 1

providers:
  - name: 'CITARION'
    orgId: 1
    folder: 'CITARION'
    type: file
    disableDeletion: false
    updateIntervalSeconds: 30
    options:
      path: /etc/grafana/provisioning/dashboards/json
```

### Service Overview Dashboard

```json
{
  "dashboard": {
    "title": "CITARION Services Overview",
    "panels": [
      {
        "title": "Service Status",
        "type": "stat",
        "targets": [
          {
            "expr": "up",
            "legendFormat": "{{ job }}"
          }
        ]
      },
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{ service }}"
          }
        ]
      },
      {
        "title": "Latency (p95)",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "{{ service }}"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~\"5..\"}[5m])",
            "legendFormat": "{{ service }}"
          }
        ]
      }
    ]
  }
}
```

### Trading Dashboard

```json
{
  "dashboard": {
    "title": "Trading Metrics",
    "panels": [
      {
        "title": "Active Positions",
        "type": "stat",
        "targets": [
          {
            "expr": "trading_active_positions"
          }
        ]
      },
      {
        "title": "Portfolio Value",
        "type": "stat",
        "targets": [
          {
            "expr": "portfolio_value_usd"
          }
        ]
      },
      {
        "title": "Risk Score",
        "type": "gauge",
        "targets": [
          {
            "expr": "risk_score"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "max": 100,
            "min": 0,
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {"color": "green", "value": 0},
                {"color": "yellow", "value": 50},
                {"color": "red", "value": 75}
              ]
            }
          }
        }
      },
      {
        "title": "PnL (24h)",
        "type": "graph",
        "targets": [
          {
            "expr": "pnl_total_24h"
          }
        ]
      }
    ]
  }
}
```

---

## 📝 Metrics Exposed by Services

### Price Service Metrics

```
# HELP price_update_count Total price updates received
# TYPE price_update_count counter
price_update_count{exchange="binance", symbol="BTCUSDT"} 123456

# HELP price_update_latency_seconds Latency of price updates
# TYPE price_update_latency_seconds histogram
price_update_latency_seconds_bucket{le="0.001"} 1000
price_update_latency_seconds_bucket{le="0.005"} 5000

# HELP websocket_connections Active WebSocket connections
# TYPE websocket_connections gauge
websocket_connections{exchange="binance"} 5
```

### Bot Monitor Metrics

```
# HELP bot_status Current bot status (1=running, 0=stopped)
# TYPE bot_status gauge
bot_status{bot_type="grid", bot_id="grid-1"} 1

# HELP bot_pnl_total Total PnL per bot
# TYPE bot_pnl_total gauge
bot_pnl_total{bot_type="grid", bot_id="grid-1"} 150.25

# HELP bot_trades_total Total trades executed
# TYPE bot_trades_total counter
bot_trades_total{bot_type="grid", bot_id="grid-1"} 42
```

### Risk Monitor Metrics

```
# HELP risk_score Current risk score (0-100)
# TYPE risk_score gauge
risk_score 45

# HELP portfolio_drawdown Current portfolio drawdown
# TYPE portfolio_drawdown gauge
portfolio_drawdown 0.052

# HELP var_value Value at Risk
# TYPE var_value gauge
var_value{method="historical", confidence="0.95"} -2500

# HELP killswitch_status Kill switch status (1=armed, 0=disarmed)
# TYPE killswitch_status gauge
killswitch_status 1
```

### ML Service Metrics

```
# HELP ml_prediction_latency_seconds ML prediction latency
# TYPE ml_prediction_latency_seconds histogram
ml_prediction_latency_seconds_bucket{le="0.01"} 500
ml_prediction_latency_seconds_bucket{le="0.05"} 900

# HELP ml_model_accuracy Current model accuracy
# TYPE ml_model_accuracy gauge
ml_model_accuracy{model="price_predictor"} 0.82

# HELP ml_predictions_total Total predictions made
# TYPE ml_predictions_total counter
ml_predictions_total{model="price_predictor", type="price"} 10000
```

---

## 🔧 Service Health Endpoints

All services expose a `/health` endpoint:

```json
{
  "status": "ok",
  "timestamp": 1700000000000,
  "uptime": 3600,
  "version": "2.0.0",
  "dependencies": {
    "database": "connected",
    "redis": "connected"
  }
}
```

---

## 📚 Related Documentation

- [MICROSERVICES_DEPLOYMENT.md](MICROSERVICES_DEPLOYMENT.md) - Deployment guide
- [MICROSERVICES_LOGGING.md](MICROSERVICES_LOGGING.md) - Logging configuration
- [../deployment/MONITORING_AND_ALERTING.md](../deployment/MONITORING_AND_ALERTING.md) - Main monitoring guide

---

*Last updated: March 2026 | CITARION Documentation Team*
