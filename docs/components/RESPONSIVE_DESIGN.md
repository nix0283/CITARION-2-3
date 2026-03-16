# Responsive Design Documentation

This document describes the responsive design architecture for the CITARION trading platform, covering breakpoints, adaptive components, and mobile-first patterns.

---

## 1. Overview

CITARION follows a **mobile-first** design philosophy with progressive enhancement for larger screens. The platform provides a seamless experience across mobile phones, tablets, and desktop devices.

### Design Philosophy

| Principle | Description |
|-----------|-------------|
| **Mobile-First** | Design for the smallest screen first, then enhance for larger screens |
| **Touch-Optimized** | All interactive elements are designed for touch input |
| **Content Priority** | Critical trading actions are prioritized on mobile |
| **Progressive Disclosure** | Complex features revealed progressively for larger screens |
| **Performance** | Optimized for mobile networks and devices |

### Device Categories

```
┌─────────────────────────────────────────────────────────────┐
│                     CITARION Responsive                      │
├─────────────┬─────────────────┬─────────────────────────────┤
│   MOBILE    │     TABLET      │         DESKTOP             │
│   < 768px   │  768px - 1024px │        > 1024px             │
├─────────────┼─────────────────┼─────────────────────────────┤
│ - Off-canvas│ - Collapsible   │ - Fixed sidebar             │
│   sidebar   │   sidebar       │ - Full navigation           │
│ - Bottom    │ - Expanded      │ - Multi-column              │
│   nav       │   headers       │   layouts                   │
│ - Compact   │ - Side-by-side  │ - Advanced panels           │
│   headers   │   panels        │                             │
└─────────────┴─────────────────┴─────────────────────────────┘
```

---

## 2. Breakpoints

### Breakpoint System

| Breakpoint | Width | CSS Class | Target Devices |
|------------|-------|-----------|----------------|
| `xs` | 320px | `xs:` | Small phones (iPhone SE) |
| `sm` | 375px | `sm:` | Standard phones (iPhone 14) |
| `md` | 768px | `md:` | Tablets (iPad Mini) |
| `lg` | 1024px | `lg:` | Small laptops, large tablets |
| `xl` | 1280px | `xl:` | Laptops |
| `2xl` | 1536px | `2xl:` | Desktops |

### Mobile (< 768px)

```tsx
// Mobile detection hook
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);
```

**Mobile characteristics:**
- Off-canvas sidebar with overlay
- Bottom navigation bar
- Compact headers
- Single-column layouts
- Simplified data tables
- Pull-to-refresh gestures

### Tablet (768px - 1024px)

```tsx
// Tablet detection
const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
```

**Tablet characteristics:**
- Collapsible sidebar
- Expanded header with more controls
- Two-column layouts where appropriate
- Touch-friendly but with more screen real estate
- Landscape/portrait orientation support

### Desktop (> 1024px)

```tsx
// Desktop detection
const isDesktop = window.innerWidth >= 1024;
```

**Desktop characteristics:**
- Fixed sidebar (expandable/collapsible)
- Full navigation visible
- Multi-column layouts
- Hover states active
- Keyboard shortcuts enabled
- Advanced panels and tools

---

## 3. Components

### 3.1 Sidebar (Adaptive)

The sidebar is the primary navigation component with full responsive behavior.

#### Component Location
`src/components/layout/sidebar.tsx`

#### Responsive Behavior

| Screen | Behavior |
|--------|----------|
| **Mobile** | Off-canvas drawer with overlay, toggle via hamburger menu |
| **Tablet** | Collapsible sidebar, can expand/collapse |
| **Desktop** | Fixed sidebar, can collapse to icon-only mode |

#### Props Interface

```tsx
interface MenuItem {
  id: string
  label: string
  code?: string           // Short code (e.g., "MESH", "PND")
  icon: React.ComponentType<{ className?: string }>
  isNew?: boolean
  badge?: string          // Notification badge
}

interface BotCategory {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  bots: MenuItem[]
}
```

#### Mobile Implementation

```tsx
// Mobile: Off-canvas drawer with overlay
<>
  {/* Mobile Drawer Overlay */}
  <div 
    className={cn(
      "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden",
      sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    )}
    onClick={() => setSidebarOpen(false)}
    aria-hidden="true"
  />
  
  {/* Mobile Menu Toggle Button */}
  <button
    type="button"
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className={cn(
      "fixed top-4 left-4 z-50 md:hidden flex items-center justify-center",
      "h-11 w-11 rounded-lg border border-border bg-card shadow-sm",
      "text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
      "touch-target"
    )}
    aria-label={sidebarOpen ? "Close menu" : "Open menu"}
    aria-expanded={sidebarOpen}
  >
    {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
  </button>

  <aside
    className={cn(
      "fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300 flex flex-col",
      // Desktop: fixed sidebar
      "md:z-50",
      sidebarOpen ? "md:w-64" : "md:w-16",
      // Mobile: drawer mode
      isMobile && [
        "w-72 max-w-[85vw]",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      ]
    )}
    role="navigation"
    aria-label="Main navigation"
  >
    {/* ... sidebar content ... */}
  </aside>
</>
```

#### Desktop Collapse Behavior

```tsx
// Collapse button - Desktop only
<Button
  variant="ghost"
  size="icon"
  onClick={() => setSidebarOpen(!sidebarOpen)}
  className="hidden md:flex absolute -right-3 top-20 h-6 w-6 rounded-full border border-border bg-card shadow-sm cursor-pointer hover:bg-accent z-50"
  aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
>
  {sidebarOpen ? (
    <ChevronLeft className="h-3 w-3" />
  ) : (
    <ChevronRight className="h-3 w-3" />
  )}
</Button>
```

#### Sidebar States

```
┌─────────────────────────────────────────────────────────────┐
│                         MOBILE                               │
│  ┌──────────┐                                                │
│  │ ☰ Menu   │  ← Tap to open sidebar                         │
│  └──────────┘                                                │
│                                                              │
│  When Open:                                                  │
│  ┌─────────────────┐  ┌────────────────────┐                 │
│  │ ☰ CITARION    ✕ │  │                    │                 │
│  ├─────────────────┤  │    Overlay         │                 │
│  │ 📊 Dashboard    │  │    (click to       │                 │
│  │ 📈 Chart        │  │     close)         │                 │
│  │ 💼 Portfolio    │  │                    │                 │
│  │ ...             │  │                    │                 │
│  └─────────────────┘  └────────────────────┘                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        DESKTOP                               │
│                                                              │
│  Expanded (w-64):           Collapsed (w-16):                │
│  ┌────────────────────┐     ┌────┐                           │
│  │ C CITARION      ◀ │     │ C  │                           │
│  ├────────────────────┤     ├────┤                           │
│  │ 📊 Dashboard       │     │ 📊 │                           │
│  │ 📈 Chart           │     │ 📈 │                           │
│  │ 💼 Portfolio       │     │ 💼 │                           │
│  │ 🤖 Bots       6    │     │ 🤖 │                           │
│  │ ...                │     │ ...│                           │
│  └────────────────────┘     └────┘                           │
└─────────────────────────────────────────────────────────────┘
```

---

### 3.2 MobileNav

Bottom navigation bar for mobile devices with quick access to core features.

#### Component Location
`src/components/layout/mobile-nav.tsx`

#### Navigation Items

```tsx
interface MobileNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mobileNavItems: MobileNavItem[] = [
  { id: "dashboard", label: "Дашборд", icon: LayoutDashboard },
  { id: "chart", label: "График", icon: CandlestickChart },
  { id: "trading", label: "Торговля", icon: LineChart },
  { id: "grid-bot", label: "Боты", icon: Bot },
  { id: "settings", label: "Настройки", icon: Settings },
];
```

#### Implementation

```tsx
export function MobileNav() {
  const { activeTab, setActiveTab } = useCryptoStore();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-card/95 backdrop-blur-sm"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-2 py-1 safe-area-bottom">
        {mobileNavItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex flex-col items-center justify-center min-h-11 min-w-11 px-3 py-2 rounded-lg transition-colors",
                "touch-target",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.label}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="text-[10px] mt-0.5 font-medium">
                {item.label}
              </span>
              {/* Active indicator dot */}
              {isActive && (
                <span
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
      {/* Safe area padding for iOS devices */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
```

#### Visual Representation

```
┌─────────────────────────────────────────────────────────────┐
│                      MOBILE BOTTOM NAV                       │
├─────────┬─────────┬─────────┬─────────┬─────────┤
│   📊    │   📈    │   📉    │   🤖    │   ⚙️    │
│ Дашборд │ График  │ Торговля│  Боты   │Настройки│
│    ●    │         │         │         │         │
└─────────┴─────────┴─────────┴─────────┴─────────┘
         ↑ Active indicator dot
```

---

### 3.3 Header

Responsive header with different layouts for mobile and desktop.

#### Component Location
`src/components/layout/header.tsx`

#### Responsive Behavior

| Screen | Layout |
|--------|--------|
| **Mobile** | Compact: Mode badge + Balance + Quick Menu dropdown |
| **Tablet** | Expanded: Title + Mode selector + Notifications |
| **Desktop** | Full: Title + Mode selector + Notifications + User profile |

#### Implementation

```tsx
export function Header() {
  const { account, setTradingMode, resetDemoBalance, setActiveTab } = useCryptoStore();
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="sticky top-0 z-30 h-14 md:h-16 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-3 md:px-6">
        {/* Left side - Page Title + Mode Badge */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile spacing for menu button */}
          <div className="w-11 md:hidden" aria-hidden="true" />
          
          <h2 className="text-sm md:text-lg font-semibold text-foreground truncate">
            Панель управления
          </h2>
          
          {/* Mode Badge - Compact on mobile */}
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] md:text-xs font-medium",
              modeConfig.bgColor,
              modeConfig.color,
              modeConfig.borderColor
            )}
          >
            <ModeIcon className="h-3 w-3 mr-1" />
            [{modeConfig.label}]
          </Badge>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Balance Display */}
          <div className="flex md:hidden items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50">
            <Wallet className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold">
              ${formatNumber(balance, 0)}
            </span>
          </div>

          {/* Desktop Mode Selector */}
          <div className="hidden sm:flex items-center gap-2 rounded-lg border border-border px-2 py-1">
            <Label className="text-xs text-muted-foreground">Mode:</Label>
            <Select value={currentMode} onValueChange={handleModeChange}>
              {/* ... */}
            </Select>
          </div>

          {/* Notification Bell - Desktop only */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex h-8 w-8 relative"
            aria-label="Notifications"
            onClick={() => setActiveTab("notifications")}
          >
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-white flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Button>

          {/* Theme Toggle - All sizes */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-8 w-8"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* User Menu - Desktop */}
          <DropdownMenu>
            {/* Avatar dropdown for desktop */}
          </DropdownMenu>

          {/* Mobile Quick Menu */}
          <DropdownMenu>
            {/* Compact dropdown with mode selector for mobile */}
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
```

#### Trading Mode Configuration

```tsx
type ExtendedTradingMode = "PAPER" | "TESTNET" | "DEMO" | "LIVE";

const MODE_CONFIG: Record<ExtendedTradingMode, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: typeof TestTube;
  description: string;
  requiresApiKey: boolean;
}> = {
  PAPER: {
    label: "PAPER",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    icon: FlaskConical,
    description: "Симуляция с реальными ценами",
    requiresApiKey: false,
  },
  TESTNET: {
    label: "TESTNET",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    icon: TestTube,
    description: "Тестовая сеть биржи",
    requiresApiKey: true,
  },
  DEMO: {
    label: "DEMO",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    icon: Zap,
    description: "Демо режим на live бирже",
    requiresApiKey: true,
  },
  LIVE: {
    label: "LIVE",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    icon: AlertTriangle,
    description: "⚠️ Реальная торговля",
    requiresApiKey: true,
  },
};
```

---

## 4. Patterns

### 4.1 Off-Canvas Sidebar

The off-canvas pattern is used for the sidebar on mobile devices.

#### Implementation Steps

1. **Overlay Layer** - Semi-transparent backdrop
2. **Sidebar Layer** - Sliding panel
3. **Toggle Button** - Hamburger menu icon
4. **Close Handler** - Click overlay or X button to close

```tsx
// Off-canvas pattern implementation
export function OffCanvasSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      {/* 1. Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm",
          "transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />
      
      {/* 2. Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 max-w-[85vw]",
          "bg-card border-r border-border",
          "transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar content */}
      </aside>
      
      {/* 3. Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-30"
      >
        {isOpen ? <X /> : <Menu />}
      </button>
    </>
  );
}
```

#### Animation Timing

| Property | Duration | Easing |
|----------|----------|--------|
| Overlay opacity | 300ms | ease-in-out |
| Sidebar slide | 300ms | ease-in-out |
| Content fade | 200ms | ease-out |

---

### 4.2 Bottom Navigation

Bottom navigation provides quick access to primary features on mobile.

#### Design Guidelines

1. **5 items maximum** - Prevents cramped layout
2. **44px minimum touch target** - Accessibility requirement
3. **Active state indicator** - Visual feedback for current location
4. **Labels always visible** - No mystery meat navigation

```tsx
// Bottom navigation pattern
export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t bg-card/95 backdrop-blur">
      <div className="flex items-center justify-around">
        {items.map(item => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-center justify-center",
              "min-h-11 min-w-11 px-3 py-2",
              "touch-target"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        ))}
      </div>
      {/* iOS safe area */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
```

#### Safe Area Handling

```css
/* iOS safe area for bottom navigation */
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

/* Alternative: dedicated spacer element */
.bottom-safe-area {
  height: env(safe-area-inset-bottom);
}
```

---

### 4.3 Collapsible Panels

Panels that collapse on mobile and expand on larger screens.

#### Implementation

```tsx
export function CollapsiblePanel({ title, children }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Auto-expand on desktop
  useEffect(() => {
    if (!isMobile) setIsExpanded(true);
  }, [isMobile]);
  
  return (
    <div className="border rounded-lg">
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex w-full items-center justify-between p-4",
          "md:pointer-events-none" // Desktop: no toggle needed
        )}
      >
        <h3>{title}</h3>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform md:hidden",
          isExpanded && "rotate-180"
        )} />
      </button>
      
      {/* Content - collapsible on mobile */}
      <div className={cn(
        "overflow-hidden transition-all",
        isExpanded ? "max-h-screen" : "max-h-0 md:max-h-screen"
      )}>
        {children}
      </div>
    </div>
  );
}
```

---

## 5. Tailwind CSS Classes

### Responsive Class Patterns

#### Visibility

```tsx
// Hide on mobile, show on desktop
<div className="hidden md:block">
  <DesktopComponent />
</div>

// Show on mobile, hide on desktop
<div className="md:hidden">
  <MobileComponent />
</div>

// Show only on specific breakpoint
<div className="hidden lg:block xl:hidden">
  <TabletComponent />
</div>
```

#### Layout

```tsx
// Responsive flex direction
<div className="flex flex-col md:flex-row">
  {/* Stack on mobile, row on desktop */}
</div>

// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {/* Cards */}
</div>

// Responsive width
<div className="w-full md:w-64 lg:w-80">
  {/* Sidebar or panel */}
</div>
```

#### Spacing

```tsx
// Responsive padding
<div className="p-3 md:p-4 lg:p-6">
  {/* Content */}
</div>

// Responsive gap
<div className="flex gap-2 md:gap-4 lg:gap-6">
  {/* Items */}
</div>
```

#### Typography

```tsx
// Responsive text size
<h1 className="text-lg md:text-xl lg:text-2xl">
  Title
</h1>

// Responsive font weight
<span className="font-medium md:font-semibold">
  Text
</span>
```

### Common Responsive Patterns

```tsx
// Responsive card grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {cards.map(card => <Card key={card.id} {...card} />)}
</div>

// Responsive sidebar layout
<div className="flex flex-col lg:flex-row">
  <aside className="w-full lg:w-64 lg:shrink-0">
    <Sidebar />
  </aside>
  <main className="flex-1 p-4">
    <Content />
  </main>
</div>

// Responsive header
<header className="h-14 md:h-16 border-b px-3 md:px-6">
  {/* Header content */}
</header>

// Responsive button
<button className="h-10 px-4 text-sm md:h-11 md:px-6 md:text-base">
  Action
</button>
```

### Touch Target Classes

```css
/* Custom utility class for touch targets */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Extend hit area without visual change */
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

## 6. Testing

### Manual Testing Checklist

#### Mobile (< 768px)

- [ ] Sidebar opens/closes with hamburger menu
- [ ] Sidebar closes when clicking overlay
- [ ] Bottom navigation visible and functional
- [ ] Touch targets are at least 44x44px
- [ ] No horizontal scrolling on any page
- [ ] Text is readable without zooming
- [ ] Forms are usable with touch input
- [ ] Charts are touch-scrollable
- [ ] Modals and drawers work correctly
- [ ] Safe area respected on iOS devices

#### Tablet (768px - 1024px)

- [ ] Sidebar is collapsible
- [ ] Both portrait and landscape work
- [ ] Touch and mouse interactions both work
- [ ] Content utilizes extra space
- [ ] Navigation is accessible

#### Desktop (> 1024px)

- [ ] Fixed sidebar works correctly
- [ ] Sidebar collapse/expand functions
- [ ] Hover states work
- [ ] Keyboard navigation works
- [ ] Full feature set accessible
- [ ] Multi-column layouts render properly

### Automated Testing

#### Playwright Tests

```typescript
import { test, expect } from '@playwright/test';

// Mobile viewport test
test.describe('Mobile layout', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('sidebar is hidden by default on mobile', async ({ page }) => {
    await page.goto('/');
    
    // Sidebar should not be visible
    await expect(page.locator('[aria-label="Main navigation"]')).not.toBeInViewport();
    
    // Menu button should be visible
    await expect(page.locator('[aria-label="Open menu"]')).toBeVisible();
  });

  test('sidebar opens when menu button clicked', async ({ page }) => {
    await page.goto('/');
    
    // Click menu button
    await page.click('[aria-label="Open menu"]');
    
    // Sidebar should now be visible
    await expect(page.locator('[aria-label="Main navigation"]')).toBeInViewport();
    
    // Overlay should be visible
    await expect(page.locator('.bg-black\\/60')).toBeVisible();
  });

  test('sidebar closes when overlay clicked', async ({ page }) => {
    await page.goto('/');
    
    // Open sidebar
    await page.click('[aria-label="Open menu"]');
    
    // Click overlay
    await page.click('.bg-black\\/60');
    
    // Sidebar should be hidden again
    await expect(page.locator('[aria-label="Main navigation"]')).not.toBeInViewport();
  });
});

// Desktop viewport test
test.describe('Desktop layout', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('sidebar is visible by default on desktop', async ({ page }) => {
    await page.goto('/');
    
    // Sidebar should be visible
    await expect(page.locator('[aria-label="Main navigation"]')).toBeInViewport();
  });

  test('sidebar can be collapsed', async ({ page }) => {
    await page.goto('/');
    
    // Collapse sidebar
    await page.click('[aria-label="Collapse sidebar"]');
    
    // Check sidebar width
    const sidebar = page.locator('[aria-label="Main navigation"]');
    await expect(sidebar).toHaveCSS('width', '64px'); // w-16
  });
});

// Tablet viewport test
test.describe('Tablet layout', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test('bottom navigation is hidden on tablet', async ({ page }) => {
    await page.goto('/');
    
    // Bottom nav should not exist
    await expect(page.locator('[aria-label="Mobile navigation"]')).not.toBeVisible();
  });
});
```

#### Jest Tests for Responsive Hooks

```typescript
import { renderHook, act } from '@testing-library/react';
import { useMediaQuery } from '@/hooks/use-media-query';

describe('useMediaQuery', () => {
  it('returns true when query matches', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(max-width: 768px)',
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    
    expect(result.current).toBe(true);
  });
});
```

### Chrome DevTools Testing

```bash
# Device emulation steps
1. Open Chrome DevTools (F12)
2. Click device toggle (Ctrl+Shift+M)
3. Select device preset or enter custom dimensions
4. Test responsive behavior

# Recommended device presets:
- iPhone SE (375x667) - Small mobile
- iPhone 14 Pro (393x852) - Standard mobile
- iPad Mini (768x1024) - Tablet
- iPad Pro (1024x1366) - Large tablet
```

---

## 7. Usage Examples

### Example 1: Responsive Trading Panel

```tsx
export function TradingPanel() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <div className={cn(
      "grid gap-4",
      isMobile ? "grid-cols-1" : "grid-cols-[1fr_300px]"
    )}>
      {/* Main chart - full width on mobile */}
      <div className="min-h-[300px] md:min-h-[500px]">
        <PriceChart />
      </div>
      
      {/* Order form - sidebar on desktop, bottom on mobile */}
      <div className={cn(
        isMobile && "fixed bottom-16 left-0 right-0 z-40 bg-card border-t p-4"
      )}>
        <OrderForm />
      </div>
    </div>
  );
}
```

### Example 2: Responsive Data Table

```tsx
export function PositionsTable({ positions }: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  if (isMobile) {
    // Card view for mobile
    return (
      <div className="space-y-2">
        {positions.map(position => (
          <PositionCard key={position.id} position={position} />
        ))}
      </div>
    );
  }
  
  // Table view for desktop
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead>Side</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Entry</TableHead>
          <TableHead>PnL</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {positions.map(position => (
          <PositionRow key={position.id} position={position} />
        ))}
      </TableBody>
    </Table>
  );
}
```

### Example 3: Responsive Form Layout

```tsx
export function BotConfigForm() {
  return (
    <form className="space-y-4">
      {/* Full-width on mobile, 2-column on tablet+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField name="symbol" label="Symbol" />
        <FormField name="side" label="Side" />
      </div>
      
      {/* Stacked on mobile, row on tablet+ */}
      <div className="flex flex-col md:flex-row gap-4">
        <FormField name="takeProfit" label="Take Profit" className="flex-1" />
        <FormField name="stopLoss" label="Stop Loss" className="flex-1" />
      </div>
      
      {/* Full-width submit button */}
      <Button className="w-full md:w-auto">
        Save Configuration
      </Button>
    </form>
  );
}
```

### Example 4: Responsive Modal/Drawer

```tsx
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";

export function ResponsiveModal({ 
  open, 
  onClose, 
  children 
}: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  if (isMobile) {
    // Drawer from bottom on mobile
    return (
      <Drawer open={open} onOpenChange={onClose}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerTitle>Panel Title</DrawerTitle>
          {children}
        </DrawerContent>
      </Drawer>
    );
  }
  
  // Centered dialog on desktop
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogTitle>Panel Title</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
```

### Example 5: Responsive Header with Actions

```tsx
export function PageHeader({ title, actions }: Props) {
  return (
    <header className="flex items-center justify-between gap-4">
      {/* Title - truncates on mobile */}
      <h1 className="text-lg md:text-xl font-semibold truncate">
        {title}
      </h1>
      
      {/* Actions - hidden on mobile, shown on tablet+ */}
      <div className="hidden md:flex items-center gap-2">
        {actions}
      </div>
      
      {/* Mobile overflow menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actions.map((action, i) => (
            <DropdownMenuItem key={i} onClick={action.onClick}>
              {action.icon}
              <span className="ml-2">{action.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
```

---

## 8. Best Practices

### Do's

✅ Use mobile-first approach (base styles for mobile, then `md:` and up)
✅ Ensure 44x44px minimum touch targets
✅ Test on actual devices, not just browser emulation
✅ Use semantic HTML elements
✅ Provide visible focus states
✅ Hide non-essential content on mobile
✅ Use `touch-target` utility class consistently
✅ Consider safe areas for iOS devices
✅ Test both portrait and landscape orientations

### Don'ts

❌ Don't use hover-only interactions on mobile
❌ Don't hide navigation behind complex gestures
❌ Don't use fixed-width elements that cause horizontal scrolling
❌ Don't rely on mouse events for mobile interactions
❌ Don't use tiny text or icons on mobile
❌ Don't ignore landscape orientation
❌ Don't forget about iOS safe areas
❌ Don't block content with fixed elements without proper padding

---

## 9. Related Documentation

| Document | Description |
|----------|-------------|
| [MOBILE_UX_GUIDE.md](../ui/MOBILE_UX_GUIDE.md) | Detailed mobile UX guidelines |
| [ACCESSIBILITY_GUIDE.md](../ui/ACCESSIBILITY_GUIDE.md) | Accessibility requirements |
| [DESIGN_SYSTEM.md](../ui/DESIGN_SYSTEM.md) | Design tokens and components |
| [UI_COMPONENTS_AUDIT.md](../UI_COMPONENTS_AUDIT.md) | Component coverage audit |

---

*Last updated: March 2026*
