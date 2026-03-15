# Theme Customization Guide

This guide explains how to customize and extend the CITARION theme system using CSS variables and Tailwind CSS.

---

## Theme System Overview

CITARION uses a CSS variable-based theming system powered by Tailwind CSS. This approach provides:

- **Runtime theme switching** without page reload
- **Consistent styling** across all components
- **Easy customization** through CSS variables
- **Dark mode support** out of the box

### Architecture

```
src/
├── styles/
│   ├── globals.css        # CSS variables and base styles
│   └── themes/
│       ├── light.css      # Light theme variables
│       ├── dark.css       # Dark theme variables
│       └── custom/        # Custom theme overrides
├── tailwind.config.ts     # Tailwind configuration
└── components/
    └── theme-provider.tsx # Theme context provider
```

---

## CSS Variables System

### Core Variables

All theme values are defined as CSS variables in `globals.css`:

```css
/* src/styles/globals.css */

:root {
  /* Colors - Brand */
  --color-primary: 59 130 246;      /* blue-500 */
  --color-primary-foreground: 255 255 255;
  --color-secondary: 100 116 139;   /* slate-500 */
  --color-secondary-foreground: 255 255 255;
  --color-accent: 168 85 247;       /* purple-500 */
  --color-accent-foreground: 255 255 255;
  
  /* Colors - Semantic */
  --color-success: 34 197 94;       /* green-500 */
  --color-warning: 234 179 8;       /* yellow-500 */
  --color-error: 239 68 68;         /* red-500 */
  --color-info: 59 130 246;         /* blue-500 */
  
  /* Colors - Background */
  --background: 255 255 255;
  --foreground: 15 23 42;
  --card: 255 255 255;
  --card-foreground: 15 23 42;
  --muted: 241 245 249;
  --muted-foreground: 100 116 139;
  --border: 226 232 240;
  
  /* Colors - UI */
  --ring: 59 130 246;
  --radius: 0.5rem;
  
  /* Typography */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "Fira Code", monospace;
  
  /* Spacing */
  --spacing-unit: 0.25rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  /* Animations */
  --transition-fast: 150ms;
  --transition-normal: 300ms;
  --transition-slow: 500ms;
}

/* Dark mode overrides */
.dark {
  --background: 15 23 42;
  --foreground: 248 250 252;
  --card: 30 41 59;
  --card-foreground: 248 250 252;
  --muted: 51 65 85;
  --muted-foreground: 148 163 184;
  --border: 51 65 85;
  
  --color-primary: 96 165 250;      /* blue-400 */
  --color-secondary: 148 163 184;   /* slate-400 */
  --color-accent: 192 132 252;      /* purple-400 */
}
```

### Using Variables in Components

```tsx
// Using Tailwind classes
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Primary Button
</button>

// Using CSS custom properties
<button className="bg-[var(--color-primary)]">
  Primary Button
</button>

// Using rgb values
<div className="bg-[rgb(var(--background))]">
  Content
</div>
```

---

## Light/Dark Mode Configuration

### Theme Provider

```tsx
// src/components/theme-provider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    const applyTheme = (newTheme: 'light' | 'dark') => {
      root.classList.remove('light', 'dark');
      root.classList.add(newTheme);
      setResolvedTheme(newTheme);
    };

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      applyTheme(systemTheme);
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### Theme Toggle Component

```tsx
// src/components/theme-toggle.tsx
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
      <button
        onClick={() => setTheme('light')}
        className={`rounded-md p-2 transition-colors ${
          theme === 'light' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
        }`}
        aria-label="Light mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`rounded-md p-2 transition-colors ${
          theme === 'dark' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
        }`}
        aria-label="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`rounded-md p-2 transition-colors ${
          theme === 'system' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
        }`}
        aria-label="System theme"
      >
        <Monitor className="h-4 w-4" />
      </button>
    </div>
  );
}
```

---

## Custom Color Schemes

### Creating a Custom Theme

```css
/* src/styles/themes/custom/ocean.css */

.theme-ocean {
  --color-primary: 6 182 212;        /* cyan-500 */
  --color-primary-foreground: 255 255 255;
  --color-secondary: 20 184 166;     /* teal-500 */
  --color-secondary-foreground: 255 255 255;
  --color-accent: 14 165 233;        /* sky-500 */
  --color-accent-foreground: 255 255 255;
  
  --background: 240 253 250;         /* teal-50 */
  --foreground: 19 78 74;            /* teal-900 */
  --card: 255 255 255;
  --card-foreground: 19 78 74;
  --muted: 204 251 241;              /* teal-100 */
  --muted-foreground: 20 184 166;
  --border: 153 246 228;             /* teal-200 */
}

.theme-ocean.dark {
  --background: 4 47 46;             /* teal-950 */
  --foreground: 240 253 250;
  --card: 19 78 74;                  /* teal-900 */
  --card-foreground: 240 253 250;
  --muted: 53 121 120;               /* teal-800 */
  --muted-foreground: 153 246 228;
  --border: 53 121 120;
  
  --color-primary: 34 211 238;       /* cyan-400 */
  --color-secondary: 45 212 191;     /* teal-400 */
  --color-accent: 56 189 248;        /* sky-400 */
}
```

### Applying Custom Themes

```tsx
// Apply theme class to document root
function applyCustomTheme(themeName: string) {
  const root = document.documentElement;
  
  // Remove existing theme classes
  root.classList.remove('theme-default', 'theme-ocean', 'theme-forest');
  
  // Add new theme class
  root.classList.add(`theme-${themeName}`);
  
  // Store preference
  localStorage.setItem('custom-theme', themeName);
}
```

### Available Custom Themes

| Theme | Description | Usage |
|-------|-------------|-------|
| `default` | CITARION default (blue) | `theme-default` |
| `ocean` | Ocean teal/cyan tones | `theme-ocean` |
| `forest` | Forest green tones | `theme-forest` |
| `sunset` | Warm orange/amber tones | `theme-sunset` |
| `midnight` | Deep purple/indigo | `theme-midnight` |

---

## Component Theming

### Component-Level Variables

```css
/* Button component theme */
.btn {
  --btn-bg: rgb(var(--color-primary));
  --btn-fg: rgb(var(--color-primary-foreground));
  --btn-border: rgb(var(--color-primary));
  --btn-shadow: var(--shadow-md);
  
  background-color: var(--btn-bg);
  color: var(--btn-fg);
  border: 1px solid var(--btn-border);
  box-shadow: var(--btn-shadow);
}

/* Button variants */
.btn-secondary {
  --btn-bg: rgb(var(--color-secondary));
  --btn-fg: rgb(var(--color-secondary-foreground));
}

.btn-outline {
  --btn-bg: transparent;
  --btn-fg: rgb(var(--color-primary));
  --btn-border: rgb(var(--color-primary));
}

.btn-ghost {
  --btn-bg: transparent;
  --btn-fg: rgb(var(--color-primary));
  --btn-border: transparent;
  --btn-shadow: none;
}
```

### Card Theming

```css
/* Card component theme */
.card {
  --card-bg: rgb(var(--card));
  --card-fg: rgb(var(--card-foreground));
  --card-border: rgb(var(--border));
  --card-radius: var(--radius);
  --card-shadow: var(--shadow-md);
  
  background-color: var(--card-bg);
  color: var(--card-fg);
  border: 1px solid var(--card-border);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
}

/* Card variants */
.card-elevated {
  --card-shadow: var(--shadow-lg);
  --card-border: transparent;
}

.card-outlined {
  --card-shadow: none;
}

.card-filled {
  --card-bg: rgb(var(--muted));
  --card-border: transparent;
}
```

### Trading Component Themes

```css
/* Price display */
.price-positive {
  color: rgb(var(--color-success));
}

.price-negative {
  color: rgb(var(--color-error));
}

/* Order book */
.order-book {
  --bid-color: rgb(var(--color-success));
  --ask-color: rgb(var(--color-error));
  --spread-color: rgb(var(--muted-foreground));
}

/* Chart themes */
.chart-grid {
  stroke: rgb(var(--muted) / 0.5);
}

.chart-crosshair {
  stroke: rgb(var(--color-primary));
}

.chart-tooltip {
  background-color: rgb(var(--card));
  border: 1px solid rgb(var(--border));
}
```

---

## Tailwind Configuration

### Theme Extension

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          foreground: 'rgb(var(--color-primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
          foreground: 'rgb(var(--color-secondary-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          foreground: 'rgb(var(--color-accent-foreground) / <alpha-value>)',
        },
        
        // Semantic colors
        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
        
        // Background colors
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'rgb(var(--card) / <alpha-value>)',
          foreground: 'rgb(var(--card-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
          foreground: 'rgb(var(--muted-foreground) / <alpha-value>)',
        },
        border: 'rgb(var(--border) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',
      },
      
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      
      transitionDuration: {
        fast: 'var(--transition-fast)',
        normal: 'var(--transition-normal)',
        slow: 'var(--transition-slow)',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## Best Practices

### 1. Use Semantic Color Names

```tsx
// Good - semantic and theme-aware
<span className="text-success">+2.5%</span>
<span className="text-error">-1.2%</span>

// Avoid - hardcoded colors
<span className="text-green-500">+2.5%</span>
<span className="text-red-500">-1.2%</span>
```

### 2. Respect User Preferences

```tsx
// Check system preference
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

// Check reduced motion preference
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

// Apply accordingly
<div className={cn(
  'transition-colors',
  prefersReducedMotion && 'transition-none'
)}>
```

### 3. Test Both Themes

Always test components in both light and dark modes:

```tsx
// Storybook - test both themes
export const LightMode: Story = {
  parameters: {
    themes: { themeOverride: 'light' },
  },
};

export const DarkMode: Story = {
  parameters: {
    themes: { themeOverride: 'dark' },
  },
};
```

### 4. Maintain Contrast Ratios

When customizing colors, ensure WCAG compliance:

| Element | Minimum Ratio | Target |
|---------|---------------|--------|
| Normal text | 4.5:1 | 7:1 |
| Large text | 3:1 | 4.5:1 |
| UI components | 3:1 | 4.5:1 |

### 5. Document Custom Themes

```typescript
// src/styles/themes/index.ts
export interface ThemeConfig {
  name: string;
  label: string;
  description: string;
  preview: string; // Preview image URL
}

export const availableThemes: ThemeConfig[] = [
  {
    name: 'default',
    label: 'CITARION Default',
    description: 'Clean blue theme with professional look',
    preview: '/themes/default-preview.png',
  },
  {
    name: 'ocean',
    label: 'Ocean',
    description: 'Calm teal and cyan tones',
    preview: '/themes/ocean-preview.png',
  },
];
```

### 6. Use CSS Layering

```css
/* Layer your styles for proper cascading */
@layer base {
  :root {
    /* Base variables */
  }
}

@layer components {
  .btn {
    /* Component styles */
  }
}

@layer utilities {
  .text-balance {
    /* Utility styles */
  }
}
```

---

## Troubleshooting

### Common Issues

**Theme not applying:**
- Check `ThemeProvider` wraps your app
- Verify CSS variables are defined
- Check class is applied to `<html>` element

**Colors not updating:**
- Clear browser cache
- Check for CSS specificity issues
- Verify Tailwind is processing the files

**Flash of unstyled content:**
- Add blocking script in `<head>`:

```html
<script>
  (function() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Dark Mode Best Practices](https://www.smashingmagazine.com/2021/08/dark-mode-design/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
