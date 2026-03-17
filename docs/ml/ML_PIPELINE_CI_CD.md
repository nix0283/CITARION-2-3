# ML Pipeline CI/CD

## Overview

This document describes the automated ML pipeline for the CITARION trading platform, including continuous integration and continuous deployment (CI/CD) practices for ML models. The pipeline ensures reliable, reproducible, and safe model training and deployment.

### Why ML CI/CD Matters

- **Reproducibility**: Every model build is reproducible with versioned code, data, and configurations
- **Quality Assurance**: Automated testing catches issues before deployment
- **Speed**: Automated pipelines reduce time from development to production
- **Safety**: Gradual rollouts and quick rollbacks minimize risk
- **Compliance**: Audit trails and approval gates meet regulatory requirements

---

## Training Pipeline Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    ML PIPELINE ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐ │
│   │  Source  │───>│  Build   │───>│  Train   │───>│ Validate │ │
│   │  Control │    │  Stage   │    │  Stage   │    │  Stage   │ │
│   └──────────┘    └──────────┘    └──────────┘    └──────────┘ │
│        │              │               │               │         │
│        ▼              ▼               ▼               ▼         │
│   Git Repo       Environment      Training         Testing     │
│   + DVC          Setup            Execution        + Backtest  │
│                                                                    │
│                                       ┌──────────┐               │
│                                       │ Register │               │
│                                       └──────────┘               │
│                                            │                     │
│                        ┌───────────────────┴────────────────┐    │
│                        ▼                                    ▼    │
│                  ┌──────────┐                       ┌──────────┐│
│                  │  Staging │                       │ Production│
│                  │  Deploy  │                       │  Deploy  ││
│                  └──────────┘                       └──────────┘│
│                        │                                    │    │
│                        ▼                                    ▼    │
│                  Canary Testing                       Full       │
│                  + Shadow Mode                        Rollout    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Pipeline Components

```typescript
interface MLPipeline {
  // Pipeline stages
  stages: PipelineStage[]
  
  // Configuration
  config: PipelineConfig
  
  // Triggers
  triggers: PipelineTrigger[]
  
  // Notifications
  notifications: NotificationConfig
}

interface PipelineStage {
  name: string
  type: 'build' | 'train' | 'validate' | 'register' | 'deploy'
  
  // Stage configuration
  config: StageConfig
  
  // Dependencies
  dependsOn: string[]
  
  // Conditions to proceed
  conditions: StageCondition[]
  
  // Actions on completion
  onSuccess: PipelineAction[]
  onFailure: PipelineAction[]
}
```

---

## Training Pipeline Stages

### Stage 1: Source Control & Build

```yaml
# .github/workflows/ml-pipeline.yml

name: ML Training Pipeline

on:
  push:
    branches: [main, develop]
    paths:
      - 'src/lib/ml/**'
      - 'pipelines/**'
      - 'configs/ml/**'
  schedule:
    - cron: '0 2 * * 0'  # Weekly training
  workflow_dispatch:
    inputs:
      model_name:
        description: 'Model to train'
        required: true
        default: 'lawrence-classifier'
      data_lookback:
        description: 'Training data lookback period'
        required: false
        default: '30d'

env:
  PYTHON_VERSION: '3.11'
  NODE_VERSION: '20'

jobs:
  build:
    name: Build Environment
    runs-on: ubuntu-latest
    outputs:
      cache_key: ${{ steps.cache.outputs.key }}
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          lfs: true
      
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: ${{ env.PYTHON_VERSION }}
          cache: 'pip'
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install Python dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements-ml.txt
          pip install -e ./ml-packages/citarion-ml
      
      - name: Install Node.js dependencies
        run: npm ci
      
      - name: Cache environment
        id: cache
        run: echo "key=env-${{ runner.os }}-${{ hashFiles('requirements-ml.txt', 'package-lock.json') }}" >> $GITHUB_OUTPUT
```

### Stage 2: Data Preparation

```yaml
  prepare-data:
    name: Prepare Training Data
    runs-on: ubuntu-latest
    needs: build
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Restore environment cache
        uses: actions/cache@v4
        with:
          key: env-${{ runner.os }}-${{ hashFiles('requirements-ml.txt', 'package-lock.json') }}
          path: |
            ~/.cache/pip
            node_modules
      
      - name: Fetch training data
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: |
          python scripts/fetch_training_data.py \
            --lookback ${{ github.event.inputs.data_lookback || '30d' }} \
            --output data/training.parquet
      
      - name: Validate data quality
        run: |
          python scripts/validate_data.py \
            --input data/training.parquet \
            --config configs/ml/data_validation.yaml
      
      - name: Generate data checksum
        run: |
          sha256sum data/training.parquet > data/checksum.txt
      
      - name: Upload data artifact
        uses: actions/upload-artifact@v4
        with:
          name: training-data
          path: data/
          retention-days: 30
```

### Stage 3: Model Training

```yaml
  train:
    name: Train Model
    runs-on: ubuntu-latest
    needs: prepare-data
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Restore environment cache
        uses: actions/cache@v4
        with:
          key: env-${{ runner.os }}-${{ hashFiles('requirements-ml.txt', 'package-lock.json') }}
          path: |
            ~/.cache/pip
            node_modules
      
      - name: Download training data
        uses: actions/download-artifact@v4
        with:
          name: training-data
          path: data/
      
      - name: Configure training
        run: |
          python scripts/configure_training.py \
            --model ${{ github.event.inputs.model_name || 'lawrence-classifier' }} \
            --config configs/ml/training.yaml \
            --output training_config.json
      
      - name: Run training
        env:
          MLFLOW_TRACKING_URI: ${{ secrets.MLFLOW_TRACKING_URI }}
          WANDB_API_KEY: ${{ secrets.WANDB_API_KEY }}
        run: |
          python scripts/train.py \
            --config training_config.json \
            --data data/training.parquet \
            --output models/ \
            --experiment citarion-${{ github.sha }}
      
      - name: Log training metrics
        run: |
          python scripts/log_metrics.py \
            --model-dir models/ \
            --commit-sha ${{ github.sha }}
      
      - name: Upload model artifact
        uses: actions/upload-artifact@v4
        with:
          name: trained-model
          path: models/
          retention-days: 90
```

### Stage 4: Model Validation

```yaml
  validate:
    name: Validate Model
    runs-on: ubuntu-latest
    needs: train
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Restore environment cache
        uses: actions/cache@v4
        with:
          key: env-${{ runner.os }}-${{ hashFiles('requirements-ml.txt', 'package-lock.json') }}
          path: |
            ~/.cache/pip
            node_modules
      
      - name: Download model
        uses: actions/download-artifact@v4
        with:
          name: trained-model
          path: models/
      
      - name: Run unit tests
        run: |
          pytest tests/ml/unit/ \
            --model-path models/model.pkl \
            --junitxml reports/unit-tests.xml
      
      - name: Run validation tests
        run: |
          python scripts/validate_model.py \
            --model-path models/model.pkl \
            --test-data data/validation.parquet \
            --output reports/validation.json
      
      - name: Run backtest
        run: |
          python scripts/backtest.py \
            --model-path models/model.pkl \
            --config configs/ml/backtest.yaml \
            --output reports/backtest.json
      
      - name: Check validation thresholds
        id: thresholds
        run: |
          python scripts/check_thresholds.py \
            --validation reports/validation.json \
            --backtest reports/backtest.json \
            --config configs/ml/thresholds.yaml \
            --output reports/threshold_check.json
          
          if grep -q '"passed": false' reports/threshold_check.json; then
            echo "passed=false" >> $GITHUB_OUTPUT
            exit 1
          else
            echo "passed=true" >> $GITHUB_OUTPUT
          fi
      
      - name: Upload validation reports
        uses: actions/upload-artifact@v4
        with:
          name: validation-reports
          path: reports/
          retention-days: 90
      
      - name: Comment on PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const validation = JSON.parse(fs.readFileSync('reports/validation.json'));
            const backtest = JSON.parse(fs.readFileSync('reports/backtest.json'));
            
            const body = `## Model Validation Results
            
            ### Accuracy Metrics
            | Metric | Value | Threshold |
            |--------|-------|-----------|
            | Accuracy | ${(validation.accuracy * 100).toFixed(2)}% | ≥65% |
            | Precision | ${(validation.precision * 100).toFixed(2)}% | ≥60% |
            | Recall | ${(validation.recall * 100).toFixed(2)}% | ≥60% |
            
            ### Backtest Results
            | Metric | Value | Threshold |
            |--------|-------|-----------|
            | Win Rate | ${(backtest.winRate * 100).toFixed(2)}% | ≥55% |
            | Profit Factor | ${backtest.profitFactor.toFixed(2)} | ≥1.5 |
            | Max Drawdown | ${(backtest.maxDrawdown * 100).toFixed(2)}% | ≤15% |
            
            **Status:** ${{ steps.thresholds.outputs.passed == 'true' ? '✅ Passed' : '❌ Failed' }}
            `;
            
            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: body
            });
```

---

## Model Validation Gates

### Validation Gate Configuration

```yaml
# configs/ml/validation_gates.yaml

validation_gates:
  # Unit tests gate
  unit_tests:
    enabled: true
    required: true
    tests:
      - name: prediction_shape
        description: "Model produces correct output shape"
      - name: feature_validation
        description: "Model handles feature edge cases"
      - name: latency_check
        description: "Prediction latency within limits"
        threshold_ms: 1.0
    
  # Accuracy gate
  accuracy:
    enabled: true
    required: true
    metrics:
      - name: accuracy
        threshold: 0.65
        operator: ">="
      - name: precision
        threshold: 0.60
        operator: ">="
      - name: recall
        threshold: 0.60
        operator: ">="
      - name: f1_score
        threshold: 0.60
        operator: ">="
    
  # Calibration gate
  calibration:
    enabled: true
    required: false
    metrics:
      - name: expected_calibration_error
        threshold: 0.10
        operator: "<="
    
  # Backtest gate
  backtest:
    enabled: true
    required: true
    metrics:
      - name: win_rate
        threshold: 0.55
        operator: ">="
      - name: profit_factor
        threshold: 1.5
        operator: ">="
      - name: max_drawdown
        threshold: 0.15
        operator: "<="
      - name: sharpe_ratio
        threshold: 1.0
        operator: ">="
    
  # Performance gate
  performance:
    enabled: true
    required: true
    metrics:
      - name: avg_latency_ms
        threshold: 1.0
        operator: "<="
      - name: p99_latency_ms
        threshold: 5.0
        operator: "<="
      - name: throughput_per_sec
        threshold: 1000
        operator: ">="
    
  # Comparison gate (vs current production)
  comparison:
    enabled: true
    required: false
    baseline: production
    metrics:
      - name: accuracy
        min_improvement: 0.0  # Allow same accuracy
        max_degradation: 0.05  # Max 5% degradation
      - name: win_rate
        min_improvement: 0.0
        max_degradation: 0.03
```

### Validation Gate Implementation

```typescript
// /src/lib/ml/validation-gates.ts

interface ValidationGate {
  name: string
  enabled: boolean
  required: boolean
  check(metrics: ModelMetrics): Promise<GateResult>
}

interface GateResult {
  gate: string
  passed: boolean
  required: boolean
  details: MetricResult[]
  message: string
}

class ValidationGateRunner {
  private gates: ValidationGate[]
  
  async runAll(metrics: ModelMetrics): Promise<ValidationReport> {
    const results: GateResult[] = []
    
    for (const gate of this.gates) {
      if (!gate.enabled) continue
      
      const result = await gate.check(metrics)
      results.push(result)
      
      // Fail fast if required gate fails
      if (!result.passed && gate.required) {
        return {
          passed: false,
          results,
          blockingGate: gate.name,
          message: `Required gate '${gate.name}' failed: ${result.message}`
        }
      }
    }
    
    const allRequiredPassed = results
      .filter(r => r.required)
      .every(r => r.passed)
    
    return {
      passed: allRequiredPassed,
      results,
      message: allRequiredPassed 
        ? 'All required validation gates passed'
        : 'Some required validation gates failed'
    }
  }
}

class AccuracyGate implements ValidationGate {
  name = 'accuracy'
  enabled = true
  required = true
  
  constructor(private config: AccuracyGateConfig) {}
  
  async check(metrics: ModelMetrics): Promise<GateResult> {
    const details: MetricResult[] = []
    let allPassed = true
    
    for (const metricConfig of this.config.metrics) {
      const value = metrics[metricConfig.name]
      const passed = this.compare(value, metricConfig.operator, metricConfig.threshold)
      
      details.push({
        name: metricConfig.name,
        value,
        threshold: metricConfig.threshold,
        operator: metricConfig.operator,
        passed
      })
      
      if (!passed) allPassed = false
    }
    
    return {
      gate: this.name,
      passed: allPassed,
      required: this.required,
      details,
      message: allPassed
        ? 'All accuracy metrics meet thresholds'
        : 'Some accuracy metrics below threshold'
    }
  }
  
  private compare(value: number, operator: string, threshold: number): boolean {
    switch (operator) {
      case '>=': return value >= threshold
      case '>': return value > threshold
      case '<=': return value <= threshold
      case '<': return value < threshold
      case '==': return value === threshold
      default: return false
    }
  }
}
```

---

## Deployment Stages

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    MODEL DEPLOYMENT STAGES                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐ │
│   │ Register │───>│  Staging │───>│  Canary  │───>│Production│ │
│   │          │    │          │    │          │    │          │ │
│   └──────────┘    └──────────┘    └──────────┘    └──────────┘ │
│        │              │               │               │         │
│        ▼              ▼               ▼               ▼         │
│   Model          Shadow          5% Traffic      100% Traffic  │
│   Registry       Mode            Testing         Serving       │
│                  Testing                                       │
│                                                                    │
│   Time:         Immediate       1-2 hours        24+ hours      │
│   Risk:         None            Low              Minimal        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Stage 1: Model Registration

```yaml
  register:
    name: Register Model
    runs-on: ubuntu-latest
    needs: validate
    if: needs.validate.outputs.passed == 'true'
    
    outputs:
      model_version: ${{ steps.register.outputs.version }}
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Download model and reports
        uses: actions/download-artifact@v4
        with:
          name: trained-model
          path: models/
      
      - name: Download validation reports
        uses: actions/download-artifact@v4
        with:
          name: validation-reports
          path: reports/
      
      - name: Generate version number
        id: version
        run: |
          VERSION=$(python scripts/generate_version.py \
            --model ${{ github.event.inputs.model_name || 'lawrence-classifier' }})
          echo "version=$VERSION" >> $GITHUB_OUTPUT
      
      - name: Register model
        id: register
        env:
          MODEL_REGISTRY_URL: ${{ secrets.MODEL_REGISTRY_URL }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          python scripts/register_model.py \
            --model-path models/model.pkl \
            --name ${{ github.event.inputs.model_name || 'lawrence-classifier' }} \
            --version ${{ steps.version.outputs.version }} \
            --metrics reports/validation.json \
            --metadata '{
              "commit_sha": "${{ github.sha }}",
              "workflow_run": "${{ github.run_id }}",
              "triggered_by": "${{ github.actor }}"
            }'
          
          echo "version=${{ steps.version.outputs.version }}" >> $GITHUB_OUTPUT
      
      - name: Create model card
        run: |
          python scripts/create_model_card.py \
            --name ${{ github.event.inputs.model_name || 'lawrence-classifier' }} \
            --version ${{ steps.version.outputs.version }} \
            --validation reports/validation.json \
            --backtest reports/backtest.json \
            --output docs/model-cards/${{ steps.version.outputs.version }}.md
      
      - name: Commit model card
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add docs/model-cards/${{ steps.version.outputs.version }}.md
          git commit -m "docs: add model card for v${{ steps.version.outputs.version }}"
          git push
```

### Stage 2: Staging Deployment

```yaml
  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: register
    environment: staging
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Configure kubectl
        uses: azure/setup-kubectl@v3
        with:
          version: 'v1.28.0'
      
      - name: Set kubeconfig
        run: |
          echo "${{ secrets.KUBE_CONFIG_STAGING }}" | base64 -d > kubeconfig
          export KUBECONFIG=kubeconfig
      
      - name: Deploy to staging
        run: |
          kubectl set image deployment/ml-service \
            model-image=${{ secrets.ECR_REGISTRY }}/ml-model:${{ needs.register.outputs.model_version }} \
            -n citarion-staging
      
      - name: Wait for rollout
        run: |
          kubectl rollout status deployment/ml-service \
            -n citarion-staging \
            --timeout=300s
      
      - name: Run smoke tests
        run: |
          python scripts/smoke_test.py \
            --endpoint https://staging.citarion.internal/api/ml \
            --model ${{ github.event.inputs.model_name || 'lawrence-classifier' }} \
            --version ${{ needs.register.outputs.model_version }}
      
      - name: Run shadow mode test
        run: |
          python scripts/shadow_test.py \
            --endpoint https://staging.citarion.internal/api/ml \
            --model ${{ github.event.inputs.model_name || 'lawrence-classifier' }} \
            --duration 1h \
            --comparison production
```

---

## Canary Deployment for Models

### Canary Strategy

```typescript
// /src/lib/ml/canary-deployment.ts

interface CanaryConfig {
  // Canary duration
  duration: string        // e.g., "2h"
  
  // Traffic split stages
  stages: CanaryStage[]
  
  // Rollback triggers
  rollbackTriggers: RollbackTrigger[]
  
  // Success criteria
  successCriteria: SuccessCriteria
}

interface CanaryStage {
  trafficPercent: number
  duration: string
  checks: CanaryCheck[]
}

const canaryConfig: CanaryConfig = {
  duration: "4h",
  
  stages: [
    {
      trafficPercent: 5,
      duration: "30m",
      checks: [
        { name: 'error_rate', threshold: 0.01 },
        { name: 'latency_p99', thresholdMs: 5 }
      ]
    },
    {
      trafficPercent: 25,
      duration: "1h",
      checks: [
        { name: 'error_rate', threshold: 0.01 },
        { name: 'latency_p99', thresholdMs: 5 },
        { name: 'accuracy', threshold: 0.60 }
      ]
    },
    {
      trafficPercent: 50,
      duration: "1h",
      checks: [
        { name: 'error_rate', threshold: 0.005 },
        { name: 'latency_p99', thresholdMs: 2 },
        { name: 'accuracy', threshold: 0.65 },
        { name: 'win_rate', threshold: 0.55 }
      ]
    },
    {
      trafficPercent: 100,
      duration: "1h",
      checks: [
        { name: 'error_rate', threshold: 0.001 },
        { name: 'latency_p99', thresholdMs: 1 },
        { name: 'accuracy', threshold: 0.65 },
        { name: 'win_rate', threshold: 0.55 }
      ]
    }
  ],
  
  rollbackTriggers: [
    { metric: 'error_rate', threshold: 0.05, immediate: true },
    { metric: 'accuracy', threshold: 0.50, immediate: true },
    { metric: 'latency_p99', thresholdMs: 20, immediate: true }
  ],
  
  successCriteria: {
    minDuration: "2h",
    metrics: [
      { name: 'accuracy', threshold: 0.65 },
      { name: 'win_rate', threshold: 0.55 },
      { name: 'error_rate', maxThreshold: 0.01 }
    ]
  }
}
```

### Canary Deployment Workflow

```yaml
  canary-deploy:
    name: Canary Deployment
    runs-on: ubuntu-latest
    needs: deploy-staging
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Configure kubectl
        uses: azure/setup-kubectl@v3
      
      - name: Start canary (5%)
        run: |
          kubectl patch deployment ml-service \
            -p '{"spec":{"template":{"spec":{"containers":[{"name":"ml-model","env":[{"name":"CANARY_PERCENT","value":"5"}]}]}}}}' \
            -n citarion-production
      
      - name: Monitor canary (5%)
        run: |
          python scripts/monitor_canary.py \
            --duration 30m \
            --checks "error_rate<0.01,latency_p99<5ms" \
            --rollback-on-failure
      
      - name: Increase canary (25%)
        run: |
          kubectl patch deployment ml-service \
            -p '{"spec":{"template":{"spec":{"containers":[{"name":"ml-model","env":[{"name":"CANARY_PERCENT","value":"25"}]}]}}}}' \
            -n citarion-production
      
      - name: Monitor canary (25%)
        run: |
          python scripts/monitor_canary.py \
            --duration 1h \
            --checks "error_rate<0.01,latency_p99<5ms,accuracy>0.60" \
            --rollback-on-failure
      
      - name: Increase canary (50%)
        run: |
          kubectl patch deployment ml-service \
            -p '{"spec":{"template":{"spec":{"containers":[{"name":"ml-model","env":[{"name":"CANARY_PERCENT","value":"50"}]}]}}}}' \
            -n citarion-production
      
      - name: Monitor canary (50%)
        run: |
          python scripts/monitor_canary.py \
            --duration 1h \
            --checks "error_rate<0.005,latency_p99<2ms,accuracy>0.65,win_rate>0.55" \
            --rollback-on-failure
      
      - name: Full rollout (100%)
        run: |
          kubectl patch deployment ml-service \
            -p '{"spec":{"template":{"spec":{"containers":[{"name":"ml-model","env":[{"name":"CANARY_PERCENT","value":"100"}]}]}}}}' \
            -n citarion-production
      
      - name: Monitor full rollout
        run: |
          python scripts/monitor_canary.py \
            --duration 1h \
            --checks "error_rate<0.001,latency_p99<1ms,accuracy>0.65,win_rate>0.55" \
            --rollback-on-failure
      
      - name: Mark deployment complete
        run: |
          python scripts/mark_deployment_complete.py \
            --model ${{ github.event.inputs.model_name || 'lawrence-classifier' }} \
            --version ${{ needs.register.outputs.model_version }}
```

### Canary Monitoring

```typescript
// /scripts/monitor_canary.py

import asyncio
import sys
from datetime import datetime, timedelta
from monitoring import CanaryMonitor, CanaryMetrics

async def monitor_canary(
    duration_minutes: int,
    checks: list[str],
    rollback_on_failure: bool = True
):
    monitor = CanaryMonitor()
    start_time = datetime.now()
    end_time = start_time + timedelta(minutes=duration_minutes)
    
    print(f"Starting canary monitoring for {duration_minutes} minutes")
    print(f"Checks: {checks}")
    
    while datetime.now() < end_time:
        # Collect metrics
        metrics = await monitor.collect_metrics()
        
        # Evaluate checks
        for check in checks:
            result = evaluate_check(metrics, check)
            
            if not result.passed:
                print(f"Check failed: {check}")
                print(f"Current value: {result.current_value}")
                print(f"Threshold: {result.threshold}")
                
                if rollback_on_failure:
                    print("Initiating rollback...")
                    await monitor.rollback()
                    sys.exit(1)
                else:
                    print("Warning: Check failed but not rolling back")
        
        # Log progress
        remaining = (end_time - datetime.now()).total_seconds() / 60
        print(f"Canary healthy. {remaining:.1f} minutes remaining.")
        
        # Wait before next check
        await asyncio.sleep(60)
    
    print("Canary monitoring completed successfully")

def evaluate_check(metrics: CanaryMetrics, check: str) -> CheckResult:
    # Parse check string (e.g., "error_rate<0.01")
    metric_name, operator, threshold = parse_check(check)
    
    current_value = getattr(metrics, metric_name)
    
    passed = evaluate_condition(current_value, operator, float(threshold))
    
    return CheckResult(
        passed=passed,
        current_value=current_value,
        threshold=float(threshold)
    )
```

---

## Rollback Automation

### Automatic Rollback Configuration

```yaml
# /config/rollback-automation.yaml

rollback:
  # Automatic rollback triggers
  triggers:
    # Critical triggers (immediate rollback)
    critical:
      - metric: error_rate
        threshold: 0.05
        lookback: 5m
      - metric: prediction_accuracy
        threshold: 0.50
        lookback: 15m
      - metric: latency_p99_ms
        threshold: 50
        lookback: 5m
    
    # Warning triggers (delayed rollback)
    warning:
      - metric: prediction_accuracy
        threshold: 0.60
        lookback: 30m
        grace_period: 15m
      - metric: win_rate
        threshold: 0.45
        lookback: 1h
        grace_period: 30m
  
  # Rollback procedure
  procedure:
    # Previous version to rollback to
    target: previous_production
    
    # Steps
    steps:
      - name: stop_traffic
        description: "Stop all traffic to new model"
      - name: restore_previous
        description: "Restore previous model version"
      - name: verify_health
        description: "Verify previous model is healthy"
      - name: resume_traffic
        description: "Resume traffic to previous model"
      - name: notify_team
        description: "Notify team of rollback"
    
    # Notification
    notification:
      channels:
        - slack-critical-alerts
        - pagerduty
      template: "rollback_triggered"
```

### Rollback Implementation

```typescript
// /src/lib/ml/rollback-automation.ts

interface RollbackAutomation {
  triggers: RollbackTrigger[]
  procedure: RollbackProcedure
  notification: NotificationService
}

class AutomaticRollback {
  private monitor: ModelMonitor
  private deployer: ModelDeployer
  private notifier: NotificationService
  private triggers: RollbackTrigger[]
  
  async start(): Promise<void> {
    // Start monitoring loop
    setInterval(async () => {
      await this.checkTriggers()
    }, 60000) // Check every minute
  }
  
  private async checkTriggers(): Promise<void> {
    const metrics = await this.monitor.collectMetrics()
    
    for (const trigger of this.triggers) {
      const value = this.getMetricValue(metrics, trigger.metric)
      
      if (this.shouldTrigger(value, trigger)) {
        await this.executeRollback(trigger)
        break
      }
    }
  }
  
  private shouldTrigger(value: number, trigger: RollbackTrigger): boolean {
    if (trigger.operator === '>' && value > trigger.threshold) return true
    if (trigger.operator === '<' && value < trigger.threshold) return true
    return false
  }
  
  private async executeRollback(trigger: RollbackTrigger): Promise<void> {
    console.log(`Rollback triggered by ${trigger.metric}`)
    
    // Get previous version
    const currentVersion = await this.deployer.getCurrentVersion()
    const previousVersion = await this.deployer.getPreviousProductionVersion()
    
    if (!previousVersion) {
      console.error('No previous version available for rollback')
      await this.notifier.send({
        level: 'critical',
        message: 'Rollback failed: No previous version available',
        context: { trigger, currentVersion }
      })
      return
    }
    
    // Execute rollback steps
    try {
      // Step 1: Stop traffic
      await this.deployer.stopTraffic()
      
      // Step 2: Restore previous model
      await this.deployer.deploy(previousVersion)
      
      // Step 3: Verify health
      const healthy = await this.deployer.verifyHealth()
      if (!healthy) {
        throw new Error('Previous version health check failed')
      }
      
      // Step 4: Resume traffic
      await this.deployer.resumeTraffic()
      
      // Step 5: Notify team
      await this.notifier.send({
        level: 'critical',
        message: 'Automatic rollback completed',
        context: {
          trigger: trigger.metric,
          triggerValue: this.getMetricValue(await this.monitor.collectMetrics(), trigger.metric),
          fromVersion: currentVersion,
          toVersion: previousVersion,
          timestamp: new Date()
        }
      })
      
      // Log rollback event
      await this.logRollback({
        fromVersion: currentVersion,
        toVersion: previousVersion,
        trigger,
        timestamp: new Date()
      })
      
    } catch (error) {
      console.error('Rollback failed:', error)
      await this.notifier.send({
        level: 'critical',
        message: 'Rollback failed - manual intervention required',
        context: { trigger, error: error.message }
      })
    }
  }
}
```

---

## GitHub Actions / CI Integration

### Complete Pipeline Workflow

```yaml
# .github/workflows/ml-pipeline.yml

name: ML Pipeline

on:
  push:
    branches: [main]
    paths:
      - 'src/lib/ml/**'
      - 'ml-packages/**'
      - 'configs/ml/**'
      - '.github/workflows/ml-pipeline.yml'
  pull_request:
    branches: [main]
    paths:
      - 'src/lib/ml/**'
      - 'ml-packages/**'
  schedule:
    - cron: '0 2 * * 0'  # Weekly training
  workflow_dispatch:
    inputs:
      model_name:
        description: 'Model to train'
        required: true
        default: 'lawrence-classifier'
        type: choice
        options:
          - lawrence-classifier
          - price-predictor
          - regime-detector
      data_lookback:
        description: 'Training data lookback'
        required: false
        default: '30d'
      skip_validation:
        description: 'Skip validation gates (emergency)'
        required: false
        default: false
        type: boolean

jobs:
  # Build job
  build:
    uses: ./.github/workflows/ml-build.yml
    secrets: inherit

  # Training job
  train:
    uses: ./.github/workflows/ml-train.yml
    needs: build
    secrets: inherit
    with:
      model_name: ${{ github.event.inputs.model_name || 'lawrence-classifier' }}
      data_lookback: ${{ github.event.inputs.data_lookback || '30d' }}

  # Validation job
  validate:
    uses: ./.github/workflows/ml-validate.yml
    needs: train
    secrets: inherit
    with:
      skip_validation: ${{ github.event.inputs.skip_validation || false }}

  # Registration job
  register:
    uses: ./.github/workflows/ml-register.yml
    needs: validate
    secrets: inherit
    if: needs.validate.outputs.passed == 'true'

  # Staging deployment
  deploy-staging:
    uses: ./.github/workflows/ml-deploy.yml
    needs: register
    secrets: inherit
    with:
      environment: staging

  # Production deployment (with approval)
  deploy-production:
    uses: ./.github/workflows/ml-deploy.yml
    needs: deploy-staging
    secrets: inherit
    with:
      environment: production
      canary: true
```

### Reusable Workflows

```yaml
# .github/workflows/ml-train.yml

name: ML Train

on:
  workflow_call:
    inputs:
      model_name:
        required: true
        type: string
      data_lookback:
        required: true
        type: string
    outputs:
      model_path:
        description: 'Path to trained model'
        value: ${{ jobs.train.outputs.model_path }}

jobs:
  train:
    runs-on: ubuntu-latest
    outputs:
      model_path: ${{ steps.train.outputs.model_path }}
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'
      
      - name: Install dependencies
        run: |
          pip install -r requirements-ml.txt
      
      - name: Fetch data
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: |
          python scripts/fetch_training_data.py \
            --lookback ${{ inputs.data_lookback }} \
            --output data/training.parquet
      
      - name: Train model
        id: train
        run: |
          python scripts/train.py \
            --model ${{ inputs.model_name }} \
            --data data/training.parquet \
            --output models/model.pkl
          
          echo "model_path=models/model.pkl" >> $GITHUB_OUTPUT
      
      - uses: actions/upload-artifact@v4
        with:
          name: trained-model
          path: models/
```

### Approval Gates

```yaml
# Production deployment requires approval

jobs:
  deploy-production:
    runs-on: ubuntu-latest
    environment: production  # This requires GitHub environment approval
    
    steps:
      - name: Deploy
        run: |
          # Deployment commands
```

### Slack Notifications

```yaml
  notify:
    name: Notify
    runs-on: ubuntu-latest
    needs: [deploy-production]
    if: always()
    
    steps:
      - name: Notify success
        if: needs.deploy-production.result == 'success'
        uses: slackapi/slack-github-action@v1
        with:
          channel-id: ${{ secrets.SLACK_ML_CHANNEL }}
          slack-message: |
            :white_check_mark: *ML Pipeline Completed*
            
            Model: ${{ github.event.inputs.model_name || 'lawrence-classifier' }}
            Version: ${{ needs.register.outputs.model_version }}
            Environment: Production
            
            <${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}|View Run>
        env:
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}
      
      - name: Notify failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          channel-id: ${{ secrets.SLACK_ML_CHANNEL }}
          slack-message: |
            :x: *ML Pipeline Failed*
            
            Model: ${{ github.event.inputs.model_name || 'lawrence-classifier' }}
            Stage: ${{ job.status }}
            
            <${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}|View Run>
        env:
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}
```

---

## Configuration Examples

### Training Configuration

```yaml
# /configs/ml/training.yaml

training:
  model:
    name: lawrence-classifier
    type: knn-classifier
    
  data:
    source: timescaledb
    lookback: 30d
    features:
      - n_rsi
      - n_cci
      - n_wt
      - n_adx
      - n_deriv
      - n_volume
    target: direction  # LONG, SHORT, NEUTRAL
    
  preprocessing:
    normalize: true
    handle_missing: interpolate
    outlier_removal: winsorize
    outlier_threshold: 0.01
    
  hyperparameters:
    k: 8
    distance_metric: lorentzian
    max_samples: 2000
    feature_weights:
      n_rsi: 1.0
      n_cci: 0.8
      n_wt: 0.9
      n_adx: 0.7
      n_deriv: 0.6
      n_volume: 0.5
      
  validation:
    method: time_series_split
    n_splits: 5
    test_size: 0.2
    
  resources:
    cpu: 4
    memory: 16Gi
    gpu: 0  # CPU-based training
    
  output:
    format: pickle
    path: models/
    register: true
```

### Deployment Configuration

```yaml
# /configs/ml/deployment.yaml

deployment:
  model:
    name: lawrence-classifier
    
  staging:
    replicas: 1
    resources:
      cpu: 500m
      memory: 1Gi
    autoscaling:
      enabled: false
      
  production:
    replicas: 3
    resources:
      cpu: 1000m
      memory: 2Gi
    autoscaling:
      enabled: true
      min_replicas: 3
      max_replicas: 10
      target_cpu_utilization: 70
      
  canary:
    enabled: true
    stages:
      - percent: 5
        duration: 30m
      - percent: 25
        duration: 1h
      - percent: 50
        duration: 1h
      - percent: 100
        duration: 1h
        
  rollback:
    automatic: true
    triggers:
      - metric: error_rate
        threshold: 0.05
      - metric: latency_p99_ms
        threshold: 20
      - metric: accuracy
        threshold: 0.50
```

---

## Best Practices

### 1. Version Everything

```bash
# Track all dependencies
pip freeze > requirements-ml.txt
dvc add data/training.parquet

# Track model lineage
python scripts/record_lineage.py \
  --model lawrence-classifier \
  --data-version $(dvc md5 data/training.parquet) \
  --code-version $(git rev-parse HEAD)
```

### 2. Use Feature Flags for Model Rollout

```typescript
// Gradual rollout with feature flags
const modelConfig = {
  useNewModel: featureFlags.isEnabled('ml-model-v2', {
    percentage: 50,  // 50% of users
    users: ['user-123', 'user-456'],  // Specific users
    rolloutStrategy: 'gradual'
  })
}
```

### 3. Implement Circuit Breakers

```typescript
// Circuit breaker for model predictions
const circuitBreaker = new CircuitBreaker({
  failureThreshold: 5,
  resetTimeout: 60000,  // 1 minute
  fallback: 'use_baseline_model'
})

async function predict(features: Features): Promise<Prediction> {
  return circuitBreaker.execute(async () => {
    return await model.predict(features)
  })
}
```

### 4. Monitor Deployment Health

```typescript
// Post-deployment health check
async function postDeploymentHealthCheck(): Promise<boolean> {
  const checks = [
    { name: 'model_loaded', check: () => model.isLoaded() },
    { name: 'prediction_works', check: () => testPrediction() },
    { name: 'latency_ok', check: () => measureLatency() < 5 },
    { name: 'accuracy_ok', check: () => getRecentAccuracy() > 0.60 }
  ]
  
  for (const { name, check } of checks) {
    if (!await check()) {
      console.error(`Health check failed: ${name}`)
      return false
    }
  }
  
  return true
}
```

### 5. Maintain Audit Trail

```typescript
// Log all deployment events
await auditLog.record({
  event: 'model_deployed',
  model: modelName,
  version: version,
  environment: 'production',
  deployedBy: user,
  timestamp: new Date(),
  previousVersion: previousVersion,
  approvalId: approvalId,
  pipelineRunId: pipelineRunId
})
```

---

## Related Documentation

- [Model Versioning Guide](./MODEL_VERSIONING.md) - Model version control
- [Model Monitoring Guide](./MODEL_MONITORING.md) - Production monitoring
- [ML Integration Guide](./ML_INTEGRATION.md) - Overall ML system
- [Deployment Guide](../deployment/DEPLOYMENT_GUIDE.md) - General deployment procedures
- [Disaster Recovery](../deployment/DISASTER_RECOVERY_PLAN.md) - Disaster recovery procedures
- [Testing Strategy](../development/TESTING_STRATEGY.md) - Testing best practices

---

*Last updated: January 2025*
