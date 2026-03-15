# Risk Management UI Components

**Версия:** 2.0  
**Последнее обновление:** Март 2026  
**Статус:** Production Ready

---

## Содержание

1. [Обзор](#обзор)
2. [Архитектура системы](#архитектура-системы)
3. [Компоненты](#компоненты)
   - [Risk Dashboard](#1-risk-dashboard)
   - [VaR Calculator Panel](#2-var-calculator-panel)
   - [Drawdown Monitor Panel](#3-drawdown-monitor-panel)
   - [Position Limiter Panel](#4-position-limiter-panel)
   - [Kill Switch Panel](#5-kill-switch-panel)
   - [AI Risk Panel](#6-ai-risk-panel)
4. [Метрики риска](#метрики-риска)
5. [Настройка лимитов](#настройка-лимитов)
6. [Kill Switch триггеры](#kill-switch-триггеры)
7. [API эндпоинты](#api-эндпоинты)
8. [WebSocket события](#websocket-события)
9. [Примеры использования](#примеры-использования)

---

## Обзор

Система управления рисками CITARION предоставляет комплексный набор инструментов для мониторинга и контроля торговых рисков в реальном времени. UI компоненты интегрированы с микросервисом `risk-monitor-service` и поддерживают WebSocket соединения для мгновенных обновлений.

### Ключевые возможности

| Функция | Описание |
|---------|----------|
| **Value at Risk (VaR)** | Расчет VaR тремя методами: Historical, Parametric, Monte Carlo |
| **Drawdown Monitoring** | Отслеживание просадок с многоуровневыми алертами |
| **Position Limits** | Ограничение позиций с Kelly Criterion оптимизацией |
| **Kill Switch** | Аварийное закрытие позиций с автоматическими триггерами |
| **AI Risk Manager** | ML-анализ рисков с аномалиями и рекомендациями |
| **GARCH Integration** | Автоматические корректировки на основе волатильности |

### Цветовая индикация уровней риска

```
┌─────────────────────────────────────────────────────────────────┐
│  LOW      │  MEDIUM      │  HIGH        │  CRITICAL           │
│  < 30%    │  30-50%      │  50-70%      │  > 70%              │
│  🟢 Green │  🟡 Yellow   │  🟠 Orange   │  🔴 Red             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Архитектура системы

```
┌─────────────────────────────────────────────────────────────────────┐
│                        RISK MANAGEMENT UI                           │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ Risk         │  │ VaR          │  │ Drawdown     │              │
│  │ Dashboard    │  │ Calculator   │  │ Monitor      │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ Position     │  │ Kill Switch  │  │ AI Risk      │              │
│  │ Limiter      │  │ Panel        │  │ Panel        │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
├─────────────────────────────────────────────────────────────────────┤
│                         useRiskMonitor Hook                         │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ • WebSocket connection management                           │   │
│  │ • Real-time risk state updates                              │   │
│  │ • Kill switch controls                                      │   │
│  │ • Alert management                                          │   │
│  └─────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────┤
│                              API Layer                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐   │
│  │ /api/risk       │  │ /api/risk/var   │  │ /api/risk/limits │   │
│  └─────────────────┘  └─────────────────┘  └──────────────────┘   │
├─────────────────────────────────────────────────────────────────────┤
│                    risk-monitor-service (Microservice)              │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ • Risk calculation engine                                   │   │
│  │ • VaR computation (3 methods)                               │   │
│  │ • Drawdown tracking                                         │   │
│  │ • Kill switch execution                                     │   │
│  │ • GARCH volatility modeling                                 │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Компоненты

### 1. Risk Dashboard

**Файл:** `src/components/risk-management/risk-dashboard.tsx`  
**Альтернативный:** `src/components/panels/risk-dashboard.tsx`

Главный компонент управления рисками, объединяющий все подсистемы в едином интерфейсе.

#### Props

```typescript
interface RiskDashboardProps {
  // Props не требуются - компонент получает данные через API/WebSocket
}

interface ApiRiskReport {
  timestamp: number;
  var: {
    var: number;
    expectedShortfall: number;
    confidenceLevel: number;
    riskPercentage: number;
  };
  exposure: {
    total: number;
    bySymbol: Record<string, number>;
    byExchange: Record<string, number>;
  };
  drawdown: {
    state: {
      currentDrawdown: number;
      level: string;
      duration: number;
    };
    daily: number;
    weekly: number;
    monthly: number;
  };
  riskScore: number;
  recommendations: string[];
  volatilityRegime: string;
  garchAdjustments: {
    varMultiplier: number;
    positionSizeMultiplier: number;
    stopLossMultiplier: number;
  };
  bots: {
    total: number;
    running: number;
    stopped: number;
    riskLevel: string;
  };
  killSwitch: {
    isArmed: boolean;
    isTriggered: boolean;
    triggerReason?: string;
    botsStopped: number;
  };
}
```

#### Структура

```
RiskDashboard
├── Header (Risk Score, Kill Switch Status)
├── Tabs
│   ├── Overview Tab
│   │   ├── Quick Stats Grid
│   │   ├── Recommendations
│   │   └── Quick Access Panels
│   ├── VaR Tab → VaRCalculatorPanel
│   ├── Limits Tab → PositionLimiterPanel
│   ├── Drawdown Tab → DrawdownMonitorPanel
│   └── Kill Switch Tab → KillSwitchPanel
└── WebSocket Status Indicator
```

#### Использование

```tsx
import { RiskDashboard } from '@/components/risk-management/risk-dashboard';

export function RiskPage() {
  return (
    <div className="container mx-auto p-4">
      <RiskDashboard />
    </div>
  );
}
```

#### Особенности

- **Автообновление:** Каждые 30 секунд через API
- **WebSocket:** Мгновенные обновления через `useRiskMonitor` hook
- **Интеграция GARCH:** Автоматические корректировки на основе прогноза волатильности

---

### 2. VaR Calculator Panel

**Файл:** `src/components/risk-management/var-calculator-panel.tsx`

Калькулятор Value at Risk с тремя методами расчета и визуализацией распределения.

#### Props

```typescript
type VaRMethod = "historical" | "parametric" | "monte_carlo";

interface VaRConfig {
  confidenceLevel: number;    // 0.90 - 0.99
  timeHorizon: number;        // 1 - 10 дней
  method: VaRMethod;
  monteCarloSimulations?: number;
  lookbackPeriod: number;     // Период ретроспективы
}

interface VaRResult {
  var: number;                // VaR значение в $
  expectedShortfall: number;  // CVaR в $
  confidenceLevel: number;
  timeHorizon: number;
  method: VaRMethod;
  timestamp: number;
  portfolioValue: number;
  riskPercentage: number;     // VaR как % портфеля
}

interface VaRCalculatorPanelProps {
  portfolioValue?: number;        // По умолчанию: 100000
  returns?: number[];             // Исторические доходности
  onCalculate?: (config: VaRConfig) => Promise<VaRResult>;
  className?: string;
}
```

#### Методы расчета VaR

| Метод | Описание | Особенности |
|-------|----------|-------------|
| **Historical** | Использует реальное историческое распределение | Без предположений о нормальности |
| **Parametric** | Предполагает нормальное распределение | Variance-Covariance метод |
| **Monte Carlo** | Симуляция будущих доходностей | 10,000 симуляций по умолчанию |

#### Уровни риска

```typescript
const getRiskLevel = (riskPct: number) => {
  if (riskPct < 3) return { level: "Low", color: "text-green-600" };
  if (riskPct < 6) return { level: "Medium", color: "text-yellow-600" };
  if (riskPct < 10) return { level: "High", color: "text-orange-600" };
  return { level: "Critical", color: "text-red-600" };
};
```

#### Использование

```tsx
import { VaRCalculatorPanel } from '@/components/risk-management/var-calculator-panel';

export function RiskAnalysisPage() {
  const handleCalculate = async (config: VaRConfig) => {
    const result = await fetch('/api/risk/var/calculate', {
      method: 'POST',
      body: JSON.stringify(config)
    }).then(r => r.json());
    return result;
  };

  return (
    <VaRCalculatorPanel 
      portfolioValue={150000}
      onCalculate={handleCalculate}
    />
  );
}
```

#### Визуализация

```
┌─────────────────────────────────────────────────────────────────┐
│ VaR Calculator                                    [Calculate]   │
├─────────────────────────────────────────────────────────────────┤
│ Method: [Historical ▼]  Confidence: 95%  Horizon: 1 day        │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐    │
│ │ Value at Risk   │ │ Expected Short. │ │ Risk Metrics    │    │
│ │   $2,847.50     │ │   $3,912.30     │ │ Confidence: 95% │    │
│ │   2.85% of port │ │ Average beyond  │ │ Horizon: 1 day  │    │
│ │   [MEDIUM RISK] │ │ VaR threshold   │ │ Time: 14:32:15  │    │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│ [Distribution] [Historical Trend]                               │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │         ▄▄▄▄▄                                               ││
│ │       ▄▀     ▀▄                                             ││
│ │     ▄▀         ▀▄                                           ││
│ │   ▄▀             ▀▄                                         ││
│ │ ▄▀                 ▀▄                                       ││
│ └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

### 3. Drawdown Monitor Panel

**Файл:** `src/components/risk-management/drawdown-monitor-panel.tsx`

Мониторинг просадок с многоуровневой системой предупреждений и визуализацией equity curve.

#### Props

```typescript
type DrawdownLevel = "none" | "warning" | "critical" | "breach";

interface DrawdownThresholds {
  warning: number;           // Уровень предупреждения (0.05 = 5%)
  critical: number;          // Критический уровень (0.10 = 10%)
  breach: number;            // Уровень срабатывания kill switch (0.20 = 20%)
  recoveryThreshold: number; // Порог восстановления (0.02 = 2%)
}

interface DrawdownState {
  currentDrawdown: number;   // Текущая просадка
  peakEquity: number;        // Пиковый капитал
  currentEquity: number;     // Текущий капитал
  level: DrawdownLevel;      // Текущий уровень
  duration: number;          // Длительность в мс
  startedAt: number | null;  // Время начала просадки
  maxDrawdown: number;       // Максимальная просадка за период
  recoveryPct: number;       // % восстановления
}

interface DrawdownMetrics {
  state: DrawdownState;
  daily: number;             // Дневная просадка
  weekly: number;            // Недельная просадка
  monthly: number;           // Месячная просадка
  avgRecoveryTime: number;   // Среднее время восстановления
  drawdownCount: number;     // Количество просадок за период
}

interface DrawdownMonitorPanelProps {
  thresholds?: DrawdownThresholds;
  metrics?: DrawdownMetrics;
  onUpdate?: (thresholds: DrawdownThresholds) => void;
  className?: string;
}
```

#### Уровни просадки по умолчанию

```typescript
const defaultThresholds: DrawdownThresholds = {
  warning: 0.05,   // 5% - желтое предупреждение
  critical: 0.10,  // 10% - оранжевое предупреждение
  breach: 0.20,    // 20% - красный, триггер kill switch
  recoveryThreshold: 0.02,  // 2% - порог сброса алертов
};
```

#### Цветовая индикация

| Уровень | Диапазон | Цвет | Действие |
|---------|----------|------|----------|
| None | 0-5% | 🟢 Green | Нормальная работа |
| Warning | 5-10% | 🟡 Yellow | Уведомление |
| Critical | 10-20% | 🟠 Orange | Рекомендация снизить риски |
| Breach | >20% | 🔴 Red | Kill Switch триггер |

#### Использование

```tsx
import { DrawdownMonitorPanel } from '@/components/risk-management/drawdown-monitor-panel';

export function DrawdownPage() {
  const handleThresholdUpdate = (thresholds: DrawdownThresholds) => {
    // Сохранение настроек
    fetch('/api/risk/thresholds', {
      method: 'PUT',
      body: JSON.stringify(thresholds)
    });
  };

  return (
    <DrawdownMonitorPanel 
      onUpdate={handleThresholdUpdate}
    />
  );
}
```

#### Структура UI

```
┌─────────────────────────────────────────────────────────────────┐
│ Drawdown Monitor                          [Settings] [Normal]   │
├─────────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────────────────────────────┐  │
│ │ Current Drawdown: 7.00%                                   │  │
│ │ ┌───────────────────────────────────────────────────────┐ │  │
│ │ │ ▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │ │  │
│ │ │ 0%    5% Warn    10% Crit    20% Breach              │ │  │
│ │ └───────────────────────────────────────────────────────┘ │  │
│ └───────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│ │ Peak Eq  │ │ Curr Eq  │ │ Duration │ │ Recovery │           │
│ │ $105,000 │ │ $97,650  │ │ 2d 0h    │ │ 42%      │           │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
├─────────────────────────────────────────────────────────────────┤
│ Period Drawdowns                                                │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐                         │
│ │ Daily    │ │ Weekly   │ │ Monthly  │                         │
│ │ 3.50%    │ │ 7.00%    │ │ 12.00%   │                         │
│ └──────────┘ └──────────┘ └──────────┘                         │
├─────────────────────────────────────────────────────────────────┤
│ Equity Curve                                                    │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │     ___/\___                      Peak (dashed line)        ││
│ │ ___/        \___                                             ││
│ │                  \___    Equity (solid line)                ││
│ └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

### 4. Position Limiter Panel

**Файл:** `src/components/risk-management/position-limiter-panel.tsx`

Управление лимитами позиций с Kelly Criterion калькулятором для оптимального размера позиции.

#### Props

```typescript
interface PositionLimits {
  maxPositionSize: number;        // Макс. размер позиции ($)
  maxTotalExposure: number;       // Макс. общий экспозиция ($)
  maxPositionsPerSymbol: number;  // Макс. позиций на символ
  maxTotalPositions: number;      // Макс. всего позиций
  maxLeverage: number;            // Макс. плечо (x)
  maxCorrelation: number;         // Макс. корреляция (0-1)
  maxSectorExposure: number;      // Макс. секторная экспозиция (0-1)
  maxSingleAssetExposure: number; // Макс. экспозиция на актив (0-1)
}

interface KellyParams {
  winRate: number;      // Винрейт (0-1)
  avgWin: number;       // Средняя прибыль ($)
  avgLoss: number;      // Средний убыток ($)
  fraction?: number;    // Доля Kelly (0.25 = quarter Kelly)
  maxRisk?: number;     // Макс. риск на сделку (0.02 = 2%)
}

interface KellyResult {
  kellyFraction: number;     // Полный Kelly
  adjustedFraction: number;  // Скорректированный Kelly
  riskAmount: number;        // Сумма риска
  suggestedSize: number;     // Рекомендуемый размер
  edge: number;              // Математическое ожидание
  odds: number;              // Отношение прибыль/убыток
}

interface PositionLimiterPanelProps {
  limits?: PositionLimits;
  currentExposure?: number;
  currentPositions?: number;
  onLimitsChange?: (limits: PositionLimits) => void;
  className?: string;
}
```

#### Лимиты по умолчанию

```typescript
const defaultLimits: PositionLimits = {
  maxPositionSize: 10000,      // $10,000
  maxTotalExposure: 100000,    // $100,000
  maxPositionsPerSymbol: 2,
  maxTotalPositions: 20,
  maxLeverage: 10,             // 10x
  maxCorrelation: 0.7,         // 70%
  maxSectorExposure: 0.3,      // 30%
  maxSingleAssetExposure: 0.2, // 20%
};
```

#### Kelly Criterion

Формула Kelly Criterion:

```
K = W - (1 - W) / R

где:
  K = Kelly Fraction
  W = Win Rate
  R = Average Win / Average Loss (Odds Ratio)
```

Пример расчета:

```typescript
// Win Rate: 55%, Avg Win: $500, Avg Loss: $300
const odds = 500 / 300;  // 1.67
const kelly = 0.55 - (1 - 0.55) / 1.67;  // 0.28 (28%)

// Quarter Kelly (более консервативный)
const adjustedKelly = 0.28 * 0.25;  // 0.07 (7%)
```

#### Использование

```tsx
import { PositionLimiterPanel } from '@/components/risk-management/position-limiter-panel';

export function LimitsPage() {
  const handleLimitsChange = (limits: PositionLimits) => {
    fetch('/api/risk/limits', {
      method: 'PUT',
      body: JSON.stringify(limits)
    });
  };

  return (
    <PositionLimiterPanel 
      currentExposure={45000}
      currentPositions={8}
      onLimitsChange={handleLimitsChange}
    />
  );
}
```

#### Визуализация

```
┌─────────────────────────────────────────────────────────────────┐
│ Position Limiter              [Kelly Criterion] [Configure ▼]   │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────┐ ┌─────────────────────────┐        │
│ │ Total Exposure          │ │ Active Positions        │        │
│ │ $45,000 / $100,000      │ │ 8 / 20 max              │        │
│ │ ▓▓▓▓▓░░░░░░░░░░░░░ 45%  │ │ ▓▓▓▓░░░░░░░░░░░░░░░ 40% │        │
│ │ [Moderate]              │ │                         │        │
│ └─────────────────────────┘ └─────────────────────────┘        │
├─────────────────────────────────────────────────────────────────┤
│ Exposure by Asset          │ Limits Utilization                  │
│ ┌─────────────────────┐   │ ┌─────────────────────────────────┐│
│ │     BTC 35%         │   │ │ Position    ▓▓░░ Max           ││
│ │     ETH 28%         │   │ │ Exposure    ▓▓▓▓▓░ Max         ││
│ │     SOL 22%         │   │ │ Positions   ▓▓▓▓░ Max          ││
│ │     Others 15%      │   │ │ Leverage    ▓▓▓░ Max           ││
│ └─────────────────────┘   │ └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│ Current Limits Summary                                          │
│ ┌────────────────────┬──────────────┬────────────────┐         │
│ │ Limit              │ Value        │ Status         │         │
│ ├────────────────────┼──────────────┼────────────────┤         │
│ │ Max Position Size  │ $10,000      │ ✓ Active       │         │
│ │ Max Total Exposure │ $100,000     │ ✓ Moderate     │         │
│ │ Max Leverage       │ 10x          │ ✓ Active       │         │
│ │ Max Positions/Sym  │ 2            │ ✓ Active       │         │
│ └────────────────────┴──────────────┴────────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

---

### 5. Kill Switch Panel

**Файл:** `src/components/risk-management/kill-switch-panel.tsx`

Аварийная система закрытия всех позиций с автоматическими триггерами и историей срабатываний.

#### Props

```typescript
type KillSwitchTrigger = "manual" | "drawdown" | "var_breach" | "correlation" | "liquidity" | "error";
type KillSwitchState = "armed" | "triggered" | "recovering" | "disarmed";

interface KillSwitchConfig {
  autoTrigger: boolean;
  triggers: {
    drawdown: boolean;
    varBreach: boolean;
    correlation: boolean;
    liquidity: boolean;
  };
  thresholds: {
    drawdownPct: number;      // Порог просадки (0.20 = 20%)
    varMultiplier: number;    // Множитель VaR (3.0 = 3x VaR)
    correlationLimit: number; // Лимит корреляции (0.9 = 90%)
    liquidityMin: number;     // Мин. ликвидность ($)
  };
  recoveryMode: "automatic" | "manual";
  recoveryCooldown: number;   // Время восстановления (мс)
}

interface KillSwitchStatus {
  state: KillSwitchState;
  trigger?: KillSwitchTrigger;
  triggeredAt?: number;
  canRecoverAt?: number;
  positionsClosed: number;
  pnlSaved: number;
  triggerHistory: KillSwitchEvent[];
}

interface KillSwitchEvent {
  id: string;
  timestamp: number;
  trigger: KillSwitchTrigger;
  equity: number;
  drawdown: number;
  positionsClosed: number;
  recovered: boolean;
  recoveredAt?: number;
}

interface KillSwitchPanelProps {
  config?: KillSwitchConfig;
  status?: KillSwitchStatus;
  onArm?: () => Promise<void>;
  onDisarm?: () => Promise<void>;
  onTrigger?: (trigger: KillSwitchTrigger) => Promise<void>;
  onRecover?: () => Promise<void>;
  onConfigChange?: (config: KillSwitchConfig) => void;
  className?: string;
}
```

#### Состояния Kill Switch

| Состояние | Описание | Действие |
|-----------|----------|----------|
| **Disarmed** | Kill Switch отключен | Не мониторит триггеры |
| **Armed** | Активен и мониторит | Автоматическое срабатывание при триггерах |
| **Triggered** | Сработал | Все позиции закрыты, торговля остановлена |
| **Recovering** | Восстановление | Готов к повторной активации |

#### Автоматические триггеры

```typescript
const defaultConfig: KillSwitchConfig = {
  autoTrigger: true,
  triggers: {
    drawdown: true,      // Срабатывание при просадке
    varBreach: true,     // Срабатывание при VaR breach
    correlation: true,   // Срабатывание при высокой корреляции
    liquidity: false,    // Срабатывание при низкой ликвидности
  },
  thresholds: {
    drawdownPct: 0.20,      // 20% просадка
    varMultiplier: 3.0,     // 3x VaR
    correlationLimit: 0.9,  // 90% корреляция
    liquidityMin: 1000,     // $1,000 мин. ликвидность
  },
  recoveryMode: "manual",
  recoveryCooldown: 24 * 60 * 60 * 1000, // 24 часа
};
```

#### Использование

```tsx
import { KillSwitchPanel } from '@/components/risk-management/kill-switch-panel';

export function EmergencyPage() {
  const handleArm = async () => {
    await fetch('/api/risk/killswitch/arm', { method: 'POST' });
  };

  const handleTrigger = async (trigger: KillSwitchTrigger) => {
    await fetch('/api/risk/killswitch/trigger', {
      method: 'POST',
      body: JSON.stringify({ trigger })
    });
  };

  return (
    <KillSwitchPanel 
      onArm={handleArm}
      onTrigger={handleTrigger}
    />
  );
}
```

#### UI структура

```
┌─────────────────────────────────────────────────────────────────┐
│ Kill Switch                                          [Settings]  │
├─────────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────────────────────────────┐  │
│ │  🔒 ARMED                                                 │  │
│ │  Active - Monitoring for triggers                         │  │
│ │                                                           │  │
│ │  Positions Closed: 0      PnL Saved: $0                   │  │
│ │  Auto Trigger: ✓          Recovery: Manual                │  │
│ │                                                           │  │
│ │  [Disarm]              [⚠️ Trigger Manually]              │  │
│ └───────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│ Auto Trigger Configuration                                      │
│ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐       │
│ │ Drawdown  │ │ VaR Breach│ │Correlation│ │ Liquidity │       │
│ │    ✓ ON   │ │    ✓ ON   │ │    ✓ ON   │ │    ○ OFF  │       │
│ │  @ 20%    │ │  @ 3x VaR │ │  @ 90%    │ │  < $1,000 │       │
│ └───────────┘ └───────────┘ └───────────┘ └───────────┘       │
├─────────────────────────────────────────────────────────────────┤
│ Trigger History                                                 │
│ ┌──────────────────────────────────────────────────────────────┐│
│ │ Date       │ Trigger   │ Equity │ DD%  │ Closed │ Status    ││
│ │ 2026-03-06 │ Drawdown  │ $85,000│ 22%  │   5    │ Recovered ││
│ │ 2026-02-13 │ VaR Breach│ $92,000│  8%  │   3    │ Recovered ││
│ └──────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

### 6. AI Risk Panel

**Файл:** `src/components/ai-risk/ai-risk-panel.tsx`

ML-powered анализ рисков с обнаружением аномалий и рекомендациями по хеджированию.

#### Props

```typescript
interface RiskMetrics {
  overall: number;              // Общий риск-скор (0-100)
  components: {
    market: number;             // Рыночный риск
    liquidity: number;          // Риск ликвидности
    volatility: number;         // Риск волатильности
    correlation: number;        // Корреляционный риск
    tail: number;               // Tail risk
  };
  recommendation: 'reduce' | 'maintain' | 'increase';
}

interface Anomaly {
  type: string;                 // Тип аномалии
  severity: string;             // critical, high, medium, low
  score: number;                // Score аномалии (0-1)
  description: string;          // Описание
}

interface PositionSizing {
  recommended: number;          // Рекомендуемый размер (%)
  maxAllowed: number;           // Макс. разрешенный (%)
  current: number;              // Текущий (%)
}

interface HedgingInfo {
  ratio: number;                // Hedge ratio (0-1)
  recommendations: string[];    // Рекомендации по хеджированию
  cost: number;                 // Стоимость хеджирования (%)
}
```

#### Вкладки интерфейса

1. **Overview** - Общий риск-скор и компоненты
2. **Anomalies** - Обнаруженные аномалии рынка
3. **Sizing** - Рекомендации по размеру позиции (Kelly Criterion)

#### Использование

```tsx
import { AIRiskPanel } from '@/components/ai-risk/ai-risk-panel';

export function AIRiskPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <AIRiskPanel />
      <OtherRiskComponent />
    </div>
  );
}
```

#### Визуализация

```
┌─────────────────────────────────────────────────────────────────┐
│ AI Risk Manager                                Risk: 45%        │
├─────────────────────────────────────────────────────────────────┤
│ [Overview] [Anomalies] [Sizing]                                 │
├─────────────────────────────────────────────────────────────────┤
│                    Overall Risk Score                           │
│                         45                                      │
│ ▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│                    [→ Maintain]                                 │
├─────────────────────────────────────────────────────────────────┤
│ Risk Components                                                 │
│ market      ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 42            │
│ liquidity   ▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 28            │
│ volatility  ▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░ 55            │
│ correlation ▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 38            │
│ tail        ▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░ 52            │
├─────────────────────────────────────────────────────────────────┤
│ Position Sizing                                                │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ Recommended: 8%    Current: 6%    Max Allowed: 15%         ││
│ └─────────────────────────────────────────────────────────────┘│
│ Kelly Criterion: 8.5% [Half-Kelly Applied]                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Метрики риска

### VaR (Value at Risk)

**Определение:** Максимальный ожидаемый убыток за определенный период с заданной вероятностью.

```typescript
// Пример расчета VaR
const portfolioValue = 100000;
const confidenceLevel = 0.95;  // 95%
const timeHorizon = 1;         // 1 день
const dailyVolatility = 0.02;  // 2% дневная волатильность

// Parametric VaR
const var95 = portfolioValue * dailyVolatility * 1.645;  // ~$3,290
```

### Expected Shortfall (CVaR)

**Определение:** Средний убыток при превышении VaR порога.

```typescript
// Expected Shortfall обычно на 20-40% выше VaR
const expectedShortfall = var95 * 1.3;  // ~$4,277
```

### Drawdown

**Определение:** Снижение капитала от пикового значения.

```typescript
interface DrawdownCalculation {
  peakEquity: number;       // Максимальный капитал
  currentEquity: number;    // Текущий капитал
  drawdown: number;         // (peak - current) / peak
  recoveryRequired: number; // drawdown / (1 - drawdown)
}

// Пример: 20% просадка требует 25% роста для восстановления
// recoveryRequired = 0.20 / (1 - 0.20) = 0.25 (25%)
```

### Sharpe Ratio

```typescript
const sharpeRatio = (portfolioReturn - riskFreeRate) / portfolioStdDev;

// Интерпретация:
// < 1.0  - Плохо
// 1.0 - 2.0 - Хорошо
// 2.0 - 3.0 - Отлично
// > 3.0  - Превосходно
```

### Kelly Criterion

```typescript
// Формула Kelly
const kellyFraction = winRate - (1 - winRate) / oddsRatio;

// Рекомендации:
// - Quarter Kelly (25%) - консервативный подход
// - Half Kelly (50%) - умеренный подход
// - Full Kelly (100%) - агрессивный (не рекомендуется)
```

---

## Настройка лимитов

### Позиционные лимиты

```typescript
interface RecommendedLimits {
  // Консервативный профиль
  conservative: {
    maxPositionSize: 5000;
    maxTotalExposure: 50000;
    maxLeverage: 3;
    maxPositionsPerSymbol: 1;
  };
  
  // Умеренный профиль
  moderate: {
    maxPositionSize: 10000;
    maxTotalExposure: 100000;
    maxLeverage: 10;
    maxPositionsPerSymbol: 2;
  };
  
  // Агрессивный профиль
  aggressive: {
    maxPositionSize: 25000;
    maxTotalExposure: 250000;
    maxLeverage: 20;
    maxPositionsPerSymbol: 3;
  };
}
```

### Пороги просадки

```typescript
interface RecommendedDrawdownThresholds {
  // Консервативный
  conservative: {
    warning: 0.03;   // 3%
    critical: 0.05;  // 5%
    breach: 0.10;    // 10%
  };
  
  // Умеренный
  moderate: {
    warning: 0.05;   // 5%
    critical: 0.10;  // 10%
    breach: 0.20;    // 20%
  };
  
  // Агрессивный
  aggressive: {
    warning: 0.10;   // 10%
    critical: 0.15;  // 15%
    breach: 0.30;    // 30%
  };
}
```

### API для сохранения настроек

```typescript
// Сохранение лимитов
await fetch('/api/risk/limits', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    maxPositionSize: 10000,
    maxTotalExposure: 100000,
    maxLeverage: 10,
  })
});

// Сохранение порогов
await fetch('/api/risk/thresholds', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    warning: 0.05,
    critical: 0.10,
    breach: 0.20,
  })
});
```

---

## Kill Switch триггеры

### Типы триггеров

| Триггер | Описание | Порог по умолчанию |
|---------|----------|-------------------|
| `manual` | Ручной запуск | - |
| `drawdown` | Превышение просадки | 20% |
| `var_breach` | Превышение VaR | 3x VaR |
| `correlation` | Высокая корреляция | 90% |
| `liquidity` | Низкая ликвидность | $1,000 |
| `error` | Системная ошибка | - |

### Логика срабатывания

```typescript
function checkKillSwitchTriggers(
  riskReport: ApiRiskReport,
  config: KillSwitchConfig
): KillSwitchTrigger | null {
  
  // Проверка просадки
  if (config.triggers.drawdown && 
      riskReport.drawdown.state.currentDrawdown >= config.thresholds.drawdownPct) {
    return 'drawdown';
  }
  
  // Проверка VaR breach
  if (config.triggers.varBreach && 
      riskReport.var.riskPercentage >= config.thresholds.varMultiplier * 2.85) {
    return 'var_breach';
  }
  
  // Проверка корреляции
  if (config.triggers.correlation && 
      riskReport.exposure.correlation >= config.thresholds.correlationLimit) {
    return 'correlation';
  }
  
  // Проверка ликвидности
  if (config.triggers.liquidity && 
      riskReport.exposure.liquidity <= config.thresholds.liquidityMin) {
    return 'liquidity';
  }
  
  return null;
}
```

### Восстановление после срабатывания

```typescript
// Процесс восстановления
const recoveryProcess = {
  // 1. Проверка cooldown периода
  cooldownExpired: status.canRecoverAt <= Date.now(),
  
  // 2. Инициация восстановления
  initiateRecovery: async () => {
    await fetch('/api/risk/killswitch/recover', { method: 'POST' });
  },
  
  // 3. Повторная активация
  armKillSwitch: async () => {
    await fetch('/api/risk/killswitch/arm', { method: 'POST' });
  }
};
```

---

## API эндпоинты

### Risk Report

```http
GET /api/risk
```

**Response:**
```json
{
  "success": true,
  "data": {
    "timestamp": 1709500000000,
    "var": {
      "var": 2847.50,
      "expectedShortfall": 3912.30,
      "confidenceLevel": 0.95,
      "riskPercentage": 2.85
    },
    "exposure": {
      "total": 45000,
      "bySymbol": {
        "BTC": 15750,
        "ETH": 12600,
        "SOL": 9900
      }
    },
    "drawdown": {
      "state": {
        "currentDrawdown": 7.0,
        "level": "warning"
      },
      "daily": 3.5,
      "weekly": 7.0,
      "monthly": 12.0
    },
    "riskScore": 45,
    "recommendations": [
      "Consider reducing BTC exposure",
      "Monitor correlation between positions"
    ]
  }
}
```

### VaR Calculate

```http
POST /api/risk/var/calculate
```

**Request:**
```json
{
  "confidenceLevel": 0.95,
  "timeHorizon": 1,
  "method": "historical",
  "portfolioValue": 100000
}
```

**Response:**
```json
{
  "var": 2847.50,
  "expectedShortfall": 3912.30,
  "riskPercentage": 2.85
}
```

### Kill Switch Operations

```http
# Arm Kill Switch
POST /api/risk/killswitch/arm

# Disarm Kill Switch
POST /api/risk/killswitch/disarm

# Trigger Kill Switch
POST /api/risk/killswitch/trigger
{
  "reason": "Manual trigger from dashboard"
}

# Recover from Kill Switch
POST /api/risk/killswitch/recover
```

### Position Limits

```http
# Get limits
GET /api/risk/limits

# Update limits
PUT /api/risk/limits
{
  "maxPositionSize": 10000,
  "maxTotalExposure": 100000,
  "maxLeverage": 10
}
```

### Drawdown Thresholds

```http
# Get thresholds
GET /api/risk/thresholds

# Update thresholds
PUT /api/risk/thresholds
{
  "warning": 0.05,
  "critical": 0.10,
  "breach": 0.20
}
```

---

## WebSocket события

### Подключение

```typescript
import { useRiskMonitor } from '@/hooks/use-risk-monitor';

const {
  riskState,      // Текущее состояние риска
  killSwitch,     // Состояние Kill Switch
  botSummary,     // Сводка по ботам
  alerts,         // Активные алерты
  isConnected,    // Статус соединения
  triggerKillSwitch,
  armKillSwitch,
  disarmKillSwitch,
  recoverKillSwitch,
  acknowledgeAlert,
} = useRiskMonitor();
```

### Типы событий

| Событие | Описание | Payload |
|---------|----------|---------|
| `risk:update` | Обновление метрик риска | `RiskState` |
| `killswitch:triggered` | Kill Switch сработал | `KillSwitchState` |
| `killswitch:recovered` | Восстановление после KS | `KillSwitchState` |
| `alert:new` | Новый алерт | `RiskAlert` |
| `drawdown:warning` | Предупреждение о просадке | `DrawdownState` |
| `drawdown:critical` | Критическая просадка | `DrawdownState` |

### Пример обработки

```typescript
// WebSocket hook implementation
const useRiskMonitor = () => {
  const [riskState, setRiskState] = useState<RiskState | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('wss://api.citarion.io/risk/ws');
    
    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'risk:update':
          setRiskState(data.payload);
          break;
        case 'killswitch:triggered':
          // Handle kill switch trigger
          break;
        case 'alert:new':
          // Handle new alert
          break;
      }
    };
    
    return () => ws.close();
  }, []);

  return { riskState, isConnected };
};
```

---

## Примеры использования

### Полная интеграция Risk Dashboard

```tsx
// app/risk/page.tsx
import { RiskDashboard } from '@/components/risk-management/risk-dashboard';
import { AIRiskPanel } from '@/components/ai-risk/ai-risk-panel';

export default function RiskManagementPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Main Risk Dashboard */}
      <RiskDashboard />
      
      {/* AI Risk Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AIRiskPanel />
        <HistoricalRiskChart />
      </div>
    </div>
  );
}
```

### Мониторинг с автоматическим уведомлением

```tsx
import { useEffect } from 'react';
import { useRiskMonitor } from '@/hooks/use-risk-monitor';
import { toast } from 'sonner';

export function RiskMonitorWrapper({ children }) {
  const { riskState, alerts } = useRiskMonitor();

  useEffect(() => {
    // Автоматические уведомления при критических событиях
    if (riskState?.riskLevel === 'critical') {
      toast.error('Критический уровень риска!', {
        description: `Risk Score: ${riskState.riskScore}`,
      });
    }
  }, [riskState?.riskLevel]);

  useEffect(() => {
    // Обработка новых алертов
    alerts.forEach(alert => {
      if (!alert.acknowledged) {
        toast.warning(alert.message, {
          action: {
            label: 'Подтвердить',
            onClick: () => acknowledgeAlert(alert.id),
          },
        });
      }
    });
  }, [alerts]);

  return <>{children}</>;
}
```

### Кастомная конфигурация лимитов

```tsx
import { PositionLimiterPanel } from '@/components/risk-management/position-limiter-panel';

export function CustomLimitsConfig() {
  const [limits, setLimits] = useState({
    maxPositionSize: 5000,
    maxTotalExposure: 50000,
    maxPositionsPerSymbol: 1,
    maxTotalPositions: 10,
    maxLeverage: 5,
    maxCorrelation: 0.5,
    maxSectorExposure: 0.2,
    maxSingleAssetExposure: 0.15,
  });

  const handleLimitsChange = async (newLimits) => {
    // Валидация
    if (newLimits.maxLeverage > 20) {
      toast.error('Максимальное плечо не может превышать 20x');
      return;
    }
    
    setLimits(newLimits);
    
    // Сохранение на сервере
    await fetch('/api/risk/limits', {
      method: 'PUT',
      body: JSON.stringify(newLimits)
    });
  };

  return (
    <PositionLimiterPanel
      limits={limits}
      currentExposure={25000}
      currentPositions={5}
      onLimitsChange={handleLimitsChange}
    />
  );
}
```

### Интеграция Kill Switch с ботом

```tsx
import { KillSwitchPanel } from '@/components/risk-management/kill-switch-panel';

export function BotRiskControl({ botId }: { botId: string }) {
  const handleTrigger = async (trigger) => {
    // Остановка конкретного бота при trigger
    await fetch(`/api/bots/${botId}/stop`, { method: 'POST' });
    
    // Логирование события
    await fetch('/api/risk/events', {
      method: 'POST',
      body: JSON.stringify({
        type: 'killswitch_triggered',
        trigger,
        botId,
        timestamp: Date.now()
      })
    });
  };

  return (
    <KillSwitchPanel
      onTrigger={handleTrigger}
      config={{
        autoTrigger: true,
        triggers: { drawdown: true, varBreach: true },
        thresholds: { drawdownPct: 0.15, varMultiplier: 2.0 }
      }}
    />
  );
}
```

### Использование VaR Calculator

```tsx
import { VaRCalculatorPanel } from '@/components/risk-management/var-calculator-panel';
import { useState } from 'react';

export function VaRAnalysis() {
  const [portfolioValue, setPortfolioValue] = useState(150000);

  const handleCalculate = async (config) => {
    const response = await fetch('/api/risk/var/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...config,
        portfolioValue
      })
    });
    
    return response.json();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Label>Portfolio Value</Label>
        <Input 
          type="number" 
          value={portfolioValue}
          onChange={(e) => setPortfolioValue(Number(e.target.value))}
        />
      </div>
      
      <VaRCalculatorPanel 
        portfolioValue={portfolioValue}
        onCalculate={handleCalculate}
      />
    </div>
  );
}
```

---

## Связанные документы

- [Risk Models Documentation](../RISK_MODELS_DOCUMENTATION.md)
- [Risk Monitor Service](../microservices/risk-monitor-service.md)
- [GARCH Volatility Analysis](../GARCH_VOLATILITY_ANALYSIS.md)
- [Dashboard Components](./DASHBOARD.md)

---

## История изменений

| Версия | Дата | Изменения |
|--------|------|-----------|
| 2.0 | Март 2026 | Добавлен AI Risk Panel, интеграция GARCH |
| 1.5 | Февраль 2026 | Добавлен Kelly Criterion в Position Limiter |
| 1.0 | Январь 2026 | Начальная версия |

---

*Документ создан в рамках Task ID: 3-d*
