"use client";

import { useTradingConfigStore, type GlobalTradingMode, type ExchangeTradingMode } from "@/stores/trading-config-store";
import { useCryptoStore } from "@/stores/crypto-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Moon, Sun, User, LogOut, RefreshCw, Bell, Wallet, ChevronDown, AlertTriangle, FlaskConical, Zap, Layers, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";
import { useState } from "react";

// Mode icons
const MODE_ICONS: Record<GlobalTradingMode, typeof FlaskConical> = {
  PAPER: FlaskConical,
  DEMO: Zap,
  LIVE: AlertTriangle,
  MIXED: Layers,
};

// Mode configuration for global modes
const GLOBAL_MODE_CONFIG: Record<GlobalTradingMode, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: typeof Zap;
  description: string;
}> = {
  PAPER: {
    label: "PAPER",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    icon: FlaskConical,
    description: "Симуляция для всех бирж",
  },
  DEMO: {
    label: "DEMO",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    icon: Zap,
    description: "Демо режим для всех бирж",
  },
  LIVE: {
    label: "LIVE",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    icon: AlertTriangle,
    description: "⚠️ Реальная торговля везде",
  },
  MIXED: {
    label: "MIXED",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    icon: Layers,
    description: "Разные режимы для разных бирж",
  },
};

export function Header() {
  const { resetDemoBalance, setActiveTab } = useCryptoStore();
  const { 
    globalMode, 
    setGlobalMode,
    isLiveTrading,
    getActiveExchanges,
  } = useTradingConfigStore();
  const { theme, setTheme } = useTheme();
  
  const modeConfig = GLOBAL_MODE_CONFIG[globalMode];
  const ModeIcon = modeConfig.icon;
  const liveExchanges = getActiveExchanges();
  const hasLiveTrading = isLiveTrading();
  
  // Notification count state
  const [notificationCount] = useState(3);

  const handleResetBalance = async () => {
    try {
      const response = await fetch("/api/account/reset-balance", {
        method: "POST",
      });
      if (response.ok) {
        resetDemoBalance();
      }
    } catch (error) {
      console.error("Failed to reset balance:", error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-30 h-14 md:h-16 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-3 md:px-6">
        {/* Left side - Page Title + Mode Badge */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile spacing for menu button */}
          <div className="w-11 md:hidden" aria-hidden="true" />
          
          <h2 className="text-sm md:text-lg font-semibold text-foreground truncate">
            Панель управления
          </h2>
          
          {/* Mode Badge - Compact on mobile */}
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] md:text-xs font-medium",
              modeConfig.bgColor,
              modeConfig.color,
              modeConfig.borderColor
            )}
          >
            <ModeIcon className="h-3 w-3 mr-1" />
            [{modeConfig.label}]
          </Badge>
          
          {/* Live Trading Warning */}
          {hasLiveTrading && (
            <Badge className="bg-red-500/10 text-red-500 border-red-500/30 text-[10px] animate-pulse">
              LIVE: {liveExchanges.join(", ")}
            </Badge>
          )}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Reset Balance (Non-LIVE modes) - Hidden on mobile */}
          {!hasLiveTrading && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetBalance}
              className="hidden md:flex h-8"
            >
              <RefreshCw className="mr-2 h-3.5 w-3.5" />
              Сбросить
            </Button>
          )}

          {/* Trading Mode Selector - Desktop */}
          <div className="hidden sm:flex items-center gap-2 rounded-lg border border-border px-2 py-1">
            <Label className="text-xs text-muted-foreground">Mode:</Label>
            <Select value={globalMode} onValueChange={(v) => setGlobalMode(v as GlobalTradingMode)}>
              <SelectTrigger className="h-7 w-[130px] border-0 bg-transparent text-xs font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(GLOBAL_MODE_CONFIG).map(([mode, config]) => {
                  const Icon = config.icon;
                  const isActive = globalMode === mode;
                  return (
                    <SelectItem key={mode} value={mode}>
                      <div className="flex items-center gap-2">
                        <Icon className={cn("h-3.5 w-3.5", config.color)} />
                        <span className={config.color}>{config.label}</span>
                        {isActive && <Check className="h-3 w-3 ml-auto" />}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Notification Bell - Desktop */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex h-8 w-8 relative"
            aria-label="Notifications"
            onClick={() => setActiveTab("notifications")}
          >
            <Bell className="h-4 w-4" />
            {/* Notification badge */}
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-white flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-8 w-8"
            suppressHydrationWarning
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* User Menu - Desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hidden md:flex relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.png" alt="User" />
                  <AvatarFallback className="bg-primary/20 text-primary text-xs">
                    TR
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Trader</p>
                  <p className="text-xs text-muted-foreground">
                    Mode: {globalMode}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Профиль</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Выйти</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Quick Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden h-8 px-2"
                aria-label="Quick menu"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/avatar.png" alt="User" />
                  <AvatarFallback className="bg-primary/20 text-primary text-[10px]">
                    TR
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Trader</p>
                  <p className="text-xs text-muted-foreground">
                    Mode: {globalMode}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {/* Mode Selector for Mobile */}
              <div className="px-2 py-1.5">
                <Label className="text-xs text-muted-foreground">Trading Mode</Label>
                <div className="grid grid-cols-3 gap-1 mt-1">
                  {Object.entries(GLOBAL_MODE_CONFIG).map(([mode, config]) => {
                    const Icon = config.icon;
                    const isActive = globalMode === mode;
                    return (
                      <Button
                        key={mode}
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        className={cn(
                          "h-8 text-[10px] justify-start",
                          isActive && config.bgColor,
                          isActive && config.color
                        )}
                        onClick={() => setGlobalMode(mode as GlobalTradingMode)}
                      >
                        <Icon className="h-3 w-3 mr-1" />
                        {config.label}
                      </Button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {GLOBAL_MODE_CONFIG[globalMode].description}
                </p>
              </div>
              
              {!hasLiveTrading && (
                <DropdownMenuItem onClick={handleResetBalance}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  <span>Reset Balance</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveTab("notifications")}>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
                {notificationCount > 0 && (
                  <Badge variant="destructive" className="ml-auto text-[10px] h-4 px-1">
                    {notificationCount}
                  </Badge>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
