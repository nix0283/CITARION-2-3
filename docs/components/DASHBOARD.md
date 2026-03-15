# 📊 Dashboard Components

**Version:** 2.0 | **Last Updated:** March 2026 | **Status:** Production

---

## 📋 Обзор

Раздел Dashboard является главным информационным центром CITARION, предоставляя пользователю мгновенный доступ к ключевым метрикам торговли, состоянию ботов и рыночной аналитике.

### Архитектура Dashboard

```
src/components/dashboard/
├── balance-widget.tsx           # Виджет баланса
├── trades-history.tsx           # История сделок
├── positions-table.tsx          # Таблица позиций
├── market-forecast-widget.tsx   # Прогноз рынка
├── market-overview.tsx          # Обзор рынков
├── active-grid-bots.tsx         # Активные Grid боты (Архитектор)
├── bot-status.tsx               # Статус торгового бота
├── funding-rate-widget.tsx      # Funding Rate виджет
├── active-argus-bots.tsx        # Активные Argus боты
├── signal-feed.tsx              # Лента сигналов
├── active-bb-bots.tsx           # Активные BB боты (Рид)
└── active-dca-bots.tsx          # Активные DCA боты (Крон)

src/components/bots/
├── vision-bot-manager.tsx       # Vision бот (Market Forecast)
└── orion-bot-manager.tsx        # Orion бот (Trend-Following)
```

---

## 1. Balance Widget

### Описание
Отображает общий баланс пользователя, P&L статистику и распределение активов. Поддерживает DEMO и REAL режимы.

### Расположение
`src/components/dashboard/balance-widget.tsx`

### Props Interface

```typescript
interface BalanceWidgetProps {
  // Компонент не принимает props - использует глобальный store
}

interface Balance {
  USDT: number;
  BTC: number;
  ETH: number;
}

interface VirtualBalance {
  USDT: number;
  BTC: number;
  ETH: number;
}
```

### Состояние компонента

```typescript
const [isLoading, setIsLoading] = useState(true);
const [prevBalance, setPrevBalance] = useState<number | null>(null);
const [balanceFlash, setBalanceFlash] = useState<"positive" | "negative" | null>(null);
```

### Используемые данные из Store

```typescript
const { account, trades, positions, resetDemoBalance } = useCryptoStore();

// Расчёты
const balance = account?.virtualBalance || { USDT: 0, BTC: 0, ETH: 0 };
const totalPnl = trades.reduce((sum, trade) => sum + trade.pnl, 0);
const unrealizedPnl = positions.reduce((sum, pos) => sum + pos.unrealizedPnl, 0);
const totalBalance = balance.USDT + unrealizedPnl;
const winRate = trades.length > 0 ? (winningTrades / trades.length) * 100 : 0;
```

### Пример использования

```tsx
import { BalanceWidget } from '@/components/dashboard/balance-widget';

// В составе Dashboard
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <BalanceWidget />
</div>
```

### Функциональность

| Функция | Описание |
|---------|----------|
| **Отображение баланса** | Общий баланс с учётом нереализованного P&L |
| **P&L статистика** | Реализованный и нереализованный P&L |
| **Распределение активов** | USDT, BTC, ETH с процентами |
| **Win Rate** | Процент прибыльных сделок |
| **Анимация** | Flash-эффект при изменении баланса |
| **DEMO режим** | Кнопка сброса демо-счёта |

### WebSocket события

```typescript
// Подписка на обновления баланса
ws.subscribe('balance:update', (data) => {
  // Автоматическое обновление через store
});
```

### Скриншот
```
┌─────────────────────────────────────┐
│ 📊 Баланс [DEMO]      Виртуальный счёт │
├─────────────────────────────────────┤
│ Общий баланс                         │
│ $10,245.50 USDT                      │
│                                      │
│ ┌────────────┐ ┌────────────┐        │
│ │ ↑ +$245.50 │ │ $0.00      │        │
│ │ Реализ. P&L│ │ Нереализ.  │        │
│ └────────────┘ └────────────┘        │
│                                      │
│ Активы                               │
│ 💵 USDT    10,245.50    99.5%        │
│ ₿ BTC     0.00005      0.5%          │
│                                      │
│ Всего сделок: 45    Win Rate: 62.5%  │
│                                      │
│ [🔄 Сбросить демо-счёт]              │
└─────────────────────────────────────┘
```

---

## 2. Trades History

### Описание
Таблица истории всех сделок с фильтрацией по режиму (DEMO/REAL) и статусу (OPEN/CLOSED). Поддерживает функцию шаринга сделок.

### Расположение
`src/components/dashboard/trades-history.tsx`

### Props Interface

```typescript
interface TradesHistoryProps {
  // Компонент не принимает props
}

interface Trade {
  id: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  status: "OPEN" | "CLOSED";
  entryPrice?: number;
  exitPrice?: number;
  pnl: number;
  pnlPercent?: number;
  leverage?: number;
  amount: number;
  isDemo: boolean;
  createdAt: string;
}
```

### Состояние компонента

```typescript
const [filter, setFilter] = useState<"all" | "DEMO" | "REAL">("all");
const [statusFilter, setStatusFilter] = useState<"all" | "OPEN" | "CLOSED">("all");
const [showShareCard, setShowShareCard] = useState(false);
const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
```

### Пример использования

```tsx
import { TradesHistory } from '@/components/dashboard/trades-history';

<Card className="col-span-2">
  <TradesHistory />
</Card>
```

### API интеграция

```typescript
// Данные получаются из store
const { trades, account } = useCryptoStore();

// Фильтрация
const filteredTrades = trades.filter((trade) => {
  if (filter === "DEMO" && !trade.isDemo) return false;
  if (filter === "REAL" && trade.isDemo) return false;
  if (statusFilter === "OPEN" && trade.status !== "OPEN") return false;
  if (statusFilter === "CLOSED" && trade.status !== "CLOSED") return false;
  return true;
});
```

### Функциональность

| Функция | Описание |
|---------|----------|
| **Фильтр по режиму** | Все / DEMO / REAL |
| **Фильтр по статусу** | Все / Открытые / Закрытые |
| **Share Card** | Диалог для шаринга закрытых сделок |
| **Сортировка** | По дате (новые сверху) |
| **Цветовая индикация** | Зелёный для прибыли, красный для убытка |

### Скриншот
```
┌───────────────────────────────────────────────────────────────┐
│ 📜 История сделок                          45  [All ▼][Все ▼] │
├───────────────────────────────────────────────────────────────┤
│ Пара   │Сторона│Статус │Вход    │Выход   │PnL      │Дата     │
│────────┼───────┼───────┼────────┼────────┼─────────┼─────────│
│BTC/USDT│ ↑ LONG│CLOSED │$67,000 │$68,500 │+$150.00 │15:30    │
│ETH/USDT│ ↓SHORT│OPEN   │$3,520  │-       │-$25.00  │14:45    │
│SOL/USDT│ ↑ LONG│CLOSED │$170    │$175    │+$50.00  │12:20    │
└───────────────────────────────────────────────────────────────┘
```

---

## 3. Positions Table

### Описание
Отображает все открытые позиции с информацией об источнике (CHAT, TELEGRAM, PLATFORM, SIGNAL), текущем P&L и возможностью мгновенного закрытия.

### Расположение
`src/components/dashboard/positions-table.tsx`

### Props Interface

```typescript
interface PositionsTableProps {
  // Компонент не принимает props
}

interface ApiPosition {
  id: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  totalAmount: number;
  avgEntryPrice: number;
  currentPrice: number;
  leverage: number;
  unrealizedPnl: number;
  stopLoss: number | null;
  takeProfit: number | null;
  createdAt: string;
  source?: "CHAT" | "TELEGRAM" | "PLATFORM" | "EXTERNAL" | "SIGNAL";
  account: {
    exchangeId: string;
    exchangeName: string;
    isTestnet: boolean;
  };
}
```

### Состояние компонента

```typescript
const [apiPositions, setApiPositions] = useState<ApiPosition[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [closingId, setClosingId] = useState<string | null>(null);
const [showShareCard, setShowShareCard] = useState(false);
const [selectedPosition, setSelectedPosition] = useState<ApiPosition | null>(null);
```

### API интеграция

```typescript
// Fetch positions
const fetchPositions = useCallback(async () => {
  const response = await fetch("/api/demo/trade");
  const data = await response.json();
  if (data.success) {
    setApiPositions(data.positions || []);
  }
}, []);

// Close position
const handleClosePosition = async (positionId: string) => {
  const response = await fetch("/api/demo/close", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ positionId }),
  });
  // ...
};
```

### WebSocket события

```typescript
// Прослушивание событий
window.addEventListener("position-opened", handlePositionOpened);
window.addEventListener("position-closed", handlePositionClosed);

// Диспатч события закрытия
window.dispatchEvent(new CustomEvent("position-closed", { 
  detail: { positionId } 
}));
```

### Источники позиций

| Источник | Иконка | Цвет | Описание |
|----------|--------|------|----------|
| CHAT | MessageSquare | blue | Открыта через Chat Bot |
| TELEGRAM | Bot | sky | Открыта через Telegram |
| EXTERNAL | ExternalLink | purple | Внешний источник |
| SIGNAL | TrendingUp | amber | По сигналу |
| PLATFORM | Monitor | gray | Открыта вручную на платформе |

### Скриншот
```
┌────────────────────────────────────────────────────────────────────────┐
│ 📊 Открытые позиции                              3  [🔄]             │
├────────────────────────────────────────────────────────────────────────┤
│Биржа  │Пара    │Сторона│Источник│Размер  │Вход    │Текущая │PnL      │
│───────┼────────┼───────┼────────┼────────┼────────┼────────┼─────────│
│Binance│BTC/USDT│↑ LONG │💬 Chat │0.0150  │$67,000 │$67,500 │+$75.00  │
│Bybit  │ETH/USDT│↓SHORT │🤖 TG   │0.5000  │$3,520  │$3,510  │+$50.00  │
│OKX    │SOL/USDT│↑ LONG │⚡Signal│5.0000  │$170    │$168    │-$20.00  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Market Forecast Widget

### Описание
Отображает ML-прогноз направления рынка с вероятностями движения (Up/Down/Consolidation) и ключевыми индикаторами.

### Расположение
`src/components/dashboard/market-forecast-widget.tsx`

### Props Interface

```typescript
interface MarketForecastWidgetProps {
  // Компонент не принимает props
}

interface MarketForecast {
  timestamp: string;
  symbol: string;
  probabilities: {
    upward: number;      // 0-1
    downward: number;    // 0-1
    consolidation: number; // 0-1
  };
  signal: "LONG" | "SHORT" | "NEUTRAL";
  confidence: number;    // 0-1
  indicators: {
    roc_24h: number;     // Rate of Change
    atr_pct: number;     // Average True Range %
    trend_strength: number;
    volume_ratio: number;
  };
}
```

### Состояние компонента

```typescript
const [forecast, setForecast] = useState<MarketForecast | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
```

### API интеграция

```typescript
const fetchForecast = async () => {
  setIsLoading(true);
  try {
    const response = await fetch("/api/bots/vision?action=forecast");
    const data = await response.json();
    if (data.success && data.forecast) {
      setForecast(data.forecast);
      setLastUpdate(new Date());
    }
  } finally {
    setIsLoading(false);
  }
};
```

### Автообновление

```typescript
useEffect(() => {
  fetchForecast();
  // Обновление каждые 5 минут
  const interval = setInterval(fetchForecast, 5 * 60 * 1000);
  return () => clearInterval(interval);
}, []);
```

### Цветовая кодировка сигналов

| Сигнал | Цвет | Иконка |
|--------|------|--------|
| LONG | green-500 | TrendingUp |
| SHORT | red-500 | TrendingDown |
| NEUTRAL | yellow-500 | Minus |

### Скриншот
```
┌─────────────────────────────┐
│ 🧠 Market Forecast    [🔄]  │
├─────────────────────────────┤
│ ↑ LONG           85% conf   │
│                             │
│ ↑ Up      ████████░░ 75%    │
│ ↓ Down    ██░░░░░░░░ 15%    │
│ ─ Cons    █░░░░░░░░░ 10%    │
│                             │
│ ROC 24h: +2.45%  │ ATR: 1.2%│
│ Trend: +45.00%   │ Vol: 1.5x│
│                             │
│ Updated: 15:30:45           │
└─────────────────────────────┘
```

---

## 5. Market Overview

### Описание
Настраиваемый виджет для отслеживания цен до 30 торговых пар с разных бирж в реальном времени через WebSocket.

### Расположение
`src/components/dashboard/market-overview.tsx`

### Props Interface

```typescript
interface MarketOverviewProps {
  // Компонент не принимает props
}

interface SelectedPair {
  symbol: string;
  exchange: string;
}

interface MarketSettingsType {
  id: string;
  selectedPairs: SelectedPair[];
  showExchangeColumn: boolean;
  show24hChange: boolean;
  showVolume: boolean;
  sortBy: string;
  sortDirection: string;
}

interface MarketPrice {
  symbol: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
}
```

### Состояние компонента

```typescript
const [settings, setSettings] = useState<MarketSettingsType | null>(null);
const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
const [editPairs, setEditPairs] = useState<SelectedPair[]>([]);
const [searchSymbol, setSearchSymbol] = useState('');
const [loading, setLoading] = useState(true);
```

### Поддерживаемые биржи

```typescript
const AVAILABLE_EXCHANGES = [
  { value: 'binance', label: 'Binance' },
  { value: 'bybit', label: 'Bybit' },
  { value: 'okx', label: 'OKX' },
  { value: 'bitget', label: 'Bitget' },
  { value: 'kucoin', label: 'KuCoin' },
  { value: 'bingx', label: 'BingX' },
  { value: 'hyperliquid', label: 'HyperLiquid' },
];
```

### Популярные символы

```typescript
const POPULAR_SYMBOLS = [
  'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT', 'DOGEUSDT',
  'ADAUSDT', 'AVAXUSDT', 'LINKUSDT', 'MATICUSDT', 'DOTUSDT', 'LTCUSDT',
  // ... всего 30 символов
];
```

### API интеграция

```typescript
// Fetch настроек
const fetchSettings = useCallback(async () => {
  const response = await fetch('/api/market-settings');
  const data = await response.json();
  if (data.success) {
    setSettings(data.settings);
  }
}, []);

// Save настроек
const saveSettings = async () => {
  const response = await fetch('/api/market-settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      selectedPairs: editPairs,
      showExchangeColumn: true,
      show24hChange: true,
      showVolume: false,
    }),
  });
  // ...
};
```

### WebSocket интеграция

```typescript
import { usePriceContext } from "@/components/providers/price-provider";

const { prices: wsPrices, exchangeNames } = usePriceContext();

// Приоритет источников цены
const getPrice = (symbol: string): MarketPrice | null => {
  // 1. WebSocket prices
  if (wsPrices[symbol]) return wsPrices[symbol];
  // 2. Store prices
  if (marketPrices[symbol]) return marketPrices[symbol];
  // 3. Demo prices
  return DEMO_PRICES[symbol] || null;
};
```

### Скриншот
```
┌──────────────────────────────────────┐
│ 📈 Рынки              8/30 [⚙️]      │
├──────────────────────────────────────┤
│ Пара     │Биржа  │Цена      │24ч    │
│──────────┼───────┼──────────┼───────│
│ BTC/USDT │Binance│$67,432.50│↑+2.45%│
│ ETH/USDT │Binance│$3,521.80 │↓-0.82%│
│ SOL/USDT │Bybit  │$172.30   │↑+4.56%│
│ BNB/USDT │Binance│$598.45   │↑+1.23%│
└──────────────────────────────────────┘
```

---

## 6. Active Grid Bots (Архитектор)

### Описание
Отображает активные Grid боты (код: MESH) с возможностью управления и просмотра ключевых метрик.

### Расположение
`src/components/dashboard/active-grid-bots.tsx`

### Props Interface

```typescript
interface ActiveGridBotsProps {
  // Компонент не принимает props
}

interface ActiveGridBot {
  id: string;
  name: string;
  symbol: string;
  exchangeId: string;
  status: "RUNNING" | "PAUSED" | "STOPPED";
  totalProfit: number;
  totalTrades: number;
  realizedPnL: number;
  gridCount: number;
  upperPrice: number;
  lowerPrice: number;
  leverage: number;
  startedAt: string | null;
}
```

### Состояние компонента

```typescript
const [bots, setBots] = useState<ActiveGridBot[]>([]);
const [loading, setLoading] = useState(true);
```

### API интеграция

```typescript
// Fetch bots
const fetchBots = useCallback(async () => {
  const response = await fetch('/api/bots/active?type=grid');
  const data = await response.json();
  if (data.success) {
    setBots(data.bots.grid || []);
  }
}, []);

// Bot action
const handleBotAction = async (botId: string, action: 'stop' | 'start') => {
  const response = await fetch('/api/bots/grid', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ botId, action }),
  });
  // ...
};
```

### Навигация

```typescript
const { setActiveTab } = useCryptoStore();

// Переход к управлению ботами
<Button onClick={() => setActiveTab('grid-bot')}>
  Все боты Архитектор
</Button>
```

### Скриншот
```
┌──────────────────────────────────────┐
│ 🏗️ Архитектор (GRD)      2 активных  │
├──────────────────────────────────────┤
│ ┌────────────────────────────────┐   │
│ │ BTC-Grid-1      [RUNNING] [⏹] │   │
│ │ BTCUSDT • binance • 10 уровней │   │
│ │                                │   │
│ │ $245.50  │ 156 сделок │ 5x     │   │
│ │ PnL      │            │ Плечо  │   │
│ │                                │   │
│ │ $65,000 ───────────── $70,000  │   │
│ └────────────────────────────────┘   │
│                                      │
│ [↗ Все боты Архитектор]              │
└──────────────────────────────────────┘
```

---

## 7. Bot Status

### Описание
Панель управления основным торговым ботом с настройками риск-менеджмента и автоматизации.

### Расположение
`src/components/dashboard/bot-status.tsx`

### Props Interface

```typescript
interface BotStatusProps {
  // Компонент не принимает props
}
```

### Состояние компонента

```typescript
const [isEnabled, setIsEnabled] = useState(false);
const [riskPerTrade, setRiskPerTrade] = useState([2]); // Slider value
const [maxPositions, setMaxPositions] = useState([5]);
const [defaultLeverage, setDefaultLeverage] = useState("10");
const [trailingStop, setTrailingStop] = useState(false);
const [autoTP, setAutoTP] = useState(true);
const [autoSL, setAutoSL] = useState(true);
```

### Настройки риск-менеджмента

| Параметр | Диапазон | Шаг | По умолчанию |
|----------|----------|-----|--------------|
| Риск на сделку | 0.5% - 10% | 0.5% | 2% |
| Макс. позиций | 1 - 20 | 1 | 5 |
| Дефолтное плечо | 1x - 100x | - | 10x |

### Настройки автоматизации

| Опция | Описание |
|-------|----------|
| Auto Take Profit | Автоматическое закрытие на TP |
| Auto Stop Loss | Автоматическое закрытие на SL |
| Trailing Stop | Следящий стоп-лосс |

### Пример использования

```tsx
import { BotStatus } from '@/components/dashboard/bot-status';

<div className="grid gap-4 md:grid-cols-2">
  <BotStatus />
</div>
```

### Скриншот
```
┌──────────────────────────────────────┐
│ 🤖 Торговый бот       Остановлен [○] │
├──────────────────────────────────────┤
│ ┌──────────────────────────────────┐ │
│ │ ⚡ Бот на паузе                  │ │
│ │ Нажмите переключатель для запуска│ │
│ └──────────────────────────────────┘ │
│                                      │
│ 🛡️ Управление рисками               │
│ Риск на сделку    2%                 │
│ ├─────●─────────────┤ 0.5% - 10%    │
│                                      │
│ Макс. позиций     5                  │
│ ├───●───────────────┤ 1 - 20        │
│                                      │
│ Дефолтное плечо   [10x ▼]            │
│                                      │
│ 🎯 Автоматизация                     │
│ Auto Take Profit  [✓]                │
│ Auto Stop Loss    [✓]                │
│ Trailing Stop     [ ]                │
│                                      │
│ [⚙️ Сохранить настройки]             │
└──────────────────────────────────────┘
```

---

## 8. Funding Rate Widget

### Описание
Отображает текущие funding rates для отслеживания стоимости удержания позиций на фьючерсных рынках.

### Расположение
`src/components/dashboard/funding-rate-widget.tsx`

### Props Interface

```typescript
interface FundingRateWidgetProps {
  // Компонент не принимает props
}

interface FundingRate {
  symbol: string;
  exchange: string;
  rate: number;          // Десятичная дробь (0.001 = 0.1%)
  markPrice: number;
  timestamp: string;
}

interface FundingPayment {
  symbol: string;
  direction: string;
  payment: number;
  fundingTime: string;
}
```

### Состояние компонента

```typescript
const [fundingRates, setFundingRates] = useState<FundingRate[]>([]);
const [totalFunding, setTotalFunding] = useState<number>(0);
const [isLoading, setIsLoading] = useState(false);
const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
```

### API интеграция

```typescript
const fetchFundingRates = async () => {
  setIsLoading(true);
  try {
    const response = await fetch("/api/funding?rates=true");
    const data = await response.json();
    if (data.success) {
      setFundingRates(data.rates || []);
      setTotalFunding(data.totalFunding || 0);
      setLastUpdate(new Date());
    }
  } finally {
    setIsLoading(false);
  }
};
```

### Интерпретация Funding Rate

| Rate | Статус | Цвет | Интерпретация |
|------|--------|------|---------------|
| > 0.1% | High Long | green | Лонгисты платят шортистам |
| < -0.1% | High Short | red | Шортисты платят лонгистам |
| ±0.1% | Normal | gray | Нормальные условия |

### Автообновление

```typescript
useEffect(() => {
  fetchFundingRates();
  // Каждые 10 минут
  const interval = setInterval(fetchFundingRates, 10 * 60 * 1000);
  return () => clearInterval(interval);
}, []);
```

### Скриншот
```
┌─────────────────────────────────────┐
│ 📈 Funding Rates              [🔄]  │
├─────────────────────────────────────┤
│ Total Funding (24h): +$12.50        │
├─────────────────────────────────────┤
│ BTCUSDT    $67,432    +0.0100%      │
│            Binance                  │
│ ETHUSDT    $3,521     +0.0050%      │
│            Bybit                    │
│ SOLUSDT    $172       -0.0020%      │
│            OKX                      │
├─────────────────────────────────────┤
│ ⚠️ Высокий funding rate. Проверьте  │
│    позиции.                         │
│                                     │
│ Updated: 15:30:45                   │
└─────────────────────────────────────┘
```

---

## 9. Active Argus Bots

### Описание
Отображает активные Argus боты (код: PND) для детекции pump & dump на рынке.

### Расположение
`src/components/dashboard/active-argus-bots.tsx`

### Props Interface

```typescript
interface ActiveArgusBotsProps {
  // Компонент не принимает props
}

interface ArgusBot {
  id: string;
  name: string;
  status: "ACTIVE" | "PAUSED" | "STOPPED";
  exchange: string;
  currentSignal: "LONG" | "SHORT" | "NEUTRAL";
  useMarketForecast: boolean;
  signals24h: number;
  lastSignal?: {
    symbol: string;
    direction: "LONG" | "SHORT";
    type: string;
    timestamp: string;
  };
}
```

### Состояние компонента

```typescript
const [bots, setBots] = useState<ArgusBot[]>([]);
const [isLoading, setIsLoading] = useState(false);
```

### API интеграция

```typescript
const fetchBots = async () => {
  const response = await fetch("/api/bots/argus");
  const data = await response.json();
  if (data.success) {
    setBots((data.bots || []).filter((b: ArgusBot) => b.status === "ACTIVE"));
  }
};

const handleToggleBot = async (botId: string, currentStatus: string) => {
  const action = currentStatus === "ACTIVE" ? "pause" : "start";
  await fetch("/api/bots/argus", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, botId }),
  });
  fetchBots();
};
```

### Скриншот
```
┌─────────────────────────────────────┐
│ 👁️ Argus Bots            2 active  │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 🟢 Argus-BTC-1          [⏸]    │ │
│ │ binance ⚡Forecast             │ │
│ │                    ↑ LONG      │ │
│ │                    15 signals/24h│
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 🟢 Argus-ETH-1          [⏸]    │ │
│ │ bybit                          │ │
│ │                    ─ NEUTRAL   │ │
│ │                    8 signals/24h │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## 10. Signal Feed

### Описание
Лента торговых сигналов в реальном времени с различных источников (Telegram, Discord, TradingView, Manual).

### Расположение
`src/components/dashboard/signal-feed.tsx`

### Props Interface

```typescript
interface SignalFeedProps {
  // Компонент не принимает props
}

interface Signal {
  id: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  action: "BUY" | "SELL" | "CLOSE";
  entryPrices: number[];
  takeProfits: { price: number; percentage: number }[];
  stopLoss?: number;
  leverage: number;
  source: "TELEGRAM" | "DISCORD" | "TRADINGVIEW" | "MANUAL";
  status: "PENDING" | "EXECUTED" | "IGNORED";
  createdAt: string;
}
```

### Состояние компонента

```typescript
const [signals, setSignals] = useState<Signal[]>(DEMO_SIGNALS);
const isDemo = account?.accountType === "DEMO";
```

### Источники сигналов

| Источник | Иконка | Описание |
|----------|--------|----------|
| TELEGRAM | MessageSquare | Telegram каналы сигналов |
| DISCORD | Radio | Discord каналы |
| TRADINGVIEW | Zap | TradingView алерты |
| MANUAL | Zap | Ручные сигналы |

### Статусы сигналов

| Статус | Иконка | Цвет | Описание |
|--------|--------|------|----------|
| EXECUTED | CheckCircle | green | Исполнен |
| PENDING | Clock | yellow | Ожидает исполнения |
| IGNORED | XCircle | red | Игнорирован |

### Пример использования

```tsx
import { SignalFeed } from '@/components/dashboard/signal-feed';

<Card className="col-span-1">
  <SignalFeed />
</Card>
```

### Скриншот
```
┌─────────────────────────────────────┐
│ 📻 Лента сигналов          [DEMO]   │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ [↑ LONG] BTC/USDT  10x         │ │
│ │                        [✓ Исполнен]│
│ │ Вход: $67,000, $66,500         │ │
│ │ TP: $68,000 (30%), $69,000 (40%)│ │
│ │ SL: $65,000                     │ │
│ │ 💬 TELEGRAM • 15 мин назад      │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ [↑ LONG] ETH/USDT  5x          │ │
│ │                        [⏳ Ожидание]│
│ │ Вход: $3,500                   │ │
│ │ TP: $3,600 (50%), $3,700 (50%) │ │
│ │ SL: $3,400                      │ │
│ │ ⚡ TRADINGVIEW • 5 мин назад    │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## 11. Active BB Bots (Рид)

### Описание
Отображает активные Bollinger Bands боты (код: BAND) с метриками производительности.

### Расположение
`src/components/dashboard/active-bb-bots.tsx`

### Props Interface

```typescript
interface ActiveBBBotsProps {
  // Компонент не принимает props
}

interface ActiveBBBot {
  id: string;
  name: string;
  symbol: string;
  exchangeId: string;
  marketType: string;
  direction: "LONG" | "SHORT" | "HEDGE";
  status: "RUNNING" | "PAUSED" | "STOPPED";
  totalProfit: number;
  totalTrades: number;
  winTrades: number;
  lossTrades: number;
  realizedPnL: number;
  timeframes: string;  // JSON array
  leverage: number;
  startedAt: string | null;
}
```

### Состояние компонента

```typescript
const [bots, setBots] = useState<ActiveBBBot[]>([]);
const [loading, setLoading] = useState(true);
```

### API интеграция

```typescript
const fetchBots = useCallback(async () => {
  const response = await fetch('/api/bots/active?type=bb');
  const data = await response.json();
  if (data.success) {
    setBots(data.bots.bb || []);
  }
}, []);

const handleBotAction = async (botId: string, action: 'stop' | 'start' | 'pause') => {
  const response = await fetch('/api/bots/bb', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ botId, action }),
  });
  // ...
};
```

### Расчёт Win Rate

```typescript
const winRate = (bot: ActiveBBBot) => 
  bot.totalTrades > 0 
    ? ((bot.winTrades / bot.totalTrades) * 100).toFixed(0) 
    : '0';
```

### Скриншот
```
┌──────────────────────────────────────┐
│ 📊 Рид (BBB)              1 активных │
├──────────────────────────────────────┤
│ ┌────────────────────────────────┐   │
│ │ BB-BTC-1 ↑ LONG [SPOT] [RUNNING]│  │
│ │ BTCUSDT • binance • 1h, 4h     │   │
│ │                                │   │
│ │ $156.20 │ 89 сделок │ 67% │ 5x │   │
│ │ PnL     │           │ Win  │Плечо│   │
│ │                                │   │
│ │ ████████████░░░░░░░ 60W / 29L  │   │
│ └────────────────────────────────┘   │
│                                      │
│ [↗ Все боты Рид]                     │
└──────────────────────────────────────┘
```

---

## 12. Active DCA Bots (Крон)

### Описание
Отображает активные DCA (Dollar Cost Averaging) боты (код: SCALE) с прогрессом уровней.

### Расположение
`src/components/dashboard/active-dca-bots.tsx`

### Props Interface

```typescript
interface ActiveDcaBotsProps {
  // Компонент не принимает props
}

interface ActiveDcaBot {
  id: string;
  name: string;
  symbol: string;
  exchangeId: string;
  status: "RUNNING" | "PAUSED" | "STOPPED";
  direction: "LONG" | "SHORT";
  totalInvested: number;
  totalAmount: number;
  avgEntryPrice: number | null;
  realizedPnL: number;
  totalTrades: number;
  currentLevel: number;
  dcaLevels: number;
  startedAt: string | null;
}
```

### Состояние компонента

```typescript
const [bots, setBots] = useState<ActiveDcaBot[]>([]);
const [loading, setLoading] = useState(true);
```

### API интеграция

```typescript
const fetchBots = useCallback(async () => {
  const response = await fetch('/api/bots/active?type=dca');
  const data = await response.json();
  if (data.success) {
    setBots(data.bots.dca || []);
  }
}, []);
```

### Отображение DCA прогресса

```typescript
<Progress 
  value={(bot.currentLevel / bot.dcaLevels) * 100} 
  className="h-1"
/>
<span>{bot.currentLevel}/{bot.dcaLevels}</span>
```

### Скриншот
```
┌──────────────────────────────────────┐
│ 📚 Крон (DCA)             1 активных │
├──────────────────────────────────────┤
│ ┌────────────────────────────────┐   │
│ │ DCA-ETH-1 ↑ LONG  [RUNNING]    │   │
│ │ ETHUSDT • binance • LONG       │   │
│ │                                │   │
│ │ $45.20  │ $500     │ 12 сделок │   │
│ │ PnL     │ Инвест.  │           │   │
│ │                                │   │
│ │ DCA Уровень      3/5           │   │
│ │ ████████████░░░░░░░░░░░░░░░░░░ │   │
│ └────────────────────────────────┘   │
│                                      │
│ [↗ Все боты Крон]                    │
└──────────────────────────────────────┘
```

---

## 13. Active Vision Bots

### Описание
Vision бот (код: FCST) для прогнозирования рынка с использованием ML-моделей и вероятностного анализа.

### Расположение
`src/components/bots/vision-bot-manager.tsx`

### Props Interface

```typescript
interface VisionBotManagerProps {
  // Компонент не принимает props
}

interface VisionBot {
  id: string;
  name: string;
  isRunning: boolean;
  strategy: "basic" | "multi_tp" | "trailing" | "reentry_24h";
  riskProfile: "easy" | "normal" | "hard" | "scalper";
  currentSignal: "LONG" | "SHORT" | "NEUTRAL";
  currentForecast?: MarketForecast;
  equity: number;
  totalReturn: number;
  winRate: number;
}

interface MarketForecast {
  timestamp: string;
  symbol: string;
  probabilities: {
    upward: number;
    downward: number;
    consolidation: number;
  };
  signal: "LONG" | "SHORT" | "NEUTRAL";
  confidence: number;
  indicators: {
    roc_24h: number;
    atr_pct: number;
    trend_strength: number;
    volume_ratio: number;
  };
}

interface EnsembleScore {
  lawrence: number;
  ml: number;
  forecast: number;
  overall: number;
  direction: "LONG" | "SHORT" | "NEUTRAL";
}
```

### Доступные стратегии

| Стратегия | Описание |
|-----------|----------|
| basic | Фиксированный SL 2% / TP 4% |
| multi_tp | Множественные TP: 2%, 4%, 6% |
| trailing | Trailing stop 2% |
| reentry_24h | Ре-энтри до 3 раз, SL 3% |

### Профили риска

| Профиль | Плечо | Риск |
|---------|-------|------|
| easy | 2x | 5% |
| normal | 3x | 10% |
| hard | 5x | 15% |
| scalper | 10x | 2% |

### API интеграция

```typescript
// Fetch bots
const fetchBots = async () => {
  const response = await fetch("/api/bots/vision");
  const data = await response.json();
  if (data.success) {
    setBots(data.bots || []);
  }
};

// Fetch forecast
const fetchForecast = async () => {
  const response = await fetch("/api/bots/vision?action=forecast");
  const data = await response.json();
  if (data.success && data.forecast) {
    setCurrentForecast(data.forecast);
  }
};

// Create bot
const handleCreateBot = async () => {
  const response = await fetch("/api/bots/vision?action=create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...newBot,
      filterEnabled,
      filterConfig,
    }),
  });
};

// Backtest
const handleRunBacktest = async () => {
  const response = await fetch("/api/bots/vision?action=backtest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...backtestParams,
      filterEnabled,
    }),
  });
};
```

### Ensemble Signal Filter

```typescript
// Компоненты Ensemble
const ensembleScore = {
  lawrence: forecast.confidence * 0.9 + Math.random() * 0.1,
  ml: forecast.confidence * 0.85 + Math.random() * 0.15,
  forecast: forecast.confidence,
  overall: (lawrence + ml + forecastScore) / 3,
};

// Рекомендация
if (ensembleScore.overall >= 0.7) return "ENTER";
if (ensembleScore.overall >= 0.5) return "WAIT";
return "AVOID";
```

### Скриншот
```
┌───────────────────────────────────────────────┐
│ 👁️ Vision - Market Forecast                   │
├───────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐   │
│ │ ✨ Ensemble Signal Filter         [ON]  │   │
│ │                                         │   │
│ │ ┌─────────┐ ┌─────────┐ ┌─────────┐    │   │
│ │ │ 🧠 85%  │ │ 📊 78%  │ │ 📈 90%  │    │   │
│ │ │ Lawrence│ │ ML Model│ │ Forecast│    │   │
│ │ └─────────┘ └─────────┘ └─────────┘    │   │
│ │                                         │   │
│ │ Overall: 84.3% ████████████████░░░░    │   │
│ │                                         │   │
│ │ [ENTER] ↑ LONG                          │   │
│ └─────────────────────────────────────────┘   │
│                                               │
│ Current Forecast: ↑ LONG (85% confidence)    │
│ Up: 75% | Down: 15% | Cons: 10%             │
└───────────────────────────────────────────────┘
```

---

## 14. Active Orion Bots

### Описание
Orion бот (код: TRND) для следования за трендом с EMA + Supertrend стратегией и Kelly Criterion риск-менеджментом.

### Расположение
`src/components/bots/orion-bot-manager.tsx`

### Props Interface

```typescript
interface OrionBotManagerProps {
  // Компонент не принимает props
}

interface OrionBot {
  id: string;
  name: string;
  status: "RUNNING" | "HALTED" | "STOPPED" | "STARTING";
  mode: "PAPER" | "LIVE";
  exchange: string;
  symbols: string[];
  strategy: {
    emaFast: number;
    emaMedium: number;
    emaSlow: number;
    supertrendPeriod: number;
    supertrendMultiplier: number;
  };
  risk: {
    mode: "fixed" | "kelly" | "fractional_kelly";
    maxRiskPct: number;
    maxPositions: number;
  };
  hedging: boolean;
  validationStatus: "INIT" | "RUNNING" | "VALIDATED" | "FAILED";
  createdAt: string;
}

interface OrionPosition {
  id: string;
  symbol: string;
  side: "LONG" | "SHORT";
  entryPrice: number;
  currentPrice: number;
  size: number;
  unrealizedPnL: number;
  unrealizedPnLPct: number;
  stopLoss: number;
  openedAt: string;
}

interface OrionStats {
  totalTrades: number;
  winRate: number;
  profitFactor: number;
  sharpeRatio: number;
  maxDrawdown: number;
  totalPnL: number;
}

interface SuperTrendSignal {
  direction: "LONG" | "SHORT";
  strength: number;
  price: number;
}

interface NPCSignal {
  signal: "LONG" | "SHORT" | "NEUTRAL";
  confidence: number;
  pattern: string;
}

interface SqueezeSignal {
  isSqueezing: boolean;
  bandwidth: number;
  breakoutDirection: "LONG" | "SHORT" | "NEUTRAL";
}
```

### Стратегия

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| EMA Fast | Быстрая EMA | 20 |
| EMA Medium | Средняя EMA | 50 |
| EMA Slow | Медленная EMA | 200 |
| ST Period | SuperTrend период | 10 |
| ST Multiplier | SuperTrend множитель | 3.0 |

### Risk Mode

| Режим | Описание |
|-------|----------|
| fixed | Фиксированный размер позиции |
| kelly | Kelly Criterion |
| fractional_kelly | Половина Kelly |

### API интеграция

```typescript
// Fetch bot status
const fetchBots = async () => {
  const response = await fetch("/api/trend-bot");
  const data = await response.json();
  if (data.success && data.bot) {
    setBots([{ ...data.bot }]);
    setPositions(data.bot.positions || []);
    setStats(data.bot.lifetimeStats || null);
  }
};

// Start bot
const handleStartBot = async () => {
  const response = await fetch("/api/trend-bot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "start" }),
  });
};

// Halt bot
const handleHaltBot = async () => {
  await fetch("/api/trend-bot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "halt", reason: "Manual halt" }),
  });
};

// Go Live
const handleGoLive = async () => {
  await fetch("/api/trend-bot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "goLive" }),
  });
};

// Close position
const handleClosePosition = async (positionId: string) => {
  await fetch("/api/trend-bot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "closePosition", positionId }),
  });
};
```

### Signal Components

```typescript
// SuperTrend Signal
setSuperTrendSignal({
  direction: Math.random() > 0.5 ? "LONG" : "SHORT",
  strength: 0.6 + Math.random() * 0.4,
  price: 65000 + Math.random() * 500,
});

// Neural Pattern Classifier Signal
setNpcSignal({
  signal: Math.random() > 0.5 ? "LONG" : "SHORT",
  confidence: 0.5 + Math.random() * 0.3,
  pattern: Math.random() > 0.5 ? "Breakout" : "Continuation",
});

// Squeeze Signal
setSqueezeSignal({
  isSqueezing: Math.random() > 0.3,
  bandwidth: 0.02 + Math.random() * 0.02,
  breakoutDirection: Math.random() > 0.5 ? "LONG" : "SHORT",
});
```

### Скриншот
```
┌───────────────────────────────────────────────┐
│ 🎯 Orion - Trend-Following Hunter             │
│ EMA + Supertrend стратегия с Kelly Criterion  │
├───────────────────────────────────────────────┤
│ Signal Components                             │
│ ┌─────────────┐ ┌─────────────┐ ┌───────────┐│
│ │📈SuperTrend │ │⚡Neural     │ │📊Squeeze  ││
│ │  75%        │ │  Pattern    │ │  Active   ││
│ │↑ LONG       │ │↑ LONG       │ │           ││
│ └─────────────┘ └─────────────┘ └───────────┘│
│                                               │
│ Stats: 2 pos │ 65% WR │ 1.8 PF │ 8% DD │ +$250│
│                                               │
│ Status: RUNNING │ PAPER │ ✅ Validated       │
│ Hedging: ON │ Symbols: BTCUSDT, ETHUSDT     │
│                                               │
│ Strategy: EMA 20/50/200 │ ST 10/3.0         │
│ Risk: fractional_kelly │ 2% max │ 5 pos     │
├───────────────────────────────────────────────┤
│ Активные позиции                              │
│ BTCUSDT │ LONG │ $67,000 │ +$75.00 (0.5%)   │
│ ETHUSDT │ SHORT│ $3,520  │ +$25.00 (0.3%)   │
└───────────────────────────────────────────────┘
```

---

## 🔌 WebSocket интеграция

### Подписки Dashboard

```typescript
// Balance updates
ws.subscribe('balance:update', handleBalanceUpdate);

// Position updates
ws.subscribe('position:update', handlePositionUpdate);
ws.subscribe('position:opened', handlePositionOpened);
ws.subscribe('position:closed', handlePositionClosed);

// Trade updates
ws.subscribe('trade:executed', handleTradeExecuted);

// Price updates (через PriceProvider)
ws.subscribe('price:update', handlePriceUpdate);

// Signal updates
ws.subscribe('signal:new', handleNewSignal);

// Bot status updates
ws.subscribe('bot:status', handleBotStatus);
```

### События компонентов

```typescript
// PositionsTable events
window.addEventListener("position-opened", handlePositionOpened);
window.addEventListener("position-closed", handlePositionClosed);

// Dispatch close event
window.dispatchEvent(new CustomEvent("position-closed", { 
  detail: { positionId } 
}));
```

---

## 🎨 Стилизация

### CSS классы

```css
/* Balance flash animation */
.balance-flash-positive {
  animation: flash-green 0.6s ease-out;
}

.balance-flash-negative {
  animation: flash-red 0.6s ease-out;
}

/* Demo/Real badges */
.demo-badge {
  @apply bg-amber-500/10 text-amber-500 border-amber-500/20;
}

.real-badge {
  @apply bg-green-500/10 text-green-500 border-green-500/20;
}

/* Bot status indicators */
.bot-status-running {
  @apply bg-green-500/10 text-green-500;
}

.bot-status-paused {
  @apply bg-yellow-500/10 text-yellow-500;
}

.bot-status-stopped {
  @apply bg-gray-500/10 text-gray-500;
}
```

### Tailwind классы

```typescript
// Цвета для P&L
const pnlColor = pnl >= 0 ? "text-green-500" : "text-red-500";

// Фон для виджетов
const widgetBg = "bg-secondary/50";

// Границы
const borderClass = "border border-border/50";

// Hover эффекты
const hoverClass = "hover:bg-secondary/30 transition-colors";
```

---

## 📱 Адаптивность

### Брейкпоинты

| Размер | Поведение |
|--------|-----------|
| Mobile (< 640px) | 1 колонка, скрываемые колонки таблиц |
| Tablet (640px - 1024px) | 2 колонки |
| Desktop (> 1024px) | 4 колонки |

### Пример

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <BalanceWidget />
  <BotStatus />
  <MarketForecastWidget />
  <FundingRateWidget />
</div>
```

---

## 📚 Связанная документация

- [UI_COMPONENTS_AUDIT.md](../UI_COMPONENTS_AUDIT.md) - Аудит UI компонентов
- [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) - Дизайн-система
- [../frameworks/shadcn-ui.md](../frameworks/shadcn-ui.md) - shadcn/ui
- [../microservices/bot-monitor-service.md](../microservices/bot-monitor-service.md) - Мониторинг ботов

---

## 📝 Скриншоты (расположение)

Все скриншоты компонентов должны размещаться в:
```
/docs/assets/screenshots/dashboard/
├── balance-widget.png
├── trades-history.png
├── positions-table.png
├── market-forecast-widget.png
├── market-overview.png
├── active-grid-bots.png
├── bot-status.png
├── funding-rate-widget.png
├── active-argus-bots.png
├── signal-feed.png
├── active-bb-bots.png
├── active-dca-bots.png
├── vision-bot-manager.png
└── orion-bot-manager.png
```

---

*Last updated: March 2026 | CITARION Documentation Team*
