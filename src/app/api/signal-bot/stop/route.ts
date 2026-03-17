/**
 * Signal Bot Stop API
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { activeEngines } from "../start/route";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { botId } = body;

    if (!botId) {
      return NextResponse.json({ success: false, error: "botId required" }, { status: 400 });
    }

    const engine = activeEngines.get(botId);
    if (engine) {
      await engine.stop();
      activeEngines.delete(botId);
    }

    await db.signalBotConfig.update({ where: { id: botId }, data: { isActive: false } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}
