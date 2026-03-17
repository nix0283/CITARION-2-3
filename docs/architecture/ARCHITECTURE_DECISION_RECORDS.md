# CITARION Architecture Decision Records (ADR)

> **Last Updated:** March 2025  
> **Format:** ADR (Architecture Decision Record)

---

## ⚠️ FUNDAMENTAL ARCHITECTURE DECISION

> **This is a PERSONAL, SINGLE-USER platform.** 
> 
> All architectural decisions are made with the assumption of **single-user deployment**.
> This is the foundational constraint that influences every technical choice in this project.
> 
> See [ADR-000: Single-User Personal Platform](#adr-000-single-user-personal-platform) below.

---

## Table of Contents

1. [ADR-000: Single-User Personal Platform (FUNDAMENTAL)](#adr-000-single-user-personal-platform)
2. [ADR-001: Next.js 16 with App Router](#adr-001-nextjs-16-with-app-router)
3. [ADR-002: Bun Runtime](#adr-002-bun-runtime)
4. [ADR-003: SQLite to PostgreSQL Migration](#adr-003-sqlite-to-postgresql-migration)
5. [ADR-004: Socket.IO for WebSocket](#adr-004-socketio-for-websocket)
6. [ADR-005: AES-256-GCM for API Keys](#adr-005-aes-256-gcm-for-api-keys)
7. [ADR-006: Zustand for State Management](#adr-006-zustand-for-state-management)
8. [ADR-007: k-NN Lawrence Classifier](#adr-007-k-nn-lawrence-classifier)

---

## ADR-000: Single-User Personal Platform

### Status
**ACCEPTED & FUNDAMENTAL** - This decision cannot be changed without complete project redesign.

### Context
When developing an algorithmic trading platform, there are fundamentally different architectural approaches:
1. **Multi-tenant SaaS** - Multiple users, registration, tenant isolation, billing
2. **Enterprise** - Corporate deployment, LDAP/SSO, compliance requirements
3. **Personal/Single-User** - One owner, no user management, simplified architecture

### Decision
**CITARION is a PERSONAL, SINGLE-USER algorithmic trading platform.**

This means:
- **No multi-tenancy** - Single database, single owner
- **No user registration** - No signup, login, password reset flows for external users
- **No authentication system** - Optional local auth for convenience only
- **No billing/subscriptions** - No payment processing, no tiered plans
- **No social features** - No follower system, no copy-trading for others
- **No horizontal scaling** - Single server deployment sufficient
- **No tenant isolation** - All data belongs to single owner

### Architecture Implications

| Feature | Multi-tenant Approach | CITARION Approach |
|---------|----------------------|-------------------|
| Database | PostgreSQL with tenant_id | SQLite single file |
| Auth | OAuth, SSO, JWT for users | Optional session (dev mode) |
| Scaling | Kubernetes, load balancers | Single VPS/local machine |
| Secrets | Vault, per-tenant encryption | Local .env file |
| Monitoring | Multi-tenant dashboards | Personal notifications |
| API Keys | Per-user encrypted storage | Single owner's keys |

### Alternatives Considered
1. **Multi-tenant SaaS** - Rejected: adds complexity, legal liability, ongoing costs
2. **Enterprise deployment** - Rejected: requires compliance, support team, SLAs
3. **Open-source community project** - Rejected: loses personal control, scope creep

### Consequences

**Positive:**
- Simplified architecture - no user management complexity
- Lower operational costs - single server deployment
- Faster development - focus on trading features, not platform infrastructure
- Full control - no need to consider other users' needs
- Local-first - can run entirely offline

**Negative:**
- Cannot monetize as a service
- Cannot share with other traders (by design)
- Limited to single owner's API rate limits

### References
- README.md - Project Scope Declaration
- Architecture documentation

---

## ADR Template

```markdown
# ADR-NNN: Title

## Status
[Proposed | Accepted | Deprecated | Superseded]

## Context
[What is the issue we're addressing?]

## Decision
[What is the change we're proposing/have made?]

## Alternatives Considered
[What other options were considered?]

## Consequences
[What are the positive and negative effects?]

## References
[Links to relevant documents]
```

---

## ADR-001: Next.js 16 with App Router

### Status
**Accepted** (March 2025)

### Context

We needed to choose a frontend framework for a complex trading platform with:
- Real-time data updates
- Server-side rendering for SEO
- API routes for backend logic
- File-based routing
- TypeScript support

### Decision

We chose **Next.js 16 with App Router** as our primary framework.

### Alternatives Considered

| Alternative | Pros | Cons |
|------------|------|------|
| **Remix** | Better data loading patterns | Smaller ecosystem, less community support |
| **Vite + React Router** | Faster dev server, more flexibility | No SSR by default, more setup required |
| **Nuxt.js** | Vue ecosystem, similar features | Team expertise in React, not Vue |
| **Plain React SPA** | Simplicity, full control | No SSR, manual API setup, no routing |

### Consequences

**Positive:**
- Rich ecosystem with shadcn/ui components
- Server Components for better performance
- Built-in API routes (no separate backend needed for many features)
- Strong TypeScript support
- Large community and documentation

**Negative:**
- Learning curve for App Router patterns
- Some third-party libraries not yet compatible with React 19
- Server/Client component boundaries require careful planning

### References
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)

---

## ADR-002: Bun Runtime

### Status
**Accepted** (March 2025)

### Context

We needed a JavaScript runtime for:
- Fast development server startup
- Quick test execution
- TypeScript support without compilation
- Package management

### Decision

We chose **Bun** as our primary runtime, replacing Node.js.

### Alternatives Considered

| Alternative | Pros | Cons |
|------------|------|------|
| **Node.js** | Industry standard, mature | Slower startup, requires ts-node |
| **Deno** | TypeScript native, secure by default | Smaller ecosystem, different APIs |
| **tsx (Node + esbuild)** | Fast TypeScript execution | Extra tool, still Node-based |

### Consequences

**Positive:**
- 10-20x faster test execution
- Native TypeScript support (no compilation)
- Built-in package manager (bun install)
- Built-in test runner
- Smaller memory footprint

**Negative:**
- Some Node.js native modules not compatible
- Newer project, potential bugs
- Smaller community than Node.js

### Benchmarks

```
Test execution time (500 tests):
- Node.js + Jest: ~45 seconds
- Node.js + Vitest: ~15 seconds
- Bun Test: ~3 seconds

Dev server startup:
- Next.js (Node): ~8 seconds
- Next.js (Bun): ~2 seconds
```

### References
- [Bun Documentation](https://bun.sh/docs)

---

## ADR-003: SQLite to PostgreSQL Migration

### Status
**Accepted** (March 2025)

### Context

We needed to choose a database for:
- Development simplicity
- Production scalability
- Complex queries with JOINs
- Future multi-tenant support

### Decision

- **Development:** SQLite via Prisma
- **Production:** PostgreSQL via Prisma

### Alternatives Considered

| Alternative | Pros | Cons |
|------------|------|------|
| **SQLite only** | Simple, no setup | No concurrency, limited scalability |
| **PostgreSQL only** | Production-ready, scalable | Complex local setup |
| **MySQL** | Widely used, fast | Less advanced features than PostgreSQL |
| **MongoDB** | Flexible schema | Not ideal for relational trading data |

### Consequences

**Positive:**
- Zero-config development with SQLite
- Easy production migration via Prisma
- Same ORM for both environments
- PostgreSQL features when needed (JSON, arrays, full-text search)

**Negative:**
- Subtle SQL differences between databases
- Need to test migration path

### Migration Path

```bash
# Development
DATABASE_URL="file:./dev.db"

# Production
DATABASE_URL="postgresql://user:pass@host:5432/citarion"
```

### References
- [Prisma Database Providers](https://www.prisma.io/docs/reference/database-reference/database-drivers)

---

## ADR-004: Socket.IO for WebSocket

### Status
**Accepted** (March 2025)

### Context

We needed real-time communication for:
- Price updates (multiple exchanges)
- Bot status notifications
- Trade confirmations
- Risk alerts

### Decision

We chose **Socket.IO** for WebSocket communication.

### Alternatives Considered

| Alternative | Pros | Cons |
|------------|------|------|
| **Native WebSocket** | No dependencies, maximum control | Manual reconnection, no fallbacks |
| **ws library** | Popular, well-maintained | Manual event handling, no rooms |
| **Pusher/Ably** | Managed service, easy scaling | Cost, external dependency |
| **Server-Sent Events** | Simple, HTTP-based | One-way only, no binary support |

### Consequences

**Positive:**
- Automatic reconnection with backoff
- Room-based broadcasting (per symbol, per user)
- Fallback to HTTP long-polling
- Built-in heartbeat
- TypeScript support

**Negative:**
- Larger bundle size than native WebSocket
- Additional abstraction layer
- Requires gateway configuration for multiple services

### Gateway Pattern

```
Frontend → Gateway (Caddy) → Microservice (Socket.IO on different ports)

Connection URL: io('/?XTransformPort=3002')
```

### References
- [Socket.IO Documentation](https://socket.io/docs/v4/)

---

## ADR-005: AES-256-GCM for API Keys

### Status
**Accepted** (March 2025)

### Context

We need to store exchange API keys securely:
- API keys have full trading access
- Must be recoverable for API calls
- Compliance requirements for key storage

### Decision

We use **AES-256-GCM** encryption for storing API keys.

### Alternatives Considered

| Alternative | Pros | Cons |
|------------|------|------|
| **AES-256-CBC** | Standard, widely supported | No built-in authentication |
| **RSA encryption** | Asymmetric, can use public key | Larger ciphertext, slower |
| **Hashing (bcrypt)** | One-way secure storage | Cannot recover original key |
| **Vault/HashiCorp** | Enterprise secret management | Infrastructure complexity |
| **AWS KMS/Cloud HSM** | Managed, FIPS compliant | Cloud vendor lock-in, cost |

### Consequences

**Positive:**
- Strong encryption (256-bit key)
- Authentication built-in (GCM mode)
- Fast encryption/decryption
- Self-contained (no external services)
- Deterministic for same input (can detect changes)

**Negative:**
- Key management is critical (ENCRYPTION_KEY env var)
- If key is lost, all stored API keys are unrecoverable
- Key rotation requires re-encrypting all credentials

### Implementation

```typescript
// Encryption structure
interface EncryptedCredentials {
  version: 1;
  encrypted: string;  // Base64
  iv: string;         // Base64, 16 bytes
  authTag: string;    // Base64, 16 bytes
}

// Key derivation
// ENCRYPTION_KEY: 32 bytes (64 hex characters)
// Generated: crypto.randomBytes(32).toString('hex')
```

### References
- [NIST AES-GCM Specification](https://csrc.nist.gov/publications/detail/sp/800-38d/final)

---

## ADR-006: Zustand for State Management

### Status
**Accepted** (March 2025)

### Context

We needed state management for:
- Navigation state (active tab)
- User preferences
- Real-time data caching
- Form state

### Decision

We chose **Zustand** for client-side state management.

### Alternatives Considered

| Alternative | Pros | Cons |
|------------|------|------|
| **Redux Toolkit** | Industry standard, DevTools | Boilerplate, complexity |
| **Jotai** | Atomic, minimal | Different mental model |
| **Recoil** | Facebook backing | Performance issues, less active |
| **React Context** | Built-in, no dependencies | Re-render issues, no DevTools |
| **TanStack Query only** | Server state handled well | No good for UI state |

### Consequences

**Positive:**
- Minimal boilerplate
- No providers needed
- Built-in persist middleware
- TypeScript-first
- Small bundle size (~3KB)
- Easy to test

**Negative:**
- Less structure than Redux
- Smaller ecosystem
- DevTools less mature

### Usage Pattern

```typescript
// Store definition
const useStore = create<State & Actions>((set, get) => ({
  // State
  activeTab: 'dashboard',
  
  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  // Computed
  getTotalBalance: () => {
    const state = get();
    return state.positions.reduce(...);
  },
}));

// Component usage
const activeTab = useStore(state => state.activeTab);
```

### References
- [Zustand Documentation](https://github.com/pmndrs/zustand)

---

## ADR-007: k-NN Lawrence Classifier

### Status
**Accepted** (March 2025)

### Context

We needed a lightweight, interpretable classifier for:
- Signal classification (LONG/SHORT/HOLD)
- Real-time inference
- Feature importance understanding

### Decision

We chose **k-NN (k-Nearest Neighbors) with Lawrence enhancements** for signal classification.

### Alternatives Considered

| Alternative | Pros | Cons |
|------------|------|------|
| **Neural Network** | Can learn complex patterns | Black box, needs training data |
| **Random Forest** | Handles non-linearity | Less interpretable |
| **XGBoost** | High accuracy | Overkill for simple classification |
| **Logistic Regression** | Interpretable | Linear decision boundary |
| **SVM** | Good for classification | Kernel selection complexity |

### Consequences

**Positive:**
- No training time (lazy learning)
- Easy to add new samples
- Interpretable decisions (can show neighbors)
- Works well with feature engineering
- Multiple distance functions available

**Negative:**
- Prediction time scales with training data
- Sensitive to feature scaling
- Curse of dimensionality with many features
- Needs good feature engineering

### Lawrence Enhancements

1. **Distance Functions:** Euclidean, Cosine, Lorentzian, Manhattan
2. **Filters:** Noise reduction, outlier handling
3. **Normalization:** MinMax, Z-score per feature
4. **Confidence Scoring:** Based on neighbor distances

### References
- [Lawrence Classifier Paper](https://www.tradingview.com/script/TtVBnbKq-Lawrence-s-Classification-Lojistic-Regression-by-West-Village/)

---

## ADR Index

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| 001 | Next.js 16 with App Router | Accepted | Mar 2025 |
| 002 | Bun Runtime | Accepted | Mar 2025 |
| 003 | SQLite to PostgreSQL Migration | Accepted | Mar 2025 |
| 004 | Socket.IO for WebSocket | Accepted | Mar 2025 |
| 005 | AES-256-GCM for API Keys | Accepted | Mar 2025 |
| 006 | Zustand for State Management | Accepted | Mar 2025 |
| 007 | k-NN Lawrence Classifier | Accepted | Mar 2025 |

---

## Creating New ADRs

When making a significant architectural decision:

1. Copy the ADR template
2. Assign next sequential number
3. Fill in all sections
4. Submit for review
5. Update the index

### When to Create ADR

- Choosing a new major dependency
- Changing database technology
- Selecting authentication method
- Modifying deployment architecture
- Choosing between implementations
