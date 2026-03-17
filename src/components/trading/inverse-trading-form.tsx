"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ChevronDown,
  Search,
  Target,
  Shield,
  Gauge,
  Loader2,
  Coins,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { TradingMode, TradingAccount } from "@/hooks/use-accounts";
import { useRealtimePrice } from "@/hooks/use-realtime-prices";

// Inverse (coin-margined) trading pairs - contracts settled in base currency
const INVERSE_PAIRS = [
  { symbol: "BTCUSD_PERP", name: "BTC/USD", baseAsset: "BTC", marginAsset: "BTC" },
  { symbol: "ETHUSD_PERP", name: "ETH/USD", baseAsset: "ETH", marginAsset: "ETH" },
  { symbol: "BNBUSD_PERP", name: "BNB/USD", baseAsset: "BNB", marginAsset: "BNB" },
  { symbol: "SOLUSD_PERP", name: "SOL/USD", baseAsset: "SOL", marginAsset: "SOL" },
  { symbol: "XRPUSD_PERP", name: "XRP/USD", baseAsset: "XRP", marginAsset: "XRP" },
];

// Leverage presets for inverse
const INVERSE_LEVERAGE_PRESETS = [1, 2, 3, 5, 10, 20, 25, 50, 75, 100, 125];

interface InverseTradingFormProps {
  mode: TradingMode;
  account: TradingAccount | null;
  onOrderSuccess?: () => void;
}

export function InverseTradingForm({ mode, account, onOrderSuccess }: InverseTradingFormProps) {
  // Trading pair selection
  const [symbol, setSymbol] = useState("BTCUSD_PERP");
  const [showPairSelector, setShowPairSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Order settings
  const [direction, setDirection] = useState<"LONG" | "SHORT">("LONG");
  const [orderType, setOrderType] = useState<"market" | "limit" | "stop_limit">("market");
  const [amount, setAmount] = useState(""); // Amount in margin currency (BTC)
  const [entryPrice, setEntryPrice] = useState("");
  const [stopPrice, setStopPrice] = useState("");
  const [leverage, setLeverage] = useState(10);
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get real-time price (using similar symbol for price)
  const priceData = useRealtimePrice(symbol.replace("_PERP", "USDT"));
  const currentPrice = priceData?.price || 0;
  const priceChange = priceData?.change24h || 0;
  
  // Get selected pair info
  const selectedPair = INVERSE_PAIRS.find(p => p.symbol === symbol) || INVERSE_PAIRS[0];
  
  // Filter pairs by search
  const filteredPairs = useMemo(() => {
    if (!searchQuery) return INVERSE_PAIRS;
    const query = searchQuery.toLowerCase();
    return INVERSE_PAIRS.filter(
      p => p.symbol.toLowerCase().includes(query) || p.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  
  // Calculate position details
  const amountNum = parseFloat(amount) || 0;
  const entryPriceNum = parseFloat(entryPrice) || currentPrice;
  
  // For inverse contracts, contract value = contracts * price
  // Margin = contracts / leverage
  const contracts = amountNum * leverage; // Number of contracts
  const positionValue = contracts * currentPrice; // Value in USD
  const margin = amountNum; // Margin in base currency (BTC)
  
  const estimatedFee = positionValue * 0.0004; // 0.04% taker fee
  
  const liquidationPrice = useMemo(() => {
    if (!currentPrice || !leverage) return 0;
    const maintenanceMargin = 0.004; // 0.4%
    if (direction === "LONG") {
      return currentPrice * (1 - 1 / leverage + maintenanceMargin);
    } else {
      return currentPrice * (1 + 1 / leverage - maintenanceMargin);
    }
  }, [currentPrice, leverage, direction]);
  
  // Available balance (in margin currency)
  const marginBalance = account?.balance || 0.1; // Default 0.1 BTC
  
  // Handle pair selection
  const handlePairSelect = (pair: typeof INVERSE_PAIRS[0]) => {
    setSymbol(pair.symbol);
    setShowPairSelector(false);
    setSearchQuery("");
  };
  
  // Handle order submission
  const handleSubmit = async () => {
    // Validation
    if (!account) {
      toast.error("No account selected");
      return;
    }
    
    if (amountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (amountNum > marginBalance) {
      toast.error(`Insufficient ${selectedPair.marginAsset} balance`);
      return;
    }
    
    if (orderType === "limit" && parseFloat(entryPrice) <= 0) {
      toast.error("Please enter a valid entry price");
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
          amount: amountNum,
          leverage,
          orderType,
          price: orderType !== "market" ? entryPriceNum : undefined,
          triggerPrice: orderType === "stop_limit" ? parseFloat(stopPrice) : undefined,
          stopLoss: stopLoss || null,
          takeProfit: takeProfit || null,
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
        setStopLoss("");
        setTakeProfit("");
        onOrderSuccess?.();
      } else {
        toast.error(data.error || "Failed to open position");
      }
    } catch (error) {
      console.error("Order error:", error);
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
            <CardDescription>Coin-margined perpetual contracts</CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs",
              mode === "LIVE" && "text-red-500 border-red-500/30",
              mode === "DEMO" && "text-purple-500 border-purple-500/30",
              mode === "PAPER" && "text-blue-500 border-blue-500/30",
            )}
          >
            {mode}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-4 pr-4">
            {/* Pair Selector */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Contract</Label>
              <button
                className="w-full flex items-center justify-between h-11 px-3 rounded-md border border-input bg-background hover:bg-accent"
                onClick={() => setShowPairSelector(!showPairSelector)}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{selectedPair.name}</span>
                  <Badge variant="outline" className="text-[10px]">Inverse</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono">
                    ${currentPrice.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  </span>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-[10px]",
                      priceChange >= 0 ? "text-[#0ECB81] border-[#0ECB81]/30" : "text-[#F6465D] border-[#F6465D]/30"
                    )}
                  >
                    {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(2)}%
                  </Badge>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </button>
              
              {/* Pair Dropdown */}
              {showPairSelector && (
                <div className="absolute z-50 w-[calc(100%-48px)] mt-1 bg-popover border rounded-lg shadow-lg">
                  <div className="p-2 border-b">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search contracts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 h-8"
                      />
                    </div>
                  </div>
                  <ScrollArea className="h-[200px]">
                    <div className="p-1">
                      {filteredPairs.map((pair) => (
                        <button
                          key={pair.symbol}
                          className={cn(
                            "w-full flex items-center justify-between px-2 py-1.5 rounded text-sm hover:bg-accent",
                            pair.symbol === symbol && "bg-accent"
                          )}
                          onClick={() => handlePairSelect(pair)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{pair.name}</span>
                            <Badge variant="outline" className="text-[10px]">{pair.marginAsset}</Badge>
                          </div>
                          {pair.symbol === symbol && (
                            <Badge variant="outline" className="text-[10px]">Selected</Badge>
                          )}
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
            
            {/* Margin Currency Display */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Coins className="h-4 w-4 text-amber-500" />
              <div className="flex-1">
                <div className="text-xs text-amber-600 dark:text-amber-400">Margin Currency</div>
                <div className="font-medium">{selectedPair.marginAsset}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Available</div>
                <div className="font-mono">{marginBalance.toFixed(6)} {selectedPair.marginAsset}</div>
              </div>
            </div>
            
            {/* Price Display */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <div className="text-xs text-muted-foreground">Mark Price</div>
                <div className="text-xl font-mono font-semibold">
                  ${currentPrice.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Contract Value</div>
                <div className="text-sm font-mono">${positionValue.toFixed(2)}</div>
              </div>
            </div>
            
            {/* Direction Toggle */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Direction</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={direction === "LONG" ? "default" : "outline"}
                  className={cn(
                    "h-12",
                    direction === "LONG" && "bg-[#0ECB81] hover:bg-[#0ECB81]/90 text-white"
                  )}
                  onClick={() => setDirection("LONG")}
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  LONG
                </Button>
                <Button
                  type="button"
                  variant={direction === "SHORT" ? "default" : "outline"}
                  className={cn(
                    "h-12",
                    direction === "SHORT" && "bg-[#F6465D] hover:bg-[#F6465D]/90 text-white"
                  )}
                  onClick={() => setDirection("SHORT")}
                >
                  <TrendingDown className="mr-2 h-4 w-4" />
                  SHORT
                </Button>
              </div>
            </div>
            
            {/* Order Type Tabs */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Order Type</Label>
              <Tabs value={orderType} onValueChange={(v) => setOrderType(v as typeof orderType)}>
                <TabsList className="w-full grid grid-cols-3 h-9">
                  <TabsTrigger value="market" className="text-xs">Market</TabsTrigger>
                  <TabsTrigger value="limit" className="text-xs">Limit</TabsTrigger>
                  <TabsTrigger value="stop_limit" className="text-xs">Stop-Limit</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Entry Price (for Limit/Stop-Limit) */}
            {orderType !== "market" && (
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Entry Price (USD)</Label>
                <Input
                  type="number"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(e.target.value)}
                  placeholder={currentPrice.toFixed(2)}
                  className="font-mono h-10"
                />
              </div>
            )}
            
            {/* Stop Price (for Stop-Limit) */}
            {orderType === "stop_limit" && (
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  Trigger Price
                </Label>
                <Input
                  type="number"
                  value={stopPrice}
                  onChange={(e) => setStopPrice(e.target.value)}
                  placeholder="Trigger price"
                  className="font-mono h-10"
                />
              </div>
            )}
            
            {/* Amount Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">
                  Amount ({selectedPair.marginAsset})
                </Label>
                <span className="text-xs text-muted-foreground">
                  Available: {marginBalance.toFixed(6)} {selectedPair.marginAsset}
                </span>
              </div>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="font-mono h-10"
              />
              <div className="grid grid-cols-4 gap-1">
                {[25, 50, 75, 100].map((percent) => (
                  <Button
                    key={percent}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setAmount(((marginBalance * percent) / 100).toFixed(6))}
                  >
                    {percent}%
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Leverage Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <Gauge className="h-3 w-3" />
                  Leverage
                </Label>
                <span className="text-sm font-mono font-bold text-primary">
                  {leverage}x
                </span>
              </div>
              <Slider
                value={[leverage]}
                onValueChange={(value) => setLeverage(value[0])}
                min={1}
                max={125}
                step={1}
                className="w-full"
              />
              <div className="flex flex-wrap gap-1">
                {INVERSE_LEVERAGE_PRESETS.slice(0, 8).map((lev) => (
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
            
            {/* Stop Loss / Take Profit */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-[#F6465D]" />
                  Stop Loss
                </Label>
                <Input
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  placeholder="Price"
                  className="font-mono h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <Target className="h-3 w-3 text-[#0ECB81]" />
                  Take Profit
                </Label>
                <Input
                  type="number"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                  placeholder="Price"
                  className="font-mono h-10"
                />
              </div>
            </div>
            
            {/* Position Summary */}
            <div className="rounded-lg bg-muted/50 p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Contracts</span>
                <span className="font-mono">{contracts.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Position Value</span>
                <span className="font-mono">${positionValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Margin</span>
                <span className="font-mono">{margin.toFixed(6)} {selectedPair.marginAsset}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Est. Fee</span>
                <span className="font-mono">${estimatedFee.toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Liq. Price</span>
                <span className={cn(
                  "font-mono",
                  direction === "LONG" ? "text-[#F6465D]" : "text-[#0ECB81]"
                )}>
                  ${liquidationPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </ScrollArea>
        
        {/* Submit Button - Fixed at bottom */}
        <div className="pt-2 border-t">
          <Button
            className={cn(
              "w-full h-12 text-base font-medium",
              direction === "LONG" && "bg-[#0ECB81] hover:bg-[#0ECB81]/90",
              direction === "SHORT" && "bg-[#F6465D] hover:bg-[#F6465D]/90"
            )}
            onClick={handleSubmit}
            disabled={isSubmitting || !account || amountNum <= 0 || amountNum > marginBalance}
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
