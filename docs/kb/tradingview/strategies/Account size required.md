# Account size required

**URL:** https://www.tradingview.com/support/solutions/43000772918-account-size-required/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Strategies - / [ Strategy report metrics ](/support/folders/43000599093-strategy-report-metrics/) - / [ Account size required ](/support/solutions/43000772918-account-size-required/) # Account size required This metric represents the minimum capital needed to safely trade the strategy. It ensures you can: - Open the maximum number of positions the strategy ever holds simultaneously, considering any intrabar drawdowns on them. - Survive the largest possible drawdown at any point in the strategy’s history, including scenarios where the strategy is entered at the worst possible moment. This metric reflects the capital buffer needed so that even if the market moves against your open positions, you avoid a margin call. Previous Previous Return on initial capital Next Next Return on account size required Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43592739658/original/c90e3JcZ0B3B9KoxSrmRmG6RGI1XWEeROw.png?1763626570)

**Описание:** The image displays a **mathematical formula** on a plain white background, formatted in a clean, serif font. The formula is:  

`Account Size Required = Max Used Margin + |Max Drawdown (Intrabar)|`  


### Key Elements & Purpose:  
- **Formula Components**:  
  - `Account Size Required`: The minimum account balance needed to sustain trading (accounts for margin and drawdown).  
  - `Max Used Margin`: The highest margin utilized during trading (funds locked for open positions).  
  - `Max Drawdown (Intrabar)`: The largest intrabar (within a single candlestick) loss from a peak to a trough (absolute value ensures positivity).  

- **UI/Context**:  
  This is a **text-based formula** (no charts/buttons), likely from a TradingView indicator or educational resource. It calculates the minimum account size by combining margin usage and worst-case intrabar drawdown, helping traders avoid margin calls or account depletion. The simplicity (no interactive elements) suggests it’s a static display of a risk-management calculation.


**Описание:** The image displays a **mathematical formula** on a plain white background, formatted in a clean, serif font. The formula is:  

**Account Size Required = Max Used Margin + |Max Drawdown (Intrabar)|**  


### Key Elements & Purpose:  
- **Formula Structure**: Defines the minimum account size needed for trading, combining two critical risk metrics:  
  - *Max Used Margin*: The highest margin utilized during a trading period (reflects leverage/risk exposure).  
  - *|Max Drawdown (Intrabar)|*: The absolute value of the largest intrabar (within a single candlestick) drawdown (measures peak-to-trough loss during a bar).  
- **UI Context**: This is likely a **TradingView Pine Script annotation** (or educational text) used to explain risk management for traders. It helps calculate the capital required to withstand margin usage and intrabar losses, ensuring accounts avoid liquidation.  


No interactive UI elements (buttons, charts) are present—this is a static text-based formula for educational/risk-calculation purposes.


![Image 2](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

![Image 3](https://static.tradingview.com/static/bundles/look-first-light.74b5bba06f657157cdb4.svg)

