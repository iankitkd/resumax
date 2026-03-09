import { prisma } from "./prisma";
import { encrypt, decrypt } from "./encryption";
import { cacheGet, cacheSet } from "./cache";

const TTL = Number(process.env.RESULT_TTL_SECONDS ?? 3600);

function redisKey(id: string) {
  return `result:${id}`;
}

export async function saveResult(id: string, value: string, userId: string) {
  console.log(value)
  const encrypted = encrypt(value);
  console.log(encrypted)

  // database
  await prisma.result.upsert({
    where: { id },
    update: { encryptedValue: encrypted },
    create: {
      id,
      encryptedValue: encrypted,
      userId,
    },
  });

  // cache
  await cacheSet(redisKey(id), encrypted, TTL);
}

export async function getResult(id: string, userId: string) {
  // check cache
  const cached = await cacheGet(redisKey(id));
  if (cached) {
    return decrypt(cached);
  }

  // fallback to DB
  const record = await prisma.result.findUnique({
    where: { id, userId },
  });
  if (!record) return null;

  const decrypted = decrypt(record.encryptedValue);

  // repopulate cache
  await cacheSet(redisKey(id), record.encryptedValue, TTL);

  return decrypted;
}
