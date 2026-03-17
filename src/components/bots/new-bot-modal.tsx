/**
 * New Bot Modal
 * 
 * Unified modal for creating new bots of any type.
 * Features type selection, exchange configuration, and type-specific settings.
 */

'use client';

import { useState, useMemo } from 'react';
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
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Plus,
  Loader2,
  Check,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import type { BotType } from '@/hooks/use-bots';

// ============================================
// Types
// ============================================

interface NewBotModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (config: NewBotConfig) => Promise<boolean>;
  accountId?: string;
}

interface NewBotConfig {
  type: BotType;
  name: string;
  description?: string;
  accountId: string;
  symbol: string;
  exchangeId: string;
  direction: 'LONG' | 'SHORT' | 'BOTH';
  config: Record<string, unknown>;
}

interface BotTypeOption {
  type: BotType;
  name: string;
  code: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

// ============================================
// Bot Types Data
// ============================================

const BOT_TYPES: BotTypeOption[] = [
  // Operational
  { type: 'grid', name: 'MESH', code: 'Grid', category: 'Operational', icon: Grid3X3, description: 'Grid trading - auto buy low, sell high in range' },
  { type: 'dca', name: 'SCALE', code: 'DCA', category: 'Operational', icon: Layers, description: 'Dollar cost averaging - scale in on price drops' },
  { type: 'bb', name: 'BAND', code: 'BB', category: 'Operational', icon: Activity, description: 'Bollinger Bands - mean reversion strategy' },
  
  // Analytical
  { type: 'vision', name: 'FCST', code: 'Vision', category: 'Analytical', icon: Eye, description: 'AI-powered price forecasting' },
  { type: 'argus', name: 'PND', code: 'Argus', category: 'Analytical', icon: Radar, description: 'Pump & dump detection' },
  { type: 'orion', name: 'TRND', code: 'Orion', category: 'Analytical', icon: Target, description: 'Trend following strategy' },
  { type: 'range', name: 'RNG', code: 'Range', category: 'Analytical', icon: Minimize2, description: 'Range-bound trading' },
  { type: 'wolf', name: 'WOLF', code: 'Wolf', category: 'Analytical', icon: PawPrint, description: 'Whale tracking' },
  
  // Institutional
  { type: 'spectrum', name: 'PR', code: 'Spectrum', category: 'Institutional', icon: ArrowLeftRight, description: 'Portfolio rebalancing' },
  { type: 'reed', name: 'STA', code: 'Reed', category: 'Institutional', icon: Scale, description: 'Statistical arbitrage' },
  { type: 'architect', name: 'MM', code: 'Architect', category: 'Institutional', icon: Building, description: 'Market making' },
  { type: 'equilibrist', name: 'MR', code: 'Equilibrist', category: 'Institutional', icon: Minimize2, description: 'Mean reversion' },
  { type: 'kron', name: 'TRF', code: 'Kron', category: 'Institutional', icon: TrendingUp, description: 'Trend following' },
  
  // Frequency
  { type: 'hft', name: 'HFT', code: 'Helios', category: 'Frequency', icon: Zap, description: 'High frequency trading' },
  { type: 'mft', name: 'MFT', code: 'Selena', category: 'Frequency', icon: Clock, description: 'Medium frequency trading' },
  { type: 'lft', name: 'LFT', code: 'Atlas', category: 'Frequency', icon: Compass, description: 'Low frequency trading' },
];

const EXCHANGES = [
  { id: 'binance', name: 'Binance' },
  { id: 'bybit', name: 'Bybit' },
  { id: 'okx', name: 'OKX' },
  { id: 'bitget', name: 'Bitget' },
  { id: 'kucoin', name: 'KuCoin' },
  { id: 'bingx', name: 'BingX' },
  { id: 'hyperliquid', name: 'HyperLiquid' },
];

const CATEGORIES = ['Operational', 'Analytical', 'Institutional', 'Frequency'];

// ============================================
// Component
// ============================================

export function NewBotModal({ 
  open, 
  onOpenChange, 
  onCreate,
  accountId,
}: NewBotModalProps) {
  const [step, setStep] = useState<'type' | 'config' | 'confirm'>('type');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [selectedType, setSelectedType] = useState<BotType | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [exchangeId, setExchangeId] = useState('binance');
  const [direction, setDirection] = useState<'LONG' | 'SHORT' | 'BOTH'>('LONG');
  
  // Type-specific config
  const [gridCount, setGridCount] = useState(10);
  const [upperPrice, setUpperPrice] = useState('75000');
  const [lowerPrice, setLowerPrice] = useState('65000');
  const [totalInvestment, setTotalInvestment] = useState('1000');
  const [leverage, setLeverage] = useState(1);
  
  // Reset on close
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setStep('type');
      setSelectedType(null);
      setName('');
      setDescription('');
      setSymbol('BTCUSDT');
      setExchangeId('binance');
      setDirection('LONG');
      setGridCount(10);
      setUpperPrice('75000');
      setLowerPrice('65000');
      setTotalInvestment('1000');
      setLeverage(1);
    }
    onOpenChange(newOpen);
  };
  
  // Handle type selection
  const handleTypeSelect = (type: BotType) => {
    setSelectedType(type);
    const botType = BOT_TYPES.find(b => b.type === type);
    if (botType) {
      setName(`${botType.code} Bot`);
    }
    setStep('config');
  };
  
  // Get type-specific config
  const getTypeConfig = (): Record<string, unknown> => {
    switch (selectedType) {
      case 'grid':
        return {
          gridType: 'ARITHMETIC',
          gridCount,
          upperPrice: parseFloat(upperPrice),
          lowerPrice: parseFloat(lowerPrice),
          totalInvestment: parseFloat(totalInvestment),
          leverage,
          trailingGrid: false,
          adaptiveEnabled: false,
        };
      case 'dca':
        return {
          baseAmount: parseFloat(totalInvestment),
          dcaLevels: 5,
          dcaPercent: 5,
          dcaMultiplier: 1.5,
          tpValue: 10,
          tpType: 'PERCENT',
          slEnabled: false,
          leverage,
          trailingEnabled: false,
        };
      case 'bb':
        return {
          marketType: 'FUTURES',
          timeframes: ['15m'],
          tradeAmount: parseFloat(totalInvestment),
          leverage,
          bbInnerPeriod: 20,
          bbInnerDeviation: 1.0,
          bbOuterPeriod: 20,
          bbOuterDeviation: 2.0,
        };
      default:
        return {
          investmentAmount: parseFloat(totalInvestment),
          leverage,
        };
    }
  };
  
  // Handle create
  const handleCreate = async () => {
    if (!selectedType || !name || !symbol) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsLoading(true);
    
    const config: NewBotConfig = {
      type: selectedType,
      name,
      description: description || undefined,
      accountId: accountId || '',
      symbol,
      exchangeId,
      direction,
      config: getTypeConfig(),
    };
    
    const success = await onCreate(config);
    setIsLoading(false);
    
    if (success) {
      handleOpenChange(false);
    }
  };
  
  // Render type selection
  const renderTypeSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Select Bot Type</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Choose the trading strategy that fits your goals
        </p>
      </div>
      
      <div className="space-y-4">
        {CATEGORIES.map(category => (
          <div key={category}>
            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
              {category}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {BOT_TYPES.filter(b => b.category === category).map(botType => (
                <button
                  key={botType.type}
                  onClick={() => handleTypeSelect(botType.type)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border transition-all",
                    "hover:bg-accent hover:border-primary/50",
                    selectedType === botType.type && "bg-primary/5 border-primary"
                  )}
                >
                  <botType.icon className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium text-sm">{botType.name}</div>
                    <div className="text-xs text-muted-foreground">{botType.code}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  // Render configuration
  const renderConfig = () => {
    const botType = BOT_TYPES.find(b => b.type === selectedType);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep('type')}
          >
            ← Back
          </Button>
          <div className="flex items-center gap-2">
            {botType && <botType.icon className="h-5 w-5 text-primary" />}
            <h3 className="text-lg font-semibold">{botType?.name} Configuration</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Bot Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Bot"
            />
          </div>
          <div className="space-y-2">
            <Label>Symbol</Label>
            <Input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="BTCUSDT"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Exchange</Label>
            <Select value={exchangeId} onValueChange={setExchangeId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EXCHANGES.map(ex => (
                  <SelectItem key={ex.id} value={ex.id}>
                    {ex.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Direction</Label>
            <Select value={direction} onValueChange={(v) => setDirection(v as 'LONG' | 'SHORT' | 'BOTH')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LONG">Long</SelectItem>
                <SelectItem value="SHORT">Short</SelectItem>
                <SelectItem value="BOTH">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Type-specific config */}
        {(selectedType === 'grid' || selectedType === 'dca' || selectedType === 'bb') && (
          <>
            <Separator />
            
            <div className="space-y-4">
              {selectedType === 'grid' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Lower Price</Label>
                      <Input
                        type="number"
                        value={lowerPrice}
                        onChange={(e) => setLowerPrice(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Upper Price</Label>
                      <Input
                        type="number"
                        value={upperPrice}
                        onChange={(e) => setUpperPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Grid Levels</Label>
                      <Badge variant="outline">{gridCount}</Badge>
                    </div>
                    <Slider
                      value={[gridCount]}
                      onValueChange={([v]) => setGridCount(v)}
                      min={2}
                      max={100}
                      step={1}
                    />
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label>Investment (USDT)</Label>
                <Input
                  type="number"
                  value={totalInvestment}
                  onChange={(e) => setTotalInvestment(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Leverage</Label>
                  <Badge variant="outline">{leverage}x</Badge>
                </div>
                <Slider
                  value={[leverage]}
                  onValueChange={([v]) => setLeverage(v)}
                  min={1}
                  max={20}
                  step={1}
                />
              </div>
            </div>
          </>
        )}
        
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            Create Bot
          </Button>
        </div>
      </div>
    );
  };
  
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            New Bot
          </DialogTitle>
          <DialogDescription>
            Create a new trading bot
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 -mx-6 px-6">
          {step === 'type' && renderTypeSelection()}
          {step === 'config' && renderConfig()}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
