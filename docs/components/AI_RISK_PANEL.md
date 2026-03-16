# AI Risk Panel

**Version:** 1.0 | **Last Updated:** March 2026

---

## Overview

AI Risk Panel — интеллектуальная панель управления рисками с ML-анализом. Объединяет anomaly detection, position sizing на основе Kelly Criterion и автоматическое хеджирование.

**File:** `src/components/ai-risk/ai-risk-panel.tsx`

---

## Features

| Feature | Description |
|---------|-------------|
| **Risk Scoring** | Комплексный анализ риска по 5 компонентам |
| **Anomaly Detection** | Автоматическое обнаружение аномалий рынка |
| **Position Sizing** | Рекомендации размера позиции (Kelly Criterion) |
| **Hedging Status** | Мониторинг и рекомендации по хеджированию |

---

## Interfaces

### RiskMetrics

```typescript
interface RiskMetrics {
  overall: number                    // Общий риск-скор (0-100)
  components: {
    market: number                   // Рыночный риск
    liquidity: number                // Риск ликвидности
    volatility: number               // Волатильность
    correlation: number              // Корреляционный риск
    tail: number                     // Tail risk
  }
  recommendation: 'reduce' | 'maintain' | 'increase'
}
```

### Anomaly

```typescript
interface Anomaly {
  type: string                      // Тип аномалии: 'volume', 'volatility', 'price', 'spread'
  severity: string                  // 'critical', 'high', 'medium', 'low'
  score: number                     // Score аномалии (0-1)
  description: string               // Описание аномалии
}
```

### PositionSizing

```typescript
interface PositionSizing {
  recommended: number               // Рекомендуемый размер (%)
  maxAllowed: number                // Максимально допустимый (%)
  current: number                   // Текущий размер (%)
}
```

---

## Component Structure

### Tabs

| Tab | Content |
|-----|---------|
| **Overview** | Общий risk score + компоненты риска |
| **Anomalies** | Список обнаруженных аномалий |
| **Sizing** | Position sizing + Kelly Criterion + Hedging |

### Risk Color Coding

```typescript
const getRiskColor = (score: number) => {
  if (score >= 70) return 'text-red-500'      // Высокий риск
  if (score >= 50) return 'text-orange-500'   // Средний риск
  if (score >= 30) return 'text-yellow-500'   // Умеренный риск
  return 'text-green-500'                      // Низкий риск
}
```

---

## Risk Components

### 1. Market Risk (market)

Оценивает общее состояние рынка:
- Тренд рынка
- Сентимент
- Новостной фон

### 2. Liquidity Risk (liquidity)

Анализирует ликвидность:
- Объём торгов
- Bid-Ask спред
- Глубина стакана

### 3. Volatility Risk (volatility)

Измеряет волатильность:
- ATR (Average True Range)
- Историческая волатильность
- VIX-like индикаторы

### 4. Correlation Risk (correlation)

Оценивает корреляции:
- Межактивные корреляции
- Diversification score
- Sector exposure

### 5. Tail Risk (tail)

Оценивает риски "чёрных лебедей":
- VaR (Value at Risk)
- CVaR (Conditional VaR)
- Stress testing

---

## Anomaly Detection

### Severity Levels

| Severity | Icon | Color | Description |
|----------|------|-------|-------------|
| **Critical** | `AlertOctagon` | Red | Требует немедленного действия |
| **High** | `AlertCircle` | Orange | Важное предупреждение |
| **Medium** | `AlertTriangle` | Yellow | Обратите внимание |
| **Low** | `AlertCircle` | Blue | Информационное |

### Anomaly Types

| Type | Description |
|------|-------------|
| `volume` | Аномальный объём торгов |
| `volatility` | Резкое изменение волатильности |
| `price` | Необычное движение цены |
| `spread` | Аномальный спред |
| `correlation` | Нарушение корреляций |

---

## Position Sizing

### Kelly Criterion

Компонент показывает оптимальный размер позиции на основе:
- Win rate стратегии
- Risk/reward ratio
- Half-Kelly adjustment для безопасности

```typescript
// Kelly Formula
Kelly % = (W × R - (1 - W)) / R
// W = Win rate, R = Risk/Reward ratio
// Half-Kelly = Kelly % / 2
```

### Sizing Display

```
Recommended: 8%
Current: 6%
Maximum Allowed: 15%
```

---

## Hedging Status

### Metrics

| Metric | Description |
|--------|-------------|
| **Hedge Ratio** | Доля портфеля в хедже (0-100%) |
| **Hedge Cost** | Стоимость поддержания хеджа (% годовых) |

### Recommendations

Система предоставляет рекомендации по хеджированию:
- "Consider adding BTC hedge"
- "Reduce long exposure"
- "Add put options"

---

## Usage

```tsx
import { AIRiskPanel } from '@/components/ai-risk/ai-risk-panel'

// Basic usage
<AIRiskPanel />

// With custom initial state
<AIRiskPanel 
  initialMetrics={{
    overall: 45,
    components: {
      market: 42,
      liquidity: 28,
      volatility: 55,
      correlation: 38,
      tail: 52
    },
    recommendation: 'maintain'
  }}
/>
```

---

## State Management

### Default State

```typescript
const [riskMetrics, setRiskMetrics] = useState<RiskMetrics>({
  overall: 45,
  components: {
    market: 42,
    liquidity: 28,
    volatility: 55,
    correlation: 38,
    tail: 52
  },
  recommendation: 'maintain'
})

const [anomalies, setAnomalies] = useState<Anomaly[]>([
  { type: 'volume', severity: 'medium', score: 0.65, description: 'Unusual volume spike detected' },
  { type: 'volatility', severity: 'low', score: 0.35, description: 'Elevated volatility regime' }
])

const [positionSizing, setPositionSizing] = useState<PositionSizing>({
  recommended: 8,
  maxAllowed: 15,
  current: 6
})

const [hedging, setHedging] = useState({
  ratio: 0.45,
  recommendations: ['Consider adding BTC hedge'],
  cost: 0.12
})
```

---

## Integration with Backend

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/risk/metrics` | GET | Получить текущие метрики риска |
| `/api/risk/anomalies` | GET | Получить список аномалий |
| `/api/risk/sizing` | POST | Рассчитать position sizing |
| `/api/risk/hedge` | GET | Получить статус хеджирования |

### WebSocket Events

| Event | Description |
|-------|-------------|
| `risk:update` | Обновление risk metrics |
| `anomaly:detected` | Обнаружена новая аномалия |
| `hedge:recommendation` | Новая рекомендация по хеджу |

---

## Related Documentation

- [RISK_MANAGEMENT_UI.md](RISK_MANAGEMENT_UI.md) - Risk Management UI
- [../business-logic/RISK_MODELS_DOCUMENTATION.md](../business-logic/RISK_MODELS_DOCUMENTATION.md) - Risk Models
- [ANALYTICS_DASHBOARD.md](ANALYTICS_DASHBOARD.md) - Analytics Dashboard

---

*Last updated: March 2026 | CITARION Documentation Team*
