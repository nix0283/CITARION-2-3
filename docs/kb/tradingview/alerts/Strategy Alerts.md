# Strategy Alerts

**URL:** https://www.tradingview.com/support/solutions/43000481368-strategy-alerts/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Alerts - / [ Alerts settings ](/support/folders/43000547663-alerts-settings/) - / [ Strategy Alerts ](/support/solutions/43000481368-strategy-alerts/) # Strategy Alerts How do I create strategy alerts? To create a strategy alert, you can: - Use the “Add Alert” button in the “Strategy Tester” drop-down menu: - Use the strategy's drop-down menu: - Select your strategy from the Create Alert dialog: How do strategy alerts work? When an alert is created for a strategy, a copy of the strategy is created on our servers. This copy then runs independently from the chart's strategy in your browser, and changes to your chart's strategy will have no effect on the operation of its copy running on our servers. For any change to your chart strategy's settings to be reflected in the alert's behavior, you will need to delete the previous alert and create a new one. How does the strategy run on the servers? After calculating on history, the strategy moves to realtime calculations. When an order placed by the strategy is executed by the broker emulator, an alert is triggered. Notifications are sent each time an order is executed, until the alert reaches its expiration date. Notifications are not sent for orders on historical bars. Alerts are only triggered for orders executed in realtime. More than one notification can be issued in the same bar, but as mentioned above, the alert will be stopped if it triggers more than 15 times in 3 minutes. You can use placeholders to build your alert's notification message. They will be replaced by their corresponding value when the alert triggers. A placeholder is defined by using one of the following keywords surrounded by double curly brackets, e.g., {{strategy.position_size}} : - strategy.position_size — returns the value of the same keyword in Pine, i.e., the size of the current position. - strategy.order.action — returns the string “buy” or “sell” for the executed order. - strategy.order.contracts — returns the number of contracts of the executed order. - strategy.order.price — returns the price at which the order was executed. - strategy.order.id — returns the ID of the executed order (the string used as the first parameter in one of the function calls generating orders: strategy.entry, strategy.exit or strategy.order). - strategy.order.comment — returns the comment of the executed order (the string used in the comment parameter in one of the function calls generating orders: strategy.entry, strategy.exit or strategy.order). If no comment is specified, then the value of strategy.order.id will be used. - strategy.order.alert_message — returns the value of the alert_message parameter which can be used in the strategy's Pine code when calling one of the functions used to place orders: strategy.entry, strategy.exit or strategy.order. This feature is only supported in Pine v4 and higher. - strategy.market_position — returns the current position of the strategy in string form: “long”, “flat”, or “short”. - strategy.market_position_size — returns the size of the current position as an absolute value, i.e. a non-negative number. - strategy.prev_market_position — returns the previous position of the strategy in string form: “long”, “flat”, or “short”. - strategy.prev_market_position_size — returns the size of the previous position as an absolute value, i.e. a non-negative number. You can find more information on placeholders [here](https://www.tradingview.com/chart/?solution=43000531021). Previous Previous Differences between alert frequencies Next Next I'm unable to find an alert condition function that meets my needs Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43587954743/original/t20SUJrZkOOPeg__8Bh8hqbGr3VrH4f_8Q.png?1761300010)

**Описание:** The image shows a **TradingView interface** focused on a **Bollinger Bands Strategy report**, with a dropdown menu open. Here’s a detailed breakdown:  


### 1. Top Navigation Tabs  
- **Pine Editor**: For writing/editing custom trading scripts (Pine Script).  
- **Strategy Tester** (active tab): For backtesting trading strategies.  
- **Trading Panel**: For live trading or order management.  


### 2. Report Header  
- **“Bollinger Bands Strategy report”**: The title of the strategy being analyzed. A **caret (^)** next to it allows collapsing/expanding the report.  


### 3. Open Dropdown Menu (with icons and labels)  
The menu contains 5 options, each with a descriptive label and shortcut (where applicable):  

- **Bar magnifier**:  
  - Icon: Magnifying glass over a bar chart.  
  - Toggle switch (gray = off): Enables/disables bar magnification for detailed price analysis.  
  - “?” icon: Opens a tooltip explaining the feature.  

- **Add alert…**:  
  - Icon: Clock + plus sign.  
  - Shortcut: `⌃ A` (Ctrl + A).  
  - Purpose: Set price/volume alerts for the strategy.  

- **Settings…**:  
  - Icon: Gear (settings).  
  - Shortcut: `⌘ P` (Cmd + P on Mac, Ctrl + P on Windows).  
  - Purpose: Configure strategy parameters (e.g., Bollinger Bands settings, backtest rules).  

- **Download data as XLSX**:  
  - Icon: Download arrow.  
  - Purpose: Export strategy data (trades, performance) to an Excel file.  

- **Open strategy…**:  
  - Icon: Folder.  
  - Shortcut: `⌘ O` (Cmd + O on Mac, Ctrl + O on Windows).  
  - Purpose: Load a saved strategy file for editing/backtesting.  


### 4. Background Context  
- Partially visible text: “analysis” (right of the menu) and “Max e 28,57” (likely a performance metric, e.g., maximum equity).  
- A blue line chart (bottom right) suggests price data (e.g., Bollinger Bands overlay) is displayed, though the chart itself is not the focus here.  


This interface is part of TradingView’s **Strategy Tester**, used to analyze, backtest, and optimize the Bollinger Bands trading strategy. The dropdown menu provides quick access to key actions (alerts, settings, data export, strategy management) for the report.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43587965493/original/P3WQ1CUIuoDLoI96h3CJXo99u9MPX9NDkg.png?1761303766)

**Описание:** This TradingView image displays a **BTCUSDT (Bitcoin/TetherUS) 15-minute candlestick chart** from Binance. Here’s a detailed breakdown:  


### **Header & Symbol Info**  
- **Symbol**: `BTCUSDT · Bitcoin / TetherUS · 15 · Binance` (15 = 15-minute timeframe, Binance = exchange).  
- **Status Icons**: Red square (likely “offline” or “not trading”) + green circle (likely “live” or “trading”).  


### **Price & Order Panel**  
- **Sell Price**: Red box with `111,181.24` (current sell price) + `SELL` label.  
- **Buy Price**: Blue box with `111,181.25` (current buy price) + `BUY` label.  
- **Spread**: `0.01` (difference between buy/sell prices).  
- **Volume**: `Vol · BTC 30` (30 BTC traded in the last period).  


### **Indicator & Menu**  
- **Active Indicator**: `Bollinger Bands Strategy 20 2` (a technical indicator with parameters 20-period SMA, 2 standard deviations).  
- **Indicator Controls**:  
  - Eye icon: Toggle indicator visibility.  
  - Gear icon: Edit indicator settings.  
  - Braces `{}`: Edit indicator code (for custom scripts).  
  - Trash icon: Delete the indicator.  
  - Three dots: More options (e.g., share, duplicate).  


### **Dropdown Menu (Expanded)**  
- **Alert Option**: `Add alert on Bollinger Bands Strategy (20, 2)...` (sets price/condition-based alerts for the indicator).  
- **Favorite Option**: `Add this indicator to favorites` (saves the indicator for quick access).  


### **Chart Area**  
- **Candlesticks**: Green/red vertical bars (green = price closed higher than open; red = closed lower).  
- **Grid**: Light gray lines for price/time reference.  
- **Vertical Dashed Line**: Likely a “now” marker (current time on the chart).  


### **Purpose**  
This interface is for **cryptocurrency trading analysis**: viewing real-time prices, placing buy/sell orders, and analyzing price action with the Bollinger Bands indicator (to identify volatility/trend reversals). The dropdown menu enables customizing alerts or saving the indicator for future use.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43587965424/original/qIBbmP55sXiLTFMHPXbjQDnH_8mC0UCV2w.png?1761303738)

**Описание:** This is a **TradingView \


