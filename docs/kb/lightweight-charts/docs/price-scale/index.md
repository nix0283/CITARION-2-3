# Price scale | Lightweight Charts

---

Price scale | Lightweight Charts[Skip to main content](#__docusaurus_skipToContent_fallback)

Version: 5.1On this page

The **price scale** (or price axis) is a vertical scale that maps prices to coordinates and vice versa.
The conversion rules depend on the price scale mode, the chart's height, and the visible part of the data.

![](/lightweight-charts/assets/images/price-scales-5ff372fd08578f74710940c724ad5df4.png)

## Image Descriptions

### Price Scale Chart Visualization

This chart is a **candlestick chart with an overlayed line graph**, commonly used in financial or market analysis to display price movements over time.

#### Chart Components

1. **Chart Type**
   - Primary visualization is a candlestick chart, using vertical "candlesticks" to represent price action (open, high, low, close) for each time period
   - A **blue line graph** is overlaid on top, likely representing a moving average or another trend indicator

2. **Colors and Color Gradients**
   - **Candlesticks**:
     - **Green (or teal) candlesticks**: Indicate periods where the closing price was higher than the opening price (bullish, upward movement)
     - **Red candlesticks**: Indicate periods where the closing price was lower than the opening price (bearish, downward movement)
     - Candlestick "wicks" (thin vertical lines) are the same color as the body
   - **Line Graph**: Solid **blue** line, consistent in color and thickness
   - **Annotations**:
     - A teal box with white text ("72.41") on the left axis (likely a key support/resistance level)
     - A blue box with white text ("87.69") on the right axis (likely a current price or target level)
   - **Background/Grid**: Light gray grid lines on a white background

3. **Axes Labels and Values**
   - **X-Axis (Horizontal)**: Labeled with dates: "14", "Nov", "14", "27"
   - **Y-Axes (Vertical)**:
     - **Left Y-Axis**: Ranges from 20.00 to 100.00, with major ticks at 20.00, 40.00, 60.00, 80.00, 100.00
     - **Right Y-Axis**: Identical range (20.00–100.00) with the same major ticks
     - Both axes use a **linear scale** with two decimal places

4. **Grid Lines and Visual Elements**
   - **Grid Lines**: Light gray, dashed horizontal lines aligned with major Y-axis ticks
   - **Candlestick Details**: Each candlestick has a "body" (thicker central rectangle) and "wicks" (thin lines extending from the body to the high/low)
   - **Line Graph**: The blue line is smooth, connecting data points to show trend direction
   - **Borders**: Red rectangular borders frame the left and right Y-axes

5. **Special Features**
   - **Price Scale Annotations**: Two colored boxes highlight key values
   - **Trend Indicators**: The blue line serves as a trend filter
   - **Volatility Representation**: Candlesticks' varying sizes illustrate periods of high/low volatility

## Create price scale[​](#create-price-scale)

By default, a chart has two visible price scales: left and right.
Additionally, you can create an unlimited number of overlay price scales, which remain hidden in the UI.
Overlay price scales allow series to be plotted without affecting the existing visible scales.
This is particularly useful for indicators like Volume, where values can differ significantly from price data.

To create an overlay price scale, assign [`priceScaleId`](/lightweight-charts/docs/api/interfaces/SeriesOptionsCommon#pricescaleid) to a series.
Note that the `priceScaleId` value should differ from price scale IDs on the left and right.
The chart will create an overlay price scale with the provided ID.

If a price scale with such ID already exists, a series will be attached to the existing price scale.
Further, you can use the provided price scale ID to retrieve its API object using the [`IChartApi.priceScale`](/lightweight-charts/docs/api/interfaces/IChartApi#pricescale) method.

See the [Price and Volume](/lightweight-charts/tutorials/how_to/price-and-volume) article for an example of adding a Volume indicator using an overlay price scale.

## Modify price scale[​](#modify-price-scale)

To modify the left price scale, use the [`leftPriceScale`](/lightweight-charts/docs/api/interfaces/ChartOptionsBase#leftpricescale) option.
For the right price scale, use [`rightPriceScale`](/lightweight-charts/docs/api/interfaces/ChartOptionsBase#rightpricescale).
To change the default settings for an overlay price scale, use the [`overlayPriceScales`](/lightweight-charts/docs/api/interfaces/ChartOptionsBase#overlaypricescales) option.

You can use the [`IChartApi.priceScale`](/lightweight-charts/docs/api/interfaces/IChartApi#pricescale) method to retrieve the API object for any price scale.
Similarly, to access the API object for the price scale that a series is attached to, use the [`ISeriesApi.priceScale`](/lightweight-charts/docs/api/interfaces/ISeriesApi#pricescale) method.

## Remove price scale[​](#remove-price-scale)

The default left and right price scales cannot be removed, you can only hide them by setting the [`visible`](/lightweight-charts/docs/api/interfaces/PriceScaleOptions#visible) option to `false`.

An overlay price scale exists as long as at least one series is attached to it.
To remove an overlay price scale, remove all series attached to this price scale.

- [Create price scale](#create-price-scale)
- [Modify price scale](#modify-price-scale)
- [Remove price scale](#remove-price-scale)