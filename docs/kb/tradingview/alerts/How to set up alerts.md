# How to set up alerts

**URL:** https://www.tradingview.com/support/solutions/43000595315-how-to-set-up-alerts/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Alerts - / [ Alerts settings ](/support/folders/43000547663-alerts-settings/) - / [ How to set up alerts ](/support/solutions/43000595315-how-to-set-up-alerts/) # How to set up alerts Alerts can be created on data series, indicator plots, strategy orders and drawing objects. Alerts on data series are independent of the time intervals, while alerts for studies, strategies and drawings do depend on the interval because it’s taken into account when calculating indicators. **NOTE!** If the indicator parameter is changed after the alert is created, then the alert will be triggered using the old settings. There are several ways to set an alert: 1. The button on the top toolbar: 2. The button in the alert manager window: 3. From the right-click menu: 4. The button on the drawing panel: 5. The Plus button next to the current price on the price scale: 6. By hotkeys: ALT + A (Windows) or ⌥ + A (Mac). Alert functions When you create an alert, the following settings are available: - [Trigger Condition](https://www.tradingview.com/?solution=43000520149), which determines when the alert appears. - [Frequency](https://www.tradingview.com/?solution=43000474415) — you can set whether an alert will be triggered only once or multiple times. - Timer, which will automatically stop the alert. An alert will be automatically turned off when the Timer expiration setting is reached. - Alert name, which will be shown in the alerts manager to make it easy to identify alerts. - A message that will be shown when the alert is triggered. You can use special placeholders to access [variable values](https://www.tradingview.com/?solution=43000531021) in alert’s message. Alert actions Use the following options to be notified when your alerts are triggered: - Notify on App — in order to get notified with an alert on your phone, you first must download the latest TradingView app from the [AppStore ](https://itunes.apple.com/us/app/tradingview-trading-community-charts-and-quotes/id1205990992)or [Google Play](https://play.google.com/store/apps/details?id=com.tradingview.tradingviewapp). - Show Pop-up — a pop-up message will appear once an alert is triggered. If this option is enabled, a pop-up message will appear, even if you are browsing in another tab (for this feature to work properly, please allow TradingView to show desktop notifications). - Send Email — an email will be sent to you when an alert is triggered. We will use the email address in your TradingView profile. - Webhook URL — [webhooks ](https://www.tradingview.com/?solution=43000529348)allow you to send a POST request to a certain URL every time the alert is triggered. - Play Sound — once an alert is triggered, you will hear a sound. - Send plain text — use this option to receive notifications to an [alternative email](https://www.tradingview.com/settings/#alerts-delivery). Previous Previous Learn how to configure alerts Next Next Manage alerts Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43587782548/original/1tb-RIfn0wpai7ysNRvi6IJbeAMG7bGezQ.png?1761226108)

**Описание:** This image shows a section of the TradingView charting platform's top toolbar. From left to right, the UI elements are:  

1. **Candlestick/Bar Toggle Icon** (vertical lines with horizontal ticks): Switches between candlestick and bar chart types.  
2. **Indicators Dropdown** (chart icon + \


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43587781648/original/rhmSozSvlr_6Xgft718TnXHzxp4WMwZSpQ.png?1761225907)

**Описание:** This TradingView image displays a **mobile app interface** focused on **alerts management** for the EUR/USD currency pair. Here’s a detailed breakdown:  


### 1. Top Navigation Bar  
- **Tabs**: Two tabs at the top:  
  - *“Alerts”* (selected, highlighted with a blue underline) – Indicates the current view is for managing trading alerts.  
  - *“Log”* (unselected) – Likely shows a history of past alerts/notifications.  


### 2. Action Bar (Below Tabs)  
- **“+” Button**: A plus icon (left) – Used to **create a new alert** (e.g., set a price target, technical indicator trigger).  
- **Back Arrow**: A blue left arrow – Navigates to the previous screen (e.g., the main TradingView dashboard).  
- **Search Icon**: Magnifying glass – Searches for existing alerts or symbols.  
- **Filter/Sort Icon**: Downward arrow with horizontal lines – Filters or sorts alerts (e.g., by status, symbol, or time).  
- **More Options**: Three dots (right) – Opens additional menu options (e.g., settings, help).  


### 3. Alert Details Section  
- **Alert Title**: *“EURUSD Crossing 1.089”* – Describes the alert’s condition: the EUR/USD exchange rate crossing the price level 1.089.  
- **Symbol & Status**:  
  - *“EURUSD”* (with a flag icon, left) – The trading instrument (Euro vs. US Dollar).  
  - *“Active”* (green text, right) – Indicates the alert is currently enabled and monitoring the market.  


### Purpose of the Interface  
This screen is for **managing trading alerts** in TradingView. Users can:  
- View active alerts (like the EURUSD price-crossing alert shown).  
- Create new alerts (via the “+” button).  
- Navigate between “Alerts” (current view) and “Log” (alert history).  
- Search, filter, or access more options for alerts.  


The design is minimalistic, prioritizing clarity for quick access to alert management.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43587777710/original/vo8_iCUcFdQkoT1WcQO6wsqgei8d08-AnQ.png?1761224955)

**Описание:** This image shows a **context menu** from the TradingView platform, triggered by interacting with a price point on a chart (likely for BTCUSD). Here’s a detailed breakdown of its elements:  


### 1. Top Section: Price & Basic Actions  
- **“Copy price 101,374.74”**: Copies the current price (101,374.74) to the clipboard.  
- **“Paste”**: Pastes content from the clipboard (e.g., a price) into a text field.  


### 2. Alert/Order Options (Core Trading Actions)  
- **“Add alert on BTCUSD at 101,374.74…”** (highlighted with a blue border):  
  - Icon: Clock + plus sign (alert symbol).  
  - Purpose: Sets a price alert for BTCUSD at 101,374.74 (notifies when price hits this level).  
- **“Buy 1 BTCUSD @ 101,374.74 limit”**:  
  - Icon: Upward arrow (buy).  
  - Purpose: Places a *limit buy order* (buys 1 BTCUSD when price reaches 101,374.74 or lower).  
- **“Sell 1 BTCUSD @ 101,374.74 stop”**:  
  - Icon: Downward arrow (sell).  
  - Purpose: Places a *stop sell order* (sells 1 BTCUSD if price drops to 101,374.74 or lower).  
- **“Add order on BTCUSD at 101,374.74…”**:  
  - Icon: Chart + plus sign (order symbol).  
  - Purpose: Opens a menu to place a custom order (e.g., market, stop-loss, take-profit) at this price.  


### 3. Chart/View Settings  
- **“Lock vertical cursor line by time”**:  
  - Purpose: Freezes the vertical cursor (time marker) on the chart to analyze price at a specific moment.  
- **“Table view”**:  
  - Purpose: Switches the chart to a table format (e.g., for detailed price data).  
- **“Object Tree…”**:  
  - Purpose: Manages technical analysis objects (e.g., trendlines, indicators) on the chart.  
- **“Chart template”** (with arrow):  
  - Purpose: Accesses saved chart templates (e.g., preconfigured indicators, layouts).  


### 4. Bottom: System Settings  
- **“Settings…”**:  
  - Icon: Gear (settings symbol).  
  - Purpose: Opens TradingView’s global settings (e.g., account, chart preferences).  


### Key Context  
This menu is context-sensitive: it appears when clicking a price on a BTCUSD chart, enabling quick actions (alerts, orders, view adjustments) tied to that specific price level. The highlighted “Add alert” option suggests the user is prioritizing price notifications.


