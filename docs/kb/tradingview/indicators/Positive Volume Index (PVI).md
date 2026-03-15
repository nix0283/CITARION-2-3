# Positive Volume Index (PVI)

**URL:** https://www.tradingview.com/support/solutions/43000773006-positive-volume-index-pvi/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Positive Volume Index (PVI) ](/support/solutions/43000773006-positive-volume-index-pvi/) # Positive Volume Index (PVI) The Positive Volume Index (PVI), invented by Paul L. Dysart Jr. in the 1930s and adapted by Norman G. Fosback in the 1970s, is a trend indicator that accumulates the price change percentages from the bars where volume **increases** while ignoring the changes from bars where volume decreases. The logic behind the PVI and its counterpart, the [Negative Volume Index (NVI)](https://www.tradingview.com/support/solutions/43000773005), is based on the assumption that most market participants trade during high-volume periods, while a smaller set of more informed investors — sometimes referred to as "smart money" — is more active during low-volume periods. Traders often analyze the PVI, alongside a moving average, on market indices to identify short-term trends and momentum based on the price movements that occur as volume increases. Calculation Paul Dysart's original PVI was an indicator of broad market activity. It accumulated net advances in the market only on days where volume increased relative to the previous day. Norman Fosback adapted the concept to apply a Positive Volume Index to any market index with volume data. Instead of using advances and declines, Fosback's version of the PVI accumulates percentage changes in price. The calculation is as follows: - Set the initial value of the PVI. The value defines the scale of the PVI, but it does not affect the indicator's behavior. The most common initial values are 1000, 100, and 1. This indicator uses 1000. - If the volume on the current bar is greater than that of the previous bar, add the current change percentage in close prices to the previous PVI value. - If the volume on the current bar is less than or equal to that of the previous bar, do not add the bar's change percentage to the PVI. The result is a cumulative series that updates only on higher-volume bars, providing potential insights into how markets behave as overall trading activity rises. Fosback derived trading signals by comparing the PVI to a one-year moving average. The PVI trending above the average suggests upward momentum and the possible onset of a bullish trend, and a value below the average suggests the opposite. The PVI is primarily intended for analyzing market activity on major market indices, but you can apply this indicator to any chart that has volume data. Inputs EMA length The length for the smoothing factor of the PVI-based [exponential moving average (EMA)](https://www.tradingview.com/support/solutions/43000592270/). The default is 255, which corresponds to approximately one year on a daily equities chart. Timeframe Sets the timeframe that the indicator uses for its calculations. The "Wait for timeframe closes" checkbox below determines whether the indicator shows results only when a bar on the specified timeframe closes. See the [Leveraging multi-timeframe analysis](https://www.tradingview.com/support/solutions/43000591555-leveraging-multi-timeframe-analysis/) article to learn more. Previous Previous Pivot Points Standard Next Next Price Momentum Oscillator (PMO) Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43593137815/original/siAepNzBp8wpJwAicsM7PhiShjrtu2d8nw.png?1763765794)

**Описание:** This TradingView chart displays the **SPDR S&P 500 ETF Trust (SPY)** on a **1-day (1D)** timeframe, sourced from **NYSE Arca**.  

### Top Section (Price Data & Chart):  
- **Header**: Shows the ticker (`SPY`), exchange (`NYSE Arca`), and key price metrics:  
  - `O655.05` (Open), `H664.55` (High), `L650.85` (Low), `C659.03` (Close), `+6.50 (+1.00%)` (daily change).  
- **Candlestick Chart**: The main price chart uses red/green candles to represent daily price action. The y-axis (right) ranges from ~480 to 680, with the current close (`659.03`) highlighted in green.  


### Bottom Section (Technical Indicator: PVI):  
- **PVI (Positive Volume Index)**: A volume-based indicator (blue line) measuring buying pressure.  
  - **Labels**:  
    - `PVI 255` (indicator name/period), `4.42` (current PVI value), `4.99` (PVI-based EMA value).  
    - `PVI-based EMA 4.99` (orange line, an exponential moving average of PVI, smoothing trends).  
- **Y-Axis (Right)**: Scales PVI values (4.20–6.00).  


### UI Elements:  
- **Timeframe/Exchange**: `1D` (1-day) and `NYSE Arca` (exchange) are visible in the header.  
- **Timeline (X-Axis)**: Spans from `Aug` (current year) to `2021` (future, likely a placeholder), with months labeled.  
- **TradingView Pro Badge**: Bottom-left corner indicates a Pro subscription.  
- **Zoom/Time Controls**: Bottom-right (circular icon) for adjusting chart time range.  


### Purpose:  
The chart analyzes SPY’s price trends (via candles) and volume-driven momentum (via PVI/EMA), helping traders assess trend strength and potential reversals.


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43593137539/original/72O3xbEZEATN9j75GGOmGAZcyKRMAFZPfg.png?1763765548)

**Описание:** This is a **TradingView indicator settings modal** for the \


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

