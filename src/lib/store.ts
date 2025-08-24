import Redis from "ioredis";
import { REDIS_URL } from "./env";

const TTL_SECONDS = Number(process.env.RESULT_TTL_SECONDS ?? 60 * 60); // 1 hour

let redis: Redis | null = null;
if (REDIS_URL) {
  redis = new Redis(REDIS_URL);
  redis.on("error", (err) => console.error("Redis error:", err));
}

// Development fallback (NOT production-grade)
const inMemory = new Map<string, { value: string; expiresAt: number }>();

export async function saveResult(id: string, value: string) {
  if (redis) {
    // stores value with TTL in Redis
    await redis.set(`result:${id}`, value, "EX", TTL_SECONDS);
    return;
  }
  // fallback: store in-memory (ephemeral)
  inMemory.set(id, { value, expiresAt: Date.now() + TTL_SECONDS * 1000 });
  // prune automatically after TTL
  setTimeout(() => inMemory.delete(id), TTL_SECONDS * 1000 + 1000);
}

export async function getResult(id: string): Promise<string | null> {
  if (redis) {
    const v = await redis.get(`result:${id}`);
    return v;
  }
  const entry = inMemory.get(id);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    inMemory.delete(id);
    return null;
  }
  return entry.value;
}
