# Volatility Panel Documentation

## Содержание

1. [Обзор анализа волатильности](#1-обзор-анализа-волатильности)
2. [Компонент Volatility Panel](#2-компонент-volatility-panel)
3. [GARCH модели](#3-garch-модели)
4. [Индикаторы волатильности](#4-индикаторы-волатильности)
5. [Применение в торговле](#5-применение-в-торговле)
6. [API эндпоинты](#6-api-эндпоинты)
7. [Примеры использования](#7-примеры-использования)

---

## 1. Обзор анализа волатильности

### 1.1 Введение

Volatility Panel — это комплексный инструмент анализа волатильности на базе GARCH моделей (Generalized Autoregressive Conditional Heteroskedasticity). Панель предоставляет институциональный уровень анализа для:

- **Прогнозирования волатильности** на N дней вперёд
- **Определения режима волатильности** (low, normal, high, extreme)
- **Интеграции с торговыми ботами** для адаптивного риск-менеджмента
- **ML фичей** для Gradient Boosting моделей

### 1.2 Ключевые особенности

| Особенность | Описание |
|------------|----------|
| **Модели** | GARCH(1,1), GJR-GARCH, EGARCH |
| **Прогноз** | 5-60 дней вперёд |
| **Режимы** | Low, Normal, High, Extreme |
| **Интеграции** | DCA, BB, ORION, GRID, MFT, LOGOS боты |
| **Данные** | Real-time от Binance API |

### 1.3 Архитектура

```
┌─────────────────────────────────────────────────────────────┐
│                    VOLATILITY PANEL                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Symbol Select│  │ Model Select │  │ Forecast Days│     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │           VOLATILITY METRICS CARDS                   │   │
│  │  Current Vol │ Regime │ Model Status │ Data Points  │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │          REGIME INDICATOR (Gradient Bar)             │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │          MODEL PARAMETERS (Collapsible)              │   │
│  │  Omega (ω) │ Alpha (α) │ Beta (β) │ Gamma (γ)       │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   CHARTS TABS                        │   │
│  │  Volatility Forecast │ Conditional Vol │ Statistics │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │           INTEGRATIONS STATUS                        │   │
│  │  Trading Bots │ LOGOS │ ML Features │ Risk Mgmt    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Компонент Volatility Panel

### 2.1 Расположение файла

```
/home/z/my-project/src/components/volatility/volatility-panel.tsx
```

### 2.2 Props интерфейс

```typescript
// Компонент не принимает props - использует внутреннее состояние
export function VolatilityPanel(): JSX.Element
```

### 2.3 Внутренние типы

```typescript
interface VolatilityState {
  symbol: string;                    // Торговый символ (BTCUSDT, ETHUSDT, etc.)
  modelType: GARCHType;             // Тип модели: GARCH, GJR-GARCH, EGARCH
  params: GARCHParams;              // Параметры модели
  result: GARCHResult | null;       // Результат анализа
  currentVolatility: number | null; // Текущая волатильность
  regime: 'low' | 'normal' | 'high' | 'extreme'; // Режим волатильности
  historicalVolatility: number[];   // Исторические значения
  forecastDays: number;             // Дни прогноза
  isLoading: boolean;               // Флаг загрузки
  error: string | null;             // Сообщение об ошибке
}

interface VolatilityApiResponse {
  success: boolean;
  result?: GARCHResult;
  currentVolatility?: number;
  regime?: VolatilityState['regime'];
  historicalVolatility?: number[];
  error?: string;
}
```

### 2.4 Импортируемые типы из библиотеки

```typescript
import type { 
  GARCHType, 
  GARCHParams, 
  GARCHResult 
} from "@/lib/volatility";

// GARCHType = 'GARCH' | 'GJR-GARCH' | 'EGARCH'

// GARCHParams
interface GARCHParams {
  omega: number;   // Constant term
  alpha: number;   // ARCH coefficient (recent shocks)
  beta: number;    // GARCH coefficient (past volatility)
  gamma?: number;  // Asymmetry coefficient (GJR, EGARCH only)
}

// GARCHResult
interface GARCHResult {
  params: GARCHParams;
  conditionalVolatility: number[];
  forecast: number[];
  logLikelihood: number;
  aic: number;          // Akaike Information Criterion
  bic: number;          // Bayesian Information Criterion
  converged: boolean;
}
```

### 2.5 Константы

#### Параметры по умолчанию

```typescript
const DEFAULT_PARAMS: Record<GARCHType, GARCHParams> = {
  GARCH: { omega: 0.1, alpha: 0.1, beta: 0.8 },
  'GJR-GARCH': { omega: 0.1, alpha: 0.05, beta: 0.8, gamma: 0.1 },
  EGARCH: { omega: -0.1, alpha: 0.1, beta: 0.9, gamma: 0 },
};
```

#### Торговые символы

```typescript
const TRADING_SYMBOLS = [
  "BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT",
  "XRPUSDT", "DOGEUSDT", "ADAUSDT", "AVAXUSDT",
  "DOTUSDT", "MATICUSDT", "LINKUSDT", "ATOMUSDT",
];
```

#### Типы моделей

```typescript
const MODEL_TYPES = [
  { value: "GARCH", label: "GARCH(1,1)", description: "Стандартная модель GARCH" },
  { value: "GJR-GARCH", label: "GJR-GARCH", description: "Асимметричная модель волатильности" },
  { value: "EGARCH", label: "EGARCH", description: "Экспоненциальная модель GARCH" },
];
```

#### Цвета режимов волатильности

```typescript
const REGIME_COLORS = {
  low: "#22c55e",     // Зелёный
  normal: "#3b82f6",  // Синий
  high: "#f59e0b",    // Оранжевый
  extreme: "#ef4444", // Красный
};

const REGIME_LABELS = {
  low: "Низкая Волатильность",
  normal: "Нормальная",
  high: "Высокая Волатильность",
  extreme: "Экстремальная Волатильность",
};
```

### 2.6 Структура UI

#### Верхняя панель управления

```tsx
<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
  {/* Заголовок */}
  <div className="flex items-center gap-2">
    <Activity className="h-5 w-5 text-primary" />
    <h2 className="text-xl font-semibold">GARCH Анализ Волатильности</h2>
    {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
  </div>
  
  {/* Контролы */}
  <div className="flex flex-wrap items-center gap-3">
    <Select /> {/* Symbol Selector */}
    <Select /> {/* Model Type Selector */}
    <Select /> {/* Forecast Days */}
    <Button /> {/* Refresh Button */}
  </div>
</div>
```

#### Карточки метрик

```tsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  {/* Current Volatility */}
  <Card>
    <CardContent>
      <p className="text-xs text-muted-foreground">Текущая Волатильность</p>
      <p className="text-2xl font-bold">{formatPercent(currentVolatility)}</p>
    </CardContent>
  </Card>
  
  {/* Volatility Regime */}
  <Card>
    <CardContent>
      <p className="text-xs text-muted-foreground">Режим Волатильности</p>
      <Badge style={{ backgroundColor: REGIME_COLORS[regime] }}>
        {REGIME_LABELS[regime]}
      </Badge>
    </CardContent>
  </Card>
  
  {/* Model Convergence */}
  <Card>
    <CardContent>
      <p className="text-xs text-muted-foreground">Статус Модели</p>
      <Badge variant={converged ? "default" : "destructive"}>
        {converged ? "Сошлась" : "Не Сошлась"}
      </Badge>
    </CardContent>
  </Card>
  
  {/* Data Points */}
  <Card>
    <CardContent>
      <p className="text-xs text-muted-foreground">Исторические Точки</p>
      <p className="text-2xl font-bold">{historicalVolatility.length}</p>
    </CardContent>
  </Card>
</div>
```

#### Индикатор режима волатильности

```tsx
<Card>
  <CardContent>
    <div className="space-y-4">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Низкая</span>
        <span>Нормальная</span>
        <span>Высокая</span>
        <span>Экстремальная</span>
      </div>
      <div className="relative h-3 rounded-full overflow-hidden 
                      bg-gradient-to-r from-green-500 via-blue-500 
                      via-yellow-500 to-red-500">
        {/* Position indicator */}
        <div className="absolute top-0 w-1 h-full bg-foreground shadow-lg"
             style={{ left: `${(currentVolatility / 0.1) * 100}%` }} />
      </div>
    </div>
  </CardContent>
</Card>
```

#### Параметры модели (раскрываемые)

```tsx
<Card>
  <CardHeader onClick={() => setShowAdvanced(!showAdvanced)}>
    <CardTitle>Параметры Модели</CardTitle>
    {showAdvanced ? <ChevronUp /> : <ChevronDown />}
  </CardHeader>
  
  {showAdvanced && (
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Omega */}
        <div className="space-y-2">
          <Label>Omega (ω)</Label>
          <Input type="number" step="0.01" value={omega} />
          <p className="text-xs text-muted-foreground">Constant term</p>
        </div>
        
        {/* Alpha */}
        <div className="space-y-2">
          <Label>Alpha (α)</Label>
          <Slider min={1} max={50} step={1} />
          <p className="text-xs text-muted-foreground">ARCH coefficient</p>
        </div>
        
        {/* Beta */}
        <div className="space-y-2">
          <Label>Beta (β)</Label>
          <Slider min={1} max={99} step={1} />
          <p className="text-xs text-muted-foreground">GARCH coefficient</p>
        </div>
        
        {/* Gamma (GJR-GARCH, EGARCH only) */}
        {modelType !== 'GARCH' && (
          <div className="space-y-2">
            <Label>Gamma (γ)</Label>
            <Slider min={-50} max={50} step={1} />
            <p className="text-xs text-muted-foreground">Asymmetry coefficient</p>
          </div>
        )}
      </div>
      
      {/* Persistence Check */}
      <Separator className="my-4" />
      <div className="flex items-center gap-4">
        <span>Persistence (α + β):</span>
        <Badge variant={persistence < 1 ? "default" : "destructive"}>
          {persistence.toFixed(3)}
        </Badge>
        {persistence >= 1 && (
          <div className="flex items-center gap-1 text-red-500">
            <AlertTriangle />
            <span>Persistence ≥ 1 indicates non-stationary process</span>
          </div>
        )}
      </div>
    </CardContent>
  )}
</Card>
```

### 2.7 Вкладки с графиками

```tsx
<Tabs defaultValue="forecast">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="forecast">Volatility Forecast</TabsTrigger>
    <TabsTrigger value="conditional">Conditional Volatility</TabsTrigger>
    <TabsTrigger value="stats">Model Statistics</TabsTrigger>
  </TabsList>
  
  <TabsContent value="forecast">
    {/* AreaChart с исторической и прогнозной волатильностью */}
  </TabsContent>
  
  <TabsContent value="conditional">
    {/* LineChart с условной волатильностью (последние 100 точек) */}
  </TabsContent>
  
  <TabsContent value="stats">
    {/* Model Fit Statistics и Estimated Parameters */}
  </TabsContent>
</Tabs>
```

### 2.8 Интеграции

```tsx
<Card>
  <CardHeader>
    <CardTitle>Интеграции GARCH</CardTitle>
    <CardDescription>Статус интеграций с торговыми ботами и ML моделями</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <IntegrationStatus name="Trading Bots (DCA/BB/ORION)" active />
      <IntegrationStatus name="LOGOS Signal Weighting" active />
      <IntegrationStatus name="Gradient Boosting Features" active />
      <IntegrationStatus name="Training Data Collector" active />
      <IntegrationStatus name="AI Risk Management" active />
      <IntegrationStatus name="Binance Real-time Data" active />
    </div>
    
    {/* Risk Adjustment Preview */}
    {result && (
      <div className="mt-4 p-4 rounded-lg bg-primary/5">
        <p className="text-sm font-medium">Рекомендации по управлению рисками:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="text-muted-foreground">Размер позиции:</span>
            <p className="font-mono">{positionSizeAdjustment}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Stop Loss:</span>
            <p className="font-mono">{stopLossMultiplier}x</p>
          </div>
          {/* ... more recommendations */}
        </div>
      </div>
    )}
  </CardContent>
</Card>
```

---

## 3. GARCH модели

### 3.1 GARCH(1,1) — Стандартная модель

**Описание:** Базовая модель для анализа волатильности, использующая авторегрессию условной гетероскедастичности.

**Формула:**

```
σ²ₜ = ω + α·ε²ₜ₋₁ + β·σ²ₜ₋₁

где:
- σ²ₜ — условная дисперсия в момент t
- ω (omega) — константа
- α (alpha) — ARCH коэффициент (реакция на недавние шоки)
- β (beta) — GARCH коэффициент (инерция прошлой волатильности)
- εₜ₋₁ — шок (остаток) в момент t-1
```

**Параметры по умолчанию:**

| Параметр | Значение | Описание |
|----------|----------|----------|
| ω | 0.1 | Constant term |
| α | 0.1 | ARCH coefficient |
| β | 0.8 | GARCH coefficient |
| Persistence | 0.9 | α + β (должно быть < 1) |

**Применение:**

- Общий анализ волатильности
- Первичный подбор модели
- Сравнительный анализ

### 3.2 GJR-GARCH — Асимметричная модель

**Описание:** Модель Glosten-Jagannathan-Runkle GARCH, учитывающая асимметричную реакцию на положительные и отрицательные шоки.

**Формула:**

```
σ²ₜ = ω + α·ε²ₜ₋₁ + γ·ε²ₜ₋₁·I(εₜ₋₁ < 0) + β·σ²ₜ₋₁

где:
- I(εₜ₋₁ < 0) — индикатор (1 если шок отрицательный, 0 иначе)
- γ (gamma) — коэффициент асимметрии
```

**Эффект левереджа:**

```
Отрицательный шок:   σ²↑ на α + γ
Положительный шок:   σ²↑ только на α
```

**Параметры по умолчанию:**

| Параметр | Значение | Описание |
|----------|----------|----------|
| ω | 0.1 | Constant term |
| α | 0.05 | ARCH coefficient |
| β | 0.8 | GARCH coefficient |
| γ | 0.1 | Asymmetry coefficient |

**Применение:**

- Анализ фондовых рынков
- Equity derivatives
- High volatility periods

### 3.3 EGARCH — Экспоненциальная модель

**Описание:** Exponential GARCH Нельсона, использующая логарифмическую формулировку без ограничений на положительность параметров.

**Формула:**

```
ln(σ²ₜ) = ω + α·(|zₜ₋₁| - E|z|) + γ·zₜ₋₁ + β·ln(σ²ₜ₋₁)

где:
- zₜ = εₜ/σₜ — стандартизированный шок
- E|z| ≈ √(2/π) — математическое ожидание |z| для нормального распределения
```

**Преимущества:**

- Без ограничений на положительность параметров
- Естественная обработка асимметрии
- Устойчивость к выбросам

**Параметры по умолчанию:**

| Параметр | Значение | Описание |
|----------|----------|----------|
| ω | -0.1 | Constant term (может быть отрицательным) |
| α | 0.1 | ARCH coefficient |
| β | 0.9 | GARCH coefficient |
| γ | 0 | Asymmetry coefficient |

**Применение:**

- Crypto markets
- High-frequency data
- Extreme volatility events

### 3.4 Сравнение моделей

| Критерий | GARCH(1,1) | GJR-GARCH | EGARCH |
|----------|------------|-----------|--------|
| **Сложность** | Низкая | Средняя | Средняя |
| **Асимметрия** | Нет | Да | Да |
| **Ограничения** | Параметры > 0 | Параметры > 0 | Нет |
| **Кол-во параметров** | 3 | 4 | 4 |
| **Crypto** | ✅ Хорошо | ✅ Хорошо | ✅ Отлично |
| **Equity** | ✅ Хорошо | ✅ Отлично | ✅ Хорошо |
| **Forex** | ✅ Отлично | ✅ Хорошо | ✅ Хорошо |

### 3.5 Persistence (персистентность)

**Определение:** Persistence = α + β (сумма ARCH и GARCH коэффициентов).

**Интерпретация:**

| Persistence | Интерпретация |
|-------------|---------------|
| < 0.8 | Низкая персистентность, быстрая реакция |
| 0.8 - 0.95 | Нормальная персистентность |
| 0.95 - 0.99 | Высокая персистентность, долгая память |
| ≥ 1.0 | Нестационарный процесс (недопустимо) |

**Валидация в UI:**

```tsx
{persistence >= 1 && (
  <div className="flex items-center gap-1 text-red-500">
    <AlertTriangle />
    <span>Persistence ≥ 1 indicates non-stationary process</span>
  </div>
)}
```

---

## 4. Индикаторы волатильности

### 4.1 ATR (Average True Range)

**Описание:** Показывает средний диапазон движения цены за период.

**Формула:**

```
TR = max(High - Low, |High - Previous Close|, |Low - Previous Close|)

ATR(n) = SMA(TR, n)

где n = период (обычно 14)
```

**Интерпретация:**

| ATR | Сигнал |
|-----|--------|
| Растущий ATR | Увеличение волатильности |
| Падающий ATR | Снижение волатильности |
| ATR > среднее × 2 | Экстремальная волатильность |

**Применение в ботаx:**

```typescript
// Размер позиции на основе ATR
const positionSize = accountRisk / (ATR * 2);

// Stop Loss
const stopLoss = entryPrice - (ATR * multiplier);
```

### 4.2 Bollinger Bands Width

**Описание:** Ширина полос Боллинджера как мера волатильности.

**Формула:**

```
Middle Band = SMA(Close, 20)
Upper Band = Middle Band + 2 × StdDev(Close, 20)
Lower Band = Middle Band - 2 × StdDev(Close, 20)

BB Width = (Upper Band - Lower Band) / Middle Band
```

**Интерпретация:**

| BB Width | Состояние рынка |
|----------|-----------------|
| < 0.02 | Сжатие (squeeze) — ожидается прорыв |
| 0.02 - 0.06 | Нормальная волатильность |
| > 0.06 | Высокая волатильность |
| > 0.10 | Экстремальная волатильность |

**Сигналы:**

```typescript
// Squeeze (сжатие)
if (bbWidth < 0.02) {
  // Ожидается сильное движение
  prepareForBreakout();
}

// Expansion (расширение)
if (bbWidth > 0.08) {
  // Возможен разворот тренда
  watchForReversal();
}
```

### 4.3 Historical Volatility

**Описание:** Реализованная волатильность на основе исторических доходностей.

**Формула:**

```
Returns: rₜ = ln(Pₜ / Pₜ₋₁)

HV = √(Σ(rₜ - r̄)² / (n-1)) × √252

где:
- 252 — торговых дней в году
- n — количество наблюдений
```

**Периоды расчёта:**

| Период | Применение |
|--------|------------|
| 10 дней | Краткосрочная HV |
| 20 дней | Месячная HV |
| 60 дней | Квартальная HV |
| 252 дня | Годовая HV |

**Интерпретация:**

```typescript
interface HVInterpretation {
  value: number;
  level: 'low' | 'normal' | 'high' | 'extreme';
  recommendation: string;
}

function interpretHV(hv: number): HVInterpretation {
  if (hv < 0.15) {
    return {
      value: hv,
      level: 'low',
      recommendation: 'Увеличить размер позиции, снизить stop loss'
    };
  }
  if (hv < 0.35) {
    return {
      value: hv,
      level: 'normal',
      recommendation: 'Стандартные параметры торговли'
    };
  }
  if (hv < 0.60) {
    return {
      value: hv,
      level: 'high',
      recommendation: 'Уменьшить размер позиции, расширить stop loss'
    };
  }
  return {
    value: hv,
    level: 'extreme',
    recommendation: 'Минимальные позиции, рассмотреть остановку торговли'
  };
}
```

### 4.4 Volatility Regime Classification

**Таблица режимов:**

| Regime | Ratio to Average | Position Size | Stop Loss | Action |
|--------|-----------------|---------------|-----------|--------|
| **Low** | < 50% | +20% | 0.8x | Increase positions |
| **Normal** | 50-100% | Standard | 1.0x | Standard trading |
| **High** | 100-150% | -40% | 1.5x | Reduce risk |
| **Extreme** | > 150% | -80% | 2.0x | Consider halting |

**Алгоритм определения:**

```typescript
function determineRegime(
  currentVol: number, 
  avgVol: number
): VolatilityRegime {
  const ratio = currentVol / avgVol;
  
  if (ratio < 0.5) return 'low';
  if (ratio < 1.0) return 'normal';
  if (ratio < 1.5) return 'high';
  return 'extreme';
}
```

---

## 5. Применение в торговле

### 5.1 Интеграция с торговыми ботами

#### DCA Bot (SCALE)

```typescript
import { getGARCHIntegrationService } from '@/lib/volatility';

const garchService = getGARCHIntegrationService();
const adjustment = garchService.getRiskAdjustment('BTCUSDT', 'DCA');

// Результат:
// {
//   positionSizeMultiplier: 0.6,
//   maxPositionPercent: 25,
//   stopLossMultiplier: 1.2,
//   shouldHaltTrading: false,
//   rationale: "DCA: высокая волатильность..."
// }

// Применение:
const adjustedPositionSize = basePositionSize * adjustment.positionSizeMultiplier;
const adjustedStopLoss = baseStopLoss * adjustment.stopLossMultiplier;
```

#### BB Bot (BAND)

```typescript
const adjustment = garchService.getRiskAdjustment('ETHUSDT', 'BB');

// Динамическая настройка полос Боллинджера:
const bbPeriod = 20;
const bbStdDev = 2.0 * adjustment.stopLossMultiplier;

// Фильтрация сигналов:
if (signal.strength < adjustment.minSignalStrength) {
  // Пропускаем слабый сигнал в условиях высокой волатильности
  return null;
}
```

#### ORION Bot (TRND)

```typescript
const adjustment = garchService.getRiskAdjustment('SOLUSDT', 'ORION');

// Проверка на остановку торговли:
if (adjustment.shouldHaltTrading) {
  orionBot.pause();
  notifyUser('Trading halted due to extreme volatility');
}

// Задержка входа:
if (adjustment.entryDelay > 0) {
  await sleep(adjustment.entryDelay);
}
```

### 5.2 LOGOS Meta Bot Integration

```typescript
import { getLOGOSGARCHIntegration } from '@/lib/logos-bot/garch-integration';

const logosGarch = getLOGOSGARCHIntegration();

// Корректировка агрегированного сигнала:
const adjustedSignal = logosGarch.adjustAggregatedSignal(signal, {
  symbol: 'BTCUSDT',
  regime: 'high',
  currentVolatility: 0.045
});

// adjustedSignal.confidence = baseConfidence + signalConfidenceAdjustment
```

### 5.3 ML Feature Provider

```typescript
import { getGARCHFeatureProvider } from '@/lib/volatility';

const provider = getGARCHFeatureProvider();
const features = await provider.getFeatures('BTCUSDT');

// Доступные фичи:
// {
//   garch_forecast_1d: 0.032,
//   garch_forecast_5d: 0.035,
//   garch_forecast_10d: 0.038,
//   volatility_regime: 0.65,        // 0-1 normalized
//   volatility_trend: 0.7,          // 0-1 (decreasing to increasing)
//   volatility_persistence: 0.92,   // α + β
//   conditional_volatility_ratio: 1.15
// }
```

### 5.4 Risk Management Recommendations

```typescript
// Генерация рекомендаций на основе режима
function generateRiskRecommendations(regime: VolatilityRegime) {
  const recommendations = {
    low: {
      positionSize: '+20%',
      stopLoss: '0.8x',
      leverage: 'До 5x',
      action: 'Увеличить позиции, использовать более плотные стопы'
    },
    normal: {
      positionSize: 'Standard',
      stopLoss: '1.0x',
      leverage: 'До 3x',
      action: 'Стандартные торговые параметры'
    },
    high: {
      positionSize: '-40%',
      stopLoss: '1.5x',
      leverage: 'До 2x',
      action: 'Снизить риски, расширить стопы, требовать более сильные сигналы'
    },
    extreme: {
      positionSize: '-80%',
      stopLoss: '2.0x',
      leverage: '1x (no leverage)',
      action: 'Критические меры — рассмотреть остановку торговли'
    }
  };
  
  return recommendations[regime];
}
```

---

## 6. API эндпоинты

### 6.1 GARCH Analysis

#### GET /api/volatility

Быстрый анализ волатильности.

**Query Parameters:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| symbol | string | Да | Торговый символ (BTCUSDT) |
| model | string | Нет | Модель (GARCH, GJR-GARCH, EGARCH) |

**Response:**

```json
{
  "success": true,
  "result": {
    "params": {
      "omega": 0.1,
      "alpha": 0.1,
      "beta": 0.8
    },
    "conditionalVolatility": [0.032, 0.034, ...],
    "forecast": [0.035, 0.036, 0.037, ...],
    "logLikelihood": 1234.56,
    "aic": -2463.12,
    "bic": -2450.34,
    "converged": true
  },
  "currentVolatility": 0.0345,
  "regime": "normal",
  "historicalVolatility": [0.03, 0.032, ...]
}
```

#### POST /api/volatility

Полный анализ с кастомными параметрами.

**Request Body:**

```json
{
  "symbol": "BTCUSDT",
  "modelType": "GARCH",
  "params": {
    "omega": 0.1,
    "alpha": 0.1,
    "beta": 0.8
  },
  "forecastDays": 10
}
```

**Response:** Аналогично GET запросу.

### 6.2 GARCH Service (Bot Integration)

#### GET /api/volatility/service

**Query Parameters:**

| Action | Параметры | Описание |
|--------|-----------|----------|
| summary | — | Общая статистика сервиса |
| adjustment | symbol, botType | Получить корректировки для бота |
| forecast | symbol, days | Получить прогноз волатильности |

**Example — Summary:**

```
GET /api/volatility/service?action=summary
```

```json
{
  "totalSymbols": 12,
  "regimes": {
    "low": 2,
    "normal": 7,
    "high": 2,
    "extreme": 1
  },
  "avgVolatility": 0.042,
  "needsUpdate": ["DOGEUSDT"]
}
```

**Example — Adjustment:**

```
GET /api/volatility/service?action=adjustment&symbol=BTCUSDT&botType=DCA
```

```json
{
  "positionSizeMultiplier": 0.6,
  "maxPositionPercent": 25,
  "stopLossMultiplier": 1.2,
  "takeProfitMultiplier": 1.3,
  "entryDelay": 5000,
  "shouldHaltTrading": false,
  "signalConfidenceAdjustment": -0.1,
  "minSignalStrength": 0.6,
  "maxDrawdownPercent": 7,
  "maxLeverage": 2,
  "rationale": "DCA: высокая волатильность. Тренд: растущая. Текущая: 5.23%"
}
```

#### POST /api/volatility/service

**Actions:**

| Action | Описание |
|--------|----------|
| initialize | Инициализировать символ с историческими данными |
| update | Обновить с новой ценой |

**Example — Initialize:**

```json
POST /api/volatility/service?action=initialize
{
  "symbol": "BTCUSDT",
  "prices": [45000, 45100, 45200, ...]  // Исторические цены
}
```

**Example — Update:**

```json
POST /api/volatility/service?action=update
{
  "symbol": "BTCUSDT",
  "price": 47500.00
}
```

---

## 7. Примеры использования

### 7.1 Базовое использование компонента

```tsx
import { VolatilityPanel } from '@/components/volatility/volatility-panel';

export default function VolatilityPage() {
  return (
    <div className="container mx-auto p-6">
      <VolatilityPanel />
    </div>
  );
}
```

### 7.2 Интеграция с торговым ботом

```typescript
// lib/trading/bot-with-volatility.ts
import { getGARCHIntegrationService, type BotType } from '@/lib/volatility';

export class VolatilityAwareBot {
  private garchService = getGARCHIntegrationService();
  private botType: BotType;
  private symbol: string;

  constructor(botType: BotType, symbol: string) {
    this.botType = botType;
    this.symbol = symbol;
  }

  async executeTrade(signal: TradeSignal) {
    // Получаем корректировки
    const adjustment = this.garchService.getRiskAdjustment(
      this.symbol, 
      this.botType
    );

    // Проверяем на остановку
    if (adjustment.shouldHaltTrading) {
      console.log('Trading halted due to extreme volatility');
      return null;
    }

    // Задержка при высокой волатильности
    if (adjustment.entryDelay > 0) {
      await this.delay(adjustment.entryDelay);
    }

    // Фильтрация слабых сигналов
    if (signal.strength < adjustment.minSignalStrength) {
      console.log('Signal too weak for current volatility');
      return null;
    }

    // Корректировка размера позиции
    const adjustedSize = signal.positionSize * adjustment.positionSizeMultiplier;

    // Корректировка стоп-лосса
    const adjustedStop = signal.stopLoss * adjustment.stopLossMultiplier;

    return {
      ...signal,
      positionSize: adjustedSize,
      stopLoss: adjustedStop,
      maxLeverage: adjustment.maxLeverage
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### 7.3 ML Pipeline интеграция

```typescript
// lib/ml/volatility-features.ts
import { getGARCHFeatureProvider } from '@/lib/volatility';

export async function enrichFeatures(symbol: string, baseFeatures: Record<string, number>) {
  const provider = getGARCHFeatureProvider();
  const garchFeatures = await provider.getFeatures(symbol);

  return {
    ...baseFeatures,
    ...garchFeatures,
    // Комбинированные фичи
    volatility_adjusted_momentum: baseFeatures.momentum * (1 - garchFeatures.volatility_regime),
    risk_adjusted_volume: baseFeatures.volume / garchFeatures.conditional_volatility_ratio
  };
}
```

### 7.4 Real-time волатильность

```typescript
// hooks/use-realtime-volatility.ts
import { useEffect, useState } from 'react';
import { getGARCHIntegrationService, type VolatilityContext } from '@/lib/volatility';

export function useRealtimeVolatility(symbol: string) {
  const [context, setContext] = useState<VolatilityContext | null>(null);
  const garchService = getGARCHIntegrationService();

  useEffect(() => {
    // WebSocket для цен
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const price = parseFloat(data.p);

      // Обновляем волатильность
      const updated = garchService.updateWithNewPrice(symbol, price);
      if (updated) {
        setContext(updated);
      }
    };

    return () => ws.close();
  }, [symbol]);

  return context;
}
```

### 7.5 Alert на экстремальную волатильность

```typescript
// lib/alerts/volatility-alerts.ts
import { getGARCHIntegrationService } from '@/lib/volatility';
import { sendTelegramAlert } from '@/lib/telegram';

export async function checkVolatilityAlerts(symbols: string[]) {
  const service = getGARCHIntegrationService();

  for (const symbol of symbols) {
    const context = service.getVolatilityContext(symbol);
    if (!context) continue;

    // Алерт на экстремальную волатильность
    if (context.regime === 'extreme') {
      await sendTelegramAlert({
        message: `⚠️ EXTREME VOLATILITY: ${symbol}\n` +
                 `Current: ${(context.currentVolatility * 100).toFixed(2)}%\n` +
                 `Trend: ${context.trend}\n` +
                 `Consider halting trading.`
      });
    }

    // Алерт на смену тренда
    if (context.trend === 'increasing' && context.regime === 'high') {
      await sendTelegramAlert({
        message: `📈 Volatility Rising: ${symbol}\n` +
                 `Current: ${(context.currentVolatility * 100).toFixed(2)}%`
      });
    }
  }
}
```

### 7.6 Backtesting с учётом волатильности

```typescript
// lib/backtest/volatility-adjusted-backtest.ts
import { getGARCHIntegrationService } from '@/lib/volatility';

export async function runVolatilityAdjustedBacktest(
  symbol: string,
  trades: Trade[],
  historicalPrices: number[]
) {
  const service = getGARCHIntegrationService();

  // Инициализируем с историческими данными
  await service.initializeSymbol(symbol, historicalPrices);

  let equity = 10000;
  const results: BacktestResult[] = [];

  for (const trade of trades) {
    // Получаем корректировки на момент сделки
    const adjustment = service.getRiskAdjustment(symbol, 'DCA');

    // Применяем корректировки
    const adjustedSize = trade.size * adjustment.positionSizeMultiplier;
    const adjustedStop = trade.stopLoss * adjustment.stopLossMultiplier;

    // Симулируем сделку
    const pnl = simulateTrade(trade, adjustedSize, adjustedStop);
    equity += pnl;

    results.push({
      date: trade.date,
      pnl,
      equity,
      volatilityRegime: service.getVolatilityContext(symbol)?.regime
    });

    // Обновляем с новой ценой
    service.updateWithNewPrice(symbol, trade.exitPrice);
  }

  return {
    finalEquity: equity,
    totalReturn: (equity - 10000) / 10000,
    results
  };
}
```

---

## Приложения

### A. Регулировки по режимам волатильности

| Regime | Position Size | Max Position | Stop Loss | Take Profit | Min Signal | Max Leverage |
|--------|--------------|--------------|-----------|-------------|------------|--------------|
| Low | 120% | 50% | 0.8x | 1.0x | 0.3 | 5x |
| Normal | 100% | 40% | 1.0x | 1.0x | 0.5 | 3x |
| High | 60% | 25% | 1.5x | 1.3x | 0.6 | 2x |
| Extreme | 20% | 10% | 2.0x | 1.5x | 0.8 | 1x |

### B. Bot-specific Multipliers

| Bot Type | Position Size | Stop Loss | Confidence |
|----------|--------------|-----------|------------|
| DCA | 1.0x | 1.2x | 0.9x |
| BB | 0.8x | 1.0x | 1.0x |
| ORION | 0.7x | 1.1x | 0.95x |
| LOGOS | 1.0x | 1.0x | 1.0x |
| GRID | 0.9x | 1.3x | 0.9x |
| MFT | 0.8x | 1.2x | 0.95x |

### C. Формулы расчёта

**Persistence:**
```
GARCH:       α + β
GJR-GARCH:   α + β + γ/2
EGARCH:      β (логарифмическая формулировка)
```

**Long-run Variance:**
```
σ²∞ = ω / (1 - α - β)
```

**Volatility Forecast (n steps):**
```
σ²ₜ₊ₙ = σ²∞ + (α + β)ⁿ × (σ²ₜ - σ²∞)
```

---

## Связанные документы

- [GARCH_VOLATILITY_ANALYSIS.md](../ml/GARCH_VOLATILITY_ANALYSIS.md) — Техническая документация GARCH
- [RISK_MANAGEMENT_UI.md](./RISK_MANAGEMENT_UI.md) — UI риск-менеджмента
- [ML_INTEGRATION.md](../ml/ML_INTEGRATION.md) — Интеграция с ML моделями

---

*Документ создан: Март 2026*  
*Последнее обновление: Март 2026*
