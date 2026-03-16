/**
 * Built-in Oscillator Indicators
 * 
 * RSI, MACD, StochRSI, CCI, MFI, Williams %R, etc.
 */

import { BuiltInIndicator } from './builtin-types';

export const OSCILLATOR_INDICATORS: BuiltInIndicator[] = [
  {
    id: 'rsi',
    name: 'Relative Strength Index',
    category: 'oscillator',
    description: 'RSI измеряет скорость и изменение ценовых движений. Значения 0-100',
    pineCode: `//@version=5
indicator("RSI", overlay=false)
length = input.int(14, "Length", minval=1)
src = close
rsi = ta.rsi(src, length)
plot(rsi, color=color.purple, title="RSI")
hline(70, "Overbought", color=color.red)
hline(30, "Oversold", color=color.green)`,
    inputSchema: [
      { name: 'length', type: 'int', default: 14, min: 1, max: 100 },
    ],
    outputConfig: [
      { name: 'rsi', type: 'line', color: '#D500F9' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'macd',
    name: 'MACD',
    category: 'oscillator',
    description: 'Moving Average Convergence Divergence - трендовый индикатор',
    pineCode: `//@version=5
indicator("MACD", overlay=false)
fastLength = input.int(12, "Fast Length")
slowLength = input.int(26, "Slow Length")
signalLength = input.int(9, "Signal Length")
fastMA = ta.ema(close, fastLength)
slowMA = ta.ema(close, slowLength)
macd = fastMA - slowMA
signal = ta.ema(macd, signalLength)
hist = macd - signal
plot(macd, "MACD", color=color.blue)
plot(signal, "Signal", color=color.orange)
plot(hist, "Histogram", style=plot.style_histogram, color=color.green)`,
    inputSchema: [
      { name: 'fastLength', type: 'int', default: 12, min: 1, max: 100 },
      { name: 'slowLength', type: 'int', default: 26, min: 1, max: 200 },
      { name: 'signalLength', type: 'int', default: 9, min: 1, max: 100 },
    ],
    outputConfig: [
      { name: 'macd', type: 'line', color: '#2962FF' },
      { name: 'signal', type: 'line', color: '#FF6D00' },
      { name: 'histogram', type: 'histogram', color: '#26a69a' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'stochrsi',
    name: 'Stochastic RSI',
    category: 'oscillator',
    description: 'StochRSI - стохастический осциллятор, применённый к RSI. Более чувствителен к изменениям цены, чем обычный RSI',
    pineCode: `//@version=5
indicator("StochRSI", overlay=false)
rsiPeriod = input.int(14, "RSI Period")
stochPeriod = input.int(14, "Stochastic Period")
kPeriod = input.int(3, "%K Smooth")
dPeriod = input.int(3, "%D Smooth")
rsiVal = ta.rsi(close, rsiPeriod)
k = ta.sma(ta.stoch(rsiVal, rsiVal, rsiVal, stochPeriod), kPeriod)
d = ta.sma(k, dPeriod)
plot(k, "%K", color=color.blue)
plot(d, "%D", color=color.orange)`,
    inputSchema: [
      { name: 'rsiPeriod', type: 'int', default: 14, min: 1, max: 100 },
      { name: 'stochPeriod', type: 'int', default: 14, min: 1, max: 100 },
      { name: 'kPeriod', type: 'int', default: 3, min: 1, max: 50 },
      { name: 'dPeriod', type: 'int', default: 3, min: 1, max: 50 },
    ],
    outputConfig: [
      { name: 'k', type: 'line', color: '#2962FF' },
      { name: 'd', type: 'line', color: '#FF6D00' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'ppo',
    name: 'PPO',
    category: 'oscillator',
    description: 'Percentage Price Oscillator - процентная версия MACD, показывает разницу между двумя EMA в процентах',
    pineCode: `//@version=5
indicator("PPO", overlay=false)
fastLength = input.int(12, "Fast Length")
slowLength = input.int(26, "Slow Length")
signalLength = input.int(9, "Signal Length")
ppo = ta.ema(close, fastLength) - ta.ema(close, slowLength)
signal = ta.ema(ppo, signalLength)
histogram = ppo - signal
plot(ppo, "PPO", color=color.blue)
plot(signal, "Signal", color=color.orange)
plot(histogram, "Histogram", style=plot.style_histogram, color=color.green)`,
    inputSchema: [
      { name: 'fastLength', type: 'int', default: 12, min: 1, max: 100 },
      { name: 'slowLength', type: 'int', default: 26, min: 1, max: 200 },
      { name: 'signalLength', type: 'int', default: 9, min: 1, max: 100 },
    ],
    outputConfig: [
      { name: 'ppo', type: 'line', color: '#2962FF' },
      { name: 'signal', type: 'line', color: '#FF6D00' },
      { name: 'histogram', type: 'histogram', color: '#26a69a' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'williams_r',
    name: 'Williams %R',
    category: 'oscillator',
    description: 'Williams %R - моментум-индикатор, показывающий уровень закрытия относительно максимума за период. Диапазон от -100 до 0',
    pineCode: `//@version=5
indicator("Williams %R", overlay=false)
length = input.int(14, "Length")
wr = ta.wpr(length)
plot(wr, "%R", color=color.purple)
hline(-20, "Overbought", color=color.red)
hline(-80, "Oversold", color=color.green)`,
    inputSchema: [
      { name: 'length', type: 'int', default: 14, min: 1, max: 100 },
    ],
    outputConfig: [
      { name: 'williams_r', type: 'line', color: '#9C27B0' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'cci',
    name: 'Commodity Channel Index',
    category: 'oscillator',
    description: 'CCI измеряет текущую цену относительно средней за период. Значения >+100 = перекупленность, <-100 = перепроданность',
    pineCode: `//@version=5
indicator("CCI", overlay=false)
length = input.int(20, "Length")
cci = ta.cci(close, high, low, length)
plot(cci, "CCI", color=color.blue)
hline(100, "Overbought", color=color.red)
hline(-100, "Oversold", color=color.green)`,
    inputSchema: [
      { name: 'length', type: 'int', default: 20, min: 1, max: 200 },
    ],
    outputConfig: [
      { name: 'cci', type: 'line', color: '#2962FF' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'mfi',
    name: 'Money Flow Index',
    category: 'oscillator',
    description: 'MFI - осциллятор, использующий цену и объём для измерения давления покупки/продажи. RSI с учётом объёма',
    pineCode: `//@version=5
indicator("MFI", overlay=false)
length = input.int(14, "Length")
mfi = ta.mfi(close, high, low, volume, length)
plot(mfi, "MFI", color=color.green)
hline(80, "Overbought", color=color.red)
hline(20, "Oversold", color=color.green)`,
    inputSchema: [
      { name: 'length', type: 'int', default: 14, min: 1, max: 100 },
    ],
    outputConfig: [
      { name: 'mfi', type: 'line', color: '#26A69A' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'roc',
    name: 'Rate of Change',
    category: 'oscillator',
    description: 'ROC измеряет процентное изменение цены за период. Положительные значения = рост, отрицательные = падение',
    pineCode: `//@version=5
indicator("ROC", overlay=false)
length = input.int(10, "Length")
roc = ta.roc(close, length)
plot(roc, "ROC", color=color.blue)
hline(0, "Zero", color=color.gray)`,
    inputSchema: [
      { name: 'length', type: 'int', default: 10, min: 1, max: 200 },
    ],
    outputConfig: [
      { name: 'roc', type: 'line', color: '#2962FF' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'momentum',
    name: 'Momentum',
    category: 'oscillator',
    description: 'Momentum - разница между текущей ценой и ценой N периодов назад. Показывает скорость движения цены',
    pineCode: `//@version=5
indicator("Momentum", overlay=false)
length = input.int(10, "Length")
mom = close - close[length]
plot(mom, "Momentum", color=color.purple)
hline(0, "Zero", color=color.gray)`,
    inputSchema: [
      { name: 'length', type: 'int', default: 10, min: 1, max: 200 },
    ],
    outputConfig: [
      { name: 'momentum', type: 'line', color: '#9C27B0' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'cmo',
    name: 'Chande Momentum Oscillator',
    category: 'oscillator',
    description: 'CMO - осциллятор моментума Чанде, измеряет силу тренда. Диапазон от -100 до +100',
    pineCode: `//@version=5
indicator("CMO", overlay=false)
length = input.int(14, "Length")
cmo = ta.cmo(close, length)
plot(cmo, "CMO", color=color.teal)
hline(50, "Overbought", color=color.red)
hline(-50, "Oversold", color=color.green)`,
    inputSchema: [
      { name: 'length', type: 'int', default: 14, min: 1, max: 200 },
    ],
    outputConfig: [
      { name: 'cmo', type: 'line', color: '#009688' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'ultimate_osc',
    name: 'Ultimate Oscillator',
    category: 'oscillator',
    description: 'Ultimate Oscillator - взвешенный осциллятор Ларри Вильямса, использует три разных таймфрейма',
    pineCode: `//@version=5
indicator("Ultimate Oscillator", overlay=false)
period1 = input.int(7, "Period 1")
period2 = input.int(14, "Period 2")
period3 = input.int(28, "Period 3")
uo = ta.uo(close, high, low, period1, period2, period3)
plot(uo, "UO", color=color.blue)
hline(70, "Overbought", color=color.red)
hline(30, "Oversold", color=color.green)`,
    inputSchema: [
      { name: 'period1', type: 'int', default: 7, min: 1, max: 100 },
      { name: 'period2', type: 'int', default: 14, min: 1, max: 100 },
      { name: 'period3', type: 'int', default: 28, min: 1, max: 200 },
    ],
    outputConfig: [
      { name: 'ultimate_osc', type: 'line', color: '#2962FF' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'ao',
    name: 'Awesome Oscillator',
    category: 'oscillator',
    description: 'AO Билла Вильямса - разница между 5 и 34-периодной SMA медианной цены. Показывает силу тренда',
    pineCode: `//@version=5
indicator("Awesome Oscillator", overlay=false)
ao = ta.ao(high, low, close)
plot(ao, "AO", style=plot.style_histogram, color=ao >= 0 ? ao >= ao[1] ? color.green : color.lime : ao <= ao[1] ? color.red : color.maroon)`,
    inputSchema: [
      { name: 'fastPeriod', type: 'int', default: 5, min: 1, max: 50 },
      { name: 'slowPeriod', type: 'int', default: 34, min: 1, max: 100 },
    ],
    outputConfig: [
      { name: 'ao', type: 'histogram', color: '#26A69A' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'ac',
    name: 'Accelerator Oscillator',
    category: 'oscillator',
    description: 'AC Билла Вильямса - разница между AO и его 5-периодной SMA. Показывает ускорение моментума',
    pineCode: `//@version=5
indicator("Accelerator Oscillator", overlay=false)
ao = ta.ao(high, low, close)
ac = ao - ta.sma(ao, 5)
plot(ac, "AC", style=plot.style_histogram, color=ac >= 0 ? ac >= ac[1] ? color.green : color.lime : ac <= ac[1] ? color.red : color.maroon)`,
    inputSchema: [],
    outputConfig: [
      { name: 'ac', type: 'histogram', color: '#4CAF50' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'tsi',
    name: 'True Strength Index',
    category: 'oscillator',
    description: 'TSI - индекс истинной силы, сглаженный моментум с двойным сглаживанием. Показывает силу тренда',
    pineCode: `//@version=5
indicator("TSI", overlay=false)
longLength = input.int(25, "Long Length")
shortLength = input.int(13, "Short Length")
tsi = 100 * ta.ema(ta.ema(close - close[1], longLength), shortLength) / ta.ema(ta.ema(math.abs(close - close[1]), longLength), shortLength)
plot(tsi, "TSI", color=color.blue)`,
    inputSchema: [
      { name: 'longLength', type: 'int', default: 25, min: 1, max: 100 },
      { name: 'shortLength', type: 'int', default: 13, min: 1, max: 50 },
    ],
    outputConfig: [
      { name: 'tsi', type: 'line', color: '#2962FF' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'vortex',
    name: 'Vortex Indicator',
    category: 'oscillator',
    description: 'Vortex Indicator - определяет начало тренда через положительные и отрицательные вихревые движения',
    pineCode: `//@version=5
indicator("Vortex Indicator", overlay=false)
length = input.int(14, "Length")
[plusVI, minusVI] = ta.vortex(high, low, close, length)
plot(plusVI, "+VI", color=color.green)
plot(minusVI, "-VI", color=color.red)`,
    inputSchema: [
      { name: 'length', type: 'int', default: 14, min: 1, max: 100 },
    ],
    outputConfig: [
      { name: 'plusVI', type: 'line', color: '#26A69A' },
      { name: 'minusVI', type: 'line', color: '#EF5350' },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'aroon',
    name: 'Aroon',
    category: 'oscillator',
    description: 'Aroon - определяет силу тренда и его направление через время с последнего максимума/минимума',
    pineCode: `//@version=5
indicator("Aroon", overlay=false)
length = input.int(14, "Length")
[aroonUp, aroonDown] = ta.aroon(high, low, length)
oscillator = aroonUp - aroonDown
plot(aroonUp, "Aroon Up", color=color.green)
plot(aroonDown, "Aroon Down", color=color.red)
plot(oscillator, "Oscillator", style=plot.style_histogram, color=color.blue)`,
    inputSchema: [
      { name: 'length', type: 'int', default: 14, min: 1, max: 100 },
    ],
    outputConfig: [
      { name: 'aroon_up', type: 'line', color: '#26A69A' },
      { name: 'aroon_down', type: 'line', color: '#EF5350' },
      { name: 'oscillator', type: 'histogram', color: '#2962FF' },
    ],
    overlay: false,
    author: 'CITARION',
  },
];
