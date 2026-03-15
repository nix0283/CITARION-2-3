# Copy Trading Panel Documentation

## Содержание
1. [Обзор копитрейдинга](#1-обзор-копитрейдинга)
2. [Компоненты](#2-компоненты)
3. [Как работает копирование](#3-как-работает-копирование)
4. [Настройка Master Trader](#4-настройка-master-trader)
5. [Настройка Follower](#5-настройка-follower)
6. [Метрики и статистика](#6-метрики-и-статистика)
7. [API эндпоинты](#7-api-эндпоинты)
8. [Примеры использования](#8-примеры-использования)

---

## 1. Обзор копитрейдинга

### Что такое Copy Trading?

Copy Trading — это автоматическое копирование сделок опытных трейдеров (Master/Lead/Elite Traders). CITARION предоставляет единый интерфейс для работы с Copy Trading на 5 биржах: Binance, Bybit, OKX, Bitget и BingX.

### Две роли в системе

| Роль | Описание | Возможности |
|------|----------|-------------|
| **Follower** | Подписывается и копирует сделки | Выбор трейдеров, настройка суммы копирования, управление подписками |
| **Master Trader** | На него подписываются другие | Управление подписчиками, настройка profit sharing, просмотр статистики |

### Поддержка API по биржам

#### Для Follower (Копирование трейдеров)

| Функция | OKX | Bitget | Binance | Bybit | BingX |
|---------|-----|--------|---------|-------|-------|
| Публичный API лидеров | ✅ | ✅ | ❌ | ❌ | ❌ |
| Список трейдеров | ✅ API | ✅ API | Web UI | Web UI | Web UI |
| Статистика PnL/ROI | ✅ API | ✅ API | Web UI | Web UI | Web UI |
| Подписка через API | ✅ | ✅ | ❌ | ❌ | ❌ |
| Управление копированием | ✅ API | ✅ API | Web UI | Web UI | Web UI |

#### Для Master Trader (Управление подписчиками)

| Функция | OKX | Bitget | Binance | Bybit | BingX |
|---------|-----|--------|---------|-------|-------|
| Подать заявку через API | ✅ | ❌ (UI) | ❌ (UI) | ❌ (UI) | ❌ (UI) |
| Получить настройки | ✅ | ✅ | ⚠️ Частично | ❌ | ❌ |
| Обновить настройки | ✅ | ✅ | ❌ | ❌ | ❌ |
| Список подписчиков | ✅ | ✅ | ❌ | ❌ | ❌ |
| Удалить подписчика | ✅ | ✅ | ❌ | ❌ | ❌ |
| Profit Sharing статистика | ✅ | ✅ | ❌ | ❌ | ❌ |
| TP/SL Ratio настройки | ❌ | ✅ | ❌ | ❌ | ❌ |

### Рекомендации по выбору биржи

1. **OKX** — Лучший выбор! Полный API для Master Traders
2. **Bitget** — Отличный API, есть уникальная функция TP/SL Ratio
3. **Binance/Bybit/BingX** — Используйте стандартный Trade API, управление через Web UI

---

## 2. Компоненты

### 2.1 CopyTradingPanel

**Расположение:** `src/components/copy-trading/copy-trading-panel.tsx`

Главная панель для Follower — поиск и подписка на Master Traders.

#### Props

```typescript
// Компонент не принимает внешних props
// Использует глобальный store: useCryptoStore()
```

#### Внутренние типы данных

```typescript
interface CopyTrader {
  traderId: string;        // Уникальный ID трейдера
  nickname: string;        // Отображаемое имя
  avatar?: string;         // URL аватара
  exchange: string;        // Биржа (okx, bitget, binance, bybit, bingx)
  roi: number;             // Return on Investment (%)
  winRate: number;         // Процент прибыльных сделок (%)
  totalTrades: number;     // Общее количество сделок
  followersCount: number;  // Количество подписчиков
  totalPnl: number;        // Общий PnL в USDT
  tradingDays: number;     // Дней в копитрейдинге
  maxDrawdown: number;     // Максимальная просадка (%)
  avgLeverage: number;     // Среднее плечо
  lastTradeTime?: Date;    // Время последней сделки
  rank?: number;           // Ранг в рейтинге
}

interface CopyTraderPosition {
  positionId: string;      // ID позиции
  symbol: string;          // Торговая пара
  side: 'long' | 'short';  // Направление
  quantity: number;        // Количество
  entryPrice: number;      // Цена входа
  markPrice: number;       // Текущая цена
  unrealizedPnl: number;   // Нереализованный PnL
  leverage: number;        // Плечо
  openedAt: Date;          // Время открытия
}

interface CopySubscription {
  traderId: string;        // ID трейдера
  nickname: string;        // Имя трейдера
  exchange: string;        // Биржа
  copyMode: 'fixed' | 'ratio' | 'percentage'; // Режим копирования
  amount: number;          // Сумма копирования
  active: boolean;         // Активна ли подписка
  subscribedAt: Date;      // Дата подписки
  totalPnl: number;        // Заработанный PnL
}
```

#### Структура компонента

```
CopyTradingPanel
├── Header (заголовок + статистика подписок)
├── API Support Warning (если биржа не поддерживает публичный API)
└── Tabs
    ├── Traders Tab
    │   ├── Filters (биржа, сортировка)
    │   └── Traders List
    │       ├── Trader Card (основная информация)
    │       └── Expanded View (детали + форма подписки)
    ├── Positions Tab
    │   └── Active Positions List
    ├── Subscriptions Tab
    │   └── My Subscriptions List
    └── Settings Tab
        ├── Default Copy Settings
        └── API Support Table
```

#### Состояния

```typescript
const [activeTab, setActiveTab] = useState<'traders' | 'positions' | 'subscriptions' | 'settings'>('traders');
const [selectedExchange, setSelectedExchange] = useState<string>('okx');
const [sortBy, setSortBy] = useState<'roi' | 'winRate' | 'followers' | 'pnl'>('roi');
const [traders, setTraders] = useState<CopyTrader[]>([]);
const [positions, setPositions] = useState<CopyTraderPosition[]>([]);
const [subscriptions, setSubscriptions] = useState<CopySubscription[]>([]);
const [loading, setLoading] = useState(false);
const [expandedTrader, setExpandedTrader] = useState<string | null>(null);
```

#### Режимы копирования

| Режим | Описание | Пример |
|-------|----------|--------|
| `fixed` | Фиксированная сумма на сделку | $100 на каждую сделку |
| `ratio` | Пропорциональное копирование | 0.5x от размера позиции трейдера |
| `percentage` | Процент от баланса | 5% от баланса на сделку |

#### Ключевые функции

```typescript
// Подписка на трейдера
const handleSubscribe = async (traderId: string) => {
  // 1. Показать loading
  // 2. Отправить запрос на подписку
  // 3. Добавить в список подписок
  // 4. Показать уведомление
};

// Отписка от трейдера
const handleUnsubscribe = async (traderId: string) => {
  // 1. Показать loading
  // 2. Отправить запрос на отписку
  // 3. Удалить из списка подписок
  // 4. Показать уведомление
};

// Получение поддержки API для биржи
const getApiSupport = (exchange: string) => {
  return EXCHANGE_API_SUPPORT[exchange] || { 
    publicApi: false, 
    subscribe: false, 
    manageFollowers: false 
  };
};
```

---

### 2.2 MasterTraderPanel

**Расположение:** `src/components/copy-trading/master-trader-panel.tsx`

Дашборд для управления как Master Trader — просмотр подписчиков, настройка profit sharing.

#### Props

```typescript
// Компонент не принимает внешних props
// Все данные загружаются через API
```

#### Внутренние типы данных

```typescript
interface Follower {
  followerId: string;        // ID подписчика
  nickname?: string;         // Имя подписчика
  subscribedAt: Date;        // Дата подписки
  active: boolean;           // Активен ли
  totalPnl: number;          // Общий PnL подписчика
  totalCopiedTrades: number; // Сколько сделок скопировано
  totalVolume: number;       // Общий объём
}

interface MasterStats {
  isLeadTrader: boolean;       // Является ли Master Trader
  followersCount: number;      // Количество подписчиков
  activeFollowers: number;     // Активных подписчиков
  totalProfitShared: number;   // Заработано на profit sharing
  totalTradesCopied: number;   // Всего скопировано сделок
  profitSharePercent: number;  // Процент profit sharing
}

interface Position {
  symbol: string;            // Торговая пара
  side: 'long' | 'short';    // Направление
  quantity: number;          // Количество
  entryPrice: number;        // Цена входа
  unrealizedPnl: number;     // Нереализованный PnL
  leverage: number;          // Плечо
  followersCopying: number;  // Сколько подписчиков копируют
  openedAt: Date;            // Время открытия
}

interface ApiSupport {
  full: boolean;             // Полная поддержка API
  apply: boolean;            // Заявка через API
  followers: boolean;        // Управление подписчиками
  profitSharing: boolean;    // Profit sharing через API
  closePosition: boolean;    // Закрытие позиций
  modifyTpsl: boolean;       // Изменение TP/SL
  docs: string;              // Ссылка на документацию
}
```

#### Поддержка Master Trader API по биржам

```typescript
const MASTER_TRADER_SUPPORT: Record<string, ApiSupport & { name: string }> = {
  okx: { 
    name: "OKX",
    full: true, 
    apply: true,        // Можно подать заявку через API
    followers: true, 
    profitSharing: true,
    closePosition: true,
    modifyTpsl: true,
    docs: 'https://www.okx.com/docs-v5/en/#copy-trading-rest-api'
  },
  bitget: { 
    name: "Bitget",
    full: true, 
    apply: false,       // Только через UI
    followers: true, 
    profitSharing: true,
    closePosition: true,
    modifyTpsl: true,
    docs: 'https://bitgetlimited.github.io/apidoc/en/copyTrade'
  },
  binance: { 
    name: "Binance",
    full: false,        // Ограниченная поддержка
    apply: false, 
    followers: false, 
    profitSharing: false,
    closePosition: false,
    modifyTpsl: false,
    docs: 'https://developers.binance.com/docs/copy_trading/future-copy-trading'
  },
  bybit: { 
    name: "Bybit",
    full: false, 
    apply: false, 
    followers: false, 
    profitSharing: false,
    closePosition: false,
    modifyTpsl: false,
    docs: 'https://bybit-exchange.github.io/docs/v5/copytrade'
  },
  bingx: { 
    name: "BingX",
    full: false, 
    apply: false, 
    followers: false, 
    profitSharing: false,
    closePosition: false,
    modifyTpsl: false,
    docs: 'https://bingx-api.github.io/docs/'
  },
};
```

#### Структура компонента

```
MasterTraderPanel
├── Header (заголовок + статус Master Trader)
├── Exchange Selector (5 бирж)
├── API Support Warning
├── Not Master Trader (форма заявки)
└── Master Trader Dashboard
    ├── Overview Tab
    │   ├── Stats Cards (подписчики, заработок, сделки, profit share)
    │   └── Active Positions Summary
    ├── Followers Tab
    │   └── Followers List (с возможностью удаления)
    ├── Positions Tab
    │   └── Positions Info
    └── Settings Tab
        ├── General Settings
        ├── TP/SL Ratio (Bitget)
        └── Exchange Instructions
```

#### Настройки Master Trader

```typescript
interface MasterTraderSettings {
  profitSharePercent: number;    // Процент от прибыли followers (0-30%)
  minCopyAmount: number;         // Минимальная сумма копирования
  maxCopyAmount: number;         // Максимальная сумма копирования
  requireApproval: boolean;      // Требовать одобрение подписчиков
  visible: boolean;              // Виден ли в публичном рейтинге
}
```

#### Ключевые функции

```typescript
// Загрузка данных Master Trader
const fetchData = async () => {
  const response = await fetch(`/api/master-trader?exchange=${selectedExchange}`);
  const result = await response.json();
  // Обновление состояния
};

// Подача заявки на Master Trader
const handleApplyAsMaster = async () => {
  const response = await fetch('/api/master-trader', {
    method: 'POST',
    body: JSON.stringify({
      exchange: selectedExchange,
      action: 'apply',
      profitSharePercent: settings.profitSharePercent,
      minCopyAmount: settings.minCopyAmount,
    }),
  });
  // Обработка результата
};

// Удаление подписчика
const handleRemoveFollower = async (followerId: string) => {
  const response = await fetch('/api/master-trader', {
    method: 'POST',
    body: JSON.stringify({
      exchange: selectedExchange,
      action: 'removeFollower',
      followerId,
    }),
  });
  // Обновление списка
};

// Сохранение настроек
const handleSaveSettings = async () => {
  const response = await fetch('/api/master-trader', {
    method: 'POST',
    body: JSON.stringify({
      exchange: selectedExchange,
      action: 'updateSettings',
      ...settings,
    }),
  });
};
```

---

### 2.3 CornixMetricsPanel

**Расположение:** `src/components/copy-trading/cornix-metrics-panel.tsx`

Панель метрик производительности и сигналов Cornix интеграции.

#### Props

```typescript
// Компонент не принимает внешних props
```

#### Внутренние типы данных

```typescript
interface PerformanceMetrics {
  totalPnl: number;           // Общий PnL
  totalPnlPercent: number;    // Общий PnL в процентах
  todayPnl: number;           // PnL за сегодня
  todayPnlPercent: number;    // PnL за сегодня в %
  weekPnl: number;            // PnL за неделю
  weekPnlPercent: number;     // PnL за неделю в %
  monthPnl: number;           // PnL за месяц
  monthPnlPercent: number;    // PnL за месяц в %
  winRate: number;            // Процент прибыльных сделок
  avgHoldTime: number;        // Среднее время удержания (ms)
  totalTrades: number;        // Всего сделок
  winningTrades: number;      // Прибыльных сделок
  losingTrades: number;       // Убыточных сделок
  avgWin: number;             // Средняя прибыль
  avgLoss: number;            // Средний убыток
  profitFactor: number;       // Profit Factor
  sharpeRatio: number;        // Sharpe Ratio
  maxDrawdown: number;        // Максимальная просадка
  currentStreak: number;      // Текущая серия
  bestTrade: number;          // Лучшая сделка
  worstTrade: number;         // Худшая сделка
}

interface SignalMetrics {
  totalSignals: number;           // Всего сигналов
  successfulSignals: number;      // Успешных сигналов
  failedSignals: number;          // Неудачных сигналов
  pendingSignals: number;         // Ожидающих сигналов
  avgExecutionTime: number;       // Среднее время исполнения (ms)
  successRate: number;            // Процент успеха
  avgReturn: number;              // Средняя доходность
  signalsByExchange: Record<string, number>;  // По биржам
  signalsByPair: { pair: string; count: number; pnl: number }[]; // По парам
}

interface CopyTradingMetrics {
  activeFollowers: number;        // Активных подписчиков
  totalFollowers: number;         // Всего подписчиков
  totalCopiedTrades: number;      // Скопированных сделок
  avgFollowerPnl: number;         // Средний PnL подписчика
  profitShareEarned: number;      // Заработано на profit share
  topFollowers: { id: string; pnl: number; trades: number }[];
}

interface TimeSeriesData {
  date: string;
  pnl: number;
  trades: number;
  equity: number;
}
```

#### Структура компонента

```
CornixMetricsPanel
├── Header (заголовок + period selector)
├── Performance Summary Cards
│   ├── Total PnL
│   ├── Win Rate
│   ├── Total Trades
│   └── Profit Factor
└── Tabs
    ├── Performance Tab
    │   ├── Period PnL Cards (Today, Week, Month)
    │   ├── Detailed Statistics
    │   └── Equity Curve
    ├── Signals Tab
    │   ├── Signal Stats Cards
    │   ├── Signals by Exchange
    │   └── Top Trading Pairs
    └── Copy Trading Tab
        ├── Copy Trading Cards
        └── Top Followers
```

#### Выбор периода

```typescript
const [period, setPeriod] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

// Периоды:
// 7d   - последние 7 дней
// 30d  - последние 30 дней
// 90d  - последние 90 дней
// all  - всё время
```

#### Визуализация Equity Curve

Компонент отображает equity curve как bar chart:

```typescript
// Каждый бар представляет один день
// Зелёный = положительный PnL, красный = отрицательный
// Высота = относительное значение equity
{equityCurve.slice(-30).map((point, i) => {
  const height = ((point.equity - minEquity) / range) * 100;
  const isPositive = point.pnl >= 0;
  return (
    <div
      className={isPositive ? "bg-green-500" : "bg-red-500"}
      style={{ height: `${height}%` }}
      title={`${point.date}: $${point.equity}`}
    />
  );
})}
```

---

### 2.4 CornixFeaturesPanel

**Расположение:** `src/components/copy-trading/cornix-features-panel.tsx`

Управление функциями интеграции Cornix — настройка авто-торговли, webhook, уведомлений.

#### Props

```typescript
// Компонент не принимает внешних props
```

#### Внутренние типы данных

```typescript
interface ConnectedExchange {
  id: string;                  // ID биржи
  name: string;                // Название
  connected: boolean;          // Подключена ли
  apiKeyConfigured: boolean;   // Настроен ли API ключ
  permissions: string[];       // Разрешения
  lastSync?: Date;             // Последняя синхронизация
  accountType: 'spot' | 'futures' | 'both';
}

interface SignalStats {
  totalSignals: number;        // Всего сигналов
  activeSignals: number;       // Активных
  executedSignals: number;     // Исполненных
  pendingSignals: number;      // В ожидании
  failedSignals: number;       // Ошибок
}

interface CornixFeatures {
  autoTrading: boolean;        // Автоматическая торговля
  signalParsing: boolean;      // Парсинг сигналов
  webhookEnabled: boolean;     // Webhook включён
  notificationsEnabled: boolean; // Уведомления
  riskManagement: boolean;     // Риск-менеджмент
  tpSlCopy: boolean;           // Копировать TP/SL
  leverageLimit: number;       // Максимум плечо
  maxPositions: number;        // Максимум позиций
}
```

#### Поддерживаемые биржи

```typescript
const SUPPORTED_EXCHANGES = [
  { id: 'binance', name: 'Binance', hasFutures: true, hasSpot: true },
  { id: 'bybit', name: 'Bybit', hasFutures: true, hasSpot: true },
  { id: 'okx', name: 'OKX', hasFutures: true, hasSpot: true },
  { id: 'bitget', name: 'Bitget', hasFutures: true, hasSpot: true },
  { id: 'bingx', name: 'BingX', hasFutures: true, hasSpot: true },
];
```

#### Структура компонента

```
CornixFeaturesPanel
├── Header (заголовок + активные сигналы)
├── Info Card (описание Cornix)
├── Connected Exchanges
│   └── Exchange Cards (статус + кнопка подключения)
├── Signal Statistics
│   └── Stats Grid (всего, активных, исполнено, ожидание, ошибки)
├── Features Settings
│   ├── Auto Trading Switch
│   ├── Signal Parsing Switch
│   ├── Webhook Switch
│   ├── Notifications Switch
│   ├── Risk Management Switch
│   ├── TP/SL Copy Switch
│   ├── Leverage Limit Input
│   └── Max Positions Input
└── Webhook URL
    └── Webhook URL Display
```

#### Функции интеграции

| Функция | Описание |
|---------|----------|
| **Auto Trading** | Автоматическое исполнение сигналов |
| **Signal Parsing** | Распознавание Cornix формата сигналов |
| **Webhook** | Приём сигналов через webhook |
| **Notifications** | Telegram уведомления о сигналах |
| **Risk Management** | Проверка лимитов перед исполнением |
| **TP/SL Copy** | Автоматическое копирование TP/SL из сигналов |

#### Переключение функций

```typescript
const handleToggleFeature = async (feature: keyof CornixFeatures, value: boolean) => {
  // 1. Оптимистичное обновление UI
  setFeatures(prev => ({ ...prev, [feature]: value }));
  
  // 2. Отправка на сервер
  await fetch('/api/cornix/features', {
    method: 'POST',
    body: JSON.stringify({ feature, value }),
  });
  
  // 3. Показать уведомление
  toast({ title: value ? "Функция включена" : "Функция отключена" });
};
```

---

## 3. Как работает копирование

### Архитектура Copy Trading

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Master Trader  │────▶│    Exchange     │────▶│    Followers    │
│   (открывает    │     │   (Broadcast)   │     │   (копируют     │
│    сделку)      │     │                 │     │    сделку)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                                               │
        │                                               │
        ▼                                               ▼
┌─────────────────┐                           ┌─────────────────┐
│   CITARION UI   │                           │   CITARION UI   │
│ MasterTraderPanel│                           │CopyTradingPanel │
└─────────────────┘                           └─────────────────┘
```

### Процесс копирования

1. **Master Trader открывает позицию**
   - Использует стандартный Trade API биржи
   - Биржа автоматически транслирует сделку подписчикам

2. **Follower получает сигнал**
   - Биржа открывает позицию согласно настройкам копирования
   - Follower может видеть позицию в CopyTradingPanel

3. **Синхронизация**
   - TP/SL копируются автоматически (если включено)
   - Закрытие позиции Master Trader → закрытие у Followers

### Режимы копирования

#### Fixed (Фиксированная сумма)

```
Master открывает: BTCUSDT Long $10,000
Follower настройка: $100 fixed
Результат: Follower открывает BTCUSDT Long $100
```

#### Ratio (Пропорция)

```
Master открывает: BTCUSDT Long $10,000
Follower настройка: 0.1x ratio
Результат: Follower открывает BTCUSDT Long $1,000
```

#### Percentage (% от баланса)

```
Follower баланс: $5,000
Follower настройка: 2% percentage
Master открывает: BTCUSDT Long $10,000
Результат: Follower открывает BTCUSDT Long $100 (2% от $5,000)
```

---

## 4. Настройка Master Trader

### Требования для Master Trader по биржам

#### OKX (Рекомендуется)

- Полный API контроль
- Подача заявки через API
- Минимальные требования: уточняйте на бирже

#### Bitget

- Отличный API
- Подача заявки через Web UI
- Уникальная функция: TP/SL Ratio

#### Binance

- Подача заявки через Web UI
- Требования:
  - Минимальный объём: 50,000 USDT за 30 дней
  - ROI > 10%
  - Win Rate > 50%
  - Max Drawdown < 50%
  - Минимум 30 дней торговли

#### Bybit

- Подача заявки через Web UI
- Требования:
  - Минимум 30 дней истории торговли
  - ROI > 15%
  - Win Rate > 50%
  - Max Drawdown < 50%

### Пошаговая настройка (OKX)

```typescript
// 1. Проверить статус
const status = await client.getLeadTraderStatus();

if (!status.isLeadTrader) {
  // 2. Подать заявку
  const result = await client.applyAsMasterTrader({
    exchange: 'okx',
    profitSharePercent: 10,     // 10% от прибыли followers
    minCopyAmount: 100,         // Минимум $100 для копирования
  });
  
  console.log('Application submitted:', result);
}

// 3. Настроить параметры
await client.updateMasterTraderSettings({
  profitSharePercent: 15,
  minCopyAmount: 100,
  maxCopyAmount: 10000,
  visible: true,
  requireApproval: false,
});

// 4. Управлять подписчиками
const followers = await client.getMasterFollowers(50);

// 5. Удалить подписчика (если нужно)
await client.removeMasterFollower(followerId);
```

### Настройка Profit Sharing

```typescript
// Рекомендуемые значения
const RECOMMENDED_PROFIT_SHARE = {
  conservative: 5,     // 5% - привлекательно для followers
  moderate: 10,        // 10% - стандарт
  aggressive: 15,      // 15% - высокий, может отпугнуть
};

// В MasterTraderPanel
<Settings>
  <Input
    type="number"
    value={settings.profitSharePercent}
    min={0}
    max={30}
  />
  <p className="text-xs text-muted-foreground">
    Процент от прибыли подписчиков, который вы получаете
  </p>
</Settings>
```

### TP/SL Ratio (Bitget)

Уникальная функция Bitget — процент подписчиков, которые автоматически скопируют TP/SL:

```typescript
// В MasterTraderPanel для Bitget
<Card>
  <CardTitle>Настройки TP/SL для копирования</CardTitle>
  <CardContent>
    <Input label="Auto Take Profit Ratio (%)" defaultValue={100} />
    <Input label="Auto Stop Loss Ratio (%)" defaultValue={100} />
  </CardContent>
</Card>

// При значении 100%:
// Все подписчики автоматически получат TP/SL Master Trader
```

---

## 5. Настройка Follower

### Поиск Master Trader

```typescript
// В CopyTradingPanel

// 1. Выбор биржи
<Select value={selectedExchange} onValueChange={setSelectedExchange}>
  <SelectItem value="okx">OKX</SelectItem>
  <SelectItem value="bitget">Bitget</SelectItem>
  <SelectItem value="binance">Binance</SelectItem>
  <SelectItem value="bybit">Bybit</SelectItem>
  <SelectItem value="bingx">BingX</SelectItem>
</Select>

// 2. Сортировка
<Select value={sortBy} onValueChange={setSortBy}>
  <SelectItem value="roi">ROI</SelectItem>
  <SelectItem value="winRate">Win Rate</SelectItem>
  <SelectItem value="followers">Followers</SelectItem>
  <SelectItem value="pnl">PnL</SelectItem>
</Select>
```

### Критерии выбора Master Trader

| Метрика | Рекомендация | Почему |
|---------|--------------|--------|
| ROI | 30-100% | Слишком высокий ROI = высокий риск |
| Win Rate | > 60% | Стабильность |
| Max Drawdown | < 15% | Контроль риска |
| Trading Days | > 90 | Достаточная история |
| Avg Leverage | < 5x | Умеренный риск |
| Followers | > 100 | Доверие сообщества |

### Подписка на Master Trader

```typescript
// В CopyTradingPanel

const handleSubscribe = async (traderId: string) => {
  // 1. Выбрать режим копирования
  const copyMode = 'fixed';  // 'fixed' | 'ratio' | 'percentage'
  const amount = 100;        // Сумма в USDT или множитель

  // 2. Настройки TP/SL
  const copyTpsl = true;     // Копировать TP/SL

  // 3. Отправить запрос
  await fetch('/api/copy-trading/subscribe', {
    method: 'POST',
    body: JSON.stringify({
      traderId,
      copyMode,
      amount,
      copyTpsl,
    }),
  });
};
```

### Управление подписками

```typescript
// Просмотр активных подписок
const subscriptions = [
  {
    traderId: '1',
    nickname: 'CryptoKing_OKX',
    exchange: 'okx',
    copyMode: 'fixed',
    amount: 100,
    active: true,
    totalPnl: 1568,
  },
];

// Приостановка подписки
const handlePause = async (traderId: string) => {
  await fetch('/api/copy-trading/pause', {
    method: 'POST',
    body: JSON.stringify({ traderId }),
  });
};

// Отписка
const handleUnsubscribe = async (traderId: string) => {
  await fetch('/api/copy-trading/unsubscribe', {
    method: 'POST',
    body: JSON.stringify({ traderId }),
  });
};
```

### Настройки по умолчанию

```typescript
// В Settings Tab CopyTradingPanel

const [newSubscription, setNewSubscription] = useState({
  copyMode: 'fixed',
  amount: 100,
  maxAmount: 500,    // Максимальная сумма на сделку
  copyTpsl: true,    // Копировать TP/SL
});
```

---

## 6. Метрики и статистика

### Performance Metrics

Отображаются в `CornixMetricsPanel` → Performance Tab:

| Метрика | Описание | Формула |
|---------|----------|---------|
| Total PnL | Общая прибыль/убыток | Σ (close_price - entry_price) × quantity |
| Win Rate | Процент прибыльных сделок | winning_trades / total_trades × 100 |
| Profit Factor | Отношение прибыли к убытку | gross_profit / gross_loss |
| Sharpe Ratio | Риск-скорректированная доходность | (return - risk_free_rate) / std_dev |
| Max Drawdown | Максимальная просадка | (peak - trough) / peak × 100 |
| Avg Hold Time | Среднее время удержания | Σ hold_time / total_trades |

### Signal Metrics

Отображаются в `CornixMetricsPanel` → Signals Tab:

```typescript
interface SignalMetrics {
  totalSignals: number;        // Всего получено сигналов
  successfulSignals: number;   // Успешно исполнено
  failedSignals: number;       // Ошибки исполнения
  pendingSignals: number;      // В ожидании
  avgExecutionTime: number;    // Среднее время исполнения (ms)
  successRate: number;         // % успешных
  signalsByExchange: {         // Распределение по биржам
    binance: number,
    bybit: number,
    okx: number,
    bitget: number,
    bingx: number,
  };
  signalsByPair: Array<{      // Топ торговых пар
    pair: string;
    count: number;
    pnl: number;
  }>;
}
```

### Copy Trading Metrics

Отображаются в `CornixMetricsPanel` → Copy Trading Tab:

```typescript
interface CopyTradingMetrics {
  activeFollowers: number;     // Активных подписчиков
  totalFollowers: number;      // Всего подписчиков
  totalCopiedTrades: number;   // Скопировано сделок
  avgFollowerPnl: number;      // Средний PnL подписчика
  profitShareEarned: number;   // Заработано на profit share
  topFollowers: Array<{        // Топ подписчики
    id: string;
    pnl: number;
    trades: number;
  }>;
}
```

### Equity Curve

Визуализация изменения капитала:

```typescript
// TimeSeriesData для equity curve
interface TimeSeriesData {
  date: string;      // YYYY-MM-DD
  pnl: number;       // PnL за день
  trades: number;    // Количество сделок
  equity: number;    // Капитал на конец дня
}

// Генерация demo данных
function generateEquityCurve(): TimeSeriesData[] {
  let equity = 500_00;  // Начальный капитал $50,000
  return Array.from({ length: 30 }, (_, i) => {
    const pnl = (Math.random() - 0.35) * 1000;
    equity += pnl;
    return {
      date: formatDate(i),
      pnl,
      trades: Math.floor(Math.random() * 10) + 1,
      equity,
    };
  });
}
```

---

## 7. API Эндпоинты

### Master Trader API

#### GET /api/master-trader

Получение данных Master Trader.

```typescript
// Request
GET /api/master-trader?exchange=okx

// Response
{
  success: true,
  data: {
    isConnected: true,
    isLeadTrader: true,
    followersCount: 125,
    activeFollowers: 98,
    settings: {
      profitSharePercent: 10,
      minCopyAmount: 100,
      maxCopyAmount: 10000,
      requireApproval: false,
      visible: true,
      totalProfitShared: 5680,
      totalTradesCopied: 1234,
    },
    followers: [
      {
        followerId: 'abc123',
        nickname: 'Follower1',
        subscribedAt: '2026-01-15',
        active: true,
        totalPnl: 1234.56,
        totalCopiedTrades: 45,
        totalVolume: 15000,
      },
    ],
    positions: [
      {
        symbol: 'BTCUSDT',
        side: 'long',
        quantity: 0.5,
        entryPrice: 98500,
        unrealizedPnl: 350,
        leverage: 5,
        followersCopying: 45,
        openedAt: '2026-03-10T12:00:00Z',
      },
    ],
  }
}
```

#### POST /api/master-trader

Управление Master Trader функциями.

```typescript
// Actions:

// 1. Подать заявку на Master Trader
POST /api/master-trader
{
  "exchange": "okx",
  "action": "apply",
  "profitSharePercent": 10,
  "nickname": "MyMasterTrader",
  "minCopyAmount": 100
}

// 2. Удалить подписчика
POST /api/master-trader
{
  "exchange": "okx",
  "action": "removeFollower",
  "followerId": "abc123"
}

// 3. Обновить настройки
POST /api/master-trader
{
  "exchange": "okx",
  "action": "updateSettings",
  "profitSharePercent": 15,
  "minCopyAmount": 200,
  "maxCopyAmount": 20000,
  "requireApproval": true,
  "visible": true
}
```

### Cornix API

#### GET /api/cornix/features

Получение настроек Cornix.

```typescript
// Request
GET /api/cornix/features

// Response
{
  success: true,
  data: {
    exchanges: [
      {
        id: 'binance',
        name: 'Binance',
        connected: true,
        apiKeyConfigured: true,
        permissions: ['trade', 'read'],
        lastSync: '2026-03-10T12:00:00Z',
        accountType: 'both',
      },
    ],
    signalStats: {
      totalSignals: 89,
      activeSignals: 3,
      executedSignals: 61,
      pendingSignals: 20,
      failedSignals: 5,
    },
    features: {
      autoTrading: false,
      signalParsing: true,
      webhookEnabled: true,
      notificationsEnabled: true,
      riskManagement: true,
      tpSlCopy: true,
      leverageLimit: 10,
      maxPositions: 5,
    },
  }
}
```

#### POST /api/cornix/features

Обновление настроек Cornix.

```typescript
// Toggle feature
POST /api/cornix/features
{
  "feature": "autoTrading",
  "value": true
}

// Update all features
POST /api/cornix/features
{
  "features": {
    "autoTrading": true,
    "signalParsing": true,
    "webhookEnabled": true,
    "notificationsEnabled": true,
    "riskManagement": true,
    "tpSlCopy": true,
    "leverageLimit": 10,
    "maxPositions": 5
  }
}
```

#### GET /api/cornix/metrics

Получение метрик Cornix.

```typescript
// Request
GET /api/cornix/metrics?period=30d

// Response
{
  success: true,
  data: {
    performance: {
      totalPnl: 12456.78,
      totalPnlPercent: 24.91,
      todayPnl: 345.67,
      winRate: 68.5,
      totalTrades: 156,
      profitFactor: 1.85,
      sharpeRatio: 2.15,
      maxDrawdown: 8.45,
    },
    signals: {
      totalSignals: 89,
      successfulSignals: 61,
      failedSignals: 8,
      avgExecutionTime: 1250,
      signalsByExchange: { binance: 32, bybit: 24, okx: 18 },
    },
    copyTrading: {
      activeFollowers: 12,
      totalFollowers: 15,
      totalCopiedTrades: 234,
      profitShareEarned: 1234.56,
    },
    equityCurve: [...],
  }
}
```

#### POST /api/webhook/tradingview

Приём TradingView/Cornix сигналов.

```typescript
// Request
POST /api/webhook/tradingview
Content-Type: application/json

{
  "symbol": "BTCUSDT",
  "side": "long",
  "entry": "45000-45500",
  "targets": ["46000", "47000", "48000"],
  "stop": "44000",
  "leverage": 10
}

// Response
{
  success: true,
  message: "Signal received and queued for execution",
  signalId: "sig_abc123"
}
```

---

## 8. Примеры использования

### Пример 1: Стать Master Trader на OKX

```typescript
import { getExchangeClient } from '@/lib/exchange';

async function becomeMasterTrader() {
  // 1. Создаём клиент
  const client = await getExchangeClient('okx', {
    apiKey: process.env.OKX_API_KEY,
    apiSecret: process.env.OKX_API_SECRET,
    passphrase: process.env.OKX_PASSPHRASE,
  });

  // 2. Проверяем текущий статус
  const status = await client.getLeadTraderStatus();
  
  if (status.isLeadTrader) {
    console.log('Already a Master Trader!');
    console.log(`Followers: ${status.followersCount}`);
    return;
  }

  // 3. Подаём заявку
  const result = await client.applyAsMasterTrader({
    exchange: 'okx',
    profitSharePercent: 10,
    minCopyAmount: 100,
  });

  if (result.success) {
    console.log('Application submitted successfully!');
  }
}
```

### Пример 2: Управление подписчиками

```typescript
async function manageFollowers() {
  const client = await getExchangeClient('okx', credentials);

  // Получить список подписчиков
  const followers = await client.getMasterFollowers(50);
  
  for (const follower of followers) {
    console.log(`${follower.nickname}:`);
    console.log(`  - Trades: ${follower.totalCopiedTrades}`);
    console.log(`  - PnL: $${follower.totalPnl}`);
    console.log(`  - Volume: $${follower.totalVolume}`);
    
    // Удалить неактивных подписчиков
    if (!follower.active) {
      await client.removeMasterFollower(follower.followerId);
      console.log(`  - Removed (inactive)`);
    }
  }
}
```

### Пример 3: Подписка на Master Trader

```typescript
async function subscribeToTrader() {
  const client = await getExchangeClient('okx', credentials);

  // Получить список Master Traders
  const traders = await client.getLeadTraders({
    sort: 'roi',
    limit: 10,
  });

  // Выбрать лучшего
  const bestTrader = traders[0];
  console.log(`Subscribing to ${bestTrader.nickname}...`);
  console.log(`ROI: ${bestTrader.roi}%`);
  console.log(`Win Rate: ${bestTrader.winRate}%`);

  // Подписаться
  await client.subscribeToTrader({
    traderId: bestTrader.traderId,
    copyMode: 'fixed',
    amount: 100,       // $100 на сделку
    copyTpsl: true,    // Копировать TP/SL
  });

  console.log('Subscribed successfully!');
}
```

### Пример 4: Cornix Signal Processing

```typescript
// Webhook endpoint для приёма сигналов
// POST /api/webhook/tradingview

import { parseCornixSignal } from '@/lib/cornix-parser';
import { executeSignal } from '@/lib/signal-executor';

export async function POST(request: Request) {
  const body = await request.json();
  
  // 1. Парсим сигнал (Cornix format)
  const signal = parseCornixSignal(body);
  
  if (!signal.valid) {
    return Response.json({ 
      success: false, 
      error: 'Invalid signal format' 
    }, { status: 400 });
  }

  // 2. Проверка риск-менеджмента
  if (signal.leverage > features.leverageLimit) {
    return Response.json({ 
      success: false, 
      error: `Leverage ${signal.leverage}x exceeds limit ${features.leverageLimit}x` 
    }, { status: 400 });
  }

  // 3. Исполняем сигнал
  const result = await executeSignal(signal, {
    exchanges: ['binance', 'bybit'],
    dryRun: !features.autoTrading,
  });

  return Response.json({
    success: result.success,
    signalId: result.signalId,
    message: result.message,
  });
}
```

### Пример 5: Отображение метрик в UI

```typescript
// Компонент для отображения ключевых метрик
function MetricsDisplay({ metrics }: { metrics: PerformanceMetrics }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <MetricCard
        label="Total PnL"
        value={`$${formatNumber(metrics.totalPnl)}`}
        trend={metrics.totalPnl >= 0 ? 'up' : 'down'}
        subValue={`${metrics.totalPnlPercent}%`}
      />
      <MetricCard
        label="Win Rate"
        value={`${metrics.winRate}%`}
        progress={metrics.winRate}
      />
      <MetricCard
        label="Profit Factor"
        value={metrics.profitFactor.toFixed(2)}
        subValue={`Sharpe: ${metrics.sharpeRatio.toFixed(2)}`}
      />
      <MetricCard
        label="Max Drawdown"
        value={`-${metrics.maxDrawdown}%`}
        variant="danger"
      />
    </div>
  );
}
```

---

## Best Practices

### Для Master Traders

1. **Выберите правильную биржу**
   - OKX или Bitget для полного API контроля
   - Binance/Bybit если нужна большая ликвидность

2. **Настройте Profit Sharing**
   - Обычно 5-15% от прибыли followers
   - Слишком высокий % отпугнёт подписчиков

3. **Торгуйте стабильно**
   - Низкий Max Drawdown важнее высокого ROI
   - Followers уходят при больших просадках

4. **Используйте TP/SL**
   - Bitget: настройте TP/SL Ratio = 100%
   - Это защитит и вас, и followers

5. **Коммуникация**
   - Описывайте стратегию в профиле
   - Регулярно обновляйте статистику

### Для Followers

1. **Диверсифицируйте**
   - Не подписывайтесь только на одного трейдера
   - Распределяйте капитал между 3-5 трейдерами

2. **Проверяйте историю**
   - Минимум 90 дней торговли
   - Стабильные результаты, а не одна удачная сделка

3. **Учитывайте риски**
   - Max Drawdown < 15%
   - Среднее плечо < 5x

4. **Начинайте с малого**
   - Тестируйте с минимальной суммой
   - Увеличивайте после проверки результатов

---

## Troubleshooting

### Частые проблемы

| Проблема | Решение |
|----------|---------|
| API недоступен | Используйте Web UI биржи для Binance, Bybit, BingX |
| Подписка не работает | Проверьте баланс и лимиты биржи |
| Позиции не копируются | Убедитесь, что включён autoTrading и есть активные подписки |
| Ошибки webhook | Проверьте формат сигнала, URL, права API ключа |

### Логирование

```typescript
// Логи в консоли браузера
console.log('[CopyTradingPanel] Subscribing to trader:', traderId);
console.log('[MasterTraderPanel] Fetching data for exchange:', exchange);
console.log('[CornixMetricsPanel] Error:', error);
```

---

## Ссылки

- [Copy Trading API Documentation](/docs/trading/copy-trading.md)
- [UI Components Audit](/docs/UI_COMPONENTS_AUDIT.md)
- [Cornix Signal Format](https://help.cornix.io/en/articles/5814956-signal-posting)
- [OKX Copy Trading API](https://www.okx.com/docs-v5/en/#copy-trading-rest-api)
- [Bitget Copy Trading API](https://bitgetlimited.github.io/apidoc/en/copyTrade)

---

*Документация обновлена: Март 2026*
