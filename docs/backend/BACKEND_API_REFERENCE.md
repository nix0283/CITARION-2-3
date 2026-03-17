# Backend API Reference

> Полный справочник по Backend API CITARION Trading Platform
> 
> **Версия:** 2.0.0  
> **Последнее обновление:** Март 2026  
> **Всего endpoints:** 120+

---

## Оглавление

1. [Обзор](#обзор)
2. [Authentication](#authentication)
3. [Rate Limiting](#rate-limiting)
4. [Error Handling](#error-handling)
5. [API Categories](#api-categories)
   - [Trading API](#1-trading-api)
   - [Bots API](#2-bots-api)
   - [ML API](#3-ml-api)
   - [Risk Management API](#4-risk-management-api)
   - [Signals API](#5-signals-api)
   - [Exchange API](#6-exchange-api)
   - [Analytics API](#7-analytics-api)
   - [Cron API](#8-cron-api)
   - [Data Management API](#9-data-management-api)
   - [Telegram API](#10-telegram-api)
   - [User/Account API](#11-useraccount-api)
   - [Auto-Trading API](#12-auto-trading-api)
   - [Copy Trading API](#13-copy-trading-api)
   - [Other APIs](#14-other-apis)
6. [Общие типы данных](#общие-типы-данных)

---

## Обзор

CITARION Backend API построен на Next.js 15 App Router с использованием Route Handlers. API поддерживает:

- **REST API** - основные CRUD операции
- **Server-Sent Events (SSE)** - real-time уведомления
- **Webhook endpoints** - интеграция с внешними сервисами
- **Cron endpoints** - фоновые задачи

### Базовый URL

```
Production: https://api.citarion.io/api
Development: http://localhost:3000/api
```

### Формат ответов

Все ответы возвращаются в JSON формате:

```typescript
// Успешный ответ
{
  "success": true,
  "data": { ... },
  "message": "Operation completed"
}

// Ответ с ошибкой
{
  "success": false,
  "error": "Error message",
  "details": "Additional info"
}
```

---

## Authentication

API поддерживает несколько методов аутентификации:

### 1. Session-based (Web Users)

```
Cookie: next-auth.session-token=<token>
```

Используется для веб-интерфейса через NextAuth.js.

### 2. API Key (Bot/Service Access)

```http
X-API-Key: ck_xxxxxxxxxxxxx
```

API ключи начинаются с префикса `ck_` и хранятся в базе данных в хешированном виде.

### 3. Bearer Token

```http
Authorization: Bearer <token>
```

### 4. Demo Mode (без аутентификации)

Некоторые endpoints работают в demo-режиме без аутентификации, используя default user.

---

## Rate Limiting

### Глобальные лимиты

| Endpoint Category | Requests/min | Burst |
|-------------------|--------------|-------|
| Trading           | 30           | 10    |
| Public            | 100          | 30    |
| Webhooks          | 10           | 5     |
| Auth              | 10           | 3     |

### Headers в ответе

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1709875200
Retry-After: 30  # при превышении лимита
```

### Пример ответа при превышении лимита

```json
{
  "error": "Rate limit exceeded",
  "retryAfter": 30,
  "message": "Too many requests. Try again in 30 seconds."
}
```

---

## Error Handling

### Коды ошибок

| Code | Description |
|------|-------------|
| 400  | Bad Request - неверные параметры |
| 401  | Unauthorized - требуется аутентификация |
| 403  | Forbidden - доступ запрещён |
| 404  | Not Found - ресурс не найден |
| 429  | Too Many Requests - превышен rate limit |
| 500  | Internal Server Error |
| 503  | Service Unavailable |

### Стандартный формат ошибки

```typescript
interface ErrorResponse {
  success: false;
  error: string;           // Краткое описание
  details?: string;        // Дополнительная информация
  errorCode?: string;      // Код ошибки для программной обработки
}
```

### Коды ошибок (errorCode)

| Code | Description |
|------|-------------|
| `AUTH_REQUIRED` | Требуется аутентификация |
| `INVALID_CREDENTIALS` | Неверные учётные данные |
| `INSUFFICIENT_BALANCE` | Недостаточно средств |
| `RISK_LIMIT_EXCEEDED` | Превышен лимит риска |
| `ORDER_FAILED` | Ошибка создания ордера |
| `VALIDATION_ERROR` | Ошибка валидации данных |
| `ML_SERVICE_UNAVAILABLE` | ML сервис недоступен |

---

## API Categories

---

## 1. Trading API

Endpoints для управления торговыми операциями.

### 1.1 Open Position

**POST** `/api/trade/open`

Открывает новую позицию с проверками риска.

#### Request Body

```typescript
interface TradeRequest {
  symbol: string;           // "BTCUSDT"
  direction: "LONG" | "SHORT";
  amount: number;           // Margin в USDT
  leverage: number;         // 1-125
  stopLoss?: number | null;
  takeProfit?: number | null;
  isDemo: boolean;
  accountId?: string;
  exchangeId?: string;
  orderType?: "market" | "limit";
  price?: number;           // Для limit ордеров
  clientOrderId?: string;   // Для идемпотентности
  tradingMode?: "LIVE" | "TESTNET" | "DEMO";
}
```

#### Response

```typescript
interface TradeResponse {
  success: true;
  trade: {
    id: string;
    symbol: string;
    direction: string;
    entryPrice: number;
    amount: number;
    leverage: number;
    status: string;
  };
  position: {
    id: string;
    symbol: string;
    direction: string;
    totalAmount: number;
    avgEntryPrice: number;
    leverage: number;
    stopLoss?: number;
    takeProfit?: number;
    liquidationPrice: number;
  };
  tradingMode: string;
  idempotencyKey: string;
  message: string;
}
```

#### Пример curl

```bash
curl -X POST https://api.citarion.io/api/trade/open \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ck_xxx" \
  -d '{
    "symbol": "BTCUSDT",
    "direction": "LONG",
    "amount": 100,
    "leverage": 10,
    "stopLoss": 65000,
    "takeProfit": 72000,
    "isDemo": true
  }'
```

---

### 1.2 Close Position

**POST** `/api/trade/close`

Закрывает существующую позицию.

#### Request Body

```typescript
interface CloseTradeRequest {
  positionId: string;
  closePrice?: number;
  closeReason?: "MANUAL" | "TP" | "SL" | "TRAILING_STOP";
  quantity?: number;  // Частичное закрытие
}
```

#### Response

```typescript
interface CloseResponse {
  success: true;
  position: {
    id: string;
    symbol: string;
    direction: string;
    status: "CLOSED";
    entryPrice: number;
    exitPrice: number;
  };
  pnl: {
    value: number;
    percent: number;
    gross: number;
    fee: number;
  };
  closeReason: string;
  message: string;
}
```

---

### 1.3 Close All Positions

**POST** `/api/trade/close-all`

Закрывает все открытые позиции.

#### Request Body

```typescript
interface CloseAllRequest {
  symbol?: string;        // Фильтр по символу
  direction?: "LONG" | "SHORT";
  exchangeId?: string;
  isDemo?: boolean;
}
```

#### Response

```typescript
interface CloseAllResponse {
  success: true;
  closedCount: number;
  totalPnL: number;
  positions: Array<{
    id: string;
    symbol: string;
    direction: string;
    entryPrice: number;
    exitPrice: number;
    pnl: number;
  }>;
  message: string;
}
```

---

### 1.4 Get Positions

**GET** `/api/trade/open`

Получает список открытых позиций.

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| demo | boolean | Фильтр по demo/real |
| accountId | string | ID аккаунта |
| tradingMode | string | LIVE/DEMO/TESTNET |

#### Response

```typescript
interface PositionsResponse {
  success: true;
  positions: Position[];
  count: number;
  authType: string;
}
```

---

### 1.5 Get Trade Info

**GET** `/api/trade`

Получает информацию о торговле и открытых позициях с бирж.

#### Response

```typescript
interface TradeInfoResponse {
  success: true;
  positions: ExchangePosition[];
  count: number;
}
```

---

### 1.6 Real Trading (Advanced)

**POST** `/api/trade`

Продвинутый endpoint для реальной торговли с полным управлением ордерами.

#### Request Body

```typescript
interface RealTradeRequest {
  symbol: string;
  side: "BUY" | "SELL";
  type: "MARKET" | "LIMIT";
  quantity: number;
  price?: number;
  leverage?: number;
  marginMode?: "ISOLATED" | "CROSSED";
  stopLoss?: number;
  takeProfit?: number;
  reduceOnly?: boolean;
  clientOrderId?: string;
  exchangeId?: string;
  accountId?: string;
  maxPositionSize?: number;
  maxRiskPercent?: number;
}
```

---

### 1.7 Demo Trade

**POST** `/api/demo/trade`

Создаёт demo позицию без аутентификации.

#### Request Body

```typescript
interface DemoTradeRequest {
  symbol: string;
  direction: "LONG" | "SHORT";
  entryPrices?: number[];
  takeProfits?: { price: number; percentage: number }[];
  stopLoss?: number;
  leverage?: number;
  marketType?: "SPOT" | "FUTURES";
  amount?: number;
  exchangeId?: string;
}
```

---

### 1.8 Demo Close

**POST** `/api/demo/close`

Закрывает demo позицию.

---

### 1.9 Demo Close All

**POST** `/api/demo/close-all`

Закрывает все demo позиции.

---

### 1.10 Get Trades History

**GET** `/api/trades`

Получает историю сделок с расширенной фильтрацией.

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Страница |
| limit | number | 20 | Записей на странице (max 100) |
| cursor | string | - | Cursor для пагинации |
| symbol | string | - | Фильтр по символу |
| direction | string | - | LONG/SHORT |
| status | string | - | PENDING/OPEN/CLOSED/CANCELLED |
| isDemo | boolean | - | Demo/Real |
| exchangeId | string | - | Биржа |
| dateFrom | string | - | Начальная дата |
| dateTo | string | - | Конечная дата |
| pnlMin | number | - | Минимальный PnL |
| pnlMax | number | - | Максимальный PnL |
| sortBy | string | createdAt | Поле сортировки |
| sortOrder | string | desc | asc/desc |
| statsOnly | boolean | false | Только статистика |

#### Response

```typescript
interface TradesResponse {
  success: true;
  data: Trade[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    cursor: string | null;
  };
  stats: TradeStats;
}
```

---

### 1.11 Export Trades

**POST** `/api/trades`

Экспорт сделок в CSV или JSON.

#### Request Body

```typescript
interface ExportRequest {
  format: "json" | "csv";
  filter: TradeFilter;
}
```

---

### 1.12 Delete Trades

**DELETE** `/api/trades?ids=id1,id2,id3`

Массовое удаление закрытых сделок.

---

## 2. Bots API

Управление торговыми ботами.

### 2.1 List All Bots

**GET** `/api/bots`

Получает список всех ботов и системный статус.

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| category | string | Категория ботов |

#### Response

```typescript
interface BotsResponse {
  bots: BotInfo[];
  systemStatus: {
    totalBots: number;
    runningBots: number;
    stoppedBots: number;
  };
}
```

---

### 2.2 Grid Bot API

#### List Grid Bots

**GET** `/api/bots/grid`

#### Create Grid Bot

**POST** `/api/bots/grid`

```typescript
interface GridBotRequest {
  name: string;
  symbol: string;
  exchange: string;
  accountType: "DEMO" | "REAL";
  gridLevels: number;
  upperPrice: number;
  lowerPrice: number;
  gridType: "arithmetic" | "geometric";
  positionSize: number;
  positionSizeType: "fixed" | "percentage";
  leverage?: number;
  trailingEnabled?: boolean;
  trailingActivationPercent?: number;
  trailingDistancePercent?: number;
  maxDrawdown?: number;
  stopLossPercent?: number;
  takeProfitPercent?: number;
}
```

---

### 2.3 DCA Bot API

#### List DCA Bots

**GET** `/api/bots/dca`

#### Create DCA Bot

**POST** `/api/bots/dca`

```typescript
interface DCABotRequest {
  name: string;
  symbol: string;
  exchange: string;
  accountType: "DEMO" | "REAL";
  baseOrderAmount: number;
  baseOrderType: "fixed" | "percentage";
  safetyOrdersEnabled: boolean;
  safetyOrdersCount: number;
  safetyOrderPriceDeviation: number;
  safetyOrderVolumeScale: number;
  maxSafetyOrders: number;
  takeProfitEnabled: boolean;
  takeProfitPercent: number;
  stopLossEnabled: boolean;
  stopLossPercent: number;
  trailingStopEnabled: boolean;
  leverage?: number;
  maxDrawdown?: number;
}
```

#### Get DCA Bot by ID

**GET** `/api/bots/dca/[id]`

---

### 2.4 BB Bot API (Bollinger Bands)

#### List BB Bots

**GET** `/api/bots/bb`

#### Create BB Bot

**POST** `/api/bots/bb`

```typescript
interface BBBotRequest {
  userId?: string;
  accountId?: string;
  name: string;
  description?: string;
  symbol: string;
  exchangeId?: string;
  marketType?: "SPOT" | "FUTURES";
  timeframes?: string[];      // max 3
  direction?: "LONG" | "SHORT" | "BOTH";
  tradeAmount?: number;
  leverage?: number;
  marginMode?: "ISOLATED" | "CROSSED" | "CASH";
  stopLoss?: number;
  takeProfit?: number;
  trailingStop?: TrailingStopConfig;
  timeframeConfigs?: TimeframeConfig[];
  isManualMode?: boolean;
  manualEntryPrice?: number;
  manualTargets?: ManualTarget[];
  manualStopLoss?: number;
}
```

#### Update BB Bot Status

**PATCH** `/api/bots/bb`

```typescript
interface BBBotStatusRequest {
  botId: string;
  action: "start" | "stop" | "pause" | "delete";
}
```

#### Get BB Bot Signals

**GET** `/api/bots/bb/signals`

---

### 2.5 Argus Bot API (Pump/Dump Detection)

#### List Argus Bots

**GET** `/api/bots/argus`

#### Create Argus Bot

**POST** `/api/bots/argus`

```typescript
interface ArgusBotRequest {
  name?: string;
  exchange?: string;
  accountId?: string;
  enable5Long?: boolean;
  enable5Short?: boolean;
  enable12Long?: boolean;
  enable12Short?: boolean;
  pumpThreshold5m?: number;
  pumpThreshold15m?: number;
  dumpThreshold5m?: number;
  dumpThreshold15m?: number;
  maxMarketCap?: number;
  minMarketCap?: number;
  useImbalanceFilter?: boolean;
  imbalanceThreshold?: number;
  leverage?: number;
  positionSize?: number;
  stopLoss5?: number;
  stopLoss12?: number;
  takeProfit5?: number[];
  takeProfit12?: number[];
  useTrailing?: boolean;
  cooldownMinutes?: number;
  notifyOnSignal?: boolean;
  notifyOnTrade?: boolean;
}
```

#### Update Argus Bot

**PUT** `/api/bots/argus`

#### Delete Argus Bot

**DELETE** `/api/bots/argus?id=<botId>`

---

### 2.6 Vision Bot API (ML Forecasting)

#### Get Vision Bot Status

**GET** `/api/bots/vision`

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| action | string | status/forecast/ml-status/training-stats/bot |
| botId | string | ID бота (для action=bot) |
| symbol | string | Символ (для action=forecast) |
| timeframe | string | Таймфрейм |
| lookbackDays | number | Дней для анализа |

#### Create Vision Bot

**POST** `/api/bots/vision`

```typescript
interface VisionBotRequest {
  action: "create" | "start" | "forecast" | "train" | "update-outcomes";
  config?: VisionBotConfig;
  mlConfig?: MLConfig;
  botId?: string;
  symbol?: string;
  timeframe?: string;
  lookbackDays?: number;
  epochs?: number;
  batchSize?: number;
}
```

#### Update Vision Bot

**PUT** `/api/bots/vision`

#### Delete Vision Bot

**DELETE** `/api/bots/vision?botId=<id>`

---

### 2.7 Range Bot API

**GET** `/api/bots/range`

**POST** `/api/bots/range`

```typescript
interface RangeBotRequest {
  action: "update" | "analyze" | "execute" | "close" | "config" | "simulate";
  config?: RangeConfig;
  price?: number;
  high?: number;
  low?: number;
  volume?: number;
  prices?: number[];
  signal?: Signal;
  positionId?: string;
}
```

---

### 2.8 Active Bots Summary

**GET** `/api/bots/active`

Получает сводку по всем активным ботам.

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| userId | string | ID пользователя |
| type | string | grid/dca/bb |

#### Response

```typescript
interface ActiveBotsResponse {
  success: true;
  bots: {
    grid: GridBot[];
    dca: DCABot[];
    bb: BBBot[];
  };
}
```

---

### 2.9 Bot Control (Start/Stop/Pause)

**GET** `/api/bots/control`

Получает активные экземпляры ботов.

**POST** `/api/bots/control`

```typescript
interface BotControlRequest {
  action: "start" | "stop" | "pause" | "resume" | "test-connection";
  botId?: string;
  botType?: "grid" | "dca" | "bb" | "vision";
  accountId?: string;
  mode?: "DEMO" | "LIVE" | "TESTNET";
  config?: Record<string, unknown>;
  exchangeId?: string;
  marketType?: string;
  apiKey?: string;
  apiSecret?: string;
  passphrase?: string;
}
```

**PATCH** `/api/bots/control`

```typescript
interface BotTradeRequest {
  botId: string;
  action: "trade";
  trade: {
    symbol: string;
    side: "BUY" | "SELL";
    type?: "MARKET" | "LIMIT";
    amount: number;
    price?: number;
    reason?: string;
  };
}
```

---

### 2.10 LOGOS Meta Bot API

**GET** `/api/bots/logos`

**POST** `/api/bots/logos`

```typescript
interface LogosRequest {
  action: "start" | "stop" | "configure" | "inject_signal" | 
          "switch_strategy" | "get_regime" | "get_strategy_profile" |
          "update_market_data" | "get_strategy_profiles" | 
          "get_switch_history" | "record_outcome";
  config?: LOGOSEngineConfig;
  regime?: "TRENDING" | "RANGING" | "VOLATILE" | "QUIET";
  candles?: Candle[];
  symbol?: string;
  exchange?: string;
  pnl?: number;
  win?: boolean;
  limit?: number;
}
```

---

### 2.11 Frequency Bots API

**GET** `/api/bots/frequency`

---

### 2.12 Grid Worker

**GET** `/api/bots/grid-worker`

---

### 2.13 Institutional Bots API

**GET** `/api/institutional-bots`

**GET** `/api/institutional-bots/[code]/start`

**GET** `/api/institutional-bots/[code]/stop`

---

### 2.14 Bot Config API

**GET** `/api/bot/config`

**POST** `/api/bot/config`

---

### 2.15 Trend Bot API

**GET** `/api/trend-bot`

---

### 2.16 Bot by Type

**GET** `/api/bots/[botType]`

---

### 2.17 Grid Bot Pause/Resume

**POST** `/api/bots/grid/[id]/pause`

**POST** `/api/bots/grid/[id]/resume`

---

### 2.18 Grid Bot by ID

**GET** `/api/bots/grid/[id]`

---

### 2.19 Institutional Bot by Type/ID

**GET** `/api/bots/institutional/[botType]/[id]`

---

### 2.20 DCA Bot by ID

**GET** `/api/bots/dca/[id]`

---

## 3. ML API

Machine Learning endpoints для анализа и прогнозирования.

### 3.1 Signal Prediction

**POST** `/api/ml/predict/signal`

Прогнозирует направление сигнала.

```typescript
interface SignalPredictRequest {
  features: Record<string, number>;
  symbol?: string;
  timeframe?: string;
}
```

---

### 3.2 Price Prediction

**POST** `/api/ml/predict/price`

Прогнозирует цену.

```typescript
interface PricePredictRequest {
  symbol: string;
  timeframe: string;
  horizon: number;  // Количество свечей вперёд
}
```

---

### 3.3 Regime Prediction

**POST** `/api/ml/predict/regime`

Определяет рыночный режим.

---

### 3.4 Train Model

**POST** `/api/ml/train`

Обучает классификатор.

```typescript
interface TrainRequest {
  samples?: TrainingSample[];
  signal?: SignalForFiltering;
  outcome?: "LONG" | "SHORT" | "NEUTRAL";
  correct?: boolean;
}
```

**GET** `/api/ml/train` - Экспорт обучающих данных

**PUT** `/api/ml/train` - Импорт обучающих данных

**DELETE** `/api/ml/train` - Очистка данных

---

### 3.5 Get Models

**GET** `/api/ml/models`

Получает список доступных ML моделей.

---

### 3.6 ML Filter

**POST** `/api/ml/filter`

Фильтрует сигнал через ML pipeline.

```typescript
interface MLFilterRequest {
  signal: SignalForFiltering;
  config?: Partial<MLFilterConfig>;
}
```

**GET** `/api/ml/filter` - Конфигурация и статистика

**PUT** `/api/ml/filter` - Обновление конфигурации

---

### 3.7 Classification

**POST** `/api/ml/classify`

Lawrence Classifier классификация.

```typescript
interface ClassifyRequest {
  symbol: string;
  timeframe: string;
  priceData: {
    high: number[];
    low: number[];
    close: number[];
    volume?: number[];
  };
  config?: {
    usePlattScaling?: boolean;
    useKernelSmoothing?: boolean;
    useSessionFilter?: boolean;
    minConfidence?: number;
    minProbability?: number;
  };
}
```

**GET** `/api/ml/classify` - Статистика классификатора

---

### 3.8 Gradient Boosting Score

**POST** `/api/ml/gradient-boosting/score`

Оценка сигнала через Gradient Boosting.

```typescript
interface ScoreRequest {
  features: Partial<SignalFeatures>;
  source?: string;
  symbol?: string;
}
```

---

### 3.9 Gradient Boosting Stats

**GET** `/api/ml/gradient-boosting/stats`

---

### 3.10 Gradient Boosting Realtime

**GET** `/api/ml/gradient-boosting/realtime`

---

### 3.11 Gradient Boosting History

**GET** `/api/ml/gradient-boosting/history`

---

### 3.12 ML Stats

**GET** `/api/ml/stats`

---

### 3.13 ML Pipeline

**GET** `/api/ml/pipeline`

**POST** `/api/ml/pipeline`

---

### 3.14 ML Pipeline Test

**POST** `/api/ml/pipeline-test`

---

### 3.15 ML Training

**GET** `/api/ml/training`

**POST** `/api/ml/training`

---

### 3.16 ML Bot Integration

**GET** `/api/ml/bot-integration`

**POST** `/api/ml/bot-integration`

---

### 3.17 ML Pipeline (Legacy)

**GET** `/api/ml-pipeline`

**POST** `/api/ml-pipeline`

---

## 4. Risk Management API

### 4.1 Risk Report

**GET** `/api/risk`

Получает полный отчёт по рискам.

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| action | string | report/killswitch/bots/exchanges/positions |

---

### 4.2 Update Risk

**POST** `/api/risk`

```typescript
interface RiskRequest {
  action: "update" | "configure" | "killswitch_trigger" | 
          "killswitch_arm" | "killswitch_disarm" | 
          "initialize" | "start" | "stop";
  config?: Partial<RiskServiceConfig>;
  portfolio?: PortfolioData;
  reason?: string;  // Для killswitch_trigger
}
```

---

### 4.3 Risk Metrics

**GET** `/api/risk/metrics`

Получает детальные метрики риска.

#### Response

```typescript
interface RiskMetricsResponse {
  metrics: {
    totalExposure: number;
    maxExposure: number;
    currentDrawdown: number;
    maxDrawdown: number;
    leverage: number;
    maxLeverage: number;
    openPositions: number;
    maxPositions: number;
    dailyPnL: number;
    dailyLossLimit: number;
  };
  alerts: RiskAlert[];
  positions: PositionRisk[];
}
```

---

### 4.4 Killswitch Arm

**POST** `/api/risk/killswitch/arm`

Взводит kill switch.

---

### 4.5 Killswitch Disarm

**POST** `/api/risk/killswitch/disarm`

Отключает kill switch.

---

### 4.6 Killswitch Trigger

**POST** `/api/risk/killswitch/trigger`

Активирует kill switch и останавливает всех ботов.

```typescript
interface KillswitchTriggerRequest {
  reason?: string;
}
```

---

### 4.7 Killswitch Recover

**POST** `/api/risk/killswitch/recover`

Восстанавливает систему после kill switch.

---

## 5. Signals API

### 5.1 Get Signals

**GET** `/api/signals`

Получает агрегированные сигналы от LOGOS.

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| bot | string | Фильтр по боту |
| limit | number | Максимум сигналов (default 50) |

---

### 5.2 Publish Signal

**POST** `/api/signals`

Публикует сигнал во внутреннюю шину.

---

### 5.3 Get Signal

**GET** `/api/signal`

---

### 5.4 Get Processed Signals

**GET** `/api/signals/processed`

---

## 6. Exchange API

### 6.1 List Exchanges

**GET** `/api/exchange`

Получает список подключённых бирж.

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| accountType | string | DEMO/REAL |

---

### 6.2 Connect Exchange

**POST** `/api/exchange`

```typescript
interface ConnectExchangeRequest {
  exchangeId: string;
  exchangeType?: "spot" | "futures";
  exchangeName?: string;
  apiKey: string;
  apiSecret: string;
  apiPassphrase?: string;
  apiUid?: string;
  subAccount?: string;
  isTestnet?: boolean;
  accountType?: "DEMO" | "REAL";
}
```

---

### 6.3 Update Exchange

**PUT** `/api/exchange`

---

### 6.4 Disconnect Exchange

**DELETE** `/api/exchange?id=<accountId>`

---

### 6.5 Verify Exchange

**POST** `/api/exchange/verify`

Проверяет подключение к бирже.

```typescript
interface VerifyRequest {
  accountId: string;
}
```

---

### 6.6 Exchange Connection

**GET** `/api/exchange/connection`

---

### 6.7 Test Exchange

**GET** `/api/test-exchange`

---

## 7. Analytics API

### 7.1 PnL Stats

**GET** `/api/pnl-stats`

Получает статистику PnL.

---

### 7.2 Metrics

**GET** `/api/metrics`

Системные метрики.

---

### 7.3 Funding Rate

**GET** `/api/funding`

Получает funding rates.

---

### 7.4 Volatility

**GET** `/api/volatility`

Получает данные о волатильности.

---

### 7.5 Volatility Service

**GET** `/api/volatility/service`

**POST** `/api/volatility/service`

---

### 7.6 Trade Events

**GET** `/api/trade-events`

---

### 7.7 Indicators

**GET** `/api/indicators`

**POST** `/api/indicators`

**GET** `/api/indicators/[id]`

**POST** `/api/indicators/execute`

---

### 7.8 RL Agents

**GET** `/api/rl/agents`

---

### 7.9 RL Predict

**POST** `/api/rl/predict`

---

### 7.10 RL Train

**GET** `/api/rl/train/start`

**GET** `/api/rl/train/status`

**GET** `/api/rl/train/stop`

---

## 8. Cron API

### 8.1 Run Cron Jobs

**GET** `/api/cron`

Запускает все фоновые воркеры один раз.

#### Response

```typescript
interface CronResponse {
  success: true;
  timestamp: string;
  duration: string;
  results: {
    gridWorker: { executed: boolean; botsProcessed: number };
    positionMonitor: { executed: boolean };
  };
  workers: {
    gridWorker: "running" | "stopped";
    positionMonitor: "active";
  };
}
```

---

### 8.2 Manage Cron Jobs

**POST** `/api/cron`

```typescript
interface CronRequest {
  action: "start" | "stop" | "status";
  workers?: ("grid" | "position")[];
}
```

---

### 8.3 Run All Bots

**GET** `/api/cron/all`

**POST** `/api/cron/all`

Запускает обработку всех ботов (Grid, DCA, Position Monitor).

```typescript
interface CronAllRequest {
  tasks?: ("grid" | "dca" | "positions")[];
}
```

---

### 8.4 Position Sync Cron

**GET** `/api/cron/position-sync`

**POST** `/api/cron/position-sync`

---

### 8.5 Sync Cron

**GET** `/api/cron/sync`

---

### 8.6 DCA Cron

**GET** `/api/cron/dca`

---

### 8.7 Grid Cron

**GET** `/api/cron/grid`

---

### 8.8 OHLCV Sync Cron

**GET** `/api/cron/ohlcv-sync`

---

## 9. Data Management API

### 9.1 Prices

**GET** `/api/prices`

Получает текущие цены.

#### Response

```typescript
interface PricesResponse {
  success: true;
  prices: Record<string, {
    symbol: string;
    price: number;
    change24h: number;
    high24h: number;
    low24h: number;
    volume24h: number;
  }>;
  timestamp: number;
  source: "demo" | "cache" | "api";
}
```

**POST** `/api/prices` - Получить цену конкретного символа

---

### 9.2 OHLCV Data

**GET** `/api/ohlcv`

Получает свечные данные.

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| symbol | string | BTCUSDT | Торговая пара |
| interval | string | 1h | Таймфрейм |
| limit | number | 500 | Максимум свечей (max 1500) |
| exchange | string | binance | Биржа |
| marketType | string | futures | spot/futures |
| forceFetch | boolean | false | Принудительный fetch |

#### Response

```typescript
interface OHLCVResponse {
  success: true;
  source: "database" | "api";
  symbol: string;
  interval: string;
  exchange: string;
  marketType: string;
  count: number;
  ohlcv: [number, number, number, number, number, number][];
  // [timestamp, open, high, low, close, volume]
}
```

**POST** `/api/ohlcv` - Синхронизация исторических данных

---

### 9.3 Backup Management

**GET** `/api/backup`

Получает список бэкапов.

#### Query Parameters

| Parameter | Type | Default |
|-----------|------|---------|
| page | number | 1 |
| limit | number | 20 |
| status | string | - |
| type | string | - |
| scope | string | - |
| search | string | - |
| startDate | string | - |
| endDate | string | - |
| sortBy | string | createdAt |
| sortOrder | string | desc |

**POST** `/api/backup`

```typescript
interface BackupRequest {
  name?: string;
  description?: string;
  type: "full" | "incremental" | "differential";
  scope: "database" | "config" | "logs" | "all";
  tables?: string[];
  retentionDays?: number;
  compress?: boolean;
  encrypt?: boolean;
}
```

**DELETE** `/api/backup?id=<backupId>`

---

### 9.4 Backup Restore

**POST** `/api/backup/restore`

---

### 9.5 Backup Schedules

**GET** `/api/backup/schedules`

---

### 9.6 Files List

**GET** `/api/files/list`

---

### 9.7 Files Download

**GET** `/api/files/download`

---

### 9.8 Journal

**GET** `/api/journal`

**POST** `/api/journal`

**GET** `/api/journal/[id]`

---

### 9.9 News

**GET** `/api/news`

**GET** `/api/news/sources`

**GET** `/api/news/bookmarks`

**GET** `/api/news/alerts`

---

### 9.10 Paper Trading

**POST** `/api/paper-trading/create`

---

## 10. Telegram API

### 10.1 Webhook Handler

**GET** `/api/telegram/webhook`

Информация о webhook.

**POST** `/api/telegram/webhook`

Обрабатывает входящие сообщения от Telegram.

---

### 10.2 Settings

**GET** `/api/telegram/settings`

**POST** `/api/telegram/settings`

```typescript
interface TelegramSettingsRequest {
  chatId?: string;
  settings?: {
    notifyOnEntry: boolean;
    notifyOnExit: boolean;
    notifyOnSL: boolean;
    notifyOnTP: boolean;
    notifyOnSignal: boolean;
    notifyOnExternal: boolean;
  };
}
```

---

### 10.3 Set Commands

**POST** `/api/telegram/set-commands`

---

### 10.4 Set Webhook

**POST** `/api/telegram/set-webhook`

---

## 11. User/Account API

### 11.1 Account Management

**GET** `/api/account/reset-balance`

---

### 11.2 Master Trader

**GET** `/api/master-trader`

---

### 11.3 Market Settings

**GET** `/api/market-settings`

---

### 11.4 2FA Authentication

**GET** `/api/auth/2fa`

Получает статус 2FA.

**POST** `/api/auth/2fa`

```typescript
interface TwoFARequest {
  action: "setup" | "verify" | "enable" | "disable" | "backup-codes";
  code?: string;
  secret?: string;
  backupCodes?: string[];
  isBackupCode?: boolean;
}
```

---

## 12. Auto-Trading API

### 12.1 Execute Auto-Trading

**GET** `/api/auto-trading/execute`

Получает статистику исполнения.

**POST** `/api/auto-trading/execute`

```typescript
interface AutoTradingRequest {
  signalId: string;
  botConfigId: string;
  currentPrice?: number;
  enableMetrics?: boolean;
}
```

---

### 12.2 First Entry

**GET** `/api/auto-trading/first-entry`

---

### 12.3 TP Grace

**GET** `/api/auto-trading/tp-grace`

---

## 13. Copy Trading API

### 13.1 Get Copy Trading Status

**GET** `/api/copy-trading`

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| exchange | string | Фильтр по бирже |

#### Response

```typescript
interface CopyTradingResponse {
  success: true;
  data: {
    exchange: string;
    isLeadTrader: boolean;
    followersCount: number;
    subscriptions: number;
    apiSupport: {
      publicApi: boolean;
      subscribe: boolean;
      manageFollowers: boolean;
    };
  }[];
  apiSupport: Record<string, ApiSupport>;
  totalConnections: number;
  activeSubscriptions: number;
}
```

---

### 13.2 Get Traders

**GET** `/api/copy-trading/traders`

---

### 13.3 Get Positions

**GET** `/api/copy-trading/positions`

---

### 13.4 Subscribe

**POST** `/api/copy-trading/subscribe`

---

## 14. Other APIs

### 14.1 TradingView Webhook

**GET** `/api/webhook/tradingview`

Информация о webhook и форматы сигналов.

**POST** `/api/webhook/tradingview`

Принимает сигналы от TradingView с валидацией подписи.

---

### 14.2 Hyperopt

**POST** `/api/hyperopt/run`

Запускает оптимизацию гиперпараметров.

```typescript
interface HyperoptRequest {
  strategyId: string;
  tacticsSet?: string[];
  symbol: string;
  timeframe?: string;
  initialBalance?: number;
  method?: "RANDOM" | "GRID" | "TPE" | "GENETIC";
  objective?: "sharpeRatio" | "sortinoRatio" | "calmarRatio" | "totalReturn";
  maxEvals?: number;
  days?: number;
  exchange?: string;
  marketType?: string;
  strategyParams?: Record<string, unknown>;
}
```

---

### 14.3 Genetic Algorithm

**GET** `/api/ga/optimize`

**POST** `/api/ga/optimize`

```typescript
interface GARequest {
  botCode: string;
  botType: "DCA" | "BB" | "ORION" | "LOGOS" | "GRID" | "MFT";
  symbol: string;
  geneTemplate?: Gene[];
  config?: Partial<GeneticConfig>;
  constraints?: Constraint[];
  volatilityAware?: boolean;
}
```

**GET** `/api/ga/progress`

**POST** `/api/ga/apply`

---

### 14.4 Backtesting

**POST** `/api/backtesting/run`

```typescript
interface BacktestRequest {
  strategyId: string;
  strategyParams?: Record<string, unknown>;
  tacticsSet: string[];
  symbol: string;
  timeframe?: string;
  initialBalance?: number;
  days?: number;
  exchange?: string;
  marketType?: string;
}
```

---

### 14.5 Notifications (SSE)

**GET** `/api/notifications`

Server-Sent Events для real-time уведомлений.

#### Response Headers

```http
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

#### Event Types

```typescript
type NotificationType =
  | "POSITION_OPENED"
  | "POSITION_CLOSED"
  | "ORDER_FILLED"
  | "ORDER_REJECTED"
  | "TP_HIT"
  | "SL_HIT"
  | "TRAILING_ACTIVATED"
  | "KILLSWITCH_TRIGGERED"
  | "SIGNAL_RECEIVED"
  | "WARNING";
```

---

### 14.6 Position Sync

**GET** `/api/positions/sync`

**POST** `/api/positions/sync`

---

### 14.7 Position Escort

**GET** `/api/positions/escort`

**POST** `/api/positions/escort`

**PUT** `/api/positions/escort`

**DELETE** `/api/positions/escort?positionId=<id>`

---

### 14.8 Orders Reconcile

**GET** `/api/orders/reconcile`

---

### 14.9 Chat Parse Signal

**POST** `/api/chat/parse-signal`

---

### 14.10 Cornix Integration

**GET** `/api/cornix/metrics`

**GET** `/api/cornix/sync`

**GET** `/api/cornix/signals`

**GET** `/api/cornix/positions`

**GET** `/api/cornix/features`

---

### 14.11 Strategy Templates

**GET** `/api/strategy-templates`

---

### 14.12 Exchange Stream

**GET** `/api/bots/exchange-stream`

---

---

## Общие типы данных

### Position

```typescript
interface Position {
  id: string;
  accountId: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  status: "OPEN" | "CLOSED" | "LIQUIDATED";
  totalAmount: number;
  filledAmount: number;
  avgEntryPrice: number;
  currentPrice: number | null;
  leverage: number;
  stopLoss: number | null;
  takeProfit: number | null;
  unrealizedPnl: number;
  realizedPnl: number;
  isDemo: boolean;
  source?: string;
  escortEnabled?: boolean;
  escortStatus?: string;
  trailingStop?: string;
  trailingActivated?: boolean;
  createdAt: Date;
  closedAt?: Date;
}
```

### Trade

```typescript
interface Trade {
  id: string;
  userId: string;
  accountId: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  action?: "BUY" | "SELL";
  status: "PENDING" | "OPEN" | "CLOSED" | "CANCELLED" | "REJECTED";
  entryPrice: number;
  exitPrice?: number;
  entryTime?: Date;
  exitTime?: Date;
  amount: number;
  leverage: number;
  stopLoss?: number;
  pnl?: number;
  pnlPercent?: number;
  fee: number;
  isDemo: boolean;
  signalSource?: string;
  closeReason?: "MANUAL" | "TP" | "SL" | "LIQUIDATION";
}
```

### Signal

```typescript
interface Signal {
  id: string;
  signalId: number;
  source: string;
  sourceMessage?: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  action: "BUY" | "SELL" | "CLOSE";
  marketType: "SPOT" | "FUTURES";
  entryPrices: string;  // JSON array
  entryZone?: string;   // JSON
  takeProfits: string;  // JSON array
  stopLoss?: number;
  leverage?: number;
  leverageType?: string;
  signalType?: "REGULAR" | "BREAKOUT";
  trailingConfig?: string;
  amountPerTrade?: number;
  riskPercentage?: number;
  exchanges?: string;
  status: "PENDING" | "ACTIVE" | "CLOSED" | "CANCELLED";
  positionId?: string;
  processedAt?: Date;
  closedAt?: Date;
  closeReason?: string;
  createdAt: Date;
}
```

### Bot

```typescript
interface Bot {
  id: string;
  name: string;
  symbol: string;
  exchange: string;
  status: "IDLE" | "RUNNING" | "STOPPED" | "PAUSED" | "ERROR";
  isActive: boolean;
  createdAt: Date;
  startedAt?: Date;
  stoppedAt?: Date;
}
```

### RiskReport

```typescript
interface RiskReport {
  timestamp: number;
  var: {
    var: number;
    expectedShortfall: number;
    confidenceLevel: number;
    timeHorizon: number;
    method: string;
  };
  exposure: {
    total: number;
    bySymbol: Record<string, number>;
    byExchange: Record<string, number>;
  };
  drawdown: {
    current: number;
    max: number;
    level: "none" | "warning" | "critical";
  };
  killSwitch: {
    isArmed: boolean;
    isTriggered: boolean;
    botsStopped: number;
  };
  riskScore: number;
  recommendations: string[];
}
```

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | Mar 2026 | Полный справочник 120+ endpoints |
| 1.0.0 | Jan 2026 | Initial release |

---

*Last updated: Март 2026*
