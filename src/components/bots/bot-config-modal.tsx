/**
 * Bot Configuration Modal
 * 
 * Modal dialog for viewing and editing bot configuration.
 * Supports all bot types with type-specific configuration forms.
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Settings,
  Play,
  Pause,
  Square,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Target,
  AlertTriangle,
  BarChart3,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import type { UnifiedBot, BotStatus, BotControlAction } from '@/hooks/use-bots';

// ============================================
// Types
// ============================================

interface BotConfigModalProps {
  bot: UnifiedBot | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onControl: (botId: string, botType: string, action: BotControlAction, options?: { closePositions?: boolean }) => Promise<boolean>;
  onNavigate?: (route: string) => void;
}

// ============================================
// Component
// ============================================

export function BotConfigModal({ 
  bot, 
  open, 
  onOpenChange, 
  onControl,
  onNavigate,
}: BotConfigModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<Record<string, unknown>>({});
  
  // Sync config with bot
  useEffect(() => {
    if (bot) {
      setConfig(bot.configSummary || {});
    }
  }, [bot]);
  
  // Control actions
  const handleControl = async (action: BotControlAction, options?: { closePositions?: boolean }) => {
    if (!bot) return;
    
    setIsLoading(true);
    const success = await onControl(bot.id, bot.type, action, options);
    setIsLoading(false);
    
    if (success) {
      toast.success(`Bot ${action} successful`);
    }
  };
  
  // Status badge style
  const getStatusStyle = (status: BotStatus) => {
    switch (status) {
      case 'RUNNING':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'PAUSED':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'STOPPED':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      case 'ERROR':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };
  
  // Format currency
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  
  // Format percent
  const formatPercent = (value: number) => 
    `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  
  if (!bot) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "h-10 w-10 rounded-lg flex items-center justify-center",
                bot.status === 'RUNNING' ? 'bg-green-500/10' : 
                bot.status === 'PAUSED' ? 'bg-yellow-500/10' : 'bg-gray-500/10'
              )}>
                <Settings className={cn(
                  "h-5 w-5",
                  bot.status === 'RUNNING' ? 'text-green-500' : 
                  bot.status === 'PAUSED' ? 'text-yellow-500' : 'text-gray-400'
                )} />
              </div>
              <div>
                <DialogTitle className="text-lg">{bot.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <Badge className={getStatusStyle(bot.status)}>
                    {bot.status}
                  </Badge>
                  <span className="text-muted-foreground">{bot.symbol}</span>
                </DialogDescription>
              </div>
            </div>
            <Badge variant="outline" className="font-mono">
              {bot.type.toUpperCase()}
            </Badge>
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="config">Config</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>
          
          <div className="flex-1 overflow-y-auto">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4 p-1">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="text-xs text-muted-foreground">PnL</div>
                  <div className={cn(
                    "text-lg font-semibold",
                    bot.metrics.realizedPnL >= 0 ? 'text-green-500' : 'text-red-500'
                  )}>
                    {formatCurrency(bot.metrics.realizedPnL)}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="text-xs text-muted-foreground">ROI</div>
                  <div className={cn(
                    "text-lg font-semibold",
                    bot.metrics.roi >= 0 ? 'text-green-500' : 'text-red-500'
                  )}>
                    {formatPercent(bot.metrics.roi)}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="text-xs text-muted-foreground">Win Rate</div>
                  <div className="text-lg font-semibold">
                    {bot.metrics.winRate.toFixed(1)}%
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="text-xs text-muted-foreground">Trades</div>
                  <div className="text-lg font-semibold">
                    {bot.metrics.totalTrades}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Exchange</span>
                  <span className="font-medium capitalize">{bot.exchangeId}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Direction</span>
                  <Badge variant="outline">{bot.direction}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Account</span>
                  <Badge variant={bot.accountType === 'REAL' ? 'default' : 'secondary'}>
                    {bot.accountType}
                  </Badge>
                </div>
                {bot.uptime && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Uptime</span>
                    <span className="font-medium">{bot.uptime}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium">
                    {new Date(bot.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <Separator />
              
              {/* Control Buttons */}
              <div className="space-y-2">
                <Label>Controls</Label>
                <div className="flex gap-2">
                  {bot.status === 'RUNNING' ? (
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleControl('pause')}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Pause className="h-4 w-4 mr-2" />
                      )}
                      Pause
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleControl('start')}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="h-4 w-4 mr-2" />
                      )}
                      Start
                    </Button>
                  )}
                  
                  {bot.status !== 'STOPPED' && (
                    <Button
                      variant="outline"
                      className="flex-1 text-red-500 hover:text-red-600"
                      onClick={() => handleControl('stop', { closePositions: true })}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Square className="h-4 w-4 mr-2" />
                      )}
                      Stop
                    </Button>
                  )}
                  
                  {onNavigate && (
                    <Button
                      variant="default"
                      onClick={() => onNavigate(bot.type)}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>
            
            {/* Config Tab */}
            <TabsContent value="config" className="space-y-4 p-1">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Bot Name</Label>
                    <Input value={bot.name} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Symbol</Label>
                    <Input value={bot.symbol} readOnly />
                  </div>
                </div>
                
                {/* Type-specific config would go here */}
                <div className="p-4 rounded-lg bg-muted/30 text-sm text-muted-foreground">
                  <p>Advanced configuration options are available in the dedicated bot section.</p>
                  <p className="mt-1">Click "Open" to access full settings.</p>
                </div>
              </div>
            </TabsContent>
            
            {/* Metrics Tab */}
            <TabsContent value="config" className="space-y-4 p-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Trading</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Trades</span>
                      <span>{bot.metrics.totalTrades}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Win/Loss</span>
                      <span>{bot.metrics.winTrades}/{bot.metrics.lossTrades}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Positions</span>
                      <span>{bot.metrics.activePositions}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Performance</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Win Rate</span>
                      <span>{bot.metrics.winRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Profit Factor</span>
                      <span>{bot.metrics.profitFactor.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Drawdown</span>
                      <span className="text-red-500">{bot.metrics.maxDrawdown.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Profit</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Realized PnL</span>
                      <span className={bot.metrics.realizedPnL >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {formatCurrency(bot.metrics.realizedPnL)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Unrealized PnL</span>
                      <span className={bot.metrics.unrealizedPnL >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {formatCurrency(bot.metrics.unrealizedPnL)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Profit</span>
                      <span className={bot.metrics.totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {formatCurrency(bot.metrics.totalProfit)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Capital</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Invested</span>
                      <span>{formatCurrency(bot.metrics.investedAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ROI</span>
                      <span className={bot.metrics.roi >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {formatPercent(bot.metrics.roi)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Drawdown</span>
                      <span className="text-red-500">{bot.metrics.currentDrawdown.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
