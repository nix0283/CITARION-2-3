# Exchange Integration Enhancements

> **Status:** Production Ready  
> **Last Updated:** March 2025  
> **Source:** CryptoCopyTradeBot Analysis + CITARION Architecture

This document describes the enhanced exchange integration features added to CITARION based on best practices from CryptoCopyTradeBot and industry standards.

## Table of Contents

1. [Rate Limiting per Exchange](#1-rate-limiting-per-exchange)
2. [Leverage Validation](#2-leverage-validation)
3. [Position Info Extensions](#3-position-info-extensions)
4. [Network Indicator (UI)](#4-network-indicator-ui)
5. [Market Info Caching](#5-market-info-caching)
6. [Contract Size Handling](#6-contract-size-handling)

---

## 1. Rate Limiting per Exchange

### Overview

Enhanced rate limiting system with minimum intervals between requests, token bucket algorithm, and exchange-specific configurations.

### Location

- **Service:** `src/lib/exchange/enhanced-rate-limiter.ts`
- **Types:** `src/lib/exchange/types.ts`

### Features

- ✅ Minimum interval enforcement between requests
- ✅ Token bucket algorithm for burst handling
- ✅ Request queuing with priority levels
- ✅ Exchange-specific configurations
- ✅ Rate limit headers parsing
- ✅ Automatic backoff on errors

### Minimum Intervals (per Exchange)

| Exchange | Min Interval | Max Sustained RPS |
|----------|-------------|-------------------|
| Binance | 50ms | 20 req/s |
| Bybit | 100ms | 10 req/s |
| OKX | 50ms | 20 req/s |
| Bitget | 66ms | 15 req/s |
| BingX | 100ms | 10 req/s |

### Usage

```typescript
import { acquireRateLimit, checkRateLimit, rateLimiterManager } from '@/lib/exchange/enhanced-rate-limiter';

// Before making a request
await acquireRateLimit('binance', 1, false); // cost=1, isOrder=false

// Check if can proceed (non-blocking)
const status = checkRateLimit('binance');
if (status.canProceed) {
  // Make request
} else {
  console.log(`Wait ${status.waitMs}ms`);
}

// Get limiter for specific account
const limiter = rateLimiterManager.getLimiter('binance', 'account-123');
await limiter.acquire(1, true, 'HIGH'); // High priority order
```

### Integration with Exchange Clients

The enhanced rate limiter is automatically integrated into `BaseExchangeClient`. All exchange clients inherit this functionality.

---

## 2. Leverage Validation

### Overview

Automatic validation and adjustment of leverage based on symbol-specific maximum limits.

### Location

- **Service:** `src/lib/exchange/market-info-service.ts`
- **Types:** `src/lib/exchange/types.ts`

### Features

- ✅ Max leverage per symbol validation
- ✅ Automatic leverage adjustment
- ✅ Leverage brackets support
- ✅ Warning logging for adjustments

### Usage

```typescript
import { marketInfoService, validateLeverageForSymbol } from '@/lib/exchange/market-info-service';

// Get max leverage for symbol
const maxLev = await marketInfoService.getMaxLeverage('BTCUSDT', 'binance');
console.log(`Max leverage: ${maxLev}x`);

// Validate and adjust leverage
const result = await marketInfoService.validateLeverage(
  'BTCUSDT',
  'binance',
  150  // requested 150x
);

console.log(result);
// {
//   leverage: 125,    // adjusted to max
//   adjusted: true,   // was adjusted
//   maxAllowed: 125
// }

// Quick helper
const validLeverage = await validateLeverageForSymbol('BTCUSDT', 'binance', 50);
```

### Leverage Brackets

Some exchanges provide leverage brackets based on position size:

```typescript
const info = await marketInfoService.getMarketInfo('BTCUSDT', 'binance');

if (info?.leverageBrackets) {
  for (const bracket of info.leverageBrackets) {
    console.log(`Notional: $${bracket.minNotional} - $${bracket.maxNotional}`);
    console.log(`Max Leverage: ${bracket.maxLeverage}x`);
    console.log(`Maint Margin: ${bracket.maintenanceMarginRate * 100}%`);
  }
}
```

---

## 3. Position Info Extensions

### Overview

Extended position information including liquidation price, mark price, break-even price, and risk metrics.

### Location

- **Service:** `src/lib/exchange/position-info.ts`
- **UI Component:** `src/components/trading/network-indicator.tsx`

### Features

- ✅ Liquidation price calculation
- ✅ Break-even price (including fees)
- ✅ Mark price and index price
- ✅ Margin requirements
- ✅ Risk level assessment
- ✅ Distance to liquidation

### Data Structure

```typescript
interface ExtendedPositionInfo {
  // Basic Info
  id: string;
  exchange: AllExchangeId;
  symbol: string;
  side: PositionSide;
  
  // Prices
  entryPrice: number;
  markPrice: number;
  indexPrice?: number;
  liquidationPrice?: number;    // NEW
  breakEvenPrice?: number;      // NEW
  
  // Margin
  leverage: number;
  marginMode: MarginMode;
  initialMargin: number;        // NEW
  maintenanceMargin: number;    // NEW
  
  // PnL
  unrealizedPnl: number;
  pnlPercentage: number;
  
  // Risk Metrics
  marginRatio?: number;         // NEW
  liquidationDistance?: number; // NEW (% distance)
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; // NEW
  
  // Mode
  isDemo: boolean;
  tradingMode: 'LIVE' | 'DEMO';
}
```

### Usage

```typescript
import { 
  PositionRiskCalculator, 
  PositionInfoBuilder,
  formatPositionRisk 
} from '@/lib/exchange/position-info';

// Calculate position metrics
const metrics = PositionRiskCalculator.calculatePositionMetrics({
  entryPrice: 50000,
  markPrice: 52000,
  quantity: 0.1,
  leverage: 10,
  side: 'long',
  marginMode: 'isolated',
});

console.log(metrics);
// {
//   liquidationPrice: 45500,
//   breakEvenPrice: 50050,
//   unrealizedPnl: 200,
//   pnlPercentage: 4,
//   liquidationDistance: 12.5,
//   riskLevel: 'LOW'
// }

// Format for display
const display = formatPositionRisk(position);
console.log(display);
// { status: 'Low Risk', color: 'text-green-500', emoji: '🟢' }
```

---

## 4. Network Indicator (UI)

### Overview

Visual indicator showing trading mode (Demo/Live) with risk status.

### Location

- **Component:** `src/components/trading/network-indicator.tsx`

### Components

#### NetworkIndicator

```tsx
import { NetworkIndicator } from '@/components/trading/network-indicator';

// Basic usage
<NetworkIndicator 
  isDemo={false}
  exchangeId="binance"
/>

// With balance and margin
<NetworkIndicator 
  isDemo={false}
  exchangeId="binance"
  balance={10000}
  currency="USDT"
  marginUsage={45}
  isHealthy={true}
/>

// Compact mode
<NetworkIndicator 
  isDemo={true}
  compact
/>
```

#### TradingModeBanner

```tsx
import { TradingModeBanner } from '@/components/trading/network-indicator';

<TradingModeBanner 
  isDemo={true}
  exchangeId="binance"
  accountName="Test Account"
/>
// Output: 🏮 DEMO MODE — Trading with virtual funds (Test Account)
```

#### PositionRiskIndicator

```tsx
import { PositionRiskIndicator } from '@/components/trading/network-indicator';

<PositionRiskIndicator 
  riskLevel="HIGH"
  liquidationPrice={45000}
  currentPrice={48000}
/>
// Output: 🟠 High Risk | 6.25% to liquidation
```

#### PositionInfoDisplay

Complete position card with all metrics:

```tsx
import { PositionInfoDisplay } from '@/components/trading/network-indicator';

<PositionInfoDisplay 
  symbol="BTCUSDT"
  side="LONG"
  entryPrice={50000}
  markPrice={52000}
  quantity={0.1}
  leverage={10}
  unrealizedPnl={200}
  liquidationPrice={45500}
  riskLevel="LOW"
  isDemo={false}
/>
```

### Visual Examples

| Mode | Indicator | Description |
|------|-----------|-------------|
| LIVE | 🔵 LIVE | Blue badge with pulsing dot |
| DEMO | 🏮 DEMO | Amber badge with pulsing dot |

| Risk Level | Indicator | Description |
|------------|-----------|-------------|
| LOW | 🟢 Safe | Green indicator |
| MEDIUM | 🟡 Medium | Yellow indicator |
| HIGH | 🟠 High Risk | Orange indicator with warning |
| CRITICAL | 🔴 Critical | Red indicator with liquidation price |

---

## 5. Market Info Caching

### Overview

Cached market information with TTL-based expiration and automatic refresh.

### Location

- **Service:** `src/lib/exchange/market-info-service.ts`

### Features

- ✅ TTL-based caching (5 min default)
- ✅ Stale-while-revalidate pattern
- ✅ Exchange-specific TTL configurations
- ✅ Database persistence
- ✅ Fallback to defaults

### Cache Configuration

| Exchange | TTL | Stale TTL | Max Entries |
|----------|-----|-----------|-------------|
| Binance | 5 min | 1 hour | 2,000 |
| Bybit | 5 min | 1 hour | 2,000 |
| OKX | 5 min | 1 hour | 2,000 |
| Bitget | 5 min | 1 hour | 2,000 |
| BingX | 10 min | 2 hours | 500 |

### Usage

```typescript
import { marketInfoService } from '@/lib/exchange/market-info-service';

// Get market info
const info = await marketInfoService.getMarketInfo('BTCUSDT', 'binance');

console.log(info);
// {
//   symbol: 'BTCUSDT',
//   baseAsset: 'BTC',
//   quoteAsset: 'USDT',
//   pricePrecision: 2,
//   amountPrecision: 3,
//   minAmount: 0.001,
//   maxAmount: 10000,
//   minNotional: 5,
//   maxLeverage: 125,
//   contractSize: 0.001,
//   ...
// }

// Clear cache
marketInfoService.clearCache();

// Get cache stats
const stats = marketInfoService.getCacheStats();
console.log(`Cache entries: ${stats.entries}`);
```

---

## 6. Contract Size Handling

### Overview

Proper conversion between USDT amounts and contract quantities, accounting for contract multipliers.

### Location

- **Service:** `src/lib/exchange/market-info-service.ts`

### Contract Sizes

Some futures contracts have multipliers (not all are 1:1):

| Symbol | Contract Size | Description |
|--------|--------------|-------------|
| BTCUSDT (some) | 0.001 BTC | 1 contract = 0.001 BTC |
| ETHUSDT (some) | 0.01 ETH | 1 contract = 0.01 ETH |
| Most USDT-M | 1 | Linear 1:1 |

### Usage

```typescript
import { 
  marketInfoService, 
  usdtToContracts,
  getContractSize 
} from '@/lib/exchange/market-info-service';

// Get contract size
const size = getContractSize('BTCUSDT');
console.log(`1 contract = ${size} BTC`);

// Convert USDT to contracts
const info = await marketInfoService.getMarketInfo('BTCUSDT', 'binance');

const result = marketInfoService.convertUsdtToContracts(
  1000,      // 1000 USDT
  50000,     // BTC price
  10,        // 10x leverage
  info
);

console.log(result);
// {
//   contracts: 200,           // Raw contracts
//   formattedQuantity: 200,   // After precision adjustment
//   notionalValue: 10000,     // Position value
//   marginUsed: 1000          // Margin required
// }

// Quick helper
const quick = usdtToContracts(1000, 50000, 10, 'BTCUSDT');
console.log(quick);
// { contracts: 200, quantity: 200, margin: 1000 }
```

### Position Size Calculation Flow

```
1. Input: USDT Amount + Leverage
   ↓
2. Calculate Notional Value = USDT × Leverage
   ↓
3. Calculate Base Quantity = Notional ÷ Price
   ↓
4. Apply Contract Size = Quantity ÷ ContractSize
   ↓
5. Format to Precision
   ↓
6. Output: Contracts + Margin Used
```

---

## Integration Checklist

When adding support for a new exchange, ensure:

- [ ] Add minimum interval to `EXCHANGE_MIN_INTERVALS`
- [ ] Add cache config to `EXCHANGE_CACHE_CONFIG`
- [ ] Add leverage brackets support
- [ ] Add contract size mappings if needed
- [ ] Test rate limiting with exchange headers
- [ ] Verify position info calculations

---

## Related Documentation

- [Exchange Types](../src/lib/exchange/types.ts)
- [Base Exchange Client](../src/lib/exchange/base-client.ts)
- [Unified Trading Engine](./UNIFIED_TRADING_ENGINE.md)
- [Risk Management](../backend/RISK_MANAGEMENT_COMPLETE.md)

---

## Changelog

### v1.0.0 (March 2025)

- Initial implementation
- Rate limiting with min intervals
- Leverage validation
- Position info extensions
- Network indicator components
- Market info caching
- Contract size handling
