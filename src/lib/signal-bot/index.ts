/**
 * Signal Bot Module
 */

export { SignalBotEngine, createSignalBotEngine } from "./engine";

export type {
  SignalSource,
  SignalStatus,
  ParsedSignal,
  SignalFilterResult,
  SignalExecutionResult,
  TypedSignalBotConfig,
  SignalBotEvent,
  SignalBotEventType,
  SignalBotState,
  ISignalAdapter,
  SignalQueueItem,
  Direction,
  MarketType,
  SignalType
} from "./types";

export { toTypedConfig, createSignalRecordData } from "./types";

export {
  TelegramSignalAdapter,
  TradingViewSignalAdapter,
  ChatSignalAdapter,
  createAdapter
} from "./source-adapters";
