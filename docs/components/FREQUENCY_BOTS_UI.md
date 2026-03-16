# Frequency Bots UI Documentation

## Overview

Frequency Bots — это специализированные торговые системы, разработанные для работы на разных временных масштабах и торговых частотах. Каждый тип бота оптимизирован для конкретных рыночных условий и требований к задержке.

### Архитектура системы

```
┌─────────────────────────────────────────────────────────────────┐
│                    Frequency Bot Dashboard                       │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    FrequencyBotPanel                        ││
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        ││
│  │  │  HFT Bot     │ │  MFT Bot     │ │  LFT Bot     │        ││
│  │  │  (Helios)    │ │  (Selene)    │ │  (Chronos)   │        ││
│  │  └──────────────┘ └──────────────┘ └──────────────┘        ││
│  │                       ↓                                     ││
│  │  ┌──────────────────────────────────────────────────────┐  ││
│  │  │                   LOGOS Meta-Bot                      │  ││
│  │  │            (Signal Aggregator & Consensus)            │  ││
│  │  └──────────────────────────────────────────────────────┘  ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Классификация ботов

| Bot | Code | Name | Frequency | Latency Target | Trades/Day |
|-----|------|------|-----------|----------------|------------|
| HFT | `HFT` | Helios | Высокая | < 10ms | 100+ |
| MFT | `MFT` | Selene | Средняя | < 100ms | 10-50 |
| LFT | `LFT` | Chronos | Низкая | < 1s | 1-10 |

### Структура меню в Sidebar

Раздел **Частотные** является декоративным контейнером со следующими подразделами:

| Подраздел | ID | Описание |
|-----------|-----|----------|
| Дашборд | `frequency-bots` | Обзор всех частотных ботов |
| HFT | `hft-bot` | High Frequency Trading (Helios) |
| MFT | `mft-bot` | Medium Frequency Trading (Selene) |
| LFT | `lft-bot` | Low Frequency Trading (Chronos) |

---

## HFT Bot — Helios

### Описание

**Helios** — это высокочастотный торговый бот, специализирующийся на анализе микроструктуры ордербука. Разработан для стратегий, чувствительных к задержкам, с целевой задержкой < 10ms.

### Ключевые особенности

- **Sub-millisecond latency**: Go-движок обеспечивает обработку ордербука за < 1ms
- **Orderbook Imbalance**: Обнаружение дисбаланса бидов/асков для направленных сигналов
- **Momentum Signals**: Краткосрочный ценовой моментум
- **Go Engine Integration**: Отдельный микросервис на Go для максимальной производительности

### Компоненты UI

#### HFTBotPanel

```tsx
import { HFTBotPanel } from '@/components/bots/hft-bot-panel'

// Основной компонент панели HFT бота
<HFTBotPanel />
```

#### Props интерфейсы

```typescript
type BotStatus = 'idle' | 'starting' | 'running' | 'stopping' | 'error' | 'paused'

interface HFTConfig {
  symbol: string                    // Торговая пара (default: 'BTCUSDT')
  exchange: string                  // Биржа (default: 'binance')
  imbalanceThreshold: number        // Порог дисбаланса (default: 0.3)
  entryThreshold: number            // Порог входа (default: 0.5)
  stopLossPercent: number           // Стоп-лосс % (default: 0.5)
  takeProfitPercent: number         // Тейк-профит % (default: 1.0)
  maxPositionSize: number           // Макс. размер позиции (default: 100)
  maxOrdersPerMinute: number        // Макс. ордеров/мин (default: 10)
  enableMomentumSignals: boolean    // Включить моментум сигналы
}

interface HFTStats {
  totalTrades: number               // Всего сделок
  winningTrades: number             // Прибыльных сделок
  losingTrades: number              // Убыточных сделок
  totalPnl: number                  // Общий PnL
  winRate: number                   // Win Rate (0-1)
  avgLatency: number                // Средняя задержка (ms)
  signalsGenerated: number          // Сгенерировано сигналов
  uptime: number                    // Время работы
  currentImbalance: number          // Текущий дисбаланс
  currentSpread: number             // Текущий спред
  momentum: number                  // Моментум
}

interface SignalInfo {
  id: string
  timestamp: number
  type: string
  direction: 'LONG' | 'SHORT' | 'NEUTRAL'
  confidence: number               // 0-1
  entryPrice: number
  reason: string
}
```

#### OrderbookVisualization

Визуализация микроструктуры ордербука:

```tsx
<OrderbookVisualization 
  imbalance={stats?.currentImbalance ?? 0}
  spread={stats?.currentSpread ?? 0}
  momentum={stats?.momentum ?? 0}
/>
```

**Отображаемые метрики:**
- Bid/Ask баланс (визуальный бар)
- Спред в процентах
- Моментум (положительный/отрицательный)
- Текущий сигнал (LONG/SHORT/NEUTRAL)

#### SignalFeed

Лента HFT сигналов в реальном времени:

```tsx
<SignalFeed signals={signals} />
```

### Конфигурация по умолчанию

```typescript
const DEFAULT_HFT_CONFIG: HFTConfig = {
  symbol: 'BTCUSDT',
  exchange: 'binance',
  imbalanceThreshold: 0.3,
  entryThreshold: 0.5,
  stopLossPercent: 0.5,
  takeProfitPercent: 1.0,
  maxPositionSize: 100,
  maxOrdersPerMinute: 10,
  enableMomentumSignals: true,
}
```

### Go Engine Integration

HFT Bot использует отдельный Go-микросервис для максимальной производительности:

#### Структура сервиса

```
mini-services/hft-service/
├── main.go                    # Точка входа
├── config/
│   └── config.yaml           # Конфигурация
├── internal/
│   ├── api/
│   │   ├── handlers.go       # HTTP handlers
│   │   └── server.go         # API сервер
│   ├── engine/
│   │   ├── hft.go            # HFT движок
│   │   ├── orderbook.go      # Orderbook управление
│   │   └── strategies.go     # Торговые стратегии
│   └── ws/
│       └── client.go         # WebSocket клиенты
```

#### Конфигурация Go Engine (config.yaml)

```yaml
server:
  port: 3005

exchanges:
  binance:
    enabled: true
    ws_url: "wss://fstream.binance.com/ws"
  bybit:
    enabled: true
    ws_url: "wss://stream.bybit.com/v5/public/linear"

hft:
  max_latency_ns: 1000000      # 1ms в наносекундах
  orderbook_depth: 20
  signal_threshold: 0.7
  imbalance_threshold: 0.3
  momentum_window: 100
  momentum_threshold: 0.002    # 0.2%
```

#### Ключевые структуры Go Engine

```go
// Торговый сигнал
type TradingSignal struct {
    Symbol      string    `json:"symbol"`
    Exchange    string    `json:"exchange"`
    Strategy    string    `json:"strategy"`
    Direction   string    `json:"direction"` // "BUY" или "SELL"
    Strength    float64   `json:"strength"`  // 0-1
    Price       float64   `json:"price"`
    Quantity    float64   `json:"quantity"`
    Timestamp   int64     `json:"timestamp"`
    Reason      string    `json:"reason"`
    Metadata    map[string]interface{} `json:"metadata,omitempty"`
}

// Метрики ордербука
type OrderbookMetrics struct {
    BestBid         float64 `json:"best_bid"`
    BestAsk         float64 `json:"best_ask"`
    Spread          float64 `json:"spread"`
    SpreadBps       float64 `json:"spread_bps"`
    MidPrice        float64 `json:"mid_price"`
    Imbalance       float64 `json:"imbalance"`       // -1 to 1
    BidVolume       float64 `json:"bid_volume"`
    AskVolume       float64 `json:"ask_volume"`
    TotalVolume     float64 `json:"total_volume"`
    WeightedBidPx   float64 `json:"weighted_bid_px"`
    WeightedAskPx   float64 `json:"weighted_ask_px"`
}
```

#### Статистика задержек

```go
type LatencyStats struct {
    Count    int64   `json:"count"`
    Min      int64   `json:"min"`
    Max      int64   `json:"max"`
    Mean     int64   `json:"mean"`
    P50      int64   `json:"p50"`      // 50-й перцентиль
    P95      int64   `json:"p95"`      // 95-й перцентиль
    P99      int64   `json:"p99"`      // 99-й перцентиль
    P999     int64   `json:"p999"`     // 99.9-й перцентиль
    LastNs   int64   `json:"last_ns"`
    Avg1s    int64   `json:"avg_1s"`   // Среднее за 1 сек
    Avg10s   int64   `json:"avg_10s"`  // Среднее за 10 сек
    Avg1m    int64   `json:"avg_1m"`   // Среднее за 1 мин
}
```

### Стратегии HFT

#### Orderbook Imbalance Strategy

Обнаруживает дисбаланс между бидами и асками:

```
Imbalance = (BidVolume - AskVolume) / TotalVolume

Если Imbalance > 0.3 → LONG сигнал
Если Imbalance < -0.3 → SHORT сигнал
```

#### Momentum Strategy

Отслеживает краткосрочный ценовой моментум:

```
Momentum = (CurrentPrice - PriceN) / PriceN

Если Momentum > 0.002 → LONG сигнал
Если Momentum < -0.002 → SHORT сигнал
```

---

## MFT Bot — Selene

### Описание

**Selene** — это среднечастотный торговый бот, специализирующийся на анализе свингов и позиционной торговле. Определяет точки разворота и смены тренда.

### Ключевые особенности

- **Swing Points Detection**: Определение свинг-максимумов и минимумов
- **Trend Confirmation**: Мультитаймфреймное подтверждение тренда
- **Position Holding**: Период удержания от 15 минут до нескольких часов
- **Trailing Stop**: Динамический трейлинг-стоп

### Компоненты UI

#### MFTBotPanel

```tsx
import { MFTBotPanel } from '@/components/bots/mft-bot-panel'

<MFTBotPanel />
```

#### Props интерфейсы

```typescript
interface MFTConfig {
  symbol: string                    // Торговая пара
  exchange: string                  // Биржа
  timeframe: string                 // Таймфрейм (5m, 15m, 1h, 4h)
  swingLookback: number             // Свинг-откат (default: 10)
  trendConfirmation: number         // Подтверждение тренда (default: 3)
  stopLossPercent: number           // Стоп-лосс % (default: 2.0)
  takeProfitPercent: number         // Тейк-профит % (default: 5.0)
  positionSize: number              // Размер позиции
  useTrailingStop: boolean          // Использовать трейлинг
  trailingStopPercent: number       // Трейлинг % (default: 1.5)
}

interface MFTStats {
  totalTrades: number
  winningTrades: number
  losingTrades: number
  totalPnl: number
  winRate: number
  avgHoldingTime: number            // Среднее время удержания (ms)
  signalsGenerated: number
  currentSwingHigh: number          // Текущий свинг-максимум
  currentSwingLow: number           // Текущий свинг-минимум
  trend: 'UP' | 'DOWN' | 'SIDEWAYS'
}

interface SwingPoint {
  type: 'HIGH' | 'LOW'
  price: number
  timestamp: number
  strength: number                  // Сила свинга (0-1)
}
```

#### SwingPointsVisualization

Визуализация свинг-анализа:

```tsx
<SwingPointsVisualization 
  swingHigh={stats?.currentSwingHigh ?? 0}
  swingLow={stats?.currentSwingLow ?? 0}
  trend={stats?.trend ?? 'SIDEWAYS'}
/>
```

**Отображаемые элементы:**
- Resistance (свинг-максимум)
- Support (свинг-минимум)
- Диапазон цены
- Направление тренда (стрелка)

#### TrendIndicator

Индикатор направления тренда:

```tsx
<TrendIndicator 
  trend={stats?.trend ?? 'SIDEWAYS'} 
  confidence={0.75}
/>
```

**Визуальные элементы:**
- Бычий/Медвежий индикаторы
- Центральный круг с направлением
- Процент уверенности

### Конфигурация по умолчанию

```typescript
const DEFAULT_MFT_CONFIG: MFTConfig = {
  symbol: 'BTCUSDT',
  exchange: 'binance',
  timeframe: '15m',
  swingLookback: 10,
  trendConfirmation: 3,
  stopLossPercent: 2.0,
  takeProfitPercent: 5.0,
  positionSize: 100,
  useTrailingStop: true,
  trailingStopPercent: 1.5,
}
```

### Стратегии MFT

#### Volume Profile Strategy

Определяет уровни с высоким объемом как поддержку/сопротивление:

```typescript
interface VolumeProfile {
  symbol: string
  timeframe: string
  nodes: VolumeNode[]
  poc: number        // Point of Control (макс. объем)
  vah: number        // Value Area High (70% объема)
  val: number        // Value Area Low
  timestamp: number
}
```

#### Market Regime Detection

```typescript
interface MarketRegime {
  type: 'trending' | 'ranging' | 'volatile' | 'quiet'
  strength: number     // 0-1
  direction: 'up' | 'down' | 'sideways'
  confidence: number
  timestamp: number
}
```

### Лучшие условия для торговли

- Трендовые рынки с четким направлением
- Таймфреймы: 15m, 1h, 4h
- Средняя продолжительность сделки: 15 минут - 4 часа

---

## LFT Bot — Chronos

### Описание

**Chronos** — это низкочастотный торговый бот, фокусирующийся на макро-трендах и позиционной торговле с длительными периодами удержания.

### Ключевые особенности

- **Macro Trend Analysis**: Анализ макро-рыночных условий
- **Position Holding**: Период удержания от 4 часов до 3 дней
- **Fundamental Filter**: Фильтрация сигналов через фундаментальный анализ
- **Risk Per Trade**: Фиксированный риск на сделку

### Компоненты UI

#### LFTBotPanel

```tsx
import { LFTBotPanel } from '@/components/bots/lft-bot-panel'

<LFTBotPanel />
```

#### Props интерфейсы

```typescript
interface LFTConfig {
  symbol: string                    // Торговая пара
  exchange: string                  // Биржа
  timeframe: string                 // Таймфрейм (1h, 4h, 1d)
  macroLookback: number             // Макро-откат (default: 30)
  minHoldingHours: number           // Мин. удержание (default: 4)
  maxHoldingHours: number           // Макс. удержание (default: 72)
  stopLossPercent: number           // Стоп-лосс % (default: 5.0)
  takeProfitPercent: number         // Тейк-профит % (default: 15.0)
  positionSize: number              // Размер позиции
  useFundamentalFilter: boolean     // Фундаментальный фильтр
  riskPerTrade: number              // Риск на сделку % (default: 2.0)
}

interface LFTStats {
  totalTrades: number
  winningTrades: number
  losingTrades: number
  totalPnl: number
  winRate: number
  avgHoldingTime: number
  signalsGenerated: number
  macroTrend: 'BULLISH' | 'BEARISH' | 'NEUTRAL'
  marketCondition: string           // Описание состояния рынка
  activePosition: boolean           // Есть активная позиция
}

interface PositionInfo {
  id: string
  symbol: string
  direction: 'LONG' | 'SHORT'
  entryPrice: number
  size: number
  pnl: number
  pnlPercent: number
  openedAt: number
  stopLoss: number
  takeProfit: number
}

interface SignalInfo {
  id: string
  timestamp: number
  type: string
  direction: 'LONG' | 'SHORT' | 'NEUTRAL'
  confidence: number
  entryPrice: number
  reason: string
  macroContext: string              // Макро-контекст сигнала
}
```

#### MacroTrendIndicator

Индикатор макро-тренда:

```tsx
<MacroTrendIndicator 
  trend={stats?.macroTrend ?? 'NEUTRAL'} 
  condition={stats?.marketCondition ?? 'Загрузка...'}
/>
```

**Визуальные элементы:**
- Шкала тренда (бычий ←→ медвежий)
- Индикатор текущей позиции
- Описание состояния рынка

#### PositionTimeline

Таймлайн активной позиции:

```tsx
<PositionTimeline position={position} />
```

**Отображаемые данные:**
- Направление и символ позиции
- Текущий PnL (%)
- Прогресс-бар времени удержания
- Цена входа, Стоп-лосс, Тейк-профит

### Конфигурация по умолчанию

```typescript
const DEFAULT_LFT_CONFIG: LFTConfig = {
  symbol: 'BTCUSDT',
  exchange: 'binance',
  timeframe: '4h',
  macroLookback: 30,
  minHoldingHours: 4,
  maxHoldingHours: 72,
  stopLossPercent: 5.0,
  takeProfitPercent: 15.0,
  positionSize: 500,
  useFundamentalFilter: true,
  riskPerTrade: 2.0,
}
```

### Стратегии LFT

#### Trend Following

```typescript
interface TrendAnalysis {
  direction: 'up' | 'down' | 'sideways'
  strength: number       // 0-1
  slope: number          // Изменение цены за период
  ema: number            // Текущее значение EMA
  pricePosition: 'above' | 'below' | 'neutral'
  confidence: number
  timestamp: number
}
```

#### Multi-Timeframe Analysis

```typescript
interface MultiTimeframeAnalysis {
  higherTF: {
    trend: TrendAnalysis
    bias: 'bullish' | 'bearish' | 'neutral'
  }
  primaryTF: {
    trend: TrendAnalysis
    sr: SupportResistance | null
    fib: FibonacciLevels | null
  }
  lowerTF: {
    trend: TrendAnalysis
    entry: {
      optimal: boolean
      price: number | null
    }
  }
  alignment: 'aligned' | 'conflicting' | 'neutral'
  overallBias: 'bullish' | 'bearish' | 'neutral'
  confidence: number
}
```

#### Position Scaling

```typescript
interface LFTPosition {
  baseQuantity: number
  currentQuantity: number
  scaledIn: boolean
  
  // Multiple TP levels
  takeProfit1: number
  takeProfit2?: number
  takeProfit3?: number
  
  // Status
  tp1Hit: boolean
  tp2Hit: boolean
  tp3Hit: boolean
}
```

### Лучшие условия для торговли

- Захват крупных движений рынка
- Таймфреймы: 4h, 1d
- Средняя продолжительность сделки: 4 часа - 3 дня

---

## Frequency Dashboard

### Описание

Главный дашборд для управления всеми частотными ботами и мониторинга их состояния.

### Компоненты UI

#### FrequencyBotPanel

```tsx
import { FrequencyBotPanel } from '@/components/bots/frequency-bot-panel'

<FrequencyBotPanel />
```

#### Props интерфейсы

```typescript
type BotCategory = 'operational' | 'institutional' | 'frequency' | 'meta'

interface BotInfo {
  code: string                      // Код бота (HFT, MFT, LFT)
  name: string                      // Имя (Helios, Selene, Chronos)
  fullName: string                  // Полное имя
  category: BotCategory             // Категория
  description: string               // Описание
  status: BotStatus                 // Статус
  enabled: boolean                  // Включен
  config: Record<string, unknown>   // Конфигурация
  stats: BotStats | null            // Статистика
  lastError?: string                // Последняя ошибка
  lastErrorTime?: number            // Время последней ошибки
}

interface BotStats {
  totalTrades: number
  winningTrades: number
  losingTrades: number
  totalPnl: number
  winRate: number
  avgLatency: number
  lastSignalTime?: number
  signalsGenerated: number
  uptime: number
  startedAt?: number
}
```

#### FrequencyBotCard

Карточка отдельного бота в дашборде:

```tsx
<FrequencyBotCard 
  bot={bot}
  onToggle={handleToggle}
  onConfig={handleConfig}
/>
```

**Отображаемые элементы:**
- Имя и код бота с иконкой
- Статус (цветной индикатор)
- Описание
- Статистика: Сделки, Win Rate, PnL, Задержка
- Прогресс-бар Win Rate
- Ошибки (если есть)
- Переключатель ON/OFF
- Кнопка настроек

#### LogosPanel

Панель мета-бота LOGOS:

```tsx
<LogosPanel 
  status={logosStatus}
  signals={signals.filter(s => s.botCode === 'LOGOS')}
  onStart={handleStartLogos}
  onStop={handleStopLogos}
/>
```

**Функции LOGOS:**
- Агрегация сигналов от всех ботов
- Принятие единых торговых решений на основе консенсуса
- Отслеживание точности ботов

```typescript
interface LogosStatus {
  status: string
  config: {
    minSignals: number           // Мин. сигналов для консенсуса
    minConfidence: number        // Мин. уверенность
    minConsensus: number         // Мин. консенсус
  }
  performances: Array<{
    botCode: string
    accuracy: number
    totalSignals: number
  }>
}
```

#### SignalFeed

Лента всех сигналов:

```tsx
<SignalFeed signals={signals} />
```

**Отображение сигнала:**
- Направление (LONG/SHORT)
- Символ
- Код бота-источника
- Уверенность (%)
- Время

### Стилистика категорий

```typescript
const categoryStyles: Record<BotCategory, { icon: React.ElementType; color: string; bgColor: string }> = {
  operational: { icon: Activity, color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  institutional: { icon: Crown, color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
  frequency: { icon: Cpu, color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  meta: { icon: Brain, color: 'text-green-400', bgColor: 'bg-green-500/10' },
}
```

### Стилистика статусов

```typescript
const statusStyles: Record<BotStatus, { color: string; label: string }> = {
  idle: { color: 'bg-gray-500', label: 'Ожидание' },
  starting: { color: 'bg-yellow-500', label: 'Запуск' },
  running: { color: 'bg-green-500', label: 'Работает' },
  stopping: { color: 'bg-yellow-500', label: 'Остановка' },
  error: { color: 'bg-red-500', label: 'Ошибка' },
  paused: { color: 'bg-orange-500', label: 'Пауза' },
}
```

### Действия дашборда

| Действие | Описание |
|----------|----------|
| Запустить все | Запускает все остановленные боты |
| Остановить все | Останавливает все работающие боты |
| Обновить | Обновляет состояние всех ботов |
| Настройки | Открывает диалог конфигурации бота |

---

## API Endpoints

### Frequency Bots API

#### GET /api/bots/frequency

Получение списка всех частотных ботов.

**Response:**
```json
{
  "bots": [
    {
      "code": "HFT",
      "name": "Helios",
      "fullName": "High Frequency Trading Bot",
      "category": "frequency",
      "description": "Высокочастотная торговля",
      "status": "running",
      "enabled": true,
      "stats": {
        "totalTrades": 1523,
        "winRate": 0.62,
        "totalPnl": 1250.50,
        "avgLatency": 8.5
      }
    }
  ]
}
```

#### GET /api/bots/frequency?botCode=HFT

Получение состояния конкретного бота.

**Response:**
```json
{
  "bot": {
    "status": "running",
    "stats": {
      "totalTrades": 1523,
      "winRate": 0.62,
      "totalPnl": 1250.50,
      "avgLatency": 8.5,
      "currentImbalance": 0.35,
      "currentSpread": 0.0012,
      "momentum": 0.0025
    },
    "signals": [
      {
        "id": "sig_001",
        "timestamp": 1703001234567,
        "direction": "LONG",
        "confidence": 0.78,
        "entryPrice": 42500.50,
        "reason": "Orderbook imbalance detected"
      }
    ]
  }
}
```

#### POST /api/bots/frequency

Управление ботом (запуск/остановка).

**Request:**
```json
{
  "action": "start",
  "botCode": "HFT"
}
```

**Response:**
```json
{
  "success": true,
  "status": "starting"
}
```

#### PUT /api/bots/frequency

Обновление конфигурации бота.

**Request:**
```json
{
  "botCode": "HFT",
  "config": {
    "symbol": "ETHUSDT",
    "imbalanceThreshold": 0.4,
    "maxPositionSize": 200
  }
}
```

### LOGOS API

#### GET /api/bots/logos

Получение состояния мета-бота LOGOS.

**Response:**
```json
{
  "bot": {
    "status": "running",
    "config": {
      "minSignals": 3,
      "minConfidence": 0.6,
      "minConsensus": 0.7
    },
    "performances": [
      { "botCode": "HFT", "accuracy": 0.65, "totalSignals": 1250 },
      { "botCode": "MFT", "accuracy": 0.72, "totalSignals": 450 },
      { "botCode": "LFT", "accuracy": 0.78, "totalSignals": 85 }
    ]
  }
}
```

#### POST /api/bots/logos

Управление LOGOS ботом.

**Request:**
```json
{
  "action": "start"
}
```

### HFT Go Service API

#### GET http://localhost:3005/health

Health check Go сервиса.

#### GET http://localhost:3005/metrics

Метрики производительности Go движка.

**Response:**
```json
{
  "running": true,
  "uptime_ms": 3600000,
  "total_updates": 1250000,
  "total_signals": 3500,
  "signals_by_type": {
    "imbalance": 2100,
    "momentum": 1400
  },
  "orderbook_count": 2
}
```

#### GET http://localhost:3005/latency

Статистика задержек.

**Response:**
```json
{
  "engine": {
    "count": 1250000,
    "mean": 450000,
    "p50": 380000,
    "p95": 920000,
    "p99": 1200000,
    "avg_1s": 420000
  },
  "signal": {
    "count": 3500,
    "mean": 85000,
    "p50": 72000,
    "p95": 150000
  }
}
```

#### GET http://localhost:3005/orderbooks

Снапшоты всех ордербуков.

#### GET http://localhost:3005/signals?limit=100

Последние сигналы.

---

## Примеры использования

### 1. Базовый запуск HFT бота

```tsx
import { HFTBotPanel } from '@/components/bots/hft-bot-panel'

function TradingPage() {
  return (
    <div className="container mx-auto p-6">
      <HFTBotPanel />
    </div>
  )
}
```

### 2. Программное управление ботом

```typescript
// Запуск HFT бота
async function startHFTBot() {
  const response = await fetch('/api/bots/frequency', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'start', botCode: 'HFT' }),
  })
  return response.json()
}

// Обновление конфигурации
async function updateHFTConfig(newConfig: Partial<HFTConfig>) {
  await fetch('/api/bots/frequency', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ botCode: 'HFT', config: newConfig }),
  })
}
```

### 3. Подписка на WebSocket события

```typescript
import { useEffect } from 'react'

function useBotSignals(botCode: string) {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3005/ws')
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'signal' && data.botCode === botCode) {
        console.log('New signal:', data.signal)
      }
    }
    
    return () => ws.close()
  }, [botCode])
}
```

### 4. Интеграция с Event Bus

```typescript
import { getEventBus } from '@/lib/orchestration'

const bus = getEventBus()

// Подписка на сигналы частотных ботов
await bus.subscribe('analytics.signal.*', (event) => {
  if (event.category === 'analytics' && event.type === 'signal.generated') {
    const { botId, direction, confidence } = event.data
    
    if (['HFT', 'MFT', 'LFT'].includes(botId)) {
      console.log(`Signal from ${botId}: ${direction} (${confidence})`)
    }
  }
})
```

### 5. Мульти-бот мониторинг

```tsx
import { FrequencyBotPanel } from '@/components/bots/frequency-bot-panel'

function FrequencyBotsPage() {
  return (
    <div className="space-y-6">
      <h1>Частотные боты</h1>
      <FrequencyBotPanel />
    </div>
  )
}
```

### 6. Создание кастомной конфигурации

```typescript
// Высокочастотная стратегия на ETH
const ethHFTConfig: HFTConfig = {
  symbol: 'ETHUSDT',
  exchange: 'binance',
  imbalanceThreshold: 0.25,        // Более чувствительный
  entryThreshold: 0.6,             // Ниже порог входа
  stopLossPercent: 0.3,            // Туже стопы
  takeProfitPercent: 0.5,          // Быстрее выход
  maxPositionSize: 50,             // Меньше размер
  maxOrdersPerMinute: 15,          // Больше частота
  enableMomentumSignals: true,
}

// Применение конфигурации
await fetch('/api/bots/frequency', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ botCode: 'HFT', config: ethHFTConfig }),
})
```

---

## Уровни риска

| Bot | Risk Level | Описание |
|-----|------------|----------|
| HFT | Aggressive | Высокая частота сделок, узкие стопы |
| MFT | Moderate | Сбалансированный подход, дневные лимиты |
| LFT | Conservative | Низкая частота, широкие стопы, масштабирование |

---

## Лучшие практики

### HFT Bot

1. **Выбор пар**: Используйте ликвидные пары с узкими спредами
2. **Локация сервера**: Размещайте максимально близко к бирже
3. **Мониторинг**: Следите за задержкой (должна быть < 10ms)
4. **Risk Management**: Установите дневной лимит убытков

### MFT Bot

1. **Таймфреймы**: Используйте мультитаймфреймное подтверждение
2. **Режим рынка**: Лучше работает на трендовых рынках
3. **Swing Points**: Ищите четкие уровни поддержки/сопротивления
4. **Trailing Stop**: Используйте для максимизации прибыли

### LFT Bot

1. **Макро-анализ**: Учитывайте фундаментальные факторы
2. **Патience**: Позволяйте позициям развиваться (4h - 72h)
3. **Position Scaling**: Масштабируйте позиции на уровнях
4. **Risk Per Trade**: Не рискуйте более 2% на сделку

---

## Файловая структура

```
src/components/bots/
├── hft-bot-panel.tsx           # HFT Bot UI
├── mft-bot-panel.tsx           # MFT Bot UI
├── lft-bot-panel.tsx           # LFT Bot UI
├── frequency-bot-panel.tsx     # Dashboard

src/lib/
├── hft-bot/
│   ├── index.ts                # Module exports
│   ├── types.ts                # Type definitions
│   └── engine.ts               # HFT engine
├── mft-bot/
│   ├── index.ts
│   └── engine.ts               # MFT engine
└── lft-bot/
    ├── index.ts
    └── engine.ts               # LFT engine

mini-services/hft-service/
├── main.go                     # Entry point
├── config/config.yaml          # Configuration
└── internal/
    ├── api/                    # HTTP API
    ├── engine/                 # HFT Engine (Go)
    └── ws/                     # WebSocket clients
```

---

## Связанные документы

- [Frequency Bots Technical Reference](../bots/FREQUENCY_BOTS.md)
- [HFT Service Documentation](../microservices/hft-service.md)
- [LOGOS Self-Learning](../bots/LOGOS_SELF_LEARNING.md)
- [Risk Management UI](./RISK_MANAGEMENT_UI.md)
- [Trading System](./TRADING_SYSTEM.md)
