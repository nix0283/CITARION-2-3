# Indicators Service Complete Documentation

> Полная документация по сервису индикаторов CITARION
> **200+ индикаторных функций** для технического анализа

---

## Обзор

CITARION предоставляет единую унифицированную систему индикаторов (`UnifiedIndicatorService`) для всех компонентов платформы.

### Архитектура

```
┌─────────────────────────────────────────────────────────────────────┐
│                    INDICATORS SERVICE ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐        │
│  │     Chart      │  │   Bot Engines  │  │  ML Pipeline   │        │
│  │   Components   │  │  (Grid, DCA...) │  │  (Features)    │        │
│  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘        │
│          │                   │                   │                  │
│  ┌───────▼───────────────────▼───────────────────▼────────┐        │
│  │              UnifiedIndicatorService                    │        │
│  │  ┌─────────────────┐  ┌─────────────────┐              │        │
│  │  │ IndicatorRegistry│  │ IndicatorCache  │              │        │
│  │  └─────────────────┘  └─────────────────┘              │        │
│  └─────────────────────────────────────────────────────────┘        │
│                              │                                       │
│  ┌───────────────────────────▼────────────────────────────┐        │
│  │                    Indicator Sources                     │        │
│  ├─────────────────────────────────────────────────────────┤        │
│  │  • builtin.ts (52 индикатора)                           │        │
│  │  • advanced/ (6 ML-индикаторов)                         │        │
│  │  • chart-types/ (8 типов графиков)                      │        │
│  │  • wolfbot/ (24 паттерна + 50 индикаторов)              │        │
│  │  • jesse/ (~70 индикаторов)                             │        │
│  │  • quantclub-port.ts (ADX, Stochastic)                  │        │
│  └─────────────────────────────────────────────────────────┘        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Файловая структура

```
/src/lib/indicators/
├── unified-indicator-service.ts  # Единый сервис (Singleton)
├── builtin.ts                    # Реэкспорт из модульных файлов
├── builtin-index.ts              # Индекс встроенных индикаторов
├── builtin-types.ts              # Типы для встроенных индикаторов
├── builtin-moving-averages.ts    # Скользящие средние (14)
├── builtin-oscillators.ts        # Осцилляторы (17)
├── builtin-volatility.ts         # Индикаторы волатильности (9)
├── builtin-volume.ts             # Объёмные индикаторы (7)
├── builtin-pivot.ts              # Точки разворота (5)
├── calculator.ts                 # Функции расчёта
├── extended-calculators.ts       # Расширенные калькуляторы
├── ta4j-indicators.ts            # Портированные из TA4j
├── ta4j-port.ts                  # Дополнительные TA4j
├── quantclub-port.ts             # Портированные из QuantClub
├── keltner.ts                    # Канал Кельтнера
├── vwap.ts                       # VWAP
├── supertrend.ts                 # SuperTrend
├── ichimoku.ts                   # Облако Ишимоку
├── renko.ts                      # Renko кирпичи
├── heikin-ashi.ts                # Heikin-Ashi свечи
├── fractals.ts                   # Фракталы Вильямса
├── pivot.ts                      # Pivot Points
├── depth.ts                      # Индикаторы глубины (Order Book)
│
├── advanced/                     # Продвинутые ML-индикаторы
│   ├── index.ts                  # Экспорт модуля
│   ├── wave-trend.ts             # WaveTrend Oscillator
│   ├── kernel-regression.ts      # Nadaraya-Watson Kernel
│   ├── squeeze-momentum.ts       # Squeeze Momentum
│   ├── neural-probability-channel.ts  # Neural Probability Channel
│   ├── kmeans-volatility.ts      # K-Means Volatility
│   └── ml-adaptive-supertrend.ts # ML Adaptive SuperTrend
│
└── chart-types/                  # Альтернативные типы графиков
    ├── index.ts                  # Экспорт модуля
    ├── kagi.ts                   # Kagi chart
    ├── line-break.ts             # Three Line Break
    ├── range-bars.ts             # Range Bars
    ├── point-figure.ts           # Point & Figure
    ├── hollow-candles.ts         # Hollow Candles
    └── volume-candles.ts         # Volume Candles

/src/lib/wolfbot/
├── candlestick-patterns.ts       # 24 свечных паттерна
├── indicators.ts                 # ~50 индикаторов WolfBot
├── patterns.ts                   # Графические паттерны
└── auto-trendlines.ts            # Авто-трендлайны

/src/lib/jesse/
└── indicators.ts                 # ~70 индикаторов Jesse
```

---

## UnifiedIndicatorService

### API

```typescript
import { 
  UnifiedIndicatorService, 
  unifiedIndicatorService,
  calculateIndicator,
  getAllIndicators 
} from '@/lib/indicators/unified-indicator-service';

// Singleton instance
const service = UnifiedIndicatorService.getInstance();

// Или используйте convenience functions
const indicators = getAllIndicators();
const result = calculateIndicator('rsi', candles, { length: 14 });
```

### Основные методы

| Метод | Описание | Возвращает |
|-------|----------|------------|
| `calculate(id, candles, inputs)` | Расчёт индикатора | `IndicatorResult` |
| `calculateMultiple(indicators[], candles)` | Расчёт нескольких индикаторов | `Map<string, IndicatorResult>` |
| `getIndicators()` | Все зарегистрированные индикаторы | `IndicatorConfig[]` |
| `getIndicatorsByCategory(category)` | Индикаторы по категории | `IndicatorConfig[]` |
| `getOverlayIndicators()` | Overlay индикаторы | `IndicatorConfig[]` |
| `getOscillatorIndicators()` | Осцилляторы | `IndicatorConfig[]` |
| `getIndicatorConfig(id)` | Конфигурация индикатора | `IndicatorConfig` |
| `registerIndicator(config, calculator)` | Регистрация custom индикатора | `void` |
| `clearCache()` | Очистка кэша | `void` |

### Типы данных

```typescript
interface Candle {
  time: Time;          // Unix timestamp или formatted date
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface IndicatorResult {
  id: string;
  name: string;
  overlay: boolean;    // true = на графике, false = отдельная панель
  lines: IndicatorLine[];
  histograms: IndicatorHistogram[];
  metadata?: Record<string, unknown>;
}

interface IndicatorLine {
  name: string;
  data: (LineData<Time> | WhitespaceData<Time>)[];
  color: string;
}

interface IndicatorConfig {
  id: string;
  name: string;
  description: string;
  category: IndicatorCategory;
  overlay: boolean;
  inputs: IndicatorInput[];
  defaultInputs: Record<string, number | string | boolean>;
}

type IndicatorCategory = 
  | 'trend'
  | 'momentum'
  | 'volatility'
  | 'volume'
  | 'support_resistance'
  | 'pattern'
  | 'custom';
```

---

## Категории индикаторов

### 1. Moving Averages (Скользящие средние) — 14 индикаторов

| ID | Название | Описание | Overlay |
|----|----------|----------|---------|
| `sma` | Simple Moving Average | Простая скользящая средняя | ✅ |
| `ema` | Exponential Moving Average | Экспоненциальная скользящая средняя | ✅ |
| `ema_cross` | EMA Cross | Две EMA для определения пересечений | ✅ |
| `wma` | Weighted Moving Average | Взвешенная скользящая средняя | ✅ |
| `hma` | Hull Moving Average | Скользящая средняя Халла (малый лаг) | ✅ |
| `vwma` | Volume Weighted MA | MA, взвешенная по объёму | ✅ |
| `smma` | Smoothed Moving Average | Сглаженная MA (Wilder's) | ✅ |
| `lsma` | Linear Regression MA | MA линейной регрессии | ✅ |
| `dema` | Double EMA | Двойная экспоненциальная MA | ✅ |
| `tema` | Triple EMA | Тройная экспоненциальная MA | ✅ |
| `kama` | Kaufman Adaptive MA | Адаптивная MA Кауфмана | ✅ |
| `vidya` | Variable Index DYMA | Переменная индексная динамическая | ✅ |
| `mcginley` | McGinley Dynamic | Динамическая средняя МакГинли | ✅ |
| `rolling_vwap` | Rolling VWAP | Скользящая VWAP за период | ✅ |

**Пример использования:**

```typescript
const smaResult = calculateIndicator('sma', candles, { length: 20 });
const emaCrossResult = calculateIndicator('ema_cross', candles, { 
  fastLength: 9, 
  slowLength: 21 
});
```

---

### 2. Oscillators (Осцилляторы) — 17 индикаторов

| ID | Название | Диапазон | Overlay |
|----|----------|----------|---------|
| `rsi` | Relative Strength Index | 0-100 | ❌ |
| `macd` | MACD | Без ограничений | ❌ |
| `stochrsi` | Stochastic RSI | 0-100 | ❌ |
| `ppo` | Percentage Price Oscillator | Без ограничений | ❌ |
| `williams_r` | Williams %R | -100 до 0 | ❌ |
| `cci` | Commodity Channel Index | Без ограничений | ❌ |
| `mfi` | Money Flow Index | 0-100 | ❌ |
| `roc` | Rate of Change | Без ограничений | ❌ |
| `momentum` | Momentum | Без ограничений | ❌ |
| `cmo` | Chande Momentum Oscillator | -100 до 100 | ❌ |
| `ultimate_osc` | Ultimate Oscillator | 0-100 | ❌ |
| `ao` | Awesome Oscillator | Без ограничений | ❌ |
| `ac` | Accelerator Oscillator | Без ограничений | ❌ |
| `tsi` | True Strength Index | -100 до 100 | ❌ |
| `vortex` | Vortex Indicator | 0+ | ❌ |
| `aroon` | Aroon | 0-100 | ❌ |
| `stochastic` | Stochastic | 0-100 | ❌ |

**Пример RSI:**

```typescript
const rsiResult = calculateIndicator('rsi', candles, { length: 14 });
// rsiResult.lines[0].data содержит значения RSI

// Определение перекупленности/перепроданности
const lastValue = rsiResult.lines[0].data[rsiResult.lines[0].data.length - 1];
if (lastValue.value > 70) {
  console.log('Перекупленность');
} else if (lastValue.value < 30) {
  console.log('Перепроданность');
}
```

**Пример MACD:**

```typescript
const macdResult = calculateIndicator('macd', candles, {
  fastLength: 12,
  slowLength: 26,
  signalLength: 9
});
// macdResult.lines[0] - MACD line
// macdResult.lines[1] - Signal line
// macdResult.histograms[0] - Histogram
```

---

### 3. Volatility (Волатильность) — 9 индикаторов

| ID | Название | Описание | Тип |
|----|----------|----------|-----|
| `bb` | Bollinger Bands | Канал волатильности | Overlay |
| `atr` | Average True Range | Средний истинный диапазон | Oscillator |
| `true_range` | True Range | Истинный диапазон | Oscillator |
| `donchian` | Donchian Channels | Канал Дончиана | Overlay |
| `stddev` | Standard Deviation | Стандартное отклонение | Oscillator |
| `hist_vol` | Historical Volatility | Историческая волатильность | Oscillator |
| `natr` | Normalized ATR | Нормализованный ATR | Oscillator |
| `psar` | Parabolic SAR | Параболический SAR | Overlay (точки) |
| `keltner` | Keltner Channel | Канал Кельтнера | Overlay |

**Пример Bollinger Bands:**

```typescript
const bbResult = calculateIndicator('bb', candles, { 
  length: 20, 
  mult: 2 
});
// bbResult.lines[0] - Upper band
// bbResult.lines[1] - Middle band (SMA)
// bbResult.lines[2] - Lower band
```

---

### 4. Volume (Объём) — 7 индикаторов

| ID | Название | Описание |
|----|----------|----------|
| `vol_sma` | Volume SMA | Объём с MA |
| `obv` | On-Balance Volume | Балансовый объём |
| `cmf` | Chaikin Money Flow | Денежный поток Чайкина |
| `adl` | Accumulation/Distribution | Накопление/Распределение |
| `vol_osc` | Volume Oscillator | Осциллятор объёма |
| `emv` | Ease of Movement | Лёгкость движения |
| `vwap` | VWAP | Средневзвешенная цена по объёму |

---

### 5. Pivot Points (Точки разворота) — 5 типов

| ID | Название | Метод |
|----|----------|-------|
| `pivot_standard` | Standard Pivot | Классический метод |
| `pivot_fibonacci` | Fibonacci Pivot | Уровни Фибоначчи |
| `pivot_camarilla` | Camarilla Pivot | Метод Camarilla |
| `pivot_woodie` | Woodie Pivot | Метод Woodie |
| `pivot_demark` | Demark Pivot | Метод Демарка |

---

### 6. Advanced ML-индикаторы — 6 индикаторов

#### WaveTrend Oscillator

```typescript
import { calculateWaveTrend, getWaveTrendEntrySignal } from '@/lib/indicators/advanced';

const waveTrend = calculateWaveTrend(candles, {
  channelLength: 10,
  averageLength: 21,
  overBoughtLevel1: 60,
  overBoughtLevel2: 53,
  overSoldLevel1: -60,
  overSoldLevel2: -53
});

// Сигналы входа
const signal = getWaveTrendEntrySignal(waveTrend);
// 'long' | 'short' | null
```

#### Kernel Regression (Nadaraya-Watson)

```typescript
import { calculateKernelRegression, getChannelSignal } from '@/lib/indicators/advanced';

const kernel = calculateKernelRegression(candles, {
  lookback: 8,
  relativeWeight: 0.8,
  startRegressionAtIndex: 25
});

// Канальные сигналы
const signal = getChannelSignal(kernel);
```

#### Squeeze Momentum

```typescript
import { calculateSqueezeMomentum, getSqueezeBreakoutSignal } from '@/lib/indicators/advanced';

const squeeze = calculateSqueezeMomentum(candles, {
  length: 20,
  mult: 2.0,
  lengthKC: 20,
  multKC: 1.5,
  useTrueRange: true
});

// Определение squeeze состояния
const state = analyzeSqueezeState(squeeze);
// 'squeeze' | 'fire' | 'no_squeeze'
```

#### Neural Probability Channel

```typescript
import { calculateNPC } from '@/lib/indicators/advanced';

const npc = calculateNPC(candles, {
  period: 20,
  sensitivity: 1.5,
  smooth: 3
});
// Возвращает probability channel с upper/lower bands
```

#### ML Adaptive SuperTrend

```typescript
import { calculateMLAdaptiveSuperTrend } from '@/lib/indicators/advanced';

const mlSt = calculateMLAdaptiveSuperTrend(candles, {
  basePeriod: 10,
  atrMult: 3.0,
  volatilityAdaptive: true
});
```

---

### 7. Chart Types (Типы графиков) — 14 типов

| ID | Название | Описание | OHLC |
|----|----------|----------|------|
| `bars` | Bars (OHLC) | Стандартные бары | ✅ |
| `line` | Line Chart | Линейный график | ❌ |
| `area` | Area Chart | Облачный график | ❌ |
| `candles` | Candlesticks | Японские свечи | ✅ |
| `crosses` | Crosses | Крестики | ❌ |
| `columns` | Columns (HLC) | Столбцы HLC | ✅ |
| `heikin_ashi` | Heikin-Ashi | Сглаженные свечи | ✅ |
| `renko` | Renko | Кирпичный график | ❌ |
| `kagi` | Kagi | Линии спроса/предложения | ❌ |
| `line_break` | Line Break | Трёхлинейный разворот | ❌ |
| `range_bars` | Range Bars | Фиксированный диапазон | ✅ |
| `point_figure` | Point & Figure | X/O график | ❌ |
| `hollow_candles` | Hollow Candles | Полые свечи | ✅ |
| `volume_candles` | Volume Candles | Объёмные свечи | ✅ |

---

### 8. Candlestick Patterns (Свечные паттерны) — 24 паттерна

#### Односвечные (9)

| Паттерн | Тип | Сигнал | Функция |
|---------|-----|--------|---------|
| Doji | Нейтральный | Hold | `Doji(candle, avgBody)` |
| Dragonfly Doji | Бычий | Buy | `DragonflyDoji(candle)` |
| Gravestone Doji | Медвежий | Sell | `GravestoneDoji(candle)` |
| Hammer | Бычий | Buy | `Hammer(candle, avgBody)` |
| Inverted Hammer | Бычий | Buy | `InvertedHammer(candle, avgBody)` |
| Hanging Man | Медвежий | Sell | `HangingMan(candle, prev, avgBody)` |
| Shooting Star | Медвежий | Sell | `ShootingStar(candle, prev, avgBody)` |
| Marubozu | Продолжение | По тренду | `Marubozu(candle)` |
| Spinning Top | Нейтральный | Hold | `SpinningTop(candle, avgBody)` |

#### Двухсвечные (6)

| Паттерн | Тип | Функция |
|---------|-----|---------|
| Bullish Engulfing | Бычий разворот | `BullishEngulfing(candle, prev)` |
| Bearish Engulfing | Медвежий разворот | `BearishEngulfing(candle, prev)` |
| Tweezer Top | Медвежий разворот | `TweezerTop(candle, prev)` |
| Tweezer Bottom | Бычий разворот | `TweezerBottom(candle, prev)` |
| Piercing Line | Бычий разворот | `PiercingLine(candle, prev)` |
| Dark Cloud Cover | Медвежий разворот | `DarkCloudCover(candle, prev)` |

#### Трёхсвечные (7)

| Паттерн | Тип | Функция |
|---------|-----|---------|
| Morning Star | Бычий разворот | `MorningStar(candles)` |
| Evening Star | Медвежий разворот | `EveningStar(candles)` |
| Three White Soldiers | Бычий разворот | `ThreeWhiteSoldiers(candles)` |
| Three Black Crows | Медвежий разворот | `ThreeBlackCrows(candles)` |
| Three Inside Up | Бычий разворот | `ThreeInsideUp(candles)` |
| Three Inside Down | Медвежий разворот | `ThreeInsideDown(candles)` |
| Tri-Star | Разворот | `TriStar(candles)` |

#### Пятисвечные (2)

| Паттерн | Тип | Функция |
|---------|-----|---------|
| Rising Three Methods | Бычье продолжение | В patterns.ts |
| Falling Three Methods | Медвежье продолжение | В patterns.ts |

**Сканер паттернов:**

```typescript
import { scanCandlestickPatterns } from '@/lib/wolfbot/candlestick-patterns';

const result = scanCandlestickPatterns(candles);
// result.patterns - массив найденных паттернов
// result.strongestPattern - самый сильный паттерн
// result.overallSignal - 'buy' | 'sell' | 'hold'
// result.confidence - уверенность 0-1
```

---

### 9. Depth Indicators (Индекс глубины) — 6 функций

| ID | Название | Графика | Описание |
|----|----------|---------|----------|
| `depth_delta` | Depth Delta | ✅ Histogram | Дисбаланс Bid/Ask |
| `depth_middle_price` | Depth Middle Price | ✅ Overlay | Средневзвешенная цена |
| `depth_imbalance` | Depth Imbalance | ✅ Oscillator | Дисбаланс -1 до 1 |
| `depth_true_range` | Depth True Range | ❌ Число | Диапазон стакана |
| `depth_weighted_points` | Depth Weighted Points | ❌ Список | Уровни поддержки/сопротивления |
| `depth_block_points` | Depth Block Points | ❌ Список | Крупные ордера |

```typescript
import { 
  depthDelta, 
  depthMiddlePrice, 
  depthImbalance 
} from '@/lib/indicators/depth';

// Требует orderbook data
const imbalance = depthImbalance(orderbook);
// -1 (полный медвежий) до +1 (полный бычий)
```

---

## Интеграция с Bot Engines

### Использование в Grid Bot

```typescript
// Grid Bot использует ATR для адаптивного размещения уровней
import { calculateIndicator } from '@/lib/indicators/unified-indicator-service';

class GridBotEngine {
  calculateGridLevels() {
    // ATR для определения ширины сетки
    const atr = calculateIndicator('atr', this.candles, { length: 14 });
    const atrValue = atr.lines[0].data[atr.lines[0].data.length - 1].value;
    
    // Bollinger Bands для определения границ
    const bb = calculateIndicator('bb', this.candles, { length: 20, mult: 2 });
    
    // Используем для расчёта уровней
    const gridSpacing = atrValue * 1.5;
    // ...
  }
}
```

### Использование в DCA Bot

```typescript
// DCA Bot использует RSI и Stochastic для фильтрации входов
class DCABotEngine {
  checkEntryConditions() {
    const rsi = calculateIndicator('rsi', this.candles, { length: 14 });
    const stoch = calculateIndicator('stochastic', this.candles, { 
      k: 14, 
      d: 3, 
      smooth: 3 
    });
    
    const lastRSI = rsi.lines[0].data[rsi.lines[0].data.length - 1].value;
    const lastStochK = stoch.lines[0].data[stoch.lines[0].data.length - 1].value;
    
    // Вход при перепроданности
    if (lastRSI < 30 && lastStochK < 20) {
      this.executeEntry();
    }
  }
}
```

### Использование в BB Bot

```typescript
// BB Bot использует Bollinger Bands + Stochastic
class BBBotEngine {
  async analyzeSignals() {
    const bb = calculateIndicator('bb', this.candles, {
      length: this.config.bbInnerPeriod,
      mult: this.config.bbInnerDeviation
    });
    
    const stoch = calculateIndicator('stochastic', this.candles, {
      k: this.config.stochKPeriod,
      d: this.config.stochDPeriod,
      smooth: this.config.stochSlowing
    });
    
    // Проверка условий входа
    const price = this.currentPrice;
    const lowerBand = bb.lines[2].data[bb.lines[2].data.length - 1].value;
    const stochK = stoch.lines[0].data[stoch.lines[0].data.length - 1].value;
    
    // Long: цена ниже нижней полосы + стохастик перепродан
    if (price < lowerBand && stochK < this.config.stochOversold) {
      return { direction: 'LONG', confidence: 0.8 };
    }
    // ...
  }
}
```

### Использование в Orion Bot

```typescript
// Orion Bot использует EMA + SuperTrend для трендовой стратегии
class OrionBotEngine {
  analyzeTrend() {
    // EMA alignment
    const ema20 = calculateIndicator('ema', this.candles, { length: 20 });
    const ema50 = calculateIndicator('ema', this.candles, { length: 50 });
    const ema200 = calculateIndicator('ema', this.candles, { length: 200 });
    
    // SuperTrend
    const supertrend = calculateIndicator('supertrend', this.candles, {
      period: 10,
      multiplier: 3
    });
    
    // Определение тренда
    const last20 = ema20.lines[0].data[ema20.lines[0].data.length - 1].value;
    const last50 = ema50.lines[0].data[ema50.lines[0].data.length - 1].value;
    const last200 = ema200.lines[0].data[ema200.lines[0].data.length - 1].value;
    
    const alignment = last20 > last50 && last50 > last200 ? 1 : 
                      last20 < last50 && last50 < last200 ? -1 : 0;
    
    return { alignment, supertrend };
  }
}
```

### Использование в Vision Bot

```typescript
// Vision Bot использует ML-индикаторы для прогнозирования
import { calculateWaveTrend, calculateSqueezeMomentum } from '@/lib/indicators/advanced';

class VisionBotEngine {
  generateForecast() {
    // WaveTrend для momentum
    const waveTrend = calculateWaveTrend(this.candles);
    
    // Squeeze для определения breakout potential
    const squeeze = calculateSqueezeMomentum(this.candles);
    
    // Kernel Regression для тренда
    const kernel = calculateKernelRegression(this.candles);
    
    // Комбинируем для прогноза
    const forecast = this.mlClassifier.predict({
      waveTrend: waveTrend.wavetrend,
      squeezeState: analyzeSqueezeState(squeeze),
      kernelTrend: kernel.trend
    });
    
    return forecast;
  }
}
```

---

## Интеграция с ML Pipeline

### Feature Engineering

```typescript
// ML Pipeline использует индикаторы как features
import { calculateIndicator } from '@/lib/indicators/unified-indicator-service';

function extractFeatures(candles: Candle[]) {
  const rsi = calculateIndicator('rsi', candles, { length: 14 });
  const macd = calculateIndicator('macd', candles, {});
  const bb = calculateIndicator('bb', candles, { length: 20, mult: 2 });
  const atr = calculateIndicator('atr', candles, { length: 14 });
  const adx = calculateIndicator('adx', candles, { length: 14 });
  
  return {
    rsi: rsi.lines[0].data.slice(-1)[0].value,
    macd_histogram: macd.histograms[0].data.slice(-1)[0].value,
    bb_position: (candles[candles.length-1].close - bb.lines[2].data.slice(-1)[0].value) /
                 (bb.lines[0].data.slice(-1)[0].value - bb.lines[2].data.slice(-1)[0].value),
    atr_pct: atr.lines[0].data.slice(-1)[0].value / candles[candles.length-1].close,
    adx: adx.lines[0].data.slice(-1)[0].value
  };
}
```

### Signal Filtering

```typescript
// ML Signal Filter использует индикаторы
class MLSignalFilter {
  filterSignal(signal: Signal, candles: Candle[]) {
    const rsi = calculateIndicator('rsi', candles, { length: 14 });
    const adx = calculateIndicator('adx', candles, { length: 14 });
    
    const lastRSI = rsi.lines[0].data.slice(-1)[0].value;
    const lastADX = adx.lines[0].data.slice(-1)[0].value;
    
    // Фильтрация по тренду
    if (lastADX < 25 && signal.direction === 'trend_follow') {
      return null; // Слабый тренд - отклоняем
    }
    
    // Фильтрация по перекупленности/перепроданности
    if (signal.direction === 'LONG' && lastRSI > 70) {
      signal.confidence *= 0.5; // Снижаем уверенность
    }
    
    return signal;
  }
}
```

---

## Кэширование

UnifiedIndicatorService использует встроенный кэш для оптимизации производительности.

```typescript
interface CacheConfig {
  maxEntries: number;  // Максимум записей (default: 100)
  ttl: number;         // Time-to-live в ms (default: 60000)
}

// Очистка кэша
unifiedIndicatorService.clearCache();

// Кэш автоматически инвалидируется при:
// - Изменении временного диапазона свечей
// - Изменении параметров индикатора
// - Истечении TTL
```

---

## Создание Custom Indicators

```typescript
import { unifiedIndicatorService, IndicatorConfig, IndicatorCalculator } from '@/lib/indicators/unified-indicator-service';

const myIndicatorConfig: IndicatorConfig = {
  id: 'my_custom_indicator',
  name: 'My Custom Indicator',
  description: 'Custom indicator description',
  category: 'custom',
  overlay: false,
  inputs: [
    { name: 'period', type: 'integer', min: 1, max: 100, default: 14, description: 'Period' }
  ],
  defaultInputs: { period: 14 }
};

const myIndicatorCalculator: IndicatorCalculator = (candles, inputs) => {
  const period = inputs.period as number;
  const closes = candles.map(c => c.close);
  
  // Ваша логика расчёта
  const values = closes.map((close, i) => {
    if (i < period - 1) return null;
    // Расчёт значения
    return someCalculation(closes.slice(i - period + 1, i + 1));
  });
  
  return {
    id: 'my_custom_indicator',
    name: `My Custom (${period})`,
    overlay: false,
    lines: [{
      name: 'main',
      data: buildLineData(candles, values),
      color: '#FF00FF'
    }],
    histograms: []
  };
};

// Регистрация
unifiedIndicatorService.registerIndicator(
  myIndicatorConfig, 
  myIndicatorCalculator,
  ['mci', 'my_indicator']  // Aliases
);

// Теперь можно использовать
const result = calculateIndicator('my_custom_indicator', candles, { period: 21 });
```

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/indicators` | GET | Список всех индикаторов |
| `/api/indicators/[id]` | GET | Конфигурация индикатора |
| `/api/indicators/calculate` | POST | Расчёт индикатора |

**Пример запроса:**

```bash
POST /api/indicators/calculate
{
  "indicator": "rsi",
  "symbol": "BTCUSDT",
  "timeframe": "1h",
  "inputs": { "length": 14 }
}
```

---

## Best Practices

### 1. Используйте Singleton

```typescript
// ✅ Правильно
import { calculateIndicator } from '@/lib/indicators/unified-indicator-service';

// ❌ Неправильно - не создавайте новые экземпляры
const service = new UnifiedIndicatorService();
```

### 2. Кэшируйте результаты для UI

```typescript
// В React компоненте используйте useMemo
const rsiData = useMemo(() => {
  return calculateIndicator('rsi', candles, { length: 14 });
}, [candles]);
```

### 3. Проверяйте на null

```typescript
const result = calculateIndicator('rsi', candles, { length: 14 });
if (!result) {
  console.warn('Индикатор не найден или недостаточно данных');
  return;
}
```

### 4. Обрабатывайте WhitespaceData

```typescript
// Некоторые точки могут быть null (недостаточно данных)
const lineData = result.lines[0].data;
const validPoints = lineData.filter(d => 'value' in d);
```

---

## Статус покрытия

| Категория | Функций | Документировано | UI |
|-----------|---------|-----------------|-----|
| Moving Averages | 14 | ✅ 100% | ✅ |
| Oscillators | 17 | ✅ 100% | ✅ |
| Volatility | 9 | ✅ 100% | ✅ |
| Volume | 7 | ✅ 100% | ✅ |
| Pivot Points | 5 | ✅ 100% | ✅ |
| Chart Types | 14 | ✅ 100% | ✅ |
| Candlestick Patterns | 24 | ✅ 100% | ⚠️ Маркеры |
| Depth Indicators | 6 | ✅ 100% | ⚠️ Частично |
| Advanced ML | 6 | ✅ 100% | ✅ |
| **ИТОГО** | **102+** | **100%** | **95%** |

---

*Документация обновлена: 13 марта 2026*
