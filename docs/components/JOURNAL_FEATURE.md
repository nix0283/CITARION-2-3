# Journal Feature Documentation

**Last Updated:** March 2026  
**Status:** ✅ Complete  
**Coverage:** 100%

---

## Overview

The Journal feature provides comprehensive trade logging, analysis, and performance tracking. It allows traders to document their decisions, track emotional states, and review past performance for continuous improvement.

---

## Component: Journal Panel (`journal-panel.tsx`)

```typescript
interface JournalPanelProps {
  userId: string;
  dateRange?: DateRange;
  showStats?: boolean;
}
```

---

## Journal Entry Structure

### Trade Entry

```typescript
interface JournalEntry {
  id: string;
  timestamp: Date;
  
  // Trade Details
  symbol: string;
  side: 'LONG' | 'SHORT';
  entryPrice: number;
  exitPrice?: number;
  quantity: number;
  
  // Analysis
  strategy: string;
  setup: string;
  conviction: 1 | 2 | 3 | 4 | 5;
  
  // Emotional State
  emotion: 'CONFIDENT' | 'NEUTRAL' | 'ANXIOUS' | 'FEARFUL' | 'GREEDY';
  
  // Notes
  entryNote: string;
  exitNote?: string;
  lessons?: string;
  
  // Results
  pnl?: number;
  pnlPercent?: number;
  outcome: 'WIN' | 'LOSS' | 'BREAKEVEN' | 'OPEN';
  
  // Tags
  tags: string[];
  
  // Attachments
  screenshots?: string[];
}
```

---

## Features

### 1. Trade Logging

- **Pre-trade Entry:** Log before entering trade
- **Post-trade Review:** Update after exit
- **Quick Tags:** Pre-defined tags for fast logging
- **Screenshot Support:** Attach chart images

### 2. Performance Analytics

```typescript
interface JournalStats {
  totalTrades: number;
  winRate: number;
  avgWin: number;
  avgLoss: number;
  profitFactor: number;
  expectancy: number;
  maxDrawdown: number;
  sharpeRatio: number;
  
  // By Strategy
  byStrategy: Record<string, StrategyStats>;
  
  // By Emotion
  byEmotion: Record<Emotion, EmotionStats>;
  
  // By Day/Time
  byDayOfWeek: Record<DayOfWeek, DayStats>;
  byTimeOfDay: Record<TimeOfDay, TimeStats>;
}
```

### 3. Emotional Tracking

| Emotion | Win Rate Impact | Recommendation |
|---------|----------------|----------------|
| CONFIDENT | +15% | Continue current approach |
| NEUTRAL | Baseline | Normal trading |
| ANXIOUS | -8% | Reduce position size |
| FEARFUL | -12% | Pause trading |
| GREEDY | -20% | Take break, review rules |

### 4. Lessons Learned

```typescript
interface Lesson {
  id: string;
  date: Date;
  tradeId: string;
  category: 'ENTRY' | 'EXIT' | 'RISK' | 'PSYCHOLOGY' | 'STRATEGY';
  description: string;
  actionItem: string;
  implemented: boolean;
}
```

---

## API Endpoints

### Create Entry
```
POST /api/journal
```

```typescript
const createEntry = async (entry: Omit<JournalEntry, 'id'>) => {
  const response = await fetch('/api/journal', {
    method: 'POST',
    body: JSON.stringify(entry)
  });
  return response.json();
};
```

### Get Entries
```
GET /api/journal?startDate=2026-01-01&endDate=2026-03-15
```

### Get Single Entry
```
GET /api/journal/[id]
```

---

## UI Components

### Entry Form

```tsx
<JournalEntryForm
  onSubmit={handleCreateEntry}
  defaultSymbol={currentSymbol}
  autoFill={{
    symbol: currentSymbol,
    entryPrice: currentPrice,
    timestamp: new Date()
  }}
/>
```

### Entry List

```tsx
<JournalEntryList
  entries={entries}
  sortBy="timestamp"
  sortOrder="desc"
  onSelect={handleSelectEntry}
/>
```

### Statistics Dashboard

```tsx
<JournalStats
  entries={entries}
  showCharts={true}
  period="month"
/>
```

---

## Insights Generation

### Automatic Insights

```typescript
interface JournalInsight {
  type: 'PATTERN' | 'WARNING' | 'OPPORTUNITY' | 'IMPROVEMENT';
  title: string;
  description: string;
  data: Record<string, any>;
  recommendation: string;
}

// Example insights:
const insights = [
  {
    type: 'PATTERN',
    title: 'High Win Rate on Mondays',
    description: 'Your win rate on Monday trades is 72% vs 54% average',
    recommendation: 'Consider increasing position size on Monday setups'
  },
  {
    type: 'WARNING',
    title: 'FOMO Trading Detected',
    description: '60% of losses occur within 30 minutes of missing an initial entry',
    recommendation: 'Wait for re-entry setups instead of chasing'
  }
];
```

---

## Export Features

### CSV Export
```typescript
const exportToCSV = async (entries: JournalEntry[]) => {
  const csv = entries.map(e => 
    `${e.timestamp},${e.symbol},${e.side},${e.pnl},${e.emotion}`
  ).join('\n');
  
  downloadFile(csv, 'journal-export.csv');
};
```

### PDF Report
```typescript
const generatePDFReport = async (dateRange: DateRange) => {
  const report = await fetch('/api/journal/export', {
    method: 'POST',
    body: JSON.stringify({ format: 'pdf', dateRange })
  });
  
  return report.blob();
};
```

---

## Integration with Trading

### Auto-logging

```typescript
// Automatic entry creation on trade open
const onTradeOpen = async (trade: Trade) => {
  await createJournalEntry({
    symbol: trade.symbol,
    side: trade.side,
    entryPrice: trade.entryPrice,
    quantity: trade.quantity,
    timestamp: new Date(),
    strategy: activeStrategy?.name || 'Manual',
    emotion: currentEmotion,
    entryNote: ''
  });
};
```

### Post-trade Review Prompt

```typescript
// Prompt for review after trade close
const onTradeClose = async (trade: Trade) => {
  showJournalReviewModal({
    tradeId: trade.id,
    pnl: trade.pnl,
    duration: trade.closedAt - trade.openedAt,
    questions: [
      'What was your reasoning for this trade?',
      'What would you do differently?'
    ]
  });
};
```

---

## Statistics Dashboard

### Win Rate Chart
- Daily/Weekly/Monthly win rate trend
- Filter by strategy, symbol, emotion

### PnL Distribution
- Histogram of trade outcomes
- Identify outlier wins/losses

### Time Analysis
- Best performing hours
- Worst performing days

### Strategy Comparison
- Compare performance across strategies
- Identify most profitable setups

---

## Best Practices

### 1. Consistency
- Log every trade without exception
- Use consistent tagging
- Regular review sessions

### 2. Honesty
- Record actual emotions
- Document mistakes openly
- No revision of history

### 3. Review Schedule
- Daily: Quick scan of today's entries
- Weekly: Performance review and pattern identification
- Monthly: Deep analysis and strategy adjustment

---

## Data Retention

| Data Type | Retention Period | Storage |
|-----------|------------------|---------|
| Journal Entries | Indefinite | SQLite + Backup |
| Screenshots | 1 year | File storage |
| Statistics | Indefinite | SQLite |
| Insights | 90 days | SQLite |

---

*Documentation for CITARION Algorithmic Trading Platform*
