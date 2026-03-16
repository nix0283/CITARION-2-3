# Analytical Bots Documentation

## Обзор

Аналитические боты CITARION представляют собой набор специализированных торговых алгоритмов, каждый из которых предназначен для определённого типа рыночных условий и торговых стратегий.

### Архитектурная схема

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ANALYTICAL BOTS ECOSYSTEM                             │
│                                                                              │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐     │
│  │    PND      │   │    TRND     │   │    FCST     │   │    RNG      │     │
│  │   Argus     │   │   Orion     │   │   Vision    │   │   Range     │     │
│  │ Pump&Dump   │   │ Trend       │   │ Forecast    │   │ Trading     │     │
│  └──────┬──────┘   └──────┬──────┘   └──────┬──────┘   └──────┬──────┘     │
│         │                 │                 │                 │             │
│  ┌──────┴─────────────────┴─────────────────┴─────────────────┴──────┐     │
│  │                     Shared Infrastructure                          │     │
│  │  • Signal Filter System  • Risk Manager  • Exchange Adapters     │     │
│  │  • ML Integration        • Backtesting   • WebSocket Manager     │     │
│  └───────────────────────────────────────────────────────────────────┘     │
│                                                                              │
│  ┌─────────────┐                                                            │
│  │    WOLF     │  Pattern Recognition Specialist                            │
│  │  WolfBot    │  Multi-timeframe technical analysis                       │
│  └─────────────┘                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Таблица ботов

| Код | Имя | Тип | Рыночные условия | Стратегия |
|-----|-----|-----|------------------|-----------|
| PND | Argus | Детектор | Volatile/Momentum | Pump & Dump detection |
| TRND | Orion | Трендовый | Trending markets | EMA + Supertrend |
| FCST | Vision | Прогнозный | Любые | ML forecasting |
| RNG | Range | Диапазонный | Sideways/Consolidation | Support/Resistance |
| WOLF | WolfBot | Паттерный | Любые | Pattern recognition |

---

## 1. Argus Bot (PND)

### 1.1 Обзор

**Argus** — бот для автоматической детекции и торговли pump/dump движений. Назван в честь мифологического стража с сотней глаз, символизирующего постоянное наблюдение за рынком.

### 1.2 Компонент

**Файл:** `/src/components/bots/argus-bot-manager.tsx`

#### Props Interface

```typescript
interface ArgusBot {
  id: string;
  name: string;
  status: "ACTIVE" | "PAUSED" | "STOPPED";
  exchange: string;
  enable5Long: boolean;
  enable5Short: boolean;
  enable12Long: boolean;
  enable12Short: boolean;
  pumpThreshold5m: number;
  dumpThreshold5m: number;
  leverage: number;
  positionSize: number;
  useMarketForecast: boolean;
  forecastWeight: number;
  createdAt: string;
}

interface ArgusSignal {
  id: string;
  botId: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  type: "PUMP_5M" | "PUMP_15M" | "DUMP_5M" | "DUMP_15M";
  priceChange: number;
  confidence: number;
  executed: boolean;
  createdAt: string;
}
```

### 1.3 Алгоритм детекции

#### Pump/Dump Detection

```
┌─────────────────────────────────────────────────────────────────┐
│                    PUMP/DUMP DETECTION                          │
│                                                                 │
│  Price Change (ΔP) = (CurrentPrice - PreviousPrice) / Previous  │
│                                                                 │
│  PUMP Signal:                                                   │
│    ΔP > pumpThreshold (default: 5% in 5min)                    │
│    + Volume spike > 2x average                                  │
│    + Confidence calculation                                     │
│                                                                 │
│  DUMP Signal:                                                   │
│    ΔP < -dumpThreshold (default: -5% in 5min)                  │
│    + Volume spike > 2x average                                  │
│    + Confidence calculation                                     │
└─────────────────────────────────────────────────────────────────┘
```

#### Конфигурация по умолчанию

| Параметр | Значение | Описание |
|----------|----------|----------|
| pumpThreshold5m | 5% | Порог pump за 5 минут |
| dumpThreshold5m | 5% | Порог dump за 5 минут |
| leverage | 10x | Плечо по умолчанию |
| positionSize | 50 USDT | Размер позиции |
| forecastWeight | 30% | Вес прогноза при фильтрации |

#### Интеграция с Market Forecast

```typescript
// Фильтрация сигналов через Market Forecast
if (bot.useMarketForecast) {
  const forecast = await getMarketForecast(symbol);
  const adjustedConfidence = signal.confidence * (1 - bot.forecastWeight) +
                            forecast.confidence * bot.forecastWeight;
  
  if (forecast.direction !== signal.direction) {
    // Прогноз противоречит сигналу - снижение уверенности
    adjustedConfidence *= 0.7;
  }
}
```

### 1.4 API Endpoints

```bash
# Получить список ботов
GET /api/bots/argus

# Получить сигналы
GET /api/bots/argus?signals=true

# Создать бота
POST /api/bots/argus
{
  "action": "create",
  "name": "Argus-BTC-1",
  "exchange": "bingx",
  "leverage": 10,
  "positionSize": 50,
  "pumpThreshold5m": 0.05,
  "dumpThreshold5m": 0.05,
  "useMarketForecast": true,
  "forecastWeight": 0.3
}

# Управление ботом
POST /api/bots/argus
{
  "action": "start" | "pause",
  "botId": "bot-xxx"
}

# Удалить бота
DELETE /api/bots/argus?id=bot-xxx
```

### 1.5 Поддерживаемые биржи

| Биржа | Статус |
|-------|--------|
| BingX | ✅ Full |
| Binance | ✅ Full |
| Bybit | ✅ Full |

---

## 2. Orion Bot (TRND)

### 2.1 Обзор

**Orion** — трендовый бот, использующий EMA + Supertrend стратегию с Kelly Criterion риск-менеджментом. Назван в честь охотника из греческой мифологии.

### 2.2 Компонент

**Файл:** `/src/components/bots/orion-bot-manager.tsx`

#### Props Interface

```typescript
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
```

### 2.3 Стратегия EMA + Supertrend

#### EMA Alignment

```
Bullish Alignment:
  EMA20 > EMA50 > EMA200
  
Bearish Alignment:
  EMA20 < EMA50 < EMA200
```

| EMA | Период | Назначение |
|-----|--------|------------|
| Fast | 20 | Краткосрочный импульс |
| Medium | 50 | Среднесрочный тренд |
| Slow | 200 | Долгосрочный тренд |

**Alignment Score (-1 до +1):**
```typescript
let score = 0;
if (ema20 > ema50) score += 0.33;
if (ema50 > ema200) score += 0.33;
if (ema20 > ema200) score += 0.34;
```

#### Supertrend

```
Upper Band = HL2 + (Multiplier × ATR)
Lower Band = HL2 - (Multiplier × ATR)

Где HL2 = (High + Low) / 2
```

**Параметры по умолчанию:**

| Параметр | Значение | Обоснование |
|----------|----------|-------------|
| Period | 10 | Баланс между чувствительностью и шумом |
| Multiplier | 3.0 | Классическое значение для трендовых рынков |

### 2.4 ML Интеграция

#### Signal Components

```typescript
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

#### Ensemble Confidence

```typescript
function calculateEnsembleConfidence(): number {
  const scores = [
    superTrendSignal?.strength || 0,
    npcSignal?.confidence || 0,
    squeezeSignal ? (squeezeSignal.isSqueezing ? 0.8 : 0.5) : 0,
  ];
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}
```

### 2.5 Kelly Criterion Risk Management

#### Формула Kelly

```
Kelly% = W - (1 - W) / R

Где:
  W = Win Rate (доля прибыльных сделок)
  R = Win/Loss Ratio (средняя прибыль / средний убыток)
```

#### Fractional Kelly

```typescript
// Quarter Kelly для production
quarterKelly = kellyOptimal * 0.25;
```

#### Конфигурация риска

```typescript
const defaultRiskConfig = {
  riskPerTrade: {
    mode: 'fractional_kelly',
    kellyFraction: 0.25,      // Quarter Kelly
    maxRiskPct: 2,            // Максимум 2% на сделку
    minRiskPct: 0.25,         // Минимум 0.25% на сделку
  },
  limits: {
    maxPositions: 5,
    maxPositionsPerSymbol: 2,
    maxCorrelation: 0.6,
    maxDrawdown: 10,
    dailyLossLimit: 3,
  },
  leverage: {
    default: 3,
    max: 5,
    volatileRegimeMultiplier: 0.5,
  },
};
```

### 2.6 Hedging Mode

```
┌─────────────┐
│  UNHEDGED   │ ← Начальное состояние
└──────┬──────┘
       │ Открыта противоположная позиция
       ▼
┌─────────────┐
│  PARTIAL    │ ← Частичный хедж
└──────┬──────┘
       │ Полное покрытие
       ▼
┌─────────────┐
│   FULL      │ ← Полный хедж (net ~ 0)
└─────────────┘
```

### 2.7 Paper Trading Validation

| Критерий | Минимум | Обоснование |
|----------|---------|-------------|
| Duration | 7 дней | Достаточно для разных рыночных условий |
| Trades | 20 | Статистически значимая выборка |
| Win Rate | 40% | Ниже — стратегия не работает |
| Max Drawdown | 10% | Риск-менеджмент работает |
| Profit Factor | 1.0 | Минимум безубыточность |

### 2.8 API Endpoints

```bash
# Статус бота
GET /api/trend-bot

# Запуск/остановка
POST /api/trend-bot
{
  "action": "start" | "stop" | "halt" | "resume" | "goLive"
}

# Закрытие позиции
POST /api/trend-bot
{
  "action": "closePosition",
  "positionId": "pos-xxx"
}
```

---

## 3. Vision Bot (FCST)

### 3.1 Обзор

**Vision** — бот для прогнозирования рынка с вероятностным анализом и ML-моделями.

### 3.2 Компонент

**Файл:** `/src/components/bots/vision-bot-manager.tsx`

#### Props Interface

```typescript
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
```

### 3.3 Стратегии

| Стратегия | Описание | SL/TP |
|-----------|----------|-------|
| basic | Фиксированный | SL 2% / TP 4% |
| multi_tp | Множественные TP | TP: 2%, 4%, 6% |
| trailing | Trailing stop | Trailing 2% |
| reentry_24h | Ре-энтри до 3 раз | SL 3% |

### 3.4 Профили риска

| Профиль | Плечо | Риск |
|---------|-------|------|
| Easy | 2x | 5% |
| Normal | 3x | 10% |
| Hard | 5x | 15% |
| Scalper | 10x | 2% |

### 3.5 ML Модели

#### Ensemble Signal Filter

```typescript
interface EnsembleScore {
  lawrence: number;    // Lawrence Classifier
  ml: number;          // ML Model
  forecast: number;    // Forecast Model
  overall: number;     // Weighted average
  direction: "LONG" | "SHORT" | "NEUTRAL";
}
```

#### Алгоритм генерации Ensemble Score

```typescript
function generateEnsembleScore(forecast: MarketForecast): EnsembleScore {
  const lawrence = forecast.confidence * 0.9 + Math.random() * 0.1;
  const ml = forecast.confidence * 0.85 + Math.random() * 0.15;
  const forecastScore = forecast.confidence;
  const overall = (lawrence + ml + forecastScore) / 3;

  return {
    lawrence,
    ml,
    forecast: forecastScore,
    overall,
    direction: forecast.signal,
  };
}
```

#### Рекомендации по действию

| Overall Score | Действие | Цвет |
|---------------|----------|------|
| ≥ 70% | ENTER | Зелёный |
| 50-70% | WAIT | Жёлтый |
| < 50% | AVOID | Красный |

### 3.6 Backtesting

```typescript
interface BacktestResult {
  symbol: string;
  strategy: string;
  totalReturnPct: number;
  sharpeRatio: number;
  maxDrawdownPct: number;
  numTrades: number;
  winRatePct: number;
}
```

### 3.7 API Endpoints

```bash
# Список ботов
GET /api/bots/vision

# Прогноз
GET /api/bots/vision?action=forecast

# Создать бота
POST /api/bots/vision?action=create
{
  "name": "Vision-BTC-1",
  "strategy": "reentry_24h",
  "riskProfile": "normal",
  "filterEnabled": true
}

# Запуск бэктеста
POST /api/bots/vision?action=backtest
{
  "symbol": "BTC/USDT",
  "strategy": "reentry_24h",
  "days": 365,
  "filterEnabled": true
}
```

---

## 4. Range Bot (RNG)

### 4.1 Обзор

**Range Bot** — торговый бот для бокового/диапазонного рынка (sideways/ranging markets).

### 4.2 Компонент

**Файл:** `/src/components/bots/range-bot-manager.tsx`

#### Props Interface

```typescript
interface RangeLevel {
  price: number;
  type: 'SUPPORT' | 'RESISTANCE' | 'MID';
  touches: number;
  strength: number;
}

interface RangeState {
  symbol: string;
  rangeHigh: number;
  rangeLow: number;
  rangeMid: number;
  rangeWidth: number;
  inRange: boolean;
  position: 'TOP' | 'BOTTOM' | 'MIDDLE';
  breakout: 'UPSIDE' | 'DOWNSIDE' | null;
  timeInRange: number;
}

interface RangePosition {
  id: string;
  type: 'LONG' | 'SHORT';
  entryPrice: number;
  size: number;
  stopLoss: number;
  takeProfit: number;
  pnl: number;
  pnlPercent: number;
}

interface RangeSignal {
  type: 'BUY' | 'SELL' | 'CLOSE_LONG' | 'CLOSE_SHORT' | 'BREAKOUT_UP' | 'BREAKOUT_DOWN';
  price: number;
  confidence: number;
  reason: string;
  rangePosition: number;
  oscillatorConfirm: boolean;
}
```

### 4.3 Конфигурация

```typescript
interface RangeConfig {
  symbol: string;
  
  // Range detection
  lookbackPeriod: number;       // Период для анализа (default: 50)
  minTouches: number;           // Минимум касаний для уровня (default: 2)
  touchThreshold: number;       // % отклонения для касания (default: 0.3)
  maxRangeWidth: number;        // Макс. ширина диапазона % (default: 5)
  minRangeWidth: number;        // Мин. ширина диапазона % (default: 0.5)
  
  // Entry/Exit
  entryFromSupport: number;     // % над поддержкой для покупки (default: 0.2)
  entryFromResistance: number;  // % под сопротивлением для продажи (default: 0.2)
  takeProfitPercent: number;    // TP от entry (default: 1.5)
  stopLossPercent: number;      // SL от entry (default: 1.0)
  
  // Oscillator confirmation
  useRSI: boolean;
  rsiPeriod: number;
  rsiOversold: number;
  rsiOverbought: number;
  
  useStochastic: boolean;
  
  // Breakout settings
  breakoutConfirmation: number; // % за уровнем для подтверждения (default: 0.5)
  
  // Position sizing
  positionSize: number;         // USDT за сделку (default: 100)
  maxPositions: number;         // Макс. позиций (default: 3)
}
```

### 4.4 Осцилляторная стратегия

#### RSI Confirmation

```
BUY Signal:
  Price near support (entryFromSupport range)
  + RSI <= rsiOversold (30)
  + confidence = (1 - (RSI / rsiOversold)) * oscillatorWeight

SELL Signal:
  Price near resistance (entryFromResistance range)
  + RSI >= rsiOverbought (70)
  + confidence = ((RSI - rsiOverbought) / (100 - rsiOverbought)) * oscillatorWeight
```

### 4.5 Типы сигналов

| Тип | Описание | Условие |
|-----|----------|----------|
| `BUY` | Покупка | Цена около поддержки + RSI перепродан |
| `SELL` | Продажа | Цена около сопротивления + RSI перекуплен |
| `CLOSE_LONG` | Закрыть long | Цена у сопротивления |
| `CLOSE_SHORT` | Закрыть short | Цена у поддержки |
| `BREAKOUT_UP` | Пробой вверх | Цена выше сопротивления + confirmation |
| `BREAKOUT_DOWN` | Пробой вниз | Цена ниже поддержки + confirmation |

### 4.6 API Endpoints

```bash
# Анализ range
POST /api/bots/range
{
  "action": "analyze",
  "prices": [95000, 95100, ...],
  "config": { ... RangeConfig }
}
```

---

## 5. Wolf Bot (WOLF)

### 5.1 Обзор

**WolfBot** — продвинутый бот для технического анализа и автоматического распознавания графических паттернов.

### 5.2 Компонент

**Файл:** `/src/components/bots/wolfbot-panel.tsx`

#### Props Interface

```typescript
interface PatternSignal {
  pattern: string;
  symbol: string;
  timeframe: string;
  direction: "LONG" | "SHORT";
  confidence: number;
  entry: number;
  stopLoss: number;
  takeProfit: number;
  timestamp: string;
}

interface WolfStats {
  totalSignals: number;
  winRate: number;
  avgReturn: number;
  activePatterns: number;
}
```

### 5.3 Конфигурация

```typescript
const wolfBotConfig = {
  exchange: "binance",
  symbol: "BTCUSDT",
  timeframe: "1h",
  minConfidence: 0.7,    // Минимальная уверенность для сигнала
  maxPatterns: 5,        // Макс. активных паттернов
  autoTrade: false,      // Авто-торговля
};
```

### 5.4 Поддерживаемые паттерны

#### Разворотные паттерны

| Паттерн | Тип | Описание |
|---------|-----|----------|
| Двойное дно | Bullish Reversal | Два минимума на одном уровне |
| Двойная вершина | Bearish Reversal | Два максимума на одном уровне |
| Голова и плечи | Bearish Reversal | Классический разворотный паттерн |
| Инверсия H&S | Bullish Reversal | Бычья голова и плечи |
| Клинья | Reversal | Восходящий/нисходящий клин |
| Тройное дно/вершина | Reversal | Три касания уровня |
| Бриллиант | Reversal | Редкий разворотный паттерн |

#### Паттерны продолжения

| Паттерн | Тип | Описание |
|---------|-----|----------|
| Флаги | Continuation | Короткая консолидация |
| Вымпелы | Continuation | Сходящийся треугольник |
| Треугольники | Continuation | Восходящий/нисходящий/симметричный |
| Чашка с ручкой | Continuation | Бычий паттерн продолжения |

#### Нейтральные паттерны

| Паттерн | Тип | Описание |
|---------|-----|----------|
| Прямоугольники | Neutral | Горизонтальный канал |

### 5.5 Мульти-таймфреймный анализ

```typescript
const timeframes = ["15m", "1h", "4h", "1d"];

// Анализ на всех таймфреймах
// Паттерны на старших таймфреймах имеют больший вес
const weightedConfidence = confidence * getTimeframeWeight(timeframe);

function getTimeframeWeight(tf: string): number {
  switch (tf) {
    case "1d": return 1.0;
    case "4h": return 0.85;
    case "1h": return 0.7;
    case "15m": return 0.5;
    default: return 0.5;
  }
}
```

### 5.6 Расчёт уровней

```
Для каждого паттерна автоматически рассчитываются:

Entry Point:
  - Точка входа на основе формы паттерна
  - Подтверждение пробоя/отката

Stop Loss:
  - Для LONG: ниже минимума паттерна
  - Для SHORT: выше максимума паттерна

Take Profit:
  - На основе высоты паттерна (measured move)
  - TP = Entry ± PatternHeight
```

### 5.7 UI Статистика

```typescript
// Отображаемые метрики
interface WolfStats {
  totalSignals: number;    // Всего сигналов
  winRate: number;         // Win Rate (0-1)
  avgReturn: number;       // Средний возврат %
  activePatterns: number;  // Активные паттерны
}
```

---

## 6. Примеры использования

### 6.1 Запуск Argus Bot

```typescript
// Создание Argus бота через API
const response = await fetch('/api/bots/argus', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'create',
    name: 'Argus-BTC-Quick',
    exchange: 'binance',
    leverage: 15,
    positionSize: 100,
    pumpThreshold5m: 0.03,    // 3% pump за 5 минут
    dumpThreshold5m: 0.03,    // 3% dump за 5 минут
    useMarketForecast: true,
    forecastWeight: 0.25,
  }),
});

const { bot } = await response.json();
console.log('Created bot:', bot.id);
```

### 6.2 Orion Bot с кастомной стратегией

```typescript
// Конфигурация Orion с агрессивными параметрами
const orionConfig = {
  strategy: {
    emaFast: 10,
    emaMedium: 30,
    emaSlow: 100,
    supertrendPeriod: 7,
    supertrendMultiplier: 2.5,
  },
  risk: {
    mode: 'fractional_kelly',
    maxRiskPct: 3,
    maxPositions: 7,
  },
  hedging: true,
};

// Запуск
await fetch('/api/trend-bot', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ action: 'start', config: orionConfig }),
});
```

### 6.3 Vision Bot с бэктестом

```typescript
// Запуск бэктеста
const backtestResponse = await fetch('/api/bots/vision?action=backtest', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    symbol: 'ETH/USDT',
    strategy: 'multi_tp',
    days: 180,
    filterEnabled: true,
  }),
});

const { result } = await backtestResponse.json();
console.log('Backtest Results:');
console.log(`  Return: ${result.totalReturnPct}%`);
console.log(`  Sharpe: ${result.sharpeRatio}`);
console.log(`  Max DD: ${result.maxDrawdownPct}%`);
console.log(`  Win Rate: ${result.winRatePct}%`);
```

### 6.4 Range Bot для консервативной торговли

```typescript
// Консервативная конфигурация Range Bot
const conservativeRangeConfig = {
  symbol: 'BTCUSDT',
  lookbackPeriod: 100,
  minTouches: 3,           // Больше касаний для надёжности
  touchThreshold: 0.2,     // Меньше отклонение
  maxRangeWidth: 3,        // Уже диапазон
  takeProfitPercent: 1.0,  // Консервативный TP
  stopLossPercent: 0.5,    // Тесный SL
  useRSI: true,
  useStochastic: true,     // Двойное подтверждение
  positionSize: 50,
  maxPositions: 2,
};

// Анализ
const response = await fetch('/api/bots/range', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'analyze',
    prices: priceHistory,
    config: conservativeRangeConfig,
  }),
});
```

### 6.5 WolfBot для скальпинга

```typescript
// Настройка WolfBot для скальпинга на 15m
const scalperConfig = {
  exchange: 'bybit',
  symbol: 'BTCUSDT',
  timeframe: '15m',
  minConfidence: 0.8,    // Высокая уверенность
  maxPatterns: 3,        // Ограничение паттернов
  autoTrade: false,      // Ручное подтверждение
};

// Мониторинг сигналов
const checkSignals = async () => {
  const response = await fetch('/api/bots/wolf/signals');
  const { signals } = await response.json();
  
  signals.forEach(signal => {
    if (signal.confidence >= 0.85 && signal.timeframe === '15m') {
      // Отправить уведомление
      notifyHighConfidenceSignal(signal);
    }
  });
};
```

### 6.6 Интеграция всех ботов

```typescript
// Панель мониторинга всех аналитических ботов
const AnalyticalBotsDashboard = () => {
  const [bots, setBots] = useState({
    argus: [],
    orion: null,
    vision: [],
    range: null,
    wolf: null,
  });

  useEffect(() => {
    // WebSocket подписка на все боты
    const ws = new WebSocket('wss://api.citarion.io/bots/stream');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.botType) {
        case 'ARGUS':
          setBots(prev => ({ ...prev, argus: data.bots }));
          break;
        case 'ORION':
          setBots(prev => ({ ...prev, orion: data.bot }));
          break;
        case 'VISION':
          setBots(prev => ({ ...prev, vision: data.bots }));
          break;
        case 'RANGE':
          setBots(prev => ({ ...prev, range: data.state }));
          break;
        case 'WOLF':
          setBots(prev => ({ ...prev, wolf: data.stats }));
          break;
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="grid grid-cols-5 gap-4">
      {/* Карточки для каждого бота */}
    </div>
  );
};
```

---

## 7. Общая инфраструктура

### 7.1 Signal Filter System

Все боты используют общую систему фильтрации сигналов:

```typescript
interface EnhancedFilterConfig {
  minConfidence: {
    BB: number;      // Для Bollinger Bands
    TREND: number;   // Для трендовых
    RANGE: number;   // Для range
  };
  maxRiskScore: number;
  regimeFilter: boolean;
  volumeFilter: boolean;
}

const DEFAULT_ENHANCED_FILTER_CONFIG: EnhancedFilterConfig = {
  minConfidence: {
    BB: 0.6,
    TREND: 0.5,
    RANGE: 0.55,
  },
  maxRiskScore: 0.7,
  regimeFilter: true,
  volumeFilter: true,
};
```

### 7.2 Exchange Adapters

```typescript
interface ExchangeAdapter {
  name: string;
  isPaperTrading: boolean;
  
  // Connection
  connect(): Promise<boolean>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  
  // Market Data
  getCandles(symbol: string, timeframe: string, limit: number): Promise<Candle[]>;
  getTicker(symbol: string): Promise<Ticker>;
  
  // Trading
  placeOrder(symbol: string, side: 'BUY' | 'SELL', type: 'MARKET' | 'LIMIT', 
             size: number, price?: number): Promise<ExchangeOrder>;
  getPositions(): Promise<ExchangePosition[]>;
  getBalances(): Promise<ExchangeBalance[]>;
}
```

### 7.3 Поддерживаемые биржи

| Биржа | Argus | Orion | Vision | Range | Wolf |
|-------|-------|-------|--------|-------|------|
| Binance | ✅ | ✅ | ✅ | ✅ | ✅ |
| Bybit | ✅ | ✅ | ✅ | ✅ | ✅ |
| OKX | ❌ | ✅ | ✅ | ✅ | ✅ |
| Bitget | ❌ | ✅ | ✅ | ✅ | ✅ |
| BingX | ✅ | ❌ | ❌ | ❌ | ✅ |
| HyperLiquid | ❌ | ✅ | ❌ | ❌ | ❌ |
| BloFin | ❌ | ✅ | ❌ | ❌ | ❌ |

---

## 8. Best Practices

### 8.1 Выбор бота под рыночные условия

| Рынок | Рекомендуемый бот | Дополнительно |
|-------|-------------------|---------------|
| Сильный тренд | Orion (TRND) | Hedging mode |
| Боковик | Range (RNG) | RSI confirmation |
| Высокая волатильность | Argus (PND) | Market Forecast |
| Неопределённость | Vision (FCST) | Ensemble filter |
| Паттерны | Wolf (WOLF) | Multi-timeframe |

### 8.2 Риск-менеджмент

1. **Никогда не используйте полный Kelly** — используйте Quarter Kelly (0.25)
2. **Ограничивайте корреляцию** — максимум 0.6 между позициями
3. **Дневной лимит убытка** — остановка при 3-5% дневного убытка
4. **Максимальная просадка** — halt при 10-15% просадке

### 8.3 Paper Trading

Всегда проводите валидацию на paper trading:
- Минимум 7 дней
- Минимум 20 сделок
- Win Rate >= 40%
- Max Drawdown <= 10%

---

## Связанная документация

- [ORION Bot](/docs/bots/ORION_BOT.md) — подробная документация Orion
- [RANGE Bot](/docs/bots/RANGE_BOT.md) — подробная документация Range
- [Trading System](/docs/components/TRADING_SYSTEM.md) — торговая система
- [Risk Management UI](/docs/components/RISK_MANAGEMENT_UI.md) — UI риск-менеджмента
- [ML Filtering System](/docs/components/ML_FILTERING_SYSTEM.md) — ML фильтрация

---

*Last updated: March 2026*
