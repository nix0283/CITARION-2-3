"use client";

import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Zap,
  Shield,
  Target,
  Clock,
  Settings2,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  Info,
  ChevronDown,
  Gauge,
  Layers,
  Bot,
  CandlestickChart,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Trading modes with configurations
export type TradingMode =
  | 'manual'      // Full manual control
  | 'semi-auto'   // Semi-automated with confirmations
  | 'auto'        // Fully automated
  | 'paper';      // Paper trading (simulation)

export type RiskProfile = 'conservative' | 'moderate' | 'aggressive';

export interface TradingModeConfig {
  mode: TradingMode;
  riskProfile: RiskProfile;
  maxPositionSize: number;  // Percentage of portfolio
  stopLossPercent: number;
  takeProfitPercent: number;
  maxOpenPositions: number;
  allowShorting: boolean;
  confirmTrades: boolean;
  autoExecute: boolean;
  trailingStop: boolean;
  trailingStopPercent: number;
  timeInForce: 'GTC' | 'IOC' | 'FOK';
  leverage: number;
}

// Default configurations for each mode
const DEFAULT_CONFIGS: Record<TradingMode, Partial<TradingModeConfig>> = {
  manual: {
    confirmTrades: true,
    autoExecute: false,
    maxPositionSize: 25,
    stopLossPercent: 5,
    takeProfitPercent: 10,
    maxOpenPositions: 5,
    allowShorting: false,
    leverage: 1,
  },
  'semi-auto': {
    confirmTrades: true,
    autoExecute: true,
    maxPositionSize: 20,
    stopLossPercent: 3,
    takeProfitPercent: 8,
    maxOpenPositions: 3,
    allowShorting: false,
    trailingStop: true,
    trailingStopPercent: 2,
    leverage: 1,
  },
  auto: {
    confirmTrades: false,
    autoExecute: true,
    maxPositionSize: 15,
    stopLossPercent: 2,
    takeProfitPercent: 5,
    maxOpenPositions: 5,
    allowShorting: true,
    trailingStop: true,
    trailingStopPercent: 1.5,
    leverage: 2,
  },
  paper: {
    confirmTrades: false,
    autoExecute: true,
    maxPositionSize: 50,
    stopLossPercent: 5,
    takeProfitPercent: 15,
    maxOpenPositions: 10,
    allowShorting: true,
    trailingStop: true,
    trailingStopPercent: 3,
    leverage: 3,
  },
};

// Risk profile adjustments
const RISK_ADJUSTMENTS: Record<RiskProfile, Partial<TradingModeConfig>> = {
  conservative: {
    maxPositionSize: 10,
    stopLossPercent: 2,
    takeProfitPercent: 5,
    maxOpenPositions: 3,
    leverage: 1,
  },
  moderate: {
    maxPositionSize: 20,
    stopLossPercent: 3,
    takeProfitPercent: 8,
    maxOpenPositions: 5,
    leverage: 2,
  },
  aggressive: {
    maxPositionSize: 35,
    stopLossPercent: 5,
    takeProfitPercent: 15,
    maxOpenPositions: 8,
    leverage: 5,
  },
};

// Mode configurations for display
const MODE_CONFIG: Record<TradingMode, {
  label: string;
  icon: typeof Activity;
  color: string;
  bgColor: string;
  description: string;
}> = {
  manual: {
    label: 'Ручной',
    icon: HandIcon,
    color: '#9E9E9E',
    bgColor: 'bg-gray-500/10',
    description: 'Полный ручной контроль над каждой сделкой',
  },
  'semi-auto': {
    label: 'Полуавто',
    icon: Zap,
    color: '#FFD700',
    bgColor: 'bg-yellow-500/10',
    description: 'Автоматическое исполнение с подтверждением',
  },
  auto: {
    label: 'Авто',
    icon: Bot,
    color: '#26A69A',
    bgColor: 'bg-green-500/10',
    description: 'Полностью автоматическая торговля',
  },
  paper: {
    label: 'Тест',
    icon: CandlestickChart,
    color: '#2962FF',
    bgColor: 'bg-blue-500/10',
    description: 'Симуляция без реальных средств',
  },
};

// Hand icon component (not available in lucide)
function HandIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  );
}

interface TradingModeSwitchProps {
  currentMode: TradingMode;
  config?: Partial<TradingModeConfig>;
  onModeChange?: (mode: TradingMode) => void;
  onConfigChange?: (config: TradingModeConfig) => void;
  compact?: boolean;
  showSettings?: boolean;
}

export function TradingModeSwitch({
  currentMode,
  config,
  onModeChange,
  onConfigChange,
  compact = false,
  showSettings = true,
}: TradingModeSwitchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localConfig, setLocalConfig] = useState<TradingModeConfig>(() => ({
    mode: currentMode,
    riskProfile: 'moderate',
    maxPositionSize: 20,
    stopLossPercent: 3,
    takeProfitPercent: 8,
    maxOpenPositions: 5,
    allowShorting: false,
    confirmTrades: true,
    autoExecute: false,
    trailingStop: false,
    trailingStopPercent: 2,
    timeInForce: 'GTC',
    leverage: 1,
    ...DEFAULT_CONFIGS[currentMode],
    ...RISK_ADJUSTMENTS['moderate'],
    ...config,
  }));

  // Get current mode display config
  const modeDisplay = MODE_CONFIG[currentMode];
  const ModeIcon = modeDisplay.icon;

  // Update config when mode changes
  const handleModeChange = useCallback((mode: TradingMode) => {
    const newConfig: TradingModeConfig = {
      ...localConfig,
      mode,
      ...DEFAULT_CONFIGS[mode],
      ...RISK_ADJUSTMENTS[localConfig.riskProfile],
    };
    setLocalConfig(newConfig);
    onModeChange?.(mode);
    onConfigChange?.(newConfig);
  }, [localConfig, onModeChange, onConfigChange]);

  // Update risk profile
  const handleRiskProfileChange = useCallback((profile: RiskProfile) => {
    const newConfig: TradingModeConfig = {
      ...localConfig,
      riskProfile: profile,
      ...RISK_ADJUSTMENTS[profile],
    };
    setLocalConfig(newConfig);
    onConfigChange?.(newConfig);
  }, [localConfig, onConfigChange]);

  // Update individual config value
  const updateConfig = useCallback(<K extends keyof TradingModeConfig>(
    key: K,
    value: TradingModeConfig[K]
  ) => {
    const newConfig = { ...localConfig, [key]: value };
    setLocalConfig(newConfig);
    onConfigChange?.(newConfig);
  }, [localConfig, onConfigChange]);

  // Compact mode - simple dropdown
  if (compact) {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn("h-8 gap-1", modeDisplay.bgColor)}
            style={{ borderColor: modeDisplay.color }}
          >
            <ModeIcon className="h-4 w-4" style={{ color: modeDisplay.color }} />
            <span className="text-xs">{modeDisplay.label}</span>
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2" align="end">
          <div className="space-y-1">
            {(Object.keys(MODE_CONFIG) as TradingMode[]).map((mode) => {
              const config = MODE_CONFIG[mode];
              const Icon = config.icon;
              const isActive = mode === currentMode;

              return (
                <Button
                  key={mode}
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className="w-full justify-start h-9"
                  onClick={() => {
                    handleModeChange(mode);
                    setIsOpen(false);
                  }}
                  style={isActive ? { backgroundColor: config.color } : {}}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {config.label}
                </Button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // Full mode with settings
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      {/* Mode Selection */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">Режим торговли</span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{modeDisplay.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Mode Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {(Object.keys(MODE_CONFIG) as TradingMode[]).map((mode) => {
          const config = MODE_CONFIG[mode];
          const Icon = config.icon;
          const isActive = mode === currentMode;

          return (
            <Button
              key={mode}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              className={cn(
                "h-auto py-2 flex-col gap-1",
                isActive && config.bgColor
              )}
              style={isActive ? { backgroundColor: config.color } : { borderColor: config.color }}
              onClick={() => handleModeChange(mode)}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs">{config.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Risk Profile */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Профиль риска</span>
          <Badge
            variant="outline"
            className={cn(
              localConfig.riskProfile === 'conservative' && 'border-green-500 text-green-500',
              localConfig.riskProfile === 'moderate' && 'border-yellow-500 text-yellow-500',
              localConfig.riskProfile === 'aggressive' && 'border-red-500 text-red-500'
            )}
          >
            {localConfig.riskProfile === 'conservative' && 'Консервативный'}
            {localConfig.riskProfile === 'moderate' && 'Умеренный'}
            {localConfig.riskProfile === 'aggressive' && 'Агрессивный'}
          </Badge>
        </div>
        <Select
          value={localConfig.riskProfile}
          onValueChange={(v) => handleRiskProfileChange(v as RiskProfile)}
        >
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="conservative">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Консервативный</span>
              </div>
            </SelectItem>
            <SelectItem value="moderate">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-yellow-500" />
                <span>Умеренный</span>
              </div>
            </SelectItem>
            <SelectItem value="aggressive">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-red-500" />
                <span>Агрессивный</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Position Settings */}
      {showSettings && (
        <div className="space-y-3 pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Settings2 className="h-3 w-3" />
            <span>Настройки позиции</span>
          </div>

          {/* Max Position Size */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs">Макс. размер позиции</span>
              <span className="text-xs font-medium">{localConfig.maxPositionSize}%</span>
            </div>
            <Slider
              value={[localConfig.maxPositionSize]}
              onValueChange={([v]) => updateConfig('maxPositionSize', v)}
              min={5}
              max={50}
              step={5}
              className="h-2"
            />
          </div>

          {/* Stop Loss / Take Profit */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs">Stop Loss</span>
                <span className="text-xs font-medium text-red-500">-{localConfig.stopLossPercent}%</span>
              </div>
              <Slider
                value={[localConfig.stopLossPercent]}
                onValueChange={([v]) => updateConfig('stopLossPercent', v)}
                min={1}
                max={10}
                step={0.5}
                className="h-2"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs">Take Profit</span>
                <span className="text-xs font-medium text-green-500">+{localConfig.takeProfitPercent}%</span>
              </div>
              <Slider
                value={[localConfig.takeProfitPercent]}
                onValueChange={([v]) => updateConfig('takeProfitPercent', v)}
                min={2}
                max={20}
                step={1}
                className="h-2"
              />
            </div>
          </div>

          {/* Max Open Positions */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs">Макс. открытых позиций</span>
              <span className="text-xs font-medium">{localConfig.maxOpenPositions}</span>
            </div>
            <Slider
              value={[localConfig.maxOpenPositions]}
              onValueChange={([v]) => updateConfig('maxOpenPositions', v)}
              min={1}
              max={10}
              step={1}
              className="h-2"
            />
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center justify-between p-2 rounded bg-muted/30">
              <span className="text-xs">Шорт</span>
              <Switch
                checked={localConfig.allowShorting}
                onCheckedChange={(v) => updateConfig('allowShorting', v)}
                className="data-[state=checked]:bg-primary h-5"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-muted/30">
              <span className="text-xs">Подтверждение</span>
              <Switch
                checked={localConfig.confirmTrades}
                onCheckedChange={(v) => updateConfig('confirmTrades', v)}
                className="data-[state=checked]:bg-primary h-5"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-muted/30">
              <span className="text-xs">Trailing Stop</span>
              <Switch
                checked={localConfig.trailingStop}
                onCheckedChange={(v) => updateConfig('trailingStop', v)}
                className="data-[state=checked]:bg-primary h-5"
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-muted/30">
              <span className="text-xs">Авто-исполнение</span>
              <Switch
                checked={localConfig.autoExecute}
                onCheckedChange={(v) => updateConfig('autoExecute', v)}
                className="data-[state=checked]:bg-primary h-5"
              />
            </div>
          </div>

          {/* Leverage */}
          <div className="flex items-center justify-between p-2 rounded bg-muted/30">
            <div className="flex items-center gap-2">
              <span className="text-xs">Плечо</span>
              {localConfig.leverage > 3 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <AlertTriangle className="h-3 w-3 text-yellow-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Высокий риск ликвидации!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <Select
              value={localConfig.leverage.toString()}
              onValueChange={(v) => updateConfig('leverage', parseInt(v))}
            >
              <SelectTrigger className="w-20 h-7">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 5, 10, 20, 50, 100].map((lev) => (
                  <SelectItem key={lev} value={lev.toString()}>
                    {lev}x
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Warning for auto mode */}
      {currentMode === 'auto' && (
        <div className="flex items-center gap-2 p-2 rounded bg-red-500/10 border border-red-500/20">
          <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
          <span className="text-xs text-red-500">
            Автоматический режим: Bot будет торговать без подтверждения
          </span>
        </div>
      )}

      {/* Paper mode indicator */}
      {currentMode === 'paper' && (
        <div className="flex items-center gap-2 p-2 rounded bg-blue-500/10 border border-blue-500/20">
          <CandlestickChart className="h-4 w-4 text-blue-500 flex-shrink-0" />
          <span className="text-xs text-blue-500">
            Тестовый режим: Торговля без реальных средств
          </span>
        </div>
      )}
    </div>
  );
}

// Export types
export type { TradingModeConfig };
export default TradingModeSwitch;
