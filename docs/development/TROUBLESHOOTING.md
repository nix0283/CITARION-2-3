# CITARION Troubleshooting Guide

> **Last Updated:** March 2025  
> **Scope:** Common Issues & Solutions

---

## Table of Contents

1. [Application Startup](#application-startup)
2. [Database Issues](#database-issues)
3. [Exchange Connectivity](#exchange-connectivity)
4. [Trading Issues](#trading-issues)
5. [Bot Issues](#bot-issues)
6. [WebSocket Issues](#websocket-issues)
7. [Performance Issues](#performance-issues)
8. [Deployment Issues](#deployment-issues)

---

## Application Startup

### "Module not found" Error

**Problem:**
```
Error: Cannot find module '@/lib/something'
```

**Solution:**
```bash
# Check tsconfig.json paths
cat tsconfig.json | grep paths

# Reinstall dependencies
rm -rf node_modules bun.lockb
bun install

# Restart TypeScript server in VS Code
# Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

### "Environment variable not found"

**Problem:**
```
Error: ENCRYPTION_KEY is required
```

**Solution:**
```bash
# Check .env file exists
ls -la .env

# Verify variable is set
grep ENCRYPTION_KEY .env

# Generate missing key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Add to .env
echo 'ENCRYPTION_KEY="your-generated-key"' >> .env
```

### Port Already in Use

**Problem:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 bun run dev
```

---

## Database Issues

### Prisma Client Not Generated

**Problem:**
```
Error: @prisma/client did not initialize yet
```

**Solution:**
```bash
# Generate Prisma client
bunx prisma generate

# Push schema to database
bun run db:push

# If issues persist, reset
bunx prisma migrate reset
```

### Database Locked (SQLite)

**Problem:**
```
Error: SQLITE_BUSY: database is locked
```

**Solution:**
```bash
# Check for open connections
lsof | grep dev.db

# Kill any hanging processes
pkill -f "bun run dev"

# Add timeout to DATABASE_URL
DATABASE_URL="file:./dev.db?busy_timeout=5000"
```

### Migration Failed

**Problem:**
```
Error: Migration failed to apply
```

**Solution:**
```bash
# Check migration status
bunx prisma migrate status

# Force resolve (development only)
bunx prisma migrate resolve --applied <migration_name>

# Reset database (warning: data loss)
bun run db:reset
```

### Foreign Key Constraint

**Problem:**
```
Error: Foreign key constraint failed
```

**Solution:**
```typescript
// Check relations before deleting
const user = await db.user.findUnique({
  where: { id: userId },
  include: { 
    accounts: true,
    positions: true,
    trades: true,
  },
});

// Delete in correct order
await db.trade.deleteMany({ where: { userId } });
await db.position.deleteMany({ where: { accountId: { in: accountIds } } });
await db.account.deleteMany({ where: { userId } });
await db.user.delete({ where: { id: userId } });
```

---

## Exchange Connectivity

### Invalid API Key

**Problem:**
```
TradingError: INVALID_API_KEY - Invalid API key for binance
```

**Solution:**
1. Verify API key is correct
2. Check API key permissions (needs trading permission)
3. Check IP whitelist includes server IP
4. For testnet, ensure using testnet keys

```typescript
// Test API key
const client = createExchangeClient({
  exchange: 'binance',
  apiKey: 'your-key',
  apiSecret: 'your-secret',
});

try {
  await client.getBalance();
  console.log('API key valid');
} catch (error) {
  console.error('API key invalid:', error);
}
```

### Rate Limit Exceeded

**Problem:**
```
TradingError: EXCHANGE_RATE_LIMIT - binance rate limit exceeded
```

**Solution:**
```typescript
// Add rate limiting to client
const client = createExchangeClient({
  exchange: 'binance',
  apiKey: '...',
  apiSecret: '...',
  rateLimit: {
    maxRequests: 1200,
    perMinutes: 1,
  },
});

// Or implement backoff
await withRetry(
  () => client.createOrder(order),
  { maxAttempts: 5, baseDelayMs: 1000 }
);
```

### Exchange Maintenance

**Problem:**
```
TradingError: EXCHANGE_UNAVAILABLE - binance is under maintenance
```

**Solution:**
1. Check exchange status page
2. Implement fallback to another exchange
3. Queue orders for later execution

```typescript
// Check exchange status
const status = await client.getSystemStatus();
if (status !== 'ok') {
  // Queue order or notify user
}
```

### Timestamp Sync Error

**Problem:**
```
Error: Timestamp for this request is outside of the recvWindow
```

**Solution:**
```bash
# Sync system time
sudo ntpdate -s time.nist.gov

# Or increase recvWindow in client
const client = new BinanceClient({
  ...,
  options: { recvWindow: 60000 },
});
```

---

## Trading Issues

### Insufficient Balance

**Problem:**
```
TradingError: INSUFFICIENT_BALANCE - Not enough USDT
```

**Solution:**
1. Check actual balance on exchange
2. Account for reserved margin
3. Reduce position size

```typescript
// Check balance before order
const balance = await client.getBalance();
const available = balance.find(b => b.asset === 'USDT')?.availableBalance;

if (available < orderAmount) {
  throw insufficientBalanceError(orderAmount, available);
}
```

### Order Rejected

**Problem:**
```
TradingError: ORDER_REJECTED - Order would trigger immediately
```

**Solution:**
1. Check order type (stop-limit vs limit)
2. Verify stop price is valid
3. Check position direction

```typescript
// For stop orders, ensure stop price is:
// - Above current price for BUY stop
// - Below current price for SELL stop
const currentPrice = await client.getCurrentPrice(symbol);

if (order.type === 'STOP_MARKET') {
  if (order.side === 'BUY' && order.stopPrice <= currentPrice) {
    // Stop price must be above current price
    order.stopPrice = currentPrice * 1.01;
  }
}
```

### Position Not Found

**Problem:**
```
TradingError: POSITION_NOT_FOUND - Position pos_abc123 not found
```

**Solution:**
1. Check position status (might be already closed)
2. Sync positions from exchange
3. Check correct account

```typescript
// Sync positions first
await syncPositions(accountId);

// Then fetch
const position = await db.position.findUnique({
  where: { id: positionId },
});
```

### Leverage Error

**Problem:**
```
TradingError: LEVERAGE_EXCEEDED - Maximum leverage is 125
```

**Solution:**
1. Check symbol max leverage
2. Reduce leverage setting
3. Account for position size (larger positions = lower max leverage)

```typescript
// Get symbol leverage limits
const leverageBrackets = await client.getLeverageBrackets(symbol);
const maxLeverage = leverageBrackets.find(
  b => positionSize >= b.notionalFloor && positionSize < b.notionalCap
)?.maxLeverage;

// Set appropriate leverage
const safeLeverage = Math.min(requestedLeverage, maxLeverage);
await client.setLeverage(symbol, safeLeverage);
```

---

## Bot Issues

### Grid Bot Not Trading

**Problem:** Grid bot running but no trades executed

**Solution:**
1. Check if price is within grid range
2. Verify grid orders were placed
3. Check bot has active orders

```typescript
// Debug grid bot
const gridBot = await db.gridBot.findUnique({
  where: { id: botId },
  include: { gridOrders: true },
});

console.log('Price range:', gridBot.lowerPrice, '-', gridBot.upperPrice);
console.log('Current price:', currentPrice);
console.log('Orders:', gridBot.gridOrders.length);

// Check if orders are pending
const pendingOrders = gridBot.gridOrders.filter(o => o.status === 'PENDING');
console.log('Pending orders:', pendingOrders.length);
```

### DCA Bot Over-Investing

**Problem:** DCA bot investing more than configured

**Solution:**
1. Check DCA multiplier calculation
2. Verify base amount
3. Reset bot state

```typescript
// Calculate expected investment
let expectedInvestment = 0;
for (let i = 0; i <= currentLevel; i++) {
  const amount = baseAmount * Math.pow(dcaMultiplier, i);
  expectedInvestment += amount;
}

// Compare with actual
const actualInvestment = await getTotalInvestment(botId);
if (Math.abs(expectedInvestment - actualInvestment) > tolerance) {
  console.warn('Investment mismatch:', expectedInvestment, actualInvestment);
}
```

### BB Bot No Signals

**Problem:** BB bot not generating signals

**Solution:**
1. Check indicator values
2. Verify signal thresholds
3. Check market conditions

```typescript
// Debug BB indicators
const bb = await calculateDoubleBollingerBands(prices);
const stoch = await calculateSlowStochastic(highs, lows, closes);

console.log('BB:', {
  upper: bb.outerUpper,
  middle: bb.middle,
  lower: bb.outerLower,
  bandwidth: bb.bandwidth,
});

console.log('Stochastic:', {
  k: stoch.k,
  d: stoch.d,
  overbought: stoch.isOverbought,
  oversold: stoch.isOversold,
});

// Check signal conditions
const price = closes[closes.length - 1];
console.log('Price near lower band?', price <= bb.innerLower);
console.log('Stoch oversold?', stoch.k < 20);
```

### Bot Lock Not Released

**Problem:** Bot stuck in "locked" state

**Solution:**
```typescript
// Check lock status
const lockKey = getBotLockKey('grid', botId);
const isLocked = await isBotLocked(lockKey);

if (isLocked) {
  // Force release (use with caution)
  await releaseBotLock(lockKey);
  console.log('Lock released for bot:', botId);
}

// Or wait for auto-expiry (default 5 minutes)
```

---

## WebSocket Issues

### Connection Drops

**Problem:** WebSocket disconnects frequently

**Solution:**
1. Implement reconnection logic
2. Check network stability
3. Verify heartbeat

```typescript
// Robust WebSocket connection
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;

function connect() {
  const ws = io('/?XTransformPort=3002', {
    reconnection: true,
    reconnectionAttempts: maxReconnectAttempts,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  ws.on('connect', () => {
    reconnectAttempts = 0;
    console.log('WebSocket connected');
  });

  ws.on('disconnect', (reason) => {
    console.log('WebSocket disconnected:', reason);
    
    if (reason === 'io server disconnect') {
      // Server disconnected, manual reconnect
      ws.connect();
    }
  });

  ws.on('connect_error', (error) => {
    reconnectAttempts++;
    console.error('Connection error:', error);
  });

  return ws;
}
```

### No Price Updates

**Problem:** WebSocket connected but no price updates

**Solution:**
1. Check subscription
2. Verify symbol format
3. Check exchange connection

```typescript
// Debug price WebSocket
ws.emit('subscribe', { symbols: ['BTCUSDT'] });

ws.on('price_update', (data) => {
  console.log('Price update:', data);
});

// Check server-side
// In price-service/index.ts
socket.on('subscribe', (data) => {
  console.log('Subscribe request:', data);
  // Add to subscription list
});
```

---

## Performance Issues

### Slow API Response

**Problem:** API responses taking > 5 seconds

**Solution:**
1. Check database queries
2. Add indexes
3. Implement caching

```typescript
// Add Prisma query logging
const db = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
  ],
});

db.$on('query', (e) => {
  if (e.duration > 1000) {
    console.warn('Slow query:', e.query, 'Duration:', e.duration);
  }
});

// Add indexes
// In schema.prisma:
model Position {
  // ...
  @@index([accountId, status])
  @@index([symbol, direction])
}
```

### Memory Leak

**Problem:** Memory usage increasing over time

**Solution:**
1. Check for unclosed connections
2. Clear caches periodically
3. Use proper cleanup

```typescript
// Check for leaks
setInterval(() => {
  const used = process.memoryUsage();
  console.log('Memory:', {
    heapUsed: Math.round(used.heapUsed / 1024 / 1024) + 'MB',
    heapTotal: Math.round(used.heapTotal / 1024 / 1024) + 'MB',
  });
}, 60000);

// Common leak sources:
// 1. Unclosed event listeners
// 2. Growing arrays without bounds
// 3. Unclosed WebSocket connections
// 4. Timer intervals without cleanup
```

### High CPU Usage

**Problem:** CPU at 100% constantly

**Solution:**
```bash
# Profile CPU usage
node --cpu-prof your-script.js

# Check running processes
top -p $(pgrep -d',' -f "bun run")

# Use Node.js inspector
node --inspect your-script.js
# Open chrome://inspect
```

---

## Deployment Issues

### Build Fails

**Problem:**
```
Error: Build failed with errors
```

**Solution:**
```bash
# Check for type errors
bun run type-check

# Check for lint errors
bun run lint

# Build with verbose output
bun run build --debug

# Common issues:
# 1. Missing environment variables
# 2. Type errors in code
# 3. Import errors
```

### Database Migration Fails in Production

**Problem:**
```
Error: P3005: The database schema is not empty
```

**Solution:**
```bash
# Check current migration state
bunx prisma migrate status

# Run migration in deploy mode (production)
bunx prisma migrate deploy

# If schema drift:
bunx prisma migrate diff \
  --from-schema-datasource prisma/schema.prisma \
  --to-schema-datamodel prisma/schema.prisma \
  --script
```

### Health Check Failing

**Problem:** Kubernetes/Docker health check failing

**Solution:**
```typescript
// Ensure health endpoint returns quickly
export async function GET() {
  return Response.json({ 
    status: 'ok',
    timestamp: Date.now(),
  });
}

// Check all dependencies
export async function GET() {
  const checks = {
    app: 'ok',
    database: await checkDatabase(),
    redis: await checkRedis(),
  };
  
  const allOk = Object.values(checks).every(v => v === 'ok');
  
  return Response.json({
    status: allOk ? 'healthy' : 'degraded',
    checks,
  }, { status: allOk ? 200 : 503 });
}
```

---

## Debug Tools

### Enable Debug Logging

```bash
# Enable all debug logs
DEBUG=* bun run dev

# Enable specific namespace
DEBUG=citarion:trading:* bun run dev

# In code
import debug from 'debug';
const log = debug('citarion:trading:orders');
log('Order placed:', order);
```

### Database Inspection

```bash
# Open Prisma Studio
bunx prisma studio

# Query database directly
sqlite3 dev.db ".tables"
sqlite3 dev.db "SELECT * FROM Position LIMIT 5;"
```

### Network Inspection

```bash
# Monitor HTTP traffic
tcpdump -i any port 3000 -A

# Check WebSocket frames
websocat ws://localhost:3002
```

---

## Getting Help

1. **Check Logs:** `tail -f dev.log`
2. **Search Issues:** GitHub Issues
3. **Documentation:** `/docs` folder
4. **Debug Mode:** `DEBUG=* bun run dev`

When reporting issues, include:
- Error message and stack trace
- Steps to reproduce
- Environment details (Node version, OS)
- Relevant logs
