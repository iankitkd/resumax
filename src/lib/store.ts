"use server"

import { prisma } from "@/lib/prisma";
import { encrypt, decrypt } from "./encryption";
import { cacheGet, cacheSet } from "./cache";
import { generatePreviewText } from "@/utils/feedbackPreview";

const TTL = Number(process.env.RESULT_TTL_SECONDS ?? 3600);

function redisKey(id: string) {
  return `result:${id}`;
}

export async function saveResult(
  result: string,
  imageUrl: string,
  userId: string,
) {
  const previewImage = imageUrl ?? null;
  // const previewText = result?.slice(0, 160) ?? null;
  const previewText = generatePreviewText(JSON.parse(result));

  const encrypted = await encrypt(result);

  const record = await prisma.result.create({
    data: {
      userId,
      encryptedValue: encrypted,
      previewImage,
      previewText,
    },
  });
  const id = record.id;

  const cachePayload = {
    data: result,
    imageUrl,
  };

  await cacheSet(redisKey(id), JSON.stringify(cachePayload), TTL);

  return id;
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
