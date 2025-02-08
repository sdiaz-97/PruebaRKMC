/*
  Warnings:

  - You are about to drop the `KrEmployee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "KrRequest" DROP CONSTRAINT "KrRequest_employeeId_fkey";

-- AlterTable
ALTER TABLE "KrUser" ADD COLUMN     "entryDate" TIMESTAMP(3),
ADD COLUMN     "salary" INTEGER;

-- DropTable
DROP TABLE "KrEmployee";

-- AddForeignKey
ALTER TABLE "KrRequest" ADD CONSTRAINT "KrRequest_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "KrUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
