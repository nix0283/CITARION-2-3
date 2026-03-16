# I see a "Non-tradable symbol" message when trying to trade

**URL:** https://www.tradingview.com/support/solutions/43000479294-i-see-a-non-tradable-symbol-message-when-trying-to-trade/

---

- [ Help Center ](/) - / - / [ I see a "Non-tradable symbol" message when trying to trade ](/support/solutions/43000479294-i-see-a-non-tradable-symbol-message-when-trying-to-trade/) # I see a "Non-tradable symbol" message when trying to trade The symbols list in TradingView may contain non-tradable symbols that should be ignored. When you try to trade on non-tradable symbols, you will notice the following message: Most symbols available on v20 sub-accounts in OANDA apps are also available in TradingView. Note: - OANDA Corporation clients can only trade on forex instruments. Spot crypto is not available for trading on TradingView. - OANDA Global Markets clients can only trade on symbols that have the .ONE suffix. - OANDA TMS Brokers clients can only trade on symbols that have the .OTMS suffix. For more details about TradingView for OANDA clients, visit OANDA [Help Center](https://help.oanda.com/) and type TradingView user guide in the search field. Previous Previous I receive the error “You have 2FA enabled and log in from a new machine” on NinjaTrader Next Next How do I place a Trailing Stop order? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43531385448/original/KNKDNPug5itqXQihHpNxfiKBRfdvNkIV6A.png?1735050961)

**Описание:** This is a **modal dialog** from TradingView displaying an error message. Here’s a breakdown of its elements:  

- **Top-right “X” icon**: Closes the dialog.  
- **Icon (left)**: A simple line-drawn laptop with “x x” eyes (visual cue for an error/non-tradable symbol).  
- **Title**: “Non-tradable symbol” (bold, prominent text indicating the issue).  
- **Message**: “You can’t trade the symbol OANDA:BTCUSD at TradingView via OANDA.” (Explains the specific error: the BTCUSD symbol from OANDA is not tradable through TradingView’s OANDA integration).  
- **“Ok” button (bottom-right)**: Dismisses the dialog.  


The dialog’s purpose is to inform the user that the selected symbol (BTCUSD via OANDA) cannot be traded, likely due to account permissions, symbol availability, or integration limitations.


**Описание:** This is a **modal dialog** from TradingView displaying an error message about a non-tradable symbol. Here’s a breakdown of its elements:  

### 1. Header & Close Button  
- **Top-right corner**: A black “×” icon (close button) to dismiss the dialog.  

### 2. Icon & Title  
- **Left**: A simple line-drawn icon of a computer monitor with a sad face (two “×” eyes, a straight line for a mouth) to visually signal an error.  
- **Title**: Bold text “Non-tradable symbol” (clearly states the issue).  

### 3. Error Message  
- **Body text**: “You can’t trade the symbol OANDA:BTCUSD at TradingView via OANDA.”  
  - Specifies the problematic symbol (`OANDA:BTCUSD`) and the reason (inability to trade via the OANDA integration).  

### 4. Action Button  
- **Bottom-right**: A dark gray (near-black) rounded rectangle button labeled “Ok” (to acknowledge the message and close the dialog).  


### Purpose  
This dialog alerts the user that the symbol `OANDA:BTCUSD` is not available for trading through TradingView’s OANDA connection. The “Ok” button allows the user to dismiss the notification and return to the main interface. The design is minimal, focusing on clarity and quick resolution of the error.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43531385861/original/JNN81-8QIjwqjfiiNro_VrnR8f7OfGsWeg.png?1735051137)

**Описание:** This is a **TradingView Market Search interface** for finding financial instruments. Here’s a detailed breakdown:  


### 1. Header & Navigation  
- **Title**: “Market Search” (top-left) identifies the page.  
- **Close Button**: “X” (top-right) closes the search modal.  


### 2. Search Bar  
- **Search Input**: Contains “EURUSD” (with a magnifying glass icon), used to type/enter instrument names.  
- **Math Operators**: Buttons (`÷`, `−`, `+`, `×`, `^`, `1/`) for quick calculations (e.g., converting units or performing arithmetic).  


### 3. Category Tabs  
A row of tabs to filter instruments by type:  
- `All` (default), `Stocks`, `Funds`, `Futures`, `Forex` (**selected**, highlighted in dark blue), `Crypto`, `Indices`, `Bonds`, `Economy`, `Options`.  
- `OANDA` (dark blue, with a checkmark) indicates the data source is active.  


### 4. Source Filter  
- “All sources” (with a dropdown arrow) lets users filter results by data provider (e.g., OANDA, other brokers).  


### 5. Search Results List  
Displays matching instruments, each with:  
- **Icon**: Flag (e.g., EU flag for EUR, US flag for USD) + currency symbol.  
- **Symbol**: E.g., `EURUSD`, `EURUSD.SML.ONE`, `EURSGD`.  
- **Description**: E.g., `EUR/USD`, `EURO VS US DOLLAR`, `EUR/SGD`.  
- **Provider**: “OANDA” (with a checkmark icon) confirms the data source.  

- **Highlighted Result**: `EURUSD.SML.ONE` (blue border) is currently selected, showing “EURO VS US DOLLAR”.  


### Purpose  
This interface helps traders quickly find and select financial instruments (like forex pairs) by searching, filtering by category (e.g., Forex), and verifying data sources (e.g., OANDA). The selected result (`EURUSD.SML.ONE`) is ready to be loaded into a chart or trading tool.


**Описание:** This is a **TradingView \


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43531386033/original/WwhROqOLJijv0S9YnpeNcyK3-8mQS3IXJw.png?1735051193)

**Описание:** This is a **TradingView Symbol Search interface** for finding financial instruments. Here’s a detailed breakdown:  

### Header & Search Bar  
- **Title**: “Symbol Search” (top-left) with a close button (×, top-right) to exit the search.  
- **Search Input**: A magnifying glass icon precedes the text “EURUSD” (current search query). To the right: mathematical operator buttons (÷, −, +, ×, ^) and a “1/” indicator (likely for pagination).  


### Category Tabs  
Below the search bar, horizontal tabs filter results by asset class:  
- `All` (default), `Stocks`, `Funds`, `Futures`, `Forex` (selected, dark background), `Crypto`, `Indices`, `Bonds`, `Economy`, `Options`.  
- A dark button labeled `OANDA` (data provider) is also visible.  


### Source Filter  
- “All sources” (dropdown) lets users filter results by data provider (e.g., OANDA, as shown in results).  


### Search Results List  
Results display instrument details (left to right):  
1. **EURUSD**:  
   - Flag icons (EU + US) + “EURUSD” text.  
   - Description: “EUR/USD”.  
   - Provider: “OANDA” (with a verification checkmark).  

2. **EURUSD.PRO.OTMS** (highlighted with a blue border, indicating selection):  
   - Flag icons (EU + US) + “EURUSD.PRO.OTMS” text.  
   - Description: “EUR/USD (OANDA EU CLIENTS)” (specific to OANDA’s EU clients).  
   - Provider: “OANDA” (with verification).  

3. **EURSGD**:  
   - Flag icons (EU + Singapore) + “EURSGD” text.  
   - Description: “EUR/SGD”.  
   - Provider: “OANDA” (with verification).  


### Purpose  
This interface helps traders find and select financial instruments (e.g., forex pairs) to analyze or trade, with filters for asset class and data source. The highlighted “EURUSD.PRO.OTMS” suggests a specific OANDA-provided version of the EUR/USD pair.


**Описание:** This is a **TradingView \


