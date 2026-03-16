"use client";

import { useState, useEffect, useCallback } from "react";
import { useCryptoStore } from "@/stores/crypto-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  TrendingUp,
  TrendingDown,
  Calculator,
  Percent,
  AlertTriangle,
  Building2,
  Settings,
  Clock,
  Target,
  X,
  Edit,
  RefreshCw,
  Zap,
  ArrowRightLeft,
  Layers,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// ==================== TYPES ====================

type AccountType = "LIVE" | "DEMO" | "TESTNET" | "PAPER";
type MarketType = "futures" | "spot" | "inverse";
type OrderType = "MARKET" | "LIMIT" | "STOP_MARKET" | "STOP_LIMIT" | "TAKE_PROFIT_MARKET" | "TAKE_PROFIT_LIMIT";
type TriggerType = "MARK_PRICE" | "LAST_PRICE" | "INDEX_PRICE";
type TimeInForce = "GTC" | "IOC" | "FOK" | "GTX";

interface TradingAccount {
  id: string;
  exchangeId: string;
  exchangeName: string;
  marketType: MarketType;
  accountType: AccountType;
  isActive: boolean;
  balance?: number;
  currency?: string;
}

interface Position {
  id: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  leverage: number;
  margin: number;
  unrealizedPnl: number;
  unrealizedPnlPercent: number;
  stopLoss: number | null;
  takeProfit: number | null;
  liquidationPrice: number | null;
  openedAt: string;
  exchangeId?: string;
  exchangeName?: string;
  marketType?: MarketType;
}

interface PendingOrder {
  id: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  orderType: OrderType;
  price: number | null;
  stopPrice: number | null;
  quantity: number;
  status: string;
  createdAt: string;
}

// ==================== CONSTANTS ====================

const ACCOUNT_TYPE_CONFIG: Record<AccountType, { label: string; color: string; bgColor: string; borderColor: string; description: string }> = {
  LIVE: {
    label: "LIVE",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    description: "Реальная торговля",
  },
  DEMO: {
    label: "DEMO",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    description: "Демо режим биржи",
  },
  TESTNET: {
    label: "TESTNET",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    description: "Тестовая сеть",
  },
  PAPER: {
    label: "PAPER",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    description: "Виртуальная торговля",
  },
};

const MARKET_TYPE_CONFIG: Record<MarketType, { label: string; description: string }> = {
  futures: {
    label: "Futures",
    description: "Бессрочные контракты с плечом",
  },
  spot: {
    label: "Spot",
    description: "Спотовая торговля",
  },
  inverse: {
    label: "Inverse",
    description: "Инверсные контракты",
  },
};

// Order type configurations
const ORDER_TYPE_CONFIG: Record<string, { label: string; description: string; needsPrice: boolean; needsStopPrice: boolean }> = {
  MARKET: {
    label: "Market",
    description: "По текущей рыночной цене",
    needsPrice: false,
    needsStopPrice: false,
  },
  LIMIT: {
    label: "Limit",
    description: "По указанной цене или лучше",
    needsPrice: true,
    needsStopPrice: false,
  },
  STOP_MARKET: {
    label: "Stop Market",
    description: "Рыночный ордер при достижении стоп-цены",
    needsPrice: false,
    needsStopPrice: true,
  },
  STOP_LIMIT: {
    label: "Stop Limit",
    description: "Лимитный ордер при достижении стоп-цены",
    needsPrice: true,
    needsStopPrice: true,
  },
  TAKE_PROFIT_MARKET: {
    label: "TP Market",
    description: "Рыночный ордер при достижении TP цены",
    needsPrice: false,
    needsStopPrice: true,
  },
  TAKE_PROFIT_LIMIT: {
    label: "TP Limit",
    description: "Лимитный ордер при достижении TP цены",
    needsPrice: true,
    needsStopPrice: true,
  },
};

const TRIGGER_TYPE_CONFIG: Record<TriggerType, { label: string }> = {
  MARK_PRICE: { label: "Mark Price" },
  LAST_PRICE: { label: "Last Price" },
  INDEX_PRICE: { label: "Index Price" },
};

const TIME_IN_FORCE_CONFIG: Record<TimeInForce, { label: string; description: string }> = {
  GTC: { label: "GTC", description: "Good Till Cancel - до отмены" },
  IOC: { label: "IOC", description: "Immediate or Cancel - исполнить немедленно или отменить" },
  FOK: { label: "FOK", description: "Fill or Kill - исполнить полностью или отменить" },
  GTX: { label: "GTX", description: "Good Till Crossing - только мейкер" },
};

const TRADING_PAIRS = [
  "BTCUSDT",
  "ETHUSDT",
  "BNBUSDT",
  "SOLUSDT",
  "XRPUSDT",
  "DOGEUSDT",
  "ADAUSDT",
  "AVAXUSDT",
  "DOTUSDT",
  "MATICUSDT",
];

const LEVERAGE_OPTIONS = [1, 2, 3, 5, 10, 20, 50, 100];

// ==================== HELPER FUNCTIONS ====================

function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

function formatTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" });
}

// ==================== MAIN COMPONENT ====================

export function TradingForm() {
  const { marketPrices } = useCryptoStore();
  
  // Main tab state
  const [activeAccountType, setActiveAccountType] = useState<AccountType>("PAPER");
  const [activeMarketType, setActiveMarketType] = useState<MarketType>("futures");
  
  // Accounts state
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Trading form state
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [direction, setDirection] = useState<"LONG" | "SHORT">("LONG");
  const [orderType, setOrderType] = useState<OrderType>("MARKET");
  const [amount, setAmount] = useState("100");
  const [marginPercent, setMarginPercent] = useState(2);
  const [leverage, setLeverage] = useState(10);
  
  // Entry order fields
  const [entryPrice, setEntryPrice] = useState("");
  const [stopPrice, setStopPrice] = useState("");
  const [triggerType, setTriggerType] = useState<TriggerType>("MARK_PRICE");
  const [timeInForce, setTimeInForce] = useState<TimeInForce>("GTC");
  const [reduceOnly, setReduceOnly] = useState(false);
  const [postOnly, setPostOnly] = useState(false);
  
  // SL/TP for position
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  
  // Trailing Stop
  const [enableTrailingStop, setEnableTrailingStop] = useState(false);
  const [trailingStopPercent, setTrailingStopPercent] = useState("2");
  const [trailingActivationPercent, setTrailingActivationPercent] = useState("1");
  
  // Settings
  const [useAutoTradingSettings, setUseAutoTradingSettings] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  // Positions & Orders state
  const [positions, setPositions] = useState<Position[]>([]);
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<PendingOrder | null>(null);
  const [showPositionDialog, setShowPositionDialog] = useState(false);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  
  // Selected account
  const selectedAccount = accounts.find(
    (a) => a.id === selectedAccountId && a.accountType === activeAccountType && a.marketType === activeMarketType
  );
  
  // Get accounts for current tab
  const filteredAccounts = accounts.filter(
    (a) => a.accountType === activeAccountType && a.marketType === activeMarketType
  );
  
  // Current price
  const currentPrice = marketPrices[symbol]?.price || 0;
  
  // Order type config
  const orderTypeConfig = ORDER_TYPE_CONFIG[orderType];
  
  // Auto-select account if only one available
  useEffect(() => {
    if (filteredAccounts.length === 1 && !selectedAccountId) {
      setSelectedAccountId(filteredAccounts[0].id);
    } else if (filteredAccounts.length > 1 && !selectedAccountId) {
      // Don't auto-select if multiple accounts
    } else if (filteredAccounts.length === 0) {
      setSelectedAccountId(null);
    }
  }, [filteredAccounts, selectedAccountId]);
  
  // Set default entry price when switching to limit order
  useEffect(() => {
    if (orderType === "LIMIT" && !entryPrice && currentPrice > 0) {
      setEntryPrice(currentPrice.toFixed(2));
    }
  }, [orderType, currentPrice, entryPrice]);
  
  // Fetch accounts
  const fetchAccounts = useCallback(async () => {
    try {
      const response = await fetch("/api/exchange");
      if (response.ok) {
        const data = await response.json();
        const transformedAccounts: TradingAccount[] = (data.accounts || []).map((acc: Record<string, unknown>) => {
          const rawExchangeType = (acc.exchangeType as string) || "futures";
          const marketType = rawExchangeType.split("-paper-")[0] as MarketType;
          
          let accountType: AccountType = "LIVE";
          if (rawExchangeType.includes("-paper-") || acc.accountType === "PAPER") {
            accountType = "PAPER";
          } else if (acc.isTestnet) {
            accountType = "TESTNET";
          } else if (acc.accountType === "DEMO") {
            accountType = "DEMO";
          }
          
          return {
            id: acc.id as string,
            exchangeId: acc.exchangeId as string,
            exchangeName: acc.exchangeName as string,
            marketType,
            accountType,
            isActive: acc.isActive as boolean,
          };
        });
        setAccounts(transformedAccounts);
      }
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Fetch positions and pending orders
  const fetchData = useCallback(async () => {
    if (!selectedAccountId) {
      setPositions([]);
      setPendingOrders([]);
      return;
    }
    
    try {
      const account = accounts.find((a) => a.id === selectedAccountId);
      if (account?.accountType === "PAPER") {
        // Fetch paper account data
        const response = await fetch(`/api/paper-trading/account?accountId=${selectedAccountId}`);
        if (response.ok) {
          const data = await response.json();
          const paperPositions = (data.account?.positions || []).map((pos: Record<string, unknown>) => ({
            id: pos.id as string,
            symbol: pos.symbol as string,
            direction: pos.direction as "LONG" | "SHORT",
            quantity: pos.quantity as number,
            entryPrice: pos.entryPrice as number,
            currentPrice: pos.currentPrice as number,
            leverage: pos.leverage as number,
            margin: pos.margin as number,
            unrealizedPnl: pos.unrealizedPnl as number,
            unrealizedPnlPercent: pos.unrealizedPnlPercent as number,
            stopLoss: pos.stopLoss as number | null,
            takeProfit: pos.takeProfit as number | null,
            liquidationPrice: pos.liquidationPrice as number | null,
            openedAt: pos.openedAt as string,
            exchangeId: account.exchangeId,
            exchangeName: account.exchangeName,
            marketType: account.marketType,
          }));
          setPositions(paperPositions);
          
          // Fetch pending orders
          const ordersResponse = await fetch(`/api/paper-trading/orders?accountId=${selectedAccountId}&status=PENDING`);
          if (ordersResponse.ok) {
            const ordersData = await ordersResponse.json();
            const pendingOrdersData = (ordersData.orders || []).map((o: Record<string, unknown>) => ({
              id: o.id as string,
              symbol: o.symbol as string,
              direction: o.direction as "LONG" | "SHORT",
              orderType: o.orderType as OrderType,
              price: o.price as number | null,
              stopPrice: o.stopPrice as number | null,
              quantity: o.quantity as number,
              status: o.status as string,
              createdAt: o.createdAt as string,
            }));
            setPendingOrders(pendingOrdersData);
          }
        }
      } else {
        // For other account types
        const response = await fetch(`/api/positions?accountId=${selectedAccountId}`);
        if (response.ok) {
          const data = await response.json();
          setPositions(data.positions || []);
        }
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, [selectedAccountId, accounts]);
  
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);
  
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);
  
  // Calculate position details
  const positionSize = parseFloat(amount) || 0;
  const executionPrice = orderType === "MARKET" ? currentPrice : (parseFloat(entryPrice) || currentPrice);
  const leveragedSize = positionSize * leverage;
  const marginRequired = positionSize;
  const estimatedFee = leveragedSize * 0.0004;
  
  const balance = selectedAccount?.balance || 10000;
  
  // Validate order
  const validateOrder = () => {
    if (!selectedAccountId) {
      toast.error("Выберите аккаунт для торговли");
      return false;
    }
    
    if (positionSize <= 0) {
      toast.error("Введите сумму сделки");
      return false;
    }
    
    if (positionSize > balance) {
      toast.error("Недостаточно средств");
      return false;
    }
    
    if (orderType === "LIMIT" || orderType === "STOP_LIMIT" || orderType === "TAKE_PROFIT_LIMIT") {
      if (!entryPrice || parseFloat(entryPrice) <= 0) {
        toast.error("Укажите цену для лимитного ордера");
        return false;
      }
    }
    
    if (orderType === "STOP_MARKET" || orderType === "STOP_LIMIT" || orderType === "TAKE_PROFIT_MARKET" || orderType === "TAKE_PROFIT_LIMIT") {
      if (!stopPrice || parseFloat(stopPrice) <= 0) {
        toast.error("Укажите стоп-цену для триггерного ордера");
        return false;
      }
    }
    
    if (orderType === "MARKET" && currentPrice <= 0) {
      toast.error("Не удалось получить текущую цену");
      return false;
    }
    
    return true;
  };
  
  // Handle trade submission
  const handleTrade = async () => {
    if (!validateOrder()) return;
    setShowConfirmDialog(true);
  };
  
  const confirmTrade = async () => {
    setShowConfirmDialog(false);
    setIsSubmitting(true);
    
    try {
      const account = accounts.find((a) => a.id === selectedAccountId);
      
      // Calculate quantity based on entry price or current price
      const price = orderType === "MARKET" ? currentPrice : (parseFloat(entryPrice) || currentPrice);
      const quantity = leveragedSize / price;
      
      const orderData = {
        accountId: selectedAccountId,
        symbol,
        side: direction === "LONG" ? "BUY" : "SELL",
        direction,
        orderType,
        quantity,
        price: orderTypeConfig.needsPrice ? parseFloat(entryPrice) : null,
        stopPrice: orderTypeConfig.needsStopPrice ? parseFloat(stopPrice) : null,
        leverage,
        triggerType,
        timeInForce,
        reduceOnly,
        postOnly,
        stopLoss: stopLoss ? parseFloat(stopLoss) : null,
        takeProfit: takeProfit ? parseFloat(takeProfit) : null,
      };
      
      if (account?.accountType === "PAPER") {
        const response = await fetch("/api/paper-trading/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
          const orderLabel = orderType === "MARKET" ? "позиция открыта" : "ордер создан";
          toast.success(`${orderType} ${direction} ${orderLabel}: ${symbol}`);
          fetchData();
          
          // Clear form for pending orders
          if (orderType !== "MARKET") {
            setEntryPrice("");
            setStopPrice("");
          }
        } else {
          toast.error(data.error || "Ошибка при создании ордера");
        }
      } else {
        // For other account types
        const response = await fetch("/api/trade/open", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...orderData,
            isDemo: account?.accountType !== "LIVE",
            exchangeId: account?.exchangeId,
            tradingMode: account?.accountType,
          }),
        });
        
        if (response.ok) {
          toast.success(`Ордер ${direction} создан: ${symbol}`);
          fetchData();
        } else {
          const data = await response.json();
          toast.error(data.error || "Ошибка при создании ордера");
        }
      }
    } catch (error) {
      console.error("Trade error:", error);
      toast.error("Ошибка при создании ордера");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Close position
  const handleClosePosition = async (position: Position, percentage: number = 100) => {
    try {
      const account = accounts.find((a) => a.id === selectedAccountId);
      
      if (account?.accountType === "PAPER") {
        const response = await fetch("/api/paper-trading/orders/close", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            accountId: selectedAccountId,
            positionId: position.id,
            closePercentage: percentage,
          }),
        });
        
        if (response.ok) {
          toast.success(`Позиция ${position.symbol} закрыта`);
          fetchData();
          setShowPositionDialog(false);
        } else {
          const data = await response.json();
          toast.error(data.error || "Ошибка при закрытии позиции");
        }
      }
    } catch (error) {
      console.error("Close error:", error);
      toast.error("Ошибка при закрытии позиции");
    }
  };
  
  // Cancel pending order
  const handleCancelOrder = async (order: PendingOrder) => {
    try {
      const account = accounts.find((a) => a.id === selectedAccountId);
      
      if (account?.accountType === "PAPER") {
        const response = await fetch(`/api/paper-trading/orders?orderId=${order.id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          toast.success(`Ордер ${order.symbol} отменён`);
          fetchData();
          setShowOrderDialog(false);
        } else {
          const data = await response.json();
          toast.error(data.error || "Ошибка при отмене ордера");
        }
      }
    } catch (error) {
      console.error("Cancel error:", error);
      toast.error("Ошибка при отмене ордера");
    }
  };
  
  // Update position SL/TP
  const handleUpdatePosition = async (position: Position, newSL?: number, newTP?: number) => {
    try {
      const account = accounts.find((a) => a.id === selectedAccountId);
      
      if (account?.accountType === "PAPER") {
        const response = await fetch("/api/paper-trading/positions/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            accountId: selectedAccountId,
            positionId: position.id,
            stopLoss: newSL,
            takeProfit: newTP,
          }),
        });
        
        if (response.ok) {
          toast.success("Позиция обновлена");
          fetchData();
        } else {
          const data = await response.json();
          toast.error(data.error || "Ошибка при обновлении позиции");
        }
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Ошибка при обновлении позиции");
    }
  };
  
  // Render account selector
  const renderAccountSelector = () => {
    if (filteredAccounts.length === 0) {
      return (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <div className="text-xs">
            <span className="text-amber-600 dark:text-amber-400 font-medium">
              Нет аккаунтов {ACCOUNT_TYPE_CONFIG[activeAccountType].label} {MARKET_TYPE_CONFIG[activeMarketType].label}
            </span>
            <span className="text-muted-foreground block">
              Создайте аккаунт в разделе Биржи
            </span>
          </div>
        </div>
      );
    }
    
    if (filteredAccounts.length === 1) {
      const account = filteredAccounts[0];
      return (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
          <Building2 className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <div className="font-medium text-sm">{account.exchangeName}</div>
            <div className="text-xs text-muted-foreground">
              {MARKET_TYPE_CONFIG[account.marketType].label} • {account.balance ? `$${formatNumber(account.balance)}` : "Баланс загружается..."}
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            Активен
          </Badge>
        </div>
      );
    }
    
    return (
      <Select value={selectedAccountId || ""} onValueChange={setSelectedAccountId}>
        <SelectTrigger className="min-h-11">
          <SelectValue placeholder="Выберите аккаунт" />
        </SelectTrigger>
        <SelectContent>
          {filteredAccounts.map((account) => (
            <SelectItem key={account.id} value={account.id}>
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {account.exchangeName}
                <span className="text-muted-foreground text-xs">
                  ({MARKET_TYPE_CONFIG[account.marketType].label})
                </span>
                {account.balance && (
                  <span className="text-xs">${formatNumber(account.balance)}</span>
                )}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };
  
  // Render order type selector
  const renderOrderTypeSelector = () => {
    const orderTypes: OrderType[] = activeMarketType === "spot" 
      ? ["MARKET", "LIMIT"] 
      : ["MARKET", "LIMIT", "STOP_MARKET", "STOP_LIMIT", "TAKE_PROFIT_MARKET", "TAKE_PROFIT_LIMIT"];
    
    return (
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground flex items-center gap-1">
          <Layers className="h-3 w-3" />
          Тип ордера
        </Label>
        <div className="grid grid-cols-3 gap-1">
          {orderTypes.map((type) => {
            const config = ORDER_TYPE_CONFIG[type];
            const isActive = orderType === type;
            
            return (
              <Button
                key={type}
                type="button"
                variant={isActive ? "default" : "outline"}
                size="sm"
                className={cn(
                  "h-10 text-xs flex flex-col items-center justify-center",
                  isActive && "bg-primary text-primary-foreground"
                )}
                onClick={() => setOrderType(type)}
              >
                <span className="font-medium">{config.label}</span>
              </Button>
            );
          })}
        </div>
        <p className="text-[10px] text-muted-foreground">{orderTypeConfig.description}</p>
      </div>
    );
  };
  
  // Render price input based on order type
  const renderPriceInputs = () => {
    return (
      <div className="grid grid-cols-2 gap-3">
        {/* Entry Price (for Limit orders) */}
        {orderTypeConfig.needsPrice && (
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">
              Цена {orderType.includes("LIMIT") ? "лимита" : "входа"}
            </Label>
            <div className="relative">
              <Input
                type="number"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                placeholder={currentPrice > 0 ? currentPrice.toFixed(2) : "Цена"}
                className="font-mono min-h-11 pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 text-xs"
                onClick={() => setEntryPrice(currentPrice.toFixed(2))}
              >
                <ArrowRightLeft className="h-3 w-3 mr-1" />
                Цена
              </Button>
            </div>
          </div>
        )}
        
        {/* Stop Price (for Stop orders) */}
        {orderTypeConfig.needsStopPrice && (
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">
              Стоп-цена (триггер)
            </Label>
            <Input
              type="number"
              value={stopPrice}
              onChange={(e) => setStopPrice(e.target.value)}
              placeholder="Цена триггера"
              className="font-mono min-h-11"
            />
          </div>
        )}
        
        {/* Trigger Type for Stop orders */}
        {orderTypeConfig.needsStopPrice && (
          <div className="space-y-2 col-span-2">
            <Label className="text-xs text-muted-foreground">Тип триггера</Label>
            <Select value={triggerType} onValueChange={(v) => setTriggerType(v as TriggerType)}>
              <SelectTrigger className="min-h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TRIGGER_TYPE_CONFIG).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    );
  };
  
  // Render trading interface based on market type
  const renderTradingInterface = () => {
    const commonFields = (
      <>
        {/* Trading Pair */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Торговая пара</Label>
          <Select value={symbol} onValueChange={setSymbol}>
            <SelectTrigger className="min-h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TRADING_PAIRS.map((pair) => (
                <SelectItem key={pair} value={pair}>
                  {pair.replace("USDT", "/USDT")}
                  {marketPrices[pair] && (
                    <span className="ml-2 text-muted-foreground">
                      ${formatNumber(marketPrices[pair].price)}
                    </span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Direction Toggle */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Направление</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={direction === "LONG" ? "default" : "outline"}
              className={cn(
                "h-12 min-h-11 touch-target",
                direction === "LONG" && "bg-green-500 hover:bg-green-600 text-white"
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
                "h-12 min-h-11 touch-target",
                direction === "SHORT" && "bg-red-500 hover:bg-red-600 text-white"
              )}
              onClick={() => setDirection("SHORT")}
            >
              <TrendingDown className="mr-2 h-4 w-4" />
              SHORT
            </Button>
          </div>
        </div>
        
        {/* Amount */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Сумма (USDT)</Label>
            <span className="text-xs text-muted-foreground">
              Доступно: ${formatNumber(balance)}
            </span>
          </div>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100"
            className="font-mono min-h-11"
          />
          <div className="grid grid-cols-4 gap-1">
            {[25, 50, 75, 100].map((percent) => (
              <Button
                key={percent}
                type="button"
                variant="outline"
                size="sm"
                className="h-8 text-xs min-h-11 touch-target"
                onClick={() => setAmount(((balance * percent) / 100).toFixed(2))}
              >
                {percent}%
              </Button>
            ))}
          </div>
        </div>
      </>
    );
    
    if (activeMarketType === "futures") {
      return (
        <>
          {commonFields}
          
          {/* Order Type Selector */}
          {renderOrderTypeSelector()}
          
          {/* Price Inputs */}
          {renderPriceInputs()}
          
          {/* Leverage */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Плечо</Label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1">
              {LEVERAGE_OPTIONS.map((lev) => (
                <Button
                  key={lev}
                  type="button"
                  variant={leverage === lev ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "h-9 text-xs min-h-11 touch-target",
                    leverage === lev && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => setLeverage(lev)}
                >
                  {lev}x
                </Button>
              ))}
            </div>
          </div>
          
          {/* Time in Force */}
          {orderType !== "MARKET" && (
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Time in Force</Label>
              <div className="grid grid-cols-4 gap-1">
                {Object.entries(TIME_IN_FORCE_CONFIG).map(([key, config]) => (
                  <Button
                    key={key}
                    type="button"
                    variant={timeInForce === key ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "h-8 text-xs",
                      timeInForce === key && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => setTimeInForce(key as TimeInForce)}
                    title={config.description}
                  >
                    {config.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Reduce Only / Post Only */}
          {orderType !== "MARKET" && (
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={reduceOnly}
                  onCheckedChange={setReduceOnly}
                />
                <Label className="text-xs">Reduce Only</Label>
              </div>
              {orderType === "LIMIT" && (
                <div className="flex items-center gap-2">
                  <Switch
                    checked={postOnly}
                    onCheckedChange={setPostOnly}
                  />
                  <Label className="text-xs">Post Only</Label>
                </div>
              )}
            </div>
          )}
          
          <Separator className="my-2" />
          
          {/* Stop Loss / Take Profit */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Stop Loss
              </Label>
              <Input
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                placeholder="Цена"
                className="font-mono min-h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-1">
                <Target className="h-3 w-3" />
                Take Profit
              </Label>
              <Input
                type="number"
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value)}
                placeholder="Цена"
                className="font-mono min-h-11"
              />
            </div>
          </div>
          
          {/* Trailing Stop */}
          <div className="rounded-lg bg-purple-500/5 border border-purple-500/20 p-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-purple-500" />
                <Label className="text-sm font-medium cursor-pointer">Trailing Stop</Label>
              </div>
              <Switch
                checked={enableTrailingStop}
                onCheckedChange={setEnableTrailingStop}
              />
            </div>
            
            {enableTrailingStop && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">
                    Расстояние (%)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={trailingStopPercent}
                      onChange={(e) => setTrailingStopPercent(e.target.value)}
                      placeholder="2"
                      step="0.1"
                      min="0.1"
                      max="50"
                      className="font-mono min-h-11"
                    />
                    <span className="text-xs text-muted-foreground">%</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    SL следует за ценой на этом расстоянии
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">
                    Активация (%)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={trailingActivationPercent}
                      onChange={(e) => setTrailingActivationPercent(e.target.value)}
                      placeholder="1"
                      step="0.1"
                      min="0"
                      max="50"
                      className="font-mono min-h-11"
                    />
                    <span className="text-xs text-muted-foreground">%</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    Прибыль для активации трейлинга
                  </p>
                </div>
              </div>
            )}
            
            {enableTrailingStop && currentPrice > 0 && (
              <div className="flex items-center gap-2 text-xs text-purple-400 bg-purple-500/10 rounded p-2">
                <Zap className="h-3 w-3" />
                <span>
                  Пример: {direction === "LONG" ? (
                    <>SL начнёт двигаться когда цена вырастет на {trailingActivationPercent || "1"}% выше цены входа</>
                  ) : (
                    <>SL начнёт двигаться когда цена упадёт на {trailingActivationPercent || "1"}% ниже цены входа</>
                  )}
                </span>
              </div>
            )}
          </div>
          
          {/* Position Summary */}
          <div className="rounded-lg bg-secondary/50 p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Тип ордера</span>
              <span className="font-mono font-medium">{ORDER_TYPE_CONFIG[orderType].label}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Размер позиции</span>
              <span className="font-mono">${(positionSize * leverage).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Маржа</span>
              <span className="font-mono">${positionSize.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Комиссия (est.)</span>
              <span className="font-mono">${estimatedFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {orderType === "MARKET" ? "Рыночная цена" : "Цена входа"}
              </span>
              <span className="font-mono">
                ${formatNumber(orderType === "MARKET" ? currentPrice : (parseFloat(entryPrice) || currentPrice))}
              </span>
            </div>
            {orderTypeConfig.needsStopPrice && stopPrice && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Стоп-цена</span>
                <span className="font-mono text-amber-500">${stopPrice}</span>
              </div>
            )}
          </div>
        </>
      );
    }
    
    if (activeMarketType === "spot") {
      return (
        <>
          {commonFields}
          
          {/* Order Type Selector (Market/Limit only for spot) */}
          {renderOrderTypeSelector()}
          
          {/* Price Inputs */}
          {renderPriceInputs()}
          
          {/* Position Summary */}
          <div className="rounded-lg bg-secondary/50 p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Тип ордера</span>
              <span className="font-mono font-medium">{ORDER_TYPE_CONFIG[orderType].label}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Количество</span>
              <span className="font-mono">{(positionSize / executionPrice).toFixed(6)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Комиссия (est.)</span>
              <span className="font-mono">${(positionSize * 0.001).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Цена</span>
              <span className="font-mono">${formatNumber(executionPrice)}</span>
            </div>
          </div>
        </>
      );
    }
    
    // Inverse
    return (
      <>
        {commonFields}
        
        {/* Order Type Selector */}
        {renderOrderTypeSelector()}
        
        {/* Price Inputs */}
        {renderPriceInputs()}
        
        {/* Leverage for inverse */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Плечо (BTC-margined)</Label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1">
            {[1, 2, 3, 5, 10, 25, 50, 100].map((lev) => (
              <Button
                key={lev}
                type="button"
                variant={leverage === lev ? "default" : "outline"}
                size="sm"
                className={cn(
                  "h-9 text-xs min-h-11 touch-target",
                  leverage === lev && "bg-primary text-primary-foreground"
                )}
                onClick={() => setLeverage(lev)}
              >
                {lev}x
              </Button>
            ))}
          </div>
        </div>
        
        {/* Stop Loss / Take Profit */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Stop Loss ($)</Label>
            <Input
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              placeholder="Цена"
              className="font-mono min-h-11"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Take Profit ($)</Label>
            <Input
              type="number"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              placeholder="Цена"
              className="font-mono min-h-11"
            />
          </div>
        </div>
        
        {/* Position Summary */}
        <div className="rounded-lg bg-secondary/50 p-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Тип ордера</span>
            <span className="font-mono font-medium">{ORDER_TYPE_CONFIG[orderType].label}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Размер позиции</span>
            <span className="font-mono">${leveragedSize.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Контракты</span>
            <span className="font-mono">{(leveragedSize / executionPrice).toFixed(4)} BTC</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Комиссия (est.)</span>
            <span className="font-mono">${estimatedFee.toFixed(2)}</span>
          </div>
        </div>
      </>
    );
  };
  
  // Render positions list
  const renderPositions = () => {
    if (positions.length === 0 && pendingOrders.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Activity className="h-10 w-10 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">Нет открытых позиций или ордеров</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-3">
        {/* Pending Orders */}
        {pendingOrders.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              Отложенные ордера ({pendingOrders.length})
            </div>
            {pendingOrders.map((order) => (
              <div
                key={order.id}
                className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 hover:bg-amber-500/10 cursor-pointer transition-colors"
                onClick={() => {
                  setSelectedOrder(order);
                  setShowOrderDialog(true);
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{order.symbol}</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        order.direction === "LONG"
                          ? "text-green-500 border-green-500/30"
                          : "text-red-500 border-red-500/30"
                      )}
                    >
                      {order.direction}
                    </Badge>
                    <Badge variant="outline" className="text-xs text-amber-500 border-amber-500/30">
                      {ORDER_TYPE_CONFIG[order.orderType]?.label || order.orderType}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(order.createdAt)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <div>
                    <span>Кол-во: </span>
                    <span className="font-mono">{order.quantity.toFixed(6)}</span>
                  </div>
                  {order.price && (
                    <div>
                      <span>Цена: </span>
                      <span className="font-mono">${order.price.toFixed(2)}</span>
                    </div>
                  )}
                  {order.stopPrice && (
                    <div>
                      <span>Триггер: </span>
                      <span className="font-mono text-amber-500">${order.stopPrice.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Open Positions */}
        {positions.length > 0 && (
          <div className="space-y-2">
            {pendingOrders.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Activity className="h-3 w-3" />
                Открытые позиции ({positions.length})
              </div>
            )}
            {positions.map((position) => (
              <div
                key={position.id}
                className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors"
                onClick={() => {
                  setSelectedPosition(position);
                  setShowPositionDialog(true);
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{position.symbol}</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        position.direction === "LONG"
                          ? "text-green-500 border-green-500/30"
                          : "text-red-500 border-red-500/30"
                      )}
                    >
                      {position.direction}
                    </Badge>
                    {position.leverage > 1 && (
                      <span className="text-xs text-muted-foreground">{position.leverage}x</span>
                    )}
                    {position.exchangeName && (
                      <Badge variant="outline" className="text-xs">
                        {position.exchangeName}
                      </Badge>
                    )}
                  </div>
                  <div
                    className={cn(
                      "font-mono text-sm font-medium",
                      position.unrealizedPnl >= 0 ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {position.unrealizedPnl >= 0 ? "+" : ""}${position.unrealizedPnl.toFixed(2)}
                    <span className="text-xs text-muted-foreground ml-1">
                      ({position.unrealizedPnlPercent >= 0 ? "+" : ""}{position.unrealizedPnlPercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-muted-foreground">
                  <div>
                    <span>Размер: </span>
                    <span className="font-mono">{position.quantity.toFixed(6)}</span>
                  </div>
                  <div>
                    <span>Вход: </span>
                    <span className="font-mono">${position.entryPrice.toFixed(2)}</span>
                  </div>
                  <div>
                    <span>Текущая: </span>
                    <span className="font-mono">${position.currentPrice.toFixed(2)}</span>
                  </div>
                  <div>
                    <span>Маржа: </span>
                    <span className="font-mono">${position.margin.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  const typeConfig = ACCOUNT_TYPE_CONFIG[activeAccountType];
  
  return (
    <div className="flex flex-col h-full gap-4">
      {/* Main Account Type Tabs */}
      <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
        {(Object.keys(ACCOUNT_TYPE_CONFIG) as AccountType[]).map((type) => {
          const config = ACCOUNT_TYPE_CONFIG[type];
          const hasAccounts = accounts.filter((a) => a.accountType === type).length > 0;
          
          return (
            <Button
              key={type}
              variant={activeAccountType === type ? "default" : "ghost"}
              size="sm"
              className={cn(
                "flex-1 h-10",
                activeAccountType === type && cn("bg-background shadow-sm", config.bgColor)
              )}
              onClick={() => setActiveAccountType(type)}
            >
              <span className={cn("font-medium", activeAccountType === type ? config.color : "")}>
                {config.label}
              </span>
              {hasAccounts && (
                <Badge variant="outline" className="ml-2 text-[10px] h-4 px-1">
                  {accounts.filter((a) => a.accountType === type).length}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
      
      {/* Market Type Sub-tabs */}
      <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
        {(Object.keys(MARKET_TYPE_CONFIG) as MarketType[]).map((type) => {
          const config = MARKET_TYPE_CONFIG[type];
          const hasAccounts = accounts.filter(
            (a) => a.accountType === activeAccountType && a.marketType === type
          ).length > 0;
          
          return (
            <Button
              key={type}
              variant={activeMarketType === type ? "default" : "ghost"}
              size="sm"
              className={cn(
                "flex-1 h-10",
                activeMarketType === type && "bg-background shadow-sm"
              )}
              onClick={() => setActiveMarketType(type)}
            >
              <span className="font-medium">{config.label}</span>
              {hasAccounts && (
                <Badge variant="outline" className="ml-2 text-[10px] h-4 px-1">
                  {accounts.filter((a) => a.accountType === activeAccountType && a.marketType === type).length}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Trading Form */}
        <Card className="flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Новая сделка
                <Badge
                  variant="outline"
                  className={cn("text-xs", typeConfig.bgColor, typeConfig.color, typeConfig.borderColor)}
                >
                  {typeConfig.label}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 overflow-y-auto">
            {/* Account Selector */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                Аккаунт
              </Label>
              {renderAccountSelector()}
            </div>
            
            {/* Auto Trading Settings Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm cursor-pointer">
                  Использовать настройки авто торговли
                </Label>
              </div>
              <Switch
                checked={useAutoTradingSettings}
                onCheckedChange={setUseAutoTradingSettings}
              />
            </div>
            
            {selectedAccountId && renderTradingInterface()}
            
            {/* Submit Button */}
            {selectedAccountId && (
              <Button
                className={cn(
                  "w-full h-12 text-base font-medium min-h-11 touch-target",
                  direction === "LONG" && "bg-green-500 hover:bg-green-600",
                  direction === "SHORT" && "bg-red-500 hover:bg-red-600"
                )}
                onClick={handleTrade}
                disabled={isSubmitting || positionSize > balance || !selectedAccountId}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Обработка...
                  </span>
                ) : (
                  <>
                    {direction === "LONG" ? (
                      <TrendingUp className="mr-2 h-5 w-5" />
                    ) : (
                      <TrendingDown className="mr-2 h-5 w-5" />
                    )}
                    {orderType === "MARKET" ? `Открыть ${direction}` : `Создать ордер ${direction}`}
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
        
        {/* Open Positions & Orders */}
        <Card className="flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Позиции и ордера
              </div>
              <div className="flex gap-2">
                {pendingOrders.length > 0 && (
                  <Badge variant="outline" className="text-xs text-amber-500 border-amber-500/30">
                    {pendingOrders.length} ордеров
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {positions.length} поз.
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            <ScrollArea className="h-full max-h-[500px]">
              <div className="p-4 pt-0">
                {renderPositions()}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      
      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {direction === "LONG" ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
              Подтвердите {orderType === "MARKET" ? "сделку" : "ордер"}
            </DialogTitle>
            <DialogDescription>
              Проверьте параметры перед {orderType === "MARKET" ? "открытием позиции" : "созданием ордера"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 py-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Пара:</div>
              <div className="font-medium">{symbol}</div>
              
              <div className="text-muted-foreground">Направление:</div>
              <div className={cn(
                "font-medium",
                direction === "LONG" ? "text-green-500" : "text-red-500"
              )}>
                {direction}
              </div>
              
              <div className="text-muted-foreground">Тип ордера:</div>
              <div className="font-mono">{ORDER_TYPE_CONFIG[orderType].label}</div>
              
              <div className="text-muted-foreground">Размер:</div>
              <div className="font-mono">${positionSize.toFixed(2)}</div>
              
              {activeMarketType !== "spot" && (
                <>
                  <div className="text-muted-foreground">Плечо:</div>
                  <div className="font-mono">{leverage}x</div>
                  
                  <div className="text-muted-foreground">Позиция:</div>
                  <div className="font-mono">${leveragedSize.toFixed(2)}</div>
                </>
              )}
              
              <div className="text-muted-foreground">
                {orderType === "MARKET" ? "Рыночная цена:" : "Цена входа:"}
              </div>
              <div className="font-mono">
                ${formatNumber(orderType === "MARKET" ? currentPrice : (parseFloat(entryPrice) || currentPrice))}
              </div>
              
              {orderTypeConfig.needsStopPrice && stopPrice && (
                <>
                  <div className="text-muted-foreground">Стоп-цена:</div>
                  <div className="font-mono text-amber-500">${stopPrice}</div>
                </>
              )}
              
              {stopLoss && (
                <>
                  <div className="text-muted-foreground">Stop Loss:</div>
                  <div className="font-mono text-red-500">${stopLoss}</div>
                </>
              )}
              
              {takeProfit && (
                <>
                  <div className="text-muted-foreground">Take Profit:</div>
                  <div className="font-mono text-green-500">${takeProfit}</div>
                </>
              )}
              
              <div className="text-muted-foreground">Комиссия:</div>
              <div className="font-mono">${estimatedFee.toFixed(2)}</div>
            </div>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="w-full sm:w-auto min-h-11 touch-target"
            >
              Отмена
            </Button>
            <Button
              onClick={confirmTrade}
              className={cn(
                "w-full sm:w-auto min-h-11 touch-target",
                direction === "LONG" && "bg-green-500 hover:bg-green-600",
                direction === "SHORT" && "bg-red-500 hover:bg-red-600"
              )}
            >
              {direction === "LONG" ? (
                <TrendingUp className="mr-2 h-4 w-4" />
              ) : (
                <TrendingDown className="mr-2 h-4 w-4" />
              )}
              {orderType === "MARKET" ? `Открыть ${direction}` : `Создать ордер`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Position Details Dialog */}
      <Dialog open={showPositionDialog} onOpenChange={setShowPositionDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedPosition?.direction === "LONG" ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
              {selectedPosition?.symbol} - {selectedPosition?.direction}
            </DialogTitle>
            <DialogDescription>
              Детали позиции и управление
            </DialogDescription>
          </DialogHeader>
          
          {selectedPosition && (
            <div className="space-y-4 py-4">
              {/* PnL */}
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Нереализованный P&L</span>
                  <div
                    className={cn(
                      "text-xl font-mono font-bold",
                      selectedPosition.unrealizedPnl >= 0 ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {selectedPosition.unrealizedPnl >= 0 ? "+" : ""}${selectedPosition.unrealizedPnl.toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">ROI</span>
                  <span
                    className={cn(
                      "font-mono",
                      selectedPosition.unrealizedPnlPercent >= 0 ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {selectedPosition.unrealizedPnlPercent >= 0 ? "+" : ""}{selectedPosition.unrealizedPnlPercent.toFixed(2)}%
                  </span>
                </div>
              </div>
              
              {/* Position Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Размер</span>
                    <span className="font-mono">{selectedPosition.quantity.toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Цена входа</span>
                    <span className="font-mono">${selectedPosition.entryPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Текущая цена</span>
                    <span className="font-mono">${selectedPosition.currentPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Плечо</span>
                    <span className="font-mono">{selectedPosition.leverage}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Маржа</span>
                    <span className="font-mono">${selectedPosition.margin.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ликвидация</span>
                    <span className="font-mono text-amber-500">
                      ${selectedPosition.liquidationPrice?.toFixed(2) || "-"}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* SL/TP */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Stop Loss</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Цена"
                      defaultValue={selectedPosition.stopLoss || ""}
                      className="font-mono min-h-11"
                      id="edit-sl"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const input = document.getElementById("edit-sl") as HTMLInputElement;
                        if (input?.value) {
                          handleUpdatePosition(selectedPosition, parseFloat(input.value), undefined);
                        }
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Take Profit</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Цена"
                      defaultValue={selectedPosition.takeProfit || ""}
                      className="font-mono min-h-11"
                      id="edit-tp"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const input = document.getElementById("edit-tp") as HTMLInputElement;
                        if (input?.value) {
                          handleUpdatePosition(selectedPosition, undefined, parseFloat(input.value));
                        }
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Info */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDate(selectedPosition.openedAt)} {formatTime(selectedPosition.openedAt)}
                </div>
                {selectedPosition.exchangeName && (
                  <div className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {selectedPosition.exchangeName}
                  </div>
                )}
              </div>
              
              {/* Actions */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleClosePosition(selectedPosition, 25)}
                  className="min-h-11 touch-target"
                >
                  Закрыть 25%
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleClosePosition(selectedPosition, 50)}
                  className="min-h-11 touch-target"
                >
                  Закрыть 50%
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleClosePosition(selectedPosition, 100)}
                  className="min-h-11 touch-target"
                >
                  <X className="h-4 w-4 mr-1" />
                  Закрыть 100%
                </Button>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPositionDialog(false)}
              className="w-full min-h-11 touch-target"
            >
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Pending Order Details Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              Отложенный ордер
            </DialogTitle>
            <DialogDescription>
              {selectedOrder?.symbol} - {selectedOrder?.direction}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-3 py-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Тип ордера:</div>
                <div className="font-mono">{ORDER_TYPE_CONFIG[selectedOrder.orderType]?.label || selectedOrder.orderType}</div>
                
                <div className="text-muted-foreground">Количество:</div>
                <div className="font-mono">{selectedOrder.quantity.toFixed(6)}</div>
                
                {selectedOrder.price && (
                  <>
                    <div className="text-muted-foreground">Цена:</div>
                    <div className="font-mono">${selectedOrder.price.toFixed(2)}</div>
                  </>
                )}
                
                {selectedOrder.stopPrice && (
                  <>
                    <div className="text-muted-foreground">Стоп-цена:</div>
                    <div className="font-mono text-amber-500">${selectedOrder.stopPrice.toFixed(2)}</div>
                  </>
                )}
                
                <div className="text-muted-foreground">Создан:</div>
                <div className="font-mono">{formatDate(selectedOrder.createdAt)} {formatTime(selectedOrder.createdAt)}</div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowOrderDialog(false)}
                >
                  Закрыть
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleCancelOrder(selectedOrder)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Отменить ордер
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
