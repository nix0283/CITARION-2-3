# Component Storybook Guide

This guide explains how to use, develop, and test CITARION components using Storybook.

---

## Overview

Storybook is a development environment for UI components that allows us to develop components in isolation, document their usage, and test them interactively.

### Benefits
- **Isolated Development**: Build components without the full application context
- **Documentation**: Auto-generated documentation for all components
- **Visual Testing**: Catch visual regressions before they reach production
- **Collaboration**: Share components with designers and stakeholders
- **Accessibility Testing**: Built-in a11y testing tools

---

## How to Run Storybook

### Starting Storybook

```bash
# Start development server
npm run storybook

# Start with specific port
npm run storybook -- -p 6007

# Start with specific config
npm run storybook -- --config-dir .storybook

# Build static version
npm run build-storybook
```

### Development URLs

| Environment | URL |
|-------------|-----|
| Local | http://localhost:6006 |
| Static Build | file://./storybook-static/index.html |
| CI Preview | https://citarion-storybook.preview.dev |

---

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Base UI components
│   │   ├── button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   └── ...
│   ├── trading/               # Trading-specific components
│   │   ├── OrderBook/
│   │   │   ├── OrderBook.tsx
│   │   │   ├── OrderBook.stories.tsx
│   │   │   └── index.ts
│   │   └── ...
│   └── layout/                # Layout components
├── .storybook/
│   ├── main.ts               # Storybook configuration
│   ├── preview.tsx           # Global decorators and parameters
│   └── theme.ts              # Storybook theme
```

---

## Component Documentation Standards

### Story File Naming

| File Type | Naming Convention |
|-----------|-------------------|
| Story file | `ComponentName.stories.tsx` |
| Test file | `ComponentName.test.tsx` |
| Component | `ComponentName.tsx` |

### Story Structure

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

/**
 * Buttons are used to trigger actions or events.
 * They should be used for primary actions in forms and dialogs.
 */
const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading state',
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://figma.com/file/xxx/button-component',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Primary button for main actions.
 */
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

/**
 * Secondary button for less prominent actions.
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

/**
 * Outline button for actions that need less emphasis.
 */
export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

/**
 * Ghost button for minimal emphasis.
 */
export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

/**
 * Button with loading state.
 */
export const Loading: Story = {
  args: {
    children: 'Loading Button',
    loading: true,
  },
};

/**
 * Disabled button state.
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

/**
 * Button sizes comparison.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * Icon button example.
 */
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <PlusIcon className="mr-2 h-4 w-4" />
        Add Trade
      </>
    ),
  },
};
```

---

## Writing Stories

### Basic Story

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { TradeCard } from './TradeCard';

const meta: Meta<typeof TradeCard> = {
  title: 'Trading/TradeCard',
  component: TradeCard,
};

export default meta;
type Story = StoryObj<typeof TradeCard>;

export const Default: Story = {
  args: {
    pair: 'BTC/USDT',
    type: 'buy',
    amount: 0.5,
    price: 45000,
    status: 'open',
  },
};
```

### Story with Decorators

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { TradeForm } from './TradeForm';

const meta: Meta<typeof TradeForm> = {
  title: 'Trading/TradeForm',
  component: TradeForm,
  decorators: [
    (Story) => (
      <div className="p-8 bg-gray-100 dark:bg-gray-900">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TradeForm>;

export const Default: Story = {
  args: {
    defaultPair: 'BTC/USDT',
  },
};
```

### Story with Mock Data

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { OrderBook } from './OrderBook';

const meta: Meta<typeof OrderBook> = {
  title: 'Trading/OrderBook',
  component: OrderBook,
};

export default meta;
type Story = StoryObj<typeof OrderBook>;

// Mock data for the order book
const mockOrderBook = {
  bids: [
    { price: 45000, amount: 1.5, total: 67500 },
    { price: 44995, amount: 2.3, total: 103488 },
    { price: 44990, amount: 0.8, total: 35992 },
  ],
  asks: [
    { price: 45005, amount: 1.2, total: 54006 },
    { price: 45010, amount: 3.1, total: 139531 },
    { price: 45015, amount: 0.5, total: 22507 },
  ],
};

export const Default: Story = {
  args: {
    orderBook: mockOrderBook,
    lastPrice: 45002.50,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    orderBook: { bids: [], asks: [] },
    lastPrice: 0,
  },
};
```

### Interactive Stories

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TradeModal } from './TradeModal';

const meta: Meta<typeof TradeModal> = {
  title: 'Trading/TradeModal',
  component: TradeModal,
};

export default meta;
type Story = StoryObj<typeof TradeModal>;

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>
          Open Modal
        </button>
        <TradeModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          pair="BTC/USDT"
        />
      </>
    );
  },
};
```

---

## Testing Components in Isolation

### Visual Testing

Storybook provides built-in visual testing through the snapshot feature:

```bash
# Run visual tests
npm run test:storybook

# Update snapshots
npm run test:storybook:update
```

### Accessibility Testing

Use the a11y addon to test accessibility:

```tsx
// .storybook/preview.tsx
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    a11y: {
      config: {
        rules: [
          // Enable all WCAG 2.1 AA rules
          { id: 'color-contrast', enabled: true },
          { id: 'label', enabled: true },
        ],
      },
    },
  },
};

export default preview;
```

### Interaction Testing

Test component interactions using the interactions addon:

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const ClickTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    await userEvent.click(button);
    
    // Assert something happened
    await expect(button).toHaveTextContent('Clicked!');
  },
};
```

### Mocking API Calls

Use MSW (Mock Service Worker) for API mocking:

```tsx
// .storybook/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/trades', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, pair: 'BTC/USDT', type: 'buy', amount: 0.5 },
        { id: 2, pair: 'ETH/USDT', type: 'sell', amount: 2.0 },
      ])
    );
  }),
];

// .storybook/preview.tsx
import { initialize, mswLoader } from 'msw-storybook-addon';
import { handlers } from './mocks/handlers';

initialize();

const preview: Preview = {
  loaders: [mswLoader],
  parameters: {
    msw: { handlers },
  },
};
```

---

## Addon Configuration

### Installed Addons

| Addon | Purpose |
|-------|---------|
| `@storybook/addon-essentials` | Core addons (actions, controls, docs) |
| `@storybook/addon-a11y` | Accessibility testing |
| `@storybook/addon-interactions` | Interaction testing |
| `@storybook/addon-themes` | Theme switching |
| `storybook-addon-remix-react-router` | React Router support |

### Configuration File

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};

export default config;
```

### Theme Configuration

```typescript
// .storybook/theme.ts
import { create } from '@storybook/theming';

export default create({
  base: 'dark',
  brandTitle: 'CITARION',
  brandUrl: 'https://citarion.com',
  brandImage: '/citarion-logo.svg',
  brandTarget: '_self',
  
  // Colors
  colorPrimary: '#3b82f6',
  colorSecondary: '#60a5fa',
  
  // UI
  appBg: '#0f172a',
  appContentBg: '#1e293b',
  appBorderColor: '#334155',
  
  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: '"Fira Code", monospace',
});
```

### Global Decorators

```tsx
// .storybook/preview.tsx
import type { Preview } from '@storybook/react';
import { withTheme } from './decorators/withTheme';
import { withProvider } from './decorators/withProvider';

const preview: Preview = {
  decorators: [withTheme, withProvider],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' },
      ],
    },
  },
};

export default preview;
```

---

## Best Practices

### 1. Organize Stories Logically

```
UI/
├── Button
├── Input
├── Select
└── Modal

Trading/
├── OrderBook
├── TradeCard
├── TradeForm
└── PriceChart

Layout/
├── Header
├── Sidebar
└── Footer
```

### 2. Use Descriptive Story Names

```tsx
// Good
export const PrimaryButton: Story = {};
export const ButtonWithIcon: Story = {};
export const LoadingButton: Story = {};

// Avoid
export const Story1: Story = {};
export const Test: Story = {};
```

### 3. Document All Props

```tsx
const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      description: 'Visual style variant of the button',
      table: {
        type: { summary: 'primary | secondary | outline | ghost' },
        defaultValue: { summary: 'primary' },
      },
    },
  },
};
```

### 4. Include Edge Cases

```tsx
// Normal state
export const Default: Story = {};

// Edge cases
export const Empty: Story = { args: { items: [] } };
export const Loading: Story = { args: { isLoading: true } };
export const Error: Story = { args: { error: 'Failed to load' } };
export const LongText: Story = { args: { text: 'Very long text...' } };
```

### 5. Test Accessibility

Every component story should be accessible:

```bash
# Run a11y tests
npm run storybook
# Open a11y panel in each story
```

### 6. Use Realistic Data

```tsx
// Good - realistic trading data
export const RealisticTrade: Story = {
  args: {
    pair: 'BTC/USDT',
    type: 'buy',
    amount: 0.125,
    price: 45678.90,
    status: 'filled',
    timestamp: '2024-01-15T14:30:00Z',
  },
};

// Avoid - obviously fake data
export const FakeTrade: Story = {
  args: {
    pair: 'XXX/YYY',
    type: 'buy',
    amount: 999,
    price: 1,
  },
};
```

---

## Troubleshooting

### Common Issues

**Story not appearing:**
- Check file naming convention (`.stories.tsx`)
- Verify story location matches the pattern in `.storybook/main.ts`

**Controls not working:**
- Ensure component props are typed
- Check `argTypes` configuration

**Styles not loading:**
- Import global styles in `.storybook/preview.tsx`
- Check Tailwind configuration

**Addon not working:**
- Verify addon is installed
- Check addon registration in `.storybook/main.ts`

---

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Writing Stories](https://storybook.js.org/docs/writing-stories)
- [Addon Catalog](https://storybook.js.org/addons)
- [Testing with Storybook](https://storybook.js.org/docs/writing-tests)
