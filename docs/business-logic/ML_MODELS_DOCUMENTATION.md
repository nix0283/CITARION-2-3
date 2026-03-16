# CITARION ML Models Documentation

> **Last Updated:** March 2025  
> **Framework:** TensorFlow, scikit-learn, PyTorch

---

## Table of Contents

1. [Overview](#overview)
2. [Model Architecture](#model-architecture)
3. [Feature Engineering](#feature-engineering)
4. [Training Pipeline](#training-pipeline)
5. [Model Metrics](#model-metrics)
6. [Inference](#inference)
7. [Model Monitoring](#model-monitoring)

---

## Overview

CITARION uses multiple ML models for trading predictions.

### Models Summary

| Model | Type | Purpose | Accuracy |
|-------|------|---------|----------|
| Price Predictor | LSTM + Attention | Multi-horizon price forecast | 68% directional |
| Signal Classifier | Gradient Boosting | BUY/SELL/HOLD classification | 72% |
| Regime Detector | Hidden Markov Model | Market state detection | 78% |
| Lawrence Classifier | k-NN + Filters | Signal classification | 65% |

### Service Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ML SERVICE ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────────┐   │
│   │   Price         │     │   Signal        │     │   Regime            │   │
│   │   Predictor     │     │   Classifier    │     │   Detector          │   │
│   │   (LSTM)        │     │   (XGBoost)     │     │   (HMM)             │   │
│   └────────┬────────┘     └────────┬────────┘     └────────┬────────────┘   │
│            │                       │                       │                 │
│            └───────────────────────┼───────────────────────┘                 │
│                                    │                                         │
│                                    ▼                                         │
│                          ┌─────────────────┐                                │
│                          │  Feature        │                                │
│                          │  Engineering    │                                │
│                          └────────┬────────┘                                │
│                                   │                                          │
│                                   ▼                                          │
│                          ┌─────────────────┐                                │
│                          │  OHLCV Data     │                                │
│                          │  (Candles)      │                                │
│                          └─────────────────┘                                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Model Architecture

### 1. Price Predictor (LSTM + Attention)

```python
# models/price_predictor.py
import tensorflow as tf
from tensorflow.keras import layers, models

class PricePredictor:
    """
    LSTM with Attention for multi-horizon price prediction.
    
    Input: Sequence of OHLCV candles (60 timesteps × 5 features)
    Output: Price change predictions for 1h, 4h, 24h horizons
    """
    
    def __init__(self, config: dict):
        self.sequence_length = config.get('sequence_length', 60)
        self.feature_count = config.get('feature_count', 5)
        self.hidden_units = config.get('hidden_units', 128)
        self.attention_heads = config.get('attention_heads', 4)
        self.dropout_rate = config.get('dropout_rate', 0.2)
        self.horizons = config.get('horizons', [1, 4, 24])
        
    def build_model(self) -> tf.keras.Model:
        # Input layer
        inputs = layers.Input(
            shape=(self.sequence_length, self.feature_count),
            name='ohlcv_input'
        )
        
        # LSTM layers
        x = layers.LSTM(
            self.hidden_units,
            return_sequences=True,
            name='lstm_1'
        )(inputs)
        x = layers.Dropout(self.dropout_rate)(x)
        
        x = layers.LSTM(
            self.hidden_units,
            return_sequences=True,
            name='lstm_2'
        )(x)
        x = layers.Dropout(self.dropout_rate)(x)
        
        # Multi-head attention
        attention = layers.MultiHeadAttention(
            num_heads=self.attention_heads,
            key_dim=self.hidden_units // self.attention_heads,
            name='multi_head_attention'
        )(x, x)
        x = layers.Add()([x, attention])
        x = layers.LayerNormalization()(x)
        
        # Global pooling
        x = layers.GlobalAveragePooling1D()(x)
        
        # Dense layers
        x = layers.Dense(64, activation='relu')(x)
        x = layers.Dropout(self.dropout_rate)(x)
        
        # Output heads for each horizon
        outputs = []
        for horizon in self.horizons:
            output = layers.Dense(
                2,  # [direction, magnitude]
                activation=None,
                name=f'prediction_{horizon}h'
            )(x)
            outputs.append(output)
        
        return models.Model(inputs=inputs, outputs=outputs)
    
    def predict(self, sequence: np.ndarray) -> dict:
        """
        Predict price changes for all horizons.
        
        Args:
            sequence: Shape (batch, 60, 5) - OHLCV normalized
            
        Returns:
            {
                '1h': {'direction': float, 'magnitude': float},
                '4h': {'direction': float, 'magnitude': float},
                '24h': {'direction': float, 'magnitude': float}
            }
        """
        predictions = self.model.predict(sequence)
        
        results = {}
        for i, horizon in enumerate(self.horizons):
            # Apply sigmoid to direction (0-1)
            direction = tf.nn.sigmoid(predictions[i][..., 0]).numpy()
            # Apply tanh to magnitude (-1 to 1, then scale)
            magnitude = tf.nn.tanh(predictions[i][..., 1]).numpy() * 0.1
            
            results[f'{horizon}h'] = {
                'direction': direction,
                'magnitude': magnitude,
            }
            
        return results
```

### 2. Signal Classifier (XGBoost)

```python
# models/signal_classifier.py
import xgboost as xgb
from sklearn.preprocessing import StandardScaler
import joblib

class SignalClassifier:
    """
    Gradient Boosting classifier for trading signals.
    
    Features: 25+ technical indicators
    Classes: LONG (1), SHORT (-1), HOLD (0)
    """
    
    def __init__(self, config: dict):
        self.n_estimators = config.get('n_estimators', 500)
        self.max_depth = config.get('max_depth', 8)
        self.learning_rate = config.get('learning_rate', 0.05)
        self.subsample = config.get('subsample', 0.8)
        self.colsample_bytree = config.get('colsample_bytree', 0.8)
        
        self.model = None
        self.scaler = StandardScaler()
        
    def train(self, X: np.ndarray, y: np.ndarray):
        """
        Train the classifier.
        
        Args:
            X: Features (n_samples, n_features)
            y: Labels (n_samples,) - LONG=1, SHORT=-1, HOLD=0
        """
        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        
        # Create DMatrix for efficiency
        dtrain = xgb.DMatrix(X_scaled, label=y)
        
        # Training parameters
        params = {
            'objective': 'multi:softprob',
            'num_class': 3,
            'max_depth': self.max_depth,
            'learning_rate': self.learning_rate,
            'subsample': self.subsample,
            'colsample_bytree': self.colsample_bytree,
            'eval_metric': ['mlogloss', 'merror'],
        }
        
        # Train model
        self.model = xgb.train(
            params,
            dtrain,
            num_boost_round=self.n_estimators,
            evals=[(dtrain, 'train')],
            verbose_eval=50
        )
        
    def predict(self, features: np.ndarray) -> dict:
        """
        Predict signal direction.
        
        Returns:
            {
                'direction': 'LONG' | 'SHORT' | 'HOLD',
                'probabilities': {'LONG': float, 'SHORT': float, 'HOLD': float},
                'confidence': float
            }
        """
        X_scaled = self.scaler.transform(features.reshape(1, -1))
        dm = xgb.DMatrix(X_scaled)
        
        probs = self.model.predict(dm)[0]
        
        # Map probabilities
        class_map = {0: 'HOLD', 1: 'LONG', 2: 'SHORT'}
        probabilities = {class_map[i]: float(p) for i, p in enumerate(probs)}
        
        # Get predicted class
        predicted_idx = np.argmax(probs)
        direction = class_map[predicted_idx]
        
        # Confidence is probability of predicted class
        confidence = float(probs[predicted_idx])
        
        return {
            'direction': direction,
            'probabilities': probabilities,
            'confidence': confidence
        }
    
    def save(self, path: str):
        """Save model and scaler."""
        self.model.save_model(f'{path}_model.json')
        joblib.dump(self.scaler, f'{path}_scaler.pkl')
        
    def load(self, path: str):
        """Load model and scaler."""
        self.model = xgb.Booster()
        self.model.load_model(f'{path}_model.json')
        self.scaler = joblib.load(f'{path}_scaler.pkl')
```

### 3. Regime Detector (HMM)

```python
# models/regime_detector.py
from hmmlearn import hmm
import numpy as np

class RegimeDetector:
    """
    Hidden Markov Model for market regime detection.
    
    States: BULL (0), BEAR (1), SIDEWAYS (2)
    Observations: Returns, volatility, volume changes
    """
    
    def __init__(self, config: dict):
        self.n_states = config.get('n_states', 3)
        self.n_iter = config.get('n_iter', 100)
        self.covariance_type = config.get('covariance_type', 'full')
        
        self.model = hmm.GaussianHMM(
            n_components=self.n_states,
            covariance_type=self.covariance_type,
            n_iter=self.n_iter,
            random_state=42
        )
        
        # State labels
        self.state_labels = {0: 'BULL', 1: 'BEAR', 2: 'SIDEWAYS'}
        
    def prepare_features(self, prices: np.ndarray, volumes: np.ndarray) -> np.ndarray:
        """
        Prepare features for HMM.
        
        Features:
        - Log returns
        - Rolling volatility (20-period)
        - Volume change
        """
        # Log returns
        returns = np.log(prices[1:] / prices[:-1])
        
        # Rolling volatility
        window = 20
        volatility = np.array([
            np.std(returns[max(0, i-window):i]) 
            for i in range(1, len(returns) + 1)
        ])
        
        # Volume change
        vol_change = np.log(volumes[1:] / volumes[:-1])
        
        # Combine features
        features = np.column_stack([
            returns,
            volatility,
            vol_change
        ])
        
        # Remove NaN
        features = features[~np.isnan(features).any(axis=1)]
        
        return features
        
    def train(self, prices: np.ndarray, volumes: np.ndarray):
        """Train HMM on historical data."""
        features = self.prepare_features(prices, volumes)
        self.model.fit(features)
        
    def predict(self, observations: np.ndarray) -> dict:
        """
        Predict current market regime.
        
        Returns:
            {
                'regime': 'BULL' | 'BEAR' | 'SIDEWAYS',
                'probabilities': {'BULL': float, 'BEAR': float, 'SIDEWAYS': float},
                'state_sequence': list
            }
        """
        # Get state sequence
        state_sequence = self.model.predict(observations)
        
        # Get state probabilities
        probs = self.model.predict_proba(observations)
        
        # Current state
        current_state = state_sequence[-1]
        current_probs = probs[-1]
        
        return {
            'regime': self.state_labels[current_state],
            'probabilities': {
                self.state_labels[i]: float(p) 
                for i, p in enumerate(current_probs)
            },
            'state_sequence': [self.state_labels[s] for s in state_sequence]
        }
```

### 4. Lawrence Classifier (k-NN)

```python
# models/lawrence_classifier.py
import numpy as np
from scipy.spatial.distance import euclidean, cosine
from collections import Counter

class LawrenceClassifier:
    """
    k-NN based signal classifier with distance functions.
    
    Distance functions:
    - Euclidean
    - Cosine
    - Lorentzian
    - Manhattan
    """
    
    def __init__(self, config: dict):
        self.k = config.get('k', 5)
        self.distance_func = config.get('distance_func', 'euclidean')
        self.samples = []
        self.labels = []
        
        # Distance function mapping
        self.distance_functions = {
            'euclidean': euclidean,
            'cosine': cosine,
            'lorentzian': self._lorentzian_distance,
            'manhattan': self._manhattan_distance,
        }
        
    def _lorentzian_distance(self, x: np.ndarray, y: np.ndarray) -> float:
        """Lorentzian distance: ln(1 + |x - y|)"""
        return np.sum(np.log(1 + np.abs(x - y)))
    
    def _manhattan_distance(self, x: np.ndarray, y: np.ndarray) -> float:
        """Manhattan distance: sum(|x - y|)"""
        return np.sum(np.abs(x - y))
    
    def train(self, samples: list, labels: list):
        """
        Store training samples.
        
        Args:
            samples: List of feature vectors
            labels: List of labels ('LONG', 'SHORT', 'HOLD')
        """
        self.samples = [np.array(s) for s in samples]
        self.labels = labels
        
    def predict(self, features: np.ndarray) -> dict:
        """
        Predict using k-NN.
        
        Returns:
            {
                'direction': 'LONG' | 'SHORT' | 'HOLD',
                'probability': float,
                'confidence': float,
                'neighbors': list
            }
        """
        features = np.array(features)
        distance_func = self.distance_functions[self.distance_func]
        
        # Calculate distances
        distances = [
            (i, distance_func(features, sample))
            for i, sample in enumerate(self.samples)
        ]
        
        # Sort by distance
        distances.sort(key=lambda x: x[1])
        
        # Get k nearest neighbors
        k_nearest = distances[:self.k]
        k_labels = [self.labels[i] for i, _ in k_nearest]
        
        # Vote
        vote_counts = Counter(k_labels)
        predicted = vote_counts.most_common(1)[0][0]
        
        # Probability based on vote ratio
        probability = vote_counts[predicted] / self.k
        
        # Confidence based on distance (closer = more confident)
        avg_distance = np.mean([d for _, d in k_nearest])
        confidence = 1 / (1 + avg_distance)  # Sigmoid-like
        
        return {
            'direction': predicted,
            'probability': probability,
            'confidence': float(confidence),
            'neighbors': [
                {'label': self.labels[i], 'distance': float(d)}
                for i, d in k_nearest
            ]
        }
```

---

## Feature Engineering

### Feature List

```python
# features/feature_engineer.py

FEATURE_DEFINITIONS = {
    # ==================== PRICE FEATURES ====================
    'close': {
        'description': 'Close price',
        'formula': 'raw',
        'normalization': 'minmax',
    },
    'log_return': {
        'description': 'Log return',
        'formula': 'log(close[t] / close[t-1])',
        'normalization': 'standard',
    },
    'return_1h': {
        'description': '1-hour return',
        'formula': '(close[t] - close[t-12]) / close[t-12]',  # 12 × 5min candles
        'normalization': 'standard',
    },
    
    # ==================== TREND FEATURES ====================
    'ema_5': {
        'description': '5-period EMA',
        'formula': 'EMA(close, 5)',
        'normalization': 'minmax',
    },
    'ema_20': {
        'description': '20-period EMA',
        'formula': 'EMA(close, 20)',
        'normalization': 'minmax',
    },
    'trend_strength': {
        'description': 'Trend strength',
        'formula': '(ema_5 - ema_20) / ema_20',
        'normalization': 'standard',
    },
    
    # ==================== MOMENTUM FEATURES ====================
    'rsi_14': {
        'description': 'RSI 14-period',
        'formula': 'RSI(close, 14)',
        'normalization': 'minmax',  # 0-100
    },
    'rsi_overbought': {
        'description': 'RSI overbought signal',
        'formula': 'rsi_14 > 70 ? 1 : 0',
        'normalization': 'none',
    },
    'rsi_oversold': {
        'description': 'RSI oversold signal',
        'formula': 'rsi_14 < 30 ? 1 : 0',
        'normalization': 'none',
    },
    'macd': {
        'description': 'MACD line',
        'formula': 'EMA(12) - EMA(26)',
        'normalization': 'standard',
    },
    'macd_signal': {
        'description': 'MACD signal line',
        'formula': 'EMA(macd, 9)',
        'normalization': 'standard',
    },
    'macd_histogram': {
        'description': 'MACD histogram',
        'formula': 'macd - macd_signal',
        'normalization': 'standard',
    },
    
    # ==================== VOLATILITY FEATURES ====================
    'atr_14': {
        'description': 'ATR 14-period',
        'formula': 'ATR(high, low, close, 14)',
        'normalization': 'standard',
    },
    'bb_width': {
        'description': 'Bollinger Band width',
        'formula': '(bb_upper - bb_lower) / bb_middle',
        'normalization': 'standard',
    },
    'bb_percent': {
        'description': 'Bollinger Band percent',
        'formula': '(close - bb_lower) / (bb_upper - bb_lower)',
        'normalization': 'minmax',
    },
    'volatility_20': {
        'description': '20-period volatility',
        'formula': 'stddev(returns, 20)',
        'normalization': 'standard',
    },
    
    # ==================== VOLUME FEATURES ====================
    'volume_ratio': {
        'description': 'Volume ratio to SMA',
        'formula': 'volume / SMA(volume, 20)',
        'normalization': 'standard',
    },
    'obv': {
        'description': 'On-Balance Volume',
        'formula': 'cumsum(volume * sign(return))',
        'normalization': 'standard',
    },
    'vwap': {
        'description': 'Volume Weighted Average Price',
        'formula': 'cumsum(volume * close) / cumsum(volume)',
        'normalization': 'minmax',
    },
}

class FeatureEngineer:
    """Generate all features for ML models."""
    
    def __init__(self, feature_list: list = None):
        self.feature_list = feature_list or list(FEATURE_DEFINITIONS.keys())
        
    def transform(self, candles: list) -> np.ndarray:
        """
        Transform OHLCV candles to feature matrix.
        
        Args:
            candles: List of OHLCV dictionaries
            
        Returns:
            Feature matrix (n_samples, n_features)
        """
        closes = np.array([c['close'] for c in candles])
        highs = np.array([c['high'] for c in candles])
        lows = np.array([c['low'] for c in candles])
        volumes = np.array([c['volume'] for c in candles])
        
        features = {}
        
        # Calculate each feature
        features['close'] = closes
        features['log_return'] = np.log(closes[1:] / closes[:-1])
        features['return_1h'] = self._calculate_return(closes, 12)
        features['ema_5'] = self._calculate_ema(closes, 5)
        features['ema_20'] = self._calculate_ema(closes, 20)
        features['trend_strength'] = (features['ema_5'] - features['ema_20']) / features['ema_20']
        features['rsi_14'] = self._calculate_rsi(closes, 14)
        features['macd'] = self._calculate_ema(closes, 12) - self._calculate_ema(closes, 26)
        features['macd_signal'] = self._calculate_ema(features['macd'], 9)
        features['macd_histogram'] = features['macd'] - features['macd_signal']
        features['atr_14'] = self._calculate_atr(highs, lows, closes, 14)
        features['volume_ratio'] = volumes / self._calculate_sma(volumes, 20)
        
        # Stack selected features
        feature_matrix = np.column_stack([
            features[f] for f in self.feature_list if f in features
        ])
        
        return feature_matrix
```

---

## Training Pipeline

### Training Configuration

```yaml
# config/training.yaml

price_predictor:
  sequence_length: 60
  hidden_units: 128
  attention_heads: 4
  dropout_rate: 0.2
  batch_size: 32
  epochs: 100
  learning_rate: 0.001
  early_stopping_patience: 10
  
signal_classifier:
  n_estimators: 500
  max_depth: 8
  learning_rate: 0.05
  subsample: 0.8
  colsample_bytree: 0.8
  
regime_detector:
  n_states: 3
  n_iter: 100
  covariance_type: full

training:
  train_test_split: 0.8
  validation_split: 0.1
  shuffle: false  # Time series - don't shuffle
  normalize: true
```

### Training Script

```python
# scripts/train_models.py

import yaml
from datetime import datetime
from models import PricePredictor, SignalClassifier, RegimeDetector
from features import FeatureEngineer
from data import DataLoader

def train_all_models():
    """Train all ML models."""
    
    # Load config
    with open('config/training.yaml') as f:
        config = yaml.safe_load(f)
    
    # Load data
    loader = DataLoader()
    candles = loader.load_candles(
        symbol='BTCUSDT',
        start='2023-01-01',
        end='2024-01-01',
        interval='5m'
    )
    
    # Feature engineering
    engineer = FeatureEngineer()
    features = engineer.transform(candles)
    
    # Train Price Predictor
    print("Training Price Predictor...")
    price_model = PricePredictor(config['price_predictor'])
    price_model.train(features)
    price_model.save('models/price_predictor')
    
    # Train Signal Classifier
    print("Training Signal Classifier...")
    signal_model = SignalClassifier(config['signal_classifier'])
    labels = create_labels(candles)  # Define your labeling function
    signal_model.train(features, labels)
    signal_model.save('models/signal_classifier')
    
    # Train Regime Detector
    print("Training Regime Detector...")
    regime_model = RegimeDetector(config['regime_detector'])
    regime_model.train(
        prices=np.array([c['close'] for c in candles]),
        volumes=np.array([c['volume'] for c in candles])
    )
    regime_model.save('models/regime_detector')
    
    print("All models trained successfully!")

if __name__ == '__main__':
    train_all_models()
```

---

## Model Metrics

### Evaluation Metrics

```python
# evaluation/metrics.py

from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report
)

def evaluate_classifier(y_true, y_pred, y_prob=None):
    """Evaluate classifier performance."""
    
    metrics = {
        'accuracy': accuracy_score(y_true, y_pred),
        'precision': precision_score(y_true, y_pred, average='weighted'),
        'recall': recall_score(y_true, y_pred, average='weighted'),
        'f1': f1_score(y_true, y_pred, average='weighted'),
        'confusion_matrix': confusion_matrix(y_true, y_pred).tolist(),
    }
    
    # Add per-class metrics
    report = classification_report(y_true, y_pred, output_dict=True)
    metrics['per_class'] = report
    
    return metrics

def evaluate_price_predictor(y_true, y_pred):
    """Evaluate price prediction accuracy."""
    
    # Direction accuracy
    true_direction = np.sign(y_true)
    pred_direction = np.sign(y_pred)
    direction_accuracy = np.mean(true_direction == pred_direction)
    
    # MSE
    mse = np.mean((y_true - y_pred) ** 2)
    
    # MAE
    mae = np.mean(np.abs(y_true - y_pred))
    
    return {
        'direction_accuracy': direction_accuracy,
        'mse': mse,
        'mae': mae,
        'rmse': np.sqrt(mse),
    }
```

### Model Performance

| Model | Metric | Value | Target |
|-------|--------|-------|--------|
| Price Predictor | Direction Accuracy | 68% | >65% |
| Price Predictor | RMSE | 0.025 | <0.03 |
| Signal Classifier | Accuracy | 72% | >70% |
| Signal Classifier | F1 Score | 0.71 | >0.68 |
| Regime Detector | Accuracy | 78% | >75% |
| Lawrence Classifier | Accuracy | 65% | >60% |

---

## Inference

### Real-time Inference

```python
# services/inference.py

class InferenceService:
    """Real-time inference service."""
    
    def __init__(self, model_paths: dict):
        self.price_predictor = PricePredictor.load(model_paths['price'])
        self.signal_classifier = SignalClassifier.load(model_paths['signal'])
        self.regime_detector = RegimeDetector.load(model_paths['regime'])
        self.feature_engineer = FeatureEngineer()
        
    async def predict(self, candles: list) -> dict:
        """
        Run all predictions.
        
        Returns:
            {
                'price': PricePrediction,
                'signal': SignalPrediction,
                'regime': RegimePrediction
            }
        """
        # Feature engineering
        features = self.feature_engineer.transform(candles)
        
        # Price prediction
        price_pred = self.price_predictor.predict(features[-60:])
        
        # Signal classification
        signal_pred = self.signal_classifier.predict(features[-1])
        
        # Regime detection
        regime_pred = self.regime_detector.predict(features)
        
        return {
            'price': price_pred,
            'signal': signal_pred,
            'regime': regime_pred,
            'timestamp': datetime.utcnow().isoformat(),
        }
```

---

## Model Monitoring

### Drift Detection

```python
# monitoring/drift_detection.py

class DriftDetector:
    """Detect model drift."""
    
    def __init__(self, baseline_features: np.ndarray, threshold: float = 0.1):
        self.baseline_mean = np.mean(baseline_features, axis=0)
        self.baseline_std = np.std(baseline_features, axis=0)
        self.threshold = threshold
        
    def check_drift(self, current_features: np.ndarray) -> dict:
        """Check for feature drift."""
        
        current_mean = np.mean(current_features, axis=0)
        current_std = np.std(current_features, axis=0)
        
        # Kolmogorov-Smirnov test for each feature
        drift_detected = []
        
        for i in range(current_features.shape[1]):
            statistic, p_value = ks_2samp(
                self.baseline_features[:, i],
                current_features[:, i]
            )
            
            if p_value < 0.05:
                drift_detected.append({
                    'feature_index': i,
                    'statistic': statistic,
                    'p_value': p_value
                })
        
        return {
            'drift_detected': len(drift_detected) > 0,
            'drifted_features': drift_detected,
            'mean_shift': np.linalg.norm(current_mean - self.baseline_mean),
            'std_shift': np.linalg.norm(current_std - self.baseline_std),
        }
```

### Performance Monitoring

```python
# monitoring/performance.py

class ModelPerformanceMonitor:
    """Monitor model performance in production."""
    
    def __init__(self):
        self.predictions = []
        self.actuals = []
        
    def log_prediction(self, prediction: dict, actual: dict = None):
        """Log prediction for later evaluation."""
        self.predictions.append({
            'prediction': prediction,
            'actual': actual,
            'timestamp': datetime.utcnow(),
        })
        
    def calculate_metrics(self) -> dict:
        """Calculate rolling metrics."""
        if not self.predictions:
            return {}
            
        recent = self.predictions[-1000:]  # Last 1000 predictions
        
        # Direction accuracy
        correct = sum(
            1 for p in recent 
            if p['actual'] and p['prediction']['direction'] == p['actual']['direction']
        )
        direction_accuracy = correct / len([p for p in recent if p['actual']])
        
        return {
            'direction_accuracy': direction_accuracy,
            'total_predictions': len(self.predictions),
            'recent_predictions': len(recent),
        }
```

---

## Related Documentation

- [BOT_ALGORITHMS.md](../business-logic/BOT_ALGORITHMS.md) - Bot implementations
- [API_SPECIFICATION.md](../architecture/API_SPECIFICATION.md) - ML API endpoints
- [MONITORING_AND_ALERTING.md](../deployment/MONITORING_AND_ALERTING.md) - Model monitoring
