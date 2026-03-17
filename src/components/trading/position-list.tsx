"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  RefreshCw,
  Activity,
  AlertTriangle,
  Target,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TradingPosition } from "@/hooks/use-positions";
import { getPnlColorClass, formatPnlPercent } from "@/hooks/use-positions";
import type { TradingMode, MarketType } from "@/hooks/use-accounts";
import { getExchangeDisplayName, getExchangeBadgeColor } from "@/hooks/use-accounts";

interface PositionListProps {
  positions: TradingPosition[];
  isLoading: boolean;
  mode: TradingMode;
  marketType: MarketType;
  onPositionClick: (position: TradingPosition) => void;
}

export function PositionList({
  positions,
  isLoading,
  mode,
  marketType,
  onPositionClick,
}: PositionListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDirection, setFilterDirection] = useState<"all" | "LONG" | "SHORT">("all");
  
  // Filter positions
  const filteredPositions = useMemo(() => {
    let filtered = positions;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p => p.symbol.toLowerCase().includes(query) || p.exchangeId.toLowerCase().includes(query)
      );
    }
    
    // Direction filter
    if (filterDirection !== "all") {
      filtered = filtered.filter(p => p.direction === filterDirection);
    }
    
    return filtered;
  }, [positions, searchQuery, filterDirection]);
  
  // Calculate totals
  const totalPnl = positions.reduce((sum, p) => sum + (p.unrealizedPnl ?? 0), 0);
  const longCount = positions.filter(p => p.direction === "LONG").length;
  const shortCount = positions.filter(p => p.direction === "SHORT").length;
  
  // Calculate PnL percentage
  const calculatePnlPercent = (position: TradingPosition): number => {
    if (!position.avgEntryPrice || !position.currentPrice) return 0;
    const priceChange = position.direction === "LONG"
      ? (position.currentPrice - position.avgEntryPrice) / position.avgEntryPrice
      : (position.avgEntryPrice - position.currentPrice) / position.avgEntryPrice;
    return priceChange * 100 * position.leverage;
  };
  
  // Render position row
  const renderPosition = (position: TradingPosition) => {
    const pnlPercent = calculatePnlPercent(position);
    const unrealizedPnl = position.unrealizedPnl ?? 0;
    const isProfit = unrealizedPnl >= 0;
    
    return (
      <button
        key={position.id}
        className="w-full text-left p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
        onClick={() => onPositionClick(position)}
      >
        {/* Header Row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={cn("text-[10px] h-5", getExchangeBadgeColor(position.exchangeId))}
            >
              {getExchangeDisplayName(position.exchangeId)}
            </Badge>
            <span className="font-medium text-sm">{position.symbol}</span>
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] h-5",
                position.direction === "LONG"
                  ? "text-[#0ECB81] border-[#0ECB81]/30"
                  : "text-[#F6465D] border-[#F6465D]/30"
              )}
            >
              {position.direction}
            </Badge>
            <span className="text-xs text-muted-foreground">{position.leverage}x</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        {/* Price Row */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <div className="flex items-center gap-3">
            <span>Entry: <span className="font-mono text-foreground">${position.avgEntryPrice.toFixed(2)}</span></span>
            <span>Mark: <span className="font-mono text-foreground">${(position.currentPrice || 0).toFixed(2)}</span></span>
          </div>
        </div>
        
        {/* PnL Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {(position.stopLoss || position.takeProfit) && (
              <div className="flex items-center gap-1">
                {position.stopLoss && (
                  <Badge variant="outline" className="text-[10px] h-5 text-[#F6465D] border-[#F6465D]/30">
                    <AlertTriangle className="h-3 w-3 mr-0.5" />
                    SL
                  </Badge>
                )}
                {position.takeProfit && (
                  <Badge variant="outline" className="text-[10px] h-5 text-[#0ECB81] border-[#0ECB81]/30">
                    <Target className="h-3 w-3 mr-0.5" />
                    TP
                  </Badge>
                )}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className={cn("font-mono font-medium", getPnlColorClass(unrealizedPnl))}>
              {unrealizedPnl >= 0 ? "+" : ""}${unrealizedPnl.toFixed(2)}
            </div>
            <div className={cn("text-[10px] font-mono", getPnlColorClass(pnlPercent))}>
              {formatPnlPercent(pnlPercent)}
            </div>
          </div>
        </div>
      </button>
    );
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Open Positions</CardTitle>
            <Badge variant="outline" className="text-xs">
              {positions.length}
            </Badge>
          </div>
          {isLoading && (
            <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
        
        {/* Summary */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-[#0ECB81]" />
            <span>{longCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingDown className="h-3 w-3 text-[#F6465D]" />
            <span>{shortCount}</span>
          </div>
          <Separator className="h-4 mx-1" orientation="vertical" />
          <div className={cn("font-mono", getPnlColorClass(totalPnl))}>
            {totalPnl >= 0 ? "+" : ""}${totalPnl.toFixed(2)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-3 overflow-hidden p-4 pt-0">
        {/* Search and Filter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search positions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <div className="flex items-center bg-muted/50 rounded-md p-0.5">
            {(["all", "LONG", "SHORT"] as const).map((dir) => (
              <Button
                key={dir}
                variant="ghost"
                size="sm"
                className={cn(
                  "h-7 text-xs px-2",
                  filterDirection === dir && "bg-background shadow-sm"
                )}
                onClick={() => setFilterDirection(dir)}
              >
                {dir === "all" ? "All" : dir}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Position List */}
        <ScrollArea className="flex-1 -mx-4 px-4">
          {filteredPositions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Activity className="h-10 w-10 text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground">No open positions</p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                {searchQuery || filterDirection !== "all"
                  ? "Try adjusting your filters"
                  : "Open a position to see it here"}
              </p>
            </div>
          ) : (
            <div className="space-y-2 pb-4">
              {filteredPositions.map(renderPosition)}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

// Separator component (simple inline version)
function Separator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("bg-border", className)} {...props} />;
}
