# ML Services Complete Documentation

Complete documentation for all Machine Learning services in CITARION trading platform.

## Table of Contents

1. [Overview](#overview)
2. [ML Pipeline](#ml-pipeline)
3. [Lawrence Classifier](#lawrence-classifier)
4. [Gradient Boosting](#gradient-boosting)
5. [RL Agents](#rl-agents)
6. [Deep Learning](#deep-learning)
7. [Prediction Services](#prediction-services)
8. [Self-Learning](#self-learning)
9. [Python ML Service (FastAPI)](#python-ml-service-fastapi)
10. [Python RL Service (FastAPI)](#python-rl-service-fastapi)
11. [Usage Examples](#usage-examples)

---

## Overview

CITARION ML Services provides a comprehensive machine learning infrastructure for trading:

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ML Services Architecture                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │   ML Pipeline    │  │  Lawrence ML     │  │ Gradient Boosting │  │
│  │  ┌────────────┐  │  │  ┌────────────┐  │  │  ┌────────────┐   │  │
│  │  │   Data     │  │  │  │   k-NN     │  │  │  │  Training  │   │  │
│  │  │ Collector  │  │  │  │ Lorentzian │  │  │  │ Collector  │   │  │
│  │  └────────────┘  │  │  └────────────┘  │  │  └────────────┘   │  │
│  │  ┌────────────┐  │  │  ┌────────────┐  │  │  ┌────────────┐   │  │
│  │  │  Feature   │  │  │  │ Probability│  │  │  │   GB       │   │  │
│  │  │ Engineer   │  │  │  │ Calibrator │  │  │  │ Integration│   │  │
│  │  └────────────┘  │  │  └────────────┘  │  │  └────────────┘   │  │
│  │  ┌────────────┐  │  │  ┌────────────┐  │  │  ┌────────────┐   │  │
│  │  │   Model    │  │  │  │  Feature   │  │  │  │   Scorer   │   │  │
│  │  │ Registry   │  │  │  │ Extender   │  │  │  │  Instance  │   │  │
│  │  └────────────┘  │  │  └────────────┘  │  │  └────────────┘   │  │
│  │  ┌────────────┐  │  └──────────────────┘  └──────────────────┘  │
│  │  │  AutoML   │  │                                           │
│  │  │  Engine   │  │  ┌──────────────────┐  ┌──────────────────┐  │
│  │  └────────────┘  │  │   RL Agents      │  │  Deep Learning   │  │
│  └──────────────────┘  │  ┌────────────┐  │  │  ┌────────────┐   │  │
│                        │  │  PPO Agent │  │  │  │   LSTM     │   │  │
│  ┌──────────────────┐  │  └────────────┘  │  │  │   Model    │   │  │
│  │ Prediction Svc   │  │  ┌────────────┐  │  │  └────────────┘   │  │
│  │  ┌────────────┐  │  │  │  DQN Agent │  │  └──────────────────┘  │
│  │  │   Price    │  │  │  └────────────┘  │                        │
│  │  │ Predictor  │  │  │  ┌────────────┐  │  ┌──────────────────┐  │
│  │  └────────────┘  │  │  │ Training   │  │  │  Self-Learning   │  │
│  │  ┌────────────┐  │  │  │ Pipeline   │  │  │  ┌────────────┐   │  │
│  │  │  Regime    │  │  │  └────────────┘  │  │  │  Genetic   │   │  │
│  │  │  Detector  │  │  │  ┌────────────┐  │  │  │ Optimizer  │   │  │
│  │  └────────────┘  │  │  │Environment │  │  │  └────────────┘   │  │
│  │  ┌────────────┐  │  │  └────────────┘  │  │  ┌────────────┐   │  │
│  │  │ Volatility │  │  └──────────────────┘  │  │GA-GARCH    │   │  │
│  │  │   Model    │  │                        │  │Integration │   │  │
│  │  └────────────┘  │                        │  └────────────┘   │  │
│  └──────────────────┘                        └──────────────────┘  │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                    Python Microservices                         │  │
│  │  ┌────────────────────┐       ┌────────────────────┐           │  │
│  │  │   ML Service       │       │   RL Service       │           │  │
│  │  │   Port: 3006       │       │   Port: 3007       │           │  │
│  │  │   - Price Predict  │       │   - PPO Agent      │           │  │
│  │  │   - Signal Class.  │       │   - DQN Agent      │           │  │
│  │  │   - Regime Detect  │       │   - SAC Agent      │           │  │
│  │  └────────────────────┘       └────────────────────┘           │  │
│  └────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Features

| Feature | Description |
|---------|-------------|
| **Multi-Model Architecture** | Lawrence Classifier, GB, RL, LSTM ensemble |
| **Real-time Training** | Online learning with drift detection |
| **Look-ahead Protection** | Strict temporal validation |
| **Auto-ML** | Automatic model selection and tuning |
| **A/B Testing** | Model version comparison |
| **Self-Learning** | Genetic algorithm optimization |

---

## ML Pipeline

### Data Collector

Collects market data from multiple exchanges.

**Location:** `src/lib/ml-pipeline/data-collector.ts`

#### Supported Exchanges

| Exchange | OHLCV | Orderbook | Funding Rate | Open Interest |
|----------|-------|-----------|--------------|---------------|
| Binance | ✅ | ✅ | ✅ | ✅ |
| Bybit | ✅ | ✅ | ✅ | ✅ |
| OKX | ✅ | ✅ | ✅ | ✅ |
| Bitget | ✅ | ✅ | ✅ | ❌ |
| BingX | ✅ | ✅ | ✅ | ❌ |

#### TypeScript Interfaces

```typescript
interface OHLCV {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface Orderbook {
  timestamp: number
  bids: OrderbookLevel[]
  asks: OrderbookLevel[]
}

interface MarketData {
  symbol: string
  exchange: string
  ohlcv: OHLCV[]
  orderbook?: Orderbook
  fundingRate?: FundingRate
  openInterest?: OpenInterest
}
```

#### Usage

```typescript
import { DataCollector, dataCollector } from '@/lib/ml-pipeline/data-collector'

// Collect OHLCV data
const ohlcv = await dataCollector.collectOHLCV('binance', 'BTCUSDT', '1h', 500)

// Collect orderbook
const orderbook = await dataCollector.collectOrderbook('binance', 'BTCUSDT', 20)

// Collect all market data
const marketData = await dataCollector.collectMarketData('binance', 'BTCUSDT', '1h')

// Batch collection
const results = await dataCollector.collectBatch({
  symbols: ['BTCUSDT', 'ETHUSDT'],
  exchanges: ['binance', 'bybit'],
  interval: '1h',
  historicalDays: 30,
  realtime: false
})
```

### Feature Engineer

Generates technical and market features for ML models.

**Location:** `src/lib/ml-pipeline/feature-engineer.ts`

#### Feature Categories

| Category | Features |
|----------|----------|
| **Price-based** | returns, log_returns, price_change |
| **Moving Averages** | SMA (5,10,20,50), EMA (5,10,20,50) |
| **Momentum** | RSI (7,14), MACD, Stochastic K/D |
| **Volatility** | ATR (7,14), Bollinger Bands |
| **Trend** | ADX (14), +DI, -DI |
| **Volume** | Volume SMA, Volume Ratio, OBV |
| **Lag Features** | lag_returns (1,2,3,5) |
| **Rolling Stats** | Rolling Mean/Std (10,20) |
| **Time Features** | Hour, Day of Week |

#### Feature Configuration

```typescript
interface FeatureConfig {
  name: string
  type: 'technical' | 'microstructure' | 'time' | 'lag' | 'rolling'
  params: Record<string, number | string | boolean>
  enabled: boolean
}
```

#### Normalization Methods

```typescript
// Z-score normalization
const normalized = featureEngineer.normalizeFeatures(featureSets, 'zscore')

// Min-max normalization
const normalized = featureEngineer.normalizeFeatures(featureSets, 'minmax')

// Robust scaling (using median and IQR)
const normalized = featureEngineer.normalizeFeatures(featureSets, 'robust')
```

#### Look-ahead Protection

The Feature Engineer includes built-in look-ahead bias prevention:

```typescript
// Validate features don't use future data
const validationResult = featureEngineer.validateNoLookahead(ohlcv, featureSets)

// Get features available at specific point in time
const available = featureEngineer.getAvailableFeaturesAtTime(ohlcv, barIndex)

// Generate features with strict temporal constraints
const safeFeatures = featureEngineer.generateFeaturesAtTime(ohlcv, currentBarIndex)
```

### Model Registry

Version control and management for ML models.

**Location:** `src/lib/ml-pipeline/model-registry.ts`

#### Features

- Model versioning
- A/B testing
- Active version management
- Model import/export

#### TypeScript Interfaces

```typescript
interface ModelVersion {
  id: string
  modelId: string
  version: string
  createdAt: number
  createdBy: string
  metrics: ModelMetrics
  status: 'active' | 'deprecated' | 'testing'
  config: ModelConfig
}

interface ABTest {
  id: string
  name: string
  modelA: string
  modelB: string
  startDate: number
  endDate?: number
  trafficSplit: number  // 0-1, portion to model A
  status: 'running' | 'completed' | 'paused'
  results?: ABTestResult
}
```

#### Usage

```typescript
import { ModelRegistry, modelRegistry } from '@/lib/ml-pipeline/model-registry'

// Register a new model
const version = modelRegistry.registerModel(config, weights, metrics)

// Get active version
const activeVersion = modelRegistry.getActiveVersion('price_predictor')

// Create A/B test
const abTest = modelRegistry.createABTest('Test v1 vs v2', 'model_v1', 'model_v2', 0.5)

// Select model for inference (A/B test aware)
const model = modelRegistry.selectModelForInference('price_predictor')

// Get statistics
const stats = modelRegistry.getStats()
```

### AutoML Engine

Automatic model selection and hyperparameter tuning.

**Location:** `src/lib/ml-pipeline/auto-ml-engine.ts`

#### Supported Algorithms

| Algorithm | Type | Use Case |
|-----------|------|----------|
| Linear Regression | regression | Baseline price prediction |
| Decision Tree | regression | Non-linear patterns |
| Random Forest | regression | Ensemble predictions |

#### Configuration

```typescript
interface AutoMLConfig {
  targetMetric: keyof ModelMetrics  // 'rmse', 'r2', 'directionalAccuracy'
  maxTrials: number
  maxTime: number  // seconds
  earlyStoppingRounds: number
  featureSelection: boolean
  hyperparameterTuning: boolean
  ensembleMethods: boolean
}
```

#### Usage

```typescript
import { AutoMLEngine, autoMLEngine } from '@/lib/ml-pipeline/auto-ml-engine'

// Run AutoML optimization
const result = await autoMLEngine.optimize(featureSets, {
  targetMetric: 'directionalAccuracy',
  maxTrials: 10,
  maxTime: 300,
  earlyStoppingRounds: 5,
  featureSelection: true,
  hyperparameterTuning: true,
  ensembleMethods: false
})

// Get best model info
const bestModel = autoMLEngine.getBestModel()

// Get trials history
const trials = autoMLEngine.getTrials()

// Predict using best model
const prediction = autoMLEngine.predict(features)
```

---

## Lawrence Classifier

A k-NN classifier using Lorentzian distance for market direction prediction.

**Location:** `src/lib/ml/lawrence-classifier.ts`

### Overview

Lawrence Classifier implements Approximate Nearest Neighbors in Lorentzian Space, converted from Pine Script MLExtensions library. It includes:
- Feature extraction with normalized indicators
- Regime, ADX, and volatility filters
- Probability calibration
- Weighted voting based on distance

### k-NN with Lorentzian Distance

Lorentzian distance is more robust to outliers than Euclidean distance:

```
d(x,y) = Σ log(1 + |xi - yi|)
```

#### Implementation

```typescript
export function lorentzianDistance(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Feature vectors must have the same length')
  }
  
  let distance = 0
  for (let i = 0; i < a.length; i++) {
    distance += Math.log(1 + Math.abs(a[i] - b[i]))
  }
  
  return distance
}

export function findNearestNeighbors(
  query: number[],
  database: TrainingSample[],
  k: number
): Array<{ sample: TrainingSample; distance: number }> {
  if (database.length === 0) return []
  
  const distances = database.map(sample => {
    const featureVector = Object.values(sample.features)
    const distance = lorentzianDistance(query, featureVector)
    return { sample, distance }
  })
  
  distances.sort((a, b) => a.distance - b.distance)
  
  return distances.slice(0, k)
}
```

### Probability Calibration

Converts raw classifier scores into well-calibrated probabilities.

**Location:** `src/lib/ml/probability-calibrator.ts`

#### Calibration Methods

| Method | Description | Best For |
|--------|-------------|----------|
| Platt Scaling | Logistic regression calibration | Binary classification |
| Isotonic Regression | Non-parametric step function | More data available |
| Beta Calibration | Flexible parametric | Non-symmetric curves |
| Temperature Scaling | Simple NN calibration | Neural networks |
| Ensemble | Combines all methods | Best overall |

#### Usage

```typescript
import { 
  ProbabilityCalibrator, 
  getProbabilityCalibrator 
} from '@/lib/ml/probability-calibrator'

const calibrator = getProbabilityCalibrator()

// Add training samples
calibrator.addSample(rawScore, label)  // label: 0 or 1

// Fit calibrator
const result = calibrator.fit()

// Calibrate a score
const calibrated = calibrator.calibrate(0.75)
// Returns: { probability, confidence, rawScore, method }

// Get metrics
const metrics = calibrator.getMetrics()
// Returns: { ece, mce, brier, logLoss, samples, lastUpdated }
```

### Feature Extension

Dynamic feature extension for ML classifiers (Einstein Extension concept).

**Location:** `src/lib/ml/feature-extender.ts`

#### Built-in Features

```typescript
// Momentum features
'rsi_14', 'rsi_7', 'momentum_10', 'roc_5'

// Volatility features
'atr_14', 'atr_ratio', 'bb_width', 'bb_position'

// Trend features
'adx_14', 'plus_di', 'minus_di', 'ema_cross_20_50', 'price_to_ema20'

// Volume features
'volume_ratio', 'obv_slope'

// Oscillator features
'stochastic_k', 'stochastic_d', 'cci_20', 'williams_r'

// Pattern features
'doji_pattern', 'engulfing'

// Time features
'hour_sin', 'hour_cos', 'day_of_week'
```

#### Feature Normalization Methods

| Method | Formula | Use Case |
|--------|---------|----------|
| MinMax | (x - min) / (max - min) | Bounded features |
| Z-score | (x - mean) / std | Normal distributions |
| Robust | tanh((x - median) / (1.4826 * MAD)) | Outlier-resistant |
| Rank | rank(x) / n | Non-parametric |

#### Usage

```typescript
import { FeatureExtender, getFeatureExtender } from '@/lib/ml/feature-extender'

const extender = getFeatureExtender()

// Register custom feature
extender.registerFeature(
  {
    name: 'custom_indicator',
    type: 'continuous',
    normalize: true,
    defaultValue: 0,
    importance: 0.7,
    category: 'custom'
  },
  (context) => {
    // Custom calculation
    return customValue
  }
)

// Extract features from context
const featureVector = extender.extractFeatures({
  open: opens,
  high: highs,
  low: lows,
  close: closes,
  volume: volumes,
  timestamp: Date.now(),
  symbol: 'BTCUSDT',
  timeframe: '1h'
})

// Select best features
const selectedFeatures = extender.selectFeatures()

// Calculate correlations
const correlations = extender.calculateCorrelations()
```

### Lawrence Classifier Usage

```typescript
import { LawrenceClassifier, getLawrenceClassifier } from '@/lib/ml/lawrence-classifier'

const classifier = getLawrenceClassifier({
  lookbackWindow: 2000,
  neighborCount: 8,
  filterSettings: {
    useVolatilityFilter: true,
    useRegimeFilter: true,
    useAdxFilter: true,
    regimeThreshold: 0.5,
    adxThreshold: 20,
    volatilityThreshold: 1.5
  }
})

// Extract features
const features = classifier.extractFeatures(highs, lows, closes, volumes)

// Apply filters
const filterResult = classifier.applyFilters(highs, lows, closes)
if (!filterResult.passed) {
  console.log('Filter reasons:', filterResult.reasons)
}

// Classify
const result = classifier.classify({
  indicators: { rsi: 45, macd: 0.001, ema20: 50000 },
  context: {
    trend: 'TRENDING_UP',
    volatility: 'MEDIUM',
    volume: 'HIGH'
  },
  signal: {
    direction: 'LONG',
    symbol: 'BTCUSDT',
    timeframe: '1h',
    entryPrice: 50000
  },
  time: {
    hour: 14,
    dayOfWeek: 3,
    isSessionOverlap: true
  }
})

// Result: { direction, probability, confidence, features }

// Train with samples
classifier.train({
  features: featureRecord,
  label: 'LONG',
  weight: 1.0,
  timestamp: Date.now()
})

// Evaluate performance
const evaluation = classifier.evaluate(testSamples)
// Returns: { accuracy, precision, recall, f1Score, confusionMatrix }
```

---

## Gradient Boosting

### Training Collector

Collects real trade outcomes for training the Gradient Boosting model.

**Location:** `src/lib/gradient-boosting/training-collector.ts`

#### TypeScript Interfaces

```typescript
interface TrainingSample {
  id: string
  timestamp: number
  symbol: string
  exchange: string
  botCode: string
  
  // Features at signal time
  features: SignalFeatures
  
  // Signal details
  signalDirection: 'LONG' | 'SHORT'
  signalConfidence: number
  
  // Trade result (filled after trade closes)
  outcome?: number  // 0 = loss, 1 = win, 0.5 = neutral
  pnlPercent?: number
  holdTimeMs?: number
  maxDrawdown?: number
  maxProfit?: number
  
  // Status
  status: 'PENDING' | 'COMPLETED' | 'EXPIRED'
}

interface TrainingStats {
  totalSamples: number
  completedSamples: number
  pendingSamples: number
  winRate: number
  avgPnl: number
  avgHoldTime: number
  byBot: Record<string, { count: number; winRate: number }>
  bySymbol: Record<string, { count: number; winRate: number }>
}
```

#### Usage

```typescript
import { TrainingDataCollector, getTrainingCollector } from '@/lib/gradient-boosting/training-collector'

const collector = getTrainingCollector({
  maxSamples: 5000,
  pendingExpiryMs: 7 * 24 * 60 * 60 * 1000,  // 7 days
  minSamplesForRetrain: 100,
  autoRetrain: true
})

// Record signal for training
const sampleId = collector.recordSignalWithCandles(
  {
    symbol: 'BTCUSDT',
    exchange: 'binance',
    botCode: 'DCA',
    direction: 'LONG',
    confidence: 0.75,
    entryPrice: 50000
  },
  candles,
  { fundingRate: 0.0001, basis: 0.002 }
)

// Record outcome after trade closes
collector.recordOutcome(sampleId, {
  exitPrice: 51000,
  pnlPercent: 2.0,
  holdTimeMs: 3600000,
  maxDrawdown: 0.5,
  maxProfit: 2.5
})

// Get statistics
const stats = collector.getStats()

// Get training data
const trainingData = collector.getTrainingData()
```

### GB Integration Service

Integrates Gradient Boosting Signal Scorer with trading bots and LOGOS engine.

**Location:** `src/lib/gradient-boosting/gb-integration-service.ts`

#### Configuration

```typescript
interface GBIntegrationConfig {
  enabled: boolean
  minScoreToPass: number       // 0-100
  minConfidenceToPass: number  // 0-100
  ensembleWeight: number       // 0-1
  autoTrain: boolean
  trainIntervalMs: number
  useInLOGOS: boolean
  filterMode: 'STRICT' | 'MODERATE' | 'LENIENT'
}
```

#### Bot Integrations

```typescript
const DEFAULT_BOT_INTEGRATIONS: GBBotIntegration[] = [
  { botCode: 'DCA', enabled: true, minScore: 40, weight: 0.3, useAsFilter: true },
  { botCode: 'BB', enabled: true, minScore: 45, weight: 0.25, useAsFilter: true },
  { botCode: 'ORION', enabled: true, minScore: 40, weight: 0.25, useAsFilter: true },
  { botCode: 'Zenbot', enabled: true, minScore: 35, weight: 0.3, useAsFilter: true },
  { botCode: 'VISION', enabled: false, minScore: 50, weight: 0.2, useAsFilter: false }
]
```

#### Enhanced Signal Result

```typescript
interface EnhancedSignal {
  original: BotSignalInput
  gbScore: SignalScore
  normalizedScore: number
  passed: boolean
  filterReason?: string
  recommendation: 'APPROVE' | 'REJECT' | 'MONITOR'
  sampleId?: string
}
```

#### Usage

```typescript
import { GBIntegrationService, getGBIntegration } from '@/lib/gradient-boosting/gb-integration-service'

const gbService = getGBIntegration({
  enabled: true,
  minScoreToPass: 40,
  minConfidenceToPass: 50,
  ensembleWeight: 0.25,
  autoTrain: true,
  filterMode: 'MODERATE'
})

// Score a bot signal
const result = await gbService.scoreBotSignal({
  botCode: 'DCA',
  symbol: 'BTCUSDT',
  exchange: 'binance',
  direction: 'LONG',
  confidence: 0.7,
  entryPrice: 50000
}, candles)

// Result: { gbScore, normalizedScore, passed, recommendation, ... }

// Get score for LOGOS aggregation
const logoScore = await gbService.getLOGOSScore(signal, candles)

// Adjust confidence
const adjusted = gbService.adjustConfidence(0.7, result.gbScore)

// Update bot integration
gbService.updateBotIntegration('DCA', { minScore: 45 })

// Get feature importance
const importance = gbService.getFeatureImportance()
```

### Scorer Instance

Singleton scorer instance for use across API routes.

**Location:** `src/lib/gradient-boosting/scorer-instance.ts`

#### Default Configuration

```typescript
const config: Partial<BoostingConfig> = {
  nEstimators: 100,
  learningRate: 0.1,
  maxDepth: 5,
  minSamplesSplit: 10,
  minSamplesLeaf: 5,
  subsample: 0.8,
  loss: 'squared',
  earlyStoppingRounds: 10,
  validationSplit: 0.2
}
```

#### Usage

```typescript
import { getScorer, scoreHistory } from '@/lib/gradient-boosting/scorer-instance'

const scorer = getScorer()

// Score features
const result = scorer.score(features)
// Returns: { score, confidence, direction, quality, features }

// Get feature importance
const importance = scorer.getFeatureImportance()

// Train with new data
scorer.train(trainingData)

// Access score history
console.log(scoreHistory)
```

---

## RL Agents

### PPO Agent

Proximal Policy Optimization implementation for trading.

**Location:** `src/lib/rl-agents/ppo-agent.ts`

#### Architecture

PPO uses an Actor-Critic network architecture:
- **Actor Network**: Outputs action probabilities
- **Critic Network**: Estimates state value

#### Configuration

```typescript
interface PPOConfig {
  learningRate: number      // default: 0.0003
  gamma: number            // default: 0.99
  clipRatio: number        // default: 0.2
  gaeLambda: number        // default: 0.95
  batchSize: number        // default: 64
  memorySize: number       // default: 2048
  hiddenLayers: number[]   // default: [64]
}
```

#### Actions

| Index | Action |
|-------|--------|
| 0 | Hold |
| 1 | Long |
| 2 | Short |
| 3 | Close Long |
| 4 | Close Short |

#### Usage

```typescript
import { PPOAgent } from '@/lib/rl-agents/ppo-agent'

const agent = new PPOAgent(20, {  // stateSize = 20
  learningRate: 0.0003,
  gamma: 0.99,
  clipRatio: 0.2,
  gaeLambda: 0.95
})

// Select action
const { action, logProb, value } = agent.selectAction(state)

// Store experience
agent.storeExperience(state, action, reward, value, logProb, done)

// Get action name
const actionName = agent.getActionFromIndex(action)
```

### DQN Agent

Deep Q-Network implementation for trading.

**Location:** `src/lib/rl-agents/dqn-agent.ts`

#### Architecture

- Neural network with configurable hidden layers
- Experience replay buffer
- Target network for stable learning
- Epsilon-greedy exploration

#### Configuration

```typescript
interface DQNConfig {
  learningRate: number      // default: 0.001
  gamma: number            // default: 0.99
  epsilon: number          // default: 1.0
  epsilonMin: number       // default: 0.01
  epsilonDecay: number     // default: 0.995
  batchSize: number        // default: 32
  memorySize: number       // default: 10000
  targetUpdateFreq: number // default: 100
  hiddenLayers: number[]   // default: [64, 64]
}
```

#### Usage

```typescript
import { DQNAgent, trainDQN } from '@/lib/rl-agents/dqn-agent'

const agent = new DQNAgent(20, {  // stateSize = 20
  learningRate: 0.001,
  gamma: 0.99,
  epsilon: 1.0
})

// Select action (epsilon-greedy)
const action = agent.selectAction(state, training)

// Step and train
agent.step(state, action, reward, nextState, done)

// Get current epsilon
const epsilon = agent.getEpsilon()

// Training function
const metrics = await trainDQN(
  agent,
  () => generateData(),
  100,  // episodes
  500,  // maxStepsPerEpisode
  (m) => console.log(m)  // onProgress
)
```

### SAC Agent

Soft Actor-Critic implementation with entropy regularization.

**Location:** `src/lib/rl-agents/ppo-agent.ts`

#### Features

- Automatic entropy tuning
- Dual Q-networks for stability
- Target entropy: -dim(A)

```typescript
import { SACAgent } from '@/lib/rl-agents/ppo-agent'

const agent = new SACAgent(20, {
  learningRate: 0.0003,
  entropyCoef: 0.2,
  hiddenLayers: [256, 256]
})

// Select action
const action = agent.selectAction(state, training)

// Get entropy coefficient
const alpha = agent.getAlpha()
```

### Training Environment

Gym-compatible environment for RL trading agents.

**Location:** `src/lib/rl-agents/environment.ts`

#### Configuration

```typescript
interface EnvironmentConfig {
  initialBalance: number      // default: 10000
  commissionRate: number      // default: 0.0004
  slippageRate: number        // default: 0.0001
  maxPosition: number         // default: 1
  leverage: number            // default: 1
  rewardScaling: number       // default: 100
  punishHolding: boolean      // default: false
  rewardFunction: 'pnl' | 'sharpe' | 'sortino' | 'calmar'
}
```

#### State Features

| Feature | Description |
|---------|-------------|
| close | Current close price |
| high/low/volume | OHLCV data |
| rsi | RSI indicator |
| macd/macdSignal | MACD values |
| atr | ATR indicator |
| adx | ADX indicator |
| position | Current position (-1, 0, 1) |
| entryPrice | Entry price for position |
| unrealizedPnl | Unrealized PnL |
| unrealizedPnlPercent | Unrealized PnL % |
| balance | Account balance |
| equity | Total equity |
| drawdown | Current drawdown |
| volatility | Price volatility |
| trend | Trend direction |
| momentum | Price momentum |
| hour/dayOfWeek | Time features |

#### Usage

```typescript
import { TradingEnvironment } from '@/lib/rl-agents/environment'

const env = new TradingEnvironment({
  initialBalance: 10000,
  commissionRate: 0.0004,
  rewardFunction: 'sharpe'
})

// Reset with data
const observation = env.reset(ohlcvData)

// Take step
const result = env.step({ type: 'long', size: 1 })
// Returns: { observation, reward, done, info }

// Get state array for neural network
const stateArray = env.getStateArray()

// Get statistics
const stats = env.getStats()
// Returns: { tradeCount, winRate, totalPnl, maxDrawdown, sharpeRatio }
```

### Training Pipeline

Complete training infrastructure for RL agents.

**Location:** `src/lib/rl-agents/training-pipeline.ts`

#### Configuration

```typescript
interface TrainingConfig {
  episodes: number               // default: 100
  maxStepsPerEpisode: number     // default: 500
  saveEvery: number              // default: 10
  evalEvery: number              // default: 5
  evalEpisodes: number           // default: 10
  earlyStoppingPatience: number  // default: 10
  earlyStoppingMetric: string    // default: 'totalReward'
  logEvery: number               // default: 1
}
```

#### Usage

```typescript
import { TrainingPipeline, quickTrain } from '@/lib/rl-agents/training-pipeline'

const pipeline = new TrainingPipeline()

// Train agent
const result = await pipeline.train('dqn', ohlcvData, {
  episodes: 100,
  maxStepsPerEpisode: 500,
  earlyStoppingPatience: 15
})

// Result: { agent, metrics, bestMetrics, checkpoints }

// Quick train
const quickResult = await quickTrain(ohlcvData, 'ppo', 50)

// Evaluate trained agent
const evalMetrics = pipeline.evaluate(agent, testData, 10)
```

---

## Deep Learning

### LSTM Neural Network

**Location:** `src/lib/deep-learning/index.ts`

#### Architecture

```
Input Layer (sequence_length=60, features=6)
    ↓
LSTM Layer 1 (units=64, dropout=0.2)
    ↓
LSTM Layer 2 (units=32, dropout=0.2)
    ↓
Dense Layer 1 (units=32, relu)
    ↓
Dropout (rate=0.2)
    ↓
Dense Layer 2 (units=16, relu)
    ↓
Dropout (rate=0.2)
    ↓
Output Layer (units=1, sigmoid)
```

#### Configuration

```typescript
interface LSTMConfig {
  sequenceLength: number      // default: 60
  inputFeatures: number       // default: 6
  lstmUnits: number[]         // default: [64, 32]
  denseUnits: number[]        // default: [32, 16]
  learningRate: number        // default: 0.001
  epochs: number              // default: 50
  batchSize: number           // default: 32
  validationSplit: number     // default: 0.2
  dropoutRate: number         // default: 0.2
}
```

#### Input Features

| Feature | Description |
|---------|-------------|
| Price Change | Normalized (close - open) / open |
| Volume Ratio | Volume / average volume |
| RSI | RSI / 100 |
| MACD | Normalized MACD histogram |
| Bollinger Position | Position within BB bands |
| ATR Normalized | ATR / close price |

#### Usage

```typescript
import { LSTMModel, getLSTMModel } from '@/lib/deep-learning'

const model = getLSTMModel({
  sequenceLength: 60,
  lstmUnits: [64, 32],
  epochs: 50,
  learningRate: 0.001
})

// Train model
const result = await model.train(candles)
// Returns: { modelId, symbol, finalLoss, finalAccuracy, trainingHistory }

// Make prediction
const prediction = await model.predict(candles)
// Returns: { direction, confidence, predictedPrice, currentPrice, predictedChange, horizon }

// Save model
await model.save('/models/lstm-btc')

// Load model
await model.load('/models/lstm-btc')

// Get metrics
const metrics = model.getMetrics()
// Returns: { accuracy, precision, recall, f1Score, totalPredictions, driftScore }
```

---

## Prediction Services

### Price Predictor

Multi-model price prediction system.

**Location:** `src/lib/prediction/price-predictor.ts`

#### Models

| Model | Type | Weight |
|-------|------|--------|
| LSTM-style | Sequential | 1.0 |
| Attention | Transformer-style | 1.0 |
| Ensemble | Combined | - |

#### Horizons

| Horizon | Multiplier |
|---------|------------|
| 1h | 1.0 |
| 4h | 1.5 |
| 24h | 2.0 |
| 7d | 3.0 |

#### Usage

```typescript
import { PricePredictor, pricePredictor } from '@/lib/prediction/price-predictor'

// Train on historical data
pricePredictor.train(ohlcv, 10)  // epochs

// Predict price
const prediction = pricePredictor.predict(ohlcv, '4h')
// Returns: { timestamp, prediction, confidence, horizon, model, features }

// Multi-horizon prediction
const multiResults = pricePredictor.predictMultiHorizon(ohlcv)
// Returns: { '1h': result, '4h': result, '24h': result, '7d': result }

// Confidence intervals
const ci = pricePredictor.getConfidenceInterval(prediction, 0.95)
// Returns: { lower, upper }

// Update performance
pricePredictor.updatePerformance(actuals, predictions)

// Get performance metrics
const performance = pricePredictor.getPerformance()
// Returns: { mse, mae, directionalAccuracy, sharpeRatio }
```

### Regime Detector

Detects market regimes using Hidden Markov Models and change point detection.

**Location:** `src/lib/prediction/regime-detector.ts`

#### Regime Types

| Regime | Description |
|--------|-------------|
| trending_up | Sustained upward movement |
| trending_down | Sustained downward movement |
| ranging | Sideways consolidation |
| volatile | High volatility period |
| breakout | Breakout from range |

#### Usage

```typescript
import { RegimeDetector, regimeDetector } from '@/lib/prediction/regime-detector'

// Detect current regime
const state = regimeDetector.detect(ohlcv)
// Returns: { timestamp, regime, probability, duration, transitionProbability }

// Detect change points
const changePoints = regimeDetector.detectChangePoints(ohlcv)

// Get regime probabilities
const probabilities = regimeDetector.getRegimeProbabilities(ohlcv)
// Returns: { trending_up: 0.3, trending_down: 0.2, ranging: 0.2, volatile: 0.2, breakout: 0.1 }

// Get regime history
const history = regimeDetector.getHistory()

// Get regime transitions
const transitions = regimeDetector.getTransitions()
```

### Volatility Model

GARCH and volatility estimation models.

**Location:** `src/lib/prediction/volatility-model.ts`

#### Models

| Model | Description |
|-------|-------------|
| GARCH(1,1) | Generalized Autoregressive Conditional Heteroskedasticity |
| EWMA | Exponentially Weighted Moving Average |
| Realized | Parkinson + Garman-Klass + Std |

#### Volatility Regimes

| Regime | Condition |
|--------|-----------|
| low | Below 25th percentile |
| normal | 25th - 75th percentile |
| high | 75th - 95th percentile |
| extreme | Above 95th percentile |

#### Usage

```typescript
import { VolatilityModel, volatilityModel, GARCHModel } from '@/lib/prediction/volatility-model'

// Estimate volatility
const estimate = volatilityModel.estimate(ohlcv)
// Returns: { timestamp, volatility, annualized, regime, percentile }

// Forecast volatility
const forecasts = volatilityModel.forecast(ohlcv, ['1h', '4h', '24h', '7d'])
// Returns: [{ timestamp, forecast, horizon, confidence: { lower, upper } }]

// Standalone GARCH
const garch = new GARCHModel({ omega: 0.00001, alpha: 0.1, beta: 0.85 })
garch.fit(prices)
const vol = garch.estimate()
const forecasts = garch.forecast(10)
const params = garch.getParams()

// Get volatility history
const history = volatilityModel.getHistory()

// Estimate implied volatility
const iv = volatilityModel.estimateImplied(
  currentPrice,
  strikePrice,
  timeToExpiry,
  riskFreeRate
)
```

---

## Self-Learning

### Genetic Optimizer

Genetic Algorithm implementation for parameter optimization.

**Location:** `src/lib/self-learning/genetic-optimizer.ts`

#### Configuration

```typescript
interface GeneticConfig {
  populationSize: number           // default: 50
  maxGenerations: number           // default: 100
  eliteCount: number               // default: 2
  selectionMethod: SelectionMethod // default: 'tournament'
  tournamentSize: number           // default: 3
  crossoverMethod: CrossoverMethod // default: 'blend'
  crossoverRate: number            // default: 0.8
  mutationMethod: MutationMethod   // default: 'adaptive'
  mutationRate: number             // default: 0.1
  adaptiveMutationIncrease: number // default: 1.5
  earlyStoppingPatience: number    // default: 20
  improvementThreshold: number     // default: 0.001
  parallelEvaluation: boolean      // default: false
}
```

#### Selection Methods

| Method | Description |
|--------|-------------|
| tournament | Best of random subset |
| roulette | Fitness-weighted random |
| rank | Rank-weighted selection |
| elitist | Bias toward top performers |

#### Crossover Methods

| Method | Description |
|--------|-------------|
| single_point | Split at one point |
| two_point | Split at two points |
| uniform | Random gene selection |
| blend | Alpha-blended values |

#### Mutation Methods

| Method | Description |
|--------|-------------|
| random | Random value in range |
| gaussian | Gaussian perturbation |
| adaptive | Adaptive perturbation size |

#### Usage

```typescript
import { GeneticOptimizer, defaultGeneticConfig } from '@/lib/self-learning/genetic-optimizer'
import type { Gene, Constraint } from '@/lib/self-learning/types'

const optimizer = new GeneticOptimizer({
  populationSize: 50,
  maxGenerations: 100,
  selectionMethod: 'tournament',
  crossoverMethod: 'blend',
  mutationMethod: 'adaptive'
})

// Define gene template
const template: Gene[] = [
  { name: 'rsi_period', min: 7, max: 21, value: 14 },
  { name: 'atr_multiplier', min: 1.0, max: 3.0, value: 2.0 },
  { name: 'risk_per_trade', min: 0.01, max: 0.05, value: 0.02 }
]

// Define constraints
const constraints: Constraint[] = [
  {
    type: 'sum',
    parameters: ['weight1', 'weight2', 'weight3'],
    min: 0.9,
    max: 1.1
  }
]

// Define fitness function
const fitnessFunction = async (genes: Gene[]) => {
  const params = Object.fromEntries(genes.map(g => [g.name, g.value]))
  const result = await backtest(params)
  return result.sharpeRatio
}

// Run optimization
const result = await optimizer.optimize(template, fitnessFunction, constraints)
// Returns: { bestChromosome, finalPopulation, history, generations, converged, durationMs }
```

### GA-GARCH Integration

Integrates GARCH volatility analysis into genetic algorithm optimization.

**Location:** `src/lib/self-learning/ga-garch-integration.ts`

#### Configuration

```typescript
interface GAGarchConfig {
  enableMutationAdjustment: boolean     // default: true
  enableFitnessPenalty: boolean        // default: true
  enableExplorationBoost: boolean      // default: true
  enableRegimeConstraints: boolean     // default: true
  extremeVolMinFitness: number         // default: 0.7
  extremeVolMaxPositionMult: number    // default: 0.5
}
```

#### Volatility Adjustments by Regime

| Regime | Mutation Mult | Fitness Penalty | Exploration Boost |
|--------|--------------|-----------------|-------------------|
| low | 0.8 | 0 | 0 |
| normal | 1.0 | 0 | 0 |
| high | 1.3 | 0.05 | 0.15 |
| extreme | 1.5 | 0.10 | 0.25 |

#### Bot-Specific Multipliers

| Bot | Mutation | Fitness | Exploration |
|-----|----------|---------|-------------|
| DCA | 0.9 | 0.95 | 0.8 |
| BB | 1.0 | 1.0 | 1.0 |
| ORION | 1.1 | 0.9 | 1.2 |
| GRID | 0.85 | 0.9 | 0.7 |

#### Usage

```typescript
import { getGAGarchIntegration, DEFAULT_GA_GARCH_CONFIG } from '@/lib/self-learning/ga-garch-integration'

const integration = getGAGarchIntegration()

// Get volatility-aware configuration
const config = integration.getVolatilityAwareConfig(
  baseGeneticConfig,
  'DCA',
  'BTCUSDT'
)
// Returns: { geneticConfig, constraints, fitnessMultiplier, explorationBoost, regimeInfo, adjustments }

// Apply fitness penalty
const penalizedFitness = integration.applyFitnessPenalty(
  fitness,
  'BTCUSDT',
  'DCA'
)

// Get exploration boost
const boost = integration.getExplorationBoost('BTCUSDT', 'ORION')

// Check parameter acceptability
const check = integration.areParamsAcceptable(
  { positionSize: 0.03 },
  'BTCUSDT',
  0.65
)
// Returns: { acceptable: boolean, reason: string }

// Get recommended population size
const popSize = integration.getRecommendedPopulationSize(50, 'BTCUSDT')

// Get diversification bonus
const bonus = integration.getDiversificationBonus(0.7, 'BTCUSDT')
```

---

## Python ML Service (FastAPI)

### Service Overview

**Port:** 3006

**Location:** `mini-services/ml-service/`

#### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/v1/predict/price` | Price prediction |
| POST | `/api/v1/predict/signal` | Signal classification |
| POST | `/api/v1/predict/regime` | Regime detection |
| POST | `/api/v1/train` | Train model |
| GET | `/api/v1/models` | List models |
| GET | `/api/v1/models/{name}/metrics` | Model metrics |
| WS | `/ws` | WebSocket predictions |

### Request/Response Schemas

#### Price Prediction

```python
# Request
class PricePredictRequest(BaseModel):
    features: List[List[List[float]]]  # (samples, sequence_length, features)
    return_confidence: bool = False

# Response
{
    "predictions": [[0.01, 0.02, ...]],  # Per horizon
    "confidence_intervals": {
        "std": [[0.005, ...]],
        "lower": [[0.005, ...]],
        "upper": [[0.015, ...]]
    }
}
```

#### Signal Classification

```python
# Request
class SignalPredictRequest(BaseModel):
    features: List[List[float]]  # (samples, features)

# Response
{
    "signals": [
        {
            "signal": "BUY",
            "confidence": 0.85,
            "probabilities": {"BUY": 0.85, "SELL": 0.10, "HOLD": 0.05}
        }
    ]
}
```

#### Regime Detection

```python
# Request
class RegimePredictRequest(BaseModel):
    observations: List[List[float]]  # [returns, volatility, volume]

# Response
{
    "regime": "trending_up",
    "probability": 0.78,
    "duration": 15,
    "transition_probabilities": {
        "trending_up": 0.78,
        "trending_down": 0.05,
        "ranging": 0.10,
        "volatile": 0.05,
        "breakout": 0.02
    }
}
```

#### Training

```python
# Request
class TrainRequest(BaseModel):
    model_type: str  # price_predictor, signal_classifier, regime_detector
    X: List[Any]
    y: Optional[List[Any]] = None
    epochs: int = 100
    batch_size: int = 32

# Response
{
    "status": "trained",
    "model_type": "price_predictor",
    "history": {"loss": [...], "accuracy": [...]}
}
```

### WebSocket Protocol

```typescript
// Subscribe to predictions
{ "type": "subscribe_predictions", "channel": "price_predictions" }

// Unsubscribe
{ "type": "unsubscribe", "channel": "price_predictions" }

// Get status
{ "type": "get_status" }

// Request prediction
{ 
    "type": "prediction_request",
    "model": "price_predictor",
    "data": { ... }
}

// Ping
{ "type": "ping" }
```

---

## Python RL Service (FastAPI)

### Service Overview

**Port:** 3007

**Location:** `mini-services/rl-service/`

#### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/v1/train/start` | Start training |
| POST | `/api/v1/train/stop` | Stop training |
| GET | `/api/v1/train/status` | Training status |
| POST | `/api/v1/predict` | Get action prediction |
| GET | `/api/v1/agents` | List agents |

### Training Configuration

```python
# Start training request
{
    "agent_type": "ppo",  # ppo, dqn, sac
    "symbol": "BTCUSDT",
    "exchange": "binance",
    "episodes": 100,
    "max_steps": 500,
    "config": {
        "learning_rate": 0.0003,
        "gamma": 0.99
    }
}
```

### Agent Types

| Agent | Best For | Key Features |
|-------|----------|--------------|
| PPO | General trading | Stable policy updates, clip ratio |
| DQN | Discrete actions | Experience replay, target network |
| SAC | Continuous control | Entropy regularization, soft updates |

---

## Usage Examples

### Example 1: Complete ML Pipeline

```typescript
import { dataCollector } from '@/lib/ml-pipeline/data-collector'
import { featureEngineer } from '@/lib/ml-pipeline/feature-engineer'
import { autoMLEngine } from '@/lib/ml-pipeline/auto-ml-engine'
import { modelRegistry } from '@/lib/ml-pipeline/model-registry'

async function runMLPipeline() {
  // 1. Collect data
  const ohlcv = await dataCollector.collectOHLCV('binance', 'BTCUSDT', '1h', 1000)
  const orderbook = await dataCollector.collectOrderbook('binance', 'BTCUSDT')
  
  // 2. Generate features with look-ahead protection
  const featureSets = featureEngineer.generateFeatures(ohlcv, orderbook)
  const validation = featureEngineer.validateNoLookahead(ohlcv, featureSets)
  
  if (!validation.valid) {
    console.warn('Look-ahead issues:', validation.issues)
  }
  
  // 3. Normalize features
  const normalized = featureEngineer.normalizeFeatures(featureSets, 'zscore')
  
  // 4. Run AutoML
  const result = await autoMLEngine.optimize(normalized, {
    targetMetric: 'directionalAccuracy',
    maxTrials: 10,
    maxTime: 300
  })
  
  // 5. Register best model
  const version = modelRegistry.registerModel(
    result.bestModel,
    null,
    result.bestMetrics
  )
  
  console.log('Best model:', result.bestModel.name)
  console.log('Metrics:', result.bestMetrics)
}
```

### Example 2: Signal Filtering with Lawrence + GB

```typescript
import { getLawrenceClassifier } from '@/lib/ml/lawrence-classifier'
import { getGBIntegration } from '@/lib/gradient-boosting/gb-integration-service'

async function filterSignal(signal, candles) {
  const lawrence = getLawrenceClassifier()
  const gb = getGBIntegration()
  
  // Lawrence classification
  const lawrenceResult = lawrence.classify(signal.features)
  
  // GB scoring
  const gbResult = await gb.scoreBotSignal(signal, candles)
  
  // Combined decision
  const combinedScore = (
    lawrenceResult.probability * 0.5 + 
    gbResult.normalizedScore / 100 * 0.5
  )
  
  const passed = combinedScore > 0.6 && gbResult.passed
  
  return {
    passed,
    combinedScore,
    lawrence: lawrenceResult,
    gb: gbResult,
    recommendation: gbResult.recommendation
  }
}
```

### Example 3: RL Training Pipeline

```typescript
import { TradingEnvironment } from '@/lib/rl-agents/environment'
import { TrainingPipeline } from '@/lib/rl-agents/training-pipeline'

async function trainRLAgent(ohlcvData) {
  const pipeline = new TrainingPipeline()
  
  const result = await pipeline.train('ppo', ohlcvData, {
    episodes: 100,
    maxStepsPerEpisode: 500,
    earlyStoppingPatience: 15
  })
  
  console.log('Training completed:')
  console.log('Best metrics:', result.bestMetrics)
  console.log('Generations:', result.generations)
  
  // Evaluate on test data
  const testMetrics = pipeline.evaluate(result.agent, testData, 10)
  
  return { agent: result.agent, metrics: testMetrics }
}
```

### Example 4: Genetic Optimization with GARCH

```typescript
import { GeneticOptimizer } from '@/lib/self-learning/genetic-optimizer'
import { getGAGarchIntegration } from '@/lib/self-learning/ga-garch-integration'

async function optimizeBotParams(symbol, botType) {
  const optimizer = new GeneticOptimizer()
  const gaGarch = getGAGarchIntegration()
  
  // Get volatility-aware config
  const volConfig = gaGarch.getVolatilityAwareConfig(
    defaultGeneticConfig,
    botType,
    symbol
  )
  
  // Apply config
  optimizer.updateConfig(volConfig.geneticConfig)
  
  // Define template
  const template = [
    { name: 'rsi_oversold', min: 20, max: 40, value: 30 },
    { name: 'rsi_overbought', min: 60, max: 80, value: 70 },
    { name: 'atr_sl_mult', min: 1.0, max: 3.0, value: 2.0 },
    { name: 'risk_per_trade', min: 0.01, max: 0.05, value: 0.02 }
  ]
  
  // Optimize
  const result = await optimizer.optimize(
    template,
    async (genes) => {
      const params = Object.fromEntries(genes.map(g => [g.name, g.value]))
      let fitness = await backtest(params)
      
      // Apply volatility penalty
      fitness = gaGarch.applyFitnessPenalty(fitness, symbol, botType)
      
      return fitness
    },
    volConfig.constraints
  )
  
  // Validate result
  const check = gaGarch.areParamsAcceptable(
    Object.fromEntries(result.bestChromosome.genes.map(g => [g.name, g.value])),
    symbol,
    result.bestChromosome.fitness
  )
  
  return {
    params: result.bestChromosome.genes,
    fitness: result.bestChromosome.fitness,
    acceptable: check.acceptable
  }
}
```

### Example 5: LSTM Training and Prediction

```typescript
import { getLSTMModel } from '@/lib/deep-learning'

async function trainAndPredict(candles) {
  const model = getLSTMModel({
    sequenceLength: 60,
    lstmUnits: [64, 32],
    epochs: 50
  })
  
  // Train
  const trainResult = await model.train(candles)
  console.log('Training completed:')
  console.log('  Loss:', trainResult.finalLoss)
  console.log('  Accuracy:', trainResult.finalAccuracy)
  
  // Predict
  const prediction = await model.predict(candles)
  console.log('Prediction:')
  console.log('  Direction:', prediction.direction)
  console.log('  Confidence:', prediction.confidence)
  console.log('  Predicted price:', prediction.predictedPrice)
  
  // Save model
  await model.save('/models/lstm-btcusdt')
  
  return { trainResult, prediction }
}
```

### Example 6: Regime Detection for Strategy Selection

```typescript
import { regimeDetector } from '@/lib/prediction/regime-detector'
import { volatilityModel } from '@/lib/prediction/volatility-model'

function selectStrategy(ohlcv) {
  const regime = regimeDetector.detect(ohlcv)
  const vol = volatilityModel.estimate(ohlcv)
  
  let strategy: string
  let riskMultiplier: number
  
  switch (regime.regime) {
    case 'trending_up':
      strategy = 'trend_following'
      riskMultiplier = 1.0
      break
    case 'trending_down':
      strategy = 'trend_following_short'
      riskMultiplier = 0.8
      break
    case 'ranging':
      strategy = 'mean_reversion'
      riskMultiplier = 0.7
      break
    case 'volatile':
      strategy = 'reduced_size'
      riskMultiplier = 0.5
      break
    case 'breakout':
      strategy = 'breakout'
      riskMultiplier = 0.6
      break
  }
  
  // Adjust for volatility regime
  if (vol.regime === 'extreme') {
    riskMultiplier *= 0.5
  } else if (vol.regime === 'high') {
    riskMultiplier *= 0.7
  }
  
  return {
    strategy,
    riskMultiplier,
    regime: regime.regime,
    regimeProbability: regime.probability,
    volatilityRegime: vol.regime,
    annualizedVol: vol.annualized
  }
}
```

---

## File Structure

```
src/lib/
├── ml/
│   ├── lawrence-classifier.ts      # k-NN with Lorentzian distance
│   ├── probability-calibrator.ts   # Probability calibration methods
│   ├── feature-extender.ts         # Dynamic feature extension
│   ├── types.ts                    # Type definitions
│   └── ...
├── ml-pipeline/
│   ├── data-collector.ts           # Multi-exchange data collection
│   ├── feature-engineer.ts         # Feature engineering
│   ├── model-registry.ts           # Model versioning
│   ├── auto-ml-engine.ts           # AutoML optimization
│   └── types.ts                    # Pipeline types
├── gradient-boosting/
│   ├── training-collector.ts       # Training data collection
│   ├── gb-integration-service.ts   # GB integration
│   └── scorer-instance.ts          # Singleton scorer
├── rl-agents/
│   ├── ppo-agent.ts                # PPO implementation
│   ├── dqn-agent.ts                # DQN implementation
│   ├── environment.ts              # Trading environment
│   └── training-pipeline.ts        # Training infrastructure
├── deep-learning/
│   └── index.ts                    # LSTM neural network
├── prediction/
│   ├── price-predictor.ts          # Multi-model prediction
│   ├── regime-detector.ts          # HMM regime detection
│   └── volatility-model.ts         # GARCH models
└── self-learning/
    ├── genetic-optimizer.ts        # Genetic algorithm
    └── ga-garch-integration.ts     # GA-GARCH integration

mini-services/
├── ml-service/                     # Python ML Service (Port 3006)
│   ├── main.py
│   ├── api/routes.py
│   ├── models/
│   │   ├── price_predictor.py
│   │   ├── signal_classifier.py
│   │   └── regime_detector.py
│   └── training/
│       ├── trainer.py
│       └── hyperopt.py
└── rl-service/                     # Python RL Service (Port 3007)
    ├── main.py
    ├── api/routes.py
    ├── agents/
    │   ├── ppo_agent.py
    │   ├── dqn_agent.py
    │   └── sac_agent.py
    └── environments/
        ├── trading_env.py
        └── portfolio_env.py
```

---

## Related Documentation

- [Backend API Reference](./BACKEND_API_REFERENCE.md)
- [Auto Trading API](./AUTO_TRADING_API.md)
- [ML Pipeline CI/CD](../ml/ML_PIPELINE_CI_CD.md)
- [Model Versioning](../ml/MODEL_VERSIONING.md)
- [Model Monitoring](../ml/MODEL_MONITORING.md)
- [Genetic Algorithm](../ml/GENETIC_ALGORITHM.md)
- [GARCH Volatility Analysis](../ml/GARCH_VOLATILITY_ANALYSIS.md)

---

*Last updated: March 2026*
