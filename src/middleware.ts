/**
 * CITARION Rate Limiting Middleware
 * 
 * Production-ready rate limiting for critical API endpoints.
 * Protects against DDoS, abuse, and resource exhaustion.
 * 
 * Rate Limits by Endpoint Category:
 * - Trading: 10 requests/minute (high-value operations)
 * - Auth: 5 requests/minute (security-sensitive)
 * - API Keys: 3 requests/minute (credential operations)
 * - Public: 100 requests/minute (general access)
 */

import { NextRequest, NextResponse } from "next/server";

// ============================================================================
// TYPES
// ============================================================================

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message?: string;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// ============================================================================
// RATE LIMIT CONFIGURATION
// ============================================================================

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  // Trading endpoints - stricter limits
  "/api/trade": { windowMs: 60000, maxRequests: 10, message: "Too many trade requests. Please wait." },
  "/api/trade/open": { windowMs: 60000, maxRequests: 10, message: "Too many trade open requests." },
  "/api/trade/close": { windowMs: 60000, maxRequests: 10, message: "Too many trade close requests." },
  "/api/trade/close-all": { windowMs: 60000, maxRequests: 5, message: "Too many close-all requests." },
  
  // Authentication - very strict
  "/api/auth": { windowMs: 60000, maxRequests: 5, message: "Too many auth attempts. Please wait." },
  "/api/auth/2fa": { windowMs: 60000, maxRequests: 3, message: "Too many 2FA attempts." },
  
  // Exchange operations - moderate
  "/api/exchange": { windowMs: 60000, maxRequests: 20, message: "Too many exchange requests." },
  "/api/exchange/verify": { windowMs: 60000, maxRequests: 5, message: "Too many verification attempts." },
  
  // Bot operations - moderate
  "/api/bots": { windowMs: 60000, maxRequests: 30, message: "Too many bot requests." },
  "/api/bots/grid": { windowMs: 60000, maxRequests: 20, message: "Too many grid bot requests." },
  "/api/bots/dca": { windowMs: 60000, maxRequests: 20, message: "Too many DCA bot requests." },
  
  // Auto-trading - strict
  "/api/auto-trading": { windowMs: 60000, maxRequests: 15, message: "Too many auto-trading requests." },
  "/api/auto-trading/execute": { windowMs: 60000, maxRequests: 10, message: "Too many execution requests." },
  
  // Signal parsing - moderate
  "/api/signal": { windowMs: 60000, maxRequests: 30, message: "Too many signal requests." },
  "/api/chat/parse-signal": { windowMs: 60000, maxRequests: 20, message: "Too many signal parse requests." },
  
  // Webhooks - strict (external input)
  "/api/webhook": { windowMs: 60000, maxRequests: 30, message: "Too many webhook requests." },
  "/api/telegram/webhook": { windowMs: 60000, maxRequests: 60, message: "Too many Telegram webhooks." },
  
  // Default for unlisted endpoints
  "default": { windowMs: 60000, maxRequests: 100, message: "Too many requests." },
};

// ============================================================================
// IN-MEMORY RATE LIMITER
// ============================================================================

// Use a Map for storing rate limit counters
// In production, this should be Redis for distributed systems
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup interval to prevent memory leaks
const CLEANUP_INTERVAL = 60000; // 1 minute
let lastCleanup = Date.now();

function cleanupStore(): void {
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL) {
    for (const [key, entry] of rateLimitStore) {
      if (entry.resetAt < now) {
        rateLimitStore.delete(key);
      }
    }
    lastCleanup = now;
  }
}

function getRateLimitKey(request: NextRequest): string {
  // Try to get user ID from headers (set by auth)
  const userId = request.headers.get("x-user-id");
  if (userId) {
    return `user:${userId}`;
  }
  
  // Fall back to IP address
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : 
             request.headers.get("x-real-ip") || 
             "anonymous";
  
  return `ip:${ip}`;
}

function findMatchingConfig(pathname: string): RateLimitConfig {
  // Check for exact match first
  if (RATE_LIMITS[pathname]) {
    return RATE_LIMITS[pathname];
  }
  
  // Check for prefix match
  for (const [pattern, config] of Object.entries(RATE_LIMITS)) {
    if (pattern !== "default" && pathname.startsWith(pattern)) {
      return config;
    }
  }
  
  return RATE_LIMITS["default"];
}

function checkRateLimit(
  identifier: string,
  pathname: string
): { allowed: boolean; remaining: number; resetAt: number; config: RateLimitConfig } {
  // Cleanup old entries periodically
  cleanupStore();
  
  const config = findMatchingConfig(pathname);
  const key = `${pathname}:${identifier}`;
  const now = Date.now();
  
  let entry = rateLimitStore.get(key);
  
  if (!entry || entry.resetAt < now) {
    // Create new window
    entry = {
      count: 0,
      resetAt: now + config.windowMs,
    };
    rateLimitStore.set(key, entry);
  }
  
  entry.count++;
  
  const remaining = Math.max(0, config.maxRequests - entry.count);
  const allowed = entry.count <= config.maxRequests;
  
  return {
    allowed,
    remaining,
    resetAt: entry.resetAt,
    config,
  };
}

// ============================================================================
// MIDDLEWARE
// ============================================================================

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  
  // Skip rate limiting for non-API routes
  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }
  
  // Skip for health checks and static assets
  if (
    pathname === "/api/health" ||
    pathname === "/api/metrics" ||
    pathname.startsWith("/api/public/")
  ) {
    return NextResponse.next();
  }
  
  const identifier = getRateLimitKey(request);
  const result = checkRateLimit(identifier, pathname);
  
  // Add rate limit headers
  const headers = new Headers({
    "X-RateLimit-Limit": result.config.maxRequests.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": result.resetAt.toString(),
  });
  
  if (!result.allowed) {
    const retryAfter = Math.ceil((result.resetAt - Date.now()) / 1000);
    headers.set("Retry-After", retryAfter.toString());
    
    return NextResponse.json(
      {
        success: false,
        error: result.config.message || "Rate limit exceeded",
        retryAfter,
      },
      {
        status: 429,
        headers,
      }
    );
  }
  
  const response = NextResponse.next();
  
  // Copy headers to response
  response.headers.set("X-RateLimit-Limit", result.config.maxRequests.toString());
  response.headers.set("X-RateLimit-Remaining", result.remaining.toString());
  response.headers.set("X-RateLimit-Reset", result.resetAt.toString());
  
  return response;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

export const config = {
  matcher: [
    /*
     * Match all API routes:
     * - /api/trade/*
     * - /api/bots/*
     * - /api/auth/*
     * - /api/exchange/*
     * - etc.
     */
    "/api/:path*",
  ],
};
