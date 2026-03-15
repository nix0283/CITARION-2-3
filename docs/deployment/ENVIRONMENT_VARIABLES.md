# CITARION Environment Variables

> **Last Updated:** March 2025  
> **Format:** `.env` file (dotenv)

---

## Table of Contents

1. [Overview](#overview)
2. [Required Variables](#required-variables)
3. [Database](#database)
4. [Authentication](#authentication)
5. [Exchange API Keys](#exchange-api-keys)
6. [ML Services](#ml-services)
7. [Telegram Bot](#telegram-bot)
8. [Security](#security)
9. [Optional Variables](#optional-variables)
10. [Environment-Specific Configs](#environment-specific-configs)

---

## Overview

CITARION uses environment variables for configuration. All variables are loaded from a `.env` file in the project root.

```bash
# .env file location
/home/z/my-project/.env
```

### Loading Order

1. System environment variables (highest priority)
2. `.env.local` (local overrides)
3. `.env.development` / `.env.production`
4. `.env` (default values)

---

## Required Variables

### Minimum Required for Startup

```env
# Database (Required)
DATABASE_URL="file:./dev.db"

# NextAuth (Required for authentication)
NEXTAUTH_SECRET="your-secret-key-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Encryption (Required for API key storage)
ENCRYPTION_KEY="your-32-byte-encryption-key-here"
```

---

## Database

### SQLite (Default)

```env
DATABASE_URL="file:./dev.db"
```

### PostgreSQL (Production)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/citarion?schema=public"
```

### MySQL (Alternative)

```env
DATABASE_URL="mysql://user:password@localhost:3306/citarion"
```

---

## Authentication

### NextAuth Configuration

```env
# Required - Secret for JWT signing
NEXTAUTH_SECRET="your-super-secret-key-at-least-32-characters"

# Required - Public URL for callbacks
NEXTAUTH_URL="http://localhost:3000"

# Optional - Session timeout (in seconds)
NEXTAUTH_SESSION_MAX_AGE=2592000  # 30 days

# Optional - JWT timeout (in seconds)
NEXTAUTH_JWT_MAX_AGE=604800  # 7 days
```

### Generate Secret

```bash
# Generate a secure secret
openssl rand -base64 32
# or
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Exchange API Keys

### Binance

```env
# Binance API
BINANCE_API_KEY="your-binance-api-key"
BINANCE_API_SECRET="your-binance-api-secret"

# Binance Testnet (optional)
BINANCE_TESTNET_API_KEY="your-testnet-api-key"
BINANCE_TESTNET_API_SECRET="your-testnet-api-secret"
```

### Bybit

```env
# Bybit API (V5)
BYBIT_API_KEY="your-bybit-api-key"
BYBIT_API_SECRET="your-bybit-api-secret"

# Bybit Testnet (optional)
BYBIT_TESTNET_API_KEY="your-testnet-api-key"
BYBIT_TESTNET_API_SECRET="your-testnet-api-secret"
```

### OKX

```env
# OKX API
OKX_API_KEY="your-okx-api-key"
OKX_API_SECRET="your-okx-api-secret"
OKX_PASSPHRASE="your-okx-passphrase"
```

### Bitget

```env
# Bitget API
BITGET_API_KEY="your-bitget-api-key"
BITGET_API_SECRET="your-bitget-api-secret"
BITGET_PASSPHRASE="your-bitget-passphrase"
```

### BingX

```env
# BingX API
BINGX_API_KEY="your-bingx-api-key"
BINGX_API_SECRET="your-bingx-api-secret"
```

### KuCoin

```env
# KuCoin API
KUCOIN_API_KEY="your-kucoin-api-key"
KUCOIN_API_SECRET="your-kucoin-api-secret"
KUCOIN_PASSPHRASE="your-kucoin-passphrase"
```

### Coinbase

```env
# Coinbase API
COINBASE_API_KEY="your-coinbase-api-key"
COINBASE_API_SECRET="your-coinbase-api-secret"
```

### HTX (Huobi)

```env
# HTX/Huobi API
HTX_API_KEY="your-htx-api-key"
HTX_API_SECRET="your-htx-api-secret"
```

### HyperLiquid

```env
# HyperLiquid API
HYPERLIQUID_API_KEY="your-hyperliquid-api-key"
HYPERLIQUID_API_SECRET="your-hyperliquid-api-secret"
```

### BitMEX

```env
# BitMEX API
BITMEX_API_KEY="your-bitmex-api-key"
BITMEX_API_SECRET="your-bitmex-api-secret"

# BitMEX Testnet
BITMEX_TESTNET_API_KEY="your-testnet-api-key"
BITMEX_TESTNET_API_SECRET="your-testnet-api-secret"
```

### BloFin

```env
# BloFin API
BLOFIN_API_KEY="your-blofin-api-key"
BLOFIN_API_SECRET="your-blofin-api-secret"
BLOFIN_PASSPHRASE="your-blofin-passphrase"
```

---

## ML Services

### ML Service (Python/FastAPI)

```env
# ML Service URL
ML_SERVICE_URL="http://localhost:3006"
ML_SERVICE_TIMEOUT=30000  # 30 seconds

# WebSocket endpoint
ML_SERVICE_WS_URL="ws://localhost:3006/ws"
```

### RL Service (Python/FastAPI)

```env
# RL Service URL
RL_SERVICE_URL="http://localhost:3007"
RL_SERVICE_TIMEOUT=60000  # 60 seconds
```

---

## Telegram Bot

### Bot Configuration

```env
# Telegram Bot Token (from @BotFather)
TELEGRAM_BOT_TOKEN="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"

# Webhook URL (for production)
TELEGRAM_WEBHOOK_URL="https://your-domain.com/api/telegram/webhook"

# Allowed Telegram User IDs (optional, comma-separated)
TELEGRAM_ALLOWED_USERS="123456789,987654321"

# Admin Telegram User IDs (optional)
TELEGRAM_ADMIN_USERS="123456789"
```

### Setting Up Webhook

```bash
# Set webhook manually
curl -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook" \
  -d "url=${TELEGRAM_WEBHOOK_URL}"
```

---

## Security

### API Key Encryption

```env
# AES-256-GCM encryption key (32 bytes, hex-encoded)
ENCRYPTION_KEY="0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"

# Generate encryption key
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### TradingView Webhook

```env
# TradingView webhook secret (for HMAC verification)
TRADINGVIEW_WEBHOOK_SECRET="your-webhook-secret"

# Allowed IPs (optional, comma-separated)
TRADINGVIEW_ALLOWED_IPS=""
```

### Cron Secret

```env
# Secret for cron endpoints
CRON_SECRET="your-cron-secret"
```

### Rate Limiting

```env
# Rate limit: requests per minute
RATE_LIMIT_REQUESTS_PER_MINUTE=60

# Rate limit: burst limit
RATE_LIMIT_BURST=100
```

---

## Optional Variables

### Redis (Distributed Locks)

```env
# Redis URL (for distributed locking)
REDIS_URL="redis://localhost:6379"

# Redis password (optional)
REDIS_PASSWORD=""

# Redis database index (optional)
REDIS_DB=0
```

### Sentry (Error Tracking)

```env
# Sentry DSN
NEXT_PUBLIC_SENTRY_DSN="https://xxx@xxx.ingest.sentry.io/xxx"
SENTRY_DSN="https://xxx@xxx.ingest.sentry.io/xxx"

# Environment
SENTRY_ENVIRONMENT="development"
```

### Logging

```env
# Log level: debug, info, warn, error
LOG_LEVEL="info"

# Log format: json, pretty
LOG_FORMAT="pretty"
```

### CORS

```env
# Allowed origins (comma-separated)
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:3002"
```

---

## Environment-Specific Configs

### Development (.env.development)

```env
NODE_ENV=development
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
LOG_LEVEL="debug"
LOG_FORMAT="pretty"

# Use testnet APIs
USE_TESTNET=true
```

### Staging (.env.staging)

```env
NODE_ENV=staging
DATABASE_URL="postgresql://user:pass@staging-db:5432/citarion"
NEXTAUTH_URL="https://staging.your-domain.com"
LOG_LEVEL="info"

# Use testnet APIs
USE_TESTNET=true
```

### Production (.env.production)

```env
NODE_ENV=production
DATABASE_URL="postgresql://user:pass@prod-db:5432/citarion"
NEXTAUTH_URL="https://your-domain.com"
LOG_LEVEL="warn"
LOG_FORMAT="json"

# Use production APIs
USE_TESTNET=false

# Enable Redis for distributed locks
REDIS_URL="redis://prod-redis:6379"
```

---

## Validation

### Required Variables Check

The application validates required environment variables on startup:

```typescript
// lib/env.ts
const requiredEnvVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'ENCRYPTION_KEY',
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});
```

### Type Validation

```typescript
// Using Zod for environment validation
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  ENCRYPTION_KEY: z.string().length(64), // 32 bytes hex
  ML_SERVICE_URL: z.string().url().optional(),
});

const env = envSchema.parse(process.env);
```

---

## Security Best Practices

### DO ✅

1. **Use strong secrets** - At least 32 characters for NEXTAUTH_SECRET
2. **Rotate keys regularly** - Especially after any security incident
3. **Use different keys per environment** - Never share between dev/prod
4. **Restrict API key permissions** - Only enable needed permissions
5. **Use IP whitelisting** - Restrict API keys to your server IP

### DON'T ❌

1. **Commit .env files** - Add to `.gitignore`
2. **Share secrets in chat** - Use secure channels
3. **Use production keys in development** - Use testnet
4. **Store secrets in code** - Always use environment variables

---

## Example .env File

```env
# ============================================
# CITARION Environment Configuration
# ============================================

# ---- Database ----
DATABASE_URL="file:./dev.db"

# ---- Authentication ----
NEXTAUTH_SECRET="change-me-to-a-secure-random-string-at-least-32-characters"
NEXTAUTH_URL="http://localhost:3000"

# ---- Encryption ----
ENCRYPTION_KEY="0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"

# ---- ML Services ----
ML_SERVICE_URL="http://localhost:3006"
RL_SERVICE_URL="http://localhost:3007"

# ---- Telegram Bot ----
TELEGRAM_BOT_TOKEN=""
TELEGRAM_WEBHOOK_URL=""

# ---- Exchange API Keys (configure in UI instead) ----
# BINANCE_API_KEY=""
# BINANCE_API_SECRET=""
# BYBIT_API_KEY=""
# BYBIT_API_SECRET=""
# OKX_API_KEY=""
# OKX_API_SECRET=""
# OKX_PASSPHRASE=""
# BITGET_API_KEY=""
# BITGET_API_SECRET=""
# BITGET_PASSPHRASE=""
# BINGX_API_KEY=""
# BINGX_API_SECRET=""

# ---- Security ----
TRADINGVIEW_WEBHOOK_SECRET=""
CRON_SECRET=""

# ---- Optional ----
# REDIS_URL="redis://localhost:6379"
# LOG_LEVEL="info"
# RATE_LIMIT_REQUESTS_PER_MINUTE=60
```

---

## Troubleshooting

### "Missing required environment variable"

```bash
# Check if variable is set
echo $DATABASE_URL

# Or in Node.js
node -e "console.log(process.env.DATABASE_URL)"
```

### "Invalid ENCRYPTION_KEY length"

```bash
# Generate a valid 32-byte key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### "NEXTAUTH_SECRET is too short"

```bash
# Generate a secure secret (min 32 chars)
openssl rand -base64 32
```

---

## Related Documentation

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deployment instructions
- [SECURITY_GUIDE.md](../security/SECURITY_GUIDE.md) - Security configuration
- [API_SPECIFICATION.md](../architecture/API_SPECIFICATION.md) - API documentation
