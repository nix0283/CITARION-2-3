# CITARION Security Guide

> **Last Updated:** March 2025  
> **Classification:** Internal

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [API Key Encryption](#api-key-encryption)
4. [Session Management](#session-management)
5. [Input Validation](#input-validation)
6. [API Security](#api-security)
7. [WebSocket Security](#websocket-security)
8. [Database Security](#database-security)
9. [Incident Response](#incident-response)
10. [Security Checklist](#security-checklist)

---

## Overview

CITARION handles sensitive financial data and exchange API keys. Security is a top priority.

### Security Principles

1. **Defense in Depth** - Multiple layers of security
2. **Least Privilege** - Minimum required permissions
3. **Encryption at Rest** - All sensitive data encrypted
4. **Encryption in Transit** - TLS for all communications
5. **Audit Trail** - All actions logged

### Threat Model

| Threat | Mitigation |
|--------|------------|
| API Key Theft | AES-256-GCM encryption |
| Session Hijacking | Secure cookies, token rotation |
| SQL Injection | Prisma parameterized queries |
| XSS | Input sanitization, CSP |
| CSRF | Double submit cookies |
| Rate Limiting Abuse | Per-user and IP limits |

---

## Authentication

### NextAuth.js Configuration

```typescript
// lib/auth.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await compare(credentials!.password, user.password);
        
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
```

### Two-Factor Authentication (2FA)

```typescript
// lib/2fa.ts
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

export async function setup2FA(userId: string) {
  const secret = speakeasy.generateSecret({
    name: `CITARION (${userId})`,
    length: 32,
  });

  // Encrypt and store secret
  const encryptedSecret = await encrypt(secret.base32);
  await db.user.update({
    where: { id: userId },
    data: {
      twoFactorSecret: encryptedSecret,
      twoFactorEnabled: false,
    },
  });

  return {
    otpauthUrl: secret.otpauth_url,
    qrCode: await qrcode.toDataURL(secret.otpauth_url!),
  };
}

export async function verify2FA(userId: string, token: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { twoFactorSecret: true },
  });

  const secret = await decrypt(user.twoFactorSecret);

  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 2, // Allow 2 steps tolerance
  });
}
```

### Password Requirements

```typescript
// lib/password-validator.ts
import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(12, 'Password must be at least 12 characters')
  .max(100, 'Password must be less than 100 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import('bcrypt');
  return bcrypt.hash(password, 12);
}
```

---

## API Key Encryption

### AES-256-GCM Implementation

```typescript
// lib/api-key-encryption.ts
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
const SALT_LENGTH = 32;

function getEncryptionKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY;
  if (!key || key.length !== 64) {
    throw new Error('Invalid ENCRYPTION_KEY: must be 32 bytes (64 hex chars)');
  }
  return Buffer.from(key, 'hex');
}

export interface EncryptedData {
  version: number;
  encrypted: string;
  iv: string;
  authTag: string;
  salt?: string;
}

export async function encryptApiKey(plaintext: string): Promise<EncryptedData> {
  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);
  const salt = randomBytes(SALT_LENGTH);

  const cipher = createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(plaintext, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  
  const authTag = cipher.getAuthTag();

  return {
    version: 1,
    encrypted,
    iv: iv.toString('base64'),
    authTag: authTag.toString('base64'),
    salt: salt.toString('base64'),
  };
}

export async function decryptApiKey(encryptedData: EncryptedData): Promise<string> {
  const key = getEncryptionKey();
  const iv = Buffer.from(encryptedData.iv, 'base64');
  const authTag = Buffer.from(encryptedData.authTag, 'base64');

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encryptedData.encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
```

### Storing API Credentials

```typescript
// Example: Saving exchange credentials
async function saveExchangeCredentials(
  accountId: string,
  credentials: {
    apiKey: string;
    apiSecret: string;
    passphrase?: string;
  }
) {
  const encryptedCredentials = {
    version: 1,
    apiKey: await encryptApiKey(credentials.apiKey),
    apiSecret: await encryptApiKey(credentials.apiSecret),
    passphrase: credentials.passphrase 
      ? await encryptApiKey(credentials.passphrase) 
      : null,
  };

  await db.account.update({
    where: { id: accountId },
    data: {
      encryptedApiCredentials: JSON.stringify(encryptedCredentials),
      encryptionVersion: 1,
      // Clear legacy unencrypted fields
      apiKey: null,
      apiSecret: null,
    },
  });
}
```

---

## Session Management

### Session Configuration

```typescript
// Session settings
const SESSION_CONFIG = {
  // JWT settings
  maxAge: 30 * 24 * 60 * 60, // 30 days
  updateAge: 24 * 60 * 60,   // Update every 24 hours

  // Cookie settings
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  },
};
```

### Session Invalidation

```typescript
// Force logout all sessions
async function invalidateAllSessions(userId: string) {
  // Delete all sessions from database
  await db.session.deleteMany({
    where: { userId },
  });

  // Invalidate JWT by changing user's token version
  await db.user.update({
    where: { id: userId },
    data: { tokenVersion: { increment: 1 } },
  });
}
```

### API Key Authentication

```typescript
// Middleware for API key auth
export async function validateApiKey(
  request: Request
): Promise<User | null> {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const key = authHeader.slice(7);
  
  // Validate format
  if (!key.startsWith('ck_') || key.length !== 35) {
    return null;
  }

  // Hash the key
  const keyHash = createHash('sha256').update(key).digest('hex');

  // Look up key
  const apiKey = await db.apiKey.findUnique({
    where: { keyHash },
    include: { user: true },
  });

  if (!apiKey || !apiKey.isActive) {
    return null;
  }

  // Check expiration
  if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
    return null;
  }

  // Update last used
  await db.apiKey.update({
    where: { id: apiKey.id },
    data: { lastUsedAt: new Date() },
  });

  return apiKey.user;
}
```

---

## Input Validation

### Zod Schemas

```typescript
// lib/validators/trading.ts
import { z } from 'zod';

export const openPositionSchema = z.object({
  symbol: z.string()
    .regex(/^[A-Z]{2,10}USDT?$/, 'Invalid symbol format'),
  direction: z.enum(['LONG', 'SHORT']),
  amount: z.number()
    .positive('Amount must be positive')
    .max(1000000, 'Amount exceeds maximum'),
  leverage: z.number()
    .int('Leverage must be integer')
    .min(1, 'Minimum leverage is 1')
    .max(125, 'Maximum leverage is 125'),
  stopLoss: z.number().positive().optional(),
  takeProfits: z.array(z.object({
    price: z.number().positive(),
    percentage: z.number().min(1).max(100),
  })).optional(),
});

// Validate and sanitize
export function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T {
  return schema.parse(data);
}
```

### Signal Parser Sanitization

```typescript
// lib/signal-parser.ts
function sanitizeSignalInput(input: string): string {
  // Remove control characters
  let sanitized = input.replace(/[\x00-\x1F\x7F]/g, '');
  
  // Limit length
  sanitized = sanitized.slice(0, 5000);
  
  // Remove potential script injection
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  return sanitized.trim();
}
```

---

## API Security

### Rate Limiting

```typescript
// lib/rate-limiter.ts
import { LRUCache } from 'lru-cache';

const rateLimit = new LRUCache<string, number>({
  max: 10000,
  ttl: 60000, // 1 minute
});

export function checkRateLimit(
  identifier: string,
  limit: number = 60
): { allowed: boolean; remaining: number } {
  const current = rateLimit.get(identifier) || 0;
  
  if (current >= limit) {
    return { allowed: false, remaining: 0 };
  }
  
  rateLimit.set(identifier, current + 1);
  
  return { allowed: true, remaining: limit - current - 1 };
}

// Usage in API route
export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { allowed, remaining } = checkRateLimit(`ip:${ip}`, 30);
  
  if (!allowed) {
    return Response.json(
      { error: 'Rate limit exceeded' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } }
    );
  }
  
  // ... handler logic
}
```

### HMAC Signature Verification

```typescript
// lib/webhook-verification.ts
import { createHmac, timingSafeEqual } from 'crypto';

export function verifyTradingViewSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  // Timing-safe comparison
  try {
    return timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

// Usage
export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get('x-signature')?.replace('sha256=', '') || '';
  
  if (!verifyTradingViewSignature(payload, signature, process.env.TRADINGVIEW_WEBHOOK_SECRET!)) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 });
  }
  
  // Process webhook
}
```

---

## WebSocket Security

### Origin Validation

```typescript
// mini-services/*/index.ts
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .filter(Boolean);

io.use((socket, next) => {
  const origin = socket.handshake.headers.origin;
  
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return next(new Error('Origin not allowed'));
  }
  
  next();
});
```

### Authentication Middleware

```typescript
// WebSocket auth
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  
  if (!token) {
    return next(new Error('Authentication required'));
  }
  
  try {
    const user = await verifyJwtToken(token);
    socket.data.userId = user.id;
    next();
  } catch (error) {
    next(new Error('Invalid token'));
  }
});
```

---

## Database Security

### Prisma Best Practices

```typescript
// ✅ Safe - Parameterized query
const user = await db.user.findUnique({
  where: { email: userInput },
});

// ✅ Safe - Prisma escapes values
const positions = await db.position.findMany({
  where: {
    symbol: userInput,
    status: 'OPEN',
  },
});

// ❌ Unsafe - Raw SQL with user input
// NEVER do this
await db.$queryRaw`SELECT * FROM users WHERE email = ${userInput}`;

// ✅ Safe - Raw SQL with Prisma escaping
await db.$queryRaw`SELECT * FROM users WHERE email = ${Prisma.sql`${userInput}`}`;
```

### Data Access Control

```typescript
// Always filter by user ID
async function getUserPositions(userId: string) {
  return db.position.findMany({
    where: {
      account: { userId }, // Critical: Filter by user
    },
  });
}
```

---

## Incident Response

### Security Event Logging

```typescript
// lib/security-logging.ts
export async function logSecurityEvent(event: {
  type: 'AUTH_FAILURE' | 'API_KEY_COMPROMISE' | 'SUSPICIOUS_ACTIVITY';
  userId?: string;
  ip: string;
  details: Record<string, unknown>;
}) {
  await db.securityLog.create({
    data: {
      type: event.type,
      userId: event.userId,
      ipAddress: event.ip,
      details: JSON.stringify(event.details),
      timestamp: new Date(),
    },
  });

  // Alert on critical events
  if (event.type === 'API_KEY_COMPROMISE') {
    await sendSecurityAlert(event);
  }
}
```

### Response Procedure

1. **Identify** - Detect security incident
2. **Contain** - Isolate affected systems
3. **Eradicate** - Remove threat
4. **Recover** - Restore normal operations
5. **Learn** - Post-incident review

### Emergency Contacts

```yaml
# Emergency escalation
Level 1: Development Team (immediate)
Level 2: Security Team (15 minutes)
Level 3: CTO (30 minutes)
Level 4: Legal (if data breach)
```

---

## Security Checklist

### Pre-Deployment

- [ ] All environment variables set
- [ ] HTTPS enabled with valid certificate
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Input validation on all endpoints
- [ ] Authentication required for sensitive routes
- [ ] API keys encrypted
- [ ] Error messages don't leak sensitive info

### Regular Audits

- [ ] Rotate encryption keys quarterly
- [ ] Review access logs weekly
- [ ] Update dependencies monthly
- [ ] Penetration test annually
- [ ] Security training for developers

### Code Review Security Points

- [ ] No hardcoded secrets
- [ ] No SQL injection vectors
- [ ] No XSS vectors
- [ ] Proper authentication checks
- [ ] Proper authorization checks
- [ ] Input validation present
- [ ] Error handling doesn't leak info

---

## Related Documentation

- [ENVIRONMENT_VARIABLES.md](../deployment/ENVIRONMENT_VARIABLES.md) - Secrets management
- [API_SPECIFICATION.md](../architecture/API_SPECIFICATION.md) - API security
- [ERROR_HANDLING.md](../development/ERROR_HANDLING.md) - Error handling
