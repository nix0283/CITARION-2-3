# CITARION Audit Trail Specification

**Version:** 1.0
**Last Updated:** March 2026
**Status:** Production Ready

---

## Table of Contents

1. [Overview](#1-overview)
2. [Audit Events](#2-audit-events)
3. [Data Retention](#3-data-retention)
4. [Log Format](#4-log-format)
5. [Storage Architecture](#5-storage-architecture)
6. [Query & Reporting](#6-query--reporting)
7. [Security & Integrity](#7-security--integrity)
8. [Compliance Requirements](#8-compliance-requirements)
9. [Implementation](#9-implementation)
10. [Monitoring & Alerts](#10-monitoring--alerts)

---

## 1. Overview

### 1.1 Purpose

This document specifies the audit trail requirements for CITARION, ensuring comprehensive logging of all trading activities, user actions, and system events for compliance, security, and operational purposes.

### 1.2 Scope

The audit trail covers:
- All trade executions
- Order management activities
- User authentication events
- System configuration changes
- API access logs
- Administrative actions

### 1.3 Compliance Requirements

| Regulation | Requirement | Retention |
|------------|-------------|-----------|
| SEC Rule 17a-4 | Trade records | 6 years |
| MiFID II | Transaction records | 5 years |
| CFTC | Trade data | 5 years |
| GDPR | User data access | Variable |
| SOX | Financial records | 7 years |

---

## 2. Audit Events

### 2.1 Event Categories

```typescript
enum AuditEventCategory {
  AUTHENTICATION = 'AUTHENTICATION',
  TRADE = 'TRADE',
  ORDER = 'ORDER',
  POSITION = 'POSITION',
  ACCOUNT = 'ACCOUNT',
  USER = 'USER',
  SYSTEM = 'SYSTEM',
  ADMIN = 'ADMIN',
  SECURITY = 'SECURITY',
  API = 'API',
}
```

### 2.2 Event Types

```typescript
enum AuditEventType {
  // Authentication
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT = 'LOGOUT',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  PASSWORD_CHANGE = 'PASSWORD_CHANGE',
  MFA_ENABLED = 'MFA_ENABLED',
  MFA_DISABLED = 'MFA_DISABLED',
  
  // Trade
  TRADE_OPENED = 'TRADE_OPENED',
  TRADE_CLOSED = 'TRADE_CLOSED',
  TRADE_MODIFIED = 'TRADE_MODIFIED',
  TRADE_LIQUIDATED = 'TRADE_LIQUIDATED',
  
  // Order
  ORDER_CREATED = 'ORDER_CREATED',
  ORDER_SUBMITTED = 'ORDER_SUBMITTED',
  ORDER_FILLED = 'ORDER_FILLED',
  ORDER_CANCELLED = 'ORDER_CANCELLED',
  ORDER_REJECTED = 'ORDER_REJECTED',
  ORDER_EXPIRED = 'ORDER_EXPIRED',
  
  // Position
  POSITION_OPENED = 'POSITION_OPENED',
  POSITION_CLOSED = 'POSITION_CLOSED',
  POSITION_MODIFIED = 'POSITION_MODIFIED',
  STOP_LOSS_TRIGGERED = 'STOP_LOSS_TRIGGERED',
  TAKE_PROFIT_TRIGGERED = 'TAKE_PROFIT_TRIGGERED',
  
  // Account
  ACCOUNT_CREATED = 'ACCOUNT_CREATED',
  ACCOUNT_MODIFIED = 'ACCOUNT_MODIFIED',
  API_KEY_CREATED = 'API_KEY_CREATED',
  API_KEY_REVOKED = 'API_KEY_REVOKED',
  EXCHANGE_CONNECTED = 'EXCHANGE_CONNECTED',
  EXCHANGE_DISCONNECTED = 'EXCHANGE_DISCONNECTED',
  
  // User
  USER_CREATED = 'USER_CREATED',
  USER_MODIFIED = 'USER_MODIFIED',
  USER_DELETED = 'USER_DELETED',
  USER_SUSPENDED = 'USER_SUSPENDED',
  SETTINGS_CHANGED = 'SETTINGS_CHANGED',
  
  // System
  SYSTEM_STARTUP = 'SYSTEM_STARTUP',
  SYSTEM_SHUTDOWN = 'SYSTEM_SHUTDOWN',
  CONFIG_CHANGED = 'CONFIG_CHANGED',
  MAINTENANCE_MODE = 'MAINTENANCE_MODE',
  
  // Admin
  ADMIN_ACTION = 'ADMIN_ACTION',
  USER_IMPERSONATION = 'USER_IMPERSONATION',
  BULK_OPERATION = 'BULK_OPERATION',
  
  // Security
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  IP_BLOCKED = 'IP_BLOCKED',
  SECURITY_ALERT = 'SECURITY_ALERT',
  
  // API
  API_REQUEST = 'API_REQUEST',
  API_ERROR = 'API_ERROR',
  WEBHOOK_RECEIVED = 'WEBHOOK_RECEIVED',
}
```

### 2.3 Event Severity

```typescript
enum AuditEventSeverity {
  DEBUG = 'DEBUG',       // Debugging information
  INFO = 'INFO',         // Normal operations
  WARNING = 'WARNING',   // Potential issues
  ERROR = 'ERROR',       // Errors requiring attention
  CRITICAL = 'CRITICAL', // Security incidents, failures
}
```

---

## 3. Data Retention

### 3.1 Retention Policies

| Event Category | Hot Storage | Warm Storage | Cold Storage | Total Retention |
|----------------|-------------|--------------|--------------|-----------------|
| Trade | 90 days | 1 year | 5 years | 5 years |
| Order | 90 days | 1 year | 5 years | 5 years |
| Authentication | 30 days | 1 year | 2 years | 2 years |
| API Access | 7 days | 30 days | 1 year | 1 year |
| System | 30 days | 90 days | 1 year | 1 year |
| Admin | 90 days | 1 year | 7 years | 7 years |
| Security | 90 days | 1 year | 7 years | 7 years |

### 3.2 Retention Implementation

```sql
-- TimescaleDB retention policies
SELECT add_retention_policy('audit_logs_trade', INTERVAL '5 years');
SELECT add_retention_policy('audit_logs_auth', INTERVAL '2 years');
SELECT add_retention_policy('audit_logs_api', INTERVAL '1 year');
SELECT add_retention_policy('audit_logs_system', INTERVAL '1 year');
SELECT add_retention_policy('audit_logs_admin', INTERVAL '7 years');
SELECT add_retention_policy('audit_logs_security', INTERVAL '7 years');

-- Compression for cold data
SELECT add_compression_policy('audit_logs_trade', INTERVAL '90 days');
SELECT add_compression_policy('audit_logs_auth', INTERVAL '30 days');
SELECT add_compression_policy('audit_logs_api', INTERVAL '7 days');
```

### 3.3 Data Archival

```typescript
class AuditArchiver {
  @Cron('0 0 * * *') // Daily at midnight
  async archiveOldData(): Promise<void> {
    const tables = [
      { name: 'audit_logs_trade', archiveAfter: '1 year' },
      { name: 'audit_logs_auth', archiveAfter: '1 year' },
      { name: 'audit_logs_api', archiveAfter: '30 days' },
    ];
    
    for (const table of tables) {
      const cutoffDate = moment().subtract(table.archiveAfter);
      
      // Export to S3
      const data = await this.exportData(table.name, cutoffDate);
      await this.uploadToS3(data, `audit-archives/${table.name}/${cutoffDate.format('YYYY-MM')}.parquet`);
      
      // Delete archived data
      await this.deleteArchived(table.name, cutoffDate);
    }
  }
}
```

---

## 4. Log Format

### 4.1 Standard Log Structure

```typescript
interface AuditLog {
  // Identification
  id: string;
  timestamp: Date;
  
  // Event details
  category: AuditEventCategory;
  type: AuditEventType;
  severity: AuditEventSeverity;
  
  // Context
  userId?: string;
  accountId?: string;
  sessionId?: string;
  
  // Source
  source: {
    ip: string;
    userAgent?: string;
    service: string;
    version: string;
  };
  
  // Target
  target: {
    type: string;
    id: string;
  };
  
  // Action details
  action: {
    description: string;
    changes?: BeforeAfter<any>;
    metadata?: Record<string, any>;
  };
  
  // Result
  result: {
    status: 'SUCCESS' | 'FAILURE' | 'PARTIAL';
    errorCode?: string;
    errorMessage?: string;
  };
  
  // Integrity
  checksum: string;
  previousHash?: string;
}
```

### 4.2 JSON Log Format

```json
{
  "id": "audit_123456789",
  "timestamp": "2026-03-15T10:30:00.000Z",
  "category": "TRADE",
  "type": "TRADE_OPENED",
  "severity": "INFO",
  "userId": "usr_abc123",
  "accountId": "acc_xyz789",
  "sessionId": "ses_def456",
  "source": {
    "ip": "192.168.1.1",
    "userAgent": "Mozilla/5.0...",
    "service": "api-server",
    "version": "2.1.0"
  },
  "target": {
    "type": "POSITION",
    "id": "pos_123456"
  },
  "action": {
    "description": "Opened LONG position on BTCUSDT",
    "changes": {
      "before": null,
      "after": {
        "symbol": "BTCUSDT",
        "direction": "LONG",
        "amount": 0.1,
        "entryPrice": 50000,
        "leverage": 10
      }
    },
    "metadata": {
      "botId": "bot_789",
      "signalId": "sig_456"
    }
  },
  "result": {
    "status": "SUCCESS"
  },
  "checksum": "sha256:abc123..."
}
```

### 4.3 Before/After Tracking

```typescript
interface BeforeAfter<T> {
  before: T | null;
  after: T | null;
}

class ChangeTracker {
  trackChanges<T>(before: T, after: T): BeforeAfter<T> {
    return {
      before: this.sanitize(before),
      after: this.sanitize(after),
    };
  }
  
  private sanitize<T>(obj: T): T {
    // Remove sensitive fields
    const sensitive = ['password', 'apiKey', 'apiSecret', 'token'];
    const copy = { ...obj };
    
    for (const field of sensitive) {
      if (field in copy) {
        copy[field] = '***REDACTED***';
      }
    }
    
    return copy;
  }
}
```

---

## 5. Storage Architecture

### 5.1 Database Schema

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Event classification
  category VARCHAR(50) NOT NULL,
  type VARCHAR(100) NOT NULL,
  severity VARCHAR(20) NOT NULL,
  
  -- Context
  user_id UUID,
  account_id UUID,
  session_id VARCHAR(100),
  
  -- Source
  ip_address INET,
  user_agent TEXT,
  service VARCHAR(100),
  version VARCHAR(20),
  
  -- Target
  target_type VARCHAR(50),
  target_id VARCHAR(100),
  
  -- Action
  description TEXT,
  changes JSONB,
  metadata JSONB,
  
  -- Result
  status VARCHAR(20),
  error_code VARCHAR(50),
  error_message TEXT,
  
  -- Integrity
  checksum VARCHAR(128),
  previous_hash VARCHAR(128),
  
  -- Indexes
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TimescaleDB hypertable
SELECT create_hypertable('audit_logs', 'timestamp', 
  chunk_time_interval => INTERVAL '1 day'
);

-- Indexes
CREATE INDEX idx_audit_timestamp ON audit_logs(timestamp DESC);
CREATE INDEX idx_audit_user ON audit_logs(user_id, timestamp DESC);
CREATE INDEX idx_audit_category ON audit_logs(category, timestamp DESC);
CREATE INDEX idx_audit_type ON audit_logs(type, timestamp DESC);
CREATE INDEX idx_audit_severity ON audit_logs(severity, timestamp DESC);
```

### 5.2 Partitioned Tables

```sql
-- Separate tables by category for performance
CREATE TABLE audit_logs_trade (LIKE audit_logs INCLUDING ALL);
CREATE TABLE audit_logs_auth (LIKE audit_logs INCLUDING ALL);
CREATE TABLE audit_logs_api (LIKE audit_logs INCLUDING ALL);
CREATE TABLE audit_logs_system (LIKE audit_logs INCLUDING ALL);
CREATE TABLE audit_logs_admin (LIKE audit_logs INCLUDING ALL);
CREATE TABLE audit_logs_security (LIKE audit_logs INCLUDING ALL);

-- Apply hypertable to each
SELECT create_hypertable('audit_logs_trade', 'timestamp');
SELECT create_hypertable('audit_logs_auth', 'timestamp');
SELECT create_hypertable('audit_logs_api', 'timestamp');
SELECT create_hypertable('audit_logs_system', 'timestamp');
SELECT create_hypertable('audit_logs_admin', 'timestamp');
SELECT create_hypertable('audit_logs_security', 'timestamp');
```

### 5.3 Write Optimization

```typescript
class AuditLogWriter {
  private buffer: AuditLog[] = [];
  private readonly FLUSH_INTERVAL = 1000; // 1 second
  private readonly BUFFER_SIZE = 100;
  
  async write(log: AuditLog): Promise<void> {
    this.buffer.push(log);
    
    if (this.buffer.length >= this.BUFFER_SIZE) {
      await this.flush();
    }
  }
  
  @Cron('*/1 * * * * *')
  private async flush(): Promise<void> {
    if (this.buffer.length === 0) return;
    
    const logs = [...this.buffer];
    this.buffer = [];
    
    // Bulk insert
    await this.repository.bulkInsert(logs);
  }
}
```

---

## 6. Query & Reporting

### 6.1 Query Interface

```typescript
interface AuditQuery {
  // Time range
  startTime?: Date;
  endTime?: Date;
  
  // Filters
  userId?: string;
  accountId?: string;
  category?: AuditEventCategory[];
  type?: AuditEventType[];
  severity?: AuditEventSeverity[];
  
  // Pagination
  limit?: number;
  offset?: number;
  cursor?: string;
  
  // Sorting
  sortBy?: 'timestamp' | 'severity' | 'category';
  sortOrder?: 'asc' | 'desc';
}

class AuditQueryService {
  async query(query: AuditQuery): Promise<AuditQueryResult> {
    const sql = this.buildQuery(query);
    const results = await this.db.$queryRawUnsafe(sql);
    
    return {
      logs: results,
      total: await this.countTotal(query),
      nextCursor: this.getCursor(results),
    };
  }
  
  private buildQuery(query: AuditQuery): string {
    const conditions: string[] = [];
    
    if (query.startTime) {
      conditions.push(`timestamp >= '${query.startTime.toISOString()}'`);
    }
    if (query.endTime) {
      conditions.push(`timestamp <= '${query.endTime.toISOString()}'`);
    }
    if (query.userId) {
      conditions.push(`user_id = '${query.userId}'`);
    }
    if (query.category?.length) {
      conditions.push(`category IN (${query.category.map(c => `'${c}'`).join(',')})`);
    }
    
    const whereClause = conditions.length > 0 
      ? `WHERE ${conditions.join(' AND ')}` 
      : '';
    
    return `
      SELECT * FROM audit_logs
      ${whereClause}
      ORDER BY ${query.sortBy || 'timestamp'} ${query.sortOrder || 'DESC'}
      LIMIT ${query.limit || 100}
      OFFSET ${query.offset || 0}
    `;
  }
}
```

### 6.2 Pre-built Reports

```typescript
class AuditReportService {
  // User activity report
  async getUserActivityReport(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<UserActivityReport> {
    const logs = await this.query({
      userId,
      startTime: startDate,
      endTime: endDate,
    });
    
    return {
      loginCount: this.countEvents(logs, 'LOGIN_SUCCESS'),
      tradeCount: this.countEvents(logs, 'TRADE_OPENED'),
      orderCount: this.countEvents(logs, 'ORDER_CREATED'),
      failedAttempts: this.countEvents(logs, 'LOGIN_FAILURE'),
      lastLogin: this.getLastEvent(logs, 'LOGIN_SUCCESS'),
    };
  }
  
  // Trade audit report
  async getTradeAuditReport(
    startDate: Date,
    endDate: Date
  ): Promise<TradeAuditReport> {
    const trades = await this.query({
      category: ['TRADE', 'ORDER'],
      startTime: startDate,
      endTime: endDate,
    });
    
    return {
      totalTrades: this.countEvents(trades, 'TRADE_OPENED'),
      cancelledOrders: this.countEvents(trades, 'ORDER_CANCELLED'),
      rejectedOrders: this.countEvents(trades, 'ORDER_REJECTED'),
      liquidations: this.countEvents(trades, 'TRADE_LIQUIDATED'),
      totalVolume: await this.calculateVolume(trades),
    };
  }
  
  // Security report
  async getSecurityReport(
    startDate: Date,
    endDate: Date
  ): Promise<SecurityReport> {
    const security = await this.query({
      category: ['AUTHENTICATION', 'SECURITY'],
      startTime: startDate,
      endTime: endDate,
    });
    
    return {
      failedLogins: this.countEvents(security, 'LOGIN_FAILURE'),
      suspiciousActivity: this.countEvents(security, 'SUSPICIOUS_ACTIVITY'),
      blockedIps: this.countEvents(security, 'IP_BLOCKED'),
      mfaEnabled: this.countEvents(security, 'MFA_ENABLED'),
      passwordChanges: this.countEvents(security, 'PASSWORD_CHANGE'),
    };
  }
}
```

---

## 7. Security & Integrity

### 7.1 Log Integrity

```typescript
class AuditLogIntegrity {
  private previousHash: string | null = null;
  
  async createLog(entry: Omit<AuditLog, 'checksum' | 'previousHash'>): Promise<AuditLog> {
    const log: AuditLog = {
      ...entry,
      previousHash: this.previousHash,
      checksum: '',
    };
    
    // Calculate checksum
    log.checksum = this.calculateChecksum(log);
    
    // Store previous hash for chain
    this.previousHash = log.checksum;
    
    return log;
  }
  
  private calculateChecksum(log: AuditLog): string {
    const data = JSON.stringify({
      timestamp: log.timestamp,
      category: log.category,
      type: log.type,
      userId: log.userId,
      action: log.action,
      result: log.result,
      previousHash: log.previousHash,
    });
    
    return crypto.createHash('sha256').update(data).digest('hex');
  }
  
  async verifyChain(logs: AuditLog[]): Promise<IntegrityResult> {
    const errors: string[] = [];
    
    for (let i = 0; i < logs.length; i++) {
      const log = logs[i];
      
      // Verify checksum
      const expectedChecksum = this.calculateChecksum(log);
      if (log.checksum !== expectedChecksum) {
        errors.push(`Invalid checksum at index ${i}`);
      }
      
      // Verify chain
      if (i > 0 && log.previousHash !== logs[i - 1].checksum) {
        errors.push(`Chain broken at index ${i}`);
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
```

### 7.2 Access Control

```typescript
// Who can access audit logs
const AUDIT_ACCESS_ROLES = {
  VIEW_OWN: ['USER'],
  VIEW_USER: ['SUPPORT', 'ADMIN'],
  VIEW_ALL: ['ADMIN', 'AUDITOR'],
  EXPORT: ['ADMIN', 'AUDITOR'],
  DELETE: ['SUPER_ADMIN'],
};

class AuditAccessControl {
  canViewOwnLogs(user: User): boolean {
    return AUDIT_ACCESS_ROLES.VIEW_OWN.includes(user.role);
  }
  
  canViewUserLogs(user: User): boolean {
    return AUDIT_ACCESS_ROLES.VIEW_USER.includes(user.role);
  }
  
  canViewAllLogs(user: User): boolean {
    return AUDIT_ACCESS_ROLES.VIEW_ALL.includes(user.role);
  }
  
  canExportLogs(user: User): boolean {
    return AUDIT_ACCESS_ROLES.EXPORT.includes(user.role);
  }
}
```

### 7.3 Data Masking

```typescript
class AuditDataMasker {
  private sensitiveFields = [
    'password',
    'apiKey',
    'apiSecret',
    'passphrase',
    'token',
    'secret',
    'privateKey',
  ];
  
  mask(log: AuditLog): AuditLog {
    const masked = { ...log };
    
    if (masked.action.changes) {
      masked.action.changes = this.maskObject(masked.action.changes);
    }
    
    if (masked.action.metadata) {
      masked.action.metadata = this.maskObject(masked.action.metadata);
    }
    
    return masked;
  }
  
  private maskObject(obj: any): any {
    if (typeof obj !== 'object' || obj === null) return obj;
    
    const masked = Array.isArray(obj) ? [...obj] : { ...obj };
    
    for (const key of Object.keys(masked)) {
      if (this.isSensitive(key)) {
        masked[key] = '***REDACTED***';
      } else if (typeof masked[key] === 'object') {
        masked[key] = this.maskObject(masked[key]);
      }
    }
    
    return masked;
  }
  
  private isSensitive(field: string): boolean {
    const lower = field.toLowerCase();
    return this.sensitiveFields.some(s => lower.includes(s.toLowerCase()));
  }
}
```

---

## 8. Compliance Requirements

### 8.1 Regulatory Mapping

| Requirement | Regulation | Implementation |
|-------------|------------|----------------|
| Trade record keeping | SEC 17a-4 | All trades logged with full details |
| Transaction reporting | MiFID II | Transaction ID, timestamps, prices |
| Audit trail integrity | SOX | Blockchain-style hash chain |
| User data access | GDPR | User access logs, data export |
| API access logging | CFTC | All API requests logged |
| Admin action audit | SOC 2 | All admin actions logged |

### 8.2 Compliance Reports

```typescript
interface ComplianceReport {
  reportId: string;
  reportType: 'DAILY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
  period: {
    start: Date;
    end: Date;
  };
  generatedAt: Date;
  generatedBy: string;
  
  summary: {
    totalEvents: number;
    categories: Record<string, number>;
    errors: number;
    warnings: number;
  };
  
  details: {
    trades: TradeSummary;
    orders: OrderSummary;
    users: UserSummary;
    security: SecuritySummary;
  };
}
```

---

## 9. Implementation

### 9.1 Audit Service

```typescript
@Injectable()
class AuditService {
  constructor(
    private writer: AuditLogWriter,
    private integrity: AuditLogIntegrity,
    private masker: AuditDataMasker,
  ) {}
  
  async log(
    category: AuditEventCategory,
    type: AuditEventType,
    context: AuditContext,
    action: AuditAction,
    result: AuditResult
  ): Promise<void> {
    const log = await this.integrity.createLog({
      timestamp: new Date(),
      category,
      type,
      severity: this.determineSeverity(type, result),
      ...context,
      action,
      result,
    });
    
    await this.writer.write(log);
  }
  
  private determineSeverity(type: AuditEventType, result: AuditResult): AuditEventSeverity {
    if (result.status === 'FAILURE') {
      if (SECURITY_EVENTS.includes(type)) {
        return AuditEventSeverity.CRITICAL;
      }
      return AuditEventSeverity.ERROR;
    }
    
    if (WARNING_EVENTS.includes(type)) {
      return AuditEventSeverity.WARNING;
    }
    
    return AuditEventSeverity.INFO;
  }
}
```

### 9.2 Audit Decorator

```typescript
function Audited(
  category: AuditEventCategory,
  type: AuditEventType,
  description: string
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      const auditService = this.auditService;
      const startTime = Date.now();
      
      try {
        const result = await originalMethod.apply(this, args);
        
        await auditService.log(
          category,
          type,
          this.getAuditContext(),
          { description, metadata: { args: sanitizeArgs(args) } },
          { status: 'SUCCESS' }
        );
        
        return result;
      } catch (error) {
        await auditService.log(
          category,
          type,
          this.getAuditContext(),
          { description, metadata: { args: sanitizeArgs(args) } },
          { status: 'FAILURE', errorMessage: error.message }
        );
        
        throw error;
      }
    };
    
    return descriptor;
  };
}

// Usage
class TradeService {
  @Audited(AuditEventCategory.TRADE, AuditEventType.TRADE_OPENED, 'Opened trade')
  async openTrade(order: Order): Promise<Trade> {
    // ...
  }
}
```

---

## 10. Monitoring & Alerts

### 10.1 Alert Rules

```typescript
interface AuditAlertRule {
  name: string;
  condition: AuditQuery;
  threshold: number;
  window: number; // minutes
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  channels: string[];
}

const DEFAULT_ALERT_RULES: AuditAlertRule[] = [
  {
    name: 'Multiple Failed Logins',
    condition: { type: ['LOGIN_FAILURE'] },
    threshold: 5,
    window: 5,
    severity: 'WARNING',
    channels: ['slack', 'email'],
  },
  {
    name: 'Suspicious Activity Detected',
    condition: { type: ['SUSPICIOUS_ACTIVITY'] },
    threshold: 1,
    window: 1,
    severity: 'CRITICAL',
    channels: ['pagerduty', 'slack', 'email'],
  },
  {
    name: 'Admin Action Alert',
    condition: { category: ['ADMIN'] },
    threshold: 1,
    window: 1,
    severity: 'INFO',
    channels: ['slack'],
  },
];
```

### 10.2 Alert Service

```typescript
class AuditAlertService {
  async checkAlerts(): Promise<void> {
    for (const rule of DEFAULT_ALERT_RULES) {
      const count = await this.countRecentEvents(rule.condition, rule.window);
      
      if (count >= rule.threshold) {
        await this.sendAlert(rule, count);
      }
    }
  }
  
  private async sendAlert(rule: AuditAlertRule, count: number): Promise<void> {
    const message = `Alert: ${rule.name} - ${count} events in last ${rule.window} minutes`;
    
    for (const channel of rule.channels) {
      switch (channel) {
        case 'slack':
          await this.slackService.send(message, rule.severity);
          break;
        case 'email':
          await this.emailService.send({
            to: 'security@citarion.io',
            subject: `[${rule.severity}] Audit Alert: ${rule.name}`,
            body: message,
          });
          break;
        case 'pagerduty':
          await this.pagerDutyService.trigger(rule.name, message);
          break;
      }
    }
  }
}
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | March 2026 | CITARION Team | Initial release |

---

*This document is part of the CITARION Documentation Suite.*
