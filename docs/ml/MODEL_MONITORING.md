# Model Monitoring Guide

## Overview

This document describes the production model monitoring system for the CITARION trading platform. Effective model monitoring ensures that ML models maintain their performance and reliability in production environments, detecting issues before they impact trading performance.

### Why Model Monitoring Matters

- **Performance Degradation**: Detect when model accuracy drops
- **Data Drift**: Identify changes in input data distribution
- **Model Decay**: Track gradual performance decline over time
- **Compliance**: Maintain audit trails for regulatory requirements
- **Cost Optimization**: Identify when retraining is necessary

---

## Architecture

### Monitoring System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    MODEL MONITORING SYSTEM                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   Input      │    │   Model      │    │   Output     │      │
│  │   Metrics    │    │   Metrics    │    │   Metrics    │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│         │                   │                   │               │
│         ▼                   ▼                   ▼               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 METRICS COLLECTION LAYER                  │  │
│  │  - Real-time metric collection                            │  │
│  │  - Aggregation and sampling                               │  │
│  │  - Time-series storage                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                    │
│                            ▼                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  ANALYSIS LAYER                           │  │
│  │  - Statistical analysis                                   │  │
│  │  - Drift detection algorithms                             │  │
│  │  - Anomaly detection                                      │  │
│  │  - Performance benchmarking                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                    │
│                            ▼                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  ALERTING LAYER                           │  │
│  │  - Threshold-based alerts                                 │  │
│  │  - Anomaly-based alerts                                   │  │
│  │  - Notification routing                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                    │
│                            ▼                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  ACTION LAYER                             │  │
│  │  - Automatic rollback                                     │  │
│  │  - Retraining triggers                                    │  │
│  │  - Incident creation                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Performance Metrics to Track

### 1. Accuracy Metrics

```typescript
interface AccuracyMetrics {
  // Classification accuracy
  predictionAccuracy: number      // Correct predictions / total predictions
  directionalAccuracy: number     // Correct direction (long/short) percentage
  
  // Per-class metrics
  longPrecision: number           // True longs / predicted longs
  longRecall: number              // True longs / actual longs
  shortPrecision: number          // True shorts / predicted shorts
  shortRecall: number             // True shorts / actual shorts
  
  // Confusion matrix
  trueLongs: number
  falseLongs: number
  trueShorts: number
  falseShorts: number
  trueNeutrals: number
  falseNeutrals: number
  
  // Time-weighted accuracy
  recentAccuracy: number          // Last N hours accuracy
  rollingAccuracy24h: number      // 24-hour rolling accuracy
  rollingAccuracy7d: number       // 7-day rolling accuracy
}
```

### 2. Latency Metrics

```typescript
interface LatencyMetrics {
  // Prediction latency
  predictionLatencyAvg: number    // Average prediction time (ms)
  predictionLatencyP50: number    // 50th percentile (ms)
  predictionLatencyP95: number    // 95th percentile (ms)
  predictionLatencyP99: number    // 99th percentile (ms)
  predictionLatencyMax: number    // Maximum latency (ms)
  
  // End-to-end latency
  e2eLatencyAvg: number           // Full pipeline latency (ms)
  e2eLatencyP99: number           // 99th percentile end-to-end (ms)
  
  // Throughput
  predictionsPerSecond: number    // Current throughput
  maxThroughput: number           // Maximum sustained throughput
  
  // Queue metrics
  queueDepth: number              // Current queue size
  queueWaitTime: number           // Average wait time (ms)
}
```

### 3. Trading Performance Metrics

```typescript
interface TradingMetrics {
  // Win rate
  winRate: number                 // Winning trades / total trades
  lossRate: number                // Losing trades / total trades
  
  // Profitability
  profitFactor: number            // Gross profit / gross loss
  avgWin: number                  // Average winning trade profit
  avgLoss: number                 // Average losing trade loss
  riskRewardRatio: number         // Average win / average loss
  
  // Risk metrics
  maxDrawdown: number             // Maximum peak-to-trough decline
  sharpeRatio: number             // Risk-adjusted return
  sortinoRatio: number            // Downside risk-adjusted return
  calmarRatio: number             // Annual return / max drawdown
  
  // Signal quality
  signalQualityAvg: number        // Average signal quality score
  signalQualityTrend: number      // Quality trend (improving/declining)
  
  // Trade statistics
  totalTrades: number
  profitableTrades: number
  unprofitableTrades: number
  avgTradeDuration: number        // Average trade duration (minutes)
}
```

### 4. Model Confidence Metrics

```typescript
interface ConfidenceMetrics {
  // Confidence distribution
  avgConfidence: number           // Average prediction confidence
  confidenceStd: number           // Standard deviation of confidence
  confidenceMin: number           // Minimum confidence
  confidenceMax: number           // Maximum confidence
  
  // Confidence calibration
  calibrationError: number        // How well confidence matches accuracy
  expectedCalibrationError: number // Expected calibration error
  
  // Confidence vs outcome
  highConfidenceAccuracy: number  // Accuracy when confidence > 0.8
  lowConfidenceAccuracy: number   // Accuracy when confidence < 0.3
  
  // Agreement metrics
  mlAgreementRate: number         // ML agrees with source signals
  consensusRate: number           // Multiple models agree
}
```

### Metrics Collection Implementation

```typescript
// /src/lib/ml/model-monitor.ts

interface MetricsCollector {
  // Collect all metrics
  collect(): Promise<MonitoringMetrics>
  
  // Collect specific metric type
  collectAccuracy(): Promise<AccuracyMetrics>
  collectLatency(): Promise<LatencyMetrics>
  collectTrading(): Promise<TradingMetrics>
  collectConfidence(): Promise<ConfidenceMetrics>
}

class ModelMetricsCollector implements MetricsCollector {
  private metricStore: MetricStore
  private timeSeriesDB: TimeSeriesDB
  
  async collect(): Promise<MonitoringMetrics> {
    const [accuracy, latency, trading, confidence] = await Promise.all([
      this.collectAccuracy(),
      this.collectLatency(),
      this.collectTrading(),
      this.collectConfidence()
    ])
    
    const metrics: MonitoringMetrics = {
      timestamp: new Date(),
      modelId: this.modelId,
      version: this.currentVersion,
      accuracy,
      latency,
      trading,
      confidence
    }
    
    // Store metrics
    await this.metricStore.store(metrics)
    
    return metrics
  }
  
  async collectAccuracy(): Promise<AccuracyMetrics> {
    // Get recent predictions and outcomes
    const predictions = await this.getPredictionsWithOutcomes({
      lookback: '24h'
    })
    
    // Calculate metrics
    const total = predictions.length
    const correct = predictions.filter(p => p.predicted === p.actual).length
    
    return {
      predictionAccuracy: correct / total,
      directionalAccuracy: this.calculateDirectionalAccuracy(predictions),
      longPrecision: this.calculatePrecision(predictions, 'LONG'),
      longRecall: this.calculateRecall(predictions, 'LONG'),
      shortPrecision: this.calculatePrecision(predictions, 'SHORT'),
      shortRecall: this.calculateRecall(predictions, 'SHORT'),
      // ... other metrics
    }
  }
  
  async collectLatency(): Promise<LatencyMetrics> {
    const latencySamples = await this.timeSeriesDB.query(
      'prediction_latency',
      { lookback: '1h' }
    )
    
    return {
      predictionLatencyAvg: this.mean(latencySamples),
      predictionLatencyP50: this.percentile(latencySamples, 50),
      predictionLatencyP95: this.percentile(latencySamples, 95),
      predictionLatencyP99: this.percentile(latencySamples, 99),
      predictionLatencyMax: Math.max(...latencySamples),
      // ... other metrics
    }
  }
}
```

---

## Data Drift Detection

### Types of Drift

```
┌─────────────────────────────────────────────────────────────────┐
│                    DATA DRIFT TYPES                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. COVARIATE SHIFT (Input Drift)                               │
│     ┌─────────────────────────────────────────────┐            │
│     │  P(X) changes, P(Y|X) stays same           │            │
│     │  - Market regime change                     │            │
│     │  - New asset classes                        │            │
│     │  - Volatility regime shift                  │            │
│     └─────────────────────────────────────────────┘            │
│                                                                  │
│  2. CONCEPT DRIFT (Output Drift)                                │
│     ┌─────────────────────────────────────────────┐            │
│     │  P(Y|X) changes, P(X) stays same           │            │
│     │  - Market behavior changes                  │            │
│     │  - New trading patterns                     │            │
│     │  - Regulatory changes                       │            │
│     └─────────────────────────────────────────────┘            │
│                                                                  │
│  3. PRIOR PROBABILITY SHIFT                                     │
│     ┌─────────────────────────────────────────────┐            │
│     │  P(Y) changes                               │            │
│     │  - Class distribution changes               │            │
│     │  - More long signals than short             │            │
│     └─────────────────────────────────────────────┘            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Drift Detection Methods

```typescript
// /src/lib/ml/drift-detector.ts

interface DriftDetector {
  detectCovariateDrift(
    referenceData: Dataset,
    currentData: Dataset
  ): Promise<DriftResult>
  
  detectConceptDrift(
    predictions: Prediction[],
    outcomes: Outcome[]
  ): Promise<DriftResult>
  
  detectFeatureDrift(
    featureName: string,
    referenceData: number[],
    currentData: number[]
  ): Promise<FeatureDriftResult>
}

class StatisticalDriftDetector implements DriftDetector {
  
  // Kolmogorov-Smirnov Test for feature drift
  async detectFeatureDrift(
    featureName: string,
    reference: number[],
    current: number[]
  ): Promise<FeatureDriftResult> {
    // Sort both arrays
    const sortedRef = [...reference].sort((a, b) => a - b)
    const sortedCur = [...current].sort((a, b) => a - b)
    
    // Compute KS statistic
    const ksStatistic = this.computeKSStatistic(sortedRef, sortedCur)
    
    // Compute p-value
    const pValue = this.computeKSPValue(
      ksStatistic,
      reference.length,
      current.length
    )
    
    return {
      feature: featureName,
      ksStatistic,
      pValue,
      drifted: pValue < 0.05,  // Significant drift if p < 0.05
      severity: this.getDriftSeverity(ksStatistic),
      referenceStats: {
        mean: this.mean(reference),
        std: this.std(reference),
        min: Math.min(...reference),
        max: Math.max(...reference)
      },
      currentStats: {
        mean: this.mean(current),
        std: this.std(current),
        min: Math.min(...current),
        max: Math.max(...current)
      }
    }
  }
  
  // Population Stability Index (PSI)
  computePSI(
    reference: number[],
    current: number[],
    buckets: number = 10
  ): number {
    // Create buckets
    const breakpoints = this.createBuckets(reference, buckets)
    
    // Calculate distributions
    const refDist = this.computeHistogram(reference, breakpoints)
    const curDist = this.computeHistogram(current, breakpoints)
    
    // Compute PSI
    let psi = 0
    for (let i = 0; i < buckets; i++) {
      const refPct = (refDist[i] + 0.0001) / reference.length
      const curPct = (curDist[i] + 0.0001) / current.length
      
      psi += (curPct - refPct) * Math.log(curPct / refPct)
    }
    
    return psi
  }
  
  // PSI interpretation
  interpretPSI(psi: number): DriftSeverity {
    if (psi < 0.1) return 'none'
    if (psi < 0.25) return 'low'
    if (psi < 0.5) return 'medium'
    return 'high'
  }
  
  // Jensen-Shannon Divergence
  computeJSD(reference: number[], current: number[]): number {
    // Convert to probability distributions
    const p = this.toDistribution(reference)
    const q = this.toDistribution(current)
    const m = p.map((pi, i) => (pi + q[i]) / 2)
    
    // JSD = 0.5 * KL(P||M) + 0.5 * KL(Q||M)
    const klPM = this.klDivergence(p, m)
    const klQM = this.klDivergence(q, m)
    
    return 0.5 * klPM + 0.5 * klQM
  }
}
```

### Drift Monitoring Configuration

```yaml
# /config/drift-monitoring.yaml

drift_detection:
  # Feature drift detection
  features:
    - name: n_rsi
      method: ks_test
      threshold: 0.05
      window_size: 1000
      
    - name: n_cci
      method: ks_test
      threshold: 0.05
      window_size: 1000
      
    - name: n_wt
      method: psi
      threshold: 0.25
      window_size: 1000
      
    - name: n_adx
      method: js_divergence
      threshold: 0.1
      window_size: 1000
      
  # Overall drift detection
  overall:
    method: psi
    threshold: 0.2
    reference_window: 7d
    current_window: 1d
    
  # Schedule
  schedule:
    interval: 1h
    reference_update: 1d
    
  # Actions on drift detection
  actions:
    - severity: low
      action: log
    - severity: medium
      action: [log, alert, increase_monitoring]
    - severity: high
      action: [log, alert, trigger_retraining]
```

### Feature Drift Dashboard

```typescript
interface FeatureDriftDashboard {
  features: FeatureDriftStatus[]
  overallDrift: DriftSeverity
  lastChecked: Date
  recommendations: string[]
}

interface FeatureDriftStatus {
  feature: string
  psi: number
  ksStatistic: number
  pValue: number
  severity: 'none' | 'low' | 'medium' | 'high'
  trend: 'stable' | 'increasing' | 'decreasing'
  visualization: {
    referenceDistribution: number[]
    currentDistribution: number[]
    bins: number[]
  }
}

// Example dashboard data
const driftDashboard: FeatureDriftDashboard = {
  features: [
    {
      feature: 'n_rsi',
      psi: 0.08,
      ksStatistic: 0.04,
      pValue: 0.62,
      severity: 'none',
      trend: 'stable'
    },
    {
      feature: 'n_cci',
      psi: 0.35,
      ksStatistic: 0.12,
      pValue: 0.02,
      severity: 'medium',
      trend: 'increasing'
    },
    {
      feature: 'n_adx',
      psi: 0.55,
      ksStatistic: 0.18,
      pValue: 0.001,
      severity: 'high',
      trend: 'increasing'
    }
  ],
  overallDrift: 'medium',
  lastChecked: new Date(),
  recommendations: [
    'Consider retraining model due to n_adx drift',
    'Monitor n_cci closely for further drift'
  ]
}
```

---

## Model Decay Indicators

### Types of Model Decay

```typescript
interface ModelDecayIndicators {
  // Performance decay
  performanceDecay: {
    accuracyDrop: number           // % drop from baseline
    precisionDrop: number
    recallDrop: number
    f1Drop: number
  }
  
  // Calibration decay
  calibrationDecay: {
    expectedCalibrationError: number
    reliabilityDiagramShift: number
  }
  
  // Trading decay
  tradingDecay: {
    winRateDrop: number            // % drop from baseline
    profitFactorDrop: number
    sharpeRatioDrop: number
  }
  
  // Feature importance shift
  featureImportanceShift: {
    topFeatureChanged: boolean
    importanceCorrelation: number  // Correlation with original importance
  }
  
  // Confidence decay
  confidenceDecay: {
    avgConfidenceDrop: number
    highConfidenceAccuracyDrop: number
  }
}
```

### Decay Detection Algorithm

```typescript
// /src/lib/ml/decay-detector.ts

class ModelDecayDetector {
  private baselineMetrics: BaselineMetrics
  private decayThresholds: DecayThresholds
  
  async detectDecay(): Promise<DecayReport> {
    const currentMetrics = await this.collectCurrentMetrics()
    const indicators: ModelDecayIndicators = {
      performanceDecay: this.computePerformanceDecay(currentMetrics),
      calibrationDecay: this.computeCalibrationDecay(currentMetrics),
      tradingDecay: this.computeTradingDecay(currentMetrics),
      featureImportanceShift: await this.computeFeatureShift(),
      confidenceDecay: this.computeConfidenceDecay(currentMetrics)
    }
    
    // Calculate overall decay score
    const decayScore = this.computeDecayScore(indicators)
    
    return {
      modelId: this.modelId,
      version: this.currentVersion,
      timestamp: new Date(),
      indicators,
      decayScore,
      severity: this.getDecaySeverity(decayScore),
      recommendation: this.getRecommendation(decayScore),
      timeToRetraining: this.estimateRetrainingTime(decayScore)
    }
  }
  
  private computePerformanceDecay(metrics: CurrentMetrics): PerformanceDecay {
    return {
      accuracyDrop: this.baseline.accuracy - metrics.accuracy,
      precisionDrop: this.baseline.precision - metrics.precision,
      recallDrop: this.baseline.recall - metrics.recall,
      f1Drop: this.baseline.f1 - metrics.f1
    }
  }
  
  private computeDecayScore(indicators: ModelDecayIndicators): number {
    // Weighted decay score (0-100)
    const weights = {
      performance: 0.35,
      calibration: 0.15,
      trading: 0.30,
      featureShift: 0.10,
      confidence: 0.10
    }
    
    const scores = {
      performance: this.normalizeDecay(indicators.performanceDecay.accuracyDrop, 0.15),
      calibration: this.normalizeDecay(indicators.calibrationDecay.expectedCalibrationError, 0.2),
      trading: this.normalizeDecay(indicators.tradingDecay.winRateDrop, 0.20),
      featureShift: indicators.featureImportanceShift.topFeatureChanged ? 100 : 
                    (1 - indicators.featureImportanceShift.importanceCorrelation) * 100,
      confidence: this.normalizeDecay(indicators.confidenceDecay.avgConfidenceDrop, 0.15)
    }
    
    return (
      weights.performance * scores.performance +
      weights.calibration * scores.calibration +
      weights.trading * scores.trading +
      weights.featureShift * scores.featureShift +
      weights.confidence * scores.confidence
    )
  }
  
  private getRecommendation(decayScore: number): string {
    if (decayScore < 20) {
      return 'Model performance is stable. Continue monitoring.'
    } else if (decayScore < 40) {
      return 'Minor decay detected. Schedule retraining within 1 week.'
    } else if (decayScore < 60) {
      return 'Moderate decay detected. Schedule retraining within 24 hours.'
    } else if (decayScore < 80) {
      return 'Significant decay detected. Consider immediate rollback or retraining.'
    } else {
      return 'Critical decay detected. Immediate action required.'
    }
  }
}
```

### Decay Monitoring Schedule

```yaml
# /config/decay-monitoring.yaml

decay_detection:
  # Detection schedule
  schedule:
    quick_check: 5m    # Quick metrics check
    full_analysis: 1h  # Complete decay analysis
    deep_analysis: 24h # Include feature importance
    
  # Thresholds
  thresholds:
    performance_drop_warning: 0.05    # 5% drop warning
    performance_drop_critical: 0.10   # 10% drop critical
    win_rate_drop_warning: 0.05
    win_rate_drop_critical: 0.10
    
  # Baseline update
  baseline:
    update_frequency: 7d
    min_samples: 1000
    
  # Alerting
  alerts:
    - severity: warning
      threshold: 30
      channels: [slack, email]
    - severity: critical
      threshold: 60
      channels: [slack, email, pagerduty]
```

---

## Alerting Configuration

### Alert Types

```typescript
interface ModelAlert {
  id: string
  timestamp: Date
  modelId: string
  version: string
  
  type: AlertType
  severity: 'info' | 'warning' | 'error' | 'critical'
  
  metric: string
  currentValue: number
  threshold: number
  
  message: string
  context: Record<string, any>
  
  acknowledged: boolean
  acknowledgedBy?: string
  acknowledgedAt?: Date
}

type AlertType = 
  | 'accuracy_drop'
  | 'latency_spike'
  | 'drift_detected'
  | 'decay_warning'
  | 'prediction_error'
  | 'data_quality_issue'
  | 'model_unavailable'
```

### Alert Configuration

```typescript
// /config/alerting-rules.yaml

interface AlertRule {
  name: string
  enabled: boolean
  
  condition: {
    metric: string
    operator: '>' | '<' | '==' | '!=' | '>= | '<='
    threshold: number
    for: string  // Duration string like "5m", "1h"
  }
  
  severity: 'info' | 'warning' | 'error' | 'critical'
  
  notification: {
    channels: string[]
    template: string
  }
  
  actions?: {
    autoResolve: boolean
    autoRollback: boolean
    createIncident: boolean
  }
}

const alertRules: AlertRule[] = [
  {
    name: 'accuracy_drop_warning',
    enabled: true,
    condition: {
      metric: 'prediction_accuracy',
      operator: '<',
      threshold: 0.65,
      for: '15m'
    },
    severity: 'warning',
    notification: {
      channels: ['slack-ml-alerts', 'email-ml-team'],
      template: 'accuracy_drop_warning'
    }
  },
  {
    name: 'accuracy_drop_critical',
    enabled: true,
    condition: {
      metric: 'prediction_accuracy',
      operator: '<',
      threshold: 0.55,
      for: '5m'
    },
    severity: 'critical',
    notification: {
      channels: ['slack-ml-alerts', 'pagerduty', 'email-ml-team'],
      template: 'accuracy_drop_critical'
    },
    actions: {
      autoResolve: false,
      autoRollback: true,
      createIncident: true
    }
  },
  {
    name: 'latency_spike',
    enabled: true,
    condition: {
      metric: 'prediction_latency_p99',
      operator: '>',
      threshold: 5,  // ms
      for: '5m'
    },
    severity: 'warning',
    notification: {
      channels: ['slack-ml-alerts'],
      template: 'latency_spike'
    }
  },
  {
    name: 'feature_drift_detected',
    enabled: true,
    condition: {
      metric: 'drift_severity',
      operator: '>',
      threshold: 0.5,  // PSI > 0.5
      for: '1h'
    },
    severity: 'warning',
    notification: {
      channels: ['slack-ml-alerts', 'email-ml-team'],
      template: 'drift_detected'
    },
    actions: {
      autoResolve: false,
      autoRollback: false,
      createIncident: false
    }
  }
]
```

### Alert Manager Implementation

```typescript
// /src/lib/ml/alert-manager.ts

class ModelAlertManager {
  private rules: AlertRule[]
  private notificationService: NotificationService
  private actionExecutor: ActionExecutor
  
  async evaluateRules(metrics: MonitoringMetrics): Promise<ModelAlert[]> {
    const alerts: ModelAlert[] = []
    
    for (const rule of this.rules) {
      if (!rule.enabled) continue
      
      const metricValue = this.getMetricValue(metrics, rule.condition.metric)
      const conditionMet = this.evaluateCondition(
        metricValue,
        rule.condition.operator,
        rule.condition.threshold
      )
      
      if (conditionMet) {
        // Check if condition has been met for the required duration
        const durationMet = await this.checkDuration(
          rule.name,
          rule.condition.for
        )
        
        if (durationMet) {
          const alert: ModelAlert = {
            id: generateId(),
            timestamp: new Date(),
            modelId: metrics.modelId,
            version: metrics.version,
            type: rule.name as AlertType,
            severity: rule.severity,
            metric: rule.condition.metric,
            currentValue: metricValue,
            threshold: rule.condition.threshold,
            message: this.formatMessage(rule, metricValue),
            context: { metrics },
            acknowledged: false
          }
          
          alerts.push(alert)
          
          // Send notifications
          await this.notificationService.send(
            rule.notification.channels,
            rule.notification.template,
            alert
          )
          
          // Execute actions
          if (rule.actions) {
            await this.executeActions(rule.actions, alert)
          }
        }
      } else {
        // Condition no longer met, reset duration tracker
        await this.resetDurationTracker(rule.name)
      }
    }
    
    return alerts
  }
  
  private async executeActions(
    actions: AlertActions,
    alert: ModelAlert
  ): Promise<void> {
    if (actions.autoRollback && alert.severity === 'critical') {
      await this.actionExecutor.executeRollback(alert.modelId)
    }
    
    if (actions.createIncident) {
      await this.actionExecutor.createIncident(alert)
    }
  }
}
```

### Notification Templates

```typescript
// /config/notification-templates.yaml

templates:
  accuracy_drop_warning:
    slack: |
      ⚠️ *Model Accuracy Warning*
      
      Model: {{modelId}}
      Version: {{version}}
      
      Accuracy dropped to {{currentValue | pct}} (threshold: {{threshold | pct}})
      
      Time: {{timestamp}}
      
    email:
      subject: "[WARNING] Model Accuracy Drop - {{modelId}}"
      body: |
        Model accuracy has dropped below the warning threshold.
        
        Details:
        - Model: {{modelId}}
        - Version: {{version}}
        - Current Accuracy: {{currentValue | pct}}
        - Threshold: {{threshold | pct}}
        - Time: {{timestamp}}
        
        Please investigate and consider retraining if necessary.
        
  accuracy_drop_critical:
    slack: |
      🚨 *CRITICAL: Model Accuracy Drop*
      
      Model: {{modelId}}
      Version: {{version}}
      
      Accuracy dropped to {{currentValue | pct}} (threshold: {{threshold | pct}})
      
      ⚠️ *Automatic rollback has been triggered*
      
      Time: {{timestamp}}
      
    pagerduty:
      summary: "Model {{modelId}} accuracy critical"
      severity: critical
      custom_details:
        model_id: "{{modelId}}"
        version: "{{version}}"
        current_value: "{{currentValue}}"
        threshold: "{{threshold}}"
```

---

## Retraining Triggers

### Automatic Retraining Conditions

```typescript
interface RetrainingTrigger {
  name: string
  enabled: boolean
  
  condition: {
    type: 'threshold' | 'schedule' | 'drift' | 'decay' | 'manual'
    parameters: Record<string, any>
  }
  
  action: {
    pipeline: string
    parameters: Record<string, any>
    notifyOnStart: boolean
    notifyOnComplete: boolean
    autoPromote: boolean
  }
}

const retrainingTriggers: RetrainingTrigger[] = [
  // Threshold-based triggers
  {
    name: 'accuracy_below_threshold',
    enabled: true,
    condition: {
      type: 'threshold',
      parameters: {
        metric: 'prediction_accuracy',
        threshold: 0.60,
        duration: '30m'
      }
    },
    action: {
      pipeline: 'lawrence-classifier-retrain',
      parameters: {
        data_lookback: '30d'
      },
      notifyOnStart: true,
      notifyOnComplete: true,
      autoPromote: false
    }
  },
  
  // Schedule-based triggers
  {
    name: 'weekly_retraining',
    enabled: true,
    condition: {
      type: 'schedule',
      parameters: {
        cron: '0 2 * * 0'  // Weekly on Sunday at 2 AM
      }
    },
    action: {
      pipeline: 'lawrence-classifier-retrain',
      parameters: {
        data_lookback: '7d'
      },
      notifyOnStart: false,
      notifyOnComplete: true,
      autoPromote: false
    }
  },
  
  // Drift-based triggers
  {
    name: 'high_drift_retrain',
    enabled: true,
    condition: {
      type: 'drift',
      parameters: {
        psiThreshold: 0.5,
        features: ['n_adx', 'n_cci']
      }
    },
    action: {
      pipeline: 'lawrence-classifier-retrain',
      parameters: {
        data_lookback: '14d',
        feature_recalibration: true
      },
      notifyOnStart: true,
      notifyOnComplete: true,
      autoPromote: false
    }
  },
  
  // Decay-based triggers
  {
    name: 'model_decay_retrain',
    enabled: true,
    condition: {
      type: 'decay',
      parameters: {
        decayScoreThreshold: 50
      }
    },
    action: {
      pipeline: 'lawrence-classifier-retrain',
      parameters: {
        data_lookback: '30d',
        hyperparameter_tuning: true
      },
      notifyOnStart: true,
      notifyOnComplete: true,
      autoPromote: false
    }
  }
]
```

### Retraining Pipeline

```typescript
// /src/lib/ml/retraining-pipeline.ts

class RetrainingPipeline {
  
  async execute(trigger: RetrainingTrigger): Promise<RetrainingResult> {
    console.log(`Starting retraining pipeline: ${trigger.name}`)
    
    // Notify
    if (trigger.action.notifyOnStart) {
      await this.notifyStart(trigger)
    }
    
    try {
      // Step 1: Prepare data
      const data = await this.prepareTrainingData(trigger.action.parameters)
      
      // Step 2: Train model
      const model = await this.trainModel(data, trigger.action.parameters)
      
      // Step 3: Validate model
      const validation = await this.validateModel(model)
      
      // Step 4: Register model
      const version = await this.registerModel(model, validation)
      
      // Step 5: Promote if auto-promote enabled
      if (trigger.action.autoPromote && validation.passed) {
        await this.promoteToProduction(version)
      }
      
      const result: RetrainingResult = {
        success: true,
        version,
        validation,
        duration: this.getDuration()
      }
      
      // Notify completion
      if (trigger.action.notifyOnComplete) {
        await this.notifyComplete(trigger, result)
      }
      
      return result
      
    } catch (error) {
      // Notify failure
      await this.notifyFailure(trigger, error)
      throw error
    }
  }
  
  private async prepareTrainingData(params: Record<string, any>): Promise<TrainingData> {
    const lookback = params.data_lookback || '30d'
    
    // Fetch historical data
    const ohlcv = await this.fetchOHLCV(lookback)
    
    // Fetch signal outcomes
    const outcomes = await this.fetchSignalOutcomes(lookback)
    
    // Extract features
    const features = await this.extractFeatures(ohlcv)
    
    // Split data
    const { train, validation, test } = this.splitData(features, outcomes)
    
    return { train, validation, test }
  }
  
  private async validateModel(model: TrainedModel): Promise<ValidationResult> {
    const metrics = await this.computeMetrics(model)
    
    const checks = [
      { name: 'accuracy', pass: metrics.accuracy >= 0.65 },
      { name: 'precision', pass: metrics.precision >= 0.60 },
      { name: 'recall', pass: metrics.recall >= 0.60 },
      { name: 'latency', pass: metrics.avgLatencyMs <= 1 },
      { name: 'win_rate', pass: metrics.winRate >= 0.55 }
    ]
    
    return {
      passed: checks.every(c => c.pass),
      metrics,
      checks,
      recommendations: this.getRecommendations(checks)
    }
  }
}
```

---

## Dashboard Setup

### Grafana Dashboard Configuration

```json
{
  "dashboard": {
    "title": "CITARION ML Model Monitoring",
    "uid": "citarion-ml-monitoring",
    "panels": [
      {
        "title": "Model Accuracy",
        "type": "graph",
        "gridPos": { "x": 0, "y": 0, "w": 12, "h": 8 },
        "targets": [
          {
            "expr": "model_prediction_accuracy{model=\"lawrence-classifier\"}",
            "legendFormat": "Accuracy"
          },
          {
            "expr": "model_directional_accuracy{model=\"lawrence-classifier\"}",
            "legendFormat": "Directional"
          }
        ],
        "alert": {
          "conditions": [
            {
              "evaluator": { "type": "lt", "params": [0.65] },
              "operator": { "type": "and" },
              "query": { "params": ["A", "5m", "now"] },
              "reducer": { "type": "avg" }
            }
          ],
          "name": "Accuracy Alert"
        }
      },
      {
        "title": "Prediction Latency",
        "type": "graph",
        "gridPos": { "x": 12, "y": 0, "w": 12, "h": 8 },
        "targets": [
          {
            "expr": "histogram_quantile(0.50, rate(prediction_latency_bucket{model=\"lawrence-classifier\"}[5m]))",
            "legendFormat": "p50"
          },
          {
            "expr": "histogram_quantile(0.95, rate(prediction_latency_bucket{model=\"lawrence-classifier\"}[5m]))",
            "legendFormat": "p95"
          },
          {
            "expr": "histogram_quantile(0.99, rate(prediction_latency_bucket{model=\"lawrence-classifier\"}[5m]))",
            "legendFormat": "p99"
          }
        ]
      },
      {
        "title": "Feature Drift (PSI)",
        "type": "graph",
        "gridPos": { "x": 0, "y": 8, "w": 12, "h": 8 },
        "targets": [
          {
            "expr": "feature_psi{model=\"lawrence-classifier\",feature=\"n_rsi\"}",
            "legendFormat": "RSI"
          },
          {
            "expr": "feature_psi{model=\"lawrence-classifier\",feature=\"n_cci\"}",
            "legendFormat": "CCI"
          },
          {
            "expr": "feature_psi{model=\"lawrence-classifier\",feature=\"n_adx\"}",
            "legendFormat": "ADX"
          }
        ],
        "alert": {
          "conditions": [
            {
              "evaluator": { "type": "gt", "params": [0.25] },
              "query": { "params": ["A", "1h", "now"] }
            }
          ],
          "name": "Drift Alert"
        }
      },
      {
        "title": "Trading Performance",
        "type": "stat",
        "gridPos": { "x": 12, "y": 8, "w": 12, "h": 8 },
        "targets": [
          {
            "expr": "model_win_rate{model=\"lawrence-classifier\"}",
            "legendFormat": "Win Rate"
          },
          {
            "expr": "model_profit_factor{model=\"lawrence-classifier\"}",
            "legendFormat": "Profit Factor"
          },
          {
            "expr": "model_sharpe_ratio{model=\"lawrence-classifier\"}",
            "legendFormat": "Sharpe"
          }
        ]
      },
      {
        "title": "Model Decay Score",
        "type": "gauge",
        "gridPos": { "x": 0, "y": 16, "w": 8, "h": 8 },
        "targets": [
          {
            "expr": "model_decay_score{model=\"lawrence-classifier\"}",
            "legendFormat": "Decay Score"
          }
        ],
        "thresholds": "0,30,60"
      },
      {
        "title": "Active Alerts",
        "type": "table",
        "gridPos": { "x": 8, "y": 16, "w": 16, "h": 8 },
        "targets": [
          {
            "expr": "ALERTS{model=\"lawrence-classifier\",alertstate=\"firing\"}",
            "format": "table"
          }
        ]
      }
    ]
  }
}
```

### Prometheus Metrics Export

```typescript
// /src/lib/ml/metrics-exporter.ts

import { Registry, Gauge, Histogram, Counter } from 'prom-client'

class MLMetricsExporter {
  private registry: Registry
  
  // Gauges
  private accuracyGauge: Gauge
  private driftGauge: Gauge
  private decayGauge: Gauge
  
  // Histograms
  private latencyHistogram: Histogram
  
  // Counters
  private predictionCounter: Counter
  private errorCounter: Counter
  
  constructor() {
    this.registry = new Registry()
    
    // Initialize metrics
    this.accuracyGauge = new Gauge({
      name: 'model_prediction_accuracy',
      help: 'Current model prediction accuracy',
      labelNames: ['model', 'version'],
      registers: [this.registry]
    })
    
    this.driftGauge = new Gauge({
      name: 'feature_psi',
      help: 'Population Stability Index for features',
      labelNames: ['model', 'feature'],
      registers: [this.registry]
    })
    
    this.decayGauge = new Gauge({
      name: 'model_decay_score',
      help: 'Model decay score (0-100)',
      labelNames: ['model', 'version'],
      registers: [this.registry]
    })
    
    this.latencyHistogram = new Histogram({
      name: 'prediction_latency',
      help: 'Prediction latency in milliseconds',
      labelNames: ['model'],
      buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5, 10],
      registers: [this.registry]
    })
    
    this.predictionCounter = new Counter({
      name: 'predictions_total',
      help: 'Total predictions made',
      labelNames: ['model', 'result'],
      registers: [this.registry]
    })
    
    this.errorCounter = new Counter({
      name: 'prediction_errors_total',
      help: 'Total prediction errors',
      labelNames: ['model', 'error_type'],
      registers: [this.registry]
    })
  }
  
  async exportMetrics(metrics: MonitoringMetrics): Promise<void> {
    // Export accuracy
    this.accuracyGauge
      .labels(metrics.modelId, metrics.version)
      .set(metrics.accuracy.predictionAccuracy)
    
    // Export drift
    for (const [feature, psi] of Object.entries(metrics.drift)) {
      this.driftGauge
        .labels(metrics.modelId, feature)
        .set(psi)
    }
    
    // Export decay
    this.decayGauge
      .labels(metrics.modelId, metrics.version)
      .set(metrics.decayScore)
  }
  
  recordLatency(modelId: string, latencyMs: number): void {
    this.latencyHistogram.labels(modelId).observe(latencyMs)
  }
  
  recordPrediction(modelId: string, result: 'correct' | 'incorrect'): void {
    this.predictionCounter.labels(modelId, result).inc()
  }
  
  getMetrics(): Promise<string> {
    return this.registry.metrics()
  }
}
```

### Dashboard Access

The ML monitoring dashboard is available at:

- **Grafana**: `http://grafana.citarion.internal/d/citarion-ml-monitoring`
- **Internal API**: `GET /api/ml/monitoring/dashboard`

---

## Best Practices

### 1. Monitor Early and Often

```typescript
// Start monitoring from day one
const monitor = new ModelMonitor({
  modelId: 'lawrence-classifier',
  version: '1.0.0',
  
  // Collect metrics from the start
  collectFromStart: true,
  
  // Establish baselines quickly
  baselineMinSamples: 100
})
```

### 2. Set Appropriate Thresholds

```typescript
// Use data-driven thresholds
const thresholds = {
  // Based on historical performance
  accuracy: {
    warning: baselineAccuracy - 0.05,  // 5% below baseline
    critical: baselineAccuracy - 0.10   // 10% below baseline
  },
  
  // Based on latency requirements
  latency: {
    warning: 1.0,   // 1ms warning
    critical: 5.0   // 5ms critical
  }
}
```

### 3. Implement Graceful Degradation

```typescript
// When model performance degrades, fall back gracefully
if (metrics.accuracy < 0.50) {
  // Use fallback strategy
  return {
    useModel: false,
    reason: 'Model accuracy below threshold',
    fallback: 'use_baseline_signal'
  }
}
```

### 4. Maintain Alert Hygiene

```typescript
// Prevent alert fatigue
const alertConfig = {
  // Group similar alerts
  grouping: {
    window: '5m',
    fields: ['modelId', 'type']
  },
  
  // Suppress duplicates
  suppression: {
    enabled: true,
    duration: '30m'
  },
  
  // Require acknowledgement for critical alerts
  acknowledgement: {
    required: ['critical'],
    timeout: '1h'
  }
}
```

### 5. Version Dashboards and Alerts

```bash
# Store dashboard and alert configurations in git
git add config/grafana/ml-monitoring.json
git add config/alerting-rules.yaml
git commit -m "Update ML monitoring thresholds"
```

---

## Related Documentation

- [Model Versioning Guide](./MODEL_VERSIONING.md) - Model version control
- [ML Pipeline CI/CD](./ML_PIPELINE_CI_CD.md) - Automated training and deployment
- [ML Integration Guide](./ML_INTEGRATION.md) - Overall ML system
- [Deployment Monitoring](../deployment/MONITORING_AND_ALERTING.md) - System monitoring
- [Incident Response](../deployment/INCIDENT_RESPONSE_PLAYBOOK.md) - Handling incidents

---

*Last updated: January 2025*
