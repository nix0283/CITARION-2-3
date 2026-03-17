/**
 * Extended Position Types
 * 
 * Provides comprehensive position information including:
 * - Liquidation price calculations
 * - Mark price and index price
 * - Break-even price
 * - Margin requirements
 * - Risk metrics
 * 
 * Compatible with CryptoCopyTradeBot patterns and CITARION architecture
 */

import { AllExchangeId, MarginMode, PositionSide } from './types';

// ==================== EXTENDED POSITION INFO ====================

export interface ExtendedPositionInfo {
  // ============ Basic Info ============
  id: string;
  exchange: AllExchangeId;
  symbol: string;
  side: PositionSide;
  
  // ============ Size & Price ============
  quantity: number;              // Position size in base asset
  entryPrice: number;            // Average entry price
  markPrice: number;             // Current mark price
  indexPrice?: number;           // Index price (average across exchanges)
  lastPrice?: number;            // Last trade price
  
  // ============ Liquidation & Break-Even ============
  liquidationPrice?: number;     // Price at which position gets liquidated
  breakEvenPrice?: number;       // Price at which PnL = 0 (including fees)
  bankruptcyPrice?: number;      // Price at which margin = 0
  
  // ============ Margin Info ============
  leverage: number;
  marginMode: MarginMode;
  initialMargin: number;         // Initial margin required
  maintenanceMargin: number;     // Maintenance margin required
  isolatedMargin?: number;       // For isolated positions
  availableMargin?: number;      // Additional margin that can be added
  
  // ============ PnL ============
  unrealizedPnl: number;         // Current unrealized PnL
  realizedPnl: number;           // Realized PnL (partial closes)
  pnlPercentage: number;         // PnL as % of margin
  roe?: number;                  // Return on Equity
  
  // ============ Risk Metrics ============
  marginRatio?: number;          // Margin usage ratio (0-100%)
  liquidationDistance?: number;  // % distance to liquidation
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  
  // ============ Position Metrics ============
  notionalValue: number;         // Position notional value
  positionValue: number;         // Current position value
  highestPrice?: number;         // Highest price since position opened
  lowestPrice?: number;          // Lowest price since position opened
  
  // ============ Orders ============
  stopLoss?: number;             // Stop loss price
  takeProfit?: number;           // Take profit price
  trailingStop?: TrailingStopInfo;
  
  // ============ Timestamps ============
  openedAt: Date;
  updatedAt: Date;
  closedAt?: Date;
  
  // ============ Mode ============
  isDemo: boolean;
  tradingMode: 'LIVE' | 'DEMO';
}

export interface TrailingStopInfo {
  enabled: boolean;
  type: 'PERCENTAGE' | 'FIXED' | 'BREAKEVEN' | 'MOVING_TARGET';
  triggerPrice?: number;
  trailingPercent?: number;
  trailingAmount?: number;
  activationPrice?: number;
  currentStopPrice?: number;
}

// ==================== POSITION RISK CALCULATOR ====================

export class PositionRiskCalculator {
  /**
   * Calculate liquidation price for a position
   * 
   * Formula for isolated margin:
   * Liquidation Price = Entry Price * (1 - (Initial Margin / Position Size) + Maintenance Margin Rate)
   * 
   * For cross margin, considers all positions and account balance
   */
  static calculateLiquidationPrice(
    entryPrice: number,
    leverage: number,
    marginMode: MarginMode,
    side: PositionSide,
    maintenanceMarginRate: number = 0.004, // Default 0.4%
    isolatedMargin?: number
  ): number {
    if (marginMode === 'isolated' && isolatedMargin) {
      // Isolated margin formula
      const marginRatio = 1 / leverage;
      
      if (side === 'long') {
        // For long: price drops, liquidation below entry
        return entryPrice * (1 - marginRatio + maintenanceMarginRate);
      } else {
        // For short: price rises, liquidation above entry
        return entryPrice * (1 + marginRatio - maintenanceMarginRate);
      }
    }
    
    // Cross margin - simplified (actual would need account-level calculation)
    const marginRatio = 1 / leverage;
    
    if (side === 'long') {
      return entryPrice * (1 - marginRatio + maintenanceMarginRate);
    } else {
      return entryPrice * (1 + marginRatio - maintenanceMarginRate);
    }
  }
  
  /**
   * Calculate break-even price including fees
   * 
   * Break-even = Entry Price ± (Entry Fee + Exit Fee) / Quantity
   */
  static calculateBreakEvenPrice(
    entryPrice: number,
    quantity: number,
    side: PositionSide,
    makerFee: number = 0.0002,  // Default 0.02%
    takerFee: number = 0.0005   // Default 0.05%
  ): number {
    // Total fees as % of position
    const totalFeePercent = makerFee + takerFee;
    
    // Entry value
    const entryValue = entryPrice * quantity;
    
    // Fee amount in quote currency
    const entryFee = entryValue * makerFee;
    const exitFee = entryValue * takerFee;
    const totalFees = entryFee + exitFee;
    
    // Break-even price adjustment
    const priceAdjustment = totalFees / quantity;
    
    if (side === 'long') {
      // For long, need price to go up to cover fees
      return entryPrice + priceAdjustment;
    } else {
      // For short, need price to go down to cover fees
      return entryPrice - priceAdjustment;
    }
  }
  
  /**
   * Calculate unrealized PnL
   */
  static calculateUnrealizedPnl(
    entryPrice: number,
    currentPrice: number,
    quantity: number,
    side: PositionSide,
    leverage: number
  ): number {
    const priceDiff = side === 'long' 
      ? currentPrice - entryPrice 
      : entryPrice - currentPrice;
    
    return priceDiff * quantity * leverage;
  }
  
  /**
   * Calculate PnL percentage
   */
  static calculatePnlPercentage(
    unrealizedPnl: number,
    margin: number
  ): number {
    if (margin <= 0) return 0;
    return (unrealizedPnl / margin) * 100;
  }
  
  /**
   * Calculate distance to liquidation as percentage
   */
  static calculateLiquidationDistance(
    currentPrice: number,
    liquidationPrice: number,
    side: PositionSide
  ): number {
    if (!liquidationPrice || liquidationPrice <= 0) return 100;
    
    const diff = side === 'long'
      ? (currentPrice - liquidationPrice) / currentPrice
      : (liquidationPrice - currentPrice) / currentPrice;
    
    return Math.max(0, diff * 100);
  }
  
  /**
   * Determine risk level based on liquidation distance and margin ratio
   */
  static assessRiskLevel(
    liquidationDistance: number,
    marginRatio?: number,
    pnlPercentage?: number
  ): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    // Critical: Very close to liquidation
    if (liquidationDistance < 5) {
      return 'CRITICAL';
    }
    
    // High: Close to liquidation or high margin usage
    if (liquidationDistance < 15 || (marginRatio && marginRatio > 80)) {
      return 'HIGH';
    }
    
    // Medium: Moderate risk
    if (liquidationDistance < 30 || (marginRatio && marginRatio > 60)) {
      return 'MEDIUM';
    }
    
    // Low: Safe distance
    return 'LOW';
  }
  
  /**
   * Calculate all position metrics
   */
  static calculatePositionMetrics(params: {
    entryPrice: number;
    markPrice: number;
    quantity: number;
    leverage: number;
    side: PositionSide;
    marginMode: MarginMode;
    maintenanceMarginRate?: number;
    makerFee?: number;
    takerFee?: number;
  }): {
    liquidationPrice: number;
    breakEvenPrice: number;
    unrealizedPnl: number;
    pnlPercentage: number;
    notionalValue: number;
    initialMargin: number;
    liquidationDistance: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  } {
    const {
      entryPrice,
      markPrice,
      quantity,
      leverage,
      side,
      marginMode,
      maintenanceMarginRate = 0.004,
      makerFee = 0.0002,
      takerFee = 0.0005,
    } = params;
    
    const notionalValue = quantity * markPrice;
    const initialMargin = notionalValue / leverage;
    
    const liquidationPrice = this.calculateLiquidationPrice(
      entryPrice, leverage, marginMode, side, maintenanceMarginRate, initialMargin
    );
    
    const breakEvenPrice = this.calculateBreakEvenPrice(
      entryPrice, quantity, side, makerFee, takerFee
    );
    
    const unrealizedPnl = this.calculateUnrealizedPnl(
      entryPrice, markPrice, quantity, side, leverage
    );
    
    const pnlPercentage = this.calculatePnlPercentage(unrealizedPnl, initialMargin);
    
    const liquidationDistance = this.calculateLiquidationDistance(
      markPrice, liquidationPrice, side
    );
    
    const riskLevel = this.assessRiskLevel(liquidationDistance, undefined, pnlPercentage);
    
    return {
      liquidationPrice,
      breakEvenPrice,
      unrealizedPnl,
      pnlPercentage,
      notionalValue,
      initialMargin,
      liquidationDistance,
      riskLevel,
    };
  }
}

// ==================== POSITION INFO BUILDER ====================

export class PositionInfoBuilder {
  /**
   * Build extended position info from basic position data
   */
  static buildExtendedPosition(
    basicPosition: {
      id: string;
      exchange: AllExchangeId;
      symbol: string;
      side: PositionSide;
      quantity: number;
      entryPrice: number;
      leverage: number;
      marginMode: MarginMode;
      openedAt: Date;
      isDemo: boolean;
    },
    marketData: {
      markPrice: number;
      indexPrice?: number;
      lastPrice?: number;
    },
    riskParams?: {
      maintenanceMarginRate?: number;
      makerFee?: number;
      takerFee?: number;
    }
  ): ExtendedPositionInfo {
    const metrics = PositionRiskCalculator.calculatePositionMetrics({
      entryPrice: basicPosition.entryPrice,
      markPrice: marketData.markPrice,
      quantity: basicPosition.quantity,
      leverage: basicPosition.leverage,
      side: basicPosition.side,
      marginMode: basicPosition.marginMode,
      ...riskParams,
    });
    
    return {
      ...basicPosition,
      markPrice: marketData.markPrice,
      indexPrice: marketData.indexPrice,
      lastPrice: marketData.lastPrice,
      liquidationPrice: metrics.liquidationPrice,
      breakEvenPrice: metrics.breakEvenPrice,
      initialMargin: metrics.initialMargin,
      maintenanceMargin: metrics.initialMargin * (riskParams?.maintenanceMarginRate ?? 0.004),
      unrealizedPnl: metrics.unrealizedPnl,
      realizedPnl: 0,
      pnlPercentage: metrics.pnlPercentage,
      liquidationDistance: metrics.liquidationDistance,
      riskLevel: metrics.riskLevel,
      notionalValue: metrics.notionalValue,
      positionValue: metrics.notionalValue,
      highestPrice: basicPosition.entryPrice,
      lowestPrice: basicPosition.entryPrice,
      updatedAt: new Date(),
      tradingMode: basicPosition.isDemo ? 'DEMO' : 'LIVE',
    };
  }
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Format position risk for display
 */
export function formatPositionRisk(position: ExtendedPositionInfo): {
  status: string;
  color: string;
  emoji: string;
  warning?: string;
} {
  switch (position.riskLevel) {
    case 'CRITICAL':
      return {
        status: 'Critical Risk',
        color: 'text-red-600',
        emoji: '🔴',
        warning: `Liquidation at $${position.liquidationPrice?.toFixed(2)}`,
      };
    case 'HIGH':
      return {
        status: 'High Risk',
        color: 'text-orange-500',
        emoji: '🟠',
        warning: `${position.liquidationDistance?.toFixed(1)}% to liquidation`,
      };
    case 'MEDIUM':
      return {
        status: 'Medium Risk',
        color: 'text-yellow-500',
        emoji: '🟡',
      };
    case 'LOW':
    default:
      return {
        status: 'Low Risk',
        color: 'text-green-500',
        emoji: '🟢',
      };
  }
}

/**
 * Get network mode display info
 */
export function getNetworkModeDisplay(
  isDemo: boolean,
  exchangeId?: AllExchangeId
): { label: string; color: string; emoji: string; description: string } {
  if (isDemo) {
    return {
      label: 'DEMO',
      color: 'text-amber-500',
      emoji: '🏮',
      description: 'Virtual trading - no real funds',
    };
  }
  
  return {
    label: 'LIVE',
    color: 'text-blue-500',
    emoji: '🔵',
    description: 'Real trading with actual funds',
  };
}
