# CITARION Incident Response Playbook

> **Last Updated:** March 2025  
> **Classification:** Operations

---

## Table of Contents

1. [Overview](#overview)
2. [Severity Levels](#severity-levels)
3. [Incident Scenarios](#incident-scenarios)
4. [Communication Plan](#communication-plan)
5. [Post-Incident Actions](#post-incident-actions)

---

## Overview

This playbook provides step-by-step procedures for common incident scenarios.

### Response Team Roles

| Role | Responsibility | Contact |
|------|---------------|---------|
| **Incident Commander** | Overall coordination, decisions | @commander |
| **Tech Lead** | Technical resolution | @techlead |
| **DevOps** | Infrastructure, deployment | @devops |
| **Communications** | User notifications | @comms |

---

## Severity Levels

| Level | Name | Response | Resolution Target |
|-------|------|----------|-------------------|
| SEV1 | Critical | 15 min | 1 hour |
| SEV2 | High | 30 min | 4 hours |
| SEV3 | Medium | 2 hours | 24 hours |
| SEV4 | Low | 1 day | 1 week |

---

## Incident Scenarios

### Scenario 1: Database Outage

**Symptoms:**
- Database connection errors
- Timeouts on all API requests
- Health check failing

**Detection:**
```bash
# Check database connection
curl http://localhost:3000/api/health/db

# Check Prisma status
bunx prisma db execute --stdin <<< "SELECT 1"
```

**Impact Assessment:**
- All trading operations blocked
- Users cannot view positions
- No bot operations

**Mitigation Steps:**

1. **Immediate (0-5 min)**
   ```bash
   # Check database process
   ps aux | grep postgres
   # or for SQLite
   ls -la dev.db
   
   # Check disk space
   df -h
   
   # Restart database if needed
   sudo systemctl restart postgresql
   ```

2. **Short-term (5-30 min)**
   ```bash
   # Check connection pool
   # Increase if needed in .env
   DATABASE_URL="postgresql://...?connection_limit=20"
   
   # Clear any locks
   bunx prisma db execute --stdin <<< "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = 'idle';"
   ```

3. **Communication**
   - Post status update to Telegram
   - Update status page
   - Notify support team

**Rollback:**
```bash
# If migration caused issue
bunx prisma migrate rollback

# If data corruption suspected
# Restore from backup
pg_restore -d citarion backup.dump
```

---

### Scenario 2: Exchange API Unavailable

**Symptoms:**
- Trading errors from specific exchange
- WebSocket disconnections
- Rate limit errors

**Detection:**
```bash
# Check exchange status
curl https://api.binance.com/api/v3/ping
curl https://api.bybit.com/v5/market/time

# Check logs
grep "EXCHANGE_UNAVAILABLE" /var/log/citarion/*.log
```

**Impact Assessment:**
- Trading suspended on affected exchange
- Positions may be stale
- Bot operations affected

**Mitigation Steps:**

1. **Immediate (0-5 min)**
   ```typescript
   // Trigger circuit breaker
   exchangeCircuitBreakers.binance.forceOpen();
   
   // Stop affected bots
   await stopBotsForExchange('binance');
   ```

2. **Short-term (5-30 min)**
   ```bash
   # Check exchange status page
   # https://www.binance.com/en/support/announcement
   
   # Switch to backup exchange if available
   # Or queue orders for later execution
   ```

3. **User Communication**
   ```typescript
   // Notify users
   await notifyAllUsers({
     type: 'exchange_down',
     exchange: 'binance',
     message: 'Binance API is temporarily unavailable. Your positions are safe.',
   });
   ```

**Recovery:**
```bash
# Monitor exchange recovery
watch -n 5 'curl -s https://api.binance.com/api/v3/ping'

# Re-enable trading
# Reset circuit breaker
exchangeCircuitBreakers.binance.reset();

# Restart bots
await startBotsForExchange('binance');
```

---

### Scenario 3: ML Service Down

**Symptoms:**
- Prediction requests timing out
- ML-related features not working
- Vision bot inactive

**Detection:**
```bash
# Check ML service health
curl http://localhost:3006/health

# Check process
ps aux | grep "python.*ml-service"

# Check logs
tail -f mini-services/ml-service/logs/*.log
```

**Impact Assessment:**
- No ML predictions available
- Signal classification degraded
- Vision bot cannot operate

**Mitigation Steps:**

1. **Immediate (0-5 min)**
   ```bash
   # Check if process running
   pgrep -f "python.*ml-service"
   
   # Restart service
   cd mini-services/ml-service
   python main.py &
   ```

2. **Fallback Mode**
   ```typescript
   // Enable fallback to rule-based signals
   enableFallbackSignals(true);
   
   // Disable ML-dependent features
   disableFeature('ml_predictions');
   disableFeature('vision_bot');
   ```

3. **Investigation**
   ```bash
   # Check memory
   free -h
   
   # Check GPU if used
   nvidia-smi
   
   # Check model files
   ls -la models/
   ```

---

### Scenario 4: Security Breach

**Symptoms:**
- Unauthorized access detected
- Suspicious API key usage
- Data exfiltration attempt

**Detection:**
```bash
# Check failed auth attempts
grep "AUTH_FAILED" /var/log/citarion/*.log | tail -100

# Check unusual API usage
grep "API_KEY.*USAGE" /var/log/citarion/*.log | grep -v "normal_pattern"

# Check for data access anomalies
# Query audit logs for suspicious patterns
```

**Impact Assessment:**
- User data potentially compromised
- API keys may be exposed
- System integrity at risk

**Mitigation Steps:**

1. **Immediate (0-5 min)**
   ```bash
   # Lock down system
   # Revoke all API keys
   bun run scripts/revoke-all-keys.ts
   
   # Disable external access
   # (Update firewall rules)
   
   # Enable audit mode
   enableAuditMode(true);
   ```

2. **Investigation**
   ```bash
   # Preserve logs
   cp -r /var/log/citarion /tmp/incident-logs
   
   # Check access logs
   grep "200\|201" /var/log/nginx/*.log | grep -v "health"
   
   # Identify affected users
   bun run scripts/identify-affected-users.ts
   ```

3. **Communication**
   - Notify security team immediately
   - Prepare user notification (delayed until investigation complete)
   - Document timeline

---

### Scenario 5: DDoS Attack

**Symptoms:**
- Extremely high request volume
- Server resources exhausted
- Legitimate users unable to access

**Detection:**
```bash
# Check request rate
tail -f /var/log/nginx/access.log | cut -d' ' -f1 | uniq -c | sort -rn | head

# Check connection count
netstat -an | grep :3000 | wc -l

# Check load
top -bn1 | head -5
```

**Impact Assessment:**
- Service degraded or unavailable
- API rate limits exhausted
- Potential exchange API bans

**Mitigation Steps:**

1. **Immediate (0-5 min)**
   ```bash
   # Enable rate limiting (stricter)
   # Update rate limits
   export RATE_LIMIT_REQUESTS_PER_MINUTE=10
   
   # Enable CloudFlare protection if available
   # (Configure in CloudFlare dashboard)
   ```

2. **IP Blocking**
   ```bash
   # Identify attacking IPs
   tail -10000 /var/log/nginx/access.log | cut -d' ' -f1 | sort | uniq -c | sort -rn | head -20
   
   # Block IPs
   for ip in $(cat attacking_ips.txt); do
     iptables -A INPUT -s $ip -j DROP
   done
   ```

3. **Scale Up**
   ```bash
   # Add more instances if using Kubernetes
   kubectl scale deployment citarion --replicas=5
   
   # Or start additional processes
   pm2 scale citarion 4
   ```

---

### Scenario 6: Data Corruption

**Symptoms:**
- Inconsistent data in database
- Missing records
- Calculation errors

**Detection:**
```bash
# Check data integrity
bun run scripts/check-data-integrity.ts

# Verify positions match exchange
bun run scripts/sync-positions.ts --dry-run

# Check for orphan records
bun run scripts/find-orphans.ts
```

**Impact Assessment:**
- Incorrect PnL calculations
- Position mismatches
- User trust impact

**Mitigation Steps:**

1. **Immediate (0-5 min)**
   ```bash
   # Stop all trading operations
   triggerKillSwitch('Data corruption detected');
   
   # Create backup of current state
   pg_dump citarion > /tmp/corrupted_backup.sql
   ```

2. **Investigation**
   ```sql
   -- Find recent changes
   SELECT * FROM trades 
   WHERE created_at > NOW() - INTERVAL '1 hour'
   ORDER BY created_at DESC;
   
   -- Check for anomalies
   SELECT * FROM positions 
   WHERE avg_entry_price <= 0 OR total_amount <= 0;
   ```

3. **Recovery**
   ```bash
   # Restore from last known good backup
   pg_restore -d citarion_clean last_good_backup.dump
   
   # Replay transactions from logs
   bun run scripts/replay-transactions.ts --from="2025-03-13T10:00:00Z"
   ```

---

## Communication Plan

### Internal Communication

```markdown
## Incident Update Template

**Incident ID:** INC-YYYY-MM-DD-NNN
**Severity:** SEV1/SEV2/SEV3/SEV4
**Status:** Investigating / Identified / Mitigating / Resolved

### Summary
[Brief description of the issue]

### Impact
- [Who/what is affected]
- [Duration of impact]

### Current Status
[What's being done]

### Next Update
[Expected time for next update]
```

### External Communication

```markdown
## User Notification Template

**Status Page Update:**

🔴 **Service Degradation** - [Service Name]
We are currently experiencing issues with [service]. 
Our team is actively working on a resolution.

Started: [timestamp]
Impact: [description]
Update: [timestamp] - [latest update]

Follow @citarion_status for updates.
```

---

## Post-Incident Actions

### Immediate Actions (Within 24 hours)

1. **Confirm Resolution**
   ```bash
   # Verify all systems operational
   bun run scripts/health-check.ts --all
   
   # Check error rates
   grep "ERROR" /var/log/citarion/*.log | tail -100
   ```

2. **Notify Stakeholders**
   - Send resolution notification
   - Update status page
   - Thank response team

3. **Preserve Evidence**
   ```bash
   # Archive logs
   tar -czf incident-logs-$DATE.tar.gz /var/log/citarion/*.log
   
   # Archive relevant data
   pg_dump citarion > incident-snapshot-$DATE.sql
   ```

### Post-Mortem (Within 48 hours)

```markdown
# Post-Mortem: [Incident Title]

## Summary
- **Date:** YYYY-MM-DD
- **Duration:** X hours Y minutes
- **Severity:** SEV1/SEV2/SEV3/SEV4
- **Impact:** [Description]

## Timeline
| Time | Event |
|------|-------|
| HH:MM | Alert triggered |
| HH:MM | Investigation started |
| HH:MM | Root cause identified |
| HH:MM | Fix deployed |
| HH:MM | Incident resolved |

## Root Cause
[Technical explanation]

## Contributing Factors
1. Factor 1
2. Factor 2

## Resolution
[Steps taken]

## Action Items
| Action | Owner | Due | Status |
|--------|-------|-----|--------|
| Item 1 | @name | Date | Pending |

## Lessons Learned
- What went well
- What could be improved
```

---

## Quick Reference

### Emergency Contacts

```
Tech Lead:      +1-xxx-xxx-xxxx
DevOps:         +1-xxx-xxx-xxxx
Exchange API:   support@binance.com
Hosting:        support@provider.com
```

### Key Commands

```bash
# Emergency kill switch
curl -X POST http://localhost:3000/api/risk/killswitch/trigger

# Stop all bots
bun run scripts/stop-all-bots.ts

# Backup database
pg_dump citarion > backup-$(date +%Y%m%d).sql

# Restore database
psql citarion < backup.sql

# Check system health
bun run scripts/health-check.ts --all

# View recent errors
tail -100 /var/log/citarion/error.log
```
