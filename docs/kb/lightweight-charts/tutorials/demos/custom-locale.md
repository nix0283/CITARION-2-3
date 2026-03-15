# Custom locale

---
source_url: https://tradingview.github.io/lightweight-charts/tutorials/demos/custom-locale
description: An example of how to set a custom locale for the chart
---

# Custom locale
In this example, the Lightweight Charts™ library allows for a change in the
locale of the chart rendering, enabling customization to best suit the end-user.
An initial chart is displayed in the default locale.
The function `setLocale(locale)` is defined to change the locale of the chart
using `chart.applyOptions` method. It adjusts the `localization` property of the
chart options, specifically the `locale` and `dateFormat` options. The
`dateFormat` varies depending on the set locale to mirror customary date formats
in respective regions.
A selection of buttons are created, each representing a distinct locale (like
'es-ES', 'en-US', 'ja-JP'). On clicking any of these buttons, its respective
locale is applied to the chart by invoking `setLocale(locale)`. This dynamically
adjusts the date formatting for the chart data, demonstrating the flexibility of
the Lightweight Charts™ in catering to an international audience.
API Reference[​](#api-reference)
- [ChartOptions.localization](/lightweight-charts/docs/api/interfaces/ChartOptionsBase#localization)
- [API Reference](#api-reference)

## Code Example

```javascript
const container = document.getElementById('container');
/** @type {import('lightweight-charts').IChartApi} */
const chart = createChart(container, chartOptions);



function setLocale(locale) {
    // highlight-start
    chart.applyOptions({
        localization: {
            locale: locale,
            dateFormat: 'ja-JP' === locale ? 'yyyy-MM-dd' : "dd MMM 'yy",
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

const localeOptions = ['es-ES', 'en-US', 'ja-JP'];
localeOptions.forEach(locale => {
    const button = document.createElement('button');
    button.innerText = locale;
    button.addEventListener('click', () => setLocale(locale));
    buttonsContainer.appendChild(button);
});

container.appendChild(buttonsContainer);
```

## Image Descriptions

### Custom Locale Candlestick Chart

The chart visualization is a candlestick chart rendered using the Lightweight Charts™ library, designed to demonstrate locale customization.

**Chart Area & Background:**
The chart occupies the lower portion of the page, with a **white background** and a thin, light gray border defining its boundaries. The overall layout is clean, with no extraneous decorative elements.

**Axes:**
- **Vertical (Y) Axis**: Positioned on the **right side** of the chart. Displays price values (e.g., 125.00) in black text with a simple, sans-serif font.
- **Horizontal (X) Axis**: Positioned at the **bottom** of the chart. Contains vertical grid lines that extend upward, aligning with candlestick time periods.

**Candlestick Elements:**
- Each candlestick has a **vertical "body"** (the thick central rectangle) and **"wicks"** (thin lines extending above and below the body).
- **Green (or teal) candlesticks**: Indicate price increases (closing price > opening price).
- **Red (or pink) candlesticks**: Indicate price decreases (closing price < opening price).
- Wicks and bodies use the same color for consistency.

**Grid Lines:**
- **Vertical Grid Lines**: Light gray, thin lines running from the bottom X-axis upward.
- **Horizontal Grid Lines**: Light gray, thin lines running from the right Y-axis leftward.

**Locale Buttons:**
- Three buttons below the chart: "es-ES", "en-US", "ja-JP" for switching between Spanish, English, and Japanese locales.
- Clicking each button dynamically adjusts the date formatting for the chart data.

## Live Demo

The live demo of this example is available at: [View Demo](https://tradingview.github.io/lightweight-charts/tutorials/demos/custom-locale)
