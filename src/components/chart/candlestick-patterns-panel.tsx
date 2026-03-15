"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronUp,
  CandlestickChart,
  Settings2,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  scanCandlestickPatterns,
  type PatternResult,
  type PatternScannerResult,
  type PatternType,
} from "@/lib/wolfbot/candlestick-patterns";
import type { Candle } from "@/lib/indicators/calculator";

// Pattern type configuration
const PATTERN_CONFIG: Record<PatternType, { color: string; icon: typeof TrendingUp; label: string }> = {
  bullish: { color: '#26A69A', icon: TrendingUp, label: 'Бычий' },
  bearish: { color: '#EF5350', icon: TrendingDown, label: 'Медвежий' },
  neutral: { color: '#FFD700', icon: Minus, label: 'Нейтральный' },
  continuation: { color: '#2962FF', icon: TrendingUp, label: 'Продолжение' },
};

// Pattern marker for chart display
export interface PatternMarker {
  time: number;
  position: 'aboveBar' | 'belowBar';
  color: string;
  shape: 'arrowUp' | 'arrowDown' | 'circle';
  text: string;
  pattern: PatternResult;
}

interface CandlestickPatternsPanelProps {
  candles: Candle[];
  onPatternsDetected?: (result: PatternScannerResult) => void;
  onMarkersChange?: (markers: PatternMarker[]) => void;
  showMarkers?: boolean;
  minConfidence?: number;
}

export function CandlestickPatternsPanel({
  candles,
  onPatternsDetected,
  onMarkersChange,
  showMarkers = true,
  minConfidence = 0.5,
}: CandlestickPatternsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAllPatterns, setShowAllPatterns] = useState(false);
  const [filterType, setFilterType] = useState<PatternType | 'all'>('all');

  // Scan for patterns
  const scanResult = useMemo<PatternScannerResult>(() => {
    if (!candles || candles.length < 3) {
      return { patterns: [], strongestPattern: null, overallSignal: 'hold', confidence: 0 };
    }
    return scanCandlestickPatterns(candles);
  }, [candles]);

  // Filter patterns by type and confidence
  const filteredPatterns = useMemo(() => {
    let patterns = scanResult.patterns;

    // Filter by confidence
    patterns = patterns.filter(p => p.confidence >= minConfidence);

    // Filter by type
    if (filterType !== 'all') {
      patterns = patterns.filter(p => p.type === filterType);
    }

    // Sort by confidence
    patterns = [...patterns].sort((a, b) => b.confidence - a.confidence);

    // Limit display
    if (!showAllPatterns) {
      patterns = patterns.slice(0, 10);
    }

    return patterns;
  }, [scanResult.patterns, filterType, minConfidence, showAllPatterns]);

  // Generate chart markers
  const markers = useMemo<PatternMarker[]>(() => {
    if (!showMarkers || candles.length === 0) return [];

    const lastCandle = candles[candles.length - 1];
    const markerPatterns = scanResult.patterns
      .filter(p => p.confidence >= minConfidence)
      .slice(0, 5); // Limit markers

    return markerPatterns.map((pattern, idx) => ({
      time: lastCandle.time,
      position: pattern.type === 'bullish' ? 'belowBar' : 'aboveBar',
      color: PATTERN_CONFIG[pattern.type].color,
      shape: pattern.type === 'bullish' ? 'arrowUp' as const : pattern.type === 'bearish' ? 'arrowDown' as const : 'circle' as const,
      text: pattern.name.substring(0, 3),
      pattern,
    }));
  }, [showMarkers, candles, scanResult.patterns, minConfidence]);

  // Notify parent of patterns and markers
  useCallback(() => {
    onPatternsDetected?.(scanResult);
    onMarkersChange?.(markers);
  }, [scanResult, markers, onPatternsDetected, onMarkersChange]);

  // Pattern counts
  const patternCounts = useMemo(() => {
    const counts: Record<PatternType, number> = {
      bullish: 0,
      bearish: 0,
      neutral: 0,
      continuation: 0,
    };

    scanResult.patterns.forEach(p => {
      counts[p.type]++;
    });

    return counts;
  }, [scanResult.patterns]);

  // Signal icon
  const SignalIcon = scanResult.overallSignal === 'buy'
    ? TrendingUp
    : scanResult.overallSignal === 'sell'
      ? TrendingDown
      : Minus;

  const signalColor = scanResult.overallSignal === 'buy'
    ? 'text-green-500'
    : scanResult.overallSignal === 'sell'
      ? 'text-red-500'
      : 'text-yellow-500';

  return (
    <div className="bg-card border border-border rounded-lg">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between p-3 hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-2">
              <CandlestickChart className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Свечные паттерны</span>
              {scanResult.patterns.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {scanResult.patterns.length}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {scanResult.strongestPattern && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{ borderColor: PATTERN_CONFIG[scanResult.strongestPattern.type].color }}
                      >
                        {scanResult.strongestPattern.name}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{scanResult.strongestPattern.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Уверенность: {(scanResult.strongestPattern.confidence * 100).toFixed(0)}%
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="border-t border-border p-3 space-y-4">
            {/* Overall Signal */}
            <div className="flex items-center justify-between p-2 rounded bg-muted/30">
              <div className="flex items-center gap-2">
                <SignalIcon className={cn("h-5 w-5", signalColor)} />
                <div>
                  <div className="text-sm font-medium">
                    {scanResult.overallSignal === 'buy'
                      ? 'Покупать'
                      : scanResult.overallSignal === 'sell'
                        ? 'Продавать'
                        : 'Держать'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Уверенность: {(scanResult.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                {Object.entries(patternCounts).map(([type, count]) => (
                  count > 0 && (
                    <Badge
                      key={type}
                      variant="secondary"
                      className="text-xs"
                      style={{ backgroundColor: `${PATTERN_CONFIG[type as PatternType].color}20` }}
                    >
                      {count} {PATTERN_CONFIG[type as PatternType].label.toLowerCase().slice(0, 3)}
                    </Badge>
                  )
                ))}
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setFilterType('all')}
              >
                Все
              </Button>
              {(['bullish', 'bearish', 'neutral'] as PatternType[]).map((type) => {
                const IconComponent = PATTERN_CONFIG[type].icon;
                return (
                  <Button
                    key={type}
                    variant={filterType === type ? 'default' : 'outline'}
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => setFilterType(type)}
                    style={filterType === type ? { backgroundColor: PATTERN_CONFIG[type].color } : {}}
                  >
                    <IconComponent className="h-3 w-3 mr-1" />
                    {PATTERN_CONFIG[type].label}
                  </Button>
                );
              })}
            </div>

            {/* Show Markers Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Показывать маркеры</span>
              <Switch
                checked={showMarkers}
                onCheckedChange={(checked) => {
                  // This would need to propagate to parent
                }}
                className="data-[state=checked]:bg-primary"
              />
            </div>

            {/* Patterns List */}
            <ScrollArea className="max-h-64">
              <div className="space-y-2">
                {filteredPatterns.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground py-4">
                    Нет паттернов с уверенность ≥ {(minConfidence * 100).toFixed(0)}%
                  </div>
                ) : (
                  filteredPatterns.map((pattern, idx) => {
                    const config = PATTERN_CONFIG[pattern.type];
                    const Icon = config.icon;

                    return (
                      <div
                        key={`${pattern.name}-${idx}`}
                        className="flex items-center justify-between p-2 rounded bg-muted/20 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: config.color }}
                          />
                          <Icon className="h-3 w-3" style={{ color: config.color }} />
                          <div>
                            <div className="text-sm font-medium">{pattern.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {pattern.description}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-xs"
                            style={{ borderColor: config.color, color: config.color }}
                          >
                            {(pattern.confidence * 100).toFixed(0)}%
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {pattern.candles} св.
                          </Badge>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </ScrollArea>

            {/* Show All Toggle */}
            {scanResult.patterns.length > 10 && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full h-8 text-xs"
                onClick={() => setShowAllPatterns(!showAllPatterns)}
              >
                {showAllPatterns ? (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" />
                    Показать меньше
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" />
                    Показать все ({scanResult.patterns.length})
                  </>
                )}
              </Button>
            )}

            {/* Settings */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Settings2 className="h-3 w-3" />
              <span>Мин. уверенность: {(minConfidence * 100).toFixed(0)}%</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

// Export utility to create markers for chart
export function createPatternMarkers(
  candles: Candle[],
  patterns: PatternResult[],
  minConfidence: number = 0.5
): PatternMarker[] {
  if (!candles || candles.length === 0) return [];

  const lastCandle = candles[candles.length - 1];
  const significantPatterns = patterns
    .filter(p => p.confidence >= minConfidence)
    .slice(0, 5);

  return significantPatterns.map((pattern) => ({
    time: lastCandle.time,
    position: pattern.type === 'bullish' ? 'belowBar' as const : 'aboveBar' as const,
    color: PATTERN_CONFIG[pattern.type].color,
    shape: pattern.type === 'bullish'
      ? 'arrowUp' as const
      : pattern.type === 'bearish'
        ? 'arrowDown' as const
        : 'circle' as const,
    text: pattern.name.substring(0, 3),
    pattern,
  }));
}

export default CandlestickPatternsPanel;
