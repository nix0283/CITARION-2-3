# Additional UI Components Complete Documentation

This document provides comprehensive documentation for all additional UI components not covered in other component documentation files.

---

## Table of Contents

1. [AI Risk Components](#1-ai-risk-components)
2. [Backup Components](#2-backup-components)
3. [Chat Components](#3-chat-components)
4. [Exchange Components](#4-exchange-components)
5. [Filter Components](#5-filter-components)
6. [Help Components](#6-help-components)
7. [Indicator Components](#7-indicator-components)
8. [ML Pipeline Components](#8-ml-pipeline-components)
9. [Panel Components](#9-panel-components)
10. [Prediction Components](#10-prediction-components)
11. [Preview Components](#11-preview-components)
12. [Provider Components](#12-provider-components)
13. [RL Agents Components](#13-rl-agents-components)
14. [Share Components](#14-share-components)

---

## 1. AI Risk Components

### ai-risk-panel.tsx

**File Path:** `/src/components/ai-risk/ai-risk-panel.tsx`

**Purpose:**  
AI-powered risk management panel that provides real-time risk assessment, anomaly detection, position sizing recommendations, and hedging suggestions using machine learning algorithms.

**Props Interface:**

```typescript
// No external props - uses internal state management
// Component manages its own data fetching
```

**Internal Interfaces:**

```typescript
interface RiskMetrics {
  overall: number;                    // Overall risk score (0-100)
  components: {
    market: number;                   // Market risk component
    liquidity: number;                // Liquidity risk component
    volatility: number;               // Volatility risk component
    correlation: number;              // Correlation risk component
    tail: number;                     // Tail risk component
  };
  recommendation: 'reduce' | 'maintain' | 'increase';
}

interface Anomaly {
  type: string;                       // Anomaly type (volume, volatility, etc.)
  severity: string;                   // Severity level (low, medium, high, critical)
  score: number;                      // Anomaly confidence score (0-1)
  description: string;                // Human-readable description
}

interface PositionSizing {
  recommended: number;                // AI-recommended position size (%)
  maxAllowed: number;                 // Maximum allowed position size (%)
  current: number;                    // Current position size (%)
}
```

**Key Features:**

1. **Risk Score Overview**
   - Overall risk score with color-coded display
   - Progress bar visualization
   - Recommendation badges (reduce/maintain/increase)

2. **Risk Components Breakdown**
   - Market risk assessment
   - Liquidity risk monitoring
   - Volatility risk tracking
   - Correlation analysis
   - Tail risk evaluation

3. **Anomaly Detection**
   - Real-time market anomaly alerts
   - Severity-based icons and colors
   - Descriptive anomaly messages

4. **Position Sizing**
   - AI-recommended position sizes
   - Kelly Criterion integration
   - Half-Kelly safety measure

5. **Hedging Status**
   - Current hedge ratio
   - Hedging cost analysis
   - AI-generated hedging recommendations

**Usage Example:**

```tsx
import { AIRiskPanel } from '@/components/ai-risk/ai-risk-panel';

function RiskPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <AIRiskPanel />
      <OtherRiskComponents />
    </div>
  );
}
```

**API Endpoints:**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/risk/ai/metrics` | GET | Fetch current risk metrics |
| `/api/risk/ai/anomalies` | GET | Get detected anomalies |
| `/api/risk/ai/sizing` | GET | Get position sizing recommendations |

---

## 2. Backup Components

### backup-panel.tsx

**File Path:** `/src/components/backup/backup-panel.tsx`

**Purpose:**  
Comprehensive backup and recovery management panel with support for creating, scheduling, restoring, and managing database backups.

**Props Interface:**

```typescript
// No external props - component manages state internally
```

**Internal Interfaces:**

```typescript
interface BackupRecord {
  id: string;                         // Unique backup identifier
  name: string;                       // Backup name
  description?: string;               // Optional description
  type: string;                       // Backup type (full, incremental)
  status: string;                     // Status (pending, running, completed, failed, cancelled)
  fileName: string;                   // Backup file name
  filePath?: string;                  // File storage path
  fileSize: number;                   // File size in bytes
  checksum?: string;                  // File checksum for integrity
  compressed: boolean;                // Whether backup is compressed
  encrypted: boolean;                 // Whether backup is encrypted
  scope: string;                      // Backup scope (database, config, all)
  tables: string[];                   // Included tables
  recordCount: number;                // Number of records backed up
  retentionDays: number;              // Retention period
  warningCount: number;               // Number of warnings
  errorMessage?: string;              // Error message if failed
  triggeredBy: string;                // Trigger source (manual, scheduled)
  startedAt?: string;                 // Start timestamp
  completedAt?: string;               // Completion timestamp
  createdAt: string;                  // Creation timestamp
  metadata?: Record<string, unknown>; // Additional metadata
}

interface BackupSchedule {
  id: string;                         // Schedule identifier
  name: string;                       // Schedule name
  description?: string;               // Optional description
  isActive: boolean;                  // Whether schedule is active
  frequency: string;                  // Frequency (hourly, daily, weekly, monthly)
  hour: number;                       // Hour (0-23)
  minute: number;                     // Minute (0-59)
  dayOfWeek?: number;                 // Day of week (0-6) for weekly
  dayOfMonth?: number;                // Day of month (1-31) for monthly
  type: string;                       // Backup type
  scope: string;                      // Backup scope
  retentionDays: number;              // Retention period
  compress: boolean;                  // Compress backup
  encrypt: boolean;                   // Encrypt backup
  lastRunAt?: string;                 // Last run timestamp
  lastRunStatus?: string;             // Last run status
  nextRunAt?: string;                 // Next scheduled run
  totalRuns: number;                  // Total runs count
  successCount: number;               // Successful runs count
  failureCount: number;               // Failed runs count
  notifyChannels: string[];           // Notification channels
}

interface BackupStats {
  totalBackups: number;               // Total backup count
  totalSize: number;                  // Total size in bytes
  successfulBackups: number;          // Successful backup count
  failedBackups: number;              // Failed backup count
  lastBackup?: string;                // Last backup timestamp
  lastSuccessful?: string;            // Last successful backup timestamp
  avgBackupSize: number;              // Average backup size
  upcomingScheduled?: string;         // Next scheduled backup
}
```

**Key Features:**

1. **Backup Management**
   - Create manual backups (full/incremental)
   - View backup history with filtering
   - Delete old backups
   - Restore from backup

2. **Schedule Management**
   - Create automated backup schedules
   - Configure frequency (hourly/daily/weekly/monthly)
   - Pause/resume schedules
   - Trigger manual schedule runs

3. **Backup Settings**
   - Default retention configuration
   - Compression toggle
   - Encryption toggle (AES-256)
   - Notification preferences

4. **Stats Dashboard**
   - Total backups count
   - Total storage used
   - Success/failure rates
   - Last backup timestamp

**Usage Example:**

```tsx
import { BackupPanel } from '@/components/backup/backup-panel';

function SettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <BackupPanel />
    </div>
  );
}
```

**API Endpoints:**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/backup` | GET | List backups with pagination |
| `/api/backup` | POST | Create new backup |
| `/api/backup` | DELETE | Delete backup by ID |
| `/api/backup/restore` | POST | Restore from backup |
| `/api/backup/schedules` | GET | List all schedules |
| `/api/backup/schedules` | POST | Create new schedule |
| `/api/backup/schedules` | PATCH | Toggle/trigger schedule |

---

## 3. Chat Components

### chat-bot.tsx

**File Path:** `/src/components/chat/chat-bot.tsx`

**Purpose:**  
AI-powered chat bot interface (Oracle) for trading assistance, signal parsing, position management, and natural language interaction with the trading platform.

**Props Interface:**

```typescript
// No external props - component manages state internally
```

**Internal Interfaces:**

```typescript
interface Message {
  id: string;                         // Message identifier
  role: 'user' | 'bot' | 'system' | 'notification';
  content: string;                    // Message content
  timestamp: Date;                    // Message timestamp
  type?: string;                      // Message type (welcome, signal, error, notification)
  data?: Record<string, unknown>;     // Additional data (signal details, etc.)
}

interface ParsedSignal {
  symbol: string;                     // Trading pair (e.g., BTCUSDT)
  direction: 'LONG' | 'SHORT';        // Trade direction
  entryPrices: number[];              // Entry price levels
  takeProfits: { price: number; percentage: number }[];
  stopLoss?: number;                  // Stop loss price
  leverage: number;                   // Leverage multiplier
  marketType: 'SPOT' | 'FUTURES';     // Market type
  // Position data (if already executed)
  id?: string;                        // Position ID
  positionId?: string;                // Alternative position ID
  avgEntryPrice?: number;             // Average entry price
  totalAmount?: number;               // Total position amount
  unrealizedPnl?: number;            // Unrealized PnL
}
```

**Key Features:**

1. **Signal Parsing**
   - Cornix format signal parsing
   - Multi-entry signal support
   - Take profit and stop loss detection
   - Leverage extraction

2. **Position Management**
   - View position details
   - Close positions via chat
   - Edit SL/TP levels
   - Real-time PnL display

3. **Trading Commands**
   - `help` - Show available commands
   - `positions` - List open positions
   - `close all` - Close all positions
   - `balance` - Show account balance
   - `sync` - Sync positions with exchange

4. **Real-time Notifications**
   - SSE connection for live updates
   - Position status changes
   - Order execution alerts
   - Risk warnings

**Usage Example:**

```tsx
import { ChatBot } from '@/components/chat/chat-bot';

function TradingPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <ChartPanel />
      </div>
      <div>
        <ChatBot />
      </div>
    </div>
  );
}
```

**API Endpoints:**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat/parse-signal` | POST | Parse trading signal from text |
| `/api/demo/trade` | GET/POST | Demo trading operations |
| `/api/demo/close-all` | POST | Close all demo positions |
| `/api/trade/close` | POST | Close specific position |
| `/api/trade/update` | POST | Update position SL/TP |
| `/api/trade/position/[id]` | GET | Get position details |
| `/api/notifications` | SSE | Real-time notifications stream |

**Supported Signal Formats:**

```
# Example signals
BTCUSDT LONG Entry: 67000 TP: 68000 SL: 66000 Leverage: 10x

BTCUSDT
Direction: LONG
Entry: 67000-67200
TP1: 67500 (30%)
TP2: 68000 (40%)
TP3: 68500 (30%)
SL: 66500
Leverage: 5x
```

---

## 4. Exchange Components

### 4.1 bot-exchange-config.tsx

**File Path:** `/src/components/exchange/bot-exchange-config.tsx`

**Purpose:**  
Exchange configuration component for trading bots with support for multiple trading modes (PAPER, TESTNET, DEMO, LIVE) and API credential management.

**Props Interface:**

```typescript
interface BotExchangeConfigProps {
  botType: string;                    // Bot type identifier
  botId?: string;                     // Bot instance ID
  currentExchange?: ExchangeId;       // Currently selected exchange
  currentMode?: TradingMode;          // Current trading mode
  onConfigChange?: (config: {
    exchange: ExchangeId;
    mode: TradingMode;
    apiKey?: string;
    apiSecret?: string;
    passphrase?: string;
  }) => void;
}

type ExchangeId = 'binance' | 'bybit' | 'okx' | 'bitget' | 'bingx';
type TradingMode = 'PAPER' | 'TESTNET' | 'DEMO' | 'LIVE';
```

**Key Features:**

1. **Exchange Selection**
   - Support for 5+ exchanges
   - Exchange capabilities display (Testnet, Demo)
   - Fee structure preview

2. **Trading Mode Selection**
   - PAPER: Simulated trading
   - TESTNET: Exchange testnet
   - DEMO: Demo mode on live exchange
   - LIVE: Real trading (with warnings)

3. **API Credential Management**
   - Secure credential input
   - Passphrase support (OKX, Bitget, KuCoin)
   - Credential verification

4. **Connection Verification**
   - API key validation
   - Permission checking
   - Connection status display

**Usage Example:**

```tsx
import { BotExchangeConfig } from '@/components/exchange/bot-exchange-config';

function BotSetupWizard() {
  const handleConfigChange = (config) => {
    console.log('Exchange configured:', config);
  };

  return (
    <BotExchangeConfig
      botType="grid"
      currentExchange="binance"
      currentMode="PAPER"
      onConfigChange={handleConfigChange}
    />
  );
}
```

---

### 4.2 exchanges-page.tsx

**File Path:** `/src/components/exchanges/exchanges-page.tsx`

**Purpose:**  
Full-page component for managing exchange connections, viewing exchange details, and configuring API keys for multiple exchanges.

**Props Interface:**

```typescript
// No external props - component manages state internally
```

**Internal Interfaces:**

```typescript
interface ConnectedAccount {
  id: string;                         // Account identifier
  exchangeId: string;                 // Exchange identifier
  exchangeType: ExchangeType;         // Type (spot, futures, inverse)
  exchangeName: string;               // Display name
  accountType: 'DEMO' | 'REAL';       // Account type
  isActive: boolean;                  // Active status
  isTestnet: boolean;                 // Testnet flag
  apiKey?: string;                    // API key (masked)
  apiPassphrase?: string;             // Passphrase (masked)
  lastSyncAt?: string;                // Last sync timestamp
  lastError?: string;                 // Last error message
}

type ExchangeType = 'spot' | 'futures' | 'inverse';
```

**Key Features:**

1. **Exchange Grid View**
   - Spot/Futures/Inverse tabs
   - Connection status indicators
   - Fee information display
   - Feature badges (Hedge Mode, Trailing Stop, Testnet, Demo)

2. **Account Management**
   - Add new exchange connection
   - Toggle account active/inactive
   - Disconnect exchanges
   - Verify connections

3. **Settings Dialog**
   - API key management
   - Testnet toggle
   - Sync status display
   - Error handling

**Usage Example:**

```tsx
import { ExchangesPage } from '@/components/exchanges/exchanges-page';

function SettingsLayout() {
  return (
    <div className="container mx-auto py-6">
      <ExchangesPage />
    </div>
  );
}
```

---

### 4.3 exchange-selector.tsx

**File Path:** `/src/components/exchanges/exchange-selector.tsx`

**Purpose:**  
Compact exchange selector component for choosing exchanges and account types with connection status display.

**Props Interface:**

```typescript
interface ExchangeSelectorProps {
  selectedExchange?: string;          // Currently selected exchange ID
  selectedType?: ExchangeType;        // Selected exchange type
  onExchangeChange?: (exchangeId: string, type: ExchangeType) => void;
}
```

**Key Features:**

1. **Tabbed Exchange Selection**
   - Spot/Futures/Inverse tabs
   - Scrollable exchange list
   - Connection status indicators

2. **Exchange Info Display**
   - Maker/Taker fees
   - Feature availability
   - Connected account status

3. **Quick Actions**
   - Add new exchange
   - Open exchange settings

**Usage Example:**

```tsx
import { ExchangeSelector } from '@/components/exchanges/exchange-selector';

function TradingForm() {
  const [exchange, setExchange] = useState('binance');
  const [type, setType] = useState<ExchangeType>('futures');

  return (
    <ExchangeSelector
      selectedExchange={exchange}
      selectedType={type}
      onExchangeChange={(id, t) => {
        setExchange(id);
        setType(t);
      }}
    />
  );
}
```

---

### 4.4 connected-accounts.tsx

**File Path:** `/src/components/exchanges/connected-accounts.tsx`

**Purpose:**  
Component displaying all connected exchange accounts with status, sync information, and management controls.

**Props Interface:**

```typescript
// No external props - component fetches and manages accounts internally
```

**Key Features:**

1. **Account List**
   - Account type badges (DEMO/REAL)
   - Connection status icons
   - Last sync timestamp
   - Error message display

2. **Account Actions**
   - Toggle active/inactive
   - Open settings dialog
   - Disconnect account

3. **Summary Statistics**
   - Active accounts count
   - Real accounts count
   - Demo accounts count

**Usage Example:**

```tsx
import { ConnectedAccounts } from '@/components/exchanges/connected-accounts';

function ExchangeDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ExchangeSelector />
      <ConnectedAccounts />
    </div>
  );
}
```

---

## 5. Filter Components

### 5.1 ensemble-config.tsx

**File Path:** `/src/components/filters/ensemble-config.tsx`

**Purpose:**  
Configuration component for ensemble signal filtering with weight adjustments, threshold settings, and regime filtering options.

**Props Interface:**

```typescript
export interface EnsembleConfigProps {
  weights: EnsembleWeights;
  thresholds: EnsembleThresholds;
  optimizeWeights: boolean;
  regimeFilter: boolean;
  onWeightsChange?: (weights: EnsembleWeights) => void;
  onThresholdsChange?: (thresholds: EnsembleThresholds) => void;
  onOptimizeWeightsChange?: (enabled: boolean) => void;
  onRegimeFilterChange?: (enabled: boolean) => void;
}

export interface EnsembleWeights {
  superTrend: number;                 // SuperTrend weight (0-1)
  npc: number;                        // NPC weight (0-1)
  squeeze: number;                    // Squeeze weight (0-1)
}

export interface EnsembleThresholds {
  signalThreshold: number;            // Signal threshold (0-1)
  minConfidence: number;              // Minimum confidence (0-1)
}
```

**Key Features:**

1. **Strategy Weight Configuration**
   - Slider-based weight adjustment
   - Auto-normalization to sum=1
   - Visual weight distribution bar

2. **Threshold Settings**
   - Signal threshold input
   - Minimum confidence input

3. **Advanced Options**
   - Auto-optimization toggle
   - Regime filter toggle

**Usage Example:**

```tsx
import { EnsembleConfig } from '@/components/filters/ensemble-config';

function FilterSettings() {
  const [config, setConfig] = useState({
    weights: { superTrend: 0.35, npc: 0.35, squeeze: 0.3 },
    thresholds: { signalThreshold: 0.6, minConfidence: 0.5 },
    optimizeWeights: true,
    regimeFilter: true,
  });

  return (
    <EnsembleConfig
      {...config}
      onWeightsChange={(weights) => setConfig(prev => ({ ...prev, weights }))}
      onThresholdsChange={(thresholds) => setConfig(prev => ({ ...prev, thresholds }))}
      onOptimizeWeightsChange={(optimizeWeights) => setConfig(prev => ({ ...prev, optimizeWeights }))}
      onRegimeFilterChange={(regimeFilter) => setConfig(prev => ({ ...prev, regimeFilter }))}
    />
  );
}
```

---

### 5.2 filter-stats-card.tsx

**File Path:** `/src/components/filters/filter-stats-card.tsx`

**Purpose:**  
Statistics display card for signal filtering performance with trend indicators and recent signal history.

**Props Interface:**

```typescript
export interface FilterStatsCardProps {
  stats: FilterStats;
  compact?: boolean;                   // Compact mode flag
  className?: string;                 // Additional CSS classes
}

export interface FilterStats {
  totalSignals: number;               // Total signals processed
  winRate: number;                    // Win rate percentage
  avgConfidence: number;              // Average confidence
  recentSignals: SignalRecord[];      // Recent signal records
  performanceTrend: number[];         // Performance trend data
}

export interface SignalRecord {
  id: string;                         // Signal identifier
  symbol: string;                     // Trading pair
  direction: 'LONG' | 'SHORT';        // Trade direction
  confidence: number;                 // Signal confidence
  timestamp: string;                  // Signal timestamp
  result?: 'WIN' | 'LOSS';            // Trade result
}
```

**Key Features:**

1. **Main Statistics**
   - Total signals count
   - Win rate with color coding
   - Average confidence

2. **Performance Trend**
   - Sparkline visualization
   - Trend direction indicator

3. **Recent Signals**
   - Signal list with results
   - Direction badges
   - Confidence display

**Usage Example:**

```tsx
import { FilterStatsCard } from '@/components/filters/filter-stats-card';

function FilterDashboard() {
  const stats = {
    totalSignals: 1247,
    winRate: 68.5,
    avgConfidence: 72.3,
    recentSignals: [...],
    performanceTrend: [65, 67, 70, 68, 72],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FilterStatsCard stats={stats} />
      <FilterStatsCard stats={stats} compact />
    </div>
  );
}
```

---

### 5.3 lawrence-calibration.tsx

**File Path:** `/src/components/filters/lawrence-calibration.tsx`

**Purpose:**  
Machine learning model calibration interface for the Lawrence Classifier with training controls and accuracy metrics display.

**Props Interface:**

```typescript
export interface LawrenceCalibrationProps {
  filterType: 'ENHANCED' | 'BB' | 'DCA' | 'VISION';
  className?: string;
}

export interface CalibrationState {
  isTraining: boolean;                // Training in progress
  progress: number;                   // Training progress (0-100)
  samples: number;                    // Training samples count
  accuracy: {
    precision: number;                // Precision score (0-1)
    recall: number;                   // Recall score (0-1)
    f1: number;                       // F1 score (0-1)
  };
  lastTraining: string | null;        // Last training timestamp
  status: 'idle' | 'training' | 'completed' | 'error';
}
```

**Key Features:**

1. **Training Controls**
   - Start/retrain model
   - Progress display
   - Status badges

2. **Accuracy Metrics**
   - Precision display
   - Recall display
   - F1 Score display
   - Color-coded indicators

3. **Training Information**
   - Sample count
   - Last training time
   - Filter type indicator

**Usage Example:**

```tsx
import { LawrenceCalibration } from '@/components/filters/lawrence-calibration';

function MLFilterConfig() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <EnsembleConfig {...config} />
      <LawrenceCalibration filterType="ENHANCED" />
    </div>
  );
}
```

---

### 5.4 signal-indicator.tsx

**File Path:** `/src/components/filters/signal-indicator.tsx`

**Purpose:**  
Visual signal indicator component displaying current signal direction, confidence, strength, and market regime information.

**Props Interface:**

```typescript
export interface SignalIndicatorProps {
  signal: SignalState;
  showDetails?: boolean;              // Show detailed metrics
  className?: string;
}

export interface SignalState {
  direction: 'LONG' | 'SHORT' | 'NONE';  // Signal direction
  confidence: number;                 // Confidence percentage (0-100)
  strength: number;                   // Signal strength (0-100)
  disagreement: boolean;              // Model disagreement flag
  regime: 'LOW' | 'MEDIUM' | 'HIGH';  // Volatility regime
}
```

**Key Features:**

1. **Signal Display**
   - Direction icon with animation
   - Large direction text
   - Disagreement warning badge

2. **Confidence Meter**
   - Progress bar
   - Percentage display
   - Color-coded levels

3. **Signal Strength**
   - Strength bar
   - Percentage indicator

4. **Regime Indicator**
   - Volatility regime badge
   - Color-coded display

**Usage Example:**

```tsx
import { SignalIndicator } from '@/components/filters/signal-indicator';

function SignalPanel() {
  const signal = {
    direction: 'LONG',
    confidence: 78,
    strength: 85,
    disagreement: false,
    regime: 'MEDIUM',
  };

  return (
    <SignalIndicator signal={signal} showDetails />
  );
}
```

---

### 5.5 signal-filter-panel.tsx

**File Path:** `/src/components/filters/signal-filter-panel.tsx`

**Purpose:**  
Comprehensive signal filtering panel combining all filter components with tabs for different filter types and configuration options.

**Props Interface:**

```typescript
export interface SignalFilterPanelProps {
  filterType?: 'ENHANCED' | 'BB' | 'DCA' | 'VISION';
  symbol?: string;
  onConfigChange?: (config: FilterConfig) => void;
}

export interface FilterConfig {
  enabled: boolean;
  filterType: 'ENHANCED' | 'BB' | 'DCA' | 'VISION';
  weights: {
    superTrend: number;
    npc: number;
    squeeze: number;
  };
  thresholds: {
    signalThreshold: number;
    minConfidence: number;
  };
  optimizeWeights: boolean;
  regimeFilter: boolean;
}
```

**Key Features:**

1. **Filter Type Tabs**
   - Enhanced filter
   - BB (Bollinger Bands) filter
   - DCA filter
   - Vision filter

2. **Integrated Components**
   - SignalIndicator for current signal
   - FilterStatsCard for statistics
   - EnsembleConfig for weights
   - LawrenceCalibration for ML model

3. **Enable/Disable Toggle**
   - Global filter enable switch
   - Status indicator

**Usage Example:**

```tsx
import { SignalFilterPanel } from '@/components/filters/signal-filter-panel';

function TradingBotConfig() {
  const handleConfigChange = (config) => {
    console.log('Filter config:', config);
  };

  return (
    <SignalFilterPanel
      filterType="ENHANCED"
      symbol="BTCUSDT"
      onConfigChange={handleConfigChange}
    />
  );
}
```

---

## 6. Help Components

### help-panel.tsx

**File Path:** `/src/components/help/help-panel.tsx`

**Purpose:**  
Comprehensive help and documentation panel with FAQ, quick start guide, documentation links, and support contact information.

**Props Interface:**

```typescript
// No external props - component is self-contained
```

**Key Features:**

1. **FAQ Section**
   - Categorized questions
   - Search functionality
   - Accordion UI
   - Category icons

2. **Documentation Links**
   - Trading bots documentation
   - Analytics documentation
   - Risk management docs
   - Advanced features docs

3. **Quick Start Guide**
   - Step-by-step wizard
   - Tips for beginners
   - Recommendations

4. **Support Channels**
   - Telegram support
   - Email contact
   - Documentation links
   - Video tutorials

5. **System Status**
   - API Gateway status
   - Trading Engine status
   - Data Feeds status
   - Notifications status

**Usage Example:**

```tsx
import { HelpPanel } from '@/components/help/help-panel';

function HelpPage() {
  return (
    <div className="container mx-auto py-6">
      <HelpPanel />
    </div>
  );
}
```

---

## 7. Indicator Components

### indicators-panel.tsx

**File Path:** `/src/components/indicators/indicators-panel.tsx`

**Purpose:**  
Technical indicators configuration panel for chart overlays with support for adding, removing, and configuring multiple indicators.

**Props Interface:**

```typescript
interface IndicatorsPanelProps {
  onIndicatorsChange?: (indicators: IndicatorConfig[]) => void;
}

interface IndicatorConfig {
  id: string;                         // Unique identifier
  indicator: BuiltInIndicator;        // Indicator definition
  inputs: Record<string, number | string | boolean>;  // Current inputs
  visible: boolean;                   // Visibility toggle
}
```

**Key Features:**

1. **Indicator Categories**
   - Moving Averages (SMA, EMA, WMA)
   - Oscillators (RSI, MACD, Stochastic)
   - Volatility (ATR, Bollinger Bands)
   - Volume (OBV, Volume MA)
   - Trend (ADX, SuperTrend)

2. **Active Indicator Management**
   - Toggle visibility
   - Remove indicators
   - Reorder priority

3. **Indicator Configuration**
   - Parameter inputs
   - Type-specific options
   - Real-time preview

**Usage Example:**

```tsx
import { IndicatorsPanel } from '@/components/indicators/indicators-panel';

function ChartContainer() {
  const handleIndicatorsChange = (indicators) => {
    // Apply indicators to chart
    chart.applyIndicators(indicators);
  };

  return (
    <div className="flex gap-4">
      <Chart />
      <IndicatorsPanel onIndicatorsChange={handleIndicatorsChange} />
    </div>
  );
}
```

---

## 8. ML Pipeline Components

### ml-pipeline-panel.tsx

**File Path:** `/src/components/ml-pipeline/ml-pipeline-panel.tsx`

**Purpose:**  
Machine Learning pipeline management panel for AutoML infrastructure, data collection, feature engineering, and model registry.

**Props Interface:**

```typescript
// No external props - component manages ML pipeline state
```

**Internal Interfaces:**

```typescript
interface MLPipelineStatus {
  dataCollector: { cacheSize: number };
  featureEngineer: { enabledFeatures: string[] };
  autoML: { trialsCount: number; bestModel: string | null };
  modelRegistry: {
    totalModels: number;
    totalVersions: number;
    activeABTests: number;
  };
}
```

**Key Features:**

1. **Pipeline Status**
   - Data Collector status
   - AutoML Engine status
   - Model Registry status
   - Training progress

2. **Feature Management**
   - Enabled features list
   - Feature status badges
   - Feature categories

3. **Model Management**
   - Best model display
   - Version count
   - A/B test status

**Usage Example:**

```tsx
import { MLPipelinePanel } from '@/components/ml-pipeline/ml-pipeline-panel';

function MLPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <MLPipelinePanel />
      <ModelPerformancePanel />
    </div>
  );
}
```

---

## 9. Panel Components

### 9.1 ml-panel.tsx

**File Path:** `/src/components/panels/ml-panel.tsx`

**Purpose:**  
Machine Learning service panel for price predictions, signal classification, and market regime detection.

**Props Interface:**

```typescript
// No external props - component manages ML service interactions
```

**Internal Interfaces:**

```typescript
interface PricePrediction {
  predictions: number[][];            // Price predictions array
  confidence_intervals?: {
    std: number[][];                  // Standard deviation
    lower: number[][];                // Lower bound
    upper: number[][];                // Upper bound
  };
}

interface SignalPrediction {
  signals: Array<{
    signal: string;                   // BUY, SELL, HOLD
    confidence: number;
    probabilities: {
      HOLD: number;
      BUY: number;
      SELL: number;
    };
  }>;
}

interface RegimePrediction {
  regime: string;                     // BULL, BEAR, SIDEWAYS
  regime_id: number;
  confidence: number;
  probabilities: {
    BEAR: number;
    SIDEWAYS: number;
    BULL: number;
  };
  transition_matrix?: number[][];
}
```

**Key Features:**

1. **Price Prediction Tab**
   - Multi-horizon predictions (1m, 5m, 15m, 1h)
   - Confidence intervals
   - Prediction history

2. **Signal Classification Tab**
   - BUY/SELL/HOLD classification
   - Probability distribution
   - Confidence display

3. **Regime Detection Tab**
   - Market regime identification
   - Regime probabilities
   - Duration estimates

**Usage Example:**

```tsx
import { MLPanel } from '@/components/panels/ml-panel';

function AnalyticsDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <MLPanel />
      <RLPanel />
      <PredictionPanel />
    </div>
  );
}
```

---

### 9.2 rl-panel.tsx

**File Path:** `/src/components/panels/rl-panel.tsx`

**Purpose:**  
Reinforcement Learning service panel for agent training, model management, and action predictions.

**Props Interface:**

```typescript
// No external props - component manages RL service interactions
```

**Internal Interfaces:**

```typescript
interface TrainingStatus {
  status: 'idle' | 'training' | 'stopped';
  agent: string | null;
  episode: number;
  total_episodes: number;
  metrics: Record<string, number>;
}

interface AgentInfo {
  name: string;                       // PPO, SAC, DQN
  is_trained: boolean;
  metrics: {
    algorithm: string;
    learning_rate: number;
    is_trained: boolean;
  };
}

interface ActionPrediction {
  action: number;                     // 0=HOLD, 1=BUY, 2=SELL, 3=CLOSE
  state: number[] | null;
}
```

**Key Features:**

1. **Agent Selection**
   - PPO (Proximal Policy Optimization)
   - SAC (Soft Actor-Critic)
   - DQN (Deep Q-Network)

2. **Training Controls**
   - Start/Stop training
   - Progress tracking
   - Episode metrics

3. **Action Prediction**
   - Get predicted action
   - Action labels (HOLD, BUY, SELL, CLOSE)
   - State observation

**Usage Example:**

```tsx
import { RLPanel } from '@/components/panels/rl-panel';

function AIModelsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <MLPanel />
      <RLPanel />
    </div>
  );
}
```

---

### 9.3 institutional-panel.tsx

**File Path:** `/src/components/panels/institutional-panel.tsx`

**Purpose:**  
Institutional trading bots management panel for professional algorithmic strategies including Statistical Arbitrage, Market Making, Mean Reversion, and Trend Following.

**Props Interface:**

```typescript
// No external props - component manages institutional bots
```

**Internal Interfaces:**

```typescript
interface BotStatus {
  status: 'STOPPED' | 'STARTING' | 'RUNNING' | 'HALTED' | 'ERROR';
  stats: Record<string, number>;
}

interface BotSignal {
  id: string;
  timestamp: number;
  symbol: string;
  direction: 'LONG' | 'SHORT';
  confidence: number;
  expectedReturn?: number;
  zScore?: number;
  strength?: number;
}

interface BotInfo {
  code: string;                       // STA, MM, MR, TRF
  name: string;                       // Reed, Architect, Equilibrist, Kron
  strategy: string;
  icon: React.ReactNode;
  color: string;
  status: BotStatus;
  signals: BotSignal[];
}
```

**Supported Bots:**

| Code | Name | Strategy | Description |
|------|------|----------|-------------|
| STA | Reed | Statistical Arbitrage | Multi-factor statistical arbitrage using PCA and factor models |
| MM | Architect | Market Making | Provides liquidity with inventory-based pricing |
| MR | Equilibrist | Mean Reversion | Trades mean reversion using Bollinger Bands and Z-score |
| TRF | Kron | Trend Following | Systematic trend following with EMA, ADX, Supertrend |

**Key Features:**

1. **Bot Management**
   - Start/Stop controls
   - Status monitoring
   - Performance metrics

2. **Signal Display**
   - Recent signals list
   - Direction and confidence
   - Expected returns

3. **Statistics Grid**
   - Total trades
   - Win rate
   - PnL
   - Sharpe ratio

**Usage Example:**

```tsx
import { InstitutionalPanel } from '@/components/panels/institutional-panel';

function ProfessionalTrading() {
  return (
    <div className="container mx-auto py-6">
      <InstitutionalPanel />
    </div>
  );
}
```

---

### 9.4 risk-dashboard.tsx (panels folder)

**File Path:** `/src/components/panels/risk-dashboard.tsx`

**Purpose:**  
Real-time risk monitoring dashboard displaying portfolio exposure, drawdown tracking, position limits, and risk alerts.

**Props Interface:**

```typescript
// No external props - component fetches risk data from API
```

**Internal Interfaces:**

```typescript
interface RiskMetrics {
  totalExposure: number;              // Total portfolio exposure
  maxExposure: number;                // Maximum allowed exposure
  currentDrawdown: number;            // Current drawdown percentage
  maxDrawdown: number;                // Maximum allowed drawdown
  leverage: number;                   // Current leverage
  maxLeverage: number;                // Maximum allowed leverage
  openPositions: number;              // Open position count
  maxPositions: number;               // Maximum allowed positions
  dailyPnL: number;                   // Daily P&L
  dailyLossLimit: number;            // Daily loss limit
}

interface RiskAlert {
  id: string;
  type: 'warning' | 'critical';
  message: string;
  timestamp: Date;
}

interface PositionRisk {
  symbol: string;
  side: 'LONG' | 'SHORT';
  size: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  leverage: number;
  liquidationPrice: number | null;
}
```

**Key Features:**

1. **Metrics Grid**
   - Total Exposure with progress bar
   - Current Drawdown
   - Leverage indicator
   - Open Positions count

2. **Alerts Section**
   - Warning alerts
   - Critical alerts
   - Alert history

3. **Position Risk Table**
   - All open positions
   - PnL display
   - Leverage per position

**Usage Example:**

```tsx
import { RiskDashboard } from '@/components/panels/risk-dashboard';

function RiskManagementPage() {
  return (
    <div className="container mx-auto py-6">
      <RiskDashboard />
    </div>
  );
}
```

---

## 10. Prediction Components

### prediction-panel.tsx

**File Path:** `/src/components/prediction/prediction-panel.tsx`

**Purpose:**  
Market prediction panel displaying multi-horizon price forecasts, volatility analysis, and market regime classification.

**Props Interface:**

```typescript
// No external props - component manages prediction data
```

**Internal Interfaces:**

```typescript
interface PricePrediction {
  horizon: string;                    // 1h, 4h, 24h, 7d
  price: number;                      // Predicted price
  direction: 'up' | 'down' | 'neutral';
  confidence: number;                 // Prediction confidence
}

interface VolatilityForecast {
  current: number;                    // Current volatility
  regime: 'low' | 'normal' | 'high' | 'extreme';
  forecast: number;                   // Forecasted volatility
}

interface MarketRegime {
  regime: string;                     // trending_up, trending_down, ranging, volatile
  probability: number;
  duration: number;                   // Duration in candles
}
```

**Key Features:**

1. **Price Predictions Tab**
   - Multi-horizon forecasts
   - Direction indicators
   - Confidence levels
   - Consensus summary

2. **Volatility Tab**
   - Current volatility display
   - Regime classification
   - Forecast values
   - Annualized volatility

3. **Regime Tab**
   - Current regime display
   - Regime probabilities
   - Duration tracking

**Usage Example:**

```tsx
import { PredictionPanel } from '@/components/prediction/prediction-panel';

function MarketAnalysis() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <PredictionPanel />
      <VolatilityPanel />
      <SignalPanel />
    </div>
  );
}
```

---

## 11. Preview Components

### preview-panel.tsx

**File Path:** `/src/components/preview/preview-panel.tsx`

**Purpose:**  
Live preview and system monitoring panel with application preview, API status, WebSocket connections, and real-time logs.

**Props Interface:**

```typescript
// No external props - component provides system monitoring
```

**Key Features:**

1. **Application Preview Tab**
   - Device presets (Desktop, Tablet, Mobile)
   - Responsive preview frame
   - Refresh controls
   - Open in new tab

2. **API Status Tab**
   - Endpoint list
   - HTTP methods
   - Status badges
   - Latency display

3. **WebSocket Tab**
   - Exchange connections
   - Connection status
   - Pairs count
   - Latency monitoring

4. **Logs Tab**
   - Real-time log stream
   - Log level filtering
   - Auto-scroll toggle
   - Timestamp display

**Usage Example:**

```tsx
import { PreviewPanel } from '@/components/preview/preview-panel';

function DevToolsPage() {
  return (
    <div className="container mx-auto py-6">
      <PreviewPanel />
    </div>
  );
}
```

---

## 12. Provider Components

### price-provider.tsx

**File Path:** `/src/components/providers/price-provider.tsx`

**Purpose:**  
React Context provider for multi-exchange price WebSocket connections with automatic reconnection and price aggregation.

**Props Interface:**

```typescript
// Provider accepts children
interface PriceProviderProps {
  children: ReactNode;
}
```

**Context Interface:**

```typescript
interface PriceContextType {
  prices: Record<string, MarketPrice>;        // Current prices by symbol
  statuses: Record<PriceSource, ConnectionStatus>;  // Connection statuses
  activeSource: PriceSource;                  // Active price source
  setActiveSource: (source: PriceSource) => void;
  reconnect: (source?: PriceSource) => void;
  getPricesBySource: (source: PriceSource) => Record<string, MarketPrice>;
  lastUpdated: Date | null;
  sources: PriceSource[];
  exchangeNames: Record<PriceSource, string>;
  connectionStatus: ConnectionStatus;         // Aggregated status
  connectedCount: number;                     // Connected exchange count
}

type PriceSource = 'binance' | 'bybit' | 'okx' | 'bitget' | 'bingx';
type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'error';
```

**Key Features:**

1. **Multi-Exchange WebSocket**
   - Binance WebSocket
   - Bybit WebSocket
   - OKX WebSocket
   - Bitget WebSocket
   - BingX WebSocket

2. **Connection Management**
   - Auto-reconnection
   - Connection status tracking
   - Source switching

3. **Price Aggregation**
   - Real-time price updates
   - Price by source
   - Last update tracking

**Usage Example:**

```tsx
import { PriceProvider, usePriceContext, ConnectionStatusIndicator } from '@/components/providers/price-provider';

// Wrap your app
function App() {
  return (
    <PriceProvider>
      <TradingApp />
    </PriceProvider>
  );
}

// Use in components
function PriceDisplay() {
  const { prices, connectionStatus, connectedCount } = usePriceContext();
  
  return (
    <div>
      <ConnectionStatusIndicator showLabel showMultiExchange />
      <div>BTC: {prices['BTCUSDT']?.price}</div>
    </div>
  );
}
```

**Exported Components:**

| Component | Description |
|-----------|-------------|
| `PriceProvider` | Context provider component |
| `usePriceContext` | Hook to access price context |
| `ConnectionStatusIndicator` | Visual connection status |
| `PriceSourceSelector` | Exchange source selector |

---

## 13. RL Agents Components

### rl-agents-panel.tsx

**File Path:** `/src/components/rl-agents/rl-agents-panel.tsx`

**Purpose:**  
Reinforcement Learning agents management panel for DQN, PPO, and SAC agents with training controls and performance metrics.

**Props Interface:**

```typescript
// No external props - component manages RL agents state
```

**Internal Interfaces:**

```typescript
interface RLAgent {
  id: string;
  name: string;
  type: 'DQN' | 'PPO' | 'SAC';
  status: 'idle' | 'training' | 'trading' | 'paused';
  metrics: {
    totalReward: number;
    winRate: number;
    sharpeRatio: number;
    trades: number;
    pnl: number;
  };
  training: {
    episode: number;
    totalEpisodes: number;
    epsilon: number;                   // Exploration rate
  };
}
```

**Key Features:**

1. **Agent Management**
   - Toggle agent status
   - Training controls
   - Performance tracking

2. **Performance Metrics**
   - Win rate
   - Sharpe ratio
   - Total PnL
   - Trade count

3. **Training Progress**
   - Episode tracking
   - Progress bar
   - Epsilon decay

4. **Summary Statistics**
   - Best agent
   - Total trades
   - Combined PnL

**Usage Example:**

```tsx
import { RLAgentsPanel } from '@/components/rl-agents/rl-agents-panel';

function AIModelsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <RLAgentsPanel />
      <MLPipelinePanel />
    </div>
  );
}
```

---

## 14. Share Components

### 14.1 share-card.tsx

**File Path:** `/src/components/share/share-card.tsx`

**Purpose:**  
Social sharing card generator for trade results with support for PnL cards, equity curves, and statistics cards with optional balance display.

**Props Interface:**

```typescript
interface ShareCardProps {
  open: boolean;                      // Dialog open state
  onOpenChange: (open: boolean) => void;
  tradeData?: {
    symbol: string;
    direction: 'LONG' | 'SHORT';
    entryPrice: number;
    exitPrice: number;
    pnl: number;
    pnlPercent: number;
    leverage: number;
    amount: number;
    exchange: string;
  };
  statsData?: {
    totalTrades: number;
    winningTrades: number;
    losingTrades: number;
    winRate: number;
    totalPnL: number;
    avgProfit: number;
    avgLoss: number;
    bestTrade: number;
    worstTrade: number;
    period: string;
    balance?: number;
    initialBalance?: number;
  };
  equityData?: {
    balanceHistory: { date: string; balance: number }[];
    totalPnL: number;
    totalPnLPercent: number;
    period: string;
    trades: number;
    winRate: number;
    initialBalance?: number;
  };
}
```

**Card Types:**

| Tab | Dimensions | Description |
|-----|------------|-------------|
| PnL | 750x420 | Single trade result card |
| Equity | 1080x720 | Balance curve with stats |
| Stats | 1080x1080 | Full statistics card |

**Key Features:**

1. **PnL Card**
   - Trade symbol and direction
   - Entry/Exit prices
   - PnL with percentage
   - Leverage badge
   - Exchange badge

2. **Equity Curve Card**
   - Balance history chart
   - Total PnL display
   - Win rate
   - Period indicator
   - Optional balance toggle

3. **Stats Card**
   - Win rate circle
   - Win/Loss/Total counts
   - Average profit/loss
   - Best/Worst trades
   - Optional balance section

4. **Export Options**
   - Download as PNG
   - Copy to clipboard
   - Native share (mobile)

**Usage Example:**

```tsx
import { ShareCard } from '@/components/share/share-card';
import { useState } from 'react';

function TradeResult({ trade }) {
  const [showShare, setShowShare] = useState(false);
  
  return (
    <>
      <Button onClick={() => setShowShare(true)}>
        Share Result
      </Button>
      <ShareCard
        open={showShare}
        onOpenChange={setShowShare}
        tradeData={{
          symbol: trade.symbol,
          direction: trade.direction,
          entryPrice: trade.entryPrice,
          exitPrice: trade.exitPrice,
          pnl: trade.pnl,
          pnlPercent: trade.pnlPercent,
          leverage: trade.leverage,
          amount: trade.amount,
          exchange: trade.exchange,
        }}
      />
    </>
  );
}
```

---

### 14.2 share-stats-card.tsx

**File Path:** `/src/components/share/share-stats-card.tsx`

**Purpose:**  
Statistics sharing card generator with options for equity curve, win rate display, and full statistics with balance.

**Props Interface:**

```typescript
interface ShareStatsCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  statsData?: {
    totalTrades: number;
    winningTrades: number;
    losingTrades: number;
    winRate: number;
    totalPnL: number;
    avgProfit: number;
    avgLoss: number;
    bestTrade: number;
    worstTrade: number;
    period: string;
    balance?: number;
    initialBalance?: number;
  };
  equityData?: {
    balanceHistory: { date: string; balance: number }[];
    totalPnL: number;
    totalPnLPercent: number;
    period: string;
    trades: number;
    winRate: number;
    initialBalance?: number;
  };
}
```

**Card Types:**

| Tab | Description |
|-----|-------------|
| Equity | Balance curve with optional balance |
| Stats | Win rate statistics without balance |
| Stats Full | Full statistics with balance |

**Key Features:**

1. **Equity Tab**
   - Balance history visualization
   - Optional balance toggle
   - Performance metrics

2. **Win Rate Tab**
   - Win rate circle
   - Win/Loss counts
   - No balance displayed

3. **Full Stats Tab**
   - Complete statistics
   - Account balance
   - Balance change indicator

**Usage Example:**

```tsx
import { ShareStatsCard } from '@/components/share/share-stats-card';
import { useState } from 'react';

function PortfolioSummary({ stats, equity }) {
  const [showShare, setShowShare] = useState(false);
  
  return (
    <>
      <Button onClick={() => setShowShare(true)}>
        Share Statistics
      </Button>
      <ShareStatsCard
        open={showShare}
        onOpenChange={setShowShare}
        statsData={stats}
        equityData={equity}
      />
    </>
  );
}
```

---

## Summary

This documentation covers **26 UI components** across **14 categories**:

| Category | Components | Purpose |
|----------|------------|---------|
| AI Risk | 1 | ML-powered risk management |
| Backup | 1 | Database backup & recovery |
| Chat | 1 | AI trading assistant |
| Exchange | 4 | Exchange connection management |
| Filter | 5 | Signal filtering & ML calibration |
| Help | 1 | Documentation & support |
| Indicators | 1 | Technical indicators configuration |
| ML Pipeline | 1 | AutoML infrastructure |
| Panels | 4 | ML, RL, Institutional, Risk dashboards |
| Prediction | 1 | Market predictions |
| Preview | 1 | System monitoring |
| Provider | 1 | Price WebSocket context |
| RL Agents | 1 | Reinforcement learning agents |
| Share | 2 | Social sharing cards |

All components follow the project's design system with:
- TypeScript interfaces
- Tailwind CSS styling
- Radix UI primitives
- Consistent prop patterns
- Error handling
- Loading states
