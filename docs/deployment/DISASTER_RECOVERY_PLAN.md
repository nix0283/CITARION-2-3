# CITARION Disaster Recovery Plan

> **Last Updated:** March 2025  
> **Classification:** Critical Operations

---

## Table of Contents

1. [Overview](#overview)
2. [Recovery Objectives](#recovery-objectives)
3. [Backup Strategy](#backup-strategy)
4. [Restoration Procedures](#restoration-procedures)
5. [Failover Procedures](#failover-procedures)
6. [Testing Schedule](#testing-schedule)

---

## Overview

This document defines the disaster recovery (DR) plan for CITARION trading platform.

### Scope

| Component | DR Coverage |
|-----------|-------------|
| Application Servers | ✅ Full |
| Database | ✅ Full |
| Exchange API Keys | ✅ Encrypted Backup |
| User Data | ✅ Daily Backup |
| Trading History | ✅ Point-in-Time Recovery |
| ML Models | ✅ Versioned Backup |

### DR Team

| Role | Primary | Secondary |
|------|---------|-----------|
| DR Coordinator | @dr-primary | @dr-secondary |
| Database Admin | @dba-primary | @dba-secondary |
| Infrastructure | @infra-primary | @infra-secondary |

---

## Recovery Objectives

### RPO (Recovery Point Objective)

| Data Type | RPO | Backup Frequency |
|-----------|-----|------------------|
| User Accounts | 1 hour | Hourly incremental |
| Positions | 15 minutes | Real-time + 15min WAL |
| Trades | 15 minutes | Real-time + 15min WAL |
| API Keys | 1 hour | Hourly encrypted backup |
| System Config | 24 hours | Daily |

### RTO (Recovery Time Objective)

| Scenario | RTO | Priority |
|----------|-----|----------|
| Single Server Failure | 15 min | Critical |
| Database Failure | 30 min | Critical |
| Full Region Outage | 2 hours | High |
| Data Corruption | 4 hours | High |
| Ransomware | 8 hours | Medium |

---

## Backup Strategy

### Backup Types

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BACKUP ARCHITECTURE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                  │
│   │   Primary   │────▶│   Backup    │────▶│   Offsite   │                  │
│   │   Database  │     │   Server    │     │   Storage   │                  │
│   │   (Live)    │     │   (Hourly)  │     │   (Daily)   │                  │
│   └─────────────┘     └─────────────┘     └─────────────┘                  │
│          │                   │                   │                          │
│          │                   │                   │                          │
│          ▼                   ▼                   ▼                          │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                  │
│   │    WAL      │     │   Full      │     │   Cloud     │                  │
│   │   Archive   │     │   Snapshot  │     │   Storage   │                  │
│   │  (15 min)   │     │   (Daily)   │     │   (S3)      │                  │
│   └─────────────┘     └─────────────┘     └─────────────┘                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Backup Schedule

```yaml
# backup-config.yaml

backups:
  # Continuous WAL archiving
  wal_archive:
    enabled: true
    interval: 15m
    retention: 7d
    
  # Hourly incremental
  incremental:
    enabled: true
    interval: 1h
    retention: 24h
    
  # Daily full backup
  full:
    enabled: true
    time: "03:00"
    retention: 30d
    
  # Weekly backup (long retention)
  weekly:
    enabled: true
    day: sunday
    time: "03:00"
    retention: 90d
    
  # Monthly archive
  monthly:
    enabled: true
    day: 1
    time: "03:00"
    retention: 365d
```

### Backup Script

```bash
#!/bin/bash
# scripts/backup.sh

set -e

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/$DATE"
S3_BUCKET="s3://citarion-backups"

# Create backup directory
mkdir -p $BACKUP_DIR

# Database backup
echo "Starting database backup..."
pg_dump -Fc citarion > $BACKUP_DIR/database.dump

# API Keys backup (encrypted)
echo "Backing up encrypted API keys..."
pg_dump -t "Account" --data-only citarion | gzip > $BACKUP_DIR/api_keys.sql.gz
gpg --encrypt --recipient backups@citarion.com $BACKUP_DIR/api_keys.sql.gz

# Configuration backup
echo "Backing up configuration..."
tar -czf $BACKUP_DIR/config.tar.gz .env prisma/

# Upload to S3
echo "Uploading to S3..."
aws s3 cp $BACKUP_DIR $S3_BUCKET/$DATE/ --recursive

# Cleanup old backups
echo "Cleaning up old backups..."
find /backups -type d -mtime +30 -exec rm -rf {} +

echo "Backup completed: $DATE"
```

---

## Restoration Procedures

### Database Restoration

#### From Full Backup

```bash
#!/bin/bash
# restore-database.sh

BACKUP_FILE=$1
DATABASE_NAME="citarion"

# 1. Stop application
echo "Stopping application..."
pm2 stop citarion

# 2. Drop existing database
echo "Dropping existing database..."
psql -c "DROP DATABASE IF EXISTS $DATABASE_NAME;"
psql -c "CREATE DATABASE $DATABASE_NAME;"

# 3. Restore from backup
echo "Restoring from backup..."
pg_restore -d $DATABASE_NAME $BACKUP_FILE

# 4. Run migrations
echo "Running migrations..."
bunx prisma migrate deploy

# 5. Verify restoration
echo "Verifying..."
psql -c "SELECT COUNT(*) FROM users;"
psql -c "SELECT COUNT(*) FROM positions;"

# 6. Start application
echo "Starting application..."
pm2 start citarion
```

#### Point-in-Time Recovery

```bash
#!/bin/bash
# pitr-restore.sh

TARGET_TIME=$1  # Format: "2025-03-13 10:30:00"

# 1. Stop application
pm2 stop citarion

# 2. Restore base backup
pg_restore -d citarion_restore /backups/base.dump

# 3. Replay WAL to target time
pg_waldump /backups/wal/ 2>/dev/null | \
  psql -c "SELECT pg_wal_replay_until('$TARGET_TIME');"

# 4. Promote to primary
psql -c "SELECT pg_promote();"

# 5. Switch to restored database
psql -c "ALTER DATABASE citarion RENAME TO citarion_old;"
psql -c "ALTER DATABASE citarion_restore RENAME TO citarion;"

# 6. Start application
pm2 start citarion
```

### API Keys Restoration

```bash
#!/bin/bash
# restore-api-keys.sh

BACKUP_FILE=$1

# Decrypt
gpg --decrypt $BACKUP_FILE > api_keys.sql.gz
gunzip api_keys.sql.gz

# Restore to database
psql citarion < api_keys.sql

# Verify
psql -c "SELECT id, exchange_id FROM \"Account\";"
```

### Configuration Restoration

```bash
#!/bin/bash
# restore-config.sh

BACKUP_FILE=$1

# Extract
tar -xzf $BACKUP_FILE

# Verify .env integrity
grep -E "^[A-Z_]+=" .env | wc -l

# Regenerate Prisma client
bunx prisma generate

# Restart services
pm2 restart all
```

---

## Failover Procedures

### Primary Server Failure

```bash
#!/bin/bash
# failover-primary.sh

# 1. Verify primary is down
echo "Checking primary status..."
if curl -sf http://primary:3000/health; then
  echo "Primary is still up, aborting failover"
  exit 1
fi

# 2. Promote secondary database
echo "Promoting secondary database..."
ssh secondary-db "sudo -u postgres pg_ctl promote -D /var/lib/postgresql/data"

# 3. Update DNS
echo "Updating DNS..."
aws route53 change-resource-record-sets \
  --hosted-zone-id $ZONE_ID \
  --change-batch '{
    "Changes": [{
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "api.citarion.com",
        "Type": "A",
        "TTL": 60,
        "ResourceRecords": [{"Value": "SECONDARY_IP"}]
      }
    }]
  }'

# 4. Start services on secondary
echo "Starting services..."
ssh secondary "cd /app && pm2 start all"

# 5. Verify
echo "Verifying..."
sleep 30
curl -sf https://api.citarion.com/health

echo "Failover completed"
```

### Regional Failover

```bash
#!/bin/bash
# failover-regional.sh

# 1. Activate DR site
echo "Activating DR site..."

# Update load balancer
aws elbv2 modify-listener \
  --listener-arn $LISTENER_ARN \
  --default-actions Type=forward,TargetGroupArn=$DR_TARGET_GROUP

# 2. Start database replication
ssh dr-site "sudo systemctl start postgresql"

# 3. Deploy application
ssh dr-site "cd /app && bun install && bun run db:migrate && pm2 start all"

# 4. Verify
for i in {1..10}; do
  if curl -sf https://dr.citarion.com/health; then
    echo "DR site is healthy"
    break
  fi
  sleep 10
done

# 5. Notify team
./scripts/notify-team.sh "Regional failover completed"
```

---

## Testing Schedule

### Testing Matrix

| Test Type | Frequency | Duration | Owner |
|-----------|-----------|----------|-------|
| Backup Verification | Daily | 15 min | Automation |
| Single Server Failover | Monthly | 1 hour | DevOps |
| Database Restoration | Monthly | 2 hours | DBA |
| Regional Failover | Quarterly | 4 hours | DR Team |
| Full DR Drill | Annually | 8 hours | All Teams |

### Test Checklist

```markdown
## DR Test Checklist

### Pre-Test
- [ ] Notify all stakeholders
- [ ] Verify backup integrity
- [ ] Document current system state
- [ ] Prepare rollback plan

### Test Execution
- [ ] Simulate failure scenario
- [ ] Execute failover procedure
- [ ] Verify data integrity
- [ ] Test critical functionality
- [ ] Measure RTO

### Post-Test
- [ ] Document results
- [ ] Identify issues
- [ ] Update procedures
- [ ] Schedule fixes
- [ ] Send summary report
```

### Automated Backup Verification

```bash
#!/bin/bash
# verify-backup.sh

LATEST_BACKUP=$(ls -t /backups/*.dump | head -1)

# Create test database
psql -c "DROP DATABASE IF EXISTS citarion_test;"
psql -c "CREATE DATABASE citarion_test;"

# Restore to test database
pg_restore -d citarion_test $LATEST_BACKUP

# Run integrity checks
psql -d citarion_test -c "
  SELECT 
    (SELECT COUNT(*) FROM users) as users,
    (SELECT COUNT(*) FROM positions) as positions,
    (SELECT COUNT(*) FROM trades) as trades,
    (SELECT COUNT(*) FROM accounts) as accounts;
"

# Verify relationships
psql -d citarion_test -c "
  SELECT COUNT(*) as orphan_trades
  FROM trades t
  LEFT JOIN users u ON t.\"userId\" = u.id
  WHERE u.id IS NULL;
"

# Cleanup
psql -c "DROP DATABASE citarion_test;"

echo "Backup verification completed"
```

---

## Emergency Contacts

```
┌─────────────────────────────────────────────────────────────────┐
│                    EMERGENCY CONTACTS                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  DR Coordinator:     +1-xxx-xxx-xxxx                            │
│  Database Admin:     +1-xxx-xxx-xxxx                            │
│  Infrastructure:     +1-xxx-xxx-xxxx                            │
│                                                                  │
│  Cloud Provider:     support@cloud-provider.com                 │
│  Database Vendor:    support@db-vendor.com                      │
│                                                                  │
│  Status Page:        https://status.citarion.com                │
│  Incident Channel:   #incident-response                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Recovery Checklist

```markdown
## Disaster Recovery Checklist

### Phase 1: Detection (0-15 min)
- [ ] Alert received
- [ ] Assess scope of failure
- [ ] Determine RTO impact
- [ ] Notify DR team

### Phase 2: Containment (15-30 min)
- [ ] Stop affected services
- [ ] Prevent data loss
- [ ] Isolate affected systems

### Phase 3: Recovery (30 min - 2 hours)
- [ ] Restore from backup
- [ ] Verify data integrity
- [ ] Start services
- [ ] Verify functionality

### Phase 4: Validation (2-4 hours)
- [ ] Run integrity checks
- [ ] Test critical paths
- [ ] Verify exchange connections
- [ ] User acceptance test

### Phase 5: Cleanup (4-8 hours)
- [ ] Update DNS
- [ ] Monitor for issues
- [ ] Document incident
- [ ] Schedule post-mortem
```
