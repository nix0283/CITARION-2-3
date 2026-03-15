# Trading Modes and Themes Documentation

This document covers trading modes switching (DEMO, PAPER, TESTNET, LIVE) and theme management (Light/Dark/System) in the CITARION platform.

---

## Table of Contents

1. [Overview](#overview)
2. [Trading Modes](#trading-modes)
   - [DEMO Mode](#demo-mode)
   - [PAPER Mode](#paper-mode)
   - [TESTNET Mode](#testnet-mode)
   - [LIVE Mode](#live-mode)
   - [Mode Comparison](#mode-comparison)
3. [Mode Switching](#mode-switching)
   - [ModeSwitch Component](#modeswitch-component)
   - [Header Integration](#header-integration)
   - [Safety Measures](#safety-measures)
   - [Visual Indication](#visual-indication)
4. [Theme System](#theme-system)
   - [Light/Dark/System Modes](#lightdarksystem-modes)
   - [next-themes Integration](#next-themes-integration)
   - [CSS Variables](#css-variables)
5. [Top Toolbar](#top-toolbar)
   - [Bitcoin Ticker](#bitcoin-ticker)
   - [Exchange Selector](#exchange-selector)
6. [API Endpoints](#api-endpoints)
7. [Usage Examples](#usage-examples)
8. [Best Practices](#best-practices)

---

## Overview

CITARION provides a flexible trading environment with multiple trading modes and visual themes. The system allows seamless switching between simulation and real trading, with clear visual indicators to prevent accidental real-money trades.

### Architecture

```
src/
├── components/
│   └── layout/
│       └── header.tsx          # Mode switcher + theme toggle
├── stores/
│   └── crypto-store.ts         # Trading mode state
├── lib/
│   └── exchange/
│       └── types.ts            # TradingMode type definitions
└── app/
    └── api/
        └── trade/
            └── open/
                └── route.ts    # Mode-aware trade execution
```

---

## Trading Modes

### Trading Mode Types

```typescript
// From src/lib/exchange/types.ts
export type TradingMode = "LIVE" | "TESTNET" | "DEMO";

// Extended mode for UI (includes PAPER)
type ExtendedTradingMode = "PAPER" | "TESTNET" | "DEMO" | "LIVE";
```

---

### DEMO Mode

**Описание:** Демо-режим на живой бирже с виртуальным балансом.

| Параметр | Значение |
|----------|----------|
| **API Key** | Опционально (для exchange demo) |
| **Баланс** | Виртуальный (10,000 USDT по умолчанию) |
| **Цены** | Реальные рыночные |
| **Ордера** | Симуляция или exchange demo API |
| **Риск** | Нулевой |

#### Exchange Demo Support

| Биржа | Demo Поддержка | Demo Валюта | Особенности |
|-------|----------------|-------------|-------------|
| Binance | ❌ Нет | - | Только testnet |
| Bybit | ❌ Нет | - | Только testnet |
| OKX | ✅ Да | USDT | Header: `x-simulated-trading: 1` |
| Bitget | ✅ Да | SUSDT | Символы с префиксом "S" (SBTCUSDT) |
| BingX | ✅ Да | VST | Virtual Simulation Token |

#### Конфигурация Demo

```typescript
// Из src/lib/exchange/types.ts
export interface DemoConfig {
  supported: boolean;
  type: "simulation";
  symbolPrefix?: string;        // "S" для Bitget
  demoCurrency?: string;        // "VST" для BingX, "SUSDT" для Bitget
  initialBalance?: number;
  minBalanceForRecharge?: number;
  rechargeCooldownHours?: number;
  specialHeader?: { name: string; value: string };
  demoApiKeyRequired?: boolean;
}

// Пример: OKX Demo
const okxDemoConfig: DemoConfig = {
  supported: true,
  type: "simulation",
  demoCurrency: "USDT",
  initialBalance: 10000,
  specialHeader: { name: "x-simulated-trading", value: "1" },
  demoApiKeyRequired: true,
};

// Пример: Bitget Demo
const bitgetDemoConfig: DemoConfig = {
  supported: true,
  type: "simulation",
  symbolPrefix: "S",
  demoCurrency: "SUSDT",
  initialBalance: 50000,
  rechargeCooldownHours: 72,
};
```

#### Использование Demo символов

```typescript
import { toDemoSymbol, fromDemoSymbol, isDemoSymbol } from "@/lib/exchange";

// Конвертация символов для Bitget demo
const demoSymbol = toDemoSymbol("BTCUSDT", "bitget");
// Result: "SBTCUSDT"

const regularSymbol = fromDemoSymbol("SBTCUSDT", "bitget");
// Result: "BTCUSDT"

const isDemo = isDemoSymbol("SBTCUSDT", "bitget");
// Result: true
```

---

### PAPER Mode

**Описание:** Полностью виртуальная торговля без подключения к бирже.

| Параметр | Значение |
|----------|----------|
| **API Key** | Не требуется |
| **Баланс** | Виртуальный (10,000 USDT) |
| **Цены** | Реальные рыночные (через публичные API) |
| **Ордера** | Локальная симуляция |
| **Риск** | Нулевой |

#### Реализация PAPER

```typescript
// Из src/stores/crypto-store.ts
const INITIAL_VIRTUAL_BALANCE: VirtualBalance = {
  USDT: 10000,
  BTC: 0,
  ETH: 0,
  BNB: 0,
  SOL: 0,
};

// Virtual trading engine
async function handleVirtualDemoTrade(
  body: TradeRequest,
  account: { id: string; userId: string; virtualBalance: string | null },
  context: AuthContext,
  idempotencyKey: string
) {
  // Get current market price
  const marketPrice = await db.marketPrice.findUnique({
    where: { symbol: body.symbol },
  });
  
  const currentPrice = marketPrice?.price || body.price || 50000;
  
  // Calculate position
  const positionSize = body.amount * body.leverage;
  const margin = body.amount;
  const quantity = positionSize / currentPrice;
  const fee = positionSize * 0.0004; // 0.04% taker fee
  
  // Balance check
  const balanceData = account.virtualBalance 
    ? JSON.parse(account.virtualBalance) 
    : { USDT: 10000 };
    
  if (balanceData.USDT < margin + fee) {
    return { error: "Insufficient balance" };
  }
  
  // Deduct margin and fee
  balanceData.USDT -= margin + fee;
  
  // Create virtual position
  // ...
}
```

---

### TESTNET Mode

**Описание:** Торговля на тестовой сети биржи с отдельной регистрацией.

| Параметр | Значение |
|----------|----------|
| **API Key** | Обязательно (отдельно от mainnet) |
| **Баланс** | Тестовые токены с faucet |
| **Цены** | Реальные или близкие |
| **Ордера** | Реальные на testnet |
| **Риск** | Нулевой |

#### Exchange Testnet Support

| Биржа | Testnet | Faucet | Initial Balance | Регистрация |
|-------|---------|--------|-----------------|-------------|
| Binance | ✅ | ✅ | 15,000 USDT | Отдельная |
| Bybit | ✅ | ✅ | 50,000 USDT | Отдельная |
| OKX | ❌ | - | - | Demo mode |
| Bitget | ❌ | - | - | Demo mode |
| BingX | ❌ | - | - | Demo mode |
| KuCoin | ✅ | ✅ | 10,000 USDT | Отдельная |
| HyperLiquid | ✅ | ✅ | - | Wallet-based |
| BitMEX | ✅ | ✅ | XBT | Отдельная |

#### Testnet Configuration

```typescript
// Из src/lib/exchange/types.ts
export interface TestnetConfig {
  supported: boolean;
  separateRegistration: boolean;
  registrationUrl?: string;
  initialBalance?: number;
  balanceCurrency?: string;
  hasFaucet: boolean;
}

// Пример: Binance Testnet
const binanceTestnet: TestnetConfig = {
  supported: true,
  separateRegistration: true,
  registrationUrl: "https://testnet.binancefuture.com",
  initialBalance: 15000,
  balanceCurrency: "USDT",
  hasFaucet: true,
};
```

#### Testnet URLs

```typescript
// Из src/lib/exchange/types.ts
export const EXCHANGE_CONFIGS = {
  binance: {
    futuresTestnetUrl: "https://testnet.binancefuture.com",
    spotTestnetUrl: "https://testnet.binance.vision",
    wsTestnetUrl: "wss://stream.binancefuture.com",
  },
  bybit: {
    spotTestnetUrl: "https://api-testnet.bybit.com",
    futuresTestnetUrl: "https://api-testnet.bybit.com",
    wsTestnetUrl: "wss://stream-testnet.bybit.com",
  },
  // ...
};
```

---

### LIVE Mode

**Описание:** Реальная торговля с реальными средствами.

| Параметр | Значение |
|----------|----------|
| **API Key** | Обязательно |
| **Баланс** | Реальный |
| **Цены** | Реальные рыночные |
| **Ордера** | Реальные на бирже |
| **Риск** | Высокий |

#### Safety Features

```typescript
// Risk validation для LIVE mode
if (actualTradingMode === "LIVE") {
  const riskValidation = await validateTrade(
    userId,
    symbol,
    direction,
    amount,
    leverage,
    stopLoss,
    takeProfit,
    accountId
  );

  if (!riskValidation.allowed) {
    return NextResponse.json({
      error: riskValidation.reason,
      riskCheck: {
        allowed: false,
        reason: riskValidation.reason,
        currentExposure: riskValidation.currentExposure,
        maxExposure: riskValidation.maxExposure,
        dailyPnL: riskValidation.dailyPnL,
        maxDailyLoss: riskValidation.maxDailyLoss,
      },
    }, { status: 400 });
  }
}
```

---

### Mode Comparison

| Характеристика | PAPER | DEMO | TESTNET | LIVE |
|---------------|-------|------|---------|------|
| **API Key** | ❌ | ⚠️ Опционально | ✅ | ✅ |
| **Реальные деньги** | ❌ | ❌ | ❌ | ✅ |
| **Реальные цены** | ✅ | ✅ | ✅ | ✅ |
| **Реальные ордера** | ❌ | ⚠️ Симуляция | ✅ | ✅ |
| **Отдельная регистрация** | ❌ | ❌ | ✅ | ❌ |
| **Faucet** | N/A | N/A | ✅ | N/A |
| **Риск потери** | ❌ | ❌ | ❌ | ✅ |
| **Подходит для** | Обучение | Тестирование стратегий | Тестирование API | Реальная торговля |

---

## Mode Switching

### ModeSwitch Component

Компонент переключения режимов встроен в Header:

```typescript
// Из src/components/layout/header.tsx

// Mode configuration
const MODE_CONFIG: Record<ExtendedTradingMode, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: typeof TestTube;
  description: string;
  requiresApiKey: boolean;
}> = {
  PAPER: {
    label: "PAPER",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    icon: FlaskConical,
    description: "Симуляция с реальными ценами",
    requiresApiKey: false,
  },
  TESTNET: {
    label: "TESTNET",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    icon: TestTube,
    description: "Тестовая сеть биржи",
    requiresApiKey: true,
  },
  DEMO: {
    label: "DEMO",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    icon: Zap,
    description: "Демо режим на live бирже",
    requiresApiKey: true,
  },
  LIVE: {
    label: "LIVE",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    icon: AlertTriangle,
    description: "⚠️ Реальная торговля",
    requiresApiKey: true,
  },
};
```

### Header Integration

```typescript
// Desktop Mode Selector
<div className="hidden sm:flex items-center gap-2 rounded-lg border border-border px-2 py-1">
  <Label className="text-xs text-muted-foreground">Mode:</Label>
  <Select value={currentMode} onValueChange={handleModeChange}>
    <SelectTrigger className="h-7 w-[130px] border-0 bg-transparent text-xs font-medium">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {Object.entries(MODE_CONFIG).map(([mode, config]) => {
        const Icon = config.icon;
        return (
          <SelectItem key={mode} value={mode}>
            <div className="flex items-center gap-2">
              <Icon className={cn("h-3.5 w-3.5", config.color)} />
              <span className={config.color}>{config.label}</span>
            </div>
          </SelectItem>
        );
      })}
    </SelectContent>
  </Select>
</div>

// Mobile Mode Selector (in dropdown menu)
<div className="px-2 py-1.5">
  <Label className="text-xs text-muted-foreground">Trading Mode</Label>
  <div className="grid grid-cols-2 gap-1 mt-1">
    {Object.entries(MODE_CONFIG).map(([mode, config]) => {
      const Icon = config.icon;
      const isActive = currentMode === mode;
      return (
        <Button
          key={mode}
          variant={isActive ? "default" : "ghost"}
          size="sm"
          className={cn(
            "h-7 text-[10px] justify-start",
            isActive && config.bgColor,
            isActive && config.color
          )}
          onClick={() => handleModeChange(mode as ExtendedTradingMode)}
        >
          <Icon className="h-3 w-3 mr-1" />
          {config.label}
        </Button>
      );
    })}
  </div>
</div>
```

### Safety Measures

#### 1. Visual Warnings

```typescript
// LIVE mode indicator
const ModeIcon = modeConfig.icon;

<Badge
  variant="outline"
  className={cn(
    "text-[10px] md:text-xs font-medium",
    modeConfig.bgColor,
    modeConfig.color,
    modeConfig.borderColor
  )}
>
  <ModeIcon className="h-3 w-3 mr-1" />
  [{modeConfig.label}]
</Badge>
```

#### 2. Mode Change Handler

```typescript
const handleModeChange = (mode: ExtendedTradingMode) => {
  // Map to store's TradingMode type
  const storeMode: TradingMode = mode === "LIVE" ? "REAL" : "DEMO";
  setTradingMode(storeMode);
  
  // Update account type based on mode
  console.log(`[Header] Switching to ${mode} mode`);
};
```

#### 3. Reset Balance for Non-LIVE Modes

```typescript
const handleResetBalance = async () => {
  try {
    const response = await fetch("/api/account/reset-balance", {
      method: "POST",
    });
    if (response.ok) {
      resetDemoBalance();
    }
  } catch (error) {
    console.error("Failed to reset balance:", error);
  }
};

// Button only shown in non-LIVE modes
{currentMode !== "LIVE" && (
  <Button variant="outline" size="sm" onClick={handleResetBalance}>
    <RefreshCw className="mr-2 h-3.5 w-3.5" />
    Сбросить
  </Button>
)}
```

### Visual Indication

| Mode | Badge Color | Icon | Description |
|------|-------------|------|-------------|
| PAPER | Blue | FlaskConical | Симуляция |
| TESTNET | Yellow | TestTube | Тестовая сеть |
| DEMO | Purple | Zap | Демо режим |
| LIVE | Red | AlertTriangle | ⚠️ Реальная торговля |

---

## Theme System

### Light/Dark/System Modes

```typescript
// Из docs/ui/THEME_CUSTOMIZATION.md
type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}
```

### next-themes Integration

#### ThemeProvider Setup

```typescript
// src/components/theme-provider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    const applyTheme = (newTheme: 'light' | 'dark') => {
      root.classList.remove('light', 'dark');
      root.classList.add(newTheme);
      setResolvedTheme(newTheme);
    };

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      applyTheme(systemTheme);
      
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

#### Header Theme Toggle

```typescript
// Из src/components/layout/header.tsx
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function Header() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-8 w-8"
      suppressHydrationWarning
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

### CSS Variables

```css
/* src/styles/globals.css */

:root {
  /* Colors - Brand */
  --color-primary: 59 130 246;      /* blue-500 */
  --color-primary-foreground: 255 255 255;
  --color-secondary: 100 116 139;   /* slate-500 */
  --color-accent: 168 85 247;       /* purple-500 */
  
  /* Colors - Semantic */
  --color-success: 34 197 94;       /* green-500 */
  --color-warning: 234 179 8;       /* yellow-500 */
  --color-error: 239 68 68;         /* red-500 */
  
  /* Colors - Background */
  --background: 255 255 255;
  --foreground: 15 23 42;
  --card: 255 255 255;
  --muted: 241 245 249;
  --border: 226 232 240;
}

/* Dark mode overrides */
.dark {
  --background: 15 23 42;
  --foreground: 248 250 252;
  --card: 30 41 59;
  --muted: 51 65 85;
  --border: 51 65 85;
  
  --color-primary: 96 165 250;      /* blue-400 */
  --color-accent: 192 132 252;      /* purple-400 */
}
```

---

## Top Toolbar

### Bitcoin Ticker

```typescript
// Из src/components/layout/header.tsx
// Market prices from store
const { marketPrices } = useCryptoStore();

// BTC price display
const btcPrice = marketPrices["BTCUSDT"];
const btcChange = btcPrice?.change24h || 0;
const btcChangeColor = btcChange >= 0 ? "text-green-500" : "text-red-500";

// Render
<div className="flex items-center gap-2">
  <span className="font-mono text-sm">
    BTC: ${formatNumber(btcPrice?.price || 0, 2)}
  </span>
  <span className={cn("text-xs", btcChangeColor)}>
    {btcChange >= 0 ? "+" : ""}{btcChange.toFixed(2)}%
  </span>
</div>
```

### Exchange Selector

5 активных бирж в UI:

```typescript
// Из src/lib/exchange/types.ts
export type ExchangeId = 
  | "binance" 
  | "bybit" 
  | "okx" 
  | "bitget" 
  | "bingx";

// Конфигурация бирж
export const EXCHANGE_CONFIGS: Record<ExchangeId, ExchangeConfig> = {
  binance: {
    id: "binance",
    name: "Binance",
    hasTestnet: true,
    hasDemo: false,
    // ...
  },
  bybit: {
    id: "bybit",
    name: "Bybit",
    hasTestnet: true,
    hasDemo: false,
    // ...
  },
  okx: {
    id: "okx",
    name: "OKX",
    hasTestnet: false,
    hasDemo: true,
    // ...
  },
  bitget: {
    id: "bitget",
    name: "Bitget",
    hasTestnet: false,
    hasDemo: true,
    // ...
  },
  bingx: {
    id: "bingx",
    name: "BingX",
    hasTestnet: false,
    hasDemo: true,
    // ...
  },
};
```

#### Exchange Selector Component

```typescript
// Из src/components/trading/trading-form.tsx
const EXCHANGES = [
  { id: "binance", name: "Binance", hasTestnet: true, hasDemo: false },
  { id: "bybit", name: "Bybit", hasTestnet: true, hasDemo: false },
  { id: "okx", name: "OKX", hasTestnet: false, hasDemo: true },
  { id: "bitget", name: "Bitget", hasTestnet: false, hasDemo: true },
  { id: "kucoin", name: "KuCoin", hasTestnet: true, hasDemo: false },
  { id: "bingx", name: "BingX", hasTestnet: false, hasDemo: true },
  { id: "huobi", name: "HTX (Huobi)", hasTestnet: true, hasDemo: false },
  { id: "hyperliquid", name: "HyperLiquid", hasTestnet: true, hasDemo: false },
  { id: "bitmex", name: "BitMEX", hasTestnet: true, hasDemo: false },
  { id: "blofin", name: "BloFin", hasTestnet: false, hasDemo: true },
  { id: "coinbase", name: "Coinbase", hasTestnet: true, hasDemo: false },
  { id: "aster", name: "Aster DEX", hasTestnet: true, hasDemo: true },
];

<Select value={exchange} onValueChange={setExchange}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {EXCHANGES.map((ex) => (
      <SelectItem key={ex.id} value={ex.id}>
        <span className="flex items-center gap-2">
          {ex.name}
          {ex.hasDemo && (
            <Badge variant="outline" className="text-[10px] h-4 px-1">
              Demo
            </Badge>
          )}
          {ex.hasTestnet && (
            <Badge variant="outline" className="text-[10px] h-4 px-1">
              Testnet
            </Badge>
          )}
        </span>
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

---

## API Endpoints

### Open Trade

```typescript
POST /api/trade/open

// Request Body
interface TradeRequest {
  symbol: string;           // "BTCUSDT"
  direction: "LONG" | "SHORT";
  amount: number;           // Margin amount in USDT
  leverage: number;         // 1-125 (up to 1001 for Aster)
  stopLoss?: number | null;
  takeProfit?: number | null;
  isDemo: boolean;
  accountId?: string;
  exchangeId?: string;      // "binance" | "bybit" | ...
  orderType?: "market" | "limit";
  price?: number;           // For limit orders
  clientOrderId?: string;   // Idempotency key
  tradingMode?: TradingMode;
}

// Response
interface TradeResponse {
  success: boolean;
  trade: {
    id: string;
    symbol: string;
    direction: string;
    entryPrice: number;
    amount: number;
    leverage: number;
    status: string;
  };
  position: {
    id: string;
    symbol: string;
    direction: string;
    totalAmount: number;
    avgEntryPrice: number;
    leverage: number;
    liquidationPrice?: number;
  };
  tradingMode: TradingMode;
  isDemo: boolean;
  message: string;
}
```

### Get Positions

```typescript
GET /api/trade/open?demo=true&tradingMode=DEMO&accountId=xxx

// Response
interface PositionsResponse {
  success: boolean;
  positions: Position[];
  count: number;
  authType: "session" | "api_key";
}
```

### Reset Balance

```typescript
POST /api/account/reset-balance

// Response
{
  success: boolean;
  balance: {
    USDT: 10000,
    BTC: 0,
    ETH: 0,
    ...
  }
}
```

### Mode-Specific API Behavior

```typescript
// Из src/app/api/trade/open/route.ts
switch (actualTradingMode) {
  case "DEMO":
    const exchangeConfig = EXCHANGE_CONFIGS[account.exchangeId as ExchangeId];
    const hasCredentials = account.apiKey && account.apiSecret;
    
    if (!exchangeConfig?.hasDemo || !hasCredentials) {
      // Fallback to virtual demo trading
      return handleVirtualDemoTrade(body, account, context, idempotencyKey);
    }
    // Use exchange demo API
    return handleExchangeTrade(body, account, "DEMO", context, idempotencyKey);
  
  case "TESTNET":
    const testnetConfig = EXCHANGE_CONFIGS[account.exchangeId as ExchangeId];
    
    if (!testnetConfig?.hasTestnet) {
      return NextResponse.json(
        { error: `${account.exchangeId} does not support testnet` },
        { status: 400 }
      );
    }
    return handleExchangeTrade(body, account, "TESTNET", context, idempotencyKey);
  
  case "LIVE":
  default:
    if (!account.apiKey || !account.apiSecret) {
      return handleVirtualDemoTrade(body, account, context, idempotencyKey);
    }
    return handleExchangeTrade(body, account, "LIVE", context, idempotencyKey);
}
```

---

## Usage Examples

### Example 1: Switch Trading Mode

```typescript
import { useCryptoStore } from "@/stores/crypto-store";

function TradingModeSelector() {
  const { account, setTradingMode, resetDemoBalance } = useCryptoStore();
  
  const currentMode = account?.accountType === "REAL" ? "LIVE" : "DEMO";
  
  const handleModeChange = (mode: "REAL" | "DEMO") => {
    setTradingMode(mode);
    
    if (mode === "DEMO") {
      // Optionally reset demo balance
      resetDemoBalance();
    }
  };
  
  return (
    <Select value={currentMode} onValueChange={handleModeChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="DEMO">DEMO Mode</SelectItem>
        <SelectItem value="REAL">LIVE Mode</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

### Example 2: Open Trade with Mode

```typescript
import { useState } from "react";

function TradingForm() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [direction, setDirection] = useState<"LONG" | "SHORT">("LONG");
  const [amount, setAmount] = useState(100);
  const [leverage, setLeverage] = useState(10);
  const [tradingMode, setTradingMode] = useState<TradingMode>("DEMO");
  
  const handleTrade = async () => {
    const response = await fetch("/api/trade/open", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symbol,
        direction,
        amount,
        leverage,
        tradingMode,
        isDemo: tradingMode !== "LIVE",
      }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log(`Trade opened in ${data.tradingMode} mode`);
    }
  };
  
  return (
    <div>
      {/* Mode selector */}
      <Select value={tradingMode} onValueChange={setTradingMode}>
        <SelectItem value="DEMO">DEMO</SelectItem>
        <SelectItem value="TESTNET">TESTNET</SelectItem>
        <SelectItem value="LIVE">LIVE</SelectItem>
      </Select>
      
      {/* Trade form */}
      <Button onClick={handleTrade}>
        Open {direction} [{tradingMode}]
      </Button>
    </div>
  );
}
```

### Example 3: Theme Toggle

```typescript
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
      <button
        onClick={() => setTheme('light')}
        className={cn(
          "rounded-md p-2 transition-colors",
          theme === 'light' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
        )}
        aria-label="Light mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={cn(
          "rounded-md p-2 transition-colors",
          theme === 'dark' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
        )}
        aria-label="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={cn(
          "rounded-md p-2 transition-colors",
          theme === 'system' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
        )}
        aria-label="System theme"
      >
        <Monitor className="h-4 w-4" />
      </button>
    </div>
  );
}
```

### Example 4: Exchange Selection with Mode Support

```typescript
import { EXCHANGE_CONFIGS, ExchangeId } from "@/lib/exchange";

function ExchangeSelector() {
  const [selectedExchange, setSelectedExchange] = useState<ExchangeId>("binance");
  const [tradingMode, setTradingMode] = useState<TradingMode>("DEMO");
  
  const config = EXCHANGE_CONFIGS[selectedExchange];
  
  // Check if exchange supports selected mode
  const isModeSupported = 
    (tradingMode === "DEMO" && config.hasDemo) ||
    (tradingMode === "TESTNET" && config.hasTestnet) ||
    tradingMode === "LIVE";
  
  return (
    <div>
      <Select value={selectedExchange} onValueChange={setSelectedExchange}>
        {Object.entries(EXCHANGE_CONFIGS).map(([id, cfg]) => (
          <SelectItem key={id} value={id}>
            {cfg.name}
            {cfg.hasDemo && <Badge>Demo</Badge>}
            {cfg.hasTestnet && <Badge>Testnet</Badge>}
          </SelectItem>
        ))}
      </Select>
      
      {!isModeSupported && (
        <Alert variant="warning">
          {selectedExchange} does not support {tradingMode} mode.
          Please select a different exchange or mode.
        </Alert>
      )}
    </div>
  );
}
```

### Example 5: One-Click Trading with Mode

```typescript
import { OneClickTradingDialog, OneClickTradingConfig } from "@/components/chart/one-click-trading";

function ChartWithOneClickTrading() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tradeParams, setTradeParams] = useState<OneClickTradeParams | null>(null);
  const tradingMode = useCryptoStore((state) => state.account.accountType);
  
  const config: OneClickTradingConfig = {
    enabled: true,
    defaultQuantity: 0.001,
    defaultType: "MARKET",
    slippageTolerance: 0.5,
    showConfirmation: tradingMode === "LIVE", // Always confirm in LIVE mode
    quickSizes: [1, 5, 10, 25, 50, 100],
    defaultStopLossPercent: 2,
    defaultTakeProfitPercent: 4,
  };
  
  const handleConfirm = async (params: OneClickTradeParams) => {
    const response = await fetch("/api/trade/open", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symbol: params.symbol,
        direction: params.side === "BUY" ? "LONG" : "SHORT",
        amount: params.quantity * params.price,
        leverage: 1,
        tradingMode: tradingMode === "REAL" ? "LIVE" : "DEMO",
        stopLoss: params.stopLoss,
        takeProfit: params.takeProfit,
      }),
    });
    
    return response.json();
  };
  
  return (
    <OneClickTradingDialog
      open={dialogOpen}
      onOpenChange={setDialogOpen}
      params={tradeParams}
      onConfirm={handleConfirm}
      currentPrice={65000}
      balance={10000}
      config={config}
    />
  );
}
```

---

## Best Practices

### 1. Always Verify Mode Before Trading

```typescript
// ✅ Good
if (tradingMode === "LIVE") {
  // Show warning confirmation
  const confirmed = await showLiveTradingWarning();
  if (!confirmed) return;
}

// ❌ Bad - No mode check
await executeTrade(params);
```

### 2. Use Visual Indicators for LIVE Mode

```typescript
// ✅ Good - Clear visual indication
<Button className={cn(
  "w-full",
  tradingMode === "LIVE" && "bg-red-500 hover:bg-red-600 animate-pulse"
)}>
  {tradingMode === "LIVE" && <AlertTriangle className="mr-2" />}
  Open {direction}
</Button>
```

### 3. Reset Balance When Switching to Demo

```typescript
// ✅ Good
const handleModeSwitch = (newMode: TradingMode) => {
  if (newMode === "DEMO" && tradingMode === "LIVE") {
    // Reset virtual balance for clean start
    resetDemoBalance();
  }
  setTradingMode(newMode);
};
```

### 4. Check Exchange Compatibility

```typescript
// ✅ Good - Check mode support before switching
const canUseTestnet = EXCHANGE_CONFIGS[exchangeId]?.hasTestnet;
const canUseDemo = EXCHANGE_CONFIGS[exchangeId]?.hasDemo;

if (mode === "TESTNET" && !canUseTestnet) {
  toast.error(`${exchangeId} does not support testnet`);
  return;
}
```

### 5. Store Mode in Persistence

```typescript
// Zustand persist middleware already handles this
// From crypto-store.ts
persist(
  (set, get) => ({ /* store implementation */ }),
  {
    name: "crypto-store",
    partialize: (state) => ({
      account: state.account, // Includes accountType
      // ...
    }),
  }
)
```

### 6. Use Proper Idempotency for LIVE Trades

```typescript
// ✅ Good - Prevents duplicate LIVE trades
const clientOrderId = generateIdempotencyKey({
  userId,
  accountId,
  symbol,
  direction,
  amount,
  leverage,
  timestamp: Date.now(),
});

await fetch("/api/trade/open", {
  method: "POST",
  body: JSON.stringify({ ...params, clientOrderId }),
});
```

---

## Related Documentation

- [Trading System](./TRADING_SYSTEM.md) - Full trading system documentation
- [Theme Customization](../ui/THEME_CUSTOMIZATION.md) - Detailed theme configuration
- [UI Components Audit](../UI_COMPONENTS_AUDIT.md) - Component coverage
- [Exchange Configuration](../exchanges/README.md) - Exchange-specific settings

---

*Last updated: March 2026*
