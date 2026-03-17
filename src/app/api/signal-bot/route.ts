/**
 * Signal Bot API Routes
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

type SessionUser = { id?: string; name?: string | null; email?: string | null };

function getUserId(): string | null {
  return null; // Session disabled for now - use API key auth
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ success: false, error: "userId required" }, { status: 400 });
    }

    const bots = await db.signalBotConfig.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ success: true, bots });
  } catch (error) {
    console.error("Signal Bot GET error:", error);
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, name, description, accountId } = body;

    if (!userId || !name) {
      return NextResponse.json({ success: false, error: "userId and name required" }, { status: 400 });
    }

    const bot = await db.signalBotConfig.create({
      data: {
        userId,
        accountId,
        name,
        description,
        isActive: false
      }
    });

    return NextResponse.json({ success: true, bot });
  } catch (error) {
    console.error("Signal Bot POST error:", error);
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "id required" }, { status: 400 });
    }

    await db.signalRecord.deleteMany({ where: { signalBotId: id } });
    await db.signalBotConfig.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Signal Bot DELETE error:", error);
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}
