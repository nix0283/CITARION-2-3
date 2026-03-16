# Micro-Interactions Guide

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Overview

Micro-interactions are small, contained product moments that revolve around a single use case. They provide feedback, enhance the sense of direct manipulation, and help users understand results.

---

## 🎯 Purpose

1. **Feedback** - Acknowledge user actions immediately
2. **Guidance** - Help users understand what's happening
3. **Delight** - Create memorable, enjoyable experiences
4. **Control** - Give users a sense of direct manipulation

---

## 🏗️ Structure of Micro-Interactions

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MICRO-INTERACTION ANATOMY                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. TRIGGER                                                                  │
│     • User action (click, hover, scroll)                                    │
│     • System event (data loaded, error occurred)                            │
│                                                                              │
│  2. RULES                                                                    │
│     • What happens when triggered                                            │
│     • Conditions and sequences                                               │
│                                                                              │
│  3. FEEDBACK                                                                 │
│     • Visual changes (animation, color, size)                               │
│     • Audio cues (optional)                                                  │
│     • Haptic feedback (mobile)                                               │
│                                                                              │
│  4. LOOPS/MODES                                                              │
│     • Animation timing and repetition                                        │
│     • State variations                                                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖱️ Hover Interactions

### Button Hover

```css
/* Primary button hover */
.btn-primary {
  transition: all 0.2s ease-out;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

### Card Hover

```css
/* Card lift effect */
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}
```

### Table Row Hover

```css
/* Table row highlight */
.table-row {
  transition: background-color 0.15s ease;
}

.table-row:hover {
  background-color: var(--color-hover);
}
```

---

## 👆 Click/Tap Interactions

### Ripple Effect

```tsx
// Material-style ripple
<ButtonWithRipple>
  <span className="ripple-container">
    <span className="ripple" style={{ left, top }} />
  </span>
  {children}
</ButtonWithRipple>
```

```css
.ripple-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  animation: ripple 0.6s ease-out forwards;
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
```

### Icon Toggle

```tsx
// Favorite/Bookmark toggle
<IconButton onClick={toggleFavorite}>
  <motion.div
    animate={isFavorite ? "filled" : "outlined"}
    variants={{
      outlined: { scale: 1 },
      filled: { scale: [1, 1.2, 1] }
    }}
    transition={{ duration: 0.3 }}
  >
    {isFavorite ? <HeartFilled /> : <HeartOutlined />}
  </motion.div>
</IconButton>
```

---

## ✨ Loading States

### Skeleton Loading

```tsx
// Content placeholder
<Skeleton className="h-4 w-48" />
<Skeleton className="h-4 w-32 mt-2" />
<Skeleton className="h-32 w-full mt-4" />
```

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-skeleton) 0%,
    var(--color-skeleton-highlight) 50%,
    var(--color-skeleton) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Spinner Variations

```tsx
// Trading-specific loaders
<Spinner type="dots" />      // Connecting to exchange
<Spinner type="pulse" />     // Processing order
<Spinner type="bars" />      // Loading market data
```

### Progress Indicators

```tsx
// Order execution progress
<ProgressSteps
  steps={['Validating', 'Submitting', 'Confirmed']}
  current={1}
  status="processing"
/>
```

---

## 📊 Data Update Animations

### Price Change

```tsx
// Price flash animation
<motion.span
  key={price}
  initial={{ backgroundColor: isUp ? '#10b98133' : '#ef444433' }}
  animate={{ backgroundColor: 'transparent' }}
  transition={{ duration: 0.5 }}
>
  {formatPrice(price)}
</motion.span>
```

### Chart Data Points

```tsx
// Chart bar animation
<motion.rect
  initial={{ scaleY: 0 }}
  animate={{ scaleY: 1 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
  style={{ originY: 1 }}
/>
```

### List Item Addition

```tsx
// New item slide in
<AnimatePresence>
  {items.map((item) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
    >
      <Item {...item} />
    </motion.div>
  ))}
</AnimatePresence>
```

---

## 🔄 State Transitions

### Toggle Switch

```tsx
// Animated toggle
<motion.div
  className="toggle-track"
  animate={{ backgroundColor: isOn ? 'var(--color-primary)' : 'var(--color-gray)' }}
>
  <motion.div
    className="toggle-thumb"
    animate={{ x: isOn ? 20 : 0 }}
    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
  />
</motion.div>
```

### Expand/Collapse

```tsx
// Accordion animation
<motion.div
  initial={false}
  animate={{ height: isOpen ? 'auto' : 0 }}
  transition={{ duration: 0.3, ease: 'easeInOut' }}
  style={{ overflow: 'hidden' }}
>
  {content}
</motion.div>
```

### Modal Open/Close

```tsx
// Modal entrance
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.95, opacity: 0 }}
    transition={{ type: 'spring', duration: 0.3 }}
  >
    {modalContent}
  </motion.div>
</motion.div>
```

---

## 📱 Mobile-Specific Interactions

### Pull to Refresh

```tsx
// Pull-to-refresh gesture
const { pullDistance, isRefreshing } = usePullToRefresh({
  onRefresh: fetchNewData,
  threshold: 80
});

return (
  <div className="ptr-container">
    <motion.div
      style={{ y: pullDistance * 0.5 }}
      animate={{ rotate: isRefreshing ? 360 : 0 }}
      transition={{ repeat: isRefreshing ? Infinity : 0, duration: 1 }}
    >
      <RefreshIcon />
    </motion.div>
  </div>
);
```

### Swipe Actions

```tsx
// Swipe to delete/action
<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  onDragEnd={handleSwipe}
>
  <ListItem />
</motion.div>
```

### Haptic Feedback

```tsx
// Vibration on action
function vibrate(pattern: number | number[]) {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}

// Usage
vibrate(10);  // Light tap
vibrate([20, 10, 20]);  // Double tap
```

---

## 🎨 Color Transitions

### Status Indicators

```css
/* Status color transitions */
.status-indicator {
  transition: background-color 0.3s ease;
}

.status-indicator[data-status="success"] {
  background-color: var(--color-success);
}

.status-indicator[data-status="warning"] {
  background-color: var(--color-warning);
}

.status-indicator[data-status="error"] {
  background-color: var(--color-danger);
}
```

### Profit/Loss Colors

```tsx
// PnL color animation
<motion.span
  animate={{ 
    color: pnl >= 0 
      ? 'var(--color-success)' 
      : 'var(--color-danger)'
  }}
>
  {formatPnL(pnl)}
</motion.span>
```

---

## ⏱️ Timing Guidelines

| Interaction Type | Duration | Easing |
|------------------|----------|--------|
| Hover | 150-200ms | ease-out |
| Click feedback | 100-150ms | ease |
| Modal open | 200-300ms | spring |
| Page transition | 300-500ms | ease-in-out |
| Loading spinner | 1000-1500ms | linear (loop) |
| Toast notification | 300ms | ease-out |
| Success checkmark | 400-600ms | spring |

---

## 🎵 Audio Feedback (Optional)

```tsx
// Sound effects
const sounds = {
  click: new Audio('/sounds/click.mp3'),
  success: new Audio('/sounds/success.mp3'),
  error: new Audio('/sounds/error.mp3'),
  notification: new Audio('/sounds/notification.mp3'),
};

function playSound(type: keyof typeof sounds) {
  if (userPreferences.soundEnabled) {
    sounds[type].currentTime = 0;
    sounds[type].play();
  }
}
```

---

## 📊 Performance Considerations

### Animation Optimization

```tsx
// Use GPU-accelerated properties
<motion.div
  style={{ 
    willChange: 'transform',  // Hint for browser optimization
  }}
  animate={{
    x: 100,      // GPU accelerated
    opacity: 1,  // GPU accelerated
    // Avoid animating: width, height, margin, padding
  }}
/>
```

### Reduce Motion

```tsx
// Respect user preferences
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

const animationConfig = prefersReducedMotion 
  ? { duration: 0 }  // Instant transitions
  : { duration: 0.3, ease: 'easeOut' };
```

---

## ✅ Micro-Interaction Checklist

- [ ] Provides clear feedback for user action
- [ ] Duration is appropriate (not too slow/fast)
- [ ] Easing feels natural
- [ ] Respects `prefers-reduced-motion`
- [ ] Works on both desktop and mobile
- [ ] Doesn't interfere with functionality
- [ ] Enhances understanding, not just decoration
- [ ] Consistent with app-wide animation language

---

## 📚 Related Documentation

- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - Colors and typography
- [ERROR_MESSAGES_UX.md](ERROR_MESSAGES_UX.md) - Error feedback
- [THEME_CUSTOMIZATION.md](THEME_CUSTOMIZATION.md) - Theme animations

---

*Last updated: March 2026 | CITARION Documentation Team*
