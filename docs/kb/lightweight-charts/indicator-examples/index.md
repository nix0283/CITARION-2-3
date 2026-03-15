# Lightweight Charts - Indicator Examples

**Source URL:** https://tradingview.github.io/lightweight-charts/indicator-examples/

This document provides comprehensive examples of technical indicators that can be implemented using Lightweight Charts. Each indicator includes both direct calculation methods and helper functions for easy integration.

## Related Resources

- [Documentation for Indicators](https://tradingview.github.io/lightweight-charts/tutorials/analysis-indicators)
- [Lightweight Charts Repository](https://github.com/tradingview/lightweight-charts)
- [Learn more about Lightweight Charts](https://www.tradingview.com/lightweight-charts/)

---

## Overview

The indicator examples demonstrate two approaches to implementing indicators:

1. **Direct Calculation** - Calculate indicator values directly from data arrays and set them on a separate series
2. **Helper Functions** - Use primitive-based helpers that automatically update when the source series data changes

---

## Indicators List

| Indicator | Description | Category |
|-----------|-------------|----------|
| [Average Price](#1-average-price) | OHLC/4 average price | Price Transformation |
| [Correlation](#2-correlation) | Pearson correlation between two series | Statistical |
| [Median Price](#3-median-price) | (High + Low) / 2 | Price Transformation |
| [Momentum](#4-momentum) | Price change over period | Momentum |
| [Moving Average](#5-moving-average) | SMA/EMA/WMA with smoothing | Trend |
| [Percent Change](#6-percent-change) | Percentage price change | Momentum |
| [Product](#7-product) | Multiply values from two series | Arithmetic |
| [Ratio](#8-ratio) | Divide values from two series | Arithmetic |
| [Spread](#9-spread) | Difference between two series | Arithmetic |
| [Sum](#10-sum) | Add values from two series | Arithmetic |
| [Weighted Close](#11-weighted-close) | Weighted close price | Price Transformation |

---

## Helper Utilities

Before diving into the indicators, here are the common helper utilities used across multiple indicators:

### Closest Time Index Finder

Used for two-series indicators to find matching time points:

```typescript
export type SearchDirection = 'left' | 'right';
export class ClosestTimeIndexFinder<T extends { time: number }> {
	private numbers: T[];
	private cache: Map<string, number>;

	constructor(sortedNumbers: T[]) {
		this.numbers = sortedNumbers;
		this.cache = new Map();
	}

	public findClosestIndex(target: number, direction: SearchDirection): number {
		const cacheKey = `${target}:${direction}`;
		if (this.cache.has(cacheKey)) {
			return this.cache.get(cacheKey) as number;
		}

		const closestIndex = this._performSearch(target, direction);

		this.cache.set(cacheKey, closestIndex);
		return closestIndex;
	}

	private _performSearch(target: number, direction: SearchDirection): number {
		let low = 0;
		let high = this.numbers.length - 1;

		if (target <= this.numbers[0].time) return 0;
		if (target >= this.numbers[high].time) return high;

		while (low <= high) {
			const mid = Math.floor((low + high) / 2);
			const num = this.numbers[mid].time;

			if (num === target) {
				return mid;
			} else if (num > target) {
				high = mid - 1;
			} else {
				low = mid + 1;
			}
		}
		return direction === 'left' ? low : high;
	}
}
```

### Timestamp Data Validator

Ensures all data points have numeric time values:

```typescript
import { UTCTimestamp } from 'lightweight-charts';

type WithTime<V> = V & { time: unknown };

export function ensureTimestampData<T, N extends UTCTimestamp>(
	data: WithTime<T>[]
): (Omit<T, 'time'> & { time: N })[] {
	for (const item of data) {
		if (typeof item.time !== 'number') {
			throw new Error('All items must have a numeric "time" property.');
		}
	}
	return data as (Omit<T, 'time'> & { time: N })[];
}
```

---

## 1. Average Price

**Description:** Calculates the average price from OHLC data using the formula: `(open + high + low + close) / 4`. Supports offset to shift results forward or backward.

**Live Examples:**
- [Direct calculation](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/average-price/example/direct.html)
- [Helper](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/average-price/example/helper.html)

### Calculation Function

```typescript
import {
	CandlestickData,
	LineData,
	Time,
	WhitespaceData,
} from 'lightweight-charts';

export type SupportedData = CandlestickData | WhitespaceData;

/**
 * Options for average price calculation.
 */
export interface AveragePriceCalculationOptions {
	/**
	 * Offset to shift the result forward (positive) or backward (negative).
	 * E.g. offset=2 will display the average price bars ahead.
	 */
	offset?: number;
}

/**
 * Calculates a average price (with optional offset).
 *
 * For each item computes the OHLC/4 value.
 */
export function calculateAveragePriceIndicatorValues<T = Time>(
	data: (CandlestickData<T> | WhitespaceData<T>)[],
	options: AveragePriceCalculationOptions
): (LineData<T> | WhitespaceData<T>)[] {
	if (data.length === 0) {
		return [];
	}

	const offset = options.offset ?? 0;
	const result = new Array(data.length);
	const startIndex = offset > 0 ? offset : 0;
	const endIndex = offset < 0 ? (data.length - 1) + offset : data.length - 1;
	let resultIndex = 0;

	for (let i = 0; i < startIndex; i++) {
		result[resultIndex] = { time: data[i].time };
		resultIndex += 1;
	}

	for (let i = startIndex; i < endIndex; i++) {
		const value = data[i];

		if ('close' in value) {
			result[resultIndex] =  { time: value.time, value: (value.open + value.high + value.low + value.close) / 4 };
		} else {
			result[resultIndex] = { time: value.time };
		}

		resultIndex += 1;
	}

	for (let i = endIndex; i < data.length; i++) {
		result[resultIndex] = { time: data[i].time };
		resultIndex += 1;
	}

	return result;
}
```

### Helper Function (Primitive-based)

```typescript
import {
	ISeriesApi,
	SeriesType,
	ISeriesPrimitive,
	SeriesAttachedParameter,
	SeriesOptionsMap,
	Time,
	IChartApi,
	LineSeries,
} from 'lightweight-charts';
import {
	calculateAveragePriceIndicatorValues,
	AveragePriceCalculationOptions,
	SupportedData,
} from './average-price-calculation';

/**
 * Apply (add) a average price indicator to the specified series.
 * The data from series will be automatically read and used as the
 * source data for the indicator calculation (and will be updated when
 * the data of the series is updated or changed)
 */
export function applyAveragePriceIndicator(
	series: ISeriesApi<'Candlestick'>,
	options: AveragePriceCalculationOptions
): ISeriesApi<'Line'> {
	class AveragePricePrimitive implements ISeriesPrimitive {
		private _baseSeries: ISeriesApi<SeriesType> | null = null;
		private _indicatorSeries: ISeriesApi<'Line'> | null = null;
		private _chart: IChartApi | null = null;
		private _options: AveragePriceCalculationOptions | null = null;

		public attached(
			param: SeriesAttachedParameter<Time, keyof SeriesOptionsMap>
		): void {
			const { chart, series } = param;
			this._chart = chart;
			this._baseSeries = series;
			this._indicatorSeries = this._chart.addSeries(LineSeries);
			this._options = options;
			series.subscribeDataChanged(this._updateData);
			this._updateData();
		}

		public detached(): void {
			if (this._baseSeries) {
				this._baseSeries.unsubscribeDataChanged(this._updateData);
			}
			if (this._indicatorSeries) {
				this._chart?.removeSeries(this._indicatorSeries);
			}
			this._indicatorSeries = null;
		}

		public indicatorSeries(): ISeriesApi<'Line'> {
			if (!this._indicatorSeries) {
				throw new Error('unable to provide indicator series');
			}
			return this._indicatorSeries;
		}

		public applyOptions(options: Partial<AveragePriceCalculationOptions>): void {
			this._options = {
				...(this._options || {}),
				...(options as AveragePriceCalculationOptions),
			};
			this._updateData();
		}

		private _updateData = () => {
			if (!this._indicatorSeries) {
				return;
			}
			if (!this._baseSeries) {
				this._indicatorSeries.setData([]);
				return;
			}
			const seriesData = this._baseSeries.data() as SupportedData[];
			const indicatorValues = calculateAveragePriceIndicatorValues(
				seriesData,
				this._options || options
			);
			this._indicatorSeries.setData(indicatorValues);
		};
	}
	const primitive = new AveragePricePrimitive();
	series.attachPrimitive(primitive);
	return primitive.indicatorSeries();
}
```

### Usage Examples

**Direct Calculation:**
```typescript
import {
	LineSeries,
	ChartOptions,
	createChart,
	DeepPartial,
	LineStyle,
	CandlestickSeries,
} from 'lightweight-charts';
import { calculateAveragePriceIndicatorValues } from './average-price-calculation';

const chart = createChart('chart', { autoSize: true });

const symbolData = generateAlternativeCandleData(150, new Date(2024, 0, 1));

const mainSeries = chart.addSeries(CandlestickSeries, {});
mainSeries.setData(symbolData);

const averagePriceData = calculateAveragePriceIndicatorValues(symbolData, {});
const averagePriceSeries = chart.addSeries(LineSeries, {
	color: 'black',
	lineWidth: 2,
	lineStyle: LineStyle.Solid,
});
averagePriceSeries.setData(averagePriceData);

chart.timeScale().fitContent();
```

**Helper Function:**
```typescript
import { createChart, CandlestickSeries, LineStyle } from 'lightweight-charts';
import { applyAveragePriceIndicator } from './average-price';

const chart = createChart('chart', { autoSize: true });

const mainSeries = chart.addSeries(CandlestickSeries, {});
mainSeries.setData(initialData);

const averagePriceSeries = applyAveragePriceIndicator(mainSeries, {
	offset: 2,
});
averagePriceSeries.applyOptions({
	color: 'orange',
	lineWidth: 2,
	lineStyle: LineStyle.Dotted,
});
```

---

## 2. Correlation

**Description:** Calculates the rolling Pearson correlation coefficient between two data series over a specified period. Returns values between -1 and 1.

**Live Examples:**
- [Direct calculation](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/correlation/example/direct.html)
- [Helper](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/correlation/example/helper.html)

### Calculation Function

```typescript
import {
	CandlestickData,
	LineData,
	UTCTimestamp,
	WhitespaceData,
} from 'lightweight-charts';
import { ClosestTimeIndexFinder } from '../../helpers/closest-index';
import { ensureTimestampData } from '../../helpers/timestamp-data';

export type SupportedData = LineData<UTCTimestamp> | CandlestickData<UTCTimestamp> | WhitespaceData<UTCTimestamp>;

export interface CorrelationCalculationOptions<
	TPrimaryData extends SupportedData,
	TSecondaryData extends SupportedData
> {
	primarySource?: keyof TPrimaryData | (string & {});
	secondarySource?: keyof TSecondaryData | (string & {});
	allowMismatchedDates?: boolean;
	length: number;
}

export function calculateCorrelationIndicatorValues<
	TPrimaryData extends SupportedData,
	TSecondaryData extends SupportedData
>(
	primaryData: TPrimaryData[],
	secondaryData: TSecondaryData[],
	options: CorrelationCalculationOptions<TPrimaryData, TSecondaryData>
): (LineData<UTCTimestamp> | WhitespaceData<UTCTimestamp>)[] {
	const primaryDataSource = options.primarySource ?? determineSource(primaryData);
	const secondaryDataSource = options.secondarySource ?? determineSource(secondaryData);
	
	ensureTimestampData(primaryData);
	const closestIndexFinder = new ClosestTimeIndexFinder(
		ensureTimestampData(secondaryData)
	);

	const length = options.length;
	const primaryWindow: number[] = [];
	const secondaryWindow: number[] = [];

	return primaryData.map((primaryDataPoint): LineData<UTCTimestamp> | WhitespaceData<UTCTimestamp> => {
		const whitespaceData: WhitespaceData<UTCTimestamp> = {
			time: primaryDataPoint.time,
		};
		
		// ... correlation calculation logic
		// Pearson correlation formula implementation
		
		return {
			time: primaryDataPoint.time,
			value: correlation,
		};
	});
}
```

### Helper Function

```typescript
import {
	BaselineSeries,
	IChartApi,
	ISeriesApi,
	ISeriesPrimitive,
	// ... other imports
} from 'lightweight-charts';

export function applyCorrelationIndicator<
	TSeries extends SeriesType,
	TSecondSeries extends SeriesType
>(
	series: ISeriesApi<TSeries>,
	secondarySeries: ISeriesApi<TSecondSeries>,
	options: CorrelationCalculationOptions</*...*/>
): ISeriesApi<'Baseline'> {
	// Implementation similar to AveragePricePrimitive
	// Uses BaselineSeries for visualization
}
```

---

## 3. Median Price

**Description:** Calculates the median price using the formula: `(high + low) / 2`. Supports offset for shifting results.

**Live Examples:**
- [Direct calculation](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/median-price/example/direct.html)
- [Helper](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/median-price/example/helper.html)

### Calculation Function

```typescript
import {
	CandlestickData,
	LineData,
	UTCTimestamp,
	WhitespaceData,
} from 'lightweight-charts';

export type SupportedData = CandlestickData<UTCTimestamp> | WhitespaceData<UTCTimestamp>;

export interface MedianPriceCalculationOptions {
	offset?: number;
}

/**
 * Calculates a median price (with optional offset).
 * Formula: medianPrice = (high + low) / 2
 */
export function calculateMedianPriceIndicatorValues(
	data: SupportedData[],
	options: MedianPriceCalculationOptions
): (LineData<UTCTimestamp> | WhitespaceData<UTCTimestamp>)[] {
	if (data.length === 0) {
		return [];
	}

	const offset = options.offset ?? 0;
	const result = new Array(data.length);
	const startIndex = offset > 0 ? offset : 0;
	const endIndex = offset < 0 ? (data.length - 1) + offset : data.length - 1;
	let resultIndex = 0;

	for (let i = 0; i < startIndex; i++) {
		result[resultIndex] = { time: data[i].time };
		resultIndex += 1;
	}

	for (let i = startIndex; i < endIndex; i++) {
		const value = data[i];

		if ('close' in value) {
			result[resultIndex] =  { time: value.time, value: (value.high + value.low) / 2 };
		} else {
			result[resultIndex] = { time: value.time };
		}

		resultIndex += 1;
	}

	for (let i = endIndex; i < data.length; i++) {
		result[resultIndex] = { time: data[i].time };
		resultIndex += 1;
	}

	return result;
}
```

---

## 4. Momentum

**Description:** Measures the rate of price change by calculating the difference between the current price and a previous price over a specified period.

**Live Examples:**
- [Direct calculation](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/momentum/example/direct.html)
- [Helper](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/momentum/example/helper.html)

### Calculation Function

```typescript
import {
	CandlestickData,
	LineData,
	WhitespaceData,
	UTCTimestamp,
} from 'lightweight-charts';
import { ensureTimestampData } from '../../helpers/timestamp-data';

export type SupportedData = LineData<UTCTimestamp> | CandlestickData<UTCTimestamp> | WhitespaceData<UTCTimestamp>;

export interface MomentumCalculationOptions {
	source?: keyof SupportedData | (string & {});
	length: number;
}

/**
 * Calculates momentum indicator values.
 * Momentum = Current Price - Price N periods ago
 */
export function calculateMomentumIndicatorValues<TData extends SupportedData>(
	data: TData[],
	options: MomentumCalculationOptions
): (LineData<UTCTimestamp> | WhitespaceData<UTCTimestamp>)[] {
	const source = options.source ?? determineSource(data);

	ensureTimestampData(data);

	const values: (number | undefined)[] = data.map(
		d => (d as any)[source] as number | undefined
	);
	const times: UTCTimestamp[] = data.map(d => d.time as UTCTimestamp);

	const momentum: (number | undefined)[] = calculateMomentum(
		values,
		options.length
	);

	return times.map((time, i): LineData<UTCTimestamp> | WhitespaceData<UTCTimestamp> =>
		typeof momentum[i] === 'number'
			? { time, value: momentum[i] as number }
			: { time }
	);
}

function calculateMomentum(
	values: (number | undefined)[],
	length: number
): (number | undefined)[] {
	const result: (number | undefined)[] = [];

	for (let i = 0; i < values.length; ++i) {
		const v = values[i];
		if (typeof v !== 'number') {
			result.push(undefined);
			continue;
		}
		if (i < length) {
			result.push(undefined);
		} else {
			const previousValue = values[i - length];
			if (typeof previousValue !== 'number') {
				result.push(undefined);
				continue;
			}
			const momentumValue = v - previousValue;
			result.push(momentumValue);
		}
	}

	return result;
}
```

---

## 5. Moving Average

**Description:** Calculates various types of moving averages including SMA (Simple), EMA (Exponential), and WMA (Weighted). Supports smoothing and offset options.

**Live Examples:**
- [Direct calculation](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/moving-average/example/direct.html)
- [Helper](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/moving-average/example/helper.html)

### Calculation Function

```typescript
import {
	CandlestickData,
	LineData,
	WhitespaceData,
	UTCTimestamp,
} from 'lightweight-charts';
import { ensureTimestampData } from '../../helpers/timestamp-data';

export type SupportedData = LineData<UTCTimestamp> | CandlestickData<UTCTimestamp> | WhitespaceData<UTCTimestamp>;
export type MovingAverageSmoothing = 'SMA' | 'EMA' | 'WMA';

export interface MovingAverageCalculationOptions<TData extends SupportedData> {
	source?: keyof TData | (string & {});
	length: number;
	offset?: number;
	smoothingLine?: MovingAverageSmoothing;
	smoothingLength?: number;
}

/**
 * Calculates a moving average (with optional smoothing and offset).
 */
export function calculateMovingAverageIndicatorValues<TData extends SupportedData>(
	data: TData[],
	options: MovingAverageCalculationOptions<TData>
): (LineData<UTCTimestamp> | WhitespaceData<UTCTimestamp>)[] {
	const source = options.source ?? determineSource(data);

	ensureTimestampData(data);

	const values: (number | undefined)[] = data.map(
		d => (d as any)[source] as number | undefined
	);
	const times: UTCTimestamp[] = data.map(d => d.time as UTCTimestamp);

	// Compute main moving average
	const ma: (number | undefined)[] = simpleMovingAverage(
		values,
		options.length
	);

	// Optionally apply smoothing
	let final: (number | undefined)[] = ma;
	if (options.smoothingLine && options.smoothingLength && options.smoothingLength > 1) {
		final = smoothLine(ma, options.smoothingLine, options.smoothingLength);
	}

	// Optionally apply offset
	let offset = options.offset ?? 0;
	if (offset !== 0) {
		if (offset > 0) {
			final = Array(offset).fill(undefined).concat(final.slice(0, final.length - offset));
		} else if (offset < 0) {
			final = final.slice(-offset).concat(Array(-offset).fill(undefined));
		}
	}

	return times.map((time, i) =>
		typeof final[i] === 'number'
			? { time, value: final[i] as number }
			: { time }
	);
}

function simpleMovingAverage(values: (number | undefined)[], length: number): (number | undefined)[] {
	const result: (number | undefined)[] = [];
	let sum = 0;
	let count = 0;
	const window: number[] = [];
	
	for (let i = 0; i < values.length; ++i) {
		const v = values[i];
		if (typeof v !== 'number') {
			result.push(undefined);
			continue;
		}
		window.push(v);
		sum += v;
		count += 1;
		if (window.length > length) {
			const removed = window.shift()!;
			sum -= removed;
			count -= 1;
		}
		if (window.length === length && window.every(x => !isNaN(x))) {
			result.push(sum / length);
		} else {
			result.push(undefined);
		}
	}
	return result;
}

function exponentialMovingAverage(values: (number | undefined)[], length: number): (number | undefined)[] {
	const result: (number | undefined)[] = [];
	let ema: number | undefined = undefined;
	const k = 2 / (length + 1);
	
	for (let i = 0; i < values.length; ++i) {
		const v = values[i];
		if (typeof v !== 'number') {
			result.push(undefined);
			continue;
		}
		if (ema === undefined) {
			ema = v;
		} else {
			ema = v * k + ema * (1 - k);
		}
		result.push(ema);
	}
	for (let i = 0; i < length - 1 && i < result.length; ++i) {
		result[i] = undefined;
	}
	return result;
}

function weightedMovingAverage(values: (number | undefined)[], length: number): (number | undefined)[] {
	const result: (number | undefined)[] = [];
	const weights = Array.from({ length }, (_, i) => i + 1);
	const weightSum = weights.reduce((a, b) => a + b, 0);
	
	for (let i = 0; i < values.length; ++i) {
		if (i < length - 1) {
			result.push(undefined);
			continue;
		}
		let sum = 0;
		let valid = true;
		for (let j = 0; j < length; ++j) {
			const v = values[i - length + 1 + j];
			if (typeof v !== 'number') {
				valid = false;
				break;
			}
			sum += v * weights[j];
		}
		result.push(valid ? sum / weightSum : undefined);
	}
	return result;
}
```

---

## 6. Percent Change

**Description:** Calculates the percentage change between consecutive price points.

**Live Examples:**
- [Direct calculation](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/percent-change/example/direct.html)
- [Helper](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/percent-change/example/helper.html)

### Calculation Function

```typescript
import {
	CandlestickData,
	LineData,
	UTCTimestamp,
	WhitespaceData,
} from 'lightweight-charts';

export type SupportedData = CandlestickData<UTCTimestamp> | WhitespaceData<UTCTimestamp>;

export interface PercentChangeCalculationOptions {
	offset?: number;
}

/**
 * Calculates percent change.
 * Formula: percentChange = (current price - previous price) * 100 / previous price
 */
export function calculatePercentChangeIndicatorValues<TData extends SupportedData>(
	data: TData[],
	options: PercentChangeCalculationOptions
): (LineData<UTCTimestamp> | WhitespaceData<UTCTimestamp>)[] {
	if (data.length === 0) {
		return [];
	}

	const offset = options.offset ?? 0;
	const result = new Array(data.length);
	const startIndex = offset > 0 ? offset : 0;
	const endIndex = offset < 0 ? (data.length - 1) + offset : data.length - 1;
	let resultIndex = 0;

	for (let i = 0; i < startIndex; i++) {
		result[resultIndex] = { time: data[i].time };
		resultIndex += 1;
	}

	for (let i = startIndex; i < endIndex; i++) {
		const currentValue = data[i];

		if (i === 0) {
			result[resultIndex] = { time: currentValue.time, value: undefined };
			resultIndex += 1;
			continue;
		}

		const previousValue = data[i - 1];

		if ('close' in currentValue && 'close' in previousValue) {
			const percentChange = ((currentValue.close - previousValue.close) * 100) / previousValue.close;
			result[resultIndex] = { time: currentValue.time, value: percentChange };
		} else {
			result[resultIndex] = { time: currentValue.time };
		}

		resultIndex += 1;
	}

	for (let i = endIndex; i < data.length; i++) {
		result[resultIndex] = { time: data[i].time };
		resultIndex += 1;
	}

	return result;
}
```

---

## 7. Product

**Description:** Multiplies corresponding values from two data series. Useful for calculating notional values or synthetic instruments.

**Live Examples:**
- [Direct calculation](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/product/example/direct.html)
- [Helper](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/product/example/helper.html)

### Calculation Function

```typescript
import {
	CandlestickData,
	LineData,
	UTCTimestamp,
	WhitespaceData,
} from 'lightweight-charts';
import { ClosestTimeIndexFinder } from '../../helpers/closest-index';
import { ensureTimestampData } from '../../helpers/timestamp-data';

export type SupportedData = LineData<UTCTimestamp> | CandlestickData<UTCTimestamp> | WhitespaceData<UTCTimestamp>;

export interface ProductCalculationOptions<
	TPrimaryData extends SupportedData,
	TSecondaryData extends SupportedData
> {
	primarySource?: keyof TPrimaryData | (string & {});
	secondarySource?: keyof TSecondaryData | (string & {});
	allowMismatchedDates?: boolean;
}

/**
 * Calculates product indicator values between two data series.
 * Result = Primary Value * Secondary Value
 */
export function calculateProductIndicatorValues<
	TPrimaryData extends SupportedData,
	TSecondaryData extends SupportedData
>(
	primaryData: TPrimaryData[],
	secondaryData: TSecondaryData[],
	options: ProductCalculationOptions<TPrimaryData, TSecondaryData>
): (LineData<UTCTimestamp> | WhitespaceData<UTCTimestamp>)[] {
	const primaryDataSource = options.primarySource ?? determineSource(primaryData);
	const secondaryDataSource = options.secondarySource ?? determineSource(secondaryData);
	
	ensureTimestampData(primaryData);
	const closestIndexFinder = new ClosestTimeIndexFinder(
		ensureTimestampData(secondaryData)
	);
	
	return primaryData.map((primaryDataPoint): LineData<UTCTimestamp> | WhitespaceData<UTCTimestamp> => {
		const whitespaceData: WhitespaceData<UTCTimestamp> = {
			time: primaryDataPoint.time,
		};
		const primaryValue = primaryDataPoint[primaryDataSource as never] as number | undefined;
		if (primaryValue === undefined) {
			return whitespaceData;
		}
		
		const comparisonDataIndex = closestIndexFinder.findClosestIndex(
			primaryDataPoint.time as UTCTimestamp,
			'left'
		);
		const secondaryValue = secondaryData[comparisonDataIndex][
			secondaryDataSource as never
		] as number | undefined;
		
		if (
			secondaryValue === undefined ||
			(!options.allowMismatchedDates &&
				secondaryData[comparisonDataIndex].time !== primaryDataPoint.time)
		) {
			return whitespaceData;
		}
		
		return {
			time: primaryDataPoint.time,
			value: primaryValue * secondaryValue,
		};
	});
}
```

---

## 8. Ratio

**Description:** Divides values from the primary series by values from the secondary series. Useful for comparing relative performance or creating spread ratios.

**Live Examples:**
- [Direct calculation](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/ratio/example/direct.html)
- [Helper](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/ratio/example/helper.html)

### Calculation Function

```typescript
// Similar structure to Product, but uses division:
return {
	time: primaryDataPoint.time,
	value: primaryValue / secondaryValue,
};
```

---

## 9. Spread

**Description:** Calculates the difference between two data series. Commonly used for pair trading or comparing related instruments.

**Live Examples:**
- [Direct calculation](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/spread/example/direct.html)
- [Helper](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/spread/example/helper.html)

### Calculation Function

```typescript
// Similar structure to Product, but uses subtraction:
return {
	time: primaryDataPoint.time,
	value: primaryValue - secondaryValue,
};
```

---

## 10. Sum

**Description:** Adds corresponding values from two data series. Useful for combining related metrics or creating composite indicators.

**Live Examples:**
- [Direct calculation](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/sum/example/direct.html)
- [Helper](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/sum/example/helper.html)

### Calculation Function

```typescript
// Similar structure to Product, but uses addition:
return {
	time: primaryDataPoint.time,
	value: primaryValue + secondaryValue,
};
```

---

## 11. Weighted Close

**Description:** Calculates a weighted close price that gives more weight to the closing price. Formula: `(close * weight + high + low) / (2 + weight)`. Default weight is 2.

**Live Examples:**
- [Direct calculation](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/weighted-close/example/direct.html)
- [Helper](https://tradingview.github.io/lightweight-charts/indicator-examples/indicators/weighted-close/example/helper.html)

### Calculation Function

```typescript
import {
	CandlestickData,
	LineData,
	UTCTimestamp,
	WhitespaceData,
} from 'lightweight-charts';

const DEFAULT_WEIGHT = 2;

export type SupportedData = CandlestickData<UTCTimestamp> | WhitespaceData<UTCTimestamp>;

export interface WeightedCloseCalculationOptions {
	offset?: number;
	weight?: number;
}

/**
 * Calculates a weighted close (with optional offset and weight).
 * Formula: ((close * weight) + high + low) / (2 + weight)
 */
export function calculateWeightedCloseIndicatorValues(
	data: (CandlestickData<UTCTimestamp> | WhitespaceData<UTCTimestamp>)[],
	options: WeightedCloseCalculationOptions
): (LineData<UTCTimestamp> | WhitespaceData<UTCTimestamp>)[] {
	if (data.length === 0) {
		return [];
	}

	const offset = options.offset ?? 0;
	const weight = options.weight ?? DEFAULT_WEIGHT;
	const result = new Array(data.length);
	const startIndex = offset > 0 ? offset : 0;
	const endIndex = offset < 0 ? (data.length - 1) + offset : data.length - 1;
	let resultIndex = 0;

	for (let i = 0; i < startIndex; i++) {
		result[resultIndex] = { time: data[i].time };
		resultIndex += 1;
	}

	for (let i = startIndex; i < endIndex; i++) {
		const value = data[i];

		if ('close' in value) {
			result[resultIndex] =  { time: value.time, value: ((value.close * weight) + value.high + value.low) / (2 + weight) };
		} else {
			result[resultIndex] = { time: value.time };
		}

		resultIndex += 1;
	}

	for (let i = endIndex; i < data.length; i++) {
		result[resultIndex] = { time: data[i].time };
		resultIndex += 1;
	}

	return result;
}
```

---

## Source Code Repository

All indicator source code is available in the Lightweight Charts GitHub repository:

- **Main indicator examples directory:** `https://github.com/tradingview/lightweight-charts/tree/master/indicator-examples/src/indicators`
- **Helper utilities:** `https://github.com/tradingview/lightweight-charts/tree/master/indicator-examples/src/helpers`

---

## Notes

- All indicators support both **Direct Calculation** (manual data processing) and **Helper Functions** (automatic updates via primitives)
- Two-series indicators (Correlation, Product, Ratio, Spread, Sum) use the `ClosestTimeIndexFinder` for time matching
- The `allowMismatchedDates` option allows calculations even when timestamps don't exactly match between series
- Most indicators support an `offset` parameter to shift results forward or backward
