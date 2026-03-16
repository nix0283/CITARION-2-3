/**
 * Bots Dashboard
 * 
 * Production-ready dashboard for managing all trading bots.
 * Replaces demo data with real database-backed bots.
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Bot,
  Plus,
  RefreshCw,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Wallet,
  BarChart3,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBots, type UnifiedBot, type BotType, type BotControlAction } from '@/hooks/use-bots';
import { BotCard } from './bot-card';
import { BotConfigModal } from './bot-config-modal';
import { NewBotModal } from './new-bot-modal';

// ============================================
// Types
// ============================================

interface BotsDashboardProps {
  onNavigate?: (tab: string) => void;
}

// ============================================
// Component
// ============================================

export function BotsDashboard({ onNavigate }: BotsDashboardProps) {
  // State
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [configBot, setConfigBot] = useState<UnifiedBot | null>(null);
  const [showNewBot, setShowNewBot] = useState(false);
  
  // Fetch bots with WebSocket real-time updates
  const {
    bots,
    stats,
    isLoading,
    error,
    lastUpdated,
    wsConnected,
    refresh,
    controlBot,
  } = useBots({
    autoRefresh: true,
    refreshInterval: 30000,
    enableWebSocket: true,
  });
  
  // Filter bots
  const filteredBots = useMemo(() => {
    let result = bots;
    
    if (selectedType !== 'all') {
      result = result.filter(bot => bot.type === selectedType);
    }
    
    if (selectedStatus !== 'all') {
      result = result.filter(bot => bot.status === selectedStatus);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(bot =>
        bot.name.toLowerCase().includes(query) ||
        bot.symbol.toLowerCase().includes(query) ||
        bot.exchangeId.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [bots, selectedType, selectedStatus, searchQuery]);
  
  // Handle control
  const handleControl = useCallback(async (
    botId: string,
    botType: string,
    action: BotControlAction,
    _options?: { closePositions?: boolean }
  ) => {
    return controlBot(botId, botType as BotType, action);
  }, [controlBot]);
  
  // Handle create bot
  const handleCreateBot = useCallback(async (config: unknown) => {
    // TODO: Implement bot creation API
    console.log('Create bot:', config);
    return true;
  }, []);
  
  // Handle navigate
  const handleNavigate = useCallback((botType: string) => {
    // Map bot type to tab
    const typeToTab: Record<string, string> = {
      'grid': 'grid-bot',
      'dca': 'dca-bot',
      'bb': 'bb-bot',
      'vision': 'vision-bot',
      'argus': 'argus-bot',
      'orion': 'orion-bot',
      'range': 'range-bot',
      'spectrum': 'spectrum-bot',
      'reed': 'reed-bot',
      'architect': 'architect-bot',
      'equilibrist': 'equilibrist-bot',
      'kron': 'kron-bot',
      'hft': 'hft-bot',
      'mft': 'mft-bot',
      'lft': 'lft-bot',
      'wolf': 'wolfbot',
    };
    
    const tab = typeToTab[botType] || 'bots';
    onNavigate?.(tab);
  }, [onNavigate]);
  
  // Format currency
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  
  return (
    <div className="flex flex-col h-full gap-4">
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Total Bots</div>
                <div className="text-lg font-semibold">{stats.totalBots}</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Activity className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Active</div>
                <div className="text-lg font-semibold text-green-500">{stats.activeBots}</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Wallet className="h-4 w-4 text-yellow-500" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Invested</div>
                <div className="text-lg font-semibold">{formatCurrency(stats.totalInvested)}</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <div className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center",
                stats.totalPnL >= 0 ? "bg-green-500/10" : "bg-red-500/10"
              )}>
                {stats.totalPnL >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Total PnL</div>
                <div className={cn(
                  "text-lg font-semibold",
                  stats.totalPnL >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  {formatCurrency(stats.totalPnL)}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      {/* Header with Filters */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Trading Bots</h2>
          <Badge variant="outline">{filteredBots.length} bots</Badge>
          
          {/* WebSocket Status Indicator */}
          <div className={cn(
            "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs",
            wsConnected 
              ? "bg-green-500/10 text-green-500" 
              : "bg-yellow-500/10 text-yellow-500"
          )}>
            <div className={cn(
              "w-1.5 h-1.5 rounded-full",
              wsConnected ? "bg-green-500 animate-pulse" : "bg-yellow-500"
            )} />
            {wsConnected ? 'Live' : 'Polling'}
          </div>
          
          {lastUpdated && (
            <span className="text-xs text-muted-foreground">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-[140px] h-8 pl-8"
            />
          </div>
          
          {/* Type Filter */}
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="grid">Grid</SelectItem>
              <SelectItem value="dca">DCA</SelectItem>
              <SelectItem value="bb">BB</SelectItem>
              <SelectItem value="vision">Vision</SelectItem>
              <SelectItem value="argus">Argus</SelectItem>
              <SelectItem value="spectrum">Spectrum</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Status Filter */}
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="RUNNING">Running</SelectItem>
              <SelectItem value="PAUSED">Paused</SelectItem>
              <SelectItem value="STOPPED">Stopped</SelectItem>
              <SelectItem value="ERROR">Error</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Refresh */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={refresh}
            disabled={isLoading}
          >
            <RefreshCw className={cn("h-3.5 w-3.5", isLoading && "animate-spin")} />
          </Button>
          
          {/* New Bot */}
          <Button
            size="sm"
            className="h-8"
            onClick={() => setShowNewBot(true)}
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            New Bot
          </Button>
        </div>
      </div>
      
      {/* Error State */}
      {error && (
        <Card className="border-red-500/30 bg-red-500/5">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <div>
              <p className="font-medium text-red-500">Error Loading Bots</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
            <Button variant="outline" size="sm" onClick={refresh}>
              Retry
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* Loading State */}
      {isLoading && bots.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
            <p className="text-muted-foreground">Loading bots...</p>
          </div>
        </div>
      )}
      
      {/* Empty State */}
      {!isLoading && filteredBots.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Bot className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No bots found</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              {bots.length === 0 
                ? 'Create your first bot to start trading' 
                : 'Try adjusting your filters'}
            </p>
            {bots.length === 0 && (
              <Button className="mt-4" onClick={() => setShowNewBot(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Bot
              </Button>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Bots Grid */}
      {filteredBots.length > 0 && (
        <ScrollArea className="flex-1 -mx-1 px-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
            {filteredBots.map((bot) => (
              <BotCard
                key={`${bot.type}-${bot.id}`}
                bot={bot}
                onControl={handleControl}
                onOpenConfig={() => setConfigBot(bot)}
                onNavigate={() => handleNavigate(bot.type)}
              />
            ))}
          </div>
        </ScrollArea>
      )}
      
      {/* Config Modal */}
      <BotConfigModal
        bot={configBot}
        open={!!configBot}
        onOpenChange={(open) => !open && setConfigBot(null)}
        onControl={handleControl}
        onNavigate={handleNavigate}
      />
      
      {/* New Bot Modal */}
      <NewBotModal
        open={showNewBot}
        onOpenChange={setShowNewBot}
        onCreate={handleCreateBot}
      />
    </div>
  );
}
