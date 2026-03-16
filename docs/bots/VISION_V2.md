# Vision Bot V2

**Version:** 2.0 | **Last Updated:** March 2026

---

## Overview

Vision Bot V2 — обновлённая версия Vision Bot с online learning и multi-horizon forecasting. Использует инкрементальное обучение для адаптации к изменениям рынка в реальном времени.

**File:** `src/lib/vision-v2/online-learner.ts`

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Online Learning** | Инкрементальное обучение без переобучения |
| **Drift Detection** | Автоматическое обнаружение drift'а данных |
| **Multi-Horizon Forecast** | Прогнозы на 1h, 4h, 24h, 7d |
| **Adaptive Weights** | Автоматическая корректировка весов |

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│             Vision Bot V2                       │
├─────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ Drift       │  │ Multi-Horizon           │  │
│  │ Detector    │  │ Forecaster              │  │
│  │ (ADWIN)     │  │ (1h/4h/24h/7d)          │  │
│  └──────┬──────┘  └───────────┬─────────────┘  │
│         │                     │                 │
│         ▼                     ▼                 │
│  ┌─────────────────────────────────────────────┤
│  │           Online Learner                    │
│  │    (Incremental Model + Buffer)            │
│  └─────────────────────────────────────────────┤
└─────────────────────────────────────────────────┘
```

---

## Core Classes

### 1. OnlineLearner

Главный класс для инкрементального обучения.

```typescript
class OnlineLearner {
  private model: IncrementalModel
  private buffer: TrainingSample[]
  private driftDetector: DriftDetector
  
  constructor(config: OnlineConfig)
  
  // Добавить новый семпл
  async addSample(sample: TrainingSample): Promise<void>
  
  // Предсказание
  predict(features: Record<string, number>): {
    direction: 'LONG' | 'SHORT' | 'NEUTRAL'
    confidence: number
  }
  
  // Полное переобучение
  async fullRetrain(recentOnly: boolean): Promise<void>
  
  // Обработка drift'а
  async handleDrift(drift: DriftResult): Promise<void>
}
```

### 2. IncrementalModel

Инкрементальная модель с онлайн-обновлением весов.

```typescript
class IncrementalModel {
  private weights: Map<string, number>
  private bias: number
  private samplesProcessed: number
  
  // Предсказание с sigmoid
  predict(features: Record<string, number>): {
    long: number
    short: number
    neutral: number
  }
  
  // Онлайн-обновление
  update(features: Record<string, number>, 
         label: 'LONG' | 'SHORT' | 'NEUTRAL',
         weight: number): void
  
  // Получить веса для анализа
  getWeights(): Map<string, number>
}
```

### 3. DriftDetector (ADWIN)

Детектор drift'а данных на основе алгоритма ADWIN.

```typescript
class DriftDetector {
  private window: number[]
  
  constructor(windowSize: number, threshold: number)
  
  // Добавить accuracy
  addAccuracy(accuracy: number): void
  
  // Проверить drift
  detect(): DriftResult
}
```

### 4. MultiHorizonForecaster

Мульти-горизонтный прогнозист.

```typescript
class MultiHorizonForecaster {
  private learners: Map<string, OnlineLearner>
  private horizons = ['1h', '4h', '24h', '7d']
  
  // Прогноз на всех горизонтах
  async forecast(features: Record<string, number>): 
    Promise<MultiHorizonForecast>
  
  // Получить learner для горизонта
  getLearner(horizon: string): OnlineLearner | undefined
}
```

---

## Interfaces

### OnlineConfig

```typescript
interface OnlineConfig {
  bufferSize: number           // Размер буфера для обучения
  learningRate: number         // Скорость обучения (default: 0.01)
  forgettingFactor: number     // Фактор забывания (default: 0.98)
  driftDetection: boolean      // Включить drift detection
  driftThreshold: number       // Порог drift'а (default: 0.15)
  retrainThreshold: number     // Порог переобучения
}
```

### TrainingSample

```typescript
interface TrainingSample {
  features: Record<string, number>    // Признаки
  label: 'LONG' | 'SHORT' | 'NEUTRAL' // Метка
  timestamp: Date                     // Время
  outcome?: {                         // Результат (опционально)
    pnl: number
    win: boolean
    holdingTime: number
  }
}
```

### DriftResult

```typescript
interface DriftResult {
  detected: boolean              // Drift обнаружен
  recentAccuracy: number        // Точность на последних данных
  historicalAccuracy: number    // Историческая точность
  severity: number              // Серьёзность (0-1)
}
```

### MultiHorizonForecast

```typescript
interface MultiHorizonForecast {
  horizons: {
    '1h': { direction: string; confidence: number; price: number }
    '4h': { direction: string; confidence: number; price: number }
    '24h': { direction: string; confidence: number; price: number }
    '7d': { direction: string; confidence: number; price: number }
  }
  consensus: {
    direction: 'LONG' | 'SHORT' | 'NEUTRAL'
    confidence: number
    agreement: number  // Согласованность прогнозов (0-1)
  }
}
```

---

## Online Learning Algorithm

### Incremental Update

```typescript
// Sigmoid activation
σ(x) = 1 / (1 + e^(-x))

// Prediction
z = bias + Σ(w_i × x_i)
prediction = σ(z)

// Gradient calculation
error = target - prediction
gradient = error × prediction × (1 - prediction) × weight × learningRate

// Weight update (SGD with forgetting factor)
w_i = w_i + gradient × x_i × forgetting_factor^age
bias = bias + gradient
```

### Drift Handling

```typescript
if (drift.severity > 0.3) {
  // High severity: full retrain on recent data
  await fullRetrain(recentOnly: true)
} else {
  // Low severity: temporary learning rate increase
  model.setLearningRate(learningRate * 3)
  await incrementalUpdate()
  model.setLearningRate(learningRate)
}
```

---

## Multi-Horizon Forecasting

### Horizon Configuration

| Horizon | Buffer Size | Learning Rate | Forgetting Factor |
|---------|-------------|---------------|-------------------|
| 1h | 50 | 0.01 | 0.98 |
| 4h | 100 | 0.01 | 0.98 |
| 24h | 200 | 0.01 | 0.98 |
| 7d | 500 | 0.01 | 0.98 |

### Consensus Calculation

```typescript
// Weights for each horizon
const weights = {
  '1h': 0.4,   // Highest weight for short-term
  '4h': 0.3,
  '24h': 0.2,
  '7d': 0.1    // Lowest weight for long-term
}

// Weighted consensus
consensus.direction = weighted_vote(horizons, weights)
consensus.confidence = weighted_sum(horizons, weights)
consensus.agreement = count_matching(horizons) / total_horizons
```

---

## Usage

### Basic Usage

```typescript
import { OnlineLearner } from '@/lib/vision-v2/online-learner'

// Create learner
const learner = new OnlineLearner({
  bufferSize: 100,
  learningRate: 0.01,
  forgettingFactor: 0.98,
  driftDetection: true,
  driftThreshold: 0.15,
  retrainThreshold: 0.5
})

// Add training samples
await learner.addSample({
  features: { rsi: 30, macd: 0.5, volume_ratio: 1.2 },
  label: 'LONG',
  timestamp: new Date()
})

// Make prediction
const prediction = learner.predict({
  rsi: 25,
  macd: 0.8,
  volume_ratio: 1.5
})
// { direction: 'LONG', confidence: 0.75 }
```

### Multi-Horizon Forecast

```typescript
import { MultiHorizonForecaster } from '@/lib/vision-v2/online-learner'

const forecaster = new MultiHorizonForecaster()

const forecast = await forecaster.forecast({
  rsi: 35,
  macd: 0.3,
  volume_ratio: 1.1,
  bb_position: -0.5
})

console.log(forecast.horizons['1h'])  // { direction: 'LONG', confidence: 0.72 }
console.log(forecast.horizons['24h']) // { direction: 'NEUTRAL', confidence: 0.45 }
console.log(forecast.consensus)       // { direction: 'LONG', confidence: 0.68, agreement: 0.75 }
```

### Drift Detection

```typescript
const driftDetector = new DriftDetector(50, 0.1)

// After each trade outcome
driftDetector.addAccuracy(trade.win ? 1 : 0)

// Check for drift
const drift = driftDetector.detect()

if (drift.detected) {
  console.log(`Drift detected! Severity: ${drift.severity}`)
  console.log(`Recent accuracy: ${drift.recentAccuracy}`)
  console.log(`Historical accuracy: ${drift.historicalAccuracy}`)
  
  // Handle drift
  await learner.handleDrift(drift)
}
```

---

## Integration with Vision Bot

### Bot Configuration

```typescript
import { OnlineLearner, MultiHorizonForecaster } from '@/lib/vision-v2/online-learner'

class VisionBotV2 {
  private learner: OnlineLearner
  private forecaster: MultiHorizonForecaster
  
  constructor() {
    this.learner = new OnlineLearner({
      bufferSize: 200,
      learningRate: 0.01,
      forgettingFactor: 0.98,
      driftDetection: true,
      driftThreshold: 0.15,
      retrainThreshold: 0.5
    })
    
    this.forecaster = new MultiHorizonForecaster()
  }
  
  async processTick(tick: TickData) {
    const features = this.extractFeatures(tick)
    const prediction = this.learner.predict(features)
    
    // Use multi-horizon forecast for confirmation
    const forecast = await this.forecaster.forecast(features)
    
    if (forecast.consensus.agreement > 0.75) {
      return this.generateSignal(prediction, forecast)
    }
  }
  
  async onTradeComplete(trade: Trade) {
    // Add sample with outcome for continuous learning
    await this.learner.addSample({
      features: trade.entryFeatures,
      label: trade.direction,
      timestamp: trade.entryTime,
      outcome: {
        pnl: trade.pnl,
        win: trade.pnl > 0,
        holdingTime: trade.holdingTime
      }
    })
  }
}
```

---

## Performance Considerations

### Memory Usage

| Component | Memory |
|-----------|--------|
| IncrementalModel weights | O(features) |
| Training buffer | O(bufferSize) |
| DriftDetector window | O(windowSize) |
| MultiHorizonForecaster | O(4 × bufferSize) |

### Latency

| Operation | Time |
|-----------|------|
| predict() | < 1ms |
| addSample() | < 5ms |
| incrementalUpdate() | O(bufferSize × 0.3) |
| fullRetrain() | O(bufferSize) |

---

## Comparison with Vision V1

| Feature | Vision V1 | Vision V2 |
|---------|-----------|-----------|
| Learning | Batch retraining | Online incremental |
| Adaptation | Periodic | Real-time |
| Drift handling | Manual | Automatic (ADWIN) |
| Forecast | Single horizon | Multi-horizon |
| Retraining | Full dataset | Recent data only |

---

## Related Documentation

- [../bots/ORION_BOT.md](../bots/ORION_BOT.md) - ORION Bot
- [../ml/ML_INTEGRATION.md](../ml/ML_INTEGRATION.md) - ML Integration
- [../ml/ML_RL_SERVICES.md](../ml/ML_RL_SERVICES.md) - RL Services
- [ANALYTICAL_BOTS.md](ANALYTICAL_BOTS.md) - Analytical Bots

---

*Last updated: March 2026 | CITARION Documentation Team*
