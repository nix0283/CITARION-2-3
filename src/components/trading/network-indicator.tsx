'use client';

/**
 * Network Indicator Component
 * 
 * Visual indicator showing trading mode (Demo/Live) with:
 * - Clear visual distinction
 * - Exchange information
 * - Risk warnings
 * - Account health status
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertTriangle, Coins, Shield, Zap } from 'lucide-react';

// ==================== TYPES ====================

export interface NetworkIndicatorProps {
  /** Whether in demo/simulation mode */
  isDemo: boolean;
  /** Exchange ID */
  exchangeId?: string;
  /** Account balance for context */
  balance?: number;
  /** Currency */
  currency?: string;
  /** Margin usage percentage */
  marginUsage?: number;
  /** Whether account is healthy */
  isHealthy?: boolean;
  /** Compact mode for smaller displays */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export interface TradingModeBannerProps {
  isDemo: boolean;
  exchangeId?: string;
  accountName?: string;
  className?: string;
}

// ==================== NETWORK INDICATOR ====================

export function NetworkIndicator({
  isDemo,
  exchangeId,
  balance,
  currency = 'USDT',
  marginUsage,
  isHealthy = true,
  compact = false,
  className,
}: NetworkIndicatorProps) {
  const config = React.useMemo(() => {
    if (isDemo) {
      return {
        label: 'DEMO',
        emoji: '🏮',
        color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
        dotColor: 'bg-amber-500',
        hoverColor: 'hover:bg-amber-500/20',
        description: 'Demo Trading - Virtual Funds',
        icon: Coins,
      };
    }
    
    return {
      label: 'LIVE',
      emoji: '🔵',
      color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      dotColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-500/20',
      description: 'Live Trading - Real Funds',
      icon: Zap,
    };
  }, [isDemo]);
  
  const Icon = config.icon;
  
  const healthIndicator = React.useMemo(() => {
    if (isDemo) return null;
    
    if (marginUsage !== undefined) {
      if (marginUsage > 80) {
        return { color: 'bg-red-500', warning: 'High margin usage' };
      }
      if (marginUsage > 60) {
        return { color: 'bg-yellow-500', warning: 'Moderate margin usage' };
      }
    }
    
    return { color: 'bg-green-500', warning: null };
  }, [isDemo, marginUsage]);
  
  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant="outline"
              className={cn(
                'cursor-default gap-1 font-mono text-xs',
                config.color,
                className
              )}
            >
              <span className={cn('h-1.5 w-1.5 rounded-full animate-pulse', config.dotColor)} />
              {config.emoji} {config.label}
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="text-xs space-y-1">
              <p className="font-medium">{config.description}</p>
              {exchangeId && <p className="text-muted-foreground">Exchange: {exchangeId.toUpperCase()}</p>}
              {balance !== undefined && (
                <p className="text-muted-foreground">
                  Balance: {balance.toLocaleString()} {currency}
                </p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors',
        config.color,
        config.hoverColor,
        className
      )}
    >
      {/* Pulse dot */}
      <span className={cn('h-2 w-2 rounded-full animate-pulse', config.dotColor)} />
      
      {/* Emoji and label */}
      <span className="font-mono text-sm font-medium">
        {config.emoji} {config.label}
      </span>
      
      {/* Exchange */}
      {exchangeId && (
        <Badge variant="secondary" className="text-xs">
          {exchangeId.toUpperCase()}
        </Badge>
      )}
      
      {/* Balance */}
      {balance !== undefined && (
        <span className="text-xs opacity-70">
          {balance.toLocaleString()} {currency}
        </span>
      )}
      
      {/* Health indicator */}
      {healthIndicator && !isHealthy && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Account health warning</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

// ==================== TRADING MODE BANNER ====================

export function TradingModeBanner({
  isDemo,
  exchangeId,
  accountName,
  className,
}: TradingModeBannerProps) {
  return (
    <div
      className={cn(
        'w-full px-4 py-2 text-center text-sm font-medium border-b',
        isDemo
          ? 'bg-amber-500/5 border-amber-500/20 text-amber-600'
          : 'bg-blue-500/5 border-blue-500/20 text-blue-600',
        className
      )}
    >
      {isDemo ? (
        <>
          🏮 <span className="font-mono">DEMO MODE</span> — Trading with virtual funds
          {accountName && <span className="ml-2 opacity-70">({accountName})</span>}
        </>
      ) : (
        <>
          🔵 <span className="font-mono">LIVE MODE</span> — Trading with real funds
          {exchangeId && <span className="ml-2 opacity-70">on {exchangeId.toUpperCase()}</span>}
        </>
      )}
    </div>
  );
}

// ==================== POSITION RISK INDICATOR ====================

export interface PositionRiskIndicatorProps {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  liquidationPrice?: number;
  liquidationDistance?: number;
  currentPrice?: number;
  compact?: boolean;
  className?: string;
}

export function PositionRiskIndicator({
  riskLevel,
  liquidationPrice,
  liquidationDistance,
  currentPrice,
  compact = false,
  className,
}: PositionRiskIndicatorProps) {
  const config = React.useMemo(() => {
    switch (riskLevel) {
      case 'CRITICAL':
        return {
          emoji: '🔴',
          color: 'bg-red-500/10 text-red-600 border-red-500/20',
          label: 'Critical',
          message: liquidationPrice
            ? `Liquidation at $${liquidationPrice.toFixed(2)}`
            : 'Near liquidation',
        };
      case 'HIGH':
        return {
          emoji: '🟠',
          color: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
          label: 'High Risk',
          message: liquidationDistance
            ? `${liquidationDistance.toFixed(1)}% to liquidation`
            : 'High risk position',
        };
      case 'MEDIUM':
        return {
          emoji: '🟡',
          color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
          label: 'Medium',
          message: 'Moderate risk',
        };
      case 'LOW':
      default:
        return {
          emoji: '🟢',
          color: 'bg-green-500/10 text-green-600 border-green-500/20',
          label: 'Safe',
          message: 'Low risk position',
        };
    }
  }, [riskLevel, liquidationPrice, liquidationDistance]);
  
  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className={cn('text-base', className)}>{config.emoji}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs font-medium">{config.label}</p>
            <p className="text-xs text-muted-foreground">{config.message}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-2 py-1 rounded border text-xs font-medium',
        config.color,
        className
      )}
    >
      <span>{config.emoji}</span>
      <span>{config.label}</span>
      {riskLevel === 'CRITICAL' && liquidationPrice && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertTriangle className="h-3 w-3 animate-pulse" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Liquidation Price: ${liquidationPrice.toFixed(2)}</p>
              {currentPrice && (
                <p className="text-xs text-muted-foreground">
                  Current: ${currentPrice.toFixed(2)}
                </p>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

// ==================== POSITION INFO DISPLAY ====================

export interface PositionInfoDisplayProps {
  symbol: string;
  side: 'LONG' | 'SHORT';
  entryPrice: number;
  markPrice: number;
  quantity: number;
  leverage: number;
  unrealizedPnl: number;
  liquidationPrice?: number;
  breakEvenPrice?: number;
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  isDemo: boolean;
  compact?: boolean;
  className?: string;
}

export function PositionInfoDisplay({
  symbol,
  side,
  entryPrice,
  markPrice,
  quantity,
  leverage,
  unrealizedPnl,
  liquidationPrice,
  breakEvenPrice,
  riskLevel,
  isDemo,
  compact = false,
  className,
}: PositionInfoDisplayProps) {
  const pnlPercent = ((markPrice - entryPrice) / entryPrice) * 100 * (side === 'LONG' ? 1 : -1);
  const isProfit = unrealizedPnl >= 0;
  
  return (
    <div className={cn('space-y-2', className)}>
      {/* Header with network indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant={side === 'LONG' ? 'default' : 'destructive'} className="font-mono">
            {side}
          </Badge>
          <span className="font-mono font-medium">{symbol}</span>
        </div>
        <NetworkIndicator isDemo={isDemo} compact />
      </div>
      
      {/* Price info */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-muted-foreground">Entry:</span>{' '}
          <span className="font-mono">${entryPrice.toFixed(4)}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Mark:</span>{' '}
          <span className="font-mono">${markPrice.toFixed(4)}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Size:</span>{' '}
          <span className="font-mono">{quantity.toFixed(4)}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Lev:</span>{' '}
          <span className="font-mono">{leverage}x</span>
        </div>
      </div>
      
      {/* PnL */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">PnL:</span>
        <span
          className={cn(
            'font-mono font-medium',
            isProfit ? 'text-green-500' : 'text-red-500'
          )}
        >
          {isProfit ? '+' : ''}{unrealizedPnl.toFixed(2)} USDT
          <span className="text-xs ml-1 opacity-70">
            ({isProfit ? '+' : ''}{pnlPercent.toFixed(2)}%)
          </span>
        </span>
      </div>
      
      {/* Risk and liquidation */}
      {!compact && (liquidationPrice || breakEvenPrice) && (
        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t">
          {liquidationPrice && (
            <div>
              <span className="text-muted-foreground">Liq. Price:</span>{' '}
              <span className="font-mono text-red-500">${liquidationPrice.toFixed(4)}</span>
            </div>
          )}
          {breakEvenPrice && (
            <div>
              <span className="text-muted-foreground">Break-even:</span>{' '}
              <span className="font-mono">${breakEvenPrice.toFixed(4)}</span>
            </div>
          )}
        </div>
      )}
      
      {/* Risk indicator */}
      {riskLevel && (
        <div className="pt-2">
          <PositionRiskIndicator
            riskLevel={riskLevel}
            liquidationPrice={liquidationPrice}
            currentPrice={markPrice}
            compact={compact}
          />
        </div>
      )}
    </div>
  );
}

// ==================== EXPORTS ====================

export default NetworkIndicator;
