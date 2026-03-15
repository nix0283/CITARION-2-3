# Why the {{close}} variable value in an alert description may not work

**URL:** https://www.tradingview.com/support/solutions/43000542963-why-the-close-variable-value-in-an-alert-description-may-not-work/

---

- [ Help Center ](/) - / - / [ Alerts settings ](/support/folders/43000547663-alerts-settings/) - / [ Why the {{close}} variable value in an alert description may not… ](/support/solutions/43000542963-why-the-close-variable-value-in-an-alert-description-may-not-work/) # Why the {{close}} variable value in an alert description may not work The value substitution feature, in regards to alertcondition(), only works for scripts that were written in Pine v4 or higher. If, when the alert is fired, the variables in the description are not replaced with values (i.e. it displays Close = {{close}} instead of Close = 45.1 ), the indicator with the alertcondition() is probably written on earlier versions of Pine and variable descriptions will not work for it. Here's how it works in Pine v4 and higher: And here's how it works in earlier Pine versions: This will happen even if you add the variable in the Message field in the Alert dialog (without editing the code itself). If you add the variable there and it isn’t replaced when the alert is fired, the indicator is most likely written in Pine v3 or lower. If the script is yours, you can use our Converter to [convert a v3 script to v4](https://www.tradingview.com/support/solutions/43000530720/). If this script is from the public library, you can contact its author and ask them to update the indicator to v4. Also read: - [TradingView social network](https://www.tradingview.com/support/solutions/43000761245-tradingview-social-network/) - [Introduction to TradingView alerts](https://www.tradingview.com/support/solutions/43000520149-introduction-to-tradingview-alerts/) - [Paper Trading — main functionality](https://www.tradingview.com/support/solutions/43000516466-paper-trading-main-functionality/) - [Master the Options Strategy Builder](https://www.tradingview.com/support/solutions/43000707214-master-the-options-strategy-builder/) - [Heatmaps: from global trends to details](https://www.tradingview.com/support/solutions/43000766446-tradingview-heatmaps-from-global-trends-to-details/) Previous Previous How to use a variable value in alert Next Next Alerts on alert() function Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43536463219/original/SCXSnuGFufgtfsA8xWGPY-EcOhVTE5hHTg.jpg?1737628647)

**Описание:** This TradingView interface displays the **Pine Editor** (for coding custom indicators/scripts) with a running alert. Here’s a breakdown:  

### Top Navigation Bar  
- **Stock Screener** (dropdown): Filters stocks by criteria.  
- **Pine Editor** (active tab): Where users write/edit Pine Script (TradingView’s programming language).  
- **Strategy Tester**: Backtests trading strategies.  
- **Replay Trading**: Simulates market conditions for practice.  


### Script Header  
- **~ Untitled script** (dropdown): Current script name (unsaved, indicated by `~`).  
- **Save** (blue link): Saves the script.  


### Code Editor (Line Numbers + Code)  
- **Line 1**: `//@version=6` (Pine Script version declaration).  
- **Line 2**: `indicator('My script')` (defines a custom indicator named “My script”).  
- **Line 3**: `alertcondition(close>0, message = 'Close={{close}}')` (creates an alert when the close price exceeds 0, with a dynamic message showing the close value).  
- **Line 4**: Empty (no code).  


### Alert Popup (Bottom-Right)  
- **Header**: `Alert on` + Bitcoin logo + `BTCUSD` (the symbol triggering the alert).  
- **Close Button**: `×` (dismisses the alert).  
- **Alert Details**: `Close=103841.85` (the current close price for BTCUSD).  
- **Action Link**: `Edit alert` (modifies the alert’s conditions).  
- **Timestamp**: `06:04:24` (when the alert triggered).  
- **Icon**: Clock (indicates an alert).  


### Purpose  
The interface lets users code, test, and trigger alerts for trading signals (here, a simple “close > 0” condition for BTCUSD). The alert popup confirms the condition was met, showing the symbol, price, and time.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43536463321/original/Qjyo0e1z0AsqqsX4xmjmjMsUG8DKPCrFsw.jpg?1737628671)

**Описание:** This TradingView image shows the **Pine Editor** interface with a script editor and an active alert notification. Here’s a detailed breakdown:  


### **Top Navigation Bar**  
- **Stock Screener** (dropdown menu): For filtering stocks based on criteria.  
- **Pine Editor** (active tab): The current section, highlighted in blue.  
- **Strategy Tester**: For backtesting trading strategies.  
- **Replay Trading**: For simulating historical market data.  


### **Script Editor Section**  
- **Untitled script** (dropdown menu): The current script name (editable).  
- **Save** (blue link): Saves the script.  
- **Line numbers (1–5)**: Left margin for code navigation.  
- **Code content**:  
  - Line 1: `//@version=3` (Pine Script version declaration).  
  - Line 2: `study('My script')` (defines the script as a study).  
  - Line 3: `alertcondition(close>0, message = 'Close={{close}}')` (creates an alert when the close price is > 0).  
  - Line 4: `plot(close)` (plots the closing price on the chart).  
  - Line 5: Empty (for additional code).  


### **Alert Notification (Bottom)**  
- **Alert on BTCUSD** (with Bitcoin icon): Indicates the alert is for the BTC/USD pair.  
- **Close={{close}}**: The alert message (displays the current close price).  
- **Edit alert** (blue link): Modifies the alert settings.  
- **06:05:47**: Timestamp of the alert.  
- **X button**: Closes the alert notification.  
- **Bell icon**: Visual indicator for the alert (left of the message).  


### **Purpose**  
The image depicts a Pine Script being edited (to create alerts/plot data) and an active alert triggered for BTCUSD, showing how TradingView integrates script editing with real-time notifications.


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

