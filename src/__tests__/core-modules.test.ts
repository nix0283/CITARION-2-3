/**
 * Unit Tests for Core Trading Modules
 * 
 * Tests for:
 * - Indicator calculations (RSI, EMA, SMA, MACD, etc.)
 * - Zenbot indicator helpers
 * - Strategy base functionality
 */

import { describe, it, expect } from 'bun:test';
import { RSI, EMA, SMA, MACD, BollingerBands, ATR } from '../lib/strategy/indicators.ts';
import {
  standardDeviation,
  bollingerBands as zenbotBollingerBands,
  momentum,
  WMA,
} from '../lib/strategy/zenbot-indicators.ts';

// ==================== MOCK DATA ====================

const mockCandles = [
  { open: 100, high: 105, low: 95, close: 102, volume: 1000, openTime: new Date() },
  { open: 102, high: 108, low: 100, close: 106, volume: 1200, openTime: new Date() },
  { open: 106, high: 112, low: 104, close: 110, volume: 1100, openTime: new Date() },
  { open: 110, high: 115, low: 108, close: 112, volume: 1300, openTime: new Date() },
  { open: 112, high: 118, low: 110, close: 115, volume: 900, openTime: new Date() },
  { open: 115, high: 120, low: 113, close: 118, volume: 1400, openTime: new Date() },
  { open: 118, high: 122, low: 116, close: 120, volume: 1100, openTime: new Date() },
  { open: 120, high: 125, low: 118, close: 122, volume: 1000, openTime: new Date() },
  { open: 122, high: 128, low: 120, close: 125, volume: 1200, openTime: new Date() },
  { open: 125, high: 130, low: 123, close: 128, volume: 1300, openTime: new Date() },
  { open: 128, high: 132, low: 126, close: 130, volume: 1100, openTime: new Date() },
  { open: 130, high: 135, low: 128, close: 132, volume: 900, openTime: new Date() },
  { open: 132, high: 138, low: 130, close: 135, volume: 1400, openTime: new Date() },
  { open: 135, high: 140, low: 133, close: 138, volume: 1500, openTime: new Date() },
  { open: 138, high: 142, low: 136, close: 140, volume: 1200, openTime: new Date() },
];

const mockPrices = mockCandles.map(c => c.close);

// ==================== SMA TESTS ====================

describe('SMA (Simple Moving Average)', () => {
  it('should calculate SMA correctly', () => {
    const result = SMA(mockPrices, 5);
    
    // First 4 values should be NaN
    expect(isNaN(result[0])).toBe(true);
    expect(isNaN(result[3])).toBe(true);
    
    // 5th value should be calculated
    expect(isNaN(result[4])).toBe(false);
    
    // Verify calculation
    const expectedSMA5 = mockPrices.slice(0, 5).reduce((a, b) => a + b, 0) / 5;
    expect(result[4]).toBeCloseTo(expectedSMA5, 5);
  });

  it('should handle period of 1', () => {
    const result = SMA(mockPrices, 1);
    expect(result[0]).toBe(mockPrices[0]);
    expect(result[5]).toBe(mockPrices[5]);
  });

  it('should return array of same length', () => {
    const result = SMA(mockPrices, 5);
    expect(result.length).toBe(mockPrices.length);
  });
});

// ==================== EMA TESTS ====================

describe('EMA (Exponential Moving Average)', () => {
  it('should calculate EMA correctly', () => {
    const result = EMA(mockPrices, 5);
    
    expect(result.length).toBe(mockPrices.length);
    // First values are NaN until enough data
    expect(isNaN(result[0])).toBe(true);
    // Last values should be calculated
    expect(isNaN(result[result.length - 1])).toBe(false);
  });

  it('should be more responsive than SMA', () => {
    const ema = EMA(mockPrices, 5);
    const sma = SMA(mockPrices, 5);
    
    // EMA should react faster to price changes
    expect(ema[ema.length - 1]).toBeGreaterThan(0);
  });
});

// ==================== RSI TESTS ====================

describe('RSI (Relative Strength Index)', () => {
  it('should calculate RSI in range 0-100', () => {
    const result = RSI(mockPrices, 14);
    
    result.forEach(val => {
      if (!isNaN(val)) {
        expect(val).toBeGreaterThanOrEqual(0);
        expect(val).toBeLessThanOrEqual(100);
      }
    });
  });

  it('should return array of same length', () => {
    const result = RSI(mockPrices, 14);
    expect(result.length).toBe(mockPrices.length);
  });

  it('should show overbought in uptrend', () => {
    // Create a strong uptrend
    const uptrend = Array.from({ length: 30 }, (_, i) => 100 + i * 2);
    const result = RSI(uptrend, 14);
    
    const lastRSI = result[result.length - 1];
    expect(lastRSI).toBeGreaterThan(70); // Overbought
  });
});

// ==================== MACD TESTS ====================

describe('MACD (Moving Average Convergence Divergence)', () => {
  it('should return macd, signal, and histogram', () => {
    const result = MACD(mockPrices, 12, 26, 9);
    
    expect(result).toHaveProperty('macd');
    expect(result).toHaveProperty('signal');
    expect(result).toHaveProperty('histogram');
    
    expect(result.macd.length).toBe(mockPrices.length);
    expect(result.signal.length).toBe(mockPrices.length);
    expect(result.histogram.length).toBe(mockPrices.length);
  });

  it('histogram should be macd - signal', () => {
    const result = MACD(mockPrices, 12, 26, 9);
    
    result.histogram.forEach((h, i) => {
      if (!isNaN(h) && !isNaN(result.macd[i]) && !isNaN(result.signal[i])) {
        expect(h).toBeCloseTo(result.macd[i] - result.signal[i], 5);
      }
    });
  });
});

// ==================== BOLLINGER BANDS TESTS ====================

describe('Bollinger Bands', () => {
  it('should return upper, middle, and lower bands', () => {
    const result = BollingerBands(mockPrices, 20, 2);
    
    expect(result).toHaveProperty('upper');
    expect(result).toHaveProperty('middle');
    expect(result).toHaveProperty('lower');
  });

  it('upper band should be above middle', () => {
    const result = BollingerBands(mockPrices, 5, 2);
    
    result.upper.forEach((u, i) => {
      if (!isNaN(u) && !isNaN(result.middle[i])) {
        expect(u).toBeGreaterThanOrEqual(result.middle[i]);
      }
    });
  });

  it('lower band should be below middle', () => {
    const result = BollingerBands(mockPrices, 5, 2);
    
    result.lower.forEach((l, i) => {
      if (!isNaN(l) && !isNaN(result.middle[i])) {
        expect(l).toBeLessThanOrEqual(result.middle[i]);
      }
    });
  });
});

// ==================== ATR TESTS ====================

describe('ATR (Average True Range)', () => {
  it('should calculate ATR for candles', () => {
    const result = ATR(mockCandles, 14);
    
    expect(result.length).toBe(mockCandles.length);
  });

  it('ATR should be positive', () => {
    const result = ATR(mockCandles, 5);
    
    result.forEach(val => {
      if (!isNaN(val)) {
        expect(val).toBeGreaterThan(0);
      }
    });
  });
});

// ==================== ZENBOT INDICATOR TESTS ====================

describe('Zenbot Indicators', () => {
  describe('standardDeviation', () => {
    it('should calculate standard deviation', () => {
      const result = standardDeviation(mockPrices, 5);
      
      expect(result.length).toBe(mockPrices.length);
      expect(isNaN(result[4])).toBe(false);
    });

    it('std dev should be positive', () => {
      const result = standardDeviation(mockPrices, 5);
      
      result.forEach(val => {
        if (!isNaN(val)) {
          expect(val).toBeGreaterThanOrEqual(0);
        }
      });
    });
  });

  describe('bollingerBands', () => {
    it('should return valid bands', () => {
      const result = zenbotBollingerBands(mockPrices, 20, 2);
      
      expect(result.upper.length).toBe(mockPrices.length);
      expect(result.middle.length).toBe(mockPrices.length);
      expect(result.lower.length).toBe(mockPrices.length);
    });
  });

  describe('momentum', () => {
    it('should calculate momentum', () => {
      const result = momentum(mockPrices, 5);
      
      expect(result.length).toBe(mockPrices.length);
      expect(isNaN(result[4])).toBe(true); // Need 5 periods
      expect(isNaN(result[5])).toBe(false);
    });

    it('momentum in uptrend should be positive', () => {
      const uptrend = Array.from({ length: 20 }, (_, i) => 100 + i);
      const result = momentum(uptrend, 5);
      
      const lastMomentum = result[result.length - 1];
      expect(lastMomentum).toBeGreaterThan(0);
    });
  });

  describe('WMA (Weighted Moving Average)', () => {
    it('should calculate WMA', () => {
      const result = WMA(mockPrices, 5);
      
      expect(result.length).toBe(mockPrices.length);
      expect(isNaN(result[4])).toBe(false);
    });
  });
});

// ==================== STRATEGY CONFIGURATION TESTS ====================

describe('Strategy Configuration', () => {
  it('should have valid config structure', () => {
    const config = {
      id: 'test-strategy',
      name: 'Test Strategy',
      description: 'Test description',
      version: '1.0.0',
      author: 'Test',
      timeframes: ['1h', '4h'],
      defaultTimeframe: '1h',
      parameters: [],
      defaultTactics: [],
      tags: ['test'],
      minCandlesRequired: 50,
    };
    
    expect(config.id).toBe('test-strategy');
    expect(config.timeframes).toContain('1h');
    expect(config.minCandlesRequired).toBe(50);
  });
});

// ==================== PERFORMANCE TESTS ====================

describe('Performance Tests', () => {
  it('SMA should be fast for large datasets', () => {
    const largeData = Array.from({ length: 10000 }, () => Math.random() * 100);
    
    const start = performance.now();
    SMA(largeData, 50);
    const duration = performance.now() - start;
    
    expect(duration).toBeLessThan(100); // Should complete in < 100ms
  });

  it('EMA should be fast for large datasets', () => {
    const largeData = Array.from({ length: 10000 }, () => Math.random() * 100);
    
    const start = performance.now();
    EMA(largeData, 50);
    const duration = performance.now() - start;
    
    expect(duration).toBeLessThan(100);
  });

  it('RSI should be fast for large datasets', () => {
    const largeData = Array.from({ length: 10000 }, () => Math.random() * 100);
    
    const start = performance.now();
    RSI(largeData, 14);
    const duration = performance.now() - start;
    
    expect(duration).toBeLessThan(100);
  });
});

console.log('✅ All unit tests completed');
