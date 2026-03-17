"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  Loader2,
  ArrowDownToLine,
  ArrowUpFromLine,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { TradingMode, TradingAccount } from "@/hooks/use-accounts";
import { useRealtimePrice } from "@/hooks/use-realtime-prices";

// Common spot trading pairs
const SPOT_PAIRS = [
  { symbol: "BTCUSDT", name: "BTC/USDT", baseAsset: "BTC", quoteAsset: "USDT" },
  { symbol: "ETHUSDT", name: "ETH/USDT", baseAsset: "ETH", quoteAsset: "USDT" },
  { symbol: "BNBUSDT", name: "BNB/USDT", baseAsset: "BNB", quoteAsset: "USDT" },
  { symbol: "SOLUSDT", name: "SOL/USDT", baseAsset: "SOL", quoteAsset: "USDT" },
  { symbol: "XRPUSDT", name: "XRP/USDT", baseAsset: "XRP", quoteAsset: "USDT" },
  { symbol: "ADAUSDT", name: "ADA/USDT", baseAsset: "ADA", quoteAsset: "USDT" },
  { symbol: "DOGEUSDT", name: "DOGE/USDT", baseAsset: "DOGE", quoteAsset: "USDT" },
  { symbol: "MATICUSDT", name: "MATIC/USDT", baseAsset: "MATIC", quoteAsset: "USDT" },
  { symbol: "LINKUSDT", name: "LINK/USDT", baseAsset: "LINK", quoteAsset: "USDT" },
  { symbol: "AVAXUSDT", name: "AVAX/USDT", baseAsset: "AVAX", quoteAsset: "USDT" },
];

interface SpotTradingFormProps {
  mode: TradingMode;
  account: TradingAccount | null;
  onOrderSuccess?: () => void;
}

export function SpotTradingForm({ mode, account, onOrderSuccess }: SpotTradingFormProps) {
  // Trading pair selection
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [showPairSelector, setShowPairSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Order settings
  const [orderType, setOrderType] = useState<"market" | "limit" | "stop_limit">("market");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [stopPrice, setStopPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get real-time price
  const priceData = useRealtimePrice(symbol);
  const currentPrice = priceData?.price || 0;
  const priceChange = priceData?.change24h || 0;
  
  // Get selected pair info
  const selectedPair = SPOT_PAIRS.find(p => p.symbol === symbol) || SPOT_PAIRS[0];
  
  // Filter pairs by search
  const filteredPairs = useMemo(() => {
    if (!searchQuery) return SPOT_PAIRS;
    const query = searchQuery.toLowerCase();
    return SPOT_PAIRS.filter(
      p => p.symbol.toLowerCase().includes(query) || p.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);
  
  // Calculate totals
  const amountNum = parseFloat(amount) || 0;
  const priceNum = parseFloat(price) || currentPrice;
  const total = amountNum * priceNum;
  const estimatedFee = total * 0.001; // 0.1% for spot
  
  // Available balance (mock - would come from account in real app)
  const baseBalance = 0.5; // BTC
  const quoteBalance = account?.balance || 10000; // USDT
  
  // Handle pair selection
  const handlePairSelect = (pair: typeof SPOT_PAIRS[0]) => {
    setSymbol(pair.symbol);
    setShowPairSelector(false);
    setSearchQuery("");
  };
  
  // Handle order submission
  const handleBuy = async () => {
    if (!account) {
      toast.error("No account selected");
      return;
    }
    
    if (amountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (total > quoteBalance) {
      toast.error("Insufficient USDT balance");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/trade/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol,
          side: "BUY",
          amount: amountNum,
          orderType,
          price: orderType !== "market" ? priceNum : undefined,
          triggerPrice: orderType === "stop_limit" ? parseFloat(stopPrice) : undefined,
          stopLoss: stopLoss || null,
          takeProfit: takeProfit || null,
          isDemo: mode !== "LIVE",
          accountId: account.id,
          exchangeId: account.exchangeId,
          tradingMode: mode,
          marketType: "spot",
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success(`Buy order placed: ${amountNum} ${selectedPair.baseAsset}`);
        setAmount("");
        setPrice("");
        setStopPrice("");
        setStopLoss("");
        setTakeProfit("");
        onOrderSuccess?.();
      } else {
        toast.error(data.error || "Failed to place order");
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to submit order");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSell = async () => {
    if (!account) {
      toast.error("No account selected");
      return;
    }
    
    if (amountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (amountNum > baseBalance) {
      toast.error(`Insufficient ${selectedPair.baseAsset} balance`);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/trade/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol,
          side: "SELL",
          amount: amountNum,
          orderType,
          price: orderType !== "market" ? priceNum : undefined,
          triggerPrice: orderType === "stop_limit" ? parseFloat(stopPrice) : undefined,
          stopLoss: stopLoss || null,
          takeProfit: takeProfit || null,
          isDemo: mode !== "LIVE",
          accountId: account.id,
          exchangeId: account.exchangeId,
          tradingMode: mode,
          marketType: "spot",
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success(`Sell order placed: ${amountNum} ${selectedPair.baseAsset}`);
        setAmount("");
        setPrice("");
        setStopPrice("");
        setStopLoss("");
        setTakeProfit("");
        onOrderSuccess?.();
      } else {
        toast.error(data.error || "Failed to place order");
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
            <CardTitle className="text-base">Spot Trading</CardTitle>
            <CardDescription>Buy and sell crypto directly</CardDescription>
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
              <Label className="text-xs text-muted-foreground">Trading Pair</Label>
              <button
                className="w-full flex items-center justify-between h-11 px-3 rounded-md border border-input bg-background hover:bg-accent"
                onClick={() => setShowPairSelector(!showPairSelector)}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{selectedPair.name}</span>
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
              
              {showPairSelector && (
                <div className="absolute z-50 w-[calc(100%-48px)] mt-1 bg-popover border rounded-lg shadow-lg">
                  <div className="p-2 border-b">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search pairs..."
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
                          <span className="font-medium">{pair.name}</span>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
            
            {/* Balance Display */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-muted/50">
                <div className="text-xs text-muted-foreground">{selectedPair.baseAsset}</div>
                <div className="font-mono font-medium">{baseBalance.toFixed(6)}</div>
              </div>
              <div className="p-2 rounded-lg bg-muted/50">
                <div className="text-xs text-muted-foreground">{selectedPair.quoteAsset}</div>
                <div className="font-mono font-medium">{quoteBalance.toFixed(2)}</div>
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
            
            {/* Price Input (for Limit/Stop-Limit) */}
            {orderType !== "market" && (
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Price ({selectedPair.quoteAsset})</Label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
                <Label className="text-xs text-muted-foreground">Amount ({selectedPair.baseAsset})</Label>
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
                    onClick={() => setAmount(((baseBalance * percent) / 100).toFixed(6))}
                  >
                    {percent}%
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Total */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-mono font-medium">{total.toFixed(2)} {selectedPair.quoteAsset}</span>
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
            
            {/* Fee Display */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Est. Fee (0.1%)</span>
              <span className="font-mono">{estimatedFee.toFixed(4)} {selectedPair.quoteAsset}</span>
            </div>
          </div>
        </ScrollArea>
        
        {/* Submit Buttons - Fixed at bottom */}
        <div className="pt-2 border-t grid grid-cols-2 gap-2">
          <Button
            className="h-12 text-base font-medium bg-[#0ECB81] hover:bg-[#0ECB81]/90"
            onClick={handleBuy}
            disabled={isSubmitting || !account || amountNum <= 0 || total > quoteBalance}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <ArrowDownToLine className="mr-2 h-4 w-4" />
                Buy
              </>
            )}
          </Button>
          <Button
            className="h-12 text-base font-medium bg-[#F6465D] hover:bg-[#F6465D]/90"
            onClick={handleSell}
            disabled={isSubmitting || !account || amountNum <= 0 || amountNum > baseBalance}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <ArrowUpFromLine className="mr-2 h-4 w-4" />
                Sell
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
