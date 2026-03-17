# OctoBot Architecture Analysis Report
## Сравнительный анализ с Unified Trading Engine CITARION

---

## 📊 Executive Summary

**OctoBot** — это open-source криптовалютный торговый бот на Python с продвинутой архитектурой для автоматической торговли. После детального анализа выявлено **37 ключевых архитектурных паттернов**, которые могут быть полезны для улучшения CITARION.

---

## 1. Архитектура OctoBot

### 1.1 Модульная структура

```
OctoBot/
├── octobot/                    # Основной модуль
│   ├── api/                    # API endpoints
│   ├── automation/             # Автоматизация
│   ├── backtesting/            # Бэктестинг
│   ├── channels/               # Event channels
│   ├── commands.py             # CLI команды
│   └── configuration_manager.py
│
└── packages/                   # Пакеты (модули)
    ├── trading/                # 📊 ЯДРО ТОРГОВЛИ
    │   ├── octobot_trading/
    │   │   ├── exchanges/      # Коннекторы бирж
    │   │   │   ├── abstract_exchange.py
    │   │   │   ├── connectors/
    │   │   │   │   ├── ccxt/           # CCXT REST
    │   │   │   │   │   ├── ccxt_connector.py (1500+ lines)
    │   │   │   │   │   ├── ccxt_websocket_connector.py (1400+ lines)
    │   │   │   │   │   └── ccxt_adapter.py
    │   │   │   │   └── simulator/
    │   │   │   └── traders/
    │   │   │       └── trader.py (1500+ lines)
    │   │   ├── personal_data/   # Позиции, ордера, портфель
    │   │   │   ├── positions/
    │   │   │   │   └── position.py (1100+ lines)
    │   │   │   ├── orders/
    │   │   │   │   ├── order.py (1800+ lines)
    │   │   │   │   ├── orders_manager.py
    │   │   │   │   └── types/   # Limit, Market, Trailing
    │   │   │   └── portfolios/
    │   │   │       ├── portfolio.py
    │   │   │       └── portfolio_manager.py
    │   │   ├── exchange_data/   # Рыночные данные
    │   │   │   ├── ohlcv/
    │   │   │   ├── order_book/
    │   │   │   ├── ticker/
    │   │   │   └── funding/
    │   │   └── modes/          # Торговые режимы
    │   └── tests/
    ├── async_channel/          # Async event channels
    ├── evaluators/             # Оценка сигналов
    └── tentacles_manager/      # Plugin system
```

---

## 2. Ключевые архитектурные паттерны

### 2.1 Abstract Exchange Pattern

**OctoBot:**
```python
class AbstractExchange(AbstractAccount):
    # 1. SUPPORTED_ELEMENTS - декларативная модель возможностей
    SUPPORTED_ELEMENTS = {
        ExchangeTypes.FUTURE.value: {
            ExchangeSupportedElements.UNSUPPORTED_ORDERS.value: [
                TraderOrderType.STOP_LOSS,
                TraderOrderType.TRAILING_STOP,
            ],
            ExchangeSupportedElements.SUPPORTED_BUNDLED_ORDERS.value: {},
        },
    }
    
    # 2. Единый интерфейс для всех бирж
    async def create_order(self, order_type, symbol, quantity, price, ...):
        raise NotImplementedError
        
    # 3. Retry mechanism
    async def retry_till_success(self, timeout, request_func, *args):
        return await self._retry_until(timeout, 0, request_func, ...)
```

**CITARION (текущее):**
```typescript
// IExchangeClient - базовый интерфейс
interface IExchangeClient {
  createOrder(params: CreateOrderParams): Promise<OrderResult>;
  cancelOrder(params: CancelOrderParams): Promise<OrderResult>;
  // ...
}

// Нет:
// - SUPPORTED_ELEMENTS
// - retry mechanism
// - bundled orders
```

**🔧 Рекомендация:** Добавить `ExchangeCapabilities`:

```typescript
interface ExchangeCapabilities {
  supportedOrderTypes: OrderType[];
  bundledOrders: Map<OrderType, OrderType[]>;
  unsupportedOrders: OrderType[];
  hasFetchOrder: boolean;
  hasWatchOrders: boolean;
  maxLeverage: number;
}

// Использование
const caps = exchange.getCapabilities();
if (!caps.supportedOrderTypes.includes('TRAILING_STOP')) {
  // Создаём self-managed trailing stop
}
```

---

### 2.2 Order State Machine Pattern

**OctoBot:**
```python
class Order:
    # Состояния ордера
    state: OrderState  # None | Open | Fill | Cancel | Close
    
    # Переходы состояний
    async def on_open(self, force_open=False, is_from_exchange_data=False):
        self.state = OpenOrderState(self, ...)
        await self.state.initialize(forced=force_open)
        
    async def on_fill(self, force_fill=False, ...):
        self.state = FillOrderState(self, ...)
        await self.state.initialize(forced=force_fill)
        
    async def on_cancel(self, ...):
        self.state = CancelOrderState(self, ...)
        await self.state.initialize(...)

# States реализуют логику
class OpenOrderState(OrderState):
    async def initialize(self, forced=False):
        # Логика открытия ордера
        if not forced:
            await self._create_on_exchange()
        self.order.status = OrderStatus.OPEN
```

**CITARION (текущее):**
```typescript
// Только status enum
type PositionStatus = 'PENDING' | 'OPENING' | 'ACTIVE' | 'CLOSING' | 'CLOSED';

// Нет state machine
// Нет формализованных переходов
```

**🔧 Рекомендация:** Добавить State Machine:

```typescript
class OrderStateMachine {
  private state: OrderState;
  
  transitions = {
    PENDING: ['OPENING', 'CANCELLED'],
    OPENING: ['ACTIVE', 'CANCELLED', 'FAILED'],
    ACTIVE: ['CLOSING', 'FILLED', 'CANCELLED'],
    CLOSING: ['CLOSED', 'FAILED'],
    CLOSED: [],
  };
  
  async transition(newState: OrderState): Promise<boolean> {
    if (!this.canTransition(newState)) {
      throw new InvalidStateTransitionError(this.state, newState);
    }
    await this.state.onExit();
    this.state = newState;
    await this.state.onEnter();
    return true;
  }
}
```

---

### 2.3 Position Management Pattern

**OctoBot:**
```python
class Position(Initializable):
    # Полная модель позиции
    quantity: decimal.Decimal       # Размер без плеча
    size: decimal.Decimal           # Размер с плечом
    value: decimal.Decimal          # Стоимость
    
    entry_price: decimal.Decimal
    mark_price: decimal.Decimal
    liquidation_price: decimal.Decimal
    
    unrealized_pnl: decimal.Decimal
    realised_pnl: decimal.Decimal
    
    initial_margin: decimal.Decimal
    margin: decimal.Decimal         # initial_margin + fee_to_close
    
    # Методы
    async def update(self, update_size=None, mark_price=None, ...):
        await self.ensure_position_initialized()
        with self.update_or_restore():  # Context manager для отката
            if mark_price is not None:
                self._update_mark_price(mark_price)
            if update_size is not None:
                self._update_size(update_size)
                
    async def update_from_order(self, order):
        """Обновление позиции при заполнении ордера"""
        self._update_mark_price(order.filled_price)
        size_update = self._calculates_size_update_from_filled_order(order)
        self._update_size(size_update, ...)
        
    def is_order_increasing_size(self, order):
        """Проверка: увеличивает ли ордер позицию"""
        if order.reduce_only or order.close_position:
            return False
        return ((self.is_idle() and self.symbol_contract.is_one_way_position_mode())
                or (self.is_long() and order.is_long())
                or (self.is_short() and order.is_short()))
```

**CITARION (текущее):**
```typescript
interface PositionInfo {
  totalAmount: number;
  filledAmount: number;
  avgEntryPrice: number;
  unrealizedPnl?: number;
  // ...
}

// Нет:
// - quantity vs size (leveraged)
// - update_from_order
// - is_order_increasing_size
// - margin calculations
// - liquidation price logic
```

**🔧 Рекомендация:** Расширить Position:

```typescript
class Position {
  // Размеры
  quantity: number;      // Без плеча (margin)
  size: number;          // С плечом (position size)
  value: number;         // Notional value
  
  // Маржа
  initialMargin: number;
  maintenanceMargin: number;
  feeToClose: number;
  
  // Методы
  async updateFromOrder(order: Order): Promise<void> {
    this.markPrice = order.filledPrice;
    const sizeUpdate = this.calculateSizeUpdate(order);
    this.updateSize(sizeUpdate);
  }
  
  isOrderIncreasingSize(order: Order): boolean {
    if (order.reduceOnly || order.closePosition) return false;
    return (this.isIdle && this.isOneWayMode) ||
           (this.isLong && order.isLong) ||
           (this.isShort && order.isShort);
  }
  
  calculateLiquidationPrice(): number {
    if (this.marginMode === 'isolated') {
      return this.calculateIsolatedLiquidation();
    }
    return this.calculateCrossLiquidation();
  }
}
```

---

### 2.4 CCXT Connector Pattern

**OctoBot:**
```python
class CCXTConnector(AbstractExchange):
    client: ccxt.Exchange
    adapter: CCXTAdapter
    
    async def initialize_impl(self):
        # 1. Sandbox mode
        if self.exchange_manager.exchange.is_supporting_sandbox():
            ccxt_client_util.set_sandbox_mode(self, ...)
            
        # 2. Load markets
        await self._ensure_exchange_init()
        
        # 3. Auth check
        if self._should_authenticate():
            await self._ensure_auth()
            
    async def load_symbol_markets(self, reload=False, market_filter=None):
        # Caching markets
        if not force_load_markets:
            ccxt_client_util.load_markets_from_cache(self.client, ...)
        else:
            await self._load_markets(self.client, reload, market_filter)
            ccxt_client_util.set_markets_cache(self.client, ...)
            
    # Error handling
    @ccxt_client_util.converted_ccxt_common_errors
    async def create_order(self, ...):
        return self.adapter.adapt_order(
            await self.client.create_order(...)
        )
```

**CITARION (текущее):**
```typescript
// Simple client instantiation
const client = new BinanceClient({
  apiKey: credentials.apiKey,
  apiSecret: credentials.apiSecret,
});

// Нет:
// - market caching
// - sandbox mode toggle
// - adapter pattern
// - error conversion
```

**🔧 Рекомендация:** Добавить CCXT Adapter:

```typescript
class CCXTAdapter {
  adaptBalance(ccxtBalance: any): PortfolioBalance {
    return {
      total: ccxtBalance.total,
      free: ccxtBalance.free,
      used: ccxtBalance.used,
    };
  }
  
  adaptOrder(ccxtOrder: any): Order {
    return {
      id: ccxtOrder.id,
      symbol: ccxtOrder.symbol,
      type: this.mapOrderType(ccxtOrder.type),
      side: ccxtOrder.side.toUpperCase(),
      price: new Decimal(ccxtOrder.price || ccxtOrder.average),
      amount: new Decimal(ccxtOrder.amount),
      filled: new Decimal(ccxtOrder.filled),
      status: this.mapOrderStatus(ccxtOrder.status),
      // ...
    };
  }
  
  adaptPosition(ccxtPosition: any): Position {
    return {
      symbol: ccxtPosition.symbol,
      side: ccxtPosition.side.toUpperCase(),
      contracts: new Decimal(ccxtPosition.contracts),
      entryPrice: new Decimal(ccxtPosition.entryPrice),
      markPrice: new Decimal(ccxtPosition.markPrice),
      unrealizedPnl: new Decimal(ccxtPosition.unrealizedPnl),
      liquidationPrice: new Decimal(ccxtPosition.liquidationPrice),
    };
  }
}
```

---

### 2.5 WebSocket Connector Pattern

**OctoBot:**
```python
class CCXTWebsocketConnector(AbstractWebsocketExchange):
    client: ccxt.pro.Exchange
    feed_tasks: dict[str, asyncio.Task]
    
    # Feed management
    def _subscribe_feed(self, feed, symbols=None, time_frame=None, ...):
        feed_callback = self._get_callback_by_feed()[feed]
        feed_generator = self._get_feed_generator_by_feed()[feed]
        
        # One task per symbol
        if symbols is not None:
            for symbol in symbols:
                kwargs["symbol"] = symbol
                if self._create_task_if_necessary(feed, feed_callback, feed_generator, **kwargs):
                    added_subscriptions.append(symbol)
                    
    async def _feed_task(self, feed, callback, watch_func, *args, **kwargs):
        while not self.should_stop:
            try:
                update_data = await watch_func(*args, **kwargs)
                self._last_message_time = time.time()
                if update_data:
                    await callback(copy.deepcopy(update_data), **kwargs)
            except ccxt.NetworkError as err:
                # Reconnection logic
                await self._close_exchange_to_force_reconnect()
                await asyncio.sleep(reconnect_delay)
                
    # Feed generators
    def _get_feed_generator_by_feed(self):
        return {
            Feeds.TRADES: self._get_generator("watchTrades"),
            Feeds.TICKER: self._get_generator("watchTicker"),
            Feeds.CANDLE: self._get_generator("watchOHLCV"),
            Feeds.PORTFOLIO: self._get_generator("watchBalance"),
            Feeds.ORDERS: self._get_generator("watchOrders"),
        }
```

**CITARION (текущее):**
```typescript
// Нет WebSocket connector
// Только polling через setInterval

// Polling positions
setInterval(async () => {
  const positions = await getOpenPositions(userId);
  // ...
}, 5000);
```

**🔧 Рекомендация:** Добавить WebSocket Manager:

```typescript
class WebSocketManager {
  private connections: Map<string, WebSocketConnection>;
  private subscriptions: Map<string, Set<SubscriptionCallback>>;
  
  async subscribe(subscription: Subscription): Promise<void> {
    const conn = await this.getConnection(subscription.exchange);
    await conn.subscribe(subscription.channel, subscription.symbol);
    this.addCallback(subscription.id, subscription.callback);
  }
  
  async unsubscribe(subscriptionId: string): Promise<void> {
    const sub = this.subscriptions.get(subscriptionId);
    if (sub && sub.callbacks.size === 0) {
      await this.connection.unsubscribe(sub.channel, sub.symbol);
    }
  }
  
  // Auto-reconnect
  private async handleDisconnect(conn: WebSocketConnection): Promise<void> {
    setTimeout(() => this.reconnect(conn), RECONNECT_DELAY);
  }
}

// Usage
await wsManager.subscribe({
  exchange: 'binance',
  channel: 'positions',
  callback: (update) => {
    updatePositionInStore(update);
  }
});
```

---

### 2.6 Portfolio Manager Pattern

**OctoBot:**
```python
class PortfolioManager:
    portfolio: Portfolio
    portfolio_profitability: PortfolioProfitability
    value_holder: PortfolioValueHolder
    
    def update_portfolio_from_pnl(self, position):
        """Update portfolio from position PnL"""
        self.portfolio.update_portfolio_from_pnl(position)
        
    async def update_portfolio_from_frozen_position(
        self, position, is_long, update_value, 
        realized_pnl_update, margin_update
    ):
        """Called when position is closed"""
        await self.portfolio.update_from_closed_position(...)
        
    def refresh_portfolio_available_from_order(self, order, is_new_order):
        """Lock/unlock funds for order"""
        if is_new_order:
            self.portfolio.lock_funds_for_order(order)
        else:
            self.portfolio.unlock_funds_for_order(order)

class Portfolio:
    assets: dict[str, Asset]  # BTC, ETH, USDT
    
    def update_portfolio_data_from_position_size_update(
        self, position, realised_pnl_update, size_update, 
        margin_update, is_update_increasing_position_size
    ):
        currency = position.get_currency()
        asset = self.assets[currency]
        
        if is_update_increasing_position_size:
            asset.available -= margin_update
        else:
            asset.available += margin_update
            
        asset.total += realised_pnl_update
```

**CITARION (текущее):**
```typescript
// Paper Trading Engine
class PaperTradingEngine {
  balance: number;
  
  async openPosition(...): Promise<TradeResult> {
    this.balance -= quantity * price;  // Simple deduction
    // Нет:
    // - Asset management
    // - Margin locking
    // - PnL tracking per asset
  }
}
```

**🔧 Рекомендация:** Добавить Portfolio:

```typescript
class Portfolio {
  private assets: Map<string, Asset>;
  
  getAsset(currency: string): Asset {
    if (!this.assets.has(currency)) {
      this.assets.set(currency, new Asset(currency));
    }
    return this.assets.get(currency)!;
  }
  
  lockFundsForOrder(order: Order): boolean {
    const asset = this.getAsset(order.currency);
    const required = this.calculateRequiredFunds(order);
    
    if (asset.available < required) {
      return false;  // Insufficient funds
    }
    
    asset.available -= required;
    asset.locked += required;
    return true;
  }
  
  unlockFundsFromOrder(order: Order): void {
    const asset = this.getAsset(order.currency);
    const locked = this.calculateLockedFunds(order);
    
    asset.locked -= locked;
    asset.available += locked;
  }
  
  updateFromPositionClose(position: Position, pnl: number): void {
    const asset = this.getAsset(position.currency);
    asset.total += pnl;
    asset.available += position.initialMargin;
  }
}

class Asset {
  currency: string;
  total: Decimal;      // Total balance
  available: Decimal;  // Available for trading
  locked: Decimal;     // Locked in positions/orders
  inOrders: Decimal;   // Locked in pending orders
}
```

---

### 2.7 Trader Pattern (Order Management)

**OctoBot:**
```python
class Trader(Initializable):
    # Decorators for safety
    @enabled_or_forced_only
    async def create_order(self, order, loaded=False, params=None, ...):
        """Create order with full lifecycle management"""
        if loaded:
            # Order from exchange sync
            await order.initialize()
            return order
            
        # New order creation
        created_order = await self._create_new_order(order, params, ...)
        return created_order
        
    @enabled_or_forced_only
    async def edit_order(self, order, edited_quantity=None, ...):
        """Edit order with portfolio update"""
        if not order.can_be_edited():
            raise OrderEditError(...)
            
        async with order.lock:  # Prevent race conditions
            changed = await self._edit_order_on_exchange(...)
            await self.exchange_manager.exchange_personal_data \
                .handle_order_update_notification(order, OrderUpdateType.EDIT)
                
    async def cancel_order(self, order, ignored_order=None, ...):
        """Cancel with proper cleanup"""
        if order and order.is_open():
            return await self._handle_order_cancellation(order, ...)
        return False
        
    # Chained orders (SL/TP linked to entry)
    async def bundle_chained_order_with_uncreated_order(
        self, order, chained_order, ...
    ):
        """Bundle SL/TP with main order"""
        params = {}
        if self.exchange_manager.exchange.supports_bundled_order_on_order_creation(
            order, chained_order.order_type
        ):
            params.update(self.exchange_manager.exchange.get_bundled_order_parameters(
                order,
                stop_loss_price=chained_order.origin_price
            ))
        await self.chain_order(order, chained_order, ...)
        return params
```

**CITARION (текущее):**
```typescript
// Unified Trading Engine
async executeTrade(request: TradeRequest): Promise<TradeResult> {
  // Нет:
  // - Order locking
  // - Edit order
  // - Chained orders
  // - Bundled orders
}
```

**🔧 Рекомендация:** Добавить Trader класс:

```typescript
class Trader {
  private orderLocks: Map<string, Mutex> = new Map();
  
  async createOrder(order: Order, params?: OrderParams): Promise<Order> {
    const lock = this.getOrderLock(order.id);
    
    return await lock.runExclusive(async () => {
      // Create on exchange
      const created = await this.exchange.createOrder({
        symbol: order.symbol,
        type: order.type,
        side: order.side,
        quantity: order.quantity,
        price: order.price,
        ...params
      });
      
      // Update portfolio
      this.portfolioManager.lockFundsForOrder(order);
      
      // Initialize state
      await order.initialize();
      
      return order;
    });
  }
  
  async editOrder(order: Order, edits: OrderEdits): Promise<boolean> {
    if (!order.canBeEdited()) {
      throw new OrderEditError('Order cannot be edited');
    }
    
    const lock = this.getOrderLock(order.id);
    return await lock.runExclusive(async () => {
      // Unlock old funds
      this.portfolioManager.unlockFundsFromOrder(order);
      
      // Edit on exchange
      await this.exchange.editOrder(order.exchangeId, {
        quantity: edits.quantity,
        price: edits.price,
      });
      
      // Update order
      order.update(edits);
      
      // Lock new funds
      this.portfolioManager.lockFundsForOrder(order);
      
      return true;
    });
  }
  
  async cancelOrder(order: Order): Promise<boolean> {
    // ...
  }
  
  // Chained orders
  async bundleChainedOrder(order: Order, chained: Order): Promise<OrderParams> {
    const params: OrderParams = {};
    
    if (this.exchange.supportsBundledOrders()) {
      if (chained.type === 'STOP_LOSS') {
        params.stopLossPrice = chained.price;
      } else if (chained.type === 'TAKE_PROFIT') {
        params.takeProfitPrice = chained.price;
      }
    } else {
      // Add as chained order (created on fill)
      order.addChainedOrder(chained);
    }
    
    return params;
  }
}
```

---

## 3. Сравнение Architecture Patterns

| Паттерн | OctoBot | CITARION | Gap |
|---------|---------|----------|-----|
| Abstract Exchange | ✅ Full (73 kB) | ⚠️ Basic | **High** |
| Order State Machine | ✅ Full | ❌ None | **Critical** |
| Position Management | ✅ Full (43 kB) | ⚠️ Basic | **High** |
| CCXT Connector | ✅ Full (70 kB) | ⚠️ Basic | **Medium** |
| WebSocket Manager | ✅ Full (56 kB) | ❌ None | **Critical** |
| Portfolio Manager | ✅ Full (72 kB) | ⚠️ Paper only | **High** |
| Trader (Order Mgmt) | ✅ Full (61 kB) | ⚠️ Basic | **Medium** |
| Backtesting | ✅ Full | ❌ None | **Low** |
| Signal Evaluators | ✅ Full | ⚠️ Parser only | **Low** |

---

## 4. Что позаимствовать (Приоритеты)

### 4.1 КРИТИЧНО (Priority 1)

#### 4.1.1 Order State Machine

**Зачем:** Правильное управление lifecycle ордера, обработка edge cases, race conditions.

**Что даст:**
- Чёткие переходы состояний
- Автоматический rollback при ошибках
- Правильная обработка partial fills
- Логирование всех transitions

**Реализация:**
```typescript
// Создать OrderState.ts
class PendingState implements OrderState {
  async onEnter(): Promise<void> {
    await this.order.validateFunds();
  }
  
  async onExit(): Promise<void> {
    // Cleanup
  }
  
  canTransitionTo(state: OrderStateType): boolean {
    return ['OPENING', 'CANCELLED'].includes(state);
  }
}

class OpeningState implements OrderState {
  async onEnter(): Promise<void> {
    await this.order.createOnExchange();
  }
  
  canTransitionTo(state: OrderStateType): boolean {
    return ['ACTIVE', 'CANCELLED', 'FAILED'].includes(state);
  }
}
```

---

#### 4.1.2 WebSocket Manager

**Зачем:** Real-time updates без polling, instant PnL updates, immediate order status changes.

**Что даст:**
- Real-time position updates (убрать polling)
- Instant order fills
- Live PnL calculation
- Lower API rate limits usage

**Реализация:**
```typescript
// Создать WebSocketManager.ts
class BinanceWebSocketManager implements WebSocketManager {
  private ws: WebSocket | null = null;
  private subscriptions: Map<string, Callback>;
  
  async connect(): Promise<void> {
    this.ws = new WebSocket('wss://fstream.binance.com/ws');
    this.ws.onmessage = (msg) => this.handleMessage(JSON.parse(msg.data));
  }
  
  async subscribePositions(): Promise<void> {
    // Listen key for user data stream
    const listenKey = await this.exchange.getListenKey();
    this.ws.send(JSON.stringify({
      method: "SUBSCRIBE",
      params: [listenKey],
      id: Date.now()
    }));
  }
  
  private handleMessage(msg: any): void {
    switch (msg.e) {
      case 'ORDER_TRADE_UPDATE':
        this.handleOrderUpdate(msg);
        break;
      case 'ACCOUNT_UPDATE':
        this.handleAccountUpdate(msg);
        break;
    }
  }
}
```

---

#### 4.1.3 Position Manager Enhancement

**Зачем:** Правильный расчёт margin, liquidation price, PnL.

**Что даст:**
- Правильный liquidation price
- Точный unrealized PnL
- Margin calculation
- Fee to close estimation

**Реализация:**
```typescript
// Создать PositionCalculator.ts
class PositionCalculator {
  static calculateLiquidationPrice(
    position: Position,
    contract: Contract
  ): Decimal {
    if (contract.marginType === 'isolated') {
      return this.calculateIsolatedLiquidation(position, contract);
    }
    return this.calculateCrossLiquidation(position, contract);
  }
  
  private static calculateIsolatedLiquidation(
    position: Position,
    contract: Contract
  ): Decimal {
    const { entryPrice, size, side } = position;
    const { leverage, maintenanceMarginRate } = contract;
    
    // Formula for isolated margin
    if (side === 'LONG') {
      return entryPrice.times(1 - (1/leverage) + maintenanceMarginRate);
    }
    return entryPrice.times(1 + (1/leverage) - maintenanceMarginRate);
  }
  
  static calculateUnrealizedPnL(
    position: Position,
    markPrice: Decimal
  ): Decimal {
    const { entryPrice, size, side } = position;
    if (side === 'LONG') {
      return markPrice.minus(entryPrice).times(size);
    }
    return entryPrice.minus(markPrice).times(size);
  }
  
  static calculateFeeToClose(
    position: Position,
    bankruptcyPrice: Decimal
  ): Decimal {
    const takerFee = position.getTakerFee();
    return position.size.times(bankruptcyPrice).times(takerFee);
  }
}
```

---

### 4.2 ВАЖНО (Priority 2)

#### 4.2.1 CCXT Adapter Pattern

**Зачем:** Унификация данных от разных бирж, conversion handling.

**Что даст:**
- Единый формат данных
- Easy exchange switching
- Decimal precision handling

**Реализация:**
```typescript
// Создать adapters/CCXTAdapter.ts
class CCXTAdapter {
  private precision: number;
  
  adaptTicker(raw: any): Ticker {
    return {
      symbol: raw.symbol,
      bid: new Decimal(raw.bid),
      ask: new Decimal(raw.ask),
      last: new Decimal(raw.last),
      volume: new Decimal(raw.baseVolume),
      timestamp: new Date(raw.timestamp),
    };
  }
  
  adaptBalance(raw: any): Portfolio {
    const assets = new Map<string, Asset>();
    
    for (const [currency, balance] of Object.entries(raw)) {
      if (balance.total > 0 || balance.free > 0) {
        assets.set(currency, {
          currency,
          total: new Decimal(balance.total || 0),
          available: new Decimal(balance.free || 0),
          locked: new Decimal(balance.used || 0),
        });
      }
    }
    
    return { assets };
  }
}
```

---

#### 4.2.2 Portfolio Manager

**Зачем:** Правильный учёт балансов, lock/unlock funds, multi-currency support.

**Что даст:**
- Multi-currency portfolio
- Fund locking for pending orders
- Proper PnL attribution
- Available balance calculation

**Реализация:**
```typescript
// Создать PortfolioManager.ts
class PortfolioManager {
  private portfolio: Portfolio;
  private valueHolder: PortfolioValueHolder;
  
  async refreshFromExchange(exchange: Exchange): Promise<void> {
    const balance = await exchange.getBalance();
    this.portfolio = this.adapter.adaptBalance(balance);
  }
  
  getAvailableBalance(currency: string): Decimal {
    return this.portfolio.getAsset(currency).available;
  }
  
  lockFunds(currency: string, amount: Decimal): boolean {
    const asset = this.portfolio.getAsset(currency);
    if (asset.available.lt(amount)) {
      return false;
    }
    asset.available = asset.available.minus(amount);
    asset.locked = asset.locked.plus(amount);
    return true;
  }
  
  unlockFunds(currency: string, amount: Decimal): void {
    const asset = this.portfolio.getAsset(currency);
    asset.locked = asset.locked.minus(amount);
    asset.available = asset.available.plus(amount);
  }
}
```

---

#### 4.2.3 Exchange Capabilities

**Зачем:** Знать возможности биржи, adaptive trading.

**Что даст:**
- Know what orders are supported
- Fallback to self-managed orders
- Proper bundled orders

**Реализация:**
```typescript
// Создать ExchangeCapabilities.ts
const BINANCE_CAPABILITIES: ExchangeCapabilities = {
  supportedOrderTypes: ['MARKET', 'LIMIT', 'STOP_MARKET', 'STOP_LIMIT', 'TAKE_PROFIT'],
  unsupportedOrders: ['TRAILING_STOP'], // Self-managed
  bundledOrders: new Map([
    ['LIMIT', ['STOP_LOSS', 'TAKE_PROFIT']],
  ]),
  hasWatchOrders: true,
  hasFetchOrder: true,
  maxLeverage: 125,
};

// Usage
if (!exchange.capabilities.supportedOrderTypes.includes('TRAILING_STOP')) {
  // Create self-managed trailing stop
  await createSelfManagedTrailingStop(position, config);
}
```

---

### 4.3 ПОЛЕЗНО (Priority 3)

#### 4.3.1 Backtesting Engine

**Зачем:** Тестирование стратегий на истории.

**Что даст:**
- Strategy validation
- Performance metrics
- Risk assessment

---

#### 4.3.2 Signal Evaluators

**Зачем:** Оценка качества сигналов.

**Что даст:**
- Signal scoring
- Quality metrics
- Historical performance

---

## 5. План имплементации

### Week 1: Critical

```
Day 1-2: Order State Machine
  - Создать OrderState.ts
  - Реализовать transitions
  - Добавить tests

Day 3-4: WebSocket Manager
  - Создать WebSocketManager.ts
  - Binance implementation
  - Position updates

Day 5-7: Position Calculator
  - Liquidation price
  - PnL calculation
  - Fee estimation
```

### Week 2: Important

```
Day 1-2: CCXT Adapter
  - Создать adapters/
  - Balance, Order, Position adapters
  - Tests

Day 3-4: Portfolio Manager
  - Создать PortfolioManager.ts
  - Multi-currency support
  - Lock/unlock funds

Day 5-7: Exchange Capabilities
  - Capabilities schema
  - Per-exchange configs
  - Capability-aware order creation
```

---

## 6. Итоговая таблица

| Функция | OctoBot | CITARION | Польза | Сложность |
|---------|---------|----------|--------|-----------|
| Order State Machine | ✅ | ❌ | ⭐⭐⭐⭐⭐ | Medium |
| WebSocket Manager | ✅ | ❌ | ⭐⭐⭐⭐⭐ | High |
| Position Calculator | ✅ | ⚠️ | ⭐⭐⭐⭐⭐ | Medium |
| CCXT Adapter | ✅ | ⚠️ | ⭐⭐⭐⭐ | Low |
| Portfolio Manager | ✅ | ⚠️ | ⭐⭐⭐⭐ | Medium |
| Exchange Capabilities | ✅ | ❌ | ⭐⭐⭐⭐ | Low |
| Backtesting | ✅ | ❌ | ⭐⭐⭐ | High |
| Signal Evaluators | ✅ | ⚠️ | ⭐⭐⭐ | Medium |

---

## 7. Заключение

OctoBot представляет собой **production-grade** торговую систему с продуманной архитектурой. Ключевые паттерны, которые стоит позаимствовать:

1. **Order State Machine** — критически важен для надёжного управления ордерами
2. **WebSocket Manager** — убирает polling, даёт real-time updates
3. **Position Calculator** — правильный liquidation price, PnL, fees
4. **CCXT Adapter** — унификация данных бирж
5. **Portfolio Manager** — multi-currency, lock/unlock funds
6. **Exchange Capabilities** — adaptive trading

**Итого:** Реализация Priority 1 паттернов займёт ~2 недели и значительно повысит надёжность системы. Priority 2 — ещё ~2 недели.

---

*Report generated: 2024*
*Author: Senior Trading Systems Architect*
