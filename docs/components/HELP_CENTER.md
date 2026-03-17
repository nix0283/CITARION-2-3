# Help Center

**Version:** 1.0 | **Last Updated:** March 2026

---

## Overview

Help Center — комплексная панель помощи с FAQ, документацией, руководством быстрого старта и каналами поддержки.

**File:** `src/components/help/help-panel.tsx`

---

## Features

| Feature | Description |
|---------|-------------|
| **FAQ** | Категоризированные вопросы-ответы с поиском |
| **Documentation** | Структурированная документация |
| **Quick Start** | Пошаговое руководство для новичков |
| **Support** | Каналы связи с поддержкой |

---

## Component Structure

### Tabs

| Tab | Icon | Description |
|-----|------|-------------|
| **faq** | `HelpCircle` | Часто задаваемые вопросы |
| **docs** | `BookOpen` | Документация |
| **quickstart** | `Rocket` | Быстрый старт |
| **support** | `MessageSquare` | Поддержка |

---

## FAQ System

### Categories

```typescript
const faqCategories = [
  {
    category: "Начало работы",
    icon: Rocket,
    questions: [...]
  },
  {
    category: "Торговые боты",
    icon: Bot,
    questions: [...]
  },
  {
    category: "Copy Trading",
    icon: Users,
    questions: [...]
  },
  {
    category: "Риск-менеджмент",
    icon: Shield,
    questions: [...]
  },
  {
    category: "Уведомления",
    icon: MessageSquare,
    questions: [...]
  },
  {
    category: "Оракул (AI Ассистент)",
    icon: Lightbulb,
    questions: [...]
  }
]
```

### Question Structure

```typescript
interface FAQQuestion {
  q: string    // Вопрос
  a: string    // Ответ
}

// Example
{
  q: "Как подключить биржу?",
  a: "Перейдите в раздел 'Биржи' → 'Подключить аккаунт'. Выберите биржу..."
}
```

### Search Functionality

```typescript
const filteredFAQ = faqCategories.map((cat) => ({
  ...cat,
  questions: cat.questions.filter(
    (q) =>
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
  )
})).filter((cat) => cat.questions.length > 0)
```

---

## Documentation Links

### Sections

```typescript
const docSections = [
  {
    title: "Торговые боты",
    icon: Bot,
    items: [
      { name: "Grid Bot", href: "#grid-bot" },
      { name: "DCA Bot", href: "#dca-bot" },
      { name: "BB Bot", href: "#bb-bot" },
      { name: "Argus Bot", href: "#argus-bot" },
      { name: "Vision Bot", href: "#vision-bot" },
      { name: "WolfBot", href: "#wolfbot" }
    ]
  },
  {
    title: "Аналитика",
    icon: ChartLine,
    items: [...]
  },
  {
    title: "Риск-менеджмент",
    icon: Shield,
    items: [...]
  },
  {
    title: "Продвинутые функции",
    icon: Zap,
    items: [...]
  }
]
```

### API Documentation

| API | Description |
|-----|-------------|
| **REST API** | Полный доступ к функциям платформы |
| **WebSocket API** | Real-time данные и события |

---

## Quick Start Guide

### Steps

```typescript
const quickStartSteps = [
  {
    step: 1,
    title: "Подключите биржу",
    description: "Добавьте API ключи от Binance, Bybit, OKX...",
    icon: Settings
  },
  {
    step: 2,
    title: "Выберите стратегию",
    description: "Grid для флета, DCA для усреднения...",
    icon: Lightbulb
  },
  {
    step: 3,
    title: "Настройте параметры",
    description: "Торговая пара, размер позиции...",
    icon: Settings
  },
  {
    step: 4,
    title: "Запустите и мониторьте",
    description: "Активируйте бота и отслеживайте...",
    icon: Rocket
  }
]
```

### Tips

| Type | Icon | Color | Example |
|------|------|-------|---------|
| **Recommended** | `CheckCircle2` | Green | Начните с Demo режима |
| **Warning** | `AlertTriangle` | Amber | Всегда устанавливайте Stop Loss |
| **Tip** | `Lightbulb` | Blue | Используйте Оракул для помощи |

---

## Support Channels

### Available Channels

```typescript
const supportChannels = [
  {
    name: "Telegram",
    icon: Send,
    description: "Быстрая поддержка и сообщество",
    link: "https://t.me/CITARION_Support",
    available: "24/7"
  },
  {
    name: "Email",
    icon: Mail,
    description: "Для детальных запросов",
    link: "mailto:support@citarion.io",
    available: "Ответ в течение 24ч"
  },
  {
    name: "Документация",
    icon: FileText,
    description: "Полное руководство пользователя",
    link: "/docs",
    available: "Всегда доступно"
  },
  {
    name: "Видеоуроки",
    icon: Video,
    description: "Обучающие видео",
    link: "/tutorials",
    available: "Всегда доступно"
  }
]
```

---

## System Status

### Status Indicators

| Status | Badge | Color |
|--------|-------|-------|
| **Operational** | `bg-green-500` | Green |
| **Degraded** | `bg-amber-500` | Amber |
| **Down** | `bg-red-500` | Red |

### Monitored Services

| Service | Default Status |
|---------|----------------|
| API Gateway | Operational |
| Trading Engine | Operational |
| Data Feeds | Operational |
| Notifications | Degraded |

---

## Usage

### Basic Usage

```tsx
import { HelpPanel } from '@/components/help/help-panel'

function HelpPage() {
  return (
    <div className="h-screen">
      <HelpPanel />
    </div>
  )
}
```

### With Search

```tsx
function HelpWithSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Поиск по FAQ..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border"
      />
      <HelpPanel searchQuery={searchQuery} />
    </div>
  )
}
```

---

## FAQ Categories Details

### 1. Начало работы

| Question | Summary |
|----------|---------|
| Как подключить биржу? | Биржи → Подключить аккаунт → API Key |
| Что такое Demo режим? | Тестирование без реальных средств |
| Как создать первого бота? | Выбрать тип → Настроить → Start |

### 2. Торговые боты

| Question | Summary |
|----------|---------|
| Grid vs DCA | Grid = флэт, DCA = усреднение |
| Настройка Argus Bot | ML-анализ, чувствительность, SL |
| Несколько ботов | Да, разные пары/стратегии |
| Что такое WolfBot? | Паттерны + индикаторы + ML |

### 3. Copy Trading

| Question | Summary |
|----------|---------|
| Стать Master Trader | Copy Trading → Master Trader → Заявка |
| Копировать сделки | Выбрать Master → Follow → Настройки |
| Поддерживаемые биржи | OKX, Bitget (полная), Binance/Bybit (огр.) |

### 4. Риск-менеджмент

| Question | Summary |
|----------|---------|
| Stop Loss | Процент от входа или Trailing Stop |
| Kill Switch | Аварийное отключение при крит. условиях |
| Drawdown Monitor | Реальное время + уведомления |

### 5. Уведомления

| Question | Summary |
|----------|---------|
| Telegram уведомления | Настройки → Telegram → @CITARION_Bot |
| Типы уведомлений | Сигналы, ордера, P&L, риски, новости |

### 6. Оракул (AI Ассистент)

| Question | Summary |
|----------|---------|
| Что умеет? | Анализ рынка, ответы, настройки |
| Как использовать? | Открыть Оракул → Задать вопрос |

---

## Version Info

```typescript
// Displayed in Support tab
const versionInfo = {
  app: "CITARION",
  version: "v2.0.0",
  lastUpdated: "2025-01-15"
}
```

---

## Related Documentation

- [USER_MANUAL.md](../business-logic/USER_MANUAL.md) - User Manual
- [../deployment/MONITORING_AND_ALERTING.md](../deployment/MONITORING_AND_ALERTING.md) - Monitoring
- [../development/TROUBLESHOOTING.md](../development/TROUBLESHOOTING.md) - Troubleshooting

---

*Last updated: March 2026 | CITARION Documentation Team*
