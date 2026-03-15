# I'd like to set my Take Profit and Stop Loss in dollar terms and as a percentage of my account balance

**URL:** https://www.tradingview.com/support/solutions/43000480940-i-d-like-to-set-my-take-profit-and-stop-loss-in-dollar-terms-and-as-a-percentage-of-my-account-balance/

---

- [ Help Center ](/) - / - / [ I'd like to set my Take Profit and Stop Loss in dollar terms and… ](/support/solutions/43000480940-i-d-like-to-set-my-take-profit-and-stop-loss-in-dollar-terms-and-as-a-percentage-of-my-account-balance/) # I'd like to set my Take Profit and Stop Loss in dollar terms and as a percentage of my account balance There are two special fields for this in the Take Profit / Stop Loss section. You can set the desired profit level in the account currency or as a percentage of the account balance. You can also do the same with the risk. For example, if you want to set a Take Profit order at such a level that your profit is $15, then you just need to enter $15 in the profit box so that the order price is automatically calculated. The $ Risk, % Risk fields are duplicated in Quantity and Stop Loss. Using these fields, you can specify the risk for automatic calculation of the amount, or for automatic calculation of the Stop Loss level of the order. You can't automatically calculate both the Quantity and Stop Loss levels at the same time. Previous Previous How do I switch my order panel mode? Next Next Why is my order placed with different parameters? Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43079467433/original/7LhCUEliL1luQY9gZzRLvH2dKmsLE4pfLw.png?1571769078)

**Описание:** This is a **TradingView order entry interface** for the EUR/USD currency pair (via FOREX.COM), focused on placing a **limit buy order**. Here’s a detailed breakdown of elements:  


### 1. **Header & Symbol**  
- Top-left: `EUR/USD, FOREX.COM` (instrument and broker).  
- Top-right: Refresh (↻), Settings (⚙️), and Close (×) icons.  


### 2. **Buy/Sell Prices**  
- Left (Sell): `1.09822` (bid price, for selling EUR/USD).  
- Right (Buy): `1.09838` (ask price, for buying EUR/USD).  
- Middle: `1.6` (spread, in pips/ticks).  


### 3. **Order Type Tabs**  
- `MARKET` (default, for immediate execution at current price).  
- `LIMIT` (selected, for executing at a specified price or better).  
- `STOP` (for stop-loss/stop-entry orders).  


### 4. **Order Price Section**  
- Label: `Order Price` (sets the limit order’s target price).  
- Input: `1.09835` (the limit price, with a dropdown for “Absolute” vs. “Ticks”).  
- Dropdown: `Ask - 3` (adjusts the price relative to the ask price, e.g., 3 ticks below ask).  


### 5. **Quantity Section**  
- Label: `Quantity` (sets position size).  
- Input: `1 000` (units of EUR/USD, with a calculator icon for quick adjustments).  
- `USD Risk`: `2.50` (dollar amount at risk, based on stop-loss).  
- `% Risk`: `0.00` (percentage of account at risk, if configured).  


### 6. **Take Profit & Stop Loss**  
- **Take Profit** (checked):  
  - `75.0` (pips from entry price).  
  - `1.10585` (target price, calculated as `1.09835 + 0.0075`).  
  - `7.50` (USD profit, from 1,000 units × 75 pips).  
  - `0.01` (% profit, relative to account size).  
- **Stop Loss** (checked):  
  - `25.0` (pips from entry price).  
  - `1.09385` (stop price, calculated as `1.09835 - 0.0045`).  
  - `2.50` (USD risk, from 1,000 units × 25 pips).  
  - `0.00` (% risk, relative to account size).  


### 7. **Time in Force**  
- Label: `Time in Force` (order duration).  
- Value: `GTC` (Good Till Cancel, keeps the order active until filled or canceled).  


### 8. **Action Button**  
- Blue button: `BUY 1 000 EUR/USD @ 1.09835 LMT` (submits the limit buy order with the configured parameters).  


### Purpose  
This interface allows traders to define a **limit buy order** for EUR/USD, specifying price, size, profit targets, stop-loss, and order duration. It calculates risk (USD/%), profit (USD/%), and pips to help manage positions.


**Описание:** This TradingView image displays a **limit order interface** for the EUR/USD currency pair on FOREX.COM. Here’s a detailed breakdown of all elements:  


### 1. **Header & Symbol**  
- **Symbol**: `EUR/USD, FOREX.COM` (top-left) identifies the trading instrument.  
- **Action Buttons**:  
  - `SELL` (left, gray): Sell the pair at the displayed price.  
  - `BUY` (right, blue): Buy the pair at the displayed price.  
  - Prices: `SELL 1.09822` (bid) and `BUY 1.09838` (ask), with a spread of `1.6` pips (middle).  
- **Icons**: Refresh (reload), settings (gear), and close (X) (top-right).  


### 2. **Order Type Tabs**  
- `MARKET`, `LIMIT` (selected, blue underline), `STOP`: Switch between order types. The interface is currently in **Limit Order** mode.  


### 3. **Order Price Section**  
- **Label**: `Order Price` (centered).  
- **Input Fields**:  
  - `1.09835` (left, “Absolute”): Manually set limit price.  
  - `Ask - 3` (right, “Ticks”): Price relative to the ask (e.g., 3 ticks below ask).  


### 4. **Quantity Section**  
- **Label**: `Quantity` (centered).  
- **Input Fields**:  
  - `1 000` (left, “Units”): Number of units to trade (1,000 EUR/USD).  
  - `2.50` (middle, “USD Risk”): Risk in USD (calculated based on stop loss).  
  - `0.00` (right, “% Risk”): Risk as a percentage of account balance.  
- **Calculator Icon**: Opens a tool to compute position size/risk.  


### 5. **Take Profit & Stop Loss**  
- **Checkboxes**: `Take Profit` (checked) and `Stop Loss` (checked) enable/disable these orders.  
- **Take Profit (Left)**:  
  - `75.0` (Pips): Distance from entry price (75 pips).  
  - `1.10585` (Price): Target price (entry + 75 pips).  
  - `7.50` (USD): Profit in USD (calculated as `Units × Pips × Pip Value`).  
  - `0.01` (%): Profit as a percentage of account balance.  
- **Stop Loss (Right)**:  
  - `25.0` (Pips): Distance from entry price (25 pips).  
  - `1.09385` (Price): Stop price (entry - 25 pips).  
  - `2.50` (USD): Risk in USD (matches the “USD Risk” field).  
  - `0.00` (%): Risk as a percentage of account balance.  


### 6. **Time in Force**  
- `Time in Force`: `GTC` (Good Till Cancelled) — order remains active until executed or cancelled.  


### 7. **Execute Button**  
- **Blue Button**: `BUY 1 000 EUR/USD @ 1.09835 LMT` — Submits the limit buy order for 1,000 units at the specified price.  


### Purpose  
This interface allows traders to configure a **limit buy order** for EUR/USD, specifying price, quantity, take profit, and stop loss. It calculates risk (USD/%), profit, and displays real-time pricing, enabling precise position management.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43079467717/original/KhntzplJaLcp5NEspligE6ags-EUg707wg.png?1571769149)

**Описание:** This is a **TradingView order entry interface** for the EUR/USD currency pair (via FOREX.COM), focused on placing a **limit order**. Here’s a detailed breakdown:  


### 1. **Top Bar & Instrument Info**  
- **Instrument**: `EUR/USD, FOREX.COM` (currency pair and broker).  
- **Icons**:  
  - *Refresh* (reload data), *Settings* (customize interface), *Close* (exit order screen).  


### 2. **Buy/Sell Prices**  
- **SELL**: Gray box with price `1.09823` (bid price, price to sell EUR/USD).  
- **BUY**: Blue box with price `1.09837` (ask price, price to buy EUR/USD).  
- **Spread**: `1.4` (pips between bid/ask, indicating liquidity).  


### 3. **Order Type Tabs**  
- **MARKET** (default, executes at current market price), **LIMIT** (selected, executes at a specified price), **STOP** (triggers at a stop price).  


### 4. **Order Price Section**  
- **Label**: `Order Price` (set the limit order’s execution price).  
- **Input Fields**:  
  - `1.09834` (absolute price for the limit order).  
  - `Ask - 3` (relative to the ask price, e.g., 3 pips below ask).  
- **Labels**: `Absolute` (direct price) / `Ticks` (relative to market price).  


### 5. **Quantity Section**  
- **Label**: `Quantity` (number of units to trade).  
- **Input Fields**:  
  - `1 000` (units of EUR/USD, e.g., 1,000 euros).  
  - `2.50` (USD risk, calculated based on stop loss).  
  - `0.00` (% risk, percentage of account risk).  
- **Labels**: `Units` / `USD Risk` / `% Risk`.  


### 6. **Risk Management (Take Profit & Stop Loss)**  
- **Take Profit** (checked, enabled):  
  - `150.0` (pips from entry price).  
  - `1.11334` (target price, calculated as `entry + 150 pips`).  
  - `15.00` (USD profit, based on 1,000 units).  
  - `0.02` (% profit, percentage of account value).  
- **Stop Loss** (checked, enabled):  
  - `25.0` (pips from entry price).  
  - `1.09584` (stop price, calculated as `entry - 25 pips`).  
  - `2.50` (USD risk, matches the “USD Risk” field).  
  - `0.00` (% risk, matches the “% Risk” field).  


### 7. **Time in Force**  
- `GTC` (Good Till Cancel, order remains active until executed or canceled).  


### 8. **Action Button**  
- **Blue Button**: `BUY 1 000 EUR/USD @ 1.09834 LMT` (confirms placing a limit buy order for 1,000 units at 1.09834).  


### Purpose  
This screen allows traders to **place a limit buy order** for EUR/USD, with customizable price, quantity, and risk management (take profit/stop loss) settings. The interface balances simplicity (pre-filled risk calculations) with control (manual price/quantity adjustments).


**Описание:** This is a **TradingView order entry interface** for the EUR/USD currency pair (via FOREX.COM), focused on placing a **limit order**. Here’s a detailed breakdown:  


### 1. **Header & Symbol**  
- Top-left: `EUR/USD, FOREX.COM` (instrument and broker).  
- Top-right: Refresh (↻), Settings (⚙️), and Close (×) icons.  


### 2. **Buy/Sell Prices**  
- **SELL** (left, light gray): Price = `1.09823` (bid price).  
- **BUY** (right, blue): Price = `1.09837` (ask price).  
- Middle: `1.4` (pip spread between bid/ask).  


### 3. **Order Type Tabs**  
- `MARKET` (default, gray), `LIMIT` (selected, blue underline), `STOP` (gray): Switch between order types.  


### 4. **Order Price Section**  
- Label: `Order Price` (defines the limit order’s execution price).  
- Input: `1.09834` (absolute price) with a dropdown.  
- Right: `Ask - 3` (ticks) with a dropdown (adjusts price relative to the ask).  
- Labels: `Absolute` (left) and `Ticks` (right) clarify input modes.  


### 5. **Quantity Section**  
- Label: `Quantity` (defines position size).  
- Input: `1 000` (units) with a calculator icon (for quick adjustments).  
- Right: `2.50` (USD Risk) and `0.00` (% Risk) — auto-calculates risk based on stop loss.  
- Labels: `Units`, `USD Risk`, `% Risk`.  


### 6. **Take Profit & Stop Loss**  
- **Take Profit** (left, checked):  
  - `150.0` (pips) → `1.11334` (price, calculated) → `15.00` (USD, auto-calculated) → `0.02` (% risk, auto-calculated).  
- **Stop Loss** (right, checked):  
  - `25.0` (pips) → `1.09584` (price, calculated) → `2.50` (USD, auto-calculated) → `0.00` (% risk, auto-calculated).  


### 7. **Time in Force**  
- Label: `Time in Force` (order duration).  
- Value: `GTC` (Good Till Canceled, default).  


### 8. **Action Button**  
- Blue button: `BUY 1 000 EUR/USD @ 1.09834 LMT` (confirms the limit buy order).  


### Purpose  
This interface lets traders configure a **limit buy order** for EUR/USD: set the price (`1.09834`), quantity (`1,000` units), take profit (`1.11334`), stop loss (`1.09584`), and duration (`GTC`), then execute the order. All risk metrics (USD/% risk) auto-update as inputs change.


![Image 3](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43079467769/original/0AkcUiAhjDiRpnhlbnT3Sb73JyqYJhOKzg.png?1571769175)

**Описание:** This is a **TradingView order entry interface** for the EUR/USD currency pair on FOREX.COM, focused on placing a **limit order**. Here’s a detailed breakdown:  


### 1. **Header & Instrument**  
- **Instrument**: `EUR/USD, FOREX.COM` (top-left) identifies the traded pair and broker.  
- **Action Buttons**:  
  - `SELL` (left, gray): Sell the pair at the displayed price.  
  - `BUY` (right, blue): Buy the pair at the displayed price.  
  - `1.6` (center): Spread (difference between buy/sell prices, in pips).  
- **Close/Settings**:  
  - `×` (top-right): Close the order panel.  
  - `⚙️` (top-right): Access settings.  


### 2. **Order Type Tabs**  
- `MARKET` (left, gray): Place a market order (executes at current price).  
- `LIMIT` (center, blue, underlined): Active tab (place a limit order at a specified price).  
- `STOP` (right, gray): Place a stop order (triggered at a price level).  


### 3. **Order Price Section**  
- **Label**: `Order Price` (centered).  
- **Price Input**: `1.09855` (left field, labeled `Absolute`): Manually set the limit order price.  
- **Price Type**: `Ask - 3` (right field, labeled `Ticks`): Price relative to the current ask price (3 ticks below ask).  


### 4. **Quantity Section**  
- **Label**: `Quantity` (centered).  
- **Units**: `1 000` (left field): Number of EUR/USD units to trade.  
- **Risk Metrics**:  
  - `2.50` (middle, labeled `USD Risk`): Total risk in USD (based on stop loss).  
  - `0.00` (right, labeled `% Risk`): Risk as a percentage of account balance (0% here).  


### 5. **Take Profit & Stop Loss**  
- **Take Profit** (left, checked):  
  - `150.0` (pips): Distance from entry price (6 pips, per the “Pips” label).  
  - `1.11355` (price): Target price for take profit.  
  - `15.00` (USD): Profit in USD.  
  - `0.02` (%): Profit as a percentage of account balance.  
- **Stop Loss** (right, checked):  
  - `25.0` (pips): Distance from entry price.  
  - `1.09605` (price): Stop loss price (triggers if price falls to this level).  
  - `2.50` (USD): Risk in USD (matches the “USD Risk” field).  
  - `0.00` (%): Risk as a percentage of account balance.  


### 6. **Time in Force**  
- `Time in Force`: `GTC` (Good ‘Til Canceled) — order remains active until executed or canceled.  


### 7. **Action Button**  
- **Blue Button**: `BUY 1 000 EUR/USD @ 1.09855 LMT` — Confirms the limit buy order with the specified parameters.  


### Purpose  
This interface allows traders to configure a **limit buy order** for EUR/USD, setting price, quantity, take profit, stop loss, and time in force. Blue arrows highlight risk/profit metrics (USD Risk, Stop Loss price) to visualize potential outcomes.


**Описание:** This TradingView order entry interface is for placing a **Limit Buy order** on the EUR/USD currency pair with FOREX.COM. Here’s a detailed breakdown:  


### **Top Bar**  
- **Symbol & Broker**: Displays “EUR/USD, FOREX.COM” (the trading instrument and broker).  
- **Action Buttons**:  
  - *Refresh icon* (reload data), *Settings icon* (customize preferences), *Close icon* (exit the order panel).  


### **Buy/Sell Prices**  
- **SELL**: Gray box showing the *bid price* (1.09842) – price to sell EUR/USD.  
- **BUY**: Blue box showing the *ask price* (1.09858) – price to buy EUR/USD.  
- **Spread**: “1.6” (pips/ticks between bid and ask).  


### **Order Type Tabs**  
- **MARKET**: Execute at current market price.  
- **LIMIT** (selected, blue underline): Execute at a *specified price* (or better).  
- **STOP**: Execute if price reaches a *stop level* (for stop-loss/stop-entry orders).  


### **Order Price Section**  
- **Input Field**: “1.09855” (the limit price to buy at).  
- **Dropdowns**:  
  - *Absolute*: Price is a fixed value.  
  - *Ticks*: Price is offset from the ask price (“Ask - 3” = 3 ticks below the ask).  


### **Quantity Section**  
- **Units**: “1 000” (number of EUR/USD units to trade).  
- **USD Risk**: “2.50” (dollar amount at risk per trade, calculated from stop-loss distance).  
- **% Risk**: “0.00” (percentage of account at risk, not set here).  


### **Take Profit & Stop Loss**  
Both are enabled (checked boxes):  
- **Take Profit**:  
  - *Pips*: “6” (distance from entry in pips).  
  - *Price*: “1.11355” (target price to take profit).  
  - *USD*: “15.00” (profit in dollars, based on 6 pips and 1,000 units).  
  - *%*: “0.02” (profit as a percentage of account).  
- **Stop Loss**:  
  - *Pips*: “25.0” (distance from entry in pips).  
  - *Price*: “1.09605” (price to exit if loss occurs).  
  - *USD*: “2.50” (loss in dollars, matches the “USD Risk” field).  
  - *%*: “0.00” (loss as a percentage of account, not set).  


### **Time in Force**  
- “GTC” (Good Till Cancel): Order remains active until executed or manually canceled.  


### **Submit Button**  
- Blue button: “BUY 1 000 EUR/USD @ 1.09855 LMT” – confirms the limit buy order with the specified parameters.  


### Key Purpose  
This interface allows traders to place a **limit buy order** with defined risk (stop loss) and reward (take profit) parameters, controlling position size, price, and order duration.


