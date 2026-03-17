"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ExternalLink,
  Zap,
  FlaskConical,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { useAccounts, TradingMode, MarketType, getExchangeDisplayName, getExchangeBadgeColor } from "@/hooks/use-accounts";
import { usePositions, TradingPosition } from "@/hooks/use-positions";
import { FuturesTradingForm } from "./futures-trading-form";
import { SpotTradingForm } from "./spot-trading-form";
import { InverseTradingForm } from "./inverse-trading-form";
import { PositionList } from "./position-list";
import { PositionDetailModal } from "./position-detail-modal";

// Mode tab configuration
const MODE_TABS: { value: TradingMode; label: string; icon: typeof Zap; color: string }[] = [
  { value: "LIVE", label: "LIVE", icon: TrendingUp, color: "text-red-500" },
  { value: "DEMO", label: "DEMO", icon: Zap, color: "text-purple-500" },
  { value: "PAPER", label: "PAPER", icon: FlaskConical, color: "text-blue-500" },
];

// Market type tab configuration
const MARKET_TABS: { value: MarketType; label: string }[] = [
  { value: "futures", label: "Futures" },
  { value: "spot", label: "Spot" },
  { value: "inverse", label: "Inverse" },
];

interface TradingPageProps {
  initialMode?: TradingMode;
  initialMarketType?: MarketType;
}

export function TradingPage({ 
  initialMode = "PAPER", 
  initialMarketType = "futures" 
}: TradingPageProps) {
  // Mode and market type state
  const [mode, setMode] = useState<TradingMode>(initialMode);
  const [marketType, setMarketType] = useState<MarketType>(initialMarketType);
  
  // Account selection
  const {
    accounts,
    selectedAccount,
    setSelectedAccount,
    isLoading: accountsLoading,
    hasMultipleAccounts,
    hasNoAccount,
    refetch: refetchAccounts,
  } = useAccounts({ mode, marketType });
  
  // Positions
  const {
    positions,
    isLoading: positionsLoading,
    lastUpdated,
    refetch: refetchPositions,
  } = usePositions({ 
    mode, 
    marketType, 
    accountId: selectedAccount?.id 
  });
  
  // Position detail modal
  const [selectedPosition, setSelectedPosition] = useState<TradingPosition | null>(null);
  const [showPositionModal, setShowPositionModal] = useState(false);
  
  // Handle mode change
  const handleModeChange = (newMode: TradingMode) => {
    setMode(newMode);
    setSelectedAccount(null);
  };
  
  // Handle market type change
  const handleMarketTypeChange = (newType: MarketType) => {
    setMarketType(newType);
    setSelectedAccount(null);
  };
  
  // Handle position click
  const handlePositionClick = (position: TradingPosition) => {
    setSelectedPosition(position);
    setShowPositionModal(true);
  };
  
  // Refresh all data
  const handleRefresh = async () => {
    await Promise.all([refetchAccounts(), refetchPositions()]);
    toast.success("Data refreshed");
  };
  
  // Render trading form based on market type
  const renderTradingForm = () => {
    if (hasNoAccount) {
      return (
        <Card>
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
    
    if (accountsLoading) {
      return (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      );
    }
    
    const commonProps = {
      mode,
      account: selectedAccount,
      onOrderSuccess: () => {
        refetchPositions();
      },
    };
    
    switch (marketType) {
      case "futures":
        return <FuturesTradingForm {...commonProps} />;
      case "spot":
        return <SpotTradingForm {...commonProps} />;
      case "inverse":
        return <InverseTradingForm {...commonProps} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Trading</h2>
          <Badge variant="outline" className={cn(
            "text-xs",
            mode === "LIVE" && "text-red-500 border-red-500/30",
            mode === "DEMO" && "text-purple-500 border-purple-500/30",
            mode === "PAPER" && "text-blue-500 border-blue-500/30",
          )}>
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
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Mode Tabs - Main Level */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-muted/50 rounded-lg p-1">
          {MODE_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = mode === tab.value;
            return (
              <Button
                key={tab.value}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "h-8 text-xs px-3 gap-1",
                  isActive && tab.color,
                  isActive && "bg-background shadow-sm",
                )}
                onClick={() => handleModeChange(tab.value)}
              >
                <Icon className="h-3 w-3" />
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>
      
      {/* Market Type Tabs - Sub Level */}
      <div className="flex items-center gap-4 border-b border-border">
        {MARKET_TABS.map((tab) => {
          const isActive = marketType === tab.value;
          return (
            <button
              key={tab.value}
              className={cn(
                "pb-2 text-sm font-medium transition-colors border-b-2",
                isActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
              onClick={() => handleMarketTypeChange(tab.value)}
            >
              {tab.label}
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
          {renderTradingForm()}
        </div>
        
        {/* Positions List - Right Side */}
        <div className="lg:col-span-1 min-h-0">
          <PositionList
            positions={positions}
            isLoading={positionsLoading}
            mode={mode}
            marketType={marketType}
            onPositionClick={handlePositionClick}
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
