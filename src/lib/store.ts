import { prisma } from "./prisma";
import { encrypt, decrypt } from "./encryption";
import { cacheGet, cacheSet } from "./cache";
import { generatePreviewText } from "@/utils/feedbackPreview";

const TTL = Number(process.env.RESULT_TTL_SECONDS ?? 3600);

function redisKey(id: string) {
  return `result:${id}`;
}

export async function saveResult(
  id: string,
  result: string,
  imageUrl: string,
  userId: string,
) {
  const previewImage = imageUrl ?? null;
  // const previewText = result?.slice(0, 160) ?? null;
  const previewText = generatePreviewText(JSON.parse(result));

  const encrypted = await encrypt(result);

  await prisma.result.upsert({
    where: { id },
    update: {
      encryptedValue: encrypted,
      previewImage,
      previewText,
    },
    create: {
      id,
      userId,
      encryptedValue: encrypted,
      previewImage,
      previewText,
    },
  });

  const cachePayload = {
    data: result,
    imageUrl,
  };

  await cacheSet(redisKey(id), JSON.stringify(cachePayload), TTL);
}

export async function getResult(id: string, userId: string) {
  const cached = await cacheGet(redisKey(id));
  if (cached) {
    return JSON.parse(cached);
  }

  const record = await prisma.result.findFirst({
    where: {
      id,
      userId,
    },
  });
  if (!record) return null;

  const decrypted = await decrypt(record.encryptedValue);

  const payload = {
    data: decrypted,
    imageUrl: record.previewImage,
  };

  await cacheSet(redisKey(id), JSON.stringify(payload), TTL);

  return payload;
}
