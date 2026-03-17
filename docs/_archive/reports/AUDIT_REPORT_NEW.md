# АУДИТ ПРОЕКТА CITARION

**Дата:** 2026-03-12  
**Версия:** 1.0.1

---

## 📊 Общая статистика

| Категория | Количество |
|-----------|------------|
| TODO комментарии | 47 |
| NotImplementedError | 3 |
| Mock/Demo данные | 15+ файлов |
| Пустые функции | 5 |
| `as any` приведений | ~60 |
| Неиспользуемых моделей Prisma | ~30 (70%) |
| eslint-disable/ts-ignore | 3 |

**Общая оценка готовности проекта: ~40-50%**

---

## 🔴 КРИТИЧЕСКИЕ ПРОБЛЕМЫ

### 1. Заглушки в strategy-bot/engine.ts (10 TODO)
**Проблема:** Бот не может торговать без реального подключения к бирже
- TODO: получение свечей
- TODO: подключение к бирже
- TODO: открытие позиций

### 2. Mock данные в критичных API роутах
| Роут | Проблема |
|------|----------|
| `/api/backtesting/run` | Fallback на mock candles |
| `/api/hyperopt/run` | Fallback на mock candles |
| `/api/funding` | Mock данные при ошибке БД |

### 3. 70% моделей Prisma не используются
- VisionBot, ArgusBot, ArgusSignal - схемы есть, код не использует
- PaperAccount/PaperPosition/PaperTrade - дублируют PaperTradingAccount
- ~30 моделей логирования и ML - только схемы

---

## 📋 ПОЛНЫЙ СПИСОК ЗАГЛУШЕК

### TODO комментарии (47)

| Файл | Описание |
|------|----------|
| `src/components/bots/bot-control-panel.tsx` | TODO: Open config modal |
| `src/app/api/auth/2fa/route.ts` | TODO: Verify password and 2FA code |
| `src/app/api/journal/route.ts` | TODO: Get userId from session |
| `src/lib/paper-trading/engine.ts` | 11 TODO: метрики (sortinoRatio, avgDrawdown, var95...) |
| `src/lib/paper-trading/persistence.ts` | 4 TODO: отслеживание funding, maxEquity |
| `src/lib/dca-bot/dca-bot-engine.ts` | 6 TODO: баланс, метрики |
| `src/lib/backtesting/engine.ts` | 6 TODO: метрики производительности |
| `src/lib/strategy-bot/engine.ts` | 10 TODO: свечи, биржа, позиции |
| `src/lib/argus-bot.ts` | TODO: Execute trade if account connected |
| `src/lib/bot-workers.ts` | TODO: Execute TP sell, Execute SL sell |
| `src/lib/position-monitor.ts` | TODO: track actual hits |
| `src/lib/indicators/ta4j-port.ts` | TODO: Implement daily reset |

### NotImplementedError (3)

| Файл | Метод |
|------|-------|
| `iaf-service/data_providers/__init__.py` | get_historical_data |
| `iaf-service/data_providers/__init__.py` | get_current_price |
| `iaf-service/data_providers/__init__.py` | subscribe_to_updates |

### Mock/Demo данные (15+ файлов)

| Файл | Проблема |
|------|----------|
| `src/lib/demo-data.ts` | 1500+ строк mock данных |
| `src/app/page.tsx` | Использует demo данные |
| `src/components/alerts/alert-system-panel.tsx` | mockAlertHistory, mockStats |
| `src/components/strategy-lab/strategy-lab.tsx` | MOCK_STRATEGIES |
| `src/components/copy-trading/copy-trading-panel.tsx` | MOCK_TRADERS, MOCK_POSITIONS |
| `src/components/risk-management/kill-switch-panel.tsx` | mockHistory |
| `src/app/api/funding/route.ts` | mockRates fallback |
| `src/app/api/hyperopt/run/route.ts` | generateMockCandles |
| `src/app/api/backtesting/run/route.ts` | generateMockCandles |
| `src/app/api/volatility/route.ts` | generateSamplePrices |
| `mini-services/bot-monitor/index.ts` | demoBots array |

---

## ⚠️ ЛОГИЧЕСКИЕ КОНФЛИКТЫ

### Дублирование функционала

| Область | Файлы | Проблема |
|---------|-------|----------|
| Paper Trading | `src/lib/paper-trading/` + Prisma модели | Две реализации |
| Binance Client | `src/lib/binance-client.ts` + `src/lib/exchange/binance-client.ts` | Дублирование |
| Telegram Bot | `src/lib/telegram-bot.ts` + `src/lib/telegram-bot-v2.ts` | Две версии |

### Type Safety проблемы

| Файл | Количество `as any` |
|------|---------------------|
| `src/lib/exchange/*.ts` | ~20 |
| `src/lib/hyperopt/engine.ts` | 8 |
| `src/lib/bot-orchestrator.ts` | 6 |
| `src/lib/websocket/*.ts` | 8 |

---

## 🗄️ ПРОБЛЕМЫ БАЗЫ ДАННЫХ

### Неиспользуемые модели (требуют удаления или реализации)

**Институциональные боты:**
- VisionBot, ArgusBot, ArgusSignal
- SpectrumBot, ReedBot, ArchitectBot
- EquilibristBot, KronBot

**Логирование:**
- BinanceApiRequestLog, BinanceOrderEventLog
- BinanceErrorLog, BinanceTradeLog
- ExchangeApiLog, ExchangeErrorCatalog

**ML/Data:**
- MLTrainingSample, MLEvaluationMetrics
- MLModelTraining, LearningTrade
- SignalFilterConfig, EnsembleWeights

**Другое:**
- PaperAccount, PaperPosition, PaperTrade (дубликаты)
- MarketForecastHistory, DailyStats
- PineIndicator, StrategyTemplate
- ApiKey, Notification, NotificationPreference

---

## 📝 ПЛАН ПОШАГОВОГО ИСПРАВЛЕНИЯ

### Этап 1: Критические исправления (1-2 дня)

1. **Реализовать TODO в strategy-bot/engine.ts**
   ```typescript
   // Добавить реальные методы:
   - getCandles() → использовать ohlcv-service.ts
   - connectExchange() → использовать exchange/*.ts клиентов
   - openPosition() → использовать trading/*.ts
   ```

2. **Исправить mock в API роутах**
   - `/api/backtesting/run` → использовать реальные данные из БД
   - `/api/hyperopt/run` → подключить к OHLCV сервису
   - `/api/funding` → подключить к exchanges API

3. **Удалить дубликаты в БД**
   - Удалить PaperAccount, PaperPosition, PaperTrade
   - Оставить PaperTradingAccount

### Этап 2: Консолидация кода (2-3 дня)

4. **Объединить дубликаты**
   - telegram-bot.ts + telegram-bot-v2.ts → telegram-bot.ts
   - binance-client.ts версии → одна реализация
   - paper-trading консолидация

5. **Исправить type safety**
   - Заменить `as any` на proper типы
   - Убрать @ts-ignore/eslint-disable

### Этап 3: Реализация заглушек (3-5 дней)

6. **Paper Trading Engine**
   - Реализовать 11 метрик в engine.ts
   - Реализовать 4 TODO в persistence.ts

7. **DCA Bot Engine**
   - Реализовать получение баланса
   - Реализовать метрики торговли

8. **UI компоненты**
   - Заменить demo-data.ts на реальные API
   - Убрать MOCK_* константы

### Этап 4: Очистка БД (1 день)

9. **Удалить/реализовать неиспользуемые модели**
   - Удалить модели логирования (не используются)
   - Реализовать или удалить ML модели
   - Добавить миграцию

---

## ✅ РЕКОМЕНДАЦИИ

1. **Приоритет:** Сначала критичные TODO в strategy-bot, потом mock данные
2. **Тестирование:** После каждого этапа запускать lint и проверять работу
3. **Документация:** Обновлять README после каждого этапа
4. **Git:** Делать коммиты после каждого исправления

---

*Отчет сгенерирован автоматически*
