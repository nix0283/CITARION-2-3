# Сравнительный анализ: Freqtrade vs CITARION Unified Engine

## 📋 Общая архитектура

### Freqtrade (Python)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           FreqtradeBot                                   │
│  (Главный класс - работает в LIVE или DRY_RUN режиме)                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────┐     ┌─────────────────────────────────────────────┐   │
│  │  Exchange   │     │              RunMode (Enum)                  │   │
│  │  (ccxt)     │     │  - LIVE     → Реальные API вызовы           │   │
│  │             │     │  - DRY_RUN  → create_dry_run_order()        │   │
│  │  dry_run ───┼────►│  - BACKTEST → Backtesting class            │   │
│  │  flag       │     │  - HYPEROPT  → Оптимизация параметров       │   │
│  └─────────────┘     └─────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                         Wallets                                  │   │
│  │  dry_run=False → Реальные балансы с биржи                       │   │
│  │  dry_run=True  → dry_run_wallet (виртуальный баланс)            │   │
│  │  is_backtest=True → Исторические данные                         │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                          Backtesting                                     │
│  (Отдельный класс - полная симуляция на исторических данных)            │
├─────────────────────────────────────────────────────────────────────────┤
│  - Покасательная обработка данных (candle-by-candle)                    │
│  - Funding rate для фьючерсов                                           │
│  - Liquidation simulation                                               │
│  - Position adjustment (DCA)                                            │
│  - Full metrics: Sharpe, Sortino, Win Rate, Drawdown                   │
└─────────────────────────────────────────────────────────────────────────┘
```

### CITARION (TypeScript/Next.js)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       UnifiedTradingEngine                               │
│  (Единый класс с раздельными обработчиками режимов)                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  executeTrade(request)                                                   │
│      │                                                                   │
│      ├── config.mode === 'LIVE'  ──► Real exchange API calls           │
│      │                                                                   │
│      ├── config.mode === 'DEMO'  ──► Basic simulation:                 │
│      │                              - Slippage (0.05%)                  │
│      │                              - Fees (maker/taker)                │
│      │                              - Basic liquidation                 │
│      │                                                                   │
│      └── config.mode === 'PAPER' ──► Full simulation:                  │
│                                   - Funding rate (8h)                   │
│                                   - Equity curve tracking               │
│                                   - Sharpe/Sortino metrics              │
│                                   - Advanced liquidation                │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Mode-Specific Configs:                                          │   │
│  │  - LiveModeConfig   (confirmation, maxPositionSize, sync)       │   │
│  │  - DemoModeConfig   (initialBalance, slippage, fees, liq)       │   │
│  │  - PaperModeConfig  (funding, equity, metrics)                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔍 Детальное сравнение

### 1. Разделение режимов (Mode Separation)

| Аспект | Freqtrade | CITARION |
|--------|-----------|----------|
| **Определение режимов** | `RunMode` enum (StrEnum) | `TradingMode` type union |
| **Количество режимов** | 8 (LIVE, DRY_RUN, BACKTEST, HYPEROPT, UTIL_*, PLOT, WEBSERVER, OTHER) | 3 (LIVE, DEMO, PAPER) |
| **Разделение кода** | Флаг `dry_run` внутри методов | Отдельные config-типы для каждого режима |
| **Чёткость границ** | ⚠️ Средняя (if dry_run scattered) | ✅ Высокая (type-safe configs) |

**Verdict**: Freqtrade имеет больше режимов, но CITARION имеет более чёткое типизированное разделение.

---

### 2. Симуляция ордеров (Order Simulation)

#### Freqtrade - `create_dry_run_order()`:

```python
# freqtrade/exchange/exchange.py:1127-1205

def create_dry_run_order(self, pair, ordertype, side, amount, rate, leverage, ...):
    # 1. Генерация ID ордера
    order_id = f"dry_run_{side}_{pair}_{now.timestamp()}"
    
    # 2. Проверка limit order через orderbook
    if ordertype == "limit" and orderbook:
        if self._dry_is_price_crossed(pair, side, rate, orderbook):
            # Конвертировать в market order если цена пересекает spread
            dry_order["type"] = "market"
    
    # 3. Market order - slippage и fill simulation
    if dry_order["type"] == "market":
        slippage = 0.05  # 5% worst case slippage!
        worst_rate = rate * (1 + slippage) if side == "buy" else rate * (1 - slippage)
        average = self.get_dry_market_fill_price(pair, side, amount, rate, worst_rate, orderbook)
        # Orderbook depth interpolation for fill price
    
    # 4. Добавление fee
    dry_order = self.add_dry_order_fee(pair, dry_order, "taker")
    
    # 5. Сохранение в _dry_run_open_orders
    self._dry_run_open_orders[dry_order["id"]] = dry_order
```

**Ключевые особенности:**
- ✅ **Orderbook-based fill simulation** - использует реальный orderbook для расчёта цены исполнения
- ✅ **Limit order matching** - проверяет пересечение цены со spread
- ⚠️ **Slippage 5%** - очень консервативный (защитный) подход
- ✅ **Fee calculation** - получает реальные комиссии с биржи

#### CITARION - `executeSimulatedOrder()`:

```typescript
// src/lib/trading/unified-engine.ts

private async executeSimulatedOrder(
  symbol: string,
  side: 'buy' | 'sell',
  quantity: number,
  price: number,
  config: SimulationConfig
): Promise<OrderResult> {
  // 1. Apply slippage (0.05%)
  const slippageMultiplier = side === 'buy' 
    ? 1 + config.slippagePercent / 100 
    : 1 - config.slippagePercent / 100;
  const executionPrice = price * slippageMultiplier;
  
  // 2. Calculate fee
  const fee = quantity * executionPrice * (config.takerFeePercent / 100);
  
  // 3. Check liquidation
  if (this.checkLiquidation(position, config.maintenanceMarginPercent)) {
    // Full liquidation simulation
  }
  
  // 4. Update virtual balance
  this.updateVirtualBalance(accountId, currency, -cost - fee);
}
```

**Ключевые особенности:**
- ✅ **Slippage 0.05%** - реалистичный для ликвидных пар
- ✅ **Maker/Taker fees** - отдельные ставки
- ✅ **Liquidation simulation** - maintenance margin
- ⚠️ **Нет orderbook integration** - не использует реальный orderbook
- ⚠️ **Нет limit order matching** - только market orders

---

### 3. Backtesting vs Paper Trading

| Функция | Freqtrade Backtesting | CITARION PAPER |
|---------|----------------------|----------------|
| **Candle-by-candle replay** | ✅ | ❌ (real-time only) |
| **Historical data** | ✅ Load from files | ❌ |
| **Funding rate simulation** | ✅ From historical data | ✅ Simulated (8h) |
| **Liquidation** | ✅ Full simulation | ✅ Maintenance margin |
| **Equity curve** | ✅ | ✅ |
| **Sharpe Ratio** | ✅ | ✅ |
| **Sortino Ratio** | ✅ | ✅ |
| **Max Drawdown** | ✅ | ✅ |
| **Position adjustment (DCA)** | ✅ | ⚠️ Partial |
| **Limit order matching** | ✅ Within candle OHLC | ⚠️ Basic |

**Verdict**: Freqtrade Backtesting - полноценный backtesting engine с историческими данными. CITARION PAPER - paper trading в реальном времени с метриками.

---

### 4. Кошелёк и баланс (Wallet Management)

#### Freqtrade:

```python
# freqtrade/wallets.py

class Wallets:
    def __init__(self, config, exchange, is_backtest=False):
        self._is_backtest = is_backtest
        
        # dry_run_wallet - начальный виртуальный баланс
        if isinstance(_start_cap := config["dry_run_wallet"], float | int):
            self._wallets[_start_cap_cur] = Wallet(
                currency=_start_cap_cur,
                free=_start_cap,
                used=0,
                total=_start_cap
            )
    
    def update(self):
        if not self._is_backtest:
            if not self._config["dry_run"] or self._config.get("runmode") == RunMode.LIVE:
                # Получить реальные балансы с биржи
                balances = self._exchange.fetch_balance()
            else:
                # Виртуальный баланс - не обновлять с биржи
                pass
```

**Особенности:**
- ✅ Единый класс для LIVE/DRY_RUN/BACKTEST
- ✅ `dry_run_wallet` - начальный капитал для симуляции
- ✅ Автоматический расчёт available margin

#### CITARION:

```typescript
// unified-engine.ts

private virtualBalances: Map<string, VirtualBalance> = new Map();

interface VirtualBalance {
  currency: string;
  total: number;
  available: number;
  frozen: number;  // Зарезервировано в позициях
}
```

**Особенности:**
- ✅ Простой Map для виртуальных балансов
- ✅ Frozen amount для маржи
- ⚠️ Нет интеграции с реальными балансами (только через DB)

---

### 5. Funding Rate Simulation

#### Freqtrade:

```python
# backtesting.py

def _run_funding_fees(self, trade, current_time, force=False):
    if self.trading_mode == TradingMode.FUTURES:
        if force or (current_time.timestamp() % self.funding_fee_timeframe_secs) == 0:
            # Funding fee interval (каждые 8 часов)
            trade.set_funding_fees(
                self.exchange.calculate_funding_fees(
                    self.futures_data[trade.pair],
                    amount=trade.amount,
                    is_short=trade.is_short,
                    open_date=trade.date_last_filled_utc,
                    close_date=current_time,
                )
            )
```

- ✅ Использует исторические funding rates
- ✅ Точное время settlements (8h)

#### CITARION:

```typescript
private settleFunding(position: PositionInfo, config: PaperModeConfig): void {
  const now = new Date();
  const lastFunding = this.lastFundingTime.get(position.id) || position.openedAt;
  
  // Check if 8 hours passed
  if (now.getTime() - lastFunding.getTime() >= config.fundingIntervalMs) {
    const fundingRate = config.baseFundingRate; // 0.01%
    const fundingFee = position.totalAmount * position.avgEntryPrice * fundingRate;
    
    // Deduct from position
    position.realizedPnl -= fundingFee;
    this.lastFundingTime.set(position.id, now);
  }
}
```

- ✅ Симуляция каждые 8 часов
- ⚠️ Фиксированная ставка (нет исторических данных)

---

### 6. Liquidation

#### Freqtrade:

```python
# exchange.py

def dry_run_liquidation_price(self, pair, amount, leverage, ...):
    # Расчёт на основе maintenance margin
    # Учитывает cross/isolated margin mode
```

- ✅ Full liquidation simulation
- ✅ Cross vs Isolated margin

#### CITARION:

```typescript
private checkLiquidation(position: PositionInfo, maintenanceMarginPercent: number): boolean {
  const margin = position.totalAmount * position.avgEntryPrice / position.leverage;
  const maintenanceMargin = margin * (maintenanceMarginPercent / 100);
  
  if (position.unrealizedPnl <= -margin + maintenanceMargin) {
    return true; // Liquidation
  }
  return false;
}
```

- ✅ Maintenance margin calculation
- ⚠️ Базовая реализация (без cross margin учёта других позиций)

---

## 📊 Итоговая сравнительная таблица

| Критерий | Freqtrade | CITARION | Лучше |
|----------|-----------|----------|-------|
| **Архитектура режимов** | Enum + флаг dry_run | Type-safe configs | 🏆 CITARION |
| **Количество режимов** | 8 режимов | 3 режима | Зависит от needs |
| **Orderbook simulation** | ✅ Full | ❌ Нет | 🏆 Freqtrade |
| **Limit order matching** | ✅ Full | ⚠️ Basic | 🏆 Freqtrade |
| **Slippage реализм** | 5% (защитный) | 0.05% (реалистичный) | 🏆 CITARION |
| **Fee calculation** | ✅ С биржи | ✅ Конфигурируемые | Equal |
| **Funding rate** | ✅ Historical | ✅ Simulated | 🏆 Freqtrade |
| **Equity curve** | ✅ | ✅ | Equal |
| **Performance metrics** | ✅ Full | ✅ Full | Equal |
| **Backtesting** | ✅ Full engine | ❌ Real-time only | 🏆 Freqtrade |
| **Type safety** | ⚠️ Python | ✅ TypeScript strict | 🏆 CITARION |
| **Кодовая база** | ~100K+ LOC | ~3K LOC | - |
| **Production ready** | ✅ 7+ years | ⚠️ В разработке | 🏆 Freqtrade |

---

## 🎯 Что логичнее реализовано?

### Freqtrade - Сильные стороны:

1. **Orderbook-based simulation** - более точная симуляция цены исполнения
2. **Historical backtesting** - полноценный backtesting engine
3. **Limit order matching** - правильная обработка limit ордеров
4. **Cross margin liquidation** - учитывает все позиции при liquidation

### CITARION - Сильные стороны:

1. **Type-safe configuration** - TypeScript типы для каждого режима
2. **Realistic slippage** - 0.05% вместо 5%
3. **Unified interface** - один engine для всех режимов
4. **Modern architecture** - меньше легаси, чище код

---

## 🔧 Рекомендации по улучшению CITARION

### 1. Добавить Orderbook Integration для DEMO/PAPER

```typescript
// Добавить в DemoModeConfig/PaperModeConfig
interface PaperModeConfig {
  // ... existing
  useOrderbookForFill: boolean;  // Использовать orderbook для расчёта fill price
  maxSlippagePercent: number;    // Макс slippage при orderbook simulation
}

// Новый метод
private async getSimulatedFillPrice(
  symbol: string,
  side: 'buy' | 'sell',
  quantity: number,
  config: PaperModeConfig
): Promise<number> {
  if (config.useOrderbookForFill) {
    const orderbook = await this.getOrderbook(symbol);
    return this.calculateFillPriceFromOrderbook(orderbook, side, quantity, config.maxSlippagePercent);
  }
  // Fallback к простому slippage
  return this.applySimpleSlippage(price, side, config.slippagePercent);
}
```

### 2. Добавить Limit Order Matching

```typescript
// Проверка limit ордеров при каждом price update
private checkLimitOrdersFill(currentPrice: number, orderbook?: OrderBook): void {
  for (const [accountId, orders] of this.pendingOrders) {
    for (const order of orders) {
      if (this.isPriceCrossed(order, currentPrice, orderbook)) {
        this.executeLimitOrder(order);
      }
    }
  }
}

private isPriceCrossed(order: PendingOrder, price: number, orderbook?: OrderBook): boolean {
  if (order.direction === 'LONG') {
    return price <= order.price;
  } else {
    return price >= order.price;
  }
}
```

### 3. Добавить Cross Margin Liquidation

```typescript
private checkCrossMarginLiquidation(accountId: string): boolean {
  const positions = this.getAccountPositions(accountId);
  const totalMargin = positions.reduce((sum, p) => sum + p.margin, 0);
  const totalUnrealizedPnl = positions.reduce((sum, p) => sum + (p.unrealizedPnl || 0), 0);
  
  const equity = totalMargin + totalUnrealizedPnl;
  const maintenanceMargin = totalMargin * 0.5; // 0.5%
  
  return equity <= maintenanceMargin;
}
```

---

## 📝 Вывод

**Freqtrade** имеет более зрелую и полную реализацию с точки зрения:
- Симуляции ордеров (orderbook-based)
- Backtesting на исторических данных
- Limit order matching

**CITARION** имеет более современную и чистую архитектуру:
- Type-safe конфигурация режимов
- Реалистичный slippage
- Единый интерфейс

**Лучшая стратегия**: Взять лучшее от обоих - добавить orderbook simulation и limit order matching из Freqtrade в CITARION, сохранив TypeScript type safety.
