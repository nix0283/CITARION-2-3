/**
 * Built-in Indicators Library
 * 
 * Re-exports from modular indicator files for backward compatibility.
 * 
 * @module builtin-indicators
 * @see builtin-moving-averages.ts - Moving average indicators
 * @see builtin-oscillators.ts - Oscillator indicators
 * @see builtin-volatility.ts - Volatility indicators
 * @see builtin-volume.ts - Volume indicators
 * @see builtin-pivot.ts - Pivot point indicators
 */

// Re-export everything from modular files
export {
  BUILTIN_INDICATORS,
  MOVING_AVERAGE_INDICATORS,
  OSCILLATOR_INDICATORS,
  VOLATILITY_INDICATORS,
  VOLUME_INDICATORS,
  PIVOT_INDICATORS,
  getIndicatorsByCategory,
  getIndicatorById,
  getIndicatorCategories,
} from './builtin-index';

// Re-export types
export type {
  BuiltInIndicator,
  IndicatorCategory,
  IndicatorInput,
  IndicatorOutput,
} from './builtin-types';

// Default export for backward compatibility
export { BUILTIN_INDICATORS as default } from './builtin-index';
