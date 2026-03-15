# CITARION Administrator Guide

**Version:** 1.0
**Last Updated:** March 2026
**Status:** Production Ready

---

## Table of Contents

1. [Administration Overview](#1-administration-overview)
2. [User Management](#2-user-management)
3. [System Configuration](#3-system-configuration)
4. [Exchange Management](#4-exchange-management)
5. [Bot Administration](#5-bot-administration)
6. [Monitoring & Alerts](#6-monitoring--alerts)
7. [Security Administration](#7-security-administration)
8. [Backup & Recovery](#8-backup--recovery)
9. [Audit Logs](#9-audit-logs)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Administration Overview

### 1.1 Admin Roles

| Role | Permissions | Access Level |
|------|-------------|--------------|
| **Super Admin** | Full system access | All features |
| **Admin** | User & bot management | Most features |
| **Moderator** | User support | Limited features |
| **Support** | Read-only access | User data only |

### 1.2 Admin Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  Admin Panel                                                │
├─────────────────────────────────────────────────────────────┤
│  Users │ Exchanges │ Bots │ Logs │ Settings │ Monitoring   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  System Status: 🟢 Operational                              │
│                                                             │
│  Active Users: 1,234    Active Bots: 456                    │
│  Daily Trades: 12,345   Daily Volume: $5.6M                 │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Recent Alerts                                      │   │
│  │  • High latency on Binance API (5 min ago)          │   │
│  │  • User #1234 exceeded rate limit (10 min ago)      │   │
│  │  • New user registration spike (1 hour ago)         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 Admin Access

**Admin Panel URL:** `/admin`

**Authentication:**
- Requires admin role
- 2FA mandatory
- IP whitelist recommended

---

## 2. User Management

### 2.1 User Overview

```
Total Users:        5,000
Active (30 days):   3,500
Premium Users:      500
New Today:          25
```

### 2.2 User Search & Filter

**Search by:**
- User ID
- Email address
- Username
- Telegram ID

**Filter by:**
- Account type (Free/Premium/Enterprise)
- Trading mode (Demo/Real)
- Registration date
- Last activity
- Status (Active/Suspended/Banned)

### 2.3 User Actions

| Action | Description | Confirmation |
|--------|-------------|--------------|
| View Profile | See user details | None |
| Edit Profile | Modify user data | Admin password |
| Suspend Account | Temporary disable | Admin password + reason |
| Ban Account | Permanent disable | Super admin + reason |
| Reset Password | Send reset link | None |
| Reset 2FA | Remove 2FA requirement | Admin password |
| Delete Account | Remove all data | Super admin + 2FA |

### 2.4 User Detail View

```
User: #12345
Email: user@example.com
Plan: Premium
Trading Mode: REAL
Registered: Jan 15, 2024
Last Active: 5 minutes ago

Connected Exchanges:
  • Binance (Active)
  • Bybit (Active)
  
Active Bots: 3
Open Positions: 5
Total Trades: 1,234
Total PnL: +$5,678

Recent Activity:
  • Opened BTCUSDT position (2 min ago)
  • Started Grid Bot (1 hour ago)
  • Modified settings (3 hours ago)
```

### 2.5 Bulk Operations

**Available Operations:**
- Send notification to all users
- Export user data (CSV/JSON)
- Apply settings to multiple users
- Suspend inactive accounts

---

## 3. System Configuration

### 3.1 Global Settings

```yaml
# System configuration
system:
  maintenance_mode: false
  registration_enabled: true
  email_verification_required: true
  
trading:
  max_leverage: 125
  default_leverage: 10
  max_open_positions: 50
  min_trade_amount: 10  # USD
  
limits:
  free:
    max_bots: 3
    max_trades_per_day: 100
    api_rate_limit: 100  # requests per minute
  premium:
    max_bots: 20
    max_trades_per_day: 1000
    api_rate_limit: 500
  enterprise:
    max_bots: unlimited
    max_trades_per_day: unlimited
    api_rate_limit: 2000
```

### 3.2 Feature Flags

| Feature | Status | Description |
|---------|--------|-------------|
| `grid_bot` | ✅ Enabled | Grid trading bot |
| `dca_bot` | ✅ Enabled | DCA bot |
| `signal_bot` | ✅ Enabled | Signal-based trading |
| `copy_trading` | ⚠️ Beta | Copy trader feature |
| `ml_signals` | ⚠️ Beta | ML-powered signals |
| `advanced_analytics` | ✅ Premium | Advanced reporting |

### 3.3 Rate Limiting

```typescript
// Rate limit configuration
const RATE_LIMITS = {
  global: {
    windowMs: 60000, // 1 minute
    maxRequests: 1000,
  },
  perUser: {
    windowMs: 60000,
    maxRequests: {
      free: 100,
      premium: 500,
      enterprise: 2000,
    },
  },
  perEndpoint: {
    '/api/trade/order': { windowMs: 1000, maxRequests: 10 },
    '/api/market/prices': { windowMs: 1000, maxRequests: 100 },
  },
};
```

### 3.4 Exchange Rate Limits

| Exchange | Limit | Action |
|----------|-------|--------|
| Binance | 1200 req/min | Throttle users |
| Bybit | 600 req/min | Queue requests |
| OKX | 300 req/min | Batch operations |

---

## 4. Exchange Management

### 4.1 Exchange Status

```
Exchange    Status      Users    Daily Volume    Issues
────────────────────────────────────────────────────────
Binance     🟢 Active   2,500    $2.5M           0
Bybit       🟢 Active   1,500    $1.2M           0
OKX         🟡 Issues   500      $500K           3
Bitget      🟢 Active   300      $200K           0
BingX       🟢 Active   200      $100K           0
```

### 4.2 Exchange Configuration

```typescript
interface ExchangeAdminConfig {
  id: string;
  name: string;
  enabled: boolean;
  maintenance: boolean;
  testnet: {
    enabled: boolean;
    url: string;
  };
  mainnet: {
    url: string;
  };
  rateLimits: {
    requestsPerMinute: number;
    ordersPerSecond: number;
  };
  fees: {
    maker: number;
    taker: number;
  };
  features: {
    spot: boolean;
    futures: boolean;
    margin: boolean;
  };
}
```

### 4.3 Exchange Health Monitoring

**Health Checks:**
- API connectivity
- WebSocket connection
- Order execution test
- Balance sync test

**Alert Thresholds:**
- Latency > 500ms: Warning
- Latency > 2000ms: Critical
- Error rate > 5%: Warning
- Error rate > 20%: Critical

### 4.4 Maintenance Mode

**Enable Maintenance:**
1. Go to **Admin > Exchanges**
2. Select exchange
3. Enable "Maintenance Mode"
4. Set expected duration
5. Notify affected users (optional)

---

## 5. Bot Administration

### 5.1 Bot Statistics

```
Total Bots:         2,500
Active Bots:        1,800
  - Grid Bots:      600
  - DCA Bots:       400
  - Signal Bots:    500
  - Strategy Bots:  300
Inactive Bots:      700
```

### 5.2 Bot Performance Monitoring

**Key Metrics:**
- Average PnL per bot
- Win rate by bot type
- Execution latency
- Error rates

**Alert Conditions:**
- Bot with > 50% loss
- Bot with high error rate
- Bot not executing signals

### 5.3 Bot Actions

| Action | Description |
|--------|-------------|
| View Details | Bot configuration and performance |
| Pause Bot | Temporarily stop execution |
| Resume Bot | Restart paused bot |
| Force Close | Close all positions and stop |
| Delete Bot | Remove bot (with confirmation) |

### 5.4 Bot Limits

```yaml
bot_limits:
  free:
    grid_bots: 1
    dca_bots: 1
    signal_bots: 1
    strategy_bots: 0
  premium:
    grid_bots: 5
    dca_bots: 5
    signal_bots: 5
    strategy_bots: 5
  enterprise:
    grid_bots: unlimited
    dca_bots: unlimited
    signal_bots: unlimited
    strategy_bots: unlimited
```

---

## 6. Monitoring & Alerts

### 6.1 System Metrics

**Infrastructure:**
- CPU utilization
- Memory usage
- Disk I/O
- Network traffic
- Database connections

**Application:**
- Request rate
- Response latency
- Error rate
- Active sessions

### 6.2 Alert Configuration

```yaml
alerts:
  critical:
    - name: System Down
      condition: health_check_failed
      channels: [pagerduty, slack, email]
      escalation: immediate
    
    - name: Database Connection Lost
      condition: db_connection_failed
      channels: [pagerduty, slack]
      escalation: immediate

  warning:
    - name: High CPU Usage
      condition: cpu > 80%
      duration: 5m
      channels: [slack]
      escalation: 30m
    
    - name: High Error Rate
      condition: error_rate > 5%
      duration: 2m
      channels: [slack]
      escalation: 15m
```

### 6.3 Alert Channels

| Channel | Use Case | Response Time |
|---------|----------|---------------|
| PagerDuty | Critical incidents | Immediate |
| Slack | Warnings, info | 15 minutes |
| Email | Daily summaries | 24 hours |

### 6.4 Incident Management

**Incident Severity Levels:**

| Level | Description | Response | Resolution |
|-------|-------------|----------|------------|
| P1 - Critical | System down | Immediate | < 1 hour |
| P2 - High | Major feature broken | < 15 min | < 4 hours |
| P3 - Medium | Feature degraded | < 1 hour | < 24 hours |
| P4 - Low | Minor issue | < 4 hours | < 72 hours |

---

## 7. Security Administration

### 7.1 Security Dashboard

```
Security Overview (Last 24 Hours)
─────────────────────────────────
Failed Login Attempts:     156
Successful Logins:         1,234
2FA Enabled:              89%
API Key Regenerations:    23
Suspicious Activity:       5
```

### 7.2 Access Control

**IP Whitelist:**
```
Admin Access IPs:
  • 192.168.1.0/24 (Office)
  • 10.0.0.1 (VPN)
```

**API Key Management:**
- View all API keys
- Regenerate compromised keys
- Set expiration policies
- Monitor usage patterns

### 7.3 Security Audit

**Audit Points:**
- [ ] All admins have 2FA enabled
- [ ] API keys have minimum permissions
- [ ] No hardcoded credentials in code
- [ ] SSL certificates valid
- [ ] Security headers configured
- [ ] Rate limiting active

### 7.4 Incident Response

**Security Incident Procedure:**
1. Identify and contain the threat
2. Notify security team
3. Document incident details
4. Assess scope and impact
5. Remediate vulnerability
6. Post-incident review

---

## 8. Backup & Recovery

### 8.1 Backup Schedule

| Data Type | Frequency | Retention | Location |
|-----------|-----------|-----------|----------|
| Database | Hourly | 30 days | S3 + Glacier |
| User Data | Daily | 90 days | S3 |
| Logs | Daily | 30 days | S3 |
| Configs | On change | 1 year | Git |

### 8.2 Backup Verification

**Automated Checks:**
- Backup completion alerts
- Integrity verification
- Restore test (weekly)

**Manual Verification:**
- Monthly restore drill
- Documented procedures

### 8.3 Recovery Procedures

**Database Recovery:**
```bash
# 1. Stop application
kubectl scale deployment citarion-api --replicas=0

# 2. Restore from backup
pg_restore -d citarion_db backup_2026_03_15.dump

# 3. Verify data integrity
psql -d citarion_db -c "SELECT COUNT(*) FROM users;"

# 4. Restart application
kubectl scale deployment citarion-api --replicas=3
```

### 8.4 Disaster Recovery

**Recovery Time Objectives:**
- RTO (Recovery Time): 1 hour
- RPO (Recovery Point): 1 hour

**Failover Procedure:**
1. Detect primary failure
2. Promote standby database
3. Update DNS records
4. Verify all services
5. Notify stakeholders

---

## 9. Audit Logs

### 9.1 Log Types

| Log Type | Retention | Access |
|----------|-----------|--------|
| Authentication | 1 year | Admin |
| Trade Execution | 5 years | Admin + User |
| Admin Actions | 5 years | Super Admin |
| System Events | 90 days | Admin |
| API Requests | 30 days | Admin |

### 9.2 Audit Log Format

```json
{
  "timestamp": "2026-03-15T10:30:00Z",
  "event": "USER_LOGIN",
  "userId": "usr_12345",
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "details": {
    "method": "password",
    "2fa": true,
    "newDevice": false
  },
  "result": "SUCCESS"
}
```

### 9.3 Audit Search

**Search Filters:**
- Date range
- Event type
- User ID
- IP address
- Result (success/failure)

### 9.4 Compliance Reports

**Available Reports:**
- Monthly audit summary
- User activity report
- Admin action report
- Security incident report

---

## 10. Troubleshooting

### 10.1 Common Issues

#### Exchange Connection Issues

**Symptoms:**
- "Exchange disconnected" errors
- Stale balance data
- Order execution failures

**Resolution:**
1. Check exchange status page
2. Verify API endpoint accessibility
3. Test with new API credentials
4. Check rate limit status

#### High Latency

**Symptoms:**
- Slow API responses
- WebSocket delays
- Order execution lag

**Resolution:**
1. Check server resource usage
2. Review database query performance
3. Check network latency to exchanges
4. Scale horizontally if needed

#### Bot Not Executing

**Symptoms:**
- Signals received but not executed
- Positions not opening
- Grid orders not placed

**Resolution:**
1. Check bot status and logs
2. Verify account balance
3. Check exchange order limits
4. Review signal format

### 10.2 Diagnostic Commands

```bash
# Check service health
curl -X GET https://api.citarion.io/health

# Check database connection
psql -h $DB_HOST -U $DB_USER -d citarion -c "SELECT 1;"

# Check Redis connection
redis-cli -h $REDIS_HOST ping

# Check exchange connectivity
node scripts/check-exchange-connections.js

# View recent errors
kubectl logs -l app=citarion-api --tail=100 | grep ERROR
```

### 10.3 Support Escalation

```
Level 1: Support Team (Response: < 4 hours)
  └── User issues, basic troubleshooting

Level 2: DevOps Team (Response: < 1 hour)
  └── Infrastructure, deployments

Level 3: Engineering Team (Response: < 30 min)
  └── Code bugs, performance issues

Level 4: On-call Engineer (Response: < 15 min)
  └── Critical production issues
```

---

## Appendix A: Admin API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/users` | GET | List all users |
| `/api/admin/users/:id` | GET | Get user details |
| `/api/admin/users/:id/suspend` | POST | Suspend user |
| `/api/admin/bots` | GET | List all bots |
| `/api/admin/system/status` | GET | System status |
| `/api/admin/logs` | GET | View audit logs |

---

## Appendix B: Emergency Contacts

| Role | Contact | Availability |
|------|---------|--------------|
| On-call Engineer | +1-xxx-xxx-xxxx | 24/7 |
| DevOps Lead | devops@citarion.io | Business hours |
| Security Team | security@citarion.io | Business hours |
| Executive | exec@citarion.io | Business hours |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | March 2026 | CITARION Team | Initial release |

---

*This document is part of the CITARION Documentation Suite.*
