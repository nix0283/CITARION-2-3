# Mobile UX Guidelines

This guide outlines mobile user experience best practices for the CITARION trading platform, ensuring a seamless experience across all device sizes.

---

## Mobile-First Design Principles

### Core Philosophy

CITARION follows a mobile-first design approach, where we design for the smallest screen first and progressively enhance for larger screens.

| Principle | Description |
|-----------|-------------|
| **Content Priority** | Essential content and actions are prioritized on mobile |
| **Progressive Enhancement** | Start with mobile, add features for larger screens |
| **Performance First** | Optimize for mobile networks and devices |
| **Touch-Optimized** | All interactions designed for touch input |

### Content Hierarchy

```
Mobile Priority Order:
1. Critical trading actions (Buy/Sell)
2. Current positions and P&L
3. Price alerts and notifications
4. Market overview
5. Historical data and analytics
6. Settings and configuration
```

---

## Touch Target Sizes

### Minimum Requirements

| Element Type | Minimum Size | Recommended |
|--------------|--------------|-------------|
| Primary buttons | 44x44 px | 48x48 px |
| Secondary buttons | 44x44 px | 48x48 px |
| Icon buttons | 44x44 px | 48x48 px |
| Links | 44x44 px hit area | - |
| Form inputs | 44px height | 48px height |
| List items | 44px min height | 48px |
| Tabs | 44x44 px | 48x48 px |

### Implementation

```tsx
// Button component with proper touch targets
interface ButtonProps {
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const touchSizes = {
  sm: 'min-h-[44px] min-w-[44px] px-3 py-2',
  md: 'min-h-[48px] min-w-[48px] px-4 py-3',
  lg: 'min-h-[56px] min-w-[56px] px-6 py-4',
};

export function Button({ size = 'md', children }: ButtonProps) {
  return (
    <button className={touchSizes[size]}>
      {children}
    </button>
  );
}
```

### Spacing Between Touch Targets

```css
/* Minimum 8px between touch targets */
.button-group {
  display: flex;
  gap: 8px;
}

/* Use pointer-events to expand hit area */
.hit-area-expanded {
  position: relative;
}

.hit-area-expanded::before {
  content: '';
  position: absolute;
  top: -8px;
  right: -8px;
  bottom: -8px;
  left: -8px;
}
```

---

## Responsive Breakpoints

### CITARION Breakpoint System

| Breakpoint | Width | Target Devices |
|------------|-------|----------------|
| `xs` | 320px | Small phones |
| `sm` | 375px | Standard phones |
| `md` | 425px | Large phones |
| `lg` | 768px | Tablets |
| `xl` | 1024px | Small laptops |
| `2xl` | 1280px | Laptops |
| `3xl` | 1536px | Desktops |

### Tailwind Configuration

```typescript
// tailwind.config.ts
export default {
  theme: {
    screens: {
      'xs': '320px',
      'sm': '375px',
      'md': '425px',
      'lg': '768px',
      'xl': '1024px',
      '2xl': '1280px',
      '3xl': '1536px',
    },
  },
};
```

### Responsive Layout Patterns

```tsx
// Responsive grid layout
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {cards.map(card => (
    <TradeCard key={card.id} {...card} />
  ))}
</div>

// Responsive sidebar
<div className="flex flex-col lg:flex-row">
  <aside className="w-full lg:w-64 lg:shrink-0">
    <Sidebar />
  </aside>
  <main className="flex-1">
    <Content />
  </main>
</div>

// Hidden on mobile, visible on desktop
<div className="hidden lg:block">
  <DesktopNavigation />
</div>

// Visible on mobile, hidden on desktop
<div className="lg:hidden">
  <MobileNavigation />
</div>
```

---

## Mobile-Specific Components

### Bottom Navigation

```tsx
// Mobile bottom navigation bar
export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="flex items-center justify-around border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <NavItem href="/dashboard" icon={<Home />} label="Dashboard" />
        <NavItem href="/trades" icon={<Activity />} label="Trades" />
        <NavItem href="/bots" icon={<Bot />} label="Bots" />
        <NavItem href="/portfolio" icon={<Wallet />} label="Portfolio" />
        <NavItem href="/settings" icon={<Settings />} label="Settings" />
      </div>
      {/* Safe area for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}

function NavItem({ href, icon, label }: NavItemProps) {
  return (
    <Link
      href={href}
      className="flex min-h-[56px] min-w-[56px] flex-col items-center justify-center gap-1 px-3 py-2"
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  );
}
```

### Pull to Refresh

```tsx
// Pull to refresh implementation
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';

export function MarketData() {
  const { isRefreshing, onRefresh } = usePullToRefresh(async () => {
    await fetchLatestPrices();
  });

  return (
    <div className="relative">
      {isRefreshing && (
        <div className="absolute top-0 left-0 right-0 flex justify-center py-4">
          <RefreshCw className="h-6 w-6 animate-spin" />
        </div>
      )}
      <PriceList />
    </div>
  );
}
```

### Mobile Drawer

```tsx
// Sliding drawer for mobile
import { Drawer } from '@/components/ui/drawer';

export function TradeDrawer({ isOpen, onClose }: TradeDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>Place Trade</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto p-4">
          <TradeForm onSuccess={onClose} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

### Mobile Action Sheet

```tsx
// Action sheet for trade confirmations
export function TradeActionSheet({ trade, isOpen, onClose }: Props) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Confirm Trade</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pair</span>
              <span>{trade.pair}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type</span>
              <span>{trade.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount</span>
              <span>{trade.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total</span>
              <span>{trade.total}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

### Mobile Chart

```tsx
// Optimized mobile chart component
import { createChart } from 'lightweight-charts';

export function MobilePriceChart({ data }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 300,
      layout: {
        fontSize: 12,
      },
      // Mobile-optimized settings
      crosshair: {
        mode: CrosshairMode.Magnet,
      },
      handleScale: {
        mouseWheel: false, // Prevent scroll interference
      },
      handleScroll: {
        vertTouchDrag: false, // Allow page scroll
      },
    });

    const series = chart.addCandlestickSeries();
    series.setData(data);

    const handleResize = () => {
      chart.applyOptions({ width: chartRef.current?.clientWidth });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data]);

  return <div ref={chartRef} className="w-full" />;
}
```

---

## Performance Optimization for Mobile

### Image Optimization

```tsx
// Next.js Image component for optimization
import Image from 'next/image';

// Responsive image
<Image
  src="/chart-preview.png"
  alt="Trading chart"
  width={375}
  height={200}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// Placeholder blur
<Image
  src="/exchange-logo.png"
  alt="Exchange logo"
  width={32}
  height={32}
  placeholder="blur"
  blurDataURL="data:image/png;base64,..."
/>
```

### Code Splitting

```tsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
});

const TradingBotConfig = dynamic(() => import('./TradingBotConfig'), {
  loading: () => <ConfigSkeleton />,
});

// Usage
function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <div>
      {showChart && <HeavyChart data={chartData} />}
    </div>
  );
}
```

### Data Fetching Optimization

```tsx
// Mobile-aware data fetching
import { useInView } from 'react-intersection-observer';

function LazyPriceList() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['prices'],
    queryFn: fetchPrices,
    enabled: inView, // Only fetch when in view
  });

  return (
    <div ref={ref}>
      {isLoading ? <Skeleton count={10} /> : <PriceList data={data} />}
    </div>
  );
}

// Pagination for long lists
function InfiniteTradeList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['trades'],
    queryFn: ({ pageParam = 0 }) => fetchTrades(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  return (
    <div>
      {data?.pages.map((page) => (
        <TradeItems key={page.id} items={page.items} />
      ))}
      <div ref={ref} className="h-10">
        {isFetchingNextPage && <Spinner />}
      </div>
    </div>
  );
}
```

### Bundle Size Optimization

```typescript
// next.config.ts
const config = {
  // Enable bundle analyzer
  analyzer: process.env.ANALYZE === 'true',
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 768, 1024, 1200],
  },
  
  // Modularize imports
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
  
  // Experimental features
  experimental: {
    optimizePackageImports: ['recharts', 'date-fns'],
  },
};
```

### Network Optimization

```tsx
// Offline support with service worker
// public/sw.js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// React hook for network status
function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Usage
function TradingInterface() {
  const isOnline = useNetworkStatus();
  
  if (!isOnline) {
    return <OfflineNotice />;
  }
  
  return <TradingForm />;
}
```

---

## Mobile UX Patterns

### Forms on Mobile

```tsx
// Mobile-optimized form
function TradeForm() {
  return (
    <form className="space-y-4">
      {/* Full-width inputs */}
      <div>
        <label>Amount</label>
        <Input
          type="number"
          inputMode="decimal"
          className="w-full text-lg"
        />
      </div>
      
      {/* Segmented control for type */}
      <div className="flex rounded-lg bg-muted p-1">
        <button className="flex-1 rounded-md py-2">Buy</button>
        <button className="flex-1 rounded-md py-2">Sell</button>
      </div>
      
      {/* Large submit button */}
      <Button size="lg" className="w-full">
        Place Order
      </Button>
    </form>
  );
}
```

### Input Modes

```tsx
// Use appropriate input modes for mobile keyboards
<input
  type="text"
  inputMode="numeric"      // Number pad
  inputMode="decimal"      // Decimal pad
  inputMode="email"        // Email keyboard
  inputMode="tel"          // Phone keyboard
  inputMode="url"          // URL keyboard
  inputMode="search"       // Search keyboard
/>

// Pattern for numeric input
<input
  type="text"
  inputMode="decimal"
  pattern="[0-9]*\.?[0-9]*"
/>
```

### Gestures

```tsx
// Swipe actions for trade list
import { useSwipeable } from 'react-swipeable';

function TradeItem({ trade, onCancel }: Props) {
  const [showActions, setShowActions] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => setShowActions(true),
    onSwipedRight: () => setShowActions(false),
  });

  return (
    <div className="relative overflow-hidden" {...handlers}>
      <div className={cn(
        'transition-transform',
        showActions && 'translate-x-[-80px]'
      )}>
        <TradeContent trade={trade} />
      </div>
      
      {showActions && (
        <div className="absolute right-0 top-0 flex h-full">
          <button
            onClick={onCancel}
            className="h-full bg-destructive px-4 text-destructive-foreground"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
```

### Loading States

```tsx
// Skeleton loading for mobile
function PriceListSkeleton() {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-16" />
              <Skeleton className="mt-1 h-3 w-12" />
            </div>
          </div>
          <div className="text-right">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="mt-1 h-3 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## Testing Mobile Experience

### Device Testing Matrix

| Category | Devices | Screen Size |
|----------|---------|-------------|
| Small Phone | iPhone SE, Pixel 4a | 320-375px |
| Standard Phone | iPhone 14, Pixel 7 | 375-425px |
| Large Phone | iPhone 14 Pro Max, Pixel 7 Pro | 425px |
| Tablet | iPad Mini, iPad Pro | 768-1024px |

### Chrome DevTools Testing

```bash
# Chrome device emulation
# Open DevTools (F12)
# Click device toggle (Ctrl+Shift+M)
# Select device or custom dimensions
```

### Automated Testing

```typescript
// Playwright mobile test
import { test, expect } from '@playwright/test';

test.describe('Mobile trading', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('can place trade on mobile', async ({ page }) => {
    await page.goto('/trades');
    
    // Tap trade button
    await page.tap('[data-testid="new-trade-button"]');
    
    // Fill form
    await page.fill('[data-testid="amount-input"]', '100');
    await page.tap('[data-testid="submit-trade"]');
    
    // Confirm trade
    await expect(page.locator('[data-testid="trade-success"]')).toBeVisible();
  });
});
```

---

## Best Practices Checklist

- [ ] Touch targets are at least 44x44 pixels
- [ ] Adequate spacing between interactive elements
- [ ] Forms use appropriate input modes
- [ ] Content is readable without horizontal scrolling
- [ ] Navigation is accessible via thumb reach
- [ ] Critical actions are easily accessible
- [ ] Loading states provide feedback
- [ ] Offline functionality is available
- [ ] Performance is optimized for mobile networks
- [ ] Gestures don't conflict with system gestures
- [ ] Safe area insets are respected
- [ ] Font sizes are readable on small screens

---

## Resources

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design - Touch Targets](https://material.io/design/usability/accessibility.html#layout-and-typography)
- [Web.dev Mobile](https://web.dev/mobile/)
- [MDN Mobile Web Development](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
