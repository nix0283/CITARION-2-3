/**
 * Built-in Pivot Point Indicators
 * 
 * Standard, Fibonacci, Camarilla, Woodie, Demark Pivot Points
 */

import { BuiltInIndicator } from './builtin-types';

export const PIVOT_INDICATORS: BuiltInIndicator[] = [
  {
    id: 'pivot_standard',
    name: 'Pivot Points (Standard)',
    category: 'pivot',
    description: 'Standard Floor Pivot Points - наиболее распространённый тип пивотов на основе HLC предыдущего периода',
    pineCode: `//@version=5
indicator("Pivot Points Standard", overlay=true)
// Standard Pivot Points
// PP = (High + Low + Close) / 3
// R1 = 2*PP - Low, S1 = 2*PP - High
// R2 = PP + (High - Low), S2 = PP - (High - Low)
// R3 = High + 2*(PP - Low), S3 = Low - 2*(High - PP)`,
    inputSchema: [
      { name: 'type', type: 'string', default: 'standard', options: ['standard', 'fibonacci', 'camarilla', 'woodie', 'demark'] },
      { name: 'useWeekly', type: 'bool', default: false },
      { name: 'useMonthly', type: 'bool', default: false },
    ],
    outputConfig: [
      { name: 'pivot', type: 'line', color: '#FFD700' },
      { name: 'r1', type: 'line', color: '#EF5350' },
      { name: 'r2', type: 'line', color: '#E91E63' },
      { name: 'r3', type: 'line', color: '#CE93D8' },
      { name: 's1', type: 'line', color: '#26A69A' },
      { name: 's2', type: 'line', color: '#66BB6A' },
      { name: 's3', type: 'line', color: '#A5D6A7' },
    ],
    overlay: true,
    author: 'ai-technicals',
  },
  {
    id: 'pivot_fibonacci',
    name: 'Pivot Points (Fibonacci)',
    category: 'pivot',
    description: 'Fibonacci Pivot Points - используют уровни Фибоначчи для расчёта поддержки и сопротивления',
    pineCode: `//@version=5
indicator("Pivot Points Fibonacci", overlay=true)
// Fibonacci Pivot Points
// PP = (High + Low + Close) / 3
// R1 = PP + 0.382*(High-Low), S1 = PP - 0.382*(High-Low)
// R2 = PP + 0.618*(High-Low), S2 = PP - 0.618*(High-Low)
// R3 = PP + 1.000*(High-Low), S3 = PP - 1.000*(High-Low)`,
    inputSchema: [
      { name: 'type', type: 'string', default: 'fibonacci', options: ['standard', 'fibonacci', 'camarilla', 'woodie', 'demark'] },
      { name: 'useWeekly', type: 'bool', default: false },
      { name: 'useMonthly', type: 'bool', default: false },
    ],
    outputConfig: [
      { name: 'pivot', type: 'line', color: '#FFD700' },
      { name: 'r1', type: 'line', color: '#EF5350' },
      { name: 'r2', type: 'line', color: '#E91E63' },
      { name: 'r3', type: 'line', color: '#CE93D8' },
      { name: 's1', type: 'line', color: '#26A69A' },
      { name: 's2', type: 'line', color: '#66BB6A' },
      { name: 's3', type: 'line', color: '#A5D6A7' },
    ],
    overlay: true,
    author: 'ai-technicals',
  },
  {
    id: 'pivot_camarilla',
    name: 'Pivot Points (Camarilla)',
    category: 'pivot',
    description: 'Camarilla Pivot Points - разработаны Ником Стоттом, используют особую формулу с фактором диапазона',
    pineCode: `//@version=5
indicator("Pivot Points Camarilla", overlay=true)
// Camarilla Pivot Points
// R1 = Close + (High-Low)*1.1/12
// S1 = Close - (High-Low)*1.1/12
// R4 = Close + (High-Low)*1.1/2
// S4 = Close - (High-Low)*1.1/2`,
    inputSchema: [
      { name: 'type', type: 'string', default: 'camarilla', options: ['standard', 'fibonacci', 'camarilla', 'woodie', 'demark'] },
      { name: 'useWeekly', type: 'bool', default: false },
      { name: 'useMonthly', type: 'bool', default: false },
    ],
    outputConfig: [
      { name: 'pivot', type: 'line', color: '#FFD700' },
      { name: 'r1', type: 'line', color: '#EF5350' },
      { name: 'r2', type: 'line', color: '#E91E63' },
      { name: 'r3', type: 'line', color: '#CE93D8' },
      { name: 'r4', type: 'line', color: '#AB47BC' },
      { name: 's1', type: 'line', color: '#26A69A' },
      { name: 's2', type: 'line', color: '#66BB6A' },
      { name: 's3', type: 'line', color: '#A5D6A7' },
      { name: 's4', type: 'line', color: '#81C784' },
    ],
    overlay: true,
    author: 'ai-technicals',
  },
  {
    id: 'pivot_woodie',
    name: 'Pivot Points (Woodie)',
    category: 'pivot',
    description: 'Woodie Pivot Points - придают больший вес цене закрытия в расчётах',
    pineCode: `//@version=5
indicator("Pivot Points Woodie", overlay=true)
// Woodie Pivot Points
// PP = (High + Low + 2*Close) / 4
// R1 = 2*PP - Low, S1 = 2*PP - High
// R2 = PP + High - Low, S2 = PP - High + Low`,
    inputSchema: [
      { name: 'type', type: 'string', default: 'woodie', options: ['standard', 'fibonacci', 'camarilla', 'woodie', 'demark'] },
      { name: 'useWeekly', type: 'bool', default: false },
      { name: 'useMonthly', type: 'bool', default: false },
    ],
    outputConfig: [
      { name: 'pivot', type: 'line', color: '#FFD700' },
      { name: 'r1', type: 'line', color: '#EF5350' },
      { name: 'r2', type: 'line', color: '#E91E63' },
      { name: 's1', type: 'line', color: '#26A69A' },
      { name: 's2', type: 'line', color: '#66BB6A' },
    ],
    overlay: true,
    author: 'ai-technicals',
  },
  {
    id: 'pivot_demark',
    name: 'Pivot Points (Demark)',
    category: 'pivot',
    description: 'Demark Pivot Points - используют формулу Тома Демарка с учётом отношения Open и Close',
    pineCode: `//@version=5
indicator("Pivot Points Demark", overlay=true)
// Demark Pivot Points
// If Close < Open: X = High + 2*Low + Close
// If Close > Open: X = 2*High + Low + Close
// If Close = Open: X = High + Low + 2*Close
// PP = X / 4
// R1 = X / 2 - Low, S1 = X / 2 - High`,
    inputSchema: [
      { name: 'type', type: 'string', default: 'demark', options: ['standard', 'fibonacci', 'camarilla', 'woodie', 'demark'] },
      { name: 'useWeekly', type: 'bool', default: false },
      { name: 'useMonthly', type: 'bool', default: false },
    ],
    outputConfig: [
      { name: 'pivot', type: 'line', color: '#FFD700' },
      { name: 'r1', type: 'line', color: '#EF5350' },
      { name: 's1', type: 'line', color: '#26A69A' },
    ],
    overlay: true,
    author: 'ai-technicals',
  },
];
