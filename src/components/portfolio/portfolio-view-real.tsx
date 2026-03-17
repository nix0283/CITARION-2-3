/**
 * Portfolio View Component
 * 
 * Production-ready portfolio dashboard with real-time balance fetching,
 * caching, and multi-exchange support.
 * 
 * Features:
 * - Real-time balance updates from all connected exchanges
 * - Manual refresh capability with loading states
 * - Error handling with retry options
 * - Responsive grid layout
 * - DEMO/REAL/TESTNET account type indicators
 * - Asset breakdown per exchange
 * 
 * @author CITARION Team
 * @version 1.0.0
 */

"use client";

import { useState, useMemo } from "react";
import { usePortfolioBalances } from "@/hooks/use-portfolio-balances";
import { cn } from "@/lib/utils";
import {
  Building2,
  RefreshCw,
  Clock,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle2,
  Wifi,
  WifiOff,
  FlaskConical,
  TestTube,
  ChevronDown,
  ChevronUp,
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { ExchangeBalance, AssetBalance } from "@/hooks/use-portfolio-balances";

// ==================== HELPERS ====================

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const formatPercent = (value: number) =>
  `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
};

// ==================== SUB-COMPONENTS ====================

interface ExchangeCardProps {
  balance: ExchangeBalance;
  expanded: boolean;
  onToggle: () => void;
}

function ExchangeCard({ balance, expanded, onToggle }: ExchangeCardProps) {
  const statusColor = 
    balance.apiStatus === "connected" ? "text-[#0ECB81]" :
    balance.apiStatus === "rate_limited" ? "text-[#F0B90B]" :
    "text-[#F6465D]";
  
  const StatusIcon = 
    balance.apiStatus === "connected" ? CheckCircle2 :
    balance.apiStatus === "rate_limited" ? AlertCircle :
    WifiOff;
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200",
      balance.error && "border-[#F6465D]/30"
    )}>
      <CardHeader className="pb-2 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">{balance.exchangeName}</CardTitle>
            {balance.isTestnet && (
              <Badge variant="outline" className="text-[10px] text-purple-500 border-purple-500/30">
                <TestTube className="h-3 w-3 mr-1" />
                TESTNET
              </Badge>
            )}
            {balance.accountType === "DEMO" && (
              <Badge variant="outline" className="text-[10px] text-blue-500 border-blue-500/30">
                <FlaskConical className="h-3 w-3 mr-1" />
                DEMO
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <StatusIcon className={cn("h-4 w-4", statusColor)} />
            {balance.error && (
              <Badge variant="destructive" className="text-[10px]">
                Error
              </Badge>
            )}
          </div>
        </div>
        {balance.error && (
          <CardDescription className="text-[#F6465D] text-xs">
            {balance.error}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="p-4 space-y-3">
        {/* Balance Overview */}
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Total Balance</div>
            <div className="text-xl font-bold">{formatCurrency(balance.totalBalanceUSDT)}</div>
          </div>
          <div className="text-right">
            <div className={cn(
              "text-sm font-medium flex items-center gap-1",
              balance.unrealizedPnl >= 0 ? "text-[#0ECB81]" : "text-[#F6465D]"
            )}>
              {balance.unrealizedPnl >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {formatCurrency(balance.unrealizedPnl)}
            </div>
            <div className={cn(
              "text-xs",
              balance.todayPnlPercent >= 0 ? "text-[#0ECB81]" : "text-[#F6465D]"
            )}>
              {formatPercent(balance.todayPnlPercent)}
            </div>
          </div>
        </div>
        
        {/* Balance Breakdown */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-2 rounded bg-muted/30">
            <div className="text-muted-foreground">Available</div>
            <div className="font-medium">{formatCurrency(balance.availableUSDT)}</div>
          </div>
          <div className="p-2 rounded bg-muted/30">
            <div className="text-muted-foreground">In Orders</div>
            <div className="font-medium">{formatCurrency(balance.inOrderUSDT)}</div>
          </div>
          <div className="p-2 rounded bg-muted/30">
            <div className="text-muted-foreground">In Positions</div>
            <div className="font-medium">{formatCurrency(balance.inPositionUSDT)}</div>
          </div>
        </div>
        
        {/* Assets Section */}
        {balance.assets.length > 0 && (
          <div className="space-y-1">
            <button
              onClick={onToggle}
              className="flex items-center justify-between w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Assets ({balance.assets.length})</span>
              {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
            
            {expanded && (
              <ScrollArea className="h-[200px] pr-2">
                <div className="space-y-1">
                  {balance.assets
                    .sort((a, b) => b.valueUSDT - a.valueUSDT)
                    .map((asset) => (
                      <AssetRow key={asset.symbol} asset={asset} />
                    ))}
                </div>
              </ScrollArea>
            )}
          </div>
        )}
        
        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Sync: {formatTimeAgo(new Date(balance.lastSync))}</span>
          </div>
          <div className="flex items-center gap-1">
            {balance.marketType === "futures" ? (
              <Badge variant="outline" className="text-[10px]">FUTURES</Badge>
            ) : (
              <Badge variant="outline" className="text-[10px]">SPOT</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface AssetRowProps {
  asset: AssetBalance;
}

function AssetRow({ asset }: AssetRowProps) {
  return (
    <div className="flex items-center justify-between p-1.5 rounded hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold">
          {asset.symbol.slice(0, 2)}
        </div>
        <div>
          <div className="font-medium text-xs">{asset.symbol}</div>
          <div className="text-[10px] text-muted-foreground">{asset.name}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium text-xs">{formatCurrency(asset.valueUSDT)}</div>
        <div className="flex items-center justify-end gap-1 text-[10px]">
          <span className="text-muted-foreground">{asset.total.toFixed(4)}</span>
          <span className={cn(
            asset.change24h >= 0 ? "text-[#0ECB81]" : "text-[#F6465D]"
          )}>
            {formatPercent(asset.change24h)}
          </span>
        </div>
      </div>
    </div>
  );
}

interface LoadingSkeletonProps {
  count: number;
}

function LoadingSkeleton({ count }: LoadingSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-5 w-24" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <div className="space-y-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-7 w-24" />
              </div>
              <div className="space-y-1 text-right">
                <Skeleton className="h-4 w-16 ml-auto" />
                <Skeleton className="h-3 w-12 ml-auto" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((j) => (
                <Skeleton key={j} className="h-14 rounded" />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface EmptyStateProps {
  onConnect: () => void;
}

function EmptyState({ onConnect }: EmptyStateProps) {
  return (
    <Card className="flex flex-col items-center justify-center p-8 text-center">
      <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
      <CardTitle className="mb-2">No Connected Exchanges</CardTitle>
      <CardDescription className="mb-4">
        Connect your exchange accounts to view your portfolio balances
      </CardDescription>
      <Button onClick={onConnect}>
        Connect Exchange
      </Button>
    </Card>
  );
}

// ==================== MAIN COMPONENT ====================

interface PortfolioViewRealProps {
  onConnectExchange?: () => void;
}

export function PortfolioViewReal({ onConnectExchange }: PortfolioViewRealProps) {
  const [selectedExchange, setSelectedExchange] = useState<string>("all");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  
  const {
    balances,
    summary,
    isLoading,
    error,
    isCached,
    lastUpdated,
    refresh,
    forceRefresh,
    isRefreshing,
    connectedCount,
    errorCount,
    totalBalance,
    totalPnL,
  } = usePortfolioBalances({
    enabled: true,
    refreshInterval: 60000, // 1 minute
    onError: (err) => {
      console.error("[Portfolio] Error loading balances:", err);
    },
  });
  
  // Filter balances
  const filteredBalances = useMemo(() => {
    if (selectedExchange === "all") return balances;
    return balances.filter((b) => b.exchange === selectedExchange);
  }, [balances, selectedExchange]);
  
  // Exchange list for dropdown
  const exchangeList = useMemo(() => 
    [...new Set(balances.map((b) => b.exchange))],
    [balances]
  );
  
  // Toggle card expansion
  const toggleExpanded = (exchange: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(exchange)) {
        next.delete(exchange);
      } else {
        next.add(exchange);
      }
      return next;
    });
  };
  
  // Loading state
  if (isLoading && balances.length === 0) {
    return (
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
          <Skeleton className="h-8 w-32" />
        </div>
        <LoadingSkeleton count={4} />
      </div>
    );
  }
  
  // Empty state
  if (!isLoading && balances.length === 0) {
    return (
      <EmptyState onConnect={() => onConnectExchange?.()} />
    );
  }
  
  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Portfolio Overview</h2>
            {isCached && (
              <Badge variant="outline" className="text-[10px] text-muted-foreground">
                <Wifi className="h-3 w-3 mr-1" />
                Cached
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Total: <span className="font-semibold">{formatCurrency(totalBalance)}</span>
            {" • "}
            Unrealized PnL:{" "}
            <span className={totalPnL >= 0 ? "text-[#0ECB81]" : "text-[#F6465D]"}>
              {formatCurrency(totalPnL)}
            </span>
            {lastUpdated && (
              <span className="ml-2 text-xs">
                (Updated {formatTimeAgo(lastUpdated)})
              </span>
            )}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Exchange Filter */}
          <Select value={selectedExchange} onValueChange={setSelectedExchange}>
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue placeholder="Exchange" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Exchanges</SelectItem>
              {exchangeList.map((exchange) => (
                <SelectItem key={exchange} value={exchange}>
                  {exchange.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => forceRefresh()}
            disabled={isRefreshing}
            className="h-8"
          >
            <RefreshCw className={cn("h-4 w-4 mr-1", isRefreshing && "animate-spin")} />
            {isRefreshing ? "Syncing..." : "Refresh"}
          </Button>
        </div>
      </div>
      
      {/* Error Banner */}
      {error && (
        <Card className="border-[#F6465D]/30 bg-[#F6465D]/5">
          <CardContent className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2 text-[#F6465D]">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error.message}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => refresh()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* Summary Stats */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="p-2 rounded bg-muted/30">
            <div className="text-muted-foreground">Connected</div>
            <div className="font-semibold text-[#0ECB81]">{connectedCount}</div>
          </div>
          <div className="p-2 rounded bg-muted/30">
            <div className="text-muted-foreground">Available</div>
            <div className="font-semibold">{formatCurrency(summary.totalAvailableUSDT)}</div>
          </div>
          <div className="p-2 rounded bg-muted/30">
            <div className="text-muted-foreground">In Positions</div>
            <div className="font-semibold">{formatCurrency(summary.totalInPosition)}</div>
          </div>
          <div className="p-2 rounded bg-muted/30">
            <div className="text-muted-foreground">Errors</div>
            <div className={cn("font-semibold", errorCount > 0 ? "text-[#F6465D]" : "text-muted-foreground")}>
              {errorCount}
            </div>
          </div>
        </div>
      )}
      
      {/* Exchange Cards Grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pb-4">
          {filteredBalances.map((balance) => (
            <ExchangeCard
              key={`${balance.exchange}-${balance.accountType}`}
              balance={balance}
              expanded={expandedCards.has(balance.exchange)}
              onToggle={() => toggleExpanded(balance.exchange)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PortfolioViewReal;
