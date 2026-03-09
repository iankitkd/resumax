import Redis from "ioredis";
import { REDIS_URL } from "./env";

let redis: Redis | null = null;

export function getRedis() {
  if (!REDIS_URL) return null;

  if (!redis) {
    try {
      redis = new Redis(REDIS_URL, {
        lazyConnect: true,
        maxRetriesPerRequest: 1,
        retryStrategy(times) {
          if (times > 2) return null;
          return 1000;
        },
      });

      redis.on("error", (err) => {
        console.warn("Redis connection error:", err.message);
      });
    } catch (err) {
      console.warn("Redis initialization failed:", err);
      redis = null;
    }
  }

  return redis;
}
