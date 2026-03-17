/**
 * Signal Bot Signal API
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parseSignal } from "@/lib/signal-parser";
import { toTypedConfig } from "@/lib/signal-bot/types";
import { activeEngines } from "../start/route";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { botId, source, message, metadata, secret } = body;

    if (!message) {
      return NextResponse.json({ success: false, error: "message required" }, { status: 400 });
    }

    // Specific bot
    if (botId) {
      const botConfig = await db.signalBotConfig.findUnique({ where: { id: botId } });
      if (!botConfig) {
        return NextResponse.json({ success: false, error: "Bot not found" }, { status: 404 });
      }

      if (source === "TRADINGVIEW" && botConfig.tradingViewSecret && secret !== botConfig.tradingViewSecret) {
        return NextResponse.json({ success: false, error: "Invalid secret" }, { status: 401 });
      }

      const engine = activeEngines.get(botId);
      if (!engine) {
        return NextResponse.json({ success: false, error: "Bot not running" }, { status: 400 });
      }

      const result = await engine.processSignal(message, source || "MANUAL", metadata);
      return NextResponse.json(result);
    }

    // No botId - find matching bots
    const parsed = parseSignal(message);
    if (!parsed) {
      return NextResponse.json({ success: false, error: "Could not parse signal" }, { status: 400 });
    }

    const activeBots = await db.signalBotConfig.findMany({ where: { isActive: true } });
    const results: any[] = [];

    for (const bot of activeBots) {
      const config = toTypedConfig(bot);
      
      if (config.directionFilter !== "BOTH" && parsed.direction !== config.directionFilter) continue;
      if (config.allowedSymbols.length > 0 && !config.allowedSymbols.includes(parsed.symbol)) continue;
      if (config.blockedSymbols.includes(parsed.symbol)) continue;

      const engine = activeEngines.get(bot.id);
      if (!engine) continue;

      const result = await engine.processSignal(message, source || "MANUAL", metadata);
      results.push({ botId: bot.id, botName: bot.name, result });
    }

    return NextResponse.json({ success: true, parsed, processedBots: results.length, results });
  } catch (error) {
    console.error("Signal error:", error);
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const botId = searchParams.get("botId");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");

    const whereClause: any = {};
    if (botId) whereClause.signalBotId = botId;
    if (status) whereClause.status = status;

    const signals = await db.signalRecord.findMany({
      where: whereClause,
      orderBy: { receivedAt: "desc" },
      take: limit
    });

    const total = await db.signalRecord.count({ where: whereClause });

    return NextResponse.json({ success: true, signals, total });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}
