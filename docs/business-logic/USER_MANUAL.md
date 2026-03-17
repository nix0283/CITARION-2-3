# CITARION User Manual

**Version:** 1.0
**Last Updated:** March 2026
**Status:** Production Ready

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Dashboard Overview](#2-dashboard-overview)
3. [Account Management](#3-account-management)
4. [Exchange Configuration](#4-exchange-configuration)
5. [Trading Bots](#5-trading-bots)
6. [Manual Trading](#6-manual-trading)
7. [Signal Management](#7-signal-management)
8. [Analytics & Reports](#8-analytics--reports)
9. [Notifications](#9-notifications)
10. [Security Settings](#10-security-settings)

---

## 1. Getting Started

### 1.1 Account Registration

1. Navigate to https://citarion.io
2. Click "Sign Up" in the top right corner
3. Enter your email address and create a password
4. Verify your email address via the confirmation link
5. Complete your profile setup

### 1.2 First-Time Setup

After registration, complete these steps:

```
□ Connect your first exchange
□ Configure API keys
□ Set up 2FA for security
□ Configure notification preferences
□ Review and accept terms of service
```

### 1.3 Interface Overview

```
┌─────────────────────────────────────────────────────────────┐
│  Logo    Dashboard  Bots  Trades  Signals  Settings   Profile │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Balance    │  │   PnL       │  │   Positions │         │
│  │  $10,000    │  │  +$250.50   │  │     3       │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │                                                       │ │
│  │              Trading Chart / Activity                 │ │
│  │                                                       │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Dashboard Overview

### 2.1 Main Metrics

| Metric | Description |
|--------|-------------|
| Balance | Total account balance across all exchanges |
| Equity | Balance + Unrealized PnL |
| Unrealized PnL | Profit/loss from open positions |
| Realized PnL | Profit/loss from closed trades |
| Win Rate | Percentage of profitable trades |
| Drawdown | Maximum loss from peak equity |

### 2.2 Portfolio Overview

The portfolio section shows:
- All connected exchanges
- Balance per exchange
- Position distribution
- Asset allocation

### 2.3 Active Positions

```
Symbol     Side    Size      Entry     Current   PnL        Actions
─────────────────────────────────────────────────────────────────
BTCUSDT    LONG    0.5 BTC   $50,000   $52,000   +$1,000    [Close]
ETHUSDT    SHORT   5 ETH     $3,000    $2,900    +$500      [Close]
SOLUSDT    LONG    100 SOL   $100      $95       -$500      [Close]
```

---

## 3. Account Management

### 3.1 Profile Settings

Navigate to **Settings > Profile** to update:
- Display name
- Email address
- Time zone
- Language preference
- Theme (Light/Dark mode)

### 3.2 Trading Mode

CITARION supports two trading modes:

| Mode | Description | Risk Level |
|------|-------------|------------|
| **DEMO** | Paper trading with virtual funds | No risk |
| **REAL** | Live trading with real funds | Full risk |

**To switch modes:**
1. Go to **Settings > Account**
2. Select your preferred mode
3. Confirm the change

> ⚠️ **Warning**: Switching to REAL mode requires verified API keys with trading permissions.

### 3.3 Two-Factor Authentication

**Enable 2FA:**
1. Go to **Settings > Security**
2. Click "Enable 2FA"
3. Scan QR code with your authenticator app
4. Enter the verification code
5. Save backup codes securely

**Backup Codes:**
- Store in a secure location
- Each code can only be used once
- Generate new codes if compromised

---

## 4. Exchange Configuration

### 4.1 Adding an Exchange

1. Go to **Settings > Exchanges**
2. Click "Add Exchange"
3. Select exchange from dropdown
4. Enter API credentials:
   - API Key
   - API Secret
   - Passphrase (if required)
5. Select permissions:
   - ✅ Read account info
   - ✅ Execute trades
   - ❌ Withdraw funds (recommended disabled)
6. Click "Verify & Save"

### 4.2 Supported Exchanges

| Exchange | Spot | Futures | Testnet |
|----------|------|---------|---------|
| Binance | ✅ | ✅ | ✅ |
| Bybit | ✅ | ✅ | ✅ |
| OKX | ✅ | ✅ | ✅ |
| Bitget | ✅ | ✅ | ❌ |
| BingX | ✅ | ✅ | ❌ |
| KuCoin | ✅ | ✅ | ❌ |

### 4.3 API Key Security

**Best Practices:**
- Only enable necessary permissions
- Use IP whitelist restrictions
- Rotate keys every 90 days
- Never share API keys
- Use testnet for initial setup

**Encryption:**
All API keys are encrypted using AES-256-GCM before storage.

### 4.4 Connection Status

```
Exchange    Status      Last Sync    Balance
─────────────────────────────────────────────
Binance     🟢 Active   2 min ago    $5,000
Bybit       🟡 Issues   15 min ago   $3,000
OKX         🔴 Offline  1 hour ago   $2,000
```

---

## 5. Trading Bots

### 5.1 Bot Types

| Bot Type | Strategy | Best For |
|----------|----------|----------|
| **Grid Bot** | Buy low, sell high in range | Sideways markets |
| **DCA Bot** | Dollar-cost averaging | Accumulation |
| **BB Bot** | Bollinger Bands signals | Volatility trading |
| **Signal Bot** | Follow external signals | Signal followers |
| **Strategy Bot** | Custom strategies | Advanced users |

### 5.2 Creating a Grid Bot

1. Go to **Bots > Grid Bot**
2. Click "Create New Bot"
3. Configure settings:
   ```
   Symbol: BTCUSDT
   Direction: LONG
   Grid Type: Arithmetic
   Upper Price: $55,000
   Lower Price: $45,000
   Grid Count: 10
   Investment: $1,000
   Leverage: 10x
   ```
4. Review configuration
5. Click "Start Bot"

**Grid Bot Parameters:**

| Parameter | Description | Range |
|-----------|-------------|-------|
| Upper Price | Upper bound of grid | Current price + % |
| Lower Price | Lower bound of grid | Current price - % |
| Grid Count | Number of grid levels | 2-100 |
| Investment | Total capital | Min $10 |
| Leverage | Position leverage | 1-125x |

### 5.3 Creating a DCA Bot

1. Go to **Bots > DCA Bot**
2. Click "Create New Bot"
3. Configure settings:
   ```
   Symbol: BTCUSDT
   Direction: LONG
   Base Amount: $100
   DCA Levels: 5
   DCA Percent: 3%
   DCA Multiplier: 1.5x
   Take Profit: 5%
   ```
4. Click "Start Bot"

### 5.4 Signal Bot Configuration

1. Go to **Bots > Signal Bot**
2. Click "Create New Bot"
3. Configure signal sources:
   ```
   Signal Sources:
   □ TradingView Webhooks
   □ Telegram Channels
   □ Cornix Signals
   □ Manual Entry
   ```
4. Set entry/exit parameters:
   ```
   Entry Strategy: Evenly Divided
   TP Strategy: Three Targets
   Stop Loss: 5%
   Trailing Stop: Enabled (2%)
   ```
5. Configure position sizing:
   ```
   Amount per Trade: $100
   Max Open Trades: 3
   Risk per Trade: 2%
   ```

### 5.5 Bot Management

**Starting/Stopping:**
- Click the toggle switch on the bot card
- Confirm the action
- Bot will close all positions when stopped

**Editing:**
- Click the edit icon on the bot card
- Modify parameters
- Save changes
- Some changes require bot restart

**Monitoring:**
- Real-time PnL
- Active orders
- Grid levels
- Trade history

---

## 6. Manual Trading

### 6.1 Opening a Position

1. Go to **Trade > Manual**
2. Select trading pair
3. Choose order type:
   - **Market**: Execute immediately at current price
   - **Limit**: Execute at specified price
   - **Stop-Limit**: Execute when price reaches trigger

4. Set position parameters:
   ```
   Side: LONG / SHORT
   Amount: 0.001 BTC
   Leverage: 10x
   Stop Loss: $48,000
   Take Profit: $55,000
   ```

5. Review order summary
6. Click "Place Order"

### 6.2 Order Types

| Order Type | Description | Use Case |
|------------|-------------|----------|
| Market | Immediate execution | Quick entry/exit |
| Limit | Price-specific execution | Precise entries |
| Stop Market | Trigger + market order | Stop loss |
| Stop Limit | Trigger + limit order | Take profit |
| Trailing Stop | Dynamic stop loss | Lock profits |

### 6.3 Position Management

**Modify Position:**
- Add to position
- Reduce position
- Move stop loss
- Add take profit levels

**Close Position:**
- Market close (immediate)
- Limit close (target price)
- Partial close (percentage)

---

## 7. Signal Management

### 7.1 Signal Sources

| Source | Format | Setup Required |
|--------|--------|----------------|
| TradingView | Webhook | Configure alert |
| Telegram | Message | Add bot to channel |
| Cornix | API | Connect account |
| Manual | Form | None |

### 7.2 Signal Format

**Standard Signal Format:**
```
#BTCUSDT #LONG
Entry: 50000-51000
TP1: 52000
TP2: 53000
TP3: 54000
SL: 48000
Leverage: 10x
```

### 7.3 Signal Processing

1. Signal received → Parsed → Validated
2. Signal matched to active bot(s)
3. Position opened according to bot config
4. TP/SL orders placed
5. Position monitored and closed

### 7.4 Signal History

```
Date       Symbol    Direction   Status      PnL
─────────────────────────────────────────────────
Mar 15     BTCUSDT   LONG        Closed      +$150
Mar 14     ETHUSDT   SHORT       Closed      -$50
Mar 13     SOLUSDT   LONG        Active      +$25
```

---

## 8. Analytics & Reports

### 8.1 Performance Dashboard

**Key Metrics:**
- Total PnL (realized + unrealized)
- Win rate
- Profit factor
- Sharpe ratio
- Maximum drawdown
- Average trade duration

### 8.2 Trade Analytics

**Filters Available:**
- Date range
- Exchange
- Symbol
- Bot type
- Direction (Long/Short)

**Charts:**
- Equity curve
- PnL distribution
- Win/loss ratio
- Trade frequency

### 8.3 Export Reports

1. Go to **Analytics > Reports**
2. Select report type:
   - Trade history
   - PnL summary
   - Bot performance
   - Tax report
3. Set date range
4. Choose format: CSV, PDF, Excel
5. Click "Export"

---

## 9. Notifications

### 9.1 Notification Types

| Type | Description | Channels |
|------|-------------|----------|
| Trade Opened | New position opened | Telegram, Email, Push |
| Trade Closed | Position closed | Telegram, Email, Push |
| Stop Loss Hit | SL triggered | Telegram, Push |
| Take Profit Hit | TP reached | Telegram, Push |
| Bot Status | Bot started/stopped | Email, Push |
| Daily Summary | End of day report | Email |
| Weekly Report | Weekly performance | Email |
| Alert | Custom price alerts | Telegram, Push |

### 9.2 Telegram Setup

1. Go to **Settings > Notifications**
2. Find "Telegram" section
3. Click "Connect Telegram"
4. Open @CitarionBot in Telegram
5. Click "Start" and follow instructions
6. Return to CITARION and confirm connection

### 9.3 Email Notifications

Configure email preferences:
```
□ Trade notifications
□ Daily summary
□ Weekly report
□ Monthly statement
□ Security alerts
□ Marketing (optional)
```

### 9.4 Push Notifications

Enable in browser or mobile app:
1. Go to **Settings > Notifications**
2. Enable "Push Notifications"
3. Allow browser notifications
4. Test notification

---

## 10. Security Settings

### 10.1 Password Management

**Change Password:**
1. Go to **Settings > Security**
2. Click "Change Password"
3. Enter current password
4. Enter new password
5. Confirm new password
6. Click "Update Password"

**Password Requirements:**
- Minimum 12 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### 10.2 Session Management

View active sessions:
```
Device          Location    Last Active     Actions
────────────────────────────────────────────────────
Chrome/Windows  New York    5 min ago       [Revoke]
Safari/iPhone   New York    1 hour ago      [Revoke]
Firefox/Linux   Unknown     3 days ago      [Revoke]
```

### 10.3 Login History

```
Date        IP Address      Location    Status
───────────────────────────────────────────────
Mar 15      192.168.1.1    New York    Success
Mar 14      192.168.1.1    New York    Success
Mar 13      10.0.0.1       Unknown     Failed
```

### 10.4 API Key Management

**View API Keys:**
- Key name
- Created date
- Last used
- Permissions
- Status

**Regenerate API Key:**
1. Click "Regenerate" on the key
2. Confirm action
3. New key displayed once - save it!

### 10.5 Withdrawal Whitelist

Enable address whitelisting for withdrawals:
1. Go to **Settings > Security**
2. Enable "Withdrawal Whitelist"
3. Add approved addresses
4. Set 24-hour delay for new addresses

---

## Appendix A: Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `T` | Open trade modal |
| `B` | Open bots page |
| `P` | Open positions |
| `S` | Open settings |
| `?` | Show keyboard shortcuts |
| `Esc` | Close modal |

---

## Appendix B: Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Cannot connect exchange | Verify API keys and permissions |
| Order rejected | Check balance and position limits |
| Bot not executing | Review bot config and signal format |
| Notifications not working | Check notification settings |

### Support Channels

- 📧 Email: support@citarion.io
- 💬 Telegram: @CitarionSupport
- 📚 Docs: https://docs.citarion.io
- 🐛 Bugs: https://github.com/citarion/issues

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | March 2026 | CITARION Team | Initial release |

---

*This document is part of the CITARION Documentation Suite.*
