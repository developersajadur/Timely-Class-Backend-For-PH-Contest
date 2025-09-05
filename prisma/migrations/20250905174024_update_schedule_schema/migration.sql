/*
  Warnings:

  - You are about to drop the column `reminderJobId` on the `schedules` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."schedules" DROP COLUMN "reminderJobId",
ADD COLUMN     "reminderSent" BOOLEAN NOT NULL DEFAULT false;
