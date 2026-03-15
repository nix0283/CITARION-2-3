# Positions, Trades & Signals Documentation

> **Компоненты:** PositionsTable, TradesHistory, SignalFeed  
> **Версия:** 2.0  
> **Последнее обновление:** Март 2026

---

## Содержание

1. [Обзор](#обзор)
2. [Управление позициями](#управление-позициями)
   - [PositionsTable компонент](#positionstable-компонент)
   - [Открытие позиций](#открытие-позиций)
   - [Закрытие позиций](#закрытие-позиций)
   - [Escort (Сопровождение)](#escort-сопровождение)
   - [Trailing Stop](#trailing-stop)
3. [История сделок](#история-сделок)
   - [TradesHistory компонент](#tradeshistory-компонент)
   - [Фильтрация](#фильтрация)
   - [Экспорт](#экспорт)
4. [Лента сигналов](#лента-сигналов)
   - [SignalFeed компонент](#signalfeed-компонент)
   - [Парсинг сигналов](#парсинг-сигналов)
   - [Cornix формат](#cornix-формат)
5. [API эндпоинты](#api-эндпоинты)
6. [WebSocket события](#websocket-события)
7. [Примеры использования](#примеры-использования)

---

## Обзор

Система управления позициями, сделками и сигналами предоставляет полный цикл работы с торговыми операциями:

```
┌─────────────────────────────────────────────────────────────────┐
│                    TRADING LIFECYCLE                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Signal → Parse → Execute → Position → Escort → Close         │
│     ↓        ↓        ↓          ↓         ↓         ↓         │
│  SignalFeed Parser AutoTrader PositionTable Monitor TradesHist │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Архитектура компонентов

| Компонент | Расположение | Назначение |
|-----------|--------------|------------|
| `PositionsTable` | `src/components/dashboard/positions-table.tsx` | Отображение открытых позиций |
| `TradesHistory` | `src/components/dashboard/trades-history.tsx` | История закрытых сделок |
| `SignalFeed` | `src/components/dashboard/signal-feed.tsx` | Лента торговых сигналов |
| `PositionMonitor` | `src/lib/position-monitor.ts` | Мониторинг TP/SL/Trailing |
| `SignalParser` | `src/lib/signal-parser.ts` | Парсинг Cornix сигналов |

---

## Управление позициями

### PositionsTable компонент

**Файл:** `src/components/dashboard/positions-table.tsx`

#### Props интерфейс

```typescript
// Компонент не принимает props, использует глобальный store
export function PositionsTable(): JSX.Element
```

#### Внутренние интерфейсы

```typescript
interface ApiPosition {
  id: string;
  symbol: string;           // Торговая пара (BTCUSDT)
  direction: string;         // LONG | SHORT
  totalAmount: number;       // Размер позиции
  avgEntryPrice: number;     // Средняя цена входа
  currentPrice: number;      // Текущая цена
  leverage: number;          // Плечо
  unrealizedPnl: number;     // Нереализованный PnL
  stopLoss: number | null;   // Stop Loss
  takeProfit: number | null; // Take Profit
  createdAt: string;         // Время открытия
  source?: string;           // CHAT | TELEGRAM | PLATFORM | EXTERNAL | SIGNAL
  account: {
    exchangeId: string;
    exchangeName: string;
    isTestnet: boolean;
  };
}
```

#### Состояния компонента

```typescript
const [apiPositions, setApiPositions] = useState<ApiPosition[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [closingId, setClosingId] = useState<string | null>(null);
const [showShareCard, setShowShareCard] = useState(false);
const [selectedPosition, setSelectedPosition] = useState<ApiPosition | null>(null);
```

#### Функциональность

1. **Отображение позиций:**
   - Биржа и торговая пара
   - Направление (LONG/SHORT) с цветовой индикацией
   - Источник открытия (Chat, Telegram, Platform, Signal)
   - Размер и цена входа
   - Текущая цена и PnL
   - Плечо и время открытия

2. **Действия с позициями:**
   - Закрытие позиции
   - Поделиться результатом (ShareCard)
   - Обновление данных

3. **Автообновление:**
   - Каждые 30 секунд
   - При видимости вкладки
   - По событиям `position-opened`, `position-closed`

#### Источники позиций

```typescript
const getSourceInfo = (source?: string) => {
  switch (source) {
    case "CHAT":
      return { icon: <MessageSquare />, label: "Chat", color: "text-blue-500" };
    case "TELEGRAM":
      return { icon: <Bot />, label: "Telegram", color: "text-sky-500" };
    case "EXTERNAL":
      return { icon: <ExternalLink />, label: "External", color: "text-purple-500" };
    case "SIGNAL":
      return { icon: <TrendingUp />, label: "Signal", color: "text-amber-500" };
    case "PLATFORM":
    default:
      return { icon: <Monitor />, label: "Platform", color: "text-muted-foreground" };
  }
};
```

---

### Открытие позиций

#### Способы открытия

1. **Через Trading Form**
   ```
   UI → TradingForm → /api/trade/open → Exchange API
   ```

2. **Из сигнала (SignalFeed)**
   ```
   Signal → Parser → AutoTrader → /api/auto-trading/execute → Position
   ```

3. **Через Chat Bot**
   ```
   Chat → Parse Signal → /api/chat/parse-signal → Auto Execute
   ```

4. **Telegram Webhook**
   ```
   Telegram → /api/telegram/webhook → Signal Parser → Position
   ```

#### Пример открытия через API

```typescript
// POST /api/trade/open
const response = await fetch('/api/trade/open', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    symbol: 'BTCUSDT',
    direction: 'LONG',
    amount: 0.01,
    leverage: 10,
    stopLoss: 95000,
    takeProfit: 105000,
    accountType: 'DEMO' // или 'REAL'
  })
});

const result = await response.json();
// result.position.id - ID новой позиции
```

---

### Закрытие позиций

#### Закрытие из UI

```typescript
const handleClosePosition = async (positionId: string) => {
  setClosingId(positionId);
  
  const response = await fetch("/api/demo/close", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ positionId }),
  });

  const result = await response.json();
  
  if (result.success) {
    // Удаляем из локального состояния
    setApiPositions(prev => prev.filter(p => p.id !== positionId));
    
    // Отправляем событие для других компонентов
    window.dispatchEvent(new CustomEvent("position-closed", { 
      detail: { positionId } 
    }));
  }
};
```

#### Закрытие по TP/SL

Position Monitor автоматически закрывает позиции при достижении:

```typescript
// В position-monitor.ts
async function checkPosition(position) {
  const currentPrice = await getCurrentPrice(position.symbol);
  const isLong = position.direction === "LONG";
  
  // Проверка Stop Loss
  if (position.stopLoss) {
    const slHit = isLong 
      ? currentPrice <= position.stopLoss 
      : currentPrice >= position.stopLoss;
    
    if (slHit) {
      // Генерируется событие SL_HIT
      // Позиция закрывается автоматически
    }
  }
  
  // Проверка Take Profit
  if (signal?.takeProfits) {
    const tps = JSON.parse(signal.takeProfits);
    for (const tp of tps) {
      const tpHit = isLong 
        ? currentPrice >= tp.price 
        : currentPrice <= tp.price;
      
      if (tpHit) {
        // Генерируется событие TP_HIT
        // Частичное или полное закрытие
      }
    }
  }
}
```

---

### Escort (Сопровождение)

**Escort** — автоматическое сопровождение внешних позиций с управлением SL/TP/Trailing.

#### Статусы Escort

```typescript
type EscortStatus = 
  | "PENDING"    // Ожидает подтверждения
  | "ADOPTED"    // Принята на сопровождение
  | "DECLINED"   // Отклонена
  | "CLOSED";    // Закрыта
```

#### API Endpoints

| Метод | Endpoint | Описание |
|-------|----------|----------|
| `POST` | `/api/positions/escort` | Подтвердить/отклонить сопровождение |
| `PUT` | `/api/positions/escort` | Обновить SL/TP/Trailing |
| `DELETE` | `/api/positions/escort` | Закрыть сопровождаемую позицию |
| `GET` | `/api/positions/escort` | Получить детали позиции |

#### Подтверждение сопровождения

```typescript
// POST /api/positions/escort
const response = await fetch('/api/positions/escort', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    positionId: 'ext_pos_123',
    action: 'confirm',
    params: {
      stopLoss: 95000,
      takeProfit: 105000,
      trailingStop: {
        type: 'PERCENT',
        value: 2
      }
    }
  })
});
```

#### Обновление параметров

```typescript
// PUT /api/positions/escort
const response = await fetch('/api/positions/escort', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    positionId: 'pos_123',
    stopLoss: 96000,
    takeProfit: 104000,
    trailingStop: {
      type: 'PERCENT',
      value: 1.5
    }
  })
});
```

#### Синхронизация позиций

```typescript
// POST /api/positions/sync
// Синхронизирует все REAL аккаунты
const response = await fetch('/api/positions/sync', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    accountId: 'acc_123' // Опционально
  })
});

// GET /api/positions/sync?action=pending
// Получить ожидающие запросы на сопровождение
// GET /api/positions/sync?action=escorting
// Получить позиции на сопровождении
```

---

### Trailing Stop

**Trailing Stop** — динамический Stop Loss, следующий за ценой.

#### Конфигурация Trailing Stop

```typescript
interface TrailingStopConfig {
  type: "PERCENT" | "FIXED" | "BREAKEVEN";
  value: number;           // Процент или фиксированное расстояние
  activated: boolean;      // Активирован ли trailing
  triggerPrice?: number;   // Цена активации (опционально)
  highestPrice?: number;   // Максимальная цена (для LONG)
  lowestPrice?: number;    // Минимальная цена (для SHORT)
}
```

#### Типы Trailing Stop

| Тип | Описание | Пример |
|-----|----------|--------|
| `PERCENT` | Процент от текущей цены | 2% = цена двигается на 2% ниже максимума |
| `FIXED` | Фиксированное расстояние | $500 от текущей цены |
| `BREAKEVEN` | Перемещение на точку безубытка | SL = Entry Price |

#### Логика работы (LONG позиция)

```typescript
// В trailing-stop.ts
function checkTrailingStop(position) {
  const config = JSON.parse(position.trailingStop);
  const currentPrice = position.currentPrice;
  
  // Для LONG: отслеживаем максимальную цену
  if (currentPrice > config.highestPrice) {
    config.highestPrice = currentPrice;
    
    // Рассчитываем новый SL
    const trailingDistance = currentPrice * (config.value / 100);
    const newStopLoss = currentPrice - trailingDistance;
    
    // SL двигается только вверх
    if (newStopLoss > position.stopLoss) {
      position.stopLoss = newStopLoss;
      // Сохраняем и отправляем уведомление
    }
  }
}
```

#### Активация Trailing Stop

```typescript
// Автоматическая активация при прибыли >= 1%
function checkTrailingActivation(position, config, currentPrice) {
  if (config.triggerPrice) {
    return currentPrice >= config.triggerPrice;
  }
  
  const profitPercent = ((currentPrice - position.avgEntryPrice) / position.avgEntryPrice) * 100;
  return profitPercent >= 1;
}
```

#### API для управления Trailing

```typescript
// Активировать trailing stop
await activateTrailingStop(positionId, {
  type: 'PERCENT',
  value: 2
});

// Деактивировать trailing stop
await deactivateTrailingStop(positionId);

// Проверить все trailing stops
const result = await checkAllTrailingStops();
// result.checked - проверено
// result.updated - обновлено
```

---

## История сделок

### TradesHistory компонент

**Файл:** `src/components/dashboard/trades-history.tsx`

#### Props интерфейс

```typescript
// Компонент использует глобальный store, явных props нет
export function TradesHistory(): JSX.Element
```

#### Используемые данные из Store

```typescript
interface Trade {
  id: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  status: "OPEN" | "CLOSED";
  entryPrice?: number;
  exitPrice?: number;
  amount: number;
  leverage?: number;
  pnl: number;
  pnlPercent?: number;
  isDemo: boolean;
  createdAt: string;
}

const { trades, account } = useCryptoStore();
```

#### Состояния фильтрации

```typescript
const [filter, setFilter] = useState<"all" | "DEMO" | "REAL">("all");
const [statusFilter, setStatusFilter] = useState<"all" | "OPEN" | "CLOSED">("all");
const [showShareCard, setShowShareCard] = useState(false);
const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
```

---

### Фильтрация

#### Фильтры

| Фильтр | Значения | Описание |
|--------|----------|----------|
| Режим | `all`, `DEMO`, `REAL` | Фильтр по типу счёта |
| Статус | `all`, `OPEN`, `CLOSED` | Фильтр по статусу сделки |

#### Логика фильтрации

```typescript
const filteredTrades = trades.filter((trade) => {
  // Фильтр по режиму
  if (filter === "DEMO" && !trade.isDemo) return false;
  if (filter === "REAL" && trade.isDemo) return false;
  
  // Фильтр по статусу
  if (statusFilter === "OPEN" && trade.status !== "OPEN") return false;
  if (statusFilter === "CLOSED" && trade.status !== "CLOSED") return false;
  
  return true;
});
```

---

### Экспорт

#### Поделиться сделкой (ShareCard)

```typescript
const handleShareTrade = (trade: Trade) => {
  setSelectedTrade(trade);
  setShowShareCard(true);
};

// ShareCard получает данные:
<ShareCard
  open={showShareCard}
  onOpenChange={setShowShareCard}
  tradeData={{
    symbol: trade.symbol,
    direction: trade.direction,
    entryPrice: trade.entryPrice || 0,
    exitPrice: trade.exitPrice || 0,
    pnl: trade.pnl,
    pnlPercent: trade.pnlPercent || 0,
    leverage: trade.leverage || 1,
    amount: trade.amount,
    exchange: account?.exchangeName || "Binance",
  }}
/>
```

#### Форматирование данных

```typescript
// Форматирование цены
const formatPrice = (price: number | undefined) => {
  if (!price) return "-";
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: price < 1 ? 4 : 2,
  });
};

// Форматирование даты
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
```

---

## Лента сигналов

### SignalFeed компонент

**Файл:** `src/components/dashboard/signal-feed.tsx`

#### Props интерфейс

```typescript
// Компонент не принимает props
export function SignalFeed(): JSX.Element
```

#### Интерфейс сигнала

```typescript
interface Signal {
  id: string;
  symbol: string;                     // Торговая пара
  direction: "LONG" | "SHORT";        // Направление
  action: "BUY" | "SELL" | "CLOSE";   // Действие
  entryPrices: number[];              // Точки входа
  takeProfits: { 
    price: number; 
    percentage: number; 
  }[];                                // Take Profit цели
  stopLoss?: number;                  // Stop Loss
  leverage: number;                   // Плечо
  source: "TELEGRAM" | "DISCORD" | "TRADINGVIEW" | "MANUAL"; // Источник
  status: "PENDING" | "EXECUTED" | "IGNORED"; // Статус
  createdAt: string;                  // Время создания
}
```

#### Состояния компонента

```typescript
const [signals, setSignals] = useState<Signal[]>(DEMO_SIGNALS);
const { account } = useCryptoStore();
const isDemo = account?.accountType === "DEMO";
```

#### Отображение источника

```typescript
const getSourceIcon = (source: Signal["source"]) => {
  switch (source) {
    case "TELEGRAM":
      return <MessageSquare className="h-3 w-3" />;
    case "DISCORD":
      return <Radio className="h-3 w-3" />;
    case "TRADINGVIEW":
      return <Zap className="h-3 w-3" />;
    default:
      return <Zap className="h-3 w-3" />;
  }
};
```

#### Отображение статуса

```typescript
const getStatusBadge = (status: Signal["status"]) => {
  switch (status) {
    case "EXECUTED":
      return (
        <Badge className="bg-green-500/10 text-green-500">
          <CheckCircle className="h-3 w-3 mr-1" />
          Исполнен
        </Badge>
      );
    case "PENDING":
      return (
        <Badge className="bg-yellow-500/10 text-yellow-500">
          <Clock className="h-3 w-3 mr-1" />
          Ожидание
        </Badge>
      );
    case "IGNORED":
      return (
        <Badge className="bg-red-500/10 text-red-500">
          <XCircle className="h-3 w-3 mr-1" />
          Игнор
        </Badge>
      );
  }
};
```

---

### Парсинг сигналов

**Файл:** `src/lib/signal-parser.ts`

#### Основные функции парсинга

| Функция | Описание |
|---------|----------|
| `parseSignal()` | Основной парсер сигнала |
| `parseCoinPair()` | Извлечение торговой пары |
| `parseDirection()` | Определение направления |
| `parseEntryPrices()` | Извлечение точек входа |
| `parseTakeProfits()` | Извлечение TP целей |
| `parseStopLoss()` | Извлечение SL |
| `parseLeverage()` | Извлечение плеча |
| `parseTrailingConfig()` | Извлечение Trailing настроек |

#### Результат парсинга

```typescript
interface ParsedSignal {
  id?: number;
  symbol: string;           // BTCUSDT
  baseAsset: string;        // BTC
  quoteAsset: string;       // USDT
  direction: "LONG" | "SHORT";
  action: "BUY" | "SELL" | "CLOSE" | "UPDATE_TP" | "UPDATE_SL" | "MARKET_ENTRY";
  marketType: "SPOT" | "FUTURES";
  entryPrices: number[];
  entryZone?: { min: number; max: number };
  entryWeights?: number[];  // Для DCA стратегий
  multiEntryConfig?: MultiEntryConfig;
  stopLoss?: number;
  takeProfits: { price: number; percentage: number }[];
  leverage: number;
  leverageType: "ISOLATED" | "CROSS";
  signalType: "REGULAR" | "BREAKOUT";
  trailingConfig?: TrailingConfig;
  exchanges: string[];
  confidence: number;       // 0-1, оценка качества парсинга
  rawText: string;
}
```

#### Пример использования

```typescript
import { parseSignal } from "@/lib/signal-parser";

const signalText = `
  #BTC/USDT LONG
  Entry: 67000-67500
  TP1: 68000
  TP2: 69000
  SL: 66000
  Leverage: 10x
`;

const parsed = parseSignal(signalText);
// parsed.symbol = "BTCUSDT"
// parsed.direction = "LONG"
// parsed.entryPrices = [67000, 67500]
// parsed.takeProfits = [{ price: 68000, percentage: 50 }, { price: 69000, percentage: 50 }]
// parsed.stopLoss = 66000
// parsed.leverage = 10
```

---

### Cornix формат

**Документация:** `docs/trading/CORNIX_SIGNAL_FORMAT.md`

#### Полный шаблон сигнала (FUTURES)

```
⚡⚡ #BTC/USDT ⚡⚡
Exchanges: Binance Futures
Signal Type: Regular (Long)
Leverage: Isolated (5X)
Entry Zone: 38766.9 - 38766.9
Take-Profit Targets: 1) 39000 2) 39500 3) 40000
Stop Targets: 1) 38000
Trailing Configuration:
Entry: Percentage (0.5%)
Take-Profit: Percentage (0.5%)
Stop: Moving Target - Trigger: Target (1)
```

#### Ключевые слова для парсинга

| Категория | Ключевые слова |
|-----------|----------------|
| **Пара** | `BTC/USDT`, `BTCUSDT`, `#BTC/USDT` |
| **Вход** | `Entry`, `Buy`, `Enter`, `Вход` |
| **Take Profit** | `Take Profit`, `TP`, `Target`, `Тейк` |
| **Stop Loss** | `Stop Loss`, `SL`, `Stop`, `Стоп` |
| **Направление** | `LONG`, `SHORT`, `Buy`, `Sell` |
| **Рынок** | `SPOT`, `FUTURES` (по умолчанию) |
| **Плечо** | `Leverage`, `Lev`, `Isolated`, `Cross` |
| **Breakout** | `above`, `below`, `Signal Type: Breakout` |

#### Поддерживаемые форматы входа

```
# Одиночный вход
Entry: 67000
Buy: 67000

# Множественные входы
Entry: 67000, 66500, 66000

# Нумерованные входы (до 10)
Entry Targets:
1) 67000
2) 66500
3) 66000

# Диапазон входа
Entry Zone: 100-200
Buy Zone: 67000-67500

# Вход по текущей цене
Buy at current price

# Breakout сигналы
Enter above 150
Enter below 200
```

#### Поддерживаемые форматы TP/SL

```
# Take Profit
TP: 68000
TP1: 68000, TP2: 69000, TP3: 70000
Take-Profit Targets:
1) 68000
2) 69000

# Stop Loss
SL: 66000
Stop: 66000
Stop Targets:
1) 66000
```

#### Интеграция с источниками

Сигналы принимаются из трёх источников:

1. **TradingView Webhook**: `/api/webhook/tradingview`
2. **Telegram Bot**: `/api/telegram/webhook`
3. **Chat Bot**: `/api/chat/parse-signal`

Все источники используют единый Cornix-совместимый парсер.

---

## API эндпоинты

### Positions API

| Метод | Endpoint | Описание |
|-------|----------|----------|
| `GET` | `/api/demo/trade` | Получить все позиции (Demo) |
| `POST` | `/api/trade/open` | Открыть позицию |
| `POST` | `/api/demo/close` | Закрыть позицию (Demo) |
| `POST` | `/api/trade/close` | Закрыть позицию (Real) |
| `POST` | `/api/trade/close-all` | Закрыть все позиции |
| `POST` | `/api/positions/sync` | Синхронизировать позиции |
| `GET` | `/api/positions/sync` | Статус синхронизации |
| `POST` | `/api/positions/escort` | Подтвердить сопровождение |
| `PUT` | `/api/positions/escort` | Обновить параметры escort |
| `DELETE` | `/api/positions/escort` | Закрыть сопровождаемую позицию |

### Trades API

| Метод | Endpoint | Описание |
|-------|----------|----------|
| `GET` | `/api/trades` | Получить историю сделок |
| `GET` | `/api/trade-events` | Получить торговые события |
| `GET` | `/api/pnl-stats` | Статистика PnL |

### Signals API

| Метод | Endpoint | Описание |
|-------|----------|----------|
| `GET` | `/api/signals` | Получить сигналы |
| `GET` | `/api/signals/processed` | Обработанные сигналы |
| `POST` | `/api/signal` | Создать сигнал |
| `POST` | `/api/chat/parse-signal` | Парсинг сигнала из чата |
| `POST` | `/api/webhook/tradingview` | TradingView webhook |
| `POST` | `/api/telegram/webhook` | Telegram webhook |

### Auto-Trading API

| Метод | Endpoint | Описание |
|-------|----------|----------|
| `POST` | `/api/auto-trading/execute` | Исполнить сигнал |
| `POST` | `/api/auto-trading/first-entry` | Первый вход |
| `POST` | `/api/auto-trading/tp-grace` | TP Grace настройки |

### Cornix Integration API

| Метод | Endpoint | Описание |
|-------|----------|----------|
| `GET` | `/api/cornix/metrics` | Метрики Cornix |
| `POST` | `/api/cornix/sync` | Синхронизация с Cornix |
| `GET` | `/api/cornix/signals` | Сигналы от Cornix |
| `GET` | `/api/cornix/positions` | Позиции Cornix |
| `GET` | `/api/cornix/features` | Функции Cornix |

---

## WebSocket события

### Позиции

| Событие | Направление | Описание |
|---------|-------------|----------|
| `position-opened` | Client ← Server | Позиция открыта |
| `position-closed` | Client ← Server | Позиция закрыта |
| `position-updated` | Client ← Server | Позиция обновлена |
| `position:sync` | Client → Server | Запрос синхронизации |

### Сигналы

| Событие | Направление | Описание |
|---------|-------------|----------|
| `signal:received` | Client ← Server | Новый сигнал получен |
| `signal:parsed` | Client ← Server | Сигнал распарсен |
| `signal:executed` | Client ← Server | Сигнал исполнен |
| `signal:rejected` | Client ← Server | Сигнал отклонён |

### Уведомления (SSE)

| Тип события | Описание |
|-------------|----------|
| `TP_HIT` | Take Profit достигнут |
| `SL_HIT` | Stop Loss сработал |
| `LIQUIDATION_WARNING` | Предупреждение о ликвидации |
| `POSITION_OPENED` | Позиция открыта |
| `POSITION_CLOSED` | Позиция закрыта |
| `POSITION_UPDATED` | Позиция обновлена |

### Пример обработки событий

```typescript
// Прослушивание событий позиций
useEffect(() => {
  // Обновление при открытии новой позиции
  const handlePositionOpened = (e: CustomEvent) => {
    console.log("Position opened:", e.detail);
    fetchPositions();
  };
  
  // Обновление при закрытии позиции
  const handlePositionClosed = () => {
    console.log("Position closed");
    fetchPositions();
  };
  
  window.addEventListener("position-opened", handlePositionOpened as EventListener);
  window.addEventListener("position-closed", handlePositionClosed);
  
  return () => {
    window.removeEventListener("position-opened", handlePositionOpened as EventListener);
    window.removeEventListener("position-closed", handlePositionClosed);
  };
}, [fetchPositions]);
```

---

## Примеры использования

### 1. Получение открытых позиций

```typescript
// Использование в компоненте
import { PositionsTable } from "@/components/dashboard/positions-table";

function Dashboard() {
  return (
    <div className="grid gap-4">
      <PositionsTable />
    </div>
  );
}

// Прямой API вызов
async function getPositions() {
  const response = await fetch('/api/demo/trade');
  const data = await response.json();
  
  if (data.success) {
    console.log('Positions:', data.positions);
  }
}
```

### 2. Открытие позиции из сигнала

```typescript
import { parseSignal } from "@/lib/signal-parser";

async function executeSignalFromText(signalText: string) {
  // 1. Парсим сигнал
  const parsed = parseSignal(signalText);
  
  if (!parsed) {
    throw new Error("Failed to parse signal");
  }
  
  // 2. Исполняем через API
  const response = await fetch('/api/auto-trading/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      signal: parsed,
      accountType: 'DEMO',
      autoRiskManagement: true,
    }),
  });
  
  const result = await response.json();
  
  if (result.success) {
    console.log('Position opened:', result.position);
  }
  
  return result;
}

// Использование
const signalText = `
  #ETH/USDT LONG
  Entry: 3500
  TP: 3600, 3700
  SL: 3400
  Leverage: 5x
`;

await executeSignalFromText(signalText);
```

### 3. Настройка Trailing Stop

```typescript
import { activateTrailingStop, createTrailingConfig } from "@/lib/trailing-stop";

// Создание конфигурации
const trailingConfig = createTrailingConfig("PERCENT", 2); // 2% trailing

// Активация для позиции
await activateTrailingStop("position_123", {
  type: "PERCENT",
  value: 2,
  triggerPrice: 105000, // Активировать при достижении цены
});
```

### 4. Escort (Сопровождение) позиции

```typescript
// Подтверждение сопровождения внешней позиции
async function confirmPositionEscort(positionId: string) {
  const response = await fetch('/api/positions/escort', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      positionId,
      action: 'confirm',
      params: {
        stopLoss: 95000,
        takeProfit: 105000,
        trailingStop: {
          type: 'PERCENT',
          value: 1.5,
        },
      },
    }),
  });
  
  return response.json();
}

// Обновление параметров escort
async function updateEscortParams(positionId: string) {
  const response = await fetch('/api/positions/escort', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      positionId,
      stopLoss: 96000,
      trailingStop: {
        type: 'PERCENT',
        value: 1,
      },
    }),
  });
  
  return response.json();
}
```

### 5. Подписка на обновления цен

```typescript
import { 
  subscribeToWsPrices, 
  getWsPrice, 
  getCurrentPrice 
} from "@/lib/position-monitor";

// Подписка на обновления цен WebSocket
const unsubscribe = subscribeToWsPrices((prices) => {
  console.log('Updated prices:', prices);
  // prices = { BTCUSDT: 97500, ETHUSDT: 3450, ... }
});

// Получение кэшированной цены
const btcPrice = getWsPrice('BTCUSDT');
console.log('BTC price:', btcPrice);

// Получение цены с fallback
const ethPrice = await getCurrentPrice('ETHUSDT');
console.log('ETH price:', ethPrice);

// Отписка
unsubscribe();
```

### 6. Парсинг сигнала с Multi-Entry (DCA)

```typescript
import { parseSignal, parseMultiEntryWithWeights } from "@/lib/signal-parser";

const dcaSignal = `
  #BTC/USDT LONG
  Entry Targets:
  1) 67000 (50%)
  2) 66500 (30%)
  3) 66000 (20%)
  TP1: 68000
  TP2: 69000
  SL: 65000
  Leverage: 10x
`;

const parsed = parseSignal(dcaSignal);

// parsed.multiEntryConfig = {
//   targets: [
//     { index: 1, price: 67000, weight: 50 },
//     { index: 2, price: 66500, weight: 30 },
//     { index: 3, price: 66000, weight: 20 },
//   ],
//   totalWeight: 100,
//   strategy: "CUSTOM_RATIOS"
// }
```

### 7. Получение истории сделок с фильтрацией

```typescript
// Использование компонента с фильтрами
import { TradesHistory } from "@/components/dashboard/trades-history";

function TradingHistory() {
  return <TradesHistory />;
}

// Прямой API вызов
async function getTrades(filter: "DEMO" | "REAL", status: "OPEN" | "CLOSED") {
  const response = await fetch(`/api/trades?filter=${filter}&status=${status}`);
  const data = await response.json();
  
  return data.trades;
}
```

### 8. Интеграция с TradingView Webhook

```typescript
// Webhook endpoint: /api/webhook/tradingview
// Принимает POST запросы от TradingView

// Пример сигнала от TradingView:
{
  "symbol": "BTCUSDT",
  "action": "BUY",
  "price": 67000,
  "take_profit": 69000,
  "stop_loss": 65000,
  "leverage": 10
}

// Система автоматически:
// 1. Парсит сигнал в Cornix формат
// 2. Проверяет ML фильтры
// 3. Исполняет если пройдены все проверки
```

---

## Ограничения

| Параметр | Максимум |
|----------|----------|
| Entry targets | 10 |
| Take Profit targets | 10 |
| Stop Loss | 1 |
| Amount per trade | 20% |
| Risk percentage | 20% |
| Signals per minute | 7 |
| Leverage | 125x |

---

## Связанная документация

- [DASHBOARD.md](./DASHBOARD.md) — Dashboard компоненты
- [COPY_TRADING_PANEL.md](./COPY_TRADING_PANEL.md) — Copy Trading
- [RISK_MANAGEMENT_UI.md](./RISK_MANAGEMENT_UI.md) — Risk Management
- [CORNIX_SIGNAL_FORMAT.md](../trading/CORNIX_SIGNAL_FORMAT.md) — Формат Cornix
- [trade-events-service.md](../microservices/trade-events-service.md) — Trade Events Service

---

*Документация создана: Март 2026*  
*Версия: 2.0*
