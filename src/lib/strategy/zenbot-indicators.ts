/**
 * Zenbot Indicator Helpers
 * 
 * Technical indicator calculation functions used by Zenbot strategies.
 * Separated for reusability and testability.
 */

import { Candle } from "./types";
import { RSI, EMA, SMA } from "./indicators";

/**
 * Standard Deviation calculation
 */
export function standardDeviation(data: number[], period: number): number[] {
  const result: number[] = [];
  
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(NaN);
      continue;
    }
    
    const slice = data.slice(i - period + 1, i + 1);
    const mean = slice.reduce((a, b) => a + b, 0) / period;
    const variance = slice.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / period;
    result.push(Math.sqrt(variance));
  }
  
  return result;
}

/**
 * Bollinger Bands calculation
 */
export function bollingerBands(data: number[], period: number, stdDev: number): {
  upper: number[];
  middle: number[];
  lower: number[];
} {
  const middle = SMA(data, period);
  const std = standardDeviation(data, period);
  
  const upper = middle.map((m, i) => m + std[i] * stdDev);
  const lower = middle.map((m, i) => m - std[i] * stdDev);
  
  return { upper, middle, lower };
}

/**
 * VWAP calculation
 */
export function calculateVWAP(candles: Candle[], maxPeriods: number = 8000): number[] {
  const result: number[] = [];
  let cumulativeTPV = 0;
  let cumulativeVolume = 0;
  
  for (let i = 0; i < candles.length; i++) {
    const tp = (candles[i].high + candles[i].low + candles[i].close) / 3;
    const startIdx = Math.max(0, i - maxPeriods + 1);
    
    if (i >= maxPeriods) {
      // Remove old values
      for (let j = startIdx - 1; j < i - maxPeriods + 1; j++) {
        const oldTp = (candles[j].high + candles[j].low + candles[j].close) / 3;
        cumulativeTPV -= oldTp * candles[j].volume;
        cumulativeVolume -= candles[j].volume;
      }
    }
    
    cumulativeTPV += tp * candles[i].volume;
    cumulativeVolume += candles[i].volume;
    
    result.push(cumulativeVolume > 0 ? cumulativeTPV / cumulativeVolume : tp);
  }
  
  return result;
}

/**
 * Parabolic SAR
 */
export function parabolicSAR(candles: Candle[], af: number = 0.015, maxAF: number = 0.3): number[] {
  const result: number[] = [];
  let isUptrend = true;
  let ep = candles[0].low;
  let sar = candles[0].high;
  let accelerationFactor = af;
  
  for (let i = 0; i < candles.length; i++) {
    if (i === 0) {
      result.push(candles[0].close);
      continue;
    }
    
    const prevSAR = result[i - 1];
    
    if (isUptrend) {
      sar = prevSAR + accelerationFactor * (ep - prevSAR);
      sar = Math.min(sar, candles[i - 1].low, candles[i].low);
      
      if (candles[i].low < sar) {
        isUptrend = false;
        sar = ep;
        accelerationFactor = af;
        ep = candles[i].low;
      } else {
        if (candles[i].high > ep) {
          ep = candles[i].high;
          accelerationFactor = Math.min(accelerationFactor + af, maxAF);
        }
      }
    } else {
      sar = prevSAR - accelerationFactor * (prevSAR - ep);
      sar = Math.max(sar, candles[i - 1].high, candles[i].high);
      
      if (candles[i].high > sar) {
        isUptrend = true;
        sar = ep;
        accelerationFactor = af;
        ep = candles[i].high;
      } else {
        if (candles[i].low < ep) {
          ep = candles[i].low;
          accelerationFactor = Math.min(accelerationFactor + af, maxAF);
        }
      }
    }
    
    result.push(sar);
  }
  
  return result;
}

/**
 * Stochastic RSI
 */
export function stochasticRSI(data: number[], rsiPeriod: number, stochPeriod: number, kPeriod: number, dPeriod: number): {
  k: number[];
  d: number[];
} {
  const rsi = RSI(data, rsiPeriod);
  const kRaw: number[] = [];
  
  for (let i = 0; i < rsi.length; i++) {
    if (i < stochPeriod - 1) {
      kRaw.push(NaN);
      continue;
    }
    
    const slice = rsi.slice(i - stochPeriod + 1, i + 1);
    const highest = Math.max(...slice.filter(v => !isNaN(v)));
    const lowest = Math.min(...slice.filter(v => !isNaN(v)));
    
    if (highest === lowest) {
      kRaw.push(50);
    } else {
      kRaw.push(((rsi[i] - lowest) / (highest - lowest)) * 100);
    }
  }
  
  const k = SMA(kRaw, kPeriod);
  const d = SMA(k, dPeriod);
  
  return { k, d };
}

/**
 * CCI (Commodity Channel Index)
 */
export function CCI(candles: Candle[], period: number, constant: number = 0.015): number[] {
  const result: number[] = [];
  
  for (let i = 0; i < candles.length; i++) {
    if (i < period - 1) {
      result.push(NaN);
      continue;
    }
    
    const slice = candles.slice(i - period + 1, i + 1);
    const tpValues = slice.map(c => (c.high + c.low + c.close) / 3);
    const sma = tpValues.reduce((a, b) => a + b, 0) / period;
    const meanDev = tpValues.reduce((acc, val) => acc + Math.abs(val - sma), 0) / period;
    
    const tp = (candles[i].high + candles[i].low + candles[i].close) / 3;
    result.push(meanDev > 0 ? (tp - sma) / (constant * meanDev) : 0);
  }
  
  return result;
}

/**
 * TRIX Indicator
 */
export function TRIX(data: number[], period: number): number[] {
  const ema1 = EMA(data, period);
  const ema2 = EMA(ema1, period);
  const ema3 = EMA(ema2, period);
  
  const result: number[] = [];
  let prevEma3 = 0;
  
  for (let i = 0; i < ema3.length; i++) {
    if (isNaN(ema3[i]) || i === 0) {
      result.push(NaN);
      prevEma3 = ema3[i] || 0;
      continue;
    }
    
    if (prevEma3 !== 0) {
      result.push(((ema3[i] - prevEma3) / prevEma3) * 100);
    } else {
      result.push(0);
    }
    prevEma3 = ema3[i];
  }
  
  return result;
}

/**
 * Ultimate Oscillator
 */
export function ultimateOscillator(candles: Candle[], period1: number, period2: number, period3: number): number[] {
  const result: number[] = [];
  const bp: number[] = [];
  const tr: number[] = [];
  
  for (let i = 0; i < candles.length; i++) {
    const prevClose = i > 0 ? candles[i - 1].close : candles[i].close;
    bp.push(candles[i].close - Math.min(candles[i].low, prevClose));
    tr.push(Math.max(candles[i].high, prevClose) - Math.min(candles[i].low, prevClose));
  }
  
  for (let i = 0; i < candles.length; i++) {
    if (i < Math.max(period1, period2, period3) - 1) {
      result.push(NaN);
      continue;
    }
    
    const sumBP1 = bp.slice(i - period1 + 1, i + 1).reduce((a, b) => a + b, 0);
    const sumTR1 = tr.slice(i - period1 + 1, i + 1).reduce((a, b) => a + b, 0);
    const avg1 = sumTR1 > 0 ? sumBP1 / sumTR1 : 0;
    
    const sumBP2 = bp.slice(i - period2 + 1, i + 1).reduce((a, b) => a + b, 0);
    const sumTR2 = tr.slice(i - period2 + 1, i + 1).reduce((a, b) => a + b, 0);
    const avg2 = sumTR2 > 0 ? sumBP2 / sumTR2 : 0;
    
    const sumBP3 = bp.slice(i - period3 + 1, i + 1).reduce((a, b) => a + b, 0);
    const sumTR3 = tr.slice(i - period3 + 1, i + 1).reduce((a, b) => a + b, 0);
    const avg3 = sumTR3 > 0 ? sumBP3 / sumTR3 : 0;
    
    result.push(100 * ((4 * avg1 + 2 * avg2 + avg3) / 7));
  }
  
  return result;
}

/**
 * Hull Moving Average
 */
export function hullMA(data: number[], period: number): number[] {
  const halfPeriod = Math.floor(period / 2);
  const sqrtPeriod = Math.floor(Math.sqrt(period));
  
  const wmaHalf = WMA(data, halfPeriod);
  const wmaFull = WMA(data, period);
  
  const rawHMA = wmaHalf.map((v, i) => 2 * v - wmaFull[i]);
  return WMA(rawHMA, sqrtPeriod);
}

/**
 * Weighted Moving Average
 */
export function WMA(data: number[], period: number): number[] {
  const result: number[] = [];
  const weightSum = (period * (period + 1)) / 2;
  
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(NaN);
      continue;
    }
    
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += data[i - period + 1 + j] * (j + 1);
    }
    result.push(sum / weightSum);
  }
  
  return result;
}

/**
 * Wave Trend Indicator
 */
export function waveTrend(candles: Candle[], channelLength: number, avgLength: number): {
  wave1: number[];
  wave2: number[];
} {
  const hlc3 = candles.map(c => (c.high + c.low + c.close) / 3);
  const esa = EMA(hlc3, channelLength);
  
  const diff = hlc3.map((h, i) => Math.abs(h - esa[i]));
  const ci = diff.map((d, i) => esa[i] > 0 ? d / EMA(diff, channelLength)[i] : 0);
  
  const tci = EMA(ci, avgLength);
  const wave1 = tci.map(v => v * 100);
  const wave2 = SMA(wave1, 3);
  
  return { wave1, wave2 };
}

/**
 * Momentum Indicator
 */
export function momentum(data: number[], period: number): number[] {
  const result: number[] = [];
  
  for (let i = 0; i < data.length; i++) {
    if (i < period) {
      result.push(NaN);
      continue;
    }
    result.push(data[i] - data[i - period]);
  }
  
  return result;
}

/**
 * Percentage Price Oscillator (PPO)
 */
export function PPO(data: number[], fastPeriod: number, slowPeriod: number, signalPeriod: number): {
  ppo: number[];
  signal: number[];
  histogram: number[];
} {
  const fastEMA = EMA(data, fastPeriod);
  const slowEMA = EMA(data, slowPeriod);
  
  const ppo = fastEMA.map((f, i) => {
    if (isNaN(f) || isNaN(slowEMA[i]) || slowEMA[i] === 0) return NaN;
    return ((f - slowEMA[i]) / slowEMA[i]) * 100;
  });
  
  const signal = EMA(ppo, signalPeriod);
  const histogram = ppo.map((p, i) => p - signal[i]);
  
  return { ppo, signal, histogram };
}
