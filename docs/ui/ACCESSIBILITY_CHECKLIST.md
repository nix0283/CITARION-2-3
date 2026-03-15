# Accessibility Checklist

This checklist ensures CITARION meets WCAG 2.1 AA compliance before each release. Use this as a pre-release verification tool.

---

## Pre-Release Checklist

### Perceivable

#### 1.1 Text Alternatives
- [ ] All images have appropriate alt text
- [ ] Decorative images use `alt=""` or `aria-hidden="true"`
- [ ] Complex images have extended descriptions
- [ ] Image buttons have descriptive alt text
- [ ] SVG icons have `aria-hidden="true"` when decorative
- [ ] Captcha alternatives are available

#### 1.2 Time-based Media
- [ ] Videos have captions
- [ ] Audio content has transcripts
- [ ] Audio descriptions available for video content
- [ ] No auto-playing audio without user consent

#### 1.3 Adaptable
- [ ] Content structure is semantic (headings, lists, etc.)
- [ ] Reading sequence is logical without CSS
- [ ] Instructions don't rely solely on sensory characteristics
- [ ] Form inputs have associated labels
- [ ] Data tables have proper headers

#### 1.4 Distinguishable
- [ ] Color contrast meets 4.5:1 for normal text
- [ ] Color contrast meets 3:1 for large text
- [ ] UI components have 3:1 contrast ratio
- [ ] Text can be resized to 200% without loss
- [ ] No horizontal scrolling at 320px width
- [ ] Text spacing can be modified without loss
- [ ] Content doesn't rely on color alone

### Operable

#### 2.1 Keyboard Accessible
- [ ] All functionality is keyboard accessible
- [ ] No keyboard traps exist
- [ ] Custom components have appropriate key handlers
- [ ] Focus can be moved away from all components
- [ ] Shortcuts can be turned off or remapped

#### 2.2 Enough Time
- [ ] Time limits can be turned off or extended
- [ ] Moving content can be paused
- [ ] No content flashes more than 3 times per second
- [ ] Session timeouts have warnings

#### 2.3 Seizures and Physical Reactions
- [ ] No content flashes more than 3 times/second
- [ ] Animation can be disabled
- [ ] Parallax effects can be disabled

#### 2.4 Navigable
- [ ] Pages have descriptive titles
- [ ] Headings are properly nested (h1-h6)
- [ ] Multiple navigation methods available
- [ ] Focus order is logical
- [ ] Link purpose is clear from context
- [ ] Focus is visible on all interactive elements
- [ ] Current location is indicated
- [ ] Skip links are provided

#### 2.5 Input Modalities
- [ ] Touch targets are at least 44x44 CSS pixels
- [ ] Motion-activated functions have alternatives
- [ ] Content can be operated without gestures

### Understandable

#### 3.1 Readable
- [ ] Page language is specified (`lang` attribute)
- [ ] Language changes are marked
- [ ] Abbreviations and jargon are explained
- [ ] Reading level is appropriate (or simplified version available)

#### 3.2 Predictable
- [ ] Focus doesn't trigger context changes
- [ ] Input doesn't trigger unexpected changes
- [ ] Navigation is consistent across pages
- [ ] Components are identified consistently
- [ ] Changes are requested before proceeding

#### 3.3 Input Assistance
- [ ] Form inputs have labels or instructions
- [ ] Errors are automatically detected
- [ ] Error messages describe the issue
- [ ] Error suggestions are provided
- [ ] Critical actions can be reversed
- [ ] Information is verified before submission

### Robust

#### 4.1 Compatible
- [ ] Valid HTML markup
- [ ] Name, role, value for custom components
- [ ] Status messages can be programmatically determined
- [ ] ARIA attributes are used correctly

---

## Component-Specific Checklists

### Buttons

```tsx
// Standard button - PASS
<button>Submit Trade</button>

// Icon button - requires aria-label
<button aria-label="Close dialog">
  <XIcon aria-hidden="true" />
</button>

// Toggle button - requires aria-pressed
<button aria-pressed="true" aria-label="Dark mode">
  <MoonIcon />
</button>

// Disabled button - must be focusable for accessibility
<button disabled aria-disabled="true">
  Submit
</button>
```

**Checklist:**
- [ ] Has accessible name (text or aria-label)
- [ ] Icon-only buttons have aria-label
- [ ] Toggle buttons have aria-pressed
- [ ] Disabled state is communicated
- [ ] Focus indicator is visible
- [ ] Works with Enter and Space keys

### Forms

```tsx
// Accessible form field
<div>
  <label htmlFor="trade-amount">
    Amount
    <span aria-hidden="true">*</span>
    <span className="sr-only">(required)</span>
  </label>
  <input
    id="trade-amount"
    type="number"
    required
    aria-required="true"
    aria-describedby="amount-error amount-hint"
  />
  <span id="amount-hint">Enter amount in USDT</span>
  <span id="amount-error" role="alert">
    Amount must be greater than 0
  </span>
</div>
```

**Checklist:**
- [ ] All inputs have associated labels
- [ ] Required fields are marked
- [ ] Error messages are associated with inputs
- [ ] Help text is associated with inputs
- [ ] Fieldsets group related inputs
- [ ] Error messages are announced
- [ ] Form can be submitted via keyboard

### Modals and Dialogs

```tsx
// Accessible modal
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Confirm Trade</h2>
  <p id="modal-description">
    You are about to place a buy order for 0.5 BTC at $45,000
  </p>
  <button>Confirm</button>
  <button>Cancel</button>
</div>
```

**Checklist:**
- [ ] Has role="dialog"
- [ ] Has aria-modal="true"
- [ ] Has accessible name (aria-labelledby)
- [ ] Focus is trapped within modal
- [ ] Escape key closes modal
- [ ] Focus returns to trigger element
- [ ] Background content is inert

### Data Tables

```tsx
// Accessible data table
<table aria-label="Trading history">
  <caption className="sr-only">
    Recent trades for BTC/USDT pair
  </caption>
  <thead>
    <tr>
      <th scope="col">Time</th>
      <th scope="col">Type</th>
      <th scope="col">Price</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
  <tbody>
    {trades.map(trade => (
      <tr key={trade.id}>
        <td>{trade.time}</td>
        <td>{trade.type}</td>
        <td>{trade.price}</td>
        <td>{trade.amount}</td>
      </tr>
    ))}
  </tbody>
</table>
```

**Checklist:**
- [ ] Has caption or aria-label
- [ ] Headers use `<th>` with scope
- [ ] Complex tables use headers attribute
- [ ] Sortable columns indicate sort state
- [ ] Pagination is accessible

### Charts and Visualizations

```tsx
// Accessible chart wrapper
<figure aria-labelledby="chart-title" aria-describedby="chart-desc">
  <figcaption id="chart-title">BTC/USDT Price Chart</figcaption>
  <div id="chart-desc" className="sr-only">
    Line chart showing price movement over 24 hours.
    Current price: $45,234. High: $46,000. Low: $44,500.
  </div>
  <LineChart data={chartData} />
  <button onClick={() => announceData()}>
    Read chart data
  </button>
</figure>
```

**Checklist:**
- [ ] Has text alternative or description
- [ ] Data is available in tabular format
- [ ] Color is not the only differentiator
- [ ] Interactive elements are keyboard accessible
- [ ] Tooltips are accessible

### Navigation

```tsx
// Accessible navigation
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/dashboard" aria-current="page">Dashboard</a></li>
    <li><a href="/trades">Trades</a></li>
    <li><a href="/bots">Bots</a></li>
  </ul>
</nav>
```

**Checklist:**
- [ ] Navigation has aria-label
- [ ] Current page is indicated
- [ ] Dropdown menus are keyboard accessible
- [ ] Focus order is logical
- [ ] Skip links are provided

---

## Testing Procedures

### Automated Testing

```bash
# Run accessibility tests
npm run test:a11y

# Run with specific rules
npm run test:a11y -- --rules color-contrast,label

# Generate report
npm run test:a11y -- --reporter html
```

### Manual Keyboard Testing

1. **Navigate through page**
   - Use Tab to move forward
   - Use Shift+Tab to move backward
   - Verify logical focus order

2. **Test all interactive elements**
   - Enter activates links and buttons
   - Space activates buttons and checkboxes
   - Arrow keys navigate within components

3. **Test modals and dialogs**
   - Tab is trapped within modal
   - Escape closes modal
   - Focus returns to trigger

4. **Test forms**
   - Tab navigates between fields
   - Enter submits form
   - Error messages are announced

### Screen Reader Testing

#### NVDA (Windows)

1. Start NVDA (Ctrl+Alt+N)
2. Navigate with arrow keys
3. Tab through interactive elements
4. Verify announcements:
   - Page title on load
   - Heading structure
   - Form labels
   - Status messages

#### VoiceOver (macOS)

1. Start VoiceOver (Cmd+F5)
2. Navigate with:
   - Ctrl+Option+Arrow keys for reading
   - Tab for interactive elements
   - Ctrl+Option+U for rotor navigation
3. Verify landmarks and headings

#### VoiceOver (iOS)

1. Enable VoiceOver in Settings
2. Navigate with swipe gestures
3. Double-tap to activate
4. Verify touch targets

---

## Common Issues and Fixes

### Issue: Low Color Contrast

**Problem:** Text contrast ratio below 4.5:1

**Fix:**
```css
/* Before - fails contrast */
.text {
  color: #888888; /* 3.5:1 on white */
}

/* After - passes contrast */
.text {
  color: #595959; /* 7:1 on white */
}
```

### Issue: Missing Form Labels

**Problem:** Input without associated label

**Fix:**
```tsx
// Before
<input type="text" placeholder="Enter amount" />

// After
<label htmlFor="amount">Amount</label>
<input id="amount" type="text" placeholder="Enter amount" />
```

### Issue: Non-semantic Headings

**Problem:** Visual headings not marked with h1-h6

**Fix:**
```tsx
// Before
<div className="text-xl font-bold">Trading History</div>

// After
<h2 className="text-xl font-bold">Trading History</h2>
```

### Issue: Missing Focus Indicator

**Problem:** No visible focus state

**Fix:**
```css
/* Before */
button:focus {
  outline: none;
}

/* After */
button:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}
```

### Issue: Icon-Only Buttons

**Problem:** Button with only an icon has no accessible name

**Fix:**
```tsx
// Before
<button><XIcon /></button>

// After
<button aria-label="Close dialog">
  <XIcon aria-hidden="true" />
</button>
```

### Issue: Keyboard Trap

**Problem:** Focus cannot escape a component

**Fix:**
```tsx
// Ensure Escape key closes modals/menus
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  window.addEventListener('keydown', handleEscape);
  return () => window.removeEventListener('keydown', handleEscape);
}, [onClose]);
```

### Issue: Mouse-Only Interactions

**Problem:** Functionality requires mouse

**Fix:**
```tsx
// Before - only onClick
<div onClick={handleClick}>Click me</div>

// After - keyboard accessible
<button onClick={handleClick}>
  Click me
</button>

// Or for custom interactive elements
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Click me
</div>
```

---

## Accessibility Review Process

### Pre-Merge Checklist

1. **Code Review**
   - [ ] Accessibility attributes reviewed
   - [ ] Keyboard functionality tested
   - [ ] ARIA usage validated

2. **Automated Testing**
   - [ ] axe-core tests pass
   - [ ] No new violations introduced

3. **Manual Testing**
   - [ ] Keyboard navigation verified
   - [ ] Screen reader testing completed

### Release Checklist

1. **Full Audit**
   - [ ] All pages tested
   - [ ] All components tested
   - [ ] Documentation updated

2. **Regression Testing**
   - [ ] Previous issues resolved
   - [ ] No new issues introduced

3. **Compliance Sign-off**
   - [ ] Accessibility lead approval
   - [ ] Release notes include accessibility updates

---

## Resources

- [Accessibility Guide](./ACCESSIBILITY_GUIDE.md)
- [Design System](./DESIGN_SYSTEM.md)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM WAVE Tool](https://wave.webaim.org/)
