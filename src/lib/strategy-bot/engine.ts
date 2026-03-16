/**
 * Strategy Bot Engine
 * 
 * Автоматический торговый бот на основе Strategy Framework + Tactics.
 * 
 * Workflow:
 * 1. Создаётся из протестированной стратегии с тактиками
 * 2. Запускается в режиме BACKTEST для проверки
 * 3. Переходит в PAPER для виртуальной торговли
 * 4. При успешных результатах - LIVE торговля
 * 
 * Интеграция с Grid Bot, DCA Bot, BBot через адаптеры.
 */

import {
  StrategyBotConfig,
  StrategyBotState,
  StrategyBotResult,
  StrategyBotEvent,
  StrategyBotEventCallback,
  BotMode,
  BotStatus,
  BotPosition,
  BotTrade,
  BotEquityPoint,
  BotLogEntry,
  IBotAdapter,
  CreateBotFromBacktestConfig,
  CreateBotFromBacktestResult,
} from "./types";
import { TacticsSet, TrailingStopConfig } from "../strategy/tactics/types";
import { Candle, StrategySignal, Timeframe, IndicatorResult } from "../strategy/types";
import { getStrategyManager } from "../strategy/manager";
import { BacktestEngine } from "../backtesting/engine";
import { BacktestConfig, BacktestResult } from "../backtesting/types";
import { getPaperTradingEngine, PaperTradingEngine } from "../paper-trading/engine";
import { PaperTradingConfig } from "../paper-trading/types";
import { notifyTelegram, notifyUI } from "../notification-service";
import { OhlcvService, MultiExchangeFetcher, type ExchangeId } from "../ohlcv-service";
import { priceService } from "../price/price-service";
import { createExchangeClient, BaseExchangeClient } from "../exchange";

// ==================== STRATEGY BOT ====================

export class StrategyBot {
  private config: StrategyBotConfig;
  private state: StrategyBotState;
  private adapter: IBotAdapter | null = null;
  private eventCallbacks: StrategyBotEventCallback[] = [];
  private checkInterval: NodeJS.Timeout | null = null;
  private candles: Candle[] = [];
  private positionIdCounter: number = 0;
  
  // Tracking
  private maxEquity: number = 0;
  private equityCurve: BotEquityPoint[] = [];
  private logs: BotLogEntry[] = [];
  private trades: BotTrade[] = [];

  constructor(config: StrategyBotConfig) {
    this.config = config;
    this.state = this.createInitialState();
  }

  // ==================== LIFECYCLE ====================

  /**
   * Запустить бота
   */
  async start(): Promise<{ success: boolean; error?: string }> {
    if (this.state.status === "RUNNING") {
      return { success: false, error: "Bot is already running" };
    }

    try {
      // Инициализируем адаптер для нужного режима
      this.adapter = await this.createAdapter();

      if (!this.adapter) {
        return { success: false, error: `Failed to create adapter for mode ${this.config.mode}` };
      }

      // Подписываемся на события адаптера
      this.adapter.subscribe(this.handleAdapterEvent.bind(this));

      // Инициализируем адаптер
      await this.adapter.initialize(this.config);

      // Запускаем адаптер
      await this.adapter.start();

      // Обновляем состояние
      this.state.status = "RUNNING";
      this.state.startedAt = new Date();
      this.state.lastUpdate = new Date();

      // Запускаем периодическую проверку (для PAPER и LIVE)
      if (this.config.mode !== "BACKTEST") {
        this.startPeriodicCheck();
      }

      this.emitEvent({
        type: "BOT_STARTED",
        timestamp: new Date(),
        botId: this.config.id,
        data: { mode: this.config.mode },
      });

      this.log("INFO", `Bot started in ${this.config.mode} mode`);

      // Уведомление
      if (this.config.notifyOnSignal) {
        await notifyTelegram({
          type: "SIGNAL_RECEIVED",
          title: `🤖 Strategy Bot Started`,
          message: `${this.config.name}\nMode: ${this.config.mode}\nStrategy: ${this.config.strategyId}\nSymbol: ${this.config.symbol}`,
        });
      }

      return { success: true };
    } catch (error) {
      this.state.status = "ERROR";
      this.state.error = error instanceof Error ? error.message : "Unknown error";
      this.log("ERROR", `Failed to start bot: ${this.state.error}`);
      
      return { success: false, error: this.state.error };
    }
  }

  /**
   * Остановить бота
   */
  async stop(): Promise<void> {
    if (this.state.status !== "RUNNING" && this.state.status !== "PAUSED") {
      return;
    }

    try {
      // Останавливаем периодическую проверку
      if (this.checkInterval) {
        clearInterval(this.checkInterval);
        this.checkInterval = null;
      }

      // Останавливаем адаптер
      if (this.adapter) {
        await this.adapter.stop();
      }

      this.state.status = "STOPPED";
      this.state.stoppedAt = new Date();
      this.state.lastUpdate = new Date();

      this.emitEvent({
        type: "BOT_STOPPED",
        timestamp: new Date(),
        botId: this.config.id,
      });

      this.log("INFO", "Bot stopped");
    } catch (error) {
      this.log("ERROR", `Error stopping bot: ${error}`);
    }
  }

  /**
   * Приостановить бота
   */
  async pause(): Promise<void> {
    if (this.state.status !== "RUNNING") return;

    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }

    if (this.adapter) {
      await this.adapter.pause();
    }

    this.state.status = "PAUSED";
    this.state.lastUpdate = new Date();

    this.emitEvent({
      type: "BOT_PAUSED",
      timestamp: new Date(),
      botId: this.config.id,
    });

    this.log("INFO", "Bot paused");
  }

  /**
   * Возобновить работу
   */
  async resume(): Promise<void> {
    if (this.state.status !== "PAUSED") return;

    if (this.adapter) {
      await this.adapter.resume();
    }

    this.state.status = "RUNNING";
    this.state.lastUpdate = new Date();

    this.startPeriodicCheck();

    this.emitEvent({
      type: "BOT_RESUMED",
      timestamp: new Date(),
      botId: this.config.id,
    });

    this.log("INFO", "Bot resumed");
  }

  // ==================== TRADING ====================

  /**
   * Обработать новые свечи
   */
  async processCandles(candles: Candle[]): Promise<StrategySignal | null> {
    if (this.state.status !== "RUNNING") return null;

    this.candles = candles;

    try {
      const strategyManager = getStrategyManager();
      const strategy = strategyManager.getStrategy(this.config.strategyId);

      if (!strategy) {
        this.log("ERROR", `Strategy ${this.config.strategyId} not found`);
        return null;
      }

      // Инициализируем стратегию
      strategy.initialize(this.config.strategyParameters);

      // Рассчитываем индикаторы
      const indicators = strategy.populateIndicators(candles);
      const currentPrice = candles[candles.length - 1].close;

      // Генерируем сигнал
      const signal = strategy.populateEntrySignal(candles, indicators, currentPrice);

      if (signal) {
        signal.symbol = this.config.symbol;
        this.state.lastSignal = signal;
        this.state.signalsGenerated++;

        this.emitEvent({
          type: "SIGNAL_GENERATED",
          timestamp: new Date(),
          botId: this.config.id,
          data: { signal },
        });

        // Проверяем возможность открытия позиции
        if (this.canOpenPosition()) {
          await this.executeSignal(signal, currentPrice);
        } else {
          this.state.signalsSkipped++;
          this.emitEvent({
            type: "SIGNAL_SKIPPED",
            timestamp: new Date(),
            botId: this.config.id,
            data: { signal, reason: "Position limit reached" },
          });
        }
      }

      // Проверяем выходы для открытых позиций
      await this.checkExitSignals(candles, indicators, currentPrice);

      // Обновляем эквити
      this.updateEquity(currentPrice);

      return signal;
    } catch (error) {
      this.log("ERROR", `Error processing candles: ${error}`);
      return null;
    }
  }

  /**
   * Выполнить сигнал
   */
  private async executeSignal(signal: StrategySignal, price: number): Promise<void> {
    if (!this.adapter) return;

    if (signal.type !== "LONG" && signal.type !== "SHORT") return;
    if (signal.type === "SHORT" && !this.config.allowShort) {
      this.log("INFO", "Short signals are disabled");
      return;
    }

    try {
      const position = await this.adapter.openPosition(signal, this.config.tacticsSet);

      if (position) {
        this.state.openPositions.push(position);
        this.state.lastUpdate = new Date();

        this.emitEvent({
          type: "POSITION_OPENED",
          timestamp: new Date(),
          botId: this.config.id,
          data: { position },
        });

        this.log("INFO", `Opened ${position.direction} position at ${position.avgEntryPrice}`);

        if (this.config.notifyOnTrade) {
          await notifyUI({
            type: "POSITION_OPENED",
            title: `📊 Position Opened`,
            message: `${this.config.symbol} ${position.direction}\nEntry: ${position.avgEntryPrice}\nSize: ${position.totalSize}`,
          });
        }
      }
    } catch (error) {
      this.log("ERROR", `Failed to execute signal: ${error}`);
    }
  }

  /**
   * Проверить сигналы выхода
   */
  private async checkExitSignals(
    candles: Candle[],
    indicators: IndicatorResult,
    currentPrice: number
  ): Promise<void> {
    if (!this.adapter) return;

    const strategyManager = getStrategyManager();
    const strategy = strategyManager.getStrategy(this.config.strategyId);

    if (!strategy) return;

    for (const position of this.state.openPositions) {
      if (position.status !== "OPEN") continue;

      const exitSignal = strategy.populateExitSignal(candles, indicators, {
        direction: position.direction,
        entryPrice: position.avgEntryPrice,
        currentPrice,
        size: position.totalSize,
        openTime: position.openedAt,
      });

      if (exitSignal && 
          (exitSignal.type === "EXIT_LONG" && position.direction === "LONG" ||
           exitSignal.type === "EXIT_SHORT" && position.direction === "SHORT")) {
        await this.adapter.closePosition(position.id, "SIGNAL");
      }
    }
  }

  /**
   * Проверить возможность открытия позиции
   */
  private canOpenPosition(): boolean {
    const openCount = this.state.openPositions.filter(p => p.status === "OPEN").length;
    
    if (openCount >= this.config.maxOpenPositions) return false;

    // Проверяем максимальную просадку
    if (this.state.currentDrawdown >= this.config.maxDrawdown) return false;

    return true;
  }

  // ==================== ADAPTER CREATION ====================

  /**
   * Создать адаптер для нужного режима
   */
  private async createAdapter(): Promise<IBotAdapter | null> {
    switch (this.config.mode) {
      case "BACKTEST":
        return new BacktestAdapter(this.config, this);
      case "PAPER":
        return new PaperAdapter(this.config, this);
      case "LIVE":
        return new LiveAdapter(this.config, this);
      default:
        return null;
    }
  }

  // ==================== STATE MANAGEMENT ====================

  /**
   * Создать начальное состояние
   */
  private createInitialState(): StrategyBotState {
    return {
      botId: this.config.id,
      status: "IDLE",
      mode: this.config.mode,
      openPositions: [],
      positionHistory: [],
      balance: this.config.initialBalance,
      equity: this.config.initialBalance,
      unrealizedPnl: 0,
      realizedPnl: 0,
      totalPnl: 0,
      maxDrawdown: 0,
      currentDrawdown: 0,
      tradesCount: 0,
      winsCount: 0,
      lossesCount: 0,
      winRate: 0,
      signalsGenerated: 0,
      signalsSkipped: 0,
      lastUpdate: new Date(),
    };
  }

  /**
   * Обновить эквити
   */
  private updateEquity(currentPrice: number): void {
    // Рассчитываем нереализованный PnL
    let unrealizedPnl = 0;
    for (const position of this.state.openPositions) {
      if (position.status === "OPEN") {
        position.currentPrice = currentPrice;
        if (position.direction === "LONG") {
          position.unrealizedPnl = (currentPrice - position.avgEntryPrice) * position.totalSize;
        } else {
          position.unrealizedPnl = (position.avgEntryPrice - currentPrice) * position.totalSize;
        }
        unrealizedPnl += position.unrealizedPnl;
      }
    }

    this.state.unrealizedPnl = unrealizedPnl;
    this.state.equity = this.state.balance + unrealizedPnl;

    // Обновляем максимальное эквити
    if (this.state.equity > this.maxEquity) {
      this.maxEquity = this.state.equity;
    }

    // Рассчитываем просадку
    this.state.currentDrawdown = this.maxEquity > 0 
      ? ((this.maxEquity - this.state.equity) / this.maxEquity) * 100 
      : 0;
    
    if (this.state.currentDrawdown > this.state.maxDrawdown) {
      this.state.maxDrawdown = this.state.currentDrawdown;
    }

    this.state.totalPnl = this.state.equity - this.config.initialBalance;

    // Записываем точку эквити
    const point: BotEquityPoint = {
      timestamp: new Date(),
      balance: this.state.balance,
      equity: this.state.equity,
      unrealizedPnl: this.state.unrealizedPnl,
      realizedPnl: this.state.realizedPnl,
      drawdown: this.maxEquity - this.state.equity,
      drawdownPercent: this.state.currentDrawdown,
      openPositions: this.state.openPositions.filter(p => p.status === "OPEN").length,
      tradesCount: this.trades.length,
    };
    this.equityCurve.push(point);

    this.state.lastUpdate = new Date();
  }

  // ==================== PERIODIC CHECK ====================

  /**
   * Запустить периодическую проверку
   */
  private startPeriodicCheck(): void {
    const interval = this.config.mode === "PAPER" 
      ? this.config.paperSettings?.checkInterval || 60000
      : this.config.liveSettings?.checkInterval || 60000;

    this.checkInterval = setInterval(async () => {
      try {
        await this.runPeriodicCheck();
      } catch (error) {
        this.log("ERROR", `Periodic check error: ${error}`);
      }
    }, interval);
  }

  /**
   * Выполнить периодическую проверку
   */
  private async runPeriodicCheck(): Promise<void> {
    if (this.state.status !== "RUNNING" || !this.adapter) return;

    try {
      // Получаем свечи
      const candles = await this.adapter.getCandles(
        this.config.symbol,
        this.config.timeframe,
        500
      );

      if (candles.length > 0) {
        await this.processCandles(candles);
      }

      // Обновляем цены позиций
      const currentPrice = await this.adapter.getCurrentPrice(this.config.symbol);
      this.updatePositionPrices(currentPrice);
    } catch (error) {
      this.log("ERROR", `Periodic check failed: ${error}`);
    }
  }

  /**
   * Обновить цены позиций
   */
  private updatePositionPrices(price: number): void {
    for (const position of this.state.openPositions) {
      if (position.status !== "OPEN") continue;

      position.currentPrice = price;

      // Проверяем SL
      if (position.stopLoss) {
        const isSLHit = position.direction === "LONG"
          ? price <= position.stopLoss
          : price >= position.stopLoss;

        if (isSLHit && this.adapter) {
          this.adapter.closePosition(position.id, "SL");
        }
      }

      // Проверяем TP
      for (const tp of position.takeProfitTargets) {
        if (tp.filled) continue;

        const isTPHit = position.direction === "LONG"
          ? price >= tp.price
          : price <= tp.price;

        if (isTPHit && this.adapter) {
          // Частичное закрытие
          this.handlePartialClose(position, tp, price);
        }
      }

      // Обновляем трейлинг
      this.updateTrailingStop(position, price);
    }
  }

  /**
   * Обработать частичное закрытие
   */
  private handlePartialClose(position: BotPosition, tp: BotPosition["takeProfitTargets"][0], price: number): void {
    tp.filled = true;
    tp.filledAt = new Date();

    // Если все TP закрыты, закрываем позицию
    const allFilled = position.takeProfitTargets.every(t => t.filled);
    if (allFilled && this.adapter) {
      this.adapter.closePosition(position.id, "TP");
    }
  }

  /**
   * Обновить трейлинг-стоп
   */
  private updateTrailingStop(position: BotPosition, price: number): void {
    const trailing = position.trailingState;
    if (!trailing || !trailing.activated) return;

    if (position.direction === "LONG") {
      if (price > (trailing.highestPrice || 0)) {
        trailing.highestPrice = price;
        const trailingConfig = this.config.tacticsSet.takeProfit.trailingConfig;
        if (trailingConfig?.percentValue) {
          const newSL = price * (1 - trailingConfig.percentValue / 100);
          if (!position.stopLoss || newSL > position.stopLoss) {
            position.stopLoss = newSL;
            trailing.currentStopPrice = newSL;
            this.log("DEBUG", `Trailing SL updated to ${newSL}`);
          }
        }
      }
    } else {
      if (price < (trailing.lowestPrice || Infinity)) {
        trailing.lowestPrice = price;
        const trailingConfig = this.config.tacticsSet.takeProfit.trailingConfig;
        if (trailingConfig?.percentValue) {
          const newSL = price * (1 + trailingConfig.percentValue / 100);
          if (!position.stopLoss || newSL < position.stopLoss) {
            position.stopLoss = newSL;
            trailing.currentStopPrice = newSL;
          }
        }
      }
    }
  }

  // ==================== EVENTS ====================

  /**
   * Подписаться на события
   */
  subscribe(callback: StrategyBotEventCallback): void {
    this.eventCallbacks.push(callback);
  }

  /**
   * Отписаться от событий
   */
  unsubscribe(callback: StrategyBotEventCallback): void {
    const index = this.eventCallbacks.indexOf(callback);
    if (index > -1) {
      this.eventCallbacks.splice(index, 1);
    }
  }

  /**
   * Отправить событие
   */
  private emitEvent(event: StrategyBotEvent): void {
    for (const callback of this.eventCallbacks) {
      try {
        callback(event);
      } catch (error) {
        console.error("Event callback error:", error);
      }
    }
  }

  /**
   * Обработать событие от адаптера
   */
  private handleAdapterEvent(event: StrategyBotEvent): void {
    // Обновляем состояние на основе события
    switch (event.type) {
      case "POSITION_CLOSED":
        this.handlePositionClosed(event.data as { position: BotPosition; trade?: BotTrade });
        break;
      case "MAX_DRAWDOWN_REACHED":
        this.state.status = "STOPPED";
        break;
    }

    // Пробрасываем событие наверх
    this.emitEvent(event);
  }

  /**
   * Обработать закрытие позиции
   */
  private handlePositionClosed(data: { position: BotPosition; trade?: BotTrade }): void {
    const { position, trade } = data;

    // Удаляем из открытых
    const index = this.state.openPositions.findIndex(p => p.id === position.id);
    if (index > -1) {
      this.state.openPositions.splice(index, 1);
    }

    // Добавляем в историю
    this.state.positionHistory.push(position);

    // Обновляем статистику
    if (trade) {
      this.trades.push(trade);
      this.state.tradesCount++;
      if (trade.pnl > 0) {
        this.state.winsCount++;
      } else {
        this.state.lossesCount++;
      }
      this.state.winRate = (this.state.winsCount / this.state.tradesCount) * 100;
      this.state.realizedPnl += trade.pnl;
      this.state.balance += trade.pnl - trade.fees;
    }

    this.state.lastUpdate = new Date();
  }

  // ==================== UTILITIES ====================

  /**
   * Записать лог
   */
  private log(level: BotLogEntry["level"], message: string, data?: Record<string, unknown>): void {
    const entry: BotLogEntry = {
      timestamp: new Date(),
      level,
      message,
      data,
    };
    this.logs.push(entry);

    // Также выводим в консоль
    const logMethod = level === "ERROR" ? console.error : level === "WARNING" ? console.warn : console.log;
    logMethod(`[StrategyBot ${this.config.name}] ${message}`);
  }

  // ==================== GETTERS ====================

  /**
   * Получить конфигурацию
   */
  getConfig(): StrategyBotConfig {
    return this.config;
  }

  /**
   * Получить состояние
   */
  getState(): StrategyBotState {
    return { ...this.state };
  }

  /**
   * Получить результат
   */
  getResult(): StrategyBotResult {
    return {
      botId: this.config.id,
      mode: this.config.mode,
      status: this.state.status,
      initialBalance: this.config.initialBalance,
      finalBalance: this.state.balance,
      finalEquity: this.state.equity,
      totalPnl: this.state.totalPnl,
      totalPnlPercent: (this.state.totalPnl / this.config.initialBalance) * 100,
      metrics: this.state.backtestMetrics || this.calculateMetrics(),
      trades: this.trades,
      equityCurve: this.equityCurve,
      startedAt: this.state.startedAt || new Date(),
      completedAt: this.state.stoppedAt || new Date(),
      duration: (this.state.stoppedAt?.getTime() || Date.now()) - (this.state.startedAt?.getTime() || Date.now()),
      logs: this.logs,
    };
  }

  /**
   * Рассчитать метрики
   */
  private calculateMetrics() {
    const wins = this.trades.filter(t => t.pnl > 0);
    const losses = this.trades.filter(t => t.pnl <= 0);
    const totalPnl = this.trades.reduce((sum, t) => sum + t.pnl, 0);
    const grossProfit = wins.reduce((sum, t) => sum + t.pnl, 0);
    const grossLoss = Math.abs(losses.reduce((sum, t) => sum + t.pnl, 0));

    return {
      totalTrades: this.trades.length,
      winningTrades: wins.length,
      losingTrades: losses.length,
      winRate: this.state.winRate,
      totalPnl,
      totalPnlPercent: (totalPnl / this.config.initialBalance) * 100,
      avgPnl: this.trades.length > 0 ? totalPnl / this.trades.length : 0,
      avgWin: wins.length > 0 ? grossProfit / wins.length : 0,
      avgLoss: losses.length > 0 ? grossLoss / losses.length : 0,
      maxWin: wins.length > 0 ? Math.max(...wins.map(t => t.pnl)) : 0,
      maxLoss: losses.length > 0 ? Math.min(...losses.map(t => t.pnl)) : 0,
      profitFactor: grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? Infinity : 0,
      riskRewardRatio: 0,
      sharpeRatio: 0,
      sortinoRatio: 0,
      calmarRatio: 0,
      maxDrawdown: this.state.maxDrawdown,
      maxDrawdownPercent: this.state.maxDrawdown,
      avgDrawdown: 0,
      timeInDrawdown: 0,
      maxDrawdownDuration: 0,
      maxWinStreak: 0,
      maxLossStreak: 0,
      currentStreak: { type: "NONE" as const, count: 0 },
      avgTradeDuration: 0,
      avgWinDuration: 0,
      avgLossDuration: 0,
      avgDailyReturn: 0,
      avgWeeklyReturn: 0,
      avgMonthlyReturn: 0,
      annualizedReturn: 0,
      annualizedVolatility: 0,
      marketExposure: 0,
      avgPositionSize: 0,
      avgLeverage: this.config.maxLeverage,
      var95: 0,
      expectedShortfall95: 0,
    };
  }
}

// ==================== ADAPTERS ====================

/**
 * Адаптер для Backtest режима
 */
class BacktestAdapter implements IBotAdapter {
  readonly type: BotMode = "BACKTEST";
  private config: StrategyBotConfig | null = null;
  private bot: StrategyBot;
  private backtestEngine: BacktestEngine | null = null;
  private eventCallbacks: StrategyBotEventCallback[] = [];
  private candles: Candle[] = [];
  private positions: BotPosition[] = [];
  private positionIdCounter: number = 0;

  constructor(config: StrategyBotConfig, bot: StrategyBot) {
    this.bot = bot;
  }

  async initialize(config: StrategyBotConfig): Promise<void> {
    this.config = config;
  }

  async start(): Promise<void> {
    if (!this.config) return;

    // Создаём конфиг для Backtest Engine
    const backtestConfig: BacktestConfig = {
      id: `backtest-${this.config.id}`,
      name: this.config.name,
      strategyId: this.config.strategyId,
      strategyParameters: this.config.strategyParameters,
      tacticsSet: this.config.tacticsSet,
      symbol: this.config.symbol,
      timeframe: this.config.timeframe,
      startDate: this.config.backtestSettings?.startDate || new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      endDate: this.config.backtestSettings?.endDate || new Date(),
      initialBalance: this.config.initialBalance,
      balanceCurrency: "USDT",
      maxOpenPositions: this.config.maxOpenPositions,
      maxDrawdown: this.config.maxDrawdown,
      maxLeverage: this.config.maxLeverage,
      allowShort: this.config.allowShort,
      feePercent: this.config.feePercent,
      slippagePercent: 0.05,
      marginMode: "isolated",
    };

    this.backtestEngine = new BacktestEngine(backtestConfig);
  }

  async stop(): Promise<void> {
    this.backtestEngine = null;
  }

  async pause(): Promise<void> {}
  async resume(): Promise<void> {}

  async getCandles(symbol: string, timeframe: Timeframe, limit?: number): Promise<Candle[]> {
    return this.candles.slice(-(limit || 500));
  }

  async getCurrentPrice(symbol: string): Promise<number> {
    return this.candles[this.candles.length - 1]?.close || 0;
  }

  async openPosition(signal: StrategySignal, tactics: TacticsSet): Promise<BotPosition | null> {
    if (!this.config) return null;

    const price = signal.price;
    const size = this.calculatePositionSize(price);
    const leverage = this.config.maxLeverage;
    const margin = (size * price) / leverage;

    const position: BotPosition = {
      id: `pos-${++this.positionIdCounter}`,
      symbol: this.config.symbol,
      direction: signal.type as "LONG" | "SHORT",
      status: "OPEN",
      avgEntryPrice: price,
      entries: [{
        index: 1,
        price,
        size,
        fee: size * price * (this.config.feePercent / 100),
        timestamp: new Date(),
        orderType: "MARKET",
      }],
      totalSize: size,
      openedAt: new Date(),
      exits: [],
      currentPrice: price,
      takeProfitTargets: [],
      unrealizedPnl: 0,
      realizedPnl: 0,
      totalFees: 0,
      leverage,
      margin,
      liquidationPrice: this.calculateLiquidationPrice(price, signal.type as "LONG" | "SHORT", leverage),
      tacticsSetId: tactics.id,
    };

    // Устанавливаем SL/TP
    if (tactics.stopLoss.slPercent) {
      position.stopLoss = signal.type === "LONG"
        ? price * (1 - tactics.stopLoss.slPercent / 100)
        : price * (1 + tactics.stopLoss.slPercent / 100);
    }

    if (tactics.takeProfit.tpPercent) {
      position.takeProfitTargets = [{
        index: 1,
        price: signal.type === "LONG"
          ? price * (1 + tactics.takeProfit.tpPercent / 100)
          : price * (1 - tactics.takeProfit.tpPercent / 100),
        closePercent: 100,
        filled: false,
      }];
    }

    this.positions.push(position);
    return position;
  }

  async closePosition(positionId: string, reason: BotPosition["closeReason"]): Promise<void> {
    const position = this.positions.find(p => p.id === positionId);
    if (!position || position.status !== "OPEN") return;

    position.status = "CLOSED";
    position.closedAt = new Date();
    position.closeReason = reason;

    // Рассчитываем PnL
    const exitPrice = position.currentPrice;
    const pnl = position.direction === "LONG"
      ? (exitPrice - position.avgEntryPrice) * position.totalSize
      : (position.avgEntryPrice - exitPrice) * position.totalSize;

    position.realizedPnl = pnl;
    position.avgExitPrice = exitPrice;

    this.emitEvent({
      type: "POSITION_CLOSED",
      timestamp: new Date(),
      botId: this.config?.id || "",
      data: { position },
    });
  }

  async closeAllPositions(reason: BotPosition["closeReason"]): Promise<void> {
    for (const position of this.positions) {
      if (position.status === "OPEN") {
        await this.closePosition(position.id, reason);
      }
    }
  }

  getState(): StrategyBotState {
    return this.bot.getState();
  }

  getResult(): StrategyBotResult {
    return this.bot.getResult();
  }

  subscribe(callback: StrategyBotEventCallback): void {
    this.eventCallbacks.push(callback);
  }

  unsubscribe(callback: StrategyBotEventCallback): void {
    const index = this.eventCallbacks.indexOf(callback);
    if (index > -1) {
      this.eventCallbacks.splice(index, 1);
    }
  }

  private emitEvent(event: StrategyBotEvent): void {
    for (const callback of this.eventCallbacks) {
      callback(event);
    }
  }

  private calculatePositionSize(price: number): number {
    if (!this.config) return 0;
    const riskAmount = this.config.initialBalance * (this.config.maxRiskPerTrade / 100);
    return riskAmount / price;
  }

  private calculateLiquidationPrice(entryPrice: number, direction: "LONG" | "SHORT", leverage: number): number {
    const liquidationPercent = 100 / leverage;
    return direction === "LONG"
      ? entryPrice * (1 - liquidationPercent / 100)
      : entryPrice * (1 + liquidationPercent / 100);
  }

  /**
   * Установить свечи для бэктеста
   */
  setCandles(candles: Candle[]): void {
    this.candles = candles;
  }
}

/**
 * Адаптер для Paper Trading режима
 */
class PaperAdapter implements IBotAdapter {
  readonly type: BotMode = "PAPER";
  private config: StrategyBotConfig | null = null;
  private bot: StrategyBot;
  private paperEngine: PaperTradingEngine;
  private accountId: string = "";
  private eventCallbacks: StrategyBotEventCallback[] = [];

  constructor(config: StrategyBotConfig, bot: StrategyBot) {
    this.bot = bot;
    this.paperEngine = getPaperTradingEngine();
  }

  async initialize(config: StrategyBotConfig): Promise<void> {
    this.config = config;
    this.accountId = config.paperSettings?.accountId || `paper-${config.id}`;

    // Создаём или получаем виртуальный счёт
    const existingAccount = this.paperEngine.getAccount(this.accountId);
    if (!existingAccount) {
      const paperConfig: PaperTradingConfig = {
        id: this.accountId,
        name: config.name,
        strategyId: config.strategyId,
        tacticsSets: [config.tacticsSet],
        initialBalance: config.initialBalance,
        currency: "USDT",
        exchange: "binance",
        symbols: [config.symbol],
        timeframe: config.timeframe,
        maxOpenPositions: config.maxOpenPositions,
        maxRiskPerTrade: config.maxRiskPerTrade,
        maxDrawdown: config.maxDrawdown,
        maxLeverage: config.maxLeverage,
        feePercent: config.feePercent,
        slippagePercent: 0.05,
        autoTrading: config.paperSettings?.autoTrading ?? true,
        checkInterval: config.paperSettings?.checkInterval || 60000,
        notifications: {
          onEntry: config.notifyOnTrade ?? true,
          onExit: config.notifyOnTrade ?? true,
          onError: config.notifyOnError ?? true,
          onMaxDrawdown: true,
        },
      };
      this.paperEngine.createAccount(paperConfig);
    }
  }

  async start(): Promise<void> {
    this.paperEngine.start(this.accountId);
  }

  async stop(): Promise<void> {
    this.paperEngine.stop(this.accountId);
  }

  async pause(): Promise<void> {
    this.paperEngine.pause(this.accountId);
  }

  async resume(): Promise<void> {
    this.paperEngine.resume(this.accountId);
  }

  async getCandles(symbol: string, timeframe: Timeframe, limit?: number): Promise<Candle[]> {
    try {
      const exchange = (this.config?.paperSettings?.exchange || 'binance') as ExchangeId;
      const marketType = 'futures';
      
      // Сначала пробуем получить из БД
      const dbCandles = await OhlcvService.getCandles({
        symbol,
        exchange,
        timeframe,
        limit: limit || 500,
      });
      
      if (dbCandles.length > 0) {
        return dbCandles.map(c => ({
          timestamp: c.openTime,
          open: c.open,
          high: c.high,
          low: c.low,
          close: c.close,
          volume: c.volume,
        }));
      }
      
      // Если в БД нет, получаем напрямую с биржи
      const fetcherCandles = await MultiExchangeFetcher.fetchKlines({
        exchange,
        symbol,
        interval: timeframe,
        limit: limit || 500,
        marketType,
      });
      
      return fetcherCandles.map(c => ({
        timestamp: c.openTime,
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
        volume: c.volume,
      }));
    } catch (error) {
      console.error('[PaperAdapter] Error fetching candles:', error);
      return [];
    }
  }

  async getCurrentPrice(symbol: string): Promise<number> {
    try {
      const exchange = this.config?.paperSettings?.exchange || 'binance';
      const price = await priceService.getPrice(symbol, exchange);
      return price;
    } catch (error) {
      console.error('[PaperAdapter] Error fetching price:', error);
      return 0;
    }
  }

  async openPosition(signal: StrategySignal, tactics: TacticsSet): Promise<BotPosition | null> {
    if (!this.config) return null;

    const result = this.paperEngine.openPosition(
      this.accountId,
      signal.symbol,
      signal.type as "LONG" | "SHORT",
      this.calculatePositionSize(signal.price),
      signal.price,
      {
        leverage: this.config.maxLeverage,
        tacticsSet: tactics,
      }
    );

    if (result.success && result.position) {
      // Конвертируем PaperPosition в BotPosition
      return this.convertToBotPosition(result.position);
    }

    return null;
  }

  async closePosition(positionId: string, reason: BotPosition["closeReason"]): Promise<void> {
    const account = this.paperEngine.getAccount(this.accountId);
    if (!account) return;

    const position = account.positions.find(p => p.id === positionId);
    if (position) {
      // Map BotPosition closeReason to PaperTradeExit reason
      const mappedReason = reason === "MAX_DRAWDOWN" ? "MANUAL" : reason || "MANUAL";
      this.paperEngine.closePosition(account, position, position.currentPrice, mappedReason as "TP" | "SL" | "SIGNAL" | "MANUAL" | "LIQUIDATION" | "TRAILING_STOP");
    }
  }

  async closeAllPositions(reason: BotPosition["closeReason"]): Promise<void> {
    const account = this.paperEngine.getAccount(this.accountId);
    if (!account) return;

    const prices: Record<string, number> = {};
    for (const pos of account.positions) {
      prices[pos.symbol] = pos.currentPrice;
    }

    this.paperEngine.closeAllPositions(this.accountId, prices);
  }

  getState(): StrategyBotState {
    return this.bot.getState();
  }

  getResult(): StrategyBotResult {
    return this.bot.getResult();
  }

  subscribe(callback: StrategyBotEventCallback): void {
    this.eventCallbacks.push(callback);
  }

  unsubscribe(callback: StrategyBotEventCallback): void {
    const index = this.eventCallbacks.indexOf(callback);
    if (index > -1) {
      this.eventCallbacks.splice(index, 1);
    }
  }

  private calculatePositionSize(price: number): number {
    if (!this.config) return 0;
    const account = this.paperEngine.getAccount(this.accountId);
    const balance = account?.balance || this.config.initialBalance;
    const riskAmount = balance * (this.config.maxRiskPerTrade / 100);
    return riskAmount / price;
  }

  private convertToBotPosition(position: any): BotPosition {
    return {
      id: position.id,
      symbol: position.symbol,
      direction: position.direction,
      status: position.status,
      avgEntryPrice: position.avgEntryPrice,
      entries: position.entries,
      totalSize: position.totalSize,
      openedAt: position.openedAt,
      exits: position.exits,
      currentPrice: position.currentPrice,
      takeProfitTargets: position.takeProfitTargets,
      unrealizedPnl: position.unrealizedPnl,
      realizedPnl: position.realizedPnl,
      totalFees: position.totalFees,
      leverage: position.leverage,
      margin: position.margin,
      liquidationPrice: position.liquidationPrice,
      tacticsSetId: position.tacticsState?.tacticsSetId || "",
      trailingState: position.tacticsState?.trailingState,
    };
  }
}

/**
 * Адаптер для Live Trading режима
 */
class LiveAdapter implements IBotAdapter {
  readonly type: BotMode = "LIVE";
  private config: StrategyBotConfig | null = null;
  private bot: StrategyBot;
  private eventCallbacks: StrategyBotEventCallback[] = [];
  private positions: Map<string, BotPosition> = new Map();
  private positionIdCounter: number = 0;
  private exchangeClient: BaseExchangeClient | null = null;

  constructor(config: StrategyBotConfig, bot: StrategyBot) {
    this.bot = bot;
  }

  async initialize(config: StrategyBotConfig): Promise<void> {
    this.config = config;
    
    if (!config.liveSettings?.exchangeId || !config.liveSettings?.credentials) {
      throw new Error('Live trading requires exchangeId and credentials in liveSettings');
    }
    
    try {
      this.exchangeClient = createExchangeClient(config.liveSettings.exchangeId, {
        credentials: config.liveSettings.credentials,
        marketType: config.liveSettings.marketType || 'futures',
        testnet: config.liveSettings.testnet ?? false,
        tradingMode: config.liveSettings.testnet ? 'TESTNET' : 'LIVE',
      });
      
      console.log(`[LiveAdapter] Initialized ${config.liveSettings.exchangeId} client`);
    } catch (error) {
      console.error('[LiveAdapter] Failed to initialize exchange client:', error);
      throw error;
    }
  }

  async start(): Promise<void> {
    if (!this.exchangeClient) {
      throw new Error('Exchange client not initialized');
    }
    
    // Синхронизируем существующие позиции с биржи
    try {
      const openPositions = await this.exchangeClient.getOpenPositions();
      for (const pos of openPositions) {
        // Конвертируем в BotPosition формат
        const botPos: BotPosition = {
          id: `live-${pos.symbol}-${Date.now()}`,
          symbol: pos.symbol,
          direction: pos.side === 'LONG' ? 'LONG' : 'SHORT',
          status: 'OPEN',
          avgEntryPrice: pos.entryPrice,
          entries: [{
            index: 1,
            price: pos.entryPrice,
            size: pos.size,
            fee: 0,
            timestamp: new Date(),
            orderType: 'MARKET',
          }],
          totalSize: pos.size,
          openedAt: new Date(),
          exits: [],
          currentPrice: pos.markPrice || pos.entryPrice,
          takeProfitTargets: [],
          unrealizedPnl: pos.unrealizedPnl || 0,
          realizedPnl: 0,
          totalFees: 0,
          leverage: pos.leverage || 1,
          margin: (pos.size * pos.entryPrice) / (pos.leverage || 1),
          liquidationPrice: pos.liquidationPrice || 0,
          tacticsSetId: this.config?.tacticsSet?.id || '',
        };
        this.positions.set(botPos.id, botPos);
      }
      
      console.log(`[LiveAdapter] Synced ${openPositions.length} positions from exchange`);
    } catch (error) {
      console.error('[LiveAdapter] Failed to sync positions:', error);
    }
  }

  async stop(): Promise<void> {
    // При остановке не закрываем позиции, просто прекращаем торговлю
    console.log('[LiveAdapter] Stopped - positions remain on exchange');
  }

  async pause(): Promise<void> {}
  async resume(): Promise<void> {}

  async getCandles(symbol: string, timeframe: Timeframe, limit?: number): Promise<Candle[]> {
    if (!this.exchangeClient) {
      console.warn('[LiveAdapter] No exchange client for candles');
      return [];
    }
    
    try {
      const exchange = this.config?.liveSettings?.exchangeId as ExchangeId || 'binance';
      
      // Сначала пробуем из БД
      const dbCandles = await OhlcvService.getCandles({
        symbol,
        exchange,
        timeframe,
        limit: limit || 500,
      });
      
      if (dbCandles.length > 0) {
        return dbCandles.map(c => ({
          timestamp: c.openTime,
          open: c.open,
          high: c.high,
          low: c.low,
          close: c.close,
          volume: c.volume,
        }));
      }
      
      // Fallback на API биржи
      const klines = await this.exchangeClient.getKlines(
        symbol,
        timeframe,
        limit || 500
      );
      
      return klines.map(k => ({
        timestamp: new Date(k.timestamp),
        open: k.open,
        high: k.high,
        low: k.low,
        close: k.close,
        volume: k.volume,
      }));
    } catch (error) {
      console.error('[LiveAdapter] Error fetching candles:', error);
      return [];
    }
  }

  async getCurrentPrice(symbol: string): Promise<number> {
    if (!this.exchangeClient) {
      // Fallback на priceService
      try {
        const exchange = this.config?.liveSettings?.exchangeId || 'binance';
        return await priceService.getPrice(symbol, exchange);
      } catch {
        return 0;
      }
    }
    
    try {
      const ticker = await this.exchangeClient.getTicker(symbol);
      return ticker.lastPrice;
    } catch (error) {
      console.error('[LiveAdapter] Error fetching price:', error);
      return 0;
    }
  }

  async openPosition(signal: StrategySignal, tactics: TacticsSet): Promise<BotPosition | null> {
    if (!this.exchangeClient || !this.config) {
      console.error('[LiveAdapter] Cannot open position - no exchange client');
      return null;
    }

    try {
      const side = signal.type === 'LONG' ? 'BUY' : 'SELL';
      const size = this.calculatePositionSize(signal.price);
      
      // Отправляем ордер на биржу
      const order = await this.exchangeClient.createMarketOrder(
        signal.symbol,
        side,
        size,
        {
          reduceOnly: false,
        }
      );
      
      // Создаём BotPosition
      const position: BotPosition = {
        id: `live-${order.orderId}`,
        symbol: signal.symbol,
        direction: signal.type as 'LONG' | 'SHORT',
        status: 'OPEN',
        avgEntryPrice: order.avgPrice || signal.price,
        entries: [{
          index: 1,
          price: order.avgPrice || signal.price,
          size: order.filledQty || size,
          fee: order.fee || 0,
          timestamp: new Date(),
          orderType: 'MARKET',
        }],
        totalSize: order.filledQty || size,
        openedAt: new Date(),
        exits: [],
        currentPrice: order.avgPrice || signal.price,
        takeProfitTargets: this.createTakeProfitTargets(signal, tactics),
        stopLoss: this.calculateStopLoss(signal, tactics),
        unrealizedPnl: 0,
        realizedPnl: 0,
        totalFees: order.fee || 0,
        leverage: this.config.maxLeverage,
        margin: ((order.filledQty || size) * (order.avgPrice || signal.price)) / this.config.maxLeverage,
        liquidationPrice: 0,
        tacticsSetId: tactics.id,
      };
      
      this.positions.set(position.id, position);
      
      console.log(`[LiveAdapter] Opened ${position.direction} position: ${position.symbol} @ ${position.avgEntryPrice}`);
      
      return position;
    } catch (error) {
      console.error('[LiveAdapter] Failed to open position:', error);
      return null;
    }
  }

  async closePosition(positionId: string, reason: BotPosition["closeReason"]): Promise<void> {
    if (!this.exchangeClient) {
      console.error('[LiveAdapter] Cannot close position - no exchange client');
      return;
    }
    
    const position = this.positions.get(positionId);
    if (!position) {
      console.warn(`[LiveAdapter] Position ${positionId} not found`);
      return;
    }
    
    try {
      const side = position.direction === 'LONG' ? 'SELL' : 'BUY';
      
      await this.exchangeClient.createMarketOrder(
        position.symbol,
        side,
        position.totalSize,
        { reduceOnly: true }
      );
      
      position.status = 'CLOSED';
      position.closedAt = new Date();
      position.closeReason = reason;
      
      this.positions.delete(positionId);
      
      console.log(`[LiveAdapter] Closed position ${positionId} (${reason})`);
    } catch (error) {
      console.error(`[LiveAdapter] Failed to close position ${positionId}:`, error);
    }
  }

  async closeAllPositions(reason: BotPosition["closeReason"]): Promise<void> {
    const closePromises = Array.from(this.positions.keys()).map(id => 
      this.closePosition(id, reason)
    );
    await Promise.allSettled(closePromises);
  }

  private calculatePositionSize(price: number): number {
    if (!this.config) return 0;
    const riskAmount = (this.config.initialBalance || 1000) * (this.config.maxRiskPerTrade / 100);
    return riskAmount / price;
  }

  private calculateStopLoss(signal: StrategySignal, tactics: TacticsSet): number | undefined {
    if (!tactics.stopLoss.slPercent) return undefined;
    
    if (signal.type === 'LONG') {
      return signal.price * (1 - tactics.stopLoss.slPercent / 100);
    } else {
      return signal.price * (1 + tactics.stopLoss.slPercent / 100);
    }
  }

  private createTakeProfitTargets(signal: StrategySignal, tactics: TacticsSet): BotPosition['takeProfitTargets'] {
    if (!tactics.takeProfit.tpPercent) return [];
    
    const tpPrice = signal.type === 'LONG'
      ? signal.price * (1 + tactics.takeProfit.tpPercent / 100)
      : signal.price * (1 - tactics.takeProfit.tpPercent / 100);
    
    return [{
      index: 1,
      price: tpPrice,
      closePercent: 100,
      filled: false,
    }];
  }

  getState(): StrategyBotState {
    return this.bot.getState();
  }

  getResult(): StrategyBotResult {
    return this.bot.getResult();
  }

  subscribe(callback: StrategyBotEventCallback): void {
    this.eventCallbacks.push(callback);
  }

  unsubscribe(callback: StrategyBotEventCallback): void {
    const index = this.eventCallbacks.indexOf(callback);
    if (index > -1) {
      this.eventCallbacks.splice(index, 1);
    }
  }
}

// ==================== SINGLETON MANAGER ====================

class StrategyBotManager {
  private bots: Map<string, StrategyBot> = new Map();

  /**
   * Создать нового бота
   */
  createBot(config: StrategyBotConfig): StrategyBot {
    const bot = new StrategyBot(config);
    this.bots.set(config.id, bot);
    return bot;
  }

  /**
   * Получить бота по ID
   */
  getBot(id: string): StrategyBot | undefined {
    return this.bots.get(id);
  }

  /**
   * Получить всех ботов
   */
  getAllBots(): StrategyBot[] {
    return Array.from(this.bots.values());
  }

  /**
   * Удалить бота
   */
  async removeBot(id: string): Promise<void> {
    const bot = this.bots.get(id);
    if (bot) {
      await bot.stop();
      this.bots.delete(id);
    }
  }

  /**
   * Создать бота из результата бэктеста
   */
  async createBotFromBacktest(config: CreateBotFromBacktestConfig): Promise<CreateBotFromBacktestResult> {
    // TODO: Загрузить результат бэктеста и создать бота
    return { success: false, error: "Not implemented" };
  }

  /**
   * Остановить всех ботов
   */
  async stopAll(): Promise<void> {
    for (const bot of this.bots.values()) {
      await bot.stop();
    }
  }
}

// Singleton instance
let managerInstance: StrategyBotManager | null = null;

export function getStrategyBotManager(): StrategyBotManager {
  if (!managerInstance) {
    managerInstance = new StrategyBotManager();
  }
  return managerInstance;
}

export { StrategyBotManager };
