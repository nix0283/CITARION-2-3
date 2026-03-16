# Strategy Engine - Complete Documentation

Полная документация по движку торговых стратегий CITARION.

## Содержание

1. [Обзор](#1-обзор)
2. [Архитектура](#2-архитектура)
3. [Built-in Strategies](#3-built-in-strategies)
4. [Zenbot Strategies](#4-zenbot-strategies)
5. [Neural Strategy](#5-neural-strategy)
6. [Self-Learning Strategy](#6-self-learning-strategy)
7. [Alpha Factors](#7-alpha-factors)
8. [Tactics System](#8-tactics-system)
9. [Backtesting Engine](#9-backtesting-engine)
10. [Strategy Manager](#10-strategy-manager)
11. [Plugin System](#11-plugin-system)
12. [API Reference](#12-api-reference)
13. [Примеры использования](#13-примеры-использования)

---

## 1. Обзор

Strategy Engine - это модульная система для создания, тестирования и исполнения торговых стратегий. Ключевые принципы:

- **Разделение ответственности**: Стратегия определяет КОГДА входить, Тактики определяют КАК
- **Plugin Architecture**: Расширяемая система плагинов для модификации сигналов
- **Backtesting**: Продвинутый движок бэктестинга с Walk-Forward и Monte Carlo
- **Self-Learning**: Автоматическое улучшение параметров стратегий

### Основные компоненты

```
┌─────────────────────────────────────────────────────────────────┐
│                      Strategy Engine                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Strategy   │  │   Tactics    │  │   Backtesting        │  │
│  │   Manager    │  │   Executor   │  │   Engine             │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
│         │                 │                      │               │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────────▼───────────┐  │
│  │   Built-in   │  │   Entry/Exit │  │   Walk-Forward       │  │
│  │   Strategies │  │   Tactics    │  │   Monte Carlo        │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Plugin     │  │   Alpha      │  │   Self-Learning      │  │
│  │   System     │  │   Factors    │  │   Module             │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Типы стратегий

| Тип | Описание | Количество |
|-----|----------|------------|
| Built-in | Оригинальные стратегии CITARION | 4 |
| Zenbot | Портированные из Zenbot | 19 |
| Neural | AI-powered стратегия | 1 |
| Self-Learning | Автообучаемая стратегия | - |

---

## 2. Архитектура

### Core Types

```typescript
// Свеча (OHLCV)
interface Candle {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Таймфреймы
type Timeframe = 
  | "1m" | "3m" | "5m" | "15m" | "30m" | "45m"
  | "1h" | "2h" | "3h" | "4h" | "6h" | "8h" | "12h"
  | "1d" | "3d" | "1w" | "1M";

// Тип сигнала
type SignalType = "LONG" | "SHORT" | "EXIT_LONG" | "EXIT_SHORT" | "NO_SIGNAL";

// Сигнал стратегии
interface StrategySignal {
  type: SignalType;
  confidence: number;           // 0-100
  symbol: string;
  timeframe: Timeframe;
  timestamp: Date;
  price: number;
  suggestedEntryPrices?: number[];
  suggestedTakeProfits?: { price: number; percent: number }[];
  suggestedStopLoss?: number;
  reason: string;
  metadata?: Record<string, unknown>;
  tacticsSet?: TacticsSet;
}
```

### Strategy Interface

```typescript
interface IStrategy {
  // Meta
  getConfig(): StrategyConfig;
  
  // Lifecycle
  initialize(parameters?: Record<string, number | boolean | string>): void;
  
  // Analysis
  populateIndicators(candles: Candle[]): IndicatorResult;
  populateEntrySignal(candles: Candle[], indicators: IndicatorResult, currentPrice: number): StrategySignal | null;
  populateExitSignal(candles: Candle[], indicators: IndicatorResult, position: Position): StrategySignal | null;
  
  // State
  getState(): StrategyState;
  setParameters(params: Record<string, number | boolean | string>): void;
  reset(): void;
}
```

### BaseStrategy Class

Абстрактный базовый класс для всех стратегий:

```typescript
abstract class BaseStrategy implements IStrategy {
  protected config: StrategyConfig;
  protected state: StrategyState;
  protected parameters: Record<string, number | boolean | string>;

  constructor(config: StrategyConfig) {
    this.config = config;
    this.parameters = {};
    this.state = { strategyId: config.id, parameters: {} };
    this.initialize();
  }

  // Абстрактные методы - должны быть реализованы в наследниках
  abstract populateIndicators(candles: Candle[]): IndicatorResult;
  abstract populateEntrySignal(...): StrategySignal | null;
  abstract populateExitSignal(...): StrategySignal | null;
}
```

---

## 3. Built-in Strategies

### 3.1 RSI Reversal Strategy

**ID:** `rsi-reversal`

Торговля по уровням перекупленности/перепроданности RSI с подтверждением EMA.

**Параметры:**

| Параметр | Тип | По умолчанию | Диапазон | Описание |
|----------|-----|--------------|----------|----------|
| rsiPeriod | integer | 14 | 7-30 | Период RSI |
| rsiOverbought | number | 70 | 60-85 | Уровень перекупленности |
| rsiOversold | number | 30 | 15-40 | Уровень перепроданности |
| emaPeriod | integer | 200 | 50-300 | Период EMA для тренда |
| useTrendFilter | boolean | true | - | Фильтровать по тренду EMA |
| rsiExitLevel | number | 50 | 40-60 | Уровень RSI для выхода |

**Алгоритм:**

```typescript
// LONG: RSI выходит из перепроданности
if (rsiPrev <= oversold && rsi > oversold) {
  if (!useTrendFilter || currentPrice > ema) {
    signal = LONG;
  }
}

// SHORT: RSI выходит из перекупленности
if (rsiPrev >= overbought && rsi < overbought) {
  if (!useTrendFilter || currentPrice < ema) {
    signal = SHORT;
  }
}
```

**Таймфреймы:** 5m, 15m, 1h, 4h
**Теги:** momentum, reversal, beginner

---

### 3.2 MACD Crossover Strategy

**ID:** `macd-crossover`

Торговля по пересечению MACD и сигнальной линии.

**Параметры:**

| Параметр | Тип | По умолчанию | Диапазон | Описание |
|----------|-----|--------------|----------|----------|
| fastPeriod | integer | 12 | 5-20 | Быстрый период EMA |
| slowPeriod | integer | 26 | 15-40 | Медленный период EMA |
| signalPeriod | integer | 9 | 5-15 | Период сигнальной линии |
| useHistogramConfirmation | boolean | true | - | Подтверждение гистограммой |
| minHistogramStrength | number | 0.0001 | 0-0.01 | Минимальная сила гистограммы |

**Алгоритм:**

```typescript
// Bullish crossover
if (macdPrev <= signalPrev && macd > signal) {
  if (!useHistogram || histogram >= minHist) {
    signal = LONG;
    reason = "Bullish MACD crossover";
  }
}

// Bearish crossover
if (macdPrev >= signalPrev && macd < signal) {
  if (!useHistogram || histogram <= -minHist) {
    signal = SHORT;
    reason = "Bearish MACD crossover";
  }
}
```

**Таймфреймы:** 15m, 1h, 4h
**Теги:** trend, momentum, intermediate

---

### 3.3 Bollinger Bands Strategy

**ID:** `bollinger-bands`

Торговля на откате от границ Bollinger Bands к средней линии.

**Параметры:**

| Параметр | Тип | По умолчанию | Диапазон | Описание |
|----------|-----|--------------|----------|----------|
| bbPeriod | integer | 20 | 10-30 | Период Bollinger Bands |
| bbStdDev | number | 2 | 1-3 | Стандартное отклонение |
| requireSqueeze | boolean | false | - | Требовать сужение полос |
| squeezeThreshold | number | 2 | 0.5-5 | Порог сужения в % от цены |

**Алгоритм:**

```typescript
// LONG: Price touches lower band
if (currentPrice <= lower) {
  signal = LONG;
  reason = `Price at lower BB`;
  takeProfits = [
    { price: middle, percent: 50 },
    { price: upper, percent: 50 }
  ];
}

// SHORT: Price touches upper band
if (currentPrice >= upper) {
  signal = SHORT;
  reason = `Price at upper BB`;
  takeProfits = [
    { price: middle, percent: 50 },
    { price: lower, percent: 50 }
  ];
}
```

**Таймфреймы:** 5m, 15m, 1h
**Теги:** mean-reversion, volatility, intermediate

---

### 3.4 EMA Crossover Strategy

**ID:** `ema-crossover`

Торговля по пересечению быстрой и медленной EMA.

**Параметры:**

| Параметр | Тип | По умолчанию | Диапазон | Описание |
|----------|-----|--------------|----------|----------|
| fastPeriod | integer | 9 | 5-20 | Быстрая EMA |
| slowPeriod | integer | 21 | 15-50 | Медленная EMA |
| trendPeriod | integer | 200 | 100-300 | EMA для глобального тренда |
| useTrendFilter | boolean | true | - | Фильтровать по глобальному тренду |

**Алгоритм:**

```typescript
// Bullish crossover
if (fastPrev <= slowPrev && fast > slow) {
  if (!useTrendFilter || currentPrice > trend) {
    signal = LONG;
    reason = "Fast EMA crossed above slow EMA";
  }
}

// Bearish crossover
if (fastPrev >= slowPrev && fast < slow) {
  if (!useTrendFilter || currentPrice < trend) {
    signal = SHORT;
    reason = "Fast EMA crossed below slow EMA";
  }
}
```

**Таймфреймы:** 15m, 1h, 4h, 1d
**Теги:** trend, beginner

---

## 4. Zenbot Strategies

Портированные стратегии из [Zenbot](https://github.com/DeviaVir/zenbot).

### 4.1 Zenbot Bollinger Bands

**ID:** `zenbot-bollinger`

Buy when price touches lower band, sell when touches upper band.

**Параметры:**

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| period | 20 | Период BB |
| stdDev | 2 | Стандартное отклонение |
| upperBoundPct | 0 | Upper bound padding % |
| lowerBoundPct | 0 | Lower bound padding % |

---

### 4.2 Zenbot VWAP Crossover

**ID:** `zenbot-vwap-crossover`

Trade based on VWAP vs EMA crossover.

**Параметры:**

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| emaLength | 30 | EMA период |
| smaLength1 | 108 | SMA период 1 |
| smaLength2 | 60 | SMA период 2 |
| vwapLength | 10 | VWAP период |

---

### 4.3 Zenbot DEMA Crossover

**ID:** `zenbot-dema`

Trade on short/long EMA crossover with RSI filter.

**Параметры:**

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| emaShort | 10 | Короткая EMA |
| emaLong | 21 | Длинная EMA |
| upTrendThreshold | 0 | Порог восходящего тренда |
| downTrendThreshold | 0 | Порог нисходящего тренда |
| overboughtRSI | 80 | Уровень перекупленности RSI |
| noiseLevelPct | 0 | Уровень шума % |

---

### 4.4 Zenbot Parabolic SAR

**ID:** `zenbot-sar`

Trade on Parabolic SAR reversals.

**Параметры:**

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| af | 0.015 | Acceleration Factor |
| maxAF | 0.3 | Max Acceleration Factor |

**Таймфреймы:** 1m, 5m, 15m

---

### 4.5 Zenbot Momentum

**ID:** `zenbot-momentum`

Trade based on price momentum.

**Параметры:**

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| momentumPeriod | 5 | Период momentum |
| threshold | 0 | Порог для сигнала |

---

### 4.6 Zenbot Stochastic MACD

**ID:** `zenbot-srsi-macd`

Combined Stochastic RSI with MACD for signal generation.

**Параметры:**

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| rsiPeriod | 14 | RSI период |
| srsiPeriod | 9 | Stochastic RSI период |
| srsiK | 5 | %K период |
| srsiD | 3 | %D период |
| oversoldRSI | 20 | Уровень перепроданности |
| overboughtRSI | 80 | Уровень перекупленности |
| emaShort | 24 | Короткая EMA для MACD |
| emaLong | 200 | Длинная EMA для MACD |

---

### 4.7 Zenbot Wave Trend

**ID:** `zenbot-wavetrend`

Trade using Wave Trend oscillator.

**Параметры:**

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| channelLength | 10 | Channel период |
| avgLength | 21 | Average период |
| overbought1 | 60 | Верхний уровень 1 |
| overbought2 | 53 | Верхний уровень 2 |
| oversold1 | -60 | Нижний уровень 1 |
| oversold2 | -53 | Нижний уровень 2 |

---

### 4.8 Zenbot CCI SRSI

**ID:** `zenbot-cci-srsi`

Combined CCI with Stochastic RSI for mean reversion.

**Параметры:**

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| cciPeriod | 14 | CCI период |
| rsiPeriod | 14 | RSI период |
| srsiPeriod | 9 | Stochastic RSI период |
| oversoldCCI | -90 | CCI перепроданность |
| overboughtCCI | 140 | CCI перекупленность |
| oversoldRSI | 18 | RSI перепроданность |
| overboughtRSI | 85 | RSI перекупленность |

---

### 4.9 Zenbot Trend EMA (Default)

**ID:** `zenbot-trend-ema`

Default Zenbot strategy - Buy when EMA trend is up, sell when down.

**Параметры:**

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| trendEmaPeriod | 26 | EMA период |
| neutralRate | 0 | Neutral rate threshold |
| oversoldRsiPeriods | 14 | RSI период |
| oversoldRsi | 10 | RSI уровень для покупки |

---

### 4.10 Zenbot RSI High-Water

**ID:** `zenbot-rsi-highwater`

Attempts to buy low and sell high by tracking RSI high-water readings.

**Параметры:**

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| rsiPeriods | 14 | RSI период |
| oversoldRsi | 30 | Уровень перепроданности |
| overboughtRsi | 82 | Уровень перекупленности |
| rsiRecover | 3 | RSI recovery points |
| rsiDrop | 0 | RSI drop points |
| rsiDivisor | 2 | High-water divisor |

---

### Дополнительные Zenbot стратегии

| ID | Название | Тип |
|----|----------|-----|
| zenbot-trix | TRIX Oscillator | oscillator |
| zenbot-ultosc | Ultimate Oscillator | oscillator |
| zenbot-hma | Hull Moving Average | trend |
| zenbot-ppo | Percentage Price Oscillator | trend |
| zenbot-trust | Trust/Distrust Reversal | reversal |
| zenbot-tsi | True Strength Index | momentum |
| zenbot-speed | Speed (Experimental) | volatility |
| zenbot-stddev | Standard Deviation | statistical |
| zenbot-trendline | Trendline | trend |

---

## 5. Neural Strategy

**ID:** `zenbot-neural`

AI-powered price prediction using z-ai-sdk.

### Особенности

- **Feature Engineering**: Нормализация и подготовка данных
- **Prediction Model**: Использование LLM для прогноза
- **Signal Generation**: Конвертация прогноза в торговый сигнал
- **Caching**: Кэширование предсказаний на 5 минут

### Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| lookbackPeriod | 20 | Период lookback для features |
| minConfidence | 60 | Минимальная уверенность AI |
| useAI | true | Использовать AI или fallback |
| predictionThreshold | 0.5 | Порог предсказания |
| rsiOversold | 30 | RSI фильтр для LONG |
| rsiOverbought | 70 | RSI фильтр для SHORT |

### Neural Features

```typescript
interface NeuralFeatures {
  // Price features
  closeNorm: number[];      // Normalized close prices
  returnsNorm: number[];    // Normalized returns
  volatilityNorm: number[]; // Normalized volatility
  
  // Trend features
  emaTrend: number[];       // EMA trend direction
  smaTrend: number[];       // SMA trend direction
  
  // Momentum features
  rsiNorm: number[];        // Normalized RSI
  momentumNorm: number[];   // Normalized momentum
  
  // Volume features
  volumeNorm: number[];     // Normalized volume
  volumeChangeNorm: number[]; // Normalized volume change
}
```

### AI Prediction

```typescript
interface NeuralPrediction {
  direction: "up" | "down" | "neutral";
  confidence: number;
  predictedPrice?: number;
  priceChangePercent?: number;
  reasoning?: string;
}

// AI запрос
const context = createAIContext(candles, features);
const prediction = await getAIPrediction(context);
```

### Fallback (Statistical Prediction)

```typescript
function getStatisticalPrediction(candles, features): NeuralPrediction {
  // Composite score calculation
  let score = 0;
  
  // Trend contribution
  score += trendSlope > 0 ? 0.3 : -0.3;
  
  // RSI contribution
  if (rsi < 30) score += 0.3;
  else if (rsi > 70) score -= 0.3;
  
  // Momentum contribution
  score += momentum * 0.2;
  
  // Determine direction
  let direction = "neutral";
  if (score > 0.3) direction = "up";
  else if (score < -0.3) direction = "down";
  
  return { direction, confidence, ... };
}
```

---

## 6. Self-Learning Strategy

Автоматическое улучшение стратегий с интеграцией z-ai-sdk.

### SelfLearner Class

```typescript
class SelfLearner {
  constructor(config: Partial<SelfLearnerConfig>) {}
  
  // Основные методы
  async learn(strategy: IStrategy, candles: Candle[], trades: Trade[]): Promise<LearningResult | null>;
  async analyzeWithAI(strategy: IStrategy, candles: Candle[], signals: StrategySignal[]): Promise<AIAnalysis>;
  
  // Получение результатов
  getHistory(strategyId: string): LearningHistory;
  getBestParams(strategyId: string): Record<string, number>;
}
```

### Конфигурация

```typescript
interface SelfLearnerConfig {
  learningInterval: number;      // Интервал обучения (ms)
  minTradesForLearning: number;  // Мин. сделок для обучения
  improvementThreshold: number;  // Порог улучшения (%)
  maxParamChange: number;        // Макс. изменение параметра (%)
  useAI: boolean;                // Использовать AI анализ
  keepHistory: boolean;          // Сохранять историю
  maxHistorySize: number;        // Макс. размер истории
}
```

### Learning Result

```typescript
interface LearningResult {
  strategyId: string;
  timestamp: Date;
  improvement: number;       // % улучшения
  oldParams: Record<string, number>;
  newParams: Record<string, number>;
  backtestMetrics: {
    winRate: number;
    profitFactor: number;
    sharpeRatio: number;
    maxDrawdown: number;
    totalTrades: number;
  };
  confidence: number;
  reason: string;
}
```

### Order Analyzer

Анализатор ордеров для предотвращения убыточных сделок:

```typescript
class OrderAnalyzer {
  async analyze(
    symbol: string,
    direction: "buy" | "sell",
    price: number,
    size: number,
    candles: Candle[]
  ): Promise<OrderAnalysisResult>;
}

interface OrderAnalysisResult {
  shouldProceed: boolean;
  riskScore: number;          // 0-100
  confidence: number;
  warnings: string[];
  suggestions: string[];
  factors: {
    marketCondition: "trending" | "ranging" | "volatile" | "unknown";
    liquidityScore: number;
    spreadScore: number;
    volumeScore: number;
    momentumScore: number;
  };
}
```

---

## 7. Alpha Factors

Количественные меры для предсказания движения цен. Портировано из [Abu](https://github.com/bbfamily/abu).

### Категории факторов

| Категория | Факторы | Описание |
|-----------|---------|----------|
| Trend | price_vs_ema, ema_crossover, macd_signal | Следование за трендом |
| Mean Reversion | rsi_mean_reversion, bollinger_position, price_vs_vwap | Возврат к среднему |
| Momentum | roc, momentum_score | Импульс |
| Volatility | atr_ratio, volatility_trend | Волатильность |
| Volume | volume_trend, obv_trend | Объём |

### AlphaFactorResult

```typescript
interface AlphaFactorResult {
  name: string;
  category: string;
  value: number;          // -1 to 1
  confidence: number;     // 0 to 1
  signal: "buy" | "sell" | "neutral";
  metadata?: Record<string, unknown>;
}
```

### AlphaFactorsEngine

```typescript
class AlphaFactorsEngine {
  constructor(config?: Partial<AlphaFactorsConfig>) {}
  
  // Расчёт факторов
  calculateFactors(candles: Candle[]): AlphaFactorResult[];
  
  // Комбинация сигналов
  combineSignals(factors: AlphaFactorResult[]): CombinedAlphaSignal;
  
  // Полный расчёт
  getSignal(candles: Candle[]): CombinedAlphaSignal;
  
  // Регистрация кастомного фактора
  registerFactor(name: string, calculator: (candles: Candle[]) => AlphaFactorResult): void;
}
```

### Combined Signal

```typescript
interface CombinedAlphaSignal {
  overallValue: number;
  overallSignal: "buy" | "sell" | "neutral";
  confidence: number;
  factors: AlphaFactorResult[];
  weights: Record<string, number>;
  timestamp: Date;
}
```

### Примеры факторов

#### Alpha 1: Price vs EMA

```typescript
function alphaPriceVsEMA(candles: Candle[], period: number = 20): AlphaFactorResult {
  const closes = candles.map(c => c.close);
  const ema = EMA(closes, period);
  
  const price = closes[lastIndex];
  const emaValue = ema[lastIndex];
  
  const distance = (price - emaValue) / emaValue;
  const value = sigmoidNormalize(distance, 0, 0.05);
  
  return {
    name: "price_vs_ema",
    category: "trend",
    value,
    confidence: Math.min(1, Math.abs(distance) * 10),
    signal: value > 0.2 ? "buy" : value < -0.2 ? "sell" : "neutral",
    metadata: { price, ema: emaValue, distance: distance * 100 },
  };
}
```

#### Alpha 4: RSI Mean Reversion

```typescript
function alphaRSIMeanReversion(candles: Candle[], period: number = 14): AlphaFactorResult {
  const rsi = RSI(closes, period)[lastIndex];
  
  // Mean reversion: покупать на перепроданности
  const value = sigmoidNormalize(50 - rsi, 0, 30);
  
  return {
    name: "rsi_mean_reversion",
    category: "mean_reversion",
    value,
    confidence: Math.abs(rsi - 50) / 50,
    signal: rsi < 30 ? "buy" : rsi > 70 ? "sell" : "neutral",
    metadata: { rsi },
  };
}
```

---

## 8. Tactics System

Тактики определяют **КАК** входить в позицию и управлять ею.

### Entry Tactics

```typescript
type EntryType = 
  | "MARKET"           // Рыночный ордер
  | "LIMIT"            // Лимитный ордер
  | "LIMIT_ZONE"       // Лимит в зоне
  | "BREAKOUT"         // Пробой уровня
  | "PULLBACK"         // Откат
  | "DCA";             // Dollar Cost Averaging

interface EntryTactic {
  id: string;
  name: string;
  type: EntryType;
  
  // LIMIT / LIMIT_ZONE
  entryPrices?: number[];
  entryZone?: { min: number; max: number };
  entryTimeout?: number;
  onTimeout?: "CANCEL" | "MARKET";
  
  // BREAKOUT
  breakoutLevel?: number;
  breakoutDirection?: "ABOVE" | "BELOW";
  breakoutConfirmation?: number;
  
  // PULLBACK
  pullbackLevel?: number;
  pullbackPercent?: number;
  
  // DCA
  dcaCount?: number;
  dcaStep?: number;
  dcaSizeMultiplier?: number;
  dcaMaxDeviation?: number;
  
  // Position sizing
  positionSize: "PERCENT" | "FIXED" | "RISK_BASED";
  positionSizeValue: number;
}
```

### Exit Tactics

```typescript
type ExitType =
  | "FIXED_TP"         // Фиксированный TP
  | "MULTI_TP"         // Множественные TP
  | "TRAILING_STOP"    // Скользящий SL
  | "BREAKEVEN"        // Выход в безубыток
  | "TIME_BASED"       // Выход по времени
  | "SIGNAL_BASED";    // Выход по сигналу

interface TakeProfitTactic {
  id: string;
  name: string;
  type: ExitType;
  
  // FIXED_TP
  tpPrice?: number;
  tpPercent?: number;
  
  // MULTI_TP
  targets?: TPTarget[];
  
  // TRAILING_STOP
  trailingConfig?: TrailingStopConfig;
  
  // BREAKEVEN
  breakevenTrigger?: number;
  
  // TIME_BASED
  maxHoldingTime?: number;
  onTimeExpired?: "CLOSE_ALL" | "TRAILING";
}

interface TPTarget {
  index: number;
  price?: number;
  profitPercent?: number;
  closePercent: number;
  filled?: boolean;
  filledAt?: Date;
}
```

### Stop Loss Tactics

```typescript
interface StopLossTactic {
  id: string;
  name: string;
  type: "FIXED" | "PERCENT" | "ATR_BASED" | "SUPPORT_BASED";
  
  slPrice?: number;
  slPercent?: number;
  atrMultiplier?: number;
  atrPeriod?: number;
  
  useSupportLevel?: boolean;
  levelOffset?: number;
  
  moveToBreakevenAfter?: number;
  reduceOnTP?: number;
}
```

### Trailing Stop Configuration

```typescript
interface TrailingStopConfig {
  type: "PERCENT" | "FIXED" | "ATR_BASED" | "PRICE";
  
  percentValue?: number;
  fixedValue?: number;
  atrMultiplier?: number;
  atrPeriod?: number;
  priceValue?: number;
  
  // Activation
  activationProfit?: number;
  activationPrice?: number;
  activationAfterTP?: number;
  
  // State
  activated?: boolean;
  highestPrice?: number;
  lowestPrice?: number;
  currentStopPrice?: number;
}
```

### Predefined Tactics Sets

```typescript
const PREDEFINED_TACTICS_SETS: TacticsSet[] = [
  // 1. Conservative - Fixed TP/SL
  {
    id: "conservative-1",
    name: "Conservative - Fixed TP/SL",
    entry: { type: "LIMIT", positionSize: "PERCENT", positionSizeValue: 2, entryTimeout: 60, onTimeout: "CANCEL" },
    takeProfit: { type: "FIXED_TP", tpPercent: 3 },
    stopLoss: { type: "PERCENT", slPercent: 1.5, moveToBreakevenAfter: 2 },
    tags: ["conservative", "beginner"],
  },
  
  // 2. Aggressive - Multi TP + Trailing
  {
    id: "aggressive-1",
    name: "Aggressive - Multi TP with Trailing",
    entry: { type: "MARKET", positionSize: "PERCENT", positionSizeValue: 5 },
    takeProfit: {
      type: "MULTI_TP",
      targets: [
        { index: 1, profitPercent: 2, closePercent: 25 },
        { index: 2, profitPercent: 4, closePercent: 25 },
        { index: 3, profitPercent: 6, closePercent: 25 },
        { index: 4, profitPercent: 10, closePercent: 25 },
      ],
      trailingConfig: { type: "PERCENT", percentValue: 1.5, activationProfit: 3 },
    },
    stopLoss: { type: "ATR_BASED", atrMultiplier: 2, atrPeriod: 14, moveToBreakevenAfter: 3 },
    tags: ["aggressive", "experienced"],
  },
  
  // 3. Scalping
  {
    id: "scalping-1",
    name: "Scalping - Quick In/Out",
    entry: { type: "MARKET", positionSize: "FIXED", positionSizeValue: 100 },
    takeProfit: { type: "FIXED_TP", tpPercent: 0.5 },
    stopLoss: { type: "PERCENT", slPercent: 0.3 },
    tags: ["scalping", "quick"],
  },
  
  // 4. Swing
  {
    id: "swing-1",
    name: "Swing - Position Trading",
    entry: { type: "LIMIT_ZONE", positionSize: "PERCENT", positionSizeValue: 3, entryTimeout: 1440 },
    takeProfit: {
      type: "MULTI_TP",
      targets: [
        { index: 1, profitPercent: 5, closePercent: 33 },
        { index: 2, profitPercent: 10, closePercent: 33 },
        { index: 3, profitPercent: 15, closePercent: 34 },
      ],
      trailingConfig: { type: "PERCENT", percentValue: 3, activationAfterTP: 1 },
    },
    stopLoss: { type: "SUPPORT_BASED", useSupportLevel: true, levelOffset: 0.5, moveToBreakevenAfter: 5 },
    tags: ["swing", "position"],
  },
  
  // 5. DCA
  {
    id: "dca-1",
    name: "DCA - Dollar Cost Averaging",
    entry: { type: "DCA", positionSize: "PERCENT", positionSizeValue: 1, dcaCount: 5, dcaStep: 2, dcaSizeMultiplier: 1.5, dcaMaxDeviation: 10 },
    takeProfit: { type: "FIXED_TP", tpPercent: 5 },
    stopLoss: { type: "PERCENT", slPercent: 15 },
    tags: ["dca", "averaging"],
  },
];
```

### Tactics Executor

```typescript
class TacticsExecutor {
  constructor(tacticsSet: TacticsSet, initialState?: Partial<TacticsExecutionState>) {}
  
  // Проверка входа
  checkEntry(currentPrice: number, direction: "LONG" | "SHORT"): TacticsCheckResult;
  
  // Проверка TP
  checkTakeProfit(context: TacticsExecutionContext): TacticsCheckResult;
  
  // Проверка SL
  checkStopLoss(context: TacticsExecutionContext): TacticsCheckResult;
  
  // Обновление трейлинга
  updateTrailingStop(context: TacticsExecutionContext): TacticsCheckResult;
  
  // Получение состояния
  getState(): TacticsExecutionState;
}
```

---

## 9. Backtesting Engine

### Backtest Configuration

```typescript
interface BacktestConfig {
  id: string;
  name: string;
  
  // Data
  symbol: string;
  timeframe: Timeframe;
  startDate: Date;
  endDate: Date;
  initialBalance: number;
  balanceCurrency: string;
  
  // Strategy
  strategyId: string;
  strategyParameters?: Record<string, number | boolean | string>;
  tacticsSet: TacticsSet;
  
  // Trading
  feePercent: number;
  slippagePercent: number;
  maxLeverage: number;
  marginMode: "isolated" | "cross";
  allowShort: boolean;
  
  // Risk
  maxRiskPerTrade?: number;
  maxDrawdown?: number;
  maxOpenPositions?: number;
}
```

### Backtest Result

```typescript
interface BacktestResult {
  id: string;
  config: BacktestConfig;
  
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "CANCELLED";
  progress: number;
  error?: string;
  
  trades: BacktestTrade[];
  equityCurve: EquityPoint[];
  metrics: BacktestMetrics;
  
  initialBalance: number;
  finalBalance: number;
  finalEquity: number;
  
  candlesProcessed: number;
  signalsGenerated: number;
  signalsSkipped: number;
  logs: BacktestLogEntry[];
}
```

### Backtest Metrics

```typescript
interface BacktestMetrics {
  // Basic Stats
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  
  // PnL
  totalPnl: number;
  totalPnlPercent: number;
  avgPnl: number;
  avgWin: number;
  avgLoss: number;
  maxWin: number;
  maxLoss: number;
  
  // Ratios
  profitFactor: number;
  riskRewardRatio: number;
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  
  // Drawdown
  maxDrawdown: number;
  maxDrawdownPercent: number;
  avgDrawdown: number;
  timeInDrawdown: number;
  maxDrawdownDuration: number;
  
  // Duration
  avgTradeDuration: number;
  avgWinDuration: number;
  avgLossDuration: number;
  
  // Streaks
  maxWinStreak: number;
  maxLossStreak: number;
  currentStreak: { type: "WIN" | "LOSS" | "NONE"; count: number };
  
  // Returns
  avgDailyReturn: number;
  avgWeeklyReturn: number;
  avgMonthlyReturn: number;
  annualizedReturn: number;
  annualizedVolatility: number;
  
  // Exposure
  marketExposure: number;
  avgPositionSize: number;
  avgLeverage: number;
  
  // Risk
  var95: number;
  expectedShortfall95: number;
}
```

### Walk-Forward Validation

Продвинутая методология тестирования с разделением на train/test сегменты.

```typescript
interface WalkForwardConfig {
  trainPeriod: number;      // Период обучения (дней)
  testPeriod: number;       // Период тестирования (дней)
  stepPeriod: number;       // Шаг между сегментами (дней)
  minTrades: number;        // Минимум сделок для валидности
  optimizeOnTrain?: boolean;
  optimizationParams?: Record<string, { min: number; max: number; step: number }>;
}

interface WalkForwardResult {
  id: string;
  config: WalkForwardConfig;
  
  segments: SegmentResult[];
  validSegmentsCount: number;
  invalidSegmentsCount: number;
  
  aggregatedMetrics: BacktestMetrics;
  aggregatedTrainMetrics: BacktestMetrics;
  
  robustnessScore: number;         // 0-1
  consistencyRatio: number;        // % прибыльных сегментов
  avgPerformanceDegradation: number;
  returnStdDev: number;
  
  allTrades: BacktestTrade[];
  combinedEquityCurve: EquityPoint[];
}

class WalkForwardOptimizer {
  constructor(walkForwardConfig: WalkForwardConfig, backtestConfig: BacktestConfig) {}
  
  async run(candles: Candle[], onProgress?: (progress: number, segmentNumber: number) => void): Promise<WalkForwardResult>;
}
```

### Monte Carlo Simulation

Моделирование методом Монте-Карло для оценки устойчивости.

```typescript
interface MonteCarloConfig {
  iterations: number;        // Количество симуляций (default: 1000)
  ruinThreshold: number;     // Порог ruin (default: 0.5 = 50%)
  initialEquity: number;     // Начальный капитал
  seed?: number;             // Seed для воспроизводимости
}

interface MonteCarloResult {
  iterations: number;
  equityCurves: number[][];
  finalEquities: number[];
  percentiles: {
    p5: number;
    p25: number;
    p50: number;
    p75: number;
    p95: number;
  };
  ruinProbability: number;
  profitProbability: number;
  avgFinalEquity: number;
  stdFinalEquity: number;
  maxDrawdowns: number[];
  avgMaxDrawdown: number;
  worstCase: number;
  bestCase: number;
}

class MonteCarloSimulator {
  constructor(config: Partial<MonteCarloConfig>) {}
  
  simulate(trades: BacktestTrade[]): MonteCarloResult;
  simulateWithPositionSizing(trades: BacktestTrade[], multipliers: number[]): MonteCarloResult[];
  calculateTargetProbability(trades: BacktestTrade[], targetProfitPercent: number, maxLossPercent: number): number;
}
```

### Commission Calculator

Точные расчёты комиссий для разных бирж.

```typescript
interface CommissionTier {
  minVolume30d: number;  // Minimum 30-day volume in USDT
  makerFee: number;      // Maker fee (decimal: 0.0002 = 0.02%)
  takerFee: number;      // Taker fee (decimal: 0.0004 = 0.04%)
}

class CommissionCalculator {
  constructor(exchange: string, volume30d: number, useNativeTokenDiscount: boolean) {}
  
  getCurrentTier(): CommissionTier;
  calculateFee(price: number, quantity: number, isMaker: boolean, isFutures: boolean): number;
  calculateTotalTradeFee(entryPrice: number, exitPrice: number, quantity: number, leverage: number): number;
  getNextTier(): { tier: CommissionTier; volumeNeeded: number } | null;
  estimateSavingsWithNextTier(monthlyTrades: number, avgTradeSize: number): number | null;
}
```

**Поддерживаемые биржи:**

| Биржа | Maker | Taker | VIP Tiers |
|-------|-------|-------|-----------|
| Binance Spot | 0.10% | 0.10% | 6 |
| Binance Futures | 0.02% | 0.04% | 6 |
| Bybit Spot | 0.01% | 0.01% | 5 |
| Bybit Futures | 0.02% | 0.055% | 5 |
| OKX | 0.08% | 0.10% | 5 |
| Bitget | 0.02% | 0.06% | 5 |
| BingX | 0.02% | 0.05% | 4 |

### Sensitivity Analysis

Анализ чувствительности параметров стратегии.

```typescript
interface SensitivityParameter {
  name: string;
  baseValue: number;
  minValue: number;
  maxValue: number;
  steps: number;
}

interface SensitivityResult {
  parameter: string;
  baseValue: number;
  values: number[];
  results: SensitivityPoint[];
  impact: number;  // 0-100
  optimalValue: number;
  optimalResult: BacktestResult | null;
  stability: "STABLE" | "MODERATE" | "SENSITIVE" | "HIGHLY_SENSITIVE";
  recommendation: string;
}

class SensitivityAnalyzer {
  async analyze(config: SensitivityConfig): Promise<SensitivityAnalysisResult>;
}
```

---

## 10. Strategy Manager

Singleton-класс для управления всеми стратегиями.

```typescript
class StrategyManager {
  // Plugin Integration
  getPluginManager(): PluginManager;
  bindPlugin(pluginId: string, strategyId: string): void;
  unbindPlugin(pluginId: string, strategyId: string): void;
  
  // Registration
  register(strategy: IStrategy): void;
  unregister(strategyId: string): void;
  getStrategy(strategyId: string): IStrategy | undefined;
  getAllStrategies(): IStrategy[];
  getAllConfigs(): StrategyConfig[];
  
  // Execution
  start(strategyId: string, symbol: string, timeframe: Timeframe, parameters?: Record<string, unknown>): { success: boolean; error?: string };
  stop(runningId: string): void;
  stopAll(): void;
  
  // Analysis
  async analyze(strategyId: string, symbol: string, candles: Candle[]): Promise<StrategyAnalysisResult>;
  checkExit(strategyId: string, candles: Candle[], position: Position): StrategySignal | null;
  
  // Running Strategies
  getRunningStrategies(): RunningStrategy[];
  getRunningStrategy(runningId: string): RunningStrategy | undefined;
  async update(runningId: string, candles: Candle[]): Promise<StrategyExecutionResult>;
  
  // Cache
  cacheCandles(key: string, candles: Candle[]): void;
  getCachedCandles(key: string): Candle[] | undefined;
  clearCache(): void;
  
  // Parameters
  updateParameters(strategyId: string, parameters: Record<string, unknown>): { success: boolean; error?: string };
  reset(strategyId: string): void;
}

// Singleton
function getStrategyManager(): StrategyManager;
```

---

## 11. Plugin System

Плагинная архитектура для модификации сигналов и поведения стратегий.

### Plugin Interface

```typescript
interface IStrategyPlugin {
  id: string;
  name: string;
  version: string;
  description?: string;
  author?: string;
  
  dependencies?: string[];
  config?: Record<string, unknown>;
  
  hooks: Partial<Record<PluginHook, PluginHookHandler>>;
  
  init?: (manager: PluginManager) => Promise<void> | void;
  destroy?: () => Promise<void> | void;
}

type PluginHook = 
  | "beforeAnalysis"
  | "afterAnalysis"
  | "onSignal"
  | "onPositionOpen"
  | "onPositionClose"
  | "onError"
  | "beforeTrade"
  | "afterTrade";
```

### Plugin Context

```typescript
interface PluginContext {
  strategyId: string;
  symbol: string;
  timeframe: Timeframe;
  candles?: Candle[];
  signal?: StrategySignal | null;
  indicators?: IndicatorResult;
  position?: Position;
  error?: Error;
  metadata?: Record<string, unknown>;
}

interface PluginHookResult {
  proceed: boolean;
  modifiedSignal?: StrategySignal | null;
  modifiedContext?: PluginContext;
  error?: string;
}
```

### Plugin Manager

```typescript
class PluginManager {
  // Registration
  registerPlugin(plugin: IStrategyPlugin, priority?: number): void;
  unregisterPlugin(pluginId: string): void;
  bindPluginToStrategy(pluginId: string, strategyId: string): void;
  unbindPluginFromStrategy(pluginId: string, strategyId: string): void;
  
  // Middleware
  use(middleware: SignalMiddleware): void;
  removeMiddleware(middleware: SignalMiddleware): void;
  applyMiddlewares(signal: StrategySignal, context: PluginContext): StrategySignal | null;
  
  // Lifecycle
  async initialize(): Promise<void>;
  enablePlugin(pluginId: string): void;
  disablePlugin(pluginId: string): void;
  
  // Hooks
  async beforeAnalysis(context: PluginContext): Promise<PluginContext>;
  async afterAnalysis(context: PluginContext): Promise<PluginContext>;
  async onSignal(context: PluginContext): Promise<StrategySignal | null>;
  async onPositionOpen(context: PluginContext): Promise<void>;
  async onPositionClose(context: PluginContext): Promise<void>;
  async onError(context: PluginContext): Promise<void>;
  
  // Info
  getAllPlugins(): RegisteredPlugin[];
  getPluginsForStrategy(strategyId: string): RegisteredPlugin[];
  isInitialized(): boolean;
}
```

### Built-in Plugins

#### Logging Plugin

```typescript
const LoggingPlugin: IStrategyPlugin = {
  id: "builtin-logging",
  name: "Signal Logger",
  version: "1.0.0",
  
  hooks: {
    onSignal: async (context) => {
      if (context.signal) {
        console.log(`[${new Date().toISOString()}] Signal: ${context.signal.type} ${context.symbol} @ ${context.signal.price}`);
      }
      return { proceed: true };
    },
    onError: async (context) => {
      console.error(`Error in ${context.strategyId}:`, context.error);
      return { proceed: true };
    },
  },
};
```

#### Confidence Filter Plugin

```typescript
const ConfidenceFilterPlugin: IStrategyPlugin = {
  id: "builtin-confidence-filter",
  name: "Confidence Filter",
  version: "1.0.0",
  config: { minConfidence: 60 },
  
  hooks: {
    onSignal: (context) => {
      const minConfidence = context.config?.minConfidence || 60;
      if (context.signal && context.signal.confidence < minConfidence) {
        return { proceed: true, modifiedSignal: null };
      }
      return { proceed: true };
    },
  },
};
```

#### Deduplication Plugin

```typescript
const DeduplicationPlugin: IStrategyPlugin = {
  id: "builtin-deduplication",
  name: "Signal Deduplication",
  version: "1.0.0",
  config: { windowMs: 60000 },
  
  hooks: {
    onSignal: (context) => {
      // Prevents duplicate signals within windowMs
    },
  },
};
```

#### Rate Limit Plugin

```typescript
const RateLimitPlugin: IStrategyPlugin = {
  id: "builtin-rate-limit",
  name: "Rate Limit",
  version: "1.0.0",
  config: { maxSignals: 5, periodMs: 60000 },
  
  hooks: {
    onSignal: (context) => {
      // Limits signals per time period
    },
  },
};
```

#### Notification Plugin

```typescript
const NotificationPlugin: IStrategyPlugin = {
  id: "builtin-notification",
  name: "Signal Notifications",
  version: "1.0.0",
  
  hooks: {
    onSignal: async (context) => {
      if (context.signal) {
        await notifyUI({
          type: "STRATEGY_SIGNAL",
          title: `Signal: ${context.signal.type}`,
          message: `${context.symbol} @ ${context.signal.price}`,
        });
      }
      return { proceed: true };
    },
  },
};
```

---

## 12. API Reference

### Strategy API

```typescript
// Получить все стратегии
GET /api/strategies
Response: { strategies: StrategyConfig[] }

// Получить стратегию по ID
GET /api/strategies/:id
Response: { strategy: StrategyConfig }

// Запустить стратегию
POST /api/strategies/:id/start
Body: { symbol: string, timeframe: Timeframe, parameters?: Record<string, unknown> }
Response: { success: boolean, runningId?: string, error?: string }

// Остановить стратегию
POST /api/strategies/:id/stop
Body: { runningId: string }
Response: { success: boolean }

// Обновить параметры
PATCH /api/strategies/:id/parameters
Body: { parameters: Record<string, unknown> }
Response: { success: boolean, error?: string }

// Анализ
POST /api/strategies/:id/analyze
Body: { symbol: string, candles: Candle[] }
Response: StrategyAnalysisResult
```

### Backtest API

```typescript
// Создать бэктест
POST /api/backtest
Body: BacktestConfig
Response: { backtestId: string }

// Получить статус
GET /api/backtest/:id
Response: BacktestResult

// Отменить бэктест
DELETE /api/backtest/:id
Response: { success: boolean }

// Walk-Forward
POST /api/backtest/walk-forward
Body: { config: WalkForwardConfig, backtestConfig: BacktestConfig }
Response: WalkForwardResult

// Monte Carlo
POST /api/backtest/monte-carlo
Body: { trades: BacktestTrade[], config: MonteCarloConfig }
Response: MonteCarloResult

// Sensitivity Analysis
POST /api/backtest/sensitivity
Body: SensitivityConfig
Response: SensitivityAnalysisResult
```

### Tactics API

```typescript
// Получить predefined tactics
GET /api/tactics/predefined
Response: { tactics: TacticsSet[] }

// Создать tactics из сигнала
POST /api/tactics/from-signal
Body: { signal: Signal }
Response: { tactics: TacticsSet }

// Валидация
POST /api/tactics/validate
Body: { tactics: TacticsSet }
Response: { valid: boolean, errors: string[] }
```

---

## 13. Примеры использования

### Пример 1: Запуск стратегии

```typescript
import { getStrategyManager } from "@/lib/strategy";

const manager = getStrategyManager();

// Запуск RSI стратегии
const result = manager.start(
  "rsi-reversal",
  "BTCUSDT",
  "15m",
  {
    rsiPeriod: 14,
    rsiOverbought: 70,
    rsiOversold: 30,
    useTrendFilter: true,
  }
);

if (result.success) {
  console.log("Strategy started:", result.runningId);
}
```

### Пример 2: Анализ с использованием плагинов

```typescript
import { getStrategyManager } from "@/lib/strategy";
import { ConfidenceFilterPlugin, DeduplicationPlugin } from "@/lib/strategy/plugin-system";

const manager = getStrategyManager();

// Привязка плагинов
manager.bindPlugin("builtin-confidence-filter", "rsi-reversal");
manager.bindPlugin("builtin-deduplication", "rsi-reversal");

// Анализ
const result = await manager.analyze(
  "rsi-reversal",
  "BTCUSDT",
  candles
);

if (result.signal) {
  console.log(`Signal: ${result.signal.type} @ ${result.signal.price}`);
  console.log(`Confidence: ${result.signal.confidence}%`);
  console.log(`Reason: ${result.signal.reason}`);
}
```

### Пример 3: Создание кастомной стратегии

```typescript
import { BaseStrategy, StrategyConfig, Candle, IndicatorResult, StrategySignal, SignalType } from "@/lib/strategy";
import { RSI, EMA } from "@/lib/strategy/indicators";

const CUSTOM_STRATEGY_CONFIG: StrategyConfig = {
  id: "custom-rsi-ema",
  name: "Custom RSI + EMA",
  description: "Custom strategy combining RSI and EMA",
  version: "1.0.0",
  author: "Trader",
  timeframes: ["15m", "1h"],
  defaultTimeframe: "15m",
  parameters: [
    { name: "rsiPeriod", type: "integer", defaultValue: 14, min: 7, max: 21 },
    { name: "emaPeriod", type: "integer", defaultValue: 50, min: 20, max: 100 },
    { name: "rsiOversold", type: "number", defaultValue: 30, min: 20, max: 40 },
    { name: "rsiOverbought", type: "number", defaultValue: 70, min: 60, max: 80 },
  ],
  minCandlesRequired: 100,
};

class CustomRSIEMAStrategy extends BaseStrategy {
  private rsi: number[] = [];
  private ema: number[] = [];

  constructor() {
    super(CUSTOM_STRATEGY_CONFIG);
  }

  populateIndicators(candles: Candle[]): IndicatorResult {
    const closes = candles.map(c => c.close);
    this.rsi = RSI(closes, Number(this.parameters.rsiPeriod));
    this.ema = EMA(closes, Number(this.parameters.emaPeriod));
    return { rsi: { 14: this.rsi }, ema: { 50: this.ema } };
  }

  populateEntrySignal(
    candles: Candle[],
    indicators: IndicatorResult,
    currentPrice: number
  ): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const rsi = this.rsi[lastIndex];
    const ema = this.ema[lastIndex];

    if (isNaN(rsi) || isNaN(ema)) return null;

    const oversold = Number(this.parameters.rsiOversold);
    const overbought = Number(this.parameters.rsiOverbought);

    // LONG: RSI oversold + price above EMA (trend following pullback)
    if (rsi <= oversold && currentPrice > ema) {
      return {
        type: "LONG",
        confidence: 75,
        symbol: "",
        timeframe: this.config.defaultTimeframe,
        timestamp: new Date(),
        price: currentPrice,
        reason: `RSI oversold (${rsi.toFixed(1)}) with uptrend`,
        metadata: { rsi, ema },
      };
    }

    // SHORT: RSI overbought + price below EMA
    if (rsi >= overbought && currentPrice < ema) {
      return {
        type: "SHORT",
        confidence: 75,
        symbol: "",
        timeframe: this.config.defaultTimeframe,
        timestamp: new Date(),
        price: currentPrice,
        reason: `RSI overbought (${rsi.toFixed(1)}) with downtrend`,
        metadata: { rsi, ema },
      };
    }

    return null;
  }

  populateExitSignal(
    candles: Candle[],
    indicators: IndicatorResult,
    position: { direction: "LONG" | "SHORT"; entryPrice: number; currentPrice: number; size: number; openTime: Date }
  ): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const rsi = this.rsi[lastIndex];

    if (isNaN(rsi)) return null;

    if (position.direction === "LONG" && rsi >= 70) {
      return {
        type: "EXIT_LONG",
        confidence: 70,
        symbol: "",
        timeframe: this.config.defaultTimeframe,
        timestamp: new Date(),
        price: position.currentPrice,
        reason: "RSI reached overbought",
      };
    }

    if (position.direction === "SHORT" && rsi <= 30) {
      return {
        type: "EXIT_SHORT",
        confidence: 70,
        symbol: "",
        timeframe: this.config.defaultTimeframe,
        timestamp: new Date(),
        price: position.currentPrice,
        reason: "RSI reached oversold",
      };
    }

    return null;
  }
}

// Регистрация
const manager = getStrategyManager();
manager.register(new CustomRSIEMAStrategy());
```

### Пример 4: Бэктестинг

```typescript
import { BacktestEngine, createDefaultBacktestConfig } from "@/lib/backtesting";
import { PREDEFINED_TACTICS_SETS } from "@/lib/strategy/tactics/types";

// Создание конфигурации
const config = createDefaultBacktestConfig(
  "rsi-reversal",
  "BTCUSDT",
  "15m",
  PREDEFINED_TACTICS_SETS[0] // Conservative
);

// Настройка параметров
config.initialBalance = 10000;
config.feePercent = 0.04;
config.maxLeverage = 10;
config.maxDrawdown = 30;

// Запуск бэктеста
const engine = new BacktestEngine(config);
const result = await engine.run(candles, (progress) => {
  console.log(`Progress: ${progress.toFixed(1)}%`);
});

// Результаты
console.log(`Total Trades: ${result.metrics.totalTrades}`);
console.log(`Win Rate: ${result.metrics.winRate.toFixed(1)}%`);
console.log(`Total PnL: ${result.metrics.totalPnl.toFixed(2)}`);
console.log(`Sharpe Ratio: ${result.metrics.sharpeRatio.toFixed(2)}`);
console.log(`Max Drawdown: ${result.metrics.maxDrawdownPercent.toFixed(1)}%`);
```

### Пример 5: Walk-Forward Validation

```typescript
import { WalkForwardOptimizer, createDefaultWalkForwardConfig } from "@/lib/backtesting/walk-forward";
import { interpretRobustnessScore } from "@/lib/backtesting/walk-forward";

const wfConfig = createDefaultWalkForwardConfig();
// {
//   trainPeriod: 90,   // 90 дней обучения
//   testPeriod: 30,    // 30 дней тестирования
//   stepPeriod: 30,    // шаг 30 дней
//   minTrades: 10,
// }

const optimizer = new WalkForwardOptimizer(wfConfig, backtestConfig);
const result = await optimizer.run(candles, (progress, segment) => {
  console.log(`Segment ${segment}: ${progress.toFixed(1)}%`);
});

// Интерпретация robustness
const interpretation = interpretRobustnessScore(result.robustnessScore);
console.log(`Robustness: ${interpretation.rating}`);
console.log(`Description: ${interpretation.description}`);

console.log(`Consistency: ${result.consistencyRatio.toFixed(1)}%`);
console.log(`Avg Degradation: ${result.avgPerformanceDegradation.toFixed(1)}%`);
```

### Пример 6: Monte Carlo Simulation

```typescript
import { MonteCarloSimulator, analyzeWithMonteCarlo } from "@/lib/backtesting/monte-carlo";

// Быстрый анализ
const mcResult = analyzeWithMonteCarlo(backtestResult.trades, {
  iterations: 1000,
  initialEquity: 10000,
});

console.log(`Median Equity: ${mcResult.percentiles.p50.toFixed(2)}`);
console.log(`95% CI: ${mcResult.percentiles.p5.toFixed(2)} - ${mcResult.percentiles.p95.toFixed(2)}`);
console.log(`Ruin Probability: ${(mcResult.ruinProbability * 100).toFixed(1)}%`);
console.log(`Profit Probability: ${(mcResult.profitProbability * 100).toFixed(1)}%`);

// Расширенный анализ
const simulator = new MonteCarloSimulator({
  iterations: 5000,
  ruinThreshold: 0.5,
  initialEquity: 10000,
});

// Вероятность достичь цели
const targetProb = simulator.calculateTargetProbability(
  trades,
  50,  // target: 50% profit
  25   // max loss: 25%
);
console.log(`Probability of 50% profit before 25% loss: ${(targetProb * 100).toFixed(1)}%`);
```

### Пример 7: Использование Tactics

```typescript
import { TacticsExecutor, createTacticsFromSignal } from "@/lib/strategy/tactics/executor";
import { PREDEFINED_TACTICS_SETS } from "@/lib/strategy/tactics/types";

// Использование predefined tactics
const tactics = PREDEFINED_TACTICS_SETS[1]; // Aggressive
const executor = new TacticsExecutor(tactics, { positionId: "pos-1" });

// Проверка входа
const entryResult = executor.checkEntry(currentPrice, "LONG");
if (entryResult.actionRequired) {
  console.log(`Entry signal: ${entryResult.message}`);
  console.log(`Price: ${entryResult.actionData?.price}`);
  console.log(`Size: ${entryResult.actionData?.amount}`);
}

// Проверка TP
const tpContext = {
  positionId: "pos-1",
  symbol: "BTCUSDT",
  direction: "LONG",
  currentPrice: 45500,
  avgEntryPrice: 45000,
  positionSize: 0.1,
  balance: 10000,
  openedAt: new Date(),
  currentTime: new Date(),
};

const tpResult = executor.checkTakeProfit(tpContext);
if (tpResult.actionRequired) {
  console.log(`TP hit: ${tpResult.message}`);
}

// Создание tactics из сигнала
const customTactics = createTacticsFromSignal({
  symbol: "BTCUSDT",
  direction: "LONG",
  entryPrices: [45000, 44500, 44000],
  takeProfits: [
    { price: 46000, percentage: 30 },
    { price: 47000, percentage: 40 },
    { price: 48000, percentage: 30 },
  ],
  stopLoss: 43500,
});
```

### Пример 8: Alpha Factors

```typescript
import { createAlphaFactorsEngine, AlphaFactorsEngine } from "@/lib/strategy/alpha-factors";

const engine = createAlphaFactorsEngine({
  enabledFactors: [
    "price_vs_ema",
    "ema_crossover",
    "macd_signal",
    "rsi_mean_reversion",
    "bollinger_position",
  ],
  combineMethod: "weighted_average",
  neutralThreshold: 0.2,
  minConfidence: 0.3,
});

// Расчёт сигнала
const signal = engine.getSignal(candles);

console.log(`Overall Signal: ${signal.overallSignal}`);
console.log(`Confidence: ${signal.confidence.toFixed(2)}`);
console.log(`Value: ${signal.overallValue.toFixed(3)}`);

// Детализация по факторам
for (const factor of signal.factors) {
  console.log(`${factor.name}: ${factor.value.toFixed(3)} (${factor.signal})`);
}
```

---

## Заключение

Strategy Engine предоставляет полный набор инструментов для:

- **Создания стратегий**: От простых индикаторных до AI-powered
- **Тестирования**: Продвинутый бэктестинг с Walk-Forward и Monte Carlo
- **Управления**: Tactics система для контроля входов и выходов
- **Расширения**: Plugin архитектура для кастомизации поведения

Все компоненты интегрированы и могут использоваться как вместе, так и по отдельности.
