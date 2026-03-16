/**
 * Unified Bot Types for CITARION
 * 
 * Production-ready type system for managing all bot types through a unified interface.
 * Supports aggregation, control, and monitoring of all trading bots.
 */

// ============================================
// Core Bot Status
// ============================================

export type BotStatus = 'RUNNING' | 'PAUSED' | 'STOPPED' | 'COMPLETED' | 'ERROR';

export type BotControlAction = 'start' | 'pause' | 'resume' | 'stop' | 'restart';

// ============================================
// Bot Type Definitions
// ============================================

export type BotType = 
  | 'grid'      // MESH - Grid trading
  | 'dca'       // SCALE - Dollar Cost Averaging
  | 'bb'        // BAND - Bollinger Bands
  | 'vision'    // FCST - AI Vision/Forecast
  | 'argus'     // PND - Pump & Dump detector
  | 'orion'     // TRND - Trend following
  | 'range'     // RNG - Range trading
  | 'spectrum'  // PR - Portfolio Rebalancing
  | 'reed'      // STA - Statistical Arbitrage
  | 'architect' // MM - Market Making
  | 'equilibrist' // MR - Mean Reversion
  | 'kron'      // TRF - Trend Following
  | 'hft'       // High Frequency Trading
  | 'mft'       // Medium Frequency Trading
  | 'lft'       // Low Frequency Trading
  | 'wolf';     // Whale tracking

// ============================================
// Bot Metadata
// ============================================

export interface BotTypeMetadata {
  id: BotType;
  name: string;
  code: string;
  category: 'operational' | 'analytical' | 'institutional' | 'frequency' | 'meta';
  description: string;
  icon: string;
  route: string;
  features: string[];
}

export const BOT_TYPE_METADATA: Record<BotType, BotTypeMetadata> = {
  grid: {
    id: 'grid',
    name: 'MESH',
    code: 'Сетка',
    category: 'operational',
    description: 'Grid trading bot that creates structured order grid in price range',
    icon: 'Grid3X3',
    route: 'grid-bot',
    features: ['Arithmetic/Geometric grids', 'Trailing grid', 'Adaptive grid', 'Multi-pair support'],
  },
  dca: {
    id: 'dca',
    name: 'SCALE',
    code: 'Усреднение',
    category: 'operational',
    description: 'Dollar Cost Averaging bot with smart position scaling',
    icon: 'Layers',
    route: 'dca-bot',
    features: ['Multi-level DCA', 'Custom ratios', 'Take profit scaling', 'Trailing stop'],
  },
  bb: {
    id: 'bb',
    name: 'BAND',
    code: 'Полосы',
    category: 'operational',
    description: 'Bollinger Bands strategy with stochastic confirmation',
    icon: 'Activity',
    route: 'bb-bot',
    features: ['Double BB', 'Stochastic RSI', 'Multi-timeframe', 'Signal history'],
  },
  vision: {
    id: 'vision',
    name: 'FCST',
    code: 'Видение',
    category: 'analytical',
    description: 'AI-powered price prediction and forecasting',
    icon: 'Eye',
    route: 'vision-bot',
    features: ['ML predictions', 'Confidence scoring', 'Multi-model ensemble', 'Backtesting'],
  },
  argus: {
    id: 'argus',
    name: 'PND',
    code: 'Аргус',
    category: 'analytical',
    description: 'Whale activity and pump & dump detection',
    icon: 'Radar',
    route: 'argus-bot',
    features: ['Whale tracking', 'Volume analysis', 'Pump detection', 'Alert system'],
  },
  orion: {
    id: 'orion',
    name: 'TRND',
    code: 'Орион',
    category: 'analytical',
    description: 'Trend following with multi-asset correlation',
    icon: 'Target',
    route: 'orion-bot',
    features: ['Trend detection', 'Correlation analysis', 'Multi-asset', 'Risk parity'],
  },
  range: {
    id: 'range',
    name: 'RNG',
    code: 'Диапазон',
    category: 'analytical',
    description: 'Range-bound trading with support/resistance',
    icon: 'Minimize2',
    route: 'range-bot',
    features: ['S/R detection', 'Range breakout', 'Mean reversion', 'Volume profile'],
  },
  spectrum: {
    id: 'spectrum',
    name: 'PR',
    code: 'Спектр',
    category: 'institutional',
    description: 'Portfolio rebalancing with spectrum analysis',
    icon: 'ArrowLeftRight',
    route: 'spectrum-bot',
    features: ['Auto-rebalancing', 'Risk budgeting', 'Multi-asset', 'Tax optimization'],
  },
  reed: {
    id: 'reed',
    name: 'STA',
    code: 'Рид',
    category: 'institutional',
    description: 'Statistical arbitrage with cointegration pairs',
    icon: 'Scale',
    route: 'reed-bot',
    features: ['Pairs trading', 'Cointegration', 'Spread analysis', 'Mean reversion'],
  },
  architect: {
    id: 'architect',
    name: 'MM',
    code: 'Архитектор',
    category: 'institutional',
    description: 'Market making with liquidity provision',
    icon: 'Building',
    route: 'architect-bot',
    features: ['Liquidity provision', 'Spread capture', 'Inventory management', 'Hedging'],
  },
  equilibrist: {
    id: 'equilibrist',
    name: 'MR',
    code: 'Эквилибрист',
    category: 'institutional',
    description: 'Mean reversion with dynamic equilibrium',
    icon: 'Minimize2',
    route: 'equilibrist-bot',
    features: ['Dynamic equilibrium', 'Statistical bounds', 'Auto-scaling', 'Risk control'],
  },
  kron: {
    id: 'kron',
    name: 'TRF',
    code: 'Крон',
    category: 'institutional',
    description: 'Trend following with adaptive filters',
    icon: 'TrendingUp',
    route: 'kron-bot',
    features: ['Adaptive filters', 'Position sizing', 'Risk management', 'Multi-timeframe'],
  },
  hft: {
    id: 'hft',
    name: 'HFT',
    code: 'Гелиос',
    category: 'frequency',
    description: 'High Frequency Trading with ultra-low latency',
    icon: 'Zap',
    route: 'hft-bot',
    features: ['Ultra-low latency', 'Order book analysis', 'Scalping', 'Co-location ready'],
  },
  mft: {
    id: 'mft',
    name: 'MFT',
    code: 'Селена',
    category: 'frequency',
    description: 'Medium Frequency Trading with statistical edge',
    icon: 'Clock',
    route: 'mft-bot',
    features: ['Statistical arbitrage', 'Mean reversion', 'Multi-pair', 'Risk controls'],
  },
  lft: {
    id: 'lft',
    name: 'LFT',
    code: 'Атлас',
    category: 'frequency',
    description: 'Low Frequency Trading with swing positions',
    icon: 'Compass',
    route: 'lft-bot',
    features: ['Swing trading', 'Position holding', 'Macro analysis', 'Portfolio approach'],
  },
  wolf: {
    id: 'wolf',
    name: 'WOLF',
    code: 'Волк',
    category: 'analytical',
    description: 'Whale tracking and smart money following',
    icon: 'PawPrint',
    route: 'wolfbot',
    features: ['Whale detection', 'Smart money', 'On-chain analysis', 'Alert system'],
  },
};

// ============================================
// Unified Bot Interface
// ============================================

export interface UnifiedBot {
  // Core identification
  id: string;
  type: BotType;
  name: string;
  description?: string;
  
  // Status
  status: BotStatus;
  isActive: boolean;
  
  // Trading configuration
  symbol: string;
  exchangeId: string;
  direction: 'LONG' | 'SHORT' | 'BOTH';
  
  // Account
  accountId: string;
  accountType: 'DEMO' | 'REAL';
  
  // Performance metrics
  metrics: BotMetrics;
  
  // Configuration summary (type-specific)
  configSummary: Record<string, unknown>;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  stoppedAt?: Date;
  
  // Runtime info
  uptime?: string;
  lastActivity?: Date;
  error?: string;
}

export interface BotMetrics {
  // PnL
  realizedPnL: number;
  unrealizedPnL: number;
  totalProfit: number;
  
  // Performance
  roi: number;
  winRate: number;
  profitFactor: number;
  
  // Activity
  totalTrades: number;
  winTrades: number;
  lossTrades: number;
  
  // Risk
  maxDrawdown: number;
  currentDrawdown: number;
  
  // Position
  activePositions: number;
  openOrders: number;
  investedAmount: number;
}

// ============================================
// Bot Configuration Interfaces
// ============================================

export interface GridBotConfig {
  gridType: 'ARITHMETIC' | 'GEOMETRIC';
  gridCount: number;
  upperPrice: number;
  lowerPrice: number;
  totalInvestment: number;
  leverage: number;
  takeProfit?: number;
  stopLoss?: number;
  trailingGrid: boolean;
  adaptiveEnabled: boolean;
}

export interface DcaBotConfig {
  baseAmount: number;
  dcaLevels: number;
  dcaPercent: number;
  dcaMultiplier: number;
  tpValue: number;
  tpType: 'PERCENT' | 'PRICE';
  slEnabled: boolean;
  slValue?: number;
  leverage: number;
  trailingEnabled: boolean;
}

export interface BBBotConfig {
  marketType: 'SPOT' | 'FUTURES';
  timeframes: string[];
  tradeAmount: number;
  leverage: number;
  stopLoss?: number;
  takeProfit?: number;
  trailingStop?: number;
  bbInnerPeriod: number;
  bbInnerDeviation: number;
  bbOuterPeriod: number;
  bbOuterDeviation: number;
  stochKPeriod: number;
  stochDPeriod: number;
  stochOverbought: number;
  stochOversold: number;
}

// ============================================
// Bot Control Interfaces
// ============================================

export interface BotControlRequest {
  botId: string;
  botType: BotType;
  action: BotControlAction;
  options?: {
    closePositions?: boolean;
    reason?: string;
  };
}

export interface BotControlResponse {
  success: boolean;
  message: string;
  newStatus: BotStatus;
  timestamp: Date;
}

// ============================================
// Create Bot Form
// ============================================

export interface CreateBotRequest {
  type: BotType;
  name: string;
  description?: string;
  accountId: string;
  symbol: string;
  exchangeId: string;
  direction: 'LONG' | 'SHORT' | 'BOTH';
  config: GridBotConfig | DcaBotConfig | BBBotConfig | Record<string, unknown>;
}

// ============================================
// Dashboard Statistics
// ============================================

export interface BotDashboardStats {
  totalBots: number;
  activeBots: number;
  pausedBots: number;
  stoppedBots: number;
  
  totalInvested: number;
  totalPnL: number;
  totalROI: number;
  
  byType: Record<BotType, {
    count: number;
    active: number;
    pnl: number;
  }>;
  
  byExchange: Record<string, {
    count: number;
    active: number;
    pnl: number;
  }>;
}
