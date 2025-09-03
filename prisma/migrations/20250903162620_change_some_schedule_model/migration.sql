/*
  Warnings:

  - A unique constraint covering the columns `[priority]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."schedules" ADD COLUMN     "date" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "schedules_priority_key" ON "public"."schedules"("priority");
