/**
 * Risk Check Event API
 * 
 * Called by the execution engine to emit risk check events to the WebSocket service.
 * This enables real-time notifications for risk check results.
 */

import { NextRequest, NextResponse } from "next/server";
import { io } from "socket.io-client";

// WebSocket connection to risk monitor service
const RISK_MONITOR_URL = process.env.RISK_MONITOR_URL || "http://localhost:3004";
let riskMonitorSocket: ReturnType<typeof io> | null = null;

function getRiskMonitorSocket() {
  if (!riskMonitorSocket) {
    riskMonitorSocket = io(RISK_MONITOR_URL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    riskMonitorSocket.on("connect", () => {
      console.log("[RiskCheckEvent] Connected to risk monitor service");
    });

    riskMonitorSocket.on("disconnect", () => {
      console.log("[RiskCheckEvent] Disconnected from risk monitor service");
    });
  }
  return riskMonitorSocket;
}

export interface RiskCheckEventData {
  userId: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  passed: boolean;
  checks: Array<{
    passed: boolean;
    reason?: string;
    filterName: string;
    metadata?: Record<string, unknown>;
  }>;
  positionId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: RiskCheckEventData = await request.json();

    // Validate required fields
    if (!data.userId || !data.symbol || !data.direction) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Emit to risk monitor WebSocket service
    const socket = getRiskMonitorSocket();
    
    if (socket.connected) {
      socket.emit("risk_check_event", {
        ...data,
        timestamp: new Date(),
      });
    } else {
      // Try to reconnect
      socket.connect();
      
      // Wait briefly for connection
      await new Promise((resolve) => setTimeout(resolve, 100));
      
      if (socket.connected) {
        socket.emit("risk_check_event", {
          ...data,
          timestamp: new Date(),
        });
      } else {
        console.warn("[RiskCheckEvent] WebSocket not connected, skipping notification");
      }
    }

    return NextResponse.json({
      success: true,
      emitted: socket.connected,
    });
  } catch (error) {
    console.error("[RiskCheckEvent] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Batch endpoint for multiple events
export async function PUT(request: NextRequest) {
  try {
    const events: RiskCheckEventData[] = await request.json();

    if (!Array.isArray(events)) {
      return NextResponse.json(
        { success: false, error: "Expected array of events" },
        { status: 400 }
      );
    }

    const socket = getRiskMonitorSocket();

    if (socket.connected) {
      socket.emit("batch_risk_check_events", events.map(e => ({
        ...e,
        timestamp: new Date(),
      })));
    }

    return NextResponse.json({
      success: true,
      count: events.length,
      emitted: socket.connected,
    });
  } catch (error) {
    console.error("[RiskCheckEvent] Batch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
