import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * POST /api/paper-trading/positions/update
 * Update a paper trading position (SL/TP)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accountId, positionId, stopLoss, takeProfit } = body;

    if (!accountId || !positionId) {
      return NextResponse.json(
        { success: false, error: "Account ID and Position ID are required" },
        { status: 400 }
      );
    }

    // Get the paper account
    const account = await db.account.findUnique({
      where: { id: accountId },
      include: { 
        paperAccount: true,
      },
    });

    if (!account || !account.paperAccount) {
      return NextResponse.json(
        { success: false, error: "Paper account not found" },
        { status: 404 }
      );
    }

    const paperAccount = account.paperAccount;

    // Get the position
    const position = await db.paperPosition.findUnique({
      where: { id: positionId },
    });

    if (!position || position.paperAccountId !== paperAccount.id) {
      return NextResponse.json(
        { success: false, error: "Position not found" },
        { status: 404 }
      );
    }

    if (position.status !== "OPEN") {
      return NextResponse.json(
        { success: false, error: "Position is not open" },
        { status: 400 }
      );
    }

    // Update position
    const updateData: Record<string, unknown> = {};
    
    if (stopLoss !== undefined) {
      updateData.stopLoss = stopLoss;
    }
    
    if (takeProfit !== undefined) {
      updateData.takeProfit = takeProfit;
    }

    const updatedPosition = await db.paperPosition.update({
      where: { id: positionId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      position: {
        id: updatedPosition.id,
        symbol: updatedPosition.symbol,
        direction: updatedPosition.direction,
        stopLoss: updatedPosition.stopLoss,
        takeProfit: updatedPosition.takeProfit,
      },
    });
  } catch (error) {
    console.error("[PaperTrading] Update position error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update position" },
      { status: 500 }
    );
  }
}
