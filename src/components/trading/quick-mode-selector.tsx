/**
 * Quick Mode Selector
 * 
 * Быстрый переключатель режима торговли для использования
 * в ручной торговле, сигнальной торговле и других компонентах.
 * 
 * Note: TESTNET mode has been merged into DEMO mode.
 */

"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  useTradingConfigStore,
  type ExchangeTradingMode,
  type TradingSource,
  TRADING_MODE_INFO,
  EXCHANGE_MODE_SUPPORT,
} from "@/stores/trading-config-store";
import { SUPPORTED_EXCHANGES } from "@/lib/exchanges";
import {
  FlaskConical,
  Zap,
  AlertTriangle,
  ChevronDown,
  Check,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mode icons
const MODE_ICONS: Record<ExchangeTradingMode, typeof FlaskConical> = {
  PAPER: FlaskConical,
  DEMO: Zap,
  LIVE: AlertTriangle,
};

// ==================== QUICK MODE BUTTONS ====================

interface QuickModeButtonsProps {
  source: TradingSource;
  exchangeId?: string;
  onModeChange?: (mode: ExchangeTradingMode) => void;
  compact?: boolean;
}

export function QuickModeButtons({
  source,
  exchangeId,
  onModeChange,
  compact = false,
}: QuickModeButtonsProps) {
  const {
    primaryExchange,
    getEffectiveMode,
    setExchangeMode,
    getSupportedModes,
  } = useTradingConfigStore();

  const activeExchange = exchangeId || primaryExchange[source];
  const currentMode = getEffectiveMode(activeExchange);
  const supportedModes = getSupportedModes(activeExchange);

  const handleModeChange = (mode: ExchangeTradingMode) => {
    setExchangeMode(activeExchange, "futures", mode);
    onModeChange?.(mode);
  };

  if (compact) {
    return (
      <Select
        value={currentMode}
        onValueChange={(v) => handleModeChange(v as ExchangeTradingMode)}
      >
        <SelectTrigger className="h-7 w-auto border-0 bg-transparent p-1 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {supportedModes.map((mode) => {
            const info = TRADING_MODE_INFO[mode];
            const Icon = MODE_ICONS[mode];
            return (
              <SelectItem key={mode} value={mode}>
                <div className="flex items-center gap-2">
                  <Icon className={cn("h-3 w-3", info.color)} />
                  <span className={info.color}>{mode}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        {supportedModes.map((mode) => {
          const info = TRADING_MODE_INFO[mode];
          const Icon = MODE_ICONS[mode];
          const isActive = currentMode === mode;

          return (
            <Tooltip key={mode}>
              <TooltipTrigger asChild>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "h-7 px-2 text-xs",
                    isActive && info.bgColor,
                    isActive && info.color,
                    isActive && "border",
                    isActive && info.borderColor
                  )}
                  onClick={() => handleModeChange(mode)}
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {mode}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">{info.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

// ==================== TRADING CONTEXT SELECTOR ====================

interface TradingContextSelectorProps {
  source: TradingSource;
  onContextChange?: (exchangeId: string, mode: ExchangeTradingMode) => void;
  showModeSelector?: boolean;
}

export function TradingContextSelector({
  source,
  onContextChange,
  showModeSelector = true,
}: TradingContextSelectorProps) {
  const {
    primaryExchange,
    setPrimaryExchange,
    getEffectiveMode,
    setExchangeMode,
    getSupportedModes,
  } = useTradingConfigStore();

  const currentExchange = primaryExchange[source];
  const currentMode = getEffectiveMode(currentExchange);
  const supportedModes = getSupportedModes(currentExchange);

  const handleExchangeChange = (exchangeId: string) => {
    setPrimaryExchange(source, exchangeId);
    onContextChange?.(exchangeId, getEffectiveMode(exchangeId));
  };

  const handleModeChange = (mode: ExchangeTradingMode) => {
    setExchangeMode(currentExchange, "futures", mode);
    onContextChange?.(currentExchange, mode);
  };

  // Get unique exchanges
  const uniqueExchanges = SUPPORTED_EXCHANGES.reduce(
    (acc, exchange) => {
      if (!acc.find((e) => e.id === exchange.id)) {
        acc.push(exchange);
      }
      return acc;
    },
    [] as typeof SUPPORTED_EXCHANGES
  );

  return (
    <div className="flex items-center gap-2">
      {/* Exchange Selector */}
      <Select value={currentExchange} onValueChange={handleExchangeChange}>
        <SelectTrigger className="h-8 w-[120px] text-xs">
          <Building2 className="h-3 w-3 mr-1" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {uniqueExchanges.map((exchange) => (
            <SelectItem key={exchange.id} value={exchange.id}>
              {exchange.displayName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Mode Selector */}
      {showModeSelector && (
        <Select
          value={currentMode}
          onValueChange={(v) => handleModeChange(v as ExchangeTradingMode)}
        >
          <SelectTrigger className="h-8 w-[100px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {supportedModes.map((mode) => {
              const info = TRADING_MODE_INFO[mode];
              const Icon = MODE_ICONS[mode];
              return (
                <SelectItem key={mode} value={mode}>
                  <div className="flex items-center gap-2">
                    <Icon className={cn("h-3 w-3", info.color)} />
                    <span className={info.color}>{mode}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}

// ==================== MODE BADGE ====================

interface ModeBadgeProps {
  exchangeId?: string;
  source?: TradingSource;
  mode?: ExchangeTradingMode;
  showIcon?: boolean;
  className?: string;
}

export function ModeBadge({
  exchangeId,
  source,
  mode,
  showIcon = true,
  className,
}: ModeBadgeProps) {
  const { primaryExchange, getEffectiveMode } = useTradingConfigStore();

  let activeMode: ExchangeTradingMode;
  if (mode) {
    activeMode = mode;
  } else if (exchangeId) {
    activeMode = getEffectiveMode(exchangeId);
  } else if (source) {
    activeMode = getEffectiveMode(primaryExchange[source]);
  } else {
    activeMode = "PAPER";
  }

  const info = TRADING_MODE_INFO[activeMode];
  const Icon = MODE_ICONS[activeMode];

  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[10px] font-medium",
        info.bgColor,
        info.color,
        info.borderColor,
        className
      )}
    >
      {showIcon && <Icon className="h-3 w-3 mr-1" />}
      {info.label}
    </Badge>
  );
}

// ==================== EXCHANGE MODE SELECTOR ====================

interface ExchangeModeSelectorProps {
  exchangeId: string;
  exchangeType?: "spot" | "futures" | "inverse";
  onModeChange?: (mode: ExchangeTradingMode) => void;
}

export function ExchangeModeSelector({
  exchangeId,
  exchangeType = "futures",
  onModeChange,
}: ExchangeModeSelectorProps) {
  const { getEffectiveMode, setExchangeMode, getSupportedModes } =
    useTradingConfigStore();

  const currentMode = getEffectiveMode(exchangeId, exchangeType);
  const supportedModes = getSupportedModes(exchangeId);

  const handleModeChange = (mode: ExchangeTradingMode) => {
    setExchangeMode(exchangeId, exchangeType, mode);
    onModeChange?.(mode);
  };

  return (
    <div className="flex items-center gap-1">
      {supportedModes.map((mode) => {
        const info = TRADING_MODE_INFO[mode];
        const Icon = MODE_ICONS[mode];
        const isActive = currentMode === mode;

        return (
          <Button
            key={mode}
            variant={isActive ? "default" : "outline"}
            size="sm"
            className={cn(
              "h-7 text-[10px] px-2",
              isActive && info.bgColor,
              isActive && info.color,
              !isActive && "opacity-60"
            )}
            onClick={() => handleModeChange(mode)}
          >
            <Icon className="h-3 w-3 mr-1" />
            {mode}
            {isActive && <Check className="h-3 w-3 ml-1" />}
          </Button>
        );
      })}
    </div>
  );
}

// ==================== EXPORTS ====================

export { MODE_ICONS, TRADING_MODE_INFO, EXCHANGE_MODE_SUPPORT };
