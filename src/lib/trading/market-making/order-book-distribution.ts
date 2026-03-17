/**
 * Order Book Distribution
 * 
 * Inspired by OctoBot-Market-Making implementation
 * Computes optimal bid/ask order distribution for market making
 */

import {
  BookOrderData,
  DistributionContext,
  OrderBookDistribution,
  OrderBookConfig,
  OrderSide,
  SpreadConfig,
  SymbolMarketInfo,
  VolumeConfig,
  VolumeProfile,
  ExistingOrder,
  TOLERATED_ABOVE_DEPTH_RATIO,
  TOLERATED_BELOW_DEPTH_RATIO,
  MAX_ORDERS_PER_SIDE,
} from './types';

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Round number to specified precision
 */
function roundToPrecision(value: number, precision: number): number {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Round price to tick size
 */
function roundToTickSize(price: number, tickSize: number): number {
  return Math.round(price / tickSize) * tickSize;
}

/**
 * Round quantity to step size
 */
function roundToStepSize(quantity: number, stepSize: number): number {
  return Math.floor(quantity / stepSize) * stepSize;
}

/**
 * Sort orders by price (closer to reference price first)
 */
function sortOrdersByPrice(
  orders: BookOrderData[],
  side: OrderSide,
  ascending: boolean
): BookOrderData[] {
  return [...orders].sort((a, b) => {
    if (side === OrderSide.BUY) {
      // For buys, higher price is closer to mid
      return ascending ? b.price - a.price : a.price - b.price;
    } else {
      // For sells, lower price is closer to mid
      return ascending ? a.price - b.price : b.price - a.price;
    }
  });
}

// =============================================================================
// MAIN DISTRIBUTION CLASS
// =============================================================================

/**
 * Order Book Distribution Calculator
 * 
 * Computes optimal order placement for market making strategy
 */
export class OrderBookDistributionCalculator {
  private config: OrderBookConfig;
  private spreadConfig: SpreadConfig;
  private volumeConfig: VolumeConfig;

  constructor(
    config: OrderBookConfig,
    spreadConfig: SpreadConfig,
    volumeConfig: VolumeConfig
  ) {
    this.config = config;
    this.spreadConfig = spreadConfig;
    this.volumeConfig = volumeConfig;
    this.validateConfig();
  }

  /**
   * Validate configuration parameters
   */
  private validateConfig(): void {
    if (this.config.bidsCount > MAX_ORDERS_PER_SIDE) {
      throw new Error(`Maximum ${MAX_ORDERS_PER_SIDE} bids allowed, got ${this.config.bidsCount}`);
    }
    if (this.config.asksCount > MAX_ORDERS_PER_SIDE) {
      throw new Error(`Maximum ${MAX_ORDERS_PER_SIDE} asks allowed, got ${this.config.asksCount}`);
    }
    if (this.spreadConfig.maxSpreadPercent <= this.spreadConfig.minSpreadPercent) {
      throw new Error(
        `Max spread (${this.spreadConfig.maxSpreadPercent}%) must be greater than min spread (${this.spreadConfig.minSpreadPercent}%)`
      );
    }
  }

  /**
   * Compute full order book distribution
   */
  computeDistribution(
    context: DistributionContext
  ): OrderBookDistribution {
    const bids = this.computeSideDistribution(
      OrderSide.BUY,
      context
    );
    const asks = this.computeSideDistribution(
      OrderSide.SELL,
      context
    );

    const totalBidVolume = bids.reduce((sum, o) => sum + o.price * o.quantity, 0);
    const totalAskVolume = asks.reduce((sum, o) => sum + o.quantity, 0);

    // Calculate actual spread
    const spreadPercent = this.calculateSpreadPercent(bids, asks);

    return {
      bids,
      asks,
      referencePrice: context.referencePrice,
      totalBidVolume,
      totalAskVolume,
      spreadPercent,
    };
  }

  /**
   * Compute distribution for one side of the order book
   */
  private computeSideDistribution(
    side: OrderSide,
    context: DistributionContext
  ): BookOrderData[] {
    const { referencePrice, marketInfo, dailyBaseVolume, dailyQuoteVolume } = context;

    const ordersCount = side === OrderSide.BUY
      ? this.config.bidsCount
      : this.config.asksCount;

    if (ordersCount < 1) {
      return [];
    }

    // Calculate price range
    const { startPrice, endPrice } = this.calculatePriceRange(
      referencePrice,
      side,
      marketInfo
    );

    // Generate price levels
    const prices = this.generatePriceLevels(
      startPrice,
      endPrice,
      ordersCount,
      marketInfo
    );

    // Calculate total volume to use
    const dailyVolume = side === OrderSide.BUY ? dailyQuoteVolume : dailyBaseVolume;
    const availableFunds = side === OrderSide.BUY
      ? context.availableQuote
      : context.availableBase;

    const totalVolume = this.calculateTotalVolume(
      dailyVolume,
      availableFunds,
      side
    );

    // Generate volume distribution
    const volumes = this.generateVolumeDistribution(
      totalVolume,
      ordersCount,
      side,
      prices
    );

    // Create orders
    return prices.map((price, index) => {
      let quantity = volumes[index];

      // For buy orders, convert quote volume to base quantity
      if (side === OrderSide.BUY) {
        quantity = price > 0 ? quantity / price : 0;
      }

      // Round to valid values
      quantity = roundToStepSize(quantity, marketInfo.stepSize);
      quantity = Math.max(quantity, marketInfo.minQty);
      quantity = roundToPrecision(quantity, marketInfo.qtyPrecision);

      const roundedPrice = roundToTickSize(price, marketInfo.tickSize);
      const finalPrice = roundToPrecision(roundedPrice, marketInfo.pricePrecision);

      return {
        price: finalPrice,
        quantity,
        side,
      };
    }).filter(order => 
      order.quantity >= marketInfo.minQty &&
      order.price * order.quantity >= marketInfo.minNotional
    );
  }

  /**
   * Calculate price range for orders
   */
  private calculatePriceRange(
    referencePrice: number,
    side: OrderSide,
    marketInfo: SymbolMarketInfo
  ): { startPrice: number; endPrice: number } {
    const minSpread = this.spreadConfig.minSpreadPercent / 100;
    const maxSpread = this.spreadConfig.maxSpreadPercent / 100;
    const spreadRange = (maxSpread - minSpread) / 2;

    if (side === OrderSide.BUY) {
      // Buys below reference price
      const startPrice = referencePrice * (1 - minSpread / 2);
      const endPrice = referencePrice * (1 - maxSpread / 2);
      return { startPrice, endPrice };
    } else {
      // Sells above reference price
      const startPrice = referencePrice * (1 + minSpread / 2);
      const endPrice = referencePrice * (1 + maxSpread / 2);
      return { startPrice, endPrice };
    }
  }

  /**
   * Generate evenly spaced price levels
   */
  private generatePriceLevels(
    startPrice: number,
    endPrice: number,
    count: number,
    marketInfo: SymbolMarketInfo
  ): number[] {
    if (count < 1) return [];
    if (count === 1) return [roundToTickSize(startPrice, marketInfo.tickSize)];

    const prices: number[] = [];
    const increment = (endPrice - startPrice) / (count - 1);

    for (let i = 0; i < count; i++) {
      const price = startPrice + increment * i;
      prices.push(roundToTickSize(price, marketInfo.tickSize));
    }

    return prices;
  }

  /**
   * Calculate total volume to use for orders
   */
  private calculateTotalVolume(
    dailyVolume: number,
    availableFunds: number,
    side: OrderSide
  ): number {
    // Ideal volume based on daily volume percentage
    const idealVolume = dailyVolume * (this.volumeConfig.dailyVolumePercent / 100);

    // Use minimum of ideal and available
    return Math.min(idealVolume, availableFunds);
  }

  /**
   * Generate volume distribution across orders
   */
  private generateVolumeDistribution(
    totalVolume: number,
    ordersCount: number,
    side: OrderSide,
    prices: number[]
  ): number[] {
    if (ordersCount < 1 || totalVolume <= 0) {
      return new Array(ordersCount).fill(0);
    }

    const volumes: number[] = [];
    const multiplier = this.config.volumeMultiplier;

    switch (this.config.volumeProfile) {
      case VolumeProfile.DECREASING:
        // Smaller orders closer to price, larger further away
        // Used to minimize slippage on fills
        return this.generateDecreasingVolumes(totalVolume, ordersCount, multiplier);

      case VolumeProfile.INCREASING:
        // Larger orders closer to price, smaller further away
        // Used to maximize fill probability
        return this.generateIncreasingVolumes(totalVolume, ordersCount, multiplier);

      case VolumeProfile.UNIFORM:
      default:
        // Equal volume for all orders
        const uniformVolume = totalVolume / ordersCount;
        return new Array(ordersCount).fill(uniformVolume);
    }
  }

  /**
   * Generate decreasing volume profile
   * Orders closer to mid price are smaller
   */
  private generateDecreasingVolumes(
    totalVolume: number,
    count: number,
    multiplier: number
  ): number[] {
    const volumes: number[] = [];
    const avgVolume = totalVolume / count;
    const maxDelta = avgVolume * (multiplier - 1);
    const increment = maxDelta / count;

    // Calculate base volume accounting for increments
    // sum(volumes) = count * baseVolume + increment * (0 + 1 + ... + count-1)
    // sum(volumes) = count * baseVolume + increment * count * (count-1) / 2
    const totalIncrements = (count * (count - 1)) / 2;
    const baseVolume = (totalVolume - increment * totalIncrements) / count;

    for (let i = 0; i < count; i++) {
      // First order (closest to mid) has smallest volume
      volumes.push(baseVolume + increment * i);
    }

    return volumes;
  }

  /**
   * Generate increasing volume profile
   * Orders closer to mid price are larger
   */
  private generateIncreasingVolumes(
    totalVolume: number,
    count: number,
    multiplier: number
  ): number[] {
    // Reverse of decreasing
    const decreasing = this.generateDecreasingVolumes(totalVolume, count, multiplier);
    return decreasing.reverse();
  }

  /**
   * Calculate spread percentage from orders
   */
  private calculateSpreadPercent(
    bids: BookOrderData[],
    asks: BookOrderData[]
  ): number {
    if (bids.length === 0 || asks.length === 0) {
      return 0;
    }

    // Sort bids (highest first) and asks (lowest first)
    const sortedBids = sortOrdersByPrice(bids, OrderSide.BUY, true);
    const sortedAsks = sortOrdersByPrice(asks, OrderSide.SELL, true);

    const highestBid = sortedBids[0]?.price || 0;
    const lowestAsk = sortedAsks[0]?.price || 0;

    if (highestBid <= 0 || lowestAsk <= 0) {
      return 0;
    }

    const midPrice = (highestBid + lowestAsk) / 2;
    const spread = lowestAsk - highestBid;

    return (spread / midPrice) * 100;
  }

  // ===========================================================================
  // SHAPE ANALYSIS METHODS
  // ===========================================================================

  /**
   * Calculate distance between current orders and ideal distribution
   * Returns a value between 0 (perfect match) and 1 (complete mismatch)
   */
  calculateShapeDistance(
    currentOrders: BookOrderData[],
    context: DistributionContext,
    side: OrderSide
  ): number {
    const idealDistribution = this.computeSideDistribution(side, context);
    const sortedCurrent = sortOrdersByPrice(currentOrders, side, true);
    const sortedIdeal = sortOrdersByPrice(idealDistribution, side, true);

    if (sortedCurrent.length === 0 && sortedIdeal.length === 0) {
      return 0;
    }
    if (sortedCurrent.length === 0 || sortedIdeal.length === 0) {
      return 1;
    }

    // Normalize volumes for comparison
    const currentVolumes = sortedCurrent.map(o => o.quantity);
    const idealVolumes = sortedIdeal.map(o => o.quantity);

    const maxCurrent = Math.max(...currentVolumes, 1);
    const maxIdeal = Math.max(...idealVolumes, 1);

    const normalizedCurrent = currentVolumes.map(v => v / maxCurrent);
    const normalizedIdeal = idealVolumes.map(v => v / maxIdeal);

    // Calculate average absolute difference
    const maxLen = Math.max(normalizedCurrent.length, normalizedIdeal.length);
    let totalDiff = 0;

    for (let i = 0; i < maxLen; i++) {
      const current = normalizedCurrent[i] || 0;
      const ideal = normalizedIdeal[i] || 0;
      totalDiff += Math.abs(current - ideal);
    }

    return totalDiff / maxLen;
  }

  /**
   * Check if current spread is within configured parameters
   */
  isSpreadCompliant(bids: BookOrderData[], asks: BookOrderData[]): {
    compliant: boolean;
    minSpread: number;
    maxSpread: number;
    currentSpread: number;
  } {
    const sortedBids = sortOrdersByPrice(bids, OrderSide.BUY, true);
    const sortedAsks = sortOrdersByPrice(asks, OrderSide.SELL, true);

    // Calculate min spread (closest to mid)
    const closestBid = sortedBids[0]?.price || 0;
    const closestAsk = sortedAsks[0]?.price || 0;
    const midPrice = (closestBid + closestAsk) / 2;
    const minSpread = midPrice > 0 ? ((closestAsk - closestBid) / midPrice) * 100 : 0;

    // Calculate max spread (furthest from mid)
    const furthestBid = sortedBids[sortedBids.length - 1]?.price || 0;
    const furthestAsk = sortedAsks[sortedAsks.length - 1]?.price || 0;
    const maxSpreadMidPrice = (furthestBid + furthestAsk) / 2;
    const maxSpread = maxSpreadMidPrice > 0
      ? ((furthestAsk - furthestBid) / maxSpreadMidPrice) * 100
      : 0;

    const allowedDeviation = this.spreadConfig.allowedSpreadDeviation;
    const minAllowed = this.spreadConfig.minSpreadPercent * (1 - allowedDeviation);
    const maxAllowed = this.spreadConfig.maxSpreadPercent * (1 + allowedDeviation);

    const compliant = minSpread >= minAllowed && maxSpread <= maxAllowed;

    return {
      compliant,
      minSpread,
      maxSpread,
      currentSpread: (minSpread + maxSpread) / 2,
    };
  }

  /**
   * Check if order book depth is within tolerance
   */
  isDepthCompliant(
    orders: BookOrderData[],
    context: DistributionContext,
    side: OrderSide
  ): {
    compliant: boolean;
    currentVolume: number;
    targetVolume: number;
    ratio: number;
  } {
    const idealDistribution = this.computeSideDistribution(side, context);
    const idealVolume = idealDistribution.reduce(
      (sum, o) => sum + (side === OrderSide.BUY ? o.price * o.quantity : o.quantity),
      0
    );

    const currentVolume = orders.reduce(
      (sum, o) => sum + (side === OrderSide.BUY ? o.price * o.quantity : o.quantity),
      0
    );

    const ratio = idealVolume > 0 ? currentVolume / idealVolume : 0;

    const compliant = 
      ratio >= TOLERATED_BELOW_DEPTH_RATIO &&
      ratio <= TOLERATED_ABOVE_DEPTH_RATIO;

    return {
      compliant,
      currentVolume,
      targetVolume: idealVolume,
      ratio,
    };
  }

  // ===========================================================================
  // ORDER UPDATE COMPUTATION
  // ===========================================================================

  /**
   * Compute orders that need to be cancelled
   */
  computeOrdersToCancel(
    currentOrders: ExistingOrder[],
    context: DistributionContext
  ): ExistingOrder[] {
    const idealDistribution = this.computeDistribution(context);
    const toCancel: ExistingOrder[] = [];

    for (const order of currentOrders) {
      // Check if order price is outside spread range
      const minPrice = context.referencePrice * (1 - this.spreadConfig.maxSpreadPercent / 100);
      const maxPrice = context.referencePrice * (1 + this.spreadConfig.maxSpreadPercent / 100);

      if (order.price < minPrice || order.price > maxPrice) {
        toCancel.push(order);
        continue;
      }

      // Check if price deviates too far from ideal
      const idealOrders = order.side === OrderSide.BUY
        ? idealDistribution.bids
        : idealDistribution.asks;

      const closestIdeal = this.findClosestOrder(order.price, idealOrders);
      
      if (closestIdeal) {
        const deviation = Math.abs(order.price - closestIdeal.price) / closestIdeal.price;
        if (deviation > this.spreadConfig.allowedSpreadDeviation) {
          toCancel.push(order);
        }
      }
    }

    return toCancel;
  }

  /**
   * Find closest order by price
   */
  private findClosestOrder(
    price: number,
    orders: BookOrderData[]
  ): BookOrderData | null {
    if (orders.length === 0) return null;

    let closest = orders[0];
    let minDiff = Math.abs(price - closest.price);

    for (const order of orders) {
      const diff = Math.abs(price - order.price);
      if (diff < minDiff) {
        minDiff = diff;
        closest = order;
      }
    }

    return closest;
  }

  /**
   * Compute orders that need to be created
   */
  computeOrdersToCreate(
    currentOrders: ExistingOrder[],
    context: DistributionContext
  ): BookOrderData[] {
    const idealDistribution = this.computeDistribution(context);
    const toCreate: BookOrderData[] = [];

    // Get current prices
    const currentBidPrices = new Set(
      currentOrders
        .filter(o => o.side === OrderSide.BUY)
        .map(o => o.price)
    );
    const currentAskPrices = new Set(
      currentOrders
        .filter(o => o.side === OrderSide.SELL)
        .map(o => o.price)
    );

    // Find missing bids
    for (const bid of idealDistribution.bids) {
      if (!currentBidPrices.has(bid.price)) {
        toCreate.push(bid);
      }
    }

    // Find missing asks
    for (const ask of idealDistribution.asks) {
      if (!currentAskPrices.has(ask.price)) {
        toCreate.push(ask);
      }
    }

    return toCreate;
  }
}

// =============================================================================
// FACTORY FUNCTION
// =============================================================================

/**
 * Create a distribution calculator with default configuration
 */
export function createDistributionCalculator(
  bidsCount: number = 5,
  asksCount: number = 5,
  minSpreadPercent: number = 2,
  maxSpreadPercent: number = 6,
  volumeProfile: VolumeProfile = VolumeProfile.DECREASING
): OrderBookDistributionCalculator {
  const spreadConfig: SpreadConfig = {
    minSpreadPercent,
    maxSpreadPercent,
    allowedSpreadDeviation: 0.1,
  };

  const orderBookConfig: OrderBookConfig = {
    bidsCount,
    asksCount,
    volumeProfile,
    volumeMultiplier: 1.5,
  };

  const volumeConfig: VolumeConfig = {
    dailyVolumePercent: 2,
    targetCumulativeVolumePercent: 3,
    minOrderSize: 0.001,
    maxOrderSize: 100,
  };

  return new OrderBookDistributionCalculator(
    orderBookConfig,
    spreadConfig,
    volumeConfig
  );
}

export default OrderBookDistributionCalculator;
