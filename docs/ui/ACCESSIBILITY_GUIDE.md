# Accessibility Guide

**Version:** 2.0 | **Last Updated:** March 2026 | **WCAG 2.1 AA Compliance**

---

## 📋 Overview

CITARION is committed to providing an accessible trading platform that can be used by everyone, including people with disabilities. This guide outlines our accessibility standards and implementation guidelines.

---

## 🎯 Compliance Target

| Standard | Level | Status |
|----------|-------|--------|
| WCAG 2.1 | A | ✅ Compliant |
| WCAG 2.1 | AA | ✅ Compliant |
| WCAG 2.1 | AAA | 🟡 Partial |
| Section 508 | - | ✅ Compliant |
| ADA | - | ✅ Compliant |

---

## ⌨️ Keyboard Navigation

### Global Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move focus forward |
| `Shift + Tab` | Move focus backward |
| `Enter` | Activate focused element |
| `Space` | Toggle checkbox/button |
| `Escape` | Close modal/dropdown |
| `Arrow Keys` | Navigate lists/menus |

### Trading Hotkeys

| Key | Action |
|-----|--------|
| `B` | Open Buy panel |
| `S` | Open Sell panel |
| `E + Shift` | Close all positions |
| `R` | Refresh data |
| `1-6` | Quick position size (1%, 5%, 10%, 25%, 50%, 100%) |
| `/` | Focus search |
| `?` | Open keyboard shortcuts help |

### Focus Management

```typescript
// Focus trap for modals
function useFocusTrap(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    element.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => element.removeEventListener('keydown', handleTab);
  }, [ref]);
}
```

---

## 🖼️ Screen Reader Support

### ARIA Labels

```tsx
// Button with accessible name
<Button aria-label="Buy Bitcoin">Buy</Button>

// Icon button
<IconButton aria-label="Refresh prices">
  <RefreshIcon />
</IconButton>

// Status indicator
<div role="status" aria-live="polite">
  {loading ? 'Loading...' : 'Data loaded'}
</div>

// Alert
<div role="alert" aria-live="assertive">
  Position liquidated
</div>
```

### Live Regions

```tsx
// Price updates
<div aria-live="polite" aria-atomic="true" className="sr-only">
  BTCUSDT price: ${price}
</div>

// Trade notifications
<div role="status" aria-live="polite">
  Trade executed: BUY 0.001 BTCUSDT
</div>

// Error messages
<div role="alert" aria-live="assertive">
  Failed to place order: Insufficient balance
</div>
```

### Table Accessibility

```tsx
<table role="grid" aria-label="Open positions">
  <thead>
    <tr>
      <th scope="col">Symbol</th>
      <th scope="col">Side</th>
      <th scope="col">Size</th>
      <th scope="col">PnL</th>
    </tr>
  </thead>
  <tbody>
    {positions.map((pos) => (
      <tr key={pos.id}>
        <td>{pos.symbol}</td>
        <td>{pos.side}</td>
        <td>{pos.size}</td>
        <td aria-label={`Profit and Loss: ${pos.pnl > 0 ? 'profit' : 'loss'} ${Math.abs(pos.pnl)}`}>
          {pos.pnl}
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

---

## 🎨 Color and Contrast

### Contrast Requirements

| Element | Minimum Ratio | Target |
|---------|---------------|--------|
| Normal text | 4.5:1 | 7:1 |
| Large text (18px+) | 3:1 | 4.5:1 |
| UI components | 3:1 | 4.5:1 |
| Focus indicators | 3:1 | 4.5:1 |

### Color Blindness

```css
/* Don't rely on color alone */
.profit {
  color: var(--color-success);
  &::before { content: '+ '; }
}

.loss {
  color: var(--color-danger);
  &::before { content: '- '; }
}

/* Use patterns for charts */
.chart-profit {
  background-color: var(--color-success);
  background-image: url('data:image/svg+xml,...'); /* Diagonal lines */
}

.chart-loss {
  background-color: var(--color-danger);
  background-image: url('data:image/svg+xml,...'); /* Dots */
}
```

### Dark Mode

```css
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-text-muted: #666666;
}

[data-theme="dark"] {
  --color-bg: #0a0a0a;
  --color-text: #ffffff;
  --color-text-muted: #999999;
}
```

---

## 📝 Form Accessibility

### Label Association

```tsx
<div className="form-group">
  <label htmlFor="symbol-input">Symbol</label>
  <input
    id="symbol-input"
    type="text"
    aria-describedby="symbol-help"
  />
  <span id="symbol-help" className="help-text">
    Enter trading pair (e.g., BTCUSDT)
  </span>
</div>
```

### Error Handling

```tsx
<div className="form-group">
  <label htmlFor="quantity-input">Quantity</label>
  <input
    id="quantity-input"
    type="number"
    aria-invalid={errors.quantity ? 'true' : 'false'}
    aria-describedby={errors.quantity ? 'quantity-error' : undefined}
  />
  {errors.quantity && (
    <span id="quantity-error" role="alert" className="error">
      {errors.quantity.message}
    </span>
  )}
</div>
```

### Required Fields

```tsx
<label htmlFor="price-input">
  Price <span aria-hidden="true">*</span>
  <span className="sr-only">(required)</span>
</label>
<input
  id="price-input"
  required
  aria-required="true"
/>
```

---

## 🧩 Component Guidelines

### Buttons

```tsx
// Clear text labels
<Button>Buy BTC</Button>  // ✅ Good
<Button>B</Button>        // ❌ Bad

// Icon buttons need labels
<IconButton aria-label="Close dialog">
  <XIcon />
</IconButton>
```

### Modals

```tsx
<Dialog>
  <DialogTitle>Confirm Order</DialogTitle>
  <DialogDescription>
    You are about to buy 0.001 BTC at $67,000
  </DialogDescription>
  <DialogFooter>
    <Button onClick={onCancel}>Cancel</Button>
    <Button onClick={onConfirm}>Confirm</Button>
  </DialogFooter>
</Dialog>
```

### Navigation

```tsx
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a role="menuitem" href="/trading">Trading</a>
    </li>
    <li role="none">
      <a role="menuitem" href="/bots">Bots</a>
    </li>
  </ul>
</nav>
```

---

## 🧪 Testing

### Automated Testing

```bash
# Run accessibility tests
bun run test:a11y

# Using axe-core
import { axe } from 'jest-axe';

it('should have no accessibility violations', async () => {
  const { container } = render(<TradingPanel />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing Checklist

- [ ] Navigate using only keyboard
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify color contrast ratios
- [ ] Test at 200% zoom
- [ ] Disable CSS and verify content order
- [ ] Test with color blindness simulator

---

## 📚 Resources

- [ACCESSIBILITY_CHECKLIST.md](ACCESSIBILITY_CHECKLIST.md) - Pre-release checklist
- [THEME_CUSTOMIZATION.md](THEME_CUSTOMIZATION.md) - Theme configuration
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

*Last updated: March 2026 | CITARION Documentation Team*
