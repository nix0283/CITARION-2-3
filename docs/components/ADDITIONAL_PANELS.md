# Additional UI Panels Documentation

**Version:** 2.0  
**Last Updated:** March 2026  
**Components Covered:** 9

---

## Table of Contents

1. [Journal Panel](#1-journal-panel---торговый-журнал)
2. [News Panel](#2-news-panel---лента-новостей)
3. [Workspace Panel](#3-workspace-panel---рабочая-область)
4. [Backup Panel](#4-backup-panel---резервное-копирование)
5. [Help Panel](#5-help-panel---справка)
6. [Share Components](#6-share-components---шеринг-результатов)
7. [Prediction Panel](#7-prediction-panel---предсказания-ml)

---

## 1. Journal Panel - Торговый журнал

### Описание

Journal Panel — это компонент для ведения торгового журнала, позволяющий трейдерам документировать свои сделки, анализировать ошибки и отслеживать эмоциональное состояние во время торговли. Компонент поддерживает фильтрацию, поиск и статистический анализ записей.

**Файл:** `src/components/journal/journal-panel.tsx`

### Ключевые возможности

- 📝 Создание записей с деталями сделок
- 📊 Статистика по всем сделкам (Win Rate, Profit Factor)
- 🏷️ Теги для категоризации сделок
- 😊 Отслеживание эмоционального состояния
- ⭐ Оценка качества входа, выхода и риск-менеджмента
- 🔍 Фильтрация и поиск по записям
- 📱 Адаптивный интерфейс

### Props Интерфейсы

```typescript
// Основная запись журнала
interface JournalEntry {
  id: string;
  title: string;
  content: string;
  tradeId?: string;
  symbol?: string;
  direction?: 'LONG' | 'SHORT';
  marketCondition: 'trending' | 'ranging' | 'volatile' | 'choppy' | 'neutral';
  entryPrice?: number;
  exitPrice?: number;
  size?: number;
  pnl: number;
  pnlPercent: number;
  entryQuality: number;        // 0-1
  exitQuality: number;         // 0-1
  riskManagement: number;      // 0-1
  lessons: string[];
  mistakes: string[];
  improvements: string[];
  emotion: 'confident' | 'neutral' | 'fearful' | 'greedy' | 'anxious' | 'hopeful';
  tags: string[];
  reviewStatus: 'pending' | 'reviewed' | 'archived';
  confidence?: number;
  signalSource?: string;
  timeInTrade?: number;
  tradeDate: string;
  createdAt: string;
  updatedAt: string;
}

// Статистика журнала
interface JournalStats {
  totalEntries: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number | null;
  totalPnL: number | null;
  avgPnL: number | null;
  avgWin: number | null;
  avgLoss: number | null;
  profitFactor: number | null;
  avgEntryQuality: number | null;
  avgExitQuality: number | null;
  avgRiskMgmt: number | null;
  byCondition?: Record<string, { count: number; pnl: number; winRate: number }>;
  byEmotion?: Record<string, { count: number; pnl: number; winRate: number }>;
}

// Ответ API с пагинацией
interface PaginatedResponse {
  success: boolean;
  data: JournalEntry[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  stats: JournalStats;
}
```

### Константы

```typescript
// Рыночные условия
const MARKET_CONDITIONS = [
  { value: 'trending', label: 'Trending', icon: TrendingUp },
  { value: 'ranging', label: 'Ranging', icon: BarChart3 },
  { value: 'volatile', label: 'Volatile', icon: Zap },
  { value: 'choppy', label: 'Choppy', icon: AlertTriangle },
  { value: 'neutral', label: 'Neutral', icon: Meh },
];

// Эмоциональные состояния
const EMOTIONS = [
  { value: 'confident', label: 'Confident', icon: Smile, color: 'text-green-500' },
  { value: 'neutral', label: 'Neutral', icon: Meh, color: 'text-gray-500' },
  { value: 'hopeful', label: 'Hopeful', icon: Heart, color: 'text-pink-500' },
  { value: 'anxious', label: 'Anxious', icon: AlertCircle, color: 'text-yellow-500' },
  { value: 'fearful', label: 'Fearful', icon: Frown, color: 'text-orange-500' },
  { value: 'greedy', label: 'Greedy', icon: TrendingUp, color: 'text-red-500' },
];

// Быстрые теги
const QUICK_TAGS = [
  'Breakout', 'Reversal', 'Trend Follow', 'Scalp', 'Swing',
  'FOMO', 'Revenge Trade', 'Plan Followed', 'Good Entry', 'Bad Entry',
  'Early Exit', 'Late Exit', 'SL Hit', 'TP Hit', 'Breakeven'
];
```

### API Эндпоинты

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| `GET` | `/api/journal` | Получить записи с пагинацией |
| `POST` | `/api/journal` | Создать новую запись |
| `PUT` | `/api/journal/:id` | Обновить запись |
| `DELETE` | `/api/journal/:id` | Удалить запись |

#### GET /api/journal

**Query Parameters:**
```
page: number (default: 1)
limit: number (default: 10)
sortBy: 'tradeDate' | 'createdAt' | 'pnl'
sortOrder: 'asc' | 'desc'
status: 'pending' | 'reviewed' | 'archived' | 'all'
symbol: string
emotion: string
marketCondition: string
search: string
```

**Пример ответа:**
```json
{
  "success": true,
  "data": [
    {
      "id": "entry_123",
      "title": "BTC Long Breakout",
      "content": "Strong breakout above resistance...",
      "symbol": "BTCUSDT",
      "direction": "LONG",
      "pnl": 223.45,
      "pnlPercent": 0.0223,
      "entryQuality": 0.8,
      "exitQuality": 0.7,
      "riskManagement": 0.9,
      "emotion": "confident",
      "tags": ["Breakout", "Trend Follow"],
      "reviewStatus": "reviewed"
    }
  ],
  "meta": {
    "total": 156,
    "page": 1,
    "limit": 10,
    "totalPages": 16
  },
  "stats": {
    "winRate": 0.686,
    "totalPnL": 3428.75,
    "profitFactor": 2.07
  }
}
```

### Примеры использования

#### Создание записи журнала

```typescript
// В компоненте
const handleCreateEntry = async () => {
  const res = await fetch('/api/journal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'BTC Long Breakout',
      content: 'Strong breakout above $67,000 resistance with high volume',
      symbol: 'BTCUSDT',
      direction: 'LONG',
      marketCondition: 'trending',
      entryPrice: 67000,
      exitPrice: 68500,
      size: 0.1,
      pnl: 150,
      entryQuality: 0.8,
      exitQuality: 0.7,
      riskManagement: 0.9,
      emotion: 'confident',
      tags: ['Breakout', 'Trend Follow'],
      lessons: ['Wait for volume confirmation'],
      mistakes: ['Entered slightly early'],
      improvements: ['Use limit orders for better entry']
    }),
  });
  const data = await res.json();
};
```

#### Интеграция в панель

```tsx
import { JournalPanel } from '@/components/journal/journal-panel';

function TradingPage() {
  return (
    <div className="flex h-full">
      <div className="flex-1">
        <TradingChart />
      </div>
      <div className="w-[400px] border-l">
        <JournalPanel />
      </div>
    </div>
  );
}
```

---

## 2. News Panel - Лента новостей

### Описание

News Panel — компонент для отображения криптовалютных новостей с автоматическим анализом сентимента. Включает фильтрацию по категориям, важности и связанным символам.

**Файл:** `src/components/news/news-panel.tsx`

### Ключевые возможности

- 📰 Real-time новости криптовалютного рынка
- 🤖 Автоматический анализ сентимента (Bullish/Bearish/Neutral)
- 📊 Оценка важности новостей (Critical/High/Medium/Low)
- 🔍 Фильтрация по категориям, символам, сентименту
- 🔖 Закладки для сохранения важных статей
- 📈 Связь новостей с торговыми символами

### Props Интерфейсы

```typescript
// Новостная статья
interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content?: string;
  url: string;
  imageUrl?: string;
  source: string;
  author?: string;
  category: string;
  tags: string[];
  sentiment: string;          // 'bullish' | 'bearish' | 'neutral'
  sentimentScore: number;     // -1 to 1
  confidence: number;         // 0 to 1
  relatedSymbols: string[];
  importance: string;         // 'critical' | 'high' | 'medium' | 'low'
  publishedAt: string;
  fetchedAt: string;
}

// Статистика новостей
interface NewsStats {
  totalArticles: number;
  recentArticles: number;
  articlesBySentiment: Record<string, number>;
  articlesByCategory: Record<string, number>;
  articlesBySource: Record<string, number>;
}

// Фильтры
interface NewsFilter {
  category: string;
  sentiment: string;
  importance: string;
  source: string;
  symbol: string;
  search: string;
}
```

### Категории и Фильтры

```typescript
const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "market", label: "Market" },
  { value: "bitcoin", label: "Bitcoin" },
  { value: "ethereum", label: "Ethereum" },
  { value: "defi", label: "DeFi" },
  { value: "regulation", label: "Regulation" },
  { value: "technology", label: "Technology" },
  { value: "trading", label: "Trading" },
  { value: "exchange", label: "Exchanges" },
];

const SENTIMENTS = [
  { value: "all", label: "All Sentiment" },
  { value: "bullish", label: "Bullish", icon: TrendingUp, color: "text-green-500" },
  { value: "bearish", label: "Bearish", icon: TrendingDown, color: "text-red-500" },
  { value: "neutral", label: "Neutral", icon: Minus, color: "text-gray-500" },
];

const IMPORTANCE_LEVELS = [
  { value: "all", label: "All Importance" },
  { value: "critical", label: "Critical", color: "bg-red-500" },
  { value: "high", label: "High", color: "bg-orange-500" },
  { value: "medium", label: "Medium", color: "bg-yellow-500" },
  { value: "low", label: "Low", color: "bg-gray-500" },
];
```

### API Эндпоинты

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| `GET` | `/api/news` | Получить новости с фильтрами |
| `POST` | `/api/news` | Запустить сбор новостей |
| `POST` | `/api/news/bookmarks` | Добавить в закладки |
| `DELETE` | `/api/news/bookmarks?articleId=...` | Удалить из закладок |

#### GET /api/news

**Query Parameters:**
```
page: number
limit: number
sortBy: 'publishedAt' | 'sentimentScore' | 'importance'
sortOrder: 'asc' | 'desc'
category: string
sentiment: 'bullish' | 'bearish' | 'neutral'
importance: 'critical' | 'high' | 'medium' | 'low'
source: string
symbol: string
search: string
```

**Пример ответа:**
```json
{
  "success": true,
  "data": [
    {
      "id": "news_123",
      "title": "Bitcoin ETF Sees Record Inflows",
      "summary": "Institutional demand for Bitcoin ETF continues to grow...",
      "url": "https://example.com/news/btc-etf",
      "source": "CoinDesk",
      "category": "bitcoin",
      "sentiment": "bullish",
      "sentimentScore": 0.72,
      "confidence": 0.89,
      "relatedSymbols": ["BTC", "BTCUSDT"],
      "importance": "high",
      "publishedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "meta": { "total": 1250, "page": 1, "totalPages": 84 },
  "stats": {
    "totalArticles": 1250,
    "recentArticles": 48,
    "articlesBySentiment": { "bullish": 420, "bearish": 280, "neutral": 550 }
  }
}
```

### Примеры использования

```tsx
import { NewsPanel } from '@/components/news/news-panel';

function DashboardPage() {
  return (
    <Tabs defaultValue="news">
      <TabsList>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="news">News</TabsTrigger>
      </TabsList>
      <TabsContent value="news">
        <NewsPanel />
      </TabsContent>
    </Tabs>
  );
}
```

---

## 3. Workspace Panel - Рабочая область

### Описание

Workspace Panel — компонент для обзора проекта и управления файлами. Отображает структуру проекта, статус сервера, статистику файлов и файловый менеджер.

**Файл:** `src/components/workspace/workspace-panel.tsx`

### Ключевые возможности

- 📁 Дерево файлов проекта с иконками по типу
- 📊 Статистика проекта (TSX, TS файлы, API маршруты)
- 🖥️ Статус сервера (Online/Offline)
- ⚡ Подключённые биржи через WebSocket
- 📤 Загрузка и скачивание файлов
- 🔄 Процессы в памяти

### Props Интерфейсы

```typescript
// Узел дерева файлов
interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  path: string;
  ext?: string;
}

// Статистика проекта
interface ProjectStats {
  tsxFiles: number;
  tsFiles: number;
  apiRoutes: number;
  components: number;
  libs: number;
  totalFiles: number;
}

// Статус сервера
interface ServerStatus {
  status: "online" | "offline" | "loading";
  port: number;
  uptime: string;
  lastCheck: Date | null;
}

// Информация о файле
interface FileInfo {
  name: string;
  path: string;
  size: number;
  modified: string;
  type: "file" | "folder";
  ext?: string;
}

// Данные файлов
interface FilesData {
  download: {
    path: string;
    files: FileInfo[];
    stats: { totalFiles: number; totalSize: number; totalSizeFormatted: string; };
  };
  upload: {
    path: string;
    files: FileInfo[];
    stats: { totalFiles: number; totalSize: number; totalSizeFormatted: string; };
  };
}
```

### API Эндпоинты

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| `GET` | `/api/files/list` | Получить список файлов |
| `GET` | `/api/files/download?path=...` | Скачать файл |
| `POST` | `/api/files/upload` | Загрузить файл |

### Внутренние компоненты

```typescript
// Компонент дерева файлов
function FileTreeItem({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const isFolder = node.type === "folder";
  // ... рендеринг узла
}

// Карточка статуса сервера
function ServerStatusCard({ status }: { status: ServerStatus }) {
  // ... отображение статуса
}

// Карточка статистики проекта
function ProjectStatsCard() {
  // ... отображение статистики
}

// Карточка технологий
function TechStackCard() {
  // ... отображение стека технологий
}

// Файловый менеджер
function FileManager() {
  // ... управление файлами
}
```

### Примеры использования

```tsx
import { WorkspacePanel } from '@/components/workspace/workspace-panel';

function DevToolsPage() {
  return (
    <div className="p-6">
      <WorkspacePanel />
    </div>
  );
}
```

---

## 4. Backup Panel - Резервное копирование

### Описание

Backup Panel — полнофункциональный компонент для управления резервным копированием базы данных. Поддерживает создание бэкапов, планирование, восстановление и шифрование.

**Файл:** `src/components/backup/backup-panel.tsx`

### Ключевые возможности

- 💾 Создание бэкапов (Full/Incremental)
- 📅 Планирование автоматических бэкапов
- 🔐 Шифрование AES-256
- 📦 Сжатие данных
- 🔄 Восстановление из бэкапа
- 📊 Статистика бэкапов
- 🗑️ Управление хранением (retention)

### Props Интерфейсы

```typescript
// Запись бэкапа
interface BackupRecord {
  id: string;
  name: string;
  description?: string;
  type: string;              // 'full' | 'incremental'
  status: string;            // 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'
  fileName: string;
  filePath?: string;
  fileSize: number;
  checksum?: string;
  compressed: boolean;
  encrypted: boolean;
  scope: string;             // 'database' | 'config' | 'all'
  tables: string[];
  recordCount: number;
  retentionDays: number;
  warningCount: number;
  errorMessage?: string;
  triggeredBy: string;       // 'manual' | 'scheduled'
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

// Расписание бэкапов
interface BackupSchedule {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  frequency: string;         // 'hourly' | 'daily' | 'weekly' | 'monthly'
  hour: number;
  minute: number;
  dayOfWeek?: number;
  dayOfMonth?: number;
  type: string;
  scope: string;
  retentionDays: number;
  compress: boolean;
  encrypt: boolean;
  lastRunAt?: string;
  lastRunStatus?: string;
  nextRunAt?: string;
  totalRuns: number;
  successCount: number;
  failureCount: number;
  notifyChannels: string[];
}

// Статистика бэкапов
interface BackupStats {
  totalBackups: number;
  totalSize: number;
  successfulBackups: number;
  failedBackups: number;
  lastBackup?: string;
  lastSuccessful?: string;
  avgBackupSize: number;
  upcomingScheduled?: string;
}

// Ответ API
interface BackupListResponse {
  success: boolean;
  data: BackupRecord[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
  };
  stats: BackupStats;
}
```

### Константы статусов

```typescript
const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'Pending', color: 'bg-gray-500', icon: Clock },
  running: { label: 'Running', color: 'bg-blue-500 animate-pulse', icon: RefreshCw },
  completed: { label: 'Completed', color: 'bg-green-500', icon: CheckCircle2 },
  failed: { label: 'Failed', color: 'bg-red-500', icon: XCircle },
  cancelled: { label: 'Cancelled', color: 'bg-gray-400', icon: AlertTriangle },
};

const FREQUENCY_LABELS: Record<string, string> = {
  hourly: 'Hourly',
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
};
```

### API Эндпоинты

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| `GET` | `/api/backup` | Получить список бэкапов |
| `POST` | `/api/backup` | Создать бэкап |
| `DELETE` | `/api/backup?id=...` | Удалить бэкап |
| `GET` | `/api/backup/schedules` | Получить расписания |
| `POST` | `/api/backup/schedules` | Создать расписание |
| `PATCH` | `/api/backup/schedules` | Управление расписанием (toggle/trigger) |
| `POST` | `/api/backup/restore` | Восстановить из бэкапа |

#### POST /api/backup

**Request Body:**
```json
{
  "name": "backup-2024-01-15",
  "description": "Daily backup before maintenance",
  "type": "full",
  "scope": "database",
  "retentionDays": 30,
  "compress": true,
  "encrypt": true
}
```

#### POST /api/backup/restore

**Request Body:**
```json
{
  "backupId": "backup_123",
  "restoreMode": "replace"
}
```

### Примеры использования

```tsx
import { BackupPanel } from '@/components/backup/backup-panel';

function SettingsPage() {
  return (
    <Tabs defaultValue="general">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="backup">Backup</TabsTrigger>
      </TabsList>
      <TabsContent value="backup">
        <BackupPanel />
      </TabsContent>
    </Tabs>
  );
}
```

---

## 5. Help Panel - Справка

### Описание

Help Panel — комплексный компонент помощи с FAQ, документацией, руководством по быстрому старту и контактами поддержки.

**Файл:** `src/components/help/help-panel.tsx`

### Ключевые возможности

- ❓ FAQ с категориями и поиском
- 📚 Документация по разделам
- 🚀 Руководство быстрого старта
- 💬 Каналы поддержки (Telegram, Email)
- 📊 Статус системы
- 🔍 Поиск по FAQ

### Структура данных

```typescript
// Категория FAQ
interface FAQCategory {
  category: string;
  icon: React.ElementType;
  questions: {
    q: string;
    a: string;
  }[];
}

// Секция документации
interface DocSection {
  title: string;
  icon: React.ElementType;
  items: { name: string; href: string; }[];
}

// Шаг быстрого старта
interface QuickStartStep {
  step: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

// Канал поддержки
interface SupportChannel {
  name: string;
  icon: React.ElementType;
  description: string;
  link: string;
  available: string;
}
```

### Примеры данных

```typescript
const faqCategories: FAQCategory[] = [
  {
    category: "Начало работы",
    icon: Rocket,
    questions: [
      {
        q: "Как подключить биржу?",
        a: "Перейдите в раздел 'Биржи' → 'Подключить аккаунт'. Выберите биржу..."
      },
      // ...
    ],
  },
  // ...
];

const quickStartSteps: QuickStartStep[] = [
  {
    step: 1,
    title: "Подключите биржу",
    description: "Добавьте API ключи от Binance, Bybit, OKX...",
    icon: Settings,
  },
  // ...
];

const supportChannels: SupportChannel[] = [
  {
    name: "Telegram",
    icon: Send,
    description: "Быстрая поддержка и сообщество",
    link: "https://t.me/CITARION_Support",
    available: "24/7",
  },
  // ...
];
```

### Примеры использования

```tsx
import { HelpPanel } from '@/components/help/help-panel';

// В сайдбаре или модальном окне
function AppLayout() {
  const [showHelp, setShowHelp] = useState(false);
  
  return (
    <>
      <Sidebar>
        <Button onClick={() => setShowHelp(true)}>
          <HelpCircle className="h-4 w-4 mr-2" />
          Помощь
        </Button>
      </Sidebar>
      
      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="max-w-4xl">
          <HelpPanel />
        </DialogContent>
      </Dialog>
    </>
  );
}
```

---

## 6. Share Components - Шеринг результатов

### Описание

Share Components — набор компонентов для создания красивых карточек с результатами торговли для публикации в социальных сетях.

**Файлы:**
- `src/components/share/share-card.tsx` — основная карточка
- `src/components/share/share-stats-card.tsx` — карточка статистики

### Ключевые возможности

- 📸 Генерация PNG карточек через Canvas API
- 📈 3 типа карточек: PnL сделки, Кривая эквити, Статистика
- 🎨 Стилизация в стиле Binance/Bybit
- 🔒 Опция скрытия баланса
- 📤 Скачивание, копирование, Native Share API
- 📐 Оптимизированные размеры для соцсетей

### Props Интерфейсы

```typescript
// Размеры карточек
const CARD_SIZES = {
  pnl: { width: 750, height: 420 },
  equity: { width: 1080, height: 720 },
  stats: { width: 1080, height: 1080 },
};

// Props для ShareCard
interface ShareCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tradeData?: {
    symbol: string;
    direction: "LONG" | "SHORT";
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
    balanceHistory: { date: string; balance: number; }[];
    totalPnL: number;
    totalPnLPercent: number;
    period: string;
    trades: number;
    winRate: number;
    initialBalance?: number;
  };
}

// Props для ShareStatsCard
interface ShareStatsCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  statsData?: { /* аналогично statsData выше */ };
  equityData?: { /* аналогично equityData выше */ };
}
```

### Функции генерации

```typescript
// Отрисовка PnL карточки
const drawPnLCard = useCallback((
  ctx: CanvasRenderingContext2D, 
  data: TradeData
) => {
  // Градиентный фон
  // Логотип CITARION
  // Бейдж направления (LONG/SHORT)
  // Бокс PnL с цветом (зелёный/красный)
  // Детали сделки
}, []);

// Отрисовка карточки статистики
const drawStatsCard = useCallback((
  ctx: CanvasRenderingContext2D, 
  data: StatsData,
  includeBalance: boolean
) => {
  // Круговой график Win Rate
  // Статистика Win/Loss/Total
  // Сетка деталей (Avg Profit/Loss, Best/Worst)
}, []);

// Отрисовка кривой эквити
const drawEquityCard = useCallback((
  ctx: CanvasRenderingContext2D, 
  data: EquityData,
  includeBalance: boolean
) => {
  // График баланса с area fill
  // Статистика периода
}, []);
```

### Примеры использования

```tsx
import { ShareCard } from '@/components/share/share-card';
import { ShareStatsCard } from '@/components/share/share-stats-card';

function TradeResultPage({ trade }) {
  const [showShare, setShowShare] = useState(false);
  
  return (
    <>
      <Button onClick={() => setShowShare(true)}>
        <Share2 className="h-4 w-4 mr-2" />
        Поделиться
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

## 7. Prediction Panel - Предсказания ML

### Описание

Prediction Panel — компонент для отображения ML-предсказаний цены, волатильности и рыночного режима.

**Файл:** `src/components/prediction/prediction-panel.tsx`

### Ключевые возможности

- 📈 Мульти-горизонтные предсказания цены (1h, 4h, 24h, 7d)
- 📊 Прогноз волатильности с режимами
- 🎯 Определение рыночного режима
- 🔮 Консенсус-прогноз

### Props Интерфейсы

```typescript
// Предсказание цены
interface PricePrediction {
  horizon: string;           // '1h' | '4h' | '24h' | '7d'
  price: number;
  direction: 'up' | 'down' | 'neutral';
  confidence: number;        // 0-1
}

// Прогноз волатильности
interface VolatilityForecast {
  current: number;
  regime: 'low' | 'normal' | 'high' | 'extreme';
  forecast: number;
}

// Рыночный режим
interface MarketRegime {
  regime: string;            // 'trending_up' | 'trending_down' | 'ranging' | 'volatile'
  probability: number;
  duration: number;          // в свечах
}
```

### Визуализация

```typescript
// Иконка направления
const getDirectionIcon = (direction: string) => {
  switch (direction) {
    case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
    case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
    default: return <Minus className="h-4 w-4 text-gray-500" />;
  }
};

// Цвет режима
const getRegimeColor = (regime: string) => {
  switch (regime) {
    case 'trending_up': return 'text-green-500';
    case 'trending_down': return 'text-red-500';
    case 'ranging': return 'text-yellow-500';
    case 'volatile': return 'text-orange-500';
    default: return 'text-gray-500';
  }
};

// Цвет волатильности
const getVolatilityColor = (regime: string) => {
  switch (regime) {
    case 'low': return 'bg-green-500';
    case 'normal': return 'bg-blue-500';
    case 'high': return 'bg-orange-500';
    case 'extreme': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};
```

### Примеры использования

```tsx
import { PredictionPanel } from '@/components/prediction/prediction-panel';

function TradingDashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <PriceChart />
      <PredictionPanel />
      <IndicatorsPanel />
    </div>
  );
}
```

---

## Интеграция с остальной системой

### Связи между компонентами

```
┌─────────────────────────────────────────────────────────────┐
│                     CITARION UI System                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐   │
│  │   Journal    │◄──►│   Trading    │◄──►│   News       │   │
│  │    Panel     │    │    Form      │    │    Panel     │   │
│  └──────────────┘    └──────────────┘    └──────────────┘   │
│         │                   │                   │            │
│         └───────────┬───────┴───────────────────┘            │
│                     ▼                                        │
│            ┌──────────────┐                                  │
│            │    Share     │                                  │
│            │   Components │                                  │
│            └──────────────┘                                  │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐   │
│  │  Workspace   │    │   Backup     │    │    Help      │   │
│  │    Panel     │    │    Panel     │    │    Panel     │   │
│  └──────────────┘    └──────────────┘    └──────────────┘   │
│                                                              │
│  ┌──────────────┐                                           │
│  │  Prediction  │◄── ML Service Integration                 │
│  │    Panel     │                                           │
│  └──────────────┘                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Общие паттерны

1. **Toast уведомления** — все компоненты используют `sonner` для обратной связи
2. **Фильтрация и поиск** — унифицированный UI для фильтров
3. **Пагинация** — стандартный компонент для больших списков
4. **Диалоги** — модальные окна через `@radix-ui/react-dialog`
5. **Скелетоны** — состояние загрузки через `Skeleton` компонент

---

*Документация создана: Март 2026*
