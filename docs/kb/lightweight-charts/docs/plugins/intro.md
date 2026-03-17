# Plugins
Plugins allow you to extend the library's functionality and render custom elements, such as new series, drawing tools, indicators, and watermarks.
You can create plugins of the following types:
- [Custom series](#custom-series) — define new types of series.
- [Primitives](#primitives) — define custom visualizations, drawing tools, and
chart annotations that can be attached to an existing series ([series primitives](#series-primitives)) or chart pane ([pane primitives](#pane-primitives)).
Tips
- Use the [create-lwc-plugin](https://www.npmjs.com/package/create-lwc-plugin) npm package to quickly scaffold a project for your custom plugin.
- Explore the [Plugin Examples Demo](https://tradingview.github.io/lightweight-charts/plugin-examples) page that hosts interactive examples of heatmaps, alerts, watermarks, and tooltips implemented with plugins. You can find the code of these examples in the [`plugin-examples`](https://github.com/tradingview/lightweight-charts/tree/master/plugin-examples) folder in the Lightweight Charts™ repository.
## Custom series[​](#custom-series)
Custom series allow you to define new types of series with custom data structures and rendering logic.
For implementation details, refer to the [Custom Series Types](/lightweight-charts/docs/plugins/custom_series) article.
Use the [`addCustomSeries`](/lightweight-charts/docs/api/interfaces/IChartApi#addcustomseries) method to add a custom series to the chart.
Then, you can manage it through the same API available for built-in series.
For example, call the [`setData`](/lightweight-charts/docs/api/interfaces/ISeriesApi#setdata) method to populate the series with data.
javascript
```
\1
```
## Primitives[​](#primitives)
Primitives allow you to define custom visualizations, drawing tools, and chart annotations. You can render them at different
levels in the visual stack to create complex, layered compositions.
### Series primitives[​](#series-primitives)
Series primitives are attached to a specific series and can render on the main pane, price and
time scales. For implementation details, refer to the [Series Primitives](/lightweight-charts/docs/plugins/series-primitives) article.
Use the [`attachPrimitive`](/lightweight-charts/docs/api/interfaces/ISeriesApi#attachprimitive) method to add a primitive to the chart and attach it to the series.
javascript
```
\1
```
### Pane primitives[​](#pane-primitives)
Pane primitives are attached to a chart pane rather than a specific series. You can use them to create chart-wide annotations and features like watermarks.
For implementation details, refer to the [Pane Primitives](/lightweight-charts/docs/plugins/pane-primitives) article.
caution
Note that pane primitives cannot render on the price or time scale.
Use the [`attachPrimitive`](/lightweight-charts/docs/api/interfaces/IPaneApi#attachprimitive) method to add a primitive to the chart and attach it to the pane.
```
\1
```