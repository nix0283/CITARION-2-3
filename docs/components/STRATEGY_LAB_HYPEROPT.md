# Strategy Lab & Hyperopt Documentation

**Версия:** 2.0  
**Последнее обновление:** Март 2026  
**Компоненты:** Strategy Lab, Hyperopt Panel, Backtesting Engine

---

## Содержание

1. [Обзор лаборатории стратегий](#1-обзор-лаборатории-стратегий)
2. [Компоненты](#2-компоненты)
   - [Strategy Lab](#21-strategy-lab)
   - [Hyperopt Panel](#22-hyperopt-panel)
   - [Backtesting Engine](#23-backtesting-engine)
3. [Методы оптимизации](#3-методы-оптимизации)
4. [Параметры для оптимизации](#4-параметры-для-оптимизации)
5. [API эндпоинты](#5-api-эндпоинты)
6. [Примеры использования](#6-примеры-использования)

---

## 1. Обзор лаборатории стратегий

### Назначение

Strategy Lab — это интерактивная среда для разработки, тестирования и оптимизации торговых стратегий. Компонент объединяет:

- **Backtesting Engine** — историческое тестирование стратегий
- **Hyperopt Panel** — оптимизация параметров с помощью ML-алгоритмов
- **Paper Trading** — тестирование на виртуальных деньгах в реальном времени
- **ML Filter** — фильтрация сигналов с помощью машинного обучения

### Архитектура

```
┌─────────────────────────────────────────────────────────────┐
│                     STRATEGY LAB                             │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Strategies  │  │   Tactics    │  │   Paper Trading  │  │
│  │    Tab       │  │    Tab       │  │       Tab        │  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘  │
│         │                 │                    │             │
│         └────────────┬────┴────────────────────┘             │
│                      ▼                                       │
│           ┌─────────────────────┐                            │
│           │   Backtest Engine   │                            │
│           └──────────┬──────────┘                            │
│                      │                                       │
│  ┌───────────────────┴───────────────────┐                  │
│  │           HYPEROPT PANEL               │                  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐  │                  │
│  │  │  TPE    │ │ Random  │ │ Genetic │  │                  │
│  │  └─────────┘ └─────────┘ └─────────┘  │                  │
│  └───────────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

### Ключевые возможности

| Функция | Описание |
|---------|----------|
| **Backtesting** | Тестирование на исторических данных до 365 дней |
| **Walk-Forward Validation** | Проверка на out-of-sample данных для предотвращения переобучения |
| **Hyperopt** | Оптимизация параметров: TPE, Random, Grid, Genetic |
| **ML Filter** | Фильтрация сигналов нейросетью |
| **Paper Trading** | Создание бота для тестирования в реальном времени |
| **Tactics Editor** | Настройка входов, TP, SL, DCA |

---

## 2. Компоненты

### 2.1 Strategy Lab

**Файл:** `src/components/strategy-lab/strategy-lab.tsx`

#### Props Interface

```typescript
interface StrategyLabProps {
  // Strategy Lab не принимает внешних props
  // Весь state управляется внутренне
}
```

#### State

```typescript
// Основные вкладки
const [activeTab, setActiveTab] = useState("strategies");

// Выбранная стратегия
const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
const [strategyParams, setStrategyParams] = useState<Record<string, number | boolean | string>>({});

// Тактики
const [selectedTactics, setSelectedTactics] = useState<TacticsSet>(PREDEFINED_TACTICS_SETS[0]);

// Backtest
const [backtestSymbol, setBacktestSymbol] = useState("BTCUSDT");
const [backtestTimeframe, setBacktestTimeframe] = useState("1h");
const [backtestInitialBalance, setBacktestInitialBalance] = useState(10000);
const [backtestDays, setBacktestDays] = useState(90);
const [backtestResult, setBacktestResult] = useState<BacktestResult | null>(null);

// Hyperopt
const [hyperoptResult, setHyperoptResult] = useState<HyperoptResult | null>(null);
const [hyperoptMethod, setHyperoptMethod] = useState("TPE");
const [hyperoptObjective, setHyperoptObjective] = useState("sharpeRatio");

// ML Filter
const [useMLFilter, setUseMLFilter] = useState(true);
const [mlMinScore, setMlMinScore] = useState(0.4);
```

#### Поддерживаемые стратегии

| ID | Название | Параметры |
|----|----------|-----------|
| `rsi-macd-strategy` | RSI + MACD Strategy | rsiPeriod, rsiOverbought, rsiOversold, macdFast, macdSlow, macdSignal |
| `bb-reversal-strategy` | Bollinger Bands Reversal | bbPeriod, bbStdDev, confirmCandles |
| `ema-crossover-strategy` | EMA Crossover | fastEma, slowEma, useFilter |

#### Интерфейс Strategy

```typescript
interface Strategy {
  id: string;
  name: string;
  description?: string;
  version: string;
  tags?: string[];
  parameters: StrategyParameter[];
}

interface StrategyParameter {
  name: string;
  description?: string;
  type: "number" | "integer" | "boolean" | "string" | "select";
  defaultValue: number | boolean | string;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  category?: string;
}
```

#### Tactics Editor

Редактор тактик позволяет настраивать:

**Entry Types:**
- `MARKET` — Рыночный вход
- `LIMIT` — Лимитный вход
- `BREAKOUT` — Вход на пробое
- `PULLBACK` — Вход на откате
- `DCA` — Усреднение (Dollar Cost Averaging)

**Take Profit Types:**
- `FIXED_TP` — Фиксированный процент
- `MULTI_TP` — Множественные цели
- `TRAILING_STOP` — Трейлинг-стоп

**Stop Loss Types:**
- `PERCENT` — Процентный
- `FIXED` — Фиксированная цена
- `ATR_BASED` — На основе ATR

#### Результаты Backtest

```typescript
interface BacktestResult {
  id: string;
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
  progress: number;
  metrics: BacktestMetrics;
  trades: BacktestTrade[];
  equityCurve: EquityPoint[];
  initialBalance: number;
  finalBalance: number;
  finalEquity: number;
  dataInfo?: {
    source: string;
    candlesCount: number;
    exchange: string;
    symbol: string;
    timeframe: string;
    startDate: string;
    endDate: string;
  };
  mlFilter?: {
    enabled: boolean;
    totalSignals: number;
    passedSignals: number;
    rejectedSignals: number;
    avgMLScore?: number;
    improvementPercent?: number;
  };
}

interface BacktestMetrics {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  totalPnl: number;
  totalPnlPercent: number;
  avgPnl: number;
  profitFactor: number;
  sharpeRatio: number;
  maxDrawdown: number;
  maxDrawdownPercent: number;
}
```

---

### 2.2 Hyperopt Panel

**Файл:** `src/components/hyperopt/hyperopt-panel.tsx`

#### Props Interface

```typescript
interface HyperoptPanelProps {
  // Hyperopt Panel не принимает внешних props
  // Весь state управляется внутренне
}
```

#### Типы пространств параметров

```typescript
type SpaceType = "uniform" | "quniform" | "loguniform" | "categorical" | "normal";
type OptimizationMethod = "RANDOM" | "GRID" | "TPE" | "GENETIC" | "BAYESIAN" | "CMAES";
type OptimizationObjective = "sharpeRatio" | "sortinoRatio" | "totalPnl" | "winRate" | "profitFactor" | "maxDrawdown";
type HyperoptStatus = "IDLE" | "RUNNING" | "PAUSED" | "COMPLETED" | "CANCELLED" | "FAILED";
```

#### State

```typescript
// Параметры для оптимизации
const [parameters, setParameters] = useState<HyperoptParameter[]>([...]);

// Настройки оптимизации
const [method, setMethod] = useState<OptimizationMethod>("TPE");
const [objective, setObjective] = useState<OptimizationObjective>("sharpeRatio");
const [maxEvals, setMaxEvals] = useState(100);

// Настройки стратегии
const [strategyId, setStrategyId] = useState("rsi-reversal");
const [symbol, setSymbol] = useState("BTCUSDT");
const [timeframe, setTimeframe] = useState("1h");
const [initialBalance, setInitialBalance] = useState(10000);

// Ограничения
const [minTrades, setMinTrades] = useState(10);
const [maxDrawdown, setMaxDrawdown] = useState(30);
const [earlyStopping, setEarlyStopping] = useState(true);
const [earlyStoppingPatience, setEarlyStoppingPatience] = useState(20);

// Результаты
const [result, setResult] = useState<HyperoptResult>(DEFAULT_RESULT);
const [isRunning, setIsRunning] = useState(false);
const [isPaused, setIsPaused] = useState(false);
```

#### Интерфейс HyperoptParameter

```typescript
interface HyperoptParameter {
  id: string;
  name: string;
  space: SpaceType;
  min: number;
  max: number;
  step?: number;
  choices?: string;          // Для categorical: "a,b,c"
  defaultValue: number | string;
  enabled: boolean;
}
```

#### Интерфейс HyperoptResult

```typescript
interface HyperoptResult {
  id: string;
  status: HyperoptStatus;
  progress: number;
  currentIteration: number;
  totalIterations: number;
  bestParams: Record<string, number | string | boolean>;
  bestObjectiveValue: number;
  trials: HyperoptTrial[];
  startedAt: Date | null;
  completedAt: Date | null;
  elapsedTime: number;
  statistics: {
    avgObjective: number;
    stdObjective: number;
    improvement: number;
    trialsWithoutImprovement: number;
  };
}

interface HyperoptTrial {
  id: number;
  params: Record<string, number | string | boolean>;
  objectiveValue: number;
  status: "COMPLETED" | "FAILED" | "PRUNED";
  duration: number;
  trades: number;
  winRate: number;
  pnl: number;
  sharpeRatio: number;
  maxDrawdown: number;
}
```

#### Целевые функции (Objectives)

| Objective | Описание | Направление |
|-----------|----------|-------------|
| `sharpeRatio` | Sharpe Ratio — доходность с поправкой на риск | Максимизация |
| `sortinoRatio` | Sortino Ratio — доходность с учётом нисходящего риска | Максимизация |
| `totalPnl` | Общая прибыль/убыток в USDT | Максимизация |
| `winRate` | Процент прибыльных сделок | Максимизация |
| `profitFactor` | Валовая прибыль / валовый убыток | Максимизация |
| `maxDrawdown` | Максимальная просадка | Минимизация |

#### Методы управления

```typescript
// Запуск оптимизации
const startOptimization = useCallback(async () => {...}, [parameters, ...]);

// Пауза оптимизации
const pauseOptimization = useCallback(() => {...}, []);

// Продолжение оптимизации
const resumeOptimization = useCallback(() => {...}, []);

// Остановка оптимизации
const stopOptimization = useCallback(() => {...}, []);

// Добавление параметра
const addParameter = useCallback(() => {...}, []);

// Удаление параметра
const removeParameter = useCallback((id: string) => {...}, []);

// Обновление параметра
const updateParameter = useCallback((id: string, updates) => {...}, []);

// Экспорт в JSON
const exportToJSON = useCallback((params, filename) => {...}, []);

// Копирование в буфер обмена
const copyToClipboard = useCallback((params) => {...}, []);
```

---

### 2.3 Backtesting Engine

**Файл:** `src/lib/hyperopt/engine.ts`

#### Класс HyperoptEngine

```typescript
export class HyperoptEngine {
  private results: Map<string, HyperoptResult> = new Map();
  private running: boolean = false;
  private cancelled: boolean = false;
  private trialIdCounter: number = 0;

  /**
   * Запустить оптимизацию
   */
  async run(
    config: HyperoptConfig,
    candles: OHLCV[],
    onProgress?: (progress: number, trial: HyperoptTrial) => void
  ): Promise<HyperoptResult>;

  /**
   * Отменить оптимизацию
   */
  cancel(resultId: string): void;

  /**
   * Получить результат
   */
  getResult(resultId: string): HyperoptResult | undefined;

  /**
   * Получить все результаты
   */
  getAllResults(): HyperoptResult[];

  /**
   * Run walk-forward validation
   */
  async runWalkForwardValidation(
    config: HyperoptConfig,
    candles: OHLCV[],
    onProgress?: (progress: number, fold: number, message: string) => void
  ): Promise<WalkForwardOptimizationResult>;
}
```

#### Singleton Instance

```typescript
import { getHyperoptEngine } from "@/lib/hyperopt";

const engine = getHyperoptEngine();
```

---

## 3. Методы оптимизации

### 3.1 Random Search (Случайный поиск)

**Описание:** Простой перебор случайных комбинаций параметров.

**Алгоритм:**
1. Для каждой итерации генерируется случайная комбинация параметров
2. Выполняется backtest с этими параметрами
3. Результат сохраняется

**Преимущества:**
- Простота реализации
- Хорошее покрытие пространства параметров
- Параллелизация

**Недостатки:**
- Не использует информацию о предыдущих прогонах
- Требует много итераций для хорошей сходимости

**Реализация:**

```typescript
private async runRandomSearch(
  config: HyperoptConfig,
  candles: any[],
  result: HyperoptResult,
  onProgress?: (progress: number, trial: HyperoptTrial) => void
): Promise<void> {
  for (let i = 0; i < config.maxEvals && !this.cancelled; i++) {
    const params = this.sampleRandomParams(config);
    const trial = await this.runTrial(config, params, candles, result);
    
    result.progress = ((i + 1) / config.maxEvals) * 100;
    onProgress?.(result.progress, trial);
  }
}
```

---

### 3.2 Grid Search (Поиск по сетке)

**Описание:** Полный перебор всех комбинаций параметров по сетке.

**Алгоритм:**
1. Для каждого параметра генерируется набор значений с шагом `q`
2. Вычисляется декартово произведение всех наборов
3. Каждая комбинация тестируется

**Преимущества:**
- Полное покрытие пространства
- Воспроизводимость результатов
- Подходит для малого числа параметров

**Недостатки:**
- Экспоненциальный рост комбинаций
- Неэффективен для большого числа параметров

**Реализация:**

```typescript
private async runGridSearch(
  config: HyperoptConfig,
  candles: any[],
  result: HyperoptResult,
  onProgress?: (progress: number, trial: HyperoptTrial) => void
): Promise<void> {
  const grid = this.generateGrid(config);
  const totalCombinations = grid.length;
  const maxEvals = Math.min(config.maxEvals, totalCombinations);

  for (let i = 0; i < maxEvals && !this.cancelled; i++) {
    const params = grid[i];
    const trial = await this.runTrial(config, params, candles, result);
    
    result.progress = ((i + 1) / maxEvals) * 100;
    onProgress?.(result.progress, trial);
  }
}

// Генерация декартова произведения
private cartesianProduct(obj: Record<string, any[]>): Record<string, any>[] {
  const keys = Object.keys(obj);
  if (keys.length === 0) return [{}];

  const [first, ...rest] = keys;
  const firstValues = obj[first];
  const restProducts = this.cartesianProduct(
    Object.fromEntries(rest.map(k => [k, obj[k]]))
  );

  const result: Record<string, any>[] = [];
  for (const v of firstValues) {
    for (const p of restProducts) {
      result.push({ [first]: v, ...p });
    }
  }
  return result;
}
```

---

### 3.3 TPE (Tree-structured Parzen Estimator)

**Описание:** Байесовский метод оптимизации, моделирующий распределение хороших и плохих результатов.

**Алгоритм:**
1. **Warmup Phase** — первые 20% итераций случайный поиск
2. **Modeling Phase** — разделение проб на "хорошие" (top 25%) и "плохие"
3. **Sampling Phase** — выборка новых параметров на основе модели

**Формула:**
```
l(x) = P(x | y < y*)  — распределение "хороших" параметров
g(x) = P(x | y >= y*) — распределение "плохих" параметров

Выбираем x, который максимизирует: l(x) / g(x)
```

**Преимущества:**
- Эффективное использование предыдущих результатов
- Хорошо работает для многоэкстремальных функций
- Рекомендуемый метод для большинства задач

**Недостатки:**
- Требует warmup период
- Может застрять в локальном оптимуме

**Реализация:**

```typescript
private async runTPESearch(
  config: HyperoptConfig,
  candles: any[],
  result: HyperoptResult,
  onProgress?: (progress: number, trial: HyperoptTrial) => void
): Promise<void> {
  // Warmup: случайный поиск для накопления данных
  const warmupTrials = Math.min(20, Math.floor(config.maxEvals * 0.2));

  for (let i = 0; i < warmupTrials && !this.cancelled; i++) {
    const params = this.sampleRandomParams(config);
    await this.runTrial(config, params, candles, result);
  }

  // TPE: выборка на основе модели
  for (let i = warmupTrials; i < config.maxEvals && !this.cancelled; i++) {
    const params = this.sampleTPEParams(config, result);
    const trial = await this.runTrial(config, params, candles, result);
    
    result.progress = ((i + 1) / config.maxEvals) * 100;
    onProgress?.(result.progress, trial);
  }
}

private sampleTPEParams(config: HyperoptConfig, result: HyperoptResult): Record<string, any> {
  const trials = result.trials.filter(t => t.status === "COMPLETED");
  if (trials.length < 10) {
    return this.sampleRandomParams(config);
  }

  // Сортируем по objective
  trials.sort((a, b) => {
    const aVal = a.objectiveValue || 0;
    const bVal = b.objectiveValue || 0;
    return config.direction === "maximize" ? bVal - aVal : aVal - bVal;
  });

  // Берём лучшие 25%
  const goodTrials = trials.slice(0, Math.floor(trials.length * 0.25));

  // Выбираем случайный из хороших и мутируем
  const baseParams = goodTrials[Math.floor(Math.random() * goodTrials.length)].params;
  const newParams = { ...baseParams };

  // Мутация с вероятностью 30%
  if (config.strategyParameters) {
    for (const param of config.strategyParameters) {
      if (Math.random() < 0.3) {
        newParams[param.name] = this.sampleParameter(param);
      } else {
        // Небольшая вариация вокруг текущего значения
        const current = newParams[param.name];
        if (typeof current === "number") {
          const range = ((param.max || 1) - (param.min || 0)) * 0.1;
          let newValue = current + (Math.random() - 0.5) * range;
          if (param.min !== undefined) newValue = Math.max(param.min, newValue);
          if (param.max !== undefined) newValue = Math.min(param.max, newValue);
          newParams[param.name] = newValue;
        }
      }
    }
  }

  return newParams;
}
```

---

### 3.4 Genetic Algorithm (Генетический алгоритм)

**Описание:** Эволюционный алгоритм, моделирующий естественный отбор.

**Алгоритм:**
1. **Initialization** — создание начальной популяции (20% от maxEvals)
2. **Selection** — турнирный отбор лучших особей
3. **Crossover** — скрещивание родителей для создания потомков
4. **Mutation** — случайные мутации параметров
5. **Elitism** — сохранение лучших особей в следующее поколение

**Параметры:**
- Population size: `min(20, maxEvals * 0.2)`
- Elite ratio: 30%
- Mutation rate: 10%
- Tournament size: 3

**Преимущества:**
- Глобальный поиск
- Хорошо работает для сложных ландшафтов
- Параллелизация

**Недостатки:**
- Требует больше вычислений
- Может медленно сходиться

**Реализация:**

```typescript
private async runGeneticSearch(
  config: HyperoptConfig,
  candles: any[],
  result: HyperoptResult,
  onProgress?: (progress: number, trial: HyperoptTrial) => void
): Promise<void> {
  const populationSize = Math.min(20, Math.floor(config.maxEvals * 0.2));
  const generations = Math.ceil(config.maxEvals / populationSize);

  // Начальная популяция
  let population: { params: Record<string, any>; fitness: number }[] = [];

  for (let i = 0; i < populationSize && !this.cancelled; i++) {
    const params = this.sampleRandomParams(config);
    const trial = await this.runTrial(config, params, candles, result);
    population.push({
      params,
      fitness: trial.objectiveValue || 0,
    });
  }

  // Эволюция
  for (let gen = 1; gen < generations && !this.cancelled; gen++) {
    // Сортировка по fitness
    population.sort((a, b) => 
      config.direction === "maximize" ? b.fitness - a.fitness : a.fitness - b.fitness
    );

    // Selection - оставляем элиту
    const elite = population.slice(0, Math.floor(populationSize * 0.3));

    // Crossover и Mutation
    const newPopulation = [...elite];

    while (newPopulation.length < populationSize && !this.cancelled) {
      const parent1 = this.selectParent(population);
      const parent2 = this.selectParent(population);
      const child = this.crossover(parent1, parent2, config);
      this.mutate(child, config);

      const trial = await this.runTrial(config, child, candles, result);
      newPopulation.push({
        params: child,
        fitness: trial.objectiveValue || 0,
      });
    }

    population = newPopulation;
    result.progress = ((gen + 1) / generations) * 100;
  }
}

// Турнирный отбор
private selectParent(population: { params: any; fitness: number }[]): any {
  const tournament = 3;
  let best = population[Math.floor(Math.random() * population.length)];
  for (let i = 1; i < tournament; i++) {
    const candidate = population[Math.floor(Math.random() * population.length)];
    if (candidate.fitness > best.fitness) {
      best = candidate;
    }
  }
  return best.params;
}

// Скрещивание
private crossover(p1: any, p2: any, config: HyperoptConfig): any {
  const child: any = {};
  const keys = Array.from(new Set([...Object.keys(p1), ...Object.keys(p2)]));

  for (const key of keys) {
    child[key] = Math.random() < 0.5 ? p1[key] : p2[key];
  }

  return child;
}

// Мутация
private mutate(params: any, config: HyperoptConfig): void {
  const mutationRate = 0.1;

  if (config.strategyParameters) {
    for (const param of config.strategyParameters) {
      if (Math.random() < mutationRate) {
        params[param.name] = this.sampleParameter(param);
      }
    }
  }
}
```

---

### 3.5 Сравнение методов

| Метод | Скорость | Качество | Параллелизация | Рекомендуемые случаи |
|-------|----------|----------|----------------|---------------------|
| Random | ⭐⭐⭐ | ⭐⭐ | ✅ | Начальное исследование, много параметров |
| Grid | ⭐ | ⭐⭐ | ✅ | Мало параметров, важна воспроизводимость |
| TPE | ⭐⭐ | ⭐⭐⭐ | ❌ | Большинство случаев, рекомендуется |
| Genetic | ⭐ | ⭐⭐⭐ | ✅ | Сложные ландшафты, много локальных оптимумов |

---

## 4. Параметры для оптимизации

### 4.1 Пространства параметров

#### Uniform (Равномерное)

Непрерывное равномерное распределение между min и max.

```typescript
const param: HyperoptParameter = {
  name: "rsiPeriod",
  space: "uniform",
  min: 5,
  max: 30,
  defaultValue: 14,
};
```

#### Quniform (Квантованное)

Дискретное равномерное распределение с шагом q.

```typescript
const param: HyperoptParameter = {
  name: "rsiPeriod",
  space: "quniform",
  min: 5,
  max: 30,
  q: 1,          // Шаг = 1
  defaultValue: 14,
};
```

#### Loguniform (Лог-равномерное)

Равномерное распределение в логарифмическом масштабе. Подходит для параметров, изменяющихся на несколько порядков.

```typescript
const param: HyperoptParameter = {
  name: "learningRate",
  space: "loguniform",
  min: 0.0001,
  max: 0.1,
  defaultValue: 0.001,
};
```

#### Categorical (Категориальное)

Дискретные категории.

```typescript
const param: HyperoptParameter = {
  name: "entryType",
  space: "categorical",
  choices: ["MARKET", "LIMIT", "BREAKOUT", "PULLBACK"],
  defaultValue: "MARKET",
};
```

#### Normal (Нормальное)

Гауссово распределение.

```typescript
const param: HyperoptParameter = {
  name: "threshold",
  space: "normal",
  mu: 50,        // Среднее
  sigma: 10,     // Стандартное отклонение
  defaultValue: 50,
};
```

### 4.2 Параметры стратегии

```typescript
interface StrategyHyperoptParams {
  // RSI
  rsiPeriod?: HyperoptParameter;
  rsiOverbought?: HyperoptParameter;
  rsiOversold?: HyperoptParameter;
  
  // MACD
  macdFast?: HyperoptParameter;
  macdSlow?: HyperoptParameter;
  macdSignal?: HyperoptParameter;
  
  // Bollinger Bands
  bbPeriod?: HyperoptParameter;
  bbStdDev?: HyperoptParameter;
  
  // EMA
  fastEma?: HyperoptParameter;
  slowEma?: HyperoptParameter;
}
```

### 4.3 Параметры тактик

```typescript
interface TacticsHyperoptParams {
  // Entry
  entryType?: HyperoptParameter;
  positionSize?: HyperoptParameter;
  entryTimeout?: HyperoptParameter;
  
  // Take Profit
  tpType?: HyperoptParameter;
  tpPercent?: HyperoptParameter;
  multiTPCount?: HyperoptParameter;
  multiTPDistribution?: HyperoptParameter;
  
  // Stop Loss
  slType?: HyperoptParameter;
  slPercent?: HyperoptParameter;
  
  // Trailing
  trailingType?: HyperoptParameter;
  trailingPercent?: HyperoptParameter;
  trailingActivation?: HyperoptParameter;
}
```

### 4.4 Пример конфигурации

```typescript
const config: HyperoptConfig = {
  id: `hyperopt-${Date.now()}`,
  name: "RSI Strategy Optimization",
  
  target: "STRATEGY",
  strategyId: "rsi-macd-strategy",
  
  strategyParameters: [
    {
      name: "rsiPeriod",
      space: "quniform",
      min: 5,
      max: 30,
      q: 1,
      defaultValue: 14,
    },
    {
      name: "rsiOverbought",
      space: "quniform",
      min: 60,
      max: 85,
      q: 5,
      defaultValue: 70,
    },
    {
      name: "rsiOversold",
      space: "quniform",
      min: 15,
      max: 40,
      q: 5,
      defaultValue: 30,
    },
  ],
  
  method: "TPE",
  maxEvals: 100,
  objective: "sharpeRatio",
  direction: "maximize",
  
  mode: "BACKTESTING",
  symbol: "BTCUSDT",
  timeframe: "1h",
  initialBalance: 10000,
  
  minTrades: 10,
  maxDrawdown: 30,
  
  parallel: false,
};
```

---

## 5. API эндпоинты

### 5.1 Backtesting

#### POST /api/backtesting/run

Запуск backtest.

**Request:**
```json
{
  "strategyId": "rsi-macd-strategy",
  "strategyParams": {
    "rsiPeriod": 14,
    "rsiOverbought": 70,
    "rsiOversold": 30
  },
  "tacticsSet": {...},
  "symbol": "BTCUSDT",
  "timeframe": "1h",
  "initialBalance": 10000,
  "days": 90,
  "exchange": "binance",
  "marketType": "futures",
  "useMLFilter": true,
  "mlMinScore": 0.4
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "id": "backtest-123",
    "status": "COMPLETED",
    "metrics": {
      "totalTrades": 47,
      "winRate": 61.7,
      "totalPnl": 2345.67,
      "sharpeRatio": 1.42,
      "maxDrawdownPercent": 8.7
    },
    "mlFilter": {
      "enabled": true,
      "totalSignals": 68,
      "passedSignals": 47,
      "rejectedSignals": 21,
      "improvementPercent": 15.3
    }
  }
}
```

### 5.2 Hyperopt

#### POST /api/hyperopt/run

Запуск оптимизации.

**Request:**
```json
{
  "strategyId": "rsi-reversal",
  "symbol": "BTCUSDT",
  "timeframe": "1h",
  "initialBalance": 10000,
  "method": "TPE",
  "objective": "sharpeRatio",
  "maxEvals": 100,
  "parameters": [
    {
      "name": "rsiPeriod",
      "space": "quniform",
      "min": 5,
      "max": 30,
      "q": 1,
      "defaultValue": 14
    }
  ],
  "constraints": {
    "minTrades": 10,
    "maxDrawdown": 30
  }
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "id": "hyperopt-456",
    "status": "COMPLETED",
    "bestParams": {
      "rsiPeriod": 12,
      "rsiOverbought": 75,
      "rsiOversold": 25
    },
    "bestObjectiveValue": 1.78,
    "statistics": {
      "avgObjective": 1.23,
      "improvement": 45.2,
      "trialsWithoutImprovement": 5
    }
  }
}
```

### 5.3 Paper Trading

#### POST /api/paper-trading/create

Создание Paper Trading бота.

**Request:**
```json
{
  "name": "RSI Strategy Paper Bot",
  "strategyId": "rsi-macd-strategy",
  "strategyParams": {...},
  "tacticsSet": {...},
  "symbol": "BTCUSDT",
  "timeframe": "1h",
  "initialBalance": 10000
}
```

**Response:**
```json
{
  "success": true,
  "bot": {
    "id": "paper-bot-789",
    "name": "RSI Strategy Paper Bot",
    "status": "IDLE",
    "strategyId": "rsi-macd-strategy",
    "symbol": "BTCUSDT",
    "balance": 10000,
    "equity": 10000
  }
}
```

---

## 6. Примеры использования

### 6.1 Пример: Запуск Backtest

```typescript
import { useState } from "react";
import { toast } from "sonner";

async function runBacktest() {
  const response = await fetch("/api/backtesting/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      strategyId: "rsi-macd-strategy",
      strategyParams: {
        rsiPeriod: 14,
        rsiOverbought: 70,
        rsiOversold: 30,
        macdFast: 12,
        macdSlow: 26,
        macdSignal: 9,
      },
      symbol: "BTCUSDT",
      timeframe: "1h",
      initialBalance: 10000,
      days: 90,
      exchange: "binance",
      marketType: "futures",
      useMLFilter: true,
      mlMinScore: 0.4,
    }),
  });

  const data = await response.json();
  
  if (data.success) {
    console.log("Backtest completed:", data.result.metrics);
    toast.success("Backtest completed!");
  } else {
    toast.error(data.error);
  }
}
```

### 6.2 Пример: Программная оптимизация

```typescript
import { getHyperoptEngine, HyperoptConfig, HyperoptParameter } from "@/lib/hyperopt";

async function optimizeStrategy(candles: OHLCV[]) {
  const engine = getHyperoptEngine();
  
  const parameters: HyperoptParameter[] = [
    {
      name: "rsiPeriod",
      space: "quniform",
      min: 5,
      max: 30,
      q: 1,
      defaultValue: 14,
    },
    {
      name: "rsiOverbought",
      space: "quniform",
      min: 60,
      max: 85,
      q: 5,
      defaultValue: 70,
    },
    {
      name: "rsiOversold",
      space: "quniform",
      min: 15,
      max: 40,
      q: 5,
      defaultValue: 30,
    },
  ];
  
  const config: HyperoptConfig = {
    id: `hyperopt-${Date.now()}`,
    name: "RSI Optimization",
    target: "STRATEGY",
    strategyId: "rsi-reversal",
    strategyParameters: parameters,
    method: "TPE",
    maxEvals: 100,
    objective: "sharpeRatio",
    direction: "maximize",
    mode: "BACKTESTING",
    symbol: "BTCUSDT",
    timeframe: "1h",
    initialBalance: 10000,
    parallel: false,
  };
  
  const result = await engine.run(config, candles, (progress, trial) => {
    console.log(`Progress: ${progress.toFixed(1)}%, Trial: ${trial.id}`);
  });
  
  console.log("Best params:", result.bestParams);
  console.log("Best objective:", result.bestObjectiveValue);
  
  return result;
}
```

### 6.3 Пример: Walk-Forward Validation

```typescript
import { getHyperoptEngine, HyperoptConfig, WalkForwardValidationConfig } from "@/lib/hyperopt";

async function runWalkForward(candles: OHLCV[]) {
  const engine = getHyperoptEngine();
  
  const config: HyperoptConfig = {
    id: `wf-${Date.now()}`,
    name: "Walk-Forward Optimization",
    target: "STRATEGY",
    strategyId: "rsi-reversal",
    strategyParameters: [...],
    method: "TPE",
    maxEvals: 50,
    objective: "sharpeRatio",
    direction: "maximize",
    mode: "BACKTESTING",
    symbol: "BTCUSDT",
    timeframe: "1h",
    initialBalance: 10000,
    parallel: false,
    
    // Walk-Forward настройки
    useWalkForwardValidation: true,
    walkForwardConfig: {
      type: "expanding",
      initialTrainWindow: Math.floor(candles.length * 0.5),
      testWindow: Math.floor(candles.length * 0.1),
      stepSize: Math.floor(candles.length * 0.1),
      embargoBars: 24,
      purgeBars: 5,
    },
  };
  
  const result = await engine.runWalkForwardValidation(
    config,
    candles,
    (progress, fold, message) => {
      console.log(`Fold ${fold}: ${message}`);
    }
  );
  
  console.log("Out-of-sample performance:", result.outOfSamplePerformance);
  console.log("Overfitting risk:", result.overfittingRisk);
  console.log("Stability score:", result.stabilityScore);
  
  return result;
}
```

### 6.4 Пример: Создание Paper Trading бота

```typescript
async function createPaperBot(strategyId: string, bestParams: Record<string, any>) {
  const response = await fetch("/api/paper-trading/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: `Optimized ${strategyId} Bot`,
      strategyId,
      strategyParams: bestParams,
      symbol: "BTCUSDT",
      timeframe: "1h",
      initialBalance: 10000,
    }),
  });

  const data = await response.json();
  
  if (data.success) {
    console.log("Paper bot created:", data.bot);
    return data.bot;
  }
  
  throw new Error(data.error);
}
```

### 6.5 Пример: Early Stopping

```typescript
import { EarlyStopping } from "@/lib/hyperopt/early-stopping";

const earlyStopping = new EarlyStopping({
  enabled: true,
  patience: 20,
  minDelta: 0.001,
  minIterations: 10,
});

for (let i = 0; i < maxIterations; i++) {
  const score = await evaluateTrial(params);
  
  const { shouldStop, improved, reason } = earlyStopping.check(score, "maximize");
  
  if (improved) {
    console.log(`New best score: ${score}`);
  }
  
  if (shouldStop) {
    console.log(`Early stopping: ${reason}`);
    break;
  }
}

console.log("Best score:", earlyStopping.getBestScore());
console.log("Best iteration:", earlyStopping.getBestIteration());
```

---

## 7. Walk-Forward Validation

### Обзор

Walk-Forward Validation (WFV) — золотой стандарт для тестирования торговых стратегий. Метод предотвращает переобучение и предоставляет реалистичную оценку производительности.

### Типы Walk-Forward

| Тип | Описание | Применение |
|-----|----------|------------|
| `anchored` | Фиксированный старт, растущий train | Мало исторических данных |
| `expanding` | Растущее train окно | Стандартный случай |
| `rolling` | Фиксированный размер окна | Нестационарные рынки |

### Конфигурация

```typescript
interface WalkForwardValidationConfig {
  type: "anchored" | "expanding" | "rolling";
  initialTrainWindow: number;    // Размер train окна (бары или %)
  testWindow: number;            // Размер test окна
  stepSize: number;              // Шаг между фолдами
  embargoBars: number;           // Период между train и test
  purgeBars: number;             // Период очистки на границах
  usePercentageWindows?: boolean;
  minTrainWindow?: number;
  maxTrainWindow?: number;
}
```

### Результат

```typescript
interface WalkForwardOptimizationResult {
  config: WalkForwardValidationConfig;
  folds: WalkForwardFoldResult[];
  avgTrainPerformance: number;
  avgTestPerformance: number;
  stdTestPerformance: number;
  outOfSamplePerformance: number;
  stabilityScore: number;        // 0-1, консистентность между фолдами
  overfittingRisk: "low" | "medium" | "high";
  bestFold: WalkForwardFoldResult | null;
  robustParams: Record<string, any> | null;  // Робастные параметры
}
```

### Интерпретация результатов

| overfittingRisk | Условие | Рекомендация |
|-----------------|---------|--------------|
| `low` | train - test < 15% train | Стратегия стабильна |
| `medium` | train - test 15-30% train | Возможное переобучение |
| `high` | train - test > 30% train | Высокий риск переобучения |

---

## 8. ML Filter

### Обзор

ML Filter использует нейросеть для фильтрации торговых сигналов, улучшая качество входов.

### Параметры

```typescript
const [useMLFilter, setUseMLFilter] = useState(true);
const [mlMinScore, setMlMinScore] = useState(0.4);  // Минимальный score 0-1
```

### Результаты ML Filter

```typescript
interface MLFilterResult {
  enabled: boolean;
  totalSignals: number;      // Всего сигналов
  passedSignals: number;     // Прошло ML
  rejectedSignals: number;   // Отклонено ML
  avgMLScore?: number;       // Средний score
  improvementPercent?: number; // Улучшение результата
}
```

### Пример результатов

| Метрика | Без ML | С ML | Улучшение |
|---------|--------|------|-----------|
| Всего сигналов | 68 | 47 | - |
| Win Rate | 52% | 62% | +10% |
| Sharpe | 1.23 | 1.42 | +15% |
| Max DD | 12% | 8.7% | -27% |

---

## 9. Troubleshooting

### Частые проблемы

| Проблема | Причина | Решение |
|----------|---------|---------|
| Мало сделок | Слишком строгие условия входа | Ослабить параметры, увеличить период |
| Переобучение | Оптимизация на train данных | Использовать Walk-Forward Validation |
| Медленная оптимизация | Много параметров, Grid Search | Использовать TPE, уменьшить maxEvals |
| Низкий Win Rate | Несоответствующая стратегия | Проверить на другом таймфрейме/символе |

### Рекомендации

1. **Всегда используйте Walk-Forward Validation** для оценки реальной производительности
2. **Начинайте с TPE** — лучший баланс скорости и качества
3. **Используйте ML Filter** для улучшения качества сигналов
4. **Тестируйте на Paper Trading** перед реальной торговлей
5. **Минимум 30 сделок** для статистической значимости

---

## 10. Дополнительные ресурсы

- [Backtesting Engine](/docs/lib/backtesting/README.md)
- [Strategy Manager](/docs/lib/strategy/README.md)
- [ML Pipeline](/docs/ML_SIGNAL_PIPELINE.md)
- [Risk Management](/docs/RISK_MODELS_DOCUMENTATION.md)

---

*Документация создана: Март 2026*  
*Версия компонента: 2.0*
