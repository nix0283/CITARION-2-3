# Analytics Dashboard

## Обзор

Analytics Dashboard — комплексная система аналитики торговых результатов, предоставляющая инструменты для оценки эффективности торговли, машинного обучения и глубокого анализа данных.

### Архитектура

```
┌─────────────────────────────────────────────────────────────┐
│                   ANALYTICS DASHBOARD                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │  PnL Analytics  │  │  PnL Dashboard  │                  │
│  │   ( pnl-        │  │   ( pnl-        │                  │
│  │  analytics.tsx) │  │  dashboard.tsx) │                  │
│  └────────┬────────┘  └────────┬────────┘                  │
│           │                    │                            │
│           ▼                    ▼                            │
│  ┌─────────────────────────────────────────┐               │
│  │            API Endpoints                 │               │
│  │  /api/pnl-stats?demo=&period=&equityCurve│               │
│  └─────────────────────────────────────────┘               │
│                                                              │
│  ┌────────────────────┐  ┌────────────────────┐            │
│  │ ML Classification  │  │  Deep Learning     │            │
│  │      Panel         │  │      Panel         │            │
│  │ (ml-classification │  │(deep-learning-     │            │
│  │     -panel.tsx)    │  │    panel.tsx)      │            │
│  └────────┬───────────┘  └────────┬───────────┘            │
│           │                       │                         │
│           ▼                       ▼                         │
│  ┌─────────────────────────────────────────┐               │
│  │         ML / DL Services                 │               │
│  │  - Lorentzian k-NN Classifier            │               │
│  │  - LSTM Neural Network                   │               │
│  └─────────────────────────────────────────┘               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Основные возможности

| Возможность | Описание |
|-------------|----------|
| PnL Analytics | Детальный анализ прибыли и убытков |
| Equity Curve | Визуализация кривой капитала |
| Win Rate | Расчет процента прибыльных сделок |
| Profit Factor | Оценка соотношения прибыли к убыткам |
| ML Classification | k-NN классификатор с Lorentzian дистанцией |
| Deep Learning | LSTM нейросеть для предсказаний |
| Мультивалютный анализ | Распределение по торговым парам |

---

## Компоненты

### 1. PnL Analytics

**Файл:** `src/components/analytics/pnl-analytics.tsx`

Главный компонент аналитики P&L с графиками и статистикой.

#### Props Interface

```typescript
interface PnLStats {
  totalPnL: number;           // Общий P&L в $
  totalPnLPercent: number;    // P&L в процентах
  realizedPnL: number;        // Реализованный P&L
  unrealizedPnL: number;      // Нереализованный P&L
  fundingPnL: number;         // P&L от фандинга
  feesPaid: number;           // Уплаченные комиссии
  winRate: number;            // Процент прибыльных сделок
  totalTrades: number;        // Количество сделок
  winningTrades: number;      // Прибыльные сделки
  losingTrades: number;       // Убыточные сделки
  avgWin: number;             // Средняя прибыль
  avgLoss: number;            // Средний убыток
  profitFactor: number;       // Профит-фактор
  bestTrade: number;          // Лучшая сделка
  worstTrade: number;         // Худшая сделка
  sharpeRatio: number;        // Коэффициент Шарпа
  maxDrawdown: number;        // Максимальная просадка
}

interface EquityPoint {
  timestamp: string;          // Временная метка
  balance: number;            // Баланс
  equity: number;             // Эквити
  realizedPnL: number;        // Реализованный P&L
  unrealizedPnL: number;      // Нереализованный P&L
  fundingPnL: number;         // Фандинг P&L
}
```

#### Основные функции

| Функция | Описание |
|---------|----------|
| `fetchPnLData()` | Загрузка данных с API |
| `getDaysFromRange()` | Конвертация периода в дни |
| `formatCurrency()` | Форматирование валюты |
| `formatPercent()` | Форматирование процентов |

#### Периоды анализа

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
];
```

#### Вкладки графиков

1. **Кривая капитала (Equity Curve)** — AreaChart с градиентной заливкой
2. **Дневной P&L** — BarChart с цветовой индикацией прибыли/убытка
3. **По периодам** — ComposedChart (Bar + Line)
4. **Распределение** — PieChart (Win/Loss, по символам)

---

### 2. PnL Dashboard

**Файл:** `src/components/analytics/pnl-dashboard.tsx`

Компактная панель статистики доходности.

#### Props Interface

```typescript
interface PnLStats {
  period: string;             // Период анализа
  realizedPnL: number;        // Реализованный P&L
  unrealizedPnL: number;      // Нереализованный P&L
  fundingPnL: number;         // Фандинг P&L
  feesPaid: number;           // Комиссии
  netPnL: number;             // Чистый P&L
  tradesCount: number;        // Количество сделок
  winsCount: number;          // Победы
  lossesCount: number;        // Поражения
  winRate: number;            // Win Rate
  profitFactor: number;       // Профит-фактор
  avgTrade: number;           // Средняя сделка
  bestTrade: number;          // Лучшая сделка
  worstTrade: number;         // Худшая сделка
}

interface EquityPoint {
  timestamp: string;
  balance: number;
  equity: number;
  realizedPnL: number;
  unrealizedPnL: number;
  fundingPnL: number;
}
```

#### Особенности

- **SVG Equity Curve** — нативная визуализация без зависимостей
- **Switch Demo/Real** — переключение типа аккаунта
- **Период селектор** — выбор периода анализа
- **Детализация P&L** — breakdown по категориям

#### Константы периодов

```typescript
const PERIOD_LABELS: Record<string, string> = {
  "1d": "1 день",
  "3d": "3 дня",
  "1w": "1 неделя",
  "2w": "2 недели",
  "1m": "1 месяц",
  "3m": "3 месяца",
  "6m": "6 месяцев",
  "1y": "1 год",
  "3y": "3 года",
};
```

---

### 3. ML Classification Panel

**Файл:** `src/components/analytics/ml-classification-panel.tsx`

Панель ML классификации с k-NN алгоритмом и Lorentzian дистанцией.

#### Props Interface

```typescript
interface ClassifierState {
  direction: 'LONG' | 'SHORT' | 'NEUTRAL';
  probability: number;           // Вероятность направления
  confidence: number;            // Уверенность модели
  calibratedProbability: number; // Калиброванная вероятность
  features: Record<string, number>;
  kernelEstimate?: {
    value: number;
    confidence: number;
    sampleCount: number;
  };
  sessionValid: boolean;
  activeSession?: string;
  featureImportance: Record<string, number>;
}

interface ClassifierConfig {
  neighborCount: number;         // Количество соседей (k)
  lookbackWindow: number;        // Окно истории
  minConfidence: number;         // Мин. уверенность
  minProbability: number;        // Мин. вероятность
  usePlattScaling: boolean;      // Platt калибровка
  useKernelSmoothing: boolean;   // Сглаживание ядром
  useSessionFilter: boolean;     // Фильтр по сессиям
  kernelType: 'gaussian' | 'epanechnikov' | 'uniform' | 'triangular';
  sessions: string[];
}

interface ClassifierStats {
  totalSamples: number;
  longCount: number;
  shortCount: number;
  neutralCount: number;
  avgConfidence: number;
  winRate: number;
  lastUpdated: string;
}
```

#### Основные функции

| Функция | Описание |
|---------|----------|
| `runClassification()` | Запуск классификации |
| `trainClassifier()` | Обучение классификатора |
| `getDirectionColor()` | Цвет для направления |

#### Конфигурация по умолчанию

```typescript
const config: ClassifierConfig = {
  neighborCount: 8,
  lookbackWindow: 2000,
  minConfidence: 0.6,
  minProbability: 0.55,
  usePlattScaling: true,
  useKernelSmoothing: true,
  useSessionFilter: true,
  kernelType: 'gaussian',
  sessions: ['LONDON', 'NEW_YORK'],
};
```

#### Типы ядер

| Тип | Формула | Применение |
|-----|---------|------------|
| Gaussian | K(u) = (2π)^(-1/2) exp(-u²/2) | Общее применение |
| Epanechnikov | K(u) = 3/4(1-u²) при |u| ≤ 1 | Оптимальная эффективность |
| Uniform | K(u) = 1/2 при |u| ≤ 1 | Простая оценка |
| Triangular | K(u) = (1-|u|) при |u| ≤ 1 | Линейное затухание |

#### Торговые сессии

```typescript
const sessions = [
  { name: 'Asian', hours: '00:00-08:00 UTC' },
  { name: 'London', hours: '08:00-16:00 UTC' },
  { name: 'New York', hours: '13:00-21:00 UTC' },
  { name: 'London-NY', hours: '13:00-16:00 UTC' },  // Overlap
  { name: 'Asian-London', hours: '07:00-09:00 UTC' }, // Overlap
];
```

---

### 4. Deep Learning Panel

**Файл:** `src/components/analytics/deep-learning-panel.tsx`

Панель глубокого обучения с LSTM нейросетью.

#### Props Interface

```typescript
interface Prediction {
  symbol: string;
  direction: 'UP' | 'DOWN' | 'NEUTRAL';
  confidence: number;
  predictedChange: number;       // Предсказанное изменение %
  currentPrice: number;
  predictedPrice: number;
  timestamp: Date;
}

interface ModelMetrics {
  accuracy: number;              // Точность
  precision: number;             // Точность (precision)
  recall: number;                // Полнота
  f1Score: number;               // F1-мера
  totalPredictions: number;      // Всего предсказаний
  accuratePredictions: number;   // Точных предсказаний
  lastRetrain: Date;             // Последнее обучение
}

interface TrainingProgress {
  epoch: number;
  totalEpochs: number;
  loss: number;
  accuracy: number;
  isTraining: boolean;
}
```

#### Архитектура LSTM модели

```
Input: [sequenceLength × inputFeatures]
   ↓
LSTM Layer 1 (64 units, dropout 0.2)
   ↓
LSTM Layer 2 (32 units, dropout 0.2)
   ↓
Dense Layer 1 (32 units, ReLU)
   ↓
Dense Layer 2 (16 units, ReLU)
   ↓
Output (1 unit, sigmoid)
```

#### Входные признаки (6 per timestep)

1. **Normalized price change** — нормализованное изменение цены
2. **Volume ratio** — отношение объема к среднему
3. **RSI** — нормализованный RSI (0-1)
4. **MACD histogram** — гистограмма MACD
5. **Bollinger position** — позиция в полосах Боллинджера
6. **ATR normalized** — нормализованный ATR

#### Основные функции

| Функция | Описание |
|---------|----------|
| `startTraining(symbol)` | Обучение модели |
| `runPrediction(symbol)` | Генерация предсказания |

#### Поддерживаемые символы

```typescript
const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'XRPUSDT'];
```

---

## Метрики

### Sharpe Ratio

**Формула:**
```
Sharpe Ratio = (Rp - Rf) / σp

где:
Rp - ожидаемая доходность портфеля
Rf - безрисковая ставка (обычно 2%)
σp - стандартное отклонение доходности
```

**Интерпретация:**

| Значение | Оценка |
|----------|--------|
| < 1.0 | Плохо |
| 1.0 - 2.0 | Хорошо |
| 2.0 - 3.0 | Отлично |
| > 3.0 | Превосходно |

**Пример расчета:**
```typescript
function calculateSharpeRatio(returns: number[], riskFreeRate = 0.02): number {
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
  const stdDev = Math.sqrt(variance);
  
  return (avgReturn - riskFreeRate / 252) / stdDev;
}
```

---

### Sortino Ratio

**Формула:**
```
Sortino Ratio = (Rp - Rf) / σd

где:
Rp - ожидаемая доходность
Rf - безрисковая ставка
σd - стандартное отклонение отрицательной доходности
```

**Отличие от Sharpe Ratio:**
- Учитывает только негативную волатильность
- Более точно отражает риск для трейдера
- Игнорирует "хорошую" волатильность

**Пример расчета:**
```typescript
function calculateSortinoRatio(returns: number[], riskFreeRate = 0.02): number {
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const negativeReturns = returns.filter(r => r < 0);
  
  const downsideVariance = negativeReturns.reduce((sum, r) => 
    sum + Math.pow(r - avgReturn, 2), 0) / negativeReturns.length;
  const downsideStdDev = Math.sqrt(downsideVariance);
  
  return (avgReturn - riskFreeRate / 252) / downsideStdDev;
}
```

---

### Max Drawdown

**Формула:**
```
Max Drawdown = (Peak - Trough) / Peak × 100%

где:
Peak - максимальное значение equity
Trough - минимальное значение после пика
```

**Пример расчета:**
```typescript
function calculateMaxDrawdown(equityCurve: number[]): number {
  let maxDrawdown = 0;
  let peak = equityCurve[0];
  
  for (const equity of equityCurve) {
    if (equity > peak) {
      peak = equity;
    }
    const drawdown = (peak - equity) / peak;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }
  
  return maxDrawdown * 100;
}
```

**Интерпретация:**

| Max DD | Риск |
|--------|------|
| < 10% | Низкий |
| 10-20% | Умеренный |
| 20-35% | Высокий |
| > 35% | Критический |

---

### Win Rate

**Формула:**
```
Win Rate = (Winning Trades / Total Trades) × 100%
```

**Пример расчета:**
```typescript
function calculateWinRate(trades: Trade[]): number {
  const closedTrades = trades.filter(t => t.status === 'CLOSED');
  const winningTrades = closedTrades.filter(t => t.pnl > 0);
  
  return (winningTrades.length / closedTrades.length) * 100;
}
```

**Взаимосвязь с Profit Factor:**

| Win Rate | Avg Win/Loss | Min Profit Factor |
|----------|--------------|-------------------|
| 30% | 3:1 | 1.29 |
| 40% | 2:1 | 1.33 |
| 50% | 1.5:1 | 1.50 |
| 60% | 1:1 | 1.50 |
| 70% | 0.8:1 | 1.87 |

---

### Profit Factor

**Формула:**
```
Profit Factor = Gross Profit / Gross Loss

где:
Gross Profit = Σ (прибыль прибыльных сделок)
Gross Loss = |Σ (убыток убыточных сделок)|
```

**Пример расчета:**
```typescript
function calculateProfitFactor(trades: Trade[]): number {
  const closedTrades = trades.filter(t => t.status === 'CLOSED');
  
  const grossProfit = closedTrades
    .filter(t => t.pnl > 0)
    .reduce((sum, t) => sum + t.pnl, 0);
  
  const grossLoss = Math.abs(
    closedTrades
      .filter(t => t.pnl < 0)
      .reduce((sum, t) => sum + t.pnl, 0)
  );
  
  return grossLoss > 0 ? grossProfit / grossLoss : Infinity;
}
```

**Интерпретация:**

| Profit Factor | Оценка |
|---------------|--------|
| < 1.0 | Убыточная стратегия |
| 1.0 - 1.5 | Маржинальная |
| 1.5 - 2.0 | Хорошая |
| 2.0 - 3.0 | Отличная |
| > 3.0 | Превосходная |

---

## Графики

### Equity Curve

**Описание:** Визуализация изменения капитала во времени.

**Компонент:** AreaChart (Recharts)

```typescript
// Данные для графика
const pnlChartData = equityCurve.map((point) => ({
  date: new Date(point.timestamp).toLocaleDateString("ru-RU", {
    month: "short",
    day: "numeric",
  }),
  balance: point.balance,
  equity: point.equity,
  realizedPnL: point.realizedPnL,
  fundingPnL: point.fundingPnL,
}));
```

**Пример рендеринга:**
```tsx
<ResponsiveContainer width="100%" height={350}>
  <AreaChart data={pnlChartData}>
    <defs>
      <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Area
      type="monotone"
      dataKey="equity"
      stroke="hsl(var(--primary))"
      fill="url(#colorEquity)"
      strokeWidth={2}
    />
  </AreaChart>
</ResponsiveContainer>
```

---

### Drawdown Chart

**Описание:** Визуализация просадок капитала.

**Расчет drawdown:**
```typescript
function calculateDrawdownSeries(equityCurve: number[]): { date: string; drawdown: number }[] {
  let peak = 0;
  return equityCurve.map((equity, i) => {
    if (equity > peak) peak = equity;
    const drawdown = ((peak - equity) / peak) * 100;
    return { date: `Day ${i + 1}`, drawdown: -drawdown };
  });
}
```

**Визуализация:** BarChart с отрицательными значениями

---

### Returns Distribution

**Описание:** Распределение доходности сделок.

**Компоненты:**
1. PieChart (Win/Loss)
2. PieChart (по символам)

```typescript
// Win/Loss данные
const winLossData = [
  { name: "Прибыльные", value: stats.winningTrades, color: "#22c55e" },
  { name: "Убыточные", value: stats.losingTrades, color: "#ef4444" },
];

// Распределение по символам
const symbolDistribution = filteredTrades
  .reduce((map, trade) => {
    map.set(trade.symbol, (map.get(trade.symbol) || 0) + 1);
    return map;
  }, new Map<string, number>());
```

---

## API Endpoints

### GET /api/pnl-stats

**Описание:** Получение статистики P&L.

**Query Parameters:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| demo | boolean | Да | Тип аккаунта |
| period | string | Да | Период (1d, 3d, 1w, 2w, 1m, 3m, 6m, 1y, 3y) |
| equityCurve | boolean | Нет | Включить кривую капитала |

**Пример запроса:**
```typescript
const response = await fetch('/api/pnl-stats?demo=true&period=1m&equityCurve=true');
const data = await response.json();
```

**Response:**
```typescript
interface PnLApiResponse {
  success: boolean;
  stats: PnLStats;
  equityCurve: EquityPoint[];
  allPeriodsStats: Record<string, PnLStats>;
  isDemo: boolean;
}
```

---

### POST /api/ml/classify

**Описание:** Запуск ML классификации.

**Request Body:**
```typescript
{
  symbol: string;
  timeframe: string;
  config: ClassifierConfig;
}
```

**Response:**
```typescript
{
  success: boolean;
  result: ClassifierState;
  signal: SignalState;
}
```

---

### POST /api/ml/train

**Описание:** Обучение классификатора.

**Request Body:**
```typescript
{
  symbol: string;
  timeframe: string;
  lookbackWindow: number;
}
```

---

### POST /api/dl/predict

**Описание:** Предсказание LSTM модели.

**Request Body:**
```typescript
{
  symbol: string;
  candles: Candle[];
}
```

**Response:**
```typescript
{
  success: boolean;
  prediction: Prediction;
  metrics: ModelMetrics;
}
```

---

### POST /api/dl/train

**Описание:** Обучение LSTM модели.

**Request Body:**
```typescript
{
  symbol: string;
  epochs: number;
  sequenceLength: number;
}
```

---

## Примеры использования

### Пример 1: Базовая интеграция PnL Analytics

```tsx
import { PnLAnalytics } from '@/components/analytics/pnl-analytics';

export function AnalyticsPage() {
  return (
    <div className="container mx-auto py-6">
      <PnLAnalytics />
    </div>
  );
}
```

---

### Пример 2: PnL Dashboard с кастомным периодом

```tsx
import { PnLDashboard } from '@/components/analytics/pnl-dashboard';
import { useState } from 'react';

export function PortfolioStats() {
  const [period, setPeriod] = useState('1m');

  return (
    <div className="space-y-4">
      <PeriodSelector value={period} onChange={setPeriod} />
      <PnLDashboard />
    </div>
  );
}
```

---

### Пример 3: ML Classification с конфигурацией

```tsx
import { MLClassificationPanel } from '@/components/analytics/ml-classification-panel';

export function TradingSignal() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <MLClassificationPanel />
      <TradingPanel />
    </div>
  );
}
```

---

### Пример 4: Deep Learning предсказания

```tsx
import { DeepLearningPanel } from '@/components/analytics/deep-learning-panel';

export function AITrading() {
  return (
    <Tabs defaultValue="prediction">
      <TabsList>
        <TabsTrigger value="prediction">Предсказания</TabsTrigger>
        <TabsTrigger value="training">Обучение</TabsTrigger>
      </TabsList>
      <TabsContent value="prediction">
        <DeepLearningPanel />
      </TabsContent>
      <TabsContent value="training">
        <ModelTrainingPanel />
      </TabsContent>
    </Tabs>
  );
}
```

---

### Пример 5: Расчет метрик вручную

```typescript
import { calculateSharpeRatio, calculateMaxDrawdown, calculateProfitFactor } from '@/lib/analytics';

async function analyzePerformance(trades: Trade[]) {
  const returns = trades.map(t => t.pnlPercent);
  
  const metrics = {
    sharpeRatio: calculateSharpeRatio(returns),
    sortinoRatio: calculateSortinoRatio(returns),
    maxDrawdown: calculateMaxDrawdown(trades.map(t => t.equity)),
    profitFactor: calculateProfitFactor(trades),
    winRate: trades.filter(t => t.pnl > 0).length / trades.length * 100,
  };
  
  return metrics;
}
```

---

### Пример 6: Подписка на обновления Equity Curve

```typescript
import { useEffect, useState } from 'react';

function useEquityCurveUpdates(isDemo: boolean) {
  const [equityCurve, setEquityCurve] = useState<EquityPoint[]>([]);

  useEffect(() => {
    const ws = new WebSocket(`wss://api.example.com/equity?demo=${isDemo}`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setEquityCurve(prev => [...prev.slice(-100), data.point]);
    };
    
    return () => ws.close();
  }, [isDemo]);
  
  return equityCurve;
}
```

---

## Интеграция с другими компонентами

### Связь с Portfolio Management

```typescript
// PnL Analytics автоматически использует данные из crypto-store
import { useCryptoStore } from '@/stores/crypto-store';

// В компоненте PnLAnalytics:
const { trades, account, getTotalBalance } = useCryptoStore();
```

### Интеграция с Bot Manager

```typescript
// ML Classification интегрируется с ботами
import { useMLSignalStore } from '@/stores/ml-signal-store';

function BotSignalIntegration() {
  const { signal } = useMLSignalStore();
  
  useEffect(() => {
    if (signal?.passed && signal.direction === 'LONG') {
      botManager.openPosition('LONG', signal.confidence);
    }
  }, [signal]);
}
```

### Экспорт статистики

```typescript
// ShareStatsCard интеграция
import { ShareStatsCard } from '@/components/share/share-stats-card';

function PnLAnalytics() {
  const [showShareCard, setShowShareCard] = useState(false);
  
  return (
    <>
      <Button onClick={() => setShowShareCard(true)}>
        <Share2 className="h-4 w-4" />
      </Button>
      
      <ShareStatsCard
        open={showShareCard}
        onOpenChange={setShowShareCard}
        statsData={{
          totalTrades: stats.totalTrades,
          winningTrades: stats.winningTrades,
          winRate: stats.winRate,
          totalPnL: stats.totalPnL,
          // ...
        }}
      />
    </>
  );
}
```

---

## Best Practices

### 1. Кэширование данных

```typescript
// Используйте SWR для кэширования API запросов
import useSWR from 'swr';

function usePnLStats(demo: boolean, period: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/pnl-stats?demo=${demo}&period=${period}`,
    fetcher,
    { refreshInterval: 30000 } // Обновление каждые 30 сек
  );
  
  return { stats: data, isLoading, error, refresh: mutate };
}
```

### 2. Оптимизация графиков

```typescript
// Используйте useMemo для вычислений данных графика
const chartData = useMemo(() => {
  return equityCurve.map(point => ({
    date: formatDate(point.timestamp),
    value: point.equity,
  }));
}, [equityCurve]);
```

### 3. Обработка ошибок

```typescript
const fetchPnLData = useCallback(async () => {
  setIsLoading(true);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    setStats(data.stats);
  } catch (error) {
    toast.error('Ошибка загрузки статистики');
    // Fallback на локальные данные
    setStats(calculateLocalStats(trades));
  } finally {
    setIsLoading(false);
  }
}, [url, trades]);
```

---

## Troubleshooting

### Проблема: Графики не отображаются

**Решение:** Проверьте формат данных и ResponsiveContainer:

```typescript
// Убедитесь, что данные не пустые
if (pnlChartData.length === 0) {
  return <EmptyState message="Нет данных для отображения" />;
}

// Проверьте ширину контейнера
<ResponsiveContainer width="100%" height={350}>
  {/* Chart */}
</ResponsiveContainer>
```

### Проблема: ML классификация возвращает нейтральный результат

**Решение:** Проверьте пороговые значения:

```typescript
// Уменьшите минимальные пороги
const config = {
  minConfidence: 0.5,  // было 0.6
  minProbability: 0.5, // было 0.55
};
```

### Проблема: LSTM показывает низкую точность

**Решение:** Увеличьте данные для обучения и epochs:

```typescript
const trainingConfig = {
  epochs: 100,          // было 50
  sequenceLength: 120,  // было 60
  minSamples: 5000,     // минимум данных
};
```

---

## Ссылки

- [ADVANCED_ANALYTICS.md](/docs/ui/ADVANCED_ANALYTICS.md) — Технические детали ML/DL модулей
- [PORTFOLIO_MANAGEMENT.md](/docs/components/PORTFOLIO_MANAGEMENT.md) — Управление портфелем
- [RISK_MANAGEMENT_UI.md](/docs/components/RISK_MANAGEMENT_UI.md) — UI риск-менеджмента
- [ML_FILTERING_SYSTEM.md](/docs/components/ML_FILTERING_SYSTEM.md) — ML фильтрация сигналов

---

*Документация обновлена: Март 2026*
