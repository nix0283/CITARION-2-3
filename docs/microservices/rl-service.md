# RL Service Documentation

**Service Name:** Reinforcement Learning Service  
**Port:** 3007  
**Technology:** Python/FastAPI  
**Status:** ✅ Active

---

## Overview

The RL Service provides reinforcement learning agents for trading automation. It implements PPO, SAC, and DQN algorithms trained on historical market data to make autonomous trading decisions.

### Key Capabilities

- **PPO Agent** - Proximal Policy Optimization for general trading
- **SAC Agent** - Soft Actor-Critic for continuous action spaces
- **DQN Agent** - Deep Q-Network for discrete trading decisions
- **Training Pipeline** - Custom trading environments and reward functions

---

## Features

### Agent Types

| Agent | Algorithm | Action Space | Best For |
|-------|-----------|--------------|----------|
| **PPO** | Proximal Policy Optimization | Continuous | General trading, stable learning |
| **SAC** | Soft Actor-Critic | Continuous | Complex environments, exploration |
| **DQN** | Deep Q-Network | Discrete | Simple buy/sell/hold decisions |

### Training Features

- **Custom Environments** - Trading-specific Gym environments
- **Reward Shaping** - Sharpe ratio, risk-adjusted returns
- **Experience Replay** - Efficient learning from history
- **Curriculum Learning** - Progressive difficulty increase

---

## REST Endpoints

### Health Check

```http
GET /health?XTransformPort=3007
```

**Response:**
```json
{
  "status": "healthy",
  "service": "rl-service",
  "agents_loaded": ["ppo", "sac", "dqn"],
  "training_status": "idle"
}
```

### Service Info

```http
GET /?XTransformPort=3007
```

**Response:**
```json
{
  "service": "CITARION RL Service",
  "version": "1.0.0",
  "endpoints": [
    "/health",
    "/api/v1/train/start",
    "/api/v1/train/stop",
    "/api/v1/train/status",
    "/api/v1/predict",
    "/api/v1/agents"
  ]
}
```

### Start Training

```http
POST /api/v1/train/start?XTransformPort=3007
Content-Type: application/json

{
  "agent": "ppo",
  "total_timesteps": 100000,
  "data": [[...market_data...]]
}
```

**Request Schema:**
```typescript
interface TrainStartRequest {
  agent: "ppo" | "sac" | "dqn";
  total_timesteps?: number;
  data?: number[][];  // Historical market data
}
```

**Response:**
```json
{
  "status": "started",
  "agent": "ppo",
  "total_timesteps": 100000,
  "estimated_time_minutes": 15
}
```

### Stop Training

```http
POST /api/v1/train/stop?XTransformPort=3007
```

**Response:**
```json
{
  "status": "stopped",
  "metrics": {
    "episodes_completed": 450,
    "mean_reward": 125.50,
    "sharpe_ratio": 1.5,
    "win_rate": 0.62
  }
}
```

### Training Status

```http
GET /api/v1/train/status?XTransformPort=3007
```

**Response:**
```json
{
  "status": "training",
  "agent": "ppo",
  "episode": 450,
  "total_episodes": 1000,
  "metrics": {
    "mean_reward": 125.50,
    "sharpe_ratio": 1.5,
    "win_rate": 0.62,
    "max_drawdown": 0.08,
    "total_pnl": 15234.56
  },
  "progress": 0.45
}
```

### Get Action Prediction

```http
POST /api/v1/predict?XTransformPort=3007
Content-Type: application/json

{
  "agent": "ppo",
  "observation": [[...state_features...]],
  "deterministic": true
}
```

**Request Schema:**
```typescript
interface PredictRequest {
  agent: "ppo" | "sac" | "dqn";
  observation: number[][];
  deterministic?: boolean;
}
```

**Response:**
```json
{
  "action": 1,
  "action_name": "BUY",
  "position_size": 0.15,
  "confidence": 0.78,
  "state": null
}
```

### List Agents

```http
GET /api/v1/agents?XTransformPort=3007
```

**Response:**
```json
{
  "agents": [
    {
      "name": "ppo",
      "is_trained": true,
      "metrics": {
        "mean_reward": 125.50,
        "sharpe_ratio": 1.5,
        "win_rate": 0.62
      }
    },
    {
      "name": "sac",
      "is_trained": true,
      "metrics": {
        "mean_reward": 118.30,
        "sharpe_ratio": 1.35,
        "win_rate": 0.58
      }
    },
    {
      "name": "dqn",
      "is_trained": true,
      "metrics": {
        "mean_reward": 95.20,
        "sharpe_ratio": 1.1,
        "win_rate": 0.55
      }
    }
  ]
}
```

### Agent Metrics

```http
GET /api/v1/agents/{agent_name}/metrics?XTransformPort=3007
```

---

## Agent Details

### PPO (Proximal Policy Optimization)

**Architecture:**
```
Observation (state)
    ↓
Feature Extractor (MLP)
    ↓
Actor Network (policy)
    ↓
Action Distribution
```

**Configuration:**
```yaml
ppo:
  learning_rate: 0.0003
  n_steps: 2048
  batch_size: 64
  n_epochs: 10
  gamma: 0.99
  gae_lambda: 0.95
  clip_range: 0.2
  ent_coef: 0.01
```

**Best For:**
- General trading strategies
- Stable, reliable learning
- Continuous position sizing

### SAC (Soft Actor-Critic)

**Architecture:**
```
Observation (state)
    ↓
┌─────────────┬─────────────┐
│   Actor     │   Critics   │
│   (Policy)  │   (Q1, Q2)  │
└─────────────┴─────────────┘
    ↓              ↓
Action        Value Estimate
```

**Configuration:**
```yaml
sac:
  learning_rate: 0.0003
  buffer_size: 1000000
  learning_starts: 10000
  batch_size: 256
  tau: 0.005
  gamma: 0.99
  train_freq: 1
  gradient_steps: 1
```

**Best For:**
- Complex market conditions
- Better exploration
- Off-policy learning

### DQN (Deep Q-Network)

**Architecture:**
```
Observation (state)
    ↓
Q-Network (MLP)
    ↓
Q-values for each action
    ↓
argmax → Action
```

**Configuration:**
```yaml
dqn:
  learning_rate: 0.0001
  buffer_size: 1000000
  learning_starts: 50000
  batch_size: 32
  gamma: 0.99
  train_freq: 4
  gradient_steps: 1
  target_update_interval: 10000
  exploration_fraction: 0.1
  exploration_final_eps: 0.05
```

**Best For:**
- Discrete actions (buy/sell/hold)
- Simple decision boundaries
- Fast inference

---

## Training Configuration

### Environment Setup

```python
from environments.trading_env import TradingEnv

env = TradingEnv(
    df=historical_data,
    initial_balance=10000,
    commission=0.001,  # 0.1%
    leverage=10,
    reward_function="sharpe",  # or "profit", "risk_adjusted"
    lookback_window=50,
    features=["close", "volume", "rsi", "macd"]
)
```

### Reward Functions

| Function | Formula | Description |
|----------|---------|-------------|
| `profit` | `PnL` | Simple profit/loss |
| `sharpe` | `returns / std(returns)` | Risk-adjusted returns |
| `sortino` | `returns / downside_std` | Downside risk adjusted |
| `risk_adjusted` | `PnL - λ * max_drawdown` | Penalty for drawdown |

### Training Parameters

```yaml
training:
  total_timesteps: 1000000
  eval_freq: 10000
  n_eval_episodes: 10
  callback:
    - checkpoint
    - tensorboard
    - early_stopping
  
  early_stopping:
    patience: 5
    metric: "sharpe_ratio"
    threshold: 2.0
```

---

## Configuration

### Environment Variables

```env
# Service Configuration
RL_SERVICE_PORT=3007

# CORS (Required for production)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Model Paths
PPO_MODEL_PATH=./models/ppo.zip
SAC_MODEL_PATH=./models/sac.zip
DQN_MODEL_PATH=./models/dqn.zip

# Training
TENSORBOARD_LOG=./logs/tensorboard
```

### Configuration File

```yaml
# config/config.yaml
agents:
  ppo:
    policy: "MlpPolicy"
    learning_rate: 0.0003
    n_steps: 2048
    batch_size: 64
    n_epochs: 10
    
  sac:
    policy: "MlpPolicy"
    learning_rate: 0.0003
    buffer_size: 1000000
    
  dqn:
    policy: "MlpPolicy"
    learning_rate: 0.0001
    buffer_size: 1000000

environment:
  initial_balance: 10000
  commission: 0.001
  leverage: 10
  lookback_window: 50
  
training:
  total_timesteps: 1000000
  eval_freq: 10000
```

---

## Agent Comparison

### Performance Metrics

| Metric | PPO | SAC | DQN |
|--------|-----|-----|-----|
| Mean Reward | 125.5 | 118.3 | 95.2 |
| Sharpe Ratio | 1.5 | 1.35 | 1.1 |
| Win Rate | 62% | 58% | 55% |
| Training Time | Medium | Long | Short |
| Stability | High | Medium | Low |

### Use Cases

| Scenario | Recommended Agent |
|----------|-------------------|
| General trading | PPO |
| Complex markets | SAC |
| Simple signals | DQN |
| Position sizing | PPO/SAC |
| Fast inference | DQN |
| Exploration needed | SAC |

---

## Example Code

### Python Client

```python
import requests
import numpy as np

class RLServiceClient:
    def __init__(self, base_url="http://localhost:3000"):
        self.base_url = base_url
    
    def start_training(self, agent: str, timesteps: int = 100000, data=None):
        """Start training an agent"""
        response = requests.post(
            f"{self.base_url}/api/v1/train/start?XTransformPort=3007",
            json={
                "agent": agent,
                "total_timesteps": timesteps,
                "data": data
            }
        )
        return response.json()
    
    def stop_training(self):
        """Stop current training"""
        response = requests.post(
            f"{self.base_url}/api/v1/train/stop?XTransformPort=3007"
        )
        return response.json()
    
    def get_training_status(self):
        """Get training status"""
        response = requests.get(
            f"{self.base_url}/api/v1/train/status?XTransformPort=3007"
        )
        return response.json()
    
    def predict(self, agent: str, observation: np.ndarray, deterministic: bool = True):
        """Get action prediction"""
        response = requests.post(
            f"{self.base_url}/api/v1/predict?XTransformPort=3007",
            json={
                "agent": agent,
                "observation": observation.tolist(),
                "deterministic": deterministic
            }
        )
        return response.json()
    
    def list_agents(self):
        """List available agents"""
        response = requests.get(
            f"{self.base_url}/api/v1/agents?XTransformPort=3007"
        )
        return response.json()

# Usage
client = RLServiceClient()

# Start training
training = client.start_training("ppo", timesteps=100000)
print(f"Training started: {training['status']}")

# Check status
status = client.get_training_status()
print(f"Progress: {status['progress'] * 100:.1f}%")
print(f"Mean reward: {status['metrics']['mean_reward']}")

# Get prediction
observation = np.random.randn(1, 50, 10)  # 1 sample, 50 lookback, 10 features
action = client.predict("ppo", observation)
print(f"Action: {action['action_name']}")
print(f"Position size: {action['position_size']}")
```

### JavaScript/TypeScript Client

```typescript
class RLServiceClient {
  private baseUrl: string;
  
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }
  
  async startTraining(agent: 'ppo' | 'sac' | 'dqn', timesteps = 100000, data?: number[][]) {
    const response = await fetch(
      `${this.baseUrl}/api/v1/train/start?XTransformPort=3007`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent,
          total_timesteps: timesteps,
          data
        })
      }
    );
    return response.json();
  }
  
  async getTrainingStatus() {
    const response = await fetch(
      `${this.baseUrl}/api/v1/train/status?XTransformPort=3007`
    );
    return response.json();
  }
  
  async predict(agent: 'ppo' | 'sac' | 'dqn', observation: number[][], deterministic = true) {
    const response = await fetch(
      `${this.baseUrl}/api/v1/predict?XTransformPort=3007`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent, observation, deterministic })
      }
    );
    return response.json();
  }
  
  async listAgents() {
    const response = await fetch(
      `${this.baseUrl}/api/v1/agents?XTransformPort=3007`
    );
    return response.json();
  }
}

// Usage
const client = new RLServiceClient();

// Get action from trained agent
const observation = [...]; // Market state features
const prediction = await client.predict('ppo', observation);
console.log(`Action: ${prediction.action_name}`);
console.log(`Confidence: ${prediction.confidence}`);
```

### React Hook Example

```typescript
import { useState, useCallback } from 'react';

export function useRLAgent(agent: 'ppo' | 'sac' | 'dqn') {
  const [trainingStatus, setTrainingStatus] = useState<TrainingStatus | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  
  const startTraining = useCallback(async (timesteps: number) => {
    setIsTraining(true);
    const result = await fetch('/api/v1/train/start?XTransformPort=3007', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agent, total_timesteps: timesteps })
    }).then(r => r.json());
    
    return result;
  }, [agent]);
  
  const predict = useCallback(async (observation: number[][]) => {
    const result = await fetch('/api/v1/predict?XTransformPort=3007', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agent, observation, deterministic: true })
    }).then(r => r.json());
    
    return result;
  }, [agent]);
  
  return { trainingStatus, isTraining, startTraining, predict };
}
```

---

## Custom Environment

### Trading Environment Implementation

```python
import gymnasium as gym
from gymnasium import spaces
import numpy as np

class TradingEnv(gym.Env):
    """Custom Trading Environment for RL agents"""
    
    metadata = {'render_modes': ['human']}
    
    def __init__(
        self,
        df,
        initial_balance=10000,
        commission=0.001,
        leverage=10,
        lookback_window=50
    ):
        super().__init__()
        
        self.df = df
        self.initial_balance = initial_balance
        self.commission = commission
        self.leverage = leverage
        self.lookback_window = lookback_window
        
        # Action space: position size (-1 to 1, negative = short)
        self.action_space = spaces.Box(
            low=-1,
            high=1,
            shape=(1,),
            dtype=np.float32
        )
        
        # Observation space: market features
        self.observation_space = spaces.Box(
            low=-np.inf,
            high=np.inf,
            shape=(lookback_window, 10),  # 10 features
            dtype=np.float32
        )
        
        self.reset()
    
    def reset(self, seed=None, options=None):
        super().reset(seed=seed)
        
        self.balance = self.initial_balance
        self.position = 0
        self.entry_price = 0
        self.current_step = self.lookback_window
        
        return self._get_observation(), {}
    
    def step(self, action):
        # Execute action
        position_size = action[0]
        
        # Calculate reward
        reward = self._calculate_reward(position_size)
        
        # Update step
        self.current_step += 1
        done = self.current_step >= len(self.df) - 1
        
        return self._get_observation(), reward, done, False, {}
    
    def _get_observation(self):
        return self.df.iloc[
            self.current_step - self.lookback_window:self.current_step
        ].values
    
    def _calculate_reward(self, action):
        # Implement reward function
        # e.g., Sharpe ratio, profit, risk-adjusted return
        pass
```

---

## Monitoring

### Training Metrics

| Metric | Description |
|--------|-------------|
| `mean_reward` | Average reward per episode |
| `sharpe_ratio` | Risk-adjusted returns |
| `win_rate` | Percentage of profitable trades |
| `max_drawdown` | Maximum portfolio drawdown |
| `total_pnl` | Total profit/loss |

### TensorBoard Integration

```bash
# Start TensorBoard
tensorboard --logdir ./logs/tensorboard

# Access at http://localhost:6006
```

### Health Check

```bash
curl http://localhost:3007/health
```

---

## Troubleshooting

### Training Not Improving

1. Check reward function design
2. Reduce learning rate
3. Increase exploration
4. Check data quality

### Slow Training

1. Reduce `n_steps` for PPO
2. Use GPU acceleration
3. Reduce batch size

### Unstable Learning

1. Increase `clip_range` for PPO
2. Use target network updates
3. Implement gradient clipping

---

## See Also

- [MICROSERVICES_API.md](MICROSERVICES_API.md) - Complete API reference
- [ml-service.md](ml-service.md) - ML Service integration
- [../ml/ML_RL_SERVICES.md](../ml/ML_RL_SERVICES.md) - ML/RL overview

---

*Last updated: March 2026 | CITARION Documentation Team*
