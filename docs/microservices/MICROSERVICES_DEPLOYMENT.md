# CITARION Microservices Deployment Guide

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Overview

This guide covers deployment strategies for all CITARION microservices, including Docker, Kubernetes, and manual deployment options.

---

## 🐳 Docker Deployment

### Docker Compose (Recommended for Development)

```yaml
# docker-compose.yml
version: '3.8'

services:
  # Main Application
  citarion:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=file:/app/data/citarion.db
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - ENCRYPTION_KEY=${ENCRYPTION_KEY}
    volumes:
      - ./data:/app/data
      - ./logs:/app/logs
    depends_on:
      - price-service
      - bot-monitor
      - risk-monitor

  # Price Service
  price-service:
    build:
      context: ./mini-services/price-service
      dockerfile: Dockerfile
    ports:
      - "3002:3002"
    environment:
      - BINANCE_WS_URL=wss://stream.binance.com:9443
      - BYBIT_WS_URL=wss://stream.bybit.com
    restart: unless-stopped

  # Bot Monitor
  bot-monitor:
    build:
      context: ./mini-services/bot-monitor
      dockerfile: Dockerfile
    ports:
      - "3003:3003"
    environment:
      - DATABASE_URL=file:/app/data/citarion.db
    restart: unless-stopped

  # Risk Monitor
  risk-monitor:
    build:
      context: ./mini-services/risk-monitor
      dockerfile: Dockerfile
    ports:
      - "3004:3004"
    environment:
      - DATABASE_URL=file:/app/data/citarion.db
    restart: unless-stopped

  # Chat Service
  chat-service:
    build:
      context: ./mini-services/chat-service
      dockerfile: Dockerfile
    ports:
      - "3005:3005"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    restart: unless-stopped

  # ML Service
  ml-service:
    build:
      context: ./mini-services/ml-service
      dockerfile: Dockerfile
    ports:
      - "3006:3006"
    volumes:
      - ./models:/app/models
    restart: unless-stopped

  # RL Service
  rl-service:
    build:
      context: ./mini-services/rl-service
      dockerfile: Dockerfile
    ports:
      - "3007:3007"
    volumes:
      - ./models:/app/models
    restart: unless-stopped

  # Redis (for pub/sub and caching)
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

volumes:
  redis-data:
```

### Running Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Scale specific service
docker-compose up -d --scale price-service=3

# Stop all services
docker-compose down
```

---

## ☸️ Kubernetes Deployment

### Namespace Configuration

```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: citarion
```

### Main Application Deployment

```yaml
# k8s/citarion-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: citarion
  namespace: citarion
spec:
  replicas: 3
  selector:
    matchLabels:
      app: citarion
  template:
    metadata:
      labels:
        app: citarion
    spec:
      containers:
      - name: citarion
        image: citarion:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: citarion-secrets
              key: database-url
        - name: NEXTAUTH_SECRET
          valueFrom:
            secretKeyRef:
              name: citarion-secrets
              key: nextauth-secret
        - name: ENCRYPTION_KEY
          valueFrom:
            secretKeyRef:
              name: citarion-secrets
              key: encryption-key
```

### Price Service Deployment

```yaml
# k8s/price-service-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: price-service
  namespace: citarion
spec:
  replicas: 2
  selector:
    matchLabels:
      app: price-service
  template:
    spec:
      containers:
      - name: price-service
        image: citarion-price-service:latest
        ports:
        - containerPort: 3002
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3002
          initialDelaySeconds: 10
          periodSeconds: 5
```

### Service Definitions

```yaml
# k8s/services.yaml
apiVersion: v1
kind: Service
metadata:
  name: citarion
  namespace: citarion
spec:
  selector:
    app: citarion
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer

---
apiVersion: v1
kind: Service
metadata:
  name: price-service
  namespace: citarion
spec:
  selector:
    app: price-service
  ports:
  - port: 3002
    targetPort: 3002
  type: ClusterIP
```

### Horizontal Pod Autoscaler

```yaml
# k8s/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: citarion-hpa
  namespace: citarion
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: citarion
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

---

## 📊 Resource Requirements

| Service | CPU Request | CPU Limit | Memory Request | Memory Limit |
|---------|------------|-----------|----------------|--------------|
| Main App | 250m | 1000m | 512Mi | 2Gi |
| Price Service | 100m | 500m | 256Mi | 1Gi |
| Bot Monitor | 100m | 250m | 128Mi | 512Mi |
| Risk Monitor | 100m | 250m | 128Mi | 512Mi |
| Chat Service | 100m | 500m | 256Mi | 1Gi |
| ML Service | 500m | 2000m | 1Gi | 4Gi |
| RL Service | 500m | 2000m | 1Gi | 4Gi |
| Redis | 100m | 250m | 128Mi | 256Mi |

---

## 🔧 Environment Variables

### Core Services

```env
# Database
DATABASE_URL="file:./data/citarion.db"

# Authentication
NEXTAUTH_SECRET="your-secret-min-32-chars"
NEXTAUTH_URL="https://your-domain.com"

# Encryption
ENCRYPTION_KEY="your-32-byte-encryption-key"

# Redis
REDIS_URL="redis://redis:6379"
```

### Exchange APIs

```env
BINANCE_API_KEY=""
BINANCE_API_SECRET=""
BINANCE_WS_URL="wss://stream.binance.com:9443"

BYBIT_API_KEY=""
BYBIT_API_SECRET=""
BYBIT_WS_URL="wss://stream.bybit.com"

OKX_API_KEY=""
OKX_API_SECRET=""
OKX_PASSPHRASE=""
```

### ML Services

```env
ML_SERVICE_URL="http://ml-service:3006"
RL_SERVICE_URL="http://rl-service:3007"
MODEL_PATH="/app/models"
```

---

## 🚀 Deployment Scripts

### start-services.sh

```bash
#!/bin/bash

# Start all microservices
echo "Starting CITARION microservices..."

# Price Service
cd mini-services/price-service && bun run dev &
cd ../..

# Bot Monitor
cd mini-services/bot-monitor && bun run dev &
cd ../..

# Risk Monitor
cd mini-services/risk-monitor && bun run dev &
cd ../..

# Chat Service
cd mini-services/chat-service && bun run dev &
cd ../..

# ML Service (Python)
cd mini-services/ml-service && python main.py &
cd ../..

# RL Service (Python)
cd mini-services/rl-service && python main.py &
cd ../..

echo "All services started!"
```

### Health Check Script

```bash
#!/bin/bash

echo "Checking service health..."

services=(
  "Price Service:http://localhost:3002/health"
  "Bot Monitor:http://localhost:3003/health"
  "Risk Monitor:http://localhost:3004/health"
  "Chat Service:http://localhost:3005/health"
  "ML Service:http://localhost:3006/health"
  "RL Service:http://localhost:3007/health"
)

for service in "${services[@]}"; do
  name="${service%%:*}"
  url="${service#*:}"
  
  response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  
  if [ "$response" = "200" ]; then
    echo "✅ $name: Healthy"
  else
    echo "❌ $name: Unhealthy (HTTP $response)"
  fi
done
```

---

## 🔄 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy Microservices

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and Push Images
        run: |
          docker-compose build
          docker-compose push

      - name: Deploy to Kubernetes
        run: |
          kubectl apply -f k8s/
```

---

## 📚 Related Documentation

- [MICROSERVICES_MONITORING.md](MICROSERVICES_MONITORING.md) - Monitoring setup
- [MICROSERVICES_API.md](MICROSERVICES_API.md) - API reference
- [../deployment/DEPLOYMENT_GUIDE.md](../deployment/DEPLOYMENT_GUIDE.md) - Main deployment guide

---

*Last updated: March 2026 | CITARION Documentation Team*
