/*
  Warnings:

  - You are about to drop the column `position` on the `KrEmployee` table. All the data in the column will be lost.
  - Added the required column `entryDate` to the `KrEmployee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `KrEmployee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `KrRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resume` to the `KrRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KrEmployee" DROP COLUMN "position",
ADD COLUMN     "entryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "salary" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "KrRequest" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "resume" TEXT NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT;
