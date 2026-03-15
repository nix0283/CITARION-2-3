/**
 * useBots Hook
 * 
 * Production-ready React hook for managing unified bots.
 * Provides state management, caching, and real-time updates via WebSocket.
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useCryptoStore } from '@/stores/crypto-store';

// ============================================
// Types
// ============================================

export type BotStatus = 'RUNNING' | 'PAUSED' | 'STOPPED' | 'COMPLETED' | 'ERROR';
export type BotControlAction = 'start' | 'pause' | 'resume' | 'stop' | 'restart';

export type BotType = 
  | 'grid' | 'dca' | 'bb' | 'vision' | 'argus' | 'orion' | 'range'
  | 'spectrum' | 'reed' | 'architect' | 'equilibrist' | 'kron'
  | 'hft' | 'mft' | 'lft' | 'wolf';

export interface BotMetrics {
  realizedPnL: number;
  unrealizedPnL: number;
  totalProfit: number;
  roi: number;
  winRate: number;
  profitFactor: number;
  totalTrades: number;
  winTrades: number;
  lossTrades: number;
  maxDrawdown: number;
  currentDrawdown: number;
  activePositions: number;
  openOrders: number;
  investedAmount: number;
}

export interface UnifiedBot {
  id: string;
  type: BotType;
  name: string;
  description?: string;
  status: BotStatus;
  isActive: boolean;
  symbol: string;
  exchangeId: string;
  direction: 'LONG' | 'SHORT' | 'BOTH';
  accountId: string;
  accountType: 'DEMO' | 'REAL';
  metrics: BotMetrics;
  configSummary: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  stoppedAt?: string;
  uptime?: string;
  lastActivity?: string;
  error?: string;
}

export interface BotStats {
  totalBots: number;
  activeBots: number;
  pausedBots: number;
  stoppedBots: number;
  totalInvested: number;
  totalPnL: number;
}

export interface BotTypeMetadata {
  id: BotType;
  name: string;
  code: string;
  category: string;
  description: string;
  icon: string;
  route: string;
  features: string[];
}

export interface UseBotsOptions {
  type?: BotType;
  status?: BotStatus;
  exchangeId?: string;
  refreshInterval?: number;
  autoRefresh?: boolean;
  enableWebSocket?: boolean;
}

export interface UseBotsReturn {
  bots: UnifiedBot[];
  stats: BotStats | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  wsConnected: boolean;
  
  // Actions
  refresh: () => Promise<void>;
  controlBot: (botId: string, botType: BotType, action: BotControlAction, options?: { closePositions?: boolean }) => Promise<boolean>;
  getBotTypeMetadata: (type: BotType) => BotTypeMetadata | undefined;
  
  // Filters
  filterByType: (type: BotType) => UnifiedBot[];
  filterByStatus: (status: BotStatus) => UnifiedBot[];
  filterByExchange: (exchangeId: string) => UnifiedBot[];
  
  // Computed
  activeBots: UnifiedBot[];
  runningBots: UnifiedBot[];
  pausedBots: UnifiedBot[];
  stoppedBots: UnifiedBot[];
}

// ============================================
// Bot Type Metadata
// ============================================

const BOT_TYPE_METADATA: Record<BotType, BotTypeMetadata> = {
  grid: {
    id: 'grid',
    name: 'MESH',
    code: 'Сетка',
    category: 'operational',
    description: 'Grid trading bot',
    icon: 'Grid3X3',
    route: 'grid-bot',
    features: ['Grid orders', 'Trailing grid', 'Adaptive'],
  },
  dca: {
    id: 'dca',
    name: 'SCALE',
    code: 'DCA',
    category: 'operational',
    description: 'Dollar Cost Averaging',
    icon: 'Layers',
    route: 'dca-bot',
    features: ['DCA levels', 'Position scaling'],
  },
  bb: {
    id: 'bb',
    name: 'BAND',
    code: 'BB',
    category: 'operational',
    description: 'Bollinger Bands strategy',
    icon: 'Activity',
    route: 'bb-bot',
    features: ['Double BB', 'Stochastic'],
  },
  vision: {
    id: 'vision',
    name: 'FCST',
    code: 'Vision',
    category: 'analytical',
    description: 'AI forecasting',
    icon: 'Eye',
    route: 'vision-bot',
    features: ['ML predictions', 'Confidence'],
  },
  argus: {
    id: 'argus',
    name: 'PND',
    code: 'Argus',
    category: 'analytical',
    description: 'Pump detection',
    icon: 'Radar',
    route: 'argus-bot',
    features: ['Whale tracking', 'Alerts'],
  },
  orion: {
    id: 'orion',
    name: 'TRND',
    code: 'Orion',
    category: 'analytical',
    description: 'Trend following',
    icon: 'Target',
    route: 'orion-bot',
    features: ['Trend detection', 'Multi-asset'],
  },
  range: {
    id: 'range',
    name: 'RNG',
    code: 'Range',
    category: 'analytical',
    description: 'Range trading',
    icon: 'Minimize2',
    route: 'range-bot',
    features: ['S/R detection', 'Mean reversion'],
  },
  spectrum: {
    id: 'spectrum',
    name: 'PR',
    code: 'Spectrum',
    category: 'institutional',
    description: 'Portfolio rebalancing',
    icon: 'ArrowLeftRight',
    route: 'spectrum-bot',
    features: ['Auto-rebalancing', 'Risk budgeting'],
  },
  reed: {
    id: 'reed',
    name: 'STA',
    code: 'Reed',
    category: 'institutional',
    description: 'Statistical arbitrage',
    icon: 'Scale',
    route: 'reed-bot',
    features: ['Pairs trading', 'Cointegration'],
  },
  architect: {
    id: 'architect',
    name: 'MM',
    code: 'Architect',
    category: 'institutional',
    description: 'Market making',
    icon: 'Building',
    route: 'architect-bot',
    features: ['Liquidity provision', 'Spread capture'],
  },
  equilibrist: {
    id: 'equilibrist',
    name: 'MR',
    code: 'Equilibrist',
    category: 'institutional',
    description: 'Mean reversion',
    icon: 'Minimize2',
    route: 'equilibrist-bot',
    features: ['Dynamic equilibrium', 'Risk control'],
  },
  kron: {
    id: 'kron',
    name: 'TRF',
    code: 'Kron',
    category: 'institutional',
    description: 'Trend following',
    icon: 'TrendingUp',
    route: 'kron-bot',
    features: ['Adaptive filters', 'Position sizing'],
  },
  hft: {
    id: 'hft',
    name: 'HFT',
    code: 'Helios',
    category: 'frequency',
    description: 'High frequency',
    icon: 'Zap',
    route: 'hft-bot',
    features: ['Ultra-low latency', 'Scalping'],
  },
  mft: {
    id: 'mft',
    name: 'MFT',
    code: 'Selena',
    category: 'frequency',
    description: 'Medium frequency',
    icon: 'Clock',
    route: 'mft-bot',
    features: ['Statistical arb', 'Multi-pair'],
  },
  lft: {
    id: 'lft',
    name: 'LFT',
    code: 'Atlas',
    category: 'frequency',
    description: 'Low frequency',
    icon: 'Compass',
    route: 'lft-bot',
    features: ['Swing trading', 'Macro analysis'],
  },
  wolf: {
    id: 'wolf',
    name: 'WOLF',
    code: 'Wolf',
    category: 'analytical',
    description: 'Whale tracking',
    icon: 'PawPrint',
    route: 'wolfbot',
    features: ['Whale detection', 'Smart money'],
  },
};

// ============================================
// Hook Implementation
// ============================================

// WebSocket Bot Status interface (from bot-monitor service)
interface WSBotStatus {
  id: string;
  type: string;
  name: string;
  status: string;
  exchangeId: string;
  symbol: string;
  mode: string;
  metrics: {
    totalTrades: number;
    totalPnL: number;
    unrealizedPnL: number;
    winRate: number;
  };
  lastUpdate: Date;
}

interface WSBotEvent {
  type: 'status_change' | 'trade' | 'position_update' | 'error' | 'log';
  botId: string;
  data: unknown;
  timestamp: Date;
}

export function useBots(options: UseBotsOptions = {}): UseBotsReturn {
  const { 
    type, 
    status, 
    exchangeId, 
    refreshInterval = 30000, 
    autoRefresh = true,
    enableWebSocket = true 
  } = options;
  
  const [bots, setBots] = useState<UnifiedBot[]>([]);
  const [stats, setStats] = useState<BotStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [wsConnected, setWsConnected] = useState(false);
  
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const socketRef = useRef<Socket | null>(null);
  
  // Convert WS bot to UnifiedBot format
  const convertWSBot = useCallback((wsBot: WSBotStatus): UnifiedBot => ({
    id: wsBot.id,
    type: wsBot.type as BotType,
    name: wsBot.name,
    status: wsBot.status as BotStatus,
    isActive: wsBot.status === 'RUNNING',
    symbol: wsBot.symbol,
    exchangeId: wsBot.exchangeId,
    direction: 'BOTH',
    accountId: 'default',
    accountType: wsBot.mode === 'LIVE' ? 'REAL' : 'DEMO',
    metrics: {
      realizedPnL: wsBot.metrics.totalPnL,
      unrealizedPnL: wsBot.metrics.unrealizedPnL,
      totalProfit: wsBot.metrics.totalPnL + wsBot.metrics.unrealizedPnL,
      roi: 0,
      winRate: wsBot.metrics.winRate,
      profitFactor: 0,
      totalTrades: wsBot.metrics.totalTrades,
      winTrades: 0,
      lossTrades: 0,
      maxDrawdown: 0,
      currentDrawdown: 0,
      activePositions: 0,
      openOrders: 0,
      investedAmount: 0,
    },
    configSummary: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date(wsBot.lastUpdate).toISOString(),
  }), []);
  
  // Fetch bots from API
  const refresh = useCallback(async () => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    
    try {
      setIsLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (type) params.append('type', type);
      if (status) params.append('status', status);
      if (exchangeId) params.append('exchangeId', exchangeId);
      
      const response = await fetch(`/api/bots/unified?${params.toString()}`, {
        signal: abortControllerRef.current.signal,
      });
      
      const data = await response.json();
      
      if (data.success) {
        setBots(data.bots || []);
        setStats(data.stats || null);
        setLastUpdated(new Date());
      } else {
        setError(data.error || 'Failed to fetch bots');
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // Ignore abort errors
      }
      console.error('Error fetching bots:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch bots');
    } finally {
      setIsLoading(false);
    }
  }, [type, status, exchangeId]);
  
  // Control bot
  const controlBot = useCallback(async (
    botId: string,
    botType: BotType,
    action: BotControlAction,
    _options?: { closePositions?: boolean }
  ): Promise<boolean> => {
    try {
      // Try WebSocket first if connected
      if (wsConnected && socketRef.current) {
        const actionMap: Record<BotControlAction, string> = {
          'start': 'start_bot',
          'stop': 'stop_bot',
          'pause': 'pause_bot',
          'resume': 'start_bot',
          'restart': 'stop_bot',
        };
        
        socketRef.current.emit(actionMap[action], { botId });
        return true;
      }
      
      // Fallback to HTTP API
      const response = await fetch('/api/bots/unified', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ botId, botType, action }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update local state
        setBots(prev => prev.map(bot => 
          bot.id === botId 
            ? { ...bot, status: data.bot.status, isActive: data.bot.isActive }
            : bot
        ));
        return true;
      } else {
        setError(data.error || `Failed to ${action} bot`);
        return false;
      }
    } catch (err) {
      console.error(`Error ${action} bot:`, err);
      setError(err instanceof Error ? err.message : `Failed to ${action} bot`);
      return false;
    }
  }, [wsConnected]);
  
  // Get bot type metadata
  const getBotTypeMetadata = useCallback((botType: BotType): BotTypeMetadata | undefined => {
    return BOT_TYPE_METADATA[botType];
  }, []);
  
  // Filter functions
  const filterByType = useCallback((filterType: BotType) => 
    bots.filter(bot => bot.type === filterType), [bots]);
    
  const filterByStatus = useCallback((filterStatus: BotStatus) => 
    bots.filter(bot => bot.status === filterStatus), [bots]);
    
  const filterByExchange = useCallback((filterExchange: string) => 
    bots.filter(bot => bot.exchangeId === filterExchange), [bots]);
  
  // WebSocket connection effect
  useEffect(() => {
    if (!enableWebSocket) return;
    
    // Connect to bot-monitor WebSocket service
    // Using XTransformPort for gateway routing
    const socket = io('/?XTransformPort=3003', {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    
    socketRef.current = socket;
    
    // Connection handlers
    socket.on('connect', () => {
      console.log('[Bots] WebSocket connected');
      setWsConnected(true);
    });
    
    socket.on('disconnect', () => {
      console.log('[Bots] WebSocket disconnected');
      setWsConnected(false);
    });
    
    socket.on('connect_error', (err) => {
      console.error('[Bots] WebSocket connection error:', err.message);
      setWsConnected(false);
    });
    
    // Initial data from WebSocket
    socket.on('initial_data', (data: { bots: WSBotStatus[]; events: WSBotEvent[] }) => {
      if (data.bots && data.bots.length > 0) {
        const convertedBots = data.bots.map(convertWSBot);
        setBots(convertedBots);
        setLastUpdated(new Date());
        setIsLoading(false);
        
        // Calculate stats
        setStats({
          totalBots: convertedBots.length,
          activeBots: convertedBots.filter(b => b.status === 'RUNNING').length,
          pausedBots: convertedBots.filter(b => b.status === 'PAUSED').length,
          stoppedBots: convertedBots.filter(b => b.status === 'STOPPED').length,
          totalInvested: 0,
          totalPnL: convertedBots.reduce((sum, b) => sum + b.metrics.totalProfit, 0),
        });
      }
    });
    
    // Bot status updates
    socket.on('bot_update', (botData: WSBotStatus) => {
      setBots(prev => {
        const existingIndex = prev.findIndex(b => b.id === botData.id);
        const convertedBot = convertWSBot(botData);
        
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = convertedBot;
          return updated;
        } else {
          return [...prev, convertedBot];
        }
      });
      setLastUpdated(new Date());
    });
    
    // Bot metrics updates (real-time)
    socket.on('bot_metrics', (data: { botId: string; metrics: WSBotStatus['metrics']; timestamp: Date }) => {
      setBots(prev => prev.map(bot => 
        bot.id === data.botId 
          ? { 
              ...bot, 
              metrics: { ...bot.metrics, ...data.metrics },
              updatedAt: new Date(data.timestamp).toISOString(),
            }
          : bot
      ));
    });
    
    // Bot events (trades, errors, etc.)
    socket.on('bot_event', (event: WSBotEvent) => {
      if (event.type === 'status_change') {
        const statusData = event.data as { status: string };
        setBots(prev => prev.map(bot => 
          bot.id === event.botId 
            ? { ...bot, status: statusData.status as BotStatus, isActive: statusData.status === 'RUNNING' }
            : bot
        ));
      }
      setLastUpdated(new Date());
    });
    
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [enableWebSocket, convertWSBot]);
  
  // Initial fetch and auto-refresh (fallback)
  useEffect(() => {
    // Only use HTTP polling if WebSocket is disabled or not connected
    if (!enableWebSocket || !wsConnected) {
      refresh();
      
      if (autoRefresh && refreshInterval > 0) {
        refreshIntervalRef.current = setInterval(refresh, refreshInterval);
      }
    }
    
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [refresh, autoRefresh, refreshInterval, enableWebSocket, wsConnected]);
  
  // Computed values
  const runningBots = bots.filter(bot => bot.status === 'RUNNING');
  const pausedBots = bots.filter(bot => bot.status === 'PAUSED');
  const stoppedBots = bots.filter(bot => bot.status === 'STOPPED');
  const activeBots = bots.filter(bot => bot.isActive);
  
  return {
    bots,
    stats,
    isLoading,
    error,
    lastUpdated,
    wsConnected,
    refresh,
    controlBot,
    getBotTypeMetadata,
    filterByType,
    filterByStatus,
    filterByExchange,
    activeBots,
    runningBots,
    pausedBots,
    stoppedBots,
  };
}
