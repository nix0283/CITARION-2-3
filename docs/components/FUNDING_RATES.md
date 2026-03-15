# 💰 Funding Rates — Документация компонентов

**Версия:** 2.0  
**Последнее обновление:** Март 2026  
**Статус:** ✅ Полная документация

---

## 📋 Содержание

1. [Обзор Funding Rates](#1-обзор-funding-rates)
2. [Что такое фандинг в фьючерсах](#2-что-такое-фандинг-в-фьючерсах)
3. [Компоненты](#3-компоненты)
4. [Расчёт фандинга](#4-расчёт-фандинга)
5. [API эндпоинты](#5-api-эндпоинты)
6. [WebSocket обновления](#6-websocket-обновления)
7. [Стратегии на основе фандинга](#7-стратегии-на-основе-фандинга)
8. [Примеры использования](#8-примеры-использования)

---

## 1. Обзор Funding Rates

### Назначение

Модуль Funding Rates обеспечивает мониторинг, расчёт и анализ ставок финансирования perpetual фьючерсов на криптовалютных биржах. Это критически важный компонент для:

- **Учёта затрат на удержание позиций** — фандинг напрямую влияет на PnL
- **Арбитражных стратегий** — различия ставок между биржами
- **Оценки рыночных настроений** — высокий фандинг = бычий настрой
- **Риск-менеджмента** — контроль затрат на длинные позиции

### Архитектура

```
┌─────────────────────────────────────────────────────────────────┐
│                    FUNDING RATES MODULE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐    ┌──────────────────┐                  │
│  │ Funding Rate     │    │ Funding Rates    │                  │
│  │ Widget           │    │ Table            │                  │
│  │ (Dashboard)      │    │ (Trading)        │                  │
│  └────────┬─────────┘    └────────┬─────────┘                  │
│           │                       │                             │
│           └───────────┬───────────┘                             │
│                       ▼                                         │
│           ┌───────────────────────┐                             │
│           │   FundingRateWebSocket │                             │
│           │   (Real-time Updates)  │                             │
│           └───────────┬───────────┘                             │
│                       │                                         │
│           ┌───────────▼───────────┐                             │
│           │   lib/funding.ts      │                             │
│           │   (Business Logic)    │                             │
│           └───────────┬───────────┘                             │
│                       │                                         │
│  ┌────────────────────┼────────────────────┐                    │
│  │                    │                    │                    │
│  ▼                    ▼                    ▼                    │
│ Binance            Bybit               OKX                      │
│ Bitget             KuCoin              BingX                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Поддерживаемые биржи

| Биржа | WebSocket | REST API | Интервал |
|-------|-----------|----------|----------|
| Binance | ✅ `wss://fstream.binance.com/ws` | ✅ `/fapi/v1/fundingRate` | 8 часов |
| Bybit | ✅ `wss://stream.bybit.com/v5/public/linear` | ✅ `/v5/market/funding/history` | 8 часов |
| OKX | ✅ `wss://ws.okx.com:8443/ws/v5/public` | ✅ `/api/v5/public/funding-rate-history` | 8 часов |
| Bitget | ✅ `wss://ws.bitget.com/v2/ws/public` | ✅ `/api/v2/mix/market/ticker` | 8 часов |
| KuCoin | ✅ `wss://ws-api.kucoin.com` | ✅ `/api/v1/funding-history` | 8 часов |
| BingX | ✅ `wss://open-api-swap.bingx.com/ws` | ✅ `/openApi/swap/v2/quote/fundingRate` | 8 часов |

---

## 2. Что такое фандинг в фьючерсах

### Определение

**Funding Rate (Ставка финансирования)** — это периодический платёж между трейдерами с длинными и короткими позициями на рынке perpetual фьючерсов. Механизм обеспечивает привязку цены фьючерса к спотовой цене базового актива.

### Механизм работы

```
┌─────────────────────────────────────────────────────────────────┐
│                    FUNDING RATE MECHANISM                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Время расчёта: 00:00, 08:00, 16:00 UTC (каждые 8 часов)       │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Положительный Funding Rate (rate > 0)                  │   │
│  │                                                         │   │
│  │  ┌──────────────┐    платит     ┌──────────────┐       │   │
│  │  │ LONG трейдеры│ ───────────▶ │ SHORT трейдеры│       │   │
│  │  └──────────────┘              └──────────────┘       │   │
│  │                                                         │   │
│  │  Причина: Цена фьючерса > спота (бычий рынок)          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Отрицательный Funding Rate (rate < 0)                  │   │
│  │                                                         │   │
│  │  ┌──────────────┐    платит     ┌──────────────┐       │   │
│  │  │ SHORT трейдеры│ ───────────▶ │ LONG трейдеры│       │   │
│  │  └──────────────┘              └──────────────┘       │   │
│  │                                                         │   │
│  │  Причина: Цена фьючерса < спота (медвежий рынок)       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Формула расчёта

На большинстве бирж используется формула:

```
Funding Rate = Premium Index + clamp(Interest Rate - Premium Index, -0.05%, 0.05%)

Где:
- Premium Index = (Mark Price - Index Price) / Index Price
- Interest Rate — фиксированная ставка (обычно 0.01% или 0.03%)
- Mark Price — цена маркировки фьючерса
- Index Price — индексная цена спота
```

### Типичные значения

| Funding Rate | Интерпретация | Годовая ставка |
|--------------|---------------|----------------|
| 0.0001 (0.01%) | Нейтральный рынок | ~10.95% |
| 0.0005 (0.05%) | Умеренно бычий | ~54.75% |
| 0.0010 (0.10%) | Бычий рынок | ~109.5% |
| 0.0020 (0.20%) | Очень бычий | ~219% |
| -0.0001 (-0.01%) | Нейтрально-медвежий | ~-10.95% |
| -0.0010 (-0.10%) | Медвежий рынок | ~-109.5% |

### Практическое значение

```typescript
// Пример расчёта затрат на позицию

// Позиция: LONG BTC/USDT на $100,000
// Funding Rate: 0.01% (положительный)

// Трейдер с LONG позицией ПЛАТИТ:
const fundingPerSettlement = 100000 * 0.0001; // $10
const fundingPerDay = fundingPerSettlement * 3; // $30 (3 расчёта в день)
const fundingPerMonth = fundingPerDay * 30; // $900

// При годовой ставке ~10.95% трейдер теряет ~$10,950 в год
```

---

## 3. Компоненты

### 3.1 Funding Rate Widget

**Файл:** `src/components/dashboard/funding-rate-widget.tsx`

Виджет для отображения текущих ставок финансирования на дашборде.

#### Props и интерфейсы

```typescript
interface FundingRate {
  symbol: string;        // Торговая пара (BTCUSDT)
  exchange: string;      // Биржа (binance, bybit)
  rate: number;          // Funding rate (decimal: 0.0001 = 0.01%)
  markPrice: number;     // Цена маркировки
  timestamp: string;     // Время последнего обновления
}

interface FundingPayment {
  symbol: string;        // Торговая пара
  direction: string;     // Направление (LONG/SHORT)
  payment: number;       // Сумма платежа (+ = receive, - = pay)
  fundingTime: string;   // Время расчёта
}
```

#### Структура компонента

```tsx
export function FundingRateWidget() {
  const [fundingRates, setFundingRates] = useState<FundingRate[]>([]);
  const [totalFunding, setTotalFunding] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Автообновление каждые 10 минут
  useEffect(() => {
    fetchFundingRates();
    const interval = setInterval(fetchFundingRates, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // ...
}
```

#### Визуальные индикаторы

```typescript
// Цветовая кодировка funding rate
const getFundingColor = (rate: number) => {
  if (rate > 0.001) return "text-green-500";   // Высокий positive = зелёный
  if (rate < -0.001) return "text-red-500";    // Высокий negative = красный
  return "text-muted-foreground";              // Нейтральный = серый
};

// Бейджи для статуса
const getFundingBadge = (rate: number) => {
  const ratePercent = rate * 100;
  if (ratePercent > 0.1) {
    return <Badge className="bg-green-500/10 text-green-500">High Long</Badge>;
  }
  if (ratePercent < -0.1) {
    return <Badge className="bg-red-500/10 text-red-500">High Short</Badge>;
  }
  return <Badge variant="outline">Normal</Badge>;
};
```

#### Форматирование

```typescript
// Форматирование ставки
const formatRate = (rate: number) => {
  const percent = rate * 100;
  return `${percent >= 0 ? "+" : ""}${percent.toFixed(4)}%`;
};

// Форматирование цены
const formatPrice = (price: number) => {
  if (price >= 1000) 
    return `$${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  return `$${price.toFixed(4)}`;
};
```

#### Предупреждения

```tsx
{/* Warning if high funding */}
{fundingRates.some(fr => Math.abs(fr.rate) > 0.001) && (
  <div className="flex items-start gap-2 p-2 rounded bg-yellow-500/10 text-yellow-600">
    <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
    <span className="text-xs">
      Высокий funding rate. Проверьте позиции.
    </span>
  </div>
)}
```

### 3.2 Funding Rates Table

Таблица для детального просмотра исторических ставок финансирования.

#### Интерфейс данных

```typescript
interface FundingRateHistory {
  symbol: string;        // Торговая пара
  exchange: string;      // Биржа
  fundingRate: number;   // Ставка (decimal)
  fundingTime: Date;     // Время расчёта
  markPrice?: number;    // Цена маркировки (опционально)
}

interface FundingPayment {
  positionId: string;     // ID позиции
  symbol: string;         // Торговая пара
  direction: "LONG" | "SHORT";
  quantity: number;       // Размер позиции
  fundingRate: number;    // Ставка
  fundingPayment: number; // Платёж (+ = receive, - = pay)
  timestamp: Date;        // Время
}
```

#### Столбцы таблицы

| Столбец | Описание | Формат |
|---------|----------|--------|
| Symbol | Торговая пара | BTCUSDT |
| Exchange | Биржа | Binance, Bybit |
| Rate | Текущая ставка | +0.0100% |
| Annualized | Годовая ставка | 109.5% |
| Next Funding | До следующего расчёта | 2ч 15м |
| Mark Price | Цена маркировки | $95,432.50 |
| Index Price | Индексная цена | $95,430.00 |
| Heat Level | Уровень нагрева | 🟢 Low / 🟡 Medium / 🔴 High |

---

## 4. Расчёт фандинга

### 4.1 Основные функции

**Файл:** `src/lib/funding.ts`

#### Расчёт платежа за фандинг

```typescript
/**
 * Calculate funding payment for a position
 * 
 * Funding is paid every 8 hours (typically at 00:00, 08:00, 16:00 UTC)
 * 
 * Formula:
 * Funding Payment = Position Size × Funding Rate
 * 
 * For LONG positions:
 *   - Positive funding rate: Pay funding
 *   - Negative funding rate: Receive funding
 * 
 * For SHORT positions:
 *   - Positive funding rate: Receive funding
 *   - Negative funding rate: Pay funding
 */
export function calculateFundingPayment(
  positionSize: number,      // In USDT
  fundingRate: number,       // Decimal: 0.0001 = 0.01%
  direction: "LONG" | "SHORT"
): number {
  // Base funding payment
  const basePayment = positionSize * fundingRate;
  
  // LONG pays when funding is positive, receives when negative
  // SHORT receives when funding is positive, pays when negative
  return direction === "LONG" ? -basePayment : basePayment;
}
```

#### Суммарный фандинг за период

```typescript
/**
 * Calculate total funding paid/received for a position over time
 */
export function calculateTotalFunding(
  positionSize: number,
  fundingRates: number[],   // Array of funding rates during position
  direction: "LONG" | "SHORT"
): { totalFunding: number; fundingCount: number } {
  let totalFunding = 0;
  
  for (const rate of fundingRates) {
    totalFunding += calculateFundingPayment(positionSize, rate, direction);
  }
  
  return {
    totalFunding,
    fundingCount: fundingRates.length,
  };
}
```

#### Проверка времени расчёта

```typescript
/**
 * Check if funding settlement should occur
 * Funding occurs every 8 hours: 00:00, 08:00, 16:00 UTC
 */
export function shouldSettleFunding(lastSettlement: Date, now: Date = new Date()): boolean {
  const hoursSinceLastSettlement = (now.getTime() - lastSettlement.getTime()) / (1000 * 60 * 60);
  return hoursSinceLastSettlement >= 8;
}

/**
 * Get next funding time
 */
export function getNextFundingTime(): Date {
  const now = new Date();
  const hours = now.getUTCHours();
  
  let nextHour: number;
  if (hours < 8) {
    nextHour = 8;
  } else if (hours < 16) {
    nextHour = 16;
  } else {
    nextHour = 24; // Next day 00:00 UTC
  }
  
  const next = new Date(now);
  next.setUTCHours(nextHour, 0, 0, 0);
  if (nextHour === 24) {
    next.setUTCDate(next.getUTCDate() + 1);
    next.setUTCHours(0, 0, 0, 0);
  }
  
  return next;
}
```

### 4.2 Расчёт PnL с учётом фандинга

```typescript
export interface PnLWithFunding {
  unrealizedPnL: number;      // Нереализованная прибыль
  realizedPnL: number;        // Реализованная прибыль
  totalFundingPaid: number;   // Всего уплачено фандинга
  totalFundingReceived: number; // Всего получено фандинга
  netFunding: number;         // Чистый фандинг
  totalFees: number;          // Всего комиссий
  netPnL: number;             // Чистая прибыль
}

export function calculatePnLWithFunding(params: {
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  direction: "LONG" | "SHORT";
  leverage: number;
  openFee: number;
  fundingPayments: number[];  // Array of funding payments (positive = received)
  closeFee?: number;
}): PnLWithFunding {
  const { entryPrice, currentPrice, quantity, direction, leverage, openFee, fundingPayments, closeFee = 0 } = params;
  
  // Calculate unrealized PnL
  const positionValue = quantity * entryPrice;
  let pricePnL: number;
  
  if (direction === "LONG") {
    pricePnL = (currentPrice - entryPrice) * quantity;
  } else {
    pricePnL = (entryPrice - currentPrice) * quantity;
  }
  
  // Calculate funding
  const totalFundingReceived = fundingPayments.filter(p => p > 0).reduce((a, b) => a + b, 0);
  const totalFundingPaid = Math.abs(fundingPayments.filter(p => p < 0).reduce((a, b) => a + b, 0));
  const netFunding = totalFundingReceived - totalFundingPaid;
  
  // Total fees
  const totalFees = openFee + closeFee;
  
  // Net PnL
  const netPnL = pricePnL + netFunding - totalFees;
  
  return {
    unrealizedPnL: pricePnL,
    realizedPnL: 0, // Will be set when position is closed
    totalFundingPaid,
    totalFundingReceived,
    netFunding,
    totalFees,
    netPnL,
  };
}
```

### 4.3 Анализ Heat Level

```typescript
export type HeatLevel = "low" | "medium" | "high" | "critical";

/**
 * Calculate heat level based on multiple risk indicators
 * 
 * Scoring system:
 * - Funding rate contribution (0-4 points)
 * - Open interest contribution (0-3 points)
 * - Volume ratio contribution (0-2 points)
 * - Price deviation contribution (0-2 points)
 * 
 * Total: 0-11 points
 * 
 * low: 0-2 points
 * medium: 3-5 points
 * high: 6-8 points
 * critical: 9-11 points
 */
export function calculateHeatLevel(data: {
  fundingRate: number;
  openInterestUsd?: number;
  markPrice?: number;
  indexPrice?: number;
  volume24h?: number;
}): { level: HeatLevel; score: number; breakdown: Record<string, number> } {
  let score = 0;
  const breakdown: Record<string, number> = {};

  // 1. Funding rate contribution (annualized)
  const annualizedRate = Math.abs(data.fundingRate) * 3 * 365;
  if (annualizedRate > 2.0) {
    score += 4;
    breakdown.fundingRate = 4;
  } else if (annualizedRate > 1.0) {
    score += 3;
    breakdown.fundingRate = 3;
  } else if (annualizedRate > 0.5) {
    score += 2;
    breakdown.fundingRate = 2;
  } else if (annualizedRate > 0.1) {
    score += 1;
    breakdown.fundingRate = 1;
  } else {
    breakdown.fundingRate = 0;
  }

  // 2. Open interest spike detection
  if (data.openInterestUsd) {
    if (data.openInterestUsd > 1e10) {
      score += 3;
      breakdown.openInterest = 3;
    } else if (data.openInterestUsd > 5e9) {
      score += 2;
      breakdown.openInterest = 2;
    } else if (data.openInterestUsd > 1e9) {
      score += 1;
      breakdown.openInterest = 1;
    } else {
      breakdown.openInterest = 0;
    }
  }

  // 3. Volume ratio (liquidity pressure)
  if (data.volume24h && data.openInterestUsd) {
    const volumeRatio = data.volume24h / data.openInterestUsd;
    if (volumeRatio > 0.5) {
      score += 2;
      breakdown.volumeRatio = 2;
    } else if (volumeRatio > 0.3) {
      score += 1;
      breakdown.volumeRatio = 1;
    } else {
      breakdown.volumeRatio = 0;
    }
  }

  // 4. Price deviation (mark vs index)
  if (data.markPrice && data.indexPrice && data.indexPrice > 0) {
    const deviation = Math.abs(data.markPrice - data.indexPrice) / data.indexPrice;
    if (deviation > 0.01) {
      score += 2;
      breakdown.priceDeviation = 2;
    } else if (deviation > 0.005) {
      score += 1;
      breakdown.priceDeviation = 1;
    } else {
      breakdown.priceDeviation = 0;
    }
  }

  // Determine heat level
  let level: HeatLevel;
  if (score >= 9) {
    level = "critical";
  } else if (score >= 6) {
    level = "high";
  } else if (score >= 3) {
    level = "medium";
  } else {
    level = "low";
  }

  return { level, score, breakdown };
}
```

### 4.4 ROI от фандинга

```typescript
/**
 * Calculate estimated ROI from funding over different time periods
 */
export function calculateFundingROI(
  fundingRate: number,
  days: number,
  fundingsPerDay: number = 3
): number {
  const totalFundings = fundingsPerDay * days;
  const roi = fundingRate * totalFundings * 100;
  return roi;
}

// Примеры:
// Funding rate 0.01% => Daily ROI: 0.03%, Weekly: 0.21%, Monthly: 0.9%
// Funding rate 0.05% => Daily ROI: 0.15%, Weekly: 1.05%, Monthly: 4.5%
// Funding rate 0.10% => Daily ROI: 0.30%, Weekly: 2.10%, Monthly: 9.0%
```

### 4.5 Комплексная аналитика

```typescript
export interface FundingAnalytics {
  symbol: string;
  exchange: string;
  currentRate: number;
  annualizedRate: number;
  nextFundingTime: Date;
  hoursUntilNextFunding: number;
  markPrice: number;
  indexPrice: number;
  openInterest?: number;
  openInterestUsd?: number;
  heatLevel: HeatLevel;
  heatScore: number;
  roiEstimate: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  recommendation: string;
}

export function calculateFundingAnalytics(data: {
  symbol: string;
  exchange: string;
  fundingRate: number;
  fundingTime: Date;
  markPrice: number;
  indexPrice: number;
  openInterestUsd?: number;
  volume24h?: number;
}): FundingAnalytics {
  // ... расчёт всех показателей

  // Generate recommendation
  let recommendation: string;
  if (heatLevel === "critical") {
    recommendation = data.fundingRate > 0
      ? "⚠️ EXTREME: Consider reducing LONG positions. Funding costs are very high."
      : "⚠️ EXTREME: Consider reducing SHORT positions. Funding costs are very high.";
  } else if (heatLevel === "high") {
    recommendation = data.fundingRate > 0
      ? "🔴 HIGH: LONG positions paying premium. Consider taking profits."
      : "🔴 HIGH: SHORT positions paying premium. Consider taking profits.";
  } else if (heatLevel === "medium") {
    recommendation = data.fundingRate > 0
      ? "🟡 MODERATE: Funding is slightly elevated. Monitor positions."
      : "🟡 MODERATE: Funding is slightly negative. Monitor positions.";
  } else {
    recommendation = "🟢 NORMAL: Funding rates are within normal range.";
  }

  return { /* ... */ recommendation };
}
```

---

## 5. API эндпоинты

### 5.1 REST API

#### Получение текущих ставок

```http
GET /api/funding?rates=true
```

**Ответ:**
```json
{
  "success": true,
  "rates": [
    {
      "symbol": "BTCUSDT",
      "exchange": "binance",
      "rate": 0.0001,
      "markPrice": 95432.50,
      "timestamp": "2026-03-13T10:00:00Z"
    }
  ],
  "totalFunding": 15.50
}
```

#### История ставок

```http
GET /api/funding/history?symbol=BTCUSDT&exchange=binance&limit=100
```

**Ответ:**
```json
{
  "success": true,
  "history": [
    {
      "symbol": "BTCUSDT",
      "exchange": "binance",
      "fundingRate": 0.0001,
      "fundingTime": "2026-03-13T00:00:00Z",
      "markPrice": 95400.00
    }
  ]
}
```

#### Аналитика по символу

```http
GET /api/funding/analytics?symbol=BTCUSDT&exchange=binance
```

**Ответ:**
```json
{
  "success": true,
  "analytics": {
    "symbol": "BTCUSDT",
    "exchange": "binance",
    "currentRate": 0.0001,
    "annualizedRate": 10.95,
    "nextFundingTime": "2026-03-13T16:00:00Z",
    "hoursUntilNextFunding": 2.5,
    "heatLevel": "low",
    "heatScore": 1,
    "roiEstimate": {
      "daily": 0.03,
      "weekly": 0.21,
      "monthly": 0.9
    },
    "recommendation": "🟢 NORMAL: Funding rates are within normal range."
  }
}
```

### 5.2 Интеграция с биржами

```typescript
// Binance
GET https://fapi.binance.com/fapi/v1/fundingRate?symbol=BTCUSDT&limit=100

// Bybit
GET https://api.bybit.com/v5/market/funding/history?category=linear&symbol=BTCUSDT&limit=100

// OKX
GET https://www.okx.com/api/v5/public/funding-rate-history?instId=BTC-USDT-SWAP&limit=100

// Bitget
GET https://api.bitget.com/api/v2/mix/market/ticker?productType=USDT-FUTURES&symbol=BTCUSDT

// KuCoin
GET https://api-futures.kucoin.com/api/v1/funding-history?symbol=BTCUSDT&maxCount=100

// BingX
GET https://open-api.bingx.com/openApi/swap/v2/quote/fundingRate?symbol=BTC-USDT
```

---

## 6. WebSocket обновления

### 6.1 Класс FundingRateWebSocket

```typescript
class FundingRateWebSocket {
  private sockets: Map<string, WebSocket> = new Map();
  private subscribers: Set<FundingCallback> = new Set();
  private fundingRates: Map<string, FundingRate> = new Map();
  private symbols: string[] = [];
  
  constructor(symbols: string[] = ["BTCUSDT", "ETHUSDT", "SOLUSDT"]) {
    this.symbols = symbols;
  }
  
  connect(exchange: ExchangeType = "binance"): void {
    const config = EXCHANGE_FUNDING_CONFIGS[exchange];
    const key = `${exchange}-funding`;
    
    const ws = new WebSocket(config.wsUrl);
    
    ws.onopen = () => {
      console.log(`[Funding] ${config.name} WebSocket connected`);
      
      // Subscribe to symbols
      this.symbols.forEach(symbol => {
        const formattedSymbol = config.formatSymbol(symbol);
        ws.send(config.wsSubscribe(formattedSymbol));
      });
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // Handle ping/pong
      if (data.ping || data.op === "ping") {
        ws.send(JSON.stringify({ pong: data.ping || Date.now() }));
        return;
      }
      
      const fundingRate = config.parseWsMessage(data);
      if (fundingRate) {
        this.updateFundingRate(fundingRate);
      }
    };
    
    // Auto-reconnect
    ws.onclose = () => {
      setTimeout(() => this.connect(exchange), 5000);
    };
    
    this.sockets.set(key, ws);
  }
  
  subscribe(callback: FundingCallback): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }
  
  getFundingRate(symbol: string, exchange: string = "binance"): FundingRate | undefined {
    return this.fundingRates.get(`${exchange}-${symbol}`);
  }
  
  getAllFundingRates(): FundingRate[] {
    return Array.from(this.fundingRates.values());
  }
}

// Singleton instance
export function getFundingRateWebSocket(symbols?: string[]): FundingRateWebSocket {
  // ...
}
```

### 6.2 Конфигурация бирж

```typescript
const EXCHANGE_FUNDING_CONFIGS = {
  binance: {
    name: "Binance",
    wsUrl: "wss://fstream.binance.com/ws",
    fundingInterval: 8,
    formatSymbol: (symbol: string) => symbol.toLowerCase(),
    wsSubscribe: (symbol: string) => JSON.stringify({
      method: "SUBSCRIBE",
      params: [`${symbol.toLowerCase()}@markPrice`],
      id: Date.now()
    }),
    parseWsMessage: (data: unknown): FundingRate | null => {
      const msg = data as { e?: string; s?: string; r?: string; T?: number; p?: string; i?: string };
      if (msg.e !== "markPriceUpdate" || !msg.s) return null;
      return {
        symbol: msg.s,
        exchange: "binance",
        fundingRate: parseFloat(msg.r || "0"),
        fundingTime: new Date(msg.T || Date.now()),
        markPrice: parseFloat(msg.p || "0"),
        indexPrice: parseFloat(msg.i || "0"),
        timestamp: new Date(),
      };
    },
  },
  
  bybit: {
    name: "Bybit",
    wsUrl: "wss://stream.bybit.com/v5/public/linear",
    wsSubscribe: (symbol: string) => JSON.stringify({
      op: "subscribe",
      args: [`tickers.${symbol}`]
    }),
    parseWsMessage: (data: unknown): FundingRate | null => {
      // ... парсинг для Bybit
    },
  },
  
  okx: {
    name: "OKX",
    wsUrl: "wss://ws.okx.com:8443/ws/v5/public",
    wsSubscribe: (symbol: string) => JSON.stringify({
      op: "subscribe",
      args: [{ channel: "funding-rate", instId: symbol.replace("USDT", "-USDT-SWAP") }]
    }),
    parseWsMessage: (data: unknown): FundingRate | null => {
      // ... парсинг для OKX
    },
  },
  
  // ... другие биржи
};
```

### 6.3 Подписка на обновления

```typescript
// Использование в компоненте
useEffect(() => {
  const ws = getFundingRateWebSocket(["BTCUSDT", "ETHUSDT"]);
  ws.connect("binance");
  
  const unsubscribe = ws.subscribe((fundingRate) => {
    console.log(`Funding update: ${fundingRate.symbol} = ${fundingRate.fundingRate}`);
    // Обновить состояние компонента
  });
  
  return () => {
    unsubscribe();
  };
}, []);
```

---

## 7. Стратегии на основе фандинга

### 7.1 Фандинг-арбитраж

Стратегия извлечения прибыли из разницы ставок между биржами.

```typescript
interface ArbitrageOpportunity {
  symbol: string;
  longExchange: string;      // Биржа с низким/отрицательным rate
  shortExchange: string;     // Биржа с высоким rate
  longRate: number;
  shortRate: number;
  spread: number;            // Разница ставок
  estimatedProfit: number;   // Ожидаемая прибыль за период
}

function findFundingArbitrage(
  rates: Map<string, FundingRate>
): ArbitrageOpportunity[] {
  const opportunities: ArbitrageOpportunity[] = [];
  
  // Группируем по символам
  const bySymbol = new Map<string, FundingRate[]>();
  rates.forEach((rate, key) => {
    const symbol = rate.symbol;
    if (!bySymbol.has(symbol)) bySymbol.set(symbol, []);
    bySymbol.get(symbol)!.push(rate);
  });
  
  // Ищем арбитражные возможности
  bySymbol.forEach((symbolRates, symbol) => {
    if (symbolRates.length < 2) return;
    
    // Сортируем по ставке
    const sorted = symbolRates.sort((a, b) => a.fundingRate - b.fundingRate);
    
    const lowest = sorted[0];
    const highest = sorted[sorted.length - 1];
    
    const spread = highest.fundingRate - lowest.fundingRate;
    
    // Минимальный спред для арбитража: 0.05%
    if (spread > 0.0005) {
      opportunities.push({
        symbol,
        longExchange: lowest.exchange,
        shortExchange: highest.exchange,
        longRate: lowest.fundingRate,
        shortRate: highest.fundingRate,
        spread,
        estimatedProfit: spread * 3 * 30 * 100, // Месячная прибыль в %
      });
    }
  });
  
  return opportunities.sort((a, b) => b.spread - a.spread);
}
```

### 7.2 Delta-нейтральная стратегия

Получение фандинга при хеджировании ценового риска.

```typescript
interface DeltaNeutralPosition {
  spotPosition: {
    symbol: string;
    quantity: number;
    entryPrice: number;
  };
  futuresPosition: {
    symbol: string;
    quantity: number;
    direction: "SHORT";
    entryPrice: number;
    fundingRate: number;
  };
  netDelta: number;
  fundingYield: number;
}

function calculateDeltaNeutralYield(params: {
  spotPrice: number;
  futuresPrice: number;
  fundingRate: number;
  positionSize: number;
}): DeltaNeutralPosition {
  const { spotPrice, futuresPrice, fundingRate, positionSize } = params;
  
  // Покупка спота + шорт фьючерса
  const spotQuantity = positionSize / spotPrice;
  const futuresQuantity = positionSize / futuresPrice;
  
  // Дельта близка к нулю (цена спота ≈ цене фьючерса)
  const netDelta = spotQuantity - futuresQuantity;
  
  // Доходность от фандинга (3 раза в день)
  const dailyYield = fundingRate * 3 * 100;
  const monthlyYield = dailyYield * 30;
  
  return {
    spotPosition: { symbol: "BTC", quantity: spotQuantity, entryPrice: spotPrice },
    futuresPosition: { symbol: "BTC", quantity: futuresQuantity, direction: "SHORT", entryPrice: futuresPrice, fundingRate },
    netDelta,
    fundingYield: monthlyYield,
  };
}
```

### 7.3 Контртренд на экстремумах

Открытие позиций против толпы при экстремальных значениях.

```typescript
interface ContrarianSignal {
  symbol: string;
  currentRate: number;
  percentileRank: number;    // Процентиль относительно истории
  recommendation: "LONG" | "SHORT" | "HOLD";
  confidence: number;
}

function analyzeContrarianOpportunity(
  currentRate: number,
  historicalRates: number[]
): ContrarianSignal {
  // Сортируем исторические данные
  const sorted = [...historicalRates].sort((a, b) => a - b);
  
  // Находим процентиль текущей ставки
  const rank = sorted.filter(r => r <= currentRate).length / sorted.length;
  
  // Логика контртренда
  let recommendation: "LONG" | "SHORT" | "HOLD";
  let confidence: number;
  
  if (rank > 0.95) {
    // Ставка в топ-5% — очень бычий настрой — контртренд SHORT
    recommendation = "SHORT";
    confidence = 0.8;
  } else if (rank > 0.85) {
    recommendation = "SHORT";
    confidence = 0.6;
  } else if (rank < 0.05) {
    // Ставка в низ-5% — очень медвежий — контртренд LONG
    recommendation = "LONG";
    confidence = 0.8;
  } else if (rank < 0.15) {
    recommendation = "LONG";
    confidence = 0.6;
  } else {
    recommendation = "HOLD";
    confidence = 0;
  }
  
  return {
    symbol: "BTCUSDT",
    currentRate,
    percentileRank: rank,
    recommendation,
    confidence,
  };
}
```

### 7.4 Мониторинг Heat Map

```typescript
function generateFundingHeatmap(
  rates: Array<{ symbol: string; rate: number; exchange: string }>
): Map<string, { level: HeatLevel; color: string }> {
  const heatmap = new Map<string, { level: HeatLevel; color: string }>();

  for (const item of rates) {
    const { level } = calculateHeatLevel({
      fundingRate: item.rate,
    });

    const colors: Record<HeatLevel, string> = {
      low: "#22c55e",      // Green
      medium: "#eab308",   // Yellow
      high: "#f97316",     // Orange
      critical: "#ef4444", // Red
    };

    heatmap.set(`${item.exchange}-${item.symbol}`, {
      level,
      color: colors[level],
    });
  }

  return heatmap;
}
```

---

## 8. Примеры использования

### 8.1 Базовое использование виджета

```tsx
import { FundingRateWidget } from "@/components/dashboard/funding-rate-widget";

export function DashboardPage() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Другие виджеты */}
      <FundingRateWidget />
    </div>
  );
}
```

### 8.2 Подключение к WebSocket

```tsx
"use client";

import { useEffect, useState } from "react";
import { getFundingRateWebSocket, FundingRate } from "@/lib/funding";

export function FundingMonitor() {
  const [rates, setRates] = useState<FundingRate[]>([]);

  useEffect(() => {
    const ws = getFundingRateWebSocket(["BTCUSDT", "ETHUSDT", "SOLUSDT"]);
    ws.connect("binance");
    ws.connect("bybit");

    const unsubscribe = ws.subscribe((rate) => {
      setRates((prev) => {
        const updated = prev.filter((r) => 
          !(r.symbol === rate.symbol && r.exchange === rate.exchange)
        );
        return [...updated, rate];
      });
    });

    return () => {
      unsubscribe();
      ws.disconnect();
    };
  }, []);

  return (
    <div>
      {rates.map((rate) => (
        <div key={`${rate.exchange}-${rate.symbol}`}>
          {rate.symbol}: {(rate.fundingRate * 100).toFixed(4)}%
        </div>
      ))}
    </div>
  );
}
```

### 8.3 Расчёт PnL с учётом фандинга

```typescript
import { 
  calculatePnLWithFunding, 
  calculateFundingPayment 
} from "@/lib/funding";

// Пример позиции
const position = {
  entryPrice: 95000,
  currentPrice: 96000,
  quantity: 0.5,        // 0.5 BTC
  direction: "LONG" as const,
  leverage: 10,
  openFee: 5,           // $5 комиссия за открытие
};

// История фандинга за время позиции (3 расчёта)
const fundingRates = [0.0001, 0.00015, 0.00012];
const fundingPayments = fundingRates.map(rate => 
  calculateFundingPayment(position.entryPrice * position.quantity, rate, position.direction)
);
// [-4.75, -7.125, -5.7] — LONG платит при положительном rate

const pnl = calculatePnLWithFunding({
  ...position,
  openFee: position.openFee,
  fundingPayments,
});

console.log(pnl);
// {
//   unrealizedPnL: 500,        // (96000 - 95000) * 0.5
//   realizedPnL: 0,
//   totalFundingPaid: 17.575,  // Сумма платежей
//   totalFundingReceived: 0,
//   netFunding: -17.575,
//   totalFees: 5,
//   netPnL: 477.425            // 500 - 17.575 - 5
// }
```

### 8.4 Аналитика и рекомендации

```typescript
import { 
  calculateFundingAnalytics, 
  calculateHeatLevel 
} from "@/lib/funding";

// Получаем данные с биржи
const fundingData = {
  symbol: "BTCUSDT",
  exchange: "binance",
  fundingRate: 0.0005,  // 0.05%
  fundingTime: new Date("2026-03-13T16:00:00Z"),
  markPrice: 95500,
  indexPrice: 95480,
  openInterestUsd: 15000000000,  // $15B
  volume24h: 30000000000,        // $30B
};

const analytics = calculateFundingAnalytics(fundingData);

console.log(analytics);
// {
//   symbol: "BTCUSDT",
//   exchange: "binance",
//   currentRate: 0.0005,
//   annualizedRate: 54.75,        // 54.75% годовых
//   nextFundingTime: Date,
//   hoursUntilNextFunding: 2.5,
//   heatLevel: "medium",
//   heatScore: 3,
//   roiEstimate: {
//     daily: 0.15,
//     weekly: 1.05,
//     monthly: 4.5
//   },
//   recommendation: "🟡 MODERATE: Funding is slightly elevated. Monitor positions."
// }
```

### 8.5 Поиск арбитражных возможностей

```typescript
import { 
  getFundingRateWebSocket, 
  fetchFundingRateHistory 
} from "@/lib/funding";

async function findArbitrageOpportunities() {
  const ws = getFundingRateWebSocket(["BTCUSDT", "ETHUSDT"]);
  
  // Подключаемся к нескольким биржам
  ws.connect("binance");
  ws.connect("bybit");
  ws.connect("okx");
  
  // Ждем данных
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  const allRates = ws.getAllFundingRates();
  
  // Группируем по символам
  const bySymbol = new Map<string, typeof allRates>();
  allRates.forEach(rate => {
    if (!bySymbol.has(rate.symbol)) bySymbol.set(rate.symbol, []);
    bySymbol.get(rate.symbol)!.push(rate);
  });
  
  // Ищем арбитраж
  const opportunities = [];
  bySymbol.forEach((rates, symbol) => {
    if (rates.length < 2) return;
    
    const sorted = rates.sort((a, b) => a.fundingRate - b.fundingRate);
    const spread = sorted[sorted.length - 1].fundingRate - sorted[0].fundingRate;
    
    if (spread > 0.0003) {  // Минимум 0.03% разница
      opportunities.push({
        symbol,
        buyExchange: sorted[0].exchange,      // Низкий rate = LONG
        sellExchange: sorted[sorted.length - 1].exchange, // Высокий rate = SHORT
        spread,
        monthlyProfit: spread * 3 * 30 * 100, // % в месяц
      });
    }
  });
  
  return opportunities.sort((a, b) => b.monthlyProfit - a.monthlyProfit);
}
```

### 8.6 Сохранение в базу данных

```typescript
// В классе FundingRateWebSocket
private async storeFundingRate(data: FundingRate): Promise<void> {
  try {
    await db.fundingRateHistory.create({
      data: {
        symbol: data.symbol,
        exchange: data.exchange,
        fundingRate: data.fundingRate,
        fundingTime: data.fundingTime,
        markPrice: data.markPrice,
        indexPrice: data.indexPrice,
      }
    });
  } catch (error) {
    // Ignore duplicate errors
  }
}
```

---

## 📊 Статистика и метрики

### Доступные метрики

| Метрика | Описание | Единица |
|---------|----------|---------|
| `currentRate` | Текущая ставка | Decimal (0.0001) |
| `annualizedRate` | Годовая ставка | Percent |
| `heatLevel` | Уровень нагрева | low/medium/high/critical |
| `heatScore` | Числовой score | 0-11 |
| `dailyROI` | Дневная доходность | Percent |
| `weeklyROI` | Недельная доходность | Percent |
| `monthlyROI` | Месячная доходность | Percent |
| `hoursUntilNextFunding` | До следующего расчёта | Hours |

### Формулы

```
Annualized Rate = Funding Rate × 3 (fundings/day) × 365 (days)

Daily ROI = Funding Rate × 3 × 100

Weekly ROI = Funding Rate × 21 × 100

Monthly ROI = Funding Rate × 90 × 100
```

---

## 🔗 Связанные документы

- [Risk Management](../risk/RISK_MODELS_DOCUMENTATION.md)
- [Positions Management](./POSITIONS_MANAGEMENT.md)
- [Trading Modes](./TRADING_MODES.md)
- [Exchange Integration](../exchanges/README.md)

---

*Документация обновлена: Март 2026*
