# ML Filtering System

**Version:** 2.0  
**Last Updated:** March 2026  
**Components:** 6  
**Status:** Production Ready

---

## Contents

1. [Обзор ML Фильтрации](#1-обзор-ml-фильтрации)
2. [Компоненты](#2-компоненты)
3. [Алгоритмы Фильтрации](#3-алгоритмы-фильтрации)
4. [Оценка Качества Сигналов](#4-оценка-качества-сигналов)
5. [Ансамбли Моделей](#5-ансамбли-моделей)
6. [API Эндпоинты](#6-api-эндпоинты)
7. [Примеры Использования](#7-примеры-использования)

---

## 1. Обзор ML Фильтрации

### 1.1 Назначение

ML Filtering System — это комплексная система машинного обучения для фильтрации и оценки торговых сигналов. Система интегрирует несколько моделей ML для повышения качества сигналов и снижения количества ложных срабатываний.

### 1.2 Ключевые возможности

| Возможность | Описание |
|-------------|----------|
| **Lawrence Classifier** | ML классификатор для определения направления сигнала (LONG/SHORT/NEUTRAL) |
| **Gradient Boosting Scorer** | Оценка качества сигналов на основе ансамбля деревьев решений |
| **Ensemble Filtering** | Комбинирование нескольких стратегий фильтрации |
| **Auto-calibration** | Автоматическое обучение и калибровка моделей |
| **Real-time Filtering** | Фильтрация сигналов в реальном времени |

### 1.3 Архитектура системы

```
┌─────────────────────────────────────────────────────────────────┐
│                    SIGNAL INPUT                                  │
│         (from bots: HFT, MFT, LFT, TRND, FCST, DCA, BB)          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ML FILTERING PANEL                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Lawrence  │  │  Gradient   │  │   Ensemble Config       │  │
│  │  Classifier │  │  Boosting   │  │   (SuperTrend/NPC/      │  │
│  │             │  │   Scorer    │  │    Squeeze weights)     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SIGNAL FILTER PANEL                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │  Enhanced    │  │     BB       │  │     DCA/VISION       │   │
│  │  Filter      │  │   Filter     │  │       Filters        │   │
│  └──────────────┘  └──────────────┘  └──────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    OUTPUT: FILTERED SIGNAL                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  passed: boolean                                          │  │
│  │  adjustedDirection: LONG | SHORT | NEUTRAL               │  │
│  │  adjustedConfidence: 0-100%                               │  │
│  │  mlScore: 0-100%                                          │  │
│  │  qualityScore: 0-100%                                     │  │
│  │  recommendation: APPROVE | REJECT | ADJUST | MONITOR      │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 1.4 Интеграция с ботами

| Бот | Код | Статус интеграции | Тип фильтрации |
|-----|-----|-------------------|----------------|
| DCA Bot | SCALE | ✅ Integrated | Timing optimization, exit analysis |
| BB Bot | BAND | ✅ Integrated | Breakout classification (Genuine/False/Squeeze) |
| ORION Bot | TRND | ✅ Integrated | Trend quality confirmation |
| Zenbot Engine | — | ✅ Integrated | Signal quality scoring |
| GRID Bot | MESH | ❌ Not integrated | Direction-agnostic strategy |
| HFT Bot | HFT | ❌ Not integrated | Latency critical |
| REED Bot | STA | ❌ Not integrated | Statistical methods |

---

## 2. Компоненты

### 2.1 ML Filtering Panel

**Файл:** `src/components/ml/ml-filtering-panel.tsx`

Главный компонент для управления ML-фильтрацией сигналов.

#### Props

```typescript
// Нет внешних props — компонент автономен
// Использует внутренние API эндпоинты для получения данных
```

#### Интерфейсы данных

```typescript
interface MLFilterStats {
  totalSignals: number        // Всего обработанных сигналов
  passedSignals: number       // Прошло фильтр
  rejectedSignals: number     // Отклонено
  adjustedSignals: number     // Скорректировано
  avgOriginalConfidence: number   // Средняя исходная уверенность
  avgFilteredConfidence: number   // Средняя после фильтрации
  avgMLScore: number          // Средняя ML оценка
  avgQualityScore: number     // Средняя оценка качества
  longApprovals: number       // Одобрено LONG
  shortApprovals: number      // Одобрено SHORT
  neutralSignals: number      // Нейтральных
  rejectionReasons: Record<string, number>  // Причины отклонений
  lastReset: number           // Время последнего сброса
}

interface MLFilterConfig {
  enabled: boolean                    // Фильтр активен
  minConfidence: number               // Мин. уверенность (0-1)
  minMLAgreement: number              // Мин. согласие ML (0-1)
  useRegimeFilter: boolean            // Фильтр режима рынка
  useADXFilter: boolean               // ADX фильтр
  useVolatilityFilter: boolean        // Фильтр волатильности
  requireDirectionConfirmation: boolean  // Требовать подтверждение направления
  directionConfirmationThreshold: number // Порог подтверждения
  adjustConfidence: boolean           // Корректировать уверенность
  confidenceBlendWeight: number       // Вес ML уверенности (0-1)
  autoTrain: boolean                  // Автообучение
  trainingThreshold: number           // Порог качества для обучения
  highQualityThreshold: number        // Порог высокого качества
  lowQualityThreshold: number         // Порог низкого качества
}

interface ClassifierStats {
  totalSamples: number        // Образцов для обучения
  longCount: number           // LONG образцов
  shortCount: number          // SHORT образцов
  neutralCount: number        // NEUTRAL образцов
  avgConfidence: number       // Средняя уверенность
  winRate: number             // Win Rate модели
  lastUpdated: number         // Последнее обновление
}

interface FilterResult {
  passed: boolean             // Прошёл фильтр
  adjustedDirection: 'LONG' | 'SHORT' | 'NEUTRAL'
  adjustedConfidence: number  // Скорректированная уверенность
  mlScore: number             // ML оценка
  qualityScore: number        // Оценка качества
  riskScore: number           // Оценка риска
  recommendation: 'APPROVE' | 'REJECT' | 'ADJUST' | 'MONITOR'
  rejectionReasons: string[]  // Причины отклонения
}
```

#### Tabs

| Tab | Описание |
|-----|----------|
| **Обзор** | Статистика фильтрации, метрики качества |
| **Конфигурация** | Настройки фильтра и компонентов |
| **Тест Фильтра** | Интерактивное тестирование сигналов |
| **Обучение** | Статистика обучения классификатора |
| **Интеграции** | Статус интеграции с ботами |

#### Использование

```tsx
import { MLFilteringPanel } from '@/components/ml/ml-filtering-panel'

export function MLPage() {
  return (
    <div className="container mx-auto p-4">
      <MLFilteringPanel />
    </div>
  )
}
```

---

### 2.2 Signal Scorer Panel

**Файл:** `src/components/ml/signal-scorer-panel.tsx`

Компонент для оценки качества сигналов с использованием Gradient Boosting.

#### Props

```typescript
// Нет внешних props — компонент автономен
```

#### Интерфейсы данных

```typescript
interface SignalFeatures {
  return_1: number            // Доходность за 1 период
  return_5: number            // Доходность за 5 периодов
  return_10: number           // Доходность за 10 периодов
  volatility_10: number       // Волатильность 10 периодов
  volatility_20: number       // Волатильность 20 периодов
  rsi_14: number              // RSI (14)
  macd: number                // MACD
  macd_signal: number         // MACD Signal
  bollinger_position: number  // Позиция в полосах Боллинджера
  adx: number                 // ADX
  volume_ratio: number        // Соотношение объёма
  volume_trend: number        // Тренд объёма
  ema_cross: number           // EMA пересечение
  supertrend_direction: number // Направление SuperTrend
  trend_strength: number      // Сила тренда
  funding_rate: number        // Funding rate
  basis: number               // Basis (спред фьючерс/спот)
  open_interest_change: number // Изменение открытого интереса
}

interface SignalScore {
  score: number               // Оценка (-1 до 1, нормализуется в 0-100)
  confidence: number          // Уверенность модели
  direction: 'LONG' | 'SHORT' | 'NEUTRAL'
  quality: 'HIGH' | 'MEDIUM' | 'LOW'
  features: Partial<SignalFeatures>
}

interface ModelStats {
  treesCount: number          // Количество деревьев
  trained: boolean            // Модель обучена
  trainScore: number          // R² на обучающей выборке
  validationScore: number     // R² на валидации
  featureCount: number        // Количество признаков
  learningRate: number        // Learning rate
  maxDepth: number            // Максимальная глубина деревьев
}
```

#### Группы признаков

| Группа | Признаки | Описание |
|--------|----------|----------|
| **Price Features** | return_1, return_5, return_10, volatility_10, volatility_20 | Ценовые изменения и волатильность |
| **Technical Indicators** | rsi_14, macd, macd_signal, bollinger_position, adx | Технические индикаторы |
| **Volume Features** | volume_ratio, volume_trend | Объёмные показатели |
| **Trend Features** | ema_cross, supertrend_direction, trend_strength | Трендовые индикаторы |
| **Market Context** | funding_rate, basis, open_interest_change | Рыночный контекст |

#### Tabs

| Tab | Описание |
|-----|----------|
| **Оценка** | Интерактивная оценка сигнала с круговым gauge |
| **Признаки** | График важности признаков и ввод всех 18 признаков |
| **История** | История оценок с результатами |
| **Модель** | Статистики и конфигурация модели |

#### Использование

```tsx
import { SignalScorerPanel } from '@/components/ml/signal-scorer-panel'

export function ScoringPage() {
  return (
    <div className="container mx-auto p-4">
      <SignalScorerPanel />
    </div>
  )
}
```

---

### 2.3 Signal Filter Panel

**Файл:** `src/components/filters/signal-filter-panel.tsx`

Компонент для настройки фильтрации сигналов по типам.

#### Props

```typescript
interface SignalFilterPanelProps {
  filterType?: 'ENHANCED' | 'BB' | 'DCA' | 'VISION'  // Тип фильтра
  symbol?: string                                        // Символ для фильтрации
  onConfigChange?: (config: FilterConfig) => void       // Callback изменения конфигурации
}
```

#### Интерфейсы данных

```typescript
interface FilterConfig {
  enabled: boolean
  filterType: 'ENHANCED' | 'BB' | 'DCA' | 'VISION'
  weights: {
    superTrend: number        // Вес SuperTrend стратегии
    npc: number               // Вес NPC стратегии
    squeeze: number           // Вес Squeeze стратегии
  }
  thresholds: {
    signalThreshold: number   // Порог сигнала (0-1)
    minConfidence: number     // Минимальная уверенность (0-1)
  }
  optimizeWeights: boolean    // Автооптимизация весов
  regimeFilter: boolean       // Фильтр по режиму рынка
}

interface SignalPreview {
  direction: 'LONG' | 'SHORT' | 'NONE'
  confidence: number          // 0-100%
  strength: number            // Сила сигнала 0-100%
  timestamp: string
  disagreement: boolean       // Есть расхождение между стратегиями
  regime: 'LOW' | 'MEDIUM' | 'HIGH'  // Волатильность рынка
}
```

#### Типы фильтров

| Тип | Описание | Win Rate | Avg Confidence |
|-----|----------|----------|----------------|
| **ENHANCED** | Улучшенная фильтрация | 68.5% | 72.3% |
| **BB** | Bollinger Bands breakout | 72.1% | 75.8% |
| **DCA** | DCA timing optimization | 81.2% | 68.4% |
| **VISION** | Forecast-based signals | 65.4% | 79.2% |

#### Использование

```tsx
import { SignalFilterPanel } from '@/components/filters/signal-filter-panel'

export function FilterPage() {
  const handleConfigChange = (config: FilterConfig) => {
    console.log('Filter config updated:', config)
  }

  return (
    <SignalFilterPanel
      filterType="ENHANCED"
      symbol="BTCUSDT"
      onConfigChange={handleConfigChange}
    />
  )
}
```

---

### 2.4 Lawrence Calibration

**Файл:** `src/components/filters/lawrence-calibration.tsx`

Компонент для калибровки и обучения Lawrence Classifier.

#### Props

```typescript
interface LawrenceCalibrationProps {
  filterType: 'ENHANCED' | 'BB' | 'DCA' | 'VISION'  // Тип фильтра
  className?: string
}
```

#### Интерфейсы данных

```typescript
interface CalibrationState {
  isTraining: boolean         // Идёт обучение
  progress: number            // Прогресс обучения 0-100%
  samples: number             // Количество обучающих образцов
  accuracy: {
    precision: number         // Точность (0-1)
    recall: number            // Полнота (0-1)
    f1: number                // F1-мера (0-1)
  }
  lastTraining: string | null // Время последнего обучения
  status: 'idle' | 'training' | 'completed' | 'error'
}
```

#### Статистики по типам фильтров

| Filter Type | Samples | Precision | Recall | F1 |
|-------------|---------|-----------|--------|-----|
| ENHANCED | 15,420 | 72% | 68% | 70% |
| BB | 12,350 | 75% | 71% | 73% |
| DCA | 8,750 | 78% | 74% | 76% |
| VISION | 5,200 | 69% | 65% | 67% |

#### Использование

```tsx
import { LawrenceCalibration } from '@/components/filters/lawrence-calibration'

export function CalibrationSection() {
  return (
    <LawrenceCalibration filterType="ENHANCED" />
  )
}
```

---

### 2.5 Ensemble Config

**Файл:** `src/components/filters/ensemble-config.tsx`

Компонент для настройки весов ансамбля стратегий.

#### Props

```typescript
interface EnsembleConfigProps {
  weights: EnsembleWeights
  thresholds: EnsembleThresholds
  optimizeWeights: boolean
  regimeFilter: boolean
  onWeightsChange?: (weights: EnsembleWeights) => void
  onThresholdsChange?: (thresholds: EnsembleThresholds) => void
  onOptimizeWeightsChange?: (enabled: boolean) => void
  onRegimeFilterChange?: (enabled: boolean) => void
}

interface EnsembleWeights {
  superTrend: number          // Вес SuperTrend (0-1)
  npc: number                 // Вес NPC (0-1)
  squeeze: number             // Вес Squeeze (0-1)
}

interface EnsembleThresholds {
  signalThreshold: number     // Порог сигнала (0-1)
  minConfidence: number       // Мин. уверенность (0-1)
}
```

#### Цветовая кодировка стратегий

| Стратегия | Цвет | Описание |
|-----------|------|----------|
| **SuperTrend** | Синий | Трендовый индикатор |
| **NPC** | Фиолетовый | Neural Price Channel |
| **Squeeze** | Изумрудный | Squeeze Momentum |

#### Использование

```tsx
import { EnsembleConfig } from '@/components/filters/ensemble-config'

export function ConfigPanel() {
  const [weights, setWeights] = useState({
    superTrend: 0.35,
    npc: 0.35,
    squeeze: 0.3
  })

  return (
    <EnsembleConfig
      weights={weights}
      thresholds={{ signalThreshold: 0.6, minConfidence: 0.5 }}
      optimizeWeights={true}
      regimeFilter={true}
      onWeightsChange={setWeights}
    />
  )
}
```

---

### 2.6 Filter Stats Card

**Файл:** `src/components/filters/filter-stats-card.tsx`

Компонент для отображения статистики фильтрации.

#### Props

```typescript
interface FilterStatsCardProps {
  stats: FilterStats
  compact?: boolean           // Компактный режим
  className?: string
}

interface FilterStats {
  totalSignals: number
  winRate: number             // Win Rate в %
  avgConfidence: number       // Средняя уверенность
  recentSignals: SignalRecord[]
  performanceTrend: number[]  // Тренд производительности
}

interface SignalRecord {
  id: string
  symbol: string
  direction: 'LONG' | 'SHORT'
  confidence: number
  timestamp: string
  result?: 'WIN' | 'LOSS'
}
```

#### Визуальные индикаторы

| Win Rate | Цвет |
|----------|------|
| >= 70% | Зелёный |
| 50-70% | Жёлтый |
| < 50% | Красный |

#### Использование

```tsx
import { FilterStatsCard } from '@/components/filters/filter-stats-card'

export function StatsDisplay() {
  const stats = {
    totalSignals: 1247,
    winRate: 68.5,
    avgConfidence: 72.3,
    recentSignals: [...],
    performanceTrend: [65, 67, 64, 70, 68, 72, 69, 71, 68, 69]
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <FilterStatsCard stats={stats} compact />
      <FilterStatsCard stats={stats} />
    </div>
  )
}
```

---

### 2.7 Signal Indicator

**Файл:** `src/components/filters/signal-indicator.tsx`

Компонент для визуализации состояния сигнала.

#### Props

```typescript
interface SignalIndicatorProps {
  signal: SignalState
  showDetails?: boolean       // Показать детали
  className?: string
}

interface SignalState {
  direction: 'LONG' | 'SHORT' | 'NONE'
  confidence: number          // 0-100%
  strength: number            // 0-100%
  disagreement: boolean       // Расхождение стратегий
  regime: 'LOW' | 'MEDIUM' | 'HIGH'  // Волатильность
}
```

#### Цветовая кодировка

| Direction | Цвет | Иконка |
|-----------|------|--------|
| LONG | Зелёный | TrendingUp |
| SHORT | Красный | TrendingDown |
| NONE | Серый | MinusCircle |

| Regime | Цвет | Label |
|--------|------|-------|
| HIGH | Красный | HIGH VOL |
| MEDIUM | Жёлтый | MEDIUM VOL |
| LOW | Зелёный | LOW VOL |

#### Использование

```tsx
import { SignalIndicator } from '@/components/filters/signal-indicator'

export function SignalDisplay() {
  const signal = {
    direction: 'LONG' as const,
    confidence: 78,
    strength: 85,
    disagreement: false,
    regime: 'MEDIUM' as const
  }

  return (
    <SignalIndicator signal={signal} showDetails />
  )
}
```

---

## 3. Алгоритмы Фильтрации

### 3.1 Lawrence Classifier

**Тип:** Многоклассовый классификатор (LONG/SHORT/NEUTRAL)

**Принцип работы:**
1. Получение признаков сигнала (18 признаков)
2. Применение обученной модели
3. Предсказание направления с уверенность
4. Калибровка на исторических данных

**Метрики качества:**
- Precision: 69-78%
- Recall: 65-74%
- F1 Score: 67-76%

### 3.2 Gradient Boosting Scorer

**Тип:** Regression ensemble (деревья решений)

**Гиперпараметры:**
```typescript
{
  nEstimators: 100,      // Количество деревьев
  learningRate: 0.1,     // Learning rate
  maxDepth: 5,           // Глубина деревьев
  minSamplesSplit: 10,   // Мин. образцов для split
  minSamplesLeaf: 5,     // Мин. образцов в листе
  subsample: 0.8         // Subsample ratio
}
```

**Выход:** Score от -1 до 1, нормализуется в 0-100%

### 3.3 Ensemble Filtering

**Стратегии:**

| Стратегия | Вес по умолчанию | Описание |
|-----------|------------------|----------|
| SuperTrend | 35% | Определение тренда |
| NPC | 35% | Neural Price Channel |
| Squeeze | 30% | Squeeze Momentum |

**Формула:**
```
ensembleScore = Σ(weight_i * strategyScore_i)
```

### 3.4 Regime Filter

**Типы режимов волатильности:**

| Regime | Описание | Действие |
|--------|----------|----------|
| LOW | Низкая волатильность | Все сигналы проходят |
| MEDIUM | Средняя волатильность | Стандартная фильтрация |
| HIGH | Высокая волатильность | Повышенные требования к уверенности |

---

## 4. Оценка Качества Сигналов

### 4.1 Критерии оценки

| Критерий | Вес | Описание |
|----------|-----|----------|
| Direction Confidence | 30% | Уверенность в направлении |
| ML Score | 25% | Оценка Lawrence Classifier |
| Quality Score | 25% | Gradient Boosting оценка |
| Risk Score | 20% | Оценка рисков |

### 4.2 Классификация качества

| Quality | Score Range | Confidence | Действие |
|---------|-------------|------------|----------|
| **HIGH** | >= 70% | >= 70% | APPROVE |
| **MEDIUM** | 40-70% | 40-70% | MONITOR/ADJUST |
| **LOW** | < 40% | < 40% | REJECT |

### 4.3 Рекомендации

| Рекомендация | Описание |
|--------------|----------|
| **APPROVE** | Сигнал одобрен для исполнения |
| **REJECT** | Сигнал отклонён |
| **ADJUST** | Требуется корректировка направления или размера |
| **MONITOR** | Требуется наблюдение |

---

## 5. Ансамбли Моделей

### 5.1 Структура ансамбля

```
                    ┌─────────────────┐
                    │   INPUT SIGNAL  │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│  SuperTrend   │  │     NPC       │  │   Squeeze     │
│   Strategy    │  │   Strategy    │  │   Strategy    │
│   (35%)       │  │   (35%)       │  │   (30%)       │
└───────┬───────┘  └───────┬───────┘  └───────┬───────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                           ▼
                    ┌───────────────┐
                    │  WEIGHTED     │
                    │  AGGREGATION  │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ ENSEMBLE SCORE│
                    └───────────────┘
```

### 5.2 Автооптимизация весов

При включенной автооптимизации веса корректируются на основе:
- Win Rate каждой стратегии за последние N периодов
- Средняя уверенность сигналов
- Корреляция между стратегиями

### 5.3 Пороговые значения

| Параметр | По умолчанию | Диапазон | Описание |
|----------|--------------|----------|----------|
| signalThreshold | 0.6 | 0-1 | Минимальный ensemble score |
| minConfidence | 0.5 | 0-1 | Минимальная уверенность |

---

## 6. API Эндпоинты

### 6.1 ML Filter API

#### GET /api/ml/filter

Получение текущей конфигурации фильтра.

**Response:**
```json
{
  "success": true,
  "config": {
    "enabled": true,
    "minConfidence": 0.3,
    "minMLAgreement": 0.4,
    "useRegimeFilter": true,
    "useADXFilter": true,
    "useVolatilityFilter": true
  }
}
```

#### PUT /api/ml/filter

Обновление конфигурации фильтра.

**Request:**
```json
{
  "config": {
    "enabled": true,
    "minConfidence": 0.5,
    "minMLAgreement": 0.6
  }
}
```

**Response:**
```json
{
  "success": true,
  "config": { /* updated config */ }
}
```

#### POST /api/ml/filter

Тестирование фильтра на сигнале.

**Request:**
```json
{
  "signal": {
    "botCode": "HFT",
    "symbol": "BTCUSDT",
    "exchange": "binance",
    "direction": "LONG",
    "confidence": 0.7
  }
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "passed": true,
    "adjustedDirection": "LONG",
    "adjustedConfidence": 0.72,
    "mlScore": 0.68,
    "qualityScore": 0.75,
    "riskScore": 0.35,
    "recommendation": "APPROVE",
    "rejectionReasons": []
  }
}
```

### 6.2 ML Stats API

#### GET /api/ml/stats

Получение статистики ML фильтрации.

**Query Parameters:**
- `detailed=true` — расширенная статистика

**Response:**
```json
{
  "success": true,
  "filter": {
    "totalSignals": 1247,
    "passedSignals": 892,
    "rejectedSignals": 355,
    "avgMLScore": 0.65
  },
  "classifier": {
    "totalSamples": 15420,
    "longCount": 5200,
    "shortCount": 4800,
    "winRate": 0.68
  }
}
```

#### DELETE /api/ml/stats

Сброс статистики.

### 6.3 Gradient Boosting API

#### GET /api/ml/gradient-boosting/stats

Получение статистики модели.

**Response:**
```json
{
  "success": true,
  "stats": {
    "treesCount": 100,
    "trained": true,
    "trainScore": 0.85,
    "validationScore": 0.78,
    "featureCount": 18
  },
  "featureImportance": [
    { "name": "rsi_14", "importance": 0.15 },
    { "name": "adx", "importance": 0.12 },
    { "name": "trend_strength", "importance": 0.10 }
  ]
}
```

#### POST /api/ml/gradient-boosting/score

Оценка сигнала.

**Request:**
```json
{
  "features": {
    "rsi_14": 65,
    "adx": 32,
    "volume_ratio": 1.5
  },
  "source": "HFT",
  "symbol": "BTCUSDT"
}
```

**Response:**
```json
{
  "success": true,
  "score": {
    "score": 0.65,
    "confidence": 0.72,
    "direction": "LONG",
    "quality": "MEDIUM"
  }
}
```

#### GET /api/ml/gradient-boosting/history

Получение истории оценок.

---

## 7. Примеры Использования

### 7.1 Базовое использование

```tsx
'use client'

import { MLFilteringPanel } from '@/components/ml/ml-filtering-panel'

export default function MLFilterPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">ML Signal Filtering</h1>
      <MLFilteringPanel />
    </div>
  )
}
```

### 7.2 Интеграция с Signal Filter Panel

```tsx
'use client'

import { SignalFilterPanel, FilterConfig } from '@/components/filters/signal-filter-panel'
import { useState } from 'react'

export default function FilterConfigPage() {
  const [config, setConfig] = useState<FilterConfig | null>(null)

  const handleConfigChange = (newConfig: FilterConfig) => {
    setConfig(newConfig)
    // Отправить на backend
    fetch('/api/filters/config', {
      method: 'PUT',
      body: JSON.stringify(newConfig)
    })
  }

  return (
    <div className="space-y-4">
      <SignalFilterPanel
        filterType="ENHANCED"
        onConfigChange={handleConfigChange}
      />
      
      {config && (
        <div className="text-sm text-muted-foreground">
          Current weights: SuperTrend {config.weights.superTrend * 100}%,
          NPC {config.weights.npc * 100}%,
          Squeeze {config.weights.squeeze * 100}%
        </div>
      )}
    </div>
  )
}
```

### 7.3 Тестирование сигнала

```tsx
async function testSignal() {
  const response = await fetch('/api/ml/filter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      signal: {
        botCode: 'HFT',
        symbol: 'BTCUSDT',
        exchange: 'binance',
        direction: 'LONG',
        confidence: 0.75
      }
    })
  })
  
  const data = await response.json()
  
  if (data.success) {
    const { passed, recommendation, adjustedConfidence } = data.result
    
    if (passed && recommendation === 'APPROVE') {
      console.log(`Signal approved with confidence ${(adjustedConfidence * 100).toFixed(1)}%`)
    } else {
      console.log(`Signal rejected: ${data.result.rejectionReasons.join(', ')}`)
    }
  }
}
```

### 7.4 Получение статистики фильтра

```tsx
import { FilterStatsCard } from '@/components/filters/filter-stats-card'
import { useEffect, useState } from 'react'

function FilterStatsDisplay() {
  const [stats, setStats] = useState(null)
  
  useEffect(() => {
    fetch('/api/ml/stats?detailed=true')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.filter)
        }
      })
  }, [])
  
  if (!stats) return <div>Loading...</div>
  
  return (
    <FilterStatsCard
      stats={{
        totalSignals: stats.totalSignals,
        winRate: stats.winRate * 100,
        avgConfidence: stats.avgConfidence * 100,
        recentSignals: stats.recentSignals,
        performanceTrend: stats.performanceTrend
      }}
    />
  )
}
```

### 7.5 Обучение классификатора

```tsx
import { LawrenceCalibration } from '@/components/filters/lawrence-calibration'

function TrainingPanel() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <LawrenceCalibration filterType="ENHANCED" />
      <LawrenceCalibration filterType="BB" />
    </div>
  )
}
```

### 7.6 Оценка сигнала через Gradient Boosting

```tsx
import { SignalScorerPanel } from '@/components/ml/signal-scorer-panel'

function ScoringPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Signal Quality Assessment</h2>
      <SignalScorerPanel />
    </div>
  )
}
```

---

## Приложение A: Структура файлов

```
src/components/
├── ml/
│   ├── ml-filtering-panel.tsx      # Главный ML фильтр
│   └── signal-scorer-panel.tsx     # Оценка сигналов
│
└── filters/
    ├── signal-filter-panel.tsx     # Панель фильтров
    ├── lawrence-calibration.tsx    # Калибровка Lawrence
    ├── ensemble-config.tsx         # Конфигурация ансамбля
    ├── filter-stats-card.tsx       # Карточка статистики
    └── signal-indicator.tsx        # Индикатор сигнала
```

---

## Приложение B: Константы

### B.1 Типы фильтров

```typescript
type FilterType = 'ENHANCED' | 'BB' | 'DCA' | 'VISION'
```

### B.2 Направления

```typescript
type Direction = 'LONG' | 'SHORT' | 'NEUTRAL' | 'NONE'
```

### B.3 Качество сигнала

```typescript
type SignalQuality = 'HIGH' | 'MEDIUM' | 'LOW'
```

### B.4 Рекомендации

```typescript
type Recommendation = 'APPROVE' | 'REJECT' | 'ADJUST' | 'MONITOR'
```

### B.5 Режимы волатильности

```typescript
type VolatilityRegime = 'LOW' | 'MEDIUM' | 'HIGH'
```

---

*Документация создана: Март 2026*  
*Компоненты: 6 файлов*  
*API эндпоинтов: 6*
