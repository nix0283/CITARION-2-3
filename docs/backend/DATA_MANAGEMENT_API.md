# Data Management API Documentation

Complete API reference for backup management, file operations, trading journal, and news aggregation services.

## Table of Contents

1. [Overview](#overview)
2. [Backup API](#1-backup-api)
3. [Files API](#2-files-api)
4. [Journal API](#3-journal-api)
5. [News API](#4-news-api)
6. [Database Backup Process](#5-database-backup-process)
7. [News Sentiment Analysis](#6-news-sentiment-analysis)
8. [Usage Examples](#7-usage-examples)

---

## Overview

The Data Management API provides comprehensive functionality for:

- **Backup Management**: Create, schedule, and restore database backups
- **File Operations**: List and download files from managed directories
- **Trading Journal**: Track trades, emotions, and performance metrics
- **News Aggregation**: Fetch, analyze, and manage crypto news with sentiment analysis

### Base URL

```
http://localhost:3000/api
```

### Authentication

All endpoints require authentication (currently using demo user ID for development).

### Response Format

All API responses follow this standard format:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: ZodError[]; // Validation errors
  message?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage?: boolean;
  };
  stats?: Record<string, unknown>;
}
```

---

## 1. Backup API

### 1.1 List Backups

List all backup records with filtering and pagination.

**Endpoint**: `GET /api/backup`

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Items per page (max 100) |
| `status` | enum | - | Filter by status: `pending`, `running`, `completed`, `failed`, `cancelled` |
| `type` | enum | - | Filter by type: `full`, `incremental`, `differential` |
| `scope` | enum | - | Filter by scope: `database`, `config`, `logs`, `all` |
| `search` | string | - | Search in name/description |
| `startDate` | string | - | Filter from date (ISO 8601) |
| `endDate` | string | - | Filter to date (ISO 8601) |
| `sortBy` | enum | createdAt | Sort by: `createdAt`, `fileSize`, `completedAt` |
| `sortOrder` | enum | desc | Sort order: `asc`, `desc` |

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "backup-uuid",
      "name": "backup-2024-01-15",
      "description": "Daily backup",
      "type": "full",
      "status": "completed",
      "fileName": "backup-2024-01-15.db.enc.gz",
      "filePath": "./backups/backup-2024-01-15.db.enc.gz",
      "fileSize": 15728640,
      "checksum": "sha256-hash",
      "compressed": true,
      "encrypted": true,
      "scope": "database",
      "tables": ["User", "Trade", "Position"],
      "recordCount": 15000,
      "retentionDays": 30,
      "triggeredBy": "scheduled",
      "createdAt": "2024-01-15T02:00:00Z",
      "completedAt": "2024-01-15T02:01:30Z"
    }
  ],
  "meta": {
    "total": 45,
    "page": 1,
    "limit": 20,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "stats": {
    "totalBackups": 45,
    "totalSize": 707788800,
    "successfulBackups": 42,
    "failedBackups": 3,
    "lastBackup": "2024-01-15T02:00:00Z",
    "lastSuccessful": "2024-01-15T02:01:30Z",
    "avgBackupSize": 16852457,
    "upcomingScheduled": "2024-01-16T02:00:00Z"
  }
}
```

---

### 1.2 Create Backup

Create a new backup (executed asynchronously).

**Endpoint**: `POST /api/backup`

#### Request Body

```typescript
interface CreateBackupRequest {
  name?: string;           // Auto-generated if not provided
  description?: string;
  type?: 'full' | 'incremental' | 'differential';  // Default: 'full'
  scope?: 'database' | 'config' | 'logs' | 'all';  // Default: 'database'
  tables?: string[];       // Specific tables to backup
  retentionDays?: number;  // Default: 30, max: 365
  compress?: boolean;      // Default: true
  encrypt?: boolean;       // Default: true
}
```

#### Example Request

```json
{
  "name": "pre-update-backup",
  "description": "Backup before system update",
  "type": "full",
  "scope": "database",
  "retentionDays": 90,
  "encrypt": true
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "backup-uuid",
    "name": "pre-update-backup",
    "status": "pending",
    "type": "full",
    "scope": "database",
    "tables": []
  },
  "message": "Backup started successfully"
}
```

---

### 1.3 Delete Backup

Delete a backup record and its file.

**Endpoint**: `DELETE /api/backup?id={backupId}`

#### Response

```json
{
  "success": true,
  "message": "Backup deleted successfully"
}
```

---

### 1.4 Restore Backup

Restore database from a backup file.

**Endpoint**: `POST /api/backup/restore`

#### Request Body

```typescript
interface RestoreRequest {
  backupId: string;
  restoreMode?: 'replace' | 'merge' | 'new_database';  // Default: 'replace'
  targetTables?: string[];  // Empty = all tables
}
```

#### Example Request

```json
{
  "backupId": "backup-uuid",
  "restoreMode": "replace"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "restore-uuid",
    "backupId": "backup-uuid",
    "backupName": "backup-2024-01-15",
    "status": "pending",
    "restoreMode": "replace",
    "targetScope": "database",
    "targetTables": [],
    "triggeredBy": "manual"
  },
  "message": "Restore operation started"
}
```

---

### 1.5 List Restore Records

View restore history.

**Endpoint**: `GET /api/backup/restore`

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Items per page |
| `status` | string | - | Filter by status |

---

### 1.6 Cancel Restore

Cancel a running restore operation.

**Endpoint**: `DELETE /api/backup/restore?id={restoreId}`

---

### 1.7 List Backup Schedules

Get all backup schedules.

**Endpoint**: `GET /api/backup/schedules`

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `includeInactive` | boolean | false | Include disabled schedules |

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "schedule-uuid",
      "name": "Daily Database Backup",
      "description": "Full database backup every day at 2 AM",
      "isActive": true,
      "frequency": "daily",
      "hour": 2,
      "minute": 0,
      "type": "full",
      "scope": "database",
      "retentionDays": 30,
      "compress": true,
      "encrypt": true,
      "notifyOnSuccess": true,
      "notifyOnFailure": true,
      "notifyChannels": ["telegram", "email"],
      "lastRunAt": "2024-01-15T02:00:00Z",
      "lastRunStatus": "completed",
      "nextRunAt": "2024-01-16T02:00:00Z",
      "totalRuns": 45,
      "successCount": 42,
      "failureCount": 3
    }
  ],
  "stats": {
    "total": 3,
    "active": 2,
    "inactive": 1,
    "totalRuns": 135,
    "successRate": 93.33
  }
}
```

---

### 1.8 Create Backup Schedule

Create a new automated backup schedule.

**Endpoint**: `POST /api/backup/schedules`

#### Request Body

```typescript
interface CreateScheduleRequest {
  name: string;
  description?: string;
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
  hour?: number;           // 0-23, default: 2
  minute?: number;         // 0-59, default: 0
  dayOfWeek?: number;      // 0-6 (Sunday=0), required for weekly
  dayOfMonth?: number;     // 1-31, required for monthly
  type?: 'full' | 'incremental' | 'differential';
  scope?: 'database' | 'config' | 'logs' | 'all';
  retentionDays?: number;
  compress?: boolean;
  encrypt?: boolean;
  notifyOnSuccess?: boolean;
  notifyOnFailure?: boolean;
  notifyChannels?: string[];
}
```

#### Example Request (Weekly Schedule)

```json
{
  "name": "Weekly Full Backup",
  "description": "Complete system backup every Sunday",
  "frequency": "weekly",
  "dayOfWeek": 0,
  "hour": 3,
  "minute": 0,
  "type": "full",
  "scope": "all",
  "retentionDays": 90,
  "notifyOnSuccess": true,
  "notifyChannels": ["telegram"]
}
```

---

### 1.9 Update Backup Schedule

**Endpoint**: `PUT /api/backup/schedules`

#### Request Body

```json
{
  "id": "schedule-uuid",
  "isActive": false
}
```

---

### 1.10 Delete Backup Schedule

**Endpoint**: `DELETE /api/backup/schedules?id={scheduleId}`

---

### 1.11 Trigger/Toggle Schedule

Manually trigger a schedule or toggle its active state.

**Endpoint**: `PATCH /api/backup/schedules`

#### Request Body

```json
{
  "id": "schedule-uuid",
  "action": "trigger"  // or "toggle"
}
```

---

## 2. Files API

### 2.1 List Files

List files in download/upload directories.

**Endpoint**: `GET /api/files/list`

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `dir` | string | all | Directory: `download`, `upload`, `all` |

#### Response

```json
{
  "download": {
    "path": "/home/z/my-project/download",
    "files": [
      {
        "name": "report.pdf",
        "path": "/home/z/my-project/download/report.pdf",
        "size": 1048576,
        "modified": "2024-01-15T10:30:00Z",
        "type": "file",
        "ext": ".pdf"
      },
      {
        "name": "exports",
        "path": "/home/z/my-project/download/exports",
        "size": 0,
        "modified": "",
        "type": "folder"
      }
    ],
    "stats": {
      "totalFiles": 15,
      "totalSize": 52428800,
      "totalSizeFormatted": "50.0 MB"
    }
  },
  "upload": {
    "path": "/home/z/my-project/upload",
    "files": [],
    "stats": {
      "totalFiles": 0,
      "totalSize": 0,
      "totalSizeFormatted": "0 B"
    }
  }
}
```

---

### 2.2 Download File

Download a file from allowed directories.

**Endpoint**: `GET /api/files/download?path={filePath}`

#### Security

- Only files within `/download` and `/upload` directories are accessible
- Path traversal attacks are prevented

#### Response

Returns the file as an attachment with appropriate Content-Type header.

#### Supported Content Types

| Extension | Content-Type |
|-----------|-------------|
| `.json` | application/json |
| `.md` | text/markdown |
| `.txt` | text/plain |
| `.csv` | text/csv |
| `.pdf` | application/pdf |
| `.docx` | application/vnd.openxmlformats-officedocument.wordprocessingml.document |
| `.xlsx` | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet |
| `.zip` | application/zip |
| `.tar` | application/x-tar |
| `.gz` | application/gzip |
| `.png` | image/png |
| `.jpg`, `.jpeg` | image/jpeg |
| `.svg` | image/svg+xml |
| `.js` | application/javascript |
| `.ts` | application/typescript |

---

## 3. Journal API

### 3.1 List Journal Entries

Get all journal entries with filtering.

**Endpoint**: `GET /api/journal`

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Items per page |
| `status` | enum | - | Review status: `pending`, `reviewed`, `archived`, `all` |
| `symbol` | string | - | Filter by trading pair |
| `emotion` | enum | - | Emotion: `confident`, `neutral`, `fearful`, `greedy`, `anxious`, `hopeful` |
| `marketCondition` | enum | - | Condition: `trending`, `ranging`, `volatile`, `choppy`, `neutral` |
| `direction` | enum | - | Trade direction: `LONG`, `SHORT` |
| `startDate` | string | - | Filter from date |
| `endDate` | string | - | Filter to date |
| `minPnl` | number | - | Minimum P&L |
| `maxPnl` | number | - | Maximum P&L |
| `search` | string | - | Search in title/content |
| `sortBy` | enum | tradeDate | Sort by: `tradeDate`, `pnl`, `entryQuality`, `createdAt` |
| `sortOrder` | enum | desc | Sort order |

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "entry-uuid",
      "userId": "demo-user",
      "title": "BTC Long Breakout",
      "content": "Entered on breakout above resistance...",
      "tradeId": "trade-uuid",
      "symbol": "BTCUSDT",
      "direction": "LONG",
      "marketCondition": "trending",
      "entryPrice": 42500,
      "exitPrice": 43200,
      "size": 0.1,
      "pnl": 70,
      "pnlPercent": 1.65,
      "entryQuality": 0.85,
      "exitQuality": 0.75,
      "riskManagement": 0.9,
      "lessons": ["Wait for confirmation candle"],
      "mistakes": ["Entered slightly early"],
      "improvements": ["Use limit orders for better entry"],
      "emotion": "confident",
      "tags": ["breakout", "btc", "trend-following"],
      "reviewStatus": "reviewed",
      "confidence": 0.8,
      "signalSource": "Vision Bot",
      "timeInTrade": 14400,
      "tradeDate": "2024-01-15T08:00:00Z",
      "createdAt": "2024-01-15T12:00:00Z"
    }
  ],
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "stats": {
    "totalTrades": 150,
    "winningTrades": 95,
    "losingTrades": 55,
    "winRate": 0.633,
    "totalPnL": 12500,
    "avgPnL": 83.33,
    "avgEntryQuality": 0.72,
    "avgExitQuality": 0.68,
    "avgRiskMgmt": 0.78,
    "byCondition": {
      "trending": { "count": 60, "pnl": 8500, "winRate": 0.7 },
      "ranging": { "count": 40, "pnl": 2000, "winRate": 0.55 },
      "volatile": { "count": 30, "pnl": 1500, "winRate": 0.6 },
      "choppy": { "count": 20, "pnl": -500, "winRate": 0.4 }
    },
    "byEmotion": {
      "confident": { "count": 50, "pnl": 7000, "winRate": 0.72 },
      "neutral": { "count": 60, "pnl": 4500, "winRate": 0.6 },
      "fearful": { "count": 20, "pnl": -500, "winRate": 0.45 },
      "greedy": { "count": 15, "pnl": -1000, "winRate": 0.4 },
      "anxious": { "count": 5, "pnl": -200, "winRate": 0.4 }
    }
  }
}
```

---

### 3.2 Create Journal Entry

**Endpoint**: `POST /api/journal`

#### Request Body

```typescript
interface JournalEntryRequest {
  title: string;           // Required, max 200 chars
  content: string;         // Max 10000 chars
  tradeId?: string;
  symbol?: string;
  direction?: 'LONG' | 'SHORT';
  marketCondition?: 'trending' | 'ranging' | 'volatile' | 'choppy' | 'neutral';
  entryPrice?: number;
  exitPrice?: number;
  size?: number;
  pnl?: number;            // Default: 0
  pnlPercent?: number;     // Default: 0
  entryQuality?: number;   // 0-1
  exitQuality?: number;    // 0-1
  riskManagement?: number; // 0-1
  lessons?: string[];
  mistakes?: string[];
  improvements?: string[];
  emotion?: 'confident' | 'neutral' | 'fearful' | 'greedy' | 'anxious' | 'hopeful';
  tags?: string[];
  reviewStatus?: 'pending' | 'reviewed' | 'archived';
  confidence?: number;     // 0-1
  signalSource?: string;
  timeInTrade?: number;    // Duration in seconds
  tradeDate?: string;      // ISO date string
}
```

#### Example Request

```json
{
  "title": "ETH Swing Trade - Failed Breakout",
  "content": "Entered ETH on what looked like a breakout above 2500 resistance. Volume was low and the breakout failed. Exited with small loss.",
  "symbol": "ETHUSDT",
  "direction": "LONG",
  "marketCondition": "ranging",
  "entryPrice": 2510,
  "exitPrice": 2485,
  "size": 2,
  "pnl": -50,
  "pnlPercent": -1,
  "entryQuality": 0.4,
  "exitQuality": 0.7,
  "riskManagement": 0.8,
  "lessons": ["Always check volume on breakouts", "Wait for retest confirmation"],
  "mistakes": ["Entered without volume confirmation"],
  "improvements": ["Add volume indicator to checklist"],
  "emotion": "anxious",
  "tags": ["breakout-failed", "eth", "volume"],
  "signalSource": "Manual"
}
```

---

### 3.3 Get Single Entry

**Endpoint**: `GET /api/journal/[id]`

---

### 3.4 Update Journal Entry

**Endpoint**: `PUT /api/journal/[id]`

#### Request Body

Same fields as Create, all optional for partial update.

---

### 3.5 Delete Journal Entry

**Endpoint**: `DELETE /api/journal/[id]`

---

## 4. News API

### 4.1 List News Articles

Get news articles with filtering.

**Endpoint**: `GET /api/news`

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Items per page |
| `category` | string | - | Category filter |
| `sentiment` | enum | - | `bullish`, `bearish`, `neutral` |
| `importance` | enum | - | `low`, `medium`, `high`, `critical` |
| `source` | string | - | Filter by source name |
| `symbol` | string | - | Filter by related symbol |
| `search` | string | - | Search in title/summary |
| `startDate` | string | - | Filter from date |
| `endDate` | string | - | Filter to date |
| `sortBy` | enum | publishedAt | `publishedAt`, `sentimentScore`, `importance`, `source` |
| `sortOrder` | enum | desc | Sort order |
| `refresh` | boolean | false | Fetch new articles before listing |

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "article-uuid",
      "externalId": "cointelegraph-12345",
      "title": "Bitcoin Surges Past $45K as ETF Approval Hopes Grow",
      "summary": "Bitcoin price rallied 5% on speculation about spot ETF approval...",
      "content": "Full article content...",
      "url": "https://cointelegraph.com/news/...",
      "imageUrl": "https://images.ct.com/...",
      "source": "CoinTelegraph",
      "author": "John Doe",
      "category": "bitcoin",
      "tags": ["bitcoin", "etf", "price"],
      "sentiment": "bullish",
      "sentimentScore": 0.72,
      "confidence": 0.85,
      "relatedSymbols": ["BTC"],
      "importance": "high",
      "publishedAt": "2024-01-15T10:30:00Z",
      "fetchedAt": "2024-01-15T10:35:00Z"
    }
  ],
  "meta": {
    "total": 500,
    "page": 1,
    "limit": 20,
    "totalPages": 25,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "stats": {
    "totalArticles": 500,
    "recentArticles": 45,
    "articlesBySentiment": {
      "bullish": 180,
      "bearish": 120,
      "neutral": 200
    },
    "articlesByCategory": {
      "bitcoin": 150,
      "ethereum": 100,
      "defi": 80,
      "regulation": 70,
      "general": 100
    },
    "articlesBySource": {
      "CoinTelegraph": 200,
      "CoinDesk": 150,
      "Decrypt": 100,
      "TheBlock": 50
    }
  }
}
```

---

### 4.2 Refresh News (Fetch New Articles)

Manually fetch new articles from all sources.

**Endpoint**: `POST /api/news`

#### Request Body

```typescript
interface RefreshRequest {
  sources?: string[];      // Specific sources to fetch (optional)
  limitPerSource?: number; // Default: 10
}
```

#### Response

```json
{
  "success": true,
  "fetched": 42,
  "stored": 38,
  "duplicates": 4,
  "errors": [],
  "sourceStats": {
    "CoinTelegraph": { "fetched": 10, "errors": 0 },
    "CoinDesk": { "fetched": 10, "errors": 0 },
    "Decrypt": { "fetched": 10, "errors": 0 },
    "TheBlock": { "fetched": 12, "errors": 0 }
  }
}
```

---

### 4.3 List News Sources

**Endpoint**: `GET /api/news/sources`

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `enabled` | boolean | - | Filter by enabled status |

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "source-uuid",
      "name": "cointelegraph",
      "displayName": "CoinTelegraph",
      "url": "https://cointelegraph.com",
      "rssUrl": "https://cointelegraph.com/rss",
      "enabled": true,
      "fetchInterval": 30,
      "rateLimit": 60,
      "lastFetchedAt": "2024-01-15T10:30:00Z",
      "totalFetched": 1500,
      "status": "active",
      "priority": 1
    }
  ],
  "stats": {
    "total": 5,
    "active": 4,
    "paused": 1,
    "error": 0
  }
}
```

---

### 4.4 Create News Source

**Endpoint**: `POST /api/news/sources`

#### Request Body

```typescript
interface CreateSourceRequest {
  name: string;            // Unique identifier
  displayName: string;
  url: string;             // Website URL
  rssUrl?: string;
  apiUrl?: string;
  enabled?: boolean;       // Default: true
  fetchInterval?: number;  // Minutes, default: 30, range: 5-1440
  rateLimit?: number;      // Requests per hour, default: 60
  priority?: number;       // 1-10, default: 5
}
```

---

### 4.5 Update News Source

**Endpoint**: `PUT /api/news/sources`

---

### 4.6 Delete News Source

**Endpoint**: `DELETE /api/news/sources?id={sourceId}`

---

### 4.7 List Bookmarks

**Endpoint**: `GET /api/news/bookmarks`

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Items per page |

---

### 4.8 Create Bookmark

**Endpoint**: `POST /api/news/bookmarks`

#### Request Body

```json
{
  "articleId": "article-uuid",
  "note": "Important for BTC analysis"
}
```

---

### 4.9 Update Bookmark Note

**Endpoint**: `PATCH /api/news/bookmarks`

#### Request Body

```json
{
  "articleId": "article-uuid",
  "note": "Updated note"
}
```

---

### 4.10 Delete Bookmark

**Endpoint**: `DELETE /api/news/bookmarks?articleId={articleId}`

---

### 4.11 List News Alerts

**Endpoint**: `GET /api/news/alerts`

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `isActive` | boolean | - | Filter by active status |

---

### 4.12 Create News Alert

**Endpoint**: `POST /api/news/alerts`

#### Request Body

```typescript
interface CreateAlertRequest {
  name: string;
  keywords: string[];      // 1-20 keywords
  symbols?: string[];      // Related symbols
  sources?: string[];      // Specific sources
  categories?: string[];   // Category filter
  sentiment?: 'bullish' | 'bearish' | 'neutral' | 'any';
  minImportance?: 'low' | 'medium' | 'high' | 'critical';
  notifyVia?: 'app' | 'email' | 'telegram';
  isActive?: boolean;
}
```

#### Example Request

```json
{
  "name": "BTC ETF News",
  "keywords": ["etf", "spot etf", "sec", "approval"],
  "symbols": ["BTC"],
  "minImportance": "high",
  "notifyVia": "telegram",
  "isActive": true
}
```

---

### 4.13 Update News Alert

**Endpoint**: `PUT /api/news/alerts`

---

### 4.14 Delete News Alert

**Endpoint**: `DELETE /api/news/alerts?id={alertId}`

---

## 5. Database Backup Process

### 5.1 Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   API Route     │───►│  BackupService   │───►│  Database File  │
│  /api/backup    │    │                  │    │   (SQLite)      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │   Compression    │
                       │    (gzip)        │
                       └──────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │   Encryption     │
                       │  (AES-256-GCM)   │
                       └──────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │  Backup File     │
                       │  .db.enc.gz      │
                       └──────────────────┘
```

### 5.2 Backup Types

| Type | Description | Use Case |
|------|-------------|----------|
| `full` | Complete database copy | Daily backups, pre-updates |
| `incremental` | Changes since last backup | Frequent, low-storage |
| `differential` | Changes since last full | Medium-term retention |

### 5.3 Backup Scopes

| Scope | Description | Tables Included |
|-------|-------------|-----------------|
| `database` | Core trading data | User, Trade, Position, Signal, BotConfig, JournalEntry, NewsArticle |
| `config` | System configuration | ExchangeConfig, ApiKey, NotificationSettings |
| `logs` | Historical logs | ActivityLog, ErrorLog, AuditLog |
| `all` | Complete backup | All tables |

### 5.4 Backup Service Configuration

```typescript
interface BackupConfig {
  enabled: boolean;
  storageType: 'local' | 's3' | 'gcs' | 'azure';
  storagePath: string;
  defaultRetentionDays: number;
  maxBackups: number;
  minFreeSpace: number;          // bytes
  encryptionEnabled: boolean;
  encryptionKey?: string;        // From BACKUP_ENCRYPTION_KEY env
  compressionEnabled: boolean;
  compressionLevel: number;      // 1-9
  maxConcurrentBackups: number;
  backupTimeout: number;         // ms
  notificationEmail?: string;
  notificationTelegram?: string;
}
```

### 5.5 Backup Process Flow

1. **Initialization**
   - Create backup record with `pending` status
   - Generate backup filename with timestamp
   - Ensure backup directory exists

2. **Database Read**
   - Read SQLite database file
   - Calculate SHA-256 checksum

3. **Compression**
   - Apply gzip compression (configurable level 1-9)
   - Default level: 6 (balance of speed/size)

4. **Encryption**
   - Generate random IV (16 bytes)
   - Encrypt with AES-256-GCM
   - Append auth tag to encrypted data

5. **File Write**
   - Write encrypted backup to disk
   - Record file size, checksum, duration

6. **Database Update**
   - Update backup record to `completed`
   - Update backup configuration stats

7. **Cleanup**
   - Delete backups past retention period
   - Enforce max backups limit

### 5.6 Restore Process Flow

1. **Validation**
   - Verify backup exists and is `completed`
   - Check file integrity via checksum

2. **Pre-Restore Backup**
   - Create backup of current database
   - Named: `{dbpath}.pre-restore-{timestamp}`

3. **Decryption**
   - Extract IV (first 16 bytes)
   - Extract auth tag (last 16 bytes)
   - Decrypt with AES-256-GCM

4. **Decompression**
   - Decompress gzip data

5. **Restore**
   - Write restored database file
   - Update restore record

6. **Rollback on Failure**
   - If restore fails, recover from pre-restore backup
   - Delete pre-restore backup on success

### 5.7 Scheduler Execution

```typescript
// Cron-like execution for scheduled backups
async function executeDueSchedules(): Promise<{
  executed: number;
  results: Array<{ scheduleId: string; success: boolean; error?: string }>;
}> {
  const now = new Date();
  
  const dueSchedules = await db.backupSchedule.findMany({
    where: {
      isActive: true,
      nextRunAt: { lte: now }
    }
  });
  
  for (const schedule of dueSchedules) {
    // Execute backup
    // Update schedule stats
    // Calculate next run time
  }
}
```

### 5.8 Next Run Time Calculation

| Frequency | Calculation |
|-----------|-------------|
| `hourly` | Next hour at specified minute |
| `daily` | Tomorrow at specified hour:minute |
| `weekly` | Next dayOfWeek at specified time |
| `monthly` | Next dayOfMonth at specified time |

---

## 6. News Sentiment Analysis

### 6.1 Overview

The sentiment analyzer uses a weighted keyword-based approach to classify news articles as bullish, bearish, or neutral.

### 6.2 Bullish Keywords (Sample)

| Keyword | Weight | Category |
|---------|--------|----------|
| `skyrocket` | 0.95 | Strong |
| `all-time high` | 0.95 | Strong |
| `surge` | 0.90 | Strong |
| `rally` | 0.85 | Strong |
| `bullish` | 0.75 | Medium |
| `adoption` | 0.65 | Medium |
| `partnership` | 0.55 | Medium |
| `growth` | 0.40 | Mild |

### 6.3 Bearish Keywords (Sample)

| Keyword | Weight | Category |
|---------|--------|----------|
| `crash` | 0.95 | Strong |
| `collapse` | 0.95 | Strong |
| `bloodbath` | 0.95 | Strong |
| `dump` | 0.85 | Strong |
| `bearish` | 0.75 | Medium |
| `lawsuit` | 0.65 | Medium |
| `ban` | 0.70 | Medium |
| `risk` | 0.35 | Mild |

### 6.4 Sentiment Analysis Algorithm

```typescript
function analyzeSentiment(text: string): SentimentResult {
  // 1. Tokenize text to lowercase words
  const words = text.toLowerCase().split(/\s+/);
  
  // 2. Match keywords and phrases
  let bullishScore = 0;
  let bearishScore = 0;
  let bullishCount = 0;
  let bearishCount = 0;
  let neutralCount = 0;
  
  // 3. Check for multi-word phrases first, then single words
  for (const word of words) {
    // Match against BULLISH_KEYWORDS and BEARISH_KEYWORDS
    // Accumulate scores and counts
  }
  
  // 4. Normalize and weight scores
  const avgBullishScore = bullishCount > 0 ? bullishScore / bullishCount : 0;
  const avgBearishScore = bearishCount > 0 ? bearishScore / bearishCount : 0;
  
  // 5. Calculate final score (-1 to +1)
  const score = (avgBullishScore * bullishWeight) - (avgBearishScore * bearishWeight);
  
  // 6. Determine sentiment label
  let sentiment: SentimentType;
  if (score > 0.15) sentiment = 'bullish';
  else if (score < -0.15) sentiment = 'bearish';
  else sentiment = 'neutral';
  
  // 7. Calculate confidence
  const confidence = Math.min(0.95, 0.5 + (totalSignals * 0.05) + (Math.abs(score) * 0.3));
  
  return { sentiment, score, confidence };
}
```

### 6.5 Importance Classification

Articles are classified by importance based on pattern matching:

| Level | Patterns |
|-------|----------|
| **Critical** | SEC/CFTC actions, exchange hacks, ETF approvals, halving, all-time highs, market crashes |
| **High** | Breakouts, partnerships, listings, upgrades, whale activity, regulation news |
| **Medium** | Analysis, predictions, market updates, integrations |
| **Low** | General news, minor updates |

### 6.6 Category Classification

Articles are categorized by topic:

| Category | Keywords |
|----------|----------|
| `regulation` | SEC, CFTC, legislation, lawsuit, court |
| `defi` | DeFi, DEX, yield, liquidity, staking |
| `nft` | NFT, collectible, OpenSea |
| `trading` | trading, strategy, indicator, analysis |
| `bitcoin` | bitcoin, BTC |
| `ethereum` | ethereum, ETH |
| `exchange` | exchange, Binance, Coinbase, Kraken |
| `technology` | blockchain, protocol, upgrade, fork |
| `market` | market, price, rally, crash |
| `altcoins` | altcoin, solana, cardano, XRP |

### 6.7 Symbol Extraction

```typescript
// Extracts mentioned cryptocurrencies from text
function extractSymbols(text: string): string[] {
  // Matches:
  // - Common names: bitcoin, ethereum, solana
  // - Symbols: BTC, ETH, SOL
  // - Trading pairs: BTCUSDT, ETHUSDT
  
  const CRYPTO_SYMBOLS = new Set([
    'btc', 'bitcoin', 'eth', 'ethereum', 'bnb', 'sol', 'solana',
    'xrp', 'ada', 'doge', 'dot', 'matic', 'avax', 'link', 'uni',
    'atom', 'ltc', 'near', 'ftm', 'arb', 'op', 'inj', 'sui', 'apt', 'sei'
  ]);
  
  // Returns standardized symbols: ['BTC', 'ETH']
}
```

---

## 7. Usage Examples

### 7.1 Creating a Manual Backup

```typescript
// Using fetch API
const response = await fetch('/api/backup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'pre-migration-backup',
    description: 'Full backup before database migration',
    type: 'full',
    scope: 'database',
    retentionDays: 90,
    encrypt: true
  })
});

const result = await response.json();
console.log('Backup started:', result.data.id);

// Poll for completion
const checkStatus = async (backupId: string) => {
  const res = await fetch(`/api/backup?id=${backupId}`);
  const { data } = await res.json();
  return data.status;
};
```

### 7.2 Setting Up Automated Backups

```typescript
// Create daily backup schedule
const createDailyBackup = async () => {
  const response = await fetch('/api/backup/schedules', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Daily Database Backup',
      description: 'Full database backup every day at 2 AM',
      frequency: 'daily',
      hour: 2,
      minute: 0,
      type: 'full',
      scope: 'database',
      retentionDays: 30,
      notifyOnSuccess: true,
      notifyOnFailure: true,
      notifyChannels: ['telegram']
    })
  });
  
  return response.json();
};

// Create weekly full backup
const createWeeklyBackup = async () => {
  const response = await fetch('/api/backup/schedules', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Weekly Full Backup',
      frequency: 'weekly',
      dayOfWeek: 0, // Sunday
      hour: 3,
      minute: 0,
      type: 'full',
      scope: 'all',
      retentionDays: 90
    })
  });
  
  return response.json();
};
```

### 7.3 Restoring from Backup

```typescript
const restoreBackup = async (backupId: string) => {
  // Start restore
  const response = await fetch('/api/backup/restore', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      backupId,
      restoreMode: 'replace'
    })
  });
  
  const { data: restoreRecord } = await response.json();
  
  // Monitor progress
  const pollRestore = setInterval(async () => {
    const res = await fetch('/api/backup/restore');
    const { data } = await res.json();
    const record = data.find((r: any) => r.id === restoreRecord.id);
    
    if (record.status === 'completed') {
      console.log('Restore completed:', record.recordsRestored, 'records');
      clearInterval(pollRestore);
    } else if (record.status === 'failed') {
      console.error('Restore failed:', record.errorMessage);
      clearInterval(pollRestore);
    }
  }, 2000);
};
```

### 7.4 Recording a Journal Entry

```typescript
const logTrade = async (tradeData: any) => {
  const response = await fetch('/api/journal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: `${tradeData.symbol} ${tradeData.direction}`,
      content: tradeData.notes,
      symbol: tradeData.symbol,
      direction: tradeData.direction,
      marketCondition: tradeData.marketCondition,
      entryPrice: tradeData.entryPrice,
      exitPrice: tradeData.exitPrice,
      size: tradeData.size,
      pnl: tradeData.pnl,
      pnlPercent: tradeData.pnlPercent,
      entryQuality: tradeData.entryQuality,
      exitQuality: tradeData.exitQuality,
      riskManagement: tradeData.riskManagement,
      lessons: tradeData.lessons,
      mistakes: tradeData.mistakes,
      improvements: tradeData.improvements,
      emotion: tradeData.emotion,
      tags: tradeData.tags,
      signalSource: tradeData.botName
    })
  });
  
  return response.json();
};
```

### 7.5 Analyzing Journal Performance

```typescript
const analyzePerformance = async () => {
  // Get entries for the last 30 days
  const response = await fetch('/api/journal?startDate=2024-01-01&endDate=2024-01-31');
  const { stats } = await response.json();
  
  console.log('Win Rate:', (stats.winRate * 100).toFixed(1) + '%');
  console.log('Total P&L:', stats.totalPnL);
  console.log('Average Entry Quality:', stats.avgEntryQuality);
  
  // Analyze by market condition
  for (const [condition, data] of Object.entries(stats.byCondition)) {
    console.log(`${condition}: ${data.count} trades, ${(data.winRate * 100).toFixed(1)}% win rate`);
  }
  
  // Analyze by emotion
  for (const [emotion, data] of Object.entries(stats.byEmotion)) {
    console.log(`${emotion}: ${data.count} trades, $${data.pnl} P&L`);
  }
};
```

### 7.6 Setting Up News Alerts

```typescript
const createNewsAlerts = async () => {
  // BTC price alert
  await fetch('/api/news/alerts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Bitcoin Price Alerts',
      keywords: ['bitcoin', 'btc', 'price', 'surge', 'crash', 'dump', 'pump'],
      symbols: ['BTC'],
      minImportance: 'high',
      notifyVia: 'telegram'
    })
  });
  
  // SEC/regulation alert
  await fetch('/api/news/alerts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Regulatory News',
      keywords: ['sec', 'cftc', 'regulation', 'lawsuit', 'ban', 'approval'],
      minImportance: 'critical',
      notifyVia: 'email'
    })
  });
  
  // DeFi opportunities
  await fetch('/api/news/alerts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'DeFi Opportunities',
      keywords: ['airdrop', 'incentive', 'rewards', 'yield'],
      categories: ['defi'],
      sentiment: 'bullish',
      notifyVia: 'app'
    })
  });
};
```

### 7.7 Fetching and Filtering News

```typescript
// Get bullish BTC news with high importance
const getBullishBTCNews = async () => {
  const params = new URLSearchParams({
    symbol: 'BTC',
    sentiment: 'bullish',
    importance: 'high',
    sortBy: 'publishedAt',
    sortOrder: 'desc',
    limit: '10'
  });
  
  const response = await fetch(`/api/news?${params}`);
  const { data, stats } = await response.json();
  
  return data;
};

// Refresh news and get latest
const refreshAndGetNews = async () => {
  // Fetch new articles
  await fetch('/api/news', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ limitPerSource: 20 })
  });
  
  // Get latest articles
  const response = await fetch('/api/news?refresh=true&limit=20');
  return response.json();
};
```

### 7.8 Managing Bookmarks

```typescript
// Bookmark an important article
const bookmarkArticle = async (articleId: string) => {
  await fetch('/api/news/bookmarks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      articleId,
      note: 'Important for upcoming BTC analysis'
    })
  });
};

// Get bookmarked articles
const getBookmarks = async () => {
  const response = await fetch('/api/news/bookmarks');
  const { data } = await response.json();
  return data;
};

// Remove bookmark
const removeBookmark = async (articleId: string) => {
  await fetch(`/api/news/bookmarks?articleId=${articleId}`, {
    method: 'DELETE'
  });
};
```

### 7.9 Complete Backup Management Script

```typescript
const backupManagementScript = async () => {
  // 1. Check backup status
  const status = await fetch('/api/backup').then(r => r.json());
  console.log('Current backups:', status.stats);
  
  // 2. Create manual backup before changes
  const backup = await fetch('/api/backup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'pre-maintenance-backup',
      type: 'full',
      scope: 'all'
    })
  }).then(r => r.json());
  
  console.log('Backup created:', backup.data.id);
  
  // 3. List schedules
  const schedules = await fetch('/api/backup/schedules').then(r => r.json());
  console.log('Active schedules:', schedules.stats);
  
  // 4. Trigger a schedule manually
  if (schedules.data.length > 0) {
    const trigger = await fetch('/api/backup/schedules', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: schedules.data[0].id,
        action: 'trigger'
      })
    }).then(r => r.json());
    
    console.log('Triggered backup:', trigger);
  }
  
  // 5. List restore history
  const restores = await fetch('/api/backup/restore').then(r => r.json());
  console.log('Restore history:', restores.data.length, 'records');
};
```

---

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "errors": [
    {
      "code": "invalid_type",
      "message": "Expected string, received number",
      "path": ["body", "name"]
    }
  ]
}
```

### Common HTTP Status Codes

| Status | Description |
|--------|-------------|
| 200 | Success |
| 201 | Created (POST success) |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 403 | Forbidden (access denied) |
| 500 | Internal Server Error |

---

## Rate Limiting

| Endpoint | Limit |
|----------|-------|
| `/api/backup` (POST) | 5/minute |
| `/api/backup/restore` (POST) | 2/minute |
| `/api/news` (POST) | 10/minute |
| `/api/news` (GET) | 60/minute |
| `/api/journal` | 100/minute |
| `/api/files/*` | 30/minute |

---

## Security Considerations

1. **Backup Encryption**: All backups are encrypted with AES-256-GCM by default
2. **File Access**: Only files within allowed directories are accessible
3. **Checksum Verification**: All restore operations verify file integrity
4. **Pre-Restore Backup**: Current database is backed up before any restore operation

---

## Related Documentation

- [Trading API](./TRADING_API.md)
- [Risk Management API](./RISK_API.md)
- [Database Schema](../database/SCHEMA.md)
- [WebSocket Events](./WEBSOCKET_EVENTS.md)

---

*Last updated: January 2024*
