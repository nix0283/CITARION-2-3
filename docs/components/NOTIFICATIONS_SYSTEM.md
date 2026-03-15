# 🔔 Система уведомлений CITARION

**Версия:** 2.0  
**Последнее обновление:** Март 2026  
**Статус:** ✅ Продакшн

---

## 📋 Содержание

1. [Обзор системы](#обзор-системы)
2. [Архитектура](#архитектура)
3. [Компоненты](#компоненты)
   - [Notifications Panel](#notifications-panel)
   - [Alert System Panel](#alert-system-panel)
   - [Telegram Settings](#telegram-settings)
4. [Типы уведомлений](#типы-уведомлений)
5. [Настройка алертов](#настройка-алертов)
6. [Telegram Bot интеграция](#telegram-bot-интеграция)
7. [Push уведомления](#push-уведомления)
8. [Email уведомления](#email-уведомления)
9. [Webhook интеграция](#webhook-интеграция)
10. [Rate Limiting](#rate-limiting)
11. [API Reference](#api-reference)
12. [Примеры использования](#примеры-использования)

---

## Обзор системы

Система уведомлений CITARION обеспечивает многоканальную доставку критически важной информации пользователю в реальном времени.

### Ключевые возможности

| Возможность | Описание |
|-------------|----------|
| **Real-time** | Мгновенная доставка через SSE |
| **Многоканальность** | Telegram, Email, Webhook |
| **Приоритизация** | 4 уровня приоритета сообщений |
| **Rate Limiting** | Защита от флуда |
| **Гибкие правила** | Настраиваемые условия срабатывания |

### Схема доставки

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Торговый бот  │────▶│  Alert Engine    │────▶│   Telegram API  │
│   (событие)     │     │  (роутинг)       │     │   (доставка)    │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        ▼                      ▼                      ▼
┌─────────────────┐   ┌──────────────────┐   ┌─────────────────┐
│   SMTP Server   │   │  Webhook URL     │   │   SSE Push      │
│   (Email)       │   │  (HTTP POST)     │   │   (UI Panel)    │
└─────────────────┘   └──────────────────┘   └─────────────────┘
```

---

## Архитектура

### Компоненты системы

```
src/
├── components/
│   ├── notifications/
│   │   └── notifications-panel.tsx    # Главная панель
│   ├── alerts/
│   │   └── alert-system-panel.tsx     # Система алертов
│   └── telegram/
│       └── telegram-settings.tsx      # Telegram конфигурация
├── lib/
│   └── alert-system.ts                # Core логика алертов
└── app/
    └── api/
        ├── notifications/             # SSE endpoint
        ├── telegram/                  # Telegram API
        └── alerts/                    # Alert API
```

### Интерфейсы данных

```typescript
// Основное уведомление
interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: "low" | "normal" | "high" | "critical";
  data?: Record<string, unknown>;
  read: boolean;
  timestamp: string;
}

// Алерт для отправки
interface Alert {
  id: string;
  timestamp: number;
  channel: AlertChannel;
  priority: AlertPriority;
  title: string;
  message: string;
  sent: boolean;
  sentAt?: number;
  error?: string;
}

// Конфигурация алертов
interface AlertConfig {
  enabled: boolean;
  logAlerts: boolean;
  telegram?: TelegramConfig;
  email?: EmailConfig;
  webhook?: WebhookConfig;
  rateLimits: RateLimits;
}

// Каналы доставки
type AlertChannel = "telegram" | "email" | "webhook";

// Приоритеты
type AlertPriority = "low" | "normal" | "high" | "critical";
```

---

## Компоненты

### Notifications Panel

**Файл:** `src/components/notifications/notifications-panel.tsx`

Главная панель управления уведомлениями в UI.

#### Функции

- Отображение истории уведомлений
- Real-time подключение через SSE
- Управление настройками уведомлений
- Маркировка прочитанных
- Очистка истории

#### Типы уведомлений панели

```typescript
const NOTIFICATION_TYPES = {
  POSITION_OPENED: {
    icon: TrendingUp,
    color: "text-green-500",
    label: "Позиция открыта"
  },
  POSITION_CLOSED: {
    icon: CheckCircle,
    color: "text-blue-500",
    label: "Позиция закрыта"
  },
  TP_HIT: {
    icon: TrendingUp,
    color: "text-green-500",
    label: "Take Profit"
  },
  SL_HIT: {
    icon: TrendingDown,
    color: "text-red-500",
    label: "Stop Loss"
  },
  NEW_SIGNAL: {
    icon: Info,
    color: "text-blue-500",
    label: "Новый сигнал"
  },
  EXTERNAL_POSITION_DETECTED: {
    icon: ExternalLink,
    color: "text-purple-500",
    label: "Внешняя позиция"
  },
  FUNDING_RATE_WARNING: {
    icon: AlertTriangle,
    color: "text-yellow-500",
    label: "Funding Rate"
  },
  SYSTEM_WARNING: {
    icon: AlertTriangle,
    color: "text-yellow-500",
    label: "Предупреждение"
  },
  SYSTEM_ERROR: {
    icon: XCircle,
    color: "text-red-500",
    label: "Ошибка"
  }
};
```

#### Настройки уведомлений

```typescript
interface NotificationSettings {
  positionOpened: boolean;    // Открытие позиции
  positionClosed: boolean;    // Закрытие позиции
  tpHit: boolean;             // Срабатывание TP
  slHit: boolean;             // Срабатывание SL
  newSignal: boolean;         // Новые сигналы
  externalPosition: boolean;  // Внешние позиции
  fundingRate: boolean;       // Предупреждения Funding Rate
  systemAlerts: boolean;      // Системные уведомления
}
```

#### Пример использования

```tsx
import { NotificationsPanel } from "@/components/notifications/notifications-panel";

export default function NotificationsPage() {
  return (
    <div className="container mx-auto p-6">
      <NotificationsPanel />
    </div>
  );
}
```

#### SSE подключение

```typescript
const connectSSE = () => {
  const eventSource = new EventSource("/api/notifications");
  
  eventSource.onopen = () => {
    setIsConnected(true);
  };
  
  eventSource.onmessage = (event) => {
    const notification = JSON.parse(event.data);
    setNotifications(prev => [notification, ...prev].slice(0, 100));
  };
  
  eventSource.onerror = () => {
    setIsConnected(false);
    setTimeout(connectSSE, 5000);
  };
};
```

---

### Alert System Panel

**Файл:** `src/components/alerts/alert-system-panel.tsx`

Расширенная панель управления системой алертов.

#### Структура вкладок

| Вкладка | Описание |
|---------|----------|
| **Channels** | Настройка каналов доставки |
| **Alert Rules** | Управление правилами алертов |
| **Settings** | Глобальные настройки |
| **History** | История отправленных алертов |
| **Test** | Тестирование алертов |

#### Каналы доставки

##### Telegram

```typescript
interface TelegramConfig {
  enabled: boolean;
  botToken: string;
  chatId: string;
}
```

##### Email

```typescript
interface EmailConfig {
  enabled: boolean;
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPass: string;
  fromAddress: string;
  toAddresses: string[];
}
```

##### Webhook

```typescript
interface WebhookConfig {
  enabled: boolean;
  url: string;
  headers: Record<string, string>;
}
```

#### Правила алертов

```typescript
interface AlertRule {
  id: string;
  name: string;
  type: "price" | "trade" | "risk";
  enabled: boolean;
  conditions: {
    field: string;
    operator: string;
    value: string;
  }[];
  channels: AlertChannel[];
  priority: AlertPriority;
}
```

#### Примеры правил

```typescript
// Price Breakout Alert
{
  id: "rule-1",
  name: "Price Breakout Alert",
  type: "price",
  enabled: true,
  conditions: [
    { field: "price_change", operator: ">", value: "5" }
  ],
  channels: ["telegram"],
  priority: "high"
}

// Trade Execution Alert
{
  id: "rule-2",
  name: "Trade Execution Alert",
  type: "trade",
  enabled: true,
  conditions: [
    { field: "trade_size", operator: ">", value: "1000" }
  ],
  channels: ["telegram", "email"],
  priority: "normal"
}

// Drawdown Warning
{
  id: "rule-3",
  name: "Drawdown Warning",
  type: "risk",
  enabled: true,
  conditions: [
    { field: "drawdown", operator: ">", value: "3" }
  ],
  channels: ["telegram", "email", "webhook"],
  priority: "critical"
}
```

#### Статистика алертов

```typescript
interface AlertStats {
  sent: number;      // Отправлено
  failed: number;    // Ошибки
  queued: number;    // В очереди
  byChannel: {
    telegram: number;
    email: number;
    webhook: number;
  };
  byPriority: {
    low: number;
    normal: number;
    high: number;
    critical: number;
  };
}
```

---

### Telegram Settings

**Файл:** `src/components/telegram/telegram-settings.tsx`

Специализированная панель для настройки Telegram интеграции.

#### Статус подключения

```typescript
interface TelegramStatus {
  isConnected: boolean;   // Статус подключения
  botUsername: string;    // Имя бота (@botname)
  webhookUrl: string;     // URL вебхука
  chatId: string;         // ID чата/группы
  isActive: boolean;      // Активность бота
}
```

#### Настройки уведомлений Telegram

```typescript
interface TelegramSettings {
  notifyOnEntry: boolean;     // Открытие позиции
  notifyOnExit: boolean;      // Закрытие позиции
  notifyOnSL: boolean;        // Stop Loss
  notifyOnTP: boolean;        // Take Profit
  notifyOnSignal: boolean;    // Новые сигналы
  notifyOnExternal: boolean;  // Внешние позиции
}
```

#### Доступные команды бота

| Команда | Описание |
|---------|----------|
| `/start` | Запуск бота |
| `/status` | Статус аккаунтов |
| `/positions` | Открытые позиции |
| `/signals` | Последние сигналы |
| `/balance` | Баланс кошелька |
| `/close [symbol]` | Закрыть позицию |

#### Процесс настройки

```
1. Создать бота через @BotFather
   └── Получить токен: 123456789:ABCdefGHI...

2. Ввести токен в UI
   └── Webhook автоматически установится

3. Узнать Chat ID через @userinfobot
   └── Ввести Chat ID в настройках

4. Настроить типы уведомлений
   └── Включить нужные категории

5. Установить команды бота (опционально)
   └── Для интерактивного управления
```

---

## Типы уведомлений

### Категории по источнику

#### Торговые события

| Тип | Код | Приоритет | Описание |
|-----|-----|-----------|----------|
| Позиция открыта | `POSITION_OPENED` | Normal | Открыта новая позиция |
| Позиция закрыта | `POSITION_CLOSED` | Normal | Позиция закрыта |
| Take Profit | `TP_HIT` | High | Сработал TP |
| Stop Loss | `SL_HIT` | High | Сработал SL |

#### Сигналы

| Тип | Код | Приоритет | Описание |
|-----|-----|-----------|----------|
| Новый сигнал | `NEW_SIGNAL` | Normal | Получен новый сигнал |
| Внешняя позиция | `EXTERNAL_POSITION_DETECTED` | Normal | Обнаружена позиция с биржи |

#### Риски

| Тип | Код | Приоритет | Описание |
|-----|-----|-----------|----------|
| Funding Rate | `FUNDING_RATE_WARNING` | High | Высокий funding rate |

#### Система

| Тип | Код | Приоритет | Описание |
|-----|-----|-----------|----------|
| Предупреждение | `SYSTEM_WARNING` | Low | Системное предупреждение |
| Ошибка | `SYSTEM_ERROR` | Critical | Критическая ошибка |

### Уровни приоритета

```
┌────────────────────────────────────────────────────────────┐
│  CRITICAL  │  Обходит rate limits, мгновенная доставка    │
├────────────┼───────────────────────────────────────────────┤
│  HIGH      │  Приоритетная доставка                       │
├────────────┼───────────────────────────────────────────────┤
│  NORMAL    │  Стандартная доставка с rate limits          │
├────────────┼───────────────────────────────────────────────┤
│  LOW       │  Информационные, без срочности               │
└────────────┴───────────────────────────────────────────────┘
```

---

## Настройка алертов

### Создание правила

#### 1. Выбор типа правила

```typescript
type AlertRuleType = 
  | "price"   // Ценовые события
  | "trade"   // Торговые события
  | "risk";   // Риск-события
```

#### 2. Определение условий

```typescript
interface Condition {
  field: string;      // Поле для проверки
  operator: string;   // Оператор сравнения
  value: string;      // Значение
}
```

**Доступные операторы:**

| Оператор | Описание |
|----------|----------|
| `>` | Больше |
| `<` | Меньше |
| `>=` | Больше или равно |
| `<=` | Меньше или равно |
| `==` | Равно |
| `!=` | Не равно |

**Поля для Price алертов:**

- `price_change` — Изменение цены (%)
- `price_cross` — Пересечение уровня
- `volume_surge` — Всплеск объёма

**Поля для Trade алертов:**

- `trade_size` — Размер сделки (USDT)
- `pnl_percent` — PnL (%)
- `leverage` — Плечо

**Поля для Risk алертов:**

- `drawdown` — Просадка (%)
- `margin_usage` — Использование маржи (%)
- `liquidation_distance` — До ликвидации (%)

#### 3. Выбор каналов

```typescript
// Множественный выбор каналов
channels: ["telegram", "email", "webhook"]
```

#### 4. Установка приоритета

```typescript
priority: "critical" | "high" | "normal" | "low"
```

### Примеры конфигураций

#### Критическая просадка

```typescript
{
  name: "Critical Drawdown Alert",
  type: "risk",
  conditions: [
    { field: "drawdown", operator: ">", value: "10" }
  ],
  channels: ["telegram", "email", "webhook"],
  priority: "critical"
}
```

#### Крупная сделка

```typescript
{
  name: "Large Trade Alert",
  type: "trade",
  conditions: [
    { field: "trade_size", operator: ">", value: "10000" }
  ],
  channels: ["telegram", "email"],
  priority: "high"
}
```

#### Сильное движение цены

```typescript
{
  name: "Price Movement Alert",
  type: "price",
  conditions: [
    { field: "price_change", operator: ">", value: "3" }
  ],
  channels: ["telegram"],
  priority: "normal"
}
```

---

## Telegram Bot интеграция

### Получение токена бота

1. Откройте @BotFather в Telegram
2. Отправьте `/newbot`
3. Укажите имя бота
4. Укажите username бота
5. Скопируйте полученный токен

### Установка Webhook

```typescript
// API endpoint
POST /api/telegram/set-webhook

// Request body
{
  "botToken": "123456789:ABCdefGHI..."
}

// Response
{
  "success": true,
  "webhookUrl": "https://your-domain.com/api/telegram/webhook"
}
```

### Получение Chat ID

1. Добавьте бота в группу или начните диалог
2. Отправьте сообщение боту
3. Используйте @userinfobot для получения Chat ID
4. Для групп Chat ID начинается с `-100`

### Формат сообщений

```typescript
// Пример сообщения о позиции
const message = `
🔔 *ПОЗИЦИЯ ОТКРЫТА*

📊 ${symbol}
📍 Направление: ${side}
💰 Размер: ${size} USDT
🎯 Entry: ${entryPrice}
🛡️ SL: ${stopLoss}
🎯 TP: ${takeProfit}

📊 PnL: ${pnl}%
⏰ ${timestamp}
`;
```

### Команды бота

#### /start

```typescript
// Запуск бота
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 
    "👋 Добро пожаловать в CITARION Bot!\n\n" +
    "Используйте команды для управления:\n" +
    "/status - Статус системы\n" +
    "/positions - Позиции\n" +
    "/balance - Баланс"
  );
});
```

#### /status

```typescript
// Получение статуса
bot.onText(/\/status/, async (msg) => {
  const status = await getSystemStatus();
  bot.sendMessage(msg.chat.id, formatStatus(status));
});
```

#### /positions

```typescript
// Открытые позиции
bot.onText(/\/positions/, async (msg) => {
  const positions = await getOpenPositions();
  bot.sendMessage(msg.chat.id, formatPositions(positions));
});
```

#### /close

```typescript
// Закрытие позиции
bot.onText(/\/close (.+)/, async (msg, match) => {
  const symbol = match[1];
  await closePosition(symbol);
  bot.sendMessage(msg.chat.id, `✅ Позиция ${symbol} закрыта`);
});
```

---

## Push уведомления

### Browser Notifications API

```typescript
// Запрос разрешения
async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  return permission === "granted";
}

// Отправка уведомления
function sendBrowserNotification(title: string, options: NotificationOptions) {
  if (Notification.permission === "granted") {
    new Notification(title, {
      icon: "/icon.png",
      badge: "/badge.png",
      ...options
    });
  }
}
```

### Интеграция с SSE

```typescript
// Server-Sent Events для real-time
eventSource.onmessage = (event) => {
  const notification = JSON.parse(event.data);
  
  // Browser notification
  if (notification.priority === "critical") {
    sendBrowserNotification(notification.title, {
      body: notification.message,
      tag: notification.id
    });
  }
  
  // Toast уведомление в UI
  toast[notification.priority](notification.message);
};
```

---

## Email уведомления

### SMTP Конфигурация

```typescript
interface EmailConfig {
  smtpHost: string;      // smtp.gmail.com
  smtpPort: string;      // 587
  smtpUser: string;      // user@gmail.com
  smtpPass: string;      // app password
  fromAddress: string;   // noreply@domain.com
  toAddresses: string[]; // recipient list
}
```

### Пример отправки

```typescript
import nodemailer from "nodemailer";

async function sendEmailAlert(config: EmailConfig, alert: Alert) {
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: parseInt(config.smtpPort),
    secure: false,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass
    }
  });

  await transporter.sendMail({
    from: config.fromAddress,
    to: config.toAddresses.join(", "),
    subject: `[CITARION] ${alert.title}`,
    html: `
      <h2>${alert.title}</h2>
      <p>${alert.message}</p>
      <hr>
      <small>Priority: ${alert.priority}</small>
    `
  });
}
```

### Шаблоны писем

```typescript
// Критический алерт
const criticalTemplate = (alert: Alert) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    .critical { background: #fee2e2; border-left: 4px solid #ef4444; }
    .high { background: #fef3c7; border-left: 4px solid #f59e0b; }
  </style>
</head>
<body>
  <div class="${alert.priority}">
    <h1>🚨 ${alert.title}</h1>
    <p>${alert.message}</p>
    <p>Time: ${new Date(alert.timestamp).toISOString()}</p>
  </div>
</body>
</html>
`;
```

---

## Webhook интеграция

### Конфигурация

```typescript
interface WebhookConfig {
  enabled: boolean;
  url: string;                              // https://api.example.com/webhook
  headers: Record<string, string>;          // {"Authorization": "Bearer token"}
}
```

### Формат payload

```typescript
interface WebhookPayload {
  id: string;
  timestamp: number;
  type: string;
  priority: AlertPriority;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  metadata: {
    source: "citarion";
    version: "2.0";
    environment: "production";
  };
}
```

### Пример отправки

```typescript
async function sendWebhookAlert(config: WebhookConfig, payload: WebhookPayload) {
  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...config.headers
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Webhook failed: ${response.status}`);
  }

  return response.json();
}
```

### Пример payload

```json
{
  "id": "alert-123",
  "timestamp": 1703123456000,
  "type": "POSITION_CLOSED",
  "priority": "high",
  "title": "Position Closed: BTC/USDT",
  "message": "Closed LONG position with +2.5% PnL",
  "data": {
    "symbol": "BTC/USDT",
    "side": "LONG",
    "pnl": 2.5,
    "entryPrice": 42000,
    "exitPrice": 43050
  },
  "metadata": {
    "source": "citarion",
    "version": "2.0",
    "environment": "production"
  }
}
```

---

## Rate Limiting

### Конфигурация

```typescript
interface RateLimits {
  maxPerMinute: number;   // Максимум в минуту
  maxPerHour: number;     // Максимум в час
  maxPerDay: number;      // Максимум в день
  burstLimit: number;     // Максимум в секунду
}
```

### Значения по умолчанию

```typescript
const defaultRateLimits: RateLimits = {
  maxPerMinute: 10,
  maxPerHour: 50,
  maxPerDay: 200,
  burstLimit: 3
};
```

### Алгоритм throttling

```typescript
class RateLimiter {
  private counters = {
    minute: { count: 0, resetAt: Date.now() + 60000 },
    hour: { count: 0, resetAt: Date.now() + 3600000 },
    day: { count: 0, resetAt: Date.now() + 86400000 },
    burst: { count: 0, resetAt: Date.now() + 1000 }
  };

  canSend(priority: AlertPriority): boolean {
    // Critical bypasses rate limits
    if (priority === "critical") return true;

    const now = Date.now();
    
    // Reset counters if expired
    for (const key of Object.keys(this.counters)) {
      if (now > this.counters[key].resetAt) {
        this.counters[key] = { count: 0, resetAt: now + this.getResetTime(key) };
      }
    }

    // Check limits
    return (
      this.counters.minute.count < this.limits.maxPerMinute &&
      this.counters.hour.count < this.limits.maxPerHour &&
      this.counters.day.count < this.limits.maxPerDay &&
      this.counters.burst.count < this.limits.burstLimit
    );
  }
}
```

---

## API Reference

### Notifications API

#### GET /api/notifications

Получение истории уведомлений.

```typescript
// Request
GET /api/notifications?history=true&limit=50

// Response
{
  "success": true,
  "notifications": [
    {
      "id": "notif-1",
      "type": "POSITION_OPENED",
      "title": "BTC/USDT LONG",
      "message": "Position opened at 42000",
      "priority": "normal",
      "read": false,
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### GET /api/notifications (SSE)

Real-time поток уведомлений.

```typescript
const eventSource = new EventSource("/api/notifications");

eventSource.onmessage = (event) => {
  const notification = JSON.parse(event.data);
  console.log(notification);
};
```

#### POST /api/notifications

Обновление настроек.

```typescript
// Request
POST /api/notifications
{
  "settings": {
    "positionOpened": true,
    "tpHit": true,
    "slHit": true
  }
}

// Response
{
  "success": true
}
```

### Telegram API

#### GET /api/telegram/webhook

Статус webhook.

```typescript
// Response
{
  "success": true,
  "status": {
    "isConnected": true,
    "botUsername": "citarion_bot",
    "webhookUrl": "https://...",
    "chatId": "-1001234567890",
    "isActive": true
  }
}
```

#### POST /api/telegram/set-webhook

Установка webhook.

```typescript
// Request
POST /api/telegram/set-webhook
{
  "botToken": "123456789:ABC..."
}

// Response
{
  "success": true,
  "webhookUrl": "https://your-domain.com/api/telegram/webhook"
}
```

#### POST /api/telegram/settings

Сохранение настроек.

```typescript
// Request
POST /api/telegram/settings
{
  "chatId": "-1001234567890",
  "settings": {
    "notifyOnEntry": true,
    "notifyOnExit": true
  }
}
```

### Alerts API

#### GET /api/alerts/stats

Статистика алертов.

```typescript
// Response
{
  "sent": 156,
  "failed": 12,
  "queued": 3,
  "byChannel": {
    "telegram": 98,
    "email": 34,
    "webhook": 24
  },
  "byPriority": {
    "low": 45,
    "normal": 67,
    "high": 32,
    "critical": 12
  }
}
```

#### POST /api/alerts/send

Отправка тестового алерта.

```typescript
// Request
POST /api/alerts/send
{
  "title": "Test Alert",
  "message": "This is a test",
  "channel": "telegram",
  "priority": "normal"
}
```

---

## Примеры использования

### Интеграция в бота

```typescript
import { AlertSystem } from "@/lib/alert-system";

class TradingBot {
  private alertSystem: AlertSystem;

  constructor(config: AlertConfig) {
    this.alertSystem = new AlertSystem(config);
  }

  async onPositionOpened(position: Position) {
    await this.alertSystem.send({
      type: "POSITION_OPENED",
      title: `${position.symbol} ${position.side}`,
      message: `Position opened at ${position.entryPrice}`,
      priority: "normal",
      data: position,
      channels: ["telegram", "email"]
    });
  }

  async onStopLoss(position: Position) {
    await this.alertSystem.send({
      type: "SL_HIT",
      title: `SL Triggered: ${position.symbol}`,
      message: `Stop loss hit at ${position.currentPrice}. PnL: ${position.pnl}%`,
      priority: "high",
      data: position,
      channels: ["telegram", "email", "webhook"]
    });
  }

  async onCriticalError(error: Error) {
    await this.alertSystem.send({
      type: "SYSTEM_ERROR",
      title: "Critical System Error",
      message: error.message,
      priority: "critical",
      channels: ["telegram", "email"]
    });
  }
}
```

### Программное создание правил

```typescript
async function createDefaultAlertRules() {
  const rules = [
    {
      name: "Critical Drawdown",
      type: "risk",
      conditions: [{ field: "drawdown", operator: ">", value: "10" }],
      channels: ["telegram", "email"],
      priority: "critical"
    },
    {
      name: "Daily Profit Target",
      type: "trade",
      conditions: [{ field: "daily_pnl", operator: ">", value: "5" }],
      channels: ["telegram"],
      priority: "normal"
    }
  ];

  for (const rule of rules) {
    await fetch("/api/alerts/rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rule)
    });
  }
}
```

### Обработка webhook

```typescript
// На стороне принимающего сервиса
app.post("/webhook/citarion", (req, res) => {
  const alert = req.body as WebhookPayload;

  // Логирование
  console.log(`[${alert.priority}] ${alert.title}: ${alert.message}`);

  // Маршрутизация по типу
  switch (alert.type) {
    case "POSITION_OPENED":
      handleNewPosition(alert.data);
      break;
    case "SL_HIT":
      handleStopLoss(alert.data);
      break;
    case "SYSTEM_ERROR":
      triggerIncident(alert);
      break;
  }

  res.json({ received: true });
});
```

### Мониторинг здоровья системы

```typescript
async function checkNotificationHealth() {
  const [telegramStatus, emailStatus, stats] = await Promise.all([
    fetch("/api/telegram/webhook").then(r => r.json()),
    fetch("/api/alerts/email/status").then(r => r.json()),
    fetch("/api/alerts/stats").then(r => r.json())
  ]);

  return {
    telegram: telegramStatus.status?.isConnected ?? false,
    email: emailStatus.connected ?? false,
    stats: {
      sentToday: stats.sent,
      failedRate: stats.failed / (stats.sent + stats.failed)
    },
    healthy: telegramStatus.status?.isConnected && 
             stats.failed / (stats.sent + stats.failed) < 0.1
  };
}
```

---

## 📊 Диагностика проблем

### Уведомления не приходят в Telegram

| Проблема | Решение |
|----------|---------|
| Webhook не установлен | Проверить токен, переустановить webhook |
| Неверный Chat ID | Уточнить через @userinfobot |
| Бот не в группе | Добавить бота в чат |
| Rate limit | Проверить настройки rate limiting |

### Email не отправляется

| Проблема | Решение |
|----------|---------|
| SMTP авторизация | Проверить логин/пароль |
| Порт заблокирован | Попробовать порт 587 или 465 |
| App Password | Использовать app-specific password для Gmail |
| SPF/DKIM | Настроить DNS записи домена |

### Webhook возвращает ошибку

| Код | Причина | Решение |
|-----|---------|---------|
| 400 | Неверный формат | Проверить JSON payload |
| 401 | Авторизация | Проверить headers |
| 404 | Не найден | Проверить URL |
| 500 | Ошибка сервера | Проверить логи принимающего сервиса |

---

## 🔗 Связанные документы

- [Telegram Service](../microservices/telegram-service.md)
- [Alert System Library](../../lib/alert-system.ts)
- [API Documentation](../api/README.md)
- [Mobile UX Guide](../MOBILE_UX_GUIDE.md)

---

*Документация обновлена: Март 2026*
