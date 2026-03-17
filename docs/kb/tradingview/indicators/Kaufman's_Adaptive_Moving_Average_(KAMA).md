# Kaufman's Adaptive Moving Average (KAMA)

**URL:** https://www.tradingview.com/support/solutions/43000773012-kaufman-s-adaptive-moving-average-kama/

---

- [ Help Center ](/)
- / 
- / Indicators 
- / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/)
- / [ Kaufman's Adaptive Moving Average (KAMA) ](/support/solutions/43000773012-kaufman-s-adaptive-moving-average-kama/)

# Kaufman's Adaptive Moving Average (KAMA) 
 Kaufman's Adaptive Moving Average (KAMA), introduced by Perry J. Kaufman in 1995, is a moving average that dynamically adjusts its smoothing behavior to the relative noise or choppiness in market movements.

Kaufman designed the indicator as a generalized trend-following solution based on the idea that faster averages are more useful for tracking trends when the market price is moving quickly in one direction, and slower averages are better for avoiding whipsaws during periods of choppiness and volatility. As such, KAMA follows the market price at a faster rate when movements are efficient and directional, and at a slower rate when movements are choppy or inefficient. 

Traders often analyze movements in KAMA to identify trends and choppy market conditions, and use the crossings between KAMA and price or other moving averages to find potential turning points and signals.

#### Calculation 

At its core, KAMA uses the same general structure as an [exponential moving average (EMA)](https://www.tradingview.com/support/solutions/43000592270-exponential-moving-average/):
 MA = SC × Price + (1 − SC) × Previous MA 
Where:

- **SC** is the **smoothing factor**, sometimes referred to as the smoothing constant, which is a value between 0 and 1 that controls the **rate** at which the moving average follows the market price. The lower the factor, the less sensitive the moving average becomes to short-term price changes.
- **Previous MA** is the EMA value on the previous bar. 

A traditional EMA calculates a fixed smoothing factor of 2 / (length + 1), where the length value controls the period for which the average responds significantly to changes in price.

By contrast, KAMA calculates a **dynamic** factor based on the estimated **efficiency** of market movements. Below are the steps that the indicator performs to calculate the smoothing factor. 

#### Calculate the Efficiency Ratio 

KAMA uses Kaufman's Efficiency Ratio (ER) to control its responsiveness. The ratio represents the absolute change in price over a period relative to the total bar-by-bar change (volatility) within that period:
 Change = Abs(Price − Price N bars ago) Volatility = Sum of Abs(Price − Price 1 bar ago) over N bars ER = Change / Volatility 
An ER value near 1 means that the total bar-by-bar change across the period is close to the overall change, indicating efficient price movement in one direction. A value near 0 means that the overall change is much smaller than the total bar-by-bar change, indicating choppy or inefficient movement over the period. 

#### Calculate initial smoothing factors 

KAMA uses two separate EMA smoothing factors to determine its smoothing response. One factor corresponds to the slowest response for inefficient price movements, and the other corresponds to the fastest response for efficient movements:
 Slow SC = 2 / (Slow Length + 1) Fast SC = 2 / (Fast Length + 1) 
#### Calculate the final smoothing factor 

The indicator determines the final smoothing factor by mixing the fast and slow smoothing factors based on the value of ER, then squaring the result:
 SC = (ER × (Fast SC - Slow SC) + Slow SC)² 
This smoothing factor causes the moving average to converge toward the market price at a faster rate when ER is high, and at a slower rate when ER is low. Squaring the factor significantly reduces the moving average's responsiveness during periods of choppy or inefficient price movement.

#### Inputs 

#### Source 

The source series for which to calculate the adaptive moving average.

#### ER length 

The number of bars to analyze for the Efficiency Ratio. Use a lower value to make the average's smoothing behavior change in response to only very recent price fluctuations, and a higher value to make the behavior responsive to fluctuations over a larger period. 

#### Fast length 

The length for the fast smoothing factor, which controls the fastest possible response of the moving average.

#### Slow length 

The length for the slow smoothing factor, which controls the slowest possible response of the moving average. 

#### Timeframe 

Sets the timeframe that the indicator uses for its calculations. The "Wait for timeframe closes" checkbox below determines whether the indicator shows results only when a bar on the specified timeframe closes. See the [Leveraging multi-timeframe analysis](https://www.tradingview.com/support/solutions/43000591555-leveraging-multi-timeframe-analysis/) article to learn more.
 Previous Previous Ichimoku Cloud Next Next Keltner Channels (KC) Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43593143742/original/ZAMYkKllGyLuUZ71BudUdZ2I3q-oQ-ZF8w.png?1763770455

**Описание:**

This image shows a **TradingView chart interface** displaying the daily (1D) price action of **Microsoft Corporation (MSFT)** on the NASDAQ exchange. Below is a detailed breakdown of all UI elements, their purposes, and what the chart conveys:  


### 1. **Top Header & Ticker Information**  
- **Ticker & Exchange**: `MSFT · 1D · NASDAQ`  
  - `MSFT`: Microsoft’s stock ticker.  
  - `1D`: Timeframe (daily candlesticks, meaning each candle represents one trading day).  
  - `NASDAQ`: The exchange where MSFT is listed.  

- **Price Data**: `O265.95 H273.33 L265.67 C271.49 +5.24 (+1.97%)`  
  - `O265.95`: Opening price of the current day.  
  - `H273.33`: Highest price reached during the day.  
  - `L265.67`: Lowest price reached during the day.  
  - `C271.49`: Closing price of the current day.  
  - `+5.24 (+1.97%)`: Daily price change (gain) and percentage gain.  

- **Indicator Label**: `KAMA 30 30 2 30 268.71`  
  - `KAMA`: Kaufman’s Adaptive Moving Average (a technical indicator).  
  - `30 30 2 30`: Parameters for the KAMA (e.g., lookback periods, smoothing factors).  
  - `268.71`: Current value of the KAMA indicator.  


### 2. **Chart Area**  
- **Candlestick Chart**:  
  - Green candles = price closed **higher** than it opened (bullish day).  
  - Red candles = price closed **lower** than it opened (bearish day).  
  - Wicks (thin lines above/below candles) = intraday high/low prices.  

- **KAMA Indicator (Blue Line)**:  
  A smoothed moving average that adapts to volatility. It helps identify trend direction (upward/downward) and potential support/resistance.  

- **Grid Lines**: Horizontal (price levels) and vertical (time) lines for easy price/time reference.  


### 3. **Right-Side Price Axis**  
- Vertical axis with price levels (e.g., 190.00, 195.00, ..., 285.00) to show the price scale of MSFT.  


### 4. **Bottom Time Axis**  
- Months: `Jun, Jul, Aug, Sep, Oct, Nov, Dec` (x-axis, showing the time period of the chart).  


### 5. **UI Elements & Buttons**  
- **Close Button (Top-Left)**: `×` (closes the current chart or panel).  
- **TradingView Pro Logo (Bottom-Left)**: `TV PRO` (indicates a premium TradingView subscription).  
- **Settings/Info Icon (Bottom-Right)**: `⚙️` (opens chart settings, e.g., timeframes, indicators, styles).  


### 6. **Key Visual Takeaways**  
- **Trend**: MSFT shows a **strong upward trend** from June to November, with periodic pullbacks (red candles) followed by new highs (green candles).  
- **Recent Action**: The latest candle is green, confirming a daily gain (+1.97%).  
- **KAMA Context**: The blue KAMA line trends upward, aligning with the bullish price action, and sits near the current close (`271.49`), acting as a dynamic support level.  


This interface is designed for technical analysis, allowing traders to visualize price movements, apply indicators (like KAMA), and assess trend strength/volatility.

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43593143973/original/p43HP_RYx8FHwAJJBYKaaV0YvGTqiSU87w.png?1763770705

**Описание:**

This image shows the **KAMA (Kaufman Adaptive Moving Average)** indicator settings panel in the TradingView platform. It’s a modal window for configuring the indicator’s parameters, with a clean, minimalistic UI focused on input customization. Here’s a detailed breakdown:  


### 1. Header & Navigation  
- **Title**: “KAMA” (top-left) identifies the indicator being configured.  
- **Close Button**: A gray “×” (top-right) closes the settings panel without saving changes.  
- **Tabs**: Three tabs for organizing settings:  
  - *Inputs* (selected, underlined in black): Displays parameter inputs for the indicator.  
  - *Style*: Likely for customizing visual aspects (e.g., line color, thickness).  
  - *Visibility*: For toggling the indicator’s display on the chart.  


### 2. Input Parameters (Under “Inputs” Tab)  
These fields define how the KAMA indicator calculates and behaves:  

- **Source**: A dropdown menu (default: “Close”) to select the price data source (e.g., Open, High, Low, Close, or other indicators).  
- **ER length**: A text input (default: “10”) for the *Efficiency Ratio (ER)* period (a key component of KAMA’s adaptivity).  
- **Fast length**: A text input (default: “2”) for the *fast smoothing period* (short-term sensitivity).  
- **Slow length**: A text input (default: “30”) for the *slow smoothing period* (long-term sensitivity).  


### 3. Calculation Section  
- **Timeframe**: A dropdown (default: “Chart”) to set the time interval for calculation (e.g., 1m, 5m, 1h, or “Chart” to match the chart’s timeframe).  
- **“Wait for timeframe closes”**: A checkbox (checked by default) that ensures the indicator only updates after a new candle closes, avoiding “repainting” (recalculating on incomplete data).  


### 4. Action Buttons (Bottom)  
- **Defaults**: A dropdown to reset parameters to their default values.  
- **Cancel**: A gray button to discard changes and close the panel.  
- **Ok**: A black button to apply changes and close the panel.  


### Purpose of the Interface  
This panel lets traders customize the KAMA indicator’s behavior (e.g., data source, smoothing periods, calculation timing) to align with their trading strategy. The “Inputs” tab focuses on *how* the indicator is calculated, while “Style” and “Visibility” (not shown here) handle its appearance and visibility on the chart.

---

