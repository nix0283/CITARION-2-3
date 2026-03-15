/**
 * Built-in Volume Indicators
 * 
 * Volume SMA, OBV, CMF, ADL, Volume Oscillator, EMV
 */

import { BuiltInIndicator } from './builtin-types';

export const VOLUME_INDICATORS: BuiltInIndicator[] = [
  {
    id: 'vol_sma',
    name: 'Volume SMA',
    category: 'volume',
    description: 'SMA объёма показывает средний объём торгов',
    pineCode: `//@version=5
indicator("Volume SMA", overlay=false)
length = input.int(20, "Length", minval=1)
vol = volume
volSMA = ta.sma(vol, length)
plot(vol, "Volume", style=plot.style_columns, color=color.new(color.blue, 50))
plot(volSMA, "Volume SMA", color=color.orange)`,
    inputSchema: [
      { name: 'length', type: 'int', default: 20, min: 1, max: 200 },
    ],
    outputConfig: [
      { name: 'volume', type: 'histogram', color: '#2962FF' },
      { name: 'volSMA', type: 'line', color: '#FF6D00' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'obv',
    name: 'On-Balance Volume',
    category: 'volume',
    description: 'OBV - кумулятивный индикатор объёма, добавляет объём при росте цены и вычитает при падении',
    pineCode: `//@version=5
indicator("OBV", overlay=false)
obv = ta.obv
plot(obv, "OBV", color=color.blue)`,
    inputSchema: [],
    outputConfig: [
      { name: 'obv', type: 'line', color: '#2962FF' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'cmf',
    name: 'Chaikin Money Flow',
    category: 'volume',
    description: 'CMF - индикатор денежного потока Чайкина, измеряет давление покупки/продажи на основе объёма',
    pineCode: `//@version=5
indicator("CMF", overlay=false)
length = input.int(20, "Length")
cmf = ta.cmf(close, high, low, volume, length)
plot(cmf, "CMF", color=color.green)
hline(0, "Zero", color=color.gray)`,
    inputSchema: [
      { name: 'length', type: 'int', default: 20, min: 1, max: 200 },
    ],
    outputConfig: [
      { name: 'cmf', type: 'line', color: '#26A69A' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'adl',
    name: 'Accumulation/Distribution Line',
    category: 'volume',
    description: 'ADL - линия накопления/распределения, кумулятивный индикатор на основе позиции закрытия в диапазоне',
    pineCode: `//@version=5
indicator("ADL", overlay=false)
ad = ta.ad
plot(ad, "ADL", color=color.blue)`,
    inputSchema: [],
    outputConfig: [
      { name: 'adl', type: 'line', color: '#2962FF' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'vol_osc',
    name: 'Volume Oscillator',
    category: 'volume',
    description: 'Volume Oscillator - разница между двумя MA объёма, показывает тренд объёма',
    pineCode: `//@version=5
indicator("Volume Oscillator", overlay=false)
fastLength = input.int(5, "Fast Length")
slowLength = input.int(10, "Slow Length")
volOsc = ta.sma(volume, fastLength) - ta.sma(volume, slowLength)
plot(volOsc, "Volume Osc", style=plot.style_histogram, color=volOsc >= 0 ? color.green : color.red)`,
    inputSchema: [
      { name: 'fastLength', type: 'int', default: 5, min: 1, max: 100 },
      { name: 'slowLength', type: 'int', default: 10, min: 1, max: 200 },
    ],
    outputConfig: [
      { name: 'vol_osc', type: 'histogram', color: '#26A69A' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'emv',
    name: 'Ease of Movement',
    category: 'volume',
    description: 'EMV - индикатор лёгкости движения, показывает связь между ценой и объёмом',
    pineCode: `//@version=5
indicator("Ease of Movement", overlay=false)
length = input.int(14, "Length")
divisor = input.int(10000, "Divisor")
emv = ta.emv(close, high, low, volume, divisor)
plot(ta.sma(emv, length), "EMV", color=color.teal)
hline(0, "Zero", color=color.gray)`,
    inputSchema: [
      { name: 'length', type: 'int', default: 14, min: 1, max: 100 },
      { name: 'divisor', type: 'int', default: 10000, min: 100, max: 100000 },
    ],
    outputConfig: [
      { name: 'emv', type: 'line', color: '#009688' },
    ],
    overlay: false,
    author: 'CITARION',
  },
];
