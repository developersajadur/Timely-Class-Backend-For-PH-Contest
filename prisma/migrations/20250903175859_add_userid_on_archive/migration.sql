/*
  Warnings:

  - Added the required column `userId` to the `archives` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."archives" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."archives" ADD CONSTRAINT "archives_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
