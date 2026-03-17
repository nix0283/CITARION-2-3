/**
 * Auto-Cancel Orders Cron Endpoint
 * 
 * This endpoint is called periodically to cancel unfilled orders that have exceeded
 * their auto-cancel timeout. It should be called by a cron service or scheduler.
 * 
 * Cornix-compatible feature: Auto-Cancel Trade Timeout
 * 
 * Usage:
 * - Set up a cron job to call this endpoint every minute
 * - Or use a service like Vercel Cron Jobs
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { calculateAutoCancelTime } from "@/lib/auto-trading/advanced-risk-management";

// Cron secret for authentication
const CRON_SECRET = process.env.CRON_SECRET || "your-cron-secret-here";

interface OrderToCancel {
  id: string;
  accountId: string;
  symbol: string;
  createdAt: Date;
  autoCancelTimeout: number;
  autoCancelTimeoutUnit: string;
  botConfigId: string;
}

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get("authorization");
    const providedSecret = authHeader?.replace("Bearer ", "");
    
    if (providedSecret !== CRON_SECRET) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const now = new Date();
    const cancelledOrders: string[] = [];
    const errors: string[] = [];

    // Find all pending orders with auto-cancel configured
    // We need to join with BotConfig to get timeout settings
    const pendingOrders = await db.$queryRaw<OrderToCancel[]>`
      SELECT 
        p.id,
        p."accountId",
        p.symbol,
        p."createdAt",
        bc."autoCancelTimeout",
        bc."autoCancelTimeoutUnit",
        bc.id as "botConfigId"
      FROM "Position" p
      JOIN "Account" a ON p."accountId" = a.id
      JOIN "BotConfig" bc ON bc."userId" = a."userId"
      WHERE p.status = 'PENDING'
        AND bc."autoCancelTimeout" > 0
        AND bc."isActive" = true
    `;

    for (const order of pendingOrders) {
      try {
        const autoCancelAt = calculateAutoCancelTime(
          order.createdAt,
          order.autoCancelTimeout,
          order.autoCancelTimeoutUnit as "SECONDS" | "MINUTES" | "HOURS"
        );

        if (!autoCancelAt) continue;

        // Check if order should be cancelled
        if (now >= autoCancelAt) {
          // Cancel the order
          await db.position.update({
            where: { id: order.id },
            data: {
              status: "CANCELLED",
              closeReason: "AUTO_CANCEL_TIMEOUT",
              closedAt: now,
              updatedAt: now,
            },
          });

          // Log the cancellation
          await db.systemLog.create({
            data: {
              level: "INFO",
              category: "ORDER_TIMEOUT",
              message: `Order ${order.id} auto-cancelled after timeout`,
              details: JSON.stringify({
                orderId: order.id,
                symbol: order.symbol,
                createdAt: order.createdAt,
                cancelledAt: now,
                timeout: order.autoCancelTimeout,
                timeoutUnit: order.autoCancelTimeoutUnit,
              }),
            },
          });

          cancelledOrders.push(order.id);
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        errors.push(`Order ${order.id}: ${errorMsg}`);
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: now.toISOString(),
      checked: pendingOrders.length,
      cancelled: cancelledOrders.length,
      cancelledOrders,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("[AutoCancelCron] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Also support POST for manual triggering
export async function POST(request: NextRequest) {
  return GET(request);
}
