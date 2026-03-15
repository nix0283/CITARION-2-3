"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Building2,
  Plus,
  RefreshCw,
  AlertTriangle,
  Check,
  ChevronRight,
  ChevronLeft,
  Key,
  Eye,
  EyeOff,
  Loader2,
  Settings,
  Unlink,
  Signal,
  SignalHigh,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// ==================== TYPES ====================

type AccountType = "LIVE" | "DEMO" | "TESTNET" | "PAPER";
type MarketType = "futures" | "spot" | "inverse";

interface ExchangeAccount {
  id: string;
  exchangeId: string;
  exchangeName: string;
  marketType: MarketType;
  accountType: AccountType;
  isActive: boolean;
  hedgeMode: boolean;
  apiKey?: string;
  apiPassphrase?: string;
  lastSyncAt?: string;
  lastError?: string;
  hasData?: boolean; // Whether trading data is flowing
}

interface AddAccountWizard {
  step: number;
  exchangeId: string;
  marketType: MarketType;
  apiKey: string;
  apiSecret: string;
  passphrase: string;
  // PAPER account initial balance
  initialBalanceCurrency: string;
  initialBalanceAmount: number;
}

// ==================== CONSTANTS ====================

const SUPPORTED_EXCHANGES = [
  { id: "binance", name: "Binance", color: "#F0B90B", bgColor: "#F0B90B20", hasPassphrase: false },
  { id: "bybit", name: "Bybit", color: "#F7A600", bgColor: "#F7A60020", hasPassphrase: false },
  { id: "okx", name: "OKX", color: "#FFFFFF", bgColor: "#FFFFFF20", hasPassphrase: true },
  { id: "bitget", name: "Bitget", color: "#00D084", bgColor: "#00D08420", hasPassphrase: true },
  { id: "bingx", name: "BingX", color: "#4285F4", bgColor: "#4285F420", hasPassphrase: false },
];

// Exchanges available for each account type
const EXCHANGES_BY_ACCOUNT_TYPE: Record<AccountType, string[]> = {
  LIVE: ["binance", "bybit", "okx", "bitget", "bingx"],
  DEMO: ["okx", "bitget", "bingx"], // Only OKX, Bitget, BingX have demo mode
  TESTNET: ["binance", "bybit"], // Only Binance and Bybit have testnet
  PAPER: ["binance", "bybit", "okx", "bitget", "bingx"], // All exchanges for simulation
};

// Get filtered exchanges for account type
const getExchangesForAccountType = (accountType: AccountType) => {
  const allowedIds = EXCHANGES_BY_ACCOUNT_TYPE[accountType];
  return SUPPORTED_EXCHANGES.filter((e) => allowedIds.includes(e.id));
};

const MARKET_TYPES: { id: MarketType; name: string }[] = [
  { id: "futures", name: "Futures" },
  { id: "spot", name: "Spot" },
  { id: "inverse", name: "Inverse" },
];

// Initial balance currencies for PAPER accounts
const INITIAL_BALANCE_CURRENCIES = [
  { id: "USDT", name: "USDT", description: "Tether USD", defaultAmount: 10000 },
  { id: "USDC", name: "USDC", description: "USD Coin", defaultAmount: 10000 },
  { id: "USD", name: "USD", description: "US Dollar", defaultAmount: 10000 },
  { id: "BTC", name: "BTC", description: "Bitcoin", defaultAmount: 0.5 },
  { id: "ETH", name: "ETH", description: "Ethereum", defaultAmount: 5 },
];

const ACCOUNT_TYPE_CONFIG: Record<AccountType, { label: string; color: string; bgColor: string; description: string }> = {
  LIVE: {
    label: "LIVE",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    description: "Реальная торговля",
  },
  DEMO: {
    label: "DEMO",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    description: "Демо режим биржи",
  },
  TESTNET: {
    label: "TESTNET",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    description: "Тестовая сеть",
  },
  PAPER: {
    label: "PAPER",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    description: "Виртуальная торговля",
  },
};

// ==================== ACCOUNT CARD COMPONENT ====================

interface AccountCardProps {
  account: ExchangeAccount;
  onToggleActive: (id: string, isActive: boolean) => void;
  onToggleHedgeMode: (id: string, hedgeMode: boolean) => void;
  onDisconnect: (id: string) => void;
}

function AccountCard({ account, onToggleActive, onToggleHedgeMode, onDisconnect }: AccountCardProps) {
  const exchange = SUPPORTED_EXCHANGES.find((e) => e.id === account.exchangeId);
  const hasData = account.hasData && account.isActive && !account.lastError;
  const accountConfig = ACCOUNT_TYPE_CONFIG[account.accountType];

  return (
    <Card className={cn("relative overflow-hidden", hasData && "border-green-500/50")}>
      {/* Top status bar */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1",
          hasData ? "bg-green-500" : account.isActive ? "bg-yellow-500" : "bg-gray-500"
        )}
      />

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Exchange logo */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: exchange?.bgColor || "#88888820" }}
            >
              <Building2
                className="h-5 w-5"
                style={{ color: exchange?.color || "#888" }}
              />
            </div>
            <div>
              <CardTitle className="text-base">{account.exchangeName}</CardTitle>
              <p className="text-xs text-muted-foreground capitalize">{account.marketType}</p>
            </div>
          </div>

          {/* Account type badge */}
          <Badge
            className={cn(
              "font-medium",
              hasData
                ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                : "bg-gray-500/10 text-gray-500 border-gray-500/20"
            )}
          >
            {hasData ? <SignalHigh className="h-3 w-3 mr-1" /> : <Signal className="h-3 w-3 mr-1" />}
            {accountConfig.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Account info - only show API key for non-PAPER accounts */}
        {account.accountType !== "PAPER" && (
          <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">API Key:</span>
              <code className="px-1.5 py-0.5 bg-background rounded font-mono">
                {account.apiKey ? `${account.apiKey.slice(0, 6)}...${account.apiKey.slice(-4)}` : "Не указан"}
              </code>
            </div>
          </div>
        )}

        {/* PAPER account info */}
        {account.accountType === "PAPER" && (
          <div className="flex items-center justify-between p-2 rounded-lg bg-blue-500/10 text-xs">
            <div className="flex items-center gap-2">
              <Settings className="h-3 w-3 text-blue-500" />
              <span className="text-blue-600 dark:text-blue-400">Виртуальная торговля</span>
            </div>
          </div>
        )}

        {/* Last sync */}
        {account.lastSyncAt && (
          <div className="text-xs text-muted-foreground">
            Синхронизация: {new Date(account.lastSyncAt).toLocaleString("ru-RU")}
          </div>
        )}

        {/* Error message */}
        {account.lastError && (
          <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-xs text-red-500">{account.lastError}</p>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-between gap-4 pt-2 border-t">
          {/* Active toggle */}
          <div className="flex items-center gap-2">
            <Switch
              checked={account.isActive}
              onCheckedChange={(checked) => onToggleActive(account.id, checked)}
            />
            <span className="text-xs text-muted-foreground">
              {account.isActive ? "Активен" : "Отключён"}
            </span>
          </div>

          {/* Hedge Mode button */}
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-7 text-xs",
              account.hedgeMode
                ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/30 hover:bg-yellow-500/20"
                : "text-muted-foreground"
            )}
            onClick={() => onToggleHedgeMode(account.id, !account.hedgeMode)}
          >
            Hedge Mode
          </Button>

          {/* Disconnect button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={() => onDisconnect(account.id)}
          >
            <Unlink className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ==================== ADD ACCOUNT DIALOG ====================

interface AddAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountType: AccountType;
  onAdd: (data: { 
    exchangeId: string; 
    marketType: MarketType; 
    apiKey: string; 
    apiSecret: string; 
    passphrase: string;
    initialBalanceCurrency?: string;
    initialBalanceAmount?: number;
  }) => Promise<void>;
}

function AddAccountDialog({ open, onOpenChange, accountType, onAdd }: AddAccountDialogProps) {
  const [wizard, setWizard] = useState<AddAccountWizard>({
    step: 1,
    exchangeId: "",
    marketType: "futures",
    apiKey: "",
    apiSecret: "",
    passphrase: "",
    initialBalanceCurrency: "USDT",
    initialBalanceAmount: 10000,
  });
  const [showSecret, setShowSecret] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get exchanges available for this account type
  const availableExchanges = getExchangesForAccountType(accountType);
  const selectedExchange = availableExchanges.find((e) => e.id === wizard.exchangeId);
  
  // PAPER accounts don't need API keys (internal simulation)
  const needsApiKeys = accountType !== "PAPER";
  const totalSteps = needsApiKeys ? 3 : 2;

  const handleNext = () => {
    if (wizard.step < totalSteps) {
      setWizard((prev) => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const handleBack = () => {
    if (wizard.step > 1) {
      setWizard((prev) => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const handleSubmit = async () => {
    // For PAPER accounts, no API keys needed
    if (!needsApiKeys) {
      setIsSubmitting(true);
      try {
        await onAdd({
          exchangeId: wizard.exchangeId,
          marketType: wizard.marketType,
          apiKey: "",
          apiSecret: "",
          passphrase: "",
          initialBalanceCurrency: wizard.initialBalanceCurrency,
          initialBalanceAmount: wizard.initialBalanceAmount,
        });
        
        // Reset and close
        setWizard({
          step: 1,
          exchangeId: "",
          marketType: "futures",
          apiKey: "",
          apiSecret: "",
          passphrase: "",
          initialBalanceCurrency: "USDT",
          initialBalanceAmount: 10000,
        });
        onOpenChange(false);
      } catch (error) {
        toast.error("Ошибка добавления аккаунта");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (!wizard.apiKey || !wizard.apiSecret) {
      toast.error("API Key и API Secret обязательны");
      return;
    }

    setIsSubmitting(true);
    try {
      await onAdd({
        exchangeId: wizard.exchangeId,
        marketType: wizard.marketType,
        apiKey: wizard.apiKey,
        apiSecret: wizard.apiSecret,
        passphrase: wizard.passphrase,
      });
      
      // Reset and close
      setWizard({
        step: 1,
        exchangeId: "",
        marketType: "futures",
        apiKey: "",
        apiSecret: "",
        passphrase: "",
      });
      onOpenChange(false);
    } catch (error) {
      toast.error("Ошибка добавления аккаунта");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (wizard.step) {
      case 1:
        return wizard.exchangeId !== "";
      case 2:
        // For PAPER, step 2 is the final step (no API keys)
        if (!needsApiKeys) return true;
        return wizard.marketType !== "";
      case 3:
        return wizard.apiKey !== "" && wizard.apiSecret !== "";
      default:
        return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Добавить аккаунт {ACCOUNT_TYPE_CONFIG[accountType].label}
          </DialogTitle>
          <DialogDescription>
            Шаг {wizard.step} из {totalSteps}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <div
                key={step}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  wizard.step >= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {wizard.step > step ? <Check className="h-4 w-4" /> : step}
              </div>
            ))}
          </div>

          {/* Step 1: Select Exchange */}
          {wizard.step === 1 && (
            <div className="space-y-4">
              <Label className="text-base">Выберите биржу</Label>
              <div className="grid grid-cols-1 gap-2">
                {availableExchanges.map((exchange) => (
                  <Button
                    key={exchange.id}
                    variant={wizard.exchangeId === exchange.id ? "default" : "outline"}
                    className={cn(
                      "h-14 justify-start gap-3",
                      wizard.exchangeId === exchange.id && "ring-2 ring-primary"
                    )}
                    onClick={() => setWizard((prev) => ({ ...prev, exchangeId: exchange.id }))}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: exchange.bgColor }}
                    >
                      <Building2 className="h-4 w-4" style={{ color: exchange.color }} />
                    </div>
                    <span className="font-medium">{exchange.name}</span>
                  </Button>
                ))}
              </div>
              {accountType === "DEMO" && (
                <p className="text-xs text-muted-foreground">
                  Демо-режим поддерживается только на OKX, Bitget и BingX
                </p>
              )}
              {accountType === "TESTNET" && (
                <p className="text-xs text-muted-foreground">
                  Тестовая сеть доступна только на Binance и Bybit
                </p>
              )}
            </div>
          )}

          {/* Step 2: Select Market Type (or Confirmation for PAPER) */}
          {wizard.step === 2 && needsApiKeys && (
            <div className="space-y-4">
              <Label className="text-base">Выберите тип рынка</Label>
              <div className="grid grid-cols-3 gap-2">
                {MARKET_TYPES.map((type) => (
                  <Button
                    key={type.id}
                    variant={wizard.marketType === type.id ? "default" : "outline"}
                    className={cn(
                      "h-12",
                      wizard.marketType === type.id && "ring-2 ring-primary"
                    )}
                    onClick={() => setWizard((prev) => ({ ...prev, marketType: type.id }))}
                  >
                    {type.name}
                  </Button>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-secondary/50 text-xs text-muted-foreground">
                <p><strong>Futures:</strong> Бессрочные контракты с кредитным плечом</p>
                <p><strong>Spot:</strong> Спотовая торговля без плеча</p>
                <p><strong>Inverse:</strong> Инверсные контракты (BTC-margined)</p>
              </div>
            </div>
          )}

          {/* Step 2 for PAPER: Initial Balance Configuration */}
          {wizard.step === 2 && !needsApiKeys && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: selectedExchange?.bgColor }}
                >
                  <Building2 className="h-4 w-4" style={{ color: selectedExchange?.color }} />
                </div>
                <div>
                  <p className="font-medium">{selectedExchange?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{wizard.marketType}</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-start gap-2">
                  <Settings className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    <p className="font-medium">PAPER торговля</p>
                    <p className="mt-1">
                      Это виртуальный торговый аккаунт без реальных средств.
                      Торговля происходит на симулированных данных без подключения к бирже.
                    </p>
                  </div>
                </div>
              </div>

              {/* Market Type Selection */}
              <div className="space-y-2">
                <Label className="text-base">Тип рынка</Label>
                <div className="grid grid-cols-3 gap-2">
                  {MARKET_TYPES.map((type) => (
                    <Button
                      key={type.id}
                      variant={wizard.marketType === type.id ? "default" : "outline"}
                      className={cn(
                        "h-10 text-xs",
                        wizard.marketType === type.id && "ring-2 ring-primary"
                      )}
                      onClick={() => setWizard((prev) => ({ ...prev, marketType: type.id }))}
                    >
                      {type.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Initial Balance Currency */}
              <div className="space-y-2">
                <Label className="text-base">Валюта баланса</Label>
                <div className="grid grid-cols-5 gap-2">
                  {INITIAL_BALANCE_CURRENCIES.map((currency) => (
                    <Button
                      key={currency.id}
                      variant={wizard.initialBalanceCurrency === currency.id ? "default" : "outline"}
                      className={cn(
                        "h-12 flex flex-col",
                        wizard.initialBalanceCurrency === currency.id && "ring-2 ring-primary"
                      )}
                      onClick={() => setWizard((prev) => ({ 
                        ...prev, 
                        initialBalanceCurrency: currency.id,
                        initialBalanceAmount: currency.defaultAmount 
                      }))}
                    >
                      <span className="font-semibold">{currency.name}</span>
                      <span className="text-[10px] text-muted-foreground">{currency.description}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Initial Balance Amount */}
              <div className="space-y-2">
                <Label className="text-base">Начальный баланс</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="any"
                    value={wizard.initialBalanceAmount}
                    onChange={(e) => setWizard((prev) => ({ 
                      ...prev, 
                      initialBalanceAmount: parseFloat(e.target.value) || 0 
                    }))}
                    className="text-lg font-medium h-12"
                  />
                  <span className="text-lg font-medium text-muted-foreground min-w-[60px]">
                    {wizard.initialBalanceCurrency}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Выберите начальный баланс для симуляции торговли
                </p>
              </div>

              {/* Quick Amount Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Быстрый выбор:</span>
                <div className="flex gap-1">
                  {[1000, 5000, 10000, 50000, 100000].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setWizard((prev) => ({ ...prev, initialBalanceAmount: amount }))}
                    >
                      {amount >= 1000 ? `${amount / 1000}K` : amount}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: API Keys */}
          {wizard.step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: selectedExchange?.bgColor }}
                >
                  <Building2 className="h-4 w-4" style={{ color: selectedExchange?.color }} />
                </div>
                <div>
                  <p className="font-medium">{selectedExchange?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{wizard.marketType}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>API ключ</Label>
                  <Input
                    type="password"
                    placeholder="Введите API ключ"
                    value={wizard.apiKey}
                    onChange={(e) => setWizard((prev) => ({ ...prev, apiKey: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Секретный ключ</Label>
                  <div className="relative">
                    <Input
                      type={showSecret ? "text" : "password"}
                      placeholder="Введите секретный ключ"
                      value={wizard.apiSecret}
                      onChange={(e) => setWizard((prev) => ({ ...prev, apiSecret: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowSecret(!showSecret)}
                    >
                      {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {selectedExchange?.hasPassphrase && (
                  <div className="space-y-2">
                    <Label>Passphrase (пароль)</Label>
                    <Input
                      type="password"
                      placeholder="Введите passphrase"
                      value={wizard.passphrase}
                      onChange={(e) => setWizard((prev) => ({ ...prev, passphrase: e.target.value }))}
                    />
                  </div>
                )}
              </div>

              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <div className="text-xs text-amber-600 dark:text-amber-400">
                    <p className="font-medium">Важно!</p>
                    <p className="mt-1">
                      Используйте API ключи только с правами на чтение и торговлю.
                      Запрещено использовать ключи с правом вывода средств.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="flex justify-between gap-2 pt-4 border-t">
          <Button
            variant="outline"
            onClick={wizard.step === 1 ? () => onOpenChange(false) : handleBack}
          >
            {wizard.step === 1 ? "Отмена" : (
              <>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Назад
              </>
            )}
          </Button>

          {wizard.step < totalSteps ? (
            <Button onClick={handleNext} disabled={!canProceed()}>
              Далее
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canProceed() || isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : needsApiKeys ? (
                <Key className="h-4 w-4 mr-1" />
              ) : (
                <Check className="h-4 w-4 mr-1" />
              )}
              {needsApiKeys ? "Добавить" : "Создать"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ==================== EMPTY STATE COMPONENT ====================

interface EmptyStateProps {
  accountType: AccountType;
  onAddClick: () => void;
}

function EmptyState({ accountType, onAddClick }: EmptyStateProps) {
  const config = ACCOUNT_TYPE_CONFIG[accountType];
  
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Building2 className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">
        Нет {accountType === "PAPER" ? "виртуальных" : "подключённых"} аккаунтов
      </h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-sm">
        {accountType === "PAPER" 
          ? "Создайте виртуальный аккаунт для симуляции торговли"
          : accountType === "TESTNET"
          ? "Подключитесь к тестовой сети для безопасного тестирования"
          : accountType === "DEMO"
          ? "Используйте демо-режим биржи для обучения"
          : "Добавьте API ключи биржи для начала торговли"
        }
      </p>
      <Button onClick={onAddClick}>
        <Plus className="h-4 w-4 mr-1" />
        {accountType === "PAPER" ? "Создать аккаунт" : "Добавить аккаунт"}
      </Button>
    </div>
  );
}

// ==================== MAIN EXCHANGES PAGE ====================

export function ExchangesPage() {
  const [accounts, setAccounts] = useState<ExchangeAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AccountType>("LIVE");
  const [activeMarketType, setActiveMarketType] = useState<MarketType>("futures");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [dialogAccountType, setDialogAccountType] = useState<AccountType>("LIVE");

  // Fetch accounts
  const fetchAccounts = useCallback(async () => {
    try {
      const response = await fetch("/api/exchange");
      if (response.ok) {
        const data = await response.json();
        // Transform API data to our format
        const transformedAccounts: ExchangeAccount[] = (data.accounts || []).map((acc: Record<string, unknown>) => ({
          id: acc.id as string,
          exchangeId: acc.exchangeId as string,
          exchangeName: acc.exchangeName as string,
          marketType: (acc.exchangeType as MarketType) || "futures",
          accountType: acc.isTestnet ? "TESTNET" : acc.accountType === "DEMO" ? "DEMO" : acc.accountType === "PAPER" ? "PAPER" : "LIVE",
          isActive: acc.isActive as boolean,
          hedgeMode: false, // TODO: add to schema
          apiKey: acc.apiKey as string,
          apiPassphrase: acc.apiPassphrase as string,
          lastSyncAt: acc.lastSyncAt as string,
          lastError: acc.lastError as string,
          hasData: acc.isActive && !acc.lastError,
        }));
        setAccounts(transformedAccounts);
      }
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  // Open dialog for specific account type
  const openAddDialog = (accountType: AccountType) => {
    setDialogAccountType(accountType);
    setShowAddDialog(true);
  };

  // Add account
  const handleAddAccount = async (data: {
    exchangeId: string;
    marketType: MarketType;
    apiKey: string;
    apiSecret: string;
    passphrase: string;
    initialBalanceCurrency?: string;
    initialBalanceAmount?: number;
  }) => {
    const exchange = SUPPORTED_EXCHANGES.find((e) => e.id === data.exchangeId);
    
    // Determine account type for API
    const apiAccountType = dialogAccountType === "LIVE" ? "REAL" : dialogAccountType;
    
    const response = await fetch("/api/exchange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exchangeId: data.exchangeId,
        exchangeType: data.marketType,
        exchangeName: exchange?.name || data.exchangeId,
        apiKey: data.apiKey || null,
        apiSecret: data.apiSecret || null,
        apiPassphrase: data.passphrase || null,
        isTestnet: dialogAccountType === "TESTNET",
        accountType: apiAccountType,
        initialBalanceCurrency: data.initialBalanceCurrency,
        initialBalanceAmount: data.initialBalanceAmount,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success(
        dialogAccountType === "PAPER" 
          ? "Виртуальный аккаунт создан" 
          : "Аккаунт успешно добавлен"
      );
      fetchAccounts();
    } else {
      throw new Error(result.error || "Ошибка добавления");
    }
  };

  // Toggle active
  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch("/api/exchange", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive }),
      });

      if (response.ok) {
        toast.success(isActive ? "Аккаунт активирован" : "Аккаунт отключён");
        fetchAccounts();
      }
    } catch (error) {
      toast.error("Ошибка");
    }
  };

  // Toggle hedge mode
  const handleToggleHedgeMode = async (id: string, hedgeMode: boolean) => {
    // TODO: Implement hedge mode toggle via API
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, hedgeMode } : acc))
    );
    toast.success(hedgeMode ? "Hedge Mode включён" : "Hedge Mode отключён");
  };

  // Disconnect
  const handleDisconnect = async (id: string) => {
    if (!confirm("Отключить аккаунт?")) return;

    try {
      const response = await fetch(`/api/exchange?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Аккаунт отключён");
        fetchAccounts();
      }
    } catch (error) {
      toast.error("Ошибка отключения");
    }
  };

  // Filter accounts by tab and market type
  const filteredAccounts = accounts.filter(
    (acc) => acc.accountType === activeTab && acc.marketType === activeMarketType
  );

  // Stats
  const activeCount = accounts.filter((a) => a.isActive && a.accountType === activeTab).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <div>
          <h2 className="text-2xl font-bold">Биржи</h2>
          <p className="text-muted-foreground">
            Управление API ключами и торговыми аккаунтами
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {activeCount} активных
          </Badge>
          <Button
            variant="outline"
            size="icon"
            onClick={fetchAccounts}
            disabled={isLoading}
          >
            <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
          </Button>
        </div>
      </div>

      {/* Main Tabs: LIVE, DEMO, TESTNET, PAPER */}
      <div className="pt-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AccountType)}>
          <TabsList className="grid w-full grid-cols-4 mb-4">
            {Object.entries(ACCOUNT_TYPE_CONFIG).map(([type, config]) => (
              <TabsTrigger key={type} value={type} className="text-xs sm:text-sm">
                <span className={cn("hidden sm:inline", config.color)}>{config.label}</span>
                <span className="sm:hidden">{config.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Content for each account type */}
          {(["LIVE", "DEMO", "TESTNET", "PAPER"] as AccountType[]).map((accountType) => (
            <TabsContent key={accountType} value={accountType} className="mt-0">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-4">
                  <Tabs value={activeMarketType} onValueChange={(v) => setActiveMarketType(v as MarketType)}>
                    <TabsList className="grid grid-cols-3 w-auto">
                      <TabsTrigger value="futures" className="text-xs">Futures</TabsTrigger>
                      <TabsTrigger value="spot" className="text-xs">Spot</TabsTrigger>
                      <TabsTrigger value="inverse" className="text-xs">Inverse</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <Button size="sm" onClick={() => openAddDialog(accountType)}>
                    <Plus className="h-4 w-4 mr-1" />
                    {accountType === "PAPER" ? "Создать аккаунт" : "Добавить аккаунт"}
                  </Button>
                </div>

                {/* Accounts grid */}
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : filteredAccounts.length === 0 ? (
                  <EmptyState accountType={accountType} onAddClick={() => openAddDialog(accountType)} />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAccounts.map((account) => (
                      <AccountCard
                        key={account.id}
                        account={account}
                        onToggleActive={handleToggleActive}
                        onToggleHedgeMode={handleToggleHedgeMode}
                        onDisconnect={handleDisconnect}
                      />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Add Account Dialog */}
      <AddAccountDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        accountType={dialogAccountType}
        onAdd={handleAddAccount}
      />
    </div>
  );
}
