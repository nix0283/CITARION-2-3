/**
 * Built-in Indicators Types
 * 
 * Type definitions for built-in indicators
 */

export interface BuiltInIndicator {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  pineCode: string;
  inputSchema: Array<{
    name: string;
    type: 'int' | 'float' | 'string' | 'bool';
    default: number | string | boolean;
    min?: number;
    max?: number;
    options?: string[];
  }>;
  outputConfig: Array<{
    name: string;
    type: 'line' | 'histogram' | 'area';
    color: string;
  }>;
  overlay: boolean;
  author: string;
}

export type IndicatorCategory = 
  | 'moving_average'
  | 'oscillator'
  | 'volatility'
  | 'volume'
  | 'pivot'
  | 'trend'
  | 'momentum';

export interface IndicatorInput {
  name: string;
  value: number | string | boolean;
}

export interface IndicatorOutput {
  name: string;
  values: number[];
  type: 'line' | 'histogram' | 'area';
  color: string;
}
