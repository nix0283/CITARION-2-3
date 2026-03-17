# CITARION Distributed Tracing

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Overview

Distributed tracing implementation for tracking requests across CITARION microservices using OpenTelemetry.

---

## 🏗️ Tracing Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       DISTRIBUTED TRACING                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Request ──────────────────────────────────────────────────────────────►   │
│     │                                                                        │
│     ▼                                                                        │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐             │
│   │ Main App │───▶│  Price   │───▶│   Bot    │───▶│ Exchange │             │
│   │  Span 1  │    │ Service  │    │ Monitor  │    │   API    │             │
│   │          │    │  Span 2  │    │  Span 3  │    │  Span 4  │             │
│   └──────────┘    └──────────┘    └──────────┘    └──────────┘             │
│        │               │               │               │                    │
│        └───────────────┴───────────────┴───────────────┘                    │
│                                │                                             │
│                                ▼                                             │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │                    OpenTelemetry Collector                            │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
│                                │                                             │
│                                ▼                                             │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │                         Jaeger UI                                     │  │
│   │                    (Trace Visualization)                              │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 OpenTelemetry Setup

### Node.js Services

```typescript
// tracing.ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'price-service',
    [SemanticResourceAttributes.SERVICE_VERSION]: '2.0.0',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV,
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4317',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

// Graceful shutdown
process.on('SIGTERM', async () => {
  await sdk.shutdown();
});
```

### Python Services

```python
# tracing.py
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import Resource

resource = Resource.create({
    "service.name": "ml-service",
    "service.version": "2.0.0",
})

provider = TracerProvider(resource=resource)
processor = BatchSpanProcessor(OTLPSpanExporter())
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

tracer = trace.get_tracer(__name__)
```

---

## 📊 Creating Spans

### Manual Instrumentation

```typescript
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('price-service');

async function fetchPrice(symbol: string) {
  // Start a span
  const span = tracer.startSpan('fetch_price', {
    attributes: {
      'symbol': symbol,
      'exchange': 'binance'
    }
  });

  try {
    const price = await exchangeClient.getPrice(symbol);
    
    // Add event
    span.addEvent('price_received', {
      price: price,
      timestamp: Date.now()
    });
    
    return price;
  } catch (error) {
    // Record error
    span.recordException(error);
    span.setStatus({ code: 2, message: error.message });
    throw error;
  } finally {
    span.end();
  }
}
```

### Nested Spans

```typescript
async function executeTrade(order: Order) {
  return tracer.startActiveSpan('execute_trade', async (parentSpan) => {
    parentSpan.setAttributes({
      'order.id': order.id,
      'order.symbol': order.symbol,
      'order.side': order.side
    });

    // Child span 1: Validate
    await tracer.startActiveSpan('validate_order', async (span) => {
      await validateOrder(order);
      span.end();
    });

    // Child span 2: Risk check
    await tracer.startActiveSpan('risk_check', async (span) => {
      await checkRiskLimits(order);
      span.end();
    });

    // Child span 3: Submit to exchange
    const result = await tracer.startActiveSpan('submit_exchange', async (span) => {
      span.setAttributes({ 'exchange': order.exchange });
      const result = await submitToExchange(order);
      span.end();
      return result;
    });

    parentSpan.setStatus({ code: 1 }); // OK
    return result;
  });
}
```

---

## 🔗 Context Propagation

### HTTP Propagation

```typescript
import { propagation, trace } from '@opentelemetry/api';

async function callService(url: string) {
  const headers: Record<string, string> = {};
  
  // Inject trace context into headers
  propagation.inject(activeContext, headers);
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  });
  
  return response.json();
}
```

### WebSocket Propagation

```typescript
import { propagation } from '@opentelemetry/api';

// Client sends trace context
ws.emit('subscribe', {
  symbols: ['BTCUSDT'],
  traceContext: propagation.inject({})
});

// Server extracts trace context
ws.on('subscribe', (data) => {
  const context = propagation.extract(data.traceContext);
  
  // Continue trace in context
  context.with(activeContext, () => {
    handleSubscription(data.symbols);
  });
});
```

---

## 🐳 Jaeger Deployment

### Docker Compose

```yaml
# docker-compose.yml
services:
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686"  # UI
      - "14250:14250"  # Model
      - "4317:4317"    # OTLP gRPC
      - "4318:4318"    # OTLP HTTP
    environment:
      - COLLECTOR_OTLP_ENABLED=true

  otel-collector:
    image: otel/opentelemetry-collector-contrib:latest
    command: ["--config=/etc/otel-collector-config.yaml"]
    volumes:
      - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
    ports:
      - "4317:4317"
    depends_on:
      - jaeger
```

### Collector Configuration

```yaml
# otel-collector-config.yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  batch:
    timeout: 1s
    send_batch_size: 1024

  memory_limiter:
    check_interval: 1s
    limit_mib: 512

exporters:
  jaeger:
    endpoint: jaeger:14250
    tls:
      insecure: true

  prometheus:
    endpoint: 0.0.0.0:8889

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [jaeger]
    metrics:
      receivers: [otlp]
      processors: [memory_limiter]
      exporters: [prometheus]
```

---

## 📈 Trace Sampling

### Head-Based Sampling

```typescript
import { AlwaysOnSampler, AlwaysOffSampler, TraceIdRatioBasedSampler } from '@opentelemetry/sdk-trace-node';

const sampler = new TraceIdRatioBasedSampler(0.1); // 10% sampling

const sdk = new NodeSDK({
  sampler: sampler,
  // ...
});
```

### Custom Sampling Rules

```typescript
import { Sampler, SamplingResult, SamplingDecision } from '@opentelemetry/sdk-trace-node';

class CustomSampler implements Sampler {
  shouldSample(context, traceId, name, kind, attributes, links): SamplingResult {
    // Always sample errors
    if (attributes['error']) {
      return { decision: SamplingDecision.RECORD_AND_SAMPLED };
    }
    
    // Always sample trading operations
    if (name.startsWith('trade.') || name.startsWith('risk.')) {
      return { decision: SamplingDecision.RECORD_AND_SAMPLED };
    }
    
    // Sample 10% of other operations
    if (Math.random() < 0.1) {
      return { decision: SamplingDecision.RECORD_AND_SAMPLED };
    }
    
    return { decision: SamplingDecision.NOT_RECORD };
  }
}
```

---

## 🔍 Trace Analysis

### Key Spans to Track

| Operation | Span Name | Key Attributes |
|-----------|-----------|----------------|
| Trade Execution | `execute_trade` | symbol, side, quantity, exchange |
| Price Fetch | `fetch_price` | symbol, exchange, latency |
| Risk Check | `risk_check` | risk_score, exposure |
| ML Prediction | `ml_predict` | model, symbol, confidence |
| Bot Action | `bot_action` | bot_type, action, result |

### Common Queries

```bash
# Find slow traces (>1s)
service:price-service duration:>1s

# Find error traces
service:* status:error

# Find specific order trace
order.id:order-12345

# Find traces by user
user.id:user-67890
```

---

## 📊 Performance Analysis

### Latency Percentiles

```
┌─────────────────────────────────────────────────────────────────┐
│  LATENCY DISTRIBUTION (execute_trade)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  p50:   150ms  ████████████████████                             │
│  p90:   450ms  ██████████████████████████████████████████       │
│  p95:   800ms  █████████████████████████████████████████████████│
│  p99:  1500ms  █████████████████████████████████████████████████│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Service Dependency Map

```
┌─────────────┐
│ Main App    │
│   :3000     │
└──────┬──────┘
       │
       ├──► ┌─────────────┐
       │    │ Price       │
       │    │ Service     │
       │    └─────────────┘
       │
       ├──► ┌─────────────┐      ┌─────────────┐
       │    │ Bot         │─────►│ Exchange    │
       │    │ Monitor     │      │ APIs        │
       │    └─────────────┘      └─────────────┘
       │
       ├──► ┌─────────────┐
       │    │ Risk        │
       │    │ Monitor     │
       │    └─────────────┘
       │
       └──► ┌─────────────┐
            │ ML Service  │
            └─────────────┘
```

---

## 📚 Related Documentation

- [MICROSERVICES_LOGGING.md](MICROSERVICES_LOGGING.md) - Logging standards
- [MICROSERVICES_MONITORING.md](MICROSERVICES_MONITORING.md) - Monitoring setup
- [MICROSERVICES_COMMUNICATION.md](MICROSERVICES_COMMUNICATION.md) - Service communication

---

*Last updated: March 2026 | CITARION Documentation Team*
