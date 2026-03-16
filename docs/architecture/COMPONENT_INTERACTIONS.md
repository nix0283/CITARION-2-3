# Component Interactions Documentation

> Полная документация взаимодействий компонентов CITARION
> Backend ↔ Backend, Backend ↔ UI, UI ↔ UI

---

## Обзор архитектуры взаимодействий

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CITARION COMPONENT INTERACTIONS                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                            UI LAYER                                    │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │  │
│  │  │Dashboard│ │ Charts  │ │  Bots   │ │ Signals │ │ Settings│        │  │
│  │  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘        │  │
│  │       │           │           │           │           │               │  │
│  │  ┌────▼───────────▼───────────▼───────────▼───────────▼────┐         │  │
│  │  │                    Zustand Stores                        │         │  │
│  │  │  cryptoStore | botStore | signalStore | settingsStore   │         │  │
│  │  └─────────────────────────┬───────────────────────────────┘         │  │
│  └─────────────────────────────┼─────────────────────────────────────────┘  │
│                                │                                             │
│  ┌─────────────────────────────▼─────────────────────────────────────────┐  │
│  │                         API LAYER                                      │  │
│  │  ┌────────────────────────────────────────────────────────────────┐   │  │
│  │  │                    Next.js API Routes (/api/*)                  │   │  │
│  │  │  /api/bots | /api/signals | /api/trades | /api/ml | /api/risk │   │  │
│  │  └──────────────────────────────┬─────────────────────────────────┘   │  │
│  └─────────────────────────────────┼───────────────────────────────────────┘  │
│                                    │                                         │
│  ┌─────────────────────────────────▼─────────────────────────────────────┐  │
│  │                         BACKEND LAYER                                  │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │  │
│  │  │Bot Engines│ │Auto-Trading│ │ML Pipeline│ │Risk Mgmt│ │Exchange  │   │  │
│  │  └─────┬────┘ └─────┬────┘ └─────┬────┘ └─────┬────┘ └─────┬────┘   │  │
│  │        │            │            │            │            │         │  │
│  │  ┌─────▼────────────▼────────────▼────────────▼────────────▼─────┐   │  │
│  │  │                    UnifiedIndicatorService                     │   │  │
│  │  └───────────────────────────────────────────────────────────────┘   │  │
│  │                                                                       │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │  │
│  │  │  Prisma  │ │  Redis   │ │ WebSocket│ │Event Bus │ │  Cache   │   │  │
│  │  │    DB    │ │  Cache   │ │  Server  │ │  (NATS)  │ │ Service  │   │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                      MICROSERVICES LAYER                               │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │  │
│  │  │ Price   │ │ Bot Mon │ │ Risk Mon│ │  Chat   │ │ Telegram│        │  │
│  │  │ Service │ │ Service │ │ Service │ │ Service │ │ Service │        │  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘        │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                     │  │
│  │  │  ML     │ │   RL    │ │  HFT    │ │ Trade   │                     │  │
│  │  │ Service │ │ Service │ │ Service │ │ Events  │                     │  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘                     │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                       EXTERNAL INTEGRATIONS                            │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │  │
│  │  │ Binance │ │  Bybit  │ │   OKX   │ │ Bitget  │ │  BingX  │        │  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘        │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Backend ↔ Backend Interactions

### 1.1 Bot Engine → Indicator Service

Все bot engines используют `UnifiedIndicatorService` для технического анализа.

```
┌─────────────────┐     calculate()      ┌─────────────────────┐
│   Grid Bot      │ ──────────────────▶ │                     │
│   Engine        │                      │                     │
├─────────────────┤     calculate()      │    Unified          │
│   DCA Bot       │ ──────────────────▶ │    Indicator        │
│   Engine        │                      │    Service          │
├─────────────────┤     calculate()      │                     │
│   BB Bot        │ ──────────────────▶ │    (Singleton)      │
│   Engine        │                      │                     │
├─────────────────┤     calculate()      │                     │
│   Orion Bot     │ ──────────────────▶ │                     │
│   Engine        │                      │                     │
├─────────────────┤     calculate()      │                     │
│   Vision Bot    │ ──────────────────▶ │                     │
│   Engine        │                      │                     │
├─────────────────┤     calculate()      │                     │
│   LOGOS Bot     │ ──────────────────▶ │                     │
│   Engine        │                      │                     │
└─────────────────┘                      └─────────────────────┘
```

**Используемые индикаторы по ботам:**

| Bot | Индикаторы | Назначение |
|-----|------------|------------|
| Grid Bot | ATR, Bollinger Bands | Адаптивное размещение уровней |
| DCA Bot | RSI, Stochastic | Фильтрация входов |
| BB Bot | Bollinger Bands, Stochastic | Основная стратегия |
| Orion Bot | EMA, SuperTrend, ATR | Определение тренда |
| Vision Bot | WaveTrend, Squeeze, Kernel | ML прогнозирование |
| Argus Bot | Depth Indicators | Orderbook анализ |
| Range Bot | Support/Resistance, RSI | Range trading |
| LOGOS Bot | Все индикаторы | Signal aggregation |

### 1.2 Bot Engine → Exchange Client

```
┌─────────────────┐                      ┌─────────────────────┐
│   Bot Engine    │    placeOrder()      │                     │
│                 │ ──────────────────▶  │   Exchange Client   │
│                 │                      │   (BaseClient)      │
│                 │    getBalance()      │                     │
│                 │ ──────────────────▶  │                     │
│                 │                      │                     │
│                 │    getPosition()     │                     │
│                 │ ──────────────────▶  │                     │
│                 │                      │                     │
│                 │ ◀────────────────── │   API Response      │
└─────────────────┘                      └─────────────────────┘
```

**Exchange Adapter Pattern:**

```typescript
// Universal Bot Adapter
class UniversalBotAdapter {
  private client: BaseExchangeClient;
  
  constructor(exchangeId: ExchangeId, credentials: ApiCredentials) {
    this.client = createExchangeClient(exchangeId, {
      credentials,
      marketType: 'futures',
      tradingMode: 'LIVE'
    });
  }
  
  async placeOrder(order: BotOrder): Promise<OrderResult> {
    return this.client.placeOrder({
      symbol: order.symbol,
      side: order.side,
      type: order.type,
      quantity: order.quantity,
      price: order.price
    });
  }
}
```

### 1.3 Bot Engine → Risk Management

```
┌─────────────────┐   validatePosition()  ┌─────────────────────┐
│   Bot Engine    │ ──────────────────▶   │                     │
│                 │                       │   Risk Manager      │
│                 │                       │                     │
│                 │   checkLimits()       │   ├── VaR Calc      │
│                 │ ──────────────────▶   │   ├── Kill Switch   │
│                 │                       │   ├── Position Lim. │
│                 │   ◀────────────────── │   └── Drawdown Mon. │
│                 │   { allowed: bool }   │                     │
└─────────────────┘                       └─────────────────────┘
```

**Risk Validation Flow:**

```typescript
// В каждом bot engine
class BotEngine {
  async executeOrder(order: Order) {
    // 1. Валидация через Risk Manager
    const validation = await this.riskManager.validatePosition({
      symbol: order.symbol,
      side: order.side,
      quantity: order.quantity,
      leverage: order.leverage
    });
    
    if (!validation.allowed) {
      this.logger.warn(`Order rejected: ${validation.reason}`);
      return { success: false, reason: validation.reason };
    }
    
    // 2. Исполнение через Exchange
    const result = await this.exchange.placeOrder(order);
    
    // 3. Обновление Risk Manager
    await this.riskManager.updatePosition(result.position);
    
    return result;
  }
}
```

### 1.4 ML Pipeline → Indicator Service

```
┌─────────────────┐   extractFeatures()   ┌─────────────────────┐
│  ML Pipeline    │ ──────────────────▶   │                     │
│                 │                       │    Indicator        │
│  ├── Feature    │   getFeatureSet()     │    Service          │
│  │   Engineer   │ ──────────────────▶   │                     │
│  ├── Model      │                       │    Returns:         │
│  │   Trainer    │                       │    RSI, MACD, BB,   │
│  └── Predictor  │                       │    ATR, ADX, etc.   │
└─────────────────┘                       └─────────────────────┘
```

**Feature Engineering:**

```typescript
class FeatureEngineer {
  extract(candles: Candle[]): FeatureSet {
    return {
      // Trend features
      ema_cross: calculateIndicator('ema_cross', candles).alignment,
      adx: calculateIndicator('adx', candles, { length: 14 }).value,
      
      // Momentum features
      rsi: calculateIndicator('rsi', candles, { length: 14 }).value,
      macd_hist: calculateIndicator('macd', candles).histogram,
      
      // Volatility features
      bb_width: this.getBBWidth(candles),
      atr_pct: calculateIndicator('atr', candles).value / candles.slice(-1)[0].close,
      
      // Volume features
      obv_trend: calculateIndicator('obv', candles).trend,
      volume_ratio: this.getVolumeRatio(candles)
    };
  }
}
```

### 1.5 Signal Processing → Bot Engine

```
┌─────────────────┐                      ┌─────────────────────┐
│    Signal       │   processSignal()    │                     │
│    Processor    │ ──────────────────▶  │     Bot Engine      │
│                 │                      │                     │
│ ├── Deduplicator│                      │  Grid Bot ──────┐   │
│ ├── Stale       │                      │  DCA Bot  ──────┤   │
│ │   Detector    │                      │  BB Bot   ──────┤   │
│ └── Cache       │                      │  Orion   ──────┤   │
│                 │                      │  Vision  ──────┤   │
│                 │                      │  LOGOS   ◀─────┘   │
└─────────────────┘                      └─────────────────────┘
```

### 1.6 Event Bus (NATS) Communication

```
┌───────────────────────────────────────────────────────────────────────────┐
│                           NATS EVENT BUS                                   │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│   ┌─────────────┐                         ┌─────────────┐                 │
│   │ Price       │ ── PRICE_UPDATE ──────▶ │ Bot Engine  │                 │
│   │ Service     │                         │ (All bots)  │                 │
│   └─────────────┘                         └─────────────┘                 │
│                                                                            │
│   ┌─────────────┐                         ┌─────────────┐                 │
│   │ Bot Engine  │ ── SIGNAL_GENERATED ──▶ │ LOGOS Bot   │                 │
│   └─────────────┘                         └─────────────┘                 │
│                                                                            │
│   ┌─────────────┐                         ┌─────────────┐                 │
│   │ LOGOS Bot   │ ── TRADE_SIGNAL ──────▶ │ Auto Trading│                 │
│   └─────────────┘                         │ Engine      │                 │
│                                           └─────────────┘                 │
│                                                                            │
│   ┌─────────────┐                         ┌─────────────┐                 │
│   │ Risk        │ ── RISK_ALERT ────────▶ │ Kill Switch │                 │
│   │ Monitor     │                         │ Manager     │                 │
│   └─────────────┘                         └─────────────┘                 │
│                                                                            │
│   ┌─────────────┐                         ┌─────────────┐                 │
│   │ Exchange    │ ── ORDER_FILLED ──────▶ │ Position    │                 │
│   │ Client      │                         │ Monitor     │                 │
│   └─────────────┘                         └─────────────┘                 │
│                                                                            │
└───────────────────────────────────────────────────────────────────────────┘
```

**Event Types:**

```typescript
type EventType = 
  // Price events
  | 'PRICE_UPDATE'
  | 'OHLCV_UPDATE'
  | 'FUNDING_RATE_UPDATE'
  
  // Signal events
  | 'SIGNAL_GENERATED'
  | 'SIGNAL_FILTERED'
  | 'SIGNAL_AGGREGATED'
  
  // Trade events
  | 'TRADE_SIGNAL'
  | 'ORDER_PLACED'
  | 'ORDER_FILLED'
  | 'ORDER_CANCELLED'
  | 'ORDER_REJECTED'
  
  // Position events
  | 'POSITION_OPENED'
  | 'POSITION_UPDATED'
  | 'POSITION_CLOSED'
  | 'POSITION_LIQUIDATED'
  
  // Risk events
  | 'RISK_ALERT'
  | 'DRAWDOWN_WARNING'
  | 'KILL_SWITCH_TRIGGERED'
  | 'POSITION_LIMIT_REACHED'
  
  // Bot events
  | 'BOT_STARTED'
  | 'BOT_STOPPED'
  | 'BOT_ERROR'
  | 'BOT_METRICS_UPDATE';
```

### 1.7 Microservices Communication

```
┌───────────────────────────────────────────────────────────────────────────┐
│                        MICROSERVICES INTERACTIONS                          │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌─────────────────┐     WebSocket      ┌─────────────────┐              │
│  │  Price Service  │ ◀────────────────▶ │   Bot Monitor   │              │
│  │  (Port: 3001)   │    Price Feed      │   (Port: 3002)  │              │
│  └────────┬────────┘                    └────────┬────────┘              │
│           │                                      │                         │
│           │ REST API                             │ WebSocket               │
│           ▼                                      ▼                         │
│  ┌─────────────────┐                    ┌─────────────────┐              │
│  │   Main App      │ ◀────────────────▶ │  Risk Monitor   │              │
│  │  (Port: 3000)   │    API Calls       │   (Port: 3004)  │              │
│  └────────┬────────┘                    └────────┬────────┘              │
│           │                                      │                         │
│           │                                      │                         │
│           ▼                                      ▼                         │
│  ┌─────────────────┐                    ┌─────────────────┐              │
│  │   ML Service    │ ◀────────────────▶ │   RL Service    │              │
│  │   (Python)      │    gRPC/HTTP       │   (Python)      │              │
│  └─────────────────┘                    └─────────────────┘              │
│                                                                            │
│  ┌─────────────────┐                    ┌─────────────────┐              │
│  │  HFT Service    │                    │ Trade Events    │              │
│  │   (Go)          │                    │   Service       │              │
│  └─────────────────┘                    └─────────────────┘              │
│                                                                            │
│  ┌─────────────────┐                    ┌─────────────────┐              │
│  │ Chat Service    │                    │ Telegram Service│              │
│  └─────────────────┘                    └─────────────────┘              │
│                                                                            │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Backend ↔ UI Interactions

### 2.1 API Routes → React Components

```
┌─────────────────┐                      ┌─────────────────────┐
│  React          │   fetch('/api/...')  │                     │
│  Components     │ ──────────────────▶  │   Next.js API       │
│                 │                      │   Routes            │
│  ├── Dashboard  │   ◀────────────────── │                     │
│  ├── Charts     │   JSON Response      │   /api/bots         │
│  ├── Bots       │                      │   /api/signals      │
│  ├── Signals    │                      │   /api/trades       │
│  └── Settings   │                      │   /api/ml           │
└─────────────────┘                      └─────────────────────┘
```

**API Endpoints для UI:**

| Endpoint | Method | UI Component | Назначение |
|----------|--------|--------------|------------|
| `/api/bots` | GET | BotsPanel | Список ботов |
| `/api/bots/[type]` | GET | BotManager | Детали бота |
| `/api/bots/grid/[id]/start` | POST | BotControl | Запуск бота |
| `/api/signals` | GET | SignalFeed | Лента сигналов |
| `/api/trades` | GET | TradesPanel | История сделок |
| `/api/positions` | GET | PositionsTable | Позиции |
| `/api/prices` | GET | PriceChart | Цены |
| `/api/ml/predict` | POST | PredictionPanel | ML прогнозы |
| `/api/risk/metrics` | GET | RiskDashboard | Метрики риска |

### 2.2 WebSocket → Real-time Updates

```
┌─────────────────┐                      ┌─────────────────────┐
│  React          │   io('/?XTransform   │                     │
│  Components     │   Port=3001)         │   Price Service     │
│                 │ ──────────────────▶  │   (WebSocket)       │
│  ├── useRealtime│                      │                     │
│  │   Prices()   │   price_update       │   Binance WS        │
│  │              │ ◀──────────────────  │   Bybit WS          │
│  ├── useOHLCV() │                      │   OKX WS            │
│  │              │   ohlcv_update       │   ...               │
│  │              │ ◀──────────────────  │                     │
│  └── useBotMon()│                      │                     │
│                 │   bot_status          │                     │
│                 │ ◀──────────────────  │                     │
└─────────────────┘                      └─────────────────────┘
```

**WebSocket Hooks:**

```typescript
// use-realtime-prices.ts
export function useRealtimePrices(symbol: string) {
  const [price, setPrice] = useState<PriceData | null>(null);
  
  useEffect(() => {
    const socket = io('/?XTransformPort=3001');
    
    socket.on('price_update', (data: PriceData) => {
      if (data.symbol === symbol) {
        setPrice(data);
      }
    });
    
    return () => { socket.disconnect(); };
  }, [symbol]);
  
  return price;
}

// use-ml-websocket.ts
export function useMLWebSocket() {
  const [classification, setClassification] = useState<MLClassification | null>(null);
  
  useEffect(() => {
    const socket = io('/?XTransformPort=3006'); // ML Service
    
    socket.on('ml_classification', (data) => {
      setClassification(data);
    });
    
    return () => { socket.disconnect(); };
  }, []);
  
  return classification;
}
```

### 2.3 Zustand Store → Backend Sync

```
┌─────────────────┐                      ┌─────────────────────┐
│  Zustand        │   API Sync           │                     │
│  Stores         │                      │   Backend           │
│                 │ ──────────────────▶  │   Services          │
│  ├── cryptoStore│   persist()          │                     │
│  │              │                      │   ├── Prisma DB     │
│  ├── botStore   │   ◀────────────────── │   ├── Redis Cache   │
│  │              │   hydrate()          │   └── File System   │
│  ├── signalStore│                      │                     │
│  │              │                      │                     │
│  └── settings   │                      │                     │
│     Store       │                      │                     │
└─────────────────┘                      └─────────────────────┘
```

**Store с Backend синхронизацией:**

```typescript
// crypto-store.ts
export const useCryptoStore = create<CryptoStore>()(
  persist(
    (set, get) => ({
      prices: {},
      positions: [],
      orders: [],
      
      // Загрузка с backend
      loadPositions: async () => {
        const response = await fetch('/api/positions');
        const positions = await response.json();
        set({ positions });
      },
      
      // Сохранение на backend
      updatePosition: async (position: Position) => {
        await fetch(`/api/positions/${position.id}`, {
          method: 'PUT',
          body: JSON.stringify(position)
        });
        set((state) => ({
          positions: state.positions.map(p => 
            p.id === position.id ? position : p
          )
        }));
      }
    }),
    { name: 'crypto-store' }
  )
);
```

### 2.4 Chart Component → Indicator Service

```
┌─────────────────┐                      ┌─────────────────────┐
│  Chart          │   calculate()        │                     │
│  Component      │ ──────────────────▶  │   Indicator         │
│                 │                      │   Service           │
│  ├── PriceChart │   { indicator: 'rsi' │                     │
│  │              │     inputs: {...} }  │   Returns:          │
│  ├── MiniChart  │                      │   lines[]           │
│  │              │   ◀────────────────── │   histograms[]      │
│  └── MultiChart │   IndicatorResult    │                     │
└─────────────────┘                      └─────────────────────┘
```

**Chart с индикаторами:**

```typescript
// price-chart.tsx
export function PriceChart({ symbol, indicators }: PriceChartProps) {
  const { candles } = useOHLCV(symbol);
  const [indicatorData, setIndicatorData] = useState<IndicatorResult[]>([]);
  
  useEffect(() => {
    if (!candles.length) return;
    
    // Расчёт всех выбранных индикаторов
    const results = indicators.map(ind => 
      calculateIndicator(ind.id, candles, ind.inputs)
    );
    
    setIndicatorData(results.filter(Boolean));
  }, [candles, indicators]);
  
  return (
    <ChartContainer>
      <CandlestickSeries data={candles} />
      {indicatorData.map((result, i) => (
        result.overlay ? (
          <LineSeries 
            key={i}
            data={result.lines[0].data}
            color={result.lines[0].color}
          />
        ) : (
          <OscillatorPanel result={result} />
        )
      ))}
    </ChartContainer>
  );
}
```

---

## 3. UI ↔ UI Interactions

### 3.1 Component Hierarchy

```
┌───────────────────────────────────────────────────────────────────────────┐
│                              UI COMPONENT TREE                             │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌───────────────────────────────────────────────────────────────────┐    │
│  │                           App Layout                               │    │
│  │  ┌─────────────┐ ┌─────────────────────────────┐ ┌─────────────┐ │    │
│  │  │   Sidebar   │ │         Main Content         │ │   Footer    │ │    │
│  │  │             │ │                             │ │             │ │    │
│  │  │ ├── Dashboard│ │ ┌─────────────────────────┐ │ │ Status Bar  │ │    │
│  │  │ ├── Charts  │ │ │   Dashboard Panel       │ │ │ Connection  │ │    │
│  │  │ ├── Bots    │ │ │   ├── Balance Widget    │ │ │ PnL         │ │    │
│  │  │ ├── Signals │ │ │   ├── Market Overview   │ │ │ Risk Level  │ │    │
│  │  │ ├── Trades  │ │ │   ├── Bot Status        │ │ │             │ │    │
│  │  │ ├── Risk    │ │ │   └── Signal Feed       │ │             │ │    │
│  │  │ ├── ML      │ │ └─────────────────────────┘ │             │ │    │
│  │  │ └── Settings│ │                             │ │             │ │    │
│  │  │             │ │ ┌─────────────────────────┐ │ │             │ │    │
│  │  │             │ │   Bot Manager Panel     │ │ │             │ │    │
│  │  │             │ │   ├── Bot Control Panel │ │ │             │ │    │
│  │  │             │ │   ├── Grid Bot Panel    │ │ │             │ │    │
│  │  │             │ │   ├── DCA Bot Panel     │ │ │             │ │    │
│  │  │             │ │   └── Bot Config Form   │ │ │             │ │    │
│  │  │             │ │ └─────────────────────────┘ │             │ │    │
│  │  └─────────────┘ └─────────────────────────────┘ └─────────────┘ │    │
│  └───────────────────────────────────────────────────────────────────┘    │
│                                                                            │
└───────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Store-based Communication

```
┌─────────────────┐                      ┌─────────────────────┐
│  Dashboard      │                      │   Zustand Store     │
│  Panel          │   useStore()         │                     │
│                 │ ──────────────────▶  │   cryptoStore       │
│  ├── Balance    │                      │   ├── prices        │
│  │   Widget     │   setPrice()         │   ├── positions     │
│  │              │ ──────────────────▶  │   └── orders        │
│  └── Bot Status │                      │                     │
│                 │   ◀────────────────── │                     │
└─────────────────┘   subscribe()        └─────────────────────┘
                                             ▲
                                             │
┌─────────────────┐                          │
│  Bots Panel     │   useStore()             │
│                 │ ─────────────────────────┘
│  ├── Grid Bot   │                          
│  ├── DCA Bot    │                          
│  └── Bot Control│                          
└─────────────────┘                          
```

**Cross-component Communication:**

```typescript
// Component A: Bot Control Panel
export function BotControlPanel({ botId }: { botId: string }) {
  const { activeBots, startBot, stopBot } = useBotStore();
  
  const handleStart = async () => {
    await startBot(botId);
    // Store обновится, все подписанные компоненты получат update
  };
  
  return (
    <Button onClick={handleStart}>Start</Button>
  );
}

// Component B: Dashboard Bot Status
export function BotStatusWidget() {
  const { activeBots } = useBotStore();
  // Автоматически перерендерится при изменении activeBots
  
  return (
    <div>
      {activeBots.map(bot => (
        <BotStatusCard key={bot.id} bot={bot} />
      ))}
    </div>
  );
}

// Component C: Positions Table
export function PositionsTable() {
  const { positions } = useCryptoStore();
  // Также реагирует на изменения позиций от ботов
  
  return <Table data={positions} />;
}
```

### 3.3 Event-based Communication

```
┌─────────────────┐    emit('bot:started')   ┌─────────────────────┐
│  Bot Control    │ ──────────────────────▶  │                     │
│  Panel          │                          │   Event Emitter     │
│                 │                          │   (Component Level) │
│                 │                          │                     │
│                 │    emit('position:open') │                     │
│                 │ ──────────────────────▶  │                     │
└─────────────────┘                          │                     │
                                             │                     │
┌─────────────────┐    on('bot:started')     │                     │
│  Notification   │ ◀──────────────────────  │                     │
│  System         │                          │                     │
└─────────────────┘                          │                     │
                                             │                     │
┌─────────────────┐    on('position:open')   │                     │
│  Dashboard      │ ◀──────────────────────  │                     │
│  Panel          │                          │                     │
└─────────────────┘                          └─────────────────────┘
```

### 3.4 Props Drilling vs Context

```
┌───────────────────────────────────────────────────────────────────────────┐
│                        DATA FLOW PATTERNS                                  │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  PROPS DRILLING (для простых компонентов)                                 │
│  ┌─────────────┐                                                           │
│  │   Parent    │                                                           │
│  │  props: {}  │                                                           │
│  └──────┬──────┘                                                           │
│         │ props                                                            │
│         ▼                                                                  │
│  ┌─────────────┐                                                           │
│  │   Child     │                                                           │
│  │  props: {}  │                                                           │
│  └──────┬──────┘                                                           │
│         │ props                                                            │
│         ▼                                                                  │
│  ┌─────────────┐                                                           │
│  │  Grandchild │                                                           │
│  │  props: {}  │                                                           │
│  └─────────────┘                                                           │
│                                                                            │
│  CONTEXT/STORE (для глобального состояния)                                │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                      Zustand Store (Global)                          │  │
│  └───────────────────────────────┬─────────────────────────────────────┘  │
│                                  │                                         │
│         ┌────────────────────────┼────────────────────────┐               │
│         │                        │                        │               │
│         ▼                        ▼                        ▼               │
│  ┌─────────────┐          ┌─────────────┐          ┌─────────────┐       │
│  │ Component A │          │ Component B │          │ Component C │       │
│  │ useStore()  │          │ useStore()  │          │ useStore()  │       │
│  └─────────────┘          └─────────────┘          └─────────────┘       │
│                                                                            │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Bot Type Interactions

### 4.1 LOGOS Meta Bot ↔ All Bots

```
┌───────────────────────────────────────────────────────────────────────────┐
│                        LOGOS SIGNAL AGGREGATION                            │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌─────────────┐                          ┌───────────────────────────┐  │
│  │ Grid Bot    │ ── signal (LONG) ──────▶ │                           │  │
│  │ confidence: │                          │                           │  │
│  │ 0.65        │                          │                           │  │
│  └─────────────┘                          │                           │  │
│                                           │                           │  │
│  ┌─────────────┐                          │                           │  │
│  │ DCA Bot     │ ── signal (LONG) ──────▶ │                           │  │
│  │ confidence: │                          │                           │  │
│  │ 0.72        │                          │      LOGOS Meta Bot       │  │
│  └─────────────┘                          │                           │  │
│                                           │    Aggregation Logic:     │  │
│  ┌─────────────┐                          │    - Weighted Average     │  │
│  │ BB Bot      │ ── signal (SHORT) ─────▶ │    - Consensus Check      │  │
│  │ confidence: │                          │    - Conflict Detection   │  │
│  │ 0.55        │                          │    - Confidence Boost     │  │
│  └─────────────┘                          │                           │  │
│                                           │                           │  │
│  ┌─────────────┐                          │    Output:                │  │
│  │ Orion Bot   │ ── signal (LONG) ──────▶ │    Direction: LONG        │  │
│  │ confidence: │                          │    Confidence: 0.78       │  │
│  │ 0.85        │                          │    Consensus: 0.75        │  │
│  └─────────────┘                          │                           │  │
│                                           │                           │  │
│  ┌─────────────┐                          │                           │  │
│  │ Vision Bot  │ ── signal (LONG) ──────▶ │                           │  │
│  │ confidence: │                          │                           │  │
│  │ 0.80        │                          │                           │  │
│  └─────────────┘                          └───────────────────────────┘  │
│                                                                            │
└───────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Bot Category Weights

```typescript
const CATEGORY_WEIGHTS = {
  operational: {
    grid: 1.0,
    dca: 1.0,
    bb: 1.0
  },
  institutional: {
    argus: 1.5,    // Pump/Dump detection - высокий приоритет
    orion: 1.5,    // Trend following - высокий приоритет
    vision: 1.3,   // ML forecast
    range: 1.0
  },
  frequency: {
    hft: 2.0,      // Самый высокий - низкая задержка
    mft: 1.5,
    lft: 1.0
  }
};
```

### 4.3 Bot → Risk Manager Interaction

```
┌─────────────────┐   pre-trade check    ┌─────────────────────┐
│   Any Bot       │ ──────────────────▶  │                     │
│   Engine        │                      │   Risk Manager      │
│                 │                      │                     │
│                 │   { allowed: true,   │   Checks:           │
│                 │     adjustedQty: 0.8}│   ├── Max Position  │
│                 │ ◀──────────────────  │   ├── Max Drawdown  │
│                 │                      │   ├── VaR Limit     │
│                 │                      │   ├── Correlation   │
│                 │                      │   └── Kill Switch   │
└─────────────────┘                      └─────────────────────┘
```

---

## 5. Data Flow Diagrams

### 5.1 Signal Processing Flow

```
┌───────────────────────────────────────────────────────────────────────────┐
│                        SIGNAL PROCESSING FLOW                              │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐          │
│  │ TradingView│   │  Cornix   │   │  Manual   │   │   Bot     │          │
│  │  Webhook  │   │   API     │   │   Input   │   │ Generated │          │
│  └─────┬─────┘   └─────┬─────┘   └─────┬─────┘   └─────┬─────┘          │
│        │               │               │               │                  │
│        └───────────────┴───────────────┴───────────────┘                  │
│                                        │                                   │
│                                        ▼                                   │
│                              ┌───────────────────┐                        │
│                              │  Signal Parser    │                        │
│                              │  - Parse format   │                        │
│                              │  - Validate       │                        │
│                              │  - Normalize      │                        │
│                              └────────┬──────────┘                        │
│                                       │                                    │
│                                       ▼                                    │
│                              ┌───────────────────┐                        │
│                              │  Deduplicator     │                        │
│                              │  - Check cache    │                        │
│                              │  - Hash signal    │                        │
│                              │  - Filter dupes   │                        │
│                              └────────┬──────────┘                        │
│                                       │                                    │
│                                       ▼                                    │
│                              ┌───────────────────┐                        │
│                              │  Stale Signal     │                        │
│                              │  Detector         │                        │
│                              │  - Check age      │                        │
│                              │  - Verify price   │                        │
│                              └────────┬──────────┘                        │
│                                       │                                    │
│                                       ▼                                    │
│                              ┌───────────────────┐                        │
│                              │  ML Signal Filter │                        │
│                              │  - Score signal   │                        │
│                              │  - Apply filters  │                        │
│                              │  - Boost/Reduce   │                        │
│                              └────────┬──────────┘                        │
│                                       │                                    │
│                                       ▼                                    │
│                              ┌───────────────────┐                        │
│                              │  Risk Validator   │                        │
│                              │  - Position limit │                        │
│                              │  - Drawdown check │                        │
│                              │  - Kill switch    │                        │
│                              └────────┬──────────┘                        │
│                                       │                                    │
│                                       ▼                                    │
│                              ┌───────────────────┐                        │
│                              │  Execution Engine │                        │
│                              │  - Place orders   │                        │
│                              │  - Track fills    │                        │
│                              │  - Update pos.    │                        │
│                              └───────────────────┘                        │
│                                                                            │
└───────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Price Data Flow

```
┌───────────────────────────────────────────────────────────────────────────┐
│                           PRICE DATA FLOW                                  │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│  │   Binance   │ │   Bybit     │ │    OKX      │ │   Bitget    │        │
│  │  WebSocket  │ │  WebSocket  │ │  WebSocket  │ │  WebSocket  │        │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘        │
│         │               │               │               │                │
│         └───────────────┴───────────────┴───────────────┘                │
│                                   │                                        │
│                                   ▼                                        │
│                        ┌───────────────────┐                              │
│                        │   Price Service   │                              │
│                        │   (Port: 3001)    │                              │
│                        │                   │                              │
│                        │  - Aggregate      │                              │
│                        │  - Normalize      │                              │
│                        │  - Cache          │                              │
│                        └────────┬──────────┘                              │
│                                 │                                          │
│         ┌───────────────────────┼───────────────────────┐                │
│         │                       │                       │                │
│         ▼                       ▼                       ▼                │
│  ┌─────────────┐        ┌─────────────┐        ┌─────────────┐          │
│  │   Redis     │        │   WebSocket │        │   Bot       │          │
│  │   Cache     │        │   Broadcast │        │   Engines   │          │
│  │             │        │             │        │             │          │
│  │  prices:*   │        │  /ws/prices │        │  Grid, DCA  │          │
│  └─────────────┘        └─────────────┘        └─────────────┘          │
│                                                                            │
│         ┌───────────────────────┼───────────────────────┐                │
│         │                       │                       │                │
│         ▼                       ▼                       ▼                │
│  ┌─────────────┐        ┌─────────────┐        ┌─────────────┐          │
│  │  OHLCV      │        │  Indicator  │        │   UI        │          │
│  │  Service    │        │  Service    │        │   Charts    │          │
│  │             │        │             │        │             │          │
│  │  TimescaleDB│        │  RSI, MACD  │        │  Realtime   │          │
│  └─────────────┘        └─────────────┘        └─────────────┘          │
│                                                                            │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Error Handling Flows

### 6.1 Exchange Error Handling

```
┌─────────────────┐                      ┌─────────────────────┐
│  Bot Engine     │   placeOrder()       │                     │
│                 │ ──────────────────▶  │   Exchange Client   │
│                 │                      │                     │
│                 │                      │   Error?            │
│                 │                      │   ├── Rate Limit    │
│                 │                      │   ├── Network       │
│                 │                      │   ├── Insufficient  │
│                 │                      │   └── Invalid Symbol│
│                 │   ◀────────────────── │                     │
│                 │   Error Object       │                     │
│                 │                      │                     │
│                 │   ┌──────────────┐   │                     │
│                 │   │ Retry Logic  │   │                     │
│                 │   │ (3 attempts) │   │                     │
│                 │   └──────────────┘   │                     │
│                 │                      │                     │
│                 │   If failed:         │                     │
│                 │   ├── Log error      │                     │
│                 │   ├── Update status  │                     │
│                 │   └── Notify user    │                     │
└─────────────────┘                      └─────────────────────┘
```

### 6.2 Circuit Breaker Flow

```
┌───────────────────────────────────────────────────────────────────────────┐
│                        CIRCUIT BREAKER STATES                              │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│                     ┌─────────────────┐                                   │
│                     │     CLOSED      │                                   │
│                     │  (Normal Ops)   │                                   │
│                     └────────┬────────┘                                   │
│                              │                                            │
│                              │ Error threshold exceeded                   │
│                              │ (>5 errors in 1 min)                       │
│                              ▼                                            │
│                     ┌─────────────────┐                                   │
│                     │      OPEN       │                                   │
│                     │  (Failing Fast) │                                   │
│                     └────────┬────────┘                                   │
│                              │                                            │
│                              │ After 30 seconds                           │
│                              ▼                                            │
│                     ┌─────────────────┐                                   │
│                     │   HALF_OPEN     │                                   │
│                     │  (Testing)      │                                   │
│                     └────────┬────────┘                                   │
│                              │                                            │
│              ┌───────────────┴───────────────┐                            │
│              │                               │                            │
│              │ Success                       │ Failure                    │
│              ▼                               ▼                            │
│     ┌─────────────────┐             ┌─────────────────┐                   │
│     │     CLOSED      │             │      OPEN       │                   │
│     └─────────────────┘             └─────────────────┘                   │
│                                                                            │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Summary Tables

### 7.1 Backend ↔ Backend Interactions

| Source | Target | Protocol | Purpose |
|--------|--------|----------|---------|
| Bot Engine | Indicator Service | Direct Call | Technical analysis |
| Bot Engine | Exchange Client | Direct Call | Order execution |
| Bot Engine | Risk Manager | Direct Call | Risk validation |
| ML Pipeline | Indicator Service | Direct Call | Feature extraction |
| Signal Processor | Bot Engine | Event Bus | Signal delivery |
| Price Service | Bot Monitor | WebSocket | Price updates |
| All Services | Redis | TCP | Caching |
| All Services | Prisma DB | TCP | Persistence |

### 7.2 Backend ↔ UI Interactions

| Source | Target | Protocol | Purpose |
|--------|--------|----------|---------|
| React Component | API Route | HTTP/REST | Data fetching |
| React Component | WebSocket | WS | Real-time updates |
| Zustand Store | API Route | HTTP | State sync |
| Chart Component | Indicator Service | Direct | Calculations |

### 7.3 UI ↔ UI Interactions

| Source | Target | Method | Purpose |
|--------|--------|--------|---------|
| Dashboard | Bot Status | Zustand | Status updates |
| Bot Control | Positions | Zustand | Position changes |
| Settings | All Panels | Zustand | Config changes |
| Notification | All | Event | Alerts |

---

*Документация обновлена: 13 марта 2026*
