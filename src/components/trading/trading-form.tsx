"use client";

/**
 * CITARION Trading Terminal
 * 
 * UI часть Unified Trading Engine
 * Простой торговый терминал в стиле Binance mobile
 * 
 * Режимы: LIVE (red), DEMO (purple), PAPER (blue)
 * Типы: Futures, Spot, Inverse
 */

import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Plus,
  RefreshCw,
  Zap,
  FlaskConical,
  Target,
  Shield,
  Gauge,
  Loader2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import {
  useTradingAccounts,
  useUnifiedPositions,
  openUnifiedPosition,
  getExchangeDisplayName,
  getExchangeBadgeColor,
  type TradingMode,
  type MarketType,
  type Direction,
  type OrderType,
  type Position,
} from "@/hooks/use-unified-trading";
import { PositionDetailModal } from "./position-detail-modal";

// ============================================
// Constants
// ============================================

const MODE_CONFIG: Record<TradingMode, { label: string; color: string; bgColor: string; borderColor: string }> = {
  LIVE: {
    label: "LIVE",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
  },
  DEMO: {
    label: "DEMO",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
  },
  PAPER: {
    label: "PAPER",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
};

const MARKET_TYPES: { value: MarketType; label: string }[] = [
  { value: "FUTURES", label: "Futures" },
  { value: "SPOT", label: "Spot" },
];

const TRADING_PAIRS = [
  "BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT", 
  "DOGEUSDT", "ADAUSDT", "AVAXUSDT", "MATICUSDT", "DOTUSDT"
];

const LEVERAGE_OPTIONS = [1, 2, 3, 5, 10, 20, 50, 75, 100, 125];

// ============================================
// Main Trading Terminal Component
// ============================================

export function TradingForm() {
  // State
  const [mode, setMode] = useState<TradingMode>("PAPER");
  const [marketType, setMarketType] = useState<MarketType>("FUTURES");
  
  // Account management
  const {
    accounts,
    selectedAccount,
    setSelectedAccount,
    isLoading: accountsLoading,
    hasMultipleAccounts,
    hasNoAccount,
    refetch: refetchAccounts,
  } = useTradingAccounts(mode, marketType);
  
  // Positions via Unified Engine
  const {
    positions,
    isLoading: positionsLoading,
    lastUpdated,
    refetch: refetchPositions,
    closePosition,
  } = useUnifiedPositions(mode, selectedAccount?.id, { autoRefresh: true, refreshInterval: 5000 });
  
  // Position modal
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [showPositionModal, setShowPositionModal] = useState(false);

  // Handle mode change
  const handleModeChange = useCallback((newMode: TradingMode) => {
    setMode(newMode);
    setSelectedAccount(null);
  }, [setSelectedAccount]);

  // Handle market type change
  const handleMarketTypeChange = useCallback((newType: MarketType) => {
    setMarketType(newType);
    setSelectedAccount(null);
  }, [setSelectedAccount]);

  // Handle position click
  const handlePositionClick = useCallback((position: Position) => {
    setSelectedPosition(position);
    setShowPositionModal(true);
  }, []);

  // Handle close position
  const handleClosePosition = useCallback(async (positionId: string) => {
    const success = await closePosition(positionId, "MANUAL");
    if (success) {
      toast.success("Position closed");
      setShowPositionModal(false);
      setSelectedPosition(null);
    } else {
      toast.error("Failed to close position");
    }
  }, [closePosition]);

  // Refresh
  const handleRefresh = useCallback(async () => {
    await Promise.all([refetchAccounts(), refetchPositions()]);
    toast.success("Refreshed");
  }, [refetchAccounts, refetchPositions]);

  // Calculate totals
  const totalPnl = positions.reduce((sum, p) => sum + (p.unrealizedPnl || 0), 0);
  const modeConfig = MODE_CONFIG[mode];

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Trading</h2>
          <Badge variant="outline" className={cn("text-xs", modeConfig.color, modeConfig.bgColor, modeConfig.borderColor)}>
            {mode}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-xs text-muted-foreground">
              {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleRefresh}>
            <RefreshCw className={cn("h-4 w-4", positionsLoading && "animate-spin")} />
          </Button>
        </div>
      </div>
      
      {/* Mode Tabs */}
      <div className="flex items-center bg-muted/50 rounded-lg p-1 w-fit">
        {(Object.keys(MODE_CONFIG) as TradingMode[]).map((m) => {
          const config = MODE_CONFIG[m];
          const isActive = mode === m;
          return (
            <Button
              key={m}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-8 text-xs px-4 gap-1.5",
                isActive && config.color,
                isActive && "bg-background shadow-sm",
              )}
              onClick={() => handleModeChange(m)}
            >
              {m === "LIVE" && <TrendingUp className="h-3 w-3" />}
              {m === "DEMO" && <Zap className="h-3 w-3" />}
              {m === "PAPER" && <FlaskConical className="h-3 w-3" />}
              {config.label}
            </Button>
          );
        })}
      </div>
      
      {/* Market Type Tabs */}
      <div className="flex items-center gap-4 border-b border-border">
        {MARKET_TYPES.map((mt) => {
          const isActive = marketType === mt.value;
          return (
            <button
              key={mt.value}
              className={cn(
                "pb-2 text-sm font-medium transition-colors border-b-2",
                isActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
              onClick={() => handleMarketTypeChange(mt.value)}
            >
              {mt.label}
            </button>
          );
        })}
      </div>
      
      {/* Account Selection */}
      {!accountsLoading && !hasNoAccount && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Account:</span>
          {hasMultipleAccounts ? (
            <Select
              value={selectedAccount?.id || ""}
              onValueChange={(value) => {
                const acc = accounts.find(a => a.id === value);
                setSelectedAccount(acc || null);
              }}
            >
              <SelectTrigger className="h-8 w-[200px]">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((acc) => (
                  <SelectItem key={acc.id} value={acc.id}>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={cn("text-[10px] h-5", getExchangeBadgeColor(acc.exchangeId))}>
                        {getExchangeDisplayName(acc.exchangeId)}
                      </Badge>
                      <span className="text-xs">{acc.balance.toFixed(2)} {acc.currency}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={cn("text-xs", getExchangeBadgeColor(selectedAccount?.exchangeId || ""))}>
                {getExchangeDisplayName(selectedAccount?.exchangeId || "")}
              </Badge>
              <span className="text-sm">{selectedAccount?.balance.toFixed(2)} {selectedAccount?.currency}</span>
            </div>
          )}
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
        {/* Trading Form */}
        <div className="lg:col-span-2">
          {hasNoAccount ? (
            <NoAccountCard 
              mode={mode} 
              marketType={marketType} 
              onAccountCreated={refetchAccounts}
            />
          ) : accountsLoading ? (
            <LoadingCard />
          ) : (
            <TradingTerminal
              mode={mode}
              marketType={marketType}
              account={selectedAccount}
              onOrderSuccess={refetchPositions}
            />
          )}
        </div>
        
        {/* Positions List */}
        <div className="lg:col-span-1 min-h-0">
          <PositionsPanel
            positions={positions}
            isLoading={positionsLoading}
            totalPnl={totalPnl}
            onPositionClick={handlePositionClick}
            onClosePosition={handleClosePosition}
          />
        </div>
      </div>
      
      {/* Position Modal */}
      {selectedPosition && (
        <PositionDetailModal
          position={selectedPosition as any}
          open={showPositionModal}
          onOpenChange={setShowPositionModal}
          onClose={() => {
            setShowPositionModal(false);
            setSelectedPosition(null);
            refetchPositions();
          }}
        />
      )}
    </div>
  );
}

// ============================================
// No Account Card
// ============================================

interface NoAccountCardProps {
  mode: TradingMode;
  marketType: MarketType;
  onAccountCreated?: () => void;
}

function NoAccountCard({ mode, marketType, onAccountCreated }: NoAccountCardProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateAccount = async () => {
    setIsCreating(true);
    setError(null);

    try {
      const response = await fetch("/api/account/create-paper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exchangeId: "binance",
          marketType: marketType.toLowerCase(),
          initialBalance: 10000,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      toast.success("PAPER account created successfully!");
      onAccountCreated?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create account";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Account</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {mode === "PAPER" 
              ? "Create a Paper Trading account to start practicing"
              : `Create a ${mode} account for ${marketType.toLowerCase()} trading`}
          </p>
          
          {error && (
            <p className="text-sm text-red-500 mb-4">{error}</p>
          )}

          {mode === "PAPER" ? (
            <Button onClick={handleCreateAccount} disabled={isCreating}>
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Paper Account
                </>
              )}
            </Button>
          ) : (
            <div className="text-sm text-muted-foreground">
              <p>Go to <span className="font-medium">Exchanges</span> section</p>
              <p className="text-xs mt-1">to connect your {mode} account</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// Loading Card
// ============================================

function LoadingCard() {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// Trading Terminal (Binance-style)
// ============================================

interface TradingTerminalProps {
  mode: TradingMode;
  marketType: MarketType;
  account: any;
  onOrderSuccess: () => void;
}

function TradingTerminal({ mode, marketType, account, onOrderSuccess }: TradingTerminalProps) {
  // Form state
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [direction, setDirection] = useState<Direction>("LONG");
  const [orderType, setOrderType] = useState<OrderType>("MARKET");
  const [amount, setAmount] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [triggerPrice, setTriggerPrice] = useState("");
  const [leverage, setLeverage] = useState(10);
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableBalance = account?.balance || 10000;

  // Submit order via Unified Engine
  const handleSubmit = async () => {
    if (!account || !amount) {
      toast.error("Fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await openUnifiedPosition(
        {
          symbol,
          direction,
          amount: parseFloat(amount),
          leverage: marketType === "FUTURES" ? leverage : 1,
          orderType,
          entryPrice: orderType !== "MARKET" ? parseFloat(entryPrice) : undefined,
          stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
          takeProfit: takeProfit ? parseFloat(takeProfit) : undefined,
        },
        {
          mode,
          accountId: account.id,
          exchangeId: account.exchangeId,
          marketType,
        }
      );

      if (result.success) {
        toast.success(`${direction} ${symbol} @ ${result.entryPrice?.toFixed(2)}`);
        setAmount("");
        setStopLoss("");
        setTakeProfit("");
        onOrderSuccess();
      } else {
        toast.error(result.error || "Failed to open position");
      }
    } catch (error) {
      toast.error("Failed to submit order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const modeConfig = MODE_CONFIG[mode];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">
              {marketType === "FUTURES" ? "Futures" : "Spot"} Trading
            </CardTitle>
          </div>
          <Badge className={cn("text-xs", modeConfig.color, modeConfig.bgColor, modeConfig.borderColor)}>
            {mode}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-4 pr-4">
            {/* Symbol */}
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Pair</label>
              <Select value={symbol} onValueChange={setSymbol}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TRADING_PAIRS.map((pair) => (
                    <SelectItem key={pair} value={pair}>
                      {pair.replace("USDT", "/USDT")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Direction */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={direction === "LONG" ? "default" : "outline"}
                className={cn("h-11", direction === "LONG" && "bg-[#0ECB81] hover:bg-[#0ECB81]/90 text-white")}
                onClick={() => setDirection("LONG")}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                LONG
              </Button>
              <Button
                type="button"
                variant={direction === "SHORT" ? "default" : "outline"}
                className={cn("h-11", direction === "SHORT" && "bg-[#F6465D] hover:bg-[#F6465D]/90 text-white")}
                onClick={() => setDirection("SHORT")}
              >
                <TrendingDown className="mr-2 h-4 w-4" />
                SHORT
              </Button>
            </div>

            {/* Order Type */}
            <div className="flex items-center bg-muted/50 rounded-lg p-1">
              {(["MARKET", "LIMIT", "STOP_LIMIT"] as OrderType[]).map((type) => (
                <Button
                  key={type}
                  variant={orderType === type ? "default" : "ghost"}
                  size="sm"
                  className={cn("flex-1 h-8 text-xs", orderType === type && "bg-background shadow-sm")}
                  onClick={() => setOrderType(type)}
                >
                  {type === "MARKET" ? "Market" : type === "LIMIT" ? "Limit" : "Stop"}
                </Button>
              ))}
            </div>

            {/* Entry Price (Limit/Stop-Limit) */}
            {orderType !== "MARKET" && (
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Price</label>
                <input
                  type="number"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(e.target.value)}
                  placeholder="Entry price"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background font-mono text-sm"
                />
              </div>
            )}

            {/* Trigger Price (Stop-Limit) */}
            {orderType === "STOP_LIMIT" && (
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  Trigger
                </label>
                <input
                  type="number"
                  value={triggerPrice}
                  onChange={(e) => setTriggerPrice(e.target.value)}
                  placeholder="Trigger price"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background font-mono text-sm"
                />
              </div>
            )}

            {/* Amount */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">Amount (USDT)</label>
                <span className="text-xs text-muted-foreground">
                  ${availableBalance.toFixed(2)}
                </span>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full h-10 px-3 rounded-md border border-input bg-background font-mono text-sm"
              />
              <div className="grid grid-cols-4 gap-1">
                {[25, 50, 75, 100].map((pct) => (
                  <Button
                    key={pct}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setAmount(((availableBalance * pct) / 100).toFixed(2))}
                  >
                    {pct}%
                  </Button>
                ))}
              </div>
            </div>

            {/* Leverage (Futures only) */}
            {marketType === "FUTURES" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-muted-foreground flex items-center gap-1">
                    <Gauge className="h-3 w-3" />
                    Leverage
                  </label>
                  <span className="text-sm font-mono font-bold text-primary">{leverage}x</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {LEVERAGE_OPTIONS.slice(0, 8).map((lev) => (
                    <Button
                      key={lev}
                      type="button"
                      variant={leverage === lev ? "default" : "outline"}
                      size="sm"
                      className={cn("h-7 text-xs px-2", leverage === lev && "bg-primary text-primary-foreground")}
                      onClick={() => setLeverage(lev)}
                    >
                      {lev}x
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* SL/TP */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground flex items-center gap-1">
                  <Shield className="h-3 w-3 text-[#F6465D]" />
                  Stop Loss
                </label>
                <input
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  placeholder="Price"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground flex items-center gap-1">
                  <Target className="h-3 w-3 text-[#0ECB81]" />
                  Take Profit
                </label>
                <input
                  type="number"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                  placeholder="Price"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background font-mono text-sm"
                />
              </div>
            </div>
          </div>
        </ScrollArea>
        
        {/* Submit Button */}
        <div className="pt-2 border-t">
          <Button
            className={cn(
              "w-full h-12 text-base font-medium",
              direction === "LONG" && "bg-[#0ECB81] hover:bg-[#0ECB81]/90",
              direction === "SHORT" && "bg-[#F6465D] hover:bg-[#F6465D]/90"
            )}
            onClick={handleSubmit}
            disabled={isSubmitting || !account}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {direction === "LONG" ? (
                  <TrendingUp className="mr-2 h-5 w-5" />
                ) : (
                  <TrendingDown className="mr-2 h-5 w-5" />
                )}
                Open {direction} {marketType === "FUTURES" ? `${leverage}x` : ""}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// Positions Panel
// ============================================

interface PositionsPanelProps {
  positions: Position[];
  isLoading: boolean;
  totalPnl: number;
  onPositionClick: (position: Position) => void;
  onClosePosition: (positionId: string) => void;
}

function PositionsPanel({
  positions,
  isLoading,
  totalPnl,
  onPositionClick,
  onClosePosition,
}: PositionsPanelProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Positions ({positions.length})</CardTitle>
          <div className={cn(
            "text-sm font-mono",
            totalPnl >= 0 ? "text-[#0ECB81]" : "text-[#F6465D]"
          )}>
            {totalPnl >= 0 ? "+" : ""}${totalPnl.toFixed(2)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-4 pb-4">
          {positions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <Target className="h-8 w-8 mb-2" />
              <p className="text-xs">No open positions</p>
            </div>
          ) : (
            <div className="space-y-2">
              {positions.map((position) => (
                <PositionCard
                  key={position.id}
                  position={position}
                  onClick={() => onPositionClick(position)}
                  onClose={() => onClosePosition(position.id)}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

// ============================================
// Position Card
// ============================================

interface PositionCardProps {
  position: Position;
  onClick: () => void;
  onClose: () => void;
}

function PositionCard({ position, onClick, onClose }: PositionCardProps) {
  const pnl = position.unrealizedPnl || 0;
  const pnlPercent = position.avgEntryPrice > 0 
    ? ((position.currentPrice || position.avgEntryPrice) - position.avgEntryPrice) / position.avgEntryPrice * 100 * position.leverage
    : 0;

  return (
    <div
      className="p-3 rounded-lg border border-border bg-card hover:bg-accent/50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "text-[10px]",
              position.direction === "LONG" 
                ? "bg-[#0ECB81]/10 text-[#0ECB81] border-[#0ECB81]/30" 
                : "bg-[#F6465D]/10 text-[#F6465D] border-[#F6465D]/30"
            )}
          >
            {position.direction}
          </Badge>
          <span className="text-sm font-medium">{position.symbol}</span>
          <Badge variant="outline" className={cn("text-[10px]", getExchangeBadgeColor(position.symbol.split("USDT")[0].toLowerCase()))}>
            {position.leverage}x
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-muted-foreground">Entry:</span>
          <span className="ml-1 font-mono">{position.avgEntryPrice.toFixed(2)}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Current:</span>
          <span className="ml-1 font-mono">{(position.currentPrice || position.avgEntryPrice).toFixed(2)}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-2">
        <div className={cn("text-sm font-mono font-medium", pnl >= 0 ? "text-[#0ECB81]" : "text-[#F6465D]")}>
          {pnl >= 0 ? "+" : ""}${pnl.toFixed(2)}
        </div>
        <div className={cn("text-xs", pnl >= 0 ? "text-[#0ECB81]" : "text-[#F6465D]")}>
          {pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}

export default TradingForm;
