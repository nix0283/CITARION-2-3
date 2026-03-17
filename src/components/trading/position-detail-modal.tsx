"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  Gauge,
  Clock,
  DollarSign,
  Activity,
  Shield,
  XCircle,
  CheckCircle,
  ArrowUpDown,
  Loader2,
  Trash2,
  Pencil,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { TradingPosition } from "@/hooks/use-positions";
import { getPnlColorClass, formatPnlPercent } from "@/hooks/use-positions";
import { getExchangeDisplayName, getExchangeBadgeColor } from "@/hooks/use-accounts";

interface PositionDetailModalProps {
  position: TradingPosition;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

export function PositionDetailModal({
  position,
  open,
  onOpenChange,
  onClose,
}: PositionDetailModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  
  // Editable fields
  const [stopLoss, setStopLoss] = useState(position.stopLoss?.toString() || "");
  const [takeProfit, setTakeProfit] = useState(position.takeProfit?.toString() || "");
  const [trailingStop, setTrailingStop] = useState("");
  const [trailingPercent, setTrailingPercent] = useState("");
  
  // PnL calculation
  const pnlPercent = position.avgEntryPrice > 0 && position.currentPrice
    ? ((position.currentPrice - position.avgEntryPrice) / position.avgEntryPrice) * 100 * position.leverage * (position.direction === "LONG" ? 1 : -1)
    : 0;
  
  // Liquidation price calculation
  const liquidationPrice = position.avgEntryPrice > 0
    ? position.direction === "LONG"
      ? position.avgEntryPrice * (1 - 1 / position.leverage + 0.004)
      : position.avgEntryPrice * (1 + 1 / position.leverage - 0.004)
    : 0;
  
  // Position age
  const positionAge = () => {
    const createdAt = new Date(position.createdAt);
    const now = new Date();
    const diffMs = now.getTime() - createdAt.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays}d ${diffHours % 24}h`;
    return `${diffHours}h ${Math.floor((diffMs / (1000 * 60)) % 60)}m`;
  };
  
  // Handle close position
  const handleClosePosition = async () => {
    setIsClosing(true);
    
    try {
      const response = await fetch("/api/trade/close", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          positionId: position.id,
          closeReason: "MANUAL",
          quantity: position.totalAmount,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success(`Position closed: ${position.symbol}`);
        onClose();
      } else {
        toast.error(data.error || "Failed to close position");
      }
    } catch (error) {
      console.error("Close position error:", error);
      toast.error("Failed to close position");
    } finally {
      setIsClosing(false);
    }
  };
  
  // Handle update SL/TP
  const handleUpdate = async () => {
    setIsUpdating(true);
    
    try {
      const response = await fetch("/api/trading/unified/positions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          positionId: position.id,
          stopLoss: stopLoss ? parseFloat(stopLoss) : null,
          takeProfit: takeProfit ? parseFloat(takeProfit) : null,
          trailingStop: trailingPercent ? parseFloat(trailingPercent) : null,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success("Position updated successfully");
        onClose();
      } else {
        toast.error(data.error || "Failed to update position");
      }
    } catch (error) {
      console.error("Update position error:", error);
      toast.error("Failed to update position");
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge 
                variant="outline" 
                className={cn("text-xs", getExchangeBadgeColor(position.exchangeId))}
              >
                {getExchangeDisplayName(position.exchangeId)}
              </Badge>
              <DialogTitle className="text-base">{position.symbol}</DialogTitle>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs",
                  position.direction === "LONG"
                    ? "text-[#0ECB81] border-[#0ECB81]/30"
                    : "text-[#F6465D] border-[#F6465D]/30"
                )}
              >
                {position.direction}
              </Badge>
              <span className="text-xs text-muted-foreground">{position.leverage}x</span>
            </div>
            <div className={cn(
              "text-right font-mono font-bold",
              getPnlColorClass(position.unrealizedPnl)
            )}>
              <div className="text-base">
                {position.unrealizedPnl >= 0 ? "+" : ""}${position.unrealizedPnl.toFixed(2)}
              </div>
              <div className="text-[10px]">
                {formatPnlPercent(pnlPercent)}
              </div>
            </div>
          </div>
          <DialogDescription className="sr-only">
            Position details for {position.symbol}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="px-4 pt-2 border-b">
            <TabsList className="w-full grid grid-cols-3 h-9">
              <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
              <TabsTrigger value="edit" className="text-xs">Edit SL/TP</TabsTrigger>
              <TabsTrigger value="history" className="text-xs">History</TabsTrigger>
            </TabsList>
          </div>
          
          <ScrollArea className="max-h-[400px]">
            {/* Details Tab */}
            <TabsContent value="details" className="p-4 space-y-4 m-0">
              {/* Price Information */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="text-xs text-muted-foreground mb-1">Entry Price</div>
                  <div className="font-mono font-medium">${position.avgEntryPrice.toFixed(4)}</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="text-xs text-muted-foreground mb-1">Mark Price</div>
                  <div className="font-mono font-medium">${(position.currentPrice || 0).toFixed(4)}</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="text-xs text-muted-foreground mb-1">Liquidation Price</div>
                  <div className={cn(
                    "font-mono font-medium",
                    position.direction === "LONG" ? "text-[#F6465D]" : "text-[#0ECB81]"
                  )}>
                    ${liquidationPrice.toFixed(4)}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="text-xs text-muted-foreground mb-1">Position Age</div>
                  <div className="font-mono font-medium">{positionAge()}</div>
                </div>
              </div>
              
              <Separator />
              
              {/* Position Details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    Quantity
                  </span>
                  <span className="font-mono">{position.totalAmount.toFixed(6)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    Position Value
                  </span>
                  <span className="font-mono">${(position.totalAmount * (position.currentPrice || 0)).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Gauge className="h-3 w-3" />
                    Leverage
                  </span>
                  <span className="font-mono">{position.leverage}x</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Margin Mode
                  </span>
                  <span className="font-mono">Isolated</span>
                </div>
              </div>
              
              <Separator />
              
              {/* Risk Management */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">Risk Management</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 text-[#F6465D]" />
                      Stop Loss
                    </span>
                    <span className="font-mono">
                      {position.stopLoss ? `$${position.stopLoss.toFixed(2)}` : "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Target className="h-3 w-3 text-[#0ECB81]" />
                      Take Profit
                    </span>
                    <span className="font-mono">
                      {position.takeProfit ? `$${position.takeProfit.toFixed(2)}` : "—"}
                    </span>
                  </div>
                </div>
                {position.trailingStop && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Trailing Stop</span>
                    <Badge variant="outline" className="text-xs">
                      {position.trailingStop}
                    </Badge>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Edit Tab */}
            <TabsContent value="edit" className="p-4 space-y-4 m-0">
              <div className="space-y-4">
                {/* Stop Loss */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3 text-[#F6465D]" />
                    Stop Loss
                  </Label>
                  <Input
                    type="number"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    placeholder="Stop loss price"
                    className="font-mono"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Current: {position.stopLoss ? `$${position.stopLoss.toFixed(2)}` : "Not set"}
                  </p>
                </div>
                
                {/* Take Profit */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                    <Target className="h-3 w-3 text-[#0ECB81]" />
                    Take Profit
                  </Label>
                  <Input
                    type="number"
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.value)}
                    placeholder="Take profit price"
                    className="font-mono"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Current: {position.takeProfit ? `$${position.takeProfit.toFixed(2)}` : "Not set"}
                  </p>
                </div>
                
                <Separator />
                
                {/* Trailing Stop */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                    <ArrowUpDown className="h-3 w-3" />
                    Trailing Stop (%)
                  </Label>
                  <Input
                    type="number"
                    value={trailingPercent}
                    onChange={(e) => setTrailingPercent(e.target.value)}
                    placeholder="e.g., 2.5 for 2.5%"
                    className="font-mono"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Position will automatically move SL as price moves in profit direction
                  </p>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleUpdate}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Pencil className="h-4 w-4 mr-2" />
                      Update Position
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
            
            {/* History Tab */}
            <TabsContent value="history" className="p-4 space-y-4 m-0">
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-10 w-10 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Trade History</p>
                <p className="text-xs mt-1">Position history will be shown here</p>
              </div>
              
              {/* Placeholder for actual trade history */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm p-2 rounded bg-muted/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#0ECB81]" />
                    <span>Position Opened</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(position.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm p-2 rounded bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span>Leverage Set: {position.leverage}x</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(position.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
        
        {/* Footer with Close Button */}
        <DialogFooter className="p-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleClosePosition}
            disabled={isClosing}
            className="bg-[#F6465D] hover:bg-[#F6465D]/90"
          >
            {isClosing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Closing...
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 mr-2" />
                Close Position
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
