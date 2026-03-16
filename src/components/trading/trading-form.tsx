"use client";

/**
 * CITARION Trading Panel - Binance Mobile Style
 * 
 * Features:
 * - LIVE (red), DEMO (purple), PAPER (blue) tabs
 * - Futures, Spot, Inverse sub-tabs
 * - Smart account selection (auto-select if single account)
 * - Entry order types: Market, Limit, Stop-Limit
 * - Real-time position tracking
 * - Mobile-first responsive design
 */

import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  Building2,
  Plus,
  RefreshCw,
  Zap,
  FlaskConical,
  Target,
  Shield,
  Gauge,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { useAccounts, TradingMode, MarketType, getExchangeDisplayName, getExchangeBadgeColor } from "@/hooks/use-accounts";
import { usePositions, TradingPosition } from "@/hooks/use-positions";
import { PositionDetailModal } from "./position-detail-modal";

// ============================================
// Constants
// ============================================

const MODE_CONFIG: Record<TradingMode, { label: string; color: string; bgColor: string; borderColor: string; description: string }> = {
  LIVE: {
    label: "LIVE",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    description: "Real trading with real funds",
  },
  DEMO: {
    label: "DEMO",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    description: "Virtual funds simulation",
  },
  PAPER: {
    label: "PAPER",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    description: "Paper trading for strategies",
  },
};

const MARKET_TYPES: { value: MarketType; label: string; description: string }[] = [
  { value: "futures", label: "Futures", description: "Perpetual contracts with leverage" },
  { value: "spot", label: "Spot", description: "Direct buy/sell" },
  { value: "inverse", label: "Inverse", description: "Coin-margined contracts" },
];

// ============================================
// Main Trading Panel Component
// ============================================

export function TradingForm() {
  // Mode and market type state
  const [mode, setMode] = useState<TradingMode>("PAPER");
  const [marketType, setMarketType] = useState<MarketType>("futures");
  
  // Account management
  const {
    accounts,
    selectedAccount,
    setSelectedAccount,
    isLoading: accountsLoading,
    hasMultipleAccounts,
    hasNoAccount,
    refetch: refetchAccounts,
  } = useAccounts({ mode, marketType });
  
  // Positions management
  const {
    positions,
    isLoading: positionsLoading,
    lastUpdated,
    refetch: refetchPositions,
    closePosition,
  } = usePositions({ 
    mode, 
    marketType, 
    accountId: selectedAccount?.id,
    autoRefresh: true,
    refreshInterval: 5000,
  });
  
  // Position detail modal
  const [selectedPosition, setSelectedPosition] = useState<TradingPosition | null>(null);
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
  const handlePositionClick = useCallback((position: TradingPosition) => {
    setSelectedPosition(position);
    setShowPositionModal(true);
  }, []);
  
  // Handle close position
  const handleClosePosition = useCallback(async (positionId: string) => {
    const success = await closePosition(positionId);
    if (success) {
      toast.success("Position closed successfully");
      setShowPositionModal(false);
      setSelectedPosition(null);
    } else {
      toast.error("Failed to close position");
    }
  }, [closePosition]);
  
  // Refresh all data
  const handleRefresh = useCallback(async () => {
    await Promise.all([refetchAccounts(), refetchPositions()]);
    toast.success("Data refreshed");
  }, [refetchAccounts, refetchPositions]);
  
  // Calculate totals
  const totalPnl = positions.reduce((sum, p) => sum + p.unrealizedPnl, 0);
  const longCount = positions.filter(p => p.direction === "LONG").length;
  const shortCount = positions.filter(p => p.direction === "SHORT").length;
  
  const modeConfig = MODE_CONFIG[mode];

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Trading</h2>
          <Badge 
            variant="outline" 
            className={cn("text-xs", modeConfig.color, modeConfig.bgColor, modeConfig.borderColor)}
          >
            {mode}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-xs text-muted-foreground">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleRefresh}
          >
            <RefreshCw className={cn("h-4 w-4", positionsLoading && "animate-spin")} />
          </Button>
        </div>
      </div>
      
      {/* Mode Tabs - Top Level */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-muted/50 rounded-lg p-1">
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
      </div>
      
      {/* Market Type Tabs - Sub Level */}
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
                      <Badge 
                        variant="outline" 
                        className={cn("text-[10px] h-5", getExchangeBadgeColor(acc.exchangeId))}
                      >
                        {getExchangeDisplayName(acc.exchangeId)}
                      </Badge>
                      <span className="text-xs">{acc.exchangeName}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={cn("text-xs", getExchangeBadgeColor(selectedAccount?.exchangeId || ""))}
              >
                {getExchangeDisplayName(selectedAccount?.exchangeId || "")}
              </Badge>
              <span className="text-sm">{selectedAccount?.exchangeName}</span>
              {selectedAccount?.balance !== undefined && (
                <span className="text-xs text-muted-foreground">
                  ({selectedAccount.balance.toFixed(2)} {selectedAccount.currency})
                </span>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
        {/* Trading Form - Left Side */}
        <div className="lg:col-span-2">
          {hasNoAccount ? (
            <NoAccountCard mode={mode} marketType={marketType} />
          ) : accountsLoading ? (
            <LoadingCard />
          ) : (
            <TradingFormCard
              mode={mode}
              marketType={marketType}
              account={selectedAccount}
              onOrderSuccess={refetchPositions}
            />
          )}
        </div>
        
        {/* Positions List - Right Side */}
        <div className="lg:col-span-1 min-h-0">
          <PositionsCard
            positions={positions}
            isLoading={positionsLoading}
            totalPnl={totalPnl}
            longCount={longCount}
            shortCount={shortCount}
            onPositionClick={handlePositionClick}
            onClosePosition={handleClosePosition}
          />
        </div>
      </div>
      
      {/* Position Detail Modal */}
      {selectedPosition && (
        <PositionDetailModal
          position={selectedPosition}
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

function NoAccountCard({ mode, marketType }: { mode: TradingMode; marketType: MarketType }) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Account Found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You don&apos;t have a {mode} account for {marketType} trading.
          </p>
          <Button asChild>
            <a href="/exchanges">
              <Plus className="h-4 w-4 mr-2" />
              Create Account
            </a>
          </Button>
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
// Trading Form Card (Market-specific)
// ============================================

interface TradingFormCardProps {
  mode: TradingMode;
  marketType: MarketType;
  account: any;
  onOrderSuccess: () => void;
}

function TradingFormCard({ mode, marketType, account, onOrderSuccess }: TradingFormCardProps) {
  switch (marketType) {
    case "futures":
      return <FuturesForm mode={mode} account={account} onOrderSuccess={onOrderSuccess} />;
    case "spot":
      return <SpotForm mode={mode} account={account} onOrderSuccess={onOrderSuccess} />;
    case "inverse":
      return <InverseForm mode={mode} account={account} onOrderSuccess={onOrderSuccess} />;
    default:
      return null;
  }
}

// ============================================
// Futures Form
// ============================================

function FuturesForm({ mode, account, onOrderSuccess }: { mode: TradingMode; account: any; onOrderSuccess: () => void }) {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [direction, setDirection] = useState<"LONG" | "SHORT">("LONG");
  const [orderType, setOrderType] = useState<"market" | "limit" | "stop_limit">("market");
  const [amount, setAmount] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [triggerPrice, setTriggerPrice] = useState("");
  const [leverage, setLeverage] = useState(10);
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const TRADING_PAIRS = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT", "DOGEUSDT"];
  const LEVERAGE_OPTIONS = [1, 2, 3, 5, 10, 20, 50, 75, 100, 125];

  // Get current price from market data
  const currentPrice = 67000; // This would come from real-time price hook

  const handleSubmit = async () => {
    if (!account || !amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/trade/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol,
          direction,
          amount: parseFloat(amount),
          leverage,
          orderType,
          price: orderType !== "market" ? parseFloat(entryPrice) : undefined,
          triggerPrice: orderType === "stop_limit" ? parseFloat(triggerPrice) : undefined,
          stopLoss: stopLoss ? parseFloat(stopLoss) : null,
          takeProfit: takeProfit ? parseFloat(takeProfit) : null,
          isDemo: mode !== "LIVE",
          accountId: account.id,
          exchangeId: account.exchangeId,
          tradingMode: mode,
          marketType: "futures",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(`${direction} position opened: ${symbol}`);
        setAmount("");
        setStopLoss("");
        setTakeProfit("");
        onOrderSuccess();
      } else {
        toast.error(data.error || "Failed to open position");
      }
    } catch (error) {
      toast.error("Failed to submit order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableBalance = account?.balance || 10000;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Futures Trading</CardTitle>
            <CardDescription>Perpetual contracts with leverage</CardDescription>
          </div>
          <Badge className={cn("text-xs", MODE_CONFIG[mode].color, MODE_CONFIG[mode].bgColor, MODE_CONFIG[mode].borderColor)}>
            {mode}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-4 pr-4">
            {/* Symbol Select */}
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Trading Pair</label>
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

            {/* Direction Toggle */}
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

            {/* Order Type Tabs */}
            <div className="flex items-center bg-muted/50 rounded-lg p-1">
              {(["market", "limit", "stop_limit"] as const).map((type) => (
                <Button
                  key={type}
                  variant={orderType === type ? "default" : "ghost"}
                  size="sm"
                  className={cn("flex-1 h-8 text-xs", orderType === type && "bg-background shadow-sm")}
                  onClick={() => setOrderType(type)}
                >
                  {type === "market" ? "Market" : type === "limit" ? "Limit" : "Stop-Limit"}
                </Button>
              ))}
            </div>

            {/* Entry Price (for Limit/Stop-Limit) */}
            {orderType !== "market" && (
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Entry Price</label>
                <input
                  type="number"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(e.target.value)}
                  placeholder={currentPrice.toFixed(2)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background font-mono text-sm"
                />
              </div>
            )}

            {/* Trigger Price (for Stop-Limit) */}
            {orderType === "stop_limit" && (
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  Trigger Price
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
                  Available: ${availableBalance.toFixed(2)}
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

            {/* Leverage */}
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

            <Separator />

            {/* SL/TP */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-[#F6465D]" />
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
                Open {direction} {leverage}x
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// Spot Form
// ============================================

function SpotForm({ mode, account, onOrderSuccess }: { mode: TradingMode; account: any; onOrderSuccess: () => void }) {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [orderType, setOrderType] = useState<"market" | "limit" | "stop_limit">("market");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const TRADING_PAIRS = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT", "DOGEUSDT"];
  const currentPrice = 67000;
  const availableBalance = account?.balance || 10000;

  const handleBuy = async () => {
    if (!account || !amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/trade/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol,
          direction: "LONG",
          amount: parseFloat(amount),
          orderType,
          price: orderType !== "market" ? parseFloat(price) : undefined,
          isDemo: mode !== "LIVE",
          accountId: account.id,
          exchangeId: account.exchangeId,
          tradingMode: mode,
          marketType: "spot",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(`Buy order placed: ${symbol}`);
        setAmount("");
        onOrderSuccess();
      } else {
        toast.error(data.error || "Failed to place order");
      }
    } catch (error) {
      toast.error("Failed to submit order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSell = async () => {
    if (!account || !amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/trade/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol,
          direction: "SHORT",
          amount: parseFloat(amount),
          orderType,
          price: orderType !== "market" ? parseFloat(price) : undefined,
          isDemo: mode !== "LIVE",
          accountId: account.id,
          exchangeId: account.exchangeId,
          tradingMode: mode,
          marketType: "spot",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(`Sell order placed: ${symbol}`);
        setAmount("");
        onOrderSuccess();
      } else {
        toast.error(data.error || "Failed to place order");
      }
    } catch (error) {
      toast.error("Failed to submit order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Spot Trading</CardTitle>
            <CardDescription>Buy and sell crypto directly</CardDescription>
          </div>
          <Badge className={cn("text-xs", MODE_CONFIG[mode].color, MODE_CONFIG[mode].bgColor, MODE_CONFIG[mode].borderColor)}>
            {mode}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-4 pr-4">
            {/* Symbol Select */}
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Trading Pair</label>
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

            {/* Order Type Tabs */}
            <div className="flex items-center bg-muted/50 rounded-lg p-1">
              {(["market", "limit", "stop_limit"] as const).map((type) => (
                <Button
                  key={type}
                  variant={orderType === type ? "default" : "ghost"}
                  size="sm"
                  className={cn("flex-1 h-8 text-xs", orderType === type && "bg-background shadow-sm")}
                  onClick={() => setOrderType(type)}
                >
                  {type === "market" ? "Market" : type === "limit" ? "Limit" : "Stop-Limit"}
                </Button>
              ))}
            </div>

            {/* Price (for Limit/Stop-Limit) */}
            {orderType !== "market" && (
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Price (USDT)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={currentPrice.toFixed(2)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background font-mono text-sm"
                />
              </div>
            )}

            {/* Amount */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">Amount</label>
                <span className="text-xs text-muted-foreground">
                  Available: ${availableBalance.toFixed(2)}
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

            {/* Total */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-mono font-medium">
                ${(parseFloat(amount) * currentPrice).toFixed(2)} USDT
              </span>
            </div>
          </div>
        </ScrollArea>
        
        {/* Submit Buttons */}
        <div className="pt-2 border-t grid grid-cols-2 gap-2">
          <Button
            className="h-12 text-base font-medium bg-[#0ECB81] hover:bg-[#0ECB81]/90"
            onClick={handleBuy}
            disabled={isSubmitting || !account}
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buy"}
          </Button>
          <Button
            className="h-12 text-base font-medium bg-[#F6465D] hover:bg-[#F6465D]/90"
            onClick={handleSell}
            disabled={isSubmitting || !account}
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sell"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// Inverse Form
// ============================================

function InverseForm({ mode, account, onOrderSuccess }: { mode: TradingMode; account: any; onOrderSuccess: () => void }) {
  const [symbol, setSymbol] = useState("BTCUSD_PERP");
  const [direction, setDirection] = useState<"LONG" | "SHORT">("LONG");
  const [orderType, setOrderType] = useState<"market" | "limit" | "stop_limit">("market");
  const [amount, setAmount] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [triggerPrice, setTriggerPrice] = useState("");
  const [leverage, setLeverage] = useState(10);
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const INVERSE_PAIRS = [
    { symbol: "BTCUSD_PERP", name: "BTC/USD" },
    { symbol: "ETHUSD_PERP", name: "ETH/USD" },
    { symbol: "SOLUSD_PERP", name: "SOL/USD" },
  ];
  const LEVERAGE_OPTIONS = [1, 2, 3, 5, 10, 20, 50, 100];
  const currentPrice = 67000;
  const marginBalance = account?.balance || 0.1;

  const handleSubmit = async () => {
    if (!account || !amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/trade/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol,
          direction,
          amount: parseFloat(amount),
          leverage,
          orderType,
          price: orderType !== "market" ? parseFloat(entryPrice) : undefined,
          triggerPrice: orderType === "stop_limit" ? parseFloat(triggerPrice) : undefined,
          stopLoss: stopLoss ? parseFloat(stopLoss) : null,
          takeProfit: takeProfit ? parseFloat(takeProfit) : null,
          isDemo: mode !== "LIVE",
          accountId: account.id,
          exchangeId: account.exchangeId,
          tradingMode: mode,
          marketType: "inverse",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(`${direction} inverse position opened: ${symbol}`);
        setAmount("");
        onOrderSuccess();
      } else {
        toast.error(data.error || "Failed to open position");
      }
    } catch (error) {
      toast.error("Failed to submit order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Inverse Futures</CardTitle>
            <CardDescription>Coin-margined contracts</CardDescription>
          </div>
          <Badge className={cn("text-xs", MODE_CONFIG[mode].color, MODE_CONFIG[mode].bgColor, MODE_CONFIG[mode].borderColor)}>
            {mode}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-4 pr-4">
            {/* Margin Currency Notice */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Shield className="h-4 w-4 text-amber-500" />
              <div className="text-xs text-amber-600 dark:text-amber-400">
                Margin in BTC • Available: {marginBalance.toFixed(6)} BTC
              </div>
            </div>

            {/* Symbol Select */}
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Contract</label>
              <Select value={symbol} onValueChange={setSymbol}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INVERSE_PAIRS.map((pair) => (
                    <SelectItem key={pair.symbol} value={pair.symbol}>
                      {pair.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Direction Toggle */}
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

            {/* Order Type Tabs */}
            <div className="flex items-center bg-muted/50 rounded-lg p-1">
              {(["market", "limit", "stop_limit"] as const).map((type) => (
                <Button
                  key={type}
                  variant={orderType === type ? "default" : "ghost"}
                  size="sm"
                  className={cn("flex-1 h-8 text-xs", orderType === type && "bg-background shadow-sm")}
                  onClick={() => setOrderType(type)}
                >
                  {type === "market" ? "Market" : type === "limit" ? "Limit" : "Stop-Limit"}
                </Button>
              ))}
            </div>

            {/* Entry Price */}
            {orderType !== "market" && (
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Entry Price (USD)</label>
                <input
                  type="number"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(e.target.value)}
                  placeholder={currentPrice.toFixed(2)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background font-mono text-sm"
                />
              </div>
            )}

            {/* Trigger Price */}
            {orderType === "stop_limit" && (
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  Trigger Price
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
              <label className="text-xs text-muted-foreground">Amount (BTC)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full h-10 px-3 rounded-md border border-input bg-background font-mono text-sm"
              />
            </div>

            {/* Leverage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground flex items-center gap-1">
                  <Gauge className="h-3 w-3" />
                  Leverage
                </label>
                <span className="text-sm font-mono font-bold text-primary">{leverage}x</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {LEVERAGE_OPTIONS.map((lev) => (
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

            <Separator />

            {/* SL/TP */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-[#F6465D]" />
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
                Open {direction} {leverage}x
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// Positions Card
// ============================================

interface PositionsCardProps {
  positions: TradingPosition[];
  isLoading: boolean;
  totalPnl: number;
  longCount: number;
  shortCount: number;
  onPositionClick: (position: TradingPosition) => void;
  onClosePosition: (positionId: string) => void;
}

function PositionsCard({ 
  positions, 
  isLoading, 
  totalPnl, 
  longCount, 
  shortCount, 
  onPositionClick,
  onClosePosition,
}: PositionsCardProps) {
  const [filter, setFilter] = useState<"all" | "LONG" | "SHORT">("all");
  
  const filteredPositions = positions.filter(p => 
    filter === "all" ? true : p.direction === filter
  );

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Open Positions</CardTitle>
            <Badge variant="outline" className="text-xs">{positions.length}</Badge>
          </div>
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
          <div className={cn(
            "font-mono",
            totalPnl >= 0 ? "text-[#0ECB81]" : "text-[#F6465D]"
          )}>
            {totalPnl >= 0 ? "+" : ""}${totalPnl.toFixed(2)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-3 overflow-hidden p-4 pt-0">
        {/* Filter */}
        <div className="flex items-center bg-muted/50 rounded-md p-0.5">
          {(["all", "LONG", "SHORT"] as const).map((dir) => (
            <Button
              key={dir}
              variant="ghost"
              size="sm"
              className={cn(
                "h-7 text-xs px-2",
                filter === dir && "bg-background shadow-sm"
              )}
              onClick={() => setFilter(dir)}
            >
              {dir === "all" ? "All" : dir}
            </Button>
          ))}
        </div>
        
        {/* Position List */}
        <ScrollArea className="flex-1 -mx-4 px-4">
          {filteredPositions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Activity className="h-10 w-10 text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground">No open positions</p>
            </div>
          ) : (
            <div className="space-y-2 pb-4">
              {filteredPositions.map((position) => (
                <button
                  key={position.id}
                  className="w-full text-left p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                  onClick={() => onPositionClick(position)}
                >
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
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Entry: ${position.avgEntryPrice.toFixed(2)}</span>
                    <span className={cn(
                      "font-mono font-medium",
                      position.unrealizedPnl >= 0 ? "text-[#0ECB81]" : "text-[#F6465D]"
                    )}>
                      {position.unrealizedPnl >= 0 ? "+" : ""}${position.unrealizedPnl.toFixed(2)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

// Separator component
function Separator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("bg-border", className)} {...props} />;
}

export default TradingForm;
