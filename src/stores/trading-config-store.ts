/**
 * Trading Configuration Store
 * 
 * Глобальное управление режимами торговли для всей платформы.
 * Поддерживает MIXED режим, при котором разные компоненты могут 
 * работать на разных биржах в разных режимах одновременно.
 * 
 * Note: TESTNET mode has been merged into DEMO mode.
 *       Former TESTNET accounts are now treated as DEMO accounts.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ==================== TYPES ====================

/**
 * Глобальный режим торговли
 * - PAPER: Полностью симулятивный режим (без реальных API)
 * - DEMO: Demo режим (виртуальные средства, симуляция)
 * - LIVE: Реальная торговля (требует API ключи)
 * - MIXED: Смешанный режим - каждый компонент использует свой режим
 */
export type GlobalTradingMode = "PAPER" | "DEMO" | "LIVE" | "MIXED";

/**
 * Режим торговли для конкретной биржи
 */
export type ExchangeTradingMode = "PAPER" | "DEMO" | "LIVE";

/**
 * Поддерживаемые режимы для бирж
 * Все биржи поддерживают LIVE, DEMO и PAPER режимы
 */
export const EXCHANGE_MODE_SUPPORT: Record<string, ExchangeTradingMode[]> = {
  binance: ["LIVE", "DEMO", "PAPER"],
  bybit: ["LIVE", "DEMO", "PAPER"],
  kucoin: ["LIVE", "DEMO", "PAPER"],
  huobi: ["LIVE", "DEMO", "PAPER"],
  hyperliquid: ["LIVE", "DEMO", "PAPER"],
  bitmex: ["LIVE", "DEMO", "PAPER"],
  coinbase: ["LIVE", "DEMO", "PAPER"],
  aster: ["LIVE", "DEMO", "PAPER"],
  okx: ["LIVE", "DEMO", "PAPER"],
  bitget: ["LIVE", "DEMO", "PAPER"],
  bingx: ["LIVE", "DEMO", "PAPER"],
  blofin: ["LIVE", "DEMO", "PAPER"],
  gate: ["LIVE", "DEMO", "PAPER"],
  mexc: ["LIVE", "DEMO", "PAPER"],
};

/**
 * Информация о режиме торговли
 */
export interface TradingModeInfo {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  requiresApiKey: boolean;
  riskLevel: "none" | "low" | "medium" | "high";
}

export const TRADING_MODE_INFO: Record<ExchangeTradingMode, TradingModeInfo> = {
  PAPER: {
    label: "PAPER",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    description: "Симуляция с реальными ценами, без риска",
    requiresApiKey: false,
    riskLevel: "none",
  },
  DEMO: {
    label: "DEMO",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    description: "Демо режим с виртуальными средствами",
    requiresApiKey: false,
    riskLevel: "low",
  },
  LIVE: {
    label: "LIVE",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    description: "⚠️ Реальная торговля с реальными средствами",
    requiresApiKey: true,
    riskLevel: "high",
  },
};

/**
 * Контекст торговли для конкретного компонента
 */
export interface TradingContext {
  exchangeId: string;
  exchangeType: "spot" | "futures" | "inverse";
  mode: ExchangeTradingMode;
  isActive: boolean;
}

/**
 * Конфигурация режима для биржи
 */
export interface ExchangeModeConfig {
  exchangeId: string;
  exchangeType: "spot" | "futures" | "inverse";
  mode: ExchangeTradingMode;
  isTestnet: boolean;
  accountId?: string;
}

/**
 * Источник торговли
 */
export type TradingSource = 
  | "manual"       // Ручная торговля из формы
  | "signal"       // Сигнальная торговля из чата
  | "bot"          // Автоматическая торговля от ботов
  | "copy"         // Copy trading
  | "api";         // Внешний API

// ==================== STORE INTERFACE ====================

interface TradingConfigStore {
  // Global Mode
  globalMode: GlobalTradingMode;
  setGlobalMode: (mode: GlobalTradingMode) => void;

  // Per-Exchange Configuration
  exchangeConfigs: Record<string, ExchangeModeConfig>;
  setExchangeMode: (exchangeId: string, type: "spot" | "futures" | "inverse", mode: ExchangeTradingMode) => void;
  getExchangeMode: (exchangeId: string, type?: "spot" | "futures" | "inverse") => ExchangeModeConfig | undefined;
  getEffectiveMode: (exchangeId: string, type?: "spot" | "futures" | "inverse") => ExchangeTradingMode;

  // Active Trading Contexts
  activeContexts: Record<TradingSource, TradingContext | null>;
  setActiveContext: (source: TradingSource, context: TradingContext | null) => void;
  getActiveContext: (source: TradingSource) => TradingContext | undefined;

  // Quick Access - Primary Exchange for each source
  primaryExchange: Record<TradingSource, string>;
  setPrimaryExchange: (source: TradingSource, exchangeId: string) => void;

  // Helpers
  getSupportedModes: (exchangeId: string) => ExchangeTradingMode[];
  isLiveTrading: () => boolean;
  getActiveExchanges: () => string[];
  resetToDefaults: () => void;
}

// ==================== INITIAL STATE ====================

const DEFAULT_EXCHANGE_CONFIGS: Record<string, ExchangeModeConfig> = {
  "binance-futures": {
    exchangeId: "binance",
    exchangeType: "futures",
    mode: "PAPER",
    isTestnet: false,
  },
  "bybit-futures": {
    exchangeId: "bybit",
    exchangeType: "futures",
    mode: "PAPER",
    isTestnet: false,
  },
};

const DEFAULT_PRIMARY_EXCHANGE: Record<TradingSource, string> = {
  manual: "binance",
  signal: "binance",
  bot: "binance",
  copy: "binance",
  api: "binance",
};

const DEFAULT_ACTIVE_CONTEXTS: Record<TradingSource, TradingContext | null> = {
  manual: null,
  signal: null,
  bot: null,
  copy: null,
  api: null,
};

// ==================== STORE ====================

export const useTradingConfigStore = create<TradingConfigStore>()(
  persist(
    (set, get) => ({
      // ==================== GLOBAL MODE ====================
      globalMode: "MIXED",
      setGlobalMode: (mode) => set({ globalMode: mode }),

      // ==================== EXCHANGE CONFIGS ====================
      exchangeConfigs: DEFAULT_EXCHANGE_CONFIGS,

      setExchangeMode: (exchangeId, type, mode) => {
        const key = `${exchangeId}-${type}`;
        set((state) => ({
          exchangeConfigs: {
            ...state.exchangeConfigs,
            [key]: {
              exchangeId,
              exchangeType: type,
              mode,
              isTestnet: false, // TESTNET merged into DEMO
            },
          },
        }));
      },

      getExchangeMode: (exchangeId, type = "futures") => {
        const key = `${exchangeId}-${type}`;
        return get().exchangeConfigs[key];
      },

      getEffectiveMode: (exchangeId, type = "futures") => {
        const { globalMode, exchangeConfigs } = get();
        
        // В MIXED режиме используем конфигурацию конкретной биржи
        if (globalMode === "MIXED") {
          const key = `${exchangeId}-${type}`;
          const config = exchangeConfigs[key];
          return config?.mode || "PAPER";
        }
        
        // В других режимах - глобальный режим
        return globalMode as ExchangeTradingMode;
      },

      // ==================== ACTIVE CONTEXTS ====================
      activeContexts: DEFAULT_ACTIVE_CONTEXTS,

      setActiveContext: (source, context) => {
        set((state) => ({
          activeContexts: {
            ...state.activeContexts,
            [source]: context,
          },
        }));
      },

      getActiveContext: (source) => {
        return get().activeContexts[source] || undefined;
      },

      // ==================== PRIMARY EXCHANGE ====================
      primaryExchange: DEFAULT_PRIMARY_EXCHANGE,

      setPrimaryExchange: (source, exchangeId) => {
        set((state) => ({
          primaryExchange: {
            ...state.primaryExchange,
            [source]: exchangeId,
          },
        }));
      },

      // ==================== HELPERS ====================
      getSupportedModes: (exchangeId) => {
        return EXCHANGE_MODE_SUPPORT[exchangeId] || ["LIVE", "DEMO", "PAPER"];
      },

      isLiveTrading: () => {
        const { globalMode, exchangeConfigs } = get();
        
        if (globalMode === "LIVE") return true;
        if (globalMode === "MIXED") {
          return Object.values(exchangeConfigs).some((config) => config.mode === "LIVE");
        }
        return false;
      },

      getActiveExchanges: () => {
        const { exchangeConfigs, activeContexts } = get();
        const exchanges = new Set<string>();
        
        // Из конфигураций с LIVE режимом
        Object.values(exchangeConfigs).forEach((config) => {
          if (config.mode === "LIVE") {
            exchanges.add(config.exchangeId);
          }
        });
        
        // Из активных контекстов
        Object.values(activeContexts).forEach((context) => {
          if (context?.isActive) {
            exchanges.add(context.exchangeId);
          }
        });
        
        return Array.from(exchanges);
      },

      resetToDefaults: () => {
        set({
          globalMode: "MIXED",
          exchangeConfigs: DEFAULT_EXCHANGE_CONFIGS,
          primaryExchange: DEFAULT_PRIMARY_EXCHANGE,
          activeContexts: DEFAULT_ACTIVE_CONTEXTS,
        });
      },
    }),
    {
      name: "trading-config-store",
      partialize: (state) => ({
        globalMode: state.globalMode,
        exchangeConfigs: state.exchangeConfigs,
        primaryExchange: state.primaryExchange,
      }),
    }
  )
);

// ==================== EXPORTS ====================

export type {
  GlobalTradingMode,
  ExchangeTradingMode,
  TradingContext,
  ExchangeModeConfig,
  TradingSource,
};
