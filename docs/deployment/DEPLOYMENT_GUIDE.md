# CITARION Deployment Guide

> **Last Updated:** March 2025  
> **Target:** Production deployment

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Architecture Overview](#architecture-overview)
3. [Local Development](#local-development)
4. [Docker Deployment](#docker-deployment)
5. [Production Deployment](#production-deployment)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Health Checks](#health-checks)
8. [Monitoring](#monitoring)
9. [Rollback](#rollback)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 2 cores | 4+ cores |
| RAM | 4 GB | 8+ GB |
| Storage | 20 GB | 50+ GB SSD |
| Node.js | 20.x | 22.x |
| Python | 3.11 | 3.12 |
| Database | SQLite | PostgreSQL |

### Required Software

```bash
# Node.js (via nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 22
nvm use 22

# Bun (recommended)
curl -fsSL https://bun.sh/install | bash

# Docker
curl -fsSL https://get.docker.com | sh

# Python
sudo apt install python3.11 python3.11-venv python3-pip
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PRODUCTION ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                         ┌─────────────────┐                                 │
│                         │   Load Balancer │                                 │
│                         │   (Nginx/Caddy) │                                 │
│                         └────────┬────────┘                                 │
│                                  │                                          │
│              ┌───────────────────┼───────────────────┐                     │
│              │                   │                   │                     │
│              ▼                   ▼                   ▼                     │
│     ┌────────────────┐  ┌────────────────┐  ┌────────────────┐            │
│     │   Next.js      │  │   Next.js      │  │   Next.js      │            │
│     │   Instance 1   │  │   Instance 2   │  │   Instance 3   │            │
│     └────────┬───────┘  └────────┬───────┘  └────────┬───────┘            │
│              │                   │                   │                     │
│              └───────────────────┼───────────────────┘                     │
│                                  │                                          │
│     ┌────────────────────────────┼────────────────────────────┐            │
│     │                            │                            │            │
│     ▼                            ▼                            ▼            │
│ ┌───────────┐            ┌───────────────┐            ┌───────────────┐   │
│ │ PostgreSQL│            │    Redis      │            │  Python ML    │   │
│ │ Database  │            │  (Optional)   │            │   Services    │   │
│ └───────────┘            └───────────────┘            └───────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Local Development

### Quick Start

```bash
# Clone repository
git clone https://github.com/nix0283/CITARION-2-2.git
cd CITARION-2-2

# Install dependencies
bun install

# Setup environment
cp .env.example .env
# Edit .env with your values

# Setup database
bun run db:push

# Start development server
bun run dev
```

### Starting Microservices

```bash
# Start all services
./start-services.sh all

# Or individually
cd mini-services/price-service && bun run dev &
cd mini-services/bot-monitor && bun run dev &
cd mini-services/risk-monitor && bun run dev &
cd mini-services/chat-service && bun run dev &
cd mini-services/telegram-service && bun run dev &
cd mini-services/ml-service && python main.py &
cd mini-services/rl-service && python main.py &
```

---

## Docker Deployment

### Dockerfile

```dockerfile
# Dockerfile
FROM oven/bun:1 AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run db:generate
RUN bun run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/citarion
    env_file:
      - .env
    depends_on:
      - db
      - redis
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: citarion
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped

  ml-service:
    build:
      context: ./mini-services/ml-service
      dockerfile: Dockerfile
    ports:
      - "3006:3006"
    restart: unless-stopped

  rl-service:
    build:
      context: ./mini-services/rl-service
      dockerfile: Dockerfile
    ports:
      - "3007:3007"
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

### Build and Run

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

---

## Production Deployment

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install -y nginx certbot python3-certbot-nginx

# Setup firewall
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 2. Environment Variables

```bash
# Create production .env
cat > .env.production << EOF
NODE_ENV=production
DATABASE_URL="postgresql://user:pass@localhost:5432/citarion"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="https://your-domain.com"
ENCRYPTION_KEY="$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")"
REDIS_URL="redis://localhost:6379"
ML_SERVICE_URL="http://localhost:3006"
EOF
```

### 3. Nginx Configuration

```nginx
# /etc/nginx/sites-available/citarion
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # WebSocket support
    location /socket.io/ {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### 4. SSL Certificate

```bash
# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### 5. Process Management (PM2)

```bash
# Install PM2
npm install -g pm2

# Create ecosystem config
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'citarion',
      script: '.next/standalone/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
}
EOF

# Start application
pm2 start ecosystem.config.js --env production

# Save PM2 config
pm2 save
pm2 startup
```

---

## CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        
      - name: Install dependencies
        run: bun install
        
      - name: Run linter
        run: bun run lint
        
      - name: Run tests
        run: bun run test
        
      - name: Build
        run: bun run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to server
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/citarion
            git pull origin main
            bun install
            bun run db:push
            bun run build
            pm2 restart citarion
```

---

## Health Checks

### Application Health

```bash
# Main application
curl http://localhost:3000/api

# Response: { "message": "Hello, world!" }
```

### Database Health

```bash
# Check database connection
curl http://localhost:3000/api/health/db
```

### ML Service Health

```bash
# Check ML service
curl http://localhost:3006/health
```

### Full Health Check

```typescript
// /api/health/route.ts
export async function GET() {
  const checks = {
    app: 'ok',
    database: await checkDatabase(),
    redis: await checkRedis(),
    mlService: await checkMLService(),
  };
  
  const allOk = Object.values(checks).every(v => v === 'ok');
  
  return Response.json({
    status: allOk ? 'healthy' : 'degraded',
    checks,
    timestamp: new Date().toISOString()
  }, { status: allOk ? 200 : 503 });
}
```

---

## Monitoring

### Logs

```bash
# Application logs
pm2 logs citarion

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# System logs
journalctl -u citarion -f
```

### Prometheus Metrics

```typescript
// /api/metrics/route.ts
import { prometheusExporter } from '@/lib/monitoring/prometheus';

export async function GET() {
  const metrics = await prometheusExporter.export();
  return new Response(metrics, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
```

### Key Metrics

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| `http_requests_total` | Total HTTP requests | - |
| `http_request_duration_seconds` | Request latency | > 1s |
| `db_query_duration_seconds` | Database query time | > 500ms |
| `websocket_connections` | Active WS connections | - |
| `trades_total` | Total trades executed | - |
| `pnl_current` | Current PnL | < -10% |

---

## Rollback

### Quick Rollback

```bash
# Rollback to previous version
git log --oneline -5  # Find commit
git checkout <previous-commit>
bun install
bun run build
pm2 restart citarion
```

### Database Rollback

```bash
# Rollback database migration
bunx prisma migrate rollback
```

### Docker Rollback

```bash
# Rollback to previous image
docker-compose down
docker tag citarion:current citarion:backup
docker tag citarion:previous citarion:current
docker-compose up -d
```

---

## Troubleshooting

### Common Issues

#### Application won't start

```bash
# Check logs
pm2 logs citarion --lines 100

# Check environment
node -e "console.log(process.env.DATABASE_URL)"

# Check database
bunx prisma db push
```

#### Database connection errors

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check connection
psql -U user -d citarion -h localhost
```

#### Memory issues

```bash
# Check memory usage
free -h
pm2 monit

# Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=4096" pm2 restart citarion
```

#### WebSocket not connecting

```bash
# Check Nginx WebSocket config
sudo nginx -t

# Check port forwarding
netstat -tlnp | grep 3002
```

---

## Security Checklist

- [ ] Change default passwords
- [ ] Enable HTTPS with valid certificate
- [ ] Configure firewall (ufw)
- [ ] Set secure cookies (SECURE, HTTPONLY)
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Enable 2FA for admin accounts
- [ ] Regular security updates
- [ ] Backup database regularly
- [ ] Monitor logs for suspicious activity

---

## Related Documentation

- [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md) - Environment setup
- [SECURITY_GUIDE.md](../security/SECURITY_GUIDE.md) - Security configuration
- [MONITORING_AND_ALERTING.md](./MONITORING_AND_ALERTING.md) - Monitoring setup
