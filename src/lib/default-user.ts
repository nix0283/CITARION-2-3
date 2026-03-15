/**
 * Default User Helper
 * 
 * Для личной платформы - обеспечивает наличие дефолтного пользователя
 */

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

const DEFAULT_USER_ID = "default-user";
const DEFAULT_USER_EMAIL = "user@citarion.local";

/**
 * Получить или создать дефолтного пользователя
 */
export async function getDefaultUserId(): Promise<string> {
  let user = await db.user.findUnique({
    where: { id: DEFAULT_USER_ID },
  });

  if (!user) {
    try {
      user = await db.user.create({
        data: {
          id: DEFAULT_USER_ID,
          email: DEFAULT_USER_EMAIL,
          name: "User",
          // currentMode has default value "DEMO" in schema
        },
      });
    } catch (error) {
      // Handle race condition - another request may have created the user
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        // Unique constraint violation - user already exists, fetch it
        user = await db.user.findUnique({
          where: { id: DEFAULT_USER_ID },
        });
        if (!user) {
          throw new Error('Failed to get default user after constraint violation');
        }
      } else {
        throw error;
      }
    }
  }

  return user.id;
}

/**
 * Получить ID дефолтного пользователя (синхронно для использования в_known_ contexts)
 */
export function getDefaultUserIdSync(): string {
  return DEFAULT_USER_ID;
}
