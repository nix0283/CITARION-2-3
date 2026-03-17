# CITARION Design System

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Overview

CITARION Design System provides a consistent visual language for the trading platform, ensuring cohesive user experience across all components and pages.

---

## 🎨 Color Palette

### Primary Colors

| Name | Light Mode | Dark Mode | Usage |
|------|------------|-----------|-------|
| **Primary** | `#2563eb` | `#3b82f6` | Buttons, links, active states |
| **Primary Foreground** | `#ffffff` | `#ffffff` | Text on primary |
| **Secondary** | `#64748b` | `#94a3b8` | Secondary actions |
| **Background** | `#ffffff` | `#0a0a0a` | Page background |
| **Foreground** | `#0f172a` | `#f8fafc` | Primary text |

### Semantic Colors

| Name | Light | Dark | Usage |
|------|-------|------|-------|
| **Success** | `#10b981` | `#22c55e` | Profit, positive |
| **Warning** | `#f59e0b` | `#eab308` | Caution, alerts |
| **Danger** | `#ef4444` | `#f43f5e` | Loss, errors |
| **Info** | `#0ea5e9` | `#38bdf8` | Information |

### Trading Colors

| Name | Value | Usage |
|------|-------|-------|
| **Long/ Buy** | `#10b981` | Buy orders, long positions |
| **Short/ Sell** | `#ef4444` | Sell orders, short positions |
| **Neutral** | `#64748b` | Neutral indicators |

---

## 📐 Typography

### Font Family

```css
--font-sans: "Inter", system-ui, sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, monospace;
```

### Type Scale

| Name | Size | Line Height | Usage |
|------|------|-------------|-------|
| **xs** | 12px | 16px | Labels, captions |
| **sm** | 14px | 20px | Secondary text |
| **base** | 16px | 24px | Body text |
| **lg** | 18px | 28px | Emphasis |
| **xl** | 20px | 28px | Headings |
| **2xl** | 24px | 32px | Section headings |
| **3xl** | 30px | 36px | Page headings |
| **4xl** | 36px | 40px | Display |

### Font Weights

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## 📏 Spacing

### Scale

```css
--spacing-0: 0;
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-8: 32px;
--spacing-10: 40px;
--spacing-12: 48px;
--spacing-16: 64px;
```

### Component Spacing

| Component | Padding | Gap |
|-----------|---------|-----|
| Cards | `p-4` (16px) | `gap-4` |
| Modals | `p-6` (24px) | `gap-6` |
| Forms | `p-4` | `gap-4` |
| Tables | `p-0` | `gap-0` |

---

## 🔲 Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

### Usage

| Element | Radius |
|---------|--------|
| Buttons | `--radius-md` |
| Inputs | `--radius-md` |
| Cards | `--radius-lg` |
| Modals | `--radius-lg` |
| Avatars | `--radius-full` |
| Pills | `--radius-full` |

---

## 🌟 Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

### Dark Mode Shadows

```css
[data-theme="dark"] {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5);
}
```

---

## 🧩 Components

### Button Variants

```tsx
// Primary
<Button variant="default">Primary Action</Button>

// Secondary
<Button variant="secondary">Secondary Action</Button>

// Destructive
<Button variant="destructive">Delete</Button>

// Outline
<Button variant="outline">Outline</Button>

// Ghost
<Button variant="ghost">Ghost</Button>

// Link
<Button variant="link">Link</Button>
```

### Button Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### Input States

```tsx
// Default
<Input placeholder="Enter value" />

// Error
<Input error="Invalid value" />

// Disabled
<Input disabled />

// With label
<FormField>
  <Label>Price</Label>
  <Input type="number" />
</FormField>
```

### Cards

```tsx
<Card>
  <CardHeader>
    <CardTitle>Position</CardTitle>
    <CardDescription>BTCUSDT Long</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    <Button>Close Position</Button>
  </CardFooter>
</Card>
```

---

## 🎬 Animations

### Transition Durations

```css
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
```

### Easing

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Animation Classes

```css
/* Fade in */
.animate-fade-in {
  animation: fadeIn var(--duration-normal) var(--ease-out);
}

/* Slide up */
.animate-slide-up {
  animation: slideUp var(--duration-normal) var(--ease-out);
}

/* Scale in */
.animate-scale-in {
  animation: scaleIn var(--duration-fast) var(--ease-out);
}
```

---

## 📱 Responsive Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### Tailwind Classes

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm:` | 640px | Mobile landscape |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Small laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large screens |

---

## 🖼️ Icons

### Icon Library

Using Lucide React icons:

```tsx
import { 
  TrendingUp, TrendingDown, 
  Wallet, Settings, Bell,
  Search, Menu, X
} from 'lucide-react';

// Usage
<TrendingUp className="text-success" />
<TrendingDown className="text-danger" />
```

### Icon Sizes

```tsx
<Icon size={16} />  // sm
<Icon size={20} />  // default
<Icon size={24} />  // lg
<Icon size={32} />  // xl
```

---

## 📊 Charts

### Chart Colors

```tsx
const chartColors = {
  primary: 'var(--color-primary)',
  success: 'var(--color-success)',
  danger: 'var(--color-danger)',
  warning: 'var(--color-warning)',
  neutral: 'var(--color-muted)',
};

// Price line
<LineChart data={priceData} stroke={chartColors.primary} />

// PnL area
<AreaChart 
  data={pnlData} 
  fill={chartColors.success}
  fillOpacity={0.3}
/>
```

---

## 📚 Related Documentation

- [ACCESSIBILITY_GUIDE.md](ACCESSIBILITY_GUIDE.md) - Accessibility standards
- [THEME_CUSTOMIZATION.md](THEME_CUSTOMIZATION.md) - Theme configuration
- [COMPONENT_STORYBOOK.md](COMPONENT_STORYBOOK.md) - Component examples

---

*Last updated: March 2026 | CITARION Documentation Team*
