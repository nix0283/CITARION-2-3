# Account size required

**URL:** https://www.tradingview.com/support/solutions/43000772918-account-size-required/

---

- [ Help Center ](/)
- / [ Knowledge base ](/knowledge-base/)
- / Strategies 
- / [ Strategy report metrics ](/support/folders/43000599093-strategy-report-metrics/)
- / [ Account size required ](/support/solutions/43000772918-account-size-required/)

# Account size required 
 This metric represents the minimum capital needed to safely trade the strategy. It ensures you can:

- Open the maximum number of positions the strategy ever holds simultaneously, considering any intrabar drawdowns on them.

- Survive the largest possible drawdown at any point in the strategy’s history, including scenarios where the strategy is entered at the worst possible moment.

This metric reflects the capital buffer needed so that even if the market moves against your open positions, you avoid a margin call.
 Previous Previous Return on initial capital Next Next Return on account size required Launch Supercharts

---

## Изображения

### Изображение 1

**URL:** https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43592739658/original/c90e3JcZ0B3B9KoxSrmRmG6RGI1XWEeROw.png?1763626570

**Описание:**

The image displays a **mathematical formula** on a plain white background, with no traditional TradingView interface elements (e.g., charts, toolbars, buttons) visible. Here’s a detailed breakdown:  


### 1. Formula Content  
The formula is:  
`Account Size Required = Max Used Margin + |Max Drawdown (Intrabar)|`  

- **Purpose**: This formula calculates the minimum account size needed to sustain trading, accounting for two key risk factors:  
  - `Max Used Margin`: The maximum margin (leverage) used in any single trade.  
  - `|Max Drawdown (Intrabar)|`: The absolute value of the largest intrabar (within a single price bar) drawdown (peak-to-trough loss) during trading.  


### 2. UI Elements (None Present)  
The image contains **no interactive UI elements** (buttons, menus, charts, etc.). It is a static text display of the formula, likely from a TradingView Pine Script indicator, study, or educational resource explaining risk management for trading.  


### 3. Context in TradingView  
In TradingView, this formula might appear in:  
- A Pine Script indicator’s `label` or `plot` (to display risk calculations).  
- An educational guide or tutorial about position sizing/risk management.  
- A custom script’s output (e.g., a risk calculator).  


### Key Terms Explained  
- **Account Size Required**: The minimum capital needed to avoid margin calls or account depletion.  
- **Max Used Margin**: The highest margin (leverage) utilized in any trade (e.g., 10% margin for a 10x leveraged position).  
- **Max Drawdown (Intrabar)**: The largest loss (in percentage or currency) within a single price bar (e.g., a candlestick) during a trade. The `| |` denotes the *absolute value* (always positive, regardless of loss direction).  


In summary, the image is a static formula for risk management, not a full TradingView interface—focused on calculating the minimum account size to survive trading risks.

---

