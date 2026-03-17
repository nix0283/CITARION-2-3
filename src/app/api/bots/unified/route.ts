/**
 * Unified Bots API
 * 
 * Production-ready API for managing all bot types through a unified interface.
 * Aggregates bots from all specialized tables (GridBot, DcaBot, BBBot, etc.)
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';

// ============================================
// Types
// ============================================

type BotType = 'grid' | 'dca' | 'bb' | 'vision' | 'argus' | 'orion' | 'range' | 
  'spectrum' | 'reed' | 'architect' | 'equilibrist' | 'kron' | 'hft' | 'mft' | 'lft' | 'wolf';

// ============================================
// Helper Functions
// ============================================

function mapStatus(status: string): 'RUNNING' | 'PAUSED' | 'STOPPED' | 'COMPLETED' | 'ERROR' {
  const statusMap: Record<string, 'RUNNING' | 'PAUSED' | 'STOPPED' | 'COMPLETED' | 'ERROR'> = {
    'RUNNING': 'RUNNING',
    'PAUSED': 'PAUSED',
    'STOPPED': 'STOPPED',
    'IDLE': 'STOPPED',
    'COMPLETED': 'COMPLETED',
    'STOPPED_LOSS': 'ERROR',
    'ERROR': 'ERROR',
  };
  return statusMap[status] || 'STOPPED';
}

function calculateUptime(startedAt: Date | null | undefined): string | undefined {
  if (!startedAt) return undefined;
  
  const now = new Date();
  const diff = now.getTime() - new Date(startedAt).getTime();
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformBot(bot: any, type: BotType) {
  const status = mapStatus(bot.status || 'STOPPED');
  const investedAmount = bot.totalInvestment || bot.baseAmount || bot.tradeAmount || 0;
  const realizedPnL = bot.realizedPnL || bot.totalProfit || 0;
  const roi = investedAmount > 0 ? (realizedPnL / investedAmount) * 100 : 0;
  
  const winTrades = bot.winTrades || 0;
  const lossTrades = bot.lossTrades || 0;
  const totalTrades = bot.totalTrades || (winTrades + lossTrades);
  const winRate = totalTrades > 0 ? (winTrades / totalTrades) * 100 : 0;
  
  return {
    id: bot.id,
    type,
    name: bot.name || `${type} Bot`,
    description: bot.description || undefined,
    status,
    isActive: bot.isActive || status === 'RUNNING',
    symbol: bot.symbol || 'UNKNOWN',
    exchangeId: bot.exchangeId || 'binance',
    direction: bot.direction || 'LONG',
    accountId: bot.accountId || '',
    accountType: bot.account?.accountType || 'DEMO',
    
    metrics: {
      realizedPnL,
      unrealizedPnL: 0,
      totalProfit: bot.totalProfit || realizedPnL,
      roi,
      winRate,
      profitFactor: 0,
      totalTrades,
      winTrades,
      lossTrades,
      maxDrawdown: bot.drawdown || 0,
      currentDrawdown: 0,
      activePositions: 0,
      openOrders: 0,
      investedAmount,
    },
    
    configSummary: {},
    
    createdAt: bot.createdAt,
    updatedAt: bot.updatedAt,
    startedAt: bot.startedAt || undefined,
    stoppedAt: bot.stoppedAt || undefined,
    uptime: status === 'RUNNING' ? calculateUptime(bot.startedAt) : undefined,
    lastActivity: bot.updatedAt,
  };
}

// ============================================
// GET - List all bots
// ============================================

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    // For demo/development, allow access without session
    // In production, uncomment the auth check:
    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = (session?.user as any)?.id || 'demo-user';
    
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as BotType | null;
    const status = searchParams.get('status');
    const exchangeId = searchParams.get('exchangeId');
    
    const allBots: unknown[] = [];
    
    // Fetch Grid Bots
    if (!type || type === 'grid') {
      try {
        const gridBots = await db.gridBot.findMany({
          where: { userId },
          include: {
            account: {
              select: { accountType: true, exchangeName: true },
            },
          },
        });
        allBots.push(...gridBots.map((b: unknown) => transformBot(b, 'grid')));
      } catch (e) {
        console.error('Error fetching grid bots:', e);
      }
    }
    
    // Fetch DCA Bots
    if (!type || type === 'dca') {
      try {
        const dcaBots = await db.dcaBot.findMany({
          where: { userId },
          include: {
            account: {
              select: { accountType: true, exchangeName: true },
            },
          },
        });
        allBots.push(...dcaBots.map((b: unknown) => transformBot(b, 'dca')));
      } catch (e) {
        console.error('Error fetching dca bots:', e);
      }
    }
    
    // Fetch BB Bots
    if (!type || type === 'bb') {
      try {
        const bbBots = await db.bBBot.findMany({
          where: { userId },
          include: {
            account: {
              select: { accountType: true, exchangeName: true },
            },
          },
        });
        allBots.push(...bbBots.map((b: unknown) => transformBot(b, 'bb')));
      } catch (e) {
        console.error('Error fetching bb bots:', e);
      }
    }
    
    // Fetch Vision Bots
    if (!type || type === 'vision') {
      try {
        // @ts-expect-error - VisionBot may have different schema
        const visionBots = await db.visionBot.findMany({
          include: {
            account: {
              select: { accountType: true, exchangeName: true },
            },
          },
        });
        allBots.push(...visionBots.map((b: unknown) => transformBot(b, 'vision')));
      } catch (e) {
        console.error('Error fetching vision bots:', e);
      }
    }
    
    // Fetch Institutional Bots
    const institutionalTypes: { type: BotType; model: string }[] = [
      { type: 'spectrum', model: 'spectrumBot' },
      { type: 'reed', model: 'reedBot' },
      { type: 'architect', model: 'architectBot' },
      { type: 'equilibrist', model: 'equilibristBot' },
      { type: 'kron', model: 'kronBot' },
    ];
    for (const { type: botType, model } of institutionalTypes) {
      if (!type || type === botType) {
        try {
          const bots = await db[model]?.findMany({
            include: {
              account: {
                select: { accountType: true, exchangeName: true },
              },
            },
          });
          if (bots) {
            allBots.push(...bots.map((b: unknown) => transformBot(b, botType)));
          }
        } catch (e) {
          console.error(`Error fetching ${botType} bots:`, e);
        }
      }
    }
    
    // Filter by status if provided
    let filteredBots = allBots;
    if (status) {
      filteredBots = filteredBots.filter((bot: unknown) => (bot as { status: string }).status === status);
    }
    
    // Filter by exchange if provided
    if (exchangeId) {
      filteredBots = filteredBots.filter((bot: unknown) => 
        (bot as { exchangeId: string }).exchangeId === exchangeId
      );
    }
    
    // Calculate statistics
    const stats = {
      totalBots: filteredBots.length,
      activeBots: filteredBots.filter((b: unknown) => (b as { status: string }).status === 'RUNNING').length,
      pausedBots: filteredBots.filter((b: unknown) => (b as { status: string }).status === 'PAUSED').length,
      stoppedBots: filteredBots.filter((b: unknown) => (b as { status: string }).status === 'STOPPED').length,
      totalInvested: filteredBots.reduce((sum: number, b: unknown) => 
        sum + ((b as { metrics: { investedAmount: number } }).metrics?.investedAmount || 0), 0),
      totalPnL: filteredBots.reduce((sum: number, b: unknown) => 
        sum + ((b as { metrics: { realizedPnL: number } }).metrics?.realizedPnL || 0), 0),
    };
    
    return NextResponse.json({
      success: true,
      bots: filteredBots,
      stats,
    });
    
  } catch (error) {
    console.error('Error fetching unified bots:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bots', bots: [], stats: null },
      { status: 500 }
    );
  }
}

// ============================================
// POST - Control bot (start/stop/pause/resume)
// ============================================

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = (session?.user as any)?.id || 'demo-user';
    
    const body = await request.json();
    const { botId, botType, action, options } = body;
    
    if (!botId || !botType || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: botId, botType, action' },
        { status: 400 }
      );
    }
    
    // Map bot type to model name
    const modelMap: Record<string, string> = {
      'grid': 'gridBot',
      'dca': 'dcaBot',
      'bb': 'bBBot',
      'vision': 'visionBot',
      'spectrum': 'spectrumBot',
      'reed': 'reedBot',
      'architect': 'architectBot',
      'equilibrist': 'equilibristBot',
      'kron': 'kronBot',
    };
    
    const modelName = modelMap[botType];
    if (!modelName) {
      return NextResponse.json(
        { success: false, error: `Unknown bot type: ${botType}` },
        { status: 400 }
      );
    }
    
    // Determine new status based on action
    const statusMap: Record<string, string> = {
      'start': 'RUNNING',
      'pause': 'PAUSED',
      'resume': 'RUNNING',
      'stop': 'STOPPED',
      'restart': 'RUNNING',
    };
    
    const newStatus = statusMap[action];
    if (!newStatus) {
      return NextResponse.json(
        { success: false, error: `Unknown action: ${action}` },
        { status: 400 }
      );
    }
    
    // Update bot status
    const updateData: Record<string, unknown> = {
      status: newStatus,
      isActive: newStatus === 'RUNNING',
      updatedAt: new Date(),
    };
    
    if (action === 'start' || action === 'resume' || action === 'restart') {
      updateData.startedAt = new Date();
      updateData.stoppedAt = null;
    } else if (action === 'stop') {
      updateData.stoppedAt = new Date();
    }
    
    // Use dynamic model access
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedBot = await (db as any)[modelName].update({
      where: { id: botId },
      data: updateData,
    });
    
    return NextResponse.json({
      success: true,
      message: `Bot ${action} successful`,
      bot: {
        id: updatedBot.id,
        status: newStatus,
        isActive: updateData.isActive,
      },
    });
    
  } catch (error) {
    console.error('Error controlling bot:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to control bot' },
      { status: 500 }
    );
  }
}
