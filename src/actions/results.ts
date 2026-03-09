import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/encryption";

export async function getUserResults(userId: string) {
  const results = await prisma.result.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return results.map((r) => {
    try {
      const decrypted = JSON.parse(decrypt(r.encryptedValue));
      return {
        id: r.id,
        createdAt: r.createdAt,
        ...decrypted,
      };
    } catch {
      return {
        id: r.id,
        createdAt: r.createdAt,
      };
    }
  });
}