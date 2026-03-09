"use server"

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getUserResults(userId: string) {
  const results = await prisma.result.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      userId: true,
      previewImage: true,
      previewText: true,
      createdAt: true,
    },
    take: 9,
  });

  return results;
}

export async function deleteResult(id: string) {
  console.log(id, "id")
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await prisma.result.delete({
    where: {
      id,
      userId,
    },
  });
}