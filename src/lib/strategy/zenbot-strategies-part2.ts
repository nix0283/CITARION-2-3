/**
 * Zenbot Strategies - Part 2
 * 
 * Contains the remaining Zenbot strategies:
 * - TRIX
 * - Ultimate Oscillator
 * - Hull Moving Average
 * - PPO
 * - Trust/Distrust
 */

import { Candle, IndicatorResult, StrategySignal, StrategyConfig, BaseStrategy, SignalType } from "./types";
import { PREDEFINED_TACTICS_SETS } from "./tactics/types";
import { TRIX, ultimateOscillator, hullMA, PPO, WMA } from "./zenbot-indicators";
import { EMA, SMA } from "./indicators";

// ==================== 9. TRIX ====================

export const ZENBOT_TRIX_CONFIG: StrategyConfig = {
  id: "zenbot-trix",
  name: "Zenbot TRIX",
  description: "Trade on TRIX oscillator signals",
  version: "1.0.0",
  author: "Zenbot",
  timeframes: ["15m", "1h", "4h"],
  defaultTimeframe: "1h",
  parameters: [
    { name: "trixPeriod", type: "integer", defaultValue: 14, min: 7, max: 30, category: "TRIX" },
    { name: "signalPeriod", type: "integer", defaultValue: 9, min: 5, max: 15, category: "Signal" },
  ],
  defaultTactics: [PREDEFINED_TACTICS_SETS[0]],
  tags: ["oscillator", "zenbot", "trix"],
  minCandlesRequired: 50,
};

export class ZenbotTRIXStrategy extends BaseStrategy {
  private trix: number[] = [];
  private signal: number[] = [];

  constructor() {
    super(ZENBOT_TRIX_CONFIG);
  }

  populateIndicators(candles: Candle[]): IndicatorResult {
    const closes = candles.map(c => c.close);
    const period = Number(this.parameters.trixPeriod);

    this.trix = TRIX(closes, period);
    this.signal = EMA(this.trix, Number(this.parameters.signalPeriod));

    return { custom: { trix: this.trix, signal: this.signal } };
  }

  populateEntrySignal(candles: Candle[], indicators: IndicatorResult, currentPrice: number): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const trix = this.trix[lastIndex];
    const trixPrev = this.trix[lastIndex - 1];
    const signal = this.signal[lastIndex];

    if (isNaN(trix) || isNaN(signal)) return null;

    let signalType: SignalType = "NO_SIGNAL";
    let reason = "";

    if (trix > signal && trixPrev <= signal) {
      signalType = "LONG";
      reason = `TRIX crossed above signal (${trix.toFixed(4)})`;
    } else if (trix < signal && trixPrev >= signal) {
      signalType = "SHORT";
      reason = `TRIX crossed below signal (${trix.toFixed(4)})`;
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
      metadata: { trix, signal },
    };
  }

  populateExitSignal(candles: Candle[], indicators: IndicatorResult, position: { direction: "LONG" | "SHORT"; entryPrice: number; currentPrice: number; size: number; openTime: Date; }): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const trix = this.trix[lastIndex];
    const signal = this.signal[lastIndex];

    if (isNaN(trix)) return null;

    let shouldExit = false;
    let reason = "";

    if (position.direction === "LONG" && trix < signal) {
      shouldExit = true;
      reason = "TRIX crossed below signal - exit long";
    }
    if (position.direction === "SHORT" && trix > signal) {
      shouldExit = true;
      reason = "TRIX crossed above signal - exit short";
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

// ==================== 10. ULTIMATE OSCILLATOR ====================

export const ZENBOT_ULTOSC_CONFIG: StrategyConfig = {
  id: "zenbot-ultosc",
  name: "Zenbot Ultimate Oscillator",
  description: "Trade on Ultimate Oscillator divergences and levels",
  version: "1.0.0",
  author: "Zenbot",
  timeframes: ["15m", "1h", "4h"],
  defaultTimeframe: "1h",
  parameters: [
    { name: "period1", type: "integer", defaultValue: 7, min: 5, max: 15, category: "UO" },
    { name: "period2", type: "integer", defaultValue: 14, min: 10, max: 20, category: "UO" },
    { name: "period3", type: "integer", defaultValue: 28, min: 20, max: 40, category: "UO" },
  ],
  defaultTactics: [PREDEFINED_TACTICS_SETS[0]],
  tags: ["oscillator", "zenbot", "ultimate"],
  minCandlesRequired: 30,
};

export class ZenbotUltOscStrategy extends BaseStrategy {
  private uo: number[] = [];

  constructor() {
    super(ZENBOT_ULTOSC_CONFIG);
  }

  populateIndicators(candles: Candle[]): IndicatorResult {
    const p1 = Number(this.parameters.period1);
    const p2 = Number(this.parameters.period2);
    const p3 = Number(this.parameters.period3);

    this.uo = ultimateOscillator(candles, p1, p2, p3);
    return { custom: { uo: this.uo } };
  }

  populateEntrySignal(candles: Candle[], indicators: IndicatorResult, currentPrice: number): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const uo = this.uo[lastIndex];
    const uoPrev = this.uo[lastIndex - 1];

    if (isNaN(uo)) return null;

    let signalType: SignalType = "NO_SIGNAL";
    let reason = "";

    if (uo < 30 && uoPrev < uo) {
      signalType = "LONG";
      reason = `Ultimate Oscillator oversold (${uo.toFixed(1)})`;
    } else if (uo > 70 && uoPrev > uo) {
      signalType = "SHORT";
      reason = `Ultimate Oscillator overbought (${uo.toFixed(1)})`;
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
      metadata: { uo },
    };
  }

  populateExitSignal(candles: Candle[], indicators: IndicatorResult, position: { direction: "LONG" | "SHORT"; entryPrice: number; currentPrice: number; size: number; openTime: Date; }): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const uo = this.uo[lastIndex];

    if (isNaN(uo)) return null;

    let shouldExit = false;
    let reason = "";

    if (position.direction === "LONG" && uo > 70) {
      shouldExit = true;
      reason = "Ultimate Oscillator overbought - exit long";
    }
    if (position.direction === "SHORT" && uo < 30) {
      shouldExit = true;
      reason = "Ultimate Oscillator oversold - exit short";
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

// ==================== 11. HULL MOVING AVERAGE ====================

export const ZENBOT_HMA_CONFIG: StrategyConfig = {
  id: "zenbot-hma",
  name: "Zenbot Hull MA",
  description: "Trade on Hull Moving Average direction changes",
  version: "1.0.0",
  author: "Zenbot",
  timeframes: ["5m", "15m", "1h"],
  defaultTimeframe: "15m",
  parameters: [
    { name: "hmaPeriod", type: "integer", defaultValue: 20, min: 10, max: 50, category: "HMA" },
  ],
  defaultTactics: [PREDEFINED_TACTICS_SETS[1]],
  tags: ["trend", "zenbot", "hma"],
  minCandlesRequired: 50,
};

export class ZenbotHMAStrategy extends BaseStrategy {
  private hma: number[] = [];

  constructor() {
    super(ZENBOT_HMA_CONFIG);
  }

  populateIndicators(candles: Candle[]): IndicatorResult {
    const closes = candles.map(c => c.close);
    const period = Number(this.parameters.hmaPeriod);
    this.hma = hullMA(closes, period);
    return { custom: { hma: this.hma } };
  }

  populateEntrySignal(candles: Candle[], indicators: IndicatorResult, currentPrice: number): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const hma = this.hma[lastIndex];
    const hmaPrev = this.hma[lastIndex - 1];
    const hmaPrev2 = this.hma[lastIndex - 2];

    if (isNaN(hma) || isNaN(hmaPrev)) return null;

    let signalType: SignalType = "NO_SIGNAL";
    let reason = "";

    // HMA turning up
    if (hma > hmaPrev && hmaPrev <= hmaPrev2) {
      signalType = "LONG";
      reason = `HMA turned up (${hma.toFixed(2)})`;
    }
    // HMA turning down
    else if (hma < hmaPrev && hmaPrev >= hmaPrev2) {
      signalType = "SHORT";
      reason = `HMA turned down (${hma.toFixed(2)})`;
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
      metadata: { hma },
    };
  }

  populateExitSignal(candles: Candle[], indicators: IndicatorResult, position: { direction: "LONG" | "SHORT"; entryPrice: number; currentPrice: number; size: number; openTime: Date; }): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const hma = this.hma[lastIndex];
    const hmaPrev = this.hma[lastIndex - 1];

    if (isNaN(hma)) return null;

    let shouldExit = false;
    let reason = "";

    if (position.direction === "LONG" && hma < hmaPrev) {
      shouldExit = true;
      reason = "HMA turned down - exit long";
    }
    if (position.direction === "SHORT" && hma > hmaPrev) {
      shouldExit = true;
      reason = "HMA turned up - exit short";
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

// ==================== 12. PPO ====================

export const ZENBOT_PPO_CONFIG: StrategyConfig = {
  id: "zenbot-ppo",
  name: "Zenbot PPO",
  description: "Trade on Percentage Price Oscillator signals",
  version: "1.0.0",
  author: "Zenbot",
  timeframes: ["15m", "1h", "4h"],
  defaultTimeframe: "1h",
  parameters: [
    { name: "fastPeriod", type: "integer", defaultValue: 12, min: 5, max: 20, category: "PPO" },
    { name: "slowPeriod", type: "integer", defaultValue: 26, min: 15, max: 40, category: "PPO" },
    { name: "signalPeriod", type: "integer", defaultValue: 9, min: 5, max: 15, category: "Signal" },
  ],
  defaultTactics: [PREDEFINED_TACTICS_SETS[0]],
  tags: ["oscillator", "zenbot", "ppo"],
  minCandlesRequired: 50,
};

export class ZenbotPPOStrategy extends BaseStrategy {
  private ppo: number[] = [];
  private signal: number[] = [];
  private histogram: number[] = [];

  constructor() {
    super(ZENBOT_PPO_CONFIG);
  }

  populateIndicators(candles: Candle[]): IndicatorResult {
    const closes = candles.map(c => c.close);
    const fast = Number(this.parameters.fastPeriod);
    const slow = Number(this.parameters.slowPeriod);
    const signal = Number(this.parameters.signalPeriod);

    const ppoResult = PPO(closes, fast, slow, signal);
    this.ppo = ppoResult.ppo;
    this.signal = ppoResult.signal;
    this.histogram = ppoResult.histogram;

    return { custom: { ppo: this.ppo, signal: this.signal, histogram: this.histogram } };
  }

  populateEntrySignal(candles: Candle[], indicators: IndicatorResult, currentPrice: number): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const ppo = this.ppo[lastIndex];
    const ppoPrev = this.ppo[lastIndex - 1];
    const signal = this.signal[lastIndex];

    if (isNaN(ppo) || isNaN(signal)) return null;

    let signalType: SignalType = "NO_SIGNAL";
    let reason = "";

    if (ppo > signal && ppoPrev <= signal) {
      signalType = "LONG";
      reason = `PPO bullish crossover (${ppo.toFixed(2)}%)`;
    } else if (ppo < signal && ppoPrev >= signal) {
      signalType = "SHORT";
      reason = `PPO bearish crossover (${ppo.toFixed(2)}%)`;
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
      metadata: { ppo, signal },
    };
  }

  populateExitSignal(candles: Candle[], indicators: IndicatorResult, position: { direction: "LONG" | "SHORT"; entryPrice: number; currentPrice: number; size: number; openTime: Date; }): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const ppo = this.ppo[lastIndex];
    const signal = this.signal[lastIndex];

    if (isNaN(ppo)) return null;

    let shouldExit = false;
    let reason = "";

    if (position.direction === "LONG" && ppo < signal) {
      shouldExit = true;
      reason = "PPO bearish crossover - exit long";
    }
    if (position.direction === "SHORT" && ppo > signal) {
      shouldExit = true;
      reason = "PPO bullish crossover - exit short";
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

// ==================== 13. TRUST/DISTRUST ====================

export const ZENBOT_TRUST_CONFIG: StrategyConfig = {
  id: "zenbot-trust",
  name: "Zenbot Trust/Distrust",
  description: "Mean reversion based on price extremes",
  version: "1.0.0",
  author: "Zenbot",
  timeframes: ["1h", "4h"],
  defaultTimeframe: "2h",
  parameters: [
    { name: "period", type: "integer", defaultValue: 14, min: 7, max: 30, category: "Lookback" },
    { name: "threshold", type: "number", defaultValue: 0.02, min: 0.01, max: 0.05, category: "Threshold" },
  ],
  defaultTactics: [PREDEFINED_TACTICS_SETS[0]],
  tags: ["mean-reversion", "zenbot"],
  minCandlesRequired: 30,
};

export class ZenbotTrustStrategy extends BaseStrategy {
  private highs: number[] = [];
  private lows: number[] = [];

  constructor() {
    super(ZENBOT_TRUST_CONFIG);
  }

  populateIndicators(candles: Candle[]): IndicatorResult {
    const period = Number(this.parameters.period);
    
    for (let i = 0; i < candles.length; i++) {
      if (i < period - 1) {
        this.highs.push(NaN);
        this.lows.push(NaN);
        continue;
      }
      const slice = candles.slice(i - period + 1, i + 1);
      this.highs.push(Math.max(...slice.map(c => c.high)));
      this.lows.push(Math.min(...slice.map(c => c.low)));
    }

    return { custom: { periodHigh: this.highs, periodLow: this.lows } };
  }

  populateEntrySignal(candles: Candle[], indicators: IndicatorResult, currentPrice: number): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const high = this.highs[lastIndex];
    const low = this.lows[lastIndex];
    const threshold = Number(this.parameters.threshold);

    if (isNaN(high) || isNaN(low)) return null;

    const range = high - low;
    const upperThreshold = high - range * threshold;
    const lowerThreshold = low + range * threshold;

    let signalType: SignalType = "NO_SIGNAL";
    let reason = "";

    if (currentPrice <= lowerThreshold) {
      signalType = "LONG";
      reason = `Price near period low (trust)`;
    } else if (currentPrice >= upperThreshold) {
      signalType = "SHORT";
      reason = `Price near period high (distrust)`;
    }

    if (signalType === "NO_SIGNAL") return null;

    return {
      type: signalType,
      confidence: 65,
      symbol: "",
      timeframe: this.config.defaultTimeframe,
      timestamp: new Date(),
      price: currentPrice,
      suggestedStopLoss: signalType === "LONG" ? low : high,
      reason,
      metadata: { high, low },
    };
  }

  populateExitSignal(candles: Candle[], indicators: IndicatorResult, position: { direction: "LONG" | "SHORT"; entryPrice: number; currentPrice: number; size: number; openTime: Date; }): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const high = this.highs[lastIndex];
    const low = this.lows[lastIndex];

    if (isNaN(high) || isNaN(low)) return null;

    const mid = (high + low) / 2;
    let shouldExit = false;
    let reason = "";

    if (position.direction === "LONG" && currentPrice >= mid) {
      shouldExit = true;
      reason = "Price reached middle of range - exit long";
    }
    if (position.direction === "SHORT" && currentPrice <= mid) {
      shouldExit = true;
      reason = "Price reached middle of range - exit short";
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

// ==================== 14. TSI ====================

export const ZENBOT_TSI_CONFIG: StrategyConfig = {
  id: "zenbot-tsi",
  name: "Zenbot TSI",
  description: "Trade on True Strength Index signals",
  version: "1.0.0",
  author: "Zenbot",
  timeframes: ["15m", "1h", "4h"],
  defaultTimeframe: "1h",
  parameters: [
    { name: "longLength", type: "integer", defaultValue: 25, min: 15, max: 35, category: "TSI" },
    { name: "shortLength", type: "integer", defaultValue: 13, min: 8, max: 18, category: "TSI" },
    { name: "signalLength", type: "integer", defaultValue: 7, min: 5, max: 10, category: "Signal" },
  ],
  defaultTactics: [PREDEFINED_TACTICS_SETS[0]],
  tags: ["oscillator", "zenbot", "tsi"],
  minCandlesRequired: 50,
};

export class ZenbotTSIStrategy extends BaseStrategy {
  private tsi: number[] = [];
  private signal: number[] = [];

  constructor() {
    super(ZENBOT_TSI_CONFIG);
  }

  populateIndicators(candles: Candle[]): IndicatorResult {
    const closes = candles.map(c => c.close);
    const longLen = Number(this.parameters.longLength);
    const shortLen = Number(this.parameters.shortLength);
    const signalLen = Number(this.parameters.signalLength);

    // Calculate TSI
    const momentum = closes.map((c, i) => i === 0 ? 0 : c - closes[i - 1]);
    const absMomentum = momentum.map(Math.abs);

    const smoothMom1 = EMA(momentum, longLen);
    const smoothMom2 = EMA(smoothMom1, shortLen);
    const smoothAbs1 = EMA(absMomentum, longLen);
    const smoothAbs2 = EMA(smoothAbs1, shortLen);

    this.tsi = smoothMom2.map((m, i) => 
      smoothAbs2[i] !== 0 ? 100 * (m / smoothAbs2[i]) : 0
    );

    this.signal = EMA(this.tsi, signalLen);

    return { custom: { tsi: this.tsi, signal: this.signal } };
  }

  populateEntrySignal(candles: Candle[], indicators: IndicatorResult, currentPrice: number): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const tsi = this.tsi[lastIndex];
    const tsiPrev = this.tsi[lastIndex - 1];
    const signal = this.signal[lastIndex];

    if (isNaN(tsi) || isNaN(signal)) return null;

    let signalType: SignalType = "NO_SIGNAL";
    let reason = "";

    if (tsi > signal && tsiPrev <= signal) {
      signalType = "LONG";
      reason = `TSI bullish crossover (${tsi.toFixed(2)})`;
    } else if (tsi < signal && tsiPrev >= signal) {
      signalType = "SHORT";
      reason = `TSI bearish crossover (${tsi.toFixed(2)})`;
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
      metadata: { tsi, signal },
    };
  }

  populateExitSignal(candles: Candle[], indicators: IndicatorResult, position: { direction: "LONG" | "SHORT"; entryPrice: number; currentPrice: number; size: number; openTime: Date; }): StrategySignal | null {
    const lastIndex = candles.length - 1;
    const tsi = this.tsi[lastIndex];
    const signal = this.signal[lastIndex];

    if (isNaN(tsi)) return null;

    let shouldExit = false;
    let reason = "";

    if (position.direction === "LONG" && tsi < signal) {
      shouldExit = true;
      reason = "TSI bearish crossover - exit long";
    }
    if (position.direction === "SHORT" && tsi > signal) {
      shouldExit = true;
      reason = "TSI bullish crossover - exit short";
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
