/**
 * Funding Rates API - Returns real-time funding rates from WebSocket connections
 * GET /api/funding/rates
 */

import { NextResponse } from "next/server";
import { getFundingRateWebSocket } from "@/lib/funding";

export async function GET() {
  try {
    const fundingWs = getFundingRateWebSocket();
    const allRates = fundingWs.getAllFundingRates();

    if (allRates.length === 0) {
      // No real data yet, return empty with status
      return NextResponse.json({
        success: true,
        rates: [],
        message: "WebSocket connections initializing, no data yet",
      });
    }

    // Transform to frontend format
    const rates = allRates.map((rate) => {
      const annualizedRate = rate.fundingRate * 3 * 365;
      const heatScore = getHeatScore(rate.fundingRate);
      const heatLevel = getHeatLevel(heatScore);

      return {
        symbol: rate.symbol,
        exchange: rate.exchange,
        rate: rate.fundingRate,
        ratePercent: (rate.fundingRate * 100).toFixed(4),
        annualizedRate,
        markPrice: rate.markPrice,
        indexPrice: rate.indexPrice,
        heatLevel,
        heatScore,
        timestamp: rate.timestamp.toISOString(),
      };
    });

    return NextResponse.json({
      success: true,
      rates,
      count: rates.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Funding API] Error:", error);
    return NextResponse.json(
      {
        success: false,
        rates: [],
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Helper functions
function getHeatLevel(score: number): "low" | "medium" | "high" | "critical" {
  if (score >= 4) return "critical";
  if (score >= 3) return "high";
  if (score >= 2) return "medium";
  return "low";
}

function getHeatScore(rate: number): number {
  const annualized = Math.abs(rate) * 3 * 365;

  if (annualized > 100) return 4;
  if (annualized > 50) return 3;
  if (annualized > 20) return 2;
  if (annualized > 5) return 1;
  return 0;
}
