"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Flame,
  Clock,
  Activity,
  AlertTriangle,
  Wifi,
  WifiOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface FundingRateData {
  symbol: string;
  exchange: string;
  rate: number;
  ratePercent: string;
  annualizedRate: number;
  markPrice?: number;
  indexPrice?: number;
  heatLevel: "low" | "medium" | "high" | "critical";
  heatScore: number;
  timestamp: string;
}

interface FundingStats {
  totalRates: number;
  positiveCount: number;
  negativeCount: number;
  highHeatCount: number;
  avgRate: number;
}

// Exchange display names
const EXCHANGE_NAMES: Record<string, string> = {
  binance: "Binance",
  bybit: "Bybit",
  okx: "OKX",
  bitget: "Bitget",
  bingx: "BingX",
  kucoin: "KuCoin",
};

// Exchange colors
const EXCHANGE_COLORS: Record<string, string> = {
  binance: "text-[#F0B90B]",
  bybit: "text-[#00D4FF]",
  okx: "text-[#00D092]",
  bitget: "text-[#00EF8F]",
  bingx: "text-[#00D4AA]",
  kucoin: "text-[#00AB6E]",
};

export function FundingPanel() {
  const [fundingRates, setFundingRates] = useState<FundingRateData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Filters
  const [selectedExchange, setSelectedExchange] = useState<string>("all");
  const [selectedSymbol, setSelectedSymbol] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"rate" | "symbol" | "exchange">("rate");
  const [sortDesc, setSortDesc] = useState(true);

  // Get unique exchanges and symbols from data
  const exchanges = useMemo(() => {
    const unique = [...new Set(fundingRates.map((f) => f.exchange))];
    return unique.sort();
  }, [fundingRates]);

  const symbols = useMemo(() => {
    const unique = [...new Set(fundingRates.map((f) => f.symbol))];
    return unique.sort();
  }, [fundingRates]);

  // Filter and sort rates
  const filteredRates = useMemo(() => {
    let result = [...fundingRates];

    if (selectedExchange !== "all") {
      result = result.filter((f) => f.exchange === selectedExchange);
    }
    if (selectedSymbol !== "all") {
      result = result.filter((f) => f.symbol === selectedSymbol);
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "rate") {
        cmp = a.rate - b.rate;
      } else if (sortBy === "symbol") {
        cmp = a.symbol.localeCompare(b.symbol);
      } else if (sortBy === "exchange") {
        cmp = a.exchange.localeCompare(b.exchange);
      }
      return sortDesc ? -cmp : cmp;
    });

    return result;
  }, [fundingRates, selectedExchange, selectedSymbol, sortBy, sortDesc]);

  // Calculate stats
  const stats: FundingStats = useMemo(() => {
    const rates = filteredRates.map((f) => f.rate);
    return {
      totalRates: filteredRates.length,
      positiveCount: filteredRates.filter((f) => f.rate > 0).length,
      negativeCount: filteredRates.filter((f) => f.rate < 0).length,
      highHeatCount: filteredRates.filter(
        (f) => f.heatLevel === "high" || f.heatLevel === "critical"
      ).length,
      avgRate: rates.length > 0 ? rates.reduce((a, b) => a + b, 0) / rates.length : 0,
    };
  }, [filteredRates]);

  // Fetch funding rates from API
  const fetchFundingRates = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Try funding-service through Next.js API proxy
      const response = await fetch("/api/funding/live");
      const data = await response.json();

      if (data.success && Array.isArray(data.rates) && data.rates.length > 0) {
        setFundingRates(data.rates);
        setLastUpdate(new Date());
        setIsConnected(true);
      } else {
        // Fallback to main app API
        const fallbackResponse = await fetch("/api/funding");
        const fallbackData = await fallbackResponse.json();
        
        if (fallbackData.success && Array.isArray(fallbackData.rates) && fallbackData.rates.length > 0) {
          setFundingRates(fallbackData.rates);
          setLastUpdate(new Date());
          setIsConnected(true);
        } else {
          setFundingRates([]);
          setIsConnected(false);
        }
      }
    } catch (err) {
      console.error("Failed to fetch funding rates:", err);
      setError("Connection error");
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch and polling
  useEffect(() => {
    fetchFundingRates();

    // Poll every 30 seconds for updates
    const interval = setInterval(fetchFundingRates, 30000);

    return () => clearInterval(interval);
  }, [fetchFundingRates]);

  // Format helpers
  const formatRate = (rate: number) => {
    const percent = rate * 100;
    return `${percent >= 0 ? "+" : ""}${percent.toFixed(4)}%`;
  };

  const formatAnnualized = (rate: number) => {
    return `${rate >= 0 ? "+" : ""}${rate.toFixed(2)}%`;
  };

  const getHeatBadge = (level: string) => {
    const styles: Record<string, string> = {
      low: "bg-[#0ECB81]/10 text-[#0ECB81] border-[#0ECB81]/30",
      medium: "bg-[#F0B90B]/10 text-[#F0B90B] border-[#F0B90B]/30",
      high: "bg-orange-500/10 text-orange-500 border-orange-500/30",
      critical: "bg-[#F6465D]/10 text-[#F6465D] border-[#F6465D]/30",
    };
    return styles[level] || styles.low;
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Funding Rates</h2>
          <Badge variant="outline" className="text-xs">
            {filteredRates.length} rates
          </Badge>
          {isConnected ? (
            <Badge className="bg-[#0ECB81]/10 text-[#0ECB81] text-[10px]">
              <Wifi className="h-3 w-3 mr-1" />
              Live
            </Badge>
          ) : (
            <Badge className="bg-[#F6465D]/10 text-[#F6465D] text-[10px]">
              <WifiOff className="h-3 w-3 mr-1" />
              Offline
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Symbol Filter */}
          <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Symbol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все символы</SelectItem>
              {symbols.map((sym) => (
                <SelectItem key={sym} value={sym}>
                  {sym}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Exchange Filter */}
          <Select value={selectedExchange} onValueChange={setSelectedExchange}>
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue placeholder="Exchange" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все биржи</SelectItem>
              {exchanges.map((ex) => (
                <SelectItem key={ex} value={ex}>
                  {EXCHANGE_NAMES[ex] || ex}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchFundingRates}
            disabled={isLoading}
          >
            <RefreshCw className={cn("h-3.5 w-3.5 mr-1", isLoading && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-[#0ECB81]/10">
              <TrendingUp className="h-4 w-4 text-[#0ECB81]" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Positive</div>
              <div className="font-semibold">{stats.positiveCount}</div>
            </div>
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-[#F6465D]/10">
              <TrendingDown className="h-4 w-4 text-[#F6465D]" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Negative</div>
              <div className="font-semibold">{stats.negativeCount}</div>
            </div>
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-[#F0B90B]/10">
              <Flame className="h-4 w-4 text-[#F0B90B]" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">High Heat</div>
              <div className="font-semibold">{stats.highHeatCount}</div>
            </div>
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-blue-500/10">
              <Activity className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Avg Rate</div>
              <div
                className={cn(
                  "font-semibold",
                  stats.avgRate >= 0 ? "text-[#0ECB81]" : "text-[#F6465D]"
                )}
              >
                {formatRate(stats.avgRate)}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-muted">
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Updated</div>
              <div className="font-semibold text-xs">
                {lastUpdate ? lastUpdate.toLocaleTimeString() : "-"}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Error State */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded bg-[#F6465D]/10 text-[#F6465D] text-sm">
          <AlertTriangle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Funding Rates Table */}
      <Card className="flex-1 min-h-0">
        <CardContent className="p-0">
          {isLoading && fundingRates.length === 0 ? (
            <div className="flex items-center justify-center h-[300px]">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredRates.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
              <Activity className="h-12 w-12 mb-2 opacity-50" />
              <p className="text-sm">Нет данных о funding rate</p>
              <p className="text-xs mt-1">WebSocket подключается к биржам...</p>
            </div>
          ) : (
            <ScrollArea className="h-[400px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-card z-10">
                  <tr className="border-b border-border bg-muted/50">
                    <th
                      className="text-left text-xs font-medium text-muted-foreground p-3 cursor-pointer hover:bg-muted/80"
                      onClick={() => {
                        if (sortBy === "symbol") setSortDesc(!sortDesc);
                        else {
                          setSortBy("symbol");
                          setSortDesc(false);
                        }
                      }}
                    >
                      Symbol {sortBy === "symbol" && (sortDesc ? "↓" : "↑")}
                    </th>
                    <th
                      className="text-left text-xs font-medium text-muted-foreground p-3 cursor-pointer hover:bg-muted/80"
                      onClick={() => {
                        if (sortBy === "exchange") setSortDesc(!sortDesc);
                        else {
                          setSortBy("exchange");
                          setSortDesc(false);
                        }
                      }}
                    >
                      Exchange {sortBy === "exchange" && (sortDesc ? "↓" : "↑")}
                    </th>
                    <th
                      className="text-right text-xs font-medium text-muted-foreground p-3 cursor-pointer hover:bg-muted/80"
                      onClick={() => {
                        if (sortBy === "rate") setSortDesc(!sortDesc);
                        else {
                          setSortBy("rate");
                          setSortDesc(true);
                        }
                      }}
                    >
                      Funding Rate {sortBy === "rate" && (sortDesc ? "↓" : "↑")}
                    </th>
                    <th className="text-right text-xs font-medium text-muted-foreground p-3">
                      Annualized
                    </th>
                    <th className="text-right text-xs font-medium text-muted-foreground p-3">
                      Mark Price
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">
                      Heat
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRates.map((rate, i) => (
                    <tr
                      key={`${rate.symbol}-${rate.exchange}-${i}`}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-3 font-medium text-sm">{rate.symbol}</td>
                      <td className="p-3">
                        <span
                          className={cn(
                            "text-xs font-medium",
                            EXCHANGE_COLORS[rate.exchange] || "text-muted-foreground"
                          )}
                        >
                          {EXCHANGE_NAMES[rate.exchange] || rate.exchange}
                        </span>
                      </td>
                      <td
                        className={cn(
                          "p-3 text-right font-mono text-sm",
                          rate.rate >= 0 ? "text-[#0ECB81]" : "text-[#F6465D]"
                        )}
                      >
                        {formatRate(rate.rate)}
                      </td>
                      <td
                        className={cn(
                          "p-3 text-right text-sm",
                          rate.annualizedRate >= 0 ? "text-[#0ECB81]" : "text-[#F6465D]"
                        )}
                      >
                        {formatAnnualized(rate.annualizedRate)}
                      </td>
                      <td className="p-3 text-right font-mono text-sm text-muted-foreground">
                        {rate.markPrice
                          ? `$${rate.markPrice.toLocaleString("en-US", {
                              maximumFractionDigits: 2,
                            })}`
                          : "-"}
                      </td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className={cn("text-[10px]", getHeatBadge(rate.heatLevel))}
                        >
                          {rate.heatLevel.toUpperCase()}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Warning for high heat */}
      {stats.highHeatCount > 0 && (
        <div className="flex items-center gap-2 p-3 rounded bg-[#F0B90B]/10 text-[#F0B90B] text-sm">
          <AlertTriangle className="h-4 w-4" />
          <span>
            {stats.highHeatCount} символ(ов) с высоким funding rate. Проверьте позиции.
          </span>
        </div>
      )}
    </div>
  );
}
