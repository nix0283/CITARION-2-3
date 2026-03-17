# Avg equity drawdown (close-to-close)

**URL:** https://www.tradingview.com/support/solutions/43000772100-avg-equity-drawdown-close-to-close/

---

- [ Help Center ](/)
- / 
- / Strategies 
- / [ Strategy report metrics ](/support/folders/43000599093-strategy-report-metrics/)
- / [ Avg equity drawdown (close-to-close) ](/support/solutions/43000772100-avg-equity-drawdown-close-to-close/)

# Avg equity drawdown (close-to-close) 
 The average decline of equity during all drawdown phases of the strategy (from a local maximum to a new low). Shows how much, on average, the capital decreases during drawdown periods.

Calculation:

- Identify all drawdown periods (from a peak to the recovery to the previous peak).

- Calculate each drawdown: 

- Average the drawdowns: 

Notes:

Uses close-to-close equity.
 Previous Previous Avg equity drawdown duration (close-to-close) Next Next Max equity drawdown (close-to-close) Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43590854895/original/Se9XqbNfJ94IgS9079vJHRDWG-3VdsmugQ.png?1762788393

**Описание:**

The image you've shared is **not a TradingView interface**—it's a mathematical formula displayed on a plain white background. Here's a detailed breakdown:  


### 1. Content of the Image  
The image shows the formula for calculating **drawdown** (a key risk metric in trading):  
$$\boldsymbol{\text{Drawdown}_i = \text{Equity Peak}_i - \text{Equity Trough}_i}$$  

- **Drawdown\(_i\)**: The drawdown for the \(i\)-th period (e.g., a specific time frame in a trading strategy).  
- **Equity Peak\(_i\)**: The highest value of an account’s equity (balance + unrealized profit) reached *before* a decline in the \(i\)-th period.  
- **Equity Trough\(_i\)**: The lowest value of the account’s equity reached *during* the decline in the \(i\)-th period.  


### 2. UI Elements (or Lack Thereof)  
The image contains **no TradingView-specific UI elements** (e.g., charts, toolbars, buttons, or menus). It is a static text-based formula with no interactive components.  


### 3. Context: How This Relates to TradingView  
While the image itself isn’t a TradingView interface, *drawdown* is a critical metric analyzed in TradingView:  
- Traders use drawdown to assess risk (e.g., how much an account’s value drops during a losing streak).  
- In TradingView, drawdown is often visualized in **equity curves** (via backtesting or live trading) or calculated in **Pine Script** (TradingView’s programming language) for custom indicators/strategies.  


If you intended to share a TradingView chart or interface, please re-upload the correct image, and I can describe its UI elements (e.g., chart type, indicators, toolbar buttons, timeframes, etc.) in detail!

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43590854962/original/r2KG1bKMYVh1uVIZzImOKNX443cp_mqQ9A.png?1762788416

**Описание:**

The image you've shared is **not a TradingView interface**—it's a mathematical formula for calculating the **Average Equity Drawdown**. Below is a detailed breakdown of what the image shows:  


### 1. Formula Content  
The formula displayed is:  
$$\text{Avg Equity Drawdown} = \frac{\sum_i \text{Drawdown}_i}{N_{\text{drawdowns}}}$$  


### 2. Components of the Formula  
- **Left - hand side**: `Avg Equity Drawdown`  
  This represents the *average loss* in a trading account’s equity during periods of decline (drawdowns). Drawdowns measure how much an account’s value drops from a peak to a subsequent trough.  

- **Right - hand side**:  
  - $\boldsymbol{\sum_i \text{Drawdown}_i}$: The *sum of all individual drawdowns* (each $\text{Drawdown}_i$ is the magnitude of a single drawdown event).  
  - $\boldsymbol{N_{\text{drawdowns}}}$: The *total number of drawdown events* observed.  


### 3. Purpose of the Formula  
This formula calculates the **average size of drawdowns** over a period. For traders, it quantifies risk by showing the typical loss during downturns (e.g., if the average drawdown is 5%, a trader can expect, on average, a 5% drop in equity during losing periods).  


### 4. No TradingView UI Elements  
The image contains **no TradingView - specific UI elements** (e.g., charts, indicators, buttons, toolbars, or menus). It is purely a mathematical expression, not a screenshot of the TradingView platform.  


If you intended to share a TradingView interface, please re - upload the correct image, and I can provide a detailed breakdown of its UI elements, buttons, and functionality!

---

