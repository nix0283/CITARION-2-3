# 💼 Портфель: Управление и Аналитика

**Версия документа:** 3.0  
**Последнее обновление:** Март 2026  
**Статус:** ✅ Полная документация с production API

---

## 📑 Содержание

1. [Обзор управления портфелем](#1-обзор-управления-портфелем)
2. [Production Portfolio API](#2-production-portfolio-api)
3. [Компоненты](#3-компоненты)
4. [Расчёт PnL](#4-расчёт-pnl)
5. [Метрики портфеля](#5-метрики-портфеля)
6. [API эндпоинты](#6-api-эндпоинты)
7. [Примеры использования](#7-примеры-использования)
8. [TODO: Расширение функциональности](#8-todo-расширение-функциональности)

---

## 1. Обзор управления портфелем

### 1.1 Архитектура

Система управления портфелем CITARION обеспечивает комплексный мониторинг и анализ торгового капитала:

```
┌─────────────────────────────────────────────────────────────────┐
│                    ПОРТФЕЛЬ (Portfolio)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │  Balance    │  │  Asset      │  │      PnL Analytics      │ │
│  │  Overview   │  │  Allocation │  ├─────────────────────────┤ │
│  │             │  │             │  │ • Equity Curve          │ │
│  │ • USDT/BTC  │  │ • Распредел.│  │ • Daily PnL             │ │
│  │ • Unrealized│  │ • Диверсиф. │  │ • Period Comparison     │ │
│  │ • Realized  │  │             │  │ • Distribution          │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────┐  ┌─────────────────────────────┐  │
│  │     PnL Dashboard       │  │     Portfolio Risk          │  │
│  ├─────────────────────────┤  ├─────────────────────────────┤  │
│  │ • Net PnL               │  │ • VaR                       │  │
│  │ • Win Rate              │  │ • Max Drawdown              │  │
│  │ • Funding PnL           │  │ • Sharpe Ratio              │  │
│  │ • Equity Curve          │  │ • Risk Metrics              │  │
│  └─────────────────────────┘  └─────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Компоненты системы

| Компонент | Файл | Назначение |
|-----------|------|------------|
| Balance Overview | `dashboard/balance-widget.tsx` | Отображение баланса и активов |
| PnL Analytics | `analytics/pnl-analytics.tsx` | Детальная аналитика PnL |
| PnL Dashboard | `analytics/pnl-dashboard.tsx` | Дашборд доходности |
| Asset Allocation | Интегрирован в Balance | Распределение активов |
| Portfolio Risk | `risk-management/*` | Риск-метрики |

### 1.3 Режимы работы

| Режим | Описание | Цвет индикатора |
|-------|----------|-----------------|
| **DEMO** | Виртуальный счёт для тестирования | 🟡 Amber |
| **REAL** | Реальный торговый счёт | 🟢 Green |
| **PAPER** | Бумажная торговля | 🔵 Blue |
| **TESTNET** | Тестовая сеть биржи | 🟣 Purple |

---

## 2. Production Portfolio API

### 2.1 Обзор

Production-ready API для получения балансов со всех подключённых бирж в реальном времени.

**Файл:** `src/app/api/portfolio/balances/route.ts`

**Hook:** `src/hooks/use-portfolio-balances.ts`

**UI компонент:** `src/components/portfolio/portfolio-view-real.tsx`

### 2.2 Поддерживаемые биржи

| Биржа | Spot | Futures | TESTNET | DEMO | Статус |
|-------|------|---------|---------|------|--------|
| **Binance** | ✅ | ✅ | ✅ | ❌ | Активен |
| **Bybit** | ✅ | ✅ | ✅ | ❌ | Активен |
| **OKX** | ✅ | ✅ | ❌ | ✅ | Активен |
| **Bitget** | ✅ | ✅ | ❌ | ✅ | Активен |
| **BingX** | ✅ | ✅ | ❌ | ✅ | Активен |

### 2.3 Типы данных

```typescript
// Баланс биржи
interface ExchangeBalance {
  exchange: string;              // ID биржи (binance, bybit, okx, bitget, bingx)
  exchangeName: string;          // Отображаемое имя (BINANCE, BYBIT...)
  accountType: "DEMO" | "REAL";  // Тип аккаунта
  marketType: "spot" | "futures";// Тип рынка
  isTestnet: boolean;            // Тестовая сеть
  totalBalanceUSDT: number;      // Общий баланс в USDT
  availableUSDT: number;         // Доступная маржа
  inOrderUSDT: number;           // В ордерах
  inPositionUSDT: number;        // В позициях (margin used)
  unrealizedPnl: number;         // Нереализованный PnL
  todayPnl: number;              // PnL за сегодня
  todayPnlPercent: number;       // PnL за сегодня в %
  assets: AssetBalance[];        // Список активов
  lastSync: Date;                // Время последней синхронизации
  apiStatus: "connected" | "error" | "rate_limited" | "readonly";
  error?: string;                // Сообщение об ошибке
}

// Актив
interface AssetBalance {
  symbol: string;        // Символ (BTC, ETH, USDT...)
  name: string;          // Полное имя (Bitcoin, Ethereum...)
  total: number;         // Общее количество
  available: number;     // Доступно
  inOrder: number;       // В ордерах
  inPosition: number;    // В позициях
  priceUSDT: number;     // Цена в USDT
  valueUSDT: number;     // Стоимость в USDT
  change24h: number;     // Изменение за 24ч в %
  isDemo?: boolean;      // Демо-валюта (VST, SUSDT)
}
```

### 2.4 API Endpoints

#### GET /api/portfolio/balances

Получение балансов со всех подключённых бирж.

**Query Parameters:**

| Параметр | Тип | Описание |
|----------|-----|----------|
| `force` | boolean | Принудительное обновление (bypass cache) |
| `exchanges` | string | Фильтр бирж (через запятую) |
| `accountType` | string | Фильтр по типу: "DEMO" или "REAL" |

**Пример ответа:**

```json
{
  "success": true,
  "balances": [
    {
      "exchange": "binance",
      "exchangeName": "BINANCE",
      "accountType": "REAL",
      "marketType": "futures",
      "isTestnet": false,
      "totalBalanceUSDT": 5432.10,
      "availableUSDT": 3200.50,
      "inOrderUSDT": 150.00,
      "inPositionUSDT": 2081.60,
      "unrealizedPnl": 125.40,
      "todayPnl": 45.20,
      "todayPnlPercent": 0.84,
      "assets": [
        {
          "symbol": "USDT",
          "name": "Tether",
          "total": 5432.10,
          "available": 3200.50,
          "inOrder": 150.00,
          "inPosition": 2081.60,
          "priceUSDT": 1,
          "valueUSDT": 5432.10,
          "change24h": 0
        }
      ],
      "lastSync": "2026-03-15T10:30:00Z",
      "apiStatus": "connected"
    }
  ],
  "summary": {
    "totalBalanceUSDT": 15432.10,
    "totalAvailableUSDT": 10200.50,
    "totalInPosition": 4581.60,
    "totalUnrealizedPnl": 325.40,
    "connectedExchanges": 5,
    "errorExchanges": 0,
    "totalExchanges": 5
  },
  "cached": true,
  "timestamp": "2026-03-15T10:30:00Z"
}
```

#### POST /api/portfolio/balances

Принудительное обновление балансов.

**Body:**

```json
{
  "exchanges": ["binance", "bybit"]  // Опционально
}
```

### 2.5 React Hook

```typescript
import { usePortfolioBalances } from "@/hooks/use-portfolio-balances";

function PortfolioComponent() {
  const {
    balances,        // ExchangeBalance[]
    summary,         // Summary object
    isLoading,       // boolean
    error,           // Error | null
    isCached,        // boolean
    lastUpdated,     // Date | null
    refresh,         // () => void
    forceRefresh,    // () => void
    isRefreshing,    // boolean
    connectedCount,  // number
    errorCount,      // number
    totalBalance,    // number
    totalPnL,        // number
  } = usePortfolioBalances({
    enabled: true,
    refreshInterval: 60000,  // 1 минута
    onError: (err) => console.error(err),
  });
  
  // ...
}
```

### 2.6 Кэширование

- **In-memory cache** с TTL 30 секунд
- Автоматическая инвалидация при `force=true`
- Кэш по ключу `userId:exchangeId:accountType`

### 2.7 Загрузка цен активов

Цены активов (BTC, ETH, SOL и т.д.) загружаются автоматически для расчёта USD стоимости.

**Источник:** Binance Spot API (с fallback на другие биржи)

**Логика:**
1. После получения балансов собираются все уникальные символы активов
2. Для стейблкоинов (USDT, USDC, BUSD) цена = $1
3. Для остальных активов запрашивается цена с биржи
4. Рассчитывается `valueUSDT = total * priceUSDT`

**Файл:** `src/lib/exchange/price-fetcher.ts`

```typescript
// Функция для получения цен активов
export async function fetchAssetPrices(
  assets: string[],                    // ["BTC", "ETH", "SOL"]
  preferredExchange: ExchangeId = "binance"
): Promise<Map<string, number>>        // {"BTC": 85000, "ETH": 2200}
```

**Поддерживаемые биржи для цен:**

| Биржа | Spot | Futures | Примечание |
|-------|------|---------|------------|
| **Binance** | ✅ | ✅ | Основной источник |
| **Bybit** | ✅ | ✅ | Fallback |
| **OKX** | ✅ | ✅ | Fallback |
| **Bitget** | ✅ | ✅ | Fallback |
| **BingX** | ✅ | ✅ | Fallback |

### 2.8 Обработка ошибок

```typescript
// Graceful degradation
// При ошибке на одной бирже, остальные продолжают работать
{
  "exchange": "binance",
  "apiStatus": "error",
  "error": "API credentials not configured",
  "totalBalanceUSDT": 0,
  "assets": []
}
```

---

## 3. Компоненты

### 2.1 Balance Overview (BalanceWidget)

**Файл:** `src/components/dashboard/balance-widget.tsx`

Основной виджет отображения баланса портфеля.

#### Props Interface

```typescript
interface BalanceWidgetProps {
  // Нет внешних props - использует useCryptoStore
}

// Внутренние данные из store
interface BalanceData {
  account: {
    accountType: "DEMO" | "REAL";
    virtualBalance: {
      USDT: number;
      BTC: number;
      ETH: number;
    };
  };
  trades: Trade[];
  positions: Position[];
}
```

#### Структура компонента

```tsx
<Card>
  <CardHeader>
    <CardTitle>
      <Wallet /> Баланс [DEMO]
    </CardTitle>
    <Badge>Виртуальный счёт</Badge>
  </CardHeader>
  
  <CardContent>
    {/* Общий баланс с анимацией */}
    <TotalBalance />
    
    {/* PnL Summary */}
    <PnLSummary>
      <RealizedPnL />
      <UnrealizedPnL />
    </PnLSummary>
    
    {/* Asset Breakdown */}
    <AssetBreakdown>
      <AssetItem symbol="USDT" />
      <AssetItem symbol="BTC" />
    </AssetBreakdown>
    
    {/* Stats */}
    <Stats>
      <TotalTrades />
      <WinRateProgress />
    </Stats>
    
    {/* Reset Demo */}
    <ResetButton />
  </CardContent>
</Card>
```

#### Вычисляемые значения

```typescript
// Общий PnL от сделок
const totalPnl = trades.reduce((sum, trade) => sum + trade.pnl, 0);

// Процент PnL
const totalPnlPercent = trades.length > 0
  ? (totalPnl / (balance.USDT - totalPnl || 10000)) * 100
  : 0;

// Нереализованный PnL от позиций
const unrealizedPnl = positions.reduce(
  (sum, pos) => sum + pos.unrealizedPnl,
  0
);

// Общий баланс включая нереализованный PnL
const totalBalance = balance.USDT + unrealizedPnl;

// Win Rate
const winningTrades = trades.filter((t) => t.pnl > 0).length;
const winRate = trades.length > 0 
  ? (winningTrades / trades.length) * 100 
  : 0;
```

#### Анимация изменения баланса

```typescript
// Состояния анимации
const [prevBalance, setPrevBalance] = useState<number | null>(null);
const [balanceFlash, setBalanceFlash] = useState<"positive" | "negative" | null>(null);

// Эффект анимации при изменении баланса
useEffect(() => {
  if (prevBalance !== null && totalBalance !== prevBalance) {
    const diff = totalBalance - prevBalance;
    requestAnimationFrame(() => {
      setBalanceFlash(diff > 0 ? "positive" : "negative");
      setTimeout(() => setBalanceFlash(null), 600);
    });
  }
  setPrevBalance(balanceRef.current);
  balanceRef.current = totalBalance;
}, [totalBalance, prevBalance]);
```

#### CSS классы для анимации

```css
.balance-flash-positive {
  background-color: rgba(34, 197, 94, 0.2);
  animation: flash-positive 0.6s ease-out;
}

.balance-flash-negative {
  background-color: rgba(239, 68, 68, 0.2);
  animation: flash-negative 0.6s ease-out;
}

@keyframes flash-positive {
  0% { background-color: rgba(34, 197, 94, 0.4); }
  100% { background-color: transparent; }
}
```

---

### 2.2 PnL Analytics

**Файл:** `src/components/analytics/pnl-analytics.tsx`

Комплексный компонент аналитики PnL с множественными визуализациями.

#### Props Interface

```typescript
// Внешние props отсутствуют - компонент автономный
export function PnLAnalytics(): JSX.Element;

// Типы данных
interface PnLStats {
  totalPnL: number;           // Общий PnL
  totalPnLPercent: number;    // PnL в процентах
  realizedPnL: number;        // Реализованный PnL
  unrealizedPnL: number;      // Нереализованный PnL
  fundingPnL: number;         // PnL от фандинга
  feesPaid: number;           // Уплаченные комиссии
  winRate: number;            // Процент побед
  totalTrades: number;        // Всего сделок
  winningTrades: number;      // Прибыльных сделок
  losingTrades: number;       // Убыточных сделок
  avgWin: number;             // Средняя прибыль
  avgLoss: number;            // Средний убыток
  profitFactor: number;       // Профит-фактор
  bestTrade: number;          // Лучшая сделка
  worstTrade: number;         // Худшая сделка
  sharpeRatio: number;        // Коэффициент Шарпа
  maxDrawdown: number;        // Максимальная просадка
}

interface EquityPoint {
  timestamp: string;          // ISO timestamp
  balance: number;            // Баланс
  equity: number;             // Эквити
  realizedPnL: number;        // Реализованный PnL
  unrealizedPnL: number;      // Нереализованный PnL
  fundingPnL: number;         // Фандинг PnL
}

interface PnLApiResponse {
  success: boolean;
  stats: PnLStats;
  equityCurve: EquityPoint[];
  allPeriodsStats: Record<string, PnLStats>;
  isDemo: boolean;
}
```

#### Временные периоды

```typescript
const TIME_PERIODS = [
  { value: "1d", label: "1 день", days: 1 },
  { value: "3d", label: "3 дня", days: 3 },
  { value: "1w", label: "1 неделя", days: 7 },
  { value: "2w", label: "2 недели", days: 14 },
  { value: "1m", label: "1 месяц", days: 30 },
  { value: "3m", label: "3 месяца", days: 90 },
  { value: "6m", label: "6 месяцев", days: 180 },
  { value: "1y", label: "1 год", days: 365 },
  { value: "3y", label: "3 года", days: 1095 },
] as const;
```

#### Состояния компонента

```typescript
const [timeRange, setTimeRange] = useState<TimePeriod>("1m");
const [accountType, setAccountType] = useState<"demo" | "real">("demo");
const [isLoading, setIsLoading] = useState(false);
const [apiData, setApiData] = useState<PnLApiResponse | null>(null);
const [showShareCard, setShowShareCard] = useState(false);
```

#### Вкладки визуализации

| Вкладка | Описание | Компонент |
|---------|----------|-----------|
| **Кривая капитала** | График equity по времени | AreaChart |
| **Дневной PnL** | Столбчатый график PnL по дням | BarChart |
| **По периодам** | Сравнение разных периодов | ComposedChart |
| **Распределение** | Win/Loss и по символам | PieChart |

#### Фильтрация сделок

```typescript
const filteredTrades = useMemo(() => {
  const days = getDaysFromRange(timeRange);
  const now = Date.now();
  const cutoff = now - days * 24 * 60 * 60 * 1000;

  return trades.filter(
    (t) =>
      t.status === "CLOSED" &&
      t.isDemo === isDemo &&
      new Date(t.createdAt).getTime() >= cutoff
  );
}, [trades, timeRange, isDemo]);
```

#### Локальный расчёт статистики

```typescript
const localStats: PnLStats = useMemo(() => {
  const closedTrades = filteredTrades;
  const winningTrades = closedTrades.filter((t) => t.pnl > 0);
  const losingTrades = closedTrades.filter((t) => t.pnl < 0);

  const totalPnL = closedTrades.reduce((sum, t) => sum + t.pnl, 0);
  const totalWin = winningTrades.reduce((sum, t) => sum + t.pnl, 0);
  const totalLoss = Math.abs(losingTrades.reduce((sum, t) => sum + t.pnl, 0));

  return {
    totalPnL,
    totalPnLPercent: (totalPnL / initialBalance) * 100,
    realizedPnL: totalPnL,
    unrealizedPnL: 0,
    fundingPnL: 0,
    feesPaid: closedTrades.reduce((sum, t) => sum + t.fee, 0),
    winRate: closedTrades.length > 0 
      ? (winningTrades.length / closedTrades.length) * 100 
      : 0,
    totalTrades: closedTrades.length,
    winningTrades: winningTrades.length,
    losingTrades: losingTrades.length,
    avgWin: winningTrades.length > 0 
      ? totalWin / winningTrades.length 
      : 0,
    avgLoss: losingTrades.length > 0 
      ? totalLoss / losingTrades.length 
      : 0,
    profitFactor: totalLoss > 0 
      ? totalWin / totalLoss 
      : totalWin > 0 ? Infinity : 0,
    bestTrade: Math.max(...closedTrades.map((t) => t.pnl), 0),
    worstTrade: Math.min(...closedTrades.map((t) => t.pnl), 0),
    sharpeRatio: 0,
    maxDrawdown: 0,
  };
}, [filteredTrades]);
```

---

### 2.3 PnL Dashboard

**Файл:** `src/components/analytics/pnl-dashboard.tsx`

Дашборд доходности с упором на ключевые метрики.

#### Props Interface

```typescript
// Компонент автономный
export function PnLDashboard(): JSX.Element;

interface PnLStats {
  period: string;            // Период анализа
  realizedPnL: number;       // Реализованный PnL
  unrealizedPnL: number;     // Нереализованный PnL
  fundingPnL: number;        // Фандинг PnL
  feesPaid: number;          // Комиссии
  netPnL: number;            // Чистый PnL
  tradesCount: number;       // Количество сделок
  winsCount: number;         // Побед
  lossesCount: number;       // Поражений
  winRate: number;           // Win Rate %
  profitFactor: number;      // Профит-фактор
  avgTrade: number;          // Средняя сделка
  bestTrade: number;         // Лучшая сделка
  worstTrade: number;        // Худшая сделка
}
```

#### Особенности визуализации

**SVG Equity Curve:**
```typescript
const renderEquityCurve = () => {
  const width = 800;
  const height = 300;
  const padding = 40;

  // Расчёт min/max
  const equities = equityCurve.map(p => p.equity);
  const minEquity = Math.min(...equities);
  const maxEquity = Math.max(...equities);
  const range = maxEquity - minEquity || 1;

  // Генерация точек
  const points = equityCurve.map((point, i) => {
    const x = padding + (i / (equityCurve.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((point.equity - minEquity) / range) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(" ");

  // Определение цвета
  const isProfit = equityCurve[equityCurve.length - 1]?.equity > equityCurve[0]?.equity;
  const lineColor = isProfit ? "#22c55e" : "#ef4444";

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      {/* Grid, Area, Line, Points */}
    </svg>
  );
};
```

#### Сравнение периодов

```typescript
// Таблица сравнения всех периодов
{PERIOD_OPTIONS.map(p => {
  const s = allPeriodsStats[p];
  return (
    <tr key={p} onClick={() => setPeriod(p)}>
      <td>{PERIOD_LABELS[p]}</td>
      <td className={s.netPnL >= 0 ? "text-green-500" : "text-red-500"}>
        ${formatNumber(s.netPnL)}
      </td>
      <td>${formatNumber(s.fundingPnL)}</td>
      <td>-${formatNumber(s.feesPaid)}</td>
      <td>{s.tradesCount}</td>
      <td>{s.winRate.toFixed(1)}%</td>
    </tr>
  );
})}
```

---

### 2.4 Asset Allocation

Распределение активов отображается в BalanceWidget:

```typescript
<div className="space-y-2">
  {/* USDT */}
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
        <DollarSign className="h-4 w-4 text-green-500" />
      </div>
      <div>
        <p className="text-sm font-medium">USDT</p>
        <p className="text-xs text-muted-foreground">Tether USD</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-medium tabular-nums">
        {formatNumber(balance.USDT, 2)}
      </p>
      <p className="text-xs text-muted-foreground">
        {((balance.USDT / totalBalance) * 100).toFixed(1)}%
      </p>
    </div>
  </div>

  {/* BTC */}
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20">
        <Bitcoin className="h-4 w-4 text-orange-500" />
      </div>
      <div>
        <p className="text-sm font-medium">BTC</p>
        <p className="text-xs text-muted-foreground">Bitcoin</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-medium tabular-nums">
        {balance.BTC.toFixed(8)}
      </p>
      <p className="text-xs text-muted-foreground">
        {((balance.BTC / totalBalance) * 100).toFixed(1)}%
      </p>
    </div>
  </div>
</div>
```

---

### 2.5 Portfolio Risk

Риск-метрики интегрируются из модуля risk-management.

| Метрика | Описание | Файл |
|---------|----------|------|
| VaR | Value at Risk | `var-calculator-panel.tsx` |
| Max Drawdown | Максимальная просадка | `drawdown-monitor-panel.tsx` |
| Sharpe Ratio | Доходность/Риск | Расчёт в PnL Analytics |
| Position Limits | Лимиты позиций | `position-limiter-panel.tsx` |
| Kill Switch | Аварийное закрытие | `kill-switch-panel.tsx` |

---

## 3. Расчёт PnL

### 3.1 Формулы расчёта

#### Реализованный PnL

```typescript
// Для закрытой позиции (LONG)
realizedPnL = (exitPrice - entryPrice) * quantity - fees

// Для закрытой позиции (SHORT)
realizedPnL = (entryPrice - exitPrice) * quantity - fees
```

#### Нереализованный PnL

```typescript
// Для открытой позиции (LONG)
unrealizedPnL = (currentPrice - entryPrice) * quantity

// Для открытой позиции (SHORT)
unrealizedPnL = (entryPrice - currentPrice) * quantity
```

#### Фандинг PnL

```typescript
// Расчёт по истории funding payments
fundingPnL = fundingPayments.reduce((sum, f) => sum + f.amount, 0)

// Для LONG позиций
fundingPayment = -positionSize * fundingRate

// Для SHORT позиций
fundingPayment = positionSize * fundingRate
```

#### Чистый PnL

```typescript
netPnL = realizedPnL + unrealizedPnL + fundingPnL - feesPaid
```

### 3.2 Profit Factor

```typescript
profitFactor = totalWins / totalLosses

// Где:
totalWins = Math.abs(winningTrades.reduce((sum, t) => sum + t.pnl, 0))
totalLosses = Math.abs(losingTrades.reduce((sum, t) => sum + t.pnl, 0))

// Интерпретация:
// > 1.5 - Хорошая стратегия
// > 2.0 - Отличная стратегия
// < 1.0 - Убыточная стратегия
// Infinity - Только прибыльные сделки
```

### 3.3 Win Rate

```typescript
winRate = (winningTrades / totalTrades) * 100

// Интерпретация:
// > 60% - Высокий win rate
// 50-60% - Нормальный win rate
// < 50% - Низкий win rate (может компенсироваться высоким reward/risk)
```

### 3.4 Sharpe Ratio

```typescript
sharpeRatio = (avgReturn - riskFreeRate) / stdDev

// Где:
avgReturn = average daily return
riskFreeRate = обычно 0 для крипто
stdDev = стандартное отклонение доходности

// Интерпретация:
// > 2.0 - Отличный
// 1.0-2.0 - Хороший
// < 1.0 - Низкий
```

### 3.5 Maximum Drawdown

```typescript
maxDrawdown = Math.max(...drawdowns)

// Расчёт просадки в каждой точке:
drawdown = (peak - trough) / peak * 100

// Где:
peak = максимальный equity до текущей точки
trough = минимальный equity после пика
```

---

## 4. Метрики портфеля

### 4.1 Карточки метрик

#### Total PnL Card

```tsx
<Card>
  <CardContent className="pt-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">Общий R&L</p>
        <p className={cn(
          "text-xl font-bold",
          stats.totalPnL >= 0 ? "text-green-500" : "text-red-500"
        )}>
          {stats.totalPnL >= 0 ? "+" : ""}{formatCurrency(stats.totalPnL)}
        </p>
      </div>
      {stats.totalPnL >= 0 ? (
        <TrendingUp className="h-8 w-8 text-green-500/20" />
      ) : (
        <TrendingDown className="h-8 w-8 text-red-500/20" />
      )}
    </div>
    <p className={cn(
      "text-xs mt-1",
      stats.totalPnLPercent >= 0 ? "text-green-500" : "text-red-500"
    )}>
      {formatPercent(stats.totalPnLPercent)}
    </p>
  </CardContent>
</Card>
```

#### Win Rate Card

```tsx
<Card>
  <CardContent className="pt-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">Win Rate</p>
        <p className="text-xl font-bold">{formatNumber(stats.winRate)}%</p>
      </div>
      <PieChartIcon className="h-8 w-8 text-primary/20" />
    </div>
    <p className="text-xs text-muted-foreground mt-1">
      {stats.winningTrades}W / {stats.losingTrades}L
    </p>
  </CardContent>
</Card>
```

#### Profit Factor Card

```tsx
<Card>
  <CardContent className="pt-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">Profit Factor</p>
        <p className="text-xl font-bold">
          {stats.profitFactor === Infinity ? "∞" : formatNumber(stats.profitFactor, 2)}
        </p>
      </div>
      <DollarSign className="h-8 w-8 text-green-500/20" />
    </div>
    <p className="text-xs text-muted-foreground mt-1">
      Avg: {formatCurrency(stats.avgWin)} / {formatCurrency(-stats.avgLoss)}
    </p>
  </CardContent>
</Card>
```

### 4.2 Детализация PnL

| Категория | Описание | Цвет |
|-----------|----------|------|
| Реализованный PnL | Прибыль/убыток от закрытых позиций | Зелёный/Красный |
| Нереализованный PnL | Бумажная прибыль/убыток открытых позиций | Зелёный/Красный |
| Фандинг | Полученный/уплаченный funding | Зелёный/Красный |
| Комиссии | Уплаченные торговые комиссии | Красный (всегда расход) |

### 4.3 Equity Curve

```typescript
interface EquityData {
  timestamp: string;
  balance: number;      // Баланс без unrealized PnL
  equity: number;       // Полный equity (balance + unrealized)
  realizedPnL: number;  // Накопленный реализованный PnL
  unrealizedPnL: number; // Текущий нереализованный PnL
  fundingPnL: number;   // Накопленный фандинг
}
```

### 4.4 Распределение по символам

```typescript
const symbolDistribution = useMemo(() => {
  const symbolMap = new Map<string, number>();

  filteredTrades.forEach((trade) => {
    const count = symbolMap.get(trade.symbol) || 0;
    symbolMap.set(trade.symbol, count + 1);
  });

  return Array.from(symbolMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(6); // Топ 6 символов
}, [filteredTrades]);
```

---

## 5. API Эндпоинты

### 5.1 PnL Stats API

**Endpoint:** `GET /api/pnl-stats`

**Параметры:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `demo` | boolean | Да | Тип счёта (true = demo, false = real) |
| `period` | string | Да | Период (1d, 3d, 1w, 2w, 1m, 3m, 6m, 1y, 3y) |
| `equityCurve` | boolean | Нет | Включить данные equity curve |

**Пример запроса:**

```typescript
const response = await fetch(
  `/api/pnl-stats?demo=true&period=1m&equityCurve=true`
);
const data: PnLApiResponse = await response.json();
```

**Ответ:**

```json
{
  "success": true,
  "stats": {
    "totalPnL": 1250.45,
    "totalPnLPercent": 12.50,
    "realizedPnL": 1180.30,
    "unrealizedPnL": 70.15,
    "fundingPnL": -15.20,
    "feesPaid": 45.80,
    "winRate": 65.5,
    "totalTrades": 42,
    "winningTrades": 28,
    "losingTrades": 14,
    "avgWin": 85.50,
    "avgLoss": 42.30,
    "profitFactor": 2.02,
    "bestTrade": 320.00,
    "worstTrade": -95.50,
    "sharpeRatio": 1.85,
    "maxDrawdown": 8.5
  },
  "equityCurve": [
    {
      "timestamp": "2026-03-01T00:00:00Z",
      "balance": 10000,
      "equity": 10050,
      "realizedPnL": 0,
      "unrealizedPnL": 50,
      "fundingPnL": 0
    }
  ],
  "allPeriodsStats": {
    "1d": { "totalPnL": 120, "totalTrades": 5 },
    "3d": { "totalPnL": 350, "totalTrades": 12 }
  },
  "isDemo": true
}
```

### 5.2 Balance API

**Endpoint:** `GET /api/balance`

**Параметры:**

| Параметр | Тип | Описание |
|----------|-----|----------|
| `accountType` | string | "DEMO" или "REAL" |

**Ответ:**

```json
{
  "success": true,
  "balance": {
    "USDT": 10500.45,
    "BTC": 0.02500000,
    "ETH": 0.50000000
  },
  "unrealizedPnL": 125.30,
  "totalEquity": 10625.75
}
```

### 5.3 Reset Demo Balance

**Endpoint:** `POST /api/balance/reset-demo`

**Ответ:**

```json
{
  "success": true,
  "message": "Demo balance reset to $10,000",
  "newBalance": {
    "USDT": 10000,
    "BTC": 0,
    "ETH": 0
  }
}
```

---

## 6. Примеры использования

### 6.1 Базовое использование BalanceWidget

```tsx
import { BalanceWidget } from "@/components/dashboard/balance-widget";

export function DashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <BalanceWidget />
      {/* Другие виджеты */}
    </div>
  );
}
```

### 6.2 Интеграция PnL Analytics

```tsx
import { PnLAnalytics } from "@/components/analytics/pnl-analytics";

export function AnalyticsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Аналитика портфеля</h1>
      <PnLAnalytics />
    </div>
  );
}
```

### 6.3 PnL Dashboard с кастомными периодами

```tsx
import { PnLDashboard } from "@/components/analytics/pnl-dashboard";

export function PerformancePage() {
  return (
    <Tabs defaultValue="dashboard">
      <TabsList>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard">
        <PnLDashboard />
      </TabsContent>
      
      <TabsContent value="analytics">
        <PnLAnalytics />
      </TabsContent>
    </Tabs>
  );
}
```

### 6.4 Программное получение PnL данных

```typescript
import { useQuery } from "@tanstack/react-query";

function usePnLStats(demo: boolean, period: string) {
  return useQuery({
    queryKey: ["pnl-stats", demo, period],
    queryFn: async () => {
      const response = await fetch(
        `/api/pnl-stats?demo=${demo}&period=${period}&equityCurve=true`
      );
      if (!response.ok) throw new Error("Failed to fetch PnL stats");
      return response.json();
    },
    refetchInterval: 30000, // Обновление каждые 30 секунд
  });
}

// Использование
function MyComponent() {
  const { data, isLoading, error } = usePnLStats(true, "1m");
  
  if (isLoading) return <Skeleton />;
  if (error) return <ErrorState error={error} />;
  
  return (
    <div>
      <p>Total PnL: ${data.stats.totalPnL.toFixed(2)}</p>
      <p>Win Rate: {data.stats.winRate.toFixed(1)}%</p>
    </div>
  );
}
```

### 6.5 Шеринг статистики

```tsx
import { ShareStatsCard } from "@/components/share/share-stats-card";

function ShareButton() {
  const [showShare, setShowShare] = useState(false);
  const stats = usePnLStats(true, "1m");
  
  return (
    <>
      <Button onClick={() => setShowShare(true)}>
        <Share2 className="mr-2 h-4 w-4" />
        Поделиться
      </Button>
      
      <ShareStatsCard
        open={showShare}
        onOpenChange={setShowShare}
        statsData={{
          totalTrades: stats.totalTrades,
          winningTrades: stats.winningTrades,
          losingTrades: stats.losingTrades,
          winRate: stats.winRate,
          totalPnL: stats.totalPnL,
          avgProfit: stats.avgWin,
          avgLoss: Math.abs(stats.avgLoss),
          bestTrade: stats.bestTrade,
          worstTrade: stats.worstTrade,
          period: "1 месяц",
          balance: 10500,
          initialBalance: 10000,
        }}
      />
    </>
  );
}
```

### 6.6 Кастомная Equity Curve

```tsx
function CustomEquityCurve({ data }: { data: EquityPoint[] }) {
  if (data.length < 2) {
    return <EmptyState message="Недостаточно данных" />;
  }

  const minEquity = Math.min(...data.map(d => d.equity));
  const maxEquity = Math.max(...data.map(d => d.equity));
  const range = maxEquity - minEquity || 1;
  const isProfit = data[data.length - 1].equity > data[0].equity;

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop 
              offset="5%" 
              stopColor={isProfit ? "#22c55e" : "#ef4444"} 
              stopOpacity={0.3} 
            />
            <stop 
              offset="95%" 
              stopColor={isProfit ? "#22c55e" : "#ef4444"} 
              stopOpacity={0} 
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis domain={[minEquity * 0.99, maxEquity * 1.01]} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="equity"
          stroke={isProfit ? "#22c55e" : "#ef4444"}
          fill="url(#equityGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
```

---

## 📊 Скриншоты

### Balance Widget
```
┌──────────────────────────────────────┐
│ 👛 Баланс [DEMO]     Виртуальный счёт │
├──────────────────────────────────────┤
│ Общий баланс                         │
│ $10,543.21 USDT                      │
│                                      │
│ ┌─────────────┬─────────────────────┐│
│ │📈 Реализ.   │💰 Нереализ.         ││
│ │+$432.15     │+$111.06             ││
│ │(+4.32%)     │                     ││
│ └─────────────┴─────────────────────┘│
│                                      │
│ Активы                               │
│ 💵 USDT    10,432.15     98.5%      │
│ 🟠 BTC     0.00125       1.5%       │
│                                      │
│ Сделок: 45    Win Rate: 67.5%       │
│ ████████████░░░░░░░░                 │
│                                      │
│ [🔄 Сбросить демо-счёт]              │
└──────────────────────────────────────┘
```

### PnL Analytics
```
┌──────────────────────────────────────────────────────────────────┐
│ 📊 Аналитика P&L        [DEMO][REAL]  [📅 1 месяц ▼] [↻] [📤]   │
├──────────────────────────────────────────────────────────────────┤
│ ┌───────────┬───────────┬───────────┬───────────┐               │
│ │Общий P&L  │Win Rate   │Profit Fact│Всего сдел │               │
│ │+$1,250.45 │65.5%      │2.02       │42         │               │
│ │+12.50%    │28W / 14L  │Avg:$85/$42│Best:$320  │               │
│ └───────────┴───────────┴───────────┴───────────┘               │
│                                                                  │
│ [Кривая капитала][Дневной P&L][По периодам][Распределение]       │
│                                                                  │
│ ┌──────────────────────────────────────────────────────────────┐│
│ │     ▁▂▃▄▅▆▇█▇▆▅▄▃▂▁                                         ││
│ │    ╱                        ╲                                 ││
│ │   ╱                          ╲___                             ││
│ │  ╱                               ╲___                         ││
│ │ ╱                                    ╲___                     ││
│ │╱                                         ╲___                 ││
│ └──────────────────────────────────────────────────────────────┘│
│                                                                  │
│ Статистика по всем периодам:                                     │
│ ┌────────┬──────────┬────────┬─────────┬────────────┐           │
│ │Период  │P&L       │Сделок  │Win Rate │Profit Fact │           │
│ ├────────┼──────────┼────────┼─────────┼────────────┤           │
│ │1 день  │+$120.00  │5       │80.0%    │4.00        │           │
│ │1 неделя│+$350.00  │12      │66.7%    │2.15        │           │
│ │1 месяц │+$1,250   │42      │65.5%    │2.02        │           │
│ └────────┴──────────┴────────┴─────────┴────────────┘           │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔗 Связанные документы

| Документ | Описание |
|----------|----------|
| [DASHBOARD.md](./DASHBOARD.md) | Компоненты дашборда |
| [FUNDING_RATES.md](./FUNDING_RATES.md) | Фандинг ставки |
| [RISK_MODELS_DOCUMENTATION.md](../risk/RISK_MODELS_DOCUMENTATION.md) | Риск-модели |
| [../microservices/trade-events-service.md](../microservices/trade-events-service.md) | Сервис событий сделок |

---

## 8. TODO: Расширение функциональности

### 8.1 Планируемые улучшения

#### 🔮 Earn/Savings интеграция (Приоритет: Medium)

Типы данных уже определены в `src/lib/exchange/types.ts`:
- `EarnProduct` — продукты для подписки
- `EarnPosition` — активные позиции в Earn
- `EarnAccount` — сводка по Earn аккаунту

**Унификация по наименьшему общему знаменателю (5 бирж):**

| Биржа | Flexible Earn | Locked Earn | Staking | Статус API |
|-------|---------------|-------------|---------|------------|
| **Binance** | ✅ Simple Earn | ✅ Simple Earn | ✅ Staking | Документирован |
| **Bybit** | ✅ Earn | ✅ Earn | ❌ | Документирован |
| **OKX** | ✅ Savings | ✅ Fixed | ❌ | Документирован |
| **Bitget** | ✅ Earn | ✅ Fixed | ❌ | Документирован |
| **BingX** | ❓ Limited | ❓ Limited | ❌ | Не документирован |

**Единый интерфейс (intersection):**
```typescript
// Унифицированный Earn - поддерживается всеми 5 биржами
type UnifiedEarnType = "FLEXIBLE" | "LOCKED";

interface UnifiedEarnPosition {
  positionId: string;
  exchange: ExchangeId;
  productId: string;
  type: "FLEXIBLE" | "LOCKED";
  asset: string;           // USDT, BTC, ETH...
  principal: number;       // Основной капитал
  pendingInterest: number; // Накопленные проценты
  apy: number;             // Годовая доходность
  subscribeTime: Date;
  maturityTime?: Date;     // Для LOCKED
  canRedeem: boolean;
}
```

**Требуется реализовать:**
1. Методы `getEarnPositions()` в exchange clients
2. API endpoint `/api/portfolio/earn`
3. UI вкладка "Earn" в PortfolioView
4. Graceful fallback для BingX (если API недоступен)

#### 📊 Дополнительные улучшения

| Задача | Описание | Приоритет | Статус |
|--------|----------|-----------|--------|
| **Цены активов** | Подгрузка актуальных цен с бирж | High | ✅ **Реализовано** |
| **История балансов** | График изменения баланса | Medium | ⏳ TODO |
| **Экспорт** | CSV/PDF отчёты по портфелю | Low | ⏳ TODO |
| **Алерты** | Уведомления при изменении баланса | Low | ⏳ TODO |

#### ✅ Реализовано: Цены активов

**Файл:** `src/lib/exchange/price-fetcher.ts`

**Функции:**
- `fetchAssetPrices(assets, exchange)` — получение цен для списка активов
- `fetchPriceWithFallback(symbol, exchange, market)` — fallback по биржам
- Поддержка SPOT и FUTURES рынков

**Интеграция:**
- `src/app/api/portfolio/balances/route.ts` — автоматическое обогащение ценами
- Цены загружаются для всех не-stablecoin активов
- `valueUSDT` рассчитывается как `total * priceUSDT`

### 8.2 Файлы для расширения

```
src/lib/exchange/types.ts           - Добавить EarnAPI interface
src/lib/exchange/binance-client.ts  - Добавить getEarnPositions()
src/lib/exchange/bybit-client.ts    - Добавить getEarnPositions()
src/lib/exchange/okx-client.ts      - Добавить getEarnPositions()
src/lib/exchange/bitget-client.ts   - Добавить getEarnPositions()
src/lib/exchange/bingx-client.ts    - Добавить getEarnPositions() с fallback

src/app/api/portfolio/balances/route.ts - Добавить Earn данные
src/hooks/use-portfolio-balances.ts     - Добавить Earn в ответ

src/components/portfolio/portfolio-view-real.tsx - Добавить вкладку Earn
```

---

## 📝 Changelog

| Версия | Дата | Изменения |
|--------|------|-----------|
| 3.1 | Март 2026 | Добавлена загрузка цен активов с бирж (Binance, Bybit, OKX, Bitget, BingX) |
| 3.0 | Март 2026 | Добавлена документация Production Portfolio API, TODO секция |
| 2.0 | Март 2026 | Полная документация портфеля |
| 1.0 | Февраль 2026 | Начальная версия |

---

*Документ создан: Март 2026*
