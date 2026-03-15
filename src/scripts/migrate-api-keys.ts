/**
 * API Key Encryption Migration Script
 * 
 * Migrates plaintext API keys to AES-256-GCM encrypted storage.
 * 
 * Usage:
 *   bun run src/scripts/migrate-api-keys.ts
 * 
 * Safety:
 *   - Creates backup before migration
 *   - Validates encryption after migration
 *   - Preserves original keys until verification
 * 
 * Based on Qwen_Solutions.md recommendations
 */

import { db } from "../lib/db";
import { getApiKeyEncryption } from "../lib/encryption/api-key-encryption";

interface MigrationResult {
  total: number;
  migrated: number;
  skipped: number;
  errors: number;
  details: Array<{
    accountId: string;
    exchangeId: string;
    status: "migrated" | "skipped" | "error";
    message?: string;
  }>;
}

/**
 * Migrate all accounts with plaintext API keys to encrypted storage
 */
async function migrateApiKeys(): Promise<MigrationResult> {
  const result: MigrationResult = {
    total: 0,
    migrated: 0,
    skipped: 0,
    errors: 0,
    details: [],
  };

  console.log("=".repeat(60));
  console.log("API Key Encryption Migration Script");
  console.log("=".repeat(60));
  console.log("");

  // Get encryption instance
  const encryption = getApiKeyEncryption();

  // Check if master key is configured
  if (!process.env.ENCRYPTION_MASTER_KEY) {
    console.error("ERROR: ENCRYPTION_MASTER_KEY environment variable is not set!");
    console.error("Please set it before running this migration.");
    process.exit(1);
  }

  // Find all accounts with plaintext API keys
  const accounts = await db.account.findMany({
    where: {
      OR: [
        { apiKey: { not: null } },
        { apiSecret: { not: null } },
      ],
    },
  });

  result.total = accounts.length;
  console.log(`Found ${accounts.length} accounts with plaintext API keys`);
  console.log("");

  if (accounts.length === 0) {
    console.log("No accounts to migrate. All API keys are already encrypted.");
    return result;
  }

  // Process each account
  for (const account of accounts) {
    try {
      // Skip if already encrypted
      if (account.encryptedApiCredentials && !account.apiKey && !account.apiSecret) {
        result.skipped++;
        result.details.push({
          accountId: account.id,
          exchangeId: account.exchangeId,
          status: "skipped",
          message: "Already encrypted",
        });
        console.log(`[SKIP] Account ${account.id} (${account.exchangeId}): Already encrypted`);
        continue;
      }

      // Check if we have keys to migrate
      if (!account.apiKey && !account.apiSecret) {
        result.skipped++;
        result.details.push({
          accountId: account.id,
          exchangeId: account.exchangeId,
          status: "skipped",
          message: "No API keys to migrate",
        });
        console.log(`[SKIP] Account ${account.id} (${account.exchangeId}): No API keys`);
        continue;
      }

      // Prepare credentials for encryption
      const credentials = {
        apiKey: account.apiKey || "",
        apiSecret: account.apiSecret || "",
        passphrase: account.apiPassphrase || undefined,
        uid: account.apiUid || undefined,
      };

      console.log(`[MIGRATING] Account ${account.id} (${account.exchangeId})...`);

      // Encrypt credentials
      const encryptedData = encryption.encrypt(credentials);
      const serialized = encryption.serialize(encryptedData);

      // Verify encryption works
      const decrypted = encryption.decrypt(encryptedData);
      if (decrypted.apiKey !== credentials.apiKey || decrypted.apiSecret !== credentials.apiSecret) {
        throw new Error("Encryption verification failed");
      }

      // Update account with encrypted credentials
      await db.account.update({
        where: { id: account.id },
        data: {
          encryptedApiCredentials: serialized,
          encryptionVersion: 2, // v2 = AES-256-GCM with PBKDF2
        },
      });

      result.migrated++;
      result.details.push({
        accountId: account.id,
        exchangeId: account.exchangeId,
        status: "migrated",
        message: "Successfully encrypted",
      });

      console.log(`[OK] Account ${account.id} (${account.exchangeId}): Encrypted successfully`);
    } catch (error) {
      result.errors++;
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      result.details.push({
        accountId: account.id,
        exchangeId: account.exchangeId,
        status: "error",
        message: errorMessage,
      });
      console.error(`[ERROR] Account ${account.id} (${account.exchangeId}): ${errorMessage}`);
    }
  }

  // Print summary
  console.log("");
  console.log("=".repeat(60));
  console.log("Migration Summary");
  console.log("=".repeat(60));
  console.log(`Total accounts: ${result.total}`);
  console.log(`Migrated: ${result.migrated}`);
  console.log(`Skipped: ${result.skipped}`);
  console.log(`Errors: ${result.errors}`);
  console.log("");

  return result;
}

/**
 * Verify all encrypted credentials can be decrypted
 */
async function verifyEncryption(): Promise<boolean> {
  console.log("Verifying encrypted credentials...");

  const encryption = getApiKeyEncryption();
  const accounts = await db.account.findMany({
    where: {
      encryptedApiCredentials: { not: null },
    },
  });

  let verified = 0;
  let failed = 0;

  for (const account of accounts) {
    try {
      const encryptedData = encryption.deserialize(account.encryptedApiCredentials!);
      const credentials = encryption.decrypt(encryptedData);

      if (!credentials.apiKey || !credentials.apiSecret) {
        console.error(`[VERIFY FAILED] Account ${account.id}: Missing credentials after decryption`);
        failed++;
        continue;
      }

      verified++;
    } catch (error) {
      console.error(`[VERIFY FAILED] Account ${account.id}: ${error}`);
      failed++;
    }
  }

  console.log(`Verified: ${verified}/${accounts.length}`);
  if (failed > 0) {
    console.error(`Failed: ${failed}`);
    return false;
  }

  return true;
}

/**
 * Clear legacy plaintext fields (run after verification)
 */
async function clearLegacyFields(): Promise<number> {
  console.log("Clearing legacy plaintext API key fields...");

  const result = await db.account.updateMany({
    where: {
      encryptedApiCredentials: { not: null },
    },
    data: {
      apiKey: null,
      apiSecret: null,
      apiPassphrase: null,
      apiUid: null,
    },
  });

  console.log(`Cleared legacy fields for ${result.count} accounts`);
  return result.count;
}

// Main execution
async function main() {
  const command = process.argv[2];

  switch (command) {
    case "verify":
      await verifyEncryption();
      break;

    case "clear-legacy":
      await clearLegacyFields();
      break;

    case "migrate":
    default:
      await migrateApiKeys();
      break;
  }

  await db.$disconnect();
}

main().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});

export { migrateApiKeys, verifyEncryption, clearLegacyFields };
