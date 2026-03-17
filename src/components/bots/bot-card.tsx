/**
 * Bot Card Component
 * 
 * Production-ready card component for displaying bot status and controls.
 */

'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Grid3X3,
  Layers,
  Activity,
  Eye,
  Radar,
  Target,
  Minimize2,
  ArrowLeftRight,
  Scale,
  Building,
  TrendingUp,
  Zap,
  Clock,
  Compass,
  PawPrint,
  Settings,
  Play,
  Pause,
  Square,
  MoreHorizontal,
  ExternalLink,
  Loader2,
  TrendingUp as TrendUp,
  TrendingDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UnifiedBot, BotStatus, BotControlAction, BotType } from '@/hooks/use-bots';

// ============================================
// Types
// ============================================

interface BotCardProps {
  bot: UnifiedBot;
  onControl: (botId: string, botType: string, action: BotControlAction) => Promise<boolean>;
  onOpenConfig: () => void;
  onNavigate?: () => void;
}

// ============================================
// Icon Map
// ============================================

const BOT_ICONS: Record<BotType, React.ComponentType<{ className?: string }>> = {
  grid: Grid3X3,
  dca: Layers,
  bb: Activity,
  vision: Eye,
  argus: Radar,
  orion: Target,
  range: Minimize2,
  spectrum: ArrowLeftRight,
  reed: Scale,
  architect: Building,
  equilibrist: Minimize2,
  kron: TrendingUp,
  hft: Zap,
  mft: Clock,
  lft: Compass,
  wolf: PawPrint,
};

// ============================================
// Component
// ============================================

export function BotCard({ 
  bot, 
  onControl, 
  onOpenConfig,
  onNavigate,
}: BotCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState<BotControlAction | null>(null);
  
  // Get icon component
  const IconComponent = BOT_ICONS[bot.type] || Grid3X3;
  
  // Handle control action
  const handleControl = async (action: BotControlAction) => {
    setIsLoading(true);
    setPendingAction(action);
    await onControl(bot.id, bot.type, action);
    setIsLoading(false);
    setPendingAction(null);
  };
  
  // Status styles
  const getStatusStyle = (status: BotStatus) => {
    switch (status) {
      case 'RUNNING':
        return {
          bg: 'bg-green-500/10',
          text: 'text-green-500',
          border: 'border-green-500/20',
          dot: 'bg-green-500 animate-pulse',
        };
      case 'PAUSED':
        return {
          bg: 'bg-yellow-500/10',
          text: 'text-yellow-500',
          border: 'border-yellow-500/20',
          dot: 'bg-yellow-500',
        };
      case 'ERROR':
        return {
          bg: 'bg-red-500/10',
          text: 'text-red-500',
          border: 'border-red-500/20',
          dot: 'bg-red-500',
        };
      default:
        return {
          bg: 'bg-gray-500/10',
          text: 'text-gray-400',
          border: 'border-gray-500/20',
          dot: 'bg-gray-400',
        };
    }
  };
  
  const statusStyle = getStatusStyle(bot.status);
  
  // Format currency
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  
  // Format percent
  const formatPercent = (value: number) => 
    `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-200",
      "hover:border-primary/30 hover:shadow-md",
      bot.status === 'RUNNING' && "border-green-500/30"
    )}>
      {/* Status indicator line */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-0.5",
        statusStyle.bg
      )} />
      
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-10 w-10 rounded-lg flex items-center justify-center",
              statusStyle.bg
            )}>
              <IconComponent className={cn("h-5 w-5", statusStyle.text)} />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{bot.name}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{bot.symbol}</span>
                <span>•</span>
                <span className="capitalize">{bot.exchangeId}</span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-1">
            {onNavigate && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onNavigate}
                title="Open bot"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onOpenConfig}>
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                
                {bot.status === 'RUNNING' ? (
                  <DropdownMenuItem 
                    onClick={() => handleControl('pause')}
                    disabled={isLoading}
                  >
                    {isLoading && pendingAction === 'pause' ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Pause className="h-4 w-4 mr-2" />
                    )}
                    Pause Bot
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem 
                    onClick={() => handleControl('start')}
                    disabled={isLoading}
                  >
                    {isLoading && pendingAction === 'start' ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    Start Bot
                  </DropdownMenuItem>
                )}
                
                {bot.status !== 'STOPPED' && (
                  <DropdownMenuItem 
                    onClick={() => handleControl('stop')}
                    disabled={isLoading}
                    className="text-red-500 focus:text-red-500"
                  >
                    {isLoading && pendingAction === 'stop' ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Square className="h-4 w-4 mr-2" />
                    )}
                    Stop Bot
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Status & Direction */}
        <div className="flex items-center gap-2">
          <Badge className={cn(
            "font-normal",
            statusStyle.bg,
            statusStyle.text,
            statusStyle.border
          )}>
            <div className={cn(
              "w-1.5 h-1.5 rounded-full mr-1.5",
              statusStyle.dot
            )} />
            {bot.status}
          </Badge>
          
          <Badge variant="outline" className="font-normal">
            {bot.direction}
          </Badge>
          
          <Badge variant="outline" className={cn(
            "font-normal",
            bot.accountType === 'REAL' ? 'border-green-500/30 text-green-500' : ''
          )}>
            {bot.accountType}
          </Badge>
        </div>
        
        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50">
          <div className="text-center">
            <div className="text-xs text-muted-foreground">PnL</div>
            <div className={cn(
              "text-sm font-semibold",
              bot.metrics.realizedPnL >= 0 ? 'text-green-500' : 'text-red-500'
            )}>
              {formatCurrency(bot.metrics.realizedPnL)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">ROI</div>
            <div className={cn(
              "text-sm font-semibold flex items-center justify-center gap-0.5",
              bot.metrics.roi >= 0 ? 'text-green-500' : 'text-red-500'
            )}>
              {bot.metrics.roi >= 0 ? (
                <TrendUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {formatPercent(bot.metrics.roi)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Trades</div>
            <div className="text-sm font-semibold">{bot.metrics.totalTrades}</div>
          </div>
        </div>
        
        {/* Quick action buttons */}
        <div className="flex gap-2 pt-1">
          {bot.status === 'RUNNING' ? (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-8"
              onClick={() => handleControl('pause')}
              disabled={isLoading}
            >
              {isLoading && pendingAction === 'pause' ? (
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              ) : (
                <Pause className="h-3 w-3 mr-1" />
              )}
              Pause
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-8"
              onClick={() => handleControl('start')}
              disabled={isLoading}
            >
              {isLoading && pendingAction === 'start' ? (
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              ) : (
                <Play className="h-3 w-3 mr-1" />
              )}
              Start
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3"
            onClick={onOpenConfig}
          >
            <Settings className="h-3 w-3" />
          </Button>
        </div>
        
        {/* Uptime */}
        {bot.uptime && bot.status === 'RUNNING' && (
          <div className="text-xs text-muted-foreground text-center">
            Running for {bot.uptime}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
