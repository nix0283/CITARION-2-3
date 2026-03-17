# 🤖 Bots Dashboard

**Version:** 1.0 | **Last Updated:** January 2025 | **Status:** Production

---

## 📋 Обзор

Bots Dashboard - это централизованный интерфейс для управления всеми торговыми ботами платформы CITARION. Предоставляет real-time мониторинг, управление статусами ботов и навигацию к специализированным панелям управления.

### Ключевые возможности

- **Real-time мониторинг** - WebSocket соединение для мгновенных обновлений статусов
- **Унифицированное управление** - единый интерфейс для всех типов ботов
- **Быстрая навигация** - переход к детальным настройкам каждого бота
- **Создание ботов** - модальное окно для создания новых ботов любого типа
- **Фильтрация и поиск** - фильтры по типу, статусу и текстовый поиск

---

## Архитектура

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         BOTS DASHBOARD                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────┐    WebSocket    ┌─────────────────┐                │
│  │  BotsDashboard  │◄───────────────►│  bot-monitor    │                │
│  │  (Frontend)     │    Port 3003    │  (Mini-service) │                │
│  └─────────────────┘                 └─────────────────┘                │
│          │                                    │                          │
│          │ HTTP API (fallback)                 │                          │
│          ▼                                    ▼                          │
│  ┌─────────────────┐                 ┌─────────────────┐                │
│  │  /api/bots/     │                 │  Bot Registry   │                │
│  │  unified        │                 │  (In-memory)    │                │
│  └─────────────────┘                 └─────────────────┘                │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Файловая структура

```
src/
├── components/bots/
│   ├── bots-dashboard.tsx      # Главный компонент дашборда
│   ├── bot-card.tsx            # Карточка бота
│   ├── bot-config-modal.tsx    # Модальное окно конфигурации
│   ├── new-bot-modal.tsx       # Модальное окно создания бота
│   ├── grid-bot-manager.tsx    # Управление Grid ботами
│   ├── dca-bot-manager.tsx     # Управление DCA ботами
│   ├── bb-bot-manager.tsx      # Управление BB ботами
│   └── ...                     # Другие менеджеры ботов
│
├── hooks/
│   └── use-bots.ts             # React хук для управления ботами
│
├── app/api/bots/
│   ├── unified/route.ts        # Unified API для всех ботов
│   ├── grid/route.ts           # API для Grid ботов
│   ├── dca/route.ts            # API для DCA ботов
│   └── ...                     # Другие API endpoints
│
└── mini-services/bot-monitor/
    └── index.ts                # WebSocket сервис мониторинга

prisma/
└── schema.prisma               # Схема БД (GridBot, DcaBot, BBBot, etc.)
```

---

## Компоненты

### 1. BotsDashboard

Главный компонент дашборда ботов.

**Расположение:** `src/components/bots/bots-dashboard.tsx`

```tsx
import { BotsDashboard } from '@/components/bots/bots-dashboard';

// Использование
<BotsDashboard onNavigate={(tab) => setActiveTab(tab)} />
```

**Props:**

```typescript
interface BotsDashboardProps {
  onNavigate?: (tab: string) => void;  // Callback для навигации
}
```

**Возвращаемые данные из useBots:**

```typescript
interface UseBotsReturn {
  bots: UnifiedBot[];         // Список ботов
  stats: BotStats | null;     // Статистика
  isLoading: boolean;         // Загрузка
  error: string | null;       // Ошибка
  lastUpdated: Date | null;   // Время последнего обновления
  wsConnected: boolean;       // Статус WebSocket соединения
  
  // Actions
  refresh: () => Promise<void>;
  controlBot: (botId, botType, action, options?) => Promise<boolean>;
  getBotTypeMetadata: (type) => BotTypeMetadata | undefined;
  
  // Filters
  filterByType: (type) => UnifiedBot[];
  filterByStatus: (status) => UnifiedBot[];
  filterByExchange: (exchangeId) => UnifiedBot[];
  
  // Computed
  activeBots: UnifiedBot[];
  runningBots: UnifiedBot[];
  pausedBots: UnifiedBot[];
  stoppedBots: UnifiedBot[];
}
```

---

### 2. BotCard

Карточка отдельного бота с метриками и кнопками управления.

**Расположение:** `src/components/bots/bot-card.tsx`

```tsx
import { BotCard } from '@/components/bots/bot-card';

<BotCard
  bot={bot}
  onControl={handleControl}
  onOpenConfig={handleOpenConfig}
  onNavigate={handleNavigate}
/>
```

**Props:**

```typescript
interface BotCardProps {
  bot: UnifiedBot;
  onControl: (botId, botType, action, options?) => Promise<boolean>;
  onOpenConfig: () => void;
  onNavigate: () => void;
}
```

**Элементы управления:**

| Кнопка | Иконка | Действие |
|--------|--------|----------|
| Настройки | Settings | Открытие модального окна конфигурации |
| Навигация | ExternalLink | Переход к детальной панели бота |
| Старт/Стоп | Play/Pause | Управление статусом бота |

---

### 3. BotConfigModal

Модальное окно для просмотра и редактирования конфигурации бота.

**Расположение:** `src/components/bots/bot-config-modal.tsx`

```tsx
import { BotConfigModal } from '@/components/bots/bot-config-modal';

<BotConfigModal
  bot={selectedBot}
  open={!!selectedBot}
  onOpenChange={setSelectedBot}
  onControl={handleControl}
  onNavigate={handleNavigate}
/>
```

**Props:**

```typescript
interface BotConfigModalProps {
  bot: UnifiedBot | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onControl: (botId, botType, action) => Promise<boolean>;
  onNavigate: (botType: string) => void;
}
```

**Содержимое:**
- Основная информация (имя, тип, биржа, символ)
- Текущие метрики (PnL, Win Rate, Trades)
- Конфигурация (параметры бота)
- Кнопки управления (Start/Pause/Stop)
- Кнопка перехода к детальной панели

---

### 4. NewBotModal

Модальное окно для создания нового бота.

**Расположение:** `src/components/bots/new-bot-modal.tsx`

```tsx
import { NewBotModal } from '@/components/bots/new-bot-modal';

<NewBotModal
  open={showNewBot}
  onOpenChange={setShowNewBot}
  onCreate={handleCreateBot}
/>
```

**Props:**

```typescript
interface NewBotModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (config: BotCreationConfig) => Promise<boolean>;
}

interface BotCreationConfig {
  name: string;
  type: BotType;
  exchangeId: string;
  symbol: string;
  direction: 'LONG' | 'SHORT' | 'BOTH';
  accountType: 'DEMO' | 'REAL';
  config: Record<string, unknown>;  // Тип-специфичная конфигурация
}
```

---

## Хук useBots

### Описание

React хук для управления состоянием ботов с поддержкой WebSocket real-time обновлений и HTTP API fallback.

**Расположение:** `src/hooks/use-bots.ts`

### Использование

```tsx
import { useBots, type BotType, type BotControlAction } from '@/hooks/use-bots';

function MyComponent() {
  const {
    bots,
    stats,
    isLoading,
    error,
    wsConnected,
    refresh,
    controlBot,
    filterByType,
  } = useBots({
    autoRefresh: true,
    refreshInterval: 30000,
    enableWebSocket: true,
  });
  
  // Фильтрация по типу
  const gridBots = filterByType('grid');
  
  // Управление ботом
  const handleStart = async (botId: string, botType: BotType) => {
    const success = await controlBot(botId, botType, 'start');
    if (success) {
      console.log('Bot started!');
    }
  };
  
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!wsConnected && <div>Using HTTP polling</div>}
      {bots.map(bot => (
        <div key={bot.id}>{bot.name} - {bot.status}</div>
      ))}
    </div>
  );
}
```

### Опции

```typescript
interface UseBotsOptions {
  type?: BotType;              // Фильтр по типу
  status?: BotStatus;          // Фильтр по статусу
  exchangeId?: string;         // Фильтр по бирже
  refreshInterval?: number;    // Интервал обновления (ms), default: 30000
  autoRefresh?: boolean;       // Автообновление, default: true
  enableWebSocket?: boolean;   // Включить WebSocket, default: true
}
```

### Действия управления (BotControlAction)

```typescript
type BotControlAction = 
  | 'start'    // Запуск бота
  | 'pause'    // Пауза бота
  | 'resume'   // Возобновление работы
  | 'stop'     // Остановка бота
  | 'restart'; // Перезапуск бота
```

---

## Типы данных

### UnifiedBot

Унифицированный интерфейс бота для всех типов.

```typescript
interface UnifiedBot {
  id: string;
  type: BotType;
  name: string;
  description?: string;
  status: BotStatus;
  isActive: boolean;
  symbol: string;
  exchangeId: string;
  direction: 'LONG' | 'SHORT' | 'BOTH';
  accountId: string;
  accountType: 'DEMO' | 'REAL';
  
  metrics: BotMetrics;
  configSummary: Record<string, unknown>;
  
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  stoppedAt?: string;
  uptime?: string;
  lastActivity?: string;
  error?: string;
}
```

### BotMetrics

Метрики производительности бота.

```typescript
interface BotMetrics {
  realizedPnL: number;      // Реализованная прибыль/убыток
  unrealizedPnL: number;    // Нереализованная прибыль/убыток
  totalProfit: number;      // Общая прибыль
  roi: number;              // Return on Investment (%)
  winRate: number;          // Процент прибыльных сделок
  profitFactor: number;     // Отношение прибыли к убыткам
  totalTrades: number;      // Всего сделок
  winTrades: number;        // Прибыльных сделок
  lossTrades: number;       // Убыточных сделок
  maxDrawdown: number;      // Максимальная просадка
  currentDrawdown: number;  // Текущая просадка
  activePositions: number;  // Активные позиции
  openOrders: number;       // Открытые ордера
  investedAmount: number;   // Инвестированная сумма
}
```

### BotStats

Агрегированная статистика всех ботов.

```typescript
interface BotStats {
  totalBots: number;
  activeBots: number;
  pausedBots: number;
  stoppedBots: number;
  totalInvested: number;
  totalPnL: number;
}
```

### BotType

Все поддерживаемые типы ботов.

```typescript
type BotType = 
  // Operational
  | 'grid'     // MESH - Grid Trading
  | 'dca'      // SCALE - Dollar Cost Averaging
  | 'bb'       // BAND - Bollinger Bands
  
  // Analytical
  | 'vision'   // FCST - AI Forecasting
  | 'argus'    // PND - Pump & Dump Detection
  | 'orion'    // TRND - Trend Following
  | 'range'    // RNG - Range Trading
  | 'wolf'     // WOLF - Whale Tracking
  
  // Institutional
  | 'spectrum'   // PR - Portfolio Rebalancing
  | 'reed'       // STA - Statistical Arbitrage
  | 'architect'  // MM - Market Making
  | 'equilibrist'// MR - Mean Reversion
  | 'kron'       // TRF - Trend Following (Institutional)
  
  // Frequency
  | 'hft'      // HFT - High Frequency Trading
  | 'mft'      // MFT - Medium Frequency Trading
  | 'lft';     // LFT - Low Frequency Trading
```

### BotStatus

Статусы бота.

```typescript
type BotStatus = 
  | 'RUNNING'    // Бот активно торгует
  | 'PAUSED'     // Бот на паузе
  | 'STOPPED'    // Бот остановлен
  | 'COMPLETED'  // Бот завершил работу (цель достигнута)
  | 'ERROR';     // Ошибка при работе
```

---

## WebSocket сервис

### bot-monitor

WebSocket сервис для real-time мониторинга ботов.

**Расположение:** `mini-services/bot-monitor/index.ts`

**Порт:** 3003

### События WebSocket

#### От сервера к клиенту

| Событие | Описание | Данные |
|---------|----------|--------|
| `initial_data` | Начальные данные при подключении | `{ bots: WSBotStatus[], events: WSBotEvent[] }` |
| `bot_update` | Обновление статуса бота | `WSBotStatus` |
| `bot_metrics` | Обновление метрик | `{ botId, metrics, timestamp }` |
| `bot_event` | Событие бота (trade, error) | `WSBotEvent` |

#### От клиента к серверу

| Событие | Описание | Данные |
|---------|----------|--------|
| `get_bot_status` | Запрос статуса бота | `botId: string` |
| `get_all_bots` | Запрос всех ботов | - |
| `start_bot` | Запуск бота | `{ botId: string }` |
| `stop_bot` | Остановка бота | `{ botId: string }` |
| `pause_bot` | Пауза бота | `{ botId: string }` |
| `subscribe_bot` | Подписка на обновления бота | `botId: string` |
| `unsubscribe_bot` | Отписка от обновлений | `botId: string` |

### Подключение

```tsx
import { io } from 'socket.io-client';

// Подключение через gateway
const socket = io('/?XTransformPort=3003', {
  transports: ['websocket', 'polling'],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Обработка событий
socket.on('connect', () => console.log('Connected'));
socket.on('bot_update', (bot) => console.log('Bot updated:', bot));
socket.on('bot_metrics', (data) => console.log('Metrics:', data));
```

---

## API Endpoints

### GET /api/bots/unified

Получение списка всех ботов с фильтрацией.

**Query параметры:**

| Параметр | Тип | Описание |
|----------|-----|----------|
| `type` | BotType | Фильтр по типу бота |
| `status` | BotStatus | Фильтр по статусу |
| `exchangeId` | string | Фильтр по бирже |

**Ответ:**

```json
{
  "success": true,
  "bots": [
    {
      "id": "grid-1",
      "type": "grid",
      "name": "BTC Grid Master",
      "status": "RUNNING",
      "symbol": "BTCUSDT",
      "exchangeId": "binance",
      "metrics": {
        "realizedPnL": 245.50,
        "totalTrades": 156,
        "winRate": 0.68
      }
    }
  ],
  "stats": {
    "totalBots": 5,
    "activeBots": 3,
    "totalPnL": 890.20
  }
}
```

### POST /api/bots/unified

Управление ботом (start/pause/stop/restart).

**Тело запроса:**

```json
{
  "botId": "grid-1",
  "botType": "grid",
  "action": "start",
  "options": {
    "closePositions": false
  }
}
```

**Ответ:**

```json
{
  "success": true,
  "bot": {
    "id": "grid-1",
    "status": "RUNNING",
    "isActive": true
  }
}
```

---

## Индикатор статуса соединения

В заголовке дашборда отображается индикатор:

```
┌──────────────────────────────────────────────┐
│ Trading Bots  5 bots   🟢 Live               │
│                              (или 🟡 Polling) │
└──────────────────────────────────────────────┘
```

| Статус | Цвет | Описание |
|--------|------|----------|
| Live | 🟢 green | WebSocket соединение активно |
| Polling | 🟡 yellow | Используется HTTP polling |

---

## Навигация к панелям ботов

При клике на кнопку навигации происходит переход к соответствующей панели управления:

| Тип бота | Tab ID | Панель |
|----------|--------|--------|
| grid | `grid-bot` | GridBotManager |
| dca | `dca-bot` | DcaBotManager |
| bb | `bb-bot` | BBBotManager |
| vision | `vision-bot` | VisionBotManager |
| argus | `argus-bot` | ArgusBotManager |
| orion | `orion-bot` | OrionBotManager |
| range | `range-bot` | RangeBotManager |
| spectrum | `spectrum-bot` | SpectrumBotPanel |
| reed | `reed-bot` | ReedBotPanel |
| architect | `architect-bot` | ArchitectBotPanel |
| equilibrist | `equilibrist-bot` | EquilibristBotPanel |
| kron | `kron-bot` | KronBotPanel |
| hft | `hft-bot` | HFTBotPanel |
| mft | `mft-bot` | MFTBotPanel |
| lft | `lft-bot` | LFTBotPanel |
| wolf | `wolfbot` | WolfBotPanel |

---

## Скриншот

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Trading Bots  5 bots   🟢 Live          Updated 15:30:45                 │
├──────────────────────────────────────────────────────────────────────────┤
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐              │
│ │ 🤖 Total   │ │ ✅ Active  │ │ 💰 Invested│ │ 📈 PnL     │              │
│ │    5       │ │    3       │ │  $5,000    │ │  +$890.20  │              │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘              │
│                                                                          │
│ [🔍 Search...] [All Types ▼] [All Status ▼] [🔄] [+ New Bot]             │
│                                                                          │
│ ┌────────────────────────────┐ ┌────────────────────────────┐            │
│ │ 🟢 BTC Grid Master    [⚙️] │ │ 🟢 ETH DCA Accumulator[⚙️] │            │
│ │ grid • binance • BTCUSDT   │ │ dca • bybit • ETHUSDT      │            │
│ │                            │ │                            │            │
│ │ $245.50  │ 156 trades      │ │ $890.20  │ 45 trades       │            │
│ │ PnL      │ 68% Win         │ │ PnL      │ 75% Win         │            │
│ │                            │ │                            │            │
│ │ [▶ Start] [⏸ Pause] [⏹ Stop]│ │ [▶ Start] [⏸ Pause] [⏹ Stop]│           │
│ └────────────────────────────┘ └────────────────────────────┘            │
│                                                                          │
│ ┌────────────────────────────┐ ┌────────────────────────────┐            │
│ │ 🟡 BB Signal Trader   [⚙️] │ │ ⚫ SOL Range Bot      [⚙️]  │            │
│ │ bb • okx • SOLUSDT         │ │ range • binance • SOLUSDT  │            │
│ │                            │ │                            │            │
│ │ $1,560.80│ 89 trades       │ │ $320.00  │ 34 trades       │            │
│ │ PnL      │ 62% Win         │ │ PnL      │ 71% Win         │            │
│ │                            │ │                            │            │
│ │ [▶ Start] [⏸ Pause] [⏹ Stop]│ │ [▶ Start] [⏸ Pause] [⏹ Stop]│           │
│ └────────────────────────────┘ └────────────────────────────┘            │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Обработка ошибок

### Ошибки WebSocket

При потере WebSocket соединения автоматически активируется HTTP polling fallback:

```typescript
// В хуке useBots
useEffect(() => {
  // Только если WebSocket отключен или недоступен
  if (!enableWebSocket || !wsConnected) {
    refresh();
    if (autoRefresh && refreshInterval > 0) {
      refreshIntervalRef.current = setInterval(refresh, refreshInterval);
    }
  }
}, [enableWebSocket, wsConnected]);
```

### Ошибки API

```typescript
// Обработка в BotsDashboard
{error && (
  <Card className="border-red-500/30 bg-red-500/5">
    <CardContent className="p-4 flex items-center gap-3">
      <AlertCircle className="h-5 w-5 text-red-500" />
      <div>
        <p className="font-medium text-red-500">Error Loading Bots</p>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
      <Button variant="outline" size="sm" onClick={refresh}>
        Retry
      </Button>
    </CardContent>
  </Card>
)}
```

---

## Best Practices

### 1. Использование WebSocket

Всегда включайте WebSocket для real-time обновлений:

```tsx
const { bots, wsConnected } = useBots({
  enableWebSocket: true,  // Рекомендуется
});
```

### 2. Обработка состояний загрузки

```tsx
{isLoading && bots.length === 0 && (
  <div className="flex-1 flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
)}
```

### 3. Оптимистичные обновления

```tsx
const handleControl = async (botId, botType, action) => {
  // Оптимистичное обновление UI
  setBots(prev => prev.map(bot => 
    bot.id === botId ? { ...bot, status: 'LOADING' } : bot
  ));
  
  // Отправка запроса
  const success = await controlBot(botId, botType, action);
  
  if (!success) {
    // Откат при ошибке
    refresh();
  }
};
```

---

## Связанная документация

- [Bot Manager API](../bots/BOT_MANAGER_API.md)
- [Grid Bot Implementation](../bots/GRID_BOT_IMPLEMENTATION.md)
- [Bot Engine Reference](../bots/BOT_ENGINE_REFERENCE.md)
- [Operational Bots UI](./OPERATIONAL_BOTS.md)
- [Analytical Bots](./ANALYTICAL_BOTS.md)
- [Institutional Bots](../bots/INSTITUTIONAL_BOTS.md)
- [Frequency Bots](../bots/FREQUENCY_BOTS.md)
