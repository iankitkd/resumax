import { getRedis } from "./redis";

export async function cacheSet(key: string, value: string, ttl?: number) {
  const redis = getRedis();

  if (!redis) return;

  try {
    if (ttl) {
      await redis.set(key, value, "EX", ttl);
    } else {
      await redis.set(key, value);
    }
  } catch (err) {
    console.warn("Redis SET failed:", err);
  }
}

export async function cacheGet(key: string): Promise<string | null> {
  const redis = getRedis();

  if (!redis) return null;

  try {
    return await redis.get(key);
  } catch (err) {
    console.warn("Redis GET failed:", err);
    return null;
  }
}
