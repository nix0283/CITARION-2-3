# 📊 Торговая система CITARION

**Версия:** 2.0  
**Последнее обновление:** Март 2026  
**Статус:** ✅ Production Ready

---

## 📑 Содержание

1. [Обзор торговой системы](#1-обзор-торговой-системы)
2. [Компоненты](#2-компоненты)
   - [Trading Form](#21-trading-form)
   - [One Click Trading](#22-one-click-trading)
   - [Order Types](#23-order-types)
3. [Режимы торговли](#3-режимы-торговли)
4. [Переключение режимов](#4-переключение-режимов)
5. [API эндпоинты](#5-api-эндпоинты)
6. [Безопасность](#6-безопасность)
7. [Примеры использования](#7-примеры-использования)

---

## 1. Обзор торговой системы

### Архитектура

Торговая система CITARION представляет собой многоуровневую архитектуру для управления торговыми операциями на криптовалютных биржах.

```
┌─────────────────────────────────────────────────────────────┐
│                    TRADING SYSTEM                           │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Trading     │  │ One-Click   │  │ Order       │        │
│  │ Form        │  │ Trading     │  │ Manager     │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                │
│  ┌──────▼────────────────▼────────────────▼──────┐        │
│  │              Trading Mode Controller            │        │
│  │  [DEMO] [PAPER] [TESTNET] [LIVE]               │        │
│  └─────────────────────┬───────────────────────────┘        │
│                        │                                    │
│  ┌─────────────────────▼───────────────────────────┐       │
│  │              Exchange Adapter Layer              │       │
│  │  Binance | Bybit | OKX | Bitget | KuCoin | ...  │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### Ключевые возможности

| Возможность | Описание |
|-------------|----------|
| **Multi-Exchange** | Поддержка 12+ криптобирж |
| **Режимы торговли** | DEMO, PAPER, TESTNET, LIVE |
| **Order Types** | Market, Limit, Stop-Limit, OCO |
| **Кредитное плечо** | 1x - 1000x (зависит от биржи) |
| **Risk Management** | Stop-Loss, Take-Profit, Reduce-Only |
| **One-Click Trading** | Быстрое исполнение с графика |

### Поддерживаемые биржи

| Биржа | ID | Testnet | Demo | Макс. плечо |
|-------|-----|---------|------|-------------|
| Binance | `binance` | ✅ | ❌ | 125x |
| Bybit | `bybit` | ✅ | ❌ | 100x |
| OKX | `okx` | ❌ | ✅ | 125x |
| Bitget | `bitget` | ❌ | ✅ | 125x |
| KuCoin | `kucoin` | ✅ | ❌ | 100x |
| BingX | `bingx` | ❌ | ✅ | 150x |
| HTX (Huobi) | `huobi` | ✅ | ❌ | 100x |
| HyperLiquid | `hyperliquid` | ✅ | ❌ | 50x |
| BitMEX | `bitmex` | ✅ | ❌ | 100x |
| BloFin | `blofin` | ❌ | ✅ | 100x |
| Coinbase | `coinbase` | ✅ | ❌ | 10x |
| Aster DEX | `aster` | ✅ | ✅ | 1000x |

---

## 2. Компоненты

### 2.1 Trading Form

**Файл:** `src/components/trading/trading-form.tsx`

Основной компонент для создания и управления торговыми позициями.

#### Props Interface

```typescript
interface TradingFormProps {
  // Props не требуются - компонент использует глобальный store
}

// Внутреннее состояние компонента:
interface TradingFormState {
  exchange: string;           // Выбранная биржа
  symbol: string;             // Торговая пара
  direction: "LONG" | "SHORT"; // Направление позиции
  amount: string;             // Сумма в USDT
  marginPercent: number;      // Процент маржи (0.5 - 10)
  leverage: number;           // Кредитное плечо
  stopLoss: string;           // Цена Stop Loss
  takeProfit: string;         // Цена Take Profit
  isSubmitting: boolean;      // Флаг отправки заявки
  showConfirmDialog: boolean; // Показ диалога подтверждения
}
```

#### Функциональность

| Функция | Описание |
|---------|----------|
| **Exchange Selection** | Выбор из 12 поддерживаемых бирж |
| **Symbol Selection** | Выбор торговой пары с отображением цены |
| **Direction Toggle** | Переключение LONG/SHORT |
| **Amount Input** | Ввод суммы с quick-select (25%, 50%, 75%, 100%) |
| **Margin Slider** | Настройка процента маржи |
| **Leverage Grid** | Выбор плеча (1x - 1000x для Aster) |
| **SL/TP Setup** | Настройка Stop Loss и Take Profit |
| **Position Preview** | Предпросмотр параметров позиции |
| **Confirmation Dialog** | Диалог подтверждения сделки |

#### Расчёты

```typescript
// Размер позиции с плечом
const leveragedSize = positionSize * leverage;

// Требуемая маржа
const marginRequired = positionSize;

// Оценочная комиссия (0.04% taker fee)
const estimatedFee = leveragedSize * 0.0004;
```

#### Клавиатурные сочетания

| Клавиша | Действие |
|---------|----------|
| `L` | Установить LONG |
| `S` | Установить SHORT |
| `Enter` | Отправить заявку |
| `Esc` | Очистить форму |

#### Пример использования

```tsx
import { TradingForm } from "@/components/trading/trading-form";

export function TradingPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <PriceChart />
      </div>
      <div>
        <TradingForm />
      </div>
    </div>
  );
}
```

---

### 2.2 One Click Trading

**Файл:** `src/components/chart/one-click-trading.tsx`

Компонент для быстрого исполнения сделок непосредственно с графика.

#### Props Interface

```typescript
export interface OneClickTradeParams {
  symbol: string;                    // Торговая пара
  side: "BUY" | "SELL";             // Сторона сделки
  price: number;                     // Цена исполнения
  quantity: number;                  // Количество
  type: "MARKET" | "LIMIT";         // Тип ордера
  stopLoss?: number;                 // Stop Loss цена
  takeProfit?: number;               // Take Profit цена
  reduceOnly?: boolean;              // Только уменьшение позиции
}

export interface OneClickTradingConfig {
  enabled: boolean;                  // Включено ли one-click
  defaultQuantity: number;           // Количество по умолчанию
  defaultType: "MARKET" | "LIMIT";  // Тип ордера по умолчанию
  slippageTolerance: number;         // Допустимое проскальзывание (%)
  showConfirmation: boolean;         // Показывать подтверждение
  quickSizes: number[];              // Quick size percentages [1, 5, 10, 25, 50, 100]
  defaultStopLossPercent?: number;   // SL % от цены входа
  defaultTakeProfitPercent?: number; // TP % от цены входа
}

export interface OneClickTradingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  params: OneClickTradeParams | null;
  onConfirm: (params: OneClickTradeParams) => Promise<void>;
  currentPrice: number;
  balance: number;
  config?: Partial<OneClickTradingConfig>;
}
```

#### Конфигурация по умолчанию

```typescript
const DEFAULT_CONFIG: OneClickTradingConfig = {
  enabled: false,           // Отключено по умолчанию для безопасности
  defaultQuantity: 0.001,
  defaultType: "MARKET",
  slippageTolerance: 0.5,   // 0.5%
  showConfirmation: true,
  quickSizes: [1, 5, 10, 25, 50, 100],
  defaultStopLossPercent: 2,
  defaultTakeProfitPercent: 4,
};
```

#### Hook для интеграции с графиком

```typescript
export function useOneClickTrading(
  chart: IChartApi | null,
  candleSeries: ISeriesApi<"Candlestick"> | null,
  config: OneClickTradingConfig
) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tradeParams, setTradeParams] = useState<OneClickTradeParams | null>(null);

  // Подписка на клики по графику
  useEffect(() => {
    if (!chart || !candleSeries || !config.enabled) return;

    const handleClick = (param: MouseEventParams) => {
      if (!param.point || !param.time) return;

      const price = param.point.y;
      const suggestedSide: "BUY" | "SELL" = 
        price < currentCandlePrice ? "BUY" : "SELL";

      setTradeParams({
        symbol: "BTCUSDT",
        side: suggestedSide,
        price: price,
        quantity: config.defaultQuantity,
        type: config.defaultType,
      });
      setDialogOpen(true);
    };

    chart.subscribeClick(handleClick);

    return () => {
      chart.unsubscribeClick(handleClick);
    };
  }, [chart, candleSeries, config]);

  return { dialogOpen, setDialogOpen, tradeParams, setTradeParams };
}
```

#### Автоматический расчёт SL/TP

```typescript
// Для BUY позиций
const suggestedSL = currentPrice * (1 - defaultStopLossPercent / 100);
const suggestedTP = currentPrice * (1 + defaultTakeProfitPercent / 100);

// Для SELL позиций
const suggestedSL = currentPrice * (1 + defaultStopLossPercent / 100);
const suggestedTP = currentPrice * (1 - defaultTakeProfitPercent / 100);
```

#### Пример интеграции

```tsx
import { 
  OneClickTradingDialog, 
  useOneClickTrading 
} from "@/components/chart/one-click-trading";

function ChartWithTrading() {
  const chartRef = useRef<IChartApi>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick">>(null);
  
  const { dialogOpen, setDialogOpen, tradeParams } = useOneClickTrading(
    chartRef.current,
    candleSeriesRef.current,
    { enabled: true, showConfirmation: true }
  );

  const handleConfirm = async (params: OneClickTradeParams) => {
    await submitTrade(params);
  };

  return (
    <>
      <PriceChart chartRef={chartRef} candleSeriesRef={candleSeriesRef} />
      <OneClickTradingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        params={tradeParams}
        onConfirm={handleConfirm}
        currentPrice={currentPrice}
        balance={balance}
      />
    </>
  );
}
```

---

### 2.3 Order Types

Система поддерживает следующие типы ордеров:

#### Market Order

```typescript
interface MarketOrder {
  type: "MARKET";
  symbol: string;
  side: "BUY" | "SELL";
  quantity: number;
  reduceOnly?: boolean;
}
```

**Характеристики:**
- Мгновенное исполнение по текущей рыночной цене
- Используется для быстрого входа/выхода
- Может иметь проскальзывание при низкой ликвидности

#### Limit Order

```typescript
interface LimitOrder {
  type: "LIMIT";
  symbol: string;
  side: "BUY" | "SELL";
  quantity: number;
  price: number;
  timeInForce?: "GTC" | "IOC" | "FOK" | "GTX";
  postOnly?: boolean;
  reduceOnly?: boolean;
}
```

**Характеристики:**
- Исполнение по указанной цене или лучше
- Time-in-Force опции:
  - `GTC` (Good Till Cancelled) - до отмены
  - `IOC` (Immediate Or Cancel) - немедленно или отмена
  - `FOK` (Fill Or Kill) - всё или ничего
  - `GTX` (Good Till Crossing) - только maker

#### Stop-Limit Order

```typescript
interface StopLimitOrder {
  type: "STOP_LIMIT";
  symbol: string;
  side: "BUY" | "SELL";
  quantity: number;
  stopPrice: number;      // Цена триггера
  limitPrice: number;     // Цена лимитного ордера
  triggerBy?: "MARK_PRICE" | "LAST_PRICE" | "INDEX_PRICE";
}
```

**Характеристики:**
- Активируется при достижении стоп-цены
- Превращается в лимитный ордер
- Используется для Stop-Loss и входа на пробое

#### OCO Order (One-Cancels-Other)

```typescript
interface OCOOrder {
  type: "OCO";
  symbol: string;
  side: "BUY" | "SELL";
  quantity: number;
  // Take Profit leg
  tpPrice: number;
  tpTriggerPrice?: number;
  // Stop Loss leg
  slTriggerPrice: number;
  slPrice: number;
}
```

**Характеристики:**
- Связка Take Profit и Stop Loss
- При исполнении одного - второй отменяется
- Автоматическое управление рисками

---

## 3. Режимы торговли

### DEMO Mode

```typescript
interface DemoModeConfig {
  virtualBalance: number;       // Виртуальный баланс
  realPrices: boolean;          // Реальные рыночные цены
  slippage: boolean;            // Имитация проскальзывания
  fees: boolean;                // Имитация комиссий
  latency: number;              // Имитация задержки (ms)
}
```

| Характеристика | Значение |
|----------------|----------|
| **Среда** | Виртуальная |
| **Баланс** | Виртуальный USDT |
| **Цены** | Реальные рыночные |
| **Риски** | Отсутствуют |
| **Назначение** | Обучение, тестирование стратегий |

**Особенности:**
- Полная симуляция торгов без реальных денег
- Идеально для новичков
- Без риска потери средств
- Полный функционал торговой системы

### PAPER Mode

```typescript
interface PaperModeConfig {
  virtualBalance: number;
  realPrices: boolean;
  orderBook: "simulated" | "real";
  fillModel: "instant" | "realistic";
  fees: {
    maker: number;
    taker: number;
  };
}
```

| Характеристика | Значение |
|----------------|----------|
| **Среда** | Виртуальная с реалистичной симуляцией |
| **Баланс** | Виртуальный USDT |
| **Цены** | Реальные рыночные |
| **Риски** | Отсутствуют |
| **Назначение** | Тестирование стратегий в реальном времени |

**Особенности:**
- Более реалистичная симуляция чем DEMO
- Учитывает ликвидность и проскальзывание
- Подходит для проверки алгоритмических стратегий
- Доступен на биржах с Demo-режимом (OKX, Bitget, BingX, BloFin, Aster)

### TESTNET Mode

```typescript
interface TestnetModeConfig {
  exchange: string;
  testnetApiUrl: string;
  testnetApiKey: string;
  testnetApiSecret: string;
}
```

| Характеристика | Значение |
|----------------|----------|
| **Среда** | Тестовая сеть биржи |
| **Баланс** | Тестовые токены биржи |
| **Цены** | Тестовые или реальные (зависит от биржи) |
| **Риски** | Минимальные |
| **Назначение** | Интеграционное тестирование API |

**Особенности:**
- Прямое подключение к тестовой сети биржи
- Реальные API вызовы
- Проверка интеграции без риска
- Требуется регистрация на testnet биржи
- Доступен на биржах: Binance, Bybit, KuCoin, HTX, HyperLiquid, BitMEX, Coinbase, Aster

### LIVE Mode

```typescript
interface LiveModeConfig {
  exchange: string;
  apiKey: string;
  apiSecret: string;
  passphrase?: string;         // Для некоторых бирж
  riskChecks: boolean;         // Обязательные проверки риска
  confirmationRequired: boolean;
}
```

| Характеристика | Значение |
|----------------|----------|
| **Среда** | Производственная сеть биржи |
| **Баланс** | Реальные средства |
| **Цены** | Реальные рыночные |
| **Риски** | Полные |
| **Назначение** | Реальная торговля |

**Особенности:**
- Реальная торговля с реальными деньгами
- Все меры безопасности активны
- Подтверждение сделок обязательно
- Полное логирование всех операций

### Сравнение режимов

| Параметр | DEMO | PAPER | TESTNET | LIVE |
|----------|------|-------|---------|------|
| **Среда** | Виртуальная | Виртуальная | Testnet | Production |
| **Баланс** | Виртуальный | Виртуальный | Тестовый | Реальный |
| **Риск** | Нет | Нет | Минимальный | Полный |
| **Цены** | Реальные | Реальные | Зависит | Реальные |
| **API ключи** | Не нужны | Не нужны | Testnet ключи | Live ключи |
| **Логирование** | Базовое | Полное | Полное | Полное + аудит |

---

## 4. Переключение режимов

### Архитектура переключения

```
┌────────────────────────────────────────────────────────┐
│                 Trading Mode Switch                     │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────┐ │
│  │  DEMO    │  │  PAPER   │  │ TESTNET  │  │ LIVE  │ │
│  │  [virtual]│  │ [virtual]│  │ [testnet]│  │ [real]│ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬───┘ │
│       │             │             │            │      │
│       └─────────────┴──────┬──────┴────────────┘      │
│                            │                          │
│                    ┌───────▼───────┐                  │
│                    │  Mode Guard   │                  │
│                    │  (validation) │                  │
│                    └───────┬───────┘                  │
│                            │                          │
│                    ┌───────▼───────┐                  │
│                    │ Exchange      │                  │
│                    │ Adapter       │                  │
│                    └───────────────┘                  │
└────────────────────────────────────────────────────────┘
```

### Реализация в UI

```typescript
// Store
interface AccountState {
  accountType: "DEMO" | "PAPER" | "TESTNET" | "LIVE";
  virtualBalance: Record<string, number>;
  realBalance?: Record<string, number>;
  exchange: string;
  testnetCredentials?: APICredentials;
  liveCredentials?: APICredentials;
}

// Переключение режима
const switchMode = async (
  newMode: "DEMO" | "PAPER" | "TESTNET" | "LIVE",
  exchange?: string
) => {
  // 1. Проверка доступности режима для биржи
  if (!isModeAvailable(exchange, newMode)) {
    throw new Error(`Mode ${newMode} not available on ${exchange}`);
  }

  // 2. Для TESTNET/LIVE требуются API ключи
  if (newMode === "TESTNET" || newMode === "LIVE") {
    const credentials = await getCredentials(newMode);
    if (!credentials) {
      throw new Error("API credentials required");
    }
  }

  // 3. Закрытие открытых позиций (опционально)
  if (hasOpenPositions()) {
    const confirmed = await confirmClosePositions();
    if (!confirmed) return;
  }

  // 4. Переключение режима
  setAccountType(newMode);
  
  // 5. Уведомление
  toast.success(`Switched to ${newMode} mode`);
};
```

### Компонент Mode Switch

```tsx
function TradingModeSwitch() {
  const { accountType, setAccountType, exchange } = useCryptoStore();
  const selectedExchange = EXCHANGES.find(e => e.id === exchange);

  return (
    <Select value={accountType} onValueChange={setAccountType}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="DEMO">
          <div className="flex items-center gap-2">
            <Badge variant="outline">DEMO</Badge>
            <span className="text-xs text-muted-foreground">Virtual</span>
          </div>
        </SelectItem>
        
        {selectedExchange?.hasDemo && (
          <SelectItem value="PAPER">
            <div className="flex items-center gap-2">
              <Badge variant="outline">PAPER</Badge>
              <span className="text-xs text-muted-foreground">Simulated</span>
            </div>
          </SelectItem>
        )}
        
        {selectedExchange?.hasTestnet && (
          <SelectItem value="TESTNET">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">TESTNET</Badge>
              <span className="text-xs text-muted-foreground">Test API</span>
            </div>
          </SelectItem>
        )}
        
        <SelectItem value="LIVE">
          <div className="flex items-center gap-2">
            <Badge variant="destructive">LIVE</Badge>
            <span className="text-xs text-muted-foreground">Real Money</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
```

### Визуальная индикация режима

```tsx
// Badge для отображения текущего режима
function ModeIndicator() {
  const { accountType } = useCryptoStore();

  const variants = {
    DEMO: { variant: "outline", color: "text-blue-500" },
    PAPER: { variant: "outline", color: "text-cyan-500" },
    TESTNET: { variant: "secondary", color: "text-yellow-500" },
    LIVE: { variant: "destructive", color: "text-red-500" },
  };

  return (
    <Badge variant={variants[accountType].variant}>
      <span className={variants[accountType].color}>
        {accountType}
      </span>
    </Badge>
  );
}
```

---

## 5. API эндпоинты

### Торговые операции

#### Открытие позиции

```http
POST /api/trade/open
Content-Type: application/json

{
  "symbol": "BTCUSDT",
  "direction": "LONG",
  "amount": 100,
  "leverage": 10,
  "stopLoss": 95000,
  "takeProfit": 105000,
  "isDemo": true,
  "exchangeId": "binance"
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "ord-123456",
  "positionId": "pos-789012",
  "executedPrice": 98450.50,
  "executedQty": 0.01016,
  "fee": 0.040,
  "timestamp": "2026-03-13T10:30:00Z"
}
```

#### Закрытие позиции

```http
POST /api/trade/close
Content-Type: application/json

{
  "positionId": "pos-789012",
  "quantity": 0.01016,        // Частичное закрытие
  "isDemo": true
}
```

#### Установка SL/TP

```http
POST /api/trade/modify
Content-Type: application/json

{
  "positionId": "pos-789012",
  "stopLoss": 94000,
  "takeProfit": 106000
}
```

### Управление ордерами

#### Создание лимитного ордера

```http
POST /api/orders/limit
Content-Type: application/json

{
  "symbol": "ETHUSDT",
  "side": "BUY",
  "price": 3500,
  "quantity": 1.5,
  "timeInForce": "GTC",
  "postOnly": false,
  "exchangeId": "bybit"
}
```

#### Создание Stop-Limit ордера

```http
POST /api/orders/stop-limit
Content-Type: application/json

{
  "symbol": "BTCUSDT",
  "side": "SELL",
  "stopPrice": 95000,
  "limitPrice": 94900,
  "quantity": 0.1,
  "triggerBy": "LAST_PRICE"
}
```

#### Отмена ордера

```http
DELETE /api/orders/{orderId}
X-Exchange-Id: binance
```

### Получение данных

#### Открытые позиции

```http
GET /api/positions?exchangeId=binance&isDemo=true
```

**Response:**
```json
{
  "positions": [
    {
      "id": "pos-123",
      "symbol": "BTCUSDT",
      "direction": "LONG",
      "quantity": 0.5,
      "entryPrice": 98000,
      "currentPrice": 98500,
      "unrealizedPnl": 250,
      "leverage": 10,
      "liquidationPrice": 89000,
      "stopLoss": 95000,
      "takeProfit": 105000,
      "createdAt": "2026-03-13T08:00:00Z"
    }
  ]
}
```

#### История сделок

```http
GET /api/trades?symbol=BTCUSDT&limit=50&offset=0
```

#### Баланс аккаунта

```http
GET /api/account/balance?exchangeId=binance&mode=DEMO
```

**Response:**
```json
{
  "balances": {
    "USDT": 10000.00,
    "BTC": 0.5,
    "ETH": 2.0
  },
  "totalEquity": 150000.00,
  "availableMargin": 120000.00,
  "usedMargin": 30000.00
}
```

### WebSocket Events

#### Подписка на обновления позиций

```javascript
ws.send(JSON.stringify({
  type: "subscribe",
  channel: "positions",
  exchangeId: "binance"
}));

// Событие обновления
{
  "type": "position_update",
  "data": {
    "id": "pos-123",
    "unrealizedPnl": 500,
    "currentPrice": 99000,
    "liquidationPrice": 89000
  }
}
```

#### Подписка на исполнение ордеров

```javascript
ws.send(JSON.stringify({
  type: "subscribe",
  channel: "order_updates",
  exchangeId: "binance"
}));

// Событие исполнения
{
  "type": "order_filled",
  "data": {
    "orderId": "ord-123",
    "symbol": "BTCUSDT",
    "side": "BUY",
    "price": 98500,
    "quantity": 0.1,
    "fee": 0.004,
    "timestamp": "2026-03-13T10:30:00Z"
  }
}
```

---

## 6. Безопасность

### Меры безопасности

#### Для всех режимов

```typescript
interface SecurityConfig {
  // Валидация входных данных
  inputValidation: {
    maxLeverage: number;          // Макс. плечо
    minOrderSize: number;         // Мин. размер ордера
    maxOrderSize: number;         // Макс. размер ордера
    allowedSymbols: string[];     // Разрешённые пары
  };

  // Rate limiting
  rateLimit: {
    maxRequestsPerMinute: number;
    maxOrdersPerMinute: number;
  };

  // Аудит
  audit: {
    logAllOperations: boolean;
    retentionDays: number;
  };
}
```

#### Для LIVE режима

```typescript
interface LiveSecurityConfig extends SecurityConfig {
  // Двухфакторная аутентификация
  twoFactor: {
    required: boolean;
    methods: ("totp" | "sms" | "email")[];
  };

  // Подтверждение сделок
  confirmation: {
    required: boolean;
    timeoutMs: number;           // Таймаут подтверждения
    requiredForLargeOrders: boolean;
    largeOrderThreshold: number; // Порог для "большого" ордера
  };

  // Kill Switch
  killSwitch: {
    enabled: boolean;
    triggerConditions: {
      maxDrawdown: number;       // Макс. просадка
      maxDailyLoss: number;      // Макс. дневной убыток
      maxOpenPositions: number;  // Макс. открытых позиций
    };
  };

  // IP whitelist
  ipWhitelist: {
    enabled: boolean;
    allowedIPs: string[];
  };

  // Withdrawal protection
  withdrawal: {
    disabled: boolean;           // Отключить вывод через API
    delayHours: number;          // Задержка вывода
  };
}
```

### Защита API ключей

```typescript
// Хранение ключей (только на сервере)
interface SecureKeyStorage {
  // Шифрование
  encryption: {
    algorithm: "AES-256-GCM";
    keyDerivation: "PBKDF2";
    iterations: 100000;
  };

  // Доступ
  access: {
    serverSideOnly: true;
    environmentVariables: true;
    encryptedAtRest: true;
  };

  // Ротация
  rotation: {
    enabled: boolean;
    intervalDays: number;
    notifyBeforeDays: number;
  };
}
```

### Аудит и логирование

```typescript
interface AuditLog {
  timestamp: string;
  userId: string;
  action: string;
  mode: "DEMO" | "PAPER" | "TESTNET" | "LIVE";
  exchange: string;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  result: "success" | "failure";
  errorMessage?: string;
}

// Пример записи аудита
const auditEntry: AuditLog = {
  timestamp: "2026-03-13T10:30:00Z",
  userId: "user-123",
  action: "ORDER_CREATE",
  mode: "LIVE",
  exchange: "binance",
  details: {
    symbol: "BTCUSDT",
    side: "BUY",
    type: "LIMIT",
    price: 98500,
    quantity: 0.1
  },
  ipAddress: "192.168.1.1",
  userAgent: "CITARION/2.0",
  result: "success"
};
```

### Рекомендации по безопасности

| Режим | Рекомендации |
|-------|--------------|
| **DEMO** | - Нет особых требований |
| **PAPER** | - Нет особых требований |
| **TESTNET** | - Используйте отдельные testnet ключи<br>- Не используйте live ключи |
| **LIVE** | - Включите 2FA<br>- Используйте IP whitelist<br>- Ограничьте API права (только trading)<br>- Регулярно ротируйте ключи<br>- Настройте kill switch<br>- Мониторьте аномальную активность |

---

## 7. Примеры использования

### Пример 1: Открытие LONG позиции через Trading Form

```typescript
async function openLongPosition() {
  const params = {
    symbol: "BTCUSDT",
    direction: "LONG",
    amount: 100,        // 100 USDT
    leverage: 10,       // 10x = $1000 позиция
    stopLoss: 95000,    // SL на $95,000
    takeProfit: 105000, // TP на $105,000
    isDemo: true,
    exchangeId: "binance"
  };

  const response = await fetch("/api/trade/open", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params)
  });

  const result = await response.json();
  console.log("Position opened:", result.positionId);
}
```

### Пример 2: One-Click Trading с графика

```typescript
function ChartWithQuickTrade() {
  const [config, setConfig] = useState<OneClickTradingConfig>({
    enabled: true,
    defaultQuantity: 0.01,
    defaultType: "MARKET",
    slippageTolerance: 0.5,
    showConfirmation: true,
    quickSizes: [1, 5, 10, 25, 50, 100],
    defaultStopLossPercent: 2,
    defaultTakeProfitPercent: 4
  });

  const handleConfirm = async (params: OneClickTradeParams) => {
    // Отправка ордера
    const response = await fetch("/api/trade/open", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symbol: params.symbol,
        direction: params.side === "BUY" ? "LONG" : "SHORT",
        amount: params.quantity * params.price,
        leverage: 1,
        stopLoss: params.stopLoss,
        takeProfit: params.takeProfit,
        isDemo: true
      })
    });
    
    if (response.ok) {
      toast.success(`${params.side} order executed!`);
    }
  };

  return (
    <OneClickTradingDialog
      open={dialogOpen}
      onOpenChange={setDialogOpen}
      params={tradeParams}
      onConfirm={handleConfirm}
      currentPrice={currentPrice}
      balance={10000}
      config={config}
    />
  );
}
```

### Пример 3: Переключение в LIVE режим

```typescript
async function switchToLiveMode() {
  // 1. Проверка API ключей
  const hasCredentials = await checkAPICredentials("binance", "LIVE");
  if (!hasCredentials) {
    // Показать форму для ввода ключей
    showCredentialsForm();
    return;
  }

  // 2. Проверка открытых позиций
  const positions = await getOpenPositions();
  if (positions.length > 0) {
    const confirmed = await showConfirmDialog({
      title: "Close positions?",
      message: "You have open positions. Close them before switching?"
    });
    if (confirmed) {
      await closeAllPositions();
    }
  }

  // 3. Включение 2FA если не активна
  if (!is2FAEnabled()) {
    await enable2FA();
  }

  // 4. Переключение режима
  await setAccountType("LIVE");
  
  // 5. Запись в аудит
  logAuditEvent({
    action: "MODE_SWITCH",
    from: "DEMO",
    to: "LIVE",
    timestamp: new Date().toISOString()
  });

  toast.success("Switched to LIVE mode. Trade responsibly!");
}
```

### Пример 4: Установка OCO ордера

```typescript
async function setOCOOrder(positionId: string) {
  const position = await getPosition(positionId);
  
  // Создаём OCO для Take Profit и Stop Loss
  const ocoOrder = {
    symbol: position.symbol,
    side: position.direction === "LONG" ? "SELL" : "BUY",
    quantity: position.quantity,
    // Take Profit
    tpPrice: position.entryPrice * 1.05,    // +5%
    tpTriggerPrice: position.entryPrice * 1.05,
    // Stop Loss
    slTriggerPrice: position.entryPrice * 0.97, // -3%
    slPrice: position.entryPrice * 0.965   // -3.5%
  };

  const response = await fetch("/api/orders/oco", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ocoOrder)
  });

  return response.json();
}
```

### Пример 5: WebSocket мониторинг позиций

```typescript
function usePositionMonitor() {
  const [positions, setPositions] = useState<Position[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket("wss://api.citarion.io/ws");

    wsRef.current.onopen = () => {
      wsRef.current?.send(JSON.stringify({
        type: "subscribe",
        channel: "positions",
        exchangeId: "binance"
      }));
    };

    wsRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      if (message.type === "position_update") {
        setPositions(prev => 
          prev.map(p => 
            p.id === message.data.id 
              ? { ...p, ...message.data }
              : p
          )
        );
      }

      // Проверка ликвидации
      if (message.type === "liquidation_warning") {
        toast.error(
          `Liquidation warning for ${message.data.symbol}! 
           Current price: ${message.data.currentPrice}
           Liquidation price: ${message.data.liquidationPrice}`
        );
      }
    };

    return () => wsRef.current?.close();
  }, []);

  return positions;
}
```

### Пример 6: Проверка рисков перед сделкой

```typescript
async function validateTradeRisk(params: TradeParams): Promise<{
  valid: boolean;
  warnings: string[];
  errors: string[];
}> {
  const warnings: string[] = [];
  const errors: string[] = [];

  // Получаем текущие риски
  const riskStatus = await getRiskStatus();
  
  // Проверка макс. просадки
  if (riskStatus.currentDrawdown > riskStatus.maxDrawdown * 0.8) {
    warnings.push(`Drawdown at ${riskStatus.currentDrawdown.toFixed(1)}% (limit: ${riskStatus.maxDrawdown}%)`);
  }

  // Проверка макс. позиций
  if (riskStatus.openPositions >= riskStatus.maxPositions) {
    errors.push(`Maximum positions reached (${riskStatus.maxPositions})`);
  }

  // Проверка маржи
  const requiredMargin = params.amount / params.leverage;
  if (requiredMargin > riskStatus.availableMargin) {
    errors.push(`Insufficient margin. Required: ${requiredMargin}, Available: ${riskStatus.availableMargin}`);
  }

  // Проверка размера позиции
  const positionValue = params.amount * params.leverage;
  if (positionValue > riskStatus.maxPositionValue) {
    warnings.push(`Position size exceeds recommended maximum`);
  }

  // Проверка плеча
  if (params.leverage > 20) {
    warnings.push(`High leverage (${params.leverage}x) increases liquidation risk`);
  }

  return {
    valid: errors.length === 0,
    warnings,
    errors
  };
}
```

---

## 📊 Скриншоты UI

### Trading Form
```
┌─────────────────────────────────────┐
│ 🧮 Новая сделка         [DEMO] [⌨️] │
├─────────────────────────────────────┤
│ Биржа                               │
│ [Binance              ▼] [Demo]     │
│                                     │
│ Торговая пара                       │
│ [BTC/USDT            ▼] $98,450     │
│                                     │
│ Направление            Доступно: $10,000
│ [🟢 LONG] [🔴 SHORT]               │
│                                     │
│ Сумма (USDT)                        │
│ [100          ] [25%][50%][75%][100%]│
│                                     │
│ Процент маржи          2.0%         │
│ [─────●──────────────────]          │
│ 0.5%                        10%     │
│                                     │
│ Плечо              до 100x          │
│ [1x][2x][5x][10x][20x][50x][100x]   │
│                                     │
│ Stop Loss    │  Take Profit         │
│ [95,000    ] │ [105,000    ]        │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Размер позиции    $1,000.00     │ │
│ │ Маржа            $100.00        │ │
│ │ Процент маржи    2.0%           │ │
│ │ Комиссия (est.)  $0.40          │ │
│ │ Цена входа       $98,450        │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [🟢 Открыть LONG [DEMO]]            │
└─────────────────────────────────────┘
```

### One-Click Trading Dialog
```
┌─────────────────────────────────────┐
│ 🟢 One-Click BUY                    │
│ BTCUSDT @ $98,450.00                │
├─────────────────────────────────────┤
│ Quick Size                          │
│ [1%][5%][10%][25%][50%][100%]       │
│                                     │
│ Quantity                            │
│ [0.01000000        ]                │
│                                     │
│ Order Type                          │
│ [MARKET ▼]                          │
│                                     │
│ Stop Loss        Use suggested (96,481) │
│ [96,000          ]                  │
│                                     │
│ Take Profit      Use suggested (102,388) │
│ [102,000         ]                  │
│                                     │
│ Reduce Only        [○]              │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Estimated Total   $984.50       │ │
│ │ Balance           $10,000.00    │ │
│ │ After Trade       $9,015.50     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Cancel]  [🛒 Buy BTCUSDT]          │
└─────────────────────────────────────┘
```

---

## 🔗 Связанные документы

| Документ | Описание |
|----------|----------|
| [CHART.md](./CHART.md) | Документация компонентов графиков |
| [DASHBOARD.md](./DASHBOARD.md) | Документация дашборда |
| [../exchanges/README.md](../exchanges/README.md) | Документация бирж |
| [../RISK_MODELS_DOCUMENTATION.md](../RISK_MODELS_DOCUMENTATION.md) | Модели риск-менеджмента |

---

## 📝 Changelog

| Дата | Версия | Изменения |
|------|--------|-----------|
| 2026-03 | 2.0 | Создание полной документации |
| 2026-02 | 1.5 | Добавлен Aster DEX с плечом до 1000x |
| 2026-01 | 1.4 | One-Click Trading улучшения |
| 2025-12 | 1.3 | Добавлен PAPER режим |
| 2025-11 | 1.2 | Интеграция с 12 биржами |

---

*Документ создан: Март 2026*  
*Последнее обновление: Март 2026*
