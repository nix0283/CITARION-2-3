# Error Messages UX Guide

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Overview

This guide establishes standards for error messages and user feedback across CITARION, ensuring clear, helpful, and actionable communication.

---

## 🎯 Principles

### 1. Be Clear and Specific

```
❌ Bad: "An error occurred"
✅ Good: "Failed to place order: Insufficient balance for BTCUSDT"
```

### 2. Be Helpful

```
❌ Bad: "Invalid input"
✅ Good: "Quantity must be between 0.001 and 100 BTC"
```

### 3. Be Human

```
❌ Bad: "Error code: 0x8004005"
✅ Good: "We couldn't connect to Binance. Please check your internet connection."
```

### 4. Be Actionable

```
❌ Bad: "Trade failed"
✅ Good: "Trade failed because the market is closed. Try again when markets open at 9:00 AM UTC."
```

---

## 🎨 Error Message Types

### Toast Notifications

```tsx
// Success
<Toast type="success" title="Order Placed" description="Buy 0.001 BTCUSDT @ $67,000" />

// Warning
<Toast type="warning" title="High Volatility" description="BTCUSDT price changed 5% in last hour" />

// Error
<Toast type="error" title="Connection Lost" description="Reconnecting to Binance..." />

// Info
<Toast type="info" title="Tip" description="Use keyboard shortcut 'B' for quick buy" />
```

### Inline Validation

```tsx
// Form field error
<div className="form-field">
  <Input 
    value={quantity}
    error={quantityError}
  />
  {quantityError && (
    <span className="error-message">
      <AlertCircle className="icon" />
      {quantityError}
    </span>
  )}
</div>
```

### Modal Errors

```tsx
// Critical error requiring attention
<ErrorModal
  title="Exchange Connection Failed"
  message="Your Binance API key has expired or been revoked."
  actions={[
    { label: "Update API Key", onClick: openSettings },
    { label: "Dismiss", variant: "ghost" }
  ]}
/>
```

### Banner Alerts

```tsx
// System-wide alerts
<BannerAlert 
  type="warning"
  title="Scheduled Maintenance"
  message="Trading will be paused on March 20, 2026 from 2:00-4:00 AM UTC"
  dismissible
/>
```

---

## 📝 Error Categories

### Authentication Errors

| Code | Message | Action |
|------|---------|--------|
| `AUTH_001` | "Invalid email or password" | Check credentials |
| `AUTH_002` | "Account locked. Try again in 15 minutes" | Wait or reset |
| `AUTH_003` | "Session expired. Please log in again" | Re-login |
| `AUTH_004` | "2FA code required" | Enter 2FA |
| `AUTH_005` | "Invalid 2FA code" | Retry |

### Trading Errors

| Code | Message | Action |
|------|---------|--------|
| `TRADE_001` | "Insufficient balance. Available: {available} {currency}" | Reduce size |
| `TRADE_002` | "Order rejected: Position limit reached ({limit})" | Close positions |
| `TRADE_003` | "Price outside allowed range. Valid: {min} - {max}" | Adjust price |
| `TRADE_004` | "Market closed for {symbol}. Opens at {time}" | Wait |
| `TRADE_005` | "Leverage reduced due to risk limits. New max: {leverage}x" | Accept or reduce |
| `TRADE_006` | "Kill switch active. Trading disabled." | Contact support |
| `TRADE_007` | "Order size too small. Minimum: {minimum}" | Increase size |

### Exchange Errors

| Code | Message | Action |
|------|---------|--------|
| `EXCH_001` | "Exchange connection lost. Reconnecting..." | Auto-retry |
| `EXCH_002` | "API rate limit exceeded. Retrying in {seconds}s" | Auto-retry |
| `EXCH_003` | "Invalid API key. Please update in settings." | Update key |
| `EXCH_004` | "API permissions insufficient. Enable trading." | Fix permissions |
| `EXCH_005` | "Exchange maintenance. Estimated time: {duration}" | Wait |
| `EXCH_006` | "Order not found on exchange. It may have been filled." | Check history |

### Bot Errors

| Code | Message | Action |
|------|---------|--------|
| `BOT_001` | "Bot requires exchange connection" | Connect exchange |
| `BOT_002` | "Insufficient balance for bot strategy" | Add funds |
| `BOT_003` | "Bot stopped: Kill switch triggered" | Review risk |
| `BOT_004` | "Symbol not available on exchange" | Change symbol |
| `BOT_005` | "Bot configuration invalid: {field}" | Fix config |

---

## 🔔 Notification Timing

| Type | Duration | User Action |
|------|----------|-------------|
| Success | 3 seconds | Auto-dismiss |
| Info | 5 seconds | Auto-dismiss |
| Warning | 10 seconds | Manual dismiss |
| Error | Until dismissed | Manual dismiss |
| Critical | Until action | Requires action |

---

## 🎯 Error Recovery

### Automatic Retry

```tsx
// Auto-retry with exponential backoff
const retryConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  retryableErrors: ['NETWORK_ERROR', 'RATE_LIMIT', 'TIMEOUT']
};

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i < retryConfig.maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (!retryConfig.retryableErrors.includes(error.code)) {
        throw error;
      }
      
      const delay = Math.min(
        retryConfig.baseDelay * Math.pow(2, i),
        retryConfig.maxDelay
      );
      
      showToast({
        type: 'warning',
        title: 'Retrying...',
        description: `Attempt ${i + 1} of ${retryConfig.maxRetries}`
      });
      
      await sleep(delay);
    }
  }
  
  throw lastError;
}
```

### Fallback UI

```tsx
// Error boundary fallback
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-boundary">
      <AlertTriangle className="icon" />
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <Button onClick={resetErrorBoundary}>Try Again</Button>
      <Button variant="ghost" onClick={() => window.location.reload()}>
        Reload Page
      </Button>
    </div>
  );
}
```

---

## 🌐 Internationalization

### Error Message Format

```json
{
  "errors": {
    "INSUFFICIENT_BALANCE": {
      "en": "Insufficient balance. Available: {available} {currency}",
      "ru": "Недостаточный баланс. Доступно: {available} {currency}",
      "zh": "余额不足。可用：{available} {currency}"
    }
  }
}
```

### Usage

```tsx
const message = t('errors.INSUFFICIENT_BALANCE', {
  available: formatNumber(balance.available),
  currency: balance.currency
});
```

---

## ✅ Error Message Checklist

- [ ] Clear and specific about what happened
- [ ] Explains why it happened (when relevant)
- [ ] Provides actionable next steps
- [ ] Uses human-friendly language
- [ ] Includes relevant context (symbol, amount, etc.)
- [ ] Avoids technical jargon
- [ ] Appropriate severity level
- [ ] Consistent with other messages
- [ ] Localized for user's language
- [ ] Logged for debugging

---

## 📚 Related Documentation

- [MICRO_INTERACTIONS.md](MICRO_INTERACTIONS.md) - Feedback animations
- [USER_ONBOARDING_FLOW.md](USER_ONBOARDING_FLOW.md) - Onboarding experience
- [../development/ERROR_HANDLING.md](../development/ERROR_HANDLING.md) - Technical error handling

---

*Last updated: March 2026 | CITARION Documentation Team*
