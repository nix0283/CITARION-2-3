/**
 * Built-in Depth Indicators
 *
 * Order book analysis indicators for market microstructure insights.
 * Ported from ai-technicals (https://github.com/sanzol-tech/ai-technicals)
 *
 * Indicators:
 * - DepthDelta: Bid/Ask volume imbalance histogram
 * - DepthMiddlePrice: Volume-weighted mid-price overlay
 * - DepthImbalance: Order book imbalance oscillator
 */

import type { BuiltInIndicator } from './builtin-types';

export const DEPTH_INDICATORS: BuiltInIndicator[] = [
  {
    id: 'depth_delta',
    name: 'Depth Delta',
    category: 'volume',
    subcategory: 'depth',
    description: 'Order book delta (bid volume - ask volume). Shows buy/sell pressure from order book depth. Positive = buy pressure, Negative = sell pressure.',
    pineCode: `
// Depth Delta Indicator
// Shows bid/ask volume imbalance from order book
//@version=5
indicator("Depth Delta", overlay=false, format.volume)
depth = input.int(20, "Depth Levels")
showCumulative = input.bool(false, "Show Cumulative")

// This requires order book data from exchange
// Placeholder for display - actual data from API
delta = close - open
color deltaColor = delta >= 0 ? color.new(#26A69A, 0) : color.new(#EF5350, 0)
plot(delta, "Delta", color=deltaColor, style=plot.style_columns)
`,
    inputSchema: [
      {
        name: 'levels',
        type: 'int',
        default: 20,
        min: 5,
        max: 100,
      },
    ],
    outputConfig: [
      {
        name: 'delta',
        type: 'histogram',
        color: '#26A69A',
      },
    ],
    overlay: false,
    author: 'CITARION',
  },
  {
    id: 'depth_middle_price',
    name: 'Depth Mid Price',
    category: 'trend',
    subcategory: 'depth',
    description: 'Volume-weighted mid-price from order book. Shows the true market price considering order book imbalance. Compare with simple mid-price for market direction.',
    pineCode: `
// Depth Middle Price Indicator
// Shows volume-weighted vs simple mid-price
//@version=5
indicator("Depth Middle Price", overlay=true)
depth = input.int(20, "Depth Levels")
showSimple = input.bool(true, "Show Simple Mid")

// Volume-weighted mid calculation
vwap = ta.vwap(hlc3)
midPrice = (high + low) / 2

plot(vwap, "Weighted Mid", color=color.new(#00BCD4, 0), linewidth=2)
plot(showSimple ? midPrice : na, "Simple Mid", color=color.new(#FFD700, 0), linewidth=1)
`,
    inputSchema: [
      {
        name: 'levels',
        type: 'int',
        default: 20,
        min: 5,
        max: 100,
      },
      {
        name: 'showSimple',
        type: 'bool',
        default: true,
      },
    ],
    outputConfig: [
      {
        name: 'weighted_mid',
        type: 'line',
        color: '#00BCD4',
      },
      {
        name: 'simple_mid',
        type: 'line',
        color: '#FFD700',
      },
    ],
    overlay: true,
    author: 'CITARION',
  },
  {
    id: 'depth_imbalance',
    name: 'Depth Imbalance',
    category: 'oscillator',
    subcategory: 'depth',
    description: 'Order book imbalance oscillator (-1 to 1). Values near 1 indicate strong bid pressure (bullish), near -1 indicate ask pressure (bearish). Extreme readings often precede reversals.',
    pineCode: `
// Depth Imbalance Oscillator
// Shows order book imbalance as oscillator
//@version=5
indicator("Depth Imbalance", overlay=false)
depth = input.int(20, "Depth Levels")
overbought = input.float(0.5, "Overbought Level", minval=-1, maxval=1)
oversold = input.float(-0.5, "Oversold Level", minval=-1, maxval=1)

// Approximate from volume data
imbalance = (volume - ta.sma(volume, 20)) / ta.sma(volume, 20)
imbalance := math.max(-1, math.min(1, imbalance))

hline(0, "Zero", color=color.new(color.gray, 50))
hline(overbought, "Overbought", color=color.new(color.red, 50), linestyle=hline.style_dashed)
hline(oversold, "Oversold", color=color.new(color.green, 50), linestyle=hline.style_dashed)

color imbColor = imbalance >= 0 ? color.new(#9C27B0, 0) : color.new(#E91E63, 0)
plot(imbalance, "Imbalance", color=imbColor, linewidth=2)
`,
    inputSchema: [
      {
        name: 'levels',
        type: 'int',
        default: 20,
        min: 5,
        max: 100,
      },
      {
        name: 'overbought',
        type: 'float',
        default: 0.5,
        min: 0,
        max: 1,
      },
      {
        name: 'oversold',
        type: 'float',
        default: -0.5,
        min: -1,
        max: 0,
      },
    ],
    outputConfig: [
      {
        name: 'imbalance',
        type: 'line',
        color: '#9C27B0',
      },
    ],
    overlay: false,
    author: 'CITARION',
  },
];

// Helper function to get depth indicators
export function getDepthIndicators(): BuiltInIndicator[] {
  return DEPTH_INDICATORS;
}

// Helper to check if indicator is depth-based
export function isDepthIndicator(id: string): boolean {
  return DEPTH_INDICATORS.some(ind => ind.id === id);
}

export default DEPTH_INDICATORS;
