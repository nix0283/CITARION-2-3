/**
 * Funding Rates API Proxy
 * Proxies requests to funding-service mini-service on port 3010
 * GET /api/funding/live
 */

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("http://localhost:3010/rates");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[Funding Proxy] Error:", error);
    return NextResponse.json(
      {
        success: false,
        rates: [],
        error: "Failed to connect to funding service",
        message: "Funding service unavailable"
      },
      { status: 503 }
    );
  }
}
