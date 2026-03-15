/**
 * Built-in Moving Average Indicators
 * 
 * SMA, EMA, WMA, HMA, VWMA, DEMA, TEMA, KAMA, etc.
 */

import { BuiltInIndicator } from './builtin-types';

export const MOVING_AVERAGE_INDICATORS: BuiltInIndicator[] = [
  {
    id: 'sma',
    name: 'Simple Moving Average',
    category: 'moving_average',
    description: 'Simple Moving Average - среднее арифметическое цен за указанный период',
    pineCode: `//@version=5
indicator("SMA", overlay=true)
length = input.int(20, "Length", minval=1)
src = close
out = ta.sma(src, length)
plot(out, color=color.blue, title="SMA")`,
    inputSchema: [
      { name: 'length', type: 'int', default: 20, min: 1, max: 500 },
    ],
    outputConfig: [
      { name: 'sma', type: 'line', color: '#2962FF' },
    ],
    overlay: true,
    author: 'CITARION',
  },
  {
    id: 'ema',
    name: 'Exponential Moving Average',
    category: 'moving_average',
    description: 'EMA быстрее реагирует на последние цены, чем SMA',
    pineCode: `//@version=5
indicator("EMA", overlay=true)
length = input.int(20, "Length", minval=1)
src = close
out = ta.ema(src, length)
plot(out, color=color.green, title="EMA")`,
    inputSchema: [
      { name: 'length', type: 'int', default: 20, min: 1, max: 500 },
    ],
    outputConfig: [
      { name: 'ema', type: 'line', color: '#00C853' },
    ],
    overlay: true,
    author: 'CITARION',
  },
  {
    id: 'ema_cross',
    name: 'EMA Cross',
    category: 'moving_average',
    description: 'Две EMA для определения тренда и точек входа/выхода',
    pineCode: `//@version=5
indicator("EMA Cross", overlay=true)
fastLength = input.int(9, "Fast Length", minval=1)
slowLength = input.int(21, "Slow Length", minval=1)
fastEMA = ta.ema(close, fastLength)
slowEMA = ta.ema(close, slowLength)
plot(fastEMA, color=color.green, title="Fast EMA")
plot(slowEMA, color=color.red, title="Slow EMA")`,
    inputSchema: [
      { name: 'fastLength', type: 'int', default: 9, min: 1, max: 200 },
      { name: 'slowLength', type: 'int', default: 21, min: 1, max: 500 },
    ],
    outputConfig: [
      { name: 'fast', type: 'line', color: '#00C853' },
      { name: 'slow', type: 'line', color: '#F6465D' },
    ],
    overlay: true,
    author: 'CITARION',
  },
  {
    id: 'wma',
    name: 'Weighted Moving Average',
    category: 'moving_average',
    description: 'WMA придаёт больший вес недавним ценам, обеспечивая более быструю реакцию на изменения цены',
    pineCode: `//@version=5
indicator("WMA", overlay=true)
length = input.int(20, "Length", minval=1)
out = ta.wma(close, length)
plot(out, color=color.blue, title="WMA")`,
    inputSchema: [
      { name: 'length', type: 'int', default: 20, min: 1, max: 500 },
    ],
    outputConfig: [
      { name: 'wma', type: 'line', color: '#2196F3' },
    ],
    overlay: true,
    author: 'CITARION',
  },
  {
    id: 'hma',
    name: 'Hull Moving Average',
    category: 'moving_average',
    description: 'HMA - быстрая и сглаженная скользящая средняя, разработанная Аланом Халлом для уменьшения лага',
    pineCode: `//@version=5
indicator("HMA", overlay=true)
length = input.int(20, "Length", minval=1)
out = ta.hma(close, length)
plot(out, color=color.orange, title="HMA")`,
    inputSchema: [
      { name: 'length', type: 'int', default: 20, min: 1, max: 500 },
    ],
    outputConfig: [
      { name: 'hma', type: 'line', color: '#FF9800' },
    ],
    overlay: true,
    author: 'CITARION',
  },
  {
    id: 'vwma',
    name: 'Volume Weighted Moving Average',
    category: 'moving_average',
    description: 'VWMA взвешивает цены по объёму, что даёт более точное представление о тренде с учётом торговой активности',
    pineCode: `//@version=5
indicator("VWMA", overlay=true)
length = input.int(20, "Length", minval=1)
out = ta.vwma(close, length)
plot(out, color=color.purple, title="VWMA")`,
    inputSchema: [
      { name: 'length', type: 'int', default: 20, min: 1, max: 500 },
    ],
    outputConfig: [
      { name: 'vwma', type: 'line', color: '#9C27B0' },
    ],
    overlay: true,
    author: 'CITARION',
  },
  {
    id: 'smma',
    name: 'Smoothed Moving Average',
    category: 'moving_average',
    description: 'SMMA (Wilder\'s MA) - сглаженная скользящая средняя, используемая в RSI и ATR для уменьшения шума',
    pineCode: `//@version=5
indicator("SMMA", overlay=true)
length = input.int(20, "Length", minval=1)
out = ta.rma(close, length)
plot(out, color=color.teal, title="SMMA")`,
    inputSchema: [
      { name: 'length', type: 'int', default: 20, min: 1, max: 500 },
    ],
    outputConfig: [
      { name: 'smma', type: 'line', color: '#009688' },
    ],
    overlay: true,
    author: 'CITARION',
  },
  {
    id: 'lsma',
    name: 'Linear Regression MA',
    category: 'moving_average',
    description: 'LSMA - скользящая средняя на основе линейной регрессии, предсказывает будущее значение цены',
    pineCode: `//@version=5
indicator("LSMA", overlay=true)
length = input.int(20, "Length", minval=1)
out = ta.linreg(close, length, 0)
plot(out, color=color.cyan, title="LSMA")`,
    inputSchema: [
      { name: 'length', type: 'int', default: 20, min: 1, max: 500 },
    ],
    outputConfig: [
      { name: 'lsma', type: 'line', color: '#00BCD4' },
    ],
    overlay: true,
    author: 'CITARION',
  },
  {
    id: 'dema',
    name: 'Double EMA',
    category: 'moving_average',
    description: 'DEMA - двойная экспоненциальная скользящая средняя с меньшим лагом, чем обычная EMA',
    pineCode: `//@version=5
indicator("DEMA", overlay=true)
length = input.int(20, "Length", minval=1)
out = ta.dema(close, length)
plot(out, color=color.lime, title="DEMA")`,
    inputSchema: [
      { name: 'length', type: 'int', default: 20, min: 1, max: 500 },
    ],
    outputConfig: [
      { name: 'dema', type: 'line', color: '#CDDC39' },
    ],
    overlay: true,
    author: 'CITARION',
  },
  {
    id: 'tema',
    name: 'Triple EMA',
    category: 'moving_average',
    description: 'TEMA - тройная экспоненциальная скользящая средняя с ещё меньшим лагом, чем DEMA',
    pineCode: `//@version=5
indicator("TEMA", overlay=true)
length = input.int(20, "Length", minval=1)
out = ta.tema(close, length)
plot(out, color=color.yellow, title="TEMA")`,
    inputSchema: [
      { name: 'length', type: 'int', default: 20, min: 1, max: 500 },
    ],
    outputConfig: [
      { name: 'tema', type: 'line', color: '#FFEB3B' },
    ],
    overlay: true,
    author: 'CITARION',
  },
  {
    id: 'kama',
    name: 'Kaufman Adaptive MA',
    category: 'moving_average',
    description: 'KAMA - адаптивная скользящая средняя Перри Кауфмана, автоматически регулирует скорость в зависимости от волатильности',
    pineCode: `//@version=5
indicator("KAMA", overlay=true)
length = input.int(10, "Length", minval=1)
fast = input.int(2, "Fast Length", minval=1)
slow = input.int(30, "Slow Length", minval=1)
out = ta.kama(close, length, fast, slow)
plot(out, color=color.fuchsia, title="KAMA")`,
    inputSchema: [
      { name: 'length', type: 'int', default: 10, min: 1, max: 200 },
      { name: 'fastLength', type: 'int', default: 2, min: 1, max: 50 },
      { name: 'slowLength', type: 'int', default: 30, min: 1, max: 100 },
    ],
    outputConfig: [
      { name: 'kama', type: 'line', color: '#E91E63' },
    ],
    overlay: true,
    author: 'CITARION',
  },
  {
    id: 'vidya',
    name: 'Variable Index DYMA',
    category: 'moving_average',
    description: 'VIDYA - переменная индексная динамическая скользящая средняя, адаптируется к волатильности через CMO',
    pineCode: `//@version=5
indicator("VIDYA", overlay=true)
length = input.int(20, "Length", minval=1)
cmoPeriod = input.int(10, "CMO Period", minval=1)
out = ta.vidya(close, length, cmoPeriod)
plot(out, color=color.maroon, title="VIDYA")`,
    inputSchema: [
      { name: 'length', type: 'int', default: 20, min: 1, max: 500 },
      { name: 'cmoPeriod', type: 'int', default: 10, min: 1, max: 100 },
    ],
    outputConfig: [
      { name: 'vidya', type: 'line', color: '#7B1FA2' },
    ],
    overlay: true,
    author: 'CITARION',
  },
  {
    id: 'mcginley',
    name: 'McGinley Dynamic',
    category: 'moving_average',
    description: 'McGinley Dynamic - адаптивная скользящая средняя, автоматически подстраивается под скорость рынка',
    pineCode: `//@version=5
indicator("McGinley Dynamic", overlay=true)
length = input.int(10, "Length", minval=1)
out = 0.0
out := nz(out[1]) + (close - nz(out[1])) / (length * math.pow(close / nz(out[1]), 4))
plot(out, color=color.olive, title="McGinley")`,
    inputSchema: [
      { name: 'length', type: 'int', default: 10, min: 1, max: 500 },
    ],
    outputConfig: [
      { name: 'mcginley', type: 'line', color: '#8BC34A' },
    ],
    overlay: true,
    author: 'CITARION',
  },
  {
    id: 'rolling_vwap',
    name: 'Rolling VWAP',
    category: 'moving_average',
    description: 'Rolling VWAP - скользящая VWAP за указанный период, комбинирует средневзвешенную цену с ограниченным периодом',
    pineCode: `//@version=5
indicator("Rolling VWAP", overlay=true)
length = input.int(20, "Length", minval=1)
out = ta.vwap(close, length)
plot(out, color=color.navy, title="Rolling VWAP")`,
    inputSchema: [
      { name: 'length', type: 'int', default: 20, min: 1, max: 500 },
    ],
    outputConfig: [
      { name: 'rolling_vwap', type: 'line', color: '#3F51B5' },
    ],
    overlay: true,
    author: 'CITARION',
  },
];
