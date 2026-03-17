# HFT Service Documentation

**Service Name:** High-Frequency Trading Engine  
**Port:** 3005  
**Technology:** Go (Golang)  
**Status:** ✅ Active

---

## Overview

The HFT Service is a high-performance trading engine written in Go, designed for sub-millisecond latency operations. It provides order book management, market making strategies, and real-time arbitrage detection across multiple exchanges.

### Key Capabilities

- **Sub-millisecond Latency** - Optimized for <1ms round-trip
- **Multi-Exchange Support** - Binance, Bybit WebSocket feeds
- **Order Book Management** - Real-time order book snapshots
- **Market Making Strategies** - Spread capture, inventory management
- **Arbitrage Detection** - Cross-exchange price differences

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    HFT SERVICE ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐    ┌─────────────────┐                 │
│  │ Binance WS      │    │ Bybit WS        │                 │
│  │ (Orderbook)     │    │ (Orderbook)     │                 │
│  └────────┬────────┘    └────────┬────────┘                 │
│           │                      │                           │
│           ▼                      ▼                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              WebSocket Manager                       │    │
│  │   • Connection pooling                               │    │
│  │   • Message parsing                                  │    │
│  │   • Reconnection handling                            │    │
│  └───────────────────────┬─────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 HFT Engine                           │    │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │    │
│  │  │ Orderbook   │ │ Signal      │ │ Strategy    │    │    │
│  │  │ Manager     │ │ Generator   │ │ Executor    │    │    │
│  │  └─────────────┘ └─────────────┘ └─────────────┘    │    │
│  └───────────────────────┬─────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   API Server                         │    │
│  │   /health  /metrics  /orderbook  /signals           │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Features

### Latency Optimization

| Technique | Implementation |
|-----------|----------------|
| **Memory Pooling** | Pre-allocated buffers for order book updates |
| **Lock-Free Structures** | Atomic operations for concurrent access |
| **Batch Processing** | Aggregate updates for efficiency |
| **Zero-Copy Parsing** | Direct JSON parsing without allocations |

### Order Book Management

- **Real-time Updates** - Sub-millisecond order book refresh
- **Multi-Depth Support** - Configurable depth (default: 20 levels)
- **Imbalance Detection** - Bid/ask imbalance signals
- **Price Impact Calculation** - Estimate execution cost

### Market Making Strategies

| Strategy | Description |
|----------|-------------|
| **Spread Capture** | Quote both sides of the book |
| **Inventory Skew** | Adjust quotes based on position |
| **Volatility Scaling** | Wider spreads in volatile conditions |

---

## REST Endpoints

### Health Check

```http
GET /health?XTransformPort=3005
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": 1700000000000000000,
  "engine": {
    "running": true,
    "metrics": {
      "signals_generated": 1523,
      "orderbook_updates": 45678
    }
  },
  "latency": {
    "engine_p50_ns": 450000,
    "engine_p95_ns": 780000,
    "engine_p99_ns": 950000,
    "signal_p50_ns": 120000
  },
  "connections": {
    "binance": "connected",
    "bybit": "connected"
  }
}
```

### Get Order Book

```http
GET /orderbook/:symbol?XTransformPort=3005
GET /orderbook/exchange:symbol?XTransformPort=3005
```

**Example:**
```http
GET /orderbook/BTCUSDT?XTransformPort=3005
```

**Response:**
```json
{
  "symbol": "BTCUSDT",
  "exchange": "binance",
  "snapshot": {
    "bids": [
      { "price": 67000.50, "size": 1.5 },
      { "price": 67000.00, "size": 2.3 }
    ],
    "asks": [
      { "price": 67001.00, "size": 1.2 },
      { "price": 67001.50, "size": 0.8 }
    ],
    "timestamp": 1700000000000000000
  },
  "metrics": {
    "spread": 0.50,
    "mid_price": 67000.75,
    "imbalance": 0.15,
    "total_bid_size": 3.8,
    "total_ask_size": 2.0
  },
  "latency": {
    "last_update_ns": 45000
  }
}
```

### Get Metrics

```http
GET /metrics?XTransformPort=3005
```

**Response:**
```json
{
  "timestamp": 1700000000000000000,
  "engine": {
    "signals_generated": 1523,
    "signals_executed": 847,
    "win_rate": 0.62,
    "total_pnl": 15234.56
  },
  "latency": {
    "engine": {
      "p50": 450000,
      "p95": 780000,
      "p99": 950000
    },
    "signal": {
      "p50": 120000,
      "p95": 250000
    }
  },
  "orderbooks": {
    "BTCUSDT": {
      "exchange": "binance",
      "last_update": 1700000000000000000,
      "updates_per_second": 156
    }
  }
}
```

### Get Signals

```http
GET /signals?XTransformPort=3005&limit=50&strategy=spread
```

**Response:**
```json
{
  "timestamp": 1700000000000000000,
  "count": 50,
  "signals": [
    {
      "id": "sig-001",
      "symbol": "BTCUSDT",
      "exchange": "binance",
      "strategy": "spread",
      "direction": "BUY",
      "price": 67000.50,
      "confidence": 0.85,
      "timestamp": 1700000000000000000
    }
  ]
}
```

### Start Engine

```http
POST /start?XTransformPort=3005
```

### Stop Engine

```http
POST /stop?XTransformPort=3005
```

### Subscribe to Symbol

```http
POST /subscribe?XTransformPort=3005
Content-Type: application/json

{
  "exchange": "binance",
  "symbol": "ETHUSDT"
}
```

---

## Go Implementation Details

### Project Structure

```
mini-services/hft-service/
├── main.go                    # Entry point
├── config/
│   └── config.yaml           # Configuration
├── internal/
│   ├── api/
│   │   ├── server.go         # HTTP server
│   │   └── handlers.go       # API handlers
│   ├── engine/
│   │   ├── hft.go            # HFT engine core
│   │   ├── orderbook.go      # Order book management
│   │   └── strategies.go     # Trading strategies
│   └── ws/
│       ├── client.go         # WebSocket client
│       └── manager.go        # Connection manager
├── go.mod
└── go.sum
```

### Configuration

```yaml
# config/config.yaml
server:
  port: 3005

exchanges:
  binance:
    enabled: true
    ws_url: wss://fstream.binance.com/ws
    api_key: ${BINANCE_API_KEY}
    secret_key: ${BINANCE_SECRET_KEY}
  bybit:
    enabled: true
    ws_url: wss://stream.bybit.com/v5/public/linear

hft:
  max_latency_ns: 1000000      # 1ms budget
  orderbook_depth: 20          # Order book levels
  signal_threshold: 0.7        # Min confidence
  imbalance_threshold: 0.3     # Order imbalance trigger
  momentum_window: 100         # Ticks for momentum
  momentum_threshold: 0.002    # 0.2% momentum trigger
```

---

## Latency Optimization Techniques

### 1. Memory Pooling

```go
var orderbookPool = sync.Pool{
    New: func() interface{} {
        return &Orderbook{
            Bids: make([]PriceLevel, 20),
            Asks: make([]PriceLevel, 20),
        }
    },
}

func getOrderbook() *Orderbook {
    return orderbookPool.Get().(*Orderbook)
}

func putOrderbook(ob *Orderbook) {
    orderbookPool.Put(ob)
}
```

### 2. Lock-Free Structures

```go
type AtomicOrderbook struct {
    bids atomic.Value // []PriceLevel
    asks atomic.Value // []PriceLevel
}

func (a *AtomicOrderbook) Update(bids, asks []PriceLevel) {
    a.bids.Store(bids)
    a.asks.Store(asks)
}

func (a *AtomicOrderbook) Snapshot() ([]PriceLevel, []PriceLevel) {
    return a.bids.Load().([]PriceLevel), a.asks.Load().([]PriceLevel)
}
```

### 3. Batch Processing

```go
type UpdateBatch struct {
    updates []OrderbookUpdate
    mu      sync.Mutex
}

func (b *UpdateBatch) Add(update OrderbookUpdate) {
    b.mu.Lock()
    b.updates = append(b.updates, update)
    b.mu.Unlock()
}

func (b *UpdateBatch) Flush() []OrderbookUpdate {
    b.mu.Lock()
    defer b.mu.Unlock()
    result := b.updates
    b.updates = b.updates[:0]
    return result
}
```

---

## Example Code

### Go Client

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "time"
)

type OrderbookResponse struct {
    Symbol   string `json:"symbol"`
    Exchange string `json:"exchange"`
    Snapshot struct {
        Bids []PriceLevel `json:"bids"`
        Asks []PriceLevel `json:"asks"`
    } `json:"snapshot"`
    Metrics struct {
        Spread    float64 `json:"spread"`
        MidPrice  float64 `json:"mid_price"`
        Imbalance float64 `json:"imbalance"`
    } `json:"metrics"`
}

type PriceLevel struct {
    Price float64 `json:"price"`
    Size  float64 `json:"size"`
}

func main() {
    client := &http.Client{Timeout: 5 * time.Second}
    
    // Get orderbook
    resp, err := client.Get("http://localhost:3005/orderbook/BTCUSDT")
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()
    
    var ob OrderbookResponse
    if err := json.NewDecoder(resp.Body).Decode(&ob); err != nil {
        panic(err)
    }
    
    fmt.Printf("Symbol: %s\n", ob.Symbol)
    fmt.Printf("Mid Price: %.2f\n", ob.Metrics.MidPrice)
    fmt.Printf("Spread: %.2f\n", ob.Metrics.Spread)
    fmt.Printf("Imbalance: %.2f\n", ob.Metrics.Imbalance)
    fmt.Printf("Best Bid: %.2f (%.4f)\n", ob.Snapshot.Bids[0].Price, ob.Snapshot.Bids[0].Size)
    fmt.Printf("Best Ask: %.2f (%.4f)\n", ob.Snapshot.Asks[0].Price, ob.Snapshot.Asks[0].Size)
}
```

### Bash/cURL

```bash
# Health check
curl "http://localhost:3005/health"

# Get BTCUSDT orderbook
curl "http://localhost:3005/orderbook/BTCUSDT"

# Get Bybit orderbook
curl "http://localhost:3005/orderbook/bybit:BTCUSDT"

# Get metrics
curl "http://localhost:3005/metrics"

# Subscribe to new symbol
curl -X POST "http://localhost:3005/subscribe" \
  -H "Content-Type: application/json" \
  -d '{"exchange": "binance", "symbol": "SOLUSDT"}'

# Start engine
curl -X POST "http://localhost:3005/start"

# Stop engine
curl -X POST "http://localhost:3005/stop"
```

### Python Client

```python
import requests
import time

class HFTClient:
    def __init__(self, base_url="http://localhost:3005"):
        self.base_url = base_url
    
    def health(self):
        return requests.get(f"{self.base_url}/health").json()
    
    def get_orderbook(self, symbol, exchange="binance"):
        return requests.get(
            f"{self.base_url}/orderbook/{exchange}:{symbol}"
        ).json()
    
    def get_metrics(self):
        return requests.get(f"{self.base_url}/metrics").json()
    
    def subscribe(self, symbol, exchange="binance"):
        return requests.post(
            f"{self.base_url}/subscribe",
            json={"exchange": exchange, "symbol": symbol}
        ).json()

# Usage
client = HFTClient()
health = client.health()
print(f"Engine running: {health['engine']['running']}")
print(f"P99 latency: {health['latency']['engine_p99_ns']}ns")

orderbook = client.get_orderbook("BTCUSDT")
print(f"Spread: {orderbook['metrics']['spread']}")
```

---

## Monitoring

### Prometheus Metrics

The service exposes metrics at `/metrics` in Prometheus format:

```
# HELP hft_signals_generated Total signals generated
# TYPE hft_signals_generated counter
hft_signals_generated 1523

# HELP hft_latency_ns Signal generation latency
# TYPE hft_latency_ns histogram
hft_latency_ns_bucket{le="100000"} 500
hft_latency_ns_bucket{le="500000"} 1200
hft_latency_ns_bucket{le="1000000"} 1450

# HELP hft_orderbook_updates Order book updates received
# TYPE hft_orderbook_updates counter
hft_orderbook_updates{exchange="binance"} 45678
```

### Latency Budgets

| Operation | Budget | Typical |
|-----------|--------|---------|
| Orderbook Update | <500µs | 200µs |
| Signal Generation | <1ms | 450µs |
| Full Round-trip | <1ms | 800µs |

---

## Configuration Reference

| Variable | Default | Description |
|----------|---------|-------------|
| `HFT_PORT` | 3005 | HTTP server port |
| `MAX_LATENCY_NS` | 1000000 | Latency budget (1ms) |
| `ORDERBOOK_DEPTH` | 20 | Order book depth levels |
| `SIGNAL_THRESHOLD` | 0.7 | Minimum signal confidence |
| `IMBALANCE_THRESHOLD` | 0.3 | Order imbalance trigger |

---

## See Also

- [MICROSERVICES_API.md](MICROSERVICES_API.md) - Complete API reference
- [README.md](README.md) - Microservices overview
- [../bots/FREQUENCY_BOTS.md](../bots/FREQUENCY_BOTS.md) - HFT bot details

---

*Last updated: March 2026 | CITARION Documentation Team*
