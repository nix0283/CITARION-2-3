"use client";

/**
 * Bot Configuration Extensions - Cornix-compatible
 * Дополнительные секции для BotConfigForm
 * 
 * Включает:
 * - Direction Filter (Long/Short/Both)
 * - Trailing Entry
 * - Trailing Take-Profit
 * - Moving Take-Profit
 * - Limit Price Reduction
 * - Operation Hours
 * - Signal Behavior
 */

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AccordionContent,
} from "@/components/ui/accordion";
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Clock,
  AlertTriangle,
  Info,
  TrendingUp,
  Target,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ==================== TYPES ====================

export interface ExtendedBotConfig {
  // Direction Filter
  directionFilter: "LONG" | "SHORT" | "BOTH";
  
  // Trailing Entry (Cornix-compatible)
  trailingEntryEnabled: boolean;
  trailingEntryPercent: number;
  trailingEntryActivateDist: number;
  trailingEntryOnlyIfNotInGrp: boolean;
  
  // Trailing Take-Profit (Cornix-compatible)
  trailingTPEnabled: boolean;
  trailingTPPercent: number;
  trailingTPActivateAfterTP: number;
  trailingTPOnlyIfNotInGrp: boolean;
  
  // Moving Take-Profit (Cornix-compatible)
  movingTPEnabled: boolean;
  movingTPBaseline: "AVERAGE_ENTRIES" | "FIRST_ENTRY";
  movingTPOnlyIfNotInGrp: boolean;
  
  // Limit Price Reduction (Cornix-compatible)
  limitPriceReductionEnabled: boolean;
  limitPriceReductionPercent: number;
  
  // Operation Hours (Cornix-compatible)
  operationHoursEnabled: boolean;
  operationHoursStart: number;
  operationHoursEnd: number;
  operationHoursDays: number[];
  
  // Signal Behavior (Cornix-compatible)
  onSignalCancel: "CLOSE" | "KEEP" | "IGNORE";
  onSignalEdit: "UPDATE" | "KEEP" | "IGNORE";
  onlyUseIfNotDef: boolean;
}

export const DEFAULT_EXTENDED_CONFIG: ExtendedBotConfig = {
  directionFilter: "BOTH",
  
  trailingEntryEnabled: false,
  trailingEntryPercent: 1,
  trailingEntryActivateDist: 0.5,
  trailingEntryOnlyIfNotInGrp: false,
  
  trailingTPEnabled: false,
  trailingTPPercent: 1,
  trailingTPActivateAfterTP: 1,
  trailingTPOnlyIfNotInGrp: false,
  
  movingTPEnabled: false,
  movingTPBaseline: "AVERAGE_ENTRIES",
  movingTPOnlyIfNotInGrp: false,
  
  limitPriceReductionEnabled: false,
  limitPriceReductionPercent: 0.1,
  
  operationHoursEnabled: false,
  operationHoursStart: 0,
  operationHoursEnd: 24,
  operationHoursDays: [1, 2, 3, 4, 5, 6, 7],
  
  onSignalCancel: "CLOSE",
  onSignalEdit: "UPDATE",
  onlyUseIfNotDef: false,
};

// ==================== DIRECTION FILTER SECTION ====================

interface DirectionFilterSectionProps {
  config: ExtendedBotConfig;
  updateConfig: <K extends keyof ExtendedBotConfig>(key: K, value: ExtendedBotConfig[K]) => void;
}

export function DirectionFilterSection({ config, updateConfig }: DirectionFilterSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Направление сделок</Label>
          <p className="text-xs text-muted-foreground mt-0.5">
            Фильтрация сигналов по направлению (Long/Short)
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => updateConfig("directionFilter", "LONG")}
          className={cn(
            "p-3 rounded-lg border text-center transition-colors",
            config.directionFilter === "LONG"
              ? "border-green-500 bg-green-500/10"
              : "border-border hover:bg-secondary/50"
          )}
        >
          <ArrowUp className={cn(
            "h-5 w-5 mx-auto mb-1",
            config.directionFilter === "LONG" ? "text-green-500" : "text-muted-foreground"
          )} />
          <p className="font-medium text-sm">LONG</p>
          <p className="text-xs text-muted-foreground">Только покупки</p>
        </button>
        
        <button
          type="button"
          onClick={() => updateConfig("directionFilter", "SHORT")}
          className={cn(
            "p-3 rounded-lg border text-center transition-colors",
            config.directionFilter === "SHORT"
              ? "border-red-500 bg-red-500/10"
              : "border-border hover:bg-secondary/50"
          )}
        >
          <ArrowDown className={cn(
            "h-5 w-5 mx-auto mb-1",
            config.directionFilter === "SHORT" ? "text-red-500" : "text-muted-foreground"
          )} />
          <p className="font-medium text-sm">SHORT</p>
          <p className="text-xs text-muted-foreground">Только продажи</p>
        </button>
        
        <button
          type="button"
          onClick={() => updateConfig("directionFilter", "BOTH")}
          className={cn(
            "p-3 rounded-lg border text-center transition-colors",
            config.directionFilter === "BOTH"
              ? "border-primary bg-primary/10"
              : "border-border hover:bg-secondary/50"
          )}
        >
          <ArrowUpDown className={cn(
            "h-5 w-5 mx-auto mb-1",
            config.directionFilter === "BOTH" ? "text-primary" : "text-muted-foreground"
          )} />
          <p className="font-medium text-sm">BOTH</p>
          <p className="text-xs text-muted-foreground">Оба направления</p>
        </button>
      </div>
      
      <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
        <p className="text-xs text-blue-600 dark:text-blue-400">
          💡 <strong>Подсказка:</strong> {
            config.directionFilter === "LONG" 
              ? "Будут исполняться только сигналы на покупку (LONG)."
              : config.directionFilter === "SHORT"
              ? "Будут исполняться только сигналы на продажу (SHORT)."
              : "Будут исполняться все сигналы независимо от направления."
          }
        </p>
      </div>
    </div>
  );
}

// ==================== TRAILING ENTRY SECTION ====================

interface TrailingEntrySectionProps {
  config: ExtendedBotConfig;
  updateConfig: <K extends keyof ExtendedBotConfig>(key: K, value: ExtendedBotConfig[K]) => void;
}

export function TrailingEntrySection({ config, updateConfig }: TrailingEntrySectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Trailing Entry (Trailing Buy)</Label>
          <p className="text-xs text-muted-foreground mt-0.5">
            Отложенный вход с трейлингом цены
          </p>
        </div>
        <Switch
          checked={config.trailingEntryEnabled}
          onCheckedChange={(v) => updateConfig("trailingEntryEnabled", v)}
        />
      </div>
      
      {config.trailingEntryEnabled && (
        <>
          <div className="space-y-3 p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Trail Distance %</Label>
              <Badge variant="outline">{config.trailingEntryPercent}%</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Расстояние трейлинга за ценой (для LONG - ниже цены, для SHORT - выше)
            </p>
            <div className="flex items-center gap-4">
              <Slider
                value={[config.trailingEntryPercent]}
                onValueChange={([v]) => updateConfig("trailingEntryPercent", v)}
                max={10}
                min={0.1}
                step={0.1}
                className="flex-1"
              />
              <Input
                type="number"
                value={config.trailingEntryPercent}
                onChange={(e) => updateConfig("trailingEntryPercent", parseFloat(e.target.value) || 0)}
                className="w-20"
                min={0.1}
                max={10}
                step={0.1}
              />
            </div>
          </div>
          
          <div className="space-y-3 p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Activate Distance %</Label>
              <Badge variant="outline">{config.trailingEntryActivateDist}%</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Активировать трейлинг когда цена в пределах X% от точки входа
            </p>
            <div className="flex items-center gap-4">
              <Slider
                value={[config.trailingEntryActivateDist]}
                onValueChange={([v]) => updateConfig("trailingEntryActivateDist", v)}
                max={5}
                min={0.1}
                step={0.1}
                className="flex-1"
              />
              <Input
                type="number"
                value={config.trailingEntryActivateDist}
                onChange={(e) => updateConfig("trailingEntryActivateDist", parseFloat(e.target.value) || 0)}
                className="w-20"
                min={0.1}
                max={5}
                step={0.1}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div>
              <p className="text-sm font-medium">Only use if not defined by group</p>
              <p className="text-xs text-muted-foreground">
                Использовать только если не определено в сигнале
              </p>
            </div>
            <Switch
              checked={config.trailingEntryOnlyIfNotInGrp}
              onCheckedChange={(v) => updateConfig("trailingEntryOnlyIfNotInGrp", v)}
            />
          </div>
        </>
      )}
    </div>
  );
}

// ==================== TRAILING TP SECTION ====================

interface TrailingTPSectionProps {
  config: ExtendedBotConfig;
  updateConfig: <K extends keyof ExtendedBotConfig>(key: K, value: ExtendedBotConfig[K]) => void;
  leverage?: number; // Current trade leverage for adjustment calculation
}

export function TrailingTPSection({ config, updateConfig, leverage = 1 }: TrailingTPSectionProps) {
  // Calculate effective trailing percent (divided by leverage as per Cornix)
  const effectivePercent = leverage > 1 
    ? (config.trailingTPPercent / leverage).toFixed(3)
    : config.trailingTPPercent.toFixed(1);
  
  return (
    <div className="space-y-4">
      {/* Header with description */}
      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
        <div className="flex items-start gap-2">
          <Target className="h-4 w-4 text-emerald-500 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Trailing Take-Profit (Trailing Sell)
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              После достижения TP ордера создаётся trailing order, который следует за ценой 
              и продаёт при откате на указанный %.
            </p>
          </div>
        </div>
      </div>
      
      {/* Enable Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Включить Trailing TP</Label>
          <p className="text-xs text-muted-foreground mt-0.5">
            Активировать трейлинг для Take-Profit ордеров
          </p>
        </div>
        <Switch
          checked={config.trailingTPEnabled}
          onCheckedChange={(v) => updateConfig("trailingTPEnabled", v)}
        />
      </div>
      
      {config.trailingTPEnabled && (
        <>
          {/* Trail Distance % */}
          <div className="space-y-3 p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Trail Distance %</Label>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{config.trailingTPPercent}%</Badge>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Расстояние трейлинга за максимальной ценой (для LONG - ниже макс.цены, для SHORT - выше мин.цены)
            </p>
            <div className="flex items-center gap-4">
              <Slider
                value={[config.trailingTPPercent]}
                onValueChange={([v]) => updateConfig("trailingTPPercent", v)}
                max={20}
                min={0.1}
                step={0.1}
                className="flex-1"
              />
              <Input
                type="number"
                value={config.trailingTPPercent}
                onChange={(e) => updateConfig("trailingTPPercent", parseFloat(e.target.value) || 1)}
                className="w-20"
                min={0.1}
                max={20}
                step={0.1}
              />
            </div>
          </div>
          
          {/* Leverage Adjustment Info */}
          {leverage > 1 && (
            <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-start gap-2">
                <Zap className="h-4 w-4 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
                    Leverage Adjustment
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Эффективный trailing % с учётом плеча {leverage}x: <strong>{effectivePercent}%</strong>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    (Cornix автоматически делит % на leverage для сохранения реальной дистанции)
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Activate after TP */}
          <div className="space-y-2 p-3 rounded-lg bg-secondary/50">
            <Label className="text-xs font-medium">Активировать после TP #</Label>
            <p className="text-xs text-muted-foreground">
              Trailing TP активируется после исполнения N-го TP ордера
            </p>
            <Select
              value={config.trailingTPActivateAfterTP.toString()}
              onValueChange={(v) => updateConfig("trailingTPActivateAfterTP", parseInt(v))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <SelectItem key={n} value={n.toString()}>
                    После TP #{n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Only use if not defined by group */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div>
              <p className="text-sm font-medium">Only use if not defined by group</p>
              <p className="text-xs text-muted-foreground">
                Использовать только если не определено в сигнале канала
              </p>
            </div>
            <Switch
              checked={config.trailingTPOnlyIfNotInGrp}
              onCheckedChange={(v) => updateConfig("trailingTPOnlyIfNotInGrp", v)}
            />
          </div>
          
          {/* How it works */}
          <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
            <p className="text-xs text-blue-600 dark:text-blue-400">
              💡 <strong>Как работает:</strong> Когда цена достигает TP ордера, вместо немедленной продажи 
              создаётся trailing order. Если цена продолжает расти (LONG), trailing следует за ней. 
              При откате на указанный % от максимальной цены происходит продажа.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

// ==================== MOVING TP SECTION ====================

interface MovingTPSectionProps {
  config: ExtendedBotConfig;
  updateConfig: <K extends keyof ExtendedBotConfig>(key: K, value: ExtendedBotConfig[K]) => void;
}

export function MovingTPSection({ config, updateConfig }: MovingTPSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Moving Take-Profit</Label>
          <p className="text-xs text-muted-foreground mt-0.5">
            Динамическая корректировка TP при усреднении позиции
          </p>
        </div>
        <Switch
          checked={config.movingTPEnabled}
          onCheckedChange={(v) => updateConfig("movingTPEnabled", v)}
        />
      </div>
      
      {config.movingTPEnabled && (
        <>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Baseline</Label>
            <p className="text-xs text-muted-foreground">
              Базовая цена для расчёта расстояния до TP
            </p>
            <Select
              value={config.movingTPBaseline}
              onValueChange={(v) => updateConfig("movingTPBaseline", v as "AVERAGE_ENTRIES" | "FIRST_ENTRY")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AVERAGE_ENTRIES">
                  Average Entries (Средняя цена входа)
                </SelectItem>
                <SelectItem value="FIRST_ENTRY">
                  First Entry (Цена первого входа)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div>
              <p className="text-sm font-medium">Only use if not defined by group</p>
              <p className="text-xs text-muted-foreground">
                Использовать только если не определено в сигнале
              </p>
            </div>
            <Switch
              checked={config.movingTPOnlyIfNotInGrp}
              onCheckedChange={(v) => updateConfig("movingTPOnlyIfNotInGrp", v)}
            />
          </div>
          
          <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
            <p className="text-xs text-green-600 dark:text-green-400">
              💡 <strong>Как работает:</strong> При DCA-усреднении позиции TP цели автоматически 
              пересчитываются относительно выбранной базовой цены, сохраняя пропорции расстояний.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

// ==================== LIMIT PRICE REDUCTION SECTION ====================

interface LimitPriceReductionSectionProps {
  config: ExtendedBotConfig;
  updateConfig: <K extends keyof ExtendedBotConfig>(key: K, value: ExtendedBotConfig[K]) => void;
}

export function LimitPriceReductionSection({ config, updateConfig }: LimitPriceReductionSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Limit Price Reduction</Label>
          <p className="text-xs text-muted-foreground mt-0.5">
            Снижение цены лимитного ордера для увеличения шанса исполнения
          </p>
        </div>
        <Switch
          checked={config.limitPriceReductionEnabled}
          onCheckedChange={(v) => updateConfig("limitPriceReductionEnabled", v)}
        />
      </div>
      
      {config.limitPriceReductionEnabled && (
        <div className="space-y-3 p-3 rounded-lg bg-secondary/50">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium">Max Reduction %</Label>
            <Badge variant="outline">{config.limitPriceReductionPercent}%</Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Максимальное снижение цены от оригинальной
          </p>
          <div className="flex items-center gap-4">
            <Slider
              value={[config.limitPriceReductionPercent]}
              onValueChange={([v]) => updateConfig("limitPriceReductionPercent", v)}
              max={5}
              min={0.01}
              step={0.01}
              className="flex-1"
            />
            <Input
              type="number"
              value={config.limitPriceReductionPercent}
              onChange={(e) => updateConfig("limitPriceReductionPercent", parseFloat(e.target.value) || 0)}
              className="w-20"
              min={0.01}
              max={5}
              step={0.01}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== OPERATION HOURS SECTION ====================

interface OperationHoursSectionProps {
  config: ExtendedBotConfig;
  updateConfig: <K extends keyof ExtendedBotConfig>(key: K, value: ExtendedBotConfig[K]) => void;
}

export function OperationHoursSection({ config, updateConfig }: OperationHoursSectionProps) {
  const days = [
    { id: 1, name: "Пн" },
    { id: 2, name: "Вт" },
    { id: 3, name: "Ср" },
    { id: 4, name: "Чт" },
    { id: 5, name: "Пт" },
    { id: 6, name: "Сб" },
    { id: 7, name: "Вс" },
  ];
  
  const toggleDay = (dayId: number) => {
    const currentDays = config.operationHoursDays;
    const newDays = currentDays.includes(dayId)
      ? currentDays.filter((d) => d !== dayId)
      : [...currentDays, dayId].sort();
    updateConfig("operationHoursDays", newDays);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Часы работы</Label>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ограничение времени торговли
          </p>
        </div>
        <Switch
          checked={config.operationHoursEnabled}
          onCheckedChange={(v) => updateConfig("operationHoursEnabled", v)}
        />
      </div>
      
      {config.operationHoursEnabled && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Начало (час)</Label>
              <Select
                value={config.operationHoursStart.toString()}
                onValueChange={(v) => updateConfig("operationHoursStart", parseInt(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 25 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i.toString().padStart(2, "0")}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium">Конец (час)</Label>
              <Select
                value={config.operationHoursEnd.toString()}
                onValueChange={(v) => updateConfig("operationHoursEnd", parseInt(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 25 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i.toString().padStart(2, "0")}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs font-medium">Дни недели</Label>
            <div className="flex gap-1">
              {days.map((day) => (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => toggleDay(day.id)}
                  className={cn(
                    "flex-1 py-2 rounded-lg border text-xs font-medium transition-colors",
                    config.operationHoursDays.includes(day.id)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-secondary/50"
                  )}
                >
                  {day.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ==================== SIGNAL BEHAVIOR SECTION ====================

interface SignalBehaviorSectionProps {
  config: ExtendedBotConfig;
  updateConfig: <K extends keyof ExtendedBotConfig>(key: K, value: ExtendedBotConfig[K]) => void;
}

export function SignalBehaviorSection({ config, updateConfig }: SignalBehaviorSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">При отмене сигнала</Label>
        <p className="text-xs text-muted-foreground">
          Действие при отмене сигнала каналом
        </p>
        <Select
          value={config.onSignalCancel}
          onValueChange={(v) => updateConfig("onSignalCancel", v as "CLOSE" | "KEEP" | "IGNORE")}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CLOSE">
              Закрыть позицию
            </SelectItem>
            <SelectItem value="KEEP">
              Сохранить позицию
            </SelectItem>
            <SelectItem value="IGNORE">
              Игнорировать отмену
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label className="text-sm font-medium">При редактировании сигнала</Label>
        <p className="text-xs text-muted-foreground">
          Действие при редактировании сигнала каналом
        </p>
        <Select
          value={config.onSignalEdit}
          onValueChange={(v) => updateConfig("onSignalEdit", v as "UPDATE" | "KEEP" | "IGNORE")}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="UPDATE">
              Обновить параметры
            </SelectItem>
            <SelectItem value="KEEP">
              Сохранить текущие параметры
            </SelectItem>
            <SelectItem value="IGNORE">
              Игнорировать изменения
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
        <div>
          <p className="text-sm font-medium">Only use if not defined by group</p>
          <p className="text-xs text-muted-foreground">
            Использовать настройки только если не определены в сигнале
          </p>
        </div>
        <Switch
          checked={config.onlyUseIfNotDef}
          onCheckedChange={(v) => updateConfig("onlyUseIfNotDef", v)}
        />
      </div>
    </div>
  );
}

export default {
  DirectionFilterSection,
  TrailingEntrySection,
  TrailingTPSection,
  MovingTPSection,
  LimitPriceReductionSection,
  OperationHoursSection,
  SignalBehaviorSection,
  DEFAULT_EXTENDED_CONFIG,
};
