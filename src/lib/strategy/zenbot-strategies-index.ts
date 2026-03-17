/**
 * Zenbot Strategies - Main Export
 * 
 * Aggregates all Zenbot strategies from modular files.
 * 
 * @module zenbot-strategies
 * @see zenbot-indicators.ts - Indicator calculation helpers
 * @see zenbot-strategies-part1.ts - First 8 strategies
 * @see zenbot-strategies-part2.ts - Remaining strategies
 */

import { BaseStrategy } from "./types";

// Re-export indicator helpers
export {
  standardDeviation,
  bollingerBands,
  calculateVWAP,
  parabolicSAR,
  stochasticRSI,
  CCI,
  TRIX,
  ultimateOscillator,
  hullMA,
  WMA,
  waveTrend,
  momentum,
  PPO,
} from "./zenbot-indicators";

// Re-export strategies from Part 1
export {
  ZENBOT_BOLLINGER_CONFIG,
  ZenbotBollingerStrategy,
  ZENBOT_VWAP_CONFIG,
  ZenbotVWAPStrategy,
  ZENBOT_DEMA_CONFIG,
  ZenbotDEMAStrategy,
  ZENBOT_SAR_CONFIG,
  ZenbotSARStrategy,
  ZENBOT_MOMENTUM_CONFIG,
  ZenbotMomentumStrategy,
  ZENBOT_SRSI_MACD_CONFIG,
  ZenbotStochMACDStrategy,
  ZENBOT_WAVETREND_CONFIG,
  ZenbotWaveTrendStrategy,
  ZENBOT_CCI_SRSI_CONFIG,
  ZenbotCCISRSIStrategy,
} from "./zenbot-strategies-part1";

// Re-export strategies from Part 2
export {
  ZENBOT_TRIX_CONFIG,
  ZenbotTRIXStrategy,
  ZENBOT_ULTOSC_CONFIG,
  ZenbotUltOscStrategy,
  ZENBOT_HMA_CONFIG,
  ZenbotHMAStrategy,
  ZENBOT_PPO_CONFIG,
  ZenbotPPOStrategy,
  ZENBOT_TRUST_CONFIG,
  ZenbotTrustStrategy,
  ZENBOT_TSI_CONFIG,
  ZenbotTSIStrategy,
} from "./zenbot-strategies-part2";

// Import for the combined array
import { ZenbotBollingerStrategy } from "./zenbot-strategies-part1";
import { ZenbotVWAPStrategy } from "./zenbot-strategies-part1";
import { ZenbotDEMAStrategy } from "./zenbot-strategies-part1";
import { ZenbotSARStrategy } from "./zenbot-strategies-part1";
import { ZenbotMomentumStrategy } from "./zenbot-strategies-part1";
import { ZenbotStochMACDStrategy } from "./zenbot-strategies-part1";
import { ZenbotWaveTrendStrategy } from "./zenbot-strategies-part1";
import { ZenbotCCISRSIStrategy } from "./zenbot-strategies-part1";
import { ZenbotTRIXStrategy } from "./zenbot-strategies-part2";
import { ZenbotUltOscStrategy } from "./zenbot-strategies-part2";
import { ZenbotHMAStrategy } from "./zenbot-strategies-part2";
import { ZenbotPPOStrategy } from "./zenbot-strategies-part2";
import { ZenbotTrustStrategy } from "./zenbot-strategies-part2";
import { ZenbotTSIStrategy } from "./zenbot-strategies-part2";

// Combined array of all Zenbot strategies
export const ZENBOT_STRATEGIES: typeof BaseStrategy[] = [
  ZenbotBollingerStrategy,
  ZenbotVWAPStrategy,
  ZenbotDEMAStrategy,
  ZenbotSARStrategy,
  ZenbotMomentumStrategy,
  ZenbotStochMACDStrategy,
  ZenbotWaveTrendStrategy,
  ZenbotCCISRSIStrategy,
  ZenbotTRIXStrategy,
  ZenbotUltOscStrategy,
  ZenbotHMAStrategy,
  ZenbotPPOStrategy,
  ZenbotTrustStrategy,
  ZenbotTSIStrategy,
];

// Default export for backward compatibility
export default ZENBOT_STRATEGIES;
