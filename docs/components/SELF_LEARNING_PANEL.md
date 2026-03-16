# Self-Learning Panel & Genetic Optimizer

## Содержание

1. [Обзор самообучения](#1-обзор-самообучения)
2. [Компонент Genetic Optimizer Panel](#2-компонент-genetic-optimizer-panel)
3. [Генетический алгоритм](#3-генетический-алгоритм)
4. [Параметры оптимизации](#4-параметры-оптимизации)
5. [Результаты и метрики](#5-результаты-и-метрики)
6. [API эндпоинты](#6-api-эндпоинты)
7. [Примеры использования](#7-примеры-использования)

---

## 1. Обзор самообучения

### 1.1 Концепция

Система самообучения CITARION объединяет два подхода к оптимизации торговых стратегий:

1. **LOGOS Self-Learning** — адаптивная система, которая учится на результатах торгов
2. **Genetic Algorithm Optimizer** — эволюционная оптимизация параметров ботов

### 1.2 Архитектура самообучения

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SELF-LEARNING SYSTEM                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────┐         ┌─────────────────────┐              │
│  │   LOGOS LEARNING    │         │   GA OPTIMIZER      │              │
│  ├─────────────────────┤         ├─────────────────────┤              │
│  │ • Trade Recording   │         │ • Population Init   │              │
│  │ • Bot Performance   │         │ • Fitness Eval      │              │
│  │ • Confidence Adj    │         │ • Selection         │              │
│  │ • Weight Learning   │         │ • Crossover         │              │
│  └──────────┬──────────┘         │ • Mutation          │              │
│             │                    └──────────┬──────────┘              │
│             │                               │                          │
│             ▼                               ▼                          │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │                      LEARNING MODEL                              │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │  botWeights:          { "HFT": 0.7, "MFT": 0.5, ... }          │  │
│  │  symbolPreferences:   { "BTCUSDT": ["HFT", "MFT"], ... }        │  │
│  │  conditionMultipliers:{ "high_volatility": 0.8, ... }           │  │
│  │  timePreferences:     { "0": 0.5, "1": 0.6, ... }              │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                    │                                    │
│                                    ▼                                    │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │                    OPTIMIZED PARAMETERS                          │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │  • Stop Loss / Take Profit                                       │  │
│  │  • Indicator Periods                                             │  │
│  │  • Entry/Exit Thresholds                                         │  │
│  │  • Position Sizing                                               │  │
│  └─────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Источники данных для обучения

| Источник | Описание | Данные |
|----------|----------|--------|
| Manual Trades | Ручные сделки через UI | Entry/Exit, Duration, PnL |
| Signal Trades | Сигналы из чат-бота | Confidence, Source Bot, Reasoning |
| Bot Executions | Автоматические сделки ботов | Bot Code, Strategy, Outcome |

---

## 2. Компонент Genetic Optimizer Panel

### 2.1 Обзор

`GeneticOptimizerPanel` — главный UI компонент для эволюционной оптимизации параметров торговых ботов. Расположен в `src/components/self-learning/genetic-optimizer-panel.tsx`.

### 2.2 Интерфейсы

```typescript
// Статус оптимизатора
type OptimizerStatus = "IDLE" | "RUNNING" | "PAUSED" | "COMPLETED" | "CANCELLED" | "FAILED";

// Ген (оптимизируемый параметр)
interface Gene {
  name: string;         // Имя параметра
  value: number;        // Текущее значение
  min: number;          // Минимум
  max: number;          // Максимум
  mutationRate: number; // Скорость мутации
}

// Хромосома (набор генов)
interface Chromosome {
  fitness: number;      // Значение фитнес-функции
  genes: Gene[];        // Массив генов
}

// Задача оптимизации
interface OptimizationJob {
  id: string;
  botCode: string;
  botType: string;
  symbol: string;
  status: string;
  generation: number;
  progress: number;
  bestChromosome: Chromosome | null;
  history: PopulationStats[];
  startedAt: number | null;
  completedAt: number | null;
  durationMs: number;
  error: string | null;
  volatilityRegime: string | null;
  gaGarchConfig: {
    fitnessMultiplier: number;
    explorationBoost: number;
    regimeScore: number;
    trend: string;
  } | null;
}

// Результат применения параметров
interface ApplyResult {
  success: boolean;
  botCode: string;
  appliedParams: Record<string, number>;
  fitness: number;
  message: string;
}
```

### 2.3 Конфигурация генетического алгоритма

```typescript
interface GeneticConfig {
  populationSize: number;           // Размер популяции (default: 50)
  maxGenerations: number;           // Макс. поколений (default: 100)
  eliteCount: number;               // Количество элит (default: 2)
  selectionMethod: SelectionMethod; // Метод отбора
  tournamentSize: number;           // Размер турнира (default: 3)
  crossoverMethod: CrossoverMethod; // Метод скрещивания
  crossoverRate: number;            // Скорость скрещивания (default: 0.8)
  mutationMethod: MutationMethod;   // Метод мутации
  mutationRate: number;             // Скорость мутации (default: 0.1)
  adaptiveMutationIncrease: number; // Адаптивное увеличение мутации
  earlyStoppingPatience: number;    // Поколений без улучшения (default: 20)
  improvementThreshold: number;     // Порог улучшения (default: 0.001)
  parallelEvaluation: boolean;      // Параллельная оценка
}

type SelectionMethod = "tournament" | "roulette" | "rank" | "elitist";
type CrossoverMethod = "blend" | "single_point" | "two_point" | "uniform";
type MutationMethod = "adaptive" | "gaussian" | "random";
```

### 2.4 Поддерживаемые типы ботов

```typescript
const BOT_TYPES = [
  { value: "DCA", label: "DCA Bot", description: "Dollar Cost Averaging" },
  { value: "BB", label: "BB Bot", description: "Bollinger Bands" },
  { value: "ORION", label: "ORION Bot", description: "Multi-indicator" },
  { value: "LOGOS", label: "LOGOS Bot", description: "Meta strategy" },
  { value: "GRID", label: "GRID Bot", description: "Grid trading" },
  { value: "MFT", label: "MFT Bot", description: "Momentum Flow" },
];
```

### 2.5 Структура компонента

```
┌─────────────────────────────────────────────────────────────────────────┐
│  GENETIC ALGORITHM OPTIMIZER                                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────────┐   ┌──────────────────────────────────────┐  │
│  │  CONFIGURATION       │   │  PROGRESS & RESULTS                  │  │
│  ├──────────────────────┤   ├──────────────────────────────────────┤  │
│  │                      │   │                                      │  │
│  │  Bot Configuration   │   │  Optimization Progress               │  │
│  │  ├─ Bot Type         │   │  ├─ Progress Bar                     │  │
│  │  ├─ Bot Code         │   │  ├─ Generation Counter               │  │
│  │  └─ Symbol           │   │  └─ Stats Grid                       │  │
│  │                      │   │                                      │  │
│  │  Population Settings │   │  GARCH Adjustments                   │  │
│  │  ├─ Population Size  │   │  ├─ Fitness Multiplier               │  │
│  │  ├─ Max Generations  │   │  ├─ Exploration Boost                │  │
│  │  ├─ Mutation Rate    │   │  └─ Regime Score                     │  │
│  │  ├─ Crossover Rate   │   │                                      │  │
│  │  └─ Elite Count      │   │  Optimized Parameters                │  │
│  │                      │   │  ┌────────────────────────────────┐  │  │
│  │  Methods             │   │  │ rsiPeriod: 14.2500            │  │  │
│  │  ├─ Selection Method │   │  │ rsiOversold: 28.5000          │  │  │
│  │  ├─ Crossover Method │   │  │ stopLoss: 0.0185              │  │  │
│  │  └─ Mutation Method  │   │  │ takeProfit: 0.0420            │  │  │
│  │                      │   │  └────────────────────────────────┘  │  │
│  │  [Start Optimization]│   │                                      │  │
│  │                      │   │  Fitness Evolution Chart             │  │
│  └──────────────────────┘   │                                      │  │
│                             │  Optimization History                 │  │
│                             │  ┌────────────────────────────────┐  │  │
│                             │  │ Bot Code | Type | Status | ... │  │  │
│                             │  └────────────────────────────────┘  │  │
│                             └──────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.6 Состояния статуса

| Статус | Цвет | Иконка | Описание |
|--------|------|--------|----------|
| `IDLE` | Серый | Clock | Готов к запуску |
| `pending` | Синий | Clock | Ожидание в очереди |
| `running` | Синий | RefreshCw (анимация) | Оптимизация выполняется |
| `completed` | Зелёный | CheckCircle | Успешно завершено |
| `failed` | Красный | XCircle | Ошибка выполнения |
| `cancelled` | Красный | XCircle | Отменено пользователем |

### 2.7 Режимы волатильности (GARCH)

| Режим | Цвет | Описание |
|-------|------|----------|
| `low` | Зелёный | Низкая волатильность |
| `normal` | Синий | Нормальная волатильность |
| `high` | Жёлтый | Высокая волатильность |
| `extreme` | Красный | Экстремальная волатильность |

---

## 3. Генетический алгоритм

### 3.1 Архитектура алгоритма

```
┌─────────────────────────────────────────────────────────────────────┐
│                    GENETIC ALGORITHM ENGINE                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐          │
│  │  Initialize  │───▶│   Evaluate   │───▶│   Select     │          │
│  │  Population  │    │   Fitness    │    │   Parents    │          │
│  └──────────────┘    └──────────────┘    └──────────────┘          │
│                                                 │                    │
│                                                 ▼                    │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐          │
│  │   Terminate  │◀───│    Mutate    │◀───│   Crossover  │          │
│  │   Check      │    │   Genes      │    │   Parents    │          │
│  └──────────────┘    └──────────────┘    └──────────────┘          │
│         │                                                            │
│         ▼                                                            │
│  ┌──────────────┐                                                   │
│  │    Return    │                                                   │
│  │    Best      │                                                   │
│  └──────────────┘                                                   │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.2 Популяция

Популяция — это набор хромосом, каждая из которых представляет собой потенциальное решение (набор параметров).

```typescript
// Пример хромосомы для DCA бота
const dcaChromosome: Chromosome = {
  fitness: 0.0,  // Изначально неизвестно
  genes: [
    { name: 'safetyOrderCount', value: 3, min: 1, max: 10, mutationRate: 0.1 },
    { name: 'safetyOrderScaling', value: 1.5, min: 1.0, max: 3.0, mutationRate: 0.1 },
    { name: 'takeProfitPercent', value: 0.02, min: 0.005, max: 0.1, mutationRate: 0.1 },
    { name: 'deviationThreshold', value: 0.01, min: 0.005, max: 0.05, mutationRate: 0.1 },
  ]
};
```

**Инициализация популяции:**

```typescript
function initializePopulation(template: Gene[], size: number): Chromosome[] {
  const population: Chromosome[] = [];
  
  for (let i = 0; i < size; i++) {
    const genes = template.map(gene => ({
      ...gene,
      value: randomInRange(gene.min, gene.max)
    }));
    population.push({ fitness: 0, genes });
  }
  
  return population;
}
```

### 3.3 Отбор (Selection)

#### Tournament Selection (Турнирный отбор)

```typescript
function tournamentSelection(
  population: Chromosome[],
  tournamentSize: number
): Chromosome {
  // Выбираем tournamentSize случайных особей
  const tournament = [];
  for (let i = 0; i < tournamentSize; i++) {
    const idx = Math.floor(Math.random() * population.length);
    tournament.push(population[idx]);
  }
  
  // Возвращаем лучшего из турнира
  return tournament.reduce((best, curr) => 
    curr.fitness > best.fitness ? curr : best
  );
}
```

**Преимущества:**
- Сохраняет разнообразие популяции
- Простая реализация
- Контроль давления отбора через размер турнира

#### Roulette Wheel Selection (Колесо рулетки)

```typescript
function rouletteSelection(population: Chromosome[]): Chromosome {
  // Вычисляем общую приспособленность
  const totalFitness = population.reduce((sum, c) => sum + c.fitness, 0);
  
  // Нормализованная вероятность выбора
  let random = Math.random() * totalFitness;
  
  for (const chromosome of population) {
    random -= chromosome.fitness;
    if (random <= 0) return chromosome;
  }
  
  return population[population.length - 1];
}
```

#### Rank Selection (Ранговый отбор)

```typescript
function rankSelection(population: Chromosome[]): Chromosome {
  // Сортируем по фитнесу
  const sorted = [...population].sort((a, b) => b.fitness - a.fitness);
  
  // Вероятность пропорциональна рангу
  const totalRank = (population.length * (population.length + 1)) / 2;
  let random = Math.random() * totalRank;
  
  for (let i = 0; i < sorted.length; i++) {
    random -= (sorted.length - i);
    if (random <= 0) return sorted[i];
  }
  
  return sorted[sorted.length - 1];
}
```

#### Сравнение методов отбора

| Метод | Описание | Когда использовать |
|-------|----------|-------------------|
| `tournament` | Лучший из случайной выборки | Универсальный метод |
| `roulette` | Вероятность ~ фитнесу | Большой разброс фитнеса |
| `rank` | Вероятность ~ рангу | Похожие значения фитнеса |
| `elitist` | Сохранение лучших | При сходимости |

### 3.4 Скрещивание (Crossover)

#### Blend Crossover (BLX-α)

```typescript
function blendCrossover(
  parent1: Chromosome,
  parent2: Chromosome,
  alpha: number = 0.5
): [Chromosome, Chromosome] {
  const child1: Gene[] = [];
  const child2: Gene[] = [];
  
  for (let i = 0; i < parent1.genes.length; i++) {
    const g1 = parent1.genes[i];
    const g2 = parent2.genes[i];
    
    // Расширяем интервал на alpha
    const min = Math.min(g1.value, g2.value);
    const max = Math.max(g1.value, g2.value);
    const range = max - min;
    
    const newMin = min - alpha * range;
    const newMax = max + alpha * range;
    
    child1.push({
      ...g1,
      value: clamp(randomInRange(newMin, newMax), g1.min, g1.max)
    });
    child2.push({
      ...g2,
      value: clamp(randomInRange(newMin, newMax), g2.min, g2.max)
    });
  }
  
  return [
    { fitness: 0, genes: child1 },
    { fitness: 0, genes: child2 }
  ];
}
```

#### Single Point Crossover

```typescript
function singlePointCrossover(
  parent1: Chromosome,
  parent2: Chromosome
): [Chromosome, Chromosome] {
  const point = Math.floor(Math.random() * parent1.genes.length);
  
  const child1 = [
    ...parent1.genes.slice(0, point),
    ...parent2.genes.slice(point)
  ];
  
  const child2 = [
    ...parent2.genes.slice(0, point),
    ...parent1.genes.slice(point)
  ];
  
  return [
    { fitness: 0, genes: child1 },
    { fitness: 0, genes: child2 }
  ];
}
```

#### Сравнение методов скрещивания

| Метод | Описание | Лучше для |
|-------|----------|-----------|
| `blend` (BLX-α) | Интерполяция значений | Непрерывные параметры |
| `single_point` | Один разрез | Простые параметры |
| `two_point` | Два разреза | Смешанные параметры |
| `uniform` | Случайный выбор каждого гена | Независимые гены |

### 3.5 Мутация (Mutation)

#### Adaptive Mutation (Адаптивная мутация)

```typescript
function adaptiveMutation(
  chromosome: Chromosome,
  baseRate: number,
  generation: number,
  maxGenerations: number,
  diversity: number
): Chromosome {
  // Увеличиваем мутацию при низкой диверсификации
  const diversityMultiplier = 1 + (1 - diversity) * 2;
  
  // Уменьшаем мутацию к концу эволюции
  const timeMultiplier = 1 - (generation / maxGenerations) * 0.5;
  
  const effectiveRate = baseRate * diversityMultiplier * timeMultiplier;
  
  return {
    ...chromosome,
    genes: chromosome.genes.map(gene => {
      if (Math.random() < effectiveRate) {
        // Мутируем ген
        const range = gene.max - gene.min;
        const mutation = (Math.random() - 0.5) * range * 0.2;
        return {
          ...gene,
          value: clamp(gene.value + mutation, gene.min, gene.max)
        };
      }
      return gene;
    })
  };
}
```

#### Gaussian Mutation

```typescript
function gaussianMutation(
  chromosome: Chromosome,
  rate: number,
  strength: number = 0.2
): Chromosome {
  return {
    ...chromosome,
    genes: chromosome.genes.map(gene => {
      if (Math.random() < rate) {
        const range = gene.max - gene.min;
        const sigma = range * strength;
        const mutation = gaussianRandom(0, sigma);
        return {
          ...gene,
          value: clamp(gene.value + mutation, gene.min, gene.max)
        };
      }
      return gene;
    })
  };
}
```

#### Сравнение методов мутации

| Метод | Описание | Лучше для |
|-------|----------|-----------|
| `adaptive` | Приспосабливается к сходимости | Длительная оптимизация |
| `gaussian` | Нормальное распределение | Непрерывные параметры |
| `random` | Равномерное распределение | Общий случай |

---

## 4. Параметры оптимизации

### 4.1 Основные параметры

| Параметр | По умолчанию | Диапазон | Описание |
|----------|--------------|----------|----------|
| `populationSize` | 50 | 20-200 | Размер популяции |
| `maxGenerations` | 100 | 50-500 | Максимальное число поколений |
| `eliteCount` | 2 | 1-5 | Количество элитных особей |
| `mutationRate` | 0.1 | 0.01-0.5 | Скорость мутации |
| `crossoverRate` | 0.8 | 0.1-1.0 | Скорость скрещивания |
| `earlyStoppingPatience` | 20 | 5-50 | Поколений без улучшения |
| `improvementThreshold` | 0.001 | 0.0001-0.01 | Порог улучшения |

### 4.2 Примеры шаблонов хромосом

#### DCA Bot (Крон)

```typescript
const dcaTemplate: Gene[] = [
  { name: 'safetyOrderCount', value: 3, min: 1, max: 10, mutationRate: 0.1 },
  { name: 'safetyOrderScaling', value: 1.5, min: 1.0, max: 3.0, mutationRate: 0.1 },
  { name: 'takeProfitPercent', value: 0.02, min: 0.005, max: 0.1, mutationRate: 0.1 },
  { name: 'deviationThreshold', value: 0.01, min: 0.005, max: 0.05, mutationRate: 0.1 },
];
```

#### Grid Bot (MESH)

```typescript
const gridTemplate: Gene[] = [
  { name: 'gridLevels', value: 10, min: 5, max: 50, mutationRate: 0.1 },
  { name: 'gridSpacing', value: 0.01, min: 0.002, max: 0.05, mutationRate: 0.1 },
  { name: 'trailingPercent', value: 0.5, min: 0, max: 1, mutationRate: 0.1 },
];
```

#### RSI Strategy

```typescript
const rsiTemplate: Gene[] = [
  { name: 'rsiPeriod', value: 14, min: 5, max: 30, mutationRate: 0.1 },
  { name: 'rsiOversold', value: 30, min: 10, max: 40, mutationRate: 0.1 },
  { name: 'rsiOverbought', value: 70, min: 60, max: 90, mutationRate: 0.1 },
  { name: 'stopLoss', value: 0.02, min: 0.005, max: 0.05, mutationRate: 0.1 },
  { name: 'takeProfit', value: 0.04, min: 0.01, max: 0.1, mutationRate: 0.1 },
];
```

### 4.3 Волатильность-aware оптимизация

При включённой опции `volatilityAware`, GA интегрируется с GARCH моделью:

```typescript
interface GAGarchConfig {
  fitnessMultiplier: number;   // Множитель фитнеса
  explorationBoost: number;    // Усиление исследования
  regimeScore: number;         // Оценка режима
  trend: string;               // Тренд (up/down/sideways)
}
```

**Адаптация параметров по волатильности:**

| Режим волатильности | Fitness Multiplier | Exploration Boost | Действие |
|--------------------|-------------------|-------------------|----------|
| Low | 1.0 | 0.8 | Стандартная оптимизация |
| Normal | 1.0 | 1.0 | Стандартная оптимизация |
| High | 0.9 | 1.3 | Увеличить исследование |
| Extreme | 0.7 | 1.5 | Агрессивное исследование |

---

## 5. Результаты и метрики

### 5.1 Статистика популяции

```typescript
interface PopulationStats {
  generation: number;
  bestFitness: number;      // Лучший фитнес
  avgFitness: number;       // Средний фитнес
  worstFitness: number;     // Худший фитнес
  diversity: number;        // Разнообразие (0-1)
  improvementRate: number;  // Скорость улучшения
  stagnationCount: number;  // Поколений без улучшения
}
```

### 5.2 Метрики фитнес-функции

Фитнес-функция может включать несколько метрик:

```typescript
// Одиночная цель
async function singleObjectiveFitness(chromosome: Chromosome): Promise<number> {
  const result = await backtest(chromosome);
  return result.sharpeRatio;
}

// Многоцелевая (взвешенная комбинация)
async function multiObjectiveFitness(chromosome: Chromosome): Promise<number> {
  const result = await backtest(chromosome);
  
  const weights = {
    sharpe: 0.4,
    winRate: 0.3,
    maxDrawdown: 0.3
  };
  
  return (
    weights.sharpe * result.sharpeRatio +
    weights.winRate * result.winRate +
    weights.maxDrawdown * (1 - result.maxDrawdown)
  );
}
```

### 5.3 График эволюции фитнеса

Компонент отображает график эволюции:

```typescript
const chartData = currentJob?.history?.map((h) => ({
  generation: h.generation,
  bestFitness: h.bestFitness,
  avgFitness: h.avgFitness,
  diversity: h.diversity,
})) || [];

// Area Chart с Recharts
<AreaChart data={chartData}>
  <Area 
    type="monotone" 
    dataKey="bestFitness" 
    stroke="hsl(var(--chart-1))" 
    fill="hsl(var(--chart-1))" 
    fillOpacity={0.2} 
  />
  <Area 
    type="monotone" 
    dataKey="avgFitness" 
    stroke="hsl(var(--chart-2))" 
    fill="hsl(var(--chart-2))" 
    fillOpacity={0.1} 
  />
</AreaChart>
```

### 5.4 Пример результатов

```json
{
  "jobId": "ga_abc123",
  "botCode": "DCA-BTC-001",
  "botType": "DCA",
  "status": "completed",
  "generation": 85,
  "progress": 100,
  "bestChromosome": {
    "fitness": 1.8734,
    "genes": [
      { "name": "safetyOrderCount", "value": 4.0, "min": 1, "max": 10 },
      { "name": "safetyOrderScaling", "value": 1.85, "min": 1.0, "max": 3.0 },
      { "name": "takeProfitPercent", "value": 0.023, "min": 0.005, "max": 0.1 },
      { "name": "deviationThreshold", "value": 0.012, "min": 0.005, "max": 0.05 }
    ]
  },
  "durationMs": 125000,
  "volatilityRegime": "normal"
}
```

---

## 6. API эндпоинты

### 6.1 Запуск оптимизации

**POST** `/api/ga/optimize`

```typescript
// Request
{
  botCode: string;           // Код бота (обязательно)
  botType: string;           // Тип бота (обязательно)
  symbol: string;            // Торговая пара (обязательно)
  volatilityAware: boolean;  // Использовать GARCH
  config: {
    populationSize: number;
    maxGenerations: number;
    eliteCount: number;
    mutationRate: number;
    crossoverRate: number;
    selectionMethod: SelectionMethod;
    crossoverMethod: CrossoverMethod;
    mutationMethod: MutationMethod;
    tournamentSize: number;
    earlyStoppingPatience: number;
  }
}

// Response (success)
{
  success: true;
  jobId: string;
  status: "running";
  volatilityRegime: "normal" | "low" | "high" | "extreme";
  gaGarchConfig: {
    fitnessMultiplier: number;
    explorationBoost: number;
    regimeScore: number;
    trend: string;
  }
}
```

### 6.2 Получение прогресса

**GET** `/api/ga/progress?jobId={jobId}`

```typescript
// Response
{
  id: string;
  botCode: string;
  botType: string;
  symbol: string;
  status: "running" | "completed" | "failed" | "cancelled";
  generation: number;
  progress: number;
  bestChromosome: Chromosome | null;
  history: PopulationStats[];
  startedAt: number;
  completedAt: number | null;
  durationMs: number;
  error: string | null;
  volatilityRegime: string | null;
  gaGarchConfig: object | null;
}
```

### 6.3 Получение списка задач

**GET** `/api/ga/optimize`

```typescript
// Response
{
  jobs: OptimizationJob[];
}
```

### 6.4 Применение параметров к боту

**POST** `/api/ga/apply`

```typescript
// Request (по Job ID)
{
  jobId: string;
}

// Request (по Bot Code - применить последние оптимизированные)
// GET /api/ga/apply?botCode={botCode}

// Response
{
  success: boolean;
  botCode: string;
  appliedParams: Record<string, number>;
  fitness: number;
  message: string;
}
```

### 6.5 Polling для обновления прогресса

Компонент автоматически опрашивает API каждую секунду при активной оптимизации:

```typescript
useEffect(() => {
  if (!currentJob || currentJob.status !== "running") return;

  const interval = setInterval(async () => {
    const response = await fetch(`/api/ga/progress?jobId=${currentJob.id}`);
    if (response.ok) {
      const data = await response.json();
      setCurrentJob(data);

      if (data.status === "completed" || data.status === "failed") {
        await loadJobs();
      }
    }
  }, 1000);

  return () => clearInterval(interval);
}, [currentJob]);
```

---

## 7. Примеры использования

### 7.1 Базовая оптимизация DCA бота

```typescript
import { GeneticOptimizerPanel } from '@/components/self-learning/genetic-optimizer-panel';

// В JSX
<GeneticOptimizerPanel />
```

### 7.2 Программный запуск оптимизации

```typescript
import { GeneticConfig } from '@/lib/self-learning/types';

const config: GeneticConfig = {
  populationSize: 50,
  maxGenerations: 100,
  eliteCount: 2,
  selectionMethod: "tournament",
  tournamentSize: 3,
  crossoverMethod: "blend",
  crossoverRate: 0.8,
  mutationMethod: "adaptive",
  mutationRate: 0.1,
  adaptiveMutationIncrease: 1.5,
  earlyStoppingPatience: 20,
  improvementThreshold: 0.001,
  parallelEvaluation: false,
};

const response = await fetch('/api/ga/optimize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    botCode: 'DCA-BTC-001',
    botType: 'DCA',
    symbol: 'BTCUSDT',
    volatilityAware: true,
    config
  })
});

const { jobId, status } = await response.json();
```

### 7.3 Применение оптимизированных параметров

```typescript
// Применить по Job ID
const applyResponse = await fetch('/api/ga/apply', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ jobId: 'ga_abc123' })
});

// Применить последние для бота
const applyResponse = await fetch('/api/ga/apply?botCode=DCA-BTC-001', {
  method: 'POST'
});

const result = await applyResponse.json();
if (result.success) {
  console.log('Applied params:', result.appliedParams);
  console.log('Fitness:', result.fitness);
}
```

### 7.4 Экспорт результатов

```typescript
const exportResults = () => {
  if (!currentJob) return;

  const json = JSON.stringify(currentJob, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ga-optimization-${currentJob.botCode}-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
```

### 7.5 Копирование лучших генов

```typescript
const copyBestGenes = () => {
  if (!currentJob?.bestChromosome) return;

  const genes = currentJob.bestChromosome.genes.reduce(
    (obj, gene) => ({ ...obj, [gene.name]: gene.value }),
    {} as Record<string, number>
  );

  navigator.clipboard.writeText(JSON.stringify(genes, null, 2));
  // Toast: "Best genes copied to clipboard"
};
```

### 7.6 Интеграция с LOGOS Self-Learning

```typescript
import { recordTrade, adjustConfidence } from '@/lib/logos-bot/self-learning';

// Запись сделки для обучения
await recordTrade({
  id: 'trade_123',
  source: 'bot',
  botCode: 'DCA-BTC-001',
  symbol: 'BTCUSDT',
  exchange: 'binance',
  direction: 'LONG',
  entryPrice: 50000,
  exitPrice: 51000,
  size: 0.1,
  pnl: 100,
  pnlPercent: 2,
  duration: 3600000,
  timestamp: Date.now(),
  success: true,
  marketConditions: {
    volatility: 0.02,
    trend: 'up',
    volume: 1000000
  }
});

// Корректировка уверенности сигнала
const adjusted = await adjustConfidence(
  0.75,  // базовая уверенность
  'DCA', // код бота
  'BTCUSDT', // символ
  { volatility: 0.02, trend: 'up' } // рыночные условия
);
```

---

## 8. Лучшие практики

### 8.1 Рекомендации по настройке

| Параметр | Рекомендация |
|----------|--------------|
| `populationSize` | 50-100 для большинства задач |
| `mutationRate` | 0.01-0.1; ниже для сходимости |
| `eliteCount` | 1-5% от размера популяции |
| `earlyStoppingPatience` | 20% от maxGenerations |

### 8.2 Предупреждения

> **Важно:** Бот должен существовать в системе перед оптимизацией. Сначала создайте бота в соответствующем разделе (DCA Bot → Крон, BB Bot, Grid Bot, ORION Bot, MFT Bot), затем оптимизируйте параметры.

### 8.3 Минимальные данные для LOGOS

- Минимум 10 сделок для надёжных инсайтов
- Еженедельный просмотр learning insights
- Фокус на основных торговых парах

---

## 9. Связанная документация

- [LOGOS Self-Learning](../bots/LOGOS_SELF_LEARNING.md) — система обучения LOGOS
- [Genetic Algorithm Framework](../ml/GENETIC_ALGORITHM.md) — фреймворк GA
- [GARCH Volatility Analysis](../analytics/GARCH_VOLATILITY_ANALYSIS.md) — анализ волатильности
- [Risk Management UI](./RISK_MANAGEMENT_UI.md) — UI риск-менеджмента

---

*Документ создан: Март 2026*
*Последнее обновление: Март 2026*
