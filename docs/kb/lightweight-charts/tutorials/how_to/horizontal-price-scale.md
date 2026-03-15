# Custom horizontal scale

---
source_url: https://tradingview.github.io/lightweight-charts/tutorials/how_to/horizontal-price-scale
---

# Custom horizontal scaleThe `IHorzScaleBehavior` interface allows you to customize the behavior of the
horizontal scale. By default, this scale uses [time](/lightweight-charts/docs/api/type-aliases/Time) values, but
you can override it to use any other type of horizontal scale items, such as
price values. The most typical use case is the creation of Options charts.
This guide will explain the
[`IHorzScaleBehavior`](/lightweight-charts/docs/api/interfaces/IHorzScaleBehavior) interface and
how to implement it to create a horizontal scale using price values with
customizable precision.
## Understanding the IHorzScaleBehavior interface[​](#understanding-the-ihorzscalebehavior-interface)
The `IHorzScaleBehavior` interface consists of several methods that you need to
implement to customize the horizontal scale behavior. Here's a breakdown of each
method and its purpose:
### options[​](#options)
```
public options(): ChartOptionsImpl<HorzScaleItem>
```
This method returns the chart's current configuration options. These options
include various settings that control the appearance and behavior of the chart.
Implement this method to return the current options of your horizontal scale
behavior.
### setOptions[​](#setoptions)
```
public setOptions(options: ChartOptionsImpl<HorzScaleItem>): void
```
This method allows you to set or update the chart's configuration options. The
provided `options` parameter will contain the settings you want to apply. Use
this method to update the options when necessary.
### preprocessData[​](#preprocessdata)
```
public preprocessData(data: DataItem<HorzScaleItem> | DataItem<HorzScaleItem>[]): void
```
This method processes the series data before it is used by the chart. It
receives an array of data items or a single data item. You can implement this
method to preprocess or modify data as needed before it is rendered.
### updateFormatter[​](#updateformatter)
```
public updateFormatter(options: LocalizationOptions<HorzScaleItem>): void
```
This method updates the formatter used for displaying the horizontal scale items
based on localization options. Implement this to set custom formatting settings,
such as locale-specific date or number formats.
### createConverterToInternalObj[​](#createconvertertointernalobj)
```
public createConverterToInternalObj(data: SeriesDataItemTypeMap<HorzScaleItem>[SeriesType][]): HorzScaleItemConverterToInternalObj<HorzScaleItem>
```
This method creates and returns a function that converts series data items into
internal horizontal scale items. Implementing this method is essential for
transforming your custom data into the format required by the chart's internal
mechanisms.
### key[​](#key)
```
public key(internalItem: InternalHorzScaleItem | HorzScaleItem): InternalHorzScaleItemKey
```
This method returns a unique key for a given horizontal scale item. It's used
internally by the chart to identify and manage items uniquely. Implement this
method to provide a unique identifier for each item.
### cacheKey[​](#cachekey)
```
public cacheKey(internalItem: InternalHorzScaleItem): number
```
This method returns a cache key for a given internal horizontal scale item. This
key helps the chart to cache and retrieve items efficiently. Implement this
method to return a numeric key for caching purposes.
### convertHorzItemToInternal[​](#converthorzitemtointernal)
```
public convertHorzItemToInternal(item: HorzScaleItem): InternalHorzScaleItem
```
This method converts a horizontal scale item into an internal item that the
chart can use. Implementing this method ensures that your custom data type is
correctly transformed for internal use.
### formatHorzItem[​](#formathorzitem)
```
public formatHorzItem(item: InternalHorzScaleItem): string
```
This method formats a horizontal scale item into a display string. The returned
string will be used for displaying the item on the chart. Implement this method
to format your items in the desired way (e.g., with a specific number of decimal
places).
### formatTickmark[​](#formattickmark)
```
public formatTickmark(item: TickMark, localizationOptions: LocalizationOptions<HorzScaleItem>): string
```
This method formats a horizontal scale tick mark into a display string. The tick
mark represents significant points on the horizontal scale. Implement this
method to customize how tick marks are displayed.
### maxTickMarkWeight[​](#maxtickmarkweight)
```
public maxTickMarkWeight(marks: TimeMark[]): TickMarkWeightValue
```
This method determines the maximum weight for a set of tick marks, which
influences their display prominence. Implement this method to specify the weight
of the most significant tick mark.
### fillWeightsForPoints[​](#fillweightsforpoints)
```
public fillWeightsForPoints(sortedTimePoints: readonly Mutable<TimeScalePoint>[], startIndex: number): void
```
This method assigns weights to the sorted time points. These weights influence
the tick marks' visual prominence. Implement this method to provide a weighting
system for your horizontal scale items.
## Example[​](#example)
Below is an example implementation of a custom horizontal scale behavior using
price values. This example also includes customizable precision for formatting
price values.
### Implement price-based horizontal scale[​](#implement-price-based-horizontal-scale)
- **Define the custom localization options interface**
Extend the [`LocalizationOptions`](/lightweight-charts/docs/api/interfaces/LocalizationOptions)
interface to include a `precision` property.
```
export interface CustomLocalizationOptions
extends LocalizationOptions<HorzScalePriceItem> {
precision: number;
}
```
- **Define the type alias**
Define a type alias for the horizontal scale item representing price values.
```
export type HorzScalePriceItem = number;
```
- **Implement the custom horizontal scale behavior class**
The `HorzScaleBehaviorPrice` class implements the `IHorzScaleBehavior`
interface, with additional logic to handle the precision provided in the custom
localization options.
```
function markWithGreaterWeight(a: TimeMark, b: TimeMark): TimeMark {
return a.weight > b.weight ? a : b;
}
export class HorzScaleBehaviorPrice implements IHorzScaleBehavior<HorzScalePriceItem> {
private _options!: ChartOptionsImpl<HorzScalePriceItem>;
public options(): ChartOptionsImpl<HorzScalePriceItem> {
return this._options;
}
public setOptions(options: ChartOptionsImpl<HorzScalePriceItem>): void {
this._options = options;
}
public preprocessData(
data: DataItem<HorzScalePriceItem> | DataItem<HorzScalePriceItem>[]
): void {
// un-needed in this example because we do not require any additional
// data processing for this scale.
// The method is still required to be implemented in the class.
}
public updateFormatter(options: CustomLocalizationOptions): void {
if (!this._options) {
return;
}
this._options.localization = options;
}
public createConverterToInternalObj(
data: SeriesDataItemTypeMap<HorzScalePriceItem>[SeriesType][]
): HorzScaleItemConverterToInternalObj<HorzScalePriceItem> {
return (price: number) => price as unknown as InternalHorzScaleItem;
}
public key(
internalItem: InternalHorzScaleItem | HorzScalePriceItem
): InternalHorzScaleItemKey {
return internalItem as InternalHorzScaleItemKey;
}
public cacheKey(internalItem: InternalHorzScaleItem): number {
return internalItem as unknown as number;
}
public convertHorzItemToInternal(
item: HorzScalePriceItem
): InternalHorzScaleItem {
return item as unknown as InternalHorzScaleItem;
}
public formatHorzItem(item: InternalHorzScaleItem): string {
return (item as unknown as number).toFixed(this._precision());
}
public formatTickmark(
item: TickMark,
localizationOptions: LocalizationOptions<HorzScalePriceItem>
): string {
return (item.time as unknown as number).toFixed(this._precision());
}
public maxTickMarkWeight(marks: TimeMark[]): TickMarkWeightValue {
return marks.reduce(markWithGreaterWeight, marks[0]).weight;
}
public fillWeightsForPoints(
sortedTimePoints: readonly Mutable<TimeScalePoint>[],
startIndex: number
): void {
const priceWeight = (price: number) => {
if (price === Math.ceil(price / 100) * 100) {
return 8;
}
if (price === Math.ceil(price / 50) * 50) {
return 7;
}
if (price === Math.ceil(price / 25) * 25) {
return 6;
}
if (price === Math.ceil(price / 10) * 10) {
return 5;
}
if (price === Math.ceil(price / 5) * 5) {
return 4;
}
if (price === Math.ceil(price)) {
return 3;
}
if (price * 2 === Math.ceil(price * 2)) {
return 1;
}
return 0;
};
for (let index = startIndex; index < sortedTimePoints.length; ++index) {
sortedTimePoints[index].timeWeight = priceWeight(
sortedTimePoints[index].time as unknown as number
);
}
}
private _precision(): number {
return (this._options.localization as CustomLocalizationOptions).precision;
}
}
```
This class provides additional precision control through localization options,
allowing formatted price values to use a specific number of decimal places.
### Customize horizontal scale behavior[​](#customize-horizontal-scale-behavior)
To use the custom horizontal scale behavior, instantiate the
`HorzScaleBehaviorPrice` class and pass it to
[`createChartEx`](/lightweight-charts/docs/api/functions/createChartEx).
You can pass the custom option for `precision` within the `localization`
property of the chart options.
```
const horzItemBehavior = new HorzScaleBehaviorPrice();
const chart = LightweightCharts.createChartEx(container, horzItemBehavior, {
localization: {
precision: 2, // custom option
},
});
const s1 = chart.addSeries(LightweightCharts.LineSeries);
const data = [];
for (let i = 0; i < 5000; i++) {
data.push({
time: i * 0.25,
value: Math.sin(i / 100),
});
}
s1.setData(data);
```
## Image Descriptions

### Custom Horizontal Scale Chart
A line chart demonstrating a custom horizontal (X-axis) scale that uses price values instead of time. The chart features:
- **Chart Type**: Single line series with a blue solid line (#1f77b4)
- **Background**: White with light gray horizontal and vertical grid lines
- **Y-Axis (Price Scale)**: Vertical axis on the right showing values from 6.00 to 11.00 in increments of 1.00
- **X-Axis**: Uses price values instead of time, demonstrating the custom horizontal scale behavior
- **Data Pattern**: Cyclical trend showing two peaks and one trough, starting near 6.00, rising to ~10.50, falling to ~8.00, then rising again
- **Reference Line**: Horizontal dotted blue line at approximately 9.73
- **Current Value**: Blue rectangular tooltip showing "9.73" at the rightmost data point
- **Purpose**: Illustrates how to create Options charts or other financial instruments where price values are used on the horizontal axis

### Conclusion[​](#conclusion)
The `IHorzScaleBehavior` interface provides a powerful way to customize the
horizontal scale behavior in Lightweight Charts™. By implementing this
interface, you can define how the horizontal scale should interpret and display
custom data types, such as price values. The provided example demonstrates how
to implement a horizontal scale with customizable precision, allowing for
tailored display formats to fit your specific requirements.
### Full example[​](#full-example)
How to use the code sample
**The code presented below requires:**
- That `createChart` has already been imported. See [Getting Started](/lightweight-charts/docs#creating-a-chart) for more information,
- and that there is an html div element on the page with an `id` of `container`.
Here is an example skeleton setup: [Code Sandbox](https://codesandbox.io/s/lightweight-charts-skeleton-n67pm6).
You can paste the provided code below the `// REPLACE EVERYTHING BELOW HERE` comment.
tip
Some code may be hidden to improve readability. Toggle the checkbox above the code block to reveal all the code.
```
// Lightweight Charts™ Example: Horizontal Price Scale
// https://tradingview.github.io/lightweight-charts/tutorials/how_to/horizontal-price-scale
function markWithGreaterWeight(a, b) {
return a.weight > b.weight ? a : b;
}
/** @type {import('lightweight-charts').IHorzScaleBehavior} */
class HorzScaleBehaviorPrice {
constructor() {
this._options = {};
}
options() {
return this._options;
}
setOptions(options) {
this._options = options;
}
preprocessData(data) {}
updateFormatter(options) {
if (!this._options) {
return;
}
this._options.localization = options;
}
createConverterToInternalObj(data) {
return price => price;
}
key(internalItem) {
return internalItem;
}
cacheKey(internalItem) {
return internalItem;
}
convertHorzItemToInternal(item) {
return item;
}
formatHorzItem(item) {
return item.toFixed(this._precision());
}
formatTickmark(item, localizationOptions) {
return item.time.toFixed(this._precision());
}
maxTickMarkWeight(marks) {
return marks.reduce(markWithGreaterWeight, marks[0]).weight;
}
fillWeightsForPoints(sortedTimePoints, startIndex) {
const priceWeight = price => {
if (price === Math.ceil(price / 100) * 100) {
return 8;
}
if (price === Math.ceil(price / 50) * 50) {
return 7;
}
if (price === Math.ceil(price / 25) * 25) {
return 6;
}
if (price === Math.ceil(price / 10) * 10) {
return 5;
}
if (price === Math.ceil(price / 5) * 5) {
return 4;
}
if (price === Math.ceil(price)) {
return 3;
}
if (price * 2 === Math.ceil(price * 2)) {
return 1;
}
return 0;
};
for (let index = startIndex; index < sortedTimePoints.length; ++index) {
sortedTimePoints[index].timeWeight = priceWeight(
sortedTimePoints[index].time
);
}
}
_precision() {
return this._options.localization.precision;
}
}
const horzItemBehavior = new HorzScaleBehaviorPrice();
const chartOptions = {
layout: {
textColor: 'black',
background: { type: 'solid', color: 'white' },
},
localization: {
precision: 2, // custom option
},
};
/** @type {import('lightweight-charts').IChartApi} */
const chart = createChartEx(
document.getElementById('container'),
horzItemBehavior,
chartOptions
);
const lineSeries = chart.addSeries(LineSeries, { color: '#2962FF' });
const data = [];
for (let i = 0; i < 5000; i++) {
data.push({
time: i * 0.25,
value: Math.sin(i / 100) + i / 500,
});
}
lineSeries.setData(data);
chart.timeScale().fitContent();
```
