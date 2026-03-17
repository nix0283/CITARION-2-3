/**
 * Zenbot Strategies - Part 1
 * 
 * Contains the first 8 Zenbot strategies:
 * - Bollinger Bands
 * - VWAP Crossover
 * - DEMA Crossover
 * - Parabolic SAR
 * - Momentum
 * - Stochastic RSI + MACD
 * - Wave Trend
 * - CCI SRSI
 */

import { Candle, IndicatorResult, StrategySignal, StrategyConfig, BaseStrategy, SignalType } from "./types";
import { PREDEFINED_TACTICS_SETS } from "./tactics/types";
import {
  bollingerBands,
  calculateVWAP,
  parabolicSAR,
  stochasticRSI,
  CCI,
  waveTrend,
  momentum,
} from "./zenbot-indicators";
import { RSI, EMA, SMA } from "./indicators";

// ==================== 1. BOLLINGER BANDS ====================

export const ZENBOT_BOLLINGER_CONFIG: StrategyConfig = {
  id: "zenbot-bollinger",
  name: "Zenbot Bollinger Bands",
  description: "Buy when price touches lower band, sell when touches upper band",
  version: "1.0.0",
  author: "Zenbot",
  timeframes: ["5m", "15m", "1h", "4h"],
  defaultTimeframe: "1h",
  parameters: [
    { name: "period", type: "integer", defaultValue: 20, min: 10, max: 50, category: "Bollinger" },
    { name: "stdDev", type: "number", defaultValue: 2, min: 1, max: 3, category: "Bollinger" },
    { name: "upperBoundPct", type: "number", defaultValue: 0, min: 0, max: 5, category: "Bollinger" },
    { name: "lowerBoundPct", type: "number", defaultValue: 0, min: 0, max: 5, category: "Bollinger" },
  ],
  defaultTactics: [PREDEFINED_TACTICS_SETS[0]],
  tags: ["mean-reversion", "zenbot", "bollinger"],
  minCandlesRequired: 52,
};

export class ZenbotBollingerStrategy extends BaseStrategy {
  private upper: number[] = [];
  private middle: number[] = [];
  private lower: number[] = [];

  constructor() {
    super(ZENBOT_BOLLINGER_CONFIG);
  }

  populateIndicators(candles: Candle[]): IndicatorResult {
    const closes = candles.map(c => c.close);
    const period = Number(this.parameters.period);
    const stdDev = Number(this.parameters.stdDev);

    const bb = bollingerBands(closes, period, stdDev);
    this.upper = bb.upper;
    this.middle = bb.middle;
    this.lower = bb.lower;

    return { bollingerBands: bb };
  }

  populateEntrySignal(candles: Candle[], indicators: IndicatorResult, currentPrice: number): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const upper = this.upper[lastIndex];
    const lower = this.lower[lastIndex];

    if (isNaN(upper) || isNaN(lower)) return null;

    const upperBoundPct = Number(this.parameters.upperBoundPct) / 100;
    const lowerBoundPct = Number(this.parameters.lowerBoundPct) / 100;

    const upperThreshold = upper * (1 - upperBoundPct);
    const lowerThreshold = lower * (1 + lowerBoundPct);

    let signalType: SignalType = "NO_SIGNAL";
    let reason = "";

    if (currentPrice <= lowerThreshold) {
      signalType = "LONG";
      reason = `Price near lower BB (${currentPrice.toFixed(2)} <= ${lowerThreshold.toFixed(2)})`;
    } else if (currentPrice >= upperThreshold) {
      signalType = "SHORT";
      reason = `Price near upper BB (${currentPrice.toFixed(2)} >= ${upperThreshold.toFixed(2)})`;
    }

    if (signalType === "NO_SIGNAL") return null;

    return {
      type: signalType,
      confidence: 70,
      symbol: "",
      timeframe: this.config.defaultTimeframe,
      timestamp: new Date(),
      price: currentPrice,
      suggestedStopLoss: signalType === "LONG" ? currentPrice * 0.98 : currentPrice * 1.02,
      reason,
      metadata: { upper, lower, middle: this.middle[lastIndex] },
    };
  }

  populateExitSignal(candles: Candle[], indicators: IndicatorResult, position: { direction: "LONG" | "SHORT"; entryPrice: number; currentPrice: number; size: number; openTime: Date; }): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const middle = this.middle[lastIndex];

    if (isNaN(middle)) return null;

    let shouldExit = false;
    let reason = "";

    if (position.direction === "LONG" && position.currentPrice >= middle) {
      shouldExit = true;
      reason = "Price reached middle BB - exit long";
    }
    if (position.direction === "SHORT" && position.currentPrice <= middle) {
      shouldExit = true;
      reason = "Price reached middle BB - exit short";
    }

    if (!shouldExit) return null;

    return {
      type: position.direction === "LONG" ? "EXIT_LONG" : "EXIT_SHORT",
      confidence: 70,
      symbol: "",
      timeframe: this.config.defaultTimeframe,
      timestamp: new Date(),
      price: position.currentPrice,
      reason,
    };
  }
}

// ==================== 2. VWAP CROSSOVER ====================

export const ZENBOT_VWAP_CONFIG: StrategyConfig = {
  id: "zenbot-vwap-crossover",
  name: "Zenbot VWAP Crossover",
  description: "Trade based on VWAP vs EMA crossover",
  version: "1.0.0",
  author: "Zenbot",
  timeframes: ["15m", "1h", "4h"],
  defaultTimeframe: "2h",
  parameters: [
    { name: "emaLength", type: "integer", defaultValue: 30, min: 10, max: 100, category: "EMA" },
  ],
  defaultTactics: [PREDEFINED_TACTICS_SETS[1]],
  tags: ["trend", "zenbot", "vwap"],
  minCandlesRequired: 200,
};

export class ZenbotVWAPStrategy extends BaseStrategy {
  private vwap: number[] = [];
  private ema: number[] = [];

  constructor() {
    super(ZENBOT_VWAP_CONFIG);
  }

  populateIndicators(candles: Candle[]): IndicatorResult {
    const closes = candles.map(c => c.close);
    const emaLength = Number(this.parameters.emaLength);

    this.vwap = calculateVWAP(candles, 8000);
    this.ema = EMA(closes, emaLength);

    return { vwap: this.vwap, ema: { [emaLength]: this.ema } };
  }

  populateEntrySignal(candles: Candle[], indicators: IndicatorResult, currentPrice: number): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const vwap = this.vwap[lastIndex];
    const ema = this.ema[lastIndex];

    if (isNaN(vwap) || isNaN(ema)) return null;

    let signalType: SignalType = "NO_SIGNAL";
    let reason = "";

    if (vwap > ema) {
      signalType = "LONG";
      reason = `VWAP (${vwap.toFixed(2)}) above EMA (${ema.toFixed(2)})`;
    } else if (vwap < ema) {
      signalType = "SHORT";
      reason = `VWAP (${vwap.toFixed(2)}) below EMA (${ema.toFixed(2)})`;
    }

    if (signalType === "NO_SIGNAL") return null;

    return {
      type: signalType,
      confidence: 65,
      symbol: "",
      timeframe: this.config.defaultTimeframe,
      timestamp: new Date(),
      price: currentPrice,
      reason,
      metadata: { vwap, ema },
    };
  }

  populateExitSignal(candles: Candle[], indicators: IndicatorResult, position: { direction: "LONG" | "SHORT"; entryPrice: number; currentPrice: number; size: number; openTime: Date; }): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const vwap = this.vwap[lastIndex];
    const ema = this.ema[lastIndex];

    if (isNaN(vwap) || isNaN(ema)) return null;

    let shouldExit = false;
    let reason = "";

    if (position.direction === "LONG" && vwap < ema) {
      shouldExit = true;
      reason = "VWAP crossed below EMA - exit long";
    }
    if (position.direction === "SHORT" && vwap > ema) {
      shouldExit = true;
      reason = "VWAP crossed above EMA - exit short";
    }

    if (!shouldExit) return null;

    return {
      type: position.direction === "LONG" ? "EXIT_LONG" : "EXIT_SHORT",
      confidence: 65,
      symbol: "",
      timeframe: this.config.defaultTimeframe,
      timestamp: new Date(),
      price: position.currentPrice,
      reason,
    };
  }
}

// ==================== 3. DEMA CROSSOVER ====================

export const ZENBOT_DEMA_CONFIG: StrategyConfig = {
  id: "zenbot-dema",
  name: "Zenbot DEMA Crossover",
  description: "Trade on short/long EMA crossover with RSI filter",
  version: "1.0.0",
  author: "Zenbot",
  timeframes: ["15m", "1h", "4h"],
  defaultTimeframe: "1h",
  parameters: [
    { name: "emaShort", type: "integer", defaultValue: 10, min: 5, max: 30, category: "EMA" },
    { name: "emaLong", type: "integer", defaultValue: 21, min: 10, max: 50, category: "EMA" },
    { name: "overboughtRSI", type: "number", defaultValue: 80, min: 70, max: 95, category: "RSI" },
  ],
  defaultTactics: [PREDEFINED_TACTICS_SETS[1]],
  tags: ["trend", "zenbot", "ema"],
  minCandlesRequired: 21,
};

export class ZenbotDEMAStrategy extends BaseStrategy {
  private shortEMA: number[] = [];
  private longEMA: number[] = [];
  private rsiValues: number[] = [];

  constructor() {
    super(ZENBOT_DEMA_CONFIG);
  }

  populateIndicators(candles: Candle[]): IndicatorResult {
    const closes = candles.map(c => c.close);
    const shortPeriod = Number(this.parameters.emaShort);
    const longPeriod = Number(this.parameters.emaLong);

    this.shortEMA = EMA(closes, shortPeriod);
    this.longEMA = EMA(closes, longPeriod);
    this.rsiValues = RSI(closes, 9);

    return { ema: { [shortPeriod]: this.shortEMA, [longPeriod]: this.longEMA }, rsi: { 9: this.rsiValues } };
  }

  populateEntrySignal(candles: Candle[], indicators: IndicatorResult, currentPrice: number): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const short = this.shortEMA[lastIndex];
    const shortPrev = this.shortEMA[lastIndex - 1];
    const long = this.longEMA[lastIndex];
    const rsi = this.rsiValues[lastIndex];

    if (isNaN(short) || isNaN(long) || isNaN(rsi)) return null;

    const overbought = Number(this.parameters.overboughtRSI);
    const trend = short - long;
    const trendPrev = shortPrev - long;

    let signalType: SignalType = "NO_SIGNAL";
    let reason = "";

    if (trend > 0 && trendPrev <= 0 && rsi < overbought) {
      signalType = "LONG";
      reason = `DEMA bullish crossover, RSI: ${rsi.toFixed(1)}`;
    } else if (trend < 0 && trendPrev >= 0) {
      signalType = "SHORT";
      reason = "DEMA bearish crossover";
    }

    if (signalType === "NO_SIGNAL") return null;

    return {
      type: signalType,
      confidence: 70,
      symbol: "",
      timeframe: this.config.defaultTimeframe,
      timestamp: new Date(),
      price: currentPrice,
      reason,
      metadata: { shortEMA: short, longEMA: long, rsi, trend },
    };
  }

  populateExitSignal(candles: Candle[], indicators: IndicatorResult, position: { direction: "LONG" | "SHORT"; entryPrice: number; currentPrice: number; size: number; openTime: Date; }): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const short = this.shortEMA[lastIndex];
    const long = this.longEMA[lastIndex];

    if (isNaN(short) || isNaN(long)) return null;

    let shouldExit = false;
    let reason = "";

    if (position.direction === "LONG" && short < long) {
      shouldExit = true;
      reason = "DEMA bearish crossover - exit long";
    }
    if (position.direction === "SHORT" && short > long) {
      shouldExit = true;
      reason = "DEMA bullish crossover - exit short";
    }

    if (!shouldExit) return null;

    return {
      type: position.direction === "LONG" ? "EXIT_LONG" : "EXIT_SHORT",
      confidence: 70,
      symbol: "",
      timeframe: this.config.defaultTimeframe,
      timestamp: new Date(),
      price: position.currentPrice,
      reason,
    };
  }
}

// ==================== 4. PARABOLIC SAR ====================

export const ZENBOT_SAR_CONFIG: StrategyConfig = {
  id: "zenbot-sar",
  name: "Zenbot Parabolic SAR",
  description: "Trade on Parabolic SAR reversals",
  version: "1.0.0",
  author: "Zenbot",
  timeframes: ["1m", "5m", "15m"],
  defaultTimeframe: "2m",
  parameters: [
    { name: "af", type: "number", defaultValue: 0.015, min: 0.005, max: 0.05, category: "SAR" },
    { name: "maxAF", type: "number", defaultValue: 0.3, min: 0.1, max: 0.5, category: "SAR" },
  ],
  defaultTactics: [PREDEFINED_TACTICS_SETS[1]],
  tags: ["trend", "zenbot", "sar"],
  minCandlesRequired: 52,
};

export class ZenbotSARStrategy extends BaseStrategy {
  private sarValues: number[] = [];
  private trendDirection: boolean[] = [];

  constructor() {
    super(ZENBOT_SAR_CONFIG);
  }

  populateIndicators(candles: Candle[]): IndicatorResult {
    const af = Number(this.parameters.af);
    const maxAF = Number(this.parameters.maxAF);

    this.sarValues = parabolicSAR(candles, af, maxAF);
    this.trendDirection = candles.map((c, i) => c.close > this.sarValues[i]);

    return { custom: { sar: this.sarValues } };
  }

  populateEntrySignal(candles: Candle[], indicators: IndicatorResult, currentPrice: number): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const sar = this.sarValues[lastIndex];
    const isUptrend = this.trendDirection[lastIndex];
    const wasUptrend = this.trendDirection[lastIndex - 1];

    if (isNaN(sar)) return null;

    let signalType: SignalType = "NO_SIGNAL";
    let reason = "";

    if (!wasUptrend && isUptrend) {
      signalType = "LONG";
      reason = "SAR reversed to uptrend";
    } else if (wasUptrend && !isUptrend) {
      signalType = "SHORT";
      reason = "SAR reversed to downtrend";
    }

    if (signalType === "NO_SIGNAL") return null;

    return {
      type: signalType,
      confidence: 75,
      symbol: "",
      timeframe: this.config.defaultTimeframe,
      timestamp: new Date(),
      price: currentPrice,
      suggestedStopLoss: sar,
      reason,
      metadata: { sar, isUptrend },
    };
  }

  populateExitSignal(candles: Candle[], indicators: IndicatorResult, position: { direction: "LONG" | "SHORT"; entryPrice: number; currentPrice: number; size: number; openTime: Date; }): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const isUptrend = this.trendDirection[lastIndex];

    let shouldExit = false;
    let reason = "";

    if (position.direction === "LONG" && !isUptrend) {
      shouldExit = true;
      reason = "SAR trend reversed - exit long";
    }
    if (position.direction === "SHORT" && isUptrend) {
      shouldExit = true;
      reason = "SAR trend reversed - exit short";
    }

    if (!shouldExit) return null;

    return {
      type: position.direction === "LONG" ? "EXIT_LONG" : "EXIT_SHORT",
      confidence: 75,
      symbol: "",
      timeframe: this.config.defaultTimeframe,
      timestamp: new Date(),
      price: position.currentPrice,
      reason,
    };
  }
}

// ==================== 5. MOMENTUM ====================

export const ZENBOT_MOMENTUM_CONFIG: StrategyConfig = {
  id: "zenbot-momentum",
  name: "Zenbot Momentum",
  description: "Trade based on price momentum",
  version: "1.0.0",
  author: "Zenbot",
  timeframes: ["5m", "15m", "1h"],
  defaultTimeframe: "15m",
  parameters: [
    { name: "momentumPeriod", type: "integer", defaultValue: 5, min: 2, max: 20, category: "Momentum" },
    { name: "threshold", type: "number", defaultValue: 0, min: -1, max: 1, category: "Signal" },
  ],
  defaultTactics: [PREDEFINED_TACTICS_SETS[1]],
  tags: ["momentum", "zenbot"],
  minCandlesRequired: 30,
};

export class ZenbotMomentumStrategy extends BaseStrategy {
  private momentumValues: number[] = [];

  constructor() {
    super(ZENBOT_MOMENTUM_CONFIG);
  }

  populateIndicators(candles: Candle[]): IndicatorResult {
    const closes = candles.map(c => c.close);
    const period = Number(this.parameters.momentumPeriod);
    this.momentumValues = momentum(closes, period);
    return { custom: { momentum: this.momentumValues } };
  }

  populateEntrySignal(candles: Candle[], indicators: IndicatorResult, currentPrice: number): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const mom = this.momentumValues[lastIndex];
    const momPrev = this.momentumValues[lastIndex - 1];

    if (isNaN(mom) || isNaN(momPrev)) return null;

    const threshold = Number(this.parameters.threshold);

    let signalType: SignalType = "NO_SIGNAL";
    let reason = "";

    if (mom > threshold && momPrev <= threshold) {
      signalType = "LONG";
      reason = `Momentum turned positive: ${mom.toFixed(4)}`;
    } else if (mom < threshold && momPrev >= threshold) {
      signalType = "SHORT";
      reason = `Momentum turned negative: ${mom.toFixed(4)}`;
    }

    if (signalType === "NO_SIGNAL") return null;

    return {
      type: signalType,
      confidence: 65,
      symbol: "",
      timeframe: this.config.defaultTimeframe,
      timestamp: new Date(),
      price: currentPrice,
      reason,
      metadata: { momentum: mom },
    };
  }

  populateExitSignal(candles: Candle[], indicators: IndicatorResult, position: { direction: "LONG" | "SHORT"; entryPrice: number; currentPrice: number; size: number; openTime: Date; }): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const mom = this.momentumValues[lastIndex];

    if (isNaN(mom)) return null;

    let shouldExit = false;
    let reason = "";

    if (position.direction === "LONG" && mom < 0) {
      shouldExit = true;
      reason = "Momentum turned negative - exit long";
    }
    if (position.direction === "SHORT" && mom > 0) {
      shouldExit = true;
      reason = "Momentum turned positive - exit short";
    }

    if (!shouldExit) return null;

    return {
      type: position.direction === "LONG" ? "EXIT_LONG" : "EXIT_SHORT",
      confidence: 65,
      symbol: "",
      timeframe: this.config.defaultTimeframe,
      timestamp: new Date(),
      price: position.currentPrice,
      reason,
    };
  }
}

// ==================== 6. STOCHASTIC RSI + MACD ====================

export const ZENBOT_SRSI_MACD_CONFIG: StrategyConfig = {
  id: "zenbot-srsi-macd",
  name: "Zenbot Stochastic MACD",
  description: "Combined Stochastic RSI with MACD for signal generation",
  version: "1.0.0",
  author: "Zenbot",
  timeframes: ["15m", "30m", "1h"],
  defaultTimeframe: "30m",
  parameters: [
    { name: "rsiPeriod", type: "integer", defaultValue: 14, min: 7, max: 21, category: "RSI" },
    { name: "srsiPeriod", type: "integer", defaultValue: 9, min: 5, max: 14, category: "StochRSI" },
    { name: "emaShort", type: "integer", defaultValue: 24, min: 12, max: 30, category: "MACD" },
    { name: "emaLong", type: "integer", defaultValue: 200, min: 100, max: 300, category: "MACD" },
  ],
  defaultTactics: [PREDEFINED_TACTICS_SETS[0]],
  tags: ["oscillator", "zenbot", "stochastic", "macd"],
  minCandlesRequired: 200,
};

export class ZenbotStochMACDStrategy extends BaseStrategy {
  private k: number[] = [];
  private d: number[] = [];
  private macd: number[] = [];
  private signal: number[] = [];

  constructor() {
    super(ZENBOT_SRSI_MACD_CONFIG);
  }

  populateIndicators(candles: Candle[]): IndicatorResult {
    const closes = candles.map(c => c.close);
    const rsiPeriod = Number(this.parameters.rsiPeriod);
    const srsiPeriod = Number(this.parameters.srsiPeriod);
    const emaShort = Number(this.parameters.emaShort);
    const emaLong = Number(this.parameters.emaLong);

    const srsi = stochasticRSI(closes, rsiPeriod, srsiPeriod, 5, 3);
    this.k = srsi.k;
    this.d = srsi.d;

    const fastEMA = EMA(closes, emaShort);
    const slowEMA = EMA(closes, emaLong);
    this.macd = fastEMA.map((f, i) => f - slowEMA[i]);
    this.signal = EMA(this.macd, 9);

    return { stoch: { k: this.k, d: this.d }, macd: { macd: this.macd, signal: this.signal } };
  }

  populateEntrySignal(candles: Candle[], indicators: IndicatorResult, currentPrice: number): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const k = this.k[lastIndex];
    const macd = this.macd[lastIndex];
    const signal = this.signal[lastIndex];

    if (isNaN(k) || isNaN(macd) || isNaN(signal)) return null;

    let signalType: SignalType = "NO_SIGNAL";
    let reason = "";

    if (k < 20 && macd > signal) {
      signalType = "LONG";
      reason = `StochRSI oversold + MACD bullish (K: ${k.toFixed(1)})`;
    } else if (k > 80 && macd < signal) {
      signalType = "SHORT";
      reason = `StochRSI overbought + MACD bearish (K: ${k.toFixed(1)})`;
    }

    if (signalType === "NO_SIGNAL") return null;

    return {
      type: signalType,
      confidence: 75,
      symbol: "",
      timeframe: this.config.defaultTimeframe,
      timestamp: new Date(),
      price: currentPrice,
      reason,
      metadata: { k, macd, signal },
    };
  }

  populateExitSignal(candles: Candle[], indicators: IndicatorResult, position: { direction: "LONG" | "SHORT"; entryPrice: number; currentPrice: number; size: number; openTime: Date; }): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const k = this.k[lastIndex];
    const macd = this.macd[lastIndex];
    const signal = this.signal[lastIndex];

    if (isNaN(k) || isNaN(macd)) return null;

    let shouldExit = false;
    let reason = "";

    if (position.direction === "LONG" && (k > 80 || macd < signal)) {
      shouldExit = true;
      reason = k > 80 ? "StochRSI overbought" : "MACD bearish crossover";
    }
    if (position.direction === "SHORT" && (k < 20 || macd > signal)) {
      shouldExit = true;
      reason = k < 20 ? "StochRSI oversold" : "MACD bullish crossover";
    }

    if (!shouldExit) return null;

    return {
      type: position.direction === "LONG" ? "EXIT_LONG" : "EXIT_SHORT",
      confidence: 70,
      symbol: "",
      timeframe: this.config.defaultTimeframe,
      timestamp: new Date(),
      price: position.currentPrice,
      reason,
    };
  }
}

// ==================== 7. WAVE TREND ====================

export const ZENBOT_WAVETREND_CONFIG: StrategyConfig = {
  id: "zenbot-wavetrend",
  name: "Zenbot Wave Trend",
  description: "Trade using Wave Trend oscillator",
  version: "1.0.0",
  author: "Zenbot",
  timeframes: ["15m", "1h", "4h"],
  defaultTimeframe: "1h",
  parameters: [
    { name: "channelLength", type: "integer", defaultValue: 10, min: 5, max: 20, category: "Wave" },
    { name: "avgLength", type: "integer", defaultValue: 21, min: 10, max: 30, category: "Wave" },
  ],
  defaultTactics: [PREDEFINED_TACTICS_SETS[0]],
  tags: ["oscillator", "zenbot", "wavetrend"],
  minCandlesRequired: 21,
};

export class ZenbotWaveTrendStrategy extends BaseStrategy {
  private wave1: number[] = [];
  private wave2: number[] = [];

  constructor() {
    super(ZENBOT_WAVETREND_CONFIG);
  }

  populateIndicators(candles: Candle[]): IndicatorResult {
    const channelLength = Number(this.parameters.channelLength);
    const avgLength = Number(this.parameters.avgLength);

    const wt = waveTrend(candles, channelLength, avgLength);
    this.wave1 = wt.wave1;
    this.wave2 = wt.wave2;

    return { custom: { wave1: this.wave1, wave2: this.wave2 } };
  }

  populateEntrySignal(candles: Candle[], indicators: IndicatorResult, currentPrice: number): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const w1 = this.wave1[lastIndex];
    const w2 = this.wave2[lastIndex];

    if (isNaN(w1) || isNaN(w2)) return null;

    let signalType: SignalType = "NO_SIGNAL";
    let reason = "";

    if (w1 < -60 && w1 < w2) {
      signalType = "LONG";
      reason = `Wave Trend oversold crossover (${w1.toFixed(1)})`;
    } else if (w1 > 60 && w1 > w2) {
      signalType = "SHORT";
      reason = `Wave Trend overbought crossover (${w1.toFixed(1)})`;
    }

    if (signalType === "NO_SIGNAL") return null;

    return {
      type: signalType,
      confidence: 70,
      symbol: "",
      timeframe: this.config.defaultTimeframe,
      timestamp: new Date(),
      price: currentPrice,
      reason,
      metadata: { wave1: w1, wave2: w2 },
    };
  }

  populateExitSignal(candles: Candle[], indicators: IndicatorResult, position: { direction: "LONG" | "SHORT"; entryPrice: number; currentPrice: number; size: number; openTime: Date; }): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const w1 = this.wave1[lastIndex];

    if (isNaN(w1)) return null;

    let shouldExit = false;
    let reason = "";

    if (position.direction === "LONG" && w1 > 53) {
      shouldExit = true;
      reason = "Wave Trend reached overbought zone";
    }
    if (position.direction === "SHORT" && w1 < -53) {
      shouldExit = true;
      reason = "Wave Trend reached oversold zone";
    }

    if (!shouldExit) return null;

    return {
      type: position.direction === "LONG" ? "EXIT_LONG" : "EXIT_SHORT",
      confidence: 70,
      symbol: "",
      timeframe: this.config.defaultTimeframe,
      timestamp: new Date(),
      price: position.currentPrice,
      reason,
    };
  }
}

// ==================== 8. CCI SRSI ====================

export const ZENBOT_CCI_SRSI_CONFIG: StrategyConfig = {
  id: "zenbot-cci-srsi",
  name: "Zenbot Stochastic CCI",
  description: "Combined CCI with Stochastic RSI for mean reversion",
  version: "1.0.0",
  author: "Zenbot",
  timeframes: ["10m", "20m", "30m"],
  defaultTimeframe: "20m",
  parameters: [
    { name: "cciPeriod", type: "integer", defaultValue: 14, min: 7, max: 21, category: "CCI" },
    { name: "rsiPeriod", type: "integer", defaultValue: 14, min: 7, max: 21, category: "RSI" },
  ],
  defaultTactics: [PREDEFINED_TACTICS_SETS[0]],
  tags: ["oscillator", "zenbot", "cci", "stochastic"],
  minCandlesRequired: 30,
};

export class ZenbotCCISRSIStrategy extends BaseStrategy {
  private cci: number[] = [];
  private k: number[] = [];

  constructor() {
    super(ZENBOT_CCI_SRSI_CONFIG);
  }

  populateIndicators(candles: Candle[]): IndicatorResult {
    const closes = candles.map(c => c.close);
    const cciPeriod = Number(this.parameters.cciPeriod);
    const rsiPeriod = Number(this.parameters.rsiPeriod);

    this.cci = CCI(candles, cciPeriod);
    const srsi = stochasticRSI(closes, rsiPeriod, 9, 5, 3);
    this.k = srsi.k;

    return { custom: { cci: this.cci, stochK: this.k } };
  }

  populateEntrySignal(candles: Candle[], indicators: IndicatorResult, currentPrice: number): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const cci = this.cci[lastIndex];
    const k = this.k[lastIndex];

    if (isNaN(cci) || isNaN(k)) return null;

    let signalType: SignalType = "NO_SIGNAL";
    let reason = "";

    if (cci < -90 && k < 18) {
      signalType = "LONG";
      reason = `CCI oversold (${cci.toFixed(0)}) + StochRSI oversold (${k.toFixed(1)})`;
    } else if (cci > 140 && k > 85) {
      signalType = "SHORT";
      reason = `CCI overbought (${cci.toFixed(0)}) + StochRSI overbought (${k.toFixed(1)})`;
    }

    if (signalType === "NO_SIGNAL") return null;

    return {
      type: signalType,
      confidence: 75,
      symbol: "",
      timeframe: this.config.defaultTimeframe,
      timestamp: new Date(),
      price: currentPrice,
      reason,
      metadata: { cci, k },
    };
  }

  populateExitSignal(candles: Candle[], indicators: IndicatorResult, position: { direction: "LONG" | "SHORT"; entryPrice: number; currentPrice: number; size: number; openTime: Date; }): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const cci = this.cci[lastIndex];
    const k = this.k[lastIndex];

    if (isNaN(cci) || isNaN(k)) return null;

    let shouldExit = false;
    let reason = "";

    if (position.direction === "LONG" && (cci > 100 || k > 80)) {
      shouldExit = true;
      reason = cci > 100 ? "CCI overbought" : "StochRSI overbought";
    }
    if (position.direction === "SHORT" && (cci < -100 || k < 20)) {
      shouldExit = true;
      reason = cci < -100 ? "CCI oversold" : "StochRSI oversold";
    }

    if (!shouldExit) return null;

    return {
      type: position.direction === "LONG" ? "EXIT_LONG" : "EXIT_SHORT",
      confidence: 70,
      symbol: "",
      timeframe: this.config.defaultTimeframe,
      timestamp: new Date(),
      price: position.currentPrice,
      reason,
    };
  }
}
