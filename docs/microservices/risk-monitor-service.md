# Risk Monitor Service

**Version:** 2.0 | **Port:** 3004 | **Last Updated:** March 2026

---

## 📋 Overview

The Risk Monitor Service provides real-time risk metrics monitoring and kill switch control. It continuously calculates risk scores, monitors drawdown levels, and can automatically trigger protective measures when risk thresholds are exceeded.

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   RISK MONITOR SERVICE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                 Risk Calculator                          │   │
│  │         (Score, VaR, Drawdown, Exposure)                 │   │
│  └─────────────────────────┬───────────────────────────────┘   │
│                            │                                    │
│         ┌──────────────────┼──────────────────┐                │
│         ▼                  ▼                  ▼                │
│  ┌────────────┐    ┌────────────┐    ┌────────────┐           │
│  │   Risk     │    │  Kill      │    │   Alert    │           │
│  │  Scoring   │    │  Switch    │    │  System    │           │
│  └────────────┘    └────────────┘    └────────────┘           │
│                            │                                    │
│                            ▼                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Socket.IO Server (Port 3004)                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

- **Real-Time Risk Metrics** - Continuous risk score calculation
- **VaR Monitoring** - Value at Risk calculations
- **Drawdown Alerts** - Automatic drawdown threshold monitoring
- **Kill Switch Management** - Arm, trigger, and recover kill switch
- **Volatility Regime Detection** - Low, normal, high, extreme regimes
- **Bot Summary Tracking** - Track running/stopped bot counts
- **Alert System** - Risk alerts with acknowledgment

---

## 🔌 REST API

### Health Check

```http
GET /health?XTransformPort=3004
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": 1700000000000,
  "uptime": 3600,
  "riskLevel": "low"
}
```

### Get Risk Metrics

```http
GET /metrics?XTransformPort=3004
```

**Response:**
```json
{
  "riskScore": 45,
  "riskLevel": "moderate",
  "totalExposure": 50000,
  "drawdown": 5.2,
  "var": -2500,
  "cvar": -3200,
  "positions": 8,
  "timestamp": 1700000000000
}
```

### Arm Kill Switch

```http
POST /killswitch/arm?XTransformPort=3004
Content-Type: application/json

{
  "triggerType": "PERCENT_BELOW_HIGHEST",
  "threshold": 0.15
}
```

**Response:**
```json
{
  "success": true,
  "killSwitch": {
    "isArmed": true,
    "isTriggered": false,
    "triggerType": "PERCENT_BELOW_HIGHEST",
    "threshold": 0.15
  }
}
```

### Trigger Kill Switch

```http
POST /killswitch/trigger?XTransformPort=3004
Content-Type: application/json

{
  "reason": "Manual trigger"
}
```

**Response:**
```json
{
  "success": true,
  "botsStopped": 3,
  "reason": "Manual trigger",
  "timestamp": "2026-03-15T10:30:00.000Z"
}
```

---

## 🔄 WebSocket Events

### Connection

```javascript
import { io } from 'socket.io-client';

const ws = io('http://localhost:3000', {
  path: '/socket.io',
  query: { XTransformPort: '3004' }
});
```

### Client → Server Events

#### Get Risk State

```javascript
ws.emit('get_risk_state');
```

#### Get Kill Switch State

```javascript
ws.emit('get_killswitch');
```

#### Trigger Kill Switch

```javascript
ws.emit('trigger_killswitch', { 
  reason: 'Manual trigger' 
});
```

#### Arm Kill Switch

```javascript
ws.emit('arm_killswitch');
```

#### Disarm Kill Switch

```javascript
ws.emit('disarm_killswitch');
```

#### Recover Kill Switch

```javascript
ws.emit('recover_killswitch');
```

#### Acknowledge Alert

```javascript
ws.emit('acknowledge_alert', 'alert-123');
```

#### Update Risk

```javascript
ws.emit('update_risk', {
  riskScore: 50,
  drawdown: 8.5
});
```

#### Subscribe/Unsubscribe

```javascript
ws.emit('subscribe');
ws.emit('unsubscribe');
```

### Server → Client Events

#### Initial Data (on connection)

```javascript
ws.on('initial_data', (data) => {
  // data = { riskState, killSwitch, botSummary, alerts }
});
```

#### Risk Update

```javascript
ws.on('risk_update', (risk) => {
  console.log('Risk Score:', risk.riskScore);
  console.log('Risk Level:', risk.riskLevel);
  // risk = {
  //   riskScore: 45,
  //   riskLevel: 'medium',
  //   totalExposure: 50000,
  //   totalPnL: 1250,
  //   drawdown: 2.5,
  //   varValue: 2847,
  //   volatilityRegime: 'normal',
  //   timestamp: Date
  // }
});
```

#### Kill Switch Update

```javascript
ws.on('killswitch_update', (killSwitch) => {
  // killSwitch = {
  //   isArmed: true,
  //   isTriggered: false,
  //   triggerReason: undefined,
  //   botsStopped: 0,
  //   lastTriggeredAt: undefined
  // }
});
```

#### Kill Switch Triggered

```javascript
ws.on('killswitch_triggered', (data) => {
  // data = { reason, botsStopped, timestamp }
  console.log('KILL SWITCH TRIGGERED:', data.reason);
});
```

#### Drawdown Alert

```javascript
ws.on('drawdown_alert', (alert) => {
  // alert = { level, current, threshold, timestamp }
});
```

#### Risk Alert

```javascript
ws.on('risk_alert', (alert) => {
  // alert = { id, type, message, data, timestamp, acknowledged }
  // type: 'warning' | 'critical' | 'info'
});
```

#### Bot Summary Update

```javascript
ws.on('bot_summary_update', (summary) => {
  // summary = { total, running, stopped, byType }
});
```

#### Alert Acknowledged

```javascript
ws.on('alert_acknowledged', (alert) => {
  // alert = { id, type, message, acknowledged: true }
});
```

---

## 📊 Risk Score Calculation

### Risk Level Thresholds

| Risk Score | Risk Level | Color |
|------------|------------|-------|
| 0-29 | Low | 🟢 Green |
| 30-49 | Medium | 🟡 Yellow |
| 50-69 | High | 🟠 Orange |
| 70-100 | Critical | 🔴 Red |

### Risk Factors

The risk score is calculated based on multiple factors:

```typescript
function calculateRiskScore(factors: {
  drawdown: number;           // Current drawdown percentage
  exposureRatio: number;      // Total exposure / account balance
  volatilityRegime: string;   // Volatility level
  openPositions: number;      // Number of open positions
  lossStreak: number;         // Consecutive losing trades
}): number {
  let score = 0;
  
  // Drawdown contribution (0-40 points)
  score += Math.min(40, factors.drawdown * 2.67);
  
  // Exposure contribution (0-25 points)
  score += Math.min(25, factors.exposureRatio * 25);
  
  // Volatility contribution (0-20 points)
  const volatilityScores = {
    low: 5,
    normal: 10,
    high: 15,
    extreme: 20
  };
  score += volatilityScores[factors.volatilityRegime] || 10;
  
  // Position count contribution (0-10 points)
  score += Math.min(10, factors.openPositions * 1.25);
  
  // Loss streak contribution (0-5 points)
  score += Math.min(5, factors.lossStreak);
  
  return Math.min(100, Math.round(score));
}
```

### Volatility Regimes

| Regime | Description | Risk Adjustment |
|--------|-------------|-----------------|
| Low | Calm market conditions | +5 points |
| Normal | Typical market volatility | +10 points |
| High | Elevated volatility | +15 points |
| Extreme | Crisis-level volatility | +20 points |

---

## ⚡ Kill Switch Trigger Types

### Auto-Trigger Conditions

The kill switch automatically triggers when any of these conditions are met:

| Condition | Threshold | Description |
|-----------|-----------|-------------|
| Drawdown | ≥ 15% | Portfolio drawdown exceeds 15% |
| Risk Score | ≥ 80 | Risk score reaches critical level |
| Volatility + Risk | Extreme + ≥ 50 | Extreme volatility with elevated risk |

### Kill Switch States

```
                    ┌──────────────┐
                    │   DISARMED   │
                    │  (No auto-   │
                    │   trigger)   │
                    └──────┬───────┘
                           │ arm
                           ▼
                    ┌──────────────┐
                    │    ARMED     │
              ┌────▶│  (Auto-trigger│────┐
              │     │   enabled)   │    │ trigger
              │     └──────────────┘    │
              │                         ▼
        recover                  ┌──────────────┐
              │                   │  TRIGGERED   │
              │                   │  (All bots   │
              └───────────────────│   stopped)   │
                                  └──────────────┘
```

### Kill Switch Interface

```typescript
interface KillSwitchState {
  isArmed: boolean;
  isTriggered: boolean;
  triggerReason?: string;
  botsStopped: number;
  lastTriggeredAt?: Date;
}
```

---

## ⚙️ Configuration

### Environment Variables

```env
# Environment
NODE_ENV=development

# CORS - Comma-separated list of allowed origins
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://app.citarion.com

# Main API URL
API_URL=http://localhost:3000

# Risk update interval (ms)
RISK_UPDATE_INTERVAL=10000

# Auto-trigger thresholds
KILLSWITCH_DRAWDOWN_THRESHOLD=15
KILLSWITCH_RISK_SCORE_THRESHOLD=80
```

### Risk State Interface

```typescript
interface RiskState {
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  totalExposure: number;
  totalPnL: number;
  drawdown: number;
  varValue: number;
  volatilityRegime: 'low' | 'normal' | 'high' | 'extreme';
  timestamp: Date;
}
```

### Alert Interface

```typescript
interface RiskAlert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  message: string;
  data?: any;
  timestamp: Date;
  acknowledged: boolean;
}
```

---

## 📝 Examples

### React Hook for Risk Monitoring

```typescript
import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface RiskState {
  riskScore: number;
  riskLevel: string;
  totalExposure: number;
  drawdown: number;
  varValue: number;
}

interface KillSwitchState {
  isArmed: boolean;
  isTriggered: boolean;
  triggerReason?: string;
}

export function useRiskMonitor() {
  const [riskState, setRiskState] = useState<RiskState | null>(null);
  const [killSwitch, setKillSwitch] = useState<KillSwitchState | null>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [connected, setConnected] = useState(false);
  const [ws, setWs] = useState<Socket | null>(null);

  useEffect(() => {
    const socket: Socket = io('/', {
      path: '/socket.io',
      query: { XTransformPort: '3004' }
    });

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    socket.on('initial_data', (data) => {
      setRiskState(data.riskState);
      setKillSwitch(data.killSwitch);
      setAlerts(data.alerts);
    });

    socket.on('risk_update', setRiskState);
    socket.on('killswitch_update', setKillSwitch);

    socket.on('risk_alert', (alert) => {
      setAlerts(prev => [alert, ...prev].slice(0, 100));
    });

    socket.on('killswitch_triggered', (data) => {
      console.error('KILL SWITCH TRIGGERED:', data.reason);
    });

    setWs(socket);

    return () => socket.disconnect();
  }, []);

  const triggerKillSwitch = useCallback((reason: string) => {
    ws?.emit('trigger_killswitch', { reason });
  }, [ws]);

  const armKillSwitch = useCallback(() => {
    ws?.emit('arm_killswitch');
  }, [ws]);

  const disarmKillSwitch = useCallback(() => {
    ws?.emit('disarm_killswitch');
  }, [ws]);

  const recoverKillSwitch = useCallback(() => {
    ws?.emit('recover_killswitch');
  }, [ws]);

  const acknowledgeAlert = useCallback((alertId: string) => {
    ws?.emit('acknowledge_alert', alertId);
  }, [ws]);

  return {
    riskState,
    killSwitch,
    alerts,
    connected,
    triggerKillSwitch,
    armKillSwitch,
    disarmKillSwitch,
    recoverKillSwitch,
    acknowledgeAlert
  };
}
```

### Risk Dashboard Component

```typescript
import { useRiskMonitor } from '@/hooks/use-risk-monitor';

export function RiskDashboard() {
  const {
    riskState,
    killSwitch,
    alerts,
    connected,
    triggerKillSwitch,
    armKillSwitch,
    disarmKillSwitch,
    recoverKillSwitch
  } = useRiskMonitor();

  if (!riskState) return <div>Loading...</div>;

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-orange-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Score */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Risk Overview</h2>
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-4xl font-bold ${getRiskColor(riskState.riskLevel)}`}>
              {riskState.riskScore}
            </div>
            <div className="text-gray-500 capitalize">{riskState.riskLevel} Risk</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Volatility</div>
            <div className="font-medium capitalize">{riskState.volatilityRegime}</div>
          </div>
        </div>
        
        {/* Risk Bar */}
        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              riskState.riskScore >= 70 ? 'bg-red-500' :
              riskState.riskScore >= 50 ? 'bg-orange-500' :
              riskState.riskScore >= 30 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${riskState.riskScore}%` }}
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-sm text-gray-500">Exposure</div>
          <div className="text-xl font-semibold">${riskState.totalExposure.toLocaleString()}</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-sm text-gray-500">Drawdown</div>
          <div className={`text-xl font-semibold ${riskState.drawdown > 10 ? 'text-red-500' : ''}`}>
            {riskState.drawdown.toFixed(2)}%
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-sm text-gray-500">VaR</div>
          <div className="text-xl font-semibold">${riskState.varValue.toLocaleString()}</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-sm text-gray-500">PnL</div>
          <div className={`text-xl font-semibold ${riskState.totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ${riskState.totalPnL.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Kill Switch Control */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Kill Switch</h2>
        
        {killSwitch?.isTriggered ? (
          <div className="p-4 bg-red-100 border border-red-300 rounded-lg">
            <div className="font-semibold text-red-700">KILL SWITCH TRIGGERED</div>
            <div className="text-sm text-red-600">{killSwitch.triggerReason}</div>
            <button
              onClick={recoverKillSwitch}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Recover
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className={`px-3 py-1 rounded ${killSwitch?.isArmed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
              {killSwitch?.isArmed ? 'Armed' : 'Disarmed'}
            </div>
            
            <div className="flex gap-2">
              {!killSwitch?.isArmed ? (
                <button onClick={armKillSwitch} className="px-4 py-2 bg-green-500 text-white rounded">
                  Arm
                </button>
              ) : (
                <button onClick={disarmKillSwitch} className="px-4 py-2 bg-gray-500 text-white rounded">
                  Disarm
                </button>
              )}
              <button
                onClick={() => triggerKillSwitch('Manual trigger')}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Trigger Now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Alerts */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded text-sm ${
                alert.type === 'critical' ? 'bg-red-100 text-red-700' :
                alert.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'
              }`}
            >
              <div className="font-medium">{alert.message}</div>
              <div className="text-xs opacity-75">
                {new Date(alert.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Vanilla JavaScript Example

```javascript
const ws = io('/?XTransformPort=3004');

ws.on('connect', () => {
  console.log('Connected to Risk Monitor');
});

ws.on('initial_data', (data) => {
  updateRiskUI(data.riskState);
  updateKillSwitchUI(data.killSwitch);
});

ws.on('risk_update', (risk) => {
  updateRiskUI(risk);
  
  // Show warning if high risk
  if (risk.riskLevel === 'high' || risk.riskLevel === 'critical') {
    showRiskWarning(risk);
  }
});

ws.on('killswitch_triggered', (data) => {
  alert(`KILL SWITCH TRIGGERED: ${data.reason}\n${data.botsStopped} bots stopped.`);
});

ws.on('risk_alert', (alert) => {
  addAlertToUI(alert);
});

// Control functions
function triggerKillSwitch(reason) {
  ws.emit('trigger_killswitch', { reason: reason || 'Manual trigger' });
}

function armKillSwitch() {
  ws.emit('arm_killswitch');
}

function disarmKillSwitch() {
  ws.emit('disarm_killswitch');
}

function recoverKillSwitch() {
  ws.emit('recover_killswitch');
}
```

---

## ❌ Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "RISK_THRESHOLD_EXCEEDED",
    "message": "Risk threshold exceeded, kill switch triggered",
    "details": { "riskScore": 85, "threshold": 80 }
  }
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| `INVALID_THRESHOLD` | Invalid threshold value |
| `KILLSWITCH_ALREADY_ARMED` | Kill switch is already armed |
| `KILLSWITCH_NOT_ARMED` | Kill switch must be armed first |
| `KILLSWITCH_NOT_TRIGGERED` | Cannot recover - not triggered |
| `UNAUTHORIZED` | Missing or invalid authentication |
| `RATE_LIMITED` | Rate limit exceeded |

### WebSocket Error Handling

```javascript
ws.on('connect_error', (error) => {
  console.error('Risk Monitor connection failed:', error.message);
});

ws.on('risk_alert', (alert) => {
  if (alert.type === 'critical') {
    // Handle critical alerts
    playAlertSound();
    showCriticalAlertModal(alert);
  }
});
```

### Rate Limits

| Service | Limit | Window |
|---------|-------|--------|
| Risk Monitor | 50 requests | per second |

---

## 📚 Related Documentation

- [README.md](./README.md) - Microservices overview
- [MICROSERVICES_API.md](./MICROSERVICES_API.md) - Complete API reference
- [RISK_MODELS_DOCUMENTATION.md](../business-logic/RISK_MODELS_DOCUMENTATION.md) - Risk models
- [bot-monitor-service.md](./bot-monitor-service.md) - Bot monitor service
- [trade-events-service.md](./trade-events-service.md) - Trade events service

---

*Last updated: March 2026 | CITARION Documentation Team*
