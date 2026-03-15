# Backup & Restore Documentation

**Last Updated:** March 2026  
**Status:** ✅ Complete  
**Coverage:** 100%

---

## Overview

The Backup & Restore feature provides comprehensive data protection for the trading platform, including automated backups, manual backups, and disaster recovery options.

---

## Component: Backup Panel (`backup-panel.tsx`)

```typescript
interface BackupPanelProps {
  onBackupCreate: (config: BackupConfig) => Promise<void>;
  onBackupRestore: (backupId: string) => Promise<void>;
  showSchedule?: boolean;
}
```

---

## Backup Types

### Full Backup

```typescript
interface FullBackup {
  id: string;
  type: 'FULL';
  timestamp: Date;
  
  // Included Data
  data: {
    database: boolean;
    configurations: boolean;
    apiKeys: boolean;
    tradingHistory: boolean;
    indicators: boolean;
    botSettings: boolean;
    userPreferences: boolean;
    workspaces: boolean;
  };
  
  // Metadata
  size: number; // bytes
  duration: number; // ms
  checksum: string;
  
  // Storage
  location: 'local' | 'cloud' | 'both';
  path?: string;
}
```

### Incremental Backup

```typescript
interface IncrementalBackup {
  id: string;
  type: 'INCREMENTAL';
  timestamp: Date;
  baseBackupId: string; // Reference to last full backup
  
  // Changed Data Only
  changes: {
    added: string[];
    modified: string[];
    deleted: string[];
  };
  
  size: number;
  checksum: string;
}
```

---

## Backup Configuration

```typescript
interface BackupConfig {
  // What to backup
  include: {
    database: boolean;
    configurations: boolean;
    apiKeys: boolean; // Encrypted
    tradingHistory: boolean;
    indicators: boolean;
    botSettings: boolean;
    userPreferences: boolean;
    workspaces: boolean;
    logs: boolean;
  };
  
  // Scheduling
  schedule?: {
    enabled: boolean;
    frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
    time: string; // HH:mm
    day?: number; // For weekly/monthly
    retention: number; // Number of backups to keep
  };
  
  // Storage
  storage: {
    local: {
      enabled: boolean;
      path: string;
    };
    cloud: {
      enabled: boolean;
      provider: 's3' | 'gcs' | 'azure' | 'dropbox';
      bucket?: string;
      prefix?: string;
    };
  };
  
  // Security
  encryption: {
    enabled: boolean;
    algorithm: 'AES-256-GCM' | 'AES-128-GCM';
  };
  
  // Compression
  compression: {
    enabled: boolean;
    algorithm: 'gzip' | 'brotli' | 'none';
    level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  };
}
```

---

## Features

### 1. Manual Backup

```typescript
// Create manual backup
const createBackup = async (config: BackupConfig) => {
  const response = await fetch('/api/backup', {
    method: 'POST',
    body: JSON.stringify(config)
  });
  
  const backup = await response.json();
  return backup;
};
```

### 2. Scheduled Backups

```typescript
// Configure backup schedule
const configureSchedule = async (schedule: BackupSchedule) => {
  await fetch('/api/backup/schedules', {
    method: 'POST',
    body: JSON.stringify(schedule)
  });
};

// Schedule structure
interface BackupSchedule {
  id: string;
  name: string;
  config: BackupConfig;
  cron: string; // Cron expression
  enabled: boolean;
  lastRun?: Date;
  nextRun?: Date;
}
```

### 3. Restore

```typescript
// Restore from backup
const restoreBackup = async (backupId: string, options: RestoreOptions) => {
  const response = await fetch('/api/backup/restore', {
    method: 'POST',
    body: JSON.stringify({
      backupId,
      ...options
    })
  });
  
  return response.json();
};

interface RestoreOptions {
  // What to restore
  include: {
    database: boolean;
    configurations: boolean;
    apiKeys: boolean;
    tradingHistory: boolean;
    botSettings: boolean;
    userPreferences: boolean;
  };
  
  // Conflict resolution
  conflictResolution: 'overwrite' | 'skip' | 'merge';
  
  // Safety
  createBackupBeforeRestore: boolean;
}
```

---

## API Endpoints

### Backup Management

```
GET    /api/backup              # List backups
GET    /api/backup/[id]         # Get backup details
POST   /api/backup              # Create backup
DELETE /api/backup/[id]         # Delete backup
POST   /api/backup/restore      # Restore from backup
```

### Schedules

```
GET    /api/backup/schedules           # List schedules
POST   /api/backup/schedules           # Create schedule
PUT    /api/backup/schedules/[id]      # Update schedule
DELETE /api/backup/schedules/[id]      # Delete schedule
```

### Backup Files

```
GET    /api/backup/[id]/download    # Download backup file
POST   /api/backup/upload           # Upload backup file
```

---

## Backup Data Structure

### Database Backup

```sql
-- Tables backed up
SELECT * FROM users;
SELECT * FROM exchanges;
SELECT * FROM api_keys;
SELECT * FROM positions;
SELECT * FROM trades;
SELECT * FROM orders;
SELECT * FROM signals;
SELECT * FROM bots;
SELECT * FROM bot_configs;
SELECT * FROM indicators;
SELECT * FROM strategies;
SELECT * FROM ml_models;
SELECT * FROM journal_entries;
SELECT * FROM workspaces;
SELECT * FROM notifications;
```

### Configuration Files

```
/config/
├── exchanges.json       # Exchange configurations
├── bots.json           # Bot settings
├── indicators.json     # Indicator settings
├── strategies.json     # Strategy configurations
├── ml-config.json      # ML model settings
├── notifications.json  # Notification rules
└── preferences.json    # User preferences
```

---

## Backup Process

### Workflow

```typescript
const performBackup = async (config: BackupConfig) => {
  // 1. Validate configuration
  validateBackupConfig(config);
  
  // 2. Create backup metadata
  const backupId = generateBackupId();
  const startTime = Date.now();
  
  // 3. Export data
  const data = await exportBackupData(config.include);
  
  // 4. Compress
  const compressed = config.compression.enabled
    ? await compress(data, config.compression)
    : data;
  
  // 5. Encrypt
  const encrypted = config.encryption.enabled
    ? await encrypt(compressed, config.encryption)
    : compressed;
  
  // 6. Calculate checksum
  const checksum = calculateChecksum(encrypted);
  
  // 7. Save backup
  await saveBackup(backupId, encrypted, config.storage);
  
  // 8. Update metadata
  const backup: Backup = {
    id: backupId,
    type: 'FULL',
    timestamp: new Date(),
    size: encrypted.length,
    duration: Date.now() - startTime,
    checksum
  };
  
  await saveBackupMetadata(backup);
  
  return backup;
};
```

### Restore Process

```typescript
const performRestore = async (
  backupId: string,
  options: RestoreOptions
) => {
  // 1. Validate backup exists
  const backup = await getBackupMetadata(backupId);
  if (!backup) throw new Error('Backup not found');
  
  // 2. Create pre-restore backup
  if (options.createBackupBeforeRestore) {
    await createBackup({ include: options.include });
  }
  
  // 3. Load backup data
  const encrypted = await loadBackup(backupId);
  
  // 4. Verify checksum
  const checksum = calculateChecksum(encrypted);
  if (checksum !== backup.checksum) {
    throw new Error('Backup integrity check failed');
  }
  
  // 5. Decrypt
  const compressed = await decrypt(encrypted);
  
  // 6. Decompress
  const data = await decompress(compressed);
  
  // 7. Import data
  await importBackupData(data, options);
  
  // 8. Clear caches
  await clearAllCaches();
  
  return { success: true };
};
```

---

## Storage Options

### Local Storage

```typescript
const localStorage: BackupStorage = {
  type: 'local',
  path: '/backups',
  
  save: async (id: string, data: Buffer) => {
    const path = `/backups/${id}.backup`;
    await fs.writeFile(path, data);
    return path;
  },
  
  load: async (id: string) => {
    const path = `/backups/${id}.backup`;
    return fs.readFile(path);
  },
  
  delete: async (id: string) => {
    const path = `/backups/${id}.backup`;
    await fs.unlink(path);
  }
};
```

### Cloud Storage (S3)

```typescript
const s3Storage: BackupStorage = {
  type: 's3',
  bucket: 'citarion-backups',
  prefix: 'backups/',
  
  save: async (id: string, data: Buffer) => {
    await s3.putObject({
      Bucket: this.bucket,
      Key: `${this.prefix}${id}.backup`,
      Body: data
    });
  },
  
  load: async (id: string) => {
    const result = await s3.getObject({
      Bucket: this.bucket,
      Key: `${this.prefix}${id}.backup`
    });
    return result.Body;
  }
};
```

---

## Security

### Encryption

```typescript
// AES-256-GCM encryption
const encrypt = async (data: Buffer, config: EncryptionConfig) => {
  const key = await deriveKey(config.password, config.salt);
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipheriv(
    'aes-256-gcm',
    key,
    iv
  );
  
  const encrypted = Buffer.concat([
    cipher.update(data),
    cipher.final()
  ]);
  
  const authTag = cipher.getAuthTag();
  
  return Buffer.concat([iv, authTag, encrypted]);
};
```

### API Key Protection

```typescript
// API keys are encrypted with separate key
const backupApiKeys = async (keys: ApiKey[]) => {
  const encrypted = keys.map(key => ({
    ...key,
    secret: encrypt(key.secret, API_KEY_ENCRYPTION_KEY)
  }));
  
  return encrypted;
};
```

---

## Retention Policy

```typescript
interface RetentionPolicy {
  // Keep for specified time
  keepFor: number; // days
  
  // Or keep specified count
  keepCount: number;
  
  // Cleanup rules
  cleanup: {
    keepFirst: number; // Always keep first N backups
    keepDaily: number; // Keep N daily backups
    keepWeekly: number; // Keep N weekly backups
    keepMonthly: number; // Keep N monthly backups
  };
}

// Automatic cleanup
const cleanupBackups = async (policy: RetentionPolicy) => {
  const backups = await listBackups();
  const toDelete = calculateBackupsToDelete(backups, policy);
  
  for (const backup of toDelete) {
    await deleteBackup(backup.id);
  }
};
```

---

## Monitoring

### Backup Status

```typescript
interface BackupStatus {
  lastBackup?: Date;
  lastBackupSize?: number;
  nextScheduledBackup?: Date;
  
  // Health
  health: 'healthy' | 'warning' | 'critical';
  
  // Warnings
  warnings: string[];
  
  // Statistics
  stats: {
    totalBackups: number;
    totalSize: number;
    oldestBackup: Date;
    newestBackup: Date;
    averageSize: number;
  };
}
```

### Alerts

```typescript
// Backup failure alert
const alertOnBackupFailure = (backup: Backup, error: Error) => {
  sendAlert({
    type: 'BACKUP_FAILURE',
    severity: 'HIGH',
    message: `Backup ${backup.id} failed: ${error.message}`,
    timestamp: new Date()
  });
};

// Storage space warning
const alertOnLowStorage = (availableSpace: number) => {
  if (availableSpace < MINIMUM_SPACE_THRESHOLD) {
    sendAlert({
      type: 'LOW_STORAGE',
      severity: 'MEDIUM',
      message: `Only ${availableSpace} bytes available for backups`
    });
  }
};
```

---

## UI Components

### Backup List

```tsx
<BackupList
  backups={backups}
  onSelect={handleSelectBackup}
  onRestore={handleRestore}
  onDelete={handleDelete}
  onDownload={handleDownload}
/>
```

### Backup Creator

```tsx
<BackupCreator
  onCreateBackup={handleCreateBackup}
  defaultConfig={defaultBackupConfig}
  showSchedule={true}
/>
```

### Restore Dialog

```tsx
<RestoreDialog
  backup={selectedBackup}
  onRestore={handleRestore}
  onCancel={handleCancel}
  options={{
    createBackupBeforeRestore: true,
    showConflictResolution: true
  }}
/>
```

---

## Best Practices

1. **Regular Backups:** Schedule daily backups minimum
2. **Offsite Storage:** Use cloud storage for disaster recovery
3. **Encryption:** Always encrypt sensitive data
4. **Test Restores:** Periodically test backup restoration
5. **Retention Policy:** Define and enforce retention rules
6. **Monitoring:** Set up alerts for backup failures

---

*Documentation for CITARION Algorithmic Trading Platform*
