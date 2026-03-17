# Model Versioning Guide

## Overview

This document describes how ML models are versioned in the CITARION trading platform. Proper model versioning ensures reproducibility, enables rollback capabilities, and maintains audit trails for regulatory compliance.

### Why Model Versioning Matters

- **Reproducibility**: Track exact model versions used for predictions
- **Rollback**: Quickly revert to stable versions when issues arise
- **Audit Trail**: Maintain compliance with financial regulations
- **Experimentation**: Compare model versions systematically
- **Collaboration**: Enable team members to share and review models

---

## Version Naming Conventions

### Semantic Versioning for ML Models

CITARION uses a modified semantic versioning scheme adapted for ML models:

```
MAJOR.MINOR.PATCH-BUILD

Examples:
- 2.1.0-20240115  (Major feature update, build from Jan 15, 2024)
- 2.1.1-20240120  (Patch fix, build from Jan 20, 2024)
- 3.0.0-20240201  (Major version, potential breaking changes)
```

### Version Components

| Component | Increment When | Example |
|-----------|---------------|---------|
| **MAJOR** | Model architecture change, new features | New classifier type, different algorithm |
| **MINOR** | Retraining with new data, hyperparameter changes | Learning rate adjustment, more training data |
| **PATCH** | Bug fixes, minor optimizations | Fix data preprocessing, adjust thresholds |
| **BUILD** | Every training run (timestamp) | Date in YYYYMMDD format |

### Naming Convention

```typescript
interface ModelVersion {
  // Full version string
  version: string  // e.g., "2.1.0-20240115"
  
  // Parsed components
  major: number    // Breaking changes
  minor: number    // Feature updates
  patch: number    // Bug fixes
  build: string    // Build timestamp
  
  // Model identifier
  modelName: string  // e.g., "lawrence-classifier"
  modelType: string  // e.g., "classification", "regression"
}

// Example version object
const version: ModelVersion = {
  version: "2.1.0-20240115",
  major: 2,
  minor: 1,
  patch: 0,
  build: "20240115",
  modelName: "lawrence-classifier",
  modelType: "classification"
}
```

### Branch Naming for Experiments

```
experiment/<model-name>/<feature-description>

Examples:
- experiment/lawrence-classifier/lorentzian-optimization
- experiment/price-predictor/lstm-architecture
- experiment/regime-detector/ensemble-methods
```

---

## Model Registry Setup

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    MODEL REGISTRY                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   Training   │───>│   Staging    │───>│  Production  │      │
│  │   Models     │    │   Models     │    │   Models     │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│         │                   │                   │               │
│         ▼                   ▼                   ▼               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Model Metadata Store                   │  │
│  │  - Version history                                        │  │
│  │  - Training metrics                                       │  │
│  │  - Performance metrics                                    │  │
│  │  - Lineage tracking                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Registry Implementation

```typescript
// /src/lib/ml/model-registry.ts

interface ModelRegistry {
  // Register a new model version
  registerModel(model: RegisteredModel): Promise<string>
  
  // Get model by version
  getModel(modelName: string, version: string): Promise<ModelArtifact>
  
  // List all versions of a model
  listVersions(modelName: string): Promise<ModelVersionInfo[]>
  
  // Promote model to production
  promoteToProduction(modelName: string, version: string): Promise<void>
  
  // Get current production model
  getProductionModel(modelName: string): Promise<ModelArtifact>
  
  // Rollback to previous version
  rollback(modelName: string, targetVersion: string): Promise<void>
}

interface RegisteredModel {
  name: string
  version: string
  type: 'classification' | 'regression' | 'clustering' | 'reinforcement-learning'
  
  // Training information
  trainingConfig: TrainingConfig
  trainingMetrics: TrainingMetrics
  
  // Model artifact location
  artifactPath: string
  artifactType: 'pickle' | 'onnx' | 'tensorflow' | 'pytorch' | 'custom'
  
  // Metadata
  description: string
  tags: string[]
  author: string
  createdAt: Date
  
  // Dependencies
  dependencies: Dependency[]
  
  // Dataset information
  datasetInfo: DatasetInfo
}

interface ModelArtifact {
  modelId: string
  version: string
  artifactUrl: string
  checksum: string
  size: number
  loadedAt?: Date
}
```

### Storage Configuration

```yaml
# /config/model-registry.yaml

registry:
  storage:
    type: s3  # or 'local', 'gcs', 'azure'
    bucket: citarion-models
    region: us-east-1
    prefix: models/
    
  metadata:
    type: postgresql
    table: model_registry
    
  cache:
    enabled: true
    maxSize: 10GB
    ttl: 3600  # 1 hour
    
  retention:
    trainingVersions: 10  # Keep last 10 training versions
    stagingVersions: 5    # Keep last 5 staging versions
    productionVersions: 20 # Keep last 20 production versions
```

### Database Schema

```sql
-- Model Registry Tables

CREATE TABLE models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE model_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID REFERENCES models(id),
  version VARCHAR(50) NOT NULL,
  major INT NOT NULL,
  minor INT NOT NULL,
  patch INT NOT NULL,
  build VARCHAR(20) NOT NULL,
  
  -- Artifact information
  artifact_path VARCHAR(500) NOT NULL,
  artifact_type VARCHAR(50) NOT NULL,
  checksum VARCHAR(128) NOT NULL,
  size BIGINT NOT NULL,
  
  -- Stage
  stage VARCHAR(20) DEFAULT 'training',  -- training, staging, production, archived
  
  -- Metrics
  training_metrics JSONB,
  validation_metrics JSONB,
  production_metrics JSONB,
  
  -- Metadata
  description TEXT,
  tags TEXT[],
  author VARCHAR(100),
  config JSONB,
  
  created_at TIMESTAMP DEFAULT NOW(),
  promoted_at TIMESTAMP,
  
  UNIQUE(model_id, version)
);

CREATE TABLE model_lineage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_version_id UUID REFERENCES model_versions(id),
  parent_version_id UUID REFERENCES model_versions(id),
  relationship VARCHAR(50),  -- 'derived_from', 'trained_from', 'merged_with'
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE model_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_version_id UUID REFERENCES model_versions(id),
  event_type VARCHAR(50) NOT NULL,  -- 'registered', 'promoted', 'rolled_back', 'deprecated'
  event_data JSONB,
  user_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Version Control Workflow

### Development Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    MODEL DEVELOPMENT WORKFLOW                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐  │
│   │ Develop │────>│  Train  │────>│ Validate│────>│ Register│  │
│   └─────────┘     └─────────┘     └─────────┘     └─────────┘  │
│        │              │               │               │         │
│        ▼              ▼               ▼               ▼         │
│   Git Branch     Training         Holdout          Model       │
│   + Experiment   Pipeline         Tests            Registry    │
│   Tracking                       + Backtest                     │
│                                                                  │
│                        ┌─────────┐                              │
│                        │ Staging │<──── Register                │
│                        └─────────┘                              │
│                             │                                   │
│                             ▼                                   │
│                        ┌─────────┐     ┌─────────────┐         │
│                        │ Deploy  │────>│ Production  │         │
│                        │  Test   │     │             │         │
│                        └─────────┘     └─────────────┘         │
│                                            │                    │
│                                            ▼                    │
│                                     ┌─────────────┐            │
│                                     │  Monitoring │            │
│                                     └─────────────┘            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Git Workflow for ML Models

```bash
# 1. Create experiment branch
git checkout -b experiment/lawrence-classifier/feature-enhancement

# 2. Make changes and train
python scripts/train_model.py --config configs/experiment.yaml

# 3. Track experiment with DVC (or similar)
dvc run -n train -d data/train.csv -d configs/experiment.yaml -o models/experiment.pkl python train.py

# 4. Register model if successful
python scripts/register_model.py \
  --model-path models/experiment.pkl \
  --name lawrence-classifier \
  --version 2.2.0-$(date +%Y%m%d) \
  --description "Enhanced feature extraction"

# 5. Create PR with model metadata
git add models/model-metadata.json
git commit -m "feat: Lawrence classifier v2.2.0 with enhanced features"
git push origin experiment/lawrence-classifier/feature-enhancement
```

### Model Promotion Workflow

```typescript
// /src/lib/ml/model-promotion.ts

interface PromotionWorkflow {
  stages: PromotionStage[]
  requirements: PromotionRequirement[]
}

interface PromotionStage {
  name: 'training' | 'staging' | 'production'
  checks: ValidationCheck[]
  autoApprove: boolean
  requiredApprovers: number
}

interface PromotionRequirement {
  metric: string
  operator: '>' | '>=' | '<' | '<=' | '=='
  threshold: number
  comparison?: 'baseline' | 'previous_version'
}

// Example promotion workflow configuration
const promotionWorkflow: PromotionWorkflow = {
  stages: [
    {
      name: 'training',
      checks: [
        { name: 'unit_tests', pass: true },
        { name: 'training_complete', pass: true }
      ],
      autoApprove: true,
      requiredApprovers: 0
    },
    {
      name: 'staging',
      checks: [
        { name: 'validation_tests', pass: true },
        { name: 'backtest_positive', pass: true },
        { name: 'metrics_threshold', pass: true }
      ],
      autoApprove: true,
      requiredApprovers: 0
    },
    {
      name: 'production',
      checks: [
        { name: 'staging_duration', minHours: 24 },
        { name: 'no_critical_errors', pass: true },
        { name: 'performance_regression', pass: true }
      ],
      autoApprove: false,
      requiredApprovers: 2
    }
  ],
  requirements: [
    { metric: 'accuracy', operator: '>=', threshold: 0.65 },
    { metric: 'sharpe_ratio', operator: '>=', threshold: 1.5, comparison: 'previous_version' },
    { metric: 'max_drawdown', operator: '<=', threshold: 0.15 }
  ]
}
```

---

## Rollback Procedures

### Automated Rollback Triggers

```typescript
// /src/lib/ml/rollback-manager.ts

interface RollbackTrigger {
  metric: string
  condition: 'threshold' | 'anomaly' | 'manual'
  threshold?: number
  lookbackPeriod: number  // minutes
  cooldownPeriod: number  // minutes before trying again
}

const rollbackTriggers: RollbackTrigger[] = [
  {
    metric: 'prediction_accuracy',
    condition: 'threshold',
    threshold: 0.50,  // Below 50% accuracy
    lookbackPeriod: 60,
    cooldownPeriod: 120
  },
  {
    metric: 'signal_quality_score',
    condition: 'threshold',
    threshold: 0.30,
    lookbackPeriod: 30,
    cooldownPeriod: 60
  },
  {
    metric: 'trade_win_rate',
    condition: 'threshold',
    threshold: 0.40,
    lookbackPeriod: 120,
    cooldownPeriod: 240
  },
  {
    metric: 'prediction_latency_p99',
    condition: 'threshold',
    threshold: 100,  // ms
    lookbackPeriod: 15,
    cooldownPeriod: 30
  }
]

class RollbackManager {
  private rollbackHistory: RollbackEvent[] = []
  private lastRollback: Date | null = null
  
  async checkAndRollback(): Promise<RollbackResult> {
    const metrics = await this.collectMetrics()
    
    for (const trigger of rollbackTriggers) {
      const value = metrics[trigger.metric]
      
      if (trigger.condition === 'threshold' && value < trigger.threshold!) {
        // Check cooldown
        if (this.lastRollback && 
            Date.now() - this.lastRollback.getTime() < trigger.cooldownPeriod * 60000) {
          return { triggered: false, reason: 'cooldown_active' }
        }
        
        // Execute rollback
        return await this.executeRollback(trigger.metric, value, trigger.threshold!)
      }
    }
    
    return { triggered: false, reason: 'no_triggers' }
  }
  
  async executeRollback(
    metric: string, 
    currentValue: number, 
    threshold: number
  ): Promise<RollbackResult> {
    const currentVersion = await this.getCurrentProductionVersion()
    const previousVersion = await this.getPreviousProductionVersion()
    
    if (!previousVersion) {
      return { triggered: false, reason: 'no_previous_version' }
    }
    
    // Log rollback event
    await this.logRollback({
      fromVersion: currentVersion,
      toVersion: previousVersion,
      trigger: metric,
      triggerValue: currentValue,
      triggerThreshold: threshold,
      timestamp: new Date()
    })
    
    // Execute rollback
    await this.registry.promoteToProduction(this.modelName, previousVersion)
    
    this.lastRollback = new Date()
    
    return {
      triggered: true,
      fromVersion: currentVersion,
      toVersion: previousVersion,
      reason: `${metric} (${currentValue}) below threshold (${threshold})`
    }
  }
}
```

### Manual Rollback Process

```bash
# List available versions
python scripts/model_cli.py list-versions --model lawrence-classifier

# View version details
python scripts/model_cli.py get-version \
  --model lawrence-classifier \
  --version 2.0.5-20240110

# Rollback to specific version
python scripts/model_cli.py rollback \
  --model lawrence-classifier \
  --target-version 2.0.5-20240110 \
  --reason "Performance degradation in v2.1.0"

# Emergency rollback (immediate, no validation)
python scripts/model_cli.py rollback \
  --model lawrence-classifier \
  --target-version 2.0.5-20240110 \
  --emergency \
  --reason "Critical bug in signal classification"
```

### Rollback API

```typescript
// POST /api/ml/models/{modelName}/rollback
{
  "targetVersion": "2.0.5-20240110",
  "reason": "Performance degradation",
  "emergency": false,
  "skipValidation": false
}

// Response
{
  "success": true,
  "previousVersion": "2.1.0-20240115",
  "currentVersion": "2.0.5-20240110",
  "rollbackTime": "2024-01-20T14:30:00Z",
  "validation": {
    "modelLoaded": true,
    "testsPassed": true,
    "latencyOk": true
  }
}
```

---

## Model Artifact Storage

### Storage Structure

```
s3://citarion-models/
├── lawrence-classifier/
│   ├── versions/
│   │   ├── 2.1.0-20240115/
│   │   │   ├── model.pkl
│   │   │   ├── config.json
│   │   │   ├── metrics.json
│   │   │   └── preprocessing.pkl
│   │   ├── 2.0.5-20240110/
│   │   │   ├── model.pkl
│   │   │   ├── config.json
│   │   │   ├── metrics.json
│   │   │   └── preprocessing.pkl
│   │   └── ...
│   ├── production -> versions/2.1.0-20240115/  (symlink)
│   └── staging -> versions/2.2.0-20240120/    (symlink)
│
├── price-predictor/
│   └── versions/
│       └── ...
│
└── regime-detector/
    └── versions/
        └── ...
```

### Artifact Package Contents

```typescript
interface ModelArtifactPackage {
  // Core model files
  model: {
    file: string        // model.pkl, model.onnx, etc.
    checksum: string    // SHA-256
    size: number        // bytes
  }
  
  // Configuration
  config: {
    file: string        // config.json
    schema: string      // JSON Schema for validation
  }
  
  // Preprocessing artifacts
  preprocessing?: {
    scaler?: string     // StandardScaler, MinMaxScaler
    encoder?: string    // LabelEncoder, OneHotEncoder
    featureEngineering?: string  // Custom transformations
  }
  
  // Metrics
  metrics: {
    file: string        // metrics.json
    training: TrainingMetrics
    validation: ValidationMetrics
    production?: ProductionMetrics
  }
  
  // Documentation
  documentation: {
    readme: string      // README.md
    changelog: string   // CHANGES.md
    api?: string        // API documentation
  }
  
  // Dependencies
  environment: {
    requirements: string  // requirements.txt
    conda?: string        // environment.yml
    docker?: string       // Dockerfile
  }
}
```

### Artifact Upload/Download

```typescript
// /src/lib/ml/artifact-manager.ts

class ArtifactManager {
  private storage: StorageBackend
  
  async uploadArtifact(
    modelName: string,
    version: string,
    package: ModelArtifactPackage
  ): Promise<UploadResult> {
    const basePath = `${modelName}/versions/${version}/`
    
    // Upload all files
    const uploads = await Promise.all([
      this.storage.upload(`${basePath}model.pkl`, package.model.file),
      this.storage.upload(`${basePath}config.json`, package.config.file),
      this.storage.upload(`${basePath}metrics.json`, package.metrics.file),
      this.storage.upload(`${basePath}preprocessing.pkl`, package.preprocessing?.scaler),
      this.storage.upload(`${basePath}README.md`, package.documentation.readme)
    ])
    
    // Verify checksums
    for (const upload of uploads) {
      if (!upload.verified) {
        throw new Error(`Checksum verification failed for ${upload.path}`)
      }
    }
    
    return {
      version,
      path: basePath,
      uploadedFiles: uploads.length,
      totalSize: uploads.reduce((sum, u) => sum + u.size, 0)
    }
  }
  
  async downloadArtifact(
    modelName: string,
    version: string
  ): Promise<ModelArtifactPackage> {
    const basePath = `${modelName}/versions/${version}/`
    
    // Download all files
    const [model, config, metrics, preprocessing, readme] = await Promise.all([
      this.storage.download(`${basePath}model.pkl`),
      this.storage.download(`${basePath}config.json`),
      this.storage.download(`${basePath}metrics.json`),
      this.storage.download(`${basePath}preprocessing.pkl`),
      this.storage.download(`${basePath}README.md`)
    ])
    
    return {
      model: { file: model, checksum: this.computeChecksum(model), size: model.length },
      config: { file: config, schema: '' },
      metrics: { file: metrics, training: {}, validation: {} },
      preprocessing: { scaler: preprocessing },
      documentation: { readme, changelog: '' }
    }
  }
}
```

---

## Metadata Tracking

### Tracked Metadata

```typescript
interface ModelMetadata {
  // Identification
  id: string
  name: string
  version: string
  
  // Lineage
  parentVersion?: string
  derivedFrom?: string[]
  
  // Training
  training: {
    startTime: Date
    endTime: Date
    duration: number  // seconds
    
    dataset: {
      name: string
      version: string
      size: number
      timeRange: {
        start: Date
        end: Date
      }
      features: string[]
    }
    
    hyperparameters: Record<string, any>
    
    metrics: {
      loss: number[]
      accuracy: number[]
      epochs: number
      bestEpoch: number
    }
    
    infrastructure: {
      gpuType?: string
      gpuCount?: number
      memory: string
      computeTime: number  // GPU hours
    }
  }
  
  // Validation
  validation: {
    dataset: DatasetInfo
    metrics: ValidationMetrics
    backtestResults?: BacktestResults
  }
  
  // Production
  production?: {
    deployedAt: Date
    deployedBy: string
    environment: string
    endpoint?: string
    metrics: ProductionMetrics
  }
  
  // Tags and Labels
  tags: string[]
  labels: Record<string, string>
  
  // Audit
  audit: {
    createdAt: Date
    createdBy: string
    updatedAt: Date
    updatedBy: string
    changelog: ChangelogEntry[]
  }
}
```

### Metrics Tracking

```typescript
interface TrainingMetrics {
  // Loss metrics
  loss: number
  valLoss: number
  
  // Classification metrics
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  auc: number
  
  // Custom metrics
  customMetrics: Record<string, number>
}

interface ValidationMetrics {
  // Out-of-sample performance
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  
  // Trading-specific metrics
  winRate: number
  profitFactor: number
  sharpeRatio: number
  maxDrawdown: number
  
  // Latency
  avgLatencyMs: number
  p50LatencyMs: number
  p99LatencyMs: number
}

interface ProductionMetrics {
  // Real-time metrics (updated continuously)
  requestsTotal: number
  requestsSuccess: number
  requestsFailed: number
  
  // Performance
  avgLatencyMs: number
  p99LatencyMs: number
  
  // Model performance
  predictionAccuracy: number
  signalQualityAvg: number
  
  // Trading impact
  tradesWithModel: number
  modelWinRate: number
  modelContribution: number  // % of profitable trades attributed to model
}
```

### Metadata API

```typescript
// GET /api/ml/models/{modelName}/versions/{version}/metadata
{
  "id": "lawrence-classifier-2.1.0-20240115",
  "name": "lawrence-classifier",
  "version": "2.1.0-20240115",
  
  "training": {
    "startTime": "2024-01-15T08:00:00Z",
    "endTime": "2024-01-15T14:30:00Z",
    "duration": 23400,
    
    "dataset": {
      "name": "btcusdt-historical",
      "version": "2024-01-14",
      "size": 500000,
      "timeRange": {
        "start": "2023-01-01T00:00:00Z",
        "end": "2024-01-14T23:59:59Z"
      },
      "features": ["n_rsi", "n_cci", "n_wt", "n_adx", "n_deriv", "n_volume"]
    },
    
    "hyperparameters": {
      "k": 8,
      "maxTrainingData": 2000,
      "featureWeights": [1.0, 0.8, 0.9, 0.7, 0.6, 0.5]
    },
    
    "metrics": {
      "loss": 0.42,
      "accuracy": 0.72,
      "precision": 0.68,
      "recall": 0.71,
      "f1Score": 0.69
    }
  },
  
  "validation": {
    "accuracy": 0.68,
    "winRate": 0.65,
    "sharpeRatio": 1.8,
    "maxDrawdown": 0.12,
    "avgLatencyMs": 0.125
  },
  
  "tags": ["production", "stable", "v2"],
  "labels": {
    "team": "ml-platform",
    "useCase": "signal-filtering"
  }
}
```

---

## Best Practices

### 1. Always Version Training Data

```python
# Track dataset version with model
dataset_version = "2024-01-14"
dataset_hash = compute_hash("data/train.csv")

model_metadata = {
    "dataset_version": dataset_version,
    "dataset_hash": dataset_hash,
    "dataset_size": len(training_data)
}
```

### 2. Use Deterministic Training

```python
# Set random seeds for reproducibility
import random
import numpy as np
import torch

def set_seed(seed: int = 42):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed_all(seed)
```

### 3. Document Model Changes

```markdown
## Version 2.1.0 (2024-01-15)

### Changes
- Added Lorentzian distance metric for k-NN
- Improved feature extraction with ROC indicators
- Optimized memory usage for large training sets

### Performance
- Accuracy: 72% (up from 68%)
- Latency: 125μs (down from 180μs)

### Breaking Changes
- Feature vector format changed (backward compatible via adapter)
```

### 4. Validate Before Promotion

```typescript
// Always run validation before promoting to production
const validationResult = await validateModel({
  model: newModel,
  testData: holdoutDataset,
  baselineModel: currentProductionModel,
  thresholds: {
    minAccuracy: 0.65,
    maxLatencyMs: 1,
    minImprovementOverBaseline: 0.02
  }
})

if (!validationResult.passed) {
  throw new Error(`Validation failed: ${validationResult.reasons}`)
}
```

### 5. Maintain Rollback Capability

```typescript
// Always keep at least one stable previous version
const MIN_PRODUCTION_VERSIONS = 2

async function promoteModel(modelName: string, version: string) {
  const currentVersions = await registry.listProductionVersions(modelName)
  
  if (currentVersions.length < MIN_PRODUCTION_VERSIONS - 1) {
    throw new Error("Insufficient production versions for safe promotion")
  }
  
  // Proceed with promotion
  await registry.promoteToProduction(modelName, version)
}
```

### 6. Tag Critical Models

```typescript
// Use tags for important model versions
await registry.tagModel("lawrence-classifier", "2.0.0-20240101", {
  tags: ["stable", "baseline", "approved-for-production"],
  labels: {
    approvalDate: "2024-01-02",
    approvedBy: "ml-team-lead"
  }
})
```

---

## Configuration Examples

### Model Registry Configuration

```yaml
# /config/model-registry.yaml

registry:
  name: citarion-model-registry
  
  storage:
    backend: s3
    config:
      bucket: citarion-models
      region: us-east-1
      encryption: AES256
      
  database:
    backend: postgresql
    config:
      host: ${DB_HOST}
      port: 5432
      database: model_registry
      user: ${DB_USER}
      password: ${DB_PASSWORD}
      
  cache:
    backend: redis
    config:
      host: ${REDIS_HOST}
      port: 6379
      ttl: 3600
      
  validation:
    enabled: true
    tests:
      - name: accuracy_check
        type: threshold
        metric: accuracy
        operator: ">="
        value: 0.65
      - name: latency_check
        type: threshold
        metric: p99_latency_ms
        operator: "<="
        value: 1.0
        
  rollback:
    automatic: true
    triggers:
      - metric: prediction_accuracy
        threshold: 0.50
        lookback_minutes: 60
      - metric: signal_quality
        threshold: 0.30
        lookback_minutes: 30
```

### Training Pipeline Configuration

```yaml
# /pipelines/lawrence-classifier.yaml

name: lawrence-classifier-training
model_name: lawrence-classifier

trigger:
  schedule: "0 2 * * 0"  # Weekly on Sunday at 2 AM
  manual: true

data:
  source: timescaledb
  query: |
    SELECT * FROM ohlcv_btcusdt_1m
    WHERE time >= :start_time AND time < :end_time
  time_range:
    lookback_days: 365
    
training:
  framework: sklearn
  hyperparameters:
    k: 8
    max_samples: 2000
    feature_weights: [1.0, 0.8, 0.9, 0.7, 0.6, 0.5]
    
validation:
  holdout_ratio: 0.2
  cross_validation_folds: 5
  backtest:
    enabled: true
    initial_capital: 10000
    commission: 0.001
    
registration:
  auto_register: false
  tags: ["automated-training"]
  notify_on_success: true
  notify_on_failure: true
```

---

## Related Documentation

- [ML Integration Guide](./ML_INTEGRATION.md) - Overall ML system integration
- [ML Signal Pipeline](./ML_SIGNAL_PIPELINE.md) - Signal processing pipeline
- [Model Monitoring Guide](./MODEL_MONITORING.md) - Production model monitoring
- [ML Pipeline CI/CD](./ML_PIPELINE_CI_CD.md) - Automated training and deployment
- [Deployment Guide](../deployment/DEPLOYMENT_GUIDE.md) - Production deployment procedures

---

*Last updated: January 2025*
