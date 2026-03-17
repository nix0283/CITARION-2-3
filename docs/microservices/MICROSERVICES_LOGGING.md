# CITARION Microservices Logging Standards

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Overview

Standardized logging practices for all CITARION microservices, including format, levels, and centralized log aggregation.

---

## 📝 Log Format

### JSON Structured Logging

All services must use JSON structured logging:

```json
{
  "timestamp": "2026-03-15T10:30:45.123Z",
  "level": "INFO",
  "service": "price-service",
  "version": "2.0.0",
  "message": "Price update received",
  "context": {
    "symbol": "BTCUSDT",
    "exchange": "binance",
    "price": 67000.50
  },
  "traceId": "abc123def456",
  "spanId": "span789",
  "requestId": "req-12345"
}
```

---

## 🎚️ Log Levels

| Level | Usage | Examples |
|-------|-------|----------|
| **DEBUG** | Detailed debugging info | Variable values, flow tracing |
| **INFO** | Normal operational events | Service start, request received |
| **WARN** | Potential issues | Slow response, retry attempt |
| **ERROR** | Errors that don't stop service | Failed API call, parse error |
| **FATAL** | Critical errors requiring restart | Database connection lost |

### Level Implementation

```typescript
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label.toUpperCase() })
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    service: 'price-service',
    version: '2.0.0'
  }
});

// Usage
logger.debug({ symbol: 'BTCUSDT' }, 'Processing symbol');
logger.info({ exchange: 'binance' }, 'Connected to exchange');
logger.warn({ latency: 5000 }, 'Slow response detected');
logger.error({ error: err.message }, 'Failed to fetch prices');
logger.fatal({ error: err.message }, 'Database connection lost');
```

---

## 📊 Log Categories

### 1. Application Logs

```typescript
// Service lifecycle
logger.info('Service starting...');
logger.info({ port: 3002 }, 'Service listening');
logger.info('Service shutting down...');

// Configuration
logger.info({ config: { retryAttempts: 3 } }, 'Configuration loaded');
```

### 2. Request Logs

```typescript
// HTTP request logging middleware
app.use((req, res, next) => {
  const startTime = Date.now();
  const requestId = uuidv4();
  
  res.on('finish', () => {
    logger.info({
      requestId,
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: Date.now() - startTime,
      ip: req.ip
    }, 'HTTP request completed');
  });
  
  next();
});
```

### 3. Trading Logs

```typescript
// Trade execution
logger.info({
  tradeId: trade.id,
  symbol: trade.symbol,
  side: trade.side,
  quantity: trade.quantity,
  price: trade.price,
  exchange: trade.exchange
}, 'Trade executed');

// Position updates
logger.info({
  positionId: position.id,
  symbol: position.symbol,
  size: position.size,
  entryPrice: position.entryPrice
}, 'Position opened');
```

### 4. Risk Logs

```typescript
// Risk alerts
logger.warn({
  riskScore: 75,
  drawdown: 0.12,
  exposure: 50000
}, 'Risk level elevated');

// Kill switch
logger.fatal({
  triggerType: 'PERCENT_BELOW_HIGHEST',
  threshold: 0.15,
  currentDrawdown: 0.16
}, 'Kill switch triggered');
```

### 5. ML Logs

```typescript
// Model predictions
logger.debug({
  model: 'price_predictor',
  symbol: 'BTCUSDT',
  prediction: 67500,
  confidence: 0.82
}, 'Price prediction generated');

// Training progress
logger.info({
  model: 'ppo_agent',
  episode: 500,
  reward: 125.50,
  loss: 0.05
}, 'Training progress');
```

### 6. Error Logs

```typescript
// With error context
try {
  await executeTrade(order);
} catch (error) {
  logger.error({
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack
    },
    order: {
      symbol: order.symbol,
      side: order.side
    }
  }, 'Trade execution failed');
}
```

---

## 🔍 Sensitive Data Handling

### Data Masking

```typescript
const sensitiveFields = ['apiKey', 'apiSecret', 'password', 'token'];

function maskSensitive(data: any): any {
  if (typeof data !== 'object' || data === null) return data;
  
  const masked = { ...data };
  for (const field of sensitiveFields) {
    if (masked[field]) {
      masked[field] = '***REDACTED***';
    }
  }
  return masked;
}

// Usage
logger.info({ 
  apiKey: 'secret-key-12345',
  symbol: 'BTCUSDT'
}, 'API call'); // apiKey will be masked
```

### Never Log

- API keys and secrets
- User passwords
- Private keys
- Personal information (PII)
- Credit card numbers

---

## 📦 Centralized Logging Setup

### Docker Compose (ELK Stack)

```yaml
# docker-compose.yml
services:
  elasticsearch:
    image: elasticsearch:8.10.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - es-data:/usr/share/elasticsearch/data

  logstash:
    image: logstash:8.10.0
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline
    ports:
      - "5044:5044"
    depends_on:
      - elasticsearch

  kibana:
    image: kibana:8.10.0
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch

  filebeat:
    image: elastic/filebeat:8.10.0
    volumes:
      - ./logs:/var/log/citarion
      - ./filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml
    depends_on:
      - logstash

volumes:
  es-data:
```

### Logstash Pipeline

```ruby
# logstash/pipeline/citarion.conf
input {
  beats {
    port => 5044
  }
}

filter {
  json {
    source => "message"
  }
  
  date {
    match => ["timestamp", "ISO8601"]
  }
  
  mutate {
    add_field => { "environment" => "${ENVIRONMENT}" }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "citarion-%{[service]}-%{+YYYY.MM.dd}"
  }
}
```

### Loki (Alternative)

```yaml
# docker-compose.yml
services:
  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    volumes:
      - ./loki-config.yml:/etc/loki/local-config.yaml

  promtail:
    image: grafana/promtail:latest
    volumes:
      - ./logs:/var/log/citarion
      - ./promtail-config.yml:/etc/promtail/config.yml
```

---

## 📁 Log File Structure

```
logs/
├── citarion/
│   ├── price-service/
│   │   ├── app.log          # All logs
│   │   ├── error.log        # Errors only
│   │   └── access.log       # HTTP access logs
│   ├── bot-monitor/
│   │   ├── app.log
│   │   └── error.log
│   ├── risk-monitor/
│   │   ├── app.log
│   │   └── alerts.log
│   └── ml-service/
│       ├── app.log
│       ├── training.log
│       └── predictions.log
└── archive/
    └── YYYY-MM-DD/
```

---

## 🔄 Log Rotation

### Using logrotate

```bash
# /etc/logrotate.d/citarion
/var/log/citarion/**/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 0644 citarion citarion
    sharedscripts
    postrotate
        docker kill -s USR1 citarion-*
    endscript
}
```

### Using pino-logrotate

```typescript
import pino from 'pino';
import { multistream } from 'pino-multi-stream';
import fs from 'fs';

const streams = [
  { level: 'debug', stream: process.stdout },
  { 
    level: 'info', 
    stream: fs.createWriteStream('/var/log/citarion/app.log', { flags: 'a' })
  },
  { 
    level: 'error', 
    stream: fs.createWriteStream('/var/log/citarion/error.log', { flags: 'a' })
  }
];

const logger = pino({}, multistream(streams));
```

---

## 📚 Related Documentation

- [MICROSERVICES_TRACING.md](MICROSERVICES_TRACING.md) - Distributed tracing
- [MICROSERVICES_MONITORING.md](MICROSERVICES_MONITORING.md) - Monitoring setup
- [../deployment/DEPLOYMENT_GUIDE.md](../deployment/DEPLOYMENT_GUIDE.md) - Deployment guide

---

*Last updated: March 2026 | CITARION Documentation Team*
