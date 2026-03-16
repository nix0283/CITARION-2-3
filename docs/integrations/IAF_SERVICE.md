# IAF Service - Investing Algorithm Framework

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Core Components](#core-components)
   - [Strategies](#strategies)
   - [Portfolio Management](#portfolio-management)
   - [Backtesting](#backtesting)
   - [Risk Management](#risk-management)
4. [Built-in Strategies](#built-in-strategies)
5. [Technical Indicators](#technical-indicators)
6. [API Reference](#api-reference)
7. [Integration with CITARION](#integration-with-citarion)

---

## Overview

The IAF Service (Investing Algorithm Framework) is a Python-based framework for creating, testing, and deploying algorithmic trading strategies within the CITARION trading platform. It provides a declarative approach to strategy development with built-in risk management, backtesting capabilities, and seamless integration with multiple cryptocurrency exchanges.

### Key Features

- **Strategy Framework**: Abstract base class with declarative configuration
- **Risk Management**: Comprehensive TP/SL rules, position sizing, and portfolio limits
- **Backtesting Engine**: Both event-driven (realistic) and vectorized (fast) modes
- **Portfolio Management**: Real-time position tracking and performance analysis
- **Technical Indicators**: 18+ built-in indicators with pandas DataFrame integration
- **Multi-Exchange Support**: Binance, Bybit, OKX, Bitget, BingX
- **REST API**: FastAPI endpoints for TypeScript integration

### Version

- **Version**: 1.0.0
- **Author**: CITARION Team
- **Python**: 3.10+
- **Dependencies**: FastAPI, pandas, numpy, aiohttp, pydantic

---

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CITARION Platform                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Next.js Frontend (TypeScript)                                              │
│  ├── /src/lib/iaf/                    ← IAF TypeScript Client              │
│  ├── /src/lib/strategy/               ← Strategy Engine Integration        │
│  └── /src/lib/backtesting/            ← Backtesting Integration            │
│                                                                              │
└────────────────────────────────┬────────────────────────────────────────────┘
                                 │ HTTP REST API (FastAPI)
                                 │ WebSocket (Real-time signals)
                                 │
┌────────────────────────────────▼────────────────────────────────────────────┐
│                           IAF Service (Python)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  /iaf-service/                                                               │
│  │                                                                          │
│  ├── strategies/                    ← Strategy Framework                    │
│  │   ├── base.py                    ← TradingStrategy abstract class        │
│  │   ├── types.py                   ← Signal, DataSource, TimeUnit         │
│  │   ├── risk.py                    ← RiskConfig, PositionSize             │
│  │   ├── indicators.py              ← IndicatorCalculator (18+ indicators) │
│  │   └── builtin.py                 ← 6 built-in strategies                │
│  │                                                                          │
│  ├── backtesting/                   ← Backtesting Engine                    │
│  │   ├── types.py                   ← BacktestConfig, BacktestTrade        │
│  │   └── engine.py                  ← Event-driven + Vectorized modes      │
│  │                                                                          │
│  ├── portfolio/                     ← Portfolio Management                  │
│  │   ├── types.py                   ← PortfolioState, PositionState        │
│  │   └── manager.py                 ← PortfolioManager class               │
│  │                                                                          │
│  ├── risk_management/               ← Advanced Risk (optional)             │
│  │   └── __init__.py                                                       │
│  │                                                                          │
│  └── api/                           ← FastAPI Endpoints                     │
│      └── __init__.py                ← REST API Routes                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Module Exports

```python
# iaf-service/__init__.py
from .strategies import (
    TradingStrategy,      # Abstract base class
    StrategyRegistry,     # Strategy registry
    SignalType,           # BUY, SELL, HOLD, etc.
    TimeUnit,             # SECOND, MINUTE, HOUR, DAY
    DataType,             # OHLCV, TICKER, ORDERBOOK
    DataSource,           # Runtime data source
    PositionSize,         # Position sizing config
    TakeProfitRule,       # TP configuration
    StopLossRule,         # SL configuration
)

from .risk_management import (
    RiskManager,          # Risk manager
    RiskRule,             # Risk rule base
    TrailingStopConfig,   # Trailing stop config
    BreakevenConfig,      # Breakeven config
)

from .portfolio import (
    PortfolioManager,     # Portfolio manager
    PortfolioState,       # Portfolio state
    PositionState,        # Position state
)

from .backtesting import (
    BacktestEngine,       # Backtest engine
    BacktestConfig,       # Backtest config
    BacktestResult,       # Backtest result
    BacktestMetrics,      # Performance metrics
)

from .api import create_app  # FastAPI app factory
```

---

## Core Components

### Strategies

The strategy framework provides an abstract base class `TradingStrategy` that all strategies must implement.

#### TradingStrategy Base Class

```python
from abc import ABC, abstractmethod
from typing import Optional, List, Dict, Any, ClassVar

class TradingStrategy(ABC):
    """
    Abstract base class for trading strategies.
    
    Class Attributes:
        algorithm_id: Unique identifier for the strategy
        time_unit: Time unit for execution (SECOND, MINUTE, HOUR, DAY)
        interval: Execution interval
        symbols: List of trading symbols
        exchanges: List of supported exchanges
        description: Strategy description
        version: Strategy version
    """
    
    # Class-level configuration (override in subclasses)
    algorithm_id: ClassVar[str] = "base-strategy"
    time_unit: ClassVar[TimeUnit] = TimeUnit.HOUR
    interval: ClassVar[int] = 1
    symbols: ClassVar[List[str]] = []
    exchanges: ClassVar[List[ExchangeType]] = []
    description: ClassVar[str] = ""
    version: ClassVar[str] = "1.0.0"
    
    def __init__(
        self,
        data_sources: Optional[List[DataSource]] = None,
        risk_config: Optional[RiskConfig] = None,
        position_sizes: Optional[List[PositionSize]] = None,
        take_profits: Optional[List[TakeProfitRule]] = None,
        stop_losses: Optional[List[StopLossRule]] = None,
        custom_config: Optional[Dict[str, Any]] = None,
    ):
        """Initialize strategy with data sources and risk config."""
        pass
    
    @abstractmethod
    def generate_buy_signals(self, data: Dict[str, Any]) -> Dict[str, pd.Series]:
        """Generate buy signals. Must be implemented by subclasses."""
        pass
    
    @abstractmethod
    def generate_sell_signals(self, data: Dict[str, Any]) -> Dict[str, pd.Series]:
        """Generate sell signals. Must be implemented by subclasses."""
        pass
    
    def generate_signals(self, data: Optional[Dict[str, Any]] = None) -> List[Signal]:
        """Generate all trading signals."""
        pass
    
    def on_tick(self, tick_data: Dict[str, Any]) -> Optional[Signal]:
        """Process tick data (for real-time trading)."""
        pass
    
    def on_candle(self, symbol: str, candle: Dict[str, Any]) -> List[Signal]:
        """Process new candle (for candle-based strategies)."""
        pass
    
    def validate(self) -> List[str]:
        """Validate strategy configuration."""
        pass
```

#### StrategyRegistry

The `StrategyRegistry` provides a central registry for all strategies:

```python
class StrategyRegistry:
    """Registry for trading strategies."""
    
    _strategies: Dict[str, Type[TradingStrategy]] = {}
    
    @classmethod
    def register(cls, strategy_class: Type[TradingStrategy]) -> Type[TradingStrategy]:
        """Register a strategy class. Can be used as decorator."""
        pass
    
    @classmethod
    def get(cls, algorithm_id: str) -> Optional[Type[TradingStrategy]]:
        """Get a strategy class by ID."""
        pass
    
    @classmethod
    def list(cls) -> List[str]:
        """List all registered strategy IDs."""
        pass
    
    @classmethod
    def create(cls, algorithm_id: str, **kwargs) -> Optional[TradingStrategy]:
        """Create a strategy instance by ID."""
        pass
```

**Usage Example:**

```python
# Register using decorator
@StrategyRegistry.register
class MyStrategy(TradingStrategy):
    algorithm_id = "my-strategy"
    # ...

# Or register manually
StrategyRegistry.register(MyStrategy)

# List all strategies
print(StrategyRegistry.list())  # ['rsi-reversal', 'macd-crossover', ...]

# Create instance by ID
strategy = StrategyRegistry.create("rsi-reversal", symbol="BTCUSDT")
```

---

### Portfolio Management

The portfolio management module provides real-time position tracking and performance analysis.

#### PortfolioManager

```python
class PortfolioManager:
    """
    Manager for trading portfolios.
    
    Handles position management, risk rules application, and
    portfolio state tracking.
    """
    
    def __init__(
        self,
        initial_capital: float = 10000.0,
        risk_config: Optional[RiskConfig] = None,
        portfolio_id: Optional[str] = None,
        name: str = "Default Portfolio"
    ):
        pass
    
    @property
    def cash(self) -> float:
        """Current cash balance."""
        pass
    
    @property
    def total_value(self) -> float:
        """Total portfolio value."""
        pass
    
    @property
    def positions(self) -> Dict[str, PositionState]:
        """Open positions."""
        pass
    
    def can_open_position(self, symbol: str, required_value: float) -> bool:
        """Check if a new position can be opened."""
        pass
    
    def calculate_position_size(
        self,
        symbol: str,
        current_price: float,
        stop_loss_price: Optional[float] = None
    ) -> float:
        """Calculate position size for a symbol."""
        pass
    
    def open_position(
        self,
        symbol: str,
        side: str,
        size: float,
        price: float,
        stop_loss: Optional[float] = None,
        take_profit: Optional[float] = None,
        metadata: Optional[Dict[str, Any]] = None
    ) -> Optional[PositionState]:
        """Open a new position."""
        pass
    
    def close_position(
        self,
        symbol: str,
        price: float,
        reason: str = "manual",
        partial_size: Optional[float] = None
    ) -> Optional[Dict[str, Any]]:
        """Close a position."""
        pass
    
    def update_prices(self, prices: Dict[str, float]) -> None:
        """Update position prices with latest market data."""
        pass
    
    def check_exit_conditions(self, prices: Dict[str, Dict[str, float]]) -> List[Dict[str, Any]]:
        """Check if any positions should be closed."""
        pass
    
    def process_signal(self, signal: Signal) -> Optional[PositionState]:
        """Process a trading signal."""
        pass
    
    def get_metrics(self) -> PortfolioMetrics:
        """Calculate and return portfolio metrics."""
        pass
```

#### PortfolioState

```python
@dataclass
class PortfolioState:
    """Complete portfolio state."""
    
    id: str
    name: str
    initial_capital: float
    cash: float
    positions: Dict[str, PositionState] = field(default_factory=dict)
    metrics: Optional[PortfolioMetrics] = None
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)
    metadata: Dict[str, Any] = field(default_factory=dict)
    
    @property
    def total_value(self) -> float:
        """Calculate total portfolio value."""
        pass
    
    @property
    def total_pnl(self) -> float:
        """Calculate total PnL."""
        pass
    
    @property
    def total_return_percentage(self) -> float:
        """Calculate total return percentage."""
        pass
```

#### PositionState

```python
@dataclass
class PositionState:
    """State of an individual position."""
    
    id: str
    symbol: str
    side: str  # "long" or "short"
    size: float
    entry_price: float
    current_price: float
    entry_time: datetime
    stop_loss: Optional[float] = None
    take_profit: Optional[float] = None
    trailing_stop: Optional[float] = None
    status: PositionStatus = PositionStatus.OPEN
    metadata: Dict[str, Any] = field(default_factory=dict)
    highest_price: float = 0.0
    lowest_price: float = float('inf')
    
    @property
    def value(self) -> float:
        """Current position value."""
        pass
    
    @property
    def pnl(self) -> float:
        """Unrealized PnL."""
        pass
    
    @property
    def pnl_percentage(self) -> float:
        """Unrealized PnL percentage."""
        pass
    
    @property
    def holding_time(self) -> float:
        """Holding time in hours."""
        pass
```

---

### Backtesting

The backtesting module provides both event-driven (realistic) and vectorized (fast) backtesting capabilities.

#### BacktestEngine

```python
class BacktestEngine:
    """
    Backtesting engine for strategy evaluation.
    
    Supports both event-driven (realistic) and vectorized (fast) modes.
    """
    
    def __init__(self, config: BacktestConfig):
        """
        Initialize the backtest engine.
        
        Args:
            config: Backtest configuration
        """
        pass
    
    def reset(self) -> None:
        """Reset the backtest engine state."""
        pass
    
    async def run(self, strategy: TradingStrategy) -> BacktestResult:
        """
        Run backtest for a strategy (event-driven mode).
        
        Args:
            strategy: Strategy to backtest
            
        Returns:
            BacktestResult with trades, equity curve, and metrics
        """
        pass
    
    def run_vectorized(
        self,
        strategy: TradingStrategy,
        data: pd.DataFrame
    ) -> BacktestResult:
        """
        Run vectorized backtest (fast but less realistic).
        
        Args:
            strategy: Strategy to backtest
            data: Historical data
            
        Returns:
            BacktestResult with metrics
        """
        pass
```

#### BacktestConfig

```python
@dataclass
class BacktestConfig:
    """Configuration for a backtest."""
    
    start_date: datetime
    end_date: datetime
    initial_capital: float = 10000.0
    commission: float = 0.001  # 0.1%
    slippage: float = 0.0005  # 0.05%
    position_size_method: str = "percentage"  # percentage, kelly, fixed
    max_positions: int = 5
    leverage: float = 1.0
    margin_requirement: float = 0.5
    
    # Risk management
    default_stop_loss: Optional[float] = None  # Percentage
    default_take_profit: Optional[float] = None  # Percentage
    trailing_stop: bool = False
    trailing_stop_percent: float = 2.0
    
    # Simulation settings
    enable_shorting: bool = False
    enable_partial_fills: bool = False
    use_adjusted_close: bool = True
    
    def validate(self) -> List[str]:
        """Validate configuration and return any errors."""
        pass
```

#### BacktestMetrics

```python
@dataclass
class BacktestMetrics:
    """Performance metrics for a backtest."""
    
    # Returns
    total_return: float = 0.0
    total_return_percentage: float = 0.0
    annualized_return: float = 0.0
    
    # Trade statistics
    total_trades: int = 0
    winning_trades: int = 0
    losing_trades: int = 0
    win_rate: float = 0.0
    
    # Profit/Loss
    avg_win: float = 0.0
    avg_loss: float = 0.0
    avg_trade: float = 0.0
    largest_win: float = 0.0
    largest_loss: float = 0.0
    max_consecutive_wins: int = 0
    max_consecutive_losses: int = 0
    
    # Risk metrics
    profit_factor: float = 0.0
    risk_reward_ratio: float = 0.0
    expectancy: float = 0.0
    
    # Drawdown
    max_drawdown: float = 0.0
    max_drawdown_percentage: float = 0.0
    avg_drawdown: float = 0.0
    max_drawdown_duration_days: int = 0
    
    # Risk-adjusted returns
    sharpe_ratio: float = 0.0
    sortino_ratio: float = 0.0
    calmar_ratio: float = 0.0
    
    # Volatility
    volatility: float = 0.0
    variance: float = 0.0
    std_dev: float = 0.0
    
    # Trading frequency
    avg_holding_time_hours: float = 0.0
    trading_days: int = 0
    trades_per_day: float = 0.0
```

---

### Risk Management

The risk management module provides comprehensive tools for position sizing, take profit, and stop loss management.

#### RiskConfig

```python
@dataclass
class RiskConfig:
    """Complete risk configuration for a strategy."""
    
    position_sizes: List[PositionSize] = field(default_factory=list)
    take_profits: List[TakeProfitRule] = field(default_factory=list)
    stop_losses: List[StopLossRule] = field(default_factory=list)
    max_open_positions: int = 5
    max_portfolio_risk: float = 20.0  # Max % of portfolio at risk
    max_correlated_positions: int = 2
    daily_loss_limit: Optional[float] = None  # Stop trading after X% daily loss
    
    def get_position_size(self, symbol: str) -> Optional[PositionSize]:
        """Get position size configuration for a symbol."""
        pass
    
    def get_take_profit_rule(self, symbol: str) -> Optional[TakeProfitRule]:
        """Get take profit rule for a symbol."""
        pass
    
    def get_stop_loss_rule(self, symbol: str) -> Optional[StopLossRule]:
        """Get stop loss rule for a symbol."""
        pass
```

#### PositionSize

```python
@dataclass
class PositionSize:
    """Position size configuration."""
    
    symbol: str
    percentage_of_portfolio: float = 10.0
    fixed_amount: Optional[float] = None
    max_amount: Optional[float] = None
    min_amount: Optional[float] = None
    risk_per_trade: Optional[float] = None
    
    def calculate_size(
        self,
        portfolio_value: float,
        current_price: float,
        stop_loss_price: Optional[float] = None
    ) -> float:
        """Calculate position size based on configuration."""
        pass
```

#### TakeProfitRule

```python
@dataclass
class TakeProfitRule:
    """Take profit configuration."""
    
    symbol: str
    percentage_threshold: float = 10.0
    tp_type: TakeProfitType = TakeProfitType.FIXED
    trailing: bool = False
    trailing_offset: float = 2.0  # Trailing offset in percentage
    sell_percentage: float = 100.0
    move_sl_to_be: bool = False
    multiple_levels: Optional[List[Dict[str, float]]] = None
    
    def calculate_target_price(self, entry_price: float, side: str = "long") -> float:
        """Calculate the take profit target price."""
        pass
    
    def update_trailing(
        self,
        current_price: float,
        highest_price: float,
        side: str = "long"
    ) -> Optional[float]:
        """Update trailing take profit level."""
        pass
    
    def get_level_targets(self, entry_price: float) -> List[Dict[str, float]]:
        """Get multiple take profit levels if configured."""
        pass
```

#### StopLossRule

```python
@dataclass
class StopLossRule:
    """Stop loss configuration."""
    
    symbol: str
    percentage_threshold: float = 5.0
    sl_type: StopLossType = StopLossType.FIXED
    trailing: bool = False
    trailing_offset: float = 2.0
    trailing_activation: float = 0.0  # Activate trailing after X% profit
    atr_multiplier: Optional[float] = 2.0
    sell_percentage: float = 100.0
    time_limit_minutes: Optional[int] = None
    
    def calculate_stop_price(
        self,
        entry_price: float,
        side: str = "long",
        atr: Optional[float] = None
    ) -> float:
        """Calculate the stop loss price."""
        pass
    
    def update_trailing(
        self,
        current_price: float,
        highest_price: float,
        entry_price: float,
        side: str = "long"
    ) -> Optional[float]:
        """Update trailing stop loss level."""
        pass
    
    def check_time_limit(self, entry_time: datetime) -> bool:
        """Check if time limit has been exceeded."""
        pass
```

#### Stop Loss Types

```python
class StopLossType(Enum):
    """Types of stop loss."""
    FIXED = "fixed"               # Fixed percentage from entry
    TRAILING = "trailing"         # Trailing stop loss
    ATR_BASED = "atr_based"       # Based on ATR indicator
    SUPPORT_BASED = "support"     # Based on support levels
    TIME_BASED = "time"           # Exit after time period
```

#### Take Profit Types

```python
class TakeProfitType(Enum):
    """Types of take profit."""
    FIXED = "fixed"               # Fixed percentage from entry
    TRAILING = "trailing"         # Trailing take profit
    MULTI_LEVEL = "multi_level"   # Multiple take profit levels
    RESISTANCE_BASED = "resistance"  # Based on resistance levels
    RISK_REWARD = "risk_reward"   # Based on risk/reward ratio
```

#### Risk Presets

```python
# Conservative: 1-2% risk per trade
CONSERVATIVE_RISK = RiskConfig(
    position_sizes=[
        PositionSize(symbol="*", percentage_of_portfolio=5.0, risk_per_trade=1.0)
    ],
    take_profits=[
        TakeProfitRule(symbol="*", percentage_threshold=5.0, trailing=True, trailing_offset=1.5)
    ],
    stop_losses=[
        StopLossRule(symbol="*", percentage_threshold=2.0, trailing=False)
    ],
    max_open_positions=3,
    max_portfolio_risk=10.0
)

# Moderate: 2-5% risk per trade
MODERATE_RISK = RiskConfig(
    position_sizes=[
        PositionSize(symbol="*", percentage_of_portfolio=10.0, risk_per_trade=2.0)
    ],
    take_profits=[
        TakeProfitRule(symbol="*", percentage_threshold=10.0, trailing=True, trailing_offset=2.0)
    ],
    stop_losses=[
        StopLossRule(symbol="*", percentage_threshold=5.0, trailing=True, trailing_offset=2.0, trailing_activation=3.0)
    ],
    max_open_positions=5,
    max_portfolio_risk=20.0
)

# Aggressive: 5-10% risk per trade
AGGRESSIVE_RISK = RiskConfig(
    position_sizes=[
        PositionSize(symbol="*", percentage_of_portfolio=15.0, risk_per_trade=5.0)
    ],
    take_profits=[
        TakeProfitRule(symbol="*", percentage_threshold=20.0, trailing=True, trailing_offset=3.0)
    ],
    stop_losses=[
        StopLossRule(symbol="*", percentage_threshold=8.0, trailing=True, trailing_offset=3.0, trailing_activation=5.0)
    ],
    max_open_positions=10,
    max_portfolio_risk=40.0
)
```

---

## Built-in Strategies

The IAF Service includes 6 ready-to-use trading strategies that can be customized and deployed within the CITARION platform.

### 1. RSI Reversal Strategy

**Algorithm ID:** `rsi-reversal`

Generates buy signals when RSI crosses above oversold threshold and sell signals when RSI crosses below overbought threshold.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `symbol` | str | "BTCUSDT" | Trading symbol |
| `exchange` | ExchangeType | BINANCE | Exchange |
| `timeframe` | str | "4h" | Candle timeframe |
| `rsi_period` | int | 14 | RSI calculation period |
| `oversold_threshold` | float | 30.0 | RSI oversold level |
| `overbought_threshold` | float | 70.0 | RSI overbought level |
| `position_size_pct` | float | 10.0 | Position size as % of portfolio |
| `take_profit_pct` | float | 5.0 | Take profit percentage |
| `stop_loss_pct` | float | 3.0 | Stop loss percentage |

**Usage:**

```python
from iaf_service.strategies import RSIReversalStrategy

strategy = RSIReversalStrategy(
    symbol="BTCUSDT",
    exchange="binance",
    timeframe="4h",
    rsi_period=14,
    oversold_threshold=30,
    overbought_threshold=70,
    position_size_pct=10.0,
    take_profit_pct=5.0,
    stop_loss_pct=3.0
)

# Generate signals
signals = strategy.generate_signals()
```

**Signal Logic:**
- **Buy Signal:** RSI was below oversold threshold and crosses above
- **Sell Signal:** RSI was above overbought threshold and crosses below

---

### 2. MACD Crossover Strategy

**Algorithm ID:** `macd-crossover`

Generates buy signals when MACD line crosses above the signal line and sell signals when MACD crosses below.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `symbol` | str | "BTCUSDT" | Trading symbol |
| `exchange` | ExchangeType | BINANCE | Exchange |
| `timeframe` | str | "1h" | Candle timeframe |
| `fast_period` | int | 12 | Fast EMA period |
| `slow_period` | int | 26 | Slow EMA period |
| `signal_period` | int | 9 | Signal line period |
| `position_size_pct` | float | 10.0 | Position size % |
| `take_profit_pct` | float | 8.0 | Take profit % |
| `stop_loss_pct` | float | 4.0 | Stop loss % |

**Usage:**

```python
from iaf_service.strategies import MACDCrossoverStrategy

strategy = MACDCrossoverStrategy(
    symbol="BTCUSDT",
    timeframe="1h",
    fast_period=12,
    slow_period=26,
    signal_period=9
)
```

**Signal Logic:**
- **Buy Signal:** MACD line crosses above signal line (bullish crossover)
- **Sell Signal:** MACD line crosses below signal line (bearish crossover)

---

### 3. Bollinger Bands Strategy

**Algorithm ID:** `bollinger-bands`

Mean reversion strategy that generates buy signals when price touches the lower band and sell signals when price touches the upper band.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `symbol` | str | "BTCUSDT" | Trading symbol |
| `exchange` | ExchangeType | BINANCE | Exchange |
| `timeframe` | str | "1h" | Candle timeframe |
| `period` | int | 20 | SMA period for middle band |
| `std_dev` | float | 2.0 | Standard deviation multiplier |
| `position_size_pct` | float | 10.0 | Position size % |
| `take_profit_pct` | float | 5.0 | Take profit % |
| `stop_loss_pct` | float | 3.0 | Stop loss % |

**Usage:**

```python
from iaf_service.strategies import BollingerBandsStrategy

strategy = BollingerBandsStrategy(
    symbol="BTCUSDT",
    timeframe="1h",
    period=20,
    std_dev=2.0
)
```

**Signal Logic:**
- **Buy Signal:** Price crosses below lower Bollinger Band
- **Sell Signal:** Price crosses above upper Bollinger Band

---

### 4. EMA Crossover Strategy

**Algorithm ID:** `ema-crossover`

Trend following strategy based on EMA crossovers with trailing stop support.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `symbol` | str | "BTCUSDT" | Trading symbol |
| `exchange` | ExchangeType | BINANCE | Exchange |
| `timeframe` | str | "1h" | Candle timeframe |
| `short_period` | int | 9 | Short EMA period |
| `long_period` | int | 21 | Long EMA period |
| `position_size_pct` | float | 10.0 | Position size % |
| `take_profit_pct` | float | 10.0 | Take profit % |
| `stop_loss_pct` | float | 5.0 | Stop loss % |
| `trailing_stop` | bool | True | Enable trailing stop |

**Usage:**

```python
from iaf_service.strategies import EMACrossoverStrategy

strategy = EMACrossoverStrategy(
    symbol="BTCUSDT",
    timeframe="1h",
    short_period=9,
    long_period=21,
    trailing_stop=True
)
```

**Signal Logic:**
- **Buy Signal:** Short EMA crosses above long EMA (golden cross)
- **Sell Signal:** Short EMA crosses below long EMA (death cross)

---

### 5. Grid Trading Strategy

**Algorithm ID:** `grid-trading`

Grid trading strategy that places buy and sell orders at predetermined price levels. Profits from price oscillations within a range.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `symbol` | str | "BTCUSDT" | Trading symbol |
| `exchange` | ExchangeType | BINANCE | Exchange |
| `timeframe` | str | "15m" | Candle timeframe |
| `grid_levels` | int | 10 | Number of grid levels |
| `grid_spacing_pct` | float | 1.0 | Spacing between levels (%) |
| `position_size_pct` | float | 5.0 | Position size per level |

**Usage:**

```python
from iaf_service.strategies import GridStrategy

strategy = GridStrategy(
    symbol="BTCUSDT",
    timeframe="15m",
    grid_levels=10,
    grid_spacing_pct=1.0,
    position_size_pct=5.0
)
```

**Signal Logic:**
- **Buy Signal:** Price drops to a grid level below current price
- **Sell Signal:** Price rises to a grid level above current price

---

### 6. DCA (Dollar Cost Averaging) Strategy

**Algorithm ID:** `dca`

Regularly buys an asset at fixed intervals regardless of price, with optional RSI timing optimization.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `symbol` | str | "BTCUSDT" | Trading symbol |
| `exchange` | ExchangeType | BINANCE | Exchange |
| `timeframe` | str | "1d" | Candle timeframe |
| `buy_amount` | float | 100.0 | Fixed amount per buy |
| `buy_interval_hours` | int | 24 | Buy interval in hours |
| `use_rsi_filter` | bool | True | Use RSI for timing |
| `rsi_threshold` | float | 45.0 | Only buy when RSI < threshold |
| `max_positions` | int | 10 | Maximum positions |
| `take_profit_pct` | float | 20.0 | Take profit % |

**Usage:**

```python
from iaf_service.strategies import DCAStrategy

strategy = DCAStrategy(
    symbol="BTCUSDT",
    timeframe="1d",
    buy_amount=100.0,
    buy_interval_hours=24,
    use_rsi_filter=True,
    rsi_threshold=45.0,
    max_positions=10
)
```

**Signal Logic:**
- **Buy Signal:** At regular intervals (filtered by RSI if enabled)
- **Sell Signal:** Typically none (long-term hold strategy)

---

## Technical Indicators

The IAF Service includes 18+ technical indicators through the `IndicatorCalculator` class.

### Indicator Registry

| Indicator | Function | Category | Parameters |
|-----------|----------|----------|------------|
| **Trend** | | | |
| Simple Moving Average | `sma()` | Trend | period, source |
| Exponential Moving Average | `ema()` | Trend | period, source |
| Supertrend | `supertrend()` | Trend | period, multiplier |
| Ichimoku Cloud | `ichimoku()` | Trend | tenkan, kijun, senkou_b |
| Heikin Ashi | `heikin_ashi()` | Trend | - |
| **Momentum** | | | |
| RSI | `rsi()` | Momentum | period, source |
| MACD | `macd()` | Momentum | fast_period, slow_period, signal_period |
| Stochastic | `stochastic()` | Momentum | k_period, d_period, smooth_k |
| ADX | `adx()` | Momentum | period |
| **Volatility** | | | |
| Bollinger Bands | `bollinger_bands()` | Volatility | period, std_dev |
| ATR | `atr()` | Volatility | period |
| **Volume** | | | |
| VWAP | `vwap()` | Volume | - |
| OBV | `obv()` | Volume | - |
| **Utilities** | | | |
| Crossover | `crossover()` | Signal | first_column, second_column |
| Crossunder | `crossunder()` | Signal | first_column, second_column |

### IndicatorCalculator Class

```python
class IndicatorCalculator:
    """Calculator for technical indicators on pandas DataFrames."""
    
    @staticmethod
    def sma(data: pd.DataFrame, period: int = 20, source: str = "close",
            result_column: Optional[str] = None) -> pd.DataFrame:
        """Simple Moving Average."""
        pass
    
    @staticmethod
    def ema(data: pd.DataFrame, period: int = 20, source: str = "close",
            result_column: Optional[str] = None) -> pd.DataFrame:
        """Exponential Moving Average."""
        pass
    
    @staticmethod
    def rsi(data: pd.DataFrame, period: int = 14, source: str = "close",
            result_column: Optional[str] = None) -> pd.DataFrame:
        """Relative Strength Index."""
        pass
    
    @staticmethod
    def macd(data: pd.DataFrame, fast_period: int = 12, slow_period: int = 26,
             signal_period: int = 9, source: str = "close") -> pd.DataFrame:
        """Moving Average Convergence Divergence."""
        pass
    
    @staticmethod
    def bollinger_bands(data: pd.DataFrame, period: int = 20, std_dev: float = 2.0,
                        source: str = "close") -> pd.DataFrame:
        """Bollinger Bands."""
        pass
    
    @staticmethod
    def atr(data: pd.DataFrame, period: int = 14,
            result_column: Optional[str] = None) -> pd.DataFrame:
        """Average True Range."""
        pass
    
    @staticmethod
    def stochastic(data: pd.DataFrame, k_period: int = 14, d_period: int = 3,
                   smooth_k: int = 3) -> pd.DataFrame:
        """Stochastic Oscillator."""
        pass
    
    @staticmethod
    def adx(data: pd.DataFrame, period: int = 14) -> pd.DataFrame:
        """Average Directional Index."""
        pass
    
    @staticmethod
    def vwap(data: pd.DataFrame) -> pd.DataFrame:
        """Volume Weighted Average Price."""
        pass
    
    @staticmethod
    def obv(data: pd.DataFrame, result_column: Optional[str] = None) -> pd.DataFrame:
        """On-Balance Volume."""
        pass
    
    @staticmethod
    def supertrend(data: pd.DataFrame, period: int = 10, multiplier: float = 3.0) -> pd.DataFrame:
        """Supertrend indicator."""
        pass
    
    @staticmethod
    def ichimoku(data: pd.DataFrame, tenkan_period: int = 9, kijun_period: int = 26,
                 senkou_b_period: int = 52) -> pd.DataFrame:
        """Ichimoku Cloud."""
        pass
    
    @staticmethod
    def heikin_ashi(data: pd.DataFrame) -> pd.DataFrame:
        """Heikin Ashi candles."""
        pass
    
    @staticmethod
    def crossover(data: pd.DataFrame, first_column: str, second_column: str,
                  result_column: Optional[str] = None) -> pd.DataFrame:
        """Detect crossover (first column crosses above second)."""
        pass
    
    @staticmethod
    def crossunder(data: pd.DataFrame, first_column: str, second_column: str,
                   result_column: Optional[str] = None) -> pd.DataFrame:
        """Detect crossunder (first column crosses below second)."""
        pass
```

### Usage Examples

```python
from iaf_service.strategies.indicators import IndicatorCalculator, calculate_indicator
import pandas as pd

# Load OHLCV data
df = pd.DataFrame({
    'timestamp': [...],
    'open': [...],
    'high': [...],
    'low': [...],
    'close': [...],
    'volume': [...]
})

# Calculate RSI
df = IndicatorCalculator.rsi(df, period=14)
# Result column: 'rsi_14'

# Calculate MACD
df = IndicatorCalculator.macd(df, fast_period=12, slow_period=26, signal_period=9)
# Result columns: 'macd', 'macd_signal', 'macd_histogram'

# Calculate Bollinger Bands
df = IndicatorCalculator.bollinger_bands(df, period=20, std_dev=2.0)
# Result columns: 'bb_middle', 'bb_upper', 'bb_lower', 'bb_width'

# Calculate multiple EMAs
df = IndicatorCalculator.ema(df, period=9, result_column='ema_short')
df = IndicatorCalculator.ema(df, period=21, result_column='ema_long')

# Detect crossover
df = IndicatorCalculator.crossover(df, 'ema_short', 'ema_long', 'ema_cross_up')
df = IndicatorCalculator.crossunder(df, 'ema_short', 'ema_long', 'ema_cross_down')

# Use indicator by name
df = calculate_indicator(df, 'rsi', period=14)
df = calculate_indicator(df, 'supertrend', period=10, multiplier=3.0)
```

### Indicator Output Columns

| Indicator | Output Columns |
|-----------|----------------|
| SMA | `sma_{period}` |
| EMA | `ema_{period}` |
| RSI | `rsi_{period}` |
| MACD | `macd`, `macd_signal`, `macd_histogram` |
| Bollinger Bands | `bb_middle`, `bb_upper`, `bb_lower`, `bb_width` |
| ATR | `atr_{period}` |
| Stochastic | `stoch_k`, `stoch_d` |
| ADX | `adx`, `plus_di`, `minus_di` |
| VWAP | `vwap` |
| OBV | `obv` |
| Supertrend | `supertrend`, `trend_direction` |
| Ichimoku | `tenkan_sen`, `kijun_sen`, `senkou_span_a`, `senkou_span_b`, `chikou_span` |
| Heikin Ashi | `ha_open`, `ha_high`, `ha_low`, `ha_close` |

---

## API Reference

### Base URL

```
http://localhost:8000
```

### Authentication

API requests can be authenticated using:
- Bearer token in `Authorization` header
- API key in `X-API-Key` header

---

### Endpoints

#### Health Check

```
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

#### List Strategies

```
GET /strategies
```

**Response:**
```json
{
  "strategies": [
    {
      "algorithm_id": "rsi-reversal",
      "description": "RSI Reversal Strategy - Buy oversold, sell overbought",
      "version": "1.0.0",
      "exchanges": ["binance", "bybit", "okx"],
      "time_unit": "hour",
      "interval": 4
    },
    {
      "algorithm_id": "macd-crossover",
      "description": "MACD Crossover Strategy",
      "version": "1.0.0",
      "exchanges": ["binance", "bybit", "okx"],
      "time_unit": "hour",
      "interval": 1
    }
  ]
}
```

---

#### Create Strategy Instance

```
POST /strategies/create
```

**Request:**
```json
{
  "strategy_type": "rsi-reversal",
  "symbol": "BTCUSDT",
  "exchange": "binance",
  "timeframe": "4h",
  "custom_params": {
    "rsi_period": 14,
    "oversold_threshold": 30,
    "overbought_threshold": 70,
    "position_size_pct": 10.0,
    "take_profit_pct": 5.0,
    "stop_loss_pct": 3.0
  }
}
```

**Response:**
```json
{
  "instance_id": "rsi-reversal_BTCUSDT_1705312200",
  "status": "created",
  "config": {
    "algorithm_id": "rsi-reversal",
    "symbol": "BTCUSDT",
    "exchange": "binance",
    "timeframe": "4h"
  }
}
```

---

#### Generate Signals

```
POST /strategies/{instance_id}/signals
```

**Response:**
```json
{
  "instance_id": "rsi-reversal_BTCUSDT_1705312200",
  "signals": [
    {
      "type": "buy",
      "symbol": "BTCUSDT",
      "price": 42500.00,
      "timestamp": "2024-01-15T10:30:00Z",
      "confidence": 0.85,
      "reason": "RSI crossed above 30",
      "metadata": {
        "rsi_value": 32.5,
        "stop_loss": 41225.00,
        "take_profit": 44625.00
      }
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

#### Run Backtest

```
POST /backtest
```

**Request:**
```json
{
  "strategy_id": "rsi-reversal_BTCUSDT_1705312200",
  "start_date": "2023-01-01",
  "end_date": "2024-01-01",
  "initial_capital": 10000,
  "commission": 0.001,
  "slippage": 0.0005,
  "max_positions": 5
}
```

**Response:**
```json
{
  "backtest_id": "bt_1705312200",
  "config": {
    "start_date": "2023-01-01T00:00:00Z",
    "end_date": "2024-01-01T00:00:00Z",
    "initial_capital": 10000.0,
    "commission": 0.001
  },
  "metrics": {
    "total_return": 2450.50,
    "total_return_percentage": 24.51,
    "annualized_return": 24.51,
    "total_trades": 156,
    "winning_trades": 98,
    "losing_trades": 58,
    "win_rate": 62.82,
    "profit_factor": 1.89,
    "max_drawdown": 850.00,
    "max_drawdown_percentage": 8.5,
    "sharpe_ratio": 1.45,
    "sortino_ratio": 1.82,
    "calmar_ratio": 2.88
  },
  "trades": [
    {
      "id": "trade_1",
      "symbol": "BTCUSDT",
      "side": "long",
      "entry_price": 42000.00,
      "exit_price": 44100.00,
      "size": 0.238,
      "pnl": 499.80,
      "pnl_percentage": 5.0,
      "entry_time": "2023-01-15T10:30:00Z",
      "exit_time": "2023-01-18T14:00:00Z"
    }
  ],
  "equity_curve": [
    {
      "timestamp": "2023-01-01T00:00:00Z",
      "equity": 10000.00,
      "cash": 10000.00,
      "position_value": 0.0,
      "drawdown": 0.0,
      "drawdown_percentage": 0.0
    }
  ]
}
```

---

#### Calculate Indicators

```
POST /indicators/calculate
```

**Query Parameters:**
- `indicator_name`: Name of indicator (rsi, macd, bollinger_bands, etc.)

**Request:**
```json
{
  "data": [
    {
      "timestamp": 1705312200000,
      "open": 42500,
      "high": 42600,
      "low": 42400,
      "close": 42550,
      "volume": 1000
    }
  ],
  "params": {
    "period": 14
  }
}
```

**Response:**
```json
{
  "indicator": "rsi",
  "params": {"period": 14},
  "result": [
    {
      "timestamp": 1705312200000,
      "rsi_14": 65.32
    }
  ]
}
```

---

#### Get Risk Presets

```
GET /risk/presets
```

**Response:**
```json
{
  "presets": {
    "conservative": {
      "position_sizes": [
        {"symbol": "*", "percentage_of_portfolio": 5.0, "risk_per_trade": 1.0}
      ],
      "take_profits": [
        {"symbol": "*", "percentage_threshold": 5.0, "trailing": true, "trailing_offset": 1.5}
      ],
      "stop_losses": [
        {"symbol": "*", "percentage_threshold": 2.0, "trailing": false}
      ],
      "max_open_positions": 3,
      "max_portfolio_risk": 10.0
    },
    "moderate": {
      "position_sizes": [
        {"symbol": "*", "percentage_of_portfolio": 10.0, "risk_per_trade": 2.0}
      ],
      "max_open_positions": 5,
      "max_portfolio_risk": 20.0
    },
    "aggressive": {
      "position_sizes": [
        {"symbol": "*", "percentage_of_portfolio": 15.0, "risk_per_trade": 5.0}
      ],
      "max_open_positions": 10,
      "max_portfolio_risk": 40.0
    }
  }
}
```

---

### TypeScript Client

```typescript
import { IAFClient, iafClient } from '@/lib/iaf/client';

// Create custom client
const client = new IAFClient({
  baseUrl: process.env.IAF_SERVICE_URL || 'http://localhost:8000',
  timeout: 30000
});

// Or use default singleton
const strategies = await iafClient.listStrategies();

// Create strategy instance
const { instance_id } = await iafClient.createStrategy({
  strategy_type: 'rsi-reversal',
  symbol: 'BTCUSDT',
  exchange: 'binance',
  timeframe: '4h',
  custom_params: {
    rsi_period: 14,
    oversold_threshold: 30
  }
});

// Generate signals
const { signals } = await iafClient.generateSignals(instance_id);

// Run backtest
const result = await iafClient.runBacktest({
  strategy_id: instance_id,
  start_date: '2023-01-01',
  end_date: '2024-01-01',
  initial_capital: 10000,
  commission: 0.001
});

// Get risk presets
const { presets } = await iafClient.getRiskPresets();

// Calculate indicator
const indicatorResult = await iafClient.calculateIndicator('rsi', {
  data: ohlcvData,
  params: { period: 14 }
});
```

---

## Integration with CITARION

### Bridge to TypeScript Strategies

The IAF service works alongside the existing TypeScript strategy engine:

```typescript
import { StrategyManager } from '@/lib/strategy';
import { iafClient } from '@/lib/iaf';

// Use TypeScript strategy for real-time execution
const tsSignals = await strategyManager.executeStrategy('rsi-reversal');

// Use IAF for backtesting
const backtestResult = await iafClient.runBacktest({
  strategy_id: 'rsi-reversal_BTCUSDT',
  start_date: '2023-01-01',
  end_date: '2024-01-01',
  initial_capital: 10000
});
```

### Using IAF Risk Rules in CITARION Bots

```typescript
// Fetch risk presets from IAF
const { presets } = await iafClient.getRiskPresets();

// Apply to CITARION bot configuration
const botConfig = {
  name: 'RSI Bot',
  symbol: 'BTCUSDT',
  exchange: 'binance',
  strategy: 'rsi-reversal',
  riskManagement: presets.moderate,
  positionSize: {
    type: 'percentage',
    value: presets.moderate.position_sizes[0].percentage_of_portfolio
  },
  stopLoss: {
    type: 'percentage',
    value: presets.moderate.stop_losses[0].percentage_threshold
  }
};
```

### React Hook for Strategy Signals

```typescript
import { useState, useEffect } from 'react';
import { iafClient, Signal } from '@/lib/iaf/client';

export function useStrategySignals(instanceId: string | null) {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!instanceId) return;

    const fetchSignals = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await iafClient.generateSignals(instanceId);
        setSignals(result.signals);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchSignals();
    const interval = setInterval(fetchSignals, 60000); // Every minute

    return () => clearInterval(interval);
  }, [instanceId]);

  return { signals, loading, error };
}
```

### Using IAF Backtesting with CITARION UI

```typescript
// In Strategy Lab component
async function runStrategyBacktest(config: BacktestConfig) {
  const result = await iafClient.runBacktest({
    strategy_id: config.strategyId,
    start_date: config.startDate,
    end_date: config.endDate,
    initial_capital: config.initialCapital,
    commission: config.commission,
    slippage: config.slippage,
    max_positions: config.maxPositions
  });

  // Use in CITARION charts
  setEquityCurve(result.equity_curve);
  setMetrics(result.metrics);
  setTrades(result.trades);

  return result;
}
```

### Environment Configuration

```env
# .env.local
IAF_SERVICE_URL=http://localhost:8000
IAF_API_KEY=your-api-key
IAF_TIMEOUT=30000
```

### Supported Exchanges

| Exchange | Provider | Features |
|----------|----------|----------|
| Binance | `BinanceProvider` | Spot + Futures, OHLCV, Ticker, Funding |
| Bybit | `BybitProvider` | V5 API, OHLCV, Ticker |
| OKX | `OKXProvider` | V5 API, OHLCV, Ticker |
| Bitget | `BitgetProvider` | V2 API, OHLCV, Ticker, Funding |
| BingX | `BingXProvider` | V2 API, OHLCV, Ticker, Funding |

---

## Creating Custom Strategies

### Basic Structure

```python
from iaf_service.strategies import TradingStrategy, StrategyRegistry
from iaf_service.strategies.types import TimeUnit, DataType, DataSource, ExchangeType
from iaf_service.strategies.indicators import IndicatorCalculator
from typing import Dict, Any, ClassVar, List
import pandas as pd

@StrategyRegistry.register
class MyCustomStrategy(TradingStrategy):
    """Custom strategy description."""
    
    # Required class attributes
    algorithm_id: ClassVar[str] = "my-custom-strategy"
    time_unit: ClassVar[TimeUnit] = TimeUnit.HOUR
    interval: ClassVar[int] = 1
    symbols: ClassVar[List[str]] = []
    exchanges: ClassVar[List[ExchangeType]] = [
        ExchangeType.BINANCE,
        ExchangeType.BYBIT
    ]
    description: ClassVar[str] = "My custom trading strategy"
    version: ClassVar[str] = "1.0.0"
    
    def __init__(
        self,
        symbol: str = "BTCUSDT",
        exchange: ExchangeType = ExchangeType.BINANCE,
        timeframe: str = "1h",
        sma_period: int = 20,
        **kwargs
    ):
        self.sma_period = sma_period
        self.timeframe = timeframe
        
        # Create data source
        data_sources = [
            DataSource(
                config=DataSourceConfig(
                    identifier=f"{symbol}_data",
                    data_type=DataType.OHLCV,
                    symbol=symbol,
                    exchange=exchange,
                    timeframe=timeframe,
                    window_size=500
                )
            )
        ]
        
        super().__init__(data_sources=data_sources, **kwargs)
        self.symbol = symbol
    
    def generate_buy_signals(self, data: Dict[str, Any]) -> Dict[str, pd.Series]:
        """Implement buy signal logic."""
        signals = {}
        
        for identifier, df in data.items():
            if df is None or len(df) < self.sma_period:
                continue
            
            # Calculate indicator
            df = IndicatorCalculator.sma(df, period=self.sma_period)
            df = IndicatorCalculator.rsi(df, period=14)
            
            # Buy signal: price above SMA and RSI oversold
            buy_signal = (
                (df["close"] > df[f"sma_{self.sma_period}"]) &
                (df["rsi_14"] < 40)
            )
            
            symbol = identifier.replace("_data", "")
            signals[symbol] = buy_signal.fillna(False)
        
        return signals
    
    def generate_sell_signals(self, data: Dict[str, Any]) -> Dict[str, pd.Series]:
        """Implement sell signal logic."""
        signals = {}
        
        for identifier, df in data.items():
            if df is None or len(df) < self.sma_period:
                continue
            
            df = IndicatorCalculator.sma(df, period=self.sma_period)
            df = IndicatorCalculator.rsi(df, period=14)
            
            # Sell signal: price below SMA and RSI overbought
            sell_signal = (
                (df["close"] < df[f"sma_{self.sma_period}"]) &
                (df["rsi_14"] > 60)
            )
            
            symbol = identifier.replace("_data", "")
            signals[symbol] = sell_signal.fillna(False)
        
        return signals
```

---

## Performance Considerations

1. **Backtesting Speed**:
   - Use `run_vectorized()` for quick parameter optimization
   - Use `run()` (event-driven) for accurate results with slippage/commission

2. **API Calls**:
   - Cache strategy instances and data to minimize API calls
   - Use batch requests when possible

3. **Memory Usage**:
   - For large datasets, use streaming or chunked data loading
   - Set appropriate `window_size` for data sources

4. **Concurrent Requests**:
   - The FastAPI service handles concurrent requests efficiently with async/await
   - Consider rate limiting for production use

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Service not responding | Check uvicorn process: `ps aux \| grep uvicorn`. Verify port 8000 is free: `lsof -i :8000` |
| Import errors | Ensure all dependencies installed. Check Python path includes iaf-service |
| No signals generated | Verify data is loaded. Check indicator calculations don't have NaN. Review thresholds |
| Backtest zero trades | Verify date range has data. Check signal logic. Ensure warm-up period sufficient |
| Connection refused | Check IAF_SERVICE_URL environment variable. Verify service is running |

### Logs

```python
import logging

# Enable debug logging
logging.getLogger('iaf_service').setLevel(logging.DEBUG)
```

---

## References

- [Investing Algorithm Framework](https://github.com/coding-kitties/investing-algorithm-framework)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Pandas Documentation](https://pandas.pydata.org/)
- [CITARION Documentation](../README.md)
