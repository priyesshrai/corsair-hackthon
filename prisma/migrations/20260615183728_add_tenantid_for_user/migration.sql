/*
  Warnings:

  - A unique constraint covering the columns `[tenantId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "tenantId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_tenantId_key" ON "user"("tenantId");
