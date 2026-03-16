# React Hooks Documentation

This document provides comprehensive documentation for all custom React hooks in the CITARION trading platform.

## Table of Contents

1. [Overview](#overview)
2. [Exchange Hooks](#exchange-hooks)
   - [useBotExchange](#usebotexchange)
3. [Bot Management Hooks](#bot-management-hooks)
   - [useBotFilter](#usebotfilter)
   - [useInstitutionalBots](#useinstitutionalbots)
4. [ML Hooks](#ml-hooks)
   - [useMLWebSocket](#usemlwebsocket)
   - [useMLClassification](#usemlclassification)
5. [Market Data Hooks](#market-data-hooks)
   - [useRealtimeOhlcv](#userealtimeohlcv)
   - [useRealtimePrices](#userealtimeprices)
6. [Trading Hooks](#trading-hooks)
   - [useTradeEvents](#usetradeevents)
   - [useTradingHotkeys](#usetradinghotkeys)
7. [Monitor Hooks](#monitor-hooks)
   - [useBotMonitor](#usebotmonitor)
   - [useRiskMonitor](#useriskmonitor)
8. [UI Hooks](#ui-hooks)
   - [useMobile](#usemobile)
   - [useToast](#usetoast)
9. [Communication Hooks](#communication-hooks)
   - [useChatWebSocket](#usechatwebsocket)
10. [Usage Examples](#usage-examples)

---

## Overview

CITARION provides 14 custom React hooks organized into the following categories:

| Category | Hooks | Purpose |
|----------|-------|---------|
| Exchange | `useBotExchange` | Exchange connection and trading operations |
| Bot Management | `useBotFilter`, `useInstitutionalBots` | Bot CRUD and signal filtering |
| ML | `useMLWebSocket`, `useMLClassification` | Machine learning predictions |
| Market Data | `useRealtimeOhlcv`, `useRealtimePrices` | Real-time market data |
| Trading | `useTradeEvents`, `useTradingHotkeys` | Trade execution and hotkeys |
| Monitor | `useBotMonitor`, `useRiskMonitor` | Bot and risk monitoring |
| UI | `useMobile`, `useToast` | UI utilities |
| Communication | `useChatWebSocket` | Chat and signal communication |

All hooks follow React best practices with:
- TypeScript type safety
- Proper cleanup on unmount
- Auto-reconnection for WebSocket hooks
- Configurable options with sensible defaults

---

## Exchange Hooks

### useBotExchange

Hook for exchange connection and trading operations. Supports 5 exchanges with WebSocket connections.

#### Types

```typescript
type ExchangeId = "binance" | "bybit" | "okx" | "bitget" | "bingx";
type TradingMode = "PAPER" | "TESTNET" | "DEMO" | "LIVE";
type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

interface ExchangeCredentials {
  apiKey: string;
  apiSecret: string;
  passphrase?: string;
}

interface ExchangeConfig {
  exchange: ExchangeId;
  mode: TradingMode;
  credentials?: ExchangeCredentials;
}

interface Position {
  symbol: string;
  side: "LONG" | "SHORT";
  size: number;
  entryPrice: number;
  markPrice: number;
  unrealizedPnL: number;
  leverage: number;
  liquidationPrice?: number;
}

interface Balance {
  asset: string;
  free: number;
  locked: number;
  total: number;
}

interface OrderResult {
  success: boolean;
  orderId?: string;
  error?: string;
}
```

#### Parameters

```typescript
interface UseBotExchangeOptions {
  botId?: string;                    // Optional bot identifier
  initialConfig?: ExchangeConfig;    // Initial exchange configuration
  autoConnect?: boolean;             // Auto-connect on mount (default: false)
}
```

#### Return Value

```typescript
interface UseBotExchangeReturn {
  // State
  exchange: ExchangeId;
  mode: TradingMode;
  status: ConnectionStatus;
  error: string | null;
  balances: Balance[];
  positions: Position[];
  currentPrice: number | null;
  
  // Actions
  setExchange: (exchange: ExchangeId) => void;
  setMode: (mode: TradingMode) => void;
  setCredentials: (credentials: ExchangeCredentials) => void;
  connect: () => Promise<boolean>;
  disconnect: () => void;
  
  // Trading
  placeOrder: (
    symbol: string,
    side: "BUY" | "SELL",
    type: "MARKET" | "LIMIT",
    amount: number,
    price?: number
  ) => Promise<OrderResult>;
  cancelOrder: (orderId: string) => Promise<OrderResult>;
  closePosition: (symbol: string) => Promise<OrderResult>;
  
  // Data
  fetchBalances: () => Promise<Balance[]>;
  fetchPositions: () => Promise<Position[]>;
  subscribeToPrice: (symbol: string) => void;
  unsubscribeFromPrice: () => void;
  
  // Utils
  isPaperTrading: boolean;
  isTestnet: boolean;
  isLive: boolean;
}
```

#### WebSocket URLs

| Exchange | Live | Testnet |
|----------|------|---------|
| Binance | `wss://fstream.binance.com/ws` | `wss://stream.binancefuture.com/ws` |
| Bybit | `wss://stream.bybit.com/v5/public/linear` | `wss://stream-testnet.bybit.com/v5/public/linear` |
| OKX | `wss://ws.okx.com:8443/ws/v5/public` | `wss://wspap.okx.com:8443/ws/v5/public?brokerId=9999` |
| Bitget | `wss://ws.bitget.com/v2/ws/public` | `wss://ws.bitget.com/v2/ws/public` |
| BingX | `wss://open-api-ws.bingx.com/market` | `wss://open-api-ws.bingx.com/market` |

#### Usage

```typescript
import { useBotExchange } from '@/hooks/use-bot-exchange';

function TradingPanel() {
  const {
    exchange,
    mode,
    status,
    balances,
    positions,
    placeOrder,
    closePosition,
    connect,
    isPaperTrading,
  } = useBotExchange({
    initialConfig: {
      exchange: 'binance',
      mode: 'PAPER',
    },
    autoConnect: true,
  });

  const handleBuy = async () => {
    const result = await placeOrder('BTCUSDT', 'BUY', 'MARKET', 0.01);
    if (result.success) {
      console.log('Order placed:', result.orderId);
    }
  };

  return (
    <div>
      <p>Exchange: {exchange}</p>
      <p>Status: {status}</p>
      <p>Paper Trading: {isPaperTrading ? 'Yes' : 'No'}</p>
      <button onClick={handleBuy}>Buy BTC</button>
    </div>
  );
}
```

---

## Bot Management Hooks

### useBotFilter

Hook for integrating signal filters into bot manager components. Supports 4 bot types with specialized filter implementations.

#### Types

```typescript
type BotType = 'BB' | 'DCA' | 'VISION' | 'ORION';

type SignalFilter = BBSignalFilter | DCAEntryFilter | EnhancedSignalFilter | VISIONSignalFilter;

type FilterResult = BBFilterResult | DCAFilterResult | EnhancedFilterResult | VISIONFilterResult;

interface UseBotFilterOptions {
  defaultEnabled?: boolean;          // Enable filter by default (default: true)
  config?: Record<string, unknown>;  // Custom filter configuration
  autoEvaluate?: boolean;            // Auto-evaluate on signal change
}

interface UseBotFilterReturn<T extends BotType> {
  filter: SignalFilter | null;       // Filter instance
  result: FilterResult | null;       // Latest evaluation result
  loading: boolean;                  // Loading state during evaluation
  evaluate: (signal: BotSignal) => Promise<FilterResult | null>;
  filterEnabled: boolean;            // Whether filter is enabled
  setFilterEnabled: (enabled: boolean) => void;
  updateConfig: (config: Record<string, unknown>) => void;
  reset: () => void;
  initialize: () => void;
  isReady: boolean;                  // Filter is ready for use
}
```

#### Specialized Hooks

```typescript
// BB Bot filter (Bollinger Bands)
function useBBFilter(symbol: string, options?: UseBotFilterOptions): UseBotFilterReturn<'BB'>;

// DCA Bot filter (Dollar Cost Averaging)
function useDCAFilter(symbol: string, options?: UseBotFilterOptions): UseBotFilterReturn<'DCA'>;

// VISION Bot filter (ML Forecasting)
function useVISIONFilter(symbol: string, options?: UseBotFilterOptions): UseBotFilterReturn<'VISION'>;

// ORION Bot filter (Trend Following)
function useORIONFilter(symbol: string, options?: UseBotFilterOptions): UseBotFilterReturn<'ORION'>;
```

#### Usage

```typescript
import { useBBFilter, useDCAFilter } from '@/hooks/use-bot-filter';

function BBBotManager() {
  const { result, evaluate, filterEnabled, setFilterEnabled, isReady } = useBBFilter('BTCUSDT', {
    defaultEnabled: true,
  });

  const handleSignal = async (signal: BBSignal) => {
    if (!isReady) return;
    
    const filterResult = await evaluate(signal);
    if (filterResult?.approved) {
      console.log('Signal approved:', filterResult.confidence);
    }
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={filterEnabled}
          onChange={(e) => setFilterEnabled(e.target.checked)}
        />
        Enable Filter
      </label>
    </div>
  );
}
```

### useInstitutionalBots

Hook for Institutional Bots API integration. Provides CRUD operations and real-time state management.

#### Types

```typescript
type BotType = 'SPECTRUM' | 'REED' | 'ARCHITECT' | 'EQUILIBRIST' | 'KRON';
type BotStatus = 'stopped' | 'starting' | 'running' | 'paused' | 'error';

interface InstitutionalBot {
  id: string;
  botType: BotType;
  name: string;
  symbol: string;
  isActive: boolean;
  status: BotStatus;
  totalProfit: number;
  totalTrades: number;
  winRate: number;
  maxDrawdown: number;
  algorithm: string;
  configJson: string;
  lastError?: string;
  createdAt: string;
  updatedAt: string;
  account?: {
    exchangeName: string;
    exchangeId: string;
  };
}

interface CreateBotRequest {
  botType: BotType;
  name?: string;
  symbol?: string;
  accountId?: string;
  config?: Record<string, unknown>;
}

interface UpdateBotRequest {
  name?: string;
  isActive?: boolean;
  status?: BotStatus;
  symbol?: string;
  leverage?: number;
  config?: Record<string, unknown>;
}

interface BotsSummary {
  total: number;
  active: number;
  byType: Record<BotType, number>;
}
```

#### Return Value

```typescript
interface UseInstitutionalBotsReturn {
  bots: InstitutionalBot[];
  summary: BotsSummary;
  loading: boolean;
  error: string | null;
  
  // CRUD Operations
  fetchBots: () => Promise<void>;
  createBot: (request: CreateBotRequest) => Promise<InstitutionalBot | null>;
  updateBot: (botType: BotType, id: string, updates: UpdateBotRequest) => Promise<InstitutionalBot | null>;
  deleteBot: (botType: BotType, id: string) => Promise<boolean>;
  
  // Bot Control
  startBot: (botType: BotType, id: string) => Promise<InstitutionalBot | null>;
  stopBot: (botType: BotType, id: string) => Promise<InstitutionalBot | null>;
  toggleBot: (botType: BotType, id: string) => Promise<InstitutionalBot | null>;
  getBot: (botType: BotType, id: string) => Promise<InstitutionalBot | null>;
  
  clearError: () => void;
}
```

#### Usage

```typescript
import { useInstitutionalBots, useBotsByType } from '@/hooks/use-institutional-bots';

function BotsDashboard() {
  const {
    bots,
    summary,
    loading,
    createBot,
    startBot,
    stopBot,
    deleteBot,
  } = useInstitutionalBots();

  const handleCreate = async () => {
    const bot = await createBot({
      botType: 'SPECTRUM',
      name: 'My Spectrum Bot',
      symbol: 'BTCUSDT',
    });
    if (bot) {
      console.log('Created:', bot.id);
    }
  };

  return (
    <div>
      <h2>Total: {summary.total} | Active: {summary.active}</h2>
      {bots.map((bot) => (
        <div key={bot.id}>
          <span>{bot.name}</span>
          <button onClick={() => startBot(bot.botType, bot.id)}>Start</button>
          <button onClick={() => stopBot(bot.botType, bot.id)}>Stop</button>
        </div>
      ))}
    </div>
  );
}

// Filter by bot type
function SpectrumBots() {
  const { bots, loading } = useBotsByType('SPECTRUM');
  return <div>{bots.length} Spectrum bots</div>;
}
```

---

## ML Hooks

### useMLWebSocket

Hook for real-time ML predictions via WebSocket. Connects directly to the ML Service.

#### Types

```typescript
type MLPredictionChannel = 'price_predictions' | 'signal_predictions' | 'regime_predictions';

interface PricePrediction {
  predictions: number[][];           // Price predictions
  horizons: string[];                // Prediction horizons
  confidence?: number;
  note?: string;
}

interface SignalPrediction {
  signal: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  probabilities: {
    BUY: number;
    SELL: number;
    HOLD: number;
  };
  note?: string;
}

interface RegimePrediction {
  regime: 'BULL' | 'BEAR' | 'SIDEWAYS';
  regime_id: number;
  confidence: number;
  probabilities: {
    BULL: number;
    BEAR: number;
    SIDEWAYS: number;
  };
  transition_matrix?: number[][];
  note?: string;
}
```

#### Parameters

```typescript
interface UseMLWebSocketOptions {
  autoConnect?: boolean;             // Auto-connect on mount (default: true)
  channels?: MLPredictionChannel[];  // Channels to subscribe to
  port?: number;                     // ML Service port (default: 3006)
  reconnect?: boolean;               // Reconnect on disconnect
  maxReconnectAttempts?: number;     // Max reconnect attempts (default: 5)
  onPrediction?: (channel: string, prediction: unknown) => void;
  onConnectionChange?: (connected: boolean) => void;
  onError?: (error: string) => void;
}
```

#### Return Value

```typescript
interface UseMLWebSocketReturn {
  isConnected: boolean;
  pricePrediction: PricePrediction | null;
  signalPrediction: SignalPrediction | null;
  regimePrediction: RegimePrediction | null;
  error: string | null;
  
  // Connection
  connect: () => void;
  disconnect: () => void;
  
  // Subscriptions
  subscribe: (channels: MLPredictionChannel[]) => void;
  unsubscribe: (channels?: MLPredictionChannel[]) => void;
  
  // On-demand
  requestPrediction: (type: 'price' | 'signal' | 'regime', features?: unknown) => void;
  ping: () => void;
}
```

#### Usage

```typescript
import { useMLWebSocket } from '@/hooks/use-ml-websocket';

function MLPredictionsPanel() {
  const {
    isConnected,
    pricePrediction,
    signalPrediction,
    regimePrediction,
    requestPrediction,
  } = useMLWebSocket({
    channels: ['price_predictions', 'signal_predictions', 'regime_predictions'],
    onPrediction: (channel, prediction) => {
      console.log(`New ${channel}:`, prediction);
    },
  });

  return (
    <div>
      <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
      
      {signalPrediction && (
        <div>
          <h3>Signal: {signalPrediction.signal}</h3>
          <p>Confidence: {(signalPrediction.confidence * 100).toFixed(1)}%</p>
        </div>
      )}
      
      {regimePrediction && (
        <div>
          <h3>Regime: {regimePrediction.regime}</h3>
          <p>Confidence: {(regimePrediction.confidence * 100).toFixed(1)}%</p>
        </div>
      )}
      
      <button onClick={() => requestPrediction('price')}>
        Request Price Prediction
      </button>
    </div>
  );
}
```

### useMLClassification

Hook for using ML classification in components. Supports k-NN Lorentzian classification.

#### Types

```typescript
interface ClassificationResult {
  direction: 'LONG' | 'SHORT' | 'NEUTRAL';
  probability: number;
  confidence: number;
  calibratedProbability: number;
  features: Record<string, number>;
  kernelEstimate?: {
    value: number;
    confidence: number;
    sampleCount: number;
  };
  sessionValid: boolean;
  activeSession?: string;
  featureImportance: Record<string, number>;
}

interface SignalResult {
  type: number;
  direction: string;
  action: string;
  passed: boolean;
  reasons: string[];
}

interface ClassifierStats {
  totalSamples: number;
  longCount: number;
  shortCount: number;
  neutralCount: number;
  avgConfidence: number;
  winRate: number;
  lastUpdated: number;
}

interface MLClassifyConfig {
  usePlattScaling?: boolean;
  useKernelSmoothing?: boolean;
  useSessionFilter?: boolean;
  minConfidence?: number;
  minProbability?: number;
}
```

#### Parameters

```typescript
interface UseMLClassificationOptions {
  autoRun?: boolean;                 // Auto-run classification on mount
  config?: MLClassifyConfig;         // Classification config
  symbol?: string;                   // Symbol to classify (default: 'BTCUSDT')
  timeframe?: string;                // Timeframe (default: '1h')
}
```

#### Return Value

```typescript
interface UseMLClassificationReturn {
  result: ClassificationResult | null;
  signal: SignalResult | null;
  stats: ClassifierStats | null;
  isLoading: boolean;
  error: string | null;
  
  classify: (priceData: {
    high: number[];
    low: number[];
    close: number[];
    volume?: number[];
  }) => Promise<void>;
  refreshStats: () => Promise<void>;
  clear: () => void;
}
```

#### Specialized Hooks

```typescript
// Real-time classification with WebSocket data
function useRealtimeClassification(
  symbol: string,
  timeframe: string,
  options?: {
    enabled?: boolean;
    interval?: number;
    config?: MLClassifyConfig;
  }
): {
  result: ClassificationResult | null;
  history: Array<{ timestamp: number; result: ClassificationResult }>;
  isLoading: boolean;
  classify: (priceData: PriceData) => Promise<void>;
};

// Batch classification of multiple symbols
function useBatchClassification(): {
  results: Record<string, ClassificationResult>;
  errors: Record<string, string>;
  isLoading: boolean;
  classifyBatch: (
    symbols: string[],
    getPriceData: (symbol: string) => Promise<PriceData>,
    config?: MLClassifyConfig
  ) => Promise<void>;
};
```

#### Usage

```typescript
import { useMLClassification, useBatchClassification } from '@/hooks/use-ml-classification';

function ClassificationPanel() {
  const { result, stats, isLoading, classify, refreshStats } = useMLClassification({
    symbol: 'BTCUSDT',
    timeframe: '1h',
    config: {
      usePlattScaling: true,
      useKernelSmoothing: true,
    },
  });

  useEffect(() => {
    // Fetch price data and classify
    fetch('/api/ohlcv?symbol=BTCUSDT&interval=1h&limit=100')
      .then(res => res.json())
      .then(data => {
        classify({
          high: data.ohlcv.map((c: number[]) => c[2]),
          low: data.ohlcv.map((c: number[]) => c[3]),
          close: data.ohlcv.map((c: number[]) => c[4]),
          volume: data.ohlcv.map((c: number[]) => c[5]),
        });
      });
  }, [classify]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {result && (
        <div>
          <h3>Direction: {result.direction}</h3>
          <p>Probability: {(result.probability * 100).toFixed(1)}%</p>
          <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
        </div>
      )}
      {stats && (
        <p>Win Rate: {(stats.winRate * 100).toFixed(1)}%</p>
      )}
    </div>
  );
}
```

---

## Market Data Hooks

### useRealtimeOhlcv

Hook for real-time OHLCV (candlestick) data updates.

#### Types

```typescript
interface RealtimeCandle {
  time: Time;                        // Unix timestamp
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  isFinal: boolean;                  // Candle is finalized
}
```

#### Parameters

```typescript
interface UseRealtimeOhlcvOptions {
  symbol: string;
  interval: string;
  enabled?: boolean;                 // Enable polling (default: true)
  pollInterval?: number;             // Poll interval in ms (default: 5000)
  onNewCandle?: (candle: RealtimeCandle) => void;
  onError?: (error: Error) => void;
}
```

#### Return Value

```typescript
interface UseRealtimeOhlcvReturn {
  currentCandle: RealtimeCandle | null;
  latestPrice: number | null;
  isConnected: boolean;
  lastUpdate: Date | null;
}
```

#### Combined Hook

```typescript
function useOhlcvWithRealtime(options: {
  symbol: string;
  interval: string;
  limit?: number;                    // Historical candles (default: 500)
  enabled?: boolean;
  realtimeEnabled?: boolean;
  pollInterval?: number;
}): {
  candles: RealtimeCandle[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  realtime: UseRealtimeOhlcvReturn;
}
```

#### Supported Intervals

| Interval | Duration (ms) |
|----------|---------------|
| `1m` | 60,000 |
| `3m` | 180,000 |
| `5m` | 300,000 |
| `15m` | 900,000 |
| `30m` | 1,800,000 |
| `1h` | 3,600,000 |
| `2h` | 7,200,000 |
| `4h` | 14,400,000 |
| `6h` | 21,600,000 |
| `8h` | 28,800,000 |
| `12h` | 43,200,000 |
| `1d` | 86,400,000 |
| `3d` | 259,200,000 |
| `1w` | 604,800,000 |
| `1M` | 2,592,000,000 |

#### Usage

```typescript
import { useRealtimeOhlcv, useOhlcvWithRealtime } from '@/hooks/use-realtime-ohlcv';

function PriceChart() {
  const { candles, isLoading, realtime } = useOhlcvWithRealtime({
    symbol: 'BTCUSDT',
    interval: '15m',
    limit: 200,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <p>Latest Price: {realtime.latestPrice}</p>
      <p>Candles: {candles.length}</p>
      {/* Render chart with candles */}
    </div>
  );
}
```

### useRealtimePrices

Hook for real-time price data from multiple exchanges using the unified PriceProvider.

#### Functions

```typescript
// Get price for a single symbol
function useRealtimePrice(symbol: string): MarketPrice | null;

// Get all real-time prices
function useAllRealtimePrices(): Record<string, MarketPrice>;

// Get 24h price change
function usePriceChange(symbol: string): {
  change: number;
  direction: "up" | "down" | "neutral";
};

// Get formatted price string
function useFormattedPrice(symbol: string): string;

// Get formatted change percentage
function useFormattedChange(symbol: string): string;

// Get prices for specific symbols
function usePricesBySymbols(symbols: string[]): Record<string, MarketPrice>;

// Get top performers
function useTopPerformers(count?: number): {
  best: MarketPrice[];
  worst: MarketPrice[];
};

// Calculate portfolio value
function usePortfolioValue(holdings: Record<string, number>): {
  total: number;
  breakdown: Record<string, { amount: number; value: number; price: number }>;
};

// Get price trend direction
function usePriceTrend(symbol: string): "up" | "down" | "neutral";

// Get Tailwind color class based on price change
function usePriceColor(symbol: string): string;

// Get connection status for all exchanges
function useConnectionStatuses(): Record<PriceSource, ConnectionStatus>;

// Get active price source
function useActivePriceSource(): {
  source: PriceSource;
  setSource: (source: PriceSource) => void;
};

// Get prices from specific exchange
function usePricesFromExchange(source: PriceSource): Record<string, MarketPrice>;

// Get exchange connection info
function useExchangeConnectionInfo(): {
  connectedCount: number;
  totalCount: number;
  connectionStatus: ConnectionStatus;
  statuses: Record<PriceSource, ConnectionStatus>;
  exchangeNames: Record<PriceSource, string>;
};

// Standalone WebSocket connection (outside PriceProvider)
function useStandalonePrices(symbols?: string[]): PriceWebSocketReturn;
```

#### Usage

```typescript
import {
  useRealtimePrice,
  useFormattedPrice,
  usePriceChange,
  useTopPerformers,
} from '@/hooks/use-realtime-prices';

function PriceDisplay({ symbol }: { symbol: string }) {
  const price = useRealtimePrice(symbol);
  const formattedPrice = useFormattedPrice(symbol);
  const { change, direction } = usePriceChange(symbol);
  
  return (
    <div>
      <span>{symbol}: {formattedPrice}</span>
      <span className={direction === 'up' ? 'text-green-500' : 'text-red-500'}>
        {change > 0 ? '+' : ''}{change.toFixed(2)}%
      </span>
    </div>
  );
}

function MarketOverview() {
  const { best, worst } = useTopPerformers(5);
  
  return (
    <div>
      <h3>Top Gainers</h3>
      {best.map(p => <div key={p.symbol}>{p.symbol}: +{p.change24h.toFixed(2)}%</div>)}
      
      <h3>Top Losers</h3>
      {worst.map(p => <div key={p.symbol}>{p.symbol}: {p.change24h.toFixed(2)}%</div>)}
    </div>
  );
}
```

---

## Trading Hooks

### useTradeEvents

Hook for subscribing to real-time trade events via WebSocket.

#### Types

```typescript
type TradeEventType =
  | 'order_placed'
  | 'order_filled'
  | 'order_cancelled'
  | 'order_rejected'
  | 'position_opened'
  | 'position_closed'
  | 'tp_hit'
  | 'sl_hit';

type TradeEventStatus = 'pending' | 'confirmed' | 'failed' | 'cancelled';

interface TradeEvent {
  id: string;
  type: TradeEventType;
  timestamp: Date;
  userId: string;
  accountId: string;
  
  tradeId?: string;
  positionId?: string;
  orderId?: string;
  clientOrderId?: string;
  
  symbol: string;
  exchange: string;
  direction: 'LONG' | 'SHORT';
  
  price?: number;
  entryPrice?: number;
  exitPrice?: number;
  avgPrice?: number;
  
  quantity?: number;
  amount?: number;
  leverage?: number;
  
  pnl?: number;
  pnlPercent?: number;
  fee?: number;
  
  status: TradeEventStatus;
  reason?: string;
  errorCode?: string;
  errorMessage?: string;
  
  confirmedAt?: Date;
  isDemo: boolean;
  tradingMode: 'DEMO' | 'TESTNET' | 'LIVE';
  metadata?: Record<string, unknown>;
}

interface TradeEventsSubscription {
  userId?: string;
  accountId?: string;
  symbols?: string[];
  exchanges?: string[];
  eventTypes?: TradeEventType[];
}
```

#### Parameters

```typescript
interface UseTradeEventsOptions {
  autoConnect?: boolean;             // Auto-connect on mount (default: true)
  maxHistorySize?: number;           // Max events in history (default: 100)
  subscription?: TradeEventsSubscription;
  onEvent?: (event: TradeEvent) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}
```

#### Return Value

```typescript
interface UseTradeEventsReturn {
  events: TradeEvent[];
  latestEvent: TradeEvent | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | null;
  
  subscribe: (subscription: TradeEventsSubscription) => void;
  unsubscribe: () => void;
  clearHistory: () => void;
  getEventsByType: (type: TradeEventType) => TradeEvent[];
  getEventsBySymbol: (symbol: string) => TradeEvent[];
  getPendingEvents: () => TradeEvent[];
  confirmEvent: (eventId: string) => Promise<boolean>;
  reconnect: () => void;
  disconnect: () => void;
}
```

#### Specialized Hooks

```typescript
// Monitor a specific position
function usePositionEvents(positionId: string | null): UseTradeEventsReturn;

// Monitor events for a specific symbol
function useSymbolEvents(symbol: string | null): UseTradeEventsReturn;

// Monitor trade confirmations
function useTradeConfirmations(): {
  pendingEvents: TradeEvent[];
  confirmEvent: (eventId: string) => Promise<boolean>;
  isConnected: boolean;
  hasPending: boolean;
};
```

#### Usage

```typescript
import { useTradeEvents, useSymbolEvents } from '@/hooks/use-trade-events';

function TradeHistory() {
  const { events, isConnected, getEventsByType } = useTradeEvents({
    maxHistorySize: 50,
    onEvent: (event) => console.log('New event:', event),
  });

  const filledOrders = getEventsByType('order_filled');
  const positions = getEventsByType('position_opened');

  return (
    <div>
      <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
      <h3>Recent Events ({events.length})</h3>
      {events.slice(0, 10).map(event => (
        <div key={event.id}>
          <span>{event.type}</span>
          <span>{event.symbol}</span>
          <span>{event.direction}</span>
          {event.pnl && <span>${event.pnl.toFixed(2)}</span>}
        </div>
      ))}
    </div>
  );
}
```

### useTradingHotkeys

Hook for trading keyboard shortcuts.

#### Types

```typescript
interface TradingHotkeysConfig {
  enabled: boolean;
  buyKey: string;                    // default: "b"
  sellKey: string;                   // default: "s"
  closeAllKey: string;               // default: "shift+e"
  cancelOrdersKey: string;           // default: "shift+c"
  refreshKey: string;                // default: "r"
  toggleChartKey: string;            // default: "t"
  quickBuy1Percent: string;          // default: "1"
  quickBuy5Percent: string;          // default: "2"
  quickBuy10Percent: string;         // default: "3"
  quickBuy25Percent: string;         // default: "4"
  quickBuy50Percent: string;         // default: "5"
  quickBuy100Percent: string;        // default: "6"
}

interface HotkeyAction {
  type: "buy" | "sell" | "closeAll" | "cancelOrders" | "refresh" | "toggleChart" | "quickBuy";
  percent?: number;
}
```

#### Parameters

```typescript
interface UseTradingHotkeysOptions {
  onBuy?: () => void;
  onSell?: () => void;
  onCloseAll?: () => void;
  onCancelOrders?: () => void;
  onRefresh?: () => void;
  onToggleChart?: () => void;
  onQuickBuy?: (percent: number) => void;
  config?: Partial<TradingHotkeysConfig>;
  scope?: string;                    // default: "trading"
}
```

#### Return Value

```typescript
interface UseTradingHotkeysReturn {
  lastAction: HotkeyAction | null;
  hotkeysPanelOpen: boolean;
  setHotkeysPanelOpen: (open: boolean) => void;
  config: TradingHotkeysConfig;
  isActive: boolean;
}
```

#### Default Hotkeys

| Key | Action |
|-----|--------|
| `B` | Open buy dialog |
| `S` | Open sell dialog |
| `Shift+E` | Close all positions |
| `Shift+C` | Cancel all open orders |
| `R` | Refresh chart data |
| `T` | Toggle chart type |
| `1` | Quick buy 1% of balance |
| `2` | Quick buy 5% of balance |
| `3` | Quick buy 10% of balance |
| `4` | Quick buy 25% of balance |
| `5` | Quick buy 50% of balance |
| `6` | Quick buy 100% of balance |
| `?` | Toggle hotkeys help |
| `Esc` | Close dialogs |

#### Usage

```typescript
import { useTradingHotkeys, HOTKEYS_HELP } from '@/hooks/use-trading-hotkeys';

function TradingInterface() {
  const { lastAction, hotkeysPanelOpen, setHotkeysPanelOpen, isActive } = useTradingHotkeys({
    onBuy: () => openBuyDialog(),
    onSell: () => openSellDialog(),
    onCloseAll: () => closeAllPositions(),
    onQuickBuy: (percent) => executeQuickBuy(percent),
  });

  return (
    <div>
      <p>Hotkeys Active: {isActive ? 'Yes' : 'No'}</p>
      {lastAction && <p>Last: {lastAction.type}</p>}
      
      {hotkeysPanelOpen && (
        <div className="hotkeys-help">
          <h3>Keyboard Shortcuts</h3>
          {HOTKEYS_HELP.map(({ key, description }) => (
            <div key={key}>
              <kbd>{key}</kbd>: {description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## Monitor Hooks

### useBotMonitor

Hook for real-time bot monitoring via WebSocket.

#### Types

```typescript
interface BotStatus {
  id: string;
  type: string;
  name: string;
  status: string;
  exchangeId: string;
  symbol: string;
  mode: string;
  metrics: {
    totalTrades: number;
    totalPnL: number;
    unrealizedPnL: number;
    winRate: number;
  };
  lastUpdate: Date;
}

interface BotEvent {
  type: 'status_change' | 'trade' | 'position_update' | 'error' | 'log';
  botId: string;
  data: any;
  timestamp: Date;
}
```

#### Parameters

```typescript
interface UseBotMonitorOptions {
  autoConnect?: boolean;             // Auto-connect on mount (default: true)
  onBotUpdate?: (bot: BotStatus) => void;
  onBotEvent?: (event: BotEvent) => void;
  onConnectionChange?: (connected: boolean) => void;
}
```

#### Return Value

```typescript
interface UseBotMonitorReturn {
  bots: BotStatus[];
  events: BotEvent[];
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  connect: () => void;
  disconnect: () => void;
  startBot: (botId: string) => void;
  stopBot: (botId: string) => void;
  pauseBot: (botId: string) => void;
  executeTrade: (params: {
    botId: string;
    symbol: string;
    side: 'BUY' | 'SELL';
    amount: number;
    price?: number;
  }) => void;
  subscribeBot: (botId: string) => void;
  unsubscribeBot: (botId: string) => void;
  refreshBots: () => void;
}
```

#### Service Port

`BOT_MONITOR_PORT = 3003`

#### Usage

```typescript
import { useBotMonitor } from '@/hooks/use-bot-monitor';

function BotMonitorDashboard() {
  const {
    bots,
    events,
    isConnected,
    startBot,
    stopBot,
    pauseBot,
    executeTrade,
  } = useBotMonitor({
    onBotUpdate: (bot) => console.log('Bot updated:', bot),
    onBotEvent: (event) => console.log('Bot event:', event),
  });

  return (
    <div>
      <h2>Bot Monitor {isConnected ? '🟢' : '🔴'}</h2>
      
      <div className="bots-grid">
        {bots.map(bot => (
          <div key={bot.id}>
            <h3>{bot.name}</h3>
            <p>Status: {bot.status}</p>
            <p>PnL: ${bot.metrics.totalPnL.toFixed(2)}</p>
            <p>Win Rate: {(bot.metrics.winRate * 100).toFixed(1)}%</p>
            
            <button onClick={() => startBot(bot.id)}>Start</button>
            <button onClick={() => pauseBot(bot.id)}>Pause</button>
            <button onClick={() => stopBot(bot.id)}>Stop</button>
          </div>
        ))}
      </div>
      
      <div className="events-log">
        {events.slice(0, 20).map(event => (
          <div key={`${event.botId}-${event.timestamp}`}>
            <span>{event.type}</span>
            <span>{event.botId}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### useRiskMonitor

Hook for real-time risk monitoring via WebSocket.

#### Types

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

interface KillSwitchState {
  isArmed: boolean;
  isTriggered: boolean;
  triggerReason?: string;
  botsStopped: number;
  lastTriggeredAt?: Date;
}

interface RiskAlert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  message: string;
  data?: RiskAlertData;
  timestamp: Date;
  acknowledged: boolean;
}

interface BotSummary {
  total: number;
  running: number;
  stopped: number;
  byType: Record<string, number>;
}
```

#### Return Value

```typescript
interface UseRiskMonitorReturn {
  // State
  riskState: RiskState | null;
  killSwitch: KillSwitchState | null;
  botSummary: BotSummary | null;
  alerts: RiskAlert[];
  isConnected: boolean;
  
  // Kill Switch Actions
  triggerKillSwitch: (reason?: string) => void;
  armKillSwitch: () => void;
  disarmKillSwitch: () => void;
  recoverKillSwitch: () => void;
  
  // Alerts
  acknowledgeAlert: (alertId: string) => void;
  
  // Connection
  connect: () => void;
  disconnect: () => void;
}
```

#### Service Port

`RISK_MONITOR_PORT = 3004`

#### Usage

```typescript
import { useRiskMonitor } from '@/hooks/use-risk-monitor';

function RiskDashboard() {
  const {
    riskState,
    killSwitch,
    botSummary,
    alerts,
    isConnected,
    triggerKillSwitch,
    armKillSwitch,
    disarmKillSwitch,
    recoverKillSwitch,
    acknowledgeAlert,
  } = useRiskMonitor();

  return (
    <div>
      <h2>Risk Monitor {isConnected ? '🟢' : '🔴'}</h2>
      
      {riskState && (
        <div className="risk-state">
          <h3>Risk Level: {riskState.riskLevel.toUpperCase()}</h3>
          <p>Score: {riskState.riskScore}/100</p>
          <p>Exposure: ${riskState.totalExposure.toFixed(2)}</p>
          <p>PnL: ${riskState.totalPnL.toFixed(2)}</p>
          <p>Drawdown: {(riskState.drawdown * 100).toFixed(2)}%</p>
          <p>VaR: ${riskState.varValue.toFixed(2)}</p>
          <p>Volatility: {riskState.volatilityRegime}</p>
        </div>
      )}
      
      {killSwitch && (
        <div className="kill-switch">
          <h3>Kill Switch</h3>
          <p>Armed: {killSwitch.isArmed ? 'Yes' : 'No'}</p>
          <p>Triggered: {killSwitch.isTriggered ? 'Yes' : 'No'}</p>
          
          {killSwitch.isTriggered ? (
            <button onClick={recoverKillSwitch}>Recover</button>
          ) : killSwitch.isArmed ? (
            <button onClick={disarmKillSwitch}>Disarm</button>
          ) : (
            <button onClick={armKillSwitch}>Arm</button>
          )}
          
          <button 
            onClick={() => triggerKillSwitch('Manual trigger')}
            className="danger"
          >
            TRIGGER KILL SWITCH
          </button>
        </div>
      )}
      
      <div className="alerts">
        <h3>Alerts ({alerts.filter(a => !a.acknowledged).length})</h3>
        {alerts.map(alert => (
          <div key={alert.id} className={`alert-${alert.type}`}>
            <span>{alert.message}</span>
            {!alert.acknowledged && (
              <button onClick={() => acknowledgeAlert(alert.id)}>
                Acknowledge
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## UI Hooks

### useMobile

Hook for detecting mobile devices based on screen width.

#### Constant

```typescript
const MOBILE_BREAKPOINT = 768; // pixels
```

#### Return Value

```typescript
function useIsMobile(): boolean;
```

#### Usage

```typescript
import { useIsMobile } from '@/hooks/use-mobile';

function ResponsiveComponent() {
  const isMobile = useIsMobile();
  
  return (
    <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
      {isMobile ? <MobileNav /> : <Sidebar />}
    </div>
  );
}
```

### useToast

Hook for toast notifications using shadcn/ui.

#### Types

```typescript
type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};
```

#### Functions

```typescript
// Toast function (callable directly)
function toast(props: Omit<ToasterToast, 'id'>): {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
};

// Hook for state access
function useToast(): {
  toasts: ToasterToast[];
  toast: typeof toast;
  dismiss: (toastId?: string) => void;
};
```

#### Constants

```typescript
const TOAST_LIMIT = 1;           // Max visible toasts
const TOAST_REMOVE_DELAY = 1000000; // Removal delay (ms)
```

#### Usage

```typescript
import { useToast, toast } from '@/hooks/use-toast';

function NotificationExample() {
  const { toasts, dismiss } = useToast();
  
  const showSuccess = () => {
    toast({
      title: 'Success',
      description: 'Operation completed successfully',
    });
  };
  
  const showError = () => {
    toast({
      title: 'Error',
      description: 'Something went wrong',
      variant: 'destructive',
    });
  };
  
  const showWithAction = () => {
    const { dismiss, update } = toast({
      title: 'Undo Action',
      description: 'Changes will be saved in 5 seconds',
      action: (
        <ToastAction altText="Undo" onClick={() => dismiss()}>
          Undo
        </ToastAction>
      ),
    });
    
    // Auto-update after 3 seconds
    setTimeout(() => {
      update({
        title: 'Saved',
        description: 'Changes have been saved',
      });
    }, 3000);
  };
  
  return (
    <div>
      <button onClick={showSuccess}>Show Success</button>
      <button onClick={showError}>Show Error</button>
      <button onClick={showWithAction}>Show with Action</button>
      
      <p>Active toasts: {toasts.length}</p>
    </div>
  );
}
```

---

## Communication Hooks

### useChatWebSocket

Hook for chat and signal communication via WebSocket with API fallback.

#### Types

```typescript
interface ChatMessage {
  id: string;
  role: "user" | "bot" | "system" | "notification";
  content: string;
  timestamp: Date;
  type?: "signal" | "command" | "notification" | "external-position" | "error";
  data?: SignalData | ExternalPosition | NotificationData | CommandResult;
}

interface SignalData {
  symbol: string;
  direction: "LONG" | "SHORT";
  action: "BUY" | "SELL" | "CLOSE";
  entryPrices: number[];
  takeProfits: { price: number; percentage: number }[];
  stopLoss?: number;
  leverage: number;
  marketType: "SPOT" | "FUTURES";
}

interface ExternalPosition {
  id: string;
  symbol: string;
  direction: string;
  status: string;
  exchangeName: string;
  amount: number;
  amountUsd: number;
  avgEntryPrice: number;
  currentPrice?: number;
  leverage: number;
  unrealizedPnl?: number;
  detectedAt: string;
}

interface NotificationData {
  type: string;
  title: string;
  message: string;
  priority: "low" | "normal" | "high" | "critical";
}

interface CommandResult {
  command: string;
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}
```

#### Parameters

```typescript
interface UseChatWebSocketOptions {
  port?: number;                     // Chat service port (default: 3005)
  autoConnect?: boolean;             // Auto-connect on mount (default: true)
  onMessage?: (message: ChatMessage) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}
```

#### Return Value

```typescript
interface UseChatWebSocketReturn {
  isConnected: boolean;
  messages: ChatMessage[];
  
  // Actions
  sendMessage: (content: string) => void;
  executeSignal: (signal: SignalData) => void;
  setMode: (mode: "DEMO" | "REAL") => void;
  setExchange: (exchange: string) => void;
  syncPositions: () => void;
  escortPosition: (positionId: string, action: "accept" | "ignore") => void;
  clearMessages: () => void;
}
```

#### Service Port

`CHAT_SERVICE_PORT = 3005`

#### Usage

```typescript
import { useChatWebSocket } from '@/hooks/use-chat-websocket';

function ChatPanel() {
  const {
    isConnected,
    messages,
    sendMessage,
    executeSignal,
    setMode,
    syncPositions,
  } = useChatWebSocket({
    onMessage: (msg) => console.log('New message:', msg),
  });

  const handleSignalExecute = () => {
    executeSignal({
      symbol: 'BTCUSDT',
      direction: 'LONG',
      action: 'BUY',
      entryPrices: [50000],
      takeProfits: [{ price: 52000, percentage: 100 }],
      stopLoss: 48000,
      leverage: 10,
      marketType: 'FUTURES',
    });
  };

  return (
    <div>
      <header>
        <span>Chat {isConnected ? '🟢' : '🔴'}</span>
        <button onClick={() => setMode('DEMO')}>Demo Mode</button>
        <button onClick={syncPositions}>Sync Positions</button>
      </header>
      
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message-${msg.role}`}>
            {msg.type === 'signal' ? (
              <SignalCard data={msg.data} onExecute={handleSignalExecute} />
            ) : (
              <p>{msg.content}</p>
            )}
          </div>
        ))}
      </div>
      
      <input
        placeholder="Type a message..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            sendMessage(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
      />
    </div>
  );
}
```

---

## Usage Examples

### Complete Trading Dashboard

```typescript
import { useBotExchange } from '@/hooks/use-bot-exchange';
import { useRealtimePrice } from '@/hooks/use-realtime-prices';
import { useTradeEvents } from '@/hooks/use-trade-events';
import { useTradingHotkeys } from '@/hooks/use-trading-hotkeys';
import { useRiskMonitor } from '@/hooks/use-risk-monitor';
import { toast } from '@/hooks/use-toast';

function TradingDashboard() {
  // Exchange connection
  const {
    exchange,
    mode,
    status,
    balances,
    positions,
    placeOrder,
    closePosition,
    isPaperTrading,
  } = useBotExchange({
    initialConfig: { exchange: 'binance', mode: 'PAPER' },
    autoConnect: true,
  });

  // Real-time prices
  const btcPrice = useRealtimePrice('BTCUSDT');

  // Trade events
  const { events, latestEvent } = useTradeEvents({
    onEvent: (event) => {
      if (event.type === 'order_filled') {
        toast({
          title: 'Order Filled',
          description: `${event.symbol} ${event.direction}`,
        });
      }
    },
  });

  // Risk monitoring
  const { riskState, killSwitch } = useRiskMonitor();

  // Trading hotkeys
  const { isActive: hotkeysActive } = useTradingHotkeys({
    onBuy: () => placeOrder('BTCUSDT', 'BUY', 'MARKET', 0.001),
    onSell: () => placeOrder('BTCUSDT', 'SELL', 'MARKET', 0.001),
    onCloseAll: () => positions.forEach(p => closePosition(p.symbol)),
    onQuickBuy: (percent) => {
      const balance = balances.find(b => b.asset === 'USDT')?.free || 0;
      const amount = (balance * (percent / 100)) / (btcPrice?.price || 50000);
      placeOrder('BTCUSDT', 'BUY', 'MARKET', amount);
    },
  });

  return (
    <div className="dashboard">
      <header>
        <h1>Trading Dashboard</h1>
        <span>{exchange.toUpperCase()} | {mode}</span>
        <span>{isPaperTrading ? '⚠️ PAPER' : '🔴 LIVE'}</span>
      </header>

      <div className="stats">
        <div>
          <h3>BTC Price</h3>
          <p>${btcPrice?.price.toFixed(2) || '---'}</p>
        </div>
        <div>
          <h3>Risk Level</h3>
          <p>{riskState?.riskLevel || 'Unknown'}</p>
        </div>
        <div>
          <h3>Positions</h3>
          <p>{positions.length}</p>
        </div>
      </div>

      <div className="positions">
        <h3>Open Positions</h3>
        {positions.map(pos => (
          <div key={pos.symbol}>
            <span>{pos.symbol} {pos.side}</span>
            <span>${pos.unrealizedPnL.toFixed(2)}</span>
            <button onClick={() => closePosition(pos.symbol)}>Close</button>
          </div>
        ))}
      </div>

      <footer>
        <p>Hotkeys: {hotkeysActive ? 'Active' : 'Inactive'}</p>
        <p>Kill Switch: {killSwitch?.isArmed ? 'Armed' : 'Disarmed'}</p>
      </footer>
    </div>
  );
}
```

### Bot Management System

```typescript
import { useInstitutionalBots } from '@/hooks/use-institutional-bots';
import { useBotMonitor } from '@/hooks/use-bot-monitor';
import { useBotFilter } from '@/hooks/use-bot-filter';
import { useMLWebSocket } from '@/hooks/use-ml-websocket';

function BotManagementSystem() {
  // Institutional bots CRUD
  const {
    bots,
    summary,
    createBot,
    startBot,
    stopBot,
    deleteBot,
  } = useInstitutionalBots();

  // Real-time bot monitoring
  const { bots: liveBots, events, isConnected } = useBotMonitor();

  // ML predictions
  const { signalPrediction, regimePrediction } = useMLWebSocket();

  // Signal filter
  const { evaluate, filterEnabled, setFilterEnabled } = useBotFilter('VISION', 'BTCUSDT');

  const handleCreateBot = async (type: BotType) => {
    const bot = await createBot({
      botType: type,
      symbol: 'BTCUSDT',
      name: `${type} Bot ${Date.now()}`,
    });
    if (bot) {
      startBot(bot.botType, bot.id);
    }
  };

  return (
    <div>
      <header>
        <h2>Bot Management</h2>
        <span>{summary.total} total | {summary.active} active</span>
      </header>

      <div className="ml-context">
        <h3>ML Context</h3>
        <p>Signal: {signalPrediction?.signal}</p>
        <p>Regime: {regimePrediction?.regime}</p>
        <label>
          <input
            type="checkbox"
            checked={filterEnabled}
            onChange={(e) => setFilterEnabled(e.target.checked)}
          />
          Enable Signal Filter
        </label>
      </div>

      <div className="bot-controls">
        <button onClick={() => handleCreateBot('SPECTRUM')}>Create Spectrum</button>
        <button onClick={() => handleCreateBot('ARCHITECT')}>Create Architect</button>
      </div>

      <div className="bots-list">
        {bots.map(bot => (
          <div key={bot.id}>
            <h4>{bot.name}</h4>
            <p>Type: {bot.botType}</p>
            <p>Status: {bot.status}</p>
            <p>PnL: ${bot.totalProfit.toFixed(2)}</p>
            <p>Win Rate: {(bot.winRate * 100).toFixed(1)}%</p>
            
            <button onClick={() => startBot(bot.botType, bot.id)}>Start</button>
            <button onClick={() => stopBot(bot.botType, bot.id)}>Stop</button>
            <button onClick={() => deleteBot(bot.botType, bot.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Related Documentation

- [Architecture Overview](/docs/architecture/FRONTEND_ARCHITECTURE.md)
- [Component Documentation](/docs/components/README.md)
- [API Reference](/docs/backend/BACKEND_API_REFERENCE.md)
- [WebSocket Protocol](/docs/architecture/WEBSOCKET_PROTOCOL.md)
