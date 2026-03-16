# Avg equity run-up duration (close-to-close)

**URL:** https://www.tradingview.com/support/solutions/43000772099-avg-equity-run-up-duration-close-to-close/

---

- [ Help Center ](/)
- / 
- / Strategies 
- / [ Strategy report metrics ](/support/folders/43000599093-strategy-report-metrics/)
- / [ Avg equity run-up duration (close-to-close) ](/support/solutions/43000772099-avg-equity-run-up-duration-close-to-close/)

# Avg equity run-up duration (close-to-close) 
 The average number of calendar days during which equity was in a growth phase (from minimum to new peak). Shows how long, on average, the equity growth lasts.

Calculation:

- For each run-up, calculate the duration: 

- Average the durations:

Notes:

- If duration is less than 1 day, display <1 or No Data.
- Uses close-to-close equity.
 Previous Previous Margin calls Next Next Avg equity run-up (close-to-close) Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43590853817/original/MPI82ihpWBrBmxzIxl3bzF5M9i8aBlvsnw.png?1762788156

**Описание:**

The image provided is **not a TradingView interface**—it is a mathematical formula displayed on a plain white background. Here’s a detailed breakdown:  


### 1. Content of the Image  
The image shows a single line of text:  
`Durationᵢ = Peak Dateᵢ − Trough Before Peak Dateᵢ`  

- **Formula Explanation**: This equation defines a “duration” metric (likely for financial analysis, e.g., measuring the time between a market trough and the subsequent peak).  
  - `Durationᵢ`: The duration for the *i*-th event (e.g., a market cycle).  
  - `Peak Dateᵢ`: The date of the *i*-th peak (e.g., a local maximum in price).  
  - `Trough Before Peak Dateᵢ`: The date of the trough (local minimum) that occurs *before* the *i*-th peak.  
  - The formula calculates the time difference between these two dates.  


### 2. UI Elements (or Lack Thereof)  
There are **no TradingView-specific UI elements** (e.g., charts, toolbars, buttons, or menus) in this image. It is a static text display of a formula, with no interactive components.  


### 3. Contextual Note  
If this formula were part of a TradingView interface, it might appear in:  
- A **Pine Script indicator** (for custom technical analysis).  
- A **study/indicator description** (explaining how a metric is calculated).  
- A **notebook or documentation** within TradingView’s platform.  

However, the image itself is purely a mathematical expression, not a full TradingView interface.  


In summary: The image is a formula for calculating the duration between a market trough and the next peak, with no TradingView UI elements present.

---

### Изображение 2

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43590853922/original/RJG11OrOo_BPO2f6TUcguHsMqCKdtF15pQ.png?1762788182

**Описание:**

The image you've shared is **not a TradingView interface**—it is a mathematical formula displayed on a plain white background. Here's a detailed breakdown:  


### 1. Content of the Image  
The image shows the formula for calculating the **Average Equity Run-up Duration**:  
$$\text{Avg Equity Run-up Duration} = \frac{\sum_i \text{Duration}_i}{N_{\text{run-ups}}}$$  


### 2. Formula Explanation  
- **Left Side**: `Avg Equity Run-up Duration`  
  This represents the *average duration* of “equity run-ups” (periods where a trading account’s equity increases).  

- **Right Side**:  
  - $\boldsymbol{\sum_i \text{Duration}_i}$: The sum of the duration (e.g., in days, bars, or time units) of *each individual run-up* (where “run-up” refers to a period of consecutive equity growth).  
  - $\boldsymbol{N_{\text{run-ups}}}$: The total number of run-up events (how many times the equity increased in a row).  
  - The fraction $\frac{\sum_i \text{Duration}_i}{N_{\text{run-ups}}}$ calculates the **average** duration of these run-ups.  


### 3. UI Elements (or Lack Thereof)  
The image contains **no TradingView-specific UI elements** (e.g., charts, buttons, toolbars, or menus). It is a standalone mathematical expression, likely used in a trading context to explain a performance metric (e.g., for backtesting, strategy analysis, or risk management).  


### 4. Context (If This Were Part of TradingView)  
In a real TradingView interface, this formula might appear in:  
- A strategy’s “Statistics” or “Performance” section (to quantify how long winning streaks/“run-ups” typically last).  
- Educational content (e.g., a Pine Script tutorial or trading guide) explaining how to calculate custom metrics.  


If you intended to share a TradingView chart or interface, please re-upload the correct image, and I can provide a detailed breakdown of its UI elements, buttons, and functionality!

---

