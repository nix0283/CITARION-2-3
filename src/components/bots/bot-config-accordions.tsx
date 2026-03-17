"use client";

/**
 * Extended Accordion Items for BotConfigForm
 * Cornix-compatible features - new AccordionItem components
 */

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowUpDown,
  TrendingUp,
  Target,
  Zap,
  Clock,
  AlertTriangle,
} from "lucide-react";
import {
  DirectionFilterSection,
  TrailingEntrySection,
  TrailingTPSection,
  MovingTPSection,
  LimitPriceReductionSection,
  OperationHoursSection,
  SignalBehaviorSection,
  type ExtendedBotConfig,
} from "./bot-config-extensions";

// ==================== DIRECTION FILTER ACCORDION ====================

interface DirectionFilterAccordionProps {
  config: ExtendedBotConfig;
  updateConfig: <K extends keyof ExtendedBotConfig>(key: K, value: ExtendedBotConfig[K]) => void;
}

export function DirectionFilterAccordion({ config, updateConfig }: DirectionFilterAccordionProps) {
  return (
    <AccordionItem value="direction" className="border rounded-lg bg-card">
      <AccordionTrigger className="px-4 py-3 hover:no-underline">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-5 w-5 text-primary" />
          <span className="font-medium">Direction Filter (Направление)</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-6 pt-2">
          <DirectionFilterSection config={config} updateConfig={updateConfig} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

// ==================== TRAILING ENTRY ACCORDION ====================

interface TrailingEntryAccordionProps {
  config: ExtendedBotConfig;
  updateConfig: <K extends keyof ExtendedBotConfig>(key: K, value: ExtendedBotConfig[K]) => void;
}

export function TrailingEntryAccordion({ config, updateConfig }: TrailingEntryAccordionProps) {
  return (
    <AccordionItem value="trailing-entry" className="border rounded-lg bg-card">
      <AccordionTrigger className="px-4 py-3 hover:no-underline">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span className="font-medium">Trailing Entry (Отложенный вход)</span>
          {config.trailingEntryEnabled && (
            <span className="ml-2 text-xs text-green-500">●</span>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-6 pt-2">
          <TrailingEntrySection config={config} updateConfig={updateConfig} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

// ==================== TRAILING TP ACCORDION ====================

interface TrailingTPAccordionProps {
  config: ExtendedBotConfig;
  updateConfig: <K extends keyof ExtendedBotConfig>(key: K, value: ExtendedBotConfig[K]) => void;
}

export function TrailingTPAccordion({ config, updateConfig }: TrailingTPAccordionProps) {
  return (
    <AccordionItem value="trailing-tp" className="border rounded-lg bg-card">
      <AccordionTrigger className="px-4 py-3 hover:no-underline">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <span className="font-medium">Trailing Take-Profit</span>
          {config.trailingTPEnabled && (
            <span className="ml-2 text-xs text-green-500">●</span>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-6 pt-2">
          <TrailingTPSection config={config} updateConfig={updateConfig} />
          <Separator />
          <MovingTPSection config={config} updateConfig={updateConfig} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

// ==================== ORDER EXECUTION ACCORDION ====================

interface OrderExecutionAccordionProps {
  config: ExtendedBotConfig;
  updateConfig: <K extends keyof ExtendedBotConfig>(key: K, value: ExtendedBotConfig[K]) => void;
}

export function OrderExecutionAccordion({ config, updateConfig }: OrderExecutionAccordionProps) {
  return (
    <AccordionItem value="order-execution" className="border rounded-lg bg-card">
      <AccordionTrigger className="px-4 py-3 hover:no-underline">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <span className="font-medium">Order Execution (Исполнение)</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-6 pt-2">
          <LimitPriceReductionSection config={config} updateConfig={updateConfig} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

// ==================== OPERATION HOURS ACCORDION ====================

interface OperationHoursAccordionProps {
  config: ExtendedBotConfig;
  updateConfig: <K extends keyof ExtendedBotConfig>(key: K, value: ExtendedBotConfig[K]) => void;
}

export function OperationHoursAccordion({ config, updateConfig }: OperationHoursAccordionProps) {
  return (
    <AccordionItem value="operation-hours" className="border rounded-lg bg-card">
      <AccordionTrigger className="px-4 py-3 hover:no-underline">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <span className="font-medium">Operation Hours (Часы работы)</span>
          {config.operationHoursEnabled && (
            <span className="ml-2 text-xs text-green-500">●</span>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-6 pt-2">
          <OperationHoursSection config={config} updateConfig={updateConfig} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

// ==================== SIGNAL BEHAVIOR ACCORDION ====================

interface SignalBehaviorAccordionProps {
  config: ExtendedBotConfig;
  updateConfig: <K extends keyof ExtendedBotConfig>(key: K, value: ExtendedBotConfig[K]) => void;
}

export function SignalBehaviorAccordion({ config, updateConfig }: SignalBehaviorAccordionProps) {
  return (
    <AccordionItem value="signal-behavior" className="border rounded-lg bg-card">
      <AccordionTrigger className="px-4 py-3 hover:no-underline">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary" />
          <span className="font-medium">Signal Behavior (Поведение)</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-6 pt-2">
          <SignalBehaviorSection config={config} updateConfig={updateConfig} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

// ==================== EXPORT ALL ====================

export const ExtendedAccordions = {
  DirectionFilterAccordion,
  TrailingEntryAccordion,
  TrailingTPAccordion,
  OrderExecutionAccordion,
  OperationHoursAccordion,
  SignalBehaviorAccordion,
};

export default ExtendedAccordions;
