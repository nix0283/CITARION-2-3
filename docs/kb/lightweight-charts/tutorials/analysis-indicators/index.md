# Analysis indicators | Lightweight Charts

---

Analysis indicators | Lightweight Charts[Skip to main content](#__docusaurus_skipToContent_fallback)

On this page
## Overview[​](#overview)

This guide provides an overview of the custom indicator examples.
These examples serve as a starting point for creating your own indicators.
You can use them directly in your projects.

### Available indicators[​](#available-indicators)

Below is a list of indicators where each link points to their source code on GitHub.

- [Average Price](https://github.com/tradingview/lightweight-charts/tree/master/indicator-examples/src/indicators/average-price)

- [Correlation](https://github.com/tradingview/lightweight-charts/tree/master/indicator-examples/src/indicators/correlation)

- [Median Price](https://github.com/tradingview/lightweight-charts/tree/master/indicator-examples/src/indicators/median-price)

- [Momentum](https://github.com/tradingview/lightweight-charts/tree/master/indicator-examples/src/indicators/momentum)

- [Simple Moving Average](https://github.com/tradingview/lightweight-charts/tree/master/indicator-examples/src/indicators/moving-average)

- [Percent Change](https://github.com/tradingview/lightweight-charts/tree/master/indicator-examples/src/indicators/percent-change)

- [Product](https://github.com/tradingview/lightweight-charts/tree/master/indicator-examples/src/indicators/product)

- [Ratio](https://github.com/tradingview/lightweight-charts/tree/master/indicator-examples/src/indicators/ratio)

- [Spread](https://github.com/tradingview/lightweight-charts/tree/master/indicator-examples/src/indicators/spread)

- [Sum](https://github.com/tradingview/lightweight-charts/tree/master/indicator-examples/src/indicators/sum)

- [Weighted Close](https://github.com/tradingview/lightweight-charts/tree/master/indicator-examples/src/indicators/weighted-close)

### Live demos[​](#live-demos)

You can see all the indicators in action on the [live demos page](https://tradingview.github.io/lightweight-charts/indicator-examples/).
Each indicator has two demos:

- **Helper**: shows the recommended method with automatic updates.

- **Direct calculation**: shows the method with a pure function.

## How to use the examples[​](#how-to-use-the-examples)

The examples are self-contained and not available on a package manager like NPM.
Therefore, you have two options for integrating them into your project.

### Option 1: copy the source code[​](#option-1-copy-the-source-code)

The simplest way to use an indicator is to copy its source code directly into your project.
For example, if you want to use the Moving Average indicator, copy the following files into your project's source tree.

- `indicator-examples/src/indicators/moving-average/moving-average.ts`

- `indicator-examples/src/indicators/moving-average/moving-average-calculation.ts`

- `indicator-examples/src/helpers/timestamp-data.ts` (dependency for the calculation)

You can then import the `applyMovingAverageIndicator` helper or the `calculateMovingAverageIndicatorValues` function directly into your code.

### Option 2: compile the examples[​](#option-2-compile-the-examples)

If you prefer to use a compiled JavaScript module, you can build the examples yourself.

- Clone the `lightweight-charts` repository.

Build the main library first:
```
npm install
npm run build:prod

```

Navigate to the examples directory, install dependencies, and run the compile script:
```
cd indicator-examples
npm install
npm run compile

```

- The compiled output will be available in the `indicator-examples/compiled` folder. You can then copy this folder into your project and import the modules.

## How to add indicator[​](#how-to-add-indicator)

There are two distinct approaches to applying these indicators to your chart.

- Using a [helper function](#helper-function-recommended) that creates the indicator series and automatically keeps it in sync with the source series' data.

- Using a [pure function](#direct-calculation) to directly calculate the indicator data from a static dataset.

tip
We recommend using the [Helper function](#helper-function-recommended) for its simplicity and automatic data synchronization.

### Helper function (recommended)[​](#helper-function-recommended)

Each indicator includes an `apply…` function (e.g., `applyMovingAverageIndicator`). This is the preferred and easier method.

This function takes the source series API object itself (not the data) and the options.
It handles everything for you:

- Creates the new indicator series.

- Performs the initial calculation.

- Automatically listens for data changes on the source series and recalculates the indicator whenever the source data is updated.

#### Example[​](#example)

The example below shows how to add an Exponential Moving Average (EMA) with the helper function.

```
import { createChart, CandlestickSeries, LineStyle } from 'lightweight-charts';
import { applyMovingAverageIndicator } from './indicators/moving-average/moving-average';
import { symbolData } from './my-data-source';

const chart = createChart(document.body);
const mainSeries = chart.addSeries(CandlestickSeries);
mainSeries.setData(symbolData.slice(0, 100)); // Set initial data

// 1. Apply the indicator directly to the source series
const emaSeries = applyMovingAverageIndicator(mainSeries, {
 length: 10,
 source: 'close',
 smoothingLine: 'EMA',
});

// 2. (Optional) Customize the new indicator series
emaSeries.applyOptions({
 color: 'orange',
 lineWidth: 2,
 lineStyle: LineStyle.Dotted,
});

// Now, when we update the mainSeries, the emaSeries will update automatically
setInterval(() => {
 const nextBar = getNextRealTimeBar();
 mainSeries.update(nextBar); // The EMA series will update itself
}, 1000);

```

The `apply…` helper attaches a lightweight `ISeriesPrimitive` to the source series.
This primitive subscribes to the series' data changes.
When a change is detected, it refetches the data, runs the calculation, and updates the indicator series automatically.

This approach is more robust, requires less code, and is the recommended way to use these examples.

### Direct calculation[​](#direct-calculation)

Each indicator includes a `calculate…` function (e.g., `calculateMovingAverageIndicatorValues`).
This is a pure function that takes your series data and a set of options as input and returns an array of calculated data points for the indicator.

This method is useful if you have a static dataset or want full control over when the indicator is recalculated.

#### Example[​](#example-1)

The example below shows how to add a Simple Moving Average (SMA).

```
import { createChart, LineSeries, CandlestickSeries } from 'lightweight-charts';
import { calculateMovingAverageIndicatorValues } from './indicators/moving-average/moving-average-calculation';
import { symbolData } from './my-data-source';

const chart = createChart(document.body);
const mainSeries = chart.addSeries(CandlestickSeries);
mainSeries.setData(symbolData);

// 1. Calculate the indicator data from the source data
const smaData = calculateMovingAverageIndicatorValues(symbolData, {
 length: 20,
 source: 'close',
});

// 2. Create a new series for the indicator
const smaSeries = chart.addSeries(LineSeries, {
 color: 'blue',
 lineWidth: 2,
});

// 3. Set the calculated data on the new series
smaSeries.setData(smaData);

```

warning
This approach is **not reactive**. If you update the `mainSeries` with new data (e.g., from a real-time feed), the `smaSeries` will **not** update automatically.
You are responsible for manually recalculating the indicator and calling `smaSeries.setData()` again.

[Overview](#overview)
- [Available indicators](#available-indicators)
- [Live demos](#live-demos)

[How to use the examples](#how-to-use-the-examples)
- [Option 1: copy the source code](#option-1-copy-the-source-code)
- [Option 2: compile the examples](#option-2-compile-the-examples)

[How to add indicator](#how-to-add-indicator)
- [Helper function (recommended)](#helper-function-recommended)
- [Direct calculation](#direct-calculation)