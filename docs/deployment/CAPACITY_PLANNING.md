# CITARION Capacity Planning Guide

**Version:** 1.0
**Last Updated:** March 2026
**Status:** Production Ready

---

## Table of Contents

1. [Overview](#1-overview)
2. [System Requirements](#2-system-requirements)
3. [Resource Sizing Guidelines](#3-resource-sizing-guidelines)
4. [Scaling Strategies](#4-scaling-strategies)
5. [Performance Baselines](#5-performance-baselines)
6. [Growth Projections](#6-growth-projections)
7. [Cost Optimization](#7-cost-optimization)
8. [Monitoring & Alerts](#8-monitoring--alerts)

---

## 1. Overview

### 1.1 Purpose

This document provides comprehensive capacity planning guidelines for the CITARION algorithmic trading platform, ensuring optimal resource allocation and scalability.

### 1.2 Scope

- Production deployment sizing
- Development/Staging environments
- Database capacity
- API rate limits
- WebSocket connections
- ML model serving

### 1.3 Key Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| Concurrent Users | Active trading sessions | 1,000+ |
| API Requests/sec | Peak throughput | 10,000 req/s |
| WebSocket Connections | Real-time data streams | 5,000+ |
| Orders/second | Trade execution | 1,000/s |
| Data Points/day | Market data storage | 10M+ |

---

## 2. System Requirements

### 2.1 Minimum Requirements (Development)

```
CPU: 4 cores
RAM: 8 GB
Storage: 50 GB SSD
Network: 100 Mbps
```

### 2.2 Recommended Requirements (Production - Small)

```
CPU: 8 cores
RAM: 32 GB
Storage: 500 GB NVMe SSD
Network: 1 Gbps
```

### 2.3 Recommended Requirements (Production - Medium)

```
CPU: 16 cores
RAM: 64 GB
Storage: 1 TB NVMe SSD
Network: 10 Gbps
```

### 2.4 Recommended Requirements (Production - Large)

```
CPU: 32+ cores
RAM: 128 GB
Storage: 5 TB NVMe SSD (distributed)
Network: 25 Gbps
```

### 2.5 Database Requirements

| Deployment Size | PostgreSQL | TimescaleDB |
|-----------------|------------|-------------|
| Small | 4 vCPU, 16 GB RAM, 200 GB | 4 vCPU, 16 GB RAM, 500 GB |
| Medium | 8 vCPU, 32 GB RAM, 500 GB | 8 vCPU, 32 GB RAM, 1 TB |
| Large | 16 vCPU, 64 GB RAM, 2 TB | 16 vCPU, 64 GB RAM, 5 TB |

---

## 3. Resource Sizing Guidelines

### 3.1 By User Count

| Users | Application Nodes | Database | Redis | ML Service |
|-------|-------------------|----------|-------|------------|
| 100 | 2 nodes (4 CPU, 8GB) | Small | Small | 1 GPU |
| 1,000 | 4 nodes (8 CPU, 16GB) | Medium | Medium | 2 GPU |
| 10,000 | 8 nodes (16 CPU, 32GB) | Large | Large | 4 GPU |
| 100,000 | 16+ nodes (32 CPU, 64GB) | Cluster | Cluster | 8+ GPU |

### 3.2 By Trading Volume

| Daily Trades | API Nodes | DB Connections | WebSocket Capacity |
|--------------|-----------|----------------|-------------------|
| < 10,000 | 2 nodes | 50 | 1,000 |
| 10,000 - 100,000 | 4 nodes | 100 | 5,000 |
| 100,000 - 1M | 8 nodes | 200 | 20,000 |
| > 1M | 16+ nodes | 500+ | 100,000+ |

### 3.3 By Exchange Connections

| Exchanges | Connection Pool | Rate Limit Budget |
|-----------|-----------------|-------------------|
| 1-3 | 10 connections/exchange | 1,200 req/min |
| 4-10 | 5 connections/exchange | 4,000 req/min |
| 10+ | 3 connections/exchange | 12,000 req/min |

### 3.4 ML Model Serving

| Model Type | GPU Memory | Inference Latency | Throughput |
|------------|------------|-------------------|------------|
| Price Predictor (LSTM) | 4 GB | < 50ms | 1000 pred/s |
| Lorentzian Classifier | 2 GB | < 10ms | 5000 pred/s |
| Risk Assessment | 1 GB | < 5ms | 10000 calc/s |
| Sentiment Analysis | 8 GB | < 100ms | 500 docs/s |

---

## 4. Scaling Strategies

### 4.1 Horizontal Scaling

#### Application Layer
```yaml
# kubernetes/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: citarion-api
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: citarion-api
  minReplicas: 3
  maxReplicas: 50
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

#### Database Read Replicas
```
Primary (Writes) → Replica 1 (Reads)
                 → Replica 2 (Reads)
                 → Replica 3 (Analytics)
```

### 4.2 Vertical Scaling

#### When to Scale Up
- CPU utilization > 80% for extended periods
- Memory usage > 85%
- Disk I/O latency > 10ms
- Network saturation > 80%

#### Scaling Steps
1. Monitor resource utilization
2. Identify bottleneck
3. Upgrade instance type
4. Verify performance improvement
5. Update capacity baseline

### 4.3 Database Partitioning

#### TimescaleDB Hypertables
```sql
-- Partition OHLCV data by time
SELECT create_hypertable(
  'OhlcvCandle',
  'openTime',
  chunk_time_interval => INTERVAL '1 day'
);

-- Add compression policy
ALTER TABLE OhlcvCandle SET (
  timescaledb.compress,
  timescaledb.compress_segmentby = 'symbol, exchange'
);

SELECT add_compression_policy(
  'OhlcvCandle',
  INTERVAL '7 days'
);
```

#### Retention Policies
```sql
-- Keep detailed data for 90 days
SELECT add_retention_policy(
  'OhlcvCandle_1m',
  INTERVAL '90 days'
);

-- Keep aggregated data for 2 years
SELECT add_retention_policy(
  'OhlcvCandle_1h',
  INTERVAL '730 days'
);
```

---

## 5. Performance Baselines

### 5.1 Application Performance

| Endpoint | P50 Latency | P95 Latency | P99 Latency |
|----------|-------------|-------------|-------------|
| GET /api/market/prices | 5ms | 15ms | 50ms |
| POST /api/trade | 20ms | 50ms | 100ms |
| GET /api/positions | 10ms | 30ms | 80ms |
| WebSocket subscribe | 2ms | 5ms | 10ms |

### 5.2 Database Performance

| Query Type | Target | Max Acceptable |
|------------|--------|----------------|
| Simple SELECT | < 1ms | 5ms |
| Complex JOIN | < 10ms | 50ms |
| INSERT | < 2ms | 10ms |
| Aggregation | < 50ms | 200ms |

### 5.3 Cache Hit Rates

| Cache Type | Target Hit Rate | Size |
|------------|-----------------|------|
| Market Prices | 99% | 100 MB |
| User Sessions | 95% | 500 MB |
| API Responses | 90% | 1 GB |
| OHLCV Data | 85% | 5 GB |

---

## 6. Growth Projections

### 6.1 User Growth Model

```
Year 1: 1,000 users → 5,000 users
Year 2: 5,000 users → 25,000 users
Year 3: 25,000 users → 100,000 users
```

### 6.2 Data Growth Estimates

| Data Type | Daily Growth | Monthly | Annual |
|-----------|--------------|---------|--------|
| OHLCV Candles | 500 MB | 15 GB | 180 GB |
| Trade Records | 50 MB | 1.5 GB | 18 GB |
| Signal Logs | 20 MB | 600 MB | 7.2 GB |
| System Logs | 100 MB | 3 GB | 36 GB |

### 6.3 Resource Growth Timeline

#### Year 1
- Start: 2 application nodes, small DB
- End: 4 application nodes, medium DB

#### Year 2
- Mid: 8 application nodes, large DB
- End: 16 application nodes, DB cluster

#### Year 3
- Implement multi-region deployment
- Consider dedicated ML infrastructure

---

## 7. Cost Optimization

### 7.1 Reserved Instances

| Commitment | Discount | Recommended For |
|------------|----------|-----------------|
| 1 year | 30-40% | Base infrastructure |
| 3 years | 50-60% | Stable workloads |

### 7.2 Spot/Preemptible Instances

```
Recommended Use Cases:
- CI/CD runners
- Batch processing
- Development environments
- ML training jobs

Not Recommended For:
- Production API servers
- Database servers
- WebSocket servers
```

### 7.3 Storage Tiering

```
Hot Storage (NVMe SSD):
- Active trading data
- Current positions
- Real-time prices

Warm Storage (SSD):
- Recent OHLCV data (30 days)
- User sessions
- Recent logs

Cold Storage (HDD/S3):
- Historical data (>30 days)
- Audit logs
- Backups
```

### 7.4 Auto-scaling Policies

```yaml
# Cost-effective scaling
scaling_policies:
  business_hours:
    schedule: "0 9 * * 1-5"
    min_replicas: 4
    max_replicas: 20
  
  off_hours:
    schedule: "0 21 * * *"
    min_replicas: 2
    max_replicas: 10
  
  weekend:
    schedule: "0 0 * * 0,6"
    min_replicas: 1
    max_replicas: 5
```

---

## 8. Monitoring & Alerts

### 8.1 Capacity Alerts

| Alert | Threshold | Action |
|-------|-----------|--------|
| CPU High | > 80% for 5min | Scale out |
| Memory High | > 85% for 5min | Scale out |
| Disk Low | < 20% free | Add storage |
| Connection Pool | > 80% used | Increase pool |
| Queue Depth | > 1000 messages | Scale workers |

### 8.2 Prometheus Queries

```promql
# CPU utilization
100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Memory utilization
(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100

# Disk utilization
(1 - (node_filesystem_avail_bytes{fstype!="tmpfs"} / node_filesystem_size_bytes{fstype!="tmpfs"})) * 100

# Database connections
pg_stat_activity_count / pg_settings_max_connections * 100
```

### 8.3 Grafana Dashboard Panels

```
1. Resource Overview
   - CPU, Memory, Disk, Network
   
2. Application Metrics
   - Request rate, latency, errors
   
3. Database Metrics
   - Connections, queries/sec, locks
   
4. Trading Metrics
   - Orders/sec, positions, PnL
   
5. Capacity Forecast
   - 7-day projection based on trends
```

### 8.4 Capacity Review Schedule

| Review Type | Frequency | Participants |
|-------------|-----------|--------------|
| Daily Check | Daily | DevOps |
| Weekly Review | Weekly | DevOps + Dev Lead |
| Monthly Planning | Monthly | DevOps + Dev + Product |
| Quarterly Audit | Quarterly | All stakeholders |

---

## Appendix A: Sizing Calculator

### Input Parameters

```
Users: ___________
Daily Trades: ___________
Exchange Connections: ___________
Data Retention: ___________ days
```

### Output Recommendations

```
Application Nodes: X nodes (Y CPU, Z GB RAM)
Database: Size tier
Storage: X GB
Network: X Gbps
Estimated Monthly Cost: $X,XXX
```

---

## Appendix B: Cloud Provider Specifics

### AWS

```
Recommended Instance Types:
- Application: c6i.2xlarge
- Database: r6i.2xlarge (PostgreSQL)
- Cache: r6g.large (ElastiCache)
- ML: g5.xlarge (GPU)

Services:
- EKS for Kubernetes
- RDS for PostgreSQL
- ElastiCache for Redis
- S3 for backups
- CloudWatch for monitoring
```

### Google Cloud

```
Recommended Instance Types:
- Application: n2-standard-8
- Database: n2-standard-8 (Cloud SQL)
- Cache: n2-standard-2 (Memorystore)
- ML: n1-standard-8 + T4 GPU

Services:
- GKE for Kubernetes
- Cloud SQL for PostgreSQL
- Memorystore for Redis
- Cloud Storage for backups
- Cloud Monitoring
```

### Azure

```
Recommended Instance Types:
- Application: Standard_F8s_v2
- Database: Standard_E8s_v3
- Cache: Standard_E2s_v3
- ML: Standard_NC6s_v3

Services:
- AKS for Kubernetes
- Azure Database for PostgreSQL
- Azure Cache for Redis
- Blob Storage for backups
- Azure Monitor
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | March 2026 | CITARION Team | Initial release |

---

*This document is part of the CITARION Documentation Suite.*
