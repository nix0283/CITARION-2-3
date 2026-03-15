# CITARION Frontend Architecture

> **Last Updated:** March 2025  
> **Framework:** Next.js 16 with App Router  
> **UI Library:** React 19

---

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Component Architecture](#component-architecture)
5. [State Management](#state-management)
6. [Data Fetching](#data-fetching)
7. [Routing](#routing)
8. [Styling](#styling)
9. [Performance](#performance)
10. [Testing](#testing)

---

## Overview

CITARION frontend is a single-page application (SPA) built with Next.js 16 App Router, featuring a Binance-style trading dashboard with 35+ tab views.

### Key Features

- **35+ Tab Views** - Dashboard, bots, signals, positions, trades, analytics, etc.
- **Real-time Updates** - WebSocket price feeds and trade events
- **Responsive Design** - Mobile-first with sidebar navigation
- **Dark/Light Theme** - Theme switching with next-themes
- **Accessibility** - ARIA labels, keyboard navigation

---

## Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Framework** | Next.js | 16.x |
| **UI Library** | React | 19.x |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 4.x |
| **Components** | shadcn/ui | Latest |
| **State** | Zustand | 5.x |
| **Server State** | TanStack Query | 5.x |
| **Charts** | Recharts | 2.x |
| **Icons** | Lucide React | Latest |
| **Animation** | Framer Motion | 12.x |
| **Forms** | React Hook Form | 7.x |
| **Validation** | Zod | 4.x |

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes (120+)
│   ├── page.tsx                  # Main Dashboard (SPA)
│   ├── layout.tsx                # Root Layout
│   └── globals.css               # Global Styles
│
├── components/
│   ├── ui/                       # shadcn/ui (40+ components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   └── ...
│   │
│   ├── bots/                     # Bot Components
│   │   ├── grid-bot-panel.tsx
│   │   ├── dca-bot-panel.tsx
│   │   ├── bb-bot-panel.tsx
│   │   ├── vision-bot-panel.tsx
│   │   ├── logos-bot-panel.tsx
│   │   └── institutional-bots-panel.tsx
│   │
│   ├── risk-management/          # Risk Components
│   │   ├── risk-dashboard.tsx
│   │   ├── var-display.tsx
│   │   ├── kill-switch-panel.tsx
│   │   └── drawdown-monitor.tsx
│   │
│   ├── strategy-lab/             # Strategy Components
│   │   ├── backtest-panel.tsx
│   │   ├── hyperopt-panel.tsx
│   │   └── strategy-config.tsx
│   │
│   ├── trading/                  # Trading Components
│   │   ├── trading-form.tsx
│   │   ├── position-card.tsx
│   │   ├── trade-history.tsx
│   │   └── signal-display.tsx
│   │
│   ├── chat/                     # Oracle Chat
│   │   ├── oracle-chat.tsx
│   │   └── signal-parser-display.tsx
│   │
│   ├── chart/                    # Chart Components
│   │   ├── price-chart.tsx
│   │   ├── candlestick-chart.tsx
│   │   └── indicators-chart.tsx
│   │
│   ├── layout/                   # Layout Components
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   ├── mobile-nav.tsx
│   │   └── bottom-nav.tsx
│   │
│   └── shared/                   # Shared Components
│       ├── loading-skeleton.tsx
│       ├── error-boundary.tsx
│       ├── share-card.tsx
│       └── price-display.tsx
│
├── hooks/                        # Custom Hooks
│   ├── use-risk-monitor.ts
│   ├── use-trade-events.ts
│   ├── use-ml-classification.ts
│   ├── use-chat-websocket.ts
│   ├── use-bot-monitor.ts
│   ├── use-realtime-prices.ts
│   ├── use-trading-hotkeys.ts
│   └── use-mobile.ts
│
├── stores/                       # State Management
│   └── crypto-store.ts           # Zustand Store
│
├── types/                        # TypeScript Types
│   └── index.ts
│
└── lib/                          # Utilities
    ├── utils.ts
    ├── format.ts
    └── demo-data.ts
```

---

## Component Architecture

### Component Hierarchy

```
RootLayout
└── ThemeProvider
    └── QueryClientProvider
        └── WebSocketProvider
            └── DashboardContent
                ├── Header
                │   ├── Logo
                │   ├── ConnectionStatus
                │   ├── ThemeToggle
                │   └── UserMenu
                │
                ├── Sidebar
                │   ├── NavItem (x35)
                │   └── CollapseButton
                │
                └── MainContent
                    ├── DashboardTab
                    ├── BotsTab
                    │   ├── GridBotPanel
                    │   ├── DcaBotPanel
                    │   └── ...
                    ├── SignalsTab
                    ├── PositionsTab
                    ├── TradesTab
                    ├── AnalyticsTab
                    ├── JournalTab
                    └── ...
```

### Component Patterns

#### Container/Presentational Pattern

```tsx
// Container (logic)
function PositionListContainer() {
  const { positions, isLoading } = usePositions();
  
  if (isLoading) return <PositionListSkeleton />;
  
  return <PositionList positions={positions} />;
}

// Presentational (UI)
interface PositionListProps {
  positions: Position[];
}

function PositionList({ positions }: PositionListProps) {
  return (
    <div className="space-y-2">
      {positions.map(position => (
        <PositionCard key={position.id} position={position} />
      ))}
    </div>
  );
}
```

#### Composition Pattern

```tsx
// Flexible card composition
<Card>
  <CardHeader>
    <CardTitle>Position</CardTitle>
    <CardDescription>BTCUSDT LONG</CardDescription>
  </CardHeader>
  <CardContent>
    <PositionDetails />
  </CardContent>
  <CardFooter>
    <CloseButton />
  </CardFooter>
</Card>
```

---

## State Management

### Global State (Zustand)

```typescript
// stores/crypto-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CryptoStore {
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  // Account
  account: Account | null;
  tradingMode: 'DEMO' | 'REAL';
  setTradingMode: (mode: 'DEMO' | 'REAL') => void;
  virtualBalance: Record<string, number>;

  // Market Data
  marketPrices: Record<string, MarketPrice>;
  setMarketPrice: (symbol: string, price: MarketPrice) => void;

  // Positions
  positions: Position[];
  addPosition: (position: Position) => void;
  closePosition: (id: string) => void;

  // Computed
  getTotalBalance: () => number;
  getTotalPnL: () => number;
  getWinRate: () => number;
}

export const useCryptoStore = create<CryptoStore>()(
  persist(
    (set, get) => ({
      activeTab: 'dashboard',
      sidebarOpen: true,
      tradingMode: 'DEMO',
      // ... implementation
    }),
    { name: 'citarion-store' }
  )
);
```

### Server State (TanStack Query)

```typescript
// hooks/use-positions.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function usePositions(filters?: PositionFilters) {
  return useQuery({
    queryKey: ['positions', filters],
    queryFn: () => fetchPositions(filters),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
  });
}

export function useClosePosition() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: closePosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['positions'] });
    },
  });
}
```

### Local State (useState/useReducer)

```typescript
// Complex form state
function TradingForm() {
  const [formState, dispatch] = useReducer(tradingFormReducer, initialState);
  
  // For simple state
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <Form>
      {/* ... */}
    </Form>
  );
}
```

---

## Data Fetching

### REST API

```typescript
// lib/api/trading.ts
export async function openPosition(params: OpenPositionParams) {
  const response = await fetch('/api/trade/open', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  
  if (!response.ok) {
    throw new TradingError(await response.json());
  }
  
  return response.json();
}
```

### WebSocket

```typescript
// hooks/use-realtime-prices.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export function useRealtimePrice(symbol: string) {
  const [price, setPrice] = useState<Price | null>(null);
  
  useEffect(() => {
    const socket = io('/?XTransformPort=3002');
    
    socket.on('price_update', (data) => {
      if (data.symbol === symbol) {
        setPrice(data);
      }
    });
    
    socket.emit('subscribe', { symbols: [symbol] });
    
    return () => {
      socket.disconnect();
    };
  }, [symbol]);
  
  return price;
}
```

### Server-Sent Events

```typescript
// hooks/use-trade-events.ts
export function useTradeEvents() {
  const [events, setEvents] = useState<TradeEvent[]>([]);
  
  useEffect(() => {
    const eventSource = new EventSource('/api/trade-events');
    
    eventSource.onmessage = (event) => {
      const tradeEvent = JSON.parse(event.data);
      setEvents(prev => [tradeEvent, ...prev].slice(0, 100));
    };
    
    return () => eventSource.close();
  }, []);
  
  return events;
}
```

---

## Routing

### App Router (Single Page)

```typescript
// app/page.tsx
export default function DashboardContent() {
  const { activeTab } = useCryptoStore();
  
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'grid-bot':
        return <GridBotPanel />;
      case 'dca-bot':
        return <DcaBotPanel />;
      case 'signals':
        return <SignalsTab />;
      case 'positions':
        return <PositionsTab />;
      // ... 30+ more tabs
      default:
        return <DashboardTab />;
    }
  };
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}
```

### Tab Navigation

```typescript
// constants/tabs.ts
export const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'grid-bot', label: 'Grid Bot', icon: Grid3X3 },
  { id: 'dca-bot', label: 'DCA Bot', icon: TrendingUp },
  { id: 'bb-bot', label: 'BB Bot', icon: Activity },
  { id: 'signals', label: 'Signals', icon: Radio },
  { id: 'positions', label: 'Positions', icon: Crosshair },
  { id: 'trades', label: 'Trades', icon: History },
  // ... more tabs
];
```

---

## Styling

### Tailwind CSS Configuration

```css
/* globals.css */
@import "tailwindcss";

/* Theme Variables */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 47 96% 53%;        /* Binance Gold #F0B90B */
  --primary-foreground: 0 0% 100%;
  --secondary: 142 76% 36%;     /* Binance Green #0ECB81 */
  --destructive: 4 96% 61%;     /* Binance Red #F6465D */
  --muted: 210 40% 96.1%;
  --border: 214.3 31.8% 91.4%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 47 96% 53%;
  --primary-foreground: 222.2 47.4% 11.2%;
}
```

### Component Styling

```tsx
// Using cva for variant-based styling
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'border border-input bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

### Responsive Design

```tsx
// Mobile-first responsive design
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  xl:grid-cols-4
  gap-4
">
  {positions.map(p => <PositionCard key={p.id} position={p} />)}
</div>
```

---

## Performance

### Code Splitting

```typescript
// Lazy load heavy components
const BacktestPanel = dynamic(
  () => import('@/components/strategy-lab/backtest-panel'),
  { loading: () => <BacktestSkeleton /> }
);

const VisionBotPanel = dynamic(
  () => import('@/components/bots/vision-bot-panel'),
  { ssr: false } // Client-only
);
```

### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react';

// Memo expensive components
const PositionCard = memo(function PositionCard({ position }: Props) {
  return <Card>...</Card>;
});

// Memo computations
function TradeHistory({ trades }: Props) {
  const sortedTrades = useMemo(
    () => [...trades].sort((a, b) => b.timestamp - a.timestamp),
    [trades]
  );
  
  return <div>{sortedTrades.map(t => <TradeRow key={t.id} trade={t} />)}</div>;
}

// Memo callbacks
function BotPanel() {
  const handleStart = useCallback(
    (botId: string) => startBot(botId),
    []
  );
  
  return <BotList onStart={handleStart} />;
}
```

### Virtual Lists

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

function SignalList({ signals }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const rowVirtualizer = useVirtualizer({
    count: signals.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 10,
  });
  
  return (
    <div ref={parentRef} className="h-screen overflow-auto">
      <div style={{ height: rowVirtualizer.getTotalSize() }}>
        {rowVirtualizer.getVirtualItems().map(virtualRow => (
          <SignalRow
            key={virtualRow.key}
            signal={signals[virtualRow.index]}
            style={{ transform: `translateY(${virtualRow.start}px)` }}
          />
        ))}
      </div>
    </div>
  );
}
```

---

## Testing

### Component Testing

```typescript
// __tests__/components/position-card.test.tsx
import { render, screen } from '@testing-library/react';
import { PositionCard } from '@/components/trading/position-card';

describe('PositionCard', () => {
  it('renders position details', () => {
    const position = {
      id: '1',
      symbol: 'BTCUSDT',
      direction: 'LONG',
      unrealizedPnl: 100,
    };
    
    render(<PositionCard position={position} />);
    
    expect(screen.getByText('BTCUSDT')).toBeInTheDocument();
    expect(screen.getByText('LONG')).toBeInTheDocument();
    expect(screen.getByText(/\+100/)).toBeInTheDocument();
  });
});
```

### Integration Testing

```typescript
// __tests__/integration/trading-flow.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TradingForm } from '@/components/trading/trading-form';

describe('Trading Flow', () => {
  it('opens position on form submit', async () => {
    const user = userEvent.setup();
    
    render(<TradingForm />);
    
    await user.type(screen.getByLabelText('Symbol'), 'BTCUSDT');
    await user.click(screen.getByRole('button', { name: 'Long' }));
    
    await waitFor(() => {
      expect(screen.getByText('Position opened')).toBeInTheDocument();
    });
  });
});
```

---

## Best Practices

### DO ✅

1. **Use TypeScript strictly** - No `any` types
2. **Memo expensive computations** - Use `useMemo`, `useCallback`
3. **Lazy load heavy components** - Dynamic imports
4. **Handle loading states** - Skeletons, spinners
5. **Handle error states** - Error boundaries, retry
6. **Use semantic HTML** - Accessibility
7. **Follow naming conventions** - PascalCase for components

### DON'T ❌

1. **Mutate state directly** - Use proper state updates
2. **Ignore accessibility** - ARIA labels, keyboard nav
3. **Over-fetch data** - Request only needed fields
4. **Block main thread** - Offload heavy computations
5. **Hardcode values** - Use constants, config

---

## Related Documentation

- [API_SPECIFICATION.md](./API_SPECIFICATION.md) - API endpoints
- [SECURITY_GUIDE.md](../security/SECURITY_GUIDE.md) - Security
- [TESTING_STRATEGY.md](../development/TESTING_STRATEGY.md) - Testing
