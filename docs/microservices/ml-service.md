# ML Service Documentation

**Service Name:** Machine Learning Service  
**Port:** 3006  
**Technology:** Python/FastAPI  
**Status:** ✅ Active

---

## Overview

The ML Service provides machine learning predictions for trading, including price forecasting, signal classification, and market regime detection. Built with FastAPI for high performance and TensorFlow/scikit-learn for ML capabilities.

### Key Capabilities

- **Price Prediction** - Multi-horizon price forecasts using LSTM+Attention
- **Signal Classification** - BUY/SELL/HOLD classification with Gradient Boosting
- **Regime Detection** - Market state detection using Hidden Markov Models
- **Real-time Predictions** - WebSocket streaming for live updates

---

## Features

### Models

| Model | Purpose | Architecture |
|-------|---------|--------------|
| **Price Predictor** | Multi-horizon price forecasts | LSTM + Attention |
| **Signal Classifier** | Trading signal classification | Gradient Boosting |
| **Regime Detector** | Market state detection | Hidden Markov Model |

### Prediction Horizons

| Horizon | Description |
|---------|-------------|
| **1m** | 1-minute forecast |
| **5m** | 5-minute forecast |
| **15m** | 15-minute forecast |
| **1h** | 1-hour forecast |
| **4h** | 4-hour forecast |
| **24h** | Daily forecast |

---

## REST Endpoints

### Health Check

```http
GET /health?XTransformPort=3006
```

**Response:**
```json
{
  "status": "healthy",
  "service": "ml-service",
  "models_loaded": {
    "price_predictor": true,
    "signal_classifier": true,
    "regime_detector": true
  },
  "websocket": {
    "active_connections": 5
  }
}
```

### Service Info

```http
GET /?XTransformPort=3006
```

**Response:**
```json
{
  "service": "CITARION ML Service",
  "version": "1.0.0",
  "endpoints": [
    "/health",
    "/api/v1/predict/price",
    "/api/v1/predict/signal",
    "/api/v1/predict/regime",
    "/api/v1/train",
    "/api/v1/models"
  ],
  "websocket": {
    "endpoint": "/ws",
    "message_types": [
      "subscribe_predictions",
      "unsubscribe",
      "get_status",
      "prediction_request",
      "ping"
    ],
    "channels": [
      "price_predictions",
      "signal_predictions",
      "regime_predictions"
    ]
  }
}
```

### Price Prediction

```http
POST /api/v1/predict/price?XTransformPort=3006
Content-Type: application/json

{
  "features": [[[...ohlcvs...]]],
  "return_confidence": false
}
```

**Request Schema:**
```typescript
interface PricePredictRequest {
  features: number[][][];  // (samples, sequence_length, features)
  return_confidence?: boolean;
}
```

**Response:**
```json
{
  "predictions": {
    "1h": 67100.50,
    "4h": 67500.00,
    "24h": 68200.00
  },
  "confidence": 0.82,
  "model": "lstm_attention",
  "timestamp": 1700000000000
}
```

**With Confidence Intervals:**
```json
{
  "predictions": {
    "1h": 67100.50,
    "4h": 67500.00,
    "24h": 68200.00
  },
  "confidence_intervals": {
    "std": [150.0, 280.0, 450.0],
    "lower": [66950.50, 67220.00, 67750.00],
    "upper": [67250.50, 67780.00, 68650.00]
  }
}
```

### Signal Classification

```http
POST /api/v1/predict/signal?XTransformPort=3006
Content-Type: application/json

{
  "features": [[...indicators...]]
}
```

**Request Schema:**
```typescript
interface SignalPredictRequest {
  features: number[][];  // (samples, features)
}
```

**Response:**
```json
{
  "signals": [
    {
      "signal": "BUY",
      "probability": 0.78,
      "confidence": 0.85,
      "probabilities": {
        "BUY": 0.78,
        "SELL": 0.12,
        "HOLD": 0.10
      }
    }
  ]
}
```

### Regime Detection

```http
POST /api/v1/predict/regime?XTransformPort=3006
Content-Type: application/json

{
  "observations": [[...features...]]
}
```

**Request Schema:**
```typescript
interface RegimePredictRequest {
  observations: number[][];  // (samples, features) - returns, volatility, volume
}
```

**Response:**
```json
{
  "regime": "bull_trend",
  "probability": 0.72,
  "states": [
    {
      "name": "accumulation",
      "probability": 0.15
    },
    {
      "name": "markup",
      "probability": 0.55
    },
    {
      "name": "distribution",
      "probability": 0.20
    },
    {
      "name": "markdown",
      "probability": 0.10
    }
  ],
  "transition_matrix": [
    [0.7, 0.2, 0.1, 0.0],
    [0.1, 0.8, 0.1, 0.0],
    [0.0, 0.1, 0.7, 0.2],
    [0.1, 0.0, 0.1, 0.8]
  ]
}
```

### Training API

```http
POST /api/v1/train?XTransformPort=3006
Content-Type: application/json

{
  "model_type": "price_predictor",
  "X": [[[...features...]]],
  "y": [[...targets...]],
  "epochs": 100,
  "batch_size": 32
}
```

**Request Schema:**
```typescript
interface TrainRequest {
  model_type: "price_predictor" | "signal_classifier" | "regime_detector";
  X: any[];
  y?: any[];
  epochs?: number;
  batch_size?: number;
}
```

**Response:**
```json
{
  "status": "trained",
  "model_type": "price_predictor",
  "history": {
    "loss": [0.05, 0.03, 0.02],
    "val_loss": [0.06, 0.04, 0.03],
    "epochs_trained": 100
  }
}
```

### List Models

```http
GET /api/v1/models?XTransformPort=3006
```

**Response:**
```json
{
  "models": [
    {
      "name": "price_predictor",
      "is_trained": true,
      "metrics": {
        "mse": 0.0015,
        "mae": 0.025,
        "r2": 0.92
      }
    },
    {
      "name": "signal_classifier",
      "is_trained": true,
      "metrics": {
        "accuracy": 0.78,
        "precision": 0.75,
        "recall": 0.72,
        "f1": 0.73
      }
    },
    {
      "name": "regime_detector",
      "is_trained": true,
      "metrics": {
        "log_likelihood": -1250.5,
        "aic": 2515.0
      }
    }
  ]
}
```

### Model Metrics

```http
GET /api/v1/models/{model_name}/metrics?XTransformPort=3006
```

---

## WebSocket Events

### Connection

```javascript
const ws = new WebSocket('ws://localhost:3006/ws');

ws.onopen = () => {
  console.log('Connected to ML Service');
};
```

### Subscribe to Predictions

```javascript
ws.send(JSON.stringify({
  type: 'subscribe_predictions',
  data: {
    channels: ['price_predictions', 'signal_predictions', 'regime_predictions']
  }
}));
```

### Request On-Demand Prediction

```javascript
ws.send(JSON.stringify({
  type: 'prediction_request',
  data: {
    prediction_type: 'price',
    features: [[[...ohlcvs...]]]
  }
}));
```

### Receive Predictions

```javascript
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  
  switch (message.type) {
    case 'price_prediction':
      console.log('Price prediction:', message.data);
      break;
    case 'signal_prediction':
      console.log('Signal prediction:', message.data);
      break;
    case 'regime_prediction':
      console.log('Regime prediction:', message.data);
      break;
  }
};
```

### WebSocket Message Types

| Type | Direction | Description |
|------|-----------|-------------|
| `subscribe_predictions` | Client → Server | Subscribe to prediction channels |
| `unsubscribe` | Client → Server | Unsubscribe from channels |
| `get_status` | Client → Server | Get connection status |
| `prediction_request` | Client → Server | Request on-demand prediction |
| `ping` | Client → Server | Heartbeat |
| `price_prediction` | Server → Client | Price prediction update |
| `signal_prediction` | Server → Client | Signal classification update |
| `regime_prediction` | Server → Client | Regime detection update |
| `pong` | Server → Client | Heartbeat response |

---

## Model Details

### Price Predictor (LSTM + Attention)

**Architecture:**
```
Input (sequence_length, features)
    ↓
LSTM Layer (128 units, return_sequences=True)
    ↓
Attention Layer
    ↓
Dense Layer (64 units, ReLU)
    ↓
Dense Layer (horizons, linear)
```

**Configuration:**
```yaml
price_predictor:
  sequence_length: 60
  features: 20
  lstm_units: 128
  attention_heads: 4
  dropout: 0.2
  horizons: [1, 5, 15, 60, 240, 1440]  # minutes
```

### Signal Classifier (Gradient Boosting)

**Features:**
- RSI, MACD, Bollinger Bands
- Volume indicators
- Price momentum
- Volatility measures

**Configuration:**
```yaml
signal_classifier:
  n_estimators: 200
  max_depth: 5
  learning_rate: 0.1
  min_samples_split: 10
  features: [rsi, macd, bb_upper, bb_lower, volume, momentum, volatility]
```

### Regime Detector (HMM)

**States:**
- `accumulation` - Sideways with increasing volume
- `markup` - Uptrend phase
- `distribution` - Top formation
- `markdown` - Downtrend phase

**Configuration:**
```yaml
regime_detector:
  n_states: 4
  n_iterations: 100
  covariance_type: full
  features: [returns, volatility, volume_ratio]
```

---

## Configuration

### Environment Variables

```env
# Service Configuration
ML_SERVICE_PORT=3006

# CORS (Required for production)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Model Paths
PRICE_PREDICTOR_PATH=./models/price_predictor.h5
SIGNAL_CLASSIFIER_PATH=./models/signal_classifier.pkl
REGIME_DETECTOR_PATH=./models/regime_detector.pkl

# TensorFlow
TF_CPP_MIN_LOG_LEVEL=2
```

### Configuration File

```yaml
# config/config.yaml
models:
  price_predictor:
    sequence_length: 60
    features: 20
    train:
      epochs: 100
      batch_size: 32
      learning_rate: 0.001
      
  signal_classifier:
    n_estimators: 200
    max_depth: 5
    
  regime_detector:
    n_states: 4
    n_iterations: 100

feature_engineering:
  technical_indicators:
    - rsi
    - macd
    - bollinger_bands
    - atr
    - obv
  window_sizes: [14, 20, 50]
```

---

## Example Code

### Python Client

```python
import requests
import numpy as np

class MLServiceClient:
    def __init__(self, base_url="http://localhost:3000"):
        self.base_url = base_url
    
    def predict_price(self, features: np.ndarray, return_confidence: bool = False):
        """Get price predictions"""
        response = requests.post(
            f"{self.base_url}/api/v1/predict/price?XTransformPort=3006",
            json={
                "features": features.tolist(),
                "return_confidence": return_confidence
            }
        )
        return response.json()
    
    def classify_signal(self, features: np.ndarray):
        """Get signal classification"""
        response = requests.post(
            f"{self.base_url}/api/v1/predict/signal?XTransformPort=3006",
            json={"features": features.tolist()}
        )
        return response.json()
    
    def detect_regime(self, observations: np.ndarray):
        """Get regime detection"""
        response = requests.post(
            f"{self.base_url}/api/v1/predict/regime?XTransformPort=3006",
            json={"observations": observations.tolist()}
        )
        return response.json()
    
    def train_model(self, model_type: str, X: np.ndarray, y: np.ndarray = None, epochs: int = 100):
        """Train a model"""
        response = requests.post(
            f"{self.base_url}/api/v1/train?XTransformPort=3006",
            json={
                "model_type": model_type,
                "X": X.tolist(),
                "y": y.tolist() if y is not None else None,
                "epochs": epochs
            }
        )
        return response.json()
    
    def list_models(self):
        """List available models"""
        response = requests.get(
            f"{self.base_url}/api/v1/models?XTransformPort=3006"
        )
        return response.json()

# Usage
client = MLServiceClient()

# Price prediction
features = np.random.randn(1, 60, 20)  # 1 sample, 60 timesteps, 20 features
prediction = client.predict_price(features)
print(f"1h prediction: {prediction['predictions']['1h']}")

# Signal classification
indicators = np.random.randn(1, 15)  # 1 sample, 15 indicators
signal = client.classify_signal(indicators)
print(f"Signal: {signal['signals'][0]['signal']}")
print(f"Probability: {signal['signals'][0]['probability']}")

# Regime detection
observations = np.random.randn(100, 3)  # 100 samples, 3 features
regime = client.detect_regime(observations)
print(f"Current regime: {regime['regime']}")
```

### JavaScript/TypeScript Client

```typescript
class MLServiceClient {
  private baseUrl: string;
  
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }
  
  async predictPrice(features: number[][][], returnConfidence = false) {
    const response = await fetch(
      `${this.baseUrl}/api/v1/predict/price?XTransformPort=3006`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features, return_confidence: returnConfidence })
      }
    );
    return response.json();
  }
  
  async classifySignal(features: number[][]) {
    const response = await fetch(
      `${this.baseUrl}/api/v1/predict/signal?XTransformPort=3006`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features })
      }
    );
    return response.json();
  }
  
  async detectRegime(observations: number[][]) {
    const response = await fetch(
      `${this.baseUrl}/api/v1/predict/regime?XTransformPort=3006`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ observations })
      }
    );
    return response.json();
  }
}

// Usage
const client = new MLServiceClient();

const pricePred = await client.predictPrice(features);
console.log('Price prediction:', pricePred.predictions);

const signalPred = await client.classifySignal(indicators);
console.log('Signal:', signalPred.signals[0].signal);
```

### React Hook Example

```typescript
import { useMLClassification } from '@/hooks/use-ml-classification';

function SignalIndicator({ symbol }: { symbol: string }) {
  const { result, isLoading, classify } = useMLClassification({ symbol });
  
  useEffect(() => {
    // Classify when component mounts
    classify({
      high: priceData.high,
      low: priceData.low,
      close: priceData.close,
      volume: priceData.volume
    });
  }, [symbol]);
  
  if (isLoading) return <Skeleton />;
  
  return (
    <div className="flex items-center gap-2">
      <Badge variant={result?.signal === 'BUY' ? 'success' : 'destructive'}>
        {result?.signal}
      </Badge>
      <span className="text-sm text-muted-foreground">
        {(result?.probability * 100).toFixed(1)}% confidence
      </span>
    </div>
  );
}
```

---

## Feature Engineering

### Technical Indicators

```python
# Feature engineering for signal classification
def engineer_features(ohlcvs: pd.DataFrame) -> np.ndarray:
    features = []
    
    # RSI
    features.append(calculate_rsi(ohlcvs['close'], period=14))
    
    # MACD
    macd, signal, hist = calculate_macd(ohlcvs['close'])
    features.extend([macd, signal, hist])
    
    # Bollinger Bands
    upper, middle, lower = calculate_bollinger(ohlcvs['close'])
    features.extend([upper, middle, lower])
    
    # ATR (volatility)
    features.append(calculate_atr(ohlcvs['high'], ohlcvs['low'], ohlcvs['close']))
    
    # Volume
    features.append(ohlcvs['volume'].pct_change())
    
    return np.array(features).T
```

### Sequence Preparation

```python
def prepare_sequences(data: np.ndarray, sequence_length: int = 60):
    """Prepare sequences for LSTM input"""
    sequences = []
    for i in range(len(data) - sequence_length):
        sequences.append(data[i:i + sequence_length])
    return np.array(sequences)
```

---

## Monitoring

### Model Performance Metrics

| Model | Key Metrics |
|-------|-------------|
| Price Predictor | MSE, MAE, R² |
| Signal Classifier | Accuracy, Precision, Recall, F1 |
| Regime Detector | Log-likelihood, AIC |

### Health Monitoring

```bash
# Check service health
curl http://localhost:3006/health

# List models and status
curl "http://localhost:3000/api/v1/models?XTransformPort=3006"
```

---

## See Also

- [MICROSERVICES_API.md](MICROSERVICES_API.md) - Complete API reference
- [rl-service.md](rl-service.md) - Reinforcement Learning service
- [../ml/ML_PIPELINE_IMMEDIATE.md](../ml/ML_PIPELINE_IMMEDIATE.md) - ML Pipeline details

---

*Last updated: March 2026 | CITARION Documentation Team*
