/**
 * Built-in Volatility Indicators
 * 
 * Bollinger Bands, ATR, Keltner, Donchian, Standard Deviation, etc.
 */

import { BuiltInIndicator } from './builtin-types';

export const VOLATILITY_INDICATORS: BuiltInIndicator[] = [
  {
    id: 'bb',
    name: 'Bollinger Bands',
    category: 'volatility',
    description: 'Bollinger Bands показывают волатильность и потенциальные развороты',
    pineCode: `//@version=5
indicator("Bollinger Bands", overlay=true)
length = input.int(20, "Length", minval=1)
mult = input.float(2.0, "Multiplier", minval=0.1, step=0.1)
src = close
basis = ta.sma(src, length)
dev = mult * ta.stdev(src, length)
upper = basis + dev
lower = basis - dev
plot(basis, "Basis", color=color.orange)
p1 = plot(upper, "Upper", color=color.blue)
p2 = plot(lower, "Lower", color=color.blue)
fill(p1, p2, color=color.blue, transp=90)`,
    inputSchema: [
      { name: 'length', type: 'int', default: 20, min: 1, max: 200 },
      { name: 'mult', type: 'float', default: 2.0, min: 0.1, max: 5.0 },
    ],
    outputConfig: [
      { name: 'upper', type: 'line', color: '#2962FF' },
      { name: 'middle', type: 'line', color: '#FF6D00' },
      { name: 'lower', type: 'line', color: '#2962FF' },
    ],
    overlay: true,
    author: 'CITARION',
  },
  {
    id: 'atr',
    name: 'Average True Range',
    category: 'volatility',
    description: 'ATR измеряет волатильность рынка',
    pineCode: `//@version=5
indicator("ATR", overlay=false)
length = input.int(14, "Length", minval=1)
atr = ta.atr(length)
plot(atr, "ATR", color=color.orange)`,
    inputSchema: [
      { name: 'length', type: 'int', default: 14, min: 1, max: 100 },
    ],
    outputConfig: [
      { name: 'atr', type: 'line', color: '#FF6D00' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'true_range',
    name: 'True Range',
    category: 'volatility',
    description: 'True Range - истинный диапазон, измеряет волатильность одного периода с учётом гэпов',
    pineCode: `//@version=5
indicator("True Range", overlay=false)
tr = ta.tr
plot(tr, "TR", color=color.orange)`,
    inputSchema: [],
    outputConfig: [
      { name: 'true_range', type: 'line', color: '#FF6D00' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'donchian',
    name: 'Donchian Channels',
    category: 'volatility',
    description: 'Donchian Channels - канал из максимума и минимума за период, показывает границы ценового диапазона',
    pineCode: `//@version=5
indicator("Donchian Channels", overlay=true)
length = input.int(20, "Length")
upper = ta.highest(high, length)
lower = ta.lowest(low, length)
middle = (upper + lower) / 2
plot(upper, "Upper", color=color.blue)
plot(middle, "Middle", color=color.orange)
plot(lower, "Lower", color=color.blue)`,
    inputSchema: [
      { name: 'length', type: 'int', default: 20, min: 1, max: 200 },
    ],
    outputConfig: [
      { name: 'upper', type: 'line', color: '#2962FF' },
      { name: 'middle', type: 'line', color: '#FF6D00' },
      { name: 'lower', type: 'line', color: '#2962FF' },
    ],
    overlay: true,
    author: 'CITARION',
  },
  {
    id: 'stddev',
    name: 'Standard Deviation',
    category: 'volatility',
    description: 'Standard Deviation - стандартное отклонение цены, измеряет разброс цен относительно средней',
    pineCode: `//@version=5
indicator("Standard Deviation", overlay=false)
length = input.int(20, "Length")
std = ta.stdev(close, length)
plot(std, "StdDev", color=color.purple)`,
    inputSchema: [
      { name: 'length', type: 'int', default: 20, min: 1, max: 200 },
    ],
    outputConfig: [
      { name: 'stddev', type: 'line', color: '#9C27B0' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'hist_vol',
    name: 'Historical Volatility',
    category: 'volatility',
    description: 'Historical Volatility - историческая волатильность, годовое стандартное отклонение доходности',
    pineCode: `//@version=5
indicator("Historical Volatility", overlay=false)
length = input.int(20, "Length")
annualize = input.bool(true, "Annualize")
returns = ta.log(close / close[1])
std = ta.stdev(returns, length)
hv = annualize ? std * math.sqrt(252) * 100 : std * 100
plot(hv, "HV", color=color.teal)`,
    inputSchema: [
      { name: 'length', type: 'int', default: 20, min: 1, max: 200 },
      { name: 'annualize', type: 'bool', default: true },
    ],
    outputConfig: [
      { name: 'hist_vol', type: 'line', color: '#009688' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'natr',
    name: 'Normalized ATR',
    category: 'volatility',
    description: 'NATR - нормализованный ATR в процентах от цены, позволяет сравнивать волатильность разных активов',
    pineCode: `//@version=5
indicator("NATR", overlay=false)
length = input.int(14, "Length")
natr = ta.atr(length) / close * 100
plot(natr, "NATR", color=color.orange)`,
    inputSchema: [
      { name: 'length', type: 'int', default: 14, min: 1, max: 100 },
    ],
    outputConfig: [
      { name: 'natr', type: 'line', color: '#FF6D00' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'psar',
    name: 'Parabolic SAR',
    category: 'volatility',
    description: 'Parabolic SAR - Stop And Reverse, показывает уровни стоп-лосс и направление тренда',
    pineCode: `//@version=5
indicator("Parabolic SAR", overlay=true)
start = input.float(0.02, "Start")
increment = input.float(0.02, "Increment")
maximum = input.float(0.2, "Maximum")
sar = ta.sar(start, increment, maximum)
plot(sar, "SAR", style=plot.style_circles, color=color.red)`,
    inputSchema: [
      { name: 'start', type: 'float', default: 0.02, min: 0.001, max: 0.1 },
      { name: 'increment', type: 'float', default: 0.02, min: 0.001, max: 0.1 },
      { name: 'maximum', type: 'float', default: 0.2, min: 0.01, max: 0.5 },
    ],
    outputConfig: [
      { name: 'psar', type: 'line', color: '#EF5350' },
    ],
    overlay: true,
    author: 'CITARION',
  },
];
