-- AlterTable
ALTER TABLE "public"."Result" ADD COLUMN     "previewImage" TEXT,
ADD COLUMN     "previewText" TEXT;

-- CreateIndex
CREATE INDEX "Result_userId_createdAt_idx" ON "public"."Result"("userId", "createdAt");
