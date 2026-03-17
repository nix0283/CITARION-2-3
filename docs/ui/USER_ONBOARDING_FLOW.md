# User Onboarding Flow

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Overview

This document describes the user onboarding experience for CITARION, guiding new users from registration to their first successful trade.

---

## 🎯 Onboarding Goals

1. **Account Setup** - Create account and secure it
2. **Exchange Connection** - Connect at least one exchange
3. **First Trade** - Execute first trade (demo or live)
4. **Bot Discovery** - Explore available trading bots
5. **Risk Awareness** - Understand risk management features

---

## 🗺️ User Journey Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        USER ONBOARDING JOURNEY                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐   │
│  │ Landing │───▶│ Register│───▶│ Verify  │───▶│ Exchange│───▶│  First  │   │
│  │  Page   │    │         │    │  Email  │    │ Connect │    │  Trade  │   │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘   │
│       │              │              │              │              │         │
│       ▼              ▼              ▼              ▼              ▼         │
│   Marketing      Email/Pass     Confirm Email   API Keys      Demo/Live    │
│   Content        Social Auth    2FA Setup       Verification   Trading     │
│                                                                              │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐                                  │
│  │  Bot    │───▶│  Risk   │───▶│  Full   │                                  │
│  │Discovery│    │ Setup   │    │  Access │                                  │
│  └─────────┘    └─────────┘    └─────────┘                                  │
│       │              │              │                                        │
│       ▼              ▼              ▼                                        │
│   Grid/DCA       Kill Switch    All Features                                │
│   Vision/Orion   VaR Limits     Unlocked                                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📝 Step-by-Step Flow

### Step 1: Registration

```
Screen: Registration Page
┌────────────────────────────────────────┐
│           Welcome to CITARION          │
│                                        │
│  [Email Input]                         │
│  [Password Input]                      │
│  [Confirm Password]                    │
│                                        │
│  [Create Account]                      │
│                                        │
│  ─────── or continue with ───────      │
│                                        │
│  [Google] [GitHub]                     │
│                                        │
│  Already have account? [Sign In]       │
└────────────────────────────────────────┘
```

**Validation Rules:**
- Email: Valid format, not already registered
- Password: Min 8 chars, 1 uppercase, 1 number, 1 special

### Step 2: Email Verification

```
Screen: Check Your Email
┌────────────────────────────────────────┐
│         📧 Verify Your Email           │
│                                        │
│  We sent a verification link to:       │
│  user@example.com                      │
│                                        │
│  [Open Email App]                      │
│                                        │
│  Didn't receive? [Resend]              │
│                                        │
│  ─────────────────────────────────────│
│  Tip: Check your spam folder           │
└────────────────────────────────────────┘
```

### Step 3: 2FA Setup (Optional but Recommended)

```
Screen: Secure Your Account
┌────────────────────────────────────────┐
│      🔐 Two-Factor Authentication      │
│                                        │
│  [QR Code Image]                       │
│                                        │
│  Secret: ABCD-EFGH-IJKL-MNOP           │
│                                        │
│  [Verification Code Input]             │
│                                        │
│  [Skip for Now]  [Verify & Continue]   │
│                                        │
│  ⚠️ Recommended for trading security   │
└────────────────────────────────────────┘
```

### Step 4: Exchange Connection

```
Screen: Connect Exchange
┌────────────────────────────────────────┐
│       Connect Your Exchange            │
│                                        │
│  Select Exchange:                      │
│  ┌──────┐ ┌──────┐ ┌──────┐           │
│  │Binance│ │Bybit │ │ OKX  │           │
│  └──────┘ └──────┘ └──────┘           │
│                                        │
│  API Key:                              │
│  [────────────────────────]            │
│                                        │
│  API Secret:                           │
│  [────────────────────────]            │
│                                        │
│  [ ] Testnet Mode (Recommended)        │
│                                        │
│  [Connect Exchange]                    │
│                                        │
│  ⚠️ Your keys are encrypted locally    │
└────────────────────────────────────────┘
```

**Security Note:**
- API keys encrypted with AES-256-GCM
- Only trading permissions required (no withdrawal)
- Testnet mode available for safe testing

### Step 5: First Trade (Guided)

```
Screen: Your First Trade
┌────────────────────────────────────────┐
│      🎯 Let's Make Your First Trade    │
│                                        │
│  Mode: [Demo] [Live]                   │
│                                        │
│  Symbol: [BTCUSDT ▼]                   │
│  Current Price: $67,000.50             │
│                                        │
│  ┌─────────────┐ ┌─────────────┐       │
│  │    BUY     │ │    SELL     │       │
│  │   (Long)   │ │   (Short)   │       │
│  └─────────────┘ └─────────────┘       │
│                                        │
│  Quantity: [0.001]                     │
│  Position Value: $67.00                │
│                                        │
│  [Execute Trade]                       │
│                                        │
│  💡 Tip: Start small to learn          │
└────────────────────────────────────────┘
```

### Step 6: Bot Discovery

```
Screen: Explore Trading Bots
┌────────────────────────────────────────┐
│       🤖 Explore Trading Bots          │
│                                        │
│  ┌──────────┐ ┌──────────┐            │
│  │  Grid    │ │   DCA    │            │
│  │   Bot    │ │   Bot    │            │
│  │ Automated│ │ Average  │            │
│  │  Levels  │ │  Cost    │            │
│  └──────────┘ └──────────┘            │
│                                        │
│  ┌──────────┐ ┌──────────┐            │
│  │ Vision   │ │  Orion   │            │
│  │Forecasting│ │ Trend   │            │
│  │   Bot    │ │Detector  │            │
│  └──────────┘ └──────────┘            │
│                                        │
│  [Explore All Bots →]                  │
└────────────────────────────────────────┘
```

### Step 7: Risk Management Setup

```
Screen: Protect Your Portfolio
┌────────────────────────────────────────┐
│      🛡️ Risk Management Setup          │
│                                        │
│  Kill Switch:                          │
│  [ ] Enable automatic stop on drawdown │
│  Threshold: [15% ▼]                    │
│                                        │
│  Position Limits:                      │
│  Max Position Size: [10% of portfolio] │
│  Max Leverage: [10x]                   │
│                                        │
│  Daily Loss Limit:                     │
│  [ ] Enable                            │
│  Amount: [$500]                        │
│                                        │
│  [Save Settings]                       │
└────────────────────────────────────────┘
```

---

## 🎓 Onboarding Tips

### Tooltip System

```tsx
// Onboarding tooltip component
<OnboardingTooltip 
  step={1}
  totalSteps={5}
  title="Price Chart"
  description="Real-time price chart with multiple timeframes"
  position="right"
>
  <PriceChart />
</OnboardingTooltip>
```

### Progress Indicator

```tsx
// Progress bar at top of screen
<OnboardingProgress 
  currentStep={3}
  totalSteps={7}
  steps={['Register', 'Verify', 'Connect', 'Trade', 'Bots', 'Risk', 'Complete']}
/>
```

---

## 📊 Onboarding Metrics

### Key Performance Indicators

| Metric | Target | Description |
|--------|--------|-------------|
| **Completion Rate** | > 70% | Users completing all steps |
| **Time to First Trade** | < 10 min | Registration to first trade |
| **Exchange Connect Rate** | > 80% | Users connecting exchange |
| **Bot Activation** | > 30% | Users activating a bot |
| **2FA Adoption** | > 50% | Users enabling 2FA |

### Funnel Analysis

```
Registration ───────────────────── 100%
     │
     ▼
Email Verified ─────────────────── 85%
     │
     ▼
Exchange Connected ─────────────── 60%
     │
     ▼
First Trade ────────────────────── 45%
     │
     ▼
Bot Activated ──────────────────── 25%
     │
     ▼
Risk Configured ────────────────── 20%
```

---

## 🔄 Returning User Flow

```
┌────────────────────────────────────────┐
│           Welcome Back!                │
│                                        │
│  Last session: 2 hours ago             │
│                                        │
│  Portfolio: $1,234.56 (+2.5%)          │
│  Open Positions: 3                     │
│  Active Bots: 2                        │
│                                        │
│  [Continue Trading]                    │
│                                        │
│  Recent Activity:                      │
│  • Grid Bot: +$12.50 profit            │
│  • BTCUSDT position up 1.2%            │
└────────────────────────────────────────┘
```

---

## 📚 Related Documentation

- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - UI components
- [MOBILE_UX_GUIDE.md](MOBILE_UX_GUIDE.md) - Mobile experience
- [ACCESSIBILITY_GUIDE.md](ACCESSIBILITY_GUIDE.md) - Accessibility

---

*Last updated: March 2026 | CITARION Documentation Team*
