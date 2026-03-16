# Custom font family

---
source_url: https://tradingview.github.io/lightweight-charts/tutorials/demos/custom-font-family
description: An example of how to configure a custom font family for the chart
---

# Custom font family
In this example, Lightweight Charts™ showcases its high customizability,
specifically with respect to adjusting font families. The primary tool for
implementing this shift in font is the `chart.applyOptions()` method.
This method is called within the `setFontFamily(fontFamily)` function, accepting
an object that modifies the `layout` section of the chart options. The object
changes the `fontFamily` property to the passed argument, allowing quick and
responsive alterations to the chart's font style.
The flexibility in adjusting text characteristics enables the fine-tuning of the
chart's visual elements for better readability or to match specific styles,
attesting to the adaptability of Lightweight Charts™.
A more detailed tutorial on customizing the appearance of the chart can be found
[here](/lightweight-charts/tutorials/customization/intro).
API Reference[​](#api-reference)
- [LayoutOptions.fontFamily](/lightweight-charts/docs/api/interfaces/LayoutOptions#fontfamily)
- [API Reference](#api-reference)

## Code Example

```javascript
const container = document.getElementById('container');
/** @type {import('lightweight-charts').IChartApi} */
const chart = createChart(container, chartOptions);



function setFontFamily(fontFamily) {
    // highlight-start
    chart.applyOptions({
        layout: {
            fontFamily: fontFamily,
        },
    });
    // highlight-end
}

const candlestickSeries = chart.addSeries(CandlestickSeries, {
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
});

candlestickSeries.setData([
    {
        close: 108.9974612905403,
        high: 121.20998259466148,
        low: 96.65376292551082,
        open: 104.5614412226746,
        time: { year: 2018, month: 9, day: 22 },
    },
    
]);

chart.timeScale().fitContent();

const fontOptions = ['Courier New', 'Arial', 'Times New Roman'];
fontOptions.forEach(font => {
    const button = document.createElement('button');
    button.innerText = font;
    button.addEventListener('click', () => setFontFamily(font));
    buttonsContainer.appendChild(button);
});

container.appendChild(buttonsContainer);
```

## Image Descriptions

### Custom Font Family Candlestick Chart

The chart visualization is a candlestick chart demonstrating custom font family configuration in Lightweight Charts™.

**Chart Area & Layout:**
The chart occupies the lower portion of the visible content, with a white background and a subtle border defining its boundaries.

**Axes:**
- **Y-Axis (Vertical)**: Located on the **right-hand side** of the chart. Displays numerical values (e.g., 125.00 at the top, with partial lower values visible). Uses a clean, sans-serif font in dark gray or black.
- **X-Axis (Horizontal)**: Contains vertical grid lines that extend upward, creating a structured grid for aligning candlesticks.

**Candlestick Elements:**
- Each candlestick has a vertical "body" (the main price range) and "wicks" (thin lines representing high/low prices).
- **Green (or teal) candlesticks**: Indicate bullish movement (closing price > opening price).
- **Red candlesticks**: Indicate bearish movement (closing price < opening price).

**Grid Lines:**
- **Vertical Grid Lines**: Thin, light gray lines running from the x-axis upward.
- **Horizontal Grid Lines**: Thin, light gray lines running horizontally across the chart.

**Font Family Buttons:**
- Three buttons below the chart: "Courier New", "Arial", "Times New Roman" for switching between font families.
- Clicking each button dynamically changes the font style used throughout the chart.

**Typography & Styling:**
All text within the chart uses a **sans-serif font** (customizable via the buttons), ensuring visual coherence with the surrounding content.

## Live Demo

The live demo of this example is available at: [View Demo](https://tradingview.github.io/lightweight-charts/tutorials/demos/custom-font-family)
