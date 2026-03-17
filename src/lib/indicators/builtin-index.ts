/**
 * Built-in Indicators - Main Export
 *
 * Aggregates all indicator categories into a single export
 */

import { BuiltInIndicator } from './builtin-types';
import { MOVING_AVERAGE_INDICATORS } from './builtin-moving-averages';
import { OSCILLATOR_INDICATORS } from './builtin-oscillators';
import { VOLATILITY_INDICATORS } from './builtin-volatility';
import { VOLUME_INDICATORS } from './builtin-volume';
import { PIVOT_INDICATORS } from './builtin-pivot';
import { DEPTH_INDICATORS } from './builtin-depth';

// Re-export types
export type { BuiltInIndicator, IndicatorCategory, IndicatorInput, IndicatorOutput } from './builtin-types';

// Re-export individual categories
export { MOVING_AVERAGE_INDICATORS } from './builtin-moving-averages';
export { OSCILLATOR_INDICATORS } from './builtin-oscillators';
export { VOLATILITY_INDICATORS } from './builtin-volatility';
export { VOLUME_INDICATORS } from './builtin-volume';
export { PIVOT_INDICATORS } from './builtin-pivot';
export { DEPTH_INDICATORS } from './builtin-depth';

// Combined array of all built-in indicators
export const BUILTIN_INDICATORS: BuiltInIndicator[] = [
  ...MOVING_AVERAGE_INDICATORS,
  ...OSCILLATOR_INDICATORS,
  ...VOLATILITY_INDICATORS,
  ...VOLUME_INDICATORS,
  ...PIVOT_INDICATORS,
  ...DEPTH_INDICATORS,
];

// Helper to get indicators by category
export function getIndicatorsByCategory(category: string): BuiltInIndicator[] {
  return BUILTIN_INDICATORS.filter(ind => ind.category === category);
}

// Helper to get indicator by ID
export function getIndicatorById(id: string): BuiltInIndicator | undefined {
  return BUILTIN_INDICATORS.find(ind => ind.id === id);
}

// Get all available categories
export function getIndicatorCategories(): string[] {
  return [...new Set(BUILTIN_INDICATORS.map(ind => ind.category))];
}

// Default export for backward compatibility
export default BUILTIN_INDICATORS;
