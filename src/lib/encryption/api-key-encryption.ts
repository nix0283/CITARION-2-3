/**
 * API Key Encryption Service
 * 
 * Production-ready encryption for API keys and secrets using AES-256-GCM.
 * Provides secure storage and retrieval of exchange credentials.
 * 
 * Features:
 * - AES-256-GCM encryption (authenticated encryption)
 * - PBKDF2 key derivation from master key
 * - Random IV/salt for each encryption
 * - Key rotation support
 * 
 * Usage:
 * const encryption = new ApiKeyEncryption(process.env.ENCRYPTION_MASTER_KEY!);
 * const encrypted = encryption.encrypt({ apiKey: 'xxx', apiSecret: 'yyy' });
 * const decrypted = encryption.decrypt(encrypted);
 */

import crypto from "crypto";

export interface ApiCredentials {
  apiKey: string;
  apiSecret: string;
  passphrase?: string; // Required for OKX, KuCoin, Bitget
  uid?: string;        // Required for some exchanges
  parentUid?: string;  // For sub-accounts
  walletAddress?: string; // For HyperLiquid
  walletPrivateKey?: string; // For HyperLiquid signing
}

export interface EncryptedCredentials {
  encrypted: string;     // Base64 encoded ciphertext
  iv: string;            // Base64 encoded IV
  salt: string;          // Base64 encoded salt
  authTag: string;       // Base64 encoded auth tag (GCM)
  version: number;       // Encryption version for future migrations
  createdAt: number;     // Timestamp for key rotation
}

export interface EncryptionConfig {
  algorithm: "aes-256-gcm";
  keyLength: number;     // 32 bytes for AES-256
  ivLength: number;      // 12 bytes for GCM (recommended)
  saltLength: number;    // 16 bytes
  pbkdf2Iterations: number;
  authTagLength: number; // 16 bytes for GCM
}

const DEFAULT_CONFIG: EncryptionConfig = {
  algorithm: "aes-256-gcm",
  keyLength: 32,
  ivLength: 12,
  saltLength: 16,
  pbkdf2Iterations: 100000,
  authTagLength: 16,
};

export class ApiKeyEncryption {
  private masterKey: string;
  private config: EncryptionConfig;

  constructor(masterKey?: string) {
    this.masterKey = masterKey || process.env.ENCRYPTION_MASTER_KEY || "";
    
    if (!this.masterKey) {
      console.warn("[ApiKeyEncryption] No master key provided. Using development fallback. DO NOT USE IN PRODUCTION!");
      // Generate a deterministic key for development only
      this.masterKey = crypto
        .createHash("sha256")
        .update("citarion-dev-key-do-not-use-in-production")
        .digest("hex");
    }

    this.config = DEFAULT_CONFIG;
  }

  /**
   * Encrypt API credentials
   */
  encrypt(credentials: ApiCredentials): EncryptedCredentials {
    // Generate random IV and salt
    const iv = crypto.randomBytes(this.config.ivLength);
    const salt = crypto.randomBytes(this.config.saltLength);

    // Derive encryption key from master key
    const encryptionKey = this.deriveKey(salt);

    // Serialize credentials to JSON
    const plaintext = JSON.stringify(credentials);

    // Create cipher
    const cipher = crypto.createCipheriv(
      this.config.algorithm,
      encryptionKey,
      iv,
      { authTagLength: this.config.authTagLength }
    );

    // Encrypt
    const encrypted = Buffer.concat([
      cipher.update(plaintext, "utf8"),
      cipher.final(),
    ]);

    // Get auth tag (GCM provides authentication)
    const authTag = cipher.getAuthTag();

    return {
      encrypted: encrypted.toString("base64"),
      iv: iv.toString("base64"),
      salt: salt.toString("base64"),
      authTag: authTag.toString("base64"),
      version: 1,
      createdAt: Date.now(),
    };
  }

  /**
   * Decrypt API credentials
   */
  decrypt(encryptedData: EncryptedCredentials): ApiCredentials {
    // Check version for future migrations
    if (encryptedData.version !== 1) {
      throw new Error(`Unsupported encryption version: ${encryptedData.version}`);
    }

    // Decode base64 values
    const iv = Buffer.from(encryptedData.iv, "base64");
    const salt = Buffer.from(encryptedData.salt, "base64");
    const encrypted = Buffer.from(encryptedData.encrypted, "base64");
    const authTag = Buffer.from(encryptedData.authTag, "base64");

    // Derive encryption key
    const encryptionKey = this.deriveKey(salt);

    // Create decipher
    const decipher = crypto.createDecipheriv(
      this.config.algorithm,
      encryptionKey,
      iv,
      { authTagLength: this.config.authTagLength }
    );

    // Set auth tag for verification
    decipher.setAuthTag(authTag);

    // Decrypt
    let decrypted: Buffer;
    try {
      decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final(),
      ]);
    } catch (error) {
      throw new Error("Decryption failed: Authentication tag verification failed. Data may be tampered.");
    }

    // Parse JSON
    try {
      return JSON.parse(decrypted.toString("utf8")) as ApiCredentials;
    } catch {
      throw new Error("Decryption failed: Invalid JSON data");
    }
  }

  /**
   * Derive encryption key from master key using PBKDF2
   */
  private deriveKey(salt: Buffer): Buffer {
    return crypto.pbkdf2Sync(
      this.masterKey,
      salt,
      this.config.pbkdf2Iterations,
      this.config.keyLength,
      "sha256"
    );
  }

  /**
   * Rotate encryption - re-encrypt with new master key
   */
  rotateKey(encryptedData: EncryptedCredentials, newMasterKey: string): EncryptedCredentials {
    // Decrypt with old key
    const credentials = this.decrypt(encryptedData);

    // Create new encryptor with new key
    const newEncryptor = new ApiKeyEncryption(newMasterKey);

    // Re-encrypt
    return newEncryptor.encrypt(credentials);
  }

  /**
   * Verify if encrypted data is valid (can be decrypted)
   */
  verify(encryptedData: EncryptedCredentials): boolean {
    try {
      this.decrypt(encryptedData);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if encrypted data needs re-encryption (key rotation)
   */
  needsReencryption(encryptedData: EncryptedCredentials, maxAgeMs: number = 90 * 24 * 60 * 60 * 1000): boolean {
    const age = Date.now() - encryptedData.createdAt;
    return age > maxAgeMs;
  }

  /**
   * Serialize encrypted data for database storage
   */
  serialize(encryptedData: EncryptedCredentials): string {
    return JSON.stringify(encryptedData);
  }

  /**
   * Deserialize encrypted data from database storage
   */
  deserialize(data: string): EncryptedCredentials {
    try {
      return JSON.parse(data) as EncryptedCredentials;
    } catch {
      throw new Error("Invalid encrypted data format");
    }
  }

  /**
   * Generate a new master key (for setup)
   */
  static generateMasterKey(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  /**
   * Hash an API key for display/comparison (one-way)
   */
  static hashApiKey(apiKey: string): string {
    return crypto
      .createHash("sha256")
      .update(apiKey)
      .digest("hex")
      .substring(0, 16); // First 16 chars for display
  }

  /**
   * Mask API key for display (show last 4 chars only)
   */
  static maskApiKey(apiKey: string): string {
    if (apiKey.length <= 8) return "****";
    return `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`;
  }
}

// Singleton instance
let encryptionInstance: ApiKeyEncryption | null = null;

export function getApiKeyEncryption(): ApiKeyEncryption {
  if (!encryptionInstance) {
    encryptionInstance = new ApiKeyEncryption();
  }
  return encryptionInstance;
}

// Convenience functions
export const encryptCredentials = (credentials: ApiCredentials): EncryptedCredentials => 
  getApiKeyEncryption().encrypt(credentials);

export const decryptCredentials = (encryptedData: EncryptedCredentials): ApiCredentials => 
  getApiKeyEncryption().decrypt(encryptedData);

/**
 * Decrypt API credentials from database JSON string
 * Used by API routes that store encrypted credentials as JSON
 */
export async function decryptApiCredentials(jsonString: string): Promise<ApiCredentials> {
  const encryption = getApiKeyEncryption();
  const encryptedData = encryption.deserialize(jsonString);
  return encryption.decrypt(encryptedData);
}

/**
 * Encrypt API credentials to database JSON string
 * Used when storing credentials in the database
 */
export async function encryptApiCredentials(credentials: ApiCredentials): Promise<string> {
  const encryption = getApiKeyEncryption();
  const encryptedData = encryption.encrypt(credentials);
  return encryption.serialize(encryptedData);
}
