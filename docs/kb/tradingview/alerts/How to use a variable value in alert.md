# How to use a variable value in alert

**URL:** https://www.tradingview.com/support/solutions/43000531021-how-to-use-a-variable-value-in-alert/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Alerts - / [ Alerts settings ](/support/folders/43000547663-alerts-settings/) - / [ How to use a variable value in alert ](/support/solutions/43000531021-how-to-use-a-variable-value-in-alert/) # How to use a variable value in alert You can use special placeholders to access variable values in alert’s message. For example, you can create an alert on NASDAQ:AAPL and type in a message box: {{exchange}}:{{ticker}}, price = {{close}}, volume = {{volume}} After the alert is triggered, you’ll get corresponding values: Here is a list of available placeholders: 1. {{ticker}} - ticker of the symbol used in alert (AAPL, BTCUSD, etc.). 2. {{exchange}} - exchange of the symbol used in alert (NASDAQ, NYSE, CME, etc). Note that for delayed symbols, the exchange will end with “_DL” or “_DLY.” For example, “NYMEX_DL.” 3. {{close}}, {{open}}, {{high}}, {{low}}, {{time}}, {{volume}} - corresponding values of the bar on which the alert has been triggered. Note that alerts on indicators, non-standard charts and drawings depends on a resolution, while simple price alerts (e.g., price crossing some value) are always calculated on 1-minute bars. {{time}} is in UTC, formatted as yyyy-MM-ddTHH:mm:ssZ. For example, 2019-08-27T09:56:00Z. Other values are fixed-point numbers with a decimal point separating the integral and fractional parts. For example, 1245.25. 4. {{timenow}} - current fire time of the alert, formatted in the same way as {{time}}. Return time to the nearest second, regardless of the resolution. 5. {{plot_0}}, {{plot_1}}, ... {{plot_19}} - corresponding output series of an indicator used in the alert. **Note that the plots are numbered from zero. The highest plot ID is 19 (you can access only 20 first output series).** Output series are the values of an indicator you can see on a chart. For example, the built-in volume indicator has two output series: Volume and Volume MA. You can create an alert on it and type in a message box something like this: Volume: {{plot_0}}, Volume average: {{plot_1}} 6. {{interval}} - returns the interval (i.e. timeframe/resolution) of the chart that the alert is created on. Note that, for technical reasons, in some cases, **this placeholder will return “1” instead of the timeframe on the chart.** Regular price-based alerts (with conditions such as “AAPL Crossing 120” or “AMZN Greater Than 3600”) are all based on the symbol’s last value, so the timeframe of the chart is not relevant for the alert. Because of that, all price-based alerts are actually calculated on the 1m timeframe and the placeholder will always return “1” accordingly. Additionally, Range charts are also calculated based on 1m data so the {{interval}} placeholder will always return “1” on any alert created on a Range chart. With alerts created on drawings and indicators, this placeholder will function as expected. 7. {{syminfo.currency}} - returns the currency code of the current symbol (“EUR”, “USD”, etc.). 8. {{syminfo.basecurrency}} - returns the base currency code of the current symbol if the symbol refers to a currency pair. Otherwise, it returns na. For example, it returns “EUR” when the symbol is “EURUSD”. Placeholders with the "strategy" prefix can only be used in [strategy alerts](https://www.tradingview.com/chart/?solution=43000481368): - {{strategy.position_size}} - returns the value of the same keyword in Pine, i.e., the size of the current position. - {{strategy.order.action}} - returns the string “buy” or “sell” for the executed order. - {{strategy.order.contracts}} - returns the number of contracts of the executed order. - {{strategy.order.price}} - returns the price at which the order was executed. - {{strategy.order.id}} - returns the ID of the executed order (the string used as the first parameter in one of the function calls generating orders: strategy.entry, strategy.exit or strategy.order). - {{strategy.order.comment}} - returns the comment of the executed order (the string used in the comment parameter in one of the function calls generating orders: strategy.entry, strategy.exit or strategy.order). If no comment is specified, then the value of strategy.order.id will be used. - {{strategy.order.alert_message}} - returns the value of the alert_message parameter which can be used in the strategy's Pine code when calling one of the functions used to place orders: strategy.entry, strategy.exit or strategy.order. This feature is only supported in Pine v4 and higher. - {{strategy.market_position}} - returns the current position of the strategy in string form: “long”, “flat”, or “short”. - {{strategy.market_position_size}} - returns the size of the current position as an absolute value, i.e. a non-negative number. - {{strategy.prev_market_position}} - returns the previous position of the strategy in string form: “long”, “flat”, or “short”. - {{strategy.prev_market_position_size}} - returns the size of the previous position as an absolute value, i.e. a non-negative number. After the alert is triggered, you’ll see the corresponding values: For plot functions from scripts written in Pine Script: - plot; - plotshape; - plotchar; - plotarrow; - plotbar; - plotcandle. in addition to using placeholders {{plot_0}}, {{plot_1}}, ... {{plot_19}}, it is possible to recognize them by name. To do this, use the placeholder {{plot("Name")}}, where Name is the name of the series. For example, for the plotarrow function: Pine Script® // @version= 6 indicator ( 'My script' ) plotarrow ( close , colorup = color.new ( color.teal , 40 ) , colordown = color.new ( color.orange , 40 ) , title = 'arrow' ) Add {{plot("arrow")}} to the notification text For the plotcandle and plotbar functions, access to a series by name is not supported since each function displays 4 series (open, high, low, and close). For each series, you can use a placeholder with the appropriate numbering. You can only use placeholders with series names in English for built-in indicators. For example, for the volume indicator: Volume: {{plot("Volume")}}, Volume average: {{plot("Volume MA")}} If several indicators are used in the alert, only the values of the first one will be substituted into the {{plot}} placeholders: For the example above, the values of the series from the “My script1” indicator will be substituted into the placeholders. To display the values of the “My script2” indicator, select it in the first drop-down menu. Placeholders can also be specified in the message argument of the alertcondition function.When creating an alert, the value of this argument is automatically pulled into the alert text input box. Pine Script® // @version= 6 indicator ( "alertcondition" , overlay = true ) alertcondition ( close &gt;= open , title = 'Alert' , message = '"price {{ticker}} = {{close}}"!' ) Please note that when creating an alert with a condition from the alertcondition function, replacing the value will work in scripts written on the fourth version (Pine v4) or higher. Values from triggered alerts can be used together with webhooks by sending variable values from a message to the desired addresses. Or by using external 3rd party apps like TradingView Alerts to MT4/MT5, which already utilizes dynamic values usage. Some syntax use-cases can be found in [this example script](https://www.tradingview.com/script/9MJO3AgE-TradingView-Alerts-to-MT4-MT5-dynamic-variables-NON-REPAINTING/). This opens up even more possibilities for those of you who use alerts. Previous Previous I'm unable to find an alert condition function that meets my needs Next Next Why the {{close}} variable value in an alert description may not work Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43536461234/original/_HiATI2DH0IELFBhq-cYKG2HBuLS759GPw.jpg?1737628145)

**Описание:** This TradingView interface is an **alert configuration panel** for customizing notification messages. Here’s a detailed breakdown:  

### 1. Alert Name Section  
- **Label**: “Alert name” (left-aligned text).  
- **Input Field**: A text box with the placeholder “+ Add a custom name” (allows users to name the alert for easy identification).  


### 2. Message Section  
- **Label**: “Message” (left-aligned text).  
- **Text Area**: A large, outlined box containing a template: `{{exchange}}:{{ticker}}, Price = {{close}}, Volume = {{volume}}`. This uses **placeholders** (e.g., `{{exchange}}`, `{{ticker}}`, `{{close}}`, `{{volume}}`) to dynamically insert real-time trading data (exchange, ticker symbol, closing price, volume) into the alert message.  


### 3. Placeholder Guidance  
- **Explanatory Text**: Below the text area, a note reads: *“You can use special placeholders such as {{close}}, {{time}}, {{plot_0}}, etc.”* (instructs users on available dynamic data fields).  
- **Help Icon**: A circular “?” icon (right of the text) likely opens a tooltip or help panel for more placeholder details.  


### Purpose  
This panel lets users define a **custom alert message** with dynamic trading data (e.g., price, volume) to receive personalized notifications when a trading condition is met. The “Alert name” field helps organize multiple alerts, while the message area uses placeholders to pull real-time data from the chart.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43536462035/original/hse_puHUtInvGGSnq6QsQTeDhVR24pzXyQ.png?1737628341)

**Описание:** This is a **TradingView alert notification** for the stock AAPL (Apple Inc.). Here’s a detailed breakdown of its elements:  

### 1. Header & Close Button  
- **“Alert on”**: Text label indicating the alert’s purpose.  
- **Apple logo + “AAPL”**: Identifies the asset (Apple stock) the alert is triggered for.  
- **“X” icon**: Closes the notification.  


### 2. Alert Details  
- **“BATS:AAPL”**: Exchange/identifier for the asset (BATS is the exchange).  
- **“Price = 219.9”**: Current price of AAPL at the time of the alert.  
- **“Volume = 34”**: Trading volume (number of shares) at the time of the alert.  


### 3. Action & Timestamp  
- **“Edit alert”**: Link/button to modify the alert’s settings (e.g., price/volume thresholds).  
- **“06:30:00”**: Timestamp of when the alert was triggered.  


### 4. Visual Icon  
- **Clock/alarm icon** (left): Indicates this is a time-sensitive alert (e.g., price/volume-based).  


### Purpose  
This notification informs the user that an alert for AAPL has been triggered, displaying real-time price/volume data and providing options to edit the alert or dismiss it. It’s a core UI element for tracking market events in TradingView.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43536462260/original/e81jRfvEb9diF0Rj4RpSn9DrsorbmyJkyA.png?1737628405)

**Описание:** This is a **TradingView alert notification popup** for the stock **AAPL (Apple Inc.)**. Here’s a detailed breakdown:  

### 1. Header & Symbol  
- **“Alert on”**: Text label indicating the purpose of the popup.  
- **AAPL**: The stock ticker, accompanied by Apple’s logo (black circle with white apple icon).  
- **“×” (Close button)**: Top-right corner, to dismiss the alert.  


### 2. Alert Details  
- **Volume metrics**:  
  - “Volume: 86305”: Current trading volume for AAPL.  
  - “Volume average: 37774.433333333334”: 30-day (or default) average volume, used to gauge if current volume is unusually high/low.  
- **“Edit alert” (blue link)**: Allows modifying the alert’s conditions (e.g., volume threshold, time frame).  


### 3. Visual & Timing Elements  
- **Alarm icon** (left): Visual cue for an alert.  
- **“06:34:52” (right)**: Timestamp showing when the alert triggered (likely time since trigger, or time of day).  


### Purpose  
This alert notifies the user that AAPL’s current volume (86,305) exceeds its average volume (≈37,774), signaling unusual trading activity (e.g., high interest, potential price movement). The popup lets users review details or adjust the alert.


