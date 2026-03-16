# Share Features

**Version:** 1.0 | **Last Updated:** March 2026

---

## Overview

Share Features — компоненты для создания красивых карточек результатов торговли для публикации в социальных сетях. Генерируют изображения с помощью Canvas API.

**Files:**
- `src/components/share/share-card.tsx`
- `src/components/share/share-stats-card.tsx`

---

## Components

| Component | Description |
|-----------|-------------|
| **ShareCard** | Полный компонент с тремя типами карточек |
| **ShareStatsCard** | Специализированный компонент для статистики |

---

## ShareCard Component

### Features

- **PnL Card** — результат отдельной сделки
- **Equity Card** — график изменения баланса
- **Stats Card** — общая статистика торговли
- **Balance Toggle** — опциональное скрытие баланса

### Card Dimensions

```typescript
const CARD_SIZES = {
  pnl: { width: 750, height: 420 },      // PnL сделки
  equity: { width: 1080, height: 720 },   // Кривая капитала
  stats: { width: 1080, height: 1080 },   // Статистика
}
```

### Props

```typescript
interface ShareCardProps {
  open: boolean                              // Состояние диалога
  onOpenChange: (open: boolean) => void      // Callback изменения состояния
  tradeData?: TradeData                      // Данные сделки
  statsData?: StatsData                      // Данные статистики
  equityData?: EquityData                    // Данные кривой капитала
}

interface TradeData {
  symbol: string
  direction: "LONG" | "SHORT"
  entryPrice: number
  exitPrice: number
  pnl: number
  pnlPercent: number
  leverage: number
  amount: number
  exchange: string
}

interface StatsData {
  totalTrades: number
  winningTrades: number
  losingTrades: number
  winRate: number
  totalPnL: number
  avgProfit: number
  avgLoss: number
  bestTrade: number
  worstTrade: number
  period: string
  balance?: number
  initialBalance?: number
}

interface EquityData {
  balanceHistory: { date: string; balance: number }[]
  totalPnL: number
  totalPnLPercent: number
  period: string
  trades: number
  winRate: number
  initialBalance?: number
}
```

### Tabs

| Tab | Icon | Description |
|-----|------|-------------|
| **pnl** | `TrendingUp` | Результат отдельной сделки |
| **equity** | `LineChart` | Кривая изменения баланса |
| **stats** | `BarChart3` | Общая статистика |

### Balance Privacy

```tsx
// Toggle для показа/скрытия баланса
<div className="flex items-center space-x-2">
  <Switch
    id="show-balance"
    checked={showBalance}
    onCheckedChange={setShowBalance}
  />
  <Label>
    {showBalance ? <Eye /> : <EyeOff />}
    Показать баланс счёта
  </Label>
</div>
```

---

## ShareStatsCard Component

### Features

- **Equity Tab** — кривая капитала с опцией показа баланса
- **Stats Tab** — статистика винрейта без баланса
- **Stats Full Tab** — полная статистика с балансом

### Props

```typescript
interface ShareStatsCardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  statsData?: StatsData
  equityData?: EquityData
}
```

---

## Card Generation

### Canvas Drawing

Карточки генерируются с помощью HTML Canvas API:

```typescript
const generateCard = async () => {
  const canvas = canvasRef.current
  const ctx = canvas.getContext('2d')
  
  // Set dimensions
  canvas.width = CARD_SIZES[activeTab].width
  canvas.height = CARD_SIZES[activeTab].height
  
  // Draw background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height)
  bgGrad.addColorStop(0, "#0f0f23")
  bgGrad.addColorStop(0.5, "#1a1a2e")
  bgGrad.addColorStop(1, "#16213e")
  
  // Draw content based on active tab
  if (activeTab === 'pnl') drawPnLCard(ctx, tradeData)
  else if (activeTab === 'stats') drawStatsCard(ctx, statsData, showBalance)
  else if (activeTab === 'equity') drawEquityCard(ctx, equityData, showBalance)
  
  // Export as PNG
  setImageUrl(canvas.toDataURL('image/png'))
}
```

### Visual Elements

| Element | Description |
|---------|-------------|
| **Logo** | Градиентный логотип CITARION |
| **Exchange Badge** | Бейдж биржи (Binance, Bybit, OKX) |
| **Direction Badge** | LONG (зелёный) / SHORT (красный) |
| **PnL Box** | Выделенный блок с PnL |
| **Win Rate Circle** | Круговой прогресс-бар винрейта |
| **Stats Grid** | Сетка статистик |

---

## Actions

### Download

```typescript
const handleDownload = () => {
  const link = document.createElement('a')
  link.href = imageUrl
  link.download = `citarion-${activeTab}-card.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
```

### Copy to Clipboard

```typescript
const handleCopy = async () => {
  const response = await fetch(imageUrl)
  const blob = await response.blob()
  await navigator.clipboard.write([
    new ClipboardItem({ 'image/png': blob })
  ])
}
```

### Native Share

```typescript
const handleShare = async () => {
  const response = await fetch(imageUrl)
  const blob = await response.blob()
  const file = new File([blob], 'citarion-card.png', { type: 'image/png' })
  
  if (navigator.share && navigator.canShare({ files: [file] })) {
    await navigator.share({
      title: 'CITARION Trading',
      text: 'My trading performance',
      files: [file]
    })
  }
}
```

---

## Usage

### Basic Usage

```tsx
import { ShareCard } from '@/components/share/share-card'

function TradingDashboard() {
  const [showShare, setShowShare] = useState(false)
  
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
          symbol: 'BTCUSDT',
          direction: 'LONG',
          entryPrice: 67000,
          exitPrice: 68500,
          pnl: 223.45,
          pnlPercent: 2.23,
          leverage: 10,
          amount: 1000,
          exchange: 'Binance'
        }}
      />
    </>
  )
}
```

### Stats Card Usage

```tsx
import { ShareStatsCard } from '@/components/share/share-stats-card'

function StatsPage() {
  const [showShare, setShowShare] = useState(false)
  
  return (
    <>
      <Button onClick={() => setShowShare(true)}>
        Поделиться статистикой
      </Button>
      
      <ShareStatsCard
        open={showShare}
        onOpenChange={setShowShare}
        statsData={{
          totalTrades: 156,
          winningTrades: 107,
          losingTrades: 49,
          winRate: 68.6,
          totalPnL: 3428.75,
          avgProfit: 87.50,
          avgLoss: 42.30,
          bestTrade: 523.40,
          worstTrade: -187.20,
          period: 'Last 30 Days',
          balance: 13428.75,
          initialBalance: 10000
        }}
      />
    </>
  )
}
```

---

## Card Previews

### PnL Card Layout

```
┌────────────────────────────────────────┐
│ [C] CITARION Trading      [Binance]   │
│                                        │
│ [BTCUSDT]  [LONG]  10x                 │
│                                        │
│ ┌────────────────────────────────────┐ │
│ │ Profit & Loss                      │ │
│ │ +223.45 USDT          +2.23%       │ │
│ └────────────────────────────────────┘ │
│                                        │
│ Entry Price    Exit Price    Size     │
│ $67,000        $68,500       $1,000   │
│                                        │
│ 14/03/2026                            │
└────────────────────────────────────────┘
```

### Stats Card Layout

```
┌──────────────────────────────────────────┐
│ [C] CITARION Trading Statistics [30 Days]│
│                                          │
│ Account Balance                          │
│ $13,428.75   +$3,428.75 (+34.3%)        │
│                                          │
│        ╭──────────────╮                 │
│        │    68.6%     │  Win Rate       │
│        │   Win Rate   │                 │
│        ╰──────────────╯                 │
│                                          │
│   107        49         156              │
│   Wins     Losses     Total             │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │ Total PnL                            │ │
│ │ +3,428.75 USDT                       │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ Avg Profit: +$87.50    Best: +$523.40   │
│ Avg Loss: -$42.30      Worst: -$187.20  │
│                                          │
│                 Generated by CITARION   │
└──────────────────────────────────────────┘
```

---

## Color Scheme

| Element | Color | Hex |
|---------|-------|-----|
| Background Start | Dark Blue | `#0f0f23` |
| Background Middle | Darker Blue | `#1a1a2e` |
| Background End | Navy | `#16213e` |
| Profit | Green | `#22c55e` |
| Loss | Red | `#ef4444` |
| Primary | Indigo | `#6366f1` |
| Muted | Gray | `#6b7280` |

---

## Related Documentation

- [DASHBOARD.md](DASHBOARD.md) - Dashboard widgets
- [ANALYTICS_DASHBOARD.md](ANALYTICS_DASHBOARD.md) - Analytics
- [POSITIONS_TRADES_SIGNALS.md](POSITIONS_TRADES_SIGNALS.md) - Positions

---

*Last updated: March 2026 | CITARION Documentation Team*
