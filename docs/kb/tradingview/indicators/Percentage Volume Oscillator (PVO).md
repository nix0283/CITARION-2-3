# Percentage Volume Oscillator (PVO)

**URL:** https://www.tradingview.com/support/solutions/43000591350-percentage-volume-oscillator-pvo/

---

- [ Help Center ](/) - / [ Knowledge base ](/knowledge-base/) - / Indicators - / [ Built-in Indicators ](/support/folders/43000587405-built-in-indicators/) - / [ Percentage Volume Oscillator (PVO) ](/support/solutions/43000591350-percentage-volume-oscillator-pvo/) # Percentage Volume Oscillator (PVO) The Percentage Volume Oscillator (PVO) is a momentum indicator for volume. It measures the relative difference between two volume-based moving averages. Similar to the [MACD](https://www.tradingview.com/support/solutions/43000502344-macd-moving-average-convergence-divergence/) and [PPO](https://www.tradingview.com/support/solutions/43000502346/) indicators, the PVO consists of three components: the main oscillator, a smoothed signal line, and a histogram line that represents the difference between those values. The PVO closely resembles the PPO. Both indicators measure the difference between two moving averages as a percentage of the slower moving average, offering a relative scale for comparing momentum values across history or across instruments. However, while the PPO measures the relative momentum of **price**, the PVO measures the relative momentum of **volume**. Traders often analyze the PVO along with price action and price momentum indicators to identify high- and low-volume movements, and to help confirm breakouts or other signals based on relative volume changes. Calculation At its core, the Percentage Volume Oscillator uses the same formula as the [PPO](https://www.tradingview.com/support/solutions/43000502346/). The only difference in the PVO's formula is that it calculates moving averages of **volume** instead of price values. The calculation is as follows: PVO = (Fast Volume MA − Slow Volume MA) / Slow Volume MA × 100 Signal = Moving average of PVO Histogram = PVO − Signal Where: - **Fast Volume MA** is the volume-based moving average with the lowest length - **Slow Volume MA** is the volume-based moving average with the highest length The indicator plots the PVO and signal values as lines, and the histogram values as color-coded columns. It also displays a horizontal zero line to distinguish positive and negative values. Because the PVO measures the momentum of volume instead of prices, its interpretation differs from that of the PPO or MACD: - A PVO value above 0 means that the fast MA of volume is greater than the slow MA, indicating above-average volume or market participation. A PVO value below 0 means the opposite. - A histogram value above 0, or the PVO moving above the signal line, suggests that the short-term average volume is increasing. A histogram value below 0, or the PVO moving below the signal line, suggests the opposite. Inputs Fast length The length value for the fast moving average. Slow length The length value for the slow moving average. Signal length The length value for the moving average of the PVO (signal line). Oscillator MA type Specifies the type for the fast and slow averages in the PVO calculation. Select "EMA" to use two [exponential moving averages](https://www.tradingview.com/support/solutions/43000592270-exponential-moving-average/), or "SMA" to use [simple moving averages](https://www.tradingview.com/support/solutions/43000696841-simple-moving-average/) instead. Signal MA type Specifies which type of moving average the indicator applies to the PVO to calculate the signal line. Select "EMA" for an exponential moving average, or "SMA" for a simple moving average. Timeframe Sets the timeframe that the indicator uses for its calculations. The "Wait for timeframe closes" checkbox below determines whether the indicator shows results only when a bar on the specified timeframe closes. See the [Leveraging multi-timeframe analysis](https://www.tradingview.com/support/solutions/43000591555-leveraging-multi-timeframe-analysis/) article to learn more. Previous Previous Percentage Price Oscillator (PPO) Next Next Performance Launch Supercharts

---

## Изображения

![Image 1](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43595986471/original/0xevQ_8mnS0TLP3_8jBYdyW1ZeTXwIJhlA.png?1765219061)

**Описание:** This TradingView chart displays **AMD (Advanced Micro Devices)** on the **NASDAQ** exchange, using a **1-day (1D) candlestick chart**. Here’s a detailed breakdown of all elements:  


### 1. **Top Header & Ticker Info**  
- **Ticker & Exchange**: `AMD` (stock symbol) + `NASDAQ` (exchange).  
- **Timeframe**: `1D` (1-day candlestick).  
- **Price Data**: `O278.13 H279.67 L276.58 C276.64 -2.14 (-0.77%)`  
  - `O`: Open price ($278.13).  
  - `H`: High price ($279.67).  
  - `L`: Low price ($276.58).  
  - `C`: Close price ($276.64, red = daily decline).  
  - `-2.14 (-0.77%)`: Daily price change (down 0.77%).  


### 2. **Candlestick Chart (Main Price Chart)**  
- **Candles**: Green = price closed **higher** than open; Red = price closed **lower** than open.  
- **Trend**: The chart shows a **rising trend** from July to December, with recent consolidation (fluctuating around $276–$280).  
- **Y-Axis (Right)**: Price scale (e.g., 260.00, 280.00).  


### 3. **Volume Bar Chart (Below Candlesticks)**  
- **Bars**: Teal = higher volume on up days; Red = higher volume on down days.  
- **Y-Axis (Right)**: Volume scale (e.g., 18.62M = 18.62 million shares traded).  
- **Purpose**: Shows trading volume (liquidity) for each day, helping identify trend strength.  


### 4. **PVO (Percentage Volume Oscillator) Indicator (Bottom Section)**  
- **Label**: `PVO 12 26 9` (settings: 12-day, 26-day, 9-day moving averages of volume).  
- **Lines**:  
  - **Blue (PVO)**: Primary oscillator line (12-day vs. 26-day volume MA).  
  - **Orange (Signal Line)**: 9-day MA of the PVO (for crossovers).  
- **Histogram**: Bars (green = PVO > Signal Line; red = PVO < Signal Line) show the gap between PVO and Signal Line.  
- **Values**: `Histogram -3.62%`, `Signal line -3.91%`, `PVO -7.53%` (percent differences in volume MAs).  
- **Y-Axis (Right)**: Percentage scale (e.g., 0.00%, 8.00%, -12.00%) to measure volume momentum.  


### 5. **UI Elements**  
- **Expand/Collapse Arrow**: Top-left (hides/shows header details).  
- **TradingView Pro Logo**: Bottom-left (indicates a PRO subscription).  
- **Settings Icon**: Bottom-right (for chart customization).  


### Purpose of the Chart  
This layout combines **price action** (candlesticks), **volume** (bar chart), and **volume momentum** (PVO) to analyze AMD’s trend, liquidity, and momentum. Traders use it to identify trends, confirm strength (via volume), and spot potential reversals (via PVO crossovers).


![Image 2](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43595986797/original/-U9lBQW88j5r7tklS_uOK_x8ZpNMzG3KlQ.png?1765219176)

**Описание:** This is a **TradingView indicator settings modal** for the \


![Image 3](https://static.tradingview.com/static/bundles/look-first-dark.8cb7462c584f600e8f31.svg)

