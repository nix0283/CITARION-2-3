/**
 * Trailing Stop Module
 * 
 * @deprecated Use `@/lib/trailing` instead. This module will be removed in v3.0.0.
 * 
 * Migration guide:
 * ```typescript
 * // Old
 * import { checkTrailingStop } from "@/lib/trailing-stop";
 * 
 * // New
 * import { UnifiedTrailingStop, createSimpleTrailing } from "@/lib/trailing";
 * const trailing = createSimpleTrailing("PERCENT", 2);
 * const result = trailing.check(position);
 * ```
 * 
 * See: src/lib/trailing/index.ts
 * 
 * Реализация трейлинг-стопа для позиций:
 * - Отслеживание максимальной/минимальной цены
 * - Автоматическое перемещение Stop Loss
 * - Поддержка различных типов: PERCENT, FIXED, BREAKEVEN
 * 
 * Интеграция с Position Monitor
 */

import { db } from "@/lib/db";
import { notifyTelegram, notifyUI } from "@/lib/notification-service";

// ==================== TYPES ====================

export interface TrailingStopConfig {
  type: "PERCENT" | "FIXED" | "BREAKEVEN";
  value: number;          // Percentage or fixed price offset
  activated: boolean;     // Whether trailing stop is active
  triggerPrice?: number;  // Price at which trailing activates
  highestPrice?: number;  // Highest price seen (for LONG)
  lowestPrice?: number;   // Lowest price seen (for SHORT)
}

export interface TrailingStopResult {
  updated: boolean;
  newStopLoss?: number;
  reason?: string;
  trailingDistance?: number;
}

// ==================== TRAILING STOP LOGIC ====================

/**
 * Проверить и обновить трейлинг-стоп для позиции
 */
export async function checkTrailingStop(
  position: {
    id: string;
    symbol: string;
    direction: string;
    avgEntryPrice: number;
    currentPrice: number | null;
    stopLoss: number | null;
    trailingStop: string | null;
    trailingActivated: boolean;
    highestPrice: number | null;
    lowestPrice: number | null;
    leverage: number;
    totalAmount: number;
    isDemo: boolean;
  },
  signal?: {
    signalId: number;
    takeProfits: string | null;
  } | null
): Promise<TrailingStopResult> {
  // Если трейлинг-стоп не настроен, возвращаем
  if (!position.trailingStop) {
    return { updated: false };
  }

  const currentPrice = position.currentPrice || 0;
  if (currentPrice <= 0) {
    return { updated: false, reason: "Invalid current price" };
  }

  const config: TrailingStopConfig = JSON.parse(position.trailingStop);
  
  // Проверяем активацию трейлинга
  if (!config.activated) {
    // Автоматическая активация при достижении определённой прибыли
    const activationResult = checkTrailingActivation(position, config, currentPrice);
    
    if (activationResult.activated) {
      config.activated = true;
      config.highestPrice = currentPrice;
      config.lowestPrice = currentPrice;
      
      await db.position.update({
        where: { id: position.id },
        data: {
          trailingStop: JSON.stringify(config),
          trailingActivated: true,
          highestPrice: currentPrice,
          lowestPrice: currentPrice,
        },
      });

      await notifyUI({
        type: "POSITION_UPDATED",
        title: "📈 Trailing Stop Activated",
        message: `${position.symbol} ${position.direction}\nTrailing stop is now active`,
        data: { positionId: position.id, config },
      });

      return { updated: true, reason: "Trailing stop activated" };
    }
    
    return { updated: false, reason: "Trailing stop not yet activated" };
  }

  // Обновляем трейлинг-стоп
  const isLong = position.direction === "LONG";
  let newStopLoss = position.stopLoss;
  let updated = false;

  if (isLong) {
    // Для LONG: отслеживаем максимальную цену
    if (!config.highestPrice || currentPrice > config.highestPrice) {
      config.highestPrice = currentPrice;
      
      // Рассчитываем новый SL на основе процента от максимума
      const trailingDistance = calculateTrailingDistance(config, currentPrice);
      const calculatedSL = currentPrice - trailingDistance;
      
      // SL двигается только вверх
      if (!newStopLoss || calculatedSL > newStopLoss) {
        newStopLoss = calculatedSL;
        updated = true;
      }
    }
  } else {
    // Для SHORT: отслеживаем минимальную цену
    if (!config.lowestPrice || currentPrice < config.lowestPrice) {
      config.lowestPrice = currentPrice;
      
      // Рассчитываем новый SL на основе процента от минимума
      const trailingDistance = calculateTrailingDistance(config, currentPrice);
      const calculatedSL = currentPrice + trailingDistance;
      
      // SL двигается только вниз
      if (!newStopLoss || calculatedSL < newStopLoss) {
        newStopLoss = calculatedSL;
        updated = true;
      }
    }
  }

  if (updated && newStopLoss) {
    // Сохраняем обновления
    await db.position.update({
      where: { id: position.id },
      data: {
        stopLoss: newStopLoss,
        trailingStop: JSON.stringify(config),
        highestPrice: config.highestPrice,
        lowestPrice: config.lowestPrice,
      },
    });

    const trailingDistance = isLong 
      ? config.highestPrice! - newStopLoss 
      : newStopLoss - config.lowestPrice!;

    // Уведомление
    await notifyUI({
      type: "POSITION_UPDATED",
      title: "📍 Trailing Stop Updated",
      message: `${position.symbol} ${position.direction}\nNew SL: $${newStopLoss.toFixed(2)}\nDistance: $${trailingDistance.toFixed(2)}`,
      data: { positionId: position.id, newStopLoss, config },
    });

    return {
      updated: true,
      newStopLoss,
      trailingDistance,
      reason: "Stop loss trailed",
    };
  }

  return { updated: false, reason: "No update needed" };
}

/**
 * Проверить условие активации трейлинга
 */
function checkTrailingActivation(
  position: {
    avgEntryPrice: number;
    currentPrice: number | null;
    trailingStop: string | null;
  },
  config: TrailingStopConfig,
  currentPrice: number
): { activated: boolean; reason?: string } {
  // Если уже активирован
  if (config.activated) {
    return { activated: true };
  }

  // Проверяем триггер-цену
  if (config.triggerPrice) {
    if (currentPrice >= config.triggerPrice) {
      return { activated: true, reason: "Trigger price reached" };
    }
  } else {
    // Автоматическая активация при прибыли в 1% и более
    const profitPercent = ((currentPrice - position.avgEntryPrice) / position.avgEntryPrice) * 100;
    
    if (profitPercent >= 1) {
      return { activated: true, reason: "Profit threshold reached" };
    }
  }

  return { activated: false, reason: "Activation conditions not met" };
}

/**
 * Рассчитать расстояние трейлинга
 */
function calculateTrailingDistance(config: TrailingStopConfig, price: number): number {
  switch (config.type) {
    case "PERCENT":
      return price * (config.value / 100);
    
    case "FIXED":
      return config.value;
    
    case "BREAKEVEN":
      // Breakeven = SL на уровне входа
      return 0;
    
    default:
      return price * 0.02; // Default 2%
  }
}

// ==================== POSITION TRAILING INTEGRATION ====================

/**
 * Создать конфигурацию трейлинг-стопа из настроек бота
 */
export function createTrailingConfig(
  type: "PERCENT" | "FIXED" | "BREAKEVEN" = "PERCENT",
  value: number = 2,
  triggerPrice?: number
): string {
  const config: TrailingStopConfig = {
    type,
    value,
    activated: false,
    triggerPrice,
  };
  
  return JSON.stringify(config);
}

/**
 * Активировать трейлинг-стоп для позиции
 */
export async function activateTrailingStop(
  positionId: string,
  config?: Partial<TrailingStopConfig>
): Promise<{ success: boolean; error?: string }> {
  try {
    const position = await db.position.findUnique({
      where: { id: positionId },
    });

    if (!position) {
      return { success: false, error: "Position not found" };
    }

    let trailingConfig: TrailingStopConfig;
    
    if (position.trailingStop) {
      trailingConfig = JSON.parse(position.trailingStop);
      trailingConfig.activated = true;
      if (config?.value) trailingConfig.value = config.value;
      if (config?.type) trailingConfig.type = config.type;
    } else {
      trailingConfig = {
        type: config?.type || "PERCENT",
        value: config?.value || 2,
        activated: true,
        highestPrice: position.currentPrice || position.avgEntryPrice,
        lowestPrice: position.currentPrice || position.avgEntryPrice,
      };
    }

    await db.position.update({
      where: { id: positionId },
      data: {
        trailingStop: JSON.stringify(trailingConfig),
        trailingActivated: true,
        highestPrice: trailingConfig.highestPrice,
        lowestPrice: trailingConfig.lowestPrice,
      },
    });

    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
}

/**
 * Деактивировать трейлинг-стоп
 */
export async function deactivateTrailingStop(positionId: string): Promise<{ success: boolean }> {
  try {
    const position = await db.position.findUnique({
      where: { id: positionId },
    });

    if (!position || !position.trailingStop) {
      return { success: false };
    }

    const config: TrailingStopConfig = JSON.parse(position.trailingStop);
    config.activated = false;

    await db.position.update({
      where: { id: positionId },
      data: {
        trailingStop: JSON.stringify(config),
        trailingActivated: false,
      },
    });

    return { success: true };
  } catch {
    return { success: false };
  }
}

/**
 * Проверить все позиции с активным трейлинг-стопом
 */
export async function checkAllTrailingStops(): Promise<{
  checked: number;
  updated: number;
  results: { positionId: string; result: TrailingStopResult }[];
}> {
  const positions = await db.position.findMany({
    where: {
      status: "OPEN",
      trailingActivated: true,
    },
    include: {
      Signal: true,
    },
  });

  const results: { positionId: string; result: TrailingStopResult }[] = [];
  let updated = 0;

  for (const position of positions) {
    const result = await checkTrailingStop(
      {
        id: position.id,
        symbol: position.symbol,
        direction: position.direction,
        avgEntryPrice: position.avgEntryPrice,
        currentPrice: position.currentPrice,
        stopLoss: position.stopLoss,
        trailingStop: position.trailingStop,
        trailingActivated: position.trailingActivated,
        highestPrice: position.highestPrice,
        lowestPrice: position.lowestPrice,
        leverage: position.leverage,
        totalAmount: position.totalAmount,
        isDemo: position.isDemo,
      },
      position.Signal ? {
        signalId: position.Signal.signalId,
        takeProfits: position.Signal.takeProfits,
      } : null
    );

    results.push({ positionId: position.id, result });
    
    if (result.updated) {
      updated++;
    }
  }

  return { checked: positions.length, updated, results };
}
