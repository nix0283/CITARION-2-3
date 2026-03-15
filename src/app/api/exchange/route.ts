import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { encryptApiKey, maskApiKey } from "@/lib/encryption";
import { getDefaultUserId } from "@/lib/default-user";

// GET - Get all connected exchanges
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accountType = searchParams.get("accountType"); // DEMO or REAL

    const where: Record<string, unknown> = {};
    if (accountType) {
      where.accountType = accountType;
    }

    const accounts = await db.account.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Mask sensitive data and map account types back to UI types
    const safeAccounts = accounts.map((acc) => {
      // Map database types back to UI types:
      // REAL + isTestnet=true -> TESTNET
      // REAL + isTestnet=false -> LIVE
      // DEMO + exchangeType contains "-paper-" -> PAPER
      // DEMO without "-paper-" -> DEMO
      let uiAccountType = acc.accountType;
      const isPaperAccount = acc.exchangeType.includes("-paper-");
      
      if (acc.accountType === "REAL" && acc.isTestnet) {
        uiAccountType = "TESTNET";
      } else if (acc.accountType === "REAL" && !acc.isTestnet) {
        uiAccountType = "LIVE";
      } else if (acc.accountType === "DEMO") {
        // Check if it's a PAPER account by looking for the paper suffix
        uiAccountType = isPaperAccount ? "PAPER" : "DEMO";
      }
      
      return {
        ...acc,
        accountType: uiAccountType,
        apiKey: acc.apiKey ? maskApiKey(acc.apiKey) : null,
        apiSecret: acc.apiSecret ? "••••••••" : null,
      };
    });

    return NextResponse.json({
      success: true,
      accounts: safeAccounts,
      count: safeAccounts.length,
    });
  } catch (error) {
    console.error("Get exchanges error:", error);
    return NextResponse.json(
      { error: "Failed to get exchanges" },
      { status: 500 }
    );
  }
}

// POST - Connect new exchange
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      exchangeId,
      exchangeType = "futures",
      exchangeName,
      apiKey,
      apiSecret,
      apiPassphrase,
      apiUid,
      subAccount,
      isTestnet = false,
      accountType = "REAL",
      initialBalanceCurrency = "USDT",
      initialBalanceAmount = 10000,
    } = body;

    // Validate required fields
    // PAPER accounts don't need API keys (internal simulation)
    // TESTNET uses testnet API keys (optional validation)
    // DEMO uses exchange demo mode (may or may not need keys depending on exchange)
    // REAL requires API keys
    const needsApiKeys = accountType === "REAL" || accountType === "TESTNET" || accountType === "DEMO";
    
    if (needsApiKeys) {
      if (!exchangeId) {
        return NextResponse.json(
          { error: "Exchange ID is required" },
          { status: 400 }
        );
      }
      if (accountType === "REAL" && (!apiKey || !apiSecret)) {
        return NextResponse.json(
          { error: "API Key and API Secret are required for REAL accounts" },
          { status: 400 }
        );
      }
    } else if (!exchangeId) {
      return NextResponse.json(
        { error: "Exchange ID is required" },
        { status: 400 }
      );
    }

    // Map account types to database schema
    // Schema only supports REAL or DEMO, so we map:
    // - LIVE -> REAL
    // - TESTNET -> REAL with isTestnet=true
    // - DEMO -> DEMO
    // - PAPER -> DEMO with virtualBalance
    let dbAccountType: string;
    let dbIsTestnet = isTestnet;
    let virtualBalance: string | null = null;
    
    switch (accountType) {
      case "LIVE":
        dbAccountType = "REAL";
        break;
      case "TESTNET":
        dbAccountType = "REAL";
        dbIsTestnet = true;
        break;
      case "PAPER":
        dbAccountType = "DEMO";
        // Use provided initial balance configuration
        virtualBalance = JSON.stringify({ 
          [initialBalanceCurrency]: initialBalanceAmount 
        });
        break;
      case "DEMO":
      default:
        dbAccountType = "DEMO";
        virtualBalance = JSON.stringify({ USDT: 10000 });
        break;
    }

    // Encrypt API credentials for accounts with real keys
    let encryptedKey = apiKey || null;
    let encryptedSecret = apiSecret || null;
    let encryptedPassphrase = apiPassphrase || null;
    let encryptedUid = apiUid || null;
    
    if (apiKey && apiSecret) {
      try {
        encryptedKey = encryptApiKey(apiKey);
        encryptedSecret = encryptApiKey(apiSecret);
        if (apiPassphrase) encryptedPassphrase = encryptApiKey(apiPassphrase);
        if (apiUid) encryptedUid = encryptApiKey(apiUid);
      } catch (error) {
        console.error("Failed to encrypt API credentials:", error);
        return NextResponse.json(
          { error: "Failed to secure API credentials" },
          { status: 500 }
        );
      }
    }

    // Check if this exchange already exists for this account type
    // For PAPER accounts, always create new (skip existing check)
    if (accountType !== "PAPER") {
      const existing = await db.account.findFirst({
        where: {
          exchangeId,
          exchangeType,
          accountType: dbAccountType,
          isTestnet: dbIsTestnet,
        },
      });

      if (existing) {
        // Update existing account
        const updateData: Record<string, unknown> = {
          apiKey: encryptedKey,
          apiSecret: encryptedSecret,
          apiPassphrase: encryptedPassphrase,
          apiUid: encryptedUid,
          subAccount,
          isTestnet: dbIsTestnet,
          lastSyncAt: null,
          lastError: null,
          isActive: true,
        };
        
        if (virtualBalance) {
          updateData.virtualBalance = virtualBalance;
        }

        const updated = await db.account.update({
          where: { id: existing.id },
          data: updateData,
        });

        return NextResponse.json({
          success: true,
          account: {
            ...updated,
            accountType, // Return original account type
            apiKey: apiKey ? maskApiKey(apiKey) : null,
            apiSecret: "••••••••",
          },
          message: `Аккаунт ${exchangeName || exchangeId} обновлён`,
        });
      }
    }

    // Create new account
    const userId = await getDefaultUserId();
    
    // For PAPER accounts, add unique suffix to exchangeType to bypass unique constraint
    // @@unique([userId, exchangeId, exchangeType])
    // This allows multiple PAPER accounts for the same exchange
    const paperSuffix = accountType === "PAPER" 
      ? `-paper-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`
      : "";
    
    const account = await db.account.create({
      data: {
        userId,
        accountType: dbAccountType,
        exchangeId,
        exchangeType: exchangeType + paperSuffix,
        exchangeName: exchangeName || exchangeId,
        apiKey: encryptedKey,
        apiSecret: encryptedSecret,
        apiPassphrase: encryptedPassphrase,
        apiUid: encryptedUid,
        subAccount,
        isTestnet: dbIsTestnet,
        isActive: true,
        virtualBalance,
      },
    });

    // Create PaperAccount for PAPER accounts
    if (accountType === "PAPER") {
      await db.paperAccount.create({
        data: {
          accountId: account.id,
          initialBalanceCurrency,
          initialBalanceAmount,
          currentBalances: JSON.stringify({ 
            [initialBalanceCurrency]: initialBalanceAmount 
          }),
          peakBalance: initialBalanceAmount,
        },
      });
    }

    // Log the action
    await db.systemLog.create({
      data: {
        level: "INFO",
        category: "SYSTEM",
        message: `Exchange connected: ${exchangeId} (${exchangeType}) - ${accountType}`,
        details: JSON.stringify({ accountId: account.id, isTestnet: dbIsTestnet, originalType: accountType }),
      },
    });

    return NextResponse.json({
      success: true,
      account: {
        ...account,
        accountType, // Return original account type
        apiKey: apiKey ? maskApiKey(apiKey) : null,
        apiSecret: "••••••••",
      },
      message: accountType === "PAPER" 
        ? `Виртуальный аккаунт ${exchangeName || exchangeId} создан`
        : `Биржа ${exchangeName || exchangeId} успешно подключена`,
    });
  } catch (error) {
    console.error("Connect exchange error:", error);
    return NextResponse.json(
      { error: "Failed to connect exchange", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// PUT - Update exchange settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, isActive, apiKey, apiSecret, apiPassphrase, subAccount, isTestnet, hedgeMode } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Account ID is required" },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (isActive !== undefined) updateData.isActive = isActive;
    if (apiKey) updateData.apiKey = apiKey;
    if (apiSecret) updateData.apiSecret = apiSecret;
    if (apiPassphrase !== undefined) updateData.apiPassphrase = apiPassphrase;
    if (subAccount !== undefined) updateData.subAccount = subAccount;
    if (isTestnet !== undefined) updateData.isTestnet = isTestnet;
    if (hedgeMode !== undefined) updateData.hedgeMode = hedgeMode;

    const account = await db.account.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      account: {
        ...account,
        apiKey: account.apiKey ? `${account.apiKey.slice(0, 8)}...${account.apiKey.slice(-4)}` : null,
        apiSecret: account.apiSecret ? "••••••••" : null,
      },
      message: "Настройки обновлены",
    });
  } catch (error) {
    console.error("Update exchange error:", error);
    return NextResponse.json(
      { error: "Failed to update exchange" },
      { status: 500 }
    );
  }
}

// DELETE - Disconnect exchange
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Account ID is required" },
        { status: 400 }
      );
    }

    // Get account info before deleting
    const account = await db.account.findUnique({
      where: { id },
    });

    if (!account) {
      return NextResponse.json(
        { error: "Account not found" },
        { status: 404 }
      );
    }

    // Delete account
    await db.account.delete({
      where: { id },
    });

    // Log the action
    await db.systemLog.create({
      data: {
        level: "INFO",
        category: "SYSTEM",
        message: `Exchange disconnected: ${account.exchangeId}`,
        details: JSON.stringify({ accountId: id }),
      },
    });

    return NextResponse.json({
      success: true,
      message: `Биржа ${account.exchangeName || account.exchangeId} отключена`,
    });
  } catch (error) {
    console.error("Disconnect exchange error:", error);
    return NextResponse.json(
      { error: "Failed to disconnect exchange" },
      { status: 500 }
    );
  }
}
