/**
 * Market Making Types
 * 
 * Inspired by OctoBot-Market-Making implementation
 * Provides type definitions for market making operations
 */

// =============================================================================
// ENUMS
// =============================================================================

/**
 * Volume distribution profile
 * Determines how order volumes are distributed across price levels
 */
export enum VolumeProfile {
  /** Orders increase in size further from the current price */
  INCREASING = 'INCREASING',
  /** Orders decrease in size further from the current price */
  DECREASING = 'DECREASING',
  /** Equal volume across all orders */
  UNIFORM = 'UNIFORM',
}

/**
 * Order side for market making
 */
export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

/**
 * Price source type
 */
export enum PriceSourceType {
  /** Use the exchange where trading occurs */
  LOCAL = 'LOCAL',
  /** Use external exchange as reference */
  EXTERNAL = 'EXTERNAL',
  /** Weighted average of multiple sources */
  WEIGHTED = 'WEIGHTED',
}

/**
 * Market making status
 */
export enum MarketMakingStatus {
  STOPPED = 'STOPPED',
  STARTING = 'STARTING',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  ERROR = 'ERROR',
}

/**
 * Order action type for update plans
 */
export enum OrderActionType {
  CREATE = 'CREATE',
  CANCEL = 'CANCEL',
  MODIFY = 'MODIFY',
}

// =============================================================================
// CONFIGURATION TYPES
// =============================================================================

/**
 * Market making spread configuration
 */
export interface SpreadConfig {
  /** Minimum spread percentage from mid price (e.g., 2 for 2%) */
  minSpreadPercent: number;
  /** Maximum spread percentage from mid price (e.g., 6 for 6%) */
  maxSpreadPercent: number;
  /** Allowed deviation from configured spread (e.g., 0.1 for 10% tolerance) */
  allowedSpreadDeviation: number;
}

/**
 * Order book configuration
 */
export interface OrderBookConfig {
  /** Number of buy orders to maintain */
  bidsCount: number;
  /** Number of sell orders to maintain */
  asksCount: number;
  /** Volume profile for order distribution */
  volumeProfile: VolumeProfile;
  /** Multiplier for volume profile (1.0 = no change) */
  volumeMultiplier: number;
}

/**
 * Reference price configuration
 */
export interface ReferencePriceConfig {
  /** Source type for price */
  sourceType: PriceSourceType;
  /** Exchange name for external source (e.g., 'binance') */
  exchangeName?: string;
  /** Symbol on reference exchange */
  symbol?: string;
  /** Price deviation threshold for order cancellation (e.g., 0.5 for 0.5%) */
  deviationThresholdPercent: number;
}

/**
 * Volume calculation configuration
 */
export interface VolumeConfig {
  /** Percentage of daily volume to use for orders (e.g., 2 for 2%) */
  dailyVolumePercent: number;
  /** Target cumulative volume percent within spread (e.g., 3 for 3%) */
  targetCumulativeVolumePercent: number;
  /** Minimum order size in base currency */
  minOrderSize: number;
  /** Maximum order size in base currency */
  maxOrderSize: number;
}

/**
 * Complete market making configuration
 */
export interface MarketMakingConfig {
  /** Symbol to provide liquidity for */
  symbol: string;
  /** Spread configuration */
  spread: SpreadConfig;
  /** Order book configuration */
  orderBook: OrderBookConfig;
  /** Reference price configuration */
  referencePrice: ReferencePriceConfig;
  /** Volume configuration */
  volume: VolumeConfig;
  /** Enable paper trading mode */
  paperTrading: boolean;
  /** Maximum total position size in base currency */
  maxPositionSize: number;
}

// =============================================================================
// ORDER TYPES
// =============================================================================

/**
 * Book order data - represents a single order in the distribution
 */
export interface BookOrderData {
  /** Order price */
  price: number;
  /** Order quantity in base currency */
  quantity: number;
  /** Order side (BUY/SELL) */
  side: OrderSide;
  /** Order ID if placed */
  orderId?: string;
  /** Exchange order ID if placed */
  exchangeOrderId?: string;
}

/**
 * Existing order from the exchange
 */
export interface ExistingOrder {
  /** Unique order ID */
  orderId: string;
  /** Exchange-specific order ID */
  exchangeOrderId: string;
  /** Order symbol */
  symbol: string;
  /** Order side */
  side: OrderSide;
  /** Order price */
  price: number;
  /** Original order quantity */
  originQuantity: number;
  /** Filled quantity */
  filledQuantity: number;
  /** Remaining quantity */
  remainingQuantity: number;
  /** Order status */
  status: 'OPEN' | 'PARTIALLY_FILLED' | 'FILLED' | 'CANCELLED';
  /** Creation timestamp */
  createdAt: Date;
}

// =============================================================================
// DISTRIBUTION TYPES
// =============================================================================

/**
 * Order book distribution result
 */
export interface OrderBookDistribution {
  /** Buy orders to place */
  bids: BookOrderData[];
  /** Sell orders to place */
  asks: BookOrderData[];
  /** Reference price used for calculation */
  referencePrice: number;
  /** Total volume in bids (quote currency) */
  totalBidVolume: number;
  /** Total volume in asks (base currency) */
  totalAskVolume: number;
  /** Actual spread percentage */
  spreadPercent: number;
}

/**
 * Distribution context for calculation
 */
export interface DistributionContext {
  /** Current reference price */
  referencePrice: number;
  /** Daily trading volume in base currency */
  dailyBaseVolume: number;
  /** Daily trading volume in quote currency */
  dailyQuoteVolume: number;
  /** Available base currency balance */
  availableBase: number;
  /** Available quote currency balance */
  availableQuote: number;
  /** Symbol market info (tick size, lot size, etc.) */
  marketInfo: SymbolMarketInfo;
}

/**
 * Symbol market information
 */
export interface SymbolMarketInfo {
  /** Symbol name */
  symbol: string;
  /** Base currency */
  base: string;
  /** Quote currency */
  quote: string;
  /** Minimum price increment */
  tickSize: number;
  /** Minimum quantity increment */
  stepSize: number;
  /** Minimum order quantity */
  minQty: number;
  /** Maximum order quantity */
  maxQty: number;
  /** Minimum notional value (price * qty) */
  minNotional: number;
  /** Price precision (decimal places) */
  pricePrecision: number;
  /** Quantity precision (decimal places) */
  qtyPrecision: number;
}

// =============================================================================
// UPDATE PLAN TYPES
// =============================================================================

/**
 * Order action for update plan
 */
export interface OrderAction {
  /** Action type */
  type: OrderActionType;
  /** Order data for CREATE/MODIFY actions */
  orderData?: BookOrderData;
  /** Order to cancel for CANCEL action */
  existingOrder?: ExistingOrder;
}

/**
 * Orders update plan - atomic batch of order operations
 */
export interface OrdersUpdatePlan {
  /** Plan ID for tracking */
  planId: string;
  /** List of actions to execute */
  actions: OrderAction[];
  /** Whether plan has been cancelled */
  cancelled: boolean;
  /** Whether plan can be cancelled */
  cancellable: boolean;
  /** Trigger source (initial, price_update, fill, periodic) */
  triggerSource: string;
  /** Creation timestamp */
  createdAt: Date;
  /** Completion timestamp */
  completedAt?: Date;
}

/**
 * Plan execution result
 */
export interface PlanExecutionResult {
  /** Plan ID */
  planId: string;
  /** Success status */
  success: boolean;
  /** Created orders */
  createdOrders: BookOrderData[];
  /** Cancelled order IDs */
  cancelledOrderIds: string[];
  /** Failed actions */
  failedActions: Array<{
    action: OrderAction;
    error: string;
  }>;
  /** Execution duration in ms */
  duration: number;
}

// =============================================================================
// REFERENCE PRICE TYPES
// =============================================================================

/**
 * Reference price data
 */
export interface ReferencePrice {
  /** Current reference price */
  price: number;
  /** Source exchange */
  source: string;
  /** Symbol */
  symbol: string;
  /** Timestamp of last update */
  timestamp: Date;
  /** Bid price at source */
  bid?: number;
  /** Ask price at source */
  ask?: number;
  /** 24h volume at source */
  volume24h?: number;
}

/**
 * Price deviation event
 */
export interface PriceDeviationEvent {
  /** Previous reference price */
  previousPrice: number;
  /** Current reference price */
  currentPrice: number;
  /** Deviation percentage */
  deviationPercent: number;
  /** Whether deviation exceeds threshold */
  exceedsThreshold: boolean;
  /** Timestamp */
  timestamp: Date;
}

// =============================================================================
// STATISTICS TYPES
// =============================================================================

/**
 * Market making statistics
 */
export interface MarketMakingStatistics {
  /** Total orders created */
  totalOrdersCreated: number;
  /** Total orders filled */
  totalOrdersFilled: number;
  /** Fill rate percentage */
  fillRate: number;
  /** Total volume traded in base currency */
  totalVolumeTraded: number;
  /** Total PnL from spreads */
  totalPnl: number;
  /** Unrealized PnL from open orders */
  unrealizedPnl: number;
  /** Average spread captured */
  averageSpreadCaptured: number;
  /** Time since start in seconds */
  uptimeSeconds: number;
  /** Current position in base currency (positive = long, negative = short) */
  currentPosition: number;
}

// =============================================================================
// STATUS TYPES
// =============================================================================

/**
 * Market making status response
 */
export interface MarketMakingStatusResponse {
  /** Current status */
  status: MarketMakingStatus;
  /** Configuration in use */
  config: MarketMakingConfig;
  /** Current reference price */
  referencePrice: ReferencePrice;
  /** Current open orders */
  openOrders: ExistingOrder[];
  /** Statistics */
  statistics: MarketMakingStatistics;
  /** Last update timestamp */
  lastUpdate: Date;
  /** Error message if status is ERROR */
  error?: string;
}

// =============================================================================
// API TYPES
// =============================================================================

/**
 * Start market making request
 */
export interface StartMarketMakingRequest {
  /** Configuration for market making */
  config: MarketMakingConfig;
  /** Account ID to use */
  accountId: string;
  /** Exchange name */
  exchange: string;
}

/**
 * Start market making response
 */
export interface StartMarketMakingResponse {
  /** Success status */
  success: boolean;
  /** Session ID */
  sessionId: string;
  /** Initial status */
  status: MarketMakingStatus;
  /** Error message if failed */
  error?: string;
}

/**
 * Calculate distribution preview request
 */
export interface DistributionPreviewRequest {
  /** Symbol */
  symbol: string;
  /** Reference price */
  referencePrice: number;
  /** Daily base volume */
  dailyBaseVolume: number;
  /** Daily quote volume */
  dailyQuoteVolume: number;
  /** Available base balance */
  availableBase: number;
  /** Available quote balance */
  availableQuote: number;
  /** Spread config */
  spread: SpreadConfig;
  /** Order book config */
  orderBook: OrderBookConfig;
  /** Volume config */
  volume: VolumeConfig;
}

/**
 * Distribution preview response
 */
export interface DistributionPreviewResponse {
  /** Calculated distribution */
  distribution: OrderBookDistribution;
  /** Warnings (if any) */
  warnings: string[];
  /** Whether distribution is valid */
  valid: boolean;
}

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Default spread configuration
 */
export const DEFAULT_SPREAD_CONFIG: SpreadConfig = {
  minSpreadPercent: 2,
  maxSpreadPercent: 6,
  allowedSpreadDeviation: 0.1,
};

/**
 * Default order book configuration
 */
export const DEFAULT_ORDER_BOOK_CONFIG: OrderBookConfig = {
  bidsCount: 5,
  asksCount: 5,
  volumeProfile: VolumeProfile.DECREASING,
  volumeMultiplier: 1.0,
};

/**
 * Default reference price configuration
 */
export const DEFAULT_REFERENCE_PRICE_CONFIG: ReferencePriceConfig = {
  sourceType: PriceSourceType.LOCAL,
  deviationThresholdPercent: 0.5,
};

/**
 * Default volume configuration
 */
export const DEFAULT_VOLUME_CONFIG: VolumeConfig = {
  dailyVolumePercent: 2,
  targetCumulativeVolumePercent: 3,
  minOrderSize: 0.001,
  maxOrderSize: 100,
};

/**
 * Maximum number of orders per side
 */
export const MAX_ORDERS_PER_SIDE = 10;

/**
 * Tolerated depth ratio below target
 */
export const TOLERATED_BELOW_DEPTH_RATIO = 0.8;

/**
 * Tolerated depth ratio above target
 */
export const TOLERATED_ABOVE_DEPTH_RATIO = 1.5;
