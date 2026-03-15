# UI Performance Best Practices

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Overview

This guide covers performance optimization strategies for CITARION's frontend, ensuring fast load times and smooth interactions for trading operations.

---

## 🎯 Performance Targets

| Metric | Target | Critical |
|--------|--------|----------|
| **First Contentful Paint (FCP)** | < 1.5s | < 2.5s |
| **Largest Contentful Paint (LCP)** | < 2.5s | < 4.0s |
| **Time to Interactive (TTI)** | < 3.5s | < 5.0s |
| **Cumulative Layout Shift (CLS)** | < 0.1 | < 0.25 |
| **First Input Delay (FID)** | < 100ms | < 300ms |
| **Interaction to Next Paint (INP)** | < 200ms | < 500ms |

---

## 📦 Bundle Optimization

### Code Splitting

```tsx
// Lazy load heavy components
const TradingChart = lazy(() => import('./TradingChart'));
const BotPanel = lazy(() => import('./BotPanel'));
const BacktestingUI = lazy(() => import('./BacktestingUI'));

// With loading fallback
<Suspense fallback={<ChartSkeleton />}>
  <TradingChart data={priceData} />
</Suspense>
```

### Dynamic Imports

```tsx
// Load exchange clients on demand
async function getExchangeClient(exchange: ExchangeId) {
  switch (exchange) {
    case 'binance':
      return (await import('./binance-client')).BinanceClient;
    case 'bybit':
      return (await import('./bybit-client')).BybitClient;
    // ...
  }
}
```

### Tree Shaking

```tsx
// ❌ Bad: Import entire library
import _ from 'lodash';

// ✅ Good: Import specific functions
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
```

---

## 🖼️ Image Optimization

### Next.js Image Component

```tsx
import Image from 'next/image';

// Automatic optimization
<Image
  src="/charts/btc-chart.png"
  alt="BTC Price Chart"
  width={800}
  height={400}
  loading="lazy"
  placeholder="blur"
  blurDataURL={blurPlaceholder}
/>
```

### Responsive Images

```tsx
<Image
  src="/hero.png"
  alt="Trading Dashboard"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority // For above-fold images
/>
```

### Icon Sprites

```tsx
// Use SVG sprites for icons
<svg className="icon">
  <use href="/icons/sprite.svg#chart" />
</svg>
```

---

## 🔄 Data Fetching Optimization

### React Query Configuration

```tsx
// Optimized query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,    // 5 minutes
      gcTime: 10 * 60 * 1000,       // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 2,
    },
  },
});
```

### Prefetching

```tsx
// Prefetch on hover
function SymbolRow({ symbol }: { symbol: string }) {
  const queryClient = useQueryClient();
  
  return (
    <div
      onMouseEnter={() => {
        queryClient.prefetchQuery({
          queryKey: ['symbol', symbol],
          queryFn: () => fetchSymbolData(symbol),
        });
      }}
    >
      {symbol}
    </div>
  );
}
```

### Infinite Queries

```tsx
// Optimized infinite scroll
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ['trades'],
  queryFn: ({ pageParam = 0 }) => fetchTrades(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextCursor,
  initialPageParam: 0,
});
```

---

## ⚡ Real-time Data Performance

### WebSocket Throttling

```tsx
// Throttle WebSocket updates
const throttledUpdate = useMemo(
  () => throttle((data: PriceUpdate) => {
    setPriceData(prev => updatePrice(prev, data));
  }, 100), // Max 10 updates per second
  []
);

ws.on('price_update', throttledUpdate);
```

### Data Windowing

```tsx
// Virtual list for large datasets
import { FixedSizeList } from 'react-window';

function TradeList({ trades }: { trades: Trade[] }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={trades.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <TradeRow trade={trades[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}
```

### Efficient Re-renders

```tsx
// Memoize expensive calculations
const analytics = useMemo(
  () => calculateAnalytics(trades),
  [trades]
);

// Memoize components
const PositionRow = memo(function PositionRow({ position }: Props) {
  return <tr>...</tr>;
});

// Stable callbacks
const handleClose = useCallback(
  (id: string) => closePosition(id),
  [] // No dependencies = stable reference
);
```

---

## 🎨 Rendering Performance

### CSS Containment

```css
/* Isolate expensive components */
.chart-container {
  contain: layout style;
}

.price-ticker {
  contain: strict;
}
```

### Hardware Acceleration

```css
/* GPU-accelerated animations */
.animated-element {
  transform: translateZ(0);
  will-change: transform;
}
```

### Debounced Resize Handlers

```tsx
// Debounce window resize
useEffect(() => {
  const handleResize = debounce(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 100);

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

---

## 📊 Chart Performance

### Canvas vs SVG

| Use Case | Recommended |
|----------|-------------|
| < 1000 points | SVG (simpler, interactive) |
| 1000 - 10000 points | Canvas with optimizations |
| > 10000 points | WebGL (lightweight-charts) |

### Data Aggregation

```tsx
// Aggregate data for large time ranges
function aggregateCandles(candles: Candle[], targetCount: number): Candle[] {
  const bucketSize = Math.ceil(candles.length / targetCount);
  
  return candles.reduce((aggregated, candle, i) => {
    const bucketIndex = Math.floor(i / bucketSize);
    
    if (!aggregated[bucketIndex]) {
      aggregated[bucketIndex] = { ...candle };
    } else {
      aggregated[bucketIndex].high = Math.max(
        aggregated[bucketIndex].high,
        candle.high
      );
      aggregated[bucketIndex].low = Math.min(
        aggregated[bucketIndex].low,
        candle.low
      );
      aggregated[bucketIndex].volume += candle.volume;
    }
    
    return aggregated;
  }, [] as Candle[]);
}
```

### Lightweight Charts Configuration

```tsx
// Optimized chart options
const chartOptions = {
  layout: {
    fontFamily: 'Inter, sans-serif',
  },
  crosshair: {
    mode: CrosshairMode.Magnet,
  },
  rightPriceScale: {
    borderVisible: false,
  },
  timeScale: {
    borderVisible: false,
    fixLeftEdge: true,
    fixRightEdge: true,
  },
  handleScale: {
    mouseWheel: true,
    pinch: true,
    axisPressedMouseMove: true,
  },
};
```

---

## 💾 Caching Strategies

### Service Worker Cache

```typescript
// public/sw.js
const CACHE_NAME = 'citarion-v1';
const STATIC_ASSETS = [
  '/',
  '/app.js',
  '/app.css',
  '/fonts/inter.woff2',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});
```

### Local Storage for Preferences

```tsx
// Persist user preferences
const usePreferences = create<Preferences>()(
  persist(
    (set) => ({
      theme: 'dark',
      fontSize: 'medium',
      // ...
    }),
    {
      name: 'citarion-preferences',
      partialize: (state) => ({
        theme: state.theme,
        fontSize: state.fontSize,
      }),
    }
  )
);
```

---

## 📱 Mobile Performance

### Touch Event Optimization

```tsx
// Prevent scroll lag
<div
  onTouchStart={(e) => e.preventDefault()}
  onTouchMove={(e) => e.preventDefault()}
  style={{ touchAction: 'none' }}
>
  <Chart />
</div>
```

### Reduced Animations

```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Viewport Optimization

```tsx
// Don't render off-screen components
import { useInView } from 'react-intersection-observer';

function LazyChart({ data }: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px',
  });

  return (
    <div ref={ref}>
      {inView ? <Chart data={data} /> : <ChartSkeleton />}
    </div>
  );
}
```

---

## 🔍 Performance Monitoring

### Web Vitals Tracking

```tsx
// Track Core Web Vitals
export function reportWebVitals(metric: NextWebVitalsMetric) {
  const { name, value, id } = metric;
  
  // Send to analytics
  gtag('event', name, {
    event_category: 'Web Vitals',
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    event_label: id,
    non_interaction: true,
  });
}
```

### Custom Performance Marks

```tsx
// Track custom metrics
performance.mark('trade-start');
await executeTrade(order);
performance.mark('trade-end');
performance.measure('trade-execution', 'trade-start', 'trade-end');

const measure = performance.getEntriesByName('trade-execution')[0];
console.log(`Trade took ${measure.duration}ms`);
```

---

## ✅ Performance Checklist

### Before Release

- [ ] Lighthouse score > 90 for all categories
- [ ] Bundle size < 500KB initial load
- [ ] No layout shifts during load
- [ ] Images optimized (WebP, lazy loaded)
- [ ] Fonts preloaded
- [ ] Critical CSS inlined
- [ ] Third-party scripts deferred
- [ ] API responses cached
- [ ] WebSocket updates throttled

### Regular Monitoring

- [ ] Real User Monitoring (RUM) setup
- [ ] Error tracking integrated
- [ ] Performance budgets defined
- [ ] Alerts for performance regressions
- [ ] Regular bundle analysis

---

## 📚 Related Documentation

- [MICRO_INTERACTIONS.md](MICRO_INTERACTIONS.md) - Animation performance
- [MOBILE_UX_GUIDE.md](MOBILE_UX_GUIDE.md) - Mobile optimization
- [../deployment/PERFORMANCE_TUNING.md](../deployment/PERFORMANCE_TUNING.md) - Backend performance

---

*Last updated: March 2026 | CITARION Documentation Team*
