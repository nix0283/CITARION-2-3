# CITARION API Versioning Strategy

**Version:** 1.0
**Last Updated:** March 2026
**Status:** Production Ready

---

## Table of Contents

1. [Overview](#1-overview)
2. [Versioning Approach](#2-versioning-approach)
3. [URL Structure](#3-url-structure)
4. [Version Lifecycle](#4-version-lifecycle)
5. [Breaking vs Non-Breaking Changes](#5-breaking-vs-non-breaking-changes)
6. [Deprecation Policy](#6-deprecation-policy)
7. [Client SDK Management](#7-client-sdk-management)
8. [Migration Guides](#8-migration-guides)

---

## 1. Overview

### 1.1 Purpose

This document defines the API versioning strategy for CITARION, ensuring backward compatibility while enabling continuous improvement.

### 1.2 Goals

- Maintain backward compatibility
- Enable smooth API evolution
- Provide clear deprecation paths
- Minimize breaking changes
- Support multiple client versions

### 1.3 Scope

- REST API endpoints
- WebSocket protocols
- Webhook payloads
- SDK interfaces

---

## 2. Versioning Approach

### 2.1 Semantic Versioning

API versions follow semantic versioning (MAJOR.MINOR.PATCH):

```
MAJOR: Breaking changes
MINOR: New features, backward compatible
PATCH: Bug fixes, backward compatible
```

### 2.2 Version Format

```
v{MAJOR} - URL path versioning (primary)
Example: /api/v1/trades, /api/v2/trades
```

### 2.3 Version Headers

```http
# Request
X-API-Version: 2024-01-01

# Response
X-API-Version: 2024-01-01
X-Deprecated: true (if applicable)
X-Sunset: 2024-07-01 (deprecation date)
```

---

## 3. URL Structure

### 3.1 Current Version (v1)

```
/api/v1/
├── /market
│   ├── GET /prices
│   ├── GET /candles
│   └── GET /tickers
├── /trade
│   ├── POST /order
│   ├── DELETE /order/:id
│   └── GET /orders
├── /positions
│   ├── GET /
│   └── PUT /:id
├── /bots
│   ├── GET /
│   ├── POST /
│   └── PUT /:id
└── /account
    ├── GET /balance
    └── GET /settings
```

### 3.2 Versioned Endpoints

| Version | Status | Release Date | Sunset Date |
|---------|--------|--------------|-------------|
| v1 | **Current** | 2024-01-01 | - |
| v2 | Planned | 2025-01-01 | - |

### 3.3 Version Routing

```typescript
// Next.js API route versioning
// src/app/api/[version]/route.ts

const VERSION_HANDLERS = {
  v1: require('./v1/handlers'),
  v2: require('./v2/handlers'),
};

export async function GET(
  request: NextRequest,
  { params }: { params: { version: string } }
) {
  const handler = VERSION_HANDLERS[params.version];
  if (!handler) {
    return NextResponse.json(
      { error: 'Unsupported API version' },
      { status: 400 }
    );
  }
  return handler.GET(request);
}
```

---

## 4. Version Lifecycle

### 4.1 Lifecycle Stages

```
┌─────────┐   ┌────────────┐   ┌─────────────┐   ┌─────────┐
│  Alpha  │ → │    Beta    │ → │   Current   │ → │ Sunset  │
└─────────┘   └────────────┘   └─────────────┘   └─────────┘
     │              │                │                │
  Release        Active           Sunset           Retired
   (New)      (Recommended)    (Deprecated)      (Unsupported)
```

### 4.2 Version Timeline

| Stage | Duration | Support Level |
| Duration | Support Level |
|----------|----------|-----------|
| Release | 6 months | Full support |
| Active | Until next major | Full support |
| Sunset | 6 months | Security fixes only |
| Retired | - | No support |

### 4.3 Version Support Policy

```typescript
interface VersionSupport {
  version: string;
  status: 'release' | 'active' | 'sunset' | 'retired';
  releaseDate: Date;
  sunsetDate?: Date;
  retiredDate?: Date;
  supportLevel: 'full' | 'security' | 'none';
}

const SUPPORTED_VERSIONS: VersionSupport[] = [
  {
    version: 'v1',
    status: 'active',
    releaseDate: new Date('2024-01-01'),
    supportLevel: 'full',
  },
];
```

---

## 5. Breaking vs Non-Breaking Changes

### 5.1 Breaking Changes (Require Major Version)

| Change Type | Example | Action Required |
|-------------|----------|---------|
| Remove endpoint | DELETE /api/v1/old | Version bump |
| Change required field | `symbol` now required | Version bump |
| Change response structure | Rename field in response | Version bump |
| Change auth method | New auth mechanism | Version bump |
| Change error format | New error structure | Version bump |

### 5.2 Non-Breaking Changes (Minor Version)

| Change Type | Example | Action Required |
|-------------|----------|---------|
| Add endpoint | New GET /api/v1/analytics | No version bump |
| Add optional field | New query param | No version bump |
| Add response field | New field in response | No version bump |
| Add enum value | New order type | No version bump |

### 5.3 Change Detection

```typescript
// Middleware to detect API version in request
function detectApiVersion(request: NextRequest): string {
  // 1. URL path version
  const urlVersion = request.nextUrl.pathname.match(/\/api\/(v\d+)\//)?.[1];

  // 2. Header version
  const headerVersion = request.headers.get('X-API-Version');

  // 3. Default version
  return urlVersion || headerVersion || CURRENT_VERSION;
}
```

---

## 5.4 Backward Compatibility Layer

```typescript
// Compatibility layer for old clients
class ApiCompatibility {
  static transformResponse<T>(data: T, version: string): T {
    switch (version) {
      case 'v1':
        return this.transformForV1(data);
      default:
        return data;
    }
  }

  private static transformForV1<T>(data: T): T {
    // Transform new format to old format if needed
    return data;
  }
}
```

---

## 6. Deprecation Policy

### 6.1 Deprecation Process

1. **Announce** - Add deprecation notice in response headers
2. **Document** - Update API docs with migration guide
3. **Notify** - Email all API consumers 90 days before sunset
4. **Monitor** - Track usage of deprecated endpoints
 6.2 Deprecation Headers

```http
HTTP/1.1 200 OK
Content-Type: application/json
X-API-Version: v1
X-Deprecated: true
X-Sunset: Sat, 01 Jul 2025 00:00:00 GMT
Link: </api/v2/trades>; rel="successor-version"
Deprecation: true
```

### 6.3 Deprecation Timeline

```
Day 0:    Mark as deprecated
Day 30:   First notification to users
Day 60:   Second notification
Day 90:   Final warning
Day 180:  End of life
```

### 6.4 Monitoring Deprecated Usage

```typescript
// Track deprecated endpoint usage
async function trackDeprecatedUsage(endpoint: string, version: string) {
  await db.deprecatedUsage.create({
    data: {
      endpoint,
      version,
      timestamp: new Date(),
      apiKey: getApiKeyFromRequest(),
    },
  });
}
```

---

## 7. Client SDK Management

### 7.1 SDK Versioning

```json
{
  "name": "@citarion/sdk",
  "version": "2.1.0",
  "apiVersion": "v1"
}
```

### 7.2 SDK Compatibility Matrix

| SDK Version | API Version | Status |
|------------|------------|--------|
| 1.x | v1 | Supported |
| 2.x | v1, v2 | Current |

### 7.3 Version Negotiation

```typescript
// Client SDK sends version header
const client = new CitrionSDK({
  apiKey: 'your-api-key',
  apiVersion: 'v1',
});

// Server responds with current version
response.setHeader('X-API-Version', 'v1');
response.setHeader('X-SDK-Compatible', 'true');
```

### 7.4 Auto-Update Mechanism

```typescript
// SDK checks for updates
class SDKVersionChecker {
  static async checkForUpdates(currentVersion: string) {
    const response = await fetch('https://api.citarion.io/v1/sdk/version');
    const { latest, minSupported } = await response.json();
    
    if (this.compareVersions(currentVersion, minSupported) < 0) {
      console.warn('SDK version is no longer supported. Please update.');
    }
  }
}
```

---

## 8. Migration Guides

### 8.1 v1 to v2 Migration

#### Authentication Changes

```diff
- // v1
- POST /api/v1/auth/login
- { "email": "...", "password": "..." }

+ // v2
+ POST /api/v2/auth/login
+ { "email": "...", "password": "...", "totpCode": "..." } // Added 2FA support

```

#### Order Endpoint Changes

```diff
- // v1
- POST /api/v1/trade/order
+ // v2
+ POST /api/v2/trade/order

- {
-   "symbol": "BTCUSDT",
-   "side": "BUY",
-   "type": "GET /api/v1/trade/order

+ // v2
+ POST /api/v2/trade/order
+ {
+   "symbol": "BTCUSDT",
+   "side": "BUY",
+   type: "LIMIT",
+   quantity: "0.001",
+   price: 50000
+ }
+ // v2: {
+   "symbol": "BTCUSDT",
+ "side": "BUY",
+ type: "LIMIT",
+ quantity: "0.001",
+ price: 50000

- // v2 supports additional fields
+ // v2 supports additional order types
```

```typescript
// v2 supports additional order types
+ {
+   "symbol": "BTCUSDT",
+ "side": "BUY",
+ type: "LIMIT",
+ quantity: "0. "type": "LIMIT",
+   quantity": 0.001,
+ price: 50000,
```

```typescript
// response includes execution details
+ "reduceOnly": false,
+ "timeInForce": "GTC"
```

```
+ }
```

```typescript
// response includes additional fields
+ }
```

```
+ // v2 response
+ {
+  "orderId": "123",
+ "status": "FILLED",
+  symbol": "BTCUSDT",
+ "executedQty": 0.001
+  // v2 additional fields
+ "avgPrice": 50000,
+ "commission": 0.00004
+}
```

```

#### Breaking Changes Summary

| Area | v1 | v2 | Migration |
|------|----|----|-----------|
| Auth | Basic | 2FA support | Add 2FA flow |
| Orders | Simple | Complex orders | Update order struct |
| Pagination | Offset | Cursor-based | Update pagination logic |
| Errors | Numeric codes | String codes | Update error handling |

### 8.2 Migration Tools

```typescript
// API migration helper
class ApiMigrationHelper {
  static migrateOrderV1ToV2(v1Order: V1Order): V2Order {
    return {
      ...v1Order,
      // Add new required fields
      reduceOnly: false,
      timeInForce: v1Order.type === 'LIMIT' ? 'GTC' : undefined,
    };
  }
}
```

### 8.3 Compatibility Shims

```typescript
// Shim for v1 clients connecting to v2 API
app.use('/api/v1/*', (req, res, next) => {
  // Transform v1 request to v2 format
  req.body = transformV1ToV2(req.body);
  
  // Continue to v2 handler
  req.url = req.url.replace('/v1/', '/v2/');
  next();
});
```

---

## 9. WebSocket Versioning

### 9.1 Version Negotiation

```typescript
// WebSocket version via query param
const ws = new WebSocket('wss://api.citarion.io/ws?version=v1');
```

### 9.2 Message Format Versioning

```typescript
interface WebSocketMessage {
  v: string;  // Version
  t: string;  // Type
  d: any;     // Data
}

// v1 message format
{
  "v": "1",
  "t": "trade",
  "d": {
    "symbol": "BTCUSDT",
    "price": 50000,
    "quantity": 1
  }
}
```

---

## 10. Documentation Versioning

### 10.1 Documentation Structure

```
docs/
├── api/
│   ├── v1/
│   │   ├── overview.md
│   │   ├── authentication.md
│   │   └── endpoints.md
│   └── v2/
│       ├── overview.md
│       ├── authentication.md
│       └── endpoints.md
```

### 10.2 Version Selector

```typescript
// Documentation version selector component
<VersionSelector versions={['v1', 'v2'] available={['v1', 'v2']} current={version} onChange={setVersion} />
```

---

## Appendix A: Version Checklist

### Release Checklist

```
□ Update API version in all endpoints
□ Update documentation
□ Update SDK
□ Add deprecation notices (if applicable)
□ Update OpenAPI spec
□ Test backward compatibility
□ Update migration guide
□ Notify users
```

### Sunset Checklist

```
□ Send 90-day notice
□ Send 60-day notice
□ Send 30-day notice
□ Update documentation
□ Remove v1 SDK support
□ Archive v1 documentation
□ Remove v1 endpoints
```

---

## Appendix B: OpenAPI Versioning

```yaml
openapi: 3.0.0
info:
  title: CITARION API
  version: 1.0.0
  x-api-versions:
    - v1
    - v2

servers:
  - url: https://api.citarion.io/v1
    description: Version 1
  - url: https://api.citarion.io/v2
    description: Version 2

paths:
  /trades:
    get:
      operationId: getTrades
      deprecated: false
      responses:
        '200':
          description: List of trades
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | March 2026 | CITARION Team | Initial release |

---

*This document is part of the CITARION Documentation Suite.*
