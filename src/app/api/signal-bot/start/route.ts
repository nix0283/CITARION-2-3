/**
 * Signal Bot Start/Status API
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { SignalBotEngine, toTypedConfig } from "@/lib/signal-bot";

const activeEngines = new Map<string, SignalBotEngine>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { botId } = body;

    if (!botId) {
      return NextResponse.json({ success: false, error: "botId required" }, { status: 400 });
    }

    const botConfig = await db.signalBotConfig.findUnique({ where: { id: botId } });
    if (!botConfig) {
      return NextResponse.json({ success: false, error: "Bot not found" }, { status: 404 });
    }

    if (activeEngines.has(botId) && activeEngines.get(botId)!.isRunning()) {
      return NextResponse.json({ success: true, message: "Already running" });
    }

    const engine = new SignalBotEngine(toTypedConfig(botConfig));
    await engine.start();
    activeEngines.set(botId, engine);

    await db.signalBotConfig.update({ where: { id: botId }, data: { isActive: true } });

    return NextResponse.json({ success: true, state: engine.getState() });
  } catch (error) {
    console.error("Start error:", error);
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const botId = searchParams.get("botId");

    if (botId) {
      const engine = activeEngines.get(botId);
      return NextResponse.json({
        success: true,
        isRunning: engine?.isRunning() || false,
        state: engine?.getState() || null
      });
    }

    return NextResponse.json({
      success: true,
      activeCount: activeEngines.size,
      botIds: Array.from(activeEngines.keys())
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}

export { activeEngines };
