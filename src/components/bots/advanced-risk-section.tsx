"use client";

/**
 * Advanced Risk Management Section - Cornix-compatible
 * UI компонент для 7 дополнительных функций риск-менеджмента
 * 
 * 1. Stop Loss Leverage Adjustment
 * 2. Simultaneous Trades Per Symbol
 * 3. Min Symbol Price (USD)
 * 4. Min Symbol 24H Volume (USD)
 * 5. Max Concurrent Amount (USD)
 * 6. Auto-Cancel Trade Timeout
 * 7. Alternative USD Pairs
 */

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  TrendingDown,
  Layers,
  DollarSign,
  BarChart3,
  Clock,
  RefreshCcw,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ==================== TYPES ====================

export interface AdvancedRiskConfig {
  // 1. Stop Loss Leverage Adjustment
  slLeverageAdjustEnabled: boolean;
  slLeverageAdjustPercent: number;
  slLeverageAdjustMin: number;
  
  // 2. Simultaneous Trades Per Symbol
  maxTradesPerSymbol: number;
  
  // 3. Min Symbol Price (USD)
  minSymbolPrice: number | null;
  
  // 4. Min Symbol 24H Volume (USD)
  minSymbolVolume: number | null;
  
  // 5. Max Concurrent Amount (USD)
  maxConcurrentAmount: number | null;
  
  // 6. Auto-Cancel Trade Timeout
  autoCancelTimeout: number;
  autoCancelTimeoutUnit: "SECONDS" | "MINUTES" | "HOURS";
  
  // 7. Alternative USD Pairs
  alternativeUsdPairs: string[];
  useAlternativePairs: boolean;
}

export const DEFAULT_ADVANCED_RISK_CONFIG: AdvancedRiskConfig = {
  slLeverageAdjustEnabled: false,
  slLeverageAdjustPercent: 50,
  slLeverageAdjustMin: 1,
  
  maxTradesPerSymbol: 1,
  
  minSymbolPrice: null,
  minSymbolVolume: null,
  maxConcurrentAmount: null,
  
  autoCancelTimeout: 0,
  autoCancelTimeoutUnit: "MINUTES",
  
  alternativeUsdPairs: ["USDC", "BUSD", "USD"],
  useAlternativePairs: false,
};

// ==================== SECTION COMPONENT ====================

interface AdvancedRiskSectionProps {
  config: AdvancedRiskConfig;
  updateConfig: <K extends keyof AdvancedRiskConfig>(key: K, value: AdvancedRiskConfig[K]) => void;
}

export function AdvancedRiskSection({ config, updateConfig }: AdvancedRiskSectionProps) {
  const toggleAlternativePair = (pair: string) => {
    const current = config.alternativeUsdPairs;
    const newPairs = current.includes(pair)
      ? current.filter((p) => p !== pair)
      : [...current, pair];
    updateConfig("alternativeUsdPairs", newPairs);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 text-amber-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
              Advanced Risk Management
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Дополнительные инструменты защиты капитала (Cornix-compatible)
            </p>
          </div>
        </div>
      </div>

      {/* 1. Stop Loss Leverage Adjustment */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-red-500" />
            <Label className="text-sm font-medium">SL Leverage Adjustment</Label>
          </div>
          <Switch
            checked={config.slLeverageAdjustEnabled}
            onCheckedChange={(v) => updateConfig("slLeverageAdjustEnabled", v)}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Автоматическое снижение плеча после срабатывания стоп-лосса
        </p>
        
        {config.slLeverageAdjustEnabled && (
          <div className="space-y-4 p-3 rounded-lg bg-secondary/50">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Reduction %</Label>
                <Badge variant="outline">{config.slLeverageAdjustPercent}%</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                На сколько процентов снизить плечо (например, 50% = плечо 10x станет 5x)
              </p>
              <div className="flex items-center gap-4">
                <Slider
                  value={[config.slLeverageAdjustPercent]}
                  onValueChange={([v]) => updateConfig("slLeverageAdjustPercent", v)}
                  max={90}
                  min={10}
                  step={5}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={config.slLeverageAdjustPercent}
                  onChange={(e) => updateConfig("slLeverageAdjustPercent", parseFloat(e.target.value) || 50)}
                  className="w-20"
                  min={10}
                  max={90}
                  step={5}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs font-medium">Minimum Leverage</Label>
              <p className="text-xs text-muted-foreground">
                Минимальное плечо после снижения
              </p>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={config.slLeverageAdjustMin}
                  onChange={(e) => updateConfig("slLeverageAdjustMin", parseInt(e.target.value) || 1)}
                  className="w-20"
                  min={1}
                  max={20}
                />
                <span className="text-sm text-muted-foreground">x</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* 2. Simultaneous Trades Per Symbol */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-blue-500" />
          <Label className="text-sm font-medium">Max Trades Per Symbol</Label>
        </div>
        <p className="text-xs text-muted-foreground">
          Лимит одновременных позиций по одной торговой паре
        </p>
        <div className="flex items-center gap-4">
          <Slider
            value={[config.maxTradesPerSymbol]}
            onValueChange={([v]) => updateConfig("maxTradesPerSymbol", v)}
            max={10}
            min={1}
            step={1}
            className="flex-1"
          />
          <Badge variant="outline" className="w-12 justify-center">
            {config.maxTradesPerSymbol}
          </Badge>
        </div>
      </div>

      <Separator />

      {/* 3. Min Symbol Price */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <Label className="text-sm font-medium">Min Symbol Price (USD)</Label>
          </div>
          <Switch
            checked={config.minSymbolPrice !== null}
            onCheckedChange={(v) => updateConfig("minSymbolPrice", v ? 0.01 : null)}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Фильтр активов с низкой ценой (избегание проблем с ликвидностью)
        </p>
        
        {config.minSymbolPrice !== null && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">$</span>
            <Input
              type="number"
              value={config.minSymbolPrice}
              onChange={(e) => updateConfig("minSymbolPrice", parseFloat(e.target.value) || 0)}
              className="w-32"
              min={0}
              step={0.01}
              placeholder="0.01"
            />
            <span className="text-sm text-muted-foreground">USD</span>
          </div>
        )}
      </div>

      <Separator />

      {/* 4. Min Symbol 24H Volume */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-purple-500" />
            <Label className="text-sm font-medium">Min Symbol 24H Volume (USD)</Label>
          </div>
          <Switch
            checked={config.minSymbolVolume !== null}
            onCheckedChange={(v) => updateConfig("minSymbolVolume", v ? 1000000 : null)}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Фильтр активов с низким объёмом торгов (избегание проскальзывания)
        </p>
        
        {config.minSymbolVolume !== null && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">$</span>
            <Input
              type="number"
              value={config.minSymbolVolume}
              onChange={(e) => updateConfig("minSymbolVolume", parseFloat(e.target.value) || 0)}
              className="w-32"
              min={0}
              step={100000}
              placeholder="1000000"
            />
            <span className="text-sm text-muted-foreground">USD</span>
          </div>
        )}
      </div>

      <Separator />

      {/* 5. Max Concurrent Amount */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-orange-500" />
            <Label className="text-sm font-medium">Max Concurrent Amount (USD)</Label>
          </div>
          <Switch
            checked={config.maxConcurrentAmount !== null}
            onCheckedChange={(v) => updateConfig("maxConcurrentAmount", v ? 10000 : null)}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Максимальный общий объём открытых позиций (экспозиция)
        </p>
        
        {config.maxConcurrentAmount !== null && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">$</span>
            <Input
              type="number"
              value={config.maxConcurrentAmount}
              onChange={(e) => updateConfig("maxConcurrentAmount", parseFloat(e.target.value) || 0)}
              className="w-32"
              min={0}
              step={1000}
              placeholder="10000"
            />
            <span className="text-sm text-muted-foreground">USDT</span>
          </div>
        )}
      </div>

      <Separator />

      {/* 6. Auto-Cancel Trade Timeout */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-cyan-500" />
            <Label className="text-sm font-medium">Auto-Cancel Timeout</Label>
          </div>
          <Switch
            checked={config.autoCancelTimeout > 0}
            onCheckedChange={(v) => updateConfig("autoCancelTimeout", v ? 30 : 0)}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Автоматическая отмена неисполненных ордеров по таймауту
        </p>
        
        {config.autoCancelTimeout > 0 && (
          <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
            <Input
              type="number"
              value={config.autoCancelTimeout}
              onChange={(e) => updateConfig("autoCancelTimeout", parseInt(e.target.value) || 0)}
              className="w-24"
              min={1}
              max={1000}
            />
            <Select
              value={config.autoCancelTimeoutUnit}
              onValueChange={(v) => updateConfig("autoCancelTimeoutUnit", v as "SECONDS" | "MINUTES" | "HOURS")}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SECONDS">Секунд</SelectItem>
                <SelectItem value="MINUTES">Минут</SelectItem>
                <SelectItem value="HOURS">Часов</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <Separator />

      {/* 7. Alternative USD Pairs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCcw className="h-4 w-4 text-teal-500" />
            <Label className="text-sm font-medium">Alternative USD Pairs</Label>
          </div>
          <Switch
            checked={config.useAlternativePairs}
            onCheckedChange={(v) => updateConfig("useAlternativePairs", v)}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Использовать альтернативные стейблкоины (USDC, BUSD, и т.д.) если USDT недоступен
        </p>
        
        {config.useAlternativePairs && (
          <div className="space-y-2 p-3 rounded-lg bg-secondary/50">
            <Label className="text-xs font-medium">Preferred Stablecoins</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["USDC", "BUSD", "USD", "DAI", "TUSD"].map((pair) => (
                <button
                  key={pair}
                  type="button"
                  onClick={() => toggleAlternativePair(pair)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors",
                    config.alternativeUsdPairs.includes(pair)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-secondary/50"
                  )}
                >
                  {pair}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Порядок выбора: {config.alternativeUsdPairs.join(" → ") || "не выбрано"}
            </p>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-500 mt-0.5" />
          <p className="text-xs text-blue-600 dark:text-blue-400">
            <strong>Совет:</strong> Эти настройки применяются перед исполнением каждого сигнала. 
            Если проверка не пройдена, сигнал будет отклонён с указанием причины.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdvancedRiskSection;
